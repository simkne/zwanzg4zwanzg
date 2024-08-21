import { FogEffect } from "./FogEffect";
import ImageHelper from "./ImageHelper.js"; // Adjust the path as necessary

(function ($) {
  let homeCover = $(".home-cover");
  let canvas = $("<div/>", { class: "fogme" }).appendTo(homeCover);
  console.log("hiya! ", canvas);

  $(document).ready(function () {
    const fogContainers = $(".fogme");
    const cover_image = homeCover.find(".wp-block-cover__image-background");
    const imgUrl = cover_image.css("background-image");
    const coverBlockSelector = ".wp-block-cover__image-background"; // Adjust the selector as necessary

    // Create an instance of the ImageHelper class
    const imageHelper = new ImageHelper(coverBlockSelector);

    const bgImageUrl = imageHelper. extractUrl(imgUrl);
    console.log("bgImageUrl:: " + bgImageUrl);

    // Check if the background image is loaded
    imageHelper.checkBackgroundImage(onImageLoaded);

    function onImageLoaded() {
      console.log(
        "Image loading complete! You can now execute additional logic here.",$(".wp-block-cover__background")
      );
      // Add any additional logic you want to execute after the image has loaded
      $(".wp-block-cover__background")
        .css("transition", "opacity .7s ease")
        .css("opacity", "0");
    }

    // Preload and set the background image
    imageHelper.preloadBackgroundImage(bgImageUrl);

    /**
     * fog effect
     */

    fogContainers.each(function () {
      const container = $(this)[0];
      //s const backgroundColor = fogContainers
      const fogEffect = new FogEffect(container, {
        fogCount: 9,
        color: "#9a9a9a",
        opacity: 0.7,
        blur: "40px",
        borderRadius: "120%",
      });

      console.log(this);
      $(".enter_button").on("click", function (e) {
        fogEffect.clearFogs(3); // Clear
      });

 
    });
  });
})(jQuery);
