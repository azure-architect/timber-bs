/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/js/plugins.flickrfeed.js ***!
  \**************************************/
/*!
 * Original copyright:
 *
 * Copyright (C) 2009 Joel Sutherland
 * Licenced under the MIT license
 * http://www.newmediacampaigns.com/page/jquery-flickr-plugin
 *
 * Available tags for templates:
 * title, link, date_taken, description, published, author, author_id, tags, image*
 */
!function (a) {
  a.fn.jflickrfeed = function (b, c) {
    b = a.extend(!0, {
      flickrbase: "https://api.flickr.com/services/feeds/",
      feedapi: "photos_public.gne",
      limit: 20,
      qstrings: {
        lang: "en-us",
        format: "json",
        jsoncallback: "?"
      },
      cleanDescription: !0,
      useTemplate: !0,
      itemTemplate: "",
      itemCallback: function itemCallback() {}
    }, b);
    var d,
      e = b.flickrbase + b.feedapi + "?",
      f = !0;
    for (d in b.qstrings) f || (e += "&"), e += d + "=" + b.qstrings[d], f = !1;
    return a(this).each(function () {
      var d = a(this),
        f = this;
      a.getJSON(e, function (e) {
        a.each(e.items, function (a, c) {
          var e, g, h, i;
          if (a < b.limit) {
            if (b.cleanDescription && (e = /<p>(.*?)<\/p>/g, g = c.description, e.test(g) && (c.description = g.match(e)[2], void 0 !== c.description && (c.description = c.description.replace("<p>", "").replace("</p>", "")))), c.image_s = c.media.m.replace("_m", "_s"), c.image_t = c.media.m.replace("_m", "_t"), c.image_m = c.media.m.replace("_m", "_m"), c.image = c.media.m.replace("_m", ""), c.image_b = c.media.m.replace("_m", "_b"), c.image_q = c.media.m.replace("_m", "_q"), delete c.media, b.useTemplate) {
              i = b.itemTemplate;
              for (h in c) e = new RegExp("{{" + h + "}}", "g"), i = i.replace(e, c[h]);
              d.append(i);
            }
            b.itemCallback.call(f, c);
          }
        }), a.isFunction(c) && c.call(f, e);
      });
    });
  };
}(jQuery);
/******/ })()
;