<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Container\Container;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Router;

/**
 * Sage Next.
 */
(new class() {
    public $app;
    public $request;
    public $response;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->app = new Container();
        $this->request = Request::capture();
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        if (! is_admin() && ! strpos($this->request->getPathInfo(), 'out/_next/static')) {
            $this->app->instance('Illuminate\Http\Request', $this->request);
            $this->app->instance('Illuminate\Http\Response', $this->response);

            $this->events = new Dispatcher($this->app);
            $this->router = new Router($this->events, $this->app);

            $this->routeRequests();
        }
    }

    /**
     * Rewrites
     *
     * @return void
     */
    public function routeRequests(): void
    {
        /**
         * Index
         */
        $this->router->get('/', function () {
            require_once __DIR__ . "/out/index.html";
        });

        /**
         * 200
         */
        if ($this->isNextEntrypoint()) {
            $this->router->any('{any}', function () {
                return (
                    new Response(file_get_contents($this->entry), 200)
                )->header('Content-Type', 'text/html');
            })->where('any', '(.*)');

        /**
         * 404.
         */
        } else {
            $this->router->any('{any}', function () {
                return (
                    new Response(file_get_contents(__DIR__ . '/out/404.html'), 404)
                )->header('Content-Type', 'text/html');
            })->where('any', '(.*)');
        }

        /**
         * Dispatch response.
         */
        $this->router->dispatch($this->request)->send();
    }

    /**
     * Is next entrypoint
     */
    public function isNextEntrypoint()
    {
        return realpath(
            $this->entry = __DIR__ . '/out' . rtrim($this->request->getPathInfo(), '/\\') . '.html'
        );
    }
})();
