import { ref as gt, computed as te, onMounted as Sr, onUnmounted as $e, nextTick as Er, watch as Cr, resolveComponent as Et, openBlock as pt, createBlock as Nt, Teleport as zr, createElementBlock as kt, createElementVNode as ht, withModifiers as Ut, normalizeStyle as $t, normalizeClass as ue, createVNode as ut, withCtx as st, createTextVNode as mt, createCommentVNode as Rt, toDisplayString as St, unref as Mt, Fragment as Kt, renderList as qt } from "vue";
import { ElMessageBox as We } from "element-plus";
var ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function de(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Je = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(e, o) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function n(f, u, r) {
      function s(_, S) {
        if (!u[_]) {
          if (!f[_]) {
            var b = typeof de == "function" && de;
            if (!S && b) return b(_, !0);
            if (a) return a(_, !0);
            var y = new Error("Cannot find module '" + _ + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var c = u[_] = { exports: {} };
          f[_][0].call(c.exports, function(w) {
            var l = f[_][1][w];
            return s(l || w);
          }, c, c.exports, n, f, u, r);
        }
        return u[_].exports;
      }
      for (var a = typeof de == "function" && de, d = 0; d < r.length; d++) s(r[d]);
      return s;
    }({ 1: [function(n, f, u) {
      var r = n("./utils"), s = n("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      u.encode = function(d) {
        for (var _, S, b, y, c, w, l, m = [], h = 0, g = d.length, x = g, z = r.getTypeOf(d) !== "string"; h < d.length; ) x = g - h, b = z ? (_ = d[h++], S = h < g ? d[h++] : 0, h < g ? d[h++] : 0) : (_ = d.charCodeAt(h++), S = h < g ? d.charCodeAt(h++) : 0, h < g ? d.charCodeAt(h++) : 0), y = _ >> 2, c = (3 & _) << 4 | S >> 4, w = 1 < x ? (15 & S) << 2 | b >> 6 : 64, l = 2 < x ? 63 & b : 64, m.push(a.charAt(y) + a.charAt(c) + a.charAt(w) + a.charAt(l));
        return m.join("");
      }, u.decode = function(d) {
        var _, S, b, y, c, w, l = 0, m = 0, h = "data:";
        if (d.substr(0, h.length) === h) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, x = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (d.charAt(d.length - 1) === a.charAt(64) && x--, d.charAt(d.length - 2) === a.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = s.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); l < d.length; ) _ = a.indexOf(d.charAt(l++)) << 2 | (y = a.indexOf(d.charAt(l++))) >> 4, S = (15 & y) << 4 | (c = a.indexOf(d.charAt(l++))) >> 2, b = (3 & c) << 6 | (w = a.indexOf(d.charAt(l++))), g[m++] = _, c !== 64 && (g[m++] = S), w !== 64 && (g[m++] = b);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(n, f, u) {
      var r = n("./external"), s = n("./stream/DataWorker"), a = n("./stream/Crc32Probe"), d = n("./stream/DataLengthProbe");
      function _(S, b, y, c, w) {
        this.compressedSize = S, this.uncompressedSize = b, this.crc32 = y, this.compression = c, this.compressedContent = w;
      }
      _.prototype = { getContentWorker: function() {
        var S = new s(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), b = this;
        return S.on("end", function() {
          if (this.streamInfo.data_length !== b.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), S;
      }, getCompressedWorker: function() {
        return new s(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(S, b, y) {
        return S.pipe(new a()).pipe(new d("uncompressedSize")).pipe(b.compressWorker(y)).pipe(new d("compressedSize")).withStreamInfo("compression", b);
      }, f.exports = _;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(n, f, u) {
      var r = n("./stream/GenericWorker");
      u.STORE = { magic: "\0\0", compressWorker: function() {
        return new r("STORE compression");
      }, uncompressWorker: function() {
        return new r("STORE decompression");
      } }, u.DEFLATE = n("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(n, f, u) {
      var r = n("./utils"), s = function() {
        for (var a, d = [], _ = 0; _ < 256; _++) {
          a = _;
          for (var S = 0; S < 8; S++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
          d[_] = a;
        }
        return d;
      }();
      f.exports = function(a, d) {
        return a !== void 0 && a.length ? r.getTypeOf(a) !== "string" ? function(_, S, b, y) {
          var c = s, w = y + b;
          _ ^= -1;
          for (var l = y; l < w; l++) _ = _ >>> 8 ^ c[255 & (_ ^ S[l])];
          return -1 ^ _;
        }(0 | d, a, a.length, 0) : function(_, S, b, y) {
          var c = s, w = y + b;
          _ ^= -1;
          for (var l = y; l < w; l++) _ = _ >>> 8 ^ c[255 & (_ ^ S.charCodeAt(l))];
          return -1 ^ _;
        }(0 | d, a, a.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(n, f, u) {
      u.base64 = !1, u.binary = !1, u.dir = !1, u.createFolders = !0, u.date = null, u.compression = null, u.compressionOptions = null, u.comment = null, u.unixPermissions = null, u.dosPermissions = null;
    }, {}], 6: [function(n, f, u) {
      var r = null;
      r = typeof Promise < "u" ? Promise : n("lie"), f.exports = { Promise: r };
    }, { lie: 37 }], 7: [function(n, f, u) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = n("pako"), a = n("./utils"), d = n("./stream/GenericWorker"), _ = r ? "uint8array" : "array";
      function S(b, y) {
        d.call(this, "FlateWorker/" + b), this._pako = null, this._pakoAction = b, this._pakoOptions = y, this.meta = {};
      }
      u.magic = "\b\0", a.inherits(S, d), S.prototype.processChunk = function(b) {
        this.meta = b.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(_, b.data), !1);
      }, S.prototype.flush = function() {
        d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, S.prototype.cleanUp = function() {
        d.prototype.cleanUp.call(this), this._pako = null;
      }, S.prototype._createPako = function() {
        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var b = this;
        this._pako.onData = function(y) {
          b.push({ data: y, meta: b.meta });
        };
      }, u.compressWorker = function(b) {
        return new S("Deflate", b);
      }, u.uncompressWorker = function() {
        return new S("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(n, f, u) {
      function r(c, w) {
        var l, m = "";
        for (l = 0; l < w; l++) m += String.fromCharCode(255 & c), c >>>= 8;
        return m;
      }
      function s(c, w, l, m, h, g) {
        var x, z, R = c.file, L = c.compression, D = g !== _.utf8encode, $ = a.transformTo("string", g(R.name)), B = a.transformTo("string", _.utf8encode(R.name)), V = R.comment, Q = a.transformTo("string", g(V)), k = a.transformTo("string", _.utf8encode(V)), F = B.length !== R.name.length, i = k.length !== V.length, N = "", nt = "", W = "", ot = R.dir, Z = R.date, it = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        w && !l || (it.crc32 = c.crc32, it.compressedSize = c.compressedSize, it.uncompressedSize = c.uncompressedSize);
        var O = 0;
        w && (O |= 8), D || !F && !i || (O |= 2048);
        var I = 0, et = 0;
        ot && (I |= 16), h === "UNIX" ? (et = 798, I |= function(Y, yt) {
          var xt = Y;
          return Y || (xt = yt ? 16893 : 33204), (65535 & xt) << 16;
        }(R.unixPermissions, ot)) : (et = 20, I |= function(Y) {
          return 63 & (Y || 0);
        }(R.dosPermissions)), x = Z.getUTCHours(), x <<= 6, x |= Z.getUTCMinutes(), x <<= 5, x |= Z.getUTCSeconds() / 2, z = Z.getUTCFullYear() - 1980, z <<= 4, z |= Z.getUTCMonth() + 1, z <<= 5, z |= Z.getUTCDate(), F && (nt = r(1, 1) + r(S($), 4) + B, N += "up" + r(nt.length, 2) + nt), i && (W = r(1, 1) + r(S(Q), 4) + k, N += "uc" + r(W.length, 2) + W);
        var K = "";
        return K += `
\0`, K += r(O, 2), K += L.magic, K += r(x, 2), K += r(z, 2), K += r(it.crc32, 4), K += r(it.compressedSize, 4), K += r(it.uncompressedSize, 4), K += r($.length, 2), K += r(N.length, 2), { fileRecord: b.LOCAL_FILE_HEADER + K + $ + N, dirRecord: b.CENTRAL_FILE_HEADER + r(et, 2) + K + r(Q.length, 2) + "\0\0\0\0" + r(I, 4) + r(m, 4) + $ + N + Q };
      }
      var a = n("../utils"), d = n("../stream/GenericWorker"), _ = n("../utf8"), S = n("../crc32"), b = n("../signature");
      function y(c, w, l, m) {
        d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = l, this.encodeFileName = m, this.streamFiles = c, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      a.inherits(y, d), y.prototype.push = function(c) {
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
          return b.DATA_DESCRIPTOR + r(m.crc32, 4) + r(m.compressedSize, 4) + r(m.uncompressedSize, 4);
        }(c), meta: { percent: 100 } });
        else for (this.push({ data: l.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, y.prototype.flush = function() {
        for (var c = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({ data: this.dirRecords[w], meta: { percent: 100 } });
        var l = this.bytesWritten - c, m = function(h, g, x, z, R) {
          var L = a.transformTo("string", R(z));
          return b.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(h, 2) + r(h, 2) + r(g, 4) + r(x, 4) + r(L.length, 2) + L;
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
      }, f.exports = y;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(n, f, u) {
      var r = n("../compressions"), s = n("./ZipFileWorker");
      u.generateWorker = function(a, d, _) {
        var S = new s(d.streamFiles, _, d.platform, d.encodeFileName), b = 0;
        try {
          a.forEach(function(y, c) {
            b++;
            var w = function(g, x) {
              var z = g || x, R = r[z];
              if (!R) throw new Error(z + " is not a valid compression method !");
              return R;
            }(c.options.compression, d.compression), l = c.options.compressionOptions || d.compressionOptions || {}, m = c.dir, h = c.date;
            c._compressWorker(w, l).withStreamInfo("file", { name: y, dir: m, date: h, comment: c.comment || "", unixPermissions: c.unixPermissions, dosPermissions: c.dosPermissions }).pipe(S);
          }), S.entriesCount = b;
        } catch (y) {
          S.error(y);
        }
        return S;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(n, f, u) {
      function r() {
        if (!(this instanceof r)) return new r();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var s = new r();
          for (var a in this) typeof this[a] != "function" && (s[a] = this[a]);
          return s;
        };
      }
      (r.prototype = n("./object")).loadAsync = n("./load"), r.support = n("./support"), r.defaults = n("./defaults"), r.version = "3.10.1", r.loadAsync = function(s, a) {
        return new r().loadAsync(s, a);
      }, r.external = n("./external"), f.exports = r;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(n, f, u) {
      var r = n("./utils"), s = n("./external"), a = n("./utf8"), d = n("./zipEntries"), _ = n("./stream/Crc32Probe"), S = n("./nodejsUtils");
      function b(y) {
        return new s.Promise(function(c, w) {
          var l = y.decompressed.getContentWorker().pipe(new _());
          l.on("error", function(m) {
            w(m);
          }).on("end", function() {
            l.streamInfo.crc32 !== y.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : c();
          }).resume();
        });
      }
      f.exports = function(y, c) {
        var w = this;
        return c = r.extend(c || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: a.utf8decode }), S.isNode && S.isStream(y) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", y, !0, c.optimizedBinaryString, c.base64).then(function(l) {
          var m = new d(c);
          return m.load(l), m;
        }).then(function(l) {
          var m = [s.Promise.resolve(l)], h = l.files;
          if (c.checkCRC32) for (var g = 0; g < h.length; g++) m.push(b(h[g]));
          return s.Promise.all(m);
        }).then(function(l) {
          for (var m = l.shift(), h = m.files, g = 0; g < h.length; g++) {
            var x = h[g], z = x.fileNameStr, R = r.resolve(x.fileNameStr);
            w.file(R, x.decompressed, { binary: !0, optimizedBinaryString: !0, date: x.date, dir: x.dir, comment: x.fileCommentStr.length ? x.fileCommentStr : null, unixPermissions: x.unixPermissions, dosPermissions: x.dosPermissions, createFolders: c.createFolders }), x.dir || (w.file(R).unsafeOriginalName = z);
          }
          return m.zipComment.length && (w.comment = m.zipComment), w;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(n, f, u) {
      var r = n("../utils"), s = n("../stream/GenericWorker");
      function a(d, _) {
        s.call(this, "Nodejs stream input adapter for " + d), this._upstreamEnded = !1, this._bindStream(_);
      }
      r.inherits(a, s), a.prototype._bindStream = function(d) {
        var _ = this;
        (this._stream = d).pause(), d.on("data", function(S) {
          _.push({ data: S, meta: { percent: 0 } });
        }).on("error", function(S) {
          _.isPaused ? this.generatedError = S : _.error(S);
        }).on("end", function() {
          _.isPaused ? _._upstreamEnded = !0 : _.end();
        });
      }, a.prototype.pause = function() {
        return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, a.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, f.exports = a;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(n, f, u) {
      var r = n("readable-stream").Readable;
      function s(a, d, _) {
        r.call(this, d), this._helper = a;
        var S = this;
        a.on("data", function(b, y) {
          S.push(b) || S._helper.pause(), _ && _(y);
        }).on("error", function(b) {
          S.emit("error", b);
        }).on("end", function() {
          S.push(null);
        });
      }
      n("../utils").inherits(s, r), s.prototype._read = function() {
        this._helper.resume();
      }, f.exports = s;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(n, f, u) {
      f.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(r, s) {
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
    }, {}], 15: [function(n, f, u) {
      function r(R, L, D) {
        var $, B = a.getTypeOf(L), V = a.extend(D || {}, S);
        V.date = V.date || /* @__PURE__ */ new Date(), V.compression !== null && (V.compression = V.compression.toUpperCase()), typeof V.unixPermissions == "string" && (V.unixPermissions = parseInt(V.unixPermissions, 8)), V.unixPermissions && 16384 & V.unixPermissions && (V.dir = !0), V.dosPermissions && 16 & V.dosPermissions && (V.dir = !0), V.dir && (R = h(R)), V.createFolders && ($ = m(R)) && g.call(this, $, !0);
        var Q = B === "string" && V.binary === !1 && V.base64 === !1;
        D && D.binary !== void 0 || (V.binary = !Q), (L instanceof b && L.uncompressedSize === 0 || V.dir || !L || L.length === 0) && (V.base64 = !1, V.binary = !0, L = "", V.compression = "STORE", B = "string");
        var k = null;
        k = L instanceof b || L instanceof d ? L : w.isNode && w.isStream(L) ? new l(R, L) : a.prepareContent(R, L, V.binary, V.optimizedBinaryString, V.base64);
        var F = new y(R, k, V);
        this.files[R] = F;
      }
      var s = n("./utf8"), a = n("./utils"), d = n("./stream/GenericWorker"), _ = n("./stream/StreamHelper"), S = n("./defaults"), b = n("./compressedObject"), y = n("./zipObject"), c = n("./generate"), w = n("./nodejsUtils"), l = n("./nodejs/NodejsStreamInputAdapter"), m = function(R) {
        R.slice(-1) === "/" && (R = R.substring(0, R.length - 1));
        var L = R.lastIndexOf("/");
        return 0 < L ? R.substring(0, L) : "";
      }, h = function(R) {
        return R.slice(-1) !== "/" && (R += "/"), R;
      }, g = function(R, L) {
        return L = L !== void 0 ? L : S.createFolders, R = h(R), this.files[R] || r.call(this, R, null, { dir: !0, createFolders: L }), this.files[R];
      };
      function x(R) {
        return Object.prototype.toString.call(R) === "[object RegExp]";
      }
      var z = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(R) {
        var L, D, $;
        for (L in this.files) $ = this.files[L], (D = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && R(D, $);
      }, filter: function(R) {
        var L = [];
        return this.forEach(function(D, $) {
          R(D, $) && L.push($);
        }), L;
      }, file: function(R, L, D) {
        if (arguments.length !== 1) return R = this.root + R, r.call(this, R, L, D), this;
        if (x(R)) {
          var $ = R;
          return this.filter(function(V, Q) {
            return !Q.dir && $.test(V);
          });
        }
        var B = this.files[this.root + R];
        return B && !B.dir ? B : null;
      }, folder: function(R) {
        if (!R) return this;
        if (x(R)) return this.filter(function(B, V) {
          return V.dir && R.test(B);
        });
        var L = this.root + R, D = g.call(this, L), $ = this.clone();
        return $.root = D.name, $;
      }, remove: function(R) {
        R = this.root + R;
        var L = this.files[R];
        if (L || (R.slice(-1) !== "/" && (R += "/"), L = this.files[R]), L && !L.dir) delete this.files[R];
        else for (var D = this.filter(function(B, V) {
          return V.name.slice(0, R.length) === R;
        }), $ = 0; $ < D.length; $++) delete this.files[D[$].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(R) {
        var L, D = {};
        try {
          if ((D = a.extend(R || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = D.type.toLowerCase(), D.compression = D.compression.toUpperCase(), D.type === "binarystring" && (D.type = "string"), !D.type) throw new Error("No output type specified.");
          a.checkSupport(D.type), D.platform !== "darwin" && D.platform !== "freebsd" && D.platform !== "linux" && D.platform !== "sunos" || (D.platform = "UNIX"), D.platform === "win32" && (D.platform = "DOS");
          var $ = D.comment || this.comment || "";
          L = c.generateWorker(this, D, $);
        } catch (B) {
          (L = new d("error")).error(B);
        }
        return new _(L, D.type || "string", D.mimeType);
      }, generateAsync: function(R, L) {
        return this.generateInternalStream(R).accumulate(L);
      }, generateNodeStream: function(R, L) {
        return (R = R || {}).type || (R.type = "nodebuffer"), this.generateInternalStream(R).toNodejsStream(L);
      } };
      f.exports = z;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(n, f, u) {
      f.exports = n("stream");
    }, { stream: void 0 }], 17: [function(n, f, u) {
      var r = n("./DataReader");
      function s(a) {
        r.call(this, a);
        for (var d = 0; d < this.data.length; d++) a[d] = 255 & a[d];
      }
      n("../utils").inherits(s, r), s.prototype.byteAt = function(a) {
        return this.data[this.zero + a];
      }, s.prototype.lastIndexOfSignature = function(a) {
        for (var d = a.charCodeAt(0), _ = a.charCodeAt(1), S = a.charCodeAt(2), b = a.charCodeAt(3), y = this.length - 4; 0 <= y; --y) if (this.data[y] === d && this.data[y + 1] === _ && this.data[y + 2] === S && this.data[y + 3] === b) return y - this.zero;
        return -1;
      }, s.prototype.readAndCheckSignature = function(a) {
        var d = a.charCodeAt(0), _ = a.charCodeAt(1), S = a.charCodeAt(2), b = a.charCodeAt(3), y = this.readData(4);
        return d === y[0] && _ === y[1] && S === y[2] && b === y[3];
      }, s.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return [];
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, f.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(n, f, u) {
      var r = n("../utils");
      function s(a) {
        this.data = a, this.length = a.length, this.index = 0, this.zero = 0;
      }
      s.prototype = { checkOffset: function(a) {
        this.checkIndex(this.index + a);
      }, checkIndex: function(a) {
        if (this.length < this.zero + a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
      }, setIndex: function(a) {
        this.checkIndex(a), this.index = a;
      }, skip: function(a) {
        this.setIndex(this.index + a);
      }, byteAt: function() {
      }, readInt: function(a) {
        var d, _ = 0;
        for (this.checkOffset(a), d = this.index + a - 1; d >= this.index; d--) _ = (_ << 8) + this.byteAt(d);
        return this.index += a, _;
      }, readString: function(a) {
        return r.transformTo("string", this.readData(a));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var a = this.readInt(4);
        return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
      } }, f.exports = s;
    }, { "../utils": 32 }], 19: [function(n, f, u) {
      var r = n("./Uint8ArrayReader");
      function s(a) {
        r.call(this, a);
      }
      n("../utils").inherits(s, r), s.prototype.readData = function(a) {
        this.checkOffset(a);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, f.exports = s;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(n, f, u) {
      var r = n("./DataReader");
      function s(a) {
        r.call(this, a);
      }
      n("../utils").inherits(s, r), s.prototype.byteAt = function(a) {
        return this.data.charCodeAt(this.zero + a);
      }, s.prototype.lastIndexOfSignature = function(a) {
        return this.data.lastIndexOf(a) - this.zero;
      }, s.prototype.readAndCheckSignature = function(a) {
        return a === this.readData(4);
      }, s.prototype.readData = function(a) {
        this.checkOffset(a);
        var d = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, f.exports = s;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(n, f, u) {
      var r = n("./ArrayReader");
      function s(a) {
        r.call(this, a);
      }
      n("../utils").inherits(s, r), s.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return new Uint8Array(0);
        var d = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, d;
      }, f.exports = s;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(n, f, u) {
      var r = n("../utils"), s = n("../support"), a = n("./ArrayReader"), d = n("./StringReader"), _ = n("./NodeBufferReader"), S = n("./Uint8ArrayReader");
      f.exports = function(b) {
        var y = r.getTypeOf(b);
        return r.checkSupport(y), y !== "string" || s.uint8array ? y === "nodebuffer" ? new _(b) : s.uint8array ? new S(r.transformTo("uint8array", b)) : new a(r.transformTo("array", b)) : new d(b);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(n, f, u) {
      u.LOCAL_FILE_HEADER = "PK", u.CENTRAL_FILE_HEADER = "PK", u.CENTRAL_DIRECTORY_END = "PK", u.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", u.ZIP64_CENTRAL_DIRECTORY_END = "PK", u.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(n, f, u) {
      var r = n("./GenericWorker"), s = n("../utils");
      function a(d) {
        r.call(this, "ConvertWorker to " + d), this.destType = d;
      }
      s.inherits(a, r), a.prototype.processChunk = function(d) {
        this.push({ data: s.transformTo(this.destType, d.data), meta: d.meta });
      }, f.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(n, f, u) {
      var r = n("./GenericWorker"), s = n("../crc32");
      function a() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      n("../utils").inherits(a, r), a.prototype.processChunk = function(d) {
        this.streamInfo.crc32 = s(d.data, this.streamInfo.crc32 || 0), this.push(d);
      }, f.exports = a;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(n, f, u) {
      var r = n("../utils"), s = n("./GenericWorker");
      function a(d) {
        s.call(this, "DataLengthProbe for " + d), this.propName = d, this.withStreamInfo(d, 0);
      }
      r.inherits(a, s), a.prototype.processChunk = function(d) {
        if (d) {
          var _ = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = _ + d.data.length;
        }
        s.prototype.processChunk.call(this, d);
      }, f.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(n, f, u) {
      var r = n("../utils"), s = n("./GenericWorker");
      function a(d) {
        s.call(this, "DataWorker");
        var _ = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, d.then(function(S) {
          _.dataIsReady = !0, _.data = S, _.max = S && S.length || 0, _.type = r.getTypeOf(S), _.isPaused || _._tickAndRepeat();
        }, function(S) {
          _.error(S);
        });
      }
      r.inherits(a, s), a.prototype.cleanUp = function() {
        s.prototype.cleanUp.call(this), this.data = null;
      }, a.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0);
      }, a.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, a.prototype._tick = function() {
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
      }, f.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(n, f, u) {
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
      }, on: function(s, a) {
        return this._listeners[s].push(a), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(s, a) {
        if (this._listeners[s]) for (var d = 0; d < this._listeners[s].length; d++) this._listeners[s][d].call(this, a);
      }, pipe: function(s) {
        return s.registerPrevious(this);
      }, registerPrevious: function(s) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
        var a = this;
        return s.on("data", function(d) {
          a.processChunk(d);
        }), s.on("end", function() {
          a.end();
        }), s.on("error", function(d) {
          a.error(d);
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
      }, withStreamInfo: function(s, a) {
        return this.extraStreamInfo[s] = a, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var s in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var s = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + s : s;
      } }, f.exports = r;
    }, {}], 29: [function(n, f, u) {
      var r = n("../utils"), s = n("./ConvertWorker"), a = n("./GenericWorker"), d = n("../base64"), _ = n("../support"), S = n("../external"), b = null;
      if (_.nodestream) try {
        b = n("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function y(w, l) {
        return new S.Promise(function(m, h) {
          var g = [], x = w._internalType, z = w._outputType, R = w._mimeType;
          w.on("data", function(L, D) {
            g.push(L), l && l(D);
          }).on("error", function(L) {
            g = [], h(L);
          }).on("end", function() {
            try {
              var L = function(D, $, B) {
                switch (D) {
                  case "blob":
                    return r.newBlob(r.transformTo("arraybuffer", $), B);
                  case "base64":
                    return d.encode($);
                  default:
                    return r.transformTo(D, $);
                }
              }(z, function(D, $) {
                var B, V = 0, Q = null, k = 0;
                for (B = 0; B < $.length; B++) k += $[B].length;
                switch (D) {
                  case "string":
                    return $.join("");
                  case "array":
                    return Array.prototype.concat.apply([], $);
                  case "uint8array":
                    for (Q = new Uint8Array(k), B = 0; B < $.length; B++) Q.set($[B], V), V += $[B].length;
                    return Q;
                  case "nodebuffer":
                    return Buffer.concat($);
                  default:
                    throw new Error("concat : unsupported type '" + D + "'");
                }
              }(x, g), R);
              m(L);
            } catch (D) {
              h(D);
            }
            g = [];
          }).resume();
        });
      }
      function c(w, l, m) {
        var h = l;
        switch (l) {
          case "blob":
          case "arraybuffer":
            h = "uint8array";
            break;
          case "base64":
            h = "string";
        }
        try {
          this._internalType = h, this._outputType = l, this._mimeType = m, r.checkSupport(h), this._worker = w.pipe(new s(h)), w.lock();
        } catch (g) {
          this._worker = new a("error"), this._worker.error(g);
        }
      }
      c.prototype = { accumulate: function(w) {
        return y(this, w);
      }, on: function(w, l) {
        var m = this;
        return w === "data" ? this._worker.on(w, function(h) {
          l.call(m, h.data, h.meta);
        }) : this._worker.on(w, function() {
          r.delay(l, arguments, m);
        }), this;
      }, resume: function() {
        return r.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(w) {
        if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new b(this, { objectMode: this._outputType !== "nodebuffer" }, w);
      } }, f.exports = c;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(n, f, u) {
      if (u.base64 = !0, u.array = !0, u.string = !0, u.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", u.nodebuffer = typeof Buffer < "u", u.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") u.blob = !1;
      else {
        var r = new ArrayBuffer(0);
        try {
          u.blob = new Blob([r], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            s.append(r), u.blob = s.getBlob("application/zip").size === 0;
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
      for (var r = n("./utils"), s = n("./support"), a = n("./nodejsUtils"), d = n("./stream/GenericWorker"), _ = new Array(256), S = 0; S < 256; S++) _[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
      _[254] = _[254] = 1;
      function b() {
        d.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function y() {
        d.call(this, "utf-8 encode");
      }
      u.utf8encode = function(c) {
        return s.nodebuffer ? a.newBufferFrom(c, "utf-8") : function(w) {
          var l, m, h, g, x, z = w.length, R = 0;
          for (g = 0; g < z; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < z && (64512 & (h = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (h - 56320), g++), R += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (l = s.uint8array ? new Uint8Array(R) : new Array(R), g = x = 0; x < R; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < z && (64512 & (h = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (h - 56320), g++), m < 128 ? l[x++] = m : (m < 2048 ? l[x++] = 192 | m >>> 6 : (m < 65536 ? l[x++] = 224 | m >>> 12 : (l[x++] = 240 | m >>> 18, l[x++] = 128 | m >>> 12 & 63), l[x++] = 128 | m >>> 6 & 63), l[x++] = 128 | 63 & m);
          return l;
        }(c);
      }, u.utf8decode = function(c) {
        return s.nodebuffer ? r.transformTo("nodebuffer", c).toString("utf-8") : function(w) {
          var l, m, h, g, x = w.length, z = new Array(2 * x);
          for (l = m = 0; l < x; ) if ((h = w[l++]) < 128) z[m++] = h;
          else if (4 < (g = _[h])) z[m++] = 65533, l += g - 1;
          else {
            for (h &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && l < x; ) h = h << 6 | 63 & w[l++], g--;
            1 < g ? z[m++] = 65533 : h < 65536 ? z[m++] = h : (h -= 65536, z[m++] = 55296 | h >> 10 & 1023, z[m++] = 56320 | 1023 & h);
          }
          return z.length !== m && (z.subarray ? z = z.subarray(0, m) : z.length = m), r.applyFromCharCode(z);
        }(c = r.transformTo(s.uint8array ? "uint8array" : "array", c));
      }, r.inherits(b, d), b.prototype.processChunk = function(c) {
        var w = r.transformTo(s.uint8array ? "uint8array" : "array", c.data);
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
        }(w), h = w;
        m !== w.length && (s.uint8array ? (h = w.subarray(0, m), this.leftOver = w.subarray(m, w.length)) : (h = w.slice(0, m), this.leftOver = w.slice(m, w.length))), this.push({ data: u.utf8decode(h), meta: c.meta });
      }, b.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: u.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, u.Utf8DecodeWorker = b, r.inherits(y, d), y.prototype.processChunk = function(c) {
        this.push({ data: u.utf8encode(c.data), meta: c.meta });
      }, u.Utf8EncodeWorker = y;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(n, f, u) {
      var r = n("./support"), s = n("./base64"), a = n("./nodejsUtils"), d = n("./external");
      function _(l) {
        return l;
      }
      function S(l, m) {
        for (var h = 0; h < l.length; ++h) m[h] = 255 & l.charCodeAt(h);
        return m;
      }
      n("setimmediate"), u.newBlob = function(l, m) {
        u.checkSupport("blob");
        try {
          return new Blob([l], { type: m });
        } catch {
          try {
            var h = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return h.append(l), h.getBlob(m);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var b = { stringifyByChunk: function(l, m, h) {
        var g = [], x = 0, z = l.length;
        if (z <= h) return String.fromCharCode.apply(null, l);
        for (; x < z; ) m === "array" || m === "nodebuffer" ? g.push(String.fromCharCode.apply(null, l.slice(x, Math.min(x + h, z)))) : g.push(String.fromCharCode.apply(null, l.subarray(x, Math.min(x + h, z)))), x += h;
        return g.join("");
      }, stringifyByChar: function(l) {
        for (var m = "", h = 0; h < l.length; h++) m += String.fromCharCode(l[h]);
        return m;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return r.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return r.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function y(l) {
        var m = 65536, h = u.getTypeOf(l), g = !0;
        if (h === "uint8array" ? g = b.applyCanBeUsed.uint8array : h === "nodebuffer" && (g = b.applyCanBeUsed.nodebuffer), g) for (; 1 < m; ) try {
          return b.stringifyByChunk(l, h, m);
        } catch {
          m = Math.floor(m / 2);
        }
        return b.stringifyByChar(l);
      }
      function c(l, m) {
        for (var h = 0; h < l.length; h++) m[h] = l[h];
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
        return S(l, a.allocBuffer(l.length));
      } }, w.array = { string: y, array: _, arraybuffer: function(l) {
        return new Uint8Array(l).buffer;
      }, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return a.newBufferFrom(l);
      } }, w.arraybuffer = { string: function(l) {
        return y(new Uint8Array(l));
      }, array: function(l) {
        return c(new Uint8Array(l), new Array(l.byteLength));
      }, arraybuffer: _, uint8array: function(l) {
        return new Uint8Array(l);
      }, nodebuffer: function(l) {
        return a.newBufferFrom(new Uint8Array(l));
      } }, w.uint8array = { string: y, array: function(l) {
        return c(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return l.buffer;
      }, uint8array: _, nodebuffer: function(l) {
        return a.newBufferFrom(l);
      } }, w.nodebuffer = { string: y, array: function(l) {
        return c(l, new Array(l.length));
      }, arraybuffer: function(l) {
        return w.nodebuffer.uint8array(l).buffer;
      }, uint8array: function(l) {
        return c(l, new Uint8Array(l.length));
      }, nodebuffer: _ }, u.transformTo = function(l, m) {
        if (m = m || "", !l) return m;
        u.checkSupport(l);
        var h = u.getTypeOf(m);
        return w[h][l](m);
      }, u.resolve = function(l) {
        for (var m = l.split("/"), h = [], g = 0; g < m.length; g++) {
          var x = m[g];
          x === "." || x === "" && g !== 0 && g !== m.length - 1 || (x === ".." ? h.pop() : h.push(x));
        }
        return h.join("/");
      }, u.getTypeOf = function(l) {
        return typeof l == "string" ? "string" : Object.prototype.toString.call(l) === "[object Array]" ? "array" : r.nodebuffer && a.isBuffer(l) ? "nodebuffer" : r.uint8array && l instanceof Uint8Array ? "uint8array" : r.arraybuffer && l instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, u.checkSupport = function(l) {
        if (!r[l.toLowerCase()]) throw new Error(l + " is not supported by this platform");
      }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(l) {
        var m, h, g = "";
        for (h = 0; h < (l || "").length; h++) g += "\\x" + ((m = l.charCodeAt(h)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
        return g;
      }, u.delay = function(l, m, h) {
        setImmediate(function() {
          l.apply(h || null, m || []);
        });
      }, u.inherits = function(l, m) {
        function h() {
        }
        h.prototype = m.prototype, l.prototype = new h();
      }, u.extend = function() {
        var l, m, h = {};
        for (l = 0; l < arguments.length; l++) for (m in arguments[l]) Object.prototype.hasOwnProperty.call(arguments[l], m) && h[m] === void 0 && (h[m] = arguments[l][m]);
        return h;
      }, u.prepareContent = function(l, m, h, g, x) {
        return d.Promise.resolve(m).then(function(z) {
          return r.blob && (z instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(z)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(R, L) {
            var D = new FileReader();
            D.onload = function($) {
              R($.target.result);
            }, D.onerror = function($) {
              L($.target.error);
            }, D.readAsArrayBuffer(z);
          }) : z;
        }).then(function(z) {
          var R = u.getTypeOf(z);
          return R ? (R === "arraybuffer" ? z = u.transformTo("uint8array", z) : R === "string" && (x ? z = s.decode(z) : h && g !== !0 && (z = function(L) {
            return S(L, r.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(z))), z) : d.Promise.reject(new Error("Can't read the data of '" + l + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(n, f, u) {
      var r = n("./reader/readerFor"), s = n("./utils"), a = n("./signature"), d = n("./zipEntry"), _ = n("./support");
      function S(b) {
        this.files = [], this.loadOptions = b;
      }
      S.prototype = { checkSignature: function(b) {
        if (!this.reader.readAndCheckSignature(b)) {
          this.reader.index -= 4;
          var y = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(y) + ", expected " + s.pretty(b) + ")");
        }
      }, isSignature: function(b, y) {
        var c = this.reader.index;
        this.reader.setIndex(b);
        var w = this.reader.readString(4) === y;
        return this.reader.setIndex(c), w;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var b = this.reader.readData(this.zipCommentLength), y = _.uint8array ? "uint8array" : "array", c = s.transformTo(y, b);
        this.zipComment = this.loadOptions.decodeFileName(c);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var b, y, c, w = this.zip64EndOfCentralSize - 44; 0 < w; ) b = this.reader.readInt(2), y = this.reader.readInt(4), c = this.reader.readData(y), this.zip64ExtensibleData[b] = { id: b, length: y, value: c };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var b, y;
        for (b = 0; b < this.files.length; b++) y = this.files[b], this.reader.setIndex(y.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), y.readLocalPart(this.reader), y.handleUTF8(), y.processAttributes();
      }, readCentralDir: function() {
        var b;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (b = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(b);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var b = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
        if (b < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(b);
        var y = b;
        if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (b = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(b), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var c = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (c += 20, c += 12 + this.zip64EndOfCentralSize);
        var w = y - c;
        if (0 < w) this.isSignature(y, a.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
        else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
      }, prepareReader: function(b) {
        this.reader = r(b);
      }, load: function(b) {
        this.prepareReader(b), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, f.exports = S;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(n, f, u) {
      var r = n("./reader/readerFor"), s = n("./utils"), a = n("./compressedObject"), d = n("./crc32"), _ = n("./utf8"), S = n("./compressions"), b = n("./support");
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
          for (var h in S) if (Object.prototype.hasOwnProperty.call(S, h) && S[h].magic === m) return S[h];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, w, c.readData(this.compressedSize));
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
          var c = r(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = c.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = c.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = c.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = c.readInt(4));
        }
      }, readExtraFields: function(c) {
        var w, l, m, h = c.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); c.index + 4 < h; ) w = c.readInt(2), l = c.readInt(2), m = c.readData(l), this.extraFields[w] = { id: w, length: l, value: m };
        c.setIndex(h);
      }, handleUTF8: function() {
        var c = b.uint8array ? "uint8array" : "array";
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
            var h = s.transformTo(c, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(h);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var c = this.extraFields[28789];
        if (c) {
          var w = r(c.value);
          return w.readInt(1) !== 1 || d(this.fileName) !== w.readInt(4) ? null : _.utf8decode(w.readData(c.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var c = this.extraFields[25461];
        if (c) {
          var w = r(c.value);
          return w.readInt(1) !== 1 || d(this.fileComment) !== w.readInt(4) ? null : _.utf8decode(w.readData(c.length - 5));
        }
        return null;
      } }, f.exports = y;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(n, f, u) {
      function r(w, l, m) {
        this.name = w, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = l, this._dataBinary = m.binary, this.options = { compression: m.compression, compressionOptions: m.compressionOptions };
      }
      var s = n("./stream/StreamHelper"), a = n("./stream/DataWorker"), d = n("./utf8"), _ = n("./compressedObject"), S = n("./stream/GenericWorker");
      r.prototype = { internalStream: function(w) {
        var l = null, m = "string";
        try {
          if (!w) throw new Error("No output type specified.");
          var h = (m = w.toLowerCase()) === "string" || m === "text";
          m !== "binarystring" && m !== "text" || (m = "string"), l = this._decompressWorker();
          var g = !this._dataBinary;
          g && !h && (l = l.pipe(new d.Utf8EncodeWorker())), !g && h && (l = l.pipe(new d.Utf8DecodeWorker()));
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
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof S ? this._data : new a(this._data);
      } };
      for (var b = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], y = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, c = 0; c < b.length; c++) r.prototype[b[c]] = y;
      f.exports = r;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(n, f, u) {
      (function(r) {
        var s, a, d = r.MutationObserver || r.WebKitMutationObserver;
        if (d) {
          var _ = 0, S = new d(w), b = r.document.createTextNode("");
          S.observe(b, { characterData: !0 }), s = function() {
            b.data = _ = ++_ % 2;
          };
        } else if (r.setImmediate || r.MessageChannel === void 0) s = "document" in r && "onreadystatechange" in r.document.createElement("script") ? function() {
          var l = r.document.createElement("script");
          l.onreadystatechange = function() {
            w(), l.onreadystatechange = null, l.parentNode.removeChild(l), l = null;
          }, r.document.documentElement.appendChild(l);
        } : function() {
          setTimeout(w, 0);
        };
        else {
          var y = new r.MessageChannel();
          y.port1.onmessage = w, s = function() {
            y.port2.postMessage(0);
          };
        }
        var c = [];
        function w() {
          var l, m;
          a = !0;
          for (var h = c.length; h; ) {
            for (m = c, c = [], l = -1; ++l < h; ) m[l]();
            h = c.length;
          }
          a = !1;
        }
        f.exports = function(l) {
          c.push(l) !== 1 || a || s();
        };
      }).call(this, typeof ce < "u" ? ce : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(n, f, u) {
      var r = n("immediate");
      function s() {
      }
      var a = {}, d = ["REJECTED"], _ = ["FULFILLED"], S = ["PENDING"];
      function b(h) {
        if (typeof h != "function") throw new TypeError("resolver must be a function");
        this.state = S, this.queue = [], this.outcome = void 0, h !== s && l(this, h);
      }
      function y(h, g, x) {
        this.promise = h, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
      }
      function c(h, g, x) {
        r(function() {
          var z;
          try {
            z = g(x);
          } catch (R) {
            return a.reject(h, R);
          }
          z === h ? a.reject(h, new TypeError("Cannot resolve promise with itself")) : a.resolve(h, z);
        });
      }
      function w(h) {
        var g = h && h.then;
        if (h && (typeof h == "object" || typeof h == "function") && typeof g == "function") return function() {
          g.apply(h, arguments);
        };
      }
      function l(h, g) {
        var x = !1;
        function z(D) {
          x || (x = !0, a.reject(h, D));
        }
        function R(D) {
          x || (x = !0, a.resolve(h, D));
        }
        var L = m(function() {
          g(R, z);
        });
        L.status === "error" && z(L.value);
      }
      function m(h, g) {
        var x = {};
        try {
          x.value = h(g), x.status = "success";
        } catch (z) {
          x.status = "error", x.value = z;
        }
        return x;
      }
      (f.exports = b).prototype.finally = function(h) {
        if (typeof h != "function") return this;
        var g = this.constructor;
        return this.then(function(x) {
          return g.resolve(h()).then(function() {
            return x;
          });
        }, function(x) {
          return g.resolve(h()).then(function() {
            throw x;
          });
        });
      }, b.prototype.catch = function(h) {
        return this.then(null, h);
      }, b.prototype.then = function(h, g) {
        if (typeof h != "function" && this.state === _ || typeof g != "function" && this.state === d) return this;
        var x = new this.constructor(s);
        return this.state !== S ? c(x, this.state === _ ? h : g, this.outcome) : this.queue.push(new y(x, h, g)), x;
      }, y.prototype.callFulfilled = function(h) {
        a.resolve(this.promise, h);
      }, y.prototype.otherCallFulfilled = function(h) {
        c(this.promise, this.onFulfilled, h);
      }, y.prototype.callRejected = function(h) {
        a.reject(this.promise, h);
      }, y.prototype.otherCallRejected = function(h) {
        c(this.promise, this.onRejected, h);
      }, a.resolve = function(h, g) {
        var x = m(w, g);
        if (x.status === "error") return a.reject(h, x.value);
        var z = x.value;
        if (z) l(h, z);
        else {
          h.state = _, h.outcome = g;
          for (var R = -1, L = h.queue.length; ++R < L; ) h.queue[R].callFulfilled(g);
        }
        return h;
      }, a.reject = function(h, g) {
        h.state = d, h.outcome = g;
        for (var x = -1, z = h.queue.length; ++x < z; ) h.queue[x].callRejected(g);
        return h;
      }, b.resolve = function(h) {
        return h instanceof this ? h : a.resolve(new this(s), h);
      }, b.reject = function(h) {
        var g = new this(s);
        return a.reject(g, h);
      }, b.all = function(h) {
        var g = this;
        if (Object.prototype.toString.call(h) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = h.length, z = !1;
        if (!x) return this.resolve([]);
        for (var R = new Array(x), L = 0, D = -1, $ = new this(s); ++D < x; ) B(h[D], D);
        return $;
        function B(V, Q) {
          g.resolve(V).then(function(k) {
            R[Q] = k, ++L !== x || z || (z = !0, a.resolve($, R));
          }, function(k) {
            z || (z = !0, a.reject($, k));
          });
        }
      }, b.race = function(h) {
        var g = this;
        if (Object.prototype.toString.call(h) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = h.length, z = !1;
        if (!x) return this.resolve([]);
        for (var R = -1, L = new this(s); ++R < x; ) D = h[R], g.resolve(D).then(function($) {
          z || (z = !0, a.resolve(L, $));
        }, function($) {
          z || (z = !0, a.reject(L, $));
        });
        var D;
        return L;
      };
    }, { immediate: 36 }], 38: [function(n, f, u) {
      var r = {};
      (0, n("./lib/utils/common").assign)(r, n("./lib/deflate"), n("./lib/inflate"), n("./lib/zlib/constants")), f.exports = r;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(n, f, u) {
      var r = n("./zlib/deflate"), s = n("./utils/common"), a = n("./utils/strings"), d = n("./zlib/messages"), _ = n("./zlib/zstream"), S = Object.prototype.toString, b = 0, y = -1, c = 0, w = 8;
      function l(h) {
        if (!(this instanceof l)) return new l(h);
        this.options = s.assign({ level: y, method: w, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, h || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var x = r.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (x !== b) throw new Error(d[x]);
        if (g.header && r.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var z;
          if (z = typeof g.dictionary == "string" ? a.string2buf(g.dictionary) : S.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (x = r.deflateSetDictionary(this.strm, z)) !== b) throw new Error(d[x]);
          this._dict_set = !0;
        }
      }
      function m(h, g) {
        var x = new l(g);
        if (x.push(h, !0), x.err) throw x.msg || d[x.err];
        return x.result;
      }
      l.prototype.push = function(h, g) {
        var x, z, R = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        z = g === ~~g ? g : g === !0 ? 4 : 0, typeof h == "string" ? R.input = a.string2buf(h) : S.call(h) === "[object ArrayBuffer]" ? R.input = new Uint8Array(h) : R.input = h, R.next_in = 0, R.avail_in = R.input.length;
        do {
          if (R.avail_out === 0 && (R.output = new s.Buf8(L), R.next_out = 0, R.avail_out = L), (x = r.deflate(R, z)) !== 1 && x !== b) return this.onEnd(x), !(this.ended = !0);
          R.avail_out !== 0 && (R.avail_in !== 0 || z !== 4 && z !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(s.shrinkBuf(R.output, R.next_out))) : this.onData(s.shrinkBuf(R.output, R.next_out)));
        } while ((0 < R.avail_in || R.avail_out === 0) && x !== 1);
        return z === 4 ? (x = r.deflateEnd(this.strm), this.onEnd(x), this.ended = !0, x === b) : z !== 2 || (this.onEnd(b), !(R.avail_out = 0));
      }, l.prototype.onData = function(h) {
        this.chunks.push(h);
      }, l.prototype.onEnd = function(h) {
        h === b && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = h, this.msg = this.strm.msg;
      }, u.Deflate = l, u.deflate = m, u.deflateRaw = function(h, g) {
        return (g = g || {}).raw = !0, m(h, g);
      }, u.gzip = function(h, g) {
        return (g = g || {}).gzip = !0, m(h, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(n, f, u) {
      var r = n("./zlib/inflate"), s = n("./utils/common"), a = n("./utils/strings"), d = n("./zlib/constants"), _ = n("./zlib/messages"), S = n("./zlib/zstream"), b = n("./zlib/gzheader"), y = Object.prototype.toString;
      function c(l) {
        if (!(this instanceof c)) return new c(l);
        this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, l || {});
        var m = this.options;
        m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), !(0 <= m.windowBits && m.windowBits < 16) || l && l.windowBits || (m.windowBits += 32), 15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
        var h = r.inflateInit2(this.strm, m.windowBits);
        if (h !== d.Z_OK) throw new Error(_[h]);
        this.header = new b(), r.inflateGetHeader(this.strm, this.header);
      }
      function w(l, m) {
        var h = new c(m);
        if (h.push(l, !0), h.err) throw h.msg || _[h.err];
        return h.result;
      }
      c.prototype.push = function(l, m) {
        var h, g, x, z, R, L, D = this.strm, $ = this.options.chunkSize, B = this.options.dictionary, V = !1;
        if (this.ended) return !1;
        g = m === ~~m ? m : m === !0 ? d.Z_FINISH : d.Z_NO_FLUSH, typeof l == "string" ? D.input = a.binstring2buf(l) : y.call(l) === "[object ArrayBuffer]" ? D.input = new Uint8Array(l) : D.input = l, D.next_in = 0, D.avail_in = D.input.length;
        do {
          if (D.avail_out === 0 && (D.output = new s.Buf8($), D.next_out = 0, D.avail_out = $), (h = r.inflate(D, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && B && (L = typeof B == "string" ? a.string2buf(B) : y.call(B) === "[object ArrayBuffer]" ? new Uint8Array(B) : B, h = r.inflateSetDictionary(this.strm, L)), h === d.Z_BUF_ERROR && V === !0 && (h = d.Z_OK, V = !1), h !== d.Z_STREAM_END && h !== d.Z_OK) return this.onEnd(h), !(this.ended = !0);
          D.next_out && (D.avail_out !== 0 && h !== d.Z_STREAM_END && (D.avail_in !== 0 || g !== d.Z_FINISH && g !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = a.utf8border(D.output, D.next_out), z = D.next_out - x, R = a.buf2string(D.output, x), D.next_out = z, D.avail_out = $ - z, z && s.arraySet(D.output, D.output, x, z, 0), this.onData(R)) : this.onData(s.shrinkBuf(D.output, D.next_out)))), D.avail_in === 0 && D.avail_out === 0 && (V = !0);
        } while ((0 < D.avail_in || D.avail_out === 0) && h !== d.Z_STREAM_END);
        return h === d.Z_STREAM_END && (g = d.Z_FINISH), g === d.Z_FINISH ? (h = r.inflateEnd(this.strm), this.onEnd(h), this.ended = !0, h === d.Z_OK) : g !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(D.avail_out = 0));
      }, c.prototype.onData = function(l) {
        this.chunks.push(l);
      }, c.prototype.onEnd = function(l) {
        l === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = l, this.msg = this.strm.msg;
      }, u.Inflate = c, u.inflate = w, u.inflateRaw = function(l, m) {
        return (m = m || {}).raw = !0, w(l, m);
      }, u.ungzip = w;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(n, f, u) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      u.assign = function(d) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var S = _.shift();
          if (S) {
            if (typeof S != "object") throw new TypeError(S + "must be non-object");
            for (var b in S) S.hasOwnProperty(b) && (d[b] = S[b]);
          }
        }
        return d;
      }, u.shrinkBuf = function(d, _) {
        return d.length === _ ? d : d.subarray ? d.subarray(0, _) : (d.length = _, d);
      };
      var s = { arraySet: function(d, _, S, b, y) {
        if (_.subarray && d.subarray) d.set(_.subarray(S, S + b), y);
        else for (var c = 0; c < b; c++) d[y + c] = _[S + c];
      }, flattenChunks: function(d) {
        var _, S, b, y, c, w;
        for (_ = b = 0, S = d.length; _ < S; _++) b += d[_].length;
        for (w = new Uint8Array(b), _ = y = 0, S = d.length; _ < S; _++) c = d[_], w.set(c, y), y += c.length;
        return w;
      } }, a = { arraySet: function(d, _, S, b, y) {
        for (var c = 0; c < b; c++) d[y + c] = _[S + c];
      }, flattenChunks: function(d) {
        return [].concat.apply([], d);
      } };
      u.setTyped = function(d) {
        d ? (u.Buf8 = Uint8Array, u.Buf16 = Uint16Array, u.Buf32 = Int32Array, u.assign(u, s)) : (u.Buf8 = Array, u.Buf16 = Array, u.Buf32 = Array, u.assign(u, a));
      }, u.setTyped(r);
    }, {}], 42: [function(n, f, u) {
      var r = n("./common"), s = !0, a = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        s = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        a = !1;
      }
      for (var d = new r.Buf8(256), _ = 0; _ < 256; _++) d[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
      function S(b, y) {
        if (y < 65537 && (b.subarray && a || !b.subarray && s)) return String.fromCharCode.apply(null, r.shrinkBuf(b, y));
        for (var c = "", w = 0; w < y; w++) c += String.fromCharCode(b[w]);
        return c;
      }
      d[254] = d[254] = 1, u.string2buf = function(b) {
        var y, c, w, l, m, h = b.length, g = 0;
        for (l = 0; l < h; l++) (64512 & (c = b.charCodeAt(l))) == 55296 && l + 1 < h && (64512 & (w = b.charCodeAt(l + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), l++), g += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        for (y = new r.Buf8(g), l = m = 0; m < g; l++) (64512 & (c = b.charCodeAt(l))) == 55296 && l + 1 < h && (64512 & (w = b.charCodeAt(l + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), l++), c < 128 ? y[m++] = c : (c < 2048 ? y[m++] = 192 | c >>> 6 : (c < 65536 ? y[m++] = 224 | c >>> 12 : (y[m++] = 240 | c >>> 18, y[m++] = 128 | c >>> 12 & 63), y[m++] = 128 | c >>> 6 & 63), y[m++] = 128 | 63 & c);
        return y;
      }, u.buf2binstring = function(b) {
        return S(b, b.length);
      }, u.binstring2buf = function(b) {
        for (var y = new r.Buf8(b.length), c = 0, w = y.length; c < w; c++) y[c] = b.charCodeAt(c);
        return y;
      }, u.buf2string = function(b, y) {
        var c, w, l, m, h = y || b.length, g = new Array(2 * h);
        for (c = w = 0; c < h; ) if ((l = b[c++]) < 128) g[w++] = l;
        else if (4 < (m = d[l])) g[w++] = 65533, c += m - 1;
        else {
          for (l &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && c < h; ) l = l << 6 | 63 & b[c++], m--;
          1 < m ? g[w++] = 65533 : l < 65536 ? g[w++] = l : (l -= 65536, g[w++] = 55296 | l >> 10 & 1023, g[w++] = 56320 | 1023 & l);
        }
        return S(g, w);
      }, u.utf8border = function(b, y) {
        var c;
        for ((y = y || b.length) > b.length && (y = b.length), c = y - 1; 0 <= c && (192 & b[c]) == 128; ) c--;
        return c < 0 || c === 0 ? y : c + d[b[c]] > y ? c : y;
      };
    }, { "./common": 41 }], 43: [function(n, f, u) {
      f.exports = function(r, s, a, d) {
        for (var _ = 65535 & r | 0, S = r >>> 16 & 65535 | 0, b = 0; a !== 0; ) {
          for (a -= b = 2e3 < a ? 2e3 : a; S = S + (_ = _ + s[d++] | 0) | 0, --b; ) ;
          _ %= 65521, S %= 65521;
        }
        return _ | S << 16 | 0;
      };
    }, {}], 44: [function(n, f, u) {
      f.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(n, f, u) {
      var r = function() {
        for (var s, a = [], d = 0; d < 256; d++) {
          s = d;
          for (var _ = 0; _ < 8; _++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
          a[d] = s;
        }
        return a;
      }();
      f.exports = function(s, a, d, _) {
        var S = r, b = _ + d;
        s ^= -1;
        for (var y = _; y < b; y++) s = s >>> 8 ^ S[255 & (s ^ a[y])];
        return -1 ^ s;
      };
    }, {}], 46: [function(n, f, u) {
      var r, s = n("../utils/common"), a = n("./trees"), d = n("./adler32"), _ = n("./crc32"), S = n("./messages"), b = 0, y = 4, c = 0, w = -2, l = -1, m = 4, h = 2, g = 8, x = 9, z = 286, R = 30, L = 19, D = 2 * z + 1, $ = 15, B = 3, V = 258, Q = V + B + 1, k = 42, F = 113, i = 1, N = 2, nt = 3, W = 4;
      function ot(t, U) {
        return t.msg = S[U], U;
      }
      function Z(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function it(t) {
        for (var U = t.length; 0 <= --U; ) t[U] = 0;
      }
      function O(t) {
        var U = t.state, P = U.pending;
        P > t.avail_out && (P = t.avail_out), P !== 0 && (s.arraySet(t.output, U.pending_buf, U.pending_out, P, t.next_out), t.next_out += P, U.pending_out += P, t.total_out += P, t.avail_out -= P, U.pending -= P, U.pending === 0 && (U.pending_out = 0));
      }
      function I(t, U) {
        a._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, U), t.block_start = t.strstart, O(t.strm);
      }
      function et(t, U) {
        t.pending_buf[t.pending++] = U;
      }
      function K(t, U) {
        t.pending_buf[t.pending++] = U >>> 8 & 255, t.pending_buf[t.pending++] = 255 & U;
      }
      function Y(t, U) {
        var P, v, p = t.max_chain_length, C = t.strstart, M = t.prev_length, j = t.nice_match, A = t.strstart > t.w_size - Q ? t.strstart - (t.w_size - Q) : 0, G = t.window, J = t.w_mask, X = t.prev, tt = t.strstart + V, vt = G[C + M - 1], dt = G[C + M];
        t.prev_length >= t.good_match && (p >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (G[(P = U) + M] === dt && G[P + M - 1] === vt && G[P] === G[C] && G[++P] === G[C + 1]) {
            C += 2, P++;
            do
              ;
            while (G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && G[++C] === G[++P] && C < tt);
            if (v = V - (tt - C), C = tt - V, M < v) {
              if (t.match_start = U, j <= (M = v)) break;
              vt = G[C + M - 1], dt = G[C + M];
            }
          }
        while ((U = X[U & J]) > A && --p != 0);
        return M <= t.lookahead ? M : t.lookahead;
      }
      function yt(t) {
        var U, P, v, p, C, M, j, A, G, J, X = t.w_size;
        do {
          if (p = t.window_size - t.lookahead - t.strstart, t.strstart >= X + (X - Q)) {
            for (s.arraySet(t.window, t.window, X, X, 0), t.match_start -= X, t.strstart -= X, t.block_start -= X, U = P = t.hash_size; v = t.head[--U], t.head[U] = X <= v ? v - X : 0, --P; ) ;
            for (U = P = X; v = t.prev[--U], t.prev[U] = X <= v ? v - X : 0, --P; ) ;
            p += X;
          }
          if (t.strm.avail_in === 0) break;
          if (M = t.strm, j = t.window, A = t.strstart + t.lookahead, G = p, J = void 0, J = M.avail_in, G < J && (J = G), P = J === 0 ? 0 : (M.avail_in -= J, s.arraySet(j, M.input, M.next_in, J, A), M.state.wrap === 1 ? M.adler = d(M.adler, j, J, A) : M.state.wrap === 2 && (M.adler = _(M.adler, j, J, A)), M.next_in += J, M.total_in += J, J), t.lookahead += P, t.lookahead + t.insert >= B) for (C = t.strstart - t.insert, t.ins_h = t.window[C], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + B - 1]) & t.hash_mask, t.prev[C & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = C, C++, t.insert--, !(t.lookahead + t.insert < B)); ) ;
        } while (t.lookahead < Q && t.strm.avail_in !== 0);
      }
      function xt(t, U) {
        for (var P, v; ; ) {
          if (t.lookahead < Q) {
            if (yt(t), t.lookahead < Q && U === b) return i;
            if (t.lookahead === 0) break;
          }
          if (P = 0, t.lookahead >= B && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, P = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), P !== 0 && t.strstart - P <= t.w_size - Q && (t.match_length = Y(t, P)), t.match_length >= B) if (v = a._tr_tally(t, t.strstart - t.match_start, t.match_length - B), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= B) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, P = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = a._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (I(t, !1), t.strm.avail_out === 0)) return i;
        }
        return t.insert = t.strstart < B - 1 ? t.strstart : B - 1, U === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : W) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? i : N;
      }
      function ct(t, U) {
        for (var P, v, p; ; ) {
          if (t.lookahead < Q) {
            if (yt(t), t.lookahead < Q && U === b) return i;
            if (t.lookahead === 0) break;
          }
          if (P = 0, t.lookahead >= B && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, P = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = B - 1, P !== 0 && t.prev_length < t.max_lazy_match && t.strstart - P <= t.w_size - Q && (t.match_length = Y(t, P), t.match_length <= 5 && (t.strategy === 1 || t.match_length === B && 4096 < t.strstart - t.match_start) && (t.match_length = B - 1)), t.prev_length >= B && t.match_length <= t.prev_length) {
            for (p = t.strstart + t.lookahead - B, v = a._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - B), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= p && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, P = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = B - 1, t.strstart++, v && (I(t, !1), t.strm.avail_out === 0)) return i;
          } else if (t.match_available) {
            if ((v = a._tr_tally(t, 0, t.window[t.strstart - 1])) && I(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return i;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = a._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < B - 1 ? t.strstart : B - 1, U === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : W) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? i : N;
      }
      function ft(t, U, P, v, p) {
        this.good_length = t, this.max_lazy = U, this.nice_length = P, this.max_chain = v, this.func = p;
      }
      function at() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * D), this.dyn_dtree = new s.Buf16(2 * (2 * R + 1)), this.bl_tree = new s.Buf16(2 * (2 * L + 1)), it(this.dyn_ltree), it(this.dyn_dtree), it(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16($ + 1), this.heap = new s.Buf16(2 * z + 1), it(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * z + 1), it(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function _t(t) {
        var U;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = h, (U = t.state).pending = 0, U.pending_out = 0, U.wrap < 0 && (U.wrap = -U.wrap), U.status = U.wrap ? k : F, t.adler = U.wrap === 2 ? 0 : 1, U.last_flush = b, a._tr_init(U), c) : ot(t, w);
      }
      function Tt(t) {
        var U = _t(t);
        return U === c && function(P) {
          P.window_size = 2 * P.w_size, it(P.head), P.max_lazy_match = r[P.level].max_lazy, P.good_match = r[P.level].good_length, P.nice_match = r[P.level].nice_length, P.max_chain_length = r[P.level].max_chain, P.strstart = 0, P.block_start = 0, P.lookahead = 0, P.insert = 0, P.match_length = P.prev_length = B - 1, P.match_available = 0, P.ins_h = 0;
        }(t.state), U;
      }
      function It(t, U, P, v, p, C) {
        if (!t) return w;
        var M = 1;
        if (U === l && (U = 6), v < 0 ? (M = 0, v = -v) : 15 < v && (M = 2, v -= 16), p < 1 || x < p || P !== g || v < 8 || 15 < v || U < 0 || 9 < U || C < 0 || m < C) return ot(t, w);
        v === 8 && (v = 9);
        var j = new at();
        return (t.state = j).strm = t, j.wrap = M, j.gzhead = null, j.w_bits = v, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = p + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + B - 1) / B), j.window = new s.Buf8(2 * j.w_size), j.head = new s.Buf16(j.hash_size), j.prev = new s.Buf16(j.w_size), j.lit_bufsize = 1 << p + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new s.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = U, j.strategy = C, j.method = P, Tt(t);
      }
      r = [new ft(0, 0, 0, 0, function(t, U) {
        var P = 65535;
        for (P > t.pending_buf_size - 5 && (P = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (yt(t), t.lookahead === 0 && U === b) return i;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + P;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, I(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - Q && (I(t, !1), t.strm.avail_out === 0)) return i;
        }
        return t.insert = 0, U === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : W) : (t.strstart > t.block_start && (I(t, !1), t.strm.avail_out), i);
      }), new ft(4, 4, 8, 4, xt), new ft(4, 5, 16, 8, xt), new ft(4, 6, 32, 32, xt), new ft(4, 4, 16, 16, ct), new ft(8, 16, 32, 32, ct), new ft(8, 16, 128, 128, ct), new ft(8, 32, 128, 256, ct), new ft(32, 128, 258, 1024, ct), new ft(32, 258, 258, 4096, ct)], u.deflateInit = function(t, U) {
        return It(t, U, g, 15, 8, 0);
      }, u.deflateInit2 = It, u.deflateReset = Tt, u.deflateResetKeep = _t, u.deflateSetHeader = function(t, U) {
        return t && t.state ? t.state.wrap !== 2 ? w : (t.state.gzhead = U, c) : w;
      }, u.deflate = function(t, U) {
        var P, v, p, C;
        if (!t || !t.state || 5 < U || U < 0) return t ? ot(t, w) : w;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && U !== y) return ot(t, t.avail_out === 0 ? -5 : w);
        if (v.strm = t, P = v.last_flush, v.last_flush = U, v.status === k) if (v.wrap === 2) t.adler = 0, et(v, 31), et(v, 139), et(v, 8), v.gzhead ? (et(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), et(v, 255 & v.gzhead.time), et(v, v.gzhead.time >> 8 & 255), et(v, v.gzhead.time >> 16 & 255), et(v, v.gzhead.time >> 24 & 255), et(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), et(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (et(v, 255 & v.gzhead.extra.length), et(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = _(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (et(v, 0), et(v, 0), et(v, 0), et(v, 0), et(v, 0), et(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), et(v, 3), v.status = F);
        else {
          var M = g + (v.w_bits - 8 << 4) << 8;
          M |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && (M |= 32), M += 31 - M % 31, v.status = F, K(v, M), v.strstart !== 0 && (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), t.adler = 1;
        }
        if (v.status === 69) if (v.gzhead.extra) {
          for (p = v.pending; v.gzindex < (65535 & v.gzhead.extra.length) && (v.pending !== v.pending_buf_size || (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), O(t), p = v.pending, v.pending !== v.pending_buf_size)); ) et(v, 255 & v.gzhead.extra[v.gzindex]), v.gzindex++;
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), v.gzindex === v.gzhead.extra.length && (v.gzindex = 0, v.status = 73);
        } else v.status = 73;
        if (v.status === 73) if (v.gzhead.name) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), O(t), p = v.pending, v.pending === v.pending_buf_size)) {
              C = 1;
              break;
            }
            C = v.gzindex < v.gzhead.name.length ? 255 & v.gzhead.name.charCodeAt(v.gzindex++) : 0, et(v, C);
          } while (C !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), C === 0 && (v.gzindex = 0, v.status = 91);
        } else v.status = 91;
        if (v.status === 91) if (v.gzhead.comment) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), O(t), p = v.pending, v.pending === v.pending_buf_size)) {
              C = 1;
              break;
            }
            C = v.gzindex < v.gzhead.comment.length ? 255 & v.gzhead.comment.charCodeAt(v.gzindex++) : 0, et(v, C);
          } while (C !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), C === 0 && (v.status = 103);
        } else v.status = 103;
        if (v.status === 103 && (v.gzhead.hcrc ? (v.pending + 2 > v.pending_buf_size && O(t), v.pending + 2 <= v.pending_buf_size && (et(v, 255 & t.adler), et(v, t.adler >> 8 & 255), t.adler = 0, v.status = F)) : v.status = F), v.pending !== 0) {
          if (O(t), t.avail_out === 0) return v.last_flush = -1, c;
        } else if (t.avail_in === 0 && Z(U) <= Z(P) && U !== y) return ot(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return ot(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || U !== b && v.status !== 666) {
          var j = v.strategy === 2 ? function(A, G) {
            for (var J; ; ) {
              if (A.lookahead === 0 && (yt(A), A.lookahead === 0)) {
                if (G === b) return i;
                break;
              }
              if (A.match_length = 0, J = a._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++, J && (I(A, !1), A.strm.avail_out === 0)) return i;
            }
            return A.insert = 0, G === y ? (I(A, !0), A.strm.avail_out === 0 ? nt : W) : A.last_lit && (I(A, !1), A.strm.avail_out === 0) ? i : N;
          }(v, U) : v.strategy === 3 ? function(A, G) {
            for (var J, X, tt, vt, dt = A.window; ; ) {
              if (A.lookahead <= V) {
                if (yt(A), A.lookahead <= V && G === b) return i;
                if (A.lookahead === 0) break;
              }
              if (A.match_length = 0, A.lookahead >= B && 0 < A.strstart && (X = dt[tt = A.strstart - 1]) === dt[++tt] && X === dt[++tt] && X === dt[++tt]) {
                vt = A.strstart + V;
                do
                  ;
                while (X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && X === dt[++tt] && tt < vt);
                A.match_length = V - (vt - tt), A.match_length > A.lookahead && (A.match_length = A.lookahead);
              }
              if (A.match_length >= B ? (J = a._tr_tally(A, 1, A.match_length - B), A.lookahead -= A.match_length, A.strstart += A.match_length, A.match_length = 0) : (J = a._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++), J && (I(A, !1), A.strm.avail_out === 0)) return i;
            }
            return A.insert = 0, G === y ? (I(A, !0), A.strm.avail_out === 0 ? nt : W) : A.last_lit && (I(A, !1), A.strm.avail_out === 0) ? i : N;
          }(v, U) : r[v.level].func(v, U);
          if (j !== nt && j !== W || (v.status = 666), j === i || j === nt) return t.avail_out === 0 && (v.last_flush = -1), c;
          if (j === N && (U === 1 ? a._tr_align(v) : U !== 5 && (a._tr_stored_block(v, 0, 0, !1), U === 3 && (it(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), O(t), t.avail_out === 0)) return v.last_flush = -1, c;
        }
        return U !== y ? c : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (et(v, 255 & t.adler), et(v, t.adler >> 8 & 255), et(v, t.adler >> 16 & 255), et(v, t.adler >> 24 & 255), et(v, 255 & t.total_in), et(v, t.total_in >> 8 & 255), et(v, t.total_in >> 16 & 255), et(v, t.total_in >> 24 & 255)) : (K(v, t.adler >>> 16), K(v, 65535 & t.adler)), O(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? c : 1);
      }, u.deflateEnd = function(t) {
        var U;
        return t && t.state ? (U = t.state.status) !== k && U !== 69 && U !== 73 && U !== 91 && U !== 103 && U !== F && U !== 666 ? ot(t, w) : (t.state = null, U === F ? ot(t, -3) : c) : w;
      }, u.deflateSetDictionary = function(t, U) {
        var P, v, p, C, M, j, A, G, J = U.length;
        if (!t || !t.state || (C = (P = t.state).wrap) === 2 || C === 1 && P.status !== k || P.lookahead) return w;
        for (C === 1 && (t.adler = d(t.adler, U, J, 0)), P.wrap = 0, J >= P.w_size && (C === 0 && (it(P.head), P.strstart = 0, P.block_start = 0, P.insert = 0), G = new s.Buf8(P.w_size), s.arraySet(G, U, J - P.w_size, P.w_size, 0), U = G, J = P.w_size), M = t.avail_in, j = t.next_in, A = t.input, t.avail_in = J, t.next_in = 0, t.input = U, yt(P); P.lookahead >= B; ) {
          for (v = P.strstart, p = P.lookahead - (B - 1); P.ins_h = (P.ins_h << P.hash_shift ^ P.window[v + B - 1]) & P.hash_mask, P.prev[v & P.w_mask] = P.head[P.ins_h], P.head[P.ins_h] = v, v++, --p; ) ;
          P.strstart = v, P.lookahead = B - 1, yt(P);
        }
        return P.strstart += P.lookahead, P.block_start = P.strstart, P.insert = P.lookahead, P.lookahead = 0, P.match_length = P.prev_length = B - 1, P.match_available = 0, t.next_in = j, t.input = A, t.avail_in = M, P.wrap = C, c;
      }, u.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(n, f, u) {
      f.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(n, f, u) {
      f.exports = function(r, s) {
        var a, d, _, S, b, y, c, w, l, m, h, g, x, z, R, L, D, $, B, V, Q, k, F, i, N;
        a = r.state, d = r.next_in, i = r.input, _ = d + (r.avail_in - 5), S = r.next_out, N = r.output, b = S - (s - r.avail_out), y = S + (r.avail_out - 257), c = a.dmax, w = a.wsize, l = a.whave, m = a.wnext, h = a.window, g = a.hold, x = a.bits, z = a.lencode, R = a.distcode, L = (1 << a.lenbits) - 1, D = (1 << a.distbits) - 1;
        t: do {
          x < 15 && (g += i[d++] << x, x += 8, g += i[d++] << x, x += 8), $ = z[g & L];
          e: for (; ; ) {
            if (g >>>= B = $ >>> 24, x -= B, (B = $ >>> 16 & 255) === 0) N[S++] = 65535 & $;
            else {
              if (!(16 & B)) {
                if (!(64 & B)) {
                  $ = z[(65535 & $) + (g & (1 << B) - 1)];
                  continue e;
                }
                if (32 & B) {
                  a.mode = 12;
                  break t;
                }
                r.msg = "invalid literal/length code", a.mode = 30;
                break t;
              }
              V = 65535 & $, (B &= 15) && (x < B && (g += i[d++] << x, x += 8), V += g & (1 << B) - 1, g >>>= B, x -= B), x < 15 && (g += i[d++] << x, x += 8, g += i[d++] << x, x += 8), $ = R[g & D];
              r: for (; ; ) {
                if (g >>>= B = $ >>> 24, x -= B, !(16 & (B = $ >>> 16 & 255))) {
                  if (!(64 & B)) {
                    $ = R[(65535 & $) + (g & (1 << B) - 1)];
                    continue r;
                  }
                  r.msg = "invalid distance code", a.mode = 30;
                  break t;
                }
                if (Q = 65535 & $, x < (B &= 15) && (g += i[d++] << x, (x += 8) < B && (g += i[d++] << x, x += 8)), c < (Q += g & (1 << B) - 1)) {
                  r.msg = "invalid distance too far back", a.mode = 30;
                  break t;
                }
                if (g >>>= B, x -= B, (B = S - b) < Q) {
                  if (l < (B = Q - B) && a.sane) {
                    r.msg = "invalid distance too far back", a.mode = 30;
                    break t;
                  }
                  if (F = h, (k = 0) === m) {
                    if (k += w - B, B < V) {
                      for (V -= B; N[S++] = h[k++], --B; ) ;
                      k = S - Q, F = N;
                    }
                  } else if (m < B) {
                    if (k += w + m - B, (B -= m) < V) {
                      for (V -= B; N[S++] = h[k++], --B; ) ;
                      if (k = 0, m < V) {
                        for (V -= B = m; N[S++] = h[k++], --B; ) ;
                        k = S - Q, F = N;
                      }
                    }
                  } else if (k += m - B, B < V) {
                    for (V -= B; N[S++] = h[k++], --B; ) ;
                    k = S - Q, F = N;
                  }
                  for (; 2 < V; ) N[S++] = F[k++], N[S++] = F[k++], N[S++] = F[k++], V -= 3;
                  V && (N[S++] = F[k++], 1 < V && (N[S++] = F[k++]));
                } else {
                  for (k = S - Q; N[S++] = N[k++], N[S++] = N[k++], N[S++] = N[k++], 2 < (V -= 3); ) ;
                  V && (N[S++] = N[k++], 1 < V && (N[S++] = N[k++]));
                }
                break;
              }
            }
            break;
          }
        } while (d < _ && S < y);
        d -= V = x >> 3, g &= (1 << (x -= V << 3)) - 1, r.next_in = d, r.next_out = S, r.avail_in = d < _ ? _ - d + 5 : 5 - (d - _), r.avail_out = S < y ? y - S + 257 : 257 - (S - y), a.hold = g, a.bits = x;
      };
    }, {}], 49: [function(n, f, u) {
      var r = n("../utils/common"), s = n("./adler32"), a = n("./crc32"), d = n("./inffast"), _ = n("./inftrees"), S = 1, b = 2, y = 0, c = -2, w = 1, l = 852, m = 592;
      function h(k) {
        return (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function x(k) {
        var F;
        return k && k.state ? (F = k.state, k.total_in = k.total_out = F.total = 0, k.msg = "", F.wrap && (k.adler = 1 & F.wrap), F.mode = w, F.last = 0, F.havedict = 0, F.dmax = 32768, F.head = null, F.hold = 0, F.bits = 0, F.lencode = F.lendyn = new r.Buf32(l), F.distcode = F.distdyn = new r.Buf32(m), F.sane = 1, F.back = -1, y) : c;
      }
      function z(k) {
        var F;
        return k && k.state ? ((F = k.state).wsize = 0, F.whave = 0, F.wnext = 0, x(k)) : c;
      }
      function R(k, F) {
        var i, N;
        return k && k.state ? (N = k.state, F < 0 ? (i = 0, F = -F) : (i = 1 + (F >> 4), F < 48 && (F &= 15)), F && (F < 8 || 15 < F) ? c : (N.window !== null && N.wbits !== F && (N.window = null), N.wrap = i, N.wbits = F, z(k))) : c;
      }
      function L(k, F) {
        var i, N;
        return k ? (N = new g(), (k.state = N).window = null, (i = R(k, F)) !== y && (k.state = null), i) : c;
      }
      var D, $, B = !0;
      function V(k) {
        if (B) {
          var F;
          for (D = new r.Buf32(512), $ = new r.Buf32(32), F = 0; F < 144; ) k.lens[F++] = 8;
          for (; F < 256; ) k.lens[F++] = 9;
          for (; F < 280; ) k.lens[F++] = 7;
          for (; F < 288; ) k.lens[F++] = 8;
          for (_(S, k.lens, 0, 288, D, 0, k.work, { bits: 9 }), F = 0; F < 32; ) k.lens[F++] = 5;
          _(b, k.lens, 0, 32, $, 0, k.work, { bits: 5 }), B = !1;
        }
        k.lencode = D, k.lenbits = 9, k.distcode = $, k.distbits = 5;
      }
      function Q(k, F, i, N) {
        var nt, W = k.state;
        return W.window === null && (W.wsize = 1 << W.wbits, W.wnext = 0, W.whave = 0, W.window = new r.Buf8(W.wsize)), N >= W.wsize ? (r.arraySet(W.window, F, i - W.wsize, W.wsize, 0), W.wnext = 0, W.whave = W.wsize) : (N < (nt = W.wsize - W.wnext) && (nt = N), r.arraySet(W.window, F, i - N, nt, W.wnext), (N -= nt) ? (r.arraySet(W.window, F, i - N, N, 0), W.wnext = N, W.whave = W.wsize) : (W.wnext += nt, W.wnext === W.wsize && (W.wnext = 0), W.whave < W.wsize && (W.whave += nt))), 0;
      }
      u.inflateReset = z, u.inflateReset2 = R, u.inflateResetKeep = x, u.inflateInit = function(k) {
        return L(k, 15);
      }, u.inflateInit2 = L, u.inflate = function(k, F) {
        var i, N, nt, W, ot, Z, it, O, I, et, K, Y, yt, xt, ct, ft, at, _t, Tt, It, t, U, P, v, p = 0, C = new r.Buf8(4), M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!k || !k.state || !k.output || !k.input && k.avail_in !== 0) return c;
        (i = k.state).mode === 12 && (i.mode = 13), ot = k.next_out, nt = k.output, it = k.avail_out, W = k.next_in, N = k.input, Z = k.avail_in, O = i.hold, I = i.bits, et = Z, K = it, U = y;
        t: for (; ; ) switch (i.mode) {
          case w:
            if (i.wrap === 0) {
              i.mode = 13;
              break;
            }
            for (; I < 16; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if (2 & i.wrap && O === 35615) {
              C[i.check = 0] = 255 & O, C[1] = O >>> 8 & 255, i.check = a(i.check, C, 2, 0), I = O = 0, i.mode = 2;
              break;
            }
            if (i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & O) << 8) + (O >> 8)) % 31) {
              k.msg = "incorrect header check", i.mode = 30;
              break;
            }
            if ((15 & O) != 8) {
              k.msg = "unknown compression method", i.mode = 30;
              break;
            }
            if (I -= 4, t = 8 + (15 & (O >>>= 4)), i.wbits === 0) i.wbits = t;
            else if (t > i.wbits) {
              k.msg = "invalid window size", i.mode = 30;
              break;
            }
            i.dmax = 1 << t, k.adler = i.check = 1, i.mode = 512 & O ? 10 : 12, I = O = 0;
            break;
          case 2:
            for (; I < 16; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if (i.flags = O, (255 & i.flags) != 8) {
              k.msg = "unknown compression method", i.mode = 30;
              break;
            }
            if (57344 & i.flags) {
              k.msg = "unknown header flags set", i.mode = 30;
              break;
            }
            i.head && (i.head.text = O >> 8 & 1), 512 & i.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, i.check = a(i.check, C, 2, 0)), I = O = 0, i.mode = 3;
          case 3:
            for (; I < 32; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            i.head && (i.head.time = O), 512 & i.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, C[2] = O >>> 16 & 255, C[3] = O >>> 24 & 255, i.check = a(i.check, C, 4, 0)), I = O = 0, i.mode = 4;
          case 4:
            for (; I < 16; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            i.head && (i.head.xflags = 255 & O, i.head.os = O >> 8), 512 & i.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, i.check = a(i.check, C, 2, 0)), I = O = 0, i.mode = 5;
          case 5:
            if (1024 & i.flags) {
              for (; I < 16; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              i.length = O, i.head && (i.head.extra_len = O), 512 & i.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, i.check = a(i.check, C, 2, 0)), I = O = 0;
            } else i.head && (i.head.extra = null);
            i.mode = 6;
          case 6:
            if (1024 & i.flags && (Z < (Y = i.length) && (Y = Z), Y && (i.head && (t = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Array(i.head.extra_len)), r.arraySet(i.head.extra, N, W, Y, t)), 512 & i.flags && (i.check = a(i.check, N, Y, W)), Z -= Y, W += Y, i.length -= Y), i.length)) break t;
            i.length = 0, i.mode = 7;
          case 7:
            if (2048 & i.flags) {
              if (Z === 0) break t;
              for (Y = 0; t = N[W + Y++], i.head && t && i.length < 65536 && (i.head.name += String.fromCharCode(t)), t && Y < Z; ) ;
              if (512 & i.flags && (i.check = a(i.check, N, Y, W)), Z -= Y, W += Y, t) break t;
            } else i.head && (i.head.name = null);
            i.length = 0, i.mode = 8;
          case 8:
            if (4096 & i.flags) {
              if (Z === 0) break t;
              for (Y = 0; t = N[W + Y++], i.head && t && i.length < 65536 && (i.head.comment += String.fromCharCode(t)), t && Y < Z; ) ;
              if (512 & i.flags && (i.check = a(i.check, N, Y, W)), Z -= Y, W += Y, t) break t;
            } else i.head && (i.head.comment = null);
            i.mode = 9;
          case 9:
            if (512 & i.flags) {
              for (; I < 16; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              if (O !== (65535 & i.check)) {
                k.msg = "header crc mismatch", i.mode = 30;
                break;
              }
              I = O = 0;
            }
            i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), k.adler = i.check = 0, i.mode = 12;
            break;
          case 10:
            for (; I < 32; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            k.adler = i.check = h(O), I = O = 0, i.mode = 11;
          case 11:
            if (i.havedict === 0) return k.next_out = ot, k.avail_out = it, k.next_in = W, k.avail_in = Z, i.hold = O, i.bits = I, 2;
            k.adler = i.check = 1, i.mode = 12;
          case 12:
            if (F === 5 || F === 6) break t;
          case 13:
            if (i.last) {
              O >>>= 7 & I, I -= 7 & I, i.mode = 27;
              break;
            }
            for (; I < 3; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            switch (i.last = 1 & O, I -= 1, 3 & (O >>>= 1)) {
              case 0:
                i.mode = 14;
                break;
              case 1:
                if (V(i), i.mode = 20, F !== 6) break;
                O >>>= 2, I -= 2;
                break t;
              case 2:
                i.mode = 17;
                break;
              case 3:
                k.msg = "invalid block type", i.mode = 30;
            }
            O >>>= 2, I -= 2;
            break;
          case 14:
            for (O >>>= 7 & I, I -= 7 & I; I < 32; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if ((65535 & O) != (O >>> 16 ^ 65535)) {
              k.msg = "invalid stored block lengths", i.mode = 30;
              break;
            }
            if (i.length = 65535 & O, I = O = 0, i.mode = 15, F === 6) break t;
          case 15:
            i.mode = 16;
          case 16:
            if (Y = i.length) {
              if (Z < Y && (Y = Z), it < Y && (Y = it), Y === 0) break t;
              r.arraySet(nt, N, W, Y, ot), Z -= Y, W += Y, it -= Y, ot += Y, i.length -= Y;
              break;
            }
            i.mode = 12;
            break;
          case 17:
            for (; I < 14; ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if (i.nlen = 257 + (31 & O), O >>>= 5, I -= 5, i.ndist = 1 + (31 & O), O >>>= 5, I -= 5, i.ncode = 4 + (15 & O), O >>>= 4, I -= 4, 286 < i.nlen || 30 < i.ndist) {
              k.msg = "too many length or distance symbols", i.mode = 30;
              break;
            }
            i.have = 0, i.mode = 18;
          case 18:
            for (; i.have < i.ncode; ) {
              for (; I < 3; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              i.lens[M[i.have++]] = 7 & O, O >>>= 3, I -= 3;
            }
            for (; i.have < 19; ) i.lens[M[i.have++]] = 0;
            if (i.lencode = i.lendyn, i.lenbits = 7, P = { bits: i.lenbits }, U = _(0, i.lens, 0, 19, i.lencode, 0, i.work, P), i.lenbits = P.bits, U) {
              k.msg = "invalid code lengths set", i.mode = 30;
              break;
            }
            i.have = 0, i.mode = 19;
          case 19:
            for (; i.have < i.nlen + i.ndist; ) {
              for (; ft = (p = i.lencode[O & (1 << i.lenbits) - 1]) >>> 16 & 255, at = 65535 & p, !((ct = p >>> 24) <= I); ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              if (at < 16) O >>>= ct, I -= ct, i.lens[i.have++] = at;
              else {
                if (at === 16) {
                  for (v = ct + 2; I < v; ) {
                    if (Z === 0) break t;
                    Z--, O += N[W++] << I, I += 8;
                  }
                  if (O >>>= ct, I -= ct, i.have === 0) {
                    k.msg = "invalid bit length repeat", i.mode = 30;
                    break;
                  }
                  t = i.lens[i.have - 1], Y = 3 + (3 & O), O >>>= 2, I -= 2;
                } else if (at === 17) {
                  for (v = ct + 3; I < v; ) {
                    if (Z === 0) break t;
                    Z--, O += N[W++] << I, I += 8;
                  }
                  I -= ct, t = 0, Y = 3 + (7 & (O >>>= ct)), O >>>= 3, I -= 3;
                } else {
                  for (v = ct + 7; I < v; ) {
                    if (Z === 0) break t;
                    Z--, O += N[W++] << I, I += 8;
                  }
                  I -= ct, t = 0, Y = 11 + (127 & (O >>>= ct)), O >>>= 7, I -= 7;
                }
                if (i.have + Y > i.nlen + i.ndist) {
                  k.msg = "invalid bit length repeat", i.mode = 30;
                  break;
                }
                for (; Y--; ) i.lens[i.have++] = t;
              }
            }
            if (i.mode === 30) break;
            if (i.lens[256] === 0) {
              k.msg = "invalid code -- missing end-of-block", i.mode = 30;
              break;
            }
            if (i.lenbits = 9, P = { bits: i.lenbits }, U = _(S, i.lens, 0, i.nlen, i.lencode, 0, i.work, P), i.lenbits = P.bits, U) {
              k.msg = "invalid literal/lengths set", i.mode = 30;
              break;
            }
            if (i.distbits = 6, i.distcode = i.distdyn, P = { bits: i.distbits }, U = _(b, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, P), i.distbits = P.bits, U) {
              k.msg = "invalid distances set", i.mode = 30;
              break;
            }
            if (i.mode = 20, F === 6) break t;
          case 20:
            i.mode = 21;
          case 21:
            if (6 <= Z && 258 <= it) {
              k.next_out = ot, k.avail_out = it, k.next_in = W, k.avail_in = Z, i.hold = O, i.bits = I, d(k, K), ot = k.next_out, nt = k.output, it = k.avail_out, W = k.next_in, N = k.input, Z = k.avail_in, O = i.hold, I = i.bits, i.mode === 12 && (i.back = -1);
              break;
            }
            for (i.back = 0; ft = (p = i.lencode[O & (1 << i.lenbits) - 1]) >>> 16 & 255, at = 65535 & p, !((ct = p >>> 24) <= I); ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if (ft && !(240 & ft)) {
              for (_t = ct, Tt = ft, It = at; ft = (p = i.lencode[It + ((O & (1 << _t + Tt) - 1) >> _t)]) >>> 16 & 255, at = 65535 & p, !(_t + (ct = p >>> 24) <= I); ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              O >>>= _t, I -= _t, i.back += _t;
            }
            if (O >>>= ct, I -= ct, i.back += ct, i.length = at, ft === 0) {
              i.mode = 26;
              break;
            }
            if (32 & ft) {
              i.back = -1, i.mode = 12;
              break;
            }
            if (64 & ft) {
              k.msg = "invalid literal/length code", i.mode = 30;
              break;
            }
            i.extra = 15 & ft, i.mode = 22;
          case 22:
            if (i.extra) {
              for (v = i.extra; I < v; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              i.length += O & (1 << i.extra) - 1, O >>>= i.extra, I -= i.extra, i.back += i.extra;
            }
            i.was = i.length, i.mode = 23;
          case 23:
            for (; ft = (p = i.distcode[O & (1 << i.distbits) - 1]) >>> 16 & 255, at = 65535 & p, !((ct = p >>> 24) <= I); ) {
              if (Z === 0) break t;
              Z--, O += N[W++] << I, I += 8;
            }
            if (!(240 & ft)) {
              for (_t = ct, Tt = ft, It = at; ft = (p = i.distcode[It + ((O & (1 << _t + Tt) - 1) >> _t)]) >>> 16 & 255, at = 65535 & p, !(_t + (ct = p >>> 24) <= I); ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              O >>>= _t, I -= _t, i.back += _t;
            }
            if (O >>>= ct, I -= ct, i.back += ct, 64 & ft) {
              k.msg = "invalid distance code", i.mode = 30;
              break;
            }
            i.offset = at, i.extra = 15 & ft, i.mode = 24;
          case 24:
            if (i.extra) {
              for (v = i.extra; I < v; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              i.offset += O & (1 << i.extra) - 1, O >>>= i.extra, I -= i.extra, i.back += i.extra;
            }
            if (i.offset > i.dmax) {
              k.msg = "invalid distance too far back", i.mode = 30;
              break;
            }
            i.mode = 25;
          case 25:
            if (it === 0) break t;
            if (Y = K - it, i.offset > Y) {
              if ((Y = i.offset - Y) > i.whave && i.sane) {
                k.msg = "invalid distance too far back", i.mode = 30;
                break;
              }
              yt = Y > i.wnext ? (Y -= i.wnext, i.wsize - Y) : i.wnext - Y, Y > i.length && (Y = i.length), xt = i.window;
            } else xt = nt, yt = ot - i.offset, Y = i.length;
            for (it < Y && (Y = it), it -= Y, i.length -= Y; nt[ot++] = xt[yt++], --Y; ) ;
            i.length === 0 && (i.mode = 21);
            break;
          case 26:
            if (it === 0) break t;
            nt[ot++] = i.length, it--, i.mode = 21;
            break;
          case 27:
            if (i.wrap) {
              for (; I < 32; ) {
                if (Z === 0) break t;
                Z--, O |= N[W++] << I, I += 8;
              }
              if (K -= it, k.total_out += K, i.total += K, K && (k.adler = i.check = i.flags ? a(i.check, nt, K, ot - K) : s(i.check, nt, K, ot - K)), K = it, (i.flags ? O : h(O)) !== i.check) {
                k.msg = "incorrect data check", i.mode = 30;
                break;
              }
              I = O = 0;
            }
            i.mode = 28;
          case 28:
            if (i.wrap && i.flags) {
              for (; I < 32; ) {
                if (Z === 0) break t;
                Z--, O += N[W++] << I, I += 8;
              }
              if (O !== (4294967295 & i.total)) {
                k.msg = "incorrect length check", i.mode = 30;
                break;
              }
              I = O = 0;
            }
            i.mode = 29;
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
        return k.next_out = ot, k.avail_out = it, k.next_in = W, k.avail_in = Z, i.hold = O, i.bits = I, (i.wsize || K !== k.avail_out && i.mode < 30 && (i.mode < 27 || F !== 4)) && Q(k, k.output, k.next_out, K - k.avail_out) ? (i.mode = 31, -4) : (et -= k.avail_in, K -= k.avail_out, k.total_in += et, k.total_out += K, i.total += K, i.wrap && K && (k.adler = i.check = i.flags ? a(i.check, nt, K, k.next_out - K) : s(i.check, nt, K, k.next_out - K)), k.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === 12 ? 128 : 0) + (i.mode === 20 || i.mode === 15 ? 256 : 0), (et == 0 && K === 0 || F === 4) && U === y && (U = -5), U);
      }, u.inflateEnd = function(k) {
        if (!k || !k.state) return c;
        var F = k.state;
        return F.window && (F.window = null), k.state = null, y;
      }, u.inflateGetHeader = function(k, F) {
        var i;
        return k && k.state && 2 & (i = k.state).wrap ? ((i.head = F).done = !1, y) : c;
      }, u.inflateSetDictionary = function(k, F) {
        var i, N = F.length;
        return k && k.state ? (i = k.state).wrap !== 0 && i.mode !== 11 ? c : i.mode === 11 && s(1, F, N, 0) !== i.check ? -3 : Q(k, F, N, N) ? (i.mode = 31, -4) : (i.havedict = 1, y) : c;
      }, u.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(n, f, u) {
      var r = n("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], d = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      f.exports = function(S, b, y, c, w, l, m, h) {
        var g, x, z, R, L, D, $, B, V, Q = h.bits, k = 0, F = 0, i = 0, N = 0, nt = 0, W = 0, ot = 0, Z = 0, it = 0, O = 0, I = null, et = 0, K = new r.Buf16(16), Y = new r.Buf16(16), yt = null, xt = 0;
        for (k = 0; k <= 15; k++) K[k] = 0;
        for (F = 0; F < c; F++) K[b[y + F]]++;
        for (nt = Q, N = 15; 1 <= N && K[N] === 0; N--) ;
        if (N < nt && (nt = N), N === 0) return w[l++] = 20971520, w[l++] = 20971520, h.bits = 1, 0;
        for (i = 1; i < N && K[i] === 0; i++) ;
        for (nt < i && (nt = i), k = Z = 1; k <= 15; k++) if (Z <<= 1, (Z -= K[k]) < 0) return -1;
        if (0 < Z && (S === 0 || N !== 1)) return -1;
        for (Y[1] = 0, k = 1; k < 15; k++) Y[k + 1] = Y[k] + K[k];
        for (F = 0; F < c; F++) b[y + F] !== 0 && (m[Y[b[y + F]]++] = F);
        if (D = S === 0 ? (I = yt = m, 19) : S === 1 ? (I = s, et -= 257, yt = a, xt -= 257, 256) : (I = d, yt = _, -1), k = i, L = l, ot = F = O = 0, z = -1, R = (it = 1 << (W = nt)) - 1, S === 1 && 852 < it || S === 2 && 592 < it) return 1;
        for (; ; ) {
          for ($ = k - ot, V = m[F] < D ? (B = 0, m[F]) : m[F] > D ? (B = yt[xt + m[F]], I[et + m[F]]) : (B = 96, 0), g = 1 << k - ot, i = x = 1 << W; w[L + (O >> ot) + (x -= g)] = $ << 24 | B << 16 | V | 0, x !== 0; ) ;
          for (g = 1 << k - 1; O & g; ) g >>= 1;
          if (g !== 0 ? (O &= g - 1, O += g) : O = 0, F++, --K[k] == 0) {
            if (k === N) break;
            k = b[y + m[F]];
          }
          if (nt < k && (O & R) !== z) {
            for (ot === 0 && (ot = nt), L += i, Z = 1 << (W = k - ot); W + ot < N && !((Z -= K[W + ot]) <= 0); ) W++, Z <<= 1;
            if (it += 1 << W, S === 1 && 852 < it || S === 2 && 592 < it) return 1;
            w[z = O & R] = nt << 24 | W << 16 | L - l | 0;
          }
        }
        return O !== 0 && (w[L + O] = k - ot << 24 | 64 << 16 | 0), h.bits = nt, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(n, f, u) {
      f.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(n, f, u) {
      var r = n("../utils/common"), s = 0, a = 1;
      function d(p) {
        for (var C = p.length; 0 <= --C; ) p[C] = 0;
      }
      var _ = 0, S = 29, b = 256, y = b + 1 + S, c = 30, w = 19, l = 2 * y + 1, m = 15, h = 16, g = 7, x = 256, z = 16, R = 17, L = 18, D = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], $ = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], V = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = new Array(2 * (y + 2));
      d(Q);
      var k = new Array(2 * c);
      d(k);
      var F = new Array(512);
      d(F);
      var i = new Array(256);
      d(i);
      var N = new Array(S);
      d(N);
      var nt, W, ot, Z = new Array(c);
      function it(p, C, M, j, A) {
        this.static_tree = p, this.extra_bits = C, this.extra_base = M, this.elems = j, this.max_length = A, this.has_stree = p && p.length;
      }
      function O(p, C) {
        this.dyn_tree = p, this.max_code = 0, this.stat_desc = C;
      }
      function I(p) {
        return p < 256 ? F[p] : F[256 + (p >>> 7)];
      }
      function et(p, C) {
        p.pending_buf[p.pending++] = 255 & C, p.pending_buf[p.pending++] = C >>> 8 & 255;
      }
      function K(p, C, M) {
        p.bi_valid > h - M ? (p.bi_buf |= C << p.bi_valid & 65535, et(p, p.bi_buf), p.bi_buf = C >> h - p.bi_valid, p.bi_valid += M - h) : (p.bi_buf |= C << p.bi_valid & 65535, p.bi_valid += M);
      }
      function Y(p, C, M) {
        K(p, M[2 * C], M[2 * C + 1]);
      }
      function yt(p, C) {
        for (var M = 0; M |= 1 & p, p >>>= 1, M <<= 1, 0 < --C; ) ;
        return M >>> 1;
      }
      function xt(p, C, M) {
        var j, A, G = new Array(m + 1), J = 0;
        for (j = 1; j <= m; j++) G[j] = J = J + M[j - 1] << 1;
        for (A = 0; A <= C; A++) {
          var X = p[2 * A + 1];
          X !== 0 && (p[2 * A] = yt(G[X]++, X));
        }
      }
      function ct(p) {
        var C;
        for (C = 0; C < y; C++) p.dyn_ltree[2 * C] = 0;
        for (C = 0; C < c; C++) p.dyn_dtree[2 * C] = 0;
        for (C = 0; C < w; C++) p.bl_tree[2 * C] = 0;
        p.dyn_ltree[2 * x] = 1, p.opt_len = p.static_len = 0, p.last_lit = p.matches = 0;
      }
      function ft(p) {
        8 < p.bi_valid ? et(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf), p.bi_buf = 0, p.bi_valid = 0;
      }
      function at(p, C, M, j) {
        var A = 2 * C, G = 2 * M;
        return p[A] < p[G] || p[A] === p[G] && j[C] <= j[M];
      }
      function _t(p, C, M) {
        for (var j = p.heap[M], A = M << 1; A <= p.heap_len && (A < p.heap_len && at(C, p.heap[A + 1], p.heap[A], p.depth) && A++, !at(C, j, p.heap[A], p.depth)); ) p.heap[M] = p.heap[A], M = A, A <<= 1;
        p.heap[M] = j;
      }
      function Tt(p, C, M) {
        var j, A, G, J, X = 0;
        if (p.last_lit !== 0) for (; j = p.pending_buf[p.d_buf + 2 * X] << 8 | p.pending_buf[p.d_buf + 2 * X + 1], A = p.pending_buf[p.l_buf + X], X++, j === 0 ? Y(p, A, C) : (Y(p, (G = i[A]) + b + 1, C), (J = D[G]) !== 0 && K(p, A -= N[G], J), Y(p, G = I(--j), M), (J = $[G]) !== 0 && K(p, j -= Z[G], J)), X < p.last_lit; ) ;
        Y(p, x, C);
      }
      function It(p, C) {
        var M, j, A, G = C.dyn_tree, J = C.stat_desc.static_tree, X = C.stat_desc.has_stree, tt = C.stat_desc.elems, vt = -1;
        for (p.heap_len = 0, p.heap_max = l, M = 0; M < tt; M++) G[2 * M] !== 0 ? (p.heap[++p.heap_len] = vt = M, p.depth[M] = 0) : G[2 * M + 1] = 0;
        for (; p.heap_len < 2; ) G[2 * (A = p.heap[++p.heap_len] = vt < 2 ? ++vt : 0)] = 1, p.depth[A] = 0, p.opt_len--, X && (p.static_len -= J[2 * A + 1]);
        for (C.max_code = vt, M = p.heap_len >> 1; 1 <= M; M--) _t(p, G, M);
        for (A = tt; M = p.heap[1], p.heap[1] = p.heap[p.heap_len--], _t(p, G, 1), j = p.heap[1], p.heap[--p.heap_max] = M, p.heap[--p.heap_max] = j, G[2 * A] = G[2 * M] + G[2 * j], p.depth[A] = (p.depth[M] >= p.depth[j] ? p.depth[M] : p.depth[j]) + 1, G[2 * M + 1] = G[2 * j + 1] = A, p.heap[1] = A++, _t(p, G, 1), 2 <= p.heap_len; ) ;
        p.heap[--p.heap_max] = p.heap[1], function(dt, Ct) {
          var Ht, Ot, Wt, bt, Vt, ne, Dt = Ct.dyn_tree, ae = Ct.max_code, ve = Ct.stat_desc.static_tree, we = Ct.stat_desc.has_stree, se = Ct.stat_desc.extra_bits, oe = Ct.stat_desc.extra_base, Gt = Ct.stat_desc.max_length, Xt = 0;
          for (bt = 0; bt <= m; bt++) dt.bl_count[bt] = 0;
          for (Dt[2 * dt.heap[dt.heap_max] + 1] = 0, Ht = dt.heap_max + 1; Ht < l; Ht++) Gt < (bt = Dt[2 * Dt[2 * (Ot = dt.heap[Ht]) + 1] + 1] + 1) && (bt = Gt, Xt++), Dt[2 * Ot + 1] = bt, ae < Ot || (dt.bl_count[bt]++, Vt = 0, oe <= Ot && (Vt = se[Ot - oe]), ne = Dt[2 * Ot], dt.opt_len += ne * (bt + Vt), we && (dt.static_len += ne * (ve[2 * Ot + 1] + Vt)));
          if (Xt !== 0) {
            do {
              for (bt = Gt - 1; dt.bl_count[bt] === 0; ) bt--;
              dt.bl_count[bt]--, dt.bl_count[bt + 1] += 2, dt.bl_count[Gt]--, Xt -= 2;
            } while (0 < Xt);
            for (bt = Gt; bt !== 0; bt--) for (Ot = dt.bl_count[bt]; Ot !== 0; ) ae < (Wt = dt.heap[--Ht]) || (Dt[2 * Wt + 1] !== bt && (dt.opt_len += (bt - Dt[2 * Wt + 1]) * Dt[2 * Wt], Dt[2 * Wt + 1] = bt), Ot--);
          }
        }(p, C), xt(G, vt, p.bl_count);
      }
      function t(p, C, M) {
        var j, A, G = -1, J = C[1], X = 0, tt = 7, vt = 4;
        for (J === 0 && (tt = 138, vt = 3), C[2 * (M + 1) + 1] = 65535, j = 0; j <= M; j++) A = J, J = C[2 * (j + 1) + 1], ++X < tt && A === J || (X < vt ? p.bl_tree[2 * A] += X : A !== 0 ? (A !== G && p.bl_tree[2 * A]++, p.bl_tree[2 * z]++) : X <= 10 ? p.bl_tree[2 * R]++ : p.bl_tree[2 * L]++, G = A, vt = (X = 0) === J ? (tt = 138, 3) : A === J ? (tt = 6, 3) : (tt = 7, 4));
      }
      function U(p, C, M) {
        var j, A, G = -1, J = C[1], X = 0, tt = 7, vt = 4;
        for (J === 0 && (tt = 138, vt = 3), j = 0; j <= M; j++) if (A = J, J = C[2 * (j + 1) + 1], !(++X < tt && A === J)) {
          if (X < vt) for (; Y(p, A, p.bl_tree), --X != 0; ) ;
          else A !== 0 ? (A !== G && (Y(p, A, p.bl_tree), X--), Y(p, z, p.bl_tree), K(p, X - 3, 2)) : X <= 10 ? (Y(p, R, p.bl_tree), K(p, X - 3, 3)) : (Y(p, L, p.bl_tree), K(p, X - 11, 7));
          G = A, vt = (X = 0) === J ? (tt = 138, 3) : A === J ? (tt = 6, 3) : (tt = 7, 4);
        }
      }
      d(Z);
      var P = !1;
      function v(p, C, M, j) {
        K(p, (_ << 1) + (j ? 1 : 0), 3), function(A, G, J, X) {
          ft(A), et(A, J), et(A, ~J), r.arraySet(A.pending_buf, A.window, G, J, A.pending), A.pending += J;
        }(p, C, M);
      }
      u._tr_init = function(p) {
        P || (function() {
          var C, M, j, A, G, J = new Array(m + 1);
          for (A = j = 0; A < S - 1; A++) for (N[A] = j, C = 0; C < 1 << D[A]; C++) i[j++] = A;
          for (i[j - 1] = A, A = G = 0; A < 16; A++) for (Z[A] = G, C = 0; C < 1 << $[A]; C++) F[G++] = A;
          for (G >>= 7; A < c; A++) for (Z[A] = G << 7, C = 0; C < 1 << $[A] - 7; C++) F[256 + G++] = A;
          for (M = 0; M <= m; M++) J[M] = 0;
          for (C = 0; C <= 143; ) Q[2 * C + 1] = 8, C++, J[8]++;
          for (; C <= 255; ) Q[2 * C + 1] = 9, C++, J[9]++;
          for (; C <= 279; ) Q[2 * C + 1] = 7, C++, J[7]++;
          for (; C <= 287; ) Q[2 * C + 1] = 8, C++, J[8]++;
          for (xt(Q, y + 1, J), C = 0; C < c; C++) k[2 * C + 1] = 5, k[2 * C] = yt(C, 5);
          nt = new it(Q, D, b + 1, y, m), W = new it(k, $, 0, c, m), ot = new it(new Array(0), B, 0, w, g);
        }(), P = !0), p.l_desc = new O(p.dyn_ltree, nt), p.d_desc = new O(p.dyn_dtree, W), p.bl_desc = new O(p.bl_tree, ot), p.bi_buf = 0, p.bi_valid = 0, ct(p);
      }, u._tr_stored_block = v, u._tr_flush_block = function(p, C, M, j) {
        var A, G, J = 0;
        0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(X) {
          var tt, vt = 4093624447;
          for (tt = 0; tt <= 31; tt++, vt >>>= 1) if (1 & vt && X.dyn_ltree[2 * tt] !== 0) return s;
          if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return a;
          for (tt = 32; tt < b; tt++) if (X.dyn_ltree[2 * tt] !== 0) return a;
          return s;
        }(p)), It(p, p.l_desc), It(p, p.d_desc), J = function(X) {
          var tt;
          for (t(X, X.dyn_ltree, X.l_desc.max_code), t(X, X.dyn_dtree, X.d_desc.max_code), It(X, X.bl_desc), tt = w - 1; 3 <= tt && X.bl_tree[2 * V[tt] + 1] === 0; tt--) ;
          return X.opt_len += 3 * (tt + 1) + 5 + 5 + 4, tt;
        }(p), A = p.opt_len + 3 + 7 >>> 3, (G = p.static_len + 3 + 7 >>> 3) <= A && (A = G)) : A = G = M + 5, M + 4 <= A && C !== -1 ? v(p, C, M, j) : p.strategy === 4 || G === A ? (K(p, 2 + (j ? 1 : 0), 3), Tt(p, Q, k)) : (K(p, 4 + (j ? 1 : 0), 3), function(X, tt, vt, dt) {
          var Ct;
          for (K(X, tt - 257, 5), K(X, vt - 1, 5), K(X, dt - 4, 4), Ct = 0; Ct < dt; Ct++) K(X, X.bl_tree[2 * V[Ct] + 1], 3);
          U(X, X.dyn_ltree, tt - 1), U(X, X.dyn_dtree, vt - 1);
        }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, J + 1), Tt(p, p.dyn_ltree, p.dyn_dtree)), ct(p), j && ft(p);
      }, u._tr_tally = function(p, C, M) {
        return p.pending_buf[p.d_buf + 2 * p.last_lit] = C >>> 8 & 255, p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & C, p.pending_buf[p.l_buf + p.last_lit] = 255 & M, p.last_lit++, C === 0 ? p.dyn_ltree[2 * M]++ : (p.matches++, C--, p.dyn_ltree[2 * (i[M] + b + 1)]++, p.dyn_dtree[2 * I(C)]++), p.last_lit === p.lit_bufsize - 1;
      }, u._tr_align = function(p) {
        K(p, 2, 3), Y(p, x, Q), function(C) {
          C.bi_valid === 16 ? (et(C, C.bi_buf), C.bi_buf = 0, C.bi_valid = 0) : 8 <= C.bi_valid && (C.pending_buf[C.pending++] = 255 & C.bi_buf, C.bi_buf >>= 8, C.bi_valid -= 8);
        }(p);
      };
    }, { "../utils/common": 41 }], 53: [function(n, f, u) {
      f.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(n, f, u) {
      (function(r) {
        (function(s, a) {
          if (!s.setImmediate) {
            var d, _, S, b, y = 1, c = {}, w = !1, l = s.document, m = Object.getPrototypeOf && Object.getPrototypeOf(s);
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
            }() ? (b = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", x, !1) : s.attachEvent("onmessage", x), function(z) {
              s.postMessage(b + z, "*");
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
              var D = { callback: z, args: R };
              return c[y] = D, d(y), y++;
            }, m.clearImmediate = h;
          }
          function h(z) {
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
                    var D = L.callback, $ = L.args;
                    switch ($.length) {
                      case 0:
                        D();
                        break;
                      case 1:
                        D($[0]);
                        break;
                      case 2:
                        D($[0], $[1]);
                        break;
                      case 3:
                        D($[0], $[1], $[2]);
                        break;
                      default:
                        D.apply(a, $);
                    }
                  })(R);
                } finally {
                  h(z), w = !1;
                }
              }
            }
          }
          function x(z) {
            z.source === s && typeof z.data == "string" && z.data.indexOf(b) === 0 && g(+z.data.slice(b.length));
          }
        })(typeof self > "u" ? r === void 0 ? this : r : self);
      }).call(this, typeof ce < "u" ? ce : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Je);
var Ar = Je.exports;
const Tr = /* @__PURE__ */ Rr(Ar);
function Ir(e = {}) {
  const {
    storageKey: o = "page-reviews",
    defaultPagePath: n = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = e;
  function f() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function u() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(o);
      return (g ? JSON.parse(g) : []).map(Or);
    } catch {
      return [];
    }
  }
  function r(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(o, JSON.stringify(g));
      } catch {
      }
  }
  const s = gt(u()), a = () => s.value;
  function d(g) {
    const x = g || n();
    return s.value.filter((z) => z.pagePath === x);
  }
  function _(g) {
    const x = {
      id: f(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s.value.unshift(x), r(s.value), x;
  }
  function S(g, x) {
    const z = s.value.findIndex((R) => R.id === g);
    z > -1 && (s.value[z] = { ...s.value[z], ...x }, r(s.value));
  }
  function b(g) {
    s.value = s.value.filter((x) => x.id !== g), r(s.value);
  }
  function y(g) {
    const x = g || n();
    s.value = s.value.filter((z) => z.pagePath !== x), r(s.value);
  }
  function c() {
    s.value = [], r([]);
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
    const g = Ze(w());
    ke(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${xe()}.md`
    );
  }
  async function h() {
    const g = new Tr(), x = w(), z = {
      ...x,
      reviews: x.reviews.map((D) => {
        var $;
        return {
          ...D,
          screenshots: ($ = D.screenshots) == null ? void 0 : $.map((B) => B.url ? { type: B.type, filename: B.filename, url: B.url } : { type: B.type, filename: B.filename, imagePath: `images/${B.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(z, null, 2)), g.file("review.md", Ze(z));
    const R = g.folder("images");
    for (const D of x.reviews)
      for (const $ of D.screenshots || [])
        if ($.data && !$.url) {
          const B = $.data.replace(/^data:image\/png;base64,/, "");
          R.file($.filename, B, { base64: !0 });
        }
    const L = await g.generateAsync({ type: "blob" });
    ke(L, `page-reviews-${xe()}.zip`);
  }
  return {
    reviews: s,
    allReviews: a,
    getPageReviews: d,
    addReview: _,
    updateReview: S,
    deleteReview: b,
    clearPageReviews: y,
    clearAllReviews: c,
    exportToJSON: l,
    exportToMarkdown: m,
    exportToZIP: h
  };
}
function Or(e) {
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
function Ze(e) {
  const o = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${e.total}`,
    ""
  ], n = Pr(e.reviews, "pagePath");
  return Object.entries(n).forEach(([f, u]) => {
    o.push(`## 页面：${f}`), o.push(""), u.forEach((r, s) => {
      var d, _, S, b;
      o.push(`### ${s + 1}. ${r.title || "未命名评审"}`), o.push(`- **严重等级**：${Br(r.severity)}`), o.push(`- **状态**：${r.status === "resolved" ? "已解决" : "待处理"}`), o.push(`- **窗口尺寸**：${(d = r.viewport) == null ? void 0 : d.width} × ${(_ = r.viewport) == null ? void 0 : _.height}`), r.scroll && o.push(`- **滚动位置**：x=${r.scroll.x}, y=${r.scroll.y}`);
      const a = r.targets || [];
      a.length > 0 && (o.push(`- **评审目标数**：${a.length}`), a.forEach((y, c) => {
        y.type === "element" && y.elementRect ? (o.push(`  - 目标 ${c + 1}（元素）：\`${y.selector}\` x=${y.elementRect.x}, y=${y.elementRect.y}, w=${y.elementRect.width}, h=${y.elementRect.height}`), y.elementText && o.push(`    文本：${y.elementText}`)) : y.viewportRect && o.push(`  - 目标 ${c + 1}（框选）：x=${y.viewportRect.x}, y=${y.viewportRect.y}, w=${y.viewportRect.width}, h=${y.viewportRect.height}`);
      })), o.push(`- **评审建议**：${r.suggestion}`), o.push(`- **创建时间**：${new Date(r.createdAt).toLocaleString()}`), r.locators && Object.keys(r.locators).length > 0 && (o.push(""), o.push("#### 定位信息"), r.locators.cssSelector && o.push(`- **CSS Selector**: \`${r.locators.cssSelector}\``), r.locators.xpath && o.push(`- **XPath**: \`${r.locators.xpath}\``), (S = r.locators.aria) != null && S.role && o.push(`- **ARIA Role**: ${r.locators.aria.role}`), (b = r.locators.aria) != null && b.accessibleName && o.push(`- **Accessible Name**: ${r.locators.aria.accessibleName}`), r.locators.testId && o.push(`- **data-testid**: ${r.locators.testId}`)), r.screenshots && r.screenshots.length > 0 && (o.push(""), o.push("#### 截图"), r.screenshots.forEach((y) => {
        const c = y.url || y.imagePath || `images/${y.filename}`;
        o.push(`![${y.type}](${c})`);
      })), o.push("");
    });
  }), o.join(`
`);
}
function ke(e, o) {
  if (typeof window > "u") return;
  const n = URL.createObjectURL(e), f = document.createElement("a");
  f.href = n, f.download = o, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(n);
}
function xe() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}${fe(e.getMonth() + 1)}${fe(e.getDate())}-${fe(e.getHours())}${fe(e.getMinutes())}`;
}
function fe(e) {
  return String(e).padStart(2, "0");
}
function Br(e) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[e] || e;
}
function Pr(e, o) {
  return e.reduce((n, f) => {
    const u = f[o] || "unknown";
    return n[u] || (n[u] = []), n[u].push(f), n;
  }, {});
}
function Dr(e, o) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), f = n.createElement("base"), u = n.createElement("a");
  return n.head.appendChild(f), n.body.appendChild(u), o && (f.href = o), u.href = e, u.href;
}
const Lr = /* @__PURE__ */ (() => {
  let e = 0;
  const o = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${o()}${e}`);
})();
function Zt(e) {
  const o = [];
  for (let n = 0, f = e.length; n < f; n++)
    o.push(e[n]);
  return o;
}
let ee = null;
function Qe(e = {}) {
  return ee || (e.includeStyleProperties ? (ee = e.includeStyleProperties, ee) : (ee = Zt(window.getComputedStyle(document.documentElement)), ee));
}
function he(e, o) {
  const f = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(o);
  return f ? parseFloat(f.replace("px", "")) : 0;
}
function Fr(e) {
  const o = he(e, "border-left-width"), n = he(e, "border-right-width");
  return e.clientWidth + o + n;
}
function Nr(e) {
  const o = he(e, "border-top-width"), n = he(e, "border-bottom-width");
  return e.clientHeight + o + n;
}
function tr(e, o = {}) {
  const n = o.width || Fr(e), f = o.height || Nr(e);
  return { width: n, height: f };
}
function Ur() {
  let e, o;
  try {
    o = process;
  } catch {
  }
  const n = o && o.env ? o.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Pt = 16384;
function Mr(e) {
  (e.width > Pt || e.height > Pt) && (e.width > Pt && e.height > Pt ? e.width > e.height ? (e.height *= Pt / e.width, e.width = Pt) : (e.width *= Pt / e.height, e.height = Pt) : e.width > Pt ? (e.height *= Pt / e.width, e.width = Pt) : (e.width *= Pt / e.height, e.height = Pt));
}
function pe(e) {
  return new Promise((o, n) => {
    const f = new Image();
    f.onload = () => {
      f.decode().then(() => {
        requestAnimationFrame(() => o(f));
      });
    }, f.onerror = n, f.crossOrigin = "anonymous", f.decoding = "async", f.src = e;
  });
}
async function jr(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((o) => `data:image/svg+xml;charset=utf-8,${o}`);
}
async function $r(e, o, n) {
  const f = "http://www.w3.org/2000/svg", u = document.createElementNS(f, "svg"), r = document.createElementNS(f, "foreignObject");
  return u.setAttribute("width", `${o}`), u.setAttribute("height", `${n}`), u.setAttribute("viewBox", `0 0 ${o} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), u.appendChild(r), r.appendChild(e), jr(u);
}
const At = (e, o) => {
  if (e instanceof o)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === o.name || At(n, o);
};
function Wr(e) {
  const o = e.getPropertyValue("content");
  return `${e.cssText} content: '${o.replace(/'|"/g, "")}';`;
}
function Zr(e, o) {
  return Qe(o).map((n) => {
    const f = e.getPropertyValue(n), u = e.getPropertyPriority(n);
    return `${n}: ${f}${u ? " !important" : ""};`;
  }).join(" ");
}
function Hr(e, o, n, f) {
  const u = `.${e}:${o}`, r = n.cssText ? Wr(n) : Zr(n, f);
  return document.createTextNode(`${u}{${r}}`);
}
function He(e, o, n, f) {
  const u = window.getComputedStyle(e, n), r = u.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = Lr();
  try {
    o.className = `${o.className} ${s}`;
  } catch {
    return;
  }
  const a = document.createElement("style");
  a.appendChild(Hr(s, n, u, f)), o.appendChild(a);
}
function Vr(e, o, n) {
  He(e, o, ":before", n), He(e, o, ":after", n);
}
const Ve = "application/font-woff", Ge = "image/jpeg", Gr = {
  woff: Ve,
  woff2: Ve,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Ge,
  jpeg: Ge,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Xr(e) {
  const o = /\.([^./]*?)$/g.exec(e);
  return o ? o[1] : "";
}
function Ae(e) {
  const o = Xr(e).toLowerCase();
  return Gr[o] || "";
}
function Yr(e) {
  return e.split(/,/)[1];
}
function Re(e) {
  return e.search(/^(data:)/) !== -1;
}
function Kr(e, o) {
  return `data:${o};base64,${e}`;
}
async function er(e, o, n) {
  const f = await fetch(e, o);
  if (f.status === 404)
    throw new Error(`Resource "${f.url}" not found`);
  const u = await f.blob();
  return new Promise((r, s) => {
    const a = new FileReader();
    a.onerror = s, a.onloadend = () => {
      try {
        r(n({ res: f, result: a.result }));
      } catch (d) {
        s(d);
      }
    }, a.readAsDataURL(u);
  });
}
const Se = {};
function qr(e, o, n) {
  let f = e.replace(/\?.*/, "");
  return n && (f = e), /ttf|otf|eot|woff2?/i.test(f) && (f = f.replace(/.*\//, "")), o ? `[${o}]${f}` : f;
}
async function Te(e, o, n) {
  const f = qr(e, o, n.includeQueryParams);
  if (Se[f] != null)
    return Se[f];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let u;
  try {
    const r = await er(e, n.fetchRequestInit, ({ res: s, result: a }) => (o || (o = s.headers.get("Content-Type") || ""), Yr(a)));
    u = Kr(r, o);
  } catch (r) {
    u = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return Se[f] = u, u;
}
async function Jr(e) {
  const o = e.toDataURL();
  return o === "data:," ? e.cloneNode(!1) : pe(o);
}
async function Qr(e, o) {
  if (e.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = e.clientWidth, r.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, r.width, r.height);
    const a = r.toDataURL();
    return pe(a);
  }
  const n = e.poster, f = Ae(n), u = await Te(n, f, o);
  return pe(u);
}
async function tn(e, o) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await ge(e.contentDocument.body, o, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function en(e, o) {
  return At(e, HTMLCanvasElement) ? Jr(e) : At(e, HTMLVideoElement) ? Qr(e, o) : At(e, HTMLIFrameElement) ? tn(e, o) : e.cloneNode(rr(e));
}
const rn = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", rr = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function nn(e, o, n) {
  var f, u;
  if (rr(o))
    return o;
  let r = [];
  return rn(e) && e.assignedNodes ? r = Zt(e.assignedNodes()) : At(e, HTMLIFrameElement) && (!((f = e.contentDocument) === null || f === void 0) && f.body) ? r = Zt(e.contentDocument.body.childNodes) : r = Zt(((u = e.shadowRoot) !== null && u !== void 0 ? u : e).childNodes), r.length === 0 || At(e, HTMLVideoElement) || await r.reduce((s, a) => s.then(() => ge(a, n)).then((d) => {
    d && o.appendChild(d);
  }), Promise.resolve()), o;
}
function an(e, o, n) {
  const f = o.style;
  if (!f)
    return;
  const u = window.getComputedStyle(e);
  u.cssText ? (f.cssText = u.cssText, f.transformOrigin = u.transformOrigin) : Qe(n).forEach((r) => {
    let s = u.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), At(e, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && o.getAttribute("d") && (s = `path(${o.getAttribute("d")})`), f.setProperty(r, s, u.getPropertyPriority(r));
  });
}
function sn(e, o) {
  At(e, HTMLTextAreaElement) && (o.innerHTML = e.value), At(e, HTMLInputElement) && o.setAttribute("value", e.value);
}
function on(e, o) {
  if (At(e, HTMLSelectElement)) {
    const n = o, f = Array.from(n.children).find((u) => e.value === u.getAttribute("value"));
    f && f.setAttribute("selected", "");
  }
}
function ln(e, o, n) {
  return At(o, Element) && (an(e, o, n), Vr(e, o, n), sn(e, o), on(e, o)), o;
}
async function un(e, o) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const f = {};
  for (let r = 0; r < n.length; r++) {
    const a = n[r].getAttribute("xlink:href");
    if (a) {
      const d = e.querySelector(a), _ = document.querySelector(a);
      !d && _ && !f[a] && (f[a] = await ge(_, o, !0));
    }
  }
  const u = Object.values(f);
  if (u.length) {
    const r = "http://www.w3.org/1999/xhtml", s = document.createElementNS(r, "svg");
    s.setAttribute("xmlns", r), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const a = document.createElementNS(r, "defs");
    s.appendChild(a);
    for (let d = 0; d < u.length; d++)
      a.appendChild(u[d]);
    e.appendChild(s);
  }
  return e;
}
async function ge(e, o, n) {
  return !n && o.filter && !o.filter(e) ? null : Promise.resolve(e).then((f) => en(f, o)).then((f) => nn(e, f, o)).then((f) => ln(e, f, o)).then((f) => un(f, o));
}
const nr = /url\((['"]?)([^'"]+?)\1\)/g, cn = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, dn = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function fn(e) {
  const o = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${o})(['"]?\\))`, "g");
}
function hn(e) {
  const o = [];
  return e.replace(nr, (n, f, u) => (o.push(u), n)), o.filter((n) => !Re(n));
}
async function pn(e, o, n, f, u) {
  try {
    const r = n ? Dr(o, n) : o, s = Ae(o);
    let a;
    return u || (a = await Te(r, s, f)), e.replace(fn(o), `$1${a}$3`);
  } catch {
  }
  return e;
}
function mn(e, { preferredFontFormat: o }) {
  return o ? e.replace(dn, (n) => {
    for (; ; ) {
      const [f, , u] = cn.exec(n) || [];
      if (!u)
        return "";
      if (u === o)
        return `src: ${f};`;
    }
  }) : e;
}
function ir(e) {
  return e.search(nr) !== -1;
}
async function ar(e, o, n) {
  if (!ir(e))
    return e;
  const f = mn(e, n);
  return hn(f).reduce((r, s) => r.then((a) => pn(a, s, o, n)), Promise.resolve(f));
}
async function re(e, o, n) {
  var f;
  const u = (f = o.style) === null || f === void 0 ? void 0 : f.getPropertyValue(e);
  if (u) {
    const r = await ar(u, null, n);
    return o.style.setProperty(e, r, o.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function gn(e, o) {
  await re("background", e, o) || await re("background-image", e, o), await re("mask", e, o) || await re("-webkit-mask", e, o) || await re("mask-image", e, o) || await re("-webkit-mask-image", e, o);
}
async function vn(e, o) {
  const n = At(e, HTMLImageElement);
  if (!(n && !Re(e.src)) && !(At(e, SVGImageElement) && !Re(e.href.baseVal)))
    return;
  const f = n ? e.src : e.href.baseVal, u = await Te(f, Ae(f), o);
  await new Promise((r, s) => {
    e.onload = r, e.onerror = o.onImageErrorHandler ? (...d) => {
      try {
        r(o.onImageErrorHandler(...d));
      } catch (_) {
        s(_);
      }
    } : s;
    const a = e;
    a.decode && (a.decode = r), a.loading === "lazy" && (a.loading = "eager"), n ? (e.srcset = "", e.src = u) : e.href.baseVal = u;
  });
}
async function wn(e, o) {
  const f = Zt(e.childNodes).map((u) => sr(u, o));
  await Promise.all(f).then(() => e);
}
async function sr(e, o) {
  At(e, Element) && (await gn(e, o), await vn(e, o), await wn(e, o));
}
function yn(e, o) {
  const { style: n } = e;
  o.backgroundColor && (n.backgroundColor = o.backgroundColor), o.width && (n.width = `${o.width}px`), o.height && (n.height = `${o.height}px`);
  const f = o.style;
  return f != null && Object.keys(f).forEach((u) => {
    n[u] = f[u];
  }), e;
}
const Xe = {};
async function Ye(e) {
  let o = Xe[e];
  if (o != null)
    return o;
  const f = await (await fetch(e)).text();
  return o = { url: e, cssText: f }, Xe[e] = o, o;
}
async function Ke(e, o) {
  let n = e.cssText;
  const f = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let a = s.replace(f, "$1");
    return a.startsWith("https://") || (a = new URL(a, e.url).href), er(a, o.fetchRequestInit, ({ result: d }) => (n = n.replace(s, `url(${d})`), [s, d]));
  });
  return Promise.all(r).then(() => n);
}
function qe(e) {
  if (e == null)
    return [];
  const o = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let f = e.replace(n, "");
  const u = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const d = u.exec(f);
    if (d === null)
      break;
    o.push(d[0]);
  }
  f = f.replace(u, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", a = new RegExp(s, "gi");
  for (; ; ) {
    let d = r.exec(f);
    if (d === null) {
      if (d = a.exec(f), d === null)
        break;
      r.lastIndex = a.lastIndex;
    } else
      a.lastIndex = r.lastIndex;
    o.push(d[0]);
  }
  return o;
}
async function _n(e, o) {
  const n = [], f = [];
  return e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Zt(u.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let a = s + 1;
            const d = r.href, _ = Ye(d).then((S) => Ke(S, o)).then((S) => qe(S).forEach((b) => {
              try {
                u.insertRule(b, b.startsWith("@import") ? a += 1 : u.cssRules.length);
              } catch (y) {
                console.error("Error inserting rule from remote css", {
                  rule: b,
                  error: y
                });
              }
            })).catch((S) => {
              console.error("Error loading remote css", S.toString());
            });
            f.push(_);
          }
        });
      } catch (r) {
        const s = e.find((a) => a.href == null) || document.styleSheets[0];
        u.href != null && f.push(Ye(u.href).then((a) => Ke(a, o)).then((a) => qe(a).forEach((d) => {
          s.insertRule(d, s.cssRules.length);
        })).catch((a) => {
          console.error("Error loading remote stylesheet", a);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(f).then(() => (e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Zt(u.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${u.href}`, r);
      }
  }), n));
}
function bn(e) {
  return e.filter((o) => o.type === CSSRule.FONT_FACE_RULE).filter((o) => ir(o.style.getPropertyValue("src")));
}
async function kn(e, o) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Zt(e.ownerDocument.styleSheets), f = await _n(n, o);
  return bn(f);
}
function or(e) {
  return e.trim().replace(/["']/g, "");
}
function xn(e) {
  const o = /* @__PURE__ */ new Set();
  function n(f) {
    (f.style.fontFamily || getComputedStyle(f).fontFamily).split(",").forEach((r) => {
      o.add(or(r));
    }), Array.from(f.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(e), o;
}
async function Sn(e, o) {
  const n = await kn(e, o), f = xn(e);
  return (await Promise.all(n.filter((r) => f.has(or(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return ar(r.cssText, s, o);
  }))).join(`
`);
}
async function En(e, o) {
  const n = o.fontEmbedCSS != null ? o.fontEmbedCSS : o.skipFonts ? null : await Sn(e, o);
  if (n) {
    const f = document.createElement("style"), u = document.createTextNode(n);
    f.appendChild(u), e.firstChild ? e.insertBefore(f, e.firstChild) : e.appendChild(f);
  }
}
async function Cn(e, o = {}) {
  const { width: n, height: f } = tr(e, o), u = await ge(e, o, !0);
  return await En(u, o), await sr(u, o), yn(u, o), await $r(u, n, f);
}
async function zn(e, o = {}) {
  const { width: n, height: f } = tr(e, o), u = await Cn(e, o), r = await pe(u), s = document.createElement("canvas"), a = s.getContext("2d"), d = o.pixelRatio || Ur(), _ = o.canvasWidth || n, S = o.canvasHeight || f;
  return s.width = _ * d, s.height = S * d, o.skipAutoScale || Mr(s), s.style.width = `${_}`, s.style.height = `${S}`, o.backgroundColor && (a.fillStyle = o.backgroundColor, a.fillRect(0, 0, s.width, s.height)), a.drawImage(r, 0, 0, s.width, s.height), s;
}
async function Ie(e, o = {}) {
  return (await zn(e, o)).toDataURL();
}
const jt = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box",
  TARGETS: "targets"
};
function Ee(e) {
  const o = Date.now(), n = Math.random().toString(36).slice(2, 6);
  return `screenshot-${e}-${o}-${n}.png`;
}
async function lr(e, o = {}) {
  if (!e) return null;
  try {
    return await Ie(e, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
  } catch (n) {
    return console.error("captureElement failed:", n), null;
  }
}
async function Rn(e = {}) {
  const o = document.documentElement;
  return lr(o, {
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
async function An(e = {}) {
  const o = document.documentElement, n = o.style.overflow, f = o.style.width, u = o.style.height;
  try {
    return o.style.overflow = "visible", o.style.width = "auto", o.style.height = "auto", await Ie(o, {
      pixelRatio: e.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...e
    });
  } catch (r) {
    return console.error("captureFullPage failed:", r), null;
  } finally {
    o.style.overflow = n, o.style.width = f, o.style.height = u;
  }
}
async function Tn(e, o = {}) {
  if (!e || e.width < 1 || e.height < 1) return null;
  const n = document.documentElement, f = n.style.overflow, u = n.style.width, r = n.style.height;
  try {
    n.style.overflow = "visible", n.style.width = "auto", n.style.height = "auto";
    const s = await Ie(n, {
      pixelRatio: o.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...o
    });
    return In(s, e);
  } catch (s) {
    return console.error("captureBox failed:", s), null;
  } finally {
    n.style.overflow = f, n.style.width = u, n.style.height = r;
  }
}
function In(e, o) {
  return new Promise((n, f) => {
    const u = new Image();
    u.onload = () => {
      const r = document.createElement("canvas"), s = window.devicePixelRatio || 1;
      r.width = Math.round(o.width * s), r.height = Math.round(o.height * s), r.getContext("2d").drawImage(
        u,
        o.x * s,
        o.y * s,
        o.width * s,
        o.height * s,
        0,
        0,
        r.width,
        r.height
      ), n(r.toDataURL("image/png"));
    }, u.onerror = f, u.src = e;
  });
}
async function On(e) {
  return (await fetch(e)).blob();
}
async function Ce(e, o, n) {
  if (!n) return null;
  try {
    const f = await On(e);
    return await n(f, o);
  } catch (f) {
    return console.error("uploadScreenshot failed:", f), null;
  }
}
function ur(e) {
  var u;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return "#" + e.id;
  const o = e.tagName.toLowerCase();
  if (e.className) {
    const r = String(e.className).split(/\s+/).filter((s) => s && !s.startsWith("el-") && !/^__/.test(s)).slice(0, 2);
    if (r.length) return o + "." + r.join(".");
  }
  let n = [], f = e;
  for (; f && f !== document.body; ) {
    let r = f.tagName.toLowerCase();
    if (f.id) {
      r += "#" + f.id, n.unshift(r);
      break;
    }
    const a = Array.from(((u = f.parentNode) == null ? void 0 : u.children) || []).filter((d) => d.tagName === f.tagName);
    if (a.length > 1) {
      const d = a.indexOf(f) + 1;
      r += `:nth-of-type(${d})`;
    }
    n.unshift(r), f = f.parentNode;
  }
  return n.join(" > ");
}
function Bn(e) {
  var f;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return `//*[@id="${e.id}"]`;
  const o = [];
  let n = e;
  for (; n && n !== document.body; ) {
    const s = Array.from(((f = n.parentNode) == null ? void 0 : f.children) || []).filter((a) => a.tagName === n.tagName).indexOf(n) + 1;
    o.unshift(`${n.tagName.toLowerCase()}[${s}]`), n = n.parentNode;
  }
  return o.unshift(""), "/html/body/" + o.slice(1).join("/");
}
function Pn(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return {};
  const o = {}, n = e.getAttribute("role") || Dn(e);
  n && (o.role = n);
  const f = Ln(e);
  f && (o.accessibleName = f);
  const u = e.getAttribute("aria-labelledby");
  return u && (o.labeledBy = u), Object.keys(o).length ? o : void 0;
}
function Dn(e) {
  const o = e.tagName.toLowerCase(), n = e.getAttribute("type");
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
  }[o];
}
function Ln(e) {
  var r, s;
  if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
  const o = e.getAttribute("aria-labelledby");
  if (o) {
    const a = o.split(/\s+/).map((d) => {
      var _, S;
      return (S = (_ = document.getElementById(d)) == null ? void 0 : _.textContent) == null ? void 0 : S.trim();
    }).filter(Boolean);
    if (a.length) return a.join(" ");
  }
  const n = (r = e.labels) == null ? void 0 : r[0];
  if (n) return n.textContent.trim();
  if (e.tagName.toLowerCase() === "input" && e.placeholder) return e.placeholder.trim();
  const f = e.getAttribute("alt");
  if (f) return f.trim();
  const u = e.getAttribute("title");
  if (u) return u.trim();
  if (["button", "a"].includes(e.tagName.toLowerCase())) {
    const a = (s = e.textContent) == null ? void 0 : s.trim();
    if (a) return a;
  }
  return "";
}
function Fn(e) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? void 0 : e.getAttribute("data-testid") || void 0;
}
function me(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return null;
  const o = e.getBoundingClientRect();
  return {
    tag: e.tagName.toLowerCase(),
    id: e.id || void 0,
    classes: e.className ? String(e.className).split(/\s+/).filter(Boolean) : void 0,
    selector: ur(e),
    xpath: Bn(e),
    rect: {
      x: o.left + window.scrollX,
      y: o.top + window.scrollY,
      width: o.width,
      height: o.height
    },
    aria: Pn(e),
    testId: Fn(e)
  };
}
function Nn(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const o = [];
  let n = e;
  for (; n && n !== document.body; )
    o.unshift(n), n = n.parentElement;
  return n === document.body && o.unshift(document.body), o.map(me).filter(Boolean);
}
function Un(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const o = Mn(e);
  if (o.length) return o;
  const n = $n(e);
  return n.length ? n : [];
}
function Mn(e) {
  const o = [];
  let n = e;
  for (; n; ) {
    const f = jn(n);
    f && !o.find((u) => u.componentName === f.componentName && u.selector === f.selector) && o.unshift(f), n = n.parentElement;
  }
  return o;
}
function jn(e) {
  var r, s, a, d, _;
  const n = Object.keys(e || {}).find((S) => S.startsWith("__vue"));
  if (!n) return null;
  const f = e[n], u = ((r = f == null ? void 0 : f.type) == null ? void 0 : r.name) || ((s = f == null ? void 0 : f.type) == null ? void 0 : s.__name) || ((d = (a = f == null ? void 0 : f.parent) == null ? void 0 : a.type) == null ? void 0 : d.name);
  return u ? {
    componentName: u,
    selector: ur(e),
    rect: (_ = me(e)) == null ? void 0 : _.rect
  } : null;
}
function $n(e) {
  const o = [], n = Object.keys(e || {}).find((u) => u.startsWith("__reactFiber$"));
  if (!n) return o;
  let f = e[n];
  for (; f; ) {
    const u = Wn(f);
    u && !o.find((r) => r.componentName === u) && o.unshift({ componentName: u, selector: void 0, rect: void 0 }), f = f.return;
  }
  return o;
}
function Wn(e) {
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
    dom: Nn(e),
    framework: Un(e)
  };
}
const Zn = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [f, u] of o)
    n[f] = u;
  return n;
}, Hn = { class: "toolbar-left" }, Vn = { class: "toolbar-right" }, Gn = { class: "highlight-label" }, Xn = ["onClick"], Yn = { class: "highlight-label" }, Kn = ["onClick"], qn = ["onMousedown"], Jn = ["onClick"], Qn = ["onMousedown"], ti = { class: "modal-body" }, ei = { class: "review-targets-summary" }, ri = { class: "text-muted" }, ni = { class: "text-muted" }, ii = { class: "modal-footer" }, ai = {
  key: 1,
  class: "tree-panel"
}, si = {
  key: 0,
  class: "tree-section"
}, oi = { class: "tree-list" }, li = ["onMouseenter", "onClick"], ui = { class: "node-name" }, ci = { class: "tree-section" }, di = { class: "tree-list" }, fi = ["onMouseenter", "onClick"], hi = { class: "node-tag" }, pi = {
  key: 0,
  class: "node-id"
}, mi = {
  key: 1,
  class: "node-aria"
}, gi = {
  key: 2,
  class: "node-testid"
}, vi = { class: "review-list-actions" }, wi = {
  key: 1,
  class: "review-list"
}, yi = { class: "review-item-header" }, _i = { class: "review-item-title" }, bi = { class: "review-item-tags" }, ki = { class: "review-item-target" }, xi = { class: "review-item-suggestion" }, Si = { class: "review-item-meta" }, Ei = { class: "text-muted" }, Ci = { class: "review-item-actions" }, zi = {
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
  setup(e, { expose: o, emit: n }) {
    const f = e, u = n, r = te(() => f.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: s, getPageReviews: a, addReview: d, updateReview: _, deleteReview: S, clearPageReviews: b, exportToJSON: y, exportToMarkdown: c, exportToZIP: w } = Ir({
      storageKey: f.storageKey,
      defaultPagePath: () => r.value
    }), l = te(() => a(r.value)), m = gt("element"), h = gt(!1), g = gt(!1), x = gt(!1), z = gt(null), R = gt(""), L = gt([]), D = gt([]), $ = gt(0), B = gt(null), V = gt(null), Q = gt(null), k = gt(!1), F = gt({ x: 0, y: 0 }), i = gt(null), N = gt(""), nt = gt({ x: 0, y: 0, rect: null }), W = gt({ x: 0, y: 0 }), ot = gt({ width: null, height: null }), Z = gt(!1), it = gt({ x: 0, y: 0 }), O = gt(!1), I = gt({ x: 0, y: 0, width: 0, height: 0 }), et = gt({ x: 0, y: 0 }), K = gt({ width: 560, height: null }), Y = gt(!1), yt = gt({ x: 0, y: 0 }), xt = gt(!1), ct = gt({ x: 0, y: 0, width: 0, height: 0 }), ft = gt([]), at = gt({
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
    }), _t = te(() => L.value.length + D.value.length), Tt = te(() => at.value.title.trim() && at.value.suggestion.trim()), It = te(() => {
      const { x: T, y: E } = W.value, H = {
        transform: `translate(calc(-50% + ${T}px), ${E}px)`
      };
      return ot.value.width && (H.width = ot.value.width + "px"), ot.value.height && (H.height = ot.value.height + "px"), H;
    }), t = te(() => {
      const { x: T, y: E } = et.value, H = {
        left: `calc(50% + ${T}px)`,
        top: `calc(50% + ${E}px)`,
        transform: "translate(-50%, -50%)",
        width: K.value.width + "px"
      };
      return K.value.height && (H.height = K.value.height + "px"), H;
    }), U = [
      { position: "nw" },
      { position: "n" },
      { position: "ne" },
      { position: "w" },
      { position: "e" },
      { position: "sw" },
      { position: "s" },
      { position: "se" }
    ];
    function P(T) {
      return T ? {
        left: T.x + "px",
        top: T.y + "px",
        width: T.width + "px",
        height: T.height + "px"
      } : {};
    }
    function v(T) {
      return T ? {
        left: T.x + "px",
        top: T.y + "px",
        width: T.width + "px",
        height: T.height + "px"
      } : {};
    }
    function p(T, E) {
      const rt = {};
      return T.includes("n") && (rt.top = -8 / 2 + "px"), T.includes("s") && (rt.bottom = -8 / 2 + "px"), T.includes("w") && (rt.left = -8 / 2 + "px"), T.includes("e") && (rt.right = -8 / 2 + "px"), (T === "n" || T === "s") && (rt.left = E.width / 2 - 8 / 2 + "px"), (T === "w" || T === "e") && (rt.top = E.height / 2 - 8 / 2 + "px"), rt.width = "8px", rt.height = "8px", rt;
    }
    function C(T) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[T] || "info";
    }
    function M(T) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[T] || T;
    }
    function j(T) {
      var E;
      return (E = T.targets) == null ? void 0 : E.some((H) => {
        var rt, lt;
        return (lt = (rt = H.componentTree) == null ? void 0 : rt.dom) == null ? void 0 : lt.length;
      });
    }
    function A(T) {
      if (!T || T.length === 0) return "无目标";
      const E = T[0], H = E.type === "element" ? E.elementText || E.selector || "元素" : `框选 x=${E.viewportRect.x}, y=${E.viewportRect.y}`;
      return T.length === 1 ? H : `${H} 等 ${T.length} 个目标`;
    }
    function G() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: r.value,
        pageUrl: window.location.href,
        pageName: f.pageName || r.value
      };
    }
    function J(T) {
      var rt;
      if (T.id) return "#" + T.id;
      if (T.className) {
        const lt = String(T.className).split(/\s+/).filter((zt) => zt && !zt.startsWith("el-")).slice(0, 2);
        if (lt.length) return T.tagName.toLowerCase() + "." + lt.join(".");
      }
      let E = [], H = T;
      for (; H && H !== document.body; ) {
        let lt = H.tagName.toLowerCase();
        if (H.id) {
          lt += "#" + H.id, E.unshift(lt);
          break;
        }
        const Lt = Array.from(((rt = H.parentNode) == null ? void 0 : rt.children) || []).filter((Ft) => Ft.tagName === H.tagName);
        if (Lt.length > 1) {
          const Ft = Lt.indexOf(H) + 1;
          lt += `:nth-of-type(${Ft})`;
        }
        E.unshift(lt), H = H.parentNode;
      }
      return E.join(" > ");
    }
    function X(T) {
      const E = document.elementFromPoint(T.clientX, T.clientY);
      return !E || E.closest(".review-overlay") ? null : E;
    }
    function tt(T) {
      return T.ctrlKey || T.metaKey;
    }
    function vt(T) {
      if (Z.value || i.value || m.value !== "element" || h.value || k.value) return;
      const E = X(T);
      if (!E) {
        z.value = null;
        return;
      }
      const H = E.getBoundingClientRect();
      z.value = {
        x: H.left + window.scrollX,
        y: H.top + window.scrollY,
        width: H.width,
        height: H.height
      }, R.value = E.tagName.toLowerCase();
    }
    function dt() {
      z.value = null;
    }
    function Ct(T) {
      var lt;
      if (m.value !== "element" || h.value || k.value || i.value) return;
      const E = X(T);
      if (!E) return;
      T.preventDefault(), T.stopPropagation();
      const H = E.getBoundingClientRect(), rt = {
        el: E,
        selector: J(E),
        tag: E.tagName.toLowerCase(),
        text: ((lt = E.innerText) == null ? void 0 : lt.slice(0, 40)) || "",
        rect: {
          x: H.left + window.scrollX,
          y: H.top + window.scrollY,
          width: H.width,
          height: H.height
        }
      };
      if (tt(T)) {
        const zt = L.value.findIndex((Lt) => Lt.el === E);
        zt > -1 ? L.value.splice(zt, 1) : L.value.push(rt);
      } else
        L.value = [rt], D.value = [];
      L.value.length === 1 && (V.value = ze(E));
    }
    function Ht(T, E) {
      tt(E) && (E.stopPropagation(), Ot(T));
    }
    function Ot(T) {
      const E = L.value.findIndex((H) => H.el === T.el);
      E > -1 && L.value.splice(E, 1), L.value.length === 0 && (V.value = null);
    }
    function Wt(T) {
      Z.value || m.value !== "viewport" || h.value || i.value || T.target.closest(".review-overlay") || (T.preventDefault(), k.value = !0, F.value = { x: T.clientX + window.scrollX, y: T.clientY + window.scrollY }, Q.value = { x: F.value.x, y: F.value.y, width: 0, height: 0 });
    }
    function bt(T) {
      if (Z.value) return;
      if (i.value) {
        ve(T);
        return;
      }
      if (!k.value) return;
      const E = T.clientX + window.scrollX, H = T.clientY + window.scrollY;
      Q.value = {
        x: Math.min(F.value.x, E),
        y: Math.min(F.value.y, H),
        width: Math.abs(E - F.value.x),
        height: Math.abs(H - F.value.y)
      };
    }
    function Vt(T) {
      if (Z.value) {
        Z.value = !1;
        return;
      }
      if (O.value) {
        O.value = !1;
        return;
      }
      if (Y.value) {
        Y.value = !1;
        return;
      }
      if (xt.value) {
        xt.value = !1;
        return;
      }
      if (i.value) {
        i.value = null, N.value = "", nt.value = { x: 0, y: 0, rect: null };
        return;
      }
      k.value && (k.value = !1, Q.value && Q.value.width > 10 && Q.value.height > 10 && (tt(T) || (L.value = []), D.value.push({
        id: "box-" + Date.now() + "-" + $.value++,
        index: D.value.length,
        rect: { ...Q.value }
      })), Q.value = null);
    }
    function ne(T, E) {
      tt(E) && (E.stopPropagation(), Dt(T));
    }
    function Dt(T) {
      D.value = D.value.filter((E) => E.id !== T.id), D.value.forEach((E, H) => {
        E.index = H;
      });
    }
    function ae(T, E, H) {
      i.value = T.id, N.value = E, nt.value = {
        x: H.clientX + window.scrollX,
        y: H.clientY + window.scrollY,
        rect: { ...T.rect }
      };
    }
    function ve(T) {
      if (!i.value || !nt.value.rect) return;
      const E = T.clientX + window.scrollX - nt.value.x, H = T.clientY + window.scrollY - nt.value.y, rt = nt.value.rect, lt = D.value.find((Qt) => Qt.id === i.value);
      if (!lt) return;
      let { x: zt, y: Lt, width: Ft, height: Jt } = rt;
      N.value.includes("e") && (Ft = Math.max(10, rt.width + E)), N.value.includes("s") && (Jt = Math.max(10, rt.height + H)), N.value.includes("w") && (Ft = Math.max(10, rt.width - E), zt = rt.x + (rt.width - Ft)), N.value.includes("n") && (Jt = Math.max(10, rt.height - H), Lt = rt.y + (rt.height - Jt)), lt.rect = { x: zt, y: Lt, width: Ft, height: Jt };
    }
    function we(T) {
      var H, rt;
      ((H = T.target.classList) != null && H.contains("toolbar-title") || (rt = T.target.classList) != null && rt.contains("review-toolbar")) && (Z.value = !0, it.value = {
        x: T.clientX - W.value.x,
        y: T.clientY - W.value.y
      });
    }
    function se(T) {
      if (Z.value) {
        W.value = {
          x: T.clientX - it.value.x,
          y: T.clientY - it.value.y
        };
        return;
      }
      if (O.value) {
        const E = T.clientX - I.value.x, H = T.clientY - I.value.y;
        ot.value = {
          width: Math.max(400, I.value.width + E),
          height: Math.max(48, I.value.height + H)
        };
      }
    }
    function oe(T) {
      O.value = !0;
      const E = T.target.closest(".review-toolbar"), H = E == null ? void 0 : E.getBoundingClientRect();
      I.value = {
        x: T.clientX,
        y: T.clientY,
        width: (H == null ? void 0 : H.width) || 0,
        height: (H == null ? void 0 : H.height) || 0
      };
    }
    function Gt(T) {
      var E;
      (E = T.target.classList) != null && E.contains("modal-header") && (Y.value = !0, yt.value = {
        x: T.clientX - et.value.x,
        y: T.clientY - et.value.y
      });
    }
    function Xt(T) {
      if (Y.value)
        et.value = {
          x: T.clientX - yt.value.x,
          y: T.clientY - yt.value.y
        };
      else if (xt.value) {
        const E = T.clientX - ct.value.x, H = T.clientY - ct.value.y;
        K.value = {
          width: Math.max(360, ct.value.width + E),
          height: Math.max(300, ct.value.height + H)
        };
      }
    }
    function cr(T) {
      xt.value = !0, ct.value = {
        x: T.clientX,
        y: T.clientY,
        width: K.value.width,
        height: K.value.height
      };
    }
    function Oe(T) {
      T.key === "Escape" && (h.value ? h.value = !1 : Le());
    }
    function dr() {
    }
    function fr() {
      L.value.length === 0 && (V.value = null), x.value = !0;
    }
    function Be(T) {
      if (!T.rect) {
        B.value = null;
        return;
      }
      B.value = T.rect;
    }
    function Pe(T) {
      var rt;
      if (!T.selector) return;
      const E = document.querySelector(T.selector);
      if (!E) return;
      const H = E.getBoundingClientRect();
      L.value = [{
        el: E,
        selector: T.selector,
        tag: E.tagName.toLowerCase(),
        text: ((rt = E.innerText) == null ? void 0 : rt.slice(0, 40)) || "",
        rect: {
          x: H.left + window.scrollX,
          y: H.top + window.scrollY,
          width: H.width,
          height: H.height
        }
      }], D.value = [], V.value = ze(E), x.value = !1;
    }
    function ye() {
      L.value = [], D.value = [], V.value = null, Q.value = null;
    }
    function hr() {
      const T = G(), E = pr(), H = L.value[0], rt = H != null && H.el ? me(H.el) : null;
      at.value = {
        type: L.value.length > 0 ? "element" : "viewport",
        title: "",
        severity: "medium",
        suggestion: "",
        targets: E,
        viewport: T.viewport,
        scroll: T.scroll,
        pagePath: T.pagePath,
        pageUrl: T.pageUrl,
        pageName: T.pageName,
        aria: (rt == null ? void 0 : rt.aria) || null,
        locators: rt ? De(rt) : null
      }, ft.value = [], h.value = !0;
    }
    function pr() {
      const T = [];
      return L.value.forEach((E) => {
        const H = E.el ? me(E.el) : null;
        T.push({
          type: "element",
          selector: E.selector,
          elementText: E.text,
          elementRect: E.rect,
          componentTree: H ? ze(E.el) : null,
          aria: (H == null ? void 0 : H.aria) || null,
          locators: H ? De(H) : null
        });
      }), D.value.forEach((E) => {
        T.push({
          type: "viewport",
          viewportRect: E.rect
        });
      }), T;
    }
    function De(T) {
      const E = {};
      return T.selector && (E.cssSelector = T.selector), T.xpath && (E.xpath = T.xpath), T.aria && Object.keys(T.aria).length && (E.aria = T.aria), T.testId && (E.testId = T.testId), Object.keys(E).length ? E : null;
    }
    async function mr() {
      const T = [];
      for (const E of ft.value)
        if (E === jt.TARGETS)
          for (const H of at.value.targets) {
            let rt = null;
            if (H.type === "element" && H.elementRect) {
              const lt = document.querySelector(H.selector);
              lt && (rt = await lr(lt));
            } else H.type === "viewport" && H.viewportRect && (rt = await Tn(H.viewportRect));
            if (rt) {
              const lt = Ee(H.type);
              let zt = null;
              f.imageUpload && (zt = await Ce(rt, lt, f.imageUpload)), T.push({ type: H.type, filename: lt, data: zt ? void 0 : rt, url: zt || void 0 });
            }
          }
        else if (E === jt.VIEWPORT) {
          const H = await Rn();
          if (H) {
            const rt = Ee(jt.VIEWPORT);
            let lt = null;
            f.imageUpload && (lt = await Ce(H, rt, f.imageUpload)), T.push({ type: jt.VIEWPORT, filename: rt, data: lt ? void 0 : H, url: lt || void 0 });
          }
        } else if (E === jt.FULL_PAGE) {
          const H = await An();
          if (H) {
            const rt = Ee(jt.FULL_PAGE);
            let lt = null;
            f.imageUpload && (lt = await Ce(H, rt, f.imageUpload)), T.push({ type: jt.FULL_PAGE, filename: rt, data: lt ? void 0 : H, url: lt || void 0 });
          }
        }
      return T;
    }
    function gr() {
      ft.value = [], at.value = {
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
    async function vr() {
      if (!Tt.value) return;
      const T = await mr(), E = d({
        type: at.value.type,
        title: at.value.title.trim(),
        severity: at.value.severity,
        suggestion: at.value.suggestion.trim(),
        targets: at.value.targets,
        viewport: at.value.viewport,
        scroll: at.value.scroll,
        pagePath: at.value.pagePath,
        pageUrl: at.value.pageUrl,
        pageName: at.value.pageName,
        status: "open",
        screenshots: T,
        aria: at.value.aria,
        locators: at.value.locators
      });
      h.value = !1, ye(), u("add", E);
    }
    function wr(T) {
      _(T, { status: "resolved" }), u("update", { id: T, status: "resolved" });
    }
    function yr(T) {
      We.confirm("确定删除这条评审意见吗？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        S(T), u("delete", { id: T });
      });
    }
    function _r() {
      l.value.length !== 0 && We.confirm("确定清空当前页面的所有评审意见吗？", "清空确认", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        b(r.value), u("clear", { pagePath: r.value });
      });
    }
    function Le() {
      u("update:active", !1);
    }
    function Fe() {
      document.addEventListener("mousemove", vt), document.addEventListener("mouseout", dt), document.addEventListener("click", Ct, !0), document.addEventListener("mousedown", Wt), document.addEventListener("mousemove", bt), document.addEventListener("mousemove", se), document.addEventListener("mousemove", Xt), document.addEventListener("mouseup", Vt), document.addEventListener("keydown", Oe);
    }
    function Ne() {
      document.removeEventListener("mousemove", vt), document.removeEventListener("mouseout", dt), document.removeEventListener("click", Ct, !0), document.removeEventListener("mousedown", Wt), document.removeEventListener("mousemove", bt), document.removeEventListener("mousemove", se), document.removeEventListener("mousemove", Xt), document.removeEventListener("mouseup", Vt), document.removeEventListener("keydown", Oe);
    }
    Sr(() => {
      f.active && Fe();
    }), $e(() => {
      Ne();
    });
    let _e = null;
    return Er(() => {
      _e = Cr(() => f.active, (T) => {
        T ? (Fe(), m.value = "element") : (Ne(), ye(), gr(), z.value = null, g.value = !1, x.value = !1);
      });
    }), $e(() => {
      _e && _e();
    }), o({
      reviews: s,
      pageReviews: l,
      addReview: d,
      updateReview: _,
      deleteReview: S,
      clearPageReviews: b,
      exportToJSON: y,
      exportToMarkdown: c
    }), (T, E) => {
      const H = Et("el-radio-button"), rt = Et("el-radio-group"), lt = Et("el-button"), zt = Et("el-badge"), Lt = Et("el-dropdown-item"), Ft = Et("el-dropdown-menu"), Jt = Et("el-dropdown"), Qt = Et("el-tag"), Yt = Et("el-form-item"), be = Et("el-checkbox"), br = Et("el-checkbox-group"), Ue = Et("el-input"), le = Et("el-radio"), kr = Et("el-form"), Me = Et("el-empty"), je = Et("el-drawer"), xr = Et("el-card");
      return pt(), Nt(zr, { to: "body" }, [
        e.active ? (pt(), kt("div", {
          key: 0,
          class: "review-overlay",
          onClick: dr
        }, [
          ht("div", {
            class: ue(["review-toolbar", { "is-dragging": Z.value }]),
            style: $t(It.value),
            onClick: E[2] || (E[2] = Ut(() => {
            }, ["stop"])),
            onMousedown: we
          }, [
            ht("div", Hn, [
              E[18] || (E[18] = ht("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              ut(rt, {
                modelValue: m.value,
                "onUpdate:modelValue": E[0] || (E[0] = (q) => m.value = q),
                size: "small"
              }, {
                default: st(() => [
                  ut(H, { label: "element" }, {
                    default: st(() => [...E[16] || (E[16] = [
                      mt("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  ut(H, { label: "viewport" }, {
                    default: st(() => [...E[17] || (E[17] = [
                      mt("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            ht("div", Vn, [
              e.enableComponentTree ? (pt(), Nt(lt, {
                key: 0,
                size: "small",
                onClick: fr
              }, {
                default: st(() => [...E[19] || (E[19] = [
                  mt(" 组件树 ", -1)
                ])]),
                _: 1
              })) : Rt("", !0),
              ut(lt, {
                size: "small",
                type: "primary",
                disabled: _t.value === 0,
                onClick: hr
              }, {
                default: st(() => [
                  mt(" 评审 (" + St(_t.value) + ") ", 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              ut(lt, {
                size: "small",
                disabled: _t.value === 0,
                onClick: ye
              }, {
                default: st(() => [...E[20] || (E[20] = [
                  mt(" 取消选择 ", -1)
                ])]),
                _: 1
              }, 8, ["disabled"]),
              ut(zt, {
                value: l.value.length,
                class: "review-badge"
              }, {
                default: st(() => [
                  ut(lt, {
                    size: "small",
                    onClick: E[1] || (E[1] = (q) => g.value = !0)
                  }, {
                    default: st(() => [...E[21] || (E[21] = [
                      mt("评审列表", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              ut(Jt, {
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
                          mt("导出为 Markdown", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      ut(Lt, { onClick: Mt(y) }, {
                        default: st(() => [...E[23] || (E[23] = [
                          mt("导出为 JSON", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      e.enableZipExport ? (pt(), Nt(Lt, {
                        key: 0,
                        onClick: Mt(w)
                      }, {
                        default: st(() => [...E[24] || (E[24] = [
                          mt("导出为 ZIP", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])) : Rt("", !0)
                    ]),
                    _: 1
                  })
                ]),
                default: st(() => [
                  E[25] || (E[25] = mt(" 导出 ", -1))
                ]),
                _: 1
              }, 8, ["onClick"]),
              ut(lt, {
                size: "small",
                type: "danger",
                onClick: Le
              }, {
                default: st(() => [...E[26] || (E[26] = [
                  mt("退出评审", -1)
                ])]),
                _: 1
              })
            ]),
            ht("div", {
              class: "toolbar-resize-handle",
              onMousedown: Ut(oe, ["stop"])
            }, null, 32)
          ], 38),
          z.value && m.value === "element" && !k.value && !i.value ? (pt(), kt("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: $t(P(z.value))
          }, [
            ht("span", Gn, St(R.value), 1)
          ], 4)) : Rt("", !0),
          (pt(!0), kt(Kt, null, qt(L.value, (q, wt) => (pt(), kt("div", {
            key: "el-" + wt,
            class: "highlight-box selected-box",
            style: $t(P(q.rect)),
            onClick: Ut((Bt) => Ht(q, Bt), ["stop"])
          }, [
            ht("span", Yn, [
              mt(St(q.tag) + " ", 1),
              ht("i", {
                class: "remove-icon",
                onClick: Ut((Bt) => Ot(q), ["stop"])
              }, "×", 8, Kn)
            ])
          ], 12, Xn))), 128)),
          B.value ? (pt(), kt("div", {
            key: 1,
            class: "highlight-box tree-hover-box",
            style: $t(P(B.value))
          }, null, 4)) : Rt("", !0),
          (pt(!0), kt(Kt, null, qt(D.value, (q) => (pt(), kt("div", {
            key: q.id,
            class: ue(["drag-rect selected-box", { "is-resizing": i.value === q.id }]),
            style: $t(v(q.rect)),
            onMousedown: Ut((wt) => ne(q, wt), ["stop"])
          }, [
            ht("span", {
              class: "box-label",
              onMousedown: E[3] || (E[3] = Ut(() => {
              }, ["stop"]))
            }, [
              mt(" 框选 " + St(q.index + 1) + " ", 1),
              ht("i", {
                class: "remove-icon",
                onClick: Ut((wt) => Dt(q), ["stop"])
              }, "×", 8, Jn)
            ], 32),
            (pt(), kt(Kt, null, qt(U, (wt) => ht("div", {
              key: wt.position,
              class: ue(["resize-handle", "handle-" + wt.position]),
              style: $t(p(wt.position, q.rect)),
              onMousedown: Ut((Bt) => ae(q, wt.position, Bt), ["stop"])
            }, null, 46, Qn)), 64))
          ], 46, qn))), 128)),
          Q.value ? (pt(), kt("div", {
            key: 2,
            class: "drag-rect preview-box",
            style: $t(v(Q.value))
          }, null, 4)) : Rt("", !0),
          h.value ? (pt(), kt("div", {
            key: 3,
            class: "modal-backdrop",
            onClick: E[4] || (E[4] = (q) => h.value = !1)
          })) : Rt("", !0),
          h.value ? (pt(), kt("div", {
            key: 4,
            class: ue(["modal review-modal", { "is-dragging": Y.value }]),
            style: $t(t.value),
            onClick: E[11] || (E[11] = Ut(() => {
            }, ["stop"]))
          }, [
            ht("div", {
              class: "modal-header",
              onMousedown: Gt
            }, [
              E[27] || (E[27] = ht("span", null, "添加评审意见", -1)),
              ht("button", {
                class: "close",
                onClick: E[5] || (E[5] = (q) => h.value = !1)
              }, "×")
            ], 32),
            ht("div", ti, [
              ut(kr, {
                model: at.value,
                "label-width": "80px"
              }, {
                default: st(() => [
                  ut(Yt, { label: "评审目标" }, {
                    default: st(() => [
                      ht("div", ei, [
                        (pt(!0), kt(Kt, null, qt(at.value.targets, (q, wt) => (pt(), Nt(Qt, {
                          key: wt,
                          size: "small",
                          class: "target-tag"
                        }, {
                          default: st(() => {
                            var Bt, ie;
                            return [
                              mt(St(q.type === "element" ? q.elementText || q.selector || "元素" : `框选 ${(Bt = q.viewportRect) == null ? void 0 : Bt.x},${(ie = q.viewportRect) == null ? void 0 : ie.y}`), 1)
                            ];
                          }),
                          _: 2
                        }, 1024))), 128))
                      ])
                    ]),
                    _: 1
                  }),
                  ut(Yt, { label: "窗口尺寸" }, {
                    default: st(() => {
                      var q, wt;
                      return [
                        ht("span", ri, St((q = at.value.viewport) == null ? void 0 : q.width) + " × " + St((wt = at.value.viewport) == null ? void 0 : wt.height), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ut(Yt, { label: "滚动位置" }, {
                    default: st(() => {
                      var q, wt;
                      return [
                        ht("span", ni, "x=" + St((q = at.value.scroll) == null ? void 0 : q.x) + ", y=" + St((wt = at.value.scroll) == null ? void 0 : wt.y), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ut(Yt, { label: "截图" }, {
                    default: st(() => [
                      ut(br, {
                        modelValue: ft.value,
                        "onUpdate:modelValue": E[6] || (E[6] = (q) => ft.value = q)
                      }, {
                        default: st(() => [
                          ut(be, {
                            label: Mt(jt).TARGETS
                          }, {
                            default: st(() => [...E[28] || (E[28] = [
                              mt("选中目标", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"]),
                          ut(be, {
                            label: Mt(jt).VIEWPORT
                          }, {
                            default: st(() => [...E[29] || (E[29] = [
                              mt("当前视口", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"]),
                          ut(be, {
                            label: Mt(jt).FULL_PAGE
                          }, {
                            default: st(() => [...E[30] || (E[30] = [
                              mt("完整页面", -1)
                            ])]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Yt, {
                    label: "标题",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(Ue, {
                        modelValue: at.value.title,
                        "onUpdate:modelValue": E[7] || (E[7] = (q) => at.value.title = q),
                        placeholder: "例如：按钮样式不统一"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Yt, {
                    label: "严重等级",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(rt, {
                        modelValue: at.value.severity,
                        "onUpdate:modelValue": E[8] || (E[8] = (q) => at.value.severity = q)
                      }, {
                        default: st(() => [
                          ut(le, { label: "low" }, {
                            default: st(() => [...E[31] || (E[31] = [
                              mt("低", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "medium" }, {
                            default: st(() => [...E[32] || (E[32] = [
                              mt("中", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "high" }, {
                            default: st(() => [...E[33] || (E[33] = [
                              mt("高", -1)
                            ])]),
                            _: 1
                          }),
                          ut(le, { label: "critical" }, {
                            default: st(() => [...E[34] || (E[34] = [
                              mt("严重", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ut(Yt, {
                    label: "评审建议",
                    required: ""
                  }, {
                    default: st(() => [
                      ut(Ue, {
                        modelValue: at.value.suggestion,
                        "onUpdate:modelValue": E[9] || (E[9] = (q) => at.value.suggestion = q),
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
            ht("div", ii, [
              ut(lt, {
                onClick: E[10] || (E[10] = (q) => h.value = !1)
              }, {
                default: st(() => [...E[35] || (E[35] = [
                  mt("取消", -1)
                ])]),
                _: 1
              }),
              ut(lt, {
                type: "primary",
                disabled: !Tt.value,
                onClick: vr
              }, {
                default: st(() => [...E[36] || (E[36] = [
                  mt("保存评审", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            ht("div", {
              class: "modal-resize-handle",
              onMousedown: Ut(cr, ["stop"])
            }, null, 32)
          ], 6)) : Rt("", !0),
          ut(je, {
            modelValue: x.value,
            "onUpdate:modelValue": E[14] || (E[14] = (q) => x.value = q),
            title: "组件树检查器",
            size: "480px",
            "with-header": !0
          }, {
            default: st(() => [
              V.value ? (pt(), kt("div", ai, [
                V.value.framework && V.value.framework.length ? (pt(), kt("div", si, [
                  E[37] || (E[37] = ht("h4", null, "框架组件树", -1)),
                  ht("div", oi, [
                    (pt(!0), kt(Kt, null, qt(V.value.framework, (q, wt) => (pt(), kt("div", {
                      key: "fw-" + wt,
                      class: "tree-node",
                      onMouseenter: (Bt) => Be(q),
                      onMouseleave: E[12] || (E[12] = (Bt) => B.value = null),
                      onClick: (Bt) => Pe(q)
                    }, [
                      ht("span", ui, St(q.componentName), 1)
                    ], 40, li))), 128))
                  ])
                ])) : Rt("", !0),
                ht("div", ci, [
                  E[38] || (E[38] = ht("h4", null, "DOM 树", -1)),
                  ht("div", di, [
                    (pt(!0), kt(Kt, null, qt(V.value.dom, (q, wt) => {
                      var Bt;
                      return pt(), kt("div", {
                        key: "dom-" + wt,
                        class: "tree-node",
                        style: $t({ paddingLeft: wt * 12 + "px" }),
                        onMouseenter: (ie) => Be(q),
                        onMouseleave: E[13] || (E[13] = (ie) => B.value = null),
                        onClick: (ie) => Pe(q)
                      }, [
                        ht("span", hi, St(q.tag), 1),
                        q.id ? (pt(), kt("span", pi, "#" + St(q.id), 1)) : Rt("", !0),
                        (Bt = q.aria) != null && Bt.role ? (pt(), kt("span", mi, "role=" + St(q.aria.role), 1)) : Rt("", !0),
                        q.testId ? (pt(), kt("span", gi, "testid=" + St(q.testId), 1)) : Rt("", !0)
                      ], 44, fi);
                    }), 128))
                  ])
                ])
              ])) : (pt(), Nt(Me, {
                key: 0,
                description: "先选择一个元素以查看组件树"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          ut(je, {
            modelValue: g.value,
            "onUpdate:modelValue": E[15] || (E[15] = (q) => g.value = q),
            title: "当前页面评审意见",
            size: "480px",
            "with-header": !0
          }, {
            default: st(() => [
              ht("div", vi, [
                ut(lt, {
                  size: "small",
                  type: "primary",
                  onClick: Mt(c)
                }, {
                  default: st(() => [...E[39] || (E[39] = [
                    mt("导出 Markdown", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                ut(lt, {
                  size: "small",
                  onClick: Mt(y)
                }, {
                  default: st(() => [...E[40] || (E[40] = [
                    mt("导出 JSON", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                e.enableZipExport ? (pt(), Nt(lt, {
                  key: 0,
                  size: "small",
                  onClick: Mt(w)
                }, {
                  default: st(() => [...E[41] || (E[41] = [
                    mt("导出 ZIP", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : Rt("", !0),
                ut(lt, {
                  size: "small",
                  type: "danger",
                  text: "",
                  onClick: _r
                }, {
                  default: st(() => [...E[42] || (E[42] = [
                    mt("清空本页", -1)
                  ])]),
                  _: 1
                })
              ]),
              l.value.length === 0 ? (pt(), Nt(Me, {
                key: 0,
                description: "暂无评审意见"
              })) : (pt(), kt("div", wi, [
                (pt(!0), kt(Kt, null, qt(l.value, (q) => (pt(), Nt(xr, {
                  key: q.id,
                  class: "review-item",
                  shadow: "never"
                }, {
                  default: st(() => [
                    ht("div", yi, [
                      ht("span", _i, St(q.title), 1),
                      ht("div", bi, [
                        ut(Qt, {
                          size: "small",
                          type: C(q.severity)
                        }, {
                          default: st(() => [
                            mt(St(M(q.severity)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        ut(Qt, {
                          size: "small",
                          type: "info"
                        }, {
                          default: st(() => {
                            var wt;
                            return [
                              mt(St(((wt = q.targets) == null ? void 0 : wt.length) || 1) + " 个目标", 1)
                            ];
                          }),
                          _: 2
                        }, 1024),
                        j(q) ? (pt(), Nt(Qt, {
                          key: 0,
                          size: "small",
                          type: "success"
                        }, {
                          default: st(() => [...E[43] || (E[43] = [
                            mt("树", -1)
                          ])]),
                          _: 1
                        })) : Rt("", !0)
                      ])
                    ]),
                    ht("p", ki, St(A(q.targets)), 1),
                    ht("p", xi, St(q.suggestion), 1),
                    ht("div", Si, [
                      ht("span", Ei, St(new Date(q.createdAt).toLocaleString()), 1),
                      ht("div", Ci, [
                        q.status !== "resolved" ? (pt(), Nt(lt, {
                          key: 0,
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: (wt) => wr(q.id)
                        }, {
                          default: st(() => [...E[44] || (E[44] = [
                            mt("标记解决", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])) : Rt("", !0),
                        ut(lt, {
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: (wt) => yr(q.id)
                        }, {
                          default: st(() => [...E[45] || (E[45] = [
                            mt("删除", -1)
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
}, Ti = /* @__PURE__ */ Zn(zi, [["__scopeId", "data-v-2acdced6"]]);
export {
  Ti as ReviewTool,
  Ti as default,
  Ir as usePageReview
};
