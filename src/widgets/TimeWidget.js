import AbstractWidget from './AbstractWidget';

export default class TimeWidget extends AbstractWidget {
  constructor(hud) {
    /**
     * @param {InexorHud} The inexor hud component
     * @param {string} The widget name (and css class name)
     * @param {string} The template
     */
    super(hud, 'time-widget', '{{time}}');

    /**
     * Update locale
     */
    this.watch('/instances/31417/hud/widgets/time/enabled', this.enable.bind(this));

    /**
     * Update locale
     */
    this.watch('/instances/31417/hud/widgets/time/locale', this.updateLocale.bind(this));

    /**
     * Update options
     */
    this.watch('/instances/31417/hud/widgets/time/options/timeZone', this.updateOptions.bind(this));
    this.watch('/instances/31417/hud/widgets/time/options/timeZoneName', this.updateOptions.bind(this));
    this.watch('/instances/31417/hud/widgets/time/options/hour', this.updateOptions.bind(this));
    this.watch('/instances/31417/hud/widgets/time/options/hour12', this.updateOptions.bind(this));
    this.watch('/instances/31417/hud/widgets/time/options/minute', this.updateOptions.bind(this));

    this.enabled = true;

    /**
     * The locale to use for time formatting.
     */
    this.locale = (navigator.language) ? navigator.language : navigator.userLanguage;

    /**
     * The time options.
     * @private
     * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
     */
    this.options = {
      // timeZone: 'UTC',
      // timeZoneName: 'short',
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
    };

    setInterval(this.update.bind(this), 750);
  }

  /**
   * Updates the model and renders the widget.
   * @function
   */
  update() {
    if (this.enabled) {
      this.model.time = (new Date()).toLocaleTimeString(this.locale, this.options);
      this.render();
    }
  }

  enable(node, oldValue, newValue) {
    this.enabled = newValue;
  }

  updateLocale(node, oldValue, newValue) {
    this.locale = newValue;
  }

  updateOptions(node, oldValue, newValue) {
    this.options[node.getName()] = newValue;
  }
}
