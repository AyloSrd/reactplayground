var Vl = Object.create;
var Zr = Object.defineProperty;
var Yl = Object.getOwnPropertyDescriptor;
var Gl = Object.getOwnPropertyNames;
var Kl = Object.getPrototypeOf,
  Hl = Object.prototype.hasOwnProperty;
var y = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  Os = (t, e) => {
    for (var n in e) Zr(t, n, { get: e[n], enumerable: !0 });
  },
  Ql = (t, e, n, r) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let s of Gl(e))
        !Hl.call(t, s) &&
          s !== n &&
          Zr(t, s, {
            get: () => e[s],
            enumerable: !(r = Yl(e, s)) || r.enumerable,
          });
    return t;
  };
var ue = (t, e, n) => (
  (n = t != null ? Vl(Kl(t)) : {}),
  Ql(
    e || !t || !t.__esModule
      ? Zr(n, "default", { value: t, enumerable: !0 })
      : n,
    t,
  )
);
var Qs = y((pe) => {
  "use strict";
  Object.defineProperty(pe, "__esModule", { value: !0 });
  pe.extract = gc;
  pe.parse = vc;
  pe.parseWithComments = Hs;
  pe.print = xc;
  pe.strip = wc;
  var pc = /\*\/$/,
    hc = /^\/\*\*?/,
    Gs = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
    dc = /(^|\s+)\/\/([^\r\n]*)/g,
    zs = /^(\r?\n)+/,
    mc =
      /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g,
    Vs = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g,
    yc = /(\r?\n|^) *\* ?/g,
    Ks = [];
  function gc(t) {
    let e = t.match(Gs);
    return e ? e[0].trimLeft() : "";
  }
  function wc(t) {
    let e = t.match(Gs);
    return e && e[0] ? t.substring(e[0].length) : t;
  }
  function vc(t) {
    return Hs(t).pragmas;
  }
  function Hs(t) {
    let e = `
`;
    t = t.replace(hc, "").replace(pc, "").replace(yc, "$1");
    let n = "";
    for (; n !== t; ) (n = t), (t = t.replace(mc, `${e}$1 $2${e}`));
    t = t.replace(zs, "").trimRight();
    let r = Object.create(null),
      s = t.replace(Vs, "").replace(zs, "").trimRight(),
      i;
    for (; (i = Vs.exec(t)); ) {
      let o = i[2].replace(dc, "");
      typeof r[i[1]] == "string" || Array.isArray(r[i[1]])
        ? (r[i[1]] = Ks.concat(r[i[1]], o))
        : (r[i[1]] = o);
    }
    return { comments: s, pragmas: r };
  }
  function xc({ comments: t = "", pragmas: e = {} }) {
    let n = `
`,
      r = "/**",
      s = " *",
      i = " */",
      o = Object.keys(e),
      a = o
        .map((c) => Ys(c, e[c]))
        .reduce((c, f) => c.concat(f), [])
        .map((c) => `${s} ${c}${n}`)
        .join("");
    if (!t) {
      if (o.length === 0) return "";
      if (o.length === 1 && !Array.isArray(e[o[0]])) {
        let c = e[o[0]];
        return `${r} ${Ys(o[0], c)[0]}${i}`;
      }
    }
    let u =
      t
        .split(n)
        .map((c) => `${s} ${c}`)
        .join(n) + n;
    return r + n + (t ? u : "") + (t && o.length ? s + n : "") + a + i;
  }
  function Ys(t, e) {
    return Ks.concat(e).map((n) => `@${t} ${n}`.trim());
  }
});
var zt = y((dx, gn) => {
  "use strict";
  gn.exports.isClean = Symbol("isClean");
  gn.exports.my = Symbol("my");
});
var Ui = y((mx, wn) => {
  var E = String,
    $i = function () {
      return {
        isColorSupported: !1,
        reset: E,
        bold: E,
        dim: E,
        italic: E,
        underline: E,
        inverse: E,
        hidden: E,
        strikethrough: E,
        black: E,
        red: E,
        green: E,
        yellow: E,
        blue: E,
        magenta: E,
        cyan: E,
        white: E,
        gray: E,
        bgBlack: E,
        bgRed: E,
        bgGreen: E,
        bgYellow: E,
        bgBlue: E,
        bgMagenta: E,
        bgCyan: E,
        bgWhite: E,
      };
    };
  wn.exports = $i();
  wn.exports.createColors = $i;
});
var vn = y(() => {});
var Vt = y((wx, Vi) => {
  "use strict";
  var Wi = Ui(),
    zi = vn(),
    st = class t extends Error {
      constructor(e, n, r, s, i, o) {
        super(e),
          (this.name = "CssSyntaxError"),
          (this.reason = e),
          i && (this.file = i),
          s && (this.source = s),
          o && (this.plugin = o),
          typeof n < "u" &&
            typeof r < "u" &&
            (typeof n == "number"
              ? ((this.line = n), (this.column = r))
              : ((this.line = n.line),
                (this.column = n.column),
                (this.endLine = r.line),
                (this.endColumn = r.column))),
          this.setMessage(),
          Error.captureStackTrace && Error.captureStackTrace(this, t);
      }
      setMessage() {
        (this.message = this.plugin ? this.plugin + ": " : ""),
          (this.message += this.file ? this.file : "<css input>"),
          typeof this.line < "u" &&
            (this.message += ":" + this.line + ":" + this.column),
          (this.message += ": " + this.reason);
      }
      showSourceCode(e) {
        if (!this.source) return "";
        let n = this.source;
        e == null && (e = Wi.isColorSupported), zi && e && (n = zi(n));
        let r = n.split(/\r?\n/),
          s = Math.max(this.line - 3, 0),
          i = Math.min(this.line + 2, r.length),
          o = String(i).length,
          a,
          u;
        if (e) {
          let { bold: c, gray: f, red: p } = Wi.createColors(!0);
          (a = (l) => c(p(l))), (u = (l) => f(l));
        } else a = u = (c) => c;
        return r.slice(s, i).map((c, f) => {
          let p = s + 1 + f,
            l = " " + (" " + p).slice(-o) + " | ";
          if (p === this.line) {
            let g =
              u(l.replace(/\d/g, " ")) +
              c.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return (
              a(">") +
              u(l) +
              c +
              `
 ` +
              g +
              a("^")
            );
          }
          return " " + u(l) + c;
        }).join(`
`);
      }
      toString() {
        let e = this.showSourceCode();
        return (
          e &&
            (e =
              `

` +
              e +
              `
`),
          this.name + ": " + this.message + e
        );
      }
    };
  Vi.exports = st;
  st.default = st;
});
var Yt = y((vx, Gi) => {
  "use strict";
  var Yi = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1,
  };
  function Qc(t) {
    return t[0].toUpperCase() + t.slice(1);
  }
  var it = class {
    constructor(e) {
      this.builder = e;
    }
    atrule(e, n) {
      let r = "@" + e.name,
        s = e.params ? this.rawValue(e, "params") : "";
      if (
        (typeof e.raws.afterName < "u"
          ? (r += e.raws.afterName)
          : s && (r += " "),
        e.nodes)
      )
        this.block(e, r + s);
      else {
        let i = (e.raws.between || "") + (n ? ";" : "");
        this.builder(r + s + i, e);
      }
    }
    beforeAfter(e, n) {
      let r;
      e.type === "decl"
        ? (r = this.raw(e, null, "beforeDecl"))
        : e.type === "comment"
          ? (r = this.raw(e, null, "beforeComment"))
          : n === "before"
            ? (r = this.raw(e, null, "beforeRule"))
            : (r = this.raw(e, null, "beforeClose"));
      let s = e.parent,
        i = 0;
      for (; s && s.type !== "root"; ) (i += 1), (s = s.parent);
      if (
        r.includes(`
`)
      ) {
        let o = this.raw(e, null, "indent");
        if (o.length) for (let a = 0; a < i; a++) r += o;
      }
      return r;
    }
    block(e, n) {
      let r = this.raw(e, "between", "beforeOpen");
      this.builder(n + r + "{", e, "start");
      let s;
      e.nodes && e.nodes.length
        ? (this.body(e), (s = this.raw(e, "after")))
        : (s = this.raw(e, "after", "emptyBody")),
        s && this.builder(s),
        this.builder("}", e, "end");
    }
    body(e) {
      let n = e.nodes.length - 1;
      for (; n > 0 && e.nodes[n].type === "comment"; ) n -= 1;
      let r = this.raw(e, "semicolon");
      for (let s = 0; s < e.nodes.length; s++) {
        let i = e.nodes[s],
          o = this.raw(i, "before");
        o && this.builder(o), this.stringify(i, n !== s || r);
      }
    }
    comment(e) {
      let n = this.raw(e, "left", "commentLeft"),
        r = this.raw(e, "right", "commentRight");
      this.builder("/*" + n + e.text + r + "*/", e);
    }
    decl(e, n) {
      let r = this.raw(e, "between", "colon"),
        s = e.prop + r + this.rawValue(e, "value");
      e.important && (s += e.raws.important || " !important"),
        n && (s += ";"),
        this.builder(s, e);
    }
    document(e) {
      this.body(e);
    }
    raw(e, n, r) {
      let s;
      if ((r || (r = n), n && ((s = e.raws[n]), typeof s < "u"))) return s;
      let i = e.parent;
      if (
        r === "before" &&
        (!i ||
          (i.type === "root" && i.first === e) ||
          (i && i.type === "document"))
      )
        return "";
      if (!i) return Yi[r];
      let o = e.root();
      if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u"))
        return o.rawCache[r];
      if (r === "before" || r === "after") return this.beforeAfter(e, r);
      {
        let a = "raw" + Qc(r);
        this[a]
          ? (s = this[a](o, e))
          : o.walk((u) => {
              if (((s = u.raws[n]), typeof s < "u")) return !1;
            });
      }
      return typeof s > "u" && (s = Yi[r]), (o.rawCache[r] = s), s;
    }
    rawBeforeClose(e) {
      let n;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
            return (
              (n = r.raws.after),
              n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        n && (n = n.replace(/\S/g, "")),
        n
      );
    }
    rawBeforeComment(e, n) {
      let r;
      return (
        e.walkComments((s) => {
          if (typeof s.raws.before < "u")
            return (
              (r = s.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r > "u"
          ? (r = this.raw(n, null, "beforeDecl"))
          : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeDecl(e, n) {
      let r;
      return (
        e.walkDecls((s) => {
          if (typeof s.raws.before < "u")
            return (
              (r = s.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r > "u"
          ? (r = this.raw(n, null, "beforeRule"))
          : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeOpen(e) {
      let n;
      return (
        e.walk((r) => {
          if (r.type !== "decl" && ((n = r.raws.between), typeof n < "u"))
            return !1;
        }),
        n
      );
    }
    rawBeforeRule(e) {
      let n;
      return (
        e.walk((r) => {
          if (
            r.nodes &&
            (r.parent !== e || e.first !== r) &&
            typeof r.raws.before < "u"
          )
            return (
              (n = r.raws.before),
              n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        n && (n = n.replace(/\S/g, "")),
        n
      );
    }
    rawColon(e) {
      let n;
      return (
        e.walkDecls((r) => {
          if (typeof r.raws.between < "u")
            return (n = r.raws.between.replace(/[^\s:]/g, "")), !1;
        }),
        n
      );
    }
    rawEmptyBody(e) {
      let n;
      return (
        e.walk((r) => {
          if (
            r.nodes &&
            r.nodes.length === 0 &&
            ((n = r.raws.after), typeof n < "u")
          )
            return !1;
        }),
        n
      );
    }
    rawIndent(e) {
      if (e.raws.indent) return e.raws.indent;
      let n;
      return (
        e.walk((r) => {
          let s = r.parent;
          if (
            s &&
            s !== e &&
            s.parent &&
            s.parent === e &&
            typeof r.raws.before < "u"
          ) {
            let i = r.raws.before.split(`
`);
            return (n = i[i.length - 1]), (n = n.replace(/\S/g, "")), !1;
          }
        }),
        n
      );
    }
    rawSemicolon(e) {
      let n;
      return (
        e.walk((r) => {
          if (
            r.nodes &&
            r.nodes.length &&
            r.last.type === "decl" &&
            ((n = r.raws.semicolon), typeof n < "u")
          )
            return !1;
        }),
        n
      );
    }
    rawValue(e, n) {
      let r = e[n],
        s = e.raws[n];
      return s && s.value === r ? s.raw : r;
    }
    root(e) {
      this.body(e), e.raws.after && this.builder(e.raws.after);
    }
    rule(e) {
      this.block(e, this.rawValue(e, "selector")),
        e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
    }
    stringify(e, n) {
      if (!this[e.type])
        throw new Error(
          "Unknown AST node type " +
            e.type +
            ". Maybe you need to change PostCSS stringifier.",
        );
      this[e.type](e, n);
    }
  };
  Gi.exports = it;
  it.default = it;
});
var ot = y((xx, Ki) => {
  "use strict";
  var jc = Yt();
  function xn(t, e) {
    new jc(e).stringify(t);
  }
  Ki.exports = xn;
  xn.default = xn;
});
var ut = y((bx, Hi) => {
  "use strict";
  var { isClean: Gt, my: Jc } = zt(),
    Xc = Vt(),
    Zc = Yt(),
    ef = ot();
  function bn(t, e) {
    let n = new t.constructor();
    for (let r in t) {
      if (!Object.prototype.hasOwnProperty.call(t, r) || r === "proxyCache")
        continue;
      let s = t[r],
        i = typeof s;
      r === "parent" && i === "object"
        ? e && (n[r] = e)
        : r === "source"
          ? (n[r] = s)
          : Array.isArray(s)
            ? (n[r] = s.map((o) => bn(o, n)))
            : (i === "object" && s !== null && (s = bn(s)), (n[r] = s));
    }
    return n;
  }
  var at = class {
    constructor(e = {}) {
      (this.raws = {}), (this[Gt] = !1), (this[Jc] = !0);
      for (let n in e)
        if (n === "nodes") {
          this.nodes = [];
          for (let r of e[n])
            typeof r.clone == "function"
              ? this.append(r.clone())
              : this.append(r);
        } else this[n] = e[n];
    }
    addToError(e) {
      if (
        ((e.postcssNode = this),
        e.stack && this.source && /\n\s{4}at /.test(e.stack))
      ) {
        let n = this.source;
        e.stack = e.stack.replace(
          /\n\s{4}at /,
          `$&${n.input.from}:${n.start.line}:${n.start.column}$&`,
        );
      }
      return e;
    }
    after(e) {
      return this.parent.insertAfter(this, e), this;
    }
    assign(e = {}) {
      for (let n in e) this[n] = e[n];
      return this;
    }
    before(e) {
      return this.parent.insertBefore(this, e), this;
    }
    cleanRaws(e) {
      delete this.raws.before,
        delete this.raws.after,
        e || delete this.raws.between;
    }
    clone(e = {}) {
      let n = bn(this);
      for (let r in e) n[r] = e[r];
      return n;
    }
    cloneAfter(e = {}) {
      let n = this.clone(e);
      return this.parent.insertAfter(this, n), n;
    }
    cloneBefore(e = {}) {
      let n = this.clone(e);
      return this.parent.insertBefore(this, n), n;
    }
    error(e, n = {}) {
      if (this.source) {
        let { end: r, start: s } = this.rangeBy(n);
        return this.source.input.error(
          e,
          { column: s.column, line: s.line },
          { column: r.column, line: r.line },
          n,
        );
      }
      return new Xc(e);
    }
    getProxyProcessor() {
      return {
        get(e, n) {
          return n === "proxyOf"
            ? e
            : n === "root"
              ? () => e.root().toProxy()
              : e[n];
        },
        set(e, n, r) {
          return (
            e[n] === r ||
              ((e[n] = r),
              (n === "prop" ||
                n === "value" ||
                n === "name" ||
                n === "params" ||
                n === "important" ||
                n === "text") &&
                e.markDirty()),
            !0
          );
        },
      };
    }
    markDirty() {
      if (this[Gt]) {
        this[Gt] = !1;
        let e = this;
        for (; (e = e.parent); ) e[Gt] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e + 1];
    }
    positionBy(e, n) {
      let r = this.source.start;
      if (e.index) r = this.positionInside(e.index, n);
      else if (e.word) {
        n = this.toString();
        let s = n.indexOf(e.word);
        s !== -1 && (r = this.positionInside(s, n));
      }
      return r;
    }
    positionInside(e, n) {
      let r = n || this.toString(),
        s = this.source.start.column,
        i = this.source.start.line;
      for (let o = 0; o < e; o++)
        r[o] ===
        `
`
          ? ((s = 1), (i += 1))
          : (s += 1);
      return { column: s, line: i };
    }
    prev() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e - 1];
    }
    get proxyOf() {
      return this;
    }
    rangeBy(e) {
      let n = {
          column: this.source.start.column,
          line: this.source.start.line,
        },
        r = this.source.end
          ? { column: this.source.end.column + 1, line: this.source.end.line }
          : { column: n.column + 1, line: n.line };
      if (e.word) {
        let s = this.toString(),
          i = s.indexOf(e.word);
        i !== -1 &&
          ((n = this.positionInside(i, s)),
          (r = this.positionInside(i + e.word.length, s)));
      } else
        e.start
          ? (n = { column: e.start.column, line: e.start.line })
          : e.index && (n = this.positionInside(e.index)),
          e.end
            ? (r = { column: e.end.column, line: e.end.line })
            : e.endIndex
              ? (r = this.positionInside(e.endIndex))
              : e.index && (r = this.positionInside(e.index + 1));
      return (
        (r.line < n.line || (r.line === n.line && r.column <= n.column)) &&
          (r = { column: n.column + 1, line: n.line }),
        { end: r, start: n }
      );
    }
    raw(e, n) {
      return new Zc().raw(this, e, n);
    }
    remove() {
      return (
        this.parent && this.parent.removeChild(this),
        (this.parent = void 0),
        this
      );
    }
    replaceWith(...e) {
      if (this.parent) {
        let n = this,
          r = !1;
        for (let s of e)
          s === this
            ? (r = !0)
            : r
              ? (this.parent.insertAfter(n, s), (n = s))
              : this.parent.insertBefore(n, s);
        r || this.remove();
      }
      return this;
    }
    root() {
      let e = this;
      for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
      return e;
    }
    toJSON(e, n) {
      let r = {},
        s = n == null;
      n = n || new Map();
      let i = 0;
      for (let o in this) {
        if (
          !Object.prototype.hasOwnProperty.call(this, o) ||
          o === "parent" ||
          o === "proxyCache"
        )
          continue;
        let a = this[o];
        if (Array.isArray(a))
          r[o] = a.map((u) =>
            typeof u == "object" && u.toJSON ? u.toJSON(null, n) : u,
          );
        else if (typeof a == "object" && a.toJSON) r[o] = a.toJSON(null, n);
        else if (o === "source") {
          let u = n.get(a.input);
          u == null && ((u = i), n.set(a.input, i), i++),
            (r[o] = { end: a.end, inputId: u, start: a.start });
        } else r[o] = a;
      }
      return s && (r.inputs = [...n.keys()].map((o) => o.toJSON())), r;
    }
    toProxy() {
      return (
        this.proxyCache ||
          (this.proxyCache = new Proxy(this, this.getProxyProcessor())),
        this.proxyCache
      );
    }
    toString(e = ef) {
      e.stringify && (e = e.stringify);
      let n = "";
      return (
        e(this, (r) => {
          n += r;
        }),
        n
      );
    }
    warn(e, n, r) {
      let s = { node: this };
      for (let i in r) s[i] = r[i];
      return e.warn(n, s);
    }
  };
  Hi.exports = at;
  at.default = at;
});
var ct = y((kx, Qi) => {
  "use strict";
  var tf = ut(),
    lt = class extends tf {
      constructor(e) {
        e &&
          typeof e.value < "u" &&
          typeof e.value != "string" &&
          (e = { ...e, value: String(e.value) }),
          super(e),
          (this.type = "decl");
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
  Qi.exports = lt;
  lt.default = lt;
});
var Ae = y((_x, ji) => {
  "use strict";
  var rf = ut(),
    ft = class extends rf {
      constructor(e) {
        super(e), (this.type = "comment");
      }
    };
  ji.exports = ft;
  ft.default = ft;
});
var se = y((Tx, io) => {
  "use strict";
  var { isClean: Ji, my: Xi } = zt(),
    Zi = ct(),
    eo = Ae(),
    nf = ut(),
    to,
    kn,
    _n,
    ro;
  function no(t) {
    return t.map(
      (e) => (e.nodes && (e.nodes = no(e.nodes)), delete e.source, e),
    );
  }
  function so(t) {
    if (((t[Ji] = !1), t.proxyOf.nodes)) for (let e of t.proxyOf.nodes) so(e);
  }
  var z = class t extends nf {
    append(...e) {
      for (let n of e) {
        let r = this.normalize(n, this.last);
        for (let s of r) this.proxyOf.nodes.push(s);
      }
      return this.markDirty(), this;
    }
    cleanRaws(e) {
      if ((super.cleanRaws(e), this.nodes))
        for (let n of this.nodes) n.cleanRaws(e);
    }
    each(e) {
      if (!this.proxyOf.nodes) return;
      let n = this.getIterator(),
        r,
        s;
      for (
        ;
        this.indexes[n] < this.proxyOf.nodes.length &&
        ((r = this.indexes[n]), (s = e(this.proxyOf.nodes[r], r)), s !== !1);

      )
        this.indexes[n] += 1;
      return delete this.indexes[n], s;
    }
    every(e) {
      return this.nodes.every(e);
    }
    get first() {
      if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0),
        this.indexes || (this.indexes = {}),
        (this.lastEach += 1);
      let e = this.lastEach;
      return (this.indexes[e] = 0), e;
    }
    getProxyProcessor() {
      return {
        get(e, n) {
          return n === "proxyOf"
            ? e
            : e[n]
              ? n === "each" || (typeof n == "string" && n.startsWith("walk"))
                ? (...r) =>
                    e[n](
                      ...r.map((s) =>
                        typeof s == "function"
                          ? (i, o) => s(i.toProxy(), o)
                          : s,
                      ),
                    )
                : n === "every" || n === "some"
                  ? (r) => e[n]((s, ...i) => r(s.toProxy(), ...i))
                  : n === "root"
                    ? () => e.root().toProxy()
                    : n === "nodes"
                      ? e.nodes.map((r) => r.toProxy())
                      : n === "first" || n === "last"
                        ? e[n].toProxy()
                        : e[n]
              : e[n];
        },
        set(e, n, r) {
          return (
            e[n] === r ||
              ((e[n] = r),
              (n === "name" || n === "params" || n === "selector") &&
                e.markDirty()),
            !0
          );
        },
      };
    }
    index(e) {
      return typeof e == "number"
        ? e
        : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
    }
    insertAfter(e, n) {
      let r = this.index(e),
        s = this.normalize(n, this.proxyOf.nodes[r]).reverse();
      r = this.index(e);
      for (let o of s) this.proxyOf.nodes.splice(r + 1, 0, o);
      let i;
      for (let o in this.indexes)
        (i = this.indexes[o]), r < i && (this.indexes[o] = i + s.length);
      return this.markDirty(), this;
    }
    insertBefore(e, n) {
      let r = this.index(e),
        s = r === 0 ? "prepend" : !1,
        i = this.normalize(n, this.proxyOf.nodes[r], s).reverse();
      r = this.index(e);
      for (let a of i) this.proxyOf.nodes.splice(r, 0, a);
      let o;
      for (let a in this.indexes)
        (o = this.indexes[a]), r <= o && (this.indexes[a] = o + i.length);
      return this.markDirty(), this;
    }
    get last() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    normalize(e, n) {
      if (typeof e == "string") e = no(to(e).nodes);
      else if (Array.isArray(e)) {
        e = e.slice(0);
        for (let s of e) s.parent && s.parent.removeChild(s, "ignore");
      } else if (e.type === "root" && this.type !== "document") {
        e = e.nodes.slice(0);
        for (let s of e) s.parent && s.parent.removeChild(s, "ignore");
      } else if (e.type) e = [e];
      else if (e.prop) {
        if (typeof e.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof e.value != "string" && (e.value = String(e.value)),
          (e = [new Zi(e)]);
      } else if (e.selector) e = [new kn(e)];
      else if (e.name) e = [new _n(e)];
      else if (e.text) e = [new eo(e)];
      else throw new Error("Unknown node type in node creation");
      return e.map(
        (s) => (
          s[Xi] || t.rebuild(s),
          (s = s.proxyOf),
          s.parent && s.parent.removeChild(s),
          s[Ji] && so(s),
          typeof s.raws.before > "u" &&
            n &&
            typeof n.raws.before < "u" &&
            (s.raws.before = n.raws.before.replace(/\S/g, "")),
          (s.parent = this.proxyOf),
          s
        ),
      );
    }
    prepend(...e) {
      e = e.reverse();
      for (let n of e) {
        let r = this.normalize(n, this.first, "prepend").reverse();
        for (let s of r) this.proxyOf.nodes.unshift(s);
        for (let s in this.indexes)
          this.indexes[s] = this.indexes[s] + r.length;
      }
      return this.markDirty(), this;
    }
    push(e) {
      return (e.parent = this), this.proxyOf.nodes.push(e), this;
    }
    removeAll() {
      for (let e of this.proxyOf.nodes) e.parent = void 0;
      return (this.proxyOf.nodes = []), this.markDirty(), this;
    }
    removeChild(e) {
      (e = this.index(e)),
        (this.proxyOf.nodes[e].parent = void 0),
        this.proxyOf.nodes.splice(e, 1);
      let n;
      for (let r in this.indexes)
        (n = this.indexes[r]), n >= e && (this.indexes[r] = n - 1);
      return this.markDirty(), this;
    }
    replaceValues(e, n, r) {
      return (
        r || ((r = n), (n = {})),
        this.walkDecls((s) => {
          (n.props && !n.props.includes(s.prop)) ||
            (n.fast && !s.value.includes(n.fast)) ||
            (s.value = s.value.replace(e, r));
        }),
        this.markDirty(),
        this
      );
    }
    some(e) {
      return this.nodes.some(e);
    }
    walk(e) {
      return this.each((n, r) => {
        let s;
        try {
          s = e(n, r);
        } catch (i) {
          throw n.addToError(i);
        }
        return s !== !1 && n.walk && (s = n.walk(e)), s;
      });
    }
    walkAtRules(e, n) {
      return n
        ? e instanceof RegExp
          ? this.walk((r, s) => {
              if (r.type === "atrule" && e.test(r.name)) return n(r, s);
            })
          : this.walk((r, s) => {
              if (r.type === "atrule" && r.name === e) return n(r, s);
            })
        : ((n = e),
          this.walk((r, s) => {
            if (r.type === "atrule") return n(r, s);
          }));
    }
    walkComments(e) {
      return this.walk((n, r) => {
        if (n.type === "comment") return e(n, r);
      });
    }
    walkDecls(e, n) {
      return n
        ? e instanceof RegExp
          ? this.walk((r, s) => {
              if (r.type === "decl" && e.test(r.prop)) return n(r, s);
            })
          : this.walk((r, s) => {
              if (r.type === "decl" && r.prop === e) return n(r, s);
            })
        : ((n = e),
          this.walk((r, s) => {
            if (r.type === "decl") return n(r, s);
          }));
    }
    walkRules(e, n) {
      return n
        ? e instanceof RegExp
          ? this.walk((r, s) => {
              if (r.type === "rule" && e.test(r.selector)) return n(r, s);
            })
          : this.walk((r, s) => {
              if (r.type === "rule" && r.selector === e) return n(r, s);
            })
        : ((n = e),
          this.walk((r, s) => {
            if (r.type === "rule") return n(r, s);
          }));
    }
  };
  z.registerParse = (t) => {
    to = t;
  };
  z.registerRule = (t) => {
    kn = t;
  };
  z.registerAtRule = (t) => {
    _n = t;
  };
  z.registerRoot = (t) => {
    ro = t;
  };
  io.exports = z;
  z.default = z;
  z.rebuild = (t) => {
    t.type === "atrule"
      ? Object.setPrototypeOf(t, _n.prototype)
      : t.type === "rule"
        ? Object.setPrototypeOf(t, kn.prototype)
        : t.type === "decl"
          ? Object.setPrototypeOf(t, Zi.prototype)
          : t.type === "comment"
            ? Object.setPrototypeOf(t, eo.prototype)
            : t.type === "root" && Object.setPrototypeOf(t, ro.prototype),
      (t[Xi] = !0),
      t.nodes &&
        t.nodes.forEach((e) => {
          z.rebuild(e);
        });
  };
});
var er = y((Ex, lo) => {
  "use strict";
  var Tn = "'".charCodeAt(0),
    oo = '"'.charCodeAt(0),
    Kt = "\\".charCodeAt(0),
    ao = "/".charCodeAt(0),
    Ht = `
`.charCodeAt(0),
    pt = " ".charCodeAt(0),
    Qt = "\f".charCodeAt(0),
    jt = "	".charCodeAt(0),
    Jt = "\r".charCodeAt(0),
    sf = "[".charCodeAt(0),
    of = "]".charCodeAt(0),
    af = "(".charCodeAt(0),
    uf = ")".charCodeAt(0),
    lf = "{".charCodeAt(0),
    cf = "}".charCodeAt(0),
    ff = ";".charCodeAt(0),
    pf = "*".charCodeAt(0),
    hf = ":".charCodeAt(0),
    df = "@".charCodeAt(0),
    Xt = /[\t\n\f\r "#'()/;[\\\]{}]/g,
    Zt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
    mf = /.[\n"'(/\\]/,
    uo = /[\da-f]/i;
  lo.exports = function (e, n = {}) {
    let r = e.css.valueOf(),
      s = n.ignoreErrors,
      i,
      o,
      a,
      u,
      c,
      f,
      p,
      l,
      g,
      x,
      h = r.length,
      d = 0,
      m = [],
      b = [];
    function w() {
      return d;
    }
    function v(U) {
      throw e.error("Unclosed " + U, d);
    }
    function N() {
      return b.length === 0 && d >= h;
    }
    function $(U) {
      if (b.length) return b.pop();
      if (d >= h) return;
      let S = U ? U.ignoreUnclosed : !1;
      switch (((i = r.charCodeAt(d)), i)) {
        case Ht:
        case pt:
        case jt:
        case Jt:
        case Qt: {
          o = d;
          do (o += 1), (i = r.charCodeAt(o));
          while (i === pt || i === Ht || i === jt || i === Jt || i === Qt);
          (x = ["space", r.slice(d, o)]), (d = o - 1);
          break;
        }
        case sf:
        case of:
        case lf:
        case cf:
        case hf:
        case ff:
        case uf: {
          let C = String.fromCharCode(i);
          x = [C, C, d];
          break;
        }
        case af: {
          if (
            ((l = m.length ? m.pop()[1] : ""),
            (g = r.charCodeAt(d + 1)),
            l === "url" &&
              g !== Tn &&
              g !== oo &&
              g !== pt &&
              g !== Ht &&
              g !== jt &&
              g !== Qt &&
              g !== Jt)
          ) {
            o = d;
            do {
              if (((f = !1), (o = r.indexOf(")", o + 1)), o === -1))
                if (s || S) {
                  o = d;
                  break;
                } else v("bracket");
              for (p = o; r.charCodeAt(p - 1) === Kt; ) (p -= 1), (f = !f);
            } while (f);
            (x = ["brackets", r.slice(d, o + 1), d, o]), (d = o);
          } else
            (o = r.indexOf(")", d + 1)),
              (u = r.slice(d, o + 1)),
              o === -1 || mf.test(u)
                ? (x = ["(", "(", d])
                : ((x = ["brackets", u, d, o]), (d = o));
          break;
        }
        case Tn:
        case oo: {
          (a = i === Tn ? "'" : '"'), (o = d);
          do {
            if (((f = !1), (o = r.indexOf(a, o + 1)), o === -1))
              if (s || S) {
                o = d + 1;
                break;
              } else v("string");
            for (p = o; r.charCodeAt(p - 1) === Kt; ) (p -= 1), (f = !f);
          } while (f);
          (x = ["string", r.slice(d, o + 1), d, o]), (d = o);
          break;
        }
        case df: {
          (Xt.lastIndex = d + 1),
            Xt.test(r),
            Xt.lastIndex === 0 ? (o = r.length - 1) : (o = Xt.lastIndex - 2),
            (x = ["at-word", r.slice(d, o + 1), d, o]),
            (d = o);
          break;
        }
        case Kt: {
          for (o = d, c = !0; r.charCodeAt(o + 1) === Kt; ) (o += 1), (c = !c);
          if (
            ((i = r.charCodeAt(o + 1)),
            c &&
              i !== ao &&
              i !== pt &&
              i !== Ht &&
              i !== jt &&
              i !== Jt &&
              i !== Qt &&
              ((o += 1), uo.test(r.charAt(o))))
          ) {
            for (; uo.test(r.charAt(o + 1)); ) o += 1;
            r.charCodeAt(o + 1) === pt && (o += 1);
          }
          (x = ["word", r.slice(d, o + 1), d, o]), (d = o);
          break;
        }
        default: {
          i === ao && r.charCodeAt(d + 1) === pf
            ? ((o = r.indexOf("*/", d + 2) + 1),
              o === 0 && (s || S ? (o = r.length) : v("comment")),
              (x = ["comment", r.slice(d, o + 1), d, o]),
              (d = o))
            : ((Zt.lastIndex = d + 1),
              Zt.test(r),
              Zt.lastIndex === 0 ? (o = r.length - 1) : (o = Zt.lastIndex - 2),
              (x = ["word", r.slice(d, o + 1), d, o]),
              m.push(x),
              (d = o));
          break;
        }
      }
      return d++, x;
    }
    function H(U) {
      b.push(U);
    }
    return { back: H, endOfFile: N, nextToken: $, position: w };
  };
});
var tr = y((Sx, fo) => {
  "use strict";
  var co = se(),
    Ne = class extends co {
      constructor(e) {
        super(e), (this.type = "atrule");
      }
      append(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
      }
      prepend(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
      }
    };
  fo.exports = Ne;
  Ne.default = Ne;
  co.registerAtRule(Ne);
});
var Pe = y((Cx, yo) => {
  "use strict";
  var po = se(),
    ho,
    mo,
    ie = class extends po {
      constructor(e) {
        super(e), (this.type = "root"), this.nodes || (this.nodes = []);
      }
      normalize(e, n, r) {
        let s = super.normalize(e);
        if (n) {
          if (r === "prepend")
            this.nodes.length > 1
              ? (n.raws.before = this.nodes[1].raws.before)
              : delete n.raws.before;
          else if (this.first !== n)
            for (let i of s) i.raws.before = n.raws.before;
        }
        return s;
      }
      removeChild(e, n) {
        let r = this.index(e);
        return (
          !n &&
            r === 0 &&
            this.nodes.length > 1 &&
            (this.nodes[1].raws.before = this.nodes[r].raws.before),
          super.removeChild(e)
        );
      }
      toResult(e = {}) {
        return new ho(new mo(), this, e).stringify();
      }
    };
  ie.registerLazyResult = (t) => {
    ho = t;
  };
  ie.registerProcessor = (t) => {
    mo = t;
  };
  yo.exports = ie;
  ie.default = ie;
  po.registerRoot(ie);
});
var En = y((Ox, go) => {
  "use strict";
  var ht = {
    comma(t) {
      return ht.split(t, [","], !0);
    },
    space(t) {
      let e = [
        " ",
        `
`,
        "	",
      ];
      return ht.split(t, e);
    },
    split(t, e, n) {
      let r = [],
        s = "",
        i = !1,
        o = 0,
        a = !1,
        u = "",
        c = !1;
      for (let f of t)
        c
          ? (c = !1)
          : f === "\\"
            ? (c = !0)
            : a
              ? f === u && (a = !1)
              : f === '"' || f === "'"
                ? ((a = !0), (u = f))
                : f === "("
                  ? (o += 1)
                  : f === ")"
                    ? o > 0 && (o -= 1)
                    : o === 0 && e.includes(f) && (i = !0),
          i ? (s !== "" && r.push(s.trim()), (s = ""), (i = !1)) : (s += f);
      return (n || s !== "") && r.push(s.trim()), r;
    },
  };
  go.exports = ht;
  ht.default = ht;
});
var rr = y((Ax, vo) => {
  "use strict";
  var wo = se(),
    yf = En(),
    Re = class extends wo {
      constructor(e) {
        super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
      }
      get selectors() {
        return yf.comma(this.selector);
      }
      set selectors(e) {
        let n = this.selector ? this.selector.match(/,\s*/) : null,
          r = n ? n[0] : "," + this.raw("between", "beforeOpen");
        this.selector = e.join(r);
      }
    };
  vo.exports = Re;
  Re.default = Re;
  wo.registerRule(Re);
});
var nr = y((Nx, ko) => {
  "use strict";
  var gf = ct(),
    wf = er(),
    vf = Ae(),
    xf = tr(),
    bf = Pe(),
    xo = rr(),
    bo = { empty: !0, space: !0 };
  function kf(t) {
    for (let e = t.length - 1; e >= 0; e--) {
      let n = t[e],
        r = n[3] || n[2];
      if (r) return r;
    }
  }
  var Sn = class {
    constructor(e) {
      (this.input = e),
        (this.root = new bf()),
        (this.current = this.root),
        (this.spaces = ""),
        (this.semicolon = !1),
        (this.customProperty = !1),
        this.createTokenizer(),
        (this.root.source = {
          input: e,
          start: { column: 1, line: 1, offset: 0 },
        });
    }
    atrule(e) {
      let n = new xf();
      (n.name = e[1].slice(1)),
        n.name === "" && this.unnamedAtrule(n, e),
        this.init(n, e[2]);
      let r,
        s,
        i,
        o = !1,
        a = !1,
        u = [],
        c = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (
          ((e = this.tokenizer.nextToken()),
          (r = e[0]),
          r === "(" || r === "["
            ? c.push(r === "(" ? ")" : "]")
            : r === "{" && c.length > 0
              ? c.push("}")
              : r === c[c.length - 1] && c.pop(),
          c.length === 0)
        )
          if (r === ";") {
            (n.source.end = this.getPosition(e[2])), (this.semicolon = !0);
            break;
          } else if (r === "{") {
            a = !0;
            break;
          } else if (r === "}") {
            if (u.length > 0) {
              for (i = u.length - 1, s = u[i]; s && s[0] === "space"; )
                s = u[--i];
              s && (n.source.end = this.getPosition(s[3] || s[2]));
            }
            this.end(e);
            break;
          } else u.push(e);
        else u.push(e);
        if (this.tokenizer.endOfFile()) {
          o = !0;
          break;
        }
      }
      (n.raws.between = this.spacesAndCommentsFromEnd(u)),
        u.length
          ? ((n.raws.afterName = this.spacesAndCommentsFromStart(u)),
            this.raw(n, "params", u),
            o &&
              ((e = u[u.length - 1]),
              (n.source.end = this.getPosition(e[3] || e[2])),
              (this.spaces = n.raws.between),
              (n.raws.between = "")))
          : ((n.raws.afterName = ""), (n.params = "")),
        a && ((n.nodes = []), (this.current = n));
    }
    checkMissedSemicolon(e) {
      let n = this.colon(e);
      if (n === !1) return;
      let r = 0,
        s;
      for (
        let i = n - 1;
        i >= 0 && ((s = e[i]), !(s[0] !== "space" && ((r += 1), r === 2)));
        i--
      );
      throw this.input.error(
        "Missed semicolon",
        s[0] === "word" ? s[3] + 1 : s[2],
      );
    }
    colon(e) {
      let n = 0,
        r,
        s,
        i;
      for (let [o, a] of e.entries()) {
        if (
          ((r = a),
          (s = r[0]),
          s === "(" && (n += 1),
          s === ")" && (n -= 1),
          n === 0 && s === ":")
        )
          if (!i) this.doubleColon(r);
          else {
            if (i[0] === "word" && i[1] === "progid") continue;
            return o;
          }
        i = r;
      }
      return !1;
    }
    comment(e) {
      let n = new vf();
      this.init(n, e[2]), (n.source.end = this.getPosition(e[3] || e[2]));
      let r = e[1].slice(2, -2);
      if (/^\s*$/.test(r))
        (n.text = ""), (n.raws.left = r), (n.raws.right = "");
      else {
        let s = r.match(/^(\s*)([^]*\S)(\s*)$/);
        (n.text = s[2]), (n.raws.left = s[1]), (n.raws.right = s[3]);
      }
    }
    createTokenizer() {
      this.tokenizer = wf(this.input);
    }
    decl(e, n) {
      let r = new gf();
      this.init(r, e[0][2]);
      let s = e[e.length - 1];
      for (
        s[0] === ";" && ((this.semicolon = !0), e.pop()),
          r.source.end = this.getPosition(s[3] || s[2] || kf(e));
        e[0][0] !== "word";

      )
        e.length === 1 && this.unknownWord(e), (r.raws.before += e.shift()[1]);
      for (
        r.source.start = this.getPosition(e[0][2]), r.prop = "";
        e.length;

      ) {
        let c = e[0][0];
        if (c === ":" || c === "space" || c === "comment") break;
        r.prop += e.shift()[1];
      }
      r.raws.between = "";
      let i;
      for (; e.length; )
        if (((i = e.shift()), i[0] === ":")) {
          r.raws.between += i[1];
          break;
        } else
          i[0] === "word" && /\w/.test(i[1]) && this.unknownWord([i]),
            (r.raws.between += i[1]);
      (r.prop[0] === "_" || r.prop[0] === "*") &&
        ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
      let o = [],
        a;
      for (; e.length && ((a = e[0][0]), !(a !== "space" && a !== "comment")); )
        o.push(e.shift());
      this.precheckMissedSemicolon(e);
      for (let c = e.length - 1; c >= 0; c--) {
        if (((i = e[c]), i[1].toLowerCase() === "!important")) {
          r.important = !0;
          let f = this.stringFrom(e, c);
          (f = this.spacesFromEnd(e) + f),
            f !== " !important" && (r.raws.important = f);
          break;
        } else if (i[1].toLowerCase() === "important") {
          let f = e.slice(0),
            p = "";
          for (let l = c; l > 0; l--) {
            let g = f[l][0];
            if (p.trim().indexOf("!") === 0 && g !== "space") break;
            p = f.pop()[1] + p;
          }
          p.trim().indexOf("!") === 0 &&
            ((r.important = !0), (r.raws.important = p), (e = f));
        }
        if (i[0] !== "space" && i[0] !== "comment") break;
      }
      e.some((c) => c[0] !== "space" && c[0] !== "comment") &&
        ((r.raws.between += o.map((c) => c[1]).join("")), (o = [])),
        this.raw(r, "value", o.concat(e), n),
        r.value.includes(":") && !n && this.checkMissedSemicolon(e);
    }
    doubleColon(e) {
      throw this.input.error(
        "Double colon",
        { offset: e[2] },
        { offset: e[2] + e[1].length },
      );
    }
    emptyRule(e) {
      let n = new xo();
      this.init(n, e[2]),
        (n.selector = ""),
        (n.raws.between = ""),
        (this.current = n);
    }
    end(e) {
      this.current.nodes &&
        this.current.nodes.length &&
        (this.current.raws.semicolon = this.semicolon),
        (this.semicolon = !1),
        (this.current.raws.after =
          (this.current.raws.after || "") + this.spaces),
        (this.spaces = ""),
        this.current.parent
          ? ((this.current.source.end = this.getPosition(e[2])),
            (this.current = this.current.parent))
          : this.unexpectedClose(e);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(),
        this.current.nodes &&
          this.current.nodes.length &&
          (this.current.raws.semicolon = this.semicolon),
        (this.current.raws.after =
          (this.current.raws.after || "") + this.spaces),
        (this.root.source.end = this.getPosition(this.tokenizer.position()));
    }
    freeSemicolon(e) {
      if (((this.spaces += e[1]), this.current.nodes)) {
        let n = this.current.nodes[this.current.nodes.length - 1];
        n &&
          n.type === "rule" &&
          !n.raws.ownSemicolon &&
          ((n.raws.ownSemicolon = this.spaces), (this.spaces = ""));
      }
    }
    getPosition(e) {
      let n = this.input.fromOffset(e);
      return { column: n.col, line: n.line, offset: e };
    }
    init(e, n) {
      this.current.push(e),
        (e.source = { input: this.input, start: this.getPosition(n) }),
        (e.raws.before = this.spaces),
        (this.spaces = ""),
        e.type !== "comment" && (this.semicolon = !1);
    }
    other(e) {
      let n = !1,
        r = null,
        s = !1,
        i = null,
        o = [],
        a = e[1].startsWith("--"),
        u = [],
        c = e;
      for (; c; ) {
        if (((r = c[0]), u.push(c), r === "(" || r === "["))
          i || (i = c), o.push(r === "(" ? ")" : "]");
        else if (a && s && r === "{") i || (i = c), o.push("}");
        else if (o.length === 0)
          if (r === ";")
            if (s) {
              this.decl(u, a);
              return;
            } else break;
          else if (r === "{") {
            this.rule(u);
            return;
          } else if (r === "}") {
            this.tokenizer.back(u.pop()), (n = !0);
            break;
          } else r === ":" && (s = !0);
        else r === o[o.length - 1] && (o.pop(), o.length === 0 && (i = null));
        c = this.tokenizer.nextToken();
      }
      if (
        (this.tokenizer.endOfFile() && (n = !0),
        o.length > 0 && this.unclosedBracket(i),
        n && s)
      ) {
        if (!a)
          for (
            ;
            u.length &&
            ((c = u[u.length - 1][0]), !(c !== "space" && c !== "comment"));

          )
            this.tokenizer.back(u.pop());
        this.decl(u, a);
      } else this.unknownWord(u);
    }
    parse() {
      let e;
      for (; !this.tokenizer.endOfFile(); )
        switch (((e = this.tokenizer.nextToken()), e[0])) {
          case "space":
            this.spaces += e[1];
            break;
          case ";":
            this.freeSemicolon(e);
            break;
          case "}":
            this.end(e);
            break;
          case "comment":
            this.comment(e);
            break;
          case "at-word":
            this.atrule(e);
            break;
          case "{":
            this.emptyRule(e);
            break;
          default:
            this.other(e);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {}
    raw(e, n, r, s) {
      let i,
        o,
        a = r.length,
        u = "",
        c = !0,
        f,
        p;
      for (let l = 0; l < a; l += 1)
        (i = r[l]),
          (o = i[0]),
          o === "space" && l === a - 1 && !s
            ? (c = !1)
            : o === "comment"
              ? ((p = r[l - 1] ? r[l - 1][0] : "empty"),
                (f = r[l + 1] ? r[l + 1][0] : "empty"),
                !bo[p] && !bo[f]
                  ? u.slice(-1) === ","
                    ? (c = !1)
                    : (u += i[1])
                  : (c = !1))
              : (u += i[1]);
      if (!c) {
        let l = r.reduce((g, x) => g + x[1], "");
        e.raws[n] = { raw: l, value: u };
      }
      e[n] = u;
    }
    rule(e) {
      e.pop();
      let n = new xo();
      this.init(n, e[0][2]),
        (n.raws.between = this.spacesAndCommentsFromEnd(e)),
        this.raw(n, "selector", e),
        (this.current = n);
    }
    spacesAndCommentsFromEnd(e) {
      let n,
        r = "";
      for (
        ;
        e.length &&
        ((n = e[e.length - 1][0]), !(n !== "space" && n !== "comment"));

      )
        r = e.pop()[1] + r;
      return r;
    }
    spacesAndCommentsFromStart(e) {
      let n,
        r = "";
      for (; e.length && ((n = e[0][0]), !(n !== "space" && n !== "comment")); )
        r += e.shift()[1];
      return r;
    }
    spacesFromEnd(e) {
      let n,
        r = "";
      for (; e.length && ((n = e[e.length - 1][0]), n === "space"); )
        r = e.pop()[1] + r;
      return r;
    }
    stringFrom(e, n) {
      let r = "";
      for (let s = n; s < e.length; s++) r += e[s][1];
      return e.splice(n, e.length - n), r;
    }
    unclosedBlock() {
      let e = this.current.source.start;
      throw this.input.error("Unclosed block", e.line, e.column);
    }
    unclosedBracket(e) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: e[2] },
        { offset: e[2] + 1 },
      );
    }
    unexpectedClose(e) {
      throw this.input.error(
        "Unexpected }",
        { offset: e[2] },
        { offset: e[2] + 1 },
      );
    }
    unknownWord(e) {
      throw this.input.error(
        "Unknown word",
        { offset: e[0][2] },
        { offset: e[0][2] + e[0][1].length },
      );
    }
    unnamedAtrule(e, n) {
      throw this.input.error(
        "At-rule without name",
        { offset: n[2] },
        { offset: n[2] + n[1].length },
      );
    }
  };
  ko.exports = Sn;
});
var _o = y(() => {});
var Eo = y((Ix, To) => {
  var _f = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
    Tf =
      (t, e = 21) =>
      (n = e) => {
        let r = "",
          s = n;
        for (; s--; ) r += t[(Math.random() * t.length) | 0];
        return r;
      },
    Ef = (t = 21) => {
      let e = "",
        n = t;
      for (; n--; ) e += _f[(Math.random() * 64) | 0];
      return e;
    };
  To.exports = { nanoid: Ef, customAlphabet: Tf };
});
var Cn = y((qx, So) => {
  So.exports = class {};
});
var qe = y((Lx, No) => {
  "use strict";
  var { SourceMapConsumer: Sf, SourceMapGenerator: Cf } = _o(),
    { fileURLToPath: Co, pathToFileURL: sr } = {},
    { isAbsolute: Nn, resolve: Pn } = {},
    { nanoid: Of } = Eo(),
    On = vn(),
    Oo = Vt(),
    Af = Cn(),
    An = Symbol("fromOffsetCache"),
    Nf = !!(Sf && Cf),
    Ao = !!(Pn && Nn),
    Ie = class {
      constructor(e, n = {}) {
        if (
          e === null ||
          typeof e > "u" ||
          (typeof e == "object" && !e.toString)
        )
          throw new Error(`PostCSS received ${e} instead of CSS string`);
        if (
          ((this.css = e.toString()),
          this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE"
            ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
            : (this.hasBOM = !1),
          n.from &&
            (!Ao || /^\w+:\/\//.test(n.from) || Nn(n.from)
              ? (this.file = n.from)
              : (this.file = Pn(n.from))),
          Ao && Nf)
        ) {
          let r = new Af(this.css, n);
          if (r.text) {
            this.map = r;
            let s = r.consumer().file;
            !this.file && s && (this.file = this.mapResolve(s));
          }
        }
        this.file || (this.id = "<input css " + Of(6) + ">"),
          this.map && (this.map.file = this.from);
      }
      error(e, n, r, s = {}) {
        let i, o, a;
        if (n && typeof n == "object") {
          let c = n,
            f = r;
          if (typeof c.offset == "number") {
            let p = this.fromOffset(c.offset);
            (n = p.line), (r = p.col);
          } else (n = c.line), (r = c.column);
          if (typeof f.offset == "number") {
            let p = this.fromOffset(f.offset);
            (o = p.line), (a = p.col);
          } else (o = f.line), (a = f.column);
        } else if (!r) {
          let c = this.fromOffset(n);
          (n = c.line), (r = c.col);
        }
        let u = this.origin(n, r, o, a);
        return (
          u
            ? (i = new Oo(
                e,
                u.endLine === void 0
                  ? u.line
                  : { column: u.column, line: u.line },
                u.endLine === void 0
                  ? u.column
                  : { column: u.endColumn, line: u.endLine },
                u.source,
                u.file,
                s.plugin,
              ))
            : (i = new Oo(
                e,
                o === void 0 ? n : { column: r, line: n },
                o === void 0 ? r : { column: a, line: o },
                this.css,
                this.file,
                s.plugin,
              )),
          (i.input = {
            column: r,
            endColumn: a,
            endLine: o,
            line: n,
            source: this.css,
          }),
          this.file &&
            (sr && (i.input.url = sr(this.file).toString()),
            (i.input.file = this.file)),
          i
        );
      }
      get from() {
        return this.file || this.id;
      }
      fromOffset(e) {
        let n, r;
        if (this[An]) r = this[An];
        else {
          let i = this.css.split(`
`);
          r = new Array(i.length);
          let o = 0;
          for (let a = 0, u = i.length; a < u; a++)
            (r[a] = o), (o += i[a].length + 1);
          this[An] = r;
        }
        n = r[r.length - 1];
        let s = 0;
        if (e >= n) s = r.length - 1;
        else {
          let i = r.length - 2,
            o;
          for (; s < i; )
            if (((o = s + ((i - s) >> 1)), e < r[o])) i = o - 1;
            else if (e >= r[o + 1]) s = o + 1;
            else {
              s = o;
              break;
            }
        }
        return { col: e - r[s] + 1, line: s + 1 };
      }
      mapResolve(e) {
        return /^\w+:\/\//.test(e)
          ? e
          : Pn(this.map.consumer().sourceRoot || this.map.root || ".", e);
      }
      origin(e, n, r, s) {
        if (!this.map) return !1;
        let i = this.map.consumer(),
          o = i.originalPositionFor({ column: n, line: e });
        if (!o.source) return !1;
        let a;
        typeof r == "number" &&
          (a = i.originalPositionFor({ column: s, line: r }));
        let u;
        Nn(o.source)
          ? (u = sr(o.source))
          : (u = new URL(
              o.source,
              this.map.consumer().sourceRoot || sr(this.map.mapFile),
            ));
        let c = {
          column: o.column,
          endColumn: a && a.column,
          endLine: a && a.line,
          line: o.line,
          url: u.toString(),
        };
        if (u.protocol === "file:")
          if (Co) c.file = Co(u);
          else
            throw new Error(
              "file: protocol is not available in this PostCSS build",
            );
        let f = i.sourceContentFor(o.source);
        return f && (c.source = f), c;
      }
      toJSON() {
        let e = {};
        for (let n of ["hasBOM", "css", "file", "id"])
          this[n] != null && (e[n] = this[n]);
        return (
          this.map &&
            ((e.map = { ...this.map }),
            e.map.consumerCache && (e.map.consumerCache = void 0)),
          e
        );
      }
    };
  No.exports = Ie;
  Ie.default = Ie;
  On && On.registerInput && On.registerInput(Ie);
});
var dt = y((Mx, Po) => {
  "use strict";
  var Pf = se(),
    Rf = nr(),
    If = qe();
  function ir(t, e) {
    let n = new If(t, e),
      r = new Rf(n);
    try {
      r.parse();
    } catch (s) {
      throw s;
    }
    return r.root;
  }
  Po.exports = ir;
  ir.default = ir;
  Pf.registerParse(ir);
});
var Ro = y((Bx, Rn) => {
  var qf = er(),
    Df = qe();
  Rn.exports = {
    isInlineComment(t) {
      if (t[0] === "word" && t[1].slice(0, 2) === "//") {
        let e = t,
          n = [],
          r,
          s;
        for (; t; ) {
          if (/\r?\n/.test(t[1])) {
            if (/['"].*\r?\n/.test(t[1])) {
              n.push(
                t[1].substring(
                  0,
                  t[1].indexOf(`
`),
                ),
              ),
                (s = t[1].substring(
                  t[1].indexOf(`
`),
                ));
              let o = this.input.css
                .valueOf()
                .substring(this.tokenizer.position());
              (s += o), (r = t[3] + o.length - s.length);
            } else this.tokenizer.back(t);
            break;
          }
          n.push(t[1]),
            (r = t[2]),
            (t = this.tokenizer.nextToken({ ignoreUnclosed: !0 }));
        }
        let i = ["comment", n.join(""), e[2], r];
        return (
          this.inlineComment(i),
          s && ((this.input = new Df(s)), (this.tokenizer = qf(this.input))),
          !0
        );
      } else if (t[1] === "/") {
        let e = this.tokenizer.nextToken({ ignoreUnclosed: !0 });
        if (e[0] === "comment" && /^\/\*/.test(e[1]))
          return (
            (e[0] = "word"),
            (e[1] = e[1].slice(1)),
            (t[1] = "//"),
            this.tokenizer.back(e),
            Rn.exports.isInlineComment.bind(this)(t)
          );
      }
      return !1;
    },
  };
});
var qo = y((Fx, Io) => {
  Io.exports = {
    interpolation(t) {
      let e = [t, this.tokenizer.nextToken()],
        n = ["word", "}"];
      if (e[0][1].length > 1 || e[1][0] !== "{")
        return this.tokenizer.back(e[1]), !1;
      for (t = this.tokenizer.nextToken(); t && n.includes(t[0]); )
        e.push(t), (t = this.tokenizer.nextToken());
      let r = e.map((a) => a[1]),
        [s] = e,
        i = e.pop(),
        o = ["word", r.join(""), s[2], i[2]];
      return this.tokenizer.back(t), this.tokenizer.back(o), !0;
    },
  };
});
var Lo = y(($x, Do) => {
  var Lf = /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/,
    Mf = /\.[0-9]/,
    Bf = (t) => {
      let [, e] = t,
        [n] = e;
      return (n === "." || n === "#") && Lf.test(e) === !1 && Mf.test(e) === !1;
    };
  Do.exports = { isMixinToken: Bf };
});
var Bo = y((Ux, Mo) => {
  var Ff = er(),
    $f = /^url\((.+)\)/;
  Mo.exports = (t) => {
    let { name: e, params: n = "" } = t;
    if (e === "import" && n.length) {
      t.import = !0;
      let r = Ff({ css: n });
      for (t.filename = n.replace($f, "$1"); !r.endOfFile(); ) {
        let [s, i] = r.nextToken();
        if (s === "word" && i === "url") return;
        if (s === "brackets") {
          (t.options = i), (t.filename = n.replace(i, "").trim());
          break;
        }
      }
    }
  };
});
var Wo = y((Wx, Uo) => {
  var Fo = /:$/,
    $o = /^:(\s+)?/;
  Uo.exports = (t) => {
    let { name: e, params: n = "" } = t;
    if (t.name.slice(-1) === ":") {
      if (Fo.test(e)) {
        let [r] = e.match(Fo);
        (t.name = e.replace(r, "")),
          (t.raws.afterName = r + (t.raws.afterName || "")),
          (t.variable = !0),
          (t.value = t.params);
      }
      if ($o.test(n)) {
        let [r] = n.match($o);
        (t.value = n.replace(r, "")),
          (t.raws.afterName = (t.raws.afterName || "") + r),
          (t.variable = !0);
      }
    }
  };
});
var Yo = y((Vx, Vo) => {
  var Uf = Ae(),
    Wf = nr(),
    { isInlineComment: zf } = Ro(),
    { interpolation: zo } = qo(),
    { isMixinToken: Vf } = Lo(),
    Yf = Bo(),
    Gf = Wo(),
    Kf = /(!\s*important)$/i;
  Vo.exports = class extends Wf {
    constructor(...e) {
      super(...e), (this.lastNode = null);
    }
    atrule(e) {
      zo.bind(this)(e) ||
        (super.atrule(e), Yf(this.lastNode), Gf(this.lastNode));
    }
    decl(...e) {
      super.decl(...e),
        /extend\(.+\)/i.test(this.lastNode.value) &&
          (this.lastNode.extend = !0);
    }
    each(e) {
      e[0][1] = ` ${e[0][1]}`;
      let n = e.findIndex((a) => a[0] === "("),
        r = e.reverse().find((a) => a[0] === ")"),
        s = e.reverse().indexOf(r),
        o = e
          .splice(n, s)
          .map((a) => a[1])
          .join("");
      for (let a of e.reverse()) this.tokenizer.back(a);
      this.atrule(this.tokenizer.nextToken()),
        (this.lastNode.function = !0),
        (this.lastNode.params = o);
    }
    init(e, n, r) {
      super.init(e, n, r), (this.lastNode = e);
    }
    inlineComment(e) {
      let n = new Uf(),
        r = e[1].slice(2);
      if (
        (this.init(n, e[2]),
        (n.source.end = this.getPosition(e[3] || e[2])),
        (n.inline = !0),
        (n.raws.begin = "//"),
        /^\s*$/.test(r))
      )
        (n.text = ""), (n.raws.left = r), (n.raws.right = "");
      else {
        let s = r.match(/^(\s*)([^]*[^\s])(\s*)$/);
        [, n.raws.left, n.text, n.raws.right] = s;
      }
    }
    mixin(e) {
      let [n] = e,
        r = n[1].slice(0, 1),
        s = e.findIndex((c) => c[0] === "brackets"),
        i = e.findIndex((c) => c[0] === "("),
        o = "";
      if ((s < 0 || s > 3) && i > 0) {
        let c = e.reduce((w, v, N) => (v[0] === ")" ? N : w)),
          p = e
            .slice(i, c + i)
            .map((w) => w[1])
            .join(""),
          [l] = e.slice(i),
          g = [l[2], l[3]],
          [x] = e.slice(c, c + 1),
          h = [x[2], x[3]],
          d = ["brackets", p].concat(g, h),
          m = e.slice(0, i),
          b = e.slice(c + 1);
        (e = m), e.push(d), (e = e.concat(b));
      }
      let a = [];
      for (let c of e)
        if (((c[1] === "!" || a.length) && a.push(c), c[1] === "important"))
          break;
      if (a.length) {
        let [c] = a,
          f = e.indexOf(c),
          p = a[a.length - 1],
          l = [c[2], c[3]],
          g = [p[4], p[5]],
          h = ["word", a.map((d) => d[1]).join("")].concat(l, g);
        e.splice(f, a.length, h);
      }
      let u = e.findIndex((c) => Kf.test(c[1]));
      u > 0 && (([, o] = e[u]), e.splice(u, 1));
      for (let c of e.reverse()) this.tokenizer.back(c);
      this.atrule(this.tokenizer.nextToken()),
        (this.lastNode.mixin = !0),
        (this.lastNode.raws.identifier = r),
        o &&
          ((this.lastNode.important = !0), (this.lastNode.raws.important = o));
    }
    other(e) {
      zf.bind(this)(e) || super.other(e);
    }
    rule(e) {
      let n = e[e.length - 1],
        r = e[e.length - 2];
      if (
        r[0] === "at-word" &&
        n[0] === "{" &&
        (this.tokenizer.back(n), zo.bind(this)(r))
      ) {
        let i = this.tokenizer.nextToken();
        e = e.slice(0, e.length - 2).concat([i]);
        for (let o of e.reverse()) this.tokenizer.back(o);
        return;
      }
      super.rule(e),
        /:extend\(.+\)/i.test(this.lastNode.selector) &&
          (this.lastNode.extend = !0);
    }
    unknownWord(e) {
      let [n] = e;
      if (e[0][1] === "each" && e[1][0] === "(") {
        this.each(e);
        return;
      }
      if (Vf(n)) {
        this.mixin(e);
        return;
      }
      super.unknownWord(e);
    }
  };
});
var Ko = y((Gx, Go) => {
  var Hf = Yt();
  Go.exports = class extends Hf {
    atrule(e, n) {
      if (!e.mixin && !e.variable && !e.function) {
        super.atrule(e, n);
        return;
      }
      let s = `${e.function ? "" : e.raws.identifier || "@"}${e.name}`,
        i = e.params ? this.rawValue(e, "params") : "",
        o = e.raws.important || "";
      if (
        (e.variable && (i = e.value),
        typeof e.raws.afterName < "u"
          ? (s += e.raws.afterName)
          : i && (s += " "),
        e.nodes)
      )
        this.block(e, s + i + o);
      else {
        let a = (e.raws.between || "") + o + (n ? ";" : "");
        this.builder(s + i + a, e);
      }
    }
    comment(e) {
      if (e.inline) {
        let n = this.raw(e, "left", "commentLeft"),
          r = this.raw(e, "right", "commentRight");
        this.builder(`//${n}${e.text}${r}`, e);
      } else super.comment(e);
    }
  };
});
var Ho = y((Kx, In) => {
  var Qf = qe(),
    jf = Yo(),
    Jf = Ko();
  In.exports = {
    parse(t, e) {
      let n = new Qf(t, e),
        r = new jf(n);
      return (
        r.parse(),
        r.root.walk((s) => {
          let i = n.css.lastIndexOf(s.source.input.css);
          if (i === 0) return;
          if (i + s.source.input.css.length !== n.css.length)
            throw new Error("Invalid state detected in postcss-less");
          let o = i + s.source.start.offset,
            a = n.fromOffset(i + s.source.start.offset);
          if (
            ((s.source.start = { offset: o, line: a.line, column: a.col }),
            s.source.end)
          ) {
            let u = i + s.source.end.offset,
              c = n.fromOffset(i + s.source.end.offset);
            s.source.end = { offset: u, line: c.line, column: c.col };
          }
        }),
        r.root
      );
    },
    stringify(t, e) {
      new Jf(e).stringify(t);
    },
    nodeToString(t) {
      let e = "";
      return (
        In.exports.stringify(t, (n) => {
          e += n;
        }),
        e
      );
    },
  };
});
var qn = y((Hx, Qo) => {
  Qo.exports = class {
    generate() {}
  };
});
var or = y((jx, Xo) => {
  "use strict";
  var Xf = se(),
    jo,
    Jo,
    ye = class extends Xf {
      constructor(e) {
        super({ type: "document", ...e }), this.nodes || (this.nodes = []);
      }
      toResult(e = {}) {
        return new jo(new Jo(), this, e).stringify();
      }
    };
  ye.registerLazyResult = (t) => {
    jo = t;
  };
  ye.registerProcessor = (t) => {
    Jo = t;
  };
  Xo.exports = ye;
  ye.default = ye;
});
var Dn = y((Jx, ea) => {
  "use strict";
  var Zo = {};
  ea.exports = function (e) {
    Zo[e] ||
      ((Zo[e] = !0), typeof console < "u" && console.warn && console.warn(e));
  };
});
var Ln = y((Xx, ta) => {
  "use strict";
  var mt = class {
    constructor(e, n = {}) {
      if (((this.type = "warning"), (this.text = e), n.node && n.node.source)) {
        let r = n.node.rangeBy(n);
        (this.line = r.start.line),
          (this.column = r.start.column),
          (this.endLine = r.end.line),
          (this.endColumn = r.end.column);
      }
      for (let r in n) this[r] = n[r];
    }
    toString() {
      return this.node
        ? this.node.error(this.text, {
            index: this.index,
            plugin: this.plugin,
            word: this.word,
          }).message
        : this.plugin
          ? this.plugin + ": " + this.text
          : this.text;
    }
  };
  ta.exports = mt;
  mt.default = mt;
});
var ar = y((Zx, ra) => {
  "use strict";
  var Zf = Ln(),
    yt = class {
      constructor(e, n, r) {
        (this.processor = e),
          (this.messages = []),
          (this.root = n),
          (this.opts = r),
          (this.css = void 0),
          (this.map = void 0);
      }
      get content() {
        return this.css;
      }
      toString() {
        return this.css;
      }
      warn(e, n = {}) {
        n.plugin ||
          (this.lastPlugin &&
            this.lastPlugin.postcssPlugin &&
            (n.plugin = this.lastPlugin.postcssPlugin));
        let r = new Zf(e, n);
        return this.messages.push(r), r;
      }
      warnings() {
        return this.messages.filter((e) => e.type === "warning");
      }
    };
  ra.exports = yt;
  yt.default = yt;
});
var Fn = y((tb, oa) => {
  "use strict";
  var { isClean: K, my: ep } = zt(),
    tp = qn(),
    rp = ot(),
    np = se(),
    sp = or(),
    eb = Dn(),
    na = ar(),
    ip = dt(),
    op = Pe(),
    ap = {
      atrule: "AtRule",
      comment: "Comment",
      decl: "Declaration",
      document: "Document",
      root: "Root",
      rule: "Rule",
    },
    up = {
      AtRule: !0,
      AtRuleExit: !0,
      Comment: !0,
      CommentExit: !0,
      Declaration: !0,
      DeclarationExit: !0,
      Document: !0,
      DocumentExit: !0,
      Once: !0,
      OnceExit: !0,
      postcssPlugin: !0,
      prepare: !0,
      Root: !0,
      RootExit: !0,
      Rule: !0,
      RuleExit: !0,
    },
    lp = { Once: !0, postcssPlugin: !0, prepare: !0 },
    De = 0;
  function gt(t) {
    return typeof t == "object" && typeof t.then == "function";
  }
  function ia(t) {
    let e = !1,
      n = ap[t.type];
    return (
      t.type === "decl"
        ? (e = t.prop.toLowerCase())
        : t.type === "atrule" && (e = t.name.toLowerCase()),
      e && t.append
        ? [n, n + "-" + e, De, n + "Exit", n + "Exit-" + e]
        : e
          ? [n, n + "-" + e, n + "Exit", n + "Exit-" + e]
          : t.append
            ? [n, De, n + "Exit"]
            : [n, n + "Exit"]
    );
  }
  function sa(t) {
    let e;
    return (
      t.type === "document"
        ? (e = ["Document", De, "DocumentExit"])
        : t.type === "root"
          ? (e = ["Root", De, "RootExit"])
          : (e = ia(t)),
      {
        eventIndex: 0,
        events: e,
        iterator: 0,
        node: t,
        visitorIndex: 0,
        visitors: [],
      }
    );
  }
  function Mn(t) {
    return (t[K] = !1), t.nodes && t.nodes.forEach((e) => Mn(e)), t;
  }
  var Bn = {},
    oe = class t {
      constructor(e, n, r) {
        (this.stringified = !1), (this.processed = !1);
        let s;
        if (
          typeof n == "object" &&
          n !== null &&
          (n.type === "root" || n.type === "document")
        )
          s = Mn(n);
        else if (n instanceof t || n instanceof na)
          (s = Mn(n.root)),
            n.map &&
              (typeof r.map > "u" && (r.map = {}),
              r.map.inline || (r.map.inline = !1),
              (r.map.prev = n.map));
        else {
          let i = ip;
          r.syntax && (i = r.syntax.parse),
            r.parser && (i = r.parser),
            i.parse && (i = i.parse);
          try {
            s = i(n, r);
          } catch (o) {
            (this.processed = !0), (this.error = o);
          }
          s && !s[ep] && np.rebuild(s);
        }
        (this.result = new na(e, s, r)),
          (this.helpers = { ...Bn, postcss: Bn, result: this.result }),
          (this.plugins = this.processor.plugins.map((i) =>
            typeof i == "object" && i.prepare
              ? { ...i, ...i.prepare(this.result) }
              : i,
          ));
      }
      async() {
        return this.error
          ? Promise.reject(this.error)
          : this.processed
            ? Promise.resolve(this.result)
            : (this.processing || (this.processing = this.runAsync()),
              this.processing);
      }
      catch(e) {
        return this.async().catch(e);
      }
      get content() {
        return this.stringify().content;
      }
      get css() {
        return this.stringify().css;
      }
      finally(e) {
        return this.async().then(e, e);
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(e, n) {
        let r = this.result.lastPlugin;
        try {
          n && n.addToError(e),
            (this.error = e),
            e.name === "CssSyntaxError" && !e.plugin
              ? ((e.plugin = r.postcssPlugin), e.setMessage())
              : r.postcssVersion;
        } catch (s) {
          console && console.error && console.error(s);
        }
        return e;
      }
      get map() {
        return this.stringify().map;
      }
      get messages() {
        return this.sync().messages;
      }
      get opts() {
        return this.result.opts;
      }
      prepareVisitors() {
        this.listeners = {};
        let e = (n, r, s) => {
          this.listeners[r] || (this.listeners[r] = []),
            this.listeners[r].push([n, s]);
        };
        for (let n of this.plugins)
          if (typeof n == "object")
            for (let r in n) {
              if (!up[r] && /^[A-Z]/.test(r))
                throw new Error(
                  `Unknown event ${r} in ${n.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`,
                );
              if (!lp[r])
                if (typeof n[r] == "object")
                  for (let s in n[r])
                    s === "*"
                      ? e(n, r, n[r][s])
                      : e(n, r + "-" + s.toLowerCase(), n[r][s]);
                else typeof n[r] == "function" && e(n, r, n[r]);
            }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        return this.sync().root;
      }
      async runAsync() {
        this.plugin = 0;
        for (let e = 0; e < this.plugins.length; e++) {
          let n = this.plugins[e],
            r = this.runOnRoot(n);
          if (gt(r))
            try {
              await r;
            } catch (s) {
              throw this.handleError(s);
            }
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[K]; ) {
            e[K] = !0;
            let n = [sa(e)];
            for (; n.length > 0; ) {
              let r = this.visitTick(n);
              if (gt(r))
                try {
                  await r;
                } catch (s) {
                  let i = n[n.length - 1].node;
                  throw this.handleError(s, i);
                }
            }
          }
          if (this.listeners.OnceExit)
            for (let [n, r] of this.listeners.OnceExit) {
              this.result.lastPlugin = n;
              try {
                if (e.type === "document") {
                  let s = e.nodes.map((i) => r(i, this.helpers));
                  await Promise.all(s);
                } else await r(e, this.helpers);
              } catch (s) {
                throw this.handleError(s);
              }
            }
        }
        return (this.processed = !0), this.stringify();
      }
      runOnRoot(e) {
        this.result.lastPlugin = e;
        try {
          if (typeof e == "object" && e.Once) {
            if (this.result.root.type === "document") {
              let n = this.result.root.nodes.map((r) =>
                e.Once(r, this.helpers),
              );
              return gt(n[0]) ? Promise.all(n) : n;
            }
            return e.Once(this.result.root, this.helpers);
          } else if (typeof e == "function")
            return e(this.result.root, this.result);
        } catch (n) {
          throw this.handleError(n);
        }
      }
      stringify() {
        if (this.error) throw this.error;
        if (this.stringified) return this.result;
        (this.stringified = !0), this.sync();
        let e = this.result.opts,
          n = rp;
        e.syntax && (n = e.syntax.stringify),
          e.stringifier && (n = e.stringifier),
          n.stringify && (n = n.stringify);
        let s = new tp(n, this.result.root, this.result.opts).generate();
        return (this.result.css = s[0]), (this.result.map = s[1]), this.result;
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
      sync() {
        if (this.error) throw this.error;
        if (this.processed) return this.result;
        if (((this.processed = !0), this.processing))
          throw this.getAsyncError();
        for (let e of this.plugins) {
          let n = this.runOnRoot(e);
          if (gt(n)) throw this.getAsyncError();
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[K]; ) (e[K] = !0), this.walkSync(e);
          if (this.listeners.OnceExit)
            if (e.type === "document")
              for (let n of e.nodes) this.visitSync(this.listeners.OnceExit, n);
            else this.visitSync(this.listeners.OnceExit, e);
        }
        return this.result;
      }
      then(e, n) {
        return this.async().then(e, n);
      }
      toString() {
        return this.css;
      }
      visitSync(e, n) {
        for (let [r, s] of e) {
          this.result.lastPlugin = r;
          let i;
          try {
            i = s(n, this.helpers);
          } catch (o) {
            throw this.handleError(o, n.proxyOf);
          }
          if (n.type !== "root" && n.type !== "document" && !n.parent)
            return !0;
          if (gt(i)) throw this.getAsyncError();
        }
      }
      visitTick(e) {
        let n = e[e.length - 1],
          { node: r, visitors: s } = n;
        if (r.type !== "root" && r.type !== "document" && !r.parent) {
          e.pop();
          return;
        }
        if (s.length > 0 && n.visitorIndex < s.length) {
          let [o, a] = s[n.visitorIndex];
          (n.visitorIndex += 1),
            n.visitorIndex === s.length &&
              ((n.visitors = []), (n.visitorIndex = 0)),
            (this.result.lastPlugin = o);
          try {
            return a(r.toProxy(), this.helpers);
          } catch (u) {
            throw this.handleError(u, r);
          }
        }
        if (n.iterator !== 0) {
          let o = n.iterator,
            a;
          for (; (a = r.nodes[r.indexes[o]]); )
            if (((r.indexes[o] += 1), !a[K])) {
              (a[K] = !0), e.push(sa(a));
              return;
            }
          (n.iterator = 0), delete r.indexes[o];
        }
        let i = n.events;
        for (; n.eventIndex < i.length; ) {
          let o = i[n.eventIndex];
          if (((n.eventIndex += 1), o === De)) {
            r.nodes &&
              r.nodes.length &&
              ((r[K] = !0), (n.iterator = r.getIterator()));
            return;
          } else if (this.listeners[o]) {
            n.visitors = this.listeners[o];
            return;
          }
        }
        e.pop();
      }
      walkSync(e) {
        e[K] = !0;
        let n = ia(e);
        for (let r of n)
          if (r === De)
            e.nodes &&
              e.each((s) => {
                s[K] || this.walkSync(s);
              });
          else {
            let s = this.listeners[r];
            if (s && this.visitSync(s, e.toProxy())) return;
          }
      }
      warnings() {
        return this.sync().warnings();
      }
    };
  oe.registerPostcss = (t) => {
    Bn = t;
  };
  oa.exports = oe;
  oe.default = oe;
  op.registerLazyResult(oe);
  sp.registerLazyResult(oe);
});
var ua = y((nb, aa) => {
  "use strict";
  var cp = qn(),
    fp = ot(),
    rb = Dn(),
    pp = dt(),
    hp = ar(),
    wt = class {
      constructor(e, n, r) {
        (n = n.toString()),
          (this.stringified = !1),
          (this._processor = e),
          (this._css = n),
          (this._opts = r),
          (this._map = void 0);
        let s,
          i = fp;
        (this.result = new hp(this._processor, s, this._opts)),
          (this.result.css = n);
        let o = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return o.root;
          },
        });
        let a = new cp(i, s, this._opts, n);
        if (a.isMap()) {
          let [u, c] = a.generate();
          u && (this.result.css = u), c && (this.result.map = c);
        }
      }
      async() {
        return this.error
          ? Promise.reject(this.error)
          : Promise.resolve(this.result);
      }
      catch(e) {
        return this.async().catch(e);
      }
      get content() {
        return this.result.css;
      }
      get css() {
        return this.result.css;
      }
      finally(e) {
        return this.async().then(e, e);
      }
      get map() {
        return this.result.map;
      }
      get messages() {
        return [];
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        if (this._root) return this._root;
        let e,
          n = pp;
        try {
          e = n(this._css, this._opts);
        } catch (r) {
          this.error = r;
        }
        if (this.error) throw this.error;
        return (this._root = e), e;
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
      sync() {
        if (this.error) throw this.error;
        return this.result;
      }
      then(e, n) {
        return this.async().then(e, n);
      }
      toString() {
        return this._css;
      }
      warnings() {
        return [];
      }
    };
  aa.exports = wt;
  wt.default = wt;
});
var ca = y((sb, la) => {
  "use strict";
  var dp = ua(),
    mp = Fn(),
    yp = or(),
    gp = Pe(),
    ge = class {
      constructor(e = []) {
        (this.version = "8.4.28"), (this.plugins = this.normalize(e));
      }
      normalize(e) {
        let n = [];
        for (let r of e)
          if (
            (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
            typeof r == "object" && Array.isArray(r.plugins))
          )
            n = n.concat(r.plugins);
          else if (typeof r == "object" && r.postcssPlugin) n.push(r);
          else if (typeof r == "function") n.push(r);
          else if (!(typeof r == "object" && (r.parse || r.stringify)))
            throw new Error(r + " is not a PostCSS plugin");
        return n;
      }
      process(e, n = {}) {
        return this.plugins.length === 0 &&
          typeof n.parser > "u" &&
          typeof n.stringifier > "u" &&
          typeof n.syntax > "u"
          ? new dp(this, e, n)
          : new mp(this, e, n);
      }
      use(e) {
        return (this.plugins = this.plugins.concat(this.normalize([e]))), this;
      }
    };
  la.exports = ge;
  ge.default = ge;
  gp.registerProcessor(ge);
  yp.registerProcessor(ge);
});
var pa = y((ib, fa) => {
  "use strict";
  var wp = ct(),
    vp = Cn(),
    xp = Ae(),
    bp = tr(),
    kp = qe(),
    _p = Pe(),
    Tp = rr();
  function vt(t, e) {
    if (Array.isArray(t)) return t.map((s) => vt(s));
    let { inputs: n, ...r } = t;
    if (n) {
      e = [];
      for (let s of n) {
        let i = { ...s, __proto__: kp.prototype };
        i.map && (i.map = { ...i.map, __proto__: vp.prototype }), e.push(i);
      }
    }
    if ((r.nodes && (r.nodes = t.nodes.map((s) => vt(s, e))), r.source)) {
      let { inputId: s, ...i } = r.source;
      (r.source = i), s != null && (r.source.input = e[s]);
    }
    if (r.type === "root") return new _p(r);
    if (r.type === "decl") return new wp(r);
    if (r.type === "rule") return new Tp(r);
    if (r.type === "comment") return new xp(r);
    if (r.type === "atrule") return new bp(r);
    throw new Error("Unknown node type: " + t.type);
  }
  fa.exports = vt;
  vt.default = vt;
});
var ur = y((ob, va) => {
  "use strict";
  var Ep = Vt(),
    ha = ct(),
    Sp = Fn(),
    Cp = se(),
    $n = ca(),
    Op = ot(),
    Ap = pa(),
    da = or(),
    Np = Ln(),
    ma = Ae(),
    ya = tr(),
    Pp = ar(),
    Rp = qe(),
    Ip = dt(),
    qp = En(),
    ga = rr(),
    wa = Pe(),
    Dp = ut();
  function k(...t) {
    return t.length === 1 && Array.isArray(t[0]) && (t = t[0]), new $n(t);
  }
  k.plugin = function (e, n) {
    let r = !1;
    function s(...o) {
      console &&
        console.warn &&
        !r &&
        ((r = !0),
        console.warn(
          e +
            `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`,
        ));
      let a = n(...o);
      return (a.postcssPlugin = e), (a.postcssVersion = new $n().version), a;
    }
    let i;
    return (
      Object.defineProperty(s, "postcss", {
        get() {
          return i || (i = s()), i;
        },
      }),
      (s.process = function (o, a, u) {
        return k([s(u)]).process(o, a);
      }),
      s
    );
  };
  k.stringify = Op;
  k.parse = Ip;
  k.fromJSON = Ap;
  k.list = qp;
  k.comment = (t) => new ma(t);
  k.atRule = (t) => new ya(t);
  k.decl = (t) => new ha(t);
  k.rule = (t) => new ga(t);
  k.root = (t) => new wa(t);
  k.document = (t) => new da(t);
  k.CssSyntaxError = Ep;
  k.Declaration = ha;
  k.Container = Cp;
  k.Processor = $n;
  k.Document = da;
  k.Comment = ma;
  k.Warning = Np;
  k.AtRule = ya;
  k.Result = Pp;
  k.Input = Rp;
  k.Rule = ga;
  k.Root = wa;
  k.Node = Dp;
  Sp.registerPostcss(k);
  va.exports = k;
  k.default = k;
});
var ba = y((ab, xa) => {
  var { Container: Lp } = ur(),
    Un = class extends Lp {
      constructor(e) {
        super(e),
          (this.type = "decl"),
          (this.isNested = !0),
          this.nodes || (this.nodes = []);
      }
    };
  xa.exports = Un;
});
var Ca = y((ub, Sa) => {
  "use strict";
  var Wn = "'".charCodeAt(0),
    zn = '"'.charCodeAt(0),
    xt = "\\".charCodeAt(0),
    lr = "/".charCodeAt(0),
    Vn = `
`.charCodeAt(0),
    cr = " ".charCodeAt(0),
    Yn = "\f".charCodeAt(0),
    Gn = "	".charCodeAt(0),
    Kn = "\r".charCodeAt(0),
    Mp = "[".charCodeAt(0),
    Bp = "]".charCodeAt(0),
    ka = "(".charCodeAt(0),
    _a = ")".charCodeAt(0),
    fr = "{".charCodeAt(0),
    Ta = "}".charCodeAt(0),
    Fp = ";".charCodeAt(0),
    $p = "*".charCodeAt(0),
    Up = ":".charCodeAt(0),
    Wp = "@".charCodeAt(0),
    zp = ",".charCodeAt(0),
    Hn = "#".charCodeAt(0),
    pr = /[\t\n\f\r "#'()/;[\\\]{}]/g,
    hr = /[,\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
    Vp = /.[\n"'(/\\]/,
    Ea = /[\da-f]/i,
    dr = /[\n\f\r]/g;
  Sa.exports = function (e, n = {}) {
    let r = e.css.valueOf(),
      s = n.ignoreErrors,
      i,
      o,
      a,
      u,
      c,
      f,
      p,
      l,
      g,
      x = r.length,
      h = 0,
      d = [],
      m = [],
      b;
    function w() {
      return h;
    }
    function v(S) {
      throw e.error("Unclosed " + S, h);
    }
    function N() {
      return m.length === 0 && h >= x;
    }
    function $() {
      let S = 1,
        C = !1,
        O = !1;
      for (; S > 0; )
        (o += 1),
          r.length <= o && v("interpolation"),
          (i = r.charCodeAt(o)),
          (l = r.charCodeAt(o + 1)),
          C
            ? !O && i === C
              ? ((C = !1), (O = !1))
              : i === xt
                ? (O = !O)
                : O && (O = !1)
            : i === Wn || i === zn
              ? (C = i)
              : i === Ta
                ? (S -= 1)
                : i === Hn && l === fr && (S += 1);
    }
    function H(S) {
      if (m.length) return m.pop();
      if (h >= x) return;
      let C = S ? S.ignoreUnclosed : !1;
      switch (((i = r.charCodeAt(h)), i)) {
        case Vn:
        case cr:
        case Gn:
        case Kn:
        case Yn: {
          o = h;
          do (o += 1), (i = r.charCodeAt(o));
          while (i === cr || i === Vn || i === Gn || i === Kn || i === Yn);
          (g = ["space", r.slice(h, o)]), (h = o - 1);
          break;
        }
        case Mp:
        case Bp:
        case fr:
        case Ta:
        case Up:
        case Fp:
        case _a: {
          let O = String.fromCharCode(i);
          g = [O, O, h];
          break;
        }
        case zp: {
          g = ["word", ",", h, h + 1];
          break;
        }
        case ka: {
          if (
            ((p = d.length ? d.pop()[1] : ""),
            (l = r.charCodeAt(h + 1)),
            p === "url" && l !== Wn && l !== zn)
          ) {
            for (b = 1, f = !1, o = h + 1; o <= r.length - 1; ) {
              if (((l = r.charCodeAt(o)), l === xt)) f = !f;
              else if (l === ka) b += 1;
              else if (l === _a && ((b -= 1), b === 0)) break;
              o += 1;
            }
            (u = r.slice(h, o + 1)), (g = ["brackets", u, h, o]), (h = o);
          } else
            (o = r.indexOf(")", h + 1)),
              (u = r.slice(h, o + 1)),
              o === -1 || Vp.test(u)
                ? (g = ["(", "(", h])
                : ((g = ["brackets", u, h, o]), (h = o));
          break;
        }
        case Wn:
        case zn: {
          for (
            a = i, o = h, f = !1;
            o < x &&
            (o++,
            o === x && v("string"),
            (i = r.charCodeAt(o)),
            (l = r.charCodeAt(o + 1)),
            !(!f && i === a));

          )
            i === xt ? (f = !f) : f ? (f = !1) : i === Hn && l === fr && $();
          (g = ["string", r.slice(h, o + 1), h, o]), (h = o);
          break;
        }
        case Wp: {
          (pr.lastIndex = h + 1),
            pr.test(r),
            pr.lastIndex === 0 ? (o = r.length - 1) : (o = pr.lastIndex - 2),
            (g = ["at-word", r.slice(h, o + 1), h, o]),
            (h = o);
          break;
        }
        case xt: {
          for (o = h, c = !0; r.charCodeAt(o + 1) === xt; ) (o += 1), (c = !c);
          if (
            ((i = r.charCodeAt(o + 1)),
            c &&
              i !== lr &&
              i !== cr &&
              i !== Vn &&
              i !== Gn &&
              i !== Kn &&
              i !== Yn &&
              ((o += 1), Ea.test(r.charAt(o))))
          ) {
            for (; Ea.test(r.charAt(o + 1)); ) o += 1;
            r.charCodeAt(o + 1) === cr && (o += 1);
          }
          (g = ["word", r.slice(h, o + 1), h, o]), (h = o);
          break;
        }
        default:
          (l = r.charCodeAt(h + 1)),
            i === Hn && l === fr
              ? ((o = h),
                $(),
                (u = r.slice(h, o + 1)),
                (g = ["word", u, h, o]),
                (h = o))
              : i === lr && l === $p
                ? ((o = r.indexOf("*/", h + 2) + 1),
                  o === 0 && (s || C ? (o = r.length) : v("comment")),
                  (g = ["comment", r.slice(h, o + 1), h, o]),
                  (h = o))
                : i === lr && l === lr
                  ? ((dr.lastIndex = h + 1),
                    dr.test(r),
                    dr.lastIndex === 0
                      ? (o = r.length - 1)
                      : (o = dr.lastIndex - 2),
                    (u = r.slice(h, o + 1)),
                    (g = ["comment", u, h, o, "inline"]),
                    (h = o))
                  : ((hr.lastIndex = h + 1),
                    hr.test(r),
                    hr.lastIndex === 0
                      ? (o = r.length - 1)
                      : (o = hr.lastIndex - 2),
                    (g = ["word", r.slice(h, o + 1), h, o]),
                    d.push(g),
                    (h = o));
          break;
      }
      return h++, g;
    }
    function U(S) {
      m.push(S);
    }
    return { back: U, endOfFile: N, nextToken: H, position: w };
  };
});
var Aa = y((lb, Oa) => {
  var { Comment: Yp } = ur(),
    Gp = nr(),
    Kp = ba(),
    Hp = Ca(),
    Qn = class extends Gp {
      atrule(e) {
        let n = e[1],
          r = e;
        for (; !this.tokenizer.endOfFile(); ) {
          let s = this.tokenizer.nextToken();
          if (s[0] === "word" && s[2] === r[3] + 1) (n += s[1]), (r = s);
          else {
            this.tokenizer.back(s);
            break;
          }
        }
        super.atrule(["at-word", n, e[2], r[3]]);
      }
      comment(e) {
        if (e[4] === "inline") {
          let n = new Yp();
          this.init(n, e[2]), (n.raws.inline = !0);
          let r = this.input.fromOffset(e[3]);
          n.source.end = { column: r.col, line: r.line, offset: e[3] };
          let s = e[1].slice(2);
          if (/^\s*$/.test(s))
            (n.text = ""), (n.raws.left = s), (n.raws.right = "");
          else {
            let i = s.match(/^(\s*)([^]*\S)(\s*)$/),
              o = i[2].replace(/(\*\/|\/\*)/g, "*//*");
            (n.text = o),
              (n.raws.left = i[1]),
              (n.raws.right = i[3]),
              (n.raws.text = i[2]);
          }
        } else super.comment(e);
      }
      createTokenizer() {
        this.tokenizer = Hp(this.input);
      }
      raw(e, n, r, s) {
        if ((super.raw(e, n, r, s), e.raws[n])) {
          let i = e.raws[n].raw;
          (e.raws[n].raw = r.reduce((o, a) => {
            if (a[0] === "comment" && a[4] === "inline") {
              let u = a[1].slice(2).replace(/(\*\/|\/\*)/g, "*//*");
              return o + "/*" + u + "*/";
            } else return o + a[1];
          }, "")),
            i !== e.raws[n].raw && (e.raws[n].scss = i);
        }
      }
      rule(e) {
        let n = !1,
          r = 0,
          s = "";
        for (let i of e)
          if (n) i[0] !== "comment" && i[0] !== "{" && (s += i[1]);
          else {
            if (
              i[0] === "space" &&
              i[1].includes(`
`)
            )
              break;
            i[0] === "("
              ? (r += 1)
              : i[0] === ")"
                ? (r -= 1)
                : r === 0 && i[0] === ":" && (n = !0);
          }
        if (!n || s.trim() === "" || /^[#:A-Za-z-]/.test(s)) super.rule(e);
        else {
          e.pop();
          let i = new Kp();
          this.init(i, e[0][2]);
          let o;
          for (let u = e.length - 1; u >= 0; u--)
            if (e[u][0] !== "space") {
              o = e[u];
              break;
            }
          if (o[3]) {
            let u = this.input.fromOffset(o[3]);
            i.source.end = { column: u.col, line: u.line, offset: o[3] };
          } else {
            let u = this.input.fromOffset(o[2]);
            i.source.end = { column: u.col, line: u.line, offset: o[2] };
          }
          for (; e[0][0] !== "word"; ) i.raws.before += e.shift()[1];
          if (e[0][2]) {
            let u = this.input.fromOffset(e[0][2]);
            i.source.start = { column: u.col, line: u.line, offset: e[0][2] };
          }
          for (i.prop = ""; e.length; ) {
            let u = e[0][0];
            if (u === ":" || u === "space" || u === "comment") break;
            i.prop += e.shift()[1];
          }
          i.raws.between = "";
          let a;
          for (; e.length; )
            if (((a = e.shift()), a[0] === ":")) {
              i.raws.between += a[1];
              break;
            } else i.raws.between += a[1];
          (i.prop[0] === "_" || i.prop[0] === "*") &&
            ((i.raws.before += i.prop[0]), (i.prop = i.prop.slice(1))),
            (i.raws.between += this.spacesAndCommentsFromStart(e)),
            this.precheckMissedSemicolon(e);
          for (let u = e.length - 1; u > 0; u--) {
            if (((a = e[u]), a[1] === "!important")) {
              i.important = !0;
              let c = this.stringFrom(e, u);
              (c = this.spacesFromEnd(e) + c),
                c !== " !important" && (i.raws.important = c);
              break;
            } else if (a[1] === "important") {
              let c = e.slice(0),
                f = "";
              for (let p = u; p > 0; p--) {
                let l = c[p][0];
                if (f.trim().indexOf("!") === 0 && l !== "space") break;
                f = c.pop()[1] + f;
              }
              f.trim().indexOf("!") === 0 &&
                ((i.important = !0), (i.raws.important = f), (e = c));
            }
            if (a[0] !== "space" && a[0] !== "comment") break;
          }
          this.raw(i, "value", e),
            i.value.includes(":") && this.checkMissedSemicolon(e),
            (this.current = i);
        }
      }
    };
  Oa.exports = Qn;
});
var Pa = y((cb, Na) => {
  var { Input: Qp } = ur(),
    jp = Aa();
  Na.exports = function (e, n) {
    let r = new Qp(e, n),
      s = new jp(r);
    return s.parse(), s.root;
  };
});
var V = y((mb, Da) => {
  "use strict";
  var jn = function (t, e) {
    let n = new t.constructor();
    for (let r in t) {
      if (!t.hasOwnProperty(r)) continue;
      let s = t[r],
        i = typeof s;
      r === "parent" && i === "object"
        ? e && (n[r] = e)
        : r === "source"
          ? (n[r] = s)
          : s instanceof Array
            ? (n[r] = s.map((o) => jn(o, n)))
            : r !== "before" &&
              r !== "after" &&
              r !== "between" &&
              r !== "semicolon" &&
              (i === "object" && s !== null && (s = jn(s)), (n[r] = s));
    }
    return n;
  };
  Da.exports = class {
    constructor(e) {
      (e = e || {}), (this.raws = { before: "", after: "" });
      for (let n in e) this[n] = e[n];
    }
    remove() {
      return (
        this.parent && this.parent.removeChild(this),
        (this.parent = void 0),
        this
      );
    }
    toString() {
      return [this.raws.before, String(this.value), this.raws.after].join("");
    }
    clone(e) {
      e = e || {};
      let n = jn(this);
      for (let r in e) n[r] = e[r];
      return n;
    }
    cloneBefore(e) {
      e = e || {};
      let n = this.clone(e);
      return this.parent.insertBefore(this, n), n;
    }
    cloneAfter(e) {
      e = e || {};
      let n = this.clone(e);
      return this.parent.insertAfter(this, n), n;
    }
    replaceWith() {
      let e = Array.prototype.slice.call(arguments);
      if (this.parent) {
        for (let n of e) this.parent.insertBefore(this, n);
        this.remove();
      }
      return this;
    }
    moveTo(e) {
      return (
        this.cleanRaws(this.root() === e.root()),
        this.remove(),
        e.append(this),
        this
      );
    }
    moveBefore(e) {
      return (
        this.cleanRaws(this.root() === e.root()),
        this.remove(),
        e.parent.insertBefore(e, this),
        this
      );
    }
    moveAfter(e) {
      return (
        this.cleanRaws(this.root() === e.root()),
        this.remove(),
        e.parent.insertAfter(e, this),
        this
      );
    }
    next() {
      let e = this.parent.index(this);
      return this.parent.nodes[e + 1];
    }
    prev() {
      let e = this.parent.index(this);
      return this.parent.nodes[e - 1];
    }
    toJSON() {
      let e = {};
      for (let n in this) {
        if (!this.hasOwnProperty(n) || n === "parent") continue;
        let r = this[n];
        r instanceof Array
          ? (e[n] = r.map((s) =>
              typeof s == "object" && s.toJSON ? s.toJSON() : s,
            ))
          : typeof r == "object" && r.toJSON
            ? (e[n] = r.toJSON())
            : (e[n] = r);
      }
      return e;
    }
    root() {
      let e = this;
      for (; e.parent; ) e = e.parent;
      return e;
    }
    cleanRaws(e) {
      delete this.raws.before,
        delete this.raws.after,
        e || delete this.raws.between;
    }
    positionInside(e) {
      let n = this.toString(),
        r = this.source.start.column,
        s = this.source.start.line;
      for (let i = 0; i < e; i++)
        n[i] ===
        `
`
          ? ((r = 1), (s += 1))
          : (r += 1);
      return { line: s, column: r };
    }
    positionBy(e) {
      let n = this.source.start;
      if (Object(e).index) n = this.positionInside(e.index);
      else if (Object(e).word) {
        let r = this.toString().indexOf(e.word);
        r !== -1 && (n = this.positionInside(r));
      }
      return n;
    }
  };
});
var B = y((yb, La) => {
  "use strict";
  var th = V(),
    Le = class extends th {
      constructor(e) {
        super(e), this.nodes || (this.nodes = []);
      }
      push(e) {
        return (e.parent = this), this.nodes.push(e), this;
      }
      each(e) {
        this.lastEach || (this.lastEach = 0),
          this.indexes || (this.indexes = {}),
          (this.lastEach += 1);
        let n = this.lastEach,
          r,
          s;
        if (((this.indexes[n] = 0), !!this.nodes)) {
          for (
            ;
            this.indexes[n] < this.nodes.length &&
            ((r = this.indexes[n]), (s = e(this.nodes[r], r)), s !== !1);

          )
            this.indexes[n] += 1;
          return delete this.indexes[n], s;
        }
      }
      walk(e) {
        return this.each((n, r) => {
          let s = e(n, r);
          return s !== !1 && n.walk && (s = n.walk(e)), s;
        });
      }
      walkType(e, n) {
        if (!e || !n)
          throw new Error("Parameters {type} and {callback} are required.");
        let r = typeof e == "function";
        return this.walk((s, i) => {
          if ((r && s instanceof e) || (!r && s.type === e))
            return n.call(this, s, i);
        });
      }
      append(e) {
        return (e.parent = this), this.nodes.push(e), this;
      }
      prepend(e) {
        return (e.parent = this), this.nodes.unshift(e), this;
      }
      cleanRaws(e) {
        if ((super.cleanRaws(e), this.nodes))
          for (let n of this.nodes) n.cleanRaws(e);
      }
      insertAfter(e, n) {
        let r = this.index(e),
          s;
        this.nodes.splice(r + 1, 0, n);
        for (let i in this.indexes)
          (s = this.indexes[i]),
            r <= s && (this.indexes[i] = s + this.nodes.length);
        return this;
      }
      insertBefore(e, n) {
        let r = this.index(e),
          s;
        this.nodes.splice(r, 0, n);
        for (let i in this.indexes)
          (s = this.indexes[i]),
            r <= s && (this.indexes[i] = s + this.nodes.length);
        return this;
      }
      removeChild(e) {
        (e = this.index(e)),
          (this.nodes[e].parent = void 0),
          this.nodes.splice(e, 1);
        let n;
        for (let r in this.indexes)
          (n = this.indexes[r]), n >= e && (this.indexes[r] = n - 1);
        return this;
      }
      removeAll() {
        for (let e of this.nodes) e.parent = void 0;
        return (this.nodes = []), this;
      }
      every(e) {
        return this.nodes.every(e);
      }
      some(e) {
        return this.nodes.some(e);
      }
      index(e) {
        return typeof e == "number" ? e : this.nodes.indexOf(e);
      }
      get first() {
        if (this.nodes) return this.nodes[0];
      }
      get last() {
        if (this.nodes) return this.nodes[this.nodes.length - 1];
      }
      toString() {
        let e = this.nodes.map(String).join("");
        return (
          this.value && (e = this.value + e),
          this.raws.before && (e = this.raws.before + e),
          this.raws.after && (e += this.raws.after),
          e
        );
      }
    };
  Le.registerWalker = (t) => {
    let e = "walk" + t.name;
    e.lastIndexOf("s") !== e.length - 1 && (e += "s"),
      !Le.prototype[e] &&
        (Le.prototype[e] = function (n) {
          return this.walkType(t, n);
        });
  };
  La.exports = Le;
});
var Ba = y((wb, Ma) => {
  "use strict";
  var rh = B();
  Ma.exports = class extends rh {
    constructor(e) {
      super(e), (this.type = "root");
    }
  };
});
var $a = y((xb, Fa) => {
  "use strict";
  var nh = B();
  Fa.exports = class extends nh {
    constructor(e) {
      super(e), (this.type = "value"), (this.unbalanced = 0);
    }
  };
});
var za = y((bb, Wa) => {
  "use strict";
  var Ua = B(),
    mr = class extends Ua {
      constructor(e) {
        super(e), (this.type = "atword");
      }
      toString() {
        let e = this.quoted ? this.raws.quote : "";
        return [
          this.raws.before,
          "@",
          String.prototype.toString.call(this.value),
          this.raws.after,
        ].join("");
      }
    };
  Ua.registerWalker(mr);
  Wa.exports = mr;
});
var Ya = y((kb, Va) => {
  "use strict";
  var sh = B(),
    ih = V(),
    yr = class extends ih {
      constructor(e) {
        super(e), (this.type = "colon");
      }
    };
  sh.registerWalker(yr);
  Va.exports = yr;
});
var Ka = y((_b, Ga) => {
  "use strict";
  var oh = B(),
    ah = V(),
    gr = class extends ah {
      constructor(e) {
        super(e), (this.type = "comma");
      }
    };
  oh.registerWalker(gr);
  Ga.exports = gr;
});
var Qa = y((Tb, Ha) => {
  "use strict";
  var uh = B(),
    lh = V(),
    wr = class extends lh {
      constructor(e) {
        super(e),
          (this.type = "comment"),
          (this.inline = Object(e).inline || !1);
      }
      toString() {
        return [
          this.raws.before,
          this.inline ? "//" : "/*",
          String(this.value),
          this.inline ? "" : "*/",
          this.raws.after,
        ].join("");
      }
    };
  uh.registerWalker(wr);
  Ha.exports = wr;
});
var Xa = y((Eb, Ja) => {
  "use strict";
  var ja = B(),
    vr = class extends ja {
      constructor(e) {
        super(e), (this.type = "func"), (this.unbalanced = -1);
      }
    };
  ja.registerWalker(vr);
  Ja.exports = vr;
});
var eu = y((Sb, Za) => {
  "use strict";
  var ch = B(),
    fh = V(),
    xr = class extends fh {
      constructor(e) {
        super(e), (this.type = "number"), (this.unit = Object(e).unit || "");
      }
      toString() {
        return [
          this.raws.before,
          String(this.value),
          this.unit,
          this.raws.after,
        ].join("");
      }
    };
  ch.registerWalker(xr);
  Za.exports = xr;
});
var ru = y((Cb, tu) => {
  "use strict";
  var ph = B(),
    hh = V(),
    br = class extends hh {
      constructor(e) {
        super(e), (this.type = "operator");
      }
    };
  ph.registerWalker(br);
  tu.exports = br;
});
var su = y((Ob, nu) => {
  "use strict";
  var dh = B(),
    mh = V(),
    kr = class extends mh {
      constructor(e) {
        super(e), (this.type = "paren"), (this.parenType = "");
      }
    };
  dh.registerWalker(kr);
  nu.exports = kr;
});
var ou = y((Ab, iu) => {
  "use strict";
  var yh = B(),
    gh = V(),
    _r = class extends gh {
      constructor(e) {
        super(e), (this.type = "string");
      }
      toString() {
        let e = this.quoted ? this.raws.quote : "";
        return [this.raws.before, e, this.value + "", e, this.raws.after].join(
          "",
        );
      }
    };
  yh.registerWalker(_r);
  iu.exports = _r;
});
var uu = y((Nb, au) => {
  "use strict";
  var wh = B(),
    vh = V(),
    Tr = class extends vh {
      constructor(e) {
        super(e), (this.type = "word");
      }
    };
  wh.registerWalker(Tr);
  au.exports = Tr;
});
var cu = y((Pb, lu) => {
  "use strict";
  var xh = B(),
    bh = V(),
    Er = class extends bh {
      constructor(e) {
        super(e), (this.type = "unicode-range");
      }
    };
  xh.registerWalker(Er);
  lu.exports = Er;
});
var pu = y((Rb, fu) => {
  "use strict";
  var Jn = class extends Error {
    constructor(e) {
      super(e),
        (this.name = this.constructor.name),
        (this.message = e || "An error ocurred while tokzenizing."),
        typeof Error.captureStackTrace == "function"
          ? Error.captureStackTrace(this, this.constructor)
          : (this.stack = new Error(e).stack);
    }
  };
  fu.exports = Jn;
});
var vu = y((Ib, wu) => {
  "use strict";
  var kh = "{".charCodeAt(0),
    _h = "}".charCodeAt(0),
    Th = "(".charCodeAt(0),
    Eh = ")".charCodeAt(0),
    hu = "'".charCodeAt(0),
    Sh = '"'.charCodeAt(0),
    du = "\\".charCodeAt(0),
    Sr = "/".charCodeAt(0),
    Ch = ".".charCodeAt(0),
    Oh = ",".charCodeAt(0),
    Ah = ":".charCodeAt(0),
    Xn = "*".charCodeAt(0),
    Cr = "-".charCodeAt(0),
    Zn = "+".charCodeAt(0),
    Nh = "#".charCodeAt(0),
    bt = `
`.charCodeAt(0),
    es = " ".charCodeAt(0),
    ts = "\f".charCodeAt(0),
    rs = "	".charCodeAt(0),
    ns = "\r".charCodeAt(0),
    Ph = "@".charCodeAt(0),
    Rh = "e".charCodeAt(0),
    Ih = "E".charCodeAt(0),
    mu = "0".charCodeAt(0),
    yu = "9".charCodeAt(0),
    qh = "u".charCodeAt(0),
    Dh = "U".charCodeAt(0),
    Or = /[ \n\t\r\{\(\)'"\\;,/]/g,
    Lh = /[ \n\t\r\(\)\{\}\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g,
    Me = /[ \n\t\r\(\)\{\}\*:;@!&'"\-\+\|~>,\[\]\\]|\//g,
    Mh = /^[a-z0-9]/i,
    Bh = /^[a-f0-9?\-]/i,
    gu = pu();
  wu.exports = function (e, n) {
    n = n || {};
    let r = [],
      s = e.valueOf(),
      i = s.length,
      o = -1,
      a = 1,
      u = 0,
      c = 0,
      f = null,
      p,
      l,
      g,
      x,
      h,
      d,
      m,
      b,
      w,
      v,
      N,
      $;
    function H(S) {
      let C = `Unclosed ${S} at line: ${a}, column: ${u - o}, token: ${u}`;
      throw new gu(C);
    }
    function U() {
      let S = `Syntax error at line: ${a}, column: ${u - o}, token: ${u}`;
      throw new gu(S);
    }
    for (; u < i; ) {
      switch (((p = s.charCodeAt(u)), p === bt && ((o = u), (a += 1)), p)) {
        case bt:
        case es:
        case rs:
        case ns:
        case ts:
          l = u;
          do (l += 1), (p = s.charCodeAt(l)), p === bt && ((o = l), (a += 1));
          while (p === es || p === bt || p === rs || p === ns || p === ts);
          r.push(["space", s.slice(u, l), a, u - o, a, l - o, u]), (u = l - 1);
          break;
        case Ah:
          (l = u + 1),
            r.push(["colon", s.slice(u, l), a, u - o, a, l - o, u]),
            (u = l - 1);
          break;
        case Oh:
          (l = u + 1),
            r.push(["comma", s.slice(u, l), a, u - o, a, l - o, u]),
            (u = l - 1);
          break;
        case kh:
          r.push(["{", "{", a, u - o, a, l - o, u]);
          break;
        case _h:
          r.push(["}", "}", a, u - o, a, l - o, u]);
          break;
        case Th:
          c++,
            (f =
              !f &&
              c === 1 &&
              r.length > 0 &&
              r[r.length - 1][0] === "word" &&
              r[r.length - 1][1] === "url"),
            r.push(["(", "(", a, u - o, a, l - o, u]);
          break;
        case Eh:
          c--, (f = f && c > 0), r.push([")", ")", a, u - o, a, l - o, u]);
          break;
        case hu:
        case Sh:
          (g = p === hu ? "'" : '"'), (l = u);
          do
            for (
              v = !1, l = s.indexOf(g, l + 1), l === -1 && H("quote", g), N = l;
              s.charCodeAt(N - 1) === du;

            )
              (N -= 1), (v = !v);
          while (v);
          r.push(["string", s.slice(u, l + 1), a, u - o, a, l - o, u]), (u = l);
          break;
        case Ph:
          (Or.lastIndex = u + 1),
            Or.test(s),
            Or.lastIndex === 0 ? (l = s.length - 1) : (l = Or.lastIndex - 2),
            r.push(["atword", s.slice(u, l + 1), a, u - o, a, l - o, u]),
            (u = l);
          break;
        case du:
          (l = u),
            (p = s.charCodeAt(l + 1)),
            m &&
              p !== Sr &&
              p !== es &&
              p !== bt &&
              p !== rs &&
              p !== ns &&
              p !== ts &&
              (l += 1),
            r.push(["word", s.slice(u, l + 1), a, u - o, a, l - o, u]),
            (u = l);
          break;
        case Zn:
        case Cr:
        case Xn:
          (l = u + 1), ($ = s.slice(u + 1, l + 1));
          let S = s.slice(u - 1, u);
          if (p === Cr && $.charCodeAt(0) === Cr) {
            l++,
              r.push(["word", s.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
            break;
          }
          r.push(["operator", s.slice(u, l), a, u - o, a, l - o, u]),
            (u = l - 1);
          break;
        default:
          if (
            p === Sr &&
            (s.charCodeAt(u + 1) === Xn ||
              (n.loose && !f && s.charCodeAt(u + 1) === Sr))
          ) {
            if (s.charCodeAt(u + 1) === Xn)
              (l = s.indexOf("*/", u + 2) + 1), l === 0 && H("comment", "*/");
            else {
              let O = s.indexOf(
                `
`,
                u + 2,
              );
              l = O !== -1 ? O - 1 : i;
            }
            (d = s.slice(u, l + 1)),
              (x = d.split(`
`)),
              (h = x.length - 1),
              h > 0 ? ((b = a + h), (w = l - x[h].length)) : ((b = a), (w = o)),
              r.push(["comment", d, a, u - o, b, l - w, u]),
              (o = w),
              (a = b),
              (u = l);
          } else if (p === Nh && !Mh.test(s.slice(u + 1, u + 2)))
            (l = u + 1),
              r.push(["#", s.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
          else if ((p === qh || p === Dh) && s.charCodeAt(u + 1) === Zn) {
            l = u + 2;
            do (l += 1), (p = s.charCodeAt(l));
            while (l < i && Bh.test(s.slice(l, l + 1)));
            r.push(["unicoderange", s.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
          } else if (p === Sr)
            (l = u + 1),
              r.push(["operator", s.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
          else {
            let C = Lh;
            if (
              (p >= mu && p <= yu && (C = Me),
              (C.lastIndex = u + 1),
              C.test(s),
              C.lastIndex === 0 ? (l = s.length - 1) : (l = C.lastIndex - 2),
              C === Me || p === Ch)
            ) {
              let O = s.charCodeAt(l),
                ve = s.charCodeAt(l + 1),
                Cs = s.charCodeAt(l + 2);
              (O === Rh || O === Ih) &&
                (ve === Cr || ve === Zn) &&
                Cs >= mu &&
                Cs <= yu &&
                ((Me.lastIndex = l + 2),
                Me.test(s),
                Me.lastIndex === 0
                  ? (l = s.length - 1)
                  : (l = Me.lastIndex - 2));
            }
            r.push(["word", s.slice(u, l + 1), a, u - o, a, l - o, u]), (u = l);
          }
          break;
      }
      u++;
    }
    return r;
  };
});
var ss = y((qb, xu) => {
  xu.exports = function (e, n) {
    if (((n = typeof n == "number" ? n : 1 / 0), !n))
      return Array.isArray(e)
        ? e.map(function (s) {
            return s;
          })
        : e;
    return r(e, 1);
    function r(s, i) {
      return s.reduce(function (o, a) {
        return Array.isArray(a) && i < n ? o.concat(r(a, i + 1)) : o.concat(a);
      }, []);
    }
  };
});
var is = y((Db, bu) => {
  bu.exports = function (t, e) {
    for (var n = -1, r = []; (n = t.indexOf(e, n + 1)) !== -1; ) r.push(n);
    return r;
  };
});
var os = y((Lb, ku) => {
  "use strict";
  function Fh(t, e) {
    for (var n = 1, r = t.length, s = t[0], i = t[0], o = 1; o < r; ++o)
      if (((i = s), (s = t[o]), e(s, i))) {
        if (o === n) {
          n++;
          continue;
        }
        t[n++] = s;
      }
    return (t.length = n), t;
  }
  function $h(t) {
    for (var e = 1, n = t.length, r = t[0], s = t[0], i = 1; i < n; ++i, s = r)
      if (((s = r), (r = t[i]), r !== s)) {
        if (i === e) {
          e++;
          continue;
        }
        t[e++] = r;
      }
    return (t.length = e), t;
  }
  function Uh(t, e, n) {
    return t.length === 0
      ? t
      : e
        ? (n || t.sort(e), Fh(t, e))
        : (n || t.sort(), $h(t));
  }
  ku.exports = Uh;
});
var Tu = y((Mb, _u) => {
  "use strict";
  var as = class extends Error {
    constructor(e) {
      super(e),
        (this.name = this.constructor.name),
        (this.message = e || "An error ocurred while parsing."),
        typeof Error.captureStackTrace == "function"
          ? Error.captureStackTrace(this, this.constructor)
          : (this.stack = new Error(e).stack);
    }
  };
  _u.exports = as;
});
var Ou = y((Fb, Cu) => {
  "use strict";
  var Wh = Ba(),
    zh = $a(),
    Vh = za(),
    Yh = Ya(),
    Gh = Ka(),
    Kh = Qa(),
    Hh = Xa(),
    Qh = eu(),
    jh = ru(),
    Eu = su(),
    Jh = ou(),
    Su = uu(),
    Xh = cu(),
    Zh = vu(),
    ed = ss(),
    td = is(),
    rd = os(),
    nd = Tu();
  function sd(t) {
    return t.sort((e, n) => e - n);
  }
  Cu.exports = class {
    constructor(e, n) {
      let r = { loose: !1 };
      (this.cache = []),
        (this.input = e),
        (this.options = Object.assign({}, r, n)),
        (this.position = 0),
        (this.unbalanced = 0),
        (this.root = new Wh());
      let s = new zh();
      this.root.append(s),
        (this.current = s),
        (this.tokens = Zh(e, this.options));
    }
    parse() {
      return this.loop();
    }
    colon() {
      let e = this.currToken;
      this.newNode(
        new Yh({
          value: e[1],
          source: {
            start: { line: e[2], column: e[3] },
            end: { line: e[4], column: e[5] },
          },
          sourceIndex: e[6],
        }),
      ),
        this.position++;
    }
    comma() {
      let e = this.currToken;
      this.newNode(
        new Gh({
          value: e[1],
          source: {
            start: { line: e[2], column: e[3] },
            end: { line: e[4], column: e[5] },
          },
          sourceIndex: e[6],
        }),
      ),
        this.position++;
    }
    comment() {
      let e = !1,
        n = this.currToken[1].replace(/\/\*|\*\//g, ""),
        r;
      this.options.loose &&
        n.startsWith("//") &&
        ((n = n.substring(2)), (e = !0)),
        (r = new Kh({
          value: n,
          inline: e,
          source: {
            start: { line: this.currToken[2], column: this.currToken[3] },
            end: { line: this.currToken[4], column: this.currToken[5] },
          },
          sourceIndex: this.currToken[6],
        })),
        this.newNode(r),
        this.position++;
    }
    error(e, n) {
      throw new nd(e + ` at line: ${n[2]}, column ${n[3]}`);
    }
    loop() {
      for (; this.position < this.tokens.length; ) this.parseTokens();
      return (
        !this.current.last && this.spaces
          ? (this.current.raws.before += this.spaces)
          : this.spaces && (this.current.last.raws.after += this.spaces),
        (this.spaces = ""),
        this.root
      );
    }
    operator() {
      let e = this.currToken[1],
        n;
      if (e === "+" || e === "-") {
        if (
          (this.options.loose ||
            (this.position > 0 &&
              (this.current.type === "func" && this.current.value === "calc"
                ? this.prevToken[0] !== "space" && this.prevToken[0] !== "("
                  ? this.error("Syntax Error", this.currToken)
                  : this.nextToken[0] !== "space" &&
                      this.nextToken[0] !== "word"
                    ? this.error("Syntax Error", this.currToken)
                    : this.nextToken[0] === "word" &&
                      this.current.last.type !== "operator" &&
                      this.current.last.value !== "(" &&
                      this.error("Syntax Error", this.currToken)
                : (this.nextToken[0] === "space" ||
                    this.nextToken[0] === "operator" ||
                    this.prevToken[0] === "operator") &&
                  this.error("Syntax Error", this.currToken))),
          this.options.loose)
        ) {
          if (
            (!this.current.nodes.length ||
              (this.current.last && this.current.last.type === "operator")) &&
            this.nextToken[0] === "word"
          )
            return this.word();
        } else if (this.nextToken[0] === "word") return this.word();
      }
      return (
        (n = new jh({
          value: this.currToken[1],
          source: {
            start: { line: this.currToken[2], column: this.currToken[3] },
            end: { line: this.currToken[2], column: this.currToken[3] },
          },
          sourceIndex: this.currToken[4],
        })),
        this.position++,
        this.newNode(n)
      );
    }
    parseTokens() {
      switch (this.currToken[0]) {
        case "space":
          this.space();
          break;
        case "colon":
          this.colon();
          break;
        case "comma":
          this.comma();
          break;
        case "comment":
          this.comment();
          break;
        case "(":
          this.parenOpen();
          break;
        case ")":
          this.parenClose();
          break;
        case "atword":
        case "word":
          this.word();
          break;
        case "operator":
          this.operator();
          break;
        case "string":
          this.string();
          break;
        case "unicoderange":
          this.unicodeRange();
          break;
        default:
          this.word();
          break;
      }
    }
    parenOpen() {
      let e = 1,
        n = this.position + 1,
        r = this.currToken,
        s;
      for (; n < this.tokens.length && e; ) {
        let i = this.tokens[n];
        i[0] === "(" && e++, i[0] === ")" && e--, n++;
      }
      if (
        (e && this.error("Expected closing parenthesis", r),
        (s = this.current.last),
        s &&
          s.type === "func" &&
          s.unbalanced < 0 &&
          ((s.unbalanced = 0), (this.current = s)),
        this.current.unbalanced++,
        this.newNode(
          new Eu({
            value: r[1],
            source: {
              start: { line: r[2], column: r[3] },
              end: { line: r[4], column: r[5] },
            },
            sourceIndex: r[6],
          }),
        ),
        this.position++,
        this.current.type === "func" &&
          this.current.unbalanced &&
          this.current.value === "url" &&
          this.currToken[0] !== "string" &&
          this.currToken[0] !== ")" &&
          !this.options.loose)
      ) {
        let i = this.nextToken,
          o = this.currToken[1],
          a = { line: this.currToken[2], column: this.currToken[3] };
        for (; i && i[0] !== ")" && this.current.unbalanced; )
          this.position++, (o += this.currToken[1]), (i = this.nextToken);
        this.position !== this.tokens.length - 1 &&
          (this.position++,
          this.newNode(
            new Su({
              value: o,
              source: {
                start: a,
                end: { line: this.currToken[4], column: this.currToken[5] },
              },
              sourceIndex: this.currToken[6],
            }),
          ));
      }
    }
    parenClose() {
      let e = this.currToken;
      this.newNode(
        new Eu({
          value: e[1],
          source: {
            start: { line: e[2], column: e[3] },
            end: { line: e[4], column: e[5] },
          },
          sourceIndex: e[6],
        }),
      ),
        this.position++,
        !(
          this.position >= this.tokens.length - 1 && !this.current.unbalanced
        ) &&
          (this.current.unbalanced--,
          this.current.unbalanced < 0 &&
            this.error("Expected opening parenthesis", e),
          !this.current.unbalanced &&
            this.cache.length &&
            (this.current = this.cache.pop()));
    }
    space() {
      let e = this.currToken;
      this.position === this.tokens.length - 1 ||
      this.nextToken[0] === "," ||
      this.nextToken[0] === ")"
        ? ((this.current.last.raws.after += e[1]), this.position++)
        : ((this.spaces = e[1]), this.position++);
    }
    unicodeRange() {
      let e = this.currToken;
      this.newNode(
        new Xh({
          value: e[1],
          source: {
            start: { line: e[2], column: e[3] },
            end: { line: e[4], column: e[5] },
          },
          sourceIndex: e[6],
        }),
      ),
        this.position++;
    }
    splitWord() {
      let e = this.nextToken,
        n = this.currToken[1],
        r = /^[\+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][\+\-]?\d+)?/,
        s = /^(?!\#([a-z0-9]+))[\#\{\}]/gi,
        i,
        o;
      if (!s.test(n))
        for (; e && e[0] === "word"; ) {
          this.position++;
          let a = this.currToken[1];
          (n += a), (e = this.nextToken);
        }
      (i = td(n, "@")),
        (o = sd(rd(ed([[0], i])))),
        o.forEach((a, u) => {
          let c = o[u + 1] || n.length,
            f = n.slice(a, c),
            p;
          if (~i.indexOf(a))
            p = new Vh({
              value: f.slice(1),
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + a,
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (c - 1),
                },
              },
              sourceIndex: this.currToken[6] + o[u],
            });
          else if (r.test(this.currToken[1])) {
            let l = f.replace(r, "");
            p = new Qh({
              value: f.replace(l, ""),
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + a,
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (c - 1),
                },
              },
              sourceIndex: this.currToken[6] + o[u],
              unit: l,
            });
          } else
            (p = new (e && e[0] === "(" ? Hh : Su)({
              value: f,
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + a,
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (c - 1),
                },
              },
              sourceIndex: this.currToken[6] + o[u],
            })),
              p.type === "word"
                ? ((p.isHex = /^#(.+)/.test(f)),
                  (p.isColor =
                    /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
                      f,
                    )))
                : this.cache.push(this.current);
          this.newNode(p);
        }),
        this.position++;
    }
    string() {
      let e = this.currToken,
        n = this.currToken[1],
        r = /^(\"|\')/,
        s = r.test(n),
        i = "",
        o;
      s && ((i = n.match(r)[0]), (n = n.slice(1, n.length - 1))),
        (o = new Jh({
          value: n,
          source: {
            start: { line: e[2], column: e[3] },
            end: { line: e[4], column: e[5] },
          },
          sourceIndex: e[6],
          quoted: s,
        })),
        (o.raws.quote = i),
        this.newNode(o),
        this.position++;
    }
    word() {
      return this.splitWord();
    }
    newNode(e) {
      return (
        this.spaces && ((e.raws.before += this.spaces), (this.spaces = "")),
        this.current.append(e)
      );
    }
    get currToken() {
      return this.tokens[this.position];
    }
    get nextToken() {
      return this.tokens[this.position + 1];
    }
    get prevToken() {
      return this.tokens[this.position - 1];
    }
  };
});
var we = y((Nr, qu) => {
  "use strict";
  Nr.__esModule = !0;
  var Iu =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            typeof Symbol == "function" &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        };
  function cd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  var fd = function t(e, n) {
      if ((typeof e > "u" ? "undefined" : Iu(e)) !== "object") return e;
      var r = new e.constructor();
      for (var s in e)
        if (e.hasOwnProperty(s)) {
          var i = e[s],
            o = typeof i > "u" ? "undefined" : Iu(i);
          s === "parent" && o === "object"
            ? n && (r[s] = n)
            : i instanceof Array
              ? (r[s] = i.map(function (a) {
                  return t(a, r);
                }))
              : (r[s] = t(i, r));
        }
      return r;
    },
    pd = (function () {
      function t() {
        var e =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        cd(this, t);
        for (var n in e) this[n] = e[n];
        var r = e.spaces;
        r = r === void 0 ? {} : r;
        var s = r.before,
          i = s === void 0 ? "" : s,
          o = r.after,
          a = o === void 0 ? "" : o;
        this.spaces = { before: i, after: a };
      }
      return (
        (t.prototype.remove = function () {
          return (
            this.parent && this.parent.removeChild(this),
            (this.parent = void 0),
            this
          );
        }),
        (t.prototype.replaceWith = function () {
          if (this.parent) {
            for (var n in arguments)
              this.parent.insertBefore(this, arguments[n]);
            this.remove();
          }
          return this;
        }),
        (t.prototype.next = function () {
          return this.parent.at(this.parent.index(this) + 1);
        }),
        (t.prototype.prev = function () {
          return this.parent.at(this.parent.index(this) - 1);
        }),
        (t.prototype.clone = function () {
          var n =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {},
            r = fd(this);
          for (var s in n) r[s] = n[s];
          return r;
        }),
        (t.prototype.toString = function () {
          return [
            this.spaces.before,
            String(this.value),
            this.spaces.after,
          ].join("");
        }),
        t
      );
    })();
  Nr.default = pd;
  qu.exports = Nr.default;
});
var L = y((F) => {
  "use strict";
  F.__esModule = !0;
  var Kb = (F.TAG = "tag"),
    Hb = (F.STRING = "string"),
    Qb = (F.SELECTOR = "selector"),
    jb = (F.ROOT = "root"),
    Jb = (F.PSEUDO = "pseudo"),
    Xb = (F.NESTING = "nesting"),
    Zb = (F.ID = "id"),
    ek = (F.COMMENT = "comment"),
    tk = (F.COMBINATOR = "combinator"),
    rk = (F.CLASS = "class"),
    nk = (F.ATTRIBUTE = "attribute"),
    sk = (F.UNIVERSAL = "universal");
});
var Rr = y((Pr, Du) => {
  "use strict";
  Pr.__esModule = !0;
  var hd = (function () {
      function t(e, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          (s.enumerable = s.enumerable || !1),
            (s.configurable = !0),
            "value" in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s);
        }
      }
      return function (e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
      };
    })(),
    dd = we(),
    md = wd(dd),
    yd = L(),
    J = gd(yd);
  function gd(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (t != null)
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return (e.default = t), e;
  }
  function wd(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function vd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function xd(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function bd(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var kd = (function (t) {
    bd(e, t);
    function e(n) {
      vd(this, e);
      var r = xd(this, t.call(this, n));
      return r.nodes || (r.nodes = []), r;
    }
    return (
      (e.prototype.append = function (r) {
        return (r.parent = this), this.nodes.push(r), this;
      }),
      (e.prototype.prepend = function (r) {
        return (r.parent = this), this.nodes.unshift(r), this;
      }),
      (e.prototype.at = function (r) {
        return this.nodes[r];
      }),
      (e.prototype.index = function (r) {
        return typeof r == "number" ? r : this.nodes.indexOf(r);
      }),
      (e.prototype.removeChild = function (r) {
        (r = this.index(r)),
          (this.at(r).parent = void 0),
          this.nodes.splice(r, 1);
        var s = void 0;
        for (var i in this.indexes)
          (s = this.indexes[i]), s >= r && (this.indexes[i] = s - 1);
        return this;
      }),
      (e.prototype.removeAll = function () {
        for (
          var i = this.nodes,
            r = Array.isArray(i),
            s = 0,
            i = r ? i : i[Symbol.iterator]();
          ;

        ) {
          var o;
          if (r) {
            if (s >= i.length) break;
            o = i[s++];
          } else {
            if (((s = i.next()), s.done)) break;
            o = s.value;
          }
          var a = o;
          a.parent = void 0;
        }
        return (this.nodes = []), this;
      }),
      (e.prototype.empty = function () {
        return this.removeAll();
      }),
      (e.prototype.insertAfter = function (r, s) {
        var i = this.index(r);
        this.nodes.splice(i + 1, 0, s);
        var o = void 0;
        for (var a in this.indexes)
          (o = this.indexes[a]),
            i <= o && (this.indexes[a] = o + this.nodes.length);
        return this;
      }),
      (e.prototype.insertBefore = function (r, s) {
        var i = this.index(r);
        this.nodes.splice(i, 0, s);
        var o = void 0;
        for (var a in this.indexes)
          (o = this.indexes[a]),
            i <= o && (this.indexes[a] = o + this.nodes.length);
        return this;
      }),
      (e.prototype.each = function (r) {
        this.lastEach || (this.lastEach = 0),
          this.indexes || (this.indexes = {}),
          this.lastEach++;
        var s = this.lastEach;
        if (((this.indexes[s] = 0), !!this.length)) {
          for (
            var i = void 0, o = void 0;
            this.indexes[s] < this.length &&
            ((i = this.indexes[s]), (o = r(this.at(i), i)), o !== !1);

          )
            this.indexes[s] += 1;
          if ((delete this.indexes[s], o === !1)) return !1;
        }
      }),
      (e.prototype.walk = function (r) {
        return this.each(function (s, i) {
          var o = r(s, i);
          if ((o !== !1 && s.length && (o = s.walk(r)), o === !1)) return !1;
        });
      }),
      (e.prototype.walkAttributes = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.ATTRIBUTE) return r.call(s, i);
        });
      }),
      (e.prototype.walkClasses = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.CLASS) return r.call(s, i);
        });
      }),
      (e.prototype.walkCombinators = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.COMBINATOR) return r.call(s, i);
        });
      }),
      (e.prototype.walkComments = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.COMMENT) return r.call(s, i);
        });
      }),
      (e.prototype.walkIds = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.ID) return r.call(s, i);
        });
      }),
      (e.prototype.walkNesting = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.NESTING) return r.call(s, i);
        });
      }),
      (e.prototype.walkPseudos = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.PSEUDO) return r.call(s, i);
        });
      }),
      (e.prototype.walkTags = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.TAG) return r.call(s, i);
        });
      }),
      (e.prototype.walkUniversals = function (r) {
        var s = this;
        return this.walk(function (i) {
          if (i.type === J.UNIVERSAL) return r.call(s, i);
        });
      }),
      (e.prototype.split = function (r) {
        var s = this,
          i = [];
        return this.reduce(function (o, a, u) {
          var c = r.call(s, a);
          return (
            i.push(a),
            c ? (o.push(i), (i = [])) : u === s.length - 1 && o.push(i),
            o
          );
        }, []);
      }),
      (e.prototype.map = function (r) {
        return this.nodes.map(r);
      }),
      (e.prototype.reduce = function (r, s) {
        return this.nodes.reduce(r, s);
      }),
      (e.prototype.every = function (r) {
        return this.nodes.every(r);
      }),
      (e.prototype.some = function (r) {
        return this.nodes.some(r);
      }),
      (e.prototype.filter = function (r) {
        return this.nodes.filter(r);
      }),
      (e.prototype.sort = function (r) {
        return this.nodes.sort(r);
      }),
      (e.prototype.toString = function () {
        return this.map(String).join("");
      }),
      hd(e, [
        {
          key: "first",
          get: function () {
            return this.at(0);
          },
        },
        {
          key: "last",
          get: function () {
            return this.at(this.length - 1);
          },
        },
        {
          key: "length",
          get: function () {
            return this.nodes.length;
          },
        },
      ]),
      e
    );
  })(md.default);
  Pr.default = kd;
  Du.exports = Pr.default;
});
var Mu = y((Ir, Lu) => {
  "use strict";
  Ir.__esModule = !0;
  var _d = Rr(),
    Td = Sd(_d),
    Ed = L();
  function Sd(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Cd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Od(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Ad(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Nd = (function (t) {
    Ad(e, t);
    function e(n) {
      Cd(this, e);
      var r = Od(this, t.call(this, n));
      return (r.type = Ed.ROOT), r;
    }
    return (
      (e.prototype.toString = function () {
        var r = this.reduce(function (s, i) {
          var o = String(i);
          return o ? s + o + "," : "";
        }, "").slice(0, -1);
        return this.trailingComma ? r + "," : r;
      }),
      e
    );
  })(Td.default);
  Ir.default = Nd;
  Lu.exports = Ir.default;
});
var Fu = y((qr, Bu) => {
  "use strict";
  qr.__esModule = !0;
  var Pd = Rr(),
    Rd = qd(Pd),
    Id = L();
  function qd(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Dd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Ld(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Md(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Bd = (function (t) {
    Md(e, t);
    function e(n) {
      Dd(this, e);
      var r = Ld(this, t.call(this, n));
      return (r.type = Id.SELECTOR), r;
    }
    return e;
  })(Rd.default);
  qr.default = Bd;
  Bu.exports = qr.default;
});
var Be = y((Dr, $u) => {
  "use strict";
  Dr.__esModule = !0;
  var Fd = (function () {
      function t(e, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          (s.enumerable = s.enumerable || !1),
            (s.configurable = !0),
            "value" in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s);
        }
      }
      return function (e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
      };
    })(),
    $d = we(),
    Ud = Wd($d);
  function Wd(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function zd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Vd(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Yd(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Gd = (function (t) {
    Yd(e, t);
    function e() {
      return zd(this, e), Vd(this, t.apply(this, arguments));
    }
    return (
      (e.prototype.toString = function () {
        return [
          this.spaces.before,
          this.ns,
          String(this.value),
          this.spaces.after,
        ].join("");
      }),
      Fd(e, [
        {
          key: "ns",
          get: function () {
            var r = this.namespace;
            return r ? (typeof r == "string" ? r : "") + "|" : "";
          },
        },
      ]),
      e
    );
  })(Ud.default);
  Dr.default = Gd;
  $u.exports = Dr.default;
});
var Wu = y((Lr, Uu) => {
  "use strict";
  Lr.__esModule = !0;
  var Kd = Be(),
    Hd = jd(Kd),
    Qd = L();
  function jd(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Jd(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Xd(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Zd(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var em = (function (t) {
    Zd(e, t);
    function e(n) {
      Jd(this, e);
      var r = Xd(this, t.call(this, n));
      return (r.type = Qd.CLASS), r;
    }
    return (
      (e.prototype.toString = function () {
        return [
          this.spaces.before,
          this.ns,
          "." + this.value,
          this.spaces.after,
        ].join("");
      }),
      e
    );
  })(Hd.default);
  Lr.default = em;
  Uu.exports = Lr.default;
});
var Vu = y((Mr, zu) => {
  "use strict";
  Mr.__esModule = !0;
  var tm = we(),
    rm = sm(tm),
    nm = L();
  function sm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function im(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function om(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function am(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var um = (function (t) {
    am(e, t);
    function e(n) {
      im(this, e);
      var r = om(this, t.call(this, n));
      return (r.type = nm.COMMENT), r;
    }
    return e;
  })(rm.default);
  Mr.default = um;
  zu.exports = Mr.default;
});
var Gu = y((Br, Yu) => {
  "use strict";
  Br.__esModule = !0;
  var lm = Be(),
    cm = pm(lm),
    fm = L();
  function pm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function hm(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function dm(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function mm(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var ym = (function (t) {
    mm(e, t);
    function e(n) {
      hm(this, e);
      var r = dm(this, t.call(this, n));
      return (r.type = fm.ID), r;
    }
    return (
      (e.prototype.toString = function () {
        return [
          this.spaces.before,
          this.ns,
          "#" + this.value,
          this.spaces.after,
        ].join("");
      }),
      e
    );
  })(cm.default);
  Br.default = ym;
  Yu.exports = Br.default;
});
var Hu = y((Fr, Ku) => {
  "use strict";
  Fr.__esModule = !0;
  var gm = Be(),
    wm = xm(gm),
    vm = L();
  function xm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function bm(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function km(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function _m(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Tm = (function (t) {
    _m(e, t);
    function e(n) {
      bm(this, e);
      var r = km(this, t.call(this, n));
      return (r.type = vm.TAG), r;
    }
    return e;
  })(wm.default);
  Fr.default = Tm;
  Ku.exports = Fr.default;
});
var ju = y(($r, Qu) => {
  "use strict";
  $r.__esModule = !0;
  var Em = we(),
    Sm = Om(Em),
    Cm = L();
  function Om(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Am(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Nm(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Pm(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Rm = (function (t) {
    Pm(e, t);
    function e(n) {
      Am(this, e);
      var r = Nm(this, t.call(this, n));
      return (r.type = Cm.STRING), r;
    }
    return e;
  })(Sm.default);
  $r.default = Rm;
  Qu.exports = $r.default;
});
var Xu = y((Ur, Ju) => {
  "use strict";
  Ur.__esModule = !0;
  var Im = Rr(),
    qm = Lm(Im),
    Dm = L();
  function Lm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Mm(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Bm(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Fm(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var $m = (function (t) {
    Fm(e, t);
    function e(n) {
      Mm(this, e);
      var r = Bm(this, t.call(this, n));
      return (r.type = Dm.PSEUDO), r;
    }
    return (
      (e.prototype.toString = function () {
        var r = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [
          this.spaces.before,
          String(this.value),
          r,
          this.spaces.after,
        ].join("");
      }),
      e
    );
  })(qm.default);
  Ur.default = $m;
  Ju.exports = Ur.default;
});
var el = y((Wr, Zu) => {
  "use strict";
  Wr.__esModule = !0;
  var Um = Be(),
    Wm = Vm(Um),
    zm = L();
  function Vm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Ym(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Gm(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function Km(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var Hm = (function (t) {
    Km(e, t);
    function e(n) {
      Ym(this, e);
      var r = Gm(this, t.call(this, n));
      return (r.type = zm.ATTRIBUTE), (r.raws = {}), r;
    }
    return (
      (e.prototype.toString = function () {
        var r = [this.spaces.before, "[", this.ns, this.attribute];
        return (
          this.operator && r.push(this.operator),
          this.value && r.push(this.value),
          this.raws.insensitive
            ? r.push(this.raws.insensitive)
            : this.insensitive && r.push(" i"),
          r.push("]"),
          r.concat(this.spaces.after).join("")
        );
      }),
      e
    );
  })(Wm.default);
  Wr.default = Hm;
  Zu.exports = Wr.default;
});
var rl = y((zr, tl) => {
  "use strict";
  zr.__esModule = !0;
  var Qm = Be(),
    jm = Xm(Qm),
    Jm = L();
  function Xm(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Zm(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function ey(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function ty(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var ry = (function (t) {
    ty(e, t);
    function e(n) {
      Zm(this, e);
      var r = ey(this, t.call(this, n));
      return (r.type = Jm.UNIVERSAL), (r.value = "*"), r;
    }
    return e;
  })(jm.default);
  zr.default = ry;
  tl.exports = zr.default;
});
var sl = y((Vr, nl) => {
  "use strict";
  Vr.__esModule = !0;
  var ny = we(),
    sy = oy(ny),
    iy = L();
  function oy(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function ay(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function uy(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function ly(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var cy = (function (t) {
    ly(e, t);
    function e(n) {
      ay(this, e);
      var r = uy(this, t.call(this, n));
      return (r.type = iy.COMBINATOR), r;
    }
    return e;
  })(sy.default);
  Vr.default = cy;
  nl.exports = Vr.default;
});
var ol = y((Yr, il) => {
  "use strict";
  Yr.__esModule = !0;
  var fy = we(),
    py = dy(fy),
    hy = L();
  function dy(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function my(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function yy(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : t;
  }
  function gy(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e,
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e));
  }
  var wy = (function (t) {
    gy(e, t);
    function e(n) {
      my(this, e);
      var r = yy(this, t.call(this, n));
      return (r.type = hy.NESTING), (r.value = "&"), r;
    }
    return e;
  })(py.default);
  Yr.default = wy;
  il.exports = Yr.default;
});
var ul = y((Gr, al) => {
  "use strict";
  Gr.__esModule = !0;
  Gr.default = vy;
  function vy(t) {
    return t.sort(function (e, n) {
      return e - n;
    });
  }
  al.exports = Gr.default;
});
var gl = y((Qr, yl) => {
  "use strict";
  Qr.__esModule = !0;
  Qr.default = Ny;
  var ll = 39,
    xy = 34,
    us = 92,
    cl = 47,
    kt = 10,
    ls = 32,
    cs = 12,
    fs = 9,
    ps = 13,
    fl = 43,
    pl = 62,
    hl = 126,
    dl = 124,
    by = 44,
    ky = 40,
    _y = 41,
    Ty = 91,
    Ey = 93,
    Sy = 59,
    ml = 42,
    Cy = 58,
    Oy = 38,
    Ay = 64,
    Kr = /[ \n\t\r\{\(\)'"\\;/]/g,
    Hr = /[ \n\t\r\(\)\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g;
  function Ny(t) {
    for (
      var e = [],
        n = t.css.valueOf(),
        r = void 0,
        s = void 0,
        i = void 0,
        o = void 0,
        a = void 0,
        u = void 0,
        c = void 0,
        f = void 0,
        p = void 0,
        l = void 0,
        g = void 0,
        x = n.length,
        h = -1,
        d = 1,
        m = 0,
        b = function (v, N) {
          if (t.safe) (n += N), (s = n.length - 1);
          else throw t.error("Unclosed " + v, d, m - h, m);
        };
      m < x;

    ) {
      switch (((r = n.charCodeAt(m)), r === kt && ((h = m), (d += 1)), r)) {
        case kt:
        case ls:
        case fs:
        case ps:
        case cs:
          s = m;
          do (s += 1), (r = n.charCodeAt(s)), r === kt && ((h = s), (d += 1));
          while (r === ls || r === kt || r === fs || r === ps || r === cs);
          e.push(["space", n.slice(m, s), d, m - h, m]), (m = s - 1);
          break;
        case fl:
        case pl:
        case hl:
        case dl:
          s = m;
          do (s += 1), (r = n.charCodeAt(s));
          while (r === fl || r === pl || r === hl || r === dl);
          e.push(["combinator", n.slice(m, s), d, m - h, m]), (m = s - 1);
          break;
        case ml:
          e.push(["*", "*", d, m - h, m]);
          break;
        case Oy:
          e.push(["&", "&", d, m - h, m]);
          break;
        case by:
          e.push([",", ",", d, m - h, m]);
          break;
        case Ty:
          e.push(["[", "[", d, m - h, m]);
          break;
        case Ey:
          e.push(["]", "]", d, m - h, m]);
          break;
        case Cy:
          e.push([":", ":", d, m - h, m]);
          break;
        case Sy:
          e.push([";", ";", d, m - h, m]);
          break;
        case ky:
          e.push(["(", "(", d, m - h, m]);
          break;
        case _y:
          e.push([")", ")", d, m - h, m]);
          break;
        case ll:
        case xy:
          (i = r === ll ? "'" : '"'), (s = m);
          do
            for (
              l = !1, s = n.indexOf(i, s + 1), s === -1 && b("quote", i), g = s;
              n.charCodeAt(g - 1) === us;

            )
              (g -= 1), (l = !l);
          while (l);
          e.push(["string", n.slice(m, s + 1), d, m - h, d, s - h, m]), (m = s);
          break;
        case Ay:
          (Kr.lastIndex = m + 1),
            Kr.test(n),
            Kr.lastIndex === 0 ? (s = n.length - 1) : (s = Kr.lastIndex - 2),
            e.push(["at-word", n.slice(m, s + 1), d, m - h, d, s - h, m]),
            (m = s);
          break;
        case us:
          for (s = m, c = !0; n.charCodeAt(s + 1) === us; ) (s += 1), (c = !c);
          (r = n.charCodeAt(s + 1)),
            c &&
              r !== cl &&
              r !== ls &&
              r !== kt &&
              r !== fs &&
              r !== ps &&
              r !== cs &&
              (s += 1),
            e.push(["word", n.slice(m, s + 1), d, m - h, d, s - h, m]),
            (m = s);
          break;
        default:
          r === cl && n.charCodeAt(m + 1) === ml
            ? ((s = n.indexOf("*/", m + 2) + 1),
              s === 0 && b("comment", "*/"),
              (u = n.slice(m, s + 1)),
              (o = u.split(`
`)),
              (a = o.length - 1),
              a > 0 ? ((f = d + a), (p = s - o[a].length)) : ((f = d), (p = h)),
              e.push(["comment", u, d, m - h, f, s - p, m]),
              (h = p),
              (d = f),
              (m = s))
            : ((Hr.lastIndex = m + 1),
              Hr.test(n),
              Hr.lastIndex === 0 ? (s = n.length - 1) : (s = Hr.lastIndex - 2),
              e.push(["word", n.slice(m, s + 1), d, m - h, d, s - h, m]),
              (m = s));
          break;
      }
      m++;
    }
    return e;
  }
  yl.exports = Qr.default;
});
var xl = y((jr, vl) => {
  "use strict";
  jr.__esModule = !0;
  var Py = (function () {
      function t(e, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          (s.enumerable = s.enumerable || !1),
            (s.configurable = !0),
            "value" in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s);
        }
      }
      return function (e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
      };
    })(),
    Ry = ss(),
    Iy = I(Ry),
    qy = is(),
    hs = I(qy),
    Dy = os(),
    Ly = I(Dy),
    My = Mu(),
    By = I(My),
    Fy = Fu(),
    ds = I(Fy),
    $y = Wu(),
    Uy = I($y),
    Wy = Vu(),
    zy = I(Wy),
    Vy = Gu(),
    Yy = I(Vy),
    Gy = Hu(),
    Ky = I(Gy),
    Hy = ju(),
    Qy = I(Hy),
    jy = Xu(),
    Jy = I(jy),
    Xy = el(),
    Zy = I(Xy),
    eg = rl(),
    tg = I(eg),
    rg = sl(),
    ng = I(rg),
    sg = ol(),
    ig = I(sg),
    og = ul(),
    ag = I(og),
    ug = gl(),
    wl = I(ug),
    lg = L(),
    cg = fg(lg);
  function fg(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (t != null)
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return (e.default = t), e;
  }
  function I(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function pg(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  var hg = (function () {
    function t(e) {
      pg(this, t),
        (this.input = e),
        (this.lossy = e.options.lossless === !1),
        (this.position = 0),
        (this.root = new By.default());
      var n = new ds.default();
      return (
        this.root.append(n),
        (this.current = n),
        this.lossy
          ? (this.tokens = (0, wl.default)({ safe: e.safe, css: e.css.trim() }))
          : (this.tokens = (0, wl.default)(e)),
        this.loop()
      );
    }
    return (
      (t.prototype.attribute = function () {
        var n = "",
          r = void 0,
          s = this.currToken;
        for (
          this.position++;
          this.position < this.tokens.length && this.currToken[0] !== "]";

        )
          (n += this.tokens[this.position][1]), this.position++;
        this.position === this.tokens.length &&
          !~n.indexOf("]") &&
          this.error("Expected a closing square bracket.");
        var i = n.split(/((?:[*~^$|]?=))([^]*)/),
          o = i[0].split(/(\|)/g),
          a = {
            operator: i[1],
            value: i[2],
            source: {
              start: { line: s[2], column: s[3] },
              end: { line: this.currToken[2], column: this.currToken[3] },
            },
            sourceIndex: s[4],
          };
        if (
          (o.length > 1
            ? (o[0] === "" && (o[0] = !0),
              (a.attribute = this.parseValue(o[2])),
              (a.namespace = this.parseNamespace(o[0])))
            : (a.attribute = this.parseValue(i[0])),
          (r = new Zy.default(a)),
          i[2])
        ) {
          var u = i[2].split(/(\s+i\s*?)$/),
            c = u[0].trim();
          (r.value = this.lossy ? c : u[0]),
            u[1] &&
              ((r.insensitive = !0), this.lossy || (r.raws.insensitive = u[1])),
            (r.quoted = c[0] === "'" || c[0] === '"'),
            (r.raws.unquoted = r.quoted ? c.slice(1, -1) : c);
        }
        this.newNode(r), this.position++;
      }),
      (t.prototype.combinator = function () {
        if (this.currToken[1] === "|") return this.namespace();
        for (
          var n = new ng.default({
            value: "",
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[2], column: this.currToken[3] },
            },
            sourceIndex: this.currToken[4],
          });
          this.position < this.tokens.length &&
          this.currToken &&
          (this.currToken[0] === "space" || this.currToken[0] === "combinator");

        )
          this.nextToken && this.nextToken[0] === "combinator"
            ? ((n.spaces.before = this.parseSpace(this.currToken[1])),
              (n.source.start.line = this.nextToken[2]),
              (n.source.start.column = this.nextToken[3]),
              (n.source.end.column = this.nextToken[3]),
              (n.source.end.line = this.nextToken[2]),
              (n.sourceIndex = this.nextToken[4]))
            : this.prevToken && this.prevToken[0] === "combinator"
              ? (n.spaces.after = this.parseSpace(this.currToken[1]))
              : this.currToken[0] === "combinator"
                ? (n.value = this.currToken[1])
                : this.currToken[0] === "space" &&
                  (n.value = this.parseSpace(this.currToken[1], " ")),
            this.position++;
        return this.newNode(n);
      }),
      (t.prototype.comma = function () {
        if (this.position === this.tokens.length - 1) {
          (this.root.trailingComma = !0), this.position++;
          return;
        }
        var n = new ds.default();
        this.current.parent.append(n), (this.current = n), this.position++;
      }),
      (t.prototype.comment = function () {
        var n = new zy.default({
          value: this.currToken[1],
          source: {
            start: { line: this.currToken[2], column: this.currToken[3] },
            end: { line: this.currToken[4], column: this.currToken[5] },
          },
          sourceIndex: this.currToken[6],
        });
        this.newNode(n), this.position++;
      }),
      (t.prototype.error = function (n) {
        throw new this.input.error(n);
      }),
      (t.prototype.missingBackslash = function () {
        return this.error("Expected a backslash preceding the semicolon.");
      }),
      (t.prototype.missingParenthesis = function () {
        return this.error("Expected opening parenthesis.");
      }),
      (t.prototype.missingSquareBracket = function () {
        return this.error("Expected opening square bracket.");
      }),
      (t.prototype.namespace = function () {
        var n = (this.prevToken && this.prevToken[1]) || !0;
        if (this.nextToken[0] === "word") return this.position++, this.word(n);
        if (this.nextToken[0] === "*")
          return this.position++, this.universal(n);
      }),
      (t.prototype.nesting = function () {
        this.newNode(
          new ig.default({
            value: this.currToken[1],
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[2], column: this.currToken[3] },
            },
            sourceIndex: this.currToken[4],
          }),
        ),
          this.position++;
      }),
      (t.prototype.parentheses = function () {
        var n = this.current.last;
        if (n && n.type === cg.PSEUDO) {
          var r = new ds.default(),
            s = this.current;
          n.append(r), (this.current = r);
          var i = 1;
          for (this.position++; this.position < this.tokens.length && i; )
            this.currToken[0] === "(" && i++,
              this.currToken[0] === ")" && i--,
              i
                ? this.parse()
                : ((r.parent.source.end.line = this.currToken[2]),
                  (r.parent.source.end.column = this.currToken[3]),
                  this.position++);
          i && this.error("Expected closing parenthesis."), (this.current = s);
        } else {
          var o = 1;
          for (
            this.position++, n.value += "(";
            this.position < this.tokens.length && o;

          )
            this.currToken[0] === "(" && o++,
              this.currToken[0] === ")" && o--,
              (n.value += this.parseParenthesisToken(this.currToken)),
              this.position++;
          o && this.error("Expected closing parenthesis.");
        }
      }),
      (t.prototype.pseudo = function () {
        for (
          var n = this, r = "", s = this.currToken;
          this.currToken && this.currToken[0] === ":";

        )
          (r += this.currToken[1]), this.position++;
        if (!this.currToken)
          return this.error("Expected pseudo-class or pseudo-element");
        if (this.currToken[0] === "word") {
          var i = void 0;
          this.splitWord(!1, function (o, a) {
            (r += o),
              (i = new Jy.default({
                value: r,
                source: {
                  start: { line: s[2], column: s[3] },
                  end: { line: n.currToken[4], column: n.currToken[5] },
                },
                sourceIndex: s[4],
              })),
              n.newNode(i),
              a > 1 &&
                n.nextToken &&
                n.nextToken[0] === "(" &&
                n.error("Misplaced parenthesis.");
          });
        } else this.error('Unexpected "' + this.currToken[0] + '" found.');
      }),
      (t.prototype.space = function () {
        var n = this.currToken;
        this.position === 0 ||
        this.prevToken[0] === "," ||
        this.prevToken[0] === "("
          ? ((this.spaces = this.parseSpace(n[1])), this.position++)
          : this.position === this.tokens.length - 1 ||
              this.nextToken[0] === "," ||
              this.nextToken[0] === ")"
            ? ((this.current.last.spaces.after = this.parseSpace(n[1])),
              this.position++)
            : this.combinator();
      }),
      (t.prototype.string = function () {
        var n = this.currToken;
        this.newNode(
          new Qy.default({
            value: this.currToken[1],
            source: {
              start: { line: n[2], column: n[3] },
              end: { line: n[4], column: n[5] },
            },
            sourceIndex: n[6],
          }),
        ),
          this.position++;
      }),
      (t.prototype.universal = function (n) {
        var r = this.nextToken;
        if (r && r[1] === "|") return this.position++, this.namespace();
        this.newNode(
          new tg.default({
            value: this.currToken[1],
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[2], column: this.currToken[3] },
            },
            sourceIndex: this.currToken[4],
          }),
          n,
        ),
          this.position++;
      }),
      (t.prototype.splitWord = function (n, r) {
        for (
          var s = this, i = this.nextToken, o = this.currToken[1];
          i && i[0] === "word";

        ) {
          this.position++;
          var a = this.currToken[1];
          if (((o += a), a.lastIndexOf("\\") === a.length - 1)) {
            var u = this.nextToken;
            u &&
              u[0] === "space" &&
              ((o += this.parseSpace(u[1], " ")), this.position++);
          }
          i = this.nextToken;
        }
        var c = (0, hs.default)(o, "."),
          f = (0, hs.default)(o, "#"),
          p = (0, hs.default)(o, "#{");
        p.length &&
          (f = f.filter(function (g) {
            return !~p.indexOf(g);
          }));
        var l = (0, ag.default)((0, Ly.default)((0, Iy.default)([[0], c, f])));
        l.forEach(function (g, x) {
          var h = l[x + 1] || o.length,
            d = o.slice(g, h);
          if (x === 0 && r) return r.call(s, d, l.length);
          var m = void 0;
          ~c.indexOf(g)
            ? (m = new Uy.default({
                value: d.slice(1),
                source: {
                  start: { line: s.currToken[2], column: s.currToken[3] + g },
                  end: {
                    line: s.currToken[4],
                    column: s.currToken[3] + (h - 1),
                  },
                },
                sourceIndex: s.currToken[6] + l[x],
              }))
            : ~f.indexOf(g)
              ? (m = new Yy.default({
                  value: d.slice(1),
                  source: {
                    start: { line: s.currToken[2], column: s.currToken[3] + g },
                    end: {
                      line: s.currToken[4],
                      column: s.currToken[3] + (h - 1),
                    },
                  },
                  sourceIndex: s.currToken[6] + l[x],
                }))
              : (m = new Ky.default({
                  value: d,
                  source: {
                    start: { line: s.currToken[2], column: s.currToken[3] + g },
                    end: {
                      line: s.currToken[4],
                      column: s.currToken[3] + (h - 1),
                    },
                  },
                  sourceIndex: s.currToken[6] + l[x],
                })),
            s.newNode(m, n);
        }),
          this.position++;
      }),
      (t.prototype.word = function (n) {
        var r = this.nextToken;
        return r && r[1] === "|"
          ? (this.position++, this.namespace())
          : this.splitWord(n);
      }),
      (t.prototype.loop = function () {
        for (; this.position < this.tokens.length; ) this.parse(!0);
        return this.root;
      }),
      (t.prototype.parse = function (n) {
        switch (this.currToken[0]) {
          case "space":
            this.space();
            break;
          case "comment":
            this.comment();
            break;
          case "(":
            this.parentheses();
            break;
          case ")":
            n && this.missingParenthesis();
            break;
          case "[":
            this.attribute();
            break;
          case "]":
            this.missingSquareBracket();
            break;
          case "at-word":
          case "word":
            this.word();
            break;
          case ":":
            this.pseudo();
            break;
          case ";":
            this.missingBackslash();
            break;
          case ",":
            this.comma();
            break;
          case "*":
            this.universal();
            break;
          case "&":
            this.nesting();
            break;
          case "combinator":
            this.combinator();
            break;
          case "string":
            this.string();
            break;
        }
      }),
      (t.prototype.parseNamespace = function (n) {
        if (this.lossy && typeof n == "string") {
          var r = n.trim();
          return r.length ? r : !0;
        }
        return n;
      }),
      (t.prototype.parseSpace = function (n, r) {
        return this.lossy ? r || "" : n;
      }),
      (t.prototype.parseValue = function (n) {
        return this.lossy && n && typeof n == "string" ? n.trim() : n;
      }),
      (t.prototype.parseParenthesisToken = function (n) {
        return this.lossy
          ? n[0] === "space"
            ? this.parseSpace(n[1], " ")
            : this.parseValue(n[1])
          : n[1];
      }),
      (t.prototype.newNode = function (n, r) {
        return (
          r && (n.namespace = this.parseNamespace(r)),
          this.spaces && ((n.spaces.before = this.spaces), (this.spaces = "")),
          this.current.append(n)
        );
      }),
      Py(t, [
        {
          key: "currToken",
          get: function () {
            return this.tokens[this.position];
          },
        },
        {
          key: "nextToken",
          get: function () {
            return this.tokens[this.position + 1];
          },
        },
        {
          key: "prevToken",
          get: function () {
            return this.tokens[this.position - 1];
          },
        },
      ]),
      t
    );
  })();
  jr.default = hg;
  vl.exports = jr.default;
});
var kl = y((Jr, bl) => {
  "use strict";
  Jr.__esModule = !0;
  var dg = (function () {
      function t(e, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          (s.enumerable = s.enumerable || !1),
            (s.configurable = !0),
            "value" in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s);
        }
      }
      return function (e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
      };
    })(),
    mg = xl(),
    yg = gg(mg);
  function gg(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function wg(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  var vg = (function () {
    function t(e) {
      return wg(this, t), (this.func = e || function () {}), this;
    }
    return (
      (t.prototype.process = function (n) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          s = new yg.default({
            css: n,
            error: function (o) {
              throw new Error(o);
            },
            options: r,
          });
        return (this.res = s), this.func(s), this;
      }),
      dg(t, [
        {
          key: "result",
          get: function () {
            return String(this.res);
          },
        },
      ]),
      t
    );
  })();
  Jr.default = vg;
  bl.exports = Jr.default;
});
var gs = y((ys) => {
  "use strict";
  Object.defineProperty(ys, "__esModule", { value: !0 });
  function _g(t) {
    (this.after = t.after),
      (this.before = t.before),
      (this.type = t.type),
      (this.value = t.value),
      (this.sourceIndex = t.sourceIndex);
  }
  ys.default = _g;
});
var vs = y((ws) => {
  "use strict";
  Object.defineProperty(ws, "__esModule", { value: !0 });
  var Tg = gs(),
    Sl = Eg(Tg);
  function Eg(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function _t(t) {
    var e = this;
    this.constructor(t),
      (this.nodes = t.nodes),
      this.after === void 0 &&
        (this.after =
          this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].after : ""),
      this.before === void 0 &&
        (this.before = this.nodes.length > 0 ? this.nodes[0].before : ""),
      this.sourceIndex === void 0 && (this.sourceIndex = this.before.length),
      this.nodes.forEach(function (n) {
        n.parent = e;
      });
  }
  _t.prototype = Object.create(Sl.default.prototype);
  _t.constructor = Sl.default;
  _t.prototype.walk = function (e, n) {
    for (
      var r = typeof e == "string" || e instanceof RegExp,
        s = r ? n : e,
        i = typeof e == "string" ? new RegExp(e) : e,
        o = 0;
      o < this.nodes.length;
      o++
    ) {
      var a = this.nodes[o],
        u = r ? i.test(a.type) : !0;
      if (
        (u && s && s(a, o, this.nodes) === !1) ||
        (a.nodes && a.walk(e, n) === !1)
      )
        return !1;
    }
    return !0;
  };
  _t.prototype.each = function () {
    for (
      var e =
          arguments.length <= 0 || arguments[0] === void 0
            ? function () {}
            : arguments[0],
        n = 0;
      n < this.nodes.length;
      n++
    ) {
      var r = this.nodes[n];
      if (e(r, n, this.nodes) === !1) return !1;
    }
    return !0;
  };
  ws.default = _t;
});
var Nl = y((Tt) => {
  "use strict";
  Object.defineProperty(Tt, "__esModule", { value: !0 });
  Tt.parseMediaFeature = Al;
  Tt.parseMediaQuery = bs;
  Tt.parseMediaList = Og;
  var Sg = gs(),
    Cl = Ol(Sg),
    Cg = vs(),
    xs = Ol(Cg);
  function Ol(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Al(t) {
    var e = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1],
      n = [{ mode: "normal", character: null }],
      r = [],
      s = 0,
      i = "",
      o = null,
      a = null,
      u = e,
      c = t;
    t[0] === "(" &&
      t[t.length - 1] === ")" &&
      ((c = t.substring(1, t.length - 1)), u++);
    for (var f = 0; f < c.length; f++) {
      var p = c[f];
      if (
        ((p === "'" || p === '"') &&
          (n[s].isCalculationEnabled === !0
            ? (n.push({
                mode: "string",
                isCalculationEnabled: !1,
                character: p,
              }),
              s++)
            : n[s].mode === "string" &&
              n[s].character === p &&
              c[f - 1] !== "\\" &&
              (n.pop(), s--)),
        p === "{"
          ? (n.push({ mode: "interpolation", isCalculationEnabled: !0 }), s++)
          : p === "}" && (n.pop(), s--),
        n[s].mode === "normal" && p === ":")
      ) {
        var l = c.substring(f + 1);
        (a = {
          type: "value",
          before: /^(\s*)/.exec(l)[1],
          after: /(\s*)$/.exec(l)[1],
          value: l.trim(),
        }),
          (a.sourceIndex = a.before.length + f + 1 + u),
          (o = {
            type: "colon",
            sourceIndex: f + u,
            after: a.before,
            value: ":",
          });
        break;
      }
      i += p;
    }
    return (
      (i = {
        type: "media-feature",
        before: /^(\s*)/.exec(i)[1],
        after: /(\s*)$/.exec(i)[1],
        value: i.trim(),
      }),
      (i.sourceIndex = i.before.length + u),
      r.push(i),
      o !== null && ((o.before = i.after), r.push(o)),
      a !== null && r.push(a),
      r
    );
  }
  function bs(t) {
    var e = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1],
      n = [],
      r = 0,
      s = !1,
      i = void 0;
    function o() {
      return { before: "", after: "", value: "" };
    }
    i = o();
    for (var a = 0; a < t.length; a++) {
      var u = t[a];
      s
        ? ((i.value += u),
          (u === "{" || u === "(") && r++,
          (u === ")" || u === "}") && r--)
        : u.search(/\s/) !== -1
          ? (i.before += u)
          : (u === "(" && ((i.type = "media-feature-expression"), r++),
            (i.value = u),
            (i.sourceIndex = e + a),
            (s = !0)),
        s &&
          r === 0 &&
          (u === ")" || a === t.length - 1 || t[a + 1].search(/\s/) !== -1) &&
          (["not", "only", "and"].indexOf(i.value) !== -1 &&
            (i.type = "keyword"),
          i.type === "media-feature-expression" &&
            (i.nodes = Al(i.value, i.sourceIndex)),
          n.push(
            Array.isArray(i.nodes) ? new xs.default(i) : new Cl.default(i),
          ),
          (i = o()),
          (s = !1));
    }
    for (var c = 0; c < n.length; c++)
      if (
        ((i = n[c]), c > 0 && (n[c - 1].after = i.before), i.type === void 0)
      ) {
        if (c > 0) {
          if (n[c - 1].type === "media-feature-expression") {
            i.type = "keyword";
            continue;
          }
          if (n[c - 1].value === "not" || n[c - 1].value === "only") {
            i.type = "media-type";
            continue;
          }
          if (n[c - 1].value === "and") {
            i.type = "media-feature-expression";
            continue;
          }
          n[c - 1].type === "media-type" &&
            (n[c + 1]
              ? (i.type =
                  n[c + 1].type === "media-feature-expression"
                    ? "keyword"
                    : "media-feature-expression")
              : (i.type = "media-feature-expression"));
        }
        if (c === 0) {
          if (!n[c + 1]) {
            i.type = "media-type";
            continue;
          }
          if (
            n[c + 1] &&
            (n[c + 1].type === "media-feature-expression" ||
              n[c + 1].type === "keyword")
          ) {
            i.type = "media-type";
            continue;
          }
          if (n[c + 2]) {
            if (n[c + 2].type === "media-feature-expression") {
              (i.type = "media-type"), (n[c + 1].type = "keyword");
              continue;
            }
            if (n[c + 2].type === "keyword") {
              (i.type = "keyword"), (n[c + 1].type = "media-type");
              continue;
            }
          }
          if (n[c + 3] && n[c + 3].type === "media-feature-expression") {
            (i.type = "keyword"),
              (n[c + 1].type = "media-type"),
              (n[c + 2].type = "keyword");
            continue;
          }
        }
      }
    return n;
  }
  function Og(t) {
    var e = [],
      n = 0,
      r = 0,
      s = /^(\s*)url\s*\(/.exec(t);
    if (s !== null) {
      for (var i = s[0].length, o = 1; o > 0; ) {
        var a = t[i];
        a === "(" && o++, a === ")" && o--, i++;
      }
      e.unshift(
        new Cl.default({
          type: "url",
          value: t.substring(0, i).trim(),
          sourceIndex: s[1].length,
          before: s[1],
          after: /^(\s*)/.exec(t.substring(i))[1],
        }),
      ),
        (n = i);
    }
    for (var u = n; u < t.length; u++) {
      var c = t[u];
      if ((c === "(" && r++, c === ")" && r--, r === 0 && c === ",")) {
        var f = t.substring(n, u),
          p = /^(\s*)/.exec(f)[1];
        e.push(
          new xs.default({
            type: "media-query",
            value: f.trim(),
            sourceIndex: n + p.length,
            nodes: bs(f, n),
            before: p,
            after: /(\s*)$/.exec(f)[1],
          }),
        ),
          (n = u + 1);
      }
    }
    var l = t.substring(n),
      g = /^(\s*)/.exec(l)[1];
    return (
      e.push(
        new xs.default({
          type: "media-query",
          value: l.trim(),
          sourceIndex: n + g.length,
          nodes: bs(l, n),
          before: g,
          after: /(\s*)$/.exec(l)[1],
        }),
      ),
      e
    );
  }
});
var Pl = y((ks) => {
  "use strict";
  Object.defineProperty(ks, "__esModule", { value: !0 });
  ks.default = Ig;
  var Ag = vs(),
    Ng = Rg(Ag),
    Pg = Nl();
  function Rg(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function Ig(t) {
    return new Ng.default({
      nodes: (0, Pg.parseMediaList)(t),
      type: "media-query-list",
      value: t.trim(),
    });
  }
});
var Ss = {};
Os(Ss, {
  languages: () => Ul,
  options: () => zl,
  parsers: () => Es,
  printers: () => Wg,
});
var jl = (t, e, n, r) => {
    if (!(t && e == null))
      return e.replaceAll
        ? e.replaceAll(n, r)
        : n.global
          ? e.replace(n, r)
          : e.split(n).join(r);
  },
  T = jl;
var Et = "'",
  As = '"';
function Jl(t, e) {
  let n = e === !0 || e === Et ? Et : As,
    r = n === Et ? As : Et,
    s = 0,
    i = 0;
  for (let o of t) o === n ? s++ : o === r && i++;
  return s > i ? r : n;
}
var Ns = Jl;
function Xl(t, e, n) {
  let r = e === '"' ? "'" : '"',
    i = T(!1, t, /\\(.)|(["'])/gs, (o, a, u) =>
      a === r
        ? a
        : u === e
          ? "\\" + u
          : u ||
            (n && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(a)
              ? a
              : "\\" + a),
    );
  return e + i + e;
}
var Ps = Xl;
function Zl(t, e) {
  let n = t.slice(1, -1),
    r =
      e.parser === "json" ||
      (e.parser === "json5" && e.quoteProps === "preserve" && !e.singleQuote)
        ? '"'
        : e.__isInHtmlAttribute
          ? "'"
          : Ns(n, e.singleQuote);
  return Ps(
    n,
    r,
    !(
      e.parser === "css" ||
      e.parser === "less" ||
      e.parser === "scss" ||
      e.__embeddedInHtml
    ),
  );
}
var St = Zl;
function ec(t) {
  return Array.isArray(t) && t.length > 0;
}
var ee = ec;
var Fe = "string",
  $e = "array",
  Ue = "cursor",
  xe = "indent",
  be = "align",
  We = "trim",
  ke = "group",
  te = "fill",
  le = "if-break",
  ze = "indent-if-break",
  Ve = "line-suffix",
  Ye = "line-suffix-boundary",
  Q = "line",
  Ge = "label",
  _e = "break-parent",
  Ct = new Set([Ue, xe, be, We, ke, te, le, ze, Ve, Ye, Q, Ge, _e]);
function tc(t) {
  if (typeof t == "string") return Fe;
  if (Array.isArray(t)) return $e;
  if (!t) return;
  let { type: e } = t;
  if (Ct.has(e)) return e;
}
var Ke = tc;
var rc = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
function nc(t) {
  let e = t === null ? "null" : typeof t;
  if (e !== "string" && e !== "object")
    return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
  if (Ke(t)) throw new Error("doc is valid.");
  let n = Object.prototype.toString.call(t);
  if (n !== "[object Object]") return `Unexpected doc '${n}'.`;
  let r = rc([...Ct].map((s) => `'${s}'`));
  return `Unexpected doc.type '${t.type}'.
Expected it to be ${r}.`;
}
var en = class extends Error {
    name = "InvalidDocError";
    constructor(e) {
      super(nc(e)), (this.doc = e);
    }
  },
  tn = en;
var Rs = () => {},
  ce = Rs,
  Ot = Rs;
function q(t) {
  return ce(t), { type: xe, contents: t };
}
function Is(t, e) {
  return ce(e), { type: be, contents: e, n: t };
}
function D(t, e = {}) {
  return (
    ce(t),
    Ot(e.expandedStates, !0),
    {
      type: ke,
      id: e.id,
      contents: t,
      break: !!e.shouldBreak,
      expandedStates: e.expandedStates,
    }
  );
}
function qs(t) {
  return Is({ type: "root" }, t);
}
function fe(t) {
  return Is(-1, t);
}
function He(t) {
  return Ot(t), { type: te, parts: t };
}
function At(t, e = "", n = {}) {
  return (
    ce(t),
    e !== "" && ce(e),
    { type: le, breakContents: t, flatContents: e, groupId: n.groupId }
  );
}
var Qe = { type: _e };
var sc = { type: Q, hard: !0 };
var A = { type: Q },
  M = { type: Q, soft: !0 },
  _ = [sc, Qe];
function Y(t, e) {
  ce(t), Ot(e);
  let n = [];
  for (let r = 0; r < e.length; r++) r !== 0 && n.push(t), n.push(e[r]);
  return n;
}
var ic = (t, e, n) => {
    if (!(t && e == null))
      return Array.isArray(e) || typeof e == "string"
        ? e[n < 0 ? e.length + n : n]
        : e.at(n);
  },
  G = ic;
var Ds = (t) => {
  if (Array.isArray(t)) return t;
  if (t.type !== te) throw new Error(`Expect doc to be 'array' or '${te}'.`);
  return t.parts;
};
function oc(t, e) {
  if (typeof t == "string") return e(t);
  let n = new Map();
  return r(t);
  function r(i) {
    if (n.has(i)) return n.get(i);
    let o = s(i);
    return n.set(i, o), o;
  }
  function s(i) {
    switch (Ke(i)) {
      case $e:
        return e(i.map(r));
      case te:
        return e({ ...i, parts: i.parts.map(r) });
      case le:
        return e({
          ...i,
          breakContents: r(i.breakContents),
          flatContents: r(i.flatContents),
        });
      case ke: {
        let { expandedStates: o, contents: a } = i;
        return (
          o ? ((o = o.map(r)), (a = o[0])) : (a = r(a)),
          e({ ...i, contents: a, expandedStates: o })
        );
      }
      case be:
      case xe:
      case ze:
      case Ge:
      case Ve:
        return e({ ...i, contents: r(i.contents) });
      case Fe:
      case Ue:
      case We:
      case Ye:
      case Q:
      case _e:
        return e(i);
      default:
        throw new tn(i);
    }
  }
}
function ac(t) {
  return t.type === Q && !t.hard
    ? t.soft
      ? ""
      : " "
    : t.type === le
      ? t.flatContents
      : t;
}
function Ls(t) {
  return oc(t, ac);
}
var rn = class extends Error {
    name = "UnexpectedNodeError";
    constructor(e, n, r = "type") {
      super(`Unexpected ${n} node ${r}: ${JSON.stringify(e[r])}.`),
        (this.node = e);
    }
  },
  Ms = rn;
function uc(t) {
  return (t == null ? void 0 : t.type) === "front-matter";
}
var Te = uc;
var lc = new Set([
  "raw",
  "raws",
  "sourceIndex",
  "source",
  "before",
  "after",
  "trailingComma",
  "spaces",
]);
function Bs(t, e, n) {
  if (
    (Te(t) && t.lang === "yaml" && delete e.value,
    t.type === "css-comment" &&
      n.type === "css-root" &&
      n.nodes.length > 0 &&
      (((n.nodes[0] === t || (Te(n.nodes[0]) && n.nodes[1] === t)) &&
        (delete e.text, /^\*\s*@(?:format|prettier)\s*$/.test(t.text))) ||
        (n.type === "css-root" && G(!1, n.nodes, -1) === t)))
  )
    return null;
  if (
    (t.type === "value-root" && delete e.text,
    (t.type === "media-query" ||
      t.type === "media-query-list" ||
      t.type === "media-feature-expression") &&
      delete e.value,
    t.type === "css-rule" && delete e.params,
    t.type === "selector-combinator" && (e.value = T(!1, e.value, /\s+/g, " ")),
    t.type === "media-feature" && (e.value = T(!1, e.value, " ", "")),
    ((t.type === "value-word" &&
      ((t.isColor && t.isHex) ||
        ["initial", "inherit", "unset", "revert"].includes(
          e.value.toLowerCase(),
        ))) ||
      t.type === "media-feature" ||
      t.type === "selector-root-invalid" ||
      t.type === "selector-pseudo") &&
      (e.value = e.value.toLowerCase()),
    t.type === "css-decl" && (e.prop = e.prop.toLowerCase()),
    (t.type === "css-atrule" || t.type === "css-import") &&
      (e.name = e.name.toLowerCase()),
    t.type === "value-number" && (e.unit = e.unit.toLowerCase()),
    t.type === "value-unknown" && (e.value = T(!1, e.value, /;$/g, "")),
    (t.type === "media-feature" ||
      t.type === "media-keyword" ||
      t.type === "media-type" ||
      t.type === "media-unknown" ||
      t.type === "media-url" ||
      t.type === "media-value" ||
      t.type === "selector-attribute" ||
      t.type === "selector-string" ||
      t.type === "selector-class" ||
      t.type === "selector-combinator" ||
      t.type === "value-string") &&
      e.value &&
      (e.value = cc(e.value)),
    t.type === "selector-attribute" &&
      ((e.attribute = e.attribute.trim()),
      e.namespace &&
        typeof e.namespace == "string" &&
        ((e.namespace = e.namespace.trim()),
        e.namespace.length === 0 && (e.namespace = !0)),
      e.value &&
        ((e.value = T(!1, e.value.trim(), /^["']|["']$/g, "")),
        delete e.quoted)),
    (t.type === "media-value" ||
      t.type === "media-type" ||
      t.type === "value-number" ||
      t.type === "selector-root-invalid" ||
      t.type === "selector-class" ||
      t.type === "selector-combinator" ||
      t.type === "selector-tag") &&
      e.value &&
      (e.value = T(!1, e.value, /([\d+.Ee-]+)([A-Za-z]*)/g, (r, s, i) => {
        let o = Number(s);
        return Number.isNaN(o) ? r : o + i.toLowerCase();
      })),
    t.type === "selector-tag")
  ) {
    let r = t.value.toLowerCase();
    ["from", "to"].includes(r) && (e.value = r);
  }
  if (
    (t.type === "css-atrule" &&
      t.name.toLowerCase() === "supports" &&
      delete e.value,
    t.type === "selector-unknown" && delete e.value,
    t.type === "value-comma_group")
  ) {
    let r = t.groups.findIndex(
      (s) => s.type === "value-number" && s.unit === "...",
    );
    r !== -1 &&
      ((e.groups[r].unit = ""),
      e.groups.splice(r + 1, 0, {
        type: "value-word",
        value: "...",
        isColor: !1,
        isHex: !1,
      }));
  }
  if (
    t.type === "value-comma_group" &&
    t.groups.some(
      (r) =>
        (r.type === "value-atword" && r.value.endsWith("[")) ||
        (r.type === "value-word" && r.value.startsWith("]")),
    )
  )
    return {
      type: "value-atword",
      value: t.groups.map((r) => r.value).join(""),
      group: { open: null, close: null, groups: [], type: "value-paren_group" },
    };
}
Bs.ignoredProperties = lc;
function cc(t) {
  return T(!1, T(!1, t, "'", '"'), /\\([^\dA-Fa-f])/g, "$1");
}
var Fs = Bs;
async function fc(t, e) {
  if (t.lang === "yaml") {
    let n = t.value.trim(),
      r = n ? await e(n, { parser: "yaml" }) : "";
    return qs([t.startDelimiter, _, r, r ? _ : "", t.endDelimiter]);
  }
}
var $s = fc;
function Us(t) {
  let { node: e } = t;
  if (e.type === "front-matter")
    return async (n) => {
      let r = await $s(e, n);
      return r ? [r, _] : void 0;
    };
}
Us.getVisitorKeys = (t) => (t.type === "css-root" ? ["frontMatter"] : []);
var Ws = Us;
var re = ue(Qs(), 1);
function bc(t) {
  if (!t.startsWith("#!")) return "";
  let e = t.indexOf(`
`);
  return e === -1 ? t : t.slice(0, e);
}
var js = bc;
function Js(t) {
  let e = js(t);
  e && (t = t.slice(e.length + 1));
  let n = (0, re.extract)(t),
    { pragmas: r, comments: s } = (0, re.parseWithComments)(n);
  return { shebang: e, text: t, pragmas: r, comments: s };
}
function Xs(t) {
  let { pragmas: e } = Js(t);
  return (
    Object.prototype.hasOwnProperty.call(e, "prettier") ||
    Object.prototype.hasOwnProperty.call(e, "format")
  );
}
function Zs(t) {
  let { shebang: e, text: n, pragmas: r, comments: s } = Js(t),
    i = (0, re.strip)(n),
    o = (0, re.print)({
      pragmas: { format: "", ...r },
      comments: s.trimStart(),
    });
  return (
    (e
      ? `${e}
`
      : "") +
    o +
    (i.startsWith(`
`)
      ? `
`
      : `

`) +
    i
  );
}
var kc = new RegExp(
  "^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)",
  "s",
);
function _c(t) {
  let e = t.match(kc);
  if (!e) return { content: t };
  let {
      startDelimiter: n,
      language: r,
      value: s = "",
      endDelimiter: i,
    } = e.groups,
    o = r.trim() || "yaml";
  if ((n === "+++" && (o = "toml"), o !== "yaml" && n !== i))
    return { content: t };
  let [a] = e;
  return {
    frontMatter: {
      type: "front-matter",
      lang: o,
      value: s,
      startDelimiter: n,
      endDelimiter: i,
      raw: a.replace(/\n$/, ""),
    },
    content: T(!1, a, /[^\n]/g, " ") + t.slice(a.length),
  };
}
var je = _c;
function ei(t) {
  return Xs(je(t).content);
}
function ti(t) {
  let { frontMatter: e, content: n } = je(t);
  return (
    (e
      ? e.raw +
        `

`
      : "") + Zs(n)
  );
}
var Je = null;
function Xe(t) {
  if (Je !== null && typeof Je.property) {
    let e = Je;
    return (Je = Xe.prototype = null), e;
  }
  return (Je = Xe.prototype = t ?? Object.create(null)), new Xe();
}
var Tc = 10;
for (let t = 0; t <= Tc; t++) Xe();
function nn(t) {
  return Xe(t);
}
function Ec(t, e = "type") {
  nn(t);
  function n(r) {
    let s = r[e],
      i = t[s];
    if (!Array.isArray(i))
      throw Object.assign(new Error(`Missing visitor keys for '${s}'.`), {
        node: r,
      });
    return i;
  }
  return n;
}
var ri = Ec;
var Sc = {
    "front-matter": [],
    "css-root": ["frontMatter", "nodes"],
    "css-comment": [],
    "css-rule": ["selector", "nodes"],
    "css-decl": ["value", "selector", "nodes"],
    "css-atrule": ["selector", "params", "value", "nodes"],
    "media-query-list": ["nodes"],
    "media-query": ["nodes"],
    "media-type": [],
    "media-feature-expression": ["nodes"],
    "media-feature": [],
    "media-colon": [],
    "media-value": [],
    "media-keyword": [],
    "media-url": [],
    "media-unknown": [],
    "selector-root": ["nodes"],
    "selector-selector": ["nodes"],
    "selector-comment": [],
    "selector-string": [],
    "selector-tag": [],
    "selector-id": [],
    "selector-class": [],
    "selector-attribute": [],
    "selector-combinator": ["nodes"],
    "selector-universal": [],
    "selector-pseudo": ["nodes"],
    "selector-nesting": [],
    "selector-unknown": [],
    "value-value": ["group"],
    "value-root": ["group"],
    "value-comment": [],
    "value-comma_group": ["groups"],
    "value-paren_group": ["open", "groups", "close"],
    "value-func": ["group"],
    "value-paren": [],
    "value-number": [],
    "value-operator": [],
    "value-word": [],
    "value-colon": [],
    "value-comma": [],
    "value-string": [],
    "value-atword": [],
    "value-unicode-range": [],
    "value-unknown": [],
  },
  ni = Sc;
var Cc = ri(ni),
  si = Cc;
var Oc = new Set([
  "red",
  "green",
  "blue",
  "alpha",
  "a",
  "rgb",
  "hue",
  "h",
  "saturation",
  "s",
  "lightness",
  "l",
  "whiteness",
  "w",
  "blackness",
  "b",
  "tint",
  "shade",
  "blend",
  "blenda",
  "contrast",
  "hsl",
  "hsla",
  "hwb",
  "hwba",
]);
function ii(t) {
  var e, n;
  return (n =
    (e = t.findAncestor((r) => r.type === "css-decl")) == null
      ? void 0
      : e.prop) == null
    ? void 0
    : n.toLowerCase();
}
var Ac = new Set(["initial", "inherit", "unset", "revert"]);
function oi(t) {
  return Ac.has(t.toLowerCase());
}
function ai(t, e) {
  var r;
  let n = t.findAncestor((s) => s.type === "css-atrule");
  return (
    ((r = n == null ? void 0 : n.name) == null
      ? void 0
      : r.toLowerCase().endsWith("keyframes")) &&
    ["from", "to"].includes(e.toLowerCase())
  );
}
function ne(t) {
  return t.includes("$") ||
    t.includes("@") ||
    t.includes("#") ||
    t.startsWith("%") ||
    t.startsWith("--") ||
    t.startsWith(":--") ||
    (t.includes("(") && t.includes(")"))
    ? t
    : t.toLowerCase();
}
function Ee(t, e) {
  var r;
  let n = t.findAncestor((s) => s.type === "value-func");
  return (
    ((r = n == null ? void 0 : n.value) == null ? void 0 : r.toLowerCase()) ===
    e
  );
}
function ui(t) {
  var r;
  let e = t.findAncestor((s) => s.type === "css-rule"),
    n = (r = e == null ? void 0 : e.raws) == null ? void 0 : r.selector;
  return n && (n.startsWith(":import") || n.startsWith(":export"));
}
function Se(t, e) {
  let n = Array.isArray(e) ? e : [e],
    r = t.findAncestor((s) => s.type === "css-atrule");
  return r && n.includes(r.name.toLowerCase());
}
function li(t) {
  var n;
  let { node: e } = t;
  return (
    e.groups[0].value === "url" &&
    e.groups.length === 2 &&
    ((n = t.findAncestor((r) => r.type === "css-atrule")) == null
      ? void 0
      : n.name) === "import"
  );
}
function ci(t) {
  return t.type === "value-func" && t.value.toLowerCase() === "url";
}
function fi(t) {
  return t.type === "value-func" && t.value.toLowerCase() === "var";
}
function Nt(t, e) {
  var r;
  let n = (r = t.parent) == null ? void 0 : r.nodes;
  return n && n.indexOf(e) === n.length - 1;
}
function pi(t) {
  let { selector: e } = t;
  return e
    ? (typeof e == "string" && /^@.+:.*$/.test(e)) ||
        (e.value && /^@.+:.*$/.test(e.value))
    : !1;
}
function hi(t) {
  return (
    t.type === "value-word" && ["from", "through", "end"].includes(t.value)
  );
}
function di(t) {
  return t.type === "value-word" && ["and", "or", "not"].includes(t.value);
}
function mi(t) {
  return t.type === "value-word" && t.value === "in";
}
function Pt(t) {
  return t.type === "value-operator" && t.value === "*";
}
function Ze(t) {
  return t.type === "value-operator" && t.value === "/";
}
function j(t) {
  return t.type === "value-operator" && t.value === "+";
}
function he(t) {
  return t.type === "value-operator" && t.value === "-";
}
function Nc(t) {
  return t.type === "value-operator" && t.value === "%";
}
function Rt(t) {
  return Pt(t) || Ze(t) || j(t) || he(t) || Nc(t);
}
function yi(t) {
  return t.type === "value-word" && ["==", "!="].includes(t.value);
}
function gi(t) {
  return t.type === "value-word" && ["<", ">", "<=", ">="].includes(t.value);
}
function et(t, e) {
  return (
    e.parser === "scss" &&
    t.type === "css-atrule" &&
    ["if", "else", "for", "each", "while"].includes(t.name)
  );
}
function on(t) {
  var e;
  return (
    ((e = t.raws) == null ? void 0 : e.params) &&
    /^\(\s*\)$/.test(t.raws.params)
  );
}
function an(t) {
  return t.name.startsWith("prettier-placeholder");
}
function wi(t) {
  return t.prop.startsWith("@prettier-placeholder");
}
function vi(t, e) {
  return (
    t.value === "$$" &&
    t.type === "value-func" &&
    (e == null ? void 0 : e.type) === "value-word" &&
    !e.raws.before
  );
}
function xi(t) {
  var e, n;
  return (
    ((e = t.value) == null ? void 0 : e.type) === "value-root" &&
    ((n = t.value.group) == null ? void 0 : n.type) === "value-value" &&
    t.prop.toLowerCase() === "composes"
  );
}
function bi(t) {
  var e, n, r;
  return (
    ((r =
      (n = (e = t.value) == null ? void 0 : e.group) == null
        ? void 0
        : n.group) == null
      ? void 0
      : r.type) === "value-paren_group" &&
    t.value.group.group.open !== null &&
    t.value.group.group.close !== null
  );
}
function de(t) {
  var e;
  return ((e = t.raws) == null ? void 0 : e.before) === "";
}
function It(t) {
  var e, n;
  return (
    t.type === "value-comma_group" &&
    ((n = (e = t.groups) == null ? void 0 : e[1]) == null ? void 0 : n.type) ===
      "value-colon"
  );
}
function sn(t) {
  var e;
  return (
    t.type === "value-paren_group" &&
    ((e = t.groups) == null ? void 0 : e[0]) &&
    It(t.groups[0])
  );
}
function un(t, e) {
  var i;
  if (e.parser !== "scss") return !1;
  let { node: n } = t;
  if (n.groups.length === 0) return !1;
  let r = t.grandparent;
  if (!sn(n) && !(r && sn(r))) return !1;
  let s = t.findAncestor((o) => o.type === "css-decl");
  return !!(
    ((i = s == null ? void 0 : s.prop) != null && i.startsWith("$")) ||
    sn(r) ||
    r.type === "value-func"
  );
}
function ln(t) {
  return t.type === "value-comment" && t.inline;
}
function qt(t) {
  return t.type === "value-word" && t.value === "#";
}
function cn(t) {
  return t.type === "value-word" && t.value === "{";
}
function Dt(t) {
  return t.type === "value-word" && t.value === "}";
}
function tt(t) {
  return ["value-word", "value-atword"].includes(t.type);
}
function Lt(t) {
  return (t == null ? void 0 : t.type) === "value-colon";
}
function ki(t, e) {
  if (!It(e)) return !1;
  let { groups: n } = e,
    r = n.indexOf(t);
  return r === -1 ? !1 : Lt(n[r + 1]);
}
function _i(t) {
  return t.value && ["not", "and", "or"].includes(t.value.toLowerCase());
}
function Ti(t) {
  return t.type !== "value-func" ? !1 : Oc.has(t.value.toLowerCase());
}
function Ce(t) {
  return /\/\//.test(t.split(/[\n\r]/).pop());
}
function rt(t) {
  return (
    (t == null ? void 0 : t.type) === "value-atword" &&
    t.value.startsWith("prettier-placeholder-")
  );
}
function Ei(t, e) {
  var n, r;
  if (
    ((n = t.open) == null ? void 0 : n.value) !== "(" ||
    ((r = t.close) == null ? void 0 : r.value) !== ")" ||
    t.groups.some((s) => s.type !== "value-comma_group")
  )
    return !1;
  if (e.type === "value-comma_group") {
    let s = e.groups.indexOf(t) - 1,
      i = e.groups[s];
    if ((i == null ? void 0 : i.type) === "value-word" && i.value === "with")
      return !0;
  }
  return !1;
}
function nt(t) {
  var e, n;
  return (
    t.type === "value-paren_group" &&
    ((e = t.open) == null ? void 0 : e.value) === "(" &&
    ((n = t.close) == null ? void 0 : n.value) === ")"
  );
}
function Mt(t) {
  return (e, n, r) => {
    let s = !!(r != null && r.backwards);
    if (n === !1) return !1;
    let { length: i } = e,
      o = n;
    for (; o >= 0 && o < i; ) {
      let a = e.charAt(o);
      if (t instanceof RegExp) {
        if (!t.test(a)) return o;
      } else if (!t.includes(a)) return o;
      s ? o-- : o++;
    }
    return o === -1 || o === i ? o : !1;
  };
}
var rv = Mt(/\s/),
  Bt = Mt(" 	"),
  Si = Mt(",; 	"),
  Ft = Mt(/[^\n\r]/);
function Pc(t, e) {
  let n = 0;
  for (let r = 0; r < t.line - 1; ++r)
    n =
      e.indexOf(
        `
`,
        n,
      ) + 1;
  return n + t.column;
}
var fn = Pc;
function Ci(t, e) {
  var n, r, s;
  if (
    typeof ((r = (n = t.source) == null ? void 0 : n.start) == null
      ? void 0
      : r.offset) == "number"
  )
    return t.source.start.offset;
  if (typeof t.sourceIndex == "number") return t.sourceIndex;
  if ((s = t.source) != null && s.start) return fn(t.source.start, e);
  throw Object.assign(new Error("Can not locate node."), { node: t });
}
function pn(t, e) {
  var n, r;
  if (t.type === "css-comment" && t.inline) return Ft(e, t.source.startOffset);
  if (
    typeof ((r = (n = t.source) == null ? void 0 : n.end) == null
      ? void 0
      : r.offset) == "number"
  )
    return t.source.end.offset + 1;
  if (t.source) {
    if (t.source.end) return fn(t.source.end, e);
    if (ee(t.nodes)) return pn(G(!1, t.nodes, -1), e);
  }
  return null;
}
function hn(t, e) {
  t.source &&
    ((t.source.startOffset = Ci(t, e)), (t.source.endOffset = pn(t, e)));
  for (let n in t) {
    let r = t[n];
    n === "source" ||
      !r ||
      typeof r != "object" ||
      (r.type === "value-root" || r.type === "value-unknown"
        ? Oi(r, Rc(t), r.text || r.value)
        : hn(r, e));
  }
}
function Oi(t, e, n) {
  t.source &&
    ((t.source.startOffset = Ci(t, n) + e),
    (t.source.endOffset = pn(t, n) + e));
  for (let r in t) {
    let s = t[r];
    r === "source" || !s || typeof s != "object" || Oi(s, e, n);
  }
}
function Rc(t) {
  var n;
  let e = t.source.startOffset;
  return (
    typeof t.prop == "string" && (e += t.prop.length),
    t.type === "css-atrule" &&
      typeof t.name == "string" &&
      (e += 1 + t.name.length + t.raws.afterName.match(/^\s*:?\s*/)[0].length),
    t.type !== "css-atrule" &&
      typeof ((n = t.raws) == null ? void 0 : n.between) == "string" &&
      (e += t.raws.between.length),
    e
  );
}
function Ai(t) {
  let e = "initial",
    n = "initial",
    r,
    s = !1,
    i = [];
  for (let o = 0; o < t.length; o++) {
    let a = t[o];
    switch (e) {
      case "initial":
        if (a === "'") {
          e = "single-quotes";
          continue;
        }
        if (a === '"') {
          e = "double-quotes";
          continue;
        }
        if (
          (a === "u" || a === "U") &&
          t.slice(o, o + 4).toLowerCase() === "url("
        ) {
          (e = "url"), (o += 3);
          continue;
        }
        if (a === "*" && t[o - 1] === "/") {
          e = "comment-block";
          continue;
        }
        if (a === "/" && t[o - 1] === "/") {
          (e = "comment-inline"), (r = o - 1);
          continue;
        }
        continue;
      case "single-quotes":
        if (
          (a === "'" && t[o - 1] !== "\\" && ((e = n), (n = "initial")),
          a ===
            `
` || a === "\r")
        )
          return t;
        continue;
      case "double-quotes":
        if (
          (a === '"' && t[o - 1] !== "\\" && ((e = n), (n = "initial")),
          a ===
            `
` || a === "\r")
        )
          return t;
        continue;
      case "url":
        if (
          (a === ")" && (e = "initial"),
          a ===
            `
` || a === "\r")
        )
          return t;
        if (a === "'") {
          (e = "single-quotes"), (n = "url");
          continue;
        }
        if (a === '"') {
          (e = "double-quotes"), (n = "url");
          continue;
        }
        continue;
      case "comment-block":
        a === "/" && t[o - 1] === "*" && (e = "initial");
        continue;
      case "comment-inline":
        (a === '"' || a === "'" || a === "*") && (s = !0),
          (a ===
            `
` ||
            a === "\r") &&
            (s && i.push([r, o]), (e = "initial"), (s = !1));
        continue;
    }
  }
  for (let [o, a] of i)
    t = t.slice(0, o) + T(!1, t.slice(o, a), /["'*]/g, " ") + t.slice(a);
  return t;
}
function P(t) {
  var e;
  return (e = t.source) == null ? void 0 : e.startOffset;
}
function R(t) {
  var e;
  return (e = t.source) == null ? void 0 : e.endOffset;
}
function Ic(t) {
  return t
    .toLowerCase()
    .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, "$1$2")
    .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
    .replace(/^([+-])?\./, "$10.")
    .replace(/(\.\d+?)0+(?=e|$)/, "$1")
    .replace(/\.(?=e|$)/, "");
}
var Ni = Ic;
var dn = new Map([
  ["em", "em"],
  ["rem", "rem"],
  ["ex", "ex"],
  ["rex", "rex"],
  ["cap", "cap"],
  ["rcap", "rcap"],
  ["ch", "ch"],
  ["rch", "rch"],
  ["ic", "ic"],
  ["ric", "ric"],
  ["lh", "lh"],
  ["rlh", "rlh"],
  ["vw", "vw"],
  ["svw", "svw"],
  ["lvw", "lvw"],
  ["dvw", "dvw"],
  ["vh", "vh"],
  ["svh", "svh"],
  ["lvh", "lvh"],
  ["dvh", "dvh"],
  ["vi", "vi"],
  ["svi", "svi"],
  ["lvi", "lvi"],
  ["dvi", "dvi"],
  ["vb", "vb"],
  ["svb", "svb"],
  ["lvb", "lvb"],
  ["dvb", "dvb"],
  ["vmin", "vmin"],
  ["svmin", "svmin"],
  ["lvmin", "lvmin"],
  ["dvmin", "dvmin"],
  ["vmax", "vmax"],
  ["svmax", "svmax"],
  ["lvmax", "lvmax"],
  ["dvmax", "dvmax"],
  ["cm", "cm"],
  ["mm", "mm"],
  ["q", "Q"],
  ["in", "in"],
  ["pt", "pt"],
  ["pc", "pc"],
  ["px", "px"],
  ["deg", "deg"],
  ["grad", "grad"],
  ["rad", "rad"],
  ["turn", "turn"],
  ["s", "s"],
  ["ms", "ms"],
  ["hz", "Hz"],
  ["khz", "kHz"],
  ["dpi", "dpi"],
  ["dpcm", "dpcm"],
  ["dppx", "dppx"],
  ["x", "x"],
  ["cqw", "cqw"],
  ["cqh", "cqh"],
  ["cqi", "cqi"],
  ["cqb", "cqb"],
  ["cqmin", "cqmin"],
  ["cqmax", "cqmax"],
]);
function Pi(t) {
  let e = t.toLowerCase();
  return dn.has(e) ? dn.get(e) : t;
}
var Ri = /(["'])(?:(?!\1)[^\\]|\\.)*\1/gs,
  qc = /(?:\d*\.\d+|\d+\.?)(?:[Ee][+-]?\d+)?/g,
  Dc = /[A-Za-z]+/g,
  Lc = /[$@]?[A-Z_a-z\u0080-\uFFFF][\w\u0080-\uFFFF-]*/g,
  Mc = new RegExp(
    Ri.source + `|(${Lc.source})?(${qc.source})(${Dc.source})?`,
    "g",
  );
function W(t, e) {
  return T(!1, t, Ri, (n) => St(n, e));
}
function Ii(t, e) {
  let n = e.singleQuote ? "'" : '"';
  return t.includes('"') || t.includes("'") ? t : n + t + n;
}
function me(t) {
  return T(!1, t, Mc, (e, n, r, s, i) => (!r && s ? mn(s) + ne(i || "") : e));
}
function mn(t) {
  return Ni(t).replace(/\.0(?=$|e)/, "");
}
function qi(t) {
  return t.trailingComma === "es5" || t.trailingComma === "all";
}
function Bc(t, e, n) {
  var d;
  let { node: r } = t,
    s = t.parent,
    i = t.grandparent,
    o = ii(t),
    a =
      o &&
      s.type === "value-value" &&
      (o === "grid" || o.startsWith("grid-template")),
    u = t.findAncestor((m) => m.type === "css-atrule"),
    c = u && et(u, e),
    f = r.groups.some((m) => ln(m)),
    p = t.map(n, "groups"),
    l = [],
    g = Ee(t, "url"),
    x = !1,
    h = !1;
  for (let m = 0; m < r.groups.length; ++m) {
    l.push(p[m]);
    let b = r.groups[m - 1],
      w = r.groups[m],
      v = r.groups[m + 1],
      N = r.groups[m + 2];
    if (g) {
      ((v && j(v)) || j(w)) && l.push(" ");
      continue;
    }
    if (
      (Se(t, "forward") &&
        w.type === "value-word" &&
        w.value &&
        b !== void 0 &&
        b.type === "value-word" &&
        b.value === "as" &&
        v.type === "value-operator" &&
        v.value === "*") ||
      !v ||
      (w.type === "value-word" && w.value.endsWith("-") && rt(v))
    )
      continue;
    if (w.type === "value-string" && w.quoted) {
      let O = w.value.lastIndexOf("#{"),
        ve = w.value.lastIndexOf("}");
      O !== -1 && ve !== -1
        ? (x = O > ve)
        : O !== -1
          ? (x = !0)
          : ve !== -1 && (x = !1);
    }
    if (
      x ||
      Lt(w) ||
      Lt(v) ||
      (w.type === "value-atword" &&
        (w.value === "" || w.value.endsWith("["))) ||
      (v.type === "value-word" && v.value.startsWith("]")) ||
      w.value === "~" ||
      (w.type !== "value-string" &&
        w.value &&
        w.value.includes("\\") &&
        v &&
        v.type !== "value-comment") ||
      (b != null &&
        b.value &&
        b.value.indexOf("\\") === b.value.length - 1 &&
        w.type === "value-operator" &&
        w.value === "/") ||
      w.value === "\\" ||
      vi(w, v) ||
      qt(w) ||
      cn(w) ||
      Dt(v) ||
      (cn(v) && de(v)) ||
      (Dt(w) && de(v)) ||
      (w.value === "--" && qt(v))
    )
      continue;
    let $ = Rt(w),
      H = Rt(v);
    if (
      ((($ && qt(v)) || (H && Dt(w))) && de(v)) ||
      (!b && Ze(w)) ||
      (Ee(t, "calc") && (j(w) || j(v) || he(w) || he(v)) && de(v))
    )
      continue;
    let U =
        (j(w) || he(w)) &&
        m === 0 &&
        (v.type === "value-number" || v.isHex) &&
        i &&
        Ti(i) &&
        !de(v),
      S =
        (N == null ? void 0 : N.type) === "value-func" ||
        (N && tt(N)) ||
        w.type === "value-func" ||
        tt(w),
      C =
        v.type === "value-func" ||
        tt(v) ||
        (b == null ? void 0 : b.type) === "value-func" ||
        (b && tt(b));
    if (
      e.parser === "scss" &&
      $ &&
      w.value === "-" &&
      v.type === "value-func"
    ) {
      l.push(" ");
      continue;
    }
    if (
      !(
        !(Pt(v) || Pt(w)) &&
        !Ee(t, "calc") &&
        !U &&
        ((Ze(v) && !S) ||
          (Ze(w) && !C) ||
          (j(v) && !S) ||
          (j(w) && !C) ||
          he(v) ||
          he(w)) &&
        (de(v) || ($ && (!b || (b && Rt(b)))))
      ) &&
      !(
        (e.parser === "scss" || e.parser === "less") &&
        $ &&
        w.value === "-" &&
        nt(v) &&
        R(w) === P(v.open) &&
        v.open.value === "("
      )
    ) {
      if (ln(w)) {
        if (s.type === "value-paren_group") {
          l.push(fe(_));
          continue;
        }
        l.push(_);
        continue;
      }
      if (c && (yi(v) || gi(v) || di(v) || mi(w) || hi(w))) {
        l.push(" ");
        continue;
      }
      if (u && u.name.toLowerCase() === "namespace") {
        l.push(" ");
        continue;
      }
      if (a) {
        w.source && v.source && w.source.start.line !== v.source.start.line
          ? (l.push(_), (h = !0))
          : l.push(" ");
        continue;
      }
      if (H) {
        l.push(" ");
        continue;
      }
      if (
        (v == null ? void 0 : v.value) !== "..." &&
        !(rt(w) && rt(v) && R(w) === P(v))
      ) {
        if (rt(w) && nt(v) && R(w) === P(v.open)) {
          l.push(M);
          continue;
        }
        if (w.value === "with" && nt(v)) {
          l.push(" ");
          continue;
        }
        ((d = w.value) != null &&
          d.endsWith("#") &&
          v.value === "{" &&
          nt(v.group)) ||
          l.push(A);
      }
    }
  }
  return (
    f && l.push(Qe),
    h && l.unshift(_),
    c ? D(q(l)) : li(t) ? D(He(l)) : D(q(He(l)))
  );
}
var Di = Bc;
function Fc(t, e, n) {
  let r = !!(n != null && n.backwards);
  if (e === !1) return !1;
  let s = t.charAt(e);
  if (r) {
    if (
      t.charAt(e - 1) === "\r" &&
      s ===
        `
`
    )
      return e - 2;
    if (
      s ===
        `
` ||
      s === "\r" ||
      s === "\u2028" ||
      s === "\u2029"
    )
      return e - 1;
  } else {
    if (
      s === "\r" &&
      t.charAt(e + 1) ===
        `
`
    )
      return e + 2;
    if (
      s ===
        `
` ||
      s === "\r" ||
      s === "\u2028" ||
      s === "\u2029"
    )
      return e + 1;
  }
  return e;
}
var $t = Fc;
function $c(t, e) {
  if (e === !1) return !1;
  if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
    for (let n = e + 2; n < t.length; ++n)
      if (t.charAt(n) === "*" && t.charAt(n + 1) === "/") return n + 2;
  }
  return e;
}
var Li = $c;
function Uc(t, e) {
  return e === !1
    ? !1
    : t.charAt(e) === "/" && t.charAt(e + 1) === "/"
      ? Ft(t, e)
      : e;
}
var Mi = Uc;
function Wc(t, e, n = {}) {
  let r = Bt(t, n.backwards ? e - 1 : e, n),
    s = $t(t, r, n);
  return r !== s;
}
var Ut = Wc;
function zc(t, e) {
  let n = null,
    r = e;
  for (; r !== n; ) (n = r), (r = Si(t, r)), (r = Li(t, r)), (r = Bt(t, r));
  return (r = Mi(t, r)), (r = $t(t, r)), r !== !1 && Ut(t, r);
}
var Wt = zc;
function Vc({ node: t, parent: e }, n) {
  return !!(
    t.source && n.originalText.slice(P(t), P(e.close)).trimEnd().endsWith(",")
  );
}
function Yc(t, e) {
  return fi(t.grandparent) && Vc(t, e)
    ? ","
    : t.node.type !== "value-comment" &&
        !(
          t.node.type === "value-comma_group" &&
          t.node.groups.every((n) => n.type === "value-comment")
        ) &&
        qi(e) &&
        t.callParent(() => un(t, e))
      ? At(",")
      : "";
}
function Bi(t, e, n) {
  let { node: r, parent: s } = t,
    i = t.map(({ node: g }) => (typeof g == "string" ? g : n()), "groups");
  if (
    s &&
    ci(s) &&
    (r.groups.length === 1 ||
      (r.groups.length > 0 &&
        r.groups[0].type === "value-comma_group" &&
        r.groups[0].groups.length > 0 &&
        r.groups[0].groups[0].type === "value-word" &&
        r.groups[0].groups[0].value.startsWith("data:")))
  )
    return [r.open ? n("open") : "", Y(",", i), r.close ? n("close") : ""];
  if (!r.open) {
    let g = yn(t),
      x = Y([",", g ? _ : A], i);
    return q(g ? [_, x] : D(He(x)));
  }
  let o = t.map(({ node: g, isLast: x, index: h }) => {
      var b;
      let d = i[h];
      if (
        It(g) &&
        g.type === "value-comma_group" &&
        g.groups &&
        g.groups[0].type !== "value-paren_group" &&
        ((b = g.groups[2]) == null ? void 0 : b.type) === "value-paren_group"
      ) {
        let w = Ds(d.contents.contents);
        (w[1] = D(w[1])), (d = D(fe(d)));
      }
      let m = [d, x ? Yc(t, e) : ","];
      if (!x && g.type === "value-comma_group" && ee(g.groups)) {
        let w = G(!1, g.groups, -1);
        !w.source && w.close && (w = w.close),
          w.source && Wt(e.originalText, R(w)) && m.push(_);
      }
      return m;
    }, "groups"),
    a = ki(r, s),
    u = Ei(r, s),
    c = un(t, e),
    f = u || (c && !a),
    p = u || a,
    l = D(
      [r.open ? n("open") : "", q([M, Y(A, o)]), M, r.close ? n("close") : ""],
      { shouldBreak: f },
    );
  return p ? fe(l) : l;
}
function yn(t) {
  return t.match(
    (e) =>
      e.type === "value-paren_group" &&
      !e.open &&
      e.groups.some((n) => n.type === "value-comma_group"),
    (e, n) => n === "group" && e.type === "value-value",
    (e, n) => n === "group" && e.type === "value-root",
    (e, n) =>
      n === "value" &&
      ((e.type === "css-decl" && !e.prop.startsWith("--")) ||
        (e.type === "css-atrule" && e.variable)),
  );
}
function Gc(t, e, n) {
  let r = [];
  return (
    t.each(() => {
      let { node: s, previous: i } = t;
      if (
        ((i == null ? void 0 : i.type) === "css-comment" &&
        i.text.trim() === "prettier-ignore"
          ? r.push(e.originalText.slice(P(s), R(s)))
          : r.push(n()),
        t.isLast)
      )
        return;
      let { next: o } = t;
      (o.type === "css-comment" &&
        !Ut(e.originalText, P(o), { backwards: !0 }) &&
        !Te(s)) ||
      (o.type === "css-atrule" && o.name === "else" && s.type !== "css-comment")
        ? r.push(" ")
        : (r.push(e.__isHTMLStyleAttribute ? A : _),
          Wt(e.originalText, R(s)) && !Te(s) && r.push(_));
    }, "nodes"),
    r
  );
}
var Oe = Gc;
function Kc(t, e, n) {
  var s, i, o, a, u, c;
  let { node: r } = t;
  switch (r.type) {
    case "front-matter":
      return [r.raw, _];
    case "css-root": {
      let f = Oe(t, e, n),
        p = r.raws.after.trim();
      return (
        p.startsWith(";") && (p = p.slice(1).trim()),
        [
          r.frontMatter ? [n("frontMatter"), _] : "",
          f,
          p ? ` ${p}` : "",
          r.nodes.length > 0 ? _ : "",
        ]
      );
    }
    case "css-comment": {
      let f = r.inline || r.raws.inline,
        p = e.originalText.slice(P(r), R(r));
      return f ? p.trimEnd() : p;
    }
    case "css-rule":
      return [
        n("selector"),
        r.important ? " !important" : "",
        r.nodes
          ? [
              ((s = r.selector) == null ? void 0 : s.type) ===
                "selector-unknown" && Ce(r.selector.value)
                ? A
                : r.selector
                  ? " "
                  : "",
              "{",
              r.nodes.length > 0 ? q([_, Oe(t, e, n)]) : "",
              _,
              "}",
              pi(r) ? ";" : "",
            ]
          : ";",
      ];
    case "css-decl": {
      let f = t.parent,
        { between: p } = r.raws,
        l = p.trim(),
        g = l === ":",
        x = typeof r.value == "string" && /^ *$/.test(r.value),
        h = typeof r.value == "string" ? r.value : n("value");
      return (
        (h = xi(r) ? Ls(h) : h),
        !g &&
          Ce(l) &&
          !(
            (o = (i = r.value) == null ? void 0 : i.group) != null &&
            o.group &&
            t.call(() => yn(t), "value", "group", "group")
          ) &&
          (h = q([_, fe(h)])),
        [
          T(!1, r.raws.before, /[\s;]/g, ""),
          (f.type === "css-atrule" && f.variable) || ui(t)
            ? r.prop
            : ne(r.prop),
          l.startsWith("//") ? " " : "",
          l,
          r.extend || x ? "" : " ",
          e.parser === "less" && r.extend && r.selector
            ? ["extend(", n("selector"), ")"]
            : "",
          h,
          r.raws.important
            ? r.raws.important.replace(/\s*!\s*important/i, " !important")
            : r.important
              ? " !important"
              : "",
          r.raws.scssDefault
            ? r.raws.scssDefault.replace(/\s*!default/i, " !default")
            : r.scssDefault
              ? " !default"
              : "",
          r.raws.scssGlobal
            ? r.raws.scssGlobal.replace(/\s*!global/i, " !global")
            : r.scssGlobal
              ? " !global"
              : "",
          r.nodes
            ? [" {", q([M, Oe(t, e, n)]), M, "}"]
            : wi(r) && !f.raws.semicolon && e.originalText[R(r) - 1] !== ";"
              ? ""
              : e.__isHTMLStyleAttribute && Nt(t, r)
                ? At(";")
                : ";",
        ]
      );
    }
    case "css-atrule": {
      let f = t.parent,
        p = an(r) && !f.raws.semicolon && e.originalText[R(r) - 1] !== ";";
      if (e.parser === "less") {
        if (r.mixin)
          return [
            n("selector"),
            r.important ? " !important" : "",
            p ? "" : ";",
          ];
        if (r.function)
          return [
            r.name,
            typeof r.params == "string" ? r.params : n("params"),
            p ? "" : ";",
          ];
        if (r.variable)
          return [
            "@",
            r.name,
            ": ",
            r.value ? n("value") : "",
            r.raws.between.trim() ? r.raws.between.trim() + " " : "",
            r.nodes
              ? ["{", q([r.nodes.length > 0 ? M : "", Oe(t, e, n)]), M, "}"]
              : "",
            p ? "" : ";",
          ];
      }
      let l =
        r.name === "import" &&
        ((a = r.params) == null ? void 0 : a.type) === "value-unknown" &&
        r.params.value.endsWith(";");
      return [
        "@",
        on(r) || r.name.endsWith(":") ? r.name : ne(r.name),
        r.params
          ? [
              on(r)
                ? ""
                : an(r)
                  ? r.raws.afterName === ""
                    ? ""
                    : r.name.endsWith(":")
                      ? " "
                      : /^\s*\n\s*\n/.test(r.raws.afterName)
                        ? [_, _]
                        : /^\s*\n/.test(r.raws.afterName)
                          ? _
                          : " "
                  : " ",
              typeof r.params == "string" ? r.params : n("params"),
            ]
          : "",
        r.selector ? q([" ", n("selector")]) : "",
        r.value
          ? D([" ", n("value"), et(r, e) ? (bi(r) ? " " : A) : ""])
          : r.name === "else"
            ? " "
            : "",
        r.nodes
          ? [
              et(r, e)
                ? ""
                : (r.selector &&
                      !r.selector.nodes &&
                      typeof r.selector.value == "string" &&
                      Ce(r.selector.value)) ||
                    (!r.selector && typeof r.params == "string" && Ce(r.params))
                  ? A
                  : " ",
              "{",
              q([r.nodes.length > 0 ? M : "", Oe(t, e, n)]),
              M,
              "}",
            ]
          : p || l
            ? ""
            : ";",
      ];
    }
    case "media-query-list": {
      let f = [];
      return (
        t.each(({ node: p }) => {
          (p.type === "media-query" && p.value === "") || f.push(n());
        }, "nodes"),
        D(q(Y(A, f)))
      );
    }
    case "media-query":
      return [Y(" ", t.map(n, "nodes")), Nt(t, r) ? "" : ","];
    case "media-type":
      return me(W(r.value, e));
    case "media-feature-expression":
      return r.nodes ? ["(", ...t.map(n, "nodes"), ")"] : r.value;
    case "media-feature":
      return ne(W(T(!1, r.value, / +/g, " "), e));
    case "media-colon":
      return [r.value, " "];
    case "media-value":
      return me(W(r.value, e));
    case "media-keyword":
      return W(r.value, e);
    case "media-url":
      return W(T(!1, T(!1, r.value, /^url\(\s+/gi, "url("), /\s+\)$/g, ")"), e);
    case "media-unknown":
      return r.value;
    case "selector-root":
      return D([
        Se(t, "custom-selector")
          ? [t.findAncestor((f) => f.type === "css-atrule").customSelector, A]
          : "",
        Y(
          [",", Se(t, ["extend", "custom-selector", "nest"]) ? A : _],
          t.map(n, "nodes"),
        ),
      ]);
    case "selector-selector":
      return D(q(t.map(n, "nodes")));
    case "selector-comment":
      return r.value;
    case "selector-string":
      return W(r.value, e);
    case "selector-tag":
      return [
        r.namespace ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"] : "",
        ((u = t.previous) == null ? void 0 : u.type) === "selector-nesting"
          ? r.value
          : me(ai(t, r.value) ? r.value.toLowerCase() : r.value),
      ];
    case "selector-id":
      return ["#", r.value];
    case "selector-class":
      return [".", me(W(r.value, e))];
    case "selector-attribute":
      return [
        "[",
        r.namespace ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"] : "",
        r.attribute.trim(),
        r.operator ?? "",
        r.value ? Ii(W(r.value.trim(), e), e) : "",
        r.insensitive ? " i" : "",
        "]",
      ];
    case "selector-combinator": {
      if (
        r.value === "+" ||
        r.value === ">" ||
        r.value === "~" ||
        r.value === ">>>"
      ) {
        let l = t.parent;
        return [
          l.type === "selector-selector" && l.nodes[0] === r ? "" : A,
          r.value,
          Nt(t, r) ? "" : " ",
        ];
      }
      let f = r.value.trim().startsWith("(") ? A : "",
        p = me(W(r.value.trim(), e)) || A;
      return [f, p];
    }
    case "selector-universal":
      return [
        r.namespace ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"] : "",
        r.value,
      ];
    case "selector-pseudo":
      return [
        ne(r.value),
        ee(r.nodes)
          ? D(["(", q([M, Y([",", A], t.map(n, "nodes"))]), M, ")"])
          : "",
      ];
    case "selector-nesting":
      return r.value;
    case "selector-unknown": {
      let f = t.findAncestor((g) => g.type === "css-rule");
      if (f != null && f.isSCSSNesterProperty) return me(W(ne(r.value), e));
      let p = t.parent;
      if ((c = p.raws) != null && c.selector) {
        let g = P(p),
          x = g + p.raws.selector.length;
        return e.originalText.slice(g, x).trim();
      }
      let l = t.grandparent;
      if (
        p.type === "value-paren_group" &&
        (l == null ? void 0 : l.type) === "value-func" &&
        l.value === "selector"
      ) {
        let g = R(p.open) + 1,
          x = P(p.close),
          h = e.originalText.slice(g, x).trim();
        return Ce(h) ? [Qe, h] : h;
      }
      return r.value;
    }
    case "value-value":
    case "value-root":
      return n("group");
    case "value-comment":
      return e.originalText.slice(P(r), R(r));
    case "value-comma_group":
      return Di(t, e, n);
    case "value-paren_group":
      return Bi(t, e, n);
    case "value-func":
      return [r.value, Se(t, "supports") && _i(r) ? " " : "", n("group")];
    case "value-paren":
      return r.value;
    case "value-number":
      return [mn(r.value), Pi(r.unit)];
    case "value-operator":
      return r.value;
    case "value-word":
      return (r.isColor && r.isHex) || oi(r.value)
        ? r.value.toLowerCase()
        : r.value;
    case "value-colon": {
      let { previous: f } = t;
      return [
        r.value,
        (typeof (f == null ? void 0 : f.value) == "string" &&
          f.value.endsWith("\\")) ||
        Ee(t, "url")
          ? ""
          : A,
      ];
    }
    case "value-string":
      return St(r.raws.quote + r.value + r.raws.quote, e);
    case "value-atword":
      return ["@", r.value];
    case "value-unicode-range":
      return r.value;
    case "value-unknown":
      return r.value;
    case "value-comma":
    default:
      throw new Ms(r, "PostCSS");
  }
}
var Hc = {
    print: Kc,
    embed: Ws,
    insertPragma: ti,
    massageAstNode: Fs,
    getVisitorKeys: si,
  },
  Fi = Hc;
var Es = {};
Os(Es, { css: () => Bg, less: () => Fg, scss: () => $g });
var ql = ue(dt(), 1),
  Dl = ue(Ho(), 1),
  Ll = ue(Pa(), 1);
function Jp(t, e) {
  let n = new SyntaxError(
    t + " (" + e.loc.start.line + ":" + e.loc.start.column + ")",
  );
  return Object.assign(n, e);
}
var Ra = Jp;
function Xp(t, e) {
  return e.parser !== "scss" || !t.selector
    ? !1
    : t.selector
        .replace(/\/\*.*?\*\//, "")
        .replace(/\/\/.*\n/, "")
        .trim()
        .endsWith(":");
}
var Ia = Xp;
var Zp = new Set(["import", "use", "forward"]);
function eh(t) {
  return Zp.has(t);
}
var qa = eh;
var Tl = ue(Ou(), 1);
var id = (t) => {
    for (; t.parent; ) t = t.parent;
    return t;
  },
  Ar = id;
function od(t) {
  return Ar(t)
    .text.slice(t.group.open.sourceIndex + 1, t.group.close.sourceIndex)
    .trim();
}
var Au = od;
function ad(t) {
  if (ee(t)) {
    for (let e = t.length - 1; e > 0; e--)
      if (
        t[e].type === "word" &&
        t[e].value === "{" &&
        t[e - 1].type === "word" &&
        t[e - 1].value.endsWith("#")
      )
        return !0;
  }
  return !1;
}
var Nu = ad;
function ud(t) {
  return t.some(
    (e) =>
      e.type === "string" || (e.type === "func" && !e.value.endsWith("\\")),
  );
}
var Pu = ud;
function ld(t, e) {
  return !!(
    e.parser === "scss" &&
    (t == null ? void 0 : t.type) === "word" &&
    t.value.startsWith("$")
  );
}
var Ru = ld;
var _l = ue(kl(), 1);
function X(t, e, n) {
  if (t && typeof t == "object") {
    delete t.parent;
    for (let r in t)
      X(t[r], e, n),
        r === "type" &&
          typeof t[r] == "string" &&
          !t[r].startsWith(e) &&
          (!n || !n.test(t[r])) &&
          (t[r] = e + t[r]);
  }
  return t;
}
function ms(t) {
  if (t && typeof t == "object") {
    delete t.parent;
    for (let e in t) ms(t[e]);
    !Array.isArray(t) && t.value && !t.type && (t.type = "unknown");
  }
  return t;
}
function xg(t) {
  if (/\/\/|\/\*/.test(t)) return { type: "selector-unknown", value: t.trim() };
  let e;
  try {
    new _l.default((n) => {
      e = n;
    }).process(t);
  } catch {
    return { type: "selector-unknown", value: t };
  }
  return X(e, "selector-");
}
var Z = xg;
function bg(t, e) {
  var u;
  let { nodes: n } = t,
    r = { open: null, close: null, groups: [], type: "paren_group" },
    s = [r],
    i = r,
    o = { groups: [], type: "comma_group" },
    a = [o];
  for (let c = 0; c < n.length; ++c) {
    let f = n[c];
    if (
      (e.parser === "scss" &&
        f.type === "number" &&
        f.unit === ".." &&
        f.value.endsWith(".") &&
        ((f.value = f.value.slice(0, -1)), (f.unit = "...")),
      f.type === "func" &&
        f.value === "selector" &&
        (f.group.groups = [
          Z(
            Ar(t).text.slice(
              f.group.open.sourceIndex + 1,
              f.group.close.sourceIndex,
            ),
          ),
        ]),
      f.type === "func" && f.value === "url")
    ) {
      let p = ((u = f.group) == null ? void 0 : u.groups) ?? [],
        l = [];
      for (let g = 0; g < p.length; g++) {
        let x = p[g];
        x.type === "comma_group" ? (l = [...l, ...x.groups]) : l.push(x);
      }
      (Nu(l) || (!Pu(l) && !Ru(l[0], e))) && (f.group.groups = [Au(f)]);
    }
    if (f.type === "paren" && f.value === "(")
      (r = { open: f, close: null, groups: [], type: "paren_group" }),
        s.push(r),
        (o = { groups: [], type: "comma_group" }),
        a.push(o);
    else if (f.type === "paren" && f.value === ")") {
      if (
        (o.groups.length > 0 && r.groups.push(o), (r.close = f), a.length === 1)
      )
        throw new Error("Unbalanced parenthesis");
      a.pop(),
        (o = G(!1, a, -1)),
        o.groups.push(r),
        s.pop(),
        (r = G(!1, s, -1));
    } else
      f.type === "comma"
        ? (r.groups.push(o),
          (o = { groups: [], type: "comma_group" }),
          (a[a.length - 1] = o))
        : o.groups.push(f);
  }
  return o.groups.length > 0 && r.groups.push(o), i;
}
function Xr(t) {
  return (t.type === "paren_group" &&
    !t.open &&
    !t.close &&
    t.groups.length === 1) ||
    (t.type === "comma_group" && t.groups.length === 1)
    ? Xr(t.groups[0])
    : t.type === "paren_group" || t.type === "comma_group"
      ? { ...t, groups: t.groups.map(Xr) }
      : t;
}
function El(t, e) {
  if (t && typeof t == "object")
    for (let n in t)
      n !== "parent" &&
        (El(t[n], e), n === "nodes" && ((t.group = Xr(bg(t, e))), delete t[n]));
  return t;
}
function kg(t, e) {
  if (e.parser === "less" && t.startsWith("~`"))
    return { type: "value-unknown", value: t };
  let n = null;
  try {
    n = new Tl.default(t, { loose: !0 }).parse();
  } catch {
    return { type: "value-unknown", value: t };
  }
  n.text = t;
  let r = El(n, e);
  return X(r, "value-", /^selector-/);
}
var ae = kg;
var Rl = ue(Pl(), 1);
var qg = Rl.default.default;
function Dg(t) {
  let e;
  try {
    e = qg(t);
  } catch {
    return { type: "selector-unknown", value: t };
  }
  return X(ms(e), "media-");
}
var Il = Dg;
var Lg = /(\s*)(!default).*$/,
  Mg = /(\s*)(!global).*$/;
function Ml(t, e) {
  var n, r;
  if (t && typeof t == "object") {
    delete t.parent;
    for (let a in t) Ml(t[a], e);
    if (!t.type) return t;
    if (
      (t.raws ?? (t.raws = {}),
      t.type === "css-decl" &&
        typeof t.prop == "string" &&
        t.prop.startsWith("--") &&
        typeof t.value == "string" &&
        t.value.startsWith("{"))
    ) {
      let a;
      if (t.value.trimEnd().endsWith("}")) {
        let u = e.originalText.slice(0, t.source.start.offset),
          c =
            "a".repeat(t.prop.length) +
            e.originalText.slice(
              t.source.start.offset + t.prop.length,
              t.source.end.offset + 1,
            ),
          f = T(!1, u, /[^\n]/g, " ") + c,
          p;
        e.parser === "scss"
          ? (p = $l)
          : e.parser === "less"
            ? (p = Fl)
            : (p = Bl);
        let l;
        try {
          l = p(f, { ...e });
        } catch {}
        ((n = l == null ? void 0 : l.nodes) == null ? void 0 : n.length) ===
          1 &&
          l.nodes[0].type === "css-rule" &&
          (a = l.nodes[0].nodes);
      }
      return (
        a
          ? (t.value = { type: "css-rule", nodes: a })
          : (t.value = { type: "value-unknown", value: t.raws.value.raw }),
        t
      );
    }
    let s = "";
    typeof t.selector == "string" &&
      ((s = t.raws.selector
        ? t.raws.selector.scss ?? t.raws.selector.raw
        : t.selector),
      t.raws.between &&
        t.raws.between.trim().length > 0 &&
        (s += t.raws.between),
      (t.raws.selector = s));
    let i = "";
    typeof t.value == "string" &&
      ((i = t.raws.value ? t.raws.value.scss ?? t.raws.value.raw : t.value),
      (i = i.trim()),
      (t.raws.value = i));
    let o = "";
    if (
      (typeof t.params == "string" &&
        ((o = t.raws.params
          ? t.raws.params.scss ?? t.raws.params.raw
          : t.params),
        t.raws.afterName &&
          t.raws.afterName.trim().length > 0 &&
          (o = t.raws.afterName + o),
        t.raws.between &&
          t.raws.between.trim().length > 0 &&
          (o = o + t.raws.between),
        (o = o.trim()),
        (t.raws.params = o)),
      s.trim().length > 0)
    )
      return s.startsWith("@") && s.endsWith(":")
        ? t
        : t.mixin
          ? ((t.selector = ae(s, e)), t)
          : (Ia(t, e) && (t.isSCSSNesterProperty = !0), (t.selector = Z(s)), t);
    if (i.length > 0) {
      let a = i.match(Lg);
      a &&
        ((i = i.slice(0, a.index)),
        (t.scssDefault = !0),
        a[0].trim() !== "!default" && (t.raws.scssDefault = a[0]));
      let u = i.match(Mg);
      if (
        (u &&
          ((i = i.slice(0, u.index)),
          (t.scssGlobal = !0),
          u[0].trim() !== "!global" && (t.raws.scssGlobal = u[0])),
        i.startsWith("progid:"))
      )
        return { type: "value-unknown", value: i };
      t.value = ae(i, e);
    }
    if (
      (e.parser === "less" &&
        t.type === "css-decl" &&
        i.startsWith("extend(") &&
        (t.extend || (t.extend = t.raws.between === ":"),
        t.extend &&
          !t.selector &&
          (delete t.value, (t.selector = Z(i.slice(7, -1))))),
      t.type === "css-atrule")
    ) {
      if (e.parser === "less") {
        if (t.mixin) {
          let a = t.raws.identifier + t.name + t.raws.afterName + t.raws.params;
          return (t.selector = Z(a)), delete t.params, t;
        }
        if (t.function) return t;
      }
      if (e.parser === "css" && t.name === "custom-selector") {
        let a = t.params.match(/:--\S+\s+/)[0].trim();
        return (
          (t.customSelector = a),
          (t.selector = Z(t.params.slice(a.length).trim())),
          delete t.params,
          t
        );
      }
      if (e.parser === "less") {
        if (t.name.includes(":") && !t.params) {
          t.variable = !0;
          let a = t.name.split(":");
          (t.name = a[0]), (t.value = ae(a.slice(1).join(":"), e));
        }
        if (
          !["page", "nest", "keyframes"].includes(t.name) &&
          ((r = t.params) == null ? void 0 : r[0]) === ":"
        ) {
          t.variable = !0;
          let a = t.params.slice(1);
          a && (t.value = ae(a, e)), (t.raws.afterName += ":");
        }
        if (t.variable) return delete t.params, t.value || delete t.value, t;
      }
    }
    if (t.type === "css-atrule" && o.length > 0) {
      let { name: a } = t,
        u = t.name.toLowerCase();
      return a === "warn" || a === "error"
        ? ((t.params = { type: "media-unknown", value: o }), t)
        : a === "extend" || a === "nest"
          ? ((t.selector = Z(o)), delete t.params, t)
          : a === "at-root"
            ? (/^\(\s*(?:without|with)\s*:.+\)$/s.test(o)
                ? (t.params = ae(o, e))
                : ((t.selector = Z(o)), delete t.params),
              t)
            : qa(u)
              ? ((t.import = !0), delete t.filename, (t.params = ae(o, e)), t)
              : [
                    "namespace",
                    "supports",
                    "if",
                    "else",
                    "for",
                    "each",
                    "while",
                    "debug",
                    "mixin",
                    "include",
                    "function",
                    "return",
                    "define-mixin",
                    "add-mixin",
                  ].includes(a)
                ? ((o = o.replace(/(\$\S+?)(\s+)?\.{3}/, "$1...$2")),
                  (o = o.replace(/^(?!if)(\S+)(\s+)\(/, "$1($2")),
                  (t.value = ae(o, e)),
                  delete t.params,
                  t)
                : ["media", "custom-media"].includes(u)
                  ? o.includes("#{")
                    ? { type: "media-unknown", value: o }
                    : ((t.params = Il(o)), t)
                  : ((t.params = o), t);
    }
  }
  return t;
}
function _s(t, e, n) {
  let r = je(e),
    { frontMatter: s } = r;
  e = r.content;
  let i;
  try {
    i = t(e, { map: !1 });
  } catch (o) {
    let { name: a, reason: u, line: c, column: f } = o;
    throw typeof c != "number"
      ? o
      : Ra(`${a}: ${u}`, { loc: { start: { line: c, column: f } }, cause: o });
  }
  return (
    (n.originalText = e),
    (i = Ml(X(i, "css-"), n)),
    hn(i, e),
    s &&
      ((s.source = { startOffset: 0, endOffset: s.raw.length }),
      (i.frontMatter = s)),
    i
  );
}
function Bl(t, e = {}) {
  return _s(ql.default.default, t, e);
}
function Fl(t, e = {}) {
  return _s((n) => Dl.default.parse(Ai(n)), t, e);
}
function $l(t, e = {}) {
  return _s(Ll.default, t, e);
}
var Ts = { astFormat: "postcss", hasPragma: ei, locStart: P, locEnd: R },
  Bg = { ...Ts, parse: Bl },
  Fg = { ...Ts, parse: Fl },
  $g = { ...Ts, parse: $l };
var Ul = [
  {
    linguistLanguageId: 50,
    name: "CSS",
    type: "markup",
    tmScope: "source.css",
    aceMode: "css",
    codemirrorMode: "css",
    codemirrorMimeType: "text/css",
    color: "#563d7c",
    extensions: [".css", ".wxss"],
    parsers: ["css"],
    vscodeLanguageIds: ["css"],
  },
  {
    linguistLanguageId: 262764437,
    name: "PostCSS",
    type: "markup",
    color: "#dc3a0c",
    tmScope: "source.postcss",
    group: "CSS",
    extensions: [".pcss", ".postcss"],
    aceMode: "text",
    parsers: ["css"],
    vscodeLanguageIds: ["postcss"],
  },
  {
    linguistLanguageId: 198,
    name: "Less",
    type: "markup",
    color: "#1d365d",
    aliases: ["less-css"],
    extensions: [".less"],
    tmScope: "source.css.less",
    aceMode: "less",
    codemirrorMode: "css",
    codemirrorMimeType: "text/css",
    parsers: ["less"],
    vscodeLanguageIds: ["less"],
  },
  {
    linguistLanguageId: 329,
    name: "SCSS",
    type: "markup",
    color: "#c6538c",
    tmScope: "source.css.scss",
    aceMode: "scss",
    codemirrorMode: "css",
    codemirrorMimeType: "text/x-scss",
    extensions: [".scss"],
    parsers: ["scss"],
    vscodeLanguageIds: ["scss"],
  },
];
var Wl = {
  bracketSpacing: {
    category: "Common",
    type: "boolean",
    default: !0,
    description: "Print spaces between brackets.",
    oppositeDescription: "Do not print spaces between brackets.",
  },
  singleQuote: {
    category: "Common",
    type: "boolean",
    default: !1,
    description: "Use single quotes instead of double quotes.",
  },
  proseWrap: {
    category: "Common",
    type: "choice",
    default: "preserve",
    description: "How to wrap prose.",
    choices: [
      {
        value: "always",
        description: "Wrap prose if it exceeds the print width.",
      },
      { value: "never", description: "Do not wrap prose." },
      { value: "preserve", description: "Wrap prose as-is." },
    ],
  },
  bracketSameLine: {
    category: "Common",
    type: "boolean",
    default: !1,
    description:
      "Put > of opening tags on the last line instead of on a new line.",
  },
  singleAttributePerLine: {
    category: "Common",
    type: "boolean",
    default: !1,
    description: "Enforce single attribute per line in HTML, Vue and JSX.",
  },
};
var Ug = { singleQuote: Wl.singleQuote },
  zl = Ug;
var Wg = { postcss: Fi };
var Vk = Ss;
export {
  Vk as default,
  Ul as languages,
  zl as options,
  Es as parsers,
  Wg as printers,
};
