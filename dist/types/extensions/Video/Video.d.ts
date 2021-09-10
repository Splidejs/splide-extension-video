import { BaseComponent, Components, Options, Splide } from '@splidejs/splide';
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
export declare function Video(Splide: Splide, Components: Components, options: Options): BaseComponent;
//# sourceMappingURL=../../../../src/js/extensions/Video/Video.d.ts.map