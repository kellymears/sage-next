<?php

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Collection;

/**
 * WPGraphQL Next interface.
 */
(new class() {
    public $url;

    public $type;

    public $fields;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->url = get_home_url();

        $this->type = [
            'description' => __('Next JS specific data', 'sage-next'),
            'type' => 'Next',
            'resolve' => function ($post) {
                return [
                    'url' => '/' . get_page_uri($post->ID),
                    'linkAs' => '/' . get_page_uri($post->ID),
                    'linkHref' => '/[slug]',
                    'content' => str_replace(
                        $this->getUrlVariants(),
                        '',
                        get_post($post->ID)->post_content
                    ),
                    'media' => str_replace(
                        $this->getUrlVariants(),
                        '',
                        get_the_post_thumbnail_url($post->ID)
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
            'content' => [
                'type' => 'String',
                'description' => __('Filtered content', 'sage-next'),
            ],
            'media' => [
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

    /**
     * Get URL variants
     *
     * @return array
     */
    protected function getUrlVariants(): array
    {
        return [addslashes($this->url), $this->url];
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
        add_theme_support('title-tag');
        register_nav_menus([
            'primary' => __('Primary Navigation', 'sage-next'),
            'footer' => __('Footer Navigation', 'sage-next'),
        ]);

        add_theme_support('align-wide');
        add_theme_support('responsive-embeds');
        add_theme_support('editor-color-palette', [[
            'name'  => __('Primary', 'sage-next'),
            'slug'  => 'primary',
            'color' => '#525ddc',
        ]]);
    }
});
