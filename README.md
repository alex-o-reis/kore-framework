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
1. **API Backend desacoplada (kore-api)**: Roteamento automático por *Reflection*, ORM ativo com *Traits regeneráveis* a partir do banco de dados e CLI de migrações.
2. **Frontend SPA Reativo (kore-front)**: Separação radical de camadas com o padrão **UI Relay Engine**, permitindo que suas telas sejam geradas de forma dinâmica e agnóstica a frameworks visuais (com suporte nativo e gratuito a **Bootstrap 5.3+**).

---

## ✨ Principais Funcionalidades

- 🧠 **AI-Ready & First-Class AI Support**: Inclui manifesto de agentes (skills/kore-framework/SKILL.md) que permite que IAs entendam o framework instantaneamente e gerem código 100% aderente aos padrões.
- 🔄 **Traits Regeneráveis (ORM Seguro)**: Altere seu banco de dados e regenere os Traits (php kore.php make:models) sem jamais perder seus métodos e regras de negócio nos Models.
- 🎨 **UI Relay Engine**: Nunca mais misture HTML cru nos seus controladores de tela. Chame UI.card(), UI.row(), UI.button() e troque o tema ou Renderer sem refatorar o código da aplicação.
- 🏢 **Multi-Tenancy Híbrido**: Opere no modo *Standalone* (banco único) ou *Subdomínio semi-automático* apenas alterando uma variável de ambiente no .env.
- ⚡ **CLI Integrada (kore.php)**: Migrations, rollback, scaffolds de controllers e gerador de models diretamente no terminal.

---

## 📁 Estrutura do Projeto

`	ext
kore-framework/
├── kore-api/                          # 🛠️ Backend PHP REST API
│   ├── kore/                          # ⚠️ Motor Nativo do Backend (Imutável)
│   │   ├── Controller.php             # Base Controller com pipeline de middlewares e JSON
│   │   ├── Model.php                  # ORM PDO com Dynamic Properties
│   │   ├── Router.php                 # Roteador por Reflection
│   │   ├── ModelGenerator.php         # Gerador de Traits/Models a partir do Banco
│   │   └── Migrator.php               # Executor de Migrações
│   └── app/                           # 🧑‍💻 Userspace (Seu Código de Backend)
│       ├── config/database.php        # Conexão e detecção de tenant
│       ├── controllers/               # Controladores da API
│       ├── models/                    # Modelos de Domínio
│       ├── traits/                    # Traits gerados automaticamente do BD
│       └── migrations/                # Arquivos de migração
│
├── kore-front/                        # 🖥️ Frontend SPA MVC (JS + PHP)
│   ├── kore/                          # ⚠️ Motor Nativo do Frontend
│   │   ├── js/                        # UI Relay, Router, Model, SmartBox, Datatable
│   │   └── renderers/                 # BaseRenderer e BootstrapRenderer
│   ├── templates/                     # Layouts visuais (kore-default Bootstrap 5)
│   └── app/                           # 🧑‍💻 Userspace (Suas Telas, Views e Config)
│
└── skills/kore-framework/             # 🤖 Skill de IA para Agentes Autônomos
`

---

## ⚡ Começando em 3 Minutos

### 1. Clonando e Configurando o Backend (kore-api)
`ash
cd kore-api
cp .env.example .env
# Configure as credenciais do seu banco de dados no .env

# Executar migrações
php kore.php migrate

# Gerar Models e Traits com base no schema do banco
php kore.php make:models

# Iniciar servidor da API
php kore.php serve 8000
`

### 2. Executando o Frontend (kore-front)
1. Verifique a URL da API em kore-front/app/config.js (http://localhost:8000/).
2. Sirva o frontend com qualquer servidor PHP/Apache:
`ash
cd kore-front
php -S localhost:3000
`
3. Acesse http://localhost:3000 no seu navegador!

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para garantir a estabilidade e a integridade da arquitetura, todas as contribuições passam por revisão via Pull Request.

Leia nosso [Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md) e nosso [Código de Conduta (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md) antes de submeter uma alteração.

---

## 📜 Licença e Créditos

Este projeto é software livre sob a [Licença MIT](LICENSE).

- **Criador & Líder de Desenvolvimento**: **Alex Reis**
- **Mantenedora**: **[Kodey Sistemas](https://kodey.com.br)**