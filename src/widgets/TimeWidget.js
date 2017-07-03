import util from 'util';
import AbstractWidget from './AbstractWidget';

export default class TimeWidget extends AbstractWidget {

  constructor(hud) {
    // InexorHud, template
    super(hud, 'time-widget', '<h3>{{hello}} {{name}}</h3><p>{{root.instances.31417.description}}</p>');
    
    // Watch on changes on these tree nodes:

    // By default the model is updated automatically and the render function is called
    this.watch('/instances/31417/description');

    // This
    this.watch('/instances/31417/name', this.customUpdateMethod.bind(this)); // Handle 

    // Set model
    this.model.hello = 'Hello';
  }

  customUpdateMethod(node, oldValue, newValue) {
    console.log('2');
    this.model.name = newValue;
    this.model.hello = 'Hello';
  }

}
