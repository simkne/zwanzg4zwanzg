<?php
/**
 * custom blocks
 */

 /**
 * Custom block category
 */
 
/* function nt_next_block_categories( $categories ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'ntnext_category', // The slug of our new category
                'title' => __( 'NTNext Custom Blocks', 'ntNext' ), // The name of our new category
                'icon'  => 'welcome-widgets-menus', // an icon choose from the https://developer.wordpress.org/resource/dashicons/#wordpress Dashicon icons 
            ),
        )
    );
  }
  add_filter( 'block_categories', 'nt_next_block_categories', 10, 2 ); */
  /* 
// Register a Foundation based simple block
 if( function_exists('acf_register_block') ) {
      
  $result = acf_register_block(array(
      'name'              => 'nt_slide_block', // Name of our block
      'title'             => __('NTNext - Slider Blocks'), // Title of our block
      'description'       => __('Block made with SLick slider for manage slider and top banner.'), // Description of our block
      'render_callback'   => 'choo_block_render_callback',// Callback function ( the once that contain the template of our block )
      'category'          => 'ntnext_category',// The category in which the block will be inserted 
      'icon'              => '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="140px" height="140px" viewBox="0 0 140 140" enable-background="new 0 0 140 140" xml:space="preserve">  <image id="image0" width="140" height="140" x="0" y="0"
      href="data:image/png;base64,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" />
  </svg>
  ', // The icon associated with the block ( here i have used a custom SVG )
      //'keywords'        => array(),
  ));
 
} */
 
 /* 
function choo_block_render_callback( $block ) {
     
    // convert name ("acf/testimonial") into path friendly slug ("testimonial")
    $slug = str_replace('acf/', '', $block['name']);
    // include a template part from within the "template-parts/block" folder
    if( file_exists( get_theme_file_path("/partials/blocks/{$slug}.php") ) ) {
        include( get_theme_file_path("/partials/blocks/{$slug}.php") );
    }
} */