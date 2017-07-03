import $ from 'jquery';
import EventEmitter from 'events';
import Mustache from 'mustache';
import util from 'util';

export default class AbstractWidget extends EventEmitter{

  constructor(hud, name, template = '') {
    super();

    // The HUD
    this.hud = hud;

    // The name of the widget
    this.name = name;

    // The Inexor Tree
    this.root = this.hud.root;

    // The template
    this.template = template;

    // The model
    this.model = {
      root: this.hud.root
    };

    // The tree node paths to
    this.paths = [];

    // Add dom node
    $('body').append(util.format('<div id="%s">Loading %s...</div>', name, name));

  }

  /**
   * Watch on the 
   */
  watch(path, updateMethod = null) {
    // Just tell the HUD which paths should be fetched initially.
    this.hud.paths.push(path);
    // Listen on added nodes
    this.root.on('add', (node) => {
      if (node.getPath() == path) {
        node.on('postSet', ({ oldValue, newValue }) => {
          if (updateMethod != null) {
            updateMethod(node, oldValue, newValue);
          }
          this.render();
        });
        // this.root.removeListener('add', addNodeListener);
        if (updateMethod != null) {
          updateMethod(node, null, node.get());
        }
        this.render();
      }
    });
  }

  render() {
    $('#' + this.name).replaceWith(util.format('<div id="%s">%s</div>', this.name, Mustache.render(this.template, this.model)));
  }

}
