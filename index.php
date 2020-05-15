<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Container\Container;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Router;
use Mimey\MimeTypes;

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

    /** @var \Mimey\MimeTypes */
    public $mimes;

    /** @var string */
    public $staticDir;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->staticDir = __DIR__ . '/out';
        $this->distDir = __DIR__ . '/dist';

        $this->app = new Container();
        $this->request = Request::capture();
        $this->mimes = new MimeTypes();
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        if (is_admin()) return;

        $this->app->instance('Illuminate\Http\Request', $this->request);
        $this->app->instance('Illuminate\Http\Response', $this->response);

        $this->events = new Dispatcher($this->app);
        $this->router = new Router($this->events, $this->app);

        $this->routeRequests();
    }

    /**
     * Route requests.
     *
     * @return void
     */
    protected function routeRequests()
    {
        /** Serve static assets */
        if ($this->isStaticRequest()) {
            $this->staticAssetRoute();
        }

        /** Serve index */
        if ($this->request->getPathInfo() == '/') {
            $this->indexRoute();
        }

        /** Serve NextJS generated page */
        if ($this->isNextEntrypoint()) {
            $this->nextRoute();
        }
    }

    /**
     * Route: Index
     */
    protected function indexRoute()
    {
        $this->router->get('/', function () {
            $response = new Response($this->getStaticContents('index.html'), 200);
            $response->header('Content-Type', 'text/html');

            return $response;
        });

        return $this->router->dispatch($this->request)->send();
    }

    /**
     * Route: Next
     */
    protected function nextRoute()
    {
        $this->router->any('{any}', function () {
            $response = new Response(file_get_contents($this->entry), 200);
            $response->header('Content-Type', 'text/html');

            return $response;
        })->where('any', '(.*)');

        /** Dispatch response */
        return $this->router->dispatch($this->request)->send();
    }

    /**
     * Route: Static assets
     */
    protected function assetRoute()
    {
        $this->router->get('{any}', function () {
            $filePath = str_replace(
                '_next/',
                $this->staticDir . '/_next/',
                $this->request->getPathInfo()
            );

            /** Handle [ and ] chars in Next wildcard static paths */
            $filePath = str_replace('%5B', '[', $filePath);
            $filePath = str_replace('%5D', ']', $filePath);

            $mimeType = $this->mimes->getMimeType(
                pathinfo($filePath, PATHINFO_EXTENSION)
            );

            $response = new Response(file_get_contents($filePath), 200);
            $response->header('Content-Type', $mimeType);

            return $response;
        })->where('any', '(.*)');

        return $this->router->dispatch($this->request)->send();
    }

    /**
     * Get static file contents
     *
     * @param  string
     * @return string
     */
    protected function getStaticContents($file): string
    {
        return file_get_contents("{$this->staticDir}/{$file}");
    }

    /**
     * Get dist file contents
     *
     * @param  string
     * @return string
     */
    protected function getDistContents($file): string
    {
        return file_get_contents("{$this->distDir}/{$file}");
    }

    /**
     * Is next entrypoint
     *
     * @return bool
     */
    private function isNextEntrypoint(): bool
    {
        $requestFile = rtrim($this->request->getPathInfo(), '/\\') . '.html';

        return realpath($this->entry = "{$this->staticDir}/{$requestFile}");
    }

    /**
     * Is static resource request
     *
     * @return bool
     */
    private function isStaticRequest(): bool
    {
        return strpos($this->request->getPathInfo(), '_next');
    }
})();
