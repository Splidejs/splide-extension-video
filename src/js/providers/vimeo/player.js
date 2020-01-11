/**
 * The class for controlling Vimeo video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import VimeoPlayer from '@vimeo/player';
import BasePlayer from '../base/base-player';

/**
 * The class for controlling Vimeo video.
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

		const player = new VimeoPlayer( this.elements.iframe, {
			id      : this.videoId,
			controls: ! options.hideControls,
			loop    : options.loop,
		} );

		player.on( 'play', this.onPlay.bind( this ) );
		player.on( 'pause', this.onPause.bind( this ) );
		player.on( 'end', this.onEnd.bind( this ) );

		if ( options.mute ) {
			player.setMuted( true ).then( () => { player.play() } );
		} else {
			player.play();
		}

		return player;
	}

	/**
	 * Find the video ID from the HTML.
	 *
	 * @return {string} - Video ID.
	 */
	findVideoId(){
		const url    = this.slide.getAttribute( 'data-splide-vimeo' );
		const regExp = /vimeo.com\/(\d+)/;
		const match  = url.match( regExp );

		return ( match && match[ 1 ] ) ? match[1] : '';
	}
}