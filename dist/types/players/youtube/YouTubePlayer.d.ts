/// <reference types="youtube" />
import { AbstractVideoPlayer } from '../../classes/AbstractVideoPlayer';
/**
 * The wrapper class for the YouTube player.
 *
 * @since 0.5.0
 */
export declare class YouTubePlayer extends AbstractVideoPlayer<YT.Player> {
    /**
     * The YouTube constructor.
     *
     * @param target  - A target element where the player is mounted.
     * @param videoId - A video ID or an URL itself.
     */
    constructor(target: HTMLElement, videoId: string);
    /**
     * Called when the YouTube iframe API is ready.
     */
    private onAPIReady;
    /**
     * Creates a player.
     *
     * @param videoId - Optional. A video ID.
     *
     * @return A YT.Player instance.
     */
    protected createPlayer(videoId: string): YT.Player;
    /**
     * Called when the YouTube player state is changed.
     *
     * @param e - A YT.OnStateChangeEvent object.
     */
    private onPlayerStateChange;
    /**
     * Starts the video.
     */
    protected playVideo(): void;
    /**
     * Pauses the video.
     */
    protected pauseVideo(): void;
    /**
     * Parses the video ID.
     * If it is an URL, plucks the ID from it.
     *
     * @param id - An ID to parse.
     *
     * @return A video ID if available, or otherwise `undefined`.
     */
    private parseVideoId;
    /**
     * Plucks the ID from the provided URL.
     *
     * @param url - An URL to parse.
     *
     * @return A video ID if available, or otherwise `undefined`.
     */
    private parseUrl;
}
//# sourceMappingURL=../../../../src/js/players/youtube/YouTubePlayer.d.ts.map