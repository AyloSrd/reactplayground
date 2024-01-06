var ua = Object.create;
var Tn = Object.defineProperty;
var ia = Object.getOwnPropertyDescriptor;
var aa = Object.getOwnPropertyNames;
var oa = Object.getPrototypeOf,
  pa = Object.prototype.hasOwnProperty;
var ca = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  or = (e, t) => {
    for (var r in t) Tn(e, r, { get: t[r], enumerable: !0 });
  },
  la = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let s of aa(t))
        !pa.call(e, s) &&
          s !== r &&
          Tn(e, s, {
            get: () => t[s],
            enumerable: !(n = ia(t, s)) || n.enumerable,
          });
    return e;
  };
var ma = (e, t, r) => (
  (r = e != null ? ua(oa(e)) : {}),
  la(
    t || !e || !e.__esModule
      ? Tn(r, "default", { value: e, enumerable: !0 })
      : r,
    e,
  )
);
var Bs = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
};
var st = (e, t, r) => (
    Bs(e, t, "read from private field"), r ? r.call(e) : t.get(e)
  ),
  bs = (e, t, r) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
  },
  Ps = (e, t, r, n) => (
    Bs(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r
  );
var Hi = ca((ht) => {
  "use strict";
  Object.defineProperty(ht, "__esModule", { value: !0 });
  ht.extract = el;
  ht.parse = rl;
  ht.parseWithComments = Vi;
  ht.print = nl;
  ht.strip = tl;
  var Hc = /\*\/$/,
    Kc = /^\/\*\*?/,
    Xi = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
    zc = /(^|\s+)\/\/([^\r\n]*)/g,
    qi = /^(\r?\n)+/,
    Qc =
      /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g,
    Wi = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g,
    Zc = /(\r?\n|^) *\* ?/g,
    $i = [];
  function el(e) {
    let t = e.match(Xi);
    return t ? t[0].trimLeft() : "";
  }
  function tl(e) {
    let t = e.match(Xi);
    return t && t[0] ? e.substring(t[0].length) : e;
  }
  function rl(e) {
    return Vi(e).pragmas;
  }
  function Vi(e) {
    let t = `
`;
    e = e.replace(Kc, "").replace(Hc, "").replace(Zc, "$1");
    let r = "";
    for (; r !== e; ) (r = e), (e = e.replace(Qc, `${t}$1 $2${t}`));
    e = e.replace(qi, "").trimRight();
    let n = Object.create(null),
      s = e.replace(Wi, "").replace(qi, "").trimRight(),
      u;
    for (; (u = Wi.exec(e)); ) {
      let i = u[2].replace(zc, "");
      typeof n[u[1]] == "string" || Array.isArray(n[u[1]])
        ? (n[u[1]] = $i.concat(n[u[1]], i))
        : (n[u[1]] = i);
    }
    return { comments: s, pragmas: n };
  }
  function nl({ comments: e = "", pragmas: t = {} }) {
    let r = `
`,
      n = "/**",
      s = " *",
      u = " */",
      i = Object.keys(t),
      a = i
        .map((p) => Yi(p, t[p]))
        .reduce((p, m) => p.concat(m), [])
        .map((p) => `${s} ${p}${r}`)
        .join("");
    if (!e) {
      if (i.length === 0) return "";
      if (i.length === 1 && !Array.isArray(t[i[0]])) {
        let p = t[i[0]];
        return `${n} ${Yi(i[0], p)[0]}${u}`;
      }
    }
    let o =
      e
        .split(r)
        .map((p) => `${s} ${p}`)
        .join(r) + r;
    return n + r + (e ? o : "") + (e && i.length ? s + r : "") + a + u;
  }
  function Yi(e, t) {
    return $i.concat(t).map((r) => `@${e} ${r}`.trim());
  }
});
var Ss = {};
or(Ss, { languages: () => yl, options: () => sa, printers: () => ml });
var gs = {};
or(gs, {
  canAttachComment: () => Wo,
  embed: () => Ni,
  experimentalFeatures: () => il,
  getCommentChildNodes: () => Yo,
  getVisitorKeys: () => fr,
  handleComments: () => Kn,
  insertPragma: () => zi,
  isBlockComment: () => ae,
  isGap: () => Xo,
  massageAstNode: () => Gi,
  print: () => Ii,
  printComment: () => Tu,
  willPrintOwnComments: () => zn,
});
function ya(e, t) {
  let {
      originalText: r,
      [Symbol.for("comments")]: n,
      locStart: s,
      locEnd: u,
      [Symbol.for("printedComments")]: i,
    } = t,
    { node: a } = e,
    o = s(a),
    p = u(a);
  for (let m of n) s(m) >= o && u(m) <= p && i.add(m);
  return r.slice(o, p);
}
var ks = ya;
var Ke = "string",
  je = "array",
  ze = "cursor",
  Me = "indent",
  Re = "align",
  Qe = "trim",
  ue = "group",
  ye = "fill",
  Fe = "if-break",
  Je = "indent-if-break",
  Ne = "line-suffix",
  Ue = "line-suffix-boundary",
  ie = "line",
  be = "label",
  Pe = "break-parent",
  pr = new Set([ze, Me, Re, Qe, ue, ye, Fe, Je, Ne, Ue, ie, be, Pe]);
function Da(e) {
  if (typeof e == "string") return Ke;
  if (Array.isArray(e)) return je;
  if (!e) return;
  let { type: t } = e;
  if (pr.has(t)) return t;
}
var Ze = Da;
var fa = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
function Ea(e) {
  let t = e === null ? "null" : typeof e;
  if (t !== "string" && t !== "object")
    return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
  if (Ze(e)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(e);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = fa([...pr].map((s) => `'${s}'`));
  return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var xn = class extends Error {
    name = "InvalidDocError";
    constructor(t) {
      super(Ea(t)), (this.doc = t);
    }
  },
  lt = xn;
var Is = {};
function Fa(e, t, r, n) {
  let s = [e];
  for (; s.length > 0; ) {
    let u = s.pop();
    if (u === Is) {
      r(s.pop());
      continue;
    }
    r && s.push(u, Is);
    let i = Ze(u);
    if (!i) throw new lt(u);
    if ((t == null ? void 0 : t(u)) !== !1)
      switch (i) {
        case je:
        case ye: {
          let a = i === je ? u : u.parts;
          for (let o = a.length, p = o - 1; p >= 0; --p) s.push(a[p]);
          break;
        }
        case Fe:
          s.push(u.flatContents, u.breakContents);
          break;
        case ue:
          if (n && u.expandedStates)
            for (let a = u.expandedStates.length, o = a - 1; o >= 0; --o)
              s.push(u.expandedStates[o]);
          else s.push(u.contents);
          break;
        case Re:
        case Me:
        case Je:
        case be:
        case Ne:
          s.push(u.contents);
          break;
        case Ke:
        case ze:
        case Qe:
        case Ue:
        case ie:
        case Pe:
          break;
        default:
          throw new lt(u);
      }
  }
}
var gn = Fa;
var Ls = () => {},
  Ge = Ls,
  cr = Ls;
function E(e) {
  return Ge(e), { type: Me, contents: e };
}
function De(e, t) {
  return Ge(t), { type: Re, contents: t, n: e };
}
function y(e, t = {}) {
  return (
    Ge(e),
    cr(t.expandedStates, !0),
    {
      type: ue,
      id: t.id,
      contents: e,
      break: !!t.shouldBreak,
      expandedStates: t.expandedStates,
    }
  );
}
function ws(e) {
  return De(Number.NEGATIVE_INFINITY, e);
}
function Os(e) {
  return De(-1, e);
}
function qe(e, t) {
  return y(e[0], { ...t, expandedStates: e });
}
function St(e) {
  return cr(e), { type: ye, parts: e };
}
function P(e, t = "", r = {}) {
  return (
    Ge(e),
    t !== "" && Ge(t),
    { type: Fe, breakContents: e, flatContents: t, groupId: r.groupId }
  );
}
function mt(e, t) {
  return Ge(e), { type: Je, contents: e, groupId: t.groupId, negate: t.negate };
}
function hn(e) {
  return Ge(e), { type: Ne, contents: e };
}
var Ae = { type: Ue },
  Te = { type: Pe };
var Sn = { type: ie, hard: !0 },
  Ca = { type: ie, hard: !0, literal: !0 },
  A = { type: ie },
  F = { type: ie, soft: !0 },
  C = [Sn, Te],
  lr = [Ca, Te],
  Bn = { type: ze };
function B(e, t) {
  Ge(e), cr(t);
  let r = [];
  for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
  return r;
}
function vs(e, t, r) {
  Ge(e);
  let n = e;
  if (t > 0) {
    for (let s = 0; s < Math.floor(t / r); ++s) n = E(n);
    (n = De(t % r, n)), (n = De(Number.NEGATIVE_INFINITY, n));
  }
  return n;
}
function et(e, t) {
  return Ge(t), e ? { type: be, label: e, contents: t } : t;
}
var da = (e, t, r) => {
    if (!(e && t == null))
      return Array.isArray(t) || typeof t == "string"
        ? t[r < 0 ? t.length + r : r]
        : t.at(r);
  },
  w = da;
var mr = (e) => {
  if (Array.isArray(e)) return e;
  if (e.type !== ye) throw new Error(`Expect doc to be 'array' or '${ye}'.`);
  return e.parts;
};
function ut(e, t) {
  if (typeof e == "string") return t(e);
  let r = new Map();
  return n(e);
  function n(u) {
    if (r.has(u)) return r.get(u);
    let i = s(u);
    return r.set(u, i), i;
  }
  function s(u) {
    switch (Ze(u)) {
      case je:
        return t(u.map(n));
      case ye:
        return t({ ...u, parts: u.parts.map(n) });
      case Fe:
        return t({
          ...u,
          breakContents: n(u.breakContents),
          flatContents: n(u.flatContents),
        });
      case ue: {
        let { expandedStates: i, contents: a } = u;
        return (
          i ? ((i = i.map(n)), (a = i[0])) : (a = n(a)),
          t({ ...u, contents: a, expandedStates: i })
        );
      }
      case Re:
      case Me:
      case Je:
      case be:
      case Ne:
        return t({ ...u, contents: n(u.contents) });
      case Ke:
      case ze:
      case Qe:
      case Ue:
      case ie:
      case Pe:
        return t(u);
      default:
        throw new lt(u);
    }
  }
}
function js(e, t, r) {
  let n = r,
    s = !1;
  function u(i) {
    if (s) return !1;
    let a = t(i);
    a !== void 0 && ((s = !0), (n = a));
  }
  return gn(e, u), n;
}
function Aa(e) {
  if ((e.type === ue && e.break) || (e.type === ie && e.hard) || e.type === Pe)
    return !0;
}
function K(e) {
  return js(e, Aa, !1);
}
function _s(e) {
  if (e.length > 0) {
    let t = w(!1, e, -1);
    !t.expandedStates && !t.break && (t.break = "propagated");
  }
  return null;
}
function Ms(e) {
  let t = new Set(),
    r = [];
  function n(u) {
    if ((u.type === Pe && _s(r), u.type === ue)) {
      if ((r.push(u), t.has(u))) return !1;
      t.add(u);
    }
  }
  function s(u) {
    u.type === ue && r.pop().break && _s(r);
  }
  gn(e, n, s, !0);
}
function Ta(e) {
  return e.type === ie && !e.hard
    ? e.soft
      ? ""
      : " "
    : e.type === Fe
      ? e.flatContents
      : e;
}
function Ut(e) {
  return ut(e, Ta);
}
function xa(e) {
  switch (Ze(e)) {
    case ye:
      if (e.parts.every((t) => t === "")) return "";
      break;
    case ue:
      if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
      if (
        e.contents.type === ue &&
        e.contents.id === e.id &&
        e.contents.break === e.break &&
        e.contents.expandedStates === e.expandedStates
      )
        return e.contents;
      break;
    case Re:
    case Me:
    case Je:
    case Ne:
      if (!e.contents) return "";
      break;
    case Fe:
      if (!e.flatContents && !e.breakContents) return "";
      break;
    case je: {
      let t = [];
      for (let r of e) {
        if (!r) continue;
        let [n, ...s] = Array.isArray(r) ? r : [r];
        typeof n == "string" && typeof w(!1, t, -1) == "string"
          ? (t[t.length - 1] += n)
          : t.push(n),
          t.push(...s);
      }
      return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
    }
    case Ke:
    case ze:
    case Qe:
    case Ue:
    case ie:
    case be:
    case Pe:
      break;
    default:
      throw new lt(e);
  }
  return e;
}
function Bt(e) {
  return ut(e, (t) => xa(t));
}
function xe(e, t = lr) {
  return ut(e, (r) =>
    typeof r == "string"
      ? B(
          t,
          r.split(`
`),
        )
      : r,
  );
}
function ga(e) {
  if (e.type === ie) return !0;
}
function Rs(e) {
  return js(e, ga, !1);
}
function Gt(e, t) {
  return e.type === be ? { ...e, contents: t(e.contents) } : t(e);
}
function ha(e) {
  return Array.isArray(e) && e.length > 0;
}
var b = ha;
var Sa =
    /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/,
  Ba = (e) => Sa.test(e),
  Js = Ba;
function ba(e) {
  return e !== null && typeof e == "object";
}
var Ns = ba;
function* Pa(e, t) {
  let { getVisitorKeys: r, filter: n = () => !0 } = t,
    s = (u) => Ns(u) && n(u);
  for (let u of r(e)) {
    let i = e[u];
    if (Array.isArray(i)) for (let a of i) s(a) && (yield a);
    else s(i) && (yield i);
  }
}
function* ka(e, t) {
  let r = [e];
  for (let n = 0; n < r.length; n++) {
    let s = r[n];
    for (let u of Pa(s, t)) yield u, r.push(u);
  }
}
function Us(e, { getVisitorKeys: t, predicate: r }) {
  for (let n of ka(e, { getVisitorKeys: t })) if (r(n)) return !0;
  return !1;
}
function yr(e) {
  return (t, r, n) => {
    let s = !!(n != null && n.backwards);
    if (r === !1) return !1;
    let { length: u } = t,
      i = r;
    for (; i >= 0 && i < u; ) {
      let a = t.charAt(i);
      if (e instanceof RegExp) {
        if (!e.test(a)) return i;
      } else if (!e.includes(a)) return i;
      s ? i-- : i++;
    }
    return i === -1 || i === u ? i : !1;
  };
}
var Yl = yr(/\s/),
  We = yr(" 	"),
  Gs = yr(",; 	"),
  qs = yr(/[^\n\r]/);
function Ia(e, t, r) {
  let n = !!(r != null && r.backwards);
  if (t === !1) return !1;
  let s = e.charAt(t);
  if (n) {
    if (
      e.charAt(t - 1) === "\r" &&
      s ===
        `
`
    )
      return t - 2;
    if (
      s ===
        `
` ||
      s === "\r" ||
      s === "\u2028" ||
      s === "\u2029"
    )
      return t - 1;
  } else {
    if (
      s === "\r" &&
      e.charAt(t + 1) ===
        `
`
    )
      return t + 2;
    if (
      s ===
        `
` ||
      s === "\r" ||
      s === "\u2028" ||
      s === "\u2029"
    )
      return t + 1;
  }
  return t;
}
var Ye = Ia;
function La(e, t, r = {}) {
  let n = We(e, r.backwards ? t - 1 : t, r),
    s = Ye(e, n, r);
  return n !== s;
}
var z = La;
function wa(e, t) {
  if (t === !1) return !1;
  if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
    for (let r = t + 2; r < e.length; ++r)
      if (e.charAt(r) === "*" && e.charAt(r + 1) === "/") return r + 2;
  }
  return t;
}
var bt = wa;
function Oa(e, t) {
  return t === !1
    ? !1
    : e.charAt(t) === "/" && e.charAt(t + 1) === "/"
      ? qs(e, t)
      : t;
}
var Pt = Oa;
function va(e, t) {
  let r = null,
    n = t;
  for (; n !== r; ) (r = n), (n = Gs(e, n)), (n = bt(e, n)), (n = We(e, n));
  return (n = Pt(e, n)), (n = Ye(e, n)), n !== !1 && z(e, n);
}
var kt = va;
var Ws = () =>
  /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var Ys = {
  eastAsianWidth(e) {
    var t = e.charCodeAt(0),
      r = e.length == 2 ? e.charCodeAt(1) : 0,
      n = t;
    return (
      55296 <= t &&
        t <= 56319 &&
        56320 <= r &&
        r <= 57343 &&
        ((t &= 1023), (r &= 1023), (n = (t << 10) | r), (n += 65536)),
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
var _a = /[^\x20-\x7F]/;
function ja(e) {
  if (!e) return 0;
  if (!_a.test(e)) return e.length;
  e = e.replace(Ws(), "  ");
  let t = 0;
  for (let r of e) {
    let n = r.codePointAt(0);
    if (n <= 31 || (n >= 127 && n <= 159) || (n >= 768 && n <= 879)) continue;
    let s = Ys.eastAsianWidth(r);
    t += s === "F" || s === "W" ? 2 : 1;
  }
  return t;
}
var tt = ja;
function U(e) {
  var n;
  let t = e.range ? e.range[0] : e.start,
    r = ((n = e.declaration) == null ? void 0 : n.decorators) ?? e.decorators;
  return b(r) ? Math.min(U(r[0]), t) : t;
}
function O(e) {
  return e.range ? e.range[1] : e.end;
}
function yt(e, t) {
  let r = U(e);
  return Number.isInteger(r) && r === U(t);
}
function Ma(e, t) {
  let r = O(e);
  return Number.isInteger(r) && r === O(t);
}
function Xs(e, t) {
  return yt(e, t) && Ma(e, t);
}
var qt = null;
function Wt(e) {
  if (qt !== null && typeof qt.property) {
    let t = qt;
    return (qt = Wt.prototype = null), t;
  }
  return (qt = Wt.prototype = e ?? Object.create(null)), new Wt();
}
var Ra = 10;
for (let e = 0; e <= Ra; e++) Wt();
function bn(e) {
  return Wt(e);
}
function Ja(e, t = "type") {
  bn(e);
  function r(n) {
    let s = n[t],
      u = e[s];
    if (!Array.isArray(u))
      throw Object.assign(new Error(`Missing visitor keys for '${s}'.`), {
        node: n,
      });
    return u;
  }
  return r;
}
var Dr = Ja;
var $s = {
  ArrayExpression: ["elements"],
  AssignmentExpression: ["left", "right"],
  BinaryExpression: ["left", "right"],
  InterpreterDirective: [],
  Directive: ["value"],
  DirectiveLiteral: [],
  BlockStatement: ["directives", "body"],
  BreakStatement: ["label"],
  CallExpression: ["callee", "arguments", "typeParameters", "typeArguments"],
  CatchClause: ["param", "body"],
  ConditionalExpression: ["test", "consequent", "alternate"],
  ContinueStatement: ["label"],
  DebuggerStatement: [],
  DoWhileStatement: ["test", "body"],
  EmptyStatement: [],
  ExpressionStatement: ["expression"],
  File: ["program"],
  ForInStatement: ["left", "right", "body"],
  ForStatement: ["init", "test", "update", "body"],
  FunctionDeclaration: [
    "id",
    "params",
    "body",
    "returnType",
    "typeParameters",
    "predicate",
  ],
  FunctionExpression: ["id", "params", "body", "returnType", "typeParameters"],
  Identifier: ["typeAnnotation", "decorators"],
  IfStatement: ["test", "consequent", "alternate"],
  LabeledStatement: ["label", "body"],
  StringLiteral: [],
  NumericLiteral: [],
  NullLiteral: [],
  BooleanLiteral: [],
  RegExpLiteral: [],
  LogicalExpression: ["left", "right"],
  MemberExpression: ["object", "property"],
  NewExpression: ["callee", "arguments", "typeParameters", "typeArguments"],
  Program: ["directives", "body"],
  ObjectExpression: ["properties"],
  ObjectMethod: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  ObjectProperty: ["key", "value", "decorators"],
  RestElement: ["argument", "typeAnnotation", "decorators"],
  ReturnStatement: ["argument"],
  SequenceExpression: ["expressions"],
  ParenthesizedExpression: ["expression"],
  SwitchCase: ["test", "consequent"],
  SwitchStatement: ["discriminant", "cases"],
  ThisExpression: [],
  ThrowStatement: ["argument"],
  TryStatement: ["block", "handler", "finalizer"],
  UnaryExpression: ["argument"],
  UpdateExpression: ["argument"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id", "init"],
  WhileStatement: ["test", "body"],
  WithStatement: ["object", "body"],
  AssignmentPattern: ["left", "right", "decorators", "typeAnnotation"],
  ArrayPattern: ["elements", "typeAnnotation", "decorators"],
  ArrowFunctionExpression: [
    "params",
    "body",
    "returnType",
    "typeParameters",
    "predicate",
  ],
  ClassBody: ["body"],
  ClassExpression: [
    "id",
    "body",
    "superClass",
    "mixins",
    "typeParameters",
    "superTypeParameters",
    "implements",
    "decorators",
    "superTypeArguments",
  ],
  ClassDeclaration: [
    "id",
    "body",
    "superClass",
    "mixins",
    "typeParameters",
    "superTypeParameters",
    "implements",
    "decorators",
    "superTypeArguments",
  ],
  ExportAllDeclaration: ["source", "attributes", "assertions", "exported"],
  ExportDefaultDeclaration: ["declaration"],
  ExportNamedDeclaration: [
    "declaration",
    "specifiers",
    "source",
    "attributes",
    "assertions",
  ],
  ExportSpecifier: ["local", "exported"],
  ForOfStatement: ["left", "right", "body"],
  ImportDeclaration: ["specifiers", "source", "attributes", "assertions"],
  ImportDefaultSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportSpecifier: ["local", "imported"],
  MetaProperty: ["meta", "property"],
  ClassMethod: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  ObjectPattern: ["properties", "typeAnnotation", "decorators"],
  SpreadElement: ["argument"],
  Super: [],
  TaggedTemplateExpression: ["tag", "quasi", "typeParameters", "typeArguments"],
  TemplateElement: [],
  TemplateLiteral: ["quasis", "expressions"],
  YieldExpression: ["argument"],
  AwaitExpression: ["argument"],
  Import: [],
  BigIntLiteral: [],
  ExportNamespaceSpecifier: ["exported"],
  OptionalMemberExpression: ["object", "property"],
  OptionalCallExpression: [
    "callee",
    "arguments",
    "typeParameters",
    "typeArguments",
  ],
  ClassProperty: ["key", "value", "typeAnnotation", "decorators", "variance"],
  ClassAccessorProperty: ["key", "value", "typeAnnotation", "decorators"],
  ClassPrivateProperty: [
    "key",
    "value",
    "decorators",
    "typeAnnotation",
    "variance",
  ],
  ClassPrivateMethod: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  PrivateName: ["id"],
  StaticBlock: ["body"],
  AnyTypeAnnotation: [],
  ArrayTypeAnnotation: ["elementType"],
  BooleanTypeAnnotation: [],
  BooleanLiteralTypeAnnotation: [],
  NullLiteralTypeAnnotation: [],
  ClassImplements: ["id", "typeParameters"],
  DeclareClass: [
    "id",
    "typeParameters",
    "extends",
    "mixins",
    "implements",
    "body",
  ],
  DeclareFunction: ["id", "predicate"],
  DeclareInterface: ["id", "typeParameters", "extends", "body"],
  DeclareModule: ["id", "body"],
  DeclareModuleExports: ["typeAnnotation"],
  DeclareTypeAlias: ["id", "typeParameters", "right"],
  DeclareOpaqueType: ["id", "typeParameters", "supertype"],
  DeclareVariable: ["id"],
  DeclareExportDeclaration: ["declaration", "specifiers", "source"],
  DeclareExportAllDeclaration: ["source"],
  DeclaredPredicate: ["value"],
  ExistsTypeAnnotation: [],
  FunctionTypeAnnotation: [
    "typeParameters",
    "params",
    "rest",
    "returnType",
    "this",
  ],
  FunctionTypeParam: ["name", "typeAnnotation"],
  GenericTypeAnnotation: ["id", "typeParameters"],
  InferredPredicate: [],
  InterfaceExtends: ["id", "typeParameters"],
  InterfaceDeclaration: ["id", "typeParameters", "extends", "body"],
  InterfaceTypeAnnotation: ["extends", "body"],
  IntersectionTypeAnnotation: ["types"],
  MixedTypeAnnotation: [],
  EmptyTypeAnnotation: [],
  NullableTypeAnnotation: ["typeAnnotation"],
  NumberLiteralTypeAnnotation: [],
  NumberTypeAnnotation: [],
  ObjectTypeAnnotation: [
    "properties",
    "indexers",
    "callProperties",
    "internalSlots",
  ],
  ObjectTypeInternalSlot: ["id", "value", "optional", "static", "method"],
  ObjectTypeCallProperty: ["value"],
  ObjectTypeIndexer: ["id", "key", "value", "variance"],
  ObjectTypeProperty: ["key", "value", "variance"],
  ObjectTypeSpreadProperty: ["argument"],
  OpaqueType: ["id", "typeParameters", "supertype", "impltype"],
  QualifiedTypeIdentifier: ["id", "qualification"],
  StringLiteralTypeAnnotation: [],
  StringTypeAnnotation: [],
  SymbolTypeAnnotation: [],
  ThisTypeAnnotation: [],
  TupleTypeAnnotation: ["types", "elementTypes"],
  TypeofTypeAnnotation: ["argument"],
  TypeAlias: ["id", "typeParameters", "right"],
  TypeAnnotation: ["typeAnnotation"],
  TypeCastExpression: ["expression", "typeAnnotation"],
  TypeParameter: ["bound", "default", "variance"],
  TypeParameterDeclaration: ["params"],
  TypeParameterInstantiation: ["params"],
  UnionTypeAnnotation: ["types"],
  Variance: [],
  VoidTypeAnnotation: [],
  EnumDeclaration: ["id", "body"],
  EnumBooleanBody: ["members"],
  EnumNumberBody: ["members"],
  EnumStringBody: ["members"],
  EnumSymbolBody: ["members"],
  EnumBooleanMember: ["id", "init"],
  EnumNumberMember: ["id", "init"],
  EnumStringMember: ["id", "init"],
  EnumDefaultedMember: ["id"],
  IndexedAccessType: ["objectType", "indexType"],
  OptionalIndexedAccessType: ["objectType", "indexType"],
  JSXAttribute: ["name", "value"],
  JSXClosingElement: ["name"],
  JSXElement: ["openingElement", "children", "closingElement"],
  JSXEmptyExpression: [],
  JSXExpressionContainer: ["expression"],
  JSXSpreadChild: ["expression"],
  JSXIdentifier: [],
  JSXMemberExpression: ["object", "property"],
  JSXNamespacedName: ["namespace", "name"],
  JSXOpeningElement: ["name", "attributes", "typeArguments", "typeParameters"],
  JSXSpreadAttribute: ["argument"],
  JSXText: [],
  JSXFragment: ["openingFragment", "children", "closingFragment"],
  JSXOpeningFragment: [],
  JSXClosingFragment: [],
  Noop: [],
  Placeholder: [],
  V8IntrinsicIdentifier: [],
  ArgumentPlaceholder: [],
  BindExpression: ["object", "callee"],
  ImportAttribute: ["key", "value"],
  Decorator: ["expression"],
  DoExpression: ["body"],
  ExportDefaultSpecifier: ["exported"],
  RecordExpression: ["properties"],
  TupleExpression: ["elements"],
  DecimalLiteral: [],
  ModuleExpression: ["body"],
  TopicReference: [],
  PipelineTopicExpression: ["expression"],
  PipelineBareFunction: ["callee"],
  PipelinePrimaryTopicReference: [],
  TSParameterProperty: ["parameter", "decorators"],
  TSDeclareFunction: ["id", "typeParameters", "params", "returnType", "body"],
  TSDeclareMethod: [
    "decorators",
    "key",
    "typeParameters",
    "params",
    "returnType",
  ],
  TSQualifiedName: ["left", "right"],
  TSCallSignatureDeclaration: [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType",
  ],
  TSConstructSignatureDeclaration: [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType",
  ],
  TSPropertySignature: ["key", "typeAnnotation"],
  TSMethodSignature: [
    "key",
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType",
  ],
  TSIndexSignature: ["parameters", "typeAnnotation"],
  TSAnyKeyword: [],
  TSBooleanKeyword: [],
  TSBigIntKeyword: [],
  TSIntrinsicKeyword: [],
  TSNeverKeyword: [],
  TSNullKeyword: [],
  TSNumberKeyword: [],
  TSObjectKeyword: [],
  TSStringKeyword: [],
  TSSymbolKeyword: [],
  TSUndefinedKeyword: [],
  TSUnknownKeyword: [],
  TSVoidKeyword: [],
  TSThisType: [],
  TSFunctionType: [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType",
  ],
  TSConstructorType: [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType",
  ],
  TSTypeReference: ["typeName", "typeParameters", "typeArguments"],
  TSTypePredicate: ["parameterName", "typeAnnotation"],
  TSTypeQuery: ["exprName", "typeParameters", "typeArguments"],
  TSTypeLiteral: ["members"],
  TSArrayType: ["elementType"],
  TSTupleType: ["elementTypes"],
  TSOptionalType: ["typeAnnotation"],
  TSRestType: ["typeAnnotation"],
  TSNamedTupleMember: ["label", "elementType"],
  TSUnionType: ["types"],
  TSIntersectionType: ["types"],
  TSConditionalType: ["checkType", "extendsType", "trueType", "falseType"],
  TSInferType: ["typeParameter"],
  TSParenthesizedType: ["typeAnnotation"],
  TSTypeOperator: ["typeAnnotation"],
  TSIndexedAccessType: ["objectType", "indexType"],
  TSMappedType: ["typeParameter", "typeAnnotation", "nameType"],
  TSLiteralType: ["literal"],
  TSExpressionWithTypeArguments: ["expression", "typeParameters"],
  TSInterfaceDeclaration: ["id", "typeParameters", "extends", "body"],
  TSInterfaceBody: ["body"],
  TSTypeAliasDeclaration: ["id", "typeParameters", "typeAnnotation"],
  TSInstantiationExpression: ["expression", "typeParameters", "typeArguments"],
  TSAsExpression: ["expression", "typeAnnotation"],
  TSSatisfiesExpression: ["expression", "typeAnnotation"],
  TSTypeAssertion: ["typeAnnotation", "expression"],
  TSEnumDeclaration: ["id", "members"],
  TSEnumMember: ["id", "initializer"],
  TSModuleDeclaration: ["id", "body"],
  TSModuleBlock: ["body"],
  TSImportType: ["argument", "qualifier", "typeParameters", "typeArguments"],
  TSImportEqualsDeclaration: ["id", "moduleReference"],
  TSExternalModuleReference: ["expression"],
  TSNonNullExpression: ["expression"],
  TSExportAssignment: ["expression"],
  TSNamespaceExportDeclaration: ["id"],
  TSTypeAnnotation: ["typeAnnotation"],
  TSTypeParameterInstantiation: ["params"],
  TSTypeParameterDeclaration: ["params"],
  TSTypeParameter: ["constraint", "default", "name"],
  ChainExpression: ["expression"],
  ExperimentalRestProperty: ["argument"],
  ExperimentalSpreadProperty: ["argument"],
  ImportExpression: ["source", "attributes"],
  Literal: [],
  MethodDefinition: ["decorators", "key", "value"],
  PrivateIdentifier: [],
  Property: ["key", "value"],
  PropertyDefinition: [
    "decorators",
    "key",
    "typeAnnotation",
    "value",
    "variance",
  ],
  AccessorProperty: ["decorators", "key", "typeAnnotation", "value"],
  TSAbstractAccessorProperty: ["decorators", "key", "typeAnnotation"],
  TSAbstractKeyword: [],
  TSAbstractMethodDefinition: ["key", "value"],
  TSAbstractPropertyDefinition: ["decorators", "key", "typeAnnotation"],
  TSAsyncKeyword: [],
  TSClassImplements: ["expression", "typeArguments", "typeParameters"],
  TSDeclareKeyword: [],
  TSEmptyBodyFunctionExpression: [
    "id",
    "typeParameters",
    "params",
    "returnType",
  ],
  TSExportKeyword: [],
  TSInterfaceHeritage: ["expression", "typeArguments", "typeParameters"],
  TSPrivateKeyword: [],
  TSProtectedKeyword: [],
  TSPublicKeyword: [],
  TSReadonlyKeyword: [],
  TSStaticKeyword: [],
  TSTemplateLiteralType: ["quasis", "types"],
  BigIntLiteralTypeAnnotation: [],
  BigIntTypeAnnotation: [],
  ConditionalTypeAnnotation: [
    "checkType",
    "extendsType",
    "trueType",
    "falseType",
  ],
  DeclareEnum: ["id", "body"],
  InferTypeAnnotation: ["typeParameter"],
  KeyofTypeAnnotation: ["argument"],
  ObjectTypeMappedTypeProperty: [
    "keyTparam",
    "propType",
    "sourceType",
    "variance",
  ],
  QualifiedTypeofIdentifier: ["qualification", "id"],
  TupleTypeLabeledElement: ["label", "elementType", "variance"],
  TupleTypeSpreadElement: ["label", "typeAnnotation"],
  TypePredicate: ["parameterName", "typeAnnotation", "asserts"],
  NGRoot: ["node"],
  NGPipeExpression: ["left", "right", "arguments"],
  NGChainedExpression: ["expressions"],
  NGEmptyExpression: [],
  NGMicrosyntax: ["body"],
  NGMicrosyntaxKey: [],
  NGMicrosyntaxExpression: ["expression", "alias"],
  NGMicrosyntaxKeyedExpression: ["key", "expression"],
  NGMicrosyntaxLet: ["key", "value"],
  NGMicrosyntaxAs: ["key", "alias"],
  JsExpressionRoot: ["node"],
  JsonRoot: ["node"],
  TSJSDocAllType: [],
  TSJSDocUnknownType: [],
  TSJSDocNullableType: ["typeAnnotation"],
  TSJSDocNonNullableType: ["typeAnnotation"],
  NeverTypeAnnotation: [],
  UndefinedTypeAnnotation: [],
  UnknownTypeAnnotation: [],
};
var Na = Dr($s),
  fr = Na;
function Ua(e) {
  return (e = new Set(e)), (t) => e.has(t == null ? void 0 : t.type);
}
var j = Ua;
var Ga = j(["Block", "CommentBlock", "MultiLine"]),
  ae = Ga;
function qa(e, t) {
  let r = t.split(".");
  for (let n = r.length - 1; n >= 0; n--) {
    let s = r[n];
    if (n === 0) return e.type === "Identifier" && e.name === s;
    if (
      e.type !== "MemberExpression" ||
      e.optional ||
      e.computed ||
      e.property.type !== "Identifier" ||
      e.property.name !== s
    )
      return !1;
    e = e.object;
  }
}
function Wa(e, t) {
  return t.some((r) => qa(e, r));
}
var Vs = Wa;
var Ya = j([
    "AnyTypeAnnotation",
    "ThisTypeAnnotation",
    "NumberTypeAnnotation",
    "VoidTypeAnnotation",
    "BooleanTypeAnnotation",
    "BigIntTypeAnnotation",
    "SymbolTypeAnnotation",
    "StringTypeAnnotation",
    "NeverTypeAnnotation",
    "UndefinedTypeAnnotation",
    "UnknownTypeAnnotation",
    "EmptyTypeAnnotation",
    "MixedTypeAnnotation",
  ]),
  Er = Ya;
function Xa({ type: e }) {
  return e.startsWith("TS") && e.endsWith("Keyword");
}
var Fr = Xa;
function Xt(e, t) {
  return t(e) || Us(e, { getVisitorKeys: fr, predicate: t });
}
function Lt(e) {
  return (
    e.type === "AssignmentExpression" ||
    e.type === "BinaryExpression" ||
    e.type === "LogicalExpression" ||
    e.type === "NGPipeExpression" ||
    e.type === "ConditionalExpression" ||
    k(e) ||
    J(e) ||
    e.type === "SequenceExpression" ||
    e.type === "TaggedTemplateExpression" ||
    e.type === "BindExpression" ||
    (e.type === "UpdateExpression" && !e.prefix) ||
    Le(e) ||
    e.type === "TSNonNullExpression" ||
    e.type === "ChainExpression"
  );
}
function zs(e) {
  return e.expressions
    ? e.expressions[0]
    : e.left ??
        e.test ??
        e.callee ??
        e.object ??
        e.tag ??
        e.argument ??
        e.expression;
}
function dr(e) {
  if (e.expressions) return ["expressions", 0];
  if (e.left) return ["left"];
  if (e.test) return ["test"];
  if (e.object) return ["object"];
  if (e.callee) return ["callee"];
  if (e.tag) return ["tag"];
  if (e.argument) return ["argument"];
  if (e.expression) return ["expression"];
  throw new Error("Unexpected node has no left side.");
}
var $t = j([
    "Line",
    "CommentLine",
    "SingleLine",
    "HashbangComment",
    "HTMLOpen",
    "HTMLClose",
    "Hashbang",
    "InterpreterDirective",
  ]),
  Qs = j([
    "ExportDefaultDeclaration",
    "DeclareExportDeclaration",
    "ExportNamedDeclaration",
    "ExportAllDeclaration",
    "DeclareExportAllDeclaration",
  ]),
  G = j(["ArrayExpression", "TupleExpression"]),
  ee = j(["ObjectExpression", "RecordExpression"]);
function he(e) {
  return (
    e.type === "NumericLiteral" ||
    (e.type === "Literal" && typeof e.value == "number")
  );
}
function Ar(e) {
  return (
    e.type === "UnaryExpression" &&
    (e.operator === "+" || e.operator === "-") &&
    he(e.argument)
  );
}
function Q(e) {
  return (
    e.type === "StringLiteral" ||
    (e.type === "Literal" && typeof e.value == "string")
  );
}
function wn(e) {
  return e.type === "RegExpLiteral" || (e.type === "Literal" && !!e.regex);
}
var ke = j(["ObjectTypeAnnotation", "TSTypeLiteral", "TSMappedType"]),
  It = j(["FunctionExpression", "ArrowFunctionExpression"]);
function $a(e) {
  return (
    e.type === "FunctionExpression" ||
    (e.type === "ArrowFunctionExpression" && e.body.type === "BlockStatement")
  );
}
function Pn(e) {
  return (
    k(e) &&
    e.callee.type === "Identifier" &&
    ["async", "inject", "fakeAsync", "waitForAsync"].includes(e.callee.name)
  );
}
var Y = j(["JSXElement", "JSXFragment"]);
function On(e) {
  return e.kind === "get" || e.kind === "set";
}
function vn(e) {
  return On(e) || yt(e, e.value);
}
function Tr(e) {
  return (
    (e.type === "ObjectTypeProperty" || e.type === "ObjectTypeInternalSlot") &&
    e.value.type === "FunctionTypeAnnotation" &&
    !e.static &&
    !vn(e)
  );
}
function Zs(e) {
  return (
    (e.type === "TypeAnnotation" || e.type === "TSTypeAnnotation") &&
    e.typeAnnotation.type === "FunctionTypeAnnotation" &&
    !e.static &&
    !yt(e, e.typeAnnotation)
  );
}
var ce = j(["BinaryExpression", "LogicalExpression", "NGPipeExpression"]);
function Dt(e) {
  return J(e) || (e.type === "BindExpression" && !!e.object);
}
var Va = j([
  "TSThisType",
  "NullLiteralTypeAnnotation",
  "BooleanLiteralTypeAnnotation",
  "StringLiteralTypeAnnotation",
  "BigIntLiteralTypeAnnotation",
  "NumberLiteralTypeAnnotation",
  "TSLiteralType",
  "TSTemplateLiteralType",
]);
function wt(e) {
  return (
    Fr(e) ||
    Er(e) ||
    Va(e) ||
    ((e.type === "GenericTypeAnnotation" || e.type === "TSTypeReference") &&
      !e.typeParameters)
  );
}
function Ha(e) {
  let t = /^(?:before|after)(?:Each|All)$/;
  return (
    e.callee.type === "Identifier" &&
    e.arguments.length === 1 &&
    t.test(e.callee.name)
  );
}
var Ka = [
  "it",
  "it.only",
  "it.skip",
  "describe",
  "describe.only",
  "describe.skip",
  "test",
  "test.only",
  "test.skip",
  "test.step",
  "test.describe",
  "test.describe.only",
  "test.describe.parallel",
  "test.describe.parallel.only",
  "test.describe.serial",
  "test.describe.serial.only",
  "skip",
  "xit",
  "xdescribe",
  "xtest",
  "fit",
  "fdescribe",
  "ftest",
];
function za(e) {
  return Vs(e, Ka);
}
function Ct(e, t) {
  if (e.type !== "CallExpression") return !1;
  if (e.arguments.length === 1) {
    if (Pn(e) && t && Ct(t)) return It(e.arguments[0]);
    if (Ha(e)) return Pn(e.arguments[0]);
  } else if (
    (e.arguments.length === 2 || e.arguments.length === 3) &&
    (e.arguments[0].type === "TemplateLiteral" || Q(e.arguments[0])) &&
    za(e.callee)
  )
    return e.arguments[2] && !he(e.arguments[2])
      ? !1
      : (e.arguments.length === 2
          ? It(e.arguments[1])
          : $a(e.arguments[1]) && X(e.arguments[1]).length <= 1) ||
          Pn(e.arguments[1]);
  return !1;
}
var k = j(["CallExpression", "OptionalCallExpression"]),
  J = j(["MemberExpression", "OptionalMemberExpression"]);
function eu(e) {
  let t = "expressions";
  e.type === "TSTemplateLiteralType" && (t = "types");
  let r = e[t];
  return r.length === 0
    ? !1
    : r.every((n) => {
        if (d(n)) return !1;
        if (n.type === "Identifier" || n.type === "ThisExpression") return !0;
        if ((n.type === "ChainExpression" && (n = n.expression), J(n))) {
          let s = n;
          for (; J(s); )
            if (
              (s.property.type !== "Identifier" &&
                s.property.type !== "Literal" &&
                s.property.type !== "StringLiteral" &&
                s.property.type !== "NumericLiteral") ||
              ((s = s.object), d(s))
            )
              return !1;
          return s.type === "Identifier" || s.type === "ThisExpression";
        }
        return !1;
      });
}
function Ie(e, t) {
  return Y(t) ? dt(t) : d(t, x.Leading, (r) => z(e, O(r)));
}
function _n(e, t) {
  return (
    t.parser !== "json" &&
    Q(e.key) &&
    oe(e.key).slice(1, -1) === e.key.value &&
    ((Js(e.key.value) &&
      !(
        (t.parser === "babel-ts" && e.type === "ClassProperty") ||
        (t.parser === "typescript" && e.type === "PropertyDefinition")
      )) ||
      (jn(e.key.value) &&
        String(Number(e.key.value)) === e.key.value &&
        (t.parser === "babel" ||
          t.parser === "acorn" ||
          t.parser === "espree" ||
          t.parser === "meriyah" ||
          t.parser === "__babel_estree")))
  );
}
function jn(e) {
  return /^(?:\d+|\d+\.\d+)$/.test(e);
}
function Hs(e) {
  return e.quasis.some((t) =>
    t.value.raw.includes(`
`),
  );
}
function xr(e, t) {
  return (
    ((e.type === "TemplateLiteral" && Hs(e)) ||
      (e.type === "TaggedTemplateExpression" && Hs(e.quasi))) &&
    !z(t, U(e), { backwards: !0 })
  );
}
function gr(e) {
  if (!d(e)) return !1;
  let t = w(!1, Kt(e, x.Dangling), -1);
  return t && !ae(t);
}
function tu(e) {
  if (e.length <= 1) return !1;
  let t = 0;
  for (let r of e)
    if (It(r)) {
      if (((t += 1), t > 1)) return !0;
    } else if (k(r)) {
      for (let n of r.arguments) if (It(n)) return !0;
    }
  return !1;
}
function hr(e) {
  let { node: t, parent: r, key: n } = e;
  return (
    n === "callee" &&
    k(t) &&
    k(r) &&
    r.arguments.length > 0 &&
    t.arguments.length > r.arguments.length
  );
}
var Qa = new Set(["!", "-", "+", "~"]);
function ge(e, t = 2) {
  if (t <= 0) return !1;
  let r = (n) => ge(n, t - 1);
  if (wn(e)) return tt(e.pattern ?? e.regex.pattern) <= 5;
  if (
    e.type === "Literal" ||
    e.type === "BigIntLiteral" ||
    e.type === "DecimalLiteral" ||
    e.type === "BooleanLiteral" ||
    e.type === "NullLiteral" ||
    e.type === "NumericLiteral" ||
    e.type === "StringLiteral" ||
    e.type === "Identifier" ||
    e.type === "ThisExpression" ||
    e.type === "Super" ||
    e.type === "PrivateName" ||
    e.type === "PrivateIdentifier" ||
    e.type === "ArgumentPlaceholder" ||
    e.type === "Import"
  )
    return !0;
  if (e.type === "TemplateLiteral")
    return (
      e.quasis.every(
        (n) =>
          !n.value.raw.includes(`
`),
      ) && e.expressions.every(r)
    );
  if (ee(e))
    return e.properties.every(
      (n) => !n.computed && (n.shorthand || (n.value && r(n.value))),
    );
  if (G(e)) return e.elements.every((n) => n === null || r(n));
  if (it(e)) {
    if (e.type === "ImportExpression" || ge(e.callee, t)) {
      let n = Ce(e);
      return n.length <= t && n.every(r);
    }
    return !1;
  }
  return J(e)
    ? ge(e.object, t) && ge(e.property, t)
    : (e.type === "UnaryExpression" && Qa.has(e.operator)) ||
        e.type === "UpdateExpression"
      ? ge(e.argument, t)
      : e.type === "TSNonNullExpression"
        ? ge(e.expression, t)
        : !1;
}
function oe(e) {
  var t;
  return ((t = e.extra) == null ? void 0 : t.raw) ?? e.raw;
}
function ru(e) {
  return e;
}
function le(e, t = "es5") {
  return (
    (e.trailingComma === "es5" && t === "es5") ||
    (e.trailingComma === "all" && (t === "all" || t === "es5"))
  );
}
function re(e, t) {
  switch (e.type) {
    case "BinaryExpression":
    case "LogicalExpression":
    case "AssignmentExpression":
    case "NGPipeExpression":
      return re(e.left, t);
    case "MemberExpression":
    case "OptionalMemberExpression":
      return re(e.object, t);
    case "TaggedTemplateExpression":
      return e.tag.type === "FunctionExpression" ? !1 : re(e.tag, t);
    case "CallExpression":
    case "OptionalCallExpression":
      return e.callee.type === "FunctionExpression" ? !1 : re(e.callee, t);
    case "ConditionalExpression":
      return re(e.test, t);
    case "UpdateExpression":
      return !e.prefix && re(e.argument, t);
    case "BindExpression":
      return e.object && re(e.object, t);
    case "SequenceExpression":
      return re(e.expressions[0], t);
    case "ChainExpression":
    case "TSSatisfiesExpression":
    case "TSAsExpression":
    case "TSNonNullExpression":
      return re(e.expression, t);
    default:
      return t(e);
  }
}
var Ks = { "==": !0, "!=": !0, "===": !0, "!==": !0 },
  Cr = { "*": !0, "/": !0, "%": !0 },
  Ln = { ">>": !0, ">>>": !0, "<<": !0 };
function Vt(e, t) {
  return !(
    Yt(t) !== Yt(e) ||
    e === "**" ||
    (Ks[e] && Ks[t]) ||
    (t === "%" && Cr[e]) ||
    (e === "%" && Cr[t]) ||
    (t !== e && Cr[t] && Cr[e]) ||
    (Ln[e] && Ln[t])
  );
}
var Za = new Map(
  [
    ["|>"],
    ["??"],
    ["||"],
    ["&&"],
    ["|"],
    ["^"],
    ["&"],
    ["==", "===", "!=", "!=="],
    ["<", ">", "<=", ">=", "in", "instanceof"],
    [">>", "<<", ">>>"],
    ["+", "-"],
    ["*", "/", "%"],
    ["**"],
  ].flatMap((e, t) => e.map((r) => [r, t])),
);
function Yt(e) {
  return Za.get(e);
}
function nu(e) {
  return !!Ln[e] || e === "|" || e === "^" || e === "&";
}
function su(e) {
  var r;
  if (e.rest) return !0;
  let t = X(e);
  return ((r = w(!1, t, -1)) == null ? void 0 : r.type) === "RestElement";
}
var kn = new WeakMap();
function X(e) {
  if (kn.has(e)) return kn.get(e);
  let t = [];
  return (
    e.this && t.push(e.this),
    Array.isArray(e.parameters)
      ? t.push(...e.parameters)
      : Array.isArray(e.params) && t.push(...e.params),
    e.rest && t.push(e.rest),
    kn.set(e, t),
    t
  );
}
function uu(e, t) {
  let { node: r } = e,
    n = 0,
    s = (u) => t(u, n++);
  r.this && e.call(s, "this"),
    Array.isArray(r.parameters)
      ? e.each(s, "parameters")
      : Array.isArray(r.params) && e.each(s, "params"),
    r.rest && e.call(s, "rest");
}
var In = new WeakMap();
function Ce(e) {
  if (In.has(e)) return In.get(e);
  let t = e.arguments;
  return (
    e.type === "ImportExpression" &&
      ((t = [e.source]), e.attributes && t.push(e.attributes)),
    In.set(e, t),
    t
  );
}
function Sr(e, t) {
  let { node: r } = e;
  r.type === "ImportExpression"
    ? (e.call((n) => t(n, 0), "source"),
      r.attributes && e.call((n) => t(n, 1), "attributes"))
    : e.each(t, "arguments");
}
function Mn(e, t) {
  if (e.type === "ImportExpression") {
    if (t === 0 || t === (e.attributes ? -2 : -1)) return "source";
    if (e.attributes && (t === 1 || t === -1)) return "attributes";
    throw new RangeError("Invalid argument index");
  }
  if ((t < 0 && (t = e.arguments.length + t), t < 0 || t >= e.arguments.length))
    throw new RangeError("Invalid argument index");
  return ["arguments", t];
}
function Ht(e) {
  return e.value.trim() === "prettier-ignore" && !e.unignore;
}
function dt(e) {
  return (e == null ? void 0 : e.prettierIgnore) || d(e, x.PrettierIgnore);
}
var x = {
    Leading: 2,
    Trailing: 4,
    Dangling: 8,
    Block: 16,
    Line: 32,
    PrettierIgnore: 64,
    First: 128,
    Last: 256,
  },
  iu = (e, t) => {
    if ((typeof e == "function" && ((t = e), (e = 0)), e || t))
      return (r, n, s) =>
        !(
          (e & x.Leading && !r.leading) ||
          (e & x.Trailing && !r.trailing) ||
          (e & x.Dangling && (r.leading || r.trailing)) ||
          (e & x.Block && !ae(r)) ||
          (e & x.Line && !$t(r)) ||
          (e & x.First && n !== 0) ||
          (e & x.Last && n !== s.length - 1) ||
          (e & x.PrettierIgnore && !Ht(r)) ||
          (t && !t(r))
        );
  };
function d(e, t, r) {
  if (!b(e == null ? void 0 : e.comments)) return !1;
  let n = iu(t, r);
  return n ? e.comments.some(n) : !0;
}
function Kt(e, t, r) {
  if (!Array.isArray(e == null ? void 0 : e.comments)) return [];
  let n = iu(t, r);
  return n ? e.comments.filter(n) : e.comments;
}
var me = (e, { originalText: t }) => kt(t, O(e));
function it(e) {
  return k(e) || e.type === "NewExpression" || e.type === "ImportExpression";
}
function fe(e) {
  return (
    e &&
    (e.type === "ObjectProperty" ||
      (e.type === "Property" && !e.method && e.kind === "init"))
  );
}
var zt = Symbol("ifWithoutBlockAndSameLineComment"),
  Le = j(["TSAsExpression", "TSSatisfiesExpression"]);
function Rn(e, t) {
  var u, i, a, o, p, m, D;
  if (e.isRoot) return !1;
  let { node: r, key: n, parent: s } = e;
  if (t.__isInHtmlInterpolation && !t.bracketSpacing && no(r) && Qt(e))
    return !0;
  if (eo(r)) return !1;
  if (r.type === "Identifier") {
    if (
      ((u = r.extra) != null &&
        u.parenthesized &&
        /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r.name)) ||
      (n === "left" &&
        ((r.name === "async" && !s.await) || r.name === "let") &&
        s.type === "ForOfStatement")
    )
      return !0;
    if (r.name === "let") {
      let c =
        (i = e.findAncestor((f) => f.type === "ForOfStatement")) == null
          ? void 0
          : i.left;
      if (c && re(c, (f) => f === r)) return !0;
    }
    if (
      n === "object" &&
      r.name === "let" &&
      s.type === "MemberExpression" &&
      s.computed &&
      !s.optional
    ) {
      let c = e.findAncestor(
          (l) =>
            l.type === "ExpressionStatement" ||
            l.type === "ForStatement" ||
            l.type === "ForInStatement",
        ),
        f = c
          ? c.type === "ExpressionStatement"
            ? c.expression
            : c.type === "ForStatement"
              ? c.init
              : c.left
          : void 0;
      if (f && re(f, (l) => l === r)) return !0;
    }
    return !1;
  }
  if (
    r.type === "ObjectExpression" ||
    r.type === "FunctionExpression" ||
    r.type === "ClassExpression" ||
    r.type === "DoExpression"
  ) {
    let c =
      (a = e.findAncestor((f) => f.type === "ExpressionStatement")) == null
        ? void 0
        : a.expression;
    if (c && re(c, (f) => f === r)) return !0;
  }
  if (r.type === "ObjectExpression") {
    let c =
      (o = e.findAncestor((f) => f.type === "ArrowFunctionExpression")) == null
        ? void 0
        : o.body;
    if (
      c &&
      c.type !== "SequenceExpression" &&
      c.type !== "AssignmentExpression" &&
      re(c, (f) => f === r)
    )
      return !0;
  }
  switch (s.type) {
    case "ParenthesizedExpression":
      return !1;
    case "ClassDeclaration":
    case "ClassExpression":
      if (
        n === "superClass" &&
        (r.type === "ArrowFunctionExpression" ||
          r.type === "AssignmentExpression" ||
          r.type === "AwaitExpression" ||
          r.type === "BinaryExpression" ||
          r.type === "ConditionalExpression" ||
          r.type === "LogicalExpression" ||
          r.type === "NewExpression" ||
          r.type === "ObjectExpression" ||
          r.type === "SequenceExpression" ||
          r.type === "TaggedTemplateExpression" ||
          r.type === "UnaryExpression" ||
          r.type === "UpdateExpression" ||
          r.type === "YieldExpression" ||
          r.type === "TSNonNullExpression" ||
          (r.type === "ClassExpression" && b(r.decorators)))
      )
        return !0;
      break;
    case "ExportDefaultDeclaration":
      return au(e, t) || r.type === "SequenceExpression";
    case "Decorator":
      if (n === "expression") {
        if (J(r) && r.computed) return !0;
        let c = !1,
          f = !1,
          l = r;
        for (; l; )
          switch (l.type) {
            case "MemberExpression":
              (f = !0), (l = l.object);
              break;
            case "CallExpression":
              if (f || c) return t.parser !== "typescript";
              (c = !0), (l = l.callee);
              break;
            case "Identifier":
              return !1;
            case "TaggedTemplateExpression":
              return t.parser !== "typescript";
            default:
              return !0;
          }
        return !0;
      }
      break;
    case "TypeAnnotation":
      if (
        e.match(
          void 0,
          void 0,
          (c, f) => f === "returnType" && c.type === "ArrowFunctionExpression",
        ) &&
        ro(r)
      )
        return !0;
      break;
  }
  switch (r.type) {
    case "UpdateExpression":
      if (s.type === "UnaryExpression")
        return (
          r.prefix &&
          ((r.operator === "++" && s.operator === "+") ||
            (r.operator === "--" && s.operator === "-"))
        );
    case "UnaryExpression":
      switch (s.type) {
        case "UnaryExpression":
          return (
            r.operator === s.operator &&
            (r.operator === "+" || r.operator === "-")
          );
        case "BindExpression":
          return !0;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return n === "object";
        case "TaggedTemplateExpression":
          return !0;
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "BinaryExpression":
          return n === "left" && s.operator === "**";
        case "TSNonNullExpression":
          return !0;
        default:
          return !1;
      }
    case "BinaryExpression":
      if (s.type === "UpdateExpression" || (r.operator === "in" && to(e)))
        return !0;
      if (r.operator === "|>" && (p = r.extra) != null && p.parenthesized) {
        let c = e.grandparent;
        if (c.type === "BinaryExpression" && c.operator === "|>") return !0;
      }
    case "TSTypeAssertion":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "LogicalExpression":
      switch (s.type) {
        case "TSAsExpression":
        case "TSSatisfiesExpression":
          return !Le(r);
        case "ConditionalExpression":
          return Le(r);
        case "CallExpression":
        case "NewExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "ClassExpression":
        case "ClassDeclaration":
          return n === "superClass";
        case "TSTypeAssertion":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "JSXSpreadAttribute":
        case "SpreadElement":
        case "BindExpression":
        case "AwaitExpression":
        case "TSNonNullExpression":
        case "UpdateExpression":
          return !0;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return n === "object";
        case "AssignmentExpression":
        case "AssignmentPattern":
          return n === "left" && (r.type === "TSTypeAssertion" || Le(r));
        case "LogicalExpression":
          if (r.type === "LogicalExpression") return s.operator !== r.operator;
        case "BinaryExpression": {
          let { operator: c, type: f } = r;
          if (!c && f !== "TSTypeAssertion") return !0;
          let l = Yt(c),
            h = s.operator,
            g = Yt(h);
          return g > l || (n === "right" && g === l) || (g === l && !Vt(h, c))
            ? !0
            : g < l && c === "%"
              ? h === "+" || h === "-"
              : !!nu(h);
        }
        default:
          return !1;
      }
    case "SequenceExpression":
      switch (s.type) {
        case "ReturnStatement":
          return !1;
        case "ForStatement":
          return !1;
        case "ExpressionStatement":
          return n !== "expression";
        case "ArrowFunctionExpression":
          return n !== "body";
        default:
          return !0;
      }
    case "YieldExpression":
      if (s.type === "AwaitExpression") return !0;
    case "AwaitExpression":
      switch (s.type) {
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "LogicalExpression":
        case "SpreadElement":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSNonNullExpression":
        case "BindExpression":
          return !0;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return n === "object";
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "ConditionalExpression":
          return n === "test";
        case "BinaryExpression":
          return !(!r.argument && s.operator === "|>");
        default:
          return !1;
      }
    case "TSFunctionType":
      if (
        e.match(
          (c) => c.type === "TSFunctionType",
          (c, f) => f === "typeAnnotation" && c.type === "TSTypeAnnotation",
          (c, f) => f === "returnType" && c.type === "ArrowFunctionExpression",
        )
      )
        return !0;
    case "TSConditionalType":
    case "TSConstructorType":
      if (n === "extendsType" && s.type === "TSConditionalType") {
        if (r.type === "TSConditionalType") return !0;
        let { typeAnnotation: c } = r.returnType || r.typeAnnotation;
        if (
          (c.type === "TSTypePredicate" &&
            c.typeAnnotation &&
            (c = c.typeAnnotation.typeAnnotation),
          c.type === "TSInferType" && c.typeParameter.constraint)
        )
          return !0;
      }
      if (n === "checkType" && s.type === "TSConditionalType") return !0;
    case "TSUnionType":
    case "TSIntersectionType":
      if (
        (s.type === "TSUnionType" || s.type === "TSIntersectionType") &&
        s.types.length > 1 &&
        (!r.types || r.types.length > 1)
      )
        return !0;
    case "TSInferType":
      if (r.type === "TSInferType" && s.type === "TSRestType") return !1;
    case "TSTypeOperator":
      return (
        s.type === "TSArrayType" ||
        s.type === "TSOptionalType" ||
        s.type === "TSRestType" ||
        (n === "objectType" && s.type === "TSIndexedAccessType") ||
        s.type === "TSTypeOperator" ||
        (s.type === "TSTypeAnnotation" &&
          e.grandparent.type.startsWith("TSJSDoc"))
      );
    case "TSTypeQuery":
      return (
        (n === "objectType" && s.type === "TSIndexedAccessType") ||
        (n === "elementType" && s.type === "TSArrayType")
      );
    case "TypeofTypeAnnotation":
      return (
        (n === "objectType" &&
          (s.type === "IndexedAccessType" ||
            s.type === "OptionalIndexedAccessType")) ||
        (n === "elementType" && s.type === "ArrayTypeAnnotation")
      );
    case "ArrayTypeAnnotation":
      return s.type === "NullableTypeAnnotation";
    case "IntersectionTypeAnnotation":
    case "UnionTypeAnnotation":
      return (
        s.type === "ArrayTypeAnnotation" ||
        s.type === "NullableTypeAnnotation" ||
        s.type === "IntersectionTypeAnnotation" ||
        s.type === "UnionTypeAnnotation" ||
        (n === "objectType" &&
          (s.type === "IndexedAccessType" ||
            s.type === "OptionalIndexedAccessType"))
      );
    case "InferTypeAnnotation":
    case "NullableTypeAnnotation":
      return (
        s.type === "ArrayTypeAnnotation" ||
        (n === "objectType" &&
          (s.type === "IndexedAccessType" ||
            s.type === "OptionalIndexedAccessType"))
      );
    case "FunctionTypeAnnotation": {
      if (
        e.match(
          void 0,
          (f, l) => l === "typeAnnotation" && f.type === "TypeAnnotation",
          (f, l) => l === "returnType" && f.type === "ArrowFunctionExpression",
        ) ||
        e.match(
          void 0,
          (f, l) => l === "typeAnnotation" && f.type === "TypePredicate",
          (f, l) => l === "typeAnnotation" && f.type === "TypeAnnotation",
          (f, l) => l === "returnType" && f.type === "ArrowFunctionExpression",
        )
      )
        return !0;
      let c = s.type === "NullableTypeAnnotation" ? e.grandparent : s;
      return (
        c.type === "UnionTypeAnnotation" ||
        c.type === "IntersectionTypeAnnotation" ||
        c.type === "ArrayTypeAnnotation" ||
        (n === "objectType" &&
          (c.type === "IndexedAccessType" ||
            c.type === "OptionalIndexedAccessType")) ||
        (n === "checkType" && s.type === "ConditionalTypeAnnotation") ||
        (n === "extendsType" &&
          s.type === "ConditionalTypeAnnotation" &&
          r.returnType.type === "InferTypeAnnotation" &&
          r.returnType.typeParameter.bound) ||
        c.type === "NullableTypeAnnotation" ||
        (s.type === "FunctionTypeParam" &&
          s.name === null &&
          X(r).some((f) => {
            var l;
            return (
              ((l = f.typeAnnotation) == null ? void 0 : l.type) ===
              "NullableTypeAnnotation"
            );
          }))
      );
    }
    case "ConditionalTypeAnnotation":
      if (
        (n === "extendsType" &&
          s.type === "ConditionalTypeAnnotation" &&
          r.type === "ConditionalTypeAnnotation") ||
        (n === "checkType" && s.type === "ConditionalTypeAnnotation")
      )
        return !0;
    case "OptionalIndexedAccessType":
      return n === "objectType" && s.type === "IndexedAccessType";
    case "StringLiteral":
    case "NumericLiteral":
    case "Literal":
      if (
        typeof r.value == "string" &&
        s.type === "ExpressionStatement" &&
        !s.directive
      ) {
        let c = e.grandparent;
        return c.type === "Program" || c.type === "BlockStatement";
      }
      return (
        n === "object" &&
        s.type === "MemberExpression" &&
        typeof r.value == "number"
      );
    case "AssignmentExpression": {
      let c = e.grandparent;
      return n === "body" && s.type === "ArrowFunctionExpression"
        ? !0
        : (n === "key" &&
              (s.type === "ClassProperty" || s.type === "PropertyDefinition") &&
              s.computed) ||
            ((n === "init" || n === "update") && s.type === "ForStatement")
          ? !1
          : s.type === "ExpressionStatement"
            ? r.left.type === "ObjectPattern"
            : !(
                (n === "key" && s.type === "TSPropertySignature") ||
                s.type === "AssignmentExpression" ||
                (s.type === "SequenceExpression" &&
                  c.type === "ForStatement" &&
                  (c.init === s || c.update === s)) ||
                (n === "value" &&
                  s.type === "Property" &&
                  c.type === "ObjectPattern" &&
                  c.properties.includes(s)) ||
                s.type === "NGChainedExpression"
              );
    }
    case "ConditionalExpression":
      switch (s.type) {
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "SpreadElement":
        case "BinaryExpression":
        case "LogicalExpression":
        case "NGPipeExpression":
        case "ExportDefaultDeclaration":
        case "AwaitExpression":
        case "JSXSpreadAttribute":
        case "TSTypeAssertion":
        case "TypeCastExpression":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSNonNullExpression":
          return !0;
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "ConditionalExpression":
          return n === "test";
        case "MemberExpression":
        case "OptionalMemberExpression":
          return n === "object";
        default:
          return !1;
      }
    case "FunctionExpression":
      switch (s.type) {
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "TaggedTemplateExpression":
          return !0;
        default:
          return !1;
      }
    case "ArrowFunctionExpression":
      switch (s.type) {
        case "BinaryExpression":
          return (
            s.operator !== "|>" ||
            ((m = r.extra) == null ? void 0 : m.parenthesized)
          );
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return n === "callee";
        case "MemberExpression":
        case "OptionalMemberExpression":
          return n === "object";
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSNonNullExpression":
        case "BindExpression":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "LogicalExpression":
        case "AwaitExpression":
        case "TSTypeAssertion":
          return !0;
        case "ConditionalExpression":
          return n === "test";
        default:
          return !1;
      }
    case "ClassExpression":
      switch (s.type) {
        case "NewExpression":
          return n === "callee";
        default:
          return !1;
      }
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "CallExpression":
    case "MemberExpression":
      if (so(e)) return !0;
    case "TaggedTemplateExpression":
    case "TSNonNullExpression":
      if (
        n === "callee" &&
        (s.type === "BindExpression" || s.type === "NewExpression")
      ) {
        let c = r;
        for (; c; )
          switch (c.type) {
            case "CallExpression":
            case "OptionalCallExpression":
              return !0;
            case "MemberExpression":
            case "OptionalMemberExpression":
            case "BindExpression":
              c = c.object;
              break;
            case "TaggedTemplateExpression":
              c = c.tag;
              break;
            case "TSNonNullExpression":
              c = c.expression;
              break;
            default:
              return !1;
          }
      }
      return !1;
    case "BindExpression":
      return (
        (n === "callee" &&
          (s.type === "BindExpression" || s.type === "NewExpression")) ||
        (n === "object" && J(s))
      );
    case "NGPipeExpression":
      return !(
        s.type === "NGRoot" ||
        s.type === "NGMicrosyntaxExpression" ||
        (s.type === "ObjectProperty" &&
          !((D = r.extra) != null && D.parenthesized)) ||
        G(s) ||
        (n === "arguments" && k(s)) ||
        (n === "right" && s.type === "NGPipeExpression") ||
        (n === "property" && s.type === "MemberExpression") ||
        s.type === "AssignmentExpression"
      );
    case "JSXFragment":
    case "JSXElement":
      return (
        n === "callee" ||
        (n === "left" && s.type === "BinaryExpression" && s.operator === "<") ||
        (!G(s) &&
          s.type !== "ArrowFunctionExpression" &&
          s.type !== "AssignmentExpression" &&
          s.type !== "AssignmentPattern" &&
          s.type !== "BinaryExpression" &&
          s.type !== "NewExpression" &&
          s.type !== "ConditionalExpression" &&
          s.type !== "ExpressionStatement" &&
          s.type !== "JsExpressionRoot" &&
          s.type !== "JSXAttribute" &&
          s.type !== "JSXElement" &&
          s.type !== "JSXExpressionContainer" &&
          s.type !== "JSXFragment" &&
          s.type !== "LogicalExpression" &&
          !k(s) &&
          !fe(s) &&
          s.type !== "ReturnStatement" &&
          s.type !== "ThrowStatement" &&
          s.type !== "TypeCastExpression" &&
          s.type !== "VariableDeclarator" &&
          s.type !== "YieldExpression")
      );
    case "TSInstantiationExpression":
      return n === "object" && J(s);
  }
  return !1;
}
var eo = j([
  "BlockStatement",
  "BreakStatement",
  "ClassBody",
  "ClassDeclaration",
  "ClassMethod",
  "ClassProperty",
  "PropertyDefinition",
  "ClassPrivateProperty",
  "ContinueStatement",
  "DebuggerStatement",
  "DeclareClass",
  "DeclareExportAllDeclaration",
  "DeclareExportDeclaration",
  "DeclareFunction",
  "DeclareInterface",
  "DeclareModule",
  "DeclareModuleExports",
  "DeclareVariable",
  "DeclareEnum",
  "DoWhileStatement",
  "EnumDeclaration",
  "ExportAllDeclaration",
  "ExportDefaultDeclaration",
  "ExportNamedDeclaration",
  "ExpressionStatement",
  "ForInStatement",
  "ForOfStatement",
  "ForStatement",
  "FunctionDeclaration",
  "IfStatement",
  "ImportDeclaration",
  "InterfaceDeclaration",
  "LabeledStatement",
  "MethodDefinition",
  "ReturnStatement",
  "SwitchStatement",
  "ThrowStatement",
  "TryStatement",
  "TSDeclareFunction",
  "TSEnumDeclaration",
  "TSImportEqualsDeclaration",
  "TSInterfaceDeclaration",
  "TSModuleDeclaration",
  "TSNamespaceExportDeclaration",
  "TypeAlias",
  "VariableDeclaration",
  "WhileStatement",
  "WithStatement",
]);
function to(e) {
  let t = 0,
    { node: r } = e;
  for (; r; ) {
    let n = e.getParentNode(t++);
    if ((n == null ? void 0 : n.type) === "ForStatement" && n.init === r)
      return !0;
    r = n;
  }
  return !1;
}
function ro(e) {
  return Xt(
    e,
    (t) =>
      t.type === "ObjectTypeAnnotation" &&
      Xt(t, (r) => r.type === "FunctionTypeAnnotation"),
  );
}
function no(e) {
  return ee(e);
}
function Qt(e) {
  let { parent: t, key: r } = e;
  switch (t.type) {
    case "NGPipeExpression":
      if (r === "arguments" && e.isLast) return e.callParent(Qt);
      break;
    case "ObjectProperty":
      if (r === "value")
        return e.callParent(() => e.key === "properties" && e.isLast);
      break;
    case "BinaryExpression":
    case "LogicalExpression":
      if (r === "right") return e.callParent(Qt);
      break;
    case "ConditionalExpression":
      if (r === "alternate") return e.callParent(Qt);
      break;
    case "UnaryExpression":
      if (t.prefix) return e.callParent(Qt);
      break;
  }
  return !1;
}
function au(e, t) {
  let { node: r, parent: n } = e;
  return r.type === "FunctionExpression" || r.type === "ClassExpression"
    ? n.type === "ExportDefaultDeclaration" || !Rn(e, t)
    : !Lt(r) || (n.type !== "ExportDefaultDeclaration" && Rn(e, t))
      ? !1
      : e.call(() => au(e, t), ...dr(r));
}
function so(e) {
  let { node: t, parent: r, grandparent: n, key: s } = e;
  return !!(
    ((t.type === "OptionalMemberExpression" ||
      t.type === "OptionalCallExpression") &&
      ((s === "object" && r.type === "MemberExpression") ||
        (s === "callee" &&
          (r.type === "CallExpression" || r.type === "NewExpression")) ||
        (r.type === "TSNonNullExpression" &&
          n.type === "MemberExpression" &&
          n.object === r))) ||
    (e.match(
      () => t.type === "CallExpression" || t.type === "MemberExpression",
      (u, i) => i === "expression" && u.type === "ChainExpression",
    ) &&
      (e.match(
        void 0,
        void 0,
        (u, i) =>
          (i === "callee" &&
            ((u.type === "CallExpression" && !u.optional) ||
              u.type === "NewExpression")) ||
          (i === "object" && u.type === "MemberExpression" && !u.optional),
      ) ||
        e.match(
          void 0,
          void 0,
          (u, i) => i === "expression" && u.type === "TSNonNullExpression",
          (u, i) => i === "object" && u.type === "MemberExpression",
        ))) ||
    e.match(
      () => t.type === "CallExpression" || t.type === "MemberExpression",
      (u, i) => i === "expression" && u.type === "TSNonNullExpression",
      (u, i) => i === "expression" && u.type === "ChainExpression",
      (u, i) => i === "object" && u.type === "MemberExpression",
    )
  );
}
var we = Rn;
var uo = (e, t, r, n) => {
    if (!(e && t == null))
      return t.replaceAll
        ? t.replaceAll(r, n)
        : r.global
          ? t.replace(r, n)
          : t.split(r).join(n);
  },
  H = uo;
function io(e, t) {
  let r = t - 1;
  (r = We(e, r, { backwards: !0 })),
    (r = Ye(e, r, { backwards: !0 })),
    (r = We(e, r, { backwards: !0 }));
  let n = Ye(e, r, { backwards: !0 });
  return r !== n;
}
var ou = io;
var ao = () => !0;
function Jn(e, t) {
  let r = e.node;
  return (r.printed = !0), t.printer.printComment(e, t);
}
function oo(e, t) {
  var m;
  let r = e.node,
    n = [Jn(e, t)],
    { printer: s, originalText: u, locStart: i, locEnd: a } = t;
  if ((m = s.isBlockComment) == null ? void 0 : m.call(s, r)) {
    let D = z(u, a(r)) ? (z(u, i(r), { backwards: !0 }) ? C : A) : " ";
    n.push(D);
  } else n.push(C);
  let p = Ye(u, We(u, a(r)));
  return p !== !1 && z(u, p) && n.push(C), n;
}
function po(e, t, r) {
  var p;
  let n = e.node,
    s = Jn(e, t),
    { printer: u, originalText: i, locStart: a } = t,
    o = (p = u.isBlockComment) == null ? void 0 : p.call(u, n);
  if (
    (r != null && r.hasLineSuffix && !(r != null && r.isBlock)) ||
    z(i, a(n), { backwards: !0 })
  ) {
    let m = ou(i, a(n));
    return { doc: hn([C, m ? C : "", s]), isBlock: o, hasLineSuffix: !0 };
  }
  return !o || (r != null && r.hasLineSuffix)
    ? { doc: [hn([" ", s]), Te], isBlock: o, hasLineSuffix: !0 }
    : { doc: [" ", s], isBlock: o, hasLineSuffix: !1 };
}
function M(e, t, r = {}) {
  let { node: n } = e;
  if (!b(n == null ? void 0 : n.comments)) return "";
  let { indent: s = !1, marker: u, filter: i = ao } = r,
    a = [];
  if (
    (e.each(({ node: p }) => {
      p.leading || p.trailing || p.marker !== u || !i(p) || a.push(Jn(e, t));
    }, "comments"),
    a.length === 0)
  )
    return "";
  let o = B(C, a);
  return s ? E([C, o]) : o;
}
function Nn(e, t) {
  let r = e.node;
  if (!r) return {};
  let n = t[Symbol.for("printedComments")];
  if ((r.comments || []).filter((o) => !n.has(o)).length === 0)
    return { leading: "", trailing: "" };
  let u = [],
    i = [],
    a;
  return (
    e.each(() => {
      let o = e.node;
      if (n != null && n.has(o)) return;
      let { leading: p, trailing: m } = o;
      p ? u.push(oo(e, t)) : m && ((a = po(e, t, a)), i.push(a.doc));
    }, "comments"),
    { leading: u, trailing: i }
  );
}
function pe(e, t, r) {
  let { leading: n, trailing: s } = Nn(e, r);
  return !n && !s ? t : Gt(t, (u) => [n, u, s]);
}
var Un = class extends Error {
    name = "UnexpectedNodeError";
    constructor(t, r, n = "type") {
      super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`),
        (this.node = t);
    }
  },
  Oe = Un;
var Br = "'",
  pu = '"';
function co(e, t) {
  let r = t === !0 || t === Br ? Br : pu,
    n = r === Br ? pu : Br,
    s = 0,
    u = 0;
  for (let i of e) i === r ? s++ : i === n && u++;
  return s > u ? n : r;
}
var br = co;
function Gn(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var ve,
  qn = class {
    constructor(t) {
      bs(this, ve, void 0);
      Ps(this, ve, new Set(t));
    }
    getLeadingWhitespaceCount(t) {
      let r = st(this, ve),
        n = 0;
      for (let s = 0; s < t.length && r.has(t.charAt(s)); s++) n++;
      return n;
    }
    getTrailingWhitespaceCount(t) {
      let r = st(this, ve),
        n = 0;
      for (let s = t.length - 1; s >= 0 && r.has(t.charAt(s)); s--) n++;
      return n;
    }
    getLeadingWhitespace(t) {
      let r = this.getLeadingWhitespaceCount(t);
      return t.slice(0, r);
    }
    getTrailingWhitespace(t) {
      let r = this.getTrailingWhitespaceCount(t);
      return t.slice(t.length - r);
    }
    hasLeadingWhitespace(t) {
      return st(this, ve).has(t.charAt(0));
    }
    hasTrailingWhitespace(t) {
      return st(this, ve).has(w(!1, t, -1));
    }
    trimStart(t) {
      let r = this.getLeadingWhitespaceCount(t);
      return t.slice(r);
    }
    trimEnd(t) {
      let r = this.getTrailingWhitespaceCount(t);
      return t.slice(0, t.length - r);
    }
    trim(t) {
      return this.trimEnd(this.trimStart(t));
    }
    split(t, r = !1) {
      let n = `[${Gn([...st(this, ve)].join(""))}]+`,
        s = new RegExp(r ? `(${n})` : n);
      return t.split(s);
    }
    hasWhitespaceCharacter(t) {
      let r = st(this, ve);
      return Array.prototype.some.call(t, (n) => r.has(n));
    }
    hasNonWhitespaceCharacter(t) {
      let r = st(this, ve);
      return Array.prototype.some.call(t, (n) => !r.has(n));
    }
    isWhitespaceOnly(t) {
      let r = st(this, ve);
      return Array.prototype.every.call(t, (n) => r.has(n));
    }
  };
ve = new WeakMap();
var cu = qn;
var Kn = {};
or(Kn, { endOfLine: () => Fo, ownLine: () => Eo, remaining: () => Co });
function lo(e, t) {
  let r = null,
    n = t;
  for (; n !== r; )
    (r = n), (n = We(e, n)), (n = bt(e, n)), (n = Pt(e, n)), (n = Ye(e, n));
  return n;
}
var Xe = lo;
function mo(e, t) {
  let r = Xe(e, t);
  return r === !1 ? "" : e.charAt(r);
}
var $e = mo;
function yo(e, t, r) {
  for (let n = t; n < r; ++n)
    if (
      e.charAt(n) ===
      `
`
    )
      return !0;
  return !1;
}
var rt = yo;
function Do(e) {
  let t = e.type || e.kind || "(unknown type)",
    r = String(
      e.name ||
        (e.id && (typeof e.id == "object" ? e.id.name : e.id)) ||
        (e.key && (typeof e.key == "object" ? e.key.name : e.key)) ||
        (e.value && (typeof e.value == "object" ? "" : String(e.value))) ||
        e.operator ||
        "",
    );
  return (
    r.length > 20 && (r = r.slice(0, 19) + "\u2026"), t + (r ? " " + r : "")
  );
}
function Wn(e, t) {
  (e.comments ?? (e.comments = [])).push(t),
    (t.printed = !1),
    (t.nodeDescription = Do(e));
}
function ne(e, t) {
  (t.leading = !0), (t.trailing = !1), Wn(e, t);
}
function _e(e, t, r) {
  (t.leading = !1), (t.trailing = !1), r && (t.marker = r), Wn(e, t);
}
function te(e, t) {
  (t.leading = !1), (t.trailing = !0), Wn(e, t);
}
function fo(e) {
  return ae(e) && e.value[0] === "*" && /@(?:type|satisfies)\b/.test(e.value);
}
var lu = fo;
function Eo(e) {
  return [Cu, fu, To, Xn, $n, mu, yu, Oo, Lo, Hn, Fu, vo, Du, Eu, Vn].some(
    (t) => t(e),
  );
}
function Fo(e) {
  return [Ao, fu, xo, Fu, Xn, $n, mu, yu, Eu, Io, wo, Hn, Mo, Vn, No].some(
    (t) => t(e),
  );
}
function Co(e) {
  return [Cu, Xn, $n, go, ko, Du, Hn, Po, bo, Jo, Vn, Ro].some((t) => t(e));
}
function At(e, t) {
  let r = (e.body || e.properties).find(
    ({ type: n }) => n !== "EmptyStatement",
  );
  r ? ne(r, t) : _e(e, t);
}
function Yn(e, t) {
  e.type === "BlockStatement" ? At(e, t) : ne(e, t);
}
function Ao({ comment: e, followingNode: t }) {
  return t && lu(e) ? (ne(t, e), !0) : !1;
}
function Xn({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
  text: s,
}) {
  if ((r == null ? void 0 : r.type) !== "IfStatement" || !n) return !1;
  if ($e(s, O(e)) === ")") return te(t, e), !0;
  if (t === r.consequent && n === r.alternate) {
    if (t.type === "BlockStatement") te(t, e);
    else {
      let i = e.type === "SingleLine" || e.loc.start.line === e.loc.end.line,
        a = e.loc.start.line === t.loc.start.line;
      i && a
        ? _e(t, e, t.type === "ExpressionStatement" ? zt : void 0)
        : _e(r, e);
    }
    return !0;
  }
  return n.type === "BlockStatement"
    ? (At(n, e), !0)
    : n.type === "IfStatement"
      ? (Yn(n.consequent, e), !0)
      : r.consequent === n
        ? (ne(n, e), !0)
        : !1;
}
function $n({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
  text: s,
}) {
  return (r == null ? void 0 : r.type) !== "WhileStatement" || !n
    ? !1
    : $e(s, O(e)) === ")"
      ? (te(t, e), !0)
      : n.type === "BlockStatement"
        ? (At(n, e), !0)
        : r.body === n
          ? (ne(n, e), !0)
          : !1;
}
function mu({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
}) {
  return ((r == null ? void 0 : r.type) !== "TryStatement" &&
    (r == null ? void 0 : r.type) !== "CatchClause") ||
    !n
    ? !1
    : r.type === "CatchClause" && t
      ? (te(t, e), !0)
      : n.type === "BlockStatement"
        ? (At(n, e), !0)
        : n.type === "TryStatement"
          ? (Yn(n.finalizer, e), !0)
          : n.type === "CatchClause"
            ? (Yn(n.body, e), !0)
            : !1;
}
function To({ comment: e, enclosingNode: t, followingNode: r }) {
  return J(t) && (r == null ? void 0 : r.type) === "Identifier"
    ? (ne(t, e), !0)
    : !1;
}
function xo({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
  text: s,
}) {
  let u = t && !rt(s, O(t), U(e));
  return (!t || !u) &&
    ((r == null ? void 0 : r.type) === "ConditionalExpression" ||
      (r == null ? void 0 : r.type) === "TSConditionalType") &&
    n
    ? (ne(n, e), !0)
    : !1;
}
function go({ comment: e, precedingNode: t, enclosingNode: r }) {
  return fe(r) &&
    r.shorthand &&
    r.key === t &&
    r.value.type === "AssignmentPattern"
    ? (te(r.value.left, e), !0)
    : !1;
}
var ho = new Set([
  "ClassDeclaration",
  "ClassExpression",
  "DeclareClass",
  "DeclareInterface",
  "InterfaceDeclaration",
  "TSInterfaceDeclaration",
]);
function yu({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
}) {
  if (ho.has(r == null ? void 0 : r.type)) {
    if (b(r.decorators) && (n == null ? void 0 : n.type) !== "Decorator")
      return te(w(!1, r.decorators, -1), e), !0;
    if (r.body && n === r.body) return At(r.body, e), !0;
    if (n) {
      if (
        r.superClass &&
        n === r.superClass &&
        t &&
        (t === r.id || t === r.typeParameters)
      )
        return te(t, e), !0;
      for (let s of ["implements", "extends", "mixins"])
        if (r[s] && n === r[s][0])
          return (
            t && (t === r.id || t === r.typeParameters || t === r.superClass)
              ? te(t, e)
              : _e(r, e, s),
            !0
          );
    }
  }
  return !1;
}
var So = new Set([
  "ClassMethod",
  "ClassProperty",
  "PropertyDefinition",
  "TSAbstractPropertyDefinition",
  "TSAbstractMethodDefinition",
  "TSDeclareMethod",
  "MethodDefinition",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractAccessorProperty",
]);
function Du({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
  return r &&
    t &&
    $e(n, O(e)) === "(" &&
    (r.type === "Property" ||
      r.type === "TSDeclareMethod" ||
      r.type === "TSAbstractMethodDefinition") &&
    t.type === "Identifier" &&
    r.key === t &&
    $e(n, O(t)) !== ":"
    ? (te(t, e), !0)
    : (t == null ? void 0 : t.type) === "Decorator" &&
        So.has(r == null ? void 0 : r.type)
      ? (te(t, e), !0)
      : !1;
}
var Bo = new Set([
  "FunctionDeclaration",
  "FunctionExpression",
  "ClassMethod",
  "MethodDefinition",
  "ObjectMethod",
]);
function bo({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
  return $e(n, O(e)) !== "("
    ? !1
    : t && Bo.has(r == null ? void 0 : r.type)
      ? (te(t, e), !0)
      : !1;
}
function Po({ comment: e, enclosingNode: t, text: r }) {
  if ((t == null ? void 0 : t.type) !== "ArrowFunctionExpression") return !1;
  let n = Xe(r, O(e));
  return n !== !1 && r.slice(n, n + 2) === "=>" ? (_e(t, e), !0) : !1;
}
function ko({ comment: e, enclosingNode: t, text: r }) {
  return $e(r, O(e)) !== ")"
    ? !1
    : t && ((du(t) && X(t).length === 0) || (it(t) && Ce(t).length === 0))
      ? (_e(t, e), !0)
      : ((t == null ? void 0 : t.type) === "MethodDefinition" ||
            (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") &&
          X(t.value).length === 0
        ? (_e(t.value, e), !0)
        : !1;
}
function fu({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
  text: s,
}) {
  if (
    (t == null ? void 0 : t.type) === "FunctionTypeParam" &&
    (r == null ? void 0 : r.type) === "FunctionTypeAnnotation" &&
    (n == null ? void 0 : n.type) !== "FunctionTypeParam"
  )
    return te(t, e), !0;
  if (
    ((t == null ? void 0 : t.type) === "Identifier" ||
      (t == null ? void 0 : t.type) === "AssignmentPattern" ||
      (t == null ? void 0 : t.type) === "ObjectPattern" ||
      (t == null ? void 0 : t.type) === "ArrayPattern" ||
      (t == null ? void 0 : t.type) === "RestElement") &&
    r &&
    du(r) &&
    $e(s, O(e)) === ")"
  )
    return te(t, e), !0;
  if (
    (r == null ? void 0 : r.type) === "FunctionDeclaration" &&
    (n == null ? void 0 : n.type) === "BlockStatement"
  ) {
    let u = (() => {
      let i = X(r);
      if (i.length > 0) return Xe(s, O(w(!1, i, -1)));
      let a = Xe(s, O(r.id));
      return a !== !1 && Xe(s, a + 1);
    })();
    if (U(e) > u) return At(n, e), !0;
  }
  return !1;
}
function Eu({ comment: e, enclosingNode: t }) {
  return (t == null ? void 0 : t.type) === "LabeledStatement"
    ? (ne(t, e), !0)
    : !1;
}
function Vn({ comment: e, enclosingNode: t }) {
  return ((t == null ? void 0 : t.type) === "ContinueStatement" ||
    (t == null ? void 0 : t.type) === "BreakStatement") &&
    !t.label
    ? (te(t, e), !0)
    : !1;
}
function Io({ comment: e, precedingNode: t, enclosingNode: r }) {
  return k(r) && t && r.callee === t && r.arguments.length > 0
    ? (ne(r.arguments[0], e), !0)
    : !1;
}
function Lo({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
}) {
  return (r == null ? void 0 : r.type) === "UnionTypeAnnotation" ||
    (r == null ? void 0 : r.type) === "TSUnionType"
    ? (Ht(e) && ((n.prettierIgnore = !0), (e.unignore = !0)),
      t ? (te(t, e), !0) : !1)
    : (((n == null ? void 0 : n.type) === "UnionTypeAnnotation" ||
        (n == null ? void 0 : n.type) === "TSUnionType") &&
        Ht(e) &&
        ((n.types[0].prettierIgnore = !0), (e.unignore = !0)),
      !1);
}
function wo({ comment: e, enclosingNode: t }) {
  return fe(t) ? (ne(t, e), !0) : !1;
}
function Hn({
  comment: e,
  enclosingNode: t,
  followingNode: r,
  ast: n,
  isLastComment: s,
}) {
  var u;
  return ((u = n == null ? void 0 : n.body) == null ? void 0 : u.length) === 0
    ? (s ? _e(n, e) : ne(n, e), !0)
    : (t == null ? void 0 : t.type) === "Program" &&
        t.body.length === 0 &&
        !b(t.directives)
      ? (s ? _e(t, e) : ne(t, e), !0)
      : (r == null ? void 0 : r.type) === "Program" &&
          r.body.length === 0 &&
          (t == null ? void 0 : t.type) === "ModuleExpression"
        ? (_e(r, e), !0)
        : !1;
}
function Oo({ comment: e, enclosingNode: t }) {
  return (t == null ? void 0 : t.type) === "ForInStatement" ||
    (t == null ? void 0 : t.type) === "ForOfStatement"
    ? (ne(t, e), !0)
    : !1;
}
function Fu({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
  if (
    (r == null ? void 0 : r.type) === "ImportSpecifier" ||
    (r == null ? void 0 : r.type) === "ExportSpecifier"
  )
    return ne(r, e), !0;
  let s =
      (t == null ? void 0 : t.type) === "ImportSpecifier" &&
      (r == null ? void 0 : r.type) === "ImportDeclaration",
    u =
      (t == null ? void 0 : t.type) === "ExportSpecifier" &&
      (r == null ? void 0 : r.type) === "ExportNamedDeclaration";
  return (s || u) && z(n, O(e)) ? (te(t, e), !0) : !1;
}
function vo({ comment: e, enclosingNode: t }) {
  return (t == null ? void 0 : t.type) === "AssignmentPattern"
    ? (ne(t, e), !0)
    : !1;
}
var _o = new Set([
    "VariableDeclarator",
    "AssignmentExpression",
    "TypeAlias",
    "TSTypeAliasDeclaration",
  ]),
  jo = new Set([
    "ObjectExpression",
    "RecordExpression",
    "ArrayExpression",
    "TupleExpression",
    "TemplateLiteral",
    "TaggedTemplateExpression",
    "ObjectTypeAnnotation",
    "TSTypeLiteral",
  ]);
function Mo({ comment: e, enclosingNode: t, followingNode: r }) {
  return _o.has(t == null ? void 0 : t.type) && r && (jo.has(r.type) || ae(e))
    ? (ne(r, e), !0)
    : !1;
}
function Ro({ comment: e, enclosingNode: t, followingNode: r, text: n }) {
  return !r &&
    ((t == null ? void 0 : t.type) === "TSMethodSignature" ||
      (t == null ? void 0 : t.type) === "TSDeclareFunction" ||
      (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") &&
    $e(n, O(e)) === ";"
    ? (te(t, e), !0)
    : !1;
}
function Cu({ comment: e, enclosingNode: t, followingNode: r }) {
  if (
    Ht(e) &&
    (t == null ? void 0 : t.type) === "TSMappedType" &&
    (r == null ? void 0 : r.type) === "TSTypeParameter" &&
    r.constraint
  )
    return (t.prettierIgnore = !0), (e.unignore = !0), !0;
}
function Jo({
  comment: e,
  precedingNode: t,
  enclosingNode: r,
  followingNode: n,
}) {
  return (r == null ? void 0 : r.type) !== "TSMappedType"
    ? !1
    : (n == null ? void 0 : n.type) === "TSTypeParameter" && n.name
      ? (ne(n.name, e), !0)
      : (t == null ? void 0 : t.type) === "TSTypeParameter" && t.constraint
        ? (te(t.constraint, e), !0)
        : !1;
}
function No({ comment: e, enclosingNode: t, followingNode: r }) {
  return !t || t.type !== "SwitchCase" || t.test || !r || r !== t.consequent[0]
    ? !1
    : (r.type === "BlockStatement" && $t(e) ? At(r, e) : _e(t, e), !0);
}
var du = j([
  "ArrowFunctionExpression",
  "FunctionExpression",
  "FunctionDeclaration",
  "ObjectMethod",
  "ClassMethod",
  "TSDeclareFunction",
  "TSCallSignatureDeclaration",
  "TSConstructSignatureDeclaration",
  "TSMethodSignature",
  "TSConstructorType",
  "TSFunctionType",
  "TSDeclareMethod",
]);
function Uo(e) {
  let t = `*${e.value}*`.split(`
`);
  return t.length > 1 && t.every((r) => r.trimStart()[0] === "*");
}
var Au = Uo;
function Tu(e, t) {
  let r = e.node;
  if ($t(r)) return t.originalText.slice(U(r), O(r)).trimEnd();
  if (ae(r)) return Au(r) ? Go(r) : ["/*", xe(r.value), "*/"];
  throw new Error("Not a comment: " + JSON.stringify(r));
}
function Go(e) {
  let t = e.value.split(`
`);
  return [
    "/*",
    B(
      C,
      t.map((r, n) =>
        n === 0
          ? r.trimEnd()
          : " " + (n < t.length - 1 ? r.trim() : r.trimStart()),
      ),
    ),
    "*/",
  ];
}
var qo = new Set([
  "EmptyStatement",
  "TemplateElement",
  "Import",
  "TSEmptyBodyFunctionExpression",
  "ChainExpression",
]);
function Wo(e) {
  return !qo.has(e.type);
}
function Yo(e, t) {
  var r;
  if (
    (t.parser === "typescript" ||
      t.parser === "flow" ||
      t.parser === "acorn" ||
      t.parser === "espree" ||
      t.parser === "meriyah" ||
      t.parser === "__babel_estree") &&
    e.type === "MethodDefinition" &&
    ((r = e.value) == null ? void 0 : r.type) === "FunctionExpression" &&
    X(e.value).length === 0 &&
    !e.value.returnType &&
    !b(e.value.typeParameters) &&
    e.value.body
  )
    return [...(e.decorators || []), e.key, e.value.body];
}
function zn(e) {
  let { node: t, parent: r } = e;
  return (
    (Y(t) ||
      (r &&
        (r.type === "JSXSpreadAttribute" ||
          r.type === "JSXSpreadChild" ||
          r.type === "UnionTypeAnnotation" ||
          r.type === "TSUnionType" ||
          ((r.type === "ClassDeclaration" || r.type === "ClassExpression") &&
            r.superClass === t)))) &&
    (!dt(t) || r.type === "UnionTypeAnnotation" || r.type === "TSUnionType")
  );
}
function Xo(e, { parser: t }) {
  if (t === "flow" || t === "babel-flow")
    return (e = H(!1, e, /[\s(]/g, "")), e === "" || e === "/*" || e === "/*::";
}
var Pr = new cu(` 
\r	`),
  Qn = (e) => e === "" || e === A || e === C || e === F;
function $o(e, t, r) {
  var v, _, R;
  let { node: n } = e;
  if (n.type === "JSXElement" && ap(n))
    return [r("openingElement"), r("closingElement")];
  let s = n.type === "JSXElement" ? r("openingElement") : r("openingFragment"),
    u = n.type === "JSXElement" ? r("closingElement") : r("closingFragment");
  if (
    n.children.length === 1 &&
    n.children[0].type === "JSXExpressionContainer" &&
    (n.children[0].expression.type === "TemplateLiteral" ||
      n.children[0].expression.type === "TaggedTemplateExpression")
  )
    return [s, ...e.map(r, "children"), u];
  n.children = n.children.map((T) =>
    op(T) ? { type: "JSXText", value: " ", raw: " " } : T,
  );
  let i = n.children.some(Y),
    a =
      n.children.filter((T) => T.type === "JSXExpressionContainer").length > 1,
    o = n.type === "JSXElement" && n.openingElement.attributes.length > 1,
    p = K(s) || i || o || a,
    m = e.parent.rootMarker === "mdx",
    D = t.singleQuote ? "{' '}" : '{" "}',
    c = m ? " " : P([D, F], " "),
    f =
      ((_ = (v = n.openingElement) == null ? void 0 : v.name) == null
        ? void 0
        : _.name) === "fbt",
    l = Vo(e, t, r, c, f),
    h = n.children.some((T) => Zt(T));
  for (let T = l.length - 2; T >= 0; T--) {
    let N = l[T] === "" && l[T + 1] === "",
      Se = l[T] === C && l[T + 1] === "" && l[T + 2] === C,
      V = (l[T] === F || l[T] === C) && l[T + 1] === "" && l[T + 2] === c,
      Be = l[T] === c && l[T + 1] === "" && (l[T + 2] === F || l[T + 2] === C),
      Ee = l[T] === c && l[T + 1] === "" && l[T + 2] === c,
      Cn =
        (l[T] === F && l[T + 1] === "" && l[T + 2] === C) ||
        (l[T] === C && l[T + 1] === "" && l[T + 2] === F);
    (Se && h) || N || V || Ee || Cn ? l.splice(T, 2) : Be && l.splice(T + 1, 2);
  }
  for (; l.length > 0 && Qn(w(!1, l, -1)); ) l.pop();
  for (; l.length > 1 && Qn(l[0]) && Qn(l[1]); ) l.shift(), l.shift();
  let g = [];
  for (let [T, N] of l.entries()) {
    if (N === c) {
      if (T === 1 && l[T - 1] === "") {
        if (l.length === 2) {
          g.push(D);
          continue;
        }
        g.push([D, C]);
        continue;
      } else if (T === l.length - 1) {
        g.push(D);
        continue;
      } else if (l[T - 1] === "" && l[T - 2] === C) {
        g.push(D);
        continue;
      }
    }
    g.push(N), K(N) && (p = !0);
  }
  let S = h ? St(g) : y(g, { shouldBreak: !0 });
  if (
    (((R = t.cursorNode) == null ? void 0 : R.type) === "JSXText" &&
      n.children.includes(t.cursorNode) &&
      (S = [Bn, S, Bn]),
    m)
  )
    return S;
  let I = y([s, E([C, S]), C, u]);
  return p ? I : qe([y([s, ...l, u]), I]);
}
function Vo(e, t, r, n, s) {
  let u = [];
  return (
    e.each(({ node: i, next: a }) => {
      if (i.type === "JSXText") {
        let o = oe(i);
        if (Zt(i)) {
          let p = Pr.split(o, !0);
          p[0] === "" &&
            (u.push(""),
            p.shift(),
            /\n/.test(p[0]) ? u.push(gu(s, p[1], i, a)) : u.push(n),
            p.shift());
          let m;
          if ((w(!1, p, -1) === "" && (p.pop(), (m = p.pop())), p.length === 0))
            return;
          for (let [D, c] of p.entries()) D % 2 === 1 ? u.push(A) : u.push(c);
          m !== void 0
            ? /\n/.test(m)
              ? u.push(gu(s, w(!1, u, -1), i, a))
              : u.push(n)
            : u.push(xu(s, w(!1, u, -1), i, a));
        } else
          /\n/.test(o)
            ? o.match(/\n/g).length > 1 && u.push("", C)
            : u.push("", n);
      } else {
        let o = r();
        if ((u.push(o), a && Zt(a))) {
          let m = Pr.trim(oe(a)),
            [D] = Pr.split(m);
          u.push(xu(s, D, i, a));
        } else u.push(C);
      }
    }, "children"),
    u
  );
}
function xu(e, t, r, n) {
  return e
    ? ""
    : (r.type === "JSXElement" && !r.closingElement) ||
        ((n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement)
      ? t.length === 1
        ? F
        : C
      : F;
}
function gu(e, t, r, n) {
  return e
    ? C
    : t.length === 1
      ? (r.type === "JSXElement" && !r.closingElement) ||
        ((n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement)
        ? C
        : F
      : C;
}
var Ho = new Set([
  "ArrayExpression",
  "TupleExpression",
  "JSXAttribute",
  "JSXElement",
  "JSXExpressionContainer",
  "JSXFragment",
  "ExpressionStatement",
  "CallExpression",
  "OptionalCallExpression",
  "ConditionalExpression",
  "JsExpressionRoot",
]);
function Ko(e, t, r) {
  let { parent: n } = e;
  if (Ho.has(n.type)) return t;
  let s = e.match(
      void 0,
      (i) => i.type === "ArrowFunctionExpression",
      k,
      (i) => i.type === "JSXExpressionContainer",
    ),
    u = we(e, r);
  return y([u ? "" : P("("), E([F, t]), F, u ? "" : P(")")], {
    shouldBreak: s,
  });
}
function zo(e, t, r) {
  let { node: n } = e,
    s = [];
  if ((s.push(r("name")), n.value)) {
    let u;
    if (Q(n.value)) {
      let i = oe(n.value),
        a = H(!1, H(!1, i.slice(1, -1), "&apos;", "'"), "&quot;", '"'),
        o = br(a, t.jsxSingleQuote);
      (a = o === '"' ? H(!1, a, '"', "&quot;") : H(!1, a, "'", "&apos;")),
        (u = e.call(() => pe(e, xe(o + a + o), t), "value"));
    } else u = r("value");
    s.push("=", u);
  }
  return s;
}
function Qo(e, t, r) {
  let { node: n } = e,
    s = (u, i) =>
      u.type === "JSXEmptyExpression" ||
      (!d(u) &&
        (G(u) ||
          ee(u) ||
          u.type === "ArrowFunctionExpression" ||
          (u.type === "AwaitExpression" &&
            (s(u.argument, u) || u.argument.type === "JSXElement")) ||
          k(u) ||
          (u.type === "ChainExpression" && k(u.expression)) ||
          u.type === "FunctionExpression" ||
          u.type === "TemplateLiteral" ||
          u.type === "TaggedTemplateExpression" ||
          u.type === "DoExpression" ||
          (Y(i) && (u.type === "ConditionalExpression" || ce(u)))));
  return s(n.expression, e.parent)
    ? y(["{", r("expression"), Ae, "}"])
    : y(["{", E([F, r("expression")]), F, Ae, "}"]);
}
function Zo(e, t, r) {
  var a, o;
  let { node: n } = e,
    s = d(n.name) || d(n.typeParameters);
  if (n.selfClosing && n.attributes.length === 0 && !s)
    return ["<", r("name"), r("typeParameters"), " />"];
  if (
    ((a = n.attributes) == null ? void 0 : a.length) === 1 &&
    n.attributes[0].value &&
    Q(n.attributes[0].value) &&
    !n.attributes[0].value.value.includes(`
`) &&
    !s &&
    !d(n.attributes[0])
  )
    return y([
      "<",
      r("name"),
      r("typeParameters"),
      " ",
      ...e.map(r, "attributes"),
      n.selfClosing ? " />" : ">",
    ]);
  let u =
      (o = n.attributes) == null
        ? void 0
        : o.some(
            (p) =>
              p.value &&
              Q(p.value) &&
              p.value.value.includes(`
`),
          ),
    i = t.singleAttributePerLine && n.attributes.length > 1 ? C : A;
  return y(
    [
      "<",
      r("name"),
      r("typeParameters"),
      E(e.map(() => [i, r()], "attributes")),
      ...ep(n, t, s),
    ],
    { shouldBreak: u },
  );
}
function ep(e, t, r) {
  return e.selfClosing ? [A, "/>"] : tp(e, t, r) ? [">"] : [F, ">"];
}
function tp(e, t, r) {
  let n = e.attributes.length > 0 && d(w(!1, e.attributes, -1), x.Trailing);
  return (
    (e.attributes.length === 0 && !r) ||
    ((t.bracketSameLine || t.jsxBracketSameLine) &&
      (!r || e.attributes.length > 0) &&
      !n)
  );
}
function rp(e, t, r) {
  let { node: n } = e,
    s = [];
  s.push("</");
  let u = r("name");
  return (
    d(n.name, x.Leading | x.Line)
      ? s.push(E([C, u]), C)
      : d(n.name, x.Leading | x.Block)
        ? s.push(" ", u)
        : s.push(u),
    s.push(">"),
    s
  );
}
function np(e, t) {
  let { node: r } = e,
    n = d(r),
    s = d(r, x.Line),
    u = r.type === "JSXOpeningFragment";
  return [
    u ? "<" : "</",
    E([s ? C : n && !u ? " " : "", M(e, t)]),
    s ? C : "",
    ">",
  ];
}
function sp(e, t, r) {
  let n = pe(e, $o(e, t, r), t);
  return Ko(e, n, t);
}
function up(e, t) {
  let { node: r } = e,
    n = d(r, x.Line);
  return [M(e, t, { indent: n }), n ? C : ""];
}
function ip(e, t, r) {
  let { node: n } = e;
  return [
    "{",
    e.call(
      ({ node: s }) => {
        let u = ["...", r()];
        return !d(s) || !zn(e) ? u : [E([F, pe(e, u, t)]), F];
      },
      n.type === "JSXSpreadAttribute" ? "argument" : "expression",
    ),
    "}",
  ];
}
function hu(e, t, r) {
  let { node: n } = e;
  if (n.type.startsWith("JSX"))
    switch (n.type) {
      case "JSXAttribute":
        return zo(e, t, r);
      case "JSXIdentifier":
        return n.name;
      case "JSXNamespacedName":
        return B(":", [r("namespace"), r("name")]);
      case "JSXMemberExpression":
        return B(".", [r("object"), r("property")]);
      case "JSXSpreadAttribute":
      case "JSXSpreadChild":
        return ip(e, t, r);
      case "JSXExpressionContainer":
        return Qo(e, t, r);
      case "JSXFragment":
      case "JSXElement":
        return sp(e, t, r);
      case "JSXOpeningElement":
        return Zo(e, t, r);
      case "JSXClosingElement":
        return rp(e, t, r);
      case "JSXOpeningFragment":
      case "JSXClosingFragment":
        return np(e, t);
      case "JSXEmptyExpression":
        return up(e, t);
      case "JSXText":
        throw new Error("JSXText should be handled by JSXElement");
      default:
        throw new Oe(n, "JSX");
    }
}
function ap(e) {
  if (e.children.length === 0) return !0;
  if (e.children.length > 1) return !1;
  let t = e.children[0];
  return t.type === "JSXText" && !Zt(t);
}
function Zt(e) {
  return (
    e.type === "JSXText" &&
    (Pr.hasNonWhitespaceCharacter(oe(e)) || !/\n/.test(oe(e)))
  );
}
function op(e) {
  return (
    e.type === "JSXExpressionContainer" &&
    Q(e.expression) &&
    e.expression.value === " " &&
    !d(e.expression)
  );
}
function Su(e) {
  let { node: t, parent: r } = e;
  if (!Y(t) || !Y(r)) return !1;
  let { index: n, siblings: s } = e,
    u;
  for (let i = n; i > 0; i--) {
    let a = s[i - 1];
    if (!(a.type === "JSXText" && !Zt(a))) {
      u = a;
      break;
    }
  }
  return (
    (u == null ? void 0 : u.type) === "JSXExpressionContainer" &&
    u.expression.type === "JSXEmptyExpression" &&
    dt(u.expression)
  );
}
function pp(e) {
  return dt(e.node) || Su(e);
}
var kr = pp;
var cp = 0;
function Ir(e, t, r) {
  var _;
  let { node: n, parent: s, grandparent: u, key: i } = e,
    a =
      i !== "body" &&
      (s.type === "IfStatement" ||
        s.type === "WhileStatement" ||
        s.type === "SwitchStatement" ||
        s.type === "DoWhileStatement"),
    o =
      n.operator === "|>" &&
      ((_ = e.root.extra) == null ? void 0 : _.__isUsingHackPipeline),
    p = Zn(e, r, t, !1, a);
  if (a) return p;
  if (o) return y(p);
  if (
    (k(s) && s.callee === n) ||
    s.type === "UnaryExpression" ||
    (J(s) && !s.computed)
  )
    return y([E([F, ...p]), F]);
  let m =
      s.type === "ReturnStatement" ||
      s.type === "ThrowStatement" ||
      (s.type === "JSXExpressionContainer" && u.type === "JSXAttribute") ||
      (n.operator !== "|" && s.type === "JsExpressionRoot") ||
      (n.type !== "NGPipeExpression" &&
        ((s.type === "NGRoot" && t.parser === "__ng_binding") ||
          (s.type === "NGMicrosyntaxExpression" &&
            u.type === "NGMicrosyntax" &&
            u.body.length === 1))) ||
      (n === s.body && s.type === "ArrowFunctionExpression") ||
      (n !== s.body && s.type === "ForStatement") ||
      (s.type === "ConditionalExpression" &&
        u.type !== "ReturnStatement" &&
        u.type !== "ThrowStatement" &&
        !k(u)) ||
      s.type === "TemplateLiteral",
    D =
      s.type === "AssignmentExpression" ||
      s.type === "VariableDeclarator" ||
      s.type === "ClassProperty" ||
      s.type === "PropertyDefinition" ||
      s.type === "TSAbstractPropertyDefinition" ||
      s.type === "ClassPrivateProperty" ||
      fe(s),
    c = ce(n.left) && Vt(n.operator, n.left.operator);
  if (m || (Ot(n) && !c) || (!Ot(n) && D)) return y(p);
  if (p.length === 0) return "";
  let f = Y(n.right),
    l = p.findIndex(
      (R) => typeof R != "string" && !Array.isArray(R) && R.type === ue,
    ),
    h = p.slice(0, l === -1 ? 1 : l + 1),
    g = p.slice(h.length, f ? -1 : void 0),
    S = Symbol("logicalChain-" + ++cp),
    I = y([...h, E(g)], { id: S });
  if (!f) return I;
  let v = w(!1, p, -1);
  return y([I, mt(v, { groupId: S })]);
}
function Zn(e, t, r, n, s) {
  var h;
  let { node: u } = e;
  if (!ce(u)) return [y(t())];
  let i = [];
  Vt(u.operator, u.left.operator)
    ? (i = e.call((g) => Zn(g, t, r, !0, s), "left"))
    : i.push(y(t("left")));
  let a = Ot(u),
    o =
      (u.operator === "|>" || u.type === "NGPipeExpression" || lp(e, r)) &&
      !Ie(r.originalText, u.right),
    p = u.type === "NGPipeExpression" ? "|" : u.operator,
    m =
      u.type === "NGPipeExpression" && u.arguments.length > 0
        ? y(
            E([
              F,
              ": ",
              B(
                [A, ": "],
                e.map(() => De(2, y(t())), "arguments"),
              ),
            ]),
          )
        : "",
    D;
  if (a) D = [p, " ", t("right"), m];
  else {
    let S =
      p === "|>" &&
      ((h = e.root.extra) == null ? void 0 : h.__isUsingHackPipeline)
        ? e.call((I) => Zn(I, t, r, !0, s), "right")
        : t("right");
    D = [o ? A : "", p, o ? " " : A, S, m];
  }
  let { parent: c } = e,
    f = d(u.left, x.Trailing | x.Line),
    l =
      f ||
      (!(s && u.type === "LogicalExpression") &&
        c.type !== u.type &&
        u.left.type !== u.type &&
        u.right.type !== u.type);
  if ((i.push(o ? "" : " ", l ? y(D, { shouldBreak: f }) : D), n && d(u))) {
    let g = Bt(pe(e, i, r));
    return Array.isArray(g) || g.type === ye ? mr(g) : [g];
  }
  return i;
}
function Ot(e) {
  return e.type !== "LogicalExpression"
    ? !1
    : !!(
        (ee(e.right) && e.right.properties.length > 0) ||
        (G(e.right) && e.right.elements.length > 0) ||
        Y(e.right)
      );
}
var Bu = (e) => e.type === "BinaryExpression" && e.operator === "|";
function lp(e, t) {
  return (
    (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression") &&
    Bu(e.node) &&
    !e.hasAncestor((r) => !Bu(r) && r.type !== "JsExpressionRoot")
  );
}
var at = class extends Error {
  name = "ArgExpansionBailout";
};
function mp(e, t, r, n) {
  let { node: s } = e;
  return d(s, x.Dangling) ? y([r, M(e, t, { indent: !0 }), F, n]) : [r, n];
}
function vt(e, t, r) {
  let { node: n } = e,
    s = [],
    u = n.type === "TupleExpression" ? "#[" : "[",
    i = "]",
    a =
      n.type === "TupleTypeAnnotation" && n.types
        ? "types"
        : n.type === "TSTupleType" || n.type === "TupleTypeAnnotation"
          ? "elementTypes"
          : "elements",
    o = n[a];
  if (o.length === 0) s.push(mp(e, t, u, i));
  else {
    let p = w(!1, o, -1),
      m = (p == null ? void 0 : p.type) !== "RestElement",
      D = p === null,
      c = Symbol("array"),
      f =
        !t.__inJestEach &&
        o.length > 1 &&
        o.every((g, S, I) => {
          let v = g == null ? void 0 : g.type;
          if (!G(g) && !ee(g)) return !1;
          let _ = I[S + 1];
          if (_ && v !== _.type) return !1;
          let R = G(g) ? "elements" : "properties";
          return g[R] && g[R].length > 1;
        }),
      l = es(n, t),
      h = m
        ? D
          ? ","
          : le(t)
            ? l
              ? P(",", "", { groupId: c })
              : P(",")
            : ""
        : "";
    s.push(
      y([u, E([F, l ? Dp(e, t, r, h) : [yp(e, t, a, r), h], M(e, t)]), F, i], {
        shouldBreak: f,
        id: c,
      }),
    );
  }
  return s.push($(e), q(e, r)), s;
}
function es(e, t) {
  return (
    G(e) &&
    e.elements.length > 1 &&
    e.elements.every(
      (r) =>
        r &&
        (he(r) || (Ar(r) && !d(r.argument))) &&
        !d(
          r,
          x.Trailing | x.Line,
          (n) => !z(t.originalText, U(n), { backwards: !0 }),
        ),
    )
  );
}
function bu({ node: e }, { originalText: t }) {
  let r = (s) => bt(t, Pt(t, s)),
    n = (s) => (t[s] === "," ? s : n(r(s + 1)));
  return kt(t, n(O(e)));
}
function yp(e, t, r, n) {
  let s = [];
  return (
    e.each(({ node: u, isLast: i }) => {
      s.push(u ? y(n()) : ""), i || s.push([",", A, u && bu(e, t) ? F : ""]);
    }, r),
    s
  );
}
function Dp(e, t, r, n) {
  let s = [];
  return (
    e.each(({ isLast: u, next: i }) => {
      s.push([r(), u ? n : ","]),
        u || s.push(bu(e, t) ? [C, C] : d(i, x.Leading | x.Line) ? C : A);
    }, "elements"),
    St(s)
  );
}
function fp(e, t, r) {
  let { node: n } = e,
    s = Ce(n);
  if (s.length === 0) return ["(", M(e, t), ")"];
  if (Cp(s)) return ["(", r(["arguments", 0]), ", ", r(["arguments", 1]), ")"];
  let u = !1,
    i = s.length - 1,
    a = [];
  Sr(e, ({ node: c }, f) => {
    let l = r();
    f === i ||
      (me(c, t) ? ((u = !0), (l = [l, ",", C, C])) : (l = [l, ",", A])),
      a.push(l);
  });
  let p =
    !(n.type === "ImportExpression" || n.callee.type === "Import") &&
    le(t, "all")
      ? ","
      : "";
  function m() {
    return y(["(", E([A, ...a]), p, A, ")"], { shouldBreak: !0 });
  }
  if (u || (e.parent.type !== "Decorator" && tu(s))) return m();
  if (Fp(s)) {
    let c = a.slice(1);
    if (c.some(K)) return m();
    let f;
    try {
      f = r(Mn(n, 0), { expandFirstArg: !0 });
    } catch (l) {
      if (l instanceof at) return m();
      throw l;
    }
    return K(f)
      ? [Te, qe([["(", y(f, { shouldBreak: !0 }), ", ", ...c, ")"], m()])]
      : qe([
          ["(", f, ", ", ...c, ")"],
          ["(", y(f, { shouldBreak: !0 }), ", ", ...c, ")"],
          m(),
        ]);
  }
  if (Ep(s, a, t)) {
    let c = a.slice(0, -1);
    if (c.some(K)) return m();
    let f;
    try {
      f = r(Mn(n, -1), { expandLastArg: !0 });
    } catch (l) {
      if (l instanceof at) return m();
      throw l;
    }
    return K(f)
      ? [Te, qe([["(", ...c, y(f, { shouldBreak: !0 }), ")"], m()])]
      : qe([
          ["(", ...c, f, ")"],
          ["(", ...c, y(f, { shouldBreak: !0 }), ")"],
          m(),
        ]);
  }
  let D = ["(", E([F, ...a]), P(p), F, ")"];
  return hr(e) ? D : y(D, { shouldBreak: a.some(K) || u });
}
function er(e, t = !1) {
  return (
    (ee(e) && (e.properties.length > 0 || d(e))) ||
    (G(e) && (e.elements.length > 0 || d(e))) ||
    (e.type === "TSTypeAssertion" && er(e.expression)) ||
    (Le(e) && er(e.expression)) ||
    e.type === "FunctionExpression" ||
    (e.type === "ArrowFunctionExpression" &&
      (!e.returnType ||
        !e.returnType.typeAnnotation ||
        e.returnType.typeAnnotation.type !== "TSTypeReference" ||
        dp(e.body)) &&
      (e.body.type === "BlockStatement" ||
        (e.body.type === "ArrowFunctionExpression" && er(e.body, !0)) ||
        ee(e.body) ||
        G(e.body) ||
        (!t && (k(e.body) || e.body.type === "ConditionalExpression")) ||
        Y(e.body))) ||
    e.type === "DoExpression" ||
    e.type === "ModuleExpression"
  );
}
function Ep(e, t, r) {
  var u, i;
  let n = w(!1, e, -1);
  if (e.length === 1) {
    let a = w(!1, t, -1);
    if (
      (u = a.label) != null &&
      u.embed &&
      ((i = a.label) == null ? void 0 : i.hug) !== !1
    )
      return !0;
  }
  let s = w(!1, e, -2);
  return (
    !d(n, x.Leading) &&
    !d(n, x.Trailing) &&
    er(n) &&
    (!s || s.type !== n.type) &&
    (e.length !== 2 || s.type !== "ArrowFunctionExpression" || !G(n)) &&
    !(e.length > 1 && es(n, r))
  );
}
function Fp(e) {
  if (e.length !== 2) return !1;
  let [t, r] = e;
  return t.type === "ModuleExpression" && Ap(r)
    ? !0
    : !d(t) &&
        (t.type === "FunctionExpression" ||
          (t.type === "ArrowFunctionExpression" &&
            t.body.type === "BlockStatement")) &&
        r.type !== "FunctionExpression" &&
        r.type !== "ArrowFunctionExpression" &&
        r.type !== "ConditionalExpression" &&
        Pu(r) &&
        !er(r);
}
function Pu(e) {
  var t;
  if (e.type === "ParenthesizedExpression") return Pu(e.expression);
  if (Le(e) || e.type === "TypeCastExpression") {
    let { typeAnnotation: r } = e;
    return (
      r.type === "TypeAnnotation" && (r = r.typeAnnotation),
      r.type === "TSArrayType" &&
        ((r = r.elementType), r.type === "TSArrayType" && (r = r.elementType)),
      (r.type === "GenericTypeAnnotation" || r.type === "TSTypeReference") &&
        ((t = r.typeParameters) == null ? void 0 : t.params.length) === 1 &&
        (r = r.typeParameters.params[0]),
      wt(r) && ge(e.expression, 1)
    );
  }
  return it(e) && Ce(e).length > 1
    ? !1
    : ce(e)
      ? ge(e.left, 1) && ge(e.right, 1)
      : wn(e) || ge(e);
}
function Cp(e) {
  return (
    e.length === 2 &&
    e[0].type === "ArrowFunctionExpression" &&
    X(e[0]).length === 0 &&
    e[0].body.type === "BlockStatement" &&
    e[1].type === "ArrayExpression" &&
    !e.some((t) => d(t))
  );
}
function dp(e) {
  return (
    e.type === "BlockStatement" &&
    (e.body.some((t) => t.type !== "EmptyStatement") || d(e, x.Dangling))
  );
}
function Ap(e) {
  return (
    e.type === "ObjectExpression" &&
    e.properties.length === 1 &&
    fe(e.properties[0]) &&
    e.properties[0].key.type === "Identifier" &&
    e.properties[0].key.name === "type" &&
    Q(e.properties[0].value) &&
    e.properties[0].value.value === "module"
  );
}
var tr = fp;
function ku(e, t, r) {
  var p;
  let n = r("object"),
    s = ts(e, t, r),
    { node: u, parent: i } = e,
    a = e.findAncestor((m) => !(J(m) || m.type === "TSNonNullExpression")),
    o =
      (a &&
        (a.type === "NewExpression" ||
          a.type === "BindExpression" ||
          (a.type === "AssignmentExpression" &&
            a.left.type !== "Identifier"))) ||
      u.computed ||
      (u.object.type === "Identifier" &&
        u.property.type === "Identifier" &&
        !J(i)) ||
      ((i.type === "AssignmentExpression" || i.type === "VariableDeclarator") &&
        ((k(u.object) && u.object.arguments.length > 0) ||
          (u.object.type === "TSNonNullExpression" &&
            k(u.object.expression) &&
            u.object.expression.arguments.length > 0) ||
          ((p = n.label) == null ? void 0 : p.memberChain)));
  return et(n.label, [n, o ? s : y(E([F, s]))]);
}
function ts(e, t, r) {
  let n = r("property"),
    { node: s } = e,
    u = $(e);
  return s.computed
    ? !s.property || he(s.property)
      ? [u, "[", n, "]"]
      : y([u, "[", E([F, n]), F, "]"])
    : [u, ".", n];
}
function Tp(e, t, r) {
  let { parent: n } = e,
    s = !n || n.type === "ExpressionStatement",
    u = [];
  function i(L) {
    let { originalText: W } = t,
      se = Xe(W, O(L));
    return W.charAt(se) === ")" ? se !== !1 && kt(W, se + 1) : me(L, t);
  }
  function a(L) {
    let { node: W } = L;
    k(W) && (Dt(W.callee) || k(W.callee))
      ? (u.unshift({
          node: W,
          printed: [pe(L, [$(L), Ve(L, t, r), tr(L, t, r)], t), i(W) ? C : ""],
        }),
        L.call((se) => a(se), "callee"))
      : Dt(W)
        ? (u.unshift({
            node: W,
            needsParens: we(L, t),
            printed: pe(L, J(W) ? ts(L, t, r) : Lr(L, t, r), t),
          }),
          L.call((se) => a(se), "object"))
        : W.type === "TSNonNullExpression"
          ? (u.unshift({ node: W, printed: pe(L, "!", t) }),
            L.call((se) => a(se), "expression"))
          : u.unshift({ node: W, printed: r() });
  }
  let { node: o } = e;
  u.unshift({ node: o, printed: [$(e), Ve(e, t, r), tr(e, t, r)] }),
    o.callee && e.call((L) => a(L), "callee");
  let p = [],
    m = [u[0]],
    D = 1;
  for (
    ;
    D < u.length &&
    (u[D].node.type === "TSNonNullExpression" ||
      k(u[D].node) ||
      (J(u[D].node) && u[D].node.computed && he(u[D].node.property)));
    ++D
  )
    m.push(u[D]);
  if (!k(u[0].node))
    for (; D + 1 < u.length && Dt(u[D].node) && Dt(u[D + 1].node); ++D)
      m.push(u[D]);
  p.push(m), (m = []);
  let c = !1;
  for (; D < u.length; ++D) {
    if (c && Dt(u[D].node)) {
      if (u[D].node.computed && he(u[D].node.property)) {
        m.push(u[D]);
        continue;
      }
      p.push(m), (m = []), (c = !1);
    }
    (k(u[D].node) || u[D].node.type === "ImportExpression") && (c = !0),
      m.push(u[D]),
      d(u[D].node, x.Trailing) && (p.push(m), (m = []), (c = !1));
  }
  m.length > 0 && p.push(m);
  function f(L) {
    return /^[A-Z]|^[$_]+$/.test(L);
  }
  function l(L) {
    return L.length <= t.tabWidth;
  }
  function h(L) {
    var An;
    let W = (An = L[1][0]) == null ? void 0 : An.node.computed;
    if (L[0].length === 1) {
      let ar = L[0][0].node;
      return (
        ar.type === "ThisExpression" ||
        (ar.type === "Identifier" && (f(ar.name) || (s && l(ar.name)) || W))
      );
    }
    let se = w(!1, L[0], -1).node;
    return (
      J(se) && se.property.type === "Identifier" && (f(se.property.name) || W)
    );
  }
  let g = p.length >= 2 && !d(p[1][0].node) && h(p);
  function S(L) {
    let W = L.map((se) => se.printed);
    return L.length > 0 && w(!1, L, -1).needsParens ? ["(", ...W, ")"] : W;
  }
  function I(L) {
    return L.length === 0 ? "" : E(y([C, B(C, L.map(S))]));
  }
  let v = p.map(S),
    _ = v,
    R = g ? 3 : 2,
    T = p.flat(),
    N =
      T.slice(1, -1).some((L) => d(L.node, x.Leading)) ||
      T.slice(0, -1).some((L) => d(L.node, x.Trailing)) ||
      (p[R] && d(p[R][0].node, x.Leading));
  if (p.length <= R && !N) return hr(e) ? _ : y(_);
  let Se = w(!1, p[g ? 1 : 0], -1).node,
    V = !k(Se) && i(Se),
    Be = [
      S(p[0]),
      g ? p.slice(1, 2).map(S) : "",
      V ? C : "",
      I(p.slice(g ? 2 : 1)),
    ],
    Ee = u.map(({ node: L }) => L).filter(k);
  function Cn() {
    let L = w(!1, w(!1, p, -1), -1).node,
      W = w(!1, v, -1);
    return k(L) && K(W) && Ee.slice(0, -1).some((se) => se.arguments.some(It));
  }
  let dn;
  return (
    N ||
    (Ee.length > 2 && Ee.some((L) => !L.arguments.every((W) => ge(W)))) ||
    v.slice(0, -1).some(K) ||
    Cn()
      ? (dn = y(Be))
      : (dn = [K(_) || V ? Te : "", qe([_, Be])]),
    et({ memberChain: !0 }, dn)
  );
}
var Iu = Tp;
function wr(e, t, r) {
  var D;
  let { node: n, parent: s } = e,
    u = n.type === "NewExpression",
    i = n.type === "ImportExpression",
    a = $(e),
    o = Ce(n),
    p = o.length === 1 && xr(o[0], t.originalText);
  if (p || (o.length > 0 && !u && !i && (xp(n, s) || Ct(n, s)))) {
    let c = [];
    if (
      (Sr(e, () => {
        c.push(r());
      }),
      !(p && (D = c[0].label) != null && D.embed))
    )
      return [
        u ? "new " : "",
        r("callee"),
        a,
        Ve(e, t, r),
        "(",
        B(", ", c),
        ")",
      ];
  }
  if (!i && !u && Dt(n.callee) && !e.call((c) => we(c, t), "callee"))
    return Iu(e, t, r);
  let m = [
    u ? "new " : "",
    i ? "import" : r("callee"),
    a,
    Ve(e, t, r),
    tr(e, t, r),
  ];
  return i || k(n.callee) ? y(m) : m;
}
function xp(e, t) {
  if (e.callee.type !== "Identifier") return !1;
  if (e.callee.name === "require") {
    let r = Ce(e);
    return (r.length === 1 && Q(r[0])) || r.length > 1;
  }
  if (e.callee.name === "define") {
    let r = Ce(e);
    return (
      t.type === "ExpressionStatement" &&
      (r.length === 1 ||
        (r.length === 2 && r[0].type === "ArrayExpression") ||
        (r.length === 3 && Q(r[0]) && r[1].type === "ArrayExpression"))
    );
  }
  return !1;
}
function gp(e, t, r) {
  let n = t === '"' ? "'" : '"',
    u = H(!1, e, /\\(.)|(["'])/gs, (i, a, o) =>
      a === n
        ? a
        : o === t
          ? "\\" + o
          : o ||
            (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(a)
              ? a
              : "\\" + a),
    );
  return t + u + t;
}
var Lu = gp;
function hp(e, t) {
  let r = e.slice(1, -1),
    n =
      t.parser === "json" ||
      (t.parser === "json5" && t.quoteProps === "preserve" && !t.singleQuote)
        ? '"'
        : t.__isInHtmlAttribute
          ? "'"
          : br(r, t.singleQuote);
  return Lu(
    r,
    n,
    !(
      t.parser === "css" ||
      t.parser === "less" ||
      t.parser === "scss" ||
      t.__embeddedInHtml
    ),
  );
}
var Tt = hp;
function Sp(e) {
  return e
    .toLowerCase()
    .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, "$1$2")
    .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
    .replace(/^([+-])?\./, "$10.")
    .replace(/(\.\d+?)0+(?=e|$)/, "$1")
    .replace(/\.(?=e|$)/, "");
}
var He = Sp;
function vu(e, t) {
  let { node: r } = e;
  switch (r.type) {
    case "RegExpLiteral":
      return wu(r);
    case "BigIntLiteral":
      return Or(r.extra.raw);
    case "NumericLiteral":
      return He(r.extra.raw);
    case "StringLiteral":
      return xe(Tt(r.extra.raw, t));
    case "NullLiteral":
      return "null";
    case "BooleanLiteral":
      return String(r.value);
    case "DecimalLiteral":
      return He(r.value) + "m";
    case "DirectiveLiteral":
      return Ou(r.extra.raw, t);
    case "Literal": {
      if (r.regex) return wu(r.regex);
      if (r.bigint) return Or(r.raw);
      if (r.decimal) return He(r.decimal) + "m";
      let { value: n } = r;
      return typeof n == "number"
        ? He(r.raw)
        : typeof n == "string"
          ? Bp(e)
            ? Ou(r.raw, t)
            : xe(Tt(r.raw, t))
          : String(n);
    }
  }
}
function Bp(e) {
  if (e.key !== "expression") return;
  let { parent: t } = e;
  return t.type === "ExpressionStatement" && t.directive;
}
function Or(e) {
  return e.toLowerCase();
}
function wu({ pattern: e, flags: t }) {
  return (t = [...t].sort().join("")), `/${e}/${t}`;
}
function Ou(e, t) {
  let r = e.slice(1, -1);
  if (r.includes('"') || r.includes("'")) return e;
  let n = t.singleQuote ? "'" : '"';
  return n + r + n;
}
var vr = j([
  "Literal",
  "BigIntLiteral",
  "BooleanLiteral",
  "DecimalLiteral",
  "DirectiveLiteral",
  "NullLiteral",
  "NumericLiteral",
  "RegExpLiteral",
  "StringLiteral",
]);
function ft(e, t, r, n, s, u) {
  let i = bp(e, t, r, n, u),
    a = u ? r(u, { assignmentLayout: i }) : "";
  switch (i) {
    case "break-after-operator":
      return y([y(n), s, y(E([A, a]))]);
    case "never-break-after-operator":
      return y([y(n), s, " ", a]);
    case "fluid": {
      let o = Symbol("assignment");
      return y([y(n), s, y(E(A), { id: o }), Ae, mt(a, { groupId: o })]);
    }
    case "break-lhs":
      return y([n, s, " ", y(a)]);
    case "chain":
      return [y(n), s, A, a];
    case "chain-tail":
      return [y(n), s, E([A, a])];
    case "chain-tail-arrow-chain":
      return [y(n), s, a];
    case "only-left":
      return n;
  }
}
function ju(e, t, r) {
  let { node: n } = e;
  return ft(e, t, r, r("left"), [" ", n.operator], "right");
}
function Mu(e, t, r) {
  return ft(e, t, r, r("id"), " =", "init");
}
function bp(e, t, r, n, s) {
  let { node: u } = e,
    i = u[s];
  if (!i) return "only-left";
  let a = !_r(i);
  if (
    e.match(
      _r,
      Ru,
      (D) =>
        !a ||
        (D.type !== "ExpressionStatement" && D.type !== "VariableDeclaration"),
    )
  )
    return a
      ? i.type === "ArrowFunctionExpression" &&
        i.body.type === "ArrowFunctionExpression"
        ? "chain-tail-arrow-chain"
        : "chain-tail"
      : "chain";
  if ((!a && _r(i.right)) || Ie(t.originalText, i))
    return "break-after-operator";
  if (
    (i.type === "CallExpression" && i.callee.name === "require") ||
    t.parser === "json5" ||
    t.parser === "json"
  )
    return "never-break-after-operator";
  if (kp(u) || Ip(u) || Op(u) || (rs(u) && Rs(n))) return "break-lhs";
  let m = Mp(u, n, t);
  return e.call(() => Pp(e, t, r, m), s)
    ? "break-after-operator"
    : m ||
        i.type === "TemplateLiteral" ||
        i.type === "TaggedTemplateExpression" ||
        i.type === "BooleanLiteral" ||
        he(i) ||
        i.type === "ClassExpression"
      ? "never-break-after-operator"
      : "fluid";
}
function Pp(e, t, r, n) {
  let s = e.node;
  if (ce(s) && !Ot(s)) return !0;
  switch (s.type) {
    case "StringLiteralTypeAnnotation":
    case "SequenceExpression":
      return !0;
    case "ConditionalExpression": {
      let { test: a } = s;
      return ce(a) && !Ot(a);
    }
    case "ClassExpression":
      return b(s.decorators);
  }
  if (n) return !1;
  let u = s,
    i = [];
  for (;;)
    if (
      u.type === "UnaryExpression" ||
      u.type === "AwaitExpression" ||
      (u.type === "YieldExpression" && u.argument !== null)
    )
      (u = u.argument), i.push("argument");
    else if (u.type === "TSNonNullExpression")
      (u = u.expression), i.push("expression");
    else break;
  return !!(Q(u) || e.call(() => Ju(e, t, r), ...i));
}
function kp(e) {
  if (Ru(e)) {
    let t = e.left || e.id;
    return (
      t.type === "ObjectPattern" &&
      t.properties.length > 2 &&
      t.properties.some((r) => {
        var n;
        return (
          fe(r) &&
          (!r.shorthand ||
            ((n = r.value) == null ? void 0 : n.type) === "AssignmentPattern")
        );
      })
    );
  }
  return !1;
}
function _r(e) {
  return e.type === "AssignmentExpression";
}
function Ru(e) {
  return _r(e) || e.type === "VariableDeclarator";
}
function Ip(e) {
  let t = wp(e);
  if (b(t)) {
    let r = e.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
    if (t.length > 1 && t.some((n) => n[r] || n.default)) return !0;
  }
  return !1;
}
var Lp = j(["TSTypeAliasDeclaration", "TypeAlias"]);
function wp(e) {
  var t;
  if (Lp(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function Op(e) {
  if (e.type !== "VariableDeclarator") return !1;
  let { typeAnnotation: t } = e.id;
  if (!t || !t.typeAnnotation) return !1;
  let r = _u(t.typeAnnotation);
  return (
    b(r) &&
    r.length > 1 &&
    r.some((n) => b(_u(n)) || n.type === "TSConditionalType")
  );
}
function rs(e) {
  var t;
  return (
    e.type === "VariableDeclarator" &&
    ((t = e.init) == null ? void 0 : t.type) === "ArrowFunctionExpression"
  );
}
var vp = j(["TSTypeReference", "GenericTypeAnnotation"]);
function _u(e) {
  var t;
  if (vp(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function Ju(e, t, r, n = !1) {
  var i;
  let { node: s } = e,
    u = () => Ju(e, t, r, !0);
  if (s.type === "ChainExpression" || s.type === "TSNonNullExpression")
    return e.call(u, "expression");
  if (k(s)) {
    if ((i = wr(e, t, r).label) != null && i.memberChain) return !1;
    let o = Ce(s);
    return !(o.length === 0 || (o.length === 1 && jp(o[0], t))) || Rp(s, r)
      ? !1
      : e.call(u, "callee");
  }
  return J(s)
    ? e.call(u, "object")
    : n && (s.type === "Identifier" || s.type === "ThisExpression");
}
var _p = 0.25;
function jp(e, { printWidth: t }) {
  if (d(e)) return !1;
  let r = t * _p;
  if (
    e.type === "ThisExpression" ||
    (e.type === "Identifier" && e.name.length <= r) ||
    (Ar(e) && !d(e.argument))
  )
    return !0;
  let n =
    (e.type === "Literal" && "regex" in e && e.regex.pattern) ||
    (e.type === "RegExpLiteral" && e.pattern);
  return n
    ? n.length <= r
    : Q(e)
      ? oe(e).length <= r
      : e.type === "TemplateLiteral"
        ? e.expressions.length === 0 &&
          e.quasis[0].value.raw.length <= r &&
          !e.quasis[0].value.raw.includes(`
`)
        : vr(e);
}
function Mp(e, t, r) {
  if (!fe(e)) return !1;
  t = Bt(t);
  let n = 3;
  return typeof t == "string" && tt(t) < r.tabWidth + n;
}
function Rp(e, t) {
  let r = Jp(e);
  if (b(r)) {
    if (r.length > 1) return !0;
    if (r.length === 1) {
      let s = r[0];
      if (
        s.type === "TSUnionType" ||
        s.type === "UnionTypeAnnotation" ||
        s.type === "TSIntersectionType" ||
        s.type === "IntersectionTypeAnnotation" ||
        s.type === "TSTypeLiteral" ||
        s.type === "ObjectTypeAnnotation"
      )
        return !0;
    }
    let n = e.typeParameters ? "typeParameters" : "typeArguments";
    if (K(t(n))) return !0;
  }
  return !1;
}
function Jp(e) {
  var t;
  return (t = e.typeParameters ?? e.typeArguments) == null ? void 0 : t.params;
}
function ot(e, t, r, n, s) {
  let u = e.node,
    i = X(u),
    a = s ? Ve(e, r, t) : "";
  if (i.length === 0)
    return [
      a,
      "(",
      M(e, r, { filter: (l) => $e(r.originalText, O(l)) === ")" }),
      ")",
    ];
  let { parent: o } = e,
    p = Ct(o),
    m = ns(u),
    D = [];
  if (
    (uu(e, (l, h) => {
      let g = h === i.length - 1;
      g && u.rest && D.push("..."),
        D.push(t()),
        !g &&
          (D.push(","),
          p || m ? D.push(" ") : me(i[h], r) ? D.push(C, C) : D.push(A));
    }),
    n && !Up(e))
  ) {
    if (K(a) || K(D)) throw new at();
    return y([Ut(a), "(", Ut(D), ")"]);
  }
  let c = i.every((l) => !b(l.decorators));
  return m && c
    ? [a, "(", ...D, ")"]
    : p
      ? [a, "(", ...D, ")"]
      : (Tr(o) ||
            Zs(o) ||
            o.type === "TypeAlias" ||
            o.type === "UnionTypeAnnotation" ||
            o.type === "TSUnionType" ||
            o.type === "IntersectionTypeAnnotation" ||
            (o.type === "FunctionTypeAnnotation" && o.returnType === u)) &&
          i.length === 1 &&
          i[0].name === null &&
          u.this !== i[0] &&
          i[0].typeAnnotation &&
          u.typeParameters === null &&
          wt(i[0].typeAnnotation) &&
          !u.rest
        ? r.arrowParens === "always"
          ? ["(", ...D, ")"]
          : D
        : [a, "(", E([F, ...D]), P(!su(u) && le(r, "all") ? "," : ""), F, ")"];
}
function ns(e) {
  if (!e) return !1;
  let t = X(e);
  if (t.length !== 1) return !1;
  let [r] = t;
  return (
    !d(r) &&
    (r.type === "ObjectPattern" ||
      r.type === "ArrayPattern" ||
      (r.type === "Identifier" &&
        r.typeAnnotation &&
        (r.typeAnnotation.type === "TypeAnnotation" ||
          r.typeAnnotation.type === "TSTypeAnnotation") &&
        ke(r.typeAnnotation.typeAnnotation)) ||
      (r.type === "FunctionTypeParam" &&
        ke(r.typeAnnotation) &&
        r !== e.rest) ||
      (r.type === "AssignmentPattern" &&
        (r.left.type === "ObjectPattern" || r.left.type === "ArrayPattern") &&
        (r.right.type === "Identifier" ||
          (ee(r.right) && r.right.properties.length === 0) ||
          (G(r.right) && r.right.elements.length === 0))))
  );
}
function Np(e) {
  let t;
  return (
    e.returnType
      ? ((t = e.returnType), t.typeAnnotation && (t = t.typeAnnotation))
      : e.typeAnnotation && (t = e.typeAnnotation),
    t
  );
}
function xt(e, t) {
  var s;
  let r = Np(e);
  if (!r) return !1;
  let n = (s = e.typeParameters) == null ? void 0 : s.params;
  if (n) {
    if (n.length > 1) return !1;
    if (n.length === 1) {
      let u = n[0];
      if (u.constraint || u.default) return !1;
    }
  }
  return X(e).length === 1 && (ke(r) || K(t));
}
function Up(e) {
  return e.match(
    (t) =>
      t.type === "ArrowFunctionExpression" && t.body.type === "BlockStatement",
    (t, r) => {
      if (
        t.type === "CallExpression" &&
        r === "arguments" &&
        t.arguments.length === 1 &&
        t.callee.type === "CallExpression"
      ) {
        let n = t.callee.callee;
        return (
          n.type === "Identifier" ||
          (n.type === "MemberExpression" &&
            !n.computed &&
            n.object.type === "Identifier" &&
            n.property.type === "Identifier")
        );
      }
      return !1;
    },
    (t, r) =>
      (t.type === "VariableDeclarator" && r === "init") ||
      (t.type === "ExportDefaultDeclaration" && r === "declaration") ||
      (t.type === "TSExportAssignment" && r === "expression") ||
      (t.type === "AssignmentExpression" &&
        r === "right" &&
        t.left.type === "MemberExpression" &&
        t.left.object.type === "Identifier" &&
        t.left.object.name === "module" &&
        t.left.property.type === "Identifier" &&
        t.left.property.name === "exports"),
    (t) =>
      t.type !== "VariableDeclaration" ||
      (t.kind === "const" && t.declarations.length === 1),
  );
}
function Nu(e) {
  let t = X(e);
  return t.length > 1 && t.some((r) => r.type === "TSParameterProperty");
}
function ss(e) {
  if (wt(e) || ke(e)) return !0;
  if (e.type === "UnionTypeAnnotation" || e.type === "TSUnionType") {
    let t = e.types.filter(
        (s) =>
          s.type === "VoidTypeAnnotation" ||
          s.type === "TSVoidKeyword" ||
          s.type === "NullLiteralTypeAnnotation" ||
          s.type === "TSNullKeyword",
      ).length,
      r = e.types.some(
        (s) =>
          s.type === "ObjectTypeAnnotation" ||
          s.type === "TSTypeLiteral" ||
          s.type === "GenericTypeAnnotation" ||
          s.type === "TSTypeReference",
      ),
      n = e.types.some((s) => d(s));
    if (e.types.length - 1 === t && r && !n) return !0;
  }
  return !1;
}
function Uu(e, t, r) {
  let n = t.semi ? ";" : "",
    { node: s } = e,
    u = [Z(e), "opaque type ", r("id"), r("typeParameters")];
  return (
    s.supertype && u.push(": ", r("supertype")),
    s.impltype && u.push(" = ", r("impltype")),
    u.push(n),
    u
  );
}
function jr(e, t, r) {
  let n = t.semi ? ";" : "",
    { node: s } = e,
    u = [Z(e)];
  u.push("type ", r("id"), r("typeParameters"));
  let i = s.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
  return [ft(e, t, r, u, " =", i), n];
}
function Mr(e, t, r) {
  let n = !1;
  return y(
    e.map(({ isFirst: s, previous: u, node: i, index: a }) => {
      let o = r();
      if (s) return o;
      let p = ke(i),
        m = ke(u);
      return m && p
        ? [" & ", n ? E(o) : o]
        : !m && !p
          ? E([" &", A, o])
          : (a > 1 && (n = !0), [" & ", a > 1 ? E(o) : o]);
    }, "types"),
  );
}
function Rr(e, t, r) {
  let { node: n } = e,
    { parent: s } = e,
    u =
      s.type !== "TypeParameterInstantiation" &&
      s.type !== "TSTypeParameterInstantiation" &&
      s.type !== "GenericTypeAnnotation" &&
      s.type !== "TSTypeReference" &&
      s.type !== "TSTypeAssertion" &&
      s.type !== "TupleTypeAnnotation" &&
      s.type !== "TSTupleType" &&
      !(
        s.type === "FunctionTypeParam" &&
        !s.name &&
        e.grandparent.this !== s
      ) &&
      !(
        (s.type === "TypeAlias" ||
          s.type === "VariableDeclarator" ||
          s.type === "TSTypeAliasDeclaration") &&
        Ie(t.originalText, n)
      ),
    i = ss(n),
    a = e.map((m) => {
      let D = r();
      return i || (D = De(2, D)), pe(m, D, t);
    }, "types");
  if (i) return B(" | ", a);
  let o = u && !Ie(t.originalText, n),
    p = [P([o ? A : "", "| "]), B([A, "| "], a)];
  return we(e, t)
    ? y([E(p), F])
    : (s.type === "TupleTypeAnnotation" || s.type === "TSTupleType") &&
        s[
          s.type === "TupleTypeAnnotation" && s.types ? "types" : "elementTypes"
        ].length > 1
      ? y([E([P(["(", F]), p]), F, P(")")])
      : y(u ? E(p) : p);
}
function Gp(e) {
  var n;
  let { node: t, parent: r } = e;
  return (
    t.type === "FunctionTypeAnnotation" &&
    (Tr(r) ||
      !(
        ((r.type === "ObjectTypeProperty" ||
          r.type === "ObjectTypeInternalSlot") &&
          !r.variance &&
          !r.optional &&
          yt(r, t)) ||
        r.type === "ObjectTypeCallProperty" ||
        ((n = e.getParentNode(2)) == null ? void 0 : n.type) ===
          "DeclareFunction"
      ))
  );
}
function Jr(e, t, r) {
  let { node: n } = e,
    s = [_t(e)];
  (n.type === "TSConstructorType" ||
    n.type === "TSConstructSignatureDeclaration") &&
    s.push("new ");
  let u = ot(e, r, t, !1, !0),
    i = [];
  return (
    n.type === "FunctionTypeAnnotation"
      ? i.push(Gp(e) ? " => " : ": ", r("returnType"))
      : i.push(q(e, r, n.returnType ? "returnType" : "typeAnnotation")),
    xt(n, i) && (u = y(u)),
    s.push(u, i),
    y(s)
  );
}
function Nr(e, t, r) {
  return [r("objectType"), $(e), "[", r("indexType"), "]"];
}
function Ur(e, t, r) {
  return ["infer ", r("typeParameter")];
}
function us(e, t, r) {
  let { node: n } = e;
  return [n.postfix ? "" : r, q(e, t), n.postfix ? r : ""];
}
function Gr(e, t, r) {
  let { node: n } = e;
  return [
    "...",
    ...(n.type === "TupleTypeSpreadElement" && n.label
      ? [r("label"), ": "]
      : []),
    r("typeAnnotation"),
  ];
}
function qr(e, t, r) {
  let { node: n } = e;
  return [
    n.variance ? r("variance") : "",
    r("label"),
    n.optional ? "?" : "",
    ": ",
    r("elementType"),
  ];
}
var qp = new WeakSet();
function q(e, t, r = "typeAnnotation") {
  let {
    node: { [r]: n },
  } = e;
  if (!n) return "";
  let s = !1;
  if (n.type === "TSTypeAnnotation" || n.type === "TypeAnnotation") {
    let u = e.call(Gu, r);
    (u === "=>" || (u === ":" && d(n, x.Leading))) && (s = !0), qp.add(n);
  }
  return s ? [" ", t(r)] : t(r);
}
var Gu = (e) =>
  e.match(
    (t) => t.type === "TSTypeAnnotation",
    (t, r) =>
      (r === "returnType" || r === "typeAnnotation") &&
      (t.type === "TSFunctionType" || t.type === "TSConstructorType"),
  )
    ? "=>"
    : e.match(
          (t) => t.type === "TSTypeAnnotation",
          (t, r) =>
            r === "typeAnnotation" &&
            (t.type === "TSJSDocNullableType" ||
              t.type === "TSJSDocNonNullableType" ||
              t.type === "TSTypePredicate"),
        ) ||
        e.match(
          (t) => t.type === "TypeAnnotation",
          (t, r) => r === "typeAnnotation" && t.type === "Identifier",
          (t, r) => r === "id" && t.type === "DeclareFunction",
        ) ||
        e.match(
          (t) => t.type === "TypeAnnotation",
          (t, r) =>
            r === "bound" && t.type === "TypeParameter" && t.usesExtendsBound,
        )
      ? ""
      : ":";
function Wr(e, t, r) {
  let n = Gu(e);
  return n ? [n, " ", r("typeAnnotation")] : r("typeAnnotation");
}
function Yr(e) {
  return [e("elementType"), "[]"];
}
function Xr({ node: e }, t) {
  return [
    "typeof ",
    ...(e.type === "TSTypeQuery"
      ? [t("exprName"), t("typeParameters")]
      : [t("argument")]),
  ];
}
function $r(e, t) {
  let { node: r } = e;
  return [
    r.asserts ? "asserts " : "",
    t("parameterName"),
    r.typeAnnotation ? [" is ", q(e, t)] : "",
  ];
}
function $(e) {
  let { node: t } = e;
  return !t.optional || (t.type === "Identifier" && t === e.parent.key)
    ? ""
    : k(t) || (J(t) && t.computed) || t.type === "OptionalIndexedAccessType"
      ? "?."
      : "?";
}
function Vr(e) {
  return e.node.definite ||
    e.match(
      void 0,
      (t, r) => r === "id" && t.type === "VariableDeclarator" && t.definite,
    )
    ? "!"
    : "";
}
var Wp = new Set([
  "DeclareClass",
  "DeclareFunction",
  "DeclareVariable",
  "DeclareExportDeclaration",
  "DeclareExportAllDeclaration",
  "DeclareOpaqueType",
  "DeclareTypeAlias",
  "DeclareEnum",
  "DeclareInterface",
]);
function Z(e) {
  let { node: t } = e;
  return t.declare ||
    (Wp.has(t.type) && e.parent.type !== "DeclareExportDeclaration")
    ? "declare "
    : "";
}
var Yp = new Set([
  "TSAbstractMethodDefinition",
  "TSAbstractPropertyDefinition",
  "TSAbstractAccessorProperty",
]);
function _t({ node: e }) {
  return e.abstract || Yp.has(e.type) ? "abstract " : "";
}
function Ve(e, t, r) {
  let n = e.node;
  return n.typeArguments
    ? r("typeArguments")
    : n.typeParameters
      ? r("typeParameters")
      : "";
}
function Lr(e, t, r) {
  return ["::", r("callee")];
}
function pt(e, t, r) {
  return e.type === "EmptyStatement"
    ? ";"
    : e.type === "BlockStatement" || r
      ? [" ", t]
      : E([A, t]);
}
function Hr(e, t) {
  return ["...", t("argument"), q(e, t)];
}
function jt(e) {
  return e.accessibility ? e.accessibility + " " : "";
}
function is(e, t, r) {
  let { node: n } = e;
  return y([B(A, e.map(r, "decorators")), Yu(n, t) ? C : A]);
}
function qu(e, t, r) {
  return Xu(e.node) ? [B(C, e.map(r, "declaration", "decorators")), C] : "";
}
function Wu(e, t, r) {
  let { node: n, parent: s } = e,
    { decorators: u } = n;
  if (!b(u) || Xu(s) || kr(e)) return "";
  let i =
    n.type === "ClassExpression" || n.type === "ClassDeclaration" || Yu(n, t);
  return [
    e.key === "declaration" && Qs(s) ? C : i ? Te : "",
    B(A, e.map(r, "decorators")),
    A,
  ];
}
function Yu(e, t) {
  return e.decorators.some((r) => z(t.originalText, O(r)));
}
function Xu(e) {
  var r;
  if (
    e.type !== "ExportDefaultDeclaration" &&
    e.type !== "ExportNamedDeclaration" &&
    e.type !== "DeclareExportDeclaration"
  )
    return !1;
  let t = (r = e.declaration) == null ? void 0 : r.decorators;
  return b(t) && yt(e, t[0]);
}
function $u(e, t, r) {
  let { node: n } = e;
  return [
    "import",
    n.module ? " module" : "",
    os(n),
    Ku(e, t, r),
    Hu(e, t, r),
    Qu(e, t, r),
    t.semi ? ";" : "",
  ];
}
var Vu = (e) =>
  e.type === "ExportDefaultDeclaration" ||
  (e.type === "DeclareExportDeclaration" && e.default);
function Kr(e, t, r) {
  let { node: n } = e,
    s = [qu(e, t, r), Z(e), "export", Vu(n) ? " default" : ""],
    { declaration: u, exported: i } = n;
  return (
    d(n, x.Dangling) && (s.push(" ", M(e, t)), gr(n) && s.push(C)),
    u
      ? s.push(" ", r("declaration"))
      : (s.push(Vp(n)),
        n.type === "ExportAllDeclaration" ||
        n.type === "DeclareExportAllDeclaration"
          ? (s.push(" *"), i && s.push(" as ", r("exported")))
          : s.push(Ku(e, t, r)),
        s.push(Hu(e, t, r), Qu(e, t, r))),
    s.push($p(n, t)),
    s
  );
}
var Xp = j([
  "ClassDeclaration",
  "FunctionDeclaration",
  "TSInterfaceDeclaration",
  "DeclareClass",
  "DeclareFunction",
  "TSDeclareFunction",
  "EnumDeclaration",
]);
function $p(e, t) {
  return t.semi && (!e.declaration || (Vu(e) && !Xp(e.declaration))) ? ";" : "";
}
function as(e, t = !0) {
  return e && e !== "value" ? `${t ? " " : ""}${e}${t ? "" : " "}` : "";
}
function os(e, t) {
  return as(e.importKind, t);
}
function Vp(e) {
  return as(e.exportKind);
}
function Hu(e, t, r) {
  let { node: n } = e;
  if (!n.source) return "";
  let s = [];
  return zu(n, t) || s.push(" from"), s.push(" ", r("source")), s;
}
function Ku(e, t, r) {
  let { node: n } = e;
  if (zu(n, t)) return "";
  let s = [" "];
  if (b(n.specifiers)) {
    let u = [],
      i = [];
    e.each(() => {
      let a = e.node.type;
      if (
        a === "ExportNamespaceSpecifier" ||
        a === "ExportDefaultSpecifier" ||
        a === "ImportNamespaceSpecifier" ||
        a === "ImportDefaultSpecifier"
      )
        u.push(r());
      else if (a === "ExportSpecifier" || a === "ImportSpecifier") i.push(r());
      else throw new Oe(n, "specifier");
    }, "specifiers"),
      s.push(B(", ", u)),
      i.length > 0 &&
        (u.length > 0 && s.push(", "),
        i.length > 1 || u.length > 0 || n.specifiers.some((o) => d(o))
          ? s.push(
              y([
                "{",
                E([t.bracketSpacing ? A : F, B([",", A], i)]),
                P(le(t) ? "," : ""),
                t.bracketSpacing ? A : F,
                "}",
              ]),
            )
          : s.push([
              "{",
              t.bracketSpacing ? " " : "",
              ...i,
              t.bracketSpacing ? " " : "",
              "}",
            ]));
  } else s.push("{}");
  return s;
}
function zu(e, t) {
  let { type: r, importKind: n, source: s, specifiers: u } = e;
  return r !== "ImportDeclaration" || b(u) || n === "type"
    ? !1
    : !/{\s*}/.test(t.originalText.slice(U(e), U(s)));
}
function Qu(e, t, r) {
  var i;
  let { node: n } = e,
    s = b(n.attributes)
      ? "attributes"
      : b(n.assertions)
        ? "assertions"
        : void 0;
  return s
    ? [
        ` ${
          s === "assertions" ||
          ((i = n.extra) != null && i.deprecatedAssertSyntax)
            ? "assert"
            : "with"
        } {`,
        t.bracketSpacing ? " " : "",
        B(", ", e.map(r, s)),
        t.bracketSpacing ? " " : "",
        "}",
      ]
    : "";
}
function Zu(e, t, r) {
  let { node: n } = e,
    { type: s } = n,
    u = s.startsWith("Import"),
    i = u ? "imported" : "local",
    a = u ? "local" : "exported",
    o = n[i],
    p = n[a],
    m = "",
    D = "";
  return (
    s === "ExportNamespaceSpecifier" || s === "ImportNamespaceSpecifier"
      ? (m = "*")
      : o && (m = r(i)),
    p && !Hp(n) && (D = r(a)),
    [
      as(s === "ImportSpecifier" ? n.importKind : n.exportKind, !1),
      m,
      m && D ? " as " : "",
      D,
    ]
  );
}
function Hp(e) {
  if (e.type !== "ImportSpecifier" && e.type !== "ExportSpecifier") return !1;
  let {
    local: t,
    [e.type === "ImportSpecifier" ? "imported" : "exported"]: r,
  } = e;
  if (t.type !== r.type || !Xs(t, r)) return !1;
  if (Q(t)) return t.value === r.value && oe(t) === oe(r);
  switch (t.type) {
    case "Identifier":
      return t.name === r.name;
    default:
      return !1;
  }
}
function Kp(e) {
  let t = [e];
  for (let r = 0; r < t.length; r++) {
    let n = t[r];
    for (let s of ["test", "consequent", "alternate"]) {
      let u = n[s];
      if (Y(u)) return !0;
      u.type === "ConditionalExpression" && t.push(u);
    }
  }
  return !1;
}
function zp(e, t, r) {
  let { node: n } = e,
    s = n.type === "ConditionalExpression",
    u = s ? "alternate" : "falseType",
    { parent: i } = e,
    a = s ? r("test") : [r("checkType"), " ", "extends", " ", r("extendsType")];
  return i.type === n.type && i[u] === n ? De(2, a) : a;
}
var Qp = new Map([
  ["AssignmentExpression", "right"],
  ["VariableDeclarator", "init"],
  ["ReturnStatement", "argument"],
  ["ThrowStatement", "argument"],
  ["UnaryExpression", "argument"],
  ["YieldExpression", "argument"],
]);
function Zp(e) {
  let { node: t } = e;
  if (t.type !== "ConditionalExpression") return !1;
  let r,
    n = t;
  for (let s = 0; !r; s++) {
    let u = e.getParentNode(s);
    if (
      (u.type === "ChainExpression" && u.expression === n) ||
      (k(u) && u.callee === n) ||
      (J(u) && u.object === n) ||
      (u.type === "TSNonNullExpression" && u.expression === n)
    ) {
      n = u;
      continue;
    }
    (u.type === "NewExpression" && u.callee === n) ||
    (Le(u) && u.expression === n)
      ? ((r = e.getParentNode(s + 1)), (n = u))
      : (r = u);
  }
  return n === t ? !1 : r[Qp.get(r.type)] === n;
}
function Mt(e, t, r) {
  let { node: n } = e,
    s = n.type === "ConditionalExpression",
    u = s ? "consequent" : "trueType",
    i = s ? "alternate" : "falseType",
    a = s ? ["test"] : ["checkType", "extendsType"],
    o = n[u],
    p = n[i],
    m = [],
    D = !1,
    { parent: c } = e,
    f = c.type === n.type && a.some((V) => c[V] === n),
    l = c.type === n.type && !f,
    h,
    g,
    S = 0;
  do (g = h || n), (h = e.getParentNode(S)), S++;
  while (h && h.type === n.type && a.every((V) => h[V] !== g));
  let I = h || c,
    v = g;
  if (s && (Y(n[a[0]]) || Y(o) || Y(p) || Kp(v))) {
    (D = !0), (l = !0);
    let V = (Ee) => [P("("), E([F, Ee]), F, P(")")],
      Be = (Ee) =>
        Ee.type === "NullLiteral" ||
        (Ee.type === "Literal" && Ee.value === null) ||
        (Ee.type === "Identifier" && Ee.name === "undefined");
    m.push(
      " ? ",
      Be(o) ? r(u) : V(r(u)),
      " : ",
      p.type === n.type || Be(p) ? r(i) : V(r(i)),
    );
  } else {
    let V = [
      A,
      "? ",
      o.type === n.type ? P("", "(") : "",
      De(2, r(u)),
      o.type === n.type ? P("", ")") : "",
      A,
      ": ",
      p.type === n.type ? r(i) : De(2, r(i)),
    ];
    m.push(
      c.type !== n.type || c[i] === n || f
        ? V
        : t.useTabs
          ? Os(E(V))
          : De(Math.max(0, t.tabWidth - 2), V),
    );
  }
  let _ = [u, i, ...a].some((V) =>
      d(n[V], (Be) => ae(Be) && rt(t.originalText, U(Be), O(Be))),
    ),
    R = (V) => (c === I ? y(V, { shouldBreak: _ }) : _ ? [V, Te] : V),
    T =
      !D &&
      (J(c) || (c.type === "NGPipeExpression" && c.left === n)) &&
      !c.computed,
    N = Zp(e),
    Se = R([zp(e, t, r), l ? m : E(m), s && T && !N ? F : ""]);
  return f || N ? y([E([F, Se]), F]) : Se;
}
function ec(e, t, r = 0) {
  let n = 0;
  for (let s = r; s < e.length; ++s) e[s] === "	" ? (n = n + t - (n % t)) : n++;
  return n;
}
var ei = ec;
function tc(e, t) {
  let r = e.lastIndexOf(`
`);
  return r === -1 ? 0 : ei(e.slice(r + 1).match(/^[\t ]*/)[0], t);
}
var ti = tc;
function ri(e) {
  switch (e) {
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
var de = Symbol("MODE_BREAK"),
  nt = Symbol("MODE_FLAT"),
  rr = Symbol("cursor");
function ni() {
  return { value: "", length: 0, queue: [] };
}
function rc(e, t) {
  return ps(e, { type: "indent" }, t);
}
function nc(e, t, r) {
  return t === Number.NEGATIVE_INFINITY
    ? e.root || ni()
    : t < 0
      ? ps(e, { type: "dedent" }, r)
      : t
        ? t.type === "root"
          ? { ...e, root: e }
          : ps(
              e,
              {
                type: typeof t == "string" ? "stringAlign" : "numberAlign",
                n: t,
              },
              r,
            )
        : e;
}
function ps(e, t, r) {
  let n = t.type === "dedent" ? e.queue.slice(0, -1) : [...e.queue, t],
    s = "",
    u = 0,
    i = 0,
    a = 0;
  for (let l of n)
    switch (l.type) {
      case "indent":
        m(), r.useTabs ? o(1) : p(r.tabWidth);
        break;
      case "stringAlign":
        m(), (s += l.n), (u += l.n.length);
        break;
      case "numberAlign":
        (i += 1), (a += l.n);
        break;
      default:
        throw new Error(`Unexpected type '${l.type}'`);
    }
  return c(), { ...e, value: s, length: u, queue: n };
  function o(l) {
    (s += "	".repeat(l)), (u += r.tabWidth * l);
  }
  function p(l) {
    (s += " ".repeat(l)), (u += l);
  }
  function m() {
    r.useTabs ? D() : c();
  }
  function D() {
    i > 0 && o(i), f();
  }
  function c() {
    a > 0 && p(a), f();
  }
  function f() {
    (i = 0), (a = 0);
  }
}
function cs(e) {
  let t = 0,
    r = 0,
    n = e.length;
  e: for (; n--; ) {
    let s = e[n];
    if (s === rr) {
      r++;
      continue;
    }
    for (let u = s.length - 1; u >= 0; u--) {
      let i = s[u];
      if (i === " " || i === "	") t++;
      else {
        e[n] = s.slice(0, u + 1);
        break e;
      }
    }
  }
  if (t > 0 || r > 0) for (e.length = n + 1; r-- > 0; ) e.push(rr);
  return t;
}
function zr(e, t, r, n, s, u) {
  if (r === Number.POSITIVE_INFINITY) return !0;
  let i = t.length,
    a = [e],
    o = [];
  for (; r >= 0; ) {
    if (a.length === 0) {
      if (i === 0) return !0;
      a.push(t[--i]);
      continue;
    }
    let { mode: p, doc: m } = a.pop();
    switch (Ze(m)) {
      case Ke:
        o.push(m), (r -= tt(m));
        break;
      case je:
      case ye: {
        let D = mr(m);
        for (let c = D.length - 1; c >= 0; c--) a.push({ mode: p, doc: D[c] });
        break;
      }
      case Me:
      case Re:
      case Je:
      case be:
        a.push({ mode: p, doc: m.contents });
        break;
      case Qe:
        r += cs(o);
        break;
      case ue: {
        if (u && m.break) return !1;
        let D = m.break ? de : p,
          c =
            m.expandedStates && D === de
              ? w(!1, m.expandedStates, -1)
              : m.contents;
        a.push({ mode: D, doc: c });
        break;
      }
      case Fe: {
        let c =
          (m.groupId ? s[m.groupId] || nt : p) === de
            ? m.breakContents
            : m.flatContents;
        c && a.push({ mode: p, doc: c });
        break;
      }
      case ie:
        if (p === de || m.hard) return !0;
        m.soft || (o.push(" "), r--);
        break;
      case Ne:
        n = !0;
        break;
      case Ue:
        if (n) return !1;
        break;
    }
  }
  return !1;
}
function ls(e, t) {
  let r = {},
    n = t.printWidth,
    s = ri(t.endOfLine),
    u = 0,
    i = [{ ind: ni(), mode: de, doc: e }],
    a = [],
    o = !1,
    p = [],
    m = 0;
  for (Ms(e); i.length > 0; ) {
    let { ind: c, mode: f, doc: l } = i.pop();
    switch (Ze(l)) {
      case Ke: {
        let h =
          s !==
          `
`
            ? H(
                !1,
                l,
                `
`,
                s,
              )
            : l;
        a.push(h), i.length > 0 && (u += tt(h));
        break;
      }
      case je:
        for (let h = l.length - 1; h >= 0; h--)
          i.push({ ind: c, mode: f, doc: l[h] });
        break;
      case ze:
        if (m >= 2) throw new Error("There are too many 'cursor' in doc.");
        a.push(rr), m++;
        break;
      case Me:
        i.push({ ind: rc(c, t), mode: f, doc: l.contents });
        break;
      case Re:
        i.push({ ind: nc(c, l.n, t), mode: f, doc: l.contents });
        break;
      case Qe:
        u -= cs(a);
        break;
      case ue:
        switch (f) {
          case nt:
            if (!o) {
              i.push({ ind: c, mode: l.break ? de : nt, doc: l.contents });
              break;
            }
          case de: {
            o = !1;
            let h = { ind: c, mode: nt, doc: l.contents },
              g = n - u,
              S = p.length > 0;
            if (!l.break && zr(h, i, g, S, r)) i.push(h);
            else if (l.expandedStates) {
              let I = w(!1, l.expandedStates, -1);
              if (l.break) {
                i.push({ ind: c, mode: de, doc: I });
                break;
              } else
                for (let v = 1; v < l.expandedStates.length + 1; v++)
                  if (v >= l.expandedStates.length) {
                    i.push({ ind: c, mode: de, doc: I });
                    break;
                  } else {
                    let _ = l.expandedStates[v],
                      R = { ind: c, mode: nt, doc: _ };
                    if (zr(R, i, g, S, r)) {
                      i.push(R);
                      break;
                    }
                  }
            } else i.push({ ind: c, mode: de, doc: l.contents });
            break;
          }
        }
        l.id && (r[l.id] = w(!1, i, -1).mode);
        break;
      case ye: {
        let h = n - u,
          { parts: g } = l;
        if (g.length === 0) break;
        let [S, I] = g,
          v = { ind: c, mode: nt, doc: S },
          _ = { ind: c, mode: de, doc: S },
          R = zr(v, [], h, p.length > 0, r, !0);
        if (g.length === 1) {
          R ? i.push(v) : i.push(_);
          break;
        }
        let T = { ind: c, mode: nt, doc: I },
          N = { ind: c, mode: de, doc: I };
        if (g.length === 2) {
          R ? i.push(T, v) : i.push(N, _);
          break;
        }
        g.splice(0, 2);
        let Se = { ind: c, mode: f, doc: St(g) },
          V = g[0];
        zr({ ind: c, mode: nt, doc: [S, I, V] }, [], h, p.length > 0, r, !0)
          ? i.push(Se, T, v)
          : R
            ? i.push(Se, N, v)
            : i.push(Se, N, _);
        break;
      }
      case Fe:
      case Je: {
        let h = l.groupId ? r[l.groupId] : f;
        if (h === de) {
          let g =
            l.type === Fe
              ? l.breakContents
              : l.negate
                ? l.contents
                : E(l.contents);
          g && i.push({ ind: c, mode: f, doc: g });
        }
        if (h === nt) {
          let g =
            l.type === Fe
              ? l.flatContents
              : l.negate
                ? E(l.contents)
                : l.contents;
          g && i.push({ ind: c, mode: f, doc: g });
        }
        break;
      }
      case Ne:
        p.push({ ind: c, mode: f, doc: l.contents });
        break;
      case Ue:
        p.length > 0 && i.push({ ind: c, mode: f, doc: Sn });
        break;
      case ie:
        switch (f) {
          case nt:
            if (l.hard) o = !0;
            else {
              l.soft || (a.push(" "), (u += 1));
              break;
            }
          case de:
            if (p.length > 0) {
              i.push({ ind: c, mode: f, doc: l }, ...p.reverse()),
                (p.length = 0);
              break;
            }
            l.literal
              ? c.root
                ? (a.push(s, c.root.value), (u = c.root.length))
                : (a.push(s), (u = 0))
              : ((u -= cs(a)), a.push(s + c.value), (u = c.length));
            break;
        }
        break;
      case be:
        i.push({ ind: c, mode: f, doc: l.contents });
        break;
      case Pe:
        break;
      default:
        throw new lt(l);
    }
    i.length === 0 && p.length > 0 && (i.push(...p.reverse()), (p.length = 0));
  }
  let D = a.indexOf(rr);
  if (D !== -1) {
    let c = a.indexOf(rr, D + 1),
      f = a.slice(0, D).join(""),
      l = a.slice(D + 1, c).join(""),
      h = a.slice(c + 1).join("");
    return {
      formatted: f + l + h,
      cursorNodeStart: f.length,
      cursorNodeText: l,
    };
  }
  return { formatted: a.join("") };
}
function Qr(e, t, r) {
  let { node: n } = e;
  if (n.type === "TemplateLiteral" && ic(e)) {
    let m = sc(e, r, t);
    if (m) return m;
  }
  let u = "expressions";
  n.type === "TSTemplateLiteralType" && (u = "types");
  let i = [],
    a = e.map(t, u),
    o = eu(n);
  o &&
    (a = a.map(
      (m) => ls(m, { ...r, printWidth: Number.POSITIVE_INFINITY }).formatted,
    )),
    i.push(Ae, "`");
  let p = 0;
  return (
    e.each(({ index: m, node: D }) => {
      if ((i.push(t()), D.tail)) return;
      let { tabWidth: c } = r,
        f = D.value.raw,
        l = f.includes(`
`)
          ? ti(f, c)
          : p;
      p = l;
      let h = a[m];
      if (!o) {
        let S = n[u][m];
        (d(S) ||
          J(S) ||
          S.type === "ConditionalExpression" ||
          S.type === "SequenceExpression" ||
          Le(S) ||
          ce(S)) &&
          (h = [E([F, h]), F]);
      }
      let g =
        l === 0 &&
        f.endsWith(`
`)
          ? De(Number.NEGATIVE_INFINITY, h)
          : vs(h, l, c);
      i.push(y(["${", g, Ae, "}"]));
    }, "quasis"),
    i.push("`"),
    i
  );
}
function si(e) {
  let t = e("quasi");
  return et(t.label && { tagged: !0, ...t.label }, [
    e("tag"),
    e("typeParameters"),
    Ae,
    t,
  ]);
}
function sc(e, t, r) {
  let { node: n } = e,
    s = n.quasis[0].value.raw.trim().split(/\s*\|\s*/);
  if (s.length > 1 || s.some((u) => u.length > 0)) {
    t.__inJestEach = !0;
    let u = e.map(r, "expressions");
    t.__inJestEach = !1;
    let i = [],
      a = u.map(
        (c) =>
          "${" +
          ls(c, { ...t, printWidth: Number.POSITIVE_INFINITY, endOfLine: "lf" })
            .formatted +
          "}",
      ),
      o = [{ hasLineBreak: !1, cells: [] }];
    for (let c = 1; c < n.quasis.length; c++) {
      let f = w(!1, o, -1),
        l = a[c - 1];
      f.cells.push(l),
        l.includes(`
`) && (f.hasLineBreak = !0),
        n.quasis[c].value.raw.includes(`
`) && o.push({ hasLineBreak: !1, cells: [] });
    }
    let p = Math.max(s.length, ...o.map((c) => c.cells.length)),
      m = Array.from({ length: p }).fill(0),
      D = [{ cells: s }, ...o.filter((c) => c.cells.length > 0)];
    for (let { cells: c } of D.filter((f) => !f.hasLineBreak))
      for (let [f, l] of c.entries()) m[f] = Math.max(m[f], tt(l));
    return (
      i.push(
        Ae,
        "`",
        E([
          C,
          B(
            C,
            D.map((c) =>
              B(
                " | ",
                c.cells.map((f, l) =>
                  c.hasLineBreak ? f : f + " ".repeat(m[l] - tt(f)),
                ),
              ),
            ),
          ),
        ]),
        C,
        "`",
      ),
      i
    );
  }
}
function uc(e, t) {
  let { node: r } = e,
    n = t();
  return d(r) && (n = y([E([F, n]), F])), ["${", n, Ae, "}"];
}
function Rt(e, t) {
  return e.map((r) => uc(r, t), "expressions");
}
function Zr(e, t) {
  return ut(e, (r) =>
    typeof r == "string" ? (t ? H(!1, r, /(\\*)`/g, "$1$1\\`") : ms(r)) : r,
  );
}
function ms(e) {
  return H(!1, e, /([\\`]|\${)/g, "\\$1");
}
function ic({ node: e, parent: t }) {
  let r = /^[fx]?(?:describe|it|test)$/;
  return (
    t.type === "TaggedTemplateExpression" &&
    t.quasi === e &&
    t.tag.type === "MemberExpression" &&
    t.tag.property.type === "Identifier" &&
    t.tag.property.name === "each" &&
    ((t.tag.object.type === "Identifier" && r.test(t.tag.object.name)) ||
      (t.tag.object.type === "MemberExpression" &&
        t.tag.object.property.type === "Identifier" &&
        (t.tag.object.property.name === "only" ||
          t.tag.object.property.name === "skip") &&
        t.tag.object.object.type === "Identifier" &&
        r.test(t.tag.object.object.name)))
  );
}
function ac(e) {
  let t = new WeakMap();
  return function (r) {
    return t.has(r) || t.set(r, Symbol(e)), t.get(r);
  };
}
var en = ac;
function oc(e) {
  switch (e) {
    case null:
      return "";
    case "PlusOptional":
      return "+?";
    case "MinusOptional":
      return "-?";
    case "Optional":
      return "?";
  }
}
function ui(e, t, r) {
  let { node: n } = e;
  return y([
    n.variance ? r("variance") : "",
    "[",
    E([r("keyTparam"), " in ", r("sourceType")]),
    "]",
    oc(n.optional),
    ": ",
    r("propType"),
  ]);
}
function ys(e, t) {
  return e === "+" || e === "-" ? e + t : t;
}
function ii(e, t, r) {
  let { node: n } = e,
    s = rt(t.originalText, U(n), U(n.typeParameter));
  return y(
    [
      "{",
      E([
        t.bracketSpacing ? A : F,
        y([
          r("typeParameter"),
          n.optional ? ys(n.optional, "?") : "",
          n.typeAnnotation ? ": " : "",
          r("typeAnnotation"),
        ]),
        t.semi ? P(";") : "",
      ]),
      M(e, t),
      t.bracketSpacing ? A : F,
      "}",
    ],
    { shouldBreak: s },
  );
}
var nr = en("typeParameters");
function pc(e, t, r) {
  let { node: n } = e;
  return (
    X(n).length === 1 &&
    n.type.startsWith("TS") &&
    !n[r][0].constraint &&
    e.parent.type === "ArrowFunctionExpression" &&
    !(t.filepath && /\.ts$/.test(t.filepath))
  );
}
function gt(e, t, r, n) {
  let { node: s } = e;
  if (!s[n]) return "";
  if (!Array.isArray(s[n])) return r(n);
  let u = e.getNode(2),
    i = u && Ct(u),
    a = e.match(
      (m) => !(m[n].length === 1 && ke(m[n][0])),
      void 0,
      (m, D) => D === "typeAnnotation",
      (m) => m.type === "Identifier",
      rs,
    );
  if (
    s[n].length === 0 ||
    (!a &&
      (i ||
        (s[n].length === 1 &&
          (s[n][0].type === "NullableTypeAnnotation" || ss(s[n][0])))))
  )
    return ["<", B(", ", e.map(r, n)), cc(e, t), ">"];
  let p =
    s.type === "TSTypeParameterInstantiation"
      ? ""
      : pc(e, t, n)
        ? ","
        : le(t)
          ? P(",")
          : "";
  return y(["<", E([F, B([",", A], e.map(r, n))]), p, F, ">"], { id: nr(s) });
}
function cc(e, t) {
  let { node: r } = e;
  if (!d(r, x.Dangling)) return "";
  let n = !d(r, x.Line),
    s = M(e, t, { indent: !n });
  return n ? s : [s, C];
}
function tn(e, t, r) {
  let { node: n, parent: s } = e,
    u = [n.type === "TSTypeParameter" && n.const ? "const " : ""],
    i = n.type === "TSTypeParameter" ? r("name") : n.name;
  if (s.type === "TSMappedType")
    return (
      s.readonly && u.push(ys(s.readonly, "readonly"), " "),
      u.push("[", i),
      n.constraint && u.push(" in ", r("constraint")),
      s.nameType &&
        u.push(
          " as ",
          e.callParent(() => r("nameType")),
        ),
      u.push("]"),
      u
    );
  if (
    (n.variance && u.push(r("variance")),
    n.in && u.push("in "),
    n.out && u.push("out "),
    u.push(i),
    n.bound &&
      (n.usesExtendsBound && u.push(" extends "), u.push(q(e, r, "bound"))),
    n.constraint)
  ) {
    let a = Symbol("constraint");
    u.push(
      " extends",
      y(E(A), { id: a }),
      Ae,
      mt(r("constraint"), { groupId: a }),
    );
  }
  return n.default && u.push(" = ", r("default")), y(u);
}
var ai = new Proxy(() => {}, { get: () => ai }),
  rn = ai;
var nn = new WeakMap();
function ct(e, t, r) {
  let { node: n } = e;
  if (n.computed) return ["[", r("key"), "]"];
  let { parent: s } = e,
    { key: u } = n;
  if (t.quoteProps === "consistent" && !nn.has(s)) {
    let i = (s.properties || s.body || s.members).some(
      (a) => !a.computed && a.key && Q(a.key) && !_n(a, t),
    );
    nn.set(s, i);
  }
  if (
    (u.type === "Identifier" ||
      (he(u) &&
        jn(He(oe(u))) &&
        String(u.value) === He(oe(u)) &&
        !(t.parser === "typescript" || t.parser === "babel-ts"))) &&
    (t.parser === "json" || (t.quoteProps === "consistent" && nn.get(s)))
  ) {
    let i = Tt(
      JSON.stringify(u.type === "Identifier" ? u.name : u.value.toString()),
      t,
    );
    return e.call((a) => pe(a, i, t), "key");
  }
  return _n(n, t) &&
    (t.quoteProps === "as-needed" ||
      (t.quoteProps === "consistent" && !nn.get(s)))
    ? e.call(
        (i) => pe(i, /^\d/.test(u.value) ? He(u.value) : u.value, t),
        "key",
      )
    : r("key");
}
function oi(e, t, r) {
  let { node: n } = e;
  return n.shorthand ? r("value") : ft(e, t, r, ct(e, t, r), ":", "value");
}
var lc = (e) =>
    e.type === "ObjectMethod" ||
    e.type === "ClassMethod" ||
    e.type === "ClassPrivateMethod" ||
    e.type === "MethodDefinition" ||
    e.type === "TSAbstractMethodDefinition" ||
    e.type === "TSDeclareMethod" ||
    ((e.type === "Property" || e.type === "ObjectProperty") &&
      (e.method || e.kind === "get" || e.kind === "set")),
  mc = (e) =>
    e.node.type === "FunctionExpression" && e.key === "value" && lc(e.parent);
function sn(e, t, r, n) {
  if (mc(e)) return un(e, r, t);
  let { node: s } = e,
    u = !1;
  if (
    (s.type === "FunctionDeclaration" || s.type === "FunctionExpression") &&
    n != null &&
    n.expandLastArg
  ) {
    let { parent: m } = e;
    k(m) &&
      (Ce(m).length > 1 ||
        X(s).every((D) => D.type === "Identifier" && !D.typeAnnotation)) &&
      (u = !0);
  }
  let i = [
      Z(e),
      s.async ? "async " : "",
      `function${s.generator ? "*" : ""} `,
      s.id ? t("id") : "",
    ],
    a = ot(e, t, r, u),
    o = on(e, t),
    p = xt(s, o);
  return (
    i.push(Ve(e, r, t), y([p ? y(a) : a, o]), s.body ? " " : "", t("body")),
    r.semi && (s.declare || !s.body) && i.push(";"),
    i
  );
}
function sr(e, t, r) {
  let { node: n } = e,
    { kind: s } = n,
    u = n.value || n,
    i = [];
  return (
    !s || s === "init" || s === "method" || s === "constructor"
      ? u.async && i.push("async ")
      : (rn.ok(s === "get" || s === "set"), i.push(s, " ")),
    u.generator && i.push("*"),
    i.push(
      ct(e, t, r),
      n.optional || n.key.optional ? "?" : "",
      n === u ? un(e, t, r) : r("value"),
    ),
    i
  );
}
function un(e, t, r) {
  let { node: n } = e,
    s = ot(e, r, t),
    u = on(e, r),
    i = Nu(n),
    a = xt(n, u),
    o = [Ve(e, t, r), y([i ? y(s, { shouldBreak: !0 }) : a ? y(s) : s, u])];
  return n.body ? o.push(" ", r("body")) : o.push(t.semi ? ";" : ""), o;
}
function yc(e) {
  let t = X(e);
  return (
    t.length === 1 &&
    !e.typeParameters &&
    !d(e, x.Dangling) &&
    t[0].type === "Identifier" &&
    !t[0].typeAnnotation &&
    !d(t[0]) &&
    !t[0].optional &&
    !e.predicate &&
    !e.returnType
  );
}
function an(e, t) {
  if (t.arrowParens === "always") return !1;
  if (t.arrowParens === "avoid") {
    let { node: r } = e;
    return yc(r);
  }
  return !1;
}
function on(e, t) {
  let { node: r } = e,
    s = [q(e, t, "returnType")];
  return r.predicate && s.push(t("predicate")), s;
}
function pi(e, t, r) {
  let { node: n } = e,
    s = t.semi ? ";" : "",
    u = [];
  if (n.argument) {
    let o = r("argument");
    Dc(t, n.argument)
      ? (o = ["(", E([C, o]), C, ")"])
      : (ce(n.argument) || n.argument.type === "SequenceExpression") &&
        (o = y([P("("), E([F, o]), F, P(")")])),
      u.push(" ", o);
  }
  let i = d(n, x.Dangling),
    a = s && i && d(n, x.Last | x.Line);
  return a && u.push(s), i && u.push(" ", M(e, t)), a || u.push(s), u;
}
function ci(e, t, r) {
  return ["return", pi(e, t, r)];
}
function li(e, t, r) {
  return ["throw", pi(e, t, r)];
}
function Dc(e, t) {
  if (
    Ie(e.originalText, t) ||
    (d(t, x.Leading, (r) => rt(e.originalText, U(r), O(r))) && !Y(t))
  )
    return !0;
  if (Lt(t)) {
    let r = t,
      n;
    for (; (n = zs(r)); ) if (((r = n), Ie(e.originalText, r))) return !0;
  }
  return !1;
}
var mi = j([
  "ClassProperty",
  "PropertyDefinition",
  "ClassPrivateProperty",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractPropertyDefinition",
  "TSAbstractAccessorProperty",
]);
function pn(e, t, r) {
  let { node: n } = e,
    s = [Z(e), _t(e), "class"],
    u =
      d(n.id, x.Trailing) ||
      d(n.typeParameters, x.Trailing) ||
      d(n.superClass) ||
      b(n.extends) ||
      b(n.mixins) ||
      b(n.implements),
    i = [],
    a = [];
  if (
    (n.id && i.push(" ", r("id")), i.push(r("typeParameters")), n.superClass)
  ) {
    let o = [Ec(e, t, r), r("superTypeParameters")],
      p = e.call((m) => ["extends ", pe(m, o, t)], "superClass");
    u ? a.push(A, y(p)) : a.push(" ", p);
  } else a.push(Ds(e, t, r, "extends"));
  if ((a.push(Ds(e, t, r, "mixins"), Ds(e, t, r, "implements")), u)) {
    let o;
    Di(n) ? (o = [...i, E(a)]) : (o = E([...i, a])),
      s.push(y(o, { id: yi(n) }));
  } else s.push(...i, ...a);
  return s.push(" ", r("body")), s;
}
var yi = en("heritageGroup");
function fs(e) {
  return P(C, "", { groupId: yi(e) });
}
function fc(e) {
  return (
    ["extends", "mixins", "implements"].reduce(
      (t, r) => t + (Array.isArray(e[r]) ? e[r].length : 0),
      e.superClass ? 1 : 0,
    ) > 1
  );
}
function Di(e) {
  return (
    e.typeParameters && !d(e.typeParameters, x.Trailing | x.Line) && !fc(e)
  );
}
function Ds(e, t, r, n) {
  let { node: s } = e;
  if (!b(s[n])) return "";
  let u = M(e, t, { marker: n });
  return [
    Di(s) ? P(" ", A, { groupId: nr(s.typeParameters) }) : A,
    u,
    u && C,
    n,
    y(E([A, B([",", A], e.map(r, n))])),
  ];
}
function Ec(e, t, r) {
  let n = r("superClass"),
    { parent: s } = e;
  return s.type === "AssignmentExpression"
    ? y(P(["(", E([F, n]), F, ")"], n))
    : n;
}
function cn(e, t, r) {
  let { node: n } = e,
    s = [];
  return (
    b(n.decorators) && s.push(is(e, t, r)),
    s.push(jt(n)),
    n.static && s.push("static "),
    s.push(_t(e)),
    n.override && s.push("override "),
    s.push(sr(e, t, r)),
    s
  );
}
function ln(e, t, r) {
  let { node: n } = e,
    s = [],
    u = t.semi ? ";" : "";
  b(n.decorators) && s.push(is(e, t, r)),
    s.push(jt(n), Z(e)),
    n.static && s.push("static "),
    s.push(_t(e)),
    n.override && s.push("override "),
    n.readonly && s.push("readonly "),
    n.variance && s.push(r("variance")),
    (n.type === "ClassAccessorProperty" ||
      n.type === "AccessorProperty" ||
      n.type === "TSAbstractAccessorProperty") &&
      s.push("accessor "),
    s.push(ct(e, t, r), $(e), Vr(e), q(e, r));
  let i =
    n.type === "TSAbstractPropertyDefinition" ||
    n.type === "TSAbstractAccessorProperty";
  return [ft(e, t, r, s, " =", i ? void 0 : "value"), u];
}
function fi(e, t, r) {
  let { node: n } = e,
    s = [];
  return (
    e.each(({ node: u, next: i, isLast: a }) => {
      s.push(r()),
        !t.semi && mi(u) && Fc(u, i) && s.push(";"),
        a || (s.push(C), me(u, t) && s.push(C));
    }, "body"),
    d(n, x.Dangling) && s.push(M(e, t)),
    [
      b(n.body) ? fs(e.parent) : "",
      "{",
      s.length > 0 ? [E([C, s]), C] : "",
      "}",
    ]
  );
}
function Fc(e, t) {
  var s;
  let { type: r, name: n } = e.key;
  if (
    !e.computed &&
    r === "Identifier" &&
    (n === "static" || n === "get" || n === "set") &&
    !e.value &&
    !e.typeAnnotation
  )
    return !0;
  if (!t || t.static || t.accessibility) return !1;
  if (!t.computed) {
    let u = (s = t.key) == null ? void 0 : s.name;
    if (u === "in" || u === "instanceof") return !0;
  }
  if (mi(t) && t.variance && !t.static && !t.declare) return !0;
  switch (t.type) {
    case "ClassProperty":
    case "PropertyDefinition":
    case "TSAbstractPropertyDefinition":
      return t.computed;
    case "MethodDefinition":
    case "TSAbstractMethodDefinition":
    case "ClassMethod":
    case "ClassPrivateMethod": {
      if (
        (t.value ? t.value.async : t.async) ||
        t.kind === "get" ||
        t.kind === "set"
      )
        return !1;
      let i = t.value ? t.value.generator : t.generator;
      return !!(t.computed || i);
    }
    case "TSIndexSignature":
      return !0;
  }
  return !1;
}
function Et(e, t, r) {
  var R;
  let n = t.semi ? ";" : "",
    { node: s } = e,
    u = s.type === "ObjectTypeAnnotation",
    i =
      s.type === "TSEnumDeclaration" ||
      s.type === "EnumBooleanBody" ||
      s.type === "EnumNumberBody" ||
      s.type === "EnumStringBody" ||
      s.type === "EnumSymbolBody",
    a = [
      s.type === "TSTypeLiteral" || i
        ? "members"
        : s.type === "TSInterfaceBody"
          ? "body"
          : "properties",
    ];
  u && a.push("indexers", "callProperties", "internalSlots");
  let o = a.flatMap((T) =>
    e.map(({ node: N }) => ({ node: N, printed: r(), loc: U(N) }), T),
  );
  a.length > 1 && o.sort((T, N) => T.loc - N.loc);
  let { parent: p, key: m } = e,
    D =
      u &&
      m === "body" &&
      (p.type === "InterfaceDeclaration" ||
        p.type === "DeclareInterface" ||
        p.type === "DeclareClass"),
    c =
      s.type === "TSInterfaceBody" ||
      i ||
      D ||
      (s.type === "ObjectPattern" &&
        p.type !== "FunctionDeclaration" &&
        p.type !== "FunctionExpression" &&
        p.type !== "ArrowFunctionExpression" &&
        p.type !== "ObjectMethod" &&
        p.type !== "ClassMethod" &&
        p.type !== "ClassPrivateMethod" &&
        p.type !== "AssignmentPattern" &&
        p.type !== "CatchClause" &&
        s.properties.some(
          (T) =>
            T.value &&
            (T.value.type === "ObjectPattern" ||
              T.value.type === "ArrayPattern"),
        )) ||
      (s.type !== "ObjectPattern" &&
        o.length > 0 &&
        rt(t.originalText, U(s), o[0].loc)),
    f = D
      ? ";"
      : s.type === "TSInterfaceBody" || s.type === "TSTypeLiteral"
        ? P(n, ";")
        : ",",
    l = s.type === "RecordExpression" ? "#{" : s.exact ? "{|" : "{",
    h = s.exact ? "|}" : "}",
    g = [],
    S = o.map((T) => {
      let N = [...g, y(T.printed)];
      return (
        (g = [f, A]),
        (T.node.type === "TSPropertySignature" ||
          T.node.type === "TSMethodSignature" ||
          T.node.type === "TSConstructSignatureDeclaration" ||
          T.node.type === "TSCallSignatureDeclaration") &&
          d(T.node, x.PrettierIgnore) &&
          g.shift(),
        me(T.node, t) && g.push(C),
        N
      );
    });
  if (s.inexact || s.hasUnknownMembers) {
    let T;
    if (d(s, x.Dangling)) {
      let N = d(s, x.Line);
      T = [M(e, t), N || z(t.originalText, O(w(!1, Kt(s), -1))) ? C : A, "..."];
    } else T = ["..."];
    S.push([...g, ...T]);
  }
  let I = (R = w(!1, o, -1)) == null ? void 0 : R.node,
    v = !(
      s.inexact ||
      s.hasUnknownMembers ||
      (I &&
        (I.type === "RestElement" ||
          ((I.type === "TSPropertySignature" ||
            I.type === "TSCallSignatureDeclaration" ||
            I.type === "TSMethodSignature" ||
            I.type === "TSConstructSignatureDeclaration") &&
            d(I, x.PrettierIgnore))))
    ),
    _;
  if (S.length === 0) {
    if (!d(s, x.Dangling)) return [l, h, q(e, r)];
    _ = y([l, M(e, t, { indent: !0 }), F, h, $(e), q(e, r)]);
  } else
    _ = [
      D && b(s.properties) ? fs(p) : "",
      l,
      E([t.bracketSpacing ? A : F, ...S]),
      P(v && (f !== "," || le(t)) ? f : ""),
      t.bracketSpacing ? A : F,
      h,
      $(e),
      q(e, r),
    ];
  return e.match((T) => T.type === "ObjectPattern" && !b(T.decorators), Es) ||
    (ke(s) &&
      (e.match(
        void 0,
        (T, N) => N === "typeAnnotation",
        (T, N) => N === "typeAnnotation",
        Es,
      ) ||
        e.match(
          void 0,
          (T, N) => T.type === "FunctionTypeParam" && N === "typeAnnotation",
          Es,
        ))) ||
    (!c &&
      e.match(
        (T) => T.type === "ObjectPattern",
        (T) =>
          T.type === "AssignmentExpression" || T.type === "VariableDeclarator",
      ))
    ? _
    : y(_, { shouldBreak: c });
}
function Es(e, t) {
  return (
    (t === "params" || t === "parameters" || t === "this" || t === "rest") &&
    ns(e)
  );
}
var Fs = new WeakMap();
function Ei(e) {
  return (
    Fs.has(e) ||
      Fs.set(
        e,
        e.type === "ConditionalExpression" &&
          !re(e, (t) => t.type === "ObjectExpression"),
      ),
    Fs.get(e)
  );
}
var Fi = (e) => e.type === "SequenceExpression";
function Ci(e, t, r, n = {}) {
  let s = [],
    u,
    i = [],
    a = !1,
    o = !n.expandLastArg && e.node.body.type === "ArrowFunctionExpression",
    p;
  (function g() {
    let { node: S } = e,
      I = Cc(e, t, r, n);
    if (s.length === 0) s.push(I);
    else {
      let { leading: v, trailing: _ } = Nn(e, t);
      s.push([v, I]), i.unshift(_);
    }
    o &&
      (a ||
        (a =
          (S.returnType && X(S).length > 0) ||
          S.typeParameters ||
          X(S).some((v) => v.type !== "Identifier"))),
      !o || S.body.type !== "ArrowFunctionExpression"
        ? ((u = r("body", n)), (p = S.body))
        : e.call(g, "body");
  })();
  let m = !Ie(t.originalText, p) && (Fi(p) || dc(p, u, t) || (!a && Ei(p))),
    D = e.key === "callee" && it(e.parent),
    c = Symbol("arrow-chain"),
    f = Ac(e, n, { signatureDocs: s, shouldBreak: a }),
    l,
    h = !1;
  return (
    o &&
      (D || n.assignmentLayout) &&
      ((h = !0),
      (l = n.assignmentLayout === "chain-tail-arrow-chain" || (D && !m))),
    (u = Tc(e, t, n, {
      bodyDoc: u,
      bodyComments: i,
      functionBody: p,
      shouldPutBodyOnSameLine: m,
    })),
    y([
      y(h ? E([F, f]) : f, { shouldBreak: l, id: c }),
      " =>",
      o ? mt(u, { groupId: c }) : y(u),
      o && D ? P(F, "", { groupId: c }) : "",
    ])
  );
}
function Cc(e, t, r, n) {
  let { node: s } = e,
    u = [];
  if ((s.async && u.push("async "), an(e, t))) u.push(r(["params", 0]));
  else {
    let a = n.expandLastArg || n.expandFirstArg,
      o = on(e, r);
    if (a) {
      if (K(o)) throw new at();
      o = y(Ut(o));
    }
    u.push(y([ot(e, r, t, a, !0), o]));
  }
  let i = M(e, t, {
    filter(a) {
      let o = Xe(t.originalText, O(a));
      return o !== !1 && t.originalText.slice(o, o + 2) === "=>";
    },
  });
  return i && u.push(" ", i), u;
}
function dc(e, t, r) {
  var n, s;
  return (
    G(e) ||
    ee(e) ||
    e.type === "ArrowFunctionExpression" ||
    e.type === "DoExpression" ||
    e.type === "BlockStatement" ||
    Y(e) ||
    (((n = t.label) == null ? void 0 : n.hug) !== !1 &&
      (((s = t.label) == null ? void 0 : s.embed) || xr(e, r.originalText)))
  );
}
function Ac(e, t, { signatureDocs: r, shouldBreak: n }) {
  if (r.length === 1) return r[0];
  let { parent: s, key: u } = e;
  return (u !== "callee" && it(s)) || ce(s)
    ? y([r[0], " =>", E([A, B([" =>", A], r.slice(1))])], { shouldBreak: n })
    : (u === "callee" && it(s)) || t.assignmentLayout
      ? y(B([" =>", A], r), { shouldBreak: n })
      : y(E(B([" =>", A], r)), { shouldBreak: n });
}
function Tc(
  e,
  t,
  r,
  { bodyDoc: n, bodyComments: s, functionBody: u, shouldPutBodyOnSameLine: i },
) {
  let { node: a, parent: o } = e,
    p = r.expandLastArg && le(t, "all") ? P(",") : "",
    m =
      (r.expandLastArg || o.type === "JSXExpressionContainer") && !d(a)
        ? F
        : "";
  return i && Ei(u)
    ? [" ", y([P("", "("), E([F, n]), P("", ")"), p, m]), s]
    : (Fi(u) && (n = y(["(", E([F, n]), F, ")"])),
      i ? [" ", n, s] : [E([A, n, s]), p, m]);
}
function ur(e, t, r, n) {
  let { node: s } = e,
    u = [],
    i = xc(s[n]);
  return (
    e.each(({ node: a }) => {
      a.type !== "EmptyStatement" &&
        (u.push(r()), a !== i && (u.push(C), me(a, t) && u.push(C)));
    }, n),
    u
  );
}
function xc(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let r = e[t];
    if (r.type !== "EmptyStatement") return r;
  }
}
function mn(e, t, r) {
  let { node: n } = e,
    s = [];
  n.type === "StaticBlock" && s.push("static "), s.push("{");
  let u = Cs(e, t, r);
  if (u) s.push(E([C, u]), C);
  else {
    let { parent: i } = e,
      a = e.grandparent;
    i.type === "ArrowFunctionExpression" ||
      i.type === "FunctionExpression" ||
      i.type === "FunctionDeclaration" ||
      i.type === "ObjectMethod" ||
      i.type === "ClassMethod" ||
      i.type === "ClassPrivateMethod" ||
      i.type === "ForStatement" ||
      i.type === "WhileStatement" ||
      i.type === "DoWhileStatement" ||
      i.type === "DoExpression" ||
      (i.type === "CatchClause" && !a.finalizer) ||
      i.type === "TSModuleDeclaration" ||
      i.type === "TSDeclareFunction" ||
      n.type === "StaticBlock" ||
      s.push(C);
  }
  return s.push("}"), s;
}
function Cs(e, t, r) {
  var o;
  let { node: n } = e,
    s = b(n.directives),
    u = n.body.some((p) => p.type !== "EmptyStatement"),
    i = d(n, x.Dangling);
  if (!s && !u && !i) return "";
  let a = [];
  return (
    s &&
      (a.push(ur(e, t, r, "directives")),
      (u || i) && (a.push(C), me(w(!1, n.directives, -1), t) && a.push(C))),
    u && a.push(ur(e, t, r, "body")),
    i && a.push(M(e, t)),
    n.type === "Program" &&
      ((o = e.parent) == null ? void 0 : o.type) !== "ModuleExpression" &&
      a.push(C),
    a
  );
}
function di(e, t) {
  if (t.semi || ds(e, t) || Ts(e, t)) return !1;
  let { node: r, key: n, parent: s } = e;
  return !!(
    r.type === "ExpressionStatement" &&
    ((n === "body" &&
      (s.type === "Program" ||
        s.type === "BlockStatement" ||
        s.type === "StaticBlock" ||
        s.type === "TSModuleBlock")) ||
      (n === "consequent" && s.type === "SwitchCase")) &&
    e.call(() => Ai(e, t), "expression")
  );
}
function Ai(e, t) {
  let { node: r } = e;
  switch (r.type) {
    case "ParenthesizedExpression":
    case "TypeCastExpression":
    case "ArrayExpression":
    case "ArrayPattern":
    case "TemplateLiteral":
    case "TemplateElement":
    case "RegExpLiteral":
      return !0;
    case "ArrowFunctionExpression":
      if (!an(e, t)) return !0;
      break;
    case "UnaryExpression": {
      let { prefix: n, operator: s } = r;
      if (n && (s === "+" || s === "-")) return !0;
      break;
    }
    case "BindExpression":
      if (!r.object) return !0;
      break;
    case "Literal":
      if (r.regex) return !0;
      break;
    default:
      if (Y(r)) return !0;
  }
  return we(e, t) ? !0 : Lt(r) ? e.call(() => Ai(e, t), ...dr(r)) : !1;
}
function ds({ node: e, parent: t }, r) {
  return (
    (r.parentParser === "markdown" || r.parentParser === "mdx") &&
    e.type === "ExpressionStatement" &&
    Y(e.expression) &&
    t.type === "Program" &&
    t.body.length === 1
  );
}
function As(e) {
  switch (e.type) {
    case "MemberExpression":
      switch (e.property.type) {
        case "Identifier":
        case "NumericLiteral":
        case "StringLiteral":
          return As(e.object);
      }
      return !1;
    case "Identifier":
      return !0;
    default:
      return !1;
  }
}
function Ts({ node: e, parent: t }, r) {
  return (
    (r.parser === "__vue_event_binding" ||
      r.parser === "__vue_ts_event_binding") &&
    e.type === "ExpressionStatement" &&
    t.type === "Program" &&
    t.body.length === 1
  );
}
function Ti(e, t, r) {
  let n = [r("expression")];
  return (
    Ts(e, t)
      ? As(e.node.expression) && n.push(";")
      : ds(e, t) || (t.semi && n.push(";")),
    d(e.node, x.Dangling, ({ marker: s }) => s === zt) &&
      n.push(" ", M(e, t, { marker: zt })),
    n
  );
}
function xi(e, t, r) {
  if (t.__isVueBindings || t.__isVueForBindingLeft) {
    let n = e.map(r, "program", "body", 0, "params");
    if (n.length === 1) return n[0];
    let s = B([",", A], n);
    return t.__isVueForBindingLeft ? ["(", E([F, y(s)]), F, ")"] : s;
  }
  if (t.__isEmbeddedTypescriptGenericParameters) {
    let n = e.map(r, "program", "body", 0, "typeParameters", "params");
    return B([",", A], n);
  }
}
function gi(e, t, r, n) {
  let { node: s } = e;
  if (vr(s)) return vu(e, t);
  let u = t.semi ? ";" : "",
    i = [];
  switch (s.type) {
    case "JsExpressionRoot":
      return r("node");
    case "JsonRoot":
      return [r("node"), C];
    case "File":
      return xi(e, t, r) ?? r("program");
    case "Program":
      return Cs(e, t, r);
    case "EmptyStatement":
      return "";
    case "ExpressionStatement":
      return Ti(e, t, r);
    case "ChainExpression":
      return r("expression");
    case "ParenthesizedExpression":
      return !d(s.expression) && (ee(s.expression) || G(s.expression))
        ? ["(", r("expression"), ")"]
        : y(["(", E([F, r("expression")]), F, ")"]);
    case "AssignmentExpression":
      return ju(e, t, r);
    case "VariableDeclarator":
      return Mu(e, t, r);
    case "BinaryExpression":
    case "LogicalExpression":
      return Ir(e, t, r);
    case "AssignmentPattern":
      return [r("left"), " = ", r("right")];
    case "OptionalMemberExpression":
    case "MemberExpression":
      return ku(e, t, r);
    case "MetaProperty":
      return [r("meta"), ".", r("property")];
    case "BindExpression":
      return s.object && i.push(r("object")), i.push(y(E([F, Lr(e, t, r)]))), i;
    case "Identifier":
      return [s.name, $(e), Vr(e), q(e, r)];
    case "V8IntrinsicIdentifier":
      return ["%", s.name];
    case "SpreadElement":
    case "SpreadElementPattern":
    case "SpreadPropertyPattern":
    case "RestElement":
      return Hr(e, r);
    case "FunctionDeclaration":
    case "FunctionExpression":
      return sn(e, r, t, n);
    case "ArrowFunctionExpression":
      return Ci(e, t, r, n);
    case "YieldExpression":
      return (
        i.push("yield"),
        s.delegate && i.push("*"),
        s.argument && i.push(" ", r("argument")),
        i
      );
    case "AwaitExpression":
      if ((i.push("await"), s.argument)) {
        i.push(" ", r("argument"));
        let { parent: a } = e;
        if ((k(a) && a.callee === s) || (J(a) && a.object === s)) {
          i = [E([F, ...i]), F];
          let o = e.findAncestor(
            (p) => p.type === "AwaitExpression" || p.type === "BlockStatement",
          );
          if (
            (o == null ? void 0 : o.type) !== "AwaitExpression" ||
            !re(o.argument, (p) => p === s)
          )
            return y(i);
        }
      }
      return i;
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ExportAllDeclaration":
      return Kr(e, t, r);
    case "ImportDeclaration":
      return $u(e, t, r);
    case "ImportSpecifier":
    case "ExportSpecifier":
    case "ImportNamespaceSpecifier":
    case "ExportNamespaceSpecifier":
    case "ImportDefaultSpecifier":
    case "ExportDefaultSpecifier":
      return Zu(e, t, r);
    case "ImportAttribute":
      return [r("key"), ": ", r("value")];
    case "Import":
      return "import";
    case "BlockStatement":
    case "StaticBlock":
      return mn(e, t, r);
    case "ClassBody":
      return fi(e, t, r);
    case "ThrowStatement":
      return li(e, t, r);
    case "ReturnStatement":
      return ci(e, t, r);
    case "NewExpression":
    case "ImportExpression":
    case "OptionalCallExpression":
    case "CallExpression":
      return wr(e, t, r);
    case "ObjectExpression":
    case "ObjectPattern":
    case "RecordExpression":
      return Et(e, t, r);
    case "ObjectProperty":
    case "Property":
      return s.method || s.kind === "get" || s.kind === "set"
        ? sr(e, t, r)
        : oi(e, t, r);
    case "ObjectMethod":
      return sr(e, t, r);
    case "Decorator":
      return ["@", r("expression")];
    case "ArrayExpression":
    case "ArrayPattern":
    case "TupleExpression":
      return vt(e, t, r);
    case "SequenceExpression": {
      let { parent: a } = e;
      if (a.type === "ExpressionStatement" || a.type === "ForStatement") {
        let o = [];
        return (
          e.each(({ isFirst: p }) => {
            p ? o.push(r()) : o.push(",", E([A, r()]));
          }, "expressions"),
          y(o)
        );
      }
      return y(B([",", A], e.map(r, "expressions")));
    }
    case "ThisExpression":
      return "this";
    case "Super":
      return "super";
    case "Directive":
      return [r("value"), u];
    case "UnaryExpression":
      return (
        i.push(s.operator),
        /[a-z]$/.test(s.operator) && i.push(" "),
        d(s.argument)
          ? i.push(y(["(", E([F, r("argument")]), F, ")"]))
          : i.push(r("argument")),
        i
      );
    case "UpdateExpression":
      return i.push(r("argument"), s.operator), s.prefix && i.reverse(), i;
    case "ConditionalExpression":
      return Mt(e, t, r);
    case "VariableDeclaration": {
      let a = e.map(r, "declarations"),
        o = e.parent,
        p =
          o.type === "ForStatement" ||
          o.type === "ForInStatement" ||
          o.type === "ForOfStatement",
        m = s.declarations.some((c) => c.init),
        D;
      return (
        a.length === 1 && !d(s.declarations[0])
          ? (D = a[0])
          : a.length > 0 && (D = E(a[0])),
        (i = [
          Z(e),
          s.kind,
          D ? [" ", D] : "",
          E(a.slice(1).map((c) => [",", m && !p ? C : A, c])),
        ]),
        (p && o.body !== s) || i.push(u),
        y(i)
      );
    }
    case "WithStatement":
      return y(["with (", r("object"), ")", pt(s.body, r("body"))]);
    case "IfStatement": {
      let a = pt(s.consequent, r("consequent")),
        o = y(["if (", y([E([F, r("test")]), F]), ")", a]);
      if ((i.push(o), s.alternate)) {
        let p = d(s.consequent, x.Trailing | x.Line) || gr(s),
          m = s.consequent.type === "BlockStatement" && !p;
        i.push(m ? " " : C),
          d(s, x.Dangling) && i.push(M(e, t), p ? C : " "),
          i.push(
            "else",
            y(
              pt(
                s.alternate,
                r("alternate"),
                s.alternate.type === "IfStatement",
              ),
            ),
          );
      }
      return i;
    }
    case "ForStatement": {
      let a = pt(s.body, r("body")),
        o = M(e, t),
        p = o ? [o, F] : "";
      return !s.init && !s.test && !s.update
        ? [p, y(["for (;;)", a])]
        : [
            p,
            y([
              "for (",
              y([E([F, r("init"), ";", A, r("test"), ";", A, r("update")]), F]),
              ")",
              a,
            ]),
          ];
    }
    case "WhileStatement":
      return y([
        "while (",
        y([E([F, r("test")]), F]),
        ")",
        pt(s.body, r("body")),
      ]);
    case "ForInStatement":
      return y([
        "for (",
        r("left"),
        " in ",
        r("right"),
        ")",
        pt(s.body, r("body")),
      ]);
    case "ForOfStatement":
      return y([
        "for",
        s.await ? " await" : "",
        " (",
        r("left"),
        " of ",
        r("right"),
        ")",
        pt(s.body, r("body")),
      ]);
    case "DoWhileStatement": {
      let a = pt(s.body, r("body"));
      return (
        (i = [y(["do", a])]),
        s.body.type === "BlockStatement" ? i.push(" ") : i.push(C),
        i.push("while (", y([E([F, r("test")]), F]), ")", u),
        i
      );
    }
    case "DoExpression":
      return [s.async ? "async " : "", "do ", r("body")];
    case "BreakStatement":
    case "ContinueStatement":
      return (
        i.push(s.type === "BreakStatement" ? "break" : "continue"),
        s.label && i.push(" ", r("label")),
        i.push(u),
        i
      );
    case "LabeledStatement":
      return s.body.type === "EmptyStatement"
        ? [r("label"), ":;"]
        : [r("label"), ": ", r("body")];
    case "TryStatement":
      return [
        "try ",
        r("block"),
        s.handler ? [" ", r("handler")] : "",
        s.finalizer ? [" finally ", r("finalizer")] : "",
      ];
    case "CatchClause":
      if (s.param) {
        let a = d(
            s.param,
            (p) =>
              !ae(p) ||
              (p.leading && z(t.originalText, O(p))) ||
              (p.trailing && z(t.originalText, U(p), { backwards: !0 })),
          ),
          o = r("param");
        return [
          "catch ",
          a ? ["(", E([F, o]), F, ") "] : ["(", o, ") "],
          r("body"),
        ];
      }
      return ["catch ", r("body")];
    case "SwitchStatement":
      return [
        y(["switch (", E([F, r("discriminant")]), F, ")"]),
        " {",
        s.cases.length > 0
          ? E([
              C,
              B(
                C,
                e.map(
                  ({ node: a, isLast: o }) => [r(), !o && me(a, t) ? C : ""],
                  "cases",
                ),
              ),
            ])
          : "",
        C,
        "}",
      ];
    case "SwitchCase": {
      s.test ? i.push("case ", r("test"), ":") : i.push("default:"),
        d(s, x.Dangling) && i.push(" ", M(e, t));
      let a = s.consequent.filter((o) => o.type !== "EmptyStatement");
      if (a.length > 0) {
        let o = ur(e, t, r, "consequent");
        i.push(
          a.length === 1 && a[0].type === "BlockStatement"
            ? [" ", o]
            : E([C, o]),
        );
      }
      return i;
    }
    case "DebuggerStatement":
      return ["debugger", u];
    case "ClassDeclaration":
    case "ClassExpression":
      return pn(e, t, r);
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "MethodDefinition":
      return cn(e, t, r);
    case "ClassProperty":
    case "PropertyDefinition":
    case "ClassPrivateProperty":
    case "ClassAccessorProperty":
    case "AccessorProperty":
      return ln(e, t, r);
    case "TemplateElement":
      return xe(s.value.raw);
    case "TemplateLiteral":
      return Qr(e, r, t);
    case "TaggedTemplateExpression":
      return si(r);
    case "PrivateIdentifier":
      return ["#", s.name];
    case "PrivateName":
      return ["#", r("id")];
    case "TopicReference":
      return "%";
    case "ArgumentPlaceholder":
      return "?";
    case "ModuleExpression": {
      i.push("module {");
      let a = r("body");
      return a && i.push(E([C, a]), C), i.push("}"), i;
    }
    case "InterpreterDirective":
    default:
      throw new Oe(s, "ESTree");
  }
}
function Si(e, t, r) {
  let { node: n } = e;
  if (n.type.startsWith("NG"))
    switch (n.type) {
      case "NGRoot":
        return [
          r("node"),
          d(n.node) ? " //" + Kt(n.node)[0].value.trimEnd() : "",
        ];
      case "NGPipeExpression":
        return Ir(e, t, r);
      case "NGChainedExpression":
        return y(
          B(
            [";", A],
            e.map(() => (hc(e) ? r() : ["(", r(), ")"]), "expressions"),
          ),
        );
      case "NGEmptyExpression":
        return "";
      case "NGMicrosyntax":
        return e.map(
          () => [e.isFirst ? "" : hi(e) ? " " : [";", A], r()],
          "body",
        );
      case "NGMicrosyntaxKey":
        return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/i.test(n.name)
          ? n.name
          : JSON.stringify(n.name);
      case "NGMicrosyntaxExpression":
        return [r("expression"), n.alias === null ? "" : [" as ", r("alias")]];
      case "NGMicrosyntaxKeyedExpression": {
        let { index: s, parent: u } = e,
          i =
            hi(e) ||
            (((s === 1 && (n.key.name === "then" || n.key.name === "else")) ||
              (s === 2 &&
                n.key.name === "else" &&
                u.body[s - 1].type === "NGMicrosyntaxKeyedExpression" &&
                u.body[s - 1].key.name === "then")) &&
              u.body[0].type === "NGMicrosyntaxExpression");
        return [r("key"), i ? " " : ": ", r("expression")];
      }
      case "NGMicrosyntaxLet":
        return ["let ", r("key"), n.value === null ? "" : [" = ", r("value")]];
      case "NGMicrosyntaxAs":
        return [r("key"), " as ", r("alias")];
      default:
        throw new Oe(n, "Angular");
    }
}
function hi({ node: e, index: t, parent: r }) {
  return (
    e.type === "NGMicrosyntaxKeyedExpression" &&
    e.key.name === "of" &&
    t === 1 &&
    r.body[0].type === "NGMicrosyntaxLet" &&
    r.body[0].value === null
  );
}
var gc = j([
  "CallExpression",
  "OptionalCallExpression",
  "AssignmentExpression",
]);
function hc({ node: e }) {
  return Xt(e, gc);
}
function yn(e, t, r) {
  let { node: n } = e,
    s = [Z(e), "interface"],
    u = [],
    i = [];
  n.type !== "InterfaceTypeAnnotation" &&
    u.push(" ", r("id"), r("typeParameters"));
  let a = n.typeParameters && !d(n.typeParameters, x.Trailing | x.Line);
  return (
    b(n.extends) &&
      i.push(
        a ? P(" ", A, { groupId: nr(n.typeParameters) }) : A,
        "extends ",
        (n.extends.length === 1 ? ru : E)(B([",", A], e.map(r, "extends"))),
      ),
    d(n.id, x.Trailing) || b(n.extends)
      ? a
        ? s.push(y([...u, E(i)]))
        : s.push(y(E([...u, ...i])))
      : s.push(...u, ...i),
    s.push(" ", r("body")),
    y(s)
  );
}
function Bi(e, t, r) {
  return Et(e, r, t);
}
function Dn(e, t) {
  let { node: r } = e,
    n = t("id");
  r.computed && (n = ["[", n, "]"]);
  let s = "";
  return (
    r.initializer && (s = t("initializer")),
    r.init && (s = t("init")),
    s ? [n, " = ", s] : n
  );
}
function bi(e, t, r) {
  let { node: n } = e,
    s;
  if (n.type === "EnumSymbolBody" || n.explicitType)
    switch (n.type) {
      case "EnumBooleanBody":
        s = "boolean";
        break;
      case "EnumNumberBody":
        s = "number";
        break;
      case "EnumStringBody":
        s = "string";
        break;
      case "EnumSymbolBody":
        s = "symbol";
        break;
    }
  return [s ? `of ${s} ` : "", Bi(e, t, r)];
}
function fn(e, t, r) {
  let { node: n } = e;
  return [
    Z(e),
    n.const ? "const " : "",
    "enum ",
    t("id"),
    " ",
    n.type === "TSEnumDeclaration" ? Bi(e, t, r) : t("body"),
  ];
}
function Pi(e, t, r) {
  let { node: n } = e;
  if (Er(n)) return n.type.slice(0, -14).toLowerCase();
  let s = t.semi ? ";" : "";
  switch (n.type) {
    case "DeclareClass":
      return pn(e, t, r);
    case "DeclareFunction":
      return [Z(e), "function ", r("id"), r("predicate"), s];
    case "DeclareModule":
      return ["declare module ", r("id"), " ", r("body")];
    case "DeclareModuleExports":
      return ["declare module.exports", q(e, r), s];
    case "DeclareVariable":
      return [Z(e), n.kind ?? "var", " ", r("id"), s];
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
      return Kr(e, t, r);
    case "DeclareOpaqueType":
    case "OpaqueType":
      return Uu(e, t, r);
    case "DeclareTypeAlias":
    case "TypeAlias":
      return jr(e, t, r);
    case "IntersectionTypeAnnotation":
      return Mr(e, t, r);
    case "UnionTypeAnnotation":
      return Rr(e, t, r);
    case "ConditionalTypeAnnotation":
      return Mt(e, t, r);
    case "InferTypeAnnotation":
      return Ur(e, t, r);
    case "FunctionTypeAnnotation":
      return Jr(e, t, r);
    case "TupleTypeAnnotation":
      return vt(e, t, r);
    case "TupleTypeLabeledElement":
      return qr(e, t, r);
    case "TupleTypeSpreadElement":
      return Gr(e, t, r);
    case "GenericTypeAnnotation":
      return [r("id"), gt(e, t, r, "typeParameters")];
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      return Nr(e, t, r);
    case "TypeAnnotation":
      return Wr(e, t, r);
    case "TypeParameter":
      return tn(e, t, r);
    case "TypeofTypeAnnotation":
      return Xr(e, r);
    case "ExistsTypeAnnotation":
      return "*";
    case "ArrayTypeAnnotation":
      return Yr(r);
    case "DeclareEnum":
    case "EnumDeclaration":
      return fn(e, r, t);
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
      return bi(e, r, t);
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
      return Dn(e, r);
    case "FunctionTypeParam": {
      let u = n.name ? r("name") : e.parent.this === n ? "this" : "";
      return [u, $(e), u ? ": " : "", r("typeAnnotation")];
    }
    case "DeclareInterface":
    case "InterfaceDeclaration":
    case "InterfaceTypeAnnotation":
      return yn(e, t, r);
    case "ClassImplements":
    case "InterfaceExtends":
      return [r("id"), r("typeParameters")];
    case "NullableTypeAnnotation":
      return ["?", r("typeAnnotation")];
    case "Variance": {
      let { kind: u } = n;
      return rn.ok(u === "plus" || u === "minus"), u === "plus" ? "+" : "-";
    }
    case "KeyofTypeAnnotation":
      return ["keyof ", r("argument")];
    case "ObjectTypeCallProperty":
      return [n.static ? "static " : "", r("value")];
    case "ObjectTypeMappedTypeProperty":
      return ui(e, t, r);
    case "ObjectTypeIndexer":
      return [
        n.static ? "static " : "",
        n.variance ? r("variance") : "",
        "[",
        r("id"),
        n.id ? ": " : "",
        r("key"),
        "]: ",
        r("value"),
      ];
    case "ObjectTypeProperty": {
      let u = "";
      return (
        n.proto ? (u = "proto ") : n.static && (u = "static "),
        [
          u,
          On(n) ? n.kind + " " : "",
          n.variance ? r("variance") : "",
          ct(e, t, r),
          $(e),
          vn(n) ? "" : ": ",
          r("value"),
        ]
      );
    }
    case "ObjectTypeAnnotation":
      return Et(e, t, r);
    case "ObjectTypeInternalSlot":
      return [
        n.static ? "static " : "",
        "[[",
        r("id"),
        "]]",
        $(e),
        n.method ? "" : ": ",
        r("value"),
      ];
    case "ObjectTypeSpreadProperty":
      return Hr(e, r);
    case "QualifiedTypeofIdentifier":
    case "QualifiedTypeIdentifier":
      return [r("qualification"), ".", r("id")];
    case "NullLiteralTypeAnnotation":
      return "null";
    case "BooleanLiteralTypeAnnotation":
      return String(n.value);
    case "StringLiteralTypeAnnotation":
      return xe(Tt(oe(n), t));
    case "NumberLiteralTypeAnnotation":
      return He(n.raw ?? n.extra.raw);
    case "BigIntLiteralTypeAnnotation":
      return Or(n.raw ?? n.extra.raw);
    case "TypeCastExpression":
      return ["(", r("expression"), q(e, r), ")"];
    case "TypePredicate":
      return $r(e, r);
    case "TypeParameterDeclaration":
    case "TypeParameterInstantiation":
      return gt(e, t, r, "params");
    case "InferredPredicate":
    case "DeclaredPredicate":
      return [
        e.key === "predicate" &&
        e.parent.type !== "DeclareFunction" &&
        !e.parent.returnType
          ? ": "
          : " ",
        "%checks",
        ...(n.type === "DeclaredPredicate" ? ["(", r("value"), ")"] : []),
      ];
  }
}
function ki(e, t, r) {
  var i;
  let { node: n } = e;
  if (!n.type.startsWith("TS")) return;
  if (Fr(n)) return n.type.slice(2, -7).toLowerCase();
  let s = t.semi ? ";" : "",
    u = [];
  switch (n.type) {
    case "TSThisType":
      return "this";
    case "TSTypeAssertion": {
      let a = !(G(n.expression) || ee(n.expression)),
        o = y(["<", E([F, r("typeAnnotation")]), F, ">"]),
        p = [P("("), E([F, r("expression")]), F, P(")")];
      return a
        ? qe([
            [o, r("expression")],
            [o, y(p, { shouldBreak: !0 })],
            [o, r("expression")],
          ])
        : y([o, r("expression")]);
    }
    case "TSDeclareFunction":
      return sn(e, r, t);
    case "TSExportAssignment":
      return ["export = ", r("expression"), s];
    case "TSModuleBlock":
      return mn(e, t, r);
    case "TSInterfaceBody":
    case "TSTypeLiteral":
      return Et(e, t, r);
    case "TSTypeAliasDeclaration":
      return jr(e, t, r);
    case "TSQualifiedName":
      return [r("left"), ".", r("right")];
    case "TSAbstractMethodDefinition":
    case "TSDeclareMethod":
      return cn(e, t, r);
    case "TSAbstractAccessorProperty":
    case "TSAbstractPropertyDefinition":
      return ln(e, t, r);
    case "TSInterfaceHeritage":
    case "TSClassImplements":
    case "TSExpressionWithTypeArguments":
    case "TSInstantiationExpression":
      return [r("expression"), r("typeParameters")];
    case "TSTemplateLiteralType":
      return Qr(e, r, t);
    case "TSNamedTupleMember":
      return qr(e, t, r);
    case "TSRestType":
      return Gr(e, t, r);
    case "TSOptionalType":
      return [r("typeAnnotation"), "?"];
    case "TSInterfaceDeclaration":
      return yn(e, t, r);
    case "TSTypeParameterDeclaration":
    case "TSTypeParameterInstantiation":
      return gt(e, t, r, "params");
    case "TSTypeParameter":
      return tn(e, t, r);
    case "TSAsExpression":
    case "TSSatisfiesExpression": {
      let a = n.type === "TSAsExpression" ? "as" : "satisfies";
      u.push(r("expression"), ` ${a} `, r("typeAnnotation"));
      let { parent: o } = e;
      return (k(o) && o.callee === n) || (J(o) && o.object === n)
        ? y([E([F, ...u]), F])
        : u;
    }
    case "TSArrayType":
      return Yr(r);
    case "TSPropertySignature":
      return [n.readonly ? "readonly " : "", ct(e, t, r), $(e), q(e, r)];
    case "TSParameterProperty":
      return [
        jt(n),
        n.static ? "static " : "",
        n.override ? "override " : "",
        n.readonly ? "readonly " : "",
        r("parameter"),
      ];
    case "TSTypeQuery":
      return Xr(e, r);
    case "TSIndexSignature": {
      let a = n.parameters.length > 1 ? P(le(t) ? "," : "") : "",
        o = y([E([F, B([", ", F], e.map(r, "parameters"))]), a, F]),
        p = e.parent.type === "ClassBody" && e.key === "body";
      return [
        p && n.static ? "static " : "",
        n.readonly ? "readonly " : "",
        "[",
        n.parameters ? o : "",
        "]",
        q(e, r),
        p ? s : "",
      ];
    }
    case "TSTypePredicate":
      return $r(e, r);
    case "TSNonNullExpression":
      return [r("expression"), "!"];
    case "TSImportType":
      return [
        n.isTypeOf ? "typeof " : "",
        "import(",
        r("argument"),
        ")",
        n.qualifier ? [".", r("qualifier")] : "",
        gt(e, t, r, n.typeArguments ? "typeArguments" : "typeParameters"),
      ];
    case "TSLiteralType":
      return r("literal");
    case "TSIndexedAccessType":
      return Nr(e, t, r);
    case "TSTypeOperator":
      return [n.operator, " ", r("typeAnnotation")];
    case "TSMappedType":
      return ii(e, t, r);
    case "TSMethodSignature": {
      let a = n.kind && n.kind !== "method" ? `${n.kind} ` : "";
      u.push(
        jt(n),
        a,
        n.computed ? "[" : "",
        r("key"),
        n.computed ? "]" : "",
        $(e),
      );
      let o = ot(e, r, t, !1, !0),
        p = n.returnType ? "returnType" : "typeAnnotation",
        m = n[p],
        D = m ? q(e, r, p) : "",
        c = xt(n, D);
      return u.push(c ? y(o) : o), m && u.push(y(D)), y(u);
    }
    case "TSNamespaceExportDeclaration":
      return ["export as namespace ", r("id"), t.semi ? ";" : ""];
    case "TSEnumDeclaration":
      return fn(e, r, t);
    case "TSEnumMember":
      return Dn(e, r);
    case "TSImportEqualsDeclaration":
      return [
        n.isExport ? "export " : "",
        "import ",
        os(n, !1),
        r("id"),
        " = ",
        r("moduleReference"),
        t.semi ? ";" : "",
      ];
    case "TSExternalModuleReference":
      return ["require(", r("expression"), ")"];
    case "TSModuleDeclaration": {
      let { parent: a } = e,
        o = a.type === "TSModuleDeclaration",
        p = ((i = n.body) == null ? void 0 : i.type) === "TSModuleDeclaration";
      if (o) u.push(".");
      else if ((u.push(Z(e)), !(n.kind === "global" || n.global))) {
        let D =
          n.kind ??
          (Q(n.id) ||
          /(?:^|\s)module(?:\s|$)/.test(t.originalText.slice(U(n), U(n.id)))
            ? "module"
            : "namespace");
        u.push(D, " ");
      }
      return (
        u.push(r("id")),
        p ? u.push(r("body")) : n.body ? u.push(" ", y(r("body"))) : u.push(s),
        u
      );
    }
    case "TSConditionalType":
      return Mt(e, t, r);
    case "TSInferType":
      return Ur(e, t, r);
    case "TSIntersectionType":
      return Mr(e, t, r);
    case "TSUnionType":
      return Rr(e, t, r);
    case "TSFunctionType":
    case "TSCallSignatureDeclaration":
    case "TSConstructorType":
    case "TSConstructSignatureDeclaration":
      return Jr(e, t, r);
    case "TSTupleType":
      return vt(e, t, r);
    case "TSTypeReference":
      return [r("typeName"), gt(e, t, r, "typeParameters")];
    case "TSTypeAnnotation":
      return Wr(e, t, r);
    case "TSEmptyBodyFunctionExpression":
      return un(e, t, r);
    case "TSJSDocAllType":
      return "*";
    case "TSJSDocUnknownType":
      return "?";
    case "TSJSDocNullableType":
      return us(e, r, "?");
    case "TSJSDocNonNullableType":
      return us(e, r, "!");
    case "TSParenthesizedType":
    default:
      throw new Oe(n, "TypeScript");
  }
}
function Sc(e, t, r, n) {
  if (kr(e)) return ks(e, t);
  for (let s of [Si, hu, Pi, ki, gi]) {
    let u = s(e, t, r, n);
    if (u !== void 0) return u;
  }
}
var Bc = j([
  "ClassMethod",
  "ClassPrivateMethod",
  "ClassProperty",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractAccessorProperty",
  "PropertyDefinition",
  "TSAbstractPropertyDefinition",
  "ClassPrivateProperty",
  "MethodDefinition",
  "TSAbstractMethodDefinition",
  "TSDeclareMethod",
]);
function bc(e, t, r, n) {
  var D;
  e.isRoot && ((D = t.__onHtmlBindingRoot) == null || D.call(t, e.node, t));
  let s = Sc(e, t, r, n);
  if (!s) return "";
  let { node: u } = e;
  if (Bc(u)) return s;
  let i = b(u.decorators),
    a = Wu(e, t, r),
    o = u.type === "ClassExpression";
  if (i && !o) return Gt(s, (c) => y([a, c]));
  let p = we(e, t),
    m = di(e, t);
  return !a && !p && !m
    ? s
    : Gt(s, (c) => [
        m ? ";" : "",
        p ? "(" : "",
        p && o && i ? [E([A, a, c]), A] : [a, c],
        p ? ")" : "",
      ]);
}
var Ii = bc;
var Li = [
  (e, t) => e.type === "ObjectExpression" && t === "properties",
  (e, t) =>
    e.type === "CallExpression" &&
    e.callee.type === "Identifier" &&
    e.callee.name === "Component" &&
    t === "arguments",
  (e, t) => e.type === "Decorator" && t === "expression",
];
function wi(e) {
  return e.match(
    (t) => t.type === "TemplateLiteral",
    (t, r) => G(t) && r === "elements",
    (t, r) =>
      fe(t) &&
      t.key.type === "Identifier" &&
      t.key.name === "styles" &&
      r === "value",
    ...Li,
  );
}
function Oi(e) {
  return e.match(
    (t) => t.type === "TemplateLiteral",
    (t, r) =>
      fe(t) &&
      t.key.type === "Identifier" &&
      t.key.name === "template" &&
      r === "value",
    ...Li,
  );
}
function En(e, t) {
  return d(e, x.Block | x.Leading, ({ value: r }) => r === ` ${t} `);
}
async function Pc(e, t, r) {
  let { node: n } = r,
    s = n.quasis.map((m) => m.value.raw),
    u = 0,
    i = s.reduce(
      (m, D, c) =>
        c === 0 ? D : m + "@prettier-placeholder-" + u++ + "-id" + D,
      "",
    ),
    a = await e(i, { parser: "scss" }),
    o = Rt(r, t),
    p = kc(a, o);
  if (!p) throw new Error("Couldn't insert all the expressions");
  return ["`", E([C, p]), F, "`"];
}
function kc(e, t) {
  if (!b(t)) return e;
  let r = 0,
    n = ut(Bt(e), (s) =>
      typeof s != "string" || !s.includes("@prettier-placeholder")
        ? s
        : s
            .split(/@prettier-placeholder-(\d+)-id/)
            .map((u, i) => (i % 2 === 0 ? xe(u) : (r++, t[u]))),
    );
  return t.length === r ? n : null;
}
function Ic({ node: e, parent: t, grandparent: r }) {
  return (
    (r &&
      e.quasis &&
      t.type === "JSXExpressionContainer" &&
      r.type === "JSXElement" &&
      r.openingElement.name.name === "style" &&
      r.openingElement.attributes.some((n) => n.name.name === "jsx")) ||
    ((t == null ? void 0 : t.type) === "TaggedTemplateExpression" &&
      t.tag.type === "Identifier" &&
      t.tag.name === "css") ||
    ((t == null ? void 0 : t.type) === "TaggedTemplateExpression" &&
      t.tag.type === "MemberExpression" &&
      t.tag.object.name === "css" &&
      (t.tag.property.name === "global" || t.tag.property.name === "resolve"))
  );
}
function Fn(e) {
  return e.type === "Identifier" && e.name === "styled";
}
function vi(e) {
  return /^[A-Z]/.test(e.object.name) && e.property.name === "extend";
}
function Lc({ parent: e }) {
  if (!e || e.type !== "TaggedTemplateExpression") return !1;
  let t = e.tag.type === "ParenthesizedExpression" ? e.tag.expression : e.tag;
  switch (t.type) {
    case "MemberExpression":
      return Fn(t.object) || vi(t);
    case "CallExpression":
      return (
        Fn(t.callee) ||
        (t.callee.type === "MemberExpression" &&
          ((t.callee.object.type === "MemberExpression" &&
            (Fn(t.callee.object.object) || vi(t.callee.object))) ||
            (t.callee.object.type === "CallExpression" &&
              Fn(t.callee.object.callee))))
      );
    case "Identifier":
      return t.name === "css";
    default:
      return !1;
  }
}
function wc({ parent: e, grandparent: t }) {
  return (
    (t == null ? void 0 : t.type) === "JSXAttribute" &&
    e.type === "JSXExpressionContainer" &&
    t.name.type === "JSXIdentifier" &&
    t.name.name === "css"
  );
}
function Oc(e) {
  if (Ic(e) || Lc(e) || wc(e) || wi(e)) return Pc;
}
var _i = Oc;
async function vc(e, t, r) {
  let { node: n } = r,
    s = n.quasis.length,
    u = Rt(r, t),
    i = [];
  for (let a = 0; a < s; a++) {
    let o = n.quasis[a],
      p = a === 0,
      m = a === s - 1,
      D = o.value.cooked,
      c = D.split(`
`),
      f = c.length,
      l = u[a],
      h = f > 2 && c[0].trim() === "" && c[1].trim() === "",
      g = f > 2 && c[f - 1].trim() === "" && c[f - 2].trim() === "",
      S = c.every((v) => /^\s*(?:#[^\n\r]*)?$/.test(v));
    if (!m && /#[^\n\r]*$/.test(c[f - 1])) return null;
    let I = null;
    S ? (I = _c(c)) : (I = await e(D, { parser: "graphql" })),
      I
        ? ((I = Zr(I, !1)),
          !p && h && i.push(""),
          i.push(I),
          !m && g && i.push(""))
        : !p && !m && h && i.push(""),
      l && i.push(l);
  }
  return ["`", E([C, B(C, i)]), C, "`"];
}
function _c(e) {
  let t = [],
    r = !1,
    n = e.map((s) => s.trim());
  for (let [s, u] of n.entries())
    u !== "" && (n[s - 1] === "" && r ? t.push([C, u]) : t.push(u), (r = !0));
  return t.length === 0 ? null : B(C, t);
}
function jc({ node: e, parent: t }) {
  return (
    En(e, "GraphQL") ||
    (t &&
      ((t.type === "TaggedTemplateExpression" &&
        ((t.tag.type === "MemberExpression" &&
          t.tag.object.name === "graphql" &&
          t.tag.property.name === "experimental") ||
          (t.tag.type === "Identifier" &&
            (t.tag.name === "gql" || t.tag.name === "graphql")))) ||
        (t.type === "CallExpression" &&
          t.callee.type === "Identifier" &&
          t.callee.name === "graphql")))
  );
}
function Mc(e) {
  if (jc(e)) return vc;
}
var ji = Mc;
var xs = 0;
async function Mi(e, t, r, n, s) {
  let { node: u } = n,
    i = xs;
  xs = (xs + 1) >>> 0;
  let a = (S) => `PRETTIER_HTML_PLACEHOLDER_${S}_${i}_IN_JS`,
    o = u.quasis
      .map((S, I, v) =>
        I === v.length - 1 ? S.value.cooked : S.value.cooked + a(I),
      )
      .join(""),
    p = Rt(n, r),
    m = new RegExp(a("(\\d+)"), "g"),
    D = 0,
    c = await t(o, {
      parser: e,
      __onHtmlRoot(S) {
        D = S.children.length;
      },
    }),
    f = ut(c, (S) => {
      if (typeof S != "string") return S;
      let I = [],
        v = S.split(m);
      for (let _ = 0; _ < v.length; _++) {
        let R = v[_];
        if (_ % 2 === 0) {
          R &&
            ((R = ms(R)),
            s.__embeddedInHtml && (R = H(!1, R, /<\/(?=script\b)/gi, "<\\/")),
            I.push(R));
          continue;
        }
        let T = Number(R);
        I.push(p[T]);
      }
      return I;
    }),
    l = /^\s/.test(o) ? " " : "",
    h = /\s$/.test(o) ? " " : "",
    g = s.htmlWhitespaceSensitivity === "ignore" ? C : l && h ? A : null;
  return g
    ? y(["`", E([g, y(f)]), g, "`"])
    : et({ hug: !1 }, y(["`", l, D > 1 ? E(y(f)) : y(f), h, "`"]));
}
function Rc(e) {
  return (
    En(e.node, "HTML") ||
    e.match(
      (t) => t.type === "TemplateLiteral",
      (t, r) =>
        t.type === "TaggedTemplateExpression" &&
        t.tag.type === "Identifier" &&
        t.tag.name === "html" &&
        r === "quasi",
    )
  );
}
var Jc = Mi.bind(void 0, "html"),
  Nc = Mi.bind(void 0, "angular");
function Uc(e) {
  if (Rc(e)) return Jc;
  if (Oi(e)) return Nc;
}
var Ri = Uc;
async function Gc(e, t, r) {
  let { node: n } = r,
    s = H(
      !1,
      n.quasis[0].value.raw,
      /((?:\\\\)*)\\`/g,
      (o, p) => "\\".repeat(p.length / 2) + "`",
    ),
    u = qc(s),
    i = u !== "";
  i && (s = H(!1, s, new RegExp(`^${u}`, "gm"), ""));
  let a = Zr(await e(s, { parser: "markdown", __inJsTemplate: !0 }), !0);
  return ["`", i ? E([F, a]) : [lr, ws(a)], F, "`"];
}
function qc(e) {
  let t = e.match(/^([^\S\n]*)\S/m);
  return t === null ? "" : t[1];
}
function Wc(e) {
  if (Yc(e)) return Gc;
}
function Yc({ node: e, parent: t }) {
  return (
    (t == null ? void 0 : t.type) === "TaggedTemplateExpression" &&
    e.quasis.length === 1 &&
    t.tag.type === "Identifier" &&
    (t.tag.name === "md" || t.tag.name === "markdown")
  );
}
var Ji = Wc;
function Xc(e) {
  let { node: t } = e;
  if (t.type !== "TemplateLiteral" || $c(t)) return;
  let r;
  for (let n of [_i, ji, Ri, Ji])
    if (((r = n(e)), !!r))
      return t.quasis.length === 1 && t.quasis[0].value.raw.trim() === ""
        ? "``"
        : async (...s) => {
            let u = await r(...s);
            return u && et({ embed: !0, ...u.label }, u);
          };
}
function $c({ quasis: e }) {
  return e.some(({ value: { cooked: t } }) => t === null);
}
var Ni = Xc;
var Vc = new Set([
    "range",
    "raw",
    "comments",
    "leadingComments",
    "trailingComments",
    "innerComments",
    "extra",
    "start",
    "end",
    "loc",
    "flags",
    "errors",
    "tokens",
  ]),
  Jt = (e) => {
    for (let t of e.quasis) delete t.value;
  };
function Ui(e, t, r) {
  var s, u;
  if (
    (e.type === "Program" && delete t.sourceType,
    (e.type === "BigIntLiteral" || e.type === "BigIntLiteralTypeAnnotation") &&
      t.value &&
      (t.value = t.value.toLowerCase()),
    (e.type === "BigIntLiteral" || e.type === "Literal") &&
      t.bigint &&
      (t.bigint = t.bigint.toLowerCase()),
    e.type === "DecimalLiteral" && (t.value = Number(t.value)),
    e.type === "Literal" && t.decimal && (t.decimal = Number(t.decimal)),
    e.type === "EmptyStatement" ||
      e.type === "JSXText" ||
      (e.type === "JSXExpressionContainer" &&
        (e.expression.type === "Literal" ||
          e.expression.type === "StringLiteral") &&
        e.expression.value === " "))
  )
    return null;
  if (
    ((e.type === "Property" ||
      e.type === "ObjectProperty" ||
      e.type === "MethodDefinition" ||
      e.type === "ClassProperty" ||
      e.type === "ClassMethod" ||
      e.type === "PropertyDefinition" ||
      e.type === "TSDeclareMethod" ||
      e.type === "TSPropertySignature" ||
      e.type === "ObjectTypeProperty") &&
      typeof e.key == "object" &&
      e.key &&
      (e.key.type === "Literal" ||
        e.key.type === "NumericLiteral" ||
        e.key.type === "StringLiteral" ||
        e.key.type === "Identifier") &&
      delete t.key,
    e.type === "JSXElement" &&
      e.openingElement.name.name === "style" &&
      e.openingElement.attributes.some(
        (i) => i.type === "JSXAttribute" && i.name.name === "jsx",
      ))
  )
    for (let { type: i, expression: a } of t.children)
      i === "JSXExpressionContainer" && a.type === "TemplateLiteral" && Jt(a);
  e.type === "JSXAttribute" &&
    e.name.name === "css" &&
    e.value.type === "JSXExpressionContainer" &&
    e.value.expression.type === "TemplateLiteral" &&
    Jt(t.value.expression),
    e.type === "JSXAttribute" &&
      ((s = e.value) == null ? void 0 : s.type) === "Literal" &&
      /["']|&quot;|&apos;/.test(e.value.value) &&
      (t.value.value = H(!1, t.value.value, /["']|&quot;|&apos;/g, '"'));
  let n = e.expression || e.callee;
  if (
    e.type === "Decorator" &&
    n.type === "CallExpression" &&
    n.callee.name === "Component" &&
    n.arguments.length === 1
  ) {
    let i = e.expression.arguments[0].properties;
    for (let [a, o] of t.expression.arguments[0].properties.entries())
      switch (i[a].key.name) {
        case "styles":
          G(o.value) && Jt(o.value.elements[0]);
          break;
        case "template":
          o.value.type === "TemplateLiteral" && Jt(o.value);
          break;
      }
  }
  if (
    (e.type === "TaggedTemplateExpression" &&
      (e.tag.type === "MemberExpression" ||
        (e.tag.type === "Identifier" &&
          (e.tag.name === "gql" ||
            e.tag.name === "graphql" ||
            e.tag.name === "css" ||
            e.tag.name === "md" ||
            e.tag.name === "markdown" ||
            e.tag.name === "html")) ||
        e.tag.type === "CallExpression") &&
      Jt(t.quasi),
    e.type === "TemplateLiteral" &&
      (((u = e.leadingComments) != null &&
        u.some(
          (a) => ae(a) && ["GraphQL", "HTML"].some((o) => a.value === ` ${o} `),
        )) ||
        (r.type === "CallExpression" && r.callee.name === "graphql") ||
        !e.leadingComments) &&
      Jt(t),
    (e.type === "TSIntersectionType" || e.type === "TSUnionType") &&
      e.types.length === 1)
  )
    return t.types[0];
  e.type === "ChainExpression" &&
    e.expression.type === "TSNonNullExpression" &&
    ([t.type, t.expression.type] = [t.expression.type, t.type]);
}
Ui.ignoredProperties = Vc;
var Gi = Ui;
var Ft = ma(Hi(), 1);
function sl(e) {
  if (!e.startsWith("#!")) return "";
  let t = e.indexOf(`
`);
  return t === -1 ? e : e.slice(0, t);
}
var Ki = sl;
function ul(e) {
  let t = Ki(e);
  t && (e = e.slice(t.length + 1));
  let r = (0, Ft.extract)(e),
    { pragmas: n, comments: s } = (0, Ft.parseWithComments)(r);
  return { shebang: t, text: e, pragmas: n, comments: s };
}
function zi(e) {
  let { shebang: t, text: r, pragmas: n, comments: s } = ul(e),
    u = (0, Ft.strip)(r),
    i = (0, Ft.print)({
      pragmas: { format: "", ...n },
      comments: s.trimStart(),
    });
  return (
    (t
      ? `${t}
`
      : "") +
    i +
    (u.startsWith(`
`)
      ? `
`
      : `

`) +
    u
  );
}
var il = { avoidAstMutation: !0 };
var Qi = [
  {
    linguistLanguageId: 183,
    name: "JavaScript",
    type: "programming",
    tmScope: "source.js",
    aceMode: "javascript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "text/javascript",
    color: "#f1e05a",
    aliases: ["js", "node"],
    extensions: [
      ".js",
      "._js",
      ".bones",
      ".cjs",
      ".es",
      ".es6",
      ".frag",
      ".gs",
      ".jake",
      ".javascript",
      ".jsb",
      ".jscad",
      ".jsfl",
      ".jslib",
      ".jsm",
      ".jspre",
      ".jss",
      ".mjs",
      ".njs",
      ".pac",
      ".sjs",
      ".ssjs",
      ".xsjs",
      ".xsjslib",
      ".wxs",
    ],
    filenames: ["Jakefile"],
    interpreters: [
      "chakra",
      "d8",
      "gjs",
      "js",
      "node",
      "nodejs",
      "qjs",
      "rhino",
      "v8",
      "v8-shell",
      "zx",
    ],
    parsers: [
      "babel",
      "acorn",
      "espree",
      "meriyah",
      "babel-flow",
      "babel-ts",
      "flow",
      "typescript",
    ],
    vscodeLanguageIds: ["javascript", "mongo"],
  },
  {
    linguistLanguageId: 183,
    name: "Flow",
    type: "programming",
    tmScope: "source.js",
    aceMode: "javascript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "text/javascript",
    color: "#f1e05a",
    aliases: [],
    extensions: [".js.flow"],
    filenames: [],
    interpreters: [
      "chakra",
      "d8",
      "gjs",
      "js",
      "node",
      "nodejs",
      "qjs",
      "rhino",
      "v8",
      "v8-shell",
    ],
    parsers: ["flow", "babel-flow"],
    vscodeLanguageIds: ["javascript"],
  },
  {
    linguistLanguageId: 183,
    name: "JSX",
    type: "programming",
    tmScope: "source.js.jsx",
    aceMode: "javascript",
    codemirrorMode: "jsx",
    codemirrorMimeType: "text/jsx",
    color: void 0,
    aliases: void 0,
    extensions: [".jsx"],
    filenames: void 0,
    interpreters: void 0,
    parsers: [
      "babel",
      "babel-flow",
      "babel-ts",
      "flow",
      "typescript",
      "espree",
      "meriyah",
    ],
    vscodeLanguageIds: ["javascriptreact"],
    group: "JavaScript",
  },
  {
    linguistLanguageId: 378,
    name: "TypeScript",
    type: "programming",
    color: "#3178c6",
    aliases: ["ts"],
    interpreters: ["deno", "ts-node"],
    extensions: [".ts", ".cts", ".mts"],
    tmScope: "source.ts",
    aceMode: "typescript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/typescript",
    parsers: ["typescript", "babel-ts"],
    vscodeLanguageIds: ["typescript"],
  },
  {
    linguistLanguageId: 94901924,
    name: "TSX",
    type: "programming",
    color: "#3178c6",
    group: "TypeScript",
    extensions: [".tsx"],
    tmScope: "source.tsx",
    aceMode: "javascript",
    codemirrorMode: "jsx",
    codemirrorMimeType: "text/jsx",
    parsers: ["typescript", "babel-ts"],
    vscodeLanguageIds: ["typescriptreact"],
  },
];
var hs = {};
or(hs, { getVisitorKeys: () => ea, massageAstNode: () => ra, print: () => pl });
var al = {
    JsonRoot: ["node"],
    ArrayExpression: ["elements"],
    ObjectExpression: ["properties"],
    ObjectProperty: ["key", "value"],
    UnaryExpression: ["argument"],
    NullLiteral: [],
    BooleanLiteral: [],
    StringLiteral: [],
    NumericLiteral: [],
    Identifier: [],
    TemplateLiteral: ["quasis"],
    TemplateElement: [],
  },
  Zi = al;
var ol = Dr(Zi),
  ea = ol;
function pl(e, t, r) {
  let { node: n } = e;
  switch (n.type) {
    case "JsonRoot":
      return [r("node"), C];
    case "ArrayExpression": {
      if (n.elements.length === 0) return "[]";
      let s = e.map(() => (e.node === null ? "null" : r()), "elements");
      return ["[", E([C, B([",", C], s)]), C, "]"];
    }
    case "ObjectExpression":
      return n.properties.length === 0
        ? "{}"
        : ["{", E([C, B([",", C], e.map(r, "properties"))]), C, "}"];
    case "ObjectProperty":
      return [r("key"), ": ", r("value")];
    case "UnaryExpression":
      return [n.operator === "+" ? "" : n.operator, r("argument")];
    case "NullLiteral":
      return "null";
    case "BooleanLiteral":
      return n.value ? "true" : "false";
    case "StringLiteral":
      return JSON.stringify(n.value);
    case "NumericLiteral":
      return ta(e) ? JSON.stringify(String(n.value)) : JSON.stringify(n.value);
    case "Identifier":
      return ta(e) ? JSON.stringify(n.name) : n.name;
    case "TemplateLiteral":
      return r(["quasis", 0]);
    case "TemplateElement":
      return JSON.stringify(n.value.cooked);
    default:
      throw new Oe(n, "JSON");
  }
}
function ta(e) {
  return e.key === "key" && e.parent.type === "ObjectProperty";
}
var cl = new Set([
  "start",
  "end",
  "extra",
  "loc",
  "comments",
  "leadingComments",
  "trailingComments",
  "innerComments",
  "errors",
  "range",
  "tokens",
]);
function ra(e, t) {
  let { type: r } = e;
  if (r === "ObjectProperty") {
    let { key: n } = e;
    n.type === "Identifier"
      ? (t.key = { type: "StringLiteral", value: n.name })
      : n.type === "NumericLiteral" &&
        (t.key = { type: "StringLiteral", value: String(n.value) });
    return;
  }
  if (r === "UnaryExpression" && e.operator === "+") return t.argument;
  if (r === "ArrayExpression") {
    for (let [n, s] of e.elements.entries())
      s === null && t.elements.splice(n, 0, { type: "NullLiteral" });
    return;
  }
  if (r === "TemplateLiteral")
    return { type: "StringLiteral", value: e.quasis[0].value.cooked };
}
ra.ignoredProperties = cl;
var na = [
  {
    linguistLanguageId: 174,
    name: "JSON.stringify",
    type: "data",
    color: "#292929",
    tmScope: "source.json",
    aceMode: "json",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/json",
    aliases: ["geojson", "jsonl", "topojson"],
    extensions: [".importmap"],
    filenames: ["package.json", "package-lock.json", "composer.json"],
    parsers: ["json-stringify"],
    vscodeLanguageIds: ["json"],
  },
  {
    linguistLanguageId: 174,
    name: "JSON",
    type: "data",
    color: "#292929",
    tmScope: "source.json",
    aceMode: "json",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/json",
    aliases: ["geojson", "jsonl", "topojson"],
    extensions: [
      ".json",
      ".4DForm",
      ".4DProject",
      ".avsc",
      ".geojson",
      ".gltf",
      ".har",
      ".ice",
      ".JSON-tmLanguage",
      ".mcmeta",
      ".tfstate",
      ".tfstate.backup",
      ".topojson",
      ".webapp",
      ".webmanifest",
      ".yy",
      ".yyp",
    ],
    filenames: [
      ".all-contributorsrc",
      ".arcconfig",
      ".auto-changelog",
      ".c8rc",
      ".htmlhintrc",
      ".imgbotconfig",
      ".nycrc",
      ".tern-config",
      ".tern-project",
      ".watchmanconfig",
      "Pipfile.lock",
      "composer.lock",
      "flake.lock",
      "mcmod.info",
    ],
    parsers: ["json"],
    vscodeLanguageIds: ["json"],
  },
  {
    linguistLanguageId: 423,
    name: "JSON with Comments",
    type: "data",
    color: "#292929",
    group: "JSON",
    tmScope: "source.js",
    aceMode: "javascript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "text/javascript",
    aliases: ["jsonc"],
    extensions: [
      ".jsonc",
      ".code-snippets",
      ".sublime-build",
      ".sublime-commands",
      ".sublime-completions",
      ".sublime-keymap",
      ".sublime-macro",
      ".sublime-menu",
      ".sublime-mousemap",
      ".sublime-project",
      ".sublime-settings",
      ".sublime-theme",
      ".sublime-workspace",
      ".sublime_metrics",
      ".sublime_session",
    ],
    filenames: [
      ".babelrc",
      ".devcontainer.json",
      ".eslintrc.json",
      ".jscsrc",
      ".jshintrc",
      ".jslintrc",
      ".swcrc",
      "api-extractor.json",
      "devcontainer.json",
      "jsconfig.json",
      "language-configuration.json",
      "tsconfig.json",
      "tslint.json",
      ".eslintrc",
    ],
    parsers: ["json"],
    vscodeLanguageIds: ["jsonc"],
  },
  {
    linguistLanguageId: 175,
    name: "JSON5",
    type: "data",
    color: "#267CB9",
    extensions: [".json5"],
    tmScope: "source.js",
    aceMode: "javascript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/json",
    parsers: ["json5"],
    vscodeLanguageIds: ["json5"],
  },
];
var ir = {
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
var Nt = "JavaScript",
  ll = {
    arrowParens: {
      category: Nt,
      type: "choice",
      default: "always",
      description:
        "Include parentheses around a sole arrow function parameter.",
      choices: [
        {
          value: "always",
          description: "Always include parens. Example: `(x) => x`",
        },
        {
          value: "avoid",
          description: "Omit parens when possible. Example: `x => x`",
        },
      ],
    },
    bracketSameLine: ir.bracketSameLine,
    bracketSpacing: ir.bracketSpacing,
    jsxBracketSameLine: {
      category: Nt,
      type: "boolean",
      description: "Put > on the last line instead of at a new line.",
      deprecated: "2.4.0",
    },
    semi: {
      category: Nt,
      type: "boolean",
      default: !0,
      description: "Print semicolons.",
      oppositeDescription:
        "Do not print semicolons, except at the beginning of lines which may need them.",
    },
    singleQuote: ir.singleQuote,
    jsxSingleQuote: {
      category: Nt,
      type: "boolean",
      default: !1,
      description: "Use single quotes in JSX.",
    },
    quoteProps: {
      category: Nt,
      type: "choice",
      default: "as-needed",
      description: "Change when properties in objects are quoted.",
      choices: [
        {
          value: "as-needed",
          description:
            "Only add quotes around object properties where required.",
        },
        {
          value: "consistent",
          description:
            "If at least one property in an object requires quotes, quote all properties.",
        },
        {
          value: "preserve",
          description: "Respect the input use of quotes in object properties.",
        },
      ],
    },
    trailingComma: {
      category: Nt,
      type: "choice",
      default: "all",
      description: "Print trailing commas wherever possible when multi-line.",
      choices: [
        {
          value: "all",
          description:
            "Trailing commas wherever possible (including function arguments).",
        },
        {
          value: "es5",
          description:
            "Trailing commas where valid in ES5 (objects, arrays, etc.)",
        },
        { value: "none", description: "No trailing commas." },
      ],
    },
    singleAttributePerLine: ir.singleAttributePerLine,
  },
  sa = ll;
var ml = { estree: gs, "estree-json": hs },
  yl = [...Qi, ...na];
var FA = Ss;
export { FA as default, yl as languages, sa as options, ml as printers };
