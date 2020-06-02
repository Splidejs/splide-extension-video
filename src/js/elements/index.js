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
 * @param {Splide}  Splide - A Splide instance.
 * @param {Element} slide  - A target slide element.
 *
 * @return {Object}
 */
export default ( Splide, slide ) => {
	/**
	 * Elements sub component.
	 *
	 * @type {Object}
	 */
	const Elements = {
		/**
		 * Initialization.
		 */
		init() {
			this.initElements();
			this.toggleWrapper( false );
			this.togglePlayButton( false );
		},

		/**
		 * Create some elements.
		 */
		initElements() {
			const container = findContainer( slide );

			this.parent = container || slide;

			this.className = `${ Splide.classes[ container ? 'container' : 'slide' ].split( ' ' )[0] }--has-video`;
			this.parent.classList.add( this.className );

			this.wrapper    = create( 'div' );
			this.iframe     = create( 'div' );
			this.playButton = create( 'button' );

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
			remove( this.wrapper );
			remove( this.playButton );
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

	/**
	 * Find a container element.
	 *
	 * @param {Element} slide - A slide element.
	 *
	 * @return {Element} - A container element if found. Null otherwise.
	 */
	function findContainer( slide ) {
		return findChild( slide, Splide.classes['container'].split( ' ' )[0] || '' );
	}

	/**
	 * Find a child which has the given class name.
	 *
	 * @param {Element} parent    - A parent element.
	 * @param {string}  className - A class name.
	 *
	 * @return {Element|null} - A found child element if available or null if not.
	 */
	function findChild( parent, className ) {
		return Object.keys( parent.children ).map( key => parent.children[ key ] ).filter( child => {
			return child.classList.contains( className );
		} )[0] || null;
	}

	/**
	 * Create a new element.
	 *
	 * @param {string} tag - A tag name for the element.
	 *
	 * @return {Element} - A created element.
	 */
	function create( tag ) {
		return document.createElement( tag );
	}

	/**
	 * Remove the given element.
	 *
	 * @param {Element} elm - An element being removed.
	 */
	function remove( elm ) {
		const parent = elm.parentElement;

		if ( parent ) {
			parent.removeChild( elm );
		}
	}

	return Elements;
}