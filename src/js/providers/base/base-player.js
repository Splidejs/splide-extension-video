/**
 * The base class of the video player.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Elements from '../../elements';
import State from '../../utils/state';

import {
	NOT_INITIALIZED,
	IDLE,
	LOADING,
	PLAYING,
	PLAY_REQUEST_ABORTED,
	CREATING_PLAYER,
	PENDING_PLAY
} from "../../constants/states";


/**
 * The base class of the video player.
 */
export default class BasePlayer {
	/**
	 * BasePlayer constructor.
	 *
	 * @param {Splide}  Splide     - A Splide instance.
	 * @param {Object}  Components - An object containing components.
	 * @param {Element} slide      - A target slide element.
	 */
	constructor( Splide, Components, slide ) {
		this.Splide     = Splide;
		this.Components = Components;
		this.slide      = slide;

		this.player    = null;
		this.elements  = null;
		this.state     = new State( NOT_INITIALIZED );

		this.videoId = this.findVideoId();

		if ( this.videoId ) {
			this.init();
			this.bind();
			this.handleClick();
		}
 	}

	/**
	 * Initialization.
	 */
	init() {
	  this.elements = new Elements( this.Splide, this.slide );
	  this.elements.init();

	  this.toggleRootClass( true );
		this.elements.togglePlayButton( ! this.Splide.options.video.disableOverlayUI );

		if ( this.isAutoplay() && this.isActive() ) {
			this.play();
		}
  }

	/**
	 * Setup.
	 * This must be called after MOUNTED state.
	 */
	setup() {
		this.state.set( CREATING_PLAYER );

		this.player = this.createPlayer( () => {
			const isPendingPlay = this.state.is( PENDING_PLAY );
			this.state.set( IDLE );

			if ( isPendingPlay ) {
				this.play();
			}
		} );
  }

	/**
	 * Listen to some events.
	 */
	bind() {
	  this.Splide
		  .on( 'active', Slide => {
		  	if ( this.isAutoplay() ) {
		  		if ( Slide.slide === this.slide ) {
		  			this.play();
				  } else {
		  			this.pause();
				  }
			  }
		  } )
		  .on( 'move', () => { this.pause() } )
			.on( 'video:click', Player => {
		    if ( Player.slide !== this.slide ) {
		      this.pause();
			  }
		  } );
  }

	/**
	 * In the fade mode, events will be fired in the order of drag -> dragged -> click,
	 * which unexpectedly plays the previous video.
	 */
  handleClick() {
	  // Listen to native events for grid slides.
		this.slide.addEventListener( 'mousedown', this.onMouseDown.bind( this ) );
		this.slide.addEventListener( 'touchstart', this.onMouseDown.bind( this ) );
		this.slide.addEventListener( 'mouseup', this.onMouseUp.bind( this ) );
		this.slide.addEventListener( 'touchend', this.onMouseUp.bind( this ) );

		// Interrupt playing the video because the slider starts being dragged.
	  this.Splide.on( 'drag', () => { this.shouldHandleClick = false } );
  }

	/**
	 * Create a player.
	 * This must be overridden in a child class.
	 *
	 * @param {function} readyCallback
	 *
	 * @return {null} - Always null.
	 */
	createPlayer( readyCallback = null ) {
		return null;
  }

	/**
	 * Play the video.
	 */
	play() {
		if ( this.state.is( NOT_INITIALIZED ) ) {
			this.setup();
		}

		if ( this.state.is( PLAYING, PENDING_PLAY ) ) {
			return;
		}

		// Hide immediately for UX.
		setTimeout( () => { this.elements.hide() } );

		// Pending play because the player is being created now.
		if ( this.state.is( CREATING_PLAYER ) ) {
			this.state.set( PENDING_PLAY );
			return;
		}

		// Play request is canceled but requested again.
		if ( this.state.is( PLAY_REQUEST_ABORTED ) ) {
			this.state.set( LOADING );
			return;
		}

		this.playVideo();
		this.state.set( LOADING );
	}

	/**
	 * Pause the video.
	 */
	pause() {
		if ( ! this.Splide.options.video.disableOverlayUI ) {
			this.elements.show();
		}

		// Cancel the "pending play" status.
		if ( this.state.is( PENDING_PLAY ) ) {
			this.state.set( CREATING_PLAYER );
			return;
		}

		// The video is paused while being loaded.
		if ( this.state.is( LOADING ) ) {
			this.state.set( PLAY_REQUEST_ABORTED );
			return;
		}

		if ( this.state.is( PLAYING ) ) {
			this.state.set( IDLE );
			this.pauseVideo();
		}
	}

	/**
	 * Play video. Override this if necessary.
	 */
	playVideo() {
		this.player.play();
	}

	/**
	 * Pause video. Override this if necessary.
	 */
	pauseVideo() {
		this.player.pause();
	}

	/**
	 * Check if the slide is active or not.
	 */
	isActive() {
		return this.slide.classList.contains( 'is-active' );
	}

	/**
	 * Check whether a video should be played automatically.
	 *
	 * @return {boolean}
	 */
	isAutoplay() {
		return this.Splide.options.video.autoplay;
	}

	/**
	 * Find the video ID from the HTML.
	 *
	 * @return {string|number}
	 */
	findVideoId() {
		return '';
	}

	/**
	 * Toggle the root class.
	 *
	 * @param {boolean} add - Whether to add a class or not.
	 */
	toggleRootClass( add ) {
		this.Splide.root.classList[ add ? 'add' : 'remove' ]( this.Splide.classes.root.split( ' ' )[0] + '--has-video' );
	}

	/**
	 * Called on mousedown or touchstart.
	 * Request playing the video on mouseup or touchend.
	 * This may be interrupted a drag event.
	 */
	onMouseDown() {
		this.shouldHandleClick = true;
	}

	/**
	 * Called on mouseup or touchend.
	 * If the shouldHandleClick is still true, play the video.
	 */
	onMouseUp() {
		if ( this.shouldHandleClick ) {
			this.Splide.emit( 'video:click', this );
			this.play();
		}
	}

	/**
	 * Called when the player is playing a video.
	 */
	onPlay() {
		if ( this.state.is( PLAY_REQUEST_ABORTED ) ) {
			this.state.set( PLAYING );
			this.pause();
		} else {
			this.Splide.emit( 'video:play', this );
			this.state.set( PLAYING );
		}
	}

	/**
	 * Called when the player is paused a video.
	 */
	onPause() {
		this.Splide.emit( 'video:pause', this );
		this.state.set( IDLE );
	}

	/**
	 * Called when the video is ended.
	 */
	onEnded() {
		this.Splide.emit( 'video:ended', this );
		this.state.set( IDLE );
	}

	/**
	 * Destroy the player.
	 */
	destroy() {
		if ( this.player ) {
			this.player.destroy();
			this.player = null;
		}

		this.toggleRootClass( false );
		this.elements.destroy();

		this.slide.removeEventListener( 'mousedown', this.onMouseDown.bind( this ) );
		this.slide.removeEventListener( 'touchstart', this.onMouseDown.bind( this ) );
		this.slide.removeEventListener( 'mouseup', this.onMouseUp.bind( this ) );
		this.slide.removeEventListener( 'touchend', this.onMouseUp.bind( this ) );
	}
}