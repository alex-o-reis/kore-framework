<?php

class DevCommand extends Command
{
    protected string $description = "Inicia simultaneamente o servidor da API e do Frontend em modo desenvolvimento";

    public function handle(string $apiPort = "8000", string $frontPort = "3000"): void
    {
        $this->info("======================================================");
        $this->info("  Iniciando Kore Dev Server (Full-Stack Mode)");
        $this->info("======================================================");

        $baseDir = dirname(dirname(dirname(dirname(__DIR__))));
        $apiDir = $baseDir . '/kore-api';
        $frontDir = $baseDir . '/kore-front';

        $this->info("  📡 API Backend : http://localhost:$apiPort");
        $this->info("  🖥️  Frontend    : http://localhost:$frontPort");
        $this->info("");
        $this->info("Pressione Ctrl+C para encerrar os servidores.");
        $this->line();

        // Se for Windows, dispara background job para o front e foreground para a API
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $cmdFront = "start /B php -S localhost:$frontPort -t " . escapeshellarg($frontDir);
            pclose(popen($cmdFront, "r"));
            passthru("php -S localhost:$apiPort -t " . escapeshellarg($apiDir));
        } else {
            // Linux/macOS
            exec("php -S localhost:$frontPort -t " . escapeshellarg($frontDir) . " > /dev/null 2>&1 &");
            passthru("php -S localhost:$apiPort -t " . escapeshellarg($apiDir));
        }
    }
}