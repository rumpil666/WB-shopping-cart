export default class Section {
  constructor({ items, renderer }) {
    this._renderedItems = items;
    this._renderer = renderer;
  }

  addItem(element, container) {
    container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
