/*
 The buffer module from node.js, for the browser.

 @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 @license  MIT
*/
let enemy;
let me;
let nearPlayer;
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(C, f, n) {
    C != Array.prototype && C != Object.prototype && (C[f] = n.value)
};
$jscomp.getGlobal = function(C) {
    return "undefined" != typeof window && window === C ? C : "undefined" != typeof global && null != global ? global : C
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function() {
    var C = 0;
    return function(f) {
        return $jscomp.SYMBOL_PREFIX + (f || "") + C++
    }
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var C = $jscomp.global.Symbol.iterator;
    C || (C = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[C] && $jscomp.defineProperty(Array.prototype, C, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var C = $jscomp.global.Symbol.asyncIterator;
    C || (C = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.arrayIterator = function(C) {
    var f = 0;
    return $jscomp.iteratorPrototype(function() {
        return f < C.length ? {
            done: !1,
            value: C[f++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function(C) {
    $jscomp.initSymbolIterator();
    C = {
        next: C
    };
    C[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return C
};
$jscomp.polyfill = function(C, f, n, m) {
    if (f) {
        n = $jscomp.global;
        C = C.split(".");
        for (m = 0; m < C.length - 1; m++) {
            var a = C[m];
            a in n || (n[a] = {});
            n = n[a]
        }
        C = C[C.length - 1];
        m = n[C];
        f = f(m);
        f != m && null != f && $jscomp.defineProperty(n, C, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill("Array.prototype.fill", function(C) {
    return C ? C : function(f, n, m) {
        var a = this.length || 0;
        0 > n && (n = Math.max(0, a + n));
        if (null == m || m > a) m = a;
        m = Number(m);
        0 > m && (m = Math.max(0, a + m));
        for (n = Number(n || 0); n < m; n++) this[n] = f;
        return this
    }
}, "es6", "es3");
$jscomp.iteratorFromArray = function(C, f) {
    $jscomp.initSymbolIterator();
    C instanceof String && (C += "");
    var n = 0,
        m = {
            next: function() {
                if (n < C.length) {
                    var a = n++;
                    return {
                        value: f(a, C[a]),
                        done: !1
                    }
                }
                m.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return m.next()
            }
        };
    m[Symbol.iterator] = function() {
        return m
    };
    return m
};
$jscomp.polyfill("Array.prototype.keys", function(C) {
    return C ? C : function() {
        return $jscomp.iteratorFromArray(this, function(f) {
            return f
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(C) {
    return C ? C : function() {
        return $jscomp.iteratorFromArray(this, function(f, n) {
            return n
        })
    }
}, "es8", "es3");
(function() {
    (function a(f, n, m) {
        function h(e, k) {
            if (!n[e]) {
                if (!f[e]) {
                    var c = "function" == typeof require && require;
                    if (!k && c) return c(e, !0);
                    if (b) return b(e, !0);
                    k = Error("Cannot find module '" + e + "'");
                    throw k.code = "MODULE_NOT_FOUND", k;
                }
                k = n[e] = {
                    exports: {}
                };
                f[e][0].call(k.exports, function(b) {
                    var a = f[e][1][b];
                    return h(a ? a : b)
                }, k, k.exports, a, f, n, m)
            }
            return n[e].exports
        }
        for (var b = "function" == typeof require && require, e = 0; e < m.length; e++) h(m[e]);
        return h
    })({
        1: [function(f, n, m) {
            function a(b) {
                var a = b.length;
                if (0 < a % 4) throw Error("Invalid string. Length must be a multiple of 4");
                b = b.indexOf("="); - 1 === b && (b = a);
                return [b, b === a ? 0 : 4 - b % 4]
            }

            function h(a, c, e) {
                for (var d = [], g = c; g < e; g += 3) c = (a[g] << 16 & 16711680) + (a[g + 1] << 8 & 65280) + (a[g + 2] & 255), d.push(b[c >> 18 & 63] + b[c >> 12 & 63] + b[c >> 6 & 63] + b[c & 63]);
                return d.join("")
            }
            m.byteLength = function(b) {
                b = a(b);
                var c = b[1];
                return 3 * (b[0] + c) / 4 - c
            };
            m.toByteArray = function(b) {
                var c = a(b);
                var g = c[0];
                c = c[1];
                for (var k = new d(3 * (g + c) / 4 - c), l = 0, p = 0 < c ? g - 4 : g, h = 0; h < p; h += 4) g = e[b.charCodeAt(h)] << 18 | e[b.charCodeAt(h + 1)] << 12 | e[b.charCodeAt(h + 2)] << 6 | e[b.charCodeAt(h + 3)], k[l++] =
                    g >> 16 & 255, k[l++] = g >> 8 & 255, k[l++] = g & 255;
                2 === c && (g = e[b.charCodeAt(h)] << 2 | e[b.charCodeAt(h + 1)] >> 4, k[l++] = g & 255);
                1 === c && (g = e[b.charCodeAt(h)] << 10 | e[b.charCodeAt(h + 1)] << 4 | e[b.charCodeAt(h + 2)] >> 2, k[l++] = g >> 8 & 255, k[l++] = g & 255);
                return k
            };
            m.fromByteArray = function(a) {
                for (var c = a.length, e = c % 3, d = [], l = 0, k = c - e; l < k; l += 16383) d.push(h(a, l, l + 16383 > k ? k : l + 16383));
                1 === e ? (a = a[c - 1], d.push(b[a >> 2] + b[a << 4 & 63] + "==")) : 2 === e && (a = (a[c - 2] << 8) + a[c - 1], d.push(b[a >> 10] + b[a >> 4 & 63] + b[a << 2 & 63] + "="));
                return d.join("")
            };
            var b = [],
                e = [],
                d = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
            for (f = 0; 64 > f; ++f) b[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [f], e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] = f;
            e[45] = 62;
            e[95] = 63
        }, {}],
        2: [function(f, n, m) {}, {}],
        3: [function(f, n, m) {
            (function(a) {
                function h() {
                    try {
                        var b = new Uint8Array(1);
                        b.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        };
                        return 42 === b.foo() && "function" === typeof b.subarray && 0 === b.subarray(1, 1).byteLength
                    } catch (W) {
                        return !1
                    }
                }

                function b(b, a) {
                    if ((e.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < a) throw new RangeError("Invalid typed array length");
                    e.TYPED_ARRAY_SUPPORT ? (b = new Uint8Array(a), b.__proto__ = e.prototype) : (null === b && (b = new e(a)), b.length = a);
                    return b
                }

                function e(b, a, g) {
                    if (!(e.TYPED_ARRAY_SUPPORT || this instanceof e)) return new e(b, a, g);
                    if ("number" === typeof b) {
                        if ("string" === typeof a) throw Error("If encoding is specified then the first argument must be a string");
                        return c(this, b)
                    }
                    return d(this, b, a, g)
                }

                function d(a, c, d, l) {
                    if ("number" ===
                        typeof c) throw new TypeError('"value" argument must not be a number');
                    if ("undefined" !== typeof ArrayBuffer && c instanceof ArrayBuffer) {
                        c.byteLength;
                        if (0 > d || c.byteLength < d) throw new RangeError("'offset' is out of bounds");
                        if (c.byteLength < d + (l || 0)) throw new RangeError("'length' is out of bounds");
                        c = void 0 === d && void 0 === l ? new Uint8Array(c) : void 0 === l ? new Uint8Array(c, d) : new Uint8Array(c, d, l);
                        e.TYPED_ARRAY_SUPPORT ? (a = c, a.__proto__ = e.prototype) : a = g(a, c);
                        return a
                    }
                    if ("string" === typeof c) {
                        l = a;
                        a = d;
                        if ("string" !==
                            typeof a || "" === a) a = "utf8";
                        if (!e.isEncoding(a)) throw new TypeError('"encoding" must be a valid string encoding');
                        d = p(c, a) | 0;
                        l = b(l, d);
                        c = l.write(c, a);
                        c !== d && (l = l.slice(0, c));
                        return l
                    }
                    return q(a, c)
                }

                function k(b) {
                    if ("number" !== typeof b) throw new TypeError('"size" argument must be a number');
                    if (0 > b) throw new RangeError('"size" argument must not be negative');
                }

                function c(a, c) {
                    k(c);
                    a = b(a, 0 > c ? 0 : l(c) | 0);
                    if (!e.TYPED_ARRAY_SUPPORT)
                        for (var d = 0; d < c; ++d) a[d] = 0;
                    return a
                }

                function g(a, c) {
                    var e = 0 > c.length ? 0 : l(c.length) |
                        0;
                    a = b(a, e);
                    for (var d = 0; d < e; d += 1) a[d] = c[d] & 255;
                    return a
                }

                function q(a, c) {
                    if (e.isBuffer(c)) {
                        var d = l(c.length) | 0;
                        a = b(a, d);
                        if (0 === a.length) return a;
                        c.copy(a, 0, 0, d);
                        return a
                    }
                    if (c) {
                        if ("undefined" !== typeof ArrayBuffer && c.buffer instanceof ArrayBuffer || "length" in c) return (d = "number" !== typeof c.length) || (d = c.length, d = d !== d), d ? b(a, 0) : g(a, c);
                        if ("Buffer" === c.type && G(c.data)) return g(a, c.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                }

                function l(b) {
                    if (b >=
                        (e.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (e.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes");
                    return b | 0
                }

                function p(b, a) {
                    if (e.isBuffer(b)) return b.length;
                    if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(b) || b instanceof ArrayBuffer)) return b.byteLength;
                    "string" !== typeof b && (b = "" + b);
                    var c = b.length;
                    if (0 === c) return 0;
                    for (var d = !1;;) switch (a) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return c;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return Q(b).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * c;
                        case "hex":
                            return c >>> 1;
                        case "base64":
                            return L.toByteArray(P(b)).length;
                        default:
                            if (d) return Q(b).length;
                            a = ("" + a).toLowerCase();
                            d = !0
                    }
                }

                function A(b, a, c) {
                    var e = !1;
                    if (void 0 === a || 0 > a) a = 0;
                    if (a > this.length) return "";
                    if (void 0 === c || c > this.length) c = this.length;
                    if (0 >= c) return "";
                    c >>>= 0;
                    a >>>= 0;
                    if (c <= a) return "";
                    for (b || (b = "utf8");;) switch (b) {
                        case "hex":
                            b = a;
                            a = c;
                            c = this.length;
                            if (!b || 0 > b) b = 0;
                            if (!a || 0 > a || a > c) a = c;
                            e = "";
                            for (c = b; c < a; ++c) b = e, e = this[c], e = 16 > e ? "0" + e.toString(16) : e.toString(16), e = b + e;
                            return e;
                        case "utf8":
                        case "utf-8":
                            return n(this, a, c);
                        case "ascii":
                            b = "";
                            for (c = Math.min(this.length, c); a < c; ++a) b += String.fromCharCode(this[a] & 127);
                            return b;
                        case "latin1":
                        case "binary":
                            b = "";
                            for (c = Math.min(this.length, c); a < c; ++a) b += String.fromCharCode(this[a]);
                            return b;
                        case "base64":
                            return a = 0 === a && c === this.length ? L.fromByteArray(this) : L.fromByteArray(this.slice(a, c)), a;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            a =
                                this.slice(a, c);
                            c = "";
                            for (b = 0; b < a.length; b += 2) c += String.fromCharCode(a[b] + 256 * a[b + 1]);
                            return c;
                        default:
                            if (e) throw new TypeError("Unknown encoding: " + b);
                            b = (b + "").toLowerCase();
                            e = !0
                    }
                }

                function y(b, a, c) {
                    var e = b[a];
                    b[a] = b[c];
                    b[c] = e
                }

                function x(b, a, c, d, g) {
                    if (0 === b.length) return -1;
                    "string" === typeof c ? (d = c, c = 0) : 2147483647 < c ? c = 2147483647 : -2147483648 > c && (c = -2147483648);
                    c = +c;
                    isNaN(c) && (c = g ? 0 : b.length - 1);
                    0 > c && (c = b.length + c);
                    if (c >= b.length) {
                        if (g) return -1;
                        c = b.length - 1
                    } else if (0 > c)
                        if (g) c = 0;
                        else return -1;
                        "string" ===
                    typeof a && (a = e.from(a, d));
                    if (e.isBuffer(a)) return 0 === a.length ? -1 : w(b, a, c, d, g);
                    if ("number" === typeof a) return a &= 255, e.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? g ? Uint8Array.prototype.indexOf.call(b, a, c) : Uint8Array.prototype.lastIndexOf.call(b, a, c) : w(b, [a], c, d, g);
                    throw new TypeError("val must be string, number or Buffer");
                }

                function w(b, a, c, e, d) {
                    function g(b, a) {
                        return 1 === l ? b[a] : b.readUInt16BE(a * l)
                    }
                    var l = 1,
                        k = b.length,
                        p = a.length;
                    if (void 0 !== e && (e = String(e).toLowerCase(), "ucs2" ===
                            e || "ucs-2" === e || "utf16le" === e || "utf-16le" === e)) {
                        if (2 > b.length || 2 > a.length) return -1;
                        l = 2;
                        k /= 2;
                        p /= 2;
                        c /= 2
                    }
                    if (d)
                        for (e = -1; c < k; c++)
                            if (g(b, c) === g(a, -1 === e ? 0 : c - e)) {
                                if (-1 === e && (e = c), c - e + 1 === p) return e * l
                            } else -1 !== e && (c -= c - e), e = -1;
                    else
                        for (c + p > k && (c = k - p); 0 <= c; c--) {
                            k = !0;
                            for (e = 0; e < p; e++)
                                if (g(b, c + e) !== g(a, e)) {
                                    k = !1;
                                    break
                                }
                            if (k) return c
                        }
                    return -1
                }

                function n(b, a, c) {
                    c = Math.min(b.length, c);
                    for (var e = []; a < c;) {
                        var d = b[a],
                            g = null,
                            l = 239 < d ? 4 : 223 < d ? 3 : 191 < d ? 2 : 1;
                        if (a + l <= c) switch (l) {
                            case 1:
                                128 > d && (g = d);
                                break;
                            case 2:
                                var k = b[a + 1];
                                128 === (k & 192) && (d = (d & 31) << 6 | k & 63, 127 < d && (g = d));
                                break;
                            case 3:
                                k = b[a + 1];
                                var p = b[a + 2];
                                128 === (k & 192) && 128 === (p & 192) && (d = (d & 15) << 12 | (k & 63) << 6 | p & 63, 2047 < d && (55296 > d || 57343 < d) && (g = d));
                                break;
                            case 4:
                                k = b[a + 1];
                                p = b[a + 2];
                                var q = b[a + 3];
                                128 === (k & 192) && 128 === (p & 192) && 128 === (q & 192) && (d = (d & 15) << 18 | (k & 63) << 12 | (p & 63) << 6 | q & 63, 65535 < d && 1114112 > d && (g = d))
                        }
                        null === g ? (g = 65533, l = 1) : 65535 < g && (g -= 65536, e.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023);
                        e.push(g);
                        a += l
                    }
                    b = e.length;
                    if (b <= J) e = String.fromCharCode.apply(String, e);
                    else {
                        c = "";
                        for (a =
                            0; a < b;) c += String.fromCharCode.apply(String, e.slice(a, a += J));
                        e = c
                    }
                    return e
                }

                function r(b, a, c) {
                    if (0 !== b % 1 || 0 > b) throw new RangeError("offset is not uint");
                    if (b + a > c) throw new RangeError("Trying to access beyond buffer length");
                }

                function z(b, a, c, d, g, l) {
                    if (!e.isBuffer(b)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (a > g || a < l) throw new RangeError('"value" argument is out of bounds');
                    if (c + d > b.length) throw new RangeError("Index out of range");
                }

                function t(b, a, c, e) {
                    0 > a && (a = 65535 + a + 1);
                    for (var d =
                            0, g = Math.min(b.length - c, 2); d < g; ++d) b[c + d] = (a & 255 << 8 * (e ? d : 1 - d)) >>> 8 * (e ? d : 1 - d)
                }

                function D(b, a, c, e) {
                    0 > a && (a = 4294967295 + a + 1);
                    for (var d = 0, g = Math.min(b.length - c, 4); d < g; ++d) b[c + d] = a >>> 8 * (e ? d : 3 - d) & 255
                }

                function E(b, a, c, e, d, g) {
                    if (c + e > b.length) throw new RangeError("Index out of range");
                    if (0 > c) throw new RangeError("Index out of range");
                }

                function I(b, a, c, e, d) {
                    d || E(b, a, c, 4, 3.4028234663852886E38, -3.4028234663852886E38);
                    H.write(b, a, c, e, 23, 4);
                    return c + 4
                }

                function K(b, a, c, e, d) {
                    d || E(b, a, c, 8, 1.7976931348623157E308, -1.7976931348623157E308);
                    H.write(b, a, c, e, 52, 8);
                    return c + 8
                }

                function P(b) {
                    b = b.trim ? b.trim() : b.replace(/^\s+|\s+$/g, "");
                    b = b.replace(u, "");
                    if (2 > b.length) return "";
                    for (; 0 !== b.length % 4;) b += "=";
                    return b
                }

                function Q(b, a) {
                    a = a || Infinity;
                    for (var c, e = b.length, d = null, g = [], l = 0; l < e; ++l) {
                        c = b.charCodeAt(l);
                        if (55295 < c && 57344 > c) {
                            if (!d) {
                                if (56319 < c) {
                                    -1 < (a -= 3) && g.push(239, 191, 189);
                                    continue
                                } else if (l + 1 === e) {
                                    -1 < (a -= 3) && g.push(239, 191, 189);
                                    continue
                                }
                                d = c;
                                continue
                            }
                            if (56320 > c) {
                                -1 < (a -= 3) && g.push(239, 191, 189);
                                d = c;
                                continue
                            }
                            c = (d - 55296 << 10 | c - 56320) + 65536
                        } else d &&
                            -1 < (a -= 3) && g.push(239, 191, 189);
                        d = null;
                        if (128 > c) {
                            if (0 > --a) break;
                            g.push(c)
                        } else if (2048 > c) {
                            if (0 > (a -= 2)) break;
                            g.push(c >> 6 | 192, c & 63 | 128)
                        } else if (65536 > c) {
                            if (0 > (a -= 3)) break;
                            g.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128)
                        } else if (1114112 > c) {
                            if (0 > (a -= 4)) break;
                            g.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128)
                        } else throw Error("Invalid code point");
                    }
                    return g
                }

                function M(b) {
                    for (var a = [], c = 0; c < b.length; ++c) a.push(b.charCodeAt(c) & 255);
                    return a
                }

                function F(b, a, c, e) {
                    for (var d = 0; d < e && !(d + c >= a.length || d >= b.length); ++d) a[d +
                        c] = b[d];
                    return d
                }
                var L = f(1),
                    H = f(4),
                    G = f(6);
                m.Buffer = e;
                m.SlowBuffer = function(b) {
                    +b != b && (b = 0);
                    return e.alloc(+b)
                };
                m.INSPECT_MAX_BYTES = 50;
                e.TYPED_ARRAY_SUPPORT = void 0 !== a.TYPED_ARRAY_SUPPORT ? a.TYPED_ARRAY_SUPPORT : h();
                m.kMaxLength = e.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                e.poolSize = 8192;
                e._augment = function(b) {
                    b.__proto__ = e.prototype;
                    return b
                };
                e.from = function(b, a, c) {
                    return d(null, b, a, c)
                };
                e.TYPED_ARRAY_SUPPORT && (e.prototype.__proto__ = Uint8Array.prototype, e.__proto__ = Uint8Array, $jscomp.initSymbol(), $jscomp.initSymbol(),
                    $jscomp.initSymbol(), "undefined" !== typeof Symbol && Symbol.species && e[Symbol.species] === e && ($jscomp.initSymbol(), Object.defineProperty(e, Symbol.species, {
                        value: null,
                        configurable: !0
                    })));
                e.alloc = function(a, c, e) {
                    k(a);
                    a = 0 >= a ? b(null, a) : void 0 !== c ? "string" === typeof e ? b(null, a).fill(c, e) : b(null, a).fill(c) : b(null, a);
                    return a
                };
                e.allocUnsafe = function(b) {
                    return c(null, b)
                };
                e.allocUnsafeSlow = function(b) {
                    return c(null, b)
                };
                e.isBuffer = function(b) {
                    return !(null == b || !b._isBuffer)
                };
                e.compare = function(b, a) {
                    if (!e.isBuffer(b) ||
                        !e.isBuffer(a)) throw new TypeError("Arguments must be Buffers");
                    if (b === a) return 0;
                    for (var c = b.length, d = a.length, g = 0, l = Math.min(c, d); g < l; ++g)
                        if (b[g] !== a[g]) {
                            c = b[g];
                            d = a[g];
                            break
                        }
                    return c < d ? -1 : d < c ? 1 : 0
                };
                e.isEncoding = function(b) {
                    switch (String(b).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                };
                e.concat = function(b, a) {
                    if (!G(b)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === b.length) return e.alloc(0);
                    var c;
                    if (void 0 === a)
                        for (c = a = 0; c < b.length; ++c) a += b[c].length;
                    a = e.allocUnsafe(a);
                    var d = 0;
                    for (c = 0; c < b.length; ++c) {
                        var g = b[c];
                        if (!e.isBuffer(g)) throw new TypeError('"list" argument must be an Array of Buffers');
                        g.copy(a, d);
                        d += g.length
                    }
                    return a
                };
                e.byteLength = p;
                e.prototype._isBuffer = !0;
                e.prototype.swap16 = function() {
                    var b = this.length;
                    if (0 !== b % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var a = 0; a < b; a += 2) y(this, a, a + 1);
                    return this
                };
                e.prototype.swap32 =
                    function() {
                        var b = this.length;
                        if (0 !== b % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for (var a = 0; a < b; a += 4) y(this, a, a + 3), y(this, a + 1, a + 2);
                        return this
                    };
                e.prototype.swap64 = function() {
                    var b = this.length;
                    if (0 !== b % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var a = 0; a < b; a += 8) y(this, a, a + 7), y(this, a + 1, a + 6), y(this, a + 2, a + 5), y(this, a + 3, a + 4);
                    return this
                };
                e.prototype.toString = function() {
                    var b = this.length | 0;
                    return 0 === b ? "" : 0 === arguments.length ? n(this, 0, b) : A.apply(this,
                        arguments)
                };
                e.prototype.equals = function(b) {
                    if (!e.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                    return this === b ? !0 : 0 === e.compare(this, b)
                };
                e.prototype.inspect = function() {
                    var b = "",
                        a = m.INSPECT_MAX_BYTES;
                    0 < this.length && (b = this.toString("hex", 0, a).match(/.{2}/g).join(" "), this.length > a && (b += " ... "));
                    return "<Buffer " + b + ">"
                };
                e.prototype.compare = function(b, a, c, d, g) {
                    if (!e.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                    void 0 === a && (a = 0);
                    void 0 === c && (c = b ? b.length : 0);
                    void 0 === d &&
                        (d = 0);
                    void 0 === g && (g = this.length);
                    if (0 > a || c > b.length || 0 > d || g > this.length) throw new RangeError("out of range index");
                    if (d >= g && a >= c) return 0;
                    if (d >= g) return -1;
                    if (a >= c) return 1;
                    a >>>= 0;
                    c >>>= 0;
                    d >>>= 0;
                    g >>>= 0;
                    if (this === b) return 0;
                    var l = g - d,
                        k = c - a,
                        p = Math.min(l, k);
                    d = this.slice(d, g);
                    b = b.slice(a, c);
                    for (a = 0; a < p; ++a)
                        if (d[a] !== b[a]) {
                            l = d[a];
                            k = b[a];
                            break
                        }
                    return l < k ? -1 : k < l ? 1 : 0
                };
                e.prototype.includes = function(b, a, c) {
                    return -1 !== this.indexOf(b, a, c)
                };
                e.prototype.indexOf = function(b, a, c) {
                    return x(this, b, a, c, !0)
                };
                e.prototype.lastIndexOf =
                    function(b, a, c) {
                        return x(this, b, a, c, !1)
                    };
                e.prototype.write = function(b, a, c, d) {
                    if (void 0 === a) d = "utf8", c = this.length, a = 0;
                    else if (void 0 === c && "string" === typeof a) d = a, c = this.length, a = 0;
                    else if (isFinite(a)) a |= 0, isFinite(c) ? (c |= 0, void 0 === d && (d = "utf8")) : (d = c, c = void 0);
                    else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    var e = this.length - a;
                    if (void 0 === c || c > e) c = e;
                    if (0 < b.length && (0 > c || 0 > a) || a > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    d || (d = "utf8");
                    for (e = !1;;) switch (d) {
                        case "hex":
                            a: {
                                a = Number(a) || 0;
                                d = this.length - a;
                                c ? (c = Number(c), c > d && (c = d)) : c = d;
                                d = b.length;
                                if (0 !== d % 2) throw new TypeError("Invalid hex string");
                                c > d / 2 && (c = d / 2);
                                for (d = 0; d < c; ++d) {
                                    e = parseInt(b.substr(2 * d, 2), 16);
                                    if (isNaN(e)) {
                                        b = d;
                                        break a
                                    }
                                    this[a + d] = e
                                }
                                b = d
                            }
                            return b;
                        case "utf8":
                        case "utf-8":
                            return F(Q(b, this.length - a), this, a, c);
                        case "ascii":
                            return F(M(b), this, a, c);
                        case "latin1":
                        case "binary":
                            return F(M(b), this, a, c);
                        case "base64":
                            return F(L.toByteArray(P(b)), this, a, c);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            d =
                                b;
                            e = this.length - a;
                            for (var g = [], l = 0; l < d.length && !(0 > (e -= 2)); ++l) {
                                var k = d.charCodeAt(l);
                                b = k >> 8;
                                k %= 256;
                                g.push(k);
                                g.push(b)
                            }
                            return F(g, this, a, c);
                        default:
                            if (e) throw new TypeError("Unknown encoding: " + d);
                            d = ("" + d).toLowerCase();
                            e = !0
                    }
                };
                e.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var J = 4096;
                e.prototype.slice = function(b, a) {
                    var c = this.length;
                    b = ~~b;
                    a = void 0 === a ? c : ~~a;
                    0 > b ? (b += c, 0 > b && (b = 0)) : b > c && (b = c);
                    0 > a ? (a += c, 0 > a && (a = 0)) : a > c && (a = c);
                    a < b && (a = b);
                    if (e.TYPED_ARRAY_SUPPORT) a =
                        this.subarray(b, a), a.__proto__ = e.prototype;
                    else {
                        c = a - b;
                        a = new e(c, void 0);
                        for (var d = 0; d < c; ++d) a[d] = this[d + b]
                    }
                    return a
                };
                e.prototype.readUIntLE = function(b, a, c) {
                    b |= 0;
                    a |= 0;
                    c || r(b, a, this.length);
                    c = this[b];
                    for (var d = 1, e = 0; ++e < a && (d *= 256);) c += this[b + e] * d;
                    return c
                };
                e.prototype.readUIntBE = function(b, a, c) {
                    b |= 0;
                    a |= 0;
                    c || r(b, a, this.length);
                    c = this[b + --a];
                    for (var d = 1; 0 < a && (d *= 256);) c += this[b + --a] * d;
                    return c
                };
                e.prototype.readUInt8 = function(b, a) {
                    a || r(b, 1, this.length);
                    return this[b]
                };
                e.prototype.readUInt16LE = function(b,
                    a) {
                    a || r(b, 2, this.length);
                    return this[b] | this[b + 1] << 8
                };
                e.prototype.readUInt16BE = function(b, a) {
                    a || r(b, 2, this.length);
                    return this[b] << 8 | this[b + 1]
                };
                e.prototype.readUInt32LE = function(b, a) {
                    a || r(b, 4, this.length);
                    return (this[b] | this[b + 1] << 8 | this[b + 2] << 16) + 16777216 * this[b + 3]
                };
                e.prototype.readUInt32BE = function(b, a) {
                    a || r(b, 4, this.length);
                    return 16777216 * this[b] + (this[b + 1] << 16 | this[b + 2] << 8 | this[b + 3])
                };
                e.prototype.readIntLE = function(b, a, c) {
                    b |= 0;
                    a |= 0;
                    c || r(b, a, this.length);
                    c = this[b];
                    for (var d = 1, e = 0; ++e < a && (d *= 256);) c +=
                        this[b + e] * d;
                    c >= 128 * d && (c -= Math.pow(2, 8 * a));
                    return c
                };
                e.prototype.readIntBE = function(b, a, c) {
                    b |= 0;
                    a |= 0;
                    c || r(b, a, this.length);
                    c = a;
                    for (var d = 1, e = this[b + --c]; 0 < c && (d *= 256);) e += this[b + --c] * d;
                    e >= 128 * d && (e -= Math.pow(2, 8 * a));
                    return e
                };
                e.prototype.readInt8 = function(b, a) {
                    a || r(b, 1, this.length);
                    return this[b] & 128 ? -1 * (255 - this[b] + 1) : this[b]
                };
                e.prototype.readInt16LE = function(b, a) {
                    a || r(b, 2, this.length);
                    b = this[b] | this[b + 1] << 8;
                    return b & 32768 ? b | 4294901760 : b
                };
                e.prototype.readInt16BE = function(b, a) {
                    a || r(b, 2, this.length);
                    b = this[b + 1] | this[b] << 8;
                    return b & 32768 ? b | 4294901760 : b
                };
                e.prototype.readInt32LE = function(b, a) {
                    a || r(b, 4, this.length);
                    return this[b] | this[b + 1] << 8 | this[b + 2] << 16 | this[b + 3] << 24
                };
                e.prototype.readInt32BE = function(b, a) {
                    a || r(b, 4, this.length);
                    return this[b] << 24 | this[b + 1] << 16 | this[b + 2] << 8 | this[b + 3]
                };
                e.prototype.readFloatLE = function(b, a) {
                    a || r(b, 4, this.length);
                    return H.read(this, b, !0, 23, 4)
                };
                e.prototype.readFloatBE = function(b, a) {
                    a || r(b, 4, this.length);
                    return H.read(this, b, !1, 23, 4)
                };
                e.prototype.readDoubleLE = function(b,
                    a) {
                    a || r(b, 8, this.length);
                    return H.read(this, b, !0, 52, 8)
                };
                e.prototype.readDoubleBE = function(b, a) {
                    a || r(b, 8, this.length);
                    return H.read(this, b, !1, 52, 8)
                };
                e.prototype.writeUIntLE = function(b, a, c, d) {
                    b = +b;
                    a |= 0;
                    c |= 0;
                    d || z(this, b, a, c, Math.pow(2, 8 * c) - 1, 0);
                    d = 1;
                    var e = 0;
                    for (this[a] = b & 255; ++e < c && (d *= 256);) this[a + e] = b / d & 255;
                    return a + c
                };
                e.prototype.writeUIntBE = function(b, a, c, d) {
                    b = +b;
                    a |= 0;
                    c |= 0;
                    d || z(this, b, a, c, Math.pow(2, 8 * c) - 1, 0);
                    d = c - 1;
                    var e = 1;
                    for (this[a + d] = b & 255; 0 <= --d && (e *= 256);) this[a + d] = b / e & 255;
                    return a + c
                };
                e.prototype.writeUInt8 =
                    function(b, a, c) {
                        b = +b;
                        a |= 0;
                        c || z(this, b, a, 1, 255, 0);
                        e.TYPED_ARRAY_SUPPORT || (b = Math.floor(b));
                        this[a] = b & 255;
                        return a + 1
                    };
                e.prototype.writeUInt16LE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 2, 65535, 0);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b & 255, this[a + 1] = b >>> 8) : t(this, b, a, !0);
                    return a + 2
                };
                e.prototype.writeUInt16BE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 2, 65535, 0);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b >>> 8, this[a + 1] = b & 255) : t(this, b, a, !1);
                    return a + 2
                };
                e.prototype.writeUInt32LE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 4, 4294967295,
                        0);
                    e.TYPED_ARRAY_SUPPORT ? (this[a + 3] = b >>> 24, this[a + 2] = b >>> 16, this[a + 1] = b >>> 8, this[a] = b & 255) : D(this, b, a, !0);
                    return a + 4
                };
                e.prototype.writeUInt32BE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 4, 4294967295, 0);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b >>> 24, this[a + 1] = b >>> 16, this[a + 2] = b >>> 8, this[a + 3] = b & 255) : D(this, b, a, !1);
                    return a + 4
                };
                e.prototype.writeIntLE = function(b, a, c, d) {
                    b = +b;
                    a |= 0;
                    d || (d = Math.pow(2, 8 * c - 1), z(this, b, a, c, d - 1, -d));
                    d = 0;
                    var e = 1,
                        g = 0;
                    for (this[a] = b & 255; ++d < c && (e *= 256);) 0 > b && 0 === g && 0 !== this[a + d - 1] && (g = 1), this[a +
                        d] = (b / e >> 0) - g & 255;
                    return a + c
                };
                e.prototype.writeIntBE = function(b, a, c, d) {
                    b = +b;
                    a |= 0;
                    d || (d = Math.pow(2, 8 * c - 1), z(this, b, a, c, d - 1, -d));
                    d = c - 1;
                    var e = 1,
                        g = 0;
                    for (this[a + d] = b & 255; 0 <= --d && (e *= 256);) 0 > b && 0 === g && 0 !== this[a + d + 1] && (g = 1), this[a + d] = (b / e >> 0) - g & 255;
                    return a + c
                };
                e.prototype.writeInt8 = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 1, 127, -128);
                    e.TYPED_ARRAY_SUPPORT || (b = Math.floor(b));
                    0 > b && (b = 255 + b + 1);
                    this[a] = b & 255;
                    return a + 1
                };
                e.prototype.writeInt16LE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 2, 32767, -32768);
                    e.TYPED_ARRAY_SUPPORT ?
                        (this[a] = b & 255, this[a + 1] = b >>> 8) : t(this, b, a, !0);
                    return a + 2
                };
                e.prototype.writeInt16BE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 2, 32767, -32768);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b >>> 8, this[a + 1] = b & 255) : t(this, b, a, !1);
                    return a + 2
                };
                e.prototype.writeInt32LE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 4, 2147483647, -2147483648);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b & 255, this[a + 1] = b >>> 8, this[a + 2] = b >>> 16, this[a + 3] = b >>> 24) : D(this, b, a, !0);
                    return a + 4
                };
                e.prototype.writeInt32BE = function(b, a, c) {
                    b = +b;
                    a |= 0;
                    c || z(this, b, a, 4, 2147483647, -2147483648);
                    0 > b && (b = 4294967295 + b + 1);
                    e.TYPED_ARRAY_SUPPORT ? (this[a] = b >>> 24, this[a + 1] = b >>> 16, this[a + 2] = b >>> 8, this[a + 3] = b & 255) : D(this, b, a, !1);
                    return a + 4
                };
                e.prototype.writeFloatLE = function(b, a, c) {
                    return I(this, b, a, !0, c)
                };
                e.prototype.writeFloatBE = function(b, a, c) {
                    return I(this, b, a, !1, c)
                };
                e.prototype.writeDoubleLE = function(b, a, c) {
                    return K(this, b, a, !0, c)
                };
                e.prototype.writeDoubleBE = function(b, a, c) {
                    return K(this, b, a, !1, c)
                };
                e.prototype.copy = function(b, a, c, d) {
                    c || (c = 0);
                    d || 0 === d || (d = this.length);
                    a >= b.length &&
                        (a = b.length);
                    a || (a = 0);
                    0 < d && d < c && (d = c);
                    if (d === c || 0 === b.length || 0 === this.length) return 0;
                    if (0 > a) throw new RangeError("targetStart out of bounds");
                    if (0 > c || c >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (0 > d) throw new RangeError("sourceEnd out of bounds");
                    d > this.length && (d = this.length);
                    b.length - a < d - c && (d = b.length - a + c);
                    var g = d - c;
                    if (this === b && c < a && a < d)
                        for (d = g - 1; 0 <= d; --d) b[d + a] = this[d + c];
                    else if (1E3 > g || !e.TYPED_ARRAY_SUPPORT)
                        for (d = 0; d < g; ++d) b[d + a] = this[d + c];
                    else Uint8Array.prototype.set.call(b,
                        this.subarray(c, c + g), a);
                    return g
                };
                e.prototype.fill = function(b, a, c, d) {
                    if ("string" === typeof b) {
                        "string" === typeof a ? (d = a, a = 0, c = this.length) : "string" === typeof c && (d = c, c = this.length);
                        if (1 === b.length) {
                            var g = b.charCodeAt(0);
                            256 > g && (b = g)
                        }
                        if (void 0 !== d && "string" !== typeof d) throw new TypeError("encoding must be a string");
                        if ("string" === typeof d && !e.isEncoding(d)) throw new TypeError("Unknown encoding: " + d);
                    } else "number" === typeof b && (b &= 255);
                    if (0 > a || this.length < a || this.length < c) throw new RangeError("Out of range index");
                    if (c <= a) return this;
                    a >>>= 0;
                    c = void 0 === c ? this.length : c >>> 0;
                    b || (b = 0);
                    if ("number" === typeof b)
                        for (d = a; d < c; ++d) this[d] = b;
                    else
                        for (b = e.isBuffer(b) ? b : Q((new e(b, d)).toString()), g = b.length, d = 0; d < c - a; ++d) this[d + a] = b[d % g];
                    return this
                };
                var u = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
        }, {}],
        4: [function(f, n, m) {
            m.read = function(a, h, b, e, d) {
                var k = 8 * d - e - 1;
                var c = (1 << k) - 1,
                    g = c >> 1,
                    q = -7;
                d = b ? d - 1 : 0;
                var l = b ? -1 : 1,
                    p = a[h + d];
                d += l;
                b = p &
                    (1 << -q) - 1;
                p >>= -q;
                for (q += k; 0 < q; b = 256 * b + a[h + d], d += l, q -= 8);
                k = b & (1 << -q) - 1;
                b >>= -q;
                for (q += e; 0 < q; k = 256 * k + a[h + d], d += l, q -= 8);
                if (0 === b) b = 1 - g;
                else {
                    if (b === c) return k ? NaN : Infinity * (p ? -1 : 1);
                    k += Math.pow(2, e);
                    b -= g
                }
                return (p ? -1 : 1) * k * Math.pow(2, b - e)
            };
            m.write = function(a, h, b, e, d, k) {
                var c, g = 8 * k - d - 1,
                    q = (1 << g) - 1,
                    l = q >> 1,
                    p = 23 === d ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                k = e ? 0 : k - 1;
                var f = e ? 1 : -1,
                    y = 0 > h || 0 === h && 0 > 1 / h ? 1 : 0;
                h = Math.abs(h);
                isNaN(h) || Infinity === h ? (h = isNaN(h) ? 1 : 0, e = q) : (e = Math.floor(Math.log(h) / Math.LN2), 1 > h * (c = Math.pow(2, -e)) &&
                    (e--, c *= 2), h = 1 <= e + l ? h + p / c : h + p * Math.pow(2, 1 - l), 2 <= h * c && (e++, c /= 2), e + l >= q ? (h = 0, e = q) : 1 <= e + l ? (h = (h * c - 1) * Math.pow(2, d), e += l) : (h = h * Math.pow(2, l - 1) * Math.pow(2, d), e = 0));
                for (; 8 <= d; a[b + k] = h & 255, k += f, h /= 256, d -= 8);
                e = e << d | h;
                for (g += d; 0 < g; a[b + k] = e & 255, k += f, e /= 256, g -= 8);
                a[b + k - f] |= 128 * y
            }
        }, {}],
        5: [function(f, n, m) {
            n.exports = "function" === typeof Object.create ? function(a, h) {
                a.super_ = h;
                a.prototype = Object.create(h.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : function(a, h) {
                a.super_ = h;
                var b =
                    function() {};
                b.prototype = h.prototype;
                a.prototype = new b;
                a.prototype.constructor = a
            }
        }, {}],
        6: [function(f, n, m) {
            var a = {}.toString;
            n.exports = Array.isArray || function(h) {
                return "[object Array]" == a.call(h)
            }
        }, {}],
        7: [function(f, n, m) {
            function a() {
                throw Error("setTimeout has not been defined");
            }

            function h() {
                throw Error("clearTimeout has not been defined");
            }

            function b(b) {
                if (q === setTimeout) return setTimeout(b, 0);
                if ((q === a || !q) && setTimeout) return q = setTimeout, setTimeout(b, 0);
                try {
                    return q(b, 0)
                } catch (B) {
                    try {
                        return q.call(null,
                            b, 0)
                    } catch (r) {
                        return q.call(this, b, 0)
                    }
                }
            }

            function e(b) {
                if (l === clearTimeout) return clearTimeout(b);
                if ((l === h || !l) && clearTimeout) return l = clearTimeout, clearTimeout(b);
                try {
                    return l(b)
                } catch (B) {
                    try {
                        return l.call(null, b)
                    } catch (r) {
                        return l.call(this, b)
                    }
                }
            }

            function d() {
                A && y && (A = !1, y.length ? p = y.concat(p) : x = -1, p.length && k())
            }

            function k() {
                if (!A) {
                    var a = b(d);
                    A = !0;
                    for (var c = p.length; c;) {
                        y = p;
                        for (p = []; ++x < c;) y && y[x].run();
                        x = -1;
                        c = p.length
                    }
                    y = null;
                    A = !1;
                    e(a)
                }
            }

            function c(b, a) {
                this.fun = b;
                this.array = a
            }

            function g() {}
            f = n.exports = {};
            try {
                var q = "function" === typeof setTimeout ? setTimeout : a
            } catch (w) {
                q = a
            }
            try {
                var l = "function" === typeof clearTimeout ? clearTimeout : h
            } catch (w) {
                l = h
            }
            var p = [],
                A = !1,
                y, x = -1;
            f.nextTick = function(a) {
                var d = Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var e = 1; e < arguments.length; e++) d[e - 1] = arguments[e];
                p.push(new c(a, d));
                1 !== p.length || A || b(k)
            };
            c.prototype.run = function() {
                this.fun.apply(null, this.array)
            };
            f.title = "browser";
            f.browser = !0;
            f.env = {};
            f.argv = [];
            f.version = "";
            f.versions = {};
            f.on = g;
            f.addListener = g;
            f.once =
                g;
            f.off = g;
            f.removeListener = g;
            f.removeAllListeners = g;
            f.emit = g;
            f.prependListener = g;
            f.prependOnceListener = g;
            f.listeners = function(b) {
                return []
            };
            f.binding = function(b) {
                throw Error("process.binding is not supported");
            };
            f.cwd = function() {
                return "/"
            };
            f.chdir = function(b) {
                throw Error("process.chdir is not supported");
            };
            f.umask = function() {
                return 0
            }
        }, {}],
        8: [function(f, n, m) {
            m.get = function(a) {
                var h = Error.stackTraceLimit;
                Error.stackTraceLimit = Infinity;
                var b = {},
                    e = Error.prepareStackTrace;
                Error.prepareStackTrace = function(b,
                    a) {
                    return a
                };
                Error.captureStackTrace(b, a || m.get);
                a = b.stack;
                Error.prepareStackTrace = e;
                Error.stackTraceLimit = h;
                return a
            };
            m.parse = function(a) {
                if (!a.stack) return [];
                var h = this;
                return a.stack.split("\n").slice(1).map(function(b) {
                    if (b.match(/^\s*[-]{4,}$/)) return h._createParsedCallSite({
                        fileName: b,
                        lineNumber: null,
                        functionName: null,
                        typeName: null,
                        methodName: null,
                        columnNumber: null,
                        "native": null
                    });
                    if (b = b.match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/)) {
                        var a = null,
                            d = null,
                            k = null,
                            c = null,
                            g = null,
                            q = "native" ===
                            b[5];
                        b[1] && (d = b[1].match(/([^\.]+)(?:\.(.+))?/), a = d[1], d = d[2], k = b[1], c = "Object");
                        d && (c = a, g = d);
                        "<anonymous>" === d && (g = null, k = "");
                        b = {
                            fileName: b[2] || null,
                            lineNumber: parseInt(b[3], 10) || null,
                            functionName: k,
                            typeName: c,
                            methodName: g,
                            columnNumber: parseInt(b[4], 10) || null,
                            "native": q
                        };
                        return h._createParsedCallSite(b)
                    }
                }).filter(function(b) {
                    return !!b
                })
            };
            m._createParsedCallSite = function(a) {
                var h = {},
                    b;
                for (b in a) {
                    var e = "get";
                    "native" === b && (e = "is");
                    var d = e + b.substr(0, 1).toUpperCase() + b.substr(1);
                    (function(b) {
                        h[d] =
                            function() {
                                return a[b]
                            }
                    })(b)
                }
                e = Object.create(h);
                for (b in a) e[b] = a[b];
                return e
            }
        }, {}],
        9: [function(f, n, m) {
            n.exports = function(a) {
                return a && "object" === typeof a && "function" === typeof a.copy && "function" === typeof a.fill && "function" === typeof a.readUInt8
            }
        }, {}],
        10: [function(f, n, m) {
            (function(a, h) {
                function b(b, a) {
                    var g = {
                        seen: [],
                        stylize: d
                    };
                    3 <= arguments.length && (g.depth = arguments[2]);
                    4 <= arguments.length && (g.colors = arguments[3]);
                    x(a) ? g.showHidden = a : a && m._extend(g, a);
                    r(g.showHidden) && (g.showHidden = !1);
                    r(g.depth) &&
                        (g.depth = 2);
                    r(g.colors) && (g.colors = !1);
                    r(g.customInspect) && (g.customInspect = !0);
                    g.colors && (g.stylize = e);
                    return c(g, b, g.depth)
                }

                function e(a, c) {
                    return (c = b.styles[c]) ? "\u001b[" + b.colors[c][0] + "m" + a + "\u001b[" + b.colors[c][1] + "m" : a
                }

                function d(b, a) {
                    return b
                }

                function k(b) {
                    var a = {};
                    b.forEach(function(b, c) {
                        a[b] = !0
                    });
                    return a
                }

                function c(b, a, d) {
                    if (b.customInspect && a && I(a.inspect) && a.inspect !== m.inspect && (!a.constructor || a.constructor.prototype !== a)) {
                        var e = a.inspect(d, b);
                        n(e) || (e = c(b, e, d));
                        return e
                    }
                    if (e = g(b, a)) return e;
                    var h = Object.keys(a),
                        f = k(h);
                    b.showHidden && (h = Object.getOwnPropertyNames(a));
                    if (E(a) && (0 <= h.indexOf("message") || 0 <= h.indexOf("description"))) return q(a);
                    if (0 === h.length) {
                        if (I(a)) return b.stylize("[Function" + (a.name ? ": " + a.name : "") + "]", "special");
                        if (z(a)) return b.stylize(RegExp.prototype.toString.call(a), "regexp");
                        if (D(a)) return b.stylize(Date.prototype.toString.call(a), "date");
                        if (E(a)) return q(a)
                    }
                    e = "";
                    var x = !1,
                        w = ["{", "}"];
                    y(a) && (x = !0, w = ["[", "]"]);
                    I(a) && (e = " [Function" + (a.name ? ": " + a.name : "") + "]");
                    z(a) && (e = " " + RegExp.prototype.toString.call(a));
                    D(a) && (e = " " + Date.prototype.toUTCString.call(a));
                    E(a) && (e = " " + q(a));
                    if (0 === h.length && (!x || 0 == a.length)) return w[0] + e + w[1];
                    if (0 > d) return z(a) ? b.stylize(RegExp.prototype.toString.call(a), "regexp") : b.stylize("[Object]", "special");
                    b.seen.push(a);
                    h = x ? l(b, a, d, f, h) : h.map(function(c) {
                        return p(b, a, d, f, c, x)
                    });
                    b.seen.pop();
                    return A(h, e, w)
                }

                function g(b, a) {
                    if (r(a)) return b.stylize("undefined", "undefined");
                    if (n(a)) return a = "'" + JSON.stringify(a).replace(/^"|"$/g, "").replace(/'/g,
                        "\\'").replace(/\\"/g, '"') + "'", b.stylize(a, "string");
                    if (w(a)) return b.stylize("" + a, "number");
                    if (x(a)) return b.stylize("" + a, "boolean");
                    if (null === a) return b.stylize("null", "null")
                }

                function q(b) {
                    return "[" + Error.prototype.toString.call(b) + "]"
                }

                function l(b, a, c, d, e) {
                    for (var g = [], l = 0, k = a.length; l < k; ++l) Object.prototype.hasOwnProperty.call(a, String(l)) ? g.push(p(b, a, c, d, String(l), !0)) : g.push("");
                    e.forEach(function(e) {
                        e.match(/^\d+$/) || g.push(p(b, a, c, d, e, !0))
                    });
                    return g
                }

                function p(b, a, d, e, g, l) {
                    var k, p;
                    a = Object.getOwnPropertyDescriptor(a,
                        g) || {
                        value: a[g]
                    };
                    a.get ? p = a.set ? b.stylize("[Getter/Setter]", "special") : b.stylize("[Getter]", "special") : a.set && (p = b.stylize("[Setter]", "special"));
                    Object.prototype.hasOwnProperty.call(e, g) || (k = "[" + g + "]");
                    p || (0 > b.seen.indexOf(a.value) ? (p = null === d ? c(b, a.value, null) : c(b, a.value, d - 1), -1 < p.indexOf("\n") && (p = l ? p.split("\n").map(function(b) {
                        return "  " + b
                    }).join("\n").substr(2) : "\n" + p.split("\n").map(function(b) {
                        return "   " + b
                    }).join("\n"))) : p = b.stylize("[Circular]", "special"));
                    if (r(k)) {
                        if (l && g.match(/^\d+$/)) return p;
                        k = JSON.stringify("" + g);
                        k.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (k = k.substr(1, k.length - 2), k = b.stylize(k, "name")) : (k = k.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), k = b.stylize(k, "string"))
                    }
                    return k + ": " + p
                }

                function A(b, a, c) {
                    var d = 0;
                    return 60 < b.reduce(function(b, a) {
                        d++;
                        0 <= a.indexOf("\n") && d++;
                        return b + a.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0) ? c[0] + ("" === a ? "" : a + "\n ") + " " + b.join(",\n  ") + " " + c[1] : c[0] + a + " " + b.join(", ") + " " + c[1]
                }

                function y(b) {
                    return Array.isArray(b)
                }

                function x(b) {
                    return "boolean" ===
                        typeof b
                }

                function w(b) {
                    return "number" === typeof b
                }

                function n(b) {
                    return "string" === typeof b
                }

                function r(b) {
                    return void 0 === b
                }

                function z(b) {
                    return t(b) && "[object RegExp]" === Object.prototype.toString.call(b)
                }

                function t(b) {
                    return "object" === typeof b && null !== b
                }

                function D(b) {
                    return t(b) && "[object Date]" === Object.prototype.toString.call(b)
                }

                function E(b) {
                    return t(b) && ("[object Error]" === Object.prototype.toString.call(b) || b instanceof Error)
                }

                function I(b) {
                    return "function" === typeof b
                }

                function K(b) {
                    return 10 > b ?
                        "0" + b.toString(10) : b.toString(10)
                }

                function P() {
                    var b = new Date,
                        a = [K(b.getHours()), K(b.getMinutes()), K(b.getSeconds())].join(":");
                    return [b.getDate(), L[b.getMonth()], a].join(" ")
                }
                var Q = /%[sdj%]/g;
                m.format = function(a) {
                    if (!n(a)) {
                        for (var c = [], d = 0; d < arguments.length; d++) c.push(b(arguments[d]));
                        return c.join(" ")
                    }
                    d = 1;
                    var e = arguments,
                        g = e.length;
                    c = String(a).replace(Q, function(b) {
                        if ("%%" === b) return "%";
                        if (d >= g) return b;
                        switch (b) {
                            case "%s":
                                return String(e[d++]);
                            case "%d":
                                return Number(e[d++]);
                            case "%j":
                                try {
                                    return JSON.stringify(e[d++])
                                } catch (fa) {
                                    return "[Circular]"
                                }
                            default:
                                return b
                        }
                    });
                    for (var l = e[d]; d < g; l = e[++d]) c = null !== l && t(l) ? c + (" " + b(l)) : c + (" " + l);
                    return c
                };
                m.deprecate = function(b, c) {
                    if (r(h.process)) return function() {
                        return m.deprecate(b, c).apply(this, arguments)
                    };
                    if (!0 === a.noDeprecation) return b;
                    var d = !1;
                    return function() {
                        if (!d) {
                            if (a.throwDeprecation) throw Error(c);
                            a.traceDeprecation ? console.trace(c) : console.error(c);
                            d = !0
                        }
                        return b.apply(this, arguments)
                    }
                };
                var M = {},
                    F;
                m.debuglog = function(b) {
                    r(F) && (F = a.env.NODE_DEBUG || "");
                    b = b.toUpperCase();
                    if (!M[b])
                        if ((new RegExp("\\b" + b + "\\b",
                                "i")).test(F)) {
                            var c = a.pid;
                            M[b] = function() {
                                var a = m.format.apply(m, arguments);
                                console.error("%s %d: %s", b, c, a)
                            }
                        } else M[b] = function() {};
                    return M[b]
                };
                m.inspect = b;
                b.colors = {
                    bold: [1, 22],
                    italic: [3, 23],
                    underline: [4, 24],
                    inverse: [7, 27],
                    white: [37, 39],
                    grey: [90, 39],
                    black: [30, 39],
                    blue: [34, 39],
                    cyan: [36, 39],
                    green: [32, 39],
                    magenta: [35, 39],
                    red: [31, 39],
                    yellow: [33, 39]
                };
                b.styles = {
                    special: "cyan",
                    number: "yellow",
                    "boolean": "yellow",
                    undefined: "grey",
                    "null": "bold",
                    string: "green",
                    date: "magenta",
                    regexp: "red"
                };
                m.isArray = y;
                m.isBoolean =
                    x;
                m.isNull = function(b) {
                    return null === b
                };
                m.isNullOrUndefined = function(b) {
                    return null == b
                };
                m.isNumber = w;
                m.isString = n;
                m.isSymbol = function(b) {
                    return "symbol" === typeof b
                };
                m.isUndefined = r;
                m.isRegExp = z;
                m.isObject = t;
                m.isDate = D;
                m.isError = E;
                m.isFunction = I;
                m.isPrimitive = function(b) {
                    return null === b || "boolean" === typeof b || "number" === typeof b || "string" === typeof b || "symbol" === typeof b || "undefined" === typeof b
                };
                m.isBuffer = f(9);
                var L = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
                m.log = function() {
                    console.log("%s - %s",
                        P(), m.format.apply(m, arguments))
                };
                m.inherits = f(5);
                m._extend = function(b, a) {
                    if (!a || !t(a)) return b;
                    for (var c = Object.keys(a), d = c.length; d--;) b[c[d]] = a[c[d]];
                    return b
                }
            }).call(this, f(7), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
        }, {}],
        11: [function(f, n, m) {
            n.exports = {
                _edge: 17,
                $eu: [0, 0],
                $prussia: [.058823529411764705, 0],
                $spqr: [.11764705882352941, 0],
                $ussr: [.17647058823529413, 0],
                ad: [.23529411764705882, 0],
                ae: [.29411764705882354, 0],
                af: [.35294117647058826,
                    0
                ],
                ag: [.4117647058823529, 0],
                ai: [.47058823529411764, 0],
                al: [.5294117647058824, 0],
                am: [.5882352941176471, 0],
                ao: [.6470588235294118, 0],
                aq: [.7058823529411765, 0],
                ar: [.7647058823529411, 0],
                as: [.8235294117647058, 0],
                at: [.8823529411764706, 0],
                au: [.9411764705882353, 0],
                aw: [0, .058823529411764705],
                ax: [.058823529411764705, .058823529411764705],
                az: [.11764705882352941, .058823529411764705],
                ba: [.17647058823529413, .058823529411764705],
                bb: [.23529411764705882, .058823529411764705],
                bd: [.29411764705882354, .058823529411764705],
                be: [.35294117647058826, .058823529411764705],
                bf: [.4117647058823529, .058823529411764705],
                bg: [.47058823529411764, .058823529411764705],
                bh: [.5294117647058824, .058823529411764705],
                bi: [.5882352941176471, .058823529411764705],
                bj: [.6470588235294118, .058823529411764705],
                bl: [.7058823529411765, .058823529411764705],
                bm: [.7647058823529411, .058823529411764705],
                bn: [.8235294117647058, .058823529411764705],
                bo: [.8823529411764706, .058823529411764705],
                bq: [.9411764705882353, .058823529411764705],
                br: [0, .11764705882352941],
                bs: [.058823529411764705, .11764705882352941],
                bt: [.11764705882352941, .11764705882352941],
                bv: [.17647058823529413, .11764705882352941],
                bw: [.23529411764705882, .11764705882352941],
                by: [.29411764705882354, .11764705882352941],
                bz: [.35294117647058826, .11764705882352941],
                ca: [.4117647058823529, .11764705882352941],
                cc: [.47058823529411764, .11764705882352941],
                cd: [.5294117647058824, .11764705882352941],
                cf: [.5882352941176471, .11764705882352941],
                cg: [.6470588235294118, .11764705882352941],
                ch: [.7058823529411765, .11764705882352941],
                ci: [.7647058823529411, .11764705882352941],
                ck: [.8235294117647058, .11764705882352941],
                cl: [.8823529411764706, .11764705882352941],
                cm: [.9411764705882353, .11764705882352941],
                cn: [0, .17647058823529413],
                co: [.058823529411764705, .17647058823529413],
                cr: [.11764705882352941, .17647058823529413],
                cu: [.17647058823529413, .17647058823529413],
                cv: [.23529411764705882, .17647058823529413],
                cw: [.29411764705882354, .17647058823529413],
                cx: [.35294117647058826, .17647058823529413],
                cy: [.4117647058823529, .17647058823529413],
                cz: [.47058823529411764,
                    .17647058823529413
                ],
                de: [.5294117647058824, .17647058823529413],
                dj: [.5882352941176471, .17647058823529413],
                dk: [.6470588235294118, .17647058823529413],
                dm: [.7058823529411765, .17647058823529413],
                "do": [.7647058823529411, .17647058823529413],
                dz: [.8235294117647058, .17647058823529413],
                ec: [.8823529411764706, .17647058823529413],
                ee: [.9411764705882353, .17647058823529413],
                eg: [0, .23529411764705882],
                eh: [.058823529411764705, .23529411764705882],
                er: [.11764705882352941, .23529411764705882],
                es: [.17647058823529413, .23529411764705882],
                et: [.23529411764705882, .23529411764705882],
                fi: [.29411764705882354, .23529411764705882],
                fj: [.35294117647058826, .23529411764705882],
                fk: [.4117647058823529, .23529411764705882],
                fm: [.47058823529411764, .23529411764705882],
                fo: [.5294117647058824, .23529411764705882],
                fr: [.5882352941176471, .23529411764705882],
                ga: [.6470588235294118, .23529411764705882],
                "gb-eng": [.7058823529411765, .23529411764705882],
                "gb-sct": [.7647058823529411, .23529411764705882],
                "gb-wls": [.8235294117647058, .23529411764705882],
                gb: [.8823529411764706,
                    .23529411764705882
                ],
                gd: [.9411764705882353, .23529411764705882],
                ge: [0, .29411764705882354],
                gf: [.058823529411764705, .29411764705882354],
                gg: [.11764705882352941, .29411764705882354],
                gh: [.17647058823529413, .29411764705882354],
                gi: [.23529411764705882, .29411764705882354],
                gl: [.29411764705882354, .29411764705882354],
                gm: [.35294117647058826, .29411764705882354],
                gn: [.4117647058823529, .29411764705882354],
                gp: [.47058823529411764, .29411764705882354],
                gq: [.5294117647058824, .29411764705882354],
                gr: [.5882352941176471, .29411764705882354],
                gs: [.6470588235294118, .29411764705882354],
                gt: [.7058823529411765, .29411764705882354],
                gu: [.7647058823529411, .29411764705882354],
                gw: [.8235294117647058, .29411764705882354],
                gy: [.8823529411764706, .29411764705882354],
                hk: [.9411764705882353, .29411764705882354],
                hm: [0, .35294117647058826],
                hn: [.058823529411764705, .35294117647058826],
                hr: [.11764705882352941, .35294117647058826],
                ht: [.17647058823529413, .35294117647058826],
                hu: [.23529411764705882, .35294117647058826],
                id: [.29411764705882354, .35294117647058826],
                ie: [.35294117647058826,
                    .35294117647058826
                ],
                il: [.4117647058823529, .35294117647058826],
                im: [.47058823529411764, .35294117647058826],
                "in": [.5294117647058824, .35294117647058826],
                io: [.5882352941176471, .35294117647058826],
                iq: [.6470588235294118, .35294117647058826],
                ir: [.7058823529411765, .35294117647058826],
                is: [.7647058823529411, .35294117647058826],
                it: [.8235294117647058, .35294117647058826],
                je: [.8823529411764706, .35294117647058826],
                jm: [.9411764705882353, .35294117647058826],
                jo: [0, .4117647058823529],
                jp: [.058823529411764705, .4117647058823529],
                ke: [.11764705882352941, .4117647058823529],
                kg: [.17647058823529413, .4117647058823529],
                kh: [.23529411764705882, .4117647058823529],
                ki: [.29411764705882354, .4117647058823529],
                km: [.35294117647058826, .4117647058823529],
                kn: [.4117647058823529, .4117647058823529],
                kp: [.47058823529411764, .4117647058823529],
                kr: [.5294117647058824, .4117647058823529],
                ku: [.5882352941176471, .4117647058823529],
                kw: [.6470588235294118, .4117647058823529],
                ky: [.7058823529411765, .4117647058823529],
                kz: [.7647058823529411, .4117647058823529],
                la: [.8235294117647058,
                    .4117647058823529
                ],
                lb: [.8823529411764706, .4117647058823529],
                lc: [.9411764705882353, .4117647058823529],
                li: [0, .47058823529411764],
                lk: [.058823529411764705, .47058823529411764],
                lr: [.11764705882352941, .47058823529411764],
                ls: [.17647058823529413, .47058823529411764],
                lt: [.23529411764705882, .47058823529411764],
                lu: [.29411764705882354, .47058823529411764],
                lv: [.35294117647058826, .47058823529411764],
                ly: [.4117647058823529, .47058823529411764],
                ma: [.47058823529411764, .47058823529411764],
                mc: [.5294117647058824, .47058823529411764],
                md: [.5882352941176471, .47058823529411764],
                me: [.6470588235294118, .47058823529411764],
                mf: [.7058823529411765, .47058823529411764],
                mg: [.7647058823529411, .47058823529411764],
                mh: [.8235294117647058, .47058823529411764],
                mk: [.8823529411764706, .47058823529411764],
                ml: [.9411764705882353, .47058823529411764],
                mm: [0, .5294117647058824],
                mn: [.058823529411764705, .5294117647058824],
                mo: [.11764705882352941, .5294117647058824],
                mp: [.17647058823529413, .5294117647058824],
                mq: [.23529411764705882, .5294117647058824],
                mr: [.29411764705882354,
                    .5294117647058824
                ],
                ms: [.35294117647058826, .5294117647058824],
                mt: [.4117647058823529, .5294117647058824],
                mu: [.47058823529411764, .5294117647058824],
                mv: [.5294117647058824, .5294117647058824],
                mw: [.5882352941176471, .5294117647058824],
                mx: [.6470588235294118, .5294117647058824],
                my: [.7058823529411765, .5294117647058824],
                mz: [.7647058823529411, .5294117647058824],
                na: [.8235294117647058, .5294117647058824],
                nc: [.8823529411764706, .5294117647058824],
                ne: [.9411764705882353, .5294117647058824],
                nf: [0, .5882352941176471],
                ng: [.058823529411764705,
                    .5882352941176471
                ],
                ni: [.11764705882352941, .5882352941176471],
                nl: [.17647058823529413, .5882352941176471],
                no: [.23529411764705882, .5882352941176471],
                np: [.29411764705882354, .5882352941176471],
                nr: [.35294117647058826, .5882352941176471],
                nu: [.4117647058823529, .5882352941176471],
                nz: [.47058823529411764, .5882352941176471],
                om: [.5294117647058824, .5882352941176471],
                pa: [.5882352941176471, .5882352941176471],
                pe: [.6470588235294118, .5882352941176471],
                pf: [.7058823529411765, .5882352941176471],
                pg: [.7647058823529411, .5882352941176471],
                ph: [.8235294117647058, .5882352941176471],
                pk: [.8823529411764706, .5882352941176471],
                pl: [.9411764705882353, .5882352941176471],
                pm: [0, .6470588235294118],
                pn: [.058823529411764705, .6470588235294118],
                pr: [.11764705882352941, .6470588235294118],
                ps: [.17647058823529413, .6470588235294118],
                pt: [.23529411764705882, .6470588235294118],
                pw: [.29411764705882354, .6470588235294118],
                py: [.35294117647058826, .6470588235294118],
                qa: [.4117647058823529, .6470588235294118],
                re: [.47058823529411764, .6470588235294118],
                ro: [.5294117647058824,
                    .6470588235294118
                ],
                rs: [.5882352941176471, .6470588235294118],
                ru: [.6470588235294118, .6470588235294118],
                rw: [.7058823529411765, .6470588235294118],
                sa: [.7647058823529411, .6470588235294118],
                sb: [.8235294117647058, .6470588235294118],
                sc: [.8823529411764706, .6470588235294118],
                sd: [.9411764705882353, .6470588235294118],
                se: [0, .7058823529411765],
                sg: [.058823529411764705, .7058823529411765],
                sh: [.11764705882352941, .7058823529411765],
                si: [.17647058823529413, .7058823529411765],
                sj: [.23529411764705882, .7058823529411765],
                sk: [.29411764705882354,
                    .7058823529411765
                ],
                sl: [.35294117647058826, .7058823529411765],
                sm: [.4117647058823529, .7058823529411765],
                sn: [.47058823529411764, .7058823529411765],
                so: [.5294117647058824, .7058823529411765],
                sr: [.5882352941176471, .7058823529411765],
                ss: [.6470588235294118, .7058823529411765],
                st: [.7058823529411765, .7058823529411765],
                sv: [.7647058823529411, .7058823529411765],
                sx: [.8235294117647058, .7058823529411765],
                sy: [.8823529411764706, .7058823529411765],
                sz: [.9411764705882353, .7058823529411765],
                tc: [0, .7647058823529411],
                td: [.058823529411764705,
                    .7647058823529411
                ],
                tf: [.11764705882352941, .7647058823529411],
                tg: [.17647058823529413, .7647058823529411],
                th: [.23529411764705882, .7647058823529411],
                tj: [.29411764705882354, .7647058823529411],
                tk: [.35294117647058826, .7647058823529411],
                tl: [.4117647058823529, .7647058823529411],
                tm: [.47058823529411764, .7647058823529411],
                tn: [.5294117647058824, .7647058823529411],
                to: [.5882352941176471, .7647058823529411],
                tr: [.6470588235294118, .7647058823529411],
                tt: [.7058823529411765, .7647058823529411],
                tv: [.7647058823529411, .7647058823529411],
                tw: [.8235294117647058, .7647058823529411],
                tz: [.8823529411764706, .7647058823529411],
                ua: [.9411764705882353, .7647058823529411],
                ug: [0, .8235294117647058],
                um: [.058823529411764705, .8235294117647058],
                us: [.11764705882352941, .8235294117647058],
                uy: [.17647058823529413, .8235294117647058],
                uz: [.23529411764705882, .8235294117647058],
                va: [.29411764705882354, .8235294117647058],
                vc: [.35294117647058826, .8235294117647058],
                ve: [.4117647058823529, .8235294117647058],
                vg: [.47058823529411764, .8235294117647058],
                vi: [.5294117647058824,
                    .8235294117647058
                ],
                vn: [.5882352941176471, .8235294117647058],
                vu: [.6470588235294118, .8235294117647058],
                wf: [.7058823529411765, .8235294117647058],
                ws: [.7647058823529411, .8235294117647058],
                xk: [.8235294117647058, .8235294117647058],
                ye: [.8823529411764706, .8235294117647058],
                yt: [.9411764705882353, .8235294117647058],
                za: [0, .8823529411764706],
                zm: [.058823529411764705, .8823529411764706],
                zw: [.11764705882352941, .8823529411764706]
            }
        }, {}],
        12: [function(f, n, m) {
            arguments[4][11][0].apply(m, arguments)
        }, {}],
        13: [function(f,
            n, m) {
            n.exports = {
                desert: {
                    w: 576,
                    h: 448,
                    f: {
                        cactus1: [0, 0, 192, 256, "center", "tree"],
                        cactus2: [192, 0, 192, 256, "center", "tree"],
                        hydrant1: [0, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [0, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [192, 256, 64, 64, "center", "weapon"],
                        pole1: [384, 0, 192, 256, "center", "misc"],
                        stone1: [256, 256, 64, 64, "center", "stone"]
                    }
                },
                moon: {
                    w: 384,
                    h: 320,
                    f: {
                        light1: [0, 0, 192, 256, "center", "light"],
                        light2: [192, 0, 192, 256, "center", "light"],
                        stone1: [0, 256, 64, 64, "center", "stone"],
                        stone2: [64, 256, 64, 64, "center", "stone"]
                    }
                },
                spring: {
                    w: 576,
                    h: 512,
                    f: {
                        hydrant1: [384, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [384, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [448, 320, 64, 64, "center", "weapon"],
                        pole1: [0, 0, 192, 256, "center", "misc"],
                        stone1: [512, 320, 64, 64, "center", "stone"],
                        tree1: [192, 0, 192, 256, "center", "tree"],
                        tree2: [384, 0, 192, 256, "center", "tree"],
                        tree3: [0, 256, 192, 256, "center", "tree"],
                        tree4: [192, 256, 192, 256, "center", "tree"]
                    }
                },
                winter: {
                    w: 576,
                    h: 512,
                    f: {
                        hydrant1: [384, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [384, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [448,
                            320, 64, 64, "center", "weapon"
                        ],
                        pole1: [0, 0, 192, 256, "center", "misc"],
                        stone1: [512, 320, 64, 64, "center", "stone"],
                        tree1_winter: [192, 0, 192, 256, "center", "tree"],
                        tree2_winter: [384, 0, 192, 256, "center", "tree"],
                        tree3_winter: [0, 256, 192, 256, "center", "tree"],
                        tree4_winter: [192, 256, 192, 256, "center", "tree"]
                    }
                }
            }
        }, {}],
        14: [function(f, n, m) {
            n.exports = [{
                name: "brick1",
                start: 0,
                end: 6418,
                rateVar: .2
            }, {
                name: "death",
                start: 7919,
                end: 11873,
                rateVar: .2
            }, {
                name: "explosion1",
                start: 13374,
                end: 53959,
                rateVar: .5
            }, {
                name: "explosion2",
                start: 55460,
                end: 98060,
                rateVar: .5
            }, {
                name: "explosion3",
                start: 99561,
                end: 155031,
                rateVar: .5
            }, {
                name: "flag2",
                start: 156532,
                end: 227187,
                rateVar: 0
            }, {
                name: "flag3",
                start: 228688,
                end: 299343,
                rateVar: 0
            }, {
                name: "flag4",
                start: 300844,
                end: 380459,
                rateVar: 0
            }, {
                name: "impact1",
                start: 381960,
                end: 388532,
                rateVar: 0
            }, {
                name: "impact2",
                start: 390033,
                end: 394313,
                rateVar: .2
            }, {
                name: "impact3",
                start: 395814,
                end: 401629,
                rateVar: .2
            }, {
                name: "item1",
                start: 403130,
                end: 405382,
                rateVar: .3
            }, {
                name: "jetpack1",
                start: 406883,
                end: 450982,
                rateVar: 0
            }, {
                name: "pickup1",
                start: 452483,
                end: 461162,
                rateVar: 0
            }, {
                name: "plane1",
                start: 462663,
                end: 605848,
                rateVar: 0
            }, {
                name: "reload2",
                start: 607349,
                end: 624153,
                rateVar: .2
            }, {
                name: "reload3",
                start: 625654,
                end: 645090,
                rateVar: .2
            }, {
                name: "reload4",
                start: 646591,
                end: 650218,
                rateVar: .2
            }, {
                name: "reload5",
                start: 651719,
                end: 672918,
                rateVar: .2
            }, {
                name: "rope1",
                start: 674419,
                end: 680088,
                rateVar: .2
            }, {
                name: "shot1",
                start: 681589,
                end: 698124,
                rateVar: 0
            }, {
                name: "shot2",
                start: 699625,
                end: 716494,
                rateVar: .3
            }, {
                name: "shot3",
                start: 717995,
                end: 755327,
                rateVar: .3
            }, {
                name: "shot4",
                start: 756828,
                end: 770306,
                rateVar: .1
            }, {
                name: "shot5",
                start: 771807,
                end: 808814,
                rateVar: .1
            }, {
                name: "shot6",
                start: 810315,
                end: 813886,
                rateVar: 0
            }, {
                name: "tree1",
                start: 815387,
                end: 903065,
                rateVar: .5
            }, {
                name: "trigger1",
                start: 904566,
                end: 908334,
                rateVar: 0
            }, {
                name: "walk1",
                start: 909835,
                end: 913513,
                rateVar: .1
            }, {
                name: "water1",
                start: 915014,
                end: 923301,
                rateVar: .5
            }, {
                name: "water2",
                start: 924802,
                end: 1057101,
                rateVar: .2
            }]
        }, {}],
        15: [function(f, n, m) {
            n.exports = {
                ball: "precision mediump float;\r\nuniform sampler2D texBorder;\r\nuniform sampler2D texFlag;\r\nuniform sampler2D texEyes;\r\nuniform sampler2D texGlasses;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\r\nuniform vec2 flagTexOffset;\r\nuniform vec2 flagTexSize;\r\n\r\nuniform vec2 glassesTexOffset;\r\nuniform vec2 glassesTexSize;\r\n\r\nuniform vec2 eyeOffset;\r\nuniform vec2 eyePos;\r\nuniform float eyeLeftAngle;\r\nuniform float eyeRightAngle;\r\nuniform float eyeSize;\r\nuniform bool flagInvert;\r\n\r\nbool mirror;\r\n\r\nconst vec2 fisheyeCenter = vec2(0.5, 0.5);\r\nconst vec2 fisheyeScale = vec2(-0.5, -0.5);\r\n\r\nconst mat3 cubeFlag0 = mat3(\r\n\tvec3(1.297, -0.008, 0),\r\n\tvec3(-0.005, 1.340, 0),\r\n\tvec3(-0.258, -0.273, 1)\r\n);\r\n\r\nconst mat3 cubeFlag1 = mat3(\r\n\tvec3(1.31579, 0, 0),\r\n\tvec3(-1.30777, 6.09756, 0),\r\n\tvec3(-0.013, -0.195, 1)\r\n);\r\n\r\nconst mat3 cubeFlag2 = mat3(\r\n\tvec3(6.344, -1.377, 0.0),\r\n\tvec3(0.0, 1.338, 0.0),\r\n\tvec3(-0.184, 0.023, 1.0)\r\n);\r\n\r\nconst mat3 mirrorMatrix = mat3(\r\n\tvec3(-1, 0, 0),\r\n\tvec3(0, 1, 0),\r\n\tvec3(1, 0, 1)\r\n);\r\n\r\n\r\nfloat distSquared(vec2 a, vec2 b)\r\n{\r\n\tfloat diffX = a.x - b.x;\r\n\tfloat diffY = a.y - b.y;\r\n\r\n\treturn diffX * diffX + diffY * diffY;\r\n}\r\n\r\nbool useGlasses()\r\n{\r\n\treturn glassesTexSize != vec2(0.0);\r\n}\r\n\r\nvec4 getTexelGlasses(vec4 rgba, vec2 coord)\r\n{\r\n\tvec2 textureCoordinateToUse = coord * 0.8 + vec2(0.1);\r\n\ttextureCoordinateToUse.x += -eyePos.x + 0.5;\r\n\ttextureCoordinateToUse.y += -eyePos.y + 0.4;\r\n\r\n\tvec4 texel = texture2D(texGlasses, textureCoordinateToUse * glassesTexSize + glassesTexOffset);\r\n\ttexel *= rgba.a;\r\n\r\n\treturn mix(rgba, texel, texel.a);\r\n}\r\n\r\nvec4 getTexelPath(vec2 coord)\r\n{\r\n#if PATHTYPE == 0\r\n\t\tcoord += vec2(0.0, 1.0);\r\n#elif PATHTYPE == 1\r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n#elif PATHTYPE == 2\r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n\t\tcoord += vec2(1.05, 0.0);\r\n#endif\r\n\r\n\treturn texture2D(texBorder, coord * 0.5);\r\n}\r\n\r\nvec4 getTexelCube(vec3 coord3, mat3 transform)\r\n{\t\t\t\t\r\n\tvec3 flagCoord;\r\n\r\n\tif(mirror) coord3 = vec3(1.0 - coord3.x, coord3.y, coord3.z);\r\n\t\r\n\tflagCoord = transform * coord3;\r\n\t \r\n\r\n\tif(flagCoord.x < 0.0 || flagCoord.x > 1.0 || flagCoord.y < 0.0 || flagCoord.y > 1.0)\r\n\t{\r\n\t\treturn vec4(0.0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn texture2D(texFlag, flagCoord.xy * flagTexSize + flagTexOffset);\r\n\t}\r\n}\r\n\r\nvec4 getTexelFlag(vec2 coord)\r\n{\r\n#if PATHTYPE == 0\r\n\t\tvec2 textureCoordinateToUse = coord;\r\n\t\t\r\n\t\tfloat dist = distance(fisheyeCenter, textureCoordinateToUse);\r\n\t\ttextureCoordinateToUse -= fisheyeCenter;\r\n\r\n\t\tvec2 percent = vec2(1.0) + ((0.5 - dist) / 0.5) * fisheyeScale;\r\n\t\ttextureCoordinateToUse = textureCoordinateToUse * percent + fisheyeCenter;\r\n\r\n\t\treturn texture2D(texFlag, textureCoordinateToUse * flagTexSize + flagTexOffset);\r\n#elif PATHTYPE == 1\r\n\t\tfloat cubeFactor = 0.76;\r\n\t\tfloat cubeOffset = 0.26;\r\n\t\tvec4 cubeColor = vec4(1.0);\r\n\r\n\t\tvec3 coord3 = vec3(coord, 1.0);\r\n\r\n\t\tvec4 texel0 = getTexelCube(coord3, cubeFlag0);\r\n\t\tvec4 texel1 = getTexelCube(coord3, cubeFlag1);\r\n\t\tvec4 texel2 = getTexelCube(coord3, cubeFlag2);\r\n\r\n\t\ttexel1.rgb *= 0.8;\r\n\t\ttexel2.rgb *= 0.6;\r\n\r\n\t\treturn texel0 + texel1 + texel2;\r\n#else \r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n\r\n\t\treturn texture2D(texFlag, coord * flagTexSize + flagTexOffset);\r\n#endif\r\n}\r\n\r\nvec4 getTexelEye(vec2 eyePos, vec4 rgba, mat2 rotMatrix, bool invert)\r\n{\r\n\tfloat halfEyeSize = eyeSize / 2.0;\r\n\r\n\tvec2 shiftedTexCoord = v_TextureCoord - eyePos;\r\n\tvec2 rotatedTexCoord = shiftedTexCoord * rotMatrix;\r\n\r\n\r\n\tif( rotatedTexCoord.x >= -halfEyeSize && rotatedTexCoord.x <= halfEyeSize && \r\n\t\trotatedTexCoord.y >= -halfEyeSize && rotatedTexCoord.y <= halfEyeSize )\r\n\t{\r\n\t\tvec2 windowEyeCoord = (rotatedTexCoord + halfEyeSize) / eyeSize;\r\n\r\n\t\tif(invert)\r\n\t\t{\r\n\t\t\twindowEyeCoord.x = 1.0 - windowEyeCoord.x;\r\n\t\t}\r\n\r\n\t\tvec2 projectedEyeCoord = eyeOffset + windowEyeCoord / 4.0;\r\n\r\n\t\tvec4 texelEye = texture2D(texEyes, projectedEyeCoord);\r\n\r\n\t\tvec3 eyeResult = (texelEye.rgb * texelEye.a) + (rgba.rgb * (1.0 - texelEye.a));\r\n\r\n\t\treturn vec4(eyeResult.rgb, rgba.a);\r\n\t}\r\n\r\n\treturn rgba;\r\n}\r\n\r\nmat2 getEyeRotationMatrix(float a)\r\n{\r\n\tfloat c = cos(a);\r\n\tfloat s = sin(a);\r\n\treturn mat2(c, s, -s, c);\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec2 flagCoord = v_TextureCoord;\r\n\tif(flagInvert) flagCoord.y = 1.0 - flagCoord.y;\r\n\r\n\tmirror = eyePos.x < 0.5;\r\n\r\n\tvec2 shadowPoint = vec2(0.67, 0.32);\r\n\tvec4 texelBorder = getTexelPath(v_TextureCoord);\r\n\tvec4 texelFlag = getTexelFlag(flagCoord);\r\n\t\r\n\r\n\tfloat shadowFactor = 1.0;\r\n\tfloat alpha = texelBorder.a;\r\n\tfloat strength = (texelBorder.r + texelBorder.g + texelBorder.b) / 3.0;\r\n\r\n#if PATHTYPE == 0\r\n\t\tif(distSquared(v_TextureCoord, shadowPoint) > (0.5 * 0.5))\r\n\t\t{\r\n\t\t\tshadowFactor = 0.85;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tshadowFactor = 1.10;\r\n\t\t}\r\n#elif PATHTYPE == 1 || PATHTYPE == 2\r\n\t\tshadowFactor = 1.0;\r\n#endif\r\n\r\n\tvec4 result = texelFlag.rgba * strength * shadowFactor;\r\n\tresult.a = alpha;\r\n\r\n\r\n\tif(useGlasses())\r\n\t{\r\n\t\tresult = getTexelEye(eyePos - vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeLeftAngle), false);\r\n\t\tresult = getTexelEye(eyePos + vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeRightAngle), true);\r\n\t\tresult = getTexelGlasses(result, v_TextureCoord);\r\n\t}\r\n\telse\r\n\t{\r\n\t\tresult = getTexelEye(eyePos - vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeLeftAngle), false);\r\n\t\tresult = getTexelEye(eyePos + vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeRightAngle), true);\r\n\t}\r\n\t\r\n\r\n\tgl_FragColor = result;\r\n}",
                bgF: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texBg;\r\nuniform vec2 screenFactor;\r\nuniform vec2 offset;\r\n\r\nuniform vec4 skyColor;\r\nuniform vec4 skyColor2;\r\nuniform vec4 fogColor;\r\nuniform float fogStart;\r\nuniform float brightness;\r\n\r\nuniform vec2 sunOffset;\r\nuniform float sunSize;\r\nuniform float sunScrollFactor;\r\n\r\nconst int beamSamples = 32;\r\n\r\n\r\nvec4 getSkyColor(vec2 coord)\r\n{\r\n\treturn mix(skyColor2, skyColor, coord.y * 2.0);\r\n}\r\n\r\nvec3 saturation(vec3 rgb, float adjustment)\r\n{\r\n\tconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\r\n\tvec3 intensity = vec3(dot(rgb, W));\r\n\treturn mix(intensity, rgb, adjustment);\r\n}\r\n\r\nvec4 getMainTexture(vec2 coord, out float inservedMainAlpha)\r\n{\r\n\tvec4 mainTexture = texture2D(texBg, coord);\r\n\tmainTexture.rgb = saturation(mainTexture.rgb, 0.6);\r\n\r\n\tinservedMainAlpha = 1.0 - mainTexture.a;\r\n\r\n\tmainTexture.rgb *= mainTexture.a * brightness;\r\n\tmainTexture.rgb += getSkyColor(coord).rgb * inservedMainAlpha;\r\n\tmainTexture.a = 1.0;\r\n\r\n\treturn mainTexture;\r\n}\r\n\r\nfloat getBeamStrength(vec2 to, float inversedMainTextureAlpha)\r\n{\r\n\tvec2 from = (offset + sunOffset) * sunScrollFactor;\r\n\tvec2 distance = to - from;\r\n\tfloat l = length(distance);\r\n\tfloat maxLength = 0.25;\r\n\r\n\tif(l > maxLength) distance = distance / l * maxLength;\r\n\r\n\r\n\tfloat fcount = float(beamSamples);\r\n\r\n\tvec2 delta = distance / fcount;\r\n\tvec2 current = from;\r\n\r\n\t// sample beam\r\n\tfloat light = 0.0;\r\n\r\n\tfor(int i = 0; i < beamSamples; i++)\r\n\t{\r\n\t\tlight += texture2D(texBg, current).a;\r\n\r\n\t\tcurrent += delta;\r\n\t}\r\n\r\n\t// calculate distance curve\r\n\tfloat distanceFactor = 0.0;\r\n\tfloat adjustedLength = l * 16.0;\r\n\tfloat thresholdFactor = 0.5;\r\n\tfloat spreadLengthFactor = 0.03;\r\n\r\n\tif(adjustedLength < 3.1415)\r\n\t{\r\n\t\tdistanceFactor = (cos(adjustedLength) + 1.0) + thresholdFactor;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tdistanceFactor = thresholdFactor - (adjustedLength - 3.1415) * spreadLengthFactor;\r\n\t\tdistanceFactor = max(distanceFactor, 0.0);\r\n\t}\r\n\r\n\t// light rays and blooms\r\n\tlight = 1.0 - (light / fcount);\r\n\tlight = light * distanceFactor;\r\n\r\n\t// sun base\r\n\tlight += (2.0 - l * 12.0) * inversedMainTextureAlpha;\r\n\r\n\t// clip\r\n\tlight = clamp(light, 0.0, 1.0);\r\n\r\n\treturn light;\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec4 result;\r\n\tvec2 coord = v_TextureCoord * screenFactor + offset;\r\n\tfloat inversedMainTextureAlpha = 1.0;\r\n\r\n\tif(coord.y < 0.001)\r\n\t{\r\n\t\tresult = getSkyColor(coord);\r\n\t}\r\n\telse if(coord.y > 1.0)\r\n\t{\r\n\t\tresult = fogColor;\r\n\t\tinversedMainTextureAlpha = 0.0;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tresult = getMainTexture(coord, inversedMainTextureAlpha);\r\n\r\n\t\tif(coord.y > fogStart)\r\n\t\t{\r\n\t\t\tfloat fogSize = 1.0 - fogStart;\r\n\t\t\tfloat fogFactor = (coord.y - fogStart) / fogSize;\r\n\r\n\t\t\tresult = mix(result, fogColor, fogFactor);\r\n\t\t}\r\n\t}\r\n\r\n#if LOWGFX == 0\r\n\tfloat beamStrength = getBeamStrength(coord, inversedMainTextureAlpha);\r\n\r\n\t// mix sunlight in\r\n\tresult = mix(result, vec4(1.0, 1.0, 1.0, 1.0), beamStrength);\r\n#endif\r\n\t\r\n\tgl_FragColor = result;\r\n}",
                bgV: "precision mediump float;\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\r\nvoid main(void) {\r\n\tv_TextureCoord = a_Coord;\r\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\r\n}",
                blast: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texFrame;\r\nuniform sampler2D texData;\r\nuniform vec2 screenSize;\r\nuniform vec2 screenOffset;\r\n\r\nconst int dataSize = 8;\r\nconst float pi = 3.14159265;\r\n\r\n\r\nfloat angleDiff(float a, float b)\r\n{\r\n\tfloat d = mod(abs(a - b), 360.0);\r\n\tfloat r = d > pi ? (pi * 2.0) - d : d;\r\n\r\n\t//calculate sign \r\n\tfloat sign = (a - b >= 0.0 && a - b <= pi) || (a - b <=-pi && a - b >= -(pi * 2.0) )  ? 1.0 : -1.0;\r\n\r\n\treturn r * sign;\r\n}\r\n\r\nbool blast(vec4 data, inout vec4 composed)\r\n{\r\n\tvec2 blastPos = vec2(data.x, data.y) - screenOffset;\r\n\tblastPos.y = screenSize.y - blastPos.y;\r\n\tblastPos /= screenSize;\r\n\r\n\r\n\tfloat progress = data.b;\r\n\tfloat strength = data.a;\r\n\tfloat progressTimesStrength = progress * strength;\r\n\r\n\tvec2 diff = (v_TextureCoord - blastPos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat lengthOnScreen = length(diffScreen);\r\n\r\n\tfloat borderRadius = progressTimesStrength * 6.0;\r\n\tfloat borderWidthPerDirection = progressTimesStrength;\r\n\r\n\tborderWidthPerDirection = max(borderWidthPerDirection, 30.0);\r\n\r\n\tfloat borderMin = (borderRadius - borderWidthPerDirection);\r\n\tfloat borderMax = (borderRadius + borderWidthPerDirection);\r\n\r\n\r\n\tif(lengthOnScreen > borderMin && lengthOnScreen < borderMax)\r\n\t{\r\n\t\tfloat change = sin( (borderMax - lengthOnScreen) / borderWidthPerDirection * (pi / 2.0) ) / 3.0;\r\n\t\tdiff *= 1.0 - change * (1.0 - progress);\r\n\r\n\t\tcomposed += texture2D(texFrame, blastPos + diff);\r\n\r\n\t\treturn true;\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn false;\r\n\t}\r\n}\r\n\r\nbool circulation(vec4 data, inout vec4 composed, vec4 originalColor)\r\n{\r\n\tfloat x = data.r;\r\n\tfloat y = data.g;\r\n\tfloat a = data.b;\r\n\tfloat l = data.a;\r\n\r\n\tvec2 basePos = vec2(data.x, data.y) - screenOffset;\r\n\tbasePos.y = screenSize.y - basePos.y;\r\n\tbasePos /= screenSize;\r\n\r\n\tvec2 diff = (v_TextureCoord - basePos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat distance = length(diff);\r\n\tfloat distanceOnScreen = length(diffScreen);\r\n\r\n\ta = atan(cos(a), sin(a));\r\n\r\n\tvec2 pixelToBase = basePos - v_TextureCoord;\r\n\tvec2 pixelToBaseScreen = pixelToBase * screenSize;\r\n\tfloat a2 = atan(pixelToBaseScreen.y, pixelToBaseScreen.x);\r\n\r\n\r\n\tfloat alpha = angleDiff(a, a2);\r\n\r\n\tfloat halfScattering = 20.0 / l;\r\n\r\n\tif(distanceOnScreen < l && alpha < halfScattering && alpha > -halfScattering )\r\n\t{\r\n\t\tfloat curve = 1.0 - abs(alpha) / halfScattering;\r\n\t\tfloat realLengthProgress = distanceOnScreen / l;\r\n\t\tfloat lengthProgress = max(0.0, realLengthProgress * 5.0 - 4.0);\r\n\t\tfloat reverseLengthProgress = 1.0 - lengthProgress;\r\n\t\tfloat ring = 0.5 + (sin(realLengthProgress * l / 4.0) + 1.0) * 0.25;\r\n\t\tfloat strength = distanceOnScreen * distanceOnScreen;\r\n\r\n\t\tvec2 changeAbsolute = vec2(cos(a2 + 1.57), sin(a2 + 1.57)) * strength / l * alpha * 0.01 * curve * ring;\r\n\r\n\t\t// mix\r\n\t\tvec4 displacedColor = texture2D(texFrame, basePos + diff + changeAbsolute);\r\n\t\tvec4 mixedColor = mix(originalColor, displacedColor, reverseLengthProgress);\r\n\r\n\t\t// compose\r\n\t\tcomposed += mixedColor;\r\n\r\n\t\treturn true;\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn false;\r\n\t}\r\n}\r\n\r\n\r\nvoid main()\r\n{\r\n\tvec4 composed = vec4(0.0);\r\n\tfloat affectCount = 0.0;\r\n\r\n\tvec4 originalColor = texture2D(texFrame, v_TextureCoord);\r\n\r\n\t// do blasts\r\n\tfor(int i = 0; i < dataSize; i++)\r\n\t{\r\n\t\tvec4 data = texture2D(texData, vec2(float(i) / float(dataSize), 0.0));\r\n\r\n\t\tif(data.b >= 0.0) // progress over 0?\r\n\t\t{\r\n\t\t\tif(blast(data, composed))\r\n\t\t\t{\r\n\t\t\t\taffectCount += 1.0;\t\t\t\t\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t// do circualtions\r\n\tfor(int i = 0; i < dataSize; i++)\r\n\t{\r\n\t\tvec4 data = texture2D(texData, vec2(float(i) / float(dataSize), 1.0 / float(dataSize)) );\r\n\t\t\r\n\t\tif(data.a > 0.0) // length over 0?\r\n\t\t{\r\n\t\t\tif(circulation(data, composed, originalColor))\r\n\t\t\t{\r\n\t\t\t\taffectCount += 1.0;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t// final composing\r\n\tif(affectCount > 0.0)\r\n\t{\r\n\t\tgl_FragColor = composed / affectCount;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tgl_FragColor = originalColor;\r\n\t}\r\n}",
                compose: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texBg;\r\nuniform sampler2D texGame;\r\nuniform sampler2D texData;\r\nuniform float time;\r\nuniform float waterLevel;\r\nuniform float bwFactor;\r\nuniform vec2 screenSize;\r\nuniform vec2 screenOffset;\r\n\r\nconst int lightSamples = 8;\r\nconst int dataSize = 8;\r\nconst float lightDeepness = 4.0;\r\nconst vec3 lightColor = vec3(1.0, 0.7, 0.3);\r\n\r\nfloat lightSingle(vec2 coord, vec2 lightPos, float str, float len)\r\n{\r\n\t// transform light pos\r\n\tvec2 transformedLightPos = (lightPos - screenOffset) / screenSize;\r\n\ttransformedLightPos.y = 1.0 - transformedLightPos.y;\r\n\r\n\t// calculate brightness\r\n\tvec2 diff = (v_TextureCoord - transformedLightPos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat lengthOnScreen = length(diffScreen);\r\n\tfloat brightness = clamp(1.0 - (lengthOnScreen / len), 0.0, 1.0);\r\n\r\n\tbrightness *= str;\r\n\r\n\tif(brightness < 0.0001) return 0.0;\r\n\r\n\t// sample edges\r\n\tvec2 sampleStep = -diff / 40.0;\r\n\tfloat sampleStepLength = length(sampleStep);\r\n\tfloat pixelSizeX = 1.0 / screenSize.x;\r\n\tfloat maxSampleStep = (pixelSizeX * lightDeepness);\r\n\tif(sampleStepLength > maxSampleStep) sampleStep = sampleStep / sampleStepLength * maxSampleStep;\r\n\r\n\tvec2 current = coord;\r\n\t\r\n\tfloat edgeValue = 0.0;\r\n\r\n\tfor(int i = 0; i < lightSamples; i++)\r\n\t{\r\n\t\tcurrent += sampleStep;\r\n\r\n\t\tedgeValue += 1.0 - texture2D(texGame, current).a;\r\n\t}\r\n\r\n\treturn clamp(edgeValue / float(lightSamples) * brightness, 0.0, 1.0);\r\n}\r\n\r\nfloat lightAll(vec2 coord)\r\n{\r\n\tvec4 data = texture2D( texData, vec2(float(0) / float(dataSize), 2.0 / float(dataSize)) );\r\n\r\n\treturn lightSingle(coord, data.xy, data.a, data.b); // only render first light. propably enough.\r\n}\r\n\r\nfloat wave(float t, float x, float a)\r\n{\r\n\treturn sin( (x - (t + a) * 30.0) / 20.0) * 10.0 * sin(t * 5.0);\r\n}\r\n\r\nvec2 waveDisplacement(vec2 wave, float t)\r\n{\r\n\treturn vec2(\r\n\t\tsin( (wave.x + t * 1.74) * 0.84) +\r\n\t\tsin( (wave.x + t * 1.32) * 1.23) +\r\n\t\tsin( (wave.x + t) * 2.09) +\r\n\t\tsin( (wave.x + t) * 1.53),\r\n\r\n\t\tsin( (wave.y + t * 1.53) * 0.95) +\r\n\t\tsin( (wave.y + t * 1.12) * 1.69) * 2.4 +\r\n\t\tsin( (wave.y + t) * 3.19) * 2.1 +\r\n\t\tsin( (wave.y + t) * 1.42) * 3.0\r\n\t) * 0.001;\r\n}\r\n\r\nvec4 getTexBackground(vec2 coord)\r\n{\r\n\treturn texture2D(texBg, coord);\r\n}\r\n\r\nvec4 getTexForeground(vec2 coord)\r\n{\r\n\treturn texture2D(texGame, coord);\r\n}\r\n\r\nvec4 getComposed(vec2 coord)\r\n{\r\n\tvec4 fg = getTexForeground(coord);\r\n\tvec4 bg = getTexBackground(coord);\r\n\t\r\n\tvec3 color = fg.rgb;\r\n\r\n#if LOWGFX == 0\r\n\t// add light\r\n\tif(fg.a > 0.95)\r\n\t{\r\n\t\tcolor += lightColor * min(lightAll(coord), 1.0) * fg.a;\r\n\t}\r\n#endif\r\n\r\n\tcolor = mix(bg.rgb, color, fg.a);\r\n\r\n\treturn vec4(color, 1.0);\r\n}\r\n\r\nvec4 makeBlackWhite(vec4 original)\r\n{\r\n\tif(bwFactor <= 0.0) return original;\r\n\r\n\tfloat avg = (original.r + original.g + original.b) / 3.0;\r\n\r\n\treturn vec4(mix(original.rgb, vec3(avg), bwFactor), 1.0);\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec2 flippedPos = vec2(v_TextureCoord.x, 1.0 - v_TextureCoord.y);\r\n\tvec2 coord = vec2(v_TextureCoord.x, v_TextureCoord.y);\r\n\tvec2 pos = v_TextureCoord * screenSize + screenOffset;\r\n\r\n\tvec4 texelBg = texture2D(texBg, coord);\r\n\tvec4 texelGame = texture2D(texGame, coord);\r\n\r\n\tvec4 color = vec4(mix(texelBg.rgb, texelGame.rgb, texelGame.a), 1.0);\r\n\tfloat waterWidth = max(0.0, (flippedPos.y - 0.1) * 60.0);\r\n\t\r\n\tfloat waterLine0 = waterLevel;\r\n\tfloat waterLine1 = waterLine0 + wave(time, pos.x, 0.0);\r\n\tfloat waterLine2 = waterLine0 + wave(time, pos.x, 0.0) - waterWidth;\r\n\tfloat waterLine3 = waterLine0 + wave(time, pos.x, 0.0) - waterWidth * 2.0;\r\n\tfloat waterLineCoord0 = (waterLine0 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord1 = (waterLine1 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord2 = (waterLine2 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord3 = (waterLine3 - screenOffset.y) / screenSize.y;\r\n\r\n\r\n\tbool underLine1 = flippedPos.y > waterLineCoord1;\r\n\tbool underLine2 = flippedPos.y > waterLineCoord2;\r\n\tbool underLine3 = flippedPos.y > waterLineCoord3;\r\n\t\r\n\tvec2 displacement = waveDisplacement(pos / 50.0, time * 2.0);\r\n\tvec2 mirrorCoord = vec2(coord.x, 1.0 - (waterLineCoord2 - (flippedPos.y - waterLineCoord2)) ) + displacement;\r\n\r\n\tfloat fadeOutAlpha = 1.0;\r\n\tfloat alpha = (flippedPos.y - waterLineCoord0) * 5.0;\r\n\r\n\tif(underLine3) // is in water?\r\n\t{\r\n\t\tif(waterLineCoord0 < 0.4)\r\n\t\t{\r\n\t\t\tfadeOutAlpha = clamp( (waterLineCoord0 - 0.2) * 5.0, 0.0, 1.0);\r\n\t\t}\r\n\r\n\t\talpha = clamp(1.0 - alpha, 0.0, 1.0) * fadeOutAlpha;\r\n\t}\r\n\r\n\tif(underLine1)\r\n\t{\r\n\t\tvec4 mirrorTexel = getComposed(mirrorCoord) * 0.4 * alpha;\r\n\t\tcolor = mix(mirrorTexel, vec4(0.0, 0.15, 0.6, 1.0), 0.5);\r\n\t}\r\n\telse if(underLine2)\r\n\t{\r\n\t\tvec4 mirrorTexel = getComposed(mirrorCoord) * alpha;\r\n\r\n\t\tcolor = mix(mirrorTexel, vec4(0.2, 0.4, 0.9, 1.0), 0.5);\r\n\t}\r\n\telse if(underLine3)\r\n\t{\r\n\t\tvec4 mirrorTexel = getTexBackground(mirrorCoord) * alpha;\r\n\r\n\t\tvec4 waterColor = mix(mirrorTexel, vec4(0.2, 0.4, 0.9, 1.0), 0.5);\r\n\t\tvec4 fgColor = getTexForeground(v_TextureCoord);\r\n\r\n\t\tcolor = vec4(mix(waterColor.rgb, fgColor.rgb, fgColor.a), 1.0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\tcolor = getComposed(v_TextureCoord);\r\n\t}\r\n\r\n\tgl_FragColor = makeBlackWhite(color);\r\n}",
                flag: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform float time;\r\nuniform bool mirror;\r\nuniform vec4 color;\r\n\r\nvoid main()\r\n{\r\n\tfloat margin = 0.16;\r\n\tvec2 coord = v_TextureCoord;\r\n\tif(mirror) coord.x = 1.0 - coord.x;\r\n\r\n\tfloat offset = coord.x * sin(-coord.x * 10.0 + time * 10.0);\r\n\r\n\tfloat y0 = margin + offset / 10.0;\r\n\tfloat y1 = 1.0 - margin + offset / 10.0;\r\n\r\n\tvec4 texel = color;\r\n\ttexel -= (offset / 10.0 + 0.1);\r\n\r\n\tif(coord.y < y0 || coord.y > y1)\r\n\t{\r\n\t\tgl_FragColor = vec4(0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\ttexel.a = 1.0;\r\n\t\tgl_FragColor = texel;\r\n\t}\t\t\t\t\r\n}",
                map: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texData;\r\nuniform sampler2D texAtlas;\r\nuniform vec2 screenSize;\r\nuniform vec2 offset;\r\nuniform vec4 borderColor;\r\nuniform float mapSizeMax;\r\nuniform vec2 mapSize;\r\nuniform float atlasEdgeSize;\r\n\r\nconst float tileSize = 64.0;\r\n\r\n\r\nvec4 sampleTexture(sampler2D sampler, vec2 coord, float texSize)\r\n{\r\n\treturn texture2D(sampler, (floor(coord * texSize) + 0.5) / texSize);\r\n}\r\n\r\n\r\nvoid main()\r\n{\t\r\n\tvec2 atlasCoord = (v_TextureCoord * screenSize + offset) / mapSizeMax / tileSize;\r\n\tvec2 intraTile = mod(atlasCoord * mapSizeMax, 1.0);\r\n\tvec2 atlasEndCoord = mapSize / mapSizeMax;\r\n\t\r\n\tif(atlasCoord.x >= 0.0 && atlasCoord.x <= atlasEndCoord.x && atlasCoord.y >= 0.0 && atlasCoord.y <= atlasEndCoord.y)\r\n\t{\r\n\t\tvec4 data = sampleTexture(texData, atlasCoord, mapSizeMax);\r\n\t\tvec2 atlasSubTexBase = vec2(floor(data * atlasEdgeSize) / atlasEdgeSize);\r\n\t\t\r\n\t\tif(data.a > 0.5)\r\n\t\t{\r\n\t\t\tgl_FragColor = sampleTexture(texAtlas, atlasSubTexBase + intraTile / atlasEdgeSize, atlasEdgeSize * tileSize);\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tgl_FragColor = vec4(0);\r\n\t\t}\r\n\t}\r\n\telse\r\n\t{\r\n\t\tgl_FragColor = borderColor;\r\n\t}\r\n}",
                particleF: "precision mediump float;\r\n\r\nuniform sampler2D tex;\r\n\r\nvarying vec2 v_TextureCoord;\r\nvarying vec4 v_Color;\r\n\r\nvoid main()\r\n{\r\n\tvec4 texel = texture2D(tex, v_TextureCoord);\r\n\tfloat alpha = v_Color.a * texel.r;\r\n\r\n\tgl_FragColor = vec4(v_Color.rgb, alpha);\r\n}",
                particleV: "precision mediump float;\r\n\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\nattribute vec4 a_Color;\r\n\r\nvarying vec4 v_Color;\t\t\t\r\nvarying vec2 v_TextureCoord;\r\n\t\t\r\nvoid main(void)\r\n{\r\n\tv_TextureCoord = a_Coord;\r\n\tv_Color = a_Color;\r\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\r\n}",
                postprocessing: "precision mediump float;\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\t\t\r\nvoid main(void)\r\n{\r\n\tv_TextureCoord = a_Coord;\r\n\tgl_Position = vec4(a_Pos, 0.0, 1.0);\r\n}"
            }
        }, {}],
        16: [function(f, n, m) {
            ! function() {
                var a = Handlebars.template,
                    h = Handlebars.templates = Handlebars.templates || {};
                h.achievement = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t<div class="item ' + d(a(null !=
                            b ? b.itemClass : b, b)) + '">\r\n\t\t\t\t<div class="cupImage"></div>\r\n\t\t\t\t<div class="txt txt1"><span class="v">' + d(a(null != b ? b.status : b, b)) + '</span></div>\r\n\t\t\t\t<div class="txt txt2"><span class="v">' + d(a(null != b ? b.name : b, b)) + '</span></div>\r\n\t\t\t\t<div class="txt txt3"><span class="v">' + d(a(null != b ? b.desc : b, b)) + "</span></div>\r\n\t\t\t</div>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="inner">\r\n\t<div class="closeX">X</div>\r\n\t<div class="scroll achievementsList">\r\n';
                        return c = a.each.call(b, null != b ? b.achievements : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "\t</div>\r\n</div>"
                    },
                    useData: !0
                });
                h.ballselect = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="uiwindow nativeInput">\r\n\t<div class="ballselect">\r\n\t\t<div class="closeX">X</div>\r\n\t\t<div class="inputBox">\r\n\t\t\t<div class="ballSearch">\r\n\t\t\t\t<input placeholder="Search" />\r\n\t\t\t</div>\r\n\t\t\t<div class="ballList nativeScroll">\r\n\t\t\t\t<div class="ballListInner">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="clear"></div>\r\n\t\t\t</div>\r\n\t\t\t<div class="previewSection">\r\n\t\t\t\t<div class="previewShadow"></div>\r\n\t\t\t\t<canvas class="preview" width="256" height="256"></canvas>\r\n\t\t\t\t<div class="skinFailure">Need Level 99 for this skin</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="skinSelect">\r\n\t\t\t\t<div class="skinHatList">\r\n\t\t\t\t\t<div class="label">Helmet</div>\r\n\t\t\t\t\t<div class="list"></div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="skinGlassesList">\r\n\t\t\t\t\t<div class="label">Glasses</div>\r\n\t\t\t\t\t<div class="list"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="ctrl">\r\n\t\t\t\t<button class="cancel">Cancel</button>\r\n\t\t\t\t<button class="done">Done</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.bg = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<img class="bg" src="/menubg/bg1.jpg" />\r\n<div class="bgTransition"></div>\r\n<div class="bgOverlay"></div>'
                    },
                    useData: !0
                });
                h.browserwarning = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '\r\n<div class="msg msgCookie">\r\n\t<div class="txt">This site uses cookies! By continuing to browse the site you are consenting to our use of cookies. <a href="/privacy">More information</a></div>\r\n\t<div class="closeX">OK</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserIE">\r\n\tHey, you are using Internet Explorer or Edge? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserOpera">\r\n\tHey, you are using Opera or Vivaldi? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserYandex">\r\n\tHey, you are using <strong>Yandex</strong>? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserOldChrome">\r\n\tHey, your <strong>Chrome browser</strong> is already very old. Please <strong>update</strong> to the latest version. Otherwise you will face <strong>bugs and lags</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgMobile">\r\n\tHey, there is no support for touchscreen devices yet. Please play the game on a desktop browser like <strong>Firefox or Chrome</strong>!\r\n</div>\r\n\r\n<div class="msg msgLowFps">\r\n\tYour frame rate is very low. You can speed up the game by selecting <strong>Low Graphic Quality</strong> in the settings on the start page or using another browser! <a href="/lowfps">More information...</a>\r\n</div>'
                    },
                    useData: !0
                });
                h.capture = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        return '<div class="msg">\r\n\t<div class="flag"></div>\r\n\t<div class="txt">' + (0, this.escapeExpression)((c = null != (c = a.msg || (null != b ? b.msg : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "msg",
                            hash: {},
                            data: k
                        }) : c)) + "</div>\r\n</div>"
                    },
                    useData: !0
                });
                h.chat = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="wrap">\r\n\t<div class="messages">\r\n\t</div>\r\n\r\n\t<div class="inputArea">\r\n\t\t<div class="inner nativeInput blockGameInput">\r\n\t\t\t<span class="cmd"></span>\r\n\t\t\t<input type="text" maxlength="100" autocomplete="off" spellcheck="false"></input>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="inputTip">\r\n\t\t<div class="txt txt0">Press ENTER to chat</div>\r\n\t\t<div class="txt txt1">Press TAB to toggle between ALL and TEAM</div>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h["classic/friendrequests"] = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t<div class="request">\r\n\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + d(a(null != b ? b.name : b, b)) + '" width="64" height="64"></canvas>\r\n\r\n\t\t<div class="name"><a href="/profile/' + d(a(null != b ? b.name : b, b)) + '">' + d(a(null != b ? b.name : b, b)) + '</a></div>\r\n\r\n\t\t<div class="friendButtonContainer">\r\n\t\t\t<div class="friendButton" data-relation="' + d(a(null != b ? b.relation :
                            b, b)) + '" data-player="' + d(a(null != b ? b.name : b, b)) + '"></div>\r\n\t\t</div>\r\n\t</div>\r\n'
                    },
                    3: function(b, a, d, k) {
                        return '\t<span class="red">No new incoming friend requests!</span>\r\n'
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        return c = a.each.call(b, null != b ? b.requests : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.program(3, k),
                            data: k
                        }), null != c ? c : ""
                    },
                    useData: !0
                });
                h["classic/highscore"] = a({
                    1: function(b, a, d, k) {
                        var c;
                        a = this.lambda;
                        return '\t\t<div class="myposition">Your position: <span class="v">' +
                            (0, this.escapeExpression)(a(null != (c = null != b ? b.data : b) ? c.position : c, b)) + "</span></div>\r\n"
                    },
                    3: function(b, a, d, k) {
                        return '\t\t<div class="hint">Play to get listed in this highscore!</div>\r\n'
                    },
                    5: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t<div class="item ' + d(a(null != b ? b.selfClass : b, b)) + '">\r\n\t\t<div class="position">' + d(a(null != b ? b.position : b, b)) + '</div>\r\n\r\n\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + d(a(null != b ? b.player : b, b)) + '" width="64" height="64"></canvas>\r\n\r\n\t\t<div class="name"><a href="/profile/' +
                            d(a(null != b ? b.player : b, b)) + '">' + d(a(null != b ? b.player : b, b)) + '</a></div>\r\n\r\n\t\t<div class="xp">' + d(a(null != b ? b.xp : b, b)) + '<span class="label">XP</span></div>\r\n\r\n\t\t\x3c!--<div class="friendButtonContainer">\r\n\t\t\t<div class="friendButton" data-relation="' + d(a(null != b ? b.relation : b, b)) + '" data-player="' + d(a(null != b ? b.player : b, b)) + '"></div>\r\n\t\t</div>--\x3e\r\n\t</div>\r\n'
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="header">\r\n\t<div class="desc">Resets every sunday at 10:00am (UTC).</div>\r\n\r\n';
                        return c = a.if.call(b, null != (c = null != b ? b.data : b) ? c.hasPosition : c, {
                            name: "if",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.program(3, k),
                            data: k
                        }), null != c && (d += c), d += "</div>\r\n\r\n", c = a.each.call(b, null != (c = null != b ? b.data : b) ? c.table : c, {
                            name: "each",
                            hash: {},
                            fn: this.program(5, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + '\r\n<div class="info">\r\n\tHighscore may be delayed by up to five minutes!\r\n</div>'
                    },
                    useData: !0
                });
                h["classic/main"] = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c, e;
                        d =
                            a.helperMissing;
                        var q = this.escapeExpression;
                        q = '<div class="main">\r\n\t<div class="head">\r\n\t\t<img src="/logo_dark.svg" class="logo" alt="kugeln.io" />\r\n\t\t<button class="play">Play</button>\r\n\r\n\t\t<div class="hr"></div>\r\n\r\n\t\t<h1>' + q((e = null != (e = a.title || (null != b ? b.title : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "title",
                            hash: {},
                            data: k
                        }) : e)) + '</h1>\r\n\t</div>\r\n\t<div class="content">\r\n\t\t';
                        return e = null != (e = a.html || (null != b ? b.html : b)) ? e : d, c = "function" == typeof e ? e.call(b, {
                            name: "html",
                            hash: {},
                            data: k
                        }) : e, null != c && (q += c), q + "\r\n\t</div>\r\n</div>"
                    },
                    useData: !0
                });
                h["classic/messages"] = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="msgBox">\r\n\t<div class="sectionOverview">\r\n\r\n\t</div>\r\n\t<div class="sectionContent">\r\n\t\t<div class="header">\r\n\t\t\t<canvas class="playerDetail" data-type="avatar" data-player="" width="48" height="48"></canvas>\r\n\t\t\t<div class="name"></div>\r\n\t\t\t<div class="buttons">\r\n\t\t\t\t<div class="profileButton"><div class="button">Profile</div></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="msgArea">\r\n\t\t\t<div class="msgAreaScroll">\r\n\t\t\t\r\n\t\t\t</div>\r\n\t\t\t<div class="msgEmpty">No message in this conversation yet. Send one!</div>\r\n\t\t</div>\r\n\t\t<div class="msgInput">\r\n\t\t\t<textarea placeholder="Enter new message..." maxlength="1000"></textarea>\r\n\t\t\t<div class="measureBox"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="noMessages">\r\n\tYou don\'t have any messages. Go to a friends profile and send one!\r\n</div>'
                    },
                    useData: !0
                });
                h["classic/profile"] = a({
                    1: function(b, a, d, k) {
                        var c, e;
                        d = a.helperMissing;
                        var q = this.escapeExpression,
                            l = this.lambda,
                            p = '\t<div class="summary">\r\n\t\t<canvas class="playerDetail playerAvatar" data-type="avatar" data-player="' + q((e = null != (e = a.userName || (null != b ? b.userName : b)) ? e : d, "function" == typeof e ? e.call(b, {
                                name: "userName",
                                hash: {},
                                data: k
                            }) : e)) + '" width="128" height="128"></canvas>\r\n\r\n';
                        return c = a.if.call(b, null != b ? b.isLoggedIn : b, {
                            name: "if",
                            hash: {},
                            fn: this.program(2, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (p += c), p += '\r\n\t\t<div class="playerProgress" data-level="' + q(l(null != (c = null != b ? b.breakdown : b) ? c.level : c, b)) + '" data-xp="' + q(l(null != (c = null != b ? b.breakdown : b) ? c.xp : c, b)) + '" data-xptotal="' + q((e = null != (e = a.xpTotal || (null != b ? b.xpTotal : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "xpTotal",
                            hash: {},
                            data: k
                        }) : e)) + '" data-percent="' + q((e = null != (e = a.xpPercent || (null != b ? b.xpPercent : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "xpPercent",
                            hash: {},
                            data: k
                        }) : e)) + '" data-lr="' + q((e = null != (e = a.xpLr ||
                            (null != b ? b.xpLr : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "xpLr",
                            hash: {},
                            data: k
                        }) : e)) + '">\r\n\t\t\t<div class="tooltip">\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tbody><tr><td>Level</td><td class="vLvl">1</td></tr>\r\n\t\t\t\t\t<tr><td>XP</td><td class="vXp">77/100</td></tr>\r\n\t\t\t\t</tbody></table>\r\n\t\t\t</div>\r\n\t\t\t<div class="xp">\r\n\t\t\t\t<div class="inner"></div>\r\n\t\t\t\t<div class="v">' + q((e = null != (e = a.xpPercentReadable || (null != b ? b.xpPercentReadable : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "xpPercentReadable",
                            hash: {},
                            data: k
                        }) : e)) + '%</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="level lr' + q((e = null != (e = a.xpLr || (null != b ? b.xpLr : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "xpLr",
                            hash: {},
                            data: k
                        }) : e)) + '"><span class="v">' + q(l(null != (c = null != b ? b.breakdown : b) ? c.level : c, b)) + '</span></div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<h2>Achievements</h2>\r\n\t<div class="achievementsList">\r\n', c = a.each.call(b, null != b ? b.achievements : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(4, k),
                            inverse: this.program(6,
                                k),
                            data: k
                        }), null != c && (p += c), p + "\t</div>\r\n"
                    },
                    2: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        var e = this.escapeExpression;
                        return '\t\t\t<div class="friendButtonContainer">\r\n\t\t\t\t<div class="friendButton" data-relation="' + e((c = null != (c = a.friendRelation || (null != b ? b.friendRelation : b)) ? c : d, "function" == typeof c ? c.call(b, {
                                name: "friendRelation",
                                hash: {},
                                data: k
                            }) : c)) + '" data-player="' + e((c = null != (c = a.userName || (null != b ? b.userName : b)) ? c : d, "function" == typeof c ? c.call(b, {
                                name: "userName",
                                hash: {},
                                data: k
                            }) : c)) +
                            '"></div>\r\n\t\t\t\t<div class="messageButton" data-player="' + e((c = null != (c = a.userName || (null != b ? b.userName : b)) ? c : d, "function" == typeof c ? c.call(b, {
                                name: "userName",
                                hash: {},
                                data: k
                            }) : c)) + '"></div>\r\n\t\t\t</div>\r\n'
                    },
                    4: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t<div class="item ' + d(a(null != b ? b.itemClass : b, b)) + '">\r\n\t\t\t\t<div class="cupImage"></div>\r\n\t\t\t\t<div class="txt txt1"><span class="v">' + d(a(null != b ? b.status : b, b)) + '</span></div>\r\n\t\t\t\t<div class="txt txt2"><span class="v">' +
                            d(a(null != b ? b.name : b, b)) + '</span></div>\r\n\t\t\t\t<div class="txt txt3"><span class="v">' + d(a(null != b ? b.desc : b, b)) + "</span></div>\r\n\t\t\t</div>\r\n"
                    },
                    6: function(b, a, d, k) {
                        return '\t\t\t<div class="text3">No achievements yet :(</div>\r\n'
                    },
                    8: function(b, a, d, k) {
                        return "\tProfile not found :(\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        return c = a.unless.call(b, null != b ? b.notFound : b, {
                            name: "unless",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.program(8, k),
                            data: k
                        }), null != c ? c : ""
                    },
                    useData: !0
                });
                h["classic/search"] = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="searchbox">\r\n\t<input type="text" placeholder="Enter player name...">\r\n\t<div class="hint">Press ENTER to search</div>\r\n</div>\r\n\r\n<div class="result">\r\n\t<div class="list">\r\n\t</div>\r\n\t<div class="noResult">\r\n\t\tNo players found :(\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.classic = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c, e;
                        d = a.helperMissing;
                        var q = '<div class="uiwindow nativeInput">\r\n\t<div class="wrap">\r\n\t\t<div class="wrapInner">\r\n\t\t\t';
                        return e = null != (e = a.html || (null != b ? b.html : b)) ? e : d, c = "function" == typeof e ? e.call(b, {
                            name: "html",
                            hash: {},
                            data: k
                        }) : e, null != c && (q += c), q + "\r\n\t\t</div>\r\n\t</div>\r\n</div>"
                    },
                    useData: !0
                });
                h.hints = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        return '\t\t<div class="hint">' + (0, this.escapeExpression)(a(null != b ? b.txt : b, b)) + "</div>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="glare"></div>\r\n\r\n<div class="list">\r\n';
                        return c = a.each.call(b, null != b ? b.hint : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "</div>"
                    },
                    useData: !0
                });
                h.iab728 = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="containerIAB728">\r\n\r\n</div>'
                    },
                    useData: !0
                });
                h.ingamemenu = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="dropdown">\r\n\t<div class="btn btnOpen">\r\n\t\tMENU\r\n\t</div>\r\n\t<ul>\r\n\t\t<li><div class="btn" data-action="fullscreen">Fullscreen</div></li>\r\n\t\t<li><div class="btn" data-action="rematch">Other match</div></li>\r\n\t</ul>\r\n</div>'
                    },
                    useData: !0
                });
                h.invite = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        return '<a class="close" href="#">X</a>\r\n\r\n<div class="text1">\r\n\tHey, you are alone on the map...\r\n</div>\r\n\r\n<div class="inputarea">\r\n\t<input type="text" value="' + (0, this.escapeExpression)((c = null != (c = a.url || (null != b ? b.url : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "url",
                            hash: {},
                            data: k
                        }) : c)) + '" readonly="readonly" />\r\n\t<span href="#" class="copy fx">COPY LINK</span>\r\n\t<a href="#" class="copy">COPY LINK</a>\r\n</div>\r\n\r\n<div class="text2">\r\n\tAsk a friend to join your match!\r\n</div>\r\n\r\n<div class="text3">\r\n\tTo join another match, go click the back button.\r\n</div>'
                    },
                    useData: !0
                });
                h.kills = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t<li>\r\n\t\t\t\t<div class="killer">' + d(a(null != b ? b.killer : b, b)) + '</div>\r\n\t\t\t\t<div class="cause"></div>\r\n\t\t\t\t<div class="killed">' + d(a(null != b ? b.killed : b, b)) + '</div>\r\n\t\t\t\t<div class="clear"></div>\r\n\t\t\t</li>\r\n'
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="killList">\r\n\t<ul>\r\n';
                        return c = a.each.call(b, null != b ? b.kills : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1,
                                k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "\t</ul>\r\n</div>"
                    },
                    useData: !0
                });
                h.loading0 = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="img">\r\n\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.5433 453.5433" id="loadingBall"><path d="M62.656 323.682C41.41 289.675 36.336 234.956 38 194.642c1.2-29.598 17.345-59.985 26.534-82.77 15.986-39.645 50.553-47.12 98.57-57.452 46.8-10.067 97.724-20.985 140.494 1.067 31.044 15.97 51.962 11.147 72.434 40.356 15.933 22.738 35.068 50.645 35.43 77.146.668 49.67 13.2 96.652-3.732 140.863-9.76 25.504-29.95 49.678-50.892 66.694-27.685 22.497-52.533 15.45-82.635 27.16-40.508 15.76-87.585 15.037-148.446-20.45-28.338-16.524-45.805-35.837-63.102-63.523z" fill="#fff" stroke="#000" stroke-width="20.932"/><path d="M37.376 230.3c113.432 56.67 330.99 56.355 378.302-19.698-12.287-68.477-38.695-114.69-73.236-138.896-84.544-32.793-157.215-27.74-221.224-5.05-59.463 1.978-95.754 79.698-83.842 163.644z" fill="red" fill-rule="evenodd"/><path d="M62.656 323.682C41.41 289.675 36.336 234.956 38 194.642c1.2-29.598 17.345-59.985 26.534-82.77 15.986-39.645 50.553-47.12 98.57-57.452 46.8-10.067 97.724-20.985 140.494 1.067 31.044 15.97 51.962 11.147 72.434 40.356 15.933 22.738 35.068 50.645 35.43 77.146.668 49.67 13.2 96.652-3.732 140.863-9.76 25.504-29.95 49.678-50.892 66.694-27.685 22.497-52.533 15.45-82.635 27.16-40.508 15.76-87.585 15.037-148.446-20.45-28.338-16.524-45.805-35.837-63.102-63.523z" fill="none" stroke="#000" stroke-width="20.932"/><path d="M208.365 217.906s-24.384-12.36-47.31-12.475c-24.583-.122-48.603 13.09-48.603 13.09s-2.497-54.983 49.41-56.168c51.412-1.174 46.503 55.554 46.503 55.554zM340.857 221.164s-24.384-12.36-47.31-12.475c-24.583-.124-48.603 13.09-48.603 13.09s-2.497-54.985 49.41-56.17c51.41-1.174 46.503 55.554 46.503 55.554z" fill="#fff" stroke="#000" stroke-width="11.436"/></svg>\r\n</div>\r\n<div class="text">Loading balls...</div>'
                    },
                    useData: !0
                });
                h.loading1 = a({
                    1: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        return '\t\t<div class="region">Region: ' + (0, this.escapeExpression)((c = null != (c = a.region || (null != b ? b.region : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "region",
                            hash: {},
                            data: k
                        }) : c)) + '</div>\r\n\t\t<div class="regionHint">\r\n\t\t\tIn case the game is laggy, try to select a region in the game settings that better fits your location.\r\n\t\t</div>\r\n'
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="text">Loading map...</div>\r\n<div class="info">\r\n';
                        return c = a.if.call(b, null != b ? b.region : b, {
                            name: "if",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + '\r\n\t<div class="mouseHint">\r\n\t\tPlay with mouse, not touchpad or touchscreen!\r\n\t</div>\r\n</div>\r\n\r\n<img class="logo" src="/logo.svg" />'
                    },
                    useData: !0
                });
                h.maintenance = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<img src="/logo.svg" />\r\n<div class="text">Maintenance...</div>\r\n<div class="text2">We will be back in a few minutes. Press F5 to reload the page.</div>\r\n\r\n<div class="text3">\r\n\tCheck out our <a href="https://www.facebook.com/kugeln.io">Facebook page</a> or <a href="https://twitter.com/kugeln_io">Twitter</a> to get more information!\r\n</div>'
                    },
                    useData: !0
                });
                h.matchend = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t<div class="sideBall ' + d(a(null != b ? b.ballClass : b, b)) + '">\r\n\t\t\t<div class="score">' + d(a(null != b ? b.teamScore : b, b)) + '</div>\r\n\t\t\t<div class="nickname">' + d(a(null != b ? b.topNickname : b, b)) + '</div>\r\n\t\t\t<canvas width="256" height="256"></canvas>\r\n\t\t</div>\r\n'
                    },
                    3: function(b, a, d, k) {
                        var c;
                        d = this.lambda;
                        var e = this.escapeExpression;
                        d = '\t\t\t\t<table class="' + e(d(null != b ? b.teamClass : b, b)) + '">\r\n\t\t\t\t\t<tr class="teamOverview">\r\n\t\t\t\t\t\t<th colspan="4">' +
                            e(d(null != b ? b.teamName : b, b)) + '</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr class="playerHead">\r\n\t\t\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t\t\t<th><span>Kills</span></th>\r\n\t\t\t\t\t\t<th><span>Death</span></th>\r\n\t\t\t\t\t\t<th><span>Score</span></th>\r\n\t\t\t\t\t</tr>\r\n';
                        return c = a.each.call(b, null != b ? b.list : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(4, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "\t\t\t\t</table>\r\n"
                    },
                    4: function(b, a, d, k) {
                        var c;
                        d = this.lambda;
                        var e = this.escapeExpression,
                            q = '\t\t\t\t\t\t<tr class="' + e(d(null != b ? b.rowClass : b, b)) + '">\r\n\t\t\t\t\t\t\t<td>\r\n';
                        return c = a.if.call(b, null != b ? b.nameType0 : b, {
                            name: "if",
                            hash: {},
                            fn: this.program(5, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (q += c), c = a.if.call(b, null != b ? b.nameType1 : b, {
                            name: "if",
                            hash: {},
                            fn: this.program(7, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (q += c), c = a.if.call(b, null != b ? b.nameType2 : b, {
                            name: "if",
                            hash: {},
                            fn: this.program(9, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (q += c), q + "\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>" + e(d(null !=
                            b ? b.kills : b, b)) + "</td>\r\n\t\t\t\t\t\t\t<td>" + e(d(null != b ? b.death : b, b)) + "</td>\r\n\t\t\t\t\t\t\t<td>" + e(d(null != b ? b.score : b, b)) + "</td>\r\n\t\t\t\t\t\t</tr>\r\n"
                    },
                    5: function(b, a, d, k) {
                        a = this.lambda;
                        return '\t\t\t\t\t\t\t\t\t<span class="nick">' + (0, this.escapeExpression)(a(null != b ? b.name : b, b)) + "</span>\r\n"
                    },
                    7: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t\t\t\t\t<a class="type1 profile" href="/profile/' + d(a(null != b ? b.uniqueName : b, b)) + '" target="_blank" alt="' + d(a(null != b ? b.uniqueName :
                            b, b)) + 's Profiles">' + d(a(null != b ? b.uniqueName : b, b)) + "</a>\r\n"
                    },
                    9: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t\t\t\t\t<span class="nick">' + d(a(null != b ? b.name : b, b)) + '</span>\r\n\t\t\t\t\t\t\t\t\t<span class="type2">(<a class="profile" href="/profile/' + d(a(null != b ? b.uniqueName : b, b)) + '" target="_blank" alt="' + d(a(null != b ? b.uniqueName : b, b)) + 's Profiles">' + d(a(null != b ? b.uniqueName : b, b)) + "</a>)</span>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c, e;
                        d = a.helperMissing;
                        var q = this.escapeExpression,
                            l = '<div class="bgOverlay">\r\n</div>\r\n\r\n<div class="inner ' + q((e = null != (e = a.hasTeamClass || (null != b ? b.hasTeamClass : b)) ? e : d, "function" == typeof e ? e.call(b, {
                                name: "hasTeamClass",
                                hash: {},
                                data: k
                            }) : e)) + '">\r\n';
                        return c = a.each.call(b, null != b ? b.teams : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (l += c), l += '\r\n\t<div class="win">\r\n\t\t<div class="header">\r\n\t\t\t<div class="msg0">' + q((e = null != (e = a.msg0 || (null != b ? b.msg0 : b)) ? e : d, "function" ==
                            typeof e ? e.call(b, {
                                name: "msg0",
                                hash: {},
                                data: k
                            }) : e)) + '</div>\r\n\t\t\t<div class="msg1">' + q((e = null != (e = a.msg1 || (null != b ? b.msg1 : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "msg1",
                            hash: {},
                            data: k
                        }) : e)) + '</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="containerIAB728_2">\r\n\t\t\t\r\n\t\t</div>\r\n\r\n\t\t<div class="lists">\r\n', c = a.each.call(b, null != b ? b.teams : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(3, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (l += c), l + '\t\t</div>\r\n\r\n\t\t<div class="continue">Continue &raquo;</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="matchEndFooter">\r\n\t<div class="left">\r\n\t\t<a class="footerA" href="http://iogames.space/" title="More io Games">More .io Games</a>\r\n\t</div>\r\n\r\n\t<div class="right">\r\n\t\t<a class="footerLogo" href="http://www.addictinggames.com/"><img src="/addicting-games.png" title="more games" /></a>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.matcherror = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        var e = this.escapeExpression;
                        return '<div class="box">\r\n\t<img src="/logo.svg" />\r\n\t<h2 class="title">' + e((c = null != (c = a.title || (null != b ? b.title : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "title",
                            hash: {},
                            data: k
                        }) : c)) + '</h2>\r\n\t<div class="desc">' + e((c = null != (c = a.desc || (null != b ? b.desc : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "desc",
                            hash: {},
                            data: k
                        }) : c)) + "</div>\r\n\r\n\t<button>Continue</button>\r\n</div>\r\n"
                    },
                    useData: !0
                });
                h.matchselection = a({
                    1: function(b, a, d, k, c) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<img src="/map/preview/' + d(a(null != b ? b.name : b, b)) + ".png?v=" + d(a(null != c[1] ? c[1].verHash : c[1], b)) + '" alt="' + d(a(null != b ? b.label : b, b)) + '" />\r\n\t\t\t\t\t\t\t<div class="mapLabel">' + d(a(null != b ? b.label : b, b)) + "</div>\r\n\t\t\t\t\t\t</li>\r\n"
                    },
                    3: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<input type="radio" name="gameType" value="' +
                            d(a(null != b ? b.key : b, b)) + '" id="gameType' + d(a(null != b ? b.key : b, b)) + '">\r\n\t\t\t\t\t\t<label for="gameType' + d(a(null != b ? b.key : b, b)) + '">' + d(a(null != b ? b.descShort : b, b)) + "</label>\r\n\t\t\t\t\t</li>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k, c) {
                        var e;
                        d = '<div class="uiwindow nativeInput">\r\n\t<div class="matchselect">\r\n\t\t<div class="closeX">X</div>\r\n\t\t<div class="frame mapSelection">\r\n\t\t\t<div class="frameLabel">Map</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<ul class="mapList">\r\n\t\t\t\t\t<li class="random">\r\n\t\t\t\t\t\t<span class="line"></span>\r\n\t\t\t\t\t\t<div class="randomLabel">RANDOM</div>\r\n\t\t\t\t\t</li>\r\n\r\n';
                        return e = a.each.call(b, null != b ? b.mapList : b, {
                                name: "each",
                                hash: {},
                                fn: this.program(1, k, c),
                                inverse: this.noop,
                                data: k
                            }), null != e && (d += e), d += '\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="frame gameTypeSelection">\r\n\t\t\t<div class="frameLabel">Game Mode</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<ul class="gameTypeList">\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<input type="radio" name="gameType" value="" id="gameTypeRND">\r\n\t\t\t\t\t\t<label for="gameTypeRND">Random</label>\r\n\t\t\t\t\t</li>\r\n',
                            e = a.each.call(b, null != b ? b.gameTypeList : b, {
                                name: "each",
                                hash: {},
                                fn: this.program(3, k, c),
                                inverse: this.noop,
                                data: k
                            }), null != e && (d += e), d + '\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="public">Play</button>\r\n\t\t\t<button class="private">Create private match</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0,
                    useDepths: !0
                });
                h.modal = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t<button class="' + d(a(null != b ? b.class : b,
                            b)) + '">' + d(a(null != b ? b.text : b, b)) + "</button>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c, e;
                        d = a.helperMissing;
                        var q = '<div class="bg"></div>\r\n\r\n<div class="modal">\r\n\t<div class="inner">\r\n\t\t<div class="msg">';
                        return e = null != (e = a.text || (null != b ? b.text : b)) ? e : d, c = "function" == typeof e ? e.call(b, {
                            name: "text",
                            hash: {},
                            data: k
                        }) : e, null != c && (q += c), q += '</div>\r\n\r\n\t\t<div class="buttons">\r\n', c = a.each.call(b, null != b ? b.buttons : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (q += c), q + "\t\t</div>\r\n\t</div>\r\n\r\n</div>"
                    },
                    useData: !0
                });
                h.progression = a({
                    1: function(b, a, d, k) {
                        var c;
                        d = this.lambda;
                        var e = this.escapeExpression;
                        d = '\t\t\t\t<table class="' + e(d(null != b ? b.teamClass : b, b)) + '">\r\n\t\t\t\t\t<tr class="playerHead">\r\n\t\t\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t\t\t<th><span>XP</span></th>\r\n\t\t\t\t\t</tr>\r\n';
                        return c = a.each.call(b, null != b ? b.list : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(2, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "\t\t\t\t</table>\r\n"
                    },
                    2: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t\t<tr class="' + d(a(null != b ? b.rowClass : b, b)) + '">\r\n\t\t\t\t\t\t\t<td>' + d(a(null != b ? b.name : b, b)) + '</td>\r\n\t\t\t\t\t\t\t<td data-xp="' + d(a(null != b ? b.xp : b, b)) + '" class="listXpVal"></td>\r\n\t\t\t\t\t\t</tr>\r\n'
                    },
                    4: function(b, a, d, k) {
                        return '\t\t\t\t<div class="progress progressTitle">\r\n\t\t\t\t\t<div class="txt1">Your progress</div>\r\n\t\t\t\t</div>\r\n'
                    },
                    6: function(b, a, d, k) {
                        var c;
                        d = a.helperMissing;
                        var e = this.escapeExpression;
                        return '\t\t\t\t<div class="progress progressLevel">\r\n\t\t\t\t\t<div class="txt1">Level up!</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="level lr' + e((c = null != (c = a.levelRange || (null != b ? b.levelRange : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "levelRange",
                            hash: {},
                            data: k
                        }) : c)) + '"><span class="v">' + e((c = null != (c = a.levelUp || (null != b ? b.levelUp : b)) ? c : d, "function" == typeof c ? c.call(b, {
                            name: "levelUp",
                            hash: {},
                            data: k
                        }) : c)) + "</span></div>\r\n\t\t\t\t</div>\r\n"
                    },
                    8: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t<div class="progress progressAchievement">\r\n\t\t\t\t\t<canvas class="cup" width="64" height="64"></canvas>\r\n\r\n\t\t\t\t\t<div class="txt1"><span>Achievement unlocked!</span></div>\r\n\t\t\t\t\t<div class="txt2"><span>' + d(a(null != b ? b.name : b, b)) + '</span></div>\r\n\t\t\t\t\t<div class="txt3"><span>' + d(a(null != b ? b.desc : b, b)) + "</span></div>\r\n\t\t\t\t</div>\r\n"
                    },
                    10: function(b, a, d, k) {
                        return '\t\t\t\t<div class="progress progressLoginNotify">\r\n\t\t\t\t\t<div class="txt1">Login to save progress!</div>\r\n\t\t\t\t</div>\r\n'
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c, e;
                        d = a.helperMissing;
                        var q = this.escapeExpression;
                        d = '<div class="bgOverlay">\r\n</div>\r\n\r\n<div class="inner ' + q((e = null != (e = a.hasTeamClass || (null != b ? b.hasTeamClass : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "hasTeamClass",
                            hash: {},
                            data: k
                        }) : e)) + '">\r\n\t<div class="col colBall">\r\n\t\t<div class="nick">' + q((e = null != (e = a.nick || (null != b ? b.nick : b)) ? e : d, "function" == typeof e ? e.call(b, {
                            name: "nick",
                            hash: {},
                            data: k
                        }) : e)) + '</div>\r\n\t\t<canvas width="256" height="256"></canvas>\r\n\t</div>\r\n\r\n\t<div class="col colList">\r\n\t\t<div class="lists">\r\n';
                        return c = a.each.call(b, null != b ? b.teams : b, {
                                name: "each",
                                hash: {},
                                fn: this.program(1, k),
                                inverse: this.noop,
                                data: k
                            }), null != c && (d += c), d += '\t\t</div>\r\n\r\n\t\t<div class="continue">Continue &raquo;</div>\r\n\t</div>\r\n\r\n\t<div class="col colStats">\r\n\t\t<div class="wrap">\r\n', c = a.if.call(b, null != b ? b.showTitle : b, {
                                name: "if",
                                hash: {},
                                fn: this.program(4, k),
                                inverse: this.noop,
                                data: k
                            }), null != c && (d += c), d += '\r\n\t\t\t<div class="progress progressXP">\r\n\t\t\t\t<span class="txt1">+</span>\r\n\t\t\t\t<span class="valAbs"></span>\r\n\t\t\t\t<span class="txt2">XP</span>\r\n\t\t\t</div>\r\n\r\n',
                            c = a.if.call(b, null != b ? b.levelUp : b, {
                                name: "if",
                                hash: {},
                                fn: this.program(6, k),
                                inverse: this.noop,
                                data: k
                            }), null != c && (d += c), d += "\r\n", c = a.each.call(b, null != b ? b.achievements : b, {
                                name: "each",
                                hash: {},
                                fn: this.program(8, k),
                                inverse: this.noop,
                                data: k
                            }), null != c && (d += c), d += "\r\n", c = a.if.call(b, null != b ? b.loginNotify : b, {
                                name: "if",
                                hash: {},
                                fn: this.program(10, k),
                                inverse: this.noop,
                                data: k
                            }), null != c && (d += c), d + '\t\t</div>\r\n\r\n\t\t<div class="pagination">\r\n\t\t\t<div class="pgn up">&#9650;</div>\r\n\t\t\t<div class="pgn down">&#9660;</div>\r\n\t\t</div>\r\n\t</div>\t\r\n</div>'
                    },
                    useData: !0
                });
                h.register = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        return '<div class="uiwindow nativeInput">\r\n\t<div class="inner">\r\n\t\t<div class="header">\r\n\t\t\t<div class="avatar">\r\n\t\t\t\t<img alt="Avatar" />\r\n\t\t\t\t<div class="welcome">Hey, <span class="realname"></span></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<p class="txt1">Choose your unique player name!</p>\r\n\r\n\t\t<input class="unique" placeholder="Nickname..." />\r\n\r\n\t\t<p class="txt2 blinkRed">You cannot change this name afterwards!</p>\r\n\r\n\t\t<p class="error"></p>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="done">Continue</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.settings = a({
                    1: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t\t\t<option value="' + d(a(null != b ? b.name : b, b)) + '">' + d(a(null != b ? b.label : b, b)) + "</option>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        d = '<div class="uiwindow nativeInput">\r\n\t<div class="settings">\r\n\t\t<div class="closeX">X</div>\r\n\r\n\t\t<div class="frame">\r\n\t\t\t<div class="frameLabel">Region</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\tSelect a region which is close to you, or you will lag around.<br/>\r\n\r\n\t\t\t\t<select>\r\n';
                        return c = a.each.call(b, null != b ? b.regions : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + '\t\t\t\t</select>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="frame">\r\n\t\t\t<div class="frameLabel">Game</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<input type="checkbox" id="optionGameNoSound" /><label for="optionGameNoSound">No sound</label><br/>\r\n\t\t\t\t<input type="checkbox" id="optionGameLowGfx" /><label for="optionGameLowGfx">Low graphics quality (faster)</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="cancel">Cancel</button>\r\n\t\t\t<button class="done">Save</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.sidebar = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(b, a, d, k) {
                        var c;
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '<div class="left bar">\r\n\t<div class="barSection player loggedInOnly">\r\n\t\t<div class="avatar">\r\n\t\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + d(a(null != (c = null != b ? b.auth : b) ? c.name : c, b)) + '" width="80" height="80"></canvas>\r\n\t\t\t<div class="welcome"><a href="/profile/' + d(a(null != (c = null != b ? b.auth : b) ? c.name : c, b)) + '">' + d(a(null != (c = null !=
                                b ? b.auth : b) ? c.name : c, b)) + '</a></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="hr"></div>\r\n\r\n\t\t<div class="playerProgress">\r\n\t\t\t<div class="tooltip">\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr><td>Level</td><td class="vLvl">' + d(a(null != (c = null != b ? b.auth : b) ? c.level : c, b)) + '</td></tr>\r\n\t\t\t\t\t<tr><td>XP</td><td class="vXp">' + d(a(null != (c = null != b ? b.auth : b) ? c.xpCur : c, b)) + "/" + d(a(null != (c = null != b ? b.auth : b) ? c.xpMax : c, b)) + '</td></tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t\t<div class="xp">\r\n\t\t\t\t<div class="inner" style="width: ' +
                            d(a(null != (c = null != b ? b.auth : b) ? c.xpPercent : c, b)) + '%"></div>\r\n\t\t\t\t<div class="v">' + d(a(null != (c = null != b ? b.auth : b) ? c.xpPercent : c, b)) + '%</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="level ' + d(a(null != (c = null != b ? b.auth : b) ? c.levelClass : c, b)) + '"><span class="v">' + d(a(null != (c = null != b ? b.auth : b) ? c.level : c, b)) + '</span></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="achievements">\r\n\t\t\t<div class="txt"><span>Show achievements</span></div>\r\n\r\n\t\t\t<div class="cupBox">\r\n\t\t\t\t<canvas class="cup" width="64" height="64"></canvas>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<a href="#" class="logout"><span>Logout</span></a>\r\n\t</div>\r\n\r\n\t<div class="barSection login loggedOutOnly">\r\n\t\t<p>\r\n\t\t\t<span class="white">Sign in</span> to collect <span class="red">XP</span> and <span class="red">achievements</span>\r\n\t\t</p>\r\n\t\t\x3c!--<p>\r\n\t\t\tFind <span class="red">friends</span> and join a <span class="red">clan</span>!\r\n\t\t</p>--\x3e\r\n\r\n\t\t<a class="loginBtn loginFB">\r\n\t\t\t<div class="icon">\r\n\t\t\t\t<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><style>.cls-1{fill:#fff;}</style></defs><title>flogo-HexRBG-Wht-58</title><path class="cls-1" d="M53.85,0H3.15A3.15,3.15,0,0,0,0,3.15v50.7A3.15,3.15,0,0,0,3.15,57h27.3V35H23V26.33h7.41V20c0-7.37,4.49-11.38,11.06-11.38A62.15,62.15,0,0,1,48.15,9v7.69H43.61c-3.57,0-4.26,1.69-4.26,4.18v5.5H47.9L46.79,35H39.35V57h14.5A3.15,3.15,0,0,0,57,53.85V3.15A3.15,3.15,0,0,0,53.85,0Z"/></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="label">Continue with Facebook</div>\r\n\t\t</a>\r\n\t\t<a class="loginBtn loginGoogle">\r\n\t\t\t<div class="icon">\r\n\t\t\t\t<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1045 905q0-26-6-64h-362v132h217q-3 24-16.5 50t-37.5 53-66.5 44.5-96.5 17.5q-99 0-169-71t-70-171 70-171 169-71q92 0 153 59l104-101q-108-100-257-100-160 0-272 112.5t-112 271.5 112 271.5 272 112.5q165 0 266.5-105t101.5-270zm345 46h109v-110h-109v-110h-110v110h-110v110h110v110h110v-110zm274-535v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z" fill="#fff"/></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="label">Continue with Google</div>\r\n\t\t</a>\r\n\t</div>\r\n\r\n\t<div class="barSection notifications loggedInOnly">\r\n\t\t<div class="notification messages">\r\n\t\t\t<div class="txt"><span>Messages</span></div>\r\n\r\n\t\t\t<div class="number"><span class="v">0</span></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="notification friendrequests">\r\n\t\t\t<div class="txt"><span>Friend requests</span></div>\r\n\r\n\t\t\t<div class="number"><span class="v">0</span></div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="barSection friends loggedInOnly nativeScroll">\r\n\t\t<div class="area">\r\n\t\t</div>\r\n\t\t<div class="noFriends">\r\n\t\t\t<div class="hr"></div>\r\n\t\t\t<div class="txt1">You don\'t have any friends yet. Add someone to play together!</div>\r\n\r\n\t\t\t<button class="search"><span class="uiIcon searchWhite"></span>Search friend</button>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="footer footerLeft">\r\n\t\t<a class="footerA" href="http://iogames.space/" title="More io Games">More .io Games</a>\r\n\t</div>\r\n</div>\r\n<div class="right bar">\r\n\t<div class="barSection followBox">\r\n\t\t<h3>Follow us now!</h3>\r\n\r\n\t\t<div class="followprovider fpFacebook">\r\n\t\t\t<div class="fb-like" data-href="https://www.facebook.com/kugeln.io" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="followprovider fpTwitter">\r\n\t\t\t<a href="https://twitter.com/kugeln_io" class="twitter-follow-button" data-show-count="false">Follow @kugeln_io</a>\r\n\t\t</div>\r\n\r\n\t\t<div class="followprovider fpReddit">\r\n\t\t\t<a href="https://www.reddit.com/r/kugelnio/" target="_blank">Discuss on /r/kugelnio</a>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection controlHint">\r\n\t\t<h3>Controls</h3>\r\n\t\t<p><b>A/D</b> - Walk</p>\r\n\t\t<p><b>Space</b> - Jump</p>\r\n\t\t<p><b>Mouse Left</b> - Shoot</p>\r\n\t\t<p><b>Mouse Right</b> - Grapnel</p>\r\n\t\t<p><b>Scroll</b> - Change weapon</p>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection news">\r\n\t\t<h3>News</h3>\r\n\t\t<h4>08 January 2019</h4>\r\n\t\t<ul>\r\n\t\t\t<li>Fixed wrong player information</li>\r\n\t\t\t<li>Fixed logout</li>\r\n\t\t</ul>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection ioText">\r\n\t\tkugeln is a fast-paced, multiplayer <a href="https://iogames.space">io game</a>. You can play a wide range of <a href="https://addictinggames.com">games</a> at Addicting Games, including popular categories like puzzle and <a href="http://www.addictinggames.com/car-games/index.jsp">racing games</a>. New games are added every Thursday and are free to play online with your friends.\r\n\t</div>\r\n\r\n\r\n\t<div class="footer footerRight">\r\n\t\t<div class="clear"></div>\r\n\t\t<a class="footerLogo" href="http://www.addictinggames.com/"><img src="/addicting-games.png" title="more games" /></a>\r\n\t\t<div class="clear"></div>\r\n\t\t<a class="footerB" href="/about" title="About kugeln.io">About</a>\r\n\t\t<a class="footerB" href="/halloffame">Hall of Fame</a>\r\n\t\t<a class="footerB" href="/changelog">Changelog</a>\r\n\t\t<a class="footerC" href="/privacy">Privacy Policy</a>\r\n\t\t<a class="footerC" href="/terms">Terms of use</a>\r\n\t\t<a class="footerC" href="/imprint">Imprint</a>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.stats = a({
                    1: function(b, a, d, k) {
                        var c;
                        d = this.lambda;
                        var e = this.escapeExpression;
                        d = '\t\t<table class="' + e(d(null != b ? b.teamClass : b, b)) + '">\r\n\t\t\t<tr class="teamOverview">\r\n\t\t\t\t<th colspan="3">' + e(d(null != b ? b.teamName : b, b)) + "</th>\r\n\t\t\t\t<th>" + e(d(null != b ? b.teamScore : b, b)) + '</th>\r\n\t\t\t</tr>\r\n\t\t\t<tr class="playerHead">\r\n\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t<th><span>Kills</span></th>\r\n\t\t\t\t<th><span>Death</span></th>\r\n\t\t\t\t<th><span>Score</span></th>\r\n\t\t\t</tr>\r\n';
                        return c = a.each.call(b, null != b ? b.list : b, {
                            name: "each",
                            hash: {},
                            fn: this.program(2, k),
                            inverse: this.noop,
                            data: k
                        }), null != c && (d += c), d + "\t\t</table>\r\n"
                    },
                    2: function(b, a, d, k) {
                        a = this.lambda;
                        d = this.escapeExpression;
                        return '\t\t\t\t<tr class="' + d(a(null != b ? b.rowClass : b, b)) + '">\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<span class="nick">' + d(a(null != b ? b.name : b, b)) + "</span>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>" + d(a(null != b ? b.kills : b, b)) + "</td>\r\n\t\t\t\t\t<td>" + d(a(null != b ? b.death : b, b)) + "</td>\r\n\t\t\t\t\t<td>" + d(a(null !=
                            b ? b.score : b, b)) + "</td>\r\n\t\t\t\t</tr>\r\n"
                    },
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(a, e, d, k) {
                        var b, g;
                        d = e.helperMissing;
                        var q = this.escapeExpression;
                        d = '<div class="header">\r\n\t<div class="timeLeftKey"><span>Time left</span></div>\r\n\t<div class="gameTypeKey"><span>Game type</span></div>\r\n\r\n\t<div class="timeLeftValue"><span>' + q((g = null != (g = e.remainingSeconds || (null != a ? a.remainingSeconds : a)) ? g : d, "function" == typeof g ? g.call(a, {
                                name: "remainingSeconds",
                                hash: {},
                                data: k
                            }) : g)) + '</span></div>\r\n\t<div class="gameTypeShortValue"><span>' +
                            q((g = null != (g = e.gameTypeShort || (null != a ? a.gameTypeShort : a)) ? g : d, "function" == typeof g ? g.call(a, {
                                name: "gameTypeShort",
                                hash: {},
                                data: k
                            }) : g)) + '</span></div>\r\n\t<div class="gameTypeLongValue"><span>' + q((g = null != (g = e.gameTypeLong || (null != a ? a.gameTypeLong : a)) ? g : d, "function" == typeof g ? g.call(a, {
                                name: "gameTypeLong",
                                hash: {},
                                data: k
                            }) : g)) + '</span></div>\r\n</div>\r\n\r\n<div class="lists">\r\n';
                        return b = e.each.call(a, null != a ? a.teams : a, {
                                name: "each",
                                hash: {},
                                fn: this.program(1, k),
                                inverse: this.noop,
                                data: k
                            }), null !=
                            b && (d += b), d + "</div>"
                    },
                    useData: !0
                });
                h.title = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(a, e, d, k) {
                        return '<div class="uiwindow nativeInput">\r\n\t<div class="playerselect">\r\n\t\t<div class="logo">\r\n\t\t\t<img src="/logo_dark.svg" title="kugeln.io" alt="kugeln.io" />\r\n\t\t</div>\r\n\t\t\r\n\t\t<form>\r\n\t\t\t<div class="extAdBox inputBox">\r\n\t\t\t\t<div class="containerIAB300">\r\n\t\t\t\t\t<div class="adbhint">\r\n\t\t\t\t\t\t<div class="txt1">y u block ads?</div>\r\n\t\t\t\t\t\t<div class="cry">:\'(</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="mainInput inputBox">\r\n\t\t\t\t<input type="text" maxlength="16" placeholder="Enter nickname..." class="nickname" />\r\n\t\t\t\t<input type="submit" class="connect" value="Play!" />\r\n\r\n\t\t\t\t<button class="small noLiteMode settings">Settings</button>\r\n\t\t\t\t<button class="small noLiteMode customMatch">Advanced Match</button>\r\n\t\t\t\t<div class="onlyLiteMode matchHint">Joining match <span class="value"></span>. <a href="/">Click for other match</a></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="customize inputBox">\r\n\t\t\t\t<div class="previewShadow"></div>\r\n\t\t\t\t<canvas class="preview" width="256" height="256"></canvas>\r\n\t\t\t\t<a class="change">Click to change</a>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="highscore inputBox">\r\n\t\t\t\t<div class="headline">Weekly Highscore</div>\r\n\r\n\t\t\t\t<div class="header">\r\n\t\t\t\t\t<div class="place">Pos</div>\r\n\t\t\t\t\t<div class="name">Player</div>\r\n\t\t\t\t\t<div class="xp">XP</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="table">\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="footer yourscore">Your position: <span class="v"></span></div>\r\n\t\t\t\t<div class="footer motivationPlay">Play to get listed!</div>\r\n\t\t\t\t<div class="footer motivationLogin">Login to get listed!</div>\r\n\t\t\t\t<div class="footer more">See more &gt;&gt;</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n</div>'
                    },
                    useData: !0
                });
                h.toast = a({
                    compiler: [6, ">= 2.0.0-beta.1"],
                    main: function(a, e, d, k) {
                        var b, g;
                        d = e.helperMissing;
                        var q = '<div class="type_usable">\r\n\t<div class="msg">';
                        return g = null != (g = e.usableMsg || (null != a ? a.usableMsg : a)) ? g : d, b = "function" == typeof g ? g.call(a, {
                            name: "usableMsg",
                            hash: {},
                            data: k
                        }) : g, null != b && (q += b), q += '</div>\r\n</div>\r\n\r\n<div class="type_inputhelp">\r\n\t<div class="msg">', g = null != (g = e.inputhelpMsg || (null != a ? a.inputhelpMsg : a)) ? g : d, b = "function" == typeof g ? g.call(a, {
                            name: "inputhelpMsg",
                            hash: {},
                            data: k
                        }) : g, null != b && (q += b), q + '</div>\r\n</div>\r\n\r\n<div class="type_stalling">\r\n\t<div class="msg nativeInput blockGameInput">This match is stalling. No new users will join. There are other matches with more players. <a href="/">Other match</a></div>\r\n</div>\r\n'
                    },
                    useData: !0
                })
            }()
        }, {}],
        17: [function(f, n, m) {
            n.exports = {
                spring: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                winter: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13,
                                2, 64, 3
                            ],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                desert: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0,
                                0, 49, 1
                            ],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                moon: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48,
                                8, 64, 64
                            ],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                city: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                }
            }
        }, {}],
        18: [function(f, n, m) {
            (function(a) {
                function h() {
                    for (var a = Error().stack.split("\n")[4].match(/.*[\/|\\|\(]([^)]*)\)?$/)[1]; 26 > a.length;) a += " ";
                    return a
                }

                function b(b, e) {
                    var l = [];
                    l.push(b);
                    "STACK" != b && l.push(h());
                    for (var p in e) l.push(e[p]);
                    e = "";
                    for (p = 0; p < l.length; p++) e = "object" === typeof l[p] ? e + ("" + d.inspect(l[p]) + "\t") : e + ("" + l[p] + "\t");
                    console.log(e);
                    "production" == a.env.NODE_ENV && (c ? (e = (new Date).toUTCString() + "\t" + e + "\n", k.appendFile(c, e, function(a) {
                        a && console.log("Log write error: ",
                            a)
                    })) : console.log("Logging file output not set"));
                    if (g) g.onLog(b, l)
                }

                function e(a) {
                    a = f(8).parse(a);
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c];
                        b("STACK", [d.fileName + (null != d.lineNumber ? ":" + d.lineNumber : "") + (null != d.functionName ? " (" + d.functionName + ")" : "")])
                    }
                }
                var d = f(10),
                    k = f(2),
                    c = null,
                    g = null,
                    q = !1;
                if (a.browser) throw Error("Used logging system in frontend");
                n.exports.setFile = function(a) {
                    c = a
                };
                n.exports.setHandler = function(a) {
                    g = a
                };
                n.exports.setDebugState = function(a) {
                    q = a
                };
                n.exports.info = function() {
                    b("INFO", arguments)
                };
                n.exports.error = function() {
                    b("ERROR", arguments)
                };
                n.exports.warn = function() {
                    b("WARN", arguments)
                };
                n.exports.debug = function() {
                    q && b("DEBUG", arguments)
                };
                n.exports.panicWithStack = function(a) {
                    b("PANIC", arguments);
                    e(a)
                };
                n.exports.printErrorStack = function(a) {
                    e(a)
                }
            }).call(this, f(7))
        }, {}],
        19: [function(f, n, m) {
            var a = f(125),
                h = f(127),
                b = f(47),
                e = f(48);
            n.exports = new function() {
                function d() {
                    g = !0;
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b],
                            d = c.n + "ball";
                        c.b && (d = c.b);
                        var e = 0;
                        c.t && (e = 1);
                        d = {
                            id: c.c,
                            name: d,
                            country: c.n,
                            invert: !0 ===
                                c.i,
                            ball64: null,
                            keywords: null,
                            score: c.s || 0,
                            type: e,
                            minLvl: c.l || 0
                        };
                        l.push(d);
                        p[c.c] = d
                    }
                    l.sort(function(a, b) {
                        return b.score - a.score
                    })
                }

                function k() {
                    for (var a = 0; a < l.length && null == l[a].ball64; a++) {
                        var c = new h;
                        c.ball = l[a].id;
                        var d = l[a],
                            e = document.createElement("canvas");
                        e.width = 64;
                        e.height = 64;
                        d.ball64 = new b(e, 64, 64, !1, c)
                    }
                }

                function c(a) {
                    function b(c) {
                        for (var d = !0; !(c >= l.length);)
                            if (q.add(l[c].ball64)) c++, d = !1;
                            else break;
                        d ? a() : q.render(function() {
                            q.reset();
                            b(c)
                        })
                    }
                    k();
                    f = !0;
                    b(0)
                }
                var g = !1,
                    q = new e(64),
                    l = [],
                    p = {},
                    f = !1;
                this.ensurePreviews = function(a) {
                    f ? a() : c(a)
                };
                this.getBallList = function() {
                    g || d();
                    return l
                };
                this.getBallRecord = function(a) {
                    g || d();
                    return "undefined" != typeof p[a] ? p[a] : null
                }
            }
        }, {}],
        20: [function(f, n, m) {
            var a = f(76),
                h = f(131);
            n.exports = new function() {
                var b = this,
                    e = null,
                    d = null,
                    k = null,
                    c = [],
                    g = null,
                    q = null,
                    l = !1,
                    p = null,
                    f = !1;
                this.loadConversations = function(b, c) {
                    a.socialMessage("loadConversationList", {
                        start: b,
                        count: c
                    })
                };
                this.loadMessages = function(b) {
                    a.socialMessage("loadMessages", {
                        playerName: b
                    })
                };
                this.setActive =
                    function(a) {
                        (f = a) || this.switchToConversation(null)
                    };
                this.switchToConversation = function(a) {
                    l = !1;
                    p && (clearTimeout(p), p = null);
                    if (g != a) {
                        if (g = a) this.createConversationIfNeeded(a) && (l = !0), this.setSeenDelayed(a), this.loadMessages(a);
                        e && e()
                    }
                };
                this.setSeenDelayed = function(a) {
                    var b = this;
                    setTimeout(function() {
                        b.setSeen(a)
                    }, 1E3)
                };
                this.setSeen = function(b) {
                    var c = this.findConversation(b);
                    c && (c.seen || (a.socialMessage("messageSeen", {
                        name: b
                    }), c.seen = !0), e && e())
                };
                this.findConversation = function(a) {
                    for (var b = 0; b < c.length; b++)
                        if (c[b].name ==
                            a) return c[b];
                    return null
                };
                this.createConversationIfNeeded = function(a) {
                    for (var b = 0; b < c.length; b++)
                        if (c[b].name == a) return !1;
                    c.unshift({
                        name: a
                    });
                    return !0
                };
                this.bumpConversation = function(a) {
                    for (var d = null, e = -1, l = 0; l < c.length; l++)
                        if (c[l].name == a) {
                            d = c[l];
                            e = l;
                            break
                        }
                    d ? (c.splice(e, 1), c.unshift(d), d = !1) : (c.unshift({
                        name: a,
                        seen: !0
                    }), d = !0);
                    null == g && f && b.switchToConversation(a);
                    return d
                };
                this.setConversationLastMessage = function(a, b, d) {
                    for (var e = 0; e < c.length; e++) c[e].name == a && (c[e].lastMsg = b, c[e].time = h.getFriendlyDateTime(d))
                };
                this.sendMessageToCurrentConversation = function(c) {
                    g && (a.socialMessage("sendMessage", {
                        playerName: g,
                        msg: c
                    }), b.bumpConversation(g), b.setConversationLastMessage(g, c, new Date), e && e(), k && k(g, {
                        incoming: !1,
                        time: h.getFriendlyExactDateTime(new Date),
                        text: c
                    }))
                };
                this.receivedMessage = function(c, d, l) {
                    l = new Date(1E3 * l);
                    b.bumpConversation(c);
                    var p = b.findConversation(c);
                    b.setConversationLastMessage(c, d, l);
                    g == c && f ? (k && k(c, {
                            incoming: !0,
                            time: h.getFriendlyExactDateTime(l),
                            text: d
                        }), a.socialMessage("messageSeen", {
                            name: c
                        }),
                        p.seen = !0) : p.seen = !1;
                    e && e()
                };
                this.getConversationList = function() {
                    return c
                };
                this.getCurrentMessages = function() {
                    return q
                };
                this.getCurrentConversationName = function() {
                    return g
                };
                this.onConversationListUpdate = function(a) {
                    e = a
                };
                this.onAddMessage = function(a) {
                    k = a
                };
                this.onConversationLoad = function(a) {
                    d = a
                };
                a.onSocialMessage("conversationList", function(a) {
                    c = a.list;
                    f && null == g && 0 < c.length && b.switchToConversation(c[0].name);
                    l && b.bumpConversation(g);
                    e && e()
                });
                a.onSocialMessage("conversation", function(a) {
                    g == a.name &&
                        (d && d(a), q = a.list)
                });
                a.onSocialMessage("chatMessage", function(a) {
                    b.receivedMessage(a.fromPlayer, a.msg, a.time)
                })
            }
        }, {}],
        21: [function(f, n, m) {
            function a(a) {
                this.session = a;
                this.init()
            }
            m = f(151);
            var h = f(150);
            f(25);
            var b = f(59),
                e = f(142).Bullet,
                d = f(142).BulletTypes,
                k = f(142).WeaponTypes,
                c = f(148),
                g = f(146).ItemTypes,
                q = f(143),
                l = f(149),
                p = f(155),
                A = f(29),
                y = f(129),
                x = f(131),
                w = f(57),
                B = f(78),
                r = f(54),
                z = f(37),
                t = f(39),
                D = f(34),
                E = f(86),
                I = f(58),
                K = f(61);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.session =
                null;
            a.prototype.tick = 0;
            a.prototype.joinedSessionTime = null;
            a.prototype.lastLocalSimulatedTick = 0;
            a.prototype.localCharacter = null;
            a.prototype.ctfFlags = null;
            a.prototype.ctfLastCaptureTick = 0;
            a.prototype.currentFlags = 0;
            a.prototype.currentInput = 0;
            a.prototype.currentAngle = 0;
            a.prototype.currentRopeTarget = null;
            a.prototype.ropeSetTime = null;
            a.prototype.lastInput = 0;
            a.prototype.lastAngle = 0;
            a.prototype.lastRopeTarget = null;
            a.prototype.fakeRopeSent = !0;
            a.prototype.currentTile = null;
            a.prototype.lastTile = null;
            a.prototype.teamRequested = !1;
            a.prototype.gameState = null;
            a.prototype.gameStateReconciled = null;
            a.prototype.lastSnapshotTick = null;
            a.prototype.firstGameUpdate = !1;
            a.prototype.lastInputSent = 0;
            a.prototype.lastAngleSent = 0;
            a.prototype.nextSeq = 1;
            a.prototype.estimatedStartTime = 0;
            a.prototype.startTimeList = null;
            a.prototype.lastTickTime = Date.now();
            a.prototype.lastUserInputTime = 0;
            a.prototype.lagScore = 0;
            a.prototype.nearUsable = null;
            a.prototype.currentUsable = null;
            a.prototype.zoomTarget = 1;
            a.prototype.zoomSpeed = 0;
            a.prototype.marketingCam = !1;
            a.prototype.localSnapshots = null;
            a.prototype.begin = function(a, b, d) {
                this.startTimeList = [];
                this.localSnapshots = [];
                this.state = 1;
                this.teamRequested = !1;
                this.lastUserInputTime = Date.now();
                this.tick = a - 1;
                this.joinedSessionTime = Date.now();
                this.physic = new c(this);
                this.firstGameUpdate = !0;
                this.map.mapDef.border && this.physic.setBorder([this.map.mapWidth * this.map.tileSize, this.map.mapHeight * this.map.tileSize], 0 != this.map.mapDef.bottomBorder);
                this.addStartTime(Date.now() - 1E3 * this.tick / h.ticksPerSecond);
                r.mapGfx.resetDamage();
                this.initBricks(d);
                w.isHit(13);
                if (!this.map.quadTree) throw Error("No quadtree");
                this.map.quadTree.unserialize(b, b.byteLength);
                this.map.stampOutUsingTree();
                this.gameState = new y;
                b = this.gameState.createPatch(d);
                this.handleSnapshot(a, b);
                r.ui.statsWidget.updatePlayerList(d.getSheets("player"));
                r.ui.statsWidget.setTeamScore(this.getTeamScore());
                r.materialCompose.setBlackWhiteFactor(0 == this.session.lastMatchData.warmup ? 0 : .8);
                this.session.isDev && r.ui.setDev();
                I.show(!0)
            };
            a.prototype.end = function() {
                for (this.state =
                    0; 0 < this.bullets.length;) this.pruneBullet(this.bullets[0]);
                for (; 0 < this.planes.length;) this.planes.pop().remove()
            };
            a.prototype.initBricks = function(a) {
                a = a.getSheets("brick");
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    this.map.addBrick(c.get("x"), c.get("y"), !1)
                }
            };
            a.prototype.addStartTime = function(a) {
                this.startTimeList.push(a);
                100 < this.startTimeList.length && this.startTimeList.shift();
                if (5 <= this.startTimeList.length) {
                    a = this.startTimeList.slice();
                    a.sort();
                    for (var b = ~~(a.length / 2), c = 0, d = 0; d < b; d++) c += a[d];
                    this.estimatedStartTime =
                        c / b
                } else {
                    for (d = c = 0; d < this.startTimeList.length; d++) c += this.startTimeList[d];
                    this.estimatedStartTime = c / this.startTimeList.length
                }
            };
            a.prototype.tickUpdateLocalRope = function() {
                var a = this.currentAngle,
                    b = this.currentInput >> 3 & 1,
                    c = this.lastInput >> 3 & 1;
                this.lastRopeTarget = this.currentRopeTarget;
                if (this.localCharacter) {
                    if (b && !c && !this.currentUsable) {
                        b = enemy ? enemy.get('posX') : this.localCharacter.pos[0];
                        c = enemy ? enemy.get('posY') : this.localCharacter.pos[1];
                        var d = [b, c],
                            e = enemy ? [enemy.get('posX'), enemy.get('posY')] : [b + Math.cos(a) * 2000, c + Math.sin(a) * 2000];
                        a = null;
                        var l = !1,
                            g = this.map.quadTree.findFirstOnLine(b,
                                c, e[0], e[1], 0, !0);
                        if (!g && this.map.mapDef.border) {
                            var k = [this.map.mapWidth * this.map.tileSize, this.map.mapHeight * this.map.tileSize],
                                p = 0 != this.map.mapDef.bottomBorder,
                                f = x.intersectionLineRect(b, c, e[0], e[1], 0, 0, k[0], k[1]);
                            if (f)
                                for (var y = x.sign(b - e[0]), A = x.sign(c - e[1]), w = 0; w < f.length; w++) {
                                    var n = b - f[w][0],
                                        t = c - f[w][1];
                                    Math.sqrt(n * n + t * t) < h.maxRopeLength && y == x.sign(n) && A == x.sign(t) && (p || f[w][1] != k[1]) && (g = f[w].slice())
                                }
                        }
                        g ? (n = this.localCharacter.pos[0] - g[0], t = this.localCharacter.pos[1] - g[1], a = [g, Math.sqrt(n *
                            n + t * t)]) : (this.localCharacter.fakeRopeTarget = e.slice(), this.localCharacter.fakeRopeProgress = 0, this.fakeRopeSent = !1);
                        b = this.findFirstCharacterOnLine([d[0], d[1]], [e[0], e[1]], this.localCharacter);
                        null == b && null == a ? this.currentRopeTarget = null : (this.currentRopeTarget = null == b && null != a ? a[0] : null != b && null == a ? b[0] : b[1] < a[1] ? b[0] : a[0], this.localCharacter.fakeRopeTarget = null, l = !0);
                        l && E.playSound("rope1", this.localCharacter.pos, !0);
                        this.ropeSetTime = this.tick
                    } else if (!b || this.currentUsable) this.currentRopeTarget =
                        null, this.localCharacter.fakeRopeTarget = null;
                    this.currentRopeTarget instanceof q && this.tick - this.ropeSetTime > h.maxRopeCharTime;
                } else this.currentRopeTarget = null
            };
            a.prototype.findFirstCharacterOnLine = function(a, b, c) {
                for (var d = 1E8, e = null, l = 0; l < this.characters.length; l++) {
                    var g = this.characters[l];
                    if (g != c && x.collideLineCircle([a, b], g.pos, g.radius)) {
                        var k = a[0] - g.pos[0],
                            p = a[1] - g.pos[1];
                        k = k * k + p * p;
                        d > k && (d = k, e = g)
                    }
                }
                return e ? [e, Math.sqrt(d)] : null
            };
            a.prototype.addEvent = function(a,
                b, c, d) {
                switch (a) {
                    case 0:
                        this.characters.push(c);
                        this.session.localPlayer && c == this.session.localPlayer.character && (this.localCharacter = this.session.localPlayer.character);
                        break;
                    case 1:
                        throw Error("deprecated");
                    case 2:
                        throw Error("deprecated");
                    default:
                        K.error("Unknown event: ", a)
                }
            };
            a.prototype.estimateTick = function() {
                var a = ~~((Date.now() - this.estimatedStartTime) / 1E3 * h.ticksPerSecond);
                a > this.tick && (this.tick = a)
            };
            a.prototype.handleSnapshotTiming = function(a) {
                this.addStartTime(Date.now() - 1E3 * a / h.ticksPerSecond)
            };
            a.prototype.tickAddInput = function(a) {
                if (this.localCharacter && this.lastLocalSimulatedTick != this.tick) {
                    a = this.localCharacter.hasJetpack(this.tick);
                    this.lastInput = this.currentInput;
                    this.lastTile = this.currentTile;
                    this.currentFlags = this.currentInput = 0;
                    if (w.isDown(65) || w.isDown(37)) this.currentInput |= 1, I.set(0);
                    if (w.isDown(68) || w.isDown(39)) this.currentInput |= 2, I.set(0);
                    !a && (w.isHit(32) || w.isHit(87) || w.isHit(38)) && (this.currentFlags |= 1, I.set(1));
                    w.isHit(69) && (this.currentFlags |= 2);
                    w.isHit(81) && (this.currentFlags |=
                        4);
                    w.isDown(w.MOUSE_RIGHT) && (this.currentInput |= 8, I.set(3));
                    w.isDown(w.MOUSE_LEFT) && (this.currentInput |= 16, I.set(2));
                    a && (w.isDown(32) || w.isDown(87) || w.isDown(38)) && (this.currentInput |= 32);
                    a = w.getMousePos();
                    this.lastAngle = this.currentAngle;
                    this.currentAngle = Math.atan2(a[1], a[0]);
                    isNaN(this.currentAngle) && (this.currentAngle = 0);
                    this.localCharacter.setRenderAngle(this.currentAngle);
                    if (this.lastAngle != this.currentAngle || this.lastInput != this.currentInput || this.currentFlags) this.lastUserInputTime = Date.now();
                    this.currentTile = this.getCurrentTile();
                    a = -1;
                    var b = 0;
                    if (null == this.currentUsable) {
                        for (b = 49; 57 >= b; b++) w.isHit(b) && (a = b - 48);
                        b = w.getScrollDelta();
                        0 != b && I.set(4)
                    }
                    var c = !1;
                    if (this.lastInput != this.currentInput || 0 != b || -1 != a) c = !0;
                    this.hasRopeTargetChanged() && (c = !0);
                    this.tick - this.lastInputSent >= h.inputResendTime && (c = !0);
                    this.currentFlags && (c = !0, this.localCharacter.flagsList.push({
                        tick: this.tick,
                        flags: this.currentFlags
                    }));
                    this.lastAngle != this.currentAngle && this.tick - this.lastAngleSent >= h.maxAngleResend && (this.lastAngle =
                        this.currentAngle, c = !0);
                    var d = !1;
                    if (this.currentTile && this.lastTile) {
                        if (this.currentTile[0] != this.lastTile[0] || this.currentTile[1] != this.lastTile[1]) d = !0
                    } else d = !0;
                    d && k[this.localCharacter.currentWeapon].bricktool && (c = !0);
                    c && (this.session.sendInput(this.nextSeq, this.currentInput, this.currentFlags, this.currentAngle, this.currentRopeTarget, this.localCharacter.fakeRopeTarget, b, a, this.currentTile), this.fakeRopeSent = !0, this.lastAngleSent = this.lastInputSent = this.tick, this.localCharacter.inputList.push({
                        tick: this.tick,
                        seq: this.nextSeq,
                        received: null,
                        flags: this.currentFlags,
                        input: this.currentInput,
                        lastInput: this.lastInput,
                        ropeTarget: this.currentRopeTarget,
                        soundPlayed: !1
                    }), this.nextSeq++)
                }
            };
            a.prototype.hasRopeTargetChanged = function() {
                if (!this.fakeRopeSent) return !0;
                if (null == this.lastRopeTarget && null == this.currentRopeTarget) return !1;
                if (null != this.lastRopeTarget && null != this.currentRopeTarget) {
                    var a = this.lastRopeTarget instanceof q,
                        b = this.currentRopeTarget instanceof q;
                    if (a && b) return this.lastRopeTarget != this.currentRopeTarget;
                    if (!a && !b) return this.currentRopeTarget[0] != this.lastRopeTarget[0] || this.currentRopeTarget[1] != this.lastRopeTarget[1]
                }
                return !0
            };
            a.prototype.buildRopeTargetFromSheet = function(a) {
                var b = a.get("ropeType");
                return 1 == b ? [a.get("ropePosX"), a.get("ropePosY")] : 2 == b && (a = this.session.getPlayerById(a.get("ropeChar"))) && a.character ? a.character : null
            };
            a.prototype.isCharacterObjectValid = function(a) {
                return a && a.player && -1 != this.session.players.indexOf(a.player) && a == a.player.character ? !0 : !1
            };
            a.prototype.getCurrentTile =
                function() {
                    var a = w.getAbsoluteMousePos(),
                        b = z.getCamera();
                    b = [a[0] + b[0] / z.zoom, a[1] + b[1] / z.zoom];
                    a = Math.floor(b[0] / this.map.tileSize * z.zoom);
                    b = Math.floor(b[1] / this.map.tileSize * z.zoom);
                    return 0 > a || a >= this.map.mapWidth || 0 > b || b >= this.map.mapHeight ? null : [a, b]
                };
            a.prototype.validateRopeTarget = function(a) {
                return a
            };
            a.prototype.tickRemoveOldInputs = function(a) {
                if (a)
                    for (; 0 < this.outstandingInputs.length;)
                        if (this.outstandingInputs[0].seq <= a.seq) this.outstandingInputs.shift();
                        else break
            };
            a.prototype.pruneOldInputs = function() {
                if (this.localCharacter)
                    for (var a = this.localCharacter.inputList; 20 < a.length || 1 < a.length && 100 < this.tick - a[0].tick;) a.shift()
            };
            a.prototype.snapshotReconciliation = function() {
                if (this.localCharacter && 0 < this.localCharacter.inputList.length) {
                    var a = this.localCharacter.inputList[0],
                        b = a.tick;
                    a.received && (b += this.lastSnapshotTick - a.received + 1);
                    for (a = b; a < this.lastSnapshotTick; a++)(b = this.localCharacter.getInputAt(a)) ? (this.localCharacter.setCurrentInput(b.input),
                        this.localCharacter.ropeTarget = this.validateRopeTarget(b.ropeTarget)) : (this.localCharacter.setCurrentInput(0), this.localCharacter.ropeTarget = null), (b = this.localCharacter.getFlagsAt(a)) && this.localCharacter.setFlags(b.flags), this.localCharacter.updateControl(a), this.physic.update(!0);
                    this.gameStateReconciled = this.gameState.copy();
                    for (a = 0; a < this.characters.length; a++) {
                        b = this.characters[a];
                        var c = this.gameStateReconciled.findSheet("player", b.player.pid);
                        c.set("posX", b.pos[0]);
                        c.set("posY", b.pos[1]);
                        c.set("velX",
                            b.vel[0]);
                        c.set("velY", b.vel[1]);
                        c.set("input", b.currentInput);
                        c.set("lastInput", b.lastInput);
                        c.set("inAir", b.inAir);
                        c.set("jumpCountAir", b.jumpCountAir)
                    }
                } else this.gameStateReconciled = this.gameState.copy()
            };
            a.prototype.tickPrediction = function() {
                this.applyAllSheetPlayer(this.gameStateReconciled);

                for (var a = this.lastSnapshotTick; a < this.tick; a++) {
                    for (var b = 0; b < this.characters.length; b++) {
                        var c = this.characters[b].getInputAt(a);
                        if (c) {
                            this.characters[b].setCurrentInput(c.input);
                            var d = this.validateRopeTarget(c.ropeTarget);
                            null == this.characters[b].ropeTarget && null != d && (c.soundPlayed || this.characters[b] == this.localCharacter || E.playSound("rope1", this.characters[b].pos, !0));
                            this.characters[b].ropeTarget = d;
                            c.soundPlayed = !0
                        } else this.characters[b].setCurrentInput(0);
                        (c = this.characters[b].getFlagsAt(a)) && this.characters[b].setFlags(c.flags);
                        this.characters[b].applyExternalForce(a);
                        this.characters[b].updateControl(a)
                    }
                    this.physic.update(!1)
                }
            };
            a.prototype.updateBulletPhysic = function() {
                for (var a =
                        0; a < this.bullets.length; a++) {
                    var b = this.bullets[a],
                        c = b.lastPos[0] - b.pos[0],
                        d = b.lastPos[1] - b.pos[1];
                    b.travelDistance += Math.sqrt(c * c + d * d);
                    b.age++;
                    b.lastPos = b.pos.slice()
                }
                this.physic.updateBullets()
            };
            a.prototype.tickCreateLocalSnapshot = function() {
                var a = {
                    tick: this.tick,
                    listPlayers: [],
                    listBullets: []
                };
                this.lastTickTime = Date.now();
                for (var b = 0; b < this.characters.length; b++) {
                    var c = this.characters[b];
                    a.listPlayers.push({
                        character: c,
                        pos: c.pos.slice(),
                        vel: [c.vel[0], c.vel[1]]
                    });
                    0 == h.interpolationTime && c.setRenderPos(c.pos[0],
                        c.pos[1])
                }
                this.localSnapshots.push(a)
            };
            a.prototype.handleSnapshot = function(a, b) {
                this.handleSnapshotTiming(a);
                this.session.simulation && (this.gameState.applyPatch(b), this.handlePatch(a, this.gameState, b), this.lastSnapshotTick = a, this.pruneOldInputs(), this.applyAllSheetPlayer(this.gameState), this.snapshotReconciliation(), this.firstGameUpdate = !1);
                this.handleMatchSheet(this.gameState.findSheet("match"))
            };
            a.prototype.handlePatch = function(a, b, c) {
                this.handlePatchNewPlayer(this.gameState, c);
                this.handlePatchLeavePlayer(this.gameState,
                    c);
                this.handlePatchPlayer(a, this.gameState, c);
                this.handlePatchUsables(this.gameState, c);
                this.handlePatchTeamScore(this.gameState, c);
                this.handlePatchBullets(this.gameState, c);
                this.handlePatchBricks(this.gameState, c);
                this.handlePatchPlanes(this.gameState, c);
                this.handlePatchItems(a, this.gameState, c);
                this.handlePatchObjects(a, this.gameState, c)
            };
            a.prototype.handleInputTiming = function(a, b) {
                for (var c = 0; c < this.localCharacter.inputList.length; c++) {
                    var d = this.localCharacter.inputList[c];
                    if (d.seq == a) {
                        d.received =
                            b;
                        a = 1E3 * (b - d.tick) / h.ticksPerSecond;
                        0 > a && (a = 0);
                        break
                    }
                }
            };
            a.prototype.handleInstantData = function(a, b) {
                this.gameState.applyPatch(b);
                this.session.simulation && this.handlePatch(a, this.gameState, b)
            };
            a.prototype.handleEvent = function(a, b, c, d) {
                switch (c) {
                    case "inputFlags":
                        this.handlePlayerFlags(a, b, d.flags);
                        break;
                    case "hitMap":
                        this.handleHitMap(d.bullet, [d.posX, d.posY], d.affectMap);
                        break;
                    case "hitChar":
                        this.handleHitChar(d.bullet, [d.posX, d.posY]);
                        break;
                    case "hitWater":
                        this.handleHitWater(d.bullet, [d.posX, d.posY]);
                        break;
                    case "hitPG":
                        this.handleHitPG(d.bullet, [d.posX, d.posY]);
                        break;
                    case "force":
                        this.handleExternalForce(a, b, d);
                        break;
                    case "capture":
                        this.handleCaptureEvent(d.team, d.player);
                        break;
                    case "kill":
                        this.handleKillAnnouncement(d.killerId, d.killedId, d.cause);
                        break;
                    case "shot":
                        this.handleShotEvent(b, d.weapon, d.result);
                        break;
                    case "brick":
                        this.handleBrickEvent(b, [d.tX, d.tY]);
                        break;
                    default:
                        throw Error("Unknown event: " + c);
                }
            };
            a.prototype.handlePatchNewPlayer = function(a, b) {
                for (var c = 0; c < b.added.length; c++)
                    if ("player" == b.added[c].sheet) {
                        var d = b.added[c].id,
                            e = new B(d);
                        this.session.players.push(e);
                        d == this.session.pid && (this.session.localPlayer = e);
                        d = a.findSheet("player", d);
                        null != d.get("team") && (e.announcedInChat = !0);
                        this.applySheetPlayer(d)
                    }
            };
            a.prototype.handlePatchLeavePlayer = function(a, b) {
                for (a = 0; a < b.removed.length; a++)
                    if ("player" == b.removed[a].sheet) {
                        var c = b.removed[a].id,
                            d = this.session.getPlayerById(c);
                        if (d) {
                            this.killPlayersCharacter(d);
                            c = this.session.players.indexOf(d);
                            if (-1 == c) {
                                K.error("cannot find player to remove from player list");
                                break
                            }
                            this.session.players.splice(c, 1);
                            r.ui.chatWidget.addStatusMsg(d.nick, d.team, 1)
                        } else throw Error("Cannot remove player " + c);
                    }
            };
            a.prototype.handlePatchPlayer = function(a, b, c) {
                for (var d = [], e = 0; e < c.added.length; e++) {
                    var l = b.findSheet("player", c.added[e].id);
                    l && d.push(l)
                }
                for (e = 0; e < c.changes.length; e++)(l = b.findSheet("player", c.changes[e].id)) && d.push(l);
                for (e = 0; e < d.length; e++)
                    if (l = d[e], (b = this.session.getPlayerById(l.id)) &&
                        b.character && (b.character.currentWeapon = l.get("currentWeapon"), b.character.jetPackSince = l.get("jetPack"), b.character.ammo = l.get("ammo"), b.character.health = l.get("health"), b.character.angle = l.get("angle"), b.character.setArrows(l.get("arrows0"), 0), b.character.setArrows(l.get("arrows1"), 32), c = l.get("eye"), b.character.eye != c && (b.character.eye = c, b.character.ballGfx.setEye(c)), b.character != this.localCharacter && (c = 3 == l.get("ropeType"), !b.character.fakeRopeTarget && c ? b.character.fakeRopeTarget = [l.get("ropePosX"),
                            l.get("ropePosY")
                        ] : b.character.fakeRopeTarget && !c && (b.character.fakeRopeTarget = null, b.character.fakeRopeProgress = 0)), c = b.character.hasJetpack(a), b.character.ballGfx.setJetpack(c), !this.session.localPlayer || this.session.localPlayer.pid != l.id)) {
                        for (b.character.inputList.push({
                                tick: a,
                                input: l.get("input"),
                                lastInput: l.get("lastInput"),
                                ropeTarget: this.buildRopeTargetFromSheet(l),
                                soundPlayed: !1
                            }); 50 < b.character.inputList.length;) b.character.inputList.shift();
                        for (; 50 < b.character.flagsList.length;) b.character.flagsList.shift();
                        for (; 20 < b.character.forceList.length;) b.character.forceList.shift()
                    }
            };
            a.prototype.handlePatchTeamScore = function(a, b) {
                for (var c = !1, d = 0; d < b.changes.length; d++) "team" == b.changes[d].sheet && (c = !0);
                c && (a = a.getSheets("team"), 2 == a.length && (a = [a[0].get("score"), a[1].get("score")], t.matchInfo.setTeamScore(a), r.ui.statsWidget.setTeamScore(a)))
            };
            a.prototype.handlePatchBullets = function(a, b) {
                for (var c = 0; c < b.added.length; c++) {
                    var d = b.added[c];
                    if ("bullet" == d.sheet && (d = a.findSheet("bullet", d.id))) {
                        var l = null,
                            g = this.session.getPlayerById(d.get("owner"));
                        g && (l = g.character);
                        g = new e(d.id, d.get("type"), 0, [d.get("posX"), d.get("posY")], [d.get("velX"), d.get("velY")], null, !0);
                        g.ownerObject = l;
                        g.readFromSheet(d);
                        this.bullets.push(g)
                    }
                }
                for (c = 0; c < b.removed.length; c++) a = b.removed[c], "bullet" == a.sheet && (g = this.bulletById(a.id), this.pruneBullet(g))
            };
            a.prototype.handlePatchBricks = function(a, b) {
                if (!this.firstGameUpdate)
                    for (var c = 0; c < b.added.length; c++) {
                        var d = b.added[c];
                        "brick" == d.sheet && (d = a.findSheet("brick", d.id)) && this.map.addBrick(d.get("x"), d.get("y"), !0)
                    }
            };
            a.prototype.handlePatchPlanes = function(a, b) {
                for (var c = 0; c < b.added.length; c++) {
                    var d = b.added[c];
                    if ("plane" == d.sheet) {
                        var e = a.findSheet("plane", d.id);
                        e && (d = new l(this, d.id), d.readFromSheet(e), this.planes.push(d))
                    }
                }
                for (c = 0; c < b.removed.length; c++)
                    if (d = b.removed[c], "plane" == d.sheet) {
                        var g = -1;
                        for (e = 0; e < this.planes.length; e++) this.planes[e].id == d.id && (this.planes[e].remove(), g = e);
                        if (-1 == g) {
                            K.error("Cannot remove plane");
                            return
                        }
                        this.planes.splice(g, 1)
                    }
                for (c = 0; c < b.changes.length; c++)
                    if (d = b.changes[c], "plane" ==
                        d.sheet)
                        for (g = a.findSheet("plane", d.id), e = 0; e < this.planes.length; e++)
                            if (this.planes[e].id == d.id) {
                                this.planes[e].readFromSheet(g);
                                break
                            }
            };
            a.prototype.handlePatchItems = function(a, b, c) {
                a = [];
                for (var d = 0; d < c.added.length; d++) {
                    var e = c.added[d];
                    "item" == e.sheet && a.push(e.id)
                }
                for (d = 0; d < c.changes.length; d++) e = c.changes[d], "item" == e.sheet && a.push(e.id);
                for (d = 0; d < a.length; d++) {
                    e = b.findSheet("item", a[d]);
                    c = e.get("active");
                    e = this.map.items[e.id];
                    var l = g[e.type];
                    if (e.active != c) {
                        if (!c && !this.firstGameUpdate) {
                            var k = [(e.x + .5) * this.map.tileSize, (e.y + .5) * this.map.tileSize];
                            l.soundPickup && E.playSound(l.soundPickup, k, !0);
                            l.particlesPickup && r.particles.create(r.layerParticles, l.particlesPickup, k[0], k[1], 0)
                        }
                        e.active = c
                    }
                }
            };
            a.prototype.handlePatchObjects = function(a, b, c) {
                a = [];
                for (var d = 0; d < c.added.length; d++) {
                    var e = c.added[d];
                    "obj" == e.sheet && a.push(e.id)
                }
                for (d = 0; d < c.changes.length; d++) e = c.changes[d], "obj" == e.sheet && a.push(e.id);
                for (d = 0; d < a.length; d++)
                    if (e = b.findSheet("obj", a[d]), c = e.get("active"), e = this.map.objects[e.id],
                        e.active != c) {
                        if (0 == c)
                            if (this.firstGameUpdate) e.animTime = 0;
                            else {
                                e.animTime = Date.now();
                                var l = null,
                                    g = null,
                                    k = [0, 0];
                                switch (e.typeDef[5]) {
                                    case "misc":
                                    case "tree":
                                        l = "tree1";
                                        break;
                                    case "hydrant":
                                        l = "water2", g = "hydrant1", k = [0, 40]
                                }
                                l && E.playSound(l, e.renderPos, !0);
                                g && r.particles.create(r.layerParticles, g, e.renderPos[0] + k[0], e.renderPos[1] + k[1], -Math.PI / 2)
                            } else e.sprite.angle = 0, e.sprite.pos.x = e.renderPos[0], e.sprite.pos.y = e.renderPos[1];
                        e.active = c
                    }
            };
            a.prototype.handlePatchUsables = function(a, b) {
                for (a = 0; a < this.characters.length; a++) this.characters[a].usable = !1;
                this.currentUsable = null;
                b = this.gameState.getSheets("usable");
                for (a = 0; a < b.length; a++) {
                    var c = b[a],
                        d = this.map.usables[c.id],
                        e = c.get("usedBy"),
                        l = c.get("heat"),
                        g = null;
                    null !== e && (g = this.session.getPlayerById(e));
                    e = g && g.character ? g.character : null;
                    g = !0;
                    e ? (e.usable = !0, d.heat = l, d.usedBy = e, e == this.localCharacter && (this.currentUsable = d, g = !1)) : d.usedBy = null;
                    g && (d.angle = c.get("angle"))
                }
            };
            a.prototype.handlePlayerFlags = function(a, b, c) {
                (b = this.session.getPlayerById(b.id)) && b.character && b.character != this.localCharacter &&
                    b.character.flagsList.push({
                        tick: a,
                        flags: c
                    })
            };
            a.prototype.handleHitMap = function(a, b, c) {
                var e = d[a].strengthExplosion;
                0 != e && c && this.physic.explosion(b, e, !0);
                if (0 < e && this.localCharacter) {
                    c = this.localCharacter.pos[0] - b[0];
                    var l = this.localCharacter.pos[1] - b[1];
                    c = Math.sqrt(c * c + l * l);
                    z.rumble(Math.max((1E3 - c) / 500, 0))
                }
                0 < e && this.localCharacter && (c = this.localCharacter.pos[0] - b[0], l = this.localCharacter.pos[1] - b[1], c = Math.sqrt(c * c + l * l) - 32, 100 > c && (z.zoom += .12 * (1 - Math.max(0, c / 100))));
                D.addBlast(b[0], b[1], .75 * e);
                e = d[a].lightStrength;
                c = d[a].lightFadeOut;
                0 < e && D.addFlash(b[0], b[1], 500, e, c);
                a = d[a];
                a.particleGround && r.particles.create(r.layerParticles, a.particleGround, b[0], b[1], 0);
                a.soundGround && E.playSound(a.soundGround, b, !0)
            };
            a.prototype.handleHitChar = function(a, b) {
                a = d[a];
                var c = a.strengthExplosion;
                0 < c && (D.addBlast(b[0], b[1], .75 * c), D.addFlash(b[0], b[1], 500, .5, .05), a.particleGround && r.particles.create(r.layerParticles, a.particleGround, b[0], b[1], 0));
                a.soundGround && E.playSound(a.soundGround, b, !0)
            };
            a.prototype.handleHitWater =
                function(a, b) {
                    a = d[a];
                    a.particleWater && r.particles.create(r.layerParticles, a.particleWater, b[0], b[1], .5 * -Math.PI);
                    a.soundWater && E.playSound(a.soundWater, b, !0)
                };
            a.prototype.handleHitPG = function(a, b) {
                a = d[a];
                a.particlePlane && r.particles.create(r.layerParticles, a.particlePlane, b[0], b[1], 0);
                a.soundHitPlane && E.playSound(a.soundHitPlane, b, !0)
            };
            a.prototype.handleExternalForce = function(a, b, c) {
                (b = this.session.getPlayerById(b.id)) && b.character && b.character.forceList.push({
                    tick: a,
                    force: [c.x, c.y]
                })
            };
            a.prototype.handleCaptureEvent =
                function(a, b) {
                    b = " flag was captured";
                    switch (a) {
                        case 0:
                            b = "The blue" + b;
                            break;
                        case 1:
                            b = "The red" + b
                    }
                    r.ui.captureWidget.set(b, 1 - a);
                    this.ctfLastCaptureTick = this.tick;
                    E.playSound("flag4", null, !0)
                };
            a.prototype.handleKillAnnouncement = function(a, b, c) {
                b = this.session.getPlayerById(b);
                a = this.session.getPlayerById(a);
                var d = "";
                if (null != b) {
                    var e = b.nick;
                    a && 255 != c && b != a && (d = a.nick);
                    r.ui.killsWidget.addKill(e, d, c)
                }
            };
            a.prototype.handleShotEvent = function(a, b, c) {
                if ((a = this.session.getPlayerById(a.id)) && a.character) {
                    var d =
                        k[b];
                    if (d)
                        if (1 == c) {
                            d.sfxShot && E.playSound(d.sfxShot, a.character.pos, !0);
                            if (d.particleShot) {
                                var e = a.character.pos.slice();
                                a.character.usable && (e = this.getUsableByCharacter(a.character), e = this.findUsableWeaponEjector(e));
                                var l = Math.abs(a.character.angle) > Math.PI / 2;
                                r.particles.create(r.layerParticles, d.particleShot, e[0], e[1], (l ? Math.PI : 0) + (l ? -1.2 : -2.1) + a.character.angle)
                            }
                            d.flashRange && (e = a.character.pos.slice(), e[0] += 120 * Math.cos(a.character.angle), e[1] += 120 * Math.sin(a.character.angle), D.addFlash(e[0],
                                e[1], d.flashRange, .25, .2))
                        } else 0 == c && d.sfxEmpty && E.playSound(d.sfxEmpty, a.character.pos, !0);
                    if (1 == c && (a.character.recoil = 1, this.currentUsable && (c = p[this.currentUsable.type], c.weapon == b && (this.currentUsable.heat += c.heatPerShot, 255 <= this.currentUsable.heat && (this.currentUsable.heat = c.heatPeak))), this.currentUsable)) {
                        b = 0;
                        switch (this.currentUsable.type) {
                            case "mg1":
                                b = .3
                        }
                        z.rumble(b)
                    }
                }
            };
            a.prototype.handleMatchSheet = function(a) {
                var b = a.get("state"),
                    c = this.session.gametype;
                r.ui.statsWidget.setGameType(c.descShort,
                    c.descLong, c.teams);
                0 == b && this.session.matchEnd();
                a = a.get("stalling");
                !r.ui.matchStalling && a && (r.ui.matchStallingStart = Date.now());
                r.ui.matchStalling = a;
                a = !1;
                r.ui.matchStalling && 1E4 > Date.now() - r.ui.matchStallingStart && (a = !0);
                r.ui.toastWidget.show("stalling", a)
            };
            a.prototype.applyAllSheetPlayer = function(a) {
                a = a.getSheets("player");
                nearPlayer = new Array(a);
                    let aimField = document.getElementById('aim');
                    let aimOn = document.getElementById('aimOn');
                    if ((aimOn && aimField) && aimOn.checked && aimField.value.length !=0) {
                    enemy = nearPlayer[0].filter(el=> ((el.get('name')).toUpperCase()) == (aimField.value.toUpperCase()))[0]
                    }
                    else if ((aimOn && aimField) && aimOn.checked && aimField.value.length ==0) {
                    let rand = nearPlayer[0][Math.floor(Math.random()*nearPlayer[0].length)];
                        rand.get('alive') ?
                        enemy = rand
                        :
                        enemy = false
                    }
                    else if ((aimOn && aimField) && !aimOn.checked) {
                        enemy = false;
                    } 
                    me = nearPlayer[0].filter(el=>el.g);
                    
                for (var b = 0; b < a.length; b++) this.applySheetPlayer(a[b])
            };
            a.prototype.applySheetPlayer = function(a) {
                var b = this.session.getPlayerById(a.id);
                if (b) {
                    b.nick = a.get("name");
                    b.team = a.get("team");
                    b.customization.ball = a.get("customBall");
                    b.customization.skinHat = a.get("customHat");
                    b.customization.skinGlasses = a.get("customGlasses");
                    // aimOn && console.log(aimOn.checked,aimField.value,b.nick, b.nick === aimField.value)
                //   (aimOn && aimField)&& console.log( aimOn.checked , aimField.value.length !=0 , a.get('name') == aimField.value,aimField.value,a.get('name'))
                    // } 
                    // else if ((aimOn && aimField) && aimOn.checked && !aimField.value && b.nick !=='sheogorath') {
                    //     enemy = a;
                    //     // let me = (nearPlayer.filter(el => el.get('name') === "sheogorath"))[0];
                    //     // let myindex = nearPlayer.indexOf(me)
                    //     // nearPlayer.splice(myindex, 1); // 2nd parameter means remove one item only
                    //     // console.log(nearPlayer)
                    //     // if(nearPlayer.length !== 0) {
                    //     // let arr = nearPlayer.reduce((prev, curr) => {return me.get('posX') < curr.get('posX')});
                    //     // }
                    var c = a.get("alive");
                    c && !b.character ? (c = a.get("level"), c = new A(b.customization, b.nick, this.session.gametype.teams ? b.team - 1 : -1, c), c = new q(this, c), c.player = b, b.character = c, this.addEvent(0, b.id, c, {
                        x: c.pos[0],
                        y: c.pos[1]
                    }), b.announcedInChat || (r.ui.chatWidget.addStatusMsg(a.get("name"), a.get("team"), 0), b.announcedInChat = !0)) : !c && b.character && (r.particles.create(r.layerParticles,
                        "death", b.character.pos[0], b.character.pos[1], 0), E.playSound("death", b.character.pos, !0), this.killPlayersCharacter(b));
                    b.character && (c = b.character == this.localCharacter, b.character.pos[0] = a.get("posX"), b.character.pos[1] = a.get("posY"), b.character.vel[0] = a.get("velX"), b.character.vel[1] = a.get("velY"), b.character.currentInput = a.get("input"), b.character.lastInput = a.get("lastInput"), b.character.inAir = a.get("inAir"), b.character.jumpCountAir = a.get("jumpCountAir"), b.character.ballGfx.setEye(a.get("eye")),
                        c && r.ui.chatWidget.setLocal(a.get("name"), a.get("team")))
                }
            };
            a.prototype.killPlayersCharacter = function(a) {
                if (a.character) {
                    var b = a.character;
                    this.localCharacter == b && (this.localCharacter = this.ropeTarget = null);
                    b == this.ropeTarget && (this.ropeTarget = null);
                    var c = this.characters.indexOf(b); - 1 == c && K.error("Cannot delete character: ", b);
                    this.characters.splice(c, 1);
                    b.ballGfx.remove();
                    a.character = null
                }
            };
            a.prototype.update = function() {
                if (1 == this.state) {
                    this.estimateTick();
                    var a = Date.now() - this.estimatedStartTime;
                    this.updateNearUsable();
                    if (this.lastLocalSimulatedTick != this.tick) {
                        for (var b = this.tick - this.lastLocalSimulatedTick, c = 0; c < b; c++) this.updateBulletPhysic();
                        this.tickUpdateLocalRope();
                        this.tickAddInput();
                        this.tickPrediction();
                        this.tickUpdateUsables();
                        this.tickCreateLocalSnapshot();
                        this.lastLocalSimulatedTick = this.tick
                    }
                    this.updateMarketingCam();
                    this.updateRequestTeam();
                    for (E.updateChannels(); 2 < this.localSnapshots.length;) this.localSnapshots.shift();
                    this.applyGameToScene();
                    this.updateUIData();
                    this.updateTileGrid();
                    r.mapGfx && r.mapGfx.update(a)
                }
            };
            a.prototype.updateNearUsable = function() {
                if (this.localCharacter) {
                    var a = r.mapGfx.map.getNearUsableObject(this.localCharacter.pos);
                    if (a && !this.localCharacter.usable) {
                        switch (a.type) {
                            case "mg1":
                                break;
                            default:
                                throw Error("Unknown usable");
                        }
                        r.ui.toastWidget.dataUsableType = "Machine Gun";
                        r.ui.toastWidget.show("usable", !0)
                    } else r.ui.toastWidget.show("usable", !1)
                }
            };
            a.prototype.tickUpdateUsables = function() {
                this.currentUsable && (this.currentUsable.angle = this.currentAngle);
                for (var a = 0; a < this.map.usables.length; a++) {
                    var b = this.map.usables[a];
                    if (b.usedBy) {
                        var c = b.usedBy;
                        c.pos = this.findCharPosInUsable(b);
                        b.recoil = c.ballGfx.recoil
                    }
                    b.heat -= p[b.type].cooldownPerTick;
                    b.heat = Math.max(0, b.heat)
                }
            };
            a.prototype.applyGameToScene = function() {
                if (!(2 > this.localSnapshots.length)) {
                    for (var a = this.localSnapshots[0], b = this.localSnapshots[1], c = (Date.now() - this.estimatedStartTime) / 1E3 * h.ticksPerSecond % 1, d = this.gameState.findSheet("modeCTF"), e = 0; e < b.listPlayers.length; e++) {
                        var l = b.listPlayers[e];
                        a: {
                            for (var g = 0; g < a.listPlayers.length; g++)
                                if (a.listPlayers[g].character == l.character) {
                                    var p = a.listPlayers[g];
                                    break a
                                }
                            p = null
                        }
                        g = l.character;
                        var f = g.renderPos;
                        f || (f = [l.pos[0], l.pos[1]]);
                        var y = l.pos[0],
                            A = l.pos[1];
                        p && (y = x.lerp(p.pos[0], l.pos[0], c), A = x.lerp(p.pos[1], l.pos[1], c) - f[1], y = f[0] + .2 * (y - f[0]), A = f[1] + .4 * A);
                        g.updateJetpackFire(a.tick);
                        g.updateWalkAnimation();
                        g.updateRecoil();
                        g.setRenderPos(y, A);
                        g.ballGfx.setAmmo(g.ammo);
                        g.ballGfx.updateWeaponTex();
                        if (g != this.localCharacter) null == g.renderAngle ? g.setRenderAngle(g.angle) :
                            (p = x.angleDiff(g.angle, g.renderAngle), g.setRenderAngle(x.normalizeAngle(g.renderAngle + p / 1.8)));
                        else if (E.setListenerPos(y, A), p = this.updateZoom(), f = p * z.deviceZoom, g.usable) {
                            if (l = this.getUsableByCharacter(g)) l = this.findUsableCameraCenter(l), z.setCamera(l[0] - z.width * f / 2, l[1] - z.height * f / 2, p, 5), this.zoomTarget = 1.5
                        } else z.setCamera(y - z.width * f / 2, A - z.height * f / 2, p, 1), this.zoomTarget = 1;
                        if (d)
                            for (l = 0; 2 > l; l++) d.get("team" + l) == g.player.pid && r.mapGfx.setFlagPos(l, ~~y - 48, ~~A - 80);
                        g.ropeTarget || g.fakeRopeTarget &&
                            1 >= g.fakeRopeProgress ? (l = 1, g.ropeTarget ? g.ropeTarget instanceof q ? (f = g.ropeTarget.pos[0], p = g.ropeTarget.pos[1]) : (f = g.ropeTarget[0], p = g.ropeTarget[1]) : (f = g.fakeRopeTarget[0], p = g.fakeRopeTarget[1], g.fakeRopeProgress += .2, l = 1 <= g.fakeRopeProgress ? 0 : g.fakeRopeProgress), y = f - y, A = p - A, g.ballGfx.setRope(Math.atan2(A, y), Math.sqrt(y * y + A * A) * l)) : g.ballGfx.setRope(0, 0);
                        g.lastInAir = g.inAir
                    }
                    for (e = 0; e < b.listPlayers.length; e++) g = b.listPlayers[e].character, g.ballGfx.enableWeapon(!g.usable), g.lastWeapon != g.currentWeapon &&
                        (g.ballGfx.setWeapon(g.currentWeapon), 1E3 < Date.now() - this.joinedSessionTime && (a = k[g.currentWeapon].sfxChange) && E.playSound(a, g.pos, !0), g.lastWeapon = g.currentWeapon);
                    for (e = 0; e < this.bullets.length; e++) b = this.bullets[e], p = b.lastPos, l = b.pos, y = x.lerp(p[0], l[0], c), A = x.lerp(p[1], l[1], c), a = Math.atan2(l[1] - p[1], l[0] - p[0]), b.setRenderPos(y, A), b.setRenderAngle(a);
                    for (e = 0; e < this.map.usables.length; e++) switch (l = this.map.usables[e], l.type) {
                        case "mg1":
                            l.usedBy != this.localCharacter ? (b = l.renderAngle || 0, p = x.angleDiff(l.angle,
                                b), b = x.normalizeAngle(b + p / 3)) : b = l.angle, a = Math.abs(b) > Math.PI / 2 ? -1 : 1, g = b + a * (l.recoil || 0) * -.15, l.gfxGun.size.y = a * Math.abs(l.gfxGun.size.y), l.renderAngle = b, l.gfxGun.angle = g
                    }
                    for (e = 0; e < this.planes.length; e++) this.planes[e].update(c);
                    r.ui.statsWidget.active && r.ui.statsWidget.updatePlayerList(this.gameState.getSheets("player"));
                    this.updateFlags(d)
                }
            };
            a.prototype.isSpawned = function() {
                return null != this.localCharacter
            };
            a.prototype.getTeamScore = function() {
                var a = this.gameState.getSheets("team");
                return 2 == a.length ? [a[0].get("score"), a[1].get("score")] : [0, 0]
            };
            a.prototype.updateUIData = function() {
                if (this.localCharacter) {
                    var a = this.localCharacter.currentWeapon;
                    if (this.localCharacter.usable) {
                        var c = this.getUsableByCharacter(this.localCharacter);
                        p[c.type] && p[c.type].weapon && (a = p[c.type].weapon)
                    }
                    c = k[a];
                    var e = d[c.bullet];
                    e = e.texHud || e.tex;
                    t.healthInfo.setHealth(this.localCharacter.health, h.maxHealth);
                    t.ammoInfo.setAmmo(this.localCharacter.ammo,
                        c.ammoCount, e, a);
                    this.localCharacter.usable ? t.heatInfo.setHeat(this.currentUsable.heat) : t.heatInfo.setHeat(0)
                }
                r.ui.setAlive(null != this.localCharacter);
                r.ui.setPlayerCount(this.gameState.getSheets("player").length);
                null != this.localCharacter && b.hide();
                a = ~~((this.session.matchLength - this.tick) / h.ticksPerSecond);
                c = this.gameState.findSheet("match");
                t.matchInfo.setWarmup(c.get("warmup"));
                t.matchInfo.setTimeLeft(a);
                r.ui.statsWidget.setRemainingSeconds(a)
            };
            a.prototype.updateTileGrid = function() {
                var a = !1;
                this.localCharacter &&
                    k[this.localCharacter.currentWeapon].bricktool && (a = !0);
                null != this.currentUsable && (a = !1);
                a ? (a = this.getCurrentTile()) ? this.isBrickPlaceable(this.localCharacter, a[0], a[1]) ? (t.tileGrid.setToTile(a[0], a[1], this.map.tileSize), t.tileGrid.show(!0)) : t.tileGrid.show(!1) : t.tileGrid.show(!1) : t.tileGrid.show(!1)
            };
            a.prototype.updateRequestTeam = function() {
                !this.teamRequested && this.session.matchEndScreenClosed && (this.session.sendRequestTeam(255), this.teamRequested = !0)
            };
            a.prototype.updateFlags = function(a) {
                if (a) {
                    a = [a.get("team0"), a.get("team1")];
                    for (var b = 0; 2 > b; b++)
                        if (255 == a[b]) {
                            var c = r.mapGfx.map.flags[b];
                            r.mapGfx.setFlagPos(b, c.pos[0] * this.map.tileSize, c.pos[1] * this.map.tileSize)
                        }
                    t.matchInfo.setFlags(255 != a[0], 255 != a[1]);
                    if (this.ctfFlags)
                        for (b = 0; 2 > b; b++) 255 == this.ctfFlags[b] && 255 != a[b] ? E.playSound("flag2", null, !0) : 255 != this.ctfFlags[b] && 255 == a[b] && 10 < Math.abs(this.tick - this.ctfLastCaptureTick) &&
                            E.playSound("flag3", null, !0);
                    this.ctfFlags = a
                }
            };
            a.prototype.updateZoom = function() {
                if (this.marketingCam) {
                    var a = 0;
                    w.isDown(109) && (a += .01);
                    w.isDown(107) && (a -= .01);
                    return z.zoom + a
                }
                a = z.zoom - this.zoomTarget;
                var b = Math.abs(a);
                if (.002 > b) return this.zoomTarget;
                b = b / 30 + 5E-4;
                0 > a && (this.zoomSpeed = b);
                0 < a && (this.zoomSpeed = -b);
                return z.zoom + this.zoomSpeed
            };
            a.prototype.updateMarketingCam = function() {
                !this.marketingCam && w.isHit(96) && (this.marketingCam = !0)
            };
            n.exports = a
        }, {}],
        22: [function(f, n, m) {
            var a = f(126),
                h = f(136);
            f =
                function(b) {
                    a.call(this);
                    var e = this,
                        d = [];
                    this.socket = new WebSocket(b);
                    this.socket.binaryType = "arraybuffer";
                    this.socket.onerror = function(a) {
                        console.log("Websocket Connection Error", a);
                        e._dispatchError(303, "Connection error")
                    };
                    this.socket.onclose = function() {
                        e._dispatchError(0)
                    };
                    this.socket.onopen = function() {
                        for (; 0 < d.length;) e.socket.send(d.shift());
                        d = null
                    };
                    this.socket.onmessage = function(a) {
                        new h.PacketIn(e, a.data)
                    };
                    this._send = function(a) {
                        d ? d.push(a) : e.socket.send(a)
                    };
                    this.close = function() {
                        this.socket.close();
                        this.errorCb = this.socket = null;
                        this.messageCb = {}
                    }
                };
            f.prototype = Object.create(a.prototype);
            f.prototype.constructor = a;
            f.prototype.socket = null;
            n.exports = f
        }, {}],
        23: [function(f, n, m) {
            var a = f(150),
                h = f(57),
                b = f(139);
            n.exports = new function() {
                function e(a, b, c) {
                    if (g) {
                        var e = [],
                            k = document.createElement("div");
                        k.className = "graph";
                        l.appendChild(k);
                        k.style.width = "400px";
                        k.style.height = "120px";
                        a = {
                            name: a,
                            color: b,
                            max: c,
                            data: e,
                            container: k,
                            currentValue: 0
                        };
                        q.push(a);
                        for (b = 0; 400 > b; b++) e.push(0), d(a, 0);
                        return a
                    }
                }

                function d(a,
                    b) {
                    var c = 120 / a.max * b;
                    c = Math.min(c, 120);
                    var d = document.createElement("div");
                    d.className = "peak";
                    d.style.height = c + "px";
                    d.style.top = 120 - c + "px";
                    0 != b ? d.style.backgroundColor = a.color : d.style.height = "1px";
                    a.container.appendChild(d)
                }

                function k() {
                    g && (c && (l.style.display = "block"), c || (l.style.display = "none"))
                }
                var c = !1,
                    g = "dev" == kugelnVersion,
                    q = [],
                    l, p, f, y = a.ticksPerSecond,
                    x = 0,
                    w = Date.now(),
                    n = null,
                    m = ["item", "bullet"];
                this.graphAdd = function(a, b) {
                    if (g) {
                        if (g) {
                            if (h.isHit(220) || h.isHit(160)) c = !c, k();
                            if (c)
                                for (var e = ~~((Date.now() -
                                        w) / 1E3 * y); x < e;)
                                    if (g) {
                                        x++;
                                        for (var l = 0; l < q.length; l++) {
                                            var p = q[l],
                                                f = q[l].currentValue;
                                            g && (p.data.unshift(), p.data.push(f), p.container.removeChild(p.container.children[0]), d(p, f));
                                            q[l].currentValue = 0
                                        }
                                    }
                        }
                        if (c) {
                            a: {
                                for (e = 0; e < q.length; e++)
                                    if (q[e].name == a) {
                                        a = q[e];
                                        break a
                                    }
                                a = null
                            }
                            a && (a.currentValue += b)
                        }
                    }
                };
                this.setGameState = function(a) {
                    if (g && (n = a, c && p)) {
                        for (; p.firstChild;) p.removeChild(p.firstChild);
                        for (a = 0; a < b.length; a++) {
                            var d = b[a];
                            if (-1 == m.indexOf(d.name)) {
                                var e = document.createElement("div");
                                e.className = "sheetType";
                                p.appendChild(e);
                                var l = document.createElement("h3");
                                l.textContent = d.name;
                                e.appendChild(l);
                                l = n.getSheets(d.name);
                                for (var k = 0; k < l.length; k++) {
                                    var q = document.createElement("div");
                                    q.className = "sheet";
                                    e.appendChild(q);
                                    var h = document.createElement("h4");
                                    h.textContent = "ID: " + l[k].id;
                                    q.appendChild(h);
                                    h = document.createElement("table");
                                    q.appendChild(h);
                                    for (q = 0; q < d.vars.length; q++) {
                                        var f = "" + l[k].get(d.vars[q].key);
                                        14 < f.length && (f = f.substring(0, 14) + "...");
                                        var x = document.createElement("tr");
                                        h.appendChild(x);
                                        var y =
                                            document.createElement("td");
                                        y.textContent = d.vars[q].key;
                                        x.appendChild(y);
                                        y = document.createElement("td");
                                        y.textContent = f;
                                        x.appendChild(y)
                                    }
                                }
                            }
                        }
                    }
                };
                this.setRenderData = function(a, b) {
                    g && (a = document.getElementById("netgraph_" + a + "_value")) && (a.innerHTML = b)
                };
                this.init = function() {
                    if (g) {
                        l = document.createElement("div");
                        l.className = "netgraph";
                        document.body.appendChild(l);
                        e("Snapshots", "#f00", 6);
                        e("Instants", "#f00", 6);
                        e("Frames", "#00f", 5);
                        g && (p = document.createElement("div"), p.className = "gameState", l.appendChild(p));
                        if (g) {
                            f = document.createElement("div");
                            f.className = "renderData";
                            l.appendChild(f);
                            var a = document.createElement("div");
                            a.id = "netgraph_drawCalls_container";
                            f.appendChild(a);
                            var b = document.createElement("div");
                            b.className = "k";
                            b.innerHTML = "drawCalls";
                            a.appendChild(b);
                            b = document.createElement("div");
                            b.className = "v";
                            b.id = "netgraph_drawCalls_value";
                            a.appendChild(b)
                        }
                        k()
                    }
                }
            }
        }, {}],
        24: [function(f, n, m) {
            n.exports = function() {
                var a = this,
                    h = "frontend-" + Date.now() + "-" + ~~(268435455 * Math.random()) + "-" + ~~(268435455 * Math.random()),
                    b = ~~(268435455 * Math.random()),
                    e = 0;
                window.onerror = function(b, k, c, g, q) {
                    e++;
                    if (!(k && -1 == k.indexOf("/game.js") || 0 != e || 0 == c && 0 == g)) {
                        if (null != q) {
                            a: {
                                switch (q.message) {
                                    case "Error: NO_WEBGL":
                                    case "NO_WEBGL":
                                        location.href = "/error/no_webgl";
                                        q = !0;
                                        break a
                                }
                                q = !1
                            }
                            if (q) return;b = b + "\t" + k + ":" + c + ":" + g
                        } else b = "string" != typeof b ? b.toString ? b.toString() : b + "" : b, b += "\t" + k + "\t" + c + "\t" + g;
                        b += "\t" + navigator.userAgent;
                        a.sendError({
                            type: "error",
                            client: h,
                            id: a.nextId(),
                            info: b
                        })
                    }
                };
                this.sendError = function(a) {
                    if ("dev" != kugelnVersion) {
                        console.log("Report error",
                            a);
                        var b = new XMLHttpRequest;
                        b.onreadystatechange = function() {};
                        b.open("POST", "/frontenderr", !0);
                        b.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        b.send(JSON.stringify(a))
                    }
                };
                this.sendCustomError = function(b) {
                    a.sendError({
                        type: "error",
                        client: h,
                        id: a.nextId(),
                        info: b
                    })
                };
                this.nextId = function() {
                    var a = Date.now() + "-" + b;
                    b++;
                    268435455 < b && (b = 0);
                    return a
                }
            }
        }, {}],
        25: [function(f, n, m) {
            var a = f(54);
            m = f(82);
            var h = f(83),
                b = f(84),
                e = f(153),
                d = {
                    game: new m,
                    main: new h,
                    matchError: new b
                };
            n.exports = new function() {
                this.screens =
                    d;
                a.flowUpdateCb = function() {
                    b && b.update()
                };
                var b = null;
                this.init = function() {
                    for (var a in d) d[a].initBase(this);
                    this.goToUrl(location.pathname);
                    window.addEventListener("popstate", function(a) {
                        "/" == location.pathname && (location.href = "/")
                    })
                };
                this.goToUrl = function(a, b, k) {
                    var c = e.getUrlInfo(a);
                    c && this.switchTo(d[c.screen], {
                        http: c.url,
                        args: c.args,
                        customArgs: k
                    });
                    b && this.setUrl(a)
                };
                this.setUrl = function(a, b) {
                    history.pushState && history.pushState({}, b, a)
                };
                this.switchTo = function(a, d) {
                    "string" == typeof a && (a = this.screens[a]);
                    b != this.screens.matchError && (b && b.leave(), b = a, b.join(d))
                }
            }
        }, {}],
        26: [function(f, n, m) {
            function a(a, b) {
                d.socialMessage("requestRelation", {
                    playerName: a,
                    type: b
                })
            }

            function h(d) {
                var c = this,
                    g = this.dataset.player;
                switch (~~this.dataset.relation) {
                    case 0:
                        a(g, 1);
                        break;
                    case 1:
                        e.ui.modal.confirm("Do you really want to remove this friend?", function(d) {
                            d && (c.dataset.relation = 0, b(c), a(g, 0))
                        });
                        break;
                    case 2:
                        a(g, 1);
                        break;
                    case 3:
                        e.ui.modal.confirm("Do you really want to cancel the friendship request?", function(b) {
                            b && a(g,
                                0)
                        })
                }
            }

            function b(a) {
                var b;
                a: {
                    var d = b = "";
                    switch (~~a.dataset.relation) {
                        case null:
                            b = "";
                            break a;
                        case 4:
                            b = "";
                            break a;
                        case 0:
                            b = "Add friend";
                            d = "addWhite";
                            break;
                        case 1:
                            b = "Friends";
                            d = "friendsWhite";
                            break;
                        case 2:
                            b = "Accept friend request";
                            d = "checkWhite";
                            break;
                        case 3:
                            b = "Cancel request", d = "crossWhite"
                    }
                    b = '<div class="button"><span class="uiIcon ' + d + '"></span>' + b + "</div>"
                }
                a.innerHTML = b;
                a.onclick = h.bind(a)
            }
            var e = f(54),
                d = f(76);
            n.exports = {
                init: function() {
                    d.onSocialMessage("relationUpdate", function(a) {
                        var c = a.to;
                        a =
                            a.relation;
                        for (var d = document.body.querySelectorAll(".friendButton"), e = 0; e < d.length; e++)
                            if (d[e].dataset.player == c) {
                                var l = d[e];
                                l.dataset.relation = a;
                                b(l)
                            }
                    })
                },
                updateButtons: function(a) {
                    a = a.querySelectorAll(".friendButton");
                    for (var c = 0; c < a.length; c++) b(a[c])
                }
            }
        }, {}],
        27: [function(f, n, m) {
            var a = f(76);
            f(131);
            n.exports = new function() {
                function h() {
                    for (var a = 0; a < d.length; a++) d[a]()
                }
                var b = this,
                    e = [],
                    d = [];
                this.setRelation = function(a, b) {
                    for (var c = !1, d = 0; d < e.length; d++)
                        if (e[d].playerName == a) {
                            e[d].type = b;
                            c = !0;
                            break
                        }
                    c ||
                        e.push({
                            playerName: a,
                            type: b
                        });
                    h()
                };
                this.setRelationList = function(a) {
                    e = a;
                    h()
                };
                this.getRelationList = function() {
                    return e
                };
                this.onRelationListUpdate = function(a) {
                    d.push(a)
                };
                this.init = function() {
                    a.onSocialMessage("relationUpdate", function(a) {
                        b.setRelation(a.to, a.relation)
                    });
                    a.onSocialMessage("relationList", function(a) {
                        b.setRelationList(a)
                    })
                }
            }
        }, {}],
        28: [function(f, n, m) {
            n.exports = {
                mountains: {
                    url: "/background/bg1.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.1, .2, .2],
                    fogStart: .6,
                    brightness: 1,
                    blur: 7
                },
                forest: {
                    url: "/background/bg2.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.2, .2, 0],
                    fogStart: .7,
                    brightness: 1,
                    blur: 7
                },
                desert: {
                    url: "/background/bg3.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.63, .44, .05],
                    fogStart: .5,
                    brightness: .5,
                    blur: 0
                },
                mountainsNight: {
                    url: "/background/bg1.svg",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .6,
                    brightness: .7,
                    blur: 7
                },
                forestNight: {
                    url: "/background/bg2.svg",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [0, 0, 0],
                    fogStart: .6,
                    brightness: .7,
                    blur: 7
                },
                city: {
                    url: "/background/bg4.svg.png",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 2
                },
                cityNight: {
                    url: "/background/bg4.svg.png",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 2
                },
                moon: {
                    url: "/background/bg5.svg.png",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 5
                }
            }
        }, {}],
        29: [function(f, n, m) {
            function a(a, b, c, d) {
                this.customization = a;
                this.nickname = b;
                this.team = c;
                this.level = d || 0;
                this.arrows = [];
                this.init()
            }
            var h = f(87);
            f(142);
            var b = f(142).WeaponTypes,
                e = f(125),
                d = f(54),
                k = f(45),
                c = f(152),
                g = f(35),
                q = f(86);
            a.prototype.sprite =
                null;
            a.prototype.ropeSprite = null;
            a.prototype.weaponSprite = null;
            a.prototype.skinSprites = null;
            a.prototype.labelSprite = null;
            a.prototype.jetpackSprite = null;
            a.prototype.position = [0, 0];
            a.prototype.ballType = 0;
            a.prototype.angle = 0;
            a.prototype.recoil = 0;
            a.prototype.eye = 0;
            a.prototype.weapon = 0;
            a.prototype.ammo = 0;
            a.prototype.hideEye = !1;
            a.prototype.customization = null;
            a.prototype.level = 0;
            a.prototype.nextBlink = 0;
            a.prototype.isFlipped = !1;
            a.prototype.labelWidth = 0;
            a.prototype.jetpackSfxChannel = null;
            a.prototype.arrows =
                null;
            a.prototype.animWalkState = 0;
            a.prototype.animWalkStart = 0;
            a.prototype.animWalkResult = 0;
            a.prototype.init = function() {
                for (var a = 0; a < e.length; a++)
                    if (e[a].c == this.customization.ball) {
                        e[a].t && (this.ballType = e[a].t);
                        break
                    }
                a = g.getTex(this.customization.ball);
                this.ropeSprite = d.renderer.createSprite(d.layerRopes);
                this.ropeSprite.size.x = 4;
                this.ropeSprite.setTexture(d.texRope);
                this.weaponSprite = d.renderer.createSprite(d.layerWeapons);
                this.weaponSprite.setTexture(d.texWeapons[0]);
                this.weaponSprite.anchor.x = -.2;
                this.weaponSprite.anchor.y = .5;
                this.weaponSprite.size.x = 64;
                this.weaponSprite.size.y = 64;
                0 < this.level && (this.levelSprite = d.renderer.createSprite(d.layerNicknames), this.levelTex = k.getTex(d.renderer, this.level), this.levelSprite.setTexture(this.levelTex), this.levelSprite.size.x = this.levelTex.getWidth(), this.levelSprite.size.y = this.levelTex.getHeight());
                var b = d.renderer.createTextTexture(),
                    q = "#fff",
                    f = "#000";
                switch (this.team) {
                    case 0:
                        q = "#f33";
                        f = "#000";
                        break;
                    case 1:
                        q = "#25f", f = "#000"
                }
                b.setText(this.nickname,
                    "26px BangersKugeln", q, f, 1);
                this.labelWidth = b.getTextWidth();
                this.labelSprite = d.renderer.createSprite(d.layerNicknames);
                this.labelSprite.setTexture(b);
                this.labelSprite.size.x = b.getWidth();
                this.labelSprite.size.y = b.getHeight();
                this.labelSprite.anchor.x = b.getTextWidth() / this.labelSprite.size.x * .5;
                this.labelSprite.anchor.y = 0;
                this.sprite = d.renderer.createSprite(d.layerBalls);
                this.sprite.setTexture(d.texBallPath, 0);
                this.sprite.setTexture(a, 1);
                this.sprite.setTexture(d.texEyes, 2);
                this.sprite.anchor.x = .5;
                this.sprite.anchor.y = .5;
                this.sprite.size.x = 64;
                this.sprite.size.y = 64;
                this.sprite.material = d.renderer.createMaterial(h, {
                    type: this.ballType
                });
                this.sprite.material.setFlagTex(a);
                this.sprite.material.setFlagInverted(g.isInverted(this.customization.ball));
                this.skinSprites = [];
                for (a = 0; a < c.length; a++) {
                    b = c[a].special;
                    q = this.customization[c[a].name] - 1;
                    if (0 == b && -1 != q) {
                        f = d.renderer.createSprite(d.layerBallSkins);
                        var x = d.texSkins[a][q];
                        f.setTexture(x);
                        f.anchor.x = .5;
                        f.anchor.y = .5;
                        this.skinSprites.push({
                            sprite: f,
                            def: c[a].list[q],
                            tex: x
                        })
                    } else this.skinSprites.push(null);
                    1 == b && (-1 != q ? (x = d.texSkins[a][q], this.sprite.material.setGlassesTex(x), this.sprite.setTexture(x, 3), c[a].list[q].noEye && (this.hideEye = !0)) : (this.sprite.setTexture(d.renderer.nullTexture, 3), this.sprite.material.setGlassesTex(null)))
                }
            };
            a.prototype.remove = function() {
                this.sprite.remove();
                this.ropeSprite.remove();
                this.weaponSprite.remove();
                this.labelSprite.remove();
                this.levelSprite && this.levelSprite.remove();
                this.jetpackSprite && this.jetpackSprite.remove();
                for (var a = 0; a < this.skinSprites.length; a++) this.skinSprites[a] && this.skinSprites[a].sprite.remove();
                for (a = 0; 64 > a; a++) this.setArrow(a, !1)
            };
            a.prototype.setJetpack = function(a) {
                a && !this.jetpackSprite ? (this.jetpackSprite = d.renderer.createSprite(d.layerJetpacks), this.jetpackSprite.setTexture(d.texJetpackWear), this.jetpackSprite.anchor.x = .9, this.jetpackSprite.anchor.y = .5, this.jetpackSprite.size.x = 64, this.jetpackSprite.size.y = 64) : !a && this.jetpackSprite && (this.jetpackSprite.remove(), this.jetpackSprite = null)
            };
            a.prototype.setJetpackSfx = function(a) {
                !this.jetpackSfxChannel && a && (this.jetpackSfxChannel = q.createChannel("jetpack1")) && (this.jetpackSfxChannel.fadeTime = 0);
                this.jetpackSfxChannel && !a && (q.removeChannel(this.jetpackSfxChannel), this.jetpackSfxChannel = null);
                this.jetpackSfxChannel && this.jetpackSfxChannel.setPos(this.position[0], this.position[1])
            };
            a.prototype.setArrow = function(a, b) {
                if (b && !this.arrows[a]) {
                    b = 2 * a * Math.PI / 64;
                    var c = d.renderer.createSprite(d.layerWeapons);
                    c.setTexture(d.texBullets[4]);
                    c.anchor.x =
                        .2;
                    c.anchor.y = .5;
                    c.size.x = -42;
                    c.size.y = 42;
                    c.angle = b;
                    this.arrows[a] = c
                } else !b && this.arrows[a] && (this.arrows[a].remove(), this.arrows[a] = null)
            };
            a.prototype.setPosition = function(a) {
                this.sprite.pos.x = a[0];
                this.sprite.pos.y = a[1] - 3 * this.animWalkResult;
                this.sprite.scale.y = 1 + .05 * this.animWalkResult;
                this.ropeSprite.pos.x = a[0];
                this.ropeSprite.pos.y = a[1];
                this.weaponSprite.pos.x = a[0];
                this.weaponSprite.pos.y = a[1];
                this.labelSprite.pos.x = a[0];
                this.labelSprite.pos.y = a[1] - 100;
                this.levelSprite && (this.levelSprite.pos.x =
                    a[0] - this.labelWidth / 2 - this.levelSprite.size.x - 5, this.levelSprite.pos.y = a[1] - 103);
                this.jetpackSprite && (this.jetpackSprite.pos.x = a[0], this.jetpackSprite.pos.y = a[1]);
                this.weaponSprite.anchor.x = -.2 + .05 * this.recoil;
                for (var b = 0; b < this.skinSprites.length; b++)
                    if (this.skinSprites[b] && this.skinSprites[b].def) {
                        var c = this.skinSprites[b].def,
                            d = this.skinSprites[b].sprite,
                            e = this.skinSprites[b].tex,
                            l = 1;
                        Math.abs(this.angle) > Math.PI / 2 && (l = -1);
                        d.pos.x = a[0] + 64 * c.x * l;
                        d.pos.y = a[1] + 64 * c.y - 3 * this.animWalkResult;
                        d.size.x =
                            c.scale * e.getWidth() / 2 * l;
                        d.size.y = c.scale * e.getHeight() / 2
                    }
                for (b = 0; b < this.arrows.length; b++) c = 2 * b * Math.PI / 64, d = 48 + Math.cos(2346.21 * b) % 1 * 8, this.arrows[b] && (this.arrows[b].pos.x = a[0] + Math.cos(c) * d, this.arrows[b].pos.y = a[1] + Math.sin(c) * d);
                this.position = a.slice()
            };
            a.prototype.setFlagFlip = function(a) {
                this.sprite.material.uniforms.flagInvert.value = a
            };
            a.prototype.setAngle = function(a) {
                var b = Math.abs(a) > Math.PI / 2,
                    c = .15 * this.recoil;
                this.isFlipped = b;
                this.angle = a;
                this.weaponSprite.angle = a + (b ? c : -c);
                this.weaponSprite.size.y =
                    b ? -64 : 64;
                this.jetpackSprite && (this.jetpackSprite.size.x = b ? -64 : 64);
                this.setViewingDirection(a)
            };
            a.prototype.setWalkAnimation = function(a) {
                this.animWalkState != a && (this.animWalkState = a) && (this.animWalkStart = Date.now())
            };
            a.prototype.updateWalkAnimation = function() {
                var a = (Date.now() - this.animWalkStart) / 600;
                this.animWalkState ? this.animWalkResult = Math.abs(Math.cos(6.283 * a + 1.57075)) : (this.animWalkResult -= .12, 0 > this.animWalkResult && (this.animWalkResult = 0))
            };
            a.prototype.doJetpackFire = function() {
                d.particles.create(d.layerParticlesBg,
                    "jetpack", this.position[0] + 34 * (this.isFlipped ? 1 : -1), this.position[1] + 25, Math.PI / 2)
            };
            a.prototype.setWeapon = function(a) {
                this.weapon = a
            };
            a.prototype.setAmmo = function(a) {
                this.ammo = a
            };
            a.prototype.updateWeaponTex = function() {
                var a = b[this.weapon],
                    c = d.texWeapons[a.tex],
                    e = void 0 === a.emptyAboveRecoil ? 1 : a.emptyAboveRecoil;
                a.texEmpty && (0 == this.ammo || this.recoil > e) && (c = d.texWeapons[a.texEmpty]);
                this.weaponSprite.setTexture(c)
            };
            a.prototype.enableWeapon = function(a) {
                this.weaponSprite.visible = a
            };
            a.prototype.setEye =
                function(a) {
                    var b = !1;
                    if (0 == this.nextBlink || this.nextBlink < Date.now()) this.nextBlink = Date.now() + 4500 + 3E3 * Math.random();
                    this.nextBlink < Date.now() + 60 && (b = !0);
                    14 == a && b && (a = 9);
                    this.eye = a;
                    b = a % 4;
                    a = ~~(a / 4);
                    this.hideEye && (a = b = -1);
                    this.sprite.material.setEyeTexOffset(b, a)
                };
            a.prototype.setViewingDirection = function(a) {
                var b = Math.PI / 2,
                    c = a;
                c > b && (c = -(Math.PI - c));
                c < -b && (c = Math.PI + c);
                c *= .15;
                this.sprite.material.setEyeOffset(.06 * Math.cos(a), .04 * Math.sin(a));
                this.sprite.material.setEyeRotation(c, c)
            };
            a.prototype.setRope =
                function(a, b) {
                    0 == b ? this.ropeSprite.visible = !1 : (this.ropeSprite.visible = !0, this.ropeSprite.size.y = b, this.ropeSprite.scale.y = b / 4, this.ropeSprite.angle = a - Math.PI / 2)
                };
            n.exports = a
        }, {}],
        30: [function(f, n, m) {
            function a() {}
            a.prototype.init = function(a) {};
            a.prototype.update = function() {};
            a.prototype.remove = function() {};
            n.exports = a
        }, {}],
        31: [function(f, n, m) {
            function a() {
                this.fogMaterial = this.layer = null;
                this.sprites = [];
                this.intensity = this.spriteCount = 0;
                this.rect = null
            }
            m = f(30);
            var h = f(37),
                b = f(54),
                e = f(131),
                d = f(93);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.init = function(a, c, g) {
                this.rect = c;
                this.layer = a;
                this.intensity = g;
                this.fogMaterial = b.renderer.createMaterial(d);
                a = Math.ceil((c[3] - c[1]) / 300);
                g = Math.ceil((c[2] - c[0]) / 300);
                this.spriteCount = g * a;
                for (var k = new e.DRandom(3264454802), l = 0; l < a; l++)
                    for (var p = 0; p < g; p++) this.createFogSprite(k.nextInt(), 300 * p + c[0], 300 * l + c[1]);
                this.update(Date.now())
            };
            a.prototype.createFogSprite = function(a, c, d) {
                a = new e.DRandom(a);
                var g = 512 + 300 * (a.next() -
                        .5),
                    l = b.renderer.createSprite(this.layer);
                l.material = this.fogMaterial;
                l.size.x = g;
                l.size.y = g;
                l.anchor.x = .5;
                l.anchor.y = .5;
                l.color[0] = 1;
                l.color[1] = 1;
                l.color[2] = 1;
                l.color[3] = this.intensity;
                l.setTexture(b.texFog, 0);
                this.sprites.push({
                    x: c,
                    y: d,
                    translateX: 200 * (a.next() - .5),
                    translateY: 200 * (a.next() - .5),
                    circleSize: 5 + 30 * a.next(),
                    timeFactor: 1 + .5 * a.next(),
                    sprite: l
                })
            };
            a.prototype.update = function(a) {
                if (this.layer) {
                    var b = h.getCamera();
                    this.layer.offset.x = .5 * b[0];
                    this.layer.offset.y = .5 * b[1];
                    for (b = 0; b < this.sprites.length; b++) {
                        var d =
                            this.sprites[b],
                            e = Math.sin(a / 1700 * d.timeFactor);
                        d.sprite.pos.x = d.x + d.translateX + d.circleSize * Math.cos(a / 1700 * d.timeFactor);
                        d.sprite.pos.y = d.y + d.translateY + d.circleSize * e
                    }
                }
            };
            n.exports = a
        }, {}],
        32: [function(f, n, m) {
            function a() {
                this.pollenMaterial = this.layer = null;
                this.layerInfos = [];
                this.clusters = [];
                this.sprites = [];
                this.intensity = 0;
                this.rect = null;
                this.lastUpdate = Date.now()
            }
            m = f(30);
            var h = f(37),
                b = f(54),
                e = f(131),
                d = f(93);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.init = function(a,
                c, g) {
                g = new e.DRandom(3264454802);
                this.layer = a;
                this.rect = c;
                this.pollenMaterial = b.renderer.createMaterial(d);
                a = c[2] - c[0];
                for (var k = c[3] - c[1], l = 0; 3 > l; l++) {
                    var p = .5 + l / 3 * .5;
                    this.layerInfos.push({
                        camFactor: p,
                        clusterCountX: Math.ceil(a / p / 500),
                        clusterCountY: Math.ceil(k / p / 500),
                        currentCamX: 0,
                        currentCamY: 0
                    })
                }
                for (l = 0; 3 > l; l++) {
                    p = -a / 2;
                    for (var h = -k / 2, f = 0; f < this.layerInfos[l].clusterCountY; f++)
                        for (var x = 0; x < this.layerInfos[l].clusterCountX; x++) {
                            var w = g.next(),
                                n = 500 * x + c[0] + p,
                                m = 500 * f + c[1] + h,
                                z = l;
                            w = new e.DRandom(w);
                            var t =
                                1 - z / 3,
                                D = 1 - t * t;
                            t = 6 * D + .5;
                            n = {
                                x: n,
                                y: m,
                                level: z,
                                distance: D,
                                density: t,
                                visible: !0,
                                sprites: []
                            };
                            for (m = 0; m < t; m++) z = this.createPollenSprite(w.next(), 500 * w.next(), 500 * w.next(), n), n.sprites.push(z);
                            this.clusters.push(n)
                        }
                }
            };
            a.prototype.createPollenSprite = function(a, c, d, f) {
                a = new e.DRandom(a);
                var g = f.distance,
                    k = b.renderer.createSprite(this.layer);
                k.material = this.pollenMaterial;
                k.size.x = 25 - 20 * g;
                k.size.y = 25 - 20 * g;
                k.anchor.x = .5;
                k.anchor.y = .5;
                k.color[0] = 1;
                k.color[1] = 1;
                k.color[2] = 1;
                k.color[3] = .2 - .1 * g;
                k.setTexture(b.texParticles[4],
                    0);
                c = {
                    x: c,
                    y: d,
                    distance: g,
                    cluster: f,
                    circleSize: 5 + 50 * a.next() * (1 - g),
                    timeFactor: 1 + .5 * a.next() * (1 - g) * (.5 < a.next() ? 1 : -1),
                    sprite: k
                };
                this.sprites.push(c);
                return c
            };
            a.prototype.update = function(a) {
                if (0 != this.layerInfos.length) {
                    var c = b.camera,
                        d = h.width / 2 * h.zoom,
                        e = h.height / 2 * h.zoom,
                        l = -c.pos.x - 600,
                        k = -c.pos.y - 600,
                        f = l + c.viewportSize.x + 1200;
                    c = k + c.viewportSize.y + 1200;
                    for (var y = 0; 3 > y; y++) {
                        var x = this.layerInfos[y];
                        x.currentCamX = (l + d) * x.camFactor;
                        x.currentCamY = (k + e) * x.camFactor
                    }
                    for (d = 0; d < this.clusters.length; d++) {
                        e =
                            this.clusters[d];
                        x = this.layerInfos[e.level];
                        y = e.x + x.currentCamX;
                        var w = e.y + x.currentCamY,
                            n = w + 500;
                        x = !0;
                        if (y + 500 < l || n < k || y > f || w > c) x = !1;
                        if (x != e.visible) {
                            for (y = 0; y < e.sprites.length; y++) e.sprites[y].sprite.visible = x;
                            e.visible = x
                        }
                        if (x)
                            for (y = 0; y < e.sprites.length; y++) {
                                x = e;
                                w = e.sprites[y];
                                n = this.layerInfos[x.level].currentCamY;
                                var m = w.circleSize * Math.sin(a / 3E3 * w.timeFactor);
                                w.sprite.pos.x = w.x + x.x + w.circleSize * Math.cos(a / 3E3 * w.timeFactor) + this.layerInfos[x.level].currentCamX;
                                w.sprite.pos.y = w.y + x.y + m + n + 200 * w.distance
                            }
                    }
                }
            };
            n.exports = a
        }, {}],
        33: [function(f, n, m) {
            function a() {
                this.snowMaterial = this.layer = null;
                this.layerInfos = [];
                this.clusters = [];
                this.sprites = [];
                this.intensity = 0;
                this.rect = null;
                this.lastUpdate = Date.now()
            }
            m = f(30);
            var h = f(37),
                b = f(54),
                e = f(131),
                d = f(93);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.init = function(a, c, g) {
                g = new e.DRandom(3264454802);
                this.layer = a;
                this.rect = c;
                this.snowMaterial = b.renderer.createMaterial(d);
                a = c[2] - c[0];
                for (var k = c[3] - c[1], l = 0; 5 > l; l++) {
                    var p = .5 + l / 5 * .5;
                    this.layerInfos.push({
                        camFactor: p,
                        clusterCountX: Math.ceil(a / p / 500),
                        clusterCountY: Math.ceil(k / p / 500),
                        currentCamX: 0,
                        currentCamY: 0
                    })
                }
                for (l = 0; 5 > l; l++) {
                    p = -a / 2;
                    for (var f = -k / 2, h = 0; h < this.layerInfos[l].clusterCountY; h++)
                        for (var x = 0; x < this.layerInfos[l].clusterCountX; x++) {
                            var w = g.next(),
                                n = 500 * x + c[0] + p,
                                m = 500 * h + c[1] + f,
                                z = l;
                            w = new e.DRandom(w);
                            var t = 1 - z / 5,
                                D = 1 - t * t;
                            t = 7 * D + .5;
                            n = {
                                x: n,
                                y: m,
                                level: z,
                                distance: D,
                                density: t,
                                visible: !0,
                                sprites: []
                            };
                            for (m = 0; m < t; m++) z = this.createSnowSprite(w.next(), 500 * w.next(), 500 * w.next(), n), n.sprites.push(z);
                            this.clusters.push(n)
                        }
                }
            };
            a.prototype.createSnowSprite = function(a, c, d, f) {
                a = new e.DRandom(a);
                var g = f.distance,
                    k = b.renderer.createSprite(this.layer);
                k.material = this.snowMaterial;
                k.size.x = 64 - 48 * g;
                k.size.y = 64 - 48 * g;
                k.anchor.x = .5;
                k.anchor.y = .5;
                k.color[0] = 1;
                k.color[1] = 1;
                k.color[2] = 1;
                k.color[3] = .8 - .7 * g;
                k.setTexture(b.texParticles[4], 0);
                c = {
                    x: c,
                    y: d,
                    distance: g,
                    cluster: f,
                    circleSize: 5 + 50 * a.next() * (1 - g),
                    timeFactor: 1 + .5 * a.next() * (1 - g) * (.5 < a.next() ? 1 : -1),
                    sprite: k
                };
                this.sprites.push(c);
                return c
            };
            a.prototype.update = function(a) {
                if (0 != this.layerInfos.length) {
                    var c =
                        b.camera,
                        d = h.width / 2 * h.zoom,
                        e = h.height / 2 * h.zoom,
                        l = -c.pos.x - 600,
                        k = -c.pos.y - 600,
                        f = l + c.viewportSize.x + 1200;
                    c = k + c.viewportSize.y + 1200;
                    for (var y = 0; 5 > y; y++) {
                        var x = this.layerInfos[y];
                        x.currentCamX = (l + d) * x.camFactor;
                        x.currentCamY = (k + e) * x.camFactor
                    }
                    for (d = 0; d < this.clusters.length; d++) {
                        e = this.clusters[d];
                        x = this.layerInfos[e.level];
                        e.y += .04 / (e.level / 2 + .5) * 10;
                        e.y > this.rect[3] && (e.y -= this.rect[3] - this.rect[1]);
                        y = e.x + x.currentCamX;
                        var w = e.y + x.currentCamY,
                            n = w + 500;
                        x = !0;
                        if (y + 500 < l || n < k || y > f || w > c) x = !1;
                        if (x != e.visible) {
                            for (y =
                                0; y < e.sprites.length; y++) e.sprites[y].sprite.visible = x;
                            e.visible = x
                        }
                        if (x)
                            for (y = 0; y < e.sprites.length; y++) {
                                x = e;
                                w = e.sprites[y];
                                n = this.layerInfos[x.level].currentCamY;
                                var m = w.circleSize * Math.sin(a / 3E3 * w.timeFactor);
                                w.sprite.pos.x = w.x + x.x + w.circleSize * Math.cos(a / 3E3 * w.timeFactor) + this.layerInfos[x.level].currentCamX;
                                w.sprite.pos.y = w.y + x.y + m + n + 200 * w.distance
                            }
                    }
                }
            };
            n.exports = a
        }, {}],
        34: [function(f, n, m) {
            function a(a, b, d) {
                this.x = a;
                this.y = b;
                this.strength = d;
                this.startAt = Date.now();
                this.progress = 0;
                this.maxAge = 10 *
                    d;
                this.aabb = null
            }

            function h() {
                this.a = this.maxLength = this.y = this.x = 0;
                this.aabb = null;
                this.decay = !1;
                this.decaySpeed = 0
            }

            function b() {
                this.fadeOutRate = this.strength = this.length = this.y = this.x = 0;
                this.aabb = null
            }
            var e = f(54);
            f(37);
            var d = f(89);
            n.exports = new function() {
                function k(a) {
                    var b = a[0],
                        c = a[1],
                        d = a[3],
                        g = -e.camera.pos.y,
                        l = -e.camera.pos.x + e.camera.viewportSize.x,
                        k = -e.camera.pos.y + e.camera.viewportSize.y;
                    return !(-e.camera.pos.x > a[2] || l < b || g > d || k < c)
                }
                var c = null,
                    g = -1,
                    f = -1,
                    l = [],
                    p = [],
                    A = [],
                    y = null;
                this.init = function(a,
                    b) {
                    c = e.renderer.createDataTexture(8, 8, 1);
                    y = e.renderer.createMaterial(d);
                    a.material = y;
                    a.textures[1] = c;
                    b.textures[2] = c
                };
                this.addBlast = function(b, c, d) {
                    b = new a(b, c, d);
                    l.push(b)
                };
                this.addCirculation = function() {
                    var a = new h;
                    p.push(a);
                    return a
                };
                this.addLight = function() {
                    var a = new b;
                    A.push(a);
                    return a
                };
                this.addFlash = function(a, b, c, d, e) {
                    var g = this.addLight();
                    g.x = a;
                    g.y = b;
                    g.length = c;
                    g.strength = d;
                    g.fadeOutRate = e;
                    return g
                };
                this.removeCirculation = function(a) {
                    a = p.indexOf(a);
                    p.splice(a, 1)
                };
                this.removeLight = function(a) {
                    a =
                        A.indexOf(a);
                    A.splice(a, 1)
                };
                this.decay = function(a, b) {
                    a.decay = !0;
                    a.decaySpeed = b
                };
                this.setCamera = function(a, b) {
                    y.setOffset(a, b)
                };
                this.update = function() {
                    var a = e.camera.viewportSize.x,
                        b = e.camera.viewportSize.y;
                    if (a != g || b != f) y.setScreenSize(a, b), g = a, f = b;
                    a = [];
                    for (b = 0; b < l.length; b++) {
                        var d = l[b].startAt;
                        l[b].progress = (Date.now() - d) / l[b].maxAge;
                        d = l[b];
                        var h = d.progress * d.strength;
                        h = 6 * h + Math.max(h, 30);
                        l[b].aabb = [d.x - h, d.y - h, d.x + h, d.y + h];
                        1 <= l[b].progress && a.push(l[b])
                    }
                    for (; 0 < a.length;) b = a.pop(), b = l.indexOf(b),
                        l.splice(b, 1);
                    for (b = 0; b < A.length; b++) a = A[b], d = a.length, A[b].aabb = [a.x - d, a.y - d, a.x + d, a.y + d];
                    h = l.length - 1;
                    for (a = 0; 8 > a; a++) {
                        d = b = 0;
                        for (var q = -1, n = 0; 0 <= h;) {
                            if (!l[h].aabb || k(l[h].aabb)) {
                                b = l[h].x;
                                d = l[h].y;
                                q = l[h].progress;
                                n = l[h].strength;
                                h--;
                                break
                            }
                            h--
                        }
                        c.setPixel(a, 0, b, d, q, n)
                    }
                    q = p.length - 1;
                    for (a = 0; 8 > a; a++) {
                        d = b = 0;
                        h = -1;
                        for (n = 0; 0 <= q;) {
                            if (!p[q].aabb || k(p[q].aabb)) {
                                b = p[q].x;
                                d = p[q].y;
                                h = p[q].maxLength;
                                n = p[q].a;
                                q--;
                                break
                            }
                            q--
                        }
                        c.setPixel(a, 1, b, d, n, h)
                    }
                    q = A.length - 1;
                    for (a = 0; 8 > a; a++) {
                        for (n = h = d = b = 0; 0 <= q;) {
                            if (A[q].aabb || k(A[q].aabb)) {
                                b =
                                    A[q].x;
                                d = A[q].y;
                                h = A[q].length;
                                n = A[q].strength;
                                q--;
                                break
                            }
                            q--
                        }
                        c.setPixel(a, 2, b, d, h, n)
                    }
                    c.update();
                    a = [];
                    for (b = 0; b < p.length; b++) {
                        p[b].decay && (p[b].maxLength -= p[b].decaySpeed, 0 > p[b].maxLength && a.push(p[b]));
                        d = p[b];
                        n = p[b];
                        h = n.x;
                        q = n.y;
                        var m = n.a,
                            E = n.maxLength + 30;
                        n = h + Math.cos(m) * E;
                        m = q + Math.sin(m) * E;
                        n < h && (E = h, h = n, n = E);
                        m < q && (E = q, q = m, m = E);
                        d.aabb = [h, q, n, m]
                    }
                    for (; 0 < a.length;) this.removeCirculation(a.pop());
                    a = [];
                    for (b = 0; b < A.length; b++) d = A[b], d.strength -= d.fadeOutRate, 0 >= d.strength && 0 < d.fadeOutRate && a.push(d);
                    for (; 0 <
                        a.length;) this.removeLight(a.pop())
                }
            }
        }, {}],
        35: [function(f, n, m) {
            var a = f(54),
                h = f(156);
            m = f(12);
            var b = f(11),
                e = f(125),
                d = [{
                    url: "/country/flag32.png",
                    def: m,
                    tex: null
                }, {
                    url: "/country/flag128.png",
                    def: b,
                    tex: null
                }];
            n.exports = new function() {
                var b = this,
                    c = {},
                    g = 0,
                    q = [],
                    l = -1,
                    p = -1;
                this.init = function() {
                    for (var g = d.length, k = 0; k < e.length; k++)
                        if (8 < e[k].c.length || -1 != e[k].c.indexOf("_")) throw Error("Invalid name");
                    for (k = 0; k < d.length; k++) d[k].tex = a.renderer.loadBaseTextureFromUrl(d[k].url),
                        function(e) {
                            d[e].tex.onError(function() {
                                console.log("Loading error flag tex: " +
                                    e)
                            });
                            d[e].tex.onLoad(function() {
                                g--;
                                if (-1 == l) {
                                    l = p = e;
                                    for (var k in d[p].def) {
                                        var f = d[p].def._edge;
                                        f = new h.Core.Rect(d[p].def[k][0], d[p].def[k][1], 1 / f, 1 / f);
                                        c[k] = a.renderer.loadTextureFromBase(d[p].tex, f)
                                    }
                                }
                                e > l && (d[p].tex.replaceWithTexture(d[e].tex), l = e);
                                0 == e && b.firstLodLoaded();
                                0 == g && b.allLodLoaded()
                            })
                        }(k)
                };
                this.firstLodLoaded = function() {
                    g = 1;
                    for (var a = 0; a < q.length; a++) q[a](g)
                };
                this.allLodLoaded = function() {
                    g = 2;
                    for (var a = 0; a < q.length; a++) q[a](g)
                };
                this.onLoadStage = function(a) {
                    q.push(a)
                };
                this.getLoadingStage =
                    function() {
                        return g
                    };
                this.getTexNameForBall = function(a) {
                    for (var b = 0; b < e.length; b++)
                        if (e[b].c == a) return e[b].f ? e[b].f : a;
                    return "$pl"
                };
                this.getTex = function(a) {
                    return c[this.getTexNameForBall(a)]
                };
                this.isInverted = function(a) {
                    return (a = f(19).getBallRecord(a)) ? a.invert : !1
                }
            }
        }, {}],
        36: [function(f, n, m) {
            var a = f(156),
                h = f(54);
            n.exports = function(b, e, d) {
                function k(c) {
                    var d = e ? h.shaderHelper.load(a.Trachyt2d.PIXELSHADER, e, c) : null;
                    c = b ? h.shaderHelper.load(a.Trachyt2d.VERTEXSHADER, b, c) : null;
                    return h.renderer.createShader(d,
                        c)
                }
                this.variants = {};
                this.variants.normal = k({
                    LOWGFX: 0
                });
                d && (this.variants.lowGfx = k({
                    LOWGFX: 1
                }))
            }
        }, {}],
        37: [function(f, n, m) {
            var a = f(54),
                h = f(55),
                b = f(23),
                e = f(152),
                d = f(39),
                k = f(34),
                c = f(90),
                g = f(156),
                q = f(94),
                l = f(35),
                p = f(53),
                A = f(51);
            n.exports = new function() {
                var f = this;
                this.renderTargetElement = null;
                this.ratio = this.height = this.width = 0;
                this.deviceZoom = this.zoom = 1;
                this.camPosLast = [0, 0];
                this.rumbleFactor = 0;
                this.errorHandler = null;
                this.fps = -1;
                this.fpsCounter = 0;
                this.fpsLastUpdate = Date.now();
                (new Date).getTime();
                this.init =
                    function(b) {
                        this.renderTargetElement = document.createElement("canvas");
                        document.getElementById("game").appendChild(this.renderTargetElement);
                        a.ui = new q;
                        a.renderer = g.Trachyt2d.createContext(this.renderTargetElement);
                        a.renderer.setUrlVersionHash(kugelnVersion);
                        a.shaderHelper = new p(a.renderer);
                        a.camera = a.renderer.createCamera();
                        a.renderer.setCamera(a.camera, g.Trachyt2d.SCENE_WORLD);
                        a.renderer.onContextLoss(function() {
                            f.errorHandler && f.errorHandler({
                                code: 307,
                                msg: "WebGL Context loss - Please check your graphic driver and try again"
                            })
                        });
                        l.init();
                        a.particles = new A;
                        window.addEventListener("resize", this.onResize, !1);
                        this.loadBasicTextures(function() {
                            d.init();
                            a.ui.setMatchUIState(0);
                            b()
                        });
                        a.scenePreview = a.renderer.createScene();
                        a.sceneMenu = a.renderer.createScene();
                        a.layerBackground = a.renderer.createLayer();
                        a.layerBgFx = a.renderer.createLayer(null, g.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR);
                        a.renderer.createCommandLayer("pushFBO");
                        a.layerObjects = a.renderer.createLayer();
                        a.layerJetpacks = a.renderer.createLayer();
                        a.layerRopes = a.renderer.createLayer();
                        a.layerBullets = a.renderer.createLayer();
                        a.layerWeapons = a.renderer.createLayer();
                        a.layerPlane = a.renderer.createLayer();
                        a.layerParticlesBg = a.renderer.createLayer(null, g.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR);
                        a.layerMapTiles = a.renderer.createLayer();
                        a.layerFlag0 = a.renderer.createLayer();
                        a.layerFlag1 = a.renderer.createLayer();
                        a.layerBalls = a.renderer.createLayer();
                        a.layerBallSkins = a.renderer.createLayer();
                        a.layerItems = a.renderer.createLayer();
                        a.layerSharks = a.renderer.createLayer();
                        a.layerParticles = a.renderer.createLayer(null,
                            g.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR);
                        a.layerTileGrid = a.renderer.createLayer();
                        a.layerNicknames = a.renderer.createLayer();
                        a.renderer.createCommandLayer("popFBO");
                        a.layerPostProcWater = a.renderer.createPostProcLayer(null, null, {
                            usePushedFbo: !0
                        });
                        a.layerPostProcBlast = a.renderer.createPostProcLayer();
                        a.layerGameHud = a.renderer.createLayer(g.Trachyt2d.SCENE_HUD);
                        a.layerPreview = a.renderer.createLayer(a.scenePreview);
                        a.layerMenuParticles = a.renderer.createLayer(a.sceneMenu);
                        a.shaderBall = [];
                        for (var e = 0; 3 > e; e++) {
                            var h =
                                a.shaderHelper.load(g.Trachyt2d.PIXELSHADER, "ball", {
                                    PATHTYPE: e
                                });
                            a.shaderBall[e] = a.renderer.createShader(h, null)
                        }
                        a.shaderBg = a.shaderHelper.loadFull("bgV", "bgF", !0);
                        a.shaderMap = a.shaderHelper.loadFull(null, "map");
                        a.shaderFlag = a.shaderHelper.loadFull(null, "flag");
                        a.shaderBlast = a.shaderHelper.loadFull("postprocessing", "blast");
                        a.shaderCompose = a.shaderHelper.loadFull("postprocessing", "compose", !0);
                        a.shaderParticle = a.shaderHelper.loadFull("particleV", "particleF");
                        k.init(a.layerPostProcBlast, a.layerPostProcWater);
                        a.materialCompose = a.renderer.createMaterial(c);
                        a.layerPostProcWater.material = a.materialCompose;
                        this.onResize();
                        a.renderer.setOnBeforeRender(this.onBeforeRender);
                        a.renderer.setOnAfterRender(this.onAfterRender);
                        a.renderer.start()
                    };
                this.onError = function(a) {
                    this.errorHandler = a
                };
                this.getViewWidth = function() {
                    return a.camera.viewportSize.x
                };
                this.getViewHeight = function() {
                    return a.camera.viewportSize.y
                };
                this.getCamera = function() {
                    return [-a.camera.pos.x, -a.camera.pos.y, this.zoom]
                };
                this.setCamera = function(b,
                    c, d, e) {
                    function g(a, b) {
                        return Math.cos(l * a) * b
                    }
                    e = e || 1;
                    this.zoom = document.getElementById('zoom') ? document.getElementById('zoom').checked ? 2 : d : d;
                    a.camera.viewportSize.x = this.width * this.zoom * this.deviceZoom;
                    a.camera.viewportSize.y = this.height * this.zoom * this.deviceZoom;
                    b = this.camPosLast[0] - (this.camPosLast[0] - b) / e;
                    c = this.camPosLast[1] - (this.camPosLast[1] - c) / e;
                    this.camPosLast[0] = b;
                    this.camPosLast[1] = c;
                    if (.01 < this.rumbleFactor) {
                        var l = Date.now() / 1E3;
                        e = g(17.3, 7.4) + g(29.1, 5.7) + g(35.3, 3.5) + g(50.2, 2);
                        d = g(16.5, 7.9) + g(28.4, 5.2) + g(32.3, 4.2) + g(45.6, 1.7);
                        b += e * this.rumbleFactor;
                        c += d * this.rumbleFactor;
                        this.rumbleFactor *= .92
                    }
                    b = ~~b;
                    c = ~~c;
                    a.camera.pos.x = -b;
                    a.camera.pos.y = -c;
                    a.mapGfx.setCamera(b, c);
                    k.setCamera(b, c);
                    a.materialCompose.setOffset(b, c);
                    a.materialCompose.setScreenSize(a.camera.viewportSize.x, a.camera.viewportSize.y)
                };
                this.rumble = function(a) {
                    a > this.rumbleFactor && (this.rumbleFactor = a)
                };
                this.loadBasicTextures = function(b) {
                    var c = new h;
                    c.add(a.texBallPath = a.renderer.loadTextureFromUrl("/ball/path.svg"));
                    c.add(a.texEyes = a.renderer.loadTextureFromUrl("/ball/eyes.svg"));
                    c.add(a.texRope = a.renderer.loadTextureFromUrl("/ball/rope.png"));
                    c.add(a.texBaseSkins = a.renderer.loadBaseTextureFromUrl("/ball/skins.svg"));
                    c.add(a.texBaseBullets = a.renderer.loadBaseTextureFromUrl("/weapons/bullet.svg"));
                    c.add(a.texBaseWeapons = a.renderer.loadBaseTextureFromUrl("/weapons/weapon.svg"));
                    c.add(a.texBaseCommon = a.renderer.loadBaseTextureFromUrl("/common/common.svg"));
                    c.add(a.texBaseParticles = a.renderer.loadBaseTextureFromUrl("/common/particle.png"));
                    a.texFlags = {};
                    this.objTex = {};
                    c.done(function() {
                        a.texWeapons = [];
                        for (var c = 0; 16 > c; c++) {
                            var d = new g.Core.Rect(c %
                                4 * .25, .25 * ~~(c / 4), .25, .25);
                            d = a.renderer.loadTextureFromBase(a.texBaseWeapons, d);
                            a.texWeapons.push(d)
                        }
                        a.texSkins = [];
                        for (var k = 0; k < e.length; k++) {
                            var h = e[k];
                            a.texSkins[k] = [];
                            for (c = 0; c < h.list.length; c++) d = h.list[c], d = new g.Core.Rect(d.tex[0], d.tex[1], d.tex[2], d.tex[3]), d = a.renderer.loadTextureFromBase(a.texBaseSkins, d), a.texSkins[k].push(d)
                        }
                        a.texBullets = [];
                        for (c = 0; 12 > c; c++) d = new g.Core.Rect(c % 4 * .25, .25 * ~~(c / 4), .25, .25), d = a.renderer.loadTextureFromBase(a.texBaseBullets, d), a.texBullets.push(d);
                        a.texBullets[12] =
                            a.renderer.loadTextureFromBase(a.texBaseBullets, new g.Core.Rect(0, .75, .5, .25));
                        a.texParticles = [];
                        for (c = 0; 8 > c; c++) d = new g.Core.Rect(c % 4 * .25, .25 * ~~(c / 4), .25, .25), d = a.renderer.loadTextureFromBase(a.texBaseParticles, d), a.texParticles.push(d);
                        d = new g.Core.Rect(0, .5, .5, .5);
                        a.texFog = a.renderer.loadTextureFromBase(a.texBaseParticles, d);
                        a.texHeart = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(0, 0, .0625, .0625));
                        a.texGibbet = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.0625,
                            0, .0625, .0625));
                        a.texWarn = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.125, 0, .0625, .0625));
                        a.texPole = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(0, .25, .25, .25));
                        a.texCup = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.1875, 0, .0625, .0625));
                        a.texTileGrid = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.5, 0, .5, .5));
                        a.texPlane = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(0, .5, 1, .5));
                        a.texPropeller = a.renderer.loadTextureFromBase(a.texBaseCommon,
                            new g.Core.Rect(.25, .25, .25, .25));
                        a.texPlaneKill = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(0, .125, .125, .125));
                        a.texShark = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.125, .125, .125, .125));
                        a.texJetpackItem = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.25, .125, .125, .125));
                        a.texJetpackWear = a.renderer.loadTextureFromBase(a.texBaseCommon, new g.Core.Rect(.375, .125, .125, .125));
                        a.texRope.setWrapMode(g.Trachyt2d.TEX_REPEAT, g.Trachyt2d.TEX_REPEAT);
                        if (0 <
                            l.getLoadingStage()) b();
                        else l.onLoadStage(function(a) {
                            1 == a && b()
                        })
                    }, function(a, b) {
                        var c = "unknown";
                        a && (a.src ? c = a.src : a.base && a.base._imgObject && a.base._imgObject.src && (c = a.base._imgObject.src.substr(250)));
                        "unknown" == c && b && b.src && (c = b.src);
                        throw Error("Resource loading error on map load: " + c);
                    })
                };
                this.onResize = function() {
                    var b = window.innerWidth,
                        c = window.innerHeight;
                    void 0 !== window.devicePixelRatio && (f.deviceZoom = window.devicePixelRatio);
                    a.mapGfx && a.mapGfx.resize(b, c);
                    f.renderTargetElement.width = b;
                    f.renderTargetElement.height = c;
                    f.width = b;
                    f.height = c;
                    f.ratio = b / c;
                    a.renderer.resize(b, c);
                    a.ui.updateViewport(b, c);
                    d.resize(b, c)
                };
                this.onBeforeRender = function() {
                    25 == ++f.fpsCounter && (f.fps = 1E3 / (Date.now() - f.fpsLastUpdate) * f.fpsCounter, f.fpsLastUpdate = Date.now(), f.fpsCounter = 0);
                    a.ui.update();
                    a.flowUpdateCb && a.flowUpdateCb();
                    a.gameUpdateCb && a.gameUpdateCb();
                    a.particles.update();
                    k.update();
                    a.materialCompose.updateTime()
                };
                this.onAfterRender = function(c) {
                    b.graphAdd("Frames", 1);
                    b.setRenderData("drawCalls", c);
                    a.frameCounter++
                }
            }
        }, {}],
        38: [function(f, n, m) {
            var a = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329,
                    323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294,
                    292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
                ],
                h = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
                ];
            n.exports.createCanvas = function(a, e) {
                var b = document.createElement("canvas");
                b.width = a;
                b.height = e;
                return b
            };
            n.exports.blurCanvas = function(b, e) {
                function d() {
                    this.v = 0;
                    this.next =
                        null
                }

                function k(a) {
                    var b, k = new d,
                        h = null;
                    var q = k;
                    var w = 0,
                        m = 0;
                    for (b = 1; b < c; b++) q = q.next = new d, b == g && (h = q);
                    q.next = k;
                    for (var B = 0; B < p; B++) {
                        var z = 0,
                            F = r[w + a],
                            L = g * F,
                            H = f * F;
                        q = k;
                        for (b = 0; b < g; b++) q.v = F, q = q.next;
                        for (b = 1; b < g; b++) {
                            var G = g - b;
                            q.v = r[w + ((A < b ? A : b) << 2) + a];
                            H += q.v * G;
                            z += q.v;
                            q = q.next
                        }
                        q = k;
                        b = h;
                        for (var J = 0; J < l; J++) r[w + a] = H * x >> n, H -= L, L -= q.v, F = J + e + 1, F = m + (F < A ? F : A) << 2, q.v = r[F + a], z += q.v, H += z, q = q.next, L += b.v, z -= b.v, b = b.next, w += 4;
                        m += l
                    }
                    for (J = 0; J < l; J++) {
                        z = 0;
                        w = J << 2;
                        F = r[w + a];
                        L = g * F;
                        H = f * F;
                        q = k;
                        for (b = 0; b < g; b++) q.v = F, q = q.next;
                        for (b = 1; b <= e; b++) G = g - b, q.v = F, H += q.v * G, z += F, q = q.next;
                        w = J;
                        q = k;
                        b = h;
                        for (B = 0; B < p; B++) F = w << 2, r[F + a] = H * x >> n, H -= L, L -= q.v, F = B + g, F = J + (F < y ? F : y) * l << 2, q.v = r[F + a], z += q.v, H += z, q = q.next, L += b.v, z -= b.v, b = b.next, w += l
                    }
                }
                if (!(1 > e)) {
                    var c = e + e + 1,
                        g = e + 1,
                        f = g * (g + 1) / 2,
                        l = b.width,
                        p = b.height,
                        A = l - 1,
                        y = p - 1,
                        x = a[e],
                        n = h[e],
                        m = b.getContext("2d");
                    b = m.getImageData(0, 0, b.width, b.height);
                    var r = b.data;
                    if (r.length != l * p * 4) throw Error("Invalid image size");
                    k(0);
                    k(1);
                    k(2);
                    k(3);
                    m.putImageData(b, 0, 0)
                }
            };
            n.exports.debugOutputCanvas = function(a) {
                var b =
                    document.getElementById("debugOutputCanvas");
                b || (b = document.createElement("div"), b.id = "debugOutputCanvas", b.style.position = "absolute", b.style.top = "20px", b.style.left = "20px", document.body.appendChild(b));
                var d = this.createCanvas(a.width, a.height);
                d.style.border = "10px solid #000";
                d.style.backgroundColor = "#f0f";
                d.getContext("2d").drawImage(a, 0, 0);
                b.appendChild(d)
            }
        }, {}],
        39: [function(f, n, m) {
            function a() {
                var a, c, d, g = !1,
                    k = !1,
                    f = !1,
                    n = 0,
                    m = [0, 0],
                    r = [!1, !1],
                    z = !1,
                    t = [];
                this.init = function() {
                    c = e.createCanvas(512, 512);
                    d = h.renderer.loadTextureFromImage(c);
                    a = h.renderer.createSprite(h.layerGameHud);
                    a.setTexture(d);
                    a.size.x = 512;
                    a.size.y = 512;
                    a.anchor.x = .5;
                    a.anchor.y = 0;
                    a.pos.x = h.renderer.getWidth() / 2;
                    this.updatePosition();
                    g = !0;
                    for (var l = 0; 2 > l; l++) {
                        var k = document.createElement("canvas");
                        k.width = k.height = 128;
                        var f = new b;
                        f.init(k, 64);
                        f.setTeam(l);
                        f.setPos(64, 64, 1 == l);
                        f.render();
                        var p = h.renderer.loadTextureFromImage(k),
                            q = h.renderer.createSprite(h.layerGameHud);
                        q.setTexture(p);
                        q.size.x = 128;
                        q.size.y = 128;
                        q.angle = .6 * (0 == l ? 1 :
                            -1);
                        q.anchor.x = 0 == l ? 0 : 1;
                        q.anchor.y = 1;
                        q.visible = !1;
                        t.push({
                            canvas: k,
                            menuFlag: f,
                            tex: p,
                            sprite: q
                        })
                    }
                    this.updateFlagPos(h.renderer.getWidth(), h.renderer.getHeight());
                    this.render()
                };
                this.setWarmup = function(a) {
                    z = a;
                    this.updatePosition()
                };
                this.setFlags = function(a, b) {
                    r = [a, b];
                    this.updateFlagVisibility()
                };
                this.setHasTeams = function(a) {
                    k != a && (g = !0);
                    k = a
                };
                this.setIsCTF = function(a) {
                    f = a
                };
                this.setTimeLeft = function(a) {
                    n != a && (g = !0);
                    n = a
                };
                this.setTeamScore = function(a) {
                    if (a && 2 == a.length) {
                        if (m[0] != a[0] || m[1] != a[1]) g = !0;
                        m =
                            a.slice()
                    }
                };
                this.setVisible = function(b) {
                    a.visible = b;
                    this.updateFlagVisibility()
                };
                this.updatePosition = function() {
                    a.pos.y = z ? h.renderer.getHeight() / 6 : 0
                };
                this.renderNormal = function() {
                    var a = c.getContext("2d");
                    a.clearRect(0, 0, 512, 512);
                    a.textBaseline = "top";
                    a.fillStyle = "rgba(0, 0, 0, 0.6)";
                    a.fillRect(176, 0, 160, 70);
                    a.fillRect(196, 70, 120, 20);
                    a.beginPath();
                    a.arc(196, 70, 20, .5 * Math.PI, 1 * Math.PI, !1);
                    a.lineTo(196, 70);
                    a.fill();
                    a.beginPath();
                    a.arc(316, 70, 20, 0 * Math.PI, .5 * Math.PI, !1);
                    a.lineTo(316, 70);
                    a.fill();
                    k && (a.fillStyle =
                        "rgba(0, 0, 0, 0.5)", a.fillRect(36, 0, 140, 70), a.fillRect(336, 0, 140, 70), a.fillStyle = "rgba(180, 0, 0, 0.6)", a.fillRect(16, 0, 20, 50), a.beginPath(), a.arc(36, 50, 20, .5 * Math.PI, 1 * Math.PI, !1), a.lineTo(36, 50), a.fill(), a.fillStyle = "rgba(0, 0, 200, 0.6)", a.fillRect(476, 0, 20, 50), a.beginPath(), a.arc(476, 50, 20, 0 * Math.PI, .5 * Math.PI, !1), a.lineTo(476, 50), a.fill());
                    var b = Math.floor(n / 60);
                    b = b + ":" + ("00" + Math.floor(n % 60)).substr(-2);
                    a.textAlign = "center";
                    a.fillStyle = 10 >= n && 0 == n % 2 ? "#f55" : "#fff";
                    a.font = "52px BangersKugeln";
                    a.fillText(b, 256, 5);
                    k && (a.textAlign = "center", a.fillStyle = "#fff", a.font = "28px BangersKugeln", a.fillText(m[0], 106, 10), a.fillText(m[1], 406, 10));
                    a.fillStyle = "#bbb";
                    a.font = "20px BangersKugeln";
                    a.fillText("Time left", 256, 62);
                    k && (b = f ? "Captures" : "Score", a.fillText(b, 106, 44), a.fillText(b, 406, 44));
                    d.update()
                };
                this.renderWarmup = function() {
                    var a = c.getContext("2d");
                    a.clearRect(0, 0, 512, 512);
                    a.textBaseline = "top";
                    a.fillStyle = "rgba(0, 0, 0, 0.6)";
                    a.fillRect(131, 20, 250, 120);
                    a.fillRect(151, 140, 210, 20);
                    a.fillRect(151,
                        0, 210, 20);
                    a.beginPath();
                    a.arc(151, 20, 20, 1 * Math.PI, 1.5 * Math.PI, !1);
                    a.lineTo(151, 20);
                    a.fill();
                    a.beginPath();
                    a.arc(361, 20, 20, 1.5 * Math.PI, 2 * Math.PI, !1);
                    a.lineTo(361, 20);
                    a.fill();
                    a.beginPath();
                    a.arc(151, 140, 20, .5 * Math.PI, 1 * Math.PI, !1);
                    a.lineTo(151, 140);
                    a.fill();
                    a.beginPath();
                    a.arc(361, 140, 20, 0 * Math.PI, .5 * Math.PI, !1);
                    a.lineTo(361, 140);
                    a.fill();
                    var b = 1 != ("" + n).length ? 10 : -5;
                    a.fillStyle = "#fff";
                    a.font = "80px BangersKugeln";
                    a.textAlign = "right";
                    a.fillText("" + n, 271 + b, 60);
                    a.font = "30px BangersKugeln";
                    a.textAlign =
                        "left";
                    a.fillText("sec", 281 + b, 105);
                    a.fillStyle = "#bbb";
                    a.textAlign = "center";
                    a.font = "25px BangersKugeln";
                    a.fillText("Next match in", 256, 20);
                    d.update()
                };
                this.render = function() {
                    g && (g = !1, z ? this.renderWarmup() : this.renderNormal())
                };
                this.screenResize = function(b, c) {
                    a.pos.x = h.renderer.getWidth() / 2;
                    this.updateFlagPos(b, c)
                };
                this.updateFlagPos = function(a, b) {
                    t[0].sprite.pos.x = a / 2 + 256 - 70;
                    t[1].sprite.pos.x = a / 2 - 256 + 44;
                    t[0].sprite.pos.y = 37;
                    t[1].sprite.pos.y = 56
                };
                this.updateFlagVisibility = function() {
                    t[0].sprite.visible =
                        r[0] && a.visible;
                    t[1].sprite.visible = r[1] && a.visible
                };
                this.init()
            }
            var h = f(54),
                b = f(49);
            f(150);
            f(142);
            f(142);
            var e = f(38),
                d = f(42),
                k = f(40),
                c = f(43),
                g = f(44);
            n.exports = new function() {
                this.tileGrid = this.matchInfo = this.heatInfo = this.ammoInfo = this.healthInfo = null;
                var b = [];
                this.resize = function(a, c) {
                    for (var d = 0; d < b.length; d++) b[d].screenResize(a, c)
                };
                this.init = function() {
                    this.healthInfo = new d;
                    this.ammoInfo = new k;
                    this.heatInfo = new c;
                    this.matchInfo = new a;
                    this.tileGrid = new g;
                    b.push(this.healthInfo);
                    b.push(this.ammoInfo);
                    b.push(this.heatInfo);
                    b.push(this.matchInfo);
                    b.push(this.tileGrid)
                }
            }
        }, {}],
        40: [function(f, n, m) {
            function a() {
                this.dataWeaponId = -1;
                this.dataWeaponTex = this.dataAmmoMax = this.dataAmmoCurrent = 0;
                this.init(1)
            }
            var h = f(54);
            f = f(41);
            a.prototype = Object.create(f.prototype);
            a.prototype.constructor = f;
            a.prototype.initColors = function(a) {
                var b = a.createLinearGradient(0, 0, 0, 200);
                b.addColorStop(0, "rgba(0, 0, 0, 0.5)");
                b.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                var d = a.createLinearGradient(0, 0, 0, 200);
                d.addColorStop(0, "rgba(0, 90, 0, 1.0)");
                d.addColorStop(1, "rgba(0, 180, 0, 1.0)");
                a = a.createLinearGradient(0, 0, 0, 200);
                a.addColorStop(0, "rgba(0, 30, 0, 0.6)");
                a.addColorStop(1, "rgba(0, 70, 0, 0.6)");
                this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: b,
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: a,
                    circleFull: d,
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(0, 140, 0, 1.0)",
                    textOutline: "rgba(0, 0, 0, 1.0)"
                }
            };
            a.prototype.setAmmo = function(a, e, d, k) {
                this.dataAmmoCurrent != a && (this.dirty = !0);
                this.dataAmmoMax != e && (this.dirty = !0);
                this.dataWeaponTex != d &&
                    (this.dirty = !0);
                this.dataWeaponId = k;
                this.dataAmmoCurrent = a;
                this.dataAmmoMax = e;
                this.dataWeaponTex = d;
                this.dataMax = e;
                this.dataCur = a;
                this.separatorCount = 1
            };
            a.prototype.getAnchor = function() {
                return [1, 1]
            };
            a.prototype.getPos = function(a, e) {
                return [a, e]
            };
            a.prototype.getTex = function() {
                return h.texBullets[this.dataWeaponTex]
            };
            a.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 45]
            };
            n.exports = a
        }, {}],
        41: [function(f, n, m) {
            function a() {}
            var h = f(54),
                b = f(38);
            a.prototype.init = function(a) {
                this.type = a;
                this.visible = !1;
                this.infoTex = this.infoCanvas = this.infoSprite = null;
                this.size = 256;
                this.scale = 1;
                this.highlight = !1;
                this.text = null;
                this.dataCur = this.dataMax = 0;
                this.separatorCount = 1;
                this.dirty = !0;
                this.infoCanvas = b.createCanvas(this.size, this.size);
                this.infoTex = h.renderer.loadTextureFromImage(this.infoCanvas);
                a = this.getAnchor();
                this.infoSprite = h.renderer.createSprite(h.layerGameHud);
                this.infoSprite.setTexture(this.infoTex);
                this.infoSprite.size.x = this.size;
                this.infoSprite.size.y = this.size;
                this.infoSprite.anchor.x = a[0];
                this.infoSprite.anchor.y = a[1];
                this.screenResize(h.renderer.getWidth(), h.renderer.getHeight());
                this.initColors(this.infoCanvas.getContext("2d"));
                this.render()
            };
            a.prototype.initColors = function(a) {};
            a.prototype.setVisible = function(a) {
                this.visible = a;
                this.infoSprite.visible = a
            };
            a.prototype.screenResize = function(a, b) {
                a = this.getPos(a, b);
                this.infoSprite.pos.x = a[0];
                this.infoSprite.pos.y = a[1]
            };
            a.prototype.render = function() {
                1 < this.scale && (this.scale = Math.max(1, this.scale - .03));
                this.infoSprite.size.x = this.size *
                    this.scale;
                this.infoSprite.size.y = this.size * this.scale;
                if (this.dirty) {
                    this.dirty = !1;
                    var a = this.infoCanvas.getContext("2d");
                    a.clearRect(0, 0, this.size, this.size);
                    a.textBaseline = "top";
                    var b = this.size / 2,
                        k = this.size / 2;
                    a.beginPath();
                    a.strokeStyle = this.colors.strokeBg;
                    a.fillStyle = this.highlight ? this.colors.highlightBg : this.colors.fillBg;
                    a.arc(b, k, 100, 0, 2 * Math.PI, !1);
                    a.fill();
                    var c = 2 * Math.PI + 1.57 - .9,
                        g = c - 2.47;
                    a.lineWidth = 24;
                    a.beginPath();
                    a.strokeStyle = this.colors.circleEmpty;
                    a.arc(b, k, 78, 2.47, c, !1);
                    a.stroke();
                    c = 65535 == this.dataMax;
                    var f = this.dataCur / this.dataMax;
                    c && (f = 1);
                    a.beginPath();
                    a.strokeStyle = this.colors.circleFull;
                    a.arc(b, k, 78, 2.47, 2.47 + g * f, !1);
                    a.stroke();
                    a.lineWidth = 2;
                    a.strokeStyle = this.colors.separators;
                    g = (2 * Math.PI - 1.8) / this.separatorCount;
                    for (f = 1; f < this.separatorCount; f++) {
                        var l = 2.47 + g * f,
                            h = Math.cos(l);
                        l = Math.sin(l);
                        a.beginPath();
                        a.moveTo(b + 66 * h, k + 66 * l);
                        a.lineTo(b + 90 * h, k + 90 * l);
                        a.stroke()
                    }
                    b = this.getTex();
                    k = this.getTexPos();
                    b.draw(a, k[0], k[1], 80, 80);
                    a.fillStyle = this.colors.textOutline;
                    this.renderText(a,
                        c, 1, 1);
                    this.renderText(a, c, 1, -1);
                    this.renderText(a, c, -1, -1);
                    this.renderText(a, c, -1, 1);
                    a.fillStyle = this.colors.text;
                    this.renderText(a, c, 0, 0);
                    this.infoTex.update()
                }
            };
            a.prototype.renderText = function(a, b, k, c) {
                b || null !== this.text ? null !== this.text && (a.textAlign = "center", a.font = "30px BangersKugeln", a.fillText(this.text, this.size / 2 + k, this.size - 80 + c)) : (b = this.size / 2 + 7, a.textAlign = "right", a.font = "38px BangersKugeln", a.fillText("" + this.dataCur, b - 3 + k, this.size - 85 + c), a.textAlign = "left", a.font = "16px BangersKugeln",
                    a.fillText("/ " + this.dataMax, b + 3 + k, this.size - 67 + c))
            };
            n.exports = a
        }, {}],
        42: [function(f, n, m) {
            function a() {
                this.dataHealthCurrent = 0;
                this.dataHealthMax = 10;
                this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: "rgba(0, 0, 0, 0.5)",
                    highlightBg: "rgba(110, 0, 0, 0.5)",
                    circleEmpty: "rgba(70, 0, 0, 0.6)",
                    circleFull: "rgba(224, 0, 0, 1.0)",
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(224, 0, 0, 1.0)"
                };
                this.init(0)
            }
            var h = f(54);
            f = f(41);
            a.prototype = Object.create(f.prototype);
            a.prototype.constructor = f;
            a.prototype.initColors =
                function(a) {
                    var b = a.createLinearGradient(0, 0, 0, 200);
                    b.addColorStop(0, "rgba(0, 0, 0, 0.5)");
                    b.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                    var d = a.createLinearGradient(0, 0, 0, 200);
                    d.addColorStop(0, "rgba(150, 0, 0, 1.0)");
                    d.addColorStop(1, "rgba(255, 20, 20, 1.0)");
                    var k = a.createLinearGradient(0, 0, 0, 200);
                    k.addColorStop(0, "rgba(30, 0, 0, 0.6)");
                    k.addColorStop(1, "rgba(150, 0, 0, 0.6)");
                    a = a.createLinearGradient(0, 0, 0, 200);
                    a.addColorStop(0, "rgba(210, 0, 0, 0.9)");
                    a.addColorStop(.6, "rgba(150, 0, 0, 0.9)");
                    a.addColorStop(1,
                        "rgba(60, 0, 0, 0.8)");
                    this.colors = {
                        strokeBg: "rgba(0, 0, 0, 0.0)",
                        fillBg: b,
                        highlightBg: a,
                        circleEmpty: k,
                        circleFull: d,
                        separators: "rgba(100, 0, 0, 1.0)",
                        text: "rgba(224, 0, 0, 1.0)",
                        textOutline: "rgba(0, 0, 0, 1.0)"
                    }
                };
            a.prototype.setHealth = function(a, e) {
                this.dataHealthCurrent != a && (this.dirty = !0);
                this.dataHealthMax != e && (this.dirty = !0);
                this.dataHealthCurrent = a;
                this.dataHealthMax = e;
                this.highlight = 3 >= a ? !0 : !1;
                this.dataCur > a && (this.scale = 1.3);
                this.dataMax = e;
                this.dataCur = a;
                this.separatorCount = e
            };
            a.prototype.getAnchor =
                function() {
                    return [0, 1]
                };
            a.prototype.getPos = function(a, e) {
                return [0, e]
            };
            a.prototype.getTex = function() {
                return h.texHeart
            };
            a.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 45]
            };
            n.exports = a
        }, {}],
        43: [function(f, n, m) {
            function a() {
                this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: "rgba(0, 0, 0, 0.5)",
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: "rgba(130, 60, 0, 0.6)",
                    circleFull: "rgba(255, 100, 0, 1.0)",
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(255, 100, 0, 1.0)"
                };
                this.init(2);
                this.text =
                    "overheat";
                this.dataMax = 255;
                this.dataHeat = this.dataCur = 0;
                this.dirty = !0
            }
            var h = f(54),
                b = f(41);
            a.prototype = Object.create(b.prototype);
            a.prototype.constructor = b;
            a.prototype.initColors = function(a) {
                var b = a.createLinearGradient(0, 0, 0, 200);
                b.addColorStop(0, "rgba(0, 0, 0, 0.5)");
                b.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                var e = a.createLinearGradient(0, 0, 0, 200);
                e.addColorStop(0, "rgba(150,  60, 0, 1.0)");
                e.addColorStop(1, "rgba(255, 150, 0, 1.0)");
                a = a.createLinearGradient(0, 0, 0, 200);
                a.addColorStop(0, "rgba(100, 40, 0, 0.6)");
                a.addColorStop(1, "rgba(140, 65, 0, 0.6)");
                this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: b,
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: a,
                    circleFull: e,
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(255, 100, 0, 1.0)",
                    textOutline: "rgba(0, 0, 0, 1.0)"
                }
            };
            a.prototype.setHeat = function(a) {
                this.dataHeat != a && (255 <= a && (a = 255), this.dataHeat = a)
            };
            a.prototype.setVisible = function(a) {
                this.visible = a;
                0 == this.dataCur && (a = !1);
                this.infoSprite.visible = a
            };
            a.prototype.getAnchor = function() {
                return [1, 1]
            };
            a.prototype.getPos =
                function(a, b) {
                    return [a - 240, b]
                };
            a.prototype.getTex = function() {
                return h.texWarn
            };
            a.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 50]
            };
            a.prototype.render = function() {
                var a = this.dataCur + (this.dataHeat - this.dataCur) / 8;
                1 > a && (a = 0);
                a != this.dataCur && (this.dataCur = a, this.dirty = !0);
                b.prototype.render.call(this)
            };
            n.exports = a
        }, {}],
        44: [function(f, n, m) {
            function a() {
                this.sprite = h.renderer.createSprite(h.layerTileGrid);
                this.sprite.setTexture(h.texTileGrid);
                this.sprite.size.x = 256;
                this.sprite.size.y =
                    256
            }
            var h = f(54);
            a.prototype.setToTile = function(a, e, d) {
                this.sprite.pos.x = (a - 1.5) * d;
                this.sprite.pos.y = (e - 1.5) * d
            };
            a.prototype.show = function(a) {
                this.sprite.visible = a
            };
            a.prototype.screenResize = function(a, e) {};
            n.exports = a
        }, {}],
        45: [function(f, n, m) {
            var a = f(38),
                h = f(132),
                b = [{
                    0: "fff763",
                    21: "fff307",
                    42: "c2bc00",
                    74: "c6d400",
                    100: "a49f00"
                }, {
                    0: "f2c83e",
                    21: "d6a70c",
                    42: "a58101",
                    74: "b6a100",
                    100: "8e6f00"
                }, {
                    0: "f18471",
                    21: "ed3919",
                    42: "c02102",
                    74: "d25400",
                    100: "a41b00"
                }, {
                    0: "fe2600",
                    41: "890000",
                    64: "160000",
                    100: "761400"
                }, {
                    0: "000000",
                    26: "1e1e1e",
                    70: "333333",
                    100: "000000"
                }];
            f = new function() {
                this.getTex = function(a, b) {
                    return this.createTex(a, b)
                };
                this.createTex = function(a, b) {
                    b = this.createCanvas(b);
                    return a.loadTextureFromImage(b)
                };
                this.createCanvas = function(e) {
                    var d = a.createCanvas(32, 32),
                        k = d.getContext("2d"),
                        c = h.getLevelRange(e),
                        g = k.createLinearGradient(0, 0, 0, 32),
                        f;
                    for (f in b[c]) g.addColorStop(f / 100, "#" + b[c][f]);
                    k.fillStyle = g;
                    c = 2;
                    g = [
                        [
                            [7, 2],
                            [2, 7],
                            [2, 2]
                        ],
                        [
                            [30, 7],
                            [25, 2],
                            [30, 2]
                        ],
                        [
                            [25, 30],
                            [30, 25],
                            [30, 30]
                        ],
                        [
                            [2, 25],
                            [7, 30],
                            [2,
                                30
                            ]
                        ]
                    ];
                    k.beginPath();
                    k.moveTo(g[0][0][0], g[0][0][1]);
                    for (f = 0; 4 > f; f++) {
                        var l = g[(f + 1) % 4];
                        k.lineTo(l[1][0], l[1][1]);
                        k.arcTo(l[2][0], l[2][1], l[0][0], l[0][1], 5)
                    }
                    k.lineWidth = c;
                    k.fill();
                    k.stroke();
                    k.closePath();
                    e = "" + e;
                    k.font = 1 == e.length ? "18px BangersKugeln" : "16px BangersKugeln";
                    c = k.measureText(e).width;
                    c = 16 - c / 2;
                    k.fillStyle = "#000";
                    k.fillText(e, c - 1, 21);
                    k.fillText(e, c - 1, 23);
                    k.fillText(e, c + 1, 21);
                    k.fillText(e, c + 1, 23);
                    k.fillStyle = "#fff";
                    k.fillText(e, c, 22);
                    return d
                }
            };
            n.exports = f
        }, {}],
        46: [function(f, n, m) {
            function a(a,
                b, c, d, e, g, l, k) {
                this.init(a, b, c, d, e, g, l, k)
            }
            var h = f(147),
                b = f(146).ItemTypes,
                e = f(131),
                d = f(38),
                k = f(156),
                c = f(17),
                g = f(54),
                q = f(37),
                l = f(91),
                p = f(55),
                A = f(28),
                y = f(60),
                x = f(88),
                w = f(92),
                B = f(31),
                r = f(33),
                z = f(32);
            a.prototype.baseTex = null;
            a.prototype.tileTex = [];
            a.prototype.objBaseTex = null;
            a.prototype.objTex = [];
            a.prototype.tileCanvas = [];
            a.prototype.shark = [];
            a.prototype.map = null;
            a.prototype.gameType = null;
            a.prototype.tileSize = 0;
            a.prototype.tileAtlasSize = null;
            a.prototype.dataTexSize = 0;
            a.prototype.mapAtlasTex = null;
            a.prototype.mapDataTex =
                null;
            a.prototype.mapSprite = null;
            a.prototype.flags = null;
            a.prototype.backgroundDef = null;
            a.prototype.backgroundTex = null;
            a.prototype.backgroundSprite = null;
            a.prototype.bgFx = null;
            a.prototype.ready = !1;
            a.prototype.init = function(a, b, c, d, e, l, f, n) {
                var m = this;
                this.tileSize = l;
                this.gameType = f;
                this.tileAtlasSize = 0;
                this.objectDef = e;
                this.sharks = [];
                this.map = new h(a, l);
                this.backgroundDef = A[a.bg];
                if (!y.get("lowGfx")) switch (a.bgFx) {
                    case "fog":
                        this.bgFx = new B;
                        break;
                    case "snow":
                        this.bgFx = new r;
                        break;
                    case "pollen":
                        this.bgFx =
                            new z
                }
                e = new p;
                e.add(this.baseTex = g.renderer.loadBaseTextureFromUrl(c));
                e.add(this.objBaseTex = g.renderer.loadBaseTextureFromUrl(d));
                e.add(this.backgroundImage = new Image);
                this.objTex = {};
                this.backgroundImage.src = k.Core.Util.getCompatibleImageUrl(m.backgroundDef.url) + "?v=" + kugelnVersion;
                e.done(function() {
                    var c = ~~(m.baseTex.width / l),
                        d = ~~(m.baseTex.height / l);
                    if (c != d) throw Error("Invalid texture size");
                    m.tileAtlasSize = c;
                    for (var e = 0; e < d; e++)
                        for (var f = 0; f < c; f++) {
                            var h = new k.Core.Rect(1 / c * f, 1 / d * e, 1 / c, 1 / d);
                            h = g.renderer.loadTextureFromBase(m.baseTex, h);
                            m.tileTex.push(h);
                            m.tileCanvas.push(m.createCanvasFromTileTex(h))
                        }
                    for (var p in m.objectDef.f) c = m.objectDef.f[p], h = new k.Core.Rect(c[0] / m.objectDef.w, c[1] / m.objectDef.h, c[2] / m.objectDef.w, c[3] / m.objectDef.h), m.objTex[p] = {
                        tex: g.renderer.loadTextureFromBase(m.objBaseTex, h)
                    };
                    m.baseTex.setFilter(!1);
                    m.mapAtlasTex = g.renderer.loadTextureFromBase(m.baseTex);
                    m.mapSprite = g.renderer.createSprite(g.layerMapTiles);
                    m.mapSprite.material = g.renderer.createMaterial(w);
                    m.mapSprite.setTexture(m.mapDataTex, 0);
                    m.mapSprite.setTexture(m.mapAtlasTex, 1);
                    m.blurBackground(m.backgroundDef.blur);
                    m.backgroundTex.setWrapMode(k.Trachyt2d.TEX_REPEAT, k.Trachyt2d.TEX_CLAMP);
                    m.backgroundSprite = g.renderer.createSprite(g.layerBackground);
                    m.backgroundSprite.material = g.renderer.createMaterial(x);
                    m.backgroundSprite.setTexture(m.backgroundTex);
                    p = m.backgroundDef.sky;
                    c = m.backgroundDef.fog;
                    m.backgroundSprite.material.setSkyColor(p[0][0], p[0][1], p[0][2], p[1][0], p[1][1], p[1][2]);
                    m.backgroundSprite.material.setFog(c[0],
                        c[1], c[2], m.backgroundDef.fogStart);
                    m.backgroundSprite.material.setBrightness(m.backgroundDef.brightness);
                    m.map.loadFromUrl(b, function() {
                        a.border ? m.mapSprite.material.setBorderColor(a.border[0], a.border[1], a.border[2], 255) : m.mapSprite.material.setBorderColor(0, 0, 0, 0);
                        var b = m.map.mapWidth,
                            c = m.map.mapHeight;
                        m.dataTexSize = 1 << Math.ceil(Math.log(Math.max(b, c)) / Math.log(2));
                        m.mapSprite.material.setMapSize(b, c, m.dataTexSize);
                        m.mapSprite.material.setAtlasEdgeSize(m.tileAtlasSize);
                        m.mapDataTex = g.renderer.createDataTexture(m.dataTexSize,
                            m.dataTexSize);
                        for (var d = 256 / m.tileAtlasSize, e = 0; e < m.map.mapHeight; e++)
                            for (var k = 0; k < m.map.mapWidth; k++) {
                                var f = m.map.map[e][k];
                                f && (f = f.tile - 1, m.mapDataTex.setPixel(k, e, f % m.tileAtlasSize * d, ~~(f / m.tileAtlasSize) * d, 0, 255))
                            }
                        m.bgFx && (m.bgFx instanceof B ? m.bgFx.init(g.layerBgFx, [-1E3, -1E3, b * l * .8 + 1E3, c * l * .8 + 1E3], a.bgFogIntensity) : m.bgFx instanceof r ? m.bgFx.init(g.layerBgFx, [-1E3, -1E3, b * l * .8 + 1E3, c * l * .8 + 1E3]) : m.bgFx instanceof z && m.bgFx.init(g.layerBgFx, [-1E3, -1E3, b * l * .8 + 1E3, c * l * .8 + 1E3]));
                        m.mapDataTex.update();
                        m.mapSprite.setTexture(m.mapDataTex, 0);
                        m.mapSprite.setTexture(m.mapAtlasTex, 1);
                        g.materialCompose.setWaterLevel(m.map.waterLevel);
                        m.createItemSprites();
                        m.createObjectSprites();
                        m.createSharks();
                        m.createFlagSprites();
                        m.createSpecials();
                        m.resize(q.width, q.height);
                        m.ready = !0;
                        n()
                    })
                }, function(a, b) {
                    var c = "unknown";
                    a && (a.src ? c = a.src : a.base && a.base._imgObject && a.base._imgObject.src && (c = a.base._imgObject.src.substr(250)));
                    "unknown" == c && b && b.src && (c = b.src);
                    throw Error("mapgfx loading error: " + c);
                })
            };
            a.prototype.update =
                function(a) {
                    var b = Date.now();
                    if (this.map.items)
                        for (var c = 0; c < this.map.items.length; c++) {
                            var d = this.map.items[c];
                            if (d.sprite)
                                if (d.active) {
                                    d.sprite.visible = !0;
                                    var e = (b / 1500 + d.x / 1.15 + d.y / 1.25) * Math.PI * 2;
                                    d.sprite.pos.x = ~~((d.x + .5) * this.map.tileSize + 3 * Math.cos(e));
                                    d.sprite.pos.y = ~~((d.y + .5) * this.map.tileSize + 3 * Math.sin(e));
                                    d.sprite.anchor.x = .5;
                                    d.sprite.anchor.y = .5
                                } else d.sprite.visible = !1
                        }
                    if (this.map.objects)
                        for (c = 0; c < this.map.objects.length; c++) d = this.map.objects[c], d.sprite && (d.active ? (d.animTime = 0,
                            d.sprite.visible = !0) : (e = Date.now() - d.animTime, 6E3 < e ? d.sprite.visible = !1 : (e /= 1E3, d.sprite.angle = (Math.cos(Math.min(1.2 * e, Math.PI)) + 3) * Math.PI * .5 * (0 == c % 2 ? 1 : -1), e = Math.max(0, e - 1.3), d.sprite.pos.x = d.renderPos[0], d.sprite.pos.y = d.renderPos[1] + e * e * 500)));
                    if (this.flags)
                        for (c = 0; c < this.flags.length; c++) this.flags[c].flagSprite.material.updateTime();
                    if (this.sharks)
                        for (c = 0; c < this.sharks.length; c++) this.updateShark(this.sharks[c], a);
                    this.bgFx && this.bgFx.update(b)
                };
            a.prototype.updateShark = function(a, b) {
                var c =
                    (65535 * a.rand + b / 1E3 * a.speed) % (2 * a.lineWidth),
                    d = 0;
                c > a.lineWidth && (d = 1, c = a.lineWidth - c % a.lineWidth);
                var e = (this.map.waterLevel - q.getCamera()[1]) / 50 / q.zoom;
                b = 10 * Math.sin(1E3 * a.rand + b * a.speed / 5E4);
                a.sprite.pos.x = c - a.lineBorder;
                a.sprite.pos.y = this.map.waterLevel + b - e + 10;
                a.sprite.size.x = Math.abs(a.sprite.size.x) * (d ? -1 : 1)
            };
            a.prototype.blurBackground = function(a) {
                var b = this.backgroundImage.width,
                    c = this.backgroundImage.height,
                    e = b >> 1,
                    l = d.createCanvas(2 * b, c),
                    k = l.getContext("2d");
                k.drawImage(this.backgroundImage,
                    0, 0);
                k.drawImage(this.backgroundImage, b, 0);
                0 < a && d.blurCanvas(l, a);
                a = d.createCanvas(b, c);
                k = a.getContext("2d");
                k.drawImage(l, e, 0, e, c, e, 0, e, c);
                k.drawImage(l, b, 0, e, c, 0, 0, e, c);
                this.backgroundTex = g.renderer.loadTextureFromImage(a)
            };
            a.prototype.createItemSprites = function() {
                for (var a = 0; a < this.map.items.length; a++) {
                    var c = this.map.items[a],
                        d = b[c.type],
                        e = null;
                    switch (d.texType) {
                        case 0:
                            switch (d.texId) {
                                case 0:
                                    e = g.texHeart;
                                    break;
                                case 1:
                                    e = g.texJetpackItem;
                                    break;
                                default:
                                    throw Error("Invalid tex id");
                            }
                            break;
                        case 1:
                            e =
                                g.texWeapons[d.texId]
                    }
                    if (e) c.sprite = g.renderer.createSprite(g.layerItems), c.sprite.setTexture(e), c.sprite.size.x = e.getWidth() * d.texScale, c.sprite.size.y = e.getHeight() * d.texScale;
                    else throw Error("Unknown item texture");
                }
            };
            a.prototype.createObjectSprites = function() {
                if (null != this.map.objects)
                    for (var a = 0; a < this.map.objects.length; a++) {
                        var b = this.map.objects[a],
                            c = this.map.objectMap[b.type],
                            d = this.objTex[c];
                        if (!d) throw Error("Unknown object " + c);
                        b.renderPos = [b.x * this.map.tileSize + d.tex.getWidth() / 2, (b.y +
                            1) * this.map.tileSize + 3];
                        b.sprite = g.renderer.createSprite(g.layerObjects);
                        b.sprite.setTexture(d.tex);
                        b.sprite.pos.x = b.renderPos[0];
                        b.sprite.pos.y = b.renderPos[1];
                        b.sprite.anchor.x = .5;
                        b.sprite.anchor.y = 1;
                        b.sprite.size.x = d.tex.getWidth();
                        b.sprite.size.y = d.tex.getHeight()
                    }
            };
            a.prototype.createSharks = function() {
                for (var a = this.map.mapWidth * this.map.tileSize + 6E3, b = ~~(a / 1E3), c = new e.DRandom(2725360529), d = 0; d < b; d++) {
                    var l = g.renderer.createSprite(g.layerSharks);
                    l.setTexture(g.texShark);
                    l.anchor.x = .5;
                    l.anchor.y =
                        1;
                    l.size.x = 1.6 * g.texShark.getWidth();
                    l.size.y = 1.6 * g.texShark.getHeight();
                    this.sharks.push({
                        rand: c.next(),
                        speed: 100 * c.next() + 200,
                        sprite: l,
                        lineBorder: 3E3,
                        lineWidth: a
                    })
                }
            };
            a.prototype.createFlagSprites = function() {
                if (null != this.map.flags && this.gameType.ctf) {
                    this.flags = [];
                    for (var a = 0; a < this.map.flags.length; a++) {
                        var b = g.renderer.createSprite(g.layerFlag0),
                            c = g.renderer.createSprite(g.layerFlag1);
                        b.material = g.renderer.createMaterial(l);
                        c.setTexture(g.texPole);
                        0 == a ? b.material.setColor(1, 0, 0) : b.material.setColor(0,
                            0, 1);
                        b.size.x = 96;
                        b.size.y = 96;
                        c.size.x = 128;
                        c.size.y = 128;
                        this.flags[a] = {
                            flagSprite: b,
                            poleSprite: c
                        }
                    }
                }
            };
            a.prototype.createSpecials = function() {
                function a(a, c) {
                    var d = g.renderer.createSprite(g.layerObjects);
                    d.setTexture(c.tex);
                    d.pos.x = a[0] * b.map.tileSize;
                    d.pos.y = a[1] * b.map.tileSize;
                    d.size.x = c.tex.getWidth();
                    d.size.y = c.tex.getHeight();
                    return d
                }
                for (var b = this, c = this.map.usables, d = 0; d < c.length; d++) {
                    var e = c[d];
                    switch (e.type) {
                        case "mg1":
                            e.gfxGun = a([0, 0], this.objTex.mg1_gun), e.gfxPod = a(e.pos, this.objTex.mg1_pod),
                                e.gfxGun.anchor.x = .5, e.gfxGun.anchor.y = .75, e.gfxGun.pos.x = (e.pos[0] + .5) * b.map.tileSize, e.gfxGun.pos.y = (e.pos[1] + .3) * b.map.tileSize
                    }
                }
            };
            a.prototype.setFlagPos = function(a, b, c) {
                this.flags[a].flagSprite.pos.x = b + 32;
                this.flags[a].flagSprite.pos.y = c - 64;
                this.flags[a].poleSprite.pos.x = b - 32;
                this.flags[a].poleSprite.pos.y = c - 64
            };
            a.prototype.createCanvasFromTileTex = function(a) {
                return a.toCanvas()
            };
            a.prototype.copyCanvas = function(a) {
                var b = d.createCanvas(a.width, a.height);
                b.getContext("2d").drawImage(a, 0, 0);
                return b
            };
            a.prototype.setCamera = function(a, b) {
                this.backgroundSprite && (g.layerBackground.offset.x = ~~a, g.layerBackground.offset.y = ~~b, this.backgroundSprite.size.x = g.camera.viewportSize.x, this.backgroundSprite.size.y = g.camera.viewportSize.y, this.backgroundSprite.material.setOffset(a / this.backgroundTex.getWidth() / 6, b / this.backgroundTex.getHeight() / 6 - .1), this.backgroundSprite.material.setScreenFactor(q.width / this.backgroundTex.getWidth(), q.height / this.backgroundTex.getHeight()), this.mapSprite.pos.x = ~~a, this.mapSprite.pos.y = ~~b, this.mapSprite.size.x = g.camera.viewportSize.x, this.mapSprite.size.y = g.camera.viewportSize.y, this.mapSprite.material.setOffset(~~a, ~~b), this.mapSprite.material.setScreenSize(g.camera.viewportSize.x, g.camera.viewportSize.y))
            };
            a.prototype.resize = function(a, b) {};
            a.prototype.stampOut = function(a, b) {
                for (var d = ~~((a[0] - b) / this.tileSize), e = ~~((a[0] + b) / this.tileSize), l = ~~((a[1] + b) / this.tileSize), k = !1, f = ~~((a[1] - b) / this.tileSize); f <= l; f++)
                    if (!(0 > f || f >= this.map.map.length))
                        for (var h = d; h <= e; h++)
                            if (!(0 > h ||
                                    h >= this.map.map[f].length)) {
                                var p = this.map.map[f][h];
                                if (p) {
                                    if (!p.modifiedTex) {
                                        if (p.isModified) continue;
                                        var q = this.copyCanvas(this.tileCanvas[p.tile - 1]);
                                        p.modifiedCtx = q.getContext("2d");
                                        p.modifiedCtx.imageSmoothingEnabled = !1
                                    }
                                    p.modifiedCtx.save();
                                    p.modifiedCtx.globalCompositeOperation = "destination-out";
                                    for (var x = ~~(a[0] - h * this.tileSize), y = ~~(a[1] - f * this.tileSize - b), A = Math.min(this.tileSize, ~~(y + 2 * b)), m = c[this.map.mapDef.tileset][p.tile].lock || null, n = Math.max(0, y); n <= A; n++) {
                                        var w = ~~(Math.cos(Math.asin((n -
                                                y - b) / b)) * b) + 1,
                                            r = Math.max(0, x - w),
                                            t = Math.min(this.tileSize, x + w);
                                        if (null == m) p.modifiedCtx.fillRect(r, n, t - r, 1);
                                        else {
                                            w = [];
                                            for (var B = 0; B < m.length; B++) n >= m[B][1] && n < m[B][3] && (w.push(m[B][0], m[B][2]), m[B][0] <= r && m[B][2] > r && (r = m[B][2]));
                                            for (;;) {
                                                var z = t,
                                                    D = t;
                                                for (B = 0; B < w.length; B += 2) w[B] < z && w[B] >= r && (z = w[B], D = w[B + 1]);
                                                z > r && p.modifiedCtx.fillRect(r, n, z - r, 1);
                                                r = D;
                                                if (D == t) break
                                            }
                                        }
                                    }
                                    p.modifiedCtx.restore();
                                    p.modifiedTex ? p.modifiedTex.update() : p.modifiedTex = g.renderer.loadTextureFromImage(q);
                                    p.isModified = !0;
                                    p.sprite ||
                                        (p.sprite = g.renderer.createSprite(g.layerMapTiles), p.sprite.setTexture(p.modifiedTex), p.sprite.pos.x = this.tileSize * h, p.sprite.pos.y = this.tileSize * f, p.sprite.size.x = this.tileSize, p.sprite.size.y = this.tileSize, this.mapDataTex.setPixel(h, f, 0, 0, 0, 0), k = !0)
                                }
                            }
                k && this.mapDataTex.update()
            };
            a.prototype.killPixels = function(a) {
                for (var b = a.length >> 1, c = 0; c < b; c++) {
                    var d = a[c << 1],
                        e = a[(c << 1) + 1],
                        l = ~~(d / this.tileSize),
                        k = ~~(e / this.tileSize),
                        f = this.map.map[k][l];
                    if (f) {
                        if (!f.modifiedTex) {
                            var h = this.copyCanvas(this.tileCanvas[f.tile -
                                1]);
                            f.modifiedCtx = h.getContext("2d");
                            f.modifiedCtx.imageSmoothingEnabled = !1
                        }
                        f.modifiedCtx.save();
                        f.modifiedCtx.globalCompositeOperation = "destination-out";
                        f.modifiedCtx.fillRect(d - l * this.tileSize, e - k * this.tileSize, 2, 2);
                        f.modifiedCtx.restore();
                        f.modifiedTex ? f.modifiedTex.update() : f.modifiedTex = g.renderer.loadTextureFromImage(h);
                        f.isModified = !0;
                        f.sprite.setTexture(f.modifiedTex)
                    }
                }
            };
            a.prototype.stampOutUsingTree = function() {
                function a(e, g, l) {
                    var k = e.size >> 1;
                    if (null != e.q0) a(e.q0, g, l), a(e.q1, g + k, l), a(e.q2,
                        g, l + k), a(e.q3, g + k, l + k);
                    else if (0 == e.value)
                        if (e.size < b.tileSize) {
                            var f = g >> 6,
                                h = l >> 6,
                                p = f << 6,
                                q = h << 6;
                            k = b.map[h][f];
                            if (!k) throw Error("Cannot find tile info: " + h + "\t" + f + "\t" + p + "\t" + q + "\t" + e.size + "\t" + b.tileSize); - 1 == d.indexOf(k) && (k.modifiedTex || (f = c.copyCanvas(c.tileCanvas[k.tile - 1]), k.modifiedCtx = f.getContext("2d"), k.modifiedCtx.imageSmoothingEnabled = !1), k.modifiedCtx.save(), k.modifiedCtx.globalCompositeOperation = "destination-out", d.push(k), k.isModified = !0);
                            k.modifiedCtx.fillRect(g - p, l - q, e.size, e.size)
                        } else
                            for (p =
                                g >> 6, g = g + e.size >> 6, e = l + e.size >> 6, h = l >> 6; h < e; h++)
                                if (!(0 > h || h >= b.map.length))
                                    for (f = p; f < g; f++) 0 > f || f >= b.map[h].length || !(k = b.map[h][f]) || (k.sprite && k.sprite.remove(), k.isModified = !0, c.mapDataTex.setPixel(f, h, 0, 0, 0, 0))
                }
                var b = this.map,
                    c = this;
                if (64 != b.tileSize) throw Error("Tile size out of sync");
                var d = [];
                a(b.quadTree.root, 0, 0);
                for (var e = 0; e < d.length; e++) {
                    var l = d[e];
                    l.modifiedCtx.restore();
                    l.modifiedTex ? l.modifiedTex.update() : l.modifiedTex = g.renderer.loadTextureFromImage(l.modifiedCtx.canvas);
                    l.sprite ||
                        (l.sprite = g.renderer.createSprite(g.layerMapTiles), l.sprite.setTexture(l.modifiedTex), l.sprite.pos.x = this.tileSize * l.x, l.sprite.pos.y = this.tileSize * l.y, l.sprite.size.x = this.tileSize, l.sprite.size.y = this.tileSize, this.mapDataTex.setPixel(l.x, l.y, 0, 0, 0, 0))
                }
                this.mapDataTex.update()
            };
            a.prototype.addBrick = function(a, b) {
                var c = this.map.map[b][a],
                    d = 256 / this.tileAtlasSize;
                if (c) c = c.tile - 1, this.mapDataTex.setPixel(a, b, c % this.tileAtlasSize * d, ~~(c / this.tileAtlasSize) * d, 0, 255), this.mapDataTex.update();
                else throw Error("Tile not set");
            };
            a.prototype.resetDamage = function() {
                for (var a = 256 / this.tileAtlasSize, b = 0; b < this.map.mapHeight; b++)
                    for (var c = 0; c < this.map.mapWidth; c++) {
                        var d = this.map.map[b][c];
                        if (d && d.isModified) {
                            d.sprite && (d.sprite.remove(), d.sprite = null);
                            d.modifiedTex = null;
                            var e = d.tile - 1;
                            this.mapDataTex.setPixel(c, b, e % this.tileAtlasSize * a, ~~(e / this.tileAtlasSize) * a, 0, 255);
                            d.isModified = !1
                        }
                    }
            };
            n.exports = a
        }, {}],
        47: [function(f, n, m) {
            function a(a, b, d, e, k) {
                this.extended = e;
                this.sizeBall = b;
                this.sizeTarget = d;
                this.customization = k;
                this.sprite =
                    null;
                this.targetCanvas = a;
                this.skinSprites = [];
                this.eyeRotationStrength = this.eyeStrength = this.eye = this.angle = 0;
                this.ballType = this.getBallType(k.ball);
                this.hideEye = !1;
                this.dirty = !0;
                this.init()
            }
            var h = f(54),
                b = f(35),
                e = f(152),
                d = f(87),
                k = f(125);
            f(95);
            a.prototype.init = function() {
                if (0 == b.getLoadingStage()) throw Error("Flags not loaded yet");
                var a = b.getTex(this.customization.ball);
                this.sprite = h.renderer.createSprite(h.layerPreview);
                this.sprite.setTexture(h.texBallPath, 0);
                this.sprite.setTexture(a, 1);
                this.sprite.setTexture(h.texEyes,
                    2);
                this.sprite.anchor.x = .5;
                this.sprite.anchor.y = .5;
                this.sprite.size.x = this.sizeBall;
                this.sprite.size.y = this.sizeBall;
                this.sprite.visible = !1;
                this.sprite.material = h.renderer.createMaterial(d, {
                    type: this.ballType
                });
                this.sprite.material.setFlagTex(a);
                this.sprite.material.setFlagInverted(b.isInverted(this.customization.ball));
                for (a = 0; a < e.length; a++) 0 == e[a].special ? (this.skinSprites[a] = h.renderer.createSprite(h.layerPreview), this.skinSprites[a].anchor.x = .5, this.skinSprites[a].anchor.y = .5, this.skinSprites[a].visible = !1) : this.skinSprites[a] = null;
                this.setViewingDirection(0, 1.2);
                this.setCustomization(this.customization)
            };
            a.prototype.setCustomization = function(a) {
                this.customization = a;
                var c = b.getTex(this.customization.ball);
                this.ballType = this.getBallType(a.ball);
                this.hideEye = !1;
                this.dirty = !0;
                this.sprite.setTexture(c, 1);
                this.sprite.material = h.renderer.createMaterial(d, {
                    type: this.ballType
                });
                this.sprite.material.setFlagTex(c);
                this.sprite.material.setFlagInverted(b.isInverted(a.ball));
                for (c = 0; c < e.length; c++) {
                    var k = a[e[c].name];
                    if (0 == e[c].special) 0 == k ? this.skinSprites[c].setTexture(null) : (k = h.texSkins[c][k - 1], this.skinSprites[c].setTexture(k));
                    else if (1 == e[c].special)
                        if (0 == k) this.sprite.material.setGlassesTex(null), this.sprite.setTexture(h.renderer.nullTexture, 3);
                        else {
                            var l = e[c].list[k - 1].noEye || !1;
                            k = h.texSkins[c][k - 1];
                            l && (this.hideEye = !0);
                            this.sprite.material.setGlassesTex(k);
                            this.sprite.setTexture(k, 3)
                        }
                }
                this.setEye(this.eye)
            };
            a.prototype.setEye = function(a) {
                this.eye == a && (this.eye = a, this.dirty = !0);
                var b = a % 4;
                a = ~~(a / 4);
                this.hideEye &&
                    (a = b = -1);
                this.sprite.material.setEyeTexOffset(b, a)
            };
            a.prototype.setRenderPos = function(a, b) {
                a = this.sizeTarget / 2 + a;
                b = this.sizeTarget / 2 + b + (this.extended ? .3 * this.sizeBall : 0);
                if (this.sprite.pos.x != a || this.sprite.pos.y != b) this.sprite.pos.x = a, this.sprite.pos.y = b, this.dirty = !0;
                b = 1;
                Math.abs(this.angle) > Math.PI / 2 && (b = -1);
                for (a = 0; a < e.length; a++) {
                    var c = this.customization[e[a].name];
                    if (0 < c && null != this.skinSprites[a]) {
                        var d = e[a].list[c - 1];
                        c = h.texSkins[a][c - 1];
                        this.skinSprites[a].pos.x = this.sprite.pos.x + d.x * this.sizeBall *
                            b;
                        this.skinSprites[a].pos.y = this.sprite.pos.y + d.y * this.sizeBall;
                        this.skinSprites[a].size.x = d.scale * c.getWidth() / 128 * this.sizeBall * b;
                        this.skinSprites[a].size.y = d.scale * c.getHeight() / 128 * this.sizeBall
                    }
                }
            };
            a.prototype.setViewingDirection = function(a, b, d) {
                var c = Math.PI / 2,
                    e = a;
                if (this.angle != a || this.eyeStrength != b || this.eyeRotationStrength != d) this.dirty = !0;
                this.eyeStrength = b;
                this.eyeRotationStrength = d;
                this.angle = a;
                e > c && (e = -(Math.PI - e));
                e < -c && (e = Math.PI + e);
                e *= .15 * d;
                this.sprite.material.setEyeOffset(.06 * Math.cos(a) *
                    b, .04 * Math.sin(a) * b);
                this.sprite.material.setEyeRotation(e, e)
            };
            a.prototype.getBallType = function(a) {
                for (var b = 0; b < k.length; b++)
                    if (k[b].c == a) {
                        if (k[b].t) return k[b].t;
                        break
                    }
                return 0
            };
            a.prototype.render = function() {
                if (this.dirty) {
                    this.dirty = !1;
                    this.sprite.visible = !0;
                    for (var a = 0; a < this.skinSprites.length; a++) this.skinSprites[a] && null != this.skinSprites[a].getTexture() && (this.skinSprites[a].visible = !0);
                    this.setRenderPos(0, 0);
                    h.renderer.setClearColor(0, 0, 0, 0);
                    h.renderer.renderSeparateScene(h.scenePreview,
                        this.targetCanvas, this.targetCanvas.width, this.targetCanvas.height);
                    this.sprite.visible = !1;
                    for (a = 0; a < this.skinSprites.length; a++) this.skinSprites[a] && (this.skinSprites[a].visible = !1)
                }
            };
            n.exports = a
        }, {}],
        48: [function(f, n, m) {
            function a(a) {
                this.size = a;
                this.list = [];
                this.currentY = this.currentX = 0;
                this.canvas = document.createElement("canvas")
            }
            var h = f(54);
            f(55);
            f(35);
            f(87);
            var b = f(156),
                e = f(95);
            a.prototype.reset = function() {
                this.list = [];
                this.currentY = this.currentX = 0
            };
            a.prototype.add = function(a) {
                if (a.sizeBall !=
                    this.size) throw Error("Invalid menu ball size");
                if (this.currentX + 2 * this.size > e.width) {
                    if (this.currentY + 2 * this.size > e.height) return !1;
                    this.currentY += this.size;
                    this.currentX = 0
                } else this.currentX += this.size;
                this.list.push(a);
                a.setRenderPos(this.currentX, this.currentY);
                return !0
            };
            a.prototype.render = function(a) {
                function d() {
                    for (var b = 0; b < c.list.length; b++) {
                        var d = c.list[b].sprite.pos.x,
                            e = c.list[b].sprite.pos.y,
                            g = c.list[b].sizeTarget;
                        c.list[b].sprite.visible = !1;
                        c.list[b].targetCanvas.getContext("2d").drawImage(f,
                            d - g / 2, e - g / 2, c.size, c.size, 0, 0, c.size, c.size)
                    }
                    a()
                }
                var c = this;
                if (0 != this.list.length) {
                    this.canvas.width = e.width;
                    this.canvas.height = e.height;
                    for (var g = 0; g < this.list.length; g++) this.list[g].sprite.visible = !0;
                    h.renderer.setClearColor(0, 0, 0, 0);
                    h.renderer.renderSeparateScene(h.scenePreview, this.canvas, this.canvas.width, this.canvas.height);
                    var f = this.canvas;
                    b.Core.Util.isChrome() ? (f = new Image, f.src = this.canvas.toDataURL(), f.complete ? d() : f.onload = d) : d()
                }
            };
            n.exports = a
        }, {}],
        49: [function(f, n, m) {
            function a() {
                this.targetCanvas =
                    null;
                this.size = 0;
                this.mirror = !1;
                this.pos = [0, 0];
                this.poleSprite = this.flagSprite = null
            }
            var h = f(54),
                b = f(91);
            a.prototype.init = function(a, d) {
                var e = h.renderer.createSprite(h.layerPreview),
                    c = h.renderer.createSprite(h.layerPreview);
                e.material = h.renderer.createMaterial(b);
                c.setTexture(h.texPole);
                e.size.x = .75 * d;
                e.size.y = .75 * d;
                c.size.x = d;
                c.size.y = d;
                e.visible = !1;
                c.visible = !1;
                this.targetCanvas = a;
                this.flagSprite = e;
                this.poleSprite = c;
                this.size = d
            };
            a.prototype.setTeam = function(a) {
                0 == a ? this.flagSprite.material.setColor(1,
                    0, 0) : this.flagSprite.material.setColor(0, 0, 1)
            };
            a.prototype.setPos = function(a, b, k) {
                this.mirror = k | 0;
                this.pos = [a, b];
                k = .25 * this.size;
                var c = .5 * this.size;
                this.flagSprite.pos.x = a + k;
                this.flagSprite.pos.y = b - c;
                this.poleSprite.pos.x = a - k;
                this.poleSprite.pos.y = b - c;
                this.flagSprite.anchor.x = this.mirror ? 1 : 0;
                this.flagSprite.material.mirror = this.mirror
            };
            a.prototype.render = function() {
                this.flagSprite.visible = !0;
                this.poleSprite.visible = !0;
                h.renderer.setClearColor(0, 0, 0, 0);
                h.renderer.renderSeparateScene(h.scenePreview,
                    this.targetCanvas, this.targetCanvas.width, this.targetCanvas.height);
                this.flagSprite.visible = !1;
                this.poleSprite.visible = !1
            };
            n.exports = a
        }, {}],
        50: [function(f, n, m) {
            f = {
                tex: 2,
                emitterLifeTime: 2,
                particleLifeTime: 150,
                scattering: 2 * Math.PI,
                perStep: 10,
                size: 100,
                speed: [2, 5],
                rotSpeed: [-.1, .1],
                damping: [.03, .05],
                fadeOut: .05,
                color: [.1, .1, .1, .5]
            };
            m = {
                tex: 2,
                emitterLifeTime: 1,
                particleLifeTime: 200,
                scattering: .5,
                perStep: 1,
                size: 100,
                speed: [1, 2],
                rotSpeed: [-.02, .02],
                damping: [.01, .03],
                fadeOut: .02,
                color: [.1, .1, .1, .2]
            };
            n.exports = {
                impactWater1: [{
                    tex: 1,
                    emitterLifeTime: 1,
                    particleLifeTime: 40,
                    scattering: .2,
                    perStep: 160,
                    size: 10,
                    speed: [1, 40],
                    rotSpeed: [-.5, .5],
                    damping: [.15, .2],
                    fadeOut: .15,
                    color: [.6, .7, .9, 1]
                }],
                impactWater2: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 100,
                    scattering: 1.2,
                    perStep: 300,
                    size: 70,
                    speed: [1, 20],
                    rotSpeed: [-.05, .05],
                    damping: [.05, .07],
                    fadeOut: .08,
                    color: [.6, .7, .9, 1]
                }],
                impactWater3: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 100,
                    scattering: 1.5,
                    perStep: 300,
                    size: 90,
                    speed: [1, 30],
                    rotSpeed: [-.05, .05],
                    damping: [.05, .07],
                    fadeOut: .08,
                    color: [.6, .7, .9, 1]
                }, f],
                impactGround1: [{
                    tex: 1,
                    emitterLifeTime: 2,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 12,
                    size: 20,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.03, .05],
                    fadeOut: .1,
                    color: [.5, .5, .5, .6]
                }],
                impactGround2: [{
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 10,
                    size: 70,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.03, .05],
                    fadeOut: .05,
                    color: [.1, .1, .1, .5]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 60,
                    speed: [5, 7],
                    rotSpeed: [-.1, .1],
                    damping: [.1, .2],
                    fadeOut: .1,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 20,
                    scattering: 2 * Math.PI,
                    perStep: 2,
                    size: 60,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .13,
                    color: [.8, .8, .1, .7]
                }],
                impactGround3: [f, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 45,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 90,
                    speed: [7, 10],
                    rotSpeed: [-.1, .1],
                    damping: [.1, .2],
                    fadeOut: .1,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 40,
                    scattering: 2 * Math.PI,
                    perStep: 2,
                    size: 90,
                    speed: [2, 5],
                    rotSpeed: [-.1,
                        .1
                    ],
                    damping: [.05, .07],
                    fadeOut: .13,
                    color: [.8, .8, .1, .7]
                }],
                patronEject: [{
                    tex: 0,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: .5,
                    perStep: 1,
                    size: 14,
                    speed: [5, 7],
                    initRot: 1.8,
                    initAngle: 0,
                    rotSpeed: [-0, 0],
                    damping: [0, 0],
                    gravity: [0, .6],
                    fadeOut: .06,
                    color: [.8, .8, 0, 1]
                }],
                collectHeart: [{
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 30,
                    speed: [1, 5],
                    initRot: 0,
                    initAngle: -1.57,
                    rotSpeed: [-.2, .2],
                    damping: [0, .4],
                    gravity: [0, -.4],
                    fadeOut: .13,
                    color: [1, 0, 0, 1]
                }],
                death: [{
                    tex: 4,
                    emitterLifeTime: 1,
                    particleLifeTime: 50,
                    scattering: 0,
                    perStep: 1,
                    size: 110,
                    speed: 7,
                    initRot: 0,
                    initAngle: -1.57,
                    rotSpeed: 0,
                    damping: 0,
                    gravity: [0, 0],
                    fadeOut: .08,
                    color: [1, 1, 1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 20,
                    size: 70,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.02, .04],
                    fadeOut: .06,
                    color: [1, 1, 1, .3]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 70,
                    speed: [1, 2],
                    rotSpeed: [-.1, .1],
                    damping: [.02, .04],
                    fadeOut: .06,
                    color: [1, 1, 1, .3]
                }],
                hydrant1: [{
                    tex: 2,
                    emitterLifeTime: 170,
                    particleLifeTime: 100,
                    scattering: .3,
                    perStep: 20,
                    size: 30,
                    speed: [10, 20],
                    rotSpeed: [-.05, .05],
                    damping: [.04, .04],
                    fadeOut: .1,
                    gravity: [0, .1],
                    color: [.6, .7, .9, 1]
                }],
                planeFire: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 40,
                    scattering: 2,
                    perStep: 3,
                    size: 50,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .1,
                    color: [.1, .1, .1, .5]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: 2,
                    perStep: 5,
                    size: 50,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .15,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: 1,
                    perStep: 2,
                    size: 50,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .2,
                    color: [.8, .8, .1, .5]
                }, m],
                planeSmoke: [m],
                jetpack: [{
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 10,
                    scattering: 0,
                    perStep: 3,
                    size: 40,
                    speed: [10, 20],
                    rotSpeed: [-.02, .02],
                    damping: [.01, .03],
                    fadeOut: .2,
                    color: [.5, .7, 1, .8]
                }, {
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 8,
                    scattering: 0,
                    perStep: 1,
                    size: 30,
                    speed: [10, 15],
                    rotSpeed: [-.02, .02],
                    damping: [.01, .03],
                    fadeOut: .3,
                    color: [1, 1, 1, 1]
                }]
            }
        }, {}],
        51: [function(f, n, m) {
            function a(a,
                b, d) {
                this.emittedCount = 0;
                this.step = function(c, e, g, k) {
                    if (d.emitterLifeTime < c) return !1;
                    for (c = ~~(c * d.perStep); this.emittedCount < c;) a.createParticle(b, e, g, k, d), this.emittedCount++;
                    return !0
                }
            }

            function h(b, c, d, e) {
                this.a = this.y = this.x = 0;
                this.emitter = [];
                this.startTick = e;
                this.step = function(a) {
                    for (var b = [], c = 0; c < this.emitter.length; c++) this.emitter[c].step(a - this.startTick, this.x, this.y, this.a) || b.push(this.emitter[c]);
                    for (; 0 < b.length;) a = this.emitter.indexOf(b.pop()), this.emitter.splice(a, 1);
                    return 0 < this.emitter.length
                };
                for (e = 0; e < d.length; e++) {
                    var l = new a(b, c, d[e]);
                    this.emitter.push(l)
                }
            }
            var b = f(50),
                e = f(54),
                d = f(93);
            n.exports = function() {
                function a(a) {
                    if (void 0 === a) return 0;
                    Array.isArray(a) && (a = a[0] + Math.random() * (a[1] - a[0]));
                    return a
                }
                this.material = null;
                this.particles = [];
                this.runningFx = [];
                this.startTime = Date.now();
                this.tick = 0;
                this.create = function(a, d, e, l, k) {
                    k = k || 0;
                    a = new h(this, a, b[d], this.tick);
                    a.x = e;
                    a.y = l;
                    a.a = k;
                    this.runningFx.push(a);
                    return a
                };
                this.createParticle = function(b, g, k, l, f) {
                    null == this.material && (this.material =
                        e.renderer.createMaterial(d));
                    b = e.renderer.createSprite(b);
                    b.anchor.x = .5;
                    b.anchor.y = .5;
                    b.pos.x = g;
                    b.pos.y = k;
                    b.size.x = f.size;
                    b.size.y = f.size;
                    b.angle = void 0 !== f.initRot ? f.initRot + l : Math.random() * Math.PI * 2;
                    b.material = this.material;
                    b.setTexture(e.texParticles[f.tex]);
                    g = l + a(f.initAngle) + (Math.random() - .5) * f.scattering;
                    k = a(f.speed);
                    k = [Math.cos(g) * k, Math.sin(g) * k];
                    l = [0, 0];
                    void 0 !== f.gravity && (l = f.gravity.slice());
                    f = {
                        sprite: b,
                        start: this.tick,
                        end: this.tick + f.particleLifeTime,
                        angle: g,
                        speed: k,
                        gravity: l,
                        rotSpeed: a(f.rotSpeed),
                        damping: a(f.damping),
                        fadeOut: a(f.fadeOut),
                        color: f.color.slice()
                    };
                    this.particles.push(f)
                };
                this.step = function() {
                    for (var a = [], b = 0; b < this.runningFx.length; b++) this.runningFx[b].step(this.tick) || a.push(this.runningFx[b]);
                    var d = [];
                    for (b = 0; b < this.particles.length; b++) this.stepParticle(this.particles[b]) || d.push(this.particles[b]);
                    for (; 0 < a.length;) b = this.runningFx.indexOf(a.pop()), this.runningFx.splice(b, 1);
                    for (; 0 < d.length;) b = this.particles.indexOf(d.pop()), this.particles.splice(b, 1)
                };
                this.stepParticle = function(a) {
                    if (this.tick >=
                        a.end) return a.sprite && (a.sprite.remove(), a.sprite = null), !1;
                    a.sprite.pos.x += a.speed[0];
                    a.sprite.pos.y += a.speed[1];
                    a.sprite.angle += a.rotSpeed;
                    a.speed[0] *= 1 - a.damping;
                    a.speed[1] *= 1 - a.damping;
                    a.speed[0] += a.gravity[0];
                    a.speed[1] += a.gravity[1];
                    a.color[3] *= 1 - a.fadeOut;
                    a.color[3] = Math.min(1, Math.max(a.color[3], 0));
                    a.sprite.color[0] = a.color[0];
                    a.sprite.color[1] = a.color[1];
                    a.sprite.color[2] = a.color[2];
                    a.sprite.color[3] = a.color[3];
                    return !0
                };
                this.update = function() {
                    for (var a = (Date.now() - this.startTime) / 1E3 * 60; this.tick <
                        a;) this.step(), this.tick++
                }
            }
        }, {}],
        52: [function(f, n, m) {
            function a() {
                this.state = 0;
                this.lastPos = this.lastAngle = null;
                this.propSprite = h.renderer.createSprite(h.layerPlane);
                this.propSprite.size.x = 128;
                this.propSprite.size.y = 128;
                this.propSprite.anchor.x = .5;
                this.propSprite.anchor.y = .5;
                this.propSprite.setTexture(h.texPropeller);
                this.sprite = h.renderer.createSprite(h.layerPlane);
                this.sprite.size.x = 512;
                this.sprite.size.y = 256;
                this.sprite.anchor.x = .5;
                this.sprite.anchor.y = .5;
                this.sprite.setTexture(h.texPlane)
            }
            var h =
                f(54);
            f(37);
            a.prototype.setPos = function(a, e, d) {
                this.lastAngle = d;
                this.lastPos = [a, e];
                this.propSprite.angle = d;
                this.sprite.angle = d;
                this.propSprite.pos.x = a + 252.34 * Math.cos(d + .10322);
                this.propSprite.pos.y = e + 252.34 * Math.sin(d + .10322);
                this.sprite.pos.x = a;
                this.sprite.pos.y = e
            };
            a.prototype.setState = function(a) {
                this.state = a
            };
            a.prototype.animate = function() {
                var a = Math.floor(Date.now() / 20);
                this.propSprite.size.y = Math.abs(this.propSprite.size.y) * (0 == a % 2 ? -1 : 1);
                0 != this.state && h.particles.create(h.layerParticlesBg,
                    2 == this.state ? "planeFire" : "planeSmoke", this.lastPos[0] + 220 * Math.cos(this.lastAngle + .10322), this.lastPos[1] + 220 * Math.sin(this.lastAngle + .10322), this.lastAngle + Math.PI)
            };
            a.prototype.remove = function() {
                this.propSprite.remove();
                this.sprite.remove()
            };
            n.exports = a
        }, {}],
        53: [function(f, n, m) {
            var a = f(15),
                h = f(36),
                b = f(60);
            n.exports = function(e) {
                this.load = function(b, k, c) {
                    c = c || {};
                    if (!a[k]) throw Error("Unknown shader " + k);
                    var d = "",
                        f;
                    for (f in c) d = "#define " + f + " " + c[f] + "\r\n";
                    d += a[k];
                    return e.loadShader(b, d)
                };
                this.loadFull =
                    function(a, b, c) {
                        return new h(a, b, c)
                    };
                this.solveFullShader = function(a) {
                    return a.variants.lowGfx && this.useLowGfx() ? a.variants.lowGfx : a.variants.normal
                };
                this.useLowGfx = function() {
                    return b.get("lowGfx") ? !0 : !1
                }
            }
        }, {}],
        54: [function(f, n, m) {
            n.exports = new function() {
                this.texBackground = this.texShark = this.texPropeller = this.texPlane = this.texTileGrid = this.texWarn = this.texCup = this.texPole = this.texGibbet = this.texHeart = this.texBaseCommon = this.texWeapons = this.texBaseWeapons = this.texFog = this.texParticles = this.texBaseParticles =
                    this.texSkins = this.texBaseSkins = this.texBullets = this.texBaseBullets = this.texFlags = this.texRope = this.texEyes = this.texBallPath = this.materialCompose = this.materialBlast = this.shaderParticle = this.shaderCompose = this.shaderBlast = this.shaderFlag = this.shaderMap = this.shaderBg = this.shaderBall = this.layerPreview = this.layerMenuParticles = this.layerPostProcBlast = this.layerPostProcWater = this.layerParticlesBg = this.layerPlane = this.layerNicknames = this.layerTileGrid = this.layerParticles = this.layerSharks = this.layerItems =
                    this.layerBallSkins = this.layerBalls = this.layerFlag1 = this.layerFlag0 = this.layerMapTiles = this.layerWeapons = this.layerBullets = this.layerRopes = this.layerJetpacks = this.layerObjects = this.layerBgFx = this.layerBackground = this.scenePreview = this.sceneMenu = this.flowUpdateCb = this.gameUpdateCb = this.particles = this.ui = this.mapGfx = this.shaderHelper = this.camera = this.renderer = null;
                this.frameCounter = 0;
                this.reset = function() {}
            }
        }, {}],
        55: [function(f, n, m) {
            f(166);
            n.exports = function() {
                var a = [],
                    f = !1,
                    b = !1;
                this.add = function(e) {
                    if (f ||
                        b) throw Error("Add too late");
                    if (-1 != a.indexOf(e)) throw Error("Duplicate add");
                    a.push(e)
                };
                this.done = function(e, d) {
                    function k() {
                        var c = a.indexOf(this);
                        if (-1 == c) throw Error("Unknown item; ", this);
                        a.splice(c, 1);
                        0 == a.length && (b = !0, f = !1, e())
                    }

                    function c(a) {
                        d && d(this, a)
                    }
                    if (f || b) throw Error("Double loader execute");
                    f = !0;
                    for (var g = 0; g < a.length; g++) {
                        var h = a[g];
                        h instanceof Image ? h.complete ? setTimeout(k.bind(h), 0) : (h.onload = k.bind(h), h.onerror = c.bind(h)) : (h.onLoad(k.bind(h)), h.onError(c.bind(h)))
                    }
                }
            }
        }, {}],
        56: [function(f,
            n, m) {
            var a = f(37),
                h = f(25),
                b = f(76),
                e = f(24),
                d = f(59),
                k = f(86),
                c = f(27),
                g = f(26),
                q = f(80),
                l = f(79),
                p = f(75),
                A = f(14);
            window.onload = function() {
                console.log("%cSTOP", "color: red; font-size: 100px; font-weight: bold;");
                console.log("%cDON'T ENTER ANY CODE HERE", "color: #fff; font-size: 30px; font-weight: bold; background-color: #000;");
                console.log("%cSOMEONE TRIES TO HACK YOU", "color: #000; font-size: 30px; font-weight: bold;");
                console.log("%cHackers are trying to convince you to enter codes here. But this just gives them access to YOUR stuff.",
                    "color: #000; font-size: 20px; font-weight: bold;");
                console.log("%cSTOP", "color: red; font-size: 100px; font-weight: bold;");
                if (WebSocket) {
                    new e;
                    k.loadBank("/sfx.ogg?v=" + kugelnVersion, A);
                    var f = window.location.port;
                    b.init(("http:" == window.location.protocol ? "ws://" : "wss://") + window.location.hostname + (f ? ":" + f : ""));
                    b.onState(function(a, b) {
                        b && d.show(2)
                    });
                    b.onVersionError(function() {
                        h.switchTo("matchError", {
                            code: 101,
                            msg: "Invalid version"
                        });
                        d.hide()
                    });
                    l.init();
                    q.init();
                    c.init();
                    g.init();
                    p.init();
                    a.init(function() {
                        a.onError(function(a) {
                            h.switchTo("matchError",
                                a)
                        });
                        h.init();
                        l.setGameReady()
                    });
                    d.show(0)
                } else document.body.querySelector(".lowlevelerror").style.display = "block", document.getElementById("game").style.display = "none"
            }
        }, {}],
        57: [function(f, n, m) {
            var a = null,
                h = new function() {
                    function b(a) {
                        switch (a) {
                            case 1:
                                return h.MOUSE_LEFT;
                            case 2:
                                return h.MOUSE_MIDDLE;
                            case 3:
                                return h.MOUSE_RIGHT
                        }
                        return h.MOUSE_UNKNOWN
                    }

                    function e(a) {
                        k(a.target) || (a = window.event || a, y += Math.max(-1, Math.min(1, a.wheelDelta || -a.detail)), c(a.target, "nativeScroll") && 1 != a.ctrlKey || a.preventDefault())
                    }

                    function d(a) {
                        return c(a, "nativeInput")
                    }

                    function k(a) {
                        return c(a, "blockGameInput")
                    }

                    function c(a, b) {
                        for (; a && a != document;) {
                            if (!a.classList) throw Error("Classlist not set " + a.constructor.name);
                            if (a.classList.contains(b)) return !0;
                            a = a.parentElement
                        }
                        return !1
                    }
                    var g = {},
                        q = {},
                        l = [],
                        p = [],
                        A = [],
                        y = 0;
                    this.MOUSE_UNKNOWN = -1024;
                    this.MOUSE_LEFT = -1025;
                    this.MOUSE_MIDDLE = -1026;
                    this.MOUSE_RIGHT = -1027;
                    this.isDown = function(a) {
                        return "undefined" != typeof g[a] ? g[a] : !1
                    };
                    this.isHit = function(a) {
                        return "undefined" != typeof q[a] && q[a] ?
                            (q[a] = !1, !0) : !1
                    };
                    this.addPreventDefault = function(a) {
                        -1 == A.indexOf(a) && A.push(a)
                    };
                    this.getMousePos = function() {
                        return l
                    };
                    this.getAbsoluteMousePos = function() {
                        return p
                    };
                    this.getScrollDelta = function() {
                        var a = y;
                        y = 0;
                        return a
                    };
                    document.addEventListener("keydown", function(a) {
                        k(a.target) || (d(a.target) || -1 != A.indexOf(a.which) && a.preventDefault(), g[a.which] || (q[a.which] = !0), g[a.which] = !0)
                    }, !1);
                    document.addEventListener("keyup", function(a) {
                        d(a.target) || -1 != A.indexOf(a.which) && a.preventDefault();
                        return g[a.which] = !1
                    }, !1);
                    document.addEventListener("mousedown", function(a) {
                        k(a.target) || (d(a.target) || a.preventDefault(), a = b(a.which), g[a] || (q[a] = !0), g[a] = !0)
                    }, !1);
                    document.addEventListener("mouseup", function(a) {
                        d(a.target) || a.preventDefault();
                        a = b(a.which);
                        g[a] = !1
                    }, !1);
                    document.addEventListener("mousemove", function(b) {
                        a || (a = f(37));
                        var c = a;
                        l = [(b.clientX - c.width / 2) / c.height, (b.clientY - c.height / 2) / c.height];
                        p = [b.clientX, b.clientY]
                    }, !1);
                    document.addEventListener("DOMMouseScroll", e, !1);
                    document.addEventListener("mousewheel",
                        e, !1);
                    document.addEventListener("contextmenu", function(a) {
                        a.preventDefault()
                    }, !1)
                };
            n.exports = h
        }, {}],
        58: [function(f, n, m) {
            f(54);
            var a = f(131);
            n.exports = new function() {
                this.messages = ['Press and hold <span class="key">A</span> or <span class="key">D</span> to walk', 'Press <span class="key">SPACE</span> to jump', '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><path d="M29 999.4l.02 29.06-19.17.04c-.35-12.56 6.3-28.56 19.15-29.1z" fill="#fff" fill-rule="evenodd"/><rect width="54.67" height="114.27" x="5.72" y="994.05" ry="31.39" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1032.18h54.35" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M32.14 994.33l.08 37.46" fill="none" stroke="#fff" stroke-width="2"/></g></svg></div> <div class="mouseTxt">left mouse button to shoot</div>',
                    '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><path d="M35.86 999.4l-.02 29.06 19.17.04c.37-12.56-6.3-28.56-19.13-29.1z" fill="#fff" fill-rule="evenodd"/><rect width="54.67" height="114.27" x="5.72" y="994.05" ry="31.39" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1032.18h54.35" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M32.14 994.33l.08 37.46" fill="none" stroke="#fff" stroke-width="2"/></g></svg></div> <div class="mouseTxt">right mouse button to use rope</div>',
                    '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><rect width="54.67" height="114.27" x="5.72" y="1000.05" ry="31.39" fill="none" stroke="#7b7b7b" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1038.18h54.35" fill="none" stroke="#7b7b7b" stroke-width="3.2"/><path d="M32.14 1000.33l.08 37.46" fill="#b2b2b2" fill-rule="evenodd" stroke="#7b7b7b" stroke-width="2"/><rect width="8" height="22" x="28" y="1008.36" ry="3.67" fill="#f9f9f9" fill-rule="evenodd"/><path d="M32 988.36l6 7 6 7H20l6-7zm0 60l6-7 6-7H20l6 7z" fill="red" fill-rule="evenodd"/></g></svg></div> <div class="mouseTxt">Use scroll wheel to change weapon</div>'
                ];
                this.active = [];
                this.visible = !1;
                for (var f = 0; f < this.messages.length; f++) this.active.push(!0);
                this.set = function(a) {
                    this.active[a] = !1;
                    this.show(this.visible)
                };
                this.show = function(a) {};
                this.getFirstActive = function() {
                    if (a.getArg("mc")) return null;
                    for (var b = 0; b < this.active.length; b++)
                        if (this.active[b]) return b;
                    return null
                }
            }
        }, {}],
        59: [function(f, n, m) {
            var a = f(54);
            n.exports = new function() {
                this.show = function(f, b) {
                    var e = null;
                    switch (f) {
                        case 0:
                            e = a.ui.loading0Widget;
                            break;
                        case 1:
                            e = a.ui.loading1Widget;
                            break;
                        case 2:
                            e =
                                a.ui.maintenanceWidget
                    }
                    e.setData && e.setData(b);
                    e.setActive(!0)
                };
                this.hide = function() {
                    a.ui.loading0Widget.setActive(!1);
                    a.ui.loading1Widget.setActive(!1);
                    a.ui.maintenanceWidget.setActive(!1)
                }
            }
        }, {}],
        60: [function(f, n, m) {
            n.exports = new function() {
                var a = {};
                this.set = function(f, b) {
                    a[f] = b;
                    if ("undefined" !== typeof Storage) try {
                        localStorage.setItem("localSettings", JSON.stringify(a))
                    } catch (e) {}
                };
                this.get = function(f) {
                    return a[f] ? a[f] : null
                };
                (function() {
                    if ("undefined" !== typeof Storage) {
                        var f = localStorage.getItem("localSettings");
                        try {
                            a = JSON.parse(f), null == a && (a = {})
                        } catch (b) {
                            localStorage.removeItem("localSettings"), a = {}
                        }
                    }
                })()
            }
        }, {}],
        61: [function(f, n, m) {
            (function(a) {
                if (!a.browser) throw Error("Used logging system on wrong environment");
                n.exports.info = function() {
                    console.log("INFO", arguments)
                };
                n.exports.error = function() {
                    console.log("ERROR", arguments)
                };
                n.exports.warn = function() {
                    console.log("WARN", arguments)
                };
                n.exports.panicWithStack = function(a) {
                    console.log("PANIC", arguments);
                    console.log(Error().stack)
                };
                n.exports.printErrorStack =
                    function(a) {
                        console.log(Error().stack)
                    }
            }).call(this, f(7))
        }, {}],
        62: [function(f, n, m) {
            function a() {
                this.manager = null
            }
            a.prototype.initBase = function(a) {
                this.manager = a;
                this.init()
            };
            a.prototype.init = function() {};
            a.prototype.join = function(a) {};
            a.prototype.update = function() {};
            a.prototype.leave = function() {};
            a.prototype.switchTo = function(a, b) {
                this.manager.switchTo(a, b)
            };
            a.prototype.goToUrl = function(a) {
                this.manager.goToUrl(a)
            };
            n.exports = a
        }, {}],
        63: [function(f, n, m) {
            function a() {
                this.innerMain = this.current = this.handlerOnResize =
                    this.onLoadedHandler = this.resizeListener = this.queuedLoadRequest = this.manager = null
            }
            m = f(62);
            var h = f(76),
                b = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.needScrollbar = function() {
                return !0
            };
            a.prototype.needFullHeight = function() {
                return !1
            };
            a.prototype.loadClassic = function(a, d, k) {
                var c = this;
                this.current = this.queuedLoadRequest = {
                    type: a,
                    args: d
                };
                this.onLoadedHandler = k;
                b.ui.classicWidget.setActive(!0);
                this.resizeListener && window.removeEventListener("resize", this.resizeListener);
                this.resizeListener =
                    window.addEventListener("resize", function() {
                        c.handlerOnResize && c.handlerOnResize()
                    })
            };
            a.prototype.leaveClassic = function() {
                window.removeEventListener("resize", this.resizeListener);
                this.resizeListener = null;
                b.ui.classicWidget.setActive(!1)
            };
            a.prototype.onResize = function(a) {
                this.handlerOnResize = a
            };
            a.prototype.update = function() {
                var a = this;
                this.queuedLoadRequest && h.getState() && (h.loadClassicPage(function(b) {
                    a.onLoadResult(b)
                }, this.queuedLoadRequest), this.queuedLoadRequest = null)
            };
            a.prototype.onLoadResult =
                function(a) {
                    var d = this;
                    b.ui.classicWidget.setClassicPage(a, this.needScrollbar(), this.needFullHeight());
                    this.innerMain = b.ui.classicWidget.mainElement.querySelector(".main");
                    this.innerMain.classList.add("page_" + this.current.type);
                    this.innerMain.querySelector("button.play").onclick = function() {
                        d.manager.goToUrl("/")
                    };
                    this.innerMain.querySelector("img.logo").onclick = function() {
                        d.manager.goToUrl("/")
                    };
                    this.onLoadedHandler()
                };
            n.exports = a
        }, {}],
        64: [function(f, n, m) {
            var a = f(59),
                h = f(76),
                b = f(54),
                e = f(60);
            n.exports =
                new function() {
                    var d = null,
                        k = null,
                        c = null,
                        g = "",
                        q = null,
                        l = null,
                        p = !1,
                        A = null,
                        y = !1;
                    this.init = function() {
                        this.register("title", f(74));
                        this.register("settings", f(73));
                        this.register("ballselect", f(66));
                        this.register("advancedmatch", f(65));
                        this.register("register", f(71));
                        this.register("profile", f(70));
                        this.register("friendrequests", f(67));
                        this.register("messages", f(69));
                        this.register("highscore", f(68));
                        this.register("search", f(72));
                        for (var a = 0; a < this.pages.length; a++) this.pages[a].page.initBase(this)
                    };
                    this.getByName =
                        function(a) {
                            for (var b = 0; b < this.pages.length; b++)
                                if (this.pages[b].name == a) return this.pages[b].page;
                            return null
                        };
                    this.setInitialPage = function(a, b) {
                        l = {
                            page: a,
                            args: b
                        };
                        this.updateInit()
                    };
                    this.updateInit = function() {
                        !p && l && y && (p = !0, A && "" == A.name ? this.switchTo("register") : this.switchTo(l.page, l.args))
                    };
                    this.isInited = function() {
                        return p
                    };
                    this.switchTo = function(a, b) {
                        this.current && this.current.leave();
                        a = this.getByName(a);
                        if (!a) throw Error("Invalid mainpage");
                        this.current = a;
                        this.current.join(b)
                    };
                    this.goToUrl =
                        function(a, b) {
                            k(a, b)
                        };
                    this.startGame = function() {
                        a.show(1, {
                            region: this.gameRequest.region || this.gameRequest.matchId
                        });
                        this.current && this.current.leave();
                        e.set("nick", this.gameRequest.nickname);
                        this.gameRequestInterval && (clearInterval(this.gameRequestInterval), this.gameRequestInterval = null);
                        d(this.gameRequest)
                    };
                    this.isGameStartable = function() {
                        return this.gameRequest && this.gameRequest.region && this.gameRequest.customization && h.getState() ? !0 : !1
                    };
                    this.updateGameStart = function() {
                        this.isGameStartable() &&
                            this.startGame()
                    };
                    this.requestStartGame = function(a) {
                        var b = this;
                        this.gameRequest = {
                            nickname: g,
                            region: q,
                            customization: c,
                            privateType: a.privateType,
                            matchId: a.matchId,
                            map: a.map ? a.map.name : "",
                            gameMode: a.gameMode ? a.gameMode.key : ""
                        };
                        this.gameRequestInterval = setInterval(function() {
                            b.updateGameStart()
                        }, 100);
                        this.updateGameStart()
                    };
                    this.setOnJoinGame = function(a) {
                        d = a
                    };
                    this.setOnGoToUrl = function(a) {
                        k = a
                    };
                    this.onRegionUpdate = function(a) {
                        this.gameRequest && null == this.gameRequest.region && (this.gameRequest.region = a,
                            this.updateGameStart());
                        q = a
                    };
                    this.setCustomization = function(a) {
                        c = a;
                        this.gameRequest && !this.gameRequest.customization && (this.gameRequest.customization = a)
                    };
                    this.setNickname = function(a) {
                        g = a;
                        this.gameRequest && !this.gameRequest.nickname && (this.gameRequest.nickname = a)
                    };
                    this.setAuth = function(a, c) {
                        A = a;
                        y = !0;
                        b.ui.sidebarWidget.setAuth(a, c);
                        b.ui.titleWidget.setAuth(a);
                        b.ui.ballSelectWidget.setAuth(a);
                        b.ui.registerWidget.setAuth(a);
                        this.updateInit()
                    };
                    this.update = function() {
                        this.current && this.current.update()
                    };
                    this.pages = [];
                    this.current = null;
                    this.register = function(a, b) {
                        this.pages.push({
                            name: a,
                            type: b,
                            page: new b
                        })
                    };
                    this.init()
                }
        }, {}],
        65: [function(f, n, m) {
            function a() {}
            m = f(62);
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.init = function() {};
            a.prototype.join = function(a) {
                h.ui.matchSelectionWidget.setActive(!0);
                h.ui.matchSelectionWidget.setCallbacks({
                    onClose: a.onClose,
                    onPlay: a.onPlay
                })
            };
            a.prototype.leave = function() {
                h.ui.matchSelectionWidget.setActive(!1)
            };
            n.exports = a
        }, {}],
        66: [function(f, n, m) {
            function a() {}
            m = f(62);
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.init = function() {
                this.initialArgs = null
            };
            a.prototype.join = function(a) {
                var b = this;
                h.ui.ballSelectWidget.initIfNecessary();
                h.ui.ballSelectWidget.setActive(!0);
                h.ui.ballSelectWidget.setBall(a.selectedBall.clone());
                h.ui.ballSelectWidget.setCallbacks({
                    onDone: function(a) {
                        b.switchTo("title", a)
                    }
                })
            };
            a.prototype.leave = function() {
                h.ui.ballSelectWidget.setActive(!1)
            };
            n.exports = a
        }, {}],
        67: [function(f, n, m) {
            function a() {}
            m = f(63);
            f(54);
            var h = f(80);
            a.prototype = Object.create(m.prototype);
            a.prototype.join = function(a) {
                var b = this;
                this.loadClassic("friendrequests", {}, function() {
                    h.updateDetails(b.innerMain)
                })
            };
            a.prototype.leave = function() {
                this.leaveClassic()
            };
            n.exports = a
        }, {}],
        68: [function(f, n, m) {
            function a() {}
            m = f(63);
            f(54);
            var h = f(80);
            a.prototype = Object.create(m.prototype);
            a.prototype.join = function(a) {
                var b = this;
                this.loadClassic("highscore", {}, function() {
                    h.updateDetails(b.innerMain)
                })
            };
            a.prototype.leave = function() {
                this.leaveClassic()
            };
            n.exports = a
        }, {}],
        69: [function(f, n, m) {
            function a() {
                this.resizeListener = this.openedConversation = this.conversationList = null
            }
            m = f(63);
            f(54);
            var h = f(20),
                b = f(80),
                e = f(76);
            a.prototype = Object.create(m.prototype);
            a.prototype.needScrollbar = function() {
                return !1
            };
            a.prototype.needFullHeight = function() {
                return !0
            };
            a.prototype.join = function(a) {
                var b = this;
                this.onResize(function() {
                    b.updateSizing()
                });
                h.setActive(!0);
                h.loadConversations(0, 30);
                h.onConversationListUpdate(function() {
                    b.conversationList = h.getConversationList();
                    b.updateConversationList()
                });
                this.loadClassic("messages", {}, function() {
                    b.conversationList = h.getConversationList();
                    b.updateConversationList();
                    b.initTextbox(b.onWriteNewMessage.bind(b));
                    var a = h.getCurrentMessages();
                    a && b.setMessages(h.getCurrentConversationName(), a)
                });
                h.onConversationLoad(function(a) {
                    b.innerMain && b.setMessages(a.name, a.list)
                });
                h.onAddMessage(function(a, d) {
                    b.innerMain && b.addMessage(a, d)
                });
                a.to && h.switchToConversation(a.to)
            };
            a.prototype.leave = function() {
                this.leaveClassic();
                h.setActive(!1)
            };
            a.prototype.onWriteNewMessage =
                function(a) {
                    h.sendMessageToCurrentConversation(a)
                };
            a.prototype.scrollDown = function() {
                var a = this.innerMain.querySelector(".sectionContent"),
                    b = a.querySelector(".msgArea");
                a = a.querySelector(".msgAreaScroll");
                b.scrollTop = a.offsetHeight - b.offsetHeight
            };
            a.prototype.setFocus = function() {
                this.innerMain.querySelector("textarea").focus()
            };
            a.prototype.setMessages = function(a, e) {
                function c() {
                    d.goToUrl("/profile/" + a)
                }
                var d = this,
                    k = this.innerMain.querySelector(".sectionContent .header");
                k.querySelector(".name").textContent =
                    a;
                k.querySelector(".name").onclick = c;
                k.querySelector(".profileButton").onclick = c;
                k.querySelector("canvas.playerDetail").dataset.player = a;
                b.updateDetails(k);
                k = this.innerMain.querySelector(".msgAreaScroll");
                k.innerHTML = "";
                for (var l = 0; l < e.length; l++) this.addMessageDOM(k, a, e[l]);
                this.setEmptyConversationHint(0 == e.length);
                this.updateSizing();
                this.scrollDown();
            };
            a.prototype.addMessageDOM = function(a, b, c) {
                var d = document.createElement("div"),
                    k = document.createElement("div"),
                    l = document.createElement("div"),
                    f = document.createElement("div");
                a.appendChild(d);
                d.appendChild(k);
                d.appendChild(l);
                d.appendChild(f);
                d.classList.add("msg");
                k.classList.add("name");
                l.classList.add("time");
                f.classList.add("text");
                k.textContent = c.incoming ? b : e.getAuth().name;
                l.textContent = c.time;
                f.textContent = c.text
            };
            a.prototype.addMessage = function(a, b) {
                var c = this.innerMain.querySelector(".msgAreaScroll");
                this.addMessageDOM(c, a, b);
                this.scrollDown();
                this.setEmptyConversationHint(!1)
            };
            a.prototype.setEmptyConversationHint = function(a) {
                this.innerMain.querySelector(".msgEmpty").style.display =
                    a ? "block" : "none";
                this.innerMain.querySelector(".msgAreaScroll").style.display = a ? "none" : "block"
            };
            a.prototype.updateConversationList = function() {
                if (null != this.conversationList && this.innerMain) {
                    var a = h.getCurrentConversationName(),
                        e = this.innerMain.querySelector(".sectionOverview");
                    e.innerHTML = "";
                    for (var c = 0; c < this.conversationList.length; c++) {
                        var g = this.conversationList[c],
                            f = document.createElement("div"),
                            l = document.createElement("canvas"),
                            p = document.createElement("div"),
                            A = document.createElement("div"),
                            y = document.createElement("div");
                        e.appendChild(f);
                        f.appendChild(p);
                        f.appendChild(l);
                        f.appendChild(A);
                        f.appendChild(y);
                        f.classList.add("item");
                        p.classList.add("name");
                        l.classList.add("playerDetail");
                        A.classList.add("lastMsg");
                        y.classList.add("time");
                        l.setAttribute("width", 64);
                        l.setAttribute("height", 64);
                        l.dataset.type = "avatar";
                        l.dataset.player = g.name;
                        g.name == a && f.classList.add("selected");
                        g.seen || f.classList.add("unseen");
                        p.textContent = g.name;
                        A.textContent = g.lastMsg;
                        y.textContent = g.time;
                        f.onclick = function() {
                            h.switchToConversation(this)
                        }.bind(g.name)
                    }
                    this.updateNoMessages();
                    b.updateDetails(this.innerMain)
                }
            };
            a.prototype.updateNoMessages = function() {
                var a = !0;
                this.conversationList && 0 != this.conversationList.length || (a = !1);
                this.innerMain.querySelector(".msgBox").style.display = a ? "block" : "none";
                this.innerMain.querySelector(".noMessages").style.display = a ? "none" : "block";
                this.updateTextbox && this.updateTextbox()
            };
            a.prototype.initTextbox = function(a) {
                function b() {
                    setTimeout(function() {
                            e.textContent = d.value + " ";
                            var a = e.getBoundingClientRect().height;
                            d.style.height = a + "px";
                            c.updateSizing()
                        },
                        0)
                }
                var c = this,
                    d = this.innerMain.querySelector("textarea"),
                    e = this.innerMain.querySelector("div.measureBox");
                d.addEventListener("keydown", function(c) {
                    13 == c.which && setTimeout(function() {
                        var b = d.value.trim();
                        d.value = "";
                        "" != b && a(b)
                    }, 0);
                    b();
                    13 == c.which && c.preventDefault()
                });
                d.addEventListener("paste", function() {
                    b()
                });
                d.addEventListener("change", function() {
                    b()
                });
                b();
                this.updateTextbox = b
            };
            a.prototype.updateSizing = function() {
                var a = this.innerMain.querySelector(".sectionContent"),
                    b = a.querySelector(".header"),
                    c = a.querySelector(".msgArea"),
                    e = a.querySelector(".msgInput");
                c.style.height = a.offsetHeight - b.offsetHeight - e.offsetHeight + "px"
            };
            n.exports = a
        }, {}],
        70: [function(f, n, m) {
            function a() {}
            m = f(63);
            f(54);
            var h = f(80);
            a.prototype = Object.create(m.prototype);
            a.prototype.join = function(a) {
                var b = this;
                this.loadClassic("profile", {
                    profile: a.profile
                }, function() {
                    var a = b.innerMain.querySelector(".playerProgress");
                    a.querySelector(".inner").style.width = a.dataset.percent + "%";
                    h.updateDetails(b.innerMain)
                })
            };
            a.prototype.leave =
                function() {
                    this.leaveClassic()
                };
            n.exports = a
        }, {}],
        71: [function(f, n, m) {
            function a() {}
            m = f(62);
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.init = function() {};
            a.prototype.join = function() {
                h.ui.sidebarWidget.setActive(!1);
                h.ui.registerWidget.setActive(!0);
            };
            a.prototype.leave = function() {
                throw Error("RegisterPage is final");
            };
            n.exports = a
        }, {}],
        72: [function(f, n, m) {
            function a() {
                this.handlerRegistered = !1;
                this.currentTerm = null
            }
            m = f(63);
            f(54);
            var h = f(80),
                b = f(76);
            a.prototype =
                Object.create(m.prototype);
            a.prototype.join = function() {
                var a = this;
                this.loadClassic("search", {}, function() {
                    this.innerMain.querySelector("input").onkeypress = function(b) {
                        13 == b.which && a.doSearch()
                    };
                    h.updateDetails(a.innerMain)
                });
                this.handlerRegistered || (b.onSocialMessage("searchPlayerResult", function(b) {
                    if (b.term == a.currentTerm) {
                        b = b.list;
                        var d = a.innerMain.querySelector("input");
                        d.disabled = !1;
                         d.focus();
                        a.setList(b)
                    }
                }), this.handlerRegistered = !0)
            };
            a.prototype.doSearch =
                function() {
                    var a = this.innerMain.querySelector("input"),
                        d = a.value.trim();
                    a.disabled = !0;
                    this.currentTerm = d;
                    b.socialMessage("searchPlayer", {
                        term: d
                    })
                };
            a.prototype.setList = function(a) {
                var b = this,
                    e = this.innerMain.querySelector(".list");
                this.innerMain.querySelector(".noResult").style.display = 0 < a.length ? "none" : "block";
                e.innerHTML = "";
                for (var c = 0; c < a.length; c++) {
                    var g = a[c],
                        f = document.createElement("div"),
                        l = document.createElement("canvas"),
                        p = document.createElement("div");
                    e.appendChild(f);
                    f.appendChild(l);
                    f.appendChild(p);
                    f.classList.add("item");
                    p.classList.add("name");
                    l.classList.add("playerDetail");
                    p.textContent = g;
                    l.setAttribute("width", 64);
                    l.setAttribute("height", 64);
                    l.dataset.type = "avatar";
                    l.dataset.player = g;
                    f.onclick = function() {
                        b.goToUrl("/profile/" + g)
                    }
                }
                h.updateDetails(this.innerMain)
            };
            a.prototype.leave = function() {};
            n.exports = a
        }, {}],
        73: [function(f, n, m) {
            function a() {}
            m = f(62);
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.init = function() {};
            a.prototype.join = function() {
                var a = this;
                h.ui.settingsWidget.setActive(!0);
                h.ui.settingsWidget.setCallbacks({
                    onClose: function() {
                        a.switchTo("title")
                    }
                })
            };
            a.prototype.leave = function() {
                h.ui.settingsWidget.setActive(!1)
            };
            n.exports = a
        }, {}],
        74: [function(f, n, m) {
            function a() {}
            m = f(62);
            var h = f(54),
                b = f(60),
                e = f(95),
                d = f(127),
                k = f(131);
            a.prototype = Object.create(m.prototype);
            a.prototype.init = function() {
                this.args = {};
                this.args.selectedBall = this.loadUserDefaultCustomization();
                this.args.nickname = ""
            };
            a.prototype.join = function(a) {
                var b = this;
                this.args = k.merge(this.args, a);
                h.ui.titleWidget.setCallbacks({
                    onNicknameChange: function(a) {
                        b.manager.setNickname(a)
                    },
                    onSettings: function() {
                        b.switchTo("settings")
                    },
                    onCustomize: function() {
                        b.switchTo("ballselect", {
                            selectedBall: b.args.selectedBall
                        })
                    },
                    onCustomMatch: function() {
                        b.switchTo("advancedmatch", {
                            onClose: function() {
                                b.switchTo("title")
                            },
                            onPlay: function(a) {
                                b.manager.setCustomization(b.args.selectedBall);
                                b.manager.requestStartGame({
                                    privateType: a.privateType,
                                    gameMode: a.gameType,
                                    map: a.map
                                })
                            }
                        })
                    },
                    onPlay: function() {
                        var a = {
                            privateType: 0,
                            map: null,
                            gameMode: null
                        };
                        null != b.args.startMatchId && (a.privateType = 2, a.matchId = b.args.startMatchId);
                        b.manager.setCustomization(b.args.selectedBall);
                        b.manager.requestStartGame(a)
                    },
                    onGoToProfile: function(a) {
                        b.goToUrl("/profile/" + a)
                    },
                    onGoToHighscore: function() {
                        b.goToUrl("/highscore")
                    }
                });
                h.ui.titleWidget.setActive(!0);
                h.ui.titleWidget.setBall(this.args.selectedBall);
                h.ui.titleWidget.setFocus();
                h.ui.titleWidget.setLiteMode(!!this.args.startMatchId);
                h.ui.titleWidget.setLiteModeMatchId(this.args.startMatchId);
                h.ui.titleWidget.initAdbHint();
                h.ui.setAd("300", !0);
                h.ui.setAd("728", 1268 < e.width)
            };
            a.prototype.leave =
                function() {
                    h.ui.titleWidget.setActive(!1);
                    h.ui.setAd("300", !1);
                    h.ui.setAd("728", !1)
                };
            a.prototype.loadUserDefaultCustomization = function() {
                var a = b.get("customization"),
                    e = new d;
                a && (e.ball = a.ball || "pl", e.skinHat = ~~(a.skinHat || 0), e.skinGlasses = ~~(a.skinGlasses || 0));
                return e
            };
            n.exports = a
        }, {}],
        75: [function(f, n, m) {
            function a(a) {
                a = this.dataset.player;
                b || (b = f(25));
                b.goToUrl("/messages", !0, {
                    to: a
                })
            }
            f(54);
            var h = f(76),
                b = null;
            n.exports = {
                init: function() {},
                updateButtons: function(b) {
                    b = b.querySelectorAll(".messageButton");
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d],
                            c = e,
                            g = e.dataset.player,
                            f = h.getAuth();
                        c.innerHTML = f && f.name == g ? "" : '<div class="button"><span class="uiIcon messageWhite"></span>Send message</div>';
                        e.onclick = a.bind(e)
                    }
                }
            }
        }, {}],
        76: [function(f, n, m) {
            var a = f(22),
                h = f(136);
            n.exports = new function() {
                var b = this,
                    e = null,
                    d = null,
                    k = !1,
                    c = !1,
                    g = null,
                    f = !1,
                    l = null,
                    p = null,
                    A = null,
                    y = null,
                    x = null,
                    m = null,
                    n = null,
                    r = null,
                    z = null,
                    t = !1,
                    D = null,
                    E = !1,
                    I = {};
                this.init = function(b) {
                    if (f) return !1;
                    d = b;
                    e = new a(d);
                    this.initHandlers();
                    b = e.packet(h.Messages.GEN_HANDSHAKE);
                    b.u32(3203381794);
                    b.u32(~~(4294967296 * Math.random()));
                    b.u32(h.Meta.Version);
                    b.str(kugelnVersion);
                    b.send()
                };
                this.initHandlers = function() {
                    e.onError(function(a) {
                        b.restart()
                    });
                    e.on(h.Messages.GEN_HANDSHAKE, function() {
                        var a = this.u32();
                        this.u32();
                        var c = this.u32();
                        3203381794 == a ? c != h.Meta.Version && b.restart() : b.restart()
                    });
                    e.on(h.Messages.GEN_ERROR, function() {
                        var a = this.u16(),
                            b = this.str();
                        x && (x({
                            code: a,
                            msg: b
                        }), x = null);
                        101 == a && y && y()
                    });
                    e.on(h.Messages.STC_MAINTENANCE, function() {
                        b.setState(!1, !0)
                    });
                    e.on(h.Messages.STC_GTW_DATA,
                        function() {
                            for (var a = this.u8(), b = [], c = 0; c < a; c++) {
                                var d = this.str(),
                                    e = this.str();
                                b.push({
                                    name: d,
                                    label: e
                                })
                            }
                            this.str();
                            a = this.str();
                            p && p(b, a)
                        });
                    e.on(h.Messages.STC_MM_MATCHED, function() {
                        var a = this.str(),
                            b = this.str(),
                            c = this.str(),
                            d = this.str(),
                            e = this.str();
                        t = !0;
                        x && (x(null, {
                            match: a,
                            server: b,
                            serverName: c,
                            sessionId: d,
                            ticket: e
                        }), x = null)
                    });
                    e.on(h.Messages.STC_AUTHED, function() {
                        var a = this.u8(),
                            d = null;
                        b.setState(!0);
                        if (1 == a) {
                            d = {
                                provider: null,
                                id: null,
                                avatar: null,
                                name: null,
                                realName: null
                            };
                            d.provider = this.str();
                            d.id =
                                this.str();
                            d.avatar = this.str();
                            d.name = this.str();
                            d.realName = this.str();
                            d.xp = this.u32();
                            d.achievements = [];
                            a = this.u16();
                            for (var e = 0; e < a; e++) d.achievements.push(this.u16())
                        }
                        g = d;
                        c = !0;
                        A && A(d)
                    });
                    e.on(h.Messages.STC_REGISTER, function() {
                        m && m(this.u8())
                    });
                    e.on(h.Messages.STC_CLASSIC_LOAD, function() {
                        n && n(this.str())
                    });
                    e.on(h.Messages.STC_SOCIAL_MESSAGE, function() {
                        var a = this.str(),
                            b = this.str(),
                            c = null;
                        try {
                            c = JSON.parse(b)
                        } catch (M) {}
                        if (c && I[a])
                            for (a = I[a], b = 0; b < a.length; b++) a[b](c)
                    });
                    e.on(h.Messages.STC_HIGHSCORE_OVERVIEW,
                        function() {
                            var a = this.str(),
                                b = null;
                            try {
                                b = JSON.parse(a)
                            } catch (Q) {}
                            b && (D = b, r && r(b))
                        });
                    e.on(h.Messages.STC_USER_DETAILS, function() {
                        var a = this.str(),
                            b = null;
                        try {
                            b = JSON.parse(a)
                        } catch (Q) {}
                        b && z && z(b)
                    })
                };
                this.deactivate = function() {
                    f || (f = !0, b.setState(!1), e.close(), e = null)
                };
                this.setState = function(a, b) {
                    console.log("Set MasterSession: " + a);
                    k = a;
                    f || b && (f = !0);
                    l && l(k, b)
                };
                this.getState = function() {
                    return k
                };
                this.hasAuth = function() {
                    return c
                };
                this.getAuth = function() {
                    return g
                };
                this.getHighscore = function() {
                    return D
                };
                this.isUserLoggedIn = function() {
                    return c ? g ? !0 : !1 : !1
                };
                this.onState = function(a) {
                    l = a
                };
                this.onRegionUpdate = function(a) {
                    p = a
                };
                this.onAuth = function(a) {
                    A = a
                };
                this.onVersionError = function(a) {
                    y = a
                };
                this.onSocialMessage = function(a, b) {
                    I[a] || (I[a] = []);
                    I[a].push(b)
                };
                this.onHighscore = function(a) {
                    r = a
                };
                this.onUserDetail = function(a) {
                    z = a
                };
                this.logout = function() {
                    e.packet(h.Messages.CTS_LOGOUT).send();
                    setTimeout(function() {
                        location.href = "/"
                    }, 2E3)
                };
                this.sendRequestMatch = function(a, b) {
                    x = a;
                    E ? console.log("MM request already sent") :
                        (E = !0, a = e.packet(h.Messages.CTS_MM_REQUESTMATCH), b.matchId ? (a.u8(2), a.str(b.matchId)) : (a.u8(b.privateType), a.str(b.region), a.str(b.map), a.str(b.gameMode)), a.send(), setTimeout(function() {
                            !t && x && (x({
                                code: 308,
                                msg: "Match making failed"
                            }), x = null, e && (e.close(), e = null))
                        }, 5E3))
                };
                this.sendRegister = function(a, b) {
                    m = a;
                    a = e.packet(h.Messages.CTS_REGISTER);
                    a.str(b.nick);
                    a.send()
                };
                this.sendUserDetailRequest = function(a) {
                    var b = e.packet(h.Messages.CTS_USER_DETAILS);
                    b.str(a);
                    b.send()
                };
                this.loadClassicPage = function(a,
                    b) {
                    n = a;
                    a = e.packet(h.Messages.CTS_CLASSIC_LOAD);
                    a.str(JSON.stringify(b));
                    a.send()
                };
                this.socialMessage = function(a, b) {
                    var c = e.packet(h.Messages.CTS_SOCIAL_MESSAGE);
                    c.str(a);
                    c.str(JSON.stringify(b));
                    c.send()
                };
                this.restart = function() {
                    this.setState(!1);
                    e.close();
                    e = null;
                    setTimeout(function() {
                        null == e && b.init(d)
                    }, 500 + 1E3 * Math.random())
                }
            }
        }, {}],
        77: [function(f, n, m) {
            n.exports = function(a) {
                this.currentModal = null;
                this.queue = [];
                this.confirm = function(a, b) {
                    this.queue.push({
                        text: a,
                        buttons: [{
                            text: "Yes",
                            class: "btn1",
                            result: !0
                        }, {
                            text: "No",
                            class: "btn2",
                            result: !1
                        }],
                        onResult: b
                    });
                    this.processQueue()
                };
                this.onButton = function(f) {
                    a.modalWidget.setActive(!1);
                    var b = this.currentModal;
                    this.currentModal = null;
                    b.onResult(f)
                };
                this.processQueue = function() {
                    var f = this;
                    null == this.currentModal && 0 < this.queue.length && (this.currentModal = this.queue.shift(), a.modalWidget.show(this.currentModal, function(a) {
                        f.onButton(a)
                    }))
                }
            }
        }, {}],
        78: [function(f, n, m) {
            var a = f(127);
            n.exports = function(f) {
                this.pid = f;
                this.team = 0;
                this.nick = null;
                this.customization = new a;
                this.announcedInChat = !1;
                this.statsScore = this.statsDeath = this.statsKills = 0;
                this.character = null;
                this.resetStats = function() {
                    this.statsScore = this.statsDeath = this.statsKills = 0
                }
            }
        }, {}],
        79: [function(f, n, m) {
            var a = f(76);
            f(131);
            var h = f(127),
                b = f(47),
                e = f(38);
            n.exports = new function() {
                function d(a) {
                    for (var b = 0; b < g.length; b++)
                        if (g[b].name == a) return g[b];
                    return null
                }

                function k(a) {
                    c();
                    a = {
                        name: a,
                        update: Date.now(),
                        data: null,
                        listener: [],
                        avatars: []
                    };
                    g.push(a);
                    return a
                }

                function c() {
                    for (var a = Date.now(), b = [], c = 0; c < g.length; c++) {
                        var d =
                            g[c];
                        (65 < (a - d.update) / 1E3 || 5E3 < c) && b.push(d)
                    }
                    for (; 0 < b.length;) {
                        a = g.indexOf(b.pop());
                        if (-1 == a) {
                            log.error("Cannot find player in cache to clean");
                            break
                        }
                        g.splice(a, 1)
                    }
                }
                var g = [],
                    f = [],
                    l = !1,
                    p = [];
                this.get = function(b, e) {
                    c();
                    b = b.toLowerCase();
                    var l = d(b);
                    l ? setTimeout(function() {
                        e(l.data, l)
                    }, 0) : (a.sendUserDetailRequest(b), l = k(b), l.listener.push(e))
                };
                this.getAvatar = function(a, c, d) {
                    this.get(a, function(a, l) {
                        if (a && l) {
                            var k = new h;
                            a.char.customization && k.initFromJson(a.char.customization);
                            for (a = 0; a < l.avatars.length; a++) {
                                var g =
                                    l.avatars[a];
                                if (g.size == c && g.customization.equals(k)) {
                                    d(g.canvas);
                                    return
                                }
                            }
                            a = e.createCanvas(c, c);
                            g = new b(a, c, c, !1, k);
                            g.setViewingDirection(0, 1.2, 0);
                            g.setEye(14);
                            g.render();
                            l.avatars.push({
                                size: c,
                                canvas: a,
                                customization: k
                            });
                            10 < l.avatars.length && l.avatars.shift();
                            d(a)
                        }
                    })
                };
                this.setGameReady = function() {
                    for (l = !0; 0 < p.length;) {
                        var a = p.pop();
                        a.cb(a.details, a.entry)
                    }
                };
                this.onDetailChange = function(a) {
                    f.push(a)
                };
                this.init = function() {
                    function b(a) {
                        if (a) {
                            Object.freeze(a);
                            var b = d(a.name);
                            b || (b = k(a.name));
                            b.data =
                                a;
                            var c = b.listener;
                            b.listener = [];
                            for (var e = 0; e < c.length; e++) {
                                var g = c[e],
                                    h = a,
                                    q = b;
                                l ? g(h, q) : p.push({
                                    cb: g,
                                    details: h,
                                    entry: q
                                })
                            }
                            for (e = 0; e < f.length; e++) c = f[e], g = a, h = b, l ? c(g, h) : p.push({
                                cb: c,
                                details: g,
                                entry: h
                            })
                        }
                    }
                    a.onUserDetail(b);
                    a.onSocialMessage("loadUserDetailsResult", b)
                }
            }
        }, {}],
        80: [function(f, n, m) {
            function a(a, b) {
                var c = a.width;
                e.getAvatar(b, c, function(b) {
                    a.width = a.width;
                    var d = a.getContext("2d");
                    d.fillStyle = "rgba(50, 50, 50, 0.5)";
                    d.fillRect(0, 0, c, c);
                    d.drawImage(b, 0, 0)
                })
            }

            function h(b) {
                var d = b.dataset.type,
                    c = b.dataset.player;
                if (d && c) switch (d) {
                    case "avatar":
                        a(b, c)
                }
            }

            function b(a, b) {
                a = a.querySelectorAll(".playerDetail");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    d.dataset.player == b && h(d)
                }
            }
            f(54);
            f(76);
            var e = f(79);
            n.exports = {
                init: function() {
                    e.onDetailChange(function(a) {
                        b(document, a.name)
                    })
                },
                updateDetails: function(a) {
                    a = a.querySelectorAll(".playerDetail");
                    for (var b = 0; b < a.length; b++) h(a[b])
                },
                updateSinglePlayer: b
            }
        }, {}],
        81: [function(f, n, m) {
            function a() {}
            a.prototype.initBase = function(a) {
                this.flow = a;
                this.init()
            };
            a.prototype.init =
                function() {};
            a.prototype.update = function() {};
            a.prototype.join = function() {};
            a.prototype.leave = function() {};
            n.exports = a
        }, {}],
        82: [function(f, n, m) {
            m = f(81);
            var a = f(85),
                h = f(54),
                b = f(76);
            f = function() {};
            f.prototype = Object.create(m.prototype);
            f.prototype.constructor = m;
            f.prototype.sleepUpdateInterval = null;
            f.prototype.session = null;
            f.prototype.init = function() {};
            f.prototype.update = function() {};
            f.prototype.join = function(a) {
                this.startMatchmaking(a)
            };
            f.prototype.leave = function() {
                this.session && this.session.kill();
                h.renderer.setDefaultScene(h.sceneMenu);
                this.sleepUpdateInterval && clearInterval(this.sleepUpdateInterval);
                document.getElementById("game").classList.remove("gameCursor");
                this.session = null
            };
            f.prototype.startMatchmaking = function(a) {
                b.sendRequestMatch(function(b, e) {
                    b ? this.flow.switchTo("matchError", {
                        code: b.code,
                        msg: b.msg
                    }) : (console.log("Connect to", e.server, e.serverName, e.match), this.connectToMatch(e.server, e.serverName, e.sessionId, e.ticket, e.match, a.nickname, a.customization), 0 != e.match.indexOf("dev") &&
                        this.flow.setUrl("/match/" + e.match, null))
                }.bind(this), a)
            };
            f.prototype.connectToMatch = function(b, d, k, c, g, f, l) {
                this.session = new a(this.getWebsocketUrl(b, d), k, c, g, f, l);
                var e = this.flow;
                this.session.onClose(function(a, b) {
                    e.switchTo("matchError", {
                        code: a,
                        msg: b
                    })
                });
                this.session.connect();
                this.sleepUpdateInterval = setInterval(this.session.update, 300);
                document.getElementById("game").classList.add("gameCursor");
                h.renderer.setDefaultScene(0, 1)
            };
            f.prototype.getWebsocketUrl = function(a, b) {
                if ("http:" === location.protocol) return "ws://" +
                    a + "/gss/8010/";
                if ("https:" === location.protocol) return "wss://" + b + ".kugeln.io/gss/8010/";
                throw Error("Invalid protocol");
            };
            n.exports = f
        }, {}],
        83: [function(f, n, m) {
            m = f(81);
            var a = f(54),
                h = f(95),
                b = f(131),
                e = f(59),
                d = f(76),
                k = f(79),
                c = f(60),
                g = f(64);
            f = function() {
                this.showSidebars = !0
            };
            f.prototype = Object.create(m.prototype);
            f.prototype.constructor = m;
            f.prototype.init = function() {
                var a = this;
                if (d.hasAuth()) this.ready();
                else d.onAuth(function() {
                    a.ready()
                });
                d.onHighscore(function(b) {
                    a.setHighscoreData(b)
                })
            };
            f.prototype.ready =
                function() {
                    var a = d.getAuth();
                    g.setAuth(a, function() {
                        e.show(0);
                        d.logout()
                    });
                    a && k.get(a.name, function(a) {
                        a && null == a.char.customization && (a = c.get("customization")) && d.socialMessage("setCustomization", {
                            customization: a
                        })
                    });
                    e.hide()
                };
            f.prototype.setHighscoreData = function(b) {
                a.ui.titleWidget.setHighscore(b)
            };
            f.prototype.update = function() {
                this.updateBackgound();
                a.renderer.setClearColor(1, 1, 1, 1);
                var b = 1E3 < h.width;
                this.showSidebars != b && (a.ui.sidebarWidget.setActive(b), a.ui.updateViewport());
                this.showSidebars =
                    b
            };
            f.prototype.updateBackgound = function() {};
            f.prototype.join = function(c) {
                var e = this,
                    k = {},
                    f = "title";
                c.customArgs && (k = b.merge(k, c.customArgs));
                a.ui.setAd("300", !1);
                a.ui.setAd("728", !1);
                switch (c.args.sub) {
                    case "normal":
                        break;
                    case "specificMatch":
                        k = {
                            startMatchId: null
                        };
                        c && c.http && 0 < c.http.length && (k.startMatchId = c.http[0]);
                        break;
                    case "profile":
                        k = {
                            profile: null
                        };
                        c && c.http && 0 < c.http.length && (k.profile = c.http[0]);
                        f = "profile";
                        break;
                    case "friendrequests":
                        f = "friendrequests";
                        break;
                    case "messages":
                        f = "messages";
                        break;
                    case "highscore":
                        f = "highscore";
                        break;
                    case "search":
                        f = "search";
                        break;
                    default:
                        throw Error("Invalid subpage");
                }
                c.customArgs && (k = c.customArgs);
                a.ui.bgWidget.setActive(!0);
                a.ui.sidebarWidget.setActive(!0);
                g.isInited() ? g.switchTo(f, k) : g.setInitialPage(f, k);
                g.setOnJoinGame(function(a) {
                    e.flow.switchTo("game", a)
                });
                g.setOnGoToUrl(function(a, b) {
                    e.flow.goToUrl(a, !0, b)
                });
                a.renderer.setDefaultScene(a.sceneMenu);
                this.setHighscoreData(d.getHighscore())
            };
            f.prototype.leave = function() {
                a.ui.bgWidget.setActive(!1);
                a.ui.sidebarWidget.setActive(!1);
                a.ui.setAd("300", !1);
                a.ui.setAd("728", !1)
            };
            n.exports = f
        }, {}],
        84: [function(f, n, m) {
            m = f(81);
            f(85);
            var a = f(54);
            f = function() {};
            f.prototype = Object.create(m.prototype);
            f.prototype.constructor = m;
            f.prototype.init = function() {};
            f.prototype.update = function() {};
            f.prototype.join = function(f) {
                function b(b, e) {
                    a.ui.matchErrorWidget.set(b, e)
                }
                switch (f.code) {
                    case 101:
                        b("Invalid version", "Game version is invalid. Please clean your cache by pressing Ctrl+F5");
                        setTimeout(function() {
                                location.reload(!0)
                            },
                            3E4);
                        break;
                    case 202:
                        b("Match full", "This match is already full. Click continue to join another match!");
                        break;
                    case 209:
                        b("Match not found or expired", "The selected match does not exist anymore. Go back to kugeln.io and start a new one!");
                        break;
                    case 211:
                        b("Kicked due to inactivity", "Man! Move faster!");
                        break;
                    case 302:
                        b("Connection lost", "Uhm. Internet anschluss?");
                        break;
                    case 305:
                        b("Too much lag", "Do NOT use YouTube, Netflix, Downloads, etc. while playing!");
                        break;
                    case 306:
                        b("Loading error", "Loaded data are damaged. Please try again!");
                        break;
                    case 308:
                        b("Match making failed", "Please try again!");
                        break;
                    default:
                        var e = f.msg;
                        if (null == e || 0 == e.length) e = "Wtf some weird shit happened. Please contact your ambassador. Or support.";
                        console.log(f.code, e, Error().stack);
                        b("Match Error #7" + f.code, e)
                }
                document.body.classList.remove("nofooter");
                a.ui.matchErrorWidget.setActive(!0);
                f = document.querySelectorAll(".implIAB300, .implIAB728, .implIAB728_2");
                for (e = 0; e < f.length; e++) f[e].parentNode.removeChild(f[e]);
                a.gameUpdateCb = null
            };
            f.prototype.leave = function() {
                a.ui.matchErrorWidget.setActive(!1)
            };
            n.exports = f
        }, {}],
        85: [function(f, n, m) {
            var a = f(54);
            f(37);
            var h = f(133),
                b = f(46),
                e = f(39),
                d = f(21),
                k = f(143),
                c = f(136),
                g = f(131),
                q = f(22);
            f(78);
            var l = f(59);
            f(57);
            var p = f(76),
                A = f(13),
                y = f(130),
                x = f(129),
                w = f(138).Unserializer,
                B = f(124),
                r = f(140),
                z = f(23);
            n.exports = function(f, m, n, I, K, P) {
                var t = this,
                    D = null;
                this.simulation = null;
                this.ready = !1;
                this.connectionStage = 0;
                this.connectionData = {};
                this.eomResult = this.connection = null;
                this.players = [];
                this.mapname = this.lastMatchData = this.localPlayer = null;
                this.gametypeId = this.matchLength =
                    0;
                this.gametype = null;
                this.lastUpdate = 0;
                this.openSince = null;
                this.matchEndScreenClosed = !0;
                this.isDev = 0 == I.indexOf("dev");
                this.killedByServer = !1;
                z.init();
                this.connect = function() {
                    this.connectionStage = 1;
                    this.connection = new q(f);
                    this.connection.on(c.Messages.GEN_HANDSHAKE, function() {
                        if (1 == t.connectionStage) {
                            var a = this.u32();
                            this.u32();
                            var b = this.u32();
                            3203381777 == a ? b == c.Meta.Version ? (this.connectionStage = 2, t.joinSession()) : t.error(101, "Invalid protocol versions") : t.error(301, "Server communication corrupted");
                            t.openSince = Date.now()
                        }
                    });
                    this.connection.on(c.Messages.GEN_ERROR, function() {
                        var a = this.u16(),
                            b = this.str();
                        t.error(a, b)
                    });
                    this.connection.onError(function(a, b) {
                        t.killedByServer || (0 == a ? t.error(302, "Connection lost") : t.error(a, b))
                    });
                    var a = this.connection.packet(c.Messages.GEN_HANDSHAKE);
                    a.u32(3203381777);
                    a.u32(~~(4294967296 * Math.random()));
                    a.u32(c.Meta.Version);
                    a.str(kugelnVersion);
                    a.send()
                };
                this.kill = function() {
                    this.connection && this.connection.close();
                    a.gameUpdateCb = null
                };
                this.joinSession = function() {
                    var b =
                        this.connection.packet(c.Messages.CTS_JOIN);
                    b.u32(~~(4294967296 * Math.random()));
                    b.str(I);
                    b.str(m);
                    b.str(n);
                    b.str(K);
                    b.u8(g.getArg("bot", !1));
                    b.str(P.ball);
                    b.u8(P.skinHat);
                    b.u8(P.skinGlasses);
                    b.send();
                    this.connection.on(c.Messages.STC_JOINRESPONSE, function() {
                        t.pid = this.u8();
                        a.ui.statsWidget.setOwnPid(t.pid);
                        a.ui.chatWidget.onMsg(function(a, b) {
                            t.sendChatMessage(a, b)
                        })
                    });
                    this.connection.on(c.Messages.STC_SIMULATIONSTART, function() {
                        var a = this.u32(),
                            b = new w(this.buffer());
                        b = t.unserializeGameState(b);
                        b.findSheet("match").set("state",
                            1);
                        z.setGameState(b);
                        var c = this.buffer();
                        t.simulation.begin(a, c, b)
                    });
                    this.connection.on(c.Messages.STC_MATCHSTART, function() {
                        var a = t.unserializeSheetToObj(this);
                        t.matchStart(a)
                    });
                    this.connection.on(c.Messages.STC_INPUTTIMING, function() {
                        var a = this.u32(),
                            b = this.u32();
                        t.simulation && t.simulation.handleInputTiming(a, b)
                    });
                    this.connection.on(c.Messages.STC_SNAPSHOT, function() {
                        var a = this.u32(),
                            b = this.buffer();
                        b = new w(b);
                        b = t.unserializeGameStatePatch(b);
                        t.simulation.handleSnapshot(a, b);
                        z.graphAdd("Snapshots",
                            1);
                        t.simulation && z.setGameState(t.simulation.gameState)
                    });
                    this.connection.on(c.Messages.STC_INSTANT, function() {
                        var a = this.u32(),
                            b = this.buffer();
                        b = new w(b);
                        b = t.unserializeGameStatePatch(b);
                        t.simulation.handleInstantData(a, b);
                        z.graphAdd("Instants", 1);
                        z.setGameState(t.simulation.gameState)
                    });
                    this.connection.on(c.Messages.STC_EVENTS, function() {
                        for (var a = this.u16(), b = 0; b < a; b++) {
                            var c = this.u32(),
                                d = this.u8(),
                                e = this.u16(),
                                l = this.u8(),
                                g = {};
                            if (d = t.simulation.gameState.findSheetByTypeId(d, e)) {
                                l = d.sheetConfig.events[l];
                                for (e = 0; e < l.vars.length; e++) g[l.vars[e].key] = this.unserialize(l.vars[e].type);
                                t.simulation.handleEvent(c, d, l.key, g)
                            }
                        }
                    });
                    this.connection.on(c.Messages.STC_EOM, function() {
                        var a = this.u8();
                        if (!t.eomResult) throw Error("Unexpected EOM");
                        if (a) {
                            a = this.u8();
                            var b = this.u8();
                            t.eomResult.level = {
                                oldLvl: a,
                                newLvl: b
                            };
                            a = this.u8();
                            for (b = 0; b < a; b++) {
                                var c = this.u16();
                                c = B[c];
                                t.eomResult.achievements.push({
                                    name: c.name,
                                    desc: c.desc
                                })
                            }
                        } else t.eomResult = null;
                        t.lastMatchData.warmup || t.showEndOfMatchResult()
                    });
                    this.connection.on(c.Messages.STC_CHAT,
                        function() {
                            var b = this.u8(),
                                c = this.str(),
                                d = this.str(),
                                e = this.u8();
                            2 == b ? a.ui.chatWidget.addServerMsg(d) : a.ui.chatWidget.addMsg(b, c, d, e)
                        })
                };
                this.sendReady = function() {
                    this.connection.packet(c.Messages.CTS_READY).send()
                };
                this.sendRequestTeam = function(a) {
                    var b = this.connection.packet(c.Messages.CTS_REQUESTTEAM);
                    b.u8(a);
                    b.send()
                };
                this.sendInput = function(a, b, d, e, l, g, f, h, p) {
                    var q = this.connection.packet(c.Messages.CTS_INPUT);
                    q.u32(a);
                    q.u8(b);
                    q.u8(d);
                    q.f32(e);
                    q.s8(f);
                    q.s8(h);
                    a = 0;
                    l ? a = l instanceof k ? 2 : 1 : g && (a =
                        3);
                    q.u8(a);
                    1 == a && (q.f32(l[0]), q.f32(l[1]));
                    2 == a && q.u8(this.getIdByCharacter(l));
                    3 == a && (q.f32(g[0]), q.f32(g[1]));
                    q.u8(null == p ? 0 : 1);
                    p && (q.u16(p[0]), q.u16(p[1]));
                    q.send()
                };
                this.sendChatMessage = function(a, b) {
                    var d = this.connection.packet(c.Messages.CTS_CHAT);
                    d.u32(~~(4294967296 * Math.random()));
                    d.str(a);
                    d.u8(b);
                    d.send()
                };
                this.unserializeGameState = function(a) {
                    for (var b = new x, c = a.u16(), d = 0; d < c; d++) this.unserializeSheet(a, b);
                    return b
                };
                this.unserializeGameStatePatch = function(a) {
                    var b = {
                            added: [],
                            removed: [],
                            changes: []
                        },
                        c = a.u8(),
                        d = c >> 1 & 1,
                        e = c & 1;
                    if (c >> 2 & 1) {
                        c = a.u16();
                        for (var l = 0; l < c; l++) {
                            var g = a.u8(),
                                k = a.u16();
                            g = r.findSheetConfigById(g);
                            var f = {
                                id: k,
                                sheet: g.name,
                                list: []
                            };
                            for (k = 0; k < g.vars.length; k++) {
                                var h = g.vars[k],
                                    p = a.u8(),
                                    q = null;
                                p && (q = a.unserialize(h.type));
                                f.list.push({
                                    type: h.type,
                                    current: q
                                })
                            }
                            b.added.push(f)
                        }
                    }
                    if (d)
                        for (c = a.u16(), l = 0; l < c; l++) g = a.u8(), k = a.u16(), g = r.findSheetConfigById(g), b.removed.push({
                            id: k,
                            sheet: g.name
                        });
                    if (e)
                        for (c = a.u16(), k = 0; k < c; k++)
                            for (l = a.u16(), g = r.findSheetConfigById(l), l = a.u16(), d = a.u8(), e = {
                                    sheet: g.name,
                                    id: l,
                                    changes: []
                                }, b.changes.push(e), l = 0; l < d; l++) f = a.u8(), h = g.vars[f], p = a.u8(), q = null, p && (q = a.unserialize(h.type)), e.changes.push({
                                var: f,
                                type: h.type,
                                current: q
                            });
                    return b
                };
                this.unserializeSheet = function(a, b) {
                    var c = a.u8(),
                        d = a.u16(),
                        e = b.findSheetByTypeId(c, d);
                    e || (e = b.findSheetNameById(c), e = b.addSheet(e, d));
                    for (b = 0; b < e.values.length; b++) a.u8() && (e.values[b].current = a.unserialize(e.sheetConfig.vars[b].type))
                };
                this.unserializeSheetToObj = function(a) {
                    var b = a.u8(),
                        c = a.u16();
                    c = {
                        _type: b,
                        _id: c
                    };
                    b = r.findSheetConfigById(b);
                    for (var d = 0; d < b.vars.length; d++) a.u8() ? c[b.vars[d].key] = a.unserialize(b.vars[d].type) : c[b.vars[d].key] = null;
                    return c
                };
                this.matchStart = function(c) {
                    function d() {
                        t.connection && (t.ready = !0, t.initSimulation(), t.sendReady())
                    }
                    p.deactivate();
                    for (var l = null, g = 0; g < h.maps.length; g++)
                        if (h.maps[g].name == c.mapName) {
                            l = h.maps[g];
                            break
                        }
                    this.lastMatchData = c;
                    this.mapname = c.mapName;
                    this.matchLength = c.matchLength;
                    this.gametypeId = c.gameMode;
                    this.gametype = y[c.gameMode];
                    a.mapGfx ? a.mapGfx.ready && d() : a.mapGfx = new b(l, "/map/maps/" +
                        this.mapname + ".cbm?v=" + kugelnVersion, "/map/tiles/" + l.tileset + ".png", "/obj_" + l.objset + ".png", A[l.objset], 64, this.gametype,
                        function() {
                            a.gameUpdateCb = t.update;
                            d()
                        });
                    e.matchInfo.setFlags(!1, !1);
                    e.matchInfo.setIsCTF(this.gametype.ctf);
                    e.matchInfo.setHasTeams(this.gametype.teams);
                    e.matchInfo.setTeamScore([0, 0]);
                    a.ui.chatWidget.setHasTeams(this.gametype.teams);
                    a.ui.statsWidget.setGameType(this.gametype.descShort, this.gametype.descLong, this.gametype.teams);
                    this.matchEndScreenClosed && a.ui.setMatchUIState(1)
                };
                this.matchEnd = function() {
                    var a = this.simulation.gameState.getSheets("player"),
                        b = this.simulation.gameState.findSheet("player", this.localPlayer.pid);
                    this.eomResult = {
                        players: a,
                        localPlayer: this.localPlayer,
                        localSheet: b,
                        teamScore: this.simulation.getTeamScore(),
                        achievements: []
                    };
                    t.localPlayer = null;
                    t.players = [];
                    t.simulation.end();
                    t.simulation = null
                };
                this.showEndOfMatchResult = function() {
                    if (this.eomResult) {
                        this.matchEndScreenClosed = !1;
                        a.ui.matchEndWidget.setAdVisible(!0);
                        a.ui.matchEndWidget.setHasTeams(this.gametype.teams);
                        a.ui.matchEndWidget.setPlayers(this.eomResult.players, this.eomResult.localPlayer.pid);
                        a.ui.matchEndWidget.setTeamScore(this.eomResult.teamScore);
                        a.ui.matchEndWidget.onContinue(function() {
                            a.ui.setPageEoM(1)
                        });
                        var b = this.eomResult.level;
                        a.ui.progressionWidget.setNick(this.eomResult.localPlayer.nick);
                        a.ui.progressionWidget.setXP(this.eomResult.localSheet.get("statsXp"));
                        a.ui.progressionWidget.setLevelUp(b.oldLvl != b.newLvl ? b.newLvl : null);
                        a.ui.progressionWidget.setAchievements(this.eomResult.achievements);
                        a.ui.progressionWidget.setLoggedIn(p.isUserLoggedIn());
                        a.ui.progressionWidget.setHasTeams(this.gametype.teams);
                        a.ui.progressionWidget.setPlayers(this.eomResult.players, this.eomResult.localPlayer.pid);
                        a.ui.progressionWidget.onContinue(function() {
                            t.killedByServer ? (l.show(0), window.setTimeout(function() {
                                location.reload()
                            }, 100)) : (a.ui.setMatchUIState(1), t.matchEndScreenClosed = !0)
                        });
                        a.ui.setPageEoM(0);
                        a.ui.setMatchUIState(2);
                        this.eomResult = null
                    }
                };
                this.closedByInactivity = function() {
                    this.killedByServer = !0
                };
                this.onClose = function(a) {
                    D = a
                };
                this.getPlayerById = function(a) {
                    for (var b = 0; b < this.players.length; b++)
                        if (this.players[b].pid == a) return this.players[b];
                    return null
                };
                this.getIdByCharacter = function(a) {
                    for (var b = 0; b < this.players.length; b++)
                        if (this.players[b].character == a) return this.players[b].pid;
                    return -1
                };
                this.initSimulation = function() {
                    if (t.simulation) throw Error("Match not ended yet");
                    t.simulation = new d(t);
                    t.simulation.setMap(a.mapGfx.map)
                };
                this.update = function(a) {
                    a = a || 1;
                    var b = Date.now();
                    2 == a && 200 >
                        b - t.lastUpdate || (t.lastUpdate = b, t.ready && (t.simulation && t.simulation.update(), t.updateUI()))
                };
                this.updateUI = function() {
                    e.healthInfo.render();
                    e.ammoInfo.render();
                    e.heatInfo.render();
                    e.matchInfo.render()
                };
                this.error = function(a, b) {
                    this.connection && (this.connection.close(), this.connection = null);
                    this.ready = !1;
                    this.connectionStage = 0;
                    211 == a ? this.closedByInactivity() : 213 == a ? l.show(2) : (305 == a && setTimeout(function() {
                        throw Error("Lag error " + I);
                    }, 0), D && D(a, b))
                }
            }
        }, {}],
        86: [function(f, n, m) {
            function a(a, e) {
                this.pos = [0, 0];
                this.state = 1;
                this.distance = -1;
                this.fadeTime = 2;
                this.fadeStart = Date.now();
                this.dopplerModifier = this.speedModifier = 1;
                for (var b = [], k = 0, c = 0; 50 > c; c++) b.push(0);
                var g = e.createBufferSource(),
                    f = e.createGain();
                g.playbackRate.value = 1;
                f.gain.value = 0;
                g.buffer = a;
                g.connect(f);
                f.connect(e.destination);
                g.loop = !0;
                g.start(0);
                this.setPos = function(a, b) {
                    this.pos[0] = a;
                    this.pos[1] = b
                };
                this.setDistance = function(a) {
                    this.lastDistance = this.distance;
                    this.distance = a
                };
                this.setSpeedModifier = function(a) {
                    this.speedModifier = a
                };
                this.update = function() {
                    if (0 != this.distance) {
                        var a = 1 / (this.distance / 300) - .05,
                            c = 1,
                            d = (Date.now() - this.fadeStart) / 1E3,
                            e = d / this.fadeTime;
                        d < this.fadeTime ? c = 2 == this.state ? 1 - e : e : 2 == this.state && (g.stop(0), f.disconnect(), c = this.state = 0);
                        f.gain.value = Math.max(0, Math.min(a * c, 1));
                        0 <= this.lastDistance && 0 <= this.distance && (a = this.distance - this.lastDistance, 50 > a && (b.push(a), c = b.shift(), k -= c, k += a, this.dopplerModifier = 1 - k / b.length / 120));
                        g.playbackRate.value = this.speedModifier * this.dopplerModifier
                    }
                };
                this.isStopped = function() {
                    return 0 ==
                        this.state
                };
                this.stop = function() {
                    if (1 == this.state) {
                        var a = Date.now() - this.fadeStart;
                        this.fadeStart = a < 1E3 * this.fadeTime ? Date.now() - (1E3 * this.fadeTime - a) : Date.now();
                        this.state = 2
                    }
                }
            }
            var h = f(60);
            n.exports = new function() {
                var b = window.AudioContext || window.webkitAudioContext,
                    e = b ? new b : null,
                    d = [],
                    k = [],
                    c = [],
                    g = [0, 0];
                this.loadBank = function(a, b) {
                    var c = {
                        url: a,
                        def: b,
                        state: 0,
                        data: null
                    };
                    d.push(c);
                    if (this.hasAudio()) {
                        var l = new XMLHttpRequest;
                        l.open("GET", a, !0);
                        l.responseType = "arraybuffer";
                        l.onreadystatechange = function() {
                            l.readyState ==
                                XMLHttpRequest.DONE && 200 == l.status && e.decodeAudioData && e.decodeAudioData(l.response, function(a) {
                                    c.state = 1;
                                    c.data = a
                                }, function(a) {
                                    console.error("Audio not supported", a)
                                })
                        };
                        l.send()
                    }
                    return c
                };
                this.playSound = function(a, b, c) {
                    if (this.hasAudio())
                        for (c && this.stopSound(a), c = 0; c < d.length; c++)
                            if (1 == d[c].state)
                                for (var e = 0; e < d[c].def.length; e++) {
                                    var l = d[c].def[e];
                                    if (l.name == a) {
                                        e = 1 + (Math.random() - .5) * l.rateVar;
                                        var g = b ? this.getGainFromPos(b[0], b[1]) : 1;
                                        if (0 >= g) return;
                                        var f = this.playBuffer(d[c].data, l.start, l.end,
                                            e, g);
                                        if (!f) return;
                                        k.push({
                                            source: f.source,
                                            gain: f.gain,
                                            pos: b ? b.slice() : null,
                                            name: a
                                        });
                                        f.source.onended = function() {
                                            for (var a = 0; a < k.length; a++)
                                                if (k[a].source == f.source) {
                                                    k.splice(a, 1);
                                                    break
                                                }
                                        };
                                        return
                                    }
                                }
                };
                this.stopSound = function(a) {
                    for (var b = 0; b < k.length; b++) k[b].name == a && k[b].source.stop(0)
                };
                this.createChannel = function(b) {
                    if (!this.hasAudio() || this.isMuted()) return null;
                    for (var l = 0; l < d.length; l++)
                        if (1 == d[l].state)
                            for (var g = 0; g < d[l].def.length; g++) {
                                var k = d[l].def[g];
                                if (k.name == b) {
                                    b = ~~(k.start / 44100 * d[l].data.sampleRate);
                                    k = ~~(k.end / 44100 * d[l].data.sampleRate) - b;
                                    g = e.createBuffer(1, k, d[l].data.sampleRate);
                                    l = d[l].data.getChannelData(0);
                                    for (var f = g.getChannelData(0), h = 0; h < k; h++) f[h] = l[b + h];
                                    b = new a(g, e);
                                    c.push(b);
                                    return b
                                }
                            }
                    return null
                };
                this.removeChannel = function(a) {
                    a.stop(0)
                };
                this.updateChannels = function() {
                    for (var a = [], b = 0; b < c.length; b++) {
                        var d = c[b].pos[0] - g[0],
                            e = c[b].pos[1] - g[1];
                        c[b].setDistance(Math.sqrt(d * d + e * e));
                        c[b].update();
                        c[b].isStopped() && a.push(c[b])
                    }
                    for (; 0 < a.length;) b = a.pop(), b = c.indexOf(b), c.splice(b, 1)
                };
                this.setListenerPos = function(a, b) {
                    g[0] = a;
                    g[1] = b;
                    for (a = 0; a < k.length; a++) k[a].pos && (k[a].gain.gain.value = this.getGainFromPos(k[a].pos[0], k[a].pos[1]))
                };
                this.getGainFromPos = function(a, b) {
                    a = g[0] - a;
                    b = g[1] - b;
                    return 1 - Math.min(1, Math.max(.1, Math.sqrt(a * a + b * b) / 2E3))
                };
                this.playBuffer = function(a, b, c, d, g) {
                    if (this.hasAudio() && !this.isMuted()) {
                        void 0 === g && (g = 1);
                        b /= 44100;
                        c /= 44100;
                        var l = e.createBufferSource(),
                            k = e.createGain();
                        l.playbackRate.value = d;
                        k.gain.value = g;
                        l.buffer = a;
                        l.connect(k);
                        k.connect(e.destination);
                        l.start(0, b, c - b);
                        return {
                            source: l,
                            gain: k
                        }
                    }
                };
                this.isBankLoaded = function(a) {
                    return a.state
                };
                this.hasAudio = function() {
                    return !!e
                };
                this.isMuted = function() {
                    return h.get("noSound") ? !0 : !1
                }
            }
        }, {}],
        87: [function(f, n, m) {
            function a(a) {
                if (!a || void 0 == a.type) throw Error("Invalid args");
                this.init(h.shaderBall[a.type]);
                this._uniforms = {
                    texBorder: {
                        type: "samplerIndex",
                        value: 0
                    },
                    texFlag: {
                        type: "samplerIndex",
                        value: 1
                    },
                    texEyes: {
                        type: "samplerIndex",
                        value: 2
                    },
                    texGlasses: {
                        type: "samplerIndex",
                        value: 3
                    },
                    flagTexOffset: {
                        type: "2f",
                        value: [0,
                            0
                        ]
                    },
                    flagTexSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    glassesTexOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    glassesTexSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    eyeOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    eyePos: {
                        type: "2f",
                        value: [0, 0]
                    },
                    eyeSize: {
                        type: "1f",
                        value: .3
                    },
                    eyeLeftAngle: {
                        type: "1f",
                        value: 0
                    },
                    eyeRightAngle: {
                        type: "1f",
                        value: 0
                    },
                    glassesOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    flagInvert: {
                        type: "bool",
                        value: !1
                    }
                }
            }
            m = f(166).Material;
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setFlagTex = function(a) {
                this._uniforms.flagTexOffset.value[0] =
                    a.rect.x;
                this._uniforms.flagTexOffset.value[1] = a.rect.y;
                this._uniforms.flagTexSize.value[0] = a.rect.w;
                this._uniforms.flagTexSize.value[1] = a.rect.h
            };
            a.prototype.setGlassesTex = function(a) {
                a ? (this._uniforms.glassesTexOffset.value[0] = a.rect.x, this._uniforms.glassesTexOffset.value[1] = a.rect.y, this._uniforms.glassesTexSize.value[0] = a.rect.w, this._uniforms.glassesTexSize.value[1] = a.rect.h) : (this._uniforms.glassesTexSize.value[0] = 0, this._uniforms.glassesTexSize.value[1] = 0)
            };
            a.prototype.setEyeTexOffset = function(a,
                e) {
                this._uniforms.eyeOffset.value = [.25 * a, .25 * e]
            };
            a.prototype.setEyeOffset = function(a, e) {
                this._uniforms.eyePos.value = [a + .5, e + .4]
            };
            a.prototype.setGlassesOffset = function(a, e) {
                this._uniforms.glassesOffset.value = [a, e]
            };
            a.prototype.setEyeRotation = function(a, e) {
                this._uniforms.eyeLeftAngle.value = a;
                this._uniforms.eyeRightAngle.value = e
            };
            a.prototype.setFlagInverted = function(a) {
                this._uniforms.flagInvert.value = a
            };
            n.exports = a
        }, {}],
        88: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderBg));
                this._uniforms = {
                    offset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenFactor: {
                        type: "2f",
                        value: [1, 1]
                    },
                    sunOffset: {
                        type: "2f",
                        value: [1, .4]
                    },
                    sunSize: {
                        type: "1f",
                        value: 7
                    },
                    sunScrollFactor: {
                        type: "1f",
                        value: .5
                    },
                    skyColor: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    skyColor2: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    fogColor: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    fogStart: {
                        type: "1f",
                        value: 0
                    },
                    brightness: {
                        type: "1f",
                        value: 1
                    }
                }
            }
            m = f(166).Material;
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setScreenFactor = function(a, e) {
                this._uniforms.screenFactor.value[0] =
                    a;
                this._uniforms.screenFactor.value[1] = e
            };
            a.prototype.setOffset = function(a, e) {
                this._uniforms.offset.value[0] = a;
                this._uniforms.offset.value[1] = e
            };
            a.prototype.setSkyColor = function(a, e, d, k, c, g) {
                this._uniforms.skyColor.value[0] = a;
                this._uniforms.skyColor.value[1] = e;
                this._uniforms.skyColor.value[2] = d;
                this._uniforms.skyColor2.value[0] = k;
                this._uniforms.skyColor2.value[1] = c;
                this._uniforms.skyColor2.value[2] = g
            };
            a.prototype.setFog = function(a, e, d, k) {
                this._uniforms.fogColor.value[0] = a;
                this._uniforms.fogColor.value[1] =
                    e;
                this._uniforms.fogColor.value[2] = d;
                this._uniforms.fogStart.value = k
            };
            a.prototype.setBrightness = function(a) {
                this._uniforms.brightness.value = a
            };
            n.exports = a
        }, {}],
        89: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderBlast));
                this._uniforms = {
                    texData: {
                        type: "samplerIndex",
                        value: 1
                    },
                    screenOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    }
                }
            }
            m = f(166).Material;
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setScreenSize = function(a,
                e) {
                this._uniforms.screenSize.value[0] = a;
                this._uniforms.screenSize.value[1] = e
            };
            a.prototype.setOffset = function(a, e) {
                this._uniforms.screenOffset.value[0] = a;
                this._uniforms.screenOffset.value[1] = e
            };
            n.exports = a
        }, {}],
        90: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderCompose));
                this._uniforms = {
                    texBg: {
                        type: "samplerIndex",
                        value: 0
                    },
                    texGame: {
                        type: "samplerIndex",
                        value: 1
                    },
                    texData: {
                        type: "samplerIndex",
                        value: 2
                    },
                    screenOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    time: {
                        type: "1f",
                        value: 0
                    },
                    waterLevel: {
                        type: "1f",
                        value: 1E5
                    },
                    bwFactor: {
                        type: "1f",
                        value: .8
                    }
                }
            }
            m = f(166).Material;
            var h = f(54),
                b = 0;
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setScreenSize = function(a, b) {
                this._uniforms.screenSize.value[0] = a;
                this._uniforms.screenSize.value[1] = b
            };
            a.prototype.setOffset = function(a, b) {
                this._uniforms.screenOffset.value[0] = a;
                this._uniforms.screenOffset.value[1] = b
            };
            a.prototype.setWaterLevel = function(a) {
                this._uniforms.waterLevel.value = a
            };
            a.prototype.setBlackWhiteFactor =
                function(a) {
                    this._uniforms.bwFactor.value = a
                };
            a.prototype.updateTime = function() {
                0 == b && (b = Date.now());
                this._uniforms.time.value = (Date.now() - b) / 1E3
            };
            n.exports = a
        }, {}],
        91: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderFlag));
                this._uniforms = {
                    time: {
                        type: "1f",
                        value: 0
                    },
                    mirror: {
                        type: "b",
                        value: 0
                    },
                    color: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    }
                }
            }
            m = f(166).Material;
            var h = f(54),
                b = 0;
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setMirror = function(a) {
                this._uniforms.mirror.value =
                    a
            };
            a.prototype.setColor = function(a, b, k) {
                this._uniforms.color.value[0] = a;
                this._uniforms.color.value[1] = b;
                this._uniforms.color.value[2] = k
            };
            a.prototype.updateTime = function() {
                0 == b && (b = Date.now());
                this._uniforms.time.value = (Date.now() - b) / 1E3
            };
            n.exports = a
        }, {}],
        92: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderMap));
                this._uniforms = {
                    texAtlas: {
                        type: "samplerIndex",
                        value: 1
                    },
                    offset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    mapSizeMax: {
                        type: "1f",
                        value: 0
                    },
                    mapSize: {
                        type: "2f",
                        value: [0, 0]
                    },
                    atlasEdgeSize: {
                        type: "1f",
                        value: 0
                    },
                    borderColor: {
                        type: "4f",
                        value: [0, 0, 0, 0]
                    }
                }
            }
            m = f(166).Material;
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor = m;
            a.prototype.setScreenSize = function(a, e) {
                this._uniforms.screenSize.value[0] = a;
                this._uniforms.screenSize.value[1] = e
            };
            a.prototype.setMapSize = function(a, e, d) {
                this._uniforms.mapSize.value = [a, e];
                this._uniforms.mapSizeMax.value = d
            };
            a.prototype.setAtlasEdgeSize = function(a) {
                this._uniforms.atlasEdgeSize.value = a
            };
            a.prototype.setOffset =
                function(a, e) {
                    this._uniforms.offset.value[0] = a;
                    this._uniforms.offset.value[1] = e
                };
            a.prototype.setBorderColor = function(a, e, d, k) {
                this._uniforms.borderColor.value[0] = a / 255;
                this._uniforms.borderColor.value[1] = e / 255;
                this._uniforms.borderColor.value[2] = d / 255;
                this._uniforms.borderColor.value[3] = k / 255
            };
            n.exports = a
        }, {}],
        93: [function(f, n, m) {
            function a() {
                this.init(h.shaderHelper.solveFullShader(h.shaderParticle));
                this._uniforms = {}
            }
            m = f(166).Material;
            var h = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.constructor =
                m;
            n.exports = a
        }, {}],
        94: [function(f, n, m) {
            var a = f(98),
                h = f(118),
                b = f(106),
                e = f(100),
                d = f(119),
                k = f(97),
                c = f(112),
                g = f(116),
                q = f(120),
                l = f(111),
                p = f(110),
                A = f(114),
                y = f(107),
                x = f(108),
                w = f(109),
                B = f(105),
                r = f(96),
                z = f(99),
                t = f(101),
                D = f(103),
                E = f(104),
                I = f(117),
                K = f(115),
                P = f(102),
                Q = f(113),
                M = f(77),
                F = f(64),
                L = f(131),
                H = f(57),
                G = f(39),
                J = f(95);
            f(16);
            n.exports = function() {
                var f = this,
                    m = document.createElement("div");
                m.id = "uiOverlay";
                document.getElementById("game").appendChild(m);
                var n = [{
                    key: "300",
                    class: "implIAB300",
                    targetClass: "containerIAB300",
                    active: !0
                }, {
                    key: "728",
                    class: "implIAB728",
                    centerBottom: !0,
                    active: !0
                }];
                this.widgets = [];
                this.modal = new M(this);
                this.playerCount = this.eomPage = this.uiState = 0;
                this.dev = !1;
                this.alive = !0;
                this.matchStalling = this.inviteDeactivated = !1;
                this.marketingCam = L.getArg("mc");
                this.modalWidget = this.ingameMenuWidget = this.chatWidget = this.browserWarningWidget = this.achievementWidget = this.inviteWidget = this.maintenanceWidget = this.loading1Widget = this.loading0Widget = this.toastWidget = this.progressionWidget = this.matchEndWidget =
                    this.matchErrorWidget = this.registerWidget = this.settingsWidget = this.hintsWidget = this.matchSelectionWidget = this.ballSelectWidget = this.titleWidget = this.captureWdget = this.killsWidget = this.statsWidget = this.bgWidget = null;
                this.initWidgets = function() {
                    this.bgWidget = new a;
                    this.killsWidget = new b;
                    this.captureWidget = new e;
                    this.titleWidget = new d;
                    this.ballSelectWidget = new k;
                    this.matchSelectionWidget = new c;
                    this.hintsWidget = new D;
                    this.settingsWidget = new g;
                    this.toastWidget = new q;
                    this.matchErrorWidget = new l;
                    this.matchEndWidget =
                        new p;
                    this.progressionWidget = new A;
                    this.loading0Widget = new y;
                    this.loading1Widget = new x;
                    this.maintenanceWidget = new w;
                    this.inviteWidget = new B;
                    this.achievementWidget = new r;
                    this.browserWarningWidget = new z;
                    this.chatWidget = new t;
                    this.statsWidget = new h;
                    this.ingameMenuWidget = new E;
                    this.sidebarWidget = new I;
                    this.registerWidget = new K;
                    this.classicWidget = new P;
                    this.modalWidget = new Q;
                    this.widgets.push(this.statsWidget);
                    this.widgets.push(this.killsWidget);
                    this.widgets.push(this.captureWidget);
                    this.widgets.push(this.titleWidget);
                    this.widgets.push(this.ballSelectWidget);
                    this.widgets.push(this.matchSelectionWidget);
                    this.widgets.push(this.settingsWidget);
                    this.widgets.push(this.toastWidget);
                    this.widgets.push(this.matchErrorWidget);
                    this.widgets.push(this.matchEndWidget);
                    this.widgets.push(this.progressionWidget);
                    this.widgets.push(this.loading0Widget);
                    this.widgets.push(this.loading1Widget);
                    this.widgets.push(this.maintenanceWidget);
                    this.widgets.push(this.inviteWidget);
                    this.widgets.push(this.achievementWidget);
                    this.widgets.push(this.browserWarningWidget);
                    this.widgets.push(this.chatWidget);
                    this.widgets.push(this.hintsWidget);
                    this.widgets.push(this.ingameMenuWidget);
                    this.widgets.push(this.sidebarWidget);
                    this.widgets.push(this.registerWidget);
                    this.widgets.push(this.classicWidget);
                    this.widgets.push(this.modalWidget);
                    this.inviteWidget.onClose(function() {
                        f.inviteDeactivated = !0;
                        f.updateInviteStatus()
                    });
                    for (var m = 0; m < this.widgets.length; m++) this.widgets[m].setActive(!1)
                };
                this.initInput = function() {
                    H.addPreventDefault(9)
                };
                this.update = function() {
                    F.update();
                    1 == this.uiState && (this.browserWarningWidget.goIngame(), H.isDown(9) || !this.alive ? (this.statsWidget.setActive(!0), this.captureWidget.setActive(!1), G.matchInfo.setVisible(!1), G.ammoInfo.setVisible(!1), G.heatInfo.setVisible(!1), G.healthInfo.setVisible(!1), this.inviteWidget.setActive(!1), this.chatWidget.setActive(!this.alive)) : (this.statsWidget.setActive(!1), this.chatWidget.setActive(!0), G.matchInfo.setVisible(!0), G.ammoInfo.setVisible(!0), G.heatInfo.setVisible(!0), G.healthInfo.setVisible(!0)), this.marketingCam &&
                        (G.matchInfo.setVisible(!1), G.healthInfo.setVisible(!1), G.heatInfo.setVisible(!1), G.ammoInfo.setVisible(!1), this.chatWidget.setActive(!1), this.toastWidget.setActive(!1), this.ingameMenuWidget.setActive(!1)));
                    this.updateInviteStatus();
                    this.updateAd();
                    for (var a = 0; a < this.widgets.length; a++) this.widgets[a].active && this.widgets[a].update()
                };
                this.updateInviteStatus = function() {
                    var a = !1;
                    1 == this.playerCount && (a = !0);
                    1 != this.uiState && (a = !1);
                    this.alive || (a = !1);
                    H.isDown(9) && (a = !1);
                    this.inviteDeactivated && (a = !1);
                    this.matchStalling && (a = !1);
                    this.dev && (a = !1);
                    this.inviteWidget.setActive(a)
                };
                this.setAlive = function(a) {
                    this.alive = a
                };
                this.setDev = function() {
                    this.dev = !0
                };
                this.setPlayerCount = function(a) {
                    a != this.playerCount && 1 != a && (this.inviteDeactivated = !1);
                    this.playerCount = a;
                    this.updateInviteStatus()
                };
                this.setMatchUIState = function(a) {
                    2 != this.uiState && 2 == a ? setTimeout(function() {
                        f.setAd("728", !0)
                    }, 800) : 2 == this.uiState && 2 != a && f.setAd("728", !1);
                    this.uiState = a;
                    switch (a) {
                        case 0:
                            this.statsWidget.setActive(!1);
                            this.captureWidget.setActive(!1);
                            G.healthInfo.setVisible(!1);
                            G.heatInfo.setVisible(!1);
                            G.ammoInfo.setVisible(!1);
                            G.matchInfo.setVisible(!1);
                            this.matchEndWidget.setActive(!1);
                            this.progressionWidget.setActive(!1);
                            this.killsWidget.setActive(!1);
                            this.inviteWidget.setActive(!1);
                            this.chatWidget.setActive(!1);
                            break;
                        case 1:
                            G.matchInfo.setVisible(!0);
                            G.healthInfo.setVisible(!0);
                            G.heatInfo.setVisible(!0);
                            G.ammoInfo.setVisible(!0);
                            this.matchEndWidget.setActive(!1);
                            this.progressionWidget.setActive(!1);
                            this.killsWidget.setActive(!0);
                            this.ingameMenuWidget.setActive(!0);
                            break;
                        case 2:
                            this.statsWidget.setActive(!1), this.captureWidget.setActive(!1), G.healthInfo.setVisible(!1), G.heatInfo.setVisible(!1), G.ammoInfo.setVisible(!1), G.matchInfo.setVisible(!1), this.matchEndWidget.setActive(0 == this.eomPage), this.progressionWidget.setActive(1 == this.eomPage), this.inviteWidget.setActive(!1), this.toastWidget.setActive(!1), this.chatWidget.setActive(!0), this.ingameMenuWidget.setActive(!1)
                    }
                };
                this.setPageEoM = function(a) {
                    this.eomPage = a;
                    this.setMatchUIState(this.uiState)
                };
                this.getSidebarMargin =
                    function() {
                        return this.sidebarWidget.active ? 500 : 0
                    };
                this.setAd = function(a, b) {
                    for (var c = 0; c < n.length; c++)
                        if (n[c].key == a) {
                            var d = document.body.querySelector("." + n[c].class);
                            b ? d.style.display = "block" : (d.style.top = "-5000px", d.style.bottom = "-5000px", d.style.left = "-5000px", d.style.display = "none");
                            n[c].active = b
                        }
                    this.updateAd()
                };
                this.updateAd = function() {
                    for (var a = 0; a < n.length; a++) {
                        var b = n[a];
                        if (b.active) {
                            var c = document.body.querySelector("." + b.class);
                            if (b.targetClass) {
                                b = document.body.querySelector("." + b.targetClass);
                                if (!c || !b) break;
                                b = b.getBoundingClientRect();
                                c.style.top = b.top + "px";
                                c.style.left = b.left + "px"
                            } else b.centerBottom && c && (c.style.top = "auto", c.style.bottom = "0", c.style.left = "calc(50% - 728px/2)")
                        }
                    }
                };
                this.updateViewport = function(a, b) {
                    J.width = a || J.width;
                    J.height = b || J.height;
                    for (a = 0; a < this.widgets.length; a++) this.widgets[a].updateViewport()
                };
                this.initWidgets();
                this.initInput()
            }
        }, {}],
        95: [function(f, n, m) {
            n.exports = {
                width: 0,
                height: 0
            }
        }, {}],
        96: [function(f, n, m) {
            function a() {
                this.init("achievement", "achievement");
                this.dataEarned = [];
                this.onCloseHandler = null;
                this.render()
            }
            m = f(121);
            var h = f(124),
                b = f(95),
                e = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                function a() {
                    b.setActive(!1);
                    if (b.onCloseHandler) b.onCloseHandler()
                }
                var b = this,
                    c = [],
                    g;
                for (g in h) {
                    var f = h[g],
                        l = -1 == this.dataEarned.indexOf(~~g);
                    c.push({
                        status: l ? "Not earned yet" : "Achievement unlocked",
                        name: f.name,
                        desc: f.desc,
                        itemClass: l ? "locked" : "unlocked"
                    })
                }
                c.sort(function(a, b) {
                    return b.itemClass.localeCompare(a.itemClass)
                });
                this.updateDOM({
                    achievements: c
                });
                (function(a) {
                    if (e.texCup)
                        for (var b = 0; b < a.length; b++) e.texCup.draw(a[b].getContext("2d"), 0, 0, 0, 0, 2, 2)
                })(this.mainElement.querySelectorAll("canvas.cup"));
                this.mainElement.onclick = function(c) {
                    c.target == b.mainElement && a()
                };
                this.mainElement.querySelector(".closeX").onclick = a;
                this.updateViewport()
            };
            a.prototype.onClose = function(a) {
                this.onCloseHandler = a
            };
            a.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var a = 1,
                    e = Math.min(b.width - 0, .9 * (b.height - 80)),
                    c = e / .9;
                550 <
                    e ? (e = 550, c = e / .9) : a = e / 550;
                e = b.width / 2 - e / 2;
                c = b.height / 2 - c / 2;
                this.setElementPosition(this.innerElement, c, c, e, e);
                this.innerElement.style.fontSize = 24 * a + "px"
            };
            a.prototype.setEarned = function(a) {
                this.dataEarned = a
            };
            n.exports = a
        }, {}],
        97: [function(f, n, m) {
            function a() {
                this.init("ballselect", "ballselect");
                this.ballselectcloseXElement = this.ballselectElement = this.playerselectElement = this.ballSearchElement = this.ballListInnerElement = this.ballListElement = this.previewElement = this.formElement = this.windowElement = null;
                this.selectedBall = new p;
                this.previewBall = null;
                this.initialRendered = !1;
                this.ballList = null;
                this.currentScale = 1;
                this.callbacks = this.authData = null;
                this.render();
                "kugeln.io" == location.host && document.body.classList.add("beta")
            }
            m = f(121);
            var h = f(54),
                b = f(152),
                e = f(47),
                d = f(95),
                k = f(76),
                c = f(132),
                g = f(60),
                q = f(57),
                l = f(19),
                p = f(127);
            a.prototype = Object.create(m.prototype);
            a.prototype.setCallbacks = function(a) {
                this.callbacks = a
            };
            a.prototype.setBall = function(a) {
                this.selectedBall = a;
                this.updateSelectedBall()
            };
            a.prototype.setAuth = function(a, b) {
                this.authData = a;
                this.render()
            };
            a.prototype.initTooltip = function(a, b, c) {
                var d = b ? b : a.querySelector(".tooltip");
                a.onmouseenter = function(a) {
                    d.style.display = "block"
                };
                a.onmouseleave = function(a) {
                    d.style.display = "none"
                };
                a.onmousemove = function(b) {
                    if (c) b = [b.pageX, b.pageY];
                    else {
                        var e = a.getBoundingClientRect();
                        b = [b.pageX - e.left, b.pageY - e.top]
                    }
                    d.style.left = b[0] + 5 + "px";
                    d.style.top = b[1] + 5 + "px"
                }
            };
            a.prototype.render = function() {
                function a() {
                    c.callbacks.onDone(void 0)
                }

                function b() {
                    c.filterBalls(c.ballSearchElement.value)
                }
                var c = this;
                this.initialRendered || (this.initialRendered = !0, this.updateDOM({}), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.ballListElement = this.windowElement.querySelector(".ballList"), this.ballListInnerElement = this.ballListElement.querySelector(".ballListInner"), this.ballselectElement =
                    this.windowElement.querySelector(".ballselect"), this.ballselectCloseXElement = this.windowElement.querySelector(".ballselect .closeX"), this.previewElement = this.ballselectElement.querySelector("canvas.preview"), this.ballSearchElement = this.ballselectElement.querySelector(".ballSearch input"), this.ballselectCloseXElement.onclick = a, this.ballselectElement.querySelector("button.done").onclick = function() {
                        g.set("customization", c.selectedBall);
                        k.socialMessage("setCustomization", {
                            customization: c.selectedBall
                        });
                        c.callbacks.onDone({
                            selectedBall: c.selectedBall
                        })
                    }, this.ballselectElement.querySelector("button.cancel").onclick = a, this.ballSearchElement.onkeydown = b, this.ballSearchElement.onkeyup = b, this.ballSearchElement.onpaste = b, this.updateViewport())
            };
            a.prototype.initIfNecessary = function() {
                function a() {
                    for (var a = 0; a < c.ballList.length; a++)
                        if (c.ballList[a].id == c.selectedBall.ball) c.onSelectBall(c.ballList[a]);
                    for (a = 0; a < b.length; a++) c.onSelectSkin(a, c.selectedBall[b[a].name]);
                    h.ui.hintsWidget.setActive(!1);
                    c.updateViewport();
                    c.setFocus()
                }
                var c = this;
                null == this.ballList ? (this.initBallList(a), this.initSkinLists()) : a()
            };
            a.prototype.initPreview = function() {
                this.previewBall = new e(this.previewElement, 128, 256, !0, this.selectedBall);
                this.previewBall.setViewingDirection(0, 1.2)
            };
            a.prototype.initBallList = function(a) {
                var b = this;
                this.ballList = l.getBallList();
                var d = 0;
                this.authData && (d = c.getXpBreakdown(this.authData.xp).level);
                l.ensurePreviews(function() {
                    for (var c = 0; c < b.ballList.length; c++) {
                        var e = document.createElement("div"),
                            l = b.ballList[c];
                        e.setAttribute("title", l.name);
                        e.classList.add("item");
                        e.appendChild(l.ball64.targetCanvas);
                        e.onclick = function() {
                            b.onSelectBall(this.ball)
                        }.bind({
                            ball: l
                        });
                        l.container = e;
                        b.ballListInnerElement.appendChild(e);
                        if (0 != l.minLvl) {
                            var g = document.createElement("div");
                            g.classList.add("lvlHint");
                            g.textContent = l.minLvl;
                            if (l.minLvl > d) {
                                l.container.classList.add("locked");
                                var k = "";
                                b.authData || (k = " Login to level up!");
                                var f = document.createElement("div");
                                f.classList.add("tooltip");
                                f.classList.add("skinTooltip");
                                f.innerHTML = 'You need at least <span class="red">level ' + l.minLvl + "</span> for this ball." + k;
                                b.mainElement.appendChild(f);
                                b.initTooltip(l.container, f, !0)
                            }
                            e.appendChild(g)
                        }
                    }
                    a()
                })
            };
            a.prototype.initSkinLists = function() {
                function a(a) {
                    a || (a = event);
                    a.preventDefault();
                    this.scrollLeft -= 40 * (0 > a.detail || 0 < a.wheelDelta ? 1 : -1);
                    return !1
                }
                var d = this,
                    e = 0;
                this.authData && (e = c.getXpBreakdown(this.authData.xp).level);
                for (var l = 0; l < b.length; l++) {
                    var g = this.ballselectElement.querySelector("." + b[l].dom + " .list");
                    b[l].container =
                        g;
                    g.addEventListener("DOMMouseScroll", a.bind(g), !1);
                    g.addEventListener("mousewheel", a.bind(g), !1);
                    var k = document.createElement("span"),
                        f = document.createElement("div"),
                        p = document.createElement("div");
                    p.dataset.item = 0;
                    p.classList.add("item");
                    p.classList.add("selected");
                    f.classList.add("none");
                    p.onclick = function() {
                        d.onSelectSkin(this.i, 0)
                    }.bind({
                        i: l
                    });
                    k.textContent = "NONE";
                    f.appendChild(k);
                    p.appendChild(f);
                    g.appendChild(p);
                    k = b[l].list.slice().sort(function(a, b) {
                        return a.minLvl - b.minLvl
                    });
                    for (f = 0; f < k.length; f++) {
                        var q =
                            document.createElement("canvas");
                        q.width = 48;
                        q.height = 48;
                        var m = k[f];
                        h.texSkins[l][m.id - 1].draw(q.getContext("2d"), m.previewX, m.previewY, 48 * m.previewScale, 48 * m.previewScale);
                        p = document.createElement("div");
                        p.dataset.item = m.id;
                        m.container = p;
                        p.onclick = function() {
                            d.onSelectSkin(this.i, this.item)
                        }.bind({
                            i: l,
                            item: m.id
                        });
                        p.classList.add("item");
                        p.appendChild(q);
                        g.appendChild(p);
                        if (0 != m.minLvl) {
                            q = document.createElement("div");
                            q.classList.add("lvlHint");
                            q.textContent = m.minLvl;
                            if (m.minLvl > e) {
                                m.container.classList.add("locked");
                                var n = "";
                                this.authData || (n = " Login to level up!");
                                var K = document.createElement("div");
                                K.classList.add("tooltip");
                                K.classList.add("skinTooltip");
                                K.innerHTML = 'You need at least <span class="red">level ' + m.minLvl + "</span> for this skin." + n;
                                this.mainElement.appendChild(K);
                                this.initTooltip(m.container, K, !0)
                            }
                            p.appendChild(q)
                        }
                    }
                }
            };
            a.prototype.filterBalls = function(a) {
                a = this.normalizeString(a);
                for (var b = 0; b < this.ballList.length; b++) {
                    var c = this.ballList[b];
                    c.keywords || (c.keywords = [c.id, this.normalizeString(c.name),
                        this.normalizeString(c.country)
                    ]);
                    var d = this.testSearchStringOnBallRecord(c, a);
                    c.container.style.display = d ? "block" : "none"
                }
            };
            a.prototype.testSearchStringOnBallRecord = function(a, b) {
                for (var c = 0; c < a.keywords.length; c++)
                    if (-1 != a.keywords[c].indexOf(b)) return !0;
                return !1
            };
            a.prototype.onSelectBall = function(a) {
                this.selectedBall.ball = a.id;
                for (var b = 0; b < this.ballList.length; b++) {
                    var c = this.ballList[b];
                    c == a ? c.container.classList.add("selected") : c.container.classList.remove("selected")
                }
                this.updateSelectedBall()
            };
            a.prototype.onSelectSkin = function(a, c) {
                this.previewBall || this.initPreview();
                for (var d = this.ballselectElement.querySelectorAll("." + b[a].dom + " .list .item"), e = 0; e < d.length; e++) {
                    var l = d[e];
                    l.dataset.item == c ? l.classList.add("selected") : l.classList.remove("selected")
                }
                this.selectedBall[b[a].name] = c;
                this.previewBall.setCustomization(this.selectedBall);
                this.updateSkinFailure()
            };
            a.prototype.normalizeString = function(a) {
                var b = "\u00e4 ae \u00fc ue \u00f6 oe \u00e9 e \u00e8 e \u00ea e \u00e1 a \u00e0 a \u00e2 a \u00fa u \u00f9 u \u00fb u \u00f4 o \u00e7 c \u0153 oe \u00ff y".split(" ");
                a = a.replace(/\s/g, "").toLowerCase().trim();
                for (var c = 0; c < b.length; c += 2) a = a.replace(new RegExp("/" + b[c] + "/", "g"), b[c + 1]);
                return a
            };
            a.prototype.updateSkinFailure = function() {
                var a = 0,
                    d = 0;
                this.authData && (d = c.getXpBreakdown(this.authData.xp).level);
                for (var e = 0; e < b.length; e++) {
                    for (var l = b[e], g = this.selectedBall[l.name], k = null, f = 0; f < l.list.length; f++)
                        if (l.list[f].id == g) {
                            k = l.list[f];
                            break
                        }
                    k && (a = Math.max(a, k.minLvl))
                }
                for (e = 0; e < this.ballList.length; e++) l = this.ballList[e], l.id == this.selectedBall.ball && (a = Math.max(a,
                    l.minLvl));
                e = this.ballselectElement.querySelector(".skinFailure");
                l = this.ballselectElement.querySelector("button.done");
                a > d ? (e.textContent = "You need Level " + a + " for this skin", e.style.display = "block", l.disabled = !0) : (e.style.display = "none", l.disabled = !1)
            };
            a.prototype.update = function() {
                this.updatePreview();
                q.isHit(27) && (this.selectedBall = null, this.updateViewport())
            };
            a.prototype.updatePreview = function() {
                this.previewBall || this.initPreview();
                var a = this.previewBall,
                    b = q.getAbsoluteMousePos(),
                    c = 0;
                if (0 < b.length) {
                    var d = a.targetCanvas.getBoundingClientRect();
                    c = b[0] - (d.left + d.width / 2);
                    d = b[1] - (d.top + d.height / 2);
                    b = Math.atan2(d, c);
                    d = Math.min(Math.sqrt(c * c + d * d) / 100, 1.5);
                    c = 1
                } else d = 1, b = -3;.9 > d ? (a.setEye(13), c = 0) : 5 > h.frameCounter % 300 ? a.setEye(9) : a.setEye(14);
                a.setViewingDirection(b, d, c);
                a.render()
            };
            a.prototype.updateSelectedBall = function() {
                this.previewBall && this.previewBall.setCustomization(this.selectedBall);
                this.updateSkinFailure()
            };
            a.prototype.updateViewport = function() {
                if (h.ui) {
                    var a = h.ui.getSidebarMargin(),
                        b = 1,
                        c = Math.min(d.width - a, 1.5 * (d.height - 20));
                    a = c / 1.5;
                    1450 < c ? (c = 1450, a = c / 1.5) : b = c / 1450;
                    c = d.width / 2 - c / 2;
                    this.setElementPosition(this.windowElement, d.height / 2 - a / 2, d.height / 2 - a / 2, c, c);
                    this.windowElement.style.fontSize = 18 * b + "px";
                    this.currentScale = b;
                    h.ui && h.ui.hintsWidget && h.ui.hintsWidget.setView([d.width / 2, .8 * d.height], b)
                }
            };
            n.exports = a
        }, {}],
        98: [function(f, n, m) {
            function a() {
                this.init("bg", "bg");
                this.render()
            }
            m = f(121);
            f(95);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                this.updateDOM();
                this.updateViewport()
            };
            a.prototype.update = function() {};
            a.prototype.updateViewport = function() {};
            n.exports = a
        }, {}],
        99: [function(f, n, m) {
            function a() {
                var a = this;
                e = f(37);
                d = f(54);
                this.init("browserwarning", "browserwarning");
                this.states = {
                    BrowserIE: !1,
                    BrowserOpera: !1,
                    BrowserYandex: !1,
                    BrowserOldChrome: !1,
                    Mobile: !1,
                    Cookie: !1,
                    LowFps: !1
                };
                this.widgetMode = 0;
                this.lowFpsCounter = 5E3;
                !0 !== h.get("cookieAccepted") && (a.states.Cookie = !0);
                this.isIE = b.Core.Util.isIE();
                this.isOpera = b.Core.Util.isOpera();
                this.isVivaldi = b.Core.Util.isVivaldi();
                this.isYandex = b.Core.Util.isYandex();
                this.isChrome = b.Core.Util.isChrome();
                this.isIE && setTimeout(function() {
                    a.states.BrowserIE = !0;
                    a.render()
                }, 2E3);
                (this.isOpera || this.isVivaldi) && setTimeout(function() {
                    a.states.BrowserOpera = !0;
                    a.render()
                }, 2E3);
                this.isYandex && setTimeout(function() {
                    a.states.BrowserYandex = !0;
                    a.render()
                }, 2E3);
                if (this.isChrome) {
                    var c = b.Core.Util.getChromeVersion();
                    c && setTimeout(function() {
                        50 > ~~c.split(".")[0] && (a.states.BrowserOldChrome = !0, a.render())
                    }, 2E3)
                }(this.isMobile = b.Core.Util.isMobile()) &&
                setTimeout(function() {
                    a.states.Mobile = !0;
                    a.render()
                }, 500);
                this.render()
            }
            m = f(121);
            f(95);
            var h = f(60),
                b = f(156),
                e = null,
                d = null;
            a.prototype = Object.create(m.prototype);
            a.prototype.goIngame = function() {
                if (1 != this.widgetMode) {
                    for (var a in this.states) switch (a) {
                        case "LowFPS":
                            break;
                        default:
                            this.states[a] = !1
                    }
                    this.render()
                }
            };
            a.prototype.render = function() {
                var a = this;
                this.updateViewport();
                for (var b in this.states) {
                    var d = this.states[b],
                        e = this.mainElement.querySelector(".msg" + b);
                    e && (e.style.display = d ? "block" : "none",
                        d = e.querySelector(".closeX")) && (d.onclick = function() {
                        "Cookie" == this.type && h.set("cookieAccepted", !0);
                        a.states[this.type] = !1;
                        a.render()
                    }.bind({
                        type: b
                    }))
                }
            };
            a.prototype.updateViewport = function() {};
            a.prototype.update = function() {
                this.active && this.needLowFpsWarning()
            };
            a.prototype.needLowFpsWarning = function() {
                if (!(0 > e.fps) && 1 == d.ui.uiState) {
                    var a = !1;
                    this.lowFpsCounter += e.fps;
                    this.lowFpsCounter -= 25;
                    this.lowFpsCounter = Math.max(0, Math.min(1E4, this.lowFpsCounter));
                    50 > this.lowFpsCounter && (a = !0);
                    a != this.states.LowFps &&
                        (this.states.LowFps = a, this.render())
                }
            };
            n.exports = a
        }, {}],
        100: [function(f, n, m) {
            function a() {
                this.init("capture", "capture");
                this.flagElement = this.data = null;
                this.lastCapture = 0;
                this.flagCanvas = document.createElement("canvas");
                this.flagCanvas.width = 256;
                this.flagCanvas.height = 256
            }
            m = f(121);
            var h = f(95),
                b = f(49);
            f(131);
            f(150);
            a.prototype = Object.create(m.prototype);
            a.prototype.renderFlag = function() {
                null == this.menuFlag && (this.menuFlag = new b, this.menuFlag.init(this.flagCanvas, 128));
                this.menuFlag.setTeam(this.data.flag);
                this.menuFlag.setPos(64, 64, !1);
                this.menuFlag.render()
            };
            a.prototype.set = function(a, b) {
                this.data = {
                    flag: b,
                    msg: a
                };
                this.render();
                this.lastCapture = Date.now();
                this.setActive(!0)
            };
            a.prototype.render = function() {
                null != this.data && (this.renderFlag(), this.updateDOM(this.data), this.flagElement = this.mainElement.querySelector("div.flag"), this.flagElement.appendChild(this.flagCanvas), this.updateViewport())
            };
            a.prototype.update = function() {
                3E3 < Date.now() - this.lastCapture && this.setActive(!1)
            };
            a.prototype.updateViewport =
                function() {
                    var a = 1,
                        b = Math.min(h.width - 100, 4.2 * (h.height - 350)),
                        k = b / 4.2;
                    1E3 < b ? (b = 1E3, k = b / 4.2) : a = b / 1E3;
                    b = h.width / 2 - b / 2;
                    k = h.height / 2 - k / 2 - h.height / 7;
                    this.setElementPosition(this.mainElement, k, k, b, b);
                    this.mainElement.style.fontSize = 24 * a + "px"
                };
            n.exports = a
        }, {}],
        101: [function(f, n, m) {
            function a() {
                this.init("chat", "chat");
                this.target = this.state = 0;
                this.hasTeams = !0;
                this.messages = [];
                this.nick = "";
                this.ownTeam = 0;
                this.inputElement = this.inputAreaElement = this.msgHandler = null;
                this.hintElements = [];
                this.cmdElement = null
            }
            m = f(121);
            f(95);
            var h = f(57);
            a.prototype = Object.create(m.prototype);
            a.prototype.setLocal = function(a, e) {
                this.nick = a;
                this.ownTeam = e
            };
            a.prototype.setHasTeams = function(a) {
                this.hasTeams = a
            };
            a.prototype.onMsg = function(a) {
                this.msgHandler = a
            };
            a.prototype.update = function() {
                h.isHit(13) && 0 == this.state && this.startTyping();
                for (var a = Date.now(); 0 < this.messages.length;) {
                    var e = this.messages[0];
                    if (8 < this.messages.length || 15E3 < a - e.time) this.messages.shift(), e.element.parentElement.removeChild(e.element);
                    else break
                }
            };
            a.prototype.render =
                function() {
                    var a = this;
                    this.updateDOM();
                    this.updateViewport();
                    this.inputElement = this.mainElement.querySelector("input");
                    this.inputAreaElement = this.mainElement.querySelector(".inputArea");
                    this.inputAreaInnerElement = this.mainElement.querySelector(".inputArea .inner");
                    this.cmdElement = this.mainElement.querySelector(".cmd");
                    this.msgElement = this.mainElement.querySelector(".messages");
                    this.hintElements[0] = this.mainElement.querySelector(".inputTip .txt0");
                    this.hintElements[1] = this.mainElement.querySelector(".inputTip .txt1");
                    1 == this.state && this.startTyping();
                    this.updateHints();
                    this.setTarget(this.target);
                    this.inputElement.onkeydown = function(b) {
                        if (13 == b.keyCode) return a.sendMsg(a.inputElement.value, a.target), a.stopTyping(), !1;
                        if (27 == b.keyCode) return a.stopTyping(), !1;
                        if (9 == b.keyCode) return a.hasTeams && a.setTarget(1 - a.target), !1
                    };
                                     this.inputElement.onblur = function(b) {
                        1 == a.state && a.inputElement.focus()
                    };
                    for (var e = 0; e < this.messages.length; e++) this.msgElement.appendChild(this.messages[e].element)
                };
            a.prototype.updateHints = function() {
                this.hintElements[0].style.display =
                    1 != this.state ? "block" : "none";
                this.hintElements[1].style.display = 1 == this.state ? "block" : "none"
            };
            a.prototype.setTarget = function(a) {
                this.target = a;
                this.cmdElement.textContent = 0 == this.target ? "TO ALL: " : "TO TEAM: ";
                this.cmdElement.classList[1 == this.target && 1 == this.ownTeam ? "add" : "remove"]("team1");
                this.cmdElement.classList[1 == this.target && 2 == this.ownTeam ? "add" : "remove"]("team2")
            };
            a.prototype.startTyping = function() {
                this.state = 1;
                this.inputAreaInnerElement.style.display = "block";
                this.inputElement.focus();
                this.updateHints()
            };
            a.prototype.stopTyping = function() {
                this.state = 0;
                this.inputElement.value = "";
                this.inputAreaInnerElement.style.display = "none";
                this.updateHints()
            };
            a.prototype.addServerMsg = function(a) {
                if (this.msgElement) {
                    var b = document.createElement("div");
                    b.classList.add("msg");
                    b.classList.add("server");
                    b.textContent = a;
                    this.messages.push({
                        time: Date.now(),
                        element: b
                    });
                    this.msgElement.appendChild(b)
                }
            };
            a.prototype.addStatusMsg = function(a, e, d) {
                if (this.msgElement) {
                    var b = document.createElement("div");
                    b.classList.add("msg");
                    b.classList.add("status");
                    this.hasTeams || (e = 0);
                    b.classList.add("team" + e);
                    b.textContent = a + (0 == d ? " has joined the match" : " has left the match");
                    this.messages.push({
                        time: Date.now(),
                        element: b
                    });
                    this.msgElement.appendChild(b)
                }
            };
            a.prototype.addMsg = function(a, e, d, f) {
                if (this.msgElement) {
                    var b = document.createElement("div");
                    b.classList.add("msg");
                    b.classList.add("chat");
                    var g = document.createElement("div"),
                        k = document.createElement("div"),
                        l = document.createElement("span"),
                        h = f;
                    f = 1 == a ? f : 0;
                    this.hasTeams || (f = h = 0);
                    g.classList.add("room");
                    k.classList.add("txt");
                    l.classList.add("nick");
                    l.classList.add("team" + h);
                    g.classList.add("team" + f);
                    b.appendChild(g);
                    b.appendChild(k);
                    k.appendChild(l);
                    k.appendChild(document.createTextNode(d));
                    g.textContent = "[" + (0 == a ? "ALL" : "TEAM") + "]";
                    l.textContent = e + ": ";
                    this.messages.push({
                        time: Date.now(),
                        element: b
                    });
                    this.msgElement.appendChild(b)
                }
            };
            a.prototype.sendMsg = function(a, e) {
                a = a.trim();
                "" != a && (this.msgHandler && this.msgHandler(a, e), this.addMsg(e, this.nick, a, this.ownTeam))
            };
            a.prototype.updateViewport = function(a, e) {};
            n.exports = a
        }, {}],
        102: [function(f, n, m) {
            function a() {
                this.init("classic", "classic nativeScroll");
                this.html = "";
                this.render()
            }
            m = f(121);
            var h = f(54),
                b = f(95),
                e = f(26),
                d = f(75);
            a.prototype = Object.create(m.prototype);
            a.prototype.setClassicPage = function(a, b, d) {
                this.html = a;
                this.render();
                this.mainElement.classList[b ? "add" : "remove"]("showScrollbar");
                this.mainElement.classList[d ? "add" : "remove"]("needFullHeight")
            };
            a.prototype.render = function() {
                this.updateDOM({
                    html: this.html
                });
                this.wrapElement = this.mainElement.querySelector(".wrap");
                e.updateButtons(this.wrapElement);
                d.updateButtons(this.wrapElement);
                this.updateViewport()
            };
            a.prototype.updateViewport = function() {
                if (h.ui) {
                    var a = h.ui.getSidebarMargin(),
                        c = b.width - a;
                    if (800 > c) {
                        var d = c / 800;
                        c = 750 * d
                    } else c = 750, d = 1;
                    this.setElementPosition(this.mainElement, 0, 0, a / 2, a / 2);
                    this.wrapElement.style.fontSize = 18 * d + "px";
                    this.wrapElement.style.width = c + "px"
                }
            };
            n.exports = a
        }, {}],
        103: [function(f, n, m) {
            function a() {
                this.init("hints", "hints");
                this.center =
                    null;
                this.scale = 1;
                this.carouselStart = 0;
                this.hints = [];
                this.render();
                var a = h,
                    e;
                for (e = a.length; e; e--) {
                    var d = Math.floor(Math.random() * e);
                    var f = a[e - 1];
                    a[e - 1] = a[d];
                    a[d] = f
                }
                for (a = 0; a < h.length; a++) this.hints.push({
                    text: h[a],
                    element: null
                })
            }
            m = f(121);
            f(95);
            var h = "Play with mouse, not touchpad or touchscreen;Click Advanced Match to create a private match;Press F11 to switch to fullscreen;If the game lags, select a closer region in the settings;Login to collect achievements;Login to save levels and XP;Be peaceful and don't hate in the chat!;Press TAB to see statistics of the match".split(";");
            a.prototype = Object.create(m.prototype);
            a.prototype.setView = function(a, e) {
                this.center = a;
                this.scale = e;
                0 == this.carouselStart && (this.carouselStart = Date.now());
                this.render()
            };
            a.prototype.update = function() {
                if (this.active && 0 != this.carouselStart) {
                    var a = 4200 * this.hints.length,
                        e = (Date.now() - this.carouselStart) % a;
                    a = ~~(e / 4200);
                    var d = (a + 1) % this.hints.length;
                    e = (e - 4200 * a - 4E3) / 200;
                    for (var f = 0 > e ? 0 : 1, c = 0; c < this.hints.length; c++) null != this.hints[c].element && (this.hints[c].element.style.opacity = c == a ? 0 == f ? 1 : 1 - e : c == d ?
                        0 == f ? 0 : e : 0)
                }
            };
            a.prototype.render = function() {
                if (this.center && this.active) {
                    this.updateDOM(this.data);
                    this.updateViewport();
                    for (var a = this.mainElement.querySelector(".list"), e = 0; e < this.hints.length; e++) {
                        var d = document.createElement("div");
                        a.appendChild(d);
                        d.textContent = this.hints[e].text;
                        d.classList.add("hint");
                        this.hints[e].element = d
                    }
                    1 > this.scale && (this.mainElement.style.display = "none")
                }
            };
            a.prototype.updateViewport = function() {
                if (this.active && this.center) {
                    var a = 20 * this.scale,
                        e = 600 * this.scale;
                    this.mainElement.style.top =
                        this.center[1] + "px";
                    this.mainElement.style.left = this.center[0] - .5 * e + "px";
                    this.mainElement.style.width = e + "px";
                    this.mainElement.style.fontSize = a + "px"
                }
            };
            n.exports = a
        }, {}],
        104: [function(f, n, m) {
            function a() {
                this.init("ingamemenu", "ingamemenu blockGameInput");
                this.menuOpen = !1;
                this.render()
            }
            m = f(121);
            f(95);
            f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                var a = this;
                this.updateDOM();
                this.updateViewport();
                this.setMenuState();
                this.mainElement.querySelector(".btnOpen").onclick = function() {
                    a.menuOpen = !a.menuOpen;
                    a.setMenuState()
                };
                for (var b = this.mainElement.querySelectorAll("ul .btn"), e = 0; e < b.length; e++) b[e].onclick = function() {
                    a.onAction(this.name)
                }.bind({
                    name: b[e].dataset.action
                })
            };
            a.prototype.onAction = function(a) {
                switch (a) {
                    case "rematch":
                        location.href = "/";
                        break;
                    case "fullscreen":
                        this.requestFullscreen()
                }
                this.menuOpen = !1;
                this.setMenuState()
            };
            a.prototype.requestFullscreen = function() {
                var a = document.documentElement;
                (a.requestFullscreen || a.webkitRequestFullScreen || a.mozRequestFullScreen || a.msRequestFullscreen).call(a)
            };
            a.prototype.setMenuState = function() {
                this.mainElement.querySelector(".dropdown").classList[this.menuOpen ? "add" : "remove"]("open")
            };
            a.prototype.updateViewport = function() {};
            n.exports = a
        }, {}],
        105: [function(f, n, m) {
            function a() {
                this.init("invite", "invite nativeInput blockGameInput");
                this.render()
            }
            m = f(121);
            var h = f(95),
                b = !1,
                e = 0,
                d = null;
            a.prototype = Object.create(m.prototype);
            a.prototype.onClose = function(a) {
                d = a
            };
            a.prototype.copyLink = function(a) {
                a.preventDefault();
                this.mainElement.querySelector("input").select();
                try {
                    document.execCommand("copy") && (this.mainElement.querySelector(".copy.fx").style.top = "1.6em", b = !0, e = 0)
                } catch (c) {
                    console.log("Copy failed")
                }
                document.getSelection().removeAllRanges();
                return !1
            };
            a.prototype.closeLink = function(a) {
                a.preventDefault();
                d && d()
            };
            a.prototype.inputClick = function(a) {
                a.preventDefault();
                this.mainElement.querySelector("input").select();
                return !1
            };
            a.prototype.update = function() {
                if (b) {
                    var a = this.mainElement.querySelector(".copy.fx");
                    e += .1;
                    1 < e && (b = !1);
                    a.style.top = parseFloat(a.style.top) -
                        .4 + "em";
                    a.style.opacity = 1 - e
                }
            };
            a.prototype.render = function() {
                this.updateDOM({
                    url: window.location.href
                });
                this.mainElement.querySelector("a.close").onclick = this.closeLink.bind(this);
                this.mainElement.querySelector("a.copy").onclick = this.copyLink.bind(this);
                this.mainElement.querySelector("input").onclick = this.inputClick.bind(this);
                this.updateViewport()
            };
            a.prototype.updateViewport = function() {
                var a = 1,
                    b = Math.min(h.width - 100, 2 * (h.height - 60)),
                    d = b / 2;
                700 < b ? (b = 700, d = b / 2) : a = b / 700;
                b = h.width / 2 - b / 2;
                var e = h.height /
                    4;
                this.setElementPosition(this.mainElement, e, h.height - e - d, b, b);
                this.mainElement.style.fontSize = 24 * a + "px"
            };
            n.exports = a
        }, {}],
        106: [function(f, n, m) {
            function a() {
                this.init("kills", "kills");
                this.dataKills = [];
                this.offsetFactorY = 0
            }
            m = f(121);
            f(95);
            var h = f(38),
                b = f(54),
                e = f(142).WeaponTypes;
            a.prototype = Object.create(m.prototype);
            a.prototype.addKill = function(a, f, c) {
                var d = null;
                if (null != c) {
                    switch (c) {
                        case 253:
                            c = b.texBullets[7];
                            break;
                        case 254:
                            c = b.texPlaneKill;
                            break;
                        case 255:
                            c = b.texGibbet;
                            break;
                        default:
                            c = b.texWeapons[e[c].tex]
                    }
                    d =
                        h.createCanvas(48, 48);
                    c.draw(d.getContext("2d"), 0, 0, 48, 48)
                }
                this.dataKills.push({
                    killed: a,
                    killer: f,
                    canvas: d,
                    addTime: Date.now(),
                    pruneTime: null,
                    element: null
                });
                this.render()
            };
            a.prototype.update = function() {
                for (var a = Date.now(), b = null, c = this.offsetFactorY = 0; c < this.dataKills.length; c++) {
                    var e = this.dataKills[c];
                    !e.pruneTime && 6E3 < a - e.addTime && (e.pruneTime = a);
                    if (e.pruneTime)
                        if (400 < a - e.pruneTime) b || (b = []), b.push(e);
                        else {
                            var f = (Math.cos(((a - e.pruneTime) / 400 + 1) * Math.PI) + 1) / 2;
                            this.offsetFactorY += f;
                            e.element.parentElement.style.opacity =
                                1 - f
                        }
                }
                if (b) {
                    for (c = 0; c < b.length; c++) a = this.dataKills.indexOf(b[c]), this.dataKills.splice(a, 1);
                    this.render()
                }
                this.mainElement.style.marginTop = -(40 * this.offsetFactorY) + "px"
            };
            a.prototype.render = function() {
                this.updateDOM({
                    kills: this.dataKills
                });
                for (var a = this.mainElement.querySelectorAll("ul>li>.cause"), b = 0; b < this.dataKills.length; b++) {
                    this.dataKills[b].element = a[b];
                    var c = this.dataKills[b].canvas;
                    c && a[b].appendChild(c)
                }
                this.updateViewport()
            };
            a.prototype.updateViewport = function(a, b) {
                this.mainElement.style.right =
                    0;
                this.mainElement.style.top = 0
            };
            n.exports = a
        }, {}],
        107: [function(f, n, m) {
            function a() {
                this.init("loading0", "loading0");
                this.render()
            }
            m = f(121);
            var h = f(95);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                this.updateViewport()
            };
            a.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(h.width, h.height) / 20, 50) + "px")
            };
            n.exports = a
        }, {}],
        108: [function(f, n, m) {
            function a() {
                this.init("loading1", "loading1");
                this.data = null;
                this.render()
            }
            m = f(121);
            var h =
                f(95);
            a.prototype = Object.create(m.prototype);
            a.prototype.setData = function(a) {
                this.data = a ? a : null;
                this.render()
            };
            a.prototype.render = function() {
                this.updateDOM(this.data);
                this.updateViewport()
            };
            a.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(h.width, h.height) / 20, 50) + "px")
            };
            n.exports = a
        }, {}],
        109: [function(f, n, m) {
            function a() {
                this.init("maintenance", "maintenance");
                this.render()
            }
            m = f(121);
            var h = f(95);
            a.prototype = Object.create(m.prototype);
            a.prototype.render =
                function() {
                    this.updateViewport()
                };
            a.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(h.width, h.height) / 20, 50) + "px")
            };
            n.exports = a
        }, {}],
        110: [function(f, n, m) {
            function a() {
                this.init("matchend", "matchend nativeInput blockGameInput");
                this.ball1Element = this.ball0Element = this.innerElement = null;
                this.dataOwnPid = -1;
                this.dataTeamScore = null;
                this.dataHasTeams = !1;
                this.dataPlayers = null;
                this.widgetAdShowCounter = this.wonState = 0;
                this.onContinueCb = null;
                this.tieAnimation = []
            }
            m = f(121);
            var h = f(95),
                b = f(131),
                e = f(127),
                d = f(47),
                k = f(150);
            a.prototype = Object.create(m.prototype);
            a.prototype.setTeamScore = function(a) {
                this.dataTeamScore = a;
                a[0] == a[1] && (this.wonState = 0);
                a[0] < a[1] && (this.wonState = 1);
                a[0] > a[1] && (this.wonState = -1)
            };
            a.prototype.setHasTeams = function(a) {
                this.dataHasTeams = a
            };
            a.prototype.setPlayers = function(a, b) {
                this.dataOwnPid = b;
                this.dataPlayers = [];
                for (b = 0; b < a.length; b++) {
                    var c = a[b],
                        d = new e;
                    d.initFromSheet(c);
                    var g = c.get("uniqueName");
                    this.dataPlayers.push({
                        pid: c.id,
                        nick: c.get("name"),
                        uniqueName: "" != g ? g : null,
                        statsDeath: c.get("statsDeath"),
                        statsKills: c.get("statsKills"),
                        statsScore: c.get("statsScore"),
                        customization: d,
                        team: c.get("team"),
                        loggedIn: 0 < c.get("level")
                    })
                }
            };
            a.prototype.render = function() {
                function a(a, c, d) {
                    e.teams[a] = {
                        teamClass: -1 == a ? "teamN" : "team" + a,
                        ballClass: -1 == a ? "ballN" : "ball" + a,
                        teamName: c,
                        teamScore: -1 == a ? b.dataTeamScore[0] : b.dataTeamScore[a],
                        topNickname: "",
                        list: []
                    };
                    c = [];
                    for (var g = 0; g < b.dataPlayers.length; g++)
                        if (-1 == a || b.dataPlayers[g].team - 1 == a) {
                            var p = d == b.dataPlayers[g].pid;
                            p && b.dataHasTeams && 0 != b.wonState && (0 == a && (h = -1 == b.wonState ? 2 : 1), 1 == a && (h = -1 == b.wonState ? 1 : 2));
                            var q = b.dataPlayers[g].uniqueName,
                                m = 0;
                            b.dataPlayers[g].loggedIn && (m = q == b.dataPlayers[g].nick ? 1 : 2);
                            c.push({
                                nameType0: 0 == m,
                                nameType1: 1 == m,
                                nameType2: 2 == m,
                                name: b.dataPlayers[g].nick,
                                uniqueName: b.dataPlayers[g].uniqueName,
                                kills: b.dataPlayers[g].statsKills,
                                death: b.dataPlayers[g].statsDeath,
                                score: b.dataPlayers[g].statsScore,
                                customization: b.dataPlayers[g].customization,
                                rowClass: p ? "highlight" : ""
                            })
                        }
                    c.sort(function(a,
                        b) {
                        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0
                    });
                    b.dataHasTeams ? 0 < c.length && (0 == a && (l = 1 == b.wonState ? c[c.length - 1] : c[0]), 1 == a && (f = -1 == b.wonState ? c[c.length - 1] : c[0])) : -1 == a && 0 < c.length && (l = c[0], e.teams[a].topNickname = l.name);
                    d = (-1 == a ? 2 * k.maxTeamSize : k.maxTeamSize) - c.length;
                    for (g = 0; g < d; g++) c.push({
                        name: "-",
                        kills: "-",
                        death: "-",
                        score: "-"
                    });
                    e.teams[a].list = c
                }
                var b = this;
                if (null != this.dataPlayers && null != this.dataTeamScore) {
                    var e = {
                            teams: {},
                            hasTeamClass: this.dataHasTeams ? "hasTeams" : "hasNoTeams",
                            msg0: "",
                            msg1: ""
                        },
                        l = null,
                        f = null,
                        h = 0;
                    if (this.dataHasTeams)
                        for (var m = 0; 2 > m; m++) a(m, 0 == m ? "Team Red" : "Team Blue", this.dataOwnPid);
                    else a(-1, "Total", this.dataOwnPid);
                    if (this.dataHasTeams) switch (h) {
                        case 0:
                            e.msg0 = "Tie";
                            e.msg1 = "Wtf? Srsly?!";
                            break;
                        case 1:
                            e.msg0 = "You lost";
                            e.msg1 = "Ha. I knew it.";
                            break;
                        case 2:
                            e.msg0 = "You won", e.msg1 = "You are epic! I rate 5/7"
                    } else e.msg0 = "Game Over", e.msg1 = "Next match will start soon...";
                    this.updateDOM(e);
                    this.ball0Element = this.mainElement.querySelector(".ball0 canvas, .ballN canvas");
                    this.ball1Element =
                        this.mainElement.querySelector(".ball1 canvas");
                    this.continueElement = this.mainElement.querySelector(".continue");
                    l && this.ball0Element ? (this.preview0Ball = new d(this.ball0Element, 128, 256, !0, l.customization), this.setBallEye(this.preview0Ball, 0), this.preview0Ball.render()) : this.preview0Ball = null;
                    f && this.ball1Element ? (this.preview1Ball = new d(this.ball1Element, 128, 256, !0, f.customization), this.setBallEye(this.preview1Ball, 1), this.preview1Ball.render()) : this.preview1Ball = null;
                    this.continueElement.onclick =
                        function() {
                            b.setAdVisible(!1);
                            if (b.onContinueCb) b.onContinueCb()
                        };
                    this.updateViewport()
                }
            };
            a.prototype.getBallSpecificWonState = function(a) {
                var b = 0;
                this.dataHasTeams ? (-1 == this.wonState && (b = 2 - a), 1 == this.wonState && (b = 1 + a)) : b = 2;
                return b
            };
            a.prototype.onContinue = function(a) {
                this.onContinueCb = a
            };
            a.prototype.setBallEye = function(a, b) {
                b = this.getBallSpecificWonState(b);
                0 == b ? (a.setViewingDirection(0, 1.2, 0), a.setEye(15)) : 1 == b ? (a.setViewingDirection(0, 1.2, 0), a.setEye(8)) : 2 == b && (a.setViewingDirection(0, 1.2, 0), a.setEye(14))
            };
            a.prototype.update = function() {
                for (var a = 0; 2 > a; a++) {
                    var d = 0 == a ? this.preview0Ball : this.preview1Ball,
                        e = 0 == a ? this.ball0Element : this.ball1Element,
                        l = this.getBallSpecificWonState(a);
                    if (d)
                        if (0 == l) {
                            this.tieAnimation[a] || (this.tieAnimation[a] = []);
                            e = this.tieAnimation[a];
                            l = Date.now();
                            0 != e.length && e[0].endTime < l && (e[0].endTime < l - 2E3 ? e.length = 0 : e.shift());
                            for (; 2 > e.length;) {
                                var f = 0 == e.length ? 0 : e[0].id + 1,
                                    k = 0 != e.length && 0 == f % 2 ? e[0].val : 3.6 * (Math.random() - .5);
                                e.push({
                                    endTime: 0 == e.length ? l : e[0].endTime + 700,
                                    val: k,
                                    id: f
                                })
                            }
                            l =
                                1 - (e[0].endTime - l) / (e[1].endTime - e[0].endTime);
                            k = b.lerp(e[0].val, e[1].val, Math.log(9 * l + 1) / Math.log(10));
                            d.setViewingDirection(0 > k ? 0 : Math.PI, Math.abs(k), 0);
                            d.render()
                        } else 1 == l ? (f = Date.now() / 200, l = f % 20 / 20, d.setViewingDirection(Math.sin(f) * (1 - l) + 1.57, 2.6, 0), d.render()) : 2 == l && (f = Date.now(), d = 7 * Math.abs(Math.sin(f / 250)), l = 1, 3 > d && (l -= .08 * (3 - d), d = 3), d -= 3, e.style.bottom = d + "em", e.style.height = 10.667 * l + "em")
                }
            };
            a.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var a = this.dataHasTeams ? 1.7 : 1.4,
                    b = this.dataHasTeams ? 1400 : 1100,
                    d = 1,
                    e = Math.min(h.width - 0, (h.height - 150) * a),
                    f = e / a;
                e > b ? (e = b, f = e / a) : d = e / b;
                a = h.width / 2 - e / 2;
                f = h.height / 2 - f / 2;
                this.setElementPosition(this.innerElement, f, f, a, a);
                this.innerElement.style.fontSize = 24 * d + "px";
                this.updateAd()
            };
            a.prototype.setAdVisible = function(a) {
                var b = document.body.querySelector(".implIAB728_2");
                b && (a ? setTimeout(function() {
                    b.style.display = "block"
                }, 600) : b.style.display = "none");
                if (a && 1 <= this.widgetAdShowCounter++) try {
                    window.factorem &&
                        factorem.refreshAds([1, 4], !0)
                } catch (q) {}
            };
            a.prototype.updateAd = function() {
                var a = document.body.querySelector(".implIAB728_2"),
                    b = document.body.querySelector(".containerIAB728_2");
                a && b && (b = b.getBoundingClientRect(), a.style.top = b.top + "px", a.style.left = b.left + "px")
            };
            n.exports = a
        }, {}],
        111: [function(f, n, m) {
            function a() {
                this.init("matcherror", "matcherror");
                this.desc = this.title = "";
                this.render()
            }
            m = f(121);
            var h = f(95);
            a.prototype = Object.create(m.prototype);
            a.prototype.set = function(a, e) {
                this.title = a;
                this.desc =
                    e
            };
            a.prototype.render = function() {
                this.updateDOM({
                    title: this.title,
                    desc: this.desc
                });
                this.updateViewport();
                this.mainElement.querySelector("button").onclick = function() {
                    location.href = "/"
                }
            };
            a.prototype.updateViewport = function() {
                if (this.active) {
                    var a = this.mainElement.querySelector(".box");
                    a.style.marginTop = h.height / 2 - a.clientHeight / 2 + "px"
                }
            };
            n.exports = a
        }, {}],
        112: [function(f, n, m) {
            function a() {
                this.init("matchselection", "matchselection");
                this.currentGameType = this.currentMap = this.mapListElements = this.closeXElement =
                    this.windowElement = null;
                this.initialRendered = !1;
                this.callbacks = null;
                this.render()
            }
            m = f(121);
            var h = f(54),
                b = f(95),
                e = f(57),
                d = f(133),
                k = f(130);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                var a = this;
                if (!this.initialRendered) {
                    this.initialRendered = !0;
                    var b = {
                        mapList: d.maps,
                        gameTypeList: k,
                        verHash: kugelnVersion
                    };
                    this.updateDOM(b);
                    this.windowElement = this.mainElement.querySelector(".uiwindow");
                    this.closeXElement = this.mainElement.querySelector(".closeX");
                    this.mapListElements = this.mainElement.querySelectorAll(".mapList li");
                    this.gameTypeListElements = this.mainElement.querySelectorAll(".gameTypeList li");
                    this.ctrlPublicElement = this.mainElement.querySelector(".matchselect .ctrl button.public");
                    this.ctrlPrivateElement = this.mainElement.querySelector(".matchselect .ctrl button.private");
                    this.closeXElement.onclick = this.onClose.bind(this);
                    this.ctrlPublicElement.onclick = function() {
                        a.onPlay(0)
                    };
                    this.ctrlPrivateElement.onclick = function() {
                        a.onPlay(1)
                    };
                    for (var e = 0; e < this.mapListElements.length; e++) this.mapListElements[e].onclick =
                        this.onMapSelect.bind({
                            widget: this,
                            map: 0 < e ? b.mapList[e - 1] : null,
                            i: e
                        });
                    for (e = 0; e < this.gameTypeListElements.length; e++) b = this.gameTypeListElements[e].querySelector("input"), b.onchange = this.onGameTypeSelect.bind({
                        widget: this,
                        gameType: b.value,
                        i: e
                    });
                    0 < this.gameTypeListElements.length && (this.gameTypeListElements[0].querySelector("input").checked = !0);
                    this.mapListElements[0].classList.add("selected");
                    this.updateViewport()
                }
            };
            a.prototype.setCallbacks = function(a) {
                this.callbacks = a
            };
            a.prototype.onMapSelect = function() {
                for (var a =
                        0; a < this.widget.mapListElements.length; a++) a == this.i ? this.widget.mapListElements[a].classList.add("selected") : this.widget.mapListElements[a].classList.remove("selected");
                this.widget.currentMap = this.map;
                for (a = 0; a < this.widget.gameTypeListElements.length; a++) {
                    var b = this.widget.gameTypeListElements[a].querySelector("input");
                    b = null == this.map || "" == b.value || -1 != this.map.types.indexOf(b.value);
                    this.widget.gameTypeListElements[a].style.display = b ? "list-item" : "none"
                }
            };
            a.prototype.onGameTypeSelect = function() {
                if ("" ==
                    this.gameType) this.widget.currentGameType = null;
                else
                    for (var a = 0; a < k.length; a++) k[a].key == this.gameType && (this.widget.currentGameType = k[a])
            };
            a.prototype.onClose = function() {
                this.callbacks.onClose()
            };
            a.prototype.onPlay = function(a) {
                this.callbacks.onPlay({
                    privateType: a,
                    map: this.currentMap,
                    gameType: this.currentGameType
                })
            };
            a.prototype.update = function() {
                if (e.isHit(27)) this.onClose()
            };
            a.prototype.updateViewport = function() {
                if (h.ui) {
                    var a = h.ui.getSidebarMargin(),
                        d = 1,
                        e = Math.min(b.width - a, 1.3 * (b.height - 50));
                    a =
                        e / 1.3;
                    950 < e ? (e = 950, a = e / 1.3) : d = e / 950;
                    e = b.width / 2 - e / 2;
                    a = b.height / 2 - a / 2;
                    this.setElementPosition(this.windowElement, a, a, e, e);
                    this.windowElement.style.fontSize = 18 * d + "px";
                    this.currentScale = d
                }
            };
            n.exports = a
        }, {}],
        113: [function(f, n, m) {
            function a() {
                this.init("modal", "modal");
                this.data = null;
                this.dirty = !1;
                this.cb = null;
                this.render()
            }
            m = f(121);
            f(95);
            f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.show = function(a, b) {
                this.data = a;
                this.cb = b;
                this.dirty = !0;
                this.setActive(!0)
            };
            a.prototype.render = function() {
                if (this.dirty &&
                    null != this.data) {
                    this.dirty = !1;
                    var a = this;
                    this.updateDOM(this.data);
                    this.modalElement = this.mainElement.querySelector(".modal");
                    this.updateViewport();
                    for (var b = 0; b < this.data.buttons.length; b++) this.modalElement.querySelector("button." + this.data.buttons[b].class).onclick = function() {
                        a.cb(this)
                    }.bind(this.data.buttons[b].result)
                }
            };
            a.prototype.updateViewport = function() {};
            n.exports = a
        }, {}],
        114: [function(f, n, m) {
            function a() {
                this.init("progression", "progression nativeInput blockGameInput");
                this.ball = null;
                this.customization = new k;
                this.currentScale = 1;
                this.onContinueHandler = null;
                this.pageCurrent = this.pageTarget = this.animStart = 0;
                this.dataNick = "";
                this.dataXP = 0;
                this.dataLevelUpTo = null;
                this.dataAchievements = [];
                this.dataOwnPid = -1;
                this.dataPlayers = [];
                this.dataHasTeams = null;
                this.dataLoggedIn = !1;
                this.continueButtonElement = this.ballElement = this.innerElement = null
            }
            m = f(121);
            var h = f(95),
                b = f(57);
            f(131);
            var e = f(132),
                d = f(54),
                k = f(127),
                c = f(47),
                g = f(150);
            a.prototype = Object.create(m.prototype);
            a.prototype.setNick = function(a) {
                this.dataNick =
                    a
            };
            a.prototype.setXP = function(a) {
                this.dataXP = a
            };
            a.prototype.setLevelUp = function(a) {
                this.dataLevelUpTo = a
            };
            a.prototype.setAchievements = function(a) {
                this.dataAchievements = a
            };
            a.prototype.setHasTeams = function(a) {
                this.dataHasTeams = a
            };
            a.prototype.setLoggedIn = function(a) {
                this.dataLoggedIn = a
            };
            a.prototype.setPlayers = function(a, b) {
                this.dataOwnPid = b;
                this.dataPlayers = [];
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    d.id == b && this.customization.initFromSheet(a[c]);
                    this.dataPlayers.push({
                        pid: d.id,
                        nick: d.get("name"),
                        xp: d.get("statsXp"),
                        team: d.get("team")
                    })
                }
            };
            a.prototype.initBall = function() {
                this.ball = new c(this.ballElement, 128, 256, !0, this.customization);
                this.ball.setEye(14)
            };
            a.prototype.initPagination = function() {
                function a(a) {
                    b.pageTarget = a;
                    a = b.progressionBoxCount() - 3;
                    b.pageTarget > a && (b.pageTarget = a);
                    0 > b.pageTarget && (b.pageTarget = 0);
                    c.style.display = 0 < b.pageTarget ? "block" : "none";
                    d.style.display = b.pageTarget < a ? "block" : "none"
                }
                var b = this,
                    c = this.mainElement.querySelector(".pgn.up"),
                    d = this.mainElement.querySelector(".pgn.down");
                c.onclick =
                    function() {
                        a(b.pageTarget - 1)
                    };
                d.onclick = function() {
                    a(b.pageTarget + 1)
                };
                a(b.pageTarget)
            };
            a.prototype.buildData = function() {
                var a = this.aggregateTeamData();
                return {
                    nick: this.dataNick,
                    showTitle: 2 > this.progressionBoxCount() ? !0 : !1,
                    loginNotify: !this.dataLoggedIn,
                    levelUp: this.dataLevelUpTo,
                    levelRange: e.getLevelRange(this.dataLevelUpTo),
                    achievements: this.dataAchievements,
                    teams: a.teams,
                    hasTeamClass: a.hasTeamClass
                }
            };
            a.prototype.aggregateTeamData = function() {
                function a(a, e, l) {
                    c.teams[a] = {
                        teamClass: -1 == a ? "teamN" : "team" + a,
                        ballClass: -1 == a ? "ballN" : "ball" + a,
                        teamName: e,
                        topNickname: "",
                        list: []
                    };
                    e = [];
                    for (var f = 0; f < b.dataPlayers.length; f++) - 1 != a && b.dataPlayers[f].team - 1 != a || e.push({
                        name: b.dataPlayers[f].nick,
                        xp: b.dataPlayers[f].xp,
                        customization: b.dataPlayers[f].customization,
                        rowClass: l == b.dataPlayers[f].pid ? "highlight" : ""
                    });
                    e.sort(function(a, b) {
                        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0
                    });
                    b.dataHasTeams ? 0 < e.length && 0 == a && (d = 1 == b.wonState ? e[e.length - 1] : e[0]) : -1 == a && 0 < e.length && (d = e[0], c.teams[a].topNickname = d.name);
                    l = (-1 == a ? 2 * g.maxTeamSize : g.maxTeamSize) - e.length;
                    for (f = 0; f < l; f++) e.push({
                        name: "-",
                        xp: "-"
                    });
                    c.teams[a].list = e
                }
                var b = this,
                    c = {
                        teams: {},
                        hasTeamClass: this.dataHasTeams ? "hasTeams" : "hasNoTeams"
                    },
                    d = null;
                if (this.dataHasTeams)
                    for (var e = 0; 2 > e; e++) a(e, 0 == e ? "Team Red" : "Team Blue", this.dataOwnPid);
                else a(-1, "Total", this.dataOwnPid);
                return c
            };
            a.prototype.startAnimation = function() {
                this.animStart = Date.now()
            };
            a.prototype.onContinue = function(a) {
                this.onContinueHandler = a
            };
            a.prototype.render = function() {
                var a = this,
                    b = this.buildData();
                this.updateDOM(b);
                this.ballElement = this.mainElement.querySelector(".ball canvas, canvas");
                this.initBall();
                this.startAnimation();
                this.ball.render();
                (function(a) {
                    for (var b = 0; b < a.length; b++) d.texCup.draw(a[b].getContext("2d"), 0, 0, 0, 0, 2, 2)
                })(this.mainElement.querySelectorAll("canvas.cup"));
                this.continueButtonElement = this.mainElement.querySelector("div.continue");
                this.continueButtonElement.onclick = function() {
                    if (a.onContinueHandler) a.onContinueHandler()
                };
                this.initPagination();
                this.updateViewport()
            };
            a.prototype.progressionBoxCount =
                function() {
                    return 1 + (null != this.dataLevelUpTo ? 1 : 0) + this.dataAchievements.length
                };
            a.prototype.update = function() {
                var a = b.getMousePos();
                if (0 < a.length) {
                    var c = h.width / h.height;
                    var d = a[0] - -.26 * this.currentScale * c;
                    c = a[1] - .05 * this.currentScale * c;
                    a = Math.atan2(c, d);
                    d = Math.min(5 * (d * d + c * c), 1.5)
                } else d = 1, a = -3;
                this.ball.setViewingDirection(a, d, 1);
                this.ball.render();
                this.updateAnimation()
            };
            a.prototype.updateAnimation = function() {
                function a(a) {
                    a--;
                    return a * a * a * a * a + 1
                }
                for (var b = this.mainElement.querySelectorAll(".colStats div.progress"),
                        c = Date.now() - this.animStart, d = 3 > b.length ? 2 : 0, e = 0; e < b.length; e++) {
                    var f = b[e],
                        g = 150 * e + 100;
                    g = (c - g) / 1E3;
                    g = Math.max(Math.min(g, 1), 0);
                    g = 1 - a(g);
                    f.style.top = 50 * g + d + "em";
                    f.style.opacity = 1 - 4 * g
                }
                g = Math.max(Math.min((c - 1E3) / 5E3, 1), 0);
                this.mainElement.querySelector(".progressXP .valAbs").textContent = Math.ceil(a(g) * this.dataXP);
                b = this.mainElement.querySelectorAll(".listXpVal");
                for (e = 0; e < b.length; e++) d = b[e], f = d.dataset.xp, g = 150 * e + 1E3, g = (c - g) / 3E3, g = Math.max(Math.min(g, 1), 0), "-" == f ? d.textContent = "" : (f = ~~f, d.style.opacity =
                    Math.min(5 * g, 1), d.textContent = Math.ceil(a(g) * f));
                c = this.pageTarget - this.pageCurrent;
                this.pageCurrent = .15 >= Math.abs(c) ? this.pageTarget : this.pageCurrent + (0 > c ? -.15 : .15);
                this.mainElement.querySelector(".colStats div.wrap").style.top = -(6.0833 * this.pageCurrent) + "em"
            };
            a.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var a = 1,
                    b = Math.min(h.width - 0, 2 * (h.height - 150)),
                    c = b / 2;
                1100 < b ? (b = 1100, c = b / 2) : a = b / 1100;
                b = h.width / 2 - b / 2;
                c = h.height / 2 - c / 2;
                this.currentScale = a;
                this.setElementPosition(this.innerElement,
                    c, c, b, b);
                this.innerElement.style.fontSize = 24 * a + "px"
            };
            n.exports = a
        }, {}],
        115: [function(f, n, m) {
            function a() {
                this.auth = null;
                this.init("register", "register");
                this.callbacks = this.registerRequest = this.windowElement = null;
                this.render()
            }
            m = f(121);
            f(54);
            var h = f(95),
                b = f(76),
                e = f(60);
            f(64);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                var a = this;
                this.updateDOM();
                this.windowElement = this.mainElement.querySelector(".uiwindow");
                this.buttonElement = this.windowElement.querySelector("button");
                this.inputElement =
                    this.windowElement.querySelector("input");
                var b = e.get("nick") || "";
                this.windowElement.querySelector("input").value = b;
                this.updateViewport();
                this.buttonElement.onclick = function() {
                    a.onSave()
                };
                this.inputElement.addEventListener("keypress", function(b) {
                    if (13 == b.keyCode) a.onSave()
                });
                this.updateUserdata()
            };
            a.prototype.update = function() {
                var a = 500 < Date.now() % 1E3;
                this.windowElement.querySelector(".blinkRed").classList[a ? "add" : "remove"]("red")
            };
            a.prototype.setCallbacks = function(a) {
                this.callbacks = a
            };
            a.prototype.setFocus =
                function(a) {
                    this.windowElement.querySelector("input").focus()
                };
            a.prototype.setAuth = function(a) {
                this.auth = a;
                this.updateUserdata()
            };
            a.prototype.setError = function(a) {
                a = ["", "Name is not available anymore. Try another one!", "Name contains forbidden characters", "Name is too long (max. 16 characters)", "Name is too short (at least 3 characters)"][a];
                this.windowElement.querySelector(".txt2").style.display = "none";
                this.windowElement.querySelector(".error").textContent = a
            };
            a.prototype.setUIState = function(a) {
                this.inputElement.disabled = !a;
                this.buttonElement.disabled = !a
            };
            a.prototype.onSave = function() {
                this.setUIState(!1);
                this.registerRequest = {
                    nick: this.inputElement.value
                };
                this.updateRegisterRequest()
            };
            a.prototype.updateUserdata = function() {
                if (this.auth) {
                    var a = (this.auth.realName || "").split(" ")[0];
                    this.windowElement.querySelector(".avatar span.realname").textContent = a
                }
            };
            a.prototype.updateRegisterRequest = function() {
                var a = this;
                this.registerRequest && (b.getState() ? (b.sendRegister(function(b) {
                        a.onResponse(b)
                    }, this.registerRequest), this.registerRequest =
                    null) : setTimeout(function() {
                    a.updateRegisterRequest()
                }, 500))
            };
            a.prototype.onResponse = function(a) {
                0 == a ? location.reload() : (this.setError(a), this.setUIState(!0))
            };
            a.prototype.updateViewport = function() {
                var a = 1,
                    b = Math.min(h.width - 50, 1.3 * (h.height - 50)),
                    c = b / 1.3;
                750 < b ? (b = 750, c = b / 1.3) : a = b / 750;
                b = h.width / 2 - b / 2;
                c = h.height / 2 - c / 2;
                this.setElementPosition(this.windowElement, c, c, b, b);
                this.windowElement.style.fontSize = 18 * a + "px";
                this.currentScale = a
            };
            n.exports = a
        }, {}],
        116: [function(f, n, m) {
            function a() {
                var a = this;
                this.init("settings",
                    "settings");
                this.noSoundOptionElement = this.regionOptionElements = this.regionSelectElement = this.ctrlCloseXElement = this.ctrlCancelElement = this.ctrlDoneElement = this.windowElement = null;
                this.data = {
                    regions: [],
                    currentRegion: null
                };
                this.callbacks = this.currentGeoDetected = null;
                this.render();
                k.onRegionUpdate(function(b, d) {
                    a.setRegions(b, d);
                    b = h.ui.settingsWidget.getRegion();
                    k.onRegionUpdate();
                    c.onRegionUpdate(b)
                })
            }
            m = f(121);
            var h = f(54),
                b = f(95),
                e = f(60),
                d = f(57),
                k = f(76);
            f(133);
            f(130);
            var c = f(64);
            a.prototype = Object.create(m.prototype);
            a.prototype.setRegions = function(a, b) {
                function c(b) {
                    for (var c = 0; c < a.length; c++)
                        if (a[c].name == b) return !0;
                    return !1
                }
                this.data.regions = a;
                this.currentGeoDetected = b;
                c(this.data.currentRegion) || (this.data.currentRegion = null);
                if (!this.data.currentRegion) {
                    var d = e.get("region");
                    d && (c(d) || (d = null));
                    b && (c(b) || (b = null));
                    d ? this.data.currentRegion = d : b ? this.data.currentRegion = b : 0 < a.length && (this.data.currentRegion = a[0])
                }
                this.render()
            };
            a.prototype.getRegion = function() {
                return this.data.currentRegion
            };
            a.prototype.render =
                function() {
                    var a = this;
                    this.updateDOM(this.data);
                    this.windowElement = this.mainElement.querySelector(".uiwindow");
                    this.ctrlDoneElement = this.mainElement.querySelector(".settings .ctrl button.done");
                    this.ctrlCancelElement = this.mainElement.querySelector(".settings .ctrl button.cancel");
                    this.ctrlCloseXElement = this.mainElement.querySelector(".settings .closeX");
                    this.regionSelectElement = this.mainElement.querySelector(".settings select");
                    this.regionOptionElements = this.mainElement.querySelectorAll(".settings select option");
                    this.noSoundOptionElement = this.mainElement.querySelector("#optionGameNoSound");
                    this.lowGfxOptionElement = this.mainElement.querySelector("#optionGameLowGfx");
                    for (var b = 0; b < this.regionOptionElements.length; b++) this.regionOptionElements[b].value == this.data.currentRegion && (this.regionOptionElements[b].selected = !0);
                    this.noSoundOptionElement.checked = e.get("noSound") ? !0 : !1;
                    this.lowGfxOptionElement.checked = e.get("lowGfx") ? !0 : !1;
                    this.ctrlDoneElement.onclick = function() {
                        a.onClose(!0)
                    };
                    this.ctrlCancelElement.onclick =
                        function() {
                            a.onClose(!1)
                        };
                    this.ctrlCloseXElement.onclick = function() {
                        a.onClose(!1)
                    };
                    this.updateViewport()
                };
            a.prototype.setCallbacks = function(a) {
                this.callbacks = a
            };
            a.prototype.onClose = function(a) {
                if (a) {
                    var b = a = this.regionOptionElements[this.regionSelectElement.selectedIndex].value;
                    this.data.currentRegion = a;
                    if (b == this.currentGeoDetected) b = null;
                    else if (!confirm("Caution: You selected a region, that doesn't fit your location. This may cause LAGS and DISCONNECTS.\nAre you sure?")) return;
                    e.set("region", b);
                    e.set("noSound", this.noSoundOptionElement.checked ? !0 : !1);
                    e.set("lowGfx", this.lowGfxOptionElement.checked ? !0 : !1)
                }
                if (this.callbacks) this.callbacks.onClose()
            };
            a.prototype.update = function() {
                if (d.isHit(27)) this.onClose(!1)
            };
            a.prototype.updateViewport = function() {
                if (h.ui) {
                    var a = 50 + h.ui.getSidebarMargin(),
                        c = 1,
                        d = Math.min(b.width - a, 1.45 * (b.height - 50));
                    a = d / 1.45;
                    750 < d ? (d = 750, a = d / 1.45) : c = d / 750;
                    d = b.width / 2 - d / 2;
                    a = b.height / 2 - a / 2;
                    this.setElementPosition(this.windowElement, a, a, d, d);
                    this.windowElement.style.fontSize =
                        18 * c + "px";
                    this.currentScale = c
                }
            };
            n.exports = a
        }, {}],
        117: [function(f, n, m) {
            function a() {
                var a = this;
                this.init("sidebar", "sidebar");
                this.data = {};
                this.dirty = !0;
                this.onLogout = null;
                this.notificationCounts = {
                    friendRequests: 0,
                    messages: 0
                };
                this.initNotificationHandler();
                this.initFriendlist();
                window.addEventListener("resize", function() {
                    setTimeout(function() {
                        a.updateSizingLeft();
                        a.updateSizingRight()
                    }, 0)
                });
                this.render()
            }
            m = f(121);
            var h = f(95),
                b = f(76),
                e = f(54),
                d = f(132),
                k = f(128),
                c = f(64),
                g = f(27),
                q = f(80);
            a.prototype = Object.create(m.prototype);
            a.prototype.render = function() {
                function a(a, c) {
                    b.sectionLogin.querySelector("a." + a).onclick = function() {
                        location.href = c
                    }
                }
                var b = this;
                if (this.active && this.dirty) {
                    this.dirty = !1;
                    this.updateDOM(this.data);
                    this.updateViewport();
                    this.sectionPlayer = this.mainElement.querySelector(".barSection.player");
                    this.sectionLogin = this.mainElement.querySelector(".barSection.login");
                    a("loginFB", "/auth/facebook");
                    a("loginGoogle", "/auth/google");
                    this.initSocial();
                    this.initTooltip(this.sectionPlayer.querySelector(".playerProgress"));
                    var d = this.sectionPlayer.querySelector(".achievements");
                    if (e.texCup) {
                        var f = d.querySelector("canvas.cup");
                        e.texCup.draw(f.getContext("2d"), 0, 0, 0, 0, 2, 2)
                    }
                    d.onclick = function() {
                        e.ui.achievementWidget.setActive(!0);
                        e.ui.achievementWidget.onClose(function() {
                            e.ui.setAd("300", !0);
                            e.ui.setAd("728", !0)
                        });
                        e.ui.setAd("300", !1);
                        e.ui.setAd("728", !1)
                    }.bind(this);
                    this.sectionPlayer.querySelector("a.logout").onclick = function(a) {
                        a.preventDefault();
                        b.onLogout()
                    };
                    b.data.auth && (d = function(a) {
                        a.preventDefault();
                        c.goToUrl("/profile/" +
                            b.data.auth.name)
                    }, this.sectionPlayer.querySelector("canvas").onclick = d, this.sectionPlayer.querySelector(".welcome a").onclick = d);
                    this.mainElement.classList[this.data.auth ? "add" : "remove"]("loggedIn");
                    this.initNotification("messages", function() {
                        c.goToUrl("/messages")
                    });
                    this.initNotification("friendrequests", function() {
                        c.goToUrl("/friendrequests")
                    });
                    this.updateNotifications();
                    q.updateDetails(this.sectionPlayer);
                    this.renderFriendlist();
                    this.updateSizingLeft();
                    this.updateSizingRight()
                }
            };
            a.prototype.updateViewport =
                function() {
                    for (var a = this.mainElement.querySelectorAll("div.bar"), b = 0; b < a.length; b++) a[b].style.height = h.height + "px"
                };
            a.prototype.setAuth = function(a, b) {
                this.data.auth = a;
                this.onLogout = b;
                if (a) {
                    b = d.getXpBreakdown(a.xp);
                    var c = b.xp,
                        f = d.getXPAtLevel(b.level),
                        l = c / f * 100,
                        g = d.getLevelRange(b.level);
                    a.level = b.level;
                    a.levelClass = "lr" + g;
                    a.xpCur = c;
                    a.xpMax = f;
                    a.xpPercent = parseFloat(l).toFixed(1);
                    e.ui.achievementWidget.setEarned(a.achievements);
                    this.dirty = !0;
                    this.render()
                }
            };
            a.prototype.initSocial = function(a, b, c) {
                try {
                    if ("dev" !=
                        kugelnVersion) {
                        if (window.twttr) twttr.widgets.load();
                        else var d = setInterval(function() {
                            window.twttr && (twttr.widgets.load(), clearInterval(d))
                        }, 2E3);
                        if (window.gapi && window.gapi.ytsubscribe) gapi.ytsubscribe.go();
                        else var e = setInterval(function() {
                            window.gapi && window.gapi.ytsubscribe && (gapi.ytsubscribe.go(), clearInterval(e))
                        }, 2E3);
                        if (window.FB && FB.XFBML) FB.XFBML.parse();
                        else var f = setInterval(function() {
                            window.FB && FB.XFBML && (FB.XFBML.parse(), clearInterval(f))
                        }, 2E3)
                    }
                } catch (B) {}
            };
            a.prototype.initTooltip =
                function(a, b, c) {
                    var d = b ? b : a.querySelector(".tooltip");
                    a.onmouseenter = function(a) {
                        d.style.display = "block"
                    };
                    a.onmouseleave = function(a) {
                        d.style.display = "none"
                    };
                    a.onmousemove = function(b) {
                        if (c) b = [b.pageX, b.pageY];
                        else {
                            var e = a.getBoundingClientRect();
                            b = [b.pageX - e.left, b.pageY - e.top]
                        }
                        d.style.left = b[0] + 5 + "px";
                        d.style.top = b[1] + 5 + "px"
                    }
                };
            a.prototype.initNotificationHandler = function() {
                var a = this;
                b.onSocialMessage("notificationUpdate", function(b) {
                    a.notificationCounts = b;
                    a.updateNotifications()
                })
            };
            a.prototype.initNotification =
                function(a, b) {
                    this.mainElement.querySelector(".barSection.notifications .notification." + a).onclick = b
                };
            a.prototype.setNotification = function(a, b, c) {
                a = this.mainElement.querySelector(".barSection.notifications .notification." + a).querySelector(".number");
                a.className = "number bg" + c;
                a.querySelector(".v").textContent = b
            };
            a.prototype.updateNotifications = function() {
                this.setNotification("friendrequests", this.notificationCounts.friendRequests, 0 < this.notificationCounts.friendRequests ? "Red" : "Gray");
                this.setNotification("messages",
                    this.notificationCounts.messages, 0 < this.notificationCounts.messages ? "Red" : "Gray")
            };
            a.prototype.initFriendlist = function() {
                var a = this;
                g.onRelationListUpdate(function() {
                    a.renderFriendlist()
                })
            };
            a.prototype.renderFriendlist = function() {
                function a(a, c, e, f) {
                    if (0 < e.length) {
                        var l = document.createElement("div"),
                            g = document.createElement("h3");
                        l.className = "headline";
                        g.textContent = c;
                        l.appendChild(g);
                        a.appendChild(l);
                        f && (c = document.createElement("div"), c.className = "search uiIcon searchWhite", l.appendChild(c), c.onclick =
                            d);
                        for (l = 0; l < e.length; l++) b(a, e[l].playerName)
                    }
                }

                function b(a, b) {
                    var d = document.createElement("div"),
                        e = document.createElement("canvas"),
                        f = document.createElement("div"),
                        l = document.createElement("div");
                    a.appendChild(d);
                    d.appendChild(e);
                    d.appendChild(f);
                    d.appendChild(l);
                    d.classList.add("relation");
                    f.classList.add("name");
                    e.classList.add("playerDetail");
                    f.textContent = b;
                    e.setAttribute("width", 64);
                    e.setAttribute("height", 64);
                    e.dataset.type = "avatar";
                    e.dataset.player = b;
                    l.innerHTML = '<span class="uiIcon messageWhite"></span>';
                    l.classList.add("button", "btnMsg");
                    l.onclick = function(a) {
                        a.stopPropagation();
                        c.goToUrl("/messages", {
                            to: b
                        })
                    };
                    d.onclick = function() {
                        c.goToUrl("/profile/" + b)
                    }
                }

                function d() {
                    c.goToUrl("/search")
                }
                var e = g.getRelationList(),
                    f = this.mainElement.querySelector(".friends"),
                    h = f.querySelector(".area");
                f = f.querySelector(".noFriends");
                h.innerHTML = "";
                for (var m = [], n = [], z = 0; z < e.length; z++) switch (e[z].type) {
                    case k.Friends:
                        m.push(e[z]);
                        break;
                    case k.FriendRequestOutgoing:
                        n.push(e[z])
                }
                a(h, "Friends", m, !0);
                a(h, "Pendings requests",
                    n, !1);
                e = 0 < m.length + n.length;
                h.style.display = e ? "block" : "none";
                f.style.display = e ? "none" : "block";
                q.updateDetails(this.mainElement);
                f.querySelector("button").onclick = d
            };
            a.prototype.updateSizingLeft = function() {
                for (var a = this.mainElement.querySelector(".left.bar"), b = a.children, c = a.getBoundingClientRect().height, d = 0, e = 0; e < b.length; e++) b[e].classList.contains("friends") || (d += b[e].getBoundingClientRect().height);
                b = c - d - 20;
                a.querySelector(".barSection.friends").style.height = b + "px"
            };
            a.prototype.updateSizingRight =
                function() {
                    var a = this.mainElement.querySelector(".right.bar"),
                        b = a.children;
                    a = a.getBoundingClientRect().height - 210;
                    for (var c = 0, d = 0; d < b.length; d++)
                        if (b[d].classList.contains("barSection") || b[d].classList.contains("hr")) {
                            var e = b[d].getBoundingClientRect().height;
                            c += e;
                            b[d].style.visibility = c <= a ? "visible" : "hidden"
                        }
                };
            n.exports = a
        }, {}],
        118: [function(f, n, m) {
            function a() {
                this.init("stats", "stats nativeInput blockGameInput");
                this.dataRemainingSeconds = this.renderCounter = 0;
                this.dataOwnPid = -1;
                this.dataGameTypeLong =
                    this.dataGameTypeShort = "";
                this.dataTeamScore = null;
                this.dataHasTeams = !1;
                this.dataPlayers = null
            }
            m = f(121);
            var h = f(95),
                b = f(131),
                e = f(150);
            a.prototype = Object.create(m.prototype);
            a.prototype.setOwnPid = function(a) {
                this.dataOwnPid = a
            };
            a.prototype.setRemainingSeconds = function(a) {
                this.dataRemainingSeconds != a && (this.dataRemainingSeconds = a)
            };
            a.prototype.setTeamScore = function(a) {
                this.dataTeamScore = a
            };
            a.prototype.setGameType = function(a, b, c) {
                this.dataGameTypeShort = a;
                this.dataGameTypeLong = b;
                this.dataHasTeams = c
            };
            a.prototype.updatePlayerList =
                function(a) {
                    this.dataPlayers = [];
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b],
                            d = c.get("uniqueName");
                        this.dataPlayers.push({
                            pid: c.id,
                            nick: c.get("name"),
                            uniqueName: "" != d ? d : null,
                            statsDeath: c.get("statsDeath"),
                            statsKills: c.get("statsKills"),
                            statsScore: c.get("statsScore"),
                            team: c.get("team"),
                            loggedIn: 0 < c.get("level")
                        })
                    }
                };
            a.prototype.update = function() {
                this.renderCounter++;
                0 == this.renderCounter % 20 && this.render()
            };
            a.prototype.render = function() {
                function a(a, b, d) {
                    c.teams[a] = {
                        teamClass: -1 == a ? "teamN" : "team" + a,
                        teamName: b,
                        teamScore: -1 == a ? f.dataTeamScore[0] : f.dataTeamScore[a],
                        list: []
                    };
                    b = [];
                    for (var l = 0; l < f.dataPlayers.length; l++)
                        if (-1 == a || f.dataPlayers[l].team - 1 == a) {
                            var g = f.dataPlayers[l].uniqueName,
                                k = 0;
                            f.dataPlayers[l].loggedIn && (k = g == f.dataPlayers[l].nick ? 1 : 2);
                            b.push({
                                nameType0: 0 == k,
                                nameType1: 1 == k,
                                nameType2: 2 == k,
                                name: f.dataPlayers[l].nick,
                                uniqueName: "" != g ? g : null,
                                kills: f.dataPlayers[l].statsKills,
                                death: f.dataPlayers[l].statsDeath,
                                score: f.dataPlayers[l].statsScore,
                                rowClass: d == f.dataPlayers[l].pid ? "highlight" : ""
                            })
                        }
                    b.sort(function(a,
                        b) {
                        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0
                    });
                    d = (-1 == a ? 2 * e.maxTeamSize : e.maxTeamSize) - b.length;
                    for (l = 0; l < d; l++) b.push({
                        name: "-",
                        kills: "-",
                        death: "-",
                        score: "-"
                    });
                    c.teams[a].list = b
                }
                var f = this;
                if (null != this.dataPlayers && null != this.dataTeamScore && "" != this.dataGameTypeShort) {
                    var c = {
                        remainingSeconds: b.lpad(~~(this.dataRemainingSeconds / 60), 2) + ":" + b.lpad(this.dataRemainingSeconds % 60, 2),
                        gameTypeShort: this.dataGameTypeShort,
                        gameTypeLong: this.dataGameTypeLong,
                        teams: {}
                    };
                    if (this.dataHasTeams)
                        for (var g = 0; 2 >
                            g; g++) a(g, 0 == g ? "Team Red" : "Team Blue", this.dataOwnPid);
                    else a(-1, "Total", this.dataOwnPid);
                    this.updateDOM(c);
                    this.updateViewport();
                    var h = this.mainElement.querySelectorAll("a.profile");
                    for (g = 0; g < h.length; g++) h[g].onmousedown = function() {
                        location.href = this.getAttribute("href")
                    }.bind(h[g])
                }
            };
            a.prototype.updateViewport = function() {
                var a = 1,
                    b = Math.min(h.width - 100, 1.25 * (h.height - 60)),
                    c = b / 1.25;
                800 < b ? (b = 800, c = b / 1.25) : a = b / 800;
                b = h.width / 2 - b / 2;
                c = h.height / 2 - c / 2;
                this.setElementPosition(this.mainElement, c, c, b, b);
                this.mainElement.style.fontSize =
                    24 * a + "px"
            };
            n.exports = a
        }, {}],
        119: [function(f, n, m) {
            function a() {
                this.init("title", "title");
                this.playerselectElement = this.ballSearchElement = this.ballListInnerElement = this.ballListElement = this.settingsButtonElement = this.customMatchButtonElement = this.customizeElement = this.previewElement = this.formElement = this.windowElement = null;
                this.selectedBall = new c;
                this.previewBall = null;
                this.initialRendered = !1;
                this.ballList = null;
                this.liteMode = !1;
                this.liteModeMatchId = "";
                this.currentScale = 1;
                this.callbacks = this.authData =
                    null;
                this.render();
                "kugeln.io" == location.host && document.body.classList.add("beta")
            }
            m = f(121);
            var h = f(54);
            f(152);
            var b = f(47),
                e = f(95);
            f(76);
            f(132);
            var d = f(60),
                k = f(57);
            f(19);
            var c = f(127);
            a.prototype = Object.create(m.prototype);
            a.prototype.setCallbacks = function(a) {
                this.callbacks = a
            };
            a.prototype.setLiteMode = function(a) {
                this.liteMode = a;
                this.windowElement.classList[a ? "add" : "remove"]("liteMode");
                this.windowElement.querySelector(".matchHint .value").textContent = this.liteModeMatchId
            };
            a.prototype.setBall = function(a) {
                this.selectedBall =
                    a;
                this.updateSelectedBall()
            };
            a.prototype.setLiteModeMatchId = function(a) {
                this.liteModeMatchId = a;
                this.setLiteMode(this.liteMode)
            };
             a.prototype.setFocus = function() {
                this.formElement.querySelector("input.nickname").focus()
            };
            a.prototype.setHighscore = function(a) {
                function b(a) {
                    c.callbacks.onGoToProfile(this.player)
                }
                if (a) {
                    var c = this,
                        d = this.mainElement.querySelector(".highscore"),
                        e = d.querySelector(".table");
                    e.innerHTML = "";
                    for (var f = 0; f < a.table.length; f++) {
                        var g = a.table[f],
                            k = "";
                        k += '<div class="place">' + (f + 1) +
                            "</div>";
                        k += '<div class="name">' + g.player + "</div>";
                        k += '<div class="xp">' + g.xp + "</div>";
                        var h = document.createElement("div");
                        h.classList.add("item");
                        h.innerHTML = k;
                        h.onclick = b.bind(g);
                        e.appendChild(h);
                        a.position == f + 1 && h.classList.add("self")
                    }
                    e = !1;
                    0 < a.position && (e = !0, d.querySelector(".yourscore .v").textContent = a.position);
                    d.querySelector(".yourscore").style.display = e ? "block" : "none";
                    d.querySelector(".motivationPlay").style.display = !e && this.authData ? "block" : "none";
                    d.querySelector(".motivationLogin").style.display =
                        e || this.authData ? "none" : "block";
                    d.querySelector(".more").onclick = function(a) {
                        c.callbacks.onGoToHighscore()
                    }
                }
            };
            a.prototype.render = function() {
                var a = this;
                this.initialRendered || (this.initialRendered = !0, this.updateDOM({}), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.formElement = this.windowElement.querySelector("form"), this.customizeElement = this.windowElement.querySelector(".customize"), this.customMatchButtonElement =
                    this.windowElement.querySelector(".customMatch"), this.settingsButtonElement = this.windowElement.querySelector(".settings"), this.playerselectElement = this.windowElement.querySelector(".playerselect"), this.previewElement = this.playerselectElement.querySelector("canvas.preview"), this.formElement.onsubmit = function(b) {
                        b.preventDefault();
                        a.updateNickname();
                        a.callbacks.onPlay()
                    }, this.customMatchButtonElement.onclick = function(b) {
                        b.preventDefault();
                        a.updateNickname();
                        a.callbacks.onCustomMatch();
                        return !1
                    }, this.customizeElement.onclick =
                    function(b) {
                        b.preventDefault();
                        a.callbacks.onCustomize();
                        return !1
                    }, this.settingsButtonElement.onclick = function(b) {
                        b.preventDefault();
                        a.callbacks.onSettings();
                        return !1
                    }, this.setLiteMode(this.liteMode), this.setNick(), setTimeout(function() {
                        h.ui.browserWarningWidget.setActive(!0)
                    }, 50), this.updateViewport())
            };
            a.prototype.setAuth = function(a) {
                this.authData = a;
                this.setNick()
            };
            a.prototype.setNick = function() {
                var a;
                if (a = this.authData && "" != this.authData.name ? this.authData.name : d.get("nick")) this.formElement.querySelector("input.nickname").value =
                    a
            };
            a.prototype.initAdbHint = function() {
                this.hasAdBlock() && (this.mainElement.querySelector(".extAdBox .adbhint").style.display = "block")
            };
            a.prototype.hasAdBlock = function() {
                return window.adsJsLoaded ? !1 : !0
            };
            a.prototype.initPreview = function() {
                this.previewBall = new b(this.previewElement, 128, 256, !0, this.selectedBall);
                this.previewBall.setViewingDirection(0, 1.2)
            };
            a.prototype.update = function() {
                this.updatePreview();
            };
            a.prototype.updatePreview = function(a) {
                this.previewBall || this.initPreview();
                a = this.previewBall;
                var b = k.getAbsoluteMousePos(),
                    c = 0;
                if (0 < b.length) {
                    var d = a.targetCanvas.getBoundingClientRect();
                    c = b[0] - (d.left + d.width / 2);
                    d = b[1] - (d.top + d.height / 2);
                    b = Math.atan2(d, c);
                    d = Math.min(Math.sqrt(c * c + d * d) / 100, 1.5);
                    c = 1
                } else d = 1, b = -3;.9 > d ? (a.setEye(13), c = 0) : 5 > h.frameCounter % 300 ? a.setEye(9) : a.setEye(14);
                a.setViewingDirection(b, d, c);
                a.render()
            };
            a.prototype.updateSelectedBall = function() {
                this.previewBall && this.previewBall.setCustomization(this.selectedBall)
            };
            a.prototype.updateNickname = function() {
                if (this.callbacks.onNicknameChange) {
                    var a =
                        this.formElement.querySelector("input.nickname").value;
                    this.callbacks.onNicknameChange(a)
                }
            };
            a.prototype.updateViewport = function() {
                if (h.ui) {
                    var a = 50 + h.ui.getSidebarMargin(),
                        b = -.1 * (e.height - 600),
                        c = 1,
                        d = Math.min(e.width - a, .92 * (e.height - 0));
                    a = d / .92;
                    605 < d ? (d = 605, a = d / .92) : c = d / 605;
                    d = e.width / 2 - d / 2;
                    this.setElementPosition(this.windowElement, e.height / 2 - a / 2 + b, e.height / 2 - a / 2 - b, d, d);
                    this.windowElement.style.fontSize = 18 * c + "px";
                    this.currentScale = c;
                    this.playerselectElement.style.display = "block";
                    h.ui && h.ui.hintsWidget &&
                        h.ui.hintsWidget.setView([e.width / 2, .8 * e.height], c)
                }
            };
            n.exports = a
        }, {}],
        120: [function(f, n, m) {
            function a() {
                this.init("toast", "toast");
                this.dataInputHelpText = this.dataUsableType = "";
                this.dirty = !0;
                this.showState = {};
                this.render()
            }
            m = f(121);
            var h = f(95),
                b = f(54);
            a.prototype = Object.create(m.prototype);
            a.prototype.show = function(a, b) {
                this.showState[a] != b && (this.dirty = !0);
                this.showState[a] = b;
                this.updateActive();
                this.render()
            };
            a.prototype.updateActive = function() {
                var a = !1,
                    d;
                for (d in this.showState) this.showState[d] &&
                    (a = !0);
                2 == b.ui.uiState && (a = !1);
                this.setActive(a)
            };
            a.prototype.render = function() {
                if (this.dirty) {
                    this.dirty = !1;
                    this.updateDOM({
                        usableMsg: 'Press <span class="key">E</span> to use ' + this.dataUsableType,
                        inputhelpMsg: this.dataInputHelpText
                    });
                    if (this.showState.stalling)
                        for (var a in this.showState) "stalling" != a && (this.showState[a] = !1);
                    for (a in this.showState) this.mainElement.querySelector(".type_" + a).style.display = this.showState[a] ? "block" : "none";
                    this.updateViewport()
                }
            };
            a.prototype.updateViewport = function() {
                this.mainElement.querySelector(".type_usable").style.top =
                    .7 * h.height + "px";
                this.mainElement.querySelector(".type_inputhelp").style.bottom = "30px";
                this.mainElement.querySelector(".type_stalling").style.top = "70%"
            };
            n.exports = a
        }, {}],
        121: [function(f, n, m) {
            function a() {
                this.mainElement = null;
                this.name = name;
                this.template = null;
                this.active = !0
            }
            a.prototype.init = function(a, b) {
                this.template = a;
                this.name = b || a;
                this.updateDOM()
            };
            a.prototype.setActive = function(a) {
                this.active != a && (this.active != a && (this.active = a) && this.render(), this.mainElement.style.display = a ? "block" : "none",
                    this.updateViewport())
            };
            a.prototype.updateDOM = function(a) {
                a = a || {};
                a = this.execTemplate(this.template, a);
                var b = document.getElementById("uiOverlay"),
                    e = document.createElement("div");
                e.className = "widget " + this.name;
                e.innerHTML = a;
                this.mainElement ? b.replaceChild(e, this.mainElement) : b.appendChild(e);
                this.mainElement = e;
                this.mainElement.style.display = this.active ? "block" : "none"
            };
            a.prototype.getByClass = function(a) {
                return this.mainElement.getElementsByClassName(a)
            };
            a.prototype.execTemplate = function(a, b) {
                return Handlebars.templates[a](b)
            };
            a.prototype.setElementPosition = function(a, b, e, d, f) {
                a.style.top = b + "px";
                a.style.bottom = e + "px";
                a.style.left = d + "px";
                a.style.right = f + "px"
            };
            a.prototype.render = function() {};
            a.prototype.update = function() {};
            a.prototype.updateViewport = function(a, b) {};
            n.exports = a
        }, {}],
        122: [function(f, n, m) {
            (function(a) {
                var h = f("kugelkrieg-native-quadtree");
                n.exports = function(b) {
                    var e = new a(524288),
                        d = new h(b);
                    this.levels = d.levels;
                    this.reset = function() {
                        d = new h(b)
                    };
                    this.setValue = function(a, b, e, f) {
                        d.setValue(a, b, e, f)
                    };
                    this.getValue =
                        function(a, b) {
                            return d.getValue(a, b)
                        };
                    this.setCircle = function(a, b, e, f, l) {
                        d.setCircle(a, b, e, f, l)
                    };
                    this.findFirstOnLine = function(a, b, e, f, l, h) {
                        return d.findFirstOnLine(a, b, e, f, l, h)
                    };
                    this.findInCircle = function(a, b, f, h, l) {
                        a = d.findInCircle(a, b, f, h, l, e);
                        b = [];
                        for (f = 0; f < a; f++) h = e.readInt32LE(8 * f), l = e.readInt32LE(8 * f + 4), b.push([h, l]);
                        return b
                    };
                    this.serialize = function(a) {
                        return d.serialize(a)
                    };
                    this.unserialize = function() {
                        throw Error("Not available for native quadtree");
                    };
                    this.update = function() {
                        d.update()
                    };
                    this.destroy =
                        function() {
                            d.destroy()
                        }
                }
            }).call(this, f(3).Buffer)
        }, {}],
        123: [function(f, n, m) {
            function a(a, b, e, d) {
                function f(a, b, c, d) {
                    for (var f = 2, g; f < c; f += 2) {
                        var k = a[f],
                            p = a[f + 1],
                            m = a[f + 2],
                            q = a[f + 3],
                            n = (m - a[f - 2]) * d,
                            y = (q - a[f - 1]) * d,
                            A = (a[f + 4] - k) * d,
                            x = (a[f + 5] - p) * d,
                            w = 0;
                        for (g = 0; g < e; g++) {
                            var r = b[w++];
                            var t = b[w++];
                            var z = b[w++];
                            var B = b[w++];
                            l[h++] = r * k + t * m + z * n + B * A;
                            l[h++] = r * p + t * q + z * y + B * x
                        }
                    }
                }
                if ("undefined" === typeof a || 2 > a.length) return new Float32Array(0);
                b = "number" === typeof b ? b : .5;
                e = "number" === typeof e ? e : 25;
                var c = 1,
                    g = a.length,
                    h = 0,
                    l = new Float32Array((g - 2) * e + 2 + (d ? 2 * e : 0)),
                    p = new Float32Array(e + 2 << 2),
                    m = 4;
                var n = a.slice(0);
                d ? (n.unshift(a[g - 1]), n.unshift(a[g - 2]), n.push(a[0], a[1])) : (n.unshift(a[1]), n.unshift(a[0]), n.push(a[g - 2], a[g - 1]));
                for (p[0] = 1; c < e; c++) {
                    var x = c / e,
                        w = x * x,
                        B = w * x,
                        r = 2 * B,
                        z = 3 * w;
                    p[m++] = r - z + 1;
                    p[m++] = z - r;
                    p[m++] = B - 2 * w + x;
                    p[m++] = B - w
                }
                p[++m] = 1;
                f(n, p, g, b);
                d && (n = [], n.push(a[g - 4], a[g - 3], a[g - 2], a[g - 1], a[0], a[1], a[2], a[3]), f(n, p, 4, b));
                g = d ? 0 : a.length - 2;
                l[h++] = a[g++];
                l[h] = a[g];
                return l
            }
            "undefined" !== typeof m && (m.getCurvePoints = a)
        }, {}],
        124: [function(f, n, m) {
            n.exports = {
                1: {
                    name: "Bad Amor",
                    desc: "Kill 10 balls with arrow",
                    min: {
                        killsWithWeapon_4: 10
                    }
                },
                2: {
                    name: "Lumberjack",
                    desc: "Cut down 20 trees",
                    min: {
                        treesCut: 20
                    }
                },
                3: {
                    name: "Robin Hood",
                    desc: "Kill 50 balls with arrow",
                    min: {
                        killsWithWeapon_4: 50
                    }
                },
                4: {
                    name: "Fun With Flags",
                    desc: "Pick up flag 10 times",
                    min: {
                        flagPickup: 10
                    }
                },
                5: {
                    name: "Standard Bearer",
                    desc: "Pick up flag 50 times",
                    min: {
                        flagPickup: 50
                    }
                },
                6: {
                    name: "Picnic blanket",
                    desc: "Capture the flag 10 times",
                    min: {
                        flagCapture: 10
                    }
                },
                7: {
                    name: "Flag Master",
                    desc: "Capture the flag 50 times",
                    min: {
                        flagCapture: 50
                    }
                },
                8: {
                    name: "Perkele",
                    desc: "Win a team match as Finlandball",
                    min: {
                        teamWinAsBall_fi: 1
                    }
                },
                9: {
                    name: "8.8cm guy",
                    desc: "Shoot down a plane(ingame only)",
                    min: {
                        planesKilled: 1
                    }
                },
                10: {
                    name: "Come in, big bird",
                    desc: "Shoot down 20 planes",
                    min: {
                        planesKilled: 20
                    }
                },
                11: {
                    name: "Can into space",
                    desc: "Fly into space",
                    min: {
                        inSpace: 1
                    }
                }
            }
        }, {}],
        125: [function(f, n, m) {
            n.exports = [{
                c: "ad",
                n: "Andorra"
            }, {
                c: "ae",
                n: "United Arab Emirates",
                b: "UAEball",
                s: 170
            }, {
                c: "af",
                n: "Afghanistan"
            }, {
                c: "ag",
                n: "Antigua and Barbuda"
            }, {
                c: "ai",
                n: "Anguilla"
            }, {
                c: "al",
                n: "Albania"
            }, {
                c: "am",
                n: "Armenia"
            }, {
                c: "ao",
                n: "Angola"
            }, {
                c: "aq",
                n: "Antarctica"
            }, {
                c: "ar",
                n: "Argentina",
                s: 342
            }, {
                c: "as",
                n: "American Samoa"
            }, {
                c: "at",
                n: "Austria",
                s: 288
            }, {
                c: "au",
                n: "Australia",
                s: 954
            }, {
                c: "aw",
                n: "Aruba"
            }, {
                c: "ax",
                n: "\u00c5land Islands",
                b: "\u00c5landball"
            }, {
                c: "az",
                n: "Azerbaijan"
            }, {
                c: "ba",
                n: "Bosnia and Herzegovina"
            }, {
                c: "bb",
                n: "Barbados"
            }, {
                c: "bd",
                n: "Bangladesh"
            }, {
                c: "be",
                n: "Belgium",
                s: 347
            }, {
                c: "bf",
                n: "Burkina Faso"
            }, {
                c: "bg",
                n: "Bulgaria"
            }, {
                c: "bh",
                n: "Bahrain"
            }, {
                c: "bi",
                n: "Burundi"
            }, {
                c: "bj",
                n: "Benin"
            }, {
                c: "bm",
                n: "Bermuda",
                b: "Bermudatriangle"
            }, {
                c: "bn",
                n: "Brunei"
            }, {
                c: "bo",
                n: "Bolivia"
            }, {
                c: "br",
                n: "Brazil",
                s: 912
            }, {
                c: "bs",
                n: "Bahamas"
            }, {
                c: "bt",
                n: "Bhutan"
            }, {
                c: "bv",
                n: "Bouvet Island"
            }, {
                c: "bw",
                n: "Botswana"
            }, {
                c: "by",
                n: "Belarus"
            }, {
                c: "bz",
                n: "Belize"
            }, {
                c: "ca",
                n: "Canada",
                s: 1303
            }, {
                c: "cc",
                n: "Cocos Islands",
                b: "Cocos Islandball"
            }, {
                c: "cd",
                n: "Democratic Republic of the Congo"
            }, {
                c: "cf",
                n: "Central African Republic"
            }, {
                c: "cg",
                n: "Republic of the Congo"
            }, {
                c: "ch",
                n: "Switzerland",
                s: 569
            }, {
                c: "ci",
                n: "Ivory Coast"
            }, {
                c: "ck",
                n: "Cook Islands"
            }, {
                c: "cl",
                n: "Chile",
                s: 152
            }, {
                c: "cm",
                n: "Cameroon"
            }, {
                c: "cn",
                n: "China",
                s: 5531
            }, {
                c: "co",
                n: "Colombia",
                s: 134
            }, {
                c: "cr",
                n: "Costa Rica"
            }, {
                c: "cu",
                n: "Cuba"
            }, {
                c: "cv",
                n: "Cabo Verde"
            }, {
                c: "cw",
                n: "Cura\u00e7ao"
            }, {
                c: "cx",
                n: "Christmas Island"
            }, {
                c: "cy",
                n: "Cyprus"
            }, {
                c: "cz",
                n: "Czech Republic",
                b: "Czechiaball",
                s: 136
            }, {
                c: "de",
                n: "Germany",
                s: 2811
            }, {
                c: "dj",
                n: "Djibouti"
            }, {
                c: "dk",
                n: "Denmark",
                s: 270
            }, {
                c: "dm",
                n: "Dominica"
            }, {
                c: "do",
                n: "Dominican Republic"
            }, {
                c: "dz",
                n: "Algeria"
            }, {
                c: "ec",
                n: "Ecuador"
            }, {
                c: "ee",
                n: "Estonia"
            }, {
                c: "eg",
                n: "Egypt",
                s: 145
            }, {
                c: "eh",
                n: "Western Sahara"
            }, {
                c: "er",
                n: "Eritrea"
            }, {
                c: "es",
                n: "Spain",
                s: 966
            }, {
                c: "et",
                n: "Ethiopia"
            }, {
                c: "$eu",
                n: "European Union",
                b: "EUball"
            }, {
                c: "fi",
                n: "Finland",
                s: 203
            }, {
                c: "fj",
                n: "Fiji"
            }, {
                c: "fk",
                n: "Falkland Islands",
                b: "Falklandsball"
            }, {
                c: "fm",
                n: "Micronesia"
            }, {
                c: "fo",
                n: "Faroe Islands"
            }, {
                c: "fr",
                n: "France",
                s: 1948
            }, {
                c: "ga",
                n: "Gabon"
            }, {
                c: "gb",
                n: "United Kingdom of Great Britain and Northern Ireland",
                b: "UKball",
                s: 2565
            }, {
                c: "gd",
                n: "Grenada"
            }, {
                c: "ge",
                n: "Georgia"
            }, {
                c: "gf",
                n: "French Guiana"
            }, {
                c: "gg",
                n: "Guernsey"
            }, {
                c: "gh",
                n: "Ghana"
            }, {
                c: "gi",
                n: "Gibraltar"
            }, {
                c: "gl",
                n: "Greenland"
            }, {
                c: "gm",
                n: "Gambia"
            }, {
                c: "gn",
                n: "Guinea"
            }, {
                c: "gp",
                n: "Guadeloupe"
            }, {
                c: "gq",
                n: "Equatorial Guinea"
            }, {
                c: "gr",
                n: "Greece",
                s: 113
            }, {
                c: "gs",
                n: "South Georgia and the South Sandwich Islands"
            }, {
                c: "gt",
                n: "Guatemala"
            }, {
                c: "gu",
                n: "Guam"
            }, {
                c: "gw",
                n: "Guinea-Bissau"
            }, {
                c: "gy",
                n: "Guyana"
            }, {
                c: "hk",
                n: "Hong Kong",
                s: 221
            }, {
                c: "hm",
                n: "Heard Island and McDonald Islands"
            }, {
                c: "hn",
                n: "Honduras"
            }, {
                c: "hr",
                n: "Croatia"
            }, {
                c: "ht",
                n: "Haiti"
            }, {
                c: "hu",
                n: "Hungary"
            }, {
                c: "id",
                n: "Indonesia",
                s: 266
            }, {
                c: "ie",
                n: "Ireland"
            }, {
                c: "il",
                n: "Israel",
                b: "Israelcube",
                s: 194,
                t: 1
            }, {
                c: "im",
                n: "Isle of Man"
            }, {
                c: "in",
                n: "India",
                s: 678
            }, {
                c: "io",
                n: "British Indian Ocean Territory"
            }, {
                c: "iq",
                n: "Iraq"
            }, {
                c: "ir",
                n: "Iran",
                s: 126
            }, {
                c: "is",
                n: "Iceland"
            }, {
                c: "it",
                n: "Italy",
                s: 1072
            }, {
                c: "je",
                n: "Jersey"
            }, {
                c: "jm",
                n: "Jamaica"
            }, {
                c: "jo",
                n: "Jordan"
            }, {
                c: "jp",
                n: "Japan",
                s: 3564
            }, {
                c: "ke",
                n: "Kenya"
            }, {
                c: "kg",
                n: "Kyrgyzstan"
            }, {
                c: "kh",
                n: "Cambodia"
            }, {
                c: "ki",
                n: "Kiribati"
            }, {
                c: "km",
                n: "Comoros"
            }, {
                c: "kn",
                n: "Saint Kitts and Nevis",
                b: "St. Kitts and Nevisball"
            }, {
                c: "kp",
                n: "North Korea"
            }, {
                c: "kr",
                n: "South Korea",
                s: 1141
            }, {
                c: "ku",
                n: "Kurdistan"
            }, {
                c: "kw",
                n: "Kuwait"
            }, {
                c: "ky",
                n: "Cayman Islands",
                b: "Cayman Islandball"
            }, {
                c: "kz",
                n: "Kazakhstan",
                b: "Kazakhbrick",
                s: 105,
                t: 1
            }, {
                c: "la",
                n: "Laos"
            }, {
                c: "lb",
                n: "Lebanon"
            }, {
                c: "lc",
                n: "Saint Lucia"
            }, {
                c: "li",
                n: "Liechtenstein"
            }, {
                c: "lk",
                n: "Sri Lanka"
            }, {
                c: "lr",
                n: "Liberia"
            }, {
                c: "ls",
                n: "Lesotho"
            }, {
                c: "lt",
                n: "Lithuania"
            }, {
                c: "lu",
                n: "Luxembourg"
            }, {
                c: "lv",
                n: "Latvia"
            }, {
                c: "ly",
                n: "Libya"
            }, {
                c: "ma",
                n: "Morocco"
            }, {
                c: "mc",
                n: "Monaco"
            }, {
                c: "md",
                n: "Moldova"
            }, {
                c: "me",
                n: "Montenegro"
            }, {
                c: "mf",
                n: "Saint Martin"
            }, {
                c: "mg",
                n: "Madagascar"
            }, {
                c: "mh",
                n: "Marshall Islands"
            }, {
                c: "mk",
                n: "Macedonia"
            }, {
                c: "ml",
                n: "Mali"
            }, {
                c: "mm",
                n: "Myanmar"
            }, {
                c: "mn",
                n: "Mongolia"
            }, {
                c: "mo",
                n: "Macao"
            }, {
                c: "mp",
                n: "Northern Mariana Islands"
            }, {
                c: "mq",
                n: "Martinique"
            }, {
                c: "mr",
                n: "Mauritania"
            }, {
                c: "ms",
                n: "Montserrat"
            }, {
                c: "mt",
                n: "Malta"
            }, {
                c: "mu",
                n: "Mauritius"
            }, {
                c: "mv",
                n: "Maldives"
            }, {
                c: "mw",
                n: "Malawi"
            }, {
                c: "mx",
                n: "Mexico",
                s: 603
            }, {
                c: "my",
                n: "Malaysia",
                s: 199
            }, {
                c: "mz",
                n: "Mozambique"
            }, {
                c: "na",
                n: "Namibia"
            }, {
                c: "nc",
                n: "New Caledonia"
            }, {
                c: "ne",
                n: "Niger"
            }, {
                c: "nf",
                n: "Norfolk Island"
            }, {
                c: "ng",
                n: "Nigeria",
                s: 181
            }, {
                c: "ni",
                n: "Nicaragua"
            }, {
                c: "nl",
                n: "Netherlands",
                s: 699
            }, {
                c: "no",
                n: "Norway",
                s: 368
            }, {
                c: "np",
                n: "Nepal",
                b: "NepalRawr",
                t: 2
            }, {
                c: "nr",
                n: "Nauru"
            }, {
                c: "nu",
                n: "Niue"
            }, {
                c: "nz",
                n: "New Zealand",
                s: 133
            }, {
                c: "om",
                n: "Oman"
            }, {
                c: "pa",
                n: "Panama"
            }, {
                c: "pe",
                n: "Peru"
            }, {
                c: "pf",
                n: "French Polynesia"
            }, {
                c: "pg",
                n: "Papua New Guinea"
            }, {
                c: "ph",
                n: "Philippines",
                s: 115
            }, {
                c: "pk",
                n: "Pakistan"
            }, {
                c: "$pl",
                n: "",
                i: !0,
                s: 2E4,
                f: "pl"
            }, {
                c: "pl",
                n: "Poland",
                s: 305
            }, {
                c: "pm",
                n: "Saint Pierre and Miquelon"
            }, {
                c: "pn",
                n: "Pitcairn"
            }, {
                c: "pr",
                n: "Puerto Rico"
            }, {
                c: "ps",
                n: "Palestine"
            }, {
                c: "pt",
                n: "Portugal",
                s: 127
            }, {
                c: "pw",
                n: "Palau"
            }, {
                c: "py",
                n: "Paraguay"
            }, {
                c: "qa",
                n: "Qatar",
                s: 137
            }, {
                c: "re",
                n: "R\u00e9union"
            }, {
                c: "ro",
                n: "Romania",
                s: 95
            }, {
                c: "rs",
                n: "Serbia"
            }, {
                c: "ru",
                n: "Russia",
                s: 871
            }, {
                c: "rw",
                n: "Rwanda"
            }, {
                c: "sa",
                n: "Saudi Arabia",
                s: 328
            }, {
                c: "sb",
                n: "Solomon Islands"
            }, {
                c: "sc",
                n: "Seychelles"
            }, {
                c: "sd",
                n: "Sudan"
            }, {
                c: "se",
                n: "Sweden",
                s: 447
            }, {
                c: "sg",
                n: "Singapore",
                b: "Tringapore",
                s: 212
            }, {
                c: "sh",
                n: "Saint Helena"
            }, {
                c: "si",
                n: "Slovenia"
            }, {
                c: "sk",
                n: "Slovakia"
            }, {
                c: "sl",
                n: "Sierra Leone"
            }, {
                c: "sm",
                n: "San Marino"
            }, {
                c: "sn",
                n: "Senegal"
            }, {
                c: "so",
                n: "Somalia"
            }, {
                c: "sr",
                n: "Suriname"
            }, {
                c: "ss",
                n: "South Sudan"
            }, {
                c: "st",
                n: "S\u00e3o Tom\u00e9 and Pr\u00edncipe"
            }, {
                c: "sv",
                n: "El Salvador"
            }, {
                c: "sx",
                n: "Sint Maarten"
            }, {
                c: "sy",
                n: "Syria"
            }, {
                c: "sz",
                n: "Swaziland"
            }, {
                c: "tc",
                n: "Turks and Caicos Islands"
            }, {
                c: "td",
                n: "Chad"
            }, {
                c: "tf",
                n: "French Southern Territories",
                b: "French Southern and Antarctic Landsball"
            }, {
                c: "tg",
                n: "Togo"
            }, {
                c: "th",
                n: "Thailand",
                s: 105
            }, {
                c: "tj",
                n: "Tajikistan"
            }, {
                c: "tk",
                n: "Tokelau"
            }, {
                c: "tl",
                n: "Timor-Leste",
                b: "East Timorball"
            }, {
                c: "tm",
                n: "Turkmenistan"
            }, {
                c: "tn",
                n: "Tunisia"
            }, {
                c: "to",
                n: "Tonga"
            }, {
                c: "tr",
                n: "Turkey",
                s: 346
            }, {
                c: "tt",
                n: "Trinidad and Tobago"
            }, {
                c: "tv",
                n: "Tuvalu"
            }, {
                c: "tw",
                n: "Taiwan",
                s: 411
            }, {
                c: "tz",
                n: "Tanzania"
            }, {
                c: "ua",
                n: "Ukraine"
            }, {
                c: "ug",
                n: "Uganda"
            }, {
                c: "us",
                n: "United States of America",
                b: "USAball",
                s: 14895
            }, {
                c: "uy",
                n: "Uruguay"
            }, {
                c: "uz",
                n: "Uzbekistan",
                b: "Uzbekball"
            }, {
                c: "va",
                n: "Holy See",
                b: "Vaticanball"
            }, {
                c: "vc",
                n: "Saint Vincent and the Grenadines"
            }, {
                c: "ve",
                n: "Venezuela"
            }, {
                c: "vg",
                n: "British Virgin Islands"
            }, {
                c: "vi",
                n: "U.S. Virgin Islands"
            }, {
                c: "vn",
                n: "Vietnam",
                s: 88
            }, {
                c: "vu",
                n: "Vanuatu"
            }, {
                c: "wf",
                n: "Wallis and Futuna"
            }, {
                c: "ws",
                n: "Samoa"
            }, {
                c: "xk",
                n: "Kosovo"
            }, {
                c: "ye",
                n: "Yemen"
            }, {
                c: "yt",
                n: "Mayotte"
            }, {
                c: "za",
                n: "South Africa",
                s: 137
            }, {
                c: "zm",
                n: "Zambia"
            }, {
                c: "zw",
                n: "Zimbabwe"
            }, {
                c: "$prussia",
                n: "Prussia"
            }, {
                c: "$ussr",
                n: "USSR",
                l: 20
            }, {
                c: "$spqr",
                n: "SPQR",
                l: 25
            }]
        }, {}],
        126: [function(f, n, m) {
            function a() {
                this.messageCb = {}
            }
            var h = f(136);
            a.prototype.packet = function(a) {
                return new h.PacketOut(this, a)
            };
            a.prototype.on = function(a, e) {
                if ("undefined" == typeof a) throw Error("Invalid protocol id");
                this.messageCb[a] = e
            };
            a.prototype.error = function(a, e) {
                var b = this.packet(h.Messages.GEN_ERROR);
                b.u16(a);
                b.str(e);
                b.send()
            };
            a.prototype.onError = function(a) {
                this.errorCb = a
            };
            a.prototype.close = function() {};
            a.prototype._send = function(a) {};
            a.prototype._dispatchMsg = function(a) {
                this.messageCb[a.id] && this.messageCb[a.id].call(a)
            };
            a.prototype._dispatchError =
                function(a, e) {
                    var b = this;
                    setTimeout(function() {
                        b.errorCb && b.errorCb(a, e)
                    }, 0)
                };
            a.prototype.errorCb = null;
            a.prototype.messageCb = null;
            n.exports = a
        }, {}],
        127: [function(f, n, m) {
            function a() {
                this.ball = "$pl";
                this.skinGlasses = this.skinHat = 0;
                this.initFromSheet = function(a) {
                    this.ball = a.get("customBall");
                    this.skinHat = a.get("customHat");
                    this.skinGlasses = a.get("customGlasses")
                };
                this.initFromJson = function(a) {
                    this.ball = a.ball;
                    this.skinHat = a.skinHat;
                    this.skinGlasses = a.skinGlasses
                };
                this.equals = function(a) {
                    return this.ball !=
                        a.ball || this.skinHat != a.skinHat || this.skinGlasses != a.skinGlasses ? !1 : !0
                };
                this.clone = function() {
                    var f = new a;
                    f.ball = this.ball;
                    f.skinHat = this.skinHat;
                    f.skinGlasses = this.skinGlasses;
                    return f
                }
            }
            n.exports = a
        }, {}],
        128: [function(f, n, m) {
            n.exports = {
                NoRelation: 0,
                Friends: 1,
                FriendRequestIncoming: 2,
                FriendRequestOutgoing: 3,
                Yourself: 4
            }
        }, {}],
        129: [function(f, n, m) {
            function a(b, c) {
                this.id = c;
                this.sheetConfig = b;
                this.values = [];
                this.mapKeyToValue = {};
                for (var e = 0; e < b.vars.length; e++) {
                    var f = {
                        current: null
                    };
                    this.mapKeyToValue[b.vars[e].key] =
                        f;
                    this.values.push(f)
                }
                this.getSheetTypeId = function() {
                    return d.findIdByName(this.sheetConfig.name)
                };
                this.set = function(a, b) {
                    var c = this.mapKeyToValue[a];
                    if (!c) throw Error("Unknown key " + a);
                    c.current = b
                };
                this.get = function(a) {
                    var b = this.mapKeyToValue[a];
                    if (!b) throw Error("Unknown key " + a);
                    return b.current
                };
                this.copy = function() {
                    for (var d = new a(b, c), e = 0; e < this.values.length; e++) d.values[e].current = this.values[e].current;
                    return d
                };
                this.print = function() {
                    console.log("SHEET " + c + " (" + b.name + ")");
                    for (var a = 0; a <
                        this.values.length; a++) console.log("    " + this.sheetConfig.vars[a].key + ": " + this.values[a].current);
                    console.log("")
                }
            }

            function h(f) {
                this.sheets = [];
                this.sheetsByType = [];
                this.storedEvents = [];
                this.addSheet = function(b, c) {
                    c |= 0;
                    var f = d.findIdByName(b),
                        g = d.findSheetConfigByName(b);
                    if (g) {
                        if (null != this.findSheet(b, c)) throw Error("Sheet already exists");
                        if (g.quantity == e.EXACTLY_ONE || g.quantity == e.MAX_ONE) {
                            if (0 != c) throw Error("Cannot create sheet with ID other than 0" + b);
                            if (1 == this.sheetsByType[f].length) throw Error("Cannot create another sheet for " +
                                b);
                        }
                        b = new a(g, c);
                        this.sheets.push(b);
                        this.sheetsByType[f].push(b);
                        return b
                    }
                    throw Error("Unknown sheet", b);
                };
                this.removeSheet = function(a) {
                    if (a.sheetConfig.quantity == e.EXACTLY_ONE) throw Error("Cannot delete this sheet");
                    var b = this.sheets.indexOf(a);
                    if (-1 == b) throw Error("Idx invalid A");
                    this.sheets.splice(b, 1);
                    var c = this.sheetsByType[d.findIdByName(a.sheetConfig.name)];
                    b = c.indexOf(a);
                    if (-1 == b) throw Error("Idx invalid B");
                    c.splice(b, 1)
                };
                this.removeAllSheetsOfType = function(a) {
                    a = d.findIdByName(a);
                    if (a =
                        this.sheetsByType[a])
                        for (; 0 < a.length;) this.removeSheet(a[0])
                };
                this.findSheet = function(a, b) {
                    b |= 0;
                    a = d.findIdByName(a);
                    a = this.sheetsByType[a];
                    for (var c = 0; c < a.length; c++)
                        if (a[c].id == b) return a[c];
                    return null
                };
                this.findSheetByTypeId = function(a, b) {
                    b |= 0;
                    a = this.sheetsByType[a];
                    for (var c = 0; c < a.length; c++)
                        if (a[c].id == b) return a[c];
                    return null
                };
                this.findSheetNameById = function(a) {
                    return d.findSheetConfigById(a).name
                };
                this.getSheets = function(a) {
                    a = d.findIdByName(a);
                    return (a = this.sheetsByType[a]) ? a : []
                };
                this.copy =
                    function() {
                        var a = new h(!0);
                        a.sheets = [];
                        for (var b = 0; b < this.sheets.length; b++) {
                            var c = this.sheets[b].copy();
                            a.sheets.push(c)
                        }
                        for (b = 0; b < this.sheets.length; b++) c = d.findIdByName(a.sheets[b].sheetConfig.name), a.sheetsByType[c].push(a.sheets[b]);
                        return a
                    };
                this.createPatch = function(a, b) {
                    b = b || !1;
                    if (this == a) throw Error("Same object");
                    for (var c = {
                            removed: [],
                            added: [],
                            changes: []
                        }, d = 0; d < a.sheets.length; d++) {
                        var e = a.sheets[d],
                            f = e.sheetConfig.instant ? !0 : !1;
                        if ((f = !(!f && b)) && null == this.findSheet(e.sheetConfig.name, e.id)) {
                            for (var k = [], g = 0; g < e.values.length; g++) k.push({
                                type: e.sheetConfig.vars[g].type,
                                current: e.values[g].current
                            });
                            c.added.push({
                                sheet: e.sheetConfig.name,
                                id: e.id,
                                list: k
                            })
                        }
                    }
                    for (d = 0; d < this.sheets.length; d++)
                        if (e = this.sheets[d], f = e.sheetConfig.instant ? !0 : !1, f = !(!f && b), k = a.findSheet(e.sheetConfig.name, e.id), null == k) f && c.removed.push({
                            id: e.id,
                            sheet: e.sheetConfig.name
                        });
                        else {
                            var h = [];
                            for (g = 0; g < e.values.length; g++) f = e.sheetConfig.vars[g].instant ? !0 : !1, f = !(!f && b), e.values[g].current != k.values[g].current && f && h.push({
                                var: g,
                                type: e.sheetConfig.vars[g].type,
                                current: k.values[g].current
                            });
                            0 < h.length && c.changes.push({
                                sheet: e.sheetConfig.name,
                                id: e.id,
                                changes: h
                            })
                        }
                    return c
                };
                this.applyPatch = function(a) {
                    for (var b = 0; b < a.removed.length; b++) {
                        var c = this.findSheet(a.removed[b].sheet, a.removed[b].id);
                        this.removeSheet(c)
                    }
                    for (b = 0; b < a.added.length; b++) {
                        c = this.addSheet(a.added[b].sheet, a.added[b].id);
                        for (var d = a.added[b].list, e = 0; e < d.length; e++) c.values[e].current = d[e].current
                    }
                    for (b = 0; b < a.changes.length; b++) {
                        d = a.changes[b];
                        c = this.findSheet(d.sheet,
                            d.id);
                        if (!c) throw Error("Cannot find sheet " + d.sheet + ":" + d.id);
                        for (e = 0; e < d.changes.length; e++) {
                            var f = d.changes[e];
                            c.values[f.var].current = f.current
                        }
                    }
                };
                this.addEventByName = function(a, b, c, e) {
                    var f = d.findEventConfigByName(b.sheetConfig, c);
                    if (null == f) throw Error("Unknown event: " + c);
                    c = b.sheetConfig.events.indexOf(f);
                    this.addEvent(a, b, f, c, e)
                };
                this.addEventById = function(a, b, c, e) {
                    var f = d.findEventConfigById(b.sheetConfig, c);
                    if (null == f) throw Error("Unknown event id " + c);
                    this.addEvent(a, b, f, c, e)
                };
                this.addEvent =
                    function(a, b, c, d, e) {
                        for (var f = [], l = 0; l < c.vars.length; l++) {
                            var k = c.vars[l].key,
                                g = c.vars[l].type,
                                h = e[k];
                            if (void 0 == h) throw Error("Undefined event value: " + k);
                            f.push({
                                key: k,
                                type: g,
                                val: h
                            })
                        }
                        this.storedEvents.push({
                            tick: a,
                            sheet: b,
                            eventName: c.key,
                            eventId: d,
                            vars: f
                        })
                    };
                this.popAllEvents = function() {
                    if (0 == this.storedEvents.length) return [];
                    var a = this.storedEvents;
                    this.storedEvents = [];
                    return a
                };
                this.print = function() {
                    console.log("######################################################", Error().stack);
                    for (var a = 0; a <
                        this.sheets.length; a++) this.sheets[a].print()
                };
                for (var c = 0; c < b.length; c++) this.sheetsByType.push([]), f || b[c].quantity == e.EXACTLY_ONE && this.addSheet(b[c].name)
            }
            var b = f(139),
                e = f(141),
                d = f(140);
            n.exports = h
        }, {}],
        130: [function(f, n, m) {
            n.exports = [{
                key: "dm",
                teams: !1,
                ctf: !1,
                descShort: "Death Match",
                descLong: "Try to kill as many players as possible (except yourself)"
            }, {
                key: "tdm",
                teams: !0,
                ctf: !1,
                descShort: "Team Death Match",
                descLong: "Try to kill as many players from the other team as possible"
            }, {
                key: "ctf",
                teams: !0,
                ctf: !0,
                descShort: "Capture The Flag",
                descLong: "Capture the enemies flag and bring it to your own. Team with 3 captures or highest count wins."
            }]
        }, {}],
        131: [function(f, n, m) {
            var a = n.exports,
                h = null;
            n.exports.getArg = function(a, e) {
                for (var b = window.location.search.substring(1).split("&"), f = 0; f < b.length; f++) {
                    var c = b[f].split("=");
                    if (decodeURIComponent(c[0]) == a) return decodeURIComponent(c[1])
                }
                return e
            };
            n.exports.lerp = function(a, e, d) {
                return (1 - d) * a + d * e
            };
            n.exports.sign = function(a) {
                return 0 > a ? -1 : 0 < a ? 1 : 0
            };
            n.exports.lpad =
                function(a, e, d) {
                    a += "";
                    if ("undefined" == typeof d || 1 != d.length) d = "0";
                    for (var b = "", c = 0; c < e - a.length; c++) b += d;
                    return b + a
                };
            n.exports.rpad = function(a, e, d) {
                a += "";
                if ("undefined" == typeof d || 1 != d.length) d = "0";
                for (var b = "", c = 0; c < e - a.length; c++) b += d;
                return a + b
            };
            n.exports.pointInCircle = function(a, e, d) {
                if (0 == d) return !1;
                var b = e[0] - a[0];
                a = e[1] - a[1];
                return b * b + a * a <= d * d
            };
            n.exports.angleDiff = function(a, e) {
                return Math.atan2(Math.sin(a - e), Math.cos(a - e))
            };
            n.exports.normalizeAngle = function(a) {
                return Math.atan2(Math.sin(a),
                    Math.cos(a))
            };
            n.exports.collideLineCircle = function(b, e, d) {
                if (a.pointInCircle(b[0], e, d) || a.pointInCircle(b[1], e, d)) return !0;
                var f = b[0][0],
                    c = b[0][1],
                    g = b[1][0] - f;
                b = b[1][1] - c;
                var h = e[0] - f,
                    l = e[1] - c,
                    p = g * g + b * b,
                    m = g,
                    n = b;
                0 < p && (h = (h * g + l * b) / p, m *= h, n *= h);
                h = m * m + n * n;
                return a.pointInCircle([f + m, c + n], e, d) && h <= p && 0 <= m * g + n * b
            };
            n.exports.intersectionLineRect = function(a, e, d, f, c, g, h, l) {
                var b = d - a,
                    k = f - e,
                    m = [];
                if (a < c && d < c || a > h && d > h || e < g && f < g || e > l && f > l) return null;
                d = k / b;
                k = b / k;
                b = e + d * (c - a);
                d = e + d * (h - a);
                f = a + k * (g - e);
                a += k * (l - e);
                b >=
                    g && b <= l && m.push([c, b]);
                d >= g && d <= l && m.push([h, d]);
                f >= c && f <= h && m.push([f, g]);
                a >= c && a <= h && m.push([a, l]);
                return 0 != m.length ? m : null
            };
            n.exports.crc32 = function(a) {
                if (!h) {
                    h = [];
                    for (var b = 0; 256 > b; b++) {
                        var d = b;
                        for (var f = 0; 8 > f; f++) d = d & 1 ? 3988292384 ^ d >>> 1 : d >>> 1;
                        h[b] = d
                    }
                }
                d = -1;
                for (b = 0; b < a.length; b++) d = d >>> 8 ^ h[(d ^ a.charCodeAt(b)) & 255];
                return (d ^ -1) >>> 0
            };
            n.exports.DRandom = function(a) {
                var b = n.exports.crc32("abc" + a);
                this.next = function() {
                    return this.nextInt() / 4294967296
                };
                this.nextInt = function() {
                    return b = n.exports.crc32(b +
                        "rand" + a)
                }
            };
            n.exports.merge = function(a, e) {
                for (var b in e) a[b] = e[b];
                return a
            };
            n.exports.sign = function(a) {
                return 0 == a ? 0 : 0 > a ? -1 : 1
            };
            n.exports.getFriendlyDateTime = function(a) {
                var b = (Date.now() - a) / 1E3 / 60 / 60 / 24;
                return 1 > b ? ("00" + a.getHours()).substr(-2) + ":" + ("00" + a.getMinutes()).substr(-2) : 6 > b ? "Sun Mon Tue Wed Thu Fri Sat".split(" ")[a.getDay()] : "Jan;Feb;Mar;Apr;May;June;July;Aug;Sept;Oct; Nov;Dec".split(";")[a.getMonth()] + " " + ("00" + a.getDate()).substr(-2)
            };
            n.exports.getFriendlyExactDateTime = function(a) {
                var b =
                    (Date.now() - a) / 1E3 / 60 / 60 / 24,
                    d = ("00" + a.getHours()).substr(-2) + ":" + ("00" + a.getMinutes()).substr(-2);
                return 1 > b ? d : 6 > b ? "Sun Mon Tue Wed Thu Fri Sat".split(" ")[a.getDay()] + ", " + d : "Jan;Feb;Mar;Apr;May;June;July;Aug;Sept;Oct; Nov;Dec".split(";")[a.getMonth()] + " " + ("00" + a.getDate()).substr(-2) + ", " + d
            }
        }, {}],
        132: [function(f, n, m) {
            function a() {
                if (null == h) {
                    h = [];
                    for (var a = 1; 99 >= a; a++) h[a] = {
                        lvl: a,
                        xp: 1 == a ? 100 : ~~(1.08 * h[a - 1].xp)
                    }
                }
            }
            var h = null;
            n.exports.getLevelRange = function(a) {
                return 5 > a ? 0 : 20 > a ? 1 : 35 > a ? 2 : 60 > a ? 3 : 4
            };
            n.exports.getMaxLevel = function() {
                a();
                return 99
            };
            n.exports.getXPAtLevel = function(b) {
                a();
                return h[b].xp
            };
            n.exports.getXpBreakdown = function(b) {
                a();
                for (var e = 1; 100 > e && h[e].xp < b;) b -= h[e].xp, e++;
                99 <= e && (e = 99, b = 0);
                return {
                    level: e,
                    xp: b
                }
            }
        }, {}],
        133: [function(f, n, m) {
            n.exports = {
                maps: [{
                    label: "Winter",
                    name: "map1",
                    tileset: "winter",
                    objset: "winter",
                    bg: "mountains",
                    bgFx: "snow",
                    types: ["dm", "tdm"],
                    specials: [{
                        type: "mg1",
                        pos: [26, 23],
                        angle: 0
                    }],
                    border: [188, 188, 188]
                }, {
                    label: "Desert",
                    name: "desert1",
                    tileset: "desert",
                    objset: "desert",
                    bg: "desert",
                    spaceY: -12E3,
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [31, 23],
                        angle: 0
                    }, {
                        type: "plane",
                        startTime: 60,
                        path: "flight1",
                        dropsEverySec: 1,
                        dropTimeOffset: 0,
                        reset: !1
                    }, {
                        type: "plane",
                        startTime: 180,
                        path: "flight1",
                        dropsEverySec: 1,
                        dropTimeOffset: .5,
                        reset: !1
                    }]
                }, {
                    label: "Spring",
                    name: "testmap2",
                    tileset: "spring",
                    objset: "spring",
                    bg: "forest",
                    bgFx: "pollen",
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [22, 15],
                        angle: 0
                    }, {
                        type: "mg1",
                        pos: [41, 15],
                        angle: Math.PI
                    }]
                }, {
                    label: "Spring 2",
                    name: "spring2",
                    tileset: "spring",
                    objset: "spring",
                    bg: "forest",
                    bgFx: "pollen",
                    types: ["dm", "tdm", "ctf"],
                    specials: []
                }, {
                    label: "City",
                    name: "city1",
                    tileset: "spring",
                    objset: "spring",
                    bg: "cityNight",
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [47, 13],
                        angle: 0
                    }]
                }, {
                    label: "Moon",
                    name: "moon1",
                    tileset: "moon",
                    objset: "moon",
                    bg: "moon",
                    types: ["dm", "tdm"],
                    specials: [],
                    gravity: .5,
                    border: [130, 130, 130]
                }]
            }
        }, {}],
        134: [function(f, n, m) {
            var a = f(123);
            n.exports = function() {
                this.name = null;
                this.points = [];
                this.size = 0;
                this.segments = [];
                this.interpolatePath = function() {
                    for (var f = [], b = 0; b < this.points.length; b++) f.push(this.points[b][0], this.points[b][1]);
                    f = a.getCurvePoints(f);
                    for (b = this.size = 0; b < f.length - 2; b += 2) {
                        var e = f[b],
                            d = f[b + 1],
                            k = f[b + 2],
                            c = f[b + 3],
                            g = e - k,
                            m = d - c;
                        g = Math.sqrt(g * g + m * m);
                        this.segments.push({
                            p0: [e, d],
                            p1: [k, c],
                            start: this.size,
                            size: g
                        });
                        this.size += g
                    }
                };
                this.getPos = function(a) {
                    for (var b = 0; b < this.segments.length; b++) {
                        var e = this.segments[b],
                            d = a - e.start,
                            f = d / e.size;
                        if (0 <= d && d <= e.size) return [e.p0[0] + (e.p1[0] - e.p0[0]) * f, e.p0[1] + (e.p1[1] - e.p0[1]) * f]
                    }
                    return null
                }
            }
        }, {}],
        135: [function(f,
            n, m) {
            n.exports = function(a, f, b) {
                this.pos = a;
                this.radius = f;
                this.shootable = b;
                this.bulletImmunity = []
            }
        }, {}],
        136: [function(f, n, m) {
            var a = f(138).Serializer,
                h = f(138).Unserializer;
            f = {
                Meta: {
                    Version: 1
                },
                Messages: {
                    GEN_HANDSHAKE: 1,
                    GEN_ERROR: 2,
                    CTS_JOIN: 10,
                    STC_JOINRESPONSE: 11,
                    CTS_READY: 12,
                    CTS_REQUESTTEAM: 17,
                    STC_MATCHSTART: 18,
                    STC_SIMULATIONSTART: 20,
                    STC_SNAPSHOT: 21,
                    STC_INSTANT: 22,
                    STC_INPUTTIMING: 23,
                    STC_EVENTS: 24,
                    CTS_INPUT: 25,
                    STC_EOM: 26,
                    STC_CHAT: 27,
                    CTS_CHAT: 28,
                    CTS_MM_REQUESTMATCH: 60,
                    STC_MM_MATCHED: 61,
                    STC_GTW_DATA: 62,
                    STC_AUTHED: 63,
                    CTS_LOGOUT: 64,
                    CTS_REGISTER: 65,
                    STC_REGISTER: 66,
                    CTS_CLASSIC_LOAD: 67,
                    STC_CLASSIC_LOAD: 68,
                    CTS_HIGHSCORE_OVERVIEW_RELOAD: 69,
                    STC_HIGHSCORE_OVERVIEW: 70,
                    CTS_USER_DETAILS: 71,
                    STC_USER_DETAILS: 72,
                    STC_MAINTENANCE: 80,
                    STC_SOCIAL_MESSAGE: 100,
                    CTS_SOCIAL_MESSAGE: 101
                }
            };
            Object.freeze(f.Meta);
            Object.freeze(f.Messages);
            var b = new ArrayBuffer(2097152),
                e = !1;
            f.PacketOut = function(d, f) {
                if (e) throw Error("Generic buffer is in use");
                e = !0;
                var c = new a(b);
                this.u8 = function(a) {
                    c.u8(a)
                };
                this.u16 = function(a) {
                    c.u16(a)
                };
                this.u32 = function(a) {
                    c.u32(a)
                };
                this.s8 = function(a) {
                    c.s8(a)
                };
                this.s16 = function(a) {
                    c.s16(a)
                };
                this.s32 = function(a) {
                    c.s32(a)
                };
                this.f32 = function(a) {
                    c.f32(a)
                };
                this.f64 = function(a) {
                    c.f64(a)
                };
                this.str = function(a, b) {
                    c.str(a, b)
                };
                this.buffer = function(a, b) {
                    c.buffer(a, b)
                };
                this.serialize = function(a, b) {
                    c.serialize(a, b)
                };
                this.send = function() {
                    var a = b.slice(0, c.getSize());
                    e = !1;
                    d._send(a)
                };
                this.u8(f)
            };
            f.PacketIn = function(a, b) {
                var c = new h(b);
                this.u8 = function() {
                    return c.u8()
                };
                this.u16 = function() {
                    return c.u16()
                };
                this.u32 =
                    function() {
                        return c.u32()
                    };
                this.s8 = function() {
                    return c.s8()
                };
                this.s16 = function() {
                    return c.s16()
                };
                this.s32 = function() {
                    return c.s32()
                };
                this.f32 = function() {
                    return c.f32()
                };
                this.f64 = function() {
                    return c.f64()
                };
                this.str = function() {
                    return c.str()
                };
                this.buffer = function() {
                    return c.buffer()
                };
                this.serialize = function(a) {
                    return c.unserialize(a)
                };
                this.unserialize = function(a) {
                    switch (a) {
                        case "str":
                            return this.str();
                        case "u8":
                            return this.u8();
                        case "u16":
                            return this.u16();
                        case "u32":
                            return this.u32();
                        case "s8":
                            return this.s8();
                        case "s16":
                            return this.s16();
                        case "s32":
                            return this.s32();
                        case "f32":
                            return this.f32();
                        case "f64":
                            return this.f64();
                        default:
                            throw Error("Unknown type: " + a);
                    }
                };
                this.id = this.u8();
                a._dispatchMsg(this)
            };
            n.exports = f
        }, {}],
        137: [function(f, n, m) {
            function a(a, e) {
                this.q3 = this.q2 = this.q1 = this.q0 = null;
                this.size = a | 0;
                this.value = e | 0;
                this.updateSeq = -1;
                this.updateState = function() {
                    if (null != this.q0) {
                        this.q0.updateState();
                        this.q1.updateState();
                        this.q2.updateState();
                        this.q3.updateState();
                        var a = 0,
                            b = !1,
                            c = 0;
                        null != this.q0.q0 ||
                            b && a != this.q0.value || (b = !0, a = this.q0.value, c++);
                        null != this.q1.q0 || b && a != this.q1.value || (b = !0, a = this.q1.value, c++);
                        null != this.q2.q0 || b && a != this.q2.value || (b = !0, a = this.q2.value, c++);
                        null != this.q3.q0 || b && a != this.q3.value || (a = this.q3.value, c++);
                        4 == c && (this.q0 = this.q1 = this.q2 = this.q3 = null, this.value = a)
                    }
                }
            }
            var h = f(131);
            n.exports = function(b) {
                var e = this;
                if (0 != b) {
                    this.levels = Math.log(b) / Math.log(2);
                    this.root = null;
                    this.genericBuffer = new ArrayBuffer(8388608);
                    this.reset = function() {
                        e.root = new a
                    };
                    this.destroy = function() {
                        this.root =
                            null
                    };
                    this.removeShreds = function(a, f, c, g, h, l) {
                        function d(a, b) {
                            var c = 0,
                                d = 0,
                                e = 0;
                            t[e++] = a;
                            for (t[e++] = b; d < e;)
                                if (a = t[d++], b = t[d++], !(0 > a || a >= B || 0 > b || b >= r)) {
                                    var f = b * B + a;
                                    1 == z[f] && (z[f] = 255, c++, t[e++] = a, t[e++] = b - 1, t[e++] = a, t[e++] = b + 1, t[e++] = a - 1, t[e++] = b, t[e++] = a + 1, t[e++] = b)
                                }
                            return c
                        }

                        function k(a, b) {
                            var c = 0,
                                d = 0,
                                f = 0;
                            t[f++] = a;
                            for (t[f++] = b; d < f;)
                                if (a = t[d++], b = t[d++], !(0 > a || a >= B || 0 > b || b >= r)) {
                                    var l = b * B + a;
                                    255 == z[l] && (z[l] = 0, c++, e.setValue(n + a, q + b, 0, e.levels), E.push(n + a, q + b), t[f++] = a, t[f++] = b - 1, t[f++] = a, t[f++] = b +
                                        1, t[f++] = a - 1, t[f++] = b, t[f++] = a + 1, t[f++] = b)
                                }
                            return c
                        }

                        function m(a, b, c) {
                            var d = b + a.size | 0,
                                e = c + a.size | 0;
                            if (!((b | 0) > (n + B | 0) || (d | 0) < (n | 0) || (c | 0) > (q + r | 0) || (e | 0) < (q | 0)))
                                if (null != a.q0) d = a.size >> 1, e = b + d | 0, d = c + d | 0, m(a.q0, b, c), m(a.q1, e, c), m(a.q2, b, d), m(a.q3, e, d);
                                else if (0 != a.value)
                                for (a = Math.max(n, b), b = Math.min(n + B, d), e = Math.min(q + r, e), c = Math.max(q, c); c < e; c++)
                                    for (d = a; d < b; d++) z[(c - q) * B + (d - n)] = 1
                        }
                        c |= 0;
                        g |= 0;
                        h |= 0;
                        l |= 0;
                        f = a >> 2;
                        var n = Math.max(0, c - f),
                            q = Math.max(0, g - f),
                            B = Math.min(b, h + 2 * f),
                            r = Math.min(b, l + 2 * f);
                        c -= n;
                        g -= q;
                        h = Math.min(h, B);
                        l = Math.min(l, r);
                        f = B * r;
                        var z = new Uint8Array(this.genericBuffer, 0, f),
                            t = new Uint8Array(this.genericBuffer, f);
                        if (!(f > z.length)) {
                            for (var D = 0; D < f; D++) z[D] = 0;
                            m(this.root, 0, 0);
                            var E = [];
                            for (f = g; f < g + l; f++)
                                for (D = c; D < c + h; D++) {
                                    var I = d(D, f);
                                    if (0 < I && I <= a) {
                                        var K = k(D, f);
                                        if (K != I) throw Error("Pixel removal inconsistent " + K + " vs " + I);
                                    }
                                }
                            return E
                        }
                    };
                    this.setValue = function(b, e, c, f) {
                        b |= 0;
                        e |= 0;
                        c |= 0;
                        f |= 0;
                        if (0 >= f) throw Error("Invalid level");
                        for (var d = 0, l = 0, k = this.root, g = f - 1 | 0, h = 0; h < f; h++) {
                            var m = k.size >> 1,
                                n =
                                d + m | 0,
                                B = l + m | 0;
                            null == k.q0 && (k.q0 = new a(m, k.value), k.q1 = new a(m, k.value), k.q2 = new a(m, k.value), k.q3 = new a(m, k.value));
                            b >= n ? (k = e >= B ? k.q3 : k.q1, d = n) : k = e >= B ? k.q2 : k.q0;
                            e >= B && (l = B);
                            h == g && (k.value = c, k.q0 = k.q1 = k.q2 = k.q3 = null)
                        }
                    };
                    this.getValue = function(a, b) {
                        a |= 0;
                        b |= 0;
                        for (var c = 0, d = 0, e = this.root, f = 0; f <= this.levels; f++) {
                            var k = e.size >> 1,
                                h = c + k | 0;
                            k = d + k | 0;
                            if (null == e.q0) return e.value;
                            if (a >= h)
                                if (b >= k) {
                                    var m = e.q3;
                                    c = h;
                                    d = k
                                } else m = e.q1, c = h;
                            else b >= k ? (m = e.q2, d = k) : m = e.q0;
                            if (m) e = m;
                            else return e.value
                        }
                    };
                    this.setCircle = function(b,
                        e, c, f, h) {
                        function d(a, b) {
                            a = m - a;
                            b = n - b;
                            return a * a + b * b <= g
                        }

                        function k(b, c, e, l) {
                            c |= 0;
                            e |= 0;
                            var g = b.size;
                            if (1 == g) d(c, e) && (b.q0 = b.q1 = b.q2 = b.q3 = null, b.value != h && (b.value = f));
                            else {
                                var p = c;
                                var m = e,
                                    n = 0;
                                d(p, m) && n++;
                                d(p, m + g) && n++;
                                d(p + g, m) && n++;
                                d(p + g, m + g) && n++;
                                p = 0 == n ? (p | 0) > (r | 0) || (p + g | 0) < (q | 0) || (m | 0) > (z | 0) || (m + g | 0) < (B | 0) ? 0 : 3 : 4 == n ? 1 : 2;
                                3 == p || 2 == p || 1 == p && null != b.q0 ? (g >>= 1, l += 1, null == b.q0 && (b.q0 = new a(g, b.value), b.q1 = new a(g, b.value), b.q2 = new a(g, b.value), b.q3 = new a(g, b.value)), k(b.q0, c, e, l), k(b.q1, c + g, e, l), k(b.q2,
                                    c, e + g, l), k(b.q3, c + g, e + g, l)) : 1 == p && b.value != h && (b.q0 = b.q1 = b.q2 = b.q3 = null, b.value = f)
                            }
                        }
                        h |= 0;
                        var g = c * c,
                            m = ~~b,
                            n = ~~e,
                            q = m - c,
                            B = n - c,
                            r = m + c,
                            z = n + c;
                        k(this.root, 0, 0, 0)
                    };
                    this.findFirstOnLine = function(a, b, c, e, f, l) {
                        function d(g, p, m) {
                            p |= 0;
                            m |= 0;
                            var n = h.intersectionLineRect(a, b, c, e, p, m, p + g.size | 0, m + g.size | 0);
                            if (!n) return !1;
                            if (g.q0) {
                                var q = g.size >> 1;
                                n = p + q | 0;
                                q = m + q | 0;
                                d(g.q0, p, m);
                                d(g.q1, n, m);
                                d(g.q2, p, q);
                                d(g.q3, n, q)
                            } else if (!l && g.value == f || l && g.value != f)
                                for (p = 0; p < n.length; p++) k.push([n[p][0], n[p][1], g.value])
                        }
                        l = l || !1;
                        a |= 0;
                        b |= 0;
                        c |= 0;
                        e |= 0;
                        f |= 0;
                        var k = [];
                        d(this.root, 0, 0);
                        if (0 == k.length) return null;
                        for (var g = -1, m = 0, n = 0; n < k.length; n++) {
                            var q = k[n],
                                r = q[0] - a;
                            q = q[1] - b;
                            r = r * r + q * q;
                            if (r < m || -1 == g) g = n, m = r
                        }
                        return k[g]
                    };
                    this.findInCircle = function(a, b, c, e, f) {
                        function d(l, p, y) {
                            p |= 0;
                            y |= 0;
                            var A = p + l.size | 0,
                                x = y + l.size | 0;
                            if (!((p | 0) > (m | 0) || (A | 0) < (g | 0) || (y | 0) > (n | 0) || (x | 0) < (h | 0)))
                                if (l.q0) {
                                    var w = l.size >> 1,
                                        r = p + w | 0;
                                    w = y + w | 0;
                                    d(l.q0, p, y);
                                    d(l.q1, r, y);
                                    d(l.q2, p, w);
                                    d(l.q3, r, w)
                                } else if (!f && l.value == e || f && l.value != e)
                                if (1 == l.size) l = p - a, A = y - b, k >= l * l + A * A &&
                                    q.push([p, y]);
                                else {
                                    var t = l = 0;
                                    a < p ? l = -1 : a > A && (l = 1);
                                    b < y ? t = -1 : b > x && (t = 1);
                                    if (-1 == l && -1 == t) r = p, w = y;
                                    else if (1 == l && -1 == t) r = A, w = y;
                                    else if (-1 == l && 1 == t) r = p, w = x;
                                    else if (1 == l && 1 == t) r = A, w = x;
                                    else {
                                        if (0 == l && 0 == t) {
                                            q.push([a, b]);
                                            return
                                        }
                                        if (0 == l) {
                                            if (-1 == t && (b + c | 0) >= y) {
                                                q.push([a, y]);
                                                return
                                            }
                                            if (1 == t && (b - c | 0) <= x) {
                                                q.push([a, x]);
                                                return
                                            }
                                        } else if (0 == t) {
                                            if (-1 == l && (a + c | 0) >= p) {
                                                q.push([p, b]);
                                                return
                                            }
                                            if (1 == l && (a - c | 0) <= A) {
                                                q.push([A, b]);
                                                return
                                            }
                                        }
                                    }
                                    l = r - a | 0;
                                    A = w - b | 0;
                                    k >= (l * l + A * A | 0) && q.push([r, w])
                                }
                        }
                        a |= 0;
                        b |= 0;
                        c |= 0;
                        e |= 0;
                        f = f || !1;
                        var k = c * c | 0,
                            g =
                            a - c | 0,
                            h = b - c | 0,
                            m = a + c | 0,
                            n = b + c | 0,
                            q = [];
                        d(this.root, 0, 0);
                        return 0 == q.length ? null : q
                    };
                    this.serialize = function(a) {
                        function d(b) {
                            null == b.q0 ? (a.writeUInt8(b.value | 0, c), c++) : (a.writeUInt8(255, c), c++, d(b.q0), d(b.q1), d(b.q2), d(b.q3))
                        }
                        var c = 2;
                        a.writeInt16BE(b, 0);
                        d(this.root);
                        return c
                    };
                    this.unserialize = function(d, e) {
                        function c(b) {
                            if (f >= e) return null;
                            var d = k.getUint8(f);
                            f++;
                            return 255 == d ? (d = b >> 1, b = new a(b, 0), b.q0 = c(d), b.q1 = c(d), b.q2 = c(d), b.q3 = c(d), b) : new a(b, d)
                        }
                        var f = 2,
                            k = new DataView(d);
                        b = k.getInt16(0);
                        this.levels =
                            Math.log(b) / Math.log(2);
                        this.root = c(b)
                    };
                    this.update = function() {
                        this.root.updateState()
                    };
                    if (e.levels != ~~e.levels || 1 >= e.levels) throw Error("Invalid quadtree size");
                    e.root = new a;
                    e.root.size = b
                }
            }
        }, {}],
        138: [function(f, n, m) {
            function a(a) {
                var b = new DataView(a);
                this.u8 = function(a, d) {
                    b.setUint8(a, d)
                };
                this.u16 = function(a, d) {
                    b.setUint16(a, d, !0)
                };
                this.u32 = function(a, d) {
                    b.setUint32(a, d, !0)
                };
                this.s8 = function(a, d) {
                    b.setInt8(a, d)
                };
                this.s16 = function(a, d) {
                    b.setInt16(a, d, !0)
                };
                this.s32 = function(a, d) {
                    b.setInt32(a, d, !0)
                };
                this.f32 = function(a, d) {
                    b.setFloat32(a, d, !0)
                };
                this.f64 = function(a, d) {
                    b.setFloat64(a, d, !0)
                }
            }

            function h(a) {
                var b = new DataView(a);
                this.u8 = function(a) {
                    return b.getUint8(a)
                };
                this.u16 = function(a) {
                    return b.getUint16(a, !0)
                };
                this.u32 = function(a) {
                    return b.getUint32(a, !0)
                };
                this.s8 = function(a) {
                    return b.getInt8(a)
                };
                this.s16 = function(a) {
                    return b.getInt16(a, !0)
                };
                this.s32 = function(a) {
                    return b.getInt32(a, !0)
                };
                this.f32 = function(a) {
                    return b.getFloat32(a, !0)
                };
                this.f64 = function(a) {
                    return b.getFloat64(a, !0)
                }
            }

            function b(a) {
                this.u8 =
                    function(b, c) {
                        a.writeUInt8(c, b)
                    };
                this.u16 = function(b, c) {
                    a.writeUInt16LE(c, b)
                };
                this.u32 = function(b, c) {
                    a.writeUInt32LE(c, b)
                };
                this.s8 = function(b, c) {
                    a.writeInt8(c, b)
                };
                this.s16 = function(b, c) {
                    a.writeInt16LE(c, b)
                };
                this.s32 = function(b, c) {
                    a.writeInt32LE(c, b)
                };
                this.f32 = function(b, c) {
                    a.writeFloatLE(c, b)
                };
                this.f64 = function(b, c) {
                    a.writeDoubleLE(c, b)
                }
            }

            function e(a) {
                this.u8 = function(b) {
                    return a.readUInt8(b)
                };
                this.u16 = function(b) {
                    return a.readUInt16LE(b)
                };
                this.u32 = function(b) {
                    return a.readUInt32LE(b)
                };
                this.s8 = function(b) {
                    return a.readInt8(b)
                };
                this.s16 = function(b) {
                    return a.readInt16LE(b)
                };
                this.s32 = function(b) {
                    return a.readInt32LE(b)
                };
                this.f32 = function(b) {
                    return a.readFloatLE(b)
                };
                this.f64 = function(b) {
                    return a.readDoubleLE(b)
                }
            }
            n.exports.Serializer = function(d) {
                function e(a) {
                    if (null === a || void 0 === a) throw Error("Null value passed");
                }
                var c = d instanceof ArrayBuffer ? new a(d) : new b(d),
                    f = 0;
                this.u8 = function(a) {
                    e(a);
                    c.u8(f, a);
                    f += 1
                };
                this.u16 = function(a) {
                    e(a);
                    c.u16(f, a);
                    f += 2
                };
                this.u32 = function(a) {
                    e(a);
                    c.u32(f, a);
                    f += 4
                };
                this.s8 = function(a) {
                    e(a);
                    c.s8(f,
                        a);
                    f += 1
                };
                this.s16 = function(a) {
                    e(a);
                    c.s16(f, a);
                    f += 2
                };
                this.s32 = function(a) {
                    e(a);
                    c.s32(f, a);
                    f += 4
                };
                this.f32 = function(a) {
                    e(a);
                    c.f32(f, a);
                    f += 4
                };
                this.f64 = function(a) {
                    e(a);
                    c.f64(f, a);
                    f += 8
                };
                this.str = function(a, b) {
                    a || (a = "");
                    b && a.length > b && (a = "");
                    this.u16(a.length);
                    for (b = 0; b < a.length; b++) this.u16(a.charCodeAt(b))
                };
                this.buffer = function(a, b) {
                    if (!a) throw Error("Null buffer passed");
                    if (a instanceof DataView) {
                        void 0 === b && (b = v.byteLength);
                        this.u32(b);
                        for (var c = 0; c < b; c++) this.u8(a.getUint8(c))
                    } else
                        for (void 0 === b &&
                            (b = v.length), this.u32(b), c = 0; c < b; c++) this.u8(a.readUInt8(c))
                };
                this.serialize = function(a, b) {
                    switch (a) {
                        case "str":
                            this.str(b);
                            break;
                        case "u8":
                            this.u8(b);
                            break;
                        case "u16":
                            this.u16(b);
                            break;
                        case "u32":
                            this.u32(b);
                            break;
                        case "s8":
                            this.s8(b);
                            break;
                        case "s16":
                            this.s16(b);
                            break;
                        case "s32":
                            this.s32(b);
                            break;
                        case "f32":
                            this.f32(b);
                            break;
                        case "f64":
                            this.f64(b);
                            break;
                        default:
                            throw Error("Unknown type: " + a);
                    }
                };
                this.getSize = function() {
                    return f
                }
            };
            n.exports.Unserializer = function(a) {
                var b = a instanceof ArrayBuffer ?
                    new h(a) : new e(a),
                    c = 0;
                this.u8 = function() {
                    var a = b.u8(c);
                    c += 1;
                    return a
                };
                this.u16 = function() {
                    var a = b.u16(c);
                    c += 2;
                    return a
                };
                this.u32 = function() {
                    var a = b.u32(c);
                    c += 4;
                    return a
                };
                this.s8 = function() {
                    var a = b.s8(c);
                    c += 1;
                    return a
                };
                this.s16 = function() {
                    var a = b.s16(c);
                    c += 2;
                    return a
                };
                this.s32 = function() {
                    var a = b.s32(c);
                    c += 4;
                    return a
                };
                this.f32 = function() {
                    var a = b.f32(c);
                    c += 4;
                    return a
                };
                this.f64 = function() {
                    var a = b.f64(c);
                    c += 8;
                    return a
                };
                this.str = function() {
                    for (var a = "", b = this.u16(), c = 0; c < b; c++) a += String.fromCharCode(this.u16());
                    return a
                };
                this.buffer = function() {
                    for (var a = this.u32(), b = new ArrayBuffer(a), c = new DataView(b), d = 0; d < a; d++) c.setUint8(d, this.u8());
                    return b
                };
                this.unserialize = function(a) {
                    switch (a) {
                        case "str":
                            return this.str();
                        case "u8":
                            return this.u8();
                        case "u16":
                            return this.u16();
                        case "u32":
                            return this.u32();
                        case "s8":
                            return this.s8();
                        case "s16":
                            return this.s16();
                        case "s32":
                            return this.s32();
                        case "f32":
                            return this.f32();
                        case "f64":
                            return this.f64();
                        default:
                            throw Error("Unknown type: " + a);
                    }
                }
            }
        }, {}],
        139: [function(f, n,
            m) {
            f = f(141);
            n.exports = [{
                name: "player",
                quantity: f.N,
                instant: !0,
                vars: [{
                    key: "name",
                    type: "str"
                }, {
                    key: "uniqueName",
                    type: "str"
                }, {
                    key: "team",
                    type: "u8"
                }, {
                    key: "alive",
                    type: "u8"
                }, {
                    key: "level",
                    type: "u8"
                }, {
                    key: "health",
                    type: "u8",
                    instant: !0
                }, {
                    key: "currentWeapon",
                    type: "u8",
                    instant: !0
                }, {
                    key: "ammo",
                    type: "u16",
                    instant: !0
                }, {
                    key: "input",
                    type: "u8",
                    instant: !0
                }, {
                    key: "lastInput",
                    type: "u8",
                    instant: !0
                }, {
                    key: "angle",
                    type: "f32",
                    instant: !0
                }, {
                    key: "eye",
                    type: "u8",
                    instant: !0
                }, {
                    key: "inAir",
                    type: "u8"
                }, {
                    key: "jumpCountAir",
                    type: "u8"
                }, {
                    key: "jetPack",
                    type: "s32",
                    instant: !0
                }, {
                    key: "posX",
                    type: "f32"
                }, {
                    key: "posY",
                    type: "f32"
                }, {
                    key: "velX",
                    type: "f32"
                }, {
                    key: "velY",
                    type: "f32"
                }, {
                    key: "arrows0",
                    type: "u32"
                }, {
                    key: "arrows1",
                    type: "u32"
                }, {
                    key: "ropeType",
                    type: "u8",
                    instant: !0
                }, {
                    key: "ropePosX",
                    type: "f32",
                    instant: !0
                }, {
                    key: "ropePosY",
                    type: "f32",
                    instant: !0
                }, {
                    key: "ropeChar",
                    type: "u8",
                    instant: !0
                }, {
                    key: "statsKills",
                    type: "s16"
                }, {
                    key: "statsDeath",
                    type: "s16"
                }, {
                    key: "statsScore",
                    type: "s32"
                }, {
                    key: "statsXp",
                    type: "s32"
                }, {
                    key: "customBall",
                    type: "str"
                }, {
                    key: "customHat",
                    type: "u8"
                }, {
                    key: "customGlasses",
                    type: "u8"
                }],
                events: [{
                    key: "inputFlags",
                    vars: [{
                        key: "flags",
                        type: "u8"
                    }]
                }, {
                    key: "force",
                    vars: [{
                        key: "x",
                        type: "f32"
                    }, {
                        key: "y",
                        type: "f32"
                    }]
                }, {
                    key: "shot",
                    vars: [{
                        key: "weapon",
                        type: "u8"
                    }, {
                        key: "result",
                        type: "u8"
                    }]
                }]
            }, {
                name: "match",
                quantity: f.EXACTLY_ONE,
                vars: [{
                    key: "state",
                    type: "u8",
                    instant: !0
                }, {
                    key: "stalling",
                    type: "u8"
                }, {
                    key: "mapName",
                    type: "str"
                }, {
                    key: "gameMode",
                    type: "u8"
                }, {
                    key: "matchLength",
                    type: "u32"
                }, {
                    key: "warmup",
                    type: "u32"
                }],
                events: [{
                    key: "hitMap",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }, {
                        key: "affectMap",
                        type: "u8"
                    }]
                }, {
                    key: "hitChar",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "hitWater",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "hitPG",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "kill",
                    vars: [{
                        key: "killerId",
                        type: "u8"
                    }, {
                        key: "killedId",
                        type: "u8"
                    }, {
                        key: "cause",
                        type: "u8"
                    }]
                }]
            }, {
                name: "bullet",
                quantity: f.N,
                instant: !0,
                vars: [{
                    key: "time",
                    type: "u32"
                }, {
                    key: "ownerType",
                    type: "u8"
                }, {
                    key: "owner",
                    type: "u8"
                }, {
                    key: "leftOwnerRange",
                    type: "u8"
                }, {
                    key: "type",
                    type: "u8"
                }, {
                    key: "weapon",
                    type: "u8"
                }, {
                    key: "posX",
                    type: "f32"
                }, {
                    key: "posY",
                    type: "f32"
                }, {
                    key: "lastPosX",
                    type: "f32"
                }, {
                    key: "lastPosY",
                    type: "f32"
                }, {
                    key: "velX",
                    type: "f32"
                }, {
                    key: "velY",
                    type: "f32"
                }]
            }, {
                name: "item",
                quantity: f.N,
                vars: [{
                    key: "active",
                    type: "u8",
                    instant: !0
                }]
            }, {
                name: "obj",
                quantity: f.N,
                vars: [{
                    key: "active",
                    type: "u8",
                    instant: !0
                }]
            }, {
                name: "brick",
                quantity: f.N,
                instant: !0,
                vars: [{
                    key: "x",
                    type: "u16"
                }, {
                    key: "y",
                    type: "u16"
                }]
            }, {
                name: "usable",
                quantity: f.N,
                vars: [{
                    key: "usedBy",
                    type: "u8",
                    instant: !0
                }, {
                    key: "angle",
                    type: "f32",
                    instant: !0
                }, {
                    key: "heat",
                    type: "u16"
                }]
            }, {
                name: "team",
                quantity: f.N,
                vars: [{
                    key: "score",
                    type: "s32"
                }]
            }, {
                name: "plane",
                quantity: f.N,
                vars: [{
                    key: "type",
                    type: "u8"
                }, {
                    key: "startTick",
                    type: "u32"
                }, {
                    key: "crashTick",
                    type: "u32"
                }, {
                    key: "health",
                    type: "u8"
                }]
            }, {
                name: "modeCTF",
                quantity: f.MAX_ONE,
                vars: [{
                    key: "team0",
                    type: "u8",
                    instant: !0
                }, {
                    key: "team1",
                    type: "u8",
                    instant: !0
                }],
                events: [{
                    key: "capture",
                    vars: [{
                        key: "team",
                        type: "u8"
                    }, {
                        key: "player",
                        type: "u8"
                    }]
                }]
            }]
        }, {}],
        140: [function(f, n, m) {
            var a = f(139);
            f(141);
            f = new function() {
                for (var f = {}, b = {}, e = 0; e < a.length; e++) f[a[e].name] = a[e], b[a[e].name] = e;
                this.findSheetConfigById = function(b) {
                    return a[b]
                };
                this.findSheetConfigByName = function(a) {
                    return f[a]
                };
                this.findEventConfigByName = function(a, b) {
                    if (a.events)
                        for (var c = 0; c < a.events.length; c++)
                            if (a.events[c].key == b) return a.events[c];
                    return null
                };
                this.findEventConfigById = function(a, b) {
                    return sheet.sheetConfig.events ?
                        sheet.sheetConfig.events[b] : null
                };
                this.findIdByName = function(a) {
                    return b[a]
                };
                this.findVarConfig = function(a, b) {
                    for (var c = 0; c < a.vars.length; c++)
                        if (a.vars[c].key == b) return a.vars[c];
                    return null
                }
            };
            n.exports = f
        }, {}],
        141: [function(f, n, m) {
            n.exports = {
                MAX_ONE: 1,
                EXACTLY_ONE: 2,
                N: 3
            }
        }, {}],
        142: [function(f, n, m) {
            (function(a) {
                var h, b;
                a.browser && (h = f(54));
                a.browser && (b = f(34));
                var e = [{
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 2,
                    strengthPlane: 6,
                    circulationLength: 1E3,
                    circulationSpeed: 60,
                    tex: 0,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }, {
                    vel: 18,
                    maxTime: 3,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 48,
                    strengthDirect: 5,
                    strengthPlane: 30,
                    circulationLength: 0,
                    circulationSpeed: 0,
                    tex: 1,
                    lightStrength: .8,
                    lightFadeOut: .04,
                    particleGround: "impactGround2",
                    particleWater: "impactWater2",
                    particlePlane: "impactGround2",
                    soundGround: "explosion1",
                    soundWater: "explosion2",
                    soundHitPlane: "explosion1"
                }, {
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 2,
                    strengthPlane: 3,
                    circulationLength: 1E3,
                    circulationSpeed: 60,
                    tex: 3,
                    texHud: 2,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }, {
                    vel: 40,
                    maxTime: 2,
                    gravityFactor: .3,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 1,
                    strengthPlane: 1,
                    circulationLength: 180,
                    circulationSpeed: 30,
                    tex: 4,
                    texScale: 1.5,
                    particleWater: "impactWater1",
                    soundGround: "impact1",
                    soundWater: "water1",
                    soundHitPlane: "impact1"
                }, {
                    tex: 5
                }, {
                    vel: 0,
                    maxTime: 4,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 80,
                    strengthDirect: 10,
                    tex: 12,
                    texScale: 3,
                    texRatio: .5,
                    lightStrength: 2,
                    lightFadeOut: .1,
                    particleGround: "impactGround3",
                    particleWater: "impactWater3",
                    soundGround: "explosion3",
                    soundWater: "explosion2"
                }, {
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 1,
                    strengthPlane: 7,
                    circulationLength: 1E3,
                    circulationSpeed: 60,
                    tex: 6,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }];
                n.exports = {
                    Bullet: function(a,
                        f, c, g, m, l, p) {
                        this.id = a;
                        this.time = c;
                        this.type = f;
                        this.leftOwnerRange = !1;
                        this.lastPos = g.slice();
                        this.pos = g.slice();
                        this.vel = m.slice();
                        this.ownerType = 0;
                        this.ownerObject = null;
                        this.weapon = l;
                        this.age = this.travelDistance = 0;
                        this.gfxCirculation = this.gfx = null;
                        p && (a = void 0 === e[f].texScale ? 1 : e[f].texScale, c = void 0 === e[f].texRatio ? 1 : e[f].texRatio, this.gfx = h.renderer.createSprite(h.layerBullets), this.gfx.setTexture(h.texBullets[e[f].tex]), this.gfx.size.x = 32 * a, this.gfx.size.y = 32 * a * c, this.gfx.anchor.x = .5, this.gfx.anchor.y =
                            .5, this.gfx.angle = Math.atan2(m[1], m[0]), 0 < e[f].circulationLength && (this.gfxCirculation = b.addCirculation(), this.gfxCirculation.maxLength = 0, this.gfxCirculation.a = 0));
                        this.writeToSheet = function(a) {
                            a.set("time", this.time);
                            a.set("ownerType", this.ownerType);
                            a.set("leftOwnerRange", this.leftOwnerRange);
                            a.set("type", this.type);
                            a.set("weapon", this.weapon);
                            a.set("posX", this.pos[0]);
                            a.set("posY", this.pos[1]);
                            a.set("lastPosX", this.lastPos[0]);
                            a.set("lastPosY", this.lastPos[1]);
                            a.set("velX", this.vel[0]);
                            a.set("velY",
                                this.vel[1])
                        };
                        this.readFromSheet = function(a) {
                            this.time = a.get("time");
                            this.ownerType = a.get("ownerType");
                            this.leftOwnerRange = a.get("leftOwnerRange");
                            this.type = a.get("type");
                            this.weapon = a.get("weapon");
                            this.pos[0] = a.get("posX");
                            this.pos[1] = a.get("posY");
                            this.lastPos[0] = a.get("lastPosX");
                            this.lastPos[1] = a.get("lastPosY");
                            this.vel[0] = a.get("velX");
                            this.vel[1] = a.get("velY")
                        };
                        this.setRenderPos = function(a, b) {
                            this.gfx.pos.x = a;
                            this.gfx.pos.y = b;
                            this.gfxCirculation && (this.gfxCirculation.x = a, this.gfxCirculation.y =
                                b, a = this.travelDistance - this.age * e[f].circulationSpeed * .2, a = Math.max(a, 1), this.gfxCirculation.maxLength = Math.min(e[f].circulationLength, a))
                        };
                        this.setRenderAngle = function(a) {
                            this.gfx.angle = a;
                            this.gfxCirculation && (this.gfxCirculation.a = a + Math.PI / 2)
                        };
                        this.remove = function() {
                            this.gfx && (this.gfx.remove(), this.gfxCirculation && b.decay(this.gfxCirculation, e[f].circulationSpeed))
                        }
                    },
                    BulletTypes: e,
                    WeaponTypes: [{
                        name: "Brick",
                        wearable: !0,
                        bricktool: !0,
                        bullet: 4,
                        tex: 4,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 10,
                        key: 4,
                        sfxShot: "brick1",
                        sfxEmpty: "impact2"
                    }, {
                        name: "Grenade Launcher",
                        wearable: !0,
                        bullet: 1,
                        tex: 5,
                        automatic: !0,
                        fireRate: 4,
                        ammoCount: 10,
                        key: 3,
                        sfxShot: "shot4",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload4"
                    }, {
                        name: "Revolver",
                        wearable: !0,
                        bullet: 0,
                        tex: 0,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 14,
                        flashRange: 200,
                        key: 1,
                        sfxShot: "shot5",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload3"
                    }, {
                        name: "Machine Gun",
                        wearable: !1,
                        bullet: 2,
                        tex: 3,
                        automatic: !0,
                        fireRate: 8,
                        ammoCount: 65535,
                        flashRange: 300,
                        sfxShot: "shot1",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload2",
                        particleShot: "patronEject"
                    }, {
                        name: "Bow",
                        wearable: !0,
                        bullet: 3,
                        tex: 2,
                        texEmpty: 1,
                        emptyAboveRecoil: 0,
                        automatic: !0,
                        fireRate: 3,
                        ammoCount: 24,
                        key: 2,
                        sfxShot: "shot6",
                        sfxChange: "reload5"
                    }, {
                        name: "Plane Bomb",
                        wearable: !1,
                        bullet: 4,
                        tex: null,
                        sfxShot: "shot6"
                    }, {
                        name: "Shotgun",
                        wearable: !0,
                        bullet: 6,
                        tex: 6,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 24,
                        flashRange: 200,
                        fanAmount: 4,
                        fanAngle: .25,
                        key: 1,
                        sfxShot: "shot5",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload3"
                    }]
                }
            }).call(this, f(7))
        }, {}],
        143: [function(f, n, m) {
            (function(a) {
                function h(d, e) {
                    this.simulation = d;
                    this.ballGfx =
                        e;
                    this.pos = [0, 0];
                    this.vel = [0, 0];
                    if (!a.browser)
                        for (this.weapons = [], d = 0; d < b.maxWeapons; d++) this.weapons[d] = null;
                    this.gridArea = [-1, -1, -1, -1];
                    this.inputList = [];
                    this.flagsList = [];
                    this.forceList = []
                }
                var b = f(150),
                    e = f(142).WeaponTypes;
                f(131);
                h.prototype.player = null;
                h.prototype.ballGfx = null;
                h.prototype.renderPos = null;
                h.prototype.renderAngle = null;
                h.prototype.pos = null;
                h.prototype.vel = null;
                h.prototype.radius = 32;
                h.prototype.gridArea = null;
                h.prototype.currentInput = 0;
                h.prototype.lastInput = 0;
                h.prototype.currentFlags =
                    0;
                h.prototype.angle = 0;
                h.prototype.ropeTarget = null;
                h.prototype.fakeRopeTarget = null;
                h.prototype.fakeRopeProgress = null;
                h.prototype.tile = null;
                h.prototype.jumpCountAir = 0;
                h.prototype.inAir = !0;
                h.prototype.lastInAir = !0;
                h.prototype.usable = null;
                h.prototype.currentWeapon = 0;
                h.prototype.lastWeapon = -1;
                h.prototype.recoil = 0;
                h.prototype.weapons = null;
                h.prototype.health = 0;
                h.prototype.ammo = 0;
                h.prototype.eye = -1;
                h.prototype.lastHit = -1E3;
                h.prototype.jetPackSince = -1;
                h.prototype.simulation = null;
                h.prototype.body = null;
                h.prototype.inputList =
                    null;
                h.prototype.flagsList = null;
                h.prototype.forceList = null;
                h.prototype.setRenderAngle = function(a) {
                    this.renderAngle = a;
                    this.ballGfx.setAngle(a)
                };
                h.prototype.setRenderPos = function(a, b) {
                    this.renderPos = [a, b];
                    this.ballGfx.setPosition([~~a, ~~b])
                };
                h.prototype.setArrows = function(a, b) {
                    for (var c = 0; 32 > c; c++) this.ballGfx.setArrow(c + b, a >> c & 1)
                };
                h.prototype.updateRecoil = function() {
                    this.recoil = Math.max(this.recoil - .15, 0);
                    this.ballGfx.recoil = this.recoil
                };
                h.prototype.updateJetpackFire = function(a) {
                    this.currentInput &
                        32 && this.hasJetpack(a) ? (this.ballGfx.doJetpackFire(), this.ballGfx.setJetpackSfx(!0)) : this.ballGfx.setJetpackSfx(!1)
                };
                h.prototype.updateWalkAnimation = function() {
                    var a = !1;
                    this.currentInput & 3 && (a = !0);
                    this.inAir && (a = !1);
                    this.ballGfx.setWalkAnimation(a);
                    this.ballGfx.updateWalkAnimation()
                };
                h.prototype.getInputAt = function(a) {
                    for (var b = null, c = 0; c < this.inputList.length && !(this.inputList[c].tick > a); c++) b = this.inputList[c];
                    return b
                };
                h.prototype.getFlagsAt = function(a) {
                    for (var b = 0; b < this.flagsList.length; b++)
                        if (this.flagsList[b].tick ==
                            a) return this.flagsList[b];
                    return null
                };
                h.prototype.hasJetpack = function(a) {
                    return -1 == this.jetPackSince ? !1 : a - this.jetPackSince < 30 * b.ticksPerSecond ? !0 : !1
                };
                h.prototype.getExternalForceAt = function(a) {
                    for (var b = 0; b < this.forceList.length; b++)
                        if (this.forceList[b].tick == a) return this.forceList[b].force.slice();
                    return null
                };
                h.prototype.setFlags = function(a) {
                    this.currentFlags = a
                };
                h.prototype.setCurrentInput = function(a, b) {
                    a != this.currentInput && (this.lastInput = this.currentInput, this.currentInput = a);
                    b && (this.lastInput =
                        b)
                };
                h.prototype.applyExternalForce = function(a) {
                    if (a = this.getExternalForceAt(a)) this.vel[0] = a[0], this.vel[1] = a[1]
                };
                h.prototype.updateControl = function(a) {
                    var d = this.currentInput,
                        c = this.currentFlags & 1,
                        e = d & 32,
                        f = 0,
                        l = b.walkSpeed;
                    d & 1 && (f -= l);
                    d & 2 && (f += l);
                    this.inAir ? this.ropeTarget || (0 > f && this.vel[0] > f && (this.vel[0] = f), 0 < f && this.vel[0] < f && (this.vel[0] = f), this.vel[0] *= .925) : (this.vel[0] *= .5, this.jumpCountAir = 0, this.ropeTarget || 0 != f && (this.vel[0] = f));
                    !e && c && (this.inAir ? 0 == this.jumpCountAir && (this.vel[1] = b.jumpPower1,
                        this.jumpCountAir++) : this.vel[1] = b.jumpPower0);
                    e && this.hasJetpack(a) && (this.vel[1] += b.jetpackPower);
                    this.currentFlags = 0;
                    this.inAir = !0
                };
                a.browser || (h.prototype.hasWeapon = function(a) {
                    return this.weapons[a] ? !0 : !1
                }, h.prototype.giveWeapon = function(a) {
                    this.weapons[a] = {
                        ammo: e[a].ammoCount,
                        lastShot: 0,
                        triggered: !1,
                        heat: 0
                    };
                    this.currentWeapon = a
                });
                n.exports = h
            }).call(this, f(7))
        }, {}],
        144: [function(f, n, m) {
            n.exports = function(a, f) {
                this.grid = [];
                this.width = a;
                this.height = f;
                this.regs = [];
                for (var b = 0; b < f; b++) {
                    this.grid[b] = [];
                    for (var e = 0; e < a; e++) this.grid[b][e] = []
                }
                this.delete = function(a) {
                    for (var b = [], c = 0; c < this.regs.length; c++) this.regs[c].obj == a && b.push(this.regs[c]);
                    for (; 0 < b.length;) {
                        c = b.pop();
                        var d = this.grid[c.y][c.x],
                            e = d.indexOf(a);
                        if (-1 == e) throw Error("Grid delete failed at idx (cell)");
                        d.splice(e, 1);
                        c = this.regs.indexOf(c);
                        if (-1 == c) throw Error("Grid delete failed at idx (reg)");
                        this.regs.splice(c, 1)
                    }
                };
                this.add = function(a, b, c) {
                    0 > b || b >= this.width || 0 > c || c >= this.height || (this.regs.push({
                        obj: a,
                        x: b,
                        y: c
                    }), this.grid[c][b].push(a))
                };
                this.set = function(a, b, c, e, f) {
                    for (this.delete(a); b <= e; b++)
                        for (var d = c; d <= f; d++) this.add(a, b, d)
                };
                this.get = function(a, b) {
                    return 0 > a || a >= this.width || 0 > b || b >= this.height ? null : this.grid[b][a]
                };
                this.getArea = function(a, b, c, e, f) {
                    for (var d = null; a <= c; a++)
                        for (var g = b; g <= e; g++)
                            if (!(0 > a || a >= this.width || 0 > g || g >= this.height))
                                for (var h = this.grid[g][a], k = 0; k < h.length; k++) h[k] != f && (d || (d = []), d.push(h[k]));
                    return d
                }
            }
        }, {}],
        145: [function(f, n, m) {
            n.exports = function(a, f) {
                this.team = a;
                this.pos = f
            }
        }, {}],
        146: [function(f, n, m) {
            n.exports = {
                ItemTypes: [{
                    texType: 0,
                    texId: 0,
                    texScale: 1,
                    radius: 20,
                    coolDown: 20,
                    soundPickup: "item1",
                    particlesPickup: "collectHeart"
                }, {
                    texType: 1,
                    texId: 0,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload3"
                }, {
                    texType: 1,
                    texId: 5,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload4"
                }, {
                    texType: 1,
                    texId: 4,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "pickup1"
                }, {
                    texType: 1,
                    texId: 6,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload2"
                }, {
                    texType: 0,
                    texId: 1,
                    texScale: 1,
                    radius: 36,
                    coolDown: 30,
                    soundPickup: "pickup1"
                }],
                Item: function() {
                    this.y =
                        this.x = this.type = this.id = 0;
                    this.active = !0;
                    this.sprite = null;
                    this.lastChange = 0
                }
            }
        }, {}],
        147: [function(f, n, m) {
            (function(a) {
                function h(b, d) {
                    if (!b) throw Error("No map def");
                    this.tileSize = d;
                    this.map = [];
                    this.mapDef = b;
                    this.handlerWatchPoints = null;
                    this.usables = [];
                    this.spawnPoints = [];
                    this.neutralSpawnPoints = [];
                    this.blockZones = [];
                    this.flagPoints = [];
                    this.paths = [];
                    this.watchPoints = a.browser ? null : [];
                    if (b.specials)
                        for (d = 0; d < b.specials.length; d++) {
                            var e = b.specials[d];
                            switch (e.type) {
                                case "mg1":
                                    this.usables.push({
                                        type: e.type,
                                        pos: e.pos,
                                        angle: e.angle || 0,
                                        usedBy: null,
                                        sheet: null,
                                        weaponState: null,
                                        gfxPod: null,
                                        gfxGun: null
                                    })
                            }
                        }
                    b = c[this.mapDef.tileset];
                    for (var f in b)
                        if (b[f].b) {
                            this.tileBrickId = f;
                            break
                        }
                }
                var b = a.browser ? f(137) : f(122);
                var e = f(146).Item;
                f(146);
                var d = f(145),
                    k = f(134),
                    c = f(17),
                    g = f(13),
                    m;
                a.browser && (m = f(54));
                h.prototype.map = null;
                h.prototype.mapDef = null;
                h.prototype.dirtyQuadtree = !1;
                h.prototype.hasDamage = !1;
                h.prototype.tileSize = 0;
                h.prototype.mapWidth = 0;
                h.prototype.mapHeight = 0;
                h.prototype.quadTree = null;
                h.prototype.quadTreeLevels =
                    0;
                h.prototype.quadTreeTileLevel = 0;
                h.prototype.handlerWatchPoints = null;
                h.prototype.loaded = !1;
                h.prototype.items = null;
                h.prototype.watchPoints = null;
                h.prototype.objectMap = null;
                h.prototype.objects = null;
                h.prototype.usables = null;
                h.prototype.spawnPoints = null;
                h.prototype.flagPoints = null;
                h.prototype.neutralSpawnPoints = null;
                h.prototype.blockZones = null;
                h.prototype.paths = null;
                h.prototype.flags = null;
                h.prototype.waterLevel = 1E5;
                h.prototype.tileBrickId = -1;
                h.prototype.loadFromUrl = function(a, b) {
                    var c = this,
                        d = new XMLHttpRequest;
                    d.open("GET", a, !0);
                    d.responseType = "arraybuffer";
                    d.onreadystatechange = function() {
                        d.readyState == XMLHttpRequest.DONE && 200 == d.status && (c.loadFromArrayBuffer(d.response), b())
                    };
                    d.send()
                };
                h.prototype.loadFromArrayBuffer = function(a) {
                    a = new DataView(a);
                    if (12 <= a.byteLength) {
                        if (1128418630 == a.getInt32(0, !1)) {
                            var c = a.getInt8(4);
                            a.getInt8(5);
                            var e = a.getInt16(6, !0),
                                f = a.getInt16(8, !0);
                            if (2 != c) throw Error("Invalid map version");
                            this.mapWidth = e;
                            this.mapHeight = f;
                            this.quadTree = new b(Math.pow(2, Math.ceil(Math.log(Math.max(e,
                                f)) / Math.log(2))) * this.tileSize);
                            this.quadTreeLevels = this.quadTree.levels;
                            this.quadTreeTileLevel = this.quadTreeLevels - Math.log(this.tileSize) / Math.log(2);
                            for (c = 10; c < a.byteLength;) {
                                e = a.getInt8(c + 0);
                                f = a.getInt8(c + 1);
                                var l = a.getInt32(c + 2, !0);
                                if (42 != e) throw Error("ERROR\tInvalid chunk head");
                                if (!this.processChunk(a, f, c + 6, l)) throw Error("ERROR\tCannot process chunk " + f);
                                c += 6 + l
                            }
                            this.processObjects();
                            this.loaded = this.dirtyQuadtree = !0
                        }
                    } else throw Error("ERROR\tCannot read map");
                    if (2 != this.spawnPoints.length ||
                        4 != this.spawnPoints[0].length || 4 != this.spawnPoints[1].length) throw Error("ERROR\tInvalid spawn points");
                    if (2 == this.flagPoints.length)
                        // console.log(this.flagPoint) strong undefined
                        for (this.flags = [], a = 0; 2 > a; a++) this.flags[a] = new d(a, this.flagPoints[a]);
                    this.update()
                };
                h.prototype.processChunk = function(a, b, c, d) {
                    1 == b ? this.processTileDataChunk(a, c, d) : 2 == b ? this.processItemDataChunk(a, c, d) : 3 == b ? this.processObjDefChunk(a, c, d) : 4 == b ? this.processObjDataChunk(a, c, d) : 5 == b && this.processExtraDataChunk(a, c, d);
                    return !0
                };
                h.prototype.processTileDataChunk = function(b,
                    c, d) {
                    if (d == this.mapWidth * this.mapHeight) {
                        for (var e = d = 0; e < this.mapHeight; e++) {
                            for (var f = [], l = 0; l < this.mapWidth; l++) {
                                var g = b.getUint8(d + c);
                                0 == g ? f.push(null) : (f.push(this.generateTileObject(l, e, g)), a.browser || this.addTileToQuadTree(l, e, g));
                                d++
                            }
                            this.map.push(f)
                        }
                        return !0
                    }
                    return !1
                };
                h.prototype.processItemDataChunk = function(a, b, c) {
                    if (0 != c % 5) throw Error("Invalid items count");
                    c /= 5;
                    this.items = [];
                    for (var d = 0; d < c; d++) {
                        var f = a.getInt16(b, !0);
                        b += 2;
                        var l = a.getInt16(b, !0);
                        b += 2;
                        var g = a.getInt8(b);
                        b += 1;
                        var h = new e;
                        h.id = d;
                        h.type = g;
                        h.x = f;
                        h.y = l;
                        this.items.push(h)
                    }
                };
                h.prototype.processObjDefChunk = function(a, b, c) {
                    this.objectMap = [];
                    for (var d = b; d < b + c;)
                        for (var e = "";;) {
                            var f = a.getInt8(d++);
                            if (0 != f) e += String.fromCharCode(f);
                            else {
                                this.objectMap.push(e);
                                break
                            }
                        }
                };
                h.prototype.processObjDataChunk = function(a, b, c) {
                    if (0 != c % 5) throw Error("Invalid objects count");
                    c /= 5;
                    this.objects = [];
                    for (var d = 0; d < c; d++) {
                        var e = a.getInt16(b, !0);
                        b += 2;
                        var f = a.getInt16(b, !0);
                        b += 2;
                        var l = a.getInt8(b);
                        b += 1;
                        this.objects.push({
                            type: l,
                            typeDef: null,
                            x: e,
                            y: f,
                            active: !0,
                            sprite: null,
                            animTime: 0,
                            renderPos: null
                        })
                    }
                };
                h.prototype.processExtraDataChunk = function(a, b, c) {
                    for (var d = b; d < b + c;) {
                        var e = a.getInt8(d);
                        d += 1;
                        switch (e) {
                            case 0:
                            case 1:
                                var f = a.getInt16(d, !0);
                                d += 2;
                                var l = a.getInt16(d, !0);
                                d += 2;
                                var g = a.getInt16(d, !0);
                                d += 2;
                                var h = a.getInt16(d, !0);
                                d += 2;
                                this.spawnPoints[e] = [f, l, g, h];
                                break;
                            case 2:
                                f = a.getInt16(d, !0);
                                d += 2;
                                l = a.getInt16(d, !0);
                                d += 2;
                                g = a.getInt16(d, !0);
                                d += 2;
                                h = a.getInt16(d, !0);
                                d += 2;
                                this.neutralSpawnPoints.push([f, l, g, h]);
                                break;
                            case 3:
                            case 4:
                                f = a.getInt16(d, !0);
                                d += 2;
                                l = a.getInt16(d, !0);
                                d += 2;
                                this.flagPoints[e - 3] = [f, l];
                                break;
                            case 5:
                                this.waterLevel = a.getInt16(d, !0);
                                d += 2;
                                break;
                            case 6:
                                f = a.getInt16(d, !0);
                                d += 2;
                                l = a.getInt16(d, !0);
                                d += 2;
                                g = a.getInt16(d, !0);
                                d += 2;
                                h = a.getInt16(d, !0);
                                d += 2;
                                this.blockZones.push([f, l, g, h]);
                                break;
                            case 7:
                                l = a.getUint8(d);
                                d += 1;
                                f = "";
                                for (e = 0; e < l; e++) f += String.fromCharCode(a.getUint8(d++));
                                g = new k;
                                g.name = f;
                                h = a.getUint8(d);
                                d += 1;
                                for (e = 0; e < h; e++) f = a.getInt32(d, !0), d += 4, l = a.getInt32(d, !0), d += 4, g.points.push([f, l]);
                                g.interpolatePath();
                                this.paths.push(g);
                                break;
                            default:
                                throw Error("Unknown type id " + e);
                        }
                    }
                };
                h.prototype.generateTileObject = function(a, b, c) {
                    return {
                        x: a,
                        y: b,
                        tile: c,
                        sprite: null,
                        modifiedTex: null,
                        modifiedCtx: null,
                        isModified: !1
                    }
                };
                h.prototype.addTileToQuadTree = function(a, b, d) {
                    a *= this.tileSize;
                    b *= this.tileSize;
                    d = c[this.mapDef.tileset][d].lock || [];
                    if (0 == d.length) this.quadTree.setValue(a, b, 1, this.quadTreeTileLevel);
                    else
                        for (var e = 0; e < this.tileSize; e++)
                            for (var f = 0; f < this.tileSize; f++) {
                                for (var l = !1, g = 0; g < d.length; g++)
                                    if (f >= d[g][0] && f < d[g][2] && e >= d[g][1] &&
                                        e < d[g][3]) {
                                        l = !0;
                                        break
                                    }
                                this.quadTree.setValue(a + f, b + e, l ? 2 : 1, this.quadTree.levels)
                            }
                };
                h.prototype.addBrick = function(b, c, d) {
                    this.map[c][b] ? this.map[c][b].isModified && (this.map[c][b].modifiedTex = null, this.map[c][b].modifiedCtx = null, this.map[c][b].sprite && (this.map[c][b].sprite.remove(), this.map[c][b].sprite = null), this.map[c][b].isModified = !1) : this.map[c][b] = this.generateTileObject(b, c, this.tileBrickId);
                    d && this.quadTree.setValue(b * this.tileSize, c * this.tileSize, 1, this.quadTreeTileLevel);
                    a.browser && m && m.mapGfx.addBrick(b,
                        c)
                };
                h.prototype.isTileBlocked = function(a, b) {
                    function c(a, b, c) {
                        return b < a[0] || b >= a[0] + a[2] || c < a[1] || c >= a[1] + a[3] ? !1 : !0
                    }
                    for (var d = 0; d < this.blockZones.length; d++)
                        if (c(this.blockZones[d], a, b)) return !0;
                    for (d = 0; d < this.spawnPoints.length; d++)
                        if (c(this.spawnPoints[d], a, b)) return !0;
                    for (d = 0; d < this.neutralSpawnPoints.length; d++)
                        if (c(this.neutralSpawnPoints[d], a, b)) return !0
                };
                h.prototype.getPath = function(a) {
                    for (var b = 0; b < this.paths.length; b++)
                        if (this.paths[b].name == a) return this.paths[b];
                    return null
                };
                h.prototype.processObjects =
                    function() {
                        for (var a = 0; a < this.objects.length; a++) {
                            var b = this.objects[a],
                                c = g[this.mapDef.objset].f[this.objectMap[b.type]];
                            b.typeDef = c;
                            if (c = c[4])
                                if ("center" == c) this.addWatchPoint(b.x * this.tileSize + b.typeDef[2] / 2, (b.y + 1) * this.tileSize, a);
                                else throw Error("Invalid wp: " + c);
                        }
                    };
                h.prototype.addWatchPoint = function(a, b, c) {
                    this.watchPoints && this.watchPoints.push({
                        x: a,
                        y: b,
                        ref: c
                    })
                };
                h.prototype.stampOut = function(b, c, d) {
                    var e = this.quadTree;
                    this.dirtyQuadtree = !0;
                    var f = ~~b[0],
                        l = ~~b[1];
                    e.setCircle(f, l, c, 0, 2);
                    if (a.browser &&
                        m) m.mapGfx.stampOut(b, c);
                    else {
                        e = ~~((f - c) / this.tileSize);
                        f = ~~((f + c) / this.tileSize);
                        var g = ~~((l + c) / this.tileSize);
                        for (l = ~~((l - c) / this.tileSize); l <= g; l++)
                            if (!(0 > l || l >= this.map.length))
                                for (var h = e; h <= f; h++)
                                    if (!(0 > h || h >= this.map[l].length)) {
                                        var k = this.map[l][h];
                                        k && (k.isModified = !0)
                                    }
                    }
                    a.browser || this.triggerDestructionWatchPoints(b, c, d);
                    this.hasDamage = !0
                };
                h.prototype.stampOutUsingTree = function() {
                    a.browser && m && (m.mapGfx.stampOutUsingTree(), this.hasDamage = !0)
                };
                h.prototype.triggerDestructionWatchPoints = function(a,
                    b, c) {
                    if (this.watchPoints) {
                        b *= b;
                        for (var d = 0; d < this.watchPoints.length; d++) {
                            var e = this.watchPoints[d].x - a[0],
                                f = this.watchPoints[d].y - a[1];
                            e * e + f * f <= b && this.handlerWatchPoints && this.handlerWatchPoints(this.watchPoints[d].ref, c)
                        }
                    }
                };
                h.prototype.getNearUsableObject = function(a) {
                    for (var b = null, c = 0; c < this.usables.length; c++) {
                        var d = this.usables[c],
                            e = (d.pos[0] + .5) * this.tileSize - a[0],
                            f = (d.pos[1] + .5) * this.tileSize - a[1];
                        if (150 > Math.sqrt(e * e + f * f)) {
                            b = d;
                            break
                        }
                    }
                    return b
                };
                h.prototype.getSpawnPos = function(a) {
                    a = this.spawnPoints[a];
                    return [a[0] + (a[2] - 1) * Math.random(), a[1] + (a[3] - 1) * Math.random()]
                };
                h.prototype.getNeutralSpawnPos = function() {
                    var a = [];
                    this.spawnPoints[0] && a.push(this.spawnPoints[0]);
                    this.spawnPoints[1] && a.push(this.spawnPoints[1]);
                    for (var b = 0; b < this.neutralSpawnPoints.length; b++) a.push(this.neutralSpawnPoints[b]);
                    a = a[~~(a.length * Math.random())];
                    return [a[0] + (a[2] - 1) * Math.random(), a[1] + (a[3] - 1) * Math.random()]
                };
                h.prototype.getNeutralSpawnPosExcludingTeam = function(a) {
                    var b = [];
                    this.spawnPoints[0] && 0 == a && b.push(this.spawnPoints[0]);
                    this.spawnPoints[1] && 1 == a && b.push(this.spawnPoints[1]);
                    for (a = 0; a < this.neutralSpawnPoints.length; a++) b.push(this.neutralSpawnPoints[a]);
                    b = b[~~(b.length * Math.random())];
                    return [b[0] + (b[2] - 1) * Math.random(), b[1] + (b[3] - 1) * Math.random()]
                };
                h.prototype.isLoaded = function() {
                    return this.loaded
                };
                h.prototype.onWatchPoint = function(a) {
                    this.handlerWatchPoints = a
                };
                h.prototype.update = function() {
                    this.dirtyQuadtree && (this.quadTree.update(), this.dirtyQuadtree = !1)
                };
                h.prototype.destroy = function() {
                    this.quadTree.destroy();
                    this.quadTree = null
                };
                h.prototype.isValidCoord = function(a, b) {
                    return 0 > a || 0 > b || a >= this.mapWidth || b >= this.mapHeight ? !1 : !0
                };
                n.exports = h
            }).call(this, f(7))
        }, {}],
        148: [function(f, n, m) {
            var a = f(150),
                h = f(142).BulletTypes,
                b = f(143),
                e = f(131);
            n.exports = function(d) {
                var f = [0, a.gravityY * (d.map.mapDef.gravity || 1)],
                    c = null,
                    g = !1,
                    m = .2 / (a.ticksPerSecond / 40);
                this.setBorder = function(a, b) {
                    c = a;
                    g = b
                };
                this.update = function(a) {
                    for (var b = 0; 5 > b; b++) this.step(m, a);
                    d.map.update()
                };
                this.updateBullets = function() {
                    for (var a = 0; 5 > a; a++) this.applyBulletPhysic(m)
                };
                this.step = function(a, b) {
                    d.updateCharGrid();
                    this.applyGravity(a, b);
                    this.applyRope(a, b);
                    this.integrateVelocity(a, b);
                    d.updateCharGrid();
                    this.collideCharBorder();
                    this.collideCharCharAll();
                    this.collideCharMapAll();
                    this.debugCharacters()
                };
                this.applyGravity = function(a, b) {
                    var c = f[0] * a;
                    a *= f[1];
                    for (var e = 0; e < d.characters.length; e++) {
                        var g = d.characters[e];
                        g.usable || b && g != d.localCharacter || (g.vel[0] -= c, g.vel[1] -= a)
                    }
                };
                this.applyRope = function(c, e) {
                    function f(b, d, e) {
                        var f = e[0] - d[0];
                        d = e[1] - d[1];
                        e = Math.sqrt(f * f + d *
                            d);
                        e >= a.minRopeLength && (f = f / e * a.ropePower, d = d / e * a.ropePower, e = b.currentInput & 2, b.currentInput & 1 && (f -= .4 * a.walkSpeed), e && (f += .4 * a.walkSpeed), b.vel[0] += f * c, b.vel[1] += d * c, b.vel[0] *= .98, b.vel[1] *= .98)
                    }
                    for (var g = 0; g < d.characters.length; g++) {
                        var h = d.characters[g];
                        if (!(h.usable || e && h != d.localCharacter) && h.ropeTarget)
                            if (h.ropeTarget instanceof b) {
                                var l = h.ropeTarget.pos[0];
                                var k = h.ropeTarget.pos[1];
                                f(h, h.pos, [l, k]);
                                f(h.ropeTarget, [l, k], h.pos)
                            } else l = h.ropeTarget[0], k = h.ropeTarget[1], f(h, h.pos, [l, k])
                    }
                };
                this.applyBulletPhysic =
                    function(a) {
                        for (var b = f[1] * a, c = 0; c < d.bullets.length; c++) {
                            var e = d.bullets[c];
                            e.vel[1] -= b * h[e.type].gravityFactor;
                            e.pos[0] += e.vel[0] * a;
                            e.pos[1] += e.vel[1] * a;
                            if (!e.leftOwnerRange && 0 == e.ownerType && e.ownerObject) {
                                var g = e.lastPos[0] - e.ownerObject.pos[0],
                                    l = e.lastPos[1] - e.ownerObject.pos[1];
                                g * g + l * l > e.ownerObject.radius * e.ownerObject.radius * 2 && (e.leftOwnerRange = !0)
                            }
                        }
                    };
                this.checkBulletCollisions = function() {
                    function a(a, c, d) {
                        b.push({
                            type: 1,
                            bullet: c,
                            pos: a,
                            affectMap: d
                        });
                        var e = h[c.type].strengthExplosion;
                        0 != e &&
                            f.explosion(a, e, d, c)
                    }
                    for (var b = [], f = this, k = 0; k < d.bullets.length; k++) {
                        var m = d.bullets[k];
                        if (c) {
                            var n = null;
                            if (0 >= m.pos[0] || 0 >= m.pos[1]) n = m.pos.slice();
                            if (m.pos[0] >= c[0] || m.pos[1] >= c[1] && g) n = m.pos.slice();
                            n && a(n, m, !0)
                        }
                        n = d.map.quadTree.findFirstOnLine(m.lastPos[0], m.lastPos[1], m.pos[0], m.pos[1], 0, !0);
                        if (null != n) {
                            var q = 2 == n[2] ? !1 : !0;
                            a(n.slice(0, 2), m, q)
                        }
                        for (n = 0; n < d.characters.length; n++) {
                            var r = d.characters[n];
                            (q = e.collideLineCircle([m.pos, m.lastPos], r.pos, r.radius)) && (m.leftOwnerRange || 0 != m.ownerType ||
                                r != m.ownerObject) && b.push({
                                type: 2,
                                bullet: m,
                                character: r,
                                pos: m.pos.slice()
                            })
                        }
                        m.pos[1] > d.map.waterLevel + 32 && b.push({
                            type: 3,
                            bullet: m,
                            pos: [m.lastPos[0] + (d.map.waterLevel - m.lastPos[1]) / (m.pos[1] - m.lastPos[1]) * (m.pos[0] - m.lastPos[0]), d.map.waterLevel]
                        });
                        for (n = 0; n < d.physicGenerics.length; n++) r = d.physicGenerics[n], r.shootable && -1 == r.bulletImmunity.indexOf(m.type) && (q = e.collideLineCircle([m.pos, m.lastPos], r.pos, r.radius)) && b.push({
                            type: 4,
                            bullet: m,
                            pg: r,
                            pos: m.pos.slice()
                        })
                    }
                    return b
                };
                this.calculateHitForcesToChars =
                    function(b) {
                        for (var c = [], e = 0; e < b.length; e++) {
                            var f = b[e];
                            if (0 != f.type && null != f.bullet) {
                                var g = f.bullet.pos;
                                f = h[f.bullet.type].strengthExplosion;
                                for (var l = 0; l < d.characters.length; l++) {
                                    var k = d.characters[l];
                                    if (!k.usable) {
                                        var m = k.pos[0] - g[0],
                                            n = k.pos[1] - g[1],
                                            q = Math.sqrt(m * m + n * n);
                                        m /= q;
                                        n /= q;
                                        q = 2.5 / (q / f);
                                        if (1 <= q) {
                                            a: {
                                                for (var D = 0; D < c.length; D++)
                                                    if (c[D].character == k) {
                                                        k = c[D];
                                                        break a
                                                    }
                                                k = {
                                                    character: k,
                                                    force: [0, 0]
                                                };
                                                c.push(k)
                                            }
                                            k.force[0] += m * q * a.explosionPower;k.force[1] += n * q * a.explosionPower
                                        }
                                    }
                                }
                            }
                        }
                        return c
                    };
                this.integrateVelocity =
                    function(b, c) {
                        for (var e = 0; e < d.characters.length; e++) {
                            var f = d.characters[e];
                            if (!(f.usable || c && f != d.localCharacter)) {
                                var g = a.maxVelocity;
                                f.vel[0] = Math.min(g, Math.max(f.vel[0], -g));
                                f.vel[1] = Math.max(f.vel[1], -g);
                                f.vel[1] = Math.min(f.vel[1], 3 * g);
                                f.pos[0] += f.vel[0] * b;
                                f.pos[1] += f.vel[1] * b
                            }
                        }
                    };
                this.collideCharBorder = function() {
                    if (c)
                        for (var a = 0; a < d.characters.length; a++) {
                            var b = d.characters[a];
                            b.usable || (0 > b.pos[0] - b.radius && (b.pos[0] = b.radius, b.inAir = !1), 0 > b.pos[1] - b.radius && (b.pos[1] = b.radius, b.inAir = !1),
                                b.pos[0] + b.radius > c[0] && (b.pos[0] = c[0] - b.radius, b.inAir = !1), g && b.pos[1] + b.radius > c[1] && (b.pos[1] = c[1] - b.radius, b.inAir = !1))
                        }
                };
                this.collideCharMapAll = function() {
                    for (var a = 0; a < d.characters.length; a++) d.characters[a].usable || this.collideCharMap(d.characters[a])
                };
                this.collideCharCharAll = function() {
                    for (var a = 0; a < d.characters.length; a++)
                        if (!d.characters[a].usable)
                            for (var b = 0; b < d.characters.length; b++) d.characters[b].usable || a != b && this.collideCharChar(d.characters[a], d.characters[b])
                };
                this.collideCharMap =
                    function(a) {
                        var b = d.map.quadTree.findInCircle(a.pos[0], a.pos[1], a.radius, 0, !0);
                        if (b) {
                            for (var c = 0; c < b.length; c++) {
                                var e = b[c],
                                    f = e[0] - a.pos[0];
                                e = e[1] - a.pos[1];
                                var g = Math.sqrt(f * f + e * e);
                                0 != g && this.solveCharMap(a, -f / g, -e / g, g, a.radius)
                            }
                            2 < b.length && this.solveCharMapMultipleHits(a, b)
                        }
                    };
                this.collideCharChar = function(a, b) {
                    var c = a.pos[0] - b.pos[0],
                        d = a.pos[1] - b.pos[1],
                        e = a.radius + b.radius;
                    if (!(e < Math.abs(c) || e < Math.abs(d))) {
                        var f = c * c + d * d;
                        f <= e * e && (f = Math.sqrt(f), 0 == f ? (c = 0, d = 1) : (c /= f, d /= f), this.solveCharChar(a, b,
                            c, d, f, e))
                    }
                };
                this.solveCharMap = function(a, b, c, d, e) {
                    d = e - d;
                    0 > d || (.6 < Math.abs(b) ? (a.pos[0] += d * b, a.pos[1] += d * c, a.vel[0] = 0) : (a.pos[1] += d * c, a.vel[1] = 0, -.6 > c && (a.inAir = !1)))
                };
                this.solveCharMapMultipleHits = function(a, b) {
                    for (var c = 0, d = 0, e = 0; 60 > e; e++) {
                        var f = -1;
                        var g = a.radius * a.radius * 2;
                        for (var h = 0; h < b.length; h++) {
                            var k = b[h][0] - a.pos[0],
                                l = b[h][1] - a.pos[1],
                                m = k * k + l * l;
                            m < g && (g = m, f = h);
                            0 == e && (0 < l && c++, Math.abs(k) > a.radius - 1 && d++)
                        }
                        g = Math.sqrt(g); - 1 != f && (h = 1 - g / a.radius, f = [(b[f][0] - a.pos[0]) * h, (b[f][1] - a.pos[1]) * h], a.pos[0] -=
                            f[0], a.pos[1] -= f[1]);
                        if (g + .05 >= a.radius) break
                    }
                    d == b.length ? a.vel[1] *= .9 : c >= b.length >> 1 ? (a.inAir = !1, a.vel[1] = Math.min(0, a.vel[1])) : 0 > a.vel[1] && (a.vel[1] = 0)
                };
                this.solveCharChar = function(a, b, c, d, e, f) {
                    e = f - e;
                    a.pos[0] += e * c;
                    a.pos[1] += e * d;
                    b.pos[0] += e * -c;
                    b.pos[1] += e * -d;
                    e = a.vel[0] * c + a.vel[1] * d;
                    f = b.vel[0] * c + b.vel[1] * d;
                    a.vel[0] += (f - e) * c;
                    a.vel[1] += (f - e) * d;
                    b.vel[0] += (e - f) * c;
                    b.vel[1] += (e - f) * d; - .8 > d ? (a.vel[1] -= 5, a.inAir = !1) : .8 < d && (b.vel[1] -= 5, b.inAir = !1)
                };
                this.explosion = function(a, b, c, e) {
                    c && d.map.stampOut(a, b, e)
                };
                this.debugCharacters = function() {
                    for (var a = 0; a < d.characters.length; a++) {
                        var b = d.characters[a];
                        if (isNaN(b.pos[0]) || isNaN(b.pos[1]) || isNaN(b.vel[0]) || isNaN(b.vel[1])) throw Error("Character sanity validation failed: " + b.pos[0] + ", " + b.pos[1] + ", " + b.vel[0] + ", " + b.vel[1]);
                    }
                }
            }
        }, {}],
        149: [function(f, n, m) {
            (function(a) {
                var h = f(150);
                f(142);
                f(142);
                var b = f(135),
                    e = f(131),
                    d = null;
                a.browser && (d = f(52));
                var k = null;
                a.browser && (k = f(86));
                n.exports = function(c, f) {
                    this.id = f;
                    this.startTime = 0;
                    this.speed = 300;
                    this.type = -1;
                    this.path =
                        this.planeDef = this.sfxChannel = this.gfx = null;
                    this.state = 1;
                    this.health = 50;
                    this.actualPos = null;
                    this.crashTick = 0;
                    this.physicGenerics = [];
                    var g = [{
                        pos: [0, 0],
                        radius: 150
                    }];
                    a.browser && (this.gfx = new d, this.sfxChannel = k.createChannel("plane1"));
                    this.update = function(a) {
                        a = a || 0;
                        this.path && 0 != this.state && (1 == this.state ? this.updateFlying(a) : 2 == this.state && this.updateCrashing(a))
                    };
                    this.updateFlying = function(a) {
                        a = this.getAtTick(c.tick + a);
                        0 == this.health ? this.crash() : 25 >= this.health && this.damaged();
                        a.hasPos && (this.gfx ?
                            (this.gfx.setPos(a.pos[0], a.pos[1], a.angle), this.gfx.animate(), this.sfxChannel && this.sfxChannel.setPos(a.pos[0], a.pos[1])) : 0 == (c.tick + ~~(this.planeDef.dropTimeOffset * h.ticksPerSecond)) % (h.ticksPerSecond * this.planeDef.dropsEverySec) && this.dropBomb(a.pos, a.angle), this.updatePhysicGenerics(a.pos, a.angle), this.actualPos = a.pos);
                        a.endOfPath && (this.state = 0, this.remove())
                    };
                    this.updateCrashing = function(a) {
                        a = (c.tick + a - this.crashTick) / h.ticksPerSecond;
                        var b = this.getAtTick(this.crashTick);
                        if (b.hasPos) {
                            var d =
                                a * this.speed,
                                f = a * a * this.speed / 20,
                                g = e.lerp(b.angle, Math.atan2(f, d), Math.min(Math.max(0, a / 3), 1));
                            b = [b.pos[0] + d, b.pos[1] + f];
                            this.gfx && (this.gfx.setPos(b[0], b[1], g), this.gfx.animate(), this.sfxChannel && (this.sfxChannel.setPos(b[0], b[1]), this.sfxChannel.setSpeedModifier(Math.min(1 + a / 10, 3))));
                            this.actualPos = b;
                            this.actualAngle = g;
                            this.updatePhysicGenerics(b, g);
                            20 < a && (this.state = 0, this.remove())
                        }
                    };
                    this.getAtTick = function(a) {
                        a = (a - this.startTime) / h.ticksPerSecond;
                        var b = a * this.speed,
                            c = this.path.getPos(b);
                        b = this.path.getPos(b -
                            100);
                        return c && b ? {
                            pos: [c[0], c[1] + 3 * Math.sin(6 * a) + 6 * Math.sin(2.5 * a)],
                            angle: .4 * Math.atan2(c[1] - b[1], c[0] - b[0]) + .02 * Math.sin(3 * a) + .005 * Math.sin(8 * a),
                            hasPos: !0,
                            endOfPath: !1
                        } : c && !b ? {
                            hasPos: !1,
                            endOfPath: !1
                        } : {
                            hasPos: !1,
                            endOfPath: !0
                        }
                    };
                    this.damaged = function() {
                        this.gfx && this.gfx.setState(1)
                    };
                    this.crash = function() {
                        this.gfx ? (this.gfx.setState(2), this.state = 2) : (this.crashTick = c.tick, this.state = 2, this.health = 0)
                    };
                    this.dropBomb = function(a, b) {
                        a = c.addBullet(this, c.tick, a, 0, 5, 5);
                        a.vel[0] = Math.cos(b) * this.speed / h.ticksPerSecond;
                        a.vel[1] = Math.sin(b) * this.speed / h.ticksPerSecond;
                        b = c.gameState.findSheet("bullet", a.id);
                        a.writeToSheet(b)
                    };
                    this.reset = function() {
                        this.startTime = c.tick;
                        this.state = 1
                    };
                    this.remove = function() {
                        this.gfx && this.gfx.remove();
                        this.sfxChannel && k.removeChannel(this.sfxChannel);
                        this.removePhysicGenerics()
                    };
                    this.isStopped = function() {
                        return 0 == this.state
                    };
                    this.loadPlaneDef = function() {
                        this.planeDef = c.map.mapDef.specials[this.type];
                        if ("plane" != this.planeDef.type) throw Error("PlaneDef invalid");
                        this.path = c.map.getPath(this.planeDef.path);
                        this.lastDrop = c.tick + this.planeDef.dropTimeOffset * h.ticksPerSecond
                    };
                    this.readFromSheet = function(a) {
                        this.type = a.get("type");
                        this.startTime = a.get("startTick");
                        this.crashTick = a.get("crashTick");
                        this.health = a.get("health");
                        this.loadPlaneDef()
                    };
                    this.writeToSheet = function(a) {
                        a.set("type", this.type);
                        a.set("startTick", this.startTime);
                        a.set("crashTick", this.crashTick);
                        a.set("health", this.health)
                    };
                    this.createPhysicGenerics = function() {
                        this.physicGenerics = [];
                        for (var a = 0; a < g.length; a++) {
                            var d = new b([0, 0], g[a].radius, !0);
                            this.physicGenerics.push(d);
                            c.addPhysicGeneric(d);
                            d.bulletImmunity.push(5)
                        }
                    };
                    this.removePhysicGenerics = function() {
                        for (; 0 < this.physicGenerics.length;) c.removePhysicGeneric(this.physicGenerics.pop())
                    };
                    this.updatePhysicGenerics = function(a, b) {
                        for (b = 0; b < this.physicGenerics.length; b++) {
                            var c = this.physicGenerics[b];
                            c.pos[0] = g[b].pos[0] + a[0];
                            c.pos[1] = g[b].pos[1] + a[1]
                        }
                    };
                    this.createPhysicGenerics()
                }
            }).call(this, f(7))
        }, {}],
        150: [function(f, n, m) {
            n.exports = {
                ticksPerSecond: 40,
                snapshotEveryNth: 10,
                inputResendTime: 40,
                maxAngleResend: 4,
                interpolationTime: 10,
                bots: !1,
                saveReplays: !1,
                loadTest: !1,
                matchLength: 240,
                warmupLength: 30,
                inactivityTime: 60,
                maxRopeLength: 900,
                minRopeLength: 50,
                maxRopeCharTime: 25,
                ropeSanityTolerance: 1E3,
                maxVelocity: 20,
                ropePower: 8,
                explosionPower: 7,
                walkSpeed: 11.6,
                jumpPower0: -20,
                jumpPower1: -15,
                jetpackPower: -2,
                gravityY: -1,
                maxBrickDistance: 600,
                minBrickDistanceOwn: 64,
                minBrickDistanceOther: 128,
                respawnTime: 3,
                maxHealth: 10,
                capturesToWin: 3,
                afkTimeout: 60,
                lagScoreMax: 5E5,
                basicWeapons: [2, 4],
                maxWeapons: 16,
                maxTeamSize: 4
            }
        }, {}],
        151: [function(f, n, m) {
            (function(a) {
                function h() {}
                var b = a.browser ? f(61) : f(18),
                    e = f(144),
                    d = f(150);
                f(142);
                f(142);
                h.prototype.tick = 0;
                h.prototype.physic = null;
                h.prototype.map = null;
                h.prototype.gameState = null;
                h.prototype.characters = null;
                h.prototype.bullets = null;
                h.prototype.planes = null;
                h.prototype.physicGenerics = null;
                h.prototype.gridChars = null;
                h.prototype.init = function() {
                    this.characters = [];
                    this.bullets = [];
                    this.planes = [];
                    this.physicGenerics = []
                };
                h.prototype.setMap = function(a) {
                    this.map = a;
                    this.gridChars = new e(a.mapWidth,
                        a.mapHeight)
                };
                h.prototype.bulletById = function(a) {
                    for (var b = 0; b < this.bullets.length; b++)
                        if (this.bullets[b].id == a) return this.bullets[b];
                    return null
                };
                h.prototype.pruneBullet = function(a) {
                    var c = this.bullets.indexOf(a); - 1 == c && b.warn("Cannot prune bullet;" + JSON.stringify(a) + ";" + Error().stack);
                    this.bullets.splice(c, 1);
                    a.remove()
                };
                h.prototype.addPhysicGeneric = function(a) {
                    this.physicGenerics.push(a)
                };
                h.prototype.removePhysicGeneric = function(a) {
                    a = this.physicGenerics.indexOf(a); - 1 == a && b.error("Invalid pg");
                    this.physicGenerics.splice(a, 1)
                };
                h.prototype.isBrickPlaceable = function(a, b, e) {
                    function c(a) {
                        var b = a.pos[0] - f;
                        a = a.pos[1] - g;
                        return Math.sqrt(b * b + a * a)
                    }
                    var f = (b + .5) * this.map.tileSize,
                        g = (e + .5) * this.map.tileSize,
                        h = c(a);
                    if (h > d.maxBrickDistance || h < d.minBrickDistanceOwn) return !1;
                    for (var k = 0; k < this.characters.length; k++)
                        if (h = this.characters[k], h != a && (h = c(h), h < d.minBrickDistanceOther)) return !1;
                    return this.map.map[e][b] && !this.map.map[e][b].isModified || this.map.isTileBlocked(b, e) ? !1 : !0
                };
                h.prototype.getUsableByCharacter =
                    function(a) {
                        for (var b = 0; b < this.map.usables.length; b++)
                            if (this.map.usables[b].usedBy == a) return this.map.usables[b];
                        return null
                    };
                h.prototype.findCharPosInUsable = function(a) {
                    var b = [(a.pos[0] + .5) * this.map.tileSize, (a.pos[1] + .5) * this.map.tileSize];
                    switch (a.type) {
                        case "mg1":
                            b[0] += 70 * Math.cos(a.angle + Math.PI), b[1] += 70 * Math.sin(a.angle + Math.PI) - 30
                    }
                    return b
                };
                h.prototype.findUsableCameraCenter = function(a) {
                    var b = [(a.pos[0] + .5) * this.map.tileSize, (a.pos[1] + .5) * this.map.tileSize];
                    switch (a.type) {
                        case "mg1":
                            return b[1] -=
                                30, b;
                        default:
                            throw Error("Unknown type");
                    }
                };
                h.prototype.findUsableWeaponMuzzle = function(a) {
                    var b = [(a.pos[0] + .5) * this.map.tileSize, (a.pos[1] + .5) * this.map.tileSize];
                    switch (a.type) {
                        case "mg1":
                            var d = Math.abs(a.angle) > Math.PI / 2;
                            b[0] += 60 * Math.cos(a.angle - .55 * (d ? -1 : 1));
                            b[1] += 60 * Math.sin(a.angle - .55 * (d ? -1 : 1));
                            return b;
                        default:
                            throw Error("Unknown type");
                    }
                };
                h.prototype.findUsableWeaponEjector = function(a) {
                    var b = [(a.pos[0] + .5) * this.map.tileSize, (a.pos[1] + .5) * this.map.tileSize];
                    switch (a.type) {
                        case "mg1":
                            var d =
                                Math.abs(a.angle) > Math.PI / 2;
                            b[0] += 60 * Math.cos(a.angle - 1.7 * (d ? -1 : 1));
                            b[1] += 60 * Math.sin(a.angle - 1.7 * (d ? -1 : 1));
                            return b;
                        default:
                            throw Error("Unknown type");
                    }
                };
                h.prototype.updateCharGrid = function() {
                    var a = ~~(Math.log(this.map.tileSize) / Math.log(2));
                    if (a != ~~a) throw Error("Invalid tile size");
                    for (var b = 0; b < this.characters.length; b++) {
                        var d = this.characters[b],
                            e = d.pos[0] - d.radius >> a,
                            f = d.pos[1] - d.radius >> a,
                            h = d.pos[0] + d.radius >> a,
                            m = d.pos[1] + d.radius >> a;
                        if (e != d.gridArea[0] || f != d.gridArea[1] || h != d.gridArea[2] ||
                            m != d.gridArea[3]) d.gridArea[0] = e, d.gridArea[1] = f, d.gridArea[2] = h, d.gridArea[3] = m, this.gridChars.set(d, e, f, h, m)
                    }
                };
                n.exports = h
            }).call(this, f(7))
        }, {}],
        152: [function(f, n, m) {
            n.exports = [{
                name: "skinHat",
                dom: "skinHatList",
                special: 0,
                list: [{
                    id: 1,
                    minLvl: 0,
                    tex: [0, 0, .09, .09],
                    scale: .9,
                    x: -.31,
                    y: -.31,
                    previewScale: 1,
                    previewX: 2,
                    previewY: 3
                }, {
                    id: 2,
                    minLvl: 8,
                    tex: [.09, 0, .2, .2],
                    scale: 1,
                    x: -.05,
                    y: -.35,
                    previewScale: 1,
                    previewX: 4,
                    previewY: 0
                }, {
                    id: 3,
                    minLvl: 0,
                    tex: [.09, .2, .2, .2],
                    scale: .7,
                    x: -.05,
                    y: -.6,
                    previewScale: 1,
                    previewX: 0,
                    previewY: 0
                }, {
                    id: 4,
                    minLvl: 12,
                    tex: [.09, .4, .2, .2],
                    scale: 1,
                    x: -.05,
                    y: -.25,
                    previewScale: 1,
                    previewX: 0,
                    previewY: -2
                }, {
                    id: 5,
                    minLvl: 18,
                    tex: [.09, .6, .2, .2],
                    scale: .9,
                    x: -.16,
                    y: -.42,
                    previewScale: 1,
                    previewX: -2,
                    previewY: -2
                }, {
                    id: 6,
                    minLvl: 0,
                    tex: [.09, .8, .2, .2],
                    scale: 1,
                    x: .05,
                    y: -.38,
                    previewScale: 1,
                    previewX: 5,
                    previewY: 1
                }, {
                    id: 7,
                    minLvl: 5,
                    tex: [.29, 0, .2, .2],
                    scale: .9,
                    x: -.05,
                    y: -.3,
                    previewScale: 1,
                    previewX: 0,
                    previewY: 0
                }, {
                    id: 8,
                    minLvl: 2,
                    tex: [.29, .2, .2, .2],
                    scale: 1,
                    x: -.2,
                    y: -.07,
                    previewScale: 1,
                    previewX: -5,
                    previewY: 5
                }, {
                    id: 9,
                    minLvl: 4,
                    tex: [.29, .4,
                        .2, .2
                    ],
                    scale: 1,
                    x: -.07,
                    y: -.5,
                    previewScale: 1,
                    previewX: 0,
                    previewY: -5
                }, {
                    id: 10,
                    minLvl: 30,
                    tex: [.29, .6, .2, .2],
                    scale: 1.05,
                    x: 0,
                    y: -.25,
                    previewScale: 1,
                    previewX: 2,
                    previewY: -3
                }, {
                    id: 11,
                    minLvl: 10,
                    tex: [.29, .8, .2, .2],
                    scale: 1.05,
                    x: -.24,
                    y: -.1,
                    previewScale: 1,
                    previewX: -2,
                    previewY: 7
                }]
            }, {
                name: "skinGlasses",
                dom: "skinGlassesList",
                special: 1,
                list: [{
                    id: 1,
                    minLvl: 4,
                    tex: [.8, 0, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 1.5,
                    previewX: -12,
                    previewY: -6,
                    noEye: !0
                }, {
                    id: 2,
                    minLvl: 0,
                    tex: [.8, .2, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 2,
                    previewX: -38,
                    previewY: -18,
                    noEye: !1
                }, {
                    id: 3,
                    minLvl: 0,
                    tex: [.8, .4, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 2,
                    previewX: -38,
                    previewY: -13,
                    noEye: !1
                }]
            }]
        }, {}],
        153: [function(f, n, m) {
            function a(a) {
                a = a.trim();
                var b = a.indexOf("?"); - 1 != b && (a = a.substring(0, b));
                if (0 == a.length) return "/";
                "/" != a[a.length - 1] && (a += "/");
                return a
            }
            var h = f(154);
            n.exports.getUrlInfo = function(b) {
                a: {
                    b = a(b);
                    for (var e = 0; e < h.length; e++) {
                        var d = h[e].url;
                        if ("/" != d[d.length - 1]) throw Error("Invalid URL format");
                        b: {
                            var f = d;
                            d = [];
                            for (var c = "", g = 0; g < f.length; g++) "$" == f[g] ? ("" != c && d.push(c),
                                d.push(null), c = "") : c += f[g];
                            "" != c && d.push(c);
                            f = b;
                            for (c = []; 0 < d.length;) {
                                var m = d.shift();
                                if (null == m)
                                    if (0 < d.length) {
                                        g = d.shift();
                                        g = f.indexOf(g);
                                        if (-1 == g) {
                                            d = null;
                                            break b
                                        }
                                        m = f.substring(0, g);
                                        f = f.substring(g + 1);
                                        c.push(m)
                                    } else c.push(f), f = "";
                                else {
                                    g = f.indexOf(m);
                                    if (0 != g) {
                                        d = void 0;
                                        break b
                                    }
                                    f = f.substring(m.length)
                                }
                            }
                            d = "" != f ? null : c
                        }
                        if (d) {
                            b = {
                                screen: h[e].screen,
                                url: d,
                                args: h[e].args
                            };
                            break a
                        }
                    }
                    b = void 0
                }
                return b
            }
        }, {}],
        154: [function(f, n, m) {
            n.exports = [{
                url: "/",
                screen: "main",
                args: {
                    sub: "normal"
                }
            }, {
                url: "/match/$/",
                screen: "main",
                args: {
                    sub: "specificMatch"
                }
            }, {
                url: "/profile/$/",
                screen: "main",
                args: {
                    sub: "profile"
                }
            }, {
                url: "/friendrequests/",
                screen: "main",
                args: {
                    sub: "friendrequests"
                }
            }, {
                url: "/messages/",
                screen: "main",
                args: {
                    sub: "messages"
                }
            }, {
                url: "/highscore/",
                screen: "main",
                args: {
                    sub: "highscore"
                }
            }, {
                url: "/search/",
                screen: "main",
                args: {
                    sub: "search"
                }
            }]
        }, {}],
        155: [function(f, n, m) {
            n.exports = {
                mg1: {
                    heatPerShot: 40,
                    cooldownPerTick: 4,
                    heatPeak: 500,
                    weapon: 3
                }
            }
        }, {}],
        156: [function(f, n, m) {
            m = f(157);
            f = f(166);
            n.exports = {
                Core: m,
                Trachyt2d: f
            }
        }, {}],
        157: [function(f,
            n, m) {
            function a(a, b) {
                this._x = a || 0;
                this._y = b || 0;
                this._dirty = !0;
                this.hasChanged = function() {
                    return this._dirty ? (this._dirty = !1, !0) : !1
                };
                this.getLength = function() {
                    return Math.sqrt(this._x * this._x + this._y * this._y)
                };
                this.getLengthSqrt = function() {
                    return this._x * this._x + this._y * this._y
                }
            }
            f = f(158);
            Object.defineProperties(a.prototype, {
                x: {
                    get: function() {
                        return this._x
                    },
                    set: function(a) {
                        this._x != a && (this._x = a, this._dirty = !0)
                    }
                },
                y: {
                    get: function() {
                        return this._y
                    },
                    set: function(a) {
                        this._y != a && (this._y = a, this._dirty = !0)
                    }
                }
            });
            n.exports = {
                Vec2: a,
                Rect: function(a, b, e, d) {
                    this.h = this.w = this.y = this.x = 0;
                    "undefined" != typeof a && "undefined" != typeof b && "undefined" != typeof e && "undefined" != typeof d ? (this.x = a, this.y = b, this.w = e, this.h = d) : "undefined" != typeof a && "undefined" != typeof b && (this.x = a.x, this.y = a.y, this.w = b.x - a.x, this.h = b.y - a.y)
                },
                Util: f
            }
        }, {}],
        158: [function(f, n, m) {
            var a = -1,
                h = {
                    getCompatibleImageUrl: function(a) {
                        a = a.toLowerCase();
                        var b = a.indexOf("?"),
                            d = a,
                            f = ""; - 1 != b && (d = a.substring(0, b), f = a.substring(b));
                        h.isIE() && -1 !== d.indexOf(".svg",
                            d.length - 4) && (d += ".png");
                        return d + f
                    },
                    isIE: function() {
                        return 0 < h.getIEVersion() ? !0 : !1
                    },
                    isFF: function() {
                        return /firefox/i.test(navigator.userAgent)
                    },
                    isChrome: function() {
                        return /chrome/i.test(navigator.userAgent)
                    },
                    isOpera: function() {
                        return /Opera|OPR\//i.test(navigator.userAgent)
                    },
                    isVivaldi: function() {
                        return /Vivaldi/i.test(navigator.userAgent)
                    },
                    isYandex: function() {
                        return /YaBrowser/i.test(navigator.userAgent)
                    },
                    isMobile: function() {
                        var a = !1,
                            e = navigator.userAgent || navigator.vendor || window.opera;
                        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) ||
                            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,
                                4))) a = !0;
                        return a
                    },
                    getIEVersion: function() {
                        if (-1 == a) {
                            var b = 0,
                                e = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
                                d = !!navigator.userAgent.match(/Trident\/7.0/),
                                f = navigator.userAgent.indexOf("rv:11.0"),
                                c = navigator.userAgent.indexOf("Edge/");
                            e && (b = new Number(RegExp.$1)); - 1 != navigator.appVersion.indexOf("MSIE 10") && (b = 10);
                            d && -1 != f && (b = 11);
                            b || -1 == c || (b = 12);
                            return a = b
                        }
                        return a
                    },
                    getChromeVersion: function() {
                        var a = window.navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9\.]+)/);
                        return a ? a[1] : null
                    }
                };
            n.exports = h
        }, {}],
        159: [function(f, n, m) {
            var a = f(157);
            n.exports = function d(b, e) {
                function f(a) {
                    c._loaded || (c._loaded = !0, a instanceof Image ? c._imgObject = a : a instanceof HTMLCanvasElement && (c._canvasObject = a), c.width = a.width, c.height = a.height, c._glTex = b.createTexture(), c.update(), setTimeout(function() {
                        for (var a = 0; a < g.length; a++) g[a]();
                        g = null
                    }, 0))
                }
                var c = this,
                    g = [],
                    m = [];
                this.id = -1;
                this.height = this.width = 0;
                var l = !1;
                this._loaded = !1;
                this._canvasObject = this._imgObject = null;
                this._gl = b;
                this._glState = e;
                this._glTex = null;
                this._activateFilter = !0;
                this.loadFromImage = function(a) {
                    (a instanceof HTMLCanvasElement || a.complete) && f(a)
                };
                this.loadFromUrl = function(b) {
                    var d = new Image;
                    d.onload = function() {
                        c.loadFromImage(d)
                    };
                    d.onerror = function() {
                        for (var a = 0; a < m.length; a++) m[a](d);
                        m = null;
                        l = !0
                    };
                    d.src = a.Util.getCompatibleImageUrl(b)
                };
                this.replaceWithTexture = function(a) {
                    if (a instanceof d && this.isLoaded() && a.isLoaded()) this._imgObject = a._imgObject, this._canvasObject = a._canvasObject, this.update();
                    else throw Error("Not a base texture or textures are not loaded yet");
                };
                this.getObject = function() {
                    return this._imgObject ? this._imgObject : this._canvasObject
                };
                this.toCanvas = function(a) {
                    a || (a = {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1
                    });
                    var b = document.createElement("canvas");
                    b.width = a.w * this.width;
                    b.height = a.h * this.height;
                    b.getContext("2d").drawImage(this.getObject(), a.x * this.width, a.y * this.height, b.width, b.height, 0, 0, b.width, b.height);
                    return b
                };
                this.makeEditable = function() {
                    if (!this._canvasObject) {
                        var a = document.createElement("canvas");
                        a.width = this._imgObject.width;
                        a.height = this._imgObject.height;
                        a.getContext("2d").drawImage(this._canvasObject, 0, 0);
                        this._canvasObject = a;
                        this._imgObject = null
                    }
                };
                this.isEditable = function() {
                    return this._canvasObject ? !0 : !1
                };
                this.onLoad = function(a) {
                    this._loaded ? setTimeout(a, 0) : g.push(a)
                };
                this.onError = function(a) {
                    l ? setTimeout(a, 0) : m.push(a)
                };
                this.isLoaded = function() {
                    return this._loaded
                };
                this.setFilter = function(a) {
                    e.bindTexture(c._glTex);
                    (this._activateFilter = a) ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER,
                        b.LINEAR)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST))
                };
                this.update = function() {
                    var a = c._imgObject;
                    a || (a = c._canvasObject);
                    e.bindTexture(c._glTex);
                    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
                    this.setFilter(this._activateFilter)
                }
            }
        }, {}],
        160: [function(f, n, m) {
            var a = f(157);
            n.exports = function(f, b) {
                this.pos = new a.Vec2;
                this.viewportSize = new a.Vec2(f, b)
            }
        }, {}],
        161: [function(f, n, m) {
            f(157);
            n.exports = function(a) {
                this.type =
                    a
            }
        }, {}],
        162: [function(f, n, m) {
            f = f(176);
            f = {
                PIXELSHADER: 1,
                VERTEXSHADER: 2,
                TEX_CLAMP: 1,
                TEX_REPEAT: 2,
                TEX_MIRRORED: 3,
                SCENE_WORLD: 0,
                SCENE_HUD: 1,
                DEFAULT_PIXEL_SHADER_STR: "precision mediump float;\nuniform sampler2D u_Tex0;\nvarying vec2 v_TextureCoord;\nvoid main(void) {\n\tgl_FragColor = texture2D(u_Tex0, v_TextureCoord);\n}",
                DEFAULT_VERTEX_SHADER_STR: "precision mediump float;\nuniform mat4 u_MVPMatrix;\nattribute vec2 a_Pos;\nattribute vec2 a_Coord;\nvarying vec2 v_TextureCoord;\nvoid main(void) {\n\tv_TextureCoord = a_Coord;\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\n}",
                VERTEX_FORMAT_POS: f.POS,
                VERTEX_FORMAT_POS_UV: f.POS_UV,
                VERTEX_FORMAT_POS_UV_COLOR: f.POS_UV_COLOR
            };
            Object.freeze(f);
            n.exports = f
        }, {}],
        163: [function(f, n, m) {
            var a = f(170),
                h = f(172),
                b = f(168),
                e = f(161),
                d = f(171),
                k = f(160),
                c = f(162),
                g = f(159),
                q = f(175),
                l = f(169),
                p = f(176),
                A = f(164),
                y = f(174),
                x = f(173),
                w = f(165);
            n.exports = function(f) {
                function m() {
                    var a = H[G[0]],
                        b = null != G[1] ? H[G[1]] : null;
                    0 != F && (requestAnimationFrame(m), H[0].camera && (Z = 0, ja && ja(), L.width = L.width, P(H[c.SCENE_WORLD].camera), u.clearColor(O.r, O.g, O.b, O.a), u.clear(u.COLOR_BUFFER_BIT),
                        n(a), b && (P(b.camera), n(b)), ka && ka(Z), la++))
                }

                function n(a) {
                    function b(a) {
                        var b = null;
                        null !== a.fbo && (b = U[a.fbo]);
                        u.bindFramebuffer(u.FRAMEBUFFER, b);
                        e = b;
                        null !== a.lastFbo && (N.activeTexture(u.TEXTURE0), N.bindTexture(V[a.lastFbo]));
                        null == b ? u.blendFunc(u.ONE, u.ONE_MINUS_SRC_ALPHA) : u.blendFuncSeparate(u.SRC_ALPHA, u.ONE_MINUS_SRC_ALPHA, u.ONE, u.ONE_MINUS_SRC_ALPHA)
                    }

                    function c() {
                        var a = d.pop();
                        u.bindFramebuffer(u.FRAMEBUFFER, a)
                    }
                    for (var d = [], e = null, f = t(a), g = 0; g < f.length; g++) {
                        var h = f[g];
                        switch (h.type) {
                            case "setFBO":
                                b(h);
                                break;
                            case "spriteLayer":
                                B(h.layer, a.camera);
                                break;
                            case "postProcLayer":
                                E(h.layer);
                                break;
                            case "pushFBO":
                                d.push(e);
                                u.bindFramebuffer(u.FRAMEBUFFER, U[2]);
                                u.clearColor(0, 0, 0, 0);
                                u.clear(u.COLOR_BUFFER_BIT);
                                break;
                            case "popFBO":
                                c(h);
                                break;
                            default:
                                throw Error("No command " + h.type);
                        }
                    }
                }

                function t(a) {
                    var c = [];
                    c.push({
                        type: "setFBO",
                        fbo: null,
                        lastFbo: null
                    });
                    for (var d = 0; d < a.layers.length; d++) {
                        var f = a.layers[d];
                        f instanceof h ? c.push({
                            type: "spriteLayer",
                            layer: f
                        }) : f instanceof b ? (c.push({
                                type: "setFBO",
                                fbo: null,
                                lastFbo: null
                            }),
                            c.push({
                                type: "postProcLayer",
                                layer: f
                            })) : f instanceof e && c.push({
                            type: f.type
                        })
                    }
                    a = -1;
                    for (d = c.length - 1; 0 <= d; d--) "setFBO" == c[d].type && (-1 == a ? (c[d].fbo = null, a = 0) : (c[d].fbo = a, a = 1 - a));
                    a = null;
                    for (d = 0; d < c.length; d++) "setFBO" == c[d].type && (c[d].lastFbo = a, a = c[d].fbo);
                    return c
                }

                function B(a, b) {
                    for (var c = a.offset.hasChanged(), d = {}, e = [], f = 0; f < a.sprites.length; f++) {
                        var g = a.sprites[f];
                        if (g.visible) {
                            g.update(c);
                            if (b) {
                                if (g.aabb[2] < -b.pos.x || g.aabb[0] > -b.pos.x + b.viewportSize.x) continue;
                                if (g.aabb[3] < -b.pos.y || g.aabb[1] >
                                    -b.pos.y + b.viewportSize.y) continue
                            } else {
                                if (0 > g.aabb[2] || g.aabb[0] > R) continue;
                                if (0 > g.aabb[3] || g.aabb[1] > S) continue
                            }
                            var h = g.getBatchKey();
                            d[h] || (d[h] = [], e.push(h));
                            d[h].push(g)
                        }
                    }
                    if (0 != e.length)
                        for (f = 0; f < e.length; f++)
                            if (b = d[e[f]], 64 >= b.length) I(b, 0, b.length, a.vertexFormat);
                            else
                                for (c = 0; c < b.length;) g = Math.min(b.length - c, 64), I(b, c, g, a.vertexFormat), c += g
                }

                function E(a) {
                    var b = a.material,
                        c = b._shader,
                        d = 1;
                    N.useProgram(c._program);
                    c.syncUniforms(b._uniforms);
                    u.bindBuffer(u.ARRAY_BUFFER, aa);
                    c.setAttribute("a_Pos",
                        3, 0, 0);
                    u.bindBuffer(u.ARRAY_BUFFER, ba);
                    c.setAttribute("a_Coord", 2, 0, 0);
                    u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, ca);
                    a.usePushedFbo && (N.activeTexture(u.TEXTURE1), N.bindTexture(V[2]), d++);
                    for (b = d; 4 > b; b++) a.textures[b] && (N.activeTexture(u.TEXTURE0 + b), a.textures[b].set());
                    u.drawElements(u.TRIANGLES, 6, u.UNSIGNED_SHORT, 0);
                    Z++
                }

                function I(a, b, c, d) {
                    for (var e = b + c, f = 0, g = a[b]; b < e; b++)
                        for (var h = a[b], k = 0; 4 > k; k++)
                            for (var l = Y, m = k, n = h, q = 0; q < d.length; q++) switch (d[q].name) {
                                case "a_Pos":
                                    var p = 3 * m;
                                    l[f++] = n._mesh[p + 0];
                                    l[f++] =
                                        n._mesh[p + 1];
                                    break;
                                case "a_Coord":
                                    p = 2 * m;
                                    l[f++] = n._uv[p + 0];
                                    l[f++] = n._uv[p + 1];
                                    break;
                                case "a_Color":
                                    l[f++] = n.color[0];
                                    l[f++] = n.color[1];
                                    l[f++] = n.color[2];
                                    l[f++] = n.color[3];
                                    break;
                                default:
                                    throw Error("Unknown attribute");
                            }
                    a = fa;
                    g.material && g.material._shader && (a = g.material._shader);
                    N.useProgram(a._program);
                    for (k = 0; 4 > k; k++) b = h._texLayers[k], null != b ? (N.activeTexture(u.TEXTURE0 + k), b.tex.set()) : (N.activeTexture(u.TEXTURE0 + k), N.bindTexture(null));
                    u.bindBuffer(u.ARRAY_BUFFER, ha);
                    u.bufferSubData(u.ARRAY_BUFFER,
                        0, Y);
                    k = 4 * K(d);
                    for (b = e = 0; b < d.length; b++) l = d[b], a.setAttribute(l.name, l.size, k, e), e += 4 * l.size;
                    u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, ia);
                    a.setUniform("u_MVPMatrix", "mat4", J);
                    a._setBasicUniformsOnFrame = la;
                    g.material && a.syncUniforms(h.material._uniforms);
                    u.drawElements(u.TRIANGLES, 6 * c, u.UNSIGNED_SHORT, 0);
                    Z++
                }

                function K(a) {
                    for (var b = 0, c = 0; c < a.length; c++) b += a[c].size;
                    return b
                }

                function P(a) {
                    null == a ? (J[0] = 2 / R, J[5] = -2 / S, J[12] = -1, J[13] = 1) : (J[0] = 2 / a.viewportSize.x, J[5] = -2 / a.viewportSize.y, J[12] = -1 + a.pos.x / a.viewportSize.x *
                        2, J[13] = 1 - a.pos.y / a.viewportSize.y * 2)
                }

                function Q() {
                    U = [];
                    V = [];
                    aa = aa || u.createBuffer();
                    ba = ba || u.createBuffer();
                    ca = ca || u.createBuffer();
                    u.bindBuffer(u.ARRAY_BUFFER, aa);
                    u.bufferData(u.ARRAY_BUFFER, new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]), u.STATIC_DRAW);
                    u.bindBuffer(u.ARRAY_BUFFER, ba);
                    u.bufferData(u.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), u.STATIC_DRAW);
                    u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, ca);
                    u.bufferData(u.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 2, 3]), u.STATIC_DRAW);
                    for (var a = 0; 3 >
                        a; a++) {
                        var b = u.createFramebuffer();
                        U.push(b);
                        var c = u.createTexture();
                        N.bindTexture(c);
                        V.push(c);
                        u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
                        u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE);
                        u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST);
                        u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST);
                        u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, R, S, 0, u.RGBA, u.UNSIGNED_BYTE, null);
                        u.bindFramebuffer(u.FRAMEBUFFER, b);
                        u.framebufferTexture2D(u.FRAMEBUFFER, u.COLOR_ATTACHMENT0,
                            u.TEXTURE_2D, c, 0)
                    }
                }
                var M = this,
                    F = 0,
                    L = f,
                    H = [],
                    G = [0, 1],
                    J = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                    u, N, W = null,
                    X = null,
                    fa = null,
                    la = 0,
                    O = {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    },
                    ha = null,
                    ia = null,
                    Y = null,
                    T = null,
                    ma = 0,
                    da = 0,
                    ea = 0,
                    Z = 0,
                    ja = null,
                    ka = null,
                    R = f.width,
                    S = f.height,
                    U = null,
                    V = null,
                    aa = null,
                    ba = null,
                    ca = null;
                this.nullTexture = null;
                this.start = function() {
                    1 != F && (F = 1, requestAnimationFrame(m))
                };
                this.stop = function() {
                    F = 0
                };
                this.loadShader = function(a, b) {
                    a = u.createShader(a == c.PIXELSHADER ? u.FRAGMENT_SHADER : u.VERTEX_SHADER);
                    u.shaderSource(a,
                        b);
                    u.compileShader(a);
                    if (!u.getShaderParameter(a, u.COMPILE_STATUS)) throw Error(u.getShaderInfoLog(a));
                    return a
                };
                this.loadShaderFromTag = function(a, b) {
                    return this.loadShader(a, document.getElementById(b).textContent)
                };
                this.loadTextureFromUrl = function(a, b) {
                    a = this.loadBaseTextureFromUrl(a);
                    return this.loadTextureFromBase(a, b)
                };
                this.loadTextureFromImage = function(a, b) {
                    a = this.loadBaseTextureFromImage(a);
                    return this.loadTextureFromBase(a, b)
                };
                this.loadTextureFromBase = function(a, b) {
                    b = new q(a, b);
                    b.id = a.id;
                    return b
                };
                this.loadBaseTextureFromUrl = function(a) {
                    var b = new g(u, N);
                    b.id = da++;
                    b.loadFromUrl(a + this.getUrlQuery());
                    return b
                };
                this.loadBaseTextureFromImage = function(a) {
                    var b = new g(u, N);
                    b.id = da++;
                    b.loadFromImage(a);
                    return b
                };
                this.createDataTexture = function(a, b, c) {
                    a = new A(u, N, a, b, c | 0);
                    a.id = da++;
                    return a
                };
                this.createTextTexture = function() {
                    var a = new y(u, N);
                    a.id = da++;
                    return a
                };
                this.createScene = function() {
                    H[ea] = new l(ea, !1);
                    return ea++
                };
                this.createLayer = function(a, b) {
                    var d = H[a | 0];
                    if (!d) throw Error("Unknown scene " +
                        a);
                    b || (b = c.VERTEX_FORMAT_POS_UV);
                    a = new h(b);
                    d.layers.push(a);
                    return a
                };
                this.createPostProcLayer = function(a, c, d) {
                    var e = H[a | 0];
                    if (!e) throw Error("Unknown scene " + a);
                    a = new b(c, d || {});
                    e.layers.push(a);
                    return a
                };
                this.createCommandLayer = function(a, b) {
                    var c = H[b | 0];
                    if (!c) throw Error("Unknown scene " + b);
                    a = new e(a);
                    c.layers.push(a);
                    return a
                };
                this.createSprite = function(a, b) {
                    var c = new d;
                    b && (c.material = b);
                    c._layer = a;
                    a.sprites.push(c);
                    return c
                };
                this.createShader = function(b, c) {
                    var d = u.createProgram();
                    u.attachShader(d,
                        b || W);
                    u.attachShader(d, c || X);
                    u.linkProgram(d);
                    if (!u.getProgramParameter(d, u.LINK_STATUS)) throw Error(u.getProgramInfoLog(d));
                    b = new a(u);
                    b._program = d;
                    return b
                };
                this.createMaterial = function(a, b) {
                    a = new a(b);
                    a.id = ma++;
                    return a
                };
                this.createCamera = function() {
                    return new k(R, S)
                };
                this.setClearColor = function(a, b, c, d) {
                    O.r = a;
                    O.g = b;
                    O.b = c;
                    O.a = d;
                    u.clearColor(O.r, O.g, O.b, O.a)
                };
                this.setCamera = function(a, b) {
                    H[b].camera = a
                };
                this.setOnBeforeRender = function(a) {
                    ja = a
                };
                this.setOnAfterRender = function(a) {
                    ka = a
                };
                this.resize =
                    function() {
                        R = Math.max(256, f.width);
                        S = Math.max(256, f.height);
                        u.viewport(0, 0, R, S);
                        H[0].camera && (H[0].camera.viewportSize.x = 2 * R, H[0].camera.viewportSize.y = 2 * S);
                        for (var a = 0; a < V.length; a++) u.deleteTexture(V[a]);
                        for (a = 0; a < U.length; a++) u.deleteFramebuffer(U[a]);
                        Q()
                    };
                this.getWidth = function() {
                    return R
                };
                this.getHeight = function() {
                    return S
                };
                this.setDefaultScene = function(a, b) {
                    G[0] = a;
                    G[1] = b || null
                };
                this.renderSeparateScene = function(a, b, c, d) {
                    if (R < c || S < d) throw Error("Cannot render separate scene");
                    u.clearColor(O.r,
                        O.g, O.b, O.a);
                    u.clear(u.COLOR_BUFFER_BIT);
                    P(H[a].camera);
                    n(H[a]);
                    a = b.getContext("2d");
                    a.clearRect(0, 0, b.width, b.height);
                    a.drawImage(L, 0, 0, c, d, 0, 0, c, d);
                    u.clear(u.COLOR_BUFFER_BIT)
                };
                this.onContextLoss = function(a) {
                    f.addEventListener("webglcontextlost", function(b) {
                        b.preventDefault();
                        a()
                    }, !1)
                };
                this.setUrlVersionHash = function(a) {
                    this.urlVersionHash = a
                };
                this.getUrlQuery = function() {
                    return this.urlVersionHash ? "?v=" + this.urlVersionHash : ""
                };
                (function() {
                    (u = f.getContext("webgl")) || (u = f.getContext("experimental-webgl"));
                    if (!u) throw Error("NO_WEBGL");
                    N = new w(u);
                    Q();
                    H[c.SCENE_WORLD] = new l(c.SCENE_WORLD, !0);
                    H[c.SCENE_HUD] = new l(c.SCENE_HUD, !1);
                    ea = c.SCENE_HUD + 1;
                    W = M.loadShader(c.PIXELSHADER, c.DEFAULT_PIXEL_SHADER_STR);
                    X = M.loadShader(c.VERTEXSHADER, c.DEFAULT_VERTEX_SHADER_STR);
                    fa = M.createShader(W, X);
                    Object.freeze(W);
                    Object.freeze(X);
                    u.getExtension("OES_texture_float");
                    u.enable(u.BLEND);
                    u.blendEquation(u.FUNC_ADD);
                    u.blendFunc(u.SRC_ALPHA, u.ONE_MINUS_SRC_ALPHA);
                    x.init(u);
                    ha = u.createBuffer();
                    ia = u.createBuffer();
                    var a = Float32Array,
                        b = 0;
                    for (d in p) b = Math.max(b, K(p[d]));
                    Y = new a(256 * b);
                    T = new Uint16Array(384);
                    for (a = 0; 64 > a; a++) {
                        b = 6 * a;
                        var d = 4 * a;
                        T[0 + b] = d + 0;
                        T[1 + b] = d + 1;
                        T[2 + b] = d + 2;
                        T[3 + b] = d + 1;
                        T[4 + b] = d + 2;
                        T[5 + b] = d + 3
                    }
                    M.nullTexture = M.createDataTexture(1, 1, 0);
                    M.nullTexture.setPixel(0, 0, 0, 0, 0, 0);
                    u.bindBuffer(u.ARRAY_BUFFER, ha);
                    u.bufferData(u.ARRAY_BUFFER, Y.byteLength, u.DYNAMIC_DRAW);
                    u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, ia);
                    u.bufferData(u.ELEMENT_ARRAY_BUFFER, T, u.STATIC_DRAW)
                })()
            }
        }, {}],
        164: [function(f, n, m) {
            n.exports = function(a, f, b, e, d) {
                this._width =
                    b;
                this._height = e;
                this._glTex = a.createTexture();
                this._buffer = 0 == d ? new Uint8Array(b * e * 4) : new Float32Array(b * e * 4);
                this.set = function() {
                    f.bindTexture(this._glTex)
                };
                this.update = function() {
                    f.bindTexture(this._glTex);
                    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, e, 0, a.RGBA, 0 == d ? a.UNSIGNED_BYTE : a.FLOAT, this._buffer);
                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST)
                };
                this.setValue = function(a, b) {
                    this._buffer[a] = b
                };
                this.setPixel = function(a, c, d, e,
                    f, h) {
                    a = 4 * (c * b + a);
                    this._buffer[a] = d;
                    this._buffer[a + 1] = e;
                    this._buffer[a + 2] = f;
                    this._buffer[a + 3] = h
                };
                this.getWidth = function() {
                    return this._width
                };
                this.getHeight = function() {
                    return this._height
                };
                this.setFilter = function(a) {
                    throw Error("not supported for data textures");
                };
                this.onLoad = function(a) {
                    a()
                };
                this.isLoaded = function() {
                    return !0
                };
                this.update()
            }
        }, {}],
        165: [function(f, n, m) {
            n.exports = function(a) {
                this._activeTexture = 0;
                this._bindTexture = [-1, -1, -1, -1];
                this._useProgram = -1;
                this.activeTexture = function(f) {
                    this._activeTexture !=
                        f && (a.activeTexture(f), this._activeTexture = f)
                };
                this.bindTexture = function(f) {
                    this._bindTexture[this._activeTexture] != f && (a.bindTexture(a.TEXTURE_2D, f), this._bindTexture[this._activeTexture] = f)
                };
                this.useProgram = function(f) {
                    this._useProgram != f && (a.useProgram(f), this._useProgram = f)
                }
            }
        }, {}],
        166: [function(f, n, m) {
            m = f(162);
            var a = f(163);
            f = {
                Material: f(167),
                createContext: function(b) {
                    return new a(b)
                }
            };
            for (var h in m) f[h] = m[h];
            n.exports = f
        }, {}],
        167: [function(f, n, m) {
            function a() {}
            a.prototype.id = 0;
            a.prototype._shader =
                null;
            a.prototype._uniforms = null;
            a.prototype.init = function(a) {
                this._shader = a
            };
            n.exports = a
        }, {}],
        168: [function(f, n, m) {
            f(157);
            n.exports = function(a, f) {
                this.material = a;
                this.textures = [null, null, null, null];
                this.usePushedFbo = f.usePushedFbo || !1
            }
        }, {}],
        169: [function(f, n, m) {
            n.exports = function(a) {
                this.id = a;
                this.camera = null;
                this.layers = []
            }
        }, {}],
        170: [function(f, n, m) {
            n.exports = function(a) {
                this._program = null;
                this._locationsUniform = {};
                this._locationsAttribute = {};
                this._uniformCache = {};
                this._setBasicUniformsOnFrame = -1;
                this.setAttribute = function(f, b, e, d) {
                    var h = this._locationsAttribute[f];
                    "undefined" === typeof h && (h = this._locationsAttribute[f] = a.getAttribLocation(this._program, f), a.enableVertexAttribArray(h));
                    if (-1 != h) a.vertexAttribPointer(h, b, a.FLOAT, !1, e, d);
                    else throw Error("Unknown attribute location " + f);
                };
                this.setUniform = function(f, b, e) {
                    var d = this._locationsUniform[f];
                    d || (d = this._locationsUniform[f] = a.getUniformLocation(this._program, f));
                    if (-1 != d && null != d) switch (b) {
                        case "b":
                        case "bool":
                            a.uniform1i(d, e ? 1 : 0);
                            break;
                        case "i":
                        case "1i":
                            a.uniform1i(d, e);
                            break;
                        case "f":
                        case "1f":
                            a.uniform1f(d, e);
                            break;
                        case "2f":
                            a.uniform2f(d, e[0], e[1]);
                            break;
                        case "3f":
                            a.uniform3f(d, e[0], e[1], e[2]);
                            break;
                        case "4f":
                            a.uniform4f(d, e[0], e[1], e[2], e[3]);
                            break;
                        case "1fv":
                            a.uniform1fv(d, e);
                            break;
                        case "2fv":
                            a.uniform2fv(d, e);
                            break;
                        case "3fv":
                            a.uniform3fv(d, e);
                            break;
                        case "4fv":
                            a.uniform4fv(d, e);
                            break;
                        case "mat2":
                            a.uniformMatrix2fv(d, a.FALSE, e);
                            break;
                        case "mat3":
                            a.uniformMatrix3fv(d, a.FALSE, e);
                            break;
                        case "mat4":
                            a.uniformMatrix4fv(d, a.FALSE,
                                e);
                            break;
                        case "samplerIndex":
                            a.uniform1i(d, e);
                            break;
                        default:
                            throw Error("Unknown uniform type: " + b);
                    }
                };
                this.syncUniforms = function(a) {
                    for (var b in a) this.setUniform(b, a[b].type, a[b].value)
                }
            }
        }, {}],
        171: [function(f, n, m) {
            var a = f(157);
            n.exports = function() {
                function f(a, e, d, f, c, g, h) {
                    a[0] = e;
                    a[1] = d;
                    a[2] = e + f * g;
                    a[3] = d;
                    a[4] = e;
                    a[5] = d + c * h;
                    a[6] = e + f * g;
                    a[7] = d + c * h
                }
                this.pos = new a.Vec2;
                this.size = new a.Vec2;
                this.scale = new a.Vec2(1, 1);
                this.anchor = new a.Vec2(0, 0);
                this.angle = 0;
                this.material = null;
                this.color = [0, 0, 0, 0];
                this.visible = !0;
                this.aabb = [0, 0, 0, 0];
                this._dirtyMeshBuffer = this._dirtyUV = !1;
                this._lastAngle = 0;
                this._layer = null;
                this._texLayers = [null, null, null, null];
                this._uv = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
                this._mesh = new Float32Array(12);
                this._glBufferMesh = null;
                this.remove = function() {
                    var a = this._layer.sprites.indexOf(this);
                    this._layer.sprites.splice(a, 1)
                };
                this.update = function(a) {
                    var b = this.scale.hasChanged();
                    if (a || this.pos.hasChanged() || this.size.hasChanged() || b || this.anchor.hasChanged() || this._lastAngle != this.angle) this.updateTransformation(),
                        this._lastAngle = this.angle;
                    if (this._dirtyUV || b) this._texLayers[0] ? this.updateUV(this._texLayers[0]) : this.updateUVToDefault(), this._dirtyUV = !1
                };
                this.updateTransformation = function() {
                    var a = this.anchor.x * this.size.x,
                        e = this.anchor.y * this.size.y,
                        d = Math.sin(this.angle),
                        f = Math.cos(this.angle),
                        c = -a,
                        g = -e,
                        h = -a + this.size.x,
                        l = -e,
                        m = -a,
                        n = -e + this.size.y;
                    a = -a + this.size.x;
                    e = -e + this.size.y;
                    var y = this.pos.x + this._layer.offset.x,
                        x = this.pos.y + this._layer.offset.y;
                    this._mesh[0] = y + (c * f - g * d);
                    this._mesh[1] = x + (c * d + g * f);
                    this._mesh[3] =
                        y + (h * f - l * d);
                    this._mesh[4] = x + (h * d + l * f);
                    this._mesh[6] = y + (m * f - n * d);
                    this._mesh[7] = x + (m * d + n * f);
                    this._mesh[9] = y + (a * f - e * d);
                    this._mesh[10] = x + (a * d + e * f);
                    this._dirtyMeshBuffer = !0;
                    this.updateAABB()
                };
                this.getBatchKey = function() {
                    var a = 0;
                    this._texLayers[0] && (a += this._texLayers[0].tex.id);
                    this._texLayers[1] && (a += 1E3 * this._texLayers[1].tex.id);
                    this._texLayers[2] && (a += 1E6 * this._texLayers[2].tex.id);
                    this._texLayers[3] && (a += 1E9 * this._texLayers[3].tex.id);
                    this.material && (a += 1E12 * this.material.id);
                    return a
                };
                this.getTexture =
                    function(a) {
                        a |= 0;
                        return null == this._texLayers[a] ? null : this._texLayers[a].tex
                    };
                this.setTexture = function(a, e) {
                    e |= 0;
                    null == a ? this._texLayers[e] = null : this._texLayers[e] ? this._texLayers[e].tex = a : this._texLayers[e] = {
                        tex: a
                    };
                    this._dirtyUV = !0
                };
                this.updateUV = function(a) {
                    a.tex && a.tex.isLoaded() && (a = a.tex.rect, null == a ? this.updateUVToDefault() : f(this._uv, a.x, a.y, a.w, a.h, this.scale.x, this.scale.y))
                };
                this.updateUVToDefault = function() {
                    f(this._uv, 0, 0, 1, 1, this.scale.x, this.scale.y)
                };
                this.updateAABB = function() {
                    for (var a =
                            this._mesh[0], e = this._mesh[1], d = this._mesh[0], f = this._mesh[1], c = 3, g = 1; 4 > g; g++) {
                        var h = this._mesh[c],
                            l = this._mesh[c + 1];
                        a = Math.min(a, h);
                        e = Math.min(e, l);
                        d = Math.max(d, h);
                        f = Math.max(f, l);
                        c += 3
                    }
                    this.aabb[0] = a;
                    this.aabb[1] = e;
                    this.aabb[2] = d;
                    this.aabb[3] = f
                }
            }
        }, {}],
        172: [function(f, n, m) {
            var a = f(157);
            n.exports = function(f) {
                this.sprites = [];
                this.vertexFormat = f;
                this.offset = new a.Vec2
            }
        }, {}],
        173: [function(f, n, m) {
            f = new function() {
                var a = null,
                    f = null;
                this.init = function(b) {
                    a = document.createElement("canvas");
                    a.width = 2048;
                    a.height =
                        128;
                    f = a.getContext("2d");
                    f.textBaseline = "top"
                };
                this.renderText = function(b, e, d, h, c, g) {
                    g |= 1;
                    f.clearRect(0, 0, 2048, 128);
                    f.font != d && (f.font = d);
                    d = parseInt(f.font);
                    c && (f.fillStyle = c, f.fillText(b, 2 - g, 0 - g), f.fillText(b, 2 - g, 0 + g), f.fillText(b, 2 + g, 0 - g), f.fillText(b, 2 + g, 0 + g));
                    h && (f.fillStyle = h, f.fillText(b, 2, 0));
                    b = f.measureText(b);
                    b = {
                        width: b.width + 7
                    };
                    h = Math.max(1 << Math.ceil(Math.log(b.width) / Math.log(2)), 1 << Math.ceil(Math.log(d) / Math.log(2)));
                    e ? e.width < h && (e.width = h, e.height = h) : (e = document.createElement("canvas"),
                        e.width = h, e.height = h);
                    c = e.getContext("2d");
                    c.clearRect(0, 0, h, h);
                    c.drawImage(a, 0, 0);
                    return {
                        canvas: e,
                        size: b
                    }
                }
            };
            n.exports = f
        }, {}],
        174: [function(f, n, m) {
            var a = f(173);
            n.exports = function(f, b) {
                this._textWidth = this._size = 0;
                this._glTex = f.createTexture();
                this._canvas = null;
                this._inited = !1;
                this.set = function() {
                    b.bindTexture(this._glTex)
                };
                this.setText = function(b, d, h, c, g) {
                    b = a.renderText(b, this._canvas, d, h, c, g);
                    this._textWidth = b.size.width;
                    this._canvas = b.canvas;
                    this._size = this._canvas.width;
                    this.set();
                    f.texImage2D(f.TEXTURE_2D,
                        0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, this._canvas);
                    this._inited || (f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), this._inited = !0)
                };
                this.update = function() {};
                this.getWidth = function() {
                    return this._size
                };
                this.getHeight = function() {
                    return this._size
                };
                this.getTextWidth = function() {
                    return this._textWidth
                };
                this.getSize = function() {
                    return this._size
                };
                this.setFilter = function(a) {
                    throw Error("not supported for text textures");
                };
                this.onLoad = function(a) {
                    a()
                };
                this.isLoaded = function() {
                    return !0
                };
                this.update()
            }
        }, {}],
        175: [function(f, n, m) {
            var a = f(157),
                h = f(162);
            n.exports = function(b, e) {
                var d = this;
                this.base = b;
                this.rect = e || null;
                this._wrapV = this._wrapU = this.base._gl.CLAMP_TO_EDGE;
                this._dirtyWrapModes = !0;
                this.set = function() {
                    var a = this.base._gl,
                        b = this.base._glState;
                    this.base._glTex && (b.bindTexture(this.base._glTex), this._dirtyWrapModes && (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, this._wrapU), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, this._wrapV), this._dirtyWrapModes = !1))
                };
                this.update = function() {
                    this.base.update()
                };
                this.setWrapMode = function(a, b) {
                    function c(a) {
                        switch (a) {
                            case h.TEX_REPEAT:
                                return e.REPEAT;
                            case h.TEX_MIRRORED:
                                return e.MIRRORED_REPEAT
                        }
                        return e.CLAMP_TO_EDGE
                    }
                    var e = d.base._gl;
                    this._wrapU = c(a);
                    this._wrapV = c(b);
                    this._dirtyWrapModes = !0
                };
                this.onLoad = function(a) {
                    this.base.onLoad(a)
                };
                this.onError = function(a) {
                    this.base.onError(a)
                };
                this.isLoaded = function() {
                    return this.base.isLoaded()
                };
                this.toCanvas = function() {
                    return this.rect ? this.base.toCanvas(e) : this.base.toCanvas(new a.Rect(0,
                        0, this.base.width, this.base.height))
                };
                this.draw = function(a, b, d, f, h, m, n) {
                    m = m || 1;
                    n = n || 1;
                    var c = this.base.getObject();
                    if (this.base.isLoaded())
                        if (this.rect) {
                            var g = this.base.width,
                                k = this.base.height;
                            f = (f || e.w * g) * m;
                            h = (h || e.h * k) * n;
                            a.drawImage(c, e.x * g, e.y * k, e.w * g, e.h * k, b, d, f, h)
                        } else f = f || c.width, h = h || c.height, a.drawImage(c, b, d, f * m, h * n)
                };
                this.getWidth = function() {
                    return this.base.isLoaded() ? e ? e.w * this.base.width : this.base.width : 0
                };
                this.getHeight = function() {
                    return this.base.isLoaded() ? e ? e.h * this.base.height :
                        this.base.height : 0
                }
            }
        }, {}],
        176: [function(f, n, m) {
            f = {
                name: "a_Pos",
                size: 2
            };
            m = {
                name: "a_Coord",
                size: 2
            };
            n.exports = {
                POS: [f],
                POS_UV: [f, m],
                POS_UV_COLOR: [f, m, {
                    name: "a_Color",
                    size: 4
                }]
            }
        }, {}]
    }, {}, [56])
})();