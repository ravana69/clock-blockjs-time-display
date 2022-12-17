/**
 * Array.from polyfill
 */
if (!Array.from) {
  Array.from = function (object) {
    return [].slice.call(object);
  };
}

/**
 * Clock Block
 */
class ClockBlock {
  constructor(surface) {
    this.elements = {};
    this.elements.surface = surface;
    this.elements.surface.innerHTML = this.template();
    this.elements.diodes = {
      hours: {
        tens: Array.from(document.querySelectorAll('.clockblock__digits--hours .clockblock__digit--tens .clockblock__diode')),
        units: Array.from(document.querySelectorAll('.clockblock__digits--hours .clockblock__digit--units .clockblock__diode')) },

      minutes: {
        tens: Array.from(document.querySelectorAll('.clockblock__digits--minutes .clockblock__digit--tens .clockblock__diode')),
        units: Array.from(document.querySelectorAll('.clockblock__digits--minutes .clockblock__digit--units .clockblock__diode')) },

      seconds: {
        tens: Array.from(document.querySelectorAll('.clockblock__digits--seconds .clockblock__digit--tens .clockblock__diode')),
        units: Array.from(document.querySelectorAll('.clockblock__digits--seconds .clockblock__digit--units .clockblock__diode')) } };



    this.init();
  }

  init() {
    this.getTime();

    window.requestAnimationFrame(() => {
      this.getTime();
      this.updateDom();
      this.updateOldTime();
      this.init();
    });
  }

  template() {
    return `
        <span class="clockblock">
            <span class="clockblock__digits clockblock__digits--hours">
                <span class="clockblock__digit clockblock__digit--tens">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
                <span class="clockblock__digit clockblock__digit--units">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
            </span>
            <span class="clockblock__digits clockblock__digits--minutes">
                <span class="clockblock__digit clockblock__digit--tens">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
                <span class="clockblock__digit clockblock__digit--units">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
            </span>
            <span class="clockblock__digits clockblock__digits--seconds">
                <span class="clockblock__digit clockblock__digit--tens">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
                <span class="clockblock__digit clockblock__digit--units">
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                    <span class="clockblock__diode"></span>
                </span>
            </span>
        </span>
        `;
  }

  getTime() {
    const now = new Date();

    this.time = {
      hours: ('0' + now.getHours()).slice(-2).split(''),
      minutes: ('0' + now.getMinutes()).slice(-2).split(''),
      seconds: ('0' + now.getSeconds()).slice(-2).split('') };

  }

  updateOldTime() {
    this.oldTime = this.time;
  }

  updateDom() {
    this.elements.surface.setAttribute('datetime', this.time.hours.join('') + ':' + this.time.minutes.join(''));

    if (!this.oldTime || this.time.hours[0] !== this.oldTime.hours[0]) {
      this.elements.diodes.hours.tens = this.shuffleArray(this.elements.diodes.hours.tens);
      this.elements.diodes.hours.tens.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.hours[0]; i++) {
        this.elements.diodes.hours.tens[i].classList.add('active');
      }
    }

    if (!this.oldTime || this.time.hours[1] !== this.oldTime.hours[1]) {
      this.elements.diodes.hours.units = this.shuffleArray(this.elements.diodes.hours.units);
      this.elements.diodes.hours.units.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.hours[1]; i++) {
        this.elements.diodes.hours.units[i].classList.add('active');
      }
    }

    if (!this.oldTime || this.time.minutes[0] !== this.oldTime.minutes[0]) {
      this.elements.diodes.minutes.tens = this.shuffleArray(this.elements.diodes.minutes.tens);
      this.elements.diodes.minutes.tens.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.minutes[0]; i++) {
        this.elements.diodes.minutes.tens[i].classList.add('active');
      }
    }

    if (!this.oldTime || this.time.minutes[1] !== this.oldTime.minutes[1]) {
      this.elements.diodes.minutes.units = this.shuffleArray(this.elements.diodes.minutes.units);
      this.elements.diodes.minutes.units.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.minutes[1]; i++) {
        this.elements.diodes.minutes.units[i].classList.add('active');
      }
    }

    if (!this.oldTime || this.time.seconds[0] !== this.oldTime.seconds[0]) {
      this.elements.diodes.seconds.tens = this.shuffleArray(this.elements.diodes.seconds.tens);
      this.elements.diodes.seconds.tens.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.seconds[0]; i++) {
        this.elements.diodes.seconds.tens[i].classList.add('active');
      }
    }

    if (!this.oldTime || this.time.seconds[1] !== this.oldTime.seconds[1]) {
      this.elements.diodes.seconds.units = this.shuffleArray(this.elements.diodes.seconds.units);
      this.elements.diodes.seconds.units.forEach(diode => {
        diode.classList.remove('active');
      });
      for (var i = 0; i < this.time.seconds[1]; i++) {
        this.elements.diodes.seconds.units[i].classList.add('active');
      }
    }

  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }}


new ClockBlock(document.querySelector('time'));