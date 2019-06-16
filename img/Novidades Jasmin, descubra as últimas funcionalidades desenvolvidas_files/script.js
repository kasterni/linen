//var MAILER_URL = template.templateUrl + "/mailer.php";
var MAILER_URL = "https://jasminsoftware.com/mailer.php";
var scroll_offset = 50;
jQuery(document).ready(function($) {
  if($("#cookie-law-info-bar").is(":visible")) {
    
    $("#page").addClass("cookie-fix");
  }

  $("#cookie_action_close_header").click(function(){
    $("#page").removeClass("cookie-fix");
  })

  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  nav_top_bar = $(".nav-top-bar");
  if ($(window).scrollTop() >= scroll_offset) {
    nav_top_bar.addClass("menu-encolhido");
  }
  var video_fixed = false;
  var video_cat = $("#video_cat");

  var tempnum;

  //console.log(video_cat);
  if (video_cat.length > 0) {
    tempnum = video_cat.offset().top - 99;
  } else {
    tempnum = 0;
  }

  var video_top = tempnum;

  $(window).on("resize scroll", function() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) === false &&
      window.innerWidth > 990
    ) {
      if (video_cat.length) {
        if ($(window).scrollTop() < video_top) {
          //console.log("à mostra!!");
          video_cat.css({
            position: "static",
            width: "100%"
          });
          video_fixed = false;
        } else if (!video_fixed) {
          //console.log(video_cat.offset());
          //console.log($("#le_title").offset());
          //console.log(video_cat.outerWidth());
          video_fixed = true;
          //console.log("escondido!!");
          video_cat.css({
            position: "fixed",
            top: 95 + "px",
            left: video_cat.offset().left + "px",
            width: video_cat.outerWidth() + "px"
          });
        }
      }
    }
  });

  /* MODAL VIDEOS */

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $(".itsvideo").click(function() {
    var id_video = youtube_parser($(this).attr("data-video"));
    var theModal = $(this).data("target"),
      videoSRC = "https://www.youtube.com/embed/" + id_video,
      videoSRCauto =
        videoSRC +
        "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + " iframe").attr("src", videoSRCauto);
    $(theModal + " button.close").click(function() {
      $(theModal + " iframe").attr("src", videoSRC);
    });
  });

  $("#modalVideos").on("hidden.bs.modal", function(e) {
    $("#modalVideos")
      .find("iframe")
      .attr("src", "");
  });
  /* END MODAL VIDEOS */

  /* TAB HELPCENTER */
  $(window).load(function() {
    var scrollTop = $(this).scrollTop();
    //console.log(scrollTop);
  });
  $(window).scroll(function(event) {
    var scrollTop = $(this).scrollTop();
    //console.log(scrollTop);
    if (scrollTop > 290) {
      $(".tabHelpcenter").css({
        position: "absolute",
        top: 667 + "px"
      });
    } else {
      $(".tabHelpcenter").css({
        position: "fixed",
        top: 380 + "px"
      });
    }
  });

  /* END TAB HELPCENTER */

  /* JS PARA O ACORDEAO */
  $(".acordeao-titulo").click(function() {
    var abreTab = $(this).attr("data-abre");
    //console.log(abreTab);
    $("#" + abreTab).slideToggle("fast");
    $(this).toggleClass("acordeao-aberto");
  });

  /* END JS PARA O ACORDEAO */

  /* JS PARA O SLIDESHOW */
  var slideshow = $("#slideshow");
  var intervalo = 5000;
  if (slideshow.length) {
    console.log("slideshow willbe v1.0");

    var current_slide = 0;

    slides = $(".slide");
    slides[current_slide].classList.add("show-slide");

    setInterval(function() {
      next_slide = current_slide + 1;

      if (next_slide >= slides.length - 1) next_slide = 0;
      slides[current_slide].classList.remove("show-slide");
      slides[next_slide].classList.add("show-slide");

      current_slide = next_slide;
    }, intervalo);
  }

  /* END JS PARA O SLIDESHOW */

  /* JS PARA BLOCO CONTACTOS */
  var contactForm = $("#contactForm");

  contactForm.submit(function(event) {
    event.preventDefault();
    submitForm();
  });

  function submitForm() {
    console.log("a enviar...");
    var nome = $("#input_nome").val();
    var email = $("#input_email").val();
    var telemovel = $("#input_tel").val();
    var mensagem = $("#input_mensagem").val();
    $.ajax({
      type: "POST",
      url: MAILER_URL,
      dataType: "JSON",
      data:
        "nome=" +
        nome +
        "&email=" +
        email +
        "&telemovel=" +
        telemovel +
        "&mensagem=" +
        mensagem,
      success: function(data) {
        console.log(data);
        if (data === "success") {
          sucesso();
        } else if (data === "invalid") {
          insucesso();
        }
      },
      error: function(data) {
        console.log(data);
      }
    });
  }

  function sucesso() {
    console.log("sucesso!");
    $("#contactoSucesso").slideDown("fast", function() {
      setTimeout(function() {
        contactForm[0].reset();
        $("#contactoSucesso").slideUp("fast", function() {});
      }, 3000);
    });
  }

  function insucesso() {
    console.log("insucesso!");
    $("#contactoInsucesso").slideDown("fast", function() {
      setTimeout(function() {
        contactForm[0].reset();
        $("#contactoInsucesso").slideUp("fast", function() {});
      }, 3000);
    });
  }
  /* END JS PARA BLOCO CONTACTOS */

  /* REVER ESTE CÓDIGO SE O UTILIZAR PERCO OS LINKS FILHOS DESTE CONTAINER!!!! */
  /* FIX PARA A PÁGINA NAO FAZER SCROLL UP NOS ITEMS DE MENU QUE CONTENHAM SUB-MENUS  */
  var menusComSubMenus = $(".menu-item-has-children");

  menusComSubMenus.click(function(event) {
    //event.preventDefault();
  });
  /* END FIX PARA A PÁGINA NAO FAZER SCROLL UP NOS ITEMS DE MENU QUE CONTENHAM SUB-MENUS */

  /* COLOCAR FUNDO NA BARRA DE NAVEGAÇÃO APÓS FAZER SCROLL */

  $(window).scroll(function(event) {
    deltaScroll = $(this).scrollTop();
    if (deltaScroll >= scroll_offset) {
      nav_top_bar.addClass("menu-encolhido");
    } else {
      nav_top_bar.removeClass("menu-encolhido");
    }
  });
  /* END COLOCAR FUNDO NA BARRA DE NAVEGAÇÃO APÓS FAZER SCROLL */

  /* MENU MOBILE */
  btnMenu = $(".mobile-hamburguer-btn");
  menuContainer = $(".menu-container");
  btnMenu.click(function(event) {
    //event.preventDefault();
    menuContainer.toggle();
  });

  menusComSubMenus.click(function(event) {
    //event.preventDefault();
    $(this)
      .find(".sub-menu")
      .toggleClass("mostra");
  });
  /* END MENU MOBILE */

  /* CARROSSEL DAS CATEGORIAS */
  function Carroussel() {
    //var larguraItem = 142;
    var larguraItem = 172;
    var posActual = 0;
    var carrossel = $(".carrossel");
    var seta = {
      esquerda: carrossel.children(".esquerda"),
      direita: carrossel.children(".direita")
    };
    var listagemCategorias = $(".listagem-categorias");
    var categoriaItems = $(".listagem-items");
    var larguraTotal = categoriaItems.length * larguraItem;
    var larguraVisivel = $(".container-listagem-categorias").width();
    var itemsVisiveis = Math.ceil(larguraVisivel / larguraItem);
    listagemCategorias.css({
      transform: "translate3d(" + posActual + "px, 0px, 0px)"
    });
    seta.direita.click(function(event) {
      console.log("seta direita clicked");
      if (
        posActual <= 0 &&
        posActual > -(larguraTotal - itemsVisiveis * larguraItem)
      ) {
        posActual -= larguraItem;
        listagemCategorias.css({
          transform: "translate3d(" + posActual + "px, 0px, 0px)"
        });
      }
    });
    seta.esquerda.click(function(event) {
      console.log("seta esquerda clicked");
      console.log()
      if (
        posActual < 0 &&
        posActual < larguraTotal - itemsVisiveis * larguraItem
      ) {
        posActual += larguraItem;
        listagemCategorias.css({
          transform: "translate3d(" + posActual + "px, 0px, 0px)"
        });
      }
    });
  }

  Carroussel();
  $(window).resize(function() {
    Carroussel();
  });
  /* END CARROSSEL DAS CATEGORIAS */

  /* CÓDIGO RESPONSÁVEL POR PARA O VIDEO DO YOUTUBE QUANDO FECHO O MODAL */
  $("#modalBloco1").on("hidden.bs.modal", function(e) {
    $("#modalBloco1 iframe").attr(
      "src",
      jQuery("#modalBloco1 iframe").attr("src")
    );
  });
  /* END CÓDIGO RESPONSÁVEL POR PARA O VIDEO DO YOUTUBE QUANDO FECHO O MODAL*/

  // Gets the video src from the data-src on each button
  var videoSrc;
  $(".video-btn").click(function() {
    videoSrc = $(this).data("src");
    //console.log(videoSrc);
  });

  // when the modal is opened autoplay it
  $("#myModal").on("shown.bs.modal", function(e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr(
      "src",
      videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1"
    );
  });

  // stop playing the youtube video when I close the modal
  $("#myModal").on("hide.bs.modal", function(e) {
    // a poor man's stop video
    $("#video").attr("src", videoSrc);
  });

  /* MARKETPLACE FILTRAR POR CATEGORIAS */
  $("#select_cats").val("todos");
  var categoriasMarketPlace = $("#all_cats").attr("value");
  if (categoriasMarketPlace != null)
    var arrayCategoriasMarketPlace = categoriasMarketPlace.split(",");
  $("#select_cats").change(function(event) {
    mostraArtigos($(this).val());
  });
  function mostraArtigos(cat) {
    var items_length = $(".market-item-container").length;

    if (cat === "todos") {
      for (i = 0; i < items_length; i++) {
        $(".market-item-container")[i].classList.remove("hideCat");
      }
    } else {
      for (i = 0; i < items_length; i++) {
        $(".market-item-container")[i].classList.add("hideCat");
        if ($(".market-item-container")[i].classList.contains(cat)) {
          $(".market-item-container")[i].classList.remove("hideCat");
        }
      }
    }
  }
  /* END MARKETPLACE FILTRAR POR CATEGORIAS */

  /* IDENTIFICA CATEGORIA */
  var tempCar = $(".carrossel");

  if (tempCar.length !== 0) {
    //console.log($('#cat_post').val());
    classActiva = "." + $("#cat_post").val();
    $(classActiva).addClass("cat-activa");
  }
  /* END IDENTIFICA CATEGORIA */

  /* IDENTIFICA ARTIGO */

  $("#categoria_activa").click(function() {
    $(".item-cat").toggle();
    $("#categoria_activa").toggleClass("roda-seta");
  });

  /* END IDENTIFICA ARTIGO */
  var menuAberto = false;
  $("#dropdownMenuMobile").click(function() {
    console.log("PIM!");
    if (!menuAberto) {
      menuAberto = true;

      $("#dropdownMenuMobile>li").css({
        display: "block"
      });

      $("#dropdownMenuMobile").css({
        height: "auto"
      });
    } else {
      menuAberto = false;
      $("#dropdownMenuMobile>li").css({
        display: "none"
      });
      $("#dropdownMenuMobile").css({
        height: "30px"
      });
    }
  });
});

/* TRUQUE PARA PARAR O SCROLL CASO O MEU ESTEJA ABERTO

$(window).scroll({previousTop: 0}, function (e) {
    if ($('#hamburger').hasClass('open')){
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    var currentTop = $(window).scrollTop();
    if (currentTop < this.previousTop) {
        $(".wrapper").show();
    } else {
        $(".wrapper").hide();
    }
    this.previousTop = currentTop;
});

*/
