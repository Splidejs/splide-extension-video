/**
 * The extension component for embedding videos to slides.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import HtmlVideo from './providers/html-video';
import YouTube from './providers/youtube';
import Vimeo from './providers/vimeo';

import { DEFAULTS } from "./constants/defaults";

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
	 * Playing slide index.
	 *
	 * @type {number}
	 */
	let playingIndex = -1;

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

			const providers = [ HtmlVideo, YouTube, Vimeo ];
			providers.forEach( provider => {
				const Provider = provider( Splide, Components );
				Providers.push( Provider );
				Provider.mount();
			} );

			bind();
		},

		/**
		 * Destroy.
		 */
		destroy() {
			Providers.forEach( Provider => Provider.destroy() );
		}
	};

	/**
	 * Listen some events.
	 */
	function bind() {
		Splide.on( 'video:play', Player => {
			playingIndex = Player.Slide.index;
			Splide.root.classList.add( PLAYING_STATUS_CLASS_NAME );
		} );

		Splide.on( 'video:pause video:end', Player => {
			if ( Player.Slide.index === playingIndex ) {
				playingIndex = -1;
				Splide.root.classList.remove( PLAYING_STATUS_CLASS_NAME );
			}
		} );
	}

	return Video;
}