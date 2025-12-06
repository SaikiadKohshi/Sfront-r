<?php
function mytheme_scripts() {
    wp_enqueue_style('mytheme-style', get_template_directory_uri() . '/assets/css/style.css');
    wp_enqueue_script('mytheme-scripts', get_template_directory_uri() . '/assets/js/scripts.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'mytheme_scripts');

function mytheme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
}
add_action('after_setup_theme', 'mytheme_setup');
