/**
 * Set the Video extension to the global object.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Video from '../../src/js/splide-extension-video';

window.splide = window.splide || {};
window.splide.Extensions = window.splide.Extensions || {};
window.splide.Extensions.Video = Video;