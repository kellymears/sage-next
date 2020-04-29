<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Theme and GraphQL setup.
 */
(new class() {
    public $host;
    public $type;
    public $fields;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->host = get_home_url();

        $this->fields = [
            'url' => [
                'type' => 'String',
                'description' => __('URL', 'sage-next'),
            ],
            'linkAs' => [
                'type' => 'String',
                'description' => __('Link component helper', 'sage-next'),
            ],
            'linkHref' => [
                'type' => 'String',
                'description' => __('Link component helper', 'sage-next'),
            ],
            'content' => [
                'type' => 'String',
                'description' => __('Filtered content', 'sage-next'),
            ],
            'featuredImagePath' => [
                'type' => 'String',
                'description' => __('Featured media URL', 'sage-next')
            ],
        ];

        $this->type = [
            'description' => __('Next JS specific data', 'sage-next'),
            'type' => 'Next',
            'resolve' => function ($post) {
                return [
                    'url' => '/' . get_page_uri($post->ID),
                    'linkAs' => '/' . get_page_uri($post->ID),
                    'linkHref' => '/[slug]',
                    'content' => str_replace('href="' . $this->host, 'href="', get_the_content($post->ID)),
                ];
            },
        ];
    }

    /**
     * Invocation
     */
    public function __invoke(): void
    {
        add_action('after_setup_theme', [$this, 'setup'], 20);
        remove_action('template_redirect', 'redirect_canonical');

        add_action('graphql_register_types', function() {
            register_graphql_type('Next', [
                'description' => __( "Next framework specific fields", 'sage-next' ),
                'fields' => $this->fields,
            ]);

            register_graphql_field('Post', 'next', $this->type);
            register_graphql_field('Page', 'next', $this->type);
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
