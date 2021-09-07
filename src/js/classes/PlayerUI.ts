import { EventBus, EventBusCallback } from '@splidejs/splide';
import { CLASS_CONTAINER, CLASS_SLIDE } from '@splidejs/splide/src/js/constants/classes';
import { create, display, remove, removeClass, child } from '@splidejs/splide/src/js/utils';
import { CLASS_VIDEO_PLAY_BUTTON, CLASS_VIDEO_WRAPPER } from '../constants/classes';


export class PlayerUI {
  private readonly parent: HTMLElement;

  private readonly modifier: string;

  private readonly event = EventBus();

  wrapper: HTMLDivElement;

  iframeWrapper: HTMLDivElement;

  playButton: HTMLButtonElement;

  constructor( slide: HTMLElement ) {
    const container = child( slide, `.${ CLASS_CONTAINER }` );

    this.parent   = container || slide;
    this.modifier = `${ container ? CLASS_CONTAINER : CLASS_SLIDE }--has-video`;

    this.create();
    this.listen();
  }

  private create(): void {
    this.wrapper       = create( 'div', CLASS_VIDEO_WRAPPER, this.parent );
    this.iframeWrapper = create( 'div', null, this.wrapper );
    this.playButton    = create( 'button', { class: CLASS_VIDEO_PLAY_BUTTON, type: 'button' }, this.parent );
  }

  private listen(): void {
    this.parent.addEventListener( 'click', () => {
      this.event.emit( 'click' );
    } );
  }

  destroy(): void {
    removeClass( this.parent, this.modifier );
    remove( [ this.wrapper, this.playButton ] );
    this.event.destroy();
  }

  toggleButton( show?: boolean ): void {
    display( this.playButton, show ? '' : 'none' );
  }

  toggleWrapper( show?: boolean ): void {
    display( this.wrapper, show ? '' : 'none' );
  }

  hide(): void {
    this.toggleButton( false );
    this.toggleWrapper( true );
  }

  show(): void {
    this.toggleButton( true );
    this.toggleWrapper( false );
  }

  on( events: string | string[], callback: EventBusCallback ): void {
    this.event.on( events, callback );
  }
}
