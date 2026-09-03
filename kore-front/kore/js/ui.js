/**
 * UI — Relay Engine de Interface do Kore Framework.
 * A classe UI centraliza as chamadas de construcao de HTML e despacha para o Renderer ativo.
 */
class UI {
    static _renderer = null;

    /**
     * Define o Renderer ativo para geracao de componentes.
     * @param {BaseRenderer} rendererInst
     */
    static setRenderer(rendererInst) {
        UI._renderer = rendererInst;
    }

    /**
     * Retorna o Renderer ativo. Se nenhum tiver sido definido, inicializa o BootstrapRenderer por padrao.
     * @returns {BaseRenderer}
     */
    static getRenderer() {
        if (!UI._renderer) {
            if (typeof BootstrapRenderer !== 'undefined') {
                UI._renderer = new BootstrapRenderer();
            } else if (typeof BaseRenderer !== 'undefined') {
                UI._renderer = new BaseRenderer();
            }
        }
        return UI._renderer;
    }

    // --- Utilitários de Formatação ---
    static formatDate(dateStr) {
        if (!dateStr) return '-';
        let parts = dateStr.toString().trim().split(' ')[0].split('-');
        if (parts.length === 3) {
            return parts[2] + '/' + parts[1] + '/' + parts[0];
        }
        return dateStr;
    }

    static formatNumber(val, decimals = 2) {
        if (val === null || val === undefined || val === '') return '0,00';
        let num = parseFloat(val);
        if (isNaN(num)) return '0,00';
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    // --- Relay para o Renderer Ativo ---
    static element(name, attributes, content) {
        return UI.getRenderer().element(name, attributes, content);
    }

    static div(classes, content) {
        return UI.getRenderer().div(classes, content);
    }

    static span(classes, content) {
        return UI.getRenderer().span(classes, content);
    }

    static hr(classes, content) {
        return UI.getRenderer().hr(classes, content);
    }

    static href(text, url, target, classes, data) {
        return UI.getRenderer().href(text, url, target, classes, data);
    }

    static row(content, classes) {
        return UI.getRenderer().row(content, classes);
    }

    static col(size, content, classes) {
        return UI.getRenderer().col(size, content, classes);
    }

    static input(type, id, required, label, value, disabled, classes, maxLength, min, max, step) {
        return UI.getRenderer().input(type, id, required, label, value, disabled, classes, maxLength, min, max, step);
    }

    static switch(id, checked, label, disabled, classes) {
        return UI.getRenderer().switch(id, checked, label, disabled, classes);
    }

    static fileUpload(id, label, required, accept, disabled, classes) {
        return UI.getRenderer().fileUpload(id, label, required, accept, disabled, classes);
    }

    static hidden(id, value) {
        return UI.getRenderer().hidden(id, value);
    }

    static textarea(label, id, rows, content, disabled, classes) {
        return UI.getRenderer().textarea(label, id, rows, content, disabled, classes);
    }

    static select(id, required, label, options, minLength, disabled) {
        return UI.getRenderer().select(id, required, label, options, minLength, disabled);
    }

    static checkbox(id, checked, label, classes) {
        return UI.getRenderer().checkbox(id, checked, label, classes);
    }

    static radioButton(id, name, checked, label, classes) {
        return UI.getRenderer().radioButton(id, name, checked, label, classes);
    }

    static button(id, text, classes, attributes) {
        return UI.getRenderer().button(id, text, classes, attributes);
    }

    static card(title, body, footer, classes) {
        return UI.getRenderer().card(title, body, footer, classes);
    }

    static cardHeader(title, extra) {
        return UI.getRenderer().cardHeader(title, extra);
    }

    static cardBody(content, classes) {
        return UI.getRenderer().cardBody(content, classes);
    }

    static cardFooter(content, classes) {
        return UI.getRenderer().cardFooter(content, classes);
    }

    static modal(modalId, title, content, footer, size) {
        return UI.getRenderer().modal(modalId, title, content, footer, size);
    }

    static confirmDialog(id, title, text, btnConfirmTemAcao) {
        return UI.getRenderer().confirmDialog(id, title, text, btnConfirmTemAcao);
    }

    static badge(id, color, value) {
        return UI.getRenderer().badge(id, color, value);
    }

    static alert(type, content, icon) {
        return UI.getRenderer().alert(type, content, icon);
    }

    static toast(title, message, type) {
        return UI.getRenderer().toast(title, message, type);
    }

    static progressBar(id, value, color, height) {
        return UI.getRenderer().progressBar(id, value, color, height);
    }

    static tabs(id, tabsList, classes) {
        return UI.getRenderer().tabs(id, tabsList, classes);
    }

    static tabContent(id, panesList) {
        return UI.getRenderer().tabContent(id, panesList);
    }

    static icon(iconName, classes) {
        return UI.getRenderer().icon(iconName, classes);
    }

    static loadingIcon(size) {
        return UI.getRenderer().loadingIcon(size);
    }

    // --- Helpers de Manipulação de DOM / jQuery ---
    static setValue(selectorId, value, triggerChange = true) {
        let el = jQuery(selectorId);
        if (!el.length) return;

        if (el.is(':checkbox')) {
            el.prop('checked', Boolean(value));
        } else if (el.is(':radio')) {
            el.val([value]);
        } else if (el.is('select')) {
            el.val(value);
            if (el.hasClass('smartselect')) {
                let text = el.find('option:selected').text() || '';
                jQuery(selectorId + '-smartinput').val(text);
            }
        } else {
            el.val(value);
        }

        if (triggerChange) {
            el.trigger('change');
        }
    }

    static showModal(selectorId) {
        let rawId = selectorId.startsWith('#') ? selectorId.substring(1) : selectorId;
        let modalEl = document.getElementById(rawId);
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            let modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.show();
        } else if (typeof jQuery !== 'undefined') {
            jQuery(selectorId).modal('show');
        }
    }

    static hideModal(selectorId) {
        let rawId = selectorId.startsWith('#') ? selectorId.substring(1) : selectorId;
        let modalEl = document.getElementById(rawId);
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            let modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        } else if (typeof jQuery !== 'undefined') {
            jQuery(selectorId).modal('hide');
        }
    }
}