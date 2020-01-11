/**
 * The base class of the video player.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Elements from '../../elements';


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
		this.isPlaying = false;

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
	  this.elements = Elements( this.slide );
	  this.elements.init();
		this.slide.classList.add( this.Splide.classes.slide + '--has-video' );
		this.Splide.root.classList.add( this.Splide.classes.root + '--has-video' );

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
	 * @return {null}
	 */
	createPlayer() {
		return null;
  }

	/**
	 * Play video.
	 */
	play() {
		if ( this.isPlaying ) {
			return;
		}

		// Hide immediately for UX.
		this.elements.hide();

		if ( ! this.player ) {
			this.player = this.createPlayer();
		} else {
			this.playVideo();
		}

		this.isPlaying = true;
	}

	/**
	 * Pause video.
	 */
	pause() {
		if ( this.player && this.isPlaying ) {
			if ( ! this.isAutoplay() ) {
				this.elements.show();
			}

			this.pauseVideo();
			this.isPlaying = false;
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
		this.Splide.emit( 'video:play', this );
	}

	/**
	 * Called when the player is paused a video.
	 */
	onPause() {
		this.Splide.emit( 'video:pause', this );
	}

	/**
	 * Called when the video is ended.
	 */
	onEnd() {
		this.Splide.emit( 'video:end', this );
	}
}