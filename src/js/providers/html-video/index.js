/**
 * The sub component for embedding a HTML video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Player from './player';

/**
 * The sub component for embedding a HTML video.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Sub component object.
 */
export default ( Splide, Components ) => {
	return {
		/**
		 * Initialization.
		 */
		mount() {
			Components.Elements.getSlides( false ).forEach( Slide => {
				const video = Slide.slide.getAttribute( 'data-splide-html-video' );

				if ( video ) {
					new Player( Splide, Components, Slide );
				}
			} );
		},
	};
}