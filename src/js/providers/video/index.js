/**
 * The sub component for embedding a raw video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Player from './player';

/**
 * The sub component for embedding a raw video.
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
		init() {
			Components.Slides.getSlides( false, true ).forEach( Slide => {
				const video = Slide.slide.getAttribute( 'data-splide-video' );

				if ( video ) {
					new Player( Splide, Components, Slide );
				}
			} );
		},
	};
}