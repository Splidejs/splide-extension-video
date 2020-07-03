/**
 * The base class for the provider.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { each } from "../../utils";


/**
 * The sub component for the provider.
 */
export default class BaseProvider {
	/**
	 * BaseProvider constructor.
	 *
	 * @param {Splide} Splide     - A Splide instance.
	 * @param {Object} Components - An object containing components.
	 */
	constructor( Splide, Components ) {
		this.Splide     = Splide;
		this.Components = Components;
		this.players    = [];
	}

	/**
	 * Create all players.
	 *
	 * @param {Player} Player        - A Player class.
	 * @param {string} attributeName - attribute name for a video URL.
	 */
	createPlayers( Player, attributeName ) {
		this.Components.Elements.getSlides( true ).forEach( Slide => {
			if ( this.Components.Grid ) {
				each( Slide.slide.querySelectorAll( `.${ this.Components.Grid.colClass }` ), slide => {
					this.createPlayer( slide, Player, attributeName );
				} );
			}

			this.createPlayer( Slide.slide, Player, attributeName );
		} );
	}

	/**
	 * Create a player.
	 *
	 * @param {Element} slide         - A slide element.
	 * @param {Player}  Player        - A Player class.
	 * @param {string}  attributeName - attribute name for a video URL.
	 */
	createPlayer( slide, Player, attributeName ) {
		const data = slide.getAttribute( attributeName );

		if ( data ) {
			this.players.push( new Player( this.Splide, this.Components, slide ) );
		}
	}

	/**
	 * Destroy.
	 */
	destroy() {
		this.players.forEach( player => { player.destroy() } );
	}
}