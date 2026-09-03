class DashboardView extends View {
    constructor() {
        super();
        this.render();
    }

    render() {
        .page-title.text(Dashboard);

        // Construção rica de interface utilizando exclusivamente a classe UI (Relay -> Bootstrap)
        let statsRow = UI.row(
            UI.col(4, UI.card(Usuários Ativos, <h2 class="text-primary my-2">128</h2><p class="text-muted mb-0"><i class="bi bi-arrow-up-right text-success me-1"></i>+12% este mês</p>)) +
            UI.col(4, UI.card(Requisições API, <h2 class="text-success my-2">45.2k</h2><p class="text-muted mb-0"><i class="bi bi-check-circle text-success me-1"></i>99.9% uptime</p>)) +
            UI.col(4, UI.card(Status do Sistema, <h2 class="text-info my-2">Saudável</h2><p class="text-muted mb-0">Kore Framework v1.0</p>))
        );

        let welcomeCard = UI.card(
            Bem-vindo ao Kore Framework (KKF),
            
            <p class=lead>Seu novo projeto de frontend e backend desacoplado está pronto para uso!</p>
            <p>O Kore Framework separa de forma radical o <strong>core</strong> da sua aplicação, e utiliza o padrão <strong>UI Relay</strong> para geração dinâmica de componentes com suporte nativo a <strong>Bootstrap 5.3+</strong>.</p>
            <div class=d-flex gap-2 mt-4>
                
                
            </div>
            
        );

        let modalExemplo = UI.modal(modal-exemplo, Modal do Kore Framework, <p>Este modal foi construído dinamicamente via <code>UI.modal()</code> usando o renderer do Bootstrap 5.</p>, UI.button(btn-fechar, Fechar, btn-secondary, { data-bs-dismiss: modal }));

        .conteudo-interno.html(statsRow + welcomeCard + modalExemplo);

        #btn-test-modal.on(click, function() {
            UI.showModal(#modal-exemplo);
        });

        #btn-test-alert.on(click, function() {
            alert(Botão renderizado com sucesso via UI.button()!);
        });
    }
}