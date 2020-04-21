<?php

namespace App;

/**
 * Sage Next.
 */
(new class() {
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
        $this->request = rtrim($_SERVER['REQUEST_URI'], '/\\');
    }

    /**
     * Class invocation.
     *
     * @return void
     */
    public function __invoke(): void
    {
        add_action('after_setup_theme', [$this, 'setup'], 20);

        $this->route();
    }

    /**
     * Route request.
     *
     * @return void
     */
    public function route(): void
    {
        if (! is_customize_preview() && ! is_admin()) {
            require_once $this->request
                ? __DIR__ . "/out{$this->request}.html"
                : __DIR__ . "/out/index.html";
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
