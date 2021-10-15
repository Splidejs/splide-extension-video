import { BaseComponent, Components, Splide } from '@splidejs/splide';
import { Player } from '../../classes/Player';
import { VideoOptions } from '../../types/options';


/**
 * Lets the compiler know the type of video options.
 */
declare module '@splidejs/splide' {
  interface Options {
    video?: VideoOptions;
  }
}

/**
 * The interface for the Video component.
 *
 * @since 0.5.3
 */
export interface VideoComponent extends BaseComponent {
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
  /**
   * Stores Player instances.
   */
  const players: Player[] = [];

  /**
   * Called when the extension is mounted.
   */
  function mount(): void {
    Components.Slides.forEach( Slide => {
      players.push( new Player( Splide, Slide.slide ) );
    } );

    Splide.refresh();
  }

  /**
   * Destroys the extension.
   */
  function destroy(): void {
    players.forEach( player => {
      player.destroy();
    } );
  }

  /**
   * Pauses the playing video.
   */
  function pause(): void {
    players.forEach( player => {
      player.pause();
    } );
  }

  /**
   * Disables play/pause.
   *
   * @param disabled - Set `true` for disabling the play/pause control.
   */
  function disable( disabled: boolean ): void {
    players.forEach( player => {
      player.disable( disabled );
    } );
  }

  return {
    mount,
    destroy,
    pause,
    disable,
  };
}
