import { ref as mt, computed as ee, onMounted as Rn, onUnmounted as Ze, nextTick as An, watch as Tn, resolveComponent as Et, openBlock as pt, createBlock as Nt, Teleport as In, createElementBlock as kt, createElementVNode as ft, withModifiers as Ut, normalizeStyle as $t, normalizeClass as ue, createVNode as ut, withCtx as st, createTextVNode as gt, createCommentVNode as Rt, toDisplayString as St, unref as Mt, Fragment as Yt, renderList as Kt } from "vue";
import { ElMessageBox as He } from "element-plus";
var ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function On(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function de(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var tn = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(e, o) {
  (function(r) {
    e.exports = r();
  })(function() {
    return function r(h, u, n) {
      function s(_, S) {
        if (!u[_]) {
          if (!h[_]) {
            var k = typeof de == "function" && de;
            if (!S && k) return k(_, !0);
            if (i) return i(_, !0);
            var y = new Error("Cannot find module '" + _ + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var c = u[_] = { exports: {} };
          h[_][0].call(c.exports, function(w) {
            var l = h[_][1][w];
            return s(l || w);
          }, c, c.exports, r, h, u, n);
        }
        return u[_].exports;
      }
      for (var i = typeof de == "function" && de, d = 0; d < n.length; d++) s(n[d]);
      return s;
    }({ 1: [function(r, h, u) {
      var n = r("./utils"), s = r("./support"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      u.encode = function(d) {
        for (var _, S, k, y, c, w, l, m = [], f = 0, g = d.length, x = g, z = n.getTypeOf(d) !== "string"; f < d.length; ) x = g - f, k = z ? (_ = d[f++], S = f < g ? d[f++] : 0, f < g ? d[f++] : 0) : (_ = d.charCodeAt(f++), S = f < g ? d.charCodeAt(f++) : 0, f < g ? d.charCodeAt(f++) : 0), y = _ >> 2, c = (3 & _) << 4 | S >> 4, w = 1 < x ? (15 & S) << 2 | k >> 6 : 64, l = 2 < x ? 63 & k : 64, m.push(i.charAt(y) + i.charAt(c) + i.charAt(w) + i.charAt(l));
        return m.join("");
      }, u.decode = function(d) {
        var _, S, k, y, c, w, l = 0, m = 0, f = "data:";
        if (d.substr(0, f.length) === f) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, x = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (d.charAt(d.length - 1) === i.charAt(64) && x--, d.charAt(d.length - 2) === i.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = s.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); l < d.length; ) _ = i.indexOf(d.charAt(l++)) << 2 | (y = i.indexOf(d.charAt(l++))) >> 4, S = (15 & y) << 4 | (c = i.indexOf(d.charAt(l++))) >> 2, k = (3 & c) << 6 | (w = i.indexOf(d.charAt(l++))), g[m++] = _, c !== 64 && (g[m++] = S), w !== 64 && (g[m++] = k);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(r, h, u) {
      var n = r("./external"), s = r("./stream/DataWorker"), i = r("./stream/Crc32Probe"), d = r("./stream/DataLengthProbe");
      function _(S, k, y, c, w) {
        this.compressedSize = S, this.uncompressedSize = k, this.crc32 = y, this.compression = c, this.compressedContent = w;
      }
      _.prototype = { getContentWorker: function() {
        var S = new s(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), k = this;
        return S.on("end", function() {
          if (this.streamInfo.data_length !== k.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), S;
      }, getCompressedWorker: function() {
        return new s(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(S, k, y) {
        return S.pipe(new i()).pipe(new d("uncompressedSize")).pipe(k.compressWorker(y)).pipe(new d("compressedSize")).withStreamInfo("compression", k);
      }, h.exports = _;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(r, h, u) {
      var n = r("./stream/GenericWorker");
      u.STORE = { magic: "\0\0", compressWorker: function() {
        return new n("STORE compression");
      }, uncompressWorker: function() {
        return new n("STORE decompression");
      } }, u.DEFLATE = r("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(r, h, u) {
      var n = r("./utils"), s = function() {
        for (var i, d = [], _ = 0; _ < 256; _++) {
          i = _;
          for (var S = 0; S < 8; S++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
          d[_] = i;
        }
        return d;
      }();
      h.exports = function(i, d) {
        return i !== void 0 && i.length ? n.getTypeOf(i) !== "string" ? function(_, S, k, y) {
          var c = s, w = y + k;
          _ ^= -1;
          for (var l = y; l < w; l++) _ = _ >>> 8 ^ c[255 & (_ ^ S[l])];
          return -1 ^ _;
        }(0 | d, i, i.length, 0) : function(_, S, k, y) {
          var c = s, w = y + k;
          _ ^= -1;
          for (var l = y; l < w; l++) _ = _ >>> 8 ^ c[255 & (_ ^ S.charCodeAt(l))];
          return -1 ^ _;
        }(0 | d, i, i.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(r, h, u) {
      u.base64 = !1, u.binary = !1, u.dir = !1, u.createFolders = !0, u.date = null, u.compression = null, u.compressionOptions = null, u.comment = null, u.unixPermissions = null, u.dosPermissions = null;
    }, {}], 6: [function(r, h, u) {
      var n = null;
      n = typeof Promise < "u" ? Promise : r("lie"), h.exports = { Promise: n };
    }, { lie: 37 }], 7: [function(r, h, u) {
      var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = r("pako"), i = r("./utils"), d = r("./stream/GenericWorker"), _ = n ? "uint8array" : "array";
      function S(k, y) {
        d.call(this, "FlateWorker/" + k), this._pako = null, this._pakoAction = k, this._pakoOptions = y, this.meta = {};
      }
      u.magic = "\b\0", i.inherits(S, d), S.prototype.processChunk = function(k) {
        this.meta = k.meta, this._pako === null && this._createPako(), this._pako.push(i.transformTo(_, k.data), !1);
      }, S.prototype.flush = function() {
        d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, S.prototype.cleanUp = function() {
        d.prototype.cleanUp.call(this), this._pako = null;
      }, S.prototype._createPako = function() {
        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var k = this;
        this._pako.onData = function(y) {
          k.push({ data: y, meta: k.meta });
        };
      }, u.compressWorker = function(k) {
        return new S("Deflate", k);
      }, u.uncompressWorker = function() {
        return new S("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, h, u) {
      function n(c, w) {
        var l, m = "";
        for (l = 0; l < w; l++) m += String.fromCharCode(255 & c), c >>>= 8;
        return m;
      }
      function s(c, w, l, m, f, g) {
        var x, z, R = c.file, L = c.compression, P = g !== _.utf8encode, $ = i.transformTo("string", g(R.name)), O = i.transformTo("string", _.utf8encode(R.name)), H = R.comment, rt = i.transformTo("string", g(H)), b = i.transformTo("string", _.utf8encode(H)), F = O.length !== R.name.length, a = b.length !== H.length, N = "", at = "", W = "", lt = R.dir, V = R.date, tt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        w && !l || (tt.crc32 = c.crc32, tt.compressedSize = c.compressedSize, tt.uncompressedSize = c.uncompressedSize);
        var B = 0;
        w && (B |= 8), P || !F && !a || (B |= 2048);
        var I = 0, Q = 0;
        lt && (I |= 16), f === "UNIX" ? (Q = 798, I |= function(Y, wt) {
          var xt = Y;
          return Y || (xt = wt ? 16893 : 33204), (65535 & xt) << 16;
        }(R.unixPermissions, lt)) : (Q = 20, I |= function(Y) {
          return 63 & (Y || 0);
        }(R.dosPermissions)), x = V.getUTCHours(), x <<= 6, x |= V.getUTCMinutes(), x <<= 5, x |= V.getUTCSeconds() / 2, z = V.getUTCFullYear() - 1980, z <<= 4, z |= V.getUTCMonth() + 1, z <<= 5, z |= V.getUTCDate(), F && (at = n(1, 1) + n(S($), 4) + O, N += "up" + n(at.length, 2) + at), a && (W = n(1, 1) + n(S(rt), 4) + b, N += "uc" + n(W.length, 2) + W);
        var K = "";
        return K += `
\0`, K += n(B, 2), K += L.magic, K += n(x, 2), K += n(z, 2), K += n(tt.crc32, 4), K += n(tt.compressedSize, 4), K += n(tt.uncompressedSize, 4), K += n($.length, 2), K += n(N.length, 2), { fileRecord: k.LOCAL_FILE_HEADER + K + $ + N, dirRecord: k.CENTRAL_FILE_HEADER + n(Q, 2) + K + n(rt.length, 2) + "\0\0\0\0" + n(I, 4) + n(m, 4) + $ + N + rt };
      }
      var i = r("../utils"), d = r("../stream/GenericWorker"), _ = r("../utf8"), S = r("../crc32"), k = r("../signature");
      function y(c, w, l, m) {
        d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = l, this.encodeFileName = m, this.streamFiles = c, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      i.inherits(y, d), y.prototype.push = function(c) {
        var w = c.meta.percent || 0, l = this.entriesCount, m = this._sources.length;
        this.accumulate ? this.contentBuffer.push(c) : (this.bytesWritten += c.data.length, d.prototype.push.call(this, { data: c.data, meta: { currentFile: this.currentFile, percent: l ? (w + 100 * (l - m - 1)) / l : 100 } }));
      }, y.prototype.openedSource = function(c) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = c.file.name;
        var w = this.streamFiles && !c.file.dir;
        if (w) {
          var l = s(c, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: l.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, y.prototype.closedSource = function(c) {
        this.accumulate = !1;
        var w = this.streamFiles && !c.file.dir, l = s(c, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(l.dirRecord), w) this.push({ data: function(m) {
          return k.DATA_DESCRIPTOR + n(m.crc32, 4) + n(m.compressedSize, 4) + n(m.uncompressedSize, 4);
        }(c), meta: { percent: 100 } });
        else for (this.push({ data: l.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, y.prototype.flush = function() {
        for (var c = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({ data: this.dirRecords[w], meta: { percent: 100 } });
        var l = this.bytesWritten - c, m = function(f, g, x, z, R) {
          var L = i.transformTo("string", R(z));
          return k.CENTRAL_DIRECTORY_END + "\0\0\0\0" + n(f, 2) + n(f, 2) + n(g, 4) + n(x, 4) + n(L.length, 2) + L;
        }(this.dirRecords.length, l, c, this.zipComment, this.encodeFileName);
        this.push({ data: m, meta: { percent: 100 } });
      }, y.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, y.prototype.registerPrevious = function(c) {
        this._sources.push(c);
        var w = this;
        return c.on("data", function(l) {
          w.processChunk(l);
        }), c.on("end", function() {
          w.closedSource(w.previous.streamInfo), w._sources.length ? w.prepareNextSource() : w.end();
        }), c.on("error", function(l) {
          w.error(l);
        }), this;
      }, y.prototype.resume = function() {
        return !!d.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, y.prototype.error = function(c) {
        var w = this._sources;
        if (!d.prototype.error.call(this, c)) return !1;
        for (var l = 0; l < w.length; l++) try {
          w[l].error(c);
        } catch {
        }
        return !0;
      }, y.prototype.lock = function() {
        d.prototype.lock.call(this);
        for (var c = this._sources, w = 0; w < c.length; w++) c[w].lock();
      }, h.exports = y;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(r, h, u) {
      var n = r("../compressions"), s = r("./ZipFileWorker");
      u.generateWorker = function(i, d, _) {
        var S = new s(d.streamFiles, _, d.platform, d.encodeFileName), k = 0;
        try {
          i.forEach(function(y, c) {
            k++;
            var w = function(g, x) {
              var z = g || x, R = n[z];
              if (!R) throw new Error(z + " is not a valid compression method !");
              return R;
            }(c.options.compression, d.compression), l = c.options.compressionOptions || d.compressionOptions || {}, m = c.dir, f = c.date;
            c._compressWorker(w, l).withStreamInfo("file", { name: y, dir: m, date: f, comment: c.comment || "", unixPermissions: c.unixPermissions, dosPermissions: c.dosPermissions }).pipe(S);
          }), S.entriesCount = k;
        } catch (y) {
          S.error(y);
        }
        return S;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(r, h, u) {
      function n() {
        if (!(this instanceof n)) return new n();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var s = new n();
          for (var i in this) typeof this[i] != "function" && (s[i] = this[i]);
          return s;
        };
      }
      (n.prototype = r("./object")).loadAsync = r("./load"), n.support = r("./support"), n.defaults = r("./defaults"), n.version = "3.10.1", n.loadAsync = function(s, i) {
        return new n().loadAsync(s, i);
      }, n.external = r("./external"), h.exports = n;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(r, h, u) {
      var n = r("./utils"), s = r("./external"), i = r("./utf8"), d = r("./zipEntries"), _ = r("./stream/Crc32Probe"), S = r("./nodejsUtils");
      function k(y) {
        return new s.Promise(function(c, w) {
          var l = y.decompressed.getContentWorker().pipe(new _());
          l.on("error", function(m) {
            w(m);
          }).on("end", function() {
            l.streamInfo.crc32 !== y.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : c();
          }).resume();
        });
      }
      h.exports = function(y, c) {
        var w = this;
        return c = n.extend(c || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: i.utf8decode }), S.isNode && S.isStream(y) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", y, !0, c.optimizedBinaryString, c.base64).then(function(l) {
          var m = new d(c);
          return m.load(l), m;
        }).then(function(l) {
          var m = [s.Promise.resolve(l)], f = l.files;
          if (c.checkCRC32) for (var g = 0; g < f.length; g++) m.push(k(f[g]));
          return s.Promise.all(m);
        }).then(function(l) {
          for (var m = l.shift(), f = m.files, g = 0; g < f.length; g++) {
            var x = f[g], z = x.fileNameStr, R = n.resolve(x.fileNameStr);
            w.file(R, x.decompressed, { binary: !0, optimizedBinaryString: !0, date: x.date, dir: x.dir, comment: x.fileCommentStr.length ? x.fileCommentStr : null, unixPermissions: x.unixPermissions, dosPermissions: x.dosPermissions, createFolders: c.createFolders }), x.dir || (w.file(R).unsafeOriginalName = z);
          }
          return m.zipComment.length && (w.comment = m.zipComment), w;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(r, h, u) {
      var n = r("../utils"), s = r("../stream/GenericWorker");
      function i(d, _) {
        s.call(this, "Nodejs stream input adapter for " + d), this._upstreamEnded = !1, this._bindStream(_);
      }
      n.inherits(i, s), i.prototype._bindStream = function(d) {
        var _ = this;
        (this._stream = d).pause(), d.on("data", function(S) {
          _.push({ data: S, meta: { percent: 0 } });
        }).on("error", function(S) {
          _.isPaused ? this.generatedError = S : _.error(S);
        }).on("end", function() {
          _.isPaused ? _._upstreamEnded = !0 : _.end();
        });
      }, i.prototype.pause = function() {
        return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, i.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, h.exports = i;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(r, h, u) {
      var n = r("readable-stream").Readable;
      function s(i, d, _) {
        n.call(this, d), this._helper = i;
        var S = this;
        i.on("data", function(k, y) {
          S.push(k) || S._helper.pause(), _ && _(y);
        }).on("error", function(k) {
          S.emit("error", k);
        }).on("end", function() {
          S.push(null);
        });
      }
      r("../utils").inherits(s, n), s.prototype._read = function() {
        this._helper.resume();
      }, h.exports = s;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(r, h, u) {
      h.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(n, s) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(n, s);
        if (typeof n == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(n, s);
      }, allocBuffer: function(n) {
        if (Buffer.alloc) return Buffer.alloc(n);
        var s = new Buffer(n);
        return s.fill(0), s;
      }, isBuffer: function(n) {
        return Buffer.isBuffer(n);
      }, isStream: function(n) {
        return n && typeof n.on == "function" && typeof n.pause == "function" && typeof n.resume == "function";
      } };
    }, {}], 15: [function(r, h, u) {
      function n(R, L, P) {
        var $, O = i.getTypeOf(L), H = i.extend(P || {}, S);
        H.date = H.date || /* @__PURE__ */ new Date(), H.compression !== null && (H.compression = H.compression.toUpperCase()), typeof H.unixPermissions == "string" && (H.unixPermissions = parseInt(H.unixPermissions, 8)), H.unixPermissions && 16384 & H.unixPermissions && (H.dir = !0), H.dosPermissions && 16 & H.dosPermissions && (H.dir = !0), H.dir && (R = f(R)), H.createFolders && ($ = m(R)) && g.call(this, $, !0);
        var rt = O === "string" && H.binary === !1 && H.base64 === !1;
        P && P.binary !== void 0 || (H.binary = !rt), (L instanceof k && L.uncompressedSize === 0 || H.dir || !L || L.length === 0) && (H.base64 = !1, H.binary = !0, L = "", H.compression = "STORE", O = "string");
        var b = null;
        b = L instanceof k || L instanceof d ? L : w.isNode && w.isStream(L) ? new l(R, L) : i.prepareContent(R, L, H.binary, H.optimizedBinaryString, H.base64);
        var F = new y(R, b, H);
        this.files[R] = F;
      }
      var s = r("./utf8"), i = r("./utils"), d = r("./stream/GenericWorker"), _ = r("./stream/StreamHelper"), S = r("./defaults"), k = r("./compressedObject"), y = r("./zipObject"), c = r("./generate"), w = r("./nodejsUtils"), l = r("./nodejs/NodejsStreamInputAdapter"), m = function(R) {
        R.slice(-1) === "/" && (R = R.substring(0, R.length - 1));
        var L = R.lastIndexOf("/");
        return 0 < L ? R.substring(0, L) : "";
      }, f = function(R) {
        return R.slice(-1) !== "/" && (R += "/"), R;
      }, g = function(R, L) {
        return L = L !== void 0 ? L : S.createFolders, R = f(R), this.files[R] || n.call(this, R, null, { dir: !0, createFolders: L }), this.files[R];
      };
      function x(R) {
        return Object.prototype.toString.call(R) === "[object RegExp]";
      }
      var z = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(R) {
        var L, P, $;
        for (L in this.files) $ = this.files[L], (P = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && R(P, $);
      }, filter: function(R) {
        var L = [];
        return this.forEach(function(P, $) {
          R(P, $) && L.push($);
        }), L;
      }, file: function(R, L, P) {
        if (arguments.length !== 1) return R = this.root + R, n.call(this, R, L, P), this;
        if (x(R)) {
          var $ = R;
          return this.filter(function(H, rt) {
            return !rt.dir && $.test(H);
          });
        }
        var O = this.files[this.root + R];
        return O && !O.dir ? O : null;
      }, folder: function(R) {
        if (!R) return this;
        if (x(R)) return this.filter(function(O, H) {
          return H.dir && R.test(O);
        });
        var L = this.root + R, P = g.call(this, L), $ = this.clone();
        return $.root = P.name, $;
      }, remove: function(R) {
        R = this.root + R;
        var L = this.files[R];
        if (L || (R.slice(-1) !== "/" && (R += "/"), L = this.files[R]), L && !L.dir) delete this.files[R];
        else for (var P = this.filter(function(O, H) {
          return H.name.slice(0, R.length) === R;
        }), $ = 0; $ < P.length; $++) delete this.files[P[$].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(R) {
        var L, P = {};
        try {
          if ((P = i.extend(R || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = P.type.toLowerCase(), P.compression = P.compression.toUpperCase(), P.type === "binarystring" && (P.type = "string"), !P.type) throw new Error("No output type specified.");
          i.checkSupport(P.type), P.platform !== "darwin" && P.platform !== "freebsd" && P.platform !== "linux" && P.platform !== "sunos" || (P.platform = "UNIX"), P.platform === "win32" && (P.platform = "DOS");
          var $ = P.comment || this.comment || "";
          L = c.generateWorker(this, P, $);
        } catch (O) {
          (L = new d("error")).error(O);
        }
        return new _(L, P.type || "string", P.mimeType);
      }, generateAsync: function(R, L) {
        return this.generateInternalStream(R).accumulate(L);
      }, generateNodeStream: function(R, L) {
        return (R = R || {}).type || (R.type = "nodebuffer"), this.generateInternalStream(R).toNodejsStream(L);
      } };
      h.exports = z;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(r, h, u) {
      h.exports = r("stream");
    }, { stream: void 0 }], 17: [function(r, h, u) {
      var n = r("./DataReader");
      function s(i) {
        n.call(this, i);
        for (var d = 0; d < this.data.length; d++) i[d] = 255 & i[d];
      }
      r("../utils").inherits(s, n), s.prototype.byteAt = function(i) {
        return this.data[this.zero + i];
      }, s.prototype.lastIndexOfSignature = function(i) {
        for (var d = i.charCodeAt(0), _ = i.charCodeAt(1), S = i.charCodeAt(2), k = i.charCodeAt(3), y = this.length - 4; 0 <= y; --y) if (this.data[y] === d && this.data[y + 1] === _ && this.data[y + 2] === S && this.data[y + 3] === k) return y - this.zero;
        return -1;
      }, s.prototype.readAndCheckSignature = function(i) {
        var d = i.charCodeAt(0), _ = i.charCodeAt(1), S = i.charCodeAt(2), k = i.charCodeAt(3), y = this.readData(4);
        return d === y[0] && _ === y[1] && S === y[2] && k === y[3];
      }, s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return [];
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, d;
      }, h.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(r, h, u) {
      var n = r("../utils");
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
        var d, _ = 0;
        for (this.checkOffset(i), d = this.index + i - 1; d >= this.index; d--) _ = (_ << 8) + this.byteAt(d);
        return this.index += i, _;
      }, readString: function(i) {
        return n.transformTo("string", this.readData(i));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var i = this.readInt(4);
        return new Date(Date.UTC(1980 + (i >> 25 & 127), (i >> 21 & 15) - 1, i >> 16 & 31, i >> 11 & 31, i >> 5 & 63, (31 & i) << 1));
      } }, h.exports = s;
    }, { "../utils": 32 }], 19: [function(r, h, u) {
      var n = r("./Uint8ArrayReader");
      function s(i) {
        n.call(this, i);
      }
      r("../utils").inherits(s, n), s.prototype.readData = function(i) {
        this.checkOffset(i);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, d;
      }, h.exports = s;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(r, h, u) {
      var n = r("./DataReader");
      function s(i) {
        n.call(this, i);
      }
      r("../utils").inherits(s, n), s.prototype.byteAt = function(i) {
        return this.data.charCodeAt(this.zero + i);
      }, s.prototype.lastIndexOfSignature = function(i) {
        return this.data.lastIndexOf(i) - this.zero;
      }, s.prototype.readAndCheckSignature = function(i) {
        return i === this.readData(4);
      }, s.prototype.readData = function(i) {
        this.checkOffset(i);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, d;
      }, h.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(r, h, u) {
      var n = r("./ArrayReader");
      function s(i) {
        n.call(this, i);
      }
      r("../utils").inherits(s, n), s.prototype.readData = function(i) {
        if (this.checkOffset(i), i === 0) return new Uint8Array(0);
        var d = this.data.subarray(this.zero + this.index, this.zero + this.index + i);
        return this.index += i, d;
      }, h.exports = s;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(r, h, u) {
      var n = r("../utils"), s = r("../support"), i = r("./ArrayReader"), d = r("./StringReader"), _ = r("./NodeBufferReader"), S = r("./Uint8ArrayReader");
      h.exports = function(k) {
        var y = n.getTypeOf(k);
        return n.checkSupport(y), y !== "string" || s.uint8array ? y === "nodebuffer" ? new _(k) : s.uint8array ? new S(n.transformTo("uint8array", k)) : new i(n.transformTo("array", k)) : new d(k);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(r, h, u) {
      u.LOCAL_FILE_HEADER = "PK", u.CENTRAL_FILE_HEADER = "PK", u.CENTRAL_DIRECTORY_END = "PK", u.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", u.ZIP64_CENTRAL_DIRECTORY_END = "PK", u.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(r, h, u) {
      var n = r("./GenericWorker"), s = r("../utils");
      function i(d) {
        n.call(this, "ConvertWorker to " + d), this.destType = d;
      }
      s.inherits(i, n), i.prototype.processChunk = function(d) {
        this.push({ data: s.transformTo(this.destType, d.data), meta: d.meta });
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(r, h, u) {
      var n = r("./GenericWorker"), s = r("../crc32");
      function i() {
        n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      r("../utils").inherits(i, n), i.prototype.processChunk = function(d) {
        this.streamInfo.crc32 = s(d.data, this.streamInfo.crc32 || 0), this.push(d);
      }, h.exports = i;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(r, h, u) {
      var n = r("../utils"), s = r("./GenericWorker");
      function i(d) {
        s.call(this, "DataLengthProbe for " + d), this.propName = d, this.withStreamInfo(d, 0);
      }
      n.inherits(i, s), i.prototype.processChunk = function(d) {
        if (d) {
          var _ = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = _ + d.data.length;
        }
        s.prototype.processChunk.call(this, d);
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(r, h, u) {
      var n = r("../utils"), s = r("./GenericWorker");
      function i(d) {
        s.call(this, "DataWorker");
        var _ = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, d.then(function(S) {
          _.dataIsReady = !0, _.data = S, _.max = S && S.length || 0, _.type = n.getTypeOf(S), _.isPaused || _._tickAndRepeat();
        }, function(S) {
          _.error(S);
        });
      }
      n.inherits(i, s), i.prototype.cleanUp = function() {
        s.prototype.cleanUp.call(this), this.data = null;
      }, i.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0);
      }, i.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, i.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var d = null, _ = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            d = this.data.substring(this.index, _);
            break;
          case "uint8array":
            d = this.data.subarray(this.index, _);
            break;
          case "array":
          case "nodebuffer":
            d = this.data.slice(this.index, _);
        }
        return this.index = _, this.push({ data: d, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, h.exports = i;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(r, h, u) {
      function n(s) {
        this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      n.prototype = { push: function(s) {
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
        if (this._listeners[s]) for (var d = 0; d < this._listeners[s].length; d++) this._listeners[s][d].call(this, i);
      }, pipe: function(s) {
        return s.registerPrevious(this);
      }, registerPrevious: function(s) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
        var i = this;
        return s.on("data", function(d) {
          i.processChunk(d);
        }), s.on("end", function() {
          i.end();
        }), s.on("error", function(d) {
          i.error(d);
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
      } }, h.exports = n;
    }, {}], 29: [function(r, h, u) {
      var n = r("../utils"), s = r("./ConvertWorker"), i = r("./GenericWorker"), d = r("../base64"), _ = r("../support"), S = r("../external"), k = null;
      if (_.nodestream) try {
        k = r("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function y(w, l) {
        return new S.Promise(function(m, f) {
          var g = [], x = w._internalType, z = w._outputType, R = w._mimeType;
          w.on("data", function(L, P) {
            g.push(L), l && l(P);
          }).on("error", function(L) {
            g = [], f(L);
          }).on("end", function() {
            try {
              var L = function(P, $, O) {
                switch (P) {
                  case "blob":
                    return n.newBlob(n.transformTo("arraybuffer", $), O);
                  case "base64":
                    return d.encode($);
                  default:
                    return n.transformTo(P, $);
                }
              }(z, function(P, $) {
                var O, H = 0, rt = null, b = 0;
                for (O = 0; O < $.length; O++) b += $[O].length;
                switch (P) {
                  case "string":
                    return $.join("");
                  case "array":
                    return Array.prototype.concat.apply([], $);
                  case "uint8array":
                    for (rt = new Uint8Array(b), O = 0; O < $.length; O++) rt.set($[O], H), H += $[O].length;
                    return rt;
                  case "nodebuffer":
                    return Buffer.concat($);
                  default:
                    throw new Error("concat : unsupported type '" + P + "'");
                }
              }(x, g), R);
              m(L);
            } catch (P) {
              f(P);
            }
            g = [];
          }).resume();
        });
      }
      function c(w, l, m) {
        var f = l;
        switch (l) {
          case "blob":
          case "arraybuffer":
            f = "uint8array";
            break;
          case "base64":
            f = "string";
        }
        try {
          this._internalType = f, this._outputType = l, this._mimeType = m, n.checkSupport(f), this._worker = w.pipe(new s(f)), w.lock();
        } catch (g) {
          this._worker = new i("error"), this._worker.error(g);
        }
      }
      c.prototype = { accumulate: function(w) {
        return y(this, w);
      }, on: function(w, l) {
        var m = this;
        return w === "data" ? this._worker.on(w, function(f) {
          l.call(m, f.data, f.meta);
        }) : this._worker.on(w, function() {
          n.delay(l, arguments, m);
        }), this;
      }, resume: function() {
        return n.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(w) {
        if (n.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new k(this, { objectMode: this._outputType !== "nodebuffer" }, w);
      } }, h.exports = c;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(r, h, u) {
      if (u.base64 = !0, u.array = !0, u.string = !0, u.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", u.nodebuffer = typeof Buffer < "u", u.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") u.blob = !1;
      else {
        var n = new ArrayBuffer(0);
        try {
          u.blob = new Blob([n], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            s.append(n), u.blob = s.getBlob("application/zip").size === 0;
          } catch {
            u.blob = !1;
          }
        }
      }
      try {
        u.nodestream = !!r("readable-stream").Readable;
      } catch {
        u.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(r, h, u) {
      for (var n = r("./utils"), s = r("./support"), i = r("./nodejsUtils"), d = r("./stream/GenericWorker"), _ = new Array(256), S = 0; S < 256; S++) _[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
      _[254] = _[254] = 1;
      function k() {
        d.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function y() {
        d.call(this, "utf-8 encode");
      }
      u.utf8encode = function(c) {
        return s.nodebuffer ? i.newBufferFrom(c, "utf-8") : function(w) {
          var l, m, f, g, x, z = w.length, R = 0;
          for (g = 0; g < z; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < z && (64512 & (f = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), g++), R += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (l = s.uint8array ? new Uint8Array(R) : new Array(R), g = x = 0; x < R; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < z && (64512 & (f = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), g++), m < 128 ? l[x++] = m : (m < 2048 ? l[x++] = 192 | m >>> 6 : (m < 65536 ? l[x++] = 224 | m >>> 12 : (l[x++] = 240 | m >>> 18, l[x++] = 128 | m >>> 12 & 63), l[x++] = 128 | m >>> 6 & 63), l[x++] = 128 | 63 & m);
          return l;
        }(c);
      }, u.utf8decode = function(c) {
        return s.nodebuffer ? n.transformTo("nodebuffer", c).toString("utf-8") : function(w) {
          var l, m, f, g, x = w.length, z = new Array(2 * x);
          for (l = m = 0; l < x; ) if ((f = w[l++]) < 128) z[m++] = f;
          else if (4 < (g = _[f])) z[m++] = 65533, l += g - 1;
          else {
            for (f &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && l < x; ) f = f << 6 | 63 & w[l++], g--;
            1 < g ? z[m++] = 65533 : f < 65536 ? z[m++] = f : (f -= 65536, z[m++] = 55296 | f >> 10 & 1023, z[m++] = 56320 | 1023 & f);
          }
          return z.length !== m && (z.subarray ? z = z.subarray(0, m) : z.length = m), n.applyFromCharCode(z);
        }(c = n.transformTo(s.uint8array ? "uint8array" : "array", c));
      }, n.inherits(k, d), k.prototype.processChunk = function(c) {
        var w = n.transformTo(s.uint8array ? "uint8array" : "array", c.data);
        if (this.leftOver && this.leftOver.length) {
          if (s.uint8array) {
            var l = w;
            (w = new Uint8Array(l.length + this.leftOver.length)).set(this.leftOver, 0), w.set(l, this.leftOver.length);
          } else w = this.leftOver.concat(w);
          this.leftOver = null;
        }
        var m = function(g, x) {
          var z;
          for ((x = x || g.length) > g.length && (x = g.length), z = x - 1; 0 <= z && (192 & g[z]) == 128; ) z--;
          return z < 0 || z === 0 ? x : z + _[g[z]] > x ? z : x;
        }(w), f = w;
        m !== w.length && (s.uint8array ? (f = w.subarray(0, m), this.leftOver = w.subarray(m, w.length)) : (f = w.slice(0, m), this.leftOver = w.slice(m, w.length))), this.push({ data: u.utf8decode(f), meta: c.meta });
      }, k.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: u.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, u.Utf8DecodeWorker = k, n.inherits(y, d), y.prototype.processChunk = function(c) {
        this.push({ data: u.utf8encode(c.data), meta: c.meta });
      }, u.Utf8EncodeWorker = y;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, h, u) {
      var n = r("./support"), s = r("./base64"), i = r("./nodejsUtils"), d = r("./external");
      function _(l) {
        return l;
      }
      function S(l, m) {
        for (var f = 0; f < l.length; ++f) m[f] = 255 & l.charCodeAt(f);
        return m;
      }
      r("setimmediate"), u.newBlob = function(l, m) {
        u.checkSupport("blob");
        try {
          return new Blob([l], { type: m });
        } catch {
          try {
            var f = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return f.append(l), f.getBlob(m);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var k = { stringifyByChunk: function(l, m, f) {
        var g = [], x = 0, z = l.length;
        if (z <= f) return String.fromCharCode.apply(null, l);
        for (; x < z; ) m === "array" || m === "nodebuffer" ? g.push(String.fromCharCode.apply(null, l.slice(x, Math.min(x + f, z)))) : g.push(String.fromCharCode.apply(null, l.subarray(x, Math.min(x + f, z)))), x += f;
        return g.join("");
      }, stringifyByChar: function(l) {
        for (var m = "", f = 0; f < l.length; f++) m += String.fromCharCode(l[f]);
        return m;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return n.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return n.nodebuffer && String.fromCharCode.apply(null, i.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function y(l) {
        var m = 65536, f = u.getTypeOf(l), g = !0;
        if (f === "uint8array" ? g = k.applyCanBeUsed.uint8array : f === "nodebuffer" && (g = k.applyCanBeUsed.nodebuffer), g) for (; 1 < m; ) try {
          return k.stringifyByChunk(l, f, m);
        } catch {
          m = Math.floor(m / 2);
        }
        return k.stringifyByChar(l);
      }
      function c(l, m) {
        for (var f = 0; f < l.length; f++) m[f] = l[f];
        return m;
      }
      u.applyFromCharCode = y;
      var w = {};
      w.string = { string: _, array: function(l) {
        return S(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return w.string.uint8array(l).buffer;
      }, uint8array: function(l) {
        return S(l, new Uint8Array(l.length));
      }, nodebuffer: function(l) {
        return S(l, i.allocBuffer(l.length));
      } }, w.array = { string: y, array: _, arraybuffer: function(l) {
        return new Uint8Array(l).buffer;
      }, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return i.newBufferFrom(l);
      } }, w.arraybuffer = { string: function(l) {
        return y(new Uint8Array(l));
      }, array: function(l) {
        return c(new Uint8Array(l), new Array(l.byteLength));
      }, arraybuffer: _, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return i.newBufferFrom(new Uint8Array(l));
      } }, w.uint8array = { string: y, array: function(l) {
        return c(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return l.buffer;
      }, uint8array: _, nodebuffer: function(l) {
        return i.newBufferFrom(l);
      } }, w.nodebuffer = { string: y, array: function(l) {
        return c(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return w.nodebuffer.uint8array(l).buffer;
      }, uint8array: function(l) {
        return c(l, new Uint8Array(l.length));
      }, nodebuffer: _ }, u.transformTo = function(l, m) {
        if (m = m || "", !l) return m;
        u.checkSupport(l);
        var f = u.getTypeOf(m);
        return w[f][l](m);
      }, u.resolve = function(l) {
        for (var m = l.split("/"), f = [], g = 0; g < m.length; g++) {
          var x = m[g];
          x === "." || x === "" && g !== 0 && g !== m.length - 1 || (x === ".." ? f.pop() : f.push(x));
        }
        return f.join("/");
      }, u.getTypeOf = function(l) {
        return typeof l == "string" ? "string" : Object.prototype.toString.call(l) === "[object Array]" ? "array" : n.nodebuffer && i.isBuffer(l) ? "nodebuffer" : n.uint8array && l instanceof Uint8Array ? "uint8array" : n.arraybuffer && l instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, u.checkSupport = function(l) {
        if (!n[l.toLowerCase()]) throw new Error(l + " is not supported by this platform");
      }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(l) {
        var m, f, g = "";
        for (f = 0; f < (l || "").length; f++) g += "\\x" + ((m = l.charCodeAt(f)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
        return g;
      }, u.delay = function(l, m, f) {
        setImmediate(function() {
          l.apply(f || null, m || []);
        });
      }, u.inherits = function(l, m) {
        function f() {
        }
        f.prototype = m.prototype, l.prototype = new f();
      }, u.extend = function() {
        var l, m, f = {};
        for (l = 0; l < arguments.length; l++) for (m in arguments[l]) Object.prototype.hasOwnProperty.call(arguments[l], m) && f[m] === void 0 && (f[m] = arguments[l][m]);
        return f;
      }, u.prepareContent = function(l, m, f, g, x) {
        return d.Promise.resolve(m).then(function(z) {
          return n.blob && (z instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(z)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(R, L) {
            var P = new FileReader();
            P.onload = function($) {
              R($.target.result);
            }, P.onerror = function($) {
              L($.target.error);
            }, P.readAsArrayBuffer(z);
          }) : z;
        }).then(function(z) {
          var R = u.getTypeOf(z);
          return R ? (R === "arraybuffer" ? z = u.transformTo("uint8array", z) : R === "string" && (x ? z = s.decode(z) : f && g !== !0 && (z = function(L) {
            return S(L, n.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(z))), z) : d.Promise.reject(new Error("Can't read the data of '" + l + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, h, u) {
      var n = r("./reader/readerFor"), s = r("./utils"), i = r("./signature"), d = r("./zipEntry"), _ = r("./support");
      function S(k) {
        this.files = [], this.loadOptions = k;
      }
      S.prototype = { checkSignature: function(k) {
        if (!this.reader.readAndCheckSignature(k)) {
          this.reader.index -= 4;
          var y = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(y) + ", expected " + s.pretty(k) + ")");
        }
      }, isSignature: function(k, y) {
        var c = this.reader.index;
        this.reader.setIndex(k);
        var w = this.reader.readString(4) === y;
        return this.reader.setIndex(c), w;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var k = this.reader.readData(this.zipCommentLength), y = _.uint8array ? "uint8array" : "array", c = s.transformTo(y, k);
        this.zipComment = this.loadOptions.decodeFileName(c);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var k, y, c, w = this.zip64EndOfCentralSize - 44; 0 < w; ) k = this.reader.readInt(2), y = this.reader.readInt(4), c = this.reader.readData(y), this.zip64ExtensibleData[k] = { id: k, length: y, value: c };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var k, y;
        for (k = 0; k < this.files.length; k++) y = this.files[k], this.reader.setIndex(y.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), y.readLocalPart(this.reader), y.handleUTF8(), y.processAttributes();
      }, readCentralDir: function() {
        var k;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(i.CENTRAL_FILE_HEADER); ) (k = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(k);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var k = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
        if (k < 0) throw this.isSignature(0, i.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(k);
        var y = k;
        if (this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (k = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(k), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, i.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var c = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (c += 20, c += 12 + this.zip64EndOfCentralSize);
        var w = y - c;
        if (0 < w) this.isSignature(y, i.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
        else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
      }, prepareReader: function(k) {
        this.reader = n(k);
      }, load: function(k) {
        this.prepareReader(k), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, h.exports = S;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, h, u) {
      var n = r("./reader/readerFor"), s = r("./utils"), i = r("./compressedObject"), d = r("./crc32"), _ = r("./utf8"), S = r("./compressions"), k = r("./support");
      function y(c, w) {
        this.options = c, this.loadOptions = w;
      }
      y.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(c) {
        var w, l;
        if (c.skip(22), this.fileNameLength = c.readInt(2), l = c.readInt(2), this.fileName = c.readData(this.fileNameLength), c.skip(l), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((w = function(m) {
          for (var f in S) if (Object.prototype.hasOwnProperty.call(S, f) && S[f].magic === m) return S[f];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, w, c.readData(this.compressedSize));
      }, readCentralPart: function(c) {
        this.versionMadeBy = c.readInt(2), c.skip(2), this.bitFlag = c.readInt(2), this.compressionMethod = c.readString(2), this.date = c.readDate(), this.crc32 = c.readInt(4), this.compressedSize = c.readInt(4), this.uncompressedSize = c.readInt(4);
        var w = c.readInt(2);
        if (this.extraFieldsLength = c.readInt(2), this.fileCommentLength = c.readInt(2), this.diskNumberStart = c.readInt(2), this.internalFileAttributes = c.readInt(2), this.externalFileAttributes = c.readInt(4), this.localHeaderOffset = c.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        c.skip(w), this.readExtraFields(c), this.parseZIP64ExtraField(c), this.fileComment = c.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var c = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), c == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), c == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var c = n(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = c.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = c.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = c.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = c.readInt(4));
        }
      }, readExtraFields: function(c) {
        var w, l, m, f = c.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); c.index + 4 < f; ) w = c.readInt(2), l = c.readInt(2), m = c.readData(l), this.extraFields[w] = { id: w, length: l, value: m };
        c.setIndex(f);
      }, handleUTF8: function() {
        var c = k.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = _.utf8decode(this.fileName), this.fileCommentStr = _.utf8decode(this.fileComment);
        else {
          var w = this.findExtraFieldUnicodePath();
          if (w !== null) this.fileNameStr = w;
          else {
            var l = s.transformTo(c, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(l);
          }
          var m = this.findExtraFieldUnicodeComment();
          if (m !== null) this.fileCommentStr = m;
          else {
            var f = s.transformTo(c, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(f);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var c = this.extraFields[28789];
        if (c) {
          var w = n(c.value);
          return w.readInt(1) !== 1 || d(this.fileName) !== w.readInt(4) ? null : _.utf8decode(w.readData(c.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var c = this.extraFields[25461];
        if (c) {
          var w = n(c.value);
          return w.readInt(1) !== 1 || d(this.fileComment) !== w.readInt(4) ? null : _.utf8decode(w.readData(c.length - 5));
        }
        return null;
      } }, h.exports = y;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(r, h, u) {
      function n(w, l, m) {
        this.name = w, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = l, this._dataBinary = m.binary, this.options = { compression: m.compression, compressionOptions: m.compressionOptions };
      }
      var s = r("./stream/StreamHelper"), i = r("./stream/DataWorker"), d = r("./utf8"), _ = r("./compressedObject"), S = r("./stream/GenericWorker");
      n.prototype = { internalStream: function(w) {
        var l = null, m = "string";
        try {
          if (!w) throw new Error("No output type specified.");
          var f = (m = w.toLowerCase()) === "string" || m === "text";
          m !== "binarystring" && m !== "text" || (m = "string"), l = this._decompressWorker();
          var g = !this._dataBinary;
          g && !f && (l = l.pipe(new d.Utf8EncodeWorker())), !g && f && (l = l.pipe(new d.Utf8DecodeWorker()));
        } catch (x) {
          (l = new S("error")).error(x);
        }
        return new s(l, m, "");
      }, async: function(w, l) {
        return this.internalStream(w).accumulate(l);
      }, nodeStream: function(w, l) {
        return this.internalStream(w || "nodebuffer").toNodejsStream(l);
      }, _compressWorker: function(w, l) {
        if (this._data instanceof _ && this._data.compression.magic === w.magic) return this._data.getCompressedWorker();
        var m = this._decompressWorker();
        return this._dataBinary || (m = m.pipe(new d.Utf8EncodeWorker())), _.createWorkerFrom(m, w, l);
      }, _decompressWorker: function() {
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof S ? this._data : new i(this._data);
      } };
      for (var k = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], y = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, c = 0; c < k.length; c++) n.prototype[k[c]] = y;
      h.exports = n;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, h, u) {
      (function(n) {
        var s, i, d = n.MutationObserver || n.WebKitMutationObserver;
        if (d) {
          var _ = 0, S = new d(w), k = n.document.createTextNode("");
          S.observe(k, { characterData: !0 }), s = function() {
            k.data = _ = ++_ % 2;
          };
        } else if (n.setImmediate || n.MessageChannel === void 0) s = "document" in n && "onreadystatechange" in n.document.createElement("script") ? function() {
          var l = n.document.createElement("script");
          l.onreadystatechange = function() {
            w(), l.onreadystatechange = null, l.parentNode.removeChild(l), l = null;
          }, n.document.documentElement.appendChild(l);
        } : function() {
          setTimeout(w, 0);
        };
        else {
          var y = new n.MessageChannel();
          y.port1.onmessage = w, s = function() {
            y.port2.postMessage(0);
          };
        }
        var c = [];
        function w() {
          var l, m;
          i = !0;
          for (var f = c.length; f; ) {
            for (m = c, c = [], l = -1; ++l < f; ) m[l]();
            f = c.length;
          }
          i = !1;
        }
        h.exports = function(l) {
          c.push(l) !== 1 || i || s();
        };
      }).call(this, typeof ce < "u" ? ce : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(r, h, u) {
      var n = r("immediate");
      function s() {
      }
      var i = {}, d = ["REJECTED"], _ = ["FULFILLED"], S = ["PENDING"];
      function k(f) {
        if (typeof f != "function") throw new TypeError("resolver must be a function");
        this.state = S, this.queue = [], this.outcome = void 0, f !== s && l(this, f);
      }
      function y(f, g, x) {
        this.promise = f, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
      }
      function c(f, g, x) {
        n(function() {
          var z;
          try {
            z = g(x);
          } catch (R) {
            return i.reject(f, R);
          }
          z === f ? i.reject(f, new TypeError("Cannot resolve promise with itself")) : i.resolve(f, z);
        });
      }
      function w(f) {
        var g = f && f.then;
        if (f && (typeof f == "object" || typeof f == "function") && typeof g == "function") return function() {
          g.apply(f, arguments);
        };
      }
      function l(f, g) {
        var x = !1;
        function z(P) {
          x || (x = !0, i.reject(f, P));
        }
        function R(P) {
          x || (x = !0, i.resolve(f, P));
        }
        var L = m(function() {
          g(R, z);
        });
        L.status === "error" && z(L.value);
      }
      function m(f, g) {
        var x = {};
        try {
          x.value = f(g), x.status = "success";
        } catch (z) {
          x.status = "error", x.value = z;
        }
        return x;
      }
      (h.exports = k).prototype.finally = function(f) {
        if (typeof f != "function") return this;
        var g = this.constructor;
        return this.then(function(x) {
          return g.resolve(f()).then(function() {
            return x;
          });
        }, function(x) {
          return g.resolve(f()).then(function() {
            throw x;
          });
        });
      }, k.prototype.catch = function(f) {
        return this.then(null, f);
      }, k.prototype.then = function(f, g) {
        if (typeof f != "function" && this.state === _ || typeof g != "function" && this.state === d) return this;
        var x = new this.constructor(s);
        return this.state !== S ? c(x, this.state === _ ? f : g, this.outcome) : this.queue.push(new y(x, f, g)), x;
      }, y.prototype.callFulfilled = function(f) {
        i.resolve(this.promise, f);
      }, y.prototype.otherCallFulfilled = function(f) {
        c(this.promise, this.onFulfilled, f);
      }, y.prototype.callRejected = function(f) {
        i.reject(this.promise, f);
      }, y.prototype.otherCallRejected = function(f) {
        c(this.promise, this.onRejected, f);
      }, i.resolve = function(f, g) {
        var x = m(w, g);
        if (x.status === "error") return i.reject(f, x.value);
        var z = x.value;
        if (z) l(f, z);
        else {
          f.state = _, f.outcome = g;
          for (var R = -1, L = f.queue.length; ++R < L; ) f.queue[R].callFulfilled(g);
        }
        return f;
      }, i.reject = function(f, g) {
        f.state = d, f.outcome = g;
        for (var x = -1, z = f.queue.length; ++x < z; ) f.queue[x].callRejected(g);
        return f;
      }, k.resolve = function(f) {
        return f instanceof this ? f : i.resolve(new this(s), f);
      }, k.reject = function(f) {
        var g = new this(s);
        return i.reject(g, f);
      }, k.all = function(f) {
        var g = this;
        if (Object.prototype.toString.call(f) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = f.length, z = !1;
        if (!x) return this.resolve([]);
        for (var R = new Array(x), L = 0, P = -1, $ = new this(s); ++P < x; ) O(f[P], P);
        return $;
        function O(H, rt) {
          g.resolve(H).then(function(b) {
            R[rt] = b, ++L !== x || z || (z = !0, i.resolve($, R));
          }, function(b) {
            z || (z = !0, i.reject($, b));
          });
        }
      }, k.race = function(f) {
        var g = this;
        if (Object.prototype.toString.call(f) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = f.length, z = !1;
        if (!x) return this.resolve([]);
        for (var R = -1, L = new this(s); ++R < x; ) P = f[R], g.resolve(P).then(function($) {
          z || (z = !0, i.resolve(L, $));
        }, function($) {
          z || (z = !0, i.reject(L, $));
        });
        var P;
        return L;
      };
    }, { immediate: 36 }], 38: [function(r, h, u) {
      var n = {};
      (0, r("./lib/utils/common").assign)(n, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), h.exports = n;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, h, u) {
      var n = r("./zlib/deflate"), s = r("./utils/common"), i = r("./utils/strings"), d = r("./zlib/messages"), _ = r("./zlib/zstream"), S = Object.prototype.toString, k = 0, y = -1, c = 0, w = 8;
      function l(f) {
        if (!(this instanceof l)) return new l(f);
        this.options = s.assign({ level: y, method: w, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, f || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var x = n.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (x !== k) throw new Error(d[x]);
        if (g.header && n.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var z;
          if (z = typeof g.dictionary == "string" ? i.string2buf(g.dictionary) : S.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (x = n.deflateSetDictionary(this.strm, z)) !== k) throw new Error(d[x]);
          this._dict_set = !0;
        }
      }
      function m(f, g) {
        var x = new l(g);
        if (x.push(f, !0), x.err) throw x.msg || d[x.err];
        return x.result;
      }
      l.prototype.push = function(f, g) {
        var x, z, R = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        z = g === ~~g ? g : g === !0 ? 4 : 0, typeof f == "string" ? R.input = i.string2buf(f) : S.call(f) === "[object ArrayBuffer]" ? R.input = new Uint8Array(f) : R.input = f, R.next_in = 0, R.avail_in = R.input.length;
        do {
          if (R.avail_out === 0 && (R.output = new s.Buf8(L), R.next_out = 0, R.avail_out = L), (x = n.deflate(R, z)) !== 1 && x !== k) return this.onEnd(x), !(this.ended = !0);
          R.avail_out !== 0 && (R.avail_in !== 0 || z !== 4 && z !== 2) || (this.options.to === "string" ? this.onData(i.buf2binstring(s.shrinkBuf(R.output, R.next_out))) : this.onData(s.shrinkBuf(R.output, R.next_out)));
        } while ((0 < R.avail_in || R.avail_out === 0) && x !== 1);
        return z === 4 ? (x = n.deflateEnd(this.strm), this.onEnd(x), this.ended = !0, x === k) : z !== 2 || (this.onEnd(k), !(R.avail_out = 0));
      }, l.prototype.onData = function(f) {
        this.chunks.push(f);
      }, l.prototype.onEnd = function(f) {
        f === k && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = f, this.msg = this.strm.msg;
      }, u.Deflate = l, u.deflate = m, u.deflateRaw = function(f, g) {
        return (g = g || {}).raw = !0, m(f, g);
      }, u.gzip = function(f, g) {
        return (g = g || {}).gzip = !0, m(f, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, h, u) {
      var n = r("./zlib/inflate"), s = r("./utils/common"), i = r("./utils/strings"), d = r("./zlib/constants"), _ = r("./zlib/messages"), S = r("./zlib/zstream"), k = r("./zlib/gzheader"), y = Object.prototype.toString;
      function c(l) {
        if (!(this instanceof c)) return new c(l);
        this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, l || {});
        var m = this.options;
        m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), !(0 <= m.windowBits && m.windowBits < 16) || l && l.windowBits || (m.windowBits += 32), 15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
        var f = n.inflateInit2(this.strm, m.windowBits);
        if (f !== d.Z_OK) throw new Error(_[f]);
        this.header = new k(), n.inflateGetHeader(this.strm, this.header);
      }
      function w(l, m) {
        var f = new c(m);
        if (f.push(l, !0), f.err) throw f.msg || _[f.err];
        return f.result;
      }
      c.prototype.push = function(l, m) {
        var f, g, x, z, R, L, P = this.strm, $ = this.options.chunkSize, O = this.options.dictionary, H = !1;
        if (this.ended) return !1;
        g = m === ~~m ? m : m === !0 ? d.Z_FINISH : d.Z_NO_FLUSH, typeof l == "string" ? P.input = i.binstring2buf(l) : y.call(l) === "[object ArrayBuffer]" ? P.input = new Uint8Array(l) : P.input = l, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new s.Buf8($), P.next_out = 0, P.avail_out = $), (f = n.inflate(P, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && O && (L = typeof O == "string" ? i.string2buf(O) : y.call(O) === "[object ArrayBuffer]" ? new Uint8Array(O) : O, f = n.inflateSetDictionary(this.strm, L)), f === d.Z_BUF_ERROR && H === !0 && (f = d.Z_OK, H = !1), f !== d.Z_STREAM_END && f !== d.Z_OK) return this.onEnd(f), !(this.ended = !0);
          P.next_out && (P.avail_out !== 0 && f !== d.Z_STREAM_END && (P.avail_in !== 0 || g !== d.Z_FINISH && g !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = i.utf8border(P.output, P.next_out), z = P.next_out - x, R = i.buf2string(P.output, x), P.next_out = z, P.avail_out = $ - z, z && s.arraySet(P.output, P.output, x, z, 0), this.onData(R)) : this.onData(s.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (H = !0);
        } while ((0 < P.avail_in || P.avail_out === 0) && f !== d.Z_STREAM_END);
        return f === d.Z_STREAM_END && (g = d.Z_FINISH), g === d.Z_FINISH ? (f = n.inflateEnd(this.strm), this.onEnd(f), this.ended = !0, f === d.Z_OK) : g !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(P.avail_out = 0));
      }, c.prototype.onData = function(l) {
        this.chunks.push(l);
      }, c.prototype.onEnd = function(l) {
        l === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = l, this.msg = this.strm.msg;
      }, u.Inflate = c, u.inflate = w, u.inflateRaw = function(l, m) {
        return (m = m || {}).raw = !0, w(l, m);
      }, u.ungzip = w;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, h, u) {
      var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      u.assign = function(d) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var S = _.shift();
          if (S) {
            if (typeof S != "object") throw new TypeError(S + "must be non-object");
            for (var k in S) S.hasOwnProperty(k) && (d[k] = S[k]);
          }
        }
        return d;
      }, u.shrinkBuf = function(d, _) {
        return d.length === _ ? d : d.subarray ? d.subarray(0, _) : (d.length = _, d);
      };
      var s = { arraySet: function(d, _, S, k, y) {
        if (_.subarray && d.subarray) d.set(_.subarray(S, S + k), y);
        else for (var c = 0; c < k; c++) d[y + c] = _[S + c];
      }, flattenChunks: function(d) {
        var _, S, k, y, c, w;
        for (_ = k = 0, S = d.length; _ < S; _++) k += d[_].length;
        for (w = new Uint8Array(k), _ = y = 0, S = d.length; _ < S; _++) c = d[_], w.set(c, y), y += c.length;
        return w;
      } }, i = { arraySet: function(d, _, S, k, y) {
        for (var c = 0; c < k; c++) d[y + c] = _[S + c];
      }, flattenChunks: function(d) {
        return [].concat.apply([], d);
      } };
      u.setTyped = function(d) {
        d ? (u.Buf8 = Uint8Array, u.Buf16 = Uint16Array, u.Buf32 = Int32Array, u.assign(u, s)) : (u.Buf8 = Array, u.Buf16 = Array, u.Buf32 = Array, u.assign(u, i));
      }, u.setTyped(n);
    }, {}], 42: [function(r, h, u) {
      var n = r("./common"), s = !0, i = !0;
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
      for (var d = new n.Buf8(256), _ = 0; _ < 256; _++) d[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
      function S(k, y) {
        if (y < 65537 && (k.subarray && i || !k.subarray && s)) return String.fromCharCode.apply(null, n.shrinkBuf(k, y));
        for (var c = "", w = 0; w < y; w++) c += String.fromCharCode(k[w]);
        return c;
      }
      d[254] = d[254] = 1, u.string2buf = function(k) {
        var y, c, w, l, m, f = k.length, g = 0;
        for (l = 0; l < f; l++) (64512 & (c = k.charCodeAt(l))) == 55296 && l + 1 < f && (64512 & (w = k.charCodeAt(l + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), l++), g += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        for (y = new n.Buf8(g), l = m = 0; m < g; l++) (64512 & (c = k.charCodeAt(l))) == 55296 && l + 1 < f && (64512 & (w = k.charCodeAt(l + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), l++), c < 128 ? y[m++] = c : (c < 2048 ? y[m++] = 192 | c >>> 6 : (c < 65536 ? y[m++] = 224 | c >>> 12 : (y[m++] = 240 | c >>> 18, y[m++] = 128 | c >>> 12 & 63), y[m++] = 128 | c >>> 6 & 63), y[m++] = 128 | 63 & c);
        return y;
      }, u.buf2binstring = function(k) {
        return S(k, k.length);
      }, u.binstring2buf = function(k) {
        for (var y = new n.Buf8(k.length), c = 0, w = y.length; c < w; c++) y[c] = k.charCodeAt(c);
        return y;
      }, u.buf2string = function(k, y) {
        var c, w, l, m, f = y || k.length, g = new Array(2 * f);
        for (c = w = 0; c < f; ) if ((l = k[c++]) < 128) g[w++] = l;
        else if (4 < (m = d[l])) g[w++] = 65533, c += m - 1;
        else {
          for (l &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && c < f; ) l = l << 6 | 63 & k[c++], m--;
          1 < m ? g[w++] = 65533 : l < 65536 ? g[w++] = l : (l -= 65536, g[w++] = 55296 | l >> 10 & 1023, g[w++] = 56320 | 1023 & l);
        }
        return S(g, w);
      }, u.utf8border = function(k, y) {
        var c;
        for ((y = y || k.length) > k.length && (y = k.length), c = y - 1; 0 <= c && (192 & k[c]) == 128; ) c--;
        return c < 0 || c === 0 ? y : c + d[k[c]] > y ? c : y;
      };
    }, { "./common": 41 }], 43: [function(r, h, u) {
      h.exports = function(n, s, i, d) {
        for (var _ = 65535 & n | 0, S = n >>> 16 & 65535 | 0, k = 0; i !== 0; ) {
          for (i -= k = 2e3 < i ? 2e3 : i; S = S + (_ = _ + s[d++] | 0) | 0, --k; ) ;
          _ %= 65521, S %= 65521;
        }
        return _ | S << 16 | 0;
      };
    }, {}], 44: [function(r, h, u) {
      h.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(r, h, u) {
      var n = function() {
        for (var s, i = [], d = 0; d < 256; d++) {
          s = d;
          for (var _ = 0; _ < 8; _++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
          i[d] = s;
        }
        return i;
      }();
      h.exports = function(s, i, d, _) {
        var S = n, k = _ + d;
        s ^= -1;
        for (var y = _; y < k; y++) s = s >>> 8 ^ S[255 & (s ^ i[y])];
        return -1 ^ s;
      };
    }, {}], 46: [function(r, h, u) {
      var n, s = r("../utils/common"), i = r("./trees"), d = r("./adler32"), _ = r("./crc32"), S = r("./messages"), k = 0, y = 4, c = 0, w = -2, l = -1, m = 4, f = 2, g = 8, x = 9, z = 286, R = 30, L = 19, P = 2 * z + 1, $ = 15, O = 3, H = 258, rt = H + O + 1, b = 42, F = 113, a = 1, N = 2, at = 3, W = 4;
      function lt(t, U) {
        return t.msg = S[U], U;
      }
      function V(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function tt(t) {
        for (var U = t.length; 0 <= --U; ) t[U] = 0;
      }
      function B(t) {
        var U = t.state, D = U.pending;
        D > t.avail_out && (D = t.avail_out), D !== 0 && (s.arraySet(t.output, U.pending_buf, U.pending_out, D, t.next_out), t.next_out += D, U.pending_out += D, t.total_out += D, t.avail_out -= D, U.pending -= D, U.pending === 0 && (U.pending_out = 0));
      }
      function I(t, U) {
        i._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, U), t.block_start = t.strstart, B(t.strm);
      }
      function Q(t, U) {
        t.pending_buf[t.pending++] = U;
      }
      function K(t, U) {
        t.pending_buf[t.pending++] = U >>> 8 & 255, t.pending_buf[t.pending++] = 255 & U;
      }
      function Y(t, U) {
        var D, v, p = t.max_chain_length, C = t.strstart, M = t.prev_length, j = t.nice_match, T = t.strstart > t.w_size - rt ? t.strstart - (t.w_size - rt) : 0, G = t.window, J = t.w_mask, X = t.prev, nt = t.strstart + H, vt = G[C + M - 1], dt = G[C + M];
        t.prev_length >= t.good_match && (p >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (G[(D = U) + M] === dt && G[D + M - 1] === vt && G[D] === G[C] && G[++D] === G[C + 1]) {
            C += 2, D++;
            do
              ;
            while (G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && G[++C] === G[++D] && C < nt);
            if (v = H - (nt - C), C = nt - H, M < v) {
              if (t.match_start = U, j <= (M = v)) break;
              vt = G[C + M - 1], dt = G[C + M];
            }
          }
        while ((U = X[U & J]) > T && --p != 0);
        return M <= t.lookahead ? M : t.lookahead;
      }
      function wt(t) {
        var U, D, v, p, C, M, j, T, G, J, X = t.w_size;
        do {
          if (p = t.window_size - t.lookahead - t.strstart, t.strstart >= X + (X - rt)) {
            for (s.arraySet(t.window, t.window, X, X, 0), t.match_start -= X, t.strstart -= X, t.block_start -= X, U = D = t.hash_size; v = t.head[--U], t.head[U] = X <= v ? v - X : 0, --D; ) ;
            for (U = D = X; v = t.prev[--U], t.prev[U] = X <= v ? v - X : 0, --D; ) ;
            p += X;
          }
          if (t.strm.avail_in === 0) break;
          if (M = t.strm, j = t.window, T = t.strstart + t.lookahead, G = p, J = void 0, J = M.avail_in, G < J && (J = G), D = J === 0 ? 0 : (M.avail_in -= J, s.arraySet(j, M.input, M.next_in, J, T), M.state.wrap === 1 ? M.adler = d(M.adler, j, J, T) : M.state.wrap === 2 && (M.adler = _(M.adler, j, J, T)), M.next_in += J, M.total_in += J, J), t.lookahead += D, t.lookahead + t.insert >= O) for (C = t.strstart - t.insert, t.ins_h = t.window[C], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + O - 1]) & t.hash_mask, t.prev[C & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = C, C++, t.insert--, !(t.lookahead + t.insert < O)); ) ;
        } while (t.lookahead < rt && t.strm.avail_in !== 0);
      }
      function xt(t, U) {
        for (var D, v; ; ) {
          if (t.lookahead < rt) {
            if (wt(t), t.lookahead < rt && U === k) return a;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= O && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), D !== 0 && t.strstart - D <= t.w_size - rt && (t.match_length = Y(t, D)), t.match_length >= O) if (v = i._tr_tally(t, t.strstart - t.match_start, t.match_length - O), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= O) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = i._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (I(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = t.strstart < O - 1 ? t.strstart : O - 1, U === y ? (I(t, !0), t.strm.avail_out === 0 ? at : W) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ct(t, U) {
        for (var D, v, p; ; ) {
          if (t.lookahead < rt) {
            if (wt(t), t.lookahead < rt && U === k) return a;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= O && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = O - 1, D !== 0 && t.prev_length < t.max_lazy_match && t.strstart - D <= t.w_size - rt && (t.match_length = Y(t, D), t.match_length <= 5 && (t.strategy === 1 || t.match_length === O && 4096 < t.strstart - t.match_start) && (t.match_length = O - 1)), t.prev_length >= O && t.match_length <= t.prev_length) {
            for (p = t.strstart + t.lookahead - O, v = i._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - O), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= p && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = O - 1, t.strstart++, v && (I(t, !1), t.strm.avail_out === 0)) return a;
          } else if (t.match_available) {
            if ((v = i._tr_tally(t, 0, t.window[t.strstart - 1])) && I(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return a;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = i._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < O - 1 ? t.strstart : O - 1, U === y ? (I(t, !0), t.strm.avail_out === 0 ? at : W) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ht(t, U, D, v, p) {
        this.good_length = t, this.max_lazy = U, this.nice_length = D, this.max_chain = v, this.func = p;
      }
      function _t() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * P), this.dyn_dtree = new s.Buf16(2 * (2 * R + 1)), this.bl_tree = new s.Buf16(2 * (2 * L + 1)), tt(this.dyn_ltree), tt(this.dyn_dtree), tt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16($ + 1), this.heap = new s.Buf16(2 * z + 1), tt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * z + 1), tt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function it(t) {
        var U;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = f, (U = t.state).pending = 0, U.pending_out = 0, U.wrap < 0 && (U.wrap = -U.wrap), U.status = U.wrap ? b : F, t.adler = U.wrap === 2 ? 0 : 1, U.last_flush = k, i._tr_init(U), c) : lt(t, w);
      }
      function At(t) {
        var U = it(t);
        return U === c && function(D) {
          D.window_size = 2 * D.w_size, tt(D.head), D.max_lazy_match = n[D.level].max_lazy, D.good_match = n[D.level].good_length, D.nice_match = n[D.level].nice_length, D.max_chain_length = n[D.level].max_chain, D.strstart = 0, D.block_start = 0, D.lookahead = 0, D.insert = 0, D.match_length = D.prev_length = O - 1, D.match_available = 0, D.ins_h = 0;
        }(t.state), U;
      }
      function Tt(t, U, D, v, p, C) {
        if (!t) return w;
        var M = 1;
        if (U === l && (U = 6), v < 0 ? (M = 0, v = -v) : 15 < v && (M = 2, v -= 16), p < 1 || x < p || D !== g || v < 8 || 15 < v || U < 0 || 9 < U || C < 0 || m < C) return lt(t, w);
        v === 8 && (v = 9);
        var j = new _t();
        return (t.state = j).strm = t, j.wrap = M, j.gzhead = null, j.w_bits = v, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = p + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + O - 1) / O), j.window = new s.Buf8(2 * j.w_size), j.head = new s.Buf16(j.hash_size), j.prev = new s.Buf16(j.w_size), j.lit_bufsize = 1 << p + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new s.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = U, j.strategy = C, j.method = D, At(t);
      }
      n = [new ht(0, 0, 0, 0, function(t, U) {
        var D = 65535;
        for (D > t.pending_buf_size - 5 && (D = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (wt(t), t.lookahead === 0 && U === k) return a;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + D;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, I(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - rt && (I(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = 0, U === y ? (I(t, !0), t.strm.avail_out === 0 ? at : W) : (t.strstart > t.block_start && (I(t, !1), t.strm.avail_out), a);
      }), new ht(4, 4, 8, 4, xt), new ht(4, 5, 16, 8, xt), new ht(4, 6, 32, 32, xt), new ht(4, 4, 16, 16, ct), new ht(8, 16, 32, 32, ct), new ht(8, 16, 128, 128, ct), new ht(8, 32, 128, 256, ct), new ht(32, 128, 258, 1024, ct), new ht(32, 258, 258, 4096, ct)], u.deflateInit = function(t, U) {
        return Tt(t, U, g, 15, 8, 0);
      }, u.deflateInit2 = Tt, u.deflateReset = At, u.deflateResetKeep = it, u.deflateSetHeader = function(t, U) {
        return t && t.state ? t.state.wrap !== 2 ? w : (t.state.gzhead = U, c) : w;
      }, u.deflate = function(t, U) {
        var D, v, p, C;
        if (!t || !t.state || 5 < U || U < 0) return t ? lt(t, w) : w;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && U !== y) return lt(t, t.avail_out === 0 ? -5 : w);
        if (v.strm = t, D = v.last_flush, v.last_flush = U, v.status === b) if (v.wrap === 2) t.adler = 0, Q(v, 31), Q(v, 139), Q(v, 8), v.gzhead ? (Q(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), Q(v, 255 & v.gzhead.time), Q(v, v.gzhead.time >> 8 & 255), Q(v, v.gzhead.time >> 16 & 255), Q(v, v.gzhead.time >> 24 & 255), Q(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), Q(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (Q(v, 255 & v.gzhead.extra.length), Q(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = _(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (Q(v, 0), Q(v, 0), Q(v, 0), Q(v, 0), Q(v, 0), Q(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), Q(v, 3), v.status = F);
        else {
          var M = g + (v.w_bits - 8 << 4) << 8;
          M |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && (M |= 32), M += 31 - M % 31, v.status = F, K(v, M), v.strstart !== 0 && (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), t.adler = 1;
        }
        if (v.status === 69) if (v.gzhead.extra) {
          for (p = v.pending; v.gzindex < (65535 & v.gzhead.extra.length) && (v.pending !== v.pending_buf_size || (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), B(t), p = v.pending, v.pending !== v.pending_buf_size)); ) Q(v, 255 & v.gzhead.extra[v.gzindex]), v.gzindex++;
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), v.gzindex === v.gzhead.extra.length && (v.gzindex = 0, v.status = 73);
        } else v.status = 73;
        if (v.status === 73) if (v.gzhead.name) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), B(t), p = v.pending, v.pending === v.pending_buf_size)) {
              C = 1;
              break;
            }
            C = v.gzindex < v.gzhead.name.length ? 255 & v.gzhead.name.charCodeAt(v.gzindex++) : 0, Q(v, C);
          } while (C !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), C === 0 && (v.gzindex = 0, v.status = 91);
        } else v.status = 91;
        if (v.status === 91) if (v.gzhead.comment) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), B(t), p = v.pending, v.pending === v.pending_buf_size)) {
              C = 1;
              break;
            }
            C = v.gzindex < v.gzhead.comment.length ? 255 & v.gzhead.comment.charCodeAt(v.gzindex++) : 0, Q(v, C);
          } while (C !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), C === 0 && (v.status = 103);
        } else v.status = 103;
        if (v.status === 103 && (v.gzhead.hcrc ? (v.pending + 2 > v.pending_buf_size && B(t), v.pending + 2 <= v.pending_buf_size && (Q(v, 255 & t.adler), Q(v, t.adler >> 8 & 255), t.adler = 0, v.status = F)) : v.status = F), v.pending !== 0) {
          if (B(t), t.avail_out === 0) return v.last_flush = -1, c;
        } else if (t.avail_in === 0 && V(U) <= V(D) && U !== y) return lt(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return lt(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || U !== k && v.status !== 666) {
          var j = v.strategy === 2 ? function(T, G) {
            for (var J; ; ) {
              if (T.lookahead === 0 && (wt(T), T.lookahead === 0)) {
                if (G === k) return a;
                break;
              }
              if (T.match_length = 0, J = i._tr_tally(T, 0, T.window[T.strstart]), T.lookahead--, T.strstart++, J && (I(T, !1), T.strm.avail_out === 0)) return a;
            }
            return T.insert = 0, G === y ? (I(T, !0), T.strm.avail_out === 0 ? at : W) : T.last_lit && (I(T, !1), T.strm.avail_out === 0) ? a : N;
          }(v, U) : v.strategy === 3 ? function(T, G) {
            for (var J, X, nt, vt, dt = T.window; ; ) {
              if (T.lookahead <= H) {
                if (wt(T), T.lookahead <= H && G === k) return a;
                if (T.lookahead === 0) break;
              }
              if (T.match_length = 0, T.lookahead >= O && 0 < T.strstart && (X = dt[nt = T.strstart - 1]) === dt[++nt] && X === dt[++nt] && X === dt[++nt]) {
                vt = T.strstart + H;
                do
                  ;
                while (X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && X === dt[++nt] && nt < vt);
                T.match_length = H - (vt - nt), T.match_length > T.lookahead && (T.match_length = T.lookahead);
              }
              if (T.match_length >= O ? (J = i._tr_tally(T, 1, T.match_length - O), T.lookahead -= T.match_length, T.strstart += T.match_length, T.match_length = 0) : (J = i._tr_tally(T, 0, T.window[T.strstart]), T.lookahead--, T.strstart++), J && (I(T, !1), T.strm.avail_out === 0)) return a;
            }
            return T.insert = 0, G === y ? (I(T, !0), T.strm.avail_out === 0 ? at : W) : T.last_lit && (I(T, !1), T.strm.avail_out === 0) ? a : N;
          }(v, U) : n[v.level].func(v, U);
          if (j !== at && j !== W || (v.status = 666), j === a || j === at) return t.avail_out === 0 && (v.last_flush = -1), c;
          if (j === N && (U === 1 ? i._tr_align(v) : U !== 5 && (i._tr_stored_block(v, 0, 0, !1), U === 3 && (tt(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), B(t), t.avail_out === 0)) return v.last_flush = -1, c;
        }
        return U !== y ? c : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (Q(v, 255 & t.adler), Q(v, t.adler >> 8 & 255), Q(v, t.adler >> 16 & 255), Q(v, t.adler >> 24 & 255), Q(v, 255 & t.total_in), Q(v, t.total_in >> 8 & 255), Q(v, t.total_in >> 16 & 255), Q(v, t.total_in >> 24 & 255)) : (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), B(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? c : 1);
      }, u.deflateEnd = function(t) {
        var U;
        return t && t.state ? (U = t.state.status) !== b && U !== 69 && U !== 73 && U !== 91 && U !== 103 && U !== F && U !== 666 ? lt(t, w) : (t.state = null, U === F ? lt(t, -3) : c) : w;
      }, u.deflateSetDictionary = function(t, U) {
        var D, v, p, C, M, j, T, G, J = U.length;
        if (!t || !t.state || (C = (D = t.state).wrap) === 2 || C === 1 && D.status !== b || D.lookahead) return w;
        for (C === 1 && (t.adler = d(t.adler, U, J, 0)), D.wrap = 0, J >= D.w_size && (C === 0 && (tt(D.head), D.strstart = 0, D.block_start = 0, D.insert = 0), G = new s.Buf8(D.w_size), s.arraySet(G, U, J - D.w_size, D.w_size, 0), U = G, J = D.w_size), M = t.avail_in, j = t.next_in, T = t.input, t.avail_in = J, t.next_in = 0, t.input = U, wt(D); D.lookahead >= O; ) {
          for (v = D.strstart, p = D.lookahead - (O - 1); D.ins_h = (D.ins_h << D.hash_shift ^ D.window[v + O - 1]) & D.hash_mask, D.prev[v & D.w_mask] = D.head[D.ins_h], D.head[D.ins_h] = v, v++, --p; ) ;
          D.strstart = v, D.lookahead = O - 1, wt(D);
        }
        return D.strstart += D.lookahead, D.block_start = D.strstart, D.insert = D.lookahead, D.lookahead = 0, D.match_length = D.prev_length = O - 1, D.match_available = 0, t.next_in = j, t.input = T, t.avail_in = M, D.wrap = C, c;
      }, u.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, h, u) {
      h.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(r, h, u) {
      h.exports = function(n, s) {
        var i, d, _, S, k, y, c, w, l, m, f, g, x, z, R, L, P, $, O, H, rt, b, F, a, N;
        i = n.state, d = n.next_in, a = n.input, _ = d + (n.avail_in - 5), S = n.next_out, N = n.output, k = S - (s - n.avail_out), y = S + (n.avail_out - 257), c = i.dmax, w = i.wsize, l = i.whave, m = i.wnext, f = i.window, g = i.hold, x = i.bits, z = i.lencode, R = i.distcode, L = (1 << i.lenbits) - 1, P = (1 << i.distbits) - 1;
        t: do {
          x < 15 && (g += a[d++] << x, x += 8, g += a[d++] << x, x += 8), $ = z[g & L];
          e: for (; ; ) {
            if (g >>>= O = $ >>> 24, x -= O, (O = $ >>> 16 & 255) === 0) N[S++] = 65535 & $;
            else {
              if (!(16 & O)) {
                if (!(64 & O)) {
                  $ = z[(65535 & $) + (g & (1 << O) - 1)];
                  continue e;
                }
                if (32 & O) {
                  i.mode = 12;
                  break t;
                }
                n.msg = "invalid literal/length code", i.mode = 30;
                break t;
              }
              H = 65535 & $, (O &= 15) && (x < O && (g += a[d++] << x, x += 8), H += g & (1 << O) - 1, g >>>= O, x -= O), x < 15 && (g += a[d++] << x, x += 8, g += a[d++] << x, x += 8), $ = R[g & P];
              n: for (; ; ) {
                if (g >>>= O = $ >>> 24, x -= O, !(16 & (O = $ >>> 16 & 255))) {
                  if (!(64 & O)) {
                    $ = R[(65535 & $) + (g & (1 << O) - 1)];
                    continue n;
                  }
                  n.msg = "invalid distance code", i.mode = 30;
                  break t;
                }
                if (rt = 65535 & $, x < (O &= 15) && (g += a[d++] << x, (x += 8) < O && (g += a[d++] << x, x += 8)), c < (rt += g & (1 << O) - 1)) {
                  n.msg = "invalid distance too far back", i.mode = 30;
                  break t;
                }
                if (g >>>= O, x -= O, (O = S - k) < rt) {
                  if (l < (O = rt - O) && i.sane) {
                    n.msg = "invalid distance too far back", i.mode = 30;
                    break t;
                  }
                  if (F = f, (b = 0) === m) {
                    if (b += w - O, O < H) {
                      for (H -= O; N[S++] = f[b++], --O; ) ;
                      b = S - rt, F = N;
                    }
                  } else if (m < O) {
                    if (b += w + m - O, (O -= m) < H) {
                      for (H -= O; N[S++] = f[b++], --O; ) ;
                      if (b = 0, m < H) {
                        for (H -= O = m; N[S++] = f[b++], --O; ) ;
                        b = S - rt, F = N;
                      }
                    }
                  } else if (b += m - O, O < H) {
                    for (H -= O; N[S++] = f[b++], --O; ) ;
                    b = S - rt, F = N;
                  }
                  for (; 2 < H; ) N[S++] = F[b++], N[S++] = F[b++], N[S++] = F[b++], H -= 3;
                  H && (N[S++] = F[b++], 1 < H && (N[S++] = F[b++]));
                } else {
                  for (b = S - rt; N[S++] = N[b++], N[S++] = N[b++], N[S++] = N[b++], 2 < (H -= 3); ) ;
                  H && (N[S++] = N[b++], 1 < H && (N[S++] = N[b++]));
                }
                break;
              }
            }
            break;
          }
        } while (d < _ && S < y);
        d -= H = x >> 3, g &= (1 << (x -= H << 3)) - 1, n.next_in = d, n.next_out = S, n.avail_in = d < _ ? _ - d + 5 : 5 - (d - _), n.avail_out = S < y ? y - S + 257 : 257 - (S - y), i.hold = g, i.bits = x;
      };
    }, {}], 49: [function(r, h, u) {
      var n = r("../utils/common"), s = r("./adler32"), i = r("./crc32"), d = r("./inffast"), _ = r("./inftrees"), S = 1, k = 2, y = 0, c = -2, w = 1, l = 852, m = 592;
      function f(b) {
        return (b >>> 24 & 255) + (b >>> 8 & 65280) + ((65280 & b) << 8) + ((255 & b) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function x(b) {
        var F;
        return b && b.state ? (F = b.state, b.total_in = b.total_out = F.total = 0, b.msg = "", F.wrap && (b.adler = 1 & F.wrap), F.mode = w, F.last = 0, F.havedict = 0, F.dmax = 32768, F.head = null, F.hold = 0, F.bits = 0, F.lencode = F.lendyn = new n.Buf32(l), F.distcode = F.distdyn = new n.Buf32(m), F.sane = 1, F.back = -1, y) : c;
      }
      function z(b) {
        var F;
        return b && b.state ? ((F = b.state).wsize = 0, F.whave = 0, F.wnext = 0, x(b)) : c;
      }
      function R(b, F) {
        var a, N;
        return b && b.state ? (N = b.state, F < 0 ? (a = 0, F = -F) : (a = 1 + (F >> 4), F < 48 && (F &= 15)), F && (F < 8 || 15 < F) ? c : (N.window !== null && N.wbits !== F && (N.window = null), N.wrap = a, N.wbits = F, z(b))) : c;
      }
      function L(b, F) {
        var a, N;
        return b ? (N = new g(), (b.state = N).window = null, (a = R(b, F)) !== y && (b.state = null), a) : c;
      }
      var P, $, O = !0;
      function H(b) {
        if (O) {
          var F;
          for (P = new n.Buf32(512), $ = new n.Buf32(32), F = 0; F < 144; ) b.lens[F++] = 8;
          for (; F < 256; ) b.lens[F++] = 9;
          for (; F < 280; ) b.lens[F++] = 7;
          for (; F < 288; ) b.lens[F++] = 8;
          for (_(S, b.lens, 0, 288, P, 0, b.work, { bits: 9 }), F = 0; F < 32; ) b.lens[F++] = 5;
          _(k, b.lens, 0, 32, $, 0, b.work, { bits: 5 }), O = !1;
        }
        b.lencode = P, b.lenbits = 9, b.distcode = $, b.distbits = 5;
      }
      function rt(b, F, a, N) {
        var at, W = b.state;
        return W.window === null && (W.wsize = 1 << W.wbits, W.wnext = 0, W.whave = 0, W.window = new n.Buf8(W.wsize)), N >= W.wsize ? (n.arraySet(W.window, F, a - W.wsize, W.wsize, 0), W.wnext = 0, W.whave = W.wsize) : (N < (at = W.wsize - W.wnext) && (at = N), n.arraySet(W.window, F, a - N, at, W.wnext), (N -= at) ? (n.arraySet(W.window, F, a - N, N, 0), W.wnext = N, W.whave = W.wsize) : (W.wnext += at, W.wnext === W.wsize && (W.wnext = 0), W.whave < W.wsize && (W.whave += at))), 0;
      }
      u.inflateReset = z, u.inflateReset2 = R, u.inflateResetKeep = x, u.inflateInit = function(b) {
        return L(b, 15);
      }, u.inflateInit2 = L, u.inflate = function(b, F) {
        var a, N, at, W, lt, V, tt, B, I, Q, K, Y, wt, xt, ct, ht, _t, it, At, Tt, t, U, D, v, p = 0, C = new n.Buf8(4), M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!b || !b.state || !b.output || !b.input && b.avail_in !== 0) return c;
        (a = b.state).mode === 12 && (a.mode = 13), lt = b.next_out, at = b.output, tt = b.avail_out, W = b.next_in, N = b.input, V = b.avail_in, B = a.hold, I = a.bits, Q = V, K = tt, U = y;
        t: for (; ; ) switch (a.mode) {
          case w:
            if (a.wrap === 0) {
              a.mode = 13;
              break;
            }
            for (; I < 16; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if (2 & a.wrap && B === 35615) {
              C[a.check = 0] = 255 & B, C[1] = B >>> 8 & 255, a.check = i(a.check, C, 2, 0), I = B = 0, a.mode = 2;
              break;
            }
            if (a.flags = 0, a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
              b.msg = "incorrect header check", a.mode = 30;
              break;
            }
            if ((15 & B) != 8) {
              b.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (I -= 4, t = 8 + (15 & (B >>>= 4)), a.wbits === 0) a.wbits = t;
            else if (t > a.wbits) {
              b.msg = "invalid window size", a.mode = 30;
              break;
            }
            a.dmax = 1 << t, b.adler = a.check = 1, a.mode = 512 & B ? 10 : 12, I = B = 0;
            break;
          case 2:
            for (; I < 16; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if (a.flags = B, (255 & a.flags) != 8) {
              b.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (57344 & a.flags) {
              b.msg = "unknown header flags set", a.mode = 30;
              break;
            }
            a.head && (a.head.text = B >> 8 & 1), 512 & a.flags && (C[0] = 255 & B, C[1] = B >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = B = 0, a.mode = 3;
          case 3:
            for (; I < 32; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            a.head && (a.head.time = B), 512 & a.flags && (C[0] = 255 & B, C[1] = B >>> 8 & 255, C[2] = B >>> 16 & 255, C[3] = B >>> 24 & 255, a.check = i(a.check, C, 4, 0)), I = B = 0, a.mode = 4;
          case 4:
            for (; I < 16; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            a.head && (a.head.xflags = 255 & B, a.head.os = B >> 8), 512 & a.flags && (C[0] = 255 & B, C[1] = B >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = B = 0, a.mode = 5;
          case 5:
            if (1024 & a.flags) {
              for (; I < 16; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              a.length = B, a.head && (a.head.extra_len = B), 512 & a.flags && (C[0] = 255 & B, C[1] = B >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = B = 0;
            } else a.head && (a.head.extra = null);
            a.mode = 6;
          case 6:
            if (1024 & a.flags && (V < (Y = a.length) && (Y = V), Y && (a.head && (t = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), n.arraySet(a.head.extra, N, W, Y, t)), 512 & a.flags && (a.check = i(a.check, N, Y, W)), V -= Y, W += Y, a.length -= Y), a.length)) break t;
            a.length = 0, a.mode = 7;
          case 7:
            if (2048 & a.flags) {
              if (V === 0) break t;
              for (Y = 0; t = N[W + Y++], a.head && t && a.length < 65536 && (a.head.name += String.fromCharCode(t)), t && Y < V; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, Y, W)), V -= Y, W += Y, t) break t;
            } else a.head && (a.head.name = null);
            a.length = 0, a.mode = 8;
          case 8:
            if (4096 & a.flags) {
              if (V === 0) break t;
              for (Y = 0; t = N[W + Y++], a.head && t && a.length < 65536 && (a.head.comment += String.fromCharCode(t)), t && Y < V; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, Y, W)), V -= Y, W += Y, t) break t;
            } else a.head && (a.head.comment = null);
            a.mode = 9;
          case 9:
            if (512 & a.flags) {
              for (; I < 16; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              if (B !== (65535 & a.check)) {
                b.msg = "header crc mismatch", a.mode = 30;
                break;
              }
              I = B = 0;
            }
            a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0), b.adler = a.check = 0, a.mode = 12;
            break;
          case 10:
            for (; I < 32; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            b.adler = a.check = f(B), I = B = 0, a.mode = 11;
          case 11:
            if (a.havedict === 0) return b.next_out = lt, b.avail_out = tt, b.next_in = W, b.avail_in = V, a.hold = B, a.bits = I, 2;
            b.adler = a.check = 1, a.mode = 12;
          case 12:
            if (F === 5 || F === 6) break t;
          case 13:
            if (a.last) {
              B >>>= 7 & I, I -= 7 & I, a.mode = 27;
              break;
            }
            for (; I < 3; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            switch (a.last = 1 & B, I -= 1, 3 & (B >>>= 1)) {
              case 0:
                a.mode = 14;
                break;
              case 1:
                if (H(a), a.mode = 20, F !== 6) break;
                B >>>= 2, I -= 2;
                break t;
              case 2:
                a.mode = 17;
                break;
              case 3:
                b.msg = "invalid block type", a.mode = 30;
            }
            B >>>= 2, I -= 2;
            break;
          case 14:
            for (B >>>= 7 & I, I -= 7 & I; I < 32; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if ((65535 & B) != (B >>> 16 ^ 65535)) {
              b.msg = "invalid stored block lengths", a.mode = 30;
              break;
            }
            if (a.length = 65535 & B, I = B = 0, a.mode = 15, F === 6) break t;
          case 15:
            a.mode = 16;
          case 16:
            if (Y = a.length) {
              if (V < Y && (Y = V), tt < Y && (Y = tt), Y === 0) break t;
              n.arraySet(at, N, W, Y, lt), V -= Y, W += Y, tt -= Y, lt += Y, a.length -= Y;
              break;
            }
            a.mode = 12;
            break;
          case 17:
            for (; I < 14; ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if (a.nlen = 257 + (31 & B), B >>>= 5, I -= 5, a.ndist = 1 + (31 & B), B >>>= 5, I -= 5, a.ncode = 4 + (15 & B), B >>>= 4, I -= 4, 286 < a.nlen || 30 < a.ndist) {
              b.msg = "too many length or distance symbols", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 18;
          case 18:
            for (; a.have < a.ncode; ) {
              for (; I < 3; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              a.lens[M[a.have++]] = 7 & B, B >>>= 3, I -= 3;
            }
            for (; a.have < 19; ) a.lens[M[a.have++]] = 0;
            if (a.lencode = a.lendyn, a.lenbits = 7, D = { bits: a.lenbits }, U = _(0, a.lens, 0, 19, a.lencode, 0, a.work, D), a.lenbits = D.bits, U) {
              b.msg = "invalid code lengths set", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 19;
          case 19:
            for (; a.have < a.nlen + a.ndist; ) {
              for (; ht = (p = a.lencode[B & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ct = p >>> 24) <= I); ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              if (_t < 16) B >>>= ct, I -= ct, a.lens[a.have++] = _t;
              else {
                if (_t === 16) {
                  for (v = ct + 2; I < v; ) {
                    if (V === 0) break t;
                    V--, B += N[W++] << I, I += 8;
                  }
                  if (B >>>= ct, I -= ct, a.have === 0) {
                    b.msg = "invalid bit length repeat", a.mode = 30;
                    break;
                  }
                  t = a.lens[a.have - 1], Y = 3 + (3 & B), B >>>= 2, I -= 2;
                } else if (_t === 17) {
                  for (v = ct + 3; I < v; ) {
                    if (V === 0) break t;
                    V--, B += N[W++] << I, I += 8;
                  }
                  I -= ct, t = 0, Y = 3 + (7 & (B >>>= ct)), B >>>= 3, I -= 3;
                } else {
                  for (v = ct + 7; I < v; ) {
                    if (V === 0) break t;
                    V--, B += N[W++] << I, I += 8;
                  }
                  I -= ct, t = 0, Y = 11 + (127 & (B >>>= ct)), B >>>= 7, I -= 7;
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
            if (a.lenbits = 9, D = { bits: a.lenbits }, U = _(S, a.lens, 0, a.nlen, a.lencode, 0, a.work, D), a.lenbits = D.bits, U) {
              b.msg = "invalid literal/lengths set", a.mode = 30;
              break;
            }
            if (a.distbits = 6, a.distcode = a.distdyn, D = { bits: a.distbits }, U = _(k, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, D), a.distbits = D.bits, U) {
              b.msg = "invalid distances set", a.mode = 30;
              break;
            }
            if (a.mode = 20, F === 6) break t;
          case 20:
            a.mode = 21;
          case 21:
            if (6 <= V && 258 <= tt) {
              b.next_out = lt, b.avail_out = tt, b.next_in = W, b.avail_in = V, a.hold = B, a.bits = I, d(b, K), lt = b.next_out, at = b.output, tt = b.avail_out, W = b.next_in, N = b.input, V = b.avail_in, B = a.hold, I = a.bits, a.mode === 12 && (a.back = -1);
              break;
            }
            for (a.back = 0; ht = (p = a.lencode[B & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ct = p >>> 24) <= I); ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if (ht && !(240 & ht)) {
              for (it = ct, At = ht, Tt = _t; ht = (p = a.lencode[Tt + ((B & (1 << it + At) - 1) >> it)]) >>> 16 & 255, _t = 65535 & p, !(it + (ct = p >>> 24) <= I); ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              B >>>= it, I -= it, a.back += it;
            }
            if (B >>>= ct, I -= ct, a.back += ct, a.length = _t, ht === 0) {
              a.mode = 26;
              break;
            }
            if (32 & ht) {
              a.back = -1, a.mode = 12;
              break;
            }
            if (64 & ht) {
              b.msg = "invalid literal/length code", a.mode = 30;
              break;
            }
            a.extra = 15 & ht, a.mode = 22;
          case 22:
            if (a.extra) {
              for (v = a.extra; I < v; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              a.length += B & (1 << a.extra) - 1, B >>>= a.extra, I -= a.extra, a.back += a.extra;
            }
            a.was = a.length, a.mode = 23;
          case 23:
            for (; ht = (p = a.distcode[B & (1 << a.distbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ct = p >>> 24) <= I); ) {
              if (V === 0) break t;
              V--, B += N[W++] << I, I += 8;
            }
            if (!(240 & ht)) {
              for (it = ct, At = ht, Tt = _t; ht = (p = a.distcode[Tt + ((B & (1 << it + At) - 1) >> it)]) >>> 16 & 255, _t = 65535 & p, !(it + (ct = p >>> 24) <= I); ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              B >>>= it, I -= it, a.back += it;
            }
            if (B >>>= ct, I -= ct, a.back += ct, 64 & ht) {
              b.msg = "invalid distance code", a.mode = 30;
              break;
            }
            a.offset = _t, a.extra = 15 & ht, a.mode = 24;
          case 24:
            if (a.extra) {
              for (v = a.extra; I < v; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              a.offset += B & (1 << a.extra) - 1, B >>>= a.extra, I -= a.extra, a.back += a.extra;
            }
            if (a.offset > a.dmax) {
              b.msg = "invalid distance too far back", a.mode = 30;
              break;
            }
            a.mode = 25;
          case 25:
            if (tt === 0) break t;
            if (Y = K - tt, a.offset > Y) {
              if ((Y = a.offset - Y) > a.whave && a.sane) {
                b.msg = "invalid distance too far back", a.mode = 30;
                break;
              }
              wt = Y > a.wnext ? (Y -= a.wnext, a.wsize - Y) : a.wnext - Y, Y > a.length && (Y = a.length), xt = a.window;
            } else xt = at, wt = lt - a.offset, Y = a.length;
            for (tt < Y && (Y = tt), tt -= Y, a.length -= Y; at[lt++] = xt[wt++], --Y; ) ;
            a.length === 0 && (a.mode = 21);
            break;
          case 26:
            if (tt === 0) break t;
            at[lt++] = a.length, tt--, a.mode = 21;
            break;
          case 27:
            if (a.wrap) {
              for (; I < 32; ) {
                if (V === 0) break t;
                V--, B |= N[W++] << I, I += 8;
              }
              if (K -= tt, b.total_out += K, a.total += K, K && (b.adler = a.check = a.flags ? i(a.check, at, K, lt - K) : s(a.check, at, K, lt - K)), K = tt, (a.flags ? B : f(B)) !== a.check) {
                b.msg = "incorrect data check", a.mode = 30;
                break;
              }
              I = B = 0;
            }
            a.mode = 28;
          case 28:
            if (a.wrap && a.flags) {
              for (; I < 32; ) {
                if (V === 0) break t;
                V--, B += N[W++] << I, I += 8;
              }
              if (B !== (4294967295 & a.total)) {
                b.msg = "incorrect length check", a.mode = 30;
                break;
              }
              I = B = 0;
            }
            a.mode = 29;
          case 29:
            U = 1;
            break t;
          case 30:
            U = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return c;
        }
        return b.next_out = lt, b.avail_out = tt, b.next_in = W, b.avail_in = V, a.hold = B, a.bits = I, (a.wsize || K !== b.avail_out && a.mode < 30 && (a.mode < 27 || F !== 4)) && rt(b, b.output, b.next_out, K - b.avail_out) ? (a.mode = 31, -4) : (Q -= b.avail_in, K -= b.avail_out, b.total_in += Q, b.total_out += K, a.total += K, a.wrap && K && (b.adler = a.check = a.flags ? i(a.check, at, K, b.next_out - K) : s(a.check, at, K, b.next_out - K)), b.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === 12 ? 128 : 0) + (a.mode === 20 || a.mode === 15 ? 256 : 0), (Q == 0 && K === 0 || F === 4) && U === y && (U = -5), U);
      }, u.inflateEnd = function(b) {
        if (!b || !b.state) return c;
        var F = b.state;
        return F.window && (F.window = null), b.state = null, y;
      }, u.inflateGetHeader = function(b, F) {
        var a;
        return b && b.state && 2 & (a = b.state).wrap ? ((a.head = F).done = !1, y) : c;
      }, u.inflateSetDictionary = function(b, F) {
        var a, N = F.length;
        return b && b.state ? (a = b.state).wrap !== 0 && a.mode !== 11 ? c : a.mode === 11 && s(1, F, N, 0) !== a.check ? -3 : rt(b, F, N, N) ? (a.mode = 31, -4) : (a.havedict = 1, y) : c;
      }, u.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, h, u) {
      var n = r("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], d = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      h.exports = function(S, k, y, c, w, l, m, f) {
        var g, x, z, R, L, P, $, O, H, rt = f.bits, b = 0, F = 0, a = 0, N = 0, at = 0, W = 0, lt = 0, V = 0, tt = 0, B = 0, I = null, Q = 0, K = new n.Buf16(16), Y = new n.Buf16(16), wt = null, xt = 0;
        for (b = 0; b <= 15; b++) K[b] = 0;
        for (F = 0; F < c; F++) K[k[y + F]]++;
        for (at = rt, N = 15; 1 <= N && K[N] === 0; N--) ;
        if (N < at && (at = N), N === 0) return w[l++] = 20971520, w[l++] = 20971520, f.bits = 1, 0;
        for (a = 1; a < N && K[a] === 0; a++) ;
        for (at < a && (at = a), b = V = 1; b <= 15; b++) if (V <<= 1, (V -= K[b]) < 0) return -1;
        if (0 < V && (S === 0 || N !== 1)) return -1;
        for (Y[1] = 0, b = 1; b < 15; b++) Y[b + 1] = Y[b] + K[b];
        for (F = 0; F < c; F++) k[y + F] !== 0 && (m[Y[k[y + F]]++] = F);
        if (P = S === 0 ? (I = wt = m, 19) : S === 1 ? (I = s, Q -= 257, wt = i, xt -= 257, 256) : (I = d, wt = _, -1), b = a, L = l, lt = F = B = 0, z = -1, R = (tt = 1 << (W = at)) - 1, S === 1 && 852 < tt || S === 2 && 592 < tt) return 1;
        for (; ; ) {
          for ($ = b - lt, H = m[F] < P ? (O = 0, m[F]) : m[F] > P ? (O = wt[xt + m[F]], I[Q + m[F]]) : (O = 96, 0), g = 1 << b - lt, a = x = 1 << W; w[L + (B >> lt) + (x -= g)] = $ << 24 | O << 16 | H | 0, x !== 0; ) ;
          for (g = 1 << b - 1; B & g; ) g >>= 1;
          if (g !== 0 ? (B &= g - 1, B += g) : B = 0, F++, --K[b] == 0) {
            if (b === N) break;
            b = k[y + m[F]];
          }
          if (at < b && (B & R) !== z) {
            for (lt === 0 && (lt = at), L += a, V = 1 << (W = b - lt); W + lt < N && !((V -= K[W + lt]) <= 0); ) W++, V <<= 1;
            if (tt += 1 << W, S === 1 && 852 < tt || S === 2 && 592 < tt) return 1;
            w[z = B & R] = at << 24 | W << 16 | L - l | 0;
          }
        }
        return B !== 0 && (w[L + B] = b - lt << 24 | 64 << 16 | 0), f.bits = at, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(r, h, u) {
      h.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(r, h, u) {
      var n = r("../utils/common"), s = 0, i = 1;
      function d(p) {
        for (var C = p.length; 0 <= --C; ) p[C] = 0;
      }
      var _ = 0, S = 29, k = 256, y = k + 1 + S, c = 30, w = 19, l = 2 * y + 1, m = 15, f = 16, g = 7, x = 256, z = 16, R = 17, L = 18, P = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], $ = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], O = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], H = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], rt = new Array(2 * (y + 2));
      d(rt);
      var b = new Array(2 * c);
      d(b);
      var F = new Array(512);
      d(F);
      var a = new Array(256);
      d(a);
      var N = new Array(S);
      d(N);
      var at, W, lt, V = new Array(c);
      function tt(p, C, M, j, T) {
        this.static_tree = p, this.extra_bits = C, this.extra_base = M, this.elems = j, this.max_length = T, this.has_stree = p && p.length;
      }
      function B(p, C) {
        this.dyn_tree = p, this.max_code = 0, this.stat_desc = C;
      }
      function I(p) {
        return p < 256 ? F[p] : F[256 + (p >>> 7)];
      }
      function Q(p, C) {
        p.pending_buf[p.pending++] = 255 & C, p.pending_buf[p.pending++] = C >>> 8 & 255;
      }
      function K(p, C, M) {
        p.bi_valid > f - M ? (p.bi_buf |= C << p.bi_valid & 65535, Q(p, p.bi_buf), p.bi_buf = C >> f - p.bi_valid, p.bi_valid += M - f) : (p.bi_buf |= C << p.bi_valid & 65535, p.bi_valid += M);
      }
      function Y(p, C, M) {
        K(p, M[2 * C], M[2 * C + 1]);
      }
      function wt(p, C) {
        for (var M = 0; M |= 1 & p, p >>>= 1, M <<= 1, 0 < --C; ) ;
        return M >>> 1;
      }
      function xt(p, C, M) {
        var j, T, G = new Array(m + 1), J = 0;
        for (j = 1; j <= m; j++) G[j] = J = J + M[j - 1] << 1;
        for (T = 0; T <= C; T++) {
          var X = p[2 * T + 1];
          X !== 0 && (p[2 * T] = wt(G[X]++, X));
        }
      }
      function ct(p) {
        var C;
        for (C = 0; C < y; C++) p.dyn_ltree[2 * C] = 0;
        for (C = 0; C < c; C++) p.dyn_dtree[2 * C] = 0;
        for (C = 0; C < w; C++) p.bl_tree[2 * C] = 0;
        p.dyn_ltree[2 * x] = 1, p.opt_len = p.static_len = 0, p.last_lit = p.matches = 0;
      }
      function ht(p) {
        8 < p.bi_valid ? Q(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf), p.bi_buf = 0, p.bi_valid = 0;
      }
      function _t(p, C, M, j) {
        var T = 2 * C, G = 2 * M;
        return p[T] < p[G] || p[T] === p[G] && j[C] <= j[M];
      }
      function it(p, C, M) {
        for (var j = p.heap[M], T = M << 1; T <= p.heap_len && (T < p.heap_len && _t(C, p.heap[T + 1], p.heap[T], p.depth) && T++, !_t(C, j, p.heap[T], p.depth)); ) p.heap[M] = p.heap[T], M = T, T <<= 1;
        p.heap[M] = j;
      }
      function At(p, C, M) {
        var j, T, G, J, X = 0;
        if (p.last_lit !== 0) for (; j = p.pending_buf[p.d_buf + 2 * X] << 8 | p.pending_buf[p.d_buf + 2 * X + 1], T = p.pending_buf[p.l_buf + X], X++, j === 0 ? Y(p, T, C) : (Y(p, (G = a[T]) + k + 1, C), (J = P[G]) !== 0 && K(p, T -= N[G], J), Y(p, G = I(--j), M), (J = $[G]) !== 0 && K(p, j -= V[G], J)), X < p.last_lit; ) ;
        Y(p, x, C);
      }
      function Tt(p, C) {
        var M, j, T, G = C.dyn_tree, J = C.stat_desc.static_tree, X = C.stat_desc.has_stree, nt = C.stat_desc.elems, vt = -1;
        for (p.heap_len = 0, p.heap_max = l, M = 0; M < nt; M++) G[2 * M] !== 0 ? (p.heap[++p.heap_len] = vt = M, p.depth[M] = 0) : G[2 * M + 1] = 0;
        for (; p.heap_len < 2; ) G[2 * (T = p.heap[++p.heap_len] = vt < 2 ? ++vt : 0)] = 1, p.depth[T] = 0, p.opt_len--, X && (p.static_len -= J[2 * T + 1]);
        for (C.max_code = vt, M = p.heap_len >> 1; 1 <= M; M--) it(p, G, M);
        for (T = nt; M = p.heap[1], p.heap[1] = p.heap[p.heap_len--], it(p, G, 1), j = p.heap[1], p.heap[--p.heap_max] = M, p.heap[--p.heap_max] = j, G[2 * T] = G[2 * M] + G[2 * j], p.depth[T] = (p.depth[M] >= p.depth[j] ? p.depth[M] : p.depth[j]) + 1, G[2 * M + 1] = G[2 * j + 1] = T, p.heap[1] = T++, it(p, G, 1), 2 <= p.heap_len; ) ;
        p.heap[--p.heap_max] = p.heap[1], function(dt, Ct) {
          var Wt, Ot, Vt, bt, Gt, qt, Dt = Ct.dyn_tree, ae = Ct.max_code, se = Ct.stat_desc.static_tree, ve = Ct.stat_desc.has_stree, we = Ct.stat_desc.extra_bits, oe = Ct.stat_desc.extra_base, Zt = Ct.stat_desc.max_length, Jt = 0;
          for (bt = 0; bt <= m; bt++) dt.bl_count[bt] = 0;
          for (Dt[2 * dt.heap[dt.heap_max] + 1] = 0, Wt = dt.heap_max + 1; Wt < l; Wt++) Zt < (bt = Dt[2 * Dt[2 * (Ot = dt.heap[Wt]) + 1] + 1] + 1) && (bt = Zt, Jt++), Dt[2 * Ot + 1] = bt, ae < Ot || (dt.bl_count[bt]++, Gt = 0, oe <= Ot && (Gt = we[Ot - oe]), qt = Dt[2 * Ot], dt.opt_len += qt * (bt + Gt), ve && (dt.static_len += qt * (se[2 * Ot + 1] + Gt)));
          if (Jt !== 0) {
            do {
              for (bt = Zt - 1; dt.bl_count[bt] === 0; ) bt--;
              dt.bl_count[bt]--, dt.bl_count[bt + 1] += 2, dt.bl_count[Zt]--, Jt -= 2;
            } while (0 < Jt);
            for (bt = Zt; bt !== 0; bt--) for (Ot = dt.bl_count[bt]; Ot !== 0; ) ae < (Vt = dt.heap[--Wt]) || (Dt[2 * Vt + 1] !== bt && (dt.opt_len += (bt - Dt[2 * Vt + 1]) * Dt[2 * Vt], Dt[2 * Vt + 1] = bt), Ot--);
          }
        }(p, C), xt(G, vt, p.bl_count);
      }
      function t(p, C, M) {
        var j, T, G = -1, J = C[1], X = 0, nt = 7, vt = 4;
        for (J === 0 && (nt = 138, vt = 3), C[2 * (M + 1) + 1] = 65535, j = 0; j <= M; j++) T = J, J = C[2 * (j + 1) + 1], ++X < nt && T === J || (X < vt ? p.bl_tree[2 * T] += X : T !== 0 ? (T !== G && p.bl_tree[2 * T]++, p.bl_tree[2 * z]++) : X <= 10 ? p.bl_tree[2 * R]++ : p.bl_tree[2 * L]++, G = T, vt = (X = 0) === J ? (nt = 138, 3) : T === J ? (nt = 6, 3) : (nt = 7, 4));
      }
      function U(p, C, M) {
        var j, T, G = -1, J = C[1], X = 0, nt = 7, vt = 4;
        for (J === 0 && (nt = 138, vt = 3), j = 0; j <= M; j++) if (T = J, J = C[2 * (j + 1) + 1], !(++X < nt && T === J)) {
          if (X < vt) for (; Y(p, T, p.bl_tree), --X != 0; ) ;
          else T !== 0 ? (T !== G && (Y(p, T, p.bl_tree), X--), Y(p, z, p.bl_tree), K(p, X - 3, 2)) : X <= 10 ? (Y(p, R, p.bl_tree), K(p, X - 3, 3)) : (Y(p, L, p.bl_tree), K(p, X - 11, 7));
          G = T, vt = (X = 0) === J ? (nt = 138, 3) : T === J ? (nt = 6, 3) : (nt = 7, 4);
        }
      }
      d(V);
      var D = !1;
      function v(p, C, M, j) {
        K(p, (_ << 1) + (j ? 1 : 0), 3), function(T, G, J, X) {
          ht(T), Q(T, J), Q(T, ~J), n.arraySet(T.pending_buf, T.window, G, J, T.pending), T.pending += J;
        }(p, C, M);
      }
      u._tr_init = function(p) {
        D || (function() {
          var C, M, j, T, G, J = new Array(m + 1);
          for (T = j = 0; T < S - 1; T++) for (N[T] = j, C = 0; C < 1 << P[T]; C++) a[j++] = T;
          for (a[j - 1] = T, T = G = 0; T < 16; T++) for (V[T] = G, C = 0; C < 1 << $[T]; C++) F[G++] = T;
          for (G >>= 7; T < c; T++) for (V[T] = G << 7, C = 0; C < 1 << $[T] - 7; C++) F[256 + G++] = T;
          for (M = 0; M <= m; M++) J[M] = 0;
          for (C = 0; C <= 143; ) rt[2 * C + 1] = 8, C++, J[8]++;
          for (; C <= 255; ) rt[2 * C + 1] = 9, C++, J[9]++;
          for (; C <= 279; ) rt[2 * C + 1] = 7, C++, J[7]++;
          for (; C <= 287; ) rt[2 * C + 1] = 8, C++, J[8]++;
          for (xt(rt, y + 1, J), C = 0; C < c; C++) b[2 * C + 1] = 5, b[2 * C] = wt(C, 5);
          at = new tt(rt, P, k + 1, y, m), W = new tt(b, $, 0, c, m), lt = new tt(new Array(0), O, 0, w, g);
        }(), D = !0), p.l_desc = new B(p.dyn_ltree, at), p.d_desc = new B(p.dyn_dtree, W), p.bl_desc = new B(p.bl_tree, lt), p.bi_buf = 0, p.bi_valid = 0, ct(p);
      }, u._tr_stored_block = v, u._tr_flush_block = function(p, C, M, j) {
        var T, G, J = 0;
        0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(X) {
          var nt, vt = 4093624447;
          for (nt = 0; nt <= 31; nt++, vt >>>= 1) if (1 & vt && X.dyn_ltree[2 * nt] !== 0) return s;
          if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return i;
          for (nt = 32; nt < k; nt++) if (X.dyn_ltree[2 * nt] !== 0) return i;
          return s;
        }(p)), Tt(p, p.l_desc), Tt(p, p.d_desc), J = function(X) {
          var nt;
          for (t(X, X.dyn_ltree, X.l_desc.max_code), t(X, X.dyn_dtree, X.d_desc.max_code), Tt(X, X.bl_desc), nt = w - 1; 3 <= nt && X.bl_tree[2 * H[nt] + 1] === 0; nt--) ;
          return X.opt_len += 3 * (nt + 1) + 5 + 5 + 4, nt;
        }(p), T = p.opt_len + 3 + 7 >>> 3, (G = p.static_len + 3 + 7 >>> 3) <= T && (T = G)) : T = G = M + 5, M + 4 <= T && C !== -1 ? v(p, C, M, j) : p.strategy === 4 || G === T ? (K(p, 2 + (j ? 1 : 0), 3), At(p, rt, b)) : (K(p, 4 + (j ? 1 : 0), 3), function(X, nt, vt, dt) {
          var Ct;
          for (K(X, nt - 257, 5), K(X, vt - 1, 5), K(X, dt - 4, 4), Ct = 0; Ct < dt; Ct++) K(X, X.bl_tree[2 * H[Ct] + 1], 3);
          U(X, X.dyn_ltree, nt - 1), U(X, X.dyn_dtree, vt - 1);
        }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, J + 1), At(p, p.dyn_ltree, p.dyn_dtree)), ct(p), j && ht(p);
      }, u._tr_tally = function(p, C, M) {
        return p.pending_buf[p.d_buf + 2 * p.last_lit] = C >>> 8 & 255, p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & C, p.pending_buf[p.l_buf + p.last_lit] = 255 & M, p.last_lit++, C === 0 ? p.dyn_ltree[2 * M]++ : (p.matches++, C--, p.dyn_ltree[2 * (a[M] + k + 1)]++, p.dyn_dtree[2 * I(C)]++), p.last_lit === p.lit_bufsize - 1;
      }, u._tr_align = function(p) {
        K(p, 2, 3), Y(p, x, rt), function(C) {
          C.bi_valid === 16 ? (Q(C, C.bi_buf), C.bi_buf = 0, C.bi_valid = 0) : 8 <= C.bi_valid && (C.pending_buf[C.pending++] = 255 & C.bi_buf, C.bi_buf >>= 8, C.bi_valid -= 8);
        }(p);
      };
    }, { "../utils/common": 41 }], 53: [function(r, h, u) {
      h.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(r, h, u) {
      (function(n) {
        (function(s, i) {
          if (!s.setImmediate) {
            var d, _, S, k, y = 1, c = {}, w = !1, l = s.document, m = Object.getPrototypeOf && Object.getPrototypeOf(s);
            m = m && m.setTimeout ? m : s, d = {}.toString.call(s.process) === "[object process]" ? function(z) {
              process.nextTick(function() {
                g(z);
              });
            } : function() {
              if (s.postMessage && !s.importScripts) {
                var z = !0, R = s.onmessage;
                return s.onmessage = function() {
                  z = !1;
                }, s.postMessage("", "*"), s.onmessage = R, z;
              }
            }() ? (k = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", x, !1) : s.attachEvent("onmessage", x), function(z) {
              s.postMessage(k + z, "*");
            }) : s.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(z) {
              g(z.data);
            }, function(z) {
              S.port2.postMessage(z);
            }) : l && "onreadystatechange" in l.createElement("script") ? (_ = l.documentElement, function(z) {
              var R = l.createElement("script");
              R.onreadystatechange = function() {
                g(z), R.onreadystatechange = null, _.removeChild(R), R = null;
              }, _.appendChild(R);
            }) : function(z) {
              setTimeout(g, 0, z);
            }, m.setImmediate = function(z) {
              typeof z != "function" && (z = new Function("" + z));
              for (var R = new Array(arguments.length - 1), L = 0; L < R.length; L++) R[L] = arguments[L + 1];
              var P = { callback: z, args: R };
              return c[y] = P, d(y), y++;
            }, m.clearImmediate = f;
          }
          function f(z) {
            delete c[z];
          }
          function g(z) {
            if (w) setTimeout(g, 0, z);
            else {
              var R = c[z];
              if (R) {
                w = !0;
                try {
                  (function(L) {
                    var P = L.callback, $ = L.args;
                    switch ($.length) {
                      case 0:
                        P();
                        break;
                      case 1:
                        P($[0]);
                        break;
                      case 2:
                        P($[0], $[1]);
                        break;
                      case 3:
                        P($[0], $[1], $[2]);
                        break;
                      default:
                        P.apply(i, $);
                    }
                  })(R);
                } finally {
                  f(z), w = !1;
                }
              }
            }
          }
          function x(z) {
            z.source === s && typeof z.data == "string" && z.data.indexOf(k) === 0 && g(+z.data.slice(k.length));
          }
        })(typeof self > "u" ? n === void 0 ? this : n : self);
      }).call(this, typeof ce < "u" ? ce : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(tn);
var Bn = tn.exports;
const Pn = /* @__PURE__ */ On(Bn);
function Dn(e = {}) {
  const {
    storageKey: o = "page-reviews",
    defaultPagePath: r = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = e;
  function h() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function u() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(o);
      return (g ? JSON.parse(g) : []).map(Ln);
    } catch {
      return [];
    }
  }
  function n(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(o, JSON.stringify(g));
      } catch {
      }
  }
  const s = mt(u()), i = () => s.value;
  function d(g) {
    const x = g || r();
    return s.value.filter((z) => z.pagePath === x);
  }
  function _(g) {
    const x = {
      id: h(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s.value.unshift(x), n(s.value), x;
  }
  function S(g, x) {
    const z = s.value.findIndex((R) => R.id === g);
    z > -1 && (s.value[z] = { ...s.value[z], ...x }, n(s.value));
  }
  function k(g) {
    s.value = s.value.filter((x) => x.id !== g), n(s.value);
  }
  function y(g) {
    const x = g || r();
    s.value = s.value.filter((z) => z.pagePath !== x), n(s.value);
  }
  function c() {
    s.value = [], n([]);
  }
  function w() {
    return {
      exportTime: (/* @__PURE__ */ new Date()).toISOString(),
      total: s.value.length,
      reviews: s.value
    };
  }
  function l() {
    ke(
      new Blob([JSON.stringify(w(), null, 2)], { type: "application/json" }),
      `page-reviews-${xe()}.json`
    );
  }
  function m() {
    const g = Ve(w());
    ke(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${xe()}.md`
    );
  }
  async function f() {
    const g = new Pn(), x = w(), z = {
      ...x,
      reviews: x.reviews.map((P) => {
        var $;
        return {
          ...P,
          screenshots: ($ = P.screenshots) == null ? void 0 : $.map((O) => O.url ? { type: O.type, filename: O.filename, url: O.url } : { type: O.type, filename: O.filename, imagePath: `images/${O.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(z, null, 2)), g.file("review.md", Ve(z));
    const R = g.folder("images");
    for (const P of x.reviews)
      for (const $ of P.screenshots || [])
        if ($.data && !$.url) {
          const O = $.data.replace(/^data:image\/png;base64,/, "");
          R.file($.filename, O, { base64: !0 });
        }
    const L = await g.generateAsync({ type: "blob" });
    ke(L, `page-reviews-${xe()}.zip`);
  }
  return {
    reviews: s,
    allReviews: i,
    getPageReviews: d,
    addReview: _,
    updateReview: S,
    deleteReview: k,
    clearPageReviews: y,
    clearAllReviews: c,
    exportToJSON: l,
    exportToMarkdown: m,
    exportToZIP: f
  };
}
function Ln(e) {
  if (!e || e.targets) return e;
  const o = e.type === "element" ? {
    type: "element",
    selector: e.selector,
    elementText: e.elementText,
    elementRect: e.elementRect,
    componentTree: e.componentTree,
    aria: e.aria,
    locators: e.locators
  } : {
    type: "viewport",
    viewportRect: e.viewportRect
  };
  return {
    ...e,
    targets: [o]
  };
}
function Ve(e) {
  const o = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${e.total}`,
    ""
  ], r = Nn(e.reviews, "pagePath");
  return Object.entries(r).forEach(([h, u]) => {
    o.push(`## 页面：${h}`), o.push(""), u.forEach((n, s) => {
      var d, _, S, k;
      o.push(`### ${s + 1}. ${n.title || "未命名评审"}`), o.push(`- **严重等级**：${Fn(n.severity)}`), o.push(`- **状态**：${n.status === "resolved" ? "已解决" : "待处理"}`), o.push(`- **窗口尺寸**：${(d = n.viewport) == null ? void 0 : d.width} × ${(_ = n.viewport) == null ? void 0 : _.height}`), n.scroll && o.push(`- **滚动位置**：x=${n.scroll.x}, y=${n.scroll.y}`);
      const i = n.targets || [];
      i.length > 0 && (o.push(`- **评审目标数**：${i.length}`), i.forEach((y, c) => {
        y.type === "element" && y.elementRect ? (o.push(`  - 目标 ${c + 1}（元素）：\`${y.selector}\` x=${y.elementRect.x}, y=${y.elementRect.y}, w=${y.elementRect.width}, h=${y.elementRect.height}`), y.elementText && o.push(`    文本：${y.elementText}`)) : y.viewportRect && o.push(`  - 目标 ${c + 1}（框选）：x=${y.viewportRect.x}, y=${y.viewportRect.y}, w=${y.viewportRect.width}, h=${y.viewportRect.height}`);
      })), o.push(`- **评审建议**：${n.suggestion}`), o.push(`- **创建时间**：${new Date(n.createdAt).toLocaleString()}`), n.locators && Object.keys(n.locators).length > 0 && (o.push(""), o.push("#### 定位信息"), n.locators.cssSelector && o.push(`- **CSS Selector**: \`${n.locators.cssSelector}\``), n.locators.xpath && o.push(`- **XPath**: \`${n.locators.xpath}\``), (S = n.locators.aria) != null && S.role && o.push(`- **ARIA Role**: ${n.locators.aria.role}`), (k = n.locators.aria) != null && k.accessibleName && o.push(`- **Accessible Name**: ${n.locators.aria.accessibleName}`), n.locators.testId && o.push(`- **data-testid**: ${n.locators.testId}`)), n.screenshots && n.screenshots.length > 0 && (o.push(""), o.push("#### 截图"), n.screenshots.forEach((y) => {
        const c = y.url || y.imagePath || `images/${y.filename}`;
        o.push(`![${y.type}](${c})`);
      })), o.push("");
    });
  }), o.join(`
`);
}
function ke(e, o) {
  if (typeof window > "u") return;
  const r = URL.createObjectURL(e), h = document.createElement("a");
  h.href = r, h.download = o, document.body.appendChild(h), h.click(), document.body.removeChild(h), URL.revokeObjectURL(r);
}
function xe() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}${he(e.getMonth() + 1)}${he(e.getDate())}-${he(e.getHours())}${he(e.getMinutes())}`;
}
function he(e) {
  return String(e).padStart(2, "0");
}
function Fn(e) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[e] || e;
}
function Nn(e, o) {
  return e.reduce((r, h) => {
    const u = h[o] || "unknown";
    return r[u] || (r[u] = []), r[u].push(h), r;
  }, {});
}
function Un(e, o) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const r = document.implementation.createHTMLDocument(), h = r.createElement("base"), u = r.createElement("a");
  return r.head.appendChild(h), r.body.appendChild(u), o && (h.href = o), u.href = e, u.href;
}
const Mn = /* @__PURE__ */ (() => {
  let e = 0;
  const o = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${o()}${e}`);
})();
function Ht(e) {
  const o = [];
  for (let r = 0, h = e.length; r < h; r++)
    o.push(e[r]);
  return o;
}
let ne = null;
function en(e = {}) {
  return ne || (e.includeStyleProperties ? (ne = e.includeStyleProperties, ne) : (ne = Ht(window.getComputedStyle(document.documentElement)), ne));
}
function fe(e, o) {
  const h = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(o);
  return h ? parseFloat(h.replace("px", "")) : 0;
}
function jn(e) {
  const o = fe(e, "border-left-width"), r = fe(e, "border-right-width");
  return e.clientWidth + o + r;
}
function $n(e) {
  const o = fe(e, "border-top-width"), r = fe(e, "border-bottom-width");
  return e.clientHeight + o + r;
}
function nn(e, o = {}) {
  const r = o.width || jn(e), h = o.height || $n(e);
  return { width: r, height: h };
}
function Wn() {
  let e, o;
  try {
    o = process;
  } catch {
  }
  const r = o && o.env ? o.env.devicePixelRatio : null;
  return r && (e = parseInt(r, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Pt = 16384;
function Zn(e) {
  (e.width > Pt || e.height > Pt) && (e.width > Pt && e.height > Pt ? e.width > e.height ? (e.height *= Pt / e.width, e.width = Pt) : (e.width *= Pt / e.height, e.height = Pt) : e.width > Pt ? (e.height *= Pt / e.width, e.width = Pt) : (e.width *= Pt / e.height, e.height = Pt));
}
function pe(e) {
  return new Promise((o, r) => {
    const h = new Image();
    h.onload = () => {
      h.decode().then(() => {
        requestAnimationFrame(() => o(h));
      });
    }, h.onerror = r, h.crossOrigin = "anonymous", h.decoding = "async", h.src = e;
  });
}
async function Hn(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((o) => `data:image/svg+xml;charset=utf-8,${o}`);
}
async function Vn(e, o, r) {
  const h = "http://www.w3.org/2000/svg", u = document.createElementNS(h, "svg"), n = document.createElementNS(h, "foreignObject");
  return u.setAttribute("width", `${o}`), u.setAttribute("height", `${r}`), u.setAttribute("viewBox", `0 0 ${o} ${r}`), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("x", "0"), n.setAttribute("y", "0"), n.setAttribute("externalResourcesRequired", "true"), u.appendChild(n), n.appendChild(e), Hn(u);
}
const It = (e, o) => {
  if (e instanceof o)
    return !0;
  const r = Object.getPrototypeOf(e);
  return r === null ? !1 : r.constructor.name === o.name || It(r, o);
};
function Gn(e) {
  const o = e.getPropertyValue("content");
  return `${e.cssText} content: '${o.replace(/'|"/g, "")}';`;
}
function Xn(e, o) {
  return en(o).map((r) => {
    const h = e.getPropertyValue(r), u = e.getPropertyPriority(r);
    return `${r}: ${h}${u ? " !important" : ""};`;
  }).join(" ");
}
function Yn(e, o, r, h) {
  const u = `.${e}:${o}`, n = r.cssText ? Gn(r) : Xn(r, h);
  return document.createTextNode(`${u}{${n}}`);
}
function Ge(e, o, r, h) {
  const u = window.getComputedStyle(e, r), n = u.getPropertyValue("content");
  if (n === "" || n === "none")
    return;
  const s = Mn();
  try {
    o.className = `${o.className} ${s}`;
  } catch {
    return;
  }
  const i = document.createElement("style");
  i.appendChild(Yn(s, r, u, h)), o.appendChild(i);
}
function Kn(e, o, r) {
  Ge(e, o, ":before", r), Ge(e, o, ":after", r);
}
const Xe = "application/font-woff", Ye = "image/jpeg", qn = {
  woff: Xe,
  woff2: Xe,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Ye,
  jpeg: Ye,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Jn(e) {
  const o = /\.([^./]*?)$/g.exec(e);
  return o ? o[1] : "";
}
function Ae(e) {
  const o = Jn(e).toLowerCase();
  return qn[o] || "";
}
function Qn(e) {
  return e.split(/,/)[1];
}
function Re(e) {
  return e.search(/^(data:)/) !== -1;
}
function tr(e, o) {
  return `data:${o};base64,${e}`;
}
async function rn(e, o, r) {
  const h = await fetch(e, o);
  if (h.status === 404)
    throw new Error(`Resource "${h.url}" not found`);
  const u = await h.blob();
  return new Promise((n, s) => {
    const i = new FileReader();
    i.onerror = s, i.onloadend = () => {
      try {
        n(r({ res: h, result: i.result }));
      } catch (d) {
        s(d);
      }
    }, i.readAsDataURL(u);
  });
}
const Se = {};
function er(e, o, r) {
  let h = e.replace(/\?.*/, "");
  return r && (h = e), /ttf|otf|eot|woff2?/i.test(h) && (h = h.replace(/.*\//, "")), o ? `[${o}]${h}` : h;
}
async function Te(e, o, r) {
  const h = er(e, o, r.includeQueryParams);
  if (Se[h] != null)
    return Se[h];
  r.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let u;
  try {
    const n = await rn(e, r.fetchRequestInit, ({ res: s, result: i }) => (o || (o = s.headers.get("Content-Type") || ""), Qn(i)));
    u = tr(n, o);
  } catch (n) {
    u = r.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    n && (s = typeof n == "string" ? n : n.message), s && console.warn(s);
  }
  return Se[h] = u, u;
}
async function nr(e) {
  const o = e.toDataURL();
  return o === "data:," ? e.cloneNode(!1) : pe(o);
}
async function rr(e, o) {
  if (e.currentSrc) {
    const n = document.createElement("canvas"), s = n.getContext("2d");
    n.width = e.clientWidth, n.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, n.width, n.height);
    const i = n.toDataURL();
    return pe(i);
  }
  const r = e.poster, h = Ae(r), u = await Te(r, h, o);
  return pe(u);
}
async function ir(e, o) {
  var r;
  try {
    if (!((r = e == null ? void 0 : e.contentDocument) === null || r === void 0) && r.body)
      return await ge(e.contentDocument.body, o, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function ar(e, o) {
  return It(e, HTMLCanvasElement) ? nr(e) : It(e, HTMLVideoElement) ? rr(e, o) : It(e, HTMLIFrameElement) ? ir(e, o) : e.cloneNode(an(e));
}
const sr = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", an = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function or(e, o, r) {
  var h, u;
  if (an(o))
    return o;
  let n = [];
  return sr(e) && e.assignedNodes ? n = Ht(e.assignedNodes()) : It(e, HTMLIFrameElement) && (!((h = e.contentDocument) === null || h === void 0) && h.body) ? n = Ht(e.contentDocument.body.childNodes) : n = Ht(((u = e.shadowRoot) !== null && u !== void 0 ? u : e).childNodes), n.length === 0 || It(e, HTMLVideoElement) || await n.reduce((s, i) => s.then(() => ge(i, r)).then((d) => {
    d && o.appendChild(d);
  }), Promise.resolve()), o;
}
function lr(e, o, r) {
  const h = o.style;
  if (!h)
    return;
  const u = window.getComputedStyle(e);
  u.cssText ? (h.cssText = u.cssText, h.transformOrigin = u.transformOrigin) : en(r).forEach((n) => {
    let s = u.getPropertyValue(n);
    n === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), It(e, HTMLIFrameElement) && n === "display" && s === "inline" && (s = "block"), n === "d" && o.getAttribute("d") && (s = `path(${o.getAttribute("d")})`), h.setProperty(n, s, u.getPropertyPriority(n));
  });
}
function ur(e, o) {
  It(e, HTMLTextAreaElement) && (o.innerHTML = e.value), It(e, HTMLInputElement) && o.setAttribute("value", e.value);
}
function cr(e, o) {
  if (It(e, HTMLSelectElement)) {
    const r = o, h = Array.from(r.children).find((u) => e.value === u.getAttribute("value"));
    h && h.setAttribute("selected", "");
  }
}
function dr(e, o, r) {
  return It(o, Element) && (lr(e, o, r), Kn(e, o, r), ur(e, o), cr(e, o)), o;
}
async function hr(e, o) {
  const r = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (r.length === 0)
    return e;
  const h = {};
  for (let n = 0; n < r.length; n++) {
    const i = r[n].getAttribute("xlink:href");
    if (i) {
      const d = e.querySelector(i), _ = document.querySelector(i);
      !d && _ && !h[i] && (h[i] = await ge(_, o, !0));
    }
  }
  const u = Object.values(h);
  if (u.length) {
    const n = "http://www.w3.org/1999/xhtml", s = document.createElementNS(n, "svg");
    s.setAttribute("xmlns", n), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const i = document.createElementNS(n, "defs");
    s.appendChild(i);
    for (let d = 0; d < u.length; d++)
      i.appendChild(u[d]);
    e.appendChild(s);
  }
  return e;
}
async function ge(e, o, r) {
  return !r && o.filter && !o.filter(e) ? null : Promise.resolve(e).then((h) => ar(h, o)).then((h) => or(e, h, o)).then((h) => dr(e, h, o)).then((h) => hr(h, o));
}
const sn = /url\((['"]?)([^'"]+?)\1\)/g, fr = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, pr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function mr(e) {
  const o = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${o})(['"]?\\))`, "g");
}
function gr(e) {
  const o = [];
  return e.replace(sn, (r, h, u) => (o.push(u), r)), o.filter((r) => !Re(r));
}
async function vr(e, o, r, h, u) {
  try {
    const n = r ? Un(o, r) : o, s = Ae(o);
    let i;
    return u || (i = await Te(n, s, h)), e.replace(mr(o), `$1${i}$3`);
  } catch {
  }
  return e;
}
function wr(e, { preferredFontFormat: o }) {
  return o ? e.replace(pr, (r) => {
    for (; ; ) {
      const [h, , u] = fr.exec(r) || [];
      if (!u)
        return "";
      if (u === o)
        return `src: ${h};`;
    }
  }) : e;
}
function on(e) {
  return e.search(sn) !== -1;
}
async function ln(e, o, r) {
  if (!on(e))
    return e;
  const h = wr(e, r);
  return gr(h).reduce((n, s) => n.then((i) => vr(i, s, o, r)), Promise.resolve(h));
}
async function re(e, o, r) {
  var h;
  const u = (h = o.style) === null || h === void 0 ? void 0 : h.getPropertyValue(e);
  if (u) {
    const n = await ln(u, null, r);
    return o.style.setProperty(e, n, o.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function yr(e, o) {
  await re("background", e, o) || await re("background-image", e, o), await re("mask", e, o) || await re("-webkit-mask", e, o) || await re("mask-image", e, o) || await re("-webkit-mask-image", e, o);
}
async function _r(e, o) {
  const r = It(e, HTMLImageElement);
  if (!(r && !Re(e.src)) && !(It(e, SVGImageElement) && !Re(e.href.baseVal)))
    return;
  const h = r ? e.src : e.href.baseVal, u = await Te(h, Ae(h), o);
  await new Promise((n, s) => {
    e.onload = n, e.onerror = o.onImageErrorHandler ? (...d) => {
      try {
        n(o.onImageErrorHandler(...d));
      } catch (_) {
        s(_);
      }
    } : s;
    const i = e;
    i.decode && (i.decode = n), i.loading === "lazy" && (i.loading = "eager"), r ? (e.srcset = "", e.src = u) : e.href.baseVal = u;
  });
}
async function br(e, o) {
  const h = Ht(e.childNodes).map((u) => un(u, o));
  await Promise.all(h).then(() => e);
}
async function un(e, o) {
  It(e, Element) && (await yr(e, o), await _r(e, o), await br(e, o));
}
function kr(e, o) {
  const { style: r } = e;
  o.backgroundColor && (r.backgroundColor = o.backgroundColor), o.width && (r.width = `${o.width}px`), o.height && (r.height = `${o.height}px`);
  const h = o.style;
  return h != null && Object.keys(h).forEach((u) => {
    r[u] = h[u];
  }), e;
}
const Ke = {};
async function qe(e) {
  let o = Ke[e];
  if (o != null)
    return o;
  const h = await (await fetch(e)).text();
  return o = { url: e, cssText: h }, Ke[e] = o, o;
}
async function Je(e, o) {
  let r = e.cssText;
  const h = /url\(["']?([^"')]+)["']?\)/g, n = (r.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let i = s.replace(h, "$1");
    return i.startsWith("https://") || (i = new URL(i, e.url).href), rn(i, o.fetchRequestInit, ({ result: d }) => (r = r.replace(s, `url(${d})`), [s, d]));
  });
  return Promise.all(n).then(() => r);
}
function Qe(e) {
  if (e == null)
    return [];
  const o = [], r = /(\/\*[\s\S]*?\*\/)/gi;
  let h = e.replace(r, "");
  const u = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const d = u.exec(h);
    if (d === null)
      break;
    o.push(d[0]);
  }
  h = h.replace(u, "");
  const n = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", i = new RegExp(s, "gi");
  for (; ; ) {
    let d = n.exec(h);
    if (d === null) {
      if (d = i.exec(h), d === null)
        break;
      n.lastIndex = i.lastIndex;
    } else
      i.lastIndex = n.lastIndex;
    o.push(d[0]);
  }
  return o;
}
async function xr(e, o) {
  const r = [], h = [];
  return e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Ht(u.cssRules || []).forEach((n, s) => {
          if (n.type === CSSRule.IMPORT_RULE) {
            let i = s + 1;
            const d = n.href, _ = qe(d).then((S) => Je(S, o)).then((S) => Qe(S).forEach((k) => {
              try {
                u.insertRule(k, k.startsWith("@import") ? i += 1 : u.cssRules.length);
              } catch (y) {
                console.error("Error inserting rule from remote css", {
                  rule: k,
                  error: y
                });
              }
            })).catch((S) => {
              console.error("Error loading remote css", S.toString());
            });
            h.push(_);
          }
        });
      } catch (n) {
        const s = e.find((i) => i.href == null) || document.styleSheets[0];
        u.href != null && h.push(qe(u.href).then((i) => Je(i, o)).then((i) => Qe(i).forEach((d) => {
          s.insertRule(d, s.cssRules.length);
        })).catch((i) => {
          console.error("Error loading remote stylesheet", i);
        })), console.error("Error inlining remote css file", n);
      }
  }), Promise.all(h).then(() => (e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Ht(u.cssRules || []).forEach((n) => {
          r.push(n);
        });
      } catch (n) {
        console.error(`Error while reading CSS rules from ${u.href}`, n);
      }
  }), r));
}
function Sr(e) {
  return e.filter((o) => o.type === CSSRule.FONT_FACE_RULE).filter((o) => on(o.style.getPropertyValue("src")));
}
async function Er(e, o) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const r = Ht(e.ownerDocument.styleSheets), h = await xr(r, o);
  return Sr(h);
}
function cn(e) {
  return e.trim().replace(/["']/g, "");
}
function Cr(e) {
  const o = /* @__PURE__ */ new Set();
  function r(h) {
    (h.style.fontFamily || getComputedStyle(h).fontFamily).split(",").forEach((n) => {
      o.add(cn(n));
    }), Array.from(h.children).forEach((n) => {
      n instanceof HTMLElement && r(n);
    });
  }
  return r(e), o;
}
async function zr(e, o) {
  const r = await Er(e, o), h = Cr(e);
  return (await Promise.all(r.filter((n) => h.has(cn(n.style.fontFamily))).map((n) => {
    const s = n.parentStyleSheet ? n.parentStyleSheet.href : null;
    return ln(n.cssText, s, o);
  }))).join(`
`);
}
async function Rr(e, o) {
  const r = o.fontEmbedCSS != null ? o.fontEmbedCSS : o.skipFonts ? null : await zr(e, o);
  if (r) {
    const h = document.createElement("style"), u = document.createTextNode(r);
    h.appendChild(u), e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h);
  }
}
async function Ar(e, o = {}) {
  const { width: r, height: h } = nn(e, o), u = await ge(e, o, !0);
  return await Rr(u, o), await un(u, o), kr(u, o), await Vn(u, r, h);
}
async function Tr(e, o = {}) {
  const { width: r, height: h } = nn(e, o), u = await Ar(e, o), n = await pe(u), s = document.createElement("canvas"), i = s.getContext("2d"), d = o.pixelRatio || Wn(), _ = o.canvasWidth || r, S = o.canvasHeight || h;
  return s.width = _ * d, s.height = S * d, o.skipAutoScale || Zn(s), s.style.width = `${_}`, s.style.height = `${S}`, o.backgroundColor && (i.fillStyle = o.backgroundColor, i.fillRect(0, 0, s.width, s.height)), i.drawImage(n, 0, 0, s.width, s.height), s;
}
async function Ie(e, o = {}) {
  return (await Tr(e, o)).toDataURL();
}
const jt = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box",
  TARGETS: "targets"
};
function Ee(e) {
  const o = Date.now(), r = Math.random().toString(36).slice(2, 6);
  return `screenshot-${e}-${o}-${r}.png`;
}
async function dn(e, o = {}) {
  if (!e) return null;
  try {
    return await Ie(e, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
  } catch (r) {
    return console.error("captureElement failed:", r), null;
  }
}
async function Ir(e = {}) {
  const o = document.documentElement;
  return dn(o, {
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
async function Or(e = {}) {
  const o = document.documentElement, r = o.style.overflow, h = o.style.width, u = o.style.height;
  try {
    return o.style.overflow = "visible", o.style.width = "auto", o.style.height = "auto", await Ie(o, {
      pixelRatio: e.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...e
    });
  } catch (n) {
    return console.error("captureFullPage failed:", n), null;
  } finally {
    o.style.overflow = r, o.style.width = h, o.style.height = u;
  }
}
async function Br(e, o = {}) {
  if (!e || e.width < 1 || e.height < 1) return null;
  const r = document.documentElement, h = r.style.overflow, u = r.style.width, n = r.style.height;
  try {
    r.style.overflow = "visible", r.style.width = "auto", r.style.height = "auto";
    const s = await Ie(r, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
    return Pr(s, e);
  } catch (s) {
    return console.error("captureBox failed:", s), null;
  } finally {
    r.style.overflow = h, r.style.width = u, r.style.height = n;
  }
}
function Pr(e, o) {
  return new Promise((r, h) => {
    const u = new Image();
    u.onload = () => {
      const n = document.createElement("canvas"), s = window.devicePixelRatio || 1;
      n.width = Math.round(o.width * s), n.height = Math.round(o.height * s), n.getContext("2d").drawImage(
        u,
        o.x * s,
        o.y * s,
        o.width * s,
        o.height * s,
        0,
        0,
        n.width,
        n.height
      ), r(n.toDataURL("image/png"));
    }, u.onerror = h, u.src = e;
  });
}
async function Dr(e) {
  return (await fetch(e)).blob();
}
async function Ce(e, o, r) {
  if (!r) return null;
  try {
    const h = await Dr(e);
    return await r(h, o);
  } catch (h) {
    return console.error("uploadScreenshot failed:", h), null;
  }
}
function hn(e) {
  var u;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return "#" + e.id;
  const o = e.tagName.toLowerCase();
  if (e.className) {
    const n = String(e.className).split(/\s+/).filter((s) => s && !s.startsWith("el-") && !/^__/.test(s)).slice(0, 2);
    if (n.length) return o + "." + n.join(".");
  }
  let r = [], h = e;
  for (; h && h !== document.body; ) {
    let n = h.tagName.toLowerCase();
    if (h.id) {
      n += "#" + h.id, r.unshift(n);
      break;
    }
    const i = Array.from(((u = h.parentNode) == null ? void 0 : u.children) || []).filter((d) => d.tagName === h.tagName);
    if (i.length > 1) {
      const d = i.indexOf(h) + 1;
      n += `:nth-of-type(${d})`;
    }
    r.unshift(n), h = h.parentNode;
  }
  return r.join(" > ");
}
function Lr(e) {
  var h;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return `//*[@id="${e.id}"]`;
  const o = [];
  let r = e;
  for (; r && r !== document.body; ) {
    const s = Array.from(((h = r.parentNode) == null ? void 0 : h.children) || []).filter((i) => i.tagName === r.tagName).indexOf(r) + 1;
    o.unshift(`${r.tagName.toLowerCase()}[${s}]`), r = r.parentNode;
  }
  return o.unshift(""), "/html/body/" + o.slice(1).join("/");
}
function Fr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return {};
  const o = {}, r = e.getAttribute("role") || Nr(e);
  r && (o.role = r);
  const h = Ur(e);
  h && (o.accessibleName = h);
  const u = e.getAttribute("aria-labelledby");
  return u && (o.labeledBy = u), Object.keys(o).length ? o : void 0;
}
function Nr(e) {
  const o = e.tagName.toLowerCase(), r = e.getAttribute("type");
  return {
    button: "button",
    a: e.hasAttribute("href") ? "link" : void 0,
    input: r === "checkbox" ? "checkbox" : r === "radio" ? "radio" : r === "text" || !r ? "textbox" : void 0,
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
function Ur(e) {
  var n, s;
  if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
  const o = e.getAttribute("aria-labelledby");
  if (o) {
    const i = o.split(/\s+/).map((d) => {
      var _, S;
      return (S = (_ = document.getElementById(d)) == null ? void 0 : _.textContent) == null ? void 0 : S.trim();
    }).filter(Boolean);
    if (i.length) return i.join(" ");
  }
  const r = (n = e.labels) == null ? void 0 : n[0];
  if (r) return r.textContent.trim();
  if (e.tagName.toLowerCase() === "input" && e.placeholder) return e.placeholder.trim();
  const h = e.getAttribute("alt");
  if (h) return h.trim();
  const u = e.getAttribute("title");
  if (u) return u.trim();
  if (["button", "a"].includes(e.tagName.toLowerCase())) {
    const i = (s = e.textContent) == null ? void 0 : s.trim();
    if (i) return i;
  }
  return "";
}
function Mr(e) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? void 0 : e.getAttribute("data-testid") || void 0;
}
function me(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return null;
  const o = e.getBoundingClientRect();
  return {
    tag: e.tagName.toLowerCase(),
    id: e.id || void 0,
    classes: e.className ? String(e.className).split(/\s+/).filter(Boolean) : void 0,
    selector: hn(e),
    xpath: Lr(e),
    rect: {
      x: o.left + window.scrollX,
      y: o.top + window.scrollY,
      width: o.width,
      height: o.height
    },
    aria: Fr(e),
    testId: Mr(e)
  };
}
function jr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const o = [];
  let r = e;
  for (; r && r !== document.body; )
    o.unshift(r), r = r.parentElement;
  return r === document.body && o.unshift(document.body), o.map(me).filter(Boolean);
}
function $r(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const o = Wr(e);
  if (o.length) return o;
  const r = Hr(e);
  return r.length ? r : [];
}
function Wr(e) {
  const o = [];
  let r = e;
  for (; r; ) {
    const h = Zr(r);
    h && !o.find((u) => u.componentName === h.componentName && u.selector === h.selector) && o.unshift(h), r = r.parentElement;
  }
  return o;
}
function Zr(e) {
  var n, s, i, d, _;
  const r = Object.keys(e || {}).find((S) => S.startsWith("__vue"));
  if (!r) return null;
  const h = e[r], u = ((n = h == null ? void 0 : h.type) == null ? void 0 : n.name) || ((s = h == null ? void 0 : h.type) == null ? void 0 : s.__name) || ((d = (i = h == null ? void 0 : h.parent) == null ? void 0 : i.type) == null ? void 0 : d.name);
  return u ? {
    componentName: u,
    selector: hn(e),
    rect: (_ = me(e)) == null ? void 0 : _.rect
  } : null;
}
function Hr(e) {
  const o = [], r = Object.keys(e || {}).find((u) => u.startsWith("__reactFiber$"));
  if (!r) return o;
  let h = e[r];
  for (; h; ) {
    const u = Vr(h);
    u && !o.find((n) => n.componentName === u) && o.unshift({ componentName: u, selector: void 0, rect: void 0 }), h = h.return;
  }
  return o;
}
function Vr(e) {
  var o;
  if (!e) return null;
  if (typeof e.type == "function") return e.type.displayName || e.type.name || null;
  if (typeof e.type == "string") return null;
  if (e.elementType) {
    if (typeof e.elementType == "function") return e.elementType.displayName || e.elementType.name || null;
    if (typeof e.elementType == "object" && ((o = e.elementType) != null && o.$$typeof)) return e.elementType.name || null;
  }
  return null;
}
function ze(e) {
  return {
    dom: jr(e),
    framework: $r(e)
  };
}
const Gr = (e, o) => {
  const r = e.__vccOpts || e;
  for (const [h, u] of o)
    r[h] = u;
  return r;
}, Xr = { class: "toolbar-left" }, Yr = { class: "toolbar-right" }, Kr = { class: "highlight-label" }, qr = ["onClick"], Jr = { class: "highlight-label" }, Qr = ["onClick"], ti = ["onMousedown"], ei = ["onClick"], ni = ["onMousedown"], ri = { class: "modal-body" }, ii = { class: "review-targets-summary" }, ai = { class: "text-muted" }, si = { class: "text-muted" }, oi = { class: "modal-footer" }, li = {
  key: 1,
  class: "tree-panel"
}, ui = {
  key: 0,
  class: "tree-section"
}, ci = { class: "tree-list" }, di = ["onMouseenter", "onClick"], hi = { class: "node-name" }, fi = { class: "tree-section" }, pi = { class: "tree-list" }, mi = ["onMouseenter", "onClick"], gi = { class: "node-tag" }, vi = {
  key: 0,
  class: "node-id"
}, wi = {
  key: 1,
  class: "node-aria"
}, yi = {
  key: 2,
  class: "node-testid"
}, _i = { class: "review-list-actions" }, bi = {
  key: 1,
  class: "review-list"
}, ki = { class: "review-item-header" }, xi = { class: "review-item-title" }, Si = { class: "review-item-tags" }, Ei = { class: "review-item-target" }, Ci = { class: "review-item-suggestion" }, zi = { class: "review-item-meta" }, Ri = { class: "text-muted" }, Ai = { class: "review-item-actions" }, Ti = {
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
  setup(e, { expose: o, emit: r }) {
    const h = e, u = r, n = ee(() => h.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: s, getPageReviews: i, addReview: d, updateReview: _, deleteReview: S, clearPageReviews: k, exportToJSON: y, exportToMarkdown: c, exportToZIP: w } = Dn({
      storageKey: h.storageKey,
      defaultPagePath: () => n.value
    }), l = ee(() => i(n.value)), m = mt("element"), f = mt(!1), g = mt(!1), x = mt(!1), z = mt(null), R = mt(""), L = mt([]), P = mt([]), $ = mt(0), O = mt(null), H = mt(null), rt = mt({ x: window.scrollX, y: window.scrollY }), b = mt(null), F = mt(!1), a = mt({ x: 0, y: 0 }), N = mt(null), at = mt(""), W = mt({ x: 0, y: 0, rect: null }), lt = mt({ x: 0, y: 0 }), V = mt({ width: null, height: null }), tt = mt(!1), B = mt({ x: 0, y: 0 }), I = mt(!1), Q = mt({ x: 0, y: 0, width: 0, height: 0 }), K = mt({ x: 0, y: 0 }), Y = mt({ width: 560, height: null }), wt = mt(!1), xt = mt({ x: 0, y: 0 }), ct = mt(!1), ht = mt({ x: 0, y: 0, width: 0, height: 0 }), _t = mt([]), it = mt({
      type: "element",
      title: "",
      severity: "medium",
      suggestion: "",
      targets: [],
      viewport: { width: 0, height: 0 },
      scroll: { x: 0, y: 0 },
      pagePath: "",
      pageUrl: "",
      pageName: "",
      aria: null,
      locators: null
    }), At = ee(() => L.value.length + P.value.length), Tt = ee(() => it.value.title.trim() && it.value.suggestion.trim()), t = ee(() => {
      const { x: A, y: E } = lt.value, Z = {
        transform: `translate(calc(-50% + ${A}px), ${E}px)`
      };
      return V.value.width && (Z.width = V.value.width + "px"), V.value.height && (Z.height = V.value.height + "px"), Z;
    }), U = ee(() => {
      const { x: A, y: E } = K.value, Z = {
        left: `calc(50% + ${A}px)`,
        top: `calc(50% + ${E}px)`,
        transform: "translate(-50%, -50%)",
        width: Y.value.width + "px"
      };
      return Y.value.height && (Z.height = Y.value.height + "px"), Z;
    }), D = [
      { position: "nw" },
      { position: "n" },
      { position: "ne" },
      { position: "w" },
      { position: "e" },
      { position: "sw" },
      { position: "s" },
      { position: "se" }
    ];
    function v(A) {
      return A ? {
        x: A.x - rt.value.x,
        y: A.y - rt.value.y,
        width: A.width,
        height: A.height
      } : null;
    }
    function p(A) {
      return A ? {
        left: A.x + "px",
        top: A.y + "px",
        width: A.width + "px",
        height: A.height + "px"
      } : {};
    }
    function C(A) {
      return A ? {
        left: A.x + "px",
        top: A.y + "px",
        width: A.width + "px",
        height: A.height + "px"
      } : {};
    }
    function M(A, E) {
      const et = {};
      return A.includes("n") && (et.top = -8 / 2 + "px"), A.includes("s") && (et.bottom = -8 / 2 + "px"), A.includes("w") && (et.left = -8 / 2 + "px"), A.includes("e") && (et.right = -8 / 2 + "px"), (A === "n" || A === "s") && (et.left = E.width / 2 - 8 / 2 + "px"), (A === "w" || A === "e") && (et.top = E.height / 2 - 8 / 2 + "px"), et.width = "8px", et.height = "8px", et;
    }
    function j(A) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[A] || "info";
    }
    function T(A) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[A] || A;
    }
    function G(A) {
      var E;
      return (E = A.targets) == null ? void 0 : E.some((Z) => {
        var et, ot;
        return (ot = (et = Z.componentTree) == null ? void 0 : et.dom) == null ? void 0 : ot.length;
      });
    }
    function J(A) {
      if (!A || A.length === 0) return "无目标";
      const E = A[0], Z = E.type === "element" ? E.elementText || E.selector || "元素" : `框选 x=${E.viewportRect.x}, y=${E.viewportRect.y}`;
      return A.length === 1 ? Z : `${Z} 等 ${A.length} 个目标`;
    }
    function X() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: n.value,
        pageUrl: window.location.href,
        pageName: h.pageName || n.value
      };
    }
    function nt(A) {
      var et;
      if (A.id) return "#" + A.id;
      if (A.className) {
        const ot = String(A.className).split(/\s+/).filter((zt) => zt && !zt.startsWith("el-")).slice(0, 2);
        if (ot.length) return A.tagName.toLowerCase() + "." + ot.join(".");
      }
      let E = [], Z = A;
      for (; Z && Z !== document.body; ) {
        let ot = Z.tagName.toLowerCase();
        if (Z.id) {
          ot += "#" + Z.id, E.unshift(ot);
          break;
        }
        const Lt = Array.from(((et = Z.parentNode) == null ? void 0 : et.children) || []).filter((Ft) => Ft.tagName === Z.tagName);
        if (Lt.length > 1) {
          const Ft = Lt.indexOf(Z) + 1;
          ot += `:nth-of-type(${Ft})`;
        }
        E.unshift(ot), Z = Z.parentNode;
      }
      return E.join(" > ");
    }
    function vt(A) {
      const E = A.target;
      return !E || !(E instanceof Element) || E.closest(".review-overlay") || E.closest(".el-dropdown-menu") || E.closest(".el-popper") || E.closest(".el-overlay") ? null : E;
    }
    function dt(A) {
      return A.ctrlKey || A.metaKey;
    }
    function Ct(A) {
      if (tt.value || N.value || m.value !== "element" || f.value || F.value) return;
      const E = vt(A);
      if (!E) {
        z.value = null;
        return;
      }
      const Z = E.getBoundingClientRect();
      z.value = {
        x: Z.left + window.scrollX,
        y: Z.top + window.scrollY,
        width: Z.width,
        height: Z.height
      }, R.value = E.tagName.toLowerCase();
    }
    function Wt() {
      z.value = null;
    }
    function Ot(A) {
      var ot;
      if (m.value !== "element" || f.value || F.value || N.value) return;
      const E = vt(A);
      if (!E) return;
      A.preventDefault(), A.stopPropagation();
      const Z = E.getBoundingClientRect(), et = {
        el: E,
        selector: nt(E),
        tag: E.tagName.toLowerCase(),
        text: ((ot = E.innerText) == null ? void 0 : ot.slice(0, 40)) || "",
        rect: {
          x: Z.left + window.scrollX,
          y: Z.top + window.scrollY,
          width: Z.width,
          height: Z.height
        }
      };
      if (dt(A)) {
        const zt = L.value.findIndex((Lt) => Lt.el === E);
        zt > -1 ? L.value.splice(zt, 1) : L.value.push(et);
      } else
        L.value = [et], P.value = [];
      L.value.length === 1 && (H.value = ze(E));
    }
    function Vt(A, E) {
      dt(E) && (E.stopPropagation(), bt(A));
    }
    function bt(A) {
      const E = L.value.findIndex((Z) => Z.el === A.el);
      E > -1 && L.value.splice(E, 1), L.value.length === 0 && (H.value = null);
    }
    function Gt(A) {
      tt.value || m.value !== "viewport" || f.value || N.value || vt(A) && (A.preventDefault(), F.value = !0, a.value = { x: A.clientX, y: A.clientY }, b.value = { x: a.value.x, y: a.value.y, width: 0, height: 0 });
    }
    function qt(A) {
      if (tt.value) return;
      if (N.value) {
        we(A);
        return;
      }
      if (!F.value) return;
      const E = A.clientX, Z = A.clientY;
      b.value = {
        x: Math.min(a.value.x, E),
        y: Math.min(a.value.y, Z),
        width: Math.abs(E - a.value.x),
        height: Math.abs(Z - a.value.y)
      };
    }
    function Dt(A) {
      if (tt.value) {
        tt.value = !1;
        return;
      }
      if (I.value) {
        I.value = !1;
        return;
      }
      if (wt.value) {
        wt.value = !1;
        return;
      }
      if (ct.value) {
        ct.value = !1;
        return;
      }
      if (N.value) {
        N.value = null, at.value = "", W.value = { x: 0, y: 0, rect: null };
        return;
      }
      F.value && (F.value = !1, b.value && b.value.width > 10 && b.value.height > 10 && (dt(A) || (L.value = []), P.value.push({
        id: "box-" + Date.now() + "-" + $.value++,
        index: P.value.length,
        rect: {
          x: b.value.x + window.scrollX,
          y: b.value.y + window.scrollY,
          width: b.value.width,
          height: b.value.height
        }
      })), b.value = null);
    }
    function ae(A, E) {
      dt(E) && (E.stopPropagation(), se(A));
    }
    function se(A) {
      P.value = P.value.filter((E) => E.id !== A.id), P.value.forEach((E, Z) => {
        E.index = Z;
      });
    }
    function ve(A, E, Z) {
      N.value = A.id, at.value = E, W.value = {
        x: Z.clientX + window.scrollX,
        y: Z.clientY + window.scrollY,
        rect: { ...A.rect }
      };
    }
    function we(A) {
      if (!N.value || !W.value.rect) return;
      const E = A.clientX + window.scrollX - W.value.x, Z = A.clientY + window.scrollY - W.value.y, et = W.value.rect, ot = P.value.find((te) => te.id === N.value);
      if (!ot) return;
      let { x: zt, y: Lt, width: Ft, height: Qt } = et;
      at.value.includes("e") && (Ft = Math.max(10, et.width + E)), at.value.includes("s") && (Qt = Math.max(10, et.height + Z)), at.value.includes("w") && (Ft = Math.max(10, et.width - E), zt = et.x + (et.width - Ft)), at.value.includes("n") && (Qt = Math.max(10, et.height - Z), Lt = et.y + (et.height - Qt)), ot.rect = { x: zt, y: Lt, width: Ft, height: Qt };
    }
    function oe(A) {
      var Z, et;
      ((Z = A.target.classList) != null && Z.contains("toolbar-title") || (et = A.target.classList) != null && et.contains("review-toolbar")) && (tt.value = !0, B.value = {
        x: A.clientX - lt.value.x,
        y: A.clientY - lt.value.y
      });
    }
    function Zt(A) {
      if (tt.value) {
        lt.value = {
          x: A.clientX - B.value.x,
          y: A.clientY - B.value.y
        };
        return;
      }
      if (I.value) {
        const E = A.clientX - Q.value.x, Z = A.clientY - Q.value.y;
        V.value = {
          width: Math.max(400, Q.value.width + E),
          height: Math.max(48, Q.value.height + Z)
        };
      }
    }
    function Jt(A) {
      I.value = !0;
      const E = A.target.closest(".review-toolbar"), Z = E == null ? void 0 : E.getBoundingClientRect();
      Q.value = {
        x: A.clientX,
        y: A.clientY,
        width: (Z == null ? void 0 : Z.width) || 0,
        height: (Z == null ? void 0 : Z.height) || 0
      };
    }
    function fn(A) {
      var E;
      (E = A.target.classList) != null && E.contains("modal-header") && (wt.value = !0, xt.value = {
        x: A.clientX - K.value.x,
        y: A.clientY - K.value.y
      });
    }
    function Oe(A) {
      if (wt.value)
        K.value = {
          x: A.clientX - xt.value.x,
          y: A.clientY - xt.value.y
        };
      else if (ct.value) {
        const E = A.clientX - ht.value.x, Z = A.clientY - ht.value.y;
        Y.value = {
          width: Math.max(360, ht.value.width + E),
          height: Math.max(300, ht.value.height + Z)
        };
      }
    }
    function pn(A) {
      ct.value = !0, ht.value = {
        x: A.clientX,
        y: A.clientY,
        width: Y.value.width,
        height: Y.value.height
      };
    }
    function Be(A) {
      A.key === "Escape" && (f.value ? f.value = !1 : Ne());
    }
    function Pe() {
      rt.value = { x: window.scrollX, y: window.scrollY };
    }
    function mn() {
    }
    function gn() {
      L.value.length === 0 && (H.value = null), x.value = !0;
    }
    function De(A) {
      if (!A.rect) {
        O.value = null;
        return;
      }
      O.value = A.rect;
    }
    function Le(A) {
      var et;
      if (!A.selector) return;
      const E = document.querySelector(A.selector);
      if (!E) return;
      const Z = E.getBoundingClientRect();
      L.value = [{
        el: E,
        selector: A.selector,
        tag: E.tagName.toLowerCase(),
        text: ((et = E.innerText) == null ? void 0 : et.slice(0, 40)) || "",
        rect: {
          x: Z.left + window.scrollX,
          y: Z.top + window.scrollY,
          width: Z.width,
          height: Z.height
        }
      }], P.value = [], H.value = ze(E), x.value = !1;
    }
    function ye() {
      L.value = [], P.value = [], H.value = null, b.value = null;
    }
    function vn() {
      const A = X(), E = wn(), Z = L.value[0], et = Z != null && Z.el ? me(Z.el) : null;
      it.value = {
        type: L.value.length > 0 ? "element" : "viewport",
        title: "",
        severity: "medium",
        suggestion: "",
        targets: E,
        viewport: A.viewport,
        scroll: A.scroll,
        pagePath: A.pagePath,
        pageUrl: A.pageUrl,
        pageName: A.pageName,
        aria: (et == null ? void 0 : et.aria) || null,
        locators: et ? Fe(et) : null
      }, _t.value = [], f.value = !0;
    }
    function wn() {
      const A = [];
      return L.value.forEach((E) => {
        const Z = E.el ? me(E.el) : null;
        A.push({
          type: "element",
          selector: E.selector,
          elementText: E.text,
          elementRect: E.rect,
          componentTree: Z ? ze(E.el) : null,
          aria: (Z == null ? void 0 : Z.aria) || null,
          locators: Z ? Fe(Z) : null
        });
      }), P.value.forEach((E) => {
        A.push({
          type: "viewport",
          viewportRect: E.rect
        });
      }), A;
    }
    function Fe(A) {
      const E = {};
      return A.selector && (E.cssSelector = A.selector), A.xpath && (E.xpath = A.xpath), A.aria && Object.keys(A.aria).length && (E.aria = A.aria), A.testId && (E.testId = A.testId), Object.keys(E).length ? E : null;
    }
    async function yn() {
      const A = [];
      for (const E of _t.value)
        if (E === jt.TARGETS)
          for (const Z of it.value.targets) {
            let et = null;
            if (Z.type === "element" && Z.elementRect) {
              const ot = document.querySelector(Z.selector);
              ot && (et = await dn(ot));
            } else Z.type === "viewport" && Z.viewportRect && (et = await Br(Z.viewportRect));
            if (et) {
              const ot = Ee(Z.type);
              let zt = null;
              h.imageUpload && (zt = await Ce(et, ot, h.imageUpload)), A.push({ type: Z.type, filename: ot, data: zt ? void 0 : et, url: zt || void 0 });
            }
          }
        else if (E === jt.VIEWPORT) {
          const Z = await Ir();
          if (Z) {
            const et = Ee(jt.VIEWPORT);
            let ot = null;
            h.imageUpload && (ot = await Ce(Z, et, h.imageUpload)), A.push({ type: jt.VIEWPORT, filename: et, data: ot ? void 0 : Z, url: ot || void 0 });
          }
        } else if (E === jt.FULL_PAGE) {
          const Z = await Or();
          if (Z) {
            const et = Ee(jt.FULL_PAGE);
            let ot = null;
            h.imageUpload && (ot = await Ce(Z, et, h.imageUpload)), A.push({ type: jt.FULL_PAGE, filename: et, data: ot ? void 0 : Z, url: ot || void 0 });
          }
        }
      return A;
    }
    function _n() {
      _t.value = [], it.value = {
        type: "element",
        title: "",
        severity: "medium",
        suggestion: "",
        targets: [],
        viewport: { width: 0, height: 0 },
        scroll: { x: 0, y: 0 },
        pagePath: "",
        pageUrl: "",
        pageName: "",
        aria: null,
        locators: null
      };
    }
    async function bn() {
      if (!Tt.value) return;
      const A = await yn(), E = d({
        type: it.value.type,
        title: it.value.title.trim(),
        severity: it.value.severity,
        suggestion: it.value.suggestion.trim(),
        targets: it.value.targets,
        viewport: it.value.viewport,
        scroll: it.value.scroll,
        pagePath: it.value.pagePath,
        pageUrl: it.value.pageUrl,
        pageName: it.value.pageName,
        status: "open",
        screenshots: A,
        aria: it.value.aria,
        locators: it.value.locators
      });
      f.value = !1, ye(), u("add", E);
    }
    function kn(A) {
      _(A, { status: "resolved" }), u("update", { id: A, status: "resolved" });
    }
    function xn(A) {
      He.confirm("确定删除这条评审意见吗？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        S(A), u("delete", { id: A });
      });
    }
    function Sn() {
      l.value.length !== 0 && He.confirm("确定清空当前页面的所有评审意见吗？", "清空确认", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        k(n.value), u("clear", { pagePath: n.value });
      });
    }
    function Ne() {
      u("update:active", !1);
    }
    function Ue() {
      document.addEventListener("mousemove", Ct), document.addEventListener("mouseout", Wt), document.addEventListener("click", Ot, !0), document.addEventListener("mousedown", Gt), document.addEventListener("mousemove", qt), document.addEventListener("mousemove", Zt), document.addEventListener("mousemove", Oe), document.addEventListener("mouseup", Dt), document.addEventListener("keydown", Be), window.addEventListener("scroll", Pe, !0);
    }
    function Me() {
      document.removeEventListener("mousemove", Ct), document.removeEventListener("mouseout", Wt), document.removeEventListener("click", Ot, !0), document.removeEventListener("mousedown", Gt), document.removeEventListener("mousemove", qt), document.removeEventListener("mousemove", Zt), document.removeEventListener("mousemove", Oe), document.removeEventListener("mouseup", Dt), document.removeEventListener("keydown", Be), window.removeEventListener("scroll", Pe, !0);
    }
    Rn(() => {
      h.active && Ue();
    }), Ze(() => {
      Me();
    });
    let _e = null;
    return An(() => {
      _e = Tn(() => h.active, (A) => {
        A ? (Ue(), m.value = "element") : (Me(), ye(), _n(), z.value = null, g.value = !1, x.value = !1);
      });
    }), Ze(() => {
      _e && _e();
    }), o({
      reviews: s,
      pageReviews: l,
      addReview: d,
      updateReview: _,
      deleteReview: S,
      clearPageReviews: k,
      exportToJSON: y,
      exportToMarkdown: c
    }), (A, E) => {
      const Z = Et("el-radio-button"), et = Et("el-radio-group"), ot = Et("el-button"), zt = Et("el-badge"), Lt = Et("el-dropdown-item"), Ft = Et("el-dropdown-menu"), Qt = Et("el-dropdown"), te = Et("el-tag"), Xt = Et("el-form-item"), be = Et("el-checkbox"), En = Et("el-checkbox-group"), je = Et("el-input"), le = Et("el-radio"), Cn = Et("el-form"), $e = Et("el-empty"), We = Et("el-drawer"), zn = Et("el-card");
      return pt(), Nt(In, { to: "body" }, [
        e.active ? (pt(), kt("div", {
          key: 0,
          class: "review-overlay",
          onClick: mn
        }, [
          ft("div", {
            class: ue(["review-toolbar", { "is-dragging": tt.value }]),
            style: $t(t.value),
            onClick: E[2] || (E[2] = Ut(() => {
            }, ["stop"])),
            onMousedown: oe
          }, [
            ft("div", Xr, [
              E[18] || (E[18] = ft("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              ut(et, {
                modelValue: m.value,
                "onUpdate:modelValue": E[0] || (E[0] = (q) => m.value = q),
                size: "small"
              }, {
                default: st(() => [
                  ut(Z, { label: "element" }, {
                    default: st(() => [...E[16] || (E[16] = [
                      gt("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  ut(Z, { label: "viewport" }, {
                    default: st(() => [...E[17] || (E[17] = [
                      gt("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            ft("div", Yr, [
              e.enableComponentTree ? (pt(), Nt(ot, {
                key: 0,
                size: "small",
                onClick: gn
              }, {
                default: st(() => [...E[19] || (E[19] = [
                  gt(" 组件树 ", -1)
                ])]),
                _: 1
              })) : Rt("", !0),
              ut(ot, {
                size: "small",
                type: "primary",
                disabled: At.value === 0,
                onClick: vn
              }, {
                default: st(() => [
                  gt(" 评审 (" + St(At.value) + ") ", 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              ut(ot, {
                size: "small",
                disabled: At.value === 0,
                onClick: ye
              }, {
                default: st(() => [...E[20] || (E[20] = [
                  gt(" 取消选择 ", -1)
                ])]),
                _: 1
              }, 8, ["disabled"]),
              ut(zt, {
                value: l.value.length,
                class: "review-badge"
              }, {
                default: st(() => [
                  ut(ot, {
                    size: "small",
                    onClick: E[1] || (E[1] = (q) => g.value = !0)
                  }, {
                    default: st(() => [...E[21] || (E[21] = [
                      gt("评审列表", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              ut(Qt, {
                size: "small",
                "split-button": "",
                type: "primary",
                onClick: Mt(c)
              }, {
                dropdown: st(() => [
                  ut(Ft, null, {
                    default: st(() => [
                      ut(Lt, { onClick: Mt(c) }, {
                        default: st(() => [...E[22] || (E[22] = [
                          gt("导出为 Markdown", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      ut(Lt, { onClick: Mt(y) }, {
                        default: st(() => [...E[23] || (E[23] = [
                          gt("导出为 JSON", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      e.enableZipExport ? (pt(), Nt(Lt, {
                        key: 0,
                        onClick: Mt(w)
                      }, {
                        default: st(() => [...E[24] || (E[24] = [
                          gt("导出为 ZIP", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])) : Rt("", !0)
                    ]),
                    _: 1
                  })
                ]),
                default: st(() => [
                  E[25] || (E[25] = gt(" 导出 ", -1))
                ]),
                _: 1
              }, 8, ["onClick"]),
              ut(ot, {
                size: "small",
                type: "danger",
                onClick: Ne
              }, {
                default: st(() => [...E[26] || (E[26] = [
                  gt("退出评审", -1)
                ])]),
                _: 1
              })
            ]),
            ft("div", {
              class: "toolbar-resize-handle",
              onMousedown: Ut(Jt, ["stop"])
            }, null, 32)
          ], 38),
          z.value && m.value === "element" && !F.value && !N.value ? (pt(), kt("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: $t(p(v(z.value)))
          }, [
            ft("span", Kr, St(R.value), 1)
          ], 4)) : Rt("", !0),
          (pt(!0), kt(Yt, null, Kt(L.value, (q, yt) => (pt(), kt("div", {
            key: "el-" + yt,
            class: "highlight-box selected-box",
            style: $t(p(v(q.rect))),
            onClick: Ut((Bt) => Vt(q, Bt), ["stop"])
          }, [
            ft("span", Jr, [
              gt(St(q.tag) + " ", 1),
              ft("i", {
                class: "remove-icon",
                onClick: Ut((Bt) => bt(q), ["stop"])
              }, "×", 8, Qr)
            ])
          ], 12, qr))), 128)),
          O.value ? (pt(), kt("div", {
            key: 1,
            class: "highlight-box tree-hover-box",
            style: $t(p(v(O.value)))
          }, null, 4)) : Rt("", !0),
          (pt(!0), kt(Yt, null, Kt(P.value, (q) => (pt(), kt("div", {
            key: q.id,
            class: ue(["drag-rect selected-box", { "is-resizing": N.value === q.id }]),
            style: $t(C(v(q.rect))),
            onMousedown: Ut((yt) => ae(q, yt), ["stop"])
          }, [
            ft("span", {
              class: "box-label",
              onMousedown: E[3] || (E[3] = Ut(() => {
              }, ["stop"]))
            }, [
              gt(" 框选 " + St(q.index + 1) + " ", 1),
              ft("i", {
                class: "remove-icon",
                onClick: Ut((yt) => se(q), ["stop"])
              }, "×", 8, ei)
            ], 32),
            (pt(), kt(Yt, null, Kt(D, (yt) => ft("div", {
              key: yt.position,
              class: ue(["resize-handle", "handle-" + yt.position]),
              style: $t(M(yt.position, q.rect)),
              onMousedown: Ut((Bt) => ve(q, yt.position, Bt), ["stop"])
            }, null, 46, ni)), 64))
          ], 46, ti))), 128)),
          b.value ? (pt(), kt("div", {
            key: 2,
            class: "drag-rect preview-box",
            style: $t(C(b.value))
          }, null, 4)) : Rt("", !0),
          f.value ? (pt(), kt("div", {
            key: 3,
            class: "modal-backdrop",
            onClick: E[4] || (E[4] = (q) => f.value = !1)
          })) : Rt("", !0),
          f.value ? (pt(), kt("div", {
            key: 4,
            class: ue(["modal review-modal", { "is-dragging": wt.value }]),
            style: $t(U.value),
            onClick: E[11] || (E[11] = Ut(() => {
            }, ["stop"]))
          }, [
            ft("div", {
              class: "modal-header",
              onMousedown: fn
            }, [
              E[27] || (E[27] = ft("span", null, "添加评审意见", -1)),
              ft("button", {
                class: "close",
                onClick: E[5] || (E[5] = (q) => f.value = !1)
              }, "×")
            ], 32),
            ft("div", ri, [
              ut(Cn, {
                model: it.value,
                "label-width": "80px"
              }, {
                default: st(() => [
                  ut(Xt, { label: "评审目标" }, {
                    default: st(() => [
                      ft("div", ii, [
                        (pt(!0), kt(Yt, null, Kt(it.value.targets, (q, yt) => (pt(), Nt(te, {
                          key: yt,
                          size: "small",
                          class: "target-tag"
                        }, {
                          default: st(() => {
                            var Bt, ie;
                            return [
                              gt(St(q.type === "element" ? q.elementText || q.selector || "元素" : `框选 ${(Bt = q.viewportRect) == null ? void 0 : Bt.x},${(ie = q.viewportRect) == null ? void 0 : ie.y}`), 1)
                            ];
                          }),
                          _: 2
                        }, 1024))), 128))
                      ])
                    ]),
                    _: 1
                  }),
                  ut(Xt, { label: "窗口尺寸" }, {
                    default: st(() => {
                      var q, yt;
                      return [
                        ft("span", ai, St((q = it.value.viewport) == null ? void 0 : q.width) + " × " + St((yt = it.value.viewport) == null ? void 0 : yt.height), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ut(Xt, { label: "滚动位置" }, {
                    default: st(() => {
                      var q, yt;
                      return [
                        ft("span", si, "x=" + St((q = it.value.scroll) == null ? void 0 : q.x) + ", y=" + St((yt = it.value.scroll) == null ? void 0 : yt.y), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ut(Xt, { label: "截图" }, {
                    default: st(() => [
                      ut(En, {
                        modelValue: _t.value,
                        "onUpdate:modelValue": E[6] || (E[6] = (q) => _t.value = q)
                      }, {
                        default: st(() => [
                          ut(be, {
                            label: Mt(jt).TARGETS
                          }, {
                            default: st(() => [...E[28] || (E[28] = [
                              gt("选中目标", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"]),
                          ut(be, {
                            label: Mt(jt).VIEWPORT
                          }, {
                            default: st(() => [...E[29] || (E[29] = [
                              gt("当前视口", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"]),
                          ut(be, {
                            label: Mt(jt).FULL_PAGE
                          }, {
                            default: st(() => [...E[30] || (E[30] = [
                              gt("完整页面", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Xt, {
                    label: "标题",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(je, {
                        modelValue: it.value.title,
                        "onUpdate:modelValue": E[7] || (E[7] = (q) => it.value.title = q),
                        placeholder: "例如：按钮样式不统一"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Xt, {
                    label: "严重等级",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(et, {
                        modelValue: it.value.severity,
                        "onUpdate:modelValue": E[8] || (E[8] = (q) => it.value.severity = q)
                      }, {
                        default: st(() => [
                          ut(le, { label: "low" }, {
                            default: st(() => [...E[31] || (E[31] = [
                              gt("低", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "medium" }, {
                            default: st(() => [...E[32] || (E[32] = [
                              gt("中", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "high" }, {
                            default: st(() => [...E[33] || (E[33] = [
                              gt("高", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "critical" }, {
                            default: st(() => [...E[34] || (E[34] = [
                              gt("严重", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Xt, {
                    label: "评审建议",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(je, {
                        modelValue: it.value.suggestion,
                        "onUpdate:modelValue": E[9] || (E[9] = (q) => it.value.suggestion = q),
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
            ft("div", oi, [
              ut(ot, {
                onClick: E[10] || (E[10] = (q) => f.value = !1)
              }, {
                default: st(() => [...E[35] || (E[35] = [
                  gt("取消", -1)
                ])]),
                _: 1
              }),
              ut(ot, {
                type: "primary",
                disabled: !Tt.value,
                onClick: bn
              }, {
                default: st(() => [...E[36] || (E[36] = [
                  gt("保存评审", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            ft("div", {
              class: "modal-resize-handle",
              onMousedown: Ut(pn, ["stop"])
            }, null, 32)
          ], 6)) : Rt("", !0),
          ut(We, {
            modelValue: x.value,
            "onUpdate:modelValue": E[14] || (E[14] = (q) => x.value = q),
            title: "组件树检查器",
            size: "480px",
            "with-header": !0,
            "z-index": 10003
          }, {
            default: st(() => [
              H.value ? (pt(), kt("div", li, [
                H.value.framework && H.value.framework.length ? (pt(), kt("div", ui, [
                  E[37] || (E[37] = ft("h4", null, "框架组件树", -1)),
                  ft("div", ci, [
                    (pt(!0), kt(Yt, null, Kt(H.value.framework, (q, yt) => (pt(), kt("div", {
                      key: "fw-" + yt,
                      class: "tree-node",
                      onMouseenter: (Bt) => De(q),
                      onMouseleave: E[12] || (E[12] = (Bt) => O.value = null),
                      onClick: (Bt) => Le(q)
                    }, [
                      ft("span", hi, St(q.componentName), 1)
                    ], 40, di))), 128))
                  ])
                ])) : Rt("", !0),
                ft("div", fi, [
                  E[38] || (E[38] = ft("h4", null, "DOM 树", -1)),
                  ft("div", pi, [
                    (pt(!0), kt(Yt, null, Kt(H.value.dom, (q, yt) => {
                      var Bt;
                      return pt(), kt("div", {
                        key: "dom-" + yt,
                        class: "tree-node",
                        style: $t({ paddingLeft: yt * 12 + "px" }),
                        onMouseenter: (ie) => De(q),
                        onMouseleave: E[13] || (E[13] = (ie) => O.value = null),
                        onClick: (ie) => Le(q)
                      }, [
                        ft("span", gi, St(q.tag), 1),
                        q.id ? (pt(), kt("span", vi, "#" + St(q.id), 1)) : Rt("", !0),
                        (Bt = q.aria) != null && Bt.role ? (pt(), kt("span", wi, "role=" + St(q.aria.role), 1)) : Rt("", !0),
                        q.testId ? (pt(), kt("span", yi, "testid=" + St(q.testId), 1)) : Rt("", !0)
                      ], 44, mi);
                    }), 128))
                  ])
                ])
              ])) : (pt(), Nt($e, {
                key: 0,
                description: "先选择一个元素以查看组件树"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          ut(We, {
            modelValue: g.value,
            "onUpdate:modelValue": E[15] || (E[15] = (q) => g.value = q),
            title: "当前页面评审意见",
            size: "480px",
            "with-header": !0,
            "z-index": 10003
          }, {
            default: st(() => [
              ft("div", _i, [
                ut(ot, {
                  size: "small",
                  type: "primary",
                  onClick: Mt(c)
                }, {
                  default: st(() => [...E[39] || (E[39] = [
                    gt("导出 Markdown", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                ut(ot, {
                  size: "small",
                  onClick: Mt(y)
                }, {
                  default: st(() => [...E[40] || (E[40] = [
                    gt("导出 JSON", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                e.enableZipExport ? (pt(), Nt(ot, {
                  key: 0,
                  size: "small",
                  onClick: Mt(w)
                }, {
                  default: st(() => [...E[41] || (E[41] = [
                    gt("导出 ZIP", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : Rt("", !0),
                ut(ot, {
                  size: "small",
                  type: "danger",
                  text: "",
                  onClick: Sn
                }, {
                  default: st(() => [...E[42] || (E[42] = [
                    gt("清空本页", -1)
                  ])]),
                  _: 1
                })
              ]),
              l.value.length === 0 ? (pt(), Nt($e, {
                key: 0,
                description: "暂无评审意见"
              })) : (pt(), kt("div", bi, [
                (pt(!0), kt(Yt, null, Kt(l.value, (q) => (pt(), Nt(zn, {
                  key: q.id,
                  class: "review-item",
                  shadow: "never"
                }, {
                  default: st(() => [
                    ft("div", ki, [
                      ft("span", xi, St(q.title), 1),
                      ft("div", Si, [
                        ut(te, {
                          size: "small",
                          type: j(q.severity)
                        }, {
                          default: st(() => [
                            gt(St(T(q.severity)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        ut(te, {
                          size: "small",
                          type: "info"
                        }, {
                          default: st(() => {
                            var yt;
                            return [
                              gt(St(((yt = q.targets) == null ? void 0 : yt.length) || 1) + " 个目标", 1)
                            ];
                          }),
                          _: 2
                        }, 1024),
                        G(q) ? (pt(), Nt(te, {
                          key: 0,
                          size: "small",
                          type: "success"
                        }, {
                          default: st(() => [...E[43] || (E[43] = [
                            gt("树", -1)
                          ])]),
                          _: 1
                        })) : Rt("", !0)
                      ])
                    ]),
                    ft("p", Ei, St(J(q.targets)), 1),
                    ft("p", Ci, St(q.suggestion), 1),
                    ft("div", zi, [
                      ft("span", Ri, St(new Date(q.createdAt).toLocaleString()), 1),
                      ft("div", Ai, [
                        q.status !== "resolved" ? (pt(), Nt(ot, {
                          key: 0,
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: (yt) => kn(q.id)
                        }, {
                          default: st(() => [...E[44] || (E[44] = [
                            gt("标记解决", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])) : Rt("", !0),
                        ut(ot, {
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: (yt) => xn(q.id)
                        }, {
                          default: st(() => [...E[45] || (E[45] = [
                            gt("删除", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024))), 128))
              ]))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])) : Rt("", !0)
      ]);
    };
  }
}, Bi = /* @__PURE__ */ Gr(Ti, [["__scopeId", "data-v-a7c5e3b1"]]);
export {
  Bi as ReviewTool,
  Bi as default,
  Dn as usePageReview
};
