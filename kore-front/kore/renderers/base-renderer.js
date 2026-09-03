/**
 * BaseRenderer — Contrato Abstrato de Renderização de Interface para o Kore Framework.
 * Qualquer designer ou desenvolvedor pode criar seu próprio Renderer estendendo esta classe.
 */
class BaseRenderer {
    constructor(name = 'Base') {
        this.name = name;
    }

    // Utilitários de atributos e elementos genéricos
    getAttributes(attributes) {
        let html = '';
        if (attributes) {
            let entries = Object.entries(attributes);
            for (let i = 0; i < entries.length; i++) {
                let [key, val] = entries[i];
                if (val === '' || val === true) html += ' ' + key;
                else if (val !== false && val !== null && val !== undefined) html += ' ' + key + '="' + String(val).replace(/"/g, '&quot;') + '"';
            }
        }
        return html;
    }

    element(name, attributes = {}, content = '') {
        let attrHtml = this.getAttributes(attributes);
        let voidElements = ['hr', 'br', 'input', 'img', 'meta', 'link'];
        if (voidElements.includes(name.toLowerCase())) {
            return '<' + name + attrHtml + ' />';
        }
        return '<' + name + attrHtml + '>' + (content !== null && content !== undefined ? content : '') + '</' + name + '>';
    }

    div(classes, content = '') {
        return this.element('div', { class: classes }, content);
    }

    span(classes, content = '') {
        return this.element('span', { class: classes }, content);
    }

    hr(classes = '', content = '') {
        return this.element('hr', { class: classes }, content);
    }

    href(text, url = '#', target = '_self', classes = '', data = {}) {
        let attrs = { href: url, target: target, class: classes };
        if (typeof data === 'object') {
            for (let [k, v] of Object.entries(data)) {
                attrs['data-' + k] = v;
            }
        } else if (data) {
            attrs['data-id'] = data;
        }
        return this.element('a', attrs, text);
    }

    // Grid System
    row(content = '', classes = '') {
        return this.div('row ' + classes, content);
    }

    col(size = 12, content = '', classes = '') {
        let colClass = size ? 'col-12 col-md-' + size : 'col';
        return this.div(colClass + (classes ? ' ' + classes : ''), content);
    }

    // Formulários
    input(type, id, required = false, label = '', value = '', disabled = false, classes = '', maxLength = null, min = null, max = null, step = null) {
        throw new Error('Method input() must be implemented by Renderer');
    }

    switch(id, checked = false, label = '', disabled = false, classes = '') {
        throw new Error('Method switch() must be implemented by Renderer');
    }

    fileUpload(id, label = '', required = false, accept = '', disabled = false, classes = '') {
        throw new Error('Method fileUpload() must be implemented by Renderer');
    }

    hidden(id, value = '') {
        return this.element('input', { type: 'hidden', id: id, value: value });
    }

    textarea(label, id, rows = 3, content = '', disabled = false, classes = '') {
        throw new Error('Method textarea() must be implemented by Renderer');
    }

    select(id, required = false, label = '', options = [], minLength = 0, disabled = false) {
        throw new Error('Method select() must be implemented by Renderer');
    }

    checkbox(id, checked = false, label = '', classes = '') {
        throw new Error('Method checkbox() must be implemented by Renderer');
    }

    radioButton(id, name, checked = false, label = '', classes = '') {
        throw new Error('Method radioButton() must be implemented by Renderer');
    }

    // Botões
    button(id, text, classes = 'btn-primary', attributes = {}) {
        throw new Error('Method button() must be implemented by Renderer');
    }

    // Cards / Painéis
    card(title, body, footer = '', classes = '') {
        throw new Error('Method card() must be implemented by Renderer');
    }

    cardHeader(title, extra = '') {
        throw new Error('Method cardHeader() must be implemented by Renderer');
    }

    cardBody(content, classes = '') {
        throw new Error('Method cardBody() must be implemented by Renderer');
    }

    cardFooter(content, classes = '') {
        throw new Error('Method cardFooter() must be implemented by Renderer');
    }

    // Modais & Diálogos
    modal(modalId, title, content, footer = '', size = '') {
        throw new Error('Method modal() must be implemented by Renderer');
    }

    confirmDialog(id, title, text, btnConfirmTemAcao = false) {
        throw new Error('Method confirmDialog() must be implemented by Renderer');
    }

    // Badges, Alerts & Toasts
    badge(id, color = 'primary', value = '') {
        throw new Error('Method badge() must be implemented by Renderer');
    }

    alert(type = 'info', content = '', icon = '') {
        throw new Error('Method alert() must be implemented by Renderer');
    }

    toast(title, message, type = 'info') {
        throw new Error('Method toast() must be implemented by Renderer');
    }

    progressBar(id, value = 0, color = 'primary', height = '20px') {
        throw new Error('Method progressBar() must be implemented by Renderer');
    }

    // Tabs
    tabs(id, tabsList = [], classes = '') {
        throw new Error('Method tabs() must be implemented by Renderer');
    }

    tabContent(id, panesList = []) {
        throw new Error('Method tabContent() must be implemented by Renderer');
    }

    // Accordion
    accordion(id, items = [], classes = '') {
        throw new Error('Method accordion() must be implemented by Renderer');
    }

    // Breadcrumb
    breadcrumb(items = [], classes = '') {
        throw new Error('Method breadcrumb() must be implemented by Renderer');
    }

    // Pagination
    pagination(id, currentPage = 1, totalPages = 1, maxVisible = 5, classes = '') {
        throw new Error('Method pagination() must be implemented by Renderer');
    }

    // Input Group & Button Group
    inputGroup(id, label = '', inputEl = '', prepend = '', append = '', classes = '') {
        throw new Error('Method inputGroup() must be implemented by Renderer');
    }

    buttonGroup(buttonsHtml = '', size = '', vertical = false, classes = '') {
        throw new Error('Method buttonGroup() must be implemented by Renderer');
    }

    dropdown(id, text = '', items = [], color = 'primary', classes = '') {
        throw new Error('Method dropdown() must be implemented by Renderer');
    }

    // List Group
    listGroup(items = [], flush = false, classes = '') {
        throw new Error('Method listGroup() must be implemented by Renderer');
    }

    // Offcanvas (Drawer lateral)
    offcanvas(id, title = '', content = '', position = 'end', classes = '') {
        throw new Error('Method offcanvas() must be implemented by Renderer');
    }

    // Skeleton / Placeholders
    skeleton(type = 'text', count = 1, classes = '') {
        throw new Error('Method skeleton() must be implemented by Renderer');
    }

    // Ícones
    icon(iconName, classes = '') {
        throw new Error('Method icon() must be implemented by Renderer');
    }

    loadingIcon(size = '') {
        throw new Error('Method loadingIcon() must be implemented by Renderer');
    }
}