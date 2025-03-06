import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      margin: 8px;
    }
    
    button {
      padding: 10px 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid #ccc;
      background-color: #f8f8f8;
      transition: all 0.2s;
      font-family: inherit;
    }
    
    button:hover:not([disabled]) {
      background-color: #eaeaea;
    }
    
    button:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    button[variant="primary"] {
      background-color: #0077cc;
      border-color: #0077cc;
      color: white;
    }
    
    button[variant="primary"]:hover:not([disabled]) {
      background-color: #0066b3;
    }
    
    button[variant="secondary"] {
      background-color: #6c757d;
      border-color: #6c757d;
      color: white;
    }
    
    button[variant="secondary"]:hover:not([disabled]) {
      background-color: #5a6268;
    }
    
    button[disabled] {
      opacity: 0.65;
      cursor: not-allowed;
    }
  `;

  @property({ type: String, reflect: true })
  variant = 'default';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  type = 'button';

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  render() {
    return html`
      <button
        type=${this.type}
        name=${this.name}
        value=${this.value}
        ?disabled=${this.disabled}
        variant=${this.variant}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}