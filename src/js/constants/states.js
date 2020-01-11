/**
 * Export state constants.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The player is not initialized.
 *
 * @type {number}
 */
export const NOT_INITIALIZED = 1;

/**
 * Ready to play a video.
 *
 * @type {number}
 */
export const IDLE = 2;

/**
 * Loading a video.
 *
 * @type {number}
 */
export const LOADING = 3;

/**
 * Play request has been sent to the player, but it is aborted.
 *
 * @type {number}
 */
export const PLAY_REQUEST_ABORTED = 4;

/**
 * Playing a video.
 *
 * @type {number}
 */
export const PLAYING = 5;