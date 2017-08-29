import updateWindows from '../helpers/updateWindows';

class Time {
  constructor(initialValue) {
    this.value = new Date().getTime();
    this.name = 'time';
  }

  update(value) {
    updateWindows(this, value);
  }

  static render(value) {
    $("#time").text(value);
  }
}


export default Time;