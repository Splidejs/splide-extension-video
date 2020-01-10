# Extension of Splide for playing Videos
This is an extension of the [Splide](https://github.com/Splidejs/splide) slider library for playing videos of YouTube and Vimeo. You must get Splide before using it.

* [Demo](https://splidejs.com/)
* [Documents](https://splidejs.com/)

## Installation
### NPM(Recommended)
1. Get the latest extension by NPM:
    ```bash
    $ npm install @splidejs/splide-extension-video
    ```
1. Link to the stylesheet:
    ```html
    <link rel="stylesheet" href="node_modules/@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css">
    ```
1. Mount the extension to the Splide.
    ```javascript
    import Splide from '@splidejs/splide';
    import Video from '@splidejs/splide-extension-video';
    new Splide( '#splide' ).mount( { Video } );
    ```
    
### CDN or Hosting Files
1. Visit [jsDelivr](https://www.jsdelivr.com/package/npm/@splidejs/splide-extension-video) and get the links of the latest files or download files from the dist library.
1. Import these files on your site:
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-video@0.0.2/dist/css/splide-extension-video.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-video@0.0.2/dist/js/splide-extension-video.min.js">
    ```
    Note that version numbers above are incorrect.
1. Mount the extension to the Splide.
    ```javascript
    new Splide( '#splide' ).mount( splide.Extensions );
    ```
    
### Available Options
* **autoplay**: Whether to play the video automatically.
* **hideControls**: Hide the video control UI.
* **disableFullScreen**: Hide full screen button(Only for YouTube).
* **loop**: Loop the video.
* **mute**: Mute the video.

## License
Splide is released under the MIT license.  
© 2019 Naotoshi Fujita