class Section {
  constructor({renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItems(element) {
    this._container.prepend(element);
  }
  
}

export default Section;