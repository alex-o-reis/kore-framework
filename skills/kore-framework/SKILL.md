---
name: kore-framework
description: Guia completo, padroes de arquitetura, convencoes e referencia de desenvolvimento para o Kore Framework (KKF) - Backend PHP REST + Frontend SPA MVC com UI Relay e Bootstrap 5.
---

# Kore Framework (KKF) - AI Agent & Developer Skill Guide

O **Kore Framework (Kodey Kore Framework - KKF)** e um framework full-stack modular de alta produtividade para desenvolvimento web em PHP (Backend) e JavaScript + PHP (Frontend).

## 1. Principios Arquiteturais Fundamentais
1. **Separacao Radical API vs Front-End**:
   - `kore-api/`: Backend PHP puro com roteamento por Reflection, ORM PDO e Traits.
   - `kore-front/`: Frontend SPA MVC sem acoplamento de HTML no JS, utilizando a classe `UI` como Relay para Renderers intercambiaveis (Bootstrap 5 nativo).
2. **Isolamento Estrito Core vs Userspace (`kore/` vs `app/`)**:
   - As pastas `kore/` contem o motor nativo do framework. NUNCA altere arquivos dentro de `kore/`.
   - Todo o codigo da aplicacao do desenvolvedor vive em `app/` (`app/controllers/`, `app/models/`, `app/views/`, `app/migrations/`, `app/commands/`, etc.).
3. **Multi-Driver Database (SQLite Zero-Config & MySQL)**:
   - Suporte nativo a SQLite em `app/database/database.sqlite` (padrao local para desenvolvimento rapido sem servidor) e MySQL para producao.
4. **Padrao UI Relay**:
   - Toda a interface e construida via chamadas estaticas `UI.card()`, `UI.row()`, `UI.col()`, `UI.input()`, `UI.modal()`, `UI.button()`.
   - A classe `UI` atua como Relay e despacha para o Renderer ativo (`BootstrapRenderer` por padrao). Designers podem criar novos renderers estendendo `BaseRenderer`.
5. **ORM com Traits Regeneraveis**:
   - `ModelGenerator` le as colunas e gera os Traits em `app/traits/`.
   - Os Models em `app/models/` utilizam esses Traits (`use UserTrait;`), garantindo que quando o banco mudar e o gerador for executado novamente, nenhum metodo personalizado do Model seja perdido.
   - NAO edite arquivos em `app/traits/` manualmente.

## 2. Backend Guide (`kore-api`)
- `Router` mapeia URLs automaticamente por Reflection:
  - `GET /users` -> `Users::get()`
  - `GET /users/5` -> `Users::get(5)`
  - `POST /users` -> `Users::post()`
  - `POST /users/activate/5` -> `Users::post_activate(5)`
  - `DELETE /users/5` -> `Users::delete(5)`
- **Middlewares**: Proteja controllers adicionando `protected array $middleware = ['AuthMiddleware'];`.

### CLI Dinamica (`kore`)
- `kore dev`: Inicia servidor Full-Stack (Backend na 8000 + Frontend na 3000).
- `kore doctor`: Diagnostico do ambiente e saude das extensoes.
- `kore docs`: Gera openapi.json e exibe documentacao Swagger UI em `/docs`.
- `kore seed`: Popula o banco com seeders (Admin padrao: admin / admin123).
- `kore routes`: Lista todos os endpoints e handlers mapeados por Reflection.
- `kore make:models`: Gera/atualiza Traits e Models a partir do banco (SQLite/MySQL).
- `kore make:crud <Nome>`: Gera scaffold completo de CRUD (API e Frontend).
- `kore migrate`: Executa migracoes pendentes em `app/migrations/`.
- `kore migrate:rollback`: Reverte a ultima migracao.
- `kore make:migration <Nome>`: Cria nova migracao.
- `kore make:controller <Nome>`: Cria scaffold de controller.
- `kore serve [porta]`: Inicia servidor embutido da API.

## 3. Frontend Guide (`kore-front`)
- Single Page Application com roteamento por Hash.
- Vistas herdam de `View` e montam HTML chamando exclusivamente metodos da classe `UI`:
  - **HTML Primitivos & Tipografia**: `UI.div()`, `UI.span()`, `UI.p()`, `UI.hr()`, `UI.br()`, `UI.a()`, `UI.href()`, `UI.img()`, `UI.h1()` a `UI.h6()`, `UI.b()`, `UI.strong()`, `UI.i()`, `UI.em()`, `UI.u()`, `UI.s()`, `UI.small()`, `UI.code()`, `UI.pre()`.
  - **Tabelas & Listas**: `UI.table()`, `UI.thead()`, `UI.tbody()`, `UI.tfoot()`, `UI.tr()`, `UI.th()`, `UI.td()`, `UI.ul()`, `UI.ol()`, `UI.li()`.
  - **Containers & Layout**: `UI.row()`, `UI.col()`, `UI.card()`, `UI.cardHeader()`, `UI.cardBody()`, `UI.cardFooter()`.
  - **Formulários**: `UI.input()`, `UI.inputGroup()`, `UI.textarea()`, `UI.select()`, `UI.checkbox()`, `UI.radioButton()`, `UI.switch()`, `UI.fileUpload()`, `UI.hidden()`.
  - **Navegação & Estrutura**: `UI.tabs()`, `UI.tabContent()`, `UI.accordion()`, `UI.breadcrumb()`, `UI.pagination()`.
  - **Ações & Menus**: `UI.button()`, `UI.buttonGroup()`, `UI.dropdown()`, `UI.listGroup()`.
  - **Feedback & Diálogos**: `UI.modal()`, `UI.confirmDialog()`, `UI.offcanvas()`, `UI.alert()`, `UI.badge()`, `UI.toast()`, `UI.progressBar()`, `UI.skeleton()`, `UI.icon()`, `UI.loadingIcon()`.
  - **Helpers DOM**: `UI.setValue()`, `UI.showModal()`, `UI.hideModal()`, `UI.showOffcanvas()`, `UI.hideOffcanvas()`.
  - **Construtor de Classes CSS & Atalhos**: `UI.classes(UI.btn('primary'), UI.shadowHover(), UI.roundedXl(), UI.dFlex(), UI.alignCenter())`.
  - **Classes CSS Utilitárias Nativas**: `.shadow-xs`, `.shadow-card`, `.shadow-hover`, `.rounded-xl`, `.rounded-2xl`, `.border-dashed`, `.border-light-subtle`, `.cursor-pointer`, `.transition-all`, `.opacity-hover`, `.text-truncate-2`, `.custom-scrollbar`, `.pulse-dot`.
- Suporte a multiplos Renderers customizados estendendo `BaseRenderer`.





## 4. Topologia: Monorepo vs Repositorios Separados (Multi-Repo)
- **Monorepo**: Backend e Frontend no mesmo repositorio com `kore dev` orquestrando ambos.
- **Multi-Repo**:
  - `kore-api` como repositorio isolado: CORS e Preflight OPTIONS habilitados nativamente em `Controller.php`.
  - `kore-front` como repositorio isolado: SPA estatica pura, consome `API_URL` configurada em `app/config.js` e pode ser hospedada em CDNs estaticas (Vercel, Netlify, Cloudflare Pages, S3).


