/**
 * The sub component for embedding a YouTube video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Player from './player';


/**
 * The sub component for embedding a YouTube video.
 *
 * @param {Splide}  Splide     - A Splide instance.
 * @param {Object}  Components - An object containing components.
 *
 * @return {Object} - Sub component object.
 */
export default ( Splide, Components ) => {
	return {
		/**
		 * Initialization.
		 */
		init() {
			this.loadAPI();
			this.bindAPICallback();

			this.oldCallback = null;
		},

		/**
		 * Load the YouTube iframe API.
		 */
		loadAPI() {
			if ( typeof Vimeo === 'undefined' ) {
				const tag = document.createElement( 'script' );
				tag.src = "https://www.youtube.com/player_api";
				const firstScriptTag = document.getElementsByTagName( 'script' )[0];
				firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
			}
		},

		/**
		 * Listen onYouTubeIframeAPIReady event.
		 */
		bindAPICallback() {
			// Avoid unexpected collision against other libraries.
			if ( typeof window.onYouTubeIframeAPIReady !== 'undefined' ) {
				this.oldCallback = window.onYouTubeIframeAPIReady;
			}

			window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind( this );
		},

		/**
		 * Called when the API is ready.
		 */
		onYouTubeIframeAPIReady() {
			if ( this.oldCallback ) {
				this.oldCallback();
			}

			Components.Slides.getSlides( false, true ).forEach( Slide => {
				const youtube = Slide.slide.getAttribute( 'data-splide-youtube' );

				if ( youtube ) {
					new Player( Splide, Components, Slide );
				}
			} );
		},
	};
}