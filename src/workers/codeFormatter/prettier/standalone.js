var au = Object.create;
var $e = Object.defineProperty;
var Du = Object.getOwnPropertyDescriptor;
var cu = Object.getOwnPropertyNames;
var lu = Object.getPrototypeOf,
  fu = Object.prototype.hasOwnProperty;
var pu = (t, e) => () => (t && (e = t((t = 0))), e);
var Ue = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  Me = (t, e) => {
    for (var r in e) $e(t, r, { get: e[r], enumerable: !0 });
  },
  nr = (t, e, r, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let o of cu(e))
        !fu.call(t, o) &&
          o !== r &&
          $e(t, o, {
            get: () => e[o],
            enumerable: !(n = Du(e, o)) || n.enumerable,
          });
    return t;
  };
var Ce = (t, e, r) => (
    (r = t != null ? au(lu(t)) : {}),
    nr(
      e || !t || !t.__esModule
        ? $e(r, "default", { value: t, enumerable: !0 })
        : r,
      t,
    )
  ),
  du = (t) => nr($e({}, "__esModule", { value: !0 }), t);
var Fu = (t, e, r) => {
  if (!e.has(t)) throw TypeError("Cannot " + r);
};
var Ct = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
};
var ce = (t, e, r) => (Fu(t, e, "access private method"), r);
var or = Ue((gt) => {
  "use strict";
  Object.defineProperty(gt, "__esModule", { value: !0 });
  gt.default = ur;
  function ur() {}
  ur.prototype = {
    diff: function (e, r) {
      var n =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        o = n.callback;
      typeof n == "function" && ((o = n), (n = {})), (this.options = n);
      var u = this;
      function i(p) {
        return o
          ? (setTimeout(function () {
              o(void 0, p);
            }, 0),
            !0)
          : p;
      }
      (e = this.castInput(e)),
        (r = this.castInput(r)),
        (e = this.removeEmpty(this.tokenize(e))),
        (r = this.removeEmpty(this.tokenize(r)));
      var s = r.length,
        a = e.length,
        D = 1,
        c = s + a;
      n.maxEditLength && (c = Math.min(c, n.maxEditLength));
      var F = [{ newPos: -1, components: [] }],
        f = this.extractCommon(F[0], r, e, 0);
      if (F[0].newPos + 1 >= s && f + 1 >= a)
        return i([{ value: this.join(r), count: r.length }]);
      function d() {
        for (var p = -1 * D; p <= D; p += 2) {
          var m = void 0,
            E = F[p - 1],
            h = F[p + 1],
            g = (h ? h.newPos : 0) - p;
          E && (F[p - 1] = void 0);
          var C = E && E.newPos + 1 < s,
            _ = h && 0 <= g && g < a;
          if (!C && !_) {
            F[p] = void 0;
            continue;
          }
          if (
            (!C || (_ && E.newPos < h.newPos)
              ? ((m = hu(h)), u.pushComponent(m.components, void 0, !0))
              : ((m = E),
                m.newPos++,
                u.pushComponent(m.components, !0, void 0)),
            (g = u.extractCommon(m, r, e, p)),
            m.newPos + 1 >= s && g + 1 >= a)
          )
            return i(Eu(u, m.components, r, e, u.useLongestToken));
          F[p] = m;
        }
        D++;
      }
      if (o)
        (function p() {
          setTimeout(function () {
            if (D > c) return o();
            d() || p();
          }, 0);
        })();
      else
        for (; D <= c; ) {
          var l = d();
          if (l) return l;
        }
    },
    pushComponent: function (e, r, n) {
      var o = e[e.length - 1];
      o && o.added === r && o.removed === n
        ? (e[e.length - 1] = { count: o.count + 1, added: r, removed: n })
        : e.push({ count: 1, added: r, removed: n });
    },
    extractCommon: function (e, r, n, o) {
      for (
        var u = r.length, i = n.length, s = e.newPos, a = s - o, D = 0;
        s + 1 < u && a + 1 < i && this.equals(r[s + 1], n[a + 1]);

      )
        s++, a++, D++;
      return D && e.components.push({ count: D }), (e.newPos = s), a;
    },
    equals: function (e, r) {
      return this.options.comparator
        ? this.options.comparator(e, r)
        : e === r ||
            (this.options.ignoreCase && e.toLowerCase() === r.toLowerCase());
    },
    removeEmpty: function (e) {
      for (var r = [], n = 0; n < e.length; n++) e[n] && r.push(e[n]);
      return r;
    },
    castInput: function (e) {
      return e;
    },
    tokenize: function (e) {
      return e.split("");
    },
    join: function (e) {
      return e.join("");
    },
  };
  function Eu(t, e, r, n, o) {
    for (var u = 0, i = e.length, s = 0, a = 0; u < i; u++) {
      var D = e[u];
      if (D.removed) {
        if (
          ((D.value = t.join(n.slice(a, a + D.count))),
          (a += D.count),
          u && e[u - 1].added)
        ) {
          var F = e[u - 1];
          (e[u - 1] = e[u]), (e[u] = F);
        }
      } else {
        if (!D.added && o) {
          var c = r.slice(s, s + D.count);
          (c = c.map(function (d, l) {
            var p = n[a + l];
            return p.length > d.length ? p : d;
          })),
            (D.value = t.join(c));
        } else D.value = t.join(r.slice(s, s + D.count));
        (s += D.count), D.added || (a += D.count);
      }
    }
    var f = e[i - 1];
    return (
      i > 1 &&
        typeof f.value == "string" &&
        (f.added || f.removed) &&
        t.equals("", f.value) &&
        ((e[i - 2].value += f.value), e.pop()),
      e
    );
  }
  function hu(t) {
    return { newPos: t.newPos, components: t.components.slice(0) };
  }
});
var ir = Ue((ye) => {
  "use strict";
  Object.defineProperty(ye, "__esModule", { value: !0 });
  ye.diffArrays = yu;
  ye.arrayDiff = void 0;
  var Cu = gu(or());
  function gu(t) {
    return t && t.__esModule ? t : { default: t };
  }
  var ge = new Cu.default();
  ye.arrayDiff = ge;
  ge.tokenize = function (t) {
    return t.slice();
  };
  ge.join = ge.removeEmpty = function (t) {
    return t;
  };
  function yu(t, e, r) {
    return ge.diff(t, e, r);
  }
});
var Pe = Ue((ss, Rr) => {
  "use strict";
  var Ir = new Proxy(String, { get: () => Ir });
  Rr.exports = Ir;
});
var ln = {};
Me(ln, { default: () => to, shouldHighlight: () => eo });
var eo,
  to,
  fn = pu(() => {
    (eo = () => !1), (to = String);
  });
var hn = Ue((pt) => {
  "use strict";
  Object.defineProperty(pt, "__esModule", { value: !0 });
  pt.codeFrameColumns = En;
  pt.default = io;
  var pn = (fn(), du(ln)),
    ro = Pe(),
    dn = ro,
    jt;
  function no(t) {
    if (t) {
      var e;
      return (
        (e = jt) != null ||
          (jt = new dn.constructor({ enabled: !0, level: 1 })),
        jt
      );
    }
    return dn;
  }
  var Fn = !1;
  function uo(t) {
    return { gutter: t.grey, marker: t.red.bold, message: t.red.bold };
  }
  var mn = /\r\n|[\n\r\u2028\u2029]/;
  function oo(t, e, r) {
    let n = Object.assign({ column: 0, line: -1 }, t.start),
      o = Object.assign({}, n, t.end),
      { linesAbove: u = 2, linesBelow: i = 3 } = r || {},
      s = n.line,
      a = n.column,
      D = o.line,
      c = o.column,
      F = Math.max(s - (u + 1), 0),
      f = Math.min(e.length, D + i);
    s === -1 && (F = 0), D === -1 && (f = e.length);
    let d = D - s,
      l = {};
    if (d)
      for (let p = 0; p <= d; p++) {
        let m = p + s;
        if (!a) l[m] = !0;
        else if (p === 0) {
          let E = e[m - 1].length;
          l[m] = [a, E - a + 1];
        } else if (p === d) l[m] = [0, c];
        else {
          let E = e[m - p].length;
          l[m] = [0, E];
        }
      }
    else a === c ? (a ? (l[s] = [a, 0]) : (l[s] = !0)) : (l[s] = [a, c - a]);
    return { start: F, end: f, markerLines: l };
  }
  function En(t, e, r = {}) {
    let n = (r.highlightCode || r.forceColor) && (0, pn.shouldHighlight)(r),
      o = no(r.forceColor),
      u = uo(o),
      i = (p, m) => (n ? p(m) : m),
      s = t.split(mn),
      { start: a, end: D, markerLines: c } = oo(e, s, r),
      F = e.start && typeof e.start.column == "number",
      f = String(D).length,
      l = (n ? (0, pn.default)(t, r) : t)
        .split(mn, D)
        .slice(a, D)
        .map((p, m) => {
          let E = a + 1 + m,
            g = ` ${` ${E}`.slice(-f)} |`,
            C = c[E],
            _ = !c[E + 1];
          if (C) {
            let Z = "";
            if (Array.isArray(C)) {
              let $ = p.slice(0, Math.max(C[0] - 1, 0)).replace(/[^\t]/g, " "),
                Q = C[1] || 1;
              (Z = [
                `
 `,
                i(u.gutter, g.replace(/\d/g, " ")),
                " ",
                $,
                i(u.marker, "^").repeat(Q),
              ].join("")),
                _ && r.message && (Z += " " + i(u.message, r.message));
            }
            return [
              i(u.marker, ">"),
              i(u.gutter, g),
              p.length > 0 ? ` ${p}` : "",
              Z,
            ].join("");
          } else return ` ${i(u.gutter, g)}${p.length > 0 ? ` ${p}` : ""}`;
        }).join(`
`);
    return (
      r.message &&
        !F &&
        (l = `${" ".repeat(f + 1)}${r.message}
${l}`),
      n ? o.reset(l) : l
    );
  }
  function io(t, e, r, n = {}) {
    if (!Fn) {
      Fn = !0;
      let u =
        "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
      {
        let i = new Error(u);
        (i.name = "DeprecationWarning"), console.warn(new Error(u));
      }
    }
    return (r = Math.max(r, 0)), En(t, { start: { column: r, line: e } }, n);
  }
});
var tr = {};
Me(tr, {
  __debug: () => Qo,
  check: () => Xo,
  doc: () => er,
  format: () => su,
  formatWithCursor: () => iu,
  getSupportInfo: () => Zo,
  util: () => Qt,
  version: () => ou,
});
var mu = (t, e, r, n) => {
    if (!(t && e == null))
      return e.replaceAll
        ? e.replaceAll(r, n)
        : r.global
          ? e.replace(r, n)
          : e.split(r).join(n);
  },
  ee = mu;
var Wn = Ce(ir(), 1);
var U = "string",
  j = "array",
  M = "cursor",
  T = "indent",
  S = "align",
  v = "trim",
  A = "group",
  k = "fill",
  B = "if-break",
  P = "indent-if-break",
  L = "line-suffix",
  I = "line-suffix-boundary",
  x = "line",
  O = "label",
  b = "break-parent",
  We = new Set([M, T, S, v, A, k, B, P, L, I, x, O, b]);
function xu(t) {
  if (typeof t == "string") return U;
  if (Array.isArray(t)) return j;
  if (!t) return;
  let { type: e } = t;
  if (We.has(e)) return e;
}
var W = xu;
var _u = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
function Au(t) {
  let e = t === null ? "null" : typeof t;
  if (e !== "string" && e !== "object")
    return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
  if (W(t)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(t);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = _u([...We].map((o) => `'${o}'`));
  return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`;
}
var yt = class extends Error {
    name = "InvalidDocError";
    constructor(e) {
      super(Au(e)), (this.doc = e);
    }
  },
  q = yt;
var sr = {};
function Bu(t, e, r, n) {
  let o = [t];
  for (; o.length > 0; ) {
    let u = o.pop();
    if (u === sr) {
      r(o.pop());
      continue;
    }
    r && o.push(u, sr);
    let i = W(u);
    if (!i) throw new q(u);
    if ((e == null ? void 0 : e(u)) !== !1)
      switch (i) {
        case j:
        case k: {
          let s = i === j ? u : u.parts;
          for (let a = s.length, D = a - 1; D >= 0; --D) o.push(s[D]);
          break;
        }
        case B:
          o.push(u.flatContents, u.breakContents);
          break;
        case A:
          if (n && u.expandedStates)
            for (let s = u.expandedStates.length, a = s - 1; a >= 0; --a)
              o.push(u.expandedStates[a]);
          else o.push(u.contents);
          break;
        case S:
        case T:
        case P:
        case O:
        case L:
          o.push(u.contents);
          break;
        case U:
        case M:
        case v:
        case I:
        case x:
        case b:
          break;
        default:
          throw new q(u);
      }
  }
}
var xe = Bu;
var ar = () => {},
  z = ar,
  ze = ar;
function ie(t) {
  return z(t), { type: T, contents: t };
}
function oe(t, e) {
  return z(e), { type: S, contents: e, n: t };
}
function xt(t, e = {}) {
  return (
    z(t),
    ze(e.expandedStates, !0),
    {
      type: A,
      id: e.id,
      contents: t,
      break: !!e.shouldBreak,
      expandedStates: e.expandedStates,
    }
  );
}
function Dr(t) {
  return oe(Number.NEGATIVE_INFINITY, t);
}
function cr(t) {
  return oe({ type: "root" }, t);
}
function lr(t) {
  return oe(-1, t);
}
function fr(t, e) {
  return xt(t[0], { ...e, expandedStates: t });
}
function Ge(t) {
  return ze(t), { type: k, parts: t };
}
function pr(t, e = "", r = {}) {
  return (
    z(t),
    e !== "" && z(e),
    { type: B, breakContents: t, flatContents: e, groupId: r.groupId }
  );
}
function dr(t, e) {
  return z(t), { type: P, contents: t, groupId: e.groupId, negate: e.negate };
}
function _e(t) {
  return z(t), { type: L, contents: t };
}
var Fr = { type: I },
  le = { type: b },
  mr = { type: v },
  Ae = { type: x, hard: !0 },
  _t = { type: x, hard: !0, literal: !0 },
  Ke = { type: x },
  Er = { type: x, soft: !0 },
  G = [Ae, le],
  He = [_t, le],
  Be = { type: M };
function ke(t, e) {
  z(t), ze(e);
  let r = [];
  for (let n = 0; n < e.length; n++) n !== 0 && r.push(t), r.push(e[n]);
  return r;
}
function qe(t, e, r) {
  z(t);
  let n = t;
  if (e > 0) {
    for (let o = 0; o < Math.floor(e / r); ++o) n = ie(n);
    (n = oe(e % r, n)), (n = oe(Number.NEGATIVE_INFINITY, n));
  }
  return n;
}
function hr(t, e) {
  return z(e), t ? { type: O, label: t, contents: e } : e;
}
var ku = (t, e, r) => {
    if (!(t && e == null))
      return Array.isArray(e) || typeof e == "string"
        ? e[r < 0 ? e.length + r : r]
        : e.at(r);
  },
  y = ku;
function Cr(t) {
  let e = t.indexOf("\r");
  return e >= 0
    ? t.charAt(e + 1) ===
      `
`
      ? "crlf"
      : "cr"
    : "lf";
}
function be(t) {
  switch (t) {
    case "cr":
      return "\r";
    case "crlf":
      return `\r
`;
    default:
      return `
`;
  }
}
function At(t, e) {
  let r;
  switch (e) {
    case `
`:
      r = /\n/g;
      break;
    case "\r":
      r = /\r/g;
      break;
    case `\r
`:
      r = /\r\n/g;
      break;
    default:
      throw new Error(`Unexpected "eol" ${JSON.stringify(e)}.`);
  }
  let n = t.match(r);
  return n ? n.length : 0;
}
function gr(t) {
  return ee(
    !1,
    t,
    /\r\n?/g,
    `
`,
  );
}
var yr = () =>
  /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var xr = {
  eastAsianWidth(t) {
    var e = t.charCodeAt(0),
      r = t.length == 2 ? t.charCodeAt(1) : 0,
      n = e;
    return (
      55296 <= e &&
        e <= 56319 &&
        56320 <= r &&
        r <= 57343 &&
        ((e &= 1023), (r &= 1023), (n = (e << 10) | r), (n += 65536)),
      n == 12288 || (65281 <= n && n <= 65376) || (65504 <= n && n <= 65510)
        ? "F"
        : (4352 <= n && n <= 4447) ||
            (4515 <= n && n <= 4519) ||
            (4602 <= n && n <= 4607) ||
            (9001 <= n && n <= 9002) ||
            (11904 <= n && n <= 11929) ||
            (11931 <= n && n <= 12019) ||
            (12032 <= n && n <= 12245) ||
            (12272 <= n && n <= 12283) ||
            (12289 <= n && n <= 12350) ||
            (12353 <= n && n <= 12438) ||
            (12441 <= n && n <= 12543) ||
            (12549 <= n && n <= 12589) ||
            (12593 <= n && n <= 12686) ||
            (12688 <= n && n <= 12730) ||
            (12736 <= n && n <= 12771) ||
            (12784 <= n && n <= 12830) ||
            (12832 <= n && n <= 12871) ||
            (12880 <= n && n <= 13054) ||
            (13056 <= n && n <= 19903) ||
            (19968 <= n && n <= 42124) ||
            (42128 <= n && n <= 42182) ||
            (43360 <= n && n <= 43388) ||
            (44032 <= n && n <= 55203) ||
            (55216 <= n && n <= 55238) ||
            (55243 <= n && n <= 55291) ||
            (63744 <= n && n <= 64255) ||
            (65040 <= n && n <= 65049) ||
            (65072 <= n && n <= 65106) ||
            (65108 <= n && n <= 65126) ||
            (65128 <= n && n <= 65131) ||
            (110592 <= n && n <= 110593) ||
            (127488 <= n && n <= 127490) ||
            (127504 <= n && n <= 127546) ||
            (127552 <= n && n <= 127560) ||
            (127568 <= n && n <= 127569) ||
            (131072 <= n && n <= 194367) ||
            (177984 <= n && n <= 196605) ||
            (196608 <= n && n <= 262141)
          ? "W"
          : "N"
    );
  },
};
var bu = /[^\x20-\x7F]/;
function wu(t) {
  if (!t) return 0;
  if (!bu.test(t)) return t.length;
  t = t.replace(yr(), "  ");
  let e = 0;
  for (let r of t) {
    let n = r.codePointAt(0);
    if (n <= 31 || (n >= 127 && n <= 159) || (n >= 768 && n <= 879)) continue;
    let o = xr.eastAsianWidth(r);
    e += o === "F" || o === "W" ? 2 : 1;
  }
  return e;
}
var we = wu;
var Br = (t) => {
  if (Array.isArray(t)) return t;
  if (t.type !== k) throw new Error(`Expect doc to be 'array' or '${k}'.`);
  return t.parts;
};
function Ne(t, e) {
  if (typeof t == "string") return e(t);
  let r = new Map();
  return n(t);
  function n(u) {
    if (r.has(u)) return r.get(u);
    let i = o(u);
    return r.set(u, i), i;
  }
  function o(u) {
    switch (W(u)) {
      case j:
        return e(u.map(n));
      case k:
        return e({ ...u, parts: u.parts.map(n) });
      case B:
        return e({
          ...u,
          breakContents: n(u.breakContents),
          flatContents: n(u.flatContents),
        });
      case A: {
        let { expandedStates: i, contents: s } = u;
        return (
          i ? ((i = i.map(n)), (s = i[0])) : (s = n(s)),
          e({ ...u, contents: s, expandedStates: i })
        );
      }
      case S:
      case T:
      case P:
      case O:
      case L:
        return e({ ...u, contents: n(u.contents) });
      case U:
      case M:
      case v:
      case I:
      case x:
      case b:
        return e(u);
      default:
        throw new q(u);
    }
  }
}
function Je(t, e, r) {
  let n = r,
    o = !1;
  function u(i) {
    if (o) return !1;
    let s = e(i);
    s !== void 0 && ((o = !0), (n = s));
  }
  return xe(t, u), n;
}
function Ou(t) {
  if ((t.type === A && t.break) || (t.type === x && t.hard) || t.type === b)
    return !0;
}
function kr(t) {
  return Je(t, Ou, !1);
}
function _r(t) {
  if (t.length > 0) {
    let e = y(!1, t, -1);
    !e.expandedStates && !e.break && (e.break = "propagated");
  }
  return null;
}
function br(t) {
  let e = new Set(),
    r = [];
  function n(u) {
    if ((u.type === b && _r(r), u.type === A)) {
      if ((r.push(u), e.has(u))) return !1;
      e.add(u);
    }
  }
  function o(u) {
    u.type === A && r.pop().break && _r(r);
  }
  xe(t, n, o, !0);
}
function Nu(t) {
  return t.type === x && !t.hard
    ? t.soft
      ? ""
      : " "
    : t.type === B
      ? t.flatContents
      : t;
}
function wr(t) {
  return Ne(t, Nu);
}
function Ar(t) {
  for (
    t = [...t];
    t.length >= 2 && y(!1, t, -2).type === x && y(!1, t, -1).type === b;

  )
    t.length -= 2;
  if (t.length > 0) {
    let e = Oe(y(!1, t, -1));
    t[t.length - 1] = e;
  }
  return t;
}
function Oe(t) {
  switch (W(t)) {
    case S:
    case T:
    case P:
    case A:
    case L:
    case O: {
      let e = Oe(t.contents);
      return { ...t, contents: e };
    }
    case B:
      return {
        ...t,
        breakContents: Oe(t.breakContents),
        flatContents: Oe(t.flatContents),
      };
    case k:
      return { ...t, parts: Ar(t.parts) };
    case j:
      return Ar(t);
    case U:
      return t.replace(/[\n\r]*$/, "");
    case M:
    case v:
    case I:
    case x:
    case b:
      break;
    default:
      throw new q(t);
  }
  return t;
}
function Xe(t) {
  return Oe(Su(t));
}
function Tu(t) {
  switch (W(t)) {
    case k:
      if (t.parts.every((e) => e === "")) return "";
      break;
    case A:
      if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
      if (
        t.contents.type === A &&
        t.contents.id === t.id &&
        t.contents.break === t.break &&
        t.contents.expandedStates === t.expandedStates
      )
        return t.contents;
      break;
    case S:
    case T:
    case P:
    case L:
      if (!t.contents) return "";
      break;
    case B:
      if (!t.flatContents && !t.breakContents) return "";
      break;
    case j: {
      let e = [];
      for (let r of t) {
        if (!r) continue;
        let [n, ...o] = Array.isArray(r) ? r : [r];
        typeof n == "string" && typeof y(!1, e, -1) == "string"
          ? (e[e.length - 1] += n)
          : e.push(n),
          e.push(...o);
      }
      return e.length === 0 ? "" : e.length === 1 ? e[0] : e;
    }
    case U:
    case M:
    case v:
    case I:
    case x:
    case O:
    case b:
      break;
    default:
      throw new q(t);
  }
  return t;
}
function Su(t) {
  return Ne(t, (e) => Tu(e));
}
function Or(t, e = He) {
  return Ne(t, (r) =>
    typeof r == "string"
      ? ke(
          e,
          r.split(`
`),
        )
      : r,
  );
}
function vu(t) {
  if (t.type === x) return !0;
}
function Nr(t) {
  return Je(t, vu, !1);
}
function Ze(t, e) {
  return t.type === O ? { ...t, contents: e(t.contents) } : e(t);
}
var R = Symbol("MODE_BREAK"),
  K = Symbol("MODE_FLAT"),
  Te = Symbol("cursor");
function Tr() {
  return { value: "", length: 0, queue: [] };
}
function Pu(t, e) {
  return Bt(t, { type: "indent" }, e);
}
function Lu(t, e, r) {
  return e === Number.NEGATIVE_INFINITY
    ? t.root || Tr()
    : e < 0
      ? Bt(t, { type: "dedent" }, r)
      : e
        ? e.type === "root"
          ? { ...t, root: t }
          : Bt(
              t,
              {
                type: typeof e == "string" ? "stringAlign" : "numberAlign",
                n: e,
              },
              r,
            )
        : t;
}
function Bt(t, e, r) {
  let n = e.type === "dedent" ? t.queue.slice(0, -1) : [...t.queue, e],
    o = "",
    u = 0,
    i = 0,
    s = 0;
  for (let l of n)
    switch (l.type) {
      case "indent":
        c(), r.useTabs ? a(1) : D(r.tabWidth);
        break;
      case "stringAlign":
        c(), (o += l.n), (u += l.n.length);
        break;
      case "numberAlign":
        (i += 1), (s += l.n);
        break;
      default:
        throw new Error(`Unexpected type '${l.type}'`);
    }
  return f(), { ...t, value: o, length: u, queue: n };
  function a(l) {
    (o += "	".repeat(l)), (u += r.tabWidth * l);
  }
  function D(l) {
    (o += " ".repeat(l)), (u += l);
  }
  function c() {
    r.useTabs ? F() : f();
  }
  function F() {
    i > 0 && a(i), d();
  }
  function f() {
    s > 0 && D(s), d();
  }
  function d() {
    (i = 0), (s = 0);
  }
}
function kt(t) {
  let e = 0,
    r = 0,
    n = t.length;
  e: for (; n--; ) {
    let o = t[n];
    if (o === Te) {
      r++;
      continue;
    }
    for (let u = o.length - 1; u >= 0; u--) {
      let i = o[u];
      if (i === " " || i === "	") e++;
      else {
        t[n] = o.slice(0, u + 1);
        break e;
      }
    }
  }
  if (e > 0 || r > 0) for (t.length = n + 1; r-- > 0; ) t.push(Te);
  return e;
}
function Qe(t, e, r, n, o, u) {
  if (r === Number.POSITIVE_INFINITY) return !0;
  let i = e.length,
    s = [t],
    a = [];
  for (; r >= 0; ) {
    if (s.length === 0) {
      if (i === 0) return !0;
      s.push(e[--i]);
      continue;
    }
    let { mode: D, doc: c } = s.pop();
    switch (W(c)) {
      case U:
        a.push(c), (r -= we(c));
        break;
      case j:
      case k: {
        let F = Br(c);
        for (let f = F.length - 1; f >= 0; f--) s.push({ mode: D, doc: F[f] });
        break;
      }
      case T:
      case S:
      case P:
      case O:
        s.push({ mode: D, doc: c.contents });
        break;
      case v:
        r += kt(a);
        break;
      case A: {
        if (u && c.break) return !1;
        let F = c.break ? R : D,
          f =
            c.expandedStates && F === R
              ? y(!1, c.expandedStates, -1)
              : c.contents;
        s.push({ mode: F, doc: f });
        break;
      }
      case B: {
        let f =
          (c.groupId ? o[c.groupId] || K : D) === R
            ? c.breakContents
            : c.flatContents;
        f && s.push({ mode: D, doc: f });
        break;
      }
      case x:
        if (D === R || c.hard) return !0;
        c.soft || (a.push(" "), r--);
        break;
      case L:
        n = !0;
        break;
      case I:
        if (n) return !1;
        break;
    }
  }
  return !1;
}
function fe(t, e) {
  let r = {},
    n = e.printWidth,
    o = be(e.endOfLine),
    u = 0,
    i = [{ ind: Tr(), mode: R, doc: t }],
    s = [],
    a = !1,
    D = [],
    c = 0;
  for (br(t); i.length > 0; ) {
    let { ind: f, mode: d, doc: l } = i.pop();
    switch (W(l)) {
      case U: {
        let p =
          o !==
          `
`
            ? ee(
                !1,
                l,
                `
`,
                o,
              )
            : l;
        s.push(p), i.length > 0 && (u += we(p));
        break;
      }
      case j:
        for (let p = l.length - 1; p >= 0; p--)
          i.push({ ind: f, mode: d, doc: l[p] });
        break;
      case M:
        if (c >= 2) throw new Error("There are too many 'cursor' in doc.");
        s.push(Te), c++;
        break;
      case T:
        i.push({ ind: Pu(f, e), mode: d, doc: l.contents });
        break;
      case S:
        i.push({ ind: Lu(f, l.n, e), mode: d, doc: l.contents });
        break;
      case v:
        u -= kt(s);
        break;
      case A:
        switch (d) {
          case K:
            if (!a) {
              i.push({ ind: f, mode: l.break ? R : K, doc: l.contents });
              break;
            }
          case R: {
            a = !1;
            let p = { ind: f, mode: K, doc: l.contents },
              m = n - u,
              E = D.length > 0;
            if (!l.break && Qe(p, i, m, E, r)) i.push(p);
            else if (l.expandedStates) {
              let h = y(!1, l.expandedStates, -1);
              if (l.break) {
                i.push({ ind: f, mode: R, doc: h });
                break;
              } else
                for (let g = 1; g < l.expandedStates.length + 1; g++)
                  if (g >= l.expandedStates.length) {
                    i.push({ ind: f, mode: R, doc: h });
                    break;
                  } else {
                    let C = l.expandedStates[g],
                      _ = { ind: f, mode: K, doc: C };
                    if (Qe(_, i, m, E, r)) {
                      i.push(_);
                      break;
                    }
                  }
            } else i.push({ ind: f, mode: R, doc: l.contents });
            break;
          }
        }
        l.id && (r[l.id] = y(!1, i, -1).mode);
        break;
      case k: {
        let p = n - u,
          { parts: m } = l;
        if (m.length === 0) break;
        let [E, h] = m,
          g = { ind: f, mode: K, doc: E },
          C = { ind: f, mode: R, doc: E },
          _ = Qe(g, [], p, D.length > 0, r, !0);
        if (m.length === 1) {
          _ ? i.push(g) : i.push(C);
          break;
        }
        let Z = { ind: f, mode: K, doc: h },
          $ = { ind: f, mode: R, doc: h };
        if (m.length === 2) {
          _ ? i.push(Z, g) : i.push($, C);
          break;
        }
        m.splice(0, 2);
        let Q = { ind: f, mode: d, doc: Ge(m) },
          rr = m[0];
        Qe({ ind: f, mode: K, doc: [E, h, rr] }, [], p, D.length > 0, r, !0)
          ? i.push(Q, Z, g)
          : _
            ? i.push(Q, $, g)
            : i.push(Q, $, C);
        break;
      }
      case B:
      case P: {
        let p = l.groupId ? r[l.groupId] : d;
        if (p === R) {
          let m =
            l.type === B
              ? l.breakContents
              : l.negate
                ? l.contents
                : ie(l.contents);
          m && i.push({ ind: f, mode: d, doc: m });
        }
        if (p === K) {
          let m =
            l.type === B
              ? l.flatContents
              : l.negate
                ? ie(l.contents)
                : l.contents;
          m && i.push({ ind: f, mode: d, doc: m });
        }
        break;
      }
      case L:
        D.push({ ind: f, mode: d, doc: l.contents });
        break;
      case I:
        D.length > 0 && i.push({ ind: f, mode: d, doc: Ae });
        break;
      case x:
        switch (d) {
          case K:
            if (l.hard) a = !0;
            else {
              l.soft || (s.push(" "), (u += 1));
              break;
            }
          case R:
            if (D.length > 0) {
              i.push({ ind: f, mode: d, doc: l }, ...D.reverse()),
                (D.length = 0);
              break;
            }
            l.literal
              ? f.root
                ? (s.push(o, f.root.value), (u = f.root.length))
                : (s.push(o), (u = 0))
              : ((u -= kt(s)), s.push(o + f.value), (u = f.length));
            break;
        }
        break;
      case O:
        i.push({ ind: f, mode: d, doc: l.contents });
        break;
      case b:
        break;
      default:
        throw new q(l);
    }
    i.length === 0 && D.length > 0 && (i.push(...D.reverse()), (D.length = 0));
  }
  let F = s.indexOf(Te);
  if (F !== -1) {
    let f = s.indexOf(Te, F + 1),
      d = s.slice(0, F).join(""),
      l = s.slice(F + 1, f).join(""),
      p = s.slice(f + 1).join("");
    return {
      formatted: d + l + p,
      cursorNodeStart: d.length,
      cursorNodeText: l,
    };
  }
  return { formatted: s.join("") };
}
function J(t) {
  var e;
  if (!t) return "";
  if (Array.isArray(t)) {
    let r = [];
    for (let n of t)
      if (Array.isArray(n)) r.push(...J(n));
      else {
        let o = J(n);
        o !== "" && r.push(o);
      }
    return r;
  }
  return t.type === B
    ? {
        ...t,
        breakContents: J(t.breakContents),
        flatContents: J(t.flatContents),
      }
    : t.type === A
      ? {
          ...t,
          contents: J(t.contents),
          expandedStates: (e = t.expandedStates) == null ? void 0 : e.map(J),
        }
      : t.type === k
        ? { type: "fill", parts: t.parts.map(J) }
        : t.contents
          ? { ...t, contents: J(t.contents) }
          : t;
}
function Sr(t) {
  let e = Object.create(null),
    r = new Set();
  return n(J(t));
  function n(u, i, s) {
    var a, D;
    if (typeof u == "string") return JSON.stringify(u);
    if (Array.isArray(u)) {
      let c = u.map(n).filter(Boolean);
      return c.length === 1 ? c[0] : `[${c.join(", ")}]`;
    }
    if (u.type === x) {
      let c =
        ((a = s == null ? void 0 : s[i + 1]) == null ? void 0 : a.type) === b;
      return u.literal
        ? c
          ? "literalline"
          : "literallineWithoutBreakParent"
        : u.hard
          ? c
            ? "hardline"
            : "hardlineWithoutBreakParent"
          : u.soft
            ? "softline"
            : "line";
    }
    if (u.type === b)
      return ((D = s == null ? void 0 : s[i - 1]) == null ? void 0 : D.type) ===
        x && s[i - 1].hard
        ? void 0
        : "breakParent";
    if (u.type === v) return "trim";
    if (u.type === T) return "indent(" + n(u.contents) + ")";
    if (u.type === S)
      return u.n === Number.NEGATIVE_INFINITY
        ? "dedentToRoot(" + n(u.contents) + ")"
        : u.n < 0
          ? "dedent(" + n(u.contents) + ")"
          : u.n.type === "root"
            ? "markAsRoot(" + n(u.contents) + ")"
            : "align(" + JSON.stringify(u.n) + ", " + n(u.contents) + ")";
    if (u.type === B)
      return (
        "ifBreak(" +
        n(u.breakContents) +
        (u.flatContents ? ", " + n(u.flatContents) : "") +
        (u.groupId
          ? (u.flatContents ? "" : ', ""') + `, { groupId: ${o(u.groupId)} }`
          : "") +
        ")"
      );
    if (u.type === P) {
      let c = [];
      u.negate && c.push("negate: true"),
        u.groupId && c.push(`groupId: ${o(u.groupId)}`);
      let F = c.length > 0 ? `, { ${c.join(", ")} }` : "";
      return `indentIfBreak(${n(u.contents)}${F})`;
    }
    if (u.type === A) {
      let c = [];
      u.break && u.break !== "propagated" && c.push("shouldBreak: true"),
        u.id && c.push(`id: ${o(u.id)}`);
      let F = c.length > 0 ? `, { ${c.join(", ")} }` : "";
      return u.expandedStates
        ? `conditionalGroup([${u.expandedStates
            .map((f) => n(f))
            .join(",")}]${F})`
        : `group(${n(u.contents)}${F})`;
    }
    if (u.type === k) return `fill([${u.parts.map((c) => n(c)).join(", ")}])`;
    if (u.type === L) return "lineSuffix(" + n(u.contents) + ")";
    if (u.type === I) return "lineSuffixBoundary";
    if (u.type === O)
      return `label(${JSON.stringify(u.label)}, ${n(u.contents)})`;
    throw new Error("Unknown doc type " + u.type);
  }
  function o(u) {
    if (typeof u != "symbol") return JSON.stringify(String(u));
    if (u in e) return e[u];
    let i = u.description || "symbol";
    for (let s = 0; ; s++) {
      let a = i + (s > 0 ? ` #${s}` : "");
      if (!r.has(a))
        return r.add(a), (e[u] = `Symbol.for(${JSON.stringify(a)})`);
    }
  }
}
function Iu(t, e, r = 0) {
  let n = 0;
  for (let o = r; o < t.length; ++o) t[o] === "	" ? (n = n + e - (n % e)) : n++;
  return n;
}
var pe = Iu;
var Se = class extends Error {
    name = "ConfigError";
  },
  ve = class extends Error {
    name = "UndefinedParserError";
  };
var vr = {
  cursorOffset: {
    category: "Special",
    type: "int",
    default: -1,
    range: { start: -1, end: 1 / 0, step: 1 },
    description: `Print (to stderr) where a cursor at the given position would move to after formatting.
This option cannot be used with --range-start and --range-end.`,
    cliCategory: "Editor",
  },
  endOfLine: {
    category: "Global",
    type: "choice",
    default: "lf",
    description: "Which end of line characters to apply.",
    choices: [
      {
        value: "lf",
        description:
          "Line Feed only (\\n), common on Linux and macOS as well as inside git repos",
      },
      {
        value: "crlf",
        description:
          "Carriage Return + Line Feed characters (\\r\\n), common on Windows",
      },
      {
        value: "cr",
        description: "Carriage Return character only (\\r), used very rarely",
      },
      {
        value: "auto",
        description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`,
      },
    ],
  },
  filepath: {
    category: "Special",
    type: "path",
    description:
      "Specify the input filepath. This will be used to do parser inference.",
    cliName: "stdin-filepath",
    cliCategory: "Other",
    cliDescription: "Path to the file to pretend that stdin comes from.",
  },
  insertPragma: {
    category: "Special",
    type: "boolean",
    default: !1,
    description: "Insert @format pragma into file's first docblock comment.",
    cliCategory: "Other",
  },
  parser: {
    category: "Global",
    type: "choice",
    default: void 0,
    description: "Which parser to use.",
    exception: (t) => typeof t == "string" || typeof t == "function",
    choices: [
      { value: "flow", description: "Flow" },
      { value: "babel", description: "JavaScript" },
      { value: "babel-flow", description: "Flow" },
      { value: "babel-ts", description: "TypeScript" },
      { value: "typescript", description: "TypeScript" },
      { value: "acorn", description: "JavaScript" },
      { value: "espree", description: "JavaScript" },
      { value: "meriyah", description: "JavaScript" },
      { value: "css", description: "CSS" },
      { value: "less", description: "Less" },
      { value: "scss", description: "SCSS" },
      { value: "json", description: "JSON" },
      { value: "json5", description: "JSON5" },
      { value: "json-stringify", description: "JSON.stringify" },
      { value: "graphql", description: "GraphQL" },
      { value: "markdown", description: "Markdown" },
      { value: "mdx", description: "MDX" },
      { value: "vue", description: "Vue" },
      { value: "yaml", description: "YAML" },
      { value: "glimmer", description: "Ember / Handlebars" },
      { value: "html", description: "HTML" },
      { value: "angular", description: "Angular" },
      { value: "lwc", description: "Lightning Web Components" },
    ],
  },
  plugins: {
    type: "path",
    array: !0,
    default: [{ value: [] }],
    category: "Global",
    description:
      "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
    exception: (t) => typeof t == "string" || typeof t == "object",
    cliName: "plugin",
    cliCategory: "Config",
  },
  printWidth: {
    category: "Global",
    type: "int",
    default: 80,
    description: "The line length where Prettier will try wrap.",
    range: { start: 0, end: 1 / 0, step: 1 },
  },
  rangeEnd: {
    category: "Special",
    type: "int",
    default: 1 / 0,
    range: { start: 0, end: 1 / 0, step: 1 },
    description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.
This option cannot be used with --cursor-offset.`,
    cliCategory: "Editor",
  },
  rangeStart: {
    category: "Special",
    type: "int",
    default: 0,
    range: { start: 0, end: 1 / 0, step: 1 },
    description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.
This option cannot be used with --cursor-offset.`,
    cliCategory: "Editor",
  },
  requirePragma: {
    category: "Special",
    type: "boolean",
    default: !1,
    description: `Require either '@prettier' or '@format' to be present in the file's first docblock comment
in order for it to be formatted.`,
    cliCategory: "Other",
  },
  tabWidth: {
    type: "int",
    category: "Global",
    default: 2,
    description: "Number of spaces per indentation level.",
    range: { start: 0, end: 1 / 0, step: 1 },
  },
  useTabs: {
    category: "Global",
    type: "boolean",
    default: !1,
    description: "Indent with tabs instead of spaces.",
  },
  embeddedLanguageFormatting: {
    category: "Global",
    type: "choice",
    default: "auto",
    description:
      "Control how Prettier formats quoted code embedded in the file.",
    choices: [
      {
        value: "auto",
        description:
          "Format embedded code if Prettier can automatically identify it.",
      },
      {
        value: "off",
        description: "Never automatically format embedded code.",
      },
    ],
  },
};
function et({ plugins: t = [], showDeprecated: e = !1 } = {}) {
  let r = t.flatMap((o) => o.languages ?? []),
    n = [];
  for (let o of Yu(Object.assign({}, ...t.map(({ options: u }) => u), vr)))
    (!e && o.deprecated) ||
      (Array.isArray(o.choices) &&
        (e || (o.choices = o.choices.filter((u) => !u.deprecated)),
        o.name === "parser" &&
          (o.choices = [...o.choices, ...Ru(o.choices, r, t)])),
      (o.pluginDefaults = Object.fromEntries(
        t
          .filter((u) => {
            var i;
            return (
              ((i = u.defaultOptions) == null ? void 0 : i[o.name]) !== void 0
            );
          })
          .map((u) => [u.name, u.defaultOptions[o.name]]),
      )),
      n.push(o));
  return { languages: r, options: n };
}
function* Ru(t, e, r) {
  let n = new Set(t.map((o) => o.value));
  for (let o of e)
    if (o.parsers) {
      for (let u of o.parsers)
        if (!n.has(u)) {
          n.add(u);
          let i = r.find(
              (a) =>
                a.parsers && Object.prototype.hasOwnProperty.call(a.parsers, u),
            ),
            s = o.name;
          i != null && i.name && (s += ` (plugin: ${i.name})`),
            yield { value: u, description: s };
        }
    }
}
function Yu(t) {
  let e = [];
  for (let [r, n] of Object.entries(t)) {
    let o = { name: r, ...n };
    Array.isArray(o.default) && (o.default = y(!1, o.default, -1).value),
      e.push(o);
  }
  return e;
}
var ju = (t) => t.split(/[/\\]/).pop();
function Pr(t, e) {
  if (!e) return;
  let r = ju(e).toLowerCase();
  return t.find((n) => {
    var o, u;
    return (
      ((o = n.extensions) == null ? void 0 : o.some((i) => r.endsWith(i))) ||
      ((u = n.filenames) == null
        ? void 0
        : u.some((i) => i.toLowerCase() === r))
    );
  });
}
function Vu(t, e) {
  if (e)
    return (
      t.find(({ name: r }) => r.toLowerCase() === e) ??
      t.find(({ aliases: r }) => (r == null ? void 0 : r.includes(e))) ??
      t.find(({ extensions: r }) => (r == null ? void 0 : r.includes(`.${e}`)))
    );
}
function $u(t, e) {
  let r = t.plugins.flatMap((o) => o.languages ?? []),
    n =
      Vu(r, e.language) ??
      Pr(r, e.physicalFile) ??
      Pr(r, e.file) ??
      (e.physicalFile, void 0);
  return n == null ? void 0 : n.parsers[0];
}
var Lr = $u;
var te = {
  key: (t) => (/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(t) ? t : JSON.stringify(t)),
  value(t) {
    if (t === null || typeof t != "object") return JSON.stringify(t);
    if (Array.isArray(t)) return `[${t.map((r) => te.value(r)).join(", ")}]`;
    let e = Object.keys(t);
    return e.length === 0
      ? "{}"
      : `{ ${e.map((r) => `${te.key(r)}: ${te.value(t[r])}`).join(", ")} }`;
  },
  pair: ({ key: t, value: e }) => te.value({ [t]: e }),
};
var bt = Ce(Pe(), 1),
  Yr = (t, e, { descriptor: r }) => {
    let n = [
      `${bt.default.yellow(
        typeof t == "string" ? r.key(t) : r.pair(t),
      )} is deprecated`,
    ];
    return (
      e &&
        n.push(
          `we now treat it as ${bt.default.blue(
            typeof e == "string" ? r.key(e) : r.pair(e),
          )}`,
        ),
      n.join("; ") + "."
    );
  };
var se = Ce(Pe(), 1);
var tt = Symbol.for("vnopts.VALUE_NOT_EXIST"),
  de = Symbol.for("vnopts.VALUE_UNCHANGED");
var jr = " ".repeat(2),
  $r = (t, e, r) => {
    let { text: n, list: o } = r.normalizeExpectedResult(
        r.schemas[t].expected(r),
      ),
      u = [];
    return (
      n && u.push(Vr(t, e, n, r.descriptor)),
      o &&
        u.push(
          [Vr(t, e, o.title, r.descriptor)].concat(
            o.values.map((i) => Ur(i, r.loggerPrintWidth)),
          ).join(`
`),
        ),
      Mr(u, r.loggerPrintWidth)
    );
  };
function Vr(t, e, r, n) {
  return [
    `Invalid ${se.default.red(n.key(t))} value.`,
    `Expected ${se.default.blue(r)},`,
    `but received ${
      e === tt ? se.default.gray("nothing") : se.default.red(n.value(e))
    }.`,
  ].join(" ");
}
function Ur({ text: t, list: e }, r) {
  let n = [];
  return (
    t && n.push(`- ${se.default.blue(t)}`),
    e &&
      n.push(
        [`- ${se.default.blue(e.title)}:`].concat(
          e.values.map((o) => Ur(o, r - jr.length).replace(/^|\n/g, `$&${jr}`)),
        ).join(`
`),
      ),
    Mr(n, r)
  );
}
function Mr(t, e) {
  if (t.length === 1) return t[0];
  let [r, n] = t,
    [o, u] = t.map(
      (i) =>
        i.split(
          `
`,
          1,
        )[0].length,
    );
  return o > e && o > u ? n : r;
}
var Nt = Ce(Pe(), 1);
var wt = [],
  Wr = [];
function Ot(t, e) {
  if (t === e) return 0;
  let r = t;
  t.length > e.length && ((t = e), (e = r));
  let n = t.length,
    o = e.length;
  for (; n > 0 && t.charCodeAt(~-n) === e.charCodeAt(~-o); ) n--, o--;
  let u = 0;
  for (; u < n && t.charCodeAt(u) === e.charCodeAt(u); ) u++;
  if (((n -= u), (o -= u), n === 0)) return o;
  let i,
    s,
    a,
    D,
    c = 0,
    F = 0;
  for (; c < n; ) (Wr[c] = t.charCodeAt(u + c)), (wt[c] = ++c);
  for (; F < o; )
    for (i = e.charCodeAt(u + F), a = F++, s = F, c = 0; c < n; c++)
      (D = i === Wr[c] ? a : a + 1),
        (a = wt[c]),
        (s = wt[c] = a > s ? (D > s ? s + 1 : D) : D > a ? a + 1 : D);
  return s;
}
var rt = (t, e, { descriptor: r, logger: n, schemas: o }) => {
  let u = [
      `Ignored unknown option ${Nt.default.yellow(
        r.pair({ key: t, value: e }),
      )}.`,
    ],
    i = Object.keys(o)
      .sort()
      .find((s) => Ot(t, s) < 3);
  i && u.push(`Did you mean ${Nt.default.blue(r.key(i))}?`),
    n.warn(u.join(" "));
};
var Uu = [
  "default",
  "expected",
  "validate",
  "deprecated",
  "forward",
  "redirect",
  "overlap",
  "preprocess",
  "postprocess",
];
function Mu(t, e) {
  let r = new t(e),
    n = Object.create(r);
  for (let o of Uu) o in e && (n[o] = Wu(e[o], r, w.prototype[o].length));
  return n;
}
var w = class {
  static create(e) {
    return Mu(this, e);
  }
  constructor(e) {
    this.name = e.name;
  }
  default(e) {}
  expected(e) {
    return "nothing";
  }
  validate(e, r) {
    return !1;
  }
  deprecated(e, r) {
    return !1;
  }
  forward(e, r) {}
  redirect(e, r) {}
  overlap(e, r, n) {
    return e;
  }
  preprocess(e, r) {
    return e;
  }
  postprocess(e, r) {
    return de;
  }
};
function Wu(t, e, r) {
  return typeof t == "function"
    ? (...n) => t(...n.slice(0, r - 1), e, ...n.slice(r - 1))
    : () => t;
}
var nt = class extends w {
  constructor(e) {
    super(e), (this._sourceName = e.sourceName);
  }
  expected(e) {
    return e.schemas[this._sourceName].expected(e);
  }
  validate(e, r) {
    return r.schemas[this._sourceName].validate(e, r);
  }
  redirect(e, r) {
    return this._sourceName;
  }
};
var ut = class extends w {
  expected() {
    return "anything";
  }
  validate() {
    return !0;
  }
};
var ot = class extends w {
  constructor({ valueSchema: e, name: r = e.name, ...n }) {
    super({ ...n, name: r }), (this._valueSchema = e);
  }
  expected(e) {
    let { text: r, list: n } = e.normalizeExpectedResult(
      this._valueSchema.expected(e),
    );
    return {
      text: r && `an array of ${r}`,
      list: n && {
        title: "an array of the following values",
        values: [{ list: n }],
      },
    };
  }
  validate(e, r) {
    if (!Array.isArray(e)) return !1;
    let n = [];
    for (let o of e) {
      let u = r.normalizeValidateResult(this._valueSchema.validate(o, r), o);
      u !== !0 && n.push(u.value);
    }
    return n.length === 0 ? !0 : { value: n };
  }
  deprecated(e, r) {
    let n = [];
    for (let o of e) {
      let u = r.normalizeDeprecatedResult(
        this._valueSchema.deprecated(o, r),
        o,
      );
      u !== !1 && n.push(...u.map(({ value: i }) => ({ value: [i] })));
    }
    return n;
  }
  forward(e, r) {
    let n = [];
    for (let o of e) {
      let u = r.normalizeForwardResult(this._valueSchema.forward(o, r), o);
      n.push(...u.map(zr));
    }
    return n;
  }
  redirect(e, r) {
    let n = [],
      o = [];
    for (let u of e) {
      let i = r.normalizeRedirectResult(this._valueSchema.redirect(u, r), u);
      "remain" in i && n.push(i.remain), o.push(...i.redirect.map(zr));
    }
    return n.length === 0 ? { redirect: o } : { redirect: o, remain: n };
  }
  overlap(e, r) {
    return e.concat(r);
  }
};
function zr({ from: t, to: e }) {
  return { from: [t], to: e };
}
var it = class extends w {
  expected() {
    return "true or false";
  }
  validate(e) {
    return typeof e == "boolean";
  }
};
function Kr(t, e) {
  let r = Object.create(null);
  for (let n of t) {
    let o = n[e];
    if (r[o]) throw new Error(`Duplicate ${e} ${JSON.stringify(o)}`);
    r[o] = n;
  }
  return r;
}
function Hr(t, e) {
  let r = new Map();
  for (let n of t) {
    let o = n[e];
    if (r.has(o)) throw new Error(`Duplicate ${e} ${JSON.stringify(o)}`);
    r.set(o, n);
  }
  return r;
}
function qr() {
  let t = Object.create(null);
  return (e) => {
    let r = JSON.stringify(e);
    return t[r] ? !0 : ((t[r] = !0), !1);
  };
}
function Jr(t, e) {
  let r = [],
    n = [];
  for (let o of t) e(o) ? r.push(o) : n.push(o);
  return [r, n];
}
function Xr(t) {
  return t === Math.floor(t);
}
function Zr(t, e) {
  if (t === e) return 0;
  let r = typeof t,
    n = typeof e,
    o = ["undefined", "object", "boolean", "number", "string"];
  return r !== n
    ? o.indexOf(r) - o.indexOf(n)
    : r !== "string"
      ? Number(t) - Number(e)
      : t.localeCompare(e);
}
function Qr(t) {
  return (...e) => {
    let r = t(...e);
    return typeof r == "string" ? new Error(r) : r;
  };
}
function Tt(t) {
  return t === void 0 ? {} : t;
}
function St(t) {
  if (typeof t == "string") return { text: t };
  let { text: e, list: r } = t;
  return (
    zu(
      (e || r) !== void 0,
      "Unexpected `expected` result, there should be at least one field.",
    ),
    r
      ? { text: e, list: { title: r.title, values: r.values.map(St) } }
      : { text: e }
  );
}
function vt(t, e) {
  return t === !0 ? !0 : t === !1 ? { value: e } : t;
}
function Pt(t, e, r = !1) {
  return t === !1
    ? !1
    : t === !0
      ? r
        ? !0
        : [{ value: e }]
      : "value" in t
        ? [t]
        : t.length === 0
          ? !1
          : t;
}
function Gr(t, e) {
  return typeof t == "string" || "key" in t
    ? { from: e, to: t }
    : "from" in t
      ? { from: t.from, to: t.to }
      : { from: e, to: t.to };
}
function st(t, e) {
  return t === void 0
    ? []
    : Array.isArray(t)
      ? t.map((r) => Gr(r, e))
      : [Gr(t, e)];
}
function Lt(t, e) {
  let r = st(typeof t == "object" && "redirect" in t ? t.redirect : t, e);
  return r.length === 0
    ? { remain: e, redirect: r }
    : typeof t == "object" && "remain" in t
      ? { remain: t.remain, redirect: r }
      : { redirect: r };
}
function zu(t, e) {
  if (!t) throw new Error(e);
}
var at = class extends w {
  constructor(e) {
    super(e),
      (this._choices = Hr(
        e.choices.map((r) => (r && typeof r == "object" ? r : { value: r })),
        "value",
      ));
  }
  expected({ descriptor: e }) {
    let r = Array.from(this._choices.keys())
        .map((i) => this._choices.get(i))
        .filter(({ hidden: i }) => !i)
        .map((i) => i.value)
        .sort(Zr)
        .map(e.value),
      n = r.slice(0, -2),
      o = r.slice(-2);
    return {
      text: n.concat(o.join(" or ")).join(", "),
      list: { title: "one of the following values", values: r },
    };
  }
  validate(e) {
    return this._choices.has(e);
  }
  deprecated(e) {
    let r = this._choices.get(e);
    return r && r.deprecated ? { value: e } : !1;
  }
  forward(e) {
    let r = this._choices.get(e);
    return r ? r.forward : void 0;
  }
  redirect(e) {
    let r = this._choices.get(e);
    return r ? r.redirect : void 0;
  }
};
var Dt = class extends w {
  expected() {
    return "a number";
  }
  validate(e, r) {
    return typeof e == "number";
  }
};
var ct = class extends Dt {
  expected() {
    return "an integer";
  }
  validate(e, r) {
    return r.normalizeValidateResult(super.validate(e, r), e) === !0 && Xr(e);
  }
};
var Le = class extends w {
  expected() {
    return "a string";
  }
  validate(e) {
    return typeof e == "string";
  }
};
var en = te,
  tn = rt,
  rn = $r,
  nn = Yr;
var lt = class {
  constructor(e, r) {
    let {
      logger: n = console,
      loggerPrintWidth: o = 80,
      descriptor: u = en,
      unknown: i = tn,
      invalid: s = rn,
      deprecated: a = nn,
      missing: D = () => !1,
      required: c = () => !1,
      preprocess: F = (d) => d,
      postprocess: f = () => de,
    } = r || {};
    (this._utils = {
      descriptor: u,
      logger: n || { warn: () => {} },
      loggerPrintWidth: o,
      schemas: Kr(e, "name"),
      normalizeDefaultResult: Tt,
      normalizeExpectedResult: St,
      normalizeDeprecatedResult: Pt,
      normalizeForwardResult: st,
      normalizeRedirectResult: Lt,
      normalizeValidateResult: vt,
    }),
      (this._unknownHandler = i),
      (this._invalidHandler = Qr(s)),
      (this._deprecatedHandler = a),
      (this._identifyMissing = (d, l) => !(d in l) || D(d, l)),
      (this._identifyRequired = c),
      (this._preprocess = F),
      (this._postprocess = f),
      this.cleanHistory();
  }
  cleanHistory() {
    this._hasDeprecationWarned = qr();
  }
  normalize(e) {
    let r = {},
      o = [this._preprocess(e, this._utils)],
      u = () => {
        for (; o.length !== 0; ) {
          let i = o.shift(),
            s = this._applyNormalization(i, r);
          o.push(...s);
        }
      };
    u();
    for (let i of Object.keys(this._utils.schemas)) {
      let s = this._utils.schemas[i];
      if (!(i in r)) {
        let a = Tt(s.default(this._utils));
        "value" in a && o.push({ [i]: a.value });
      }
    }
    u();
    for (let i of Object.keys(this._utils.schemas)) {
      if (!(i in r)) continue;
      let s = this._utils.schemas[i],
        a = r[i],
        D = s.postprocess(a, this._utils);
      D !== de && (this._applyValidation(D, i, s), (r[i] = D));
    }
    return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
  }
  _applyNormalization(e, r) {
    let n = [],
      { knownKeys: o, unknownKeys: u } = this._partitionOptionKeys(e);
    for (let i of o) {
      let s = this._utils.schemas[i],
        a = s.preprocess(e[i], this._utils);
      this._applyValidation(a, i, s);
      let D = ({ from: d, to: l }) => {
          n.push(typeof l == "string" ? { [l]: d } : { [l.key]: l.value });
        },
        c = ({ value: d, redirectTo: l }) => {
          let p = Pt(s.deprecated(d, this._utils), a, !0);
          if (p !== !1)
            if (p === !0)
              this._hasDeprecationWarned(i) ||
                this._utils.logger.warn(
                  this._deprecatedHandler(i, l, this._utils),
                );
            else
              for (let { value: m } of p) {
                let E = { key: i, value: m };
                if (!this._hasDeprecationWarned(E)) {
                  let h = typeof l == "string" ? { key: l, value: m } : l;
                  this._utils.logger.warn(
                    this._deprecatedHandler(E, h, this._utils),
                  );
                }
              }
        };
      st(s.forward(a, this._utils), a).forEach(D);
      let f = Lt(s.redirect(a, this._utils), a);
      if ((f.redirect.forEach(D), "remain" in f)) {
        let d = f.remain;
        (r[i] = i in r ? s.overlap(r[i], d, this._utils) : d), c({ value: d });
      }
      for (let { from: d, to: l } of f.redirect) c({ value: d, redirectTo: l });
    }
    for (let i of u) {
      let s = e[i];
      this._applyUnknownHandler(i, s, r, (a, D) => {
        n.push({ [a]: D });
      });
    }
    return n;
  }
  _applyRequiredCheck(e) {
    for (let r of Object.keys(this._utils.schemas))
      if (this._identifyMissing(r, e) && this._identifyRequired(r))
        throw this._invalidHandler(r, tt, this._utils);
  }
  _partitionOptionKeys(e) {
    let [r, n] = Jr(
      Object.keys(e).filter((o) => !this._identifyMissing(o, e)),
      (o) => o in this._utils.schemas,
    );
    return { knownKeys: r, unknownKeys: n };
  }
  _applyValidation(e, r, n) {
    let o = vt(n.validate(e, this._utils), e);
    if (o !== !0) throw this._invalidHandler(r, o.value, this._utils);
  }
  _applyUnknownHandler(e, r, n, o) {
    let u = this._unknownHandler(e, r, this._utils);
    if (u)
      for (let i of Object.keys(u)) {
        if (this._identifyMissing(i, u)) continue;
        let s = u[i];
        i in this._utils.schemas ? o(i, s) : (n[i] = s);
      }
  }
  _applyPostprocess(e) {
    let r = this._postprocess(e, this._utils);
    if (r !== de) {
      if (r.delete) for (let n of r.delete) delete e[n];
      if (r.override) {
        let { knownKeys: n, unknownKeys: o } = this._partitionOptionKeys(
          r.override,
        );
        for (let u of n) {
          let i = r.override[u];
          this._applyValidation(i, u, this._utils.schemas[u]), (e[u] = i);
        }
        for (let u of o) {
          let i = r.override[u];
          this._applyUnknownHandler(u, i, e, (s, a) => {
            let D = this._utils.schemas[s];
            this._applyValidation(a, s, D), (e[s] = a);
          });
        }
      }
    }
  }
};
var It;
function Ku(
  t,
  e,
  {
    logger: r = !1,
    isCLI: n = !1,
    passThrough: o = !1,
    FlagSchema: u,
    descriptor: i,
  } = {},
) {
  if (n) {
    if (!u) throw new Error("'FlagSchema' option is required.");
    if (!i) throw new Error("'descriptor' option is required.");
  } else i = te;
  let s = o
      ? Array.isArray(o)
        ? (f, d) => (o.includes(f) ? { [f]: d } : void 0)
        : (f, d) => ({ [f]: d })
      : (f, d, l) => {
          let { _: p, ...m } = l.schemas;
          return rt(f, d, { ...l, schemas: m });
        },
    a = Hu(e, { isCLI: n, FlagSchema: u }),
    D = new lt(a, { logger: r, unknown: s, descriptor: i }),
    c = r !== !1;
  c && It && (D._hasDeprecationWarned = It);
  let F = D.normalize(t);
  return c && (It = D._hasDeprecationWarned), F;
}
function Hu(t, { isCLI: e, FlagSchema: r }) {
  let n = [];
  e && n.push(ut.create({ name: "_" }));
  for (let o of t)
    n.push(qu(o, { isCLI: e, optionInfos: t, FlagSchema: r })),
      o.alias && e && n.push(nt.create({ name: o.alias, sourceName: o.name }));
  return n;
}
function qu(t, { isCLI: e, optionInfos: r, FlagSchema: n }) {
  let { name: o } = t,
    u = { name: o },
    i,
    s = {};
  switch (t.type) {
    case "int":
      (i = ct), e && (u.preprocess = Number);
      break;
    case "string":
      i = Le;
      break;
    case "choice":
      (i = at),
        (u.choices = t.choices.map((a) =>
          a != null && a.redirect
            ? { ...a, redirect: { to: { key: t.name, value: a.redirect } } }
            : a,
        ));
      break;
    case "boolean":
      i = it;
      break;
    case "flag":
      (i = n),
        (u.flags = r.flatMap((a) =>
          [
            a.alias,
            a.description && a.name,
            a.oppositeDescription && `no-${a.name}`,
          ].filter(Boolean),
        ));
      break;
    case "path":
      i = Le;
      break;
    default:
      throw new Error(`Unexpected type ${t.type}`);
  }
  if (
    (t.exception
      ? (u.validate = (a, D, c) => t.exception(a) || D.validate(a, c))
      : (u.validate = (a, D, c) => a === void 0 || D.validate(a, c)),
    t.redirect &&
      (s.redirect = (a) =>
        a
          ? { to: { key: t.redirect.option, value: t.redirect.value } }
          : void 0),
    t.deprecated && (s.deprecated = !0),
    e && !t.array)
  ) {
    let a = u.preprocess || ((D) => D);
    u.preprocess = (D, c, F) =>
      c.preprocess(a(Array.isArray(D) ? y(!1, D, -1) : D), F);
  }
  return t.array
    ? ot.create({
        ...(e ? { preprocess: (a) => (Array.isArray(a) ? a : [a]) } : {}),
        ...s,
        valueSchema: i.create(u),
      })
    : i.create({ ...u, ...s });
}
var un = Ku;
function Rt(t, e) {
  if (!e) throw new Error("parserName is required.");
  for (let n = t.length - 1; n >= 0; n--) {
    let o = t[n];
    if (o.parsers && Object.prototype.hasOwnProperty.call(o.parsers, e))
      return o;
  }
  let r = `Couldn't resolve parser "${e}".`;
  throw (
    ((r += " Plugins must be explicitly added to the standalone bundle."),
    new Se(r))
  );
}
function on(t, e) {
  if (!e) throw new Error("astFormat is required.");
  for (let n = t.length - 1; n >= 0; n--) {
    let o = t[n];
    if (o.printers && Object.prototype.hasOwnProperty.call(o.printers, e))
      return o;
  }
  let r = `Couldn't find plugin for AST format "${e}".`;
  throw (
    ((r += " Plugins must be explicitly added to the standalone bundle."),
    new Se(r))
  );
}
function ft({ plugins: t, parser: e }) {
  let r = Rt(t, e);
  return Yt(r, e);
}
function Yt(t, e) {
  let r = t.parsers[e];
  return typeof r == "function" ? r() : r;
}
function sn(t, e) {
  let r = t.printers[e];
  return typeof r == "function" ? r() : r;
}
var an = {
  astFormat: "estree",
  printer: {},
  originalText: void 0,
  locStart: null,
  locEnd: null,
};
async function Ju(t, e = {}) {
  var F;
  let r = { ...t };
  if (!r.parser)
    if (r.filepath) {
      if (((r.parser = Lr(r, { physicalFile: r.filepath })), !r.parser))
        throw new ve(`No parser could be inferred for file "${r.filepath}".`);
    } else
      throw new ve(
        "No parser and no file path given, couldn't infer a parser.",
      );
  let n = et({ plugins: t.plugins, showDeprecated: !0 }).options,
    o = {
      ...an,
      ...Object.fromEntries(
        n.filter((f) => f.default !== void 0).map((f) => [f.name, f.default]),
      ),
    },
    u = Rt(r.plugins, r.parser),
    i = await Yt(u, r.parser);
  (r.astFormat = i.astFormat), (r.locEnd = i.locEnd), (r.locStart = i.locStart);
  let s =
      (F = u.printers) != null && F[i.astFormat]
        ? u
        : on(r.plugins, i.astFormat),
    a = await sn(s, i.astFormat);
  r.printer = a;
  let D = s.defaultOptions
      ? Object.fromEntries(
          Object.entries(s.defaultOptions).filter(([, f]) => f !== void 0),
        )
      : {},
    c = { ...o, ...D };
  for (let [f, d] of Object.entries(c))
    (r[f] === null || r[f] === void 0) && (r[f] = d);
  return (
    r.parser === "json" && (r.trailingComma = "none"),
    un(r, n, { passThrough: Object.keys(an), ...e })
  );
}
var re = Ju;
var Dn = new Set([
    "tokens",
    "comments",
    "parent",
    "enclosingNode",
    "precedingNode",
    "followingNode",
  ]),
  Xu = (t) => Object.keys(t).filter((e) => !Dn.has(e));
function Zu(t) {
  return t ? (e) => t(e, Dn) : Xu;
}
var H = Zu;
function Qu(t, e) {
  let {
    printer: { massageAstNode: r, getVisitorKeys: n },
  } = e;
  if (!r) return t;
  let o = H(n),
    u = r.ignoredProperties ?? new Set();
  return i(t);
  function i(s, a) {
    if (!(s !== null && typeof s == "object")) return s;
    if (Array.isArray(s)) return s.map((f) => i(f, a)).filter(Boolean);
    let D = {},
      c = new Set(o(s));
    for (let f in s)
      !Object.prototype.hasOwnProperty.call(s, f) ||
        u.has(f) ||
        (c.has(f) ? (D[f] = i(s[f], s)) : (D[f] = s[f]));
    let F = r(s, D, a);
    if (F !== null) return F ?? D;
  }
}
var cn = Qu;
var Cn = Ce(hn(), 1);
async function so(t, e) {
  let r = await ft(e),
    n = r.preprocess ? r.preprocess(t, e) : t;
  e.originalText = n;
  let o;
  try {
    o = await r.parse(n, e, e);
  } catch (u) {
    ao(u, t);
  }
  return { text: n, ast: o };
}
function ao(t, e) {
  let { loc: r } = t;
  if (r) {
    let n = (0, Cn.codeFrameColumns)(e, r, { highlightCode: !0 });
    throw (
      ((t.message +=
        `
` + n),
      (t.codeFrame = n),
      t)
    );
  }
  throw t;
}
var ae = so;
var Ie,
  $t,
  Fe,
  dt,
  Vt = class {
    constructor(e) {
      Ct(this, Ie);
      Ct(this, Fe);
      this.stack = [e];
    }
    get key() {
      let { stack: e, siblings: r } = this;
      return y(!1, e, r === null ? -2 : -4) ?? null;
    }
    get index() {
      return this.siblings === null ? null : y(!1, this.stack, -2);
    }
    get node() {
      return y(!1, this.stack, -1);
    }
    get parent() {
      return this.getNode(1);
    }
    get grandparent() {
      return this.getNode(2);
    }
    get isInArray() {
      return this.siblings !== null;
    }
    get siblings() {
      let { stack: e } = this,
        r = y(!1, e, -3);
      return Array.isArray(r) ? r : null;
    }
    get next() {
      let { siblings: e } = this;
      return e === null ? null : e[this.index + 1];
    }
    get previous() {
      let { siblings: e } = this;
      return e === null ? null : e[this.index - 1];
    }
    get isFirst() {
      return this.index === 0;
    }
    get isLast() {
      let { siblings: e, index: r } = this;
      return e !== null && r === e.length - 1;
    }
    get isRoot() {
      return this.stack.length === 1;
    }
    get root() {
      return this.stack[0];
    }
    get ancestors() {
      return [...ce(this, Fe, dt).call(this)];
    }
    getName() {
      let { stack: e } = this,
        { length: r } = e;
      return r > 1 ? y(!1, e, -2) : null;
    }
    getValue() {
      return y(!1, this.stack, -1);
    }
    getNode(e = 0) {
      let r = ce(this, Ie, $t).call(this, e);
      return r === -1 ? null : this.stack[r];
    }
    getParentNode(e = 0) {
      return this.getNode(e + 1);
    }
    call(e, ...r) {
      let { stack: n } = this,
        { length: o } = n,
        u = y(!1, n, -1);
      for (let i of r) (u = u[i]), n.push(i, u);
      try {
        return e(this);
      } finally {
        n.length = o;
      }
    }
    callParent(e, r = 0) {
      let n = ce(this, Ie, $t).call(this, r + 1),
        o = this.stack.splice(n + 1);
      try {
        return e(this);
      } finally {
        this.stack.push(...o);
      }
    }
    each(e, ...r) {
      let { stack: n } = this,
        { length: o } = n,
        u = y(!1, n, -1);
      for (let i of r) (u = u[i]), n.push(i, u);
      try {
        for (let i = 0; i < u.length; ++i)
          n.push(i, u[i]), e(this, i, u), (n.length -= 2);
      } finally {
        n.length = o;
      }
    }
    map(e, ...r) {
      let n = [];
      return (
        this.each(
          (o, u, i) => {
            n[u] = e(o, u, i);
          },
          ...r,
        ),
        n
      );
    }
    match(...e) {
      let r = this.stack.length - 1,
        n = null,
        o = this.stack[r--];
      for (let u of e) {
        if (o === void 0) return !1;
        let i = null;
        if (
          (typeof n == "number" &&
            ((i = n), (n = this.stack[r--]), (o = this.stack[r--])),
          u && !u(o, n, i))
        )
          return !1;
        (n = this.stack[r--]), (o = this.stack[r--]);
      }
      return !0;
    }
    findAncestor(e) {
      for (let r of ce(this, Fe, dt).call(this)) if (e(r)) return r;
    }
    hasAncestor(e) {
      for (let r of ce(this, Fe, dt).call(this)) if (e(r)) return !0;
      return !1;
    }
  };
(Ie = new WeakSet()),
  ($t = function (e) {
    let { stack: r } = this;
    for (let n = r.length - 1; n >= 0; n -= 2)
      if (!Array.isArray(r[n]) && --e < 0) return n;
    return -1;
  }),
  (Fe = new WeakSet()),
  (dt = function* () {
    let { stack: e } = this;
    for (let r = e.length - 3; r >= 0; r -= 2) {
      let n = e[r];
      Array.isArray(n) || (yield n);
    }
  });
var gn = Vt;
var yn = new Proxy(() => {}, { get: () => yn }),
  Re = yn;
function me(t) {
  return (e, r, n) => {
    let o = !!(n != null && n.backwards);
    if (r === !1) return !1;
    let { length: u } = e,
      i = r;
    for (; i >= 0 && i < u; ) {
      let s = e.charAt(i);
      if (t instanceof RegExp) {
        if (!t.test(s)) return i;
      } else if (!t.includes(s)) return i;
      o ? i-- : i++;
    }
    return i === -1 || i === u ? i : !1;
  };
}
var xn = me(/\s/),
  N = me(" 	"),
  Ft = me(",; 	"),
  mt = me(/[^\n\r]/);
function Do(t, e, r) {
  let n = !!(r != null && r.backwards);
  if (e === !1) return !1;
  let o = t.charAt(e);
  if (n) {
    if (
      t.charAt(e - 1) === "\r" &&
      o ===
        `
`
    )
      return e - 2;
    if (
      o ===
        `
` ||
      o === "\r" ||
      o === "\u2028" ||
      o === "\u2029"
    )
      return e - 1;
  } else {
    if (
      o === "\r" &&
      t.charAt(e + 1) ===
        `
`
    )
      return e + 2;
    if (
      o ===
        `
` ||
      o === "\r" ||
      o === "\u2028" ||
      o === "\u2029"
    )
      return e + 1;
  }
  return e;
}
var Y = Do;
function co(t, e, r = {}) {
  let n = N(t, r.backwards ? e - 1 : e, r),
    o = Y(t, n, r);
  return n !== o;
}
var V = co;
function lo(t) {
  return Array.isArray(t) && t.length > 0;
}
var Ut = lo;
function fo(t) {
  return t !== null && typeof t == "object";
}
var _n = fo;
function* Mt(t, e) {
  let { getVisitorKeys: r, filter: n = () => !0 } = e,
    o = (u) => _n(u) && n(u);
  for (let u of r(t)) {
    let i = t[u];
    if (Array.isArray(i)) for (let s of i) o(s) && (yield s);
    else o(i) && (yield i);
  }
}
function* An(t, e) {
  let r = [t];
  for (let n = 0; n < r.length; n++) {
    let o = r[n];
    for (let u of Mt(o, e)) yield u, r.push(u);
  }
}
function po(t) {
  let e = t.type || t.kind || "(unknown type)",
    r = String(
      t.name ||
        (t.id && (typeof t.id == "object" ? t.id.name : t.id)) ||
        (t.key && (typeof t.key == "object" ? t.key.name : t.key)) ||
        (t.value && (typeof t.value == "object" ? "" : String(t.value))) ||
        t.operator ||
        "",
    );
  return (
    r.length > 20 && (r = r.slice(0, 19) + "\u2026"), e + (r ? " " + r : "")
  );
}
function Wt(t, e) {
  (t.comments ?? (t.comments = [])).push(e),
    (e.printed = !1),
    (e.nodeDescription = po(t));
}
function ne(t, e) {
  (e.leading = !0), (e.trailing = !1), Wt(t, e);
}
function X(t, e, r) {
  (e.leading = !1), (e.trailing = !1), r && (e.marker = r), Wt(t, e);
}
function ue(t, e) {
  (e.leading = !1), (e.trailing = !0), Wt(t, e);
}
var zt = new WeakMap();
function Et(t, e) {
  if (zt.has(t)) return zt.get(t);
  let {
    printer: {
      getCommentChildNodes: r,
      canAttachComment: n,
      getVisitorKeys: o,
    },
    locStart: u,
    locEnd: i,
  } = e;
  if (!n) return [];
  let s = (
    (r == null ? void 0 : r(t, e)) ?? [...Mt(t, { getVisitorKeys: H(o) })]
  ).flatMap((a) => (n(a) ? [a] : Et(a, e)));
  return s.sort((a, D) => u(a) - u(D) || i(a) - i(D)), zt.set(t, s), s;
}
function kn(t, e, r, n) {
  let { locStart: o, locEnd: u } = r,
    i = o(e),
    s = u(e),
    a = Et(t, r),
    D,
    c,
    F = 0,
    f = a.length;
  for (; F < f; ) {
    let d = (F + f) >> 1,
      l = a[d],
      p = o(l),
      m = u(l);
    if (p <= i && s <= m) return kn(l, e, r, l);
    if (m <= i) {
      (D = l), (F = d + 1);
      continue;
    }
    if (s <= p) {
      (c = l), (f = d);
      continue;
    }
    throw new Error("Comment location overlaps with node location");
  }
  if ((n == null ? void 0 : n.type) === "TemplateLiteral") {
    let { quasis: d } = n,
      l = Kt(d, e, r);
    D && Kt(d, D, r) !== l && (D = null), c && Kt(d, c, r) !== l && (c = null);
  }
  return { enclosingNode: n, precedingNode: D, followingNode: c };
}
var Gt = () => !1;
function bn(t, e) {
  let { comments: r } = t;
  if ((delete t.comments, !Ut(r) || !e.printer.canAttachComment)) return;
  let n = [],
    {
      locStart: o,
      locEnd: u,
      printer: {
        experimentalFeatures: { avoidAstMutation: i = !1 } = {},
        handleComments: s = {},
      },
      originalText: a,
    } = e,
    { ownLine: D = Gt, endOfLine: c = Gt, remaining: F = Gt } = s,
    f = r.map((d, l) => ({
      ...kn(t, d, e),
      comment: d,
      text: a,
      options: e,
      ast: t,
      isLastComment: r.length - 1 === l,
    }));
  for (let [d, l] of f.entries()) {
    let {
      comment: p,
      precedingNode: m,
      enclosingNode: E,
      followingNode: h,
      text: g,
      options: C,
      ast: _,
      isLastComment: Z,
    } = l;
    if (
      C.parser === "json" ||
      C.parser === "json5" ||
      C.parser === "__js_expression" ||
      C.parser === "__ts_expression" ||
      C.parser === "__vue_expression" ||
      C.parser === "__vue_ts_expression"
    ) {
      if (o(p) - o(_) <= 0) {
        ne(_, p);
        continue;
      }
      if (u(p) - u(_) >= 0) {
        ue(_, p);
        continue;
      }
    }
    let $;
    if (
      (i
        ? ($ = [l])
        : ((p.enclosingNode = E),
          (p.precedingNode = m),
          (p.followingNode = h),
          ($ = [p, g, C, _, Z])),
      Fo(g, C, f, d))
    )
      (p.placement = "ownLine"),
        D(...$) || (h ? ne(h, p) : m ? ue(m, p) : E ? X(E, p) : X(_, p));
    else if (mo(g, C, f, d))
      (p.placement = "endOfLine"),
        c(...$) || (m ? ue(m, p) : h ? ne(h, p) : E ? X(E, p) : X(_, p));
    else if (((p.placement = "remaining"), !F(...$)))
      if (m && h) {
        let Q = n.length;
        Q > 0 && n[Q - 1].followingNode !== h && Bn(n, C), n.push(l);
      } else m ? ue(m, p) : h ? ne(h, p) : E ? X(E, p) : X(_, p);
  }
  if ((Bn(n, e), !i))
    for (let d of r)
      delete d.precedingNode, delete d.enclosingNode, delete d.followingNode;
}
var wn = (t) => !/[\S\n\u2028\u2029]/.test(t);
function Fo(t, e, r, n) {
  let { comment: o, precedingNode: u } = r[n],
    { locStart: i, locEnd: s } = e,
    a = i(o);
  if (u)
    for (let D = n - 1; D >= 0; D--) {
      let { comment: c, precedingNode: F } = r[D];
      if (F !== u || !wn(t.slice(s(c), a))) break;
      a = i(c);
    }
  return V(t, a, { backwards: !0 });
}
function mo(t, e, r, n) {
  let { comment: o, followingNode: u } = r[n],
    { locStart: i, locEnd: s } = e,
    a = s(o);
  if (u)
    for (let D = n + 1; D < r.length; D++) {
      let { comment: c, followingNode: F } = r[D];
      if (F !== u || !wn(t.slice(a, i(c)))) break;
      a = s(c);
    }
  return V(t, a);
}
function Bn(t, e) {
  var s, a;
  let r = t.length;
  if (r === 0) return;
  let { precedingNode: n, followingNode: o } = t[0],
    u = e.locStart(o),
    i;
  for (i = r; i > 0; --i) {
    let { comment: D, precedingNode: c, followingNode: F } = t[i - 1];
    Re.strictEqual(c, n), Re.strictEqual(F, o);
    let f = e.originalText.slice(e.locEnd(D), u);
    if (
      ((a = (s = e.printer).isGap) == null ? void 0 : a.call(s, f, e)) ??
      /^[\s(]*$/.test(f)
    )
      u = e.locStart(D);
    else break;
  }
  for (let [D, { comment: c }] of t.entries()) D < i ? ue(n, c) : ne(o, c);
  for (let D of [n, o])
    D.comments &&
      D.comments.length > 1 &&
      D.comments.sort((c, F) => e.locStart(c) - e.locStart(F));
  t.length = 0;
}
function Kt(t, e, r) {
  let n = r.locStart(e) - 1;
  for (let o = 1; o < t.length; ++o) if (n < r.locStart(t[o])) return o - 1;
  return 0;
}
function Eo(t, e) {
  let r = e - 1;
  (r = N(t, r, { backwards: !0 })),
    (r = Y(t, r, { backwards: !0 })),
    (r = N(t, r, { backwards: !0 }));
  let n = Y(t, r, { backwards: !0 });
  return r !== n;
}
var Ye = Eo;
function On(t, e) {
  let r = t.node;
  return (r.printed = !0), e.printer.printComment(t, e);
}
function ho(t, e) {
  var c;
  let r = t.node,
    n = [On(t, e)],
    { printer: o, originalText: u, locStart: i, locEnd: s } = e;
  if ((c = o.isBlockComment) == null ? void 0 : c.call(o, r)) {
    let F = V(u, s(r)) ? (V(u, i(r), { backwards: !0 }) ? G : Ke) : " ";
    n.push(F);
  } else n.push(G);
  let D = Y(u, N(u, s(r)));
  return D !== !1 && V(u, D) && n.push(G), n;
}
function Co(t, e, r) {
  var D;
  let n = t.node,
    o = On(t, e),
    { printer: u, originalText: i, locStart: s } = e,
    a = (D = u.isBlockComment) == null ? void 0 : D.call(u, n);
  if (
    (r != null && r.hasLineSuffix && !(r != null && r.isBlock)) ||
    V(i, s(n), { backwards: !0 })
  ) {
    let c = Ye(i, s(n));
    return { doc: _e([G, c ? G : "", o]), isBlock: a, hasLineSuffix: !0 };
  }
  return !a || (r != null && r.hasLineSuffix)
    ? { doc: [_e([" ", o]), le], isBlock: a, hasLineSuffix: !0 }
    : { doc: [" ", o], isBlock: a, hasLineSuffix: !1 };
}
function go(t, e) {
  let r = t.node;
  if (!r) return {};
  let n = e[Symbol.for("printedComments")];
  if ((r.comments || []).filter((a) => !n.has(a)).length === 0)
    return { leading: "", trailing: "" };
  let u = [],
    i = [],
    s;
  return (
    t.each(() => {
      let a = t.node;
      if (n != null && n.has(a)) return;
      let { leading: D, trailing: c } = a;
      D ? u.push(ho(t, e)) : c && ((s = Co(t, e, s)), i.push(s.doc));
    }, "comments"),
    { leading: u, trailing: i }
  );
}
function Nn(t, e, r) {
  let { leading: n, trailing: o } = go(t, r);
  return !n && !o ? e : Ze(e, (u) => [n, u, o]);
}
function Tn(t) {
  let { [Symbol.for("comments")]: e, [Symbol.for("printedComments")]: r } = t;
  for (let n of e) {
    if (!n.printed && !r.has(n))
      throw new Error(
        'Comment "' +
          n.value.trim() +
          '" was not printed. Please report this error!',
      );
    delete n.printed;
  }
}
async function Sn(t, e, r, n, o) {
  let {
    embeddedLanguageFormatting: u,
    printer: { embed: i, hasPrettierIgnore: s = () => !1, getVisitorKeys: a },
  } = r;
  if (!i || u !== "auto") return;
  if (i.length > 2)
    throw new Error(
      "printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/en/plugins.html#optional-embed",
    );
  let D = H(i.getVisitorKeys ?? a),
    c = [];
  d();
  let F = t.stack;
  for (let { print: l, node: p, pathStack: m } of c)
    try {
      t.stack = m;
      let E = await l(f, e, t, r);
      E && o.set(p, E);
    } catch (E) {
      if (globalThis.PRETTIER_DEBUG) throw E;
    }
  t.stack = F;
  function f(l, p) {
    return yo(l, p, r, n);
  }
  function d() {
    let { node: l } = t;
    if (l === null || typeof l != "object" || s(t)) return;
    for (let m of D(l)) Array.isArray(l[m]) ? t.each(d, m) : t.call(d, m);
    let p = i(t, r);
    if (p) {
      if (typeof p == "function") {
        c.push({ print: p, node: l, pathStack: [...t.stack] });
        return;
      }
      o.set(l, p);
    }
  }
}
async function yo(t, e, r, n) {
  let o = await re(
      { ...r, ...e, parentParser: r.parser, originalText: t },
      { passThrough: !0 },
    ),
    { ast: u } = await ae(t, o),
    i = await n(u, o);
  return Xe(i);
}
function xo(t) {
  return () => {};
}
var vn = xo;
function _o(t, e) {
  let {
      originalText: r,
      [Symbol.for("comments")]: n,
      locStart: o,
      locEnd: u,
      [Symbol.for("printedComments")]: i,
    } = e,
    { node: s } = t,
    a = o(s),
    D = u(s);
  for (let c of n) o(c) >= a && u(c) <= D && i.add(c);
  return r.slice(a, D);
}
var Pn = _o;
async function je(t, e) {
  ({ ast: t } = await Ht(t, e));
  let r = new Map(),
    n = new gn(t),
    o = vn(e),
    u = new Map();
  await Sn(n, s, e, je, u);
  let i = await Ln(n, e, s, void 0, u);
  return Tn(e), i;
  function s(D, c) {
    return D === void 0 || D === n
      ? a(c)
      : Array.isArray(D)
        ? n.call(() => a(c), ...D)
        : n.call(() => a(c), D);
  }
  function a(D) {
    o(n);
    let c = n.node;
    if (c == null) return "";
    let F = c && typeof c == "object" && D === void 0;
    if (F && r.has(c)) return r.get(c);
    let f = Ln(n, e, s, D, u);
    return F && r.set(c, f), f;
  }
}
function Ln(t, e, r, n, o) {
  var a;
  let { node: u } = t,
    { printer: i } = e,
    s;
  return (
    (a = i.hasPrettierIgnore) != null && a.call(i, t)
      ? (s = Pn(t, e))
      : o.has(u)
        ? (s = o.get(u))
        : (s = i.print(t, e, r, n)),
    u === e.cursorNode && (s = Ze(s, (D) => [Be, D, Be])),
    i.printComment &&
      (!i.willPrintOwnComments || !i.willPrintOwnComments(t, e)) &&
      (s = Nn(t, s, e)),
    s
  );
}
async function Ht(t, e) {
  let r = t.comments ?? [];
  (e[Symbol.for("comments")] = r),
    (e[Symbol.for("tokens")] = t.tokens ?? []),
    (e[Symbol.for("printedComments")] = new Set()),
    bn(t, e);
  let {
    printer: { preprocess: n },
  } = e;
  return (t = n ? await n(t, e) : t), { ast: t, comments: r };
}
var Ao = ({ parser: t }) =>
  t === "json" || t === "json5" || t === "json-stringify";
function Bo(t, e) {
  let r = [t.node, ...t.parentNodes],
    n = new Set([e.node, ...e.parentNodes]);
  return r.find((o) => Yn.has(o.type) && n.has(o));
}
function In(t) {
  let e = t.length - 1;
  for (;;) {
    let r = t[e];
    if (
      (r == null ? void 0 : r.type) === "Program" ||
      (r == null ? void 0 : r.type) === "File"
    )
      e--;
    else break;
  }
  return t.slice(0, e + 1);
}
function ko(t, e, { locStart: r, locEnd: n }) {
  let o = t.node,
    u = e.node;
  if (o === u) return { startNode: o, endNode: u };
  let i = r(t.node);
  for (let a of In(e.parentNodes))
    if (r(a) >= i) u = a;
    else break;
  let s = n(e.node);
  for (let a of In(t.parentNodes)) {
    if (n(a) <= s) o = a;
    else break;
    if (o === u) break;
  }
  return { startNode: o, endNode: u };
}
function qt(t, e, r, n, o = [], u) {
  let { locStart: i, locEnd: s } = r,
    a = i(t),
    D = s(t);
  if (
    !(
      e > D ||
      e < a ||
      (u === "rangeEnd" && e === a) ||
      (u === "rangeStart" && e === D)
    )
  ) {
    for (let c of Et(t, r)) {
      let F = qt(c, e, r, n, [t, ...o], u);
      if (F) return F;
    }
    if (!n || n(t, o[0])) return { node: t, parentNodes: o };
  }
}
function bo(t, e) {
  return (
    e !== "DeclareExportDeclaration" &&
    t !== "TypeParameterDeclaration" &&
    (t === "Directive" ||
      t === "TypeAlias" ||
      t === "TSExportAssignment" ||
      t.startsWith("Declare") ||
      t.startsWith("TSDeclare") ||
      t.endsWith("Statement") ||
      t.endsWith("Declaration"))
  );
}
var Yn = new Set([
    "JsonRoot",
    "ObjectExpression",
    "ArrayExpression",
    "StringLiteral",
    "NumericLiteral",
    "BooleanLiteral",
    "NullLiteral",
    "UnaryExpression",
    "TemplateLiteral",
  ]),
  wo = new Set([
    "OperationDefinition",
    "FragmentDefinition",
    "VariableDefinition",
    "TypeExtensionDefinition",
    "ObjectTypeDefinition",
    "FieldDefinition",
    "DirectiveDefinition",
    "EnumTypeDefinition",
    "EnumValueDefinition",
    "InputValueDefinition",
    "InputObjectTypeDefinition",
    "SchemaDefinition",
    "OperationTypeDefinition",
    "InterfaceTypeDefinition",
    "UnionTypeDefinition",
    "ScalarTypeDefinition",
  ]);
function Rn(t, e, r) {
  if (!e) return !1;
  switch (t.parser) {
    case "flow":
    case "babel":
    case "babel-flow":
    case "babel-ts":
    case "typescript":
    case "acorn":
    case "espree":
    case "meriyah":
    case "__babel_estree":
      return bo(e.type, r == null ? void 0 : r.type);
    case "json":
    case "json5":
    case "json-stringify":
      return Yn.has(e.type);
    case "graphql":
      return wo.has(e.kind);
    case "vue":
      return e.tag !== "root";
  }
  return !1;
}
function jn(t, e, r) {
  let { rangeStart: n, rangeEnd: o, locStart: u, locEnd: i } = e;
  Re.ok(o > n);
  let s = t.slice(n, o).search(/\S/),
    a = s === -1;
  if (!a) for (n += s; o > n && !/\S/.test(t[o - 1]); --o);
  let D = qt(r, n, e, (d, l) => Rn(e, d, l), [], "rangeStart"),
    c = a ? D : qt(r, o, e, (d) => Rn(e, d), [], "rangeEnd");
  if (!D || !c) return { rangeStart: 0, rangeEnd: 0 };
  let F, f;
  if (Ao(e)) {
    let d = Bo(D, c);
    (F = d), (f = d);
  } else ({ startNode: F, endNode: f } = ko(D, c, e));
  return { rangeStart: Math.min(u(F), u(f)), rangeEnd: Math.max(i(F), i(f)) };
}
function Oo(t, e) {
  let { cursorOffset: r, locStart: n, locEnd: o } = e,
    u = H(e.printer.getVisitorKeys),
    i = (a) => n(a) <= r && o(a) >= r,
    s = t;
  for (let a of An(t, { getVisitorKeys: u, filter: i })) s = a;
  return s;
}
var Vn = Oo;
var zn = "\uFEFF",
  $n = Symbol("cursor");
async function Gn(t, e, r = 0) {
  if (!t || t.trim().length === 0)
    return { formatted: "", cursorOffset: -1, comments: [] };
  let { ast: n, text: o } = await ae(t, e);
  e.cursorOffset >= 0 && (e.cursorNode = Vn(n, e));
  let u = await je(n, e, r);
  r > 0 && (u = qe([G, u], r, e.tabWidth));
  let i = fe(u, e);
  if (r > 0) {
    let a = i.formatted.trim();
    i.cursorNodeStart !== void 0 &&
      (i.cursorNodeStart -= i.formatted.indexOf(a)),
      (i.formatted = a + be(e.endOfLine));
  }
  let s = e[Symbol.for("comments")];
  if (e.cursorOffset >= 0) {
    let a, D, c, F, f;
    if (
      (e.cursorNode && i.cursorNodeText
        ? ((a = e.locStart(e.cursorNode)),
          (D = o.slice(a, e.locEnd(e.cursorNode))),
          (c = e.cursorOffset - a),
          (F = i.cursorNodeStart),
          (f = i.cursorNodeText))
        : ((a = 0), (D = o), (c = e.cursorOffset), (F = 0), (f = i.formatted)),
      D === f)
    )
      return { formatted: i.formatted, cursorOffset: F + c, comments: s };
    let d = D.split("");
    d.splice(c, 0, $n);
    let l = f.split(""),
      p = (0, Wn.diffArrays)(d, l),
      m = F;
    for (let E of p)
      if (E.removed) {
        if (E.value.includes($n)) break;
      } else m += E.count;
    return { formatted: i.formatted, cursorOffset: m, comments: s };
  }
  return { formatted: i.formatted, cursorOffset: -1, comments: s };
}
async function No(t, e) {
  let { ast: r, text: n } = await ae(t, e),
    { rangeStart: o, rangeEnd: u } = jn(n, e, r),
    i = n.slice(o, u),
    s = Math.min(
      o,
      n.lastIndexOf(
        `
`,
        o,
      ) + 1,
    ),
    a = n.slice(s, o).match(/^\s*/)[0],
    D = pe(a, e.tabWidth),
    c = await Gn(
      i,
      {
        ...e,
        rangeStart: 0,
        rangeEnd: Number.POSITIVE_INFINITY,
        cursorOffset:
          e.cursorOffset > o && e.cursorOffset <= u ? e.cursorOffset - o : -1,
        endOfLine: "lf",
      },
      D,
    ),
    F = c.formatted.trimEnd(),
    { cursorOffset: f } = e;
  f > u
    ? (f += F.length - i.length)
    : c.cursorOffset >= 0 && (f = c.cursorOffset + o);
  let d = n.slice(0, o) + F + n.slice(u);
  if (e.endOfLine !== "lf") {
    let l = be(e.endOfLine);
    f >= 0 &&
      l ===
        `\r
` &&
      (f += At(
        d.slice(0, f),
        `
`,
      )),
      (d = ee(
        !1,
        d,
        `
`,
        l,
      ));
  }
  return { formatted: d, cursorOffset: f, comments: c.comments };
}
function Jt(t, e, r) {
  return typeof e != "number" || Number.isNaN(e) || e < 0 || e > t.length
    ? r
    : e;
}
function Un(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: o } = e;
  return (
    (r = Jt(t, r, -1)),
    (n = Jt(t, n, 0)),
    (o = Jt(t, o, t.length)),
    { ...e, cursorOffset: r, rangeStart: n, rangeEnd: o }
  );
}
function Kn(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: o, endOfLine: u } = Un(t, e),
    i = t.charAt(0) === zn;
  if (
    (i && ((t = t.slice(1)), r--, n--, o--),
    u === "auto" && (u = Cr(t)),
    t.includes("\r"))
  ) {
    let s = (a) =>
      At(
        t.slice(0, Math.max(a, 0)),
        `\r
`,
      );
    (r -= s(r)), (n -= s(n)), (o -= s(o)), (t = gr(t));
  }
  return {
    hasBOM: i,
    text: t,
    options: Un(t, {
      ...e,
      cursorOffset: r,
      rangeStart: n,
      rangeEnd: o,
      endOfLine: u,
    }),
  };
}
async function Mn(t, e) {
  let r = await ft(e);
  return !r.hasPragma || r.hasPragma(t);
}
async function Xt(t, e) {
  let { hasBOM: r, text: n, options: o } = Kn(t, await re(e));
  if (
    (o.rangeStart >= o.rangeEnd && n !== "") ||
    (o.requirePragma && !(await Mn(n, o)))
  )
    return { formatted: t, cursorOffset: e.cursorOffset, comments: [] };
  let u;
  return (
    o.rangeStart > 0 || o.rangeEnd < n.length
      ? (u = await No(n, o))
      : (!o.requirePragma &&
          o.insertPragma &&
          o.printer.insertPragma &&
          !(await Mn(n, o)) &&
          (n = o.printer.insertPragma(n)),
        (u = await Gn(n, o))),
    r &&
      ((u.formatted = zn + u.formatted),
      u.cursorOffset >= 0 && u.cursorOffset++),
    u
  );
}
async function Hn(t, e, r) {
  let { text: n, options: o } = Kn(t, await re(e)),
    u = await ae(n, o);
  return (
    r &&
      (r.preprocessForPrint && (u.ast = await Ht(u.ast, o)),
      r.massage && (u.ast = cn(u.ast, o))),
    u
  );
}
async function qn(t, e) {
  e = await re(e);
  let r = await je(t, e);
  return fe(r, e);
}
async function Jn(t, e) {
  let r = Sr(t),
    { formatted: n } = await Xt(r, { ...e, parser: "__js_expression" });
  return n;
}
async function Xn(t, e) {
  e = await re(e);
  let { ast: r } = await ae(t, e);
  return je(r, e);
}
async function Zn(t, e) {
  return fe(t, await re(e));
}
var Qt = {};
Me(Qt, {
  addDanglingComment: () => X,
  addLeadingComment: () => ne,
  addTrailingComment: () => ue,
  getAlignmentSize: () => pe,
  getIndentSize: () => eu,
  getMaxContinuousCount: () => Qn,
  getNextNonSpaceNonCommentCharacter: () => nu,
  getNextNonSpaceNonCommentCharacterIndex: () => Mo,
  getStringWidth: () => we,
  hasNewline: () => V,
  hasNewlineInRange: () => tu,
  hasSpaces: () => ru,
  isNextLineEmpty: () => Ko,
  isNextLineEmptyAfterIndex: () => ht,
  isPreviousLineEmpty: () => zo,
  makeString: () => uu,
  skip: () => me,
  skipEverythingButNewLine: () => mt,
  skipInlineComment: () => Ee,
  skipNewline: () => Y,
  skipSpaces: () => N,
  skipToLineEnd: () => Ft,
  skipTrailingComment: () => he,
  skipWhitespace: () => xn,
});
function So(t, e) {
  if (e === !1) return !1;
  if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
    for (let r = e + 2; r < t.length; ++r)
      if (t.charAt(r) === "*" && t.charAt(r + 1) === "/") return r + 2;
  }
  return e;
}
var Ee = So;
function vo(t, e) {
  return e === !1
    ? !1
    : t.charAt(e) === "/" && t.charAt(e + 1) === "/"
      ? mt(t, e)
      : e;
}
var he = vo;
function Po(t, e) {
  let r = null,
    n = e;
  for (; n !== r; )
    (r = n), (n = N(t, n)), (n = Ee(t, n)), (n = he(t, n)), (n = Y(t, n));
  return n;
}
var Ve = Po;
function Lo(t, e) {
  let r = null,
    n = e;
  for (; n !== r; ) (r = n), (n = Ft(t, n)), (n = Ee(t, n)), (n = N(t, n));
  return (n = he(t, n)), (n = Y(t, n)), n !== !1 && V(t, n);
}
var ht = Lo;
function Zt(t) {
  if (typeof t != "string") throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Io(t, e) {
  let r = t.match(new RegExp(`(${Zt(e)})+`, "g"));
  return r === null
    ? 0
    : r.reduce((n, o) => Math.max(n, o.length / e.length), 0);
}
var Qn = Io;
function Ro(t, e) {
  let r = t.lastIndexOf(`
`);
  return r === -1 ? 0 : pe(t.slice(r + 1).match(/^[\t ]*/)[0], e);
}
var eu = Ro;
function Yo(t, e, r) {
  for (let n = e; n < r; ++n)
    if (
      t.charAt(n) ===
      `
`
    )
      return !0;
  return !1;
}
var tu = Yo;
function jo(t, e, r = {}) {
  return N(t, r.backwards ? e - 1 : e, r) !== e;
}
var ru = jo;
function Vo(t, e) {
  let r = Ve(t, e);
  return r === !1 ? "" : t.charAt(r);
}
var nu = Vo;
function $o(t, e, r) {
  let n = e === '"' ? "'" : '"',
    u = ee(!1, t, /\\(.)|(["'])/gs, (i, s, a) =>
      s === n
        ? s
        : a === e
          ? "\\" + a
          : a ||
            (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(s)
              ? s
              : "\\" + s),
    );
  return e + u + e;
}
var uu = $o;
function Uo(t, e, r) {
  return Ve(t, r(e));
}
function Mo(t, e) {
  return arguments.length === 2 || typeof e == "number"
    ? Ve(t, e)
    : Uo(...arguments);
}
function Wo(t, e, r) {
  return Ye(t, r(e));
}
function zo(t, e) {
  return arguments.length === 2 || typeof e == "number"
    ? Ye(t, e)
    : Wo(...arguments);
}
function Go(t, e, r) {
  return ht(t, r(e));
}
function Ko(t, e) {
  return arguments.length === 2 || typeof e == "number"
    ? ht(t, e)
    : Go(...arguments);
}
var er = {};
Me(er, { builders: () => Ho, printer: () => qo, utils: () => Jo });
var Ho = {
    join: ke,
    line: Ke,
    softline: Er,
    hardline: G,
    literalline: He,
    group: xt,
    conditionalGroup: fr,
    fill: Ge,
    lineSuffix: _e,
    lineSuffixBoundary: Fr,
    cursor: Be,
    breakParent: le,
    ifBreak: pr,
    trim: mr,
    indent: ie,
    indentIfBreak: dr,
    align: oe,
    addAlignmentToDoc: qe,
    markAsRoot: cr,
    dedentToRoot: Dr,
    dedent: lr,
    hardlineWithoutBreakParent: Ae,
    literallineWithoutBreakParent: _t,
    label: hr,
    concat: (t) => t,
  },
  qo = { printDocToString: fe },
  Jo = {
    willBreak: kr,
    traverseDoc: xe,
    findInDoc: Je,
    mapDoc: Ne,
    removeLines: wr,
    stripTrailingHardline: Xe,
    replaceEndOfLine: Or,
    canBreak: Nr,
  };
var ou = "3.0.3";
function De(t, e = 1) {
  return async (...r) => {
    let n = r[e] ?? {},
      o = n.plugins ?? [];
    return (
      (r[e] = { ...n, plugins: Array.isArray(o) ? o : Object.values(o) }),
      t(...r)
    );
  };
}
var iu = De(Xt);
async function su(t, e) {
  let { formatted: r } = await iu(t, { ...e, cursorOffset: -1 });
  return r;
}
async function Xo(t, e) {
  return (await su(t, e)) === t;
}
var Zo = De(et, 0),
  Qo = {
    parse: De(Hn),
    formatAST: De(qn),
    formatDoc: De(Jn),
    printToDoc: De(Xn),
    printDocToString: De(Zn),
  };
var Uc = tr;
export {
  Qo as __debug,
  Xo as check,
  Uc as default,
  er as doc,
  su as format,
  iu as formatWithCursor,
  Zo as getSupportInfo,
  Qt as util,
  ou as version,
};
