class ProductsView extends View {
    constructor() {
        super();
        this.render();
    }

    render() {
        $(".page-title").text("Products");

        let form = UI.card(
            "Novo Products",
            UI.row(
                UI.col(12, UI.input("text", "nome", true, "Nome"))
            ),
            UI.button("btn-salvar-product", "Salvar", "btn-primary")
        );

        let lista = UI.card(
            "Listagem de Products",
            "<div id=\"tabela-products\"></div>"
        );

        $(".conteudo-interno").html(UI.row(UI.col(12, form + lista)));
    }
}
