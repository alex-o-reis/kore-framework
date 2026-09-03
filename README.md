<div align=center>

# 🚀 Kore Framework (Kodey Kore Framework - KKF)

**Framework Full-Stack Modular de Alta Produtividade para PHP & Single Page Application (SPA)**

[![Kore CI](https://github.com/alex-o-reis/kore-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-o-reis/kore-framework/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PHP Version](https://img.shields.io/badge/PHP-%3E%3D8.1-777bb4.svg?logo=php&logoColor=white)](https://www.php.net/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

*Criado e mantido por [Alex Reis](https://github.com/alex-o-reis) e [Kodey Sistemas](https://kodey.com.br)*

</div>

---

## 💡 O que é o Kore Framework?

O **Kore Framework (KKF)** é um ecossistema full-stack moderno construído com dois pilares fundamentais:
1. **API Backend desacoplada (kore-api)**: Roteamento automático por *Reflection*, ORM ativo com *Traits regeneráveis* a partir do banco de dados e CLI de comandos dinâmicos.
2. **Frontend SPA Reativo (kore-front)**: Separação radical de camadas com o padrão **UI Relay Engine**, permitindo que suas telas sejam geradas de forma dinâmica e agnóstica a frameworks visuais (com suporte nativo e gratuito a **Bootstrap 5.3+**).

---

## ✨ Principais Funcionalidades

- 🧠 **AI-Ready & First-Class AI Support**: Inclui manifesto de agentes (`skills/kore-framework/SKILL.md`) que permite que IAs entendam o framework instantaneamente e gerem código 100% aderente aos padrões.
- 🗄️ **Zero-Config Database (SQLite & MySQL)**: Inicie imediatamente com SQLite local sem precisar instalar ou configurar servidores de banco de dados. Alterne para MySQL apenas mudando uma linha no `.env`.
- 🔄 **Traits Regeneráveis (ORM Seguro)**: Altere seu banco de dados e regenere os Traits (`kore make:models`) sem jamais perder seus métodos e regras de negócio nos Models.
- 🎨 **UI Relay Engine**: Nunca mais misture HTML cru nos seus controladores de tela. Chame `UI.card()`, `UI.row()`, `UI.button()` e troque o tema ou Renderer sem refatorar o código da aplicação.
- 🏢 **Multi-Tenancy Híbrido**: Opere no modo *Standalone* (banco único) ou *Subdomínio semi-automático* apenas alterando uma variável de ambiente no `.env`.
- ⚡ **CLI Dinâmica e Extensível (`kore`)**: CLI com carregamento dinâmico via Reflection (`kore dev`, `kore doctor`, `kore make:crud`, `kore routes`, `kore migrate`, `kore serve`).

---

## 📁 Estrutura do Projeto

```text
kore-framework/
├── kore-api/                          # 🛠️ Backend PHP REST API
│   ├── kore/                          # ⚠️ Motor Nativo do Backend (Imutável)
│   │   ├── Kore.php                   # Metadados e versão do framework
│   │   ├── Controller.php             # Base Controller com pipeline de middlewares e JSON
│   │   ├── Model.php                  # ORM PDO (SQLite/MySQL) com Dynamic Properties
│   │   ├── Router.php                 # Roteador por Reflection
│   │   ├── ModelGenerator.php         # Gerador de Traits/Models a partir do Banco
│   │   ├── Migrator.php               # Executor de Migrações
│   │   └── cli/                       # Motor CLI por Reflection (Kernel & Commands)
│   └── app/                           # 🧑‍💻 Userspace (Seu Código de Backend)
│       ├── config/database.php        # Conexão (SQLite/MySQL) e detecção de tenant
│       ├── database/                  # Banco SQLite local (database.sqlite)
│       ├── controllers/               # Controladores da API
│       ├── models/                    # Modelos de Domínio
│       ├── traits/                    # Traits gerados automaticamente do BD
│       ├── migrations/                # Arquivos de migração
│       ├── seeders/                   # Seeders de população inicial (DatabaseSeeder)
│       ├── middlewares/               # Middlewares (AuthMiddleware, etc.)
│       └── commands/                  # Comandos CLI personalizados do desenvolvedor
│
├── kore-front/                        # 🖥️ Frontend SPA MVC (JS + PHP)

│   ├── kore/                          # ⚠️ Motor Nativo do Frontend
│   │   ├── js/                        # UI Relay, Router, Model, SmartBox, Datatable
│   │   └── renderers/                 # BaseRenderer e BootstrapRenderer
│   ├── templates/                     # Layouts visuais (kore-default Bootstrap 5)
│   └── app/                           # 🧑‍💻 Userspace (Suas Telas, Views e Config)
│
├── kore                               # 🚀 Executável CLI para Linux/macOS
├── kore.bat                           # 🚀 Executável CLI para Windows
└── skills/kore-framework/             # 🤖 Skill de IA para Agentes Autônomos
```

---

## ⚡ Começando em 3 Minutos (Zero Configuração)

### 1. Clonando e Executando em Modo Desenvolvimento
O Kore Framework vem pré-configurado com **SQLite nativo**, permitindo que você suba o ambiente completo imediatamente:

```bash
# 1. Copie o arquivo de variáveis de ambiente
cp kore-api/.env.example kore-api/.env

# 2. Execute as migrações iniciais no SQLite local
kore migrate

# 3. Popule o banco com o usuário administrador padrão (admin / admin123)
kore seed

# 4. Inicie o ambiente Full-Stack (Backend na porta 8000 + Frontend na porta 3000)
kore dev
```

> Pronto! Acesse **http://localhost:3000** no seu navegador para ver o Frontend SPA e **http://localhost:8000/index** para inspecionar a API Backend. Você já pode fazer login com **admin / admin123**!

---

### 💡 Comandos Úteis da CLI (`kore`)

Você pode rodar comandos diretamente com `kore <comando>` na raiz ou `php kore-api/kore.php <comando>`:

```bash
# Diagnóstico de integridade e extensões do PHP
kore doctor

# Popular banco com seeders (Admin e dados de teste)
kore seed

# Mapeamento de rotas e endpoints detectados por Reflection
kore routes

# Scaffolding completo de CRUD (API Controller + Front View + Front Controller)
kore make:crud Products

# Criar nova migração timestamped
kore make:migration CreateOrdersTable

# Gerar/atualizar Models e Traits a partir das tabelas do banco
kore make:models
```


---

## 🏗️ Flexibilidade Arquitetural: Monorepo vs Repositórios Separados

O Kore Framework foi projetado com **desacoplamento total** entre camadas. Você pode utilizá-lo de duas formas:

### 1. Monorepo (Padrão)
Mantém `kore-api` e `kore-front` no mesmo repositório Git, compartilhando o script unificado `kore dev` para desenvolvimento local ágil.

### 2. Repositórios Separados (Multi-Repo)
Se a sua equipe optar por dividir o projeto em dois repositórios independentes (`meu-projeto-api` e `meu-projeto-front`):
- **Backend Isolado (`meu-projeto-api`)**:
  - Contém suporte nativo a **CORS e Preflight (`OPTIONS`)** habilitado no `Controller.php`.
  - A CLI detecta automaticamente a raiz do projeto para carregar comandos de `app/commands/`.
- **Frontend Isolado (`meu-projeto-front`)**:
  - Configure a URL da API em `app/config.js` (`API_URL: "https://api.meusistema.com"`).
  - Como o frontend é uma Single Page Application pura (HTML/JS com UI Relay), **ele pode ser hospedado como SPA estática** (Vercel, Netlify, Cloudflare Pages, AWS S3) ou em servidores Apache/Nginx sem dependência de backend local.




---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para garantir a estabilidade e a integridade da arquitetura, todas as contribuições passam por revisão via Pull Request.

Leia nosso [Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md) e nosso [Código de Conduta (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md) antes de submeter uma alteração.

---

## 📜 Licença e Créditos

Este projeto é software livre sob a [Licença MIT](LICENSE).

- **Criador & Líder de Desenvolvimento**: **Alex Reis**
- **Mantenedora**: **[Kodey Sistemas](https://kodey.com.br)**