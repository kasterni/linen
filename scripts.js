//////////////////////////////////////
// MOBILE MENU TOGGLE

$('#toggle').click(function () {
  $(this).toggleClass('active');
  $('.burger').toggleClass('change');
  $('#overlay').toggleClass('open');
  $("html, body").toggleClass("no-scroll");
});


//////////////////////////////////////
// SLIDE UP CONTENT ON SCROLL

(function ($) {
  $.fn.visible = function (partial) {
    var $t = $(this),
      $w = $(window),
      vTop = $w.scrollTop(),
      vBottom = vTop + $w.height(),
      top = $t.offset().top,
      bottom = top + $t.height(),
      compareTop = partial === true ? bottom : top,
      compareBottom = partial === true ? top : bottom;
    return ((compareBottom <= vBottom) && (compareTop >= vTop));
  };
})(jQuery);

var win = $(window);

var allBlocks = $(".slide-up");

allBlocks.each(function (i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("visible");
  }
});

win.scroll(function (event) {

  allBlocks.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("slide-up-content");
    }
  });

});

//////////////////////////////////////
// HERO SECTION IMAGE REVEAL

Document.prototype.ready = function (callback) {
  if (callback && typeof callback === 'function') {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        return callback();
      }
    });
  }
};

document.ready(function () {
  var selectors = document.querySelectorAll('.reveal');
  for (var el of selectors) {
    el.style.height = el.querySelector('.img-reveal > *').scrollHeight + 'px';
  }
});

$(function () { // $(document).ready shorthand
  $('.fade-in').fadeIn('slow');
});

//////////////////////////////////////
// PARALLAX ON MOUSE MOVE

$.fn.parallax = function (resistance, mouse) {
  $el = $(this);
  TweenLite.to($el, 0.2, {
    x: -((mouse.clientX - window.innerWidth / 2) / resistance),
    y: -((mouse.clientY - window.innerHeight / 2) / resistance)
  });
};

$(document).mousemove(function (e) {
  $(".img-zoom-hover").parallax(-40, e);
  $(".img-parallax").parallax(20, e);
});

$(document).mousemove(function (e) {
  parallaxIt(e, ".img-parallax-left", -40);
  parallaxIt(e, ".img-parallax-right", -20);
});

function parallaxIt(e, target, movement) {
  var $this = $("img");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}

//////////////////////////////////////
// FAQ

if (jQuery(".toggle .toggle-question").hasClass('active')) {
  jQuery(".toggle .toggle-question.active").closest('.toggle').find('.toggle-answer').show();
}
jQuery(".toggle .toggle-question").click(function () {
  if (jQuery(this).hasClass('active')) {
    jQuery(this).removeClass("active").closest('.toggle').find('.toggle-answer').slideUp(200);
  } else {
    jQuery(this).addClass("active").closest('.toggle').find('.toggle-answer').slideDown(200);
  }
});