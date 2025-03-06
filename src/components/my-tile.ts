import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-tile')
export class MyTile extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      margin: 8px;
    }
    
    .tile {
      width: 240px;
      height: 160px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s;
      box-sizing: border-box;
      overflow: hidden;
    }
    
    .tile:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .tile-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .icon {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #f1f1f1;
    }
    
    .title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }
    
    .description {
      font-size: 14px;
      color: #555;
      line-height: 1.5;
      flex-grow: 1;
    }
    
    .footer {
      margin-top: 8px;
      font-size: 12px;
      color: #888;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  icon = '';

  @property({ type: String })
  footer = '';

  render() {
    return html`
      <div class="tile" @click=${this._handleClick}>
        <div class="tile-header">
          ${this.icon ? html`
            <div class="icon">
              ${this._renderIcon(this.icon)}
            </div>
          ` : ''}
          <h3 class="title">${this.title}</h3>
        </div>
        
        <div class="description">
          ${this.description}
          <slot></slot>
        </div>
        
        ${this.footer ? html`
          <div class="footer">${this.footer}</div>
        ` : ''}
      </div>
    `;
  }

  private _renderIcon(iconName: string) {
    // Semplice implementazione per alcuni icone comuni
    // In un caso reale, si potrebbe usare una libreria di icone
    const icons: Record<string, string> = {
      'star': '★',
      'heart': '♥',
      'check': '✓',
      'info': 'ℹ',
      'alert': '⚠',
      'plus': '+',
      'minus': '-',
      'settings': '⚙',
    };
    
    return icons[iconName] || iconName;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('tile-click', {
      detail: { title: this.title },
      bubbles: true,
      composed: true
    }));
  }
}