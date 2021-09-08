import Vimeo from '@vimeo/player';
import { AbstractVideoPlayer } from '../../classes/AbstractVideoPlayer';
/**
 * The wrapper class for the Vimeo player.
 *
 * @since 0.5.0
 */
export declare class VimeoPlayer extends AbstractVideoPlayer<Vimeo> {
    /**
     * The VimeoPlayer constructor.
     *
     * @param target  - A target element where the player is mounted.
     * @param videoId - A video ID or an URL itself.
     */
    constructor(target: HTMLElement, videoId: string);
    /**
     * Creates a player.
     *
     * @param videoId - Optional. A video ID or an URL.
     *
     * @return A Vimeo player instance.
     */
    protected createPlayer(videoId: string): Vimeo;
    /**
     * Starts the video.
     */
    protected playVideo(): void;
    /**
     * Pauses the video.
     */
    protected pauseVideo(): void;
}
//# sourceMappingURL=../../../../src/js/players/vimeo/VimeoPlayer.d.ts.map