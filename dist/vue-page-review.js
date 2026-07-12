import { ref as St, computed as Ht, onMounted as $e, onUnmounted as ge, nextTick as We, watch as Ze, resolveComponent as xt, openBlock as ft, createBlock as Lt, Teleport as Ve, createElementBlock as kt, createElementVNode as mt, withModifiers as He, normalizeStyle as Gt, normalizeClass as Ge, createVNode as st, withCtx as it, createTextVNode as pt, createCommentVNode as zt, unref as $t, toDisplayString as wt, Fragment as qt, renderList as Jt } from "vue";
import { ElMessageBox as ve } from "element-plus";
var Qt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xe(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function te(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Re = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(r, o) {
  (function(n) {
    r.exports = n();
  })(function() {
    return function n(f, u, e) {
      function s(_, x) {
        if (!u[_]) {
          if (!f[_]) {
            var y = typeof te == "function" && te;
            if (!x && y) return y(_, !0);
            if (i) return i(_, !0);
            var k = new Error("Cannot find module '" + _ + "'");
            throw k.code = "MODULE_NOT_FOUND", k;
          }
          var h = u[_] = { exports: {} };
          f[_][0].call(h.exports, function(w) {
            var l = f[_][1][w];
            return s(l || w);
          }, h, h.exports, n, f, u, e);
        }
        return u[_].exports;
      }
      for (var i = typeof te == "function" && te, c = 0; c < e.length; c++) s(e[c]);
      return s;
    }({ 1: [function(n, f, u) {
      var e = n("./utils"), s = n("./support"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      u.encode = function(c) {
        for (var _, x, y, k, h, w, l, m = [], d = 0, g = c.length, S = g, C = e.getTypeOf(c) !== "string"; d < c.length; ) S = g - d, y = C ? (_ = c[d++], x = d < g ? c[d++] : 0, d < g ? c[d++] : 0) : (_ = c.charCodeAt(d++), x = d < g ? c.charCodeAt(d++) : 0, d < g ? c.charCodeAt(d++) : 0), k = _ >> 2, h = (3 & _) << 4 | x >> 4, w = 1 < S ? (15 & x) << 2 | y >> 6 : 64, l = 2 < S ? 63 & y : 64, m.push(i.charAt(k) + i.charAt(h) + i.charAt(w) + i.charAt(l));
        return m.join("");
      }, u.decode = function(c) {
        var _, x, y, k, h, w, l = 0, m = 0, d = "data:";
        if (c.substr(0, d.length) === d) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, S = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (c.charAt(c.length - 1) === i.charAt(64) && S--, c.charAt(c.length - 2) === i.charAt(64) && S--, S % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = s.uint8array ? new Uint8Array(0 | S) : new Array(0 | S); l < c.length; ) _ = i.indexOf(c.charAt(l++)) << 2 | (k = i.indexOf(c.charAt(l++))) >> 4, x = (15 & k) << 4 | (h = i.indexOf(c.charAt(l++))) >> 2, y = (3 & h) << 6 | (w = i.indexOf(c.charAt(l++))), g[m++] = _, h !== 64 && (g[m++] = x), w !== 64 && (g[m++] = y);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(n, f, u) {
      var e = n("./external"), s = n("./stream/DataWorker"), i = n("./stream/Crc32Probe"), c = n("./stream/DataLengthProbe");
      function _(x, y, k, h, w) {
        this.compressedSize = x, this.uncompressedSize = y, this.crc32 = k, this.compression = h, this.compressedContent = w;
      }
      _.prototype = { getContentWorker: function() {
        var x = new s(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), y = this;
        return x.on("end", function() {
          if (this.streamInfo.data_length !== y.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), x;
      }, getCompressedWorker: function() {
        return new s(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(x, y, k) {
        return x.pipe(new i()).pipe(new c("uncompressedSize")).pipe(y.compressWorker(k)).pipe(new c("compressedSize")).withStreamInfo("compression", y);
      }, f.exports = _;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(n, f, u) {
      var e = n("./stream/GenericWorker");
      u.STORE = { magic: "\0\0", compressWorker: function() {
        return new e("STORE compression");
      }, uncompressWorker: function() {
        return new e("STORE decompression");
      } }, u.DEFLATE = n("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(n, f, u) {
      var e = n("./utils"), s = function() {
        for (var i, c = [], _ = 0; _ < 256; _++) {
          i = _;
          for (var x = 0; x < 8; x++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
          c[_] = i;
        }
        return c;
      }();
      f.exports = function(i, c) {
        return i !== void 0 && i.length ? e.getTypeOf(i) !== "string" ? function(_, x, y, k) {
          var h = s, w = k + y;
          _ ^= -1;
          for (var l = k; l < w; l++) _ = _ >>> 8 ^ h[255 & (_ ^ x[l])];
          return -1 ^ _;
        }(0 | c, i, i.length, 0) : function(_, x, y, k) {
          var h = s, w = k + y;
          _ ^= -1;
          for (var l = k; l < w; l++) _ = _ >>> 8 ^ h[255 & (_ ^ x.charCodeAt(l))];
          return -1 ^ _;
        }(0 | c, i, i.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(n, f, u) {
      u.base64 = !1, u.binary = !1, u.dir = !1, u.createFolders = !0, u.date = null, u.compression = null, u.compressionOptions = null, u.comment = null, u.unixPermissions = null, u.dosPermissions = null;
    }, {}], 6: [function(n, f, u) {
      var e = null;
      e = typeof Promise < "u" ? Promise : n("lie"), f.exports = { Promise: e };
    }, { lie: 37 }], 7: [function(n, f, u) {
      var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = n("pako"), i = n("./utils"), c = n("./stream/GenericWorker"), _ = e ? "uint8array" : "array";
      function x(y, k) {
        c.call(this, "FlateWorker/" + y), this._pako = null, this._pakoAction = y, this._pakoOptions = k, this.meta = {};
      }
      u.magic = "\b\0", i.inherits(x, c), x.prototype.processChunk = function(y) {
        this.meta = y.meta, this._pako === null && this._createPako(), this._pako.push(i.transformTo(_, y.data), !1);
      }, x.prototype.flush = function() {
        c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, x.prototype.cleanUp = function() {
        c.prototype.cleanUp.call(this), this._pako = null;
      }, x.prototype._createPako = function() {
        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var y = this;
        this._pako.onData = function(k) {
          y.push({ data: k, meta: y.meta });
        };
      }, u.compressWorker = function(y) {
        return new x("Deflate", y);
      }, u.uncompressWorker = function() {
        return new x("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(n, f, u) {
      function e(h, w) {
        var l, m = "";
        for (l = 0; l < w; l++) m += String.fromCharCode(255 & h), h >>>= 8;
        return m;
      }
      function s(h, w, l, m, d, g) {
        var S, C, R = h.file, L = h.compression, P = g !== _.utf8encode, U = i.transformTo("string", g(R.name)), A = i.transformTo("string", _.utf8encode(R.name)), Z = R.comment, tt = i.transformTo("string", g(Z)), b = i.transformTo("string", _.utf8encode(Z)), D = A.length !== R.name.length, a = b.length !== Z.length, N = "", H = "", $ = "", at = R.dir, V = R.date, nt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        w && !l || (nt.crc32 = h.crc32, nt.compressedSize = h.compressedSize, nt.uncompressedSize = h.uncompressedSize);
        var I = 0;
        w && (I |= 8), P || !D && !a || (I |= 2048);
        var T = 0, rt = 0;
        at && (T |= 16), d === "UNIX" ? (rt = 798, T |= function(Y, gt) {
          var bt = Y;
          return Y || (bt = gt ? 16893 : 33204), (65535 & bt) << 16;
        }(R.unixPermissions, at)) : (rt = 20, T |= function(Y) {
          return 63 & (Y || 0);
        }(R.dosPermissions)), S = V.getUTCHours(), S <<= 6, S |= V.getUTCMinutes(), S <<= 5, S |= V.getUTCSeconds() / 2, C = V.getUTCFullYear() - 1980, C <<= 4, C |= V.getUTCMonth() + 1, C <<= 5, C |= V.getUTCDate(), D && (H = e(1, 1) + e(x(U), 4) + A, N += "up" + e(H.length, 2) + H), a && ($ = e(1, 1) + e(x(tt), 4) + b, N += "uc" + e($.length, 2) + $);
        var q = "";
        return q += `
\0`, q += e(I, 2), q += L.magic, q += e(S, 2), q += e(C, 2), q += e(nt.crc32, 4), q += e(nt.compressedSize, 4), q += e(nt.uncompressedSize, 4), q += e(U.length, 2), q += e(N.length, 2), { fileRecord: y.LOCAL_FILE_HEADER + q + U + N, dirRecord: y.CENTRAL_FILE_HEADER + e(rt, 2) + q + e(tt.length, 2) + "\0\0\0\0" + e(T, 4) + e(m, 4) + U + N + tt };
      }
      var i = n("../utils"), c = n("../stream/GenericWorker"), _ = n("../utf8"), x = n("../crc32"), y = n("../signature");
      function k(h, w, l, m) {
        c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = l, this.encodeFileName = m, this.streamFiles = h, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      i.inherits(k, c), k.prototype.push = function(h) {
        var w = h.meta.percent || 0, l = this.entriesCount, m = this._sources.length;
        this.accumulate ? this.contentBuffer.push(h) : (this.bytesWritten += h.data.length, c.prototype.push.call(this, { data: h.data, meta: { currentFile: this.currentFile, percent: l ? (w + 100 * (l - m - 1)) / l : 100 } }));
      }, k.prototype.openedSource = function(h) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = h.file.name;
        var w = this.streamFiles && !h.file.dir;
        if (w) {
          var l = s(h, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: l.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, k.prototype.closedSource = function(h) {
        this.accumulate = !1;
        var w = this.streamFiles && !h.file.dir, l = s(h, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(l.dirRecord), w) this.push({ data: function(m) {
          return y.DATA_DESCRIPTOR + e(m.crc32, 4) + e(m.compressedSize, 4) + e(m.uncompressedSize, 4);
        }(h), meta: { percent: 100 } });
        else for (this.push({ data: l.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, k.prototype.flush = function() {
        for (var h = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({ data: this.dirRecords[w], meta: { percent: 100 } });
        var l = this.bytesWritten - h, m = function(d, g, S, C, R) {
          var L = i.transformTo("string", R(C));
          return y.CENTRAL_DIRECTORY_END + "\0\0\0\0" + e(d, 2) + e(d, 2) + e(g, 4) + e(S, 4) + e(L.length, 2) + L;
        }(this.dirRecords.length, l, h, this.zipComment, this.encodeFileName);
        this.push({ data: m, meta: { percent: 100 } });
      }, k.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, k.prototype.registerPrevious = function(h) {
        this._sources.push(h);
        var w = this;
        return h.on("data", function(l) {
          w.processChunk(l);
        }), h.on("end", function() {
          w.closedSource(w.previous.streamInfo), w._sources.length ? w.prepareNextSource() : w.end();
        }), h.on("error", function(l) {
          w.error(l);
        }), this;
      }, k.prototype.resume = function() {
        return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, k.prototype.error = function(h) {
        var w = this._sources;
        if (!c.prototype.error.call(this, h)) return !1;
        for (var l = 0; l < w.length; l++) try {
          w[l].error(h);
        } catch {
        }
        return !0;
      }, k.prototype.lock = function() {
        c.prototype.lock.call(this);
        for (var h = this._sources, w = 0; w < h.length; w++) h[w].lock();
      }, f.exports = k;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(n, f, u) {
      var e = n("../compressions"), s = n("./ZipFileWorker");
      u.generateWorker = function(i, c, _) {
        var x = new s(c.streamFiles, _, c.platform, c.encodeFileName), y = 0;
        try {
          i.forEach(function(k, h) {
            y++;
            var w = function(g, S) {
              var C = g || S, R = e[C];
              if (!R) throw new Error(C + " is not a valid compression method !");
              return R;
            }(h.options.compression, c.compression), l = h.options.compressionOptions || c.compressionOptions || {}, m = h.dir, d = h.date;
            h._compressWorker(w, l).withStreamInfo("file", { name: k, dir: m, date: d, comment: h.comment || "", unixPermissions: h.unixPermissions, dosPermissions: h.dosPermissions }).pipe(x);
          }), x.entriesCount = y;
        } catch (k) {
          x.error(k);
        }
        return x;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(n, f, u) {
      function e() {
        if (!(this instanceof e)) return new e();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var s = new e();
          for (var i in this) typeof this[i] != "function" && (s[i] = this[i]);
          return s;
        };
      }
      (e.prototype = n("./object")).loadAsync = n("./load"), e.support = n("./support"), e.defaults = n("./defaults"), e.version = "3.10.1", e.loadAsync = function(s, i) {
        return new e().loadAsync(s, i);
      }, e.external = n("./external"), f.exports = e;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(n, f, u) {
      var e = n("./utils"), s = n("./external"), i = n("./utf8"), c = n("./zipEntries"), _ = n("./stream/Crc32Probe"), x = n("./nodejsUtils");
      function y(k) {
        return new s.Promise(function(h, w) {
          var l = k.decompressed.getContentWorker().pipe(new _());
          l.on("error", function(m) {
            w(m);
          }).on("end", function() {
            l.streamInfo.crc32 !== k.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : h();
          }).resume();
        });
      }
      f.exports = function(k, h) {
        var w = this;
        return h = e.extend(h || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: i.utf8decode }), x.isNode && x.isStream(k) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : e.prepareContent("the loaded zip file", k, !0, h.optimizedBinaryString, h.base64).then(function(l) {
          var m = new c(h);
          return m.load(l), m;
        }).then(function(l) {
          var m = [s.Promise.resolve(l)], d = l.files;
          if (h.checkCRC32) for (var g = 0; g < d.length; g++) m.push(y(d[g]));
          return s.Promise.all(m);
        }).then(function(l) {
          for (var m = l.shift(), d = m.files, g = 0; g < d.length; g++) {
            var S = d[g], C = S.fileNameStr, R = e.resolve(S.fileNameStr);
            w.file(R, S.decompressed, { binary: !0, optimizedBinaryString: !0, date: S.date, dir: S.dir, comment: S.fileCommentStr.length ? S.fileCommentStr : null, unixPermissions: S.unixPermissions, dosPermissions: S.dosPermissions, createFolders: h.createFolders }), S.dir || (w.file(R).unsafeOriginalName = C);
          }
          return m.zipComment.length && (w.comment = m.zipComment), w;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(n, f, u) {
      var e = n("../utils"), s = n("../stream/GenericWorker");
      function i(c, _) {
        s.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(_);
      }
      e.inherits(i, s), i.prototype._bindStream = function(c) {
        var _ = this;
        (this._stream = c).pause(), c.on("data", function(x) {
          _.push({ data: x, meta: { percent: 0 } });
        }).on("error", function(x) {
          _.isPaused ? this.generatedError = x : _.error(x);
        }).on("end", function() {
          _.isPaused ? _._upstreamEnded = !0 : _.end();
        });
      }, i.prototype.pause = function() {
        return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, i.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, f.exports = i;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(n, f, u) {
      var e = n("readable-stream").Readable;
      function s(i, c, _) {
        e.call(this, c), this._helper = i;
        var x = this;
        i.on("data", function(y, k) {
          x.push(y) || x._helper.pause(), _ && _(k);
        }).on("error", function(y) {
          x.emit("error", y);
        }).on("end", function() {
          x.push(null);
        });
      }
      n("../utils").inherits(s, e), s.prototype._read = function() {
        this._helper.resume();
      }, f.exports = s;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(n, f, u) {
      f.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(e, s) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, s);
        if (typeof e == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(e, s);
      }, allocBuffer: function(e) {
        if (Buffer.alloc) return Buffer.alloc(e);
        var s = new Buffer(e);
        return s.fill(0), s;
      }, isBuffer: function(e) {
        return Buffer.isBuffer(e);
      }, isStream: function(e) {
        return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
      } };
    }, {}], 15: [function(n, f, u) {
      function e(R, L, P) {
        var U, A = i.getTypeOf(L), Z = i.extend(P || {}, x);
        Z.date = Z.date || /* @__PURE__ */ new Date(), Z.compression !== null && (Z.compression = Z.compression.toUpperCase()), typeof Z.unixPermissions == "string" && (Z.unixPermissions = parseInt(Z.unixPermissions, 8)), Z.unixPermissions && 16384 & Z.unixPermissions && (Z.dir = !0), Z.dosPermissions && 16 & Z.dosPermissions && (Z.dir = !0), Z.dir && (R = d(R)), Z.createFolders && (U = m(R)) && g.call(this, U, !0);
        var tt = A === "string" && Z.binary === !1 && Z.base64 === !1;
        P && P.binary !== void 0 || (Z.binary = !tt), (L instanceof y && L.uncompressedSize === 0 || Z.dir || !L || L.length === 0) && (Z.base64 = !1, Z.binary = !0, L = "", Z.compression = "STORE", A = "string");
        var b = null;
        b = L instanceof y || L instanceof c ? L : w.isNode && w.isStream(L) ? new l(R, L) : i.prepareContent(R, L, Z.binary, Z.optimizedBinaryString, Z.base64);
        var D = new k(R, b, Z);
        this.files[R] = D;
      }
      var s = n("./utf8"), i = n("./utils"), c = n("./stream/GenericWorker"), _ = n("./stream/StreamHelper"), x = n("./defaults"), y = n("./compressedObject"), k = n("./zipObject"), h = n("./generate"), w = n("./nodejsUtils"), l = n("./nodejs/NodejsStreamInputAdapter"), m = function(R) {
        R.slice(-1) === "/" && (R = R.substring(0, R.length - 1));
        var L = R.lastIndexOf("/");
        return 0 < L ? R.substring(0, L) : "";
      }, d = function(R) {
        return R.slice(-1) !== "/" && (R += "/"), R;
      }, g = function(R, L) {
        return L = L !== void 0 ? L : x.createFolders, R = d(R), this.files[R] || e.call(this, R, null, { dir: !0, createFolders: L }), this.files[R];
      };
      function S(R) {
        return Object.prototype.toString.call(R) === "[object RegExp]";
      }
      var C = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(R) {
        var L, P, U;
        for (L in this.files) U = this.files[L], (P = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && R(P, U);
      }, filter: function(R) {
        var L = [];
        return this.forEach(function(P, U) {
          R(P, U) && L.push(U);
        }), L;
      }, file: function(R, L, P) {
        if (arguments.length !== 1) return R = this.root + R, e.call(this, R, L, P), this;
        if (S(R)) {
          var U = R;
          return this.filter(function(Z, tt) {
            return !tt.dir && U.test(Z);
          });
        }
        var A = this.files[this.root + R];
        return A && !A.dir ? A : null;
      }, folder: function(R) {
        if (!R) return this;
        if (S(R)) return this.filter(function(A, Z) {
          return Z.dir && R.test(A);
        });
        var L = this.root + R, P = g.call(this, L), U = this.clone();
        return U.root = P.name, U;
      }, remove: function(R) {
        R = this.root + R;
        var L = this.files[R];
        if (L || (R.slice(-1) !== "/" && (R += "/"), L = this.files[R]), L && !L.dir) delete this.files[R];
        else for (var P = this.filter(function(A, Z) {
          return Z.name.slice(0, R.length) === R;
        }), U = 0; U < P.length; U++) delete this.files[P[U].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(R) {
        var L, P = {};
        try {
          if ((P = i.extend(R || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = P.type.toLowerCase(), P.compression = P.compression.toUpperCase(), P.type === "binarystring" && (P.type = "string"), !P.type) throw new Error("No output type specified.");
          i.checkSupport(P.type), P.platform !== "darwin" && P.platform !== "freebsd" && P.platform !== "linux" && P.platform !== "sunos" || (P.platform = "UNIX"), P.platform === "win32" && (P.platform = "DOS");
          var U = P.comment || this.comment || "";
          L = h.generateWorker(this, P, U);
        } catch (A) {
          (L = new c("error")).error(A);
        }
        return new _(L, P.type || "string", P.mimeType);
      }, generateAsync: function(R, L) {
        return this.generateInternalStream(R).accumulate(L);
      }, generateNodeStream: function(R, L) {
        return (R = R || {}).type || (R.type = "nodebuffer"), this.generateInternalStream(R).toNodejsStream(L);
      } };
      f.exports = C;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(n, f, u) {
      f.exports = n("stream");
    }, { stream: void 0 }], 17: [function(n, f, u) {
      var e = n("./DataReader");
      function s(i) {
        e.call(this, i);
        for (var c = 0; c < this.data.length; c++) i[c] = 255 & i[c];
      }
      n("../utils").inherits(s, e), s.prototype.byteAt = function(i) {
        return this.data[this.zero + i];
      }, s.prototype.lastIndexOfSignature = function(i) {
        for (var c = i.charCodeAt(0), _ = i.charCodeAt(1), x = i.charCodeAt(2), y = i.charCodeAt(3), k = this.length - 4; 0 <= k; --k) if (this.data[k] === c && this.data[k + 1] === _ && this.data[k + 2] === x && this.data[k + 3] === y) return k - this.zero;
        return -1;
      }, s.prototype.readAndCheckSignature = function(i) {
        var c = i.charCodeAt(0), _ = i.charCodeAt(1), x = i.charCodeAt(2), y = i.charCodeAt(3), k = this.readData(4);
        return c === k[0] && _ === k[1] && x === k[2] && y === k[3];
      }, s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return [];
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, f.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(n, f, u) {
      var e = n("../utils");
      function s(i) {
        this.data = i, this.length = i.length, this.index = 0, this.zero = 0;
      }
      s.prototype = { checkOffset: function(i) {
        this.checkIndex(this.index + i);
      }, checkIndex: function(i) {
        if (this.length < this.zero + i || i < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + i + "). Corrupted zip ?");
      }, setIndex: function(i) {
        this.checkIndex(i), this.index = i;
      }, skip: function(i) {
        this.setIndex(this.index + i);
      }, byteAt: function() {
      }, readInt: function(i) {
        var c, _ = 0;
        for (this.checkOffset(i), c = this.index + i - 1; c >= this.index; c--) _ = (_ << 8) + this.byteAt(c);
        return this.index += i, _;
      }, readString: function(i) {
        return e.transformTo("string", this.readData(i));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var i = this.readInt(4);
        return new Date(Date.UTC(1980 + (i >> 25 & 127), (i >> 21 & 15) - 1, i >> 16 & 31, i >> 11 & 31, i >> 5 & 63, (31 & i) << 1));
      } }, f.exports = s;
    }, { "../utils": 32 }], 19: [function(n, f, u) {
      var e = n("./Uint8ArrayReader");
      function s(i) {
        e.call(this, i);
      }
      n("../utils").inherits(s, e), s.prototype.readData = function(i) {
        this.checkOffset(i);
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, f.exports = s;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(n, f, u) {
      var e = n("./DataReader");
      function s(i) {
        e.call(this, i);
      }
      n("../utils").inherits(s, e), s.prototype.byteAt = function(i) {
        return this.data.charCodeAt(this.zero + i);
      }, s.prototype.lastIndexOfSignature = function(i) {
        return this.data.lastIndexOf(i) - this.zero;
      }, s.prototype.readAndCheckSignature = function(i) {
        return i === this.readData(4);
      }, s.prototype.readData = function(i) {
        this.checkOffset(i);
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, f.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(n, f, u) {
      var e = n("./ArrayReader");
      function s(i) {
        e.call(this, i);
      }
      n("../utils").inherits(s, e), s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return new Uint8Array(0);
        var c = this.data.subarray(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, f.exports = s;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(n, f, u) {
      var e = n("../utils"), s = n("../support"), i = n("./ArrayReader"), c = n("./StringReader"), _ = n("./NodeBufferReader"), x = n("./Uint8ArrayReader");
      f.exports = function(y) {
        var k = e.getTypeOf(y);
        return e.checkSupport(k), k !== "string" || s.uint8array ? k === "nodebuffer" ? new _(y) : s.uint8array ? new x(e.transformTo("uint8array", y)) : new i(e.transformTo("array", y)) : new c(y);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(n, f, u) {
      u.LOCAL_FILE_HEADER = "PK", u.CENTRAL_FILE_HEADER = "PK", u.CENTRAL_DIRECTORY_END = "PK", u.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", u.ZIP64_CENTRAL_DIRECTORY_END = "PK", u.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(n, f, u) {
      var e = n("./GenericWorker"), s = n("../utils");
      function i(c) {
        e.call(this, "ConvertWorker to " + c), this.destType = c;
      }
      s.inherits(i, e), i.prototype.processChunk = function(c) {
        this.push({ data: s.transformTo(this.destType, c.data), meta: c.meta });
      }, f.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(n, f, u) {
      var e = n("./GenericWorker"), s = n("../crc32");
      function i() {
        e.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      n("../utils").inherits(i, e), i.prototype.processChunk = function(c) {
        this.streamInfo.crc32 = s(c.data, this.streamInfo.crc32 || 0), this.push(c);
      }, f.exports = i;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(n, f, u) {
      var e = n("../utils"), s = n("./GenericWorker");
      function i(c) {
        s.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
      }
      e.inherits(i, s), i.prototype.processChunk = function(c) {
        if (c) {
          var _ = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = _ + c.data.length;
        }
        s.prototype.processChunk.call(this, c);
      }, f.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(n, f, u) {
      var e = n("../utils"), s = n("./GenericWorker");
      function i(c) {
        s.call(this, "DataWorker");
        var _ = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(x) {
          _.dataIsReady = !0, _.data = x, _.max = x && x.length || 0, _.type = e.getTypeOf(x), _.isPaused || _._tickAndRepeat();
        }, function(x) {
          _.error(x);
        });
      }
      e.inherits(i, s), i.prototype.cleanUp = function() {
        s.prototype.cleanUp.call(this), this.data = null;
      }, i.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, e.delay(this._tickAndRepeat, [], this)), !0);
      }, i.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (e.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, i.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var c = null, _ = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            c = this.data.substring(this.index, _);
            break;
          case "uint8array":
            c = this.data.subarray(this.index, _);
            break;
          case "array":
          case "nodebuffer":
            c = this.data.slice(this.index, _);
        }
        return this.index = _, this.push({ data: c, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, f.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(n, f, u) {
      function e(s) {
        this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      e.prototype = { push: function(s) {
        this.emit("data", s);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (s) {
          this.emit("error", s);
        }
        return !0;
      }, error: function(s) {
        return !this.isFinished && (this.isPaused ? this.generatedError = s : (this.isFinished = !0, this.emit("error", s), this.previous && this.previous.error(s), this.cleanUp()), !0);
      }, on: function(s, i) {
        return this._listeners[s].push(i), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(s, i) {
        if (this._listeners[s]) for (var c = 0; c < this._listeners[s].length; c++) this._listeners[s][c].call(this, i);
      }, pipe: function(s) {
        return s.registerPrevious(this);
      }, registerPrevious: function(s) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
        var i = this;
        return s.on("data", function(c) {
          i.processChunk(c);
        }), s.on("end", function() {
          i.end();
        }), s.on("error", function(c) {
          i.error(c);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var s = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), s = !0), this.previous && this.previous.resume(), !s;
      }, flush: function() {
      }, processChunk: function(s) {
        this.push(s);
      }, withStreamInfo: function(s, i) {
        return this.extraStreamInfo[s] = i, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var s in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var s = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + s : s;
      } }, f.exports = e;
    }, {}], 29: [function(n, f, u) {
      var e = n("../utils"), s = n("./ConvertWorker"), i = n("./GenericWorker"), c = n("../base64"), _ = n("../support"), x = n("../external"), y = null;
      if (_.nodestream) try {
        y = n("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function k(w, l) {
        return new x.Promise(function(m, d) {
          var g = [], S = w._internalType, C = w._outputType, R = w._mimeType;
          w.on("data", function(L, P) {
            g.push(L), l && l(P);
          }).on("error", function(L) {
            g = [], d(L);
          }).on("end", function() {
            try {
              var L = function(P, U, A) {
                switch (P) {
                  case "blob":
                    return e.newBlob(e.transformTo("arraybuffer", U), A);
                  case "base64":
                    return c.encode(U);
                  default:
                    return e.transformTo(P, U);
                }
              }(C, function(P, U) {
                var A, Z = 0, tt = null, b = 0;
                for (A = 0; A < U.length; A++) b += U[A].length;
                switch (P) {
                  case "string":
                    return U.join("");
                  case "array":
                    return Array.prototype.concat.apply([], U);
                  case "uint8array":
                    for (tt = new Uint8Array(b), A = 0; A < U.length; A++) tt.set(U[A], Z), Z += U[A].length;
                    return tt;
                  case "nodebuffer":
                    return Buffer.concat(U);
                  default:
                    throw new Error("concat : unsupported type '" + P + "'");
                }
              }(S, g), R);
              m(L);
            } catch (P) {
              d(P);
            }
            g = [];
          }).resume();
        });
      }
      function h(w, l, m) {
        var d = l;
        switch (l) {
          case "blob":
          case "arraybuffer":
            d = "uint8array";
            break;
          case "base64":
            d = "string";
        }
        try {
          this._internalType = d, this._outputType = l, this._mimeType = m, e.checkSupport(d), this._worker = w.pipe(new s(d)), w.lock();
        } catch (g) {
          this._worker = new i("error"), this._worker.error(g);
        }
      }
      h.prototype = { accumulate: function(w) {
        return k(this, w);
      }, on: function(w, l) {
        var m = this;
        return w === "data" ? this._worker.on(w, function(d) {
          l.call(m, d.data, d.meta);
        }) : this._worker.on(w, function() {
          e.delay(l, arguments, m);
        }), this;
      }, resume: function() {
        return e.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(w) {
        if (e.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new y(this, { objectMode: this._outputType !== "nodebuffer" }, w);
      } }, f.exports = h;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(n, f, u) {
      if (u.base64 = !0, u.array = !0, u.string = !0, u.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", u.nodebuffer = typeof Buffer < "u", u.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") u.blob = !1;
      else {
        var e = new ArrayBuffer(0);
        try {
          u.blob = new Blob([e], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            s.append(e), u.blob = s.getBlob("application/zip").size === 0;
          } catch {
            u.blob = !1;
          }
        }
      }
      try {
        u.nodestream = !!n("readable-stream").Readable;
      } catch {
        u.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(n, f, u) {
      for (var e = n("./utils"), s = n("./support"), i = n("./nodejsUtils"), c = n("./stream/GenericWorker"), _ = new Array(256), x = 0; x < 256; x++) _[x] = 252 <= x ? 6 : 248 <= x ? 5 : 240 <= x ? 4 : 224 <= x ? 3 : 192 <= x ? 2 : 1;
      _[254] = _[254] = 1;
      function y() {
        c.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function k() {
        c.call(this, "utf-8 encode");
      }
      u.utf8encode = function(h) {
        return s.nodebuffer ? i.newBufferFrom(h, "utf-8") : function(w) {
          var l, m, d, g, S, C = w.length, R = 0;
          for (g = 0; g < C; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (d = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), g++), R += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (l = s.uint8array ? new Uint8Array(R) : new Array(R), g = S = 0; S < R; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (d = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), g++), m < 128 ? l[S++] = m : (m < 2048 ? l[S++] = 192 | m >>> 6 : (m < 65536 ? l[S++] = 224 | m >>> 12 : (l[S++] = 240 | m >>> 18, l[S++] = 128 | m >>> 12 & 63), l[S++] = 128 | m >>> 6 & 63), l[S++] = 128 | 63 & m);
          return l;
        }(h);
      }, u.utf8decode = function(h) {
        return s.nodebuffer ? e.transformTo("nodebuffer", h).toString("utf-8") : function(w) {
          var l, m, d, g, S = w.length, C = new Array(2 * S);
          for (l = m = 0; l < S; ) if ((d = w[l++]) < 128) C[m++] = d;
          else if (4 < (g = _[d])) C[m++] = 65533, l += g - 1;
          else {
            for (d &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && l < S; ) d = d << 6 | 63 & w[l++], g--;
            1 < g ? C[m++] = 65533 : d < 65536 ? C[m++] = d : (d -= 65536, C[m++] = 55296 | d >> 10 & 1023, C[m++] = 56320 | 1023 & d);
          }
          return C.length !== m && (C.subarray ? C = C.subarray(0, m) : C.length = m), e.applyFromCharCode(C);
        }(h = e.transformTo(s.uint8array ? "uint8array" : "array", h));
      }, e.inherits(y, c), y.prototype.processChunk = function(h) {
        var w = e.transformTo(s.uint8array ? "uint8array" : "array", h.data);
        if (this.leftOver && this.leftOver.length) {
          if (s.uint8array) {
            var l = w;
            (w = new Uint8Array(l.length + this.leftOver.length)).set(this.leftOver, 0), w.set(l, this.leftOver.length);
          } else w = this.leftOver.concat(w);
          this.leftOver = null;
        }
        var m = function(g, S) {
          var C;
          for ((S = S || g.length) > g.length && (S = g.length), C = S - 1; 0 <= C && (192 & g[C]) == 128; ) C--;
          return C < 0 || C === 0 ? S : C + _[g[C]] > S ? C : S;
        }(w), d = w;
        m !== w.length && (s.uint8array ? (d = w.subarray(0, m), this.leftOver = w.subarray(m, w.length)) : (d = w.slice(0, m), this.leftOver = w.slice(m, w.length))), this.push({ data: u.utf8decode(d), meta: h.meta });
      }, y.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: u.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, u.Utf8DecodeWorker = y, e.inherits(k, c), k.prototype.processChunk = function(h) {
        this.push({ data: u.utf8encode(h.data), meta: h.meta });
      }, u.Utf8EncodeWorker = k;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(n, f, u) {
      var e = n("./support"), s = n("./base64"), i = n("./nodejsUtils"), c = n("./external");
      function _(l) {
        return l;
      }
      function x(l, m) {
        for (var d = 0; d < l.length; ++d) m[d] = 255 & l.charCodeAt(d);
        return m;
      }
      n("setimmediate"), u.newBlob = function(l, m) {
        u.checkSupport("blob");
        try {
          return new Blob([l], { type: m });
        } catch {
          try {
            var d = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return d.append(l), d.getBlob(m);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var y = { stringifyByChunk: function(l, m, d) {
        var g = [], S = 0, C = l.length;
        if (C <= d) return String.fromCharCode.apply(null, l);
        for (; S < C; ) m === "array" || m === "nodebuffer" ? g.push(String.fromCharCode.apply(null, l.slice(S, Math.min(S + d, C)))) : g.push(String.fromCharCode.apply(null, l.subarray(S, Math.min(S + d, C)))), S += d;
        return g.join("");
      }, stringifyByChar: function(l) {
        for (var m = "", d = 0; d < l.length; d++) m += String.fromCharCode(l[d]);
        return m;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return e.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return e.nodebuffer && String.fromCharCode.apply(null, i.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function k(l) {
        var m = 65536, d = u.getTypeOf(l), g = !0;
        if (d === "uint8array" ? g = y.applyCanBeUsed.uint8array : d === "nodebuffer" && (g = y.applyCanBeUsed.nodebuffer), g) for (; 1 < m; ) try {
          return y.stringifyByChunk(l, d, m);
        } catch {
          m = Math.floor(m / 2);
        }
        return y.stringifyByChar(l);
      }
      function h(l, m) {
        for (var d = 0; d < l.length; d++) m[d] = l[d];
        return m;
      }
      u.applyFromCharCode = k;
      var w = {};
      w.string = { string: _, array: function(l) {
        return x(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return w.string.uint8array(l).buffer;
      }, uint8array: function(l) {
        return x(l, new Uint8Array(l.length));
      }, nodebuffer: function(l) {
        return x(l, i.allocBuffer(l.length));
      } }, w.array = { string: k, array: _, arraybuffer: function(l) {
        return new Uint8Array(l).buffer;
      }, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return i.newBufferFrom(l);
      } }, w.arraybuffer = { string: function(l) {
        return k(new Uint8Array(l));
      }, array: function(l) {
        return h(new Uint8Array(l), new Array(l.byteLength));
      }, arraybuffer: _, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return i.newBufferFrom(new Uint8Array(l));
      } }, w.uint8array = { string: k, array: function(l) {
        return h(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return l.buffer;
      }, uint8array: _, nodebuffer: function(l) {
        return i.newBufferFrom(l);
      } }, w.nodebuffer = { string: k, array: function(l) {
        return h(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return w.nodebuffer.uint8array(l).buffer;
      }, uint8array: function(l) {
        return h(l, new Uint8Array(l.length));
      }, nodebuffer: _ }, u.transformTo = function(l, m) {
        if (m = m || "", !l) return m;
        u.checkSupport(l);
        var d = u.getTypeOf(m);
        return w[d][l](m);
      }, u.resolve = function(l) {
        for (var m = l.split("/"), d = [], g = 0; g < m.length; g++) {
          var S = m[g];
          S === "." || S === "" && g !== 0 && g !== m.length - 1 || (S === ".." ? d.pop() : d.push(S));
        }
        return d.join("/");
      }, u.getTypeOf = function(l) {
        return typeof l == "string" ? "string" : Object.prototype.toString.call(l) === "[object Array]" ? "array" : e.nodebuffer && i.isBuffer(l) ? "nodebuffer" : e.uint8array && l instanceof Uint8Array ? "uint8array" : e.arraybuffer && l instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, u.checkSupport = function(l) {
        if (!e[l.toLowerCase()]) throw new Error(l + " is not supported by this platform");
      }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(l) {
        var m, d, g = "";
        for (d = 0; d < (l || "").length; d++) g += "\\x" + ((m = l.charCodeAt(d)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
        return g;
      }, u.delay = function(l, m, d) {
        setImmediate(function() {
          l.apply(d || null, m || []);
        });
      }, u.inherits = function(l, m) {
        function d() {
        }
        d.prototype = m.prototype, l.prototype = new d();
      }, u.extend = function() {
        var l, m, d = {};
        for (l = 0; l < arguments.length; l++) for (m in arguments[l]) Object.prototype.hasOwnProperty.call(arguments[l], m) && d[m] === void 0 && (d[m] = arguments[l][m]);
        return d;
      }, u.prepareContent = function(l, m, d, g, S) {
        return c.Promise.resolve(m).then(function(C) {
          return e.blob && (C instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(C)) !== -1) && typeof FileReader < "u" ? new c.Promise(function(R, L) {
            var P = new FileReader();
            P.onload = function(U) {
              R(U.target.result);
            }, P.onerror = function(U) {
              L(U.target.error);
            }, P.readAsArrayBuffer(C);
          }) : C;
        }).then(function(C) {
          var R = u.getTypeOf(C);
          return R ? (R === "arraybuffer" ? C = u.transformTo("uint8array", C) : R === "string" && (S ? C = s.decode(C) : d && g !== !0 && (C = function(L) {
            return x(L, e.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(C))), C) : c.Promise.reject(new Error("Can't read the data of '" + l + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(n, f, u) {
      var e = n("./reader/readerFor"), s = n("./utils"), i = n("./signature"), c = n("./zipEntry"), _ = n("./support");
      function x(y) {
        this.files = [], this.loadOptions = y;
      }
      x.prototype = { checkSignature: function(y) {
        if (!this.reader.readAndCheckSignature(y)) {
          this.reader.index -= 4;
          var k = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(k) + ", expected " + s.pretty(y) + ")");
        }
      }, isSignature: function(y, k) {
        var h = this.reader.index;
        this.reader.setIndex(y);
        var w = this.reader.readString(4) === k;
        return this.reader.setIndex(h), w;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var y = this.reader.readData(this.zipCommentLength), k = _.uint8array ? "uint8array" : "array", h = s.transformTo(k, y);
        this.zipComment = this.loadOptions.decodeFileName(h);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var y, k, h, w = this.zip64EndOfCentralSize - 44; 0 < w; ) y = this.reader.readInt(2), k = this.reader.readInt(4), h = this.reader.readData(k), this.zip64ExtensibleData[y] = { id: y, length: k, value: h };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var y, k;
        for (y = 0; y < this.files.length; y++) k = this.files[y], this.reader.setIndex(k.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), k.readLocalPart(this.reader), k.handleUTF8(), k.processAttributes();
      }, readCentralDir: function() {
        var y;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(i.CENTRAL_FILE_HEADER); ) (y = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(y);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var y = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
        if (y < 0) throw this.isSignature(0, i.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(y);
        var k = y;
        if (this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (y = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(y), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, i.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var h = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (h += 20, h += 12 + this.zip64EndOfCentralSize);
        var w = k - h;
        if (0 < w) this.isSignature(k, i.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
        else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
      }, prepareReader: function(y) {
        this.reader = e(y);
      }, load: function(y) {
        this.prepareReader(y), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, f.exports = x;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(n, f, u) {
      var e = n("./reader/readerFor"), s = n("./utils"), i = n("./compressedObject"), c = n("./crc32"), _ = n("./utf8"), x = n("./compressions"), y = n("./support");
      function k(h, w) {
        this.options = h, this.loadOptions = w;
      }
      k.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(h) {
        var w, l;
        if (h.skip(22), this.fileNameLength = h.readInt(2), l = h.readInt(2), this.fileName = h.readData(this.fileNameLength), h.skip(l), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((w = function(m) {
          for (var d in x) if (Object.prototype.hasOwnProperty.call(x, d) && x[d].magic === m) return x[d];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, w, h.readData(this.compressedSize));
      }, readCentralPart: function(h) {
        this.versionMadeBy = h.readInt(2), h.skip(2), this.bitFlag = h.readInt(2), this.compressionMethod = h.readString(2), this.date = h.readDate(), this.crc32 = h.readInt(4), this.compressedSize = h.readInt(4), this.uncompressedSize = h.readInt(4);
        var w = h.readInt(2);
        if (this.extraFieldsLength = h.readInt(2), this.fileCommentLength = h.readInt(2), this.diskNumberStart = h.readInt(2), this.internalFileAttributes = h.readInt(2), this.externalFileAttributes = h.readInt(4), this.localHeaderOffset = h.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        h.skip(w), this.readExtraFields(h), this.parseZIP64ExtraField(h), this.fileComment = h.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var h = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), h == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), h == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var h = e(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = h.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = h.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = h.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = h.readInt(4));
        }
      }, readExtraFields: function(h) {
        var w, l, m, d = h.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); h.index + 4 < d; ) w = h.readInt(2), l = h.readInt(2), m = h.readData(l), this.extraFields[w] = { id: w, length: l, value: m };
        h.setIndex(d);
      }, handleUTF8: function() {
        var h = y.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = _.utf8decode(this.fileName), this.fileCommentStr = _.utf8decode(this.fileComment);
        else {
          var w = this.findExtraFieldUnicodePath();
          if (w !== null) this.fileNameStr = w;
          else {
            var l = s.transformTo(h, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(l);
          }
          var m = this.findExtraFieldUnicodeComment();
          if (m !== null) this.fileCommentStr = m;
          else {
            var d = s.transformTo(h, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(d);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var h = this.extraFields[28789];
        if (h) {
          var w = e(h.value);
          return w.readInt(1) !== 1 || c(this.fileName) !== w.readInt(4) ? null : _.utf8decode(w.readData(h.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var h = this.extraFields[25461];
        if (h) {
          var w = e(h.value);
          return w.readInt(1) !== 1 || c(this.fileComment) !== w.readInt(4) ? null : _.utf8decode(w.readData(h.length - 5));
        }
        return null;
      } }, f.exports = k;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(n, f, u) {
      function e(w, l, m) {
        this.name = w, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = l, this._dataBinary = m.binary, this.options = { compression: m.compression, compressionOptions: m.compressionOptions };
      }
      var s = n("./stream/StreamHelper"), i = n("./stream/DataWorker"), c = n("./utf8"), _ = n("./compressedObject"), x = n("./stream/GenericWorker");
      e.prototype = { internalStream: function(w) {
        var l = null, m = "string";
        try {
          if (!w) throw new Error("No output type specified.");
          var d = (m = w.toLowerCase()) === "string" || m === "text";
          m !== "binarystring" && m !== "text" || (m = "string"), l = this._decompressWorker();
          var g = !this._dataBinary;
          g && !d && (l = l.pipe(new c.Utf8EncodeWorker())), !g && d && (l = l.pipe(new c.Utf8DecodeWorker()));
        } catch (S) {
          (l = new x("error")).error(S);
        }
        return new s(l, m, "");
      }, async: function(w, l) {
        return this.internalStream(w).accumulate(l);
      }, nodeStream: function(w, l) {
        return this.internalStream(w || "nodebuffer").toNodejsStream(l);
      }, _compressWorker: function(w, l) {
        if (this._data instanceof _ && this._data.compression.magic === w.magic) return this._data.getCompressedWorker();
        var m = this._decompressWorker();
        return this._dataBinary || (m = m.pipe(new c.Utf8EncodeWorker())), _.createWorkerFrom(m, w, l);
      }, _decompressWorker: function() {
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof x ? this._data : new i(this._data);
      } };
      for (var y = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], k = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, h = 0; h < y.length; h++) e.prototype[y[h]] = k;
      f.exports = e;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(n, f, u) {
      (function(e) {
        var s, i, c = e.MutationObserver || e.WebKitMutationObserver;
        if (c) {
          var _ = 0, x = new c(w), y = e.document.createTextNode("");
          x.observe(y, { characterData: !0 }), s = function() {
            y.data = _ = ++_ % 2;
          };
        } else if (e.setImmediate || e.MessageChannel === void 0) s = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
          var l = e.document.createElement("script");
          l.onreadystatechange = function() {
            w(), l.onreadystatechange = null, l.parentNode.removeChild(l), l = null;
          }, e.document.documentElement.appendChild(l);
        } : function() {
          setTimeout(w, 0);
        };
        else {
          var k = new e.MessageChannel();
          k.port1.onmessage = w, s = function() {
            k.port2.postMessage(0);
          };
        }
        var h = [];
        function w() {
          var l, m;
          i = !0;
          for (var d = h.length; d; ) {
            for (m = h, h = [], l = -1; ++l < d; ) m[l]();
            d = h.length;
          }
          i = !1;
        }
        f.exports = function(l) {
          h.push(l) !== 1 || i || s();
        };
      }).call(this, typeof Qt < "u" ? Qt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(n, f, u) {
      var e = n("immediate");
      function s() {
      }
      var i = {}, c = ["REJECTED"], _ = ["FULFILLED"], x = ["PENDING"];
      function y(d) {
        if (typeof d != "function") throw new TypeError("resolver must be a function");
        this.state = x, this.queue = [], this.outcome = void 0, d !== s && l(this, d);
      }
      function k(d, g, S) {
        this.promise = d, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof S == "function" && (this.onRejected = S, this.callRejected = this.otherCallRejected);
      }
      function h(d, g, S) {
        e(function() {
          var C;
          try {
            C = g(S);
          } catch (R) {
            return i.reject(d, R);
          }
          C === d ? i.reject(d, new TypeError("Cannot resolve promise with itself")) : i.resolve(d, C);
        });
      }
      function w(d) {
        var g = d && d.then;
        if (d && (typeof d == "object" || typeof d == "function") && typeof g == "function") return function() {
          g.apply(d, arguments);
        };
      }
      function l(d, g) {
        var S = !1;
        function C(P) {
          S || (S = !0, i.reject(d, P));
        }
        function R(P) {
          S || (S = !0, i.resolve(d, P));
        }
        var L = m(function() {
          g(R, C);
        });
        L.status === "error" && C(L.value);
      }
      function m(d, g) {
        var S = {};
        try {
          S.value = d(g), S.status = "success";
        } catch (C) {
          S.status = "error", S.value = C;
        }
        return S;
      }
      (f.exports = y).prototype.finally = function(d) {
        if (typeof d != "function") return this;
        var g = this.constructor;
        return this.then(function(S) {
          return g.resolve(d()).then(function() {
            return S;
          });
        }, function(S) {
          return g.resolve(d()).then(function() {
            throw S;
          });
        });
      }, y.prototype.catch = function(d) {
        return this.then(null, d);
      }, y.prototype.then = function(d, g) {
        if (typeof d != "function" && this.state === _ || typeof g != "function" && this.state === c) return this;
        var S = new this.constructor(s);
        return this.state !== x ? h(S, this.state === _ ? d : g, this.outcome) : this.queue.push(new k(S, d, g)), S;
      }, k.prototype.callFulfilled = function(d) {
        i.resolve(this.promise, d);
      }, k.prototype.otherCallFulfilled = function(d) {
        h(this.promise, this.onFulfilled, d);
      }, k.prototype.callRejected = function(d) {
        i.reject(this.promise, d);
      }, k.prototype.otherCallRejected = function(d) {
        h(this.promise, this.onRejected, d);
      }, i.resolve = function(d, g) {
        var S = m(w, g);
        if (S.status === "error") return i.reject(d, S.value);
        var C = S.value;
        if (C) l(d, C);
        else {
          d.state = _, d.outcome = g;
          for (var R = -1, L = d.queue.length; ++R < L; ) d.queue[R].callFulfilled(g);
        }
        return d;
      }, i.reject = function(d, g) {
        d.state = c, d.outcome = g;
        for (var S = -1, C = d.queue.length; ++S < C; ) d.queue[S].callRejected(g);
        return d;
      }, y.resolve = function(d) {
        return d instanceof this ? d : i.resolve(new this(s), d);
      }, y.reject = function(d) {
        var g = new this(s);
        return i.reject(g, d);
      }, y.all = function(d) {
        var g = this;
        if (Object.prototype.toString.call(d) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var S = d.length, C = !1;
        if (!S) return this.resolve([]);
        for (var R = new Array(S), L = 0, P = -1, U = new this(s); ++P < S; ) A(d[P], P);
        return U;
        function A(Z, tt) {
          g.resolve(Z).then(function(b) {
            R[tt] = b, ++L !== S || C || (C = !0, i.resolve(U, R));
          }, function(b) {
            C || (C = !0, i.reject(U, b));
          });
        }
      }, y.race = function(d) {
        var g = this;
        if (Object.prototype.toString.call(d) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var S = d.length, C = !1;
        if (!S) return this.resolve([]);
        for (var R = -1, L = new this(s); ++R < S; ) P = d[R], g.resolve(P).then(function(U) {
          C || (C = !0, i.resolve(L, U));
        }, function(U) {
          C || (C = !0, i.reject(L, U));
        });
        var P;
        return L;
      };
    }, { immediate: 36 }], 38: [function(n, f, u) {
      var e = {};
      (0, n("./lib/utils/common").assign)(e, n("./lib/deflate"), n("./lib/inflate"), n("./lib/zlib/constants")), f.exports = e;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(n, f, u) {
      var e = n("./zlib/deflate"), s = n("./utils/common"), i = n("./utils/strings"), c = n("./zlib/messages"), _ = n("./zlib/zstream"), x = Object.prototype.toString, y = 0, k = -1, h = 0, w = 8;
      function l(d) {
        if (!(this instanceof l)) return new l(d);
        this.options = s.assign({ level: k, method: w, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: h, to: "" }, d || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var S = e.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (S !== y) throw new Error(c[S]);
        if (g.header && e.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var C;
          if (C = typeof g.dictionary == "string" ? i.string2buf(g.dictionary) : x.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (S = e.deflateSetDictionary(this.strm, C)) !== y) throw new Error(c[S]);
          this._dict_set = !0;
        }
      }
      function m(d, g) {
        var S = new l(g);
        if (S.push(d, !0), S.err) throw S.msg || c[S.err];
        return S.result;
      }
      l.prototype.push = function(d, g) {
        var S, C, R = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        C = g === ~~g ? g : g === !0 ? 4 : 0, typeof d == "string" ? R.input = i.string2buf(d) : x.call(d) === "[object ArrayBuffer]" ? R.input = new Uint8Array(d) : R.input = d, R.next_in = 0, R.avail_in = R.input.length;
        do {
          if (R.avail_out === 0 && (R.output = new s.Buf8(L), R.next_out = 0, R.avail_out = L), (S = e.deflate(R, C)) !== 1 && S !== y) return this.onEnd(S), !(this.ended = !0);
          R.avail_out !== 0 && (R.avail_in !== 0 || C !== 4 && C !== 2) || (this.options.to === "string" ? this.onData(i.buf2binstring(s.shrinkBuf(R.output, R.next_out))) : this.onData(s.shrinkBuf(R.output, R.next_out)));
        } while ((0 < R.avail_in || R.avail_out === 0) && S !== 1);
        return C === 4 ? (S = e.deflateEnd(this.strm), this.onEnd(S), this.ended = !0, S === y) : C !== 2 || (this.onEnd(y), !(R.avail_out = 0));
      }, l.prototype.onData = function(d) {
        this.chunks.push(d);
      }, l.prototype.onEnd = function(d) {
        d === y && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = d, this.msg = this.strm.msg;
      }, u.Deflate = l, u.deflate = m, u.deflateRaw = function(d, g) {
        return (g = g || {}).raw = !0, m(d, g);
      }, u.gzip = function(d, g) {
        return (g = g || {}).gzip = !0, m(d, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(n, f, u) {
      var e = n("./zlib/inflate"), s = n("./utils/common"), i = n("./utils/strings"), c = n("./zlib/constants"), _ = n("./zlib/messages"), x = n("./zlib/zstream"), y = n("./zlib/gzheader"), k = Object.prototype.toString;
      function h(l) {
        if (!(this instanceof h)) return new h(l);
        this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, l || {});
        var m = this.options;
        m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), !(0 <= m.windowBits && m.windowBits < 16) || l && l.windowBits || (m.windowBits += 32), 15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new x(), this.strm.avail_out = 0;
        var d = e.inflateInit2(this.strm, m.windowBits);
        if (d !== c.Z_OK) throw new Error(_[d]);
        this.header = new y(), e.inflateGetHeader(this.strm, this.header);
      }
      function w(l, m) {
        var d = new h(m);
        if (d.push(l, !0), d.err) throw d.msg || _[d.err];
        return d.result;
      }
      h.prototype.push = function(l, m) {
        var d, g, S, C, R, L, P = this.strm, U = this.options.chunkSize, A = this.options.dictionary, Z = !1;
        if (this.ended) return !1;
        g = m === ~~m ? m : m === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof l == "string" ? P.input = i.binstring2buf(l) : k.call(l) === "[object ArrayBuffer]" ? P.input = new Uint8Array(l) : P.input = l, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new s.Buf8(U), P.next_out = 0, P.avail_out = U), (d = e.inflate(P, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && A && (L = typeof A == "string" ? i.string2buf(A) : k.call(A) === "[object ArrayBuffer]" ? new Uint8Array(A) : A, d = e.inflateSetDictionary(this.strm, L)), d === c.Z_BUF_ERROR && Z === !0 && (d = c.Z_OK, Z = !1), d !== c.Z_STREAM_END && d !== c.Z_OK) return this.onEnd(d), !(this.ended = !0);
          P.next_out && (P.avail_out !== 0 && d !== c.Z_STREAM_END && (P.avail_in !== 0 || g !== c.Z_FINISH && g !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (S = i.utf8border(P.output, P.next_out), C = P.next_out - S, R = i.buf2string(P.output, S), P.next_out = C, P.avail_out = U - C, C && s.arraySet(P.output, P.output, S, C, 0), this.onData(R)) : this.onData(s.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (Z = !0);
        } while ((0 < P.avail_in || P.avail_out === 0) && d !== c.Z_STREAM_END);
        return d === c.Z_STREAM_END && (g = c.Z_FINISH), g === c.Z_FINISH ? (d = e.inflateEnd(this.strm), this.onEnd(d), this.ended = !0, d === c.Z_OK) : g !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(P.avail_out = 0));
      }, h.prototype.onData = function(l) {
        this.chunks.push(l);
      }, h.prototype.onEnd = function(l) {
        l === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = l, this.msg = this.strm.msg;
      }, u.Inflate = h, u.inflate = w, u.inflateRaw = function(l, m) {
        return (m = m || {}).raw = !0, w(l, m);
      }, u.ungzip = w;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(n, f, u) {
      var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      u.assign = function(c) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var x = _.shift();
          if (x) {
            if (typeof x != "object") throw new TypeError(x + "must be non-object");
            for (var y in x) x.hasOwnProperty(y) && (c[y] = x[y]);
          }
        }
        return c;
      }, u.shrinkBuf = function(c, _) {
        return c.length === _ ? c : c.subarray ? c.subarray(0, _) : (c.length = _, c);
      };
      var s = { arraySet: function(c, _, x, y, k) {
        if (_.subarray && c.subarray) c.set(_.subarray(x, x + y), k);
        else for (var h = 0; h < y; h++) c[k + h] = _[x + h];
      }, flattenChunks: function(c) {
        var _, x, y, k, h, w;
        for (_ = y = 0, x = c.length; _ < x; _++) y += c[_].length;
        for (w = new Uint8Array(y), _ = k = 0, x = c.length; _ < x; _++) h = c[_], w.set(h, k), k += h.length;
        return w;
      } }, i = { arraySet: function(c, _, x, y, k) {
        for (var h = 0; h < y; h++) c[k + h] = _[x + h];
      }, flattenChunks: function(c) {
        return [].concat.apply([], c);
      } };
      u.setTyped = function(c) {
        c ? (u.Buf8 = Uint8Array, u.Buf16 = Uint16Array, u.Buf32 = Int32Array, u.assign(u, s)) : (u.Buf8 = Array, u.Buf16 = Array, u.Buf32 = Array, u.assign(u, i));
      }, u.setTyped(e);
    }, {}], 42: [function(n, f, u) {
      var e = n("./common"), s = !0, i = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        s = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        i = !1;
      }
      for (var c = new e.Buf8(256), _ = 0; _ < 256; _++) c[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
      function x(y, k) {
        if (k < 65537 && (y.subarray && i || !y.subarray && s)) return String.fromCharCode.apply(null, e.shrinkBuf(y, k));
        for (var h = "", w = 0; w < k; w++) h += String.fromCharCode(y[w]);
        return h;
      }
      c[254] = c[254] = 1, u.string2buf = function(y) {
        var k, h, w, l, m, d = y.length, g = 0;
        for (l = 0; l < d; l++) (64512 & (h = y.charCodeAt(l))) == 55296 && l + 1 < d && (64512 & (w = y.charCodeAt(l + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (w - 56320), l++), g += h < 128 ? 1 : h < 2048 ? 2 : h < 65536 ? 3 : 4;
        for (k = new e.Buf8(g), l = m = 0; m < g; l++) (64512 & (h = y.charCodeAt(l))) == 55296 && l + 1 < d && (64512 & (w = y.charCodeAt(l + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (w - 56320), l++), h < 128 ? k[m++] = h : (h < 2048 ? k[m++] = 192 | h >>> 6 : (h < 65536 ? k[m++] = 224 | h >>> 12 : (k[m++] = 240 | h >>> 18, k[m++] = 128 | h >>> 12 & 63), k[m++] = 128 | h >>> 6 & 63), k[m++] = 128 | 63 & h);
        return k;
      }, u.buf2binstring = function(y) {
        return x(y, y.length);
      }, u.binstring2buf = function(y) {
        for (var k = new e.Buf8(y.length), h = 0, w = k.length; h < w; h++) k[h] = y.charCodeAt(h);
        return k;
      }, u.buf2string = function(y, k) {
        var h, w, l, m, d = k || y.length, g = new Array(2 * d);
        for (h = w = 0; h < d; ) if ((l = y[h++]) < 128) g[w++] = l;
        else if (4 < (m = c[l])) g[w++] = 65533, h += m - 1;
        else {
          for (l &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && h < d; ) l = l << 6 | 63 & y[h++], m--;
          1 < m ? g[w++] = 65533 : l < 65536 ? g[w++] = l : (l -= 65536, g[w++] = 55296 | l >> 10 & 1023, g[w++] = 56320 | 1023 & l);
        }
        return x(g, w);
      }, u.utf8border = function(y, k) {
        var h;
        for ((k = k || y.length) > y.length && (k = y.length), h = k - 1; 0 <= h && (192 & y[h]) == 128; ) h--;
        return h < 0 || h === 0 ? k : h + c[y[h]] > k ? h : k;
      };
    }, { "./common": 41 }], 43: [function(n, f, u) {
      f.exports = function(e, s, i, c) {
        for (var _ = 65535 & e | 0, x = e >>> 16 & 65535 | 0, y = 0; i !== 0; ) {
          for (i -= y = 2e3 < i ? 2e3 : i; x = x + (_ = _ + s[c++] | 0) | 0, --y; ) ;
          _ %= 65521, x %= 65521;
        }
        return _ | x << 16 | 0;
      };
    }, {}], 44: [function(n, f, u) {
      f.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(n, f, u) {
      var e = function() {
        for (var s, i = [], c = 0; c < 256; c++) {
          s = c;
          for (var _ = 0; _ < 8; _++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
          i[c] = s;
        }
        return i;
      }();
      f.exports = function(s, i, c, _) {
        var x = e, y = _ + c;
        s ^= -1;
        for (var k = _; k < y; k++) s = s >>> 8 ^ x[255 & (s ^ i[k])];
        return -1 ^ s;
      };
    }, {}], 46: [function(n, f, u) {
      var e, s = n("../utils/common"), i = n("./trees"), c = n("./adler32"), _ = n("./crc32"), x = n("./messages"), y = 0, k = 4, h = 0, w = -2, l = -1, m = 4, d = 2, g = 8, S = 9, C = 286, R = 30, L = 19, P = 2 * C + 1, U = 15, A = 3, Z = 258, tt = Z + A + 1, b = 42, D = 113, a = 1, N = 2, H = 3, $ = 4;
      function at(t, F) {
        return t.msg = x[F], F;
      }
      function V(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function nt(t) {
        for (var F = t.length; 0 <= --F; ) t[F] = 0;
      }
      function I(t) {
        var F = t.state, O = F.pending;
        O > t.avail_out && (O = t.avail_out), O !== 0 && (s.arraySet(t.output, F.pending_buf, F.pending_out, O, t.next_out), t.next_out += O, F.pending_out += O, t.total_out += O, t.avail_out -= O, F.pending -= O, F.pending === 0 && (F.pending_out = 0));
      }
      function T(t, F) {
        i._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, F), t.block_start = t.strstart, I(t.strm);
      }
      function rt(t, F) {
        t.pending_buf[t.pending++] = F;
      }
      function q(t, F) {
        t.pending_buf[t.pending++] = F >>> 8 & 255, t.pending_buf[t.pending++] = 255 & F;
      }
      function Y(t, F) {
        var O, v, p = t.max_chain_length, E = t.strstart, j = t.prev_length, M = t.nice_match, z = t.strstart > t.w_size - tt ? t.strstart - (t.w_size - tt) : 0, G = t.window, J = t.w_mask, X = t.prev, et = t.strstart + Z, ht = G[E + j - 1], lt = G[E + j];
        t.prev_length >= t.good_match && (p >>= 2), M > t.lookahead && (M = t.lookahead);
        do
          if (G[(O = F) + j] === lt && G[O + j - 1] === ht && G[O] === G[E] && G[++O] === G[E + 1]) {
            E += 2, O++;
            do
              ;
            while (G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && G[++E] === G[++O] && E < et);
            if (v = Z - (et - E), E = et - Z, j < v) {
              if (t.match_start = F, M <= (j = v)) break;
              ht = G[E + j - 1], lt = G[E + j];
            }
          }
        while ((F = X[F & J]) > z && --p != 0);
        return j <= t.lookahead ? j : t.lookahead;
      }
      function gt(t) {
        var F, O, v, p, E, j, M, z, G, J, X = t.w_size;
        do {
          if (p = t.window_size - t.lookahead - t.strstart, t.strstart >= X + (X - tt)) {
            for (s.arraySet(t.window, t.window, X, X, 0), t.match_start -= X, t.strstart -= X, t.block_start -= X, F = O = t.hash_size; v = t.head[--F], t.head[F] = X <= v ? v - X : 0, --O; ) ;
            for (F = O = X; v = t.prev[--F], t.prev[F] = X <= v ? v - X : 0, --O; ) ;
            p += X;
          }
          if (t.strm.avail_in === 0) break;
          if (j = t.strm, M = t.window, z = t.strstart + t.lookahead, G = p, J = void 0, J = j.avail_in, G < J && (J = G), O = J === 0 ? 0 : (j.avail_in -= J, s.arraySet(M, j.input, j.next_in, J, z), j.state.wrap === 1 ? j.adler = c(j.adler, M, J, z) : j.state.wrap === 2 && (j.adler = _(j.adler, M, J, z)), j.next_in += J, j.total_in += J, J), t.lookahead += O, t.lookahead + t.insert >= A) for (E = t.strstart - t.insert, t.ins_h = t.window[E], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + A - 1]) & t.hash_mask, t.prev[E & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = E, E++, t.insert--, !(t.lookahead + t.insert < A)); ) ;
        } while (t.lookahead < tt && t.strm.avail_in !== 0);
      }
      function bt(t, F) {
        for (var O, v; ; ) {
          if (t.lookahead < tt) {
            if (gt(t), t.lookahead < tt && F === y) return a;
            if (t.lookahead === 0) break;
          }
          if (O = 0, t.lookahead >= A && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), O !== 0 && t.strstart - O <= t.w_size - tt && (t.match_length = Y(t, O)), t.match_length >= A) if (v = i._tr_tally(t, t.strstart - t.match_start, t.match_length - A), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= A) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = i._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (T(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = t.strstart < A - 1 ? t.strstart : A - 1, F === k ? (T(t, !0), t.strm.avail_out === 0 ? H : $) : t.last_lit && (T(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ot(t, F) {
        for (var O, v, p; ; ) {
          if (t.lookahead < tt) {
            if (gt(t), t.lookahead < tt && F === y) return a;
            if (t.lookahead === 0) break;
          }
          if (O = 0, t.lookahead >= A && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = A - 1, O !== 0 && t.prev_length < t.max_lazy_match && t.strstart - O <= t.w_size - tt && (t.match_length = Y(t, O), t.match_length <= 5 && (t.strategy === 1 || t.match_length === A && 4096 < t.strstart - t.match_start) && (t.match_length = A - 1)), t.prev_length >= A && t.match_length <= t.prev_length) {
            for (p = t.strstart + t.lookahead - A, v = i._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - A), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= p && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = A - 1, t.strstart++, v && (T(t, !1), t.strm.avail_out === 0)) return a;
          } else if (t.match_available) {
            if ((v = i._tr_tally(t, 0, t.window[t.strstart - 1])) && T(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return a;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = i._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < A - 1 ? t.strstart : A - 1, F === k ? (T(t, !0), t.strm.avail_out === 0 ? H : $) : t.last_lit && (T(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ut(t, F, O, v, p) {
        this.good_length = t, this.max_lazy = F, this.nice_length = O, this.max_chain = v, this.func = p;
      }
      function yt() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * P), this.dyn_dtree = new s.Buf16(2 * (2 * R + 1)), this.bl_tree = new s.Buf16(2 * (2 * L + 1)), nt(this.dyn_ltree), nt(this.dyn_dtree), nt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(U + 1), this.heap = new s.Buf16(2 * C + 1), nt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * C + 1), nt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function vt(t) {
        var F;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = d, (F = t.state).pending = 0, F.pending_out = 0, F.wrap < 0 && (F.wrap = -F.wrap), F.status = F.wrap ? b : D, t.adler = F.wrap === 2 ? 0 : 1, F.last_flush = y, i._tr_init(F), h) : at(t, w);
      }
      function Tt(t) {
        var F = vt(t);
        return F === h && function(O) {
          O.window_size = 2 * O.w_size, nt(O.head), O.max_lazy_match = e[O.level].max_lazy, O.good_match = e[O.level].good_length, O.nice_match = e[O.level].nice_length, O.max_chain_length = e[O.level].max_chain, O.strstart = 0, O.block_start = 0, O.lookahead = 0, O.insert = 0, O.match_length = O.prev_length = A - 1, O.match_available = 0, O.ins_h = 0;
        }(t.state), F;
      }
      function Rt(t, F, O, v, p, E) {
        if (!t) return w;
        var j = 1;
        if (F === l && (F = 6), v < 0 ? (j = 0, v = -v) : 15 < v && (j = 2, v -= 16), p < 1 || S < p || O !== g || v < 8 || 15 < v || F < 0 || 9 < F || E < 0 || m < E) return at(t, w);
        v === 8 && (v = 9);
        var M = new yt();
        return (t.state = M).strm = t, M.wrap = j, M.gzhead = null, M.w_bits = v, M.w_size = 1 << M.w_bits, M.w_mask = M.w_size - 1, M.hash_bits = p + 7, M.hash_size = 1 << M.hash_bits, M.hash_mask = M.hash_size - 1, M.hash_shift = ~~((M.hash_bits + A - 1) / A), M.window = new s.Buf8(2 * M.w_size), M.head = new s.Buf16(M.hash_size), M.prev = new s.Buf16(M.w_size), M.lit_bufsize = 1 << p + 6, M.pending_buf_size = 4 * M.lit_bufsize, M.pending_buf = new s.Buf8(M.pending_buf_size), M.d_buf = 1 * M.lit_bufsize, M.l_buf = 3 * M.lit_bufsize, M.level = F, M.strategy = E, M.method = O, Tt(t);
      }
      e = [new ut(0, 0, 0, 0, function(t, F) {
        var O = 65535;
        for (O > t.pending_buf_size - 5 && (O = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (gt(t), t.lookahead === 0 && F === y) return a;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + O;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, T(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - tt && (T(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = 0, F === k ? (T(t, !0), t.strm.avail_out === 0 ? H : $) : (t.strstart > t.block_start && (T(t, !1), t.strm.avail_out), a);
      }), new ut(4, 4, 8, 4, bt), new ut(4, 5, 16, 8, bt), new ut(4, 6, 32, 32, bt), new ut(4, 4, 16, 16, ot), new ut(8, 16, 32, 32, ot), new ut(8, 16, 128, 128, ot), new ut(8, 32, 128, 256, ot), new ut(32, 128, 258, 1024, ot), new ut(32, 258, 258, 4096, ot)], u.deflateInit = function(t, F) {
        return Rt(t, F, g, 15, 8, 0);
      }, u.deflateInit2 = Rt, u.deflateReset = Tt, u.deflateResetKeep = vt, u.deflateSetHeader = function(t, F) {
        return t && t.state ? t.state.wrap !== 2 ? w : (t.state.gzhead = F, h) : w;
      }, u.deflate = function(t, F) {
        var O, v, p, E;
        if (!t || !t.state || 5 < F || F < 0) return t ? at(t, w) : w;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && F !== k) return at(t, t.avail_out === 0 ? -5 : w);
        if (v.strm = t, O = v.last_flush, v.last_flush = F, v.status === b) if (v.wrap === 2) t.adler = 0, rt(v, 31), rt(v, 139), rt(v, 8), v.gzhead ? (rt(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), rt(v, 255 & v.gzhead.time), rt(v, v.gzhead.time >> 8 & 255), rt(v, v.gzhead.time >> 16 & 255), rt(v, v.gzhead.time >> 24 & 255), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (rt(v, 255 & v.gzhead.extra.length), rt(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = _(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 3), v.status = D);
        else {
          var j = g + (v.w_bits - 8 << 4) << 8;
          j |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && (j |= 32), j += 31 - j % 31, v.status = D, q(v, j), v.strstart !== 0 && (q(v, t.adler >>> 16), q(v, 65535 & t.adler)), t.adler = 1;
        }
        if (v.status === 69) if (v.gzhead.extra) {
          for (p = v.pending; v.gzindex < (65535 & v.gzhead.extra.length) && (v.pending !== v.pending_buf_size || (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), I(t), p = v.pending, v.pending !== v.pending_buf_size)); ) rt(v, 255 & v.gzhead.extra[v.gzindex]), v.gzindex++;
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), v.gzindex === v.gzhead.extra.length && (v.gzindex = 0, v.status = 73);
        } else v.status = 73;
        if (v.status === 73) if (v.gzhead.name) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), I(t), p = v.pending, v.pending === v.pending_buf_size)) {
              E = 1;
              break;
            }
            E = v.gzindex < v.gzhead.name.length ? 255 & v.gzhead.name.charCodeAt(v.gzindex++) : 0, rt(v, E);
          } while (E !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), E === 0 && (v.gzindex = 0, v.status = 91);
        } else v.status = 91;
        if (v.status === 91) if (v.gzhead.comment) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), I(t), p = v.pending, v.pending === v.pending_buf_size)) {
              E = 1;
              break;
            }
            E = v.gzindex < v.gzhead.comment.length ? 255 & v.gzhead.comment.charCodeAt(v.gzindex++) : 0, rt(v, E);
          } while (E !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), E === 0 && (v.status = 103);
        } else v.status = 103;
        if (v.status === 103 && (v.gzhead.hcrc ? (v.pending + 2 > v.pending_buf_size && I(t), v.pending + 2 <= v.pending_buf_size && (rt(v, 255 & t.adler), rt(v, t.adler >> 8 & 255), t.adler = 0, v.status = D)) : v.status = D), v.pending !== 0) {
          if (I(t), t.avail_out === 0) return v.last_flush = -1, h;
        } else if (t.avail_in === 0 && V(F) <= V(O) && F !== k) return at(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return at(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || F !== y && v.status !== 666) {
          var M = v.strategy === 2 ? function(z, G) {
            for (var J; ; ) {
              if (z.lookahead === 0 && (gt(z), z.lookahead === 0)) {
                if (G === y) return a;
                break;
              }
              if (z.match_length = 0, J = i._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, J && (T(z, !1), z.strm.avail_out === 0)) return a;
            }
            return z.insert = 0, G === k ? (T(z, !0), z.strm.avail_out === 0 ? H : $) : z.last_lit && (T(z, !1), z.strm.avail_out === 0) ? a : N;
          }(v, F) : v.strategy === 3 ? function(z, G) {
            for (var J, X, et, ht, lt = z.window; ; ) {
              if (z.lookahead <= Z) {
                if (gt(z), z.lookahead <= Z && G === y) return a;
                if (z.lookahead === 0) break;
              }
              if (z.match_length = 0, z.lookahead >= A && 0 < z.strstart && (X = lt[et = z.strstart - 1]) === lt[++et] && X === lt[++et] && X === lt[++et]) {
                ht = z.strstart + Z;
                do
                  ;
                while (X === lt[++et] && X === lt[++et] && X === lt[++et] && X === lt[++et] && X === lt[++et] && X === lt[++et] && X === lt[++et] && X === lt[++et] && et < ht);
                z.match_length = Z - (ht - et), z.match_length > z.lookahead && (z.match_length = z.lookahead);
              }
              if (z.match_length >= A ? (J = i._tr_tally(z, 1, z.match_length - A), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (J = i._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), J && (T(z, !1), z.strm.avail_out === 0)) return a;
            }
            return z.insert = 0, G === k ? (T(z, !0), z.strm.avail_out === 0 ? H : $) : z.last_lit && (T(z, !1), z.strm.avail_out === 0) ? a : N;
          }(v, F) : e[v.level].func(v, F);
          if (M !== H && M !== $ || (v.status = 666), M === a || M === H) return t.avail_out === 0 && (v.last_flush = -1), h;
          if (M === N && (F === 1 ? i._tr_align(v) : F !== 5 && (i._tr_stored_block(v, 0, 0, !1), F === 3 && (nt(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), I(t), t.avail_out === 0)) return v.last_flush = -1, h;
        }
        return F !== k ? h : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (rt(v, 255 & t.adler), rt(v, t.adler >> 8 & 255), rt(v, t.adler >> 16 & 255), rt(v, t.adler >> 24 & 255), rt(v, 255 & t.total_in), rt(v, t.total_in >> 8 & 255), rt(v, t.total_in >> 16 & 255), rt(v, t.total_in >> 24 & 255)) : (q(v, t.adler >>> 16), q(v, 65535 & t.adler)), I(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? h : 1);
      }, u.deflateEnd = function(t) {
        var F;
        return t && t.state ? (F = t.state.status) !== b && F !== 69 && F !== 73 && F !== 91 && F !== 103 && F !== D && F !== 666 ? at(t, w) : (t.state = null, F === D ? at(t, -3) : h) : w;
      }, u.deflateSetDictionary = function(t, F) {
        var O, v, p, E, j, M, z, G, J = F.length;
        if (!t || !t.state || (E = (O = t.state).wrap) === 2 || E === 1 && O.status !== b || O.lookahead) return w;
        for (E === 1 && (t.adler = c(t.adler, F, J, 0)), O.wrap = 0, J >= O.w_size && (E === 0 && (nt(O.head), O.strstart = 0, O.block_start = 0, O.insert = 0), G = new s.Buf8(O.w_size), s.arraySet(G, F, J - O.w_size, O.w_size, 0), F = G, J = O.w_size), j = t.avail_in, M = t.next_in, z = t.input, t.avail_in = J, t.next_in = 0, t.input = F, gt(O); O.lookahead >= A; ) {
          for (v = O.strstart, p = O.lookahead - (A - 1); O.ins_h = (O.ins_h << O.hash_shift ^ O.window[v + A - 1]) & O.hash_mask, O.prev[v & O.w_mask] = O.head[O.ins_h], O.head[O.ins_h] = v, v++, --p; ) ;
          O.strstart = v, O.lookahead = A - 1, gt(O);
        }
        return O.strstart += O.lookahead, O.block_start = O.strstart, O.insert = O.lookahead, O.lookahead = 0, O.match_length = O.prev_length = A - 1, O.match_available = 0, t.next_in = M, t.input = z, t.avail_in = j, O.wrap = E, h;
      }, u.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(n, f, u) {
      f.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(n, f, u) {
      f.exports = function(e, s) {
        var i, c, _, x, y, k, h, w, l, m, d, g, S, C, R, L, P, U, A, Z, tt, b, D, a, N;
        i = e.state, c = e.next_in, a = e.input, _ = c + (e.avail_in - 5), x = e.next_out, N = e.output, y = x - (s - e.avail_out), k = x + (e.avail_out - 257), h = i.dmax, w = i.wsize, l = i.whave, m = i.wnext, d = i.window, g = i.hold, S = i.bits, C = i.lencode, R = i.distcode, L = (1 << i.lenbits) - 1, P = (1 << i.distbits) - 1;
        t: do {
          S < 15 && (g += a[c++] << S, S += 8, g += a[c++] << S, S += 8), U = C[g & L];
          e: for (; ; ) {
            if (g >>>= A = U >>> 24, S -= A, (A = U >>> 16 & 255) === 0) N[x++] = 65535 & U;
            else {
              if (!(16 & A)) {
                if (!(64 & A)) {
                  U = C[(65535 & U) + (g & (1 << A) - 1)];
                  continue e;
                }
                if (32 & A) {
                  i.mode = 12;
                  break t;
                }
                e.msg = "invalid literal/length code", i.mode = 30;
                break t;
              }
              Z = 65535 & U, (A &= 15) && (S < A && (g += a[c++] << S, S += 8), Z += g & (1 << A) - 1, g >>>= A, S -= A), S < 15 && (g += a[c++] << S, S += 8, g += a[c++] << S, S += 8), U = R[g & P];
              r: for (; ; ) {
                if (g >>>= A = U >>> 24, S -= A, !(16 & (A = U >>> 16 & 255))) {
                  if (!(64 & A)) {
                    U = R[(65535 & U) + (g & (1 << A) - 1)];
                    continue r;
                  }
                  e.msg = "invalid distance code", i.mode = 30;
                  break t;
                }
                if (tt = 65535 & U, S < (A &= 15) && (g += a[c++] << S, (S += 8) < A && (g += a[c++] << S, S += 8)), h < (tt += g & (1 << A) - 1)) {
                  e.msg = "invalid distance too far back", i.mode = 30;
                  break t;
                }
                if (g >>>= A, S -= A, (A = x - y) < tt) {
                  if (l < (A = tt - A) && i.sane) {
                    e.msg = "invalid distance too far back", i.mode = 30;
                    break t;
                  }
                  if (D = d, (b = 0) === m) {
                    if (b += w - A, A < Z) {
                      for (Z -= A; N[x++] = d[b++], --A; ) ;
                      b = x - tt, D = N;
                    }
                  } else if (m < A) {
                    if (b += w + m - A, (A -= m) < Z) {
                      for (Z -= A; N[x++] = d[b++], --A; ) ;
                      if (b = 0, m < Z) {
                        for (Z -= A = m; N[x++] = d[b++], --A; ) ;
                        b = x - tt, D = N;
                      }
                    }
                  } else if (b += m - A, A < Z) {
                    for (Z -= A; N[x++] = d[b++], --A; ) ;
                    b = x - tt, D = N;
                  }
                  for (; 2 < Z; ) N[x++] = D[b++], N[x++] = D[b++], N[x++] = D[b++], Z -= 3;
                  Z && (N[x++] = D[b++], 1 < Z && (N[x++] = D[b++]));
                } else {
                  for (b = x - tt; N[x++] = N[b++], N[x++] = N[b++], N[x++] = N[b++], 2 < (Z -= 3); ) ;
                  Z && (N[x++] = N[b++], 1 < Z && (N[x++] = N[b++]));
                }
                break;
              }
            }
            break;
          }
        } while (c < _ && x < k);
        c -= Z = S >> 3, g &= (1 << (S -= Z << 3)) - 1, e.next_in = c, e.next_out = x, e.avail_in = c < _ ? _ - c + 5 : 5 - (c - _), e.avail_out = x < k ? k - x + 257 : 257 - (x - k), i.hold = g, i.bits = S;
      };
    }, {}], 49: [function(n, f, u) {
      var e = n("../utils/common"), s = n("./adler32"), i = n("./crc32"), c = n("./inffast"), _ = n("./inftrees"), x = 1, y = 2, k = 0, h = -2, w = 1, l = 852, m = 592;
      function d(b) {
        return (b >>> 24 & 255) + (b >>> 8 & 65280) + ((65280 & b) << 8) + ((255 & b) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new e.Buf16(320), this.work = new e.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function S(b) {
        var D;
        return b && b.state ? (D = b.state, b.total_in = b.total_out = D.total = 0, b.msg = "", D.wrap && (b.adler = 1 & D.wrap), D.mode = w, D.last = 0, D.havedict = 0, D.dmax = 32768, D.head = null, D.hold = 0, D.bits = 0, D.lencode = D.lendyn = new e.Buf32(l), D.distcode = D.distdyn = new e.Buf32(m), D.sane = 1, D.back = -1, k) : h;
      }
      function C(b) {
        var D;
        return b && b.state ? ((D = b.state).wsize = 0, D.whave = 0, D.wnext = 0, S(b)) : h;
      }
      function R(b, D) {
        var a, N;
        return b && b.state ? (N = b.state, D < 0 ? (a = 0, D = -D) : (a = 1 + (D >> 4), D < 48 && (D &= 15)), D && (D < 8 || 15 < D) ? h : (N.window !== null && N.wbits !== D && (N.window = null), N.wrap = a, N.wbits = D, C(b))) : h;
      }
      function L(b, D) {
        var a, N;
        return b ? (N = new g(), (b.state = N).window = null, (a = R(b, D)) !== k && (b.state = null), a) : h;
      }
      var P, U, A = !0;
      function Z(b) {
        if (A) {
          var D;
          for (P = new e.Buf32(512), U = new e.Buf32(32), D = 0; D < 144; ) b.lens[D++] = 8;
          for (; D < 256; ) b.lens[D++] = 9;
          for (; D < 280; ) b.lens[D++] = 7;
          for (; D < 288; ) b.lens[D++] = 8;
          for (_(x, b.lens, 0, 288, P, 0, b.work, { bits: 9 }), D = 0; D < 32; ) b.lens[D++] = 5;
          _(y, b.lens, 0, 32, U, 0, b.work, { bits: 5 }), A = !1;
        }
        b.lencode = P, b.lenbits = 9, b.distcode = U, b.distbits = 5;
      }
      function tt(b, D, a, N) {
        var H, $ = b.state;
        return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new e.Buf8($.wsize)), N >= $.wsize ? (e.arraySet($.window, D, a - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (N < (H = $.wsize - $.wnext) && (H = N), e.arraySet($.window, D, a - N, H, $.wnext), (N -= H) ? (e.arraySet($.window, D, a - N, N, 0), $.wnext = N, $.whave = $.wsize) : ($.wnext += H, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += H))), 0;
      }
      u.inflateReset = C, u.inflateReset2 = R, u.inflateResetKeep = S, u.inflateInit = function(b) {
        return L(b, 15);
      }, u.inflateInit2 = L, u.inflate = function(b, D) {
        var a, N, H, $, at, V, nt, I, T, rt, q, Y, gt, bt, ot, ut, yt, vt, Tt, Rt, t, F, O, v, p = 0, E = new e.Buf8(4), j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!b || !b.state || !b.output || !b.input && b.avail_in !== 0) return h;
        (a = b.state).mode === 12 && (a.mode = 13), at = b.next_out, H = b.output, nt = b.avail_out, $ = b.next_in, N = b.input, V = b.avail_in, I = a.hold, T = a.bits, rt = V, q = nt, F = k;
        t: for (; ; ) switch (a.mode) {
          case w:
            if (a.wrap === 0) {
              a.mode = 13;
              break;
            }
            for (; T < 16; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if (2 & a.wrap && I === 35615) {
              E[a.check = 0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0), T = I = 0, a.mode = 2;
              break;
            }
            if (a.flags = 0, a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & I) << 8) + (I >> 8)) % 31) {
              b.msg = "incorrect header check", a.mode = 30;
              break;
            }
            if ((15 & I) != 8) {
              b.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (T -= 4, t = 8 + (15 & (I >>>= 4)), a.wbits === 0) a.wbits = t;
            else if (t > a.wbits) {
              b.msg = "invalid window size", a.mode = 30;
              break;
            }
            a.dmax = 1 << t, b.adler = a.check = 1, a.mode = 512 & I ? 10 : 12, T = I = 0;
            break;
          case 2:
            for (; T < 16; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if (a.flags = I, (255 & a.flags) != 8) {
              b.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (57344 & a.flags) {
              b.msg = "unknown header flags set", a.mode = 30;
              break;
            }
            a.head && (a.head.text = I >> 8 & 1), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0)), T = I = 0, a.mode = 3;
          case 3:
            for (; T < 32; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            a.head && (a.head.time = I), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, E[2] = I >>> 16 & 255, E[3] = I >>> 24 & 255, a.check = i(a.check, E, 4, 0)), T = I = 0, a.mode = 4;
          case 4:
            for (; T < 16; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            a.head && (a.head.xflags = 255 & I, a.head.os = I >> 8), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0)), T = I = 0, a.mode = 5;
          case 5:
            if (1024 & a.flags) {
              for (; T < 16; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              a.length = I, a.head && (a.head.extra_len = I), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0)), T = I = 0;
            } else a.head && (a.head.extra = null);
            a.mode = 6;
          case 6:
            if (1024 & a.flags && (V < (Y = a.length) && (Y = V), Y && (a.head && (t = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), e.arraySet(a.head.extra, N, $, Y, t)), 512 & a.flags && (a.check = i(a.check, N, Y, $)), V -= Y, $ += Y, a.length -= Y), a.length)) break t;
            a.length = 0, a.mode = 7;
          case 7:
            if (2048 & a.flags) {
              if (V === 0) break t;
              for (Y = 0; t = N[$ + Y++], a.head && t && a.length < 65536 && (a.head.name += String.fromCharCode(t)), t && Y < V; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, Y, $)), V -= Y, $ += Y, t) break t;
            } else a.head && (a.head.name = null);
            a.length = 0, a.mode = 8;
          case 8:
            if (4096 & a.flags) {
              if (V === 0) break t;
              for (Y = 0; t = N[$ + Y++], a.head && t && a.length < 65536 && (a.head.comment += String.fromCharCode(t)), t && Y < V; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, Y, $)), V -= Y, $ += Y, t) break t;
            } else a.head && (a.head.comment = null);
            a.mode = 9;
          case 9:
            if (512 & a.flags) {
              for (; T < 16; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              if (I !== (65535 & a.check)) {
                b.msg = "header crc mismatch", a.mode = 30;
                break;
              }
              T = I = 0;
            }
            a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0), b.adler = a.check = 0, a.mode = 12;
            break;
          case 10:
            for (; T < 32; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            b.adler = a.check = d(I), T = I = 0, a.mode = 11;
          case 11:
            if (a.havedict === 0) return b.next_out = at, b.avail_out = nt, b.next_in = $, b.avail_in = V, a.hold = I, a.bits = T, 2;
            b.adler = a.check = 1, a.mode = 12;
          case 12:
            if (D === 5 || D === 6) break t;
          case 13:
            if (a.last) {
              I >>>= 7 & T, T -= 7 & T, a.mode = 27;
              break;
            }
            for (; T < 3; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            switch (a.last = 1 & I, T -= 1, 3 & (I >>>= 1)) {
              case 0:
                a.mode = 14;
                break;
              case 1:
                if (Z(a), a.mode = 20, D !== 6) break;
                I >>>= 2, T -= 2;
                break t;
              case 2:
                a.mode = 17;
                break;
              case 3:
                b.msg = "invalid block type", a.mode = 30;
            }
            I >>>= 2, T -= 2;
            break;
          case 14:
            for (I >>>= 7 & T, T -= 7 & T; T < 32; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if ((65535 & I) != (I >>> 16 ^ 65535)) {
              b.msg = "invalid stored block lengths", a.mode = 30;
              break;
            }
            if (a.length = 65535 & I, T = I = 0, a.mode = 15, D === 6) break t;
          case 15:
            a.mode = 16;
          case 16:
            if (Y = a.length) {
              if (V < Y && (Y = V), nt < Y && (Y = nt), Y === 0) break t;
              e.arraySet(H, N, $, Y, at), V -= Y, $ += Y, nt -= Y, at += Y, a.length -= Y;
              break;
            }
            a.mode = 12;
            break;
          case 17:
            for (; T < 14; ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if (a.nlen = 257 + (31 & I), I >>>= 5, T -= 5, a.ndist = 1 + (31 & I), I >>>= 5, T -= 5, a.ncode = 4 + (15 & I), I >>>= 4, T -= 4, 286 < a.nlen || 30 < a.ndist) {
              b.msg = "too many length or distance symbols", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 18;
          case 18:
            for (; a.have < a.ncode; ) {
              for (; T < 3; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              a.lens[j[a.have++]] = 7 & I, I >>>= 3, T -= 3;
            }
            for (; a.have < 19; ) a.lens[j[a.have++]] = 0;
            if (a.lencode = a.lendyn, a.lenbits = 7, O = { bits: a.lenbits }, F = _(0, a.lens, 0, 19, a.lencode, 0, a.work, O), a.lenbits = O.bits, F) {
              b.msg = "invalid code lengths set", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 19;
          case 19:
            for (; a.have < a.nlen + a.ndist; ) {
              for (; ut = (p = a.lencode[I & (1 << a.lenbits) - 1]) >>> 16 & 255, yt = 65535 & p, !((ot = p >>> 24) <= T); ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              if (yt < 16) I >>>= ot, T -= ot, a.lens[a.have++] = yt;
              else {
                if (yt === 16) {
                  for (v = ot + 2; T < v; ) {
                    if (V === 0) break t;
                    V--, I += N[$++] << T, T += 8;
                  }
                  if (I >>>= ot, T -= ot, a.have === 0) {
                    b.msg = "invalid bit length repeat", a.mode = 30;
                    break;
                  }
                  t = a.lens[a.have - 1], Y = 3 + (3 & I), I >>>= 2, T -= 2;
                } else if (yt === 17) {
                  for (v = ot + 3; T < v; ) {
                    if (V === 0) break t;
                    V--, I += N[$++] << T, T += 8;
                  }
                  T -= ot, t = 0, Y = 3 + (7 & (I >>>= ot)), I >>>= 3, T -= 3;
                } else {
                  for (v = ot + 7; T < v; ) {
                    if (V === 0) break t;
                    V--, I += N[$++] << T, T += 8;
                  }
                  T -= ot, t = 0, Y = 11 + (127 & (I >>>= ot)), I >>>= 7, T -= 7;
                }
                if (a.have + Y > a.nlen + a.ndist) {
                  b.msg = "invalid bit length repeat", a.mode = 30;
                  break;
                }
                for (; Y--; ) a.lens[a.have++] = t;
              }
            }
            if (a.mode === 30) break;
            if (a.lens[256] === 0) {
              b.msg = "invalid code -- missing end-of-block", a.mode = 30;
              break;
            }
            if (a.lenbits = 9, O = { bits: a.lenbits }, F = _(x, a.lens, 0, a.nlen, a.lencode, 0, a.work, O), a.lenbits = O.bits, F) {
              b.msg = "invalid literal/lengths set", a.mode = 30;
              break;
            }
            if (a.distbits = 6, a.distcode = a.distdyn, O = { bits: a.distbits }, F = _(y, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, O), a.distbits = O.bits, F) {
              b.msg = "invalid distances set", a.mode = 30;
              break;
            }
            if (a.mode = 20, D === 6) break t;
          case 20:
            a.mode = 21;
          case 21:
            if (6 <= V && 258 <= nt) {
              b.next_out = at, b.avail_out = nt, b.next_in = $, b.avail_in = V, a.hold = I, a.bits = T, c(b, q), at = b.next_out, H = b.output, nt = b.avail_out, $ = b.next_in, N = b.input, V = b.avail_in, I = a.hold, T = a.bits, a.mode === 12 && (a.back = -1);
              break;
            }
            for (a.back = 0; ut = (p = a.lencode[I & (1 << a.lenbits) - 1]) >>> 16 & 255, yt = 65535 & p, !((ot = p >>> 24) <= T); ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if (ut && !(240 & ut)) {
              for (vt = ot, Tt = ut, Rt = yt; ut = (p = a.lencode[Rt + ((I & (1 << vt + Tt) - 1) >> vt)]) >>> 16 & 255, yt = 65535 & p, !(vt + (ot = p >>> 24) <= T); ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              I >>>= vt, T -= vt, a.back += vt;
            }
            if (I >>>= ot, T -= ot, a.back += ot, a.length = yt, ut === 0) {
              a.mode = 26;
              break;
            }
            if (32 & ut) {
              a.back = -1, a.mode = 12;
              break;
            }
            if (64 & ut) {
              b.msg = "invalid literal/length code", a.mode = 30;
              break;
            }
            a.extra = 15 & ut, a.mode = 22;
          case 22:
            if (a.extra) {
              for (v = a.extra; T < v; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              a.length += I & (1 << a.extra) - 1, I >>>= a.extra, T -= a.extra, a.back += a.extra;
            }
            a.was = a.length, a.mode = 23;
          case 23:
            for (; ut = (p = a.distcode[I & (1 << a.distbits) - 1]) >>> 16 & 255, yt = 65535 & p, !((ot = p >>> 24) <= T); ) {
              if (V === 0) break t;
              V--, I += N[$++] << T, T += 8;
            }
            if (!(240 & ut)) {
              for (vt = ot, Tt = ut, Rt = yt; ut = (p = a.distcode[Rt + ((I & (1 << vt + Tt) - 1) >> vt)]) >>> 16 & 255, yt = 65535 & p, !(vt + (ot = p >>> 24) <= T); ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              I >>>= vt, T -= vt, a.back += vt;
            }
            if (I >>>= ot, T -= ot, a.back += ot, 64 & ut) {
              b.msg = "invalid distance code", a.mode = 30;
              break;
            }
            a.offset = yt, a.extra = 15 & ut, a.mode = 24;
          case 24:
            if (a.extra) {
              for (v = a.extra; T < v; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              a.offset += I & (1 << a.extra) - 1, I >>>= a.extra, T -= a.extra, a.back += a.extra;
            }
            if (a.offset > a.dmax) {
              b.msg = "invalid distance too far back", a.mode = 30;
              break;
            }
            a.mode = 25;
          case 25:
            if (nt === 0) break t;
            if (Y = q - nt, a.offset > Y) {
              if ((Y = a.offset - Y) > a.whave && a.sane) {
                b.msg = "invalid distance too far back", a.mode = 30;
                break;
              }
              gt = Y > a.wnext ? (Y -= a.wnext, a.wsize - Y) : a.wnext - Y, Y > a.length && (Y = a.length), bt = a.window;
            } else bt = H, gt = at - a.offset, Y = a.length;
            for (nt < Y && (Y = nt), nt -= Y, a.length -= Y; H[at++] = bt[gt++], --Y; ) ;
            a.length === 0 && (a.mode = 21);
            break;
          case 26:
            if (nt === 0) break t;
            H[at++] = a.length, nt--, a.mode = 21;
            break;
          case 27:
            if (a.wrap) {
              for (; T < 32; ) {
                if (V === 0) break t;
                V--, I |= N[$++] << T, T += 8;
              }
              if (q -= nt, b.total_out += q, a.total += q, q && (b.adler = a.check = a.flags ? i(a.check, H, q, at - q) : s(a.check, H, q, at - q)), q = nt, (a.flags ? I : d(I)) !== a.check) {
                b.msg = "incorrect data check", a.mode = 30;
                break;
              }
              T = I = 0;
            }
            a.mode = 28;
          case 28:
            if (a.wrap && a.flags) {
              for (; T < 32; ) {
                if (V === 0) break t;
                V--, I += N[$++] << T, T += 8;
              }
              if (I !== (4294967295 & a.total)) {
                b.msg = "incorrect length check", a.mode = 30;
                break;
              }
              T = I = 0;
            }
            a.mode = 29;
          case 29:
            F = 1;
            break t;
          case 30:
            F = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return h;
        }
        return b.next_out = at, b.avail_out = nt, b.next_in = $, b.avail_in = V, a.hold = I, a.bits = T, (a.wsize || q !== b.avail_out && a.mode < 30 && (a.mode < 27 || D !== 4)) && tt(b, b.output, b.next_out, q - b.avail_out) ? (a.mode = 31, -4) : (rt -= b.avail_in, q -= b.avail_out, b.total_in += rt, b.total_out += q, a.total += q, a.wrap && q && (b.adler = a.check = a.flags ? i(a.check, H, q, b.next_out - q) : s(a.check, H, q, b.next_out - q)), b.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === 12 ? 128 : 0) + (a.mode === 20 || a.mode === 15 ? 256 : 0), (rt == 0 && q === 0 || D === 4) && F === k && (F = -5), F);
      }, u.inflateEnd = function(b) {
        if (!b || !b.state) return h;
        var D = b.state;
        return D.window && (D.window = null), b.state = null, k;
      }, u.inflateGetHeader = function(b, D) {
        var a;
        return b && b.state && 2 & (a = b.state).wrap ? ((a.head = D).done = !1, k) : h;
      }, u.inflateSetDictionary = function(b, D) {
        var a, N = D.length;
        return b && b.state ? (a = b.state).wrap !== 0 && a.mode !== 11 ? h : a.mode === 11 && s(1, D, N, 0) !== a.check ? -3 : tt(b, D, N, N) ? (a.mode = 31, -4) : (a.havedict = 1, k) : h;
      }, u.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(n, f, u) {
      var e = n("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      f.exports = function(x, y, k, h, w, l, m, d) {
        var g, S, C, R, L, P, U, A, Z, tt = d.bits, b = 0, D = 0, a = 0, N = 0, H = 0, $ = 0, at = 0, V = 0, nt = 0, I = 0, T = null, rt = 0, q = new e.Buf16(16), Y = new e.Buf16(16), gt = null, bt = 0;
        for (b = 0; b <= 15; b++) q[b] = 0;
        for (D = 0; D < h; D++) q[y[k + D]]++;
        for (H = tt, N = 15; 1 <= N && q[N] === 0; N--) ;
        if (N < H && (H = N), N === 0) return w[l++] = 20971520, w[l++] = 20971520, d.bits = 1, 0;
        for (a = 1; a < N && q[a] === 0; a++) ;
        for (H < a && (H = a), b = V = 1; b <= 15; b++) if (V <<= 1, (V -= q[b]) < 0) return -1;
        if (0 < V && (x === 0 || N !== 1)) return -1;
        for (Y[1] = 0, b = 1; b < 15; b++) Y[b + 1] = Y[b] + q[b];
        for (D = 0; D < h; D++) y[k + D] !== 0 && (m[Y[y[k + D]]++] = D);
        if (P = x === 0 ? (T = gt = m, 19) : x === 1 ? (T = s, rt -= 257, gt = i, bt -= 257, 256) : (T = c, gt = _, -1), b = a, L = l, at = D = I = 0, C = -1, R = (nt = 1 << ($ = H)) - 1, x === 1 && 852 < nt || x === 2 && 592 < nt) return 1;
        for (; ; ) {
          for (U = b - at, Z = m[D] < P ? (A = 0, m[D]) : m[D] > P ? (A = gt[bt + m[D]], T[rt + m[D]]) : (A = 96, 0), g = 1 << b - at, a = S = 1 << $; w[L + (I >> at) + (S -= g)] = U << 24 | A << 16 | Z | 0, S !== 0; ) ;
          for (g = 1 << b - 1; I & g; ) g >>= 1;
          if (g !== 0 ? (I &= g - 1, I += g) : I = 0, D++, --q[b] == 0) {
            if (b === N) break;
            b = y[k + m[D]];
          }
          if (H < b && (I & R) !== C) {
            for (at === 0 && (at = H), L += a, V = 1 << ($ = b - at); $ + at < N && !((V -= q[$ + at]) <= 0); ) $++, V <<= 1;
            if (nt += 1 << $, x === 1 && 852 < nt || x === 2 && 592 < nt) return 1;
            w[C = I & R] = H << 24 | $ << 16 | L - l | 0;
          }
        }
        return I !== 0 && (w[L + I] = b - at << 24 | 64 << 16 | 0), d.bits = H, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(n, f, u) {
      f.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(n, f, u) {
      var e = n("../utils/common"), s = 0, i = 1;
      function c(p) {
        for (var E = p.length; 0 <= --E; ) p[E] = 0;
      }
      var _ = 0, x = 29, y = 256, k = y + 1 + x, h = 30, w = 19, l = 2 * k + 1, m = 15, d = 16, g = 7, S = 256, C = 16, R = 17, L = 18, P = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], Z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], tt = new Array(2 * (k + 2));
      c(tt);
      var b = new Array(2 * h);
      c(b);
      var D = new Array(512);
      c(D);
      var a = new Array(256);
      c(a);
      var N = new Array(x);
      c(N);
      var H, $, at, V = new Array(h);
      function nt(p, E, j, M, z) {
        this.static_tree = p, this.extra_bits = E, this.extra_base = j, this.elems = M, this.max_length = z, this.has_stree = p && p.length;
      }
      function I(p, E) {
        this.dyn_tree = p, this.max_code = 0, this.stat_desc = E;
      }
      function T(p) {
        return p < 256 ? D[p] : D[256 + (p >>> 7)];
      }
      function rt(p, E) {
        p.pending_buf[p.pending++] = 255 & E, p.pending_buf[p.pending++] = E >>> 8 & 255;
      }
      function q(p, E, j) {
        p.bi_valid > d - j ? (p.bi_buf |= E << p.bi_valid & 65535, rt(p, p.bi_buf), p.bi_buf = E >> d - p.bi_valid, p.bi_valid += j - d) : (p.bi_buf |= E << p.bi_valid & 65535, p.bi_valid += j);
      }
      function Y(p, E, j) {
        q(p, j[2 * E], j[2 * E + 1]);
      }
      function gt(p, E) {
        for (var j = 0; j |= 1 & p, p >>>= 1, j <<= 1, 0 < --E; ) ;
        return j >>> 1;
      }
      function bt(p, E, j) {
        var M, z, G = new Array(m + 1), J = 0;
        for (M = 1; M <= m; M++) G[M] = J = J + j[M - 1] << 1;
        for (z = 0; z <= E; z++) {
          var X = p[2 * z + 1];
          X !== 0 && (p[2 * z] = gt(G[X]++, X));
        }
      }
      function ot(p) {
        var E;
        for (E = 0; E < k; E++) p.dyn_ltree[2 * E] = 0;
        for (E = 0; E < h; E++) p.dyn_dtree[2 * E] = 0;
        for (E = 0; E < w; E++) p.bl_tree[2 * E] = 0;
        p.dyn_ltree[2 * S] = 1, p.opt_len = p.static_len = 0, p.last_lit = p.matches = 0;
      }
      function ut(p) {
        8 < p.bi_valid ? rt(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf), p.bi_buf = 0, p.bi_valid = 0;
      }
      function yt(p, E, j, M) {
        var z = 2 * E, G = 2 * j;
        return p[z] < p[G] || p[z] === p[G] && M[E] <= M[j];
      }
      function vt(p, E, j) {
        for (var M = p.heap[j], z = j << 1; z <= p.heap_len && (z < p.heap_len && yt(E, p.heap[z + 1], p.heap[z], p.depth) && z++, !yt(E, M, p.heap[z], p.depth)); ) p.heap[j] = p.heap[z], j = z, z <<= 1;
        p.heap[j] = M;
      }
      function Tt(p, E, j) {
        var M, z, G, J, X = 0;
        if (p.last_lit !== 0) for (; M = p.pending_buf[p.d_buf + 2 * X] << 8 | p.pending_buf[p.d_buf + 2 * X + 1], z = p.pending_buf[p.l_buf + X], X++, M === 0 ? Y(p, z, E) : (Y(p, (G = a[z]) + y + 1, E), (J = P[G]) !== 0 && q(p, z -= N[G], J), Y(p, G = T(--M), j), (J = U[G]) !== 0 && q(p, M -= V[G], J)), X < p.last_lit; ) ;
        Y(p, S, E);
      }
      function Rt(p, E) {
        var j, M, z, G = E.dyn_tree, J = E.stat_desc.static_tree, X = E.stat_desc.has_stree, et = E.stat_desc.elems, ht = -1;
        for (p.heap_len = 0, p.heap_max = l, j = 0; j < et; j++) G[2 * j] !== 0 ? (p.heap[++p.heap_len] = ht = j, p.depth[j] = 0) : G[2 * j + 1] = 0;
        for (; p.heap_len < 2; ) G[2 * (z = p.heap[++p.heap_len] = ht < 2 ? ++ht : 0)] = 1, p.depth[z] = 0, p.opt_len--, X && (p.static_len -= J[2 * z + 1]);
        for (E.max_code = ht, j = p.heap_len >> 1; 1 <= j; j--) vt(p, G, j);
        for (z = et; j = p.heap[1], p.heap[1] = p.heap[p.heap_len--], vt(p, G, 1), M = p.heap[1], p.heap[--p.heap_max] = j, p.heap[--p.heap_max] = M, G[2 * z] = G[2 * j] + G[2 * M], p.depth[z] = (p.depth[j] >= p.depth[M] ? p.depth[j] : p.depth[M]) + 1, G[2 * j + 1] = G[2 * M + 1] = z, p.heap[1] = z++, vt(p, G, 1), 2 <= p.heap_len; ) ;
        p.heap[--p.heap_max] = p.heap[1], function(lt, Ct) {
          var Nt, W, B, K, ct, dt, _t = Ct.dyn_tree, Ot = Ct.max_code, Pt = Ct.stat_desc.static_tree, Wt = Ct.stat_desc.has_stree, Zt = Ct.stat_desc.extra_bits, Dt = Ct.stat_desc.extra_base, jt = Ct.stat_desc.max_length, Vt = 0;
          for (K = 0; K <= m; K++) lt.bl_count[K] = 0;
          for (_t[2 * lt.heap[lt.heap_max] + 1] = 0, Nt = lt.heap_max + 1; Nt < l; Nt++) jt < (K = _t[2 * _t[2 * (W = lt.heap[Nt]) + 1] + 1] + 1) && (K = jt, Vt++), _t[2 * W + 1] = K, Ot < W || (lt.bl_count[K]++, ct = 0, Dt <= W && (ct = Zt[W - Dt]), dt = _t[2 * W], lt.opt_len += dt * (K + ct), Wt && (lt.static_len += dt * (Pt[2 * W + 1] + ct)));
          if (Vt !== 0) {
            do {
              for (K = jt - 1; lt.bl_count[K] === 0; ) K--;
              lt.bl_count[K]--, lt.bl_count[K + 1] += 2, lt.bl_count[jt]--, Vt -= 2;
            } while (0 < Vt);
            for (K = jt; K !== 0; K--) for (W = lt.bl_count[K]; W !== 0; ) Ot < (B = lt.heap[--Nt]) || (_t[2 * B + 1] !== K && (lt.opt_len += (K - _t[2 * B + 1]) * _t[2 * B], _t[2 * B + 1] = K), W--);
          }
        }(p, E), bt(G, ht, p.bl_count);
      }
      function t(p, E, j) {
        var M, z, G = -1, J = E[1], X = 0, et = 7, ht = 4;
        for (J === 0 && (et = 138, ht = 3), E[2 * (j + 1) + 1] = 65535, M = 0; M <= j; M++) z = J, J = E[2 * (M + 1) + 1], ++X < et && z === J || (X < ht ? p.bl_tree[2 * z] += X : z !== 0 ? (z !== G && p.bl_tree[2 * z]++, p.bl_tree[2 * C]++) : X <= 10 ? p.bl_tree[2 * R]++ : p.bl_tree[2 * L]++, G = z, ht = (X = 0) === J ? (et = 138, 3) : z === J ? (et = 6, 3) : (et = 7, 4));
      }
      function F(p, E, j) {
        var M, z, G = -1, J = E[1], X = 0, et = 7, ht = 4;
        for (J === 0 && (et = 138, ht = 3), M = 0; M <= j; M++) if (z = J, J = E[2 * (M + 1) + 1], !(++X < et && z === J)) {
          if (X < ht) for (; Y(p, z, p.bl_tree), --X != 0; ) ;
          else z !== 0 ? (z !== G && (Y(p, z, p.bl_tree), X--), Y(p, C, p.bl_tree), q(p, X - 3, 2)) : X <= 10 ? (Y(p, R, p.bl_tree), q(p, X - 3, 3)) : (Y(p, L, p.bl_tree), q(p, X - 11, 7));
          G = z, ht = (X = 0) === J ? (et = 138, 3) : z === J ? (et = 6, 3) : (et = 7, 4);
        }
      }
      c(V);
      var O = !1;
      function v(p, E, j, M) {
        q(p, (_ << 1) + (M ? 1 : 0), 3), function(z, G, J, X) {
          ut(z), rt(z, J), rt(z, ~J), e.arraySet(z.pending_buf, z.window, G, J, z.pending), z.pending += J;
        }(p, E, j);
      }
      u._tr_init = function(p) {
        O || (function() {
          var E, j, M, z, G, J = new Array(m + 1);
          for (z = M = 0; z < x - 1; z++) for (N[z] = M, E = 0; E < 1 << P[z]; E++) a[M++] = z;
          for (a[M - 1] = z, z = G = 0; z < 16; z++) for (V[z] = G, E = 0; E < 1 << U[z]; E++) D[G++] = z;
          for (G >>= 7; z < h; z++) for (V[z] = G << 7, E = 0; E < 1 << U[z] - 7; E++) D[256 + G++] = z;
          for (j = 0; j <= m; j++) J[j] = 0;
          for (E = 0; E <= 143; ) tt[2 * E + 1] = 8, E++, J[8]++;
          for (; E <= 255; ) tt[2 * E + 1] = 9, E++, J[9]++;
          for (; E <= 279; ) tt[2 * E + 1] = 7, E++, J[7]++;
          for (; E <= 287; ) tt[2 * E + 1] = 8, E++, J[8]++;
          for (bt(tt, k + 1, J), E = 0; E < h; E++) b[2 * E + 1] = 5, b[2 * E] = gt(E, 5);
          H = new nt(tt, P, y + 1, k, m), $ = new nt(b, U, 0, h, m), at = new nt(new Array(0), A, 0, w, g);
        }(), O = !0), p.l_desc = new I(p.dyn_ltree, H), p.d_desc = new I(p.dyn_dtree, $), p.bl_desc = new I(p.bl_tree, at), p.bi_buf = 0, p.bi_valid = 0, ot(p);
      }, u._tr_stored_block = v, u._tr_flush_block = function(p, E, j, M) {
        var z, G, J = 0;
        0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(X) {
          var et, ht = 4093624447;
          for (et = 0; et <= 31; et++, ht >>>= 1) if (1 & ht && X.dyn_ltree[2 * et] !== 0) return s;
          if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return i;
          for (et = 32; et < y; et++) if (X.dyn_ltree[2 * et] !== 0) return i;
          return s;
        }(p)), Rt(p, p.l_desc), Rt(p, p.d_desc), J = function(X) {
          var et;
          for (t(X, X.dyn_ltree, X.l_desc.max_code), t(X, X.dyn_dtree, X.d_desc.max_code), Rt(X, X.bl_desc), et = w - 1; 3 <= et && X.bl_tree[2 * Z[et] + 1] === 0; et--) ;
          return X.opt_len += 3 * (et + 1) + 5 + 5 + 4, et;
        }(p), z = p.opt_len + 3 + 7 >>> 3, (G = p.static_len + 3 + 7 >>> 3) <= z && (z = G)) : z = G = j + 5, j + 4 <= z && E !== -1 ? v(p, E, j, M) : p.strategy === 4 || G === z ? (q(p, 2 + (M ? 1 : 0), 3), Tt(p, tt, b)) : (q(p, 4 + (M ? 1 : 0), 3), function(X, et, ht, lt) {
          var Ct;
          for (q(X, et - 257, 5), q(X, ht - 1, 5), q(X, lt - 4, 4), Ct = 0; Ct < lt; Ct++) q(X, X.bl_tree[2 * Z[Ct] + 1], 3);
          F(X, X.dyn_ltree, et - 1), F(X, X.dyn_dtree, ht - 1);
        }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, J + 1), Tt(p, p.dyn_ltree, p.dyn_dtree)), ot(p), M && ut(p);
      }, u._tr_tally = function(p, E, j) {
        return p.pending_buf[p.d_buf + 2 * p.last_lit] = E >>> 8 & 255, p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & E, p.pending_buf[p.l_buf + p.last_lit] = 255 & j, p.last_lit++, E === 0 ? p.dyn_ltree[2 * j]++ : (p.matches++, E--, p.dyn_ltree[2 * (a[j] + y + 1)]++, p.dyn_dtree[2 * T(E)]++), p.last_lit === p.lit_bufsize - 1;
      }, u._tr_align = function(p) {
        q(p, 2, 3), Y(p, S, tt), function(E) {
          E.bi_valid === 16 ? (rt(E, E.bi_buf), E.bi_buf = 0, E.bi_valid = 0) : 8 <= E.bi_valid && (E.pending_buf[E.pending++] = 255 & E.bi_buf, E.bi_buf >>= 8, E.bi_valid -= 8);
        }(p);
      };
    }, { "../utils/common": 41 }], 53: [function(n, f, u) {
      f.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(n, f, u) {
      (function(e) {
        (function(s, i) {
          if (!s.setImmediate) {
            var c, _, x, y, k = 1, h = {}, w = !1, l = s.document, m = Object.getPrototypeOf && Object.getPrototypeOf(s);
            m = m && m.setTimeout ? m : s, c = {}.toString.call(s.process) === "[object process]" ? function(C) {
              process.nextTick(function() {
                g(C);
              });
            } : function() {
              if (s.postMessage && !s.importScripts) {
                var C = !0, R = s.onmessage;
                return s.onmessage = function() {
                  C = !1;
                }, s.postMessage("", "*"), s.onmessage = R, C;
              }
            }() ? (y = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", S, !1) : s.attachEvent("onmessage", S), function(C) {
              s.postMessage(y + C, "*");
            }) : s.MessageChannel ? ((x = new MessageChannel()).port1.onmessage = function(C) {
              g(C.data);
            }, function(C) {
              x.port2.postMessage(C);
            }) : l && "onreadystatechange" in l.createElement("script") ? (_ = l.documentElement, function(C) {
              var R = l.createElement("script");
              R.onreadystatechange = function() {
                g(C), R.onreadystatechange = null, _.removeChild(R), R = null;
              }, _.appendChild(R);
            }) : function(C) {
              setTimeout(g, 0, C);
            }, m.setImmediate = function(C) {
              typeof C != "function" && (C = new Function("" + C));
              for (var R = new Array(arguments.length - 1), L = 0; L < R.length; L++) R[L] = arguments[L + 1];
              var P = { callback: C, args: R };
              return h[k] = P, c(k), k++;
            }, m.clearImmediate = d;
          }
          function d(C) {
            delete h[C];
          }
          function g(C) {
            if (w) setTimeout(g, 0, C);
            else {
              var R = h[C];
              if (R) {
                w = !0;
                try {
                  (function(L) {
                    var P = L.callback, U = L.args;
                    switch (U.length) {
                      case 0:
                        P();
                        break;
                      case 1:
                        P(U[0]);
                        break;
                      case 2:
                        P(U[0], U[1]);
                        break;
                      case 3:
                        P(U[0], U[1], U[2]);
                        break;
                      default:
                        P.apply(i, U);
                    }
                  })(R);
                } finally {
                  d(C), w = !1;
                }
              }
            }
          }
          function S(C) {
            C.source === s && typeof C.data == "string" && C.data.indexOf(y) === 0 && g(+C.data.slice(y.length));
          }
        })(typeof self > "u" ? e === void 0 ? this : e : self);
      }).call(this, typeof Qt < "u" ? Qt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Re);
var Ye = Re.exports;
const Ke = /* @__PURE__ */ Xe(Ye);
function qe(r = {}) {
  const {
    storageKey: o = "page-reviews",
    defaultPagePath: n = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = r;
  function f() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function u() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(o);
      return g ? JSON.parse(g) : [];
    } catch {
      return [];
    }
  }
  function e(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(o, JSON.stringify(g));
      } catch {
      }
  }
  const s = St(u()), i = () => s.value;
  function c(g) {
    const S = g || n();
    return s.value.filter((C) => C.pagePath === S);
  }
  function _(g) {
    const S = {
      id: f(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s.value.unshift(S), e(s.value), S;
  }
  function x(g, S) {
    const C = s.value.findIndex((R) => R.id === g);
    C > -1 && (s.value[C] = { ...s.value[C], ...S }, e(s.value));
  }
  function y(g) {
    s.value = s.value.filter((S) => S.id !== g), e(s.value);
  }
  function k(g) {
    const S = g || n();
    s.value = s.value.filter((C) => C.pagePath !== S), e(s.value);
  }
  function h() {
    s.value = [], e(s.value);
  }
  function w() {
    return {
      exportTime: (/* @__PURE__ */ new Date()).toISOString(),
      total: s.value.length,
      reviews: s.value
    };
  }
  function l() {
    ae(
      new Blob([JSON.stringify(w(), null, 2)], { type: "application/json" }),
      `page-reviews-${se()}.json`
    );
  }
  function m() {
    const g = we(w());
    ae(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${se()}.md`
    );
  }
  async function d() {
    const g = new Ke(), S = w(), C = {
      ...S,
      reviews: S.reviews.map((P) => {
        var U;
        return {
          ...P,
          screenshots: (U = P.screenshots) == null ? void 0 : U.map((A) => A.url ? { type: A.type, filename: A.filename, url: A.url } : { type: A.type, filename: A.filename, imagePath: `images/${A.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(C, null, 2)), g.file("review.md", we(C));
    const R = g.folder("images");
    for (const P of S.reviews)
      for (const U of P.screenshots || [])
        if (U.data && !U.url) {
          const A = U.data.replace(/^data:image\/png;base64,/, "");
          R.file(U.filename, A, { base64: !0 });
        }
    const L = await g.generateAsync({ type: "blob" });
    ae(L, `page-reviews-${se()}.zip`);
  }
  return {
    reviews: s,
    allReviews: i,
    getPageReviews: c,
    addReview: _,
    updateReview: x,
    deleteReview: y,
    clearPageReviews: k,
    clearAllReviews: h,
    exportToJSON: l,
    exportToMarkdown: m,
    exportToZIP: d
  };
}
function we(r) {
  const o = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${r.total}`,
    ""
  ], n = Qe(r.reviews, "pagePath");
  return Object.entries(n).forEach(([f, u]) => {
    o.push(`## 页面：${f}`), o.push(""), u.forEach((e, s) => {
      var i, c, _, x;
      o.push(`### ${s + 1}. ${e.title || "未命名评审"}`), o.push(`- **类型**：${e.type === "element" ? "元素评审" : "视图范围评审"}`), o.push(`- **严重等级**：${Je(e.severity)}`), o.push(`- **状态**：${e.status === "resolved" ? "已解决" : "待处理"}`), o.push(`- **窗口尺寸**：${(i = e.viewport) == null ? void 0 : i.width} × ${(c = e.viewport) == null ? void 0 : c.height}`), e.scroll && o.push(`- **滚动位置**：x=${e.scroll.x}, y=${e.scroll.y}`), e.type === "element" && e.elementRect ? (o.push(`- **元素选择器**：\`${e.selector}\``), o.push(`- **元素位置**：x=${e.elementRect.x}, y=${e.elementRect.y}, width=${e.elementRect.width}, height=${e.elementRect.height}`), e.elementText && o.push(`- **元素文本**：${e.elementText}`)) : e.viewportRect && o.push(`- **框选范围**：x=${e.viewportRect.x}, y=${e.viewportRect.y}, width=${e.viewportRect.width}, height=${e.viewportRect.height}`), o.push(`- **评审建议**：${e.suggestion}`), o.push(`- **创建时间**：${new Date(e.createdAt).toLocaleString()}`), e.locators && Object.keys(e.locators).length > 0 && (o.push(""), o.push("#### 定位信息"), e.locators.cssSelector && o.push(`- **CSS Selector**: \`${e.locators.cssSelector}\``), e.locators.xpath && o.push(`- **XPath**: \`${e.locators.xpath}\``), (_ = e.locators.aria) != null && _.role && o.push(`- **ARIA Role**: ${e.locators.aria.role}`), (x = e.locators.aria) != null && x.accessibleName && o.push(`- **Accessible Name**: ${e.locators.aria.accessibleName}`), e.locators.testId && o.push(`- **data-testid**: ${e.locators.testId}`)), e.screenshots && e.screenshots.length > 0 && (o.push(""), o.push("#### 截图"), e.screenshots.forEach((y) => {
        const k = y.url || y.imagePath || `images/${y.filename}`;
        o.push(`![${y.type}](${k})`);
      })), o.push("");
    });
  }), o.join(`
`);
}
function ae(r, o) {
  if (typeof window > "u") return;
  const n = URL.createObjectURL(r), f = document.createElement("a");
  f.href = n, f.download = o, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(n);
}
function se() {
  const r = /* @__PURE__ */ new Date();
  return `${r.getFullYear()}${ee(r.getMonth() + 1)}${ee(r.getDate())}-${ee(r.getHours())}${ee(r.getMinutes())}`;
}
function ee(r) {
  return String(r).padStart(2, "0");
}
function Je(r) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[r] || r;
}
function Qe(r, o) {
  return r.reduce((n, f) => {
    const u = f[o] || "unknown";
    return n[u] || (n[u] = []), n[u].push(f), n;
  }, {});
}
function tr(r, o) {
  if (r.match(/^[a-z]+:\/\//i))
    return r;
  if (r.match(/^\/\//))
    return window.location.protocol + r;
  if (r.match(/^[a-z]+:/i))
    return r;
  const n = document.implementation.createHTMLDocument(), f = n.createElement("base"), u = n.createElement("a");
  return n.head.appendChild(f), n.body.appendChild(u), o && (f.href = o), u.href = r, u.href;
}
const er = /* @__PURE__ */ (() => {
  let r = 0;
  const o = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (r += 1, `u${o()}${r}`);
})();
function Ut(r) {
  const o = [];
  for (let n = 0, f = r.length; n < f; n++)
    o.push(r[n]);
  return o;
}
let Xt = null;
function ze(r = {}) {
  return Xt || (r.includeStyleProperties ? (Xt = r.includeStyleProperties, Xt) : (Xt = Ut(window.getComputedStyle(document.documentElement)), Xt));
}
function re(r, o) {
  const f = (r.ownerDocument.defaultView || window).getComputedStyle(r).getPropertyValue(o);
  return f ? parseFloat(f.replace("px", "")) : 0;
}
function rr(r) {
  const o = re(r, "border-left-width"), n = re(r, "border-right-width");
  return r.clientWidth + o + n;
}
function nr(r) {
  const o = re(r, "border-top-width"), n = re(r, "border-bottom-width");
  return r.clientHeight + o + n;
}
function Ae(r, o = {}) {
  const n = o.width || rr(r), f = o.height || nr(r);
  return { width: n, height: f };
}
function ir() {
  let r, o;
  try {
    o = process;
  } catch {
  }
  const n = o && o.env ? o.env.devicePixelRatio : null;
  return n && (r = parseInt(n, 10), Number.isNaN(r) && (r = 1)), r || window.devicePixelRatio || 1;
}
const It = 16384;
function ar(r) {
  (r.width > It || r.height > It) && (r.width > It && r.height > It ? r.width > r.height ? (r.height *= It / r.width, r.width = It) : (r.width *= It / r.height, r.height = It) : r.width > It ? (r.height *= It / r.width, r.width = It) : (r.width *= It / r.height, r.height = It));
}
function ne(r) {
  return new Promise((o, n) => {
    const f = new Image();
    f.onload = () => {
      f.decode().then(() => {
        requestAnimationFrame(() => o(f));
      });
    }, f.onerror = n, f.crossOrigin = "anonymous", f.decoding = "async", f.src = r;
  });
}
async function sr(r) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(r)).then(encodeURIComponent).then((o) => `data:image/svg+xml;charset=utf-8,${o}`);
}
async function or(r, o, n) {
  const f = "http://www.w3.org/2000/svg", u = document.createElementNS(f, "svg"), e = document.createElementNS(f, "foreignObject");
  return u.setAttribute("width", `${o}`), u.setAttribute("height", `${n}`), u.setAttribute("viewBox", `0 0 ${o} ${n}`), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("externalResourcesRequired", "true"), u.appendChild(e), e.appendChild(r), sr(u);
}
const At = (r, o) => {
  if (r instanceof o)
    return !0;
  const n = Object.getPrototypeOf(r);
  return n === null ? !1 : n.constructor.name === o.name || At(n, o);
};
function lr(r) {
  const o = r.getPropertyValue("content");
  return `${r.cssText} content: '${o.replace(/'|"/g, "")}';`;
}
function ur(r, o) {
  return ze(o).map((n) => {
    const f = r.getPropertyValue(n), u = r.getPropertyPriority(n);
    return `${n}: ${f}${u ? " !important" : ""};`;
  }).join(" ");
}
function cr(r, o, n, f) {
  const u = `.${r}:${o}`, e = n.cssText ? lr(n) : ur(n, f);
  return document.createTextNode(`${u}{${e}}`);
}
function _e(r, o, n, f) {
  const u = window.getComputedStyle(r, n), e = u.getPropertyValue("content");
  if (e === "" || e === "none")
    return;
  const s = er();
  try {
    o.className = `${o.className} ${s}`;
  } catch {
    return;
  }
  const i = document.createElement("style");
  i.appendChild(cr(s, n, u, f)), o.appendChild(i);
}
function hr(r, o, n) {
  _e(r, o, ":before", n), _e(r, o, ":after", n);
}
const ye = "application/font-woff", be = "image/jpeg", fr = {
  woff: ye,
  woff2: ye,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: be,
  jpeg: be,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function dr(r) {
  const o = /\.([^./]*?)$/g.exec(r);
  return o ? o[1] : "";
}
function ue(r) {
  const o = dr(r).toLowerCase();
  return fr[o] || "";
}
function pr(r) {
  return r.split(/,/)[1];
}
function le(r) {
  return r.search(/^(data:)/) !== -1;
}
function mr(r, o) {
  return `data:${o};base64,${r}`;
}
async function Te(r, o, n) {
  const f = await fetch(r, o);
  if (f.status === 404)
    throw new Error(`Resource "${f.url}" not found`);
  const u = await f.blob();
  return new Promise((e, s) => {
    const i = new FileReader();
    i.onerror = s, i.onloadend = () => {
      try {
        e(n({ res: f, result: i.result }));
      } catch (c) {
        s(c);
      }
    }, i.readAsDataURL(u);
  });
}
const oe = {};
function gr(r, o, n) {
  let f = r.replace(/\?.*/, "");
  return n && (f = r), /ttf|otf|eot|woff2?/i.test(f) && (f = f.replace(/.*\//, "")), o ? `[${o}]${f}` : f;
}
async function ce(r, o, n) {
  const f = gr(r, o, n.includeQueryParams);
  if (oe[f] != null)
    return oe[f];
  n.cacheBust && (r += (/\?/.test(r) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let u;
  try {
    const e = await Te(r, n.fetchRequestInit, ({ res: s, result: i }) => (o || (o = s.headers.get("Content-Type") || ""), pr(i)));
    u = mr(e, o);
  } catch (e) {
    u = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${r}`;
    e && (s = typeof e == "string" ? e : e.message), s && console.warn(s);
  }
  return oe[f] = u, u;
}
async function vr(r) {
  const o = r.toDataURL();
  return o === "data:," ? r.cloneNode(!1) : ne(o);
}
async function wr(r, o) {
  if (r.currentSrc) {
    const e = document.createElement("canvas"), s = e.getContext("2d");
    e.width = r.clientWidth, e.height = r.clientHeight, s == null || s.drawImage(r, 0, 0, e.width, e.height);
    const i = e.toDataURL();
    return ne(i);
  }
  const n = r.poster, f = ue(n), u = await ce(n, f, o);
  return ne(u);
}
async function _r(r, o) {
  var n;
  try {
    if (!((n = r == null ? void 0 : r.contentDocument) === null || n === void 0) && n.body)
      return await ie(r.contentDocument.body, o, !0);
  } catch {
  }
  return r.cloneNode(!1);
}
async function yr(r, o) {
  return At(r, HTMLCanvasElement) ? vr(r) : At(r, HTMLVideoElement) ? wr(r, o) : At(r, HTMLIFrameElement) ? _r(r, o) : r.cloneNode(Ie(r));
}
const br = (r) => r.tagName != null && r.tagName.toUpperCase() === "SLOT", Ie = (r) => r.tagName != null && r.tagName.toUpperCase() === "SVG";
async function kr(r, o, n) {
  var f, u;
  if (Ie(o))
    return o;
  let e = [];
  return br(r) && r.assignedNodes ? e = Ut(r.assignedNodes()) : At(r, HTMLIFrameElement) && (!((f = r.contentDocument) === null || f === void 0) && f.body) ? e = Ut(r.contentDocument.body.childNodes) : e = Ut(((u = r.shadowRoot) !== null && u !== void 0 ? u : r).childNodes), e.length === 0 || At(r, HTMLVideoElement) || await e.reduce((s, i) => s.then(() => ie(i, n)).then((c) => {
    c && o.appendChild(c);
  }), Promise.resolve()), o;
}
function xr(r, o, n) {
  const f = o.style;
  if (!f)
    return;
  const u = window.getComputedStyle(r);
  u.cssText ? (f.cssText = u.cssText, f.transformOrigin = u.transformOrigin) : ze(n).forEach((e) => {
    let s = u.getPropertyValue(e);
    e === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), At(r, HTMLIFrameElement) && e === "display" && s === "inline" && (s = "block"), e === "d" && o.getAttribute("d") && (s = `path(${o.getAttribute("d")})`), f.setProperty(e, s, u.getPropertyPriority(e));
  });
}
function Sr(r, o) {
  At(r, HTMLTextAreaElement) && (o.innerHTML = r.value), At(r, HTMLInputElement) && o.setAttribute("value", r.value);
}
function Er(r, o) {
  if (At(r, HTMLSelectElement)) {
    const n = o, f = Array.from(n.children).find((u) => r.value === u.getAttribute("value"));
    f && f.setAttribute("selected", "");
  }
}
function Cr(r, o, n) {
  return At(o, Element) && (xr(r, o, n), hr(r, o, n), Sr(r, o), Er(r, o)), o;
}
async function Rr(r, o) {
  const n = r.querySelectorAll ? r.querySelectorAll("use") : [];
  if (n.length === 0)
    return r;
  const f = {};
  for (let e = 0; e < n.length; e++) {
    const i = n[e].getAttribute("xlink:href");
    if (i) {
      const c = r.querySelector(i), _ = document.querySelector(i);
      !c && _ && !f[i] && (f[i] = await ie(_, o, !0));
    }
  }
  const u = Object.values(f);
  if (u.length) {
    const e = "http://www.w3.org/1999/xhtml", s = document.createElementNS(e, "svg");
    s.setAttribute("xmlns", e), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const i = document.createElementNS(e, "defs");
    s.appendChild(i);
    for (let c = 0; c < u.length; c++)
      i.appendChild(u[c]);
    r.appendChild(s);
  }
  return r;
}
async function ie(r, o, n) {
  return !n && o.filter && !o.filter(r) ? null : Promise.resolve(r).then((f) => yr(f, o)).then((f) => kr(r, f, o)).then((f) => Cr(r, f, o)).then((f) => Rr(f, o));
}
const Oe = /url\((['"]?)([^'"]+?)\1\)/g, zr = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Ar = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Tr(r) {
  const o = r.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${o})(['"]?\\))`, "g");
}
function Ir(r) {
  const o = [];
  return r.replace(Oe, (n, f, u) => (o.push(u), n)), o.filter((n) => !le(n));
}
async function Or(r, o, n, f, u) {
  try {
    const e = n ? tr(o, n) : o, s = ue(o);
    let i;
    return u || (i = await ce(e, s, f)), r.replace(Tr(o), `$1${i}$3`);
  } catch {
  }
  return r;
}
function Br(r, { preferredFontFormat: o }) {
  return o ? r.replace(Ar, (n) => {
    for (; ; ) {
      const [f, , u] = zr.exec(n) || [];
      if (!u)
        return "";
      if (u === o)
        return `src: ${f};`;
    }
  }) : r;
}
function Be(r) {
  return r.search(Oe) !== -1;
}
async function Pe(r, o, n) {
  if (!Be(r))
    return r;
  const f = Br(r, n);
  return Ir(f).reduce((e, s) => e.then((i) => Or(i, s, o, n)), Promise.resolve(f));
}
async function Yt(r, o, n) {
  var f;
  const u = (f = o.style) === null || f === void 0 ? void 0 : f.getPropertyValue(r);
  if (u) {
    const e = await Pe(u, null, n);
    return o.style.setProperty(r, e, o.style.getPropertyPriority(r)), !0;
  }
  return !1;
}
async function Pr(r, o) {
  await Yt("background", r, o) || await Yt("background-image", r, o), await Yt("mask", r, o) || await Yt("-webkit-mask", r, o) || await Yt("mask-image", r, o) || await Yt("-webkit-mask-image", r, o);
}
async function Dr(r, o) {
  const n = At(r, HTMLImageElement);
  if (!(n && !le(r.src)) && !(At(r, SVGImageElement) && !le(r.href.baseVal)))
    return;
  const f = n ? r.src : r.href.baseVal, u = await ce(f, ue(f), o);
  await new Promise((e, s) => {
    r.onload = e, r.onerror = o.onImageErrorHandler ? (...c) => {
      try {
        e(o.onImageErrorHandler(...c));
      } catch (_) {
        s(_);
      }
    } : s;
    const i = r;
    i.decode && (i.decode = e), i.loading === "lazy" && (i.loading = "eager"), n ? (r.srcset = "", r.src = u) : r.href.baseVal = u;
  });
}
async function Lr(r, o) {
  const f = Ut(r.childNodes).map((u) => De(u, o));
  await Promise.all(f).then(() => r);
}
async function De(r, o) {
  At(r, Element) && (await Pr(r, o), await Dr(r, o), await Lr(r, o));
}
function Fr(r, o) {
  const { style: n } = r;
  o.backgroundColor && (n.backgroundColor = o.backgroundColor), o.width && (n.width = `${o.width}px`), o.height && (n.height = `${o.height}px`);
  const f = o.style;
  return f != null && Object.keys(f).forEach((u) => {
    n[u] = f[u];
  }), r;
}
const ke = {};
async function xe(r) {
  let o = ke[r];
  if (o != null)
    return o;
  const f = await (await fetch(r)).text();
  return o = { url: r, cssText: f }, ke[r] = o, o;
}
async function Se(r, o) {
  let n = r.cssText;
  const f = /url\(["']?([^"')]+)["']?\)/g, e = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let i = s.replace(f, "$1");
    return i.startsWith("https://") || (i = new URL(i, r.url).href), Te(i, o.fetchRequestInit, ({ result: c }) => (n = n.replace(s, `url(${c})`), [s, c]));
  });
  return Promise.all(e).then(() => n);
}
function Ee(r) {
  if (r == null)
    return [];
  const o = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let f = r.replace(n, "");
  const u = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const c = u.exec(f);
    if (c === null)
      break;
    o.push(c[0]);
  }
  f = f.replace(u, "");
  const e = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", i = new RegExp(s, "gi");
  for (; ; ) {
    let c = e.exec(f);
    if (c === null) {
      if (c = i.exec(f), c === null)
        break;
      e.lastIndex = i.lastIndex;
    } else
      i.lastIndex = e.lastIndex;
    o.push(c[0]);
  }
  return o;
}
async function Nr(r, o) {
  const n = [], f = [];
  return r.forEach((u) => {
    if ("cssRules" in u)
      try {
        Ut(u.cssRules || []).forEach((e, s) => {
          if (e.type === CSSRule.IMPORT_RULE) {
            let i = s + 1;
            const c = e.href, _ = xe(c).then((x) => Se(x, o)).then((x) => Ee(x).forEach((y) => {
              try {
                u.insertRule(y, y.startsWith("@import") ? i += 1 : u.cssRules.length);
              } catch (k) {
                console.error("Error inserting rule from remote css", {
                  rule: y,
                  error: k
                });
              }
            })).catch((x) => {
              console.error("Error loading remote css", x.toString());
            });
            f.push(_);
          }
        });
      } catch (e) {
        const s = r.find((i) => i.href == null) || document.styleSheets[0];
        u.href != null && f.push(xe(u.href).then((i) => Se(i, o)).then((i) => Ee(i).forEach((c) => {
          s.insertRule(c, s.cssRules.length);
        })).catch((i) => {
          console.error("Error loading remote stylesheet", i);
        })), console.error("Error inlining remote css file", e);
      }
  }), Promise.all(f).then(() => (r.forEach((u) => {
    if ("cssRules" in u)
      try {
        Ut(u.cssRules || []).forEach((e) => {
          n.push(e);
        });
      } catch (e) {
        console.error(`Error while reading CSS rules from ${u.href}`, e);
      }
  }), n));
}
function Ur(r) {
  return r.filter((o) => o.type === CSSRule.FONT_FACE_RULE).filter((o) => Be(o.style.getPropertyValue("src")));
}
async function jr(r, o) {
  if (r.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ut(r.ownerDocument.styleSheets), f = await Nr(n, o);
  return Ur(f);
}
function Le(r) {
  return r.trim().replace(/["']/g, "");
}
function Mr(r) {
  const o = /* @__PURE__ */ new Set();
  function n(f) {
    (f.style.fontFamily || getComputedStyle(f).fontFamily).split(",").forEach((e) => {
      o.add(Le(e));
    }), Array.from(f.children).forEach((e) => {
      e instanceof HTMLElement && n(e);
    });
  }
  return n(r), o;
}
async function $r(r, o) {
  const n = await jr(r, o), f = Mr(r);
  return (await Promise.all(n.filter((e) => f.has(Le(e.style.fontFamily))).map((e) => {
    const s = e.parentStyleSheet ? e.parentStyleSheet.href : null;
    return Pe(e.cssText, s, o);
  }))).join(`
`);
}
async function Wr(r, o) {
  const n = o.fontEmbedCSS != null ? o.fontEmbedCSS : o.skipFonts ? null : await $r(r, o);
  if (n) {
    const f = document.createElement("style"), u = document.createTextNode(n);
    f.appendChild(u), r.firstChild ? r.insertBefore(f, r.firstChild) : r.appendChild(f);
  }
}
async function Zr(r, o = {}) {
  const { width: n, height: f } = Ae(r, o), u = await ie(r, o, !0);
  return await Wr(u, o), await De(u, o), Fr(u, o), await or(u, n, f);
}
async function Vr(r, o = {}) {
  const { width: n, height: f } = Ae(r, o), u = await Zr(r, o), e = await ne(u), s = document.createElement("canvas"), i = s.getContext("2d"), c = o.pixelRatio || ir(), _ = o.canvasWidth || n, x = o.canvasHeight || f;
  return s.width = _ * c, s.height = x * c, o.skipAutoScale || ar(s), s.style.width = `${_}`, s.style.height = `${x}`, o.backgroundColor && (i.fillStyle = o.backgroundColor, i.fillRect(0, 0, s.width, s.height)), i.drawImage(e, 0, 0, s.width, s.height), s;
}
async function he(r, o = {}) {
  return (await Vr(r, o)).toDataURL();
}
const Ft = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box"
};
function Hr(r) {
  const o = Date.now(), n = Math.random().toString(36).slice(2, 6);
  return `screenshot-${r}-${o}-${n}.png`;
}
async function Fe(r, o = {}) {
  if (!r) return null;
  try {
    return await he(r, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
  } catch (n) {
    return console.error("captureElement failed:", n), null;
  }
}
async function Gr(r = {}) {
  const o = document.documentElement;
  return Fe(o, {
    width: window.innerWidth,
    height: window.innerHeight,
    style: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: "hidden"
    },
    ...r
  });
}
async function Xr(r = {}) {
  const o = document.documentElement, n = o.style.overflow, f = o.style.width, u = o.style.height;
  try {
    return o.style.overflow = "visible", o.style.width = "auto", o.style.height = "auto", await he(o, {
      pixelRatio: r.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...r
    });
  } catch (e) {
    return console.error("captureFullPage failed:", e), null;
  } finally {
    o.style.overflow = n, o.style.width = f, o.style.height = u;
  }
}
async function Yr(r, o = {}) {
  if (!r || r.width < 1 || r.height < 1) return null;
  const n = document.documentElement, f = n.style.overflow, u = n.style.width, e = n.style.height;
  try {
    n.style.overflow = "visible", n.style.width = "auto", n.style.height = "auto";
    const s = await he(n, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
    return Kr(s, r);
  } catch (s) {
    return console.error("captureBox failed:", s), null;
  } finally {
    n.style.overflow = f, n.style.width = u, n.style.height = e;
  }
}
function Kr(r, o) {
  return new Promise((n, f) => {
    const u = new Image();
    u.onload = () => {
      const e = document.createElement("canvas"), s = window.devicePixelRatio || 1;
      e.width = Math.round(o.width * s), e.height = Math.round(o.height * s), e.getContext("2d").drawImage(
        u,
        o.x * s,
        o.y * s,
        o.width * s,
        o.height * s,
        0,
        0,
        e.width,
        e.height
      ), n(e.toDataURL("image/png"));
    }, u.onerror = f, u.src = r;
  });
}
async function qr(r) {
  return (await fetch(r)).blob();
}
async function Jr(r, o, n) {
  if (!n) return null;
  try {
    const f = await qr(r);
    return await n(f, o);
  } catch (f) {
    return console.error("uploadScreenshot failed:", f), null;
  }
}
function Ne(r) {
  var u;
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return "";
  if (r.id) return "#" + r.id;
  const o = r.tagName.toLowerCase();
  if (r.className) {
    const e = String(r.className).split(/\s+/).filter((s) => s && !s.startsWith("el-") && !/^__/.test(s)).slice(0, 2);
    if (e.length) return o + "." + e.join(".");
  }
  let n = [], f = r;
  for (; f && f !== document.body; ) {
    let e = f.tagName.toLowerCase();
    if (f.id) {
      e += "#" + f.id, n.unshift(e);
      break;
    }
    const i = Array.from(((u = f.parentNode) == null ? void 0 : u.children) || []).filter((c) => c.tagName === f.tagName);
    if (i.length > 1) {
      const c = i.indexOf(f) + 1;
      e += `:nth-of-type(${c})`;
    }
    n.unshift(e), f = f.parentNode;
  }
  return n.join(" > ");
}
function Qr(r) {
  var f;
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return "";
  if (r.id) return `//*[@id="${r.id}"]`;
  const o = [];
  let n = r;
  for (; n && n !== document.body; ) {
    const s = Array.from(((f = n.parentNode) == null ? void 0 : f.children) || []).filter((i) => i.tagName === n.tagName).indexOf(n) + 1;
    o.unshift(`${n.tagName.toLowerCase()}[${s}]`), n = n.parentNode;
  }
  return o.unshift(""), "/html/body/" + o.slice(1).join("/");
}
function tn(r) {
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return {};
  const o = {}, n = r.getAttribute("role") || en(r);
  n && (o.role = n);
  const f = rn(r);
  f && (o.accessibleName = f);
  const u = r.getAttribute("aria-labelledby");
  return u && (o.labeledBy = u), Object.keys(o).length ? o : void 0;
}
function en(r) {
  const o = r.tagName.toLowerCase(), n = r.getAttribute("type");
  return {
    button: "button",
    a: r.hasAttribute("href") ? "link" : void 0,
    input: n === "checkbox" ? "checkbox" : n === "radio" ? "radio" : n === "text" || !n ? "textbox" : void 0,
    textarea: "textbox",
    select: "combobox",
    nav: "navigation",
    main: "main",
    aside: "complementary",
    header: "banner",
    footer: "contentinfo",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    img: "img",
    ul: "list",
    ol: "list",
    li: "listitem"
  }[o];
}
function rn(r) {
  var e, s;
  if (r.getAttribute("aria-label")) return r.getAttribute("aria-label").trim();
  const o = r.getAttribute("aria-labelledby");
  if (o) {
    const i = o.split(/\s+/).map((c) => {
      var _, x;
      return (x = (_ = document.getElementById(c)) == null ? void 0 : _.textContent) == null ? void 0 : x.trim();
    }).filter(Boolean);
    if (i.length) return i.join(" ");
  }
  const n = (e = r.labels) == null ? void 0 : e[0];
  if (n) return n.textContent.trim();
  if (r.tagName.toLowerCase() === "input" && r.placeholder) return r.placeholder.trim();
  const f = r.getAttribute("alt");
  if (f) return f.trim();
  const u = r.getAttribute("title");
  if (u) return u.trim();
  if (["button", "a"].includes(r.tagName.toLowerCase())) {
    const i = (s = r.textContent) == null ? void 0 : s.trim();
    if (i) return i;
  }
  return "";
}
function nn(r) {
  return !r || r.nodeType !== Node.ELEMENT_NODE ? void 0 : r.getAttribute("data-testid") || void 0;
}
function fe(r) {
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return null;
  const o = r.getBoundingClientRect();
  return {
    tag: r.tagName.toLowerCase(),
    id: r.id || void 0,
    classes: r.className ? String(r.className).split(/\s+/).filter(Boolean) : void 0,
    selector: Ne(r),
    xpath: Qr(r),
    rect: {
      x: o.left + window.scrollX,
      y: o.top + window.scrollY,
      width: o.width,
      height: o.height
    },
    aria: tn(r),
    testId: nn(r)
  };
}
function an(r) {
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return [];
  const o = [];
  let n = r;
  for (; n && n !== document.body; )
    o.unshift(n), n = n.parentElement;
  return n === document.body && o.unshift(document.body), o.map(fe).filter(Boolean);
}
function sn(r) {
  if (!r || r.nodeType !== Node.ELEMENT_NODE) return [];
  const o = on(r);
  if (o.length) return o;
  const n = un(r);
  return n.length ? n : [];
}
function on(r) {
  const o = [];
  let n = r;
  for (; n; ) {
    const f = ln(n);
    f && !o.find((u) => u.componentName === f.componentName && u.selector === f.selector) && o.unshift(f), n = n.parentElement;
  }
  return o;
}
function ln(r) {
  var e, s, i, c, _;
  const n = Object.keys(r || {}).find((x) => x.startsWith("__vue"));
  if (!n) return null;
  const f = r[n], u = ((e = f == null ? void 0 : f.type) == null ? void 0 : e.name) || ((s = f == null ? void 0 : f.type) == null ? void 0 : s.__name) || ((c = (i = f == null ? void 0 : f.parent) == null ? void 0 : i.type) == null ? void 0 : c.name);
  return u ? {
    componentName: u,
    selector: Ne(r),
    rect: (_ = fe(r)) == null ? void 0 : _.rect
  } : null;
}
function un(r) {
  const o = [], n = Object.keys(r || {}).find((u) => u.startsWith("__reactFiber$"));
  if (!n) return o;
  let f = r[n];
  for (; f; ) {
    const u = cn(f);
    u && !o.find((e) => e.componentName === u) && o.unshift({ componentName: u, selector: void 0, rect: void 0 }), f = f.return;
  }
  return o;
}
function cn(r) {
  var o;
  if (!r) return null;
  if (typeof r.type == "function") return r.type.displayName || r.type.name || null;
  if (typeof r.type == "string") return null;
  if (r.elementType) {
    if (typeof r.elementType == "function") return r.elementType.displayName || r.elementType.name || null;
    if (typeof r.elementType == "object" && ((o = r.elementType) != null && o.$$typeof)) return r.elementType.name || null;
  }
  return null;
}
function Ce(r) {
  return {
    dom: an(r),
    framework: sn(r)
  };
}
const hn = (r, o) => {
  const n = r.__vccOpts || r;
  for (const [f, u] of o)
    n[f] = u;
  return n;
}, fn = { class: "toolbar-left" }, dn = { class: "toolbar-right" }, pn = { class: "highlight-label" }, mn = { class: "highlight-label" }, gn = { class: "review-target-info" }, vn = {
  key: 0,
  class: "target-desc"
}, wn = {
  key: 1,
  class: "target-desc"
}, _n = { class: "text-muted" }, yn = { class: "text-muted" }, bn = {
  key: 1,
  class: "tree-panel"
}, kn = {
  key: 0,
  class: "tree-section"
}, xn = { class: "tree-list" }, Sn = ["onMouseenter", "onClick"], En = { class: "node-name" }, Cn = { class: "tree-section" }, Rn = { class: "tree-list" }, zn = ["onMouseenter", "onClick"], An = { class: "node-tag" }, Tn = {
  key: 0,
  class: "node-id"
}, In = {
  key: 1,
  class: "node-aria"
}, On = {
  key: 2,
  class: "node-testid"
}, Bn = { class: "review-list-actions" }, Pn = {
  key: 1,
  class: "review-list"
}, Dn = { class: "review-item-header" }, Ln = { class: "review-item-title" }, Fn = { class: "review-item-tags" }, Nn = { class: "review-item-target" }, Un = { class: "review-item-suggestion" }, jn = { class: "review-item-meta" }, Mn = { class: "text-muted" }, $n = { class: "review-item-actions" }, Wn = {
  __name: "ReviewTool",
  props: {
    active: { type: Boolean, default: !1 },
    pagePath: { type: String, default: "" },
    pageName: { type: String, default: "" },
    storageKey: { type: String, default: "page-reviews" },
    imageUpload: { type: Function, default: null },
    enableZipExport: { type: Boolean, default: !0 },
    enableComponentTree: { type: Boolean, default: !0 }
  },
  emits: ["update:active", "add", "update", "delete", "clear", "export"],
  setup(r, { expose: o, emit: n }) {
    const f = r, u = n, e = Ht(() => f.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: s, getPageReviews: i, addReview: c, updateReview: _, deleteReview: x, clearPageReviews: y, exportToJSON: k, exportToMarkdown: h, exportToZIP: w } = qe({
      storageKey: f.storageKey,
      defaultPagePath: () => e.value
    }), l = Ht(() => i(e.value)), m = St("element"), d = St(!1), g = St(!1), S = St(!1), C = St(null), R = St(""), L = St(null), P = St(null), U = St(null), A = St(null), Z = St(!1), tt = St({ x: 0, y: 0 }), b = St({ x: 0, y: 0 }), D = St(!1), a = St({ x: 0, y: 0 }), N = St([]), H = St({
      type: "element",
      title: "",
      severity: "medium",
      suggestion: "",
      selector: "",
      elementText: "",
      elementRect: null,
      viewportRect: null,
      viewport: { width: 0, height: 0 },
      scroll: { x: 0, y: 0 },
      pagePath: "",
      pageUrl: "",
      pageName: "",
      componentTree: null,
      aria: null,
      locators: null
    }), $ = Ht(() => H.value.title.trim() && H.value.suggestion.trim()), at = Ht(() => {
      if (!A.value) return {};
      const W = A.value;
      return {
        left: W.x + "px",
        top: W.y + "px",
        width: W.width + "px",
        height: W.height + "px"
      };
    }), V = Ht(() => {
      const { x: W, y: B } = b.value;
      return {
        transform: `translate(calc(-50% + ${W}px), ${B}px)`
      };
    });
    function nt(W) {
      return W ? {
        left: W.x + "px",
        top: W.y + "px",
        width: W.width + "px",
        height: W.height + "px"
      } : {};
    }
    function I(W) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[W] || "info";
    }
    function T(W) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[W] || W;
    }
    function rt() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: e.value,
        pageUrl: window.location.href,
        pageName: f.pageName || e.value
      };
    }
    function q(W) {
      var ct;
      if (W.id) return "#" + W.id;
      if (W.className) {
        const dt = String(W.className).split(/\s+/).filter((_t) => _t && !_t.startsWith("el-")).slice(0, 2);
        if (dt.length) return W.tagName.toLowerCase() + "." + dt.join(".");
      }
      let B = [], K = W;
      for (; K && K !== document.body; ) {
        let dt = K.tagName.toLowerCase();
        if (K.id) {
          dt += "#" + K.id, B.unshift(dt);
          break;
        }
        const Ot = Array.from(((ct = K.parentNode) == null ? void 0 : ct.children) || []).filter((Pt) => Pt.tagName === K.tagName);
        if (Ot.length > 1) {
          const Pt = Ot.indexOf(K) + 1;
          dt += `:nth-of-type(${Pt})`;
        }
        B.unshift(dt), K = K.parentNode;
      }
      return B.join(" > ");
    }
    function Y(W) {
      const B = document.elementFromPoint(W.clientX, W.clientY);
      return !B || B.closest(".review-overlay") ? null : B;
    }
    function gt(W) {
      if (D.value || m.value !== "element" || d.value || Z.value) return;
      const B = Y(W);
      if (!B) {
        C.value = null;
        return;
      }
      const K = B.getBoundingClientRect();
      C.value = {
        x: K.left + window.scrollX,
        y: K.top + window.scrollY,
        width: K.width,
        height: K.height
      }, R.value = B.tagName.toLowerCase();
    }
    function bt() {
      C.value = null;
    }
    function ot(W) {
      var ct;
      if (m.value !== "element" || d.value || Z.value) return;
      const B = Y(W);
      if (!B) return;
      W.preventDefault(), W.stopPropagation();
      const K = B.getBoundingClientRect();
      L.value = {
        el: B,
        selector: q(B),
        tag: B.tagName.toLowerCase(),
        text: ((ct = B.innerText) == null ? void 0 : ct.slice(0, 40)) || "",
        rect: {
          x: K.left + window.scrollX,
          y: K.top + window.scrollY,
          width: K.width,
          height: K.height
        }
      }, U.value = Ce(B), j("element");
    }
    function ut(W) {
      W.rect && (P.value = W.rect);
    }
    function yt(W) {
      var ct;
      if (!W.selector) return;
      const B = document.querySelector(W.selector);
      if (!B) return;
      const K = B.getBoundingClientRect();
      L.value = {
        el: B,
        selector: W.selector,
        tag: B.tagName.toLowerCase(),
        text: ((ct = B.innerText) == null ? void 0 : ct.slice(0, 40)) || "",
        rect: {
          x: K.left + window.scrollX,
          y: K.top + window.scrollY,
          width: K.width,
          height: K.height
        }
      }, U.value = Ce(B), S.value = !1, j("element");
    }
    function vt(W) {
      D.value || m.value !== "viewport" || d.value || (Z.value = !0, tt.value = { x: W.clientX + window.scrollX, y: W.clientY + window.scrollY }, A.value = { x: tt.value.x, y: tt.value.y, width: 0, height: 0 });
    }
    function Tt(W) {
      if (D.value || !Z.value) return;
      const B = W.clientX + window.scrollX, K = W.clientY + window.scrollY;
      A.value = {
        x: Math.min(tt.value.x, B),
        y: Math.min(tt.value.y, K),
        width: Math.abs(B - tt.value.x),
        height: Math.abs(K - tt.value.y)
      };
    }
    function Rt(W) {
      if (D.value) {
        D.value = !1;
        return;
      }
      Z.value && (Z.value = !1, A.value && A.value.width > 10 && A.value.height > 10 && j("viewport", { ...A.value }), A.value = null);
    }
    function t(W) {
      var K, ct;
      ((K = W.target.classList) != null && K.contains("toolbar-title") || (ct = W.target.classList) != null && ct.contains("review-toolbar")) && (D.value = !0, a.value = {
        x: W.clientX - b.value.x,
        y: W.clientY - b.value.y
      });
    }
    function F(W) {
      D.value && (b.value = {
        x: W.clientX - a.value.x,
        y: W.clientY - a.value.y
      });
    }
    function O(W) {
      W.key === "Escape" && (d.value ? d.value = !1 : ht());
    }
    function v() {
    }
    const p = Ht(() => H.value.type === "element" ? [
      { value: Ft.ELEMENT, label: "选中元素" },
      { value: Ft.VIEWPORT, label: "当前视口" },
      { value: Ft.FULL_PAGE, label: "完整页面" }
    ] : [
      { value: Ft.BOX, label: "框选区域" },
      { value: Ft.VIEWPORT, label: "当前视口" },
      { value: Ft.FULL_PAGE, label: "完整页面" }
    ]);
    async function E() {
      var B;
      const W = [];
      for (const K of N.value) {
        let ct = null;
        if (K === Ft.ELEMENT && ((B = L.value) != null && B.el) ? ct = await Fe(L.value.el) : K === Ft.BOX && H.value.viewportRect ? ct = await Yr(H.value.viewportRect) : K === Ft.VIEWPORT ? ct = await Gr() : K === Ft.FULL_PAGE && (ct = await Xr()), ct) {
          const dt = Hr(K);
          let _t = null;
          f.imageUpload && (_t = await Jr(ct, dt, f.imageUpload)), W.push({
            type: K,
            filename: dt,
            data: _t ? void 0 : ct,
            url: _t || void 0
          });
        }
      }
      return W;
    }
    function j(W, B = null) {
      var _t, Ot, Pt, Wt;
      const K = rt(), ct = (_t = L.value) != null && _t.el ? fe(L.value.el) : null, dt = ct ? M(ct) : null;
      H.value = {
        type: W,
        title: "",
        severity: "medium",
        suggestion: "",
        selector: ((Ot = L.value) == null ? void 0 : Ot.selector) || "",
        elementText: ((Pt = L.value) == null ? void 0 : Pt.text) || "",
        elementRect: ((Wt = L.value) == null ? void 0 : Wt.rect) || null,
        viewportRect: B,
        viewport: K.viewport,
        scroll: K.scroll,
        pagePath: K.pagePath,
        pageUrl: K.pageUrl,
        pageName: K.pageName,
        componentTree: U.value,
        aria: (ct == null ? void 0 : ct.aria) || null,
        locators: dt
      }, N.value = [], d.value = !0;
    }
    function M(W) {
      const B = {};
      return W.selector && (B.cssSelector = W.selector), W.xpath && (B.xpath = W.xpath), W.aria && Object.keys(W.aria).length && (B.aria = W.aria), W.testId && (B.testId = W.testId), Object.keys(B).length ? B : null;
    }
    function z() {
      L.value = null, A.value = null, P.value = null, U.value = null, N.value = [], H.value = {
        type: "element",
        title: "",
        severity: "medium",
        suggestion: "",
        selector: "",
        elementText: "",
        elementRect: null,
        viewportRect: null,
        viewport: { width: 0, height: 0 },
        scroll: { x: 0, y: 0 },
        pagePath: "",
        pageUrl: "",
        pageName: "",
        componentTree: null,
        aria: null,
        locators: null
      };
    }
    async function G() {
      if (!$.value) return;
      const W = await E(), B = c({
        type: H.value.type,
        title: H.value.title.trim(),
        severity: H.value.severity,
        suggestion: H.value.suggestion.trim(),
        selector: H.value.selector,
        elementText: H.value.elementText,
        elementRect: H.value.elementRect,
        viewportRect: H.value.viewportRect,
        viewport: H.value.viewport,
        scroll: H.value.scroll,
        pagePath: H.value.pagePath,
        pageUrl: H.value.pageUrl,
        pageName: H.value.pageName,
        status: "open",
        screenshots: W,
        componentTree: H.value.componentTree,
        aria: H.value.aria,
        locators: H.value.locators
      });
      d.value = !1, u("add", B);
    }
    function J(W) {
      _(W, { status: "resolved" }), u("update", { id: W, status: "resolved" });
    }
    function X(W) {
      ve.confirm("确定删除这条评审意见吗？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        x(W), u("delete", { id: W });
      });
    }
    function et() {
      l.value.length !== 0 && ve.confirm("确定清空当前页面的所有评审意见吗？", "清空确认", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        y(e.value), u("clear", { pagePath: e.value });
      });
    }
    function ht() {
      u("update:active", !1);
    }
    function lt() {
      document.addEventListener("mousemove", gt), document.addEventListener("mouseout", bt), document.addEventListener("click", ot, !0), document.addEventListener("mousedown", vt), document.addEventListener("mousemove", Tt), document.addEventListener("mousemove", F), document.addEventListener("mouseup", Rt), document.addEventListener("keydown", O);
    }
    function Ct() {
      document.removeEventListener("mousemove", gt), document.removeEventListener("mouseout", bt), document.removeEventListener("click", ot, !0), document.removeEventListener("mousedown", vt), document.removeEventListener("mousemove", Tt), document.removeEventListener("mousemove", F), document.removeEventListener("mouseup", Rt), document.removeEventListener("keydown", O);
    }
    $e(() => {
      f.active && lt();
    }), ge(() => {
      Ct();
    });
    let Nt = null;
    return We(() => {
      Nt = Ze(() => f.active, (W) => {
        W ? (lt(), m.value = "element") : (Ct(), z(), C.value = null, g.value = !1, S.value = !1);
      });
    }), ge(() => {
      Nt && Nt();
    }), o({
      reviews: s,
      pageReviews: l,
      addReview: c,
      updateReview: _,
      deleteReview: x,
      clearPageReviews: y,
      exportToJSON: k,
      exportToMarkdown: h
    }), (W, B) => {
      const K = xt("el-radio-button"), ct = xt("el-radio-group"), dt = xt("el-button"), _t = xt("el-badge"), Ot = xt("el-dropdown-item"), Pt = xt("el-dropdown-menu"), Wt = xt("el-dropdown"), Zt = xt("el-tag"), Dt = xt("el-form-item"), jt = xt("el-checkbox"), Vt = xt("el-checkbox-group"), de = xt("el-input"), Kt = xt("el-radio"), Ue = xt("el-form"), je = xt("el-dialog"), pe = xt("el-empty"), me = xt("el-drawer"), Me = xt("el-card");
      return ft(), Lt(Ve, { to: "body" }, [
        r.active ? (ft(), kt("div", {
          key: 0,
          class: "review-overlay",
          onClick: v
        }, [
          mt("div", {
            class: Ge(["review-toolbar", { "is-dragging": D.value }]),
            style: Gt(V.value),
            onClick: B[3] || (B[3] = He(() => {
            }, ["stop"])),
            onMousedown: t
          }, [
            mt("div", fn, [
              B[16] || (B[16] = mt("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              st(ct, {
                modelValue: m.value,
                "onUpdate:modelValue": B[0] || (B[0] = (Q) => m.value = Q),
                size: "small"
              }, {
                default: it(() => [
                  st(K, { label: "element" }, {
                    default: it(() => [...B[14] || (B[14] = [
                      pt("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  st(K, { label: "viewport" }, {
                    default: it(() => [...B[15] || (B[15] = [
                      pt("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            mt("div", dn, [
              r.enableComponentTree ? (ft(), Lt(dt, {
                key: 0,
                size: "small",
                onClick: B[1] || (B[1] = (Q) => S.value = !0)
              }, {
                default: it(() => [...B[17] || (B[17] = [
                  pt("组件树", -1)
                ])]),
                _: 1
              })) : zt("", !0),
              st(_t, {
                value: l.value.length,
                class: "review-badge"
              }, {
                default: it(() => [
                  st(dt, {
                    size: "small",
                    onClick: B[2] || (B[2] = (Q) => g.value = !0)
                  }, {
                    default: it(() => [...B[18] || (B[18] = [
                      pt("评审列表", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              st(Wt, {
                size: "small",
                "split-button": "",
                type: "primary",
                onClick: $t(h)
              }, {
                dropdown: it(() => [
                  st(Pt, null, {
                    default: it(() => [
                      st(Ot, { onClick: $t(h) }, {
                        default: it(() => [...B[19] || (B[19] = [
                          pt("导出为 Markdown", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      st(Ot, { onClick: $t(k) }, {
                        default: it(() => [...B[20] || (B[20] = [
                          pt("导出为 JSON", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      r.enableZipExport ? (ft(), Lt(Ot, {
                        key: 0,
                        onClick: $t(w)
                      }, {
                        default: it(() => [...B[21] || (B[21] = [
                          pt("导出为 ZIP", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])) : zt("", !0)
                    ]),
                    _: 1
                  })
                ]),
                default: it(() => [
                  B[22] || (B[22] = pt(" 导出 ", -1))
                ]),
                _: 1
              }, 8, ["onClick"]),
              st(dt, {
                size: "small",
                type: "danger",
                onClick: ht
              }, {
                default: it(() => [...B[23] || (B[23] = [
                  pt("退出评审", -1)
                ])]),
                _: 1
              })
            ])
          ], 38),
          C.value && m.value === "element" && !d.value ? (ft(), kt("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: Gt(nt(C.value))
          }, [
            mt("span", pn, wt(R.value), 1)
          ], 4)) : zt("", !0),
          L.value && m.value === "element" ? (ft(), kt("div", {
            key: 1,
            class: "highlight-box selected-box",
            style: Gt(nt(L.value.rect))
          }, [
            mt("span", mn, "已选：" + wt(L.value.tag), 1)
          ], 4)) : zt("", !0),
          P.value ? (ft(), kt("div", {
            key: 2,
            class: "highlight-box tree-hover-box",
            style: Gt(nt(P.value))
          }, null, 4)) : zt("", !0),
          A.value || H.value.type === "viewport" && H.value.viewportRect && d.value ? (ft(), kt("div", {
            key: 3,
            class: "drag-rect",
            style: Gt(A.value ? at.value : nt(H.value.viewportRect))
          }, null, 4)) : zt("", !0),
          st(je, {
            modelValue: d.value,
            "onUpdate:modelValue": B[9] || (B[9] = (Q) => d.value = Q),
            title: "添加评审意见",
            width: "520px",
            "close-on-click-modal": !1,
            onClosed: z
          }, {
            footer: it(() => [
              st(dt, {
                onClick: B[8] || (B[8] = (Q) => d.value = !1)
              }, {
                default: it(() => [...B[28] || (B[28] = [
                  pt("取消", -1)
                ])]),
                _: 1
              }),
              st(dt, {
                type: "primary",
                disabled: !$.value,
                onClick: G
              }, {
                default: it(() => [...B[29] || (B[29] = [
                  pt("保存评审", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            default: it(() => [
              st(Ue, {
                model: H.value,
                "label-width": "80px"
              }, {
                default: it(() => [
                  st(Dt, { label: "评审位置" }, {
                    default: it(() => {
                      var Q, Et, Bt, Mt;
                      return [
                        mt("div", gn, [
                          st(Zt, { size: "small" }, {
                            default: it(() => [
                              pt(wt(H.value.type === "element" ? "元素" : "视图范围"), 1)
                            ]),
                            _: 1
                          }),
                          H.value.type === "element" ? (ft(), kt("span", vn, wt(H.value.elementText || H.value.selector), 1)) : (ft(), kt("span", wn, " 框选区域 x=" + wt((Q = H.value.viewportRect) == null ? void 0 : Q.x) + ", y=" + wt((Et = H.value.viewportRect) == null ? void 0 : Et.y) + ", w=" + wt((Bt = H.value.viewportRect) == null ? void 0 : Bt.width) + ", h=" + wt((Mt = H.value.viewportRect) == null ? void 0 : Mt.height), 1))
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  st(Dt, { label: "窗口尺寸" }, {
                    default: it(() => {
                      var Q, Et;
                      return [
                        mt("span", _n, wt((Q = H.value.viewport) == null ? void 0 : Q.width) + " × " + wt((Et = H.value.viewport) == null ? void 0 : Et.height), 1)
                      ];
                    }),
                    _: 1
                  }),
                  st(Dt, { label: "滚动位置" }, {
                    default: it(() => {
                      var Q, Et;
                      return [
                        mt("span", yn, "x=" + wt((Q = H.value.scroll) == null ? void 0 : Q.x) + ", y=" + wt((Et = H.value.scroll) == null ? void 0 : Et.y), 1)
                      ];
                    }),
                    _: 1
                  }),
                  st(Dt, { label: "截图" }, {
                    default: it(() => [
                      st(Vt, {
                        modelValue: N.value,
                        "onUpdate:modelValue": B[4] || (B[4] = (Q) => N.value = Q)
                      }, {
                        default: it(() => [
                          (ft(!0), kt(qt, null, Jt(p.value, (Q) => (ft(), Lt(jt, {
                            key: Q.value,
                            label: Q.value
                          }, {
                            default: it(() => [
                              pt(wt(Q.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  st(Dt, {
                    label: "标题",
                    required: ""
                  }, {
                    default: it(() => [
                      st(de, {
                        modelValue: H.value.title,
                        "onUpdate:modelValue": B[5] || (B[5] = (Q) => H.value.title = Q),
                        placeholder: "例如：按钮样式不统一"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  st(Dt, {
                    label: "严重等级",
                    required: ""
                  }, {
                    default: it(() => [
                      st(ct, {
                        modelValue: H.value.severity,
                        "onUpdate:modelValue": B[6] || (B[6] = (Q) => H.value.severity = Q)
                      }, {
                        default: it(() => [
                          st(Kt, { label: "low" }, {
                            default: it(() => [...B[24] || (B[24] = [
                              pt("低", -1)
                            ])]),
                            _: 1
                          }),
                          st(Kt, { label: "medium" }, {
                            default: it(() => [...B[25] || (B[25] = [
                              pt("中", -1)
                            ])]),
                            _: 1
                          }),
                          st(Kt, { label: "high" }, {
                            default: it(() => [...B[26] || (B[26] = [
                              pt("高", -1)
                            ])]),
                            _: 1
                          }),
                          st(Kt, { label: "critical" }, {
                            default: it(() => [...B[27] || (B[27] = [
                              pt("严重", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  st(Dt, {
                    label: "评审建议",
                    required: ""
                  }, {
                    default: it(() => [
                      st(de, {
                        modelValue: H.value.suggestion,
                        "onUpdate:modelValue": B[7] || (B[7] = (Q) => H.value.suggestion = Q),
                        type: "textarea",
                        rows: 4,
                        placeholder: "描述问题现象、影响和改进建议"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          st(me, {
            modelValue: S.value,
            "onUpdate:modelValue": B[12] || (B[12] = (Q) => S.value = Q),
            title: "组件树检查器",
            size: "480px",
            "with-header": !0
          }, {
            default: it(() => [
              U.value ? (ft(), kt("div", bn, [
                U.value.framework && U.value.framework.length ? (ft(), kt("div", kn, [
                  B[30] || (B[30] = mt("h4", null, "框架组件树", -1)),
                  mt("div", xn, [
                    (ft(!0), kt(qt, null, Jt(U.value.framework, (Q, Et) => (ft(), kt("div", {
                      key: "fw-" + Et,
                      class: "tree-node",
                      onMouseenter: (Bt) => ut(Q),
                      onMouseleave: B[10] || (B[10] = (Bt) => P.value = null),
                      onClick: (Bt) => yt(Q)
                    }, [
                      mt("span", En, wt(Q.componentName), 1)
                    ], 40, Sn))), 128))
                  ])
                ])) : zt("", !0),
                mt("div", Cn, [
                  B[31] || (B[31] = mt("h4", null, "DOM 树", -1)),
                  mt("div", Rn, [
                    (ft(!0), kt(qt, null, Jt(U.value.dom, (Q, Et) => {
                      var Bt;
                      return ft(), kt("div", {
                        key: "dom-" + Et,
                        class: "tree-node",
                        style: Gt({ paddingLeft: Et * 12 + "px" }),
                        onMouseenter: (Mt) => ut(Q),
                        onMouseleave: B[11] || (B[11] = (Mt) => P.value = null),
                        onClick: (Mt) => yt(Q)
                      }, [
                        mt("span", An, wt(Q.tag), 1),
                        Q.id ? (ft(), kt("span", Tn, "#" + wt(Q.id), 1)) : zt("", !0),
                        (Bt = Q.aria) != null && Bt.role ? (ft(), kt("span", In, "role=" + wt(Q.aria.role), 1)) : zt("", !0),
                        Q.testId ? (ft(), kt("span", On, "testid=" + wt(Q.testId), 1)) : zt("", !0)
                      ], 44, zn);
                    }), 128))
                  ])
                ])
              ])) : (ft(), Lt(pe, {
                key: 0,
                description: "先选择一个元素以查看组件树"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          st(me, {
            modelValue: g.value,
            "onUpdate:modelValue": B[13] || (B[13] = (Q) => g.value = Q),
            title: "当前页面评审意见",
            size: "480px",
            "with-header": !0
          }, {
            default: it(() => [
              mt("div", Bn, [
                st(dt, {
                  size: "small",
                  type: "primary",
                  onClick: $t(h)
                }, {
                  default: it(() => [...B[32] || (B[32] = [
                    pt("导出 Markdown", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                st(dt, {
                  size: "small",
                  onClick: $t(k)
                }, {
                  default: it(() => [...B[33] || (B[33] = [
                    pt("导出 JSON", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                r.enableZipExport ? (ft(), Lt(dt, {
                  key: 0,
                  size: "small",
                  onClick: $t(w)
                }, {
                  default: it(() => [...B[34] || (B[34] = [
                    pt("导出 ZIP", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : zt("", !0),
                st(dt, {
                  size: "small",
                  type: "danger",
                  text: "",
                  onClick: et
                }, {
                  default: it(() => [...B[35] || (B[35] = [
                    pt("清空本页", -1)
                  ])]),
                  _: 1
                })
              ]),
              l.value.length === 0 ? (ft(), Lt(pe, {
                key: 0,
                description: "暂无评审意见"
              })) : (ft(), kt("div", Pn, [
                (ft(!0), kt(qt, null, Jt(l.value, (Q) => (ft(), Lt(Me, {
                  key: Q.id,
                  class: "review-item",
                  shadow: "never"
                }, {
                  default: it(() => {
                    var Et, Bt;
                    return [
                      mt("div", Dn, [
                        mt("span", Ln, wt(Q.title), 1),
                        mt("div", Fn, [
                          st(Zt, {
                            size: "small",
                            type: I(Q.severity)
                          }, {
                            default: it(() => [
                              pt(wt(T(Q.severity)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"]),
                          st(Zt, {
                            size: "small",
                            type: "info"
                          }, {
                            default: it(() => [
                              pt(wt(Q.type === "element" ? "元素" : "视图"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          (Bt = (Et = Q.componentTree) == null ? void 0 : Et.dom) != null && Bt.length ? (ft(), Lt(Zt, {
                            key: 0,
                            size: "small",
                            type: "success"
                          }, {
                            default: it(() => [...B[36] || (B[36] = [
                              pt("树", -1)
                            ])]),
                            _: 1
                          })) : zt("", !0)
                        ])
                      ]),
                      mt("p", Nn, wt(Q.type === "element" ? Q.elementText || Q.selector : `框选 x=${Q.viewportRect.x}, y=${Q.viewportRect.y}`), 1),
                      mt("p", Un, wt(Q.suggestion), 1),
                      mt("div", jn, [
                        mt("span", Mn, wt(new Date(Q.createdAt).toLocaleString()), 1),
                        mt("div", $n, [
                          Q.status !== "resolved" ? (ft(), Lt(dt, {
                            key: 0,
                            link: "",
                            type: "primary",
                            size: "small",
                            onClick: (Mt) => J(Q.id)
                          }, {
                            default: it(() => [...B[37] || (B[37] = [
                              pt("标记解决", -1)
                            ])]),
                            _: 1
                          }, 8, ["onClick"])) : zt("", !0),
                          st(dt, {
                            link: "",
                            type: "danger",
                            size: "small",
                            onClick: (Mt) => X(Q.id)
                          }, {
                            default: it(() => [...B[38] || (B[38] = [
                              pt("删除", -1)
                            ])]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ];
                  }),
                  _: 2
                }, 1024))), 128))
              ]))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])) : zt("", !0)
      ]);
    };
  }
}, Hn = /* @__PURE__ */ hn(Wn, [["__scopeId", "data-v-171d4ef0"]]);
export {
  Hn as ReviewTool,
  Hn as default,
  qe as usePageReview
};
