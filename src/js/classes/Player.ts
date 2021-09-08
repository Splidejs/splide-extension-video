import { EVENT_ACTIVE, EVENT_MOVE, EventInterface, EventInterfaceObject, Splide } from '@splidejs/splide';
import { getAttribute, merge } from '@splidejs/splide/src/js/utils';
import { SlideComponent } from '../../../../splide/dist/types/components/Slides/Slide';
import { HTML_VIDEO__DATA_ATTRIBUTE, VIMEO_DATA_ATTRIBUTE, YOUTUBE_DATA_ATTRIBUTE } from '../constants/data-attributes';
import { DEFAULTS } from '../constants/defaults';
import { EVENT_VIDEO_CLICK, EVENT_VIDEO_PAUSE, EVENT_VIDEO_PLAY } from '../constants/events';
import { HTMLVideoPlayer } from '../players/html/HTMLVideoPlayer';
import { VimeoPlayer } from '../players/vimeo/VimeoPlayer';
import { YouTubePlayer } from '../players/youtube/YouTubePlayer';
import { VideoPlayerConstructor, VideoPlayerInterface } from '../types/general';
import { VideoOptions } from '../types/options';
import { PlayerUI } from './PlayerUI';


/**
 * Associates the data attribute name with the player constructor.
 *
 * @since 0.5.0
 */
const VIDEO_PLAYER_MAP: Array<[ string, VideoPlayerConstructor ]> = [
  [ YOUTUBE_DATA_ATTRIBUTE, YouTubePlayer ],
  [ VIMEO_DATA_ATTRIBUTE, VimeoPlayer ],
  [ HTML_VIDEO__DATA_ATTRIBUTE, HTMLVideoPlayer ],
];

/**
 * The class for the video player that connects a Splide slide with PlayerUI and VideoPlayer instances.
 *
 * @since 0.5.0
 */
export class Player {
  /**
   * The Splide instance.
   */
  private readonly Splide: Splide;

  /**
   * The slide element.
   */
  private readonly slide: HTMLElement;

  /**
   * Video options.
   */
  private readonly options: VideoOptions;

  /**
   * The PlayerUI instance.
   */
  private ui: PlayerUI;

  /**
   * The VideoPlayer instance.
   */
  private player: VideoPlayerInterface;

  /**
   * The EventInterface object.
   */
  private event: EventInterfaceObject;

  /**
   * The Player constructor.
   *
   * @param Splide - A Splide instance.
   * @param slide  - A slide element where the player is applied.
   */
  constructor( Splide: Splide, slide: HTMLElement ) {
    this.Splide  = Splide;
    this.slide   = slide;
    this.event   = EventInterface( Splide );
    this.options = merge( merge( {}, DEFAULTS ), this.Splide.options.video );

    this.createPlayer( slide );

    if ( this.player ) {
      this.listen();
    }
  }

  /**
   * Creates a Player.
   * This will fail when the slide element does not have the data attribute for the video.
   *
   * @param slide - A slide element.
   */
  private createPlayer( slide: HTMLElement ): void {
    VIDEO_PLAYER_MAP.forEach( ( [ attr, Constructor ] ) => {
      const id = getAttribute( slide, attr );

      if ( id ) {
        this.ui     = new PlayerUI( slide );
        this.player = new Constructor( this.ui.iframeWrapper, id, this.options );
      }
    } );
  }

  /**
   * Listens to UI, VideoPlayer and Splide events.
   */
  private listen(): void {
    const { player, event } = this;

    this.ui.on( 'click', this.onClick.bind( this ) );

    player.on( 'play', this.onPlay.bind( this ) ); // todo
    player.on( 'played', this.onPlayed.bind( this ) );
    player.on( 'pause', this.onPause.bind( this ) );
    player.on( 'paused', this.onPaused.bind( this ) );

    event.on( EVENT_MOVE, this.pause.bind( this ) );
    event.on( EVENT_VIDEO_CLICK, this.onVideoClick.bind( this ) );

    // if ( this.options.autoplay ) {
      event.on( EVENT_ACTIVE, this.onActive.bind( this ) );
    // }
  }

  /**
   * Starts the video.
   */
  private play(): void {
    if ( this.player ) {
      this.player.play();
    }
  }

  /**
   * Pauses the video.
   */
  private pause(): void {
    if ( this.player ) {
      this.player.pause();
    }
  }

  /**
   * Called when the slide element is clicked.
   */
  private onClick(): void {
    this.play();
    this.event.emit( EVENT_VIDEO_CLICK, this );
  }

  /**
   * Called when any slides that have a video are clicked.
   *
   * @param player - A player instance that the clicked slide has.
   */
  private onVideoClick( player: Player ): void {
    if ( this !== player ) {
      this.pause();
    }
  }

  /**
   * Called when the video is requested to start.
   * The video may be loading at this moment.
   */
  private onPlay(): void {
    this.ui.hide();
  }

  /**
   * Called when the video begins.
   */
  private onPlayed(): void {
    this.ui.hide();
    this.event.emit( EVENT_VIDEO_PLAY, this );
  }

  /**
   * Called when the video is requested to pause.
   */
  private onPause(): void {
    this.ui.show();
  }

  /**
   * Called when the video is paused.
   */
  private onPaused(): void {
    this.ui.show();
    this.event.emit( EVENT_VIDEO_PAUSE, this );
  }

  /**
   * Called any slides become active.
   */
  private onActive( Slide: SlideComponent ): void {
    console.log( Slide );

    if ( Slide.slide === this.slide ) {
      this.play();
    }
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    if ( this.player ) {
      this.ui.destroy();
      this.player.destroy();
    }
  }
}
