<?php

/**
 * default wordpress functions and theme supportts
 *  - styles
 *  - menus
 *  - sidebar
 *  - theme supports
 *  - editor styles
 *  - body classes add/remove
 *  - login page styling
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 */


/** 
 * styles
 *
 */

 add_action('wp_enqueue_scripts', 'sik_styles');
 if (!function_exists('sik_styles')) :
 
	 function sik_styles()
	 {
		 // Register theme stylesheet.
		// $theme_version = wp_get_theme()->get('Version');
 
	//	 $version_string = is_string($theme_version) ? $theme_version : false;
 
		 wp_register_style(
			 'sik_styles',
			 get_stylesheet_directory_uri() .'/assets/css/main.min.css',
			 array(),
			 '1.1',	
			 'all'
		 );
 
		 // Enqueue theme stylesheet.
		 wp_enqueue_style('sik_styles');
		 //	wp_enqueue_style('OwlCarousel', get_template_directory_uri() . '/assets/js/vendor/owl.carousel.js/owl.carousel.min.css', ['sik_styles'], null);
		 
		 //enque main script
		/*  wp_enqueue_style('owl_css', get_template_directory_uri() . '/assets/js/vendor/owl.carousel.min.css', ['sik_styles'], false, 'all');
		 wp_enqueue_script('owl_js', get_template_directory_uri() . '/assets/js/vendor/owl.carousel.min.js', ['jquery'], null, true);
		 */ 
		wp_enqueue_script('main_js', get_stylesheet_directory_uri() .'/assets/js/main.min.js', ['jquery'], null, true);
		 
	 }
 endif;