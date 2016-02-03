// Initialize tooltips
$(function () {
  $("[data-toggle='tooltip']").tooltip();
});

// Add responsive images
$(function () {
  $("img").addClass("img-responsive");
});

// Add responsive tables
$(function () {
  var tables = $("table");
  tables.wrap("<div class='table-responsive'></div>");
  tables.addClass("table");
});

// Responsive embedded videos
$(function () {
  var youtube = $('iframe[src*="youtube.com"]');
  youtube.wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
  youtube.addClass('embed-responsive-item');
  var vimeo = $('iframe[src*="vimeo.com"]');
  vimeo.wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
  vimeo.addClass('embed-responsive-item');
});

// Floating label headings for the contact form
$(function () {
  $("body").on("input propertychange", ".floating-label-form-group", function (e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function () {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function () {
    $(this).removeClass("floating-label-form-group-with-focus");
  });
});

// Show navigation bar on header on scroll-up
$(function () {
  // Media Query Breakpoint = Medium screen/ desktop = 940px + $grid-gutter-width
  var MQB = 970;

  if ($(window).width() <= MQB)
    return;

  // Primary navigation slide-in effect
  var nav = $('#nav');
  var headerHeight = nav.height();
  $(window).on('scroll', {
      previousTop: 0
    },
    function () {
      var currentTop = $(window).scrollTop();

      // Check if user is scrolling up
      if (currentTop < this.previousTop) {

        // If scrolling up...
        if (currentTop > 0 && nav.hasClass('is-fixed')) {
          nav.addClass('is-visible');
        } else {
          nav.removeClass('is-visible is-fixed');
        }
      } else {
        // If scrolling down...
        nav.removeClass('is-visible');
        if (currentTop > headerHeight && !nav.hasClass('is-fixed'))
          nav.addClass('is-fixed');
      }
      this.previousTop = currentTop;
    });
});