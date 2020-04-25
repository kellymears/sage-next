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
 *
 * @license MIT
 * @copyright 2020
 */
(new class() {
    /** @var \Illuminate\Container\Container */
    public $app;

    /** @var \Illuminate\Http\Request */
    public $request;

    /** @var \Illuminate\Http\Response */
    public $response;

    /** @var string */
    public $buildId;

    /** @var string */
    public $buildDir;

    /** @var object */
    public $buildManifest;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        /**
         * Construct Illuminate components
         */
        $this->app = new Container();
        $this->request = Request::capture();

        /** Next JS build directory */
        $this->buildDir = __DIR__ . '/out';

        /** Next build identifier */
        if ($buildIdFile = realpath(__DIR__ . '/dist/BUILD_ID')) {
            $this->buildId = file_get_contents($buildIdFile);
        }

        /** Next manifest */
        if ($buildManifestFile = realpath(__DIR__ . '/dist/build-manifest.json')) {
            $this->buildManifest = json_decode(file_get_contents($buildManifestFile));
        }
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        /** Eject early if request shouldn't be routed to Next */
        if (! is_admin() && strpos($this->request->getPathInfo(), 'out/_next/static')) {
            return;
        }

        /** Initialize request, response and router instances. */
        $this->app->instance('Illuminate\Http\Request', $this->request);
        $this->app->instance('Illuminate\Http\Response', $this->response);

        $this->events = new Dispatcher($this->app);
        $this->router = new Router($this->events, $this->app);

        /** Handle requests. */
        $this->routeRequests();
    }

    /**
     * Route requests.
     */
    public function routeRequests()
    {
        /** Route: index */
        if ($this->request->getPathInfo() == '/') {
            $this->router->get('/', function () {
                $response = new Response(file_get_contents("{$this->buildDir}/index.html"), 200);
                $response->header('Content-Type', 'text/html');

                return $response;
            });

            return $this->router->dispatch($this->request)->send();
        }

        /**
         * If request maps to a valid static file serve the file
         * contents with a 200 status code.
         */
        if ($this->isNextEntrypoint()) {
            $this->router->any('{any}', function () {
                $response = new Response(file_get_contents($this->entry), 200);
                $response->header('Content-Type', 'text/html');

                return $response;
            })->where('any', '(.*)');

            return $this->router->dispatch($this->request)->send();
        }

        /**
         * Otherwise return the 404 contents and a 404 status code.
         */
        $this->router->any('{any}', function () {
            $response = new Response(file_get_contents(__DIR__ . '/out/404.html'), 404);
            $response->header('Content-Type', 'text/html');

            return $response;
        })->where('any', '(.*)');

        /** Dispatch response */
        return $this->router->dispatch($this->request)->send();
    }

    /**
     * Is next entrypoint
     *
     * @return bool
     */
    public function isNextEntrypoint(): bool
    {
        return realpath(
            $this->entry = __DIR__ . '/out' . rtrim($this->request->getPathInfo(), '/\\') . '.html'
        );
    }
})();
