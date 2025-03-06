import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-form')
export class MyForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .form-buttons {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
  `;

  @property({ type: String })
  action = '';

  @property({ type: String })
  method = 'post';

  @property({ type: Boolean })
  novalidate = false;

  firstUpdated() {
    // Ascolta gli eventi degli input
    this.addEventListener('input-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      this._updateFormData(customEvent.detail.name, customEvent.detail.value);
    });

    // Ascolta gli eventi di submit
    this.shadowRoot?.querySelector('form')?.addEventListener('submit', this._handleSubmit.bind(this));
  }

  render() {
    return html`
      <form 
        class="form" 
        action=${this.action} 
        method=${this.method}
        ?novalidate=${this.novalidate}
      >
        <slot></slot>
      </form>
    `;
  }

  private _formData: Record<string, string> = {};

  private _updateFormData(name: string, value: string) {
    if (name) {
      this._formData[name] = value;
    }
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    
    // Controlla validità
    const form = e.target as HTMLFormElement;
    const isValid = form.checkValidity();
    
    if (!isValid) {
      // Mostra messaggi di errore
      form.reportValidity();
      return;
    }
    
    // Dispacci un evento con i dati raccolti
    this.dispatchEvent(new CustomEvent('form-submit', {
      detail: { 
        formData: this._formData 
      },
      bubbles: true,
      composed: true
    }));
    
    // Se c'è un'azione, invia il form al server (raro nei web component)
    if (this.action) {
      form.submit();
    }
  }

  // Metodo pubblico per accedere ai dati del form
  getFormData() {
    return this._formData;
  }
  
  // Metodo pubblico per resettare il form
  reset() {
    this._formData = {};
    const form = this.shadowRoot?.querySelector('form');
    if (form) {
      form.reset();
    }
  }
}