<?php

require_once __DIR__ . '/../../kore/Env.php';
require_once __DIR__ . '/../../kore/Model.php';

// Carrega arquivo .env na raiz da API
Env::load(__DIR__ . '/../../.env');

$host = Env::get('DB_HOST', 'localhost');
$port = (int) Env::get('DB_PORT', 3306);
$user = Env::get('DB_USER', 'root');
$pass = Env::get('DB_PASS', '');
$tenantMode = strtolower(Env::get('TENANT_MODE', 'standalone'));
$dbName = Env::get('DB_NAME', 'kore_app');

// Suporte a Multi-tenancy por subdomínio ou Standalone
if ($tenantMode === 'subdomain')
{
    $hostName = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $parts = explode('.', strtolower(explode(':', $hostName)[0]));
    
    // Se houver subdominio (ex: cliente1.meusistema.com ou cliente1-api.meusistema.com)
    if (count($parts) >= 3)
    {
        $sub = str_replace('-api', '', $parts[0]);
        if ($sub !== 'www')
        {
            $prefix = Env::get('DB_PREFIX', '');
            $suffix = Env::get('DB_SUFFIX', '_kore');
            $dbName = $prefix . $sub . $suffix;
        }
    }
}

$GLOBALS['active_tenant_db'] = $dbName;

// Inicializa conexão PDO
try
{
    Model::init_db($host, $dbName, $user, $pass, 'utf8mb4', $port);
}
catch (Exception $e)
{
    if (php_sapi_name() !== 'cli')
    {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => "Falha na conexão com banco de dados ($dbName): " . $e->getMessage()]);
        exit;
    }
}