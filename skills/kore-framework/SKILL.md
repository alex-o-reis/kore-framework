---
name: kore-framework
description: Guia completo, padroes de arquitetura, convencoes e referencia de desenvolvimento para o Kore Framework (KKF) - Backend PHP REST + Frontend SPA MVC com UI Relay e Bootstrap 5.
---

# Kore Framework (KKF) - AI Agent & Developer Skill Guide

O **Kore Framework (Kodey Kore Framework - KKF)** e um framework full-stack modular de alta produtividade para desenvolvimento web em PHP (Backend) e JavaScript + PHP (Frontend).

## 1. Principios Arquiteturais Fundamentais
1. **Separacao Radical API vs Front-End**:
   - kore-api/: Backend PHP puro com roteamento por Reflection, ORM PDO e Traits.
   - kore-front/: Frontend SPA MVC sem acoplamento de HTML no JS, utilizando a classe UI como Relay para Renderers intercambiaveis (Bootstrap 5 nativo).
2. **Isolamento Estrito Core vs Userspace (kore/ vs pp/)**:
   - As pastas kore/ contem o motor nativo do framework. NUNCA altere arquivos dentro de kore/.
   - Todo o codigo da aplicacao do desenvolvedor vive em pp/ (pp/controllers/, pp/models/, pp/views/, pp/migrations/, etc.).
3. **Padrao UI Relay**:
   - Toda a interface e construida via chamadas estaticas UI.card(), UI.row(), UI.col(), UI.input(), UI.modal(), UI.button().
   - A classe UI atua como Relay e despacha para o Renderer ativo (BootstrapRenderer por padrao). Designers podem criar novos renderers estendendo BaseRenderer.
4. **ORM com Traits Regeneraveis**:
   - ModelGenerator le as colunas e gera os Traits em pp/traits/.
   - Os Models em pp/models/ utilizam esses Traits (use UserTrait;), garantindo que quando o banco mudar e o gerador for executado novamente, nenhum metodo personalizado do Model seja perdido.
   - NAO edite arquivos em pp/traits/ manualmente.

## 2. Backend Guide (kore-api)
- Router mapeia URLs automaticamente:
  - GET /users -> Users::get()
  - GET /users/5 -> Users::get(5)
  - POST /users -> Users::post()
  - POST /users/activate/5 -> Users::post_activate(5)
  - DELETE /users/5 -> Users::delete(5)

### CLI kore.php
- php kore.php make:models: Gera/atualiza Traits e Models a partir do banco.
- php kore.php migrate: Executa migracoes pendentes em pp/migrations/.
- php kore.php migrate:rollback: Reverte a ultima migracao.
- php kore.php make:migration <Nome>: Cria nova migracao.
- php kore.php make:controller <Nome>: Cria scaffold de controller.
- php kore.php serve [porta]: Inicia servidor embutido.

## 3. Frontend Guide (kore-front)
- Single Page Application com roteamento por Hash.
- Vistas herdam de View e montam HTML chamando exclusivamente metodos da classe UI.
- Suporte a multiplos Renderers customizados estendendo BaseRenderer.
