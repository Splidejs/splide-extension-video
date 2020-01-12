/**
 * The base class of the video player.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Elements from '../../elements';
import State from '../../utils/state';

import { NOT_INITIALIZED, IDLE, LOADING, PLAYING, PLAY_REQUEST_ABORTED } from "../../constants/states";


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
	  this.elements = Elements( this.Splide, this.Slide );
	  this.elements.init();
		this.Splide.root.classList.add( this.Splide.classes.root + '--has-video' );

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
		if ( this.isAutoplay() ) {
		  if ( this.isActive() ) {
			  this.play();
		  }
	  } else {
		  this.elements.togglePlayButton( true );
	  }
  }

	/**
	 * Listen some events.
	 */
	bind() {
	  this.slide.addEventListener( 'click', this.play.bind( this ) );

		this.Splide.on( 'move', () => {
			this.pause();

			if ( this.isActive() && this.isAutoplay() ) {
				this.play();
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

		// Hide immediately for UX.
		this.elements.hide();

		if ( this.state.is( NOT_INITIALIZED ) ) {
			this.player = this.createPlayer( () => {
				this.state.set( IDLE );
				this.play();
			} );
		} else {
			this.playVideo();
			this.state.set( LOADING );
		}
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
}