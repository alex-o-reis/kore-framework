<?php

require_once __DIR__ . '/../../ModelGenerator.php';

class MakeCommand extends Command
{
    protected string $description = "Gerador de scaffolding e componentes do Kore Framework";

    /**
     * Gera ou atualiza Models e Traits a partir das tabelas do banco de dados
     */
    public function models(): void
    {
        $generator = new ModelGenerator(
            __DIR__ . '/../../../app/models',
            __DIR__ . '/../../../app/traits'
        );
        $generator->generate();
    }

    /**
     * Cria um novo arquivo de migracao timestamped
     */
    public function migration(?string $name = null): void
    {
        if (!$name) {
            $this->error("Erro: Forneca o nome da migracao. Ex: kore make:migration CreateClientsTable");
            return;
        }

        $filename = date('Ymd_His') . '_' . $name . '.php';
        $path = __DIR__ . '/../../../app/migrations/' . $filename;
        $content = "<?php\n\nrequire_once __DIR__ . '/../../kore/Migration.php';\nrequire_once __DIR__ . '/../../kore/Model.php';\n\nclass $name extends Migration\n{\n    public function up()\n    {\n        Model::query(\"CREATE TABLE IF NOT EXISTS `sample` (\n            `id` INT AUTO_INCREMENT PRIMARY KEY,\n            `name` VARCHAR(100) NOT NULL,\n            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\");\n    }\n\n    public function down()\n    {\n        Model::query(\"DROP TABLE IF EXISTS `sample`;\");\n    }\n}\n";

        file_put_contents($path, $content);
        $this->info("Migracao criada com sucesso: $filename");
    }

    /**
     * Cria um novo controller padrao no backend
     */
    public function controller(?string $name = null): void
    {
        if (!$name) {
            $this->error("Erro: Forneca o nome do controller. Ex: kore make:controller Products");
            return;
        }

        $className = ModelGenerator::studlyCase($name);
        $filename = strtolower($name) . '.php';
        $path = __DIR__ . '/../../../app/controllers/' . $filename;

        $content = "<?php\n\nrequire_once __DIR__ . '/../../kore/Controller.php';\n\nclass $className extends Controller\n{\n    public function get(\$id = null)\n    {\n        if (\$id) {\n            return \$this->json(['message' => 'Obtendo $className ID: ' . \$id]);\n        }\n        return \$this->json(['message' => 'Listando todos em $className']);\n    }\n\n    public function post()\n    {\n        \$data = \$this->request->input();\n        return \$this->json(['message' => '$className criado com sucesso', 'data' => \$data], 201);\n    }\n}\n";

        file_put_contents($path, $content);
        $this->info("Controller criado com sucesso: $filename (Classe: $className)");
    }

    /**
     * Cria scaffold completo de CRUD (API Controller, Front View e Controller)
     */
    public function crud(?string $name = null): void
    {
        if (!$name) {
            $this->error("Erro: Forneca o nome do recurso. Ex: kore make:crud Products");
            return;
        }

        $className = ModelGenerator::studlyCase($name);
        $singular = strtolower(ModelGenerator::singularize($name));
        $plural = strtolower($name);

        $this->info("Gerando CRUD completo para o recurso: $className...");

        // 1. Controller API
        $this->controller($name);

        // 2. Front Controller
        $frontControllerPath = __DIR__ . '/../../../../kore-front/app/controllers/' . $plural . '.controller.js';
        $frontViewPath = __DIR__ . '/../../../../kore-front/app/views/' . $plural . '.view.js';

        $frontControllerContent = "class " . $className . "Controller extends Controller {\n    execute() {\n        new " . $className . "View();\n    }\n}\n";
        file_put_contents($frontControllerPath, $frontControllerContent);
        $this->info("Frontend Controller criado: $plural.controller.js");

        // 3. Front View via UI Relay
        $frontViewContent = "class " . $className . "View extends View {\n    constructor() {\n        super();\n        this.render();\n    }\n\n    render() {\n        $(\".page-title\").text(\"" . $className . "\");\n\n        let form = UI.card(\n            \"Novo " . $className . "\",\n            UI.row(\n                UI.col(12, UI.input(\"text\", \"nome\", true, \"Nome\"))\n            ),\n            UI.button(\"btn-salvar-" . $singular . "\", \"Salvar\", \"btn-primary\")\n        );\n\n        let lista = UI.card(\n            \"Listagem de " . $className . "\",\n            \"<div id=\\\"tabela-" . $plural . "\\\"></div>\"\n        );\n\n        $(\".conteudo-interno\").html(UI.row(UI.col(12, form + lista)));\n    }\n}\n";
        file_put_contents($frontViewPath, $frontViewContent);
        $this->info("Frontend View (UI Relay) criada: $plural.view.js");

        $this->info("Scaffolding do CRUD concluido com sucesso!");
    }
}