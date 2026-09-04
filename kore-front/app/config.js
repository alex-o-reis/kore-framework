/**
 * Configuração Geral da Aplicação Frontend (Userspace)
 */
const KoreConfig = {
    APP_NAME: Kore App,
    API_URL: http://localhost:8000/, // Endereço da API kore-api
    DEFAULT_ROUTE: #/,
    
    // Rotas da Aplicação
    ROUTES: [
        { url: '#/', controller: DashboardController },
        { url: '#/login', controller: LoginController },
        { url: '#/usuarios', controller: UsuariosController },
        { url: '#/showcase', controller: ShowcaseController }
    ],

    // Itens do Menu Lateral
    MENU: [
        { title: 'Dashboard', url: '#/', icon: 'bi-speedometer2', type: 'item' },
        { title: 'UI Showcase', url: '#/showcase', icon: 'bi-palette2', type: 'item' },
        { title: 'Usuários', url: '#/usuarios', icon: 'bi-people', type: 'item' }
    ]
};