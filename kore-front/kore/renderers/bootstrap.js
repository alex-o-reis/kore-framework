/**
 * BootstrapRenderer — Implementação nativa do Renderer para Bootstrap 5.3+ e Bootstrap Icons.
 */
class BootstrapRenderer extends BaseRenderer {
    constructor() {
        super('Bootstrap 5');
    }

    // Formulários
    input(type = 'text', id = '', required = false, label = '', value = '', disabled = false, classes = '', maxLength = null, min = null, max = null, step = null) {
        let attrs = {
            type: type,
            class: 'form-control' + (classes ? ' ' + classes : ''),
            id: id,
            name: id,
            value: value
        };
        if (required) attrs.required = required;
        if (disabled) attrs.disabled = disabled;
        if (maxLength) attrs.maxlength = maxLength;
        if (min !== null) attrs.min = min;
        if (max !== null) attrs.max = max;
        if (step !== null) attrs.step = step;

        let inputEl = this.element('input', attrs);
        if (!label) return inputEl;

        let labelEl = this.element('label', { for: id, class: 'form-label fw-medium' }, label + (required ? ' *' : ''));
        return this.div('mb-3', labelEl + inputEl);
    }

    switch(id, checked = false, label = '', disabled = false, classes = '') {
        let attrs = {
            class: 'form-check-input' + (classes ? ' ' + classes : ''),
            type: 'checkbox',
            role: 'switch',
            id: id,
            name: id
        };
        if (checked) attrs.checked = checked;
        if (disabled) attrs.disabled = disabled;

        let inputEl = this.element('input', attrs);
        let labelEl = label ? this.element('label', { class: 'form-check-label', for: id }, label) : '';
        return this.div('form-check form-switch mb-3', inputEl + labelEl);
    }

    fileUpload(id, label = '', required = false, accept = '', disabled = false, classes = '') {
        let attrs = {
            class: 'form-control' + (classes ? ' ' + classes : ''),
            type: 'file',
            id: id,
            name: id
        };
        if (required) attrs.required = required;
        if (disabled) attrs.disabled = disabled;
        if (accept) attrs.accept = accept;

        let inputEl = this.element('input', attrs);
        let labelEl = label ? this.element('label', { class: 'form-label fw-medium', for: id }, label + (required ? ' *' : '')) : '';
        return this.div('mb-3', labelEl + inputEl);
    }

    textarea(label = '', id = '', rows = 3, content = '', disabled = false, classes = '') {
        let attrs = {
            id: id,
            name: id,
            class: 'form-control' + (classes ? ' ' + classes : ''),
            rows: rows
        };
        if (disabled) attrs.disabled = disabled;

        let textareaEl = this.element('textarea', attrs, content);
        if (!label) return textareaEl;

        let labelEl = this.element('label', { for: id, class: 'form-label fw-medium' }, label);
        return this.div('mb-3', labelEl + textareaEl);
    }

    select(id, required = false, label = '', options = [], minLength = 0, disabled = false) {
        let optionsHtml = '';
        if (Array.isArray(options)) {
            for (let opt of options) {
                let optAttrs = { value: opt.value };
                if (opt.selected) optAttrs.selected = 'selected';
                if (opt.disabled) optAttrs.disabled = 'disabled';
                optionsHtml += this.element('option', optAttrs, opt.text || opt.label || opt.value);
            }
        }

        let selectAttrs = {
            class: 'form-select smartselect',
            id: id,
            name: id,
            'data-min': minLength
        };
        if (required) selectAttrs.required = required;
        if (disabled) selectAttrs.disabled = disabled;

        let selectEl = this.element('select', selectAttrs, optionsHtml);

        let smartInputAttrs = {
            type: 'text',
            class: 'form-control smartinput',
            id: id + '-smartinput',
            'data-for': id,
            autocomplete: 'off',
            placeholder: '-- Selecione --'
        };
        if (disabled) smartInputAttrs.disabled = disabled;

        let labelText = label + (required ? ' *' : '');
        let labelEl = label ? this.element('label', { for: id + '-smartinput', class: 'form-label fw-medium' }, labelText + this.element('span', { class: 'smartbox-loading ms-2 d-none', 'data-for': id }, this.loadingIcon())) : '';

        let smartInputEl = this.element('input', smartInputAttrs);
        let dropdownWrap = this.div('smartbox-dropdown', smartInputEl);

        return this.div('mb-3', labelEl + selectEl + dropdownWrap);
    }

    checkbox(id, checked = false, label = '', classes = '') {
        let attrs = {
            class: 'form-check-input' + (classes ? ' ' + classes : ''),
            type: 'checkbox',
            id: id,
            name: id
        };
        if (checked) attrs.checked = checked;

        let inputEl = this.element('input', attrs);
        let labelEl = label ? this.element('label', { class: 'form-check-label', for: id }, label) : '';
        return this.div('form-check mb-2', inputEl + labelEl);
    }

    radioButton(id, name, checked = false, label = '', classes = '') {
        let attrs = {
            class: 'form-check-input' + (classes ? ' ' + classes : ''),
            type: 'radio',
            id: id,
            name: name
        };
        if (checked) attrs.checked = checked;

        let inputEl = this.element('input', attrs);
        let labelEl = label ? this.element('label', { class: 'form-check-label', for: id }, label) : '';
        return this.div('form-check mb-2', inputEl + labelEl);
    }

    // Botões
    button(id, text, classes = 'btn-primary', attributes = {}) {
        let attrs = Object.assign({
            type: 'button',
            class: 'btn ' + (classes.startsWith('btn-') ? classes : 'btn-' + classes)
        }, attributes || {});

        if (id) attrs.id = id;
        return this.element('button', attrs, text);
    }

    // Cards / Painéis
    card(title = '', body = '', footer = '', classes = '') {
        let headerHtml = title ? this.cardHeader(title) : '';
        let bodyHtml = this.cardBody(body);
        let footerHtml = footer ? this.cardFooter(footer) : '';

        return this.div('card shadow-sm mb-4 ' + classes, headerHtml + bodyHtml + footerHtml);
    }

    cardHeader(title, extra = '') {
        let titleHtml = typeof title === 'string' && !title.startsWith('<') ? this.element('h5', { class: 'card-title mb-0' }, title) : title;
        return this.div('card-header d-flex justify-content-between align-items-center', titleHtml + extra);
    }

    cardBody(content, classes = '') {
        return this.div('card-body ' + classes, content);
    }

    cardFooter(content, classes = '') {
        return this.div('card-footer text-muted ' + classes, content);
    }

    // Modais & Diálogos
    modal(modalId, title, content, footer = '', size = '') {
        let closeBtn = this.element('button', { type: 'button', class: 'btn-close', 'data-bs-dismiss': 'modal', 'aria-label': 'Close' });
        let modalTitle = this.element('h5', { class: 'modal-title', id: modalId + 'Label' }, title);
        let modalHeader = this.div('modal-header', modalTitle + closeBtn);
        let modalBody = this.div('modal-body', content);
        let modalFooter = footer ? this.div('modal-footer', footer) : '';

        let modalContent = this.div('modal-content shadow', modalHeader + modalBody + modalFooter);
        let modalDialog = this.div('modal-dialog modal-dialog-centered ' + size, modalContent);

        return this.element('div', {
            class: 'modal fade',
            id: modalId,
            tabindex: -1,
            'aria-labelledby': modalId + 'Label',
            'aria-hidden': 'true'
        }, modalDialog);
    }

    confirmDialog(id, title, text, btnConfirmTemAcao = false) {
        let btnConfirmId = btnConfirmTemAcao ? 'btn-confirm-' + id : 'btn-confirm-' + id;
        let btnConfirm = this.button(btnConfirmId, 'Confirmar', 'btn-primary');
        let btnCancel = this.button('btn-cancel-' + id, 'Cancelar', 'btn-secondary', { 'data-bs-dismiss': 'modal' });
        let botoes = btnCancel + ' ' + btnConfirm;
        return this.modal(id, title, text, botoes);
    }

