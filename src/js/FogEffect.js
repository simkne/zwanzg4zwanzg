// fogEffect.js
/****************************************************************
 * usage:
 *   $(document).ready(function () {
    const fogContainers = $(".fogme"); //check if a container named "fogme" exists

    fogContainers.each(function () {
      const container = $(this)[0];
      const fogEffect = new FogEffect(container, {
        fogCount: 8,
        color: "#b3b8bb",
        opacity: 0.7,
        blur: "40px",
        borderRadius: "120%",
      });

      // Example of setting the fog intensity dynamically
        const intensitySlider = $('#intensity-slider'); // Assume you have a slider with this ID

        intensitySlider.on('input', function () {
            const intensity = $(this).val() / 100; // Normalize to a value between 0 and 1
            fogEffect.setIntensity(intensity);
        }); 

      // You can also set the initial intensity programmatically
      fogEffect.setIntensity(0.5); // Set to 50% intensity initially
    });
  });
  ****************************************************************/

export class FogEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.fogs = [];
    this.defaultOptions = {
      color: "#b3b8bb",
      opacity: 0.7,
      blur: "40px",
      borderRadius: "120%",
      fogCount: 8,
      backgroundColor: "rgb(104 103 99 / 62%)",
    };
    this.options = { ...this.defaultOptions, ...options };

    this.init();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setIntensity(intensity) {
    this.options.intensity = intensity; // Scale opacity with intensity

    var new_opacity = Math.min(1, intensity * 0.01);

    this.options.opacity = new_opacity; // Scale opacity with intensity
    this.updateFogs(new_opacity);
  }

  init() {
    this.container.style.position = "absolute";
    this.container.style.overflow = "hidden";
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.style.pointerEvents = "none";
    this.container.style.backgroundColor = this.options.backgroundColor;
    //this.container.style.opacity = ".7";
    this.container.style.transition = "opacity 2s ease-in";
    this.container.style.zIndex = "9";
    this.generateFog();
    this.fogs.forEach((fog) => this.createFog(fog));
  }

  clearFogs(speed = 3) {
    this.fogs.forEach((fog) => {
      if (fog.element) {
        //fadeout fog elements
        fog.element.style.transition = "opacity " + speed + "s ease-in";
        fog.element.style.opacity = 0;
        //wait for 3 seconds before clearing the fogs
        setTimeout(() => {
          this.container.removeChild(fog.element);
          this.fogs = [];
        }, speed * 1000 + 500);
      }
    });
    //fadeout Background
    this.container.style.transition = "background-color " + speed + "s ease-in";
    this.container.style.backgroundColor = "rgb(104 103 99 / 0%)";
  }
  updateFogs(ind) {
    this.fogs.forEach((fog) => {
      if (fog.element) {
        fog.element.style.opacity = this.options.opacity;
      }
    });
    //  this.fogs = [];
  }

  generateFog() {
    const { clientWidth, clientHeight } = this.container;
    for (let i = 0; i < this.options.fogCount; i++) {
      const size = {
        w: Math.random() * 400 + 50, // Random width between 50 and 250 pixels
        h: Math.random() * 250 + 50, // Random height between 50 and 250 pixels
      };
      const position = {
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
      };
      const direction = Math.random() > 0.5 ? 0 : 1; // Random direction (left or right)
      const velocity = Math.random() * 2 + 0.4; // Random velocity between 0.2 and 0.7

      this.fogs.push(
        new Fog(position.x, position.y, size, direction, velocity)
      );
    }
  }

  createFog(fog) {
    const fogDiv = document.createElement("div");
    fogDiv.style.width = fog.size.w + "px";
    fogDiv.style.height = fog.size.h + "px";
    fogDiv.style.backgroundColor = this.options.color;
    fogDiv.style.position = "absolute";
    fogDiv.style.opacity = this.options.opacity;
    fogDiv.style.filter = `blur(${this.options.blur})`;
    fogDiv.style.borderRadius = this.options.borderRadius;
    fogDiv.style.left = fog.x + "px";
    fogDiv.style.top = fog.y + "px";
    fogDiv.style.transition = "opacity 2s ease-in";

    fog.element = fogDiv;
    this.container.appendChild(fogDiv);
  }

  animate() {
    this.fogs.forEach((fog) => this.updatePosition(fog));
    //   this.fogs.forEach((fog) => this.updateIntensity(fog));
    requestAnimationFrame(this.animate);
  }

  updateIntensity(fog) {
    fog.element.style.opacity = this.options.opacity;
  }
  updatePosition(fog) {
    const { width: containerWidth } = this.container.getBoundingClientRect();

    switch (fog.direction) {
      case 0: // move left
        fog.x -= fog.velocity;
        if (fog.x + fog.size.w < 0) {
          fog.x = containerWidth + fog.size.w;
        }
        break;
      case 1: // move right
        fog.x += fog.velocity;
        if (fog.x > containerWidth) {
          fog.x = -fog.size.w;
        }
        break;
    }
    fog.element.style.left = fog.x + "px";
  }
}

class Fog {
  constructor(x, y, size, direction, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.velocity = velocity;
    this.element = null;
  }
}
