import { ref as St, computed as Zt, onMounted as Me, onUnmounted as me, nextTick as $e, watch as We, resolveComponent as xt, openBlock as dt, createBlock as Dt, Teleport as Ze, createElementBlock as kt, createElementVNode as mt, withModifiers as Ve, normalizeStyle as Vt, normalizeClass as He, createVNode as ot, withCtx as at, createTextVNode as pt, createCommentVNode as At, unref as $t, toDisplayString as wt, Fragment as Kt, renderList as qt } from "vue";
import { ElMessageBox as ge } from "element-plus";
var Jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ge(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Qt(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ce = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(e, u) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function n(h, l, r) {
      function s(_, x) {
        if (!l[_]) {
          if (!h[_]) {
            var y = typeof Qt == "function" && Qt;
            if (!x && y) return y(_, !0);
            if (i) return i(_, !0);
            var S = new Error("Cannot find module '" + _ + "'");
            throw S.code = "MODULE_NOT_FOUND", S;
          }
          var f = l[_] = { exports: {} };
          h[_][0].call(f.exports, function(w) {
            var o = h[_][1][w];
            return s(o || w);
          }, f, f.exports, n, h, l, r);
        }
        return l[_].exports;
      }
      for (var i = typeof Qt == "function" && Qt, c = 0; c < r.length; c++) s(r[c]);
      return s;
    }({ 1: [function(n, h, l) {
      var r = n("./utils"), s = n("./support"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      l.encode = function(c) {
        for (var _, x, y, S, f, w, o, m = [], d = 0, g = c.length, k = g, C = r.getTypeOf(c) !== "string"; d < c.length; ) k = g - d, y = C ? (_ = c[d++], x = d < g ? c[d++] : 0, d < g ? c[d++] : 0) : (_ = c.charCodeAt(d++), x = d < g ? c.charCodeAt(d++) : 0, d < g ? c.charCodeAt(d++) : 0), S = _ >> 2, f = (3 & _) << 4 | x >> 4, w = 1 < k ? (15 & x) << 2 | y >> 6 : 64, o = 2 < k ? 63 & y : 64, m.push(i.charAt(S) + i.charAt(f) + i.charAt(w) + i.charAt(o));
        return m.join("");
      }, l.decode = function(c) {
        var _, x, y, S, f, w, o = 0, m = 0, d = "data:";
        if (c.substr(0, d.length) === d) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, k = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (c.charAt(c.length - 1) === i.charAt(64) && k--, c.charAt(c.length - 2) === i.charAt(64) && k--, k % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = s.uint8array ? new Uint8Array(0 | k) : new Array(0 | k); o < c.length; ) _ = i.indexOf(c.charAt(o++)) << 2 | (S = i.indexOf(c.charAt(o++))) >> 4, x = (15 & S) << 4 | (f = i.indexOf(c.charAt(o++))) >> 2, y = (3 & f) << 6 | (w = i.indexOf(c.charAt(o++))), g[m++] = _, f !== 64 && (g[m++] = x), w !== 64 && (g[m++] = y);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(n, h, l) {
      var r = n("./external"), s = n("./stream/DataWorker"), i = n("./stream/Crc32Probe"), c = n("./stream/DataLengthProbe");
      function _(x, y, S, f, w) {
        this.compressedSize = x, this.uncompressedSize = y, this.crc32 = S, this.compression = f, this.compressedContent = w;
      }
      _.prototype = { getContentWorker: function() {
        var x = new s(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), y = this;
        return x.on("end", function() {
          if (this.streamInfo.data_length !== y.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), x;
      }, getCompressedWorker: function() {
        return new s(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(x, y, S) {
        return x.pipe(new i()).pipe(new c("uncompressedSize")).pipe(y.compressWorker(S)).pipe(new c("compressedSize")).withStreamInfo("compression", y);
      }, h.exports = _;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(n, h, l) {
      var r = n("./stream/GenericWorker");
      l.STORE = { magic: "\0\0", compressWorker: function() {
        return new r("STORE compression");
      }, uncompressWorker: function() {
        return new r("STORE decompression");
      } }, l.DEFLATE = n("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(n, h, l) {
      var r = n("./utils"), s = function() {
        for (var i, c = [], _ = 0; _ < 256; _++) {
          i = _;
          for (var x = 0; x < 8; x++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
          c[_] = i;
        }
        return c;
      }();
      h.exports = function(i, c) {
        return i !== void 0 && i.length ? r.getTypeOf(i) !== "string" ? function(_, x, y, S) {
          var f = s, w = S + y;
          _ ^= -1;
          for (var o = S; o < w; o++) _ = _ >>> 8 ^ f[255 & (_ ^ x[o])];
          return -1 ^ _;
        }(0 | c, i, i.length, 0) : function(_, x, y, S) {
          var f = s, w = S + y;
          _ ^= -1;
          for (var o = S; o < w; o++) _ = _ >>> 8 ^ f[255 & (_ ^ x.charCodeAt(o))];
          return -1 ^ _;
        }(0 | c, i, i.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(n, h, l) {
      l.base64 = !1, l.binary = !1, l.dir = !1, l.createFolders = !0, l.date = null, l.compression = null, l.compressionOptions = null, l.comment = null, l.unixPermissions = null, l.dosPermissions = null;
    }, {}], 6: [function(n, h, l) {
      var r = null;
      r = typeof Promise < "u" ? Promise : n("lie"), h.exports = { Promise: r };
    }, { lie: 37 }], 7: [function(n, h, l) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = n("pako"), i = n("./utils"), c = n("./stream/GenericWorker"), _ = r ? "uint8array" : "array";
      function x(y, S) {
        c.call(this, "FlateWorker/" + y), this._pako = null, this._pakoAction = y, this._pakoOptions = S, this.meta = {};
      }
      l.magic = "\b\0", i.inherits(x, c), x.prototype.processChunk = function(y) {
        this.meta = y.meta, this._pako === null && this._createPako(), this._pako.push(i.transformTo(_, y.data), !1);
      }, x.prototype.flush = function() {
        c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, x.prototype.cleanUp = function() {
        c.prototype.cleanUp.call(this), this._pako = null;
      }, x.prototype._createPako = function() {
        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var y = this;
        this._pako.onData = function(S) {
          y.push({ data: S, meta: y.meta });
        };
      }, l.compressWorker = function(y) {
        return new x("Deflate", y);
      }, l.uncompressWorker = function() {
        return new x("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(n, h, l) {
      function r(f, w) {
        var o, m = "";
        for (o = 0; o < w; o++) m += String.fromCharCode(255 & f), f >>>= 8;
        return m;
      }
      function s(f, w, o, m, d, g) {
        var k, C, R = f.file, L = f.compression, P = g !== _.utf8encode, U = i.transformTo("string", g(R.name)), A = i.transformTo("string", _.utf8encode(R.name)), W = R.comment, Q = i.transformTo("string", g(W)), b = i.transformTo("string", _.utf8encode(W)), D = A.length !== R.name.length, a = b.length !== W.length, N = "", V = "", $ = "", st = R.dir, Z = R.date, nt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        w && !o || (nt.crc32 = f.crc32, nt.compressedSize = f.compressedSize, nt.uncompressedSize = f.uncompressedSize);
        var I = 0;
        w && (I |= 8), P || !D && !a || (I |= 2048);
        var T = 0, rt = 0;
        st && (T |= 16), d === "UNIX" ? (rt = 798, T |= function(X, gt) {
          var yt = X;
          return X || (yt = gt ? 16893 : 33204), (65535 & yt) << 16;
        }(R.unixPermissions, st)) : (rt = 20, T |= function(X) {
          return 63 & (X || 0);
        }(R.dosPermissions)), k = Z.getUTCHours(), k <<= 6, k |= Z.getUTCMinutes(), k <<= 5, k |= Z.getUTCSeconds() / 2, C = Z.getUTCFullYear() - 1980, C <<= 4, C |= Z.getUTCMonth() + 1, C <<= 5, C |= Z.getUTCDate(), D && (V = r(1, 1) + r(x(U), 4) + A, N += "up" + r(V.length, 2) + V), a && ($ = r(1, 1) + r(x(Q), 4) + b, N += "uc" + r($.length, 2) + $);
        var K = "";
        return K += `
\0`, K += r(I, 2), K += L.magic, K += r(k, 2), K += r(C, 2), K += r(nt.crc32, 4), K += r(nt.compressedSize, 4), K += r(nt.uncompressedSize, 4), K += r(U.length, 2), K += r(N.length, 2), { fileRecord: y.LOCAL_FILE_HEADER + K + U + N, dirRecord: y.CENTRAL_FILE_HEADER + r(rt, 2) + K + r(Q.length, 2) + "\0\0\0\0" + r(T, 4) + r(m, 4) + U + N + Q };
      }
      var i = n("../utils"), c = n("../stream/GenericWorker"), _ = n("../utf8"), x = n("../crc32"), y = n("../signature");
      function S(f, w, o, m) {
        c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = o, this.encodeFileName = m, this.streamFiles = f, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      i.inherits(S, c), S.prototype.push = function(f) {
        var w = f.meta.percent || 0, o = this.entriesCount, m = this._sources.length;
        this.accumulate ? this.contentBuffer.push(f) : (this.bytesWritten += f.data.length, c.prototype.push.call(this, { data: f.data, meta: { currentFile: this.currentFile, percent: o ? (w + 100 * (o - m - 1)) / o : 100 } }));
      }, S.prototype.openedSource = function(f) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = f.file.name;
        var w = this.streamFiles && !f.file.dir;
        if (w) {
          var o = s(f, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: o.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, S.prototype.closedSource = function(f) {
        this.accumulate = !1;
        var w = this.streamFiles && !f.file.dir, o = s(f, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(o.dirRecord), w) this.push({ data: function(m) {
          return y.DATA_DESCRIPTOR + r(m.crc32, 4) + r(m.compressedSize, 4) + r(m.uncompressedSize, 4);
        }(f), meta: { percent: 100 } });
        else for (this.push({ data: o.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, S.prototype.flush = function() {
        for (var f = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({ data: this.dirRecords[w], meta: { percent: 100 } });
        var o = this.bytesWritten - f, m = function(d, g, k, C, R) {
          var L = i.transformTo("string", R(C));
          return y.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(d, 2) + r(d, 2) + r(g, 4) + r(k, 4) + r(L.length, 2) + L;
        }(this.dirRecords.length, o, f, this.zipComment, this.encodeFileName);
        this.push({ data: m, meta: { percent: 100 } });
      }, S.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, S.prototype.registerPrevious = function(f) {
        this._sources.push(f);
        var w = this;
        return f.on("data", function(o) {
          w.processChunk(o);
        }), f.on("end", function() {
          w.closedSource(w.previous.streamInfo), w._sources.length ? w.prepareNextSource() : w.end();
        }), f.on("error", function(o) {
          w.error(o);
        }), this;
      }, S.prototype.resume = function() {
        return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, S.prototype.error = function(f) {
        var w = this._sources;
        if (!c.prototype.error.call(this, f)) return !1;
        for (var o = 0; o < w.length; o++) try {
          w[o].error(f);
        } catch {
        }
        return !0;
      }, S.prototype.lock = function() {
        c.prototype.lock.call(this);
        for (var f = this._sources, w = 0; w < f.length; w++) f[w].lock();
      }, h.exports = S;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(n, h, l) {
      var r = n("../compressions"), s = n("./ZipFileWorker");
      l.generateWorker = function(i, c, _) {
        var x = new s(c.streamFiles, _, c.platform, c.encodeFileName), y = 0;
        try {
          i.forEach(function(S, f) {
            y++;
            var w = function(g, k) {
              var C = g || k, R = r[C];
              if (!R) throw new Error(C + " is not a valid compression method !");
              return R;
            }(f.options.compression, c.compression), o = f.options.compressionOptions || c.compressionOptions || {}, m = f.dir, d = f.date;
            f._compressWorker(w, o).withStreamInfo("file", { name: S, dir: m, date: d, comment: f.comment || "", unixPermissions: f.unixPermissions, dosPermissions: f.dosPermissions }).pipe(x);
          }), x.entriesCount = y;
        } catch (S) {
          x.error(S);
        }
        return x;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(n, h, l) {
      function r() {
        if (!(this instanceof r)) return new r();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var s = new r();
          for (var i in this) typeof this[i] != "function" && (s[i] = this[i]);
          return s;
        };
      }
      (r.prototype = n("./object")).loadAsync = n("./load"), r.support = n("./support"), r.defaults = n("./defaults"), r.version = "3.10.1", r.loadAsync = function(s, i) {
        return new r().loadAsync(s, i);
      }, r.external = n("./external"), h.exports = r;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(n, h, l) {
      var r = n("./utils"), s = n("./external"), i = n("./utf8"), c = n("./zipEntries"), _ = n("./stream/Crc32Probe"), x = n("./nodejsUtils");
      function y(S) {
        return new s.Promise(function(f, w) {
          var o = S.decompressed.getContentWorker().pipe(new _());
          o.on("error", function(m) {
            w(m);
          }).on("end", function() {
            o.streamInfo.crc32 !== S.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : f();
          }).resume();
        });
      }
      h.exports = function(S, f) {
        var w = this;
        return f = r.extend(f || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: i.utf8decode }), x.isNode && x.isStream(S) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", S, !0, f.optimizedBinaryString, f.base64).then(function(o) {
          var m = new c(f);
          return m.load(o), m;
        }).then(function(o) {
          var m = [s.Promise.resolve(o)], d = o.files;
          if (f.checkCRC32) for (var g = 0; g < d.length; g++) m.push(y(d[g]));
          return s.Promise.all(m);
        }).then(function(o) {
          for (var m = o.shift(), d = m.files, g = 0; g < d.length; g++) {
            var k = d[g], C = k.fileNameStr, R = r.resolve(k.fileNameStr);
            w.file(R, k.decompressed, { binary: !0, optimizedBinaryString: !0, date: k.date, dir: k.dir, comment: k.fileCommentStr.length ? k.fileCommentStr : null, unixPermissions: k.unixPermissions, dosPermissions: k.dosPermissions, createFolders: f.createFolders }), k.dir || (w.file(R).unsafeOriginalName = C);
          }
          return m.zipComment.length && (w.comment = m.zipComment), w;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(n, h, l) {
      var r = n("../utils"), s = n("../stream/GenericWorker");
      function i(c, _) {
        s.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(_);
      }
      r.inherits(i, s), i.prototype._bindStream = function(c) {
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
      }, h.exports = i;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(n, h, l) {
      var r = n("readable-stream").Readable;
      function s(i, c, _) {
        r.call(this, c), this._helper = i;
        var x = this;
        i.on("data", function(y, S) {
          x.push(y) || x._helper.pause(), _ && _(S);
        }).on("error", function(y) {
          x.emit("error", y);
        }).on("end", function() {
          x.push(null);
        });
      }
      n("../utils").inherits(s, r), s.prototype._read = function() {
        this._helper.resume();
      }, h.exports = s;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(n, h, l) {
      h.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(r, s) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(r, s);
        if (typeof r == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(r, s);
      }, allocBuffer: function(r) {
        if (Buffer.alloc) return Buffer.alloc(r);
        var s = new Buffer(r);
        return s.fill(0), s;
      }, isBuffer: function(r) {
        return Buffer.isBuffer(r);
      }, isStream: function(r) {
        return r && typeof r.on == "function" && typeof r.pause == "function" && typeof r.resume == "function";
      } };
    }, {}], 15: [function(n, h, l) {
      function r(R, L, P) {
        var U, A = i.getTypeOf(L), W = i.extend(P || {}, x);
        W.date = W.date || /* @__PURE__ */ new Date(), W.compression !== null && (W.compression = W.compression.toUpperCase()), typeof W.unixPermissions == "string" && (W.unixPermissions = parseInt(W.unixPermissions, 8)), W.unixPermissions && 16384 & W.unixPermissions && (W.dir = !0), W.dosPermissions && 16 & W.dosPermissions && (W.dir = !0), W.dir && (R = d(R)), W.createFolders && (U = m(R)) && g.call(this, U, !0);
        var Q = A === "string" && W.binary === !1 && W.base64 === !1;
        P && P.binary !== void 0 || (W.binary = !Q), (L instanceof y && L.uncompressedSize === 0 || W.dir || !L || L.length === 0) && (W.base64 = !1, W.binary = !0, L = "", W.compression = "STORE", A = "string");
        var b = null;
        b = L instanceof y || L instanceof c ? L : w.isNode && w.isStream(L) ? new o(R, L) : i.prepareContent(R, L, W.binary, W.optimizedBinaryString, W.base64);
        var D = new S(R, b, W);
        this.files[R] = D;
      }
      var s = n("./utf8"), i = n("./utils"), c = n("./stream/GenericWorker"), _ = n("./stream/StreamHelper"), x = n("./defaults"), y = n("./compressedObject"), S = n("./zipObject"), f = n("./generate"), w = n("./nodejsUtils"), o = n("./nodejs/NodejsStreamInputAdapter"), m = function(R) {
        R.slice(-1) === "/" && (R = R.substring(0, R.length - 1));
        var L = R.lastIndexOf("/");
        return 0 < L ? R.substring(0, L) : "";
      }, d = function(R) {
        return R.slice(-1) !== "/" && (R += "/"), R;
      }, g = function(R, L) {
        return L = L !== void 0 ? L : x.createFolders, R = d(R), this.files[R] || r.call(this, R, null, { dir: !0, createFolders: L }), this.files[R];
      };
      function k(R) {
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
        if (arguments.length !== 1) return R = this.root + R, r.call(this, R, L, P), this;
        if (k(R)) {
          var U = R;
          return this.filter(function(W, Q) {
            return !Q.dir && U.test(W);
          });
        }
        var A = this.files[this.root + R];
        return A && !A.dir ? A : null;
      }, folder: function(R) {
        if (!R) return this;
        if (k(R)) return this.filter(function(A, W) {
          return W.dir && R.test(A);
        });
        var L = this.root + R, P = g.call(this, L), U = this.clone();
        return U.root = P.name, U;
      }, remove: function(R) {
        R = this.root + R;
        var L = this.files[R];
        if (L || (R.slice(-1) !== "/" && (R += "/"), L = this.files[R]), L && !L.dir) delete this.files[R];
        else for (var P = this.filter(function(A, W) {
          return W.name.slice(0, R.length) === R;
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
          L = f.generateWorker(this, P, U);
        } catch (A) {
          (L = new c("error")).error(A);
        }
        return new _(L, P.type || "string", P.mimeType);
      }, generateAsync: function(R, L) {
        return this.generateInternalStream(R).accumulate(L);
      }, generateNodeStream: function(R, L) {
        return (R = R || {}).type || (R.type = "nodebuffer"), this.generateInternalStream(R).toNodejsStream(L);
      } };
      h.exports = C;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(n, h, l) {
      h.exports = n("stream");
    }, { stream: void 0 }], 17: [function(n, h, l) {
      var r = n("./DataReader");
      function s(i) {
        r.call(this, i);
        for (var c = 0; c < this.data.length; c++) i[c] = 255 & i[c];
      }
      n("../utils").inherits(s, r), s.prototype.byteAt = function(i) {
        return this.data[this.zero + i];
      }, s.prototype.lastIndexOfSignature = function(i) {
        for (var c = i.charCodeAt(0), _ = i.charCodeAt(1), x = i.charCodeAt(2), y = i.charCodeAt(3), S = this.length - 4; 0 <= S; --S) if (this.data[S] === c && this.data[S + 1] === _ && this.data[S + 2] === x && this.data[S + 3] === y) return S - this.zero;
        return -1;
      }, s.prototype.readAndCheckSignature = function(i) {
        var c = i.charCodeAt(0), _ = i.charCodeAt(1), x = i.charCodeAt(2), y = i.charCodeAt(3), S = this.readData(4);
        return c === S[0] && _ === S[1] && x === S[2] && y === S[3];
      }, s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return [];
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, h.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(n, h, l) {
      var r = n("../utils");
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
        return r.transformTo("string", this.readData(i));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var i = this.readInt(4);
        return new Date(Date.UTC(1980 + (i >> 25 & 127), (i >> 21 & 15) - 1, i >> 16 & 31, i >> 11 & 31, i >> 5 & 63, (31 & i) << 1));
      } }, h.exports = s;
    }, { "../utils": 32 }], 19: [function(n, h, l) {
      var r = n("./Uint8ArrayReader");
      function s(i) {
        r.call(this, i);
      }
      n("../utils").inherits(s, r), s.prototype.readData = function(i) {
        this.checkOffset(i);
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, h.exports = s;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(n, h, l) {
      var r = n("./DataReader");
      function s(i) {
        r.call(this, i);
      }
      n("../utils").inherits(s, r), s.prototype.byteAt = function(i) {
        return this.data.charCodeAt(this.zero + i);
      }, s.prototype.lastIndexOfSignature = function(i) {
        return this.data.lastIndexOf(i) - this.zero;
      }, s.prototype.readAndCheckSignature = function(i) {
        return i === this.readData(4);
      }, s.prototype.readData = function(i) {
        this.checkOffset(i);
        var c = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, h.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(n, h, l) {
      var r = n("./ArrayReader");
      function s(i) {
        r.call(this, i);
      }
      n("../utils").inherits(s, r), s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return new Uint8Array(0);
        var c = this.data.subarray(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, c;
      }, h.exports = s;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(n, h, l) {
      var r = n("../utils"), s = n("../support"), i = n("./ArrayReader"), c = n("./StringReader"), _ = n("./NodeBufferReader"), x = n("./Uint8ArrayReader");
      h.exports = function(y) {
        var S = r.getTypeOf(y);
        return r.checkSupport(S), S !== "string" || s.uint8array ? S === "nodebuffer" ? new _(y) : s.uint8array ? new x(r.transformTo("uint8array", y)) : new i(r.transformTo("array", y)) : new c(y);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(n, h, l) {
      l.LOCAL_FILE_HEADER = "PK", l.CENTRAL_FILE_HEADER = "PK", l.CENTRAL_DIRECTORY_END = "PK", l.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", l.ZIP64_CENTRAL_DIRECTORY_END = "PK", l.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(n, h, l) {
      var r = n("./GenericWorker"), s = n("../utils");
      function i(c) {
        r.call(this, "ConvertWorker to " + c), this.destType = c;
      }
      s.inherits(i, r), i.prototype.processChunk = function(c) {
        this.push({ data: s.transformTo(this.destType, c.data), meta: c.meta });
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(n, h, l) {
      var r = n("./GenericWorker"), s = n("../crc32");
      function i() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      n("../utils").inherits(i, r), i.prototype.processChunk = function(c) {
        this.streamInfo.crc32 = s(c.data, this.streamInfo.crc32 || 0), this.push(c);
      }, h.exports = i;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(n, h, l) {
      var r = n("../utils"), s = n("./GenericWorker");
      function i(c) {
        s.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
      }
      r.inherits(i, s), i.prototype.processChunk = function(c) {
        if (c) {
          var _ = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = _ + c.data.length;
        }
        s.prototype.processChunk.call(this, c);
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(n, h, l) {
      var r = n("../utils"), s = n("./GenericWorker");
      function i(c) {
        s.call(this, "DataWorker");
        var _ = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(x) {
          _.dataIsReady = !0, _.data = x, _.max = x && x.length || 0, _.type = r.getTypeOf(x), _.isPaused || _._tickAndRepeat();
        }, function(x) {
          _.error(x);
        });
      }
      r.inherits(i, s), i.prototype.cleanUp = function() {
        s.prototype.cleanUp.call(this), this.data = null;
      }, i.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0);
      }, i.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
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
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(n, h, l) {
      function r(s) {
        this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      r.prototype = { push: function(s) {
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
      } }, h.exports = r;
    }, {}], 29: [function(n, h, l) {
      var r = n("../utils"), s = n("./ConvertWorker"), i = n("./GenericWorker"), c = n("../base64"), _ = n("../support"), x = n("../external"), y = null;
      if (_.nodestream) try {
        y = n("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function S(w, o) {
        return new x.Promise(function(m, d) {
          var g = [], k = w._internalType, C = w._outputType, R = w._mimeType;
          w.on("data", function(L, P) {
            g.push(L), o && o(P);
          }).on("error", function(L) {
            g = [], d(L);
          }).on("end", function() {
            try {
              var L = function(P, U, A) {
                switch (P) {
                  case "blob":
                    return r.newBlob(r.transformTo("arraybuffer", U), A);
                  case "base64":
                    return c.encode(U);
                  default:
                    return r.transformTo(P, U);
                }
              }(C, function(P, U) {
                var A, W = 0, Q = null, b = 0;
                for (A = 0; A < U.length; A++) b += U[A].length;
                switch (P) {
                  case "string":
                    return U.join("");
                  case "array":
                    return Array.prototype.concat.apply([], U);
                  case "uint8array":
                    for (Q = new Uint8Array(b), A = 0; A < U.length; A++) Q.set(U[A], W), W += U[A].length;
                    return Q;
                  case "nodebuffer":
                    return Buffer.concat(U);
                  default:
                    throw new Error("concat : unsupported type '" + P + "'");
                }
              }(k, g), R);
              m(L);
            } catch (P) {
              d(P);
            }
            g = [];
          }).resume();
        });
      }
      function f(w, o, m) {
        var d = o;
        switch (o) {
          case "blob":
          case "arraybuffer":
            d = "uint8array";
            break;
          case "base64":
            d = "string";
        }
        try {
          this._internalType = d, this._outputType = o, this._mimeType = m, r.checkSupport(d), this._worker = w.pipe(new s(d)), w.lock();
        } catch (g) {
          this._worker = new i("error"), this._worker.error(g);
        }
      }
      f.prototype = { accumulate: function(w) {
        return S(this, w);
      }, on: function(w, o) {
        var m = this;
        return w === "data" ? this._worker.on(w, function(d) {
          o.call(m, d.data, d.meta);
        }) : this._worker.on(w, function() {
          r.delay(o, arguments, m);
        }), this;
      }, resume: function() {
        return r.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(w) {
        if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new y(this, { objectMode: this._outputType !== "nodebuffer" }, w);
      } }, h.exports = f;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(n, h, l) {
      if (l.base64 = !0, l.array = !0, l.string = !0, l.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", l.nodebuffer = typeof Buffer < "u", l.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") l.blob = !1;
      else {
        var r = new ArrayBuffer(0);
        try {
          l.blob = new Blob([r], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            s.append(r), l.blob = s.getBlob("application/zip").size === 0;
          } catch {
            l.blob = !1;
          }
        }
      }
      try {
        l.nodestream = !!n("readable-stream").Readable;
      } catch {
        l.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(n, h, l) {
      for (var r = n("./utils"), s = n("./support"), i = n("./nodejsUtils"), c = n("./stream/GenericWorker"), _ = new Array(256), x = 0; x < 256; x++) _[x] = 252 <= x ? 6 : 248 <= x ? 5 : 240 <= x ? 4 : 224 <= x ? 3 : 192 <= x ? 2 : 1;
      _[254] = _[254] = 1;
      function y() {
        c.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function S() {
        c.call(this, "utf-8 encode");
      }
      l.utf8encode = function(f) {
        return s.nodebuffer ? i.newBufferFrom(f, "utf-8") : function(w) {
          var o, m, d, g, k, C = w.length, R = 0;
          for (g = 0; g < C; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (d = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), g++), R += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (o = s.uint8array ? new Uint8Array(R) : new Array(R), g = k = 0; k < R; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (d = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), g++), m < 128 ? o[k++] = m : (m < 2048 ? o[k++] = 192 | m >>> 6 : (m < 65536 ? o[k++] = 224 | m >>> 12 : (o[k++] = 240 | m >>> 18, o[k++] = 128 | m >>> 12 & 63), o[k++] = 128 | m >>> 6 & 63), o[k++] = 128 | 63 & m);
          return o;
        }(f);
      }, l.utf8decode = function(f) {
        return s.nodebuffer ? r.transformTo("nodebuffer", f).toString("utf-8") : function(w) {
          var o, m, d, g, k = w.length, C = new Array(2 * k);
          for (o = m = 0; o < k; ) if ((d = w[o++]) < 128) C[m++] = d;
          else if (4 < (g = _[d])) C[m++] = 65533, o += g - 1;
          else {
            for (d &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && o < k; ) d = d << 6 | 63 & w[o++], g--;
            1 < g ? C[m++] = 65533 : d < 65536 ? C[m++] = d : (d -= 65536, C[m++] = 55296 | d >> 10 & 1023, C[m++] = 56320 | 1023 & d);
          }
          return C.length !== m && (C.subarray ? C = C.subarray(0, m) : C.length = m), r.applyFromCharCode(C);
        }(f = r.transformTo(s.uint8array ? "uint8array" : "array", f));
      }, r.inherits(y, c), y.prototype.processChunk = function(f) {
        var w = r.transformTo(s.uint8array ? "uint8array" : "array", f.data);
        if (this.leftOver && this.leftOver.length) {
          if (s.uint8array) {
            var o = w;
            (w = new Uint8Array(o.length + this.leftOver.length)).set(this.leftOver, 0), w.set(o, this.leftOver.length);
          } else w = this.leftOver.concat(w);
          this.leftOver = null;
        }
        var m = function(g, k) {
          var C;
          for ((k = k || g.length) > g.length && (k = g.length), C = k - 1; 0 <= C && (192 & g[C]) == 128; ) C--;
          return C < 0 || C === 0 ? k : C + _[g[C]] > k ? C : k;
        }(w), d = w;
        m !== w.length && (s.uint8array ? (d = w.subarray(0, m), this.leftOver = w.subarray(m, w.length)) : (d = w.slice(0, m), this.leftOver = w.slice(m, w.length))), this.push({ data: l.utf8decode(d), meta: f.meta });
      }, y.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: l.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, l.Utf8DecodeWorker = y, r.inherits(S, c), S.prototype.processChunk = function(f) {
        this.push({ data: l.utf8encode(f.data), meta: f.meta });
      }, l.Utf8EncodeWorker = S;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(n, h, l) {
      var r = n("./support"), s = n("./base64"), i = n("./nodejsUtils"), c = n("./external");
      function _(o) {
        return o;
      }
      function x(o, m) {
        for (var d = 0; d < o.length; ++d) m[d] = 255 & o.charCodeAt(d);
        return m;
      }
      n("setimmediate"), l.newBlob = function(o, m) {
        l.checkSupport("blob");
        try {
          return new Blob([o], { type: m });
        } catch {
          try {
            var d = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return d.append(o), d.getBlob(m);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var y = { stringifyByChunk: function(o, m, d) {
        var g = [], k = 0, C = o.length;
        if (C <= d) return String.fromCharCode.apply(null, o);
        for (; k < C; ) m === "array" || m === "nodebuffer" ? g.push(String.fromCharCode.apply(null, o.slice(k, Math.min(k + d, C)))) : g.push(String.fromCharCode.apply(null, o.subarray(k, Math.min(k + d, C)))), k += d;
        return g.join("");
      }, stringifyByChar: function(o) {
        for (var m = "", d = 0; d < o.length; d++) m += String.fromCharCode(o[d]);
        return m;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return r.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return r.nodebuffer && String.fromCharCode.apply(null, i.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function S(o) {
        var m = 65536, d = l.getTypeOf(o), g = !0;
        if (d === "uint8array" ? g = y.applyCanBeUsed.uint8array : d === "nodebuffer" && (g = y.applyCanBeUsed.nodebuffer), g) for (; 1 < m; ) try {
          return y.stringifyByChunk(o, d, m);
        } catch {
          m = Math.floor(m / 2);
        }
        return y.stringifyByChar(o);
      }
      function f(o, m) {
        for (var d = 0; d < o.length; d++) m[d] = o[d];
        return m;
      }
      l.applyFromCharCode = S;
      var w = {};
      w.string = { string: _, array: function(o) {
        return x(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return w.string.uint8array(o).buffer;
      }, uint8array: function(o) {
        return x(o, new Uint8Array(o.length));
      }, nodebuffer: function(o) {
        return x(o, i.allocBuffer(o.length));
      } }, w.array = { string: S, array: _, arraybuffer: function(o) {
        return new Uint8Array(o).buffer;
      }, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return i.newBufferFrom(o);
      } }, w.arraybuffer = { string: function(o) {
        return S(new Uint8Array(o));
      }, array: function(o) {
        return f(new Uint8Array(o), new Array(o.byteLength));
      }, arraybuffer: _, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return i.newBufferFrom(new Uint8Array(o));
      } }, w.uint8array = { string: S, array: function(o) {
        return f(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return o.buffer;
      }, uint8array: _, nodebuffer: function(o) {
        return i.newBufferFrom(o);
      } }, w.nodebuffer = { string: S, array: function(o) {
        return f(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return w.nodebuffer.uint8array(o).buffer;
      }, uint8array: function(o) {
        return f(o, new Uint8Array(o.length));
      }, nodebuffer: _ }, l.transformTo = function(o, m) {
        if (m = m || "", !o) return m;
        l.checkSupport(o);
        var d = l.getTypeOf(m);
        return w[d][o](m);
      }, l.resolve = function(o) {
        for (var m = o.split("/"), d = [], g = 0; g < m.length; g++) {
          var k = m[g];
          k === "." || k === "" && g !== 0 && g !== m.length - 1 || (k === ".." ? d.pop() : d.push(k));
        }
        return d.join("/");
      }, l.getTypeOf = function(o) {
        return typeof o == "string" ? "string" : Object.prototype.toString.call(o) === "[object Array]" ? "array" : r.nodebuffer && i.isBuffer(o) ? "nodebuffer" : r.uint8array && o instanceof Uint8Array ? "uint8array" : r.arraybuffer && o instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, l.checkSupport = function(o) {
        if (!r[o.toLowerCase()]) throw new Error(o + " is not supported by this platform");
      }, l.MAX_VALUE_16BITS = 65535, l.MAX_VALUE_32BITS = -1, l.pretty = function(o) {
        var m, d, g = "";
        for (d = 0; d < (o || "").length; d++) g += "\\x" + ((m = o.charCodeAt(d)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
        return g;
      }, l.delay = function(o, m, d) {
        setImmediate(function() {
          o.apply(d || null, m || []);
        });
      }, l.inherits = function(o, m) {
        function d() {
        }
        d.prototype = m.prototype, o.prototype = new d();
      }, l.extend = function() {
        var o, m, d = {};
        for (o = 0; o < arguments.length; o++) for (m in arguments[o]) Object.prototype.hasOwnProperty.call(arguments[o], m) && d[m] === void 0 && (d[m] = arguments[o][m]);
        return d;
      }, l.prepareContent = function(o, m, d, g, k) {
        return c.Promise.resolve(m).then(function(C) {
          return r.blob && (C instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(C)) !== -1) && typeof FileReader < "u" ? new c.Promise(function(R, L) {
            var P = new FileReader();
            P.onload = function(U) {
              R(U.target.result);
            }, P.onerror = function(U) {
              L(U.target.error);
            }, P.readAsArrayBuffer(C);
          }) : C;
        }).then(function(C) {
          var R = l.getTypeOf(C);
          return R ? (R === "arraybuffer" ? C = l.transformTo("uint8array", C) : R === "string" && (k ? C = s.decode(C) : d && g !== !0 && (C = function(L) {
            return x(L, r.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(C))), C) : c.Promise.reject(new Error("Can't read the data of '" + o + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(n, h, l) {
      var r = n("./reader/readerFor"), s = n("./utils"), i = n("./signature"), c = n("./zipEntry"), _ = n("./support");
      function x(y) {
        this.files = [], this.loadOptions = y;
      }
      x.prototype = { checkSignature: function(y) {
        if (!this.reader.readAndCheckSignature(y)) {
          this.reader.index -= 4;
          var S = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(S) + ", expected " + s.pretty(y) + ")");
        }
      }, isSignature: function(y, S) {
        var f = this.reader.index;
        this.reader.setIndex(y);
        var w = this.reader.readString(4) === S;
        return this.reader.setIndex(f), w;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var y = this.reader.readData(this.zipCommentLength), S = _.uint8array ? "uint8array" : "array", f = s.transformTo(S, y);
        this.zipComment = this.loadOptions.decodeFileName(f);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var y, S, f, w = this.zip64EndOfCentralSize - 44; 0 < w; ) y = this.reader.readInt(2), S = this.reader.readInt(4), f = this.reader.readData(S), this.zip64ExtensibleData[y] = { id: y, length: S, value: f };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var y, S;
        for (y = 0; y < this.files.length; y++) S = this.files[y], this.reader.setIndex(S.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), S.readLocalPart(this.reader), S.handleUTF8(), S.processAttributes();
      }, readCentralDir: function() {
        var y;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(i.CENTRAL_FILE_HEADER); ) (y = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(y);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var y = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
        if (y < 0) throw this.isSignature(0, i.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(y);
        var S = y;
        if (this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (y = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(y), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, i.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var f = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (f += 20, f += 12 + this.zip64EndOfCentralSize);
        var w = S - f;
        if (0 < w) this.isSignature(S, i.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
        else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
      }, prepareReader: function(y) {
        this.reader = r(y);
      }, load: function(y) {
        this.prepareReader(y), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, h.exports = x;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(n, h, l) {
      var r = n("./reader/readerFor"), s = n("./utils"), i = n("./compressedObject"), c = n("./crc32"), _ = n("./utf8"), x = n("./compressions"), y = n("./support");
      function S(f, w) {
        this.options = f, this.loadOptions = w;
      }
      S.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(f) {
        var w, o;
        if (f.skip(22), this.fileNameLength = f.readInt(2), o = f.readInt(2), this.fileName = f.readData(this.fileNameLength), f.skip(o), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((w = function(m) {
          for (var d in x) if (Object.prototype.hasOwnProperty.call(x, d) && x[d].magic === m) return x[d];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, w, f.readData(this.compressedSize));
      }, readCentralPart: function(f) {
        this.versionMadeBy = f.readInt(2), f.skip(2), this.bitFlag = f.readInt(2), this.compressionMethod = f.readString(2), this.date = f.readDate(), this.crc32 = f.readInt(4), this.compressedSize = f.readInt(4), this.uncompressedSize = f.readInt(4);
        var w = f.readInt(2);
        if (this.extraFieldsLength = f.readInt(2), this.fileCommentLength = f.readInt(2), this.diskNumberStart = f.readInt(2), this.internalFileAttributes = f.readInt(2), this.externalFileAttributes = f.readInt(4), this.localHeaderOffset = f.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        f.skip(w), this.readExtraFields(f), this.parseZIP64ExtraField(f), this.fileComment = f.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var f = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), f == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), f == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var f = r(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = f.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = f.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = f.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = f.readInt(4));
        }
      }, readExtraFields: function(f) {
        var w, o, m, d = f.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); f.index + 4 < d; ) w = f.readInt(2), o = f.readInt(2), m = f.readData(o), this.extraFields[w] = { id: w, length: o, value: m };
        f.setIndex(d);
      }, handleUTF8: function() {
        var f = y.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = _.utf8decode(this.fileName), this.fileCommentStr = _.utf8decode(this.fileComment);
        else {
          var w = this.findExtraFieldUnicodePath();
          if (w !== null) this.fileNameStr = w;
          else {
            var o = s.transformTo(f, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(o);
          }
          var m = this.findExtraFieldUnicodeComment();
          if (m !== null) this.fileCommentStr = m;
          else {
            var d = s.transformTo(f, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(d);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var f = this.extraFields[28789];
        if (f) {
          var w = r(f.value);
          return w.readInt(1) !== 1 || c(this.fileName) !== w.readInt(4) ? null : _.utf8decode(w.readData(f.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var f = this.extraFields[25461];
        if (f) {
          var w = r(f.value);
          return w.readInt(1) !== 1 || c(this.fileComment) !== w.readInt(4) ? null : _.utf8decode(w.readData(f.length - 5));
        }
        return null;
      } }, h.exports = S;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(n, h, l) {
      function r(w, o, m) {
        this.name = w, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = o, this._dataBinary = m.binary, this.options = { compression: m.compression, compressionOptions: m.compressionOptions };
      }
      var s = n("./stream/StreamHelper"), i = n("./stream/DataWorker"), c = n("./utf8"), _ = n("./compressedObject"), x = n("./stream/GenericWorker");
      r.prototype = { internalStream: function(w) {
        var o = null, m = "string";
        try {
          if (!w) throw new Error("No output type specified.");
          var d = (m = w.toLowerCase()) === "string" || m === "text";
          m !== "binarystring" && m !== "text" || (m = "string"), o = this._decompressWorker();
          var g = !this._dataBinary;
          g && !d && (o = o.pipe(new c.Utf8EncodeWorker())), !g && d && (o = o.pipe(new c.Utf8DecodeWorker()));
        } catch (k) {
          (o = new x("error")).error(k);
        }
        return new s(o, m, "");
      }, async: function(w, o) {
        return this.internalStream(w).accumulate(o);
      }, nodeStream: function(w, o) {
        return this.internalStream(w || "nodebuffer").toNodejsStream(o);
      }, _compressWorker: function(w, o) {
        if (this._data instanceof _ && this._data.compression.magic === w.magic) return this._data.getCompressedWorker();
        var m = this._decompressWorker();
        return this._dataBinary || (m = m.pipe(new c.Utf8EncodeWorker())), _.createWorkerFrom(m, w, o);
      }, _decompressWorker: function() {
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof x ? this._data : new i(this._data);
      } };
      for (var y = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], S = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, f = 0; f < y.length; f++) r.prototype[y[f]] = S;
      h.exports = r;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(n, h, l) {
      (function(r) {
        var s, i, c = r.MutationObserver || r.WebKitMutationObserver;
        if (c) {
          var _ = 0, x = new c(w), y = r.document.createTextNode("");
          x.observe(y, { characterData: !0 }), s = function() {
            y.data = _ = ++_ % 2;
          };
        } else if (r.setImmediate || r.MessageChannel === void 0) s = "document" in r && "onreadystatechange" in r.document.createElement("script") ? function() {
          var o = r.document.createElement("script");
          o.onreadystatechange = function() {
            w(), o.onreadystatechange = null, o.parentNode.removeChild(o), o = null;
          }, r.document.documentElement.appendChild(o);
        } : function() {
          setTimeout(w, 0);
        };
        else {
          var S = new r.MessageChannel();
          S.port1.onmessage = w, s = function() {
            S.port2.postMessage(0);
          };
        }
        var f = [];
        function w() {
          var o, m;
          i = !0;
          for (var d = f.length; d; ) {
            for (m = f, f = [], o = -1; ++o < d; ) m[o]();
            d = f.length;
          }
          i = !1;
        }
        h.exports = function(o) {
          f.push(o) !== 1 || i || s();
        };
      }).call(this, typeof Jt < "u" ? Jt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(n, h, l) {
      var r = n("immediate");
      function s() {
      }
      var i = {}, c = ["REJECTED"], _ = ["FULFILLED"], x = ["PENDING"];
      function y(d) {
        if (typeof d != "function") throw new TypeError("resolver must be a function");
        this.state = x, this.queue = [], this.outcome = void 0, d !== s && o(this, d);
      }
      function S(d, g, k) {
        this.promise = d, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof k == "function" && (this.onRejected = k, this.callRejected = this.otherCallRejected);
      }
      function f(d, g, k) {
        r(function() {
          var C;
          try {
            C = g(k);
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
      function o(d, g) {
        var k = !1;
        function C(P) {
          k || (k = !0, i.reject(d, P));
        }
        function R(P) {
          k || (k = !0, i.resolve(d, P));
        }
        var L = m(function() {
          g(R, C);
        });
        L.status === "error" && C(L.value);
      }
      function m(d, g) {
        var k = {};
        try {
          k.value = d(g), k.status = "success";
        } catch (C) {
          k.status = "error", k.value = C;
        }
        return k;
      }
      (h.exports = y).prototype.finally = function(d) {
        if (typeof d != "function") return this;
        var g = this.constructor;
        return this.then(function(k) {
          return g.resolve(d()).then(function() {
            return k;
          });
        }, function(k) {
          return g.resolve(d()).then(function() {
            throw k;
          });
        });
      }, y.prototype.catch = function(d) {
        return this.then(null, d);
      }, y.prototype.then = function(d, g) {
        if (typeof d != "function" && this.state === _ || typeof g != "function" && this.state === c) return this;
        var k = new this.constructor(s);
        return this.state !== x ? f(k, this.state === _ ? d : g, this.outcome) : this.queue.push(new S(k, d, g)), k;
      }, S.prototype.callFulfilled = function(d) {
        i.resolve(this.promise, d);
      }, S.prototype.otherCallFulfilled = function(d) {
        f(this.promise, this.onFulfilled, d);
      }, S.prototype.callRejected = function(d) {
        i.reject(this.promise, d);
      }, S.prototype.otherCallRejected = function(d) {
        f(this.promise, this.onRejected, d);
      }, i.resolve = function(d, g) {
        var k = m(w, g);
        if (k.status === "error") return i.reject(d, k.value);
        var C = k.value;
        if (C) o(d, C);
        else {
          d.state = _, d.outcome = g;
          for (var R = -1, L = d.queue.length; ++R < L; ) d.queue[R].callFulfilled(g);
        }
        return d;
      }, i.reject = function(d, g) {
        d.state = c, d.outcome = g;
        for (var k = -1, C = d.queue.length; ++k < C; ) d.queue[k].callRejected(g);
        return d;
      }, y.resolve = function(d) {
        return d instanceof this ? d : i.resolve(new this(s), d);
      }, y.reject = function(d) {
        var g = new this(s);
        return i.reject(g, d);
      }, y.all = function(d) {
        var g = this;
        if (Object.prototype.toString.call(d) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = d.length, C = !1;
        if (!k) return this.resolve([]);
        for (var R = new Array(k), L = 0, P = -1, U = new this(s); ++P < k; ) A(d[P], P);
        return U;
        function A(W, Q) {
          g.resolve(W).then(function(b) {
            R[Q] = b, ++L !== k || C || (C = !0, i.resolve(U, R));
          }, function(b) {
            C || (C = !0, i.reject(U, b));
          });
        }
      }, y.race = function(d) {
        var g = this;
        if (Object.prototype.toString.call(d) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = d.length, C = !1;
        if (!k) return this.resolve([]);
        for (var R = -1, L = new this(s); ++R < k; ) P = d[R], g.resolve(P).then(function(U) {
          C || (C = !0, i.resolve(L, U));
        }, function(U) {
          C || (C = !0, i.reject(L, U));
        });
        var P;
        return L;
      };
    }, { immediate: 36 }], 38: [function(n, h, l) {
      var r = {};
      (0, n("./lib/utils/common").assign)(r, n("./lib/deflate"), n("./lib/inflate"), n("./lib/zlib/constants")), h.exports = r;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(n, h, l) {
      var r = n("./zlib/deflate"), s = n("./utils/common"), i = n("./utils/strings"), c = n("./zlib/messages"), _ = n("./zlib/zstream"), x = Object.prototype.toString, y = 0, S = -1, f = 0, w = 8;
      function o(d) {
        if (!(this instanceof o)) return new o(d);
        this.options = s.assign({ level: S, method: w, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: f, to: "" }, d || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var k = r.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (k !== y) throw new Error(c[k]);
        if (g.header && r.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var C;
          if (C = typeof g.dictionary == "string" ? i.string2buf(g.dictionary) : x.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (k = r.deflateSetDictionary(this.strm, C)) !== y) throw new Error(c[k]);
          this._dict_set = !0;
        }
      }
      function m(d, g) {
        var k = new o(g);
        if (k.push(d, !0), k.err) throw k.msg || c[k.err];
        return k.result;
      }
      o.prototype.push = function(d, g) {
        var k, C, R = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        C = g === ~~g ? g : g === !0 ? 4 : 0, typeof d == "string" ? R.input = i.string2buf(d) : x.call(d) === "[object ArrayBuffer]" ? R.input = new Uint8Array(d) : R.input = d, R.next_in = 0, R.avail_in = R.input.length;
        do {
          if (R.avail_out === 0 && (R.output = new s.Buf8(L), R.next_out = 0, R.avail_out = L), (k = r.deflate(R, C)) !== 1 && k !== y) return this.onEnd(k), !(this.ended = !0);
          R.avail_out !== 0 && (R.avail_in !== 0 || C !== 4 && C !== 2) || (this.options.to === "string" ? this.onData(i.buf2binstring(s.shrinkBuf(R.output, R.next_out))) : this.onData(s.shrinkBuf(R.output, R.next_out)));
        } while ((0 < R.avail_in || R.avail_out === 0) && k !== 1);
        return C === 4 ? (k = r.deflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === y) : C !== 2 || (this.onEnd(y), !(R.avail_out = 0));
      }, o.prototype.onData = function(d) {
        this.chunks.push(d);
      }, o.prototype.onEnd = function(d) {
        d === y && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = d, this.msg = this.strm.msg;
      }, l.Deflate = o, l.deflate = m, l.deflateRaw = function(d, g) {
        return (g = g || {}).raw = !0, m(d, g);
      }, l.gzip = function(d, g) {
        return (g = g || {}).gzip = !0, m(d, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(n, h, l) {
      var r = n("./zlib/inflate"), s = n("./utils/common"), i = n("./utils/strings"), c = n("./zlib/constants"), _ = n("./zlib/messages"), x = n("./zlib/zstream"), y = n("./zlib/gzheader"), S = Object.prototype.toString;
      function f(o) {
        if (!(this instanceof f)) return new f(o);
        this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, o || {});
        var m = this.options;
        m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), !(0 <= m.windowBits && m.windowBits < 16) || o && o.windowBits || (m.windowBits += 32), 15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new x(), this.strm.avail_out = 0;
        var d = r.inflateInit2(this.strm, m.windowBits);
        if (d !== c.Z_OK) throw new Error(_[d]);
        this.header = new y(), r.inflateGetHeader(this.strm, this.header);
      }
      function w(o, m) {
        var d = new f(m);
        if (d.push(o, !0), d.err) throw d.msg || _[d.err];
        return d.result;
      }
      f.prototype.push = function(o, m) {
        var d, g, k, C, R, L, P = this.strm, U = this.options.chunkSize, A = this.options.dictionary, W = !1;
        if (this.ended) return !1;
        g = m === ~~m ? m : m === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof o == "string" ? P.input = i.binstring2buf(o) : S.call(o) === "[object ArrayBuffer]" ? P.input = new Uint8Array(o) : P.input = o, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new s.Buf8(U), P.next_out = 0, P.avail_out = U), (d = r.inflate(P, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && A && (L = typeof A == "string" ? i.string2buf(A) : S.call(A) === "[object ArrayBuffer]" ? new Uint8Array(A) : A, d = r.inflateSetDictionary(this.strm, L)), d === c.Z_BUF_ERROR && W === !0 && (d = c.Z_OK, W = !1), d !== c.Z_STREAM_END && d !== c.Z_OK) return this.onEnd(d), !(this.ended = !0);
          P.next_out && (P.avail_out !== 0 && d !== c.Z_STREAM_END && (P.avail_in !== 0 || g !== c.Z_FINISH && g !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (k = i.utf8border(P.output, P.next_out), C = P.next_out - k, R = i.buf2string(P.output, k), P.next_out = C, P.avail_out = U - C, C && s.arraySet(P.output, P.output, k, C, 0), this.onData(R)) : this.onData(s.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (W = !0);
        } while ((0 < P.avail_in || P.avail_out === 0) && d !== c.Z_STREAM_END);
        return d === c.Z_STREAM_END && (g = c.Z_FINISH), g === c.Z_FINISH ? (d = r.inflateEnd(this.strm), this.onEnd(d), this.ended = !0, d === c.Z_OK) : g !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(P.avail_out = 0));
      }, f.prototype.onData = function(o) {
        this.chunks.push(o);
      }, f.prototype.onEnd = function(o) {
        o === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, l.Inflate = f, l.inflate = w, l.inflateRaw = function(o, m) {
        return (m = m || {}).raw = !0, w(o, m);
      }, l.ungzip = w;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(n, h, l) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      l.assign = function(c) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var x = _.shift();
          if (x) {
            if (typeof x != "object") throw new TypeError(x + "must be non-object");
            for (var y in x) x.hasOwnProperty(y) && (c[y] = x[y]);
          }
        }
        return c;
      }, l.shrinkBuf = function(c, _) {
        return c.length === _ ? c : c.subarray ? c.subarray(0, _) : (c.length = _, c);
      };
      var s = { arraySet: function(c, _, x, y, S) {
        if (_.subarray && c.subarray) c.set(_.subarray(x, x + y), S);
        else for (var f = 0; f < y; f++) c[S + f] = _[x + f];
      }, flattenChunks: function(c) {
        var _, x, y, S, f, w;
        for (_ = y = 0, x = c.length; _ < x; _++) y += c[_].length;
        for (w = new Uint8Array(y), _ = S = 0, x = c.length; _ < x; _++) f = c[_], w.set(f, S), S += f.length;
        return w;
      } }, i = { arraySet: function(c, _, x, y, S) {
        for (var f = 0; f < y; f++) c[S + f] = _[x + f];
      }, flattenChunks: function(c) {
        return [].concat.apply([], c);
      } };
      l.setTyped = function(c) {
        c ? (l.Buf8 = Uint8Array, l.Buf16 = Uint16Array, l.Buf32 = Int32Array, l.assign(l, s)) : (l.Buf8 = Array, l.Buf16 = Array, l.Buf32 = Array, l.assign(l, i));
      }, l.setTyped(r);
    }, {}], 42: [function(n, h, l) {
      var r = n("./common"), s = !0, i = !0;
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
      for (var c = new r.Buf8(256), _ = 0; _ < 256; _++) c[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
      function x(y, S) {
        if (S < 65537 && (y.subarray && i || !y.subarray && s)) return String.fromCharCode.apply(null, r.shrinkBuf(y, S));
        for (var f = "", w = 0; w < S; w++) f += String.fromCharCode(y[w]);
        return f;
      }
      c[254] = c[254] = 1, l.string2buf = function(y) {
        var S, f, w, o, m, d = y.length, g = 0;
        for (o = 0; o < d; o++) (64512 & (f = y.charCodeAt(o))) == 55296 && o + 1 < d && (64512 & (w = y.charCodeAt(o + 1))) == 56320 && (f = 65536 + (f - 55296 << 10) + (w - 56320), o++), g += f < 128 ? 1 : f < 2048 ? 2 : f < 65536 ? 3 : 4;
        for (S = new r.Buf8(g), o = m = 0; m < g; o++) (64512 & (f = y.charCodeAt(o))) == 55296 && o + 1 < d && (64512 & (w = y.charCodeAt(o + 1))) == 56320 && (f = 65536 + (f - 55296 << 10) + (w - 56320), o++), f < 128 ? S[m++] = f : (f < 2048 ? S[m++] = 192 | f >>> 6 : (f < 65536 ? S[m++] = 224 | f >>> 12 : (S[m++] = 240 | f >>> 18, S[m++] = 128 | f >>> 12 & 63), S[m++] = 128 | f >>> 6 & 63), S[m++] = 128 | 63 & f);
        return S;
      }, l.buf2binstring = function(y) {
        return x(y, y.length);
      }, l.binstring2buf = function(y) {
        for (var S = new r.Buf8(y.length), f = 0, w = S.length; f < w; f++) S[f] = y.charCodeAt(f);
        return S;
      }, l.buf2string = function(y, S) {
        var f, w, o, m, d = S || y.length, g = new Array(2 * d);
        for (f = w = 0; f < d; ) if ((o = y[f++]) < 128) g[w++] = o;
        else if (4 < (m = c[o])) g[w++] = 65533, f += m - 1;
        else {
          for (o &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && f < d; ) o = o << 6 | 63 & y[f++], m--;
          1 < m ? g[w++] = 65533 : o < 65536 ? g[w++] = o : (o -= 65536, g[w++] = 55296 | o >> 10 & 1023, g[w++] = 56320 | 1023 & o);
        }
        return x(g, w);
      }, l.utf8border = function(y, S) {
        var f;
        for ((S = S || y.length) > y.length && (S = y.length), f = S - 1; 0 <= f && (192 & y[f]) == 128; ) f--;
        return f < 0 || f === 0 ? S : f + c[y[f]] > S ? f : S;
      };
    }, { "./common": 41 }], 43: [function(n, h, l) {
      h.exports = function(r, s, i, c) {
        for (var _ = 65535 & r | 0, x = r >>> 16 & 65535 | 0, y = 0; i !== 0; ) {
          for (i -= y = 2e3 < i ? 2e3 : i; x = x + (_ = _ + s[c++] | 0) | 0, --y; ) ;
          _ %= 65521, x %= 65521;
        }
        return _ | x << 16 | 0;
      };
    }, {}], 44: [function(n, h, l) {
      h.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(n, h, l) {
      var r = function() {
        for (var s, i = [], c = 0; c < 256; c++) {
          s = c;
          for (var _ = 0; _ < 8; _++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
          i[c] = s;
        }
        return i;
      }();
      h.exports = function(s, i, c, _) {
        var x = r, y = _ + c;
        s ^= -1;
        for (var S = _; S < y; S++) s = s >>> 8 ^ x[255 & (s ^ i[S])];
        return -1 ^ s;
      };
    }, {}], 46: [function(n, h, l) {
      var r, s = n("../utils/common"), i = n("./trees"), c = n("./adler32"), _ = n("./crc32"), x = n("./messages"), y = 0, S = 4, f = 0, w = -2, o = -1, m = 4, d = 2, g = 8, k = 9, C = 286, R = 30, L = 19, P = 2 * C + 1, U = 15, A = 3, W = 258, Q = W + A + 1, b = 42, D = 113, a = 1, N = 2, V = 3, $ = 4;
      function st(t, F) {
        return t.msg = x[F], F;
      }
      function Z(t) {
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
      function K(t, F) {
        t.pending_buf[t.pending++] = F >>> 8 & 255, t.pending_buf[t.pending++] = 255 & F;
      }
      function X(t, F) {
        var O, v, p = t.max_chain_length, E = t.strstart, j = t.prev_length, M = t.nice_match, z = t.strstart > t.w_size - Q ? t.strstart - (t.w_size - Q) : 0, H = t.window, q = t.w_mask, G = t.prev, tt = t.strstart + W, ht = H[E + j - 1], ut = H[E + j];
        t.prev_length >= t.good_match && (p >>= 2), M > t.lookahead && (M = t.lookahead);
        do
          if (H[(O = F) + j] === ut && H[O + j - 1] === ht && H[O] === H[E] && H[++O] === H[E + 1]) {
            E += 2, O++;
            do
              ;
            while (H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && H[++E] === H[++O] && E < tt);
            if (v = W - (tt - E), E = tt - W, j < v) {
              if (t.match_start = F, M <= (j = v)) break;
              ht = H[E + j - 1], ut = H[E + j];
            }
          }
        while ((F = G[F & q]) > z && --p != 0);
        return j <= t.lookahead ? j : t.lookahead;
      }
      function gt(t) {
        var F, O, v, p, E, j, M, z, H, q, G = t.w_size;
        do {
          if (p = t.window_size - t.lookahead - t.strstart, t.strstart >= G + (G - Q)) {
            for (s.arraySet(t.window, t.window, G, G, 0), t.match_start -= G, t.strstart -= G, t.block_start -= G, F = O = t.hash_size; v = t.head[--F], t.head[F] = G <= v ? v - G : 0, --O; ) ;
            for (F = O = G; v = t.prev[--F], t.prev[F] = G <= v ? v - G : 0, --O; ) ;
            p += G;
          }
          if (t.strm.avail_in === 0) break;
          if (j = t.strm, M = t.window, z = t.strstart + t.lookahead, H = p, q = void 0, q = j.avail_in, H < q && (q = H), O = q === 0 ? 0 : (j.avail_in -= q, s.arraySet(M, j.input, j.next_in, q, z), j.state.wrap === 1 ? j.adler = c(j.adler, M, q, z) : j.state.wrap === 2 && (j.adler = _(j.adler, M, q, z)), j.next_in += q, j.total_in += q, q), t.lookahead += O, t.lookahead + t.insert >= A) for (E = t.strstart - t.insert, t.ins_h = t.window[E], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + A - 1]) & t.hash_mask, t.prev[E & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = E, E++, t.insert--, !(t.lookahead + t.insert < A)); ) ;
        } while (t.lookahead < Q && t.strm.avail_in !== 0);
      }
      function yt(t, F) {
        for (var O, v; ; ) {
          if (t.lookahead < Q) {
            if (gt(t), t.lookahead < Q && F === y) return a;
            if (t.lookahead === 0) break;
          }
          if (O = 0, t.lookahead >= A && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), O !== 0 && t.strstart - O <= t.w_size - Q && (t.match_length = X(t, O)), t.match_length >= A) if (v = i._tr_tally(t, t.strstart - t.match_start, t.match_length - A), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= A) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = i._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (T(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = t.strstart < A - 1 ? t.strstart : A - 1, F === S ? (T(t, !0), t.strm.avail_out === 0 ? V : $) : t.last_lit && (T(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function lt(t, F) {
        for (var O, v, p; ; ) {
          if (t.lookahead < Q) {
            if (gt(t), t.lookahead < Q && F === y) return a;
            if (t.lookahead === 0) break;
          }
          if (O = 0, t.lookahead >= A && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = A - 1, O !== 0 && t.prev_length < t.max_lazy_match && t.strstart - O <= t.w_size - Q && (t.match_length = X(t, O), t.match_length <= 5 && (t.strategy === 1 || t.match_length === A && 4096 < t.strstart - t.match_start) && (t.match_length = A - 1)), t.prev_length >= A && t.match_length <= t.prev_length) {
            for (p = t.strstart + t.lookahead - A, v = i._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - A), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= p && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + A - 1]) & t.hash_mask, O = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = A - 1, t.strstart++, v && (T(t, !1), t.strm.avail_out === 0)) return a;
          } else if (t.match_available) {
            if ((v = i._tr_tally(t, 0, t.window[t.strstart - 1])) && T(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return a;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = i._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < A - 1 ? t.strstart : A - 1, F === S ? (T(t, !0), t.strm.avail_out === 0 ? V : $) : t.last_lit && (T(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ct(t, F, O, v, p) {
        this.good_length = t, this.max_lazy = F, this.nice_length = O, this.max_chain = v, this.func = p;
      }
      function _t() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * P), this.dyn_dtree = new s.Buf16(2 * (2 * R + 1)), this.bl_tree = new s.Buf16(2 * (2 * L + 1)), nt(this.dyn_ltree), nt(this.dyn_dtree), nt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(U + 1), this.heap = new s.Buf16(2 * C + 1), nt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * C + 1), nt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function vt(t) {
        var F;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = d, (F = t.state).pending = 0, F.pending_out = 0, F.wrap < 0 && (F.wrap = -F.wrap), F.status = F.wrap ? b : D, t.adler = F.wrap === 2 ? 0 : 1, F.last_flush = y, i._tr_init(F), f) : st(t, w);
      }
      function It(t) {
        var F = vt(t);
        return F === f && function(O) {
          O.window_size = 2 * O.w_size, nt(O.head), O.max_lazy_match = r[O.level].max_lazy, O.good_match = r[O.level].good_length, O.nice_match = r[O.level].nice_length, O.max_chain_length = r[O.level].max_chain, O.strstart = 0, O.block_start = 0, O.lookahead = 0, O.insert = 0, O.match_length = O.prev_length = A - 1, O.match_available = 0, O.ins_h = 0;
        }(t.state), F;
      }
      function zt(t, F, O, v, p, E) {
        if (!t) return w;
        var j = 1;
        if (F === o && (F = 6), v < 0 ? (j = 0, v = -v) : 15 < v && (j = 2, v -= 16), p < 1 || k < p || O !== g || v < 8 || 15 < v || F < 0 || 9 < F || E < 0 || m < E) return st(t, w);
        v === 8 && (v = 9);
        var M = new _t();
        return (t.state = M).strm = t, M.wrap = j, M.gzhead = null, M.w_bits = v, M.w_size = 1 << M.w_bits, M.w_mask = M.w_size - 1, M.hash_bits = p + 7, M.hash_size = 1 << M.hash_bits, M.hash_mask = M.hash_size - 1, M.hash_shift = ~~((M.hash_bits + A - 1) / A), M.window = new s.Buf8(2 * M.w_size), M.head = new s.Buf16(M.hash_size), M.prev = new s.Buf16(M.w_size), M.lit_bufsize = 1 << p + 6, M.pending_buf_size = 4 * M.lit_bufsize, M.pending_buf = new s.Buf8(M.pending_buf_size), M.d_buf = 1 * M.lit_bufsize, M.l_buf = 3 * M.lit_bufsize, M.level = F, M.strategy = E, M.method = O, It(t);
      }
      r = [new ct(0, 0, 0, 0, function(t, F) {
        var O = 65535;
        for (O > t.pending_buf_size - 5 && (O = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (gt(t), t.lookahead === 0 && F === y) return a;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + O;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, T(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - Q && (T(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = 0, F === S ? (T(t, !0), t.strm.avail_out === 0 ? V : $) : (t.strstart > t.block_start && (T(t, !1), t.strm.avail_out), a);
      }), new ct(4, 4, 8, 4, yt), new ct(4, 5, 16, 8, yt), new ct(4, 6, 32, 32, yt), new ct(4, 4, 16, 16, lt), new ct(8, 16, 32, 32, lt), new ct(8, 16, 128, 128, lt), new ct(8, 32, 128, 256, lt), new ct(32, 128, 258, 1024, lt), new ct(32, 258, 258, 4096, lt)], l.deflateInit = function(t, F) {
        return zt(t, F, g, 15, 8, 0);
      }, l.deflateInit2 = zt, l.deflateReset = It, l.deflateResetKeep = vt, l.deflateSetHeader = function(t, F) {
        return t && t.state ? t.state.wrap !== 2 ? w : (t.state.gzhead = F, f) : w;
      }, l.deflate = function(t, F) {
        var O, v, p, E;
        if (!t || !t.state || 5 < F || F < 0) return t ? st(t, w) : w;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && F !== S) return st(t, t.avail_out === 0 ? -5 : w);
        if (v.strm = t, O = v.last_flush, v.last_flush = F, v.status === b) if (v.wrap === 2) t.adler = 0, rt(v, 31), rt(v, 139), rt(v, 8), v.gzhead ? (rt(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), rt(v, 255 & v.gzhead.time), rt(v, v.gzhead.time >> 8 & 255), rt(v, v.gzhead.time >> 16 & 255), rt(v, v.gzhead.time >> 24 & 255), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (rt(v, 255 & v.gzhead.extra.length), rt(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = _(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 3), v.status = D);
        else {
          var j = g + (v.w_bits - 8 << 4) << 8;
          j |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && (j |= 32), j += 31 - j % 31, v.status = D, K(v, j), v.strstart !== 0 && (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), t.adler = 1;
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
          if (I(t), t.avail_out === 0) return v.last_flush = -1, f;
        } else if (t.avail_in === 0 && Z(F) <= Z(O) && F !== S) return st(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return st(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || F !== y && v.status !== 666) {
          var M = v.strategy === 2 ? function(z, H) {
            for (var q; ; ) {
              if (z.lookahead === 0 && (gt(z), z.lookahead === 0)) {
                if (H === y) return a;
                break;
              }
              if (z.match_length = 0, q = i._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, q && (T(z, !1), z.strm.avail_out === 0)) return a;
            }
            return z.insert = 0, H === S ? (T(z, !0), z.strm.avail_out === 0 ? V : $) : z.last_lit && (T(z, !1), z.strm.avail_out === 0) ? a : N;
          }(v, F) : v.strategy === 3 ? function(z, H) {
            for (var q, G, tt, ht, ut = z.window; ; ) {
              if (z.lookahead <= W) {
                if (gt(z), z.lookahead <= W && H === y) return a;
                if (z.lookahead === 0) break;
              }
              if (z.match_length = 0, z.lookahead >= A && 0 < z.strstart && (G = ut[tt = z.strstart - 1]) === ut[++tt] && G === ut[++tt] && G === ut[++tt]) {
                ht = z.strstart + W;
                do
                  ;
                while (G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && G === ut[++tt] && tt < ht);
                z.match_length = W - (ht - tt), z.match_length > z.lookahead && (z.match_length = z.lookahead);
              }
              if (z.match_length >= A ? (q = i._tr_tally(z, 1, z.match_length - A), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (q = i._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), q && (T(z, !1), z.strm.avail_out === 0)) return a;
            }
            return z.insert = 0, H === S ? (T(z, !0), z.strm.avail_out === 0 ? V : $) : z.last_lit && (T(z, !1), z.strm.avail_out === 0) ? a : N;
          }(v, F) : r[v.level].func(v, F);
          if (M !== V && M !== $ || (v.status = 666), M === a || M === V) return t.avail_out === 0 && (v.last_flush = -1), f;
          if (M === N && (F === 1 ? i._tr_align(v) : F !== 5 && (i._tr_stored_block(v, 0, 0, !1), F === 3 && (nt(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), I(t), t.avail_out === 0)) return v.last_flush = -1, f;
        }
        return F !== S ? f : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (rt(v, 255 & t.adler), rt(v, t.adler >> 8 & 255), rt(v, t.adler >> 16 & 255), rt(v, t.adler >> 24 & 255), rt(v, 255 & t.total_in), rt(v, t.total_in >> 8 & 255), rt(v, t.total_in >> 16 & 255), rt(v, t.total_in >> 24 & 255)) : (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), I(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? f : 1);
      }, l.deflateEnd = function(t) {
        var F;
        return t && t.state ? (F = t.state.status) !== b && F !== 69 && F !== 73 && F !== 91 && F !== 103 && F !== D && F !== 666 ? st(t, w) : (t.state = null, F === D ? st(t, -3) : f) : w;
      }, l.deflateSetDictionary = function(t, F) {
        var O, v, p, E, j, M, z, H, q = F.length;
        if (!t || !t.state || (E = (O = t.state).wrap) === 2 || E === 1 && O.status !== b || O.lookahead) return w;
        for (E === 1 && (t.adler = c(t.adler, F, q, 0)), O.wrap = 0, q >= O.w_size && (E === 0 && (nt(O.head), O.strstart = 0, O.block_start = 0, O.insert = 0), H = new s.Buf8(O.w_size), s.arraySet(H, F, q - O.w_size, O.w_size, 0), F = H, q = O.w_size), j = t.avail_in, M = t.next_in, z = t.input, t.avail_in = q, t.next_in = 0, t.input = F, gt(O); O.lookahead >= A; ) {
          for (v = O.strstart, p = O.lookahead - (A - 1); O.ins_h = (O.ins_h << O.hash_shift ^ O.window[v + A - 1]) & O.hash_mask, O.prev[v & O.w_mask] = O.head[O.ins_h], O.head[O.ins_h] = v, v++, --p; ) ;
          O.strstart = v, O.lookahead = A - 1, gt(O);
        }
        return O.strstart += O.lookahead, O.block_start = O.strstart, O.insert = O.lookahead, O.lookahead = 0, O.match_length = O.prev_length = A - 1, O.match_available = 0, t.next_in = M, t.input = z, t.avail_in = j, O.wrap = E, f;
      }, l.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(n, h, l) {
      h.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(n, h, l) {
      h.exports = function(r, s) {
        var i, c, _, x, y, S, f, w, o, m, d, g, k, C, R, L, P, U, A, W, Q, b, D, a, N;
        i = r.state, c = r.next_in, a = r.input, _ = c + (r.avail_in - 5), x = r.next_out, N = r.output, y = x - (s - r.avail_out), S = x + (r.avail_out - 257), f = i.dmax, w = i.wsize, o = i.whave, m = i.wnext, d = i.window, g = i.hold, k = i.bits, C = i.lencode, R = i.distcode, L = (1 << i.lenbits) - 1, P = (1 << i.distbits) - 1;
        t: do {
          k < 15 && (g += a[c++] << k, k += 8, g += a[c++] << k, k += 8), U = C[g & L];
          e: for (; ; ) {
            if (g >>>= A = U >>> 24, k -= A, (A = U >>> 16 & 255) === 0) N[x++] = 65535 & U;
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
                r.msg = "invalid literal/length code", i.mode = 30;
                break t;
              }
              W = 65535 & U, (A &= 15) && (k < A && (g += a[c++] << k, k += 8), W += g & (1 << A) - 1, g >>>= A, k -= A), k < 15 && (g += a[c++] << k, k += 8, g += a[c++] << k, k += 8), U = R[g & P];
              r: for (; ; ) {
                if (g >>>= A = U >>> 24, k -= A, !(16 & (A = U >>> 16 & 255))) {
                  if (!(64 & A)) {
                    U = R[(65535 & U) + (g & (1 << A) - 1)];
                    continue r;
                  }
                  r.msg = "invalid distance code", i.mode = 30;
                  break t;
                }
                if (Q = 65535 & U, k < (A &= 15) && (g += a[c++] << k, (k += 8) < A && (g += a[c++] << k, k += 8)), f < (Q += g & (1 << A) - 1)) {
                  r.msg = "invalid distance too far back", i.mode = 30;
                  break t;
                }
                if (g >>>= A, k -= A, (A = x - y) < Q) {
                  if (o < (A = Q - A) && i.sane) {
                    r.msg = "invalid distance too far back", i.mode = 30;
                    break t;
                  }
                  if (D = d, (b = 0) === m) {
                    if (b += w - A, A < W) {
                      for (W -= A; N[x++] = d[b++], --A; ) ;
                      b = x - Q, D = N;
                    }
                  } else if (m < A) {
                    if (b += w + m - A, (A -= m) < W) {
                      for (W -= A; N[x++] = d[b++], --A; ) ;
                      if (b = 0, m < W) {
                        for (W -= A = m; N[x++] = d[b++], --A; ) ;
                        b = x - Q, D = N;
                      }
                    }
                  } else if (b += m - A, A < W) {
                    for (W -= A; N[x++] = d[b++], --A; ) ;
                    b = x - Q, D = N;
                  }
                  for (; 2 < W; ) N[x++] = D[b++], N[x++] = D[b++], N[x++] = D[b++], W -= 3;
                  W && (N[x++] = D[b++], 1 < W && (N[x++] = D[b++]));
                } else {
                  for (b = x - Q; N[x++] = N[b++], N[x++] = N[b++], N[x++] = N[b++], 2 < (W -= 3); ) ;
                  W && (N[x++] = N[b++], 1 < W && (N[x++] = N[b++]));
                }
                break;
              }
            }
            break;
          }
        } while (c < _ && x < S);
        c -= W = k >> 3, g &= (1 << (k -= W << 3)) - 1, r.next_in = c, r.next_out = x, r.avail_in = c < _ ? _ - c + 5 : 5 - (c - _), r.avail_out = x < S ? S - x + 257 : 257 - (x - S), i.hold = g, i.bits = k;
      };
    }, {}], 49: [function(n, h, l) {
      var r = n("../utils/common"), s = n("./adler32"), i = n("./crc32"), c = n("./inffast"), _ = n("./inftrees"), x = 1, y = 2, S = 0, f = -2, w = 1, o = 852, m = 592;
      function d(b) {
        return (b >>> 24 & 255) + (b >>> 8 & 65280) + ((65280 & b) << 8) + ((255 & b) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function k(b) {
        var D;
        return b && b.state ? (D = b.state, b.total_in = b.total_out = D.total = 0, b.msg = "", D.wrap && (b.adler = 1 & D.wrap), D.mode = w, D.last = 0, D.havedict = 0, D.dmax = 32768, D.head = null, D.hold = 0, D.bits = 0, D.lencode = D.lendyn = new r.Buf32(o), D.distcode = D.distdyn = new r.Buf32(m), D.sane = 1, D.back = -1, S) : f;
      }
      function C(b) {
        var D;
        return b && b.state ? ((D = b.state).wsize = 0, D.whave = 0, D.wnext = 0, k(b)) : f;
      }
      function R(b, D) {
        var a, N;
        return b && b.state ? (N = b.state, D < 0 ? (a = 0, D = -D) : (a = 1 + (D >> 4), D < 48 && (D &= 15)), D && (D < 8 || 15 < D) ? f : (N.window !== null && N.wbits !== D && (N.window = null), N.wrap = a, N.wbits = D, C(b))) : f;
      }
      function L(b, D) {
        var a, N;
        return b ? (N = new g(), (b.state = N).window = null, (a = R(b, D)) !== S && (b.state = null), a) : f;
      }
      var P, U, A = !0;
      function W(b) {
        if (A) {
          var D;
          for (P = new r.Buf32(512), U = new r.Buf32(32), D = 0; D < 144; ) b.lens[D++] = 8;
          for (; D < 256; ) b.lens[D++] = 9;
          for (; D < 280; ) b.lens[D++] = 7;
          for (; D < 288; ) b.lens[D++] = 8;
          for (_(x, b.lens, 0, 288, P, 0, b.work, { bits: 9 }), D = 0; D < 32; ) b.lens[D++] = 5;
          _(y, b.lens, 0, 32, U, 0, b.work, { bits: 5 }), A = !1;
        }
        b.lencode = P, b.lenbits = 9, b.distcode = U, b.distbits = 5;
      }
      function Q(b, D, a, N) {
        var V, $ = b.state;
        return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new r.Buf8($.wsize)), N >= $.wsize ? (r.arraySet($.window, D, a - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (N < (V = $.wsize - $.wnext) && (V = N), r.arraySet($.window, D, a - N, V, $.wnext), (N -= V) ? (r.arraySet($.window, D, a - N, N, 0), $.wnext = N, $.whave = $.wsize) : ($.wnext += V, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += V))), 0;
      }
      l.inflateReset = C, l.inflateReset2 = R, l.inflateResetKeep = k, l.inflateInit = function(b) {
        return L(b, 15);
      }, l.inflateInit2 = L, l.inflate = function(b, D) {
        var a, N, V, $, st, Z, nt, I, T, rt, K, X, gt, yt, lt, ct, _t, vt, It, zt, t, F, O, v, p = 0, E = new r.Buf8(4), j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!b || !b.state || !b.output || !b.input && b.avail_in !== 0) return f;
        (a = b.state).mode === 12 && (a.mode = 13), st = b.next_out, V = b.output, nt = b.avail_out, $ = b.next_in, N = b.input, Z = b.avail_in, I = a.hold, T = a.bits, rt = Z, K = nt, F = S;
        t: for (; ; ) switch (a.mode) {
          case w:
            if (a.wrap === 0) {
              a.mode = 13;
              break;
            }
            for (; T < 16; ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
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
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
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
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            a.head && (a.head.time = I), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, E[2] = I >>> 16 & 255, E[3] = I >>> 24 & 255, a.check = i(a.check, E, 4, 0)), T = I = 0, a.mode = 4;
          case 4:
            for (; T < 16; ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            a.head && (a.head.xflags = 255 & I, a.head.os = I >> 8), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0)), T = I = 0, a.mode = 5;
          case 5:
            if (1024 & a.flags) {
              for (; T < 16; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
              }
              a.length = I, a.head && (a.head.extra_len = I), 512 & a.flags && (E[0] = 255 & I, E[1] = I >>> 8 & 255, a.check = i(a.check, E, 2, 0)), T = I = 0;
            } else a.head && (a.head.extra = null);
            a.mode = 6;
          case 6:
            if (1024 & a.flags && (Z < (X = a.length) && (X = Z), X && (a.head && (t = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), r.arraySet(a.head.extra, N, $, X, t)), 512 & a.flags && (a.check = i(a.check, N, X, $)), Z -= X, $ += X, a.length -= X), a.length)) break t;
            a.length = 0, a.mode = 7;
          case 7:
            if (2048 & a.flags) {
              if (Z === 0) break t;
              for (X = 0; t = N[$ + X++], a.head && t && a.length < 65536 && (a.head.name += String.fromCharCode(t)), t && X < Z; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, X, $)), Z -= X, $ += X, t) break t;
            } else a.head && (a.head.name = null);
            a.length = 0, a.mode = 8;
          case 8:
            if (4096 & a.flags) {
              if (Z === 0) break t;
              for (X = 0; t = N[$ + X++], a.head && t && a.length < 65536 && (a.head.comment += String.fromCharCode(t)), t && X < Z; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, X, $)), Z -= X, $ += X, t) break t;
            } else a.head && (a.head.comment = null);
            a.mode = 9;
          case 9:
            if (512 & a.flags) {
              for (; T < 16; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
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
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            b.adler = a.check = d(I), T = I = 0, a.mode = 11;
          case 11:
            if (a.havedict === 0) return b.next_out = st, b.avail_out = nt, b.next_in = $, b.avail_in = Z, a.hold = I, a.bits = T, 2;
            b.adler = a.check = 1, a.mode = 12;
          case 12:
            if (D === 5 || D === 6) break t;
          case 13:
            if (a.last) {
              I >>>= 7 & T, T -= 7 & T, a.mode = 27;
              break;
            }
            for (; T < 3; ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            switch (a.last = 1 & I, T -= 1, 3 & (I >>>= 1)) {
              case 0:
                a.mode = 14;
                break;
              case 1:
                if (W(a), a.mode = 20, D !== 6) break;
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
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            if ((65535 & I) != (I >>> 16 ^ 65535)) {
              b.msg = "invalid stored block lengths", a.mode = 30;
              break;
            }
            if (a.length = 65535 & I, T = I = 0, a.mode = 15, D === 6) break t;
          case 15:
            a.mode = 16;
          case 16:
            if (X = a.length) {
              if (Z < X && (X = Z), nt < X && (X = nt), X === 0) break t;
              r.arraySet(V, N, $, X, st), Z -= X, $ += X, nt -= X, st += X, a.length -= X;
              break;
            }
            a.mode = 12;
            break;
          case 17:
            for (; T < 14; ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            if (a.nlen = 257 + (31 & I), I >>>= 5, T -= 5, a.ndist = 1 + (31 & I), I >>>= 5, T -= 5, a.ncode = 4 + (15 & I), I >>>= 4, T -= 4, 286 < a.nlen || 30 < a.ndist) {
              b.msg = "too many length or distance symbols", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 18;
          case 18:
            for (; a.have < a.ncode; ) {
              for (; T < 3; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
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
              for (; ct = (p = a.lencode[I & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((lt = p >>> 24) <= T); ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
              }
              if (_t < 16) I >>>= lt, T -= lt, a.lens[a.have++] = _t;
              else {
                if (_t === 16) {
                  for (v = lt + 2; T < v; ) {
                    if (Z === 0) break t;
                    Z--, I += N[$++] << T, T += 8;
                  }
                  if (I >>>= lt, T -= lt, a.have === 0) {
                    b.msg = "invalid bit length repeat", a.mode = 30;
                    break;
                  }
                  t = a.lens[a.have - 1], X = 3 + (3 & I), I >>>= 2, T -= 2;
                } else if (_t === 17) {
                  for (v = lt + 3; T < v; ) {
                    if (Z === 0) break t;
                    Z--, I += N[$++] << T, T += 8;
                  }
                  T -= lt, t = 0, X = 3 + (7 & (I >>>= lt)), I >>>= 3, T -= 3;
                } else {
                  for (v = lt + 7; T < v; ) {
                    if (Z === 0) break t;
                    Z--, I += N[$++] << T, T += 8;
                  }
                  T -= lt, t = 0, X = 11 + (127 & (I >>>= lt)), I >>>= 7, T -= 7;
                }
                if (a.have + X > a.nlen + a.ndist) {
                  b.msg = "invalid bit length repeat", a.mode = 30;
                  break;
                }
                for (; X--; ) a.lens[a.have++] = t;
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
            if (6 <= Z && 258 <= nt) {
              b.next_out = st, b.avail_out = nt, b.next_in = $, b.avail_in = Z, a.hold = I, a.bits = T, c(b, K), st = b.next_out, V = b.output, nt = b.avail_out, $ = b.next_in, N = b.input, Z = b.avail_in, I = a.hold, T = a.bits, a.mode === 12 && (a.back = -1);
              break;
            }
            for (a.back = 0; ct = (p = a.lencode[I & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((lt = p >>> 24) <= T); ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            if (ct && !(240 & ct)) {
              for (vt = lt, It = ct, zt = _t; ct = (p = a.lencode[zt + ((I & (1 << vt + It) - 1) >> vt)]) >>> 16 & 255, _t = 65535 & p, !(vt + (lt = p >>> 24) <= T); ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
              }
              I >>>= vt, T -= vt, a.back += vt;
            }
            if (I >>>= lt, T -= lt, a.back += lt, a.length = _t, ct === 0) {
              a.mode = 26;
              break;
            }
            if (32 & ct) {
              a.back = -1, a.mode = 12;
              break;
            }
            if (64 & ct) {
              b.msg = "invalid literal/length code", a.mode = 30;
              break;
            }
            a.extra = 15 & ct, a.mode = 22;
          case 22:
            if (a.extra) {
              for (v = a.extra; T < v; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
              }
              a.length += I & (1 << a.extra) - 1, I >>>= a.extra, T -= a.extra, a.back += a.extra;
            }
            a.was = a.length, a.mode = 23;
          case 23:
            for (; ct = (p = a.distcode[I & (1 << a.distbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((lt = p >>> 24) <= T); ) {
              if (Z === 0) break t;
              Z--, I += N[$++] << T, T += 8;
            }
            if (!(240 & ct)) {
              for (vt = lt, It = ct, zt = _t; ct = (p = a.distcode[zt + ((I & (1 << vt + It) - 1) >> vt)]) >>> 16 & 255, _t = 65535 & p, !(vt + (lt = p >>> 24) <= T); ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
              }
              I >>>= vt, T -= vt, a.back += vt;
            }
            if (I >>>= lt, T -= lt, a.back += lt, 64 & ct) {
              b.msg = "invalid distance code", a.mode = 30;
              break;
            }
            a.offset = _t, a.extra = 15 & ct, a.mode = 24;
          case 24:
            if (a.extra) {
              for (v = a.extra; T < v; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
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
            if (X = K - nt, a.offset > X) {
              if ((X = a.offset - X) > a.whave && a.sane) {
                b.msg = "invalid distance too far back", a.mode = 30;
                break;
              }
              gt = X > a.wnext ? (X -= a.wnext, a.wsize - X) : a.wnext - X, X > a.length && (X = a.length), yt = a.window;
            } else yt = V, gt = st - a.offset, X = a.length;
            for (nt < X && (X = nt), nt -= X, a.length -= X; V[st++] = yt[gt++], --X; ) ;
            a.length === 0 && (a.mode = 21);
            break;
          case 26:
            if (nt === 0) break t;
            V[st++] = a.length, nt--, a.mode = 21;
            break;
          case 27:
            if (a.wrap) {
              for (; T < 32; ) {
                if (Z === 0) break t;
                Z--, I |= N[$++] << T, T += 8;
              }
              if (K -= nt, b.total_out += K, a.total += K, K && (b.adler = a.check = a.flags ? i(a.check, V, K, st - K) : s(a.check, V, K, st - K)), K = nt, (a.flags ? I : d(I)) !== a.check) {
                b.msg = "incorrect data check", a.mode = 30;
                break;
              }
              T = I = 0;
            }
            a.mode = 28;
          case 28:
            if (a.wrap && a.flags) {
              for (; T < 32; ) {
                if (Z === 0) break t;
                Z--, I += N[$++] << T, T += 8;
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
            return f;
        }
        return b.next_out = st, b.avail_out = nt, b.next_in = $, b.avail_in = Z, a.hold = I, a.bits = T, (a.wsize || K !== b.avail_out && a.mode < 30 && (a.mode < 27 || D !== 4)) && Q(b, b.output, b.next_out, K - b.avail_out) ? (a.mode = 31, -4) : (rt -= b.avail_in, K -= b.avail_out, b.total_in += rt, b.total_out += K, a.total += K, a.wrap && K && (b.adler = a.check = a.flags ? i(a.check, V, K, b.next_out - K) : s(a.check, V, K, b.next_out - K)), b.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === 12 ? 128 : 0) + (a.mode === 20 || a.mode === 15 ? 256 : 0), (rt == 0 && K === 0 || D === 4) && F === S && (F = -5), F);
      }, l.inflateEnd = function(b) {
        if (!b || !b.state) return f;
        var D = b.state;
        return D.window && (D.window = null), b.state = null, S;
      }, l.inflateGetHeader = function(b, D) {
        var a;
        return b && b.state && 2 & (a = b.state).wrap ? ((a.head = D).done = !1, S) : f;
      }, l.inflateSetDictionary = function(b, D) {
        var a, N = D.length;
        return b && b.state ? (a = b.state).wrap !== 0 && a.mode !== 11 ? f : a.mode === 11 && s(1, D, N, 0) !== a.check ? -3 : Q(b, D, N, N) ? (a.mode = 31, -4) : (a.havedict = 1, S) : f;
      }, l.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(n, h, l) {
      var r = n("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      h.exports = function(x, y, S, f, w, o, m, d) {
        var g, k, C, R, L, P, U, A, W, Q = d.bits, b = 0, D = 0, a = 0, N = 0, V = 0, $ = 0, st = 0, Z = 0, nt = 0, I = 0, T = null, rt = 0, K = new r.Buf16(16), X = new r.Buf16(16), gt = null, yt = 0;
        for (b = 0; b <= 15; b++) K[b] = 0;
        for (D = 0; D < f; D++) K[y[S + D]]++;
        for (V = Q, N = 15; 1 <= N && K[N] === 0; N--) ;
        if (N < V && (V = N), N === 0) return w[o++] = 20971520, w[o++] = 20971520, d.bits = 1, 0;
        for (a = 1; a < N && K[a] === 0; a++) ;
        for (V < a && (V = a), b = Z = 1; b <= 15; b++) if (Z <<= 1, (Z -= K[b]) < 0) return -1;
        if (0 < Z && (x === 0 || N !== 1)) return -1;
        for (X[1] = 0, b = 1; b < 15; b++) X[b + 1] = X[b] + K[b];
        for (D = 0; D < f; D++) y[S + D] !== 0 && (m[X[y[S + D]]++] = D);
        if (P = x === 0 ? (T = gt = m, 19) : x === 1 ? (T = s, rt -= 257, gt = i, yt -= 257, 256) : (T = c, gt = _, -1), b = a, L = o, st = D = I = 0, C = -1, R = (nt = 1 << ($ = V)) - 1, x === 1 && 852 < nt || x === 2 && 592 < nt) return 1;
        for (; ; ) {
          for (U = b - st, W = m[D] < P ? (A = 0, m[D]) : m[D] > P ? (A = gt[yt + m[D]], T[rt + m[D]]) : (A = 96, 0), g = 1 << b - st, a = k = 1 << $; w[L + (I >> st) + (k -= g)] = U << 24 | A << 16 | W | 0, k !== 0; ) ;
          for (g = 1 << b - 1; I & g; ) g >>= 1;
          if (g !== 0 ? (I &= g - 1, I += g) : I = 0, D++, --K[b] == 0) {
            if (b === N) break;
            b = y[S + m[D]];
          }
          if (V < b && (I & R) !== C) {
            for (st === 0 && (st = V), L += a, Z = 1 << ($ = b - st); $ + st < N && !((Z -= K[$ + st]) <= 0); ) $++, Z <<= 1;
            if (nt += 1 << $, x === 1 && 852 < nt || x === 2 && 592 < nt) return 1;
            w[C = I & R] = V << 24 | $ << 16 | L - o | 0;
          }
        }
        return I !== 0 && (w[L + I] = b - st << 24 | 64 << 16 | 0), d.bits = V, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(n, h, l) {
      h.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(n, h, l) {
      var r = n("../utils/common"), s = 0, i = 1;
      function c(p) {
        for (var E = p.length; 0 <= --E; ) p[E] = 0;
      }
      var _ = 0, x = 29, y = 256, S = y + 1 + x, f = 30, w = 19, o = 2 * S + 1, m = 15, d = 16, g = 7, k = 256, C = 16, R = 17, L = 18, P = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], W = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = new Array(2 * (S + 2));
      c(Q);
      var b = new Array(2 * f);
      c(b);
      var D = new Array(512);
      c(D);
      var a = new Array(256);
      c(a);
      var N = new Array(x);
      c(N);
      var V, $, st, Z = new Array(f);
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
      function K(p, E, j) {
        p.bi_valid > d - j ? (p.bi_buf |= E << p.bi_valid & 65535, rt(p, p.bi_buf), p.bi_buf = E >> d - p.bi_valid, p.bi_valid += j - d) : (p.bi_buf |= E << p.bi_valid & 65535, p.bi_valid += j);
      }
      function X(p, E, j) {
        K(p, j[2 * E], j[2 * E + 1]);
      }
      function gt(p, E) {
        for (var j = 0; j |= 1 & p, p >>>= 1, j <<= 1, 0 < --E; ) ;
        return j >>> 1;
      }
      function yt(p, E, j) {
        var M, z, H = new Array(m + 1), q = 0;
        for (M = 1; M <= m; M++) H[M] = q = q + j[M - 1] << 1;
        for (z = 0; z <= E; z++) {
          var G = p[2 * z + 1];
          G !== 0 && (p[2 * z] = gt(H[G]++, G));
        }
      }
      function lt(p) {
        var E;
        for (E = 0; E < S; E++) p.dyn_ltree[2 * E] = 0;
        for (E = 0; E < f; E++) p.dyn_dtree[2 * E] = 0;
        for (E = 0; E < w; E++) p.bl_tree[2 * E] = 0;
        p.dyn_ltree[2 * k] = 1, p.opt_len = p.static_len = 0, p.last_lit = p.matches = 0;
      }
      function ct(p) {
        8 < p.bi_valid ? rt(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf), p.bi_buf = 0, p.bi_valid = 0;
      }
      function _t(p, E, j, M) {
        var z = 2 * E, H = 2 * j;
        return p[z] < p[H] || p[z] === p[H] && M[E] <= M[j];
      }
      function vt(p, E, j) {
        for (var M = p.heap[j], z = j << 1; z <= p.heap_len && (z < p.heap_len && _t(E, p.heap[z + 1], p.heap[z], p.depth) && z++, !_t(E, M, p.heap[z], p.depth)); ) p.heap[j] = p.heap[z], j = z, z <<= 1;
        p.heap[j] = M;
      }
      function It(p, E, j) {
        var M, z, H, q, G = 0;
        if (p.last_lit !== 0) for (; M = p.pending_buf[p.d_buf + 2 * G] << 8 | p.pending_buf[p.d_buf + 2 * G + 1], z = p.pending_buf[p.l_buf + G], G++, M === 0 ? X(p, z, E) : (X(p, (H = a[z]) + y + 1, E), (q = P[H]) !== 0 && K(p, z -= N[H], q), X(p, H = T(--M), j), (q = U[H]) !== 0 && K(p, M -= Z[H], q)), G < p.last_lit; ) ;
        X(p, k, E);
      }
      function zt(p, E) {
        var j, M, z, H = E.dyn_tree, q = E.stat_desc.static_tree, G = E.stat_desc.has_stree, tt = E.stat_desc.elems, ht = -1;
        for (p.heap_len = 0, p.heap_max = o, j = 0; j < tt; j++) H[2 * j] !== 0 ? (p.heap[++p.heap_len] = ht = j, p.depth[j] = 0) : H[2 * j + 1] = 0;
        for (; p.heap_len < 2; ) H[2 * (z = p.heap[++p.heap_len] = ht < 2 ? ++ht : 0)] = 1, p.depth[z] = 0, p.opt_len--, G && (p.static_len -= q[2 * z + 1]);
        for (E.max_code = ht, j = p.heap_len >> 1; 1 <= j; j--) vt(p, H, j);
        for (z = tt; j = p.heap[1], p.heap[1] = p.heap[p.heap_len--], vt(p, H, 1), M = p.heap[1], p.heap[--p.heap_max] = j, p.heap[--p.heap_max] = M, H[2 * z] = H[2 * j] + H[2 * M], p.depth[z] = (p.depth[j] >= p.depth[M] ? p.depth[j] : p.depth[M]) + 1, H[2 * j + 1] = H[2 * M + 1] = z, p.heap[1] = z++, vt(p, H, 1), 2 <= p.heap_len; ) ;
        p.heap[--p.heap_max] = p.heap[1], function(ut, Et) {
          var Y, B, et, it, ft, Ct, bt = Et.dyn_tree, Bt = Et.max_code, ie = Et.stat_desc.static_tree, Wt = Et.stat_desc.has_stree, Ft = Et.stat_desc.extra_bits, Xt = Et.stat_desc.extra_base, Ut = Et.stat_desc.max_length, jt = 0;
          for (it = 0; it <= m; it++) ut.bl_count[it] = 0;
          for (bt[2 * ut.heap[ut.heap_max] + 1] = 0, Y = ut.heap_max + 1; Y < o; Y++) Ut < (it = bt[2 * bt[2 * (B = ut.heap[Y]) + 1] + 1] + 1) && (it = Ut, jt++), bt[2 * B + 1] = it, Bt < B || (ut.bl_count[it]++, ft = 0, Xt <= B && (ft = Ft[B - Xt]), Ct = bt[2 * B], ut.opt_len += Ct * (it + ft), Wt && (ut.static_len += Ct * (ie[2 * B + 1] + ft)));
          if (jt !== 0) {
            do {
              for (it = Ut - 1; ut.bl_count[it] === 0; ) it--;
              ut.bl_count[it]--, ut.bl_count[it + 1] += 2, ut.bl_count[Ut]--, jt -= 2;
            } while (0 < jt);
            for (it = Ut; it !== 0; it--) for (B = ut.bl_count[it]; B !== 0; ) Bt < (et = ut.heap[--Y]) || (bt[2 * et + 1] !== it && (ut.opt_len += (it - bt[2 * et + 1]) * bt[2 * et], bt[2 * et + 1] = it), B--);
          }
        }(p, E), yt(H, ht, p.bl_count);
      }
      function t(p, E, j) {
        var M, z, H = -1, q = E[1], G = 0, tt = 7, ht = 4;
        for (q === 0 && (tt = 138, ht = 3), E[2 * (j + 1) + 1] = 65535, M = 0; M <= j; M++) z = q, q = E[2 * (M + 1) + 1], ++G < tt && z === q || (G < ht ? p.bl_tree[2 * z] += G : z !== 0 ? (z !== H && p.bl_tree[2 * z]++, p.bl_tree[2 * C]++) : G <= 10 ? p.bl_tree[2 * R]++ : p.bl_tree[2 * L]++, H = z, ht = (G = 0) === q ? (tt = 138, 3) : z === q ? (tt = 6, 3) : (tt = 7, 4));
      }
      function F(p, E, j) {
        var M, z, H = -1, q = E[1], G = 0, tt = 7, ht = 4;
        for (q === 0 && (tt = 138, ht = 3), M = 0; M <= j; M++) if (z = q, q = E[2 * (M + 1) + 1], !(++G < tt && z === q)) {
          if (G < ht) for (; X(p, z, p.bl_tree), --G != 0; ) ;
          else z !== 0 ? (z !== H && (X(p, z, p.bl_tree), G--), X(p, C, p.bl_tree), K(p, G - 3, 2)) : G <= 10 ? (X(p, R, p.bl_tree), K(p, G - 3, 3)) : (X(p, L, p.bl_tree), K(p, G - 11, 7));
          H = z, ht = (G = 0) === q ? (tt = 138, 3) : z === q ? (tt = 6, 3) : (tt = 7, 4);
        }
      }
      c(Z);
      var O = !1;
      function v(p, E, j, M) {
        K(p, (_ << 1) + (M ? 1 : 0), 3), function(z, H, q, G) {
          ct(z), rt(z, q), rt(z, ~q), r.arraySet(z.pending_buf, z.window, H, q, z.pending), z.pending += q;
        }(p, E, j);
      }
      l._tr_init = function(p) {
        O || (function() {
          var E, j, M, z, H, q = new Array(m + 1);
          for (z = M = 0; z < x - 1; z++) for (N[z] = M, E = 0; E < 1 << P[z]; E++) a[M++] = z;
          for (a[M - 1] = z, z = H = 0; z < 16; z++) for (Z[z] = H, E = 0; E < 1 << U[z]; E++) D[H++] = z;
          for (H >>= 7; z < f; z++) for (Z[z] = H << 7, E = 0; E < 1 << U[z] - 7; E++) D[256 + H++] = z;
          for (j = 0; j <= m; j++) q[j] = 0;
          for (E = 0; E <= 143; ) Q[2 * E + 1] = 8, E++, q[8]++;
          for (; E <= 255; ) Q[2 * E + 1] = 9, E++, q[9]++;
          for (; E <= 279; ) Q[2 * E + 1] = 7, E++, q[7]++;
          for (; E <= 287; ) Q[2 * E + 1] = 8, E++, q[8]++;
          for (yt(Q, S + 1, q), E = 0; E < f; E++) b[2 * E + 1] = 5, b[2 * E] = gt(E, 5);
          V = new nt(Q, P, y + 1, S, m), $ = new nt(b, U, 0, f, m), st = new nt(new Array(0), A, 0, w, g);
        }(), O = !0), p.l_desc = new I(p.dyn_ltree, V), p.d_desc = new I(p.dyn_dtree, $), p.bl_desc = new I(p.bl_tree, st), p.bi_buf = 0, p.bi_valid = 0, lt(p);
      }, l._tr_stored_block = v, l._tr_flush_block = function(p, E, j, M) {
        var z, H, q = 0;
        0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(G) {
          var tt, ht = 4093624447;
          for (tt = 0; tt <= 31; tt++, ht >>>= 1) if (1 & ht && G.dyn_ltree[2 * tt] !== 0) return s;
          if (G.dyn_ltree[18] !== 0 || G.dyn_ltree[20] !== 0 || G.dyn_ltree[26] !== 0) return i;
          for (tt = 32; tt < y; tt++) if (G.dyn_ltree[2 * tt] !== 0) return i;
          return s;
        }(p)), zt(p, p.l_desc), zt(p, p.d_desc), q = function(G) {
          var tt;
          for (t(G, G.dyn_ltree, G.l_desc.max_code), t(G, G.dyn_dtree, G.d_desc.max_code), zt(G, G.bl_desc), tt = w - 1; 3 <= tt && G.bl_tree[2 * W[tt] + 1] === 0; tt--) ;
          return G.opt_len += 3 * (tt + 1) + 5 + 5 + 4, tt;
        }(p), z = p.opt_len + 3 + 7 >>> 3, (H = p.static_len + 3 + 7 >>> 3) <= z && (z = H)) : z = H = j + 5, j + 4 <= z && E !== -1 ? v(p, E, j, M) : p.strategy === 4 || H === z ? (K(p, 2 + (M ? 1 : 0), 3), It(p, Q, b)) : (K(p, 4 + (M ? 1 : 0), 3), function(G, tt, ht, ut) {
          var Et;
          for (K(G, tt - 257, 5), K(G, ht - 1, 5), K(G, ut - 4, 4), Et = 0; Et < ut; Et++) K(G, G.bl_tree[2 * W[Et] + 1], 3);
          F(G, G.dyn_ltree, tt - 1), F(G, G.dyn_dtree, ht - 1);
        }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, q + 1), It(p, p.dyn_ltree, p.dyn_dtree)), lt(p), M && ct(p);
      }, l._tr_tally = function(p, E, j) {
        return p.pending_buf[p.d_buf + 2 * p.last_lit] = E >>> 8 & 255, p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & E, p.pending_buf[p.l_buf + p.last_lit] = 255 & j, p.last_lit++, E === 0 ? p.dyn_ltree[2 * j]++ : (p.matches++, E--, p.dyn_ltree[2 * (a[j] + y + 1)]++, p.dyn_dtree[2 * T(E)]++), p.last_lit === p.lit_bufsize - 1;
      }, l._tr_align = function(p) {
        K(p, 2, 3), X(p, k, Q), function(E) {
          E.bi_valid === 16 ? (rt(E, E.bi_buf), E.bi_buf = 0, E.bi_valid = 0) : 8 <= E.bi_valid && (E.pending_buf[E.pending++] = 255 & E.bi_buf, E.bi_buf >>= 8, E.bi_valid -= 8);
        }(p);
      };
    }, { "../utils/common": 41 }], 53: [function(n, h, l) {
      h.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(n, h, l) {
      (function(r) {
        (function(s, i) {
          if (!s.setImmediate) {
            var c, _, x, y, S = 1, f = {}, w = !1, o = s.document, m = Object.getPrototypeOf && Object.getPrototypeOf(s);
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
            }() ? (y = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", k, !1) : s.attachEvent("onmessage", k), function(C) {
              s.postMessage(y + C, "*");
            }) : s.MessageChannel ? ((x = new MessageChannel()).port1.onmessage = function(C) {
              g(C.data);
            }, function(C) {
              x.port2.postMessage(C);
            }) : o && "onreadystatechange" in o.createElement("script") ? (_ = o.documentElement, function(C) {
              var R = o.createElement("script");
              R.onreadystatechange = function() {
                g(C), R.onreadystatechange = null, _.removeChild(R), R = null;
              }, _.appendChild(R);
            }) : function(C) {
              setTimeout(g, 0, C);
            }, m.setImmediate = function(C) {
              typeof C != "function" && (C = new Function("" + C));
              for (var R = new Array(arguments.length - 1), L = 0; L < R.length; L++) R[L] = arguments[L + 1];
              var P = { callback: C, args: R };
              return f[S] = P, c(S), S++;
            }, m.clearImmediate = d;
          }
          function d(C) {
            delete f[C];
          }
          function g(C) {
            if (w) setTimeout(g, 0, C);
            else {
              var R = f[C];
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
          function k(C) {
            C.source === s && typeof C.data == "string" && C.data.indexOf(y) === 0 && g(+C.data.slice(y.length));
          }
        })(typeof self > "u" ? r === void 0 ? this : r : self);
      }).call(this, typeof Jt < "u" ? Jt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ce);
var Xe = Ce.exports;
const Ye = /* @__PURE__ */ Ge(Xe);
function Ke(e = {}) {
  const {
    storageKey: u = "page-reviews",
    defaultPagePath: n = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = e;
  function h() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function l() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(u);
      return g ? JSON.parse(g) : [];
    } catch {
      return [];
    }
  }
  function r(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(u, JSON.stringify(g));
      } catch {
      }
  }
  const s = St(l()), i = () => s.value;
  function c(g) {
    const k = g || n();
    return s.value.filter((C) => C.pagePath === k);
  }
  function _(g) {
    const k = {
      id: h(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s.value.unshift(k), r(s.value), k;
  }
  function x(g, k) {
    const C = s.value.findIndex((R) => R.id === g);
    C > -1 && (s.value[C] = { ...s.value[C], ...k }, r(s.value));
  }
  function y(g) {
    s.value = s.value.filter((k) => k.id !== g), r(s.value);
  }
  function S(g) {
    const k = g || n();
    s.value = s.value.filter((C) => C.pagePath !== k), r(s.value);
  }
  function f() {
    s.value = [], r(s.value);
  }
  function w() {
    return {
      exportTime: (/* @__PURE__ */ new Date()).toISOString(),
      total: s.value.length,
      reviews: s.value
    };
  }
  function o() {
    ae(
      new Blob([JSON.stringify(w(), null, 2)], { type: "application/json" }),
      `page-reviews-${se()}.json`
    );
  }
  function m() {
    const g = ve(w());
    ae(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${se()}.md`
    );
  }
  async function d() {
    const g = new Ye(), k = w(), C = {
      ...k,
      reviews: k.reviews.map((P) => {
        var U;
        return {
          ...P,
          screenshots: (U = P.screenshots) == null ? void 0 : U.map((A) => A.url ? { type: A.type, filename: A.filename, url: A.url } : { type: A.type, filename: A.filename, imagePath: `images/${A.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(C, null, 2)), g.file("review.md", ve(C));
    const R = g.folder("images");
    for (const P of k.reviews)
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
    clearPageReviews: S,
    clearAllReviews: f,
    exportToJSON: o,
    exportToMarkdown: m,
    exportToZIP: d
  };
}
function ve(e) {
  const u = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${e.total}`,
    ""
  ], n = Je(e.reviews, "pagePath");
  return Object.entries(n).forEach(([h, l]) => {
    u.push(`## 页面：${h}`), u.push(""), l.forEach((r, s) => {
      var i, c;
      u.push(`### ${s + 1}. ${r.title || "未命名评审"}`), u.push(`- **类型**：${r.type === "element" ? "元素评审" : "视图范围评审"}`), u.push(`- **严重等级**：${qe(r.severity)}`), u.push(`- **状态**：${r.status === "resolved" ? "已解决" : "待处理"}`), u.push(`- **窗口尺寸**：${(i = r.viewport) == null ? void 0 : i.width} × ${(c = r.viewport) == null ? void 0 : c.height}`), r.scroll && u.push(`- **滚动位置**：x=${r.scroll.x}, y=${r.scroll.y}`), r.type === "element" && r.elementRect ? (u.push(`- **元素选择器**：\`${r.selector}\``), u.push(`- **元素位置**：x=${r.elementRect.x}, y=${r.elementRect.y}, width=${r.elementRect.width}, height=${r.elementRect.height}`), r.elementText && u.push(`- **元素文本**：${r.elementText}`)) : r.viewportRect && u.push(`- **框选范围**：x=${r.viewportRect.x}, y=${r.viewportRect.y}, width=${r.viewportRect.width}, height=${r.viewportRect.height}`), u.push(`- **评审建议**：${r.suggestion}`), u.push(`- **创建时间**：${new Date(r.createdAt).toLocaleString()}`), r.screenshots && r.screenshots.length > 0 && (u.push(""), u.push("#### 截图"), r.screenshots.forEach((_) => {
        const x = _.url || _.imagePath || `images/${_.filename}`;
        u.push(`![${_.type}](${x})`);
      })), u.push("");
    });
  }), u.join(`
`);
}
function ae(e, u) {
  if (typeof window > "u") return;
  const n = URL.createObjectURL(e), h = document.createElement("a");
  h.href = n, h.download = u, document.body.appendChild(h), h.click(), document.body.removeChild(h), URL.revokeObjectURL(n);
}
function se() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}${te(e.getMonth() + 1)}${te(e.getDate())}-${te(e.getHours())}${te(e.getMinutes())}`;
}
function te(e) {
  return String(e).padStart(2, "0");
}
function qe(e) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[e] || e;
}
function Je(e, u) {
  return e.reduce((n, h) => {
    const l = h[u] || "unknown";
    return n[l] || (n[l] = []), n[l].push(h), n;
  }, {});
}
function Qe(e, u) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), h = n.createElement("base"), l = n.createElement("a");
  return n.head.appendChild(h), n.body.appendChild(l), u && (h.href = u), l.href = e, l.href;
}
const tr = /* @__PURE__ */ (() => {
  let e = 0;
  const u = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${u()}${e}`);
})();
function Nt(e) {
  const u = [];
  for (let n = 0, h = e.length; n < h; n++)
    u.push(e[n]);
  return u;
}
let Ht = null;
function Re(e = {}) {
  return Ht || (e.includeStyleProperties ? (Ht = e.includeStyleProperties, Ht) : (Ht = Nt(window.getComputedStyle(document.documentElement)), Ht));
}
function ee(e, u) {
  const h = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(u);
  return h ? parseFloat(h.replace("px", "")) : 0;
}
function er(e) {
  const u = ee(e, "border-left-width"), n = ee(e, "border-right-width");
  return e.clientWidth + u + n;
}
function rr(e) {
  const u = ee(e, "border-top-width"), n = ee(e, "border-bottom-width");
  return e.clientHeight + u + n;
}
function ze(e, u = {}) {
  const n = u.width || er(e), h = u.height || rr(e);
  return { width: n, height: h };
}
function nr() {
  let e, u;
  try {
    u = process;
  } catch {
  }
  const n = u && u.env ? u.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ot = 16384;
function ir(e) {
  (e.width > Ot || e.height > Ot) && (e.width > Ot && e.height > Ot ? e.width > e.height ? (e.height *= Ot / e.width, e.width = Ot) : (e.width *= Ot / e.height, e.height = Ot) : e.width > Ot ? (e.height *= Ot / e.width, e.width = Ot) : (e.width *= Ot / e.height, e.height = Ot));
}
function re(e) {
  return new Promise((u, n) => {
    const h = new Image();
    h.onload = () => {
      h.decode().then(() => {
        requestAnimationFrame(() => u(h));
      });
    }, h.onerror = n, h.crossOrigin = "anonymous", h.decoding = "async", h.src = e;
  });
}
async function ar(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((u) => `data:image/svg+xml;charset=utf-8,${u}`);
}
async function sr(e, u, n) {
  const h = "http://www.w3.org/2000/svg", l = document.createElementNS(h, "svg"), r = document.createElementNS(h, "foreignObject");
  return l.setAttribute("width", `${u}`), l.setAttribute("height", `${n}`), l.setAttribute("viewBox", `0 0 ${u} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), l.appendChild(r), r.appendChild(e), ar(l);
}
const Tt = (e, u) => {
  if (e instanceof u)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === u.name || Tt(n, u);
};
function or(e) {
  const u = e.getPropertyValue("content");
  return `${e.cssText} content: '${u.replace(/'|"/g, "")}';`;
}
function lr(e, u) {
  return Re(u).map((n) => {
    const h = e.getPropertyValue(n), l = e.getPropertyPriority(n);
    return `${n}: ${h}${l ? " !important" : ""};`;
  }).join(" ");
}
function ur(e, u, n, h) {
  const l = `.${e}:${u}`, r = n.cssText ? or(n) : lr(n, h);
  return document.createTextNode(`${l}{${r}}`);
}
function we(e, u, n, h) {
  const l = window.getComputedStyle(e, n), r = l.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = tr();
  try {
    u.className = `${u.className} ${s}`;
  } catch {
    return;
  }
  const i = document.createElement("style");
  i.appendChild(ur(s, n, l, h)), u.appendChild(i);
}
function cr(e, u, n) {
  we(e, u, ":before", n), we(e, u, ":after", n);
}
const _e = "application/font-woff", ye = "image/jpeg", fr = {
  woff: _e,
  woff2: _e,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ye,
  jpeg: ye,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function hr(e) {
  const u = /\.([^./]*?)$/g.exec(e);
  return u ? u[1] : "";
}
function ue(e) {
  const u = hr(e).toLowerCase();
  return fr[u] || "";
}
function dr(e) {
  return e.split(/,/)[1];
}
function le(e) {
  return e.search(/^(data:)/) !== -1;
}
function pr(e, u) {
  return `data:${u};base64,${e}`;
}
async function Ae(e, u, n) {
  const h = await fetch(e, u);
  if (h.status === 404)
    throw new Error(`Resource "${h.url}" not found`);
  const l = await h.blob();
  return new Promise((r, s) => {
    const i = new FileReader();
    i.onerror = s, i.onloadend = () => {
      try {
        r(n({ res: h, result: i.result }));
      } catch (c) {
        s(c);
      }
    }, i.readAsDataURL(l);
  });
}
const oe = {};
function mr(e, u, n) {
  let h = e.replace(/\?.*/, "");
  return n && (h = e), /ttf|otf|eot|woff2?/i.test(h) && (h = h.replace(/.*\//, "")), u ? `[${u}]${h}` : h;
}
async function ce(e, u, n) {
  const h = mr(e, u, n.includeQueryParams);
  if (oe[h] != null)
    return oe[h];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let l;
  try {
    const r = await Ae(e, n.fetchRequestInit, ({ res: s, result: i }) => (u || (u = s.headers.get("Content-Type") || ""), dr(i)));
    l = pr(r, u);
  } catch (r) {
    l = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return oe[h] = l, l;
}
async function gr(e) {
  const u = e.toDataURL();
  return u === "data:," ? e.cloneNode(!1) : re(u);
}
async function vr(e, u) {
  if (e.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = e.clientWidth, r.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, r.width, r.height);
    const i = r.toDataURL();
    return re(i);
  }
  const n = e.poster, h = ue(n), l = await ce(n, h, u);
  return re(l);
}
async function wr(e, u) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await ne(e.contentDocument.body, u, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function _r(e, u) {
  return Tt(e, HTMLCanvasElement) ? gr(e) : Tt(e, HTMLVideoElement) ? vr(e, u) : Tt(e, HTMLIFrameElement) ? wr(e, u) : e.cloneNode(Te(e));
}
const yr = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Te = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function br(e, u, n) {
  var h, l;
  if (Te(u))
    return u;
  let r = [];
  return yr(e) && e.assignedNodes ? r = Nt(e.assignedNodes()) : Tt(e, HTMLIFrameElement) && (!((h = e.contentDocument) === null || h === void 0) && h.body) ? r = Nt(e.contentDocument.body.childNodes) : r = Nt(((l = e.shadowRoot) !== null && l !== void 0 ? l : e).childNodes), r.length === 0 || Tt(e, HTMLVideoElement) || await r.reduce((s, i) => s.then(() => ne(i, n)).then((c) => {
    c && u.appendChild(c);
  }), Promise.resolve()), u;
}
function kr(e, u, n) {
  const h = u.style;
  if (!h)
    return;
  const l = window.getComputedStyle(e);
  l.cssText ? (h.cssText = l.cssText, h.transformOrigin = l.transformOrigin) : Re(n).forEach((r) => {
    let s = l.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), Tt(e, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && u.getAttribute("d") && (s = `path(${u.getAttribute("d")})`), h.setProperty(r, s, l.getPropertyPriority(r));
  });
}
function xr(e, u) {
  Tt(e, HTMLTextAreaElement) && (u.innerHTML = e.value), Tt(e, HTMLInputElement) && u.setAttribute("value", e.value);
}
function Sr(e, u) {
  if (Tt(e, HTMLSelectElement)) {
    const n = u, h = Array.from(n.children).find((l) => e.value === l.getAttribute("value"));
    h && h.setAttribute("selected", "");
  }
}
function Er(e, u, n) {
  return Tt(u, Element) && (kr(e, u, n), cr(e, u, n), xr(e, u), Sr(e, u)), u;
}
async function Cr(e, u) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const h = {};
  for (let r = 0; r < n.length; r++) {
    const i = n[r].getAttribute("xlink:href");
    if (i) {
      const c = e.querySelector(i), _ = document.querySelector(i);
      !c && _ && !h[i] && (h[i] = await ne(_, u, !0));
    }
  }
  const l = Object.values(h);
  if (l.length) {
    const r = "http://www.w3.org/1999/xhtml", s = document.createElementNS(r, "svg");
    s.setAttribute("xmlns", r), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const i = document.createElementNS(r, "defs");
    s.appendChild(i);
    for (let c = 0; c < l.length; c++)
      i.appendChild(l[c]);
    e.appendChild(s);
  }
  return e;
}
async function ne(e, u, n) {
  return !n && u.filter && !u.filter(e) ? null : Promise.resolve(e).then((h) => _r(h, u)).then((h) => br(e, h, u)).then((h) => Er(e, h, u)).then((h) => Cr(h, u));
}
const Ie = /url\((['"]?)([^'"]+?)\1\)/g, Rr = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, zr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Ar(e) {
  const u = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${u})(['"]?\\))`, "g");
}
function Tr(e) {
  const u = [];
  return e.replace(Ie, (n, h, l) => (u.push(l), n)), u.filter((n) => !le(n));
}
async function Ir(e, u, n, h, l) {
  try {
    const r = n ? Qe(u, n) : u, s = ue(u);
    let i;
    return l || (i = await ce(r, s, h)), e.replace(Ar(u), `$1${i}$3`);
  } catch {
  }
  return e;
}
function Or(e, { preferredFontFormat: u }) {
  return u ? e.replace(zr, (n) => {
    for (; ; ) {
      const [h, , l] = Rr.exec(n) || [];
      if (!l)
        return "";
      if (l === u)
        return `src: ${h};`;
    }
  }) : e;
}
function Oe(e) {
  return e.search(Ie) !== -1;
}
async function Be(e, u, n) {
  if (!Oe(e))
    return e;
  const h = Or(e, n);
  return Tr(h).reduce((r, s) => r.then((i) => Ir(i, s, u, n)), Promise.resolve(h));
}
async function Gt(e, u, n) {
  var h;
  const l = (h = u.style) === null || h === void 0 ? void 0 : h.getPropertyValue(e);
  if (l) {
    const r = await Be(l, null, n);
    return u.style.setProperty(e, r, u.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Br(e, u) {
  await Gt("background", e, u) || await Gt("background-image", e, u), await Gt("mask", e, u) || await Gt("-webkit-mask", e, u) || await Gt("mask-image", e, u) || await Gt("-webkit-mask-image", e, u);
}
async function Pr(e, u) {
  const n = Tt(e, HTMLImageElement);
  if (!(n && !le(e.src)) && !(Tt(e, SVGImageElement) && !le(e.href.baseVal)))
    return;
  const h = n ? e.src : e.href.baseVal, l = await ce(h, ue(h), u);
  await new Promise((r, s) => {
    e.onload = r, e.onerror = u.onImageErrorHandler ? (...c) => {
      try {
        r(u.onImageErrorHandler(...c));
      } catch (_) {
        s(_);
      }
    } : s;
    const i = e;
    i.decode && (i.decode = r), i.loading === "lazy" && (i.loading = "eager"), n ? (e.srcset = "", e.src = l) : e.href.baseVal = l;
  });
}
async function Dr(e, u) {
  const h = Nt(e.childNodes).map((l) => Pe(l, u));
  await Promise.all(h).then(() => e);
}
async function Pe(e, u) {
  Tt(e, Element) && (await Br(e, u), await Pr(e, u), await Dr(e, u));
}
function Lr(e, u) {
  const { style: n } = e;
  u.backgroundColor && (n.backgroundColor = u.backgroundColor), u.width && (n.width = `${u.width}px`), u.height && (n.height = `${u.height}px`);
  const h = u.style;
  return h != null && Object.keys(h).forEach((l) => {
    n[l] = h[l];
  }), e;
}
const be = {};
async function ke(e) {
  let u = be[e];
  if (u != null)
    return u;
  const h = await (await fetch(e)).text();
  return u = { url: e, cssText: h }, be[e] = u, u;
}
async function xe(e, u) {
  let n = e.cssText;
  const h = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let i = s.replace(h, "$1");
    return i.startsWith("https://") || (i = new URL(i, e.url).href), Ae(i, u.fetchRequestInit, ({ result: c }) => (n = n.replace(s, `url(${c})`), [s, c]));
  });
  return Promise.all(r).then(() => n);
}
function Se(e) {
  if (e == null)
    return [];
  const u = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let h = e.replace(n, "");
  const l = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const c = l.exec(h);
    if (c === null)
      break;
    u.push(c[0]);
  }
  h = h.replace(l, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", i = new RegExp(s, "gi");
  for (; ; ) {
    let c = r.exec(h);
    if (c === null) {
      if (c = i.exec(h), c === null)
        break;
      r.lastIndex = i.lastIndex;
    } else
      i.lastIndex = r.lastIndex;
    u.push(c[0]);
  }
  return u;
}
async function Fr(e, u) {
  const n = [], h = [];
  return e.forEach((l) => {
    if ("cssRules" in l)
      try {
        Nt(l.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let i = s + 1;
            const c = r.href, _ = ke(c).then((x) => xe(x, u)).then((x) => Se(x).forEach((y) => {
              try {
                l.insertRule(y, y.startsWith("@import") ? i += 1 : l.cssRules.length);
              } catch (S) {
                console.error("Error inserting rule from remote css", {
                  rule: y,
                  error: S
                });
              }
            })).catch((x) => {
              console.error("Error loading remote css", x.toString());
            });
            h.push(_);
          }
        });
      } catch (r) {
        const s = e.find((i) => i.href == null) || document.styleSheets[0];
        l.href != null && h.push(ke(l.href).then((i) => xe(i, u)).then((i) => Se(i).forEach((c) => {
          s.insertRule(c, s.cssRules.length);
        })).catch((i) => {
          console.error("Error loading remote stylesheet", i);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(h).then(() => (e.forEach((l) => {
    if ("cssRules" in l)
      try {
        Nt(l.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${l.href}`, r);
      }
  }), n));
}
function Nr(e) {
  return e.filter((u) => u.type === CSSRule.FONT_FACE_RULE).filter((u) => Oe(u.style.getPropertyValue("src")));
}
async function Ur(e, u) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Nt(e.ownerDocument.styleSheets), h = await Fr(n, u);
  return Nr(h);
}
function De(e) {
  return e.trim().replace(/["']/g, "");
}
function jr(e) {
  const u = /* @__PURE__ */ new Set();
  function n(h) {
    (h.style.fontFamily || getComputedStyle(h).fontFamily).split(",").forEach((r) => {
      u.add(De(r));
    }), Array.from(h.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(e), u;
}
async function Mr(e, u) {
  const n = await Ur(e, u), h = jr(e);
  return (await Promise.all(n.filter((r) => h.has(De(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return Be(r.cssText, s, u);
  }))).join(`
`);
}
async function $r(e, u) {
  const n = u.fontEmbedCSS != null ? u.fontEmbedCSS : u.skipFonts ? null : await Mr(e, u);
  if (n) {
    const h = document.createElement("style"), l = document.createTextNode(n);
    h.appendChild(l), e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h);
  }
}
async function Wr(e, u = {}) {
  const { width: n, height: h } = ze(e, u), l = await ne(e, u, !0);
  return await $r(l, u), await Pe(l, u), Lr(l, u), await sr(l, n, h);
}
async function Zr(e, u = {}) {
  const { width: n, height: h } = ze(e, u), l = await Wr(e, u), r = await re(l), s = document.createElement("canvas"), i = s.getContext("2d"), c = u.pixelRatio || nr(), _ = u.canvasWidth || n, x = u.canvasHeight || h;
  return s.width = _ * c, s.height = x * c, u.skipAutoScale || ir(s), s.style.width = `${_}`, s.style.height = `${x}`, u.backgroundColor && (i.fillStyle = u.backgroundColor, i.fillRect(0, 0, s.width, s.height)), i.drawImage(r, 0, 0, s.width, s.height), s;
}
async function fe(e, u = {}) {
  return (await Zr(e, u)).toDataURL();
}
const Lt = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box"
};
function Vr(e) {
  const u = Date.now(), n = Math.random().toString(36).slice(2, 6);
  return `screenshot-${e}-${u}-${n}.png`;
}
async function Le(e, u = {}) {
  if (!e) return null;
  try {
    return await fe(e, {
      pixelRatio: u.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...u
    });
  } catch (n) {
    return console.error("captureElement failed:", n), null;
  }
}
async function Hr(e = {}) {
  const u = document.documentElement;
  return Le(u, {
    width: window.innerWidth,
    height: window.innerHeight,
    style: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: "hidden"
    },
    ...e
  });
}
async function Gr(e = {}) {
  const u = document.documentElement, n = u.style.overflow, h = u.style.width, l = u.style.height;
  try {
    return u.style.overflow = "visible", u.style.width = "auto", u.style.height = "auto", await fe(u, {
      pixelRatio: e.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...e
    });
  } catch (r) {
    return console.error("captureFullPage failed:", r), null;
  } finally {
    u.style.overflow = n, u.style.width = h, u.style.height = l;
  }
}
async function Xr(e, u = {}) {
  if (!e || e.width < 1 || e.height < 1) return null;
  const n = document.documentElement, h = n.style.overflow, l = n.style.width, r = n.style.height;
  try {
    n.style.overflow = "visible", n.style.width = "auto", n.style.height = "auto";
    const s = await fe(n, {
      pixelRatio: u.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...u
    });
    return Yr(s, e);
  } catch (s) {
    return console.error("captureBox failed:", s), null;
  } finally {
    n.style.overflow = h, n.style.width = l, n.style.height = r;
  }
}
function Yr(e, u) {
  return new Promise((n, h) => {
    const l = new Image();
    l.onload = () => {
      const r = document.createElement("canvas"), s = window.devicePixelRatio || 1;
      r.width = Math.round(u.width * s), r.height = Math.round(u.height * s), r.getContext("2d").drawImage(
        l,
        u.x * s,
        u.y * s,
        u.width * s,
        u.height * s,
        0,
        0,
        r.width,
        r.height
      ), n(r.toDataURL("image/png"));
    }, l.onerror = h, l.src = e;
  });
}
async function Kr(e) {
  return (await fetch(e)).blob();
}
async function qr(e, u, n) {
  if (!n) return null;
  try {
    const h = await Kr(e);
    return await n(h, u);
  } catch (h) {
    return console.error("uploadScreenshot failed:", h), null;
  }
}
function Fe(e) {
  var l;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return "#" + e.id;
  const u = e.tagName.toLowerCase();
  if (e.className) {
    const r = String(e.className).split(/\s+/).filter((s) => s && !s.startsWith("el-") && !/^__/.test(s)).slice(0, 2);
    if (r.length) return u + "." + r.join(".");
  }
  let n = [], h = e;
  for (; h && h !== document.body; ) {
    let r = h.tagName.toLowerCase();
    if (h.id) {
      r += "#" + h.id, n.unshift(r);
      break;
    }
    const i = Array.from(((l = h.parentNode) == null ? void 0 : l.children) || []).filter((c) => c.tagName === h.tagName);
    if (i.length > 1) {
      const c = i.indexOf(h) + 1;
      r += `:nth-of-type(${c})`;
    }
    n.unshift(r), h = h.parentNode;
  }
  return n.join(" > ");
}
function Jr(e) {
  var h;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return `//*[@id="${e.id}"]`;
  const u = [];
  let n = e;
  for (; n && n !== document.body; ) {
    const s = Array.from(((h = n.parentNode) == null ? void 0 : h.children) || []).filter((i) => i.tagName === n.tagName).indexOf(n) + 1;
    u.unshift(`${n.tagName.toLowerCase()}[${s}]`), n = n.parentNode;
  }
  return u.unshift(""), "/html/body/" + u.slice(1).join("/");
}
function Qr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return {};
  const u = {}, n = e.getAttribute("role") || tn(e);
  n && (u.role = n);
  const h = en(e);
  h && (u.accessibleName = h);
  const l = e.getAttribute("aria-labelledby");
  return l && (u.labeledBy = l), Object.keys(u).length ? u : void 0;
}
function tn(e) {
  const u = e.tagName.toLowerCase(), n = e.getAttribute("type");
  return {
    button: "button",
    a: e.hasAttribute("href") ? "link" : void 0,
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
  }[u];
}
function en(e) {
  var r, s;
  if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
  const u = e.getAttribute("aria-labelledby");
  if (u) {
    const i = u.split(/\s+/).map((c) => {
      var _, x;
      return (x = (_ = document.getElementById(c)) == null ? void 0 : _.textContent) == null ? void 0 : x.trim();
    }).filter(Boolean);
    if (i.length) return i.join(" ");
  }
  const n = (r = e.labels) == null ? void 0 : r[0];
  if (n) return n.textContent.trim();
  if (e.tagName.toLowerCase() === "input" && e.placeholder) return e.placeholder.trim();
  const h = e.getAttribute("alt");
  if (h) return h.trim();
  const l = e.getAttribute("title");
  if (l) return l.trim();
  if (["button", "a"].includes(e.tagName.toLowerCase())) {
    const i = (s = e.textContent) == null ? void 0 : s.trim();
    if (i) return i;
  }
  return "";
}
function rn(e) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? void 0 : e.getAttribute("data-testid") || void 0;
}
function he(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return null;
  const u = e.getBoundingClientRect();
  return {
    tag: e.tagName.toLowerCase(),
    id: e.id || void 0,
    classes: e.className ? String(e.className).split(/\s+/).filter(Boolean) : void 0,
    selector: Fe(e),
    xpath: Jr(e),
    rect: {
      x: u.left + window.scrollX,
      y: u.top + window.scrollY,
      width: u.width,
      height: u.height
    },
    aria: Qr(e),
    testId: rn(e)
  };
}
function nn(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const u = [];
  let n = e;
  for (; n && n !== document.body; )
    u.unshift(n), n = n.parentElement;
  return n === document.body && u.unshift(document.body), u.map(he).filter(Boolean);
}
function an(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const u = sn(e);
  if (u.length) return u;
  const n = ln(e);
  return n.length ? n : [];
}
function sn(e) {
  const u = [];
  let n = e;
  for (; n; ) {
    const h = on(n);
    h && !u.find((l) => l.componentName === h.componentName && l.selector === h.selector) && u.unshift(h), n = n.parentElement;
  }
  return u;
}
function on(e) {
  var r, s, i, c, _;
  const n = Object.keys(e || {}).find((x) => x.startsWith("__vue"));
  if (!n) return null;
  const h = e[n], l = ((r = h == null ? void 0 : h.type) == null ? void 0 : r.name) || ((s = h == null ? void 0 : h.type) == null ? void 0 : s.__name) || ((c = (i = h == null ? void 0 : h.parent) == null ? void 0 : i.type) == null ? void 0 : c.name);
  return l ? {
    componentName: l,
    selector: Fe(e),
    rect: (_ = he(e)) == null ? void 0 : _.rect
  } : null;
}
function ln(e) {
  const u = [], n = Object.keys(e || {}).find((l) => l.startsWith("__reactFiber$"));
  if (!n) return u;
  let h = e[n];
  for (; h; ) {
    const l = un(h);
    l && !u.find((r) => r.componentName === l) && u.unshift({ componentName: l, selector: void 0, rect: void 0 }), h = h.return;
  }
  return u;
}
function un(e) {
  var u;
  if (!e) return null;
  if (typeof e.type == "function") return e.type.displayName || e.type.name || null;
  if (typeof e.type == "string") return null;
  if (e.elementType) {
    if (typeof e.elementType == "function") return e.elementType.displayName || e.elementType.name || null;
    if (typeof e.elementType == "object" && ((u = e.elementType) != null && u.$$typeof)) return e.elementType.name || null;
  }
  return null;
}
function Ee(e) {
  return {
    dom: nn(e),
    framework: an(e)
  };
}
const cn = (e, u) => {
  const n = e.__vccOpts || e;
  for (const [h, l] of u)
    n[h] = l;
  return n;
}, fn = { class: "toolbar-left" }, hn = { class: "toolbar-right" }, dn = { class: "highlight-label" }, pn = { class: "highlight-label" }, mn = { class: "review-target-info" }, gn = {
  key: 0,
  class: "target-desc"
}, vn = {
  key: 1,
  class: "target-desc"
}, wn = { class: "text-muted" }, _n = { class: "text-muted" }, yn = {
  key: 1,
  class: "tree-panel"
}, bn = {
  key: 0,
  class: "tree-section"
}, kn = { class: "tree-list" }, xn = ["onMouseenter", "onClick"], Sn = { class: "node-name" }, En = { class: "tree-section" }, Cn = { class: "tree-list" }, Rn = ["onMouseenter", "onClick"], zn = { class: "node-tag" }, An = {
  key: 0,
  class: "node-id"
}, Tn = {
  key: 1,
  class: "node-aria"
}, In = {
  key: 2,
  class: "node-testid"
}, On = { class: "review-list-actions" }, Bn = {
  key: 1,
  class: "review-list"
}, Pn = { class: "review-item-header" }, Dn = { class: "review-item-title" }, Ln = { class: "review-item-tags" }, Fn = { class: "review-item-target" }, Nn = { class: "review-item-suggestion" }, Un = { class: "review-item-meta" }, jn = { class: "text-muted" }, Mn = { class: "review-item-actions" }, $n = {
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
  setup(e, { expose: u, emit: n }) {
    const h = e, l = n, r = Zt(() => h.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: s, getPageReviews: i, addReview: c, updateReview: _, deleteReview: x, clearPageReviews: y, exportToJSON: S, exportToMarkdown: f, exportToZIP: w } = Ke({
      storageKey: h.storageKey,
      defaultPagePath: () => r.value
    }), o = Zt(() => i(r.value)), m = St("element"), d = St(!1), g = St(!1), k = St(!1), C = St(null), R = St(""), L = St(null), P = St(null), U = St(null), A = St(null), W = St(!1), Q = St({ x: 0, y: 0 }), b = St({ x: 0, y: 0 }), D = St(!1), a = St({ x: 0, y: 0 }), N = St([]), V = St({
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
      aria: null
    }), $ = Zt(() => V.value.title.trim() && V.value.suggestion.trim()), st = Zt(() => {
      if (!A.value) return {};
      const Y = A.value;
      return {
        left: Y.x + "px",
        top: Y.y + "px",
        width: Y.width + "px",
        height: Y.height + "px"
      };
    }), Z = Zt(() => {
      const { x: Y, y: B } = b.value;
      return {
        transform: `translate(calc(-50% + ${Y}px), ${B}px)`
      };
    });
    function nt(Y) {
      return Y ? {
        left: Y.x + "px",
        top: Y.y + "px",
        width: Y.width + "px",
        height: Y.height + "px"
      } : {};
    }
    function I(Y) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[Y] || "info";
    }
    function T(Y) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[Y] || Y;
    }
    function rt() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: r.value,
        pageUrl: window.location.href,
        pageName: h.pageName || r.value
      };
    }
    function K(Y) {
      var it;
      if (Y.id) return "#" + Y.id;
      if (Y.className) {
        const ft = String(Y.className).split(/\s+/).filter((Ct) => Ct && !Ct.startsWith("el-")).slice(0, 2);
        if (ft.length) return Y.tagName.toLowerCase() + "." + ft.join(".");
      }
      let B = [], et = Y;
      for (; et && et !== document.body; ) {
        let ft = et.tagName.toLowerCase();
        if (et.id) {
          ft += "#" + et.id, B.unshift(ft);
          break;
        }
        const bt = Array.from(((it = et.parentNode) == null ? void 0 : it.children) || []).filter((Bt) => Bt.tagName === et.tagName);
        if (bt.length > 1) {
          const Bt = bt.indexOf(et) + 1;
          ft += `:nth-of-type(${Bt})`;
        }
        B.unshift(ft), et = et.parentNode;
      }
      return B.join(" > ");
    }
    function X(Y) {
      const B = document.elementFromPoint(Y.clientX, Y.clientY);
      return !B || B.closest(".review-overlay") ? null : B;
    }
    function gt(Y) {
      if (D.value || m.value !== "element" || d.value || W.value) return;
      const B = X(Y);
      if (!B) {
        C.value = null;
        return;
      }
      const et = B.getBoundingClientRect();
      C.value = {
        x: et.left + window.scrollX,
        y: et.top + window.scrollY,
        width: et.width,
        height: et.height
      }, R.value = B.tagName.toLowerCase();
    }
    function yt() {
      C.value = null;
    }
    function lt(Y) {
      var it;
      if (m.value !== "element" || d.value || W.value) return;
      const B = X(Y);
      if (!B) return;
      Y.preventDefault(), Y.stopPropagation();
      const et = B.getBoundingClientRect();
      L.value = {
        el: B,
        selector: K(B),
        tag: B.tagName.toLowerCase(),
        text: ((it = B.innerText) == null ? void 0 : it.slice(0, 40)) || "",
        rect: {
          x: et.left + window.scrollX,
          y: et.top + window.scrollY,
          width: et.width,
          height: et.height
        }
      }, U.value = Ee(B), j("element");
    }
    function ct(Y) {
      Y.rect && (P.value = Y.rect);
    }
    function _t(Y) {
      var it;
      if (!Y.selector) return;
      const B = document.querySelector(Y.selector);
      if (!B) return;
      const et = B.getBoundingClientRect();
      L.value = {
        el: B,
        selector: Y.selector,
        tag: B.tagName.toLowerCase(),
        text: ((it = B.innerText) == null ? void 0 : it.slice(0, 40)) || "",
        rect: {
          x: et.left + window.scrollX,
          y: et.top + window.scrollY,
          width: et.width,
          height: et.height
        }
      }, U.value = Ee(B), k.value = !1, j("element");
    }
    function vt(Y) {
      D.value || m.value !== "viewport" || d.value || (W.value = !0, Q.value = { x: Y.clientX + window.scrollX, y: Y.clientY + window.scrollY }, A.value = { x: Q.value.x, y: Q.value.y, width: 0, height: 0 });
    }
    function It(Y) {
      if (D.value || !W.value) return;
      const B = Y.clientX + window.scrollX, et = Y.clientY + window.scrollY;
      A.value = {
        x: Math.min(Q.value.x, B),
        y: Math.min(Q.value.y, et),
        width: Math.abs(B - Q.value.x),
        height: Math.abs(et - Q.value.y)
      };
    }
    function zt(Y) {
      if (D.value) {
        D.value = !1;
        return;
      }
      W.value && (W.value = !1, A.value && A.value.width > 10 && A.value.height > 10 && j("viewport", { ...A.value }), A.value = null);
    }
    function t(Y) {
      var et, it;
      ((et = Y.target.classList) != null && et.contains("toolbar-title") || (it = Y.target.classList) != null && it.contains("review-toolbar")) && (D.value = !0, a.value = {
        x: Y.clientX - b.value.x,
        y: Y.clientY - b.value.y
      });
    }
    function F(Y) {
      D.value && (b.value = {
        x: Y.clientX - a.value.x,
        y: Y.clientY - a.value.y
      });
    }
    function O(Y) {
      Y.key === "Escape" && (d.value ? d.value = !1 : tt());
    }
    function v() {
    }
    const p = Zt(() => V.value.type === "element" ? [
      { value: Lt.ELEMENT, label: "选中元素" },
      { value: Lt.VIEWPORT, label: "当前视口" },
      { value: Lt.FULL_PAGE, label: "完整页面" }
    ] : [
      { value: Lt.BOX, label: "框选区域" },
      { value: Lt.VIEWPORT, label: "当前视口" },
      { value: Lt.FULL_PAGE, label: "完整页面" }
    ]);
    async function E() {
      var B;
      const Y = [];
      for (const et of N.value) {
        let it = null;
        if (et === Lt.ELEMENT && ((B = L.value) != null && B.el) ? it = await Le(L.value.el) : et === Lt.BOX && V.value.viewportRect ? it = await Xr(V.value.viewportRect) : et === Lt.VIEWPORT ? it = await Hr() : et === Lt.FULL_PAGE && (it = await Gr()), it) {
          const ft = Vr(et);
          let Ct = null;
          h.imageUpload && (Ct = await qr(it, ft, h.imageUpload)), Y.push({
            type: et,
            filename: ft,
            data: Ct ? void 0 : it,
            url: Ct || void 0
          });
        }
      }
      return Y;
    }
    function j(Y, B = null) {
      var ft, Ct, bt, Bt;
      const et = rt(), it = (ft = L.value) != null && ft.el ? he(L.value.el) : null;
      V.value = {
        type: Y,
        title: "",
        severity: "medium",
        suggestion: "",
        selector: ((Ct = L.value) == null ? void 0 : Ct.selector) || "",
        elementText: ((bt = L.value) == null ? void 0 : bt.text) || "",
        elementRect: ((Bt = L.value) == null ? void 0 : Bt.rect) || null,
        viewportRect: B,
        viewport: et.viewport,
        scroll: et.scroll,
        pagePath: et.pagePath,
        pageUrl: et.pageUrl,
        pageName: et.pageName,
        componentTree: U.value,
        aria: (it == null ? void 0 : it.aria) || null
      }, N.value = [], d.value = !0;
    }
    function M() {
      L.value = null, A.value = null, P.value = null, U.value = null, N.value = [], V.value = {
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
        aria: null
      };
    }
    async function z() {
      if (!$.value) return;
      const Y = await E(), B = c({
        type: V.value.type,
        title: V.value.title.trim(),
        severity: V.value.severity,
        suggestion: V.value.suggestion.trim(),
        selector: V.value.selector,
        elementText: V.value.elementText,
        elementRect: V.value.elementRect,
        viewportRect: V.value.viewportRect,
        viewport: V.value.viewport,
        scroll: V.value.scroll,
        pagePath: V.value.pagePath,
        pageUrl: V.value.pageUrl,
        pageName: V.value.pageName,
        status: "open",
        screenshots: Y,
        componentTree: V.value.componentTree,
        aria: V.value.aria
      });
      d.value = !1, l("add", B);
    }
    function H(Y) {
      _(Y, { status: "resolved" }), l("update", { id: Y, status: "resolved" });
    }
    function q(Y) {
      ge.confirm("确定删除这条评审意见吗？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        x(Y), l("delete", { id: Y });
      });
    }
    function G() {
      o.value.length !== 0 && ge.confirm("确定清空当前页面的所有评审意见吗？", "清空确认", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        y(r.value), l("clear", { pagePath: r.value });
      });
    }
    function tt() {
      l("update:active", !1);
    }
    function ht() {
      document.addEventListener("mousemove", gt), document.addEventListener("mouseout", yt), document.addEventListener("click", lt, !0), document.addEventListener("mousedown", vt), document.addEventListener("mousemove", It), document.addEventListener("mousemove", F), document.addEventListener("mouseup", zt), document.addEventListener("keydown", O);
    }
    function ut() {
      document.removeEventListener("mousemove", gt), document.removeEventListener("mouseout", yt), document.removeEventListener("click", lt, !0), document.removeEventListener("mousedown", vt), document.removeEventListener("mousemove", It), document.removeEventListener("mousemove", F), document.removeEventListener("mouseup", zt), document.removeEventListener("keydown", O);
    }
    Me(() => {
      h.active && ht();
    }), me(() => {
      ut();
    });
    let Et = null;
    return $e(() => {
      Et = We(() => h.active, (Y) => {
        Y ? (ht(), m.value = "element") : (ut(), M(), C.value = null, g.value = !1, k.value = !1);
      });
    }), me(() => {
      Et && Et();
    }), u({
      reviews: s,
      pageReviews: o,
      addReview: c,
      updateReview: _,
      deleteReview: x,
      clearPageReviews: y,
      exportToJSON: S,
      exportToMarkdown: f
    }), (Y, B) => {
      const et = xt("el-radio-button"), it = xt("el-radio-group"), ft = xt("el-button"), Ct = xt("el-badge"), bt = xt("el-dropdown-item"), Bt = xt("el-dropdown-menu"), ie = xt("el-dropdown"), Wt = xt("el-tag"), Ft = xt("el-form-item"), Xt = xt("el-checkbox"), Ut = xt("el-checkbox-group"), jt = xt("el-input"), Yt = xt("el-radio"), Ne = xt("el-form"), Ue = xt("el-dialog"), de = xt("el-empty"), pe = xt("el-drawer"), je = xt("el-card");
      return dt(), Dt(Ze, { to: "body" }, [
        e.active ? (dt(), kt("div", {
          key: 0,
          class: "review-overlay",
          onClick: v
        }, [
          mt("div", {
            class: He(["review-toolbar", { "is-dragging": D.value }]),
            style: Vt(Z.value),
            onClick: B[3] || (B[3] = Ve(() => {
            }, ["stop"])),
            onMousedown: t
          }, [
            mt("div", fn, [
              B[16] || (B[16] = mt("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              ot(it, {
                modelValue: m.value,
                "onUpdate:modelValue": B[0] || (B[0] = (J) => m.value = J),
                size: "small"
              }, {
                default: at(() => [
                  ot(et, { label: "element" }, {
                    default: at(() => [...B[14] || (B[14] = [
                      pt("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  ot(et, { label: "viewport" }, {
                    default: at(() => [...B[15] || (B[15] = [
                      pt("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            mt("div", hn, [
              e.enableComponentTree ? (dt(), Dt(ft, {
                key: 0,
                size: "small",
                onClick: B[1] || (B[1] = (J) => k.value = !0)
              }, {
                default: at(() => [...B[17] || (B[17] = [
                  pt("组件树", -1)
                ])]),
                _: 1
              })) : At("", !0),
              ot(Ct, {
                value: o.value.length,
                class: "review-badge"
              }, {
                default: at(() => [
                  ot(ft, {
                    size: "small",
                    onClick: B[2] || (B[2] = (J) => g.value = !0)
                  }, {
                    default: at(() => [...B[18] || (B[18] = [
                      pt("评审列表", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              ot(ie, {
                size: "small",
                "split-button": "",
                type: "primary",
                onClick: $t(f)
              }, {
                dropdown: at(() => [
                  ot(Bt, null, {
                    default: at(() => [
                      ot(bt, { onClick: $t(f) }, {
                        default: at(() => [...B[19] || (B[19] = [
                          pt("导出为 Markdown", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      ot(bt, { onClick: $t(S) }, {
                        default: at(() => [...B[20] || (B[20] = [
                          pt("导出为 JSON", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      e.enableZipExport ? (dt(), Dt(bt, {
                        key: 0,
                        onClick: $t(w)
                      }, {
                        default: at(() => [...B[21] || (B[21] = [
                          pt("导出为 ZIP", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])) : At("", !0)
                    ]),
                    _: 1
                  })
                ]),
                default: at(() => [
                  B[22] || (B[22] = pt(" 导出 ", -1))
                ]),
                _: 1
              }, 8, ["onClick"]),
              ot(ft, {
                size: "small",
                type: "danger",
                onClick: tt
              }, {
                default: at(() => [...B[23] || (B[23] = [
                  pt("退出评审", -1)
                ])]),
                _: 1
              })
            ])
          ], 38),
          C.value && m.value === "element" && !d.value ? (dt(), kt("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: Vt(nt(C.value))
          }, [
            mt("span", dn, wt(R.value), 1)
          ], 4)) : At("", !0),
          L.value && m.value === "element" ? (dt(), kt("div", {
            key: 1,
            class: "highlight-box selected-box",
            style: Vt(nt(L.value.rect))
          }, [
            mt("span", pn, "已选：" + wt(L.value.tag), 1)
          ], 4)) : At("", !0),
          P.value ? (dt(), kt("div", {
            key: 2,
            class: "highlight-box tree-hover-box",
            style: Vt(nt(P.value))
          }, null, 4)) : At("", !0),
          A.value || V.value.type === "viewport" && V.value.viewportRect && d.value ? (dt(), kt("div", {
            key: 3,
            class: "drag-rect",
            style: Vt(A.value ? st.value : nt(V.value.viewportRect))
          }, null, 4)) : At("", !0),
          ot(Ue, {
            modelValue: d.value,
            "onUpdate:modelValue": B[9] || (B[9] = (J) => d.value = J),
            title: "添加评审意见",
            width: "520px",
            "close-on-click-modal": !1,
            onClosed: M
          }, {
            footer: at(() => [
              ot(ft, {
                onClick: B[8] || (B[8] = (J) => d.value = !1)
              }, {
                default: at(() => [...B[28] || (B[28] = [
                  pt("取消", -1)
                ])]),
                _: 1
              }),
              ot(ft, {
                type: "primary",
                disabled: !$.value,
                onClick: z
              }, {
                default: at(() => [...B[29] || (B[29] = [
                  pt("保存评审", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            default: at(() => [
              ot(Ne, {
                model: V.value,
                "label-width": "80px"
              }, {
                default: at(() => [
                  ot(Ft, { label: "评审位置" }, {
                    default: at(() => {
                      var J, Rt, Pt, Mt;
                      return [
                        mt("div", mn, [
                          ot(Wt, { size: "small" }, {
                            default: at(() => [
                              pt(wt(V.value.type === "element" ? "元素" : "视图范围"), 1)
                            ]),
                            _: 1
                          }),
                          V.value.type === "element" ? (dt(), kt("span", gn, wt(V.value.elementText || V.value.selector), 1)) : (dt(), kt("span", vn, " 框选区域 x=" + wt((J = V.value.viewportRect) == null ? void 0 : J.x) + ", y=" + wt((Rt = V.value.viewportRect) == null ? void 0 : Rt.y) + ", w=" + wt((Pt = V.value.viewportRect) == null ? void 0 : Pt.width) + ", h=" + wt((Mt = V.value.viewportRect) == null ? void 0 : Mt.height), 1))
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  ot(Ft, { label: "窗口尺寸" }, {
                    default: at(() => {
                      var J, Rt;
                      return [
                        mt("span", wn, wt((J = V.value.viewport) == null ? void 0 : J.width) + " × " + wt((Rt = V.value.viewport) == null ? void 0 : Rt.height), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ot(Ft, { label: "滚动位置" }, {
                    default: at(() => {
                      var J, Rt;
                      return [
                        mt("span", _n, "x=" + wt((J = V.value.scroll) == null ? void 0 : J.x) + ", y=" + wt((Rt = V.value.scroll) == null ? void 0 : Rt.y), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ot(Ft, { label: "截图" }, {
                    default: at(() => [
                      ot(Ut, {
                        modelValue: N.value,
                        "onUpdate:modelValue": B[4] || (B[4] = (J) => N.value = J)
                      }, {
                        default: at(() => [
                          (dt(!0), kt(Kt, null, qt(p.value, (J) => (dt(), Dt(Xt, {
                            key: J.value,
                            label: J.value
                          }, {
                            default: at(() => [
                              pt(wt(J.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ot(Ft, {
                    label: "标题",
                    required: ""
                  }, {
                    default: at(() => [
                      ot(jt, {
                        modelValue: V.value.title,
                        "onUpdate:modelValue": B[5] || (B[5] = (J) => V.value.title = J),
                        placeholder: "例如：按钮样式不统一"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ot(Ft, {
                    label: "严重等级",
                    required: ""
                  }, {
                    default: at(() => [
                      ot(it, {
                        modelValue: V.value.severity,
                        "onUpdate:modelValue": B[6] || (B[6] = (J) => V.value.severity = J)
                      }, {
                        default: at(() => [
                          ot(Yt, { label: "low" }, {
                            default: at(() => [...B[24] || (B[24] = [
                              pt("低", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Yt, { label: "medium" }, {
                            default: at(() => [...B[25] || (B[25] = [
                              pt("中", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Yt, { label: "high" }, {
                            default: at(() => [...B[26] || (B[26] = [
                              pt("高", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Yt, { label: "critical" }, {
                            default: at(() => [...B[27] || (B[27] = [
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
                  ot(Ft, {
                    label: "评审建议",
                    required: ""
                  }, {
                    default: at(() => [
                      ot(jt, {
                        modelValue: V.value.suggestion,
                        "onUpdate:modelValue": B[7] || (B[7] = (J) => V.value.suggestion = J),
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
          ot(pe, {
            modelValue: k.value,
            "onUpdate:modelValue": B[12] || (B[12] = (J) => k.value = J),
            title: "组件树检查器",
            size: "480px",
            "with-header": !0
          }, {
            default: at(() => [
              U.value ? (dt(), kt("div", yn, [
                U.value.framework && U.value.framework.length ? (dt(), kt("div", bn, [
                  B[30] || (B[30] = mt("h4", null, "框架组件树", -1)),
                  mt("div", kn, [
                    (dt(!0), kt(Kt, null, qt(U.value.framework, (J, Rt) => (dt(), kt("div", {
                      key: "fw-" + Rt,
                      class: "tree-node",
                      onMouseenter: (Pt) => ct(J),
                      onMouseleave: B[10] || (B[10] = (Pt) => P.value = null),
                      onClick: (Pt) => _t(J)
                    }, [
                      mt("span", Sn, wt(J.componentName), 1)
                    ], 40, xn))), 128))
                  ])
                ])) : At("", !0),
                mt("div", En, [
                  B[31] || (B[31] = mt("h4", null, "DOM 树", -1)),
                  mt("div", Cn, [
                    (dt(!0), kt(Kt, null, qt(U.value.dom, (J, Rt) => {
                      var Pt;
                      return dt(), kt("div", {
                        key: "dom-" + Rt,
                        class: "tree-node",
                        style: Vt({ paddingLeft: Rt * 12 + "px" }),
                        onMouseenter: (Mt) => ct(J),
                        onMouseleave: B[11] || (B[11] = (Mt) => P.value = null),
                        onClick: (Mt) => _t(J)
                      }, [
                        mt("span", zn, wt(J.tag), 1),
                        J.id ? (dt(), kt("span", An, "#" + wt(J.id), 1)) : At("", !0),
                        (Pt = J.aria) != null && Pt.role ? (dt(), kt("span", Tn, "role=" + wt(J.aria.role), 1)) : At("", !0),
                        J.testId ? (dt(), kt("span", In, "testid=" + wt(J.testId), 1)) : At("", !0)
                      ], 44, Rn);
                    }), 128))
                  ])
                ])
              ])) : (dt(), Dt(de, {
                key: 0,
                description: "先选择一个元素以查看组件树"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          ot(pe, {
            modelValue: g.value,
            "onUpdate:modelValue": B[13] || (B[13] = (J) => g.value = J),
            title: "当前页面评审意见",
            size: "480px",
            "with-header": !0
          }, {
            default: at(() => [
              mt("div", On, [
                ot(ft, {
                  size: "small",
                  type: "primary",
                  onClick: $t(f)
                }, {
                  default: at(() => [...B[32] || (B[32] = [
                    pt("导出 Markdown", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                ot(ft, {
                  size: "small",
                  onClick: $t(S)
                }, {
                  default: at(() => [...B[33] || (B[33] = [
                    pt("导出 JSON", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                e.enableZipExport ? (dt(), Dt(ft, {
                  key: 0,
                  size: "small",
                  onClick: $t(w)
                }, {
                  default: at(() => [...B[34] || (B[34] = [
                    pt("导出 ZIP", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : At("", !0),
                ot(ft, {
                  size: "small",
                  type: "danger",
                  text: "",
                  onClick: G
                }, {
                  default: at(() => [...B[35] || (B[35] = [
                    pt("清空本页", -1)
                  ])]),
                  _: 1
                })
              ]),
              o.value.length === 0 ? (dt(), Dt(de, {
                key: 0,
                description: "暂无评审意见"
              })) : (dt(), kt("div", Bn, [
                (dt(!0), kt(Kt, null, qt(o.value, (J) => (dt(), Dt(je, {
                  key: J.id,
                  class: "review-item",
                  shadow: "never"
                }, {
                  default: at(() => {
                    var Rt, Pt;
                    return [
                      mt("div", Pn, [
                        mt("span", Dn, wt(J.title), 1),
                        mt("div", Ln, [
                          ot(Wt, {
                            size: "small",
                            type: I(J.severity)
                          }, {
                            default: at(() => [
                              pt(wt(T(J.severity)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"]),
                          ot(Wt, {
                            size: "small",
                            type: "info"
                          }, {
                            default: at(() => [
                              pt(wt(J.type === "element" ? "元素" : "视图"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          (Pt = (Rt = J.componentTree) == null ? void 0 : Rt.dom) != null && Pt.length ? (dt(), Dt(Wt, {
                            key: 0,
                            size: "small",
                            type: "success"
                          }, {
                            default: at(() => [...B[36] || (B[36] = [
                              pt("树", -1)
                            ])]),
                            _: 1
                          })) : At("", !0)
                        ])
                      ]),
                      mt("p", Fn, wt(J.type === "element" ? J.elementText || J.selector : `框选 x=${J.viewportRect.x}, y=${J.viewportRect.y}`), 1),
                      mt("p", Nn, wt(J.suggestion), 1),
                      mt("div", Un, [
                        mt("span", jn, wt(new Date(J.createdAt).toLocaleString()), 1),
                        mt("div", Mn, [
                          J.status !== "resolved" ? (dt(), Dt(ft, {
                            key: 0,
                            link: "",
                            type: "primary",
                            size: "small",
                            onClick: (Mt) => H(J.id)
                          }, {
                            default: at(() => [...B[37] || (B[37] = [
                              pt("标记解决", -1)
                            ])]),
                            _: 1
                          }, 8, ["onClick"])) : At("", !0),
                          ot(ft, {
                            link: "",
                            type: "danger",
                            size: "small",
                            onClick: (Mt) => q(J.id)
                          }, {
                            default: at(() => [...B[38] || (B[38] = [
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
        ])) : At("", !0)
      ]);
    };
  }
}, Vn = /* @__PURE__ */ cn($n, [["__scopeId", "data-v-7e5e5d4b"]]);
export {
  Vn as ReviewTool,
  Vn as default,
  Ke as usePageReview
};
