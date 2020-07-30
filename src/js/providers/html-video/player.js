/**
 * The class for controlling a HTML video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import BasePlayer from '../base/base-player';
import { each } from "../../utils";

/**
 * Valid player props.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 *
 * @type {string[]}
 */
const PLAYER_PROPS = [
	'autoplay',
	'autoPictureInPicture',
	'controls',
	'controlslist',
	'crossorigin',
	'currentTime',
	'disablePictureInPicture',
	'disableRemotePlayback',
	'height',
	'intrinsicsize',
	'loop',
	'muted',
	'playsinline',
	'poster',
	'preload',
	'width',
];


/**
 * The class for controlling a HTML video.
 */
export default class Player extends BasePlayer {
	/**
	 * Create a player.
	 *
	 * @param {function} readyCallback - Callback function triggered when the player gets ready.
	 *
	 * @return {object|null} - A created player object.
	 */
	createPlayer( readyCallback = null ) {
		const options = this.Splide.options.video;
		const { htmlVideo = {} } = options.playerOptions;

		const player = document.createElement( 'video' );
		player.src = this.videoId;

		this.elements.iframe.appendChild( player );

		player.controls = ! options.hideControls;
		player.loop     = options.loop;
		player.volume = Math.max( Math.min( options.volume, 1 ), 0 );
		player.muted  = options.mute;

		each( htmlVideo, ( value, key ) => {
			if ( PLAYER_PROPS.indexOf( key ) > -1 ) {
				player[ key ] = value;
			}
		} );

		player.addEventListener( 'play', this.onPlay.bind( this ) );
		player.addEventListener( 'pause', this.onPause.bind( this ) );
		player.addEventListener( 'ended', this.onEnded.bind( this ) );

		if ( readyCallback ) {
			player.addEventListener( 'loadeddata', readyCallback );
		}

		return player;
	}

	/**
	 * Find the video ID from the HTML.
	 * Use the given path or URL as ID for a raw video.
	 *
	 * @return {string} - Video ID(path or URL).
	 */
	findVideoId(){
		return this.slide.getAttribute( 'data-splide-html-video' );
	}

	/**
	 * Destroy.
	 */
	destroy() {
		if ( this.player ) {
			this.player.pause();
			this.player.removeAttribute( 'src' );
			this.player.load();

			this.elements.iframe.removeChild( this.player );
			this.player = null;
		}

		this.elements.destroy();
	}
}