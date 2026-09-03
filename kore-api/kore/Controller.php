<?php

require_once __DIR__ . '/Request.php';
require_once __DIR__ . '/Model.php';

class Controller
{
    protected ?Request $request;

    protected array $middleware = [];

    public function __construct()
    {
        header('Content-Type: application/json; charset=utf-8');
        $this->request = new Request();
    }

    public function getMiddleware(): array
    {
        return $this->middleware;
    }

    public function getRequest(): Request
    {
        return $this->request;
    }

    public function get(...$args)
    {
        $this->not_implemented('GET');
    }

    public function post(...$args)
    {
        $this->not_implemented('POST');
    }

    public function put(...$args)
    {
        $this->not_implemented('PUT');
    }

    public function delete(...$args)
    {
        $this->not_implemented('DELETE');
    }

    public function patch(...$args)
    {
        $this->not_implemented('PATCH');
    }

    public function __call($name, $arguments)
    {
        $this->not_implemented(strtoupper($name));
    }

    protected function json($data, int $statusCode = 200)
    {
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        return;
    }

    protected function error(string $message, int $statusCode = 400)
    {
        return $this->json(['error' => $message], $statusCode);
    }

    protected function not_implemented($method)
    {
        http_response_code(501);
        echo json_encode(['error' => "Method $method not implemented in this controller."], JSON_UNESCAPED_UNICODE);
    }
}

