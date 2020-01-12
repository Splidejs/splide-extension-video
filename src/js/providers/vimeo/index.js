/**
 * The sub component for embedding a Vimeo video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Player from './player';

/**
 * The sub component for embedding a Vimeo video.
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
		mount() {
			Components.Slides.getSlides( false, true ).forEach( Slide => {
				const vimeo = Slide.slide.getAttribute( 'data-splide-vimeo' );

				if ( vimeo ) {
					new Player( Splide, Components, Slide );
				}
			} );
		},
	};
}