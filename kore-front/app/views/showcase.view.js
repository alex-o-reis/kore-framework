/**
 * ShowcaseView — Vitrine completa (Kitchen Sink) de Componentes e Estilos do Kore Framework
 */
class ShowcaseView extends View {
    constructor() {
        super();
        this.render();
    }

    render() {
        $(".page-title").text("UI Showcase & Kitchen Sink");

        // 1. Cabeçalho e Introdução
        let header = UI.div(
            UI.classes(Style.dFlex(), Style.justifyBetween(), Style.alignCenter(), Style.mb(4)),
            UI.div(
                "",
                UI.h3("Galeria de Componentes Kore Framework", UI.classes(Style.fwBold(), Style.mb(1))) +
                UI.p("Demonstração interativa de componentes visuais, utilitários de estilo, KodeyCharts e Datatables.", Style.textMuted())
            ) +
            UI.div(
                UI.classes(Style.dFlex(), Style.gap(2)),
                UI.button("btn-test-toast", UI.icon("bell", Style.me(1)) + "Disparar Toast", UI.classes(Style.btn("primary"), Style.shadowHover(), Style.roundedXl())) +
                UI.button("btn-open-modal", UI.icon("window", Style.me(1)) + "Abrir Modal", UI.classes(Style.btn("success"), Style.shadowHover(), Style.roundedXl())) +
                UI.button("btn-open-drawer", UI.icon("layout-sidebar-reverse", Style.me(1)) + "Abrir Drawer", UI.classes(Style.btnOutline("dark"), Style.shadowHover(), Style.roundedXl()))
            )
        );

        // 2. Gráficos KodeyCharts
        let chartCol1 = UI.col(6, UI.card(
            "Desempenho de Vendas (Barras)",
            UI.chart("chart-vendas", {
                type: "column",
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                showValues: true,
                showLegend: true,
                series: [
                    { name: "2025", data: [42, 58, 65, 71, 80, 95] },
                    { name: "2026", data: [55, 68, 82, 88, 102, 120] }
                ]
            }),
            "",
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0(), Style.mb(4))
        ));

        let chartCol2 = UI.col(6, UI.card(
            "Distribuição por Categoria (Rosca)",
            UI.chart("chart-distribuicao", {
                type: "doughnut",
                labels: ["Tecnologia", "Consultoria", "Licenças", "Suporte", "Serviços"],
                showLegend: true,
                series: [
                    { name: "Faturamento", data: [35, 25, 20, 12, 8] }
                ]
            }),
            "",
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0(), Style.mb(4))
        ));

        let chartsRow = UI.row(chartCol1 + chartCol2);

        // 3. Formulários & SmartBox
        let formContent = UI.row(
            UI.col(6, UI.input("text", "showcase-nome", true, "Nome Completo", "Alex Oliveira")) +
            UI.col(6, UI.input("email", "showcase-email", true, "E-mail Corporativo", "alex@kodey.com.br")) +
            UI.col(6, UI.smartbox("showcase-cliente", true, "SmartBox (Busca Dinâmica)", [
                { value: "1", text: "Kodey Sistemas Web" },
                { value: "2", text: "LeanRail Logistics" },
                { value: "3", text: "Kore Framework Core" },
                { value: "4", text: "Google Cloud Platform" }
            ], 0)) +
            UI.col(6, UI.select("showcase-categoria", false, "Categoria Padrão", [
                { value: "dev", text: "Desenvolvimento de Software" },
                { value: "design", text: "UI / UX Design" },
                { value: "infra", text: "Infraestrutura Cloud" }
            ])) +
            UI.col(12, UI.textarea("Observações Gerais", "showcase-obs", 2, "Formulário construído 100% via UI.*")) +
            UI.col(4, UI.switch("showcase-switch", true, "Notificações Ativas")) +
            UI.col(4, UI.checkbox("showcase-check", true, "Aceito os termos")) +
            UI.col(4, UI.radioButton("showcase-radio", "tipo", true, "Opção Principal"))
        );

        let formCard = UI.col(6, UI.card(
            "Campos de Formulário & SmartBox",
            formContent,
            UI.button("btn-submit-form", "Salvar Configurações", UI.classes(Style.btn("primary"), Style.roundedXl())),
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0(), Style.mb(4))
        ));

        // 4. Elementos Visuais, Badges, Alertas e Tipografia
        let visualElements = UI.div(
            "",
            UI.h5("Tipografia e Destaques", Style.fwBold()) +
            UI.p("Texto em parágrafo com " + UI.strong("negrito") + ", " + UI.i("itálico") + ", " + UI.u("sublinhado") + " e " + UI.code("código inline") + ".") +
            UI.hr() +
            UI.h6("Badges e Indicadores", Style.fwBold()) +
            UI.div(
                UI.classes(Style.dFlex(), Style.gap(2), Style.mb(3)),
                UI.badge("b1", "primary", "Ativo") +
                UI.badge("b2", "success", "Concluído") +
                UI.badge("b3", "warning", "Pendente") +
                UI.badge("b4", "danger", "Erro") +
                UI.span(UI.classes(Style.pulseDot(), Style.bgSuccess(), Style.ms(2)), "")
            ) +
            UI.h6("Alertas de Feedback", Style.fwBold()) +
            UI.alert("success", "Operação concluída com sucesso via UI Relay!", "check-circle-fill") +
            UI.alert("info", "Dica: utilize a classe Style para compor utilitários fluentes.", "info-circle-fill") +
            UI.h6("Barra de Progresso", Style.fwBold()) +
            UI.progressBar("p1", 75, "primary", "15px")
        );

        let visualCard = UI.col(6, UI.card(
            "Elementos Visuais & Feedback",
            visualElements,
            "",
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0(), Style.mb(4))
        ));

        let middleRow = UI.row(formCard + visualCard);

        // 5. Datatable Dinâmica
        let datatableCard = UI.card(
            "Datatable Integrada (Busca, Ordenação & Paginação)",
            UI.datatable("tabela-showcase-demo", {
                colunas: [
                    { data: "id", title: "#", width: "8%" },
                    { data: "nome", title: "Módulo / Componente" },
                    { data: "tipo", title: "Tipo" },
                    { data: "status", title: "Status", render: function(d) {
                        return '<span class="badge bg-success-subtle text-success border border-success-subtle">' + d + '</span>';
                    }},
                    { data: "autor", title: "Mantenedor" }
                ],
                paginacao: true,
                busca: true,
                ordenacao: true
            }),
            "",
            UI.classes(Style.shadowCard(), Style.roundedXl(), Style.border0(), Style.mb(4))
        );

        // 6. Modal e Offcanvas Dinâmicos
        let modalDemo = UI.modal(
            "modal-showcase-demo",
            "Modal Dinâmico Kore Framework",
            UI.p("Este modal foi gerado via " + UI.code("UI.modal()") + " com fechamento e animação automática do Bootstrap 5."),
            UI.button("btn-modal-close", "Entendi", UI.classes(Style.btn("secondary"), Style.roundedXl()), { "data-bs-dismiss": "modal" })
        );

        let offcanvasDemo = UI.offcanvas(
            "offcanvas-showcase-demo",
            "Painel Lateral (Offcanvas)",
            UI.div(
                "",
                UI.p("Painéis laterais podem ser usados para filtros avançados, detalhes de itens ou menus auxiliares."),
                UI.skeleton("card", 1)
            ),
            "end"
        );

        // Renderiza tudo no DOM
        $(".conteudo-interno").html(
            header +
            chartsRow +
            middleRow +
            datatableCard +
            modalDemo +
            offcanvasDemo
        );

        this.bindEvents();
        this.popularTabela();
    }

    bindEvents() {
        $("#btn-test-toast").on("click", function() {
            UI.toast("Notificação Kore", "Componente de Toast disparado com sucesso!", "success");
        });

        $("#btn-open-modal").on("click", function() {
            UI.showModal("#modal-showcase-demo");
        });

        $("#btn-open-drawer").on("click", function() {
            UI.showOffcanvas("#offcanvas-showcase-demo");
        });

        $("#btn-submit-form").on("click", function() {
            UI.toast("Formulário", "Dados salvos localmente com sucesso!", "info");
        });
    }

    popularTabela() {
        setTimeout(function() {
            let dt = jQuery("#tabela-showcase-demo").DataTable();
            if (dt) {
                dt.clear();
                dt.rows.add([
                    { id: 1, nome: "UI Relay Engine", tipo: "Core Engine", status: "Estável", autor: "Alex Reis" },
                    { id: 2, nome: "Style / StyleBuilder", tipo: "CSS Engine", status: "Estável", autor: "Alex Reis" },
                    { id: 3, nome: "KodeyCharts", tipo: "Visualização", status: "Estável", autor: "Kodey Sistemas" },
                    { id: 4, nome: "SmartBox", tipo: "Componente Rico", status: "Estável", autor: "Kodey Sistemas" },
                    { id: 5, nome: "Datatable Wrapper", tipo: "Data Grid", status: "Estável", autor: "Kodey Sistemas" },
                    { id: 6, nome: "ORM & Reflection Router", tipo: "Backend API", status: "Estável", autor: "Alex Reis" }
                ]).draw();
            }
        }, 100);
    }
}
