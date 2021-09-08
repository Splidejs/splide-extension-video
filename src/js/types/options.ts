export interface VideoOptions {
  /**
   * Enables autoplay. If `true`, the video of the active slide will automatically start.
   */
  autoplay?: boolean,

  /**
   * Disables the overlay controls such as the play button.
   */
  disableOverlayUI?: boolean,

  /**
   * Requests the video player to hide the player UI.
   */
  hideControls?: boolean,

  /**
   * Loops the video.
   */
  loop?: boolean,

  /**
   * Mutes the video.
   */
  mute?: boolean,

  /**
   * Sets the initial volume by 0.0 - 1.0
   */
  volume?: number,

  /**
   * Overwrites player options.
   */
  playerOptions?: {
    youtube?: YT.PlayerVars;
  };
}
