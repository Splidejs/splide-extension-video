/**
 * The sub component for embedding a YouTube video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Player from './player';

/**
 * URL to the YouTube API script.
 *
 * @type {string}
 */
const YOUTUBE_API_SRC = 'https://www.youtube.com/player_api';


/**
 * The sub component for embedding a YouTube video.
 *
 * @param {Splide}  Splide     - A Splide instance.
 * @param {Object}  Components - An object containing components.
 *
 * @return {Object} - Sub component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store the old callback.
	 *
	 * @type {function}
	 */
	let oldCallback;

	return {
		/**
		 * Initialization.
		 */
		mount() {
			this.bindAPICallback();
			this.loadAPI();
		},

		/**
		 * Load the YouTube iframe API.
		 */
		loadAPI() {
			const { YT } = window;

			if ( this.shouldLoadAPI() ) {
				const tag            = document.createElement( 'script' );
				const firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
				tag.src = YOUTUBE_API_SRC;
				firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
			} else {
				if ( YT && YT.loaded ) {
					// API has been already loaded and the callback has been fired.
					this.onReady();
				}
			}
		},

		/**
		 * Check whether the API should be loaded or not.
		 *
		 * @return {boolean} - True if it should be or false if not.
		 */
		shouldLoadAPI() {
			const scripts = document.getElementsByTagName( 'script' );

			for ( let i = 0; i < scripts.length; i++ ) {
				if ( scripts[ i ].getAttribute( 'src' ) === YOUTUBE_API_SRC ) {
					return false;
				}
			}

			return true;
		},

		/**
		 * Listen onYouTubeIframeAPIReady event.
		 */
		bindAPICallback() {
			// Avoid unexpected collision against other libraries.
			if ( typeof window.onYouTubeIframeAPIReady !== 'undefined' ) {
				oldCallback = window.onYouTubeIframeAPIReady;
			}

			window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind( this );
		},

		/**
		 * Called when the API is ready.
		 */
		onYouTubeIframeAPIReady() {
			if ( oldCallback ) {
				oldCallback();
			}

			this.onReady();
		},

		/**
		 * Called when the YouTube API is ready.
		 */
		onReady() {
			Components.Elements.getSlides( false ).forEach( Slide => {
				const youtube = Slide.slide.getAttribute( 'data-splide-youtube' );

				if ( youtube ) {
					new Player( Splide, Components, Slide );
				}
			} );
		}
	};
}