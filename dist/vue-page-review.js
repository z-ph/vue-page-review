import { ref as bt, computed as jt, onMounted as Pe, onUnmounted as ue, nextTick as Be, watch as De, resolveComponent as vt, openBlock as yt, createBlock as Dt, Teleport as Fe, createElementBlock as Tt, createElementVNode as _t, withModifiers as Le, normalizeStyle as Vt, normalizeClass as Ue, createVNode as ot, withCtx as nt, createTextVNode as ht, unref as Ft, createCommentVNode as Lt, toDisplayString as mt, Fragment as ce, renderList as he } from "vue";
import { ElMessageBox as fe } from "element-plus";
var Gt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ne(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Xt(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var be = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(s, d) {
  (function(i) {
    s.exports = i();
  })(function() {
    return function i(m, h, e) {
      function a(w, S) {
        if (!h[w]) {
          if (!m[w]) {
            var y = typeof Xt == "function" && Xt;
            if (!S && y) return y(w, !0);
            if (n) return n(w, !0);
            var x = new Error("Cannot find module '" + w + "'");
            throw x.code = "MODULE_NOT_FOUND", x;
          }
          var l = h[w] = { exports: {} };
          m[w][0].call(l.exports, function(_) {
            var o = m[w][1][_];
            return a(o || _);
          }, l, l.exports, i, m, h, e);
        }
        return h[w].exports;
      }
      for (var n = typeof Xt == "function" && Xt, u = 0; u < e.length; u++) a(e[u]);
      return a;
    }({ 1: [function(i, m, h) {
      var e = i("./utils"), a = i("./support"), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      h.encode = function(u) {
        for (var w, S, y, x, l, _, o, p = [], c = 0, g = u.length, k = g, R = e.getTypeOf(u) !== "string"; c < u.length; ) k = g - c, y = R ? (w = u[c++], S = c < g ? u[c++] : 0, c < g ? u[c++] : 0) : (w = u.charCodeAt(c++), S = c < g ? u.charCodeAt(c++) : 0, c < g ? u.charCodeAt(c++) : 0), x = w >> 2, l = (3 & w) << 4 | S >> 4, _ = 1 < k ? (15 & S) << 2 | y >> 6 : 64, o = 2 < k ? 63 & y : 64, p.push(n.charAt(x) + n.charAt(l) + n.charAt(_) + n.charAt(o));
        return p.join("");
      }, h.decode = function(u) {
        var w, S, y, x, l, _, o = 0, p = 0, c = "data:";
        if (u.substr(0, c.length) === c) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, k = 3 * (u = u.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (u.charAt(u.length - 1) === n.charAt(64) && k--, u.charAt(u.length - 2) === n.charAt(64) && k--, k % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = a.uint8array ? new Uint8Array(0 | k) : new Array(0 | k); o < u.length; ) w = n.indexOf(u.charAt(o++)) << 2 | (x = n.indexOf(u.charAt(o++))) >> 4, S = (15 & x) << 4 | (l = n.indexOf(u.charAt(o++))) >> 2, y = (3 & l) << 6 | (_ = n.indexOf(u.charAt(o++))), g[p++] = w, l !== 64 && (g[p++] = S), _ !== 64 && (g[p++] = y);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(i, m, h) {
      var e = i("./external"), a = i("./stream/DataWorker"), n = i("./stream/Crc32Probe"), u = i("./stream/DataLengthProbe");
      function w(S, y, x, l, _) {
        this.compressedSize = S, this.uncompressedSize = y, this.crc32 = x, this.compression = l, this.compressedContent = _;
      }
      w.prototype = { getContentWorker: function() {
        var S = new a(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")), y = this;
        return S.on("end", function() {
          if (this.streamInfo.data_length !== y.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), S;
      }, getCompressedWorker: function() {
        return new a(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, w.createWorkerFrom = function(S, y, x) {
        return S.pipe(new n()).pipe(new u("uncompressedSize")).pipe(y.compressWorker(x)).pipe(new u("compressedSize")).withStreamInfo("compression", y);
      }, m.exports = w;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(i, m, h) {
      var e = i("./stream/GenericWorker");
      h.STORE = { magic: "\0\0", compressWorker: function() {
        return new e("STORE compression");
      }, uncompressWorker: function() {
        return new e("STORE decompression");
      } }, h.DEFLATE = i("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(i, m, h) {
      var e = i("./utils"), a = function() {
        for (var n, u = [], w = 0; w < 256; w++) {
          n = w;
          for (var S = 0; S < 8; S++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
          u[w] = n;
        }
        return u;
      }();
      m.exports = function(n, u) {
        return n !== void 0 && n.length ? e.getTypeOf(n) !== "string" ? function(w, S, y, x) {
          var l = a, _ = x + y;
          w ^= -1;
          for (var o = x; o < _; o++) w = w >>> 8 ^ l[255 & (w ^ S[o])];
          return -1 ^ w;
        }(0 | u, n, n.length, 0) : function(w, S, y, x) {
          var l = a, _ = x + y;
          w ^= -1;
          for (var o = x; o < _; o++) w = w >>> 8 ^ l[255 & (w ^ S.charCodeAt(o))];
          return -1 ^ w;
        }(0 | u, n, n.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(i, m, h) {
      h.base64 = !1, h.binary = !1, h.dir = !1, h.createFolders = !0, h.date = null, h.compression = null, h.compressionOptions = null, h.comment = null, h.unixPermissions = null, h.dosPermissions = null;
    }, {}], 6: [function(i, m, h) {
      var e = null;
      e = typeof Promise < "u" ? Promise : i("lie"), m.exports = { Promise: e };
    }, { lie: 37 }], 7: [function(i, m, h) {
      var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", a = i("pako"), n = i("./utils"), u = i("./stream/GenericWorker"), w = e ? "uint8array" : "array";
      function S(y, x) {
        u.call(this, "FlateWorker/" + y), this._pako = null, this._pakoAction = y, this._pakoOptions = x, this.meta = {};
      }
      h.magic = "\b\0", n.inherits(S, u), S.prototype.processChunk = function(y) {
        this.meta = y.meta, this._pako === null && this._createPako(), this._pako.push(n.transformTo(w, y.data), !1);
      }, S.prototype.flush = function() {
        u.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, S.prototype.cleanUp = function() {
        u.prototype.cleanUp.call(this), this._pako = null;
      }, S.prototype._createPako = function() {
        this._pako = new a[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var y = this;
        this._pako.onData = function(x) {
          y.push({ data: x, meta: y.meta });
        };
      }, h.compressWorker = function(y) {
        return new S("Deflate", y);
      }, h.uncompressWorker = function() {
        return new S("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(i, m, h) {
      function e(l, _) {
        var o, p = "";
        for (o = 0; o < _; o++) p += String.fromCharCode(255 & l), l >>>= 8;
        return p;
      }
      function a(l, _, o, p, c, g) {
        var k, R, C = l.file, L = l.compression, F = g !== w.utf8encode, j = n.transformTo("string", g(C.name)), P = n.transformTo("string", w.utf8encode(C.name)), Z = C.comment, J = n.transformTo("string", g(Z)), b = n.transformTo("string", w.utf8encode(Z)), z = P.length !== C.name.length, r = b.length !== Z.length, N = "", et = "", $ = "", it = C.dir, H = C.date, tt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        _ && !o || (tt.crc32 = l.crc32, tt.compressedSize = l.compressedSize, tt.uncompressedSize = l.uncompressedSize);
        var B = 0;
        _ && (B |= 8), F || !z && !r || (B |= 2048);
        var O = 0, Q = 0;
        it && (O |= 16), c === "UNIX" ? (Q = 798, O |= function(G, ut) {
          var pt = G;
          return G || (pt = ut ? 16893 : 33204), (65535 & pt) << 16;
        }(C.unixPermissions, it)) : (Q = 20, O |= function(G) {
          return 63 & (G || 0);
        }(C.dosPermissions)), k = H.getUTCHours(), k <<= 6, k |= H.getUTCMinutes(), k <<= 5, k |= H.getUTCSeconds() / 2, R = H.getUTCFullYear() - 1980, R <<= 4, R |= H.getUTCMonth() + 1, R <<= 5, R |= H.getUTCDate(), z && (et = e(1, 1) + e(S(j), 4) + P, N += "up" + e(et.length, 2) + et), r && ($ = e(1, 1) + e(S(J), 4) + b, N += "uc" + e($.length, 2) + $);
        var Y = "";
        return Y += `
\0`, Y += e(B, 2), Y += L.magic, Y += e(k, 2), Y += e(R, 2), Y += e(tt.crc32, 4), Y += e(tt.compressedSize, 4), Y += e(tt.uncompressedSize, 4), Y += e(j.length, 2), Y += e(N.length, 2), { fileRecord: y.LOCAL_FILE_HEADER + Y + j + N, dirRecord: y.CENTRAL_FILE_HEADER + e(Q, 2) + Y + e(J.length, 2) + "\0\0\0\0" + e(O, 4) + e(p, 4) + j + N + J };
      }
      var n = i("../utils"), u = i("../stream/GenericWorker"), w = i("../utf8"), S = i("../crc32"), y = i("../signature");
      function x(l, _, o, p) {
        u.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = _, this.zipPlatform = o, this.encodeFileName = p, this.streamFiles = l, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      n.inherits(x, u), x.prototype.push = function(l) {
        var _ = l.meta.percent || 0, o = this.entriesCount, p = this._sources.length;
        this.accumulate ? this.contentBuffer.push(l) : (this.bytesWritten += l.data.length, u.prototype.push.call(this, { data: l.data, meta: { currentFile: this.currentFile, percent: o ? (_ + 100 * (o - p - 1)) / o : 100 } }));
      }, x.prototype.openedSource = function(l) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = l.file.name;
        var _ = this.streamFiles && !l.file.dir;
        if (_) {
          var o = a(l, _, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: o.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, x.prototype.closedSource = function(l) {
        this.accumulate = !1;
        var _ = this.streamFiles && !l.file.dir, o = a(l, _, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(o.dirRecord), _) this.push({ data: function(p) {
          return y.DATA_DESCRIPTOR + e(p.crc32, 4) + e(p.compressedSize, 4) + e(p.uncompressedSize, 4);
        }(l), meta: { percent: 100 } });
        else for (this.push({ data: o.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, x.prototype.flush = function() {
        for (var l = this.bytesWritten, _ = 0; _ < this.dirRecords.length; _++) this.push({ data: this.dirRecords[_], meta: { percent: 100 } });
        var o = this.bytesWritten - l, p = function(c, g, k, R, C) {
          var L = n.transformTo("string", C(R));
          return y.CENTRAL_DIRECTORY_END + "\0\0\0\0" + e(c, 2) + e(c, 2) + e(g, 4) + e(k, 4) + e(L.length, 2) + L;
        }(this.dirRecords.length, o, l, this.zipComment, this.encodeFileName);
        this.push({ data: p, meta: { percent: 100 } });
      }, x.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, x.prototype.registerPrevious = function(l) {
        this._sources.push(l);
        var _ = this;
        return l.on("data", function(o) {
          _.processChunk(o);
        }), l.on("end", function() {
          _.closedSource(_.previous.streamInfo), _._sources.length ? _.prepareNextSource() : _.end();
        }), l.on("error", function(o) {
          _.error(o);
        }), this;
      }, x.prototype.resume = function() {
        return !!u.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, x.prototype.error = function(l) {
        var _ = this._sources;
        if (!u.prototype.error.call(this, l)) return !1;
        for (var o = 0; o < _.length; o++) try {
          _[o].error(l);
        } catch {
        }
        return !0;
      }, x.prototype.lock = function() {
        u.prototype.lock.call(this);
        for (var l = this._sources, _ = 0; _ < l.length; _++) l[_].lock();
      }, m.exports = x;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(i, m, h) {
      var e = i("../compressions"), a = i("./ZipFileWorker");
      h.generateWorker = function(n, u, w) {
        var S = new a(u.streamFiles, w, u.platform, u.encodeFileName), y = 0;
        try {
          n.forEach(function(x, l) {
            y++;
            var _ = function(g, k) {
              var R = g || k, C = e[R];
              if (!C) throw new Error(R + " is not a valid compression method !");
              return C;
            }(l.options.compression, u.compression), o = l.options.compressionOptions || u.compressionOptions || {}, p = l.dir, c = l.date;
            l._compressWorker(_, o).withStreamInfo("file", { name: x, dir: p, date: c, comment: l.comment || "", unixPermissions: l.unixPermissions, dosPermissions: l.dosPermissions }).pipe(S);
          }), S.entriesCount = y;
        } catch (x) {
          S.error(x);
        }
        return S;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(i, m, h) {
      function e() {
        if (!(this instanceof e)) return new e();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var a = new e();
          for (var n in this) typeof this[n] != "function" && (a[n] = this[n]);
          return a;
        };
      }
      (e.prototype = i("./object")).loadAsync = i("./load"), e.support = i("./support"), e.defaults = i("./defaults"), e.version = "3.10.1", e.loadAsync = function(a, n) {
        return new e().loadAsync(a, n);
      }, e.external = i("./external"), m.exports = e;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(i, m, h) {
      var e = i("./utils"), a = i("./external"), n = i("./utf8"), u = i("./zipEntries"), w = i("./stream/Crc32Probe"), S = i("./nodejsUtils");
      function y(x) {
        return new a.Promise(function(l, _) {
          var o = x.decompressed.getContentWorker().pipe(new w());
          o.on("error", function(p) {
            _(p);
          }).on("end", function() {
            o.streamInfo.crc32 !== x.decompressed.crc32 ? _(new Error("Corrupted zip : CRC32 mismatch")) : l();
          }).resume();
        });
      }
      m.exports = function(x, l) {
        var _ = this;
        return l = e.extend(l || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: n.utf8decode }), S.isNode && S.isStream(x) ? a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : e.prepareContent("the loaded zip file", x, !0, l.optimizedBinaryString, l.base64).then(function(o) {
          var p = new u(l);
          return p.load(o), p;
        }).then(function(o) {
          var p = [a.Promise.resolve(o)], c = o.files;
          if (l.checkCRC32) for (var g = 0; g < c.length; g++) p.push(y(c[g]));
          return a.Promise.all(p);
        }).then(function(o) {
          for (var p = o.shift(), c = p.files, g = 0; g < c.length; g++) {
            var k = c[g], R = k.fileNameStr, C = e.resolve(k.fileNameStr);
            _.file(C, k.decompressed, { binary: !0, optimizedBinaryString: !0, date: k.date, dir: k.dir, comment: k.fileCommentStr.length ? k.fileCommentStr : null, unixPermissions: k.unixPermissions, dosPermissions: k.dosPermissions, createFolders: l.createFolders }), k.dir || (_.file(C).unsafeOriginalName = R);
          }
          return p.zipComment.length && (_.comment = p.zipComment), _;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(i, m, h) {
      var e = i("../utils"), a = i("../stream/GenericWorker");
      function n(u, w) {
        a.call(this, "Nodejs stream input adapter for " + u), this._upstreamEnded = !1, this._bindStream(w);
      }
      e.inherits(n, a), n.prototype._bindStream = function(u) {
        var w = this;
        (this._stream = u).pause(), u.on("data", function(S) {
          w.push({ data: S, meta: { percent: 0 } });
        }).on("error", function(S) {
          w.isPaused ? this.generatedError = S : w.error(S);
        }).on("end", function() {
          w.isPaused ? w._upstreamEnded = !0 : w.end();
        });
      }, n.prototype.pause = function() {
        return !!a.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, n.prototype.resume = function() {
        return !!a.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, m.exports = n;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(i, m, h) {
      var e = i("readable-stream").Readable;
      function a(n, u, w) {
        e.call(this, u), this._helper = n;
        var S = this;
        n.on("data", function(y, x) {
          S.push(y) || S._helper.pause(), w && w(x);
        }).on("error", function(y) {
          S.emit("error", y);
        }).on("end", function() {
          S.push(null);
        });
      }
      i("../utils").inherits(a, e), a.prototype._read = function() {
        this._helper.resume();
      }, m.exports = a;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(i, m, h) {
      m.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(e, a) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, a);
        if (typeof e == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(e, a);
      }, allocBuffer: function(e) {
        if (Buffer.alloc) return Buffer.alloc(e);
        var a = new Buffer(e);
        return a.fill(0), a;
      }, isBuffer: function(e) {
        return Buffer.isBuffer(e);
      }, isStream: function(e) {
        return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
      } };
    }, {}], 15: [function(i, m, h) {
      function e(C, L, F) {
        var j, P = n.getTypeOf(L), Z = n.extend(F || {}, S);
        Z.date = Z.date || /* @__PURE__ */ new Date(), Z.compression !== null && (Z.compression = Z.compression.toUpperCase()), typeof Z.unixPermissions == "string" && (Z.unixPermissions = parseInt(Z.unixPermissions, 8)), Z.unixPermissions && 16384 & Z.unixPermissions && (Z.dir = !0), Z.dosPermissions && 16 & Z.dosPermissions && (Z.dir = !0), Z.dir && (C = c(C)), Z.createFolders && (j = p(C)) && g.call(this, j, !0);
        var J = P === "string" && Z.binary === !1 && Z.base64 === !1;
        F && F.binary !== void 0 || (Z.binary = !J), (L instanceof y && L.uncompressedSize === 0 || Z.dir || !L || L.length === 0) && (Z.base64 = !1, Z.binary = !0, L = "", Z.compression = "STORE", P = "string");
        var b = null;
        b = L instanceof y || L instanceof u ? L : _.isNode && _.isStream(L) ? new o(C, L) : n.prepareContent(C, L, Z.binary, Z.optimizedBinaryString, Z.base64);
        var z = new x(C, b, Z);
        this.files[C] = z;
      }
      var a = i("./utf8"), n = i("./utils"), u = i("./stream/GenericWorker"), w = i("./stream/StreamHelper"), S = i("./defaults"), y = i("./compressedObject"), x = i("./zipObject"), l = i("./generate"), _ = i("./nodejsUtils"), o = i("./nodejs/NodejsStreamInputAdapter"), p = function(C) {
        C.slice(-1) === "/" && (C = C.substring(0, C.length - 1));
        var L = C.lastIndexOf("/");
        return 0 < L ? C.substring(0, L) : "";
      }, c = function(C) {
        return C.slice(-1) !== "/" && (C += "/"), C;
      }, g = function(C, L) {
        return L = L !== void 0 ? L : S.createFolders, C = c(C), this.files[C] || e.call(this, C, null, { dir: !0, createFolders: L }), this.files[C];
      };
      function k(C) {
        return Object.prototype.toString.call(C) === "[object RegExp]";
      }
      var R = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(C) {
        var L, F, j;
        for (L in this.files) j = this.files[L], (F = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && C(F, j);
      }, filter: function(C) {
        var L = [];
        return this.forEach(function(F, j) {
          C(F, j) && L.push(j);
        }), L;
      }, file: function(C, L, F) {
        if (arguments.length !== 1) return C = this.root + C, e.call(this, C, L, F), this;
        if (k(C)) {
          var j = C;
          return this.filter(function(Z, J) {
            return !J.dir && j.test(Z);
          });
        }
        var P = this.files[this.root + C];
        return P && !P.dir ? P : null;
      }, folder: function(C) {
        if (!C) return this;
        if (k(C)) return this.filter(function(P, Z) {
          return Z.dir && C.test(P);
        });
        var L = this.root + C, F = g.call(this, L), j = this.clone();
        return j.root = F.name, j;
      }, remove: function(C) {
        C = this.root + C;
        var L = this.files[C];
        if (L || (C.slice(-1) !== "/" && (C += "/"), L = this.files[C]), L && !L.dir) delete this.files[C];
        else for (var F = this.filter(function(P, Z) {
          return Z.name.slice(0, C.length) === C;
        }), j = 0; j < F.length; j++) delete this.files[F[j].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(C) {
        var L, F = {};
        try {
          if ((F = n.extend(C || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: a.utf8encode })).type = F.type.toLowerCase(), F.compression = F.compression.toUpperCase(), F.type === "binarystring" && (F.type = "string"), !F.type) throw new Error("No output type specified.");
          n.checkSupport(F.type), F.platform !== "darwin" && F.platform !== "freebsd" && F.platform !== "linux" && F.platform !== "sunos" || (F.platform = "UNIX"), F.platform === "win32" && (F.platform = "DOS");
          var j = F.comment || this.comment || "";
          L = l.generateWorker(this, F, j);
        } catch (P) {
          (L = new u("error")).error(P);
        }
        return new w(L, F.type || "string", F.mimeType);
      }, generateAsync: function(C, L) {
        return this.generateInternalStream(C).accumulate(L);
      }, generateNodeStream: function(C, L) {
        return (C = C || {}).type || (C.type = "nodebuffer"), this.generateInternalStream(C).toNodejsStream(L);
      } };
      m.exports = R;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(i, m, h) {
      m.exports = i("stream");
    }, { stream: void 0 }], 17: [function(i, m, h) {
      var e = i("./DataReader");
      function a(n) {
        e.call(this, n);
        for (var u = 0; u < this.data.length; u++) n[u] = 255 & n[u];
      }
      i("../utils").inherits(a, e), a.prototype.byteAt = function(n) {
        return this.data[this.zero + n];
      }, a.prototype.lastIndexOfSignature = function(n) {
        for (var u = n.charCodeAt(0), w = n.charCodeAt(1), S = n.charCodeAt(2), y = n.charCodeAt(3), x = this.length - 4; 0 <= x; --x) if (this.data[x] === u && this.data[x + 1] === w && this.data[x + 2] === S && this.data[x + 3] === y) return x - this.zero;
        return -1;
      }, a.prototype.readAndCheckSignature = function(n) {
        var u = n.charCodeAt(0), w = n.charCodeAt(1), S = n.charCodeAt(2), y = n.charCodeAt(3), x = this.readData(4);
        return u === x[0] && w === x[1] && S === x[2] && y === x[3];
      }, a.prototype.readData = function(n) {
        if (this.checkOffset(n), n === 0) return [];
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + n);
        return this.index += n, u;
      }, m.exports = a;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(i, m, h) {
      var e = i("../utils");
      function a(n) {
        this.data = n, this.length = n.length, this.index = 0, this.zero = 0;
      }
      a.prototype = { checkOffset: function(n) {
        this.checkIndex(this.index + n);
      }, checkIndex: function(n) {
        if (this.length < this.zero + n || n < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + n + "). Corrupted zip ?");
      }, setIndex: function(n) {
        this.checkIndex(n), this.index = n;
      }, skip: function(n) {
        this.setIndex(this.index + n);
      }, byteAt: function() {
      }, readInt: function(n) {
        var u, w = 0;
        for (this.checkOffset(n), u = this.index + n - 1; u >= this.index; u--) w = (w << 8) + this.byteAt(u);
        return this.index += n, w;
      }, readString: function(n) {
        return e.transformTo("string", this.readData(n));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var n = this.readInt(4);
        return new Date(Date.UTC(1980 + (n >> 25 & 127), (n >> 21 & 15) - 1, n >> 16 & 31, n >> 11 & 31, n >> 5 & 63, (31 & n) << 1));
      } }, m.exports = a;
    }, { "../utils": 32 }], 19: [function(i, m, h) {
      var e = i("./Uint8ArrayReader");
      function a(n) {
        e.call(this, n);
      }
      i("../utils").inherits(a, e), a.prototype.readData = function(n) {
        this.checkOffset(n);
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + n);
        return this.index += n, u;
      }, m.exports = a;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(i, m, h) {
      var e = i("./DataReader");
      function a(n) {
        e.call(this, n);
      }
      i("../utils").inherits(a, e), a.prototype.byteAt = function(n) {
        return this.data.charCodeAt(this.zero + n);
      }, a.prototype.lastIndexOfSignature = function(n) {
        return this.data.lastIndexOf(n) - this.zero;
      }, a.prototype.readAndCheckSignature = function(n) {
        return n === this.readData(4);
      }, a.prototype.readData = function(n) {
        this.checkOffset(n);
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + n);
        return this.index += n, u;
      }, m.exports = a;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(i, m, h) {
      var e = i("./ArrayReader");
      function a(n) {
        e.call(this, n);
      }
      i("../utils").inherits(a, e), a.prototype.readData = function(n) {
        if (this.checkOffset(n), n === 0) return new Uint8Array(0);
        var u = this.data.subarray(this.zero + this.index, this.zero + this.index + n);
        return this.index += n, u;
      }, m.exports = a;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(i, m, h) {
      var e = i("../utils"), a = i("../support"), n = i("./ArrayReader"), u = i("./StringReader"), w = i("./NodeBufferReader"), S = i("./Uint8ArrayReader");
      m.exports = function(y) {
        var x = e.getTypeOf(y);
        return e.checkSupport(x), x !== "string" || a.uint8array ? x === "nodebuffer" ? new w(y) : a.uint8array ? new S(e.transformTo("uint8array", y)) : new n(e.transformTo("array", y)) : new u(y);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(i, m, h) {
      h.LOCAL_FILE_HEADER = "PK", h.CENTRAL_FILE_HEADER = "PK", h.CENTRAL_DIRECTORY_END = "PK", h.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", h.ZIP64_CENTRAL_DIRECTORY_END = "PK", h.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(i, m, h) {
      var e = i("./GenericWorker"), a = i("../utils");
      function n(u) {
        e.call(this, "ConvertWorker to " + u), this.destType = u;
      }
      a.inherits(n, e), n.prototype.processChunk = function(u) {
        this.push({ data: a.transformTo(this.destType, u.data), meta: u.meta });
      }, m.exports = n;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(i, m, h) {
      var e = i("./GenericWorker"), a = i("../crc32");
      function n() {
        e.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      i("../utils").inherits(n, e), n.prototype.processChunk = function(u) {
        this.streamInfo.crc32 = a(u.data, this.streamInfo.crc32 || 0), this.push(u);
      }, m.exports = n;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(i, m, h) {
      var e = i("../utils"), a = i("./GenericWorker");
      function n(u) {
        a.call(this, "DataLengthProbe for " + u), this.propName = u, this.withStreamInfo(u, 0);
      }
      e.inherits(n, a), n.prototype.processChunk = function(u) {
        if (u) {
          var w = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = w + u.data.length;
        }
        a.prototype.processChunk.call(this, u);
      }, m.exports = n;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(i, m, h) {
      var e = i("../utils"), a = i("./GenericWorker");
      function n(u) {
        a.call(this, "DataWorker");
        var w = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, u.then(function(S) {
          w.dataIsReady = !0, w.data = S, w.max = S && S.length || 0, w.type = e.getTypeOf(S), w.isPaused || w._tickAndRepeat();
        }, function(S) {
          w.error(S);
        });
      }
      e.inherits(n, a), n.prototype.cleanUp = function() {
        a.prototype.cleanUp.call(this), this.data = null;
      }, n.prototype.resume = function() {
        return !!a.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, e.delay(this._tickAndRepeat, [], this)), !0);
      }, n.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (e.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, n.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var u = null, w = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            u = this.data.substring(this.index, w);
            break;
          case "uint8array":
            u = this.data.subarray(this.index, w);
            break;
          case "array":
          case "nodebuffer":
            u = this.data.slice(this.index, w);
        }
        return this.index = w, this.push({ data: u, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, m.exports = n;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(i, m, h) {
      function e(a) {
        this.name = a || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      e.prototype = { push: function(a) {
        this.emit("data", a);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (a) {
          this.emit("error", a);
        }
        return !0;
      }, error: function(a) {
        return !this.isFinished && (this.isPaused ? this.generatedError = a : (this.isFinished = !0, this.emit("error", a), this.previous && this.previous.error(a), this.cleanUp()), !0);
      }, on: function(a, n) {
        return this._listeners[a].push(n), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(a, n) {
        if (this._listeners[a]) for (var u = 0; u < this._listeners[a].length; u++) this._listeners[a][u].call(this, n);
      }, pipe: function(a) {
        return a.registerPrevious(this);
      }, registerPrevious: function(a) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = a.streamInfo, this.mergeStreamInfo(), this.previous = a;
        var n = this;
        return a.on("data", function(u) {
          n.processChunk(u);
        }), a.on("end", function() {
          n.end();
        }), a.on("error", function(u) {
          n.error(u);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var a = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), a = !0), this.previous && this.previous.resume(), !a;
      }, flush: function() {
      }, processChunk: function(a) {
        this.push(a);
      }, withStreamInfo: function(a, n) {
        return this.extraStreamInfo[a] = n, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var a in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, a) && (this.streamInfo[a] = this.extraStreamInfo[a]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var a = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + a : a;
      } }, m.exports = e;
    }, {}], 29: [function(i, m, h) {
      var e = i("../utils"), a = i("./ConvertWorker"), n = i("./GenericWorker"), u = i("../base64"), w = i("../support"), S = i("../external"), y = null;
      if (w.nodestream) try {
        y = i("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function x(_, o) {
        return new S.Promise(function(p, c) {
          var g = [], k = _._internalType, R = _._outputType, C = _._mimeType;
          _.on("data", function(L, F) {
            g.push(L), o && o(F);
          }).on("error", function(L) {
            g = [], c(L);
          }).on("end", function() {
            try {
              var L = function(F, j, P) {
                switch (F) {
                  case "blob":
                    return e.newBlob(e.transformTo("arraybuffer", j), P);
                  case "base64":
                    return u.encode(j);
                  default:
                    return e.transformTo(F, j);
                }
              }(R, function(F, j) {
                var P, Z = 0, J = null, b = 0;
                for (P = 0; P < j.length; P++) b += j[P].length;
                switch (F) {
                  case "string":
                    return j.join("");
                  case "array":
                    return Array.prototype.concat.apply([], j);
                  case "uint8array":
                    for (J = new Uint8Array(b), P = 0; P < j.length; P++) J.set(j[P], Z), Z += j[P].length;
                    return J;
                  case "nodebuffer":
                    return Buffer.concat(j);
                  default:
                    throw new Error("concat : unsupported type '" + F + "'");
                }
              }(k, g), C);
              p(L);
            } catch (F) {
              c(F);
            }
            g = [];
          }).resume();
        });
      }
      function l(_, o, p) {
        var c = o;
        switch (o) {
          case "blob":
          case "arraybuffer":
            c = "uint8array";
            break;
          case "base64":
            c = "string";
        }
        try {
          this._internalType = c, this._outputType = o, this._mimeType = p, e.checkSupport(c), this._worker = _.pipe(new a(c)), _.lock();
        } catch (g) {
          this._worker = new n("error"), this._worker.error(g);
        }
      }
      l.prototype = { accumulate: function(_) {
        return x(this, _);
      }, on: function(_, o) {
        var p = this;
        return _ === "data" ? this._worker.on(_, function(c) {
          o.call(p, c.data, c.meta);
        }) : this._worker.on(_, function() {
          e.delay(o, arguments, p);
        }), this;
      }, resume: function() {
        return e.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(_) {
        if (e.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new y(this, { objectMode: this._outputType !== "nodebuffer" }, _);
      } }, m.exports = l;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(i, m, h) {
      if (h.base64 = !0, h.array = !0, h.string = !0, h.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", h.nodebuffer = typeof Buffer < "u", h.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") h.blob = !1;
      else {
        var e = new ArrayBuffer(0);
        try {
          h.blob = new Blob([e], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var a = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            a.append(e), h.blob = a.getBlob("application/zip").size === 0;
          } catch {
            h.blob = !1;
          }
        }
      }
      try {
        h.nodestream = !!i("readable-stream").Readable;
      } catch {
        h.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(i, m, h) {
      for (var e = i("./utils"), a = i("./support"), n = i("./nodejsUtils"), u = i("./stream/GenericWorker"), w = new Array(256), S = 0; S < 256; S++) w[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
      w[254] = w[254] = 1;
      function y() {
        u.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function x() {
        u.call(this, "utf-8 encode");
      }
      h.utf8encode = function(l) {
        return a.nodebuffer ? n.newBufferFrom(l, "utf-8") : function(_) {
          var o, p, c, g, k, R = _.length, C = 0;
          for (g = 0; g < R; g++) (64512 & (p = _.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (c = _.charCodeAt(g + 1))) == 56320 && (p = 65536 + (p - 55296 << 10) + (c - 56320), g++), C += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4;
          for (o = a.uint8array ? new Uint8Array(C) : new Array(C), g = k = 0; k < C; g++) (64512 & (p = _.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (c = _.charCodeAt(g + 1))) == 56320 && (p = 65536 + (p - 55296 << 10) + (c - 56320), g++), p < 128 ? o[k++] = p : (p < 2048 ? o[k++] = 192 | p >>> 6 : (p < 65536 ? o[k++] = 224 | p >>> 12 : (o[k++] = 240 | p >>> 18, o[k++] = 128 | p >>> 12 & 63), o[k++] = 128 | p >>> 6 & 63), o[k++] = 128 | 63 & p);
          return o;
        }(l);
      }, h.utf8decode = function(l) {
        return a.nodebuffer ? e.transformTo("nodebuffer", l).toString("utf-8") : function(_) {
          var o, p, c, g, k = _.length, R = new Array(2 * k);
          for (o = p = 0; o < k; ) if ((c = _[o++]) < 128) R[p++] = c;
          else if (4 < (g = w[c])) R[p++] = 65533, o += g - 1;
          else {
            for (c &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && o < k; ) c = c << 6 | 63 & _[o++], g--;
            1 < g ? R[p++] = 65533 : c < 65536 ? R[p++] = c : (c -= 65536, R[p++] = 55296 | c >> 10 & 1023, R[p++] = 56320 | 1023 & c);
          }
          return R.length !== p && (R.subarray ? R = R.subarray(0, p) : R.length = p), e.applyFromCharCode(R);
        }(l = e.transformTo(a.uint8array ? "uint8array" : "array", l));
      }, e.inherits(y, u), y.prototype.processChunk = function(l) {
        var _ = e.transformTo(a.uint8array ? "uint8array" : "array", l.data);
        if (this.leftOver && this.leftOver.length) {
          if (a.uint8array) {
            var o = _;
            (_ = new Uint8Array(o.length + this.leftOver.length)).set(this.leftOver, 0), _.set(o, this.leftOver.length);
          } else _ = this.leftOver.concat(_);
          this.leftOver = null;
        }
        var p = function(g, k) {
          var R;
          for ((k = k || g.length) > g.length && (k = g.length), R = k - 1; 0 <= R && (192 & g[R]) == 128; ) R--;
          return R < 0 || R === 0 ? k : R + w[g[R]] > k ? R : k;
        }(_), c = _;
        p !== _.length && (a.uint8array ? (c = _.subarray(0, p), this.leftOver = _.subarray(p, _.length)) : (c = _.slice(0, p), this.leftOver = _.slice(p, _.length))), this.push({ data: h.utf8decode(c), meta: l.meta });
      }, y.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: h.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, h.Utf8DecodeWorker = y, e.inherits(x, u), x.prototype.processChunk = function(l) {
        this.push({ data: h.utf8encode(l.data), meta: l.meta });
      }, h.Utf8EncodeWorker = x;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(i, m, h) {
      var e = i("./support"), a = i("./base64"), n = i("./nodejsUtils"), u = i("./external");
      function w(o) {
        return o;
      }
      function S(o, p) {
        for (var c = 0; c < o.length; ++c) p[c] = 255 & o.charCodeAt(c);
        return p;
      }
      i("setimmediate"), h.newBlob = function(o, p) {
        h.checkSupport("blob");
        try {
          return new Blob([o], { type: p });
        } catch {
          try {
            var c = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return c.append(o), c.getBlob(p);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var y = { stringifyByChunk: function(o, p, c) {
        var g = [], k = 0, R = o.length;
        if (R <= c) return String.fromCharCode.apply(null, o);
        for (; k < R; ) p === "array" || p === "nodebuffer" ? g.push(String.fromCharCode.apply(null, o.slice(k, Math.min(k + c, R)))) : g.push(String.fromCharCode.apply(null, o.subarray(k, Math.min(k + c, R)))), k += c;
        return g.join("");
      }, stringifyByChar: function(o) {
        for (var p = "", c = 0; c < o.length; c++) p += String.fromCharCode(o[c]);
        return p;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return e.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return e.nodebuffer && String.fromCharCode.apply(null, n.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function x(o) {
        var p = 65536, c = h.getTypeOf(o), g = !0;
        if (c === "uint8array" ? g = y.applyCanBeUsed.uint8array : c === "nodebuffer" && (g = y.applyCanBeUsed.nodebuffer), g) for (; 1 < p; ) try {
          return y.stringifyByChunk(o, c, p);
        } catch {
          p = Math.floor(p / 2);
        }
        return y.stringifyByChar(o);
      }
      function l(o, p) {
        for (var c = 0; c < o.length; c++) p[c] = o[c];
        return p;
      }
      h.applyFromCharCode = x;
      var _ = {};
      _.string = { string: w, array: function(o) {
        return S(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return _.string.uint8array(o).buffer;
      }, uint8array: function(o) {
        return S(o, new Uint8Array(o.length));
      }, nodebuffer: function(o) {
        return S(o, n.allocBuffer(o.length));
      } }, _.array = { string: x, array: w, arraybuffer: function(o) {
        return new Uint8Array(o).buffer;
      }, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return n.newBufferFrom(o);
      } }, _.arraybuffer = { string: function(o) {
        return x(new Uint8Array(o));
      }, array: function(o) {
        return l(new Uint8Array(o), new Array(o.byteLength));
      }, arraybuffer: w, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return n.newBufferFrom(new Uint8Array(o));
      } }, _.uint8array = { string: x, array: function(o) {
        return l(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return o.buffer;
      }, uint8array: w, nodebuffer: function(o) {
        return n.newBufferFrom(o);
      } }, _.nodebuffer = { string: x, array: function(o) {
        return l(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return _.nodebuffer.uint8array(o).buffer;
      }, uint8array: function(o) {
        return l(o, new Uint8Array(o.length));
      }, nodebuffer: w }, h.transformTo = function(o, p) {
        if (p = p || "", !o) return p;
        h.checkSupport(o);
        var c = h.getTypeOf(p);
        return _[c][o](p);
      }, h.resolve = function(o) {
        for (var p = o.split("/"), c = [], g = 0; g < p.length; g++) {
          var k = p[g];
          k === "." || k === "" && g !== 0 && g !== p.length - 1 || (k === ".." ? c.pop() : c.push(k));
        }
        return c.join("/");
      }, h.getTypeOf = function(o) {
        return typeof o == "string" ? "string" : Object.prototype.toString.call(o) === "[object Array]" ? "array" : e.nodebuffer && n.isBuffer(o) ? "nodebuffer" : e.uint8array && o instanceof Uint8Array ? "uint8array" : e.arraybuffer && o instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, h.checkSupport = function(o) {
        if (!e[o.toLowerCase()]) throw new Error(o + " is not supported by this platform");
      }, h.MAX_VALUE_16BITS = 65535, h.MAX_VALUE_32BITS = -1, h.pretty = function(o) {
        var p, c, g = "";
        for (c = 0; c < (o || "").length; c++) g += "\\x" + ((p = o.charCodeAt(c)) < 16 ? "0" : "") + p.toString(16).toUpperCase();
        return g;
      }, h.delay = function(o, p, c) {
        setImmediate(function() {
          o.apply(c || null, p || []);
        });
      }, h.inherits = function(o, p) {
        function c() {
        }
        c.prototype = p.prototype, o.prototype = new c();
      }, h.extend = function() {
        var o, p, c = {};
        for (o = 0; o < arguments.length; o++) for (p in arguments[o]) Object.prototype.hasOwnProperty.call(arguments[o], p) && c[p] === void 0 && (c[p] = arguments[o][p]);
        return c;
      }, h.prepareContent = function(o, p, c, g, k) {
        return u.Promise.resolve(p).then(function(R) {
          return e.blob && (R instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(R)) !== -1) && typeof FileReader < "u" ? new u.Promise(function(C, L) {
            var F = new FileReader();
            F.onload = function(j) {
              C(j.target.result);
            }, F.onerror = function(j) {
              L(j.target.error);
            }, F.readAsArrayBuffer(R);
          }) : R;
        }).then(function(R) {
          var C = h.getTypeOf(R);
          return C ? (C === "arraybuffer" ? R = h.transformTo("uint8array", R) : C === "string" && (k ? R = a.decode(R) : c && g !== !0 && (R = function(L) {
            return S(L, e.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(R))), R) : u.Promise.reject(new Error("Can't read the data of '" + o + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(i, m, h) {
      var e = i("./reader/readerFor"), a = i("./utils"), n = i("./signature"), u = i("./zipEntry"), w = i("./support");
      function S(y) {
        this.files = [], this.loadOptions = y;
      }
      S.prototype = { checkSignature: function(y) {
        if (!this.reader.readAndCheckSignature(y)) {
          this.reader.index -= 4;
          var x = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + a.pretty(x) + ", expected " + a.pretty(y) + ")");
        }
      }, isSignature: function(y, x) {
        var l = this.reader.index;
        this.reader.setIndex(y);
        var _ = this.reader.readString(4) === x;
        return this.reader.setIndex(l), _;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var y = this.reader.readData(this.zipCommentLength), x = w.uint8array ? "uint8array" : "array", l = a.transformTo(x, y);
        this.zipComment = this.loadOptions.decodeFileName(l);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var y, x, l, _ = this.zip64EndOfCentralSize - 44; 0 < _; ) y = this.reader.readInt(2), x = this.reader.readInt(4), l = this.reader.readData(x), this.zip64ExtensibleData[y] = { id: y, length: x, value: l };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var y, x;
        for (y = 0; y < this.files.length; y++) x = this.files[y], this.reader.setIndex(x.localHeaderOffset), this.checkSignature(n.LOCAL_FILE_HEADER), x.readLocalPart(this.reader), x.handleUTF8(), x.processAttributes();
      }, readCentralDir: function() {
        var y;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(n.CENTRAL_FILE_HEADER); ) (y = new u({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(y);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var y = this.reader.lastIndexOfSignature(n.CENTRAL_DIRECTORY_END);
        if (y < 0) throw this.isSignature(0, n.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(y);
        var x = y;
        if (this.checkSignature(n.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === a.MAX_VALUE_16BITS || this.diskWithCentralDirStart === a.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === a.MAX_VALUE_16BITS || this.centralDirRecords === a.MAX_VALUE_16BITS || this.centralDirSize === a.MAX_VALUE_32BITS || this.centralDirOffset === a.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (y = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(y), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, n.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var l = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (l += 20, l += 12 + this.zip64EndOfCentralSize);
        var _ = x - l;
        if (0 < _) this.isSignature(x, n.CENTRAL_FILE_HEADER) || (this.reader.zero = _);
        else if (_ < 0) throw new Error("Corrupted zip: missing " + Math.abs(_) + " bytes.");
      }, prepareReader: function(y) {
        this.reader = e(y);
      }, load: function(y) {
        this.prepareReader(y), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, m.exports = S;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(i, m, h) {
      var e = i("./reader/readerFor"), a = i("./utils"), n = i("./compressedObject"), u = i("./crc32"), w = i("./utf8"), S = i("./compressions"), y = i("./support");
      function x(l, _) {
        this.options = l, this.loadOptions = _;
      }
      x.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(l) {
        var _, o;
        if (l.skip(22), this.fileNameLength = l.readInt(2), o = l.readInt(2), this.fileName = l.readData(this.fileNameLength), l.skip(o), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((_ = function(p) {
          for (var c in S) if (Object.prototype.hasOwnProperty.call(S, c) && S[c].magic === p) return S[c];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + a.transformTo("string", this.fileName) + ")");
        this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, _, l.readData(this.compressedSize));
      }, readCentralPart: function(l) {
        this.versionMadeBy = l.readInt(2), l.skip(2), this.bitFlag = l.readInt(2), this.compressionMethod = l.readString(2), this.date = l.readDate(), this.crc32 = l.readInt(4), this.compressedSize = l.readInt(4), this.uncompressedSize = l.readInt(4);
        var _ = l.readInt(2);
        if (this.extraFieldsLength = l.readInt(2), this.fileCommentLength = l.readInt(2), this.diskNumberStart = l.readInt(2), this.internalFileAttributes = l.readInt(2), this.externalFileAttributes = l.readInt(4), this.localHeaderOffset = l.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        l.skip(_), this.readExtraFields(l), this.parseZIP64ExtraField(l), this.fileComment = l.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var l = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), l == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), l == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var l = e(this.extraFields[1].value);
          this.uncompressedSize === a.MAX_VALUE_32BITS && (this.uncompressedSize = l.readInt(8)), this.compressedSize === a.MAX_VALUE_32BITS && (this.compressedSize = l.readInt(8)), this.localHeaderOffset === a.MAX_VALUE_32BITS && (this.localHeaderOffset = l.readInt(8)), this.diskNumberStart === a.MAX_VALUE_32BITS && (this.diskNumberStart = l.readInt(4));
        }
      }, readExtraFields: function(l) {
        var _, o, p, c = l.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); l.index + 4 < c; ) _ = l.readInt(2), o = l.readInt(2), p = l.readData(o), this.extraFields[_] = { id: _, length: o, value: p };
        l.setIndex(c);
      }, handleUTF8: function() {
        var l = y.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = w.utf8decode(this.fileName), this.fileCommentStr = w.utf8decode(this.fileComment);
        else {
          var _ = this.findExtraFieldUnicodePath();
          if (_ !== null) this.fileNameStr = _;
          else {
            var o = a.transformTo(l, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(o);
          }
          var p = this.findExtraFieldUnicodeComment();
          if (p !== null) this.fileCommentStr = p;
          else {
            var c = a.transformTo(l, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(c);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var l = this.extraFields[28789];
        if (l) {
          var _ = e(l.value);
          return _.readInt(1) !== 1 || u(this.fileName) !== _.readInt(4) ? null : w.utf8decode(_.readData(l.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var l = this.extraFields[25461];
        if (l) {
          var _ = e(l.value);
          return _.readInt(1) !== 1 || u(this.fileComment) !== _.readInt(4) ? null : w.utf8decode(_.readData(l.length - 5));
        }
        return null;
      } }, m.exports = x;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(i, m, h) {
      function e(_, o, p) {
        this.name = _, this.dir = p.dir, this.date = p.date, this.comment = p.comment, this.unixPermissions = p.unixPermissions, this.dosPermissions = p.dosPermissions, this._data = o, this._dataBinary = p.binary, this.options = { compression: p.compression, compressionOptions: p.compressionOptions };
      }
      var a = i("./stream/StreamHelper"), n = i("./stream/DataWorker"), u = i("./utf8"), w = i("./compressedObject"), S = i("./stream/GenericWorker");
      e.prototype = { internalStream: function(_) {
        var o = null, p = "string";
        try {
          if (!_) throw new Error("No output type specified.");
          var c = (p = _.toLowerCase()) === "string" || p === "text";
          p !== "binarystring" && p !== "text" || (p = "string"), o = this._decompressWorker();
          var g = !this._dataBinary;
          g && !c && (o = o.pipe(new u.Utf8EncodeWorker())), !g && c && (o = o.pipe(new u.Utf8DecodeWorker()));
        } catch (k) {
          (o = new S("error")).error(k);
        }
        return new a(o, p, "");
      }, async: function(_, o) {
        return this.internalStream(_).accumulate(o);
      }, nodeStream: function(_, o) {
        return this.internalStream(_ || "nodebuffer").toNodejsStream(o);
      }, _compressWorker: function(_, o) {
        if (this._data instanceof w && this._data.compression.magic === _.magic) return this._data.getCompressedWorker();
        var p = this._decompressWorker();
        return this._dataBinary || (p = p.pipe(new u.Utf8EncodeWorker())), w.createWorkerFrom(p, _, o);
      }, _decompressWorker: function() {
        return this._data instanceof w ? this._data.getContentWorker() : this._data instanceof S ? this._data : new n(this._data);
      } };
      for (var y = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], x = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, l = 0; l < y.length; l++) e.prototype[y[l]] = x;
      m.exports = e;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(i, m, h) {
      (function(e) {
        var a, n, u = e.MutationObserver || e.WebKitMutationObserver;
        if (u) {
          var w = 0, S = new u(_), y = e.document.createTextNode("");
          S.observe(y, { characterData: !0 }), a = function() {
            y.data = w = ++w % 2;
          };
        } else if (e.setImmediate || e.MessageChannel === void 0) a = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
          var o = e.document.createElement("script");
          o.onreadystatechange = function() {
            _(), o.onreadystatechange = null, o.parentNode.removeChild(o), o = null;
          }, e.document.documentElement.appendChild(o);
        } : function() {
          setTimeout(_, 0);
        };
        else {
          var x = new e.MessageChannel();
          x.port1.onmessage = _, a = function() {
            x.port2.postMessage(0);
          };
        }
        var l = [];
        function _() {
          var o, p;
          n = !0;
          for (var c = l.length; c; ) {
            for (p = l, l = [], o = -1; ++o < c; ) p[o]();
            c = l.length;
          }
          n = !1;
        }
        m.exports = function(o) {
          l.push(o) !== 1 || n || a();
        };
      }).call(this, typeof Gt < "u" ? Gt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(i, m, h) {
      var e = i("immediate");
      function a() {
      }
      var n = {}, u = ["REJECTED"], w = ["FULFILLED"], S = ["PENDING"];
      function y(c) {
        if (typeof c != "function") throw new TypeError("resolver must be a function");
        this.state = S, this.queue = [], this.outcome = void 0, c !== a && o(this, c);
      }
      function x(c, g, k) {
        this.promise = c, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof k == "function" && (this.onRejected = k, this.callRejected = this.otherCallRejected);
      }
      function l(c, g, k) {
        e(function() {
          var R;
          try {
            R = g(k);
          } catch (C) {
            return n.reject(c, C);
          }
          R === c ? n.reject(c, new TypeError("Cannot resolve promise with itself")) : n.resolve(c, R);
        });
      }
      function _(c) {
        var g = c && c.then;
        if (c && (typeof c == "object" || typeof c == "function") && typeof g == "function") return function() {
          g.apply(c, arguments);
        };
      }
      function o(c, g) {
        var k = !1;
        function R(F) {
          k || (k = !0, n.reject(c, F));
        }
        function C(F) {
          k || (k = !0, n.resolve(c, F));
        }
        var L = p(function() {
          g(C, R);
        });
        L.status === "error" && R(L.value);
      }
      function p(c, g) {
        var k = {};
        try {
          k.value = c(g), k.status = "success";
        } catch (R) {
          k.status = "error", k.value = R;
        }
        return k;
      }
      (m.exports = y).prototype.finally = function(c) {
        if (typeof c != "function") return this;
        var g = this.constructor;
        return this.then(function(k) {
          return g.resolve(c()).then(function() {
            return k;
          });
        }, function(k) {
          return g.resolve(c()).then(function() {
            throw k;
          });
        });
      }, y.prototype.catch = function(c) {
        return this.then(null, c);
      }, y.prototype.then = function(c, g) {
        if (typeof c != "function" && this.state === w || typeof g != "function" && this.state === u) return this;
        var k = new this.constructor(a);
        return this.state !== S ? l(k, this.state === w ? c : g, this.outcome) : this.queue.push(new x(k, c, g)), k;
      }, x.prototype.callFulfilled = function(c) {
        n.resolve(this.promise, c);
      }, x.prototype.otherCallFulfilled = function(c) {
        l(this.promise, this.onFulfilled, c);
      }, x.prototype.callRejected = function(c) {
        n.reject(this.promise, c);
      }, x.prototype.otherCallRejected = function(c) {
        l(this.promise, this.onRejected, c);
      }, n.resolve = function(c, g) {
        var k = p(_, g);
        if (k.status === "error") return n.reject(c, k.value);
        var R = k.value;
        if (R) o(c, R);
        else {
          c.state = w, c.outcome = g;
          for (var C = -1, L = c.queue.length; ++C < L; ) c.queue[C].callFulfilled(g);
        }
        return c;
      }, n.reject = function(c, g) {
        c.state = u, c.outcome = g;
        for (var k = -1, R = c.queue.length; ++k < R; ) c.queue[k].callRejected(g);
        return c;
      }, y.resolve = function(c) {
        return c instanceof this ? c : n.resolve(new this(a), c);
      }, y.reject = function(c) {
        var g = new this(a);
        return n.reject(g, c);
      }, y.all = function(c) {
        var g = this;
        if (Object.prototype.toString.call(c) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = c.length, R = !1;
        if (!k) return this.resolve([]);
        for (var C = new Array(k), L = 0, F = -1, j = new this(a); ++F < k; ) P(c[F], F);
        return j;
        function P(Z, J) {
          g.resolve(Z).then(function(b) {
            C[J] = b, ++L !== k || R || (R = !0, n.resolve(j, C));
          }, function(b) {
            R || (R = !0, n.reject(j, b));
          });
        }
      }, y.race = function(c) {
        var g = this;
        if (Object.prototype.toString.call(c) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = c.length, R = !1;
        if (!k) return this.resolve([]);
        for (var C = -1, L = new this(a); ++C < k; ) F = c[C], g.resolve(F).then(function(j) {
          R || (R = !0, n.resolve(L, j));
        }, function(j) {
          R || (R = !0, n.reject(L, j));
        });
        var F;
        return L;
      };
    }, { immediate: 36 }], 38: [function(i, m, h) {
      var e = {};
      (0, i("./lib/utils/common").assign)(e, i("./lib/deflate"), i("./lib/inflate"), i("./lib/zlib/constants")), m.exports = e;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(i, m, h) {
      var e = i("./zlib/deflate"), a = i("./utils/common"), n = i("./utils/strings"), u = i("./zlib/messages"), w = i("./zlib/zstream"), S = Object.prototype.toString, y = 0, x = -1, l = 0, _ = 8;
      function o(c) {
        if (!(this instanceof o)) return new o(c);
        this.options = a.assign({ level: x, method: _, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: l, to: "" }, c || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new w(), this.strm.avail_out = 0;
        var k = e.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (k !== y) throw new Error(u[k]);
        if (g.header && e.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var R;
          if (R = typeof g.dictionary == "string" ? n.string2buf(g.dictionary) : S.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (k = e.deflateSetDictionary(this.strm, R)) !== y) throw new Error(u[k]);
          this._dict_set = !0;
        }
      }
      function p(c, g) {
        var k = new o(g);
        if (k.push(c, !0), k.err) throw k.msg || u[k.err];
        return k.result;
      }
      o.prototype.push = function(c, g) {
        var k, R, C = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        R = g === ~~g ? g : g === !0 ? 4 : 0, typeof c == "string" ? C.input = n.string2buf(c) : S.call(c) === "[object ArrayBuffer]" ? C.input = new Uint8Array(c) : C.input = c, C.next_in = 0, C.avail_in = C.input.length;
        do {
          if (C.avail_out === 0 && (C.output = new a.Buf8(L), C.next_out = 0, C.avail_out = L), (k = e.deflate(C, R)) !== 1 && k !== y) return this.onEnd(k), !(this.ended = !0);
          C.avail_out !== 0 && (C.avail_in !== 0 || R !== 4 && R !== 2) || (this.options.to === "string" ? this.onData(n.buf2binstring(a.shrinkBuf(C.output, C.next_out))) : this.onData(a.shrinkBuf(C.output, C.next_out)));
        } while ((0 < C.avail_in || C.avail_out === 0) && k !== 1);
        return R === 4 ? (k = e.deflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === y) : R !== 2 || (this.onEnd(y), !(C.avail_out = 0));
      }, o.prototype.onData = function(c) {
        this.chunks.push(c);
      }, o.prototype.onEnd = function(c) {
        c === y && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = c, this.msg = this.strm.msg;
      }, h.Deflate = o, h.deflate = p, h.deflateRaw = function(c, g) {
        return (g = g || {}).raw = !0, p(c, g);
      }, h.gzip = function(c, g) {
        return (g = g || {}).gzip = !0, p(c, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(i, m, h) {
      var e = i("./zlib/inflate"), a = i("./utils/common"), n = i("./utils/strings"), u = i("./zlib/constants"), w = i("./zlib/messages"), S = i("./zlib/zstream"), y = i("./zlib/gzheader"), x = Object.prototype.toString;
      function l(o) {
        if (!(this instanceof l)) return new l(o);
        this.options = a.assign({ chunkSize: 16384, windowBits: 0, to: "" }, o || {});
        var p = this.options;
        p.raw && 0 <= p.windowBits && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), !(0 <= p.windowBits && p.windowBits < 16) || o && o.windowBits || (p.windowBits += 32), 15 < p.windowBits && p.windowBits < 48 && !(15 & p.windowBits) && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
        var c = e.inflateInit2(this.strm, p.windowBits);
        if (c !== u.Z_OK) throw new Error(w[c]);
        this.header = new y(), e.inflateGetHeader(this.strm, this.header);
      }
      function _(o, p) {
        var c = new l(p);
        if (c.push(o, !0), c.err) throw c.msg || w[c.err];
        return c.result;
      }
      l.prototype.push = function(o, p) {
        var c, g, k, R, C, L, F = this.strm, j = this.options.chunkSize, P = this.options.dictionary, Z = !1;
        if (this.ended) return !1;
        g = p === ~~p ? p : p === !0 ? u.Z_FINISH : u.Z_NO_FLUSH, typeof o == "string" ? F.input = n.binstring2buf(o) : x.call(o) === "[object ArrayBuffer]" ? F.input = new Uint8Array(o) : F.input = o, F.next_in = 0, F.avail_in = F.input.length;
        do {
          if (F.avail_out === 0 && (F.output = new a.Buf8(j), F.next_out = 0, F.avail_out = j), (c = e.inflate(F, u.Z_NO_FLUSH)) === u.Z_NEED_DICT && P && (L = typeof P == "string" ? n.string2buf(P) : x.call(P) === "[object ArrayBuffer]" ? new Uint8Array(P) : P, c = e.inflateSetDictionary(this.strm, L)), c === u.Z_BUF_ERROR && Z === !0 && (c = u.Z_OK, Z = !1), c !== u.Z_STREAM_END && c !== u.Z_OK) return this.onEnd(c), !(this.ended = !0);
          F.next_out && (F.avail_out !== 0 && c !== u.Z_STREAM_END && (F.avail_in !== 0 || g !== u.Z_FINISH && g !== u.Z_SYNC_FLUSH) || (this.options.to === "string" ? (k = n.utf8border(F.output, F.next_out), R = F.next_out - k, C = n.buf2string(F.output, k), F.next_out = R, F.avail_out = j - R, R && a.arraySet(F.output, F.output, k, R, 0), this.onData(C)) : this.onData(a.shrinkBuf(F.output, F.next_out)))), F.avail_in === 0 && F.avail_out === 0 && (Z = !0);
        } while ((0 < F.avail_in || F.avail_out === 0) && c !== u.Z_STREAM_END);
        return c === u.Z_STREAM_END && (g = u.Z_FINISH), g === u.Z_FINISH ? (c = e.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === u.Z_OK) : g !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK), !(F.avail_out = 0));
      }, l.prototype.onData = function(o) {
        this.chunks.push(o);
      }, l.prototype.onEnd = function(o) {
        o === u.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, h.Inflate = l, h.inflate = _, h.inflateRaw = function(o, p) {
        return (p = p || {}).raw = !0, _(o, p);
      }, h.ungzip = _;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(i, m, h) {
      var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      h.assign = function(u) {
        for (var w = Array.prototype.slice.call(arguments, 1); w.length; ) {
          var S = w.shift();
          if (S) {
            if (typeof S != "object") throw new TypeError(S + "must be non-object");
            for (var y in S) S.hasOwnProperty(y) && (u[y] = S[y]);
          }
        }
        return u;
      }, h.shrinkBuf = function(u, w) {
        return u.length === w ? u : u.subarray ? u.subarray(0, w) : (u.length = w, u);
      };
      var a = { arraySet: function(u, w, S, y, x) {
        if (w.subarray && u.subarray) u.set(w.subarray(S, S + y), x);
        else for (var l = 0; l < y; l++) u[x + l] = w[S + l];
      }, flattenChunks: function(u) {
        var w, S, y, x, l, _;
        for (w = y = 0, S = u.length; w < S; w++) y += u[w].length;
        for (_ = new Uint8Array(y), w = x = 0, S = u.length; w < S; w++) l = u[w], _.set(l, x), x += l.length;
        return _;
      } }, n = { arraySet: function(u, w, S, y, x) {
        for (var l = 0; l < y; l++) u[x + l] = w[S + l];
      }, flattenChunks: function(u) {
        return [].concat.apply([], u);
      } };
      h.setTyped = function(u) {
        u ? (h.Buf8 = Uint8Array, h.Buf16 = Uint16Array, h.Buf32 = Int32Array, h.assign(h, a)) : (h.Buf8 = Array, h.Buf16 = Array, h.Buf32 = Array, h.assign(h, n));
      }, h.setTyped(e);
    }, {}], 42: [function(i, m, h) {
      var e = i("./common"), a = !0, n = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        a = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        n = !1;
      }
      for (var u = new e.Buf8(256), w = 0; w < 256; w++) u[w] = 252 <= w ? 6 : 248 <= w ? 5 : 240 <= w ? 4 : 224 <= w ? 3 : 192 <= w ? 2 : 1;
      function S(y, x) {
        if (x < 65537 && (y.subarray && n || !y.subarray && a)) return String.fromCharCode.apply(null, e.shrinkBuf(y, x));
        for (var l = "", _ = 0; _ < x; _++) l += String.fromCharCode(y[_]);
        return l;
      }
      u[254] = u[254] = 1, h.string2buf = function(y) {
        var x, l, _, o, p, c = y.length, g = 0;
        for (o = 0; o < c; o++) (64512 & (l = y.charCodeAt(o))) == 55296 && o + 1 < c && (64512 & (_ = y.charCodeAt(o + 1))) == 56320 && (l = 65536 + (l - 55296 << 10) + (_ - 56320), o++), g += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
        for (x = new e.Buf8(g), o = p = 0; p < g; o++) (64512 & (l = y.charCodeAt(o))) == 55296 && o + 1 < c && (64512 & (_ = y.charCodeAt(o + 1))) == 56320 && (l = 65536 + (l - 55296 << 10) + (_ - 56320), o++), l < 128 ? x[p++] = l : (l < 2048 ? x[p++] = 192 | l >>> 6 : (l < 65536 ? x[p++] = 224 | l >>> 12 : (x[p++] = 240 | l >>> 18, x[p++] = 128 | l >>> 12 & 63), x[p++] = 128 | l >>> 6 & 63), x[p++] = 128 | 63 & l);
        return x;
      }, h.buf2binstring = function(y) {
        return S(y, y.length);
      }, h.binstring2buf = function(y) {
        for (var x = new e.Buf8(y.length), l = 0, _ = x.length; l < _; l++) x[l] = y.charCodeAt(l);
        return x;
      }, h.buf2string = function(y, x) {
        var l, _, o, p, c = x || y.length, g = new Array(2 * c);
        for (l = _ = 0; l < c; ) if ((o = y[l++]) < 128) g[_++] = o;
        else if (4 < (p = u[o])) g[_++] = 65533, l += p - 1;
        else {
          for (o &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < c; ) o = o << 6 | 63 & y[l++], p--;
          1 < p ? g[_++] = 65533 : o < 65536 ? g[_++] = o : (o -= 65536, g[_++] = 55296 | o >> 10 & 1023, g[_++] = 56320 | 1023 & o);
        }
        return S(g, _);
      }, h.utf8border = function(y, x) {
        var l;
        for ((x = x || y.length) > y.length && (x = y.length), l = x - 1; 0 <= l && (192 & y[l]) == 128; ) l--;
        return l < 0 || l === 0 ? x : l + u[y[l]] > x ? l : x;
      };
    }, { "./common": 41 }], 43: [function(i, m, h) {
      m.exports = function(e, a, n, u) {
        for (var w = 65535 & e | 0, S = e >>> 16 & 65535 | 0, y = 0; n !== 0; ) {
          for (n -= y = 2e3 < n ? 2e3 : n; S = S + (w = w + a[u++] | 0) | 0, --y; ) ;
          w %= 65521, S %= 65521;
        }
        return w | S << 16 | 0;
      };
    }, {}], 44: [function(i, m, h) {
      m.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(i, m, h) {
      var e = function() {
        for (var a, n = [], u = 0; u < 256; u++) {
          a = u;
          for (var w = 0; w < 8; w++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
          n[u] = a;
        }
        return n;
      }();
      m.exports = function(a, n, u, w) {
        var S = e, y = w + u;
        a ^= -1;
        for (var x = w; x < y; x++) a = a >>> 8 ^ S[255 & (a ^ n[x])];
        return -1 ^ a;
      };
    }, {}], 46: [function(i, m, h) {
      var e, a = i("../utils/common"), n = i("./trees"), u = i("./adler32"), w = i("./crc32"), S = i("./messages"), y = 0, x = 4, l = 0, _ = -2, o = -1, p = 4, c = 2, g = 8, k = 9, R = 286, C = 30, L = 19, F = 2 * R + 1, j = 15, P = 3, Z = 258, J = Z + P + 1, b = 42, z = 113, r = 1, N = 2, et = 3, $ = 4;
      function it(t, U) {
        return t.msg = S[U], U;
      }
      function H(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function tt(t) {
        for (var U = t.length; 0 <= --U; ) t[U] = 0;
      }
      function B(t) {
        var U = t.state, D = U.pending;
        D > t.avail_out && (D = t.avail_out), D !== 0 && (a.arraySet(t.output, U.pending_buf, U.pending_out, D, t.next_out), t.next_out += D, U.pending_out += D, t.total_out += D, t.avail_out -= D, U.pending -= D, U.pending === 0 && (U.pending_out = 0));
      }
      function O(t, U) {
        n._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, U), t.block_start = t.strstart, B(t.strm);
      }
      function Q(t, U) {
        t.pending_buf[t.pending++] = U;
      }
      function Y(t, U) {
        t.pending_buf[t.pending++] = U >>> 8 & 255, t.pending_buf[t.pending++] = 255 & U;
      }
      function G(t, U) {
        var D, v, f = t.max_chain_length, E = t.strstart, M = t.prev_length, W = t.nice_match, A = t.strstart > t.w_size - J ? t.strstart - (t.w_size - J) : 0, V = t.window, X = t.w_mask, I = t.prev, T = t.strstart + Z, K = V[E + M - 1], q = V[E + M];
        t.prev_length >= t.good_match && (f >>= 2), W > t.lookahead && (W = t.lookahead);
        do
          if (V[(D = U) + M] === q && V[D + M - 1] === K && V[D] === V[E] && V[++D] === V[E + 1]) {
            E += 2, D++;
            do
              ;
            while (V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && V[++E] === V[++D] && E < T);
            if (v = Z - (T - E), E = T - Z, M < v) {
              if (t.match_start = U, W <= (M = v)) break;
              K = V[E + M - 1], q = V[E + M];
            }
          }
        while ((U = I[U & X]) > A && --f != 0);
        return M <= t.lookahead ? M : t.lookahead;
      }
      function ut(t) {
        var U, D, v, f, E, M, W, A, V, X, I = t.w_size;
        do {
          if (f = t.window_size - t.lookahead - t.strstart, t.strstart >= I + (I - J)) {
            for (a.arraySet(t.window, t.window, I, I, 0), t.match_start -= I, t.strstart -= I, t.block_start -= I, U = D = t.hash_size; v = t.head[--U], t.head[U] = I <= v ? v - I : 0, --D; ) ;
            for (U = D = I; v = t.prev[--U], t.prev[U] = I <= v ? v - I : 0, --D; ) ;
            f += I;
          }
          if (t.strm.avail_in === 0) break;
          if (M = t.strm, W = t.window, A = t.strstart + t.lookahead, V = f, X = void 0, X = M.avail_in, V < X && (X = V), D = X === 0 ? 0 : (M.avail_in -= X, a.arraySet(W, M.input, M.next_in, X, A), M.state.wrap === 1 ? M.adler = u(M.adler, W, X, A) : M.state.wrap === 2 && (M.adler = w(M.adler, W, X, A)), M.next_in += X, M.total_in += X, X), t.lookahead += D, t.lookahead + t.insert >= P) for (E = t.strstart - t.insert, t.ins_h = t.window[E], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[E + P - 1]) & t.hash_mask, t.prev[E & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = E, E++, t.insert--, !(t.lookahead + t.insert < P)); ) ;
        } while (t.lookahead < J && t.strm.avail_in !== 0);
      }
      function pt(t, U) {
        for (var D, v; ; ) {
          if (t.lookahead < J) {
            if (ut(t), t.lookahead < J && U === y) return r;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= P && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), D !== 0 && t.strstart - D <= t.w_size - J && (t.match_length = G(t, D)), t.match_length >= P) if (v = n._tr_tally(t, t.strstart - t.match_start, t.match_length - P), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= P) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = n._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (O(t, !1), t.strm.avail_out === 0)) return r;
        }
        return t.insert = t.strstart < P - 1 ? t.strstart : P - 1, U === x ? (O(t, !0), t.strm.avail_out === 0 ? et : $) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? r : N;
      }
      function at(t, U) {
        for (var D, v, f; ; ) {
          if (t.lookahead < J) {
            if (ut(t), t.lookahead < J && U === y) return r;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= P && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = P - 1, D !== 0 && t.prev_length < t.max_lazy_match && t.strstart - D <= t.w_size - J && (t.match_length = G(t, D), t.match_length <= 5 && (t.strategy === 1 || t.match_length === P && 4096 < t.strstart - t.match_start) && (t.match_length = P - 1)), t.prev_length >= P && t.match_length <= t.prev_length) {
            for (f = t.strstart + t.lookahead - P, v = n._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - P), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= f && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = P - 1, t.strstart++, v && (O(t, !1), t.strm.avail_out === 0)) return r;
          } else if (t.match_available) {
            if ((v = n._tr_tally(t, 0, t.window[t.strstart - 1])) && O(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return r;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = n._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < P - 1 ? t.strstart : P - 1, U === x ? (O(t, !0), t.strm.avail_out === 0 ? et : $) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? r : N;
      }
      function lt(t, U, D, v, f) {
        this.good_length = t, this.max_lazy = U, this.nice_length = D, this.max_chain = v, this.func = f;
      }
      function dt() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new a.Buf16(2 * F), this.dyn_dtree = new a.Buf16(2 * (2 * C + 1)), this.bl_tree = new a.Buf16(2 * (2 * L + 1)), tt(this.dyn_ltree), tt(this.dyn_dtree), tt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new a.Buf16(j + 1), this.heap = new a.Buf16(2 * R + 1), tt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new a.Buf16(2 * R + 1), tt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ct(t) {
        var U;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = c, (U = t.state).pending = 0, U.pending_out = 0, U.wrap < 0 && (U.wrap = -U.wrap), U.status = U.wrap ? b : z, t.adler = U.wrap === 2 ? 0 : 1, U.last_flush = y, n._tr_init(U), l) : it(t, _);
      }
      function Et(t) {
        var U = ct(t);
        return U === l && function(D) {
          D.window_size = 2 * D.w_size, tt(D.head), D.max_lazy_match = e[D.level].max_lazy, D.good_match = e[D.level].good_length, D.nice_match = e[D.level].nice_length, D.max_chain_length = e[D.level].max_chain, D.strstart = 0, D.block_start = 0, D.lookahead = 0, D.insert = 0, D.match_length = D.prev_length = P - 1, D.match_available = 0, D.ins_h = 0;
        }(t.state), U;
      }
      function xt(t, U, D, v, f, E) {
        if (!t) return _;
        var M = 1;
        if (U === o && (U = 6), v < 0 ? (M = 0, v = -v) : 15 < v && (M = 2, v -= 16), f < 1 || k < f || D !== g || v < 8 || 15 < v || U < 0 || 9 < U || E < 0 || p < E) return it(t, _);
        v === 8 && (v = 9);
        var W = new dt();
        return (t.state = W).strm = t, W.wrap = M, W.gzhead = null, W.w_bits = v, W.w_size = 1 << W.w_bits, W.w_mask = W.w_size - 1, W.hash_bits = f + 7, W.hash_size = 1 << W.hash_bits, W.hash_mask = W.hash_size - 1, W.hash_shift = ~~((W.hash_bits + P - 1) / P), W.window = new a.Buf8(2 * W.w_size), W.head = new a.Buf16(W.hash_size), W.prev = new a.Buf16(W.w_size), W.lit_bufsize = 1 << f + 6, W.pending_buf_size = 4 * W.lit_bufsize, W.pending_buf = new a.Buf8(W.pending_buf_size), W.d_buf = 1 * W.lit_bufsize, W.l_buf = 3 * W.lit_bufsize, W.level = U, W.strategy = E, W.method = D, Et(t);
      }
      e = [new lt(0, 0, 0, 0, function(t, U) {
        var D = 65535;
        for (D > t.pending_buf_size - 5 && (D = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (ut(t), t.lookahead === 0 && U === y) return r;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + D;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, O(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - J && (O(t, !1), t.strm.avail_out === 0)) return r;
        }
        return t.insert = 0, U === x ? (O(t, !0), t.strm.avail_out === 0 ? et : $) : (t.strstart > t.block_start && (O(t, !1), t.strm.avail_out), r);
      }), new lt(4, 4, 8, 4, pt), new lt(4, 5, 16, 8, pt), new lt(4, 6, 32, 32, pt), new lt(4, 4, 16, 16, at), new lt(8, 16, 32, 32, at), new lt(8, 16, 128, 128, at), new lt(8, 32, 128, 256, at), new lt(32, 128, 258, 1024, at), new lt(32, 258, 258, 4096, at)], h.deflateInit = function(t, U) {
        return xt(t, U, g, 15, 8, 0);
      }, h.deflateInit2 = xt, h.deflateReset = Et, h.deflateResetKeep = ct, h.deflateSetHeader = function(t, U) {
        return t && t.state ? t.state.wrap !== 2 ? _ : (t.state.gzhead = U, l) : _;
      }, h.deflate = function(t, U) {
        var D, v, f, E;
        if (!t || !t.state || 5 < U || U < 0) return t ? it(t, _) : _;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && U !== x) return it(t, t.avail_out === 0 ? -5 : _);
        if (v.strm = t, D = v.last_flush, v.last_flush = U, v.status === b) if (v.wrap === 2) t.adler = 0, Q(v, 31), Q(v, 139), Q(v, 8), v.gzhead ? (Q(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), Q(v, 255 & v.gzhead.time), Q(v, v.gzhead.time >> 8 & 255), Q(v, v.gzhead.time >> 16 & 255), Q(v, v.gzhead.time >> 24 & 255), Q(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), Q(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (Q(v, 255 & v.gzhead.extra.length), Q(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = w(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (Q(v, 0), Q(v, 0), Q(v, 0), Q(v, 0), Q(v, 0), Q(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), Q(v, 3), v.status = z);
        else {
          var M = g + (v.w_bits - 8 << 4) << 8;
          M |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && (M |= 32), M += 31 - M % 31, v.status = z, Y(v, M), v.strstart !== 0 && (Y(v, t.adler >>> 16), Y(v, 65535 & t.adler)), t.adler = 1;
        }
        if (v.status === 69) if (v.gzhead.extra) {
          for (f = v.pending; v.gzindex < (65535 & v.gzhead.extra.length) && (v.pending !== v.pending_buf_size || (v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), B(t), f = v.pending, v.pending !== v.pending_buf_size)); ) Q(v, 255 & v.gzhead.extra[v.gzindex]), v.gzindex++;
          v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), v.gzindex === v.gzhead.extra.length && (v.gzindex = 0, v.status = 73);
        } else v.status = 73;
        if (v.status === 73) if (v.gzhead.name) {
          f = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), B(t), f = v.pending, v.pending === v.pending_buf_size)) {
              E = 1;
              break;
            }
            E = v.gzindex < v.gzhead.name.length ? 255 & v.gzhead.name.charCodeAt(v.gzindex++) : 0, Q(v, E);
          } while (E !== 0);
          v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), E === 0 && (v.gzindex = 0, v.status = 91);
        } else v.status = 91;
        if (v.status === 91) if (v.gzhead.comment) {
          f = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), B(t), f = v.pending, v.pending === v.pending_buf_size)) {
              E = 1;
              break;
            }
            E = v.gzindex < v.gzhead.comment.length ? 255 & v.gzhead.comment.charCodeAt(v.gzindex++) : 0, Q(v, E);
          } while (E !== 0);
          v.gzhead.hcrc && v.pending > f && (t.adler = w(t.adler, v.pending_buf, v.pending - f, f)), E === 0 && (v.status = 103);
        } else v.status = 103;
        if (v.status === 103 && (v.gzhead.hcrc ? (v.pending + 2 > v.pending_buf_size && B(t), v.pending + 2 <= v.pending_buf_size && (Q(v, 255 & t.adler), Q(v, t.adler >> 8 & 255), t.adler = 0, v.status = z)) : v.status = z), v.pending !== 0) {
          if (B(t), t.avail_out === 0) return v.last_flush = -1, l;
        } else if (t.avail_in === 0 && H(U) <= H(D) && U !== x) return it(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return it(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || U !== y && v.status !== 666) {
          var W = v.strategy === 2 ? function(A, V) {
            for (var X; ; ) {
              if (A.lookahead === 0 && (ut(A), A.lookahead === 0)) {
                if (V === y) return r;
                break;
              }
              if (A.match_length = 0, X = n._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++, X && (O(A, !1), A.strm.avail_out === 0)) return r;
            }
            return A.insert = 0, V === x ? (O(A, !0), A.strm.avail_out === 0 ? et : $) : A.last_lit && (O(A, !1), A.strm.avail_out === 0) ? r : N;
          }(v, U) : v.strategy === 3 ? function(A, V) {
            for (var X, I, T, K, q = A.window; ; ) {
              if (A.lookahead <= Z) {
                if (ut(A), A.lookahead <= Z && V === y) return r;
                if (A.lookahead === 0) break;
              }
              if (A.match_length = 0, A.lookahead >= P && 0 < A.strstart && (I = q[T = A.strstart - 1]) === q[++T] && I === q[++T] && I === q[++T]) {
                K = A.strstart + Z;
                do
                  ;
                while (I === q[++T] && I === q[++T] && I === q[++T] && I === q[++T] && I === q[++T] && I === q[++T] && I === q[++T] && I === q[++T] && T < K);
                A.match_length = Z - (K - T), A.match_length > A.lookahead && (A.match_length = A.lookahead);
              }
              if (A.match_length >= P ? (X = n._tr_tally(A, 1, A.match_length - P), A.lookahead -= A.match_length, A.strstart += A.match_length, A.match_length = 0) : (X = n._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++), X && (O(A, !1), A.strm.avail_out === 0)) return r;
            }
            return A.insert = 0, V === x ? (O(A, !0), A.strm.avail_out === 0 ? et : $) : A.last_lit && (O(A, !1), A.strm.avail_out === 0) ? r : N;
          }(v, U) : e[v.level].func(v, U);
          if (W !== et && W !== $ || (v.status = 666), W === r || W === et) return t.avail_out === 0 && (v.last_flush = -1), l;
          if (W === N && (U === 1 ? n._tr_align(v) : U !== 5 && (n._tr_stored_block(v, 0, 0, !1), U === 3 && (tt(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), B(t), t.avail_out === 0)) return v.last_flush = -1, l;
        }
        return U !== x ? l : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (Q(v, 255 & t.adler), Q(v, t.adler >> 8 & 255), Q(v, t.adler >> 16 & 255), Q(v, t.adler >> 24 & 255), Q(v, 255 & t.total_in), Q(v, t.total_in >> 8 & 255), Q(v, t.total_in >> 16 & 255), Q(v, t.total_in >> 24 & 255)) : (Y(v, t.adler >>> 16), Y(v, 65535 & t.adler)), B(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? l : 1);
      }, h.deflateEnd = function(t) {
        var U;
        return t && t.state ? (U = t.state.status) !== b && U !== 69 && U !== 73 && U !== 91 && U !== 103 && U !== z && U !== 666 ? it(t, _) : (t.state = null, U === z ? it(t, -3) : l) : _;
      }, h.deflateSetDictionary = function(t, U) {
        var D, v, f, E, M, W, A, V, X = U.length;
        if (!t || !t.state || (E = (D = t.state).wrap) === 2 || E === 1 && D.status !== b || D.lookahead) return _;
        for (E === 1 && (t.adler = u(t.adler, U, X, 0)), D.wrap = 0, X >= D.w_size && (E === 0 && (tt(D.head), D.strstart = 0, D.block_start = 0, D.insert = 0), V = new a.Buf8(D.w_size), a.arraySet(V, U, X - D.w_size, D.w_size, 0), U = V, X = D.w_size), M = t.avail_in, W = t.next_in, A = t.input, t.avail_in = X, t.next_in = 0, t.input = U, ut(D); D.lookahead >= P; ) {
          for (v = D.strstart, f = D.lookahead - (P - 1); D.ins_h = (D.ins_h << D.hash_shift ^ D.window[v + P - 1]) & D.hash_mask, D.prev[v & D.w_mask] = D.head[D.ins_h], D.head[D.ins_h] = v, v++, --f; ) ;
          D.strstart = v, D.lookahead = P - 1, ut(D);
        }
        return D.strstart += D.lookahead, D.block_start = D.strstart, D.insert = D.lookahead, D.lookahead = 0, D.match_length = D.prev_length = P - 1, D.match_available = 0, t.next_in = W, t.input = A, t.avail_in = M, D.wrap = E, l;
      }, h.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(i, m, h) {
      m.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(i, m, h) {
      m.exports = function(e, a) {
        var n, u, w, S, y, x, l, _, o, p, c, g, k, R, C, L, F, j, P, Z, J, b, z, r, N;
        n = e.state, u = e.next_in, r = e.input, w = u + (e.avail_in - 5), S = e.next_out, N = e.output, y = S - (a - e.avail_out), x = S + (e.avail_out - 257), l = n.dmax, _ = n.wsize, o = n.whave, p = n.wnext, c = n.window, g = n.hold, k = n.bits, R = n.lencode, C = n.distcode, L = (1 << n.lenbits) - 1, F = (1 << n.distbits) - 1;
        t: do {
          k < 15 && (g += r[u++] << k, k += 8, g += r[u++] << k, k += 8), j = R[g & L];
          e: for (; ; ) {
            if (g >>>= P = j >>> 24, k -= P, (P = j >>> 16 & 255) === 0) N[S++] = 65535 & j;
            else {
              if (!(16 & P)) {
                if (!(64 & P)) {
                  j = R[(65535 & j) + (g & (1 << P) - 1)];
                  continue e;
                }
                if (32 & P) {
                  n.mode = 12;
                  break t;
                }
                e.msg = "invalid literal/length code", n.mode = 30;
                break t;
              }
              Z = 65535 & j, (P &= 15) && (k < P && (g += r[u++] << k, k += 8), Z += g & (1 << P) - 1, g >>>= P, k -= P), k < 15 && (g += r[u++] << k, k += 8, g += r[u++] << k, k += 8), j = C[g & F];
              r: for (; ; ) {
                if (g >>>= P = j >>> 24, k -= P, !(16 & (P = j >>> 16 & 255))) {
                  if (!(64 & P)) {
                    j = C[(65535 & j) + (g & (1 << P) - 1)];
                    continue r;
                  }
                  e.msg = "invalid distance code", n.mode = 30;
                  break t;
                }
                if (J = 65535 & j, k < (P &= 15) && (g += r[u++] << k, (k += 8) < P && (g += r[u++] << k, k += 8)), l < (J += g & (1 << P) - 1)) {
                  e.msg = "invalid distance too far back", n.mode = 30;
                  break t;
                }
                if (g >>>= P, k -= P, (P = S - y) < J) {
                  if (o < (P = J - P) && n.sane) {
                    e.msg = "invalid distance too far back", n.mode = 30;
                    break t;
                  }
                  if (z = c, (b = 0) === p) {
                    if (b += _ - P, P < Z) {
                      for (Z -= P; N[S++] = c[b++], --P; ) ;
                      b = S - J, z = N;
                    }
                  } else if (p < P) {
                    if (b += _ + p - P, (P -= p) < Z) {
                      for (Z -= P; N[S++] = c[b++], --P; ) ;
                      if (b = 0, p < Z) {
                        for (Z -= P = p; N[S++] = c[b++], --P; ) ;
                        b = S - J, z = N;
                      }
                    }
                  } else if (b += p - P, P < Z) {
                    for (Z -= P; N[S++] = c[b++], --P; ) ;
                    b = S - J, z = N;
                  }
                  for (; 2 < Z; ) N[S++] = z[b++], N[S++] = z[b++], N[S++] = z[b++], Z -= 3;
                  Z && (N[S++] = z[b++], 1 < Z && (N[S++] = z[b++]));
                } else {
                  for (b = S - J; N[S++] = N[b++], N[S++] = N[b++], N[S++] = N[b++], 2 < (Z -= 3); ) ;
                  Z && (N[S++] = N[b++], 1 < Z && (N[S++] = N[b++]));
                }
                break;
              }
            }
            break;
          }
        } while (u < w && S < x);
        u -= Z = k >> 3, g &= (1 << (k -= Z << 3)) - 1, e.next_in = u, e.next_out = S, e.avail_in = u < w ? w - u + 5 : 5 - (u - w), e.avail_out = S < x ? x - S + 257 : 257 - (S - x), n.hold = g, n.bits = k;
      };
    }, {}], 49: [function(i, m, h) {
      var e = i("../utils/common"), a = i("./adler32"), n = i("./crc32"), u = i("./inffast"), w = i("./inftrees"), S = 1, y = 2, x = 0, l = -2, _ = 1, o = 852, p = 592;
      function c(b) {
        return (b >>> 24 & 255) + (b >>> 8 & 65280) + ((65280 & b) << 8) + ((255 & b) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new e.Buf16(320), this.work = new e.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function k(b) {
        var z;
        return b && b.state ? (z = b.state, b.total_in = b.total_out = z.total = 0, b.msg = "", z.wrap && (b.adler = 1 & z.wrap), z.mode = _, z.last = 0, z.havedict = 0, z.dmax = 32768, z.head = null, z.hold = 0, z.bits = 0, z.lencode = z.lendyn = new e.Buf32(o), z.distcode = z.distdyn = new e.Buf32(p), z.sane = 1, z.back = -1, x) : l;
      }
      function R(b) {
        var z;
        return b && b.state ? ((z = b.state).wsize = 0, z.whave = 0, z.wnext = 0, k(b)) : l;
      }
      function C(b, z) {
        var r, N;
        return b && b.state ? (N = b.state, z < 0 ? (r = 0, z = -z) : (r = 1 + (z >> 4), z < 48 && (z &= 15)), z && (z < 8 || 15 < z) ? l : (N.window !== null && N.wbits !== z && (N.window = null), N.wrap = r, N.wbits = z, R(b))) : l;
      }
      function L(b, z) {
        var r, N;
        return b ? (N = new g(), (b.state = N).window = null, (r = C(b, z)) !== x && (b.state = null), r) : l;
      }
      var F, j, P = !0;
      function Z(b) {
        if (P) {
          var z;
          for (F = new e.Buf32(512), j = new e.Buf32(32), z = 0; z < 144; ) b.lens[z++] = 8;
          for (; z < 256; ) b.lens[z++] = 9;
          for (; z < 280; ) b.lens[z++] = 7;
          for (; z < 288; ) b.lens[z++] = 8;
          for (w(S, b.lens, 0, 288, F, 0, b.work, { bits: 9 }), z = 0; z < 32; ) b.lens[z++] = 5;
          w(y, b.lens, 0, 32, j, 0, b.work, { bits: 5 }), P = !1;
        }
        b.lencode = F, b.lenbits = 9, b.distcode = j, b.distbits = 5;
      }
      function J(b, z, r, N) {
        var et, $ = b.state;
        return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new e.Buf8($.wsize)), N >= $.wsize ? (e.arraySet($.window, z, r - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (N < (et = $.wsize - $.wnext) && (et = N), e.arraySet($.window, z, r - N, et, $.wnext), (N -= et) ? (e.arraySet($.window, z, r - N, N, 0), $.wnext = N, $.whave = $.wsize) : ($.wnext += et, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += et))), 0;
      }
      h.inflateReset = R, h.inflateReset2 = C, h.inflateResetKeep = k, h.inflateInit = function(b) {
        return L(b, 15);
      }, h.inflateInit2 = L, h.inflate = function(b, z) {
        var r, N, et, $, it, H, tt, B, O, Q, Y, G, ut, pt, at, lt, dt, ct, Et, xt, t, U, D, v, f = 0, E = new e.Buf8(4), M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!b || !b.state || !b.output || !b.input && b.avail_in !== 0) return l;
        (r = b.state).mode === 12 && (r.mode = 13), it = b.next_out, et = b.output, tt = b.avail_out, $ = b.next_in, N = b.input, H = b.avail_in, B = r.hold, O = r.bits, Q = H, Y = tt, U = x;
        t: for (; ; ) switch (r.mode) {
          case _:
            if (r.wrap === 0) {
              r.mode = 13;
              break;
            }
            for (; O < 16; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if (2 & r.wrap && B === 35615) {
              E[r.check = 0] = 255 & B, E[1] = B >>> 8 & 255, r.check = n(r.check, E, 2, 0), O = B = 0, r.mode = 2;
              break;
            }
            if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
              b.msg = "incorrect header check", r.mode = 30;
              break;
            }
            if ((15 & B) != 8) {
              b.msg = "unknown compression method", r.mode = 30;
              break;
            }
            if (O -= 4, t = 8 + (15 & (B >>>= 4)), r.wbits === 0) r.wbits = t;
            else if (t > r.wbits) {
              b.msg = "invalid window size", r.mode = 30;
              break;
            }
            r.dmax = 1 << t, b.adler = r.check = 1, r.mode = 512 & B ? 10 : 12, O = B = 0;
            break;
          case 2:
            for (; O < 16; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if (r.flags = B, (255 & r.flags) != 8) {
              b.msg = "unknown compression method", r.mode = 30;
              break;
            }
            if (57344 & r.flags) {
              b.msg = "unknown header flags set", r.mode = 30;
              break;
            }
            r.head && (r.head.text = B >> 8 & 1), 512 & r.flags && (E[0] = 255 & B, E[1] = B >>> 8 & 255, r.check = n(r.check, E, 2, 0)), O = B = 0, r.mode = 3;
          case 3:
            for (; O < 32; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            r.head && (r.head.time = B), 512 & r.flags && (E[0] = 255 & B, E[1] = B >>> 8 & 255, E[2] = B >>> 16 & 255, E[3] = B >>> 24 & 255, r.check = n(r.check, E, 4, 0)), O = B = 0, r.mode = 4;
          case 4:
            for (; O < 16; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            r.head && (r.head.xflags = 255 & B, r.head.os = B >> 8), 512 & r.flags && (E[0] = 255 & B, E[1] = B >>> 8 & 255, r.check = n(r.check, E, 2, 0)), O = B = 0, r.mode = 5;
          case 5:
            if (1024 & r.flags) {
              for (; O < 16; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              r.length = B, r.head && (r.head.extra_len = B), 512 & r.flags && (E[0] = 255 & B, E[1] = B >>> 8 & 255, r.check = n(r.check, E, 2, 0)), O = B = 0;
            } else r.head && (r.head.extra = null);
            r.mode = 6;
          case 6:
            if (1024 & r.flags && (H < (G = r.length) && (G = H), G && (r.head && (t = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), e.arraySet(r.head.extra, N, $, G, t)), 512 & r.flags && (r.check = n(r.check, N, G, $)), H -= G, $ += G, r.length -= G), r.length)) break t;
            r.length = 0, r.mode = 7;
          case 7:
            if (2048 & r.flags) {
              if (H === 0) break t;
              for (G = 0; t = N[$ + G++], r.head && t && r.length < 65536 && (r.head.name += String.fromCharCode(t)), t && G < H; ) ;
              if (512 & r.flags && (r.check = n(r.check, N, G, $)), H -= G, $ += G, t) break t;
            } else r.head && (r.head.name = null);
            r.length = 0, r.mode = 8;
          case 8:
            if (4096 & r.flags) {
              if (H === 0) break t;
              for (G = 0; t = N[$ + G++], r.head && t && r.length < 65536 && (r.head.comment += String.fromCharCode(t)), t && G < H; ) ;
              if (512 & r.flags && (r.check = n(r.check, N, G, $)), H -= G, $ += G, t) break t;
            } else r.head && (r.head.comment = null);
            r.mode = 9;
          case 9:
            if (512 & r.flags) {
              for (; O < 16; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              if (B !== (65535 & r.check)) {
                b.msg = "header crc mismatch", r.mode = 30;
                break;
              }
              O = B = 0;
            }
            r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), b.adler = r.check = 0, r.mode = 12;
            break;
          case 10:
            for (; O < 32; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            b.adler = r.check = c(B), O = B = 0, r.mode = 11;
          case 11:
            if (r.havedict === 0) return b.next_out = it, b.avail_out = tt, b.next_in = $, b.avail_in = H, r.hold = B, r.bits = O, 2;
            b.adler = r.check = 1, r.mode = 12;
          case 12:
            if (z === 5 || z === 6) break t;
          case 13:
            if (r.last) {
              B >>>= 7 & O, O -= 7 & O, r.mode = 27;
              break;
            }
            for (; O < 3; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            switch (r.last = 1 & B, O -= 1, 3 & (B >>>= 1)) {
              case 0:
                r.mode = 14;
                break;
              case 1:
                if (Z(r), r.mode = 20, z !== 6) break;
                B >>>= 2, O -= 2;
                break t;
              case 2:
                r.mode = 17;
                break;
              case 3:
                b.msg = "invalid block type", r.mode = 30;
            }
            B >>>= 2, O -= 2;
            break;
          case 14:
            for (B >>>= 7 & O, O -= 7 & O; O < 32; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if ((65535 & B) != (B >>> 16 ^ 65535)) {
              b.msg = "invalid stored block lengths", r.mode = 30;
              break;
            }
            if (r.length = 65535 & B, O = B = 0, r.mode = 15, z === 6) break t;
          case 15:
            r.mode = 16;
          case 16:
            if (G = r.length) {
              if (H < G && (G = H), tt < G && (G = tt), G === 0) break t;
              e.arraySet(et, N, $, G, it), H -= G, $ += G, tt -= G, it += G, r.length -= G;
              break;
            }
            r.mode = 12;
            break;
          case 17:
            for (; O < 14; ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if (r.nlen = 257 + (31 & B), B >>>= 5, O -= 5, r.ndist = 1 + (31 & B), B >>>= 5, O -= 5, r.ncode = 4 + (15 & B), B >>>= 4, O -= 4, 286 < r.nlen || 30 < r.ndist) {
              b.msg = "too many length or distance symbols", r.mode = 30;
              break;
            }
            r.have = 0, r.mode = 18;
          case 18:
            for (; r.have < r.ncode; ) {
              for (; O < 3; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              r.lens[M[r.have++]] = 7 & B, B >>>= 3, O -= 3;
            }
            for (; r.have < 19; ) r.lens[M[r.have++]] = 0;
            if (r.lencode = r.lendyn, r.lenbits = 7, D = { bits: r.lenbits }, U = w(0, r.lens, 0, 19, r.lencode, 0, r.work, D), r.lenbits = D.bits, U) {
              b.msg = "invalid code lengths set", r.mode = 30;
              break;
            }
            r.have = 0, r.mode = 19;
          case 19:
            for (; r.have < r.nlen + r.ndist; ) {
              for (; lt = (f = r.lencode[B & (1 << r.lenbits) - 1]) >>> 16 & 255, dt = 65535 & f, !((at = f >>> 24) <= O); ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              if (dt < 16) B >>>= at, O -= at, r.lens[r.have++] = dt;
              else {
                if (dt === 16) {
                  for (v = at + 2; O < v; ) {
                    if (H === 0) break t;
                    H--, B += N[$++] << O, O += 8;
                  }
                  if (B >>>= at, O -= at, r.have === 0) {
                    b.msg = "invalid bit length repeat", r.mode = 30;
                    break;
                  }
                  t = r.lens[r.have - 1], G = 3 + (3 & B), B >>>= 2, O -= 2;
                } else if (dt === 17) {
                  for (v = at + 3; O < v; ) {
                    if (H === 0) break t;
                    H--, B += N[$++] << O, O += 8;
                  }
                  O -= at, t = 0, G = 3 + (7 & (B >>>= at)), B >>>= 3, O -= 3;
                } else {
                  for (v = at + 7; O < v; ) {
                    if (H === 0) break t;
                    H--, B += N[$++] << O, O += 8;
                  }
                  O -= at, t = 0, G = 11 + (127 & (B >>>= at)), B >>>= 7, O -= 7;
                }
                if (r.have + G > r.nlen + r.ndist) {
                  b.msg = "invalid bit length repeat", r.mode = 30;
                  break;
                }
                for (; G--; ) r.lens[r.have++] = t;
              }
            }
            if (r.mode === 30) break;
            if (r.lens[256] === 0) {
              b.msg = "invalid code -- missing end-of-block", r.mode = 30;
              break;
            }
            if (r.lenbits = 9, D = { bits: r.lenbits }, U = w(S, r.lens, 0, r.nlen, r.lencode, 0, r.work, D), r.lenbits = D.bits, U) {
              b.msg = "invalid literal/lengths set", r.mode = 30;
              break;
            }
            if (r.distbits = 6, r.distcode = r.distdyn, D = { bits: r.distbits }, U = w(y, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, D), r.distbits = D.bits, U) {
              b.msg = "invalid distances set", r.mode = 30;
              break;
            }
            if (r.mode = 20, z === 6) break t;
          case 20:
            r.mode = 21;
          case 21:
            if (6 <= H && 258 <= tt) {
              b.next_out = it, b.avail_out = tt, b.next_in = $, b.avail_in = H, r.hold = B, r.bits = O, u(b, Y), it = b.next_out, et = b.output, tt = b.avail_out, $ = b.next_in, N = b.input, H = b.avail_in, B = r.hold, O = r.bits, r.mode === 12 && (r.back = -1);
              break;
            }
            for (r.back = 0; lt = (f = r.lencode[B & (1 << r.lenbits) - 1]) >>> 16 & 255, dt = 65535 & f, !((at = f >>> 24) <= O); ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if (lt && !(240 & lt)) {
              for (ct = at, Et = lt, xt = dt; lt = (f = r.lencode[xt + ((B & (1 << ct + Et) - 1) >> ct)]) >>> 16 & 255, dt = 65535 & f, !(ct + (at = f >>> 24) <= O); ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              B >>>= ct, O -= ct, r.back += ct;
            }
            if (B >>>= at, O -= at, r.back += at, r.length = dt, lt === 0) {
              r.mode = 26;
              break;
            }
            if (32 & lt) {
              r.back = -1, r.mode = 12;
              break;
            }
            if (64 & lt) {
              b.msg = "invalid literal/length code", r.mode = 30;
              break;
            }
            r.extra = 15 & lt, r.mode = 22;
          case 22:
            if (r.extra) {
              for (v = r.extra; O < v; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              r.length += B & (1 << r.extra) - 1, B >>>= r.extra, O -= r.extra, r.back += r.extra;
            }
            r.was = r.length, r.mode = 23;
          case 23:
            for (; lt = (f = r.distcode[B & (1 << r.distbits) - 1]) >>> 16 & 255, dt = 65535 & f, !((at = f >>> 24) <= O); ) {
              if (H === 0) break t;
              H--, B += N[$++] << O, O += 8;
            }
            if (!(240 & lt)) {
              for (ct = at, Et = lt, xt = dt; lt = (f = r.distcode[xt + ((B & (1 << ct + Et) - 1) >> ct)]) >>> 16 & 255, dt = 65535 & f, !(ct + (at = f >>> 24) <= O); ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              B >>>= ct, O -= ct, r.back += ct;
            }
            if (B >>>= at, O -= at, r.back += at, 64 & lt) {
              b.msg = "invalid distance code", r.mode = 30;
              break;
            }
            r.offset = dt, r.extra = 15 & lt, r.mode = 24;
          case 24:
            if (r.extra) {
              for (v = r.extra; O < v; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              r.offset += B & (1 << r.extra) - 1, B >>>= r.extra, O -= r.extra, r.back += r.extra;
            }
            if (r.offset > r.dmax) {
              b.msg = "invalid distance too far back", r.mode = 30;
              break;
            }
            r.mode = 25;
          case 25:
            if (tt === 0) break t;
            if (G = Y - tt, r.offset > G) {
              if ((G = r.offset - G) > r.whave && r.sane) {
                b.msg = "invalid distance too far back", r.mode = 30;
                break;
              }
              ut = G > r.wnext ? (G -= r.wnext, r.wsize - G) : r.wnext - G, G > r.length && (G = r.length), pt = r.window;
            } else pt = et, ut = it - r.offset, G = r.length;
            for (tt < G && (G = tt), tt -= G, r.length -= G; et[it++] = pt[ut++], --G; ) ;
            r.length === 0 && (r.mode = 21);
            break;
          case 26:
            if (tt === 0) break t;
            et[it++] = r.length, tt--, r.mode = 21;
            break;
          case 27:
            if (r.wrap) {
              for (; O < 32; ) {
                if (H === 0) break t;
                H--, B |= N[$++] << O, O += 8;
              }
              if (Y -= tt, b.total_out += Y, r.total += Y, Y && (b.adler = r.check = r.flags ? n(r.check, et, Y, it - Y) : a(r.check, et, Y, it - Y)), Y = tt, (r.flags ? B : c(B)) !== r.check) {
                b.msg = "incorrect data check", r.mode = 30;
                break;
              }
              O = B = 0;
            }
            r.mode = 28;
          case 28:
            if (r.wrap && r.flags) {
              for (; O < 32; ) {
                if (H === 0) break t;
                H--, B += N[$++] << O, O += 8;
              }
              if (B !== (4294967295 & r.total)) {
                b.msg = "incorrect length check", r.mode = 30;
                break;
              }
              O = B = 0;
            }
            r.mode = 29;
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
            return l;
        }
        return b.next_out = it, b.avail_out = tt, b.next_in = $, b.avail_in = H, r.hold = B, r.bits = O, (r.wsize || Y !== b.avail_out && r.mode < 30 && (r.mode < 27 || z !== 4)) && J(b, b.output, b.next_out, Y - b.avail_out) ? (r.mode = 31, -4) : (Q -= b.avail_in, Y -= b.avail_out, b.total_in += Q, b.total_out += Y, r.total += Y, r.wrap && Y && (b.adler = r.check = r.flags ? n(r.check, et, Y, b.next_out - Y) : a(r.check, et, Y, b.next_out - Y)), b.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === 12 ? 128 : 0) + (r.mode === 20 || r.mode === 15 ? 256 : 0), (Q == 0 && Y === 0 || z === 4) && U === x && (U = -5), U);
      }, h.inflateEnd = function(b) {
        if (!b || !b.state) return l;
        var z = b.state;
        return z.window && (z.window = null), b.state = null, x;
      }, h.inflateGetHeader = function(b, z) {
        var r;
        return b && b.state && 2 & (r = b.state).wrap ? ((r.head = z).done = !1, x) : l;
      }, h.inflateSetDictionary = function(b, z) {
        var r, N = z.length;
        return b && b.state ? (r = b.state).wrap !== 0 && r.mode !== 11 ? l : r.mode === 11 && a(1, z, N, 0) !== r.check ? -3 : J(b, z, N, N) ? (r.mode = 31, -4) : (r.havedict = 1, x) : l;
      }, h.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(i, m, h) {
      var e = i("../utils/common"), a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], n = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], w = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      m.exports = function(S, y, x, l, _, o, p, c) {
        var g, k, R, C, L, F, j, P, Z, J = c.bits, b = 0, z = 0, r = 0, N = 0, et = 0, $ = 0, it = 0, H = 0, tt = 0, B = 0, O = null, Q = 0, Y = new e.Buf16(16), G = new e.Buf16(16), ut = null, pt = 0;
        for (b = 0; b <= 15; b++) Y[b] = 0;
        for (z = 0; z < l; z++) Y[y[x + z]]++;
        for (et = J, N = 15; 1 <= N && Y[N] === 0; N--) ;
        if (N < et && (et = N), N === 0) return _[o++] = 20971520, _[o++] = 20971520, c.bits = 1, 0;
        for (r = 1; r < N && Y[r] === 0; r++) ;
        for (et < r && (et = r), b = H = 1; b <= 15; b++) if (H <<= 1, (H -= Y[b]) < 0) return -1;
        if (0 < H && (S === 0 || N !== 1)) return -1;
        for (G[1] = 0, b = 1; b < 15; b++) G[b + 1] = G[b] + Y[b];
        for (z = 0; z < l; z++) y[x + z] !== 0 && (p[G[y[x + z]]++] = z);
        if (F = S === 0 ? (O = ut = p, 19) : S === 1 ? (O = a, Q -= 257, ut = n, pt -= 257, 256) : (O = u, ut = w, -1), b = r, L = o, it = z = B = 0, R = -1, C = (tt = 1 << ($ = et)) - 1, S === 1 && 852 < tt || S === 2 && 592 < tt) return 1;
        for (; ; ) {
          for (j = b - it, Z = p[z] < F ? (P = 0, p[z]) : p[z] > F ? (P = ut[pt + p[z]], O[Q + p[z]]) : (P = 96, 0), g = 1 << b - it, r = k = 1 << $; _[L + (B >> it) + (k -= g)] = j << 24 | P << 16 | Z | 0, k !== 0; ) ;
          for (g = 1 << b - 1; B & g; ) g >>= 1;
          if (g !== 0 ? (B &= g - 1, B += g) : B = 0, z++, --Y[b] == 0) {
            if (b === N) break;
            b = y[x + p[z]];
          }
          if (et < b && (B & C) !== R) {
            for (it === 0 && (it = et), L += r, H = 1 << ($ = b - it); $ + it < N && !((H -= Y[$ + it]) <= 0); ) $++, H <<= 1;
            if (tt += 1 << $, S === 1 && 852 < tt || S === 2 && 592 < tt) return 1;
            _[R = B & C] = et << 24 | $ << 16 | L - o | 0;
          }
        }
        return B !== 0 && (_[L + B] = b - it << 24 | 64 << 16 | 0), c.bits = et, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(i, m, h) {
      m.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(i, m, h) {
      var e = i("../utils/common"), a = 0, n = 1;
      function u(f) {
        for (var E = f.length; 0 <= --E; ) f[E] = 0;
      }
      var w = 0, S = 29, y = 256, x = y + 1 + S, l = 30, _ = 19, o = 2 * x + 1, p = 15, c = 16, g = 7, k = 256, R = 16, C = 17, L = 18, F = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], j = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], P = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], Z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], J = new Array(2 * (x + 2));
      u(J);
      var b = new Array(2 * l);
      u(b);
      var z = new Array(512);
      u(z);
      var r = new Array(256);
      u(r);
      var N = new Array(S);
      u(N);
      var et, $, it, H = new Array(l);
      function tt(f, E, M, W, A) {
        this.static_tree = f, this.extra_bits = E, this.extra_base = M, this.elems = W, this.max_length = A, this.has_stree = f && f.length;
      }
      function B(f, E) {
        this.dyn_tree = f, this.max_code = 0, this.stat_desc = E;
      }
      function O(f) {
        return f < 256 ? z[f] : z[256 + (f >>> 7)];
      }
      function Q(f, E) {
        f.pending_buf[f.pending++] = 255 & E, f.pending_buf[f.pending++] = E >>> 8 & 255;
      }
      function Y(f, E, M) {
        f.bi_valid > c - M ? (f.bi_buf |= E << f.bi_valid & 65535, Q(f, f.bi_buf), f.bi_buf = E >> c - f.bi_valid, f.bi_valid += M - c) : (f.bi_buf |= E << f.bi_valid & 65535, f.bi_valid += M);
      }
      function G(f, E, M) {
        Y(f, M[2 * E], M[2 * E + 1]);
      }
      function ut(f, E) {
        for (var M = 0; M |= 1 & f, f >>>= 1, M <<= 1, 0 < --E; ) ;
        return M >>> 1;
      }
      function pt(f, E, M) {
        var W, A, V = new Array(p + 1), X = 0;
        for (W = 1; W <= p; W++) V[W] = X = X + M[W - 1] << 1;
        for (A = 0; A <= E; A++) {
          var I = f[2 * A + 1];
          I !== 0 && (f[2 * A] = ut(V[I]++, I));
        }
      }
      function at(f) {
        var E;
        for (E = 0; E < x; E++) f.dyn_ltree[2 * E] = 0;
        for (E = 0; E < l; E++) f.dyn_dtree[2 * E] = 0;
        for (E = 0; E < _; E++) f.bl_tree[2 * E] = 0;
        f.dyn_ltree[2 * k] = 1, f.opt_len = f.static_len = 0, f.last_lit = f.matches = 0;
      }
      function lt(f) {
        8 < f.bi_valid ? Q(f, f.bi_buf) : 0 < f.bi_valid && (f.pending_buf[f.pending++] = f.bi_buf), f.bi_buf = 0, f.bi_valid = 0;
      }
      function dt(f, E, M, W) {
        var A = 2 * E, V = 2 * M;
        return f[A] < f[V] || f[A] === f[V] && W[E] <= W[M];
      }
      function ct(f, E, M) {
        for (var W = f.heap[M], A = M << 1; A <= f.heap_len && (A < f.heap_len && dt(E, f.heap[A + 1], f.heap[A], f.depth) && A++, !dt(E, W, f.heap[A], f.depth)); ) f.heap[M] = f.heap[A], M = A, A <<= 1;
        f.heap[M] = W;
      }
      function Et(f, E, M) {
        var W, A, V, X, I = 0;
        if (f.last_lit !== 0) for (; W = f.pending_buf[f.d_buf + 2 * I] << 8 | f.pending_buf[f.d_buf + 2 * I + 1], A = f.pending_buf[f.l_buf + I], I++, W === 0 ? G(f, A, E) : (G(f, (V = r[A]) + y + 1, E), (X = F[V]) !== 0 && Y(f, A -= N[V], X), G(f, V = O(--W), M), (X = j[V]) !== 0 && Y(f, W -= H[V], X)), I < f.last_lit; ) ;
        G(f, k, E);
      }
      function xt(f, E) {
        var M, W, A, V = E.dyn_tree, X = E.stat_desc.static_tree, I = E.stat_desc.has_stree, T = E.stat_desc.elems, K = -1;
        for (f.heap_len = 0, f.heap_max = o, M = 0; M < T; M++) V[2 * M] !== 0 ? (f.heap[++f.heap_len] = K = M, f.depth[M] = 0) : V[2 * M + 1] = 0;
        for (; f.heap_len < 2; ) V[2 * (A = f.heap[++f.heap_len] = K < 2 ? ++K : 0)] = 1, f.depth[A] = 0, f.opt_len--, I && (f.static_len -= X[2 * A + 1]);
        for (E.max_code = K, M = f.heap_len >> 1; 1 <= M; M--) ct(f, V, M);
        for (A = T; M = f.heap[1], f.heap[1] = f.heap[f.heap_len--], ct(f, V, 1), W = f.heap[1], f.heap[--f.heap_max] = M, f.heap[--f.heap_max] = W, V[2 * A] = V[2 * M] + V[2 * W], f.depth[A] = (f.depth[M] >= f.depth[W] ? f.depth[M] : f.depth[W]) + 1, V[2 * M + 1] = V[2 * W + 1] = A, f.heap[1] = A++, ct(f, V, 1), 2 <= f.heap_len; ) ;
        f.heap[--f.heap_max] = f.heap[1], function(q, st) {
          var gt, wt, Ct, ft, Ot, Rt, zt = st.dyn_tree, $t = st.max_code, Zt = st.stat_desc.static_tree, Ut = st.stat_desc.has_stree, Qt = st.stat_desc.extra_bits, Ht = st.stat_desc.extra_base, Bt = st.stat_desc.max_length, Nt = 0;
          for (ft = 0; ft <= p; ft++) q.bl_count[ft] = 0;
          for (zt[2 * q.heap[q.heap_max] + 1] = 0, gt = q.heap_max + 1; gt < o; gt++) Bt < (ft = zt[2 * zt[2 * (wt = q.heap[gt]) + 1] + 1] + 1) && (ft = Bt, Nt++), zt[2 * wt + 1] = ft, $t < wt || (q.bl_count[ft]++, Ot = 0, Ht <= wt && (Ot = Qt[wt - Ht]), Rt = zt[2 * wt], q.opt_len += Rt * (ft + Ot), Ut && (q.static_len += Rt * (Zt[2 * wt + 1] + Ot)));
          if (Nt !== 0) {
            do {
              for (ft = Bt - 1; q.bl_count[ft] === 0; ) ft--;
              q.bl_count[ft]--, q.bl_count[ft + 1] += 2, q.bl_count[Bt]--, Nt -= 2;
            } while (0 < Nt);
            for (ft = Bt; ft !== 0; ft--) for (wt = q.bl_count[ft]; wt !== 0; ) $t < (Ct = q.heap[--gt]) || (zt[2 * Ct + 1] !== ft && (q.opt_len += (ft - zt[2 * Ct + 1]) * zt[2 * Ct], zt[2 * Ct + 1] = ft), wt--);
          }
        }(f, E), pt(V, K, f.bl_count);
      }
      function t(f, E, M) {
        var W, A, V = -1, X = E[1], I = 0, T = 7, K = 4;
        for (X === 0 && (T = 138, K = 3), E[2 * (M + 1) + 1] = 65535, W = 0; W <= M; W++) A = X, X = E[2 * (W + 1) + 1], ++I < T && A === X || (I < K ? f.bl_tree[2 * A] += I : A !== 0 ? (A !== V && f.bl_tree[2 * A]++, f.bl_tree[2 * R]++) : I <= 10 ? f.bl_tree[2 * C]++ : f.bl_tree[2 * L]++, V = A, K = (I = 0) === X ? (T = 138, 3) : A === X ? (T = 6, 3) : (T = 7, 4));
      }
      function U(f, E, M) {
        var W, A, V = -1, X = E[1], I = 0, T = 7, K = 4;
        for (X === 0 && (T = 138, K = 3), W = 0; W <= M; W++) if (A = X, X = E[2 * (W + 1) + 1], !(++I < T && A === X)) {
          if (I < K) for (; G(f, A, f.bl_tree), --I != 0; ) ;
          else A !== 0 ? (A !== V && (G(f, A, f.bl_tree), I--), G(f, R, f.bl_tree), Y(f, I - 3, 2)) : I <= 10 ? (G(f, C, f.bl_tree), Y(f, I - 3, 3)) : (G(f, L, f.bl_tree), Y(f, I - 11, 7));
          V = A, K = (I = 0) === X ? (T = 138, 3) : A === X ? (T = 6, 3) : (T = 7, 4);
        }
      }
      u(H);
      var D = !1;
      function v(f, E, M, W) {
        Y(f, (w << 1) + (W ? 1 : 0), 3), function(A, V, X, I) {
          lt(A), Q(A, X), Q(A, ~X), e.arraySet(A.pending_buf, A.window, V, X, A.pending), A.pending += X;
        }(f, E, M);
      }
      h._tr_init = function(f) {
        D || (function() {
          var E, M, W, A, V, X = new Array(p + 1);
          for (A = W = 0; A < S - 1; A++) for (N[A] = W, E = 0; E < 1 << F[A]; E++) r[W++] = A;
          for (r[W - 1] = A, A = V = 0; A < 16; A++) for (H[A] = V, E = 0; E < 1 << j[A]; E++) z[V++] = A;
          for (V >>= 7; A < l; A++) for (H[A] = V << 7, E = 0; E < 1 << j[A] - 7; E++) z[256 + V++] = A;
          for (M = 0; M <= p; M++) X[M] = 0;
          for (E = 0; E <= 143; ) J[2 * E + 1] = 8, E++, X[8]++;
          for (; E <= 255; ) J[2 * E + 1] = 9, E++, X[9]++;
          for (; E <= 279; ) J[2 * E + 1] = 7, E++, X[7]++;
          for (; E <= 287; ) J[2 * E + 1] = 8, E++, X[8]++;
          for (pt(J, x + 1, X), E = 0; E < l; E++) b[2 * E + 1] = 5, b[2 * E] = ut(E, 5);
          et = new tt(J, F, y + 1, x, p), $ = new tt(b, j, 0, l, p), it = new tt(new Array(0), P, 0, _, g);
        }(), D = !0), f.l_desc = new B(f.dyn_ltree, et), f.d_desc = new B(f.dyn_dtree, $), f.bl_desc = new B(f.bl_tree, it), f.bi_buf = 0, f.bi_valid = 0, at(f);
      }, h._tr_stored_block = v, h._tr_flush_block = function(f, E, M, W) {
        var A, V, X = 0;
        0 < f.level ? (f.strm.data_type === 2 && (f.strm.data_type = function(I) {
          var T, K = 4093624447;
          for (T = 0; T <= 31; T++, K >>>= 1) if (1 & K && I.dyn_ltree[2 * T] !== 0) return a;
          if (I.dyn_ltree[18] !== 0 || I.dyn_ltree[20] !== 0 || I.dyn_ltree[26] !== 0) return n;
          for (T = 32; T < y; T++) if (I.dyn_ltree[2 * T] !== 0) return n;
          return a;
        }(f)), xt(f, f.l_desc), xt(f, f.d_desc), X = function(I) {
          var T;
          for (t(I, I.dyn_ltree, I.l_desc.max_code), t(I, I.dyn_dtree, I.d_desc.max_code), xt(I, I.bl_desc), T = _ - 1; 3 <= T && I.bl_tree[2 * Z[T] + 1] === 0; T--) ;
          return I.opt_len += 3 * (T + 1) + 5 + 5 + 4, T;
        }(f), A = f.opt_len + 3 + 7 >>> 3, (V = f.static_len + 3 + 7 >>> 3) <= A && (A = V)) : A = V = M + 5, M + 4 <= A && E !== -1 ? v(f, E, M, W) : f.strategy === 4 || V === A ? (Y(f, 2 + (W ? 1 : 0), 3), Et(f, J, b)) : (Y(f, 4 + (W ? 1 : 0), 3), function(I, T, K, q) {
          var st;
          for (Y(I, T - 257, 5), Y(I, K - 1, 5), Y(I, q - 4, 4), st = 0; st < q; st++) Y(I, I.bl_tree[2 * Z[st] + 1], 3);
          U(I, I.dyn_ltree, T - 1), U(I, I.dyn_dtree, K - 1);
        }(f, f.l_desc.max_code + 1, f.d_desc.max_code + 1, X + 1), Et(f, f.dyn_ltree, f.dyn_dtree)), at(f), W && lt(f);
      }, h._tr_tally = function(f, E, M) {
        return f.pending_buf[f.d_buf + 2 * f.last_lit] = E >>> 8 & 255, f.pending_buf[f.d_buf + 2 * f.last_lit + 1] = 255 & E, f.pending_buf[f.l_buf + f.last_lit] = 255 & M, f.last_lit++, E === 0 ? f.dyn_ltree[2 * M]++ : (f.matches++, E--, f.dyn_ltree[2 * (r[M] + y + 1)]++, f.dyn_dtree[2 * O(E)]++), f.last_lit === f.lit_bufsize - 1;
      }, h._tr_align = function(f) {
        Y(f, 2, 3), G(f, k, J), function(E) {
          E.bi_valid === 16 ? (Q(E, E.bi_buf), E.bi_buf = 0, E.bi_valid = 0) : 8 <= E.bi_valid && (E.pending_buf[E.pending++] = 255 & E.bi_buf, E.bi_buf >>= 8, E.bi_valid -= 8);
        }(f);
      };
    }, { "../utils/common": 41 }], 53: [function(i, m, h) {
      m.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(i, m, h) {
      (function(e) {
        (function(a, n) {
          if (!a.setImmediate) {
            var u, w, S, y, x = 1, l = {}, _ = !1, o = a.document, p = Object.getPrototypeOf && Object.getPrototypeOf(a);
            p = p && p.setTimeout ? p : a, u = {}.toString.call(a.process) === "[object process]" ? function(R) {
              process.nextTick(function() {
                g(R);
              });
            } : function() {
              if (a.postMessage && !a.importScripts) {
                var R = !0, C = a.onmessage;
                return a.onmessage = function() {
                  R = !1;
                }, a.postMessage("", "*"), a.onmessage = C, R;
              }
            }() ? (y = "setImmediate$" + Math.random() + "$", a.addEventListener ? a.addEventListener("message", k, !1) : a.attachEvent("onmessage", k), function(R) {
              a.postMessage(y + R, "*");
            }) : a.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(R) {
              g(R.data);
            }, function(R) {
              S.port2.postMessage(R);
            }) : o && "onreadystatechange" in o.createElement("script") ? (w = o.documentElement, function(R) {
              var C = o.createElement("script");
              C.onreadystatechange = function() {
                g(R), C.onreadystatechange = null, w.removeChild(C), C = null;
              }, w.appendChild(C);
            }) : function(R) {
              setTimeout(g, 0, R);
            }, p.setImmediate = function(R) {
              typeof R != "function" && (R = new Function("" + R));
              for (var C = new Array(arguments.length - 1), L = 0; L < C.length; L++) C[L] = arguments[L + 1];
              var F = { callback: R, args: C };
              return l[x] = F, u(x), x++;
            }, p.clearImmediate = c;
          }
          function c(R) {
            delete l[R];
          }
          function g(R) {
            if (_) setTimeout(g, 0, R);
            else {
              var C = l[R];
              if (C) {
                _ = !0;
                try {
                  (function(L) {
                    var F = L.callback, j = L.args;
                    switch (j.length) {
                      case 0:
                        F();
                        break;
                      case 1:
                        F(j[0]);
                        break;
                      case 2:
                        F(j[0], j[1]);
                        break;
                      case 3:
                        F(j[0], j[1], j[2]);
                        break;
                      default:
                        F.apply(n, j);
                    }
                  })(C);
                } finally {
                  c(R), _ = !1;
                }
              }
            }
          }
          function k(R) {
            R.source === a && typeof R.data == "string" && R.data.indexOf(y) === 0 && g(+R.data.slice(y.length));
          }
        })(typeof self > "u" ? e === void 0 ? this : e : self);
      }).call(this, typeof Gt < "u" ? Gt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(be);
var je = be.exports;
const Me = /* @__PURE__ */ Ne(je);
function We(s = {}) {
  const {
    storageKey: d = "page-reviews",
    defaultPagePath: i = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = s;
  function m() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function h() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(d);
      return g ? JSON.parse(g) : [];
    } catch {
      return [];
    }
  }
  function e(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(d, JSON.stringify(g));
      } catch {
      }
  }
  const a = bt(h()), n = () => a.value;
  function u(g) {
    const k = g || i();
    return a.value.filter((R) => R.pagePath === k);
  }
  function w(g) {
    const k = {
      id: m(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return a.value.unshift(k), e(a.value), k;
  }
  function S(g, k) {
    const R = a.value.findIndex((C) => C.id === g);
    R > -1 && (a.value[R] = { ...a.value[R], ...k }, e(a.value));
  }
  function y(g) {
    a.value = a.value.filter((k) => k.id !== g), e(a.value);
  }
  function x(g) {
    const k = g || i();
    a.value = a.value.filter((R) => R.pagePath !== k), e(a.value);
  }
  function l() {
    a.value = [], e(a.value);
  }
  function _() {
    return {
      exportTime: (/* @__PURE__ */ new Date()).toISOString(),
      total: a.value.length,
      reviews: a.value
    };
  }
  function o() {
    te(
      new Blob([JSON.stringify(_(), null, 2)], { type: "application/json" }),
      `page-reviews-${ee()}.json`
    );
  }
  function p() {
    const g = de(_());
    te(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${ee()}.md`
    );
  }
  async function c() {
    const g = new Me(), k = _(), R = {
      ...k,
      reviews: k.reviews.map((F) => {
        var j;
        return {
          ...F,
          screenshots: (j = F.screenshots) == null ? void 0 : j.map((P) => P.url ? { type: P.type, filename: P.filename, url: P.url } : { type: P.type, filename: P.filename, imagePath: `images/${P.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(R, null, 2)), g.file("review.md", de(R));
    const C = g.folder("images");
    for (const F of k.reviews)
      for (const j of F.screenshots || [])
        if (j.data && !j.url) {
          const P = j.data.replace(/^data:image\/png;base64,/, "");
          C.file(j.filename, P, { base64: !0 });
        }
    const L = await g.generateAsync({ type: "blob" });
    te(L, `page-reviews-${ee()}.zip`);
  }
  return {
    reviews: a,
    allReviews: n,
    getPageReviews: u,
    addReview: w,
    updateReview: S,
    deleteReview: y,
    clearPageReviews: x,
    clearAllReviews: l,
    exportToJSON: o,
    exportToMarkdown: p,
    exportToZIP: c
  };
}
function de(s) {
  const d = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${s.total}`,
    ""
  ], i = Ze(s.reviews, "pagePath");
  return Object.entries(i).forEach(([m, h]) => {
    d.push(`## 页面：${m}`), d.push(""), h.forEach((e, a) => {
      var n, u;
      d.push(`### ${a + 1}. ${e.title || "未命名评审"}`), d.push(`- **类型**：${e.type === "element" ? "元素评审" : "视图范围评审"}`), d.push(`- **严重等级**：${$e(e.severity)}`), d.push(`- **状态**：${e.status === "resolved" ? "已解决" : "待处理"}`), d.push(`- **窗口尺寸**：${(n = e.viewport) == null ? void 0 : n.width} × ${(u = e.viewport) == null ? void 0 : u.height}`), e.scroll && d.push(`- **滚动位置**：x=${e.scroll.x}, y=${e.scroll.y}`), e.type === "element" && e.elementRect ? (d.push(`- **元素选择器**：\`${e.selector}\``), d.push(`- **元素位置**：x=${e.elementRect.x}, y=${e.elementRect.y}, width=${e.elementRect.width}, height=${e.elementRect.height}`), e.elementText && d.push(`- **元素文本**：${e.elementText}`)) : e.viewportRect && d.push(`- **框选范围**：x=${e.viewportRect.x}, y=${e.viewportRect.y}, width=${e.viewportRect.width}, height=${e.viewportRect.height}`), d.push(`- **评审建议**：${e.suggestion}`), d.push(`- **创建时间**：${new Date(e.createdAt).toLocaleString()}`), e.screenshots && e.screenshots.length > 0 && (d.push(""), d.push("#### 截图"), e.screenshots.forEach((w) => {
        const S = w.url || w.imagePath || `images/${w.filename}`;
        d.push(`![${w.type}](${S})`);
      })), d.push("");
    });
  }), d.join(`
`);
}
function te(s, d) {
  if (typeof window > "u") return;
  const i = URL.createObjectURL(s), m = document.createElement("a");
  m.href = i, m.download = d, document.body.appendChild(m), m.click(), document.body.removeChild(m), URL.revokeObjectURL(i);
}
function ee() {
  const s = /* @__PURE__ */ new Date();
  return `${s.getFullYear()}${Yt(s.getMonth() + 1)}${Yt(s.getDate())}-${Yt(s.getHours())}${Yt(s.getMinutes())}`;
}
function Yt(s) {
  return String(s).padStart(2, "0");
}
function $e(s) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[s] || s;
}
function Ze(s, d) {
  return s.reduce((i, m) => {
    const h = m[d] || "unknown";
    return i[h] || (i[h] = []), i[h].push(m), i;
  }, {});
}
function He(s, d) {
  if (s.match(/^[a-z]+:\/\//i))
    return s;
  if (s.match(/^\/\//))
    return window.location.protocol + s;
  if (s.match(/^[a-z]+:/i))
    return s;
  const i = document.implementation.createHTMLDocument(), m = i.createElement("base"), h = i.createElement("a");
  return i.head.appendChild(m), i.body.appendChild(h), d && (m.href = d), h.href = s, h.href;
}
const Ve = /* @__PURE__ */ (() => {
  let s = 0;
  const d = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (s += 1, `u${d()}${s}`);
})();
function Pt(s) {
  const d = [];
  for (let i = 0, m = s.length; i < m; i++)
    d.push(s[i]);
  return d;
}
let Mt = null;
function ke(s = {}) {
  return Mt || (s.includeStyleProperties ? (Mt = s.includeStyleProperties, Mt) : (Mt = Pt(window.getComputedStyle(document.documentElement)), Mt));
}
function Kt(s, d) {
  const m = (s.ownerDocument.defaultView || window).getComputedStyle(s).getPropertyValue(d);
  return m ? parseFloat(m.replace("px", "")) : 0;
}
function Ge(s) {
  const d = Kt(s, "border-left-width"), i = Kt(s, "border-right-width");
  return s.clientWidth + d + i;
}
function Xe(s) {
  const d = Kt(s, "border-top-width"), i = Kt(s, "border-bottom-width");
  return s.clientHeight + d + i;
}
function xe(s, d = {}) {
  const i = d.width || Ge(s), m = d.height || Xe(s);
  return { width: i, height: m };
}
function Ye() {
  let s, d;
  try {
    d = process;
  } catch {
  }
  const i = d && d.env ? d.env.devicePixelRatio : null;
  return i && (s = parseInt(i, 10), Number.isNaN(s) && (s = 1)), s || window.devicePixelRatio || 1;
}
const St = 16384;
function Ke(s) {
  (s.width > St || s.height > St) && (s.width > St && s.height > St ? s.width > s.height ? (s.height *= St / s.width, s.width = St) : (s.width *= St / s.height, s.height = St) : s.width > St ? (s.height *= St / s.width, s.width = St) : (s.width *= St / s.height, s.height = St));
}
function qt(s) {
  return new Promise((d, i) => {
    const m = new Image();
    m.onload = () => {
      m.decode().then(() => {
        requestAnimationFrame(() => d(m));
      });
    }, m.onerror = i, m.crossOrigin = "anonymous", m.decoding = "async", m.src = s;
  });
}
async function qe(s) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(s)).then(encodeURIComponent).then((d) => `data:image/svg+xml;charset=utf-8,${d}`);
}
async function Je(s, d, i) {
  const m = "http://www.w3.org/2000/svg", h = document.createElementNS(m, "svg"), e = document.createElementNS(m, "foreignObject");
  return h.setAttribute("width", `${d}`), h.setAttribute("height", `${i}`), h.setAttribute("viewBox", `0 0 ${d} ${i}`), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("externalResourcesRequired", "true"), h.appendChild(e), e.appendChild(s), qe(h);
}
const kt = (s, d) => {
  if (s instanceof d)
    return !0;
  const i = Object.getPrototypeOf(s);
  return i === null ? !1 : i.constructor.name === d.name || kt(i, d);
};
function Qe(s) {
  const d = s.getPropertyValue("content");
  return `${s.cssText} content: '${d.replace(/'|"/g, "")}';`;
}
function tr(s, d) {
  return ke(d).map((i) => {
    const m = s.getPropertyValue(i), h = s.getPropertyPriority(i);
    return `${i}: ${m}${h ? " !important" : ""};`;
  }).join(" ");
}
function er(s, d, i, m) {
  const h = `.${s}:${d}`, e = i.cssText ? Qe(i) : tr(i, m);
  return document.createTextNode(`${h}{${e}}`);
}
function pe(s, d, i, m) {
  const h = window.getComputedStyle(s, i), e = h.getPropertyValue("content");
  if (e === "" || e === "none")
    return;
  const a = Ve();
  try {
    d.className = `${d.className} ${a}`;
  } catch {
    return;
  }
  const n = document.createElement("style");
  n.appendChild(er(a, i, h, m)), d.appendChild(n);
}
function rr(s, d, i) {
  pe(s, d, ":before", i), pe(s, d, ":after", i);
}
const me = "application/font-woff", ge = "image/jpeg", nr = {
  woff: me,
  woff2: me,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ge,
  jpeg: ge,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ir(s) {
  const d = /\.([^./]*?)$/g.exec(s);
  return d ? d[1] : "";
}
function ie(s) {
  const d = ir(s).toLowerCase();
  return nr[d] || "";
}
function ar(s) {
  return s.split(/,/)[1];
}
function ne(s) {
  return s.search(/^(data:)/) !== -1;
}
function sr(s, d) {
  return `data:${d};base64,${s}`;
}
async function Se(s, d, i) {
  const m = await fetch(s, d);
  if (m.status === 404)
    throw new Error(`Resource "${m.url}" not found`);
  const h = await m.blob();
  return new Promise((e, a) => {
    const n = new FileReader();
    n.onerror = a, n.onloadend = () => {
      try {
        e(i({ res: m, result: n.result }));
      } catch (u) {
        a(u);
      }
    }, n.readAsDataURL(h);
  });
}
const re = {};
function or(s, d, i) {
  let m = s.replace(/\?.*/, "");
  return i && (m = s), /ttf|otf|eot|woff2?/i.test(m) && (m = m.replace(/.*\//, "")), d ? `[${d}]${m}` : m;
}
async function ae(s, d, i) {
  const m = or(s, d, i.includeQueryParams);
  if (re[m] != null)
    return re[m];
  i.cacheBust && (s += (/\?/.test(s) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let h;
  try {
    const e = await Se(s, i.fetchRequestInit, ({ res: a, result: n }) => (d || (d = a.headers.get("Content-Type") || ""), ar(n)));
    h = sr(e, d);
  } catch (e) {
    h = i.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${s}`;
    e && (a = typeof e == "string" ? e : e.message), a && console.warn(a);
  }
  return re[m] = h, h;
}
async function lr(s) {
  const d = s.toDataURL();
  return d === "data:," ? s.cloneNode(!1) : qt(d);
}
async function ur(s, d) {
  if (s.currentSrc) {
    const e = document.createElement("canvas"), a = e.getContext("2d");
    e.width = s.clientWidth, e.height = s.clientHeight, a == null || a.drawImage(s, 0, 0, e.width, e.height);
    const n = e.toDataURL();
    return qt(n);
  }
  const i = s.poster, m = ie(i), h = await ae(i, m, d);
  return qt(h);
}
async function cr(s, d) {
  var i;
  try {
    if (!((i = s == null ? void 0 : s.contentDocument) === null || i === void 0) && i.body)
      return await Jt(s.contentDocument.body, d, !0);
  } catch {
  }
  return s.cloneNode(!1);
}
async function hr(s, d) {
  return kt(s, HTMLCanvasElement) ? lr(s) : kt(s, HTMLVideoElement) ? ur(s, d) : kt(s, HTMLIFrameElement) ? cr(s, d) : s.cloneNode(Ee(s));
}
const fr = (s) => s.tagName != null && s.tagName.toUpperCase() === "SLOT", Ee = (s) => s.tagName != null && s.tagName.toUpperCase() === "SVG";
async function dr(s, d, i) {
  var m, h;
  if (Ee(d))
    return d;
  let e = [];
  return fr(s) && s.assignedNodes ? e = Pt(s.assignedNodes()) : kt(s, HTMLIFrameElement) && (!((m = s.contentDocument) === null || m === void 0) && m.body) ? e = Pt(s.contentDocument.body.childNodes) : e = Pt(((h = s.shadowRoot) !== null && h !== void 0 ? h : s).childNodes), e.length === 0 || kt(s, HTMLVideoElement) || await e.reduce((a, n) => a.then(() => Jt(n, i)).then((u) => {
    u && d.appendChild(u);
  }), Promise.resolve()), d;
}
function pr(s, d, i) {
  const m = d.style;
  if (!m)
    return;
  const h = window.getComputedStyle(s);
  h.cssText ? (m.cssText = h.cssText, m.transformOrigin = h.transformOrigin) : ke(i).forEach((e) => {
    let a = h.getPropertyValue(e);
    e === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), kt(s, HTMLIFrameElement) && e === "display" && a === "inline" && (a = "block"), e === "d" && d.getAttribute("d") && (a = `path(${d.getAttribute("d")})`), m.setProperty(e, a, h.getPropertyPriority(e));
  });
}
function mr(s, d) {
  kt(s, HTMLTextAreaElement) && (d.innerHTML = s.value), kt(s, HTMLInputElement) && d.setAttribute("value", s.value);
}
function gr(s, d) {
  if (kt(s, HTMLSelectElement)) {
    const i = d, m = Array.from(i.children).find((h) => s.value === h.getAttribute("value"));
    m && m.setAttribute("selected", "");
  }
}
function vr(s, d, i) {
  return kt(d, Element) && (pr(s, d, i), rr(s, d, i), mr(s, d), gr(s, d)), d;
}
async function _r(s, d) {
  const i = s.querySelectorAll ? s.querySelectorAll("use") : [];
  if (i.length === 0)
    return s;
  const m = {};
  for (let e = 0; e < i.length; e++) {
    const n = i[e].getAttribute("xlink:href");
    if (n) {
      const u = s.querySelector(n), w = document.querySelector(n);
      !u && w && !m[n] && (m[n] = await Jt(w, d, !0));
    }
  }
  const h = Object.values(m);
  if (h.length) {
    const e = "http://www.w3.org/1999/xhtml", a = document.createElementNS(e, "svg");
    a.setAttribute("xmlns", e), a.style.position = "absolute", a.style.width = "0", a.style.height = "0", a.style.overflow = "hidden", a.style.display = "none";
    const n = document.createElementNS(e, "defs");
    a.appendChild(n);
    for (let u = 0; u < h.length; u++)
      n.appendChild(h[u]);
    s.appendChild(a);
  }
  return s;
}
async function Jt(s, d, i) {
  return !i && d.filter && !d.filter(s) ? null : Promise.resolve(s).then((m) => hr(m, d)).then((m) => dr(s, m, d)).then((m) => vr(s, m, d)).then((m) => _r(m, d));
}
const Ce = /url\((['"]?)([^'"]+?)\1\)/g, wr = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, yr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function br(s) {
  const d = s.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${d})(['"]?\\))`, "g");
}
function kr(s) {
  const d = [];
  return s.replace(Ce, (i, m, h) => (d.push(h), i)), d.filter((i) => !ne(i));
}
async function xr(s, d, i, m, h) {
  try {
    const e = i ? He(d, i) : d, a = ie(d);
    let n;
    return h || (n = await ae(e, a, m)), s.replace(br(d), `$1${n}$3`);
  } catch {
  }
  return s;
}
function Sr(s, { preferredFontFormat: d }) {
  return d ? s.replace(yr, (i) => {
    for (; ; ) {
      const [m, , h] = wr.exec(i) || [];
      if (!h)
        return "";
      if (h === d)
        return `src: ${m};`;
    }
  }) : s;
}
function Re(s) {
  return s.search(Ce) !== -1;
}
async function ze(s, d, i) {
  if (!Re(s))
    return s;
  const m = Sr(s, i);
  return kr(m).reduce((e, a) => e.then((n) => xr(n, a, d, i)), Promise.resolve(m));
}
async function Wt(s, d, i) {
  var m;
  const h = (m = d.style) === null || m === void 0 ? void 0 : m.getPropertyValue(s);
  if (h) {
    const e = await ze(h, null, i);
    return d.style.setProperty(s, e, d.style.getPropertyPriority(s)), !0;
  }
  return !1;
}
async function Er(s, d) {
  await Wt("background", s, d) || await Wt("background-image", s, d), await Wt("mask", s, d) || await Wt("-webkit-mask", s, d) || await Wt("mask-image", s, d) || await Wt("-webkit-mask-image", s, d);
}
async function Cr(s, d) {
  const i = kt(s, HTMLImageElement);
  if (!(i && !ne(s.src)) && !(kt(s, SVGImageElement) && !ne(s.href.baseVal)))
    return;
  const m = i ? s.src : s.href.baseVal, h = await ae(m, ie(m), d);
  await new Promise((e, a) => {
    s.onload = e, s.onerror = d.onImageErrorHandler ? (...u) => {
      try {
        e(d.onImageErrorHandler(...u));
      } catch (w) {
        a(w);
      }
    } : a;
    const n = s;
    n.decode && (n.decode = e), n.loading === "lazy" && (n.loading = "eager"), i ? (s.srcset = "", s.src = h) : s.href.baseVal = h;
  });
}
async function Rr(s, d) {
  const m = Pt(s.childNodes).map((h) => Ae(h, d));
  await Promise.all(m).then(() => s);
}
async function Ae(s, d) {
  kt(s, Element) && (await Er(s, d), await Cr(s, d), await Rr(s, d));
}
function zr(s, d) {
  const { style: i } = s;
  d.backgroundColor && (i.backgroundColor = d.backgroundColor), d.width && (i.width = `${d.width}px`), d.height && (i.height = `${d.height}px`);
  const m = d.style;
  return m != null && Object.keys(m).forEach((h) => {
    i[h] = m[h];
  }), s;
}
const ve = {};
async function _e(s) {
  let d = ve[s];
  if (d != null)
    return d;
  const m = await (await fetch(s)).text();
  return d = { url: s, cssText: m }, ve[s] = d, d;
}
async function we(s, d) {
  let i = s.cssText;
  const m = /url\(["']?([^"')]+)["']?\)/g, e = (i.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let n = a.replace(m, "$1");
    return n.startsWith("https://") || (n = new URL(n, s.url).href), Se(n, d.fetchRequestInit, ({ result: u }) => (i = i.replace(a, `url(${u})`), [a, u]));
  });
  return Promise.all(e).then(() => i);
}
function ye(s) {
  if (s == null)
    return [];
  const d = [], i = /(\/\*[\s\S]*?\*\/)/gi;
  let m = s.replace(i, "");
  const h = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const u = h.exec(m);
    if (u === null)
      break;
    d.push(u[0]);
  }
  m = m.replace(h, "");
  const e = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", n = new RegExp(a, "gi");
  for (; ; ) {
    let u = e.exec(m);
    if (u === null) {
      if (u = n.exec(m), u === null)
        break;
      e.lastIndex = n.lastIndex;
    } else
      n.lastIndex = e.lastIndex;
    d.push(u[0]);
  }
  return d;
}
async function Ar(s, d) {
  const i = [], m = [];
  return s.forEach((h) => {
    if ("cssRules" in h)
      try {
        Pt(h.cssRules || []).forEach((e, a) => {
          if (e.type === CSSRule.IMPORT_RULE) {
            let n = a + 1;
            const u = e.href, w = _e(u).then((S) => we(S, d)).then((S) => ye(S).forEach((y) => {
              try {
                h.insertRule(y, y.startsWith("@import") ? n += 1 : h.cssRules.length);
              } catch (x) {
                console.error("Error inserting rule from remote css", {
                  rule: y,
                  error: x
                });
              }
            })).catch((S) => {
              console.error("Error loading remote css", S.toString());
            });
            m.push(w);
          }
        });
      } catch (e) {
        const a = s.find((n) => n.href == null) || document.styleSheets[0];
        h.href != null && m.push(_e(h.href).then((n) => we(n, d)).then((n) => ye(n).forEach((u) => {
          a.insertRule(u, a.cssRules.length);
        })).catch((n) => {
          console.error("Error loading remote stylesheet", n);
        })), console.error("Error inlining remote css file", e);
      }
  }), Promise.all(m).then(() => (s.forEach((h) => {
    if ("cssRules" in h)
      try {
        Pt(h.cssRules || []).forEach((e) => {
          i.push(e);
        });
      } catch (e) {
        console.error(`Error while reading CSS rules from ${h.href}`, e);
      }
  }), i));
}
function Ir(s) {
  return s.filter((d) => d.type === CSSRule.FONT_FACE_RULE).filter((d) => Re(d.style.getPropertyValue("src")));
}
async function Tr(s, d) {
  if (s.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const i = Pt(s.ownerDocument.styleSheets), m = await Ar(i, d);
  return Ir(m);
}
function Ie(s) {
  return s.trim().replace(/["']/g, "");
}
function Or(s) {
  const d = /* @__PURE__ */ new Set();
  function i(m) {
    (m.style.fontFamily || getComputedStyle(m).fontFamily).split(",").forEach((e) => {
      d.add(Ie(e));
    }), Array.from(m.children).forEach((e) => {
      e instanceof HTMLElement && i(e);
    });
  }
  return i(s), d;
}
async function Pr(s, d) {
  const i = await Tr(s, d), m = Or(s);
  return (await Promise.all(i.filter((e) => m.has(Ie(e.style.fontFamily))).map((e) => {
    const a = e.parentStyleSheet ? e.parentStyleSheet.href : null;
    return ze(e.cssText, a, d);
  }))).join(`
`);
}
async function Br(s, d) {
  const i = d.fontEmbedCSS != null ? d.fontEmbedCSS : d.skipFonts ? null : await Pr(s, d);
  if (i) {
    const m = document.createElement("style"), h = document.createTextNode(i);
    m.appendChild(h), s.firstChild ? s.insertBefore(m, s.firstChild) : s.appendChild(m);
  }
}
async function Dr(s, d = {}) {
  const { width: i, height: m } = xe(s, d), h = await Jt(s, d, !0);
  return await Br(h, d), await Ae(h, d), zr(h, d), await Je(h, i, m);
}
async function Fr(s, d = {}) {
  const { width: i, height: m } = xe(s, d), h = await Dr(s, d), e = await qt(h), a = document.createElement("canvas"), n = a.getContext("2d"), u = d.pixelRatio || Ye(), w = d.canvasWidth || i, S = d.canvasHeight || m;
  return a.width = w * u, a.height = S * u, d.skipAutoScale || Ke(a), a.style.width = `${w}`, a.style.height = `${S}`, d.backgroundColor && (n.fillStyle = d.backgroundColor, n.fillRect(0, 0, a.width, a.height)), n.drawImage(e, 0, 0, a.width, a.height), a;
}
async function se(s, d = {}) {
  return (await Fr(s, d)).toDataURL();
}
const It = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box"
};
function Lr(s) {
  const d = Date.now(), i = Math.random().toString(36).slice(2, 6);
  return `screenshot-${s}-${d}-${i}.png`;
}
async function Te(s, d = {}) {
  if (!s) return null;
  try {
    return await se(s, {
      pixelRatio: d.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...d
    });
  } catch (i) {
    return console.error("captureElement failed:", i), null;
  }
}
async function Ur(s = {}) {
  const d = document.documentElement;
  return Te(d, {
    width: window.innerWidth,
    height: window.innerHeight,
    style: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: "hidden"
    },
    ...s
  });
}
async function Nr(s = {}) {
  const d = document.documentElement, i = d.style.overflow, m = d.style.width, h = d.style.height;
  try {
    return d.style.overflow = "visible", d.style.width = "auto", d.style.height = "auto", await se(d, {
      pixelRatio: s.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...s
    });
  } catch (e) {
    return console.error("captureFullPage failed:", e), null;
  } finally {
    d.style.overflow = i, d.style.width = m, d.style.height = h;
  }
}
async function jr(s, d = {}) {
  if (!s || s.width < 1 || s.height < 1) return null;
  const i = document.documentElement, m = i.style.overflow, h = i.style.width, e = i.style.height;
  try {
    i.style.overflow = "visible", i.style.width = "auto", i.style.height = "auto";
    const a = await se(i, {
      pixelRatio: d.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...d
    });
    return Mr(a, s);
  } catch (a) {
    return console.error("captureBox failed:", a), null;
  } finally {
    i.style.overflow = m, i.style.width = h, i.style.height = e;
  }
}
function Mr(s, d) {
  return new Promise((i, m) => {
    const h = new Image();
    h.onload = () => {
      const e = document.createElement("canvas"), a = window.devicePixelRatio || 1;
      e.width = Math.round(d.width * a), e.height = Math.round(d.height * a), e.getContext("2d").drawImage(
        h,
        d.x * a,
        d.y * a,
        d.width * a,
        d.height * a,
        0,
        0,
        e.width,
        e.height
      ), i(e.toDataURL("image/png"));
    }, h.onerror = m, h.src = s;
  });
}
async function Wr(s) {
  return (await fetch(s)).blob();
}
async function $r(s, d, i) {
  if (!i) return null;
  try {
    const m = await Wr(s);
    return await i(m, d);
  } catch (m) {
    return console.error("uploadScreenshot failed:", m), null;
  }
}
const Zr = (s, d) => {
  const i = s.__vccOpts || s;
  for (const [m, h] of d)
    i[m] = h;
  return i;
}, Hr = { class: "toolbar-left" }, Vr = { class: "toolbar-right" }, Gr = { class: "highlight-label" }, Xr = { class: "highlight-label" }, Yr = { class: "review-target-info" }, Kr = {
  key: 0,
  class: "target-desc"
}, qr = {
  key: 1,
  class: "target-desc"
}, Jr = { class: "text-muted" }, Qr = { class: "text-muted" }, tn = { class: "review-list-actions" }, en = {
  key: 1,
  class: "review-list"
}, rn = { class: "review-item-header" }, nn = { class: "review-item-title" }, an = { class: "review-item-tags" }, sn = { class: "review-item-target" }, on = { class: "review-item-suggestion" }, ln = { class: "review-item-meta" }, un = { class: "text-muted" }, cn = { class: "review-item-actions" }, hn = {
  __name: "ReviewTool",
  props: {
    active: { type: Boolean, default: !1 },
    pagePath: { type: String, default: "" },
    pageName: { type: String, default: "" },
    storageKey: { type: String, default: "page-reviews" },
    imageUpload: { type: Function, default: null },
    enableZipExport: { type: Boolean, default: !0 }
  },
  emits: ["update:active", "add", "update", "delete", "clear", "export"],
  setup(s, { expose: d, emit: i }) {
    const m = s, h = i, e = jt(() => m.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: a, getPageReviews: n, addReview: u, updateReview: w, deleteReview: S, clearPageReviews: y, exportToJSON: x, exportToMarkdown: l, exportToZIP: _ } = We({
      storageKey: m.storageKey,
      defaultPagePath: () => e.value
    }), o = jt(() => n(e.value)), p = bt("element"), c = bt(!1), g = bt(!1), k = bt(null), R = bt(""), C = bt(null), L = bt(null), F = bt(!1), j = bt({ x: 0, y: 0 }), P = bt({ x: 0, y: 0 }), Z = bt(!1), J = bt({ x: 0, y: 0 }), b = bt([]), z = bt({
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
      pageName: ""
    }), r = jt(() => z.value.title.trim() && z.value.suggestion.trim()), N = jt(() => {
      if (!L.value) return {};
      const I = L.value;
      return {
        left: I.x + "px",
        top: I.y + "px",
        width: I.width + "px",
        height: I.height + "px"
      };
    }), et = jt(() => {
      const { x: I, y: T } = P.value;
      return {
        transform: `translate(calc(-50% + ${I}px), ${T}px)`
      };
    });
    function $(I) {
      return I ? {
        left: I.x + "px",
        top: I.y + "px",
        width: I.width + "px",
        height: I.height + "px"
      } : {};
    }
    function it(I) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[I] || "info";
    }
    function H(I) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[I] || I;
    }
    function tt() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: e.value,
        pageUrl: window.location.href,
        pageName: m.pageName || e.value
      };
    }
    function B(I) {
      var q;
      if (I.id) return "#" + I.id;
      if (I.className) {
        const st = String(I.className).split(/\s+/).filter((gt) => gt && !gt.startsWith("el-")).slice(0, 2);
        if (st.length) return I.tagName.toLowerCase() + "." + st.join(".");
      }
      let T = [], K = I;
      for (; K && K !== document.body; ) {
        let st = K.tagName.toLowerCase();
        if (K.id) {
          st += "#" + K.id, T.unshift(st);
          break;
        }
        const wt = Array.from(((q = K.parentNode) == null ? void 0 : q.children) || []).filter((Ct) => Ct.tagName === K.tagName);
        if (wt.length > 1) {
          const Ct = wt.indexOf(K) + 1;
          st += `:nth-of-type(${Ct})`;
        }
        T.unshift(st), K = K.parentNode;
      }
      return T.join(" > ");
    }
    function O(I) {
      const T = document.elementFromPoint(I.clientX, I.clientY);
      return !T || T.closest(".review-overlay") ? null : T;
    }
    function Q(I) {
      if (Z.value || p.value !== "element" || c.value || F.value) return;
      const T = O(I);
      if (!T) {
        k.value = null;
        return;
      }
      const K = T.getBoundingClientRect();
      k.value = {
        x: K.left + window.scrollX,
        y: K.top + window.scrollY,
        width: K.width,
        height: K.height
      }, R.value = T.tagName.toLowerCase();
    }
    function Y() {
      k.value = null;
    }
    function G(I) {
      var q;
      if (p.value !== "element" || c.value || F.value) return;
      const T = O(I);
      if (!T) return;
      I.preventDefault(), I.stopPropagation();
      const K = T.getBoundingClientRect();
      C.value = {
        el: T,
        selector: B(T),
        tag: T.tagName.toLowerCase(),
        text: ((q = T.innerText) == null ? void 0 : q.slice(0, 40)) || "",
        rect: {
          x: K.left + window.scrollX,
          y: K.top + window.scrollY,
          width: K.width,
          height: K.height
        }
      }, U("element");
    }
    function ut(I) {
      Z.value || p.value !== "viewport" || c.value || (F.value = !0, j.value = { x: I.clientX + window.scrollX, y: I.clientY + window.scrollY }, L.value = { x: j.value.x, y: j.value.y, width: 0, height: 0 });
    }
    function pt(I) {
      if (Z.value || !F.value) return;
      const T = I.clientX + window.scrollX, K = I.clientY + window.scrollY;
      L.value = {
        x: Math.min(j.value.x, T),
        y: Math.min(j.value.y, K),
        width: Math.abs(T - j.value.x),
        height: Math.abs(K - j.value.y)
      };
    }
    function at(I) {
      if (Z.value) {
        Z.value = !1;
        return;
      }
      F.value && (F.value = !1, L.value && L.value.width > 10 && L.value.height > 10 && U("viewport", { ...L.value }), L.value = null);
    }
    function lt(I) {
      var K, q;
      ((K = I.target.classList) != null && K.contains("toolbar-title") || (q = I.target.classList) != null && q.contains("review-toolbar")) && (Z.value = !0, J.value = {
        x: I.clientX - P.value.x,
        y: I.clientY - P.value.y
      });
    }
    function dt(I) {
      Z.value && (P.value = {
        x: I.clientX - J.value.x,
        y: I.clientY - J.value.y
      });
    }
    function ct(I) {
      I.key === "Escape" && (c.value ? c.value = !1 : W());
    }
    function Et() {
    }
    const xt = jt(() => z.value.type === "element" ? [
      { value: It.ELEMENT, label: "选中元素" },
      { value: It.VIEWPORT, label: "当前视口" },
      { value: It.FULL_PAGE, label: "完整页面" }
    ] : [
      { value: It.BOX, label: "框选区域" },
      { value: It.VIEWPORT, label: "当前视口" },
      { value: It.FULL_PAGE, label: "完整页面" }
    ]);
    async function t() {
      var T;
      const I = [];
      for (const K of b.value) {
        let q = null;
        if (K === It.ELEMENT && ((T = C.value) != null && T.el) ? q = await Te(C.value.el) : K === It.BOX && z.value.viewportRect ? q = await jr(z.value.viewportRect) : K === It.VIEWPORT ? q = await Ur() : K === It.FULL_PAGE && (q = await Nr()), q) {
          const st = Lr(K);
          let gt = null;
          m.imageUpload && (gt = await $r(q, st, m.imageUpload)), I.push({
            type: K,
            filename: st,
            data: gt ? void 0 : q,
            url: gt || void 0
          });
        }
      }
      return I;
    }
    function U(I, T = null) {
      var q, st, gt;
      const K = tt();
      z.value = {
        type: I,
        title: "",
        severity: "medium",
        suggestion: "",
        selector: ((q = C.value) == null ? void 0 : q.selector) || "",
        elementText: ((st = C.value) == null ? void 0 : st.text) || "",
        elementRect: ((gt = C.value) == null ? void 0 : gt.rect) || null,
        viewportRect: T,
        viewport: K.viewport,
        scroll: K.scroll,
        pagePath: K.pagePath,
        pageUrl: K.pageUrl,
        pageName: K.pageName
      }, b.value = [], c.value = !0;
    }
    function D() {
      C.value = null, L.value = null, b.value = [], z.value = {
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
        pageName: ""
      };
    }
    async function v() {
      if (!r.value) return;
      const I = await t(), T = u({
        type: z.value.type,
        title: z.value.title.trim(),
        severity: z.value.severity,
        suggestion: z.value.suggestion.trim(),
        selector: z.value.selector,
        elementText: z.value.elementText,
        elementRect: z.value.elementRect,
        viewportRect: z.value.viewportRect,
        viewport: z.value.viewport,
        scroll: z.value.scroll,
        pagePath: z.value.pagePath,
        pageUrl: z.value.pageUrl,
        pageName: z.value.pageName,
        status: "open",
        screenshots: I
      });
      c.value = !1, h("add", T);
    }
    function f(I) {
      w(I, { status: "resolved" }), h("update", { id: I, status: "resolved" });
    }
    function E(I) {
      fe.confirm("确定删除这条评审意见吗？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        S(I), h("delete", { id: I });
      });
    }
    function M() {
      o.value.length !== 0 && fe.confirm("确定清空当前页面的所有评审意见吗？", "清空确认", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        y(e.value), h("clear", { pagePath: e.value });
      });
    }
    function W() {
      h("update:active", !1);
    }
    function A() {
      document.addEventListener("mousemove", Q), document.addEventListener("mouseout", Y), document.addEventListener("click", G, !0), document.addEventListener("mousedown", ut), document.addEventListener("mousemove", pt), document.addEventListener("mousemove", dt), document.addEventListener("mouseup", at), document.addEventListener("keydown", ct);
    }
    function V() {
      document.removeEventListener("mousemove", Q), document.removeEventListener("mouseout", Y), document.removeEventListener("click", G, !0), document.removeEventListener("mousedown", ut), document.removeEventListener("mousemove", pt), document.removeEventListener("mousemove", dt), document.removeEventListener("mouseup", at), document.removeEventListener("keydown", ct);
    }
    Pe(() => {
      m.active && A();
    }), ue(() => {
      V();
    });
    let X = null;
    return Be(() => {
      X = De(() => m.active, (I) => {
        I ? (A(), p.value = "element") : (V(), D(), k.value = null, g.value = !1);
      });
    }), ue(() => {
      X && X();
    }), d({
      reviews: a,
      pageReviews: o,
      addReview: u,
      updateReview: w,
      deleteReview: S,
      clearPageReviews: y,
      exportToJSON: x,
      exportToMarkdown: l
    }), (I, T) => {
      const K = vt("el-radio-button"), q = vt("el-radio-group"), st = vt("el-button"), gt = vt("el-badge"), wt = vt("el-dropdown-item"), Ct = vt("el-dropdown-menu"), ft = vt("el-dropdown"), Ot = vt("el-tag"), Rt = vt("el-form-item"), zt = vt("el-checkbox"), $t = vt("el-checkbox-group"), Zt = vt("el-input"), Ut = vt("el-radio"), Qt = vt("el-form"), Ht = vt("el-dialog"), Bt = vt("el-empty"), Nt = vt("el-card"), Oe = vt("el-drawer");
      return yt(), Dt(Fe, { to: "body" }, [
        s.active ? (yt(), Tt("div", {
          key: 0,
          class: "review-overlay",
          onClick: Et
        }, [
          _t("div", {
            class: Ue(["review-toolbar", { "is-dragging": Z.value }]),
            style: Vt(et.value),
            onClick: T[2] || (T[2] = Le(() => {
            }, ["stop"])),
            onMousedown: lt
          }, [
            _t("div", Hr, [
              T[12] || (T[12] = _t("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              ot(q, {
                modelValue: p.value,
                "onUpdate:modelValue": T[0] || (T[0] = (rt) => p.value = rt),
                size: "small"
              }, {
                default: nt(() => [
                  ot(K, { label: "element" }, {
                    default: nt(() => [...T[10] || (T[10] = [
                      ht("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  ot(K, { label: "viewport" }, {
                    default: nt(() => [...T[11] || (T[11] = [
                      ht("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _t("div", Vr, [
              ot(gt, {
                value: o.value.length,
                class: "review-badge"
              }, {
                default: nt(() => [
                  ot(st, {
                    size: "small",
                    onClick: T[1] || (T[1] = (rt) => g.value = !0)
                  }, {
                    default: nt(() => [...T[13] || (T[13] = [
                      ht("评审列表", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              ot(ft, {
                size: "small",
                "split-button": "",
                type: "primary",
                onClick: Ft(l)
              }, {
                dropdown: nt(() => [
                  ot(Ct, null, {
                    default: nt(() => [
                      ot(wt, { onClick: Ft(l) }, {
                        default: nt(() => [...T[14] || (T[14] = [
                          ht("导出为 Markdown", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      ot(wt, { onClick: Ft(x) }, {
                        default: nt(() => [...T[15] || (T[15] = [
                          ht("导出为 JSON", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      s.enableZipExport ? (yt(), Dt(wt, {
                        key: 0,
                        onClick: Ft(_)
                      }, {
                        default: nt(() => [...T[16] || (T[16] = [
                          ht("导出为 ZIP", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])) : Lt("", !0)
                    ]),
                    _: 1
                  })
                ]),
                default: nt(() => [
                  T[17] || (T[17] = ht(" 导出 ", -1))
                ]),
                _: 1
              }, 8, ["onClick"]),
              ot(st, {
                size: "small",
                type: "danger",
                onClick: W
              }, {
                default: nt(() => [...T[18] || (T[18] = [
                  ht("退出评审", -1)
                ])]),
                _: 1
              })
            ])
          ], 38),
          k.value && p.value === "element" && !c.value ? (yt(), Tt("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: Vt($(k.value))
          }, [
            _t("span", Gr, mt(R.value), 1)
          ], 4)) : Lt("", !0),
          C.value && p.value === "element" ? (yt(), Tt("div", {
            key: 1,
            class: "highlight-box selected-box",
            style: Vt($(C.value.rect))
          }, [
            _t("span", Xr, "已选：" + mt(C.value.tag), 1)
          ], 4)) : Lt("", !0),
          L.value || z.value.type === "viewport" && z.value.viewportRect && c.value ? (yt(), Tt("div", {
            key: 2,
            class: "drag-rect",
            style: Vt(L.value ? N.value : $(z.value.viewportRect))
          }, null, 4)) : Lt("", !0),
          ot(Ht, {
            modelValue: c.value,
            "onUpdate:modelValue": T[8] || (T[8] = (rt) => c.value = rt),
            title: "添加评审意见",
            width: "520px",
            "close-on-click-modal": !1,
            onClosed: D
          }, {
            footer: nt(() => [
              ot(st, {
                onClick: T[7] || (T[7] = (rt) => c.value = !1)
              }, {
                default: nt(() => [...T[23] || (T[23] = [
                  ht("取消", -1)
                ])]),
                _: 1
              }),
              ot(st, {
                type: "primary",
                disabled: !r.value,
                onClick: v
              }, {
                default: nt(() => [...T[24] || (T[24] = [
                  ht("保存评审", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            default: nt(() => [
              ot(Qt, {
                model: z.value,
                "label-width": "80px"
              }, {
                default: nt(() => [
                  ot(Rt, { label: "评审位置" }, {
                    default: nt(() => {
                      var rt, At, oe, le;
                      return [
                        _t("div", Yr, [
                          ot(Ot, { size: "small" }, {
                            default: nt(() => [
                              ht(mt(z.value.type === "element" ? "元素" : "视图范围"), 1)
                            ]),
                            _: 1
                          }),
                          z.value.type === "element" ? (yt(), Tt("span", Kr, mt(z.value.elementText || z.value.selector), 1)) : (yt(), Tt("span", qr, " 框选区域 x=" + mt((rt = z.value.viewportRect) == null ? void 0 : rt.x) + ", y=" + mt((At = z.value.viewportRect) == null ? void 0 : At.y) + ", w=" + mt((oe = z.value.viewportRect) == null ? void 0 : oe.width) + ", h=" + mt((le = z.value.viewportRect) == null ? void 0 : le.height), 1))
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  ot(Rt, { label: "窗口尺寸" }, {
                    default: nt(() => {
                      var rt, At;
                      return [
                        _t("span", Jr, mt((rt = z.value.viewport) == null ? void 0 : rt.width) + " × " + mt((At = z.value.viewport) == null ? void 0 : At.height), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ot(Rt, { label: "滚动位置" }, {
                    default: nt(() => {
                      var rt, At;
                      return [
                        _t("span", Qr, "x=" + mt((rt = z.value.scroll) == null ? void 0 : rt.x) + ", y=" + mt((At = z.value.scroll) == null ? void 0 : At.y), 1)
                      ];
                    }),
                    _: 1
                  }),
                  ot(Rt, { label: "截图" }, {
                    default: nt(() => [
                      ot($t, {
                        modelValue: b.value,
                        "onUpdate:modelValue": T[3] || (T[3] = (rt) => b.value = rt)
                      }, {
                        default: nt(() => [
                          (yt(!0), Tt(ce, null, he(xt.value, (rt) => (yt(), Dt(zt, {
                            key: rt.value,
                            label: rt.value
                          }, {
                            default: nt(() => [
                              ht(mt(rt.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ot(Rt, {
                    label: "标题",
                    required: ""
                  }, {
                    default: nt(() => [
                      ot(Zt, {
                        modelValue: z.value.title,
                        "onUpdate:modelValue": T[4] || (T[4] = (rt) => z.value.title = rt),
                        placeholder: "例如：按钮样式不统一"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ot(Rt, {
                    label: "严重等级",
                    required: ""
                  }, {
                    default: nt(() => [
                      ot(q, {
                        modelValue: z.value.severity,
                        "onUpdate:modelValue": T[5] || (T[5] = (rt) => z.value.severity = rt)
                      }, {
                        default: nt(() => [
                          ot(Ut, { label: "low" }, {
                            default: nt(() => [...T[19] || (T[19] = [
                              ht("低", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Ut, { label: "medium" }, {
                            default: nt(() => [...T[20] || (T[20] = [
                              ht("中", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Ut, { label: "high" }, {
                            default: nt(() => [...T[21] || (T[21] = [
                              ht("高", -1)
                            ])]),
                            _: 1
                          }),
                          ot(Ut, { label: "critical" }, {
                            default: nt(() => [...T[22] || (T[22] = [
                              ht("严重", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  ot(Rt, {
                    label: "评审建议",
                    required: ""
                  }, {
                    default: nt(() => [
                      ot(Zt, {
                        modelValue: z.value.suggestion,
                        "onUpdate:modelValue": T[6] || (T[6] = (rt) => z.value.suggestion = rt),
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
          ot(Oe, {
            modelValue: g.value,
            "onUpdate:modelValue": T[9] || (T[9] = (rt) => g.value = rt),
            title: "当前页面评审意见",
            size: "480px",
            "with-header": !0
          }, {
            default: nt(() => [
              _t("div", tn, [
                ot(st, {
                  size: "small",
                  type: "primary",
                  onClick: Ft(l)
                }, {
                  default: nt(() => [...T[25] || (T[25] = [
                    ht("导出 Markdown", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                ot(st, {
                  size: "small",
                  onClick: Ft(x)
                }, {
                  default: nt(() => [...T[26] || (T[26] = [
                    ht("导出 JSON", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"]),
                s.enableZipExport ? (yt(), Dt(st, {
                  key: 0,
                  size: "small",
                  onClick: Ft(_)
                }, {
                  default: nt(() => [...T[27] || (T[27] = [
                    ht("导出 ZIP", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : Lt("", !0),
                ot(st, {
                  size: "small",
                  type: "danger",
                  text: "",
                  onClick: M
                }, {
                  default: nt(() => [...T[28] || (T[28] = [
                    ht("清空本页", -1)
                  ])]),
                  _: 1
                })
              ]),
              o.value.length === 0 ? (yt(), Dt(Bt, {
                key: 0,
                description: "暂无评审意见"
              })) : (yt(), Tt("div", en, [
                (yt(!0), Tt(ce, null, he(o.value, (rt) => (yt(), Dt(Nt, {
                  key: rt.id,
                  class: "review-item",
                  shadow: "never"
                }, {
                  default: nt(() => [
                    _t("div", rn, [
                      _t("span", nn, mt(rt.title), 1),
                      _t("div", an, [
                        ot(Ot, {
                          size: "small",
                          type: it(rt.severity)
                        }, {
                          default: nt(() => [
                            ht(mt(H(rt.severity)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        ot(Ot, {
                          size: "small",
                          type: "info"
                        }, {
                          default: nt(() => [
                            ht(mt(rt.type === "element" ? "元素" : "视图"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _t("p", sn, mt(rt.type === "element" ? rt.elementText || rt.selector : `框选 x=${rt.viewportRect.x}, y=${rt.viewportRect.y}`), 1),
                    _t("p", on, mt(rt.suggestion), 1),
                    _t("div", ln, [
                      _t("span", un, mt(new Date(rt.createdAt).toLocaleString()), 1),
                      _t("div", cn, [
                        rt.status !== "resolved" ? (yt(), Dt(st, {
                          key: 0,
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: (At) => f(rt.id)
                        }, {
                          default: nt(() => [...T[29] || (T[29] = [
                            ht("标记解决", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])) : Lt("", !0),
                        ot(st, {
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: (At) => E(rt.id)
                        }, {
                          default: nt(() => [...T[30] || (T[30] = [
                            ht("删除", -1)
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
        ])) : Lt("", !0)
      ]);
    };
  }
}, pn = /* @__PURE__ */ Zr(hn, [["__scopeId", "data-v-a7bc50a1"]]);
export {
  pn as ReviewTool,
  pn as default,
  We as usePageReview
};
