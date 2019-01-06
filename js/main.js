
// Create a div that appears after scroll, stays permanently at bottom of page
//
// function ready() {
//   $(function(){
//       $(window).scroll(function() {
//         $(document).scrollTop() > 500 ? $('.footer:hidden').fadeIn() : $('.footer:visible').fadeOut();
//         let prueba = $(document).scrollTop();
//         console.log(prueba);
//       });
//   });
//
// };
// window.onload = ready();

//Prueba to get the width of the viewport

//when everything has loaded
function ready() {
  let counter = 0;
  /*
   * Check the viewport width
   */
  function getWidth() {
    let winWidth = window.innerWidth
                   || document.documentElement.clientWidth
                   || document.body.clientWidth;
    return winWidth;
  }; //End getWidth();

  /*
   * Check the viewport height
   */
  const getHeight = () => {
    let winHeight = window.innerHeight
                   || document.documentElement.clientHeight
                   || document.body.clientHeight;
    return winHeight;
  }; //End getHeight();

  /*
    tablets breakpoint : 768px and up
    desktop breakpoint : 992px and up
  */

  /*
   * Check if the viewport width is between tablets and desktops
   */
   function checkDeviceSize() {
     let winWidth = getWidth();

     if (winWidth >= 768 && winWidth < 992) {
       //It is in a tablet screen size
       putImageAsChild();
     } else {
       putImageAsSibling();
     }
   };

   let resizeTimer;
   $(window).resize(function() {
     clearTimeout(resizeTimer);
     resizeTimer = setTimeout(checkDeviceSize, 10);
   });

   /*
    * Take the images with the class projectSectionJs being a sibling node of projectSectionText and put it as a child node
    * of the same(projectSectionText)(all of that when is a tablet, this will help to float the text around the image)
    */
   function putImageAsChild() {
    //  let containers = document.querySelectorAll(".project-section-container");
    //  let containerChildren;
    //  let projectSectionJs;
    //  let projectSectionText;
    //  let containsProjectSectionJsClass;

    //  for (let i = 0; i < containers.length; i++) {
    //    containerChildren = containers[i].children;
    //    projectSectionJs = containerChildren[1];
    //    projectSectionText = containerChildren[0];
    //    containsProjectSectionJsClass = containerChildren[1].classList.contains("project-section-js");
    //    if(containsProjectSectionJsClass) {
    //      containers[i].removeChild(projectSectionJs);
    //      projectSectionText.appendChild(projectSectionJs);
    //    }
    //  } //End i for loop

    let projectSectionJs = document.querySelectorAll(".project-section-js");
    let projectSectionText;
    let projectSectionContainer;
    let containsProjectSectionTextClass;
    for (let i = 0; i < projectSectionJs.length; i++) {
        projectSectionText = projectSectionJs[i].previousElementSibling;
        containsProjectSectionTextClass = projectSectionText.classList.contains("project-section-text");
        // console.log(projectSectionText);
        if(containsProjectSectionTextClass){
          projectSectionText.classList.add("minWidth100");
          projectSectionContainer = projectSectionText.parentNode;
          projectSectionContainer.removeChild(projectSectionJs[i]);
          projectSectionText.insertBefore(projectSectionJs[i],projectSectionText.children[1]);
        } else {
          console.log("something went wrong in imageChild!!");
        }

    }

   }; //End imageChild

   function putImageAsSibling() {
     let projectSectionJs = document.querySelectorAll(".project-section-js");
     let projectSectionText;
     let projectSectionContainer;
     let containsProjectSectionTextClass;
     for (let i = 0; i < projectSectionJs.length; i++) {
         projectSectionText = projectSectionJs[i].parentNode;
         containsProjectSectionTextClass = projectSectionText.classList.contains("project-section-text");
        //  console.log(projectSectionText);
        if(containsProjectSectionTextClass){
          projectSectionText.classList.remove("minWidth100");
          projectSectionContainer = projectSectionText.parentNode;
          projectSectionText.removeChild(projectSectionJs[i]);
          projectSectionContainer.appendChild(projectSectionJs[i]);
        } else {
          console.log("Something went wrong in imageSibling!!!");
        }

     }

   };

   checkDeviceSize();
  // const aboutLink = document.querySelector(".nav-link");
  // const showSize = () => {
  //   console.log(`
  //     Width ${getWidth()}
  //     `);
  //   console.log(`
  //     Height ${getHeight()}
  //   `);
  // };
  //  aboutLink.addEventListener('click', showSize);

/*
 * Smooth Scrolling Effect with Accesibility Compliance
 */

 // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }; //End of else
        }); //End of animate method
      } //End of If statement target.length
    } //End of If statement (location Pathname)
  }); //End Click method

  /* ==========================================================================
      back to top button
     ========================================================================== */

  // When the user scrolls down 500px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  let backToTop = document.getElementById("back-to-top-js");
  function scrollFunction() {
     if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
       backToTop.style.display = "block";
       setTimeout(function() {
         backToTop.style.display = "none";
       }, 5000);
     } else {
       backToTop.style.display = "none";
     }
   }


}; //End ready()
window.onload = ready();
