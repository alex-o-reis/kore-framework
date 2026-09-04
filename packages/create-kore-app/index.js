#!/usr/bin/env node

/**
 * create-kore-app
 * Instalador oficial em Node/NPX para criar novos projetos com Kore Framework.
 * Autor: Alex Reis & Kodey Sistemas (https://kodey.com.br)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const readline = require('readline');

const REPO_ZIP_URL = 'https://github.com/alex-o-reis/kore-framework/archive/refs/heads/main.zip';

async function main() {
    console.log('\x1b[36m%s\x1b[0m', '\n======================================================');
    console.log('\x1b[36m%s\x1b[0m', '  🚀 Create Kore App (KKF Project Generator)');
    console.log('\x1b[36m%s\x1b[0m', '  Framework Full-Stack PHP REST + Frontend SPA MVC');
    console.log('\x1b[36m%s\x1b[0m', '======================================================\n');

    let projectName = process.argv[2];

    if (!projectName) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        projectName = await new Promise((resolve) => {
            rl.question('Qual o nome do seu projeto? (ex: meu-app): ', (answer) => {
                rl.close();
                resolve((answer || '').trim());
            });
        });
    }

    if (!projectName) {
        console.error('\x1b[31m%s\x1b[0m', 'Erro: O nome do projeto é obrigatório.');
        process.exit(1);
    }

    const targetDir = path.resolve(process.cwd(), projectName);

    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
        console.error('\x1b[31m%s\x1b[0m', `Erro: A pasta "${projectName}" já existe e não está vazia.`);
        process.exit(1);
    }

    console.log(`\nBaixando o template mais recente do Kore Framework...`);

    const tempZip = path.join(process.cwd(), `kore_temp_${Date.now()}.zip`);
    const tempExtract = path.join(process.cwd(), `kore_extract_${Date.now()}`);

    try {
        await downloadFile(REPO_ZIP_URL, tempZip);
        console.log('Extraindo arquivos...');

        // Usando o PowerShell nativo do Windows ou unzip do Unix
        if (process.platform === 'win32') {
            execSync(`powershell -command "Expand-Archive -Path '${tempZip}' -DestinationPath '${tempExtract}' -Force"`, { stdio: 'ignore' });
        } else {
            execSync(`unzip -q "${tempZip}" -d "${tempExtract}"`, { stdio: 'ignore' });
        }

        const extractedSubdirs = fs.readdirSync(tempExtract);
        const sourceDir = path.join(tempExtract, extractedSubdirs[0]);

        copyFolderSync(sourceDir, targetDir);

        // Limpeza de pacotes internos/temporários
        const packagesInTarget = path.join(targetDir, 'packages');
        if (fs.existsSync(packagesInTarget)) {
            fs.rmSync(packagesInTarget, { recursive: true, force: true });
        }

        // Garante pasta de banco de dados SQLite
        const dbDir = path.join(targetDir, 'kore-api', 'app', 'database');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        console.log('\x1b[32m%s\x1b[0m', `\n✅ Projeto "${projectName}" criado com sucesso!\n`);
        console.log('Para iniciar o desenvolvimento:\n');
        console.log('\x1b[33m%s\x1b[0m', `  cd ${projectName}`);
        console.log('\x1b[33m%s\x1b[0m', `  kore seed         # Popula o banco de dados inicial`);
        console.log('\x1b[33m%s\x1b[0m', `  kore dev          # Inicia a API (8000) e Frontend (3000)\n`);

    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Erro durante a criação do projeto:', err.message);
    } finally {
        if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);
        if (fs.existsSync(tempExtract)) fs.rmSync(tempExtract, { recursive: true, force: true });
    }
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const request = (targetUrl) => {
            https.get(targetUrl, {
                headers: { 'User-Agent': 'create-kore-app/1.0' }
            }, (response) => {
                // Segue redirecionamentos (302/301 do GitHub)
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    return request(response.headers.location);
                }
                if (response.statusCode !== 200) {
                    return reject(new Error(`Falha no download: Status HTTP ${response.statusCode}`));
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (err) => {
                fs.unlink(dest, () => {});
                reject(err);
            });
        };
        request(url);
    });
}

function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach((element) => {
        if (element === '.git') return;
        const srcPath = path.join(from, element);
        const destPath = path.join(to, element);
        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

main();
