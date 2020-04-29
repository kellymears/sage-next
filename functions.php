<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Collection;

remove_action('template_redirect', 'redirect_canonical');

/**
 * Theme and GraphQL setup.
 */
(new class() {
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->gutenbergTypes = Collection::make(['Post', 'Page']);

        $this->nextLinkFields = Collection::make([
            'nextLinkAs' => [
                'type' => 'String',
                'description' => __('Raw content', 'sage-next'),
                'resolve' => function ($post) {
                    return '/' . get_page_uri($post->ID);
                }
            ],
            'nextLinkHref' => [
                'type' => 'String',
                'description' => __('Raw content', 'sage-next'),
                'resolve' => function () {
                    return "/[slug]";
                }
            ]
        ]);
    }

    /**
     * Invocation
     */
    public function __invoke(): void
    {
        add_action('after_setup_theme', [$this, 'setup'], 20);

        add_action('graphql_register_types', function() {
            $this->gutenbergTypes->each(function ($type) {
                $this->nextLinkFields->each(
                    function ($definition, $field) use ($type) {
                        register_graphql_field($type, $field, $definition);
                    }
                );
            });
        });
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
        add_theme_support('editor-color-palette', [[
            'name'  => __('Primary', 'sage'),
            'slug'  => 'primary',
            'color' => '#525ddc',
        ]]);
    }
})();
