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
3. **Padrao UI Relay**:
   - Toda a interface e construida via chamadas estaticas `UI.card()`, `UI.row()`, `UI.col()`, `UI.input()`, `UI.modal()`, `UI.button()`.
   - A classe `UI` atua como Relay e despacha para o Renderer ativo (`BootstrapRenderer` por padrao). Designers podem criar novos renderers estendendo `BaseRenderer`.
4. **ORM com Traits Regeneraveis**:
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

### CLI Dinamica (`kore`)
- `kore doctor`: Diagnostico do ambiente e saude das extensoes.
- `kore routes`: Lista todos os endpoints e handlers mapeados por Reflection.
- `kore make:models`: Gera/atualiza Traits e Models a partir do banco.
- `kore make:crud <Nome>`: Gera scaffold completo de CRUD (API e Frontend).
- `kore migrate`: Executa migracoes pendentes em `app/migrations/`.
- `kore migrate:rollback`: Reverte a ultima migracao.
- `kore make:migration <Nome>`: Cria nova migracao.
- `kore make:controller <Nome>`: Cria scaffold de controller.
- `kore serve [porta]`: Inicia servidor embutido.

## 3. Frontend Guide (`kore-front`)
- Single Page Application com roteamento por Hash.
- Vistas herdam de `View` e montam HTML chamando exclusivamente metodos da classe `UI`.
- Suporte a multiplos Renderers customizados estendendo `BaseRenderer`.
