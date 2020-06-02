/**
 * The sub component for embedding a HTML video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import BaseProvider from '../base/base-provider';
import Player from './player';

/**
 * The sub component for embedding a HTML video.
 */
export default class HTMLVideo extends BaseProvider {
	/**
	 * HTMLVideo constructor.
	 *
	 * @param {Splide} Splide     - A Splide instance.
	 * @param {Object} Components - An object containing components.
	 */
	constructor( Splide, Components ) {
		super( Splide, Components );
		this.createPlayers( Player, 'data-splide-html-video' );
	}
}