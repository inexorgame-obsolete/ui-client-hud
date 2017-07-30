import $ from 'jquery';
import AbstractWidget from './AbstractWidget';

export default class ScreenSizeWidget extends AbstractWidget {
  constructor(hud) {
    super(hud, 'screen-size-widget', '<div id="screen-size">{{root.instances.31417.rendering.screen.scr_w}} x {{root.instances.31417.rendering.screen.scr_h}}</div>');
    this.watch('/instances/31417/rendering/screen/scr_w');
    this.watch('/instances/31417/rendering/screen/scr_h');
  }

  effect() {
    $(`#${this.name}`)
      .show(0)
      .delay(750)
      .hide(250);
  }
}
