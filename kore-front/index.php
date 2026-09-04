<?php
require_once __DIR__ . '/environment.php';
$version = 'v=' . KORE_VERSION;
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kore Framework</title>

    <!-- Bootstrap 5.3 & Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap5.min.css">
    
    <!-- Template Style -->
    <link rel="stylesheet" href="templates/kore-default/css/template.css?<?=$version?>">
</head>
<body>
    <div class="conteudo-principal">
        <!-- Template carregado dinamicamente -->
    </div>

    <!-- Scripts Core Vendors -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.min.js"></script>

    <!-- Kore Framework (kore/) -->
    <script src="kore/js/kore.js?<?=$version?>"></script>
    <script src="kore/js/cookies.js?<?=$version?>"></script>
    <script src="kore/js/style.js?<?=$version?>"></script>
    <script src="kore/renderers/base-renderer.js?<?=$version?>"></script>
    <script src="kore/renderers/bootstrap.js?<?=$version?>"></script>
    <script src="kore/js/ui.js?<?=$version?>"></script>

    <script src="kore/js/smartbox.js?<?=$version?>"></script>
    <script src="kore/js/model.js?<?=$version?>"></script>
    <script src="kore/js/datatable.js?<?=$version?>"></script>
    <script src="kore/js/controller.js?<?=$version?>"></script>
    <script src="kore/js/view.js?<?=$version?>"></script>
    <script src="kore/js/template.js?<?=$version?>"></script>
    <script src="kore/js/router.js?<?=$version?>"></script>

    <!-- Configuração do Usuário (app/config.js) -->
    <script src="app/config.js?<?=$version?>"></script>

    <!-- Auto-inclusão de arquivos da aplicação do usuário (app/) -->
    <?php
    function includeUserScripts($dir, $version) {
        if (!is_dir($dir)) return;
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $path = $dir . '/' . $file;
            if (is_dir($path)) {
                includeUserScripts($path, $version);
            } elseif (pathinfo($path, PATHINFO_EXTENSION) === 'js') {
                $relative = str_replace('\\', '/', $path);
                echo "<script src=\"$relative?$version\"></script>\n";
            }
        }
    }
    includeUserScripts('app/renderers', $version);
    includeUserScripts('app/models', $version);
    includeUserScripts('app/controllers', $version);
    includeUserScripts('app/views', $version);
    ?>

    <script>
        // Inicialização do Template e Router
        jQuery(document).ready(function() {
            let templateLoader = new Template();
            templateLoader.getTemplate('main', 'templates/kore-default/template.html', function(html) {
                jQuery('.conteudo-principal').html(html);
                jQuery('.kore-menu-container').html(router.createMenu());
                
                // Inicializa o roteador do Kore
                router.init(KoreConfig.ROUTES, KoreConfig.MENU);
            });
        });
    </script>
</body>
</html>