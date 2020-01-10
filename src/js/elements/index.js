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
 * @param {Element} slide - Target slide element.
 *
 * @return {Object}
 */
export default ( slide ) => {
	return {
		/**
		 * Initialization.
		 */
		init() {
			this.create();
		},

		/**
		 * Create some elements.
		 */
		create() {
			this.wrapper    = document.createElement( 'div' );
			this.iframe     = document.createElement( 'div' );
			this.playButton = document.createElement( 'div' );

			this.wrapper.classList.add( WRAPPER_CLASS );
			this.playButton.classList.add( PLAY_BUTTON_CLASS );
			this.wrapper.appendChild( this.iframe );

			slide.appendChild( this.wrapper );
			slide.appendChild( this.playButton );

			this.toggleWrapper( false );
			this.togglePlayButton( false );
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
	};
}