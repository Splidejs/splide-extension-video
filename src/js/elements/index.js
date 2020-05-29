/**
 * The sub component for creating UI elements.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The class name of the wrapper element that will be containing video iframe.
 *
 * @type {string}
 */
const WRAPPER_CLASS = 'splide__video';

/**
 * The play button class name.
 *
 * @type {string}
 */
const PLAY_BUTTON_CLASS = 'splide__video__play';


/**
 * The sub component for creating UI elements.
 *
 * @param {Splide} Splide - A Splide instance.
 * @param {Object} Slide  - Target Slide object.
 *
 * @return {Object}
 */
export default ( Splide, Slide ) => {
	return {
		/**
		 * Initialization.
		 */
		init() {
			this.create();
			this.toggleWrapper( false );
			this.togglePlayButton( false );
		},

		/**
		 * Create some elements.
		 */
		create() {
			this.parent = Slide.container ? Slide.container : Slide.slide;

			this.className = `${ Splide.classes[ Slide.container ? 'container' : 'slide' ].split( ' ' )[0] }--has-video`;
			this.parent.classList.add( this.className );

			this.wrapper    = document.createElement( 'div' );
			this.iframe     = document.createElement( 'div' );
			this.playButton = document.createElement( 'button' );

			this.wrapper.classList.add( WRAPPER_CLASS );
			this.playButton.classList.add( PLAY_BUTTON_CLASS );
			this.wrapper.appendChild( this.iframe );

			this.parent.appendChild( this.wrapper );
			this.parent.appendChild( this.playButton );
		},

		/**
		 * Destroy elements.
		 */
		destroy() {
			this.parent.classList.remove( this.className );
			this.remove( this.wrapper );
			this.remove( this.playButton );
		},

		/**
		 * Toggle the play button.
		 *
		 * @param {boolean} show - Set true to show the button.
		 */
		togglePlayButton( show ) {
			this.playButton.style.display = show ? 'flex' : 'none';
		},

		/**
		 * Toggle the wrapper element.
		 *
		 * @param {boolean} show - Set true to show the wrapper.
		 */
		toggleWrapper( show ) {
			this.wrapper.style.display = show ? 'block' : 'none';
		},

		/**
		 * Hide the play button and show the wrapper element.
		 */
		hide() {
			this.togglePlayButton( false );
			this.toggleWrapper( true );
		},

		/**
		 * Show the play button and hide the wrapper element.
		 */
		show() {
			this.togglePlayButton( true );
			this.toggleWrapper( false );
		},

		/**
		 * Remove the given element.
		 *
		 * @param {Element} elm - An element being removed.
		 */
		remove( elm ) {
			const parent = elm.parentElement;

			if ( parent ) {
				parent.removeChild( elm );
			}
		}
	};
}