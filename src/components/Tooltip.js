export default class Tooltip {
  constructor(tooltipSelector, tooltipHoverSelector) {
    this._tooltip = document.querySelector(tooltipSelector);
    this._tooltipHover = document.querySelector(tooltipHoverSelector);
  }

  open() {
    this._tooltip.classList.add('tooltip_opened');
  }

  close() {
    this._tooltip.classList.remove('tooltip_opened');
  }

  setEventListenersOpen() {
    this._tooltipHover.addEventListener('mouseover', () => {
      this.open()
    });
  }

  setEventListenersClose() {
    this._tooltipHover.addEventListener('mouseout', () => {
      this.close()
    });
  }
}
