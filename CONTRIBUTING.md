# Diretrizes de Contribuição — Kore Framework (KKF)

Agradecemos o seu interesse em contribuir com o **Kore Framework**! Para manter a integridade, segurança e padrões de arquitetura do projeto, todas as contribuições passam por moderação e revisão via **Pull Request (PR)**.

---

## 🛡️ Regras de Moderação e Arquitetura

1. **Imutabilidade do Core (`kore/`)**:
   - Nenhuma alteração nas pastas `kore-api/kore/` ou `kore-front/kore/` será aceita a menos que resolva um bug crítico do framework ou implemente uma melhoria previamente discutida e aprovada via *Issue*.
   - Mantenha a separação radical entre o motor do framework (`kore/`) e o código de usuário (`app/`).

2. **Traits e Automação de Banco de Dados (`app/traits/`)**:
   - **Nunca** crie ou edite arquivos dentro de `app/traits/` manualmente via PR. Os traits são gerados pelo `ModelGenerator` (`kore make:models` ou `php kore-api/kore.php make:models`).

3. **Frontend: Padrão UI Relay**:
   - No frontend, nunca acople tags HTML cruas nos controladores ou views. Utilize exclusivamente as chamadas da classe `UI` (`UI.card()`, `UI.row()`, `UI.button()`, etc.), garantindo suporte agnóstico a múltiplos Renderers (Bootstrap 5 nativo).

---

## 🚀 Como Contribuir

1. **Faça um Fork** do repositório no GitHub.
2. **Crie uma Branch** temática para a sua funcionalidade/correção:
   ```bash
   git checkout -b feature/minha-melhoria
   # ou
   git checkout -b fix/correcao-bug
   ```
3. **Escreva código limpo** e certifique-se de que não haja erros de sintaxe:
   ```bash
   php -l arquivo.php
   ```
4. **Commit suas alterações** com mensagens claras e semânticas:
   ```bash
   git commit -m "feat: adiciona suporte a novo componente no UI Relay"
   ```
5. **Envie para o seu Fork** no GitHub:
   ```bash
   git push origin feature/minha-melhoria
   ```
6. **Abra um Pull Request (PR)** para a branch `main` do repositório oficial, descrevendo detalhadamente o que foi alterado e o motivo.

---

## 📋 Checklist do Pull Request

- [ ] A alteração não modifica a pasta `app/traits/` manualmente.
- [ ] Todo o código PHP passa no linter sem warnings/erros (`php -l`).
- [ ] No frontend, foram utilizadas as chamadas `UI.*` em vez de HTML embutido no JS.
- [ ] A documentação ou comentários foram atualizados, se aplicável.
