import $ from 'jquery';
import AbstractWidget from './AbstractWidget';

export default class WireframeOutlineWidget extends AbstractWidget {
  constructor(hud) {
    super(hud, 'wireframe-outline-widget', '{{#root.instances.31417.wireframe}}Wireframe On{{/root.instances.31417.wireframe}}{{^root.instances.31417.wireframe}}Wireframe Off{{/root.instances.31417.wireframe}}{{#root.instances.31417.outline}}Outline On{{/root.instances.31417.outline}}{{^root.instances.31417.outline}}Outline Off{{/root.instances.31417.outline}}');
    this.watch('/instances/31417/wireframe');
    this.watch('/instances/31417/outline');
  }

  effect() {
    $(`#${this.name}`)
      .show(0)
      .delay(750)
      .hide(250);
  }
}
