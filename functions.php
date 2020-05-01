<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * WPGraphQL Next interface.
 */
(new class() {
    public $url;
    public $deploymentUrl;

    public $type;
    public $fields;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->url = 'http://kellymears.vagrant';
        $this->deploymentUrl = 'https://familiar-zebra.surge.sh';

        $this->type = [
            'description' => __('Next JS specific data', 'sage-next'),
            'type' => 'Next',
            'resolve' => function ($post) {
                return [
                    'url' => '/' . get_page_uri($post->ID),
                    'linkAs' => '/' . get_page_uri($post->ID),
                    'linkHref' => '/[slug]',
                    'filteredContent' => (
                        str_replace("{$this->url}/app/uploads", '', get_the_content($post->ID))
                    ),
                    'featuredMedia' => (
                        str_replace("{$this->url}/app/uploads", '', get_the_post_thumbnail_url($post->ID))
                    ),
                ];
            },
        ];

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
            'filteredContent' => [
                'type' => 'String',
                'description' => __('Filtered content', 'sage-next'),
            ],
            'featuredMedia' => [
                'type' => 'String',
                'description' => __('Featured media URL', 'sage-next')
            ],
        ];
    }

    /**
     * Invocation
     */
    public function __invoke(): void
    {
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
})();

/**
 * Theme setup.
 */
(new class() {
    /**
     * Class construct.
     */
    public function __construct()
    {
        add_action('after_setup_theme', [$this, 'setup'], 20);
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
        register_nav_menus([
            'primary' => __('Primary Navigation', 'sage-next'),
            'footer' => __('Footer Navigation', 'sage-next'),
        ]);

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
            'name'  => __('Primary', 'sage-next'),
            'slug'  => 'primary',
            'color' => '#525ddc',
        ]]);
    }
});
