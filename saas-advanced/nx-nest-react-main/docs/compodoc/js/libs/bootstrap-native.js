var BSN = (function (H) {
  'use strict';
  var sc = Object.defineProperty;
  var nc = (H, j, rt) =>
    j in H ? sc(H, j, { enumerable: !0, configurable: !0, writable: !0, value: rt }) : (H[j] = rt);
  var h = (H, j, rt) => (nc(H, typeof j != 'symbol' ? j + '' : j, rt), rt);
  const j = {},
    rt = (t) => {
      const { type: e, currentTarget: s } = t;
      [...j[e]].forEach(([n, o]) => {
        s === n &&
          [...o].forEach(([i, a]) => {
            i.apply(n, [t]), typeof a == 'object' && a.once && O(n, e, i, a);
          });
      });
    },
    N = (t, e, s, n) => {
      j[e] || (j[e] = new Map());
      const o = j[e];
      o.has(t) || o.set(t, new Map());
      const i = o.get(t),
        { size: a } = i;
      i.set(s, n), a || t.addEventListener(e, rt, n);
    },
    O = (t, e, s, n) => {
      const o = j[e],
        i = o && o.get(t),
        a = i && i.get(s),
        c = a !== void 0 ? a : n;
      i && i.has(s) && i.delete(s),
        o && (!i || !i.size) && o.delete(t),
        (!o || !o.size) && delete j[e],
        (!i || !i.size) && t.removeEventListener(e, rt, c);
    },
    qo = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          addListener: N,
          globalListener: rt,
          off: O,
          on: N,
          registry: j,
          removeListener: O,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Ws = 'aria-describedby',
    He = 'aria-expanded',
    Se = 'aria-hidden',
    Pe = 'aria-modal',
    Fs = 'aria-pressed',
    Ze = 'aria-selected',
    Go = 'DOMContentLoaded',
    qe = 'focus',
    Ge = 'focusin',
    js = 'focusout',
    De = 'keydown',
    Qo = 'keyup',
    M = 'click',
    zs = 'mousedown',
    Jo = 'hover',
    Ae = 'mouseenter',
    Qe = 'mouseleave',
    ti = 'pointerdown',
    ei = 'pointermove',
    si = 'pointerup',
    xe = 'resize',
    Ie = 'scroll',
    Je = 'touchstart',
    ni = 'dragstart',
    ts = 'ArrowDown',
    es = 'ArrowUp',
    Ks = 'ArrowLeft',
    Vs = 'ArrowRight',
    ss = 'Escape',
    oi = 'transitionDuration',
    ii = 'transitionDelay',
    ns = 'transitionend',
    Xs = 'transitionProperty',
    ai = navigator.userAgentData,
    ke = ai,
    { userAgent: ci } = navigator,
    Ne = ci,
    Ys = /iPhone|iPad|iPod|Android/i;
  ke ? ke.brands.some((t) => Ys.test(t.brand)) : Ys.test(Ne);
  const Us = /(iPhone|iPod|iPad)/,
    ri = ke ? ke.brands.some((t) => Us.test(t.brand)) : Us.test(Ne);
  Ne && Ne.includes('Firefox');
  const { head: Oe } = document;
  ['webkitPerspective', 'perspective'].some((t) => t in Oe.style);
  const li = (t, e, s, n) => {
      const o = n || !1;
      t.addEventListener(e, s, o);
    },
    di = (t, e, s, n) => {
      const o = n || !1;
      t.removeEventListener(e, s, o);
    },
    hi = (t, e, s, n) => {
      const o = (i) => {
        (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), di(t, e, o, n));
      };
      li(t, e, o, n);
    },
    re = () => {};
  (() => {
    let t = !1;
    try {
      const e = Object.defineProperty({}, 'passive', { get: () => ((t = !0), t) });
      hi(document, Go, re, e);
    } catch {}
    return t;
  })(),
    ['webkitTransform', 'transform'].some((t) => t in Oe.style),
    ['webkitAnimation', 'animation'].some((t) => t in Oe.style),
    ['webkitTransition', 'transition'].some((t) => t in Oe.style);
  const mt = (t, e) => t.getAttribute(e),
    Me = (t, e) => t.hasAttribute(e),
    L = (t, e, s) => t.setAttribute(e, s),
    xt = (t, e) => t.removeAttribute(e),
    p = (t, ...e) => {
      t.classList.add(...e);
    },
    v = (t, ...e) => {
      t.classList.remove(...e);
    },
    f = (t, e) => t.classList.contains(e),
    le = (t) => (t != null && typeof t == 'object') || !1,
    I = (t) =>
      (le(t) &&
        typeof t.nodeType == 'number' &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e)) ||
      !1,
    T = (t) => (I(t) && t.nodeType === 1) || !1,
    zt = new Map(),
    It = {
      data: zt,
      set: (t, e, s) => {
        T(t) && (zt.has(e) || zt.set(e, new Map()), zt.get(e).set(t, s));
      },
      getAllFor: (t) => zt.get(t) || null,
      get: (t, e) => {
        if (!T(t) || !e) return null;
        const s = It.getAllFor(e);
        return (t && s && s.get(t)) || null;
      },
      remove: (t, e) => {
        const s = It.getAllFor(e);
        !s || !T(t) || (s.delete(t), s.size === 0 && zt.delete(e));
      },
    },
    z = (t, e) => It.get(t, e),
    de = (t) => typeof t == 'string' || !1,
    os = (t) => (le(t) && t.constructor.name === 'Window') || !1,
    _s = (t) => (I(t) && t.nodeType === 9) || !1,
    w = (t) => (os(t) ? t.document : _s(t) ? t : I(t) ? t.ownerDocument : window.document),
    lt = (t, ...e) => Object.assign(t, ...e),
    vt = (t) => {
      if (!t) return;
      if (de(t)) return w().createElement(t);
      const { tagName: e } = t,
        s = vt(e);
      if (!s) return;
      const n = { ...t };
      return delete n.tagName, lt(s, n);
    },
    b = (t, e) => t.dispatchEvent(e),
    V = (t, e) => {
      const s = getComputedStyle(t),
        n = e
          .replace('webkit', 'Webkit')
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase();
      return s.getPropertyValue(n);
    },
    fi = (t) => {
      const e = V(t, Xs),
        s = V(t, ii),
        n = s.includes('ms') ? 1 : 1e3,
        o = e && e !== 'none' ? parseFloat(s) * n : 0;
      return Number.isNaN(o) ? 0 : o;
    },
    Kt = (t) => {
      const e = V(t, Xs),
        s = V(t, oi),
        n = s.includes('ms') ? 1 : 1e3,
        o = e && e !== 'none' ? parseFloat(s) * n : 0;
      return Number.isNaN(o) ? 0 : o;
    },
    P = (t, e) => {
      let s = 0;
      const n = new Event(ns),
        o = Kt(t),
        i = fi(t);
      if (o) {
        const a = (c) => {
          c.target === t && (e.apply(t, [c]), t.removeEventListener(ns, a), (s = 1));
        };
        t.addEventListener(ns, a),
          setTimeout(() => {
            s || b(t, n);
          }, o + i + 17);
      } else e.apply(t, [n]);
    },
    dt = (t, e) => t.focus(e),
    Zs = (t) =>
      ['true', !0].includes(t)
        ? !0
        : ['false', !1].includes(t)
        ? !1
        : ['null', '', null, void 0].includes(t)
        ? null
        : t !== '' && !Number.isNaN(+t)
        ? +t
        : t,
    Le = (t) => Object.entries(t),
    Vt = (t) => t.toLowerCase(),
    pi = (t, e, s, n) => {
      const o = { ...s },
        i = { ...t.dataset },
        a = { ...e },
        c = {},
        r = 'title';
      return (
        Le(i).forEach(([l, d]) => {
          const g =
            n && typeof l == 'string' && l.includes(n)
              ? l.replace(n, '').replace(/[A-Z]/g, (C) => Vt(C))
              : l;
          c[g] = Zs(d);
        }),
        Le(o).forEach(([l, d]) => {
          o[l] = Zs(d);
        }),
        Le(e).forEach(([l, d]) => {
          l in o ? (a[l] = o[l]) : l in c ? (a[l] = c[l]) : (a[l] = l === r ? mt(t, r) : d);
        }),
        a
      );
    },
    qs = (t) => Object.keys(t),
    $ = (t, e) => {
      const s = new CustomEvent(t, { cancelable: !0, bubbles: !0 });
      return le(e) && lt(s, e), s;
    },
    et = { passive: !0 },
    kt = (t) => t.offsetHeight,
    k = (t, e) => {
      Le(e).forEach(([s, n]) => {
        if (n && de(s) && s.includes('--')) t.style.setProperty(s, n);
        else {
          const o = {};
          (o[s] = n), lt(t.style, o);
        }
      });
    },
    is = (t) => (le(t) && t.constructor.name === 'Map') || !1,
    gi = (t) => typeof t == 'number' || !1,
    bt = new Map(),
    u = {
      set: (t, e, s, n) => {
        T(t) &&
          (n && n.length
            ? (bt.has(t) || bt.set(t, new Map()), bt.get(t).set(n, setTimeout(e, s)))
            : bt.set(t, setTimeout(e, s)));
      },
      get: (t, e) => {
        if (!T(t)) return null;
        const s = bt.get(t);
        return e && s && is(s) ? s.get(e) || null : gi(s) ? s : null;
      },
      clear: (t, e) => {
        if (!T(t)) return;
        const s = bt.get(t);
        e && e.length && is(s)
          ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && bt.delete(t))
          : (clearTimeout(s), bt.delete(t));
      },
    },
    he = (t, e) => {
      const {
        width: s,
        height: n,
        top: o,
        right: i,
        bottom: a,
        left: c,
      } = t.getBoundingClientRect();
      let r = 1,
        l = 1;
      if (e && T(t)) {
        const { offsetWidth: d, offsetHeight: g } = t;
        (r = d > 0 ? Math.round(s) / d : 1), (l = g > 0 ? Math.round(n) / g : 1);
      }
      return {
        width: s / r,
        height: n / l,
        top: o / l,
        right: i / r,
        bottom: a / l,
        left: c / r,
        x: c / r,
        y: o / l,
      };
    },
    wt = (t) => w(t).body,
    ht = (t) => w(t).documentElement,
    Gs = (t) => (I(t) && t.constructor.name === 'ShadowRoot') || !1,
    ui = (t) =>
      t.nodeName === 'HTML'
        ? t
        : (T(t) && t.assignedSlot) || (I(t) && t.parentNode) || (Gs(t) && t.host) || ht(t);
  let Qs = 0,
    Js = 0;
  const Xt = new Map(),
    tn = (t, e) => {
      let s = e ? Qs : Js;
      if (e) {
        const n = tn(t),
          o = Xt.get(n) || new Map();
        Xt.has(n) || Xt.set(n, o), is(o) && !o.has(e) ? (o.set(e, s), (Qs += 1)) : (s = o.get(e));
      } else {
        const n = t.id || t;
        Xt.has(n) ? (s = Xt.get(n)) : (Xt.set(n, s), (Js += 1));
      }
      return s;
    },
    Yt = (t) => {
      var e;
      return t
        ? _s(t)
          ? t.defaultView
          : I(t)
          ? (e = t == null ? void 0 : t.ownerDocument) == null
            ? void 0
            : e.defaultView
          : t
        : window;
    },
    mi = (t) => Array.isArray(t) || !1,
    en = (t) => {
      if (!I(t)) return !1;
      const { top: e, bottom: s } = he(t),
        { clientHeight: n } = ht(t);
      return e <= n && s >= 0;
    },
    vi = (t) => typeof t == 'function' || !1,
    bi = (t) => (le(t) && t.constructor.name === 'NodeList') || !1,
    $t = (t) => ht(t).dir === 'rtl',
    wi = (t) => (I(t) && ['TABLE', 'TD', 'TH'].includes(t.nodeName)) || !1,
    B = (t, e) => (t ? t.closest(e) || B(t.getRootNode().host, e) : null),
    D = (t, e) => (T(t) ? t : (I(e) ? e : w()).querySelector(t)),
    as = (t, e) => (I(e) ? e : w()).getElementsByTagName(t),
    st = (t, e) => (I(e) ? e : w()).querySelectorAll(t),
    ft = (t, e) => (e && I(e) ? e : w()).getElementsByClassName(t),
    sn = (t, e) => t.matches(e),
    W = 'fade',
    m = 'show',
    Be = 'data-bs-dismiss',
    Re = 'alert',
    nn = 'Alert',
    $i = '5.0.6';
  class nt {
    constructor(e, s) {
      const n = D(e);
      if (!n)
        throw de(e)
          ? Error(`${this.name} Error: "${e}" is not a valid selector.`)
          : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
      const o = It.get(n, this.name);
      o && o.dispose(),
        (this.element = n),
        (this.options =
          this.defaults && qs(this.defaults).length ? pi(n, this.defaults, s || {}, 'bs') : {}),
        It.set(n, this.name, this);
    }
    get version() {
      return $i;
    }
    get name() {
      return 'BaseComponent';
    }
    get defaults() {
      return {};
    }
    dispose() {
      It.remove(this.element, this.name),
        qs(this).forEach((e) => {
          delete this[e];
        });
    }
  }
  const Ti = `.${Re}`,
    yi = `[${Be}="${Re}"]`,
    Ei = (t) => z(t, nn),
    Ci = (t) => new Ut(t),
    on = $(`close.bs.${Re}`),
    Hi = $(`closed.bs.${Re}`),
    an = (t) => {
      const { element: e } = t;
      cs(t), b(e, Hi), t.dispose(), e.remove();
    },
    cs = (t, e) => {
      const s = e ? N : O,
        { dismiss: n, close: o } = t;
      n && s(n, M, o);
    };
  class Ut extends nt {
    constructor(s) {
      super(s);
      h(this, 'dismiss');
      h(this, 'close', () => {
        const { element: s } = this;
        s &&
          f(s, m) &&
          (b(s, on), on.defaultPrevented || (v(s, m), f(s, W) ? P(s, () => an(this)) : an(this)));
      });
      (this.dismiss = D(yi, this.element)), cs(this, !0);
    }
    get name() {
      return nn;
    }
    dispose() {
      cs(this), super.dispose();
    }
  }
  h(Ut, 'selector', Ti), h(Ut, 'init', Ci), h(Ut, 'getInstance', Ei);
  const E = 'active',
    at = 'data-bs-toggle',
    Si = 'button',
    cn = 'Button',
    Pi = `[${at}="${Si}"]`,
    Di = (t) => z(t, cn),
    Ai = (t) => new _t(t),
    rn = (t, e) => {
      (e ? N : O)(t.element, M, t.toggle);
    };
  class _t extends nt {
    constructor(s) {
      super(s);
      h(this, 'isActive', !1);
      h(this, 'toggle', (s) => {
        s && s.preventDefault();
        const { element: n, isActive: o } = this;
        !f(n, 'disabled') &&
          !mt(n, 'disabled') &&
          ((o ? v : p)(n, E), L(n, Fs, o ? 'false' : 'true'), (this.isActive = f(n, E)));
      });
      const { element: n } = this;
      (this.isActive = f(n, E)), L(n, Fs, String(!!this.isActive)), rn(this, !0);
    }
    get name() {
      return cn;
    }
    dispose() {
      rn(this), super.dispose();
    }
  }
  h(_t, 'selector', Pi), h(_t, 'init', Ai), h(_t, 'getInstance', Di);
  const rs = 'data-bs-target',
    Nt = 'carousel',
    ln = 'Carousel',
    dn = 'data-bs-parent',
    xi = 'data-bs-container',
    X = (t) => {
      const e = [rs, dn, xi, 'href'],
        s = w(t);
      return e
        .map((n) => {
          const o = mt(t, n);
          return o ? (n === dn ? B(t, o) : D(o, s)) : null;
        })
        .filter((n) => n)[0];
    },
    fe = `[data-bs-ride="${Nt}"]`,
    G = `${Nt}-item`,
    ls = 'data-bs-slide-to',
    Tt = 'data-bs-slide',
    yt = 'paused',
    hn = { pause: 'hover', keyboard: !1, touch: !0, interval: 5e3 },
    pt = (t) => z(t, ln),
    Ii = (t) => new Zt(t);
  let pe = 0,
    We = 0,
    ds = 0;
  const hs = $(`slide.bs.${Nt}`),
    fs = $(`slid.bs.${Nt}`),
    fn = (t) => {
      const { index: e, direction: s, element: n, slides: o, options: i } = t;
      if (t.isAnimating) {
        const a = gs(t),
          c = s === 'left' ? 'next' : 'prev',
          r = s === 'left' ? 'start' : 'end';
        p(o[e], E),
          v(o[e], `${G}-${c}`),
          v(o[e], `${G}-${r}`),
          v(o[a], E),
          v(o[a], `${G}-${r}`),
          b(n, fs),
          u.clear(n, Tt),
          t.cycle && !w(n).hidden && i.interval && !t.isPaused && t.cycle();
      }
    };
  function ki() {
    const t = pt(this);
    t && !t.isPaused && !u.get(this, yt) && p(this, yt);
  }
  function Ni() {
    const t = pt(this);
    t && t.isPaused && !u.get(this, yt) && t.cycle();
  }
  function Oi(t) {
    t.preventDefault();
    const e = B(this, fe) || X(this),
      s = pt(e);
    if (s && !s.isAnimating) {
      const n = +(mt(this, ls) || 0);
      this && !f(this, E) && !Number.isNaN(n) && s.to(n);
    }
  }
  function Mi(t) {
    t.preventDefault();
    const e = B(this, fe) || X(this),
      s = pt(e);
    if (s && !s.isAnimating) {
      const n = mt(this, Tt);
      n === 'next' ? s.next() : n === 'prev' && s.prev();
    }
  }
  const Li = ({ code: t, target: e }) => {
    const s = w(e),
      [n] = [...st(fe, s)].filter((i) => en(i)),
      o = pt(n);
    if (o && !o.isAnimating && !/textarea|input/i.test(e.nodeName)) {
      const i = $t(n);
      t === (i ? Vs : Ks) ? o.prev() : t === (i ? Ks : Vs) && o.next();
    }
  };
  function pn(t) {
    const { target: e } = t,
      s = pt(this);
    s &&
      s.isTouch &&
      ((s.indicator && !s.indicator.contains(e)) || !s.controls.includes(e)) &&
      (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
  }
  function Bi(t) {
    const { target: e } = t,
      s = pt(this);
    if (s && !s.isAnimating && !s.isTouch) {
      const { controls: n, indicators: o } = s;
      [...n, ...o].every((i) => i === e || i.contains(e)) ||
        ((pe = t.pageX), this.contains(e) && ((s.isTouch = !0), gn(s, !0)));
    }
  }
  const Ri = (t) => {
      We = t.pageX;
    },
    Wi = (t) => {
      var o;
      const { target: e } = t,
        s = w(e),
        n = [...st(fe, s)].map((i) => pt(i)).find((i) => i.isTouch);
      if (n) {
        const { element: i, index: a } = n,
          c = $t(i);
        (ds = t.pageX),
          (n.isTouch = !1),
          gn(n),
          !((o = s.getSelection()) != null && o.toString().length) &&
            i.contains(e) &&
            Math.abs(pe - ds) > 120 &&
            (We < pe ? n.to(a + (c ? -1 : 1)) : We > pe && n.to(a + (c ? 1 : -1))),
          (pe = 0),
          (We = 0),
          (ds = 0);
      }
    },
    ps = (t, e) => {
      const { indicators: s } = t;
      [...s].forEach((n) => v(n, E)), t.indicators[e] && p(s[e], E);
    },
    gn = (t, e) => {
      const { element: s } = t,
        n = e ? N : O;
      n(w(s), ei, Ri, et), n(w(s), si, Wi, et);
    },
    un = (t, e) => {
      const { element: s, options: n, slides: o, controls: i, indicators: a } = t,
        { touch: c, pause: r, interval: l, keyboard: d } = n,
        g = e ? N : O;
      r && l && (g(s, Ae, ki), g(s, Qe, Ni)),
        c &&
          o.length > 2 &&
          (g(s, ti, Bi, et), g(s, Je, pn, { passive: !1 }), g(s, ni, pn, { passive: !1 })),
        i.length &&
          i.forEach((C) => {
            C && g(C, M, Mi);
          }),
        a.length &&
          a.forEach((C) => {
            g(C, M, Oi);
          }),
        d && g(w(s), De, Li);
    },
    gs = (t) => {
      const { slides: e, element: s } = t,
        n = D(`.${G}.${E}`, s);
      return T(n) ? [...e].indexOf(n) : -1;
    };
  class Zt extends nt {
    constructor(e, s) {
      super(e, s);
      const { element: n } = this;
      (this.direction = $t(n) ? 'right' : 'left'), (this.isTouch = !1), (this.slides = ft(G, n));
      const { slides: o } = this;
      if (o.length >= 2) {
        const i = gs(this),
          a = [...o].find((l) => sn(l, `.${G}-next,.${G}-next`));
        this.index = i;
        const c = w(n);
        (this.controls = [...st(`[${Tt}]`, n), ...st(`[${Tt}][${rs}="#${n.id}"]`, c)].filter(
          (l, d, g) => d === g.indexOf(l),
        )),
          (this.indicator = D(`.${Nt}-indicators`, n)),
          (this.indicators = [
            ...(this.indicator ? st(`[${ls}]`, this.indicator) : []),
            ...st(`[${ls}][${rs}="#${n.id}"]`, c),
          ].filter((l, d, g) => d === g.indexOf(l)));
        const { options: r } = this;
        (this.options.interval = r.interval === !0 ? hn.interval : r.interval),
          a
            ? (this.index = [...o].indexOf(a))
            : i < 0 && ((this.index = 0), p(o[0], E), this.indicators.length && ps(this, 0)),
          this.indicators.length && ps(this, this.index),
          un(this, !0),
          r.interval && this.cycle();
      }
    }
    get name() {
      return ln;
    }
    get defaults() {
      return hn;
    }
    get isPaused() {
      return f(this.element, yt);
    }
    get isAnimating() {
      return D(`.${G}-next,.${G}-prev`, this.element) !== null;
    }
    cycle() {
      const { element: e, options: s, isPaused: n, index: o } = this;
      u.clear(e, Nt),
        n && (u.clear(e, yt), v(e, yt)),
        u.set(
          e,
          () => {
            this.element && !this.isPaused && !this.isTouch && en(e) && this.to(o + 1);
          },
          s.interval,
          Nt,
        );
    }
    pause() {
      const { element: e, options: s } = this;
      !this.isPaused && s.interval && (p(e, yt), u.set(e, () => {}, 1, yt));
    }
    next() {
      this.isAnimating || this.to(this.index + 1);
    }
    prev() {
      this.isAnimating || this.to(this.index - 1);
    }
    to(e) {
      const { element: s, slides: n, options: o } = this,
        i = gs(this),
        a = $t(s);
      let c = e;
      if (!this.isAnimating && i !== c && !u.get(s, Tt)) {
        i < c || (i === 0 && c === n.length - 1)
          ? (this.direction = a ? 'right' : 'left')
          : (i > c || (i === n.length - 1 && c === 0)) && (this.direction = a ? 'left' : 'right');
        const { direction: r } = this;
        c < 0 ? (c = n.length - 1) : c >= n.length && (c = 0);
        const l = r === 'left' ? 'next' : 'prev',
          d = r === 'left' ? 'start' : 'end',
          g = { relatedTarget: n[c], from: i, to: c, direction: r };
        lt(hs, g),
          lt(fs, g),
          b(s, hs),
          hs.defaultPrevented ||
            ((this.index = c),
            ps(this, c),
            Kt(n[c]) && f(s, 'slide')
              ? u.set(
                  s,
                  () => {
                    p(n[c], `${G}-${l}`),
                      kt(n[c]),
                      p(n[c], `${G}-${d}`),
                      p(n[i], `${G}-${d}`),
                      P(n[c], () => this.slides && this.slides.length && fn(this));
                  },
                  0,
                  Tt,
                )
              : (p(n[c], E),
                v(n[i], E),
                u.set(
                  s,
                  () => {
                    u.clear(s, Tt), s && o.interval && !this.isPaused && this.cycle(), b(s, fs);
                  },
                  0,
                  Tt,
                )));
      }
    }
    dispose() {
      const { isAnimating: e } = this,
        s = { ...this, isAnimating: e };
      un(s),
        super.dispose(),
        s.isAnimating &&
          P(s.slides[s.index], () => {
            fn(s);
          });
    }
  }
  h(Zt, 'selector', fe), h(Zt, 'init', Ii), h(Zt, 'getInstance', pt);
  const Ot = 'collapsing',
    Y = 'collapse',
    mn = 'Collapse',
    Fi = `.${Y}`,
    vn = `[${at}="${Y}"]`,
    ji = { parent: null },
    Fe = (t) => z(t, mn),
    zi = (t) => new qt(t),
    bn = $(`show.bs.${Y}`),
    Ki = $(`shown.bs.${Y}`),
    wn = $(`hide.bs.${Y}`),
    Vi = $(`hidden.bs.${Y}`),
    Xi = (t) => {
      const { element: e, parent: s, triggers: n } = t;
      b(e, bn),
        bn.defaultPrevented ||
          (u.set(e, re, 17),
          s && u.set(s, re, 17),
          p(e, Ot),
          v(e, Y),
          k(e, { height: `${e.scrollHeight}px` }),
          P(e, () => {
            u.clear(e),
              s && u.clear(s),
              n.forEach((o) => L(o, He, 'true')),
              v(e, Ot),
              p(e, Y),
              p(e, m),
              k(e, { height: '' }),
              b(e, Ki);
          }));
    },
    $n = (t) => {
      const { element: e, parent: s, triggers: n } = t;
      b(e, wn),
        wn.defaultPrevented ||
          (u.set(e, re, 17),
          s && u.set(s, re, 17),
          k(e, { height: `${e.scrollHeight}px` }),
          v(e, Y),
          v(e, m),
          p(e, Ot),
          kt(e),
          k(e, { height: '0px' }),
          P(e, () => {
            u.clear(e),
              s && u.clear(s),
              n.forEach((o) => L(o, He, 'false')),
              v(e, Ot),
              p(e, Y),
              k(e, { height: '' }),
              b(e, Vi);
          }));
    },
    Tn = (t, e) => {
      const s = e ? N : O,
        { triggers: n } = t;
      n.length && n.forEach((o) => s(o, M, Yi));
    },
    Yi = (t) => {
      const { target: e } = t,
        s = e && B(e, vn),
        n = s && X(s),
        o = n && Fe(n);
      o && o.toggle(), s && s.tagName === 'A' && t.preventDefault();
    };
  class qt extends nt {
    constructor(e, s) {
      super(e, s);
      const { element: n, options: o } = this,
        i = w(n);
      (this.triggers = [...st(vn, i)].filter((a) => X(a) === n)),
        (this.parent = T(o.parent) ? o.parent : de(o.parent) ? X(n) || D(o.parent, i) : null),
        Tn(this, !0);
    }
    get name() {
      return mn;
    }
    get defaults() {
      return ji;
    }
    toggle() {
      f(this.element, m) ? this.hide() : this.show();
    }
    hide() {
      const { triggers: e, element: s } = this;
      u.get(s) || ($n(this), e.length && e.forEach((n) => p(n, `${Y}d`)));
    }
    show() {
      const { element: e, parent: s, triggers: n } = this;
      let o, i;
      s && ((o = [...st(`.${Y}.${m}`, s)].find((a) => Fe(a))), (i = o && Fe(o))),
        (!s || !u.get(s)) &&
          !u.get(e) &&
          (i &&
            o !== e &&
            ($n(i),
            i.triggers.forEach((a) => {
              p(a, `${Y}d`);
            })),
          Xi(this),
          n.length && n.forEach((a) => v(a, `${Y}d`)));
    }
    dispose() {
      Tn(this), super.dispose();
    }
  }
  h(qt, 'selector', Fi), h(qt, 'init', zi), h(qt, 'getInstance', Fe);
  const Mt = ['dropdown', 'dropup', 'dropstart', 'dropend'],
    yn = 'Dropdown',
    En = 'dropdown-menu',
    Cn = (t) => {
      const e = B(t, 'A');
      return (
        (t.tagName === 'A' && Me(t, 'href') && t.href.slice(-1) === '#') ||
        (e && Me(e, 'href') && e.href.slice(-1) === '#')
      );
    },
    [ot, us, ms, vs] = Mt,
    Hn = `[${at}="${ot}"]`,
    Gt = (t) => z(t, yn),
    Ui = (t) => new Qt(t),
    _i = `${En}-end`,
    Sn = [ot, us],
    Pn = [ms, vs],
    Dn = ['A', 'BUTTON'],
    Zi = { offset: 5, display: 'dynamic' },
    bs = $(`show.bs.${ot}`),
    An = $(`shown.bs.${ot}`),
    ws = $(`hide.bs.${ot}`),
    xn = $(`hidden.bs.${ot}`),
    In = $(`updated.bs.${ot}`),
    kn = (t) => {
      const { element: e, menu: s, parentElement: n, options: o } = t,
        { offset: i } = o;
      if (V(s, 'position') !== 'static') {
        const a = $t(e),
          c = f(s, _i);
        ['margin', 'top', 'bottom', 'left', 'right'].forEach((R) => {
          const Pt = {};
          (Pt[R] = ''), k(s, Pt);
        });
        let l = Mt.find((R) => f(n, R)) || ot;
        const d = {
            dropdown: [i, 0, 0],
            dropup: [0, 0, i],
            dropstart: a ? [-1, 0, 0, i] : [-1, i, 0],
            dropend: a ? [-1, i, 0] : [-1, 0, 0, i],
          },
          g = {
            dropdown: { top: '100%' },
            dropup: { top: 'auto', bottom: '100%' },
            dropstart: a ? { left: '100%', right: 'auto' } : { left: 'auto', right: '100%' },
            dropend: a ? { left: 'auto', right: '100%' } : { left: '100%', right: 'auto' },
            menuStart: a ? { right: '0', left: 'auto' } : { right: 'auto', left: '0' },
            menuEnd: a ? { right: 'auto', left: '0' } : { right: '0', left: 'auto' },
          },
          { offsetWidth: C, offsetHeight: F } = s,
          { clientWidth: tt, clientHeight: y } = ht(e),
          { left: U, top: q, width: ie, height: ut } = he(e),
          S = U - C - i < 0,
          it = U + C + ie + i >= tt,
          ct = q + F + i >= y,
          K = q + F + ut + i >= y,
          _ = q - F - i < 0,
          x = ((!a && c) || (a && !c)) && U + ie - C < 0,
          ae = ((a && c) || (!a && !c)) && U + C >= tt;
        if (
          (Pn.includes(l) && S && it && (l = ot),
          l === ms && (a ? it : S) && (l = vs),
          l === vs && (a ? S : it) && (l = ms),
          l === us && _ && !K && (l = ot),
          l === ot && K && !_ && (l = us),
          Pn.includes(l) && ct && lt(g[l], { top: 'auto', bottom: 0 }),
          Sn.includes(l) && (x || ae))
        ) {
          let R = { left: 'auto', right: 'auto' };
          !x && ae && !a && (R = { left: 'auto', right: 0 }),
            x && !ae && a && (R = { left: 0, right: 'auto' }),
            R && lt(g[l], R);
        }
        const St = d[l];
        k(s, { ...g[l], margin: `${St.map((R) => R && `${R}px`).join(' ')}` }),
          Sn.includes(l) && c && c && k(s, g[(!a && x) || (a && ae) ? 'menuStart' : 'menuEnd']),
          b(n, In);
      }
    },
    qi = (t) =>
      [...t.children]
        .map((e) => {
          if (e && Dn.includes(e.tagName)) return e;
          const { firstElementChild: s } = e;
          return s && Dn.includes(s.tagName) ? s : null;
        })
        .filter((e) => e),
    Nn = (t) => {
      const { element: e, options: s } = t,
        n = t.open ? N : O,
        o = w(e);
      n(o, M, Mn),
        n(o, qe, Mn),
        n(o, De, Qi),
        n(o, Qo, Ji),
        s.display === 'dynamic' &&
          [Ie, xe].forEach((i) => {
            n(Yt(e), i, ta, et);
          });
    },
    On = (t, e) => {
      (e ? N : O)(t.element, M, Gi);
    },
    je = (t) => {
      const e = [...Mt, 'btn-group', 'input-group']
        .map((s) => ft(`${s} ${m}`, w(t)))
        .find((s) => s.length);
      if (e && e.length) return [...e[0].children].find((s) => Mt.some((n) => n === mt(s, at)));
    },
    Mn = (t) => {
      const { target: e, type: s } = t;
      if (e && T(e)) {
        const n = je(e),
          o = n && Gt(n);
        if (o) {
          const { parentElement: i, menu: a } = o,
            c = i && i.contains(e) && (e.tagName === 'form' || B(e, 'form') !== null);
          [M, zs].includes(s) && Cn(e) && t.preventDefault(),
            !c && s !== qe && e !== n && e !== a && o.hide();
        }
      }
    },
    Gi = (t) => {
      const { target: e } = t,
        s = e && B(e, Hn),
        n = s && Gt(s);
      n && (t.stopPropagation(), n.toggle(), s && Cn(s) && t.preventDefault());
    },
    Qi = (t) => {
      [ts, es].includes(t.code) && t.preventDefault();
    };
  function Ji(t) {
    const { code: e } = t,
      s = je(this),
      n = s && Gt(s),
      { activeElement: o } = s && w(s);
    if (n && o) {
      const { menu: i, open: a } = n,
        c = qi(i);
      if (c && c.length && [ts, es].includes(e)) {
        let r = c.indexOf(o);
        o === s
          ? (r = 0)
          : e === es
          ? (r = r > 1 ? r - 1 : 0)
          : e === ts && (r = r < c.length - 1 ? r + 1 : r),
          c[r] && dt(c[r]);
      }
      ss === e && a && (n.toggle(), dt(s));
    }
  }
  function ta() {
    const t = je(this),
      e = t && Gt(t);
    e && e.open && kn(e);
  }
  class Qt extends nt {
    constructor(e, s) {
      super(e, s);
      const { parentElement: n } = this.element,
        [o] = ft(En, n);
      o && ((this.parentElement = n), (this.menu = o), On(this, !0));
    }
    get name() {
      return yn;
    }
    get defaults() {
      return Zi;
    }
    toggle() {
      this.open ? this.hide() : this.show();
    }
    show() {
      const { element: e, open: s, menu: n, parentElement: o } = this;
      if (!s) {
        const i = je(e),
          a = i && Gt(i);
        a && a.hide(),
          [bs, An, In].forEach((c) => {
            c.relatedTarget = e;
          }),
          b(o, bs),
          bs.defaultPrevented ||
            (p(n, m),
            p(o, m),
            L(e, He, 'true'),
            kn(this),
            (this.open = !s),
            dt(e),
            Nn(this),
            b(o, An));
      }
    }
    hide() {
      const { element: e, open: s, menu: n, parentElement: o } = this;
      s &&
        ([ws, xn].forEach((i) => {
          i.relatedTarget = e;
        }),
        b(o, ws),
        ws.defaultPrevented ||
          (v(n, m), v(o, m), L(e, He, 'false'), (this.open = !s), Nn(this), b(o, xn)));
    }
    dispose() {
      this.open && this.hide(), On(this), super.dispose();
    }
  }
  h(Qt, 'selector', Hn), h(Qt, 'init', Ui), h(Qt, 'getInstance', Gt);
  const Z = 'modal',
    $s = 'Modal',
    Ts = 'Offcanvas',
    ea = 'fixed-top',
    sa = 'fixed-bottom',
    Ln = 'sticky-top',
    Bn = 'position-sticky',
    Rn = (t) => [...ft(ea, t), ...ft(sa, t), ...ft(Ln, t), ...ft(Bn, t), ...ft('is-fixed', t)],
    na = (t) => {
      const e = wt(t);
      k(e, { paddingRight: '', overflow: '' });
      const s = Rn(e);
      s.length &&
        s.forEach((n) => {
          k(n, { paddingRight: '', marginRight: '' });
        });
    },
    Wn = (t) => {
      const { clientWidth: e } = ht(t),
        { innerWidth: s } = Yt(t);
      return Math.abs(s - e);
    },
    Fn = (t, e) => {
      const s = wt(t),
        n = parseInt(V(s, 'paddingRight'), 10),
        i = V(s, 'overflow') === 'hidden' && n ? 0 : Wn(t),
        a = Rn(s);
      e &&
        (k(s, { overflow: 'hidden', paddingRight: `${n + i}px` }),
        a.length &&
          a.forEach((c) => {
            const r = V(c, 'paddingRight');
            if (
              ((c.style.paddingRight = `${parseInt(r, 10) + i}px`), [Ln, Bn].some((l) => f(c, l)))
            ) {
              const l = V(c, 'marginRight');
              c.style.marginRight = `${parseInt(l, 10) - i}px`;
            }
          }));
    },
    Q = 'offcanvas',
    Et = vt({ tagName: 'div', className: 'popup-container' }),
    jn = (t, e) => {
      const s = I(e) && e.nodeName === 'BODY',
        n = I(e) && !s ? e : Et,
        o = s ? e : wt(t);
      I(t) && (n === Et && o.append(Et), n.append(t));
    },
    zn = (t, e) => {
      const s = I(e) && e.nodeName === 'BODY',
        n = I(e) && !s ? e : Et;
      I(t) && (t.remove(), n === Et && !Et.children.length && Et.remove());
    },
    ys = (t, e) => {
      const s = I(e) && e.nodeName !== 'BODY' ? e : Et;
      return I(t) && s.contains(t);
    },
    Kn = 'backdrop',
    Vn = `${Z}-${Kn}`,
    Xn = `${Q}-${Kn}`,
    Yn = `.${Z}.${m}`,
    Es = `.${Q}.${m}`,
    A = vt('div'),
    Lt = (t) => D(`${Yn},${Es}`, w(t)),
    Cs = (t) => {
      const e = t ? Vn : Xn;
      [Vn, Xn].forEach((s) => {
        v(A, s);
      }),
        p(A, e);
    },
    Un = (t, e, s) => {
      Cs(s), jn(A, wt(t)), e && p(A, W);
    },
    _n = () => {
      f(A, m) || (p(A, m), kt(A));
    },
    ze = () => {
      v(A, m);
    },
    Zn = (t) => {
      Lt(t) || (v(A, W), zn(A, wt(t)), na(t));
    },
    qn = (t) => T(t) && V(t, 'visibility') !== 'hidden' && t.offsetParent !== null,
    oa = `.${Z}`,
    Gn = `[${at}="${Z}"]`,
    ia = `[${Be}="${Z}"]`,
    Qn = `${Z}-static`,
    aa = { backdrop: !0, keyboard: !0 },
    ge = (t) => z(t, $s),
    ca = (t) => new Jt(t),
    Ke = $(`show.bs.${Z}`),
    Jn = $(`shown.bs.${Z}`),
    Hs = $(`hide.bs.${Z}`),
    to = $(`hidden.bs.${Z}`),
    eo = (t) => {
      const { element: e } = t,
        s = Wn(e),
        { clientHeight: n, scrollHeight: o } = ht(e),
        { clientHeight: i, scrollHeight: a } = e,
        c = i !== a;
      if (!c && s) {
        const r = $t(e) ? 'paddingLeft' : 'paddingRight',
          l = {};
        (l[r] = `${s}px`), k(e, l);
      }
      Fn(e, c || n !== o);
    },
    so = (t, e) => {
      const s = e ? N : O,
        { element: n, update: o } = t;
      s(n, M, da), s(Yt(n), xe, o, et), s(w(n), De, la);
    },
    no = (t, e) => {
      const s = e ? N : O,
        { triggers: n } = t;
      n.length && n.forEach((o) => s(o, M, ra));
    },
    oo = (t) => {
      const { triggers: e, element: s, relatedTarget: n } = t;
      Zn(s), k(s, { paddingRight: '', display: '' }), so(t);
      const o = Ke.relatedTarget || e.find(qn);
      o && dt(o), (to.relatedTarget = n), b(s, to);
    },
    io = (t) => {
      const { element: e, relatedTarget: s } = t;
      dt(e), so(t, !0), (Jn.relatedTarget = s), b(e, Jn);
    },
    ao = (t) => {
      const { element: e, hasFade: s } = t;
      k(e, { display: 'block' }),
        eo(t),
        Lt(e) || k(wt(e), { overflow: 'hidden' }),
        p(e, m),
        xt(e, Se),
        L(e, Pe, 'true'),
        s ? P(e, () => io(t)) : io(t);
    },
    co = (t) => {
      const { element: e, options: s, hasFade: n } = t;
      s.backdrop && n && f(A, m) && !Lt(e) ? (ze(), P(A, () => oo(t))) : oo(t);
    },
    ra = (t) => {
      const { target: e } = t,
        s = e && B(e, Gn),
        n = s && X(s),
        o = n && ge(n);
      o && (s && s.tagName === 'A' && t.preventDefault(), (o.relatedTarget = s), o.toggle());
    },
    la = ({ code: t, target: e }) => {
      const s = D(Yn, w(e)),
        n = s && ge(s);
      if (n) {
        const { options: o } = n;
        o.keyboard && t === ss && f(s, m) && ((n.relatedTarget = null), n.hide());
      }
    };
  function da(t) {
    var s, n;
    const e = ge(this);
    if (e && !u.get(this)) {
      const { options: o, isStatic: i, modalDialog: a } = e,
        { backdrop: c } = o,
        { target: r } = t,
        l =
          (n = (s = w(this)) == null ? void 0 : s.getSelection()) == null
            ? void 0
            : n.toString().length,
        d = a.contains(r),
        g = r && B(r, ia);
      i && !d
        ? u.set(
            this,
            () => {
              p(this, Qn), P(a, () => ha(e));
            },
            17,
          )
        : (g || (!l && !i && !d && c)) &&
          ((e.relatedTarget = g || null), e.hide(), t.preventDefault());
    }
  }
  const ha = (t) => {
    const { element: e, modalDialog: s } = t,
      n = (Kt(s) || 0) + 17;
    v(e, Qn), u.set(e, () => u.clear(e), n);
  };
  class Jt extends nt {
    constructor(s, n) {
      super(s, n);
      h(this, 'update', () => {
        f(this.element, m) && eo(this);
      });
      const { element: o } = this,
        i = D(`.${Z}-dialog`, o);
      i &&
        ((this.modalDialog = i),
        (this.triggers = [...st(Gn, w(o))].filter((a) => X(a) === o)),
        (this.isStatic = this.options.backdrop === 'static'),
        (this.hasFade = f(o, W)),
        (this.relatedTarget = null),
        no(this, !0));
    }
    get name() {
      return $s;
    }
    get defaults() {
      return aa;
    }
    toggle() {
      f(this.element, m) ? this.hide() : this.show();
    }
    show() {
      const { element: s, options: n, hasFade: o, relatedTarget: i } = this,
        { backdrop: a } = n;
      let c = 0;
      if (!f(s, m) && ((Ke.relatedTarget = i || void 0), b(s, Ke), !Ke.defaultPrevented)) {
        const r = Lt(s);
        if (r && r !== s) {
          const l = ge(r) || z(r, Ts);
          l && l.hide();
        }
        a
          ? (ys(A) ? Cs(!0) : Un(s, o, !0), (c = Kt(A)), _n(), setTimeout(() => ao(this), c))
          : (ao(this), r && f(A, m) && ze());
      }
    }
    hide() {
      const { element: s, hasFade: n, relatedTarget: o } = this;
      f(s, m) &&
        ((Hs.relatedTarget = o || void 0),
        b(s, Hs),
        Hs.defaultPrevented ||
          (v(s, m), L(s, Se, 'true'), xt(s, Pe), n ? P(s, () => co(this)) : co(this)));
    }
    dispose() {
      const s = { ...this },
        { element: n, modalDialog: o } = s,
        i = () => setTimeout(() => super.dispose(), 17);
      no(s), this.hide(), f(n, 'fade') ? P(o, i) : i();
    }
  }
  h(Jt, 'selector', oa), h(Jt, 'init', ca), h(Jt, 'getInstance', ge);
  const fa = `.${Q}`,
    Ss = `[${at}="${Q}"]`,
    pa = `[${Be}="${Q}"]`,
    Ve = `${Q}-toggling`,
    ga = { backdrop: !0, keyboard: !0, scroll: !1 },
    ue = (t) => z(t, Ts),
    ua = (t) => new te(t),
    Xe = $(`show.bs.${Q}`),
    ro = $(`shown.bs.${Q}`),
    Ps = $(`hide.bs.${Q}`),
    lo = $(`hidden.bs.${Q}`),
    ma = (t) => {
      const { element: e } = t,
        { clientHeight: s, scrollHeight: n } = ht(e);
      Fn(e, s !== n);
    },
    ho = (t, e) => {
      const s = e ? N : O;
      t.triggers.forEach((n) => s(n, M, ba));
    },
    fo = (t, e) => {
      const s = e ? N : O,
        n = w(t.element);
      s(n, De, $a), s(n, M, wa);
    },
    po = (t) => {
      const { element: e, options: s } = t;
      s.scroll || (ma(t), k(wt(e), { overflow: 'hidden' })),
        p(e, Ve),
        p(e, m),
        k(e, { visibility: 'visible' }),
        P(e, () => Ta(t));
    },
    va = (t) => {
      const { element: e, options: s } = t,
        n = Lt(e);
      e.blur(), !n && s.backdrop && f(A, m) ? (ze(), P(A, () => go(t))) : go(t);
    },
    ba = (t) => {
      const e = B(t.target, Ss),
        s = e && X(e),
        n = s && ue(s);
      n && ((n.relatedTarget = e), n.toggle(), e && e.tagName === 'A' && t.preventDefault());
    },
    wa = (t) => {
      const { target: e } = t,
        s = D(Es, w(e)),
        n = D(pa, s),
        o = s && ue(s);
      if (o) {
        const { options: i, triggers: a } = o,
          { backdrop: c } = i,
          r = B(e, Ss),
          l = w(s).getSelection();
        (!A.contains(e) || c !== 'static') &&
          (!(l && l.toString().length) &&
            ((!s.contains(e) && c && (!r || a.includes(e))) || (n && n.contains(e))) &&
            ((o.relatedTarget = n && n.contains(e) ? n : null), o.hide()),
          r && r.tagName === 'A' && t.preventDefault());
      }
    },
    $a = ({ code: t, target: e }) => {
      const s = D(Es, w(e)),
        n = s && ue(s);
      n && n.options.keyboard && t === ss && ((n.relatedTarget = null), n.hide());
    },
    Ta = (t) => {
      const { element: e } = t;
      v(e, Ve), xt(e, Se), L(e, Pe, 'true'), L(e, 'role', 'dialog'), b(e, ro), fo(t, !0), dt(e);
    },
    go = (t) => {
      const { element: e, triggers: s } = t;
      L(e, Se, 'true'), xt(e, Pe), xt(e, 'role'), k(e, { visibility: '' });
      const n = Xe.relatedTarget || s.find(qn);
      n && dt(n), Zn(e), b(e, lo), v(e, Ve), Lt(e) || fo(t);
    };
  class te extends nt {
    constructor(e, s) {
      super(e, s);
      const { element: n } = this;
      (this.triggers = [...st(Ss, w(n))].filter((o) => X(o) === n)),
        (this.relatedTarget = null),
        ho(this, !0);
    }
    get name() {
      return Ts;
    }
    get defaults() {
      return ga;
    }
    toggle() {
      f(this.element, m) ? this.hide() : this.show();
    }
    show() {
      const { element: e, options: s, relatedTarget: n } = this;
      let o = 0;
      if (
        !f(e, m) &&
        ((Xe.relatedTarget = n || void 0),
        (ro.relatedTarget = n || void 0),
        b(e, Xe),
        !Xe.defaultPrevented)
      ) {
        const i = Lt(e);
        if (i && i !== e) {
          const a = ue(i) || z(i, $s);
          a && a.hide();
        }
        s.backdrop
          ? (ys(A) ? Cs() : Un(e, !0), (o = Kt(A)), _n(), setTimeout(() => po(this), o))
          : (po(this), i && f(A, m) && ze());
      }
    }
    hide() {
      const { element: e, relatedTarget: s } = this;
      f(e, m) &&
        ((Ps.relatedTarget = s || void 0),
        (lo.relatedTarget = s || void 0),
        b(e, Ps),
        Ps.defaultPrevented || (p(e, Ve), v(e, m), va(this)));
    }
    dispose() {
      const e = { ...this },
        { element: s, options: n } = e,
        o = n.backdrop ? Kt(A) : 0,
        i = () => setTimeout(() => super.dispose(), o + 17);
      ho(e), this.hide(), f(s, m) ? P(s, i) : i();
    }
  }
  h(te, 'selector', fa), h(te, 'init', ua), h(te, 'getInstance', ue);
  const Bt = 'popover',
    Ye = 'Popover',
    gt = 'tooltip',
    uo = (t) => {
      const e = t === gt,
        s = e ? `${t}-inner` : `${t}-body`,
        n = e ? '' : `<h3 class="${t}-header"></h3>`,
        o = `<div class="${t}-arrow"></div>`,
        i = `<div class="${s}"></div>`;
      return `<div class="${t}" role="${gt}">${n + o + i}</div>`;
    },
    mo = { top: 'top', bottom: 'bottom', left: 'start', right: 'end' },
    Ds = (t) => {
      const e = /\b(top|bottom|start|end)+/,
        { element: s, tooltip: n, container: o, options: i, arrow: a } = t;
      if (n) {
        const c = { ...mo },
          r = $t(s);
        k(n, { top: '', left: '', right: '', bottom: '' });
        const l = t.name === Ye,
          { offsetWidth: d, offsetHeight: g } = n,
          { clientWidth: C, clientHeight: F, offsetWidth: tt } = ht(s);
        let { placement: y } = i;
        const { clientWidth: U, offsetWidth: q } = o,
          ut = V(o, 'position') === 'fixed',
          S = Math.abs(ut ? U - q : C - tt),
          it = r && ut ? S : 0,
          ct = C - (r ? 0 : S) - 1,
          { width: K, height: _, left: x, right: ae, top: St } = he(s, !0),
          { x: R, y: Pt } = { x, y: St };
        k(a, { top: '', left: '', right: '', bottom: '' });
        let Ft = 0,
          $e = '',
          Dt = 0,
          Ms = '',
          ce = '',
          Ue = '',
          Ls = '';
        const jt = a.offsetWidth || 0,
          At = a.offsetHeight || 0,
          Bs = jt / 2;
        let Te = St - g - At < 0,
          ye = St + g + _ + At >= F,
          Ee = x - d - jt < it,
          Ce = x + d + K + jt >= ct;
        const _e = ['left', 'right'],
          Rs = ['top', 'bottom'];
        (Te = _e.includes(y) ? St + _ / 2 - g / 2 - At < 0 : Te),
          (ye = _e.includes(y) ? St + g / 2 + _ / 2 + At >= F : ye),
          (Ee = Rs.includes(y) ? x + K / 2 - d / 2 < it : Ee),
          (Ce = Rs.includes(y) ? x + d / 2 + K / 2 >= ct : Ce),
          (y = _e.includes(y) && Ee && Ce ? 'top' : y),
          (y = y === 'top' && Te ? 'bottom' : y),
          (y = y === 'bottom' && ye ? 'top' : y),
          (y = y === 'left' && Ee ? 'right' : y),
          (y = y === 'right' && Ce ? 'left' : y),
          n.className.includes(y) || (n.className = n.className.replace(e, c[y])),
          _e.includes(y)
            ? (y === 'left' ? (Dt = R - d - (l ? jt : 0)) : (Dt = R + K + (l ? jt : 0)),
              Te && ye
                ? ((Ft = 0), ($e = 0), (ce = St + _ / 2 - At / 2))
                : Te
                ? ((Ft = Pt), ($e = ''), (ce = _ / 2 - jt))
                : ye
                ? ((Ft = Pt - g + _), ($e = ''), (ce = g - _ / 2 - jt))
                : ((Ft = Pt - g / 2 + _ / 2), (ce = g / 2 - At / 2)))
            : Rs.includes(y) &&
              (y === 'top' ? (Ft = Pt - g - (l ? At : 0)) : (Ft = Pt + _ + (l ? At : 0)),
              Ee
                ? ((Dt = 0), (Ue = R + K / 2 - Bs))
                : Ce
                ? ((Dt = 'auto'), (Ms = 0), (Ls = K / 2 + ct - ae - Bs))
                : ((Dt = R - d / 2 + K / 2), (Ue = d / 2 - Bs))),
          k(n, {
            top: `${Ft}px`,
            bottom: $e === '' ? '' : `${$e}px`,
            left: Dt === 'auto' ? Dt : `${Dt}px`,
            right: Ms !== '' ? `${Ms}px` : '',
          }),
          T(a) &&
            (ce !== '' && (a.style.top = `${ce}px`),
            Ue !== '' ? (a.style.left = `${Ue}px`) : Ls !== '' && (a.style.right = `${Ls}px`));
        const ec = $(`updated.bs.${Vt(t.name)}`);
        b(s, ec);
      }
    },
    As = {
      template: uo(gt),
      title: '',
      customClass: '',
      trigger: 'hover focus',
      placement: 'top',
      sanitizeFn: void 0,
      animation: !0,
      delay: 200,
      container: document.body,
      content: '',
      dismissible: !1,
      btnClose: '',
    },
    vo = 'data-original-title',
    Rt = 'Tooltip',
    Ct = (t, e, s) => {
      if (de(e) && e.length) {
        let n = e.trim();
        vi(s) && (n = s(n));
        const i = new DOMParser().parseFromString(n, 'text/html');
        t.append(...i.body.childNodes);
      } else T(e) ? t.append(e) : (bi(e) || (mi(e) && e.every(I))) && t.append(...e);
    },
    ya = (t) => {
      const e = t.name === Rt,
        { id: s, element: n, options: o } = t,
        {
          title: i,
          placement: a,
          template: c,
          animation: r,
          customClass: l,
          sanitizeFn: d,
          dismissible: g,
          content: C,
          btnClose: F,
        } = o,
        tt = e ? gt : Bt,
        y = { ...mo };
      let U = [],
        q = [];
      $t(n) && ((y.left = 'end'), (y.right = 'start'));
      const ie = `bs-${tt}-${y[a]}`;
      let ut;
      if (T(c)) ut = c;
      else {
        const it = vt('div');
        Ct(it, c, d), (ut = it.firstChild);
      }
      t.tooltip = T(ut) ? ut.cloneNode(!0) : void 0;
      const { tooltip: S } = t;
      if (S) {
        L(S, 'id', s), L(S, 'role', gt);
        const it = e ? `${gt}-inner` : `${Bt}-body`,
          ct = e ? null : D(`.${Bt}-header`, S),
          K = D(`.${it}`, S);
        t.arrow = D(`.${tt}-arrow`, S);
        const { arrow: _ } = t;
        if (T(i)) U = [i.cloneNode(!0)];
        else {
          const x = vt('div');
          Ct(x, i, d), (U = [...x.childNodes]);
        }
        if (T(C)) q = [C.cloneNode(!0)];
        else {
          const x = vt('div');
          Ct(x, C, d), (q = [...x.childNodes]);
        }
        if (g)
          if (i)
            if (T(F)) U = [...U, F.cloneNode(!0)];
            else {
              const x = vt('div');
              Ct(x, F, d), (U = [...U, x.firstChild]);
            }
          else if ((ct && ct.remove(), T(F))) q = [...q, F.cloneNode(!0)];
          else {
            const x = vt('div');
            Ct(x, F, d), (q = [...q, x.firstChild]);
          }
        e
          ? i && K && Ct(K, i, d)
          : (i && ct && Ct(ct, U, d),
            C && K && Ct(K, q, d),
            (t.btn = D('.btn-close', S) || void 0)),
          p(S, 'position-fixed'),
          p(_, 'position-absolute'),
          f(S, tt) || p(S, tt),
          r && !f(S, W) && p(S, W),
          l && !f(S, l) && p(S, l),
          f(S, ie) || p(S, ie);
      }
    },
    Ea = (t) => {
      const e = ['HTML', 'BODY'],
        s = [];
      let { parentNode: n } = t;
      for (; n && !e.includes(n.nodeName); ) (n = ui(n)), Gs(n) || wi(n) || s.push(n);
      return (
        s.find((o, i) =>
          V(o, 'position') !== 'relative' &&
          s.slice(i + 1).every((a) => V(a, 'position') === 'static')
            ? o
            : null,
        ) || w(t).body
      );
    },
    Ca = `[${at}="${gt}"],[data-tip="${gt}"]`,
    bo = 'title';
  let wo = (t) => z(t, Rt);
  const Ha = (t) => new Ht(t),
    Sa = (t) => {
      const { element: e, tooltip: s, container: n, offsetParent: o } = t;
      xt(e, Ws), zn(s, n === o ? n : o);
    },
    me = (t) => {
      const { tooltip: e, container: s, offsetParent: n } = t;
      return e && ys(e, s === n ? s : n);
    },
    Pa = (t, e) => {
      const { element: s } = t;
      ve(t), Me(s, vo) && t.name === Rt && Co(t), e && e();
    },
    $o = (t, e) => {
      const s = e ? N : O,
        { element: n } = t;
      s(w(n), Je, t.handleTouch, et),
        [Ie, xe].forEach((o) => {
          s(Yt(n), o, t.update, et);
        });
    },
    To = (t) => {
      const { element: e } = t,
        s = $(`shown.bs.${Vt(t.name)}`);
      $o(t, !0), b(e, s), u.clear(e, 'in');
    },
    yo = (t) => {
      const { element: e } = t,
        s = $(`hidden.bs.${Vt(t.name)}`);
      $o(t), Sa(t), b(e, s), u.clear(e, 'out');
    },
    ve = (t, e) => {
      const s = e ? N : O,
        { element: n, options: o, btn: i } = t,
        { trigger: a } = o,
        r = !!(t.name !== Rt && o.dismissible);
      a.includes('manual') ||
        ((t.enabled = !!e),
        a.split(' ').forEach((d) => {
          d === Jo
            ? (s(n, zs, t.handleShow),
              s(n, Ae, t.handleShow),
              r || (s(n, Qe, t.handleHide), s(w(n), Je, t.handleTouch, et)))
            : d === M
            ? s(n, d, r ? t.handleShow : t.toggle)
            : d === qe &&
              (s(n, Ge, t.handleShow), r || s(n, js, t.handleHide), ri && s(n, M, t.handleFocus)),
            r && i && s(i, M, t.handleHide);
        }));
    },
    Eo = (t, e) => {
      const s = e ? N : O,
        { element: n, container: o, offsetParent: i } = t,
        { offsetHeight: a, scrollHeight: c } = o,
        r = B(n, `.${Z}`),
        l = B(n, `.${Q}`),
        d = Yt(n),
        C = o === i && a !== c ? o : d;
      s(C, xe, t.update, et),
        s(C, Ie, t.update, et),
        r && s(r, `hide.bs.${Z}`, t.handleHide),
        l && s(l, `hide.bs.${Q}`, t.handleHide);
    },
    Co = (t, e) => {
      const s = [vo, bo],
        { element: n } = t;
      L(n, s[e ? 0 : 1], e || mt(n, s[0]) || ''), xt(n, s[e ? 1 : 0]);
    };
  class Ht extends nt {
    constructor(s, n) {
      super(s, n);
      h(this, 'handleFocus', () => dt(this.element));
      h(this, 'handleShow', () => this.show());
      h(this, 'handleHide', () => this.hide());
      h(this, 'update', () => {
        Ds(this);
      });
      h(this, 'toggle', () => {
        const { tooltip: s } = this;
        s && !me(this) ? this.show() : this.hide();
      });
      h(this, 'handleTouch', ({ target: s }) => {
        const { tooltip: n, element: o } = this;
        (n && n.contains(s)) || s === o || (s && o.contains(s)) || this.hide();
      });
      const { element: o } = this,
        i = this.name === Rt,
        a = i ? gt : Bt,
        c = i ? Rt : Ye;
      (wo = (l) => z(l, c)), (this.enabled = !0), (this.id = `${a}-${tn(o, a)}`);
      const { options: r } = this;
      (!r.title && i) ||
        (!i && !r.content) ||
        (lt(As, { titleAttr: '' }),
        Me(o, bo) && i && typeof r.title == 'string' && Co(this, r.title),
        (this.container = Ea(o)),
        (this.offsetParent = ['sticky', 'fixed'].some((l) => V(this.container, 'position') === l)
          ? this.container
          : w(this.element).body),
        ya(this),
        ve(this, !0));
    }
    get name() {
      return Rt;
    }
    get defaults() {
      return As;
    }
    show() {
      const { options: s, tooltip: n, element: o, container: i, offsetParent: a, id: c } = this,
        { animation: r } = s,
        l = u.get(o, 'out'),
        d = i === a ? i : a;
      u.clear(o, 'out'),
        n &&
          !l &&
          !me(this) &&
          u.set(
            o,
            () => {
              const g = $(`show.bs.${Vt(this.name)}`);
              b(o, g),
                g.defaultPrevented ||
                  (jn(n, d),
                  L(o, Ws, `#${c}`),
                  this.update(),
                  Eo(this, !0),
                  f(n, m) || p(n, m),
                  r ? P(n, () => To(this)) : To(this));
            },
            17,
            'in',
          );
    }
    hide() {
      const { options: s, tooltip: n, element: o } = this,
        { animation: i, delay: a } = s;
      u.clear(o, 'in'),
        n &&
          me(this) &&
          u.set(
            o,
            () => {
              const c = $(`hide.bs.${Vt(this.name)}`);
              b(o, c),
                c.defaultPrevented ||
                  (this.update(), v(n, m), Eo(this), i ? P(n, () => yo(this)) : yo(this));
            },
            a + 17,
            'out',
          );
    }
    enable() {
      const { enabled: s } = this;
      s || (ve(this, !0), (this.enabled = !s));
    }
    disable() {
      const { tooltip: s, options: n, enabled: o } = this,
        { animation: i } = n;
      o &&
        (s && me(this) && i ? (this.hide(), P(s, () => ve(this))) : ve(this), (this.enabled = !o));
    }
    toggleEnabled() {
      this.enabled ? this.disable() : this.enable();
    }
    dispose() {
      const { tooltip: s, options: n } = this,
        o = { ...this, name: this.name },
        i = () => setTimeout(() => Pa(o, () => super.dispose()), 17);
      n.animation && me(o) ? ((this.options.delay = 0), this.hide(), P(s, i)) : i();
    }
  }
  h(Ht, 'selector', Ca), h(Ht, 'init', Ha), h(Ht, 'getInstance', wo), h(Ht, 'styleTip', Ds);
  const Da = `[${at}="${Bt}"],[data-tip="${Bt}"]`,
    Aa = lt({}, As, {
      template: uo(Bt),
      content: '',
      dismissible: !1,
      btnClose: '<button class="btn-close" aria-label="Close"></button>',
    }),
    xa = (t) => z(t, Ye),
    Ia = (t) => new Wt(t);
  class Wt extends Ht {
    constructor(s, n) {
      super(s, n);
      h(this, 'show', () => {
        super.show();
        const { options: s, btn: n } = this;
        s.dismissible && n && setTimeout(() => dt(n), 17);
      });
    }
    get name() {
      return Ye;
    }
    get defaults() {
      return Aa;
    }
  }
  h(Wt, 'selector', Da), h(Wt, 'init', Ia), h(Wt, 'getInstance', xa), h(Wt, 'styleTip', Ds);
  const ka = 'scrollspy',
    Ho = 'ScrollSpy',
    Na = '[data-bs-spy="scroll"]',
    Oa = { offset: 10, target: null },
    Ma = (t) => z(t, Ho),
    La = (t) => new ee(t),
    So = $(`activate.bs.${ka}`),
    Ba = (t) => {
      const {
          target: e,
          scrollTarget: s,
          options: n,
          itemsLength: o,
          scrollHeight: i,
          element: a,
        } = t,
        { offset: c } = n,
        r = os(s),
        l = e && as('A', e),
        d = s ? Po(s) : i;
      if (((t.scrollTop = r ? s.scrollY : s.scrollTop), l && (d !== i || o !== l.length))) {
        let g, C, F;
        (t.items = []),
          (t.offsets = []),
          (t.scrollHeight = d),
          (t.maxScroll = t.scrollHeight - Ra(t)),
          [...l].forEach((tt) => {
            (g = mt(tt, 'href')),
              (C = g && g.charAt(0) === '#' && g.slice(-1) !== '#' && D(g, w(a))),
              C &&
                (t.items.push(tt),
                (F = he(C)),
                t.offsets.push((r ? F.top + t.scrollTop : C.offsetTop) - c));
          }),
          (t.itemsLength = t.items.length);
      }
    },
    Po = (t) => (T(t) ? t.scrollHeight : ht(t).scrollHeight),
    Ra = ({ element: t, scrollTarget: e }) => (os(e) ? e.innerHeight : he(t).height),
    Do = (t) => {
      [...as('A', t)].forEach((e) => {
        f(e, E) && v(e, E);
      });
    },
    Ao = (t, e) => {
      const { target: s, element: n } = t;
      T(s) && Do(s), (t.activeItem = e), p(e, E);
      const o = [];
      let i = e;
      for (; i !== wt(n); )
        (i = i.parentElement), (f(i, 'nav') || f(i, 'dropdown-menu')) && o.push(i);
      o.forEach((a) => {
        const c = a.previousElementSibling;
        c && !f(c, E) && p(c, E);
      }),
        (So.relatedTarget = e),
        b(n, So);
    },
    xo = (t, e) => {
      (e ? N : O)(t.scrollTarget, Ie, t.refresh, et);
    };
  class ee extends nt {
    constructor(s, n) {
      super(s, n);
      h(this, 'refresh', () => {
        const { target: s } = this;
        if (T(s) && s.offsetHeight > 0) {
          Ba(this);
          const { scrollTop: n, maxScroll: o, itemsLength: i, items: a, activeItem: c } = this;
          if (n >= o) {
            const l = a[i - 1];
            c !== l && Ao(this, l);
            return;
          }
          const { offsets: r } = this;
          if (c && n < r[0] && r[0] > 0) {
            (this.activeItem = null), s && Do(s);
            return;
          }
          a.forEach((l, d) => {
            c !== l && n >= r[d] && (typeof r[d + 1] > 'u' || n < r[d + 1]) && Ao(this, l);
          });
        }
      });
      const { element: o, options: i } = this;
      (this.target = D(i.target, w(o))),
        this.target &&
          ((this.scrollTarget = o.clientHeight < o.scrollHeight ? o : Yt(o)),
          (this.scrollHeight = Po(this.scrollTarget)),
          xo(this, !0),
          this.refresh());
    }
    get name() {
      return Ho;
    }
    get defaults() {
      return Oa;
    }
    dispose() {
      xo(this), super.dispose();
    }
  }
  h(ee, 'selector', Na), h(ee, 'init', La), h(ee, 'getInstance', Ma);
  const be = 'tab',
    Io = 'Tab',
    ko = `[${at}="${be}"]`,
    No = (t) => z(t, Io),
    Wa = (t) => new se(t),
    xs = $(`show.bs.${be}`),
    Oo = $(`shown.bs.${be}`),
    Is = $(`hide.bs.${be}`),
    Mo = $(`hidden.bs.${be}`),
    we = new Map(),
    Lo = (t) => {
      const { tabContent: e, nav: s } = t;
      e && f(e, Ot) && ((e.style.height = ''), v(e, Ot)), s && u.clear(s);
    },
    Bo = (t) => {
      const { element: e, tabContent: s, content: n, nav: o } = t,
        { tab: i } = (T(o) && we.get(o)) || { tab: null };
      if (s && n && f(n, W)) {
        const { currentHeight: a, nextHeight: c } = we.get(e) || {
          currentHeight: 0,
          nextHeight: 0,
        };
        a === c
          ? Lo(t)
          : setTimeout(() => {
              (s.style.height = `${c}px`), kt(s), P(s, () => Lo(t));
            }, 50);
      } else o && u.clear(o);
      (Oo.relatedTarget = i), b(e, Oo);
    },
    Ro = (t) => {
      const { element: e, content: s, tabContent: n, nav: o } = t,
        { tab: i, content: a } = (o && we.get(o)) || { tab: null, content: null };
      let c = 0;
      if (
        (n &&
          s &&
          f(s, W) &&
          ([a, s].forEach((r) => {
            T(r) && p(r, 'overflow-hidden');
          }),
          (c = T(a) ? a.scrollHeight : 0)),
        (xs.relatedTarget = i),
        (Mo.relatedTarget = e),
        b(e, xs),
        !xs.defaultPrevented)
      ) {
        if ((s && p(s, E), a && v(a, E), n && s && f(s, W))) {
          const r = s.scrollHeight;
          we.set(e, { currentHeight: c, nextHeight: r, tab: null, content: null }),
            p(n, Ot),
            (n.style.height = `${c}px`),
            kt(n),
            [a, s].forEach((l) => {
              l && v(l, 'overflow-hidden');
            });
        }
        s && s && f(s, W)
          ? setTimeout(() => {
              p(s, m),
                P(s, () => {
                  Bo(t);
                });
            }, 1)
          : (s && p(s, m), Bo(t)),
          i && b(i, Mo);
      }
    },
    Wo = (t) => {
      const { nav: e } = t;
      if (!T(e)) return { tab: null, content: null };
      const s = ft(E, e);
      let n = null;
      s.length === 1 && !Mt.some((i) => f(s[0].parentElement, i))
        ? ([n] = s)
        : s.length > 1 && (n = s[s.length - 1]);
      const o = T(n) ? X(n) : null;
      return { tab: n, content: o };
    },
    Fo = (t) => {
      if (!T(t)) return null;
      const e = B(t, `.${Mt.join(',.')}`);
      return e ? D(`.${Mt[0]}-toggle`, e) : null;
    },
    jo = (t, e) => {
      (e ? N : O)(t.element, M, Fa);
    },
    Fa = (t) => {
      const e = No(t.target);
      e && (t.preventDefault(), e.show());
    };
  class se extends nt {
    constructor(e) {
      super(e);
      const { element: s } = this,
        n = X(s);
      if (n) {
        const o = B(s, '.nav'),
          i = B(n, '.tab-content');
        (this.nav = o), (this.content = n), (this.tabContent = i), (this.dropdown = Fo(s));
        const { tab: a } = Wo(this);
        if (o && !a) {
          const c = D(ko, o),
            r = c && X(c);
          r && (p(c, E), p(r, m), p(r, E), L(s, Ze, 'true'));
        }
        jo(this, !0);
      }
    }
    get name() {
      return Io;
    }
    show() {
      const { element: e, content: s, nav: n, dropdown: o } = this;
      if (!(n && u.get(n)) && !f(e, E)) {
        const { tab: i, content: a } = Wo(this);
        if (
          (n && we.set(n, { tab: i, content: a, currentHeight: 0, nextHeight: 0 }),
          (Is.relatedTarget = e),
          T(i) && (b(i, Is), !Is.defaultPrevented))
        ) {
          p(e, E), L(e, Ze, 'true');
          const c = T(i) && Fo(i);
          if ((c && f(c, E) && v(c, E), n)) {
            const r = () => {
              i && (v(i, E), L(i, Ze, 'false')), o && !f(o, E) && p(o, E);
            };
            a && (f(a, W) || (s && f(s, W))) ? u.set(n, r, 1) : r();
          }
          a && (v(a, m), f(a, W) ? P(a, () => Ro(this)) : Ro(this));
        }
      }
    }
    dispose() {
      jo(this), super.dispose();
    }
  }
  h(se, 'selector', ko), h(se, 'init', Wa), h(se, 'getInstance', No);
  const J = 'toast',
    zo = 'Toast',
    ja = `.${J}`,
    za = `[${Be}="${J}"]`,
    Ko = `[${at}="${J}"]`,
    ne = 'showing',
    Vo = 'hide',
    Ka = { animation: !0, autohide: !0, delay: 5e3 },
    ks = (t) => z(t, zo),
    Va = (t) => new oe(t),
    Xo = $(`show.bs.${J}`),
    Xa = $(`shown.bs.${J}`),
    Yo = $(`hide.bs.${J}`),
    Ya = $(`hidden.bs.${J}`),
    Uo = (t) => {
      const { element: e, options: s } = t;
      v(e, ne), u.clear(e, ne), b(e, Xa), s.autohide && u.set(e, () => t.hide(), s.delay, J);
    },
    _o = (t) => {
      const { element: e } = t;
      v(e, ne), v(e, m), p(e, Vo), u.clear(e, J), b(e, Ya);
    },
    Ua = (t) => {
      const { element: e, options: s } = t;
      p(e, ne), s.animation ? (kt(e), P(e, () => _o(t))) : _o(t);
    },
    _a = (t) => {
      const { element: e, options: s } = t;
      u.set(
        e,
        () => {
          v(e, Vo), kt(e), p(e, m), p(e, ne), s.animation ? P(e, () => Uo(t)) : Uo(t);
        },
        17,
        ne,
      );
    },
    Zo = (t, e) => {
      const s = e ? N : O,
        { element: n, triggers: o, dismiss: i, options: a, hide: c } = t;
      i && s(i, M, c),
        a.autohide && [Ge, js, Ae, Qe].forEach((r) => s(n, r, Ga)),
        o.length && o.forEach((r) => s(r, M, qa));
    },
    Za = (t) => {
      u.clear(t.element, J), Zo(t);
    },
    qa = (t) => {
      const { target: e } = t,
        s = e && B(e, Ko),
        n = s && X(s),
        o = n && ks(n);
      o && (s && s.tagName === 'A' && t.preventDefault(), (o.relatedTarget = s), o.show());
    },
    Ga = (t) => {
      const e = t.target,
        s = ks(e),
        { type: n, relatedTarget: o } = t;
      s &&
        e !== o &&
        !e.contains(o) &&
        ([Ae, Ge].includes(n) ? u.clear(e, J) : u.set(e, () => s.hide(), s.options.delay, J));
    };
  class oe extends nt {
    constructor(s, n) {
      super(s, n);
      h(this, 'show', () => {
        const { element: s, isShown: n } = this;
        s && !n && (b(s, Xo), Xo.defaultPrevented || _a(this));
      });
      h(this, 'hide', () => {
        const { element: s, isShown: n } = this;
        s && n && (b(s, Yo), Yo.defaultPrevented || Ua(this));
      });
      const { element: o, options: i } = this;
      i.animation && !f(o, W) ? p(o, W) : !i.animation && f(o, W) && v(o, W),
        (this.dismiss = D(za, o)),
        (this.triggers = [...st(Ko, w(o))].filter((a) => X(a) === o)),
        Zo(this, !0);
    }
    get name() {
      return zo;
    }
    get defaults() {
      return Ka;
    }
    get isShown() {
      return f(this.element, m);
    }
    dispose() {
      const { element: s, isShown: n } = this;
      n && v(s, m), Za(this), super.dispose();
    }
  }
  h(oe, 'selector', ja), h(oe, 'init', Va), h(oe, 'getInstance', ks);
  const Ns = new Map();
  [Ut, _t, Zt, qt, Qt, Jt, te, Wt, ee, se, oe, Ht].forEach((t) => Ns.set(t.prototype.name, t));
  const Qa = (t, e) => {
      [...e].forEach((s) => t(s));
    },
    Ja = (t, e) => {
      const s = It.getAllFor(t);
      s &&
        [...s].forEach(([n, o]) => {
          e.contains(n) && o.dispose();
        });
    },
    Os = (t) => {
      const e = t && t.nodeName ? t : document,
        s = [...as('*', e)];
      Ns.forEach((n) => {
        const { init: o, selector: i } = n;
        Qa(
          o,
          s.filter((a) => sn(a, i)),
        );
      });
    },
    tc = (t) => {
      const e = t && t.nodeName ? t : document;
      Ns.forEach((s) => {
        Ja(s.prototype.name, e);
      });
    };
  return (
    document.body ? Os() : N(document, 'DOMContentLoaded', () => Os(), { once: !0 }),
    (H.Alert = Ut),
    (H.Button = _t),
    (H.Carousel = Zt),
    (H.Collapse = qt),
    (H.Dropdown = Qt),
    (H.Listener = qo),
    (H.Modal = Jt),
    (H.Offcanvas = te),
    (H.Popover = Wt),
    (H.ScrollSpy = ee),
    (H.Tab = se),
    (H.Toast = oe),
    (H.Tooltip = Ht),
    (H.initCallback = Os),
    (H.removeDataAPI = tc),
    Object.defineProperty(H, Symbol.toStringTag, { value: 'Module' }),
    H
  );
})({});
