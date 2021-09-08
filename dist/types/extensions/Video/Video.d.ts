import { BaseComponent, Components, Options, Splide } from '@splidejs/splide';
declare module '@splidejs/splide' {
    interface Options {
        video: number;
    }
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
export declare function Video(Splide: Splide, Components: Components, options: Options): BaseComponent;
//# sourceMappingURL=../../../../src/js/extensions/Video/Video.d.ts.map