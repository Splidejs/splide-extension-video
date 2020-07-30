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
	 *
	 * @param {function} readyCallback - Callback function triggered when the player gets ready.
	 *
	 * @return {object|null} - A created player object.
	 */
	createPlayer( readyCallback = null ) {
		const options = this.Splide.options.video;
		const { youtube = {} } = options.playerOptions;

		const player = new YT.Player( this.elements.iframe, {
			videoId: this.videoId,
			playerVars: {
				controls      : options.hideControls ? 0 : 1,
				iv_load_policy: 3,
				loop          : options.loop,
				playlist      : options.loop ? this.videoId : '',
				rel           : 0,
				autoplay      : false,
				...youtube,
			},
			events: {
				'onReady': e => {
					this.onPlayerReady( e );

					if ( readyCallback ) {
						readyCallback();
					}
				},
				'onStateChange': this.onPlayerStateChange.bind( this ),
			}
		} );

		return player;
	}

	/**
	 * Called when the YouTube player is ready.
	 *
	 * @param {Object} e - An event object.
	 */
	onPlayerReady( e ) {
		const player  = e.target;
		const options = this.Splide.options.video;

		if ( options.mute ) {
			player.mute();
		}

		player.setVolume( Math.max( Math.min( options.volume * 100, 100 ), 0 ) );
	}

	/**
	 * Called when the YouTube player state is changed.
	 *
	 * @param {Object} e - An event object.
	 */
	onPlayerStateChange( e ) {
		const { PLAYING, PAUSED, ENDED } = YT.PlayerState;

		switch ( true ) {
			case e.data === PLAYING:
				this.onPlay();
				break;

			case e.data === PAUSED:
				this.onPause();
				break;

			case e.data === ENDED:
				this.onEnded();
				break;
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