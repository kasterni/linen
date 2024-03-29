// // change navbar color on scroll
// $(function () {
//     $(document).scroll(function () {
//       var $nav = $("nav");
//       $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
//     });
//   });


// // change navbar color to green
// $(document).on('scroll', function() {
//   var se1 = $('.bg-green').position().top;
//   if($(this).scrollTop() >= se1){
//        $("nav").addClass("green-nav"); 
//     }
//   else{
//     $("nav").removeClass("green-nav");
//   };
// });

// $(document).on('scroll', function() {
//   var se1 = $('.bg-beige').position().top;
//   if($(this).scrollTop() >= se1){
//        $("nav").addClass("beige-nav"); 
//     }
//   else{
//     $("nav").removeClass("green-nav");
//   }
// });

// drag images around - use class box

// Draggable.create('.box', {type: 'x,y', edgeResistance: 0.65, bounds: '.row', throwProps: true})

// Draggable.create('.name', {type: 'x,y', edgeResistance: 0.65, bounds: '.row', throwProps: true})



// move around images - use class move-around

// var rect = $('.move-around')[0].getBoundingClientRect();
// var mouse = {x: 0, y: 0, moved: false};

// $(".move-around").mousemove(function(e) {
//   mouse.moved = true;
//   mouse.x = e.clientX - rect.left;
//   mouse.y = e.clientY - rect.top;
// });
 
// // Ticker event will be called on every frame
// TweenLite.ticker.addEventListener('tick', function(){
//   if (mouse.moved){    
//     parallaxIt(".slide", -100);
//     parallaxIt("img", -30);
//   }
//   mouse.moved = false;
// });

// function parallaxIt(target, movement) {
//   TweenMax.to(target, 0.3, {
//     x: (mouse.x - rect.width / 2) / rect.width * movement,
//     y: (mouse.y - rect.height / 2) / rect.height * movement
//   });
// }

// $(window).on('resize scroll', function(){
//   rect = $('.move-around')[0].getBoundingClientRect();
// })





/////////////////////////



// var image = document.getElementsByClassName('thumbnail');
// new simpleParallax(image, {
// 	overflow: true
// });

// var scene = document.getElementsByClassName('img-block');
// var parallaxInstance = new Parallax(scene, {
//   relativeInput: true
// });



// parallax img on scroll

// var $images = $('.parallax-img');
// var window_h = $(window).height();

// $(window).scroll(function() {
//     var windowScrollTop = $(window).scrollTop();
  
//     if (windowScrollTop == 0) {
//        TweenLite.to($images, 1.2, {
//           yPercent: 0,
//           ease: Power1.easeOut,
//           overwrite: 0
//        });
//     }
//     else{   
//        $images.each(function() {
//           var elementOffsetTop = $(this).offset().top,
//              element_h = $(this).height(),          
//              velocity = $(this).data('velocity');

//              if (windowScrollTop + window_h > elementOffsetTop && windowScrollTop  < elementOffsetTop + element_h) {
//                 //if in view:
                
//                TweenLite.to($(this), 1.2, {
//                  yPercent: (windowScrollTop + window_h - elementOffsetTop) / window_h * velocity,
//                  ease: Power1.easeOut,
//                  overwrite: 0
//                });
//              }
//        });
//     }
// });



$('#toggle').click(function () {
  $(this).toggleClass('active');
  $('.burger').toggleClass('change');
  $('#overlay').toggleClass('open');
  $("html, body").toggleClass("no-scroll");  
});



// fade in up 

(function($) {

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});



// reveal images when loader dissapears

Document.prototype.ready = function(callback) {
  if(callback && typeof callback === 'function') {
    document.addEventListener("DOMContentLoaded", function() {
      if(document.readyState === "interactive" || document.readyState === "complete") {
        return callback();
      }
    });
  }
};

document.ready(function() { 
  var selectors = document.querySelectorAll('.reveal');
  for(var el of selectors) {
    el.style.height = el.querySelector('.reveal__content > *').scrollHeight + 'px';
  }
});

$(function(){  // $(document).ready shorthand
  $('.fade-in').fadeIn('slow');
});




