import { EventBusCallback } from '@splidejs/splide';
export declare class PlayerUI {
    private readonly parent;
    private readonly modifier;
    private readonly event;
    wrapper: HTMLDivElement;
    iframeWrapper: HTMLDivElement;
    playButton: HTMLButtonElement;
    constructor(slide: HTMLElement);
    private create;
    private listen;
    destroy(): void;
    toggleButton(show?: boolean): void;
    toggleWrapper(show?: boolean): void;
    hide(): void;
    show(): void;
    on(events: string | string[], callback: EventBusCallback): void;
}
//# sourceMappingURL=../../../src/js/classes/PlayerUI.d.ts.map