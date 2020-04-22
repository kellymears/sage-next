<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Collection;
use Illuminate\Container\Container;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;

/**
 * Sage Next.
 */
(new class() {
    public $routes;
    public $dynamicRoutes;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->app = new Container();
        add_action('after_setup_theme', [$this, 'setup'], 20);
        remove_action('template_redirect', 'redirect_canonical');
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        if (! is_admin()) {
            $this->request = Request::capture();
            $this->app->instance('Illuminate\Http\Request', $this->request);

            $this->events = new Dispatcher($this->app);
            $this->router = new Router($this->events, $this->app);

            $this->router->get(
                '/',
                function () {
                    require_once __DIR__ . "/out/index.html";
                },
            );

            if (realpath($entry = __DIR__ . '/out' . rtrim($this->request->getPathInfo(), '/\\') . '.html')) {
                $this->router->any('{any}', function () use ($entry) {
                    require_once $entry;
                })->where('any', '(.*)');
            } else {
                $this->router->any('{any}', function () use ($entry) {
                    require_once __DIR__ . '/out/404.html';
                })->where('any', '(.*)');
            }

            $this->router->dispatch($this->request)->send();
        }
    }

    /**
     * Setup theme
     *
     * @return void
     */
    public function setup(): void
    {
         /**
         * Enable plugins to manage the document title
         * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
         */
        add_theme_support('title-tag');

        /**
         * Register navigation menus
         * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
         */
        register_nav_menus(['primary_navigation' => __('Primary Navigation', 'sage')]);

        /**
         * Enable post thumbnails
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        /**
         * Add theme support for Wide Alignment
         * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#wide-alignment
         */
        add_theme_support('align-wide');

        /**
         * Enable responsive embeds
         * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
         */
        add_theme_support('responsive-embeds');

        /**
         * Enable theme color palette support
         * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes
         */
        add_theme_support('editor-color-palette', [
            [
                'name'  => __('Primary', 'sage'),
                'slug'  => 'primary',
                'color' => '#525ddc',
            ]
        ]);
    }
})();
