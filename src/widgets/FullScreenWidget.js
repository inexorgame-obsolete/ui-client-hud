import $ from 'jquery';
import util from 'util';
import AbstractWidget from './AbstractWidget';

export default class FullScreenWidget extends AbstractWidget {

  constructor(hud) {
    super(hud, 'fullscreen-widget', '{{#root.instances.31417.rendering.screen.fullscreen}}Fullscreen{{/root.instances.31417.rendering.screen.fullscreen}}');
    this.watch('/instances/31417/rendering/screen/fullscreen');
  }

  effect() {
    $('#' + this.name)
      .show(0)
      .delay(750)
      .hide(250);
  }

}
