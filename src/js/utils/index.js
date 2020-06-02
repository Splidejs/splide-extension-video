/**
 * Utility export functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Iterate an object like Array.forEach.
 *
 * @param {Object}   obj      - An object.
 * @param {function} callback - A export function handling each value. Arguments are value, property and index.
 */
export function each( obj, callback ) {
	Object.keys( obj ).some( ( key, index ) => {
		return callback( obj[ key ], key, index );
	} );
}