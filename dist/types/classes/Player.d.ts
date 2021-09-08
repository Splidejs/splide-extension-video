import { Splide } from '@splidejs/splide';
/**
 * The class for the video player that connects a Splide slide with PlayerUI and VideoPlayer instances.
 *
 * @since 0.5.0
 */
export declare class Player {
    /**
     * The Splide instance.
     */
    private Splide;
    /**
     * The PlayerUI instance.
     */
    private ui;
    /**
     * The VideoPlayer instance.
     */
    private player;
    /**
     * The EventInterface object.
     */
    private event;
    /**
     * The Player constructor.
     *
     * @param Splide - A Splide instance.
     * @param slide  - A slide element where the player is applied.
     */
    constructor(Splide: Splide, slide: HTMLElement);
    /**
     * Creates a Player.
     * This will fail when the slide element does not have a data attribute for a video.
     *
     * @param slide - A slide element.
     */
    private createPlayer;
    /**
     * Listens to UI, VideoPlayer and Splide events.
     */
    private listen;
    /**
     * Starts the video.
     */
    private play;
    /**
     * Pauses the video.
     */
    private pause;
    /**
     * Called when the slide element is clicked.
     */
    private onClick;
    /**
     * Called when any slides that have a video are clicked.
     *
     * @param player - A player instance that the clicked slide has.
     */
    private onVideoClick;
    /**
     * Called when the video is requested to start.
     * The video may be loading at this moment.
     */
    private onPlay;
    /**
     * Called when the video begins.
     */
    private onPlayed;
    /**
     * Called when the video is requested to pause.
     */
    private onPause;
    /**
     * Called when the video is paused.
     */
    private onPaused;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../src/js/classes/Player.d.ts.map