import { find } from '@splidejs/splide/src/js/utils';
import { AbstractVideoPlayer } from '../../classes/AbstractVideoPlayer';
import { IDLE, INITIALIZED, INITIALIZING, PENDING_PLAY } from '../../constants/states';
import { YouTubeIframeAPILoader } from './YouTubeIframeAPILoader';


/**
 * The wrapper class for the YouTube player.
 *
 * @since 0.5.0
 */
export class YouTubePlayer extends AbstractVideoPlayer<YT.Player> {
  /**
   * The YouTube constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   */
  constructor( target: HTMLElement, videoId: string ) { //todo options
    super( target, videoId );

    this.videoId = this.parseVideoId( videoId );

    if ( this.videoId ) {
      this.state.set( INITIALIZING );
      new YouTubeIframeAPILoader().load( this.onAPIReady.bind( this ) );
    }
  }

  /**
   * Called when the YouTube iframe API is ready.
   */
  private onAPIReady(): void {
    const { state } = this;
    const isPending = state.is( PENDING_PLAY );

    state.set( INITIALIZED );

    if ( isPending ) {
      this.play();
    }
  }

  /**
   * Creates a player.
   *
   * @param videoId - Optional. A video ID.
   *
   * @return A YT.Player instance.
   */
  protected createPlayer( videoId: string ): YT.Player {
    return new YT.Player( this.target, {
      videoId,
      events: {
        onReady      : this.onPlayerReady.bind( this ),
        onStateChange: this.onPlayerStateChange.bind( this ),
      },
    } );
  }

  /**
   * Called when the YouTube player state is changed.
   *
   * @param e - A YT.OnStateChangeEvent object.
   */
  private onPlayerStateChange( e: YT.OnStateChangeEvent ): void {
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
   * Starts the video.
   */
  protected playVideo(): void {
    this.player.playVideo();
  }

  /**
   * Pauses the video.
   */
  protected pauseVideo(): void {
    this.player.pauseVideo();
  }

  /**
   * Parses the video ID.
   * If it is an URL, plucks the ID from it.
   *
   * @param id - An ID to parse.
   *
   * @return A video ID if available, or otherwise `undefined`.
   */
  private parseVideoId( id: string ): string | undefined {
    return id.indexOf( 'http' ) === 0 ? this.parseUrl( id ) : id;
  }

  /**
   * Plucks the ID from the provided URL.
   *
   * @param url - An URL to parse.
   *
   * @return A video ID if available, or otherwise `undefined`.
   */
  private parseUrl( url: string ): string | undefined {
    const [ , search ] = url.split( /[#?]/ );
    const query = find( search.split( '&' ), query => query.indexOf( 'v=' ) === 0 );
    return query && query.replace( 'v=', '' );
  }
}
