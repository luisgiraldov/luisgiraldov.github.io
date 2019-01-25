  'use strict';

  //when everything has loaded
  function ready() {
    /*
     * Check the viewport width
     */
    function getWidth() {
      let winWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      return winWidth;
    }; //End getWidth();

    /*
     * Check the viewport height
     */
    const getHeight = () => {
      let winHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
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

    //when the user resizes the screen, it calls the checkDeviceSize function
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

      let projectSectionJs = document.querySelectorAll(".project-section-js");
      let projectSectionText;
      let projectSectionContainer;
      let containsProjectSectionTextClass;
      for (let i = 0; i < projectSectionJs.length; i++) {
        projectSectionText = projectSectionJs[i].previousElementSibling;
        containsProjectSectionTextClass = projectSectionText.classList.contains("project-section-text");
        // console.log(projectSectionText);
        if (containsProjectSectionTextClass) {
          projectSectionText.classList.add("minWidth100");
          projectSectionContainer = projectSectionText.parentNode;
          projectSectionContainer.removeChild(projectSectionJs[i]);
          projectSectionText.insertBefore(projectSectionJs[i], projectSectionText.children[1]);
        }// End If statement
      }//End For loop
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
        if (containsProjectSectionTextClass) {
          projectSectionText.classList.remove("minWidth100");
          projectSectionContainer = projectSectionText.parentNode;
          projectSectionText.removeChild(projectSectionJs[i]);
          projectSectionContainer.appendChild(projectSectionJs[i]);
        } //End If statement
      }//End for loop
    };// End Image sibling

    checkDeviceSize();


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
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
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
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }; //End of else
            }); //End of animate method
          } //End of If statement target.length
        } //End of If statement (location Pathname)
      }); //End Click method


    /* ==========================================================================
        Sticky Navigation Bar
       ========================================================================== */
    let navVariables = (function() {
      // Get the navbar
      let navbar = document.getElementById("navbarJs");
      // Get the offset position of the navbar
      let sticky = navbar.offsetTop;
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      function checkOffSet() {
        let winHeight = getHeight();
        if (document.body.scrollTop > winHeight || document.documentElement.scrollTop > winHeight) {
          navbar.classList.add("sticky")
        } else {
          navbar.classList.remove("sticky");
        }
      }

      return {
        checkOffSet: checkOffSet
      }

    }());
    // When the user scrolls the page, execute checkOffSet
    window.onscroll = function() {
      navVariables.checkOffSet();
    };

    /* ==========================================================================
        Tooltip and Popover
       ========================================================================== */
    /*
     * show the popover when the user clicks, and the tooltip on hover
     */
    //get the anchor tag (envelope)
    let mailBtn = $('.popover-dismiss-js');

    //show the popover getting the content and title from data-attributes
    mailBtn.popover({
      content: mailBtn.attr('popover-content'),
      title: mailBtn.attr('popover-title')
    });

    //when the envelope (button) loses focus, it hides the popover
    mailBtn.on('blur', function() {
      mailBtn.popover('hide');
    });

    //shows the tooltip, getting data from data-attributes
    mailBtn.tooltip({
      placement: 'bottom',
      title: mailBtn.attr('tooltip-title'),
      trigger: 'hover'
    });

    //when the popover shows up, the tooltip will hide.
    mailBtn.on('show.bs.popover', function() {
      mailBtn.tooltip('hide')
    });
    // End of showing the tooltip and popover


  }; //End ready()
  window.onload = ready();

  /* ==========================================================================
      Copy data-attributes to the clipboard
     ========================================================================== */

  //copy text to the clipboard
  (function() {
    function createNode(text) {
      var node = document.createElement('pre');
      node.style.width = '1px';
      node.style.height = '1px';
      node.style.position = 'fixed';
      node.style.top = '5px';
      node.textContent = text;
      return node;
    }

    function copyNode(node) {
      var selection = getSelection();
      selection.removeAllRanges();

      var range = document.createRange();
      range.selectNodeContents(node);
      selection.addRange(range);

      document.execCommand('copy');
      selection.removeAllRanges();
    }

    function copyText(text) {
      var node = createNode(text);
      document.body.appendChild(node);
      copyNode(node);
      document.body.removeChild(node);
    }

    $('.popover-dismiss-js').on('click', function() {
      var text;
      if (text = this.getAttribute('data-email')) {
        copyText(text);
      }

    });
  }).call(this);
  //end of copying text to the clipboard
