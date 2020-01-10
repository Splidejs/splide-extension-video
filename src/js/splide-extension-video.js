/**
 * The extension component for embedding videos to slides.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import YouTube from './providers/youtube';
import Vimeo from './providers/vimeo';

import { DEFAULTS } from "./constants/defaults";


/**
 * The extension component for embedding videos to slides.
 *
 * @param {Splide}  Splide     - A Splide instance.
 * @param {Object}  Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */
export default ( Splide, Components ) => {
	return {
		/**
		 * Called when this extension is mounted.
		 * Initialize all sub components.
		 */
		mount() {
			if ( typeof Splide.options.video !== 'object' ) {
				Splide.options.video = {};
			}

			Splide.options.video = { ...DEFAULTS, ...Splide.options.video };

			const providers = [ YouTube, Vimeo ];
			providers.forEach( provider => {
				provider( Splide, Components ).init();
			} );
		},
	};
}