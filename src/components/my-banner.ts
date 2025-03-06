import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-banner')
export class MyBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 16px 0;
    }
    
    .banner {
      padding: 14px 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      position: relative;
    }
    
    .banner-success {
      background-color: #d4edda;
      border-left: 4px solid #28a745;
      color: #155724;
    }
    
    .banner-error {
      background-color: #f8d7da;
      border-left: 4px solid #dc3545;
      color: #721c24;
    }
    
    .banner-warning {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;
    }
    
    .banner-info {
      background-color: #d1ecf1;
      border-left: 4px solid #17a2b8;
      color: #0c5460;
    }
    
    .icon {
      margin-right: 12px;
      font-size: 20px;
    }
    
    .message {
      flex-grow: 1;
      font-size: 14px;
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: inherit;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    .close-button:hover {
      opacity: 1;
    }

    .hidden {
      display: none;
    }
  `;

  @property({ type: String })
  type = 'info';  // success, error, warning, info

  @property({ type: String })
  message = '';

  @property({ type: Boolean })
  dismissible = true;

  @property({ type: Boolean })
  visible = true;

  render() {
    if (!this.visible) {
      return html``;
    }

    return html`
      <div class="banner banner-${this.type}">
        <div class="icon">${this._getIcon()}</div>
        <div class="message">
          ${this.message}
          <slot></slot>
        </div>
        ${this.dismissible ? html`
          <button class="close-button" @click=${this._dismiss}>×</button>
        ` : ''}
      </div>
    `;
  }

  private _getIcon() {
    const icons = {
      'success': '✓',
      'error': '✕',
      'warning': '⚠',
      'info': 'ℹ'
    };
    
    return icons[this.type as keyof typeof icons] || 'ℹ';
  }

  private _dismiss() {
    this.visible = false;
    this.dispatchEvent(new CustomEvent('banner-dismiss', {
      bubbles: true,
      composed: true
    }));
  }
}