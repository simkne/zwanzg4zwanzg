import FogEffect from "./FogEffect";
import ImageHelper from "./ImageHelper.js"; // Adjust the path as necessary
import anime from "animejs/lib/anime.es.js";
//import 'owl.carousel/dist/assets/owl.carousel.css';
import "owl.carousel";

(function ($) {
  console.log("hiya! ");

  $(document).ready(function () {
    //nebel functions, checks if .nebelme exists
    /**
     * fog effect
     */
    if ($(".nebelme").length > 0) {
      console.log("hiya! ", $(".nebelme"));

      let homeCover = $(".home-cover");
      let canvas = $("<div/>", { class: "fogme" }).appendTo(homeCover);
      const fogContainers = $(".fogme");
      const cover_image = homeCover.find(".wp-block-cover__image-background");
      const imgUrl = cover_image.css("background-image");
      const coverBlockSelector = ".wp-block-cover__image-background"; // Adjust the selector as necessary
      // Create an instance of the ImageHelper class
      const imageHelper = new ImageHelper(coverBlockSelector);

      const bgImageUrl = imageHelper.extractUrl(imgUrl);
      console.log("bgImageUrl:: " + bgImageUrl);

      // Check if the background image is loaded
      imageHelper.checkBackgroundImage(onImageLoaded);

      function onImageLoaded() {
        console.log(
          "Image loading complete! You can now execute additional logic here.",
          $(".wp-block-cover__background")
        );
        // Add any additional logic you want to execute after the image has loaded
        $(".wp-block-cover__background")
          .css("transition", "opacity .7s ease")
          .css("opacity", "0");
      }
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

        console.log("this", this);
        $(".enter_button").on("click", function (e) {
          fogEffect.clearFogs(3);
          scrollToAnim("wp--skip-link--target"); //
          anime({
            targets: ".enter_button",
            botttom: -400,
            left: -1000,
            opacity: 0,
            duration: 1400,
            easing: "easeOutExpo",
            complete: function (anim) {
              /*         console.log("Animation complete!", anim.animatables[0].target);
              const target = anim.animatables[0].target; */
              //target.css("display", "none");
            },
            /*  update: function (anim) {
            console.log(anim.endValue);
            window.scrollTo(0, (anim.progress / 100) * targetPosition);
          }, */
          });
          anime({
            targets: "h2.wp-block-heading",
            translateX: -250,
            duration: 1200,
            easing: "easeOutExpo",
            delay: 2000,
            /*  update: function (anim) {
            console.log(anim.endValue);
            window.scrollTo(0, (anim.progress / 100) * targetPosition);
          }, */
          });
        });
        // Scroll to the about section
        const scrollToAnim = function (element) {
          const targetPosition = document.getElementById(element).offsetTop;
          const scrollElement =
            window.document.scrollingElement ||
            window.document.body ||
            window.document.documentElement;
          anime({
            targets: scrollElement,
            scrollTop: targetPosition,
            duration: 2200,
            easing: "easeInOutExpo",
            delay: 1000,
            /*  update: function (anim) {
            console.log(anim.endValue);
            window.scrollTo(0, (anim.progress / 100) * targetPosition);
          }, */
          });
          console.log($(".wp-block-cover__image-background"));
          anime({
            targets: ".wp-block-cover__image-background",
            backgroundPosition: "50% 100%",
            //  translateY: - 200,
            duration: 2200,
            easing: "easeInOutExpo",
            delay: 1000,

            /*  update: function (anim) {
            console.log(anim.endValue);
            window.scrollTo(0, (anim.progress / 100) * targetPosition);
          }, */
          });
          console.log("XXXx: ", scrollElement);
        };
      });
    }
    /**
     * OWL gallery
     */
    if ($(".sik-gallery").length > 0) {
      console.log("Gal:: ", $(".sik-gallery"));
      const gallery = $(".sik-gallery").find(".wp-block-gallery");
      gallery.owlCarousel({
        items: 1,
        nav: true,
        autoWidth: true,
        autoHeight: truex,
      });
    }
    /**
     * paralalx effect
     */
    if ($(".parallaxme").length > 0) {
      console.log("has parallaxme");
      let parallaxCover = $(".parallaxme").find(
        ".wp-block-cover__image-background"
      );
      const parallaxCoverHeight = parallaxCover.height();
      console.log($(".parallaxme").hasClass("home-cover"));
      if (!$(".parallaxme").hasClass("home-cover")) {
        $(document).scroll(function () {
          var scrollTop = $(this).scrollTop();

          //s    isVisible($(".parallaxme"));

          if (scrollTop >= 100) {
            //     console.log("scrollTop: ",scrollTop);
            $("header.page-header").addClass("compact");
            //     navigationTransition("hide");
          } else {
            //    console.log("scrollTop: ",scrollTop);
            $("header.page-header").removeClass("compact");
            //     navigationTransition("show");
          }

          if (scrollTop <= parallaxCoverHeight) {
            // only if in viewport
            parallaxCover
              .css("top", -(scrollTop * 1.1) + "px")
              .css("height", scrollTop * 1.1 + parallaxCoverHeight + "px");
            //    console.log(parallaxCover.height());
          } else {
            console.log("OUT OF SIGHT ");
          }
        });
      }

      function isVisible($el) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();
        let elTop = $el.offset().top;
        let elBottom = elTop + $el.height();
        console.log("elTop: " + elTop + " docViewTop: " + docViewTop);
        console.log(
          " elBottom: " + elBottom + " docViewBottm: " + docViewBottom
        );
        let returnValue = false;
        if (elBottom <= docViewBottom && elTop >= docViewTop) {
          returnValue = "full";
        } else if (elBottom >= docViewTop) {
          returnValue = "TOP";
        } else {
          returnValue = "OUT TOP";
        }
        console.log("isVisible: " + returnValue);
        //   let returnValue = (elTop >= docViewTop) ? "full" : "top";
        console.log(" returnValue: " + returnValue);
        return elBottom <= docViewBottom && elTop >= docViewTop;
      }

      /*       function parallaxCover(el) {
        console.log("prlx: " + el.height() + "px");
      }
      parallaxCover($(".parallaxme")); */
    }

    /**
     * navigation effect
     */
    var currentStatus = "show";
    const navAnimation = anime({
      targets:
        ".wp-block-navigation__responsive-container li.wp-block-navigation-item",
      //  translateX: 270,
      delay: anime.stagger(200, { direction: "reverse" }), // increase delay by 100ms for each elements.{easing: 'easeInQuad'}
      color: "transparent",
      autoplay: false,
      height: { value: "0px", duration: 200 },
      backgroundColor: {
        value: ["rgba(250, 250, 250, 0)", "rgba(250, 250, 250, 1)"],
        duration: 100,
        easing: "easeOutQuad",
      },
      width: {
        value: "10px",
        delay: 200,
        duration: 400,
        easing: "easeOutQuad",
      },
      translateY: {
        value: function () {
          return anime.random(-5, 6);
        },
        delay: 400,
        duration: 600,
        easing: "easeInOutBack",
      },
      translateX: {
        value: "200",
        delay: 600,
        duration: 1000,
        easing: "easeInBack", //
      },
      opacity: {
        value: "0",
        delay: 500,
        duration: 1200,
        easing: "easeOutQuad",
      },
      direction: "alternate",
      loop: false,
      elasticity: 100,
      duration: 1200,
      easing: "easeOutElastic(1, .8)",

      complete: function (e) {
        //   mainNavOpen.addClass("always-shown");
        //  console.log("Animation  complete!", e.animatables.length);
        //   navigationTransition("show");
        //target.css("display", "none");
      },
    });
    const iconAnimation = anime({
      targets: ".main-nav-anim svg rect",
      //  translateX: 270,
      delay: anime.stagger(400), // increase delay by 100ms for each elements.{easing: 'easeInQuad'}
      direction: "reverse",
      autoplay: false,
      width: [0.1, 16],
      complete: function (e) {
        //  console.log("ICONCON", e.animatables.length);
      },
    });
    const iconCloseAnimation = anime({
      targets: ".wp-block-navigation__responsive-container-close",
      //  translateX: 270,
      //   delay: 800, // increase delay by 100ms for each elements.{easing: 'easeInQuad'}
      //direction: "alternate",
      autoplay: false,
      opacity: 1,
      elasticity: 100,
      duration: 600,
      //  loop: false, //
      easing: "easeOutElastic(1, .8)",
      complete: function (e) {
        console.log("CLOSECLOSE");
      },
    });

    window.closeNavClix = function (e) {
      console.log(e.target);
    };
    //$(".wp-block-navigation__responsive-container-close").addClass("show");
    let mainHeader = $("header.page-header");
    let mainNav = mainHeader.find(".wp-block-navigation__responsive-container");
    let mainNavOpen = mainHeader.find(
      ".wp-block-navigation__responsive-container-open"
    );
    let navClose = mainNav.find(
      ".wp-block-navigation__responsive-container-close"
    );

    var mobileNavButton = $(
      '[data-wp-on-async--click="actions.openMenuOnClick"]'
    );

    //navigation buttons
    if (mainNavOpen.length) {
      mainNavOpen.attr("data-wp-on-async--click", "openNavClix");

      // Add your custom click event listener
      mainNavOpen.on("click", function (event) {
        // Prevent the default action
        event.preventDefault();
        navigationTransition("show");
      });
    }
    if (mainNavOpen.length) {
      navClose.attr("data-wp-on-async--click", "closeNavClix");

      navClose.on("click", function (e) {
        e.preventDefault();
        //   console.log(this);
        navigationTransition("hide");
      });
    }
    // navAnimation.reverse();
    function navigationTransition(dir) {
      if (dir == currentStatus) {
        return;
      }
      currentStatus = dir;
      console.log("nav transition: " + dir);

      if (dir == "show") {
        //    mainNav.removeClass("hidden-by-default");

        //navClose.addClass("show");
        setTimeout(function () {
          iconAnimation.reverse();
          iconAnimation.play();

          //$(".wp-block-navigation__responsive-container-close").css("opacity", 1);
        }, 160);
        //delay
        setTimeout(function () {
          iconCloseAnimation.reverse();
          iconCloseAnimation.play();
          //  mainNavOpen.removeClass("always-shown");
          console.log("ICONTIMEOUT", $(".main-nav-anim svg rect"));
        }, 1200);

        console.log("DIR: " + dir);

        navAnimation.reverse();
        navAnimation.play();
      } else if (dir === "hide") {
        navAnimation.play();
        iconCloseAnimation.reverse();
        iconCloseAnimation.play();
        //delay
        setTimeout(function () {
          iconAnimation.reverse();
          iconAnimation.play();
          mainNavOpen.css("right", "-1rem");

          mainNavOpen.addClass("always-shown");
          //  navClose.removeClass("show");
        }, 160);

        //mainNavOpen.addClass("always-shown");
      }
    }

    // wait  5  seconds to run the transition
    setTimeout(function () {
      //  iconCloseAnimation.reverse();
      //  console.log("WhHhHH",iconCloseAnimation.animatables.length);
      navigationTransition("hide");
    }, 2000);

    // Preload and set the background image
    //imageHelper.preloadBackgroundImage(bgImageUrl);
  });
})(jQuery);
