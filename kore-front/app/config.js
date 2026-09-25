/**
 * Configuração Geral da Aplicação Frontend (Userspace)
 */
const KoreConfig = {
    APP_NAME: 'Kore App',
    API_URL: 'http://localhost:8000/', // Endereço da API kore-api
    DEFAULT_ROUTE: '#/',
    
    // Rotas da Aplicação
    ROUTES: [
        { url: '#/', controller: 'DashboardController' },
        { url: '#/login', controller: 'LoginController' },
        { url: '#/products', controller: 'ProductsController' },
        { url: '#/showcase', controller: 'ShowcaseController' }
    ],

    // Itens do Menu Lateral
    MENU: [
        { title: 'Dashboard', url: '#/', icon: 'bi-speedometer2', type: 'item' },
        { title: 'UI Showcase', url: '#/showcase', icon: 'bi-palette2', type: 'item' },
        { title: 'Produtos', url: '#/products', icon: 'bi-box-seam', type: 'item' }
    ]
};