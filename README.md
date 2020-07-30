# Video - Splide Extension
This is an extension of the [Splide](https://github.com/Splidejs/splide) slider library for playing videos of HTML video, YouTube and Vimeo. You must get Splide before using it.

* [Demo and Document](https://splidejs.com/extension-video/)

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
1. Import minified stylesheet and JavaScript files on your site:
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-video@latest/dist/css/splide-extension-video.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-video@latest/dist/js/splide-extension-video.min.js">
    ```
1. Mount the extension to the Splide.
    ```javascript
    new Splide( '#splide' ).mount( window.splide.Extensions );
    ```

### HTML
Assign videos to slides by data attributes:
```html
<div class="splide">
    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide" data-splide-html-video="path or url to the source file">
                <img src="thumbnail01.jpg">
            </li>
            <li class="splide__slide" data-splide-youtube="https://www.youtube.com/watch?v=cdz__ojQOuU">
                <img src="thumbnail02.jpg">
            </li>
            <li class="splide__slide" data-splide-vimeo="https://vimeo.com/215334213">
                <img src="thumbnail03.jpg">
            </li>
        </ul>
    </div>
</div>
```

## Available Options
### Options
* **autoplay**: Whether to play the video automatically. This option is ignored when the [Grid](https://github.com/Splidejs/splide-extension-grid) extension is active.
* **disableOverlayUI**: If true, the overlay UI including a play button is not rendered.
* **hideControls**: Hide the video control UI.
* **loop**: Loop the video.
* **mute**: Mute the video.
* **volume**: Volume(0.0-1.0).
* **playerOptions**: Options for each player.

### Player Options
Each player accepts different options respectively. They can be changed through `playerOptions`. Be aware that individual options can overwrite options above.
```javascript
playerOptions: {
  youtube: {
    cc_lang_pref: 'jpn',
  },
  vimeo: {
    byline: true,
  },
  htmlVideo: {
    playsinline: true,
  },
}
```
Visit these links for a documentation of each player.
- [Youtube](https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5)
- [Vimeo](https://github.com/vimeo/player.js)
- [HTML Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

## License
Splide is released under the MIT license.  
© 2020 Naotoshi Fujita
