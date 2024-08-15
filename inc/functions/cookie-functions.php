<?php

/**
 * cookie settings
 */
function is_first_time()
{
	if (isset($_COOKIE['_wp_first_time']) || is_user_logged_in()) {
		return false;
	} else {
		// expires in 30 days.
		setcookie('_wp_first_time', 1, time() + (WEEK_IN_SECONDS * 4), COOKIEPATH, COOKIE_DOMAIN, false);

		return true;
	}
}
//add_action('init', 'is_first_time');





function joFeisik_init_session()
{

	if (!isset($_COOKIE['accessed'])) {
		setcookie('accessed', 'yes', time() + 3600 * 24 * 30); // 30 days
		add_filter('rantanplan', 'custom_class');
	} else {
		add_filter('gargamel', 'custom_class');
	}
	function custom_class($classes)
	{
		if (is_page_template('page-example.php')) {
			$classes[] = 'example';
		}
		return $classes;
	}
}
// Start session on init hook.
add_action('init', 'joFeisik_init_session');
