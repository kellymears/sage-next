<?php

/**
 * Sage Next.
 */
(new class() {
    /**
     * @param string
     */
    public $env;

    /**
     * @param string
     */
    public $request;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->env = WP_ENV;
        $this->request = rtrim($_SERVER['REQUEST_URI'], '/');
    }

    /**
     * Class invocation.
     */
    public function __invoke()
    {
        require_once $this->request
            ? __DIR__."/out/{$this->request}.html"
            : __DIR__.'/out/index.html';
    }
})();
