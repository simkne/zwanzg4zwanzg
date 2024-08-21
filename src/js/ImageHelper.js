// ImageHelper.js
class ImageHelper {
  constructor(elementSelector) {
    this.element = document.querySelector(elementSelector);
  }

  checkBackgroundImage(callback, interval = 100) {
    const checkImage = () => {
      const bgImage = window.getComputedStyle(this.element).backgroundImage;
      // console.log(bgImage); // Debugging purpose only, remove in production code.

      if (bgImage && bgImage !== "none") {
        //   console.log("Background image has loaded successfully.");
        if (callback && typeof callback === "function") {
          callback(); // Trigger the callback function
        }

        // You can add additional logic here
      } else {
        // Check again after the specified interval
        setTimeout(checkImage, interval);
      }
    };
    // Start checking for the background image
    checkImage();
  }

  preloadBackgroundImage(imageUrl) {
    const img = new Image();
    img.src = imageUrl;

    //console.log("preloadBackgroundImage: ", img.src);
    img.onload = () => {
      //this.element.style.backgroundImage = `url(${imageUrl})`;
      this.element.style.backgroundImage = imageUrl;
      console.log("Background image has loaded successfully.");
      // You can add additional logic here
    };

    img.onerror = () => {
      console.log("Failed to load background image.");
    };
  }
  extractUrl(inputString) {
    // Regular expression to extract the URL
    const strstr = `${inputString}`;
    // const regex = /url$["']?(.*?)["']?$/;
    const regex = /http?:\/\/[^\s]+/;

    // Extracting the URL
    const match = inputString.match(regex);

    if (match[0]) {
      const url = match[1]; // The URL is in the first capturing group
   //   console.log("yYy", match);
      return match; // Return the extracted URL
    } else {
    //  console.log("NoOo URL found");
      return null; // Return null if no URL is found
    }
  }
  /*   getBackgroundImageUrl(element) {
    const bgImage = window.getComputedStyle(element).backgroundImage;

    // Regular expression to extract the URL
    const urlMatch = bgImage.match(/url$["']?([^"']+)["']?$/);

    // Return the URL if found, otherwise return null
    return urlMatch ? urlMatch[1] : null;
  } */
}
// Export the class for use in other files
export default ImageHelper;
