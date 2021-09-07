import { isUndefined, queryAll, create, isFunction } from '@splidejs/splide/src/js/utils';


declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * The URL to the YouTube iframe API script.
 */
const YOUTUBE_API_SRC = 'http://www.youtube.com/player_api'; // todo

/**
 * The class for loading the YouTube API script.
 *
 * @link https://developers.google.com/youtube/iframe_api_reference
 *
 * @since 0.5.0
 */
export class YouTubeIframeAPILoader {
  /**
   * Starts loading the YouTube API script.
   *
   * @param callback - A callback function that will be invoked when the API is ready.
   */
  load( callback: () => void ): void {
    if ( window.YT && isFunction( window.YT.Player ) ) {
      return callback();
    }

    this.attachCallback( callback );

    if ( this.shouldLoad() ) {
      create( 'script', { src: YOUTUBE_API_SRC }, document.head );
    }
  }

  /**
   * Checks if the new script tag for the YouTube API should be injected or not.
   *
   * @return `true` if the source
   */
  private shouldLoad(): boolean {
    return ! queryAll<HTMLScriptElement>( document, 'script' ).some( script => script.src === YOUTUBE_API_SRC );
  }

  /**
   * Attaches the callback function that will be invoked when the API is ready.
   *
   * @param callback - A callback function to invoke.
   */
  private attachCallback( callback: () => void ): void {
    let oldCallback: () => void;

    if ( ! isUndefined( window.onYouTubeIframeAPIReady ) ) {
      oldCallback = window.onYouTubeIframeAPIReady;
    }

    window.onYouTubeIframeAPIReady = () => {
      oldCallback && oldCallback();
      callback();
    };
  }
}
