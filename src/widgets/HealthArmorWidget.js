import $ from 'jquery';
import AbstractWidget from './AbstractWidget';

export default class HealthWidget extends AbstractWidget {
  constructor(hud) {
    super(hud, 'health-widget', '{{#root.instances.31417.health}}');
    this.watch('/instances/31417/health');
  }

  effect() {
    $(`#${this.name}`)
      .show(0)
      .delay(750)
      .hide(250);
  }
}

export default class ArmorWidget extends AbstractWidget {
  constructor(hud) {
    super(hud, 'armor-widget', '{{#root.instances.31417.health}}');
    this.watch('/instances/31417/health');
  }

  effect() {
    $(`#${this.name}`)
      .show(0)
      .delay(750)
      .hide(250);
  }
}
