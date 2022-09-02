import { BaseComponent, CLASS_SLIDE, Components, EventInterface, Splide } from '@splidejs/splide';
import { forOwn, hasClass } from '@splidejs/splide/src/js/utils';
import { Player } from '../../classes/Player';
import { VideoOptions } from '../../types/options';
import { MODIFIER_HAS_VIDEO } from "../../constants/classes";


/**
 * Lets the compiler know the type of video options.
 */
declare module '@splidejs/splide' {
  interface Options {
    video?: VideoOptions;
  }

  interface Components {
    Video?: VideoComponent;
  }
}

/**
 * The interface for the Video component.
 *
 * @since 0.5.3
 */
export interface VideoComponent extends BaseComponent {
  play( index?: number ): void;
  pause(): void;
  disable( disabled: boolean ): void;
}

/**
 * The extension for embedding videos to slides.
 *
 * @since 0.5.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 *
 * @return A Video component object.
 */
export function Video( Splide: Splide, Components: Components ): VideoComponent {
  const { on } = EventInterface( Splide );
  const { Slides } = Components;

  /**
   * Stores Player instances.
   */
  const players: Record<number, Player> = {};

  /**
   * Called when the extension is mounted.
   * When detecting the refresh event, creates players for non-initialized slides.
   */
  function mount(): void {
    create();
    on( 'refresh', create );
  }

  /**
   * Creates players for slides that have not been initialized.
   * Needs to call `update()` for attributes related with accessibility.
   */
  function create(): void {
    Slides.forEach( Slide => {
      const { slide } = Slide;

      if ( ! hasClass( slide, `${ CLASS_SLIDE }${ MODIFIER_HAS_VIDEO }` ) ) {
        players[ Slide.index ] = new Player( Splide, slide );
      }
    } );

    Slides.update();
  }

  /**
   * Destroys the extension.
   */
  function destroy(): void {
    forOwn( players, player => {
      player.destroy();
    } );
  }

  /**
   * Plays the video at the active or specified index.
   *
   * @param index - A slide index.
   */
  function play( index = Splide.index ): void {
    const player = players[ index ];

    if ( player ) {
      player.play();
    }
  }

  /**
   * Pauses the playing video.
   */
  function pause(): void {
    forOwn( players, player => {
      player.pause();
    } );
  }

  /**
   * Disables play/pause.
   *
   * @param disabled - Set `true` for disabling the play/pause control.
   */
  function disable( disabled: boolean ): void {
    forOwn( players, player => {
      player.disable( disabled );
    } );
  }

  return {
    mount,
    destroy,
    play,
    pause,
    disable,
  };
}