    // Badges & Alerts
    badge(id, color = 'primary', value = '') {
        let attrs = { class: 'badge text-bg-' + color };
        if (id) attrs.id = id;
        return this.element('span', attrs, value);
    }

    alert(type = 'info', content = '', icon = '') {
        let iconHtml = icon ? this.icon(icon) + ' ' : '';
        let closeBtn = this.element('button', { type: 'button', class: 'btn-close', 'data-bs-dismiss': 'alert', 'aria-label': 'Close' });
        return this.div('alert alert-' + type + ' alert-dismissible fade show shadow-sm', iconHtml + content + closeBtn);
    }

    toast(title, message, type = 'info') {
        let bgClass = type === 'error' || type === 'danger' ? 'text-bg-danger' : (type === 'success' ? 'text-bg-success' : (type === 'warning' ? 'text-bg-warning' : 'text-bg-primary'));
        let toastHtml = `
        <div class="toast align-items-center ${bgClass} border-0 show shadow" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${title ? '<strong>' + title + '</strong><br>' : ''}${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;

        let container = jQuery('#kore-toast-container');
        if (!container.length) {
            jQuery('body').append('<div id="kore-toast-container" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1090;"></div>');
            container = jQuery('#kore-toast-container');
        }

        let toastEl = jQuery(toastHtml);
        container.append(toastEl);
        setTimeout(() => toastEl.fadeOut(300, function() { jQuery(this).remove(); }), 4000);
        return toastHtml;
    }

    progressBar(id, value = 0, color = 'primary', height = '20px') {
        let barAttrs = {
            id: id,
            class: 'progress-bar bg-' + color + ' progress-bar-striped progress-bar-animated',
            role: 'progressbar',
            style: 'width: ' + value + '%;',
            'aria-valuenow': value,
            'aria-valuemin': 0,
            'aria-valuemax': 100
        };
        let bar = this.element('div', barAttrs, value + '%');
        return this.div('progress mb-3', bar);
    }

    // Tabs
    tabs(id, tabsList = [], classes = '') {
        let itemsHtml = '';
        for (let i = 0; i < tabsList.length; i++) {
            let tab = tabsList[i];
            let active = i === 0 || tab.active ? ' active' : '';
            let linkAttrs = {
                class: 'nav-link' + active,
                id: tab.id + '-tab',
                'data-bs-toggle': 'tab',
                'data-bs-target': '#' + tab.id,
                type: 'button',
                role: 'tab',
                'aria-controls': tab.id,
                'aria-selected': active ? 'true' : 'false'
            };
            let link = this.element('button', linkAttrs, tab.text || tab.title);
            itemsHtml += this.element('li', { class: 'nav-item', role: 'presentation' }, link);
        }
        return this.element('ul', { class: 'nav nav-tabs ' + classes, id: id, role: 'tablist' }, itemsHtml);
    }

    tabContent(id, panesList = []) {
        let panesHtml = '';
        for (let i = 0; i < panesList.length; i++) {
            let pane = panesList[i];
            let active = i === 0 || pane.active ? ' show active' : '';
            panesHtml += this.div('tab-pane fade' + active + (pane.classes ? ' ' + pane.classes : ''), pane.content);
        }
        return this.div('tab-content p-3 border border-top-0 rounded-bottom bg-white', panesHtml);
    }

    // Ícones (Bootstrap Icons nativo)
    icon(iconName, classes = '') {
        let name = iconName.startsWith('bi-') ? iconName : 'bi-' + iconName;
        return this.element('i', { class: 'bi ' + name + (classes ? ' ' + classes : '') });
    }

    loadingIcon(size = '') {
        return this.element('div', { class: 'spinner-border text-primary ' + (size ? 'spinner-border-' + size : 'spinner-border-sm'), role: 'status' }, this.element('span', { class: 'visually-hidden' }, 'Carregando...'));
    }
}