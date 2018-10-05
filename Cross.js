class Cross extends HTMLElement { //this class is purely for UI purposes
    constructor() {
        super();
        this._root = this.attachShadow({mode: 'open'});
        this._root.innerHTML = `
          <svg
            height="150px"
            width="150px"
           >
             <line class="line" x1="10" y1="10" x2="135" y2="135" stroke="blue" stroke-width="8"
            />
            <line class="line2" x1="135" y1="10" x2="10" y2="135" stroke="blue" stroke-width="8"
            />
          </svg>
          <style>
          .line {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
            animation: drawline 0.5s linear;
            }
            .line2 {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
            animation: drawline2 1s linear;
        }
        @keyframes drawline {
            from {
                stroke-dashoffset: 200;
            }
            to {
                stroke-dashoffset: 0;
            }
        }
        @keyframes drawline2 {
            0% {
                stroke-dashoffset: 200;
            }
            50% {
                stroke-dashoffset: 200;
            }
            100% {
                stroke-dashoffset: 0;
            }
        }
          </style>
        `;
    }
}

window.customElements.define('cross-element', Cross);