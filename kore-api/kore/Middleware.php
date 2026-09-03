<?php

interface Middleware
{
    /**
     * Manipula a requisição antes de passar para o controller.
     *
     * @param Request 
     * @param callable 
     * @return mixed
     */
    public function handle(Request , callable );
}
