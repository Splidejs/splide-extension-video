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
	 * @param {Splide} Splide     - A Splide instance.
	 * @param {Object} Components - An object containing components.
	 * @param {Object} Slide      - A target Slide object.
	 */
	constructor( Splide, Components, Slide ) {
		this.Splide     = Splide;
		this.Components = Components;
		this.Slide      = Slide;
		this.slide      = Slide.slide;

		this.player    = null;
		this.elements  = null;
		this.state     = State( NOT_INITIALIZED );

		this.videoId = this.findVideoId();

		if ( this.videoId ) {
			this.init();
			this.bind();
		}
 	}

	/**
	 * Initialization.
	 */
	init() {
	  this.elements = new Elements( this.Splide, this.Slide );
	  this.elements.init();

	  this.toggleRootClass( true );

		if ( ! this.Splide.State.is( this.Splide.STATES.CREATED ) ) {
			this.setup();
		} else {
			this.Splide.on( 'mounted', this.setup.bind( this ) );
		}
  }

	/**
	 * Setup.
	 * This must be called after MOUNTED state.
	 */
	setup() {
		if ( ! this.isAutoplay() ) {
			this.elements.togglePlayButton( true );
		}

	  if ( this.isActive() ) {
		  if ( this.state.is( NOT_INITIALIZED ) ) {
			  this.state.set( CREATING_PLAYER );

			  this.player = this.createPlayer( () => {
				  const isPendingPlay = this.state.is( PENDING_PLAY );
				  this.state.set( IDLE );

				  if ( isPendingPlay || this.isAutoplay() ) {
					  this.play();
				  }
			  } );
		  }
	  }
  }

	/**
	 * Listen some events.
	 */
	bind() {
	  this.Splide
		  .on( 'click', this.onClick.bind( this ) )
		  .on( 'move', () => {
				this.pause();

				if ( this.isActive() ) {
					if ( this.state.is( NOT_INITIALIZED ) ) {
						this.setup();
					} else {
						if ( this.isAutoplay() ) {
							this.play();
						}
					}
				}
			} );
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
	 * Play video.
	 */
	play() {
		if ( this.state.is( PLAYING ) || ! this.isActive() ) {
			return;
		}

		if ( this.state.is( CREATING_PLAYER ) ) {
			this.state.set( PENDING_PLAY );
			return;
		}

		// Hide immediately for UX.
		this.elements.hide();
		this.playVideo();
		this.state.set( LOADING );
	}

	/**
	 * Pause video.
	 */
	pause() {
		if ( ! this.isAutoplay() ) {
			this.elements.show();
		}

		if ( this.state.is( LOADING ) ) {
			this.state.set( PLAY_REQUEST_ABORTED );
		} else if ( this.state.is( PLAYING ) ) {
			this.pauseVideo();
			this.state.set( IDLE )
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
		return this.Slide.isActive();
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
	 * Called whe nthe sl
	 * @param Slide
	 */
	onClick( Slide ) {
		if ( Slide.slide === this.slide ) {
			this.play();
		}
	}

	/**
	 * Called when the player is playing a video.
	 */
	onPlay() {
		if ( ! this.isActive() ) {
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
	onEnd() {
		this.Splide.emit( 'video:end', this );
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
	}
}