class ProgressRing extends HTMLElement { //this class is purely for UI purposes
  constructor() {
    super();
    const stroke = 8;
    const radius = 75;
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
          <svg
            height="${radius * 2}"
            width="${radius * 2}"
            style='position: relative;
            bottom: 3px;
            right: 3px;'
           >
             <circle
               stroke="red"
               stroke-dasharray="${this._circumference} ${this._circumference}"
               style="stroke-dashoffset:${this._circumference}"
               stroke-width="${stroke}"
               fill="transparent"
               r="${normalizedRadius}"
               cx="${radius}"
               cy="${radius}"
            />
          </svg>
      
          <style>
            circle {
              transition: stroke-dashoffset 0.35s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
          </style>
        `;
    let progress = 0;
    const interval = setInterval(() => {
      this.setAttribute('progress', progress += 10)
      if (progress >= 100)
        clearInterval(interval);
    }, 50);
  }
  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.querySelector('circle');
    circle.style.strokeDashoffset = offset;
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }
}

window.customElements.define('progress-ring', ProgressRing);