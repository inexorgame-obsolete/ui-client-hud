import tree from '@inexorgame/tree';
import util from 'util';
import widgets from './widgets';

export default class InexorHud {
  constructor() {
    /**
     * Get the URL parameters.
     * 
     * instanceId: The id of the Inexor Core instance.
     * host: The hostname of the Inexor Flex instance.
     * port: The port of the Inexor Flex instance.
     */
    this.parameters = InexorHud.getUrlParameters();

    this.root = new tree.Root();
    this.websocket = new WebSocket(util.format('ws://%s:%s/api/v1/ws/tree', this.parameters.host, this.parameters.port));
    this.websocket.onopen = this.onopen.bind(this);
    this.websocket.onmessage = this.onmessage.bind(this);

    /**
     * The list of widgets.
     */
    this.widgets = [];

    /**
     * The list of tree paths.
     */
    this.paths = [];
  }

  onopen() {
    // TODO: load widgets using tree configuration
    this.addWidget(new widgets.TimeWidget(this));
    this.addWidget(new widgets.ScreenSizeWidget(this));
    this.addWidget(new widgets.FullScreenWidget(this));

    for (let i = 0; i < this.paths.length; i += 1) {
      this.getNode(this.paths[i]);
    }
    this.render();
  }

  onmessage(event) {
    const request = JSON.parse(event.data);
    // console.log(request);
    let node;
    switch (request.state) {
      case 'add':
        try {
          node = this.root.createRecursive(request.path, request.datatype, request.value, true);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'sync':
        node = this.root.findNode(request.path);
        if (node != null) {
          try {
            node.set(request.value);
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            node = this.root.createRecursive(request.path, request.datatype, request.value, true);
          } catch (err) {
            console.log(err);
          }
        }
        break;
      default:
        break;
    }
  }

  render() {
    for (let i = 0; i < this.widgets.length; i += 1) {
      this.widgets[i].render();
    }
  }

  addWidget(widget) {
    this.widgets.push(widget);
  }

  getNode(path) {
    this.websocket.send(JSON.stringify({
      path,
    }));
  }

  /**
   * Extracts the URL parameters.
   * @function
   * @name getParameters
   * @returns {object} The parameters.
   */
  static getUrlParameters() {
    const parameters = {
      host: 'localhost',
      port: 31416,
      instanceId: null,
    };
    const query = window.location.search.split('?');
    if (query.length === 2) {
      const params = query[1].split('&');
      for (let i = 0; i < params.length; i += 1) {
        const kv = params[i].split('=');
        parameters[kv[0]] = kv[1];
      }
    }
    return parameters;
  }
}
