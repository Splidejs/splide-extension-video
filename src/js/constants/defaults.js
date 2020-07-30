/**
 * Export default options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

export const DEFAULTS = {
	/**
	 * Whether to play the video automatically.
	 *
	 * @type {boolean}
	 */
	autoplay: false,

	/**
	 * Disable the overlay UI.
	 *
	 * @type {boolean}
	 */
	disableOverlayUI: false,

	/**
	 * Hide the video control UI.
	 *
	 * @type {boolean}
	 */
	hideControls: false,

	/**
	 * Loop the video.
	 *
	 * @type {boolean}
	 */
	loop: false,

	/**
	 * Mute the video.
	 *
	 * @type {boolean}
	 */
	mute: false,

	/**
	 * Default volume(0.0-1.0).
	 *
	 * @type {number}
	 */
	volume: 0.2,

	/**
	 * Additional options for each player.
	 * - playerOptions.youtube
	 * - playerOptions.vimeo
	 * - playerOptions.htmlVideo
	 *
	 * @type {Object}
	 */
	playerOptions: {},
};