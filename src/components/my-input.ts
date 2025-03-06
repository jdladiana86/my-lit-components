import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-input')
export class MyInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    
    .input-container {
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: 500;
    }
    
    input, textarea {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #0077cc;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    input:disabled, textarea:disabled {
      background-color: #f8f8f8;
      cursor: not-allowed;
    }
    
    textarea {
      min-height: 80px;
      resize: vertical;
    }
    
    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
      display: none;
    }
    
    input:invalid + .error-message,
    textarea:invalid + .error-message {
      display: block;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  multiline = false;

  @property({ type: String })
  errorMessage = 'Questo campo è richiesto';

  @state()
  private _value = '';

  firstUpdated() {
    this._value = this.value;
  }

  render() {
    return html`
      <div class="input-container">
        ${this.label ? html`<label for="input-${this._generateId()}">${this.label}</label>` : ''}
        
        ${this.multiline 
          ? html`<textarea
              id="input-${this._generateId()}"
              name=${this.name}
              placeholder=${this.placeholder}
              ?required=${this.required}
              ?disabled=${this.disabled}
              @input=${this._handleInput}
              .value=${this._value}
            ></textarea>`
          : html`<input
              id="input-${this._generateId()}"
              type=${this.type}
              name=${this.name}
              placeholder=${this.placeholder}
              ?required=${this.required}
              ?disabled=${this.disabled}
              @input=${this._handleInput}
              .value=${this._value}
            >`
        }
        <span class="error-message">${this.errorMessage}</span>
      </div>
    `;
  }

  private _generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement | HTMLTextAreaElement;
    this._value = input.value;
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { 
        name: this.name,
        value: this._value 
      },
      bubbles: true,
      composed: true
    }));
  }
}