function LocomotiveAnime(){

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
function lenis() {
  // Use higher lerp for less lag, and moderate multipliers for smooth but responsive scroll
  const lenis = new Lenis({
    lerp: 0.09, // Lower lerp for more responsive, jerk-free but still smooth scroll
    smoothWheel: true,
    wheelMultiplier: 0.85, // Slightly higher for natural, not sluggish speed
    //touchMultiplier: 0.9, // Enable and slightly increase for smooth touch scroll
    //smoothTouch: true, // Ensure smoothness on touch devices
  });

  // Function to create a slow scroll (parallax-like) effect for #page2
  function slowScrollParallaxPage2() {
    const page2 = document.querySelector("#page2");
    if (!page2) return;

    // We'll move the background or content of #page2 at a slower rate than the scroll
    // For demonstration, let's translate the content upward as the user scrolls, but at a slower rate

    window.addEventListener("scroll", function () {
      // Get the scroll position relative to #page2
      const rect = page2.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only apply effect when #page2 is in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how much #page2 has entered the viewport
        // The further it is in, the more we translate
        // Parallax factor: lower = slower
        const parallaxFactor = -0.20;
        // Amount scrolled past the top of #page2
        const scrolled = Math.max(0, windowHeight - rect.top);
        // TranslateY negative to move content up
        page2.style.transform = `translateY(${-(scrolled * parallaxFactor)}px)`;
      } else {
        // Reset transform when not in view
        page2.style.transform = "";
      }
    });
  }

  function slowScrollParallaxPage3() {
    const page5 = document.querySelector("#page5");
    if (!page5) return;

    // We'll move the background or content of #page2 at a slower rate than the scroll
    // For demonstration, let's translate the content upward as the user scrolls, but at a slower rate

    window.addEventListener("scroll", function () {
      // Get the scroll position relative to #page2
      const rect = page5.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only apply effect when #page2 is in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how much #page2 has entered the viewport
        // The further it is in, the more we translate
        // Parallax factor: lower = slower
        const parallaxFactor = -0.2;
        // Amount scrolled past the top of #page2
        const scrolled = Math.max(0, windowHeight - rect.top);
        // TranslateY negative to move content up
        page5.style.transform = `translateY(${-(scrolled * parallaxFactor)}px)`;
      } else {
        // Reset transform when not in view
        page5.style.transform = "";
      }
    });
  }

  // Call the function to activate the effect
  slowScrollParallaxPage2();
  slowScrollParallaxPage3();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
function loadingAnimation() {
  var tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    duration: 0.6,
    stagger: 0.25,
    opacity: 0,
    delay: 0.3,
    ease: "none",
  });

  tl.from("#please h5", {
    // y: 150,
    duration: 0.6,
    stagger: 0.25,
    opacity: 0,
    delay: 0.5,
    ease: "none",
  });

  tl.from(".line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector(".line1-part1 h5");
      var count = 0;
      setInterval(function () {
        if (count < 100) {
          h5timer.innerHTML = count++;
        } else {
          h5timer.innerHTML = count;
        }
      }, 30);
    },
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
    duration: 0.35,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.3,
    delay: 2.5,
    ease: "none",
  });

  tl.from("#page1", {
    duration: 0.6,
    delay: 0,
    ease: "power4.inOut",
    // opacity: 0,
    y: 1400,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#nav", {
    opacity: 0,
    ease: "none",
    duration: 0.2,
  });

  tl.from(".hero h1,.hero h2 ", {
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 0.2,
    ease: "none",
  });

  tl.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}
function cursoranim() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      x: dets.x,
      y: dets.y,
    });
  });

  Shery.makeMagnet("#nav-part2 h4", {});

 
  
}  
function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug: true,
    config:
      {"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":"9996999","range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.76,"range":[0,10]},"metaball":{"value":0.67,"range":[0,2]},"discard_threshold":{"value":0.84,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
    
  });
}
function flag(){
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y,
    });
  });
  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
}

//  LocomotiveAnime();
loadingAnimation();
cursoranim();
lenis();
sheryAnimation();
flag();

