import updateWindows from '../helpers/updateWindows';

class Gear {
  constructor(initialValue) {
    this.name = 'gear';
    this.value = initialValue || '?';
  }

  update(value) {
    updateWindows(this, value);
  }

  static render(value) {
    $("#gear").text(value);
  }
}


export default Gear;