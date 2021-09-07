import Vimeo from '@vimeo/player';
import { AbstractVideoPlayer } from '../../classes/AbstractVideoPlayer';
import { IDLE, INITIALIZED, PLAY_REQUEST_ABORTED } from '../../constants/states';


/**
 * The wrapper class for the Vimeo player.
 *
 * @since 0.5.0
 */
export class VimeoPlayer extends AbstractVideoPlayer<Vimeo> {
  /**
   * The VimeoPlayer constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   */
  constructor( target: HTMLElement, videoId: string ) { // todo options
    super( target, videoId );
    this.state.set( INITIALIZED );
  }

  /**
   * Creates a player.
   *
   * @param videoId - Optional. A video ID or an URL.
   *
   * @return A Vimeo player instance.
   */
  protected createPlayer( videoId: string ): Vimeo {
    const isURL = videoId.indexOf( 'http' ) === 0;

    console.log( videoId, +videoId );

    const player = new Vimeo( this.target, {
      id : isURL ? undefined : +videoId,
      url: isURL ? videoId : undefined,
    } );

    player.on( 'play', this.onPlay );
    player.on( 'pause', this.onPause );
    player.on( 'ended', this.onEnded );
    player.ready().then( this.onPlayerReady ); // todo error

    return player;
  }

  /**
   * Starts the video.
   */
  protected playVideo(): void {
    this.player.play().catch( () => {
      if ( this.state.is( PLAY_REQUEST_ABORTED ) ) {
        this.state.set( IDLE );
      }
    } );
  }

  /**
   * Pauses the video.
   */
  protected pauseVideo(): void {
    this.player.pause();
  }
}
