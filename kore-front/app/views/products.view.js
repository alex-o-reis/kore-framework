/**
 * ProductsView — Interface do CRUD de Products construída via UI Relay & Style
 */
class ProductsView extends View {
    constructor(controller) {
        super();
        this.controller = controller;
        this.render();
    }

    render() {
        let self = this;
        $(".page-title").text("Gerenciamento de Products");

        let headerRow = UI.div(
            UI.classes(Style.dFlex(), Style.justifyBetween(), Style.alignCenter(), Style.mb(4)),
            UI.h4("Listagem de Products", UI.classes(Style.fwBold(), Style.mb(0))) +
            UI.button(
                "btn-novo-product",
                UI.icon('plus-lg', Style.me(1)) + "Novo Product",
                UI.classes(Style.btn('primary'), Style.shadowHover(), Style.roundedXl())
            )
        );

        let cardTable = UI.card(
            "",
            "<div id=\"alert-container-products\"></div>" +
            "<div id=\"tabela-container-products\" class=\"table-responsive\">" +
            UI.skeleton('table', 5) +
            "</div>",
            "",
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0())
        );

        // Modal de Formulário
        let modalFormContent = UI.row(
            UI.col(12, UI.input("text", "input-nome-product", true, "Nome / Descrição")) +
            UI.col(12, UI.input("text", "input-status-product", false, "Status", "ativo"))
        );

        let modalFooter = UI.button(
            "btn-cancelar-product",
            "Cancelar",
            UI.classes(Style.btn('secondary'), Style.roundedXl()),
            { "data-bs-dismiss": "modal" }
        ) + UI.button(
            "btn-salvar-product",
            UI.icon('check-lg', Style.me(1)) + "Salvar Registro",
            UI.classes(Style.btn('primary'), Style.shadowHover(), Style.roundedXl())
        );

        let modalForm = UI.modal(
            "modal-form-product",
            "Cadastrar Product",
            modalFormContent,
            modalFooter
        );

        $(".conteudo-interno").html(headerRow + cardTable + modalForm);
        this.bindEvents();
    }

    bindEvents() {
        let self = this;

        $("#btn-novo-product").on('click', function() {
            $("#input-nome-product").val('');
            UI.showModal('#modal-form-product');
        });

        $("#btn-salvar-product").on('click', function() {
            let nome = $("#input-nome-product").val();
            if (!nome) {
                alert('Por favor, preencha o campo nome.');
                return;
            }
            self.controller.salvar({
                name: nome,
                status: $("#input-status-product").val()
            });
        });
    }

    renderizarTabela(dados) {
        let self = this;
        if (!dados || dados.length === 0) {
            $("#tabela-container-products").html(
                UI.alert('info', 'Nenhum registro encontrado.', true)
            );
            return;
        }

        let thead = UI.thead(
            UI.tr(
                UI.th("#", Style.fwBold()) +
                UI.th("Nome", Style.fwBold()) +
                UI.th("Ações", UI.classes(Style.fwBold(), Style.textEnd()))
            )
        );

        let rows = '';
        dados.forEach(function(item) {
            let id = item.ID || item.id || '-';
            let nome = item.NAME || item.name || item.NOME || item.nome || '-';

            let btnExcluir = UI.button(
                'btn-del-' + id,
                UI.icon('trash'),
                UI.classes(Style.btnOutline('danger'), Style.btnSm(), Style.roundedPill()),
                { 'data-id': id, 'title': 'Excluir' }
            );

            rows += UI.tr(
                UI.td(id) +
                UI.td(UI.strong(nome)) +
                UI.td(btnExcluir, Style.textEnd())
            );
        });

        let tbody = UI.tbody(rows);
        let tableHtml = UI.table(thead + tbody, UI.classes('table-hover', 'align-middle', Style.w100()));

        $("#tabela-container-products").html(tableHtml);

        $("#tabela-container-products [id^=btn-del-]").on('click', function() {
            let id = $(this).data('id');
            self.controller.excluir(id);
        });
    }
}
