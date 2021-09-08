import { AbstractVideoPlayer } from '../../classes/AbstractVideoPlayer';
/**
 * The wrapper class for the Vimeo player.
 *
 * @since 0.5.0
 */
export declare class HTMLVideoPlayer extends AbstractVideoPlayer<HTMLVideoElement> {
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
    protected createPlayer(videoId: string): HTMLVideoElement;
    /**
     * Starts the video.
     */
    protected playVideo(): void;
    /**
     * Pauses the video.
     */
    protected pauseVideo(): void;
    /**
     * Destroys the player.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/players/html/HTMLVideoPlayer.d.ts.map