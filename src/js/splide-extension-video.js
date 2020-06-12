/**
 * The extension component for embedding videos to slides.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { PROVIDERS } from "./providers";
import { DEFAULTS } from "./constants/defaults";
import { each } from "./utils";

/**
 * The status class name added to the root element while the video is playing.
 *
 * @type {string}
 */
const PLAYING_STATUS_CLASS_NAME = 'is-playing';


/**
 * The extension component for embedding videos to slides.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */
export default ( Splide, Components ) => {
	/**
	 * A slide element whose video is playing.
	 *
	 * @type {Element}
	 */
	let activeSlide;

	/**
	 * Store provider components.
	 * 
	 * @type {Object[]}
	 */
	let Providers = [];

	const Video = {
		/**
		 * Called when this extension is mounted.
		 * Initialize all sub components.
		 */
		mount() {
			if ( typeof Splide.options.video !== 'object' ) {
				Splide.options.video = {};
			}

			Splide.options.video = { ...DEFAULTS, ...Splide.options.video };

			each( PROVIDERS, Provider => {
				Providers.push( new Provider( Splide, Components ) );
			} );

			bind();
		},

		/**
		 * Destroy.
		 */
		destroy() {
			Providers.forEach( Provider => { Provider.destroy() } );
		}
	};

	/**
	 * Listen to some events.
	 */
	function bind() {
		const classList = Splide.root.classList;

		Splide
			.on( 'video:play', Player => {
				activeSlide = Player.slide;
				classList.add( PLAYING_STATUS_CLASS_NAME );
			} )
			.on( 'video:pause video:ended', Player => {
				if ( Player.slide === activeSlide ) {
					activeSlide = null;
					classList.remove( PLAYING_STATUS_CLASS_NAME );
				}
			} ).on( 'destroy', () => {
				classList.remove( PLAYING_STATUS_CLASS_NAME );
			} );
	}

	return Video;
}