/**
 * The class for controlling YouTube video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import BasePlayer from '../base/base-player';

/**
 * The class for controlling YouTube video.
 */
export default class Player extends BasePlayer {
	/**
	 * Create a player.
	 * This must be overridden in a child class.
	 *
	 * @return {object|null}
	 */
	createPlayer() {
		const options = this.Splide.options.video;

		return new YT.Player( this.elements.iframe, {
			videoId: this.videoId,
			playerVars: {
				fs            : options.disableFullScreen,
				controls      : options.hideControls,
				iv_load_policy: 3,
				loop          : options.loop,
				rel           : 0,
				autoplay      : true,
			},
			events: {
				'onReady': this.onPlayerReady.bind( this ),
			}
		} );
	}

	/**
	 * Called when the YouTube player is ready.
	 *
	 * @param {Object} e - An event object.
	 */
	onPlayerReady( e ) {
		if ( this.Splide.options.video.mute ) {
			e.target.mute();
		}
	}

	/**
	 * Play video.
	 */
	playVideo() {
		this.player.playVideo();
	}

	/**
	 * Pause video.
	 */
	pauseVideo() {
		this.player.pauseVideo();
	}

	/**
	 * Find the video ID from the HTML.
	 *
	 * @return {string} - Video ID.
	 */
	findVideoId(){
		const url    = this.slide.getAttribute( 'data-splide-youtube' );
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		const match  = url.match( regExp );

		return ( match && match[ 7 ].length === 11 ) ? match[7] : '';
	}
}