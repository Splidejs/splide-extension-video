import { BaseComponent, Components, Options, Splide } from '@splidejs/splide';
import { Player } from '../../classes/Player';
import { VideoOptions } from '../../types/options';


declare module '@splidejs/splide' {
  interface Options {
    video?: VideoOptions;
  }
}

/**
 * The extension for embedding videos to slides.
 *
 * @since 0.5.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Video component object.
 */
export function Video( Splide: Splide, Components: Components, options: Options ): BaseComponent {
  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    Components.Slides.forEach( Slide => {
      new Player( Splide, Slide.slide );
    } );
  }

  return {
    mount,
  }
}
