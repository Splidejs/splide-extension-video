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
 * The player is being created.
 *
 * @type {number}
 */
export const CREATING_PLAYER = 2;

/**
 * Playing video is requested while creating a player.
 *
 * @type {number}
 */
export const PENDING_PLAY = 3;

/**
 * Ready to play a video.
 *
 * @type {number}
 */
export const IDLE = 4;

/**
 * Loading a video.
 *
 * @type {number}
 */
export const LOADING = 5;

/**
 * Play request has been sent to the player, but it is aborted.
 *
 * @type {number}
 */
export const PLAY_REQUEST_ABORTED = 6;

/**
 * Playing a video.
 *
 * @type {number}
 */
export const PLAYING = 7;