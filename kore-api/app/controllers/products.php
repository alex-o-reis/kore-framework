<?php

require_once __DIR__ . '/../../kore/Controller.php';

class Products extends Controller
{
    public function get($id = null)
    {
        if ($id) {
            return $this->json(['message' => 'Obtendo Products ID: ' . $id]);
        }
        return $this->json(['message' => 'Listando todos em Products']);
    }

    public function post()
    {
        $data = $this->request->input();
        return $this->json(['message' => 'Products criado com sucesso', 'data' => $data], 201);
    }
}
