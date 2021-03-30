class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItems(element) {
    this._container.prepend(element);
  }
  
}

export default Section;