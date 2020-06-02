/**
 * The sub component for embedding a Vimeo video.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import BaseProvider from '../base/base-provider';
import Player from './player';

/**
 * The sub component for embedding a Vimeo video.
 */
export default class Vimeo extends BaseProvider {
	/**
	 * Vimeo constructor.
	 *
	 * @param {Splide} Splide     - A Splide instance.
	 * @param {Object} Components - An object containing components.
	 */
	constructor( Splide, Components ) {
		super( Splide, Components );
		this.createPlayers( Player, 'data-splide-vimeo' );
	}
}