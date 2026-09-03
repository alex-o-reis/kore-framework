# Kore Framework (Kodey Kore Framework - KKF) 🚀

Framework full-stack desacoplado, modular e de alta produtividade com Backend PHP REST e Frontend SPA MVC.

## 📁 Estrutura de Diretórios
- kore-api/: Backend PHP REST (ORM reflexivo com Traits, Router automático, Migrations CLI).
  - kore/: Core nativo do framework (imutável).
  - pp/: Diretório da aplicação do desenvolvedor.
- kore-front/: Frontend SPA MVC (Template engine limpo com Bootstrap 5.3+ e UI Relay).
  - kore/: Motor frontend nativo e renderers.
  - 	emplates/: Templates visuais.
  - pp/: Controllers, views e modelos do usuário.
- skills/kore-framework/: Skill e documentação completa para Agentes de IA e desenvolvedores.

## ⚡ Como Iniciar
1. Configure kore-api/.env com as credenciais do seu banco de dados.
2. Execute as migrações: php kore-api/kore.php migrate.
3. Gere os Models: php kore-api/kore.php make:models.
4. Inicie o servidor da API: php kore-api/kore.php serve 8000.
5. Acesse kore-front no navegador.
