/**
 * ProductsController — Gerencia a lógica do CRUD de Products
 */
class ProductsController extends Controller {
    execute() {
        this.view = new ProductsView(this);
        this.carregarListagem();
    }

    carregarListagem() {
        let self = this;
        Model.get('products')
            .done(function(data) {
                self.view.renderizarTabela(data || []);
            })
            .fail(function(xhr) {
                let erro = (xhr.responseJSON && xhr.responseJSON.error) || 'Erro ao carregar dados';
                $("#alert-container-products").html(UI.alert('danger', erro, true));
            });
    }

    salvar(formData) {
        let self = this;
        Model.post('products', formData)
            .done(function(res) {
                $("#modal-form-product").modal('hide');
                self.carregarListagem();
                $("#alert-container-products").html(UI.alert('success', res.message || 'Salvo com sucesso!'));
            })
            .fail(function(xhr) {
                let erro = (xhr.responseJSON && xhr.responseJSON.error) || 'Erro ao salvar';
                alert(erro);
            });
    }

    excluir(id) {
        let self = this;
        if (confirm('Deseja realmente excluir este registro?')) {
            Model.delete('products/' + id)
                .done(function() {
                    self.carregarListagem();
                    $("#alert-container-products").html(UI.alert('info', 'Registro excluído com sucesso!'));
                })
                .fail(function(xhr) {
                    let erro = (xhr.responseJSON && xhr.responseJSON.error) || 'Erro ao excluir';
                    alert(erro);
                });
        }
    }
}
