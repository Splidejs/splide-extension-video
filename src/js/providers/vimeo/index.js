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
			Components.Elements.getSlides( false ).forEach( Slide => {
				const vimeo = Slide.slide.getAttribute( 'data-splide-vimeo' );

				if ( vimeo ) {
					this.player = new Player( Splide, Components, Slide );
				}
			} );
		},

		/**
		 * Destroy.
		 */
		destroy() {
			if ( this.player ) {
				this.player.destroy();
			}
		},
	};
}