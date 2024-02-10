/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/js/plugins.jpaginate.js ***!
  \*************************************/
// jQuery Paginate v0.4
;
(function ($) {
  $.fn.pajinate = function (options) {
    var current_page = "current_page";
    var items_per_page = "items_per_page";
    var meta;
    var defaults = {
      item_container_id: ".content",
      items_per_page: 10,
      nav_panel_id: ".page_navigation",
      nav_info_id: ".info_text",
      num_page_links_to_display: 20,
      start_page: 0,
      wrap_around: false,
      nav_label_first: "First",
      nav_label_prev: "Prev",
      nav_label_next: "Next",
      nav_label_last: "Last",
      nav_order: ["first", "prev", "num", "next", "last"],
      nav_label_info: "Showing {0}-{1} of {2} results",
      show_first_last: true,
      abort_on_small_lists: false,
      jquery_ui: false,
      jquery_ui_active: "ui-state-highlight",
      jquery_ui_default: "ui-state-default",
      jquery_ui_disabled: "ui-state-disabled"
    };
    var options = $.extend(defaults, options);
    var $item_container;
    var $page_container;
    var $items;
    var $nav_panels;
    var total_page_no_links;
    var jquery_ui_default_class = options.jquery_ui ? options.jquery_ui_default : "";
    var jquery_ui_active_class = options.jquery_ui ? options.jquery_ui_active : "";
    var jquery_ui_disabled_class = options.jquery_ui ? options.jquery_ui_disabled : "";
    return this.each(function () {
      $page_container = $(this);
      $item_container = $(this).find(options.item_container_id);
      $items = $page_container.find(options.item_container_id).children();
      if (options.abort_on_small_lists && options.items_per_page >= $items.size()) {
        return $page_container;
      }
      meta = $page_container;
      meta.data(current_page, 0);
      meta.data(items_per_page, options.items_per_page);
      var total_items = $item_container.children().length;
      var number_of_pages = Math.ceil(total_items / options.items_per_page);
      var more = '<li class="page-item disabled ellipse more"><a class="page-link" href="#">...</a></li>';
      var less = '<li class="page-item disabled ellipse less"><a class="page-link" href="#">...</a></li>';
      var first = !options.show_first_last ? "" : '<li class="page-item first_link ' + jquery_ui_default_class + '"><a class="page-link" href="#">' + options.nav_label_first + "</a></li>";
      var last = !options.show_first_last ? "" : '<li class="page-item last_link ' + jquery_ui_default_class + '"><a class="page-link" href="#">' + options.nav_label_last + "</a></li>";
      var navigation_html = "";
      for (var i = 0; i < options.nav_order.length; i++) {
        switch (options.nav_order[i]) {
          case "first":
            navigation_html += first;
            break;
          case "last":
            navigation_html += last;
            break;
          case "next":
            navigation_html += '<li class="page-item next_link ' + jquery_ui_default_class + '"><a class="page-link" href="#">' + options.nav_label_next + "</a></li>";
            break;
          case "prev":
            navigation_html += '<li class="page-item previous_link ' + jquery_ui_default_class + '"><a class="page-link" href="#">' + options.nav_label_prev + "</a></li>";
            break;
          case "num":
            navigation_html += less;
            var current_link = 0;
            while (number_of_pages > current_link) {
              navigation_html += '<li class="page-item page_link ' + jquery_ui_default_class + '" longdesc="' + current_link + '"><a class="page-link" href="#">' + (current_link + 1) + "</a></li>";
              current_link++;
            }
            navigation_html += more;
            break;
          default:
            break;
        }
      }
      $nav_panels = $page_container.find(options.nav_panel_id);
      $nav_panels.html(navigation_html).each(function () {
        $(this).find(".page_link:first").addClass("first");
        $(this).find(".page_link:last").addClass("last");
      });
      $nav_panels.children(".ellipse").hide();
      $nav_panels.find(".previous_link").next().next().addClass("active " + jquery_ui_active_class);
      $items.hide();
      $items.slice(0, meta.data(items_per_page)).show();
      total_page_no_links = $page_container.find(options.nav_panel_id + ":first").children(".page_link").length;
      options.num_page_links_to_display = Math.min(options.num_page_links_to_display, total_page_no_links);
      $nav_panels.children(".page_link").hide();
      $nav_panels.each(function () {
        $(this).children(".page_link").slice(0, options.num_page_links_to_display).show();
      });
      $page_container.find(".first_link").click(function (e) {
        e.preventDefault();
        movePageNumbersRight($(this), 0);
        gotopage(0);
      });
      $page_container.find(".last_link").click(function (e) {
        e.preventDefault();
        var lastPage = total_page_no_links - 1;
        movePageNumbersLeft($(this), lastPage);
        gotopage(lastPage);
      });
      $page_container.find(".previous_link").click(function (e) {
        e.preventDefault();
        showPrevPage($(this));
      });
      $page_container.find(".next_link").click(function (e) {
        e.preventDefault();
        showNextPage($(this));
      });
      $page_container.find(".page_link").click(function (e) {
        e.preventDefault();
        gotopage($(this).attr("longdesc"));
      });
      gotopage(parseInt(options.start_page));
      toggleMoreLess();
      if (!options.wrap_around) {
        tagNextPrev();
      }
    });
    function showPrevPage(e) {
      new_page = parseInt(meta.data(current_page)) - 1;
      if ($(e).siblings(".active").prev(".page_link").length == true) {
        movePageNumbersRight(e, new_page);
        gotopage(new_page);
      } else {
        if (options.wrap_around) {
          gotopage(total_page_no_links - 1);
        }
      }
    }
    function showNextPage(e) {
      new_page = parseInt(meta.data(current_page)) + 1;
      if ($(e).siblings(".active").next(".page_link").length == true) {
        movePageNumbersLeft(e, new_page);
        gotopage(new_page);
      } else {
        if (options.wrap_around) {
          gotopage(0);
        }
      }
    }
    function gotopage(page_num) {
      page_num = parseInt(page_num, 10);
      var ipp = parseInt(meta.data(items_per_page));
      start_from = page_num * ipp;
      end_on = start_from + ipp;
      var items = $items.hide().slice(start_from, end_on);
      items.fadeIn(700);
      $page_container.find(options.nav_panel_id).children(".page_link[longdesc=" + page_num + "]").addClass("active " + jquery_ui_active_class).siblings(".active").removeClass("active " + jquery_ui_active_class);
      meta.data(current_page, page_num);
      var $current_page = parseInt(meta.data(current_page) + 1);
      var total_items = $item_container.children().length;
      var $number_of_pages = Math.ceil(total_items / options.items_per_page);
      $page_container.find(options.nav_info_id).html(options.nav_label_info.replace("{0}", start_from + 1).replace("{1}", start_from + items.length).replace("{2}", $items.length).replace("{3}", $current_page).replace("{4}", $number_of_pages));
      toggleMoreLess();
      tagNextPrev();
      if (typeof options.onPageDisplayed !== "undefined") {
        options.onPageDisplayed.call(this, page_num + 1);
      }
    }
    function movePageNumbersLeft(e, new_p) {
      var new_page = new_p;
      var $current_active_link = $(e).siblings(".active");
      if ($current_active_link.siblings(".page_link[longdesc=" + new_page + "]").css("display") == "none") {
        $nav_panels.each(function () {
          $(this).children(".page_link").hide().slice(parseInt(new_page - options.num_page_links_to_display + 1), new_page + 1).show();
        });
      }
    }
    function movePageNumbersRight(e, new_p) {
      var new_page = new_p;
      var $current_active_link = $(e).siblings(".active");
      if ($current_active_link.siblings(".page_link[longdesc=" + new_page + "]").css("display") == "none") {
        $nav_panels.each(function () {
          $(this).children(".page_link").hide().slice(new_page, new_page + parseInt(options.num_page_links_to_display)).show();
        });
      }
    }
    function toggleMoreLess() {}
    function tagNextPrev() {
      if ($nav_panels.children(".last").hasClass("active")) {
        $nav_panels.children(".next_link").add(".last_link").addClass("no_more " + jquery_ui_disabled_class);
      } else {
        $nav_panels.children(".next_link").add(".last_link").removeClass("no_more " + jquery_ui_disabled_class);
      }
      if ($nav_panels.children(".first").hasClass("active")) {
        $nav_panels.children(".previous_link").add(".first_link").addClass("no_more " + jquery_ui_disabled_class);
      } else {
        $nav_panels.children(".previous_link").add(".first_link").removeClass("no_more " + jquery_ui_disabled_class);
      }
    }
  };
})(jQuery);
/******/ })()
;