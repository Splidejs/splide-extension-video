import { BaseComponent, Components, EventInterface, Options, Splide } from '@splidejs/splide';
import { Player } from '../../classes/Player';


export interface VideoComponent extends BaseComponent {
}

/**
 * The extension for embedding videos to slides.
 *
 * @since 0.2.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Video component object.
 */
export function Video( Splide: Splide, Components: Components, options: Options ): BaseComponent {
  const { on, bind } = EventInterface( Splide );

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
