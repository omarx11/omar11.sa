!((e, t) => {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n) ("object" == typeof exports ? exports : e)[o] = n[o];
  }
})(self, () =>
  (() => {
    var e = {
        765: (e, t, n) => {
          function o(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          n.d(t, { Z: () => r });
          var r = (() => {
            function e(t, n) {
              !((e, t) => {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.$collection = []),
                (this.selector = t),
                (this.config = n),
                (this.events = {});
            }
            var t, n;
            return (
              (t = e),
              (n = [
                {
                  key: "_fireEvent",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null;
                    Object.hasOwn(this.events, e) && this.events[e](t);
                  },
                },
                {
                  key: "_dispatch",
                  value: function (e, t) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : null,
                      o = new CustomEvent(e, {
                        detail: { payload: n },
                        bubbles: !0,
                        cancelable: !0,
                        composed: !1,
                      });
                    t.dispatchEvent(o);
                  },
                },
                {
                  key: "on",
                  value: function (e, t) {
                    this.events[e] = t;
                  },
                },
                {
                  key: "afterTransition",
                  value: (e, t) => {
                    "all 0s ease 0s" !==
                    window
                      .getComputedStyle(e, null)
                      .getPropertyValue("transition")
                      ? e.addEventListener(
                          "transitionend",
                          function n() {
                            t(), e.removeEventListener("transitionend", n, !0);
                          },
                          !0,
                        )
                      : t();
                  },
                },
                {
                  key: "getClassProperty",
                  value: function (e, t) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : "",
                      o = (
                        window.getComputedStyle(e).getPropertyValue(t) || n
                      ).replace(" ", "");
                    return o;
                  },
                },
              ]),
              n && o(t.prototype, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e
            );
          })();
        },
      },
      t = {};
    function n(o) {
      var r = t[o];
      if (void 0 !== r) return r.exports;
      var i = (t[o] = { exports: {} });
      return e[o](i, i.exports, n), i.exports;
    }
    (n.d = (e, t) => {
      for (var o in t)
        n.o(t, o) &&
          !n.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
      (n.o = (e, t) => Object.hasOwn(e, t)),
      (n.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var o = {};
    return (
      (() => {
        function e(t) {
          return (
            (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? (e) => typeof e
                : (e) =>
                    e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                      ? "symbol"
                      : typeof e),
            e(t)
          );
        }
        function t(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        function r(e, t) {
          return (
            (r = Object.setPrototypeOf || ((e, t) => ((e.__proto__ = t), e))),
            r(e, t)
          );
        }
        function i(t, n) {
          if (n && ("object" === e(n) || "function" == typeof n)) return n;
          if (void 0 !== n)
            throw new TypeError(
              "Derived constructors may only return object or undefined",
            );
          return ((e) => {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(t);
        }
        function c(e) {
          return (
            (c = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : (e) => e.__proto__ || Object.getPrototypeOf(e)),
            c(e)
          );
        }
        n.r(o);
        var a = ((e) => {
          !((e, t) => {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              t && r(e, t);
          })(u, e);
          var n,
            o,
            a,
            s,
            l =
              ((a = u),
              (s = (() => {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], () => {}),
                    ),
                    !0
                  );
                } catch (e) {
                  return !1;
                }
              })()),
              function () {
                var e,
                  t = c(a);
                if (s) {
                  var n = c(this).constructor;
                  e = Reflect.construct(t, arguments, n);
                } else e = t.apply(this, arguments);
                return i(this, e);
              });
          function u() {
            return (
              ((e, t) => {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, u),
              l.call(this, ".hs-accordion")
            );
          }
          return (
            (n = u),
            (o = [
              {
                key: "init",
                value: function () {
                  document.addEventListener("click", (t) => {
                    var n = t.target,
                      o = n.closest(this.selector),
                      r = n.closest(".hs-accordion-toggle"),
                      i = n.closest(".hs-accordion-group");
                    o && i && r && (this._hideAll(o), this.show(o));
                  });
                },
              },
              {
                key: "show",
                value: function (e) {
                  if (e.classList.contains("active")) return this.hide(e);
                  e.classList.add("active");
                  var n = e.querySelector(".hs-accordion-content");
                  (n.style.display = "block"),
                    (n.style.height = 0),
                    setTimeout(() => {
                      n.style.height = "".concat(n.scrollHeight, "px");
                    }),
                    this.afterTransition(n, () => {
                      e.classList.contains("active") &&
                        ((n.style.height = ""),
                        this._fireEvent("open", e),
                        this._dispatch("open.hs.accordion", e, e));
                    });
                },
              },
              {
                key: "hide",
                value: function (e) {
                  var n = e.querySelector(".hs-accordion-content");
                  (n.style.height = "".concat(n.scrollHeight, "px")),
                    setTimeout(() => {
                      n.style.height = 0;
                    }),
                    this.afterTransition(n, () => {
                      e.classList.contains("active") ||
                        ((n.style.display = ""),
                        this._fireEvent("hide", e),
                        this._dispatch("hide.hs.accordion", e, e));
                    }),
                    e.classList.remove("active");
                },
              },
              {
                key: "_hideAll",
                value: function (e) {
                  var n = e.closest(".hs-accordion-group");
                  n.hasAttribute("data-hs-accordion-always-open") ||
                    n.querySelectorAll(this.selector).forEach((n) => {
                      e !== n && this.hide(n);
                    });
                },
              },
            ]) && t(n.prototype, o),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            u
          );
        })(n(765).Z);
        (window.HSAccordion = new a()),
          document.addEventListener("load", window.HSAccordion.init());
      })(),
      o
    );
  })(),
);
