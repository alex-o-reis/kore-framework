<?php

if (php_sapi_name() !== 'cli') {
    die("O CLI do Kore Framework só pode ser executado via linha de comando.\n");
}

require_once __DIR__ . '/app/config/database.php';
require_once __DIR__ . '/kore/Migrator.php';
require_once __DIR__ . '/kore/ModelGenerator.php';

$argv = $_SERVER['argv'];
$command = $argv[1] ?? 'help';

echo "========================================\n";
echo "  Kore Framework CLI (KKF)\n";
echo "========================================\n\n";

switch ($command) {
    case 'migrate':
        $migrator = new Migrator(__DIR__ . '/app/migrations');
        $count = $migrator->run();
        if ($count === 0) {
            echo "Nenhuma migração pendente para executar.\n";
        } else {
            echo "Total de migrações executadas: $count\n";
        }
        break;

    case 'migrate:rollback':
        $migrator = new Migrator(__DIR__ . '/app/migrations');
        $migrator->rollback();
        break;

    case 'make:models':
    case 'generate:models':
        $generator = new ModelGenerator(__DIR__ . '/app/models', __DIR__ . '/app/traits');
        $generator->generate();
        break;

    case 'make:migration':
        $name = $argv[2] ?? null;
        if (!$name) {
            die("Erro: Forneça o nome da migração. Ex: php kore.php make:migration CreateUsersTable\n");
        }
        $filename = date('Ymd_His') . '_' . $name . '.php';
        $path = __DIR__ . '/app/migrations/' . $filename;
        $content = "<?php\n\nrequire_once __DIR__ . '/../../kore/Migration.php';\nrequire_once __DIR__ . '/../../kore/Model.php';\n\nclass $name extends Migration\n{\n    public function up()\n    {\n        Model::query(\"CREATE TABLE IF NOT EXISTS `sample` (\n            `id` INT AUTO_INCREMENT PRIMARY KEY,\n            `name` VARCHAR(100) NOT NULL,\n            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\");\n    }\n\n    public function down()\n    {\n        Model::query(\"DROP TABLE IF EXISTS `sample`;\");\n    }\n}\n";
        file_put_contents($path, $content);
        echo "Migração criada com sucesso: $filename\n";
        break;

    case 'make:controller':
        $name = $argv[2] ?? null;
        if (!$name) {
            die("Erro: Forneça o nome do controller. Ex: php kore.php make:controller Users\n");
        }
        $className = ModelGenerator::studlyCase($name);
        $filename = strtolower($name) . '.php';
        $path = __DIR__ . '/app/controllers/' . $filename;
        $content = "<?php\n\nrequire_once __DIR__ . '/../../kore/Controller.php';\n\nclass $className extends Controller\n{\n    public function get(\$id = null)\n    {\n        if (\$id) {\n            return \$this->json(['message' => 'Obtendo $className ID: ' . \$id]);\n        }\n        return \$this->json(['message' => 'Listando todos em $className']);\n    }\n\n    public function post()\n    {\n        \$data = \$this->request->input();\n        return \$this->json(['message' => '$className criado com sucesso', 'data' => \$data], 201);\n    }\n}\n";
        file_put_contents($path, $content);
        echo "Controller criado com sucesso: $filename (Classe: $className)\n";
        break;

    case 'serve':
        $port = $argv[2] ?? '8000';
        echo "Iniciando servidor embutido do PHP em http://localhost:$port ...\n";
        passthru("php -S localhost:$port -t " . escapeshellarg(__DIR__));
        break;

    case 'help':
    default:
        echo "Comandos disponíveis:\n";
        echo "  migrate                Executa todas as migrações pendentes em app/migrations/\n";
        echo "  migrate:rollback       Reverte a última migração executada\n";
        echo "  make:models            Lê o banco de dados e gera/atualiza Traits e Models\n";
        echo "  make:migration <Nome>  Cria um novo arquivo de migração timestamped\n";
        echo "  make:controller <Nome> Cria um novo controller padrão em app/controllers/\n";
        echo "  serve [porta]          Inicia o servidor de desenvolvimento PHP\n";
        break;
}
echo "\n";