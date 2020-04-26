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
        /**
         * Construct Illuminate components
         */
        $this->app = new Container();
        $this->request = Request::capture();

        /** Mime-Type helper */
        $this->mimes = new MimeTypes();

        /** Next JS build directory */
        $this->staticDir = __DIR__ . '/out';
        $this->distDir = __DIR__ . '/dist';
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        /** Eject early if request isn't appropriate */
        if (is_admin()) {
            return;
        }

        /** Initialize request, response */
        $this->app->instance('Illuminate\Http\Request', $this->request);
        $this->app->instance('Illuminate\Http\Response', $this->response);

        /** Initialize router */
        $this->events = new Dispatcher($this->app);
        $this->router = new Router($this->events, $this->app);

        /** 🚀 */
        $this->routeRequests();
    }

    /**
     * Route requests.
     *
     * @return void
     */
    public function routeRequests()
    {
        /**
         * Single template previews
         */
        if (is_preview()) {
            $this->router->any('{any}', function () {
                /** Construct and return response to router */
                $response = new Response($this->getStaticContents('/preview.html'), 200);
                $response->header('Content-Type', 'text/html');

                return $response;
            })->where('any', '(.*)');

            /** Dispatch response */
            return $this->router->dispatch($this->request)->send();
        }

        /**
         * Static requests
         */
        if ($this->isStaticRequest()) {
            $this->router->get('{any}', function () {
                /** Filesystem path of requested asset */
                $filePath = str_replace('_next/', $this->staticDir . '/_next/', $this->request->getPathInfo());

                /** Handle [ and ] chars in Next wildcard static paths */
                $filePath = str_replace('%5B', '[', $filePath);
                $filePath = str_replace('%5D', ']', $filePath);

                /** Determine mime-type of response */
                $mimeType = $this->mimes->getMimeType(pathinfo($filePath, PATHINFO_EXTENSION));

                /** Construct and return response to router */
                $response = new Response(file_get_contents($filePath), 200);
                $response->header('Content-Type', $mimeType);

                return $response;
            })->where('any', '(.*)');

            /** Dispatch response */
            return $this->router->dispatch($this->request)->send();
        }

        /** Route: index */
        if ($this->request->getPathInfo() == '/') {
            $this->router->get('/', function () {
                /** Construct and return response to router */
                $response = new Response($this->getStaticContents('index.html'), 200);
                $response->header('Content-Type', 'text/html');

                return $response;
            });

            /** Dispatch response */
            return $this->router->dispatch($this->request)->send();
        }

        /**
         * If request maps to a valid static file serve the file
         * contents with a 200 status code.
         */
        if ($this->isNextEntrypoint()) {
            $this->router->any('{any}', function () {
                /** Construct and return response to router */
                $response = new Response(file_get_contents($this->entry), 200);
                $response->header('Content-Type', 'text/html');

                return $response;
            })->where('any', '(.*)');

            /** Dispatch response */
            return $this->router->dispatch($this->request)->send();
        }
    }

    /**
     * Get static file contents
     *
     * @param  string
     * @return string
     */
    public function getStaticContents($file): string
    {
        return file_get_contents("{$this->staticDir}/{$file}");
    }

    /**
     * Get dist file contents
     *
     * @param  string
     * @return string
     */
    public function getDistContents($file): string
    {
        return file_get_contents("{$this->distDir}/{$file}");
    }

    /**
     * Is next entrypoint
     *
     * @return bool
     */
    public function isNextEntrypoint(): bool
    {
        $requestFile = rtrim($this->request->getPathInfo(), '/\\') . '.html';
        return realpath($this->entry = "{$this->staticDir}/{$requestFile}");
    }

    /**
     * Is static resource request
     *
     * @return bool
     */
    public function isStaticRequest(): bool
    {
        return strpos($this->request->getPathInfo(), '_next');
    }
})();
