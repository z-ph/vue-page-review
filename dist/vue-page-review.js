import { ref as vt, watchEffect as Qt, unref as G, computed as Bt, watch as xe, onMounted as _r, openBlock as pt, createBlock as Lt, Teleport as xr, createElementBlock as xt, createElementVNode as rt, withModifiers as Ut, normalizeStyle as Mt, normalizeClass as me, createVNode as ct, withCtx as lt, createTextVNode as ht, createCommentVNode as At, toDisplayString as St, Fragment as Ht, renderList as Gt } from "vue";
import { ElRadioGroup as kr, ElRadioButton as Le, ElBadge as Sr, ElButton as Tt, ElDropdown as Er, ElIcon as zr, ElDropdownMenu as Cr, ElDropdownItem as Yt, ElDialog as Fe, ElTag as ne, ElCheckboxGroup as Rr, ElCheckbox as ge, ElInput as Ne, ElSelect as Ar, ElOption as ie, ElDrawer as Ue, ElEmpty as Me, ElCard as Tr } from "element-plus";
import { ArrowDown as Ir } from "@element-plus/icons-vue";
var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Or(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function se(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
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
(function(t, l) {
  (function(i) {
    t.exports = i();
  })(function() {
    return function i(d, o, r) {
      function n(y, k) {
        if (!o[y]) {
          if (!d[y]) {
            var b = typeof se == "function" && se;
            if (!k && b) return b(y, !0);
            if (a) return a(y, !0);
            var _ = new Error("Cannot find module '" + y + "'");
            throw _.code = "MODULE_NOT_FOUND", _;
          }
          var h = o[y] = { exports: {} };
          d[y][0].call(h.exports, function(v) {
            var u = d[y][1][v];
            return n(u || v);
          }, h, h.exports, i, d, o, r);
        }
        return o[y].exports;
      }
      for (var a = typeof se == "function" && se, f = 0; f < r.length; f++) n(r[f]);
      return n;
    }({ 1: [function(i, d, o) {
      var r = i("./utils"), n = i("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      o.encode = function(f) {
        for (var y, k, b, _, h, v, u, g = [], c = 0, p = f.length, x = p, E = r.getTypeOf(f) !== "string"; c < f.length; ) x = p - c, b = E ? (y = f[c++], k = c < p ? f[c++] : 0, c < p ? f[c++] : 0) : (y = f.charCodeAt(c++), k = c < p ? f.charCodeAt(c++) : 0, c < p ? f.charCodeAt(c++) : 0), _ = y >> 2, h = (3 & y) << 4 | k >> 4, v = 1 < x ? (15 & k) << 2 | b >> 6 : 64, u = 2 < x ? 63 & b : 64, g.push(a.charAt(_) + a.charAt(h) + a.charAt(v) + a.charAt(u));
        return g.join("");
      }, o.decode = function(f) {
        var y, k, b, _, h, v, u = 0, g = 0, c = "data:";
        if (f.substr(0, c.length) === c) throw new Error("Invalid base64 input, it looks like a data url.");
        var p, x = 3 * (f = f.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (f.charAt(f.length - 1) === a.charAt(64) && x--, f.charAt(f.length - 2) === a.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (p = n.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); u < f.length; ) y = a.indexOf(f.charAt(u++)) << 2 | (_ = a.indexOf(f.charAt(u++))) >> 4, k = (15 & _) << 4 | (h = a.indexOf(f.charAt(u++))) >> 2, b = (3 & h) << 6 | (v = a.indexOf(f.charAt(u++))), p[g++] = y, h !== 64 && (p[g++] = k), v !== 64 && (p[g++] = b);
        return p;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(i, d, o) {
      var r = i("./external"), n = i("./stream/DataWorker"), a = i("./stream/Crc32Probe"), f = i("./stream/DataLengthProbe");
      function y(k, b, _, h, v) {
        this.compressedSize = k, this.uncompressedSize = b, this.crc32 = _, this.compression = h, this.compressedContent = v;
      }
      y.prototype = { getContentWorker: function() {
        var k = new n(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new f("data_length")), b = this;
        return k.on("end", function() {
          if (this.streamInfo.data_length !== b.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), k;
      }, getCompressedWorker: function() {
        return new n(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, y.createWorkerFrom = function(k, b, _) {
        return k.pipe(new a()).pipe(new f("uncompressedSize")).pipe(b.compressWorker(_)).pipe(new f("compressedSize")).withStreamInfo("compression", b);
      }, d.exports = y;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(i, d, o) {
      var r = i("./stream/GenericWorker");
      o.STORE = { magic: "\0\0", compressWorker: function() {
        return new r("STORE compression");
      }, uncompressWorker: function() {
        return new r("STORE decompression");
      } }, o.DEFLATE = i("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(i, d, o) {
      var r = i("./utils"), n = function() {
        for (var a, f = [], y = 0; y < 256; y++) {
          a = y;
          for (var k = 0; k < 8; k++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
          f[y] = a;
        }
        return f;
      }();
      d.exports = function(a, f) {
        return a !== void 0 && a.length ? r.getTypeOf(a) !== "string" ? function(y, k, b, _) {
          var h = n, v = _ + b;
          y ^= -1;
          for (var u = _; u < v; u++) y = y >>> 8 ^ h[255 & (y ^ k[u])];
          return -1 ^ y;
        }(0 | f, a, a.length, 0) : function(y, k, b, _) {
          var h = n, v = _ + b;
          y ^= -1;
          for (var u = _; u < v; u++) y = y >>> 8 ^ h[255 & (y ^ k.charCodeAt(u))];
          return -1 ^ y;
        }(0 | f, a, a.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(i, d, o) {
      o.base64 = !1, o.binary = !1, o.dir = !1, o.createFolders = !0, o.date = null, o.compression = null, o.compressionOptions = null, o.comment = null, o.unixPermissions = null, o.dosPermissions = null;
    }, {}], 6: [function(i, d, o) {
      var r = null;
      r = typeof Promise < "u" ? Promise : i("lie"), d.exports = { Promise: r };
    }, { lie: 37 }], 7: [function(i, d, o) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", n = i("pako"), a = i("./utils"), f = i("./stream/GenericWorker"), y = r ? "uint8array" : "array";
      function k(b, _) {
        f.call(this, "FlateWorker/" + b), this._pako = null, this._pakoAction = b, this._pakoOptions = _, this.meta = {};
      }
      o.magic = "\b\0", a.inherits(k, f), k.prototype.processChunk = function(b) {
        this.meta = b.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(y, b.data), !1);
      }, k.prototype.flush = function() {
        f.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, k.prototype.cleanUp = function() {
        f.prototype.cleanUp.call(this), this._pako = null;
      }, k.prototype._createPako = function() {
        this._pako = new n[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var b = this;
        this._pako.onData = function(_) {
          b.push({ data: _, meta: b.meta });
        };
      }, o.compressWorker = function(b) {
        return new k("Deflate", b);
      }, o.uncompressWorker = function() {
        return new k("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(i, d, o) {
      function r(h, v) {
        var u, g = "";
        for (u = 0; u < v; u++) g += String.fromCharCode(255 & h), h >>>= 8;
        return g;
      }
      function n(h, v, u, g, c, p) {
        var x, E, z = h.file, F = h.compression, D = p !== y.utf8encode, T = a.transformTo("string", p(z.name)), A = a.transformTo("string", y.utf8encode(z.name)), W = z.comment, Q = a.transformTo("string", p(W)), S = a.transformTo("string", y.utf8encode(W)), L = A.length !== z.name.length, s = S.length !== W.length, U = "", at = "", $ = "", ot = z.dir, V = z.date, it = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        v && !u || (it.crc32 = h.crc32, it.compressedSize = h.compressedSize, it.uncompressedSize = h.uncompressedSize);
        var P = 0;
        v && (P |= 8), D || !L && !s || (P |= 2048);
        var O = 0, et = 0;
        ot && (O |= 16), c === "UNIX" ? (et = 798, O |= function(K, wt) {
          var gt = K;
          return K || (gt = wt ? 16893 : 33204), (65535 & gt) << 16;
        }(z.unixPermissions, ot)) : (et = 20, O |= function(K) {
          return 63 & (K || 0);
        }(z.dosPermissions)), x = V.getUTCHours(), x <<= 6, x |= V.getUTCMinutes(), x <<= 5, x |= V.getUTCSeconds() / 2, E = V.getUTCFullYear() - 1980, E <<= 4, E |= V.getUTCMonth() + 1, E <<= 5, E |= V.getUTCDate(), L && (at = r(1, 1) + r(k(T), 4) + A, U += "up" + r(at.length, 2) + at), s && ($ = r(1, 1) + r(k(Q), 4) + S, U += "uc" + r($.length, 2) + $);
        var q = "";
        return q += `
\0`, q += r(P, 2), q += F.magic, q += r(x, 2), q += r(E, 2), q += r(it.crc32, 4), q += r(it.compressedSize, 4), q += r(it.uncompressedSize, 4), q += r(T.length, 2), q += r(U.length, 2), { fileRecord: b.LOCAL_FILE_HEADER + q + T + U, dirRecord: b.CENTRAL_FILE_HEADER + r(et, 2) + q + r(Q.length, 2) + "\0\0\0\0" + r(O, 4) + r(g, 4) + T + U + Q };
      }
      var a = i("../utils"), f = i("../stream/GenericWorker"), y = i("../utf8"), k = i("../crc32"), b = i("../signature");
      function _(h, v, u, g) {
        f.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = v, this.zipPlatform = u, this.encodeFileName = g, this.streamFiles = h, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      a.inherits(_, f), _.prototype.push = function(h) {
        var v = h.meta.percent || 0, u = this.entriesCount, g = this._sources.length;
        this.accumulate ? this.contentBuffer.push(h) : (this.bytesWritten += h.data.length, f.prototype.push.call(this, { data: h.data, meta: { currentFile: this.currentFile, percent: u ? (v + 100 * (u - g - 1)) / u : 100 } }));
      }, _.prototype.openedSource = function(h) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = h.file.name;
        var v = this.streamFiles && !h.file.dir;
        if (v) {
          var u = n(h, v, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: u.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, _.prototype.closedSource = function(h) {
        this.accumulate = !1;
        var v = this.streamFiles && !h.file.dir, u = n(h, v, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(u.dirRecord), v) this.push({ data: function(g) {
          return b.DATA_DESCRIPTOR + r(g.crc32, 4) + r(g.compressedSize, 4) + r(g.uncompressedSize, 4);
        }(h), meta: { percent: 100 } });
        else for (this.push({ data: u.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, _.prototype.flush = function() {
        for (var h = this.bytesWritten, v = 0; v < this.dirRecords.length; v++) this.push({ data: this.dirRecords[v], meta: { percent: 100 } });
        var u = this.bytesWritten - h, g = function(c, p, x, E, z) {
          var F = a.transformTo("string", z(E));
          return b.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(c, 2) + r(c, 2) + r(p, 4) + r(x, 4) + r(F.length, 2) + F;
        }(this.dirRecords.length, u, h, this.zipComment, this.encodeFileName);
        this.push({ data: g, meta: { percent: 100 } });
      }, _.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, _.prototype.registerPrevious = function(h) {
        this._sources.push(h);
        var v = this;
        return h.on("data", function(u) {
          v.processChunk(u);
        }), h.on("end", function() {
          v.closedSource(v.previous.streamInfo), v._sources.length ? v.prepareNextSource() : v.end();
        }), h.on("error", function(u) {
          v.error(u);
        }), this;
      }, _.prototype.resume = function() {
        return !!f.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, _.prototype.error = function(h) {
        var v = this._sources;
        if (!f.prototype.error.call(this, h)) return !1;
        for (var u = 0; u < v.length; u++) try {
          v[u].error(h);
        } catch {
        }
        return !0;
      }, _.prototype.lock = function() {
        f.prototype.lock.call(this);
        for (var h = this._sources, v = 0; v < h.length; v++) h[v].lock();
      }, d.exports = _;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(i, d, o) {
      var r = i("../compressions"), n = i("./ZipFileWorker");
      o.generateWorker = function(a, f, y) {
        var k = new n(f.streamFiles, y, f.platform, f.encodeFileName), b = 0;
        try {
          a.forEach(function(_, h) {
            b++;
            var v = function(p, x) {
              var E = p || x, z = r[E];
              if (!z) throw new Error(E + " is not a valid compression method !");
              return z;
            }(h.options.compression, f.compression), u = h.options.compressionOptions || f.compressionOptions || {}, g = h.dir, c = h.date;
            h._compressWorker(v, u).withStreamInfo("file", { name: _, dir: g, date: c, comment: h.comment || "", unixPermissions: h.unixPermissions, dosPermissions: h.dosPermissions }).pipe(k);
          }), k.entriesCount = b;
        } catch (_) {
          k.error(_);
        }
        return k;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(i, d, o) {
      function r() {
        if (!(this instanceof r)) return new r();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var n = new r();
          for (var a in this) typeof this[a] != "function" && (n[a] = this[a]);
          return n;
        };
      }
      (r.prototype = i("./object")).loadAsync = i("./load"), r.support = i("./support"), r.defaults = i("./defaults"), r.version = "3.10.1", r.loadAsync = function(n, a) {
        return new r().loadAsync(n, a);
      }, r.external = i("./external"), d.exports = r;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(i, d, o) {
      var r = i("./utils"), n = i("./external"), a = i("./utf8"), f = i("./zipEntries"), y = i("./stream/Crc32Probe"), k = i("./nodejsUtils");
      function b(_) {
        return new n.Promise(function(h, v) {
          var u = _.decompressed.getContentWorker().pipe(new y());
          u.on("error", function(g) {
            v(g);
          }).on("end", function() {
            u.streamInfo.crc32 !== _.decompressed.crc32 ? v(new Error("Corrupted zip : CRC32 mismatch")) : h();
          }).resume();
        });
      }
      d.exports = function(_, h) {
        var v = this;
        return h = r.extend(h || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: a.utf8decode }), k.isNode && k.isStream(_) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", _, !0, h.optimizedBinaryString, h.base64).then(function(u) {
          var g = new f(h);
          return g.load(u), g;
        }).then(function(u) {
          var g = [n.Promise.resolve(u)], c = u.files;
          if (h.checkCRC32) for (var p = 0; p < c.length; p++) g.push(b(c[p]));
          return n.Promise.all(g);
        }).then(function(u) {
          for (var g = u.shift(), c = g.files, p = 0; p < c.length; p++) {
            var x = c[p], E = x.fileNameStr, z = r.resolve(x.fileNameStr);
            v.file(z, x.decompressed, { binary: !0, optimizedBinaryString: !0, date: x.date, dir: x.dir, comment: x.fileCommentStr.length ? x.fileCommentStr : null, unixPermissions: x.unixPermissions, dosPermissions: x.dosPermissions, createFolders: h.createFolders }), x.dir || (v.file(z).unsafeOriginalName = E);
          }
          return g.zipComment.length && (v.comment = g.zipComment), v;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(i, d, o) {
      var r = i("../utils"), n = i("../stream/GenericWorker");
      function a(f, y) {
        n.call(this, "Nodejs stream input adapter for " + f), this._upstreamEnded = !1, this._bindStream(y);
      }
      r.inherits(a, n), a.prototype._bindStream = function(f) {
        var y = this;
        (this._stream = f).pause(), f.on("data", function(k) {
          y.push({ data: k, meta: { percent: 0 } });
        }).on("error", function(k) {
          y.isPaused ? this.generatedError = k : y.error(k);
        }).on("end", function() {
          y.isPaused ? y._upstreamEnded = !0 : y.end();
        });
      }, a.prototype.pause = function() {
        return !!n.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, a.prototype.resume = function() {
        return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, d.exports = a;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(i, d, o) {
      var r = i("readable-stream").Readable;
      function n(a, f, y) {
        r.call(this, f), this._helper = a;
        var k = this;
        a.on("data", function(b, _) {
          k.push(b) || k._helper.pause(), y && y(_);
        }).on("error", function(b) {
          k.emit("error", b);
        }).on("end", function() {
          k.push(null);
        });
      }
      i("../utils").inherits(n, r), n.prototype._read = function() {
        this._helper.resume();
      }, d.exports = n;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(i, d, o) {
      d.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(r, n) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(r, n);
        if (typeof r == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(r, n);
      }, allocBuffer: function(r) {
        if (Buffer.alloc) return Buffer.alloc(r);
        var n = new Buffer(r);
        return n.fill(0), n;
      }, isBuffer: function(r) {
        return Buffer.isBuffer(r);
      }, isStream: function(r) {
        return r && typeof r.on == "function" && typeof r.pause == "function" && typeof r.resume == "function";
      } };
    }, {}], 15: [function(i, d, o) {
      function r(z, F, D) {
        var T, A = a.getTypeOf(F), W = a.extend(D || {}, k);
        W.date = W.date || /* @__PURE__ */ new Date(), W.compression !== null && (W.compression = W.compression.toUpperCase()), typeof W.unixPermissions == "string" && (W.unixPermissions = parseInt(W.unixPermissions, 8)), W.unixPermissions && 16384 & W.unixPermissions && (W.dir = !0), W.dosPermissions && 16 & W.dosPermissions && (W.dir = !0), W.dir && (z = c(z)), W.createFolders && (T = g(z)) && p.call(this, T, !0);
        var Q = A === "string" && W.binary === !1 && W.base64 === !1;
        D && D.binary !== void 0 || (W.binary = !Q), (F instanceof b && F.uncompressedSize === 0 || W.dir || !F || F.length === 0) && (W.base64 = !1, W.binary = !0, F = "", W.compression = "STORE", A = "string");
        var S = null;
        S = F instanceof b || F instanceof f ? F : v.isNode && v.isStream(F) ? new u(z, F) : a.prepareContent(z, F, W.binary, W.optimizedBinaryString, W.base64);
        var L = new _(z, S, W);
        this.files[z] = L;
      }
      var n = i("./utf8"), a = i("./utils"), f = i("./stream/GenericWorker"), y = i("./stream/StreamHelper"), k = i("./defaults"), b = i("./compressedObject"), _ = i("./zipObject"), h = i("./generate"), v = i("./nodejsUtils"), u = i("./nodejs/NodejsStreamInputAdapter"), g = function(z) {
        z.slice(-1) === "/" && (z = z.substring(0, z.length - 1));
        var F = z.lastIndexOf("/");
        return 0 < F ? z.substring(0, F) : "";
      }, c = function(z) {
        return z.slice(-1) !== "/" && (z += "/"), z;
      }, p = function(z, F) {
        return F = F !== void 0 ? F : k.createFolders, z = c(z), this.files[z] || r.call(this, z, null, { dir: !0, createFolders: F }), this.files[z];
      };
      function x(z) {
        return Object.prototype.toString.call(z) === "[object RegExp]";
      }
      var E = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(z) {
        var F, D, T;
        for (F in this.files) T = this.files[F], (D = F.slice(this.root.length, F.length)) && F.slice(0, this.root.length) === this.root && z(D, T);
      }, filter: function(z) {
        var F = [];
        return this.forEach(function(D, T) {
          z(D, T) && F.push(T);
        }), F;
      }, file: function(z, F, D) {
        if (arguments.length !== 1) return z = this.root + z, r.call(this, z, F, D), this;
        if (x(z)) {
          var T = z;
          return this.filter(function(W, Q) {
            return !Q.dir && T.test(W);
          });
        }
        var A = this.files[this.root + z];
        return A && !A.dir ? A : null;
      }, folder: function(z) {
        if (!z) return this;
        if (x(z)) return this.filter(function(A, W) {
          return W.dir && z.test(A);
        });
        var F = this.root + z, D = p.call(this, F), T = this.clone();
        return T.root = D.name, T;
      }, remove: function(z) {
        z = this.root + z;
        var F = this.files[z];
        if (F || (z.slice(-1) !== "/" && (z += "/"), F = this.files[z]), F && !F.dir) delete this.files[z];
        else for (var D = this.filter(function(A, W) {
          return W.name.slice(0, z.length) === z;
        }), T = 0; T < D.length; T++) delete this.files[D[T].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(z) {
        var F, D = {};
        try {
          if ((D = a.extend(z || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: n.utf8encode })).type = D.type.toLowerCase(), D.compression = D.compression.toUpperCase(), D.type === "binarystring" && (D.type = "string"), !D.type) throw new Error("No output type specified.");
          a.checkSupport(D.type), D.platform !== "darwin" && D.platform !== "freebsd" && D.platform !== "linux" && D.platform !== "sunos" || (D.platform = "UNIX"), D.platform === "win32" && (D.platform = "DOS");
          var T = D.comment || this.comment || "";
          F = h.generateWorker(this, D, T);
        } catch (A) {
          (F = new f("error")).error(A);
        }
        return new y(F, D.type || "string", D.mimeType);
      }, generateAsync: function(z, F) {
        return this.generateInternalStream(z).accumulate(F);
      }, generateNodeStream: function(z, F) {
        return (z = z || {}).type || (z.type = "nodebuffer"), this.generateInternalStream(z).toNodejsStream(F);
      } };
      d.exports = E;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(i, d, o) {
      d.exports = i("stream");
    }, { stream: void 0 }], 17: [function(i, d, o) {
      var r = i("./DataReader");
      function n(a) {
        r.call(this, a);
        for (var f = 0; f < this.data.length; f++) a[f] = 255 & a[f];
      }
      i("../utils").inherits(n, r), n.prototype.byteAt = function(a) {
        return this.data[this.zero + a];
      }, n.prototype.lastIndexOfSignature = function(a) {
        for (var f = a.charCodeAt(0), y = a.charCodeAt(1), k = a.charCodeAt(2), b = a.charCodeAt(3), _ = this.length - 4; 0 <= _; --_) if (this.data[_] === f && this.data[_ + 1] === y && this.data[_ + 2] === k && this.data[_ + 3] === b) return _ - this.zero;
        return -1;
      }, n.prototype.readAndCheckSignature = function(a) {
        var f = a.charCodeAt(0), y = a.charCodeAt(1), k = a.charCodeAt(2), b = a.charCodeAt(3), _ = this.readData(4);
        return f === _[0] && y === _[1] && k === _[2] && b === _[3];
      }, n.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return [];
        var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, f;
      }, d.exports = n;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(i, d, o) {
      var r = i("../utils");
      function n(a) {
        this.data = a, this.length = a.length, this.index = 0, this.zero = 0;
      }
      n.prototype = { checkOffset: function(a) {
        this.checkIndex(this.index + a);
      }, checkIndex: function(a) {
        if (this.length < this.zero + a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
      }, setIndex: function(a) {
        this.checkIndex(a), this.index = a;
      }, skip: function(a) {
        this.setIndex(this.index + a);
      }, byteAt: function() {
      }, readInt: function(a) {
        var f, y = 0;
        for (this.checkOffset(a), f = this.index + a - 1; f >= this.index; f--) y = (y << 8) + this.byteAt(f);
        return this.index += a, y;
      }, readString: function(a) {
        return r.transformTo("string", this.readData(a));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var a = this.readInt(4);
        return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
      } }, d.exports = n;
    }, { "../utils": 32 }], 19: [function(i, d, o) {
      var r = i("./Uint8ArrayReader");
      function n(a) {
        r.call(this, a);
      }
      i("../utils").inherits(n, r), n.prototype.readData = function(a) {
        this.checkOffset(a);
        var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, f;
      }, d.exports = n;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(i, d, o) {
      var r = i("./DataReader");
      function n(a) {
        r.call(this, a);
      }
      i("../utils").inherits(n, r), n.prototype.byteAt = function(a) {
        return this.data.charCodeAt(this.zero + a);
      }, n.prototype.lastIndexOfSignature = function(a) {
        return this.data.lastIndexOf(a) - this.zero;
      }, n.prototype.readAndCheckSignature = function(a) {
        return a === this.readData(4);
      }, n.prototype.readData = function(a) {
        this.checkOffset(a);
        var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, f;
      }, d.exports = n;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(i, d, o) {
      var r = i("./ArrayReader");
      function n(a) {
        r.call(this, a);
      }
      i("../utils").inherits(n, r), n.prototype.readData = function(a) {
        if (this.checkOffset(a), a === 0) return new Uint8Array(0);
        var f = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
        return this.index += a, f;
      }, d.exports = n;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(i, d, o) {
      var r = i("../utils"), n = i("../support"), a = i("./ArrayReader"), f = i("./StringReader"), y = i("./NodeBufferReader"), k = i("./Uint8ArrayReader");
      d.exports = function(b) {
        var _ = r.getTypeOf(b);
        return r.checkSupport(_), _ !== "string" || n.uint8array ? _ === "nodebuffer" ? new y(b) : n.uint8array ? new k(r.transformTo("uint8array", b)) : new a(r.transformTo("array", b)) : new f(b);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(i, d, o) {
      o.LOCAL_FILE_HEADER = "PK", o.CENTRAL_FILE_HEADER = "PK", o.CENTRAL_DIRECTORY_END = "PK", o.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", o.ZIP64_CENTRAL_DIRECTORY_END = "PK", o.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(i, d, o) {
      var r = i("./GenericWorker"), n = i("../utils");
      function a(f) {
        r.call(this, "ConvertWorker to " + f), this.destType = f;
      }
      n.inherits(a, r), a.prototype.processChunk = function(f) {
        this.push({ data: n.transformTo(this.destType, f.data), meta: f.meta });
      }, d.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(i, d, o) {
      var r = i("./GenericWorker"), n = i("../crc32");
      function a() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      i("../utils").inherits(a, r), a.prototype.processChunk = function(f) {
        this.streamInfo.crc32 = n(f.data, this.streamInfo.crc32 || 0), this.push(f);
      }, d.exports = a;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(i, d, o) {
      var r = i("../utils"), n = i("./GenericWorker");
      function a(f) {
        n.call(this, "DataLengthProbe for " + f), this.propName = f, this.withStreamInfo(f, 0);
      }
      r.inherits(a, n), a.prototype.processChunk = function(f) {
        if (f) {
          var y = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = y + f.data.length;
        }
        n.prototype.processChunk.call(this, f);
      }, d.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(i, d, o) {
      var r = i("../utils"), n = i("./GenericWorker");
      function a(f) {
        n.call(this, "DataWorker");
        var y = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, f.then(function(k) {
          y.dataIsReady = !0, y.data = k, y.max = k && k.length || 0, y.type = r.getTypeOf(k), y.isPaused || y._tickAndRepeat();
        }, function(k) {
          y.error(k);
        });
      }
      r.inherits(a, n), a.prototype.cleanUp = function() {
        n.prototype.cleanUp.call(this), this.data = null;
      }, a.prototype.resume = function() {
        return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0);
      }, a.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, a.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var f = null, y = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            f = this.data.substring(this.index, y);
            break;
          case "uint8array":
            f = this.data.subarray(this.index, y);
            break;
          case "array":
          case "nodebuffer":
            f = this.data.slice(this.index, y);
        }
        return this.index = y, this.push({ data: f, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, d.exports = a;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(i, d, o) {
      function r(n) {
        this.name = n || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      r.prototype = { push: function(n) {
        this.emit("data", n);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (n) {
          this.emit("error", n);
        }
        return !0;
      }, error: function(n) {
        return !this.isFinished && (this.isPaused ? this.generatedError = n : (this.isFinished = !0, this.emit("error", n), this.previous && this.previous.error(n), this.cleanUp()), !0);
      }, on: function(n, a) {
        return this._listeners[n].push(a), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(n, a) {
        if (this._listeners[n]) for (var f = 0; f < this._listeners[n].length; f++) this._listeners[n][f].call(this, a);
      }, pipe: function(n) {
        return n.registerPrevious(this);
      }, registerPrevious: function(n) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = n.streamInfo, this.mergeStreamInfo(), this.previous = n;
        var a = this;
        return n.on("data", function(f) {
          a.processChunk(f);
        }), n.on("end", function() {
          a.end();
        }), n.on("error", function(f) {
          a.error(f);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var n = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), n = !0), this.previous && this.previous.resume(), !n;
      }, flush: function() {
      }, processChunk: function(n) {
        this.push(n);
      }, withStreamInfo: function(n, a) {
        return this.extraStreamInfo[n] = a, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var n in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, n) && (this.streamInfo[n] = this.extraStreamInfo[n]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var n = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + n : n;
      } }, d.exports = r;
    }, {}], 29: [function(i, d, o) {
      var r = i("../utils"), n = i("./ConvertWorker"), a = i("./GenericWorker"), f = i("../base64"), y = i("../support"), k = i("../external"), b = null;
      if (y.nodestream) try {
        b = i("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function _(v, u) {
        return new k.Promise(function(g, c) {
          var p = [], x = v._internalType, E = v._outputType, z = v._mimeType;
          v.on("data", function(F, D) {
            p.push(F), u && u(D);
          }).on("error", function(F) {
            p = [], c(F);
          }).on("end", function() {
            try {
              var F = function(D, T, A) {
                switch (D) {
                  case "blob":
                    return r.newBlob(r.transformTo("arraybuffer", T), A);
                  case "base64":
                    return f.encode(T);
                  default:
                    return r.transformTo(D, T);
                }
              }(E, function(D, T) {
                var A, W = 0, Q = null, S = 0;
                for (A = 0; A < T.length; A++) S += T[A].length;
                switch (D) {
                  case "string":
                    return T.join("");
                  case "array":
                    return Array.prototype.concat.apply([], T);
                  case "uint8array":
                    for (Q = new Uint8Array(S), A = 0; A < T.length; A++) Q.set(T[A], W), W += T[A].length;
                    return Q;
                  case "nodebuffer":
                    return Buffer.concat(T);
                  default:
                    throw new Error("concat : unsupported type '" + D + "'");
                }
              }(x, p), z);
              g(F);
            } catch (D) {
              c(D);
            }
            p = [];
          }).resume();
        });
      }
      function h(v, u, g) {
        var c = u;
        switch (u) {
          case "blob":
          case "arraybuffer":
            c = "uint8array";
            break;
          case "base64":
            c = "string";
        }
        try {
          this._internalType = c, this._outputType = u, this._mimeType = g, r.checkSupport(c), this._worker = v.pipe(new n(c)), v.lock();
        } catch (p) {
          this._worker = new a("error"), this._worker.error(p);
        }
      }
      h.prototype = { accumulate: function(v) {
        return _(this, v);
      }, on: function(v, u) {
        var g = this;
        return v === "data" ? this._worker.on(v, function(c) {
          u.call(g, c.data, c.meta);
        }) : this._worker.on(v, function() {
          r.delay(u, arguments, g);
        }), this;
      }, resume: function() {
        return r.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(v) {
        if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new b(this, { objectMode: this._outputType !== "nodebuffer" }, v);
      } }, d.exports = h;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(i, d, o) {
      if (o.base64 = !0, o.array = !0, o.string = !0, o.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", o.nodebuffer = typeof Buffer < "u", o.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") o.blob = !1;
      else {
        var r = new ArrayBuffer(0);
        try {
          o.blob = new Blob([r], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            n.append(r), o.blob = n.getBlob("application/zip").size === 0;
          } catch {
            o.blob = !1;
          }
        }
      }
      try {
        o.nodestream = !!i("readable-stream").Readable;
      } catch {
        o.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(i, d, o) {
      for (var r = i("./utils"), n = i("./support"), a = i("./nodejsUtils"), f = i("./stream/GenericWorker"), y = new Array(256), k = 0; k < 256; k++) y[k] = 252 <= k ? 6 : 248 <= k ? 5 : 240 <= k ? 4 : 224 <= k ? 3 : 192 <= k ? 2 : 1;
      y[254] = y[254] = 1;
      function b() {
        f.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function _() {
        f.call(this, "utf-8 encode");
      }
      o.utf8encode = function(h) {
        return n.nodebuffer ? a.newBufferFrom(h, "utf-8") : function(v) {
          var u, g, c, p, x, E = v.length, z = 0;
          for (p = 0; p < E; p++) (64512 & (g = v.charCodeAt(p))) == 55296 && p + 1 < E && (64512 & (c = v.charCodeAt(p + 1))) == 56320 && (g = 65536 + (g - 55296 << 10) + (c - 56320), p++), z += g < 128 ? 1 : g < 2048 ? 2 : g < 65536 ? 3 : 4;
          for (u = n.uint8array ? new Uint8Array(z) : new Array(z), p = x = 0; x < z; p++) (64512 & (g = v.charCodeAt(p))) == 55296 && p + 1 < E && (64512 & (c = v.charCodeAt(p + 1))) == 56320 && (g = 65536 + (g - 55296 << 10) + (c - 56320), p++), g < 128 ? u[x++] = g : (g < 2048 ? u[x++] = 192 | g >>> 6 : (g < 65536 ? u[x++] = 224 | g >>> 12 : (u[x++] = 240 | g >>> 18, u[x++] = 128 | g >>> 12 & 63), u[x++] = 128 | g >>> 6 & 63), u[x++] = 128 | 63 & g);
          return u;
        }(h);
      }, o.utf8decode = function(h) {
        return n.nodebuffer ? r.transformTo("nodebuffer", h).toString("utf-8") : function(v) {
          var u, g, c, p, x = v.length, E = new Array(2 * x);
          for (u = g = 0; u < x; ) if ((c = v[u++]) < 128) E[g++] = c;
          else if (4 < (p = y[c])) E[g++] = 65533, u += p - 1;
          else {
            for (c &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && u < x; ) c = c << 6 | 63 & v[u++], p--;
            1 < p ? E[g++] = 65533 : c < 65536 ? E[g++] = c : (c -= 65536, E[g++] = 55296 | c >> 10 & 1023, E[g++] = 56320 | 1023 & c);
          }
          return E.length !== g && (E.subarray ? E = E.subarray(0, g) : E.length = g), r.applyFromCharCode(E);
        }(h = r.transformTo(n.uint8array ? "uint8array" : "array", h));
      }, r.inherits(b, f), b.prototype.processChunk = function(h) {
        var v = r.transformTo(n.uint8array ? "uint8array" : "array", h.data);
        if (this.leftOver && this.leftOver.length) {
          if (n.uint8array) {
            var u = v;
            (v = new Uint8Array(u.length + this.leftOver.length)).set(this.leftOver, 0), v.set(u, this.leftOver.length);
          } else v = this.leftOver.concat(v);
          this.leftOver = null;
        }
        var g = function(p, x) {
          var E;
          for ((x = x || p.length) > p.length && (x = p.length), E = x - 1; 0 <= E && (192 & p[E]) == 128; ) E--;
          return E < 0 || E === 0 ? x : E + y[p[E]] > x ? E : x;
        }(v), c = v;
        g !== v.length && (n.uint8array ? (c = v.subarray(0, g), this.leftOver = v.subarray(g, v.length)) : (c = v.slice(0, g), this.leftOver = v.slice(g, v.length))), this.push({ data: o.utf8decode(c), meta: h.meta });
      }, b.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: o.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, o.Utf8DecodeWorker = b, r.inherits(_, f), _.prototype.processChunk = function(h) {
        this.push({ data: o.utf8encode(h.data), meta: h.meta });
      }, o.Utf8EncodeWorker = _;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(i, d, o) {
      var r = i("./support"), n = i("./base64"), a = i("./nodejsUtils"), f = i("./external");
      function y(u) {
        return u;
      }
      function k(u, g) {
        for (var c = 0; c < u.length; ++c) g[c] = 255 & u.charCodeAt(c);
        return g;
      }
      i("setimmediate"), o.newBlob = function(u, g) {
        o.checkSupport("blob");
        try {
          return new Blob([u], { type: g });
        } catch {
          try {
            var c = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return c.append(u), c.getBlob(g);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var b = { stringifyByChunk: function(u, g, c) {
        var p = [], x = 0, E = u.length;
        if (E <= c) return String.fromCharCode.apply(null, u);
        for (; x < E; ) g === "array" || g === "nodebuffer" ? p.push(String.fromCharCode.apply(null, u.slice(x, Math.min(x + c, E)))) : p.push(String.fromCharCode.apply(null, u.subarray(x, Math.min(x + c, E)))), x += c;
        return p.join("");
      }, stringifyByChar: function(u) {
        for (var g = "", c = 0; c < u.length; c++) g += String.fromCharCode(u[c]);
        return g;
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
      function _(u) {
        var g = 65536, c = o.getTypeOf(u), p = !0;
        if (c === "uint8array" ? p = b.applyCanBeUsed.uint8array : c === "nodebuffer" && (p = b.applyCanBeUsed.nodebuffer), p) for (; 1 < g; ) try {
          return b.stringifyByChunk(u, c, g);
        } catch {
          g = Math.floor(g / 2);
        }
        return b.stringifyByChar(u);
      }
      function h(u, g) {
        for (var c = 0; c < u.length; c++) g[c] = u[c];
        return g;
      }
      o.applyFromCharCode = _;
      var v = {};
      v.string = { string: y, array: function(u) {
        return k(u, new Array(u.length));
      }, arraybuffer: function(u) {
        return v.string.uint8array(u).buffer;
      }, uint8array: function(u) {
        return k(u, new Uint8Array(u.length));
      }, nodebuffer: function(u) {
        return k(u, a.allocBuffer(u.length));
      } }, v.array = { string: _, array: y, arraybuffer: function(u) {
        return new Uint8Array(u).buffer;
      }, uint8array: function(u) {
        return new Uint8Array(u);
      }, nodebuffer: function(u) {
        return a.newBufferFrom(u);
      } }, v.arraybuffer = { string: function(u) {
        return _(new Uint8Array(u));
      }, array: function(u) {
        return h(new Uint8Array(u), new Array(u.byteLength));
      }, arraybuffer: y, uint8array: function(u) {
        return new Uint8Array(u);
      }, nodebuffer: function(u) {
        return a.newBufferFrom(new Uint8Array(u));
      } }, v.uint8array = { string: _, array: function(u) {
        return h(u, new Array(u.length));
      }, arraybuffer: function(u) {
        return u.buffer;
      }, uint8array: y, nodebuffer: function(u) {
        return a.newBufferFrom(u);
      } }, v.nodebuffer = { string: _, array: function(u) {
        return h(u, new Array(u.length));
      }, arraybuffer: function(u) {
        return v.nodebuffer.uint8array(u).buffer;
      }, uint8array: function(u) {
        return h(u, new Uint8Array(u.length));
      }, nodebuffer: y }, o.transformTo = function(u, g) {
        if (g = g || "", !u) return g;
        o.checkSupport(u);
        var c = o.getTypeOf(g);
        return v[c][u](g);
      }, o.resolve = function(u) {
        for (var g = u.split("/"), c = [], p = 0; p < g.length; p++) {
          var x = g[p];
          x === "." || x === "" && p !== 0 && p !== g.length - 1 || (x === ".." ? c.pop() : c.push(x));
        }
        return c.join("/");
      }, o.getTypeOf = function(u) {
        return typeof u == "string" ? "string" : Object.prototype.toString.call(u) === "[object Array]" ? "array" : r.nodebuffer && a.isBuffer(u) ? "nodebuffer" : r.uint8array && u instanceof Uint8Array ? "uint8array" : r.arraybuffer && u instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, o.checkSupport = function(u) {
        if (!r[u.toLowerCase()]) throw new Error(u + " is not supported by this platform");
      }, o.MAX_VALUE_16BITS = 65535, o.MAX_VALUE_32BITS = -1, o.pretty = function(u) {
        var g, c, p = "";
        for (c = 0; c < (u || "").length; c++) p += "\\x" + ((g = u.charCodeAt(c)) < 16 ? "0" : "") + g.toString(16).toUpperCase();
        return p;
      }, o.delay = function(u, g, c) {
        setImmediate(function() {
          u.apply(c || null, g || []);
        });
      }, o.inherits = function(u, g) {
        function c() {
        }
        c.prototype = g.prototype, u.prototype = new c();
      }, o.extend = function() {
        var u, g, c = {};
        for (u = 0; u < arguments.length; u++) for (g in arguments[u]) Object.prototype.hasOwnProperty.call(arguments[u], g) && c[g] === void 0 && (c[g] = arguments[u][g]);
        return c;
      }, o.prepareContent = function(u, g, c, p, x) {
        return f.Promise.resolve(g).then(function(E) {
          return r.blob && (E instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(E)) !== -1) && typeof FileReader < "u" ? new f.Promise(function(z, F) {
            var D = new FileReader();
            D.onload = function(T) {
              z(T.target.result);
            }, D.onerror = function(T) {
              F(T.target.error);
            }, D.readAsArrayBuffer(E);
          }) : E;
        }).then(function(E) {
          var z = o.getTypeOf(E);
          return z ? (z === "arraybuffer" ? E = o.transformTo("uint8array", E) : z === "string" && (x ? E = n.decode(E) : c && p !== !0 && (E = function(F) {
            return k(F, r.uint8array ? new Uint8Array(F.length) : new Array(F.length));
          }(E))), E) : f.Promise.reject(new Error("Can't read the data of '" + u + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(i, d, o) {
      var r = i("./reader/readerFor"), n = i("./utils"), a = i("./signature"), f = i("./zipEntry"), y = i("./support");
      function k(b) {
        this.files = [], this.loadOptions = b;
      }
      k.prototype = { checkSignature: function(b) {
        if (!this.reader.readAndCheckSignature(b)) {
          this.reader.index -= 4;
          var _ = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(_) + ", expected " + n.pretty(b) + ")");
        }
      }, isSignature: function(b, _) {
        var h = this.reader.index;
        this.reader.setIndex(b);
        var v = this.reader.readString(4) === _;
        return this.reader.setIndex(h), v;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var b = this.reader.readData(this.zipCommentLength), _ = y.uint8array ? "uint8array" : "array", h = n.transformTo(_, b);
        this.zipComment = this.loadOptions.decodeFileName(h);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var b, _, h, v = this.zip64EndOfCentralSize - 44; 0 < v; ) b = this.reader.readInt(2), _ = this.reader.readInt(4), h = this.reader.readData(_), this.zip64ExtensibleData[b] = { id: b, length: _, value: h };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var b, _;
        for (b = 0; b < this.files.length; b++) _ = this.files[b], this.reader.setIndex(_.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), _.readLocalPart(this.reader), _.handleUTF8(), _.processAttributes();
      }, readCentralDir: function() {
        var b;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (b = new f({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(b);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var b = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
        if (b < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(b);
        var _ = b;
        if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (b = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(b), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var h = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (h += 20, h += 12 + this.zip64EndOfCentralSize);
        var v = _ - h;
        if (0 < v) this.isSignature(_, a.CENTRAL_FILE_HEADER) || (this.reader.zero = v);
        else if (v < 0) throw new Error("Corrupted zip: missing " + Math.abs(v) + " bytes.");
      }, prepareReader: function(b) {
        this.reader = r(b);
      }, load: function(b) {
        this.prepareReader(b), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, d.exports = k;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(i, d, o) {
      var r = i("./reader/readerFor"), n = i("./utils"), a = i("./compressedObject"), f = i("./crc32"), y = i("./utf8"), k = i("./compressions"), b = i("./support");
      function _(h, v) {
        this.options = h, this.loadOptions = v;
      }
      _.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(h) {
        var v, u;
        if (h.skip(22), this.fileNameLength = h.readInt(2), u = h.readInt(2), this.fileName = h.readData(this.fileNameLength), h.skip(u), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((v = function(g) {
          for (var c in k) if (Object.prototype.hasOwnProperty.call(k, c) && k[c].magic === g) return k[c];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + n.transformTo("string", this.fileName) + ")");
        this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, v, h.readData(this.compressedSize));
      }, readCentralPart: function(h) {
        this.versionMadeBy = h.readInt(2), h.skip(2), this.bitFlag = h.readInt(2), this.compressionMethod = h.readString(2), this.date = h.readDate(), this.crc32 = h.readInt(4), this.compressedSize = h.readInt(4), this.uncompressedSize = h.readInt(4);
        var v = h.readInt(2);
        if (this.extraFieldsLength = h.readInt(2), this.fileCommentLength = h.readInt(2), this.diskNumberStart = h.readInt(2), this.internalFileAttributes = h.readInt(2), this.externalFileAttributes = h.readInt(4), this.localHeaderOffset = h.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        h.skip(v), this.readExtraFields(h), this.parseZIP64ExtraField(h), this.fileComment = h.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var h = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), h == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), h == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var h = r(this.extraFields[1].value);
          this.uncompressedSize === n.MAX_VALUE_32BITS && (this.uncompressedSize = h.readInt(8)), this.compressedSize === n.MAX_VALUE_32BITS && (this.compressedSize = h.readInt(8)), this.localHeaderOffset === n.MAX_VALUE_32BITS && (this.localHeaderOffset = h.readInt(8)), this.diskNumberStart === n.MAX_VALUE_32BITS && (this.diskNumberStart = h.readInt(4));
        }
      }, readExtraFields: function(h) {
        var v, u, g, c = h.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); h.index + 4 < c; ) v = h.readInt(2), u = h.readInt(2), g = h.readData(u), this.extraFields[v] = { id: v, length: u, value: g };
        h.setIndex(c);
      }, handleUTF8: function() {
        var h = b.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = y.utf8decode(this.fileName), this.fileCommentStr = y.utf8decode(this.fileComment);
        else {
          var v = this.findExtraFieldUnicodePath();
          if (v !== null) this.fileNameStr = v;
          else {
            var u = n.transformTo(h, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(u);
          }
          var g = this.findExtraFieldUnicodeComment();
          if (g !== null) this.fileCommentStr = g;
          else {
            var c = n.transformTo(h, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(c);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var h = this.extraFields[28789];
        if (h) {
          var v = r(h.value);
          return v.readInt(1) !== 1 || f(this.fileName) !== v.readInt(4) ? null : y.utf8decode(v.readData(h.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var h = this.extraFields[25461];
        if (h) {
          var v = r(h.value);
          return v.readInt(1) !== 1 || f(this.fileComment) !== v.readInt(4) ? null : y.utf8decode(v.readData(h.length - 5));
        }
        return null;
      } }, d.exports = _;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(i, d, o) {
      function r(v, u, g) {
        this.name = v, this.dir = g.dir, this.date = g.date, this.comment = g.comment, this.unixPermissions = g.unixPermissions, this.dosPermissions = g.dosPermissions, this._data = u, this._dataBinary = g.binary, this.options = { compression: g.compression, compressionOptions: g.compressionOptions };
      }
      var n = i("./stream/StreamHelper"), a = i("./stream/DataWorker"), f = i("./utf8"), y = i("./compressedObject"), k = i("./stream/GenericWorker");
      r.prototype = { internalStream: function(v) {
        var u = null, g = "string";
        try {
          if (!v) throw new Error("No output type specified.");
          var c = (g = v.toLowerCase()) === "string" || g === "text";
          g !== "binarystring" && g !== "text" || (g = "string"), u = this._decompressWorker();
          var p = !this._dataBinary;
          p && !c && (u = u.pipe(new f.Utf8EncodeWorker())), !p && c && (u = u.pipe(new f.Utf8DecodeWorker()));
        } catch (x) {
          (u = new k("error")).error(x);
        }
        return new n(u, g, "");
      }, async: function(v, u) {
        return this.internalStream(v).accumulate(u);
      }, nodeStream: function(v, u) {
        return this.internalStream(v || "nodebuffer").toNodejsStream(u);
      }, _compressWorker: function(v, u) {
        if (this._data instanceof y && this._data.compression.magic === v.magic) return this._data.getCompressedWorker();
        var g = this._decompressWorker();
        return this._dataBinary || (g = g.pipe(new f.Utf8EncodeWorker())), y.createWorkerFrom(g, v, u);
      }, _decompressWorker: function() {
        return this._data instanceof y ? this._data.getContentWorker() : this._data instanceof k ? this._data : new a(this._data);
      } };
      for (var b = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], _ = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, h = 0; h < b.length; h++) r.prototype[b[h]] = _;
      d.exports = r;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(i, d, o) {
      (function(r) {
        var n, a, f = r.MutationObserver || r.WebKitMutationObserver;
        if (f) {
          var y = 0, k = new f(v), b = r.document.createTextNode("");
          k.observe(b, { characterData: !0 }), n = function() {
            b.data = y = ++y % 2;
          };
        } else if (r.setImmediate || r.MessageChannel === void 0) n = "document" in r && "onreadystatechange" in r.document.createElement("script") ? function() {
          var u = r.document.createElement("script");
          u.onreadystatechange = function() {
            v(), u.onreadystatechange = null, u.parentNode.removeChild(u), u = null;
          }, r.document.documentElement.appendChild(u);
        } : function() {
          setTimeout(v, 0);
        };
        else {
          var _ = new r.MessageChannel();
          _.port1.onmessage = v, n = function() {
            _.port2.postMessage(0);
          };
        }
        var h = [];
        function v() {
          var u, g;
          a = !0;
          for (var c = h.length; c; ) {
            for (g = h, h = [], u = -1; ++u < c; ) g[u]();
            c = h.length;
          }
          a = !1;
        }
        d.exports = function(u) {
          h.push(u) !== 1 || a || n();
        };
      }).call(this, typeof ae < "u" ? ae : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(i, d, o) {
      var r = i("immediate");
      function n() {
      }
      var a = {}, f = ["REJECTED"], y = ["FULFILLED"], k = ["PENDING"];
      function b(c) {
        if (typeof c != "function") throw new TypeError("resolver must be a function");
        this.state = k, this.queue = [], this.outcome = void 0, c !== n && u(this, c);
      }
      function _(c, p, x) {
        this.promise = c, typeof p == "function" && (this.onFulfilled = p, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
      }
      function h(c, p, x) {
        r(function() {
          var E;
          try {
            E = p(x);
          } catch (z) {
            return a.reject(c, z);
          }
          E === c ? a.reject(c, new TypeError("Cannot resolve promise with itself")) : a.resolve(c, E);
        });
      }
      function v(c) {
        var p = c && c.then;
        if (c && (typeof c == "object" || typeof c == "function") && typeof p == "function") return function() {
          p.apply(c, arguments);
        };
      }
      function u(c, p) {
        var x = !1;
        function E(D) {
          x || (x = !0, a.reject(c, D));
        }
        function z(D) {
          x || (x = !0, a.resolve(c, D));
        }
        var F = g(function() {
          p(z, E);
        });
        F.status === "error" && E(F.value);
      }
      function g(c, p) {
        var x = {};
        try {
          x.value = c(p), x.status = "success";
        } catch (E) {
          x.status = "error", x.value = E;
        }
        return x;
      }
      (d.exports = b).prototype.finally = function(c) {
        if (typeof c != "function") return this;
        var p = this.constructor;
        return this.then(function(x) {
          return p.resolve(c()).then(function() {
            return x;
          });
        }, function(x) {
          return p.resolve(c()).then(function() {
            throw x;
          });
        });
      }, b.prototype.catch = function(c) {
        return this.then(null, c);
      }, b.prototype.then = function(c, p) {
        if (typeof c != "function" && this.state === y || typeof p != "function" && this.state === f) return this;
        var x = new this.constructor(n);
        return this.state !== k ? h(x, this.state === y ? c : p, this.outcome) : this.queue.push(new _(x, c, p)), x;
      }, _.prototype.callFulfilled = function(c) {
        a.resolve(this.promise, c);
      }, _.prototype.otherCallFulfilled = function(c) {
        h(this.promise, this.onFulfilled, c);
      }, _.prototype.callRejected = function(c) {
        a.reject(this.promise, c);
      }, _.prototype.otherCallRejected = function(c) {
        h(this.promise, this.onRejected, c);
      }, a.resolve = function(c, p) {
        var x = g(v, p);
        if (x.status === "error") return a.reject(c, x.value);
        var E = x.value;
        if (E) u(c, E);
        else {
          c.state = y, c.outcome = p;
          for (var z = -1, F = c.queue.length; ++z < F; ) c.queue[z].callFulfilled(p);
        }
        return c;
      }, a.reject = function(c, p) {
        c.state = f, c.outcome = p;
        for (var x = -1, E = c.queue.length; ++x < E; ) c.queue[x].callRejected(p);
        return c;
      }, b.resolve = function(c) {
        return c instanceof this ? c : a.resolve(new this(n), c);
      }, b.reject = function(c) {
        var p = new this(n);
        return a.reject(p, c);
      }, b.all = function(c) {
        var p = this;
        if (Object.prototype.toString.call(c) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = c.length, E = !1;
        if (!x) return this.resolve([]);
        for (var z = new Array(x), F = 0, D = -1, T = new this(n); ++D < x; ) A(c[D], D);
        return T;
        function A(W, Q) {
          p.resolve(W).then(function(S) {
            z[Q] = S, ++F !== x || E || (E = !0, a.resolve(T, z));
          }, function(S) {
            E || (E = !0, a.reject(T, S));
          });
        }
      }, b.race = function(c) {
        var p = this;
        if (Object.prototype.toString.call(c) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var x = c.length, E = !1;
        if (!x) return this.resolve([]);
        for (var z = -1, F = new this(n); ++z < x; ) D = c[z], p.resolve(D).then(function(T) {
          E || (E = !0, a.resolve(F, T));
        }, function(T) {
          E || (E = !0, a.reject(F, T));
        });
        var D;
        return F;
      };
    }, { immediate: 36 }], 38: [function(i, d, o) {
      var r = {};
      (0, i("./lib/utils/common").assign)(r, i("./lib/deflate"), i("./lib/inflate"), i("./lib/zlib/constants")), d.exports = r;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(i, d, o) {
      var r = i("./zlib/deflate"), n = i("./utils/common"), a = i("./utils/strings"), f = i("./zlib/messages"), y = i("./zlib/zstream"), k = Object.prototype.toString, b = 0, _ = -1, h = 0, v = 8;
      function u(c) {
        if (!(this instanceof u)) return new u(c);
        this.options = n.assign({ level: _, method: v, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: h, to: "" }, c || {});
        var p = this.options;
        p.raw && 0 < p.windowBits ? p.windowBits = -p.windowBits : p.gzip && 0 < p.windowBits && p.windowBits < 16 && (p.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y(), this.strm.avail_out = 0;
        var x = r.deflateInit2(this.strm, p.level, p.method, p.windowBits, p.memLevel, p.strategy);
        if (x !== b) throw new Error(f[x]);
        if (p.header && r.deflateSetHeader(this.strm, p.header), p.dictionary) {
          var E;
          if (E = typeof p.dictionary == "string" ? a.string2buf(p.dictionary) : k.call(p.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(p.dictionary) : p.dictionary, (x = r.deflateSetDictionary(this.strm, E)) !== b) throw new Error(f[x]);
          this._dict_set = !0;
        }
      }
      function g(c, p) {
        var x = new u(p);
        if (x.push(c, !0), x.err) throw x.msg || f[x.err];
        return x.result;
      }
      u.prototype.push = function(c, p) {
        var x, E, z = this.strm, F = this.options.chunkSize;
        if (this.ended) return !1;
        E = p === ~~p ? p : p === !0 ? 4 : 0, typeof c == "string" ? z.input = a.string2buf(c) : k.call(c) === "[object ArrayBuffer]" ? z.input = new Uint8Array(c) : z.input = c, z.next_in = 0, z.avail_in = z.input.length;
        do {
          if (z.avail_out === 0 && (z.output = new n.Buf8(F), z.next_out = 0, z.avail_out = F), (x = r.deflate(z, E)) !== 1 && x !== b) return this.onEnd(x), !(this.ended = !0);
          z.avail_out !== 0 && (z.avail_in !== 0 || E !== 4 && E !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(n.shrinkBuf(z.output, z.next_out))) : this.onData(n.shrinkBuf(z.output, z.next_out)));
        } while ((0 < z.avail_in || z.avail_out === 0) && x !== 1);
        return E === 4 ? (x = r.deflateEnd(this.strm), this.onEnd(x), this.ended = !0, x === b) : E !== 2 || (this.onEnd(b), !(z.avail_out = 0));
      }, u.prototype.onData = function(c) {
        this.chunks.push(c);
      }, u.prototype.onEnd = function(c) {
        c === b && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = c, this.msg = this.strm.msg;
      }, o.Deflate = u, o.deflate = g, o.deflateRaw = function(c, p) {
        return (p = p || {}).raw = !0, g(c, p);
      }, o.gzip = function(c, p) {
        return (p = p || {}).gzip = !0, g(c, p);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(i, d, o) {
      var r = i("./zlib/inflate"), n = i("./utils/common"), a = i("./utils/strings"), f = i("./zlib/constants"), y = i("./zlib/messages"), k = i("./zlib/zstream"), b = i("./zlib/gzheader"), _ = Object.prototype.toString;
      function h(u) {
        if (!(this instanceof h)) return new h(u);
        this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: "" }, u || {});
        var g = this.options;
        g.raw && 0 <= g.windowBits && g.windowBits < 16 && (g.windowBits = -g.windowBits, g.windowBits === 0 && (g.windowBits = -15)), !(0 <= g.windowBits && g.windowBits < 16) || u && u.windowBits || (g.windowBits += 32), 15 < g.windowBits && g.windowBits < 48 && !(15 & g.windowBits) && (g.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k(), this.strm.avail_out = 0;
        var c = r.inflateInit2(this.strm, g.windowBits);
        if (c !== f.Z_OK) throw new Error(y[c]);
        this.header = new b(), r.inflateGetHeader(this.strm, this.header);
      }
      function v(u, g) {
        var c = new h(g);
        if (c.push(u, !0), c.err) throw c.msg || y[c.err];
        return c.result;
      }
      h.prototype.push = function(u, g) {
        var c, p, x, E, z, F, D = this.strm, T = this.options.chunkSize, A = this.options.dictionary, W = !1;
        if (this.ended) return !1;
        p = g === ~~g ? g : g === !0 ? f.Z_FINISH : f.Z_NO_FLUSH, typeof u == "string" ? D.input = a.binstring2buf(u) : _.call(u) === "[object ArrayBuffer]" ? D.input = new Uint8Array(u) : D.input = u, D.next_in = 0, D.avail_in = D.input.length;
        do {
          if (D.avail_out === 0 && (D.output = new n.Buf8(T), D.next_out = 0, D.avail_out = T), (c = r.inflate(D, f.Z_NO_FLUSH)) === f.Z_NEED_DICT && A && (F = typeof A == "string" ? a.string2buf(A) : _.call(A) === "[object ArrayBuffer]" ? new Uint8Array(A) : A, c = r.inflateSetDictionary(this.strm, F)), c === f.Z_BUF_ERROR && W === !0 && (c = f.Z_OK, W = !1), c !== f.Z_STREAM_END && c !== f.Z_OK) return this.onEnd(c), !(this.ended = !0);
          D.next_out && (D.avail_out !== 0 && c !== f.Z_STREAM_END && (D.avail_in !== 0 || p !== f.Z_FINISH && p !== f.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = a.utf8border(D.output, D.next_out), E = D.next_out - x, z = a.buf2string(D.output, x), D.next_out = E, D.avail_out = T - E, E && n.arraySet(D.output, D.output, x, E, 0), this.onData(z)) : this.onData(n.shrinkBuf(D.output, D.next_out)))), D.avail_in === 0 && D.avail_out === 0 && (W = !0);
        } while ((0 < D.avail_in || D.avail_out === 0) && c !== f.Z_STREAM_END);
        return c === f.Z_STREAM_END && (p = f.Z_FINISH), p === f.Z_FINISH ? (c = r.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === f.Z_OK) : p !== f.Z_SYNC_FLUSH || (this.onEnd(f.Z_OK), !(D.avail_out = 0));
      }, h.prototype.onData = function(u) {
        this.chunks.push(u);
      }, h.prototype.onEnd = function(u) {
        u === f.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = u, this.msg = this.strm.msg;
      }, o.Inflate = h, o.inflate = v, o.inflateRaw = function(u, g) {
        return (g = g || {}).raw = !0, v(u, g);
      }, o.ungzip = v;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(i, d, o) {
      var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      o.assign = function(f) {
        for (var y = Array.prototype.slice.call(arguments, 1); y.length; ) {
          var k = y.shift();
          if (k) {
            if (typeof k != "object") throw new TypeError(k + "must be non-object");
            for (var b in k) k.hasOwnProperty(b) && (f[b] = k[b]);
          }
        }
        return f;
      }, o.shrinkBuf = function(f, y) {
        return f.length === y ? f : f.subarray ? f.subarray(0, y) : (f.length = y, f);
      };
      var n = { arraySet: function(f, y, k, b, _) {
        if (y.subarray && f.subarray) f.set(y.subarray(k, k + b), _);
        else for (var h = 0; h < b; h++) f[_ + h] = y[k + h];
      }, flattenChunks: function(f) {
        var y, k, b, _, h, v;
        for (y = b = 0, k = f.length; y < k; y++) b += f[y].length;
        for (v = new Uint8Array(b), y = _ = 0, k = f.length; y < k; y++) h = f[y], v.set(h, _), _ += h.length;
        return v;
      } }, a = { arraySet: function(f, y, k, b, _) {
        for (var h = 0; h < b; h++) f[_ + h] = y[k + h];
      }, flattenChunks: function(f) {
        return [].concat.apply([], f);
      } };
      o.setTyped = function(f) {
        f ? (o.Buf8 = Uint8Array, o.Buf16 = Uint16Array, o.Buf32 = Int32Array, o.assign(o, n)) : (o.Buf8 = Array, o.Buf16 = Array, o.Buf32 = Array, o.assign(o, a));
      }, o.setTyped(r);
    }, {}], 42: [function(i, d, o) {
      var r = i("./common"), n = !0, a = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        n = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        a = !1;
      }
      for (var f = new r.Buf8(256), y = 0; y < 256; y++) f[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
      function k(b, _) {
        if (_ < 65537 && (b.subarray && a || !b.subarray && n)) return String.fromCharCode.apply(null, r.shrinkBuf(b, _));
        for (var h = "", v = 0; v < _; v++) h += String.fromCharCode(b[v]);
        return h;
      }
      f[254] = f[254] = 1, o.string2buf = function(b) {
        var _, h, v, u, g, c = b.length, p = 0;
        for (u = 0; u < c; u++) (64512 & (h = b.charCodeAt(u))) == 55296 && u + 1 < c && (64512 & (v = b.charCodeAt(u + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (v - 56320), u++), p += h < 128 ? 1 : h < 2048 ? 2 : h < 65536 ? 3 : 4;
        for (_ = new r.Buf8(p), u = g = 0; g < p; u++) (64512 & (h = b.charCodeAt(u))) == 55296 && u + 1 < c && (64512 & (v = b.charCodeAt(u + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (v - 56320), u++), h < 128 ? _[g++] = h : (h < 2048 ? _[g++] = 192 | h >>> 6 : (h < 65536 ? _[g++] = 224 | h >>> 12 : (_[g++] = 240 | h >>> 18, _[g++] = 128 | h >>> 12 & 63), _[g++] = 128 | h >>> 6 & 63), _[g++] = 128 | 63 & h);
        return _;
      }, o.buf2binstring = function(b) {
        return k(b, b.length);
      }, o.binstring2buf = function(b) {
        for (var _ = new r.Buf8(b.length), h = 0, v = _.length; h < v; h++) _[h] = b.charCodeAt(h);
        return _;
      }, o.buf2string = function(b, _) {
        var h, v, u, g, c = _ || b.length, p = new Array(2 * c);
        for (h = v = 0; h < c; ) if ((u = b[h++]) < 128) p[v++] = u;
        else if (4 < (g = f[u])) p[v++] = 65533, h += g - 1;
        else {
          for (u &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && h < c; ) u = u << 6 | 63 & b[h++], g--;
          1 < g ? p[v++] = 65533 : u < 65536 ? p[v++] = u : (u -= 65536, p[v++] = 55296 | u >> 10 & 1023, p[v++] = 56320 | 1023 & u);
        }
        return k(p, v);
      }, o.utf8border = function(b, _) {
        var h;
        for ((_ = _ || b.length) > b.length && (_ = b.length), h = _ - 1; 0 <= h && (192 & b[h]) == 128; ) h--;
        return h < 0 || h === 0 ? _ : h + f[b[h]] > _ ? h : _;
      };
    }, { "./common": 41 }], 43: [function(i, d, o) {
      d.exports = function(r, n, a, f) {
        for (var y = 65535 & r | 0, k = r >>> 16 & 65535 | 0, b = 0; a !== 0; ) {
          for (a -= b = 2e3 < a ? 2e3 : a; k = k + (y = y + n[f++] | 0) | 0, --b; ) ;
          y %= 65521, k %= 65521;
        }
        return y | k << 16 | 0;
      };
    }, {}], 44: [function(i, d, o) {
      d.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(i, d, o) {
      var r = function() {
        for (var n, a = [], f = 0; f < 256; f++) {
          n = f;
          for (var y = 0; y < 8; y++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
          a[f] = n;
        }
        return a;
      }();
      d.exports = function(n, a, f, y) {
        var k = r, b = y + f;
        n ^= -1;
        for (var _ = y; _ < b; _++) n = n >>> 8 ^ k[255 & (n ^ a[_])];
        return -1 ^ n;
      };
    }, {}], 46: [function(i, d, o) {
      var r, n = i("../utils/common"), a = i("./trees"), f = i("./adler32"), y = i("./crc32"), k = i("./messages"), b = 0, _ = 4, h = 0, v = -2, u = -1, g = 4, c = 2, p = 8, x = 9, E = 286, z = 30, F = 19, D = 2 * E + 1, T = 15, A = 3, W = 258, Q = W + A + 1, S = 42, L = 113, s = 1, U = 2, at = 3, $ = 4;
      function ot(e, N) {
        return e.msg = k[N], N;
      }
      function V(e) {
        return (e << 1) - (4 < e ? 9 : 0);
      }
      function it(e) {
        for (var N = e.length; 0 <= --N; ) e[N] = 0;
      }
      function P(e) {
        var N = e.state, B = N.pending;
        B > e.avail_out && (B = e.avail_out), B !== 0 && (n.arraySet(e.output, N.pending_buf, N.pending_out, B, e.next_out), e.next_out += B, N.pending_out += B, e.total_out += B, e.avail_out -= B, N.pending -= B, N.pending === 0 && (N.pending_out = 0));
      }
      function O(e, N) {
        a._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, N), e.block_start = e.strstart, P(e.strm);
      }
      function et(e, N) {
        e.pending_buf[e.pending++] = N;
      }
      function q(e, N) {
        e.pending_buf[e.pending++] = N >>> 8 & 255, e.pending_buf[e.pending++] = 255 & N;
      }
      function K(e, N) {
        var B, w, m = e.max_chain_length, C = e.strstart, M = e.prev_length, j = e.nice_match, I = e.strstart > e.w_size - Q ? e.strstart - (e.w_size - Q) : 0, X = e.window, J = e.w_mask, Y = e.prev, tt = e.strstart + W, mt = X[C + M - 1], ut = X[C + M];
        e.prev_length >= e.good_match && (m >>= 2), j > e.lookahead && (j = e.lookahead);
        do
          if (X[(B = N) + M] === ut && X[B + M - 1] === mt && X[B] === X[C] && X[++B] === X[C + 1]) {
            C += 2, B++;
            do
              ;
            while (X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && X[++C] === X[++B] && C < tt);
            if (w = W - (tt - C), C = tt - W, M < w) {
              if (e.match_start = N, j <= (M = w)) break;
              mt = X[C + M - 1], ut = X[C + M];
            }
          }
        while ((N = Y[N & J]) > I && --m != 0);
        return M <= e.lookahead ? M : e.lookahead;
      }
      function wt(e) {
        var N, B, w, m, C, M, j, I, X, J, Y = e.w_size;
        do {
          if (m = e.window_size - e.lookahead - e.strstart, e.strstart >= Y + (Y - Q)) {
            for (n.arraySet(e.window, e.window, Y, Y, 0), e.match_start -= Y, e.strstart -= Y, e.block_start -= Y, N = B = e.hash_size; w = e.head[--N], e.head[N] = Y <= w ? w - Y : 0, --B; ) ;
            for (N = B = Y; w = e.prev[--N], e.prev[N] = Y <= w ? w - Y : 0, --B; ) ;
            m += Y;
          }
          if (e.strm.avail_in === 0) break;
          if (M = e.strm, j = e.window, I = e.strstart + e.lookahead, X = m, J = void 0, J = M.avail_in, X < J && (J = X), B = J === 0 ? 0 : (M.avail_in -= J, n.arraySet(j, M.input, M.next_in, J, I), M.state.wrap === 1 ? M.adler = f(M.adler, j, J, I) : M.state.wrap === 2 && (M.adler = y(M.adler, j, J, I)), M.next_in += J, M.total_in += J, J), e.lookahead += B, e.lookahead + e.insert >= A) for (C = e.strstart - e.insert, e.ins_h = e.window[C], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[C + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[C + A - 1]) & e.hash_mask, e.prev[C & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = C, C++, e.insert--, !(e.lookahead + e.insert < A)); ) ;
        } while (e.lookahead < Q && e.strm.avail_in !== 0);
      }
      function gt(e, N) {
        for (var B, w; ; ) {
          if (e.lookahead < Q) {
            if (wt(e), e.lookahead < Q && N === b) return s;
            if (e.lookahead === 0) break;
          }
          if (B = 0, e.lookahead >= A && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + A - 1]) & e.hash_mask, B = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), B !== 0 && e.strstart - B <= e.w_size - Q && (e.match_length = K(e, B)), e.match_length >= A) if (w = a._tr_tally(e, e.strstart - e.match_start, e.match_length - A), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= A) {
            for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + A - 1]) & e.hash_mask, B = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, --e.match_length != 0; ) ;
            e.strstart++;
          } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
          else w = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
          if (w && (O(e, !1), e.strm.avail_out === 0)) return s;
        }
        return e.insert = e.strstart < A - 1 ? e.strstart : A - 1, N === _ ? (O(e, !0), e.strm.avail_out === 0 ? at : $) : e.last_lit && (O(e, !1), e.strm.avail_out === 0) ? s : U;
      }
      function dt(e, N) {
        for (var B, w, m; ; ) {
          if (e.lookahead < Q) {
            if (wt(e), e.lookahead < Q && N === b) return s;
            if (e.lookahead === 0) break;
          }
          if (B = 0, e.lookahead >= A && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + A - 1]) & e.hash_mask, B = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = A - 1, B !== 0 && e.prev_length < e.max_lazy_match && e.strstart - B <= e.w_size - Q && (e.match_length = K(e, B), e.match_length <= 5 && (e.strategy === 1 || e.match_length === A && 4096 < e.strstart - e.match_start) && (e.match_length = A - 1)), e.prev_length >= A && e.match_length <= e.prev_length) {
            for (m = e.strstart + e.lookahead - A, w = a._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - A), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= m && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + A - 1]) & e.hash_mask, B = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), --e.prev_length != 0; ) ;
            if (e.match_available = 0, e.match_length = A - 1, e.strstart++, w && (O(e, !1), e.strm.avail_out === 0)) return s;
          } else if (e.match_available) {
            if ((w = a._tr_tally(e, 0, e.window[e.strstart - 1])) && O(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return s;
          } else e.match_available = 1, e.strstart++, e.lookahead--;
        }
        return e.match_available && (w = a._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < A - 1 ? e.strstart : A - 1, N === _ ? (O(e, !0), e.strm.avail_out === 0 ? at : $) : e.last_lit && (O(e, !1), e.strm.avail_out === 0) ? s : U;
      }
      function ft(e, N, B, w, m) {
        this.good_length = e, this.max_lazy = N, this.nice_length = B, this.max_chain = w, this.func = m;
      }
      function _t() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = p, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new n.Buf16(2 * D), this.dyn_dtree = new n.Buf16(2 * (2 * z + 1)), this.bl_tree = new n.Buf16(2 * (2 * F + 1)), it(this.dyn_ltree), it(this.dyn_dtree), it(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new n.Buf16(T + 1), this.heap = new n.Buf16(2 * E + 1), it(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new n.Buf16(2 * E + 1), it(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function yt(e) {
        var N;
        return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = c, (N = e.state).pending = 0, N.pending_out = 0, N.wrap < 0 && (N.wrap = -N.wrap), N.status = N.wrap ? S : L, e.adler = N.wrap === 2 ? 0 : 1, N.last_flush = b, a._tr_init(N), h) : ot(e, v);
      }
      function Ot(e) {
        var N = yt(e);
        return N === h && function(B) {
          B.window_size = 2 * B.w_size, it(B.head), B.max_lazy_match = r[B.level].max_lazy, B.good_match = r[B.level].good_length, B.nice_match = r[B.level].nice_length, B.max_chain_length = r[B.level].max_chain, B.strstart = 0, B.block_start = 0, B.lookahead = 0, B.insert = 0, B.match_length = B.prev_length = A - 1, B.match_available = 0, B.ins_h = 0;
        }(e.state), N;
      }
      function zt(e, N, B, w, m, C) {
        if (!e) return v;
        var M = 1;
        if (N === u && (N = 6), w < 0 ? (M = 0, w = -w) : 15 < w && (M = 2, w -= 16), m < 1 || x < m || B !== p || w < 8 || 15 < w || N < 0 || 9 < N || C < 0 || g < C) return ot(e, v);
        w === 8 && (w = 9);
        var j = new _t();
        return (e.state = j).strm = e, j.wrap = M, j.gzhead = null, j.w_bits = w, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = m + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + A - 1) / A), j.window = new n.Buf8(2 * j.w_size), j.head = new n.Buf16(j.hash_size), j.prev = new n.Buf16(j.w_size), j.lit_bufsize = 1 << m + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new n.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = N, j.strategy = C, j.method = B, Ot(e);
      }
      r = [new ft(0, 0, 0, 0, function(e, N) {
        var B = 65535;
        for (B > e.pending_buf_size - 5 && (B = e.pending_buf_size - 5); ; ) {
          if (e.lookahead <= 1) {
            if (wt(e), e.lookahead === 0 && N === b) return s;
            if (e.lookahead === 0) break;
          }
          e.strstart += e.lookahead, e.lookahead = 0;
          var w = e.block_start + B;
          if ((e.strstart === 0 || e.strstart >= w) && (e.lookahead = e.strstart - w, e.strstart = w, O(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - Q && (O(e, !1), e.strm.avail_out === 0)) return s;
        }
        return e.insert = 0, N === _ ? (O(e, !0), e.strm.avail_out === 0 ? at : $) : (e.strstart > e.block_start && (O(e, !1), e.strm.avail_out), s);
      }), new ft(4, 4, 8, 4, gt), new ft(4, 5, 16, 8, gt), new ft(4, 6, 32, 32, gt), new ft(4, 4, 16, 16, dt), new ft(8, 16, 32, 32, dt), new ft(8, 16, 128, 128, dt), new ft(8, 32, 128, 256, dt), new ft(32, 128, 258, 1024, dt), new ft(32, 258, 258, 4096, dt)], o.deflateInit = function(e, N) {
        return zt(e, N, p, 15, 8, 0);
      }, o.deflateInit2 = zt, o.deflateReset = Ot, o.deflateResetKeep = yt, o.deflateSetHeader = function(e, N) {
        return e && e.state ? e.state.wrap !== 2 ? v : (e.state.gzhead = N, h) : v;
      }, o.deflate = function(e, N) {
        var B, w, m, C;
        if (!e || !e.state || 5 < N || N < 0) return e ? ot(e, v) : v;
        if (w = e.state, !e.output || !e.input && e.avail_in !== 0 || w.status === 666 && N !== _) return ot(e, e.avail_out === 0 ? -5 : v);
        if (w.strm = e, B = w.last_flush, w.last_flush = N, w.status === S) if (w.wrap === 2) e.adler = 0, et(w, 31), et(w, 139), et(w, 8), w.gzhead ? (et(w, (w.gzhead.text ? 1 : 0) + (w.gzhead.hcrc ? 2 : 0) + (w.gzhead.extra ? 4 : 0) + (w.gzhead.name ? 8 : 0) + (w.gzhead.comment ? 16 : 0)), et(w, 255 & w.gzhead.time), et(w, w.gzhead.time >> 8 & 255), et(w, w.gzhead.time >> 16 & 255), et(w, w.gzhead.time >> 24 & 255), et(w, w.level === 9 ? 2 : 2 <= w.strategy || w.level < 2 ? 4 : 0), et(w, 255 & w.gzhead.os), w.gzhead.extra && w.gzhead.extra.length && (et(w, 255 & w.gzhead.extra.length), et(w, w.gzhead.extra.length >> 8 & 255)), w.gzhead.hcrc && (e.adler = y(e.adler, w.pending_buf, w.pending, 0)), w.gzindex = 0, w.status = 69) : (et(w, 0), et(w, 0), et(w, 0), et(w, 0), et(w, 0), et(w, w.level === 9 ? 2 : 2 <= w.strategy || w.level < 2 ? 4 : 0), et(w, 3), w.status = L);
        else {
          var M = p + (w.w_bits - 8 << 4) << 8;
          M |= (2 <= w.strategy || w.level < 2 ? 0 : w.level < 6 ? 1 : w.level === 6 ? 2 : 3) << 6, w.strstart !== 0 && (M |= 32), M += 31 - M % 31, w.status = L, q(w, M), w.strstart !== 0 && (q(w, e.adler >>> 16), q(w, 65535 & e.adler)), e.adler = 1;
        }
        if (w.status === 69) if (w.gzhead.extra) {
          for (m = w.pending; w.gzindex < (65535 & w.gzhead.extra.length) && (w.pending !== w.pending_buf_size || (w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), P(e), m = w.pending, w.pending !== w.pending_buf_size)); ) et(w, 255 & w.gzhead.extra[w.gzindex]), w.gzindex++;
          w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), w.gzindex === w.gzhead.extra.length && (w.gzindex = 0, w.status = 73);
        } else w.status = 73;
        if (w.status === 73) if (w.gzhead.name) {
          m = w.pending;
          do {
            if (w.pending === w.pending_buf_size && (w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), P(e), m = w.pending, w.pending === w.pending_buf_size)) {
              C = 1;
              break;
            }
            C = w.gzindex < w.gzhead.name.length ? 255 & w.gzhead.name.charCodeAt(w.gzindex++) : 0, et(w, C);
          } while (C !== 0);
          w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), C === 0 && (w.gzindex = 0, w.status = 91);
        } else w.status = 91;
        if (w.status === 91) if (w.gzhead.comment) {
          m = w.pending;
          do {
            if (w.pending === w.pending_buf_size && (w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), P(e), m = w.pending, w.pending === w.pending_buf_size)) {
              C = 1;
              break;
            }
            C = w.gzindex < w.gzhead.comment.length ? 255 & w.gzhead.comment.charCodeAt(w.gzindex++) : 0, et(w, C);
          } while (C !== 0);
          w.gzhead.hcrc && w.pending > m && (e.adler = y(e.adler, w.pending_buf, w.pending - m, m)), C === 0 && (w.status = 103);
        } else w.status = 103;
        if (w.status === 103 && (w.gzhead.hcrc ? (w.pending + 2 > w.pending_buf_size && P(e), w.pending + 2 <= w.pending_buf_size && (et(w, 255 & e.adler), et(w, e.adler >> 8 & 255), e.adler = 0, w.status = L)) : w.status = L), w.pending !== 0) {
          if (P(e), e.avail_out === 0) return w.last_flush = -1, h;
        } else if (e.avail_in === 0 && V(N) <= V(B) && N !== _) return ot(e, -5);
        if (w.status === 666 && e.avail_in !== 0) return ot(e, -5);
        if (e.avail_in !== 0 || w.lookahead !== 0 || N !== b && w.status !== 666) {
          var j = w.strategy === 2 ? function(I, X) {
            for (var J; ; ) {
              if (I.lookahead === 0 && (wt(I), I.lookahead === 0)) {
                if (X === b) return s;
                break;
              }
              if (I.match_length = 0, J = a._tr_tally(I, 0, I.window[I.strstart]), I.lookahead--, I.strstart++, J && (O(I, !1), I.strm.avail_out === 0)) return s;
            }
            return I.insert = 0, X === _ ? (O(I, !0), I.strm.avail_out === 0 ? at : $) : I.last_lit && (O(I, !1), I.strm.avail_out === 0) ? s : U;
          }(w, N) : w.strategy === 3 ? function(I, X) {
            for (var J, Y, tt, mt, ut = I.window; ; ) {
              if (I.lookahead <= W) {
                if (wt(I), I.lookahead <= W && X === b) return s;
                if (I.lookahead === 0) break;
              }
              if (I.match_length = 0, I.lookahead >= A && 0 < I.strstart && (Y = ut[tt = I.strstart - 1]) === ut[++tt] && Y === ut[++tt] && Y === ut[++tt]) {
                mt = I.strstart + W;
                do
                  ;
                while (Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && Y === ut[++tt] && tt < mt);
                I.match_length = W - (mt - tt), I.match_length > I.lookahead && (I.match_length = I.lookahead);
              }
              if (I.match_length >= A ? (J = a._tr_tally(I, 1, I.match_length - A), I.lookahead -= I.match_length, I.strstart += I.match_length, I.match_length = 0) : (J = a._tr_tally(I, 0, I.window[I.strstart]), I.lookahead--, I.strstart++), J && (O(I, !1), I.strm.avail_out === 0)) return s;
            }
            return I.insert = 0, X === _ ? (O(I, !0), I.strm.avail_out === 0 ? at : $) : I.last_lit && (O(I, !1), I.strm.avail_out === 0) ? s : U;
          }(w, N) : r[w.level].func(w, N);
          if (j !== at && j !== $ || (w.status = 666), j === s || j === at) return e.avail_out === 0 && (w.last_flush = -1), h;
          if (j === U && (N === 1 ? a._tr_align(w) : N !== 5 && (a._tr_stored_block(w, 0, 0, !1), N === 3 && (it(w.head), w.lookahead === 0 && (w.strstart = 0, w.block_start = 0, w.insert = 0))), P(e), e.avail_out === 0)) return w.last_flush = -1, h;
        }
        return N !== _ ? h : w.wrap <= 0 ? 1 : (w.wrap === 2 ? (et(w, 255 & e.adler), et(w, e.adler >> 8 & 255), et(w, e.adler >> 16 & 255), et(w, e.adler >> 24 & 255), et(w, 255 & e.total_in), et(w, e.total_in >> 8 & 255), et(w, e.total_in >> 16 & 255), et(w, e.total_in >> 24 & 255)) : (q(w, e.adler >>> 16), q(w, 65535 & e.adler)), P(e), 0 < w.wrap && (w.wrap = -w.wrap), w.pending !== 0 ? h : 1);
      }, o.deflateEnd = function(e) {
        var N;
        return e && e.state ? (N = e.state.status) !== S && N !== 69 && N !== 73 && N !== 91 && N !== 103 && N !== L && N !== 666 ? ot(e, v) : (e.state = null, N === L ? ot(e, -3) : h) : v;
      }, o.deflateSetDictionary = function(e, N) {
        var B, w, m, C, M, j, I, X, J = N.length;
        if (!e || !e.state || (C = (B = e.state).wrap) === 2 || C === 1 && B.status !== S || B.lookahead) return v;
        for (C === 1 && (e.adler = f(e.adler, N, J, 0)), B.wrap = 0, J >= B.w_size && (C === 0 && (it(B.head), B.strstart = 0, B.block_start = 0, B.insert = 0), X = new n.Buf8(B.w_size), n.arraySet(X, N, J - B.w_size, B.w_size, 0), N = X, J = B.w_size), M = e.avail_in, j = e.next_in, I = e.input, e.avail_in = J, e.next_in = 0, e.input = N, wt(B); B.lookahead >= A; ) {
          for (w = B.strstart, m = B.lookahead - (A - 1); B.ins_h = (B.ins_h << B.hash_shift ^ B.window[w + A - 1]) & B.hash_mask, B.prev[w & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = w, w++, --m; ) ;
          B.strstart = w, B.lookahead = A - 1, wt(B);
        }
        return B.strstart += B.lookahead, B.block_start = B.strstart, B.insert = B.lookahead, B.lookahead = 0, B.match_length = B.prev_length = A - 1, B.match_available = 0, e.next_in = j, e.input = I, e.avail_in = M, B.wrap = C, h;
      }, o.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(i, d, o) {
      d.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(i, d, o) {
      d.exports = function(r, n) {
        var a, f, y, k, b, _, h, v, u, g, c, p, x, E, z, F, D, T, A, W, Q, S, L, s, U;
        a = r.state, f = r.next_in, s = r.input, y = f + (r.avail_in - 5), k = r.next_out, U = r.output, b = k - (n - r.avail_out), _ = k + (r.avail_out - 257), h = a.dmax, v = a.wsize, u = a.whave, g = a.wnext, c = a.window, p = a.hold, x = a.bits, E = a.lencode, z = a.distcode, F = (1 << a.lenbits) - 1, D = (1 << a.distbits) - 1;
        t: do {
          x < 15 && (p += s[f++] << x, x += 8, p += s[f++] << x, x += 8), T = E[p & F];
          e: for (; ; ) {
            if (p >>>= A = T >>> 24, x -= A, (A = T >>> 16 & 255) === 0) U[k++] = 65535 & T;
            else {
              if (!(16 & A)) {
                if (!(64 & A)) {
                  T = E[(65535 & T) + (p & (1 << A) - 1)];
                  continue e;
                }
                if (32 & A) {
                  a.mode = 12;
                  break t;
                }
                r.msg = "invalid literal/length code", a.mode = 30;
                break t;
              }
              W = 65535 & T, (A &= 15) && (x < A && (p += s[f++] << x, x += 8), W += p & (1 << A) - 1, p >>>= A, x -= A), x < 15 && (p += s[f++] << x, x += 8, p += s[f++] << x, x += 8), T = z[p & D];
              r: for (; ; ) {
                if (p >>>= A = T >>> 24, x -= A, !(16 & (A = T >>> 16 & 255))) {
                  if (!(64 & A)) {
                    T = z[(65535 & T) + (p & (1 << A) - 1)];
                    continue r;
                  }
                  r.msg = "invalid distance code", a.mode = 30;
                  break t;
                }
                if (Q = 65535 & T, x < (A &= 15) && (p += s[f++] << x, (x += 8) < A && (p += s[f++] << x, x += 8)), h < (Q += p & (1 << A) - 1)) {
                  r.msg = "invalid distance too far back", a.mode = 30;
                  break t;
                }
                if (p >>>= A, x -= A, (A = k - b) < Q) {
                  if (u < (A = Q - A) && a.sane) {
                    r.msg = "invalid distance too far back", a.mode = 30;
                    break t;
                  }
                  if (L = c, (S = 0) === g) {
                    if (S += v - A, A < W) {
                      for (W -= A; U[k++] = c[S++], --A; ) ;
                      S = k - Q, L = U;
                    }
                  } else if (g < A) {
                    if (S += v + g - A, (A -= g) < W) {
                      for (W -= A; U[k++] = c[S++], --A; ) ;
                      if (S = 0, g < W) {
                        for (W -= A = g; U[k++] = c[S++], --A; ) ;
                        S = k - Q, L = U;
                      }
                    }
                  } else if (S += g - A, A < W) {
                    for (W -= A; U[k++] = c[S++], --A; ) ;
                    S = k - Q, L = U;
                  }
                  for (; 2 < W; ) U[k++] = L[S++], U[k++] = L[S++], U[k++] = L[S++], W -= 3;
                  W && (U[k++] = L[S++], 1 < W && (U[k++] = L[S++]));
                } else {
                  for (S = k - Q; U[k++] = U[S++], U[k++] = U[S++], U[k++] = U[S++], 2 < (W -= 3); ) ;
                  W && (U[k++] = U[S++], 1 < W && (U[k++] = U[S++]));
                }
                break;
              }
            }
            break;
          }
        } while (f < y && k < _);
        f -= W = x >> 3, p &= (1 << (x -= W << 3)) - 1, r.next_in = f, r.next_out = k, r.avail_in = f < y ? y - f + 5 : 5 - (f - y), r.avail_out = k < _ ? _ - k + 257 : 257 - (k - _), a.hold = p, a.bits = x;
      };
    }, {}], 49: [function(i, d, o) {
      var r = i("../utils/common"), n = i("./adler32"), a = i("./crc32"), f = i("./inffast"), y = i("./inftrees"), k = 1, b = 2, _ = 0, h = -2, v = 1, u = 852, g = 592;
      function c(S) {
        return (S >>> 24 & 255) + (S >>> 8 & 65280) + ((65280 & S) << 8) + ((255 & S) << 24);
      }
      function p() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function x(S) {
        var L;
        return S && S.state ? (L = S.state, S.total_in = S.total_out = L.total = 0, S.msg = "", L.wrap && (S.adler = 1 & L.wrap), L.mode = v, L.last = 0, L.havedict = 0, L.dmax = 32768, L.head = null, L.hold = 0, L.bits = 0, L.lencode = L.lendyn = new r.Buf32(u), L.distcode = L.distdyn = new r.Buf32(g), L.sane = 1, L.back = -1, _) : h;
      }
      function E(S) {
        var L;
        return S && S.state ? ((L = S.state).wsize = 0, L.whave = 0, L.wnext = 0, x(S)) : h;
      }
      function z(S, L) {
        var s, U;
        return S && S.state ? (U = S.state, L < 0 ? (s = 0, L = -L) : (s = 1 + (L >> 4), L < 48 && (L &= 15)), L && (L < 8 || 15 < L) ? h : (U.window !== null && U.wbits !== L && (U.window = null), U.wrap = s, U.wbits = L, E(S))) : h;
      }
      function F(S, L) {
        var s, U;
        return S ? (U = new p(), (S.state = U).window = null, (s = z(S, L)) !== _ && (S.state = null), s) : h;
      }
      var D, T, A = !0;
      function W(S) {
        if (A) {
          var L;
          for (D = new r.Buf32(512), T = new r.Buf32(32), L = 0; L < 144; ) S.lens[L++] = 8;
          for (; L < 256; ) S.lens[L++] = 9;
          for (; L < 280; ) S.lens[L++] = 7;
          for (; L < 288; ) S.lens[L++] = 8;
          for (y(k, S.lens, 0, 288, D, 0, S.work, { bits: 9 }), L = 0; L < 32; ) S.lens[L++] = 5;
          y(b, S.lens, 0, 32, T, 0, S.work, { bits: 5 }), A = !1;
        }
        S.lencode = D, S.lenbits = 9, S.distcode = T, S.distbits = 5;
      }
      function Q(S, L, s, U) {
        var at, $ = S.state;
        return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new r.Buf8($.wsize)), U >= $.wsize ? (r.arraySet($.window, L, s - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (U < (at = $.wsize - $.wnext) && (at = U), r.arraySet($.window, L, s - U, at, $.wnext), (U -= at) ? (r.arraySet($.window, L, s - U, U, 0), $.wnext = U, $.whave = $.wsize) : ($.wnext += at, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += at))), 0;
      }
      o.inflateReset = E, o.inflateReset2 = z, o.inflateResetKeep = x, o.inflateInit = function(S) {
        return F(S, 15);
      }, o.inflateInit2 = F, o.inflate = function(S, L) {
        var s, U, at, $, ot, V, it, P, O, et, q, K, wt, gt, dt, ft, _t, yt, Ot, zt, e, N, B, w, m = 0, C = new r.Buf8(4), M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!S || !S.state || !S.output || !S.input && S.avail_in !== 0) return h;
        (s = S.state).mode === 12 && (s.mode = 13), ot = S.next_out, at = S.output, it = S.avail_out, $ = S.next_in, U = S.input, V = S.avail_in, P = s.hold, O = s.bits, et = V, q = it, N = _;
        t: for (; ; ) switch (s.mode) {
          case v:
            if (s.wrap === 0) {
              s.mode = 13;
              break;
            }
            for (; O < 16; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if (2 & s.wrap && P === 35615) {
              C[s.check = 0] = 255 & P, C[1] = P >>> 8 & 255, s.check = a(s.check, C, 2, 0), O = P = 0, s.mode = 2;
              break;
            }
            if (s.flags = 0, s.head && (s.head.done = !1), !(1 & s.wrap) || (((255 & P) << 8) + (P >> 8)) % 31) {
              S.msg = "incorrect header check", s.mode = 30;
              break;
            }
            if ((15 & P) != 8) {
              S.msg = "unknown compression method", s.mode = 30;
              break;
            }
            if (O -= 4, e = 8 + (15 & (P >>>= 4)), s.wbits === 0) s.wbits = e;
            else if (e > s.wbits) {
              S.msg = "invalid window size", s.mode = 30;
              break;
            }
            s.dmax = 1 << e, S.adler = s.check = 1, s.mode = 512 & P ? 10 : 12, O = P = 0;
            break;
          case 2:
            for (; O < 16; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if (s.flags = P, (255 & s.flags) != 8) {
              S.msg = "unknown compression method", s.mode = 30;
              break;
            }
            if (57344 & s.flags) {
              S.msg = "unknown header flags set", s.mode = 30;
              break;
            }
            s.head && (s.head.text = P >> 8 & 1), 512 & s.flags && (C[0] = 255 & P, C[1] = P >>> 8 & 255, s.check = a(s.check, C, 2, 0)), O = P = 0, s.mode = 3;
          case 3:
            for (; O < 32; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            s.head && (s.head.time = P), 512 & s.flags && (C[0] = 255 & P, C[1] = P >>> 8 & 255, C[2] = P >>> 16 & 255, C[3] = P >>> 24 & 255, s.check = a(s.check, C, 4, 0)), O = P = 0, s.mode = 4;
          case 4:
            for (; O < 16; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            s.head && (s.head.xflags = 255 & P, s.head.os = P >> 8), 512 & s.flags && (C[0] = 255 & P, C[1] = P >>> 8 & 255, s.check = a(s.check, C, 2, 0)), O = P = 0, s.mode = 5;
          case 5:
            if (1024 & s.flags) {
              for (; O < 16; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              s.length = P, s.head && (s.head.extra_len = P), 512 & s.flags && (C[0] = 255 & P, C[1] = P >>> 8 & 255, s.check = a(s.check, C, 2, 0)), O = P = 0;
            } else s.head && (s.head.extra = null);
            s.mode = 6;
          case 6:
            if (1024 & s.flags && (V < (K = s.length) && (K = V), K && (s.head && (e = s.head.extra_len - s.length, s.head.extra || (s.head.extra = new Array(s.head.extra_len)), r.arraySet(s.head.extra, U, $, K, e)), 512 & s.flags && (s.check = a(s.check, U, K, $)), V -= K, $ += K, s.length -= K), s.length)) break t;
            s.length = 0, s.mode = 7;
          case 7:
            if (2048 & s.flags) {
              if (V === 0) break t;
              for (K = 0; e = U[$ + K++], s.head && e && s.length < 65536 && (s.head.name += String.fromCharCode(e)), e && K < V; ) ;
              if (512 & s.flags && (s.check = a(s.check, U, K, $)), V -= K, $ += K, e) break t;
            } else s.head && (s.head.name = null);
            s.length = 0, s.mode = 8;
          case 8:
            if (4096 & s.flags) {
              if (V === 0) break t;
              for (K = 0; e = U[$ + K++], s.head && e && s.length < 65536 && (s.head.comment += String.fromCharCode(e)), e && K < V; ) ;
              if (512 & s.flags && (s.check = a(s.check, U, K, $)), V -= K, $ += K, e) break t;
            } else s.head && (s.head.comment = null);
            s.mode = 9;
          case 9:
            if (512 & s.flags) {
              for (; O < 16; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              if (P !== (65535 & s.check)) {
                S.msg = "header crc mismatch", s.mode = 30;
                break;
              }
              O = P = 0;
            }
            s.head && (s.head.hcrc = s.flags >> 9 & 1, s.head.done = !0), S.adler = s.check = 0, s.mode = 12;
            break;
          case 10:
            for (; O < 32; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            S.adler = s.check = c(P), O = P = 0, s.mode = 11;
          case 11:
            if (s.havedict === 0) return S.next_out = ot, S.avail_out = it, S.next_in = $, S.avail_in = V, s.hold = P, s.bits = O, 2;
            S.adler = s.check = 1, s.mode = 12;
          case 12:
            if (L === 5 || L === 6) break t;
          case 13:
            if (s.last) {
              P >>>= 7 & O, O -= 7 & O, s.mode = 27;
              break;
            }
            for (; O < 3; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            switch (s.last = 1 & P, O -= 1, 3 & (P >>>= 1)) {
              case 0:
                s.mode = 14;
                break;
              case 1:
                if (W(s), s.mode = 20, L !== 6) break;
                P >>>= 2, O -= 2;
                break t;
              case 2:
                s.mode = 17;
                break;
              case 3:
                S.msg = "invalid block type", s.mode = 30;
            }
            P >>>= 2, O -= 2;
            break;
          case 14:
            for (P >>>= 7 & O, O -= 7 & O; O < 32; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if ((65535 & P) != (P >>> 16 ^ 65535)) {
              S.msg = "invalid stored block lengths", s.mode = 30;
              break;
            }
            if (s.length = 65535 & P, O = P = 0, s.mode = 15, L === 6) break t;
          case 15:
            s.mode = 16;
          case 16:
            if (K = s.length) {
              if (V < K && (K = V), it < K && (K = it), K === 0) break t;
              r.arraySet(at, U, $, K, ot), V -= K, $ += K, it -= K, ot += K, s.length -= K;
              break;
            }
            s.mode = 12;
            break;
          case 17:
            for (; O < 14; ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if (s.nlen = 257 + (31 & P), P >>>= 5, O -= 5, s.ndist = 1 + (31 & P), P >>>= 5, O -= 5, s.ncode = 4 + (15 & P), P >>>= 4, O -= 4, 286 < s.nlen || 30 < s.ndist) {
              S.msg = "too many length or distance symbols", s.mode = 30;
              break;
            }
            s.have = 0, s.mode = 18;
          case 18:
            for (; s.have < s.ncode; ) {
              for (; O < 3; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              s.lens[M[s.have++]] = 7 & P, P >>>= 3, O -= 3;
            }
            for (; s.have < 19; ) s.lens[M[s.have++]] = 0;
            if (s.lencode = s.lendyn, s.lenbits = 7, B = { bits: s.lenbits }, N = y(0, s.lens, 0, 19, s.lencode, 0, s.work, B), s.lenbits = B.bits, N) {
              S.msg = "invalid code lengths set", s.mode = 30;
              break;
            }
            s.have = 0, s.mode = 19;
          case 19:
            for (; s.have < s.nlen + s.ndist; ) {
              for (; ft = (m = s.lencode[P & (1 << s.lenbits) - 1]) >>> 16 & 255, _t = 65535 & m, !((dt = m >>> 24) <= O); ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              if (_t < 16) P >>>= dt, O -= dt, s.lens[s.have++] = _t;
              else {
                if (_t === 16) {
                  for (w = dt + 2; O < w; ) {
                    if (V === 0) break t;
                    V--, P += U[$++] << O, O += 8;
                  }
                  if (P >>>= dt, O -= dt, s.have === 0) {
                    S.msg = "invalid bit length repeat", s.mode = 30;
                    break;
                  }
                  e = s.lens[s.have - 1], K = 3 + (3 & P), P >>>= 2, O -= 2;
                } else if (_t === 17) {
                  for (w = dt + 3; O < w; ) {
                    if (V === 0) break t;
                    V--, P += U[$++] << O, O += 8;
                  }
                  O -= dt, e = 0, K = 3 + (7 & (P >>>= dt)), P >>>= 3, O -= 3;
                } else {
                  for (w = dt + 7; O < w; ) {
                    if (V === 0) break t;
                    V--, P += U[$++] << O, O += 8;
                  }
                  O -= dt, e = 0, K = 11 + (127 & (P >>>= dt)), P >>>= 7, O -= 7;
                }
                if (s.have + K > s.nlen + s.ndist) {
                  S.msg = "invalid bit length repeat", s.mode = 30;
                  break;
                }
                for (; K--; ) s.lens[s.have++] = e;
              }
            }
            if (s.mode === 30) break;
            if (s.lens[256] === 0) {
              S.msg = "invalid code -- missing end-of-block", s.mode = 30;
              break;
            }
            if (s.lenbits = 9, B = { bits: s.lenbits }, N = y(k, s.lens, 0, s.nlen, s.lencode, 0, s.work, B), s.lenbits = B.bits, N) {
              S.msg = "invalid literal/lengths set", s.mode = 30;
              break;
            }
            if (s.distbits = 6, s.distcode = s.distdyn, B = { bits: s.distbits }, N = y(b, s.lens, s.nlen, s.ndist, s.distcode, 0, s.work, B), s.distbits = B.bits, N) {
              S.msg = "invalid distances set", s.mode = 30;
              break;
            }
            if (s.mode = 20, L === 6) break t;
          case 20:
            s.mode = 21;
          case 21:
            if (6 <= V && 258 <= it) {
              S.next_out = ot, S.avail_out = it, S.next_in = $, S.avail_in = V, s.hold = P, s.bits = O, f(S, q), ot = S.next_out, at = S.output, it = S.avail_out, $ = S.next_in, U = S.input, V = S.avail_in, P = s.hold, O = s.bits, s.mode === 12 && (s.back = -1);
              break;
            }
            for (s.back = 0; ft = (m = s.lencode[P & (1 << s.lenbits) - 1]) >>> 16 & 255, _t = 65535 & m, !((dt = m >>> 24) <= O); ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if (ft && !(240 & ft)) {
              for (yt = dt, Ot = ft, zt = _t; ft = (m = s.lencode[zt + ((P & (1 << yt + Ot) - 1) >> yt)]) >>> 16 & 255, _t = 65535 & m, !(yt + (dt = m >>> 24) <= O); ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              P >>>= yt, O -= yt, s.back += yt;
            }
            if (P >>>= dt, O -= dt, s.back += dt, s.length = _t, ft === 0) {
              s.mode = 26;
              break;
            }
            if (32 & ft) {
              s.back = -1, s.mode = 12;
              break;
            }
            if (64 & ft) {
              S.msg = "invalid literal/length code", s.mode = 30;
              break;
            }
            s.extra = 15 & ft, s.mode = 22;
          case 22:
            if (s.extra) {
              for (w = s.extra; O < w; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              s.length += P & (1 << s.extra) - 1, P >>>= s.extra, O -= s.extra, s.back += s.extra;
            }
            s.was = s.length, s.mode = 23;
          case 23:
            for (; ft = (m = s.distcode[P & (1 << s.distbits) - 1]) >>> 16 & 255, _t = 65535 & m, !((dt = m >>> 24) <= O); ) {
              if (V === 0) break t;
              V--, P += U[$++] << O, O += 8;
            }
            if (!(240 & ft)) {
              for (yt = dt, Ot = ft, zt = _t; ft = (m = s.distcode[zt + ((P & (1 << yt + Ot) - 1) >> yt)]) >>> 16 & 255, _t = 65535 & m, !(yt + (dt = m >>> 24) <= O); ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              P >>>= yt, O -= yt, s.back += yt;
            }
            if (P >>>= dt, O -= dt, s.back += dt, 64 & ft) {
              S.msg = "invalid distance code", s.mode = 30;
              break;
            }
            s.offset = _t, s.extra = 15 & ft, s.mode = 24;
          case 24:
            if (s.extra) {
              for (w = s.extra; O < w; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              s.offset += P & (1 << s.extra) - 1, P >>>= s.extra, O -= s.extra, s.back += s.extra;
            }
            if (s.offset > s.dmax) {
              S.msg = "invalid distance too far back", s.mode = 30;
              break;
            }
            s.mode = 25;
          case 25:
            if (it === 0) break t;
            if (K = q - it, s.offset > K) {
              if ((K = s.offset - K) > s.whave && s.sane) {
                S.msg = "invalid distance too far back", s.mode = 30;
                break;
              }
              wt = K > s.wnext ? (K -= s.wnext, s.wsize - K) : s.wnext - K, K > s.length && (K = s.length), gt = s.window;
            } else gt = at, wt = ot - s.offset, K = s.length;
            for (it < K && (K = it), it -= K, s.length -= K; at[ot++] = gt[wt++], --K; ) ;
            s.length === 0 && (s.mode = 21);
            break;
          case 26:
            if (it === 0) break t;
            at[ot++] = s.length, it--, s.mode = 21;
            break;
          case 27:
            if (s.wrap) {
              for (; O < 32; ) {
                if (V === 0) break t;
                V--, P |= U[$++] << O, O += 8;
              }
              if (q -= it, S.total_out += q, s.total += q, q && (S.adler = s.check = s.flags ? a(s.check, at, q, ot - q) : n(s.check, at, q, ot - q)), q = it, (s.flags ? P : c(P)) !== s.check) {
                S.msg = "incorrect data check", s.mode = 30;
                break;
              }
              O = P = 0;
            }
            s.mode = 28;
          case 28:
            if (s.wrap && s.flags) {
              for (; O < 32; ) {
                if (V === 0) break t;
                V--, P += U[$++] << O, O += 8;
              }
              if (P !== (4294967295 & s.total)) {
                S.msg = "incorrect length check", s.mode = 30;
                break;
              }
              O = P = 0;
            }
            s.mode = 29;
          case 29:
            N = 1;
            break t;
          case 30:
            N = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return h;
        }
        return S.next_out = ot, S.avail_out = it, S.next_in = $, S.avail_in = V, s.hold = P, s.bits = O, (s.wsize || q !== S.avail_out && s.mode < 30 && (s.mode < 27 || L !== 4)) && Q(S, S.output, S.next_out, q - S.avail_out) ? (s.mode = 31, -4) : (et -= S.avail_in, q -= S.avail_out, S.total_in += et, S.total_out += q, s.total += q, s.wrap && q && (S.adler = s.check = s.flags ? a(s.check, at, q, S.next_out - q) : n(s.check, at, q, S.next_out - q)), S.data_type = s.bits + (s.last ? 64 : 0) + (s.mode === 12 ? 128 : 0) + (s.mode === 20 || s.mode === 15 ? 256 : 0), (et == 0 && q === 0 || L === 4) && N === _ && (N = -5), N);
      }, o.inflateEnd = function(S) {
        if (!S || !S.state) return h;
        var L = S.state;
        return L.window && (L.window = null), S.state = null, _;
      }, o.inflateGetHeader = function(S, L) {
        var s;
        return S && S.state && 2 & (s = S.state).wrap ? ((s.head = L).done = !1, _) : h;
      }, o.inflateSetDictionary = function(S, L) {
        var s, U = L.length;
        return S && S.state ? (s = S.state).wrap !== 0 && s.mode !== 11 ? h : s.mode === 11 && n(1, L, U, 0) !== s.check ? -3 : Q(S, L, U, U) ? (s.mode = 31, -4) : (s.havedict = 1, _) : h;
      }, o.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(i, d, o) {
      var r = i("../utils/common"), n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], y = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      d.exports = function(k, b, _, h, v, u, g, c) {
        var p, x, E, z, F, D, T, A, W, Q = c.bits, S = 0, L = 0, s = 0, U = 0, at = 0, $ = 0, ot = 0, V = 0, it = 0, P = 0, O = null, et = 0, q = new r.Buf16(16), K = new r.Buf16(16), wt = null, gt = 0;
        for (S = 0; S <= 15; S++) q[S] = 0;
        for (L = 0; L < h; L++) q[b[_ + L]]++;
        for (at = Q, U = 15; 1 <= U && q[U] === 0; U--) ;
        if (U < at && (at = U), U === 0) return v[u++] = 20971520, v[u++] = 20971520, c.bits = 1, 0;
        for (s = 1; s < U && q[s] === 0; s++) ;
        for (at < s && (at = s), S = V = 1; S <= 15; S++) if (V <<= 1, (V -= q[S]) < 0) return -1;
        if (0 < V && (k === 0 || U !== 1)) return -1;
        for (K[1] = 0, S = 1; S < 15; S++) K[S + 1] = K[S] + q[S];
        for (L = 0; L < h; L++) b[_ + L] !== 0 && (g[K[b[_ + L]]++] = L);
        if (D = k === 0 ? (O = wt = g, 19) : k === 1 ? (O = n, et -= 257, wt = a, gt -= 257, 256) : (O = f, wt = y, -1), S = s, F = u, ot = L = P = 0, E = -1, z = (it = 1 << ($ = at)) - 1, k === 1 && 852 < it || k === 2 && 592 < it) return 1;
        for (; ; ) {
          for (T = S - ot, W = g[L] < D ? (A = 0, g[L]) : g[L] > D ? (A = wt[gt + g[L]], O[et + g[L]]) : (A = 96, 0), p = 1 << S - ot, s = x = 1 << $; v[F + (P >> ot) + (x -= p)] = T << 24 | A << 16 | W | 0, x !== 0; ) ;
          for (p = 1 << S - 1; P & p; ) p >>= 1;
          if (p !== 0 ? (P &= p - 1, P += p) : P = 0, L++, --q[S] == 0) {
            if (S === U) break;
            S = b[_ + g[L]];
          }
          if (at < S && (P & z) !== E) {
            for (ot === 0 && (ot = at), F += s, V = 1 << ($ = S - ot); $ + ot < U && !((V -= q[$ + ot]) <= 0); ) $++, V <<= 1;
            if (it += 1 << $, k === 1 && 852 < it || k === 2 && 592 < it) return 1;
            v[E = P & z] = at << 24 | $ << 16 | F - u | 0;
          }
        }
        return P !== 0 && (v[F + P] = S - ot << 24 | 64 << 16 | 0), c.bits = at, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(i, d, o) {
      d.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(i, d, o) {
      var r = i("../utils/common"), n = 0, a = 1;
      function f(m) {
        for (var C = m.length; 0 <= --C; ) m[C] = 0;
      }
      var y = 0, k = 29, b = 256, _ = b + 1 + k, h = 30, v = 19, u = 2 * _ + 1, g = 15, c = 16, p = 7, x = 256, E = 16, z = 17, F = 18, D = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], T = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], W = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = new Array(2 * (_ + 2));
      f(Q);
      var S = new Array(2 * h);
      f(S);
      var L = new Array(512);
      f(L);
      var s = new Array(256);
      f(s);
      var U = new Array(k);
      f(U);
      var at, $, ot, V = new Array(h);
      function it(m, C, M, j, I) {
        this.static_tree = m, this.extra_bits = C, this.extra_base = M, this.elems = j, this.max_length = I, this.has_stree = m && m.length;
      }
      function P(m, C) {
        this.dyn_tree = m, this.max_code = 0, this.stat_desc = C;
      }
      function O(m) {
        return m < 256 ? L[m] : L[256 + (m >>> 7)];
      }
      function et(m, C) {
        m.pending_buf[m.pending++] = 255 & C, m.pending_buf[m.pending++] = C >>> 8 & 255;
      }
      function q(m, C, M) {
        m.bi_valid > c - M ? (m.bi_buf |= C << m.bi_valid & 65535, et(m, m.bi_buf), m.bi_buf = C >> c - m.bi_valid, m.bi_valid += M - c) : (m.bi_buf |= C << m.bi_valid & 65535, m.bi_valid += M);
      }
      function K(m, C, M) {
        q(m, M[2 * C], M[2 * C + 1]);
      }
      function wt(m, C) {
        for (var M = 0; M |= 1 & m, m >>>= 1, M <<= 1, 0 < --C; ) ;
        return M >>> 1;
      }
      function gt(m, C, M) {
        var j, I, X = new Array(g + 1), J = 0;
        for (j = 1; j <= g; j++) X[j] = J = J + M[j - 1] << 1;
        for (I = 0; I <= C; I++) {
          var Y = m[2 * I + 1];
          Y !== 0 && (m[2 * I] = wt(X[Y]++, Y));
        }
      }
      function dt(m) {
        var C;
        for (C = 0; C < _; C++) m.dyn_ltree[2 * C] = 0;
        for (C = 0; C < h; C++) m.dyn_dtree[2 * C] = 0;
        for (C = 0; C < v; C++) m.bl_tree[2 * C] = 0;
        m.dyn_ltree[2 * x] = 1, m.opt_len = m.static_len = 0, m.last_lit = m.matches = 0;
      }
      function ft(m) {
        8 < m.bi_valid ? et(m, m.bi_buf) : 0 < m.bi_valid && (m.pending_buf[m.pending++] = m.bi_buf), m.bi_buf = 0, m.bi_valid = 0;
      }
      function _t(m, C, M, j) {
        var I = 2 * C, X = 2 * M;
        return m[I] < m[X] || m[I] === m[X] && j[C] <= j[M];
      }
      function yt(m, C, M) {
        for (var j = m.heap[M], I = M << 1; I <= m.heap_len && (I < m.heap_len && _t(C, m.heap[I + 1], m.heap[I], m.depth) && I++, !_t(C, j, m.heap[I], m.depth)); ) m.heap[M] = m.heap[I], M = I, I <<= 1;
        m.heap[M] = j;
      }
      function Ot(m, C, M) {
        var j, I, X, J, Y = 0;
        if (m.last_lit !== 0) for (; j = m.pending_buf[m.d_buf + 2 * Y] << 8 | m.pending_buf[m.d_buf + 2 * Y + 1], I = m.pending_buf[m.l_buf + Y], Y++, j === 0 ? K(m, I, C) : (K(m, (X = s[I]) + b + 1, C), (J = D[X]) !== 0 && q(m, I -= U[X], J), K(m, X = O(--j), M), (J = T[X]) !== 0 && q(m, j -= V[X], J)), Y < m.last_lit; ) ;
        K(m, x, C);
      }
      function zt(m, C) {
        var M, j, I, X = C.dyn_tree, J = C.stat_desc.static_tree, Y = C.stat_desc.has_stree, tt = C.stat_desc.elems, mt = -1;
        for (m.heap_len = 0, m.heap_max = u, M = 0; M < tt; M++) X[2 * M] !== 0 ? (m.heap[++m.heap_len] = mt = M, m.depth[M] = 0) : X[2 * M + 1] = 0;
        for (; m.heap_len < 2; ) X[2 * (I = m.heap[++m.heap_len] = mt < 2 ? ++mt : 0)] = 1, m.depth[I] = 0, m.opt_len--, Y && (m.static_len -= J[2 * I + 1]);
        for (C.max_code = mt, M = m.heap_len >> 1; 1 <= M; M--) yt(m, X, M);
        for (I = tt; M = m.heap[1], m.heap[1] = m.heap[m.heap_len--], yt(m, X, 1), j = m.heap[1], m.heap[--m.heap_max] = M, m.heap[--m.heap_max] = j, X[2 * I] = X[2 * M] + X[2 * j], m.depth[I] = (m.depth[M] >= m.depth[j] ? m.depth[M] : m.depth[j]) + 1, X[2 * M + 1] = X[2 * j + 1] = I, m.heap[1] = I++, yt(m, X, 1), 2 <= m.heap_len; ) ;
        m.heap[--m.heap_max] = m.heap[1], function(ut, Ct) {
          var Zt, Pt, Nt, bt, Xt, Jt, Dt = Ct.dyn_tree, te = Ct.max_code, fe = Ct.stat_desc.static_tree, he = Ct.stat_desc.has_stree, ee = Ct.stat_desc.extra_bits, re = Ct.stat_desc.extra_base, jt = Ct.stat_desc.max_length, Vt = 0;
          for (bt = 0; bt <= g; bt++) ut.bl_count[bt] = 0;
          for (Dt[2 * ut.heap[ut.heap_max] + 1] = 0, Zt = ut.heap_max + 1; Zt < u; Zt++) jt < (bt = Dt[2 * Dt[2 * (Pt = ut.heap[Zt]) + 1] + 1] + 1) && (bt = jt, Vt++), Dt[2 * Pt + 1] = bt, te < Pt || (ut.bl_count[bt]++, Xt = 0, re <= Pt && (Xt = ee[Pt - re]), Jt = Dt[2 * Pt], ut.opt_len += Jt * (bt + Xt), he && (ut.static_len += Jt * (fe[2 * Pt + 1] + Xt)));
          if (Vt !== 0) {
            do {
              for (bt = jt - 1; ut.bl_count[bt] === 0; ) bt--;
              ut.bl_count[bt]--, ut.bl_count[bt + 1] += 2, ut.bl_count[jt]--, Vt -= 2;
            } while (0 < Vt);
            for (bt = jt; bt !== 0; bt--) for (Pt = ut.bl_count[bt]; Pt !== 0; ) te < (Nt = ut.heap[--Zt]) || (Dt[2 * Nt + 1] !== bt && (ut.opt_len += (bt - Dt[2 * Nt + 1]) * Dt[2 * Nt], Dt[2 * Nt + 1] = bt), Pt--);
          }
        }(m, C), gt(X, mt, m.bl_count);
      }
      function e(m, C, M) {
        var j, I, X = -1, J = C[1], Y = 0, tt = 7, mt = 4;
        for (J === 0 && (tt = 138, mt = 3), C[2 * (M + 1) + 1] = 65535, j = 0; j <= M; j++) I = J, J = C[2 * (j + 1) + 1], ++Y < tt && I === J || (Y < mt ? m.bl_tree[2 * I] += Y : I !== 0 ? (I !== X && m.bl_tree[2 * I]++, m.bl_tree[2 * E]++) : Y <= 10 ? m.bl_tree[2 * z]++ : m.bl_tree[2 * F]++, X = I, mt = (Y = 0) === J ? (tt = 138, 3) : I === J ? (tt = 6, 3) : (tt = 7, 4));
      }
      function N(m, C, M) {
        var j, I, X = -1, J = C[1], Y = 0, tt = 7, mt = 4;
        for (J === 0 && (tt = 138, mt = 3), j = 0; j <= M; j++) if (I = J, J = C[2 * (j + 1) + 1], !(++Y < tt && I === J)) {
          if (Y < mt) for (; K(m, I, m.bl_tree), --Y != 0; ) ;
          else I !== 0 ? (I !== X && (K(m, I, m.bl_tree), Y--), K(m, E, m.bl_tree), q(m, Y - 3, 2)) : Y <= 10 ? (K(m, z, m.bl_tree), q(m, Y - 3, 3)) : (K(m, F, m.bl_tree), q(m, Y - 11, 7));
          X = I, mt = (Y = 0) === J ? (tt = 138, 3) : I === J ? (tt = 6, 3) : (tt = 7, 4);
        }
      }
      f(V);
      var B = !1;
      function w(m, C, M, j) {
        q(m, (y << 1) + (j ? 1 : 0), 3), function(I, X, J, Y) {
          ft(I), et(I, J), et(I, ~J), r.arraySet(I.pending_buf, I.window, X, J, I.pending), I.pending += J;
        }(m, C, M);
      }
      o._tr_init = function(m) {
        B || (function() {
          var C, M, j, I, X, J = new Array(g + 1);
          for (I = j = 0; I < k - 1; I++) for (U[I] = j, C = 0; C < 1 << D[I]; C++) s[j++] = I;
          for (s[j - 1] = I, I = X = 0; I < 16; I++) for (V[I] = X, C = 0; C < 1 << T[I]; C++) L[X++] = I;
          for (X >>= 7; I < h; I++) for (V[I] = X << 7, C = 0; C < 1 << T[I] - 7; C++) L[256 + X++] = I;
          for (M = 0; M <= g; M++) J[M] = 0;
          for (C = 0; C <= 143; ) Q[2 * C + 1] = 8, C++, J[8]++;
          for (; C <= 255; ) Q[2 * C + 1] = 9, C++, J[9]++;
          for (; C <= 279; ) Q[2 * C + 1] = 7, C++, J[7]++;
          for (; C <= 287; ) Q[2 * C + 1] = 8, C++, J[8]++;
          for (gt(Q, _ + 1, J), C = 0; C < h; C++) S[2 * C + 1] = 5, S[2 * C] = wt(C, 5);
          at = new it(Q, D, b + 1, _, g), $ = new it(S, T, 0, h, g), ot = new it(new Array(0), A, 0, v, p);
        }(), B = !0), m.l_desc = new P(m.dyn_ltree, at), m.d_desc = new P(m.dyn_dtree, $), m.bl_desc = new P(m.bl_tree, ot), m.bi_buf = 0, m.bi_valid = 0, dt(m);
      }, o._tr_stored_block = w, o._tr_flush_block = function(m, C, M, j) {
        var I, X, J = 0;
        0 < m.level ? (m.strm.data_type === 2 && (m.strm.data_type = function(Y) {
          var tt, mt = 4093624447;
          for (tt = 0; tt <= 31; tt++, mt >>>= 1) if (1 & mt && Y.dyn_ltree[2 * tt] !== 0) return n;
          if (Y.dyn_ltree[18] !== 0 || Y.dyn_ltree[20] !== 0 || Y.dyn_ltree[26] !== 0) return a;
          for (tt = 32; tt < b; tt++) if (Y.dyn_ltree[2 * tt] !== 0) return a;
          return n;
        }(m)), zt(m, m.l_desc), zt(m, m.d_desc), J = function(Y) {
          var tt;
          for (e(Y, Y.dyn_ltree, Y.l_desc.max_code), e(Y, Y.dyn_dtree, Y.d_desc.max_code), zt(Y, Y.bl_desc), tt = v - 1; 3 <= tt && Y.bl_tree[2 * W[tt] + 1] === 0; tt--) ;
          return Y.opt_len += 3 * (tt + 1) + 5 + 5 + 4, tt;
        }(m), I = m.opt_len + 3 + 7 >>> 3, (X = m.static_len + 3 + 7 >>> 3) <= I && (I = X)) : I = X = M + 5, M + 4 <= I && C !== -1 ? w(m, C, M, j) : m.strategy === 4 || X === I ? (q(m, 2 + (j ? 1 : 0), 3), Ot(m, Q, S)) : (q(m, 4 + (j ? 1 : 0), 3), function(Y, tt, mt, ut) {
          var Ct;
          for (q(Y, tt - 257, 5), q(Y, mt - 1, 5), q(Y, ut - 4, 4), Ct = 0; Ct < ut; Ct++) q(Y, Y.bl_tree[2 * W[Ct] + 1], 3);
          N(Y, Y.dyn_ltree, tt - 1), N(Y, Y.dyn_dtree, mt - 1);
        }(m, m.l_desc.max_code + 1, m.d_desc.max_code + 1, J + 1), Ot(m, m.dyn_ltree, m.dyn_dtree)), dt(m), j && ft(m);
      }, o._tr_tally = function(m, C, M) {
        return m.pending_buf[m.d_buf + 2 * m.last_lit] = C >>> 8 & 255, m.pending_buf[m.d_buf + 2 * m.last_lit + 1] = 255 & C, m.pending_buf[m.l_buf + m.last_lit] = 255 & M, m.last_lit++, C === 0 ? m.dyn_ltree[2 * M]++ : (m.matches++, C--, m.dyn_ltree[2 * (s[M] + b + 1)]++, m.dyn_dtree[2 * O(C)]++), m.last_lit === m.lit_bufsize - 1;
      }, o._tr_align = function(m) {
        q(m, 2, 3), K(m, x, Q), function(C) {
          C.bi_valid === 16 ? (et(C, C.bi_buf), C.bi_buf = 0, C.bi_valid = 0) : 8 <= C.bi_valid && (C.pending_buf[C.pending++] = 255 & C.bi_buf, C.bi_buf >>= 8, C.bi_valid -= 8);
        }(m);
      };
    }, { "../utils/common": 41 }], 53: [function(i, d, o) {
      d.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(i, d, o) {
      (function(r) {
        (function(n, a) {
          if (!n.setImmediate) {
            var f, y, k, b, _ = 1, h = {}, v = !1, u = n.document, g = Object.getPrototypeOf && Object.getPrototypeOf(n);
            g = g && g.setTimeout ? g : n, f = {}.toString.call(n.process) === "[object process]" ? function(E) {
              process.nextTick(function() {
                p(E);
              });
            } : function() {
              if (n.postMessage && !n.importScripts) {
                var E = !0, z = n.onmessage;
                return n.onmessage = function() {
                  E = !1;
                }, n.postMessage("", "*"), n.onmessage = z, E;
              }
            }() ? (b = "setImmediate$" + Math.random() + "$", n.addEventListener ? n.addEventListener("message", x, !1) : n.attachEvent("onmessage", x), function(E) {
              n.postMessage(b + E, "*");
            }) : n.MessageChannel ? ((k = new MessageChannel()).port1.onmessage = function(E) {
              p(E.data);
            }, function(E) {
              k.port2.postMessage(E);
            }) : u && "onreadystatechange" in u.createElement("script") ? (y = u.documentElement, function(E) {
              var z = u.createElement("script");
              z.onreadystatechange = function() {
                p(E), z.onreadystatechange = null, y.removeChild(z), z = null;
              }, y.appendChild(z);
            }) : function(E) {
              setTimeout(p, 0, E);
            }, g.setImmediate = function(E) {
              typeof E != "function" && (E = new Function("" + E));
              for (var z = new Array(arguments.length - 1), F = 0; F < z.length; F++) z[F] = arguments[F + 1];
              var D = { callback: E, args: z };
              return h[_] = D, f(_), _++;
            }, g.clearImmediate = c;
          }
          function c(E) {
            delete h[E];
          }
          function p(E) {
            if (v) setTimeout(p, 0, E);
            else {
              var z = h[E];
              if (z) {
                v = !0;
                try {
                  (function(F) {
                    var D = F.callback, T = F.args;
                    switch (T.length) {
                      case 0:
                        D();
                        break;
                      case 1:
                        D(T[0]);
                        break;
                      case 2:
                        D(T[0], T[1]);
                        break;
                      case 3:
                        D(T[0], T[1], T[2]);
                        break;
                      default:
                        D.apply(a, T);
                    }
                  })(z);
                } finally {
                  c(E), v = !1;
                }
              }
            }
          }
          function x(E) {
            E.source === n && typeof E.data == "string" && E.data.indexOf(b) === 0 && p(+E.data.slice(b.length));
          }
        })(typeof self > "u" ? r === void 0 ? this : r : self);
      }).call(this, typeof ae < "u" ? ae : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Je);
var Pr = Je.exports;
const Br = /* @__PURE__ */ Or(Pr);
function Dr(t = {}) {
  const {
    storageKey: l = "page-reviews",
    defaultPagePath: i = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = t;
  function d() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function o() {
    if (typeof window > "u") return [];
    try {
      const p = window.localStorage.getItem(l);
      return (p ? JSON.parse(p) : []).map(Lr);
    } catch {
      return [];
    }
  }
  function r(p) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(l, JSON.stringify(p));
      } catch {
      }
  }
  const n = vt(o()), a = () => n.value;
  function f(p) {
    const x = p || i();
    return n.value.filter((E) => E.pagePath === x);
  }
  function y(p) {
    const x = {
      id: d(),
      ...p,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return n.value.unshift(x), r(n.value), x;
  }
  function k(p, x) {
    const E = n.value.findIndex((z) => z.id === p);
    E > -1 && (n.value[E] = { ...n.value[E], ...x }, r(n.value));
  }
  function b(p) {
    n.value = n.value.filter((x) => x.id !== p), r(n.value);
  }
  function _(p) {
    const x = p || i();
    n.value = n.value.filter((E) => E.pagePath !== x), r(n.value);
  }
  function h() {
    n.value = [], r([]);
  }
  function v() {
    return {
      exportTime: (/* @__PURE__ */ new Date()).toISOString(),
      total: n.value.length,
      reviews: n.value
    };
  }
  function u() {
    ve(
      new Blob([JSON.stringify(v(), null, 2)], { type: "application/json" }),
      `page-reviews-${we()}.json`
    );
  }
  function g() {
    const p = je(v());
    ve(
      new Blob([p], { type: "text/markdown" }),
      `page-reviews-${we()}.md`
    );
  }
  async function c() {
    const p = new Br(), x = v(), E = {
      ...x,
      reviews: x.reviews.map((D) => {
        var T;
        return {
          ...D,
          screenshots: (T = D.screenshots) == null ? void 0 : T.map((A) => A.url ? { type: A.type, filename: A.filename, url: A.url } : { type: A.type, filename: A.filename, imagePath: `images/${A.filename}` })
        };
      })
    };
    p.file("review.json", JSON.stringify(E, null, 2)), p.file("review.md", je(E));
    const z = p.folder("images");
    for (const D of x.reviews)
      for (const T of D.screenshots || [])
        if (T.data && !T.url) {
          const A = T.data.replace(/^data:image\/png;base64,/, "");
          z.file(T.filename, A, { base64: !0 });
        }
    const F = await p.generateAsync({ type: "blob" });
    ve(F, `page-reviews-${we()}.zip`);
  }
  return {
    reviews: n,
    allReviews: a,
    getPageReviews: f,
    addReview: y,
    updateReview: k,
    deleteReview: b,
    clearPageReviews: _,
    clearAllReviews: h,
    exportToJSON: u,
    exportToMarkdown: g,
    exportToZIP: c
  };
}
function Lr(t) {
  if (!t || t.targets) return t;
  const l = t.type === "element" ? {
    type: "element",
    selector: t.selector,
    elementText: t.elementText,
    elementRect: t.elementRect,
    componentTree: t.componentTree,
    aria: t.aria,
    locators: t.locators
  } : {
    type: "viewport",
    viewportRect: t.viewportRect
  };
  return {
    ...t,
    targets: [l]
  };
}
function je(t) {
  const l = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${t.total}`,
    ""
  ], i = Nr(t.reviews, "pagePath");
  return Object.entries(i).forEach(([d, o]) => {
    l.push(`## 页面：${d}`), l.push(""), o.forEach((r, n) => {
      var f, y, k, b;
      l.push(`### ${n + 1}. ${r.title || "未命名评审"}`), l.push(`- **严重等级**：${Fr(r.severity)}`), l.push(`- **状态**：${r.status === "resolved" ? "已解决" : "待处理"}`), l.push(`- **窗口尺寸**：${(f = r.viewport) == null ? void 0 : f.width} × ${(y = r.viewport) == null ? void 0 : y.height}`), r.scroll && l.push(`- **滚动位置**：x=${r.scroll.x}, y=${r.scroll.y}`);
      const a = r.targets || [];
      a.length > 0 && (l.push(`- **评审目标数**：${a.length}`), a.forEach((_, h) => {
        _.type === "element" && _.elementRect ? (l.push(`  - 目标 ${h + 1}（元素）：\`${_.selector}\` x=${_.elementRect.x}, y=${_.elementRect.y}, w=${_.elementRect.width}, h=${_.elementRect.height}`), _.elementText && l.push(`    文本：${_.elementText}`)) : _.viewportRect && l.push(`  - 目标 ${h + 1}（框选）：x=${_.viewportRect.x}, y=${_.viewportRect.y}, w=${_.viewportRect.width}, h=${_.viewportRect.height}`);
      })), l.push(`- **评审建议**：${r.suggestion}`), l.push(`- **创建时间**：${new Date(r.createdAt).toLocaleString()}`), r.locators && Object.keys(r.locators).length > 0 && (l.push(""), l.push("#### 定位信息"), r.locators.cssSelector && l.push(`- **CSS Selector**: \`${r.locators.cssSelector}\``), r.locators.xpath && l.push(`- **XPath**: \`${r.locators.xpath}\``), (k = r.locators.aria) != null && k.role && l.push(`- **ARIA Role**: ${r.locators.aria.role}`), (b = r.locators.aria) != null && b.accessibleName && l.push(`- **Accessible Name**: ${r.locators.aria.accessibleName}`), r.locators.testId && l.push(`- **data-testid**: ${r.locators.testId}`)), r.screenshots && r.screenshots.length > 0 && (l.push(""), l.push("#### 截图"), r.screenshots.forEach((_) => {
        const h = _.url || _.imagePath || `images/${_.filename}`;
        l.push(`![${_.type}](${h})`);
      })), l.push("");
    });
  }), l.join(`
`);
}
function ve(t, l) {
  if (typeof window > "u") return;
  const i = URL.createObjectURL(t), d = document.createElement("a");
  d.href = i, d.download = l, d.style.display = "none", document.body.appendChild(d), d.click(), setTimeout(() => {
    d.parentNode && document.body.removeChild(d), URL.revokeObjectURL(i);
  }, 1e3);
}
function we() {
  const t = /* @__PURE__ */ new Date();
  return `${t.getFullYear()}${oe(t.getMonth() + 1)}${oe(t.getDate())}-${oe(t.getHours())}${oe(t.getMinutes())}`;
}
function oe(t) {
  return String(t).padStart(2, "0");
}
function Fr(t) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[t] || t;
}
function Nr(t, l) {
  return t.reduce((i, d) => {
    const o = d[l] || "unknown";
    return i[o] || (i[o] = []), i[o].push(d), i;
  }, {});
}
function Ur({ active: t, mode: l, onIgnoreTarget: i } = {}) {
  const d = vt(null), o = vt(""), r = vt([]), n = vt({ x: 0, y: 0 }), a = () => !!G(t) && G(l) === "element", f = (c) => {
    const p = c.target;
    return !p || !(p instanceof Element) || i && i(p) ? null : p;
  }, y = (c) => {
    if (!a() || c.buttons !== 0) return;
    const p = f(c);
    if (!p) {
      d.value = null;
      return;
    }
    const x = p.getBoundingClientRect();
    d.value = {
      x: x.left,
      y: x.top,
      width: x.width,
      height: x.height
    }, o.value = p.tagName.toLowerCase();
  }, k = () => {
    d.value = null;
  }, b = (c) => {
    var z;
    if (!a()) return;
    const p = f(c);
    if (!p || p.closest("a[download]")) return;
    c.preventDefault(), c.stopPropagation();
    const x = p.getBoundingClientRect(), E = {
      el: p,
      selector: $e(p),
      tag: p.tagName.toLowerCase(),
      text: ((z = p.innerText) == null ? void 0 : z.slice(0, 40)) || "",
      rect: {
        x: x.left,
        y: x.top,
        width: x.width,
        height: x.height
      },
      docRect: {
        x: x.left + n.value.x,
        y: x.top + n.value.y,
        width: x.width,
        height: x.height
      }
    };
    if (Mr(c)) {
      const F = r.value.findIndex((D) => D.el === p);
      F > -1 ? r.value.splice(F, 1) : r.value.push(E);
    } else
      r.value = [E];
  }, _ = () => {
    r.value = r.value.map((c) => {
      const p = c.el || (c.selector ? document.querySelector(c.selector) : null);
      if (!p) return c;
      const x = p.getBoundingClientRect();
      return {
        ...c,
        el: p,
        rect: {
          x: x.left,
          y: x.top,
          width: x.width,
          height: x.height
        }
      };
    });
  }, h = () => {
    n.value = { x: window.scrollX, y: window.scrollY }, _();
  };
  return Qt((c) => {
    a() && (n.value = { x: window.scrollX, y: window.scrollY }, document.addEventListener("mousemove", y), document.addEventListener("mouseout", k), document.addEventListener("click", b, !0), window.addEventListener("scroll", h, !0), c(() => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseout", k), document.removeEventListener("click", b, !0), window.removeEventListener("scroll", h, !0);
    }));
  }), {
    hoveredRect: d,
    hoveredTag: o,
    selectedElements: r,
    selectElement: (c) => {
      var x;
      if (!c || !(c instanceof Element)) return;
      const p = c.getBoundingClientRect();
      r.value = [{
        el: c,
        selector: $e(c),
        tag: c.tagName.toLowerCase(),
        text: ((x = c.innerText) == null ? void 0 : x.slice(0, 40)) || "",
        rect: {
          x: p.left,
          y: p.top,
          width: p.width,
          height: p.height
        },
        docRect: {
          x: p.left + n.value.x,
          y: p.top + n.value.y,
          width: p.width,
          height: p.height
        }
      }];
    },
    removeSelectedElement: (c) => {
      r.value = r.value.filter((p) => p.el !== c.el);
    },
    clearSelectedElements: () => {
      r.value = [];
    },
    refreshRects: _
  };
}
function Mr(t) {
  return t.ctrlKey || t.metaKey;
}
function $e(t) {
  var d;
  if (!t || !(t instanceof Element)) return "";
  if (t.id) return "#" + t.id;
  if (t.className) {
    const o = String(t.className).split(/\s+/).filter((r) => r && !r.startsWith("el-")).slice(0, 2);
    if (o.length) return t.tagName.toLowerCase() + "." + o.join(".");
  }
  let l = [], i = t;
  for (; i && i !== document.body; ) {
    let o = i.tagName.toLowerCase();
    if (i.id) {
      o += "#" + i.id, l.unshift(o);
      break;
    }
    const n = Array.from(((d = i.parentNode) == null ? void 0 : d.children) || []).filter((a) => a.tagName === i.tagName);
    if (n.length > 1) {
      const a = n.indexOf(i) + 1;
      o += `:nth-of-type(${a})`;
    }
    l.unshift(o), i = i.parentNode;
  }
  return l.join(" > ");
}
function jr({ active: t, mode: l, onIgnoreTarget: i, onBoxCreate: d } = {}) {
  const o = vt([]), r = vt(null), n = vt(null), a = vt(!1), f = vt({ x: 0, y: 0 }), y = vt(0);
  let k = { x: 0, y: 0 }, b = "", _ = { x: 0, y: 0, rect: null };
  const h = () => !!G(t) && G(l) === "viewport", v = Bt(() => n.value !== null), u = (T) => {
    const A = T.target;
    return !A || !(A instanceof Element) || i && i(A) ? null : A;
  }, g = (T) => T ? {
    x: T.x - f.value.x,
    y: T.y - f.value.y,
    width: T.width,
    height: T.height
  } : null, c = (T) => {
    o.value = o.value.filter((A) => A.id !== T.id), o.value.forEach((A, W) => {
      A.index = W;
    });
  }, p = () => {
    o.value = [], r.value = null;
  }, x = (T, A, W) => {
    W.stopPropagation(), n.value = T.id, b = A, _ = {
      x: W.clientX + window.scrollX,
      y: W.clientY + window.scrollY,
      rect: { ...T.rect }
    };
  }, E = (T) => {
    !h() || n.value || !u(T) || (T.preventDefault(), a.value = !0, k = { x: T.clientX, y: T.clientY }, r.value = { x: T.clientX, y: T.clientY, width: 0, height: 0 });
  }, z = (T) => {
    if (!h() && !n.value) return;
    if (n.value && _.rect) {
      const Q = T.clientX + window.scrollX - _.x, S = T.clientY + window.scrollY - _.y, L = _.rect, s = o.value.find((V) => V.id === n.value);
      if (!s) return;
      let { x: U, y: at, width: $, height: ot } = L;
      b.includes("e") && ($ = Math.max(10, L.width + Q)), b.includes("s") && (ot = Math.max(10, L.height + S)), b.includes("w") && ($ = Math.max(10, L.width - Q), U = L.x + (L.width - $)), b.includes("n") && (ot = Math.max(10, L.height - S), at = L.y + (L.height - ot)), s.rect = { x: U, y: at, width: $, height: ot };
      return;
    }
    if (!a.value) return;
    const A = T.clientX, W = T.clientY;
    r.value = {
      x: Math.min(k.x, A),
      y: Math.min(k.y, W),
      width: Math.abs(A - k.x),
      height: Math.abs(W - k.y)
    };
  }, F = (T) => {
    if (!h() && !n.value) return;
    if (n.value) {
      n.value = null, b = "", _ = { x: 0, y: 0, rect: null };
      return;
    }
    if (!a.value) return;
    a.value = !1;
    const A = r.value;
    if (A && A.width > 10 && A.height > 10) {
      const W = {
        id: "box-" + Date.now() + "-" + y.value++,
        index: o.value.length,
        rect: {
          x: A.x + window.scrollX,
          y: A.y + window.scrollY,
          width: A.width,
          height: A.height
        }
      };
      o.value.push(W), d == null || d(W, T);
    }
    r.value = null;
  }, D = () => {
    f.value = { x: window.scrollX, y: window.scrollY };
  };
  return Qt((T) => {
    !h() && !n.value || (document.addEventListener("mousedown", E), document.addEventListener("mousemove", z), document.addEventListener("mouseup", F), window.addEventListener("scroll", D, !0), T(() => {
      document.removeEventListener("mousedown", E), document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", F), window.removeEventListener("scroll", D, !0);
    }));
  }), {
    selectedBoxes: o,
    dragRect: r,
    resizingBoxId: n,
    isDraggingBox: a,
    isResizing: v,
    removeBox: c,
    clearBoxes: p,
    startResize: x,
    toViewportRect: g
  };
}
function We({
  initialPosition: t = { x: 0, y: 0 },
  initialSize: l = { width: null, height: null },
  minWidth: i = 200,
  minHeight: d = 40,
  isDragHandle: o,
  measureRef: r = null
} = {}) {
  const n = vt({ ...t }), a = vt({ ...l }), f = vt(!1), y = vt(!1), k = { x: 0, y: 0 }, b = { x: 0, y: 0, width: 0, height: 0 }, _ = (v) => {
    o && !o(v.target) || (f.value = !0, k.x = v.clientX - n.value.x, k.y = v.clientY - n.value.y, v.stopPropagation());
  }, h = (v) => {
    let u = a.value.width ?? 0, g = a.value.height ?? 0;
    if ((u === 0 || g === 0) && (r != null && r.value)) {
      const c = r.value.getBoundingClientRect();
      u = c.width, g = c.height;
    }
    a.value = { width: u, height: g }, y.value = !0, b.x = v.clientX, b.y = v.clientY, b.width = u, b.height = g, v.stopPropagation();
  };
  return xe([f, y], ([v, u], g, c) => {
    if (!v && !u) return;
    const p = (E) => {
      if (f.value)
        n.value = {
          x: E.clientX - k.x,
          y: E.clientY - k.y
        };
      else if (y.value) {
        const z = E.clientX - b.x, F = E.clientY - b.y;
        a.value = {
          width: Math.max(i, b.width + z),
          height: Math.max(d, b.height + F)
        };
      }
    }, x = () => {
      f.value = !1, y.value = !1;
    };
    document.addEventListener("mousemove", p), document.addEventListener("mouseup", x), c(() => {
      document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", x);
    });
  }), {
    position: n,
    size: a,
    isDragging: f,
    isResizing: y,
    onDragStart: _,
    onResizeStart: h
  };
}
function $r({ active: t } = {}) {
  const l = vt({ x: 0, y: 0 });
  return Qt((n) => {
    if (t !== void 0 && !G(t)) return;
    l.value = { x: window.scrollX, y: window.scrollY };
    const a = () => {
      l.value = { x: window.scrollX, y: window.scrollY };
    };
    window.addEventListener("scroll", a, !0), n(() => window.removeEventListener("scroll", a, !0));
  }), {
    scrollPos: l,
    toViewportRect: (n) => n ? {
      x: n.x - l.value.x,
      y: n.y - l.value.y,
      width: n.width,
      height: n.height
    } : null,
    highlightStyle: (n) => n ? {
      left: n.x + "px",
      top: n.y + "px",
      width: n.width + "px",
      height: n.height + "px"
    } : {},
    boxStyle: (n) => n ? {
      left: n.x + "px",
      top: n.y + "px",
      width: n.width + "px",
      height: n.height + "px"
    } : {},
    handleStyle: (n, a) => {
      const y = {};
      return n.includes("n") && (y.top = -8 / 2 + "px"), n.includes("s") && (y.bottom = -8 / 2 + "px"), n.includes("w") && (y.left = -8 / 2 + "px"), n.includes("e") && (y.right = -8 / 2 + "px"), (n === "n" || n === "s") && (y.left = a.width / 2 - 8 / 2 + "px"), (n === "w" || n === "e") && (y.top = a.height / 2 - 8 / 2 + "px"), y.width = "8px", y.height = "8px", y;
    }
  };
}
function Wr(t, l) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const i = document.implementation.createHTMLDocument(), d = i.createElement("base"), o = i.createElement("a");
  return i.head.appendChild(d), i.body.appendChild(o), l && (d.href = l), o.href = t, o.href;
}
const Zr = /* @__PURE__ */ (() => {
  let t = 0;
  const l = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${l()}${t}`);
})();
function Wt(t) {
  const l = [];
  for (let i = 0, d = t.length; i < d; i++)
    l.push(t[i]);
  return l;
}
let Kt = null;
function Qe(t = {}) {
  return Kt || (t.includeStyleProperties ? (Kt = t.includeStyleProperties, Kt) : (Kt = Wt(window.getComputedStyle(document.documentElement)), Kt));
}
function le(t, l) {
  const d = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(l);
  return d ? parseFloat(d.replace("px", "")) : 0;
}
function Vr(t) {
  const l = le(t, "border-left-width"), i = le(t, "border-right-width");
  return t.clientWidth + l + i;
}
function Hr(t) {
  const l = le(t, "border-top-width"), i = le(t, "border-bottom-width");
  return t.clientHeight + l + i;
}
function tr(t, l = {}) {
  const i = l.width || Vr(t), d = l.height || Hr(t);
  return { width: i, height: d };
}
function Gr() {
  let t, l;
  try {
    l = process;
  } catch {
  }
  const i = l && l.env ? l.env.devicePixelRatio : null;
  return i && (t = parseInt(i, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const It = 16384;
function Xr(t) {
  (t.width > It || t.height > It) && (t.width > It && t.height > It ? t.width > t.height ? (t.height *= It / t.width, t.width = It) : (t.width *= It / t.height, t.height = It) : t.width > It ? (t.height *= It / t.width, t.width = It) : (t.width *= It / t.height, t.height = It));
}
function ue(t) {
  return new Promise((l, i) => {
    const d = new Image();
    d.onload = () => {
      d.decode().then(() => {
        requestAnimationFrame(() => l(d));
      });
    }, d.onerror = i, d.crossOrigin = "anonymous", d.decoding = "async", d.src = t;
  });
}
async function Yr(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((l) => `data:image/svg+xml;charset=utf-8,${l}`);
}
async function Kr(t, l, i) {
  const d = "http://www.w3.org/2000/svg", o = document.createElementNS(d, "svg"), r = document.createElementNS(d, "foreignObject");
  return o.setAttribute("width", `${l}`), o.setAttribute("height", `${i}`), o.setAttribute("viewBox", `0 0 ${l} ${i}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), o.appendChild(r), r.appendChild(t), Yr(o);
}
const Rt = (t, l) => {
  if (t instanceof l)
    return !0;
  const i = Object.getPrototypeOf(t);
  return i === null ? !1 : i.constructor.name === l.name || Rt(i, l);
};
function qr(t) {
  const l = t.getPropertyValue("content");
  return `${t.cssText} content: '${l.replace(/'|"/g, "")}';`;
}
function Jr(t, l) {
  return Qe(l).map((i) => {
    const d = t.getPropertyValue(i), o = t.getPropertyPriority(i);
    return `${i}: ${d}${o ? " !important" : ""};`;
  }).join(" ");
}
function Qr(t, l, i, d) {
  const o = `.${t}:${l}`, r = i.cssText ? qr(i) : Jr(i, d);
  return document.createTextNode(`${o}{${r}}`);
}
function Ze(t, l, i, d) {
  const o = window.getComputedStyle(t, i), r = o.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const n = Zr();
  try {
    l.className = `${l.className} ${n}`;
  } catch {
    return;
  }
  const a = document.createElement("style");
  a.appendChild(Qr(n, i, o, d)), l.appendChild(a);
}
function tn(t, l, i) {
  Ze(t, l, ":before", i), Ze(t, l, ":after", i);
}
const Ve = "application/font-woff", He = "image/jpeg", en = {
  woff: Ve,
  woff2: Ve,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: He,
  jpeg: He,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function rn(t) {
  const l = /\.([^./]*?)$/g.exec(t);
  return l ? l[1] : "";
}
function Se(t) {
  const l = rn(t).toLowerCase();
  return en[l] || "";
}
function nn(t) {
  return t.split(/,/)[1];
}
function ke(t) {
  return t.search(/^(data:)/) !== -1;
}
function an(t, l) {
  return `data:${l};base64,${t}`;
}
async function er(t, l, i) {
  const d = await fetch(t, l);
  if (d.status === 404)
    throw new Error(`Resource "${d.url}" not found`);
  const o = await d.blob();
  return new Promise((r, n) => {
    const a = new FileReader();
    a.onerror = n, a.onloadend = () => {
      try {
        r(i({ res: d, result: a.result }));
      } catch (f) {
        n(f);
      }
    }, a.readAsDataURL(o);
  });
}
const ye = {};
function sn(t, l, i) {
  let d = t.replace(/\?.*/, "");
  return i && (d = t), /ttf|otf|eot|woff2?/i.test(d) && (d = d.replace(/.*\//, "")), l ? `[${l}]${d}` : d;
}
async function Ee(t, l, i) {
  const d = sn(t, l, i.includeQueryParams);
  if (ye[d] != null)
    return ye[d];
  i.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const r = await er(t, i.fetchRequestInit, ({ res: n, result: a }) => (l || (l = n.headers.get("Content-Type") || ""), nn(a)));
    o = an(r, l);
  } catch (r) {
    o = i.imagePlaceholder || "";
    let n = `Failed to fetch resource: ${t}`;
    r && (n = typeof r == "string" ? r : r.message), n && console.warn(n);
  }
  return ye[d] = o, o;
}
async function on(t) {
  const l = t.toDataURL();
  return l === "data:," ? t.cloneNode(!1) : ue(l);
}
async function ln(t, l) {
  if (t.currentSrc) {
    const r = document.createElement("canvas"), n = r.getContext("2d");
    r.width = t.clientWidth, r.height = t.clientHeight, n == null || n.drawImage(t, 0, 0, r.width, r.height);
    const a = r.toDataURL();
    return ue(a);
  }
  const i = t.poster, d = Se(i), o = await Ee(i, d, l);
  return ue(o);
}
async function un(t, l) {
  var i;
  try {
    if (!((i = t == null ? void 0 : t.contentDocument) === null || i === void 0) && i.body)
      return await de(t.contentDocument.body, l, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function cn(t, l) {
  return Rt(t, HTMLCanvasElement) ? on(t) : Rt(t, HTMLVideoElement) ? ln(t, l) : Rt(t, HTMLIFrameElement) ? un(t, l) : t.cloneNode(rr(t));
}
const dn = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", rr = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function fn(t, l, i) {
  var d, o;
  if (rr(l))
    return l;
  let r = [];
  return dn(t) && t.assignedNodes ? r = Wt(t.assignedNodes()) : Rt(t, HTMLIFrameElement) && (!((d = t.contentDocument) === null || d === void 0) && d.body) ? r = Wt(t.contentDocument.body.childNodes) : r = Wt(((o = t.shadowRoot) !== null && o !== void 0 ? o : t).childNodes), r.length === 0 || Rt(t, HTMLVideoElement) || await r.reduce((n, a) => n.then(() => de(a, i)).then((f) => {
    f && l.appendChild(f);
  }), Promise.resolve()), l;
}
function hn(t, l, i) {
  const d = l.style;
  if (!d)
    return;
  const o = window.getComputedStyle(t);
  o.cssText ? (d.cssText = o.cssText, d.transformOrigin = o.transformOrigin) : Qe(i).forEach((r) => {
    let n = o.getPropertyValue(r);
    r === "font-size" && n.endsWith("px") && (n = `${Math.floor(parseFloat(n.substring(0, n.length - 2))) - 0.1}px`), Rt(t, HTMLIFrameElement) && r === "display" && n === "inline" && (n = "block"), r === "d" && l.getAttribute("d") && (n = `path(${l.getAttribute("d")})`), d.setProperty(r, n, o.getPropertyPriority(r));
  });
}
function pn(t, l) {
  Rt(t, HTMLTextAreaElement) && (l.innerHTML = t.value), Rt(t, HTMLInputElement) && l.setAttribute("value", t.value);
}
function mn(t, l) {
  if (Rt(t, HTMLSelectElement)) {
    const i = l, d = Array.from(i.children).find((o) => t.value === o.getAttribute("value"));
    d && d.setAttribute("selected", "");
  }
}
function gn(t, l, i) {
  return Rt(l, Element) && (hn(t, l, i), tn(t, l, i), pn(t, l), mn(t, l)), l;
}
async function vn(t, l) {
  const i = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (i.length === 0)
    return t;
  const d = {};
  for (let r = 0; r < i.length; r++) {
    const a = i[r].getAttribute("xlink:href");
    if (a) {
      const f = t.querySelector(a), y = document.querySelector(a);
      !f && y && !d[a] && (d[a] = await de(y, l, !0));
    }
  }
  const o = Object.values(d);
  if (o.length) {
    const r = "http://www.w3.org/1999/xhtml", n = document.createElementNS(r, "svg");
    n.setAttribute("xmlns", r), n.style.position = "absolute", n.style.width = "0", n.style.height = "0", n.style.overflow = "hidden", n.style.display = "none";
    const a = document.createElementNS(r, "defs");
    n.appendChild(a);
    for (let f = 0; f < o.length; f++)
      a.appendChild(o[f]);
    t.appendChild(n);
  }
  return t;
}
async function de(t, l, i) {
  return !i && l.filter && !l.filter(t) ? null : Promise.resolve(t).then((d) => cn(d, l)).then((d) => fn(t, d, l)).then((d) => gn(t, d, l)).then((d) => vn(d, l));
}
const nr = /url\((['"]?)([^'"]+?)\1\)/g, wn = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, yn = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function bn(t) {
  const l = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${l})(['"]?\\))`, "g");
}
function _n(t) {
  const l = [];
  return t.replace(nr, (i, d, o) => (l.push(o), i)), l.filter((i) => !ke(i));
}
async function xn(t, l, i, d, o) {
  try {
    const r = i ? Wr(l, i) : l, n = Se(l);
    let a;
    return o || (a = await Ee(r, n, d)), t.replace(bn(l), `$1${a}$3`);
  } catch {
  }
  return t;
}
function kn(t, { preferredFontFormat: l }) {
  return l ? t.replace(yn, (i) => {
    for (; ; ) {
      const [d, , o] = wn.exec(i) || [];
      if (!o)
        return "";
      if (o === l)
        return `src: ${d};`;
    }
  }) : t;
}
function ir(t) {
  return t.search(nr) !== -1;
}
async function ar(t, l, i) {
  if (!ir(t))
    return t;
  const d = kn(t, i);
  return _n(d).reduce((r, n) => r.then((a) => xn(a, n, l, i)), Promise.resolve(d));
}
async function qt(t, l, i) {
  var d;
  const o = (d = l.style) === null || d === void 0 ? void 0 : d.getPropertyValue(t);
  if (o) {
    const r = await ar(o, null, i);
    return l.style.setProperty(t, r, l.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function Sn(t, l) {
  await qt("background", t, l) || await qt("background-image", t, l), await qt("mask", t, l) || await qt("-webkit-mask", t, l) || await qt("mask-image", t, l) || await qt("-webkit-mask-image", t, l);
}
async function En(t, l) {
  const i = Rt(t, HTMLImageElement);
  if (!(i && !ke(t.src)) && !(Rt(t, SVGImageElement) && !ke(t.href.baseVal)))
    return;
  const d = i ? t.src : t.href.baseVal, o = await Ee(d, Se(d), l);
  await new Promise((r, n) => {
    t.onload = r, t.onerror = l.onImageErrorHandler ? (...f) => {
      try {
        r(l.onImageErrorHandler(...f));
      } catch (y) {
        n(y);
      }
    } : n;
    const a = t;
    a.decode && (a.decode = r), a.loading === "lazy" && (a.loading = "eager"), i ? (t.srcset = "", t.src = o) : t.href.baseVal = o;
  });
}
async function zn(t, l) {
  const d = Wt(t.childNodes).map((o) => sr(o, l));
  await Promise.all(d).then(() => t);
}
async function sr(t, l) {
  Rt(t, Element) && (await Sn(t, l), await En(t, l), await zn(t, l));
}
function Cn(t, l) {
  const { style: i } = t;
  l.backgroundColor && (i.backgroundColor = l.backgroundColor), l.width && (i.width = `${l.width}px`), l.height && (i.height = `${l.height}px`);
  const d = l.style;
  return d != null && Object.keys(d).forEach((o) => {
    i[o] = d[o];
  }), t;
}
const Ge = {};
async function Xe(t) {
  let l = Ge[t];
  if (l != null)
    return l;
  const d = await (await fetch(t)).text();
  return l = { url: t, cssText: d }, Ge[t] = l, l;
}
async function Ye(t, l) {
  let i = t.cssText;
  const d = /url\(["']?([^"')]+)["']?\)/g, r = (i.match(/url\([^)]+\)/g) || []).map(async (n) => {
    let a = n.replace(d, "$1");
    return a.startsWith("https://") || (a = new URL(a, t.url).href), er(a, l.fetchRequestInit, ({ result: f }) => (i = i.replace(n, `url(${f})`), [n, f]));
  });
  return Promise.all(r).then(() => i);
}
function Ke(t) {
  if (t == null)
    return [];
  const l = [], i = /(\/\*[\s\S]*?\*\/)/gi;
  let d = t.replace(i, "");
  const o = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const f = o.exec(d);
    if (f === null)
      break;
    l.push(f[0]);
  }
  d = d.replace(o, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, n = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", a = new RegExp(n, "gi");
  for (; ; ) {
    let f = r.exec(d);
    if (f === null) {
      if (f = a.exec(d), f === null)
        break;
      r.lastIndex = a.lastIndex;
    } else
      a.lastIndex = r.lastIndex;
    l.push(f[0]);
  }
  return l;
}
async function Rn(t, l) {
  const i = [], d = [];
  return t.forEach((o) => {
    if ("cssRules" in o)
      try {
        Wt(o.cssRules || []).forEach((r, n) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let a = n + 1;
            const f = r.href, y = Xe(f).then((k) => Ye(k, l)).then((k) => Ke(k).forEach((b) => {
              try {
                o.insertRule(b, b.startsWith("@import") ? a += 1 : o.cssRules.length);
              } catch (_) {
                console.error("Error inserting rule from remote css", {
                  rule: b,
                  error: _
                });
              }
            })).catch((k) => {
              console.error("Error loading remote css", k.toString());
            });
            d.push(y);
          }
        });
      } catch (r) {
        const n = t.find((a) => a.href == null) || document.styleSheets[0];
        o.href != null && d.push(Xe(o.href).then((a) => Ye(a, l)).then((a) => Ke(a).forEach((f) => {
          n.insertRule(f, n.cssRules.length);
        })).catch((a) => {
          console.error("Error loading remote stylesheet", a);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(d).then(() => (t.forEach((o) => {
    if ("cssRules" in o)
      try {
        Wt(o.cssRules || []).forEach((r) => {
          i.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${o.href}`, r);
      }
  }), i));
}
function An(t) {
  return t.filter((l) => l.type === CSSRule.FONT_FACE_RULE).filter((l) => ir(l.style.getPropertyValue("src")));
}
async function Tn(t, l) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const i = Wt(t.ownerDocument.styleSheets), d = await Rn(i, l);
  return An(d);
}
function or(t) {
  return t.trim().replace(/["']/g, "");
}
function In(t) {
  const l = /* @__PURE__ */ new Set();
  function i(d) {
    (d.style.fontFamily || getComputedStyle(d).fontFamily).split(",").forEach((r) => {
      l.add(or(r));
    }), Array.from(d.children).forEach((r) => {
      r instanceof HTMLElement && i(r);
    });
  }
  return i(t), l;
}
async function On(t, l) {
  const i = await Tn(t, l), d = In(t);
  return (await Promise.all(i.filter((r) => d.has(or(r.style.fontFamily))).map((r) => {
    const n = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return ar(r.cssText, n, l);
  }))).join(`
`);
}
async function Pn(t, l) {
  const i = l.fontEmbedCSS != null ? l.fontEmbedCSS : l.skipFonts ? null : await On(t, l);
  if (i) {
    const d = document.createElement("style"), o = document.createTextNode(i);
    d.appendChild(o), t.firstChild ? t.insertBefore(d, t.firstChild) : t.appendChild(d);
  }
}
async function Bn(t, l = {}) {
  const { width: i, height: d } = tr(t, l), o = await de(t, l, !0);
  return await Pn(o, l), await sr(o, l), Cn(o, l), await Kr(o, i, d);
}
async function Dn(t, l = {}) {
  const { width: i, height: d } = tr(t, l), o = await Bn(t, l), r = await ue(o), n = document.createElement("canvas"), a = n.getContext("2d"), f = l.pixelRatio || Gr(), y = l.canvasWidth || i, k = l.canvasHeight || d;
  return n.width = y * f, n.height = k * f, l.skipAutoScale || Xr(n), n.style.width = `${y}`, n.style.height = `${k}`, l.backgroundColor && (a.fillStyle = l.backgroundColor, a.fillRect(0, 0, n.width, n.height)), a.drawImage(r, 0, 0, n.width, n.height), n;
}
async function ze(t, l = {}) {
  return (await Dn(t, l)).toDataURL();
}
const Ft = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box",
  TARGETS: "targets"
};
function be(t) {
  const l = Date.now(), i = Math.random().toString(36).slice(2, 6);
  return `screenshot-${t}-${l}-${i}.png`;
}
async function lr(t, l = {}) {
  if (!t) return null;
  try {
    return await ze(t, {
      pixelRatio: l.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...l
    });
  } catch (i) {
    return console.error("captureElement failed:", i), null;
  }
}
async function Ln(t = {}) {
  const l = document.documentElement;
  return lr(l, {
    width: window.innerWidth,
    height: window.innerHeight,
    style: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: "hidden"
    },
    ...t
  });
}
async function Fn(t = {}) {
  const l = document.documentElement, i = l.style.overflow, d = l.style.width, o = l.style.height;
  try {
    return l.style.overflow = "visible", l.style.width = "auto", l.style.height = "auto", await ze(l, {
      pixelRatio: t.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...t
    });
  } catch (r) {
    return console.error("captureFullPage failed:", r), null;
  } finally {
    l.style.overflow = i, l.style.width = d, l.style.height = o;
  }
}
async function Nn(t, l = {}) {
  if (!t || t.width < 1 || t.height < 1) return null;
  const i = document.documentElement, d = i.style.overflow, o = i.style.width, r = i.style.height;
  try {
    i.style.overflow = "visible", i.style.width = "auto", i.style.height = "auto";
    const n = await ze(i, {
      pixelRatio: l.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...l
    });
    return Un(n, t);
  } catch (n) {
    return console.error("captureBox failed:", n), null;
  } finally {
    i.style.overflow = d, i.style.width = o, i.style.height = r;
  }
}
function Un(t, l) {
  return new Promise((i, d) => {
    const o = new Image();
    o.onload = () => {
      const r = document.createElement("canvas"), n = window.devicePixelRatio || 1;
      r.width = Math.round(l.width * n), r.height = Math.round(l.height * n), r.getContext("2d").drawImage(
        o,
        l.x * n,
        l.y * n,
        l.width * n,
        l.height * n,
        0,
        0,
        r.width,
        r.height
      ), i(r.toDataURL("image/png"));
    }, o.onerror = d, o.src = t;
  });
}
async function Mn(t) {
  return (await fetch(t)).blob();
}
async function _e(t, l, i) {
  if (!i) return null;
  try {
    const d = await Mn(t);
    return await i(d, l);
  } catch (d) {
    return console.error("uploadScreenshot failed:", d), null;
  }
}
function ur(t) {
  var o;
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return "";
  if (t.id) return "#" + t.id;
  const l = t.tagName.toLowerCase();
  if (t.className) {
    const r = String(t.className).split(/\s+/).filter((n) => n && !n.startsWith("el-") && !/^__/.test(n)).slice(0, 2);
    if (r.length) return l + "." + r.join(".");
  }
  let i = [], d = t;
  for (; d && d !== document.body; ) {
    let r = d.tagName.toLowerCase();
    if (d.id) {
      r += "#" + d.id, i.unshift(r);
      break;
    }
    const a = Array.from(((o = d.parentNode) == null ? void 0 : o.children) || []).filter((f) => f.tagName === d.tagName);
    if (a.length > 1) {
      const f = a.indexOf(d) + 1;
      r += `:nth-of-type(${f})`;
    }
    i.unshift(r), d = d.parentNode;
  }
  return i.join(" > ");
}
function jn(t) {
  var d;
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return "";
  if (t.id) return `//*[@id="${t.id}"]`;
  const l = [];
  let i = t;
  for (; i && i !== document.body; ) {
    const n = Array.from(((d = i.parentNode) == null ? void 0 : d.children) || []).filter((a) => a.tagName === i.tagName).indexOf(i) + 1;
    l.unshift(`${i.tagName.toLowerCase()}[${n}]`), i = i.parentNode;
  }
  return l.unshift(""), "/html/body/" + l.slice(1).join("/");
}
function $n(t) {
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return {};
  const l = {}, i = t.getAttribute("role") || Wn(t);
  i && (l.role = i);
  const d = Zn(t);
  d && (l.accessibleName = d);
  const o = t.getAttribute("aria-labelledby");
  return o && (l.labeledBy = o), Object.keys(l).length ? l : void 0;
}
function Wn(t) {
  const l = t.tagName.toLowerCase(), i = t.getAttribute("type");
  return {
    button: "button",
    a: t.hasAttribute("href") ? "link" : void 0,
    input: i === "checkbox" ? "checkbox" : i === "radio" ? "radio" : i === "text" || !i ? "textbox" : void 0,
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
  }[l];
}
function Zn(t) {
  var r, n;
  if (t.getAttribute("aria-label")) return t.getAttribute("aria-label").trim();
  const l = t.getAttribute("aria-labelledby");
  if (l) {
    const a = l.split(/\s+/).map((f) => {
      var y, k;
      return (k = (y = document.getElementById(f)) == null ? void 0 : y.textContent) == null ? void 0 : k.trim();
    }).filter(Boolean);
    if (a.length) return a.join(" ");
  }
  const i = (r = t.labels) == null ? void 0 : r[0];
  if (i) return i.textContent.trim();
  if (t.tagName.toLowerCase() === "input" && t.placeholder) return t.placeholder.trim();
  const d = t.getAttribute("alt");
  if (d) return d.trim();
  const o = t.getAttribute("title");
  if (o) return o.trim();
  if (["button", "a"].includes(t.tagName.toLowerCase())) {
    const a = (n = t.textContent) == null ? void 0 : n.trim();
    if (a) return a;
  }
  return "";
}
function Vn(t) {
  return !t || t.nodeType !== Node.ELEMENT_NODE ? void 0 : t.getAttribute("data-testid") || void 0;
}
function ce(t) {
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return null;
  const l = t.getBoundingClientRect();
  return {
    tag: t.tagName.toLowerCase(),
    id: t.id || void 0,
    classes: t.className ? String(t.className).split(/\s+/).filter(Boolean) : void 0,
    selector: ur(t),
    xpath: jn(t),
    rect: {
      x: l.left + window.scrollX,
      y: l.top + window.scrollY,
      width: l.width,
      height: l.height
    },
    aria: $n(t),
    testId: Vn(t)
  };
}
function Hn(t) {
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return [];
  const l = [];
  let i = t;
  for (; i && i !== document.body; )
    l.unshift(i), i = i.parentElement;
  return i === document.body && l.unshift(document.body), l.map(ce).filter(Boolean);
}
function Gn(t) {
  if (!t || t.nodeType !== Node.ELEMENT_NODE) return [];
  const l = Xn(t);
  if (l.length) return l;
  const i = Kn(t);
  return i.length ? i : [];
}
function Xn(t) {
  const l = [];
  let i = t;
  for (; i; ) {
    const d = Yn(i);
    d && !l.find((o) => o.componentName === d.componentName && o.selector === d.selector) && l.unshift(d), i = i.parentElement;
  }
  return l;
}
function Yn(t) {
  var r, n, a, f, y;
  const i = Object.keys(t || {}).find((k) => k.startsWith("__vue"));
  if (!i) return null;
  const d = t[i], o = ((r = d == null ? void 0 : d.type) == null ? void 0 : r.name) || ((n = d == null ? void 0 : d.type) == null ? void 0 : n.__name) || ((f = (a = d == null ? void 0 : d.parent) == null ? void 0 : a.type) == null ? void 0 : f.name);
  return o ? {
    componentName: o,
    selector: ur(t),
    rect: (y = ce(t)) == null ? void 0 : y.rect
  } : null;
}
function Kn(t) {
  const l = [], i = Object.keys(t || {}).find((o) => o.startsWith("__reactFiber$"));
  if (!i) return l;
  let d = t[i];
  for (; d; ) {
    const o = qn(d);
    o && !l.find((r) => r.componentName === o) && l.unshift({ componentName: o, selector: void 0, rect: void 0 }), d = d.return;
  }
  return l;
}
function qn(t) {
  var l;
  if (!t) return null;
  if (typeof t.type == "function") return t.type.displayName || t.type.name || null;
  if (typeof t.type == "string") return null;
  if (t.elementType) {
    if (typeof t.elementType == "function") return t.elementType.displayName || t.elementType.name || null;
    if (typeof t.elementType == "object" && ((l = t.elementType) != null && l.$$typeof)) return t.elementType.name || null;
  }
  return null;
}
function qe(t) {
  return {
    dom: Hn(t),
    framework: Gn(t)
  };
}
const Jn = ".vpr-review-overlay,.vpr-review-overlay *{box-sizing:border-box}.vpr-review-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9000;pointer-events:none}.vpr-review-overlay .el-overlay{pointer-events:auto}.vpr-dialog-layer{z-index:10002!important}.vpr-drawer-layer{z-index:10003!important}.vpr-confirm-layer{z-index:10004!important}.vpr-popper{z-index:10005!important}.vpr-review-toolbar{position:fixed;top:16px;left:50%;transform:translate(-50%);display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 16px;background:#fff;border-radius:8px;box-shadow:0 4px 20px #00000026;z-index:10000;-webkit-user-select:none;user-select:none;min-width:auto;min-height:auto;pointer-events:auto}.vpr-toolbar-resize-handle{position:absolute;right:0;bottom:0;width:12px;height:12px;cursor:se-resize;background:linear-gradient(135deg,transparent 50%,#c0c4cc 50%);border-bottom-right-radius:8px}.vpr-review-toolbar.vpr-is-dragging{cursor:grabbing}.vpr-toolbar-left{display:flex;align-items:center;gap:16px}.vpr-toolbar-title{font-weight:700;color:#001529;cursor:grab;white-space:nowrap}.vpr-toolbar-title:active{cursor:grabbing}.vpr-toolbar-right{display:flex;align-items:center;gap:12px}.vpr-highlight-box{position:absolute;border:2px solid #409eff;background:#409eff26;z-index:9100;pointer-events:none}.vpr-hover-box{border-color:#409eff;background:#409eff1f}.vpr-selected-box{border-color:#f56c6c;background:#f56c6c1f}.vpr-selected-box .vpr-highlight-label{background:#f56c6c}.vpr-tree-hover-box{border-color:#e6a23c;background:#e6a23c26}.vpr-highlight-label{position:absolute;top:-22px;left:0;padding:2px 8px;background:#409eff;color:#fff;font-size:12px;border-radius:4px;white-space:nowrap;display:flex;align-items:center;gap:6px}.vpr-remove-icon{cursor:pointer;font-style:normal;font-weight:700;line-height:1}.vpr-drag-rect{position:absolute;border:2px dashed #67c23a;background:#67c23a26;z-index:9100;pointer-events:auto}.vpr-drag-rect.vpr-preview-box{border-color:#67c23a;pointer-events:none}.vpr-drag-rect.vpr-selected-box{border-color:#f56c6c;background:#f56c6c1f}.vpr-drag-rect.vpr-is-resizing{pointer-events:none}.vpr-box-label{position:absolute;top:-22px;left:0;padding:2px 8px;background:#f56c6c;color:#fff;font-size:12px;border-radius:4px;white-space:nowrap;display:flex;align-items:center;gap:6px}.vpr-resize-handle{position:absolute;background:#fff;border:1px solid #f56c6c;border-radius:50%;z-index:10001;cursor:pointer}.vpr-resize-handle.vpr-handle-nw{cursor:nw-resize}.vpr-resize-handle.vpr-handle-n{cursor:n-resize}.vpr-resize-handle.vpr-handle-ne{cursor:ne-resize}.vpr-resize-handle.vpr-handle-w{cursor:w-resize}.vpr-resize-handle.vpr-handle-e{cursor:e-resize}.vpr-resize-handle.vpr-handle-sw{cursor:sw-resize}.vpr-resize-handle.vpr-handle-s{cursor:s-resize}.vpr-resize-handle.vpr-handle-se{cursor:se-resize}.vpr-review-dialog{display:flex;flex-direction:column;max-height:90vh;overflow:hidden}.vpr-review-dialog .el-dialog__header{cursor:grab;-webkit-user-select:none;user-select:none}.vpr-review-dialog .el-dialog__header:active{cursor:grabbing}.vpr-review-dialog .el-dialog__body{flex:1;overflow:auto}.vpr-modal-resize-handle{position:absolute;right:0;bottom:0;width:16px;height:16px;cursor:se-resize;background:linear-gradient(135deg,transparent 50%,#c0c4cc 50%);border-bottom-right-radius:8px}.vpr-form-row{margin-bottom:16px}.vpr-form-row>label{display:block;margin-bottom:6px;font-size:14px;color:#606266}.vpr-required{color:#f56c6c}.vpr-review-targets-summary{display:flex;flex-wrap:wrap;gap:6px}.vpr-target-tag{max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vpr-text-muted{color:#909399;font-size:13px}.vpr-drawer-header{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;width:100%}.vpr-drawer-title{font-weight:700;color:#303133}.vpr-drawer-actions{display:flex;gap:8px;flex-wrap:wrap}.vpr-tree-panel{display:flex;flex-direction:column;gap:20px}.vpr-tree-section h4{margin:0 0 10px;color:#303133;font-size:14px}.vpr-tree-list{display:flex;flex-direction:column;gap:4px}.vpr-tree-node{padding:6px 8px;border-radius:4px;cursor:pointer;font-size:13px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;transition:background .15s}.vpr-tree-node:hover{background:#f5f7fa}.vpr-node-tag{color:#409eff;font-weight:700}.vpr-node-id{color:#67c23a;margin-left:6px}.vpr-node-aria{color:#e6a23c;margin-left:6px}.vpr-node-testid{color:#909399;margin-left:6px}.vpr-node-name{color:#606266;font-weight:700}.vpr-review-list{display:flex;flex-direction:column;gap:12px}.vpr-review-item-header{display:flex;justify-content:space-between;align-items:center;gap:8px}.vpr-review-item-title{font-weight:700;color:#303133;word-break:break-all}.vpr-review-item-tags{display:flex;gap:6px;flex-shrink:0}.vpr-review-item-target{color:#606266;font-size:12px;margin:0 0 8px;word-break:break-all}.vpr-review-item-suggestion{color:#303133;font-size:13px;line-height:1.6;margin:0 0 12px}.vpr-review-item-meta{display:flex;justify-content:space-between;align-items:center;gap:8px}.vpr-review-item-actions{display:flex;gap:8px;flex-shrink:0}";
function Qn() {
  if (typeof document > "u" || document.getElementById("vpr-styles")) return;
  const t = document.createElement("style");
  t.id = "vpr-styles", t.textContent = Jn, document.head.appendChild(t);
}
const ti = {
  key: 0,
  class: "vpr-review-overlay"
}, ei = { class: "vpr-toolbar-left" }, ri = { class: "vpr-toolbar-right" }, ni = { class: "vpr-highlight-label" }, ii = ["onClick"], ai = { class: "vpr-highlight-label" }, si = ["onClick"], oi = ["onMousedown"], li = ["onClick"], ui = ["onMousedown"], ci = { class: "vpr-form-row" }, di = { class: "vpr-review-targets-summary" }, fi = { class: "vpr-form-row" }, hi = { class: "vpr-text-muted" }, pi = { class: "vpr-form-row" }, mi = { class: "vpr-text-muted" }, gi = { class: "vpr-form-row" }, vi = { class: "vpr-form-row" }, wi = { class: "vpr-form-row" }, yi = { class: "vpr-form-row" }, bi = {
  key: 1,
  class: "vpr-tree-panel"
}, _i = {
  key: 0,
  class: "vpr-tree-section"
}, xi = { class: "vpr-tree-list" }, ki = ["onMouseenter", "onClick"], Si = { class: "vpr-node-name" }, Ei = { class: "vpr-tree-section" }, zi = { class: "vpr-tree-list" }, Ci = ["onMouseenter", "onClick"], Ri = { class: "vpr-node-tag" }, Ai = {
  key: 0,
  class: "vpr-node-id"
}, Ti = {
  key: 1,
  class: "vpr-node-aria"
}, Ii = {
  key: 2,
  class: "vpr-node-testid"
}, Oi = { class: "vpr-drawer-header" }, Pi = { class: "vpr-drawer-actions" }, Bi = {
  key: 1,
  class: "vpr-review-list"
}, Di = { class: "vpr-review-item-header" }, Li = { class: "vpr-review-item-title" }, Fi = { class: "vpr-review-item-tags" }, Ni = { class: "vpr-review-item-target" }, Ui = { class: "vpr-review-item-suggestion" }, Mi = { class: "vpr-review-item-meta" }, ji = { class: "vpr-text-muted" }, $i = { class: "vpr-review-item-actions" }, Hi = {
  __name: "ReviewTool",
  props: {
    active: { type: Boolean, default: !1 },
    pagePath: { type: String, default: "" },
    pageName: { type: String, default: "" },
    storageKey: { type: String, default: "page-reviews" },
    imageUpload: { type: Function, default: null },
    imageUploadUrl: { type: String, default: "" },
    enableZipExport: { type: Boolean, default: !0 },
    enableComponentTree: { type: Boolean, default: !0 }
  },
  emits: ["update:active", "add", "update", "delete", "clear", "export"],
  setup(t, { expose: l, emit: i }) {
    const d = t, o = i, r = Bt(() => d.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: n, getPageReviews: a, addReview: f, updateReview: y, deleteReview: k, clearPageReviews: b, exportToJSON: _, exportToMarkdown: h, exportToZIP: v } = Dr({
      storageKey: d.storageKey,
      defaultPagePath: () => r.value
    }), u = Bt(() => a(r.value)), g = vt("element"), c = vt(!1), p = vt(!1), x = vt(!1), E = vt(null), z = vt(null), F = vt(null), D = vt([]), T = vt({
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
    });
    _r(() => {
      Qn();
    });
    const A = vt(null), {
      position: W,
      size: Q,
      isDragging: S,
      isResizing: L,
      onDragStart: s,
      onResizeStart: U
    } = We({
      initialPosition: { x: 0, y: 0 },
      initialSize: { width: null, height: null },
      minWidth: 400,
      minHeight: 48,
      isDragHandle: (Z) => {
        var R, nt;
        return ((R = Z.classList) == null ? void 0 : R.contains("vpr-toolbar-title")) || ((nt = Z.classList) == null ? void 0 : nt.contains("vpr-review-toolbar"));
      },
      measureRef: A
    }), {
      position: at,
      size: $,
      isDragging: ot,
      isResizing: V,
      onDragStart: it,
      onResizeStart: P
    } = We({
      initialPosition: { x: 0, y: 0 },
      initialSize: { width: 560, height: null },
      minWidth: 360,
      minHeight: 300,
      isDragHandle: (Z) => {
        var H, st;
        const R = (H = Z.closest) == null ? void 0 : H.call(Z, ".el-dialog__header"), nt = (st = Z.closest) == null ? void 0 : st.call(Z, ".el-dialog__headerbtn");
        return !!R && !nt;
      }
    }), O = Bt(
      () => S.value || L.value || ot.value || V.value
    ), et = (Z) => O.value ? !0 : !!Z.closest(".vpr-review-overlay"), q = Bt(() => d.active && !c.value), {
      hoveredRect: K,
      hoveredTag: wt,
      selectedElements: gt,
      selectElement: dt,
      removeSelectedElement: ft,
      clearSelectedElements: _t,
      refreshRects: yt
    } = Ur({
      active: q,
      mode: g,
      onIgnoreTarget: et
    }), Ot = (Z, R) => {
      Nt(R) || _t();
    }, {
      selectedBoxes: zt,
      dragRect: e,
      resizingBoxId: N,
      isResizing: B,
      removeBox: w,
      clearBoxes: m,
      startResize: C
    } = jr({
      active: q,
      mode: g,
      onIgnoreTarget: et,
      onBoxCreate: Ot
    }), { toViewportRect: M, highlightStyle: j, boxStyle: I, handleStyle: X } = $r({
      active: Bt(() => d.active)
    }), J = ["nw", "n", "ne", "w", "e", "sw", "s", "se"], Y = Bt(() => gt.value.length + zt.value.length), tt = Bt(() => T.value.title.trim() && T.value.suggestion.trim()), mt = Bt({
      get: () => !!E.value,
      set: (Z) => {
        Z || (E.value = null);
      }
    }), ut = Bt(() => d.imageUpload ? d.imageUpload : d.imageUploadUrl ? Ct : null);
    async function Ct(Z, R) {
      var kt;
      const nt = new FormData();
      nt.append("file", Z, R);
      const H = await fetch(d.imageUploadUrl, { method: "POST", body: nt });
      if (!H.ok) throw new Error("Upload failed");
      const st = await H.text();
      try {
        const $t = JSON.parse(st);
        return $t.url || ((kt = $t.data) == null ? void 0 : kt.url) || st;
      } catch {
        return st;
      }
    }
    const Zt = Bt(() => {
      const { x: Z, y: R } = W.value, nt = {
        transform: `translate(calc(-50% + ${Z}px), ${R}px)`
      };
      return Q.value.width && (nt.width = Q.value.width + "px"), Q.value.height && (nt.height = Q.value.height + "px"), nt;
    }), Pt = Bt(() => {
      const { x: Z, y: R } = at.value, nt = {
        transform: `translate(${Z}px, ${R}px)`
      };
      return $.value.height && (nt.height = $.value.height + "px"), nt;
    });
    function Nt(Z) {
      return Z.ctrlKey || Z.metaKey;
    }
    function bt(Z) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[Z] || "info";
    }
    function Xt(Z) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[Z] || Z;
    }
    function Jt(Z) {
      var R;
      return (R = Z.targets) == null ? void 0 : R.some((nt) => {
        var H, st;
        return (st = (H = nt.componentTree) == null ? void 0 : H.dom) == null ? void 0 : st.length;
      });
    }
    function Dt(Z) {
      if (!Z || Z.length === 0) return "无目标";
      const R = Z[0], nt = R.type === "element" ? R.elementText || R.selector || "元素" : `框选 x=${R.viewportRect.x}, y=${R.viewportRect.y}`;
      return Z.length === 1 ? nt : `${nt} 等 ${Z.length} 个目标`;
    }
    function te() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: r.value,
        pageUrl: window.location.href,
        pageName: d.pageName || r.value
      };
    }
    function fe(Z, R) {
      Nt(R) && (R.stopPropagation(), ft(Z));
    }
    function he(Z, R) {
      Nt(R) && (R.stopPropagation(), w(Z));
    }
    function ee(Z) {
      Z.key === "Escape" && (c.value ? c.value = !1 : Ie());
    }
    function re() {
      gt.value.length === 0 && (F.value = null), x.value = !0;
    }
    function jt(Z) {
      if (!Z.rect) {
        z.value = null;
        return;
      }
      z.value = Z.rect;
    }
    function Vt(Z) {
      if (!Z.selector) return;
      const R = document.querySelector(Z.selector);
      R && (dt(R), m(), x.value = !1);
    }
    function pe() {
      _t(), m(), F.value = null;
    }
    function cr() {
      const Z = te(), R = dr(), nt = gt.value[0], H = nt != null && nt.el ? ce(nt.el) : null;
      T.value = {
        type: gt.value.length > 0 ? "element" : "viewport",
        title: "",
        severity: "medium",
        suggestion: "",
        targets: R,
        viewport: Z.viewport,
        scroll: Z.scroll,
        pagePath: Z.pagePath,
        pageUrl: Z.pageUrl,
        pageName: Z.pageName,
        aria: (H == null ? void 0 : H.aria) || null,
        locators: H ? Ce(H) : null
      }, D.value = [], c.value = !0;
    }
    function dr() {
      const Z = [];
      return gt.value.forEach((R) => {
        const nt = R.el ? ce(R.el) : null;
        Z.push({
          type: "element",
          selector: R.selector,
          elementText: R.text,
          elementRect: R.docRect || R.rect,
          componentTree: nt ? qe(R.el) : null,
          aria: (nt == null ? void 0 : nt.aria) || null,
          locators: nt ? Ce(nt) : null
        });
      }), zt.value.forEach((R) => {
        Z.push({
          type: "viewport",
          viewportRect: R.rect
        });
      }), Z;
    }
    function Ce(Z) {
      const R = {};
      return Z.selector && (R.cssSelector = Z.selector), Z.xpath && (R.xpath = Z.xpath), Z.aria && Object.keys(Z.aria).length && (R.aria = Z.aria), Z.testId && (R.testId = Z.testId), Object.keys(R).length ? R : null;
    }
    async function fr() {
      const Z = [];
      for (const R of D.value)
        if (R === Ft.TARGETS)
          for (const nt of T.value.targets) {
            let H = null;
            if (nt.type === "element" && nt.elementRect) {
              const st = document.querySelector(nt.selector);
              st && (H = await lr(st));
            } else nt.type === "viewport" && nt.viewportRect && (H = await Nn(nt.viewportRect));
            if (H) {
              const st = be(nt.type);
              let kt = null;
              ut.value && (kt = await _e(H, st, ut.value)), Z.push({ type: nt.type, filename: st, data: kt ? void 0 : H, url: kt || void 0 });
            }
          }
        else if (R === Ft.VIEWPORT) {
          const nt = await Ln();
          if (nt) {
            const H = be(Ft.VIEWPORT);
            let st = null;
            ut.value && (st = await _e(nt, H, ut.value)), Z.push({ type: Ft.VIEWPORT, filename: H, data: st ? void 0 : nt, url: st || void 0 });
          }
        } else if (R === Ft.FULL_PAGE) {
          const nt = await Fn();
          if (nt) {
            const H = be(Ft.FULL_PAGE);
            let st = null;
            ut.value && (st = await _e(nt, H, ut.value)), Z.push({ type: Ft.FULL_PAGE, filename: H, data: st ? void 0 : nt, url: st || void 0 });
          }
        }
      return Z;
    }
    function hr() {
      D.value = [], T.value = {
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
    async function pr() {
      if (!tt.value) return;
      const Z = await fr(), R = f({
        type: T.value.type,
        title: T.value.title.trim(),
        severity: T.value.severity,
        suggestion: T.value.suggestion.trim(),
        targets: T.value.targets,
        viewport: T.value.viewport,
        scroll: T.value.scroll,
        pagePath: T.value.pagePath,
        pageUrl: T.value.pageUrl,
        pageName: T.value.pageName,
        status: "open",
        screenshots: Z,
        aria: T.value.aria,
        locators: T.value.locators
      });
      c.value = !1, pe(), o("add", R);
    }
    function mr(Z) {
      y(Z, { status: "resolved" }), o("update", { id: Z, status: "resolved" });
    }
    function gr(Z) {
      E.value = {
        title: "删除确认",
        message: "确定删除这条评审意见吗？",
        onConfirm: () => {
          k(Z), o("delete", { id: Z });
        }
      };
    }
    function vr() {
      u.value.length !== 0 && (E.value = {
        title: "清空确认",
        message: "确定清空当前页面的所有评审意见吗？",
        onConfirm: () => {
          b(r.value), o("clear", { pagePath: r.value });
        }
      });
    }
    function wr() {
      var Z, R;
      (R = (Z = E.value) == null ? void 0 : Z.onConfirm) == null || R.call(Z), E.value = null;
    }
    function Re() {
      h(), o("export", { format: "markdown" });
    }
    function Ae() {
      _(), o("export", { format: "json" });
    }
    async function Te() {
      await v(), o("export", { format: "zip" });
    }
    function yr(Z) {
      switch (Z) {
        case "tree":
          re();
          break;
        case "list":
          p.value = !0;
          break;
        case "export-md":
          Re();
          break;
        case "export-json":
          Ae();
          break;
        case "export-zip":
          Te();
          break;
        case "clear":
          pe();
          break;
      }
    }
    function Ie() {
      o("update:active", !1);
    }
    return Qt((Z) => {
      d.active && (document.addEventListener("keydown", ee), Z(() => document.removeEventListener("keydown", ee)));
    }), xe(() => d.active, (Z) => {
      Z ? g.value = "element" : (pe(), hr(), c.value = !1, K.value = null, p.value = !1, x.value = !1, E.value = null);
    }), xe(
      () => gt.value.map((Z) => Z.selector).join("|"),
      () => {
        F.value = gt.value.length > 0 ? qe(gt.value[0].el) : null;
      }
    ), Qt((Z) => {
      if (!d.active) return;
      const R = () => yt();
      window.addEventListener("scroll", R, !0), Z(() => window.removeEventListener("scroll", R, !0));
    }), l({
      reviews: n,
      pageReviews: u,
      addReview: f,
      updateReview: y,
      deleteReview: k,
      clearPageReviews: b,
      exportToJSON: _,
      exportToMarkdown: h
    }), (Z, R) => {
      var nt;
      return pt(), Lt(xr, { to: "body" }, [
        t.active ? (pt(), xt("div", ti, [
          rt("div", {
            ref_key: "toolbarRef",
            ref: A,
            class: me(["vpr-review-toolbar", { "vpr-is-dragging": G(S) }]),
            style: Mt(Zt.value),
            onClick: R[2] || (R[2] = Ut(() => {
            }, ["stop"])),
            onMousedown: R[3] || (R[3] = (...H) => G(s) && G(s)(...H))
          }, [
            rt("div", ei, [
              R[21] || (R[21] = rt("span", {
                class: "vpr-toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              ct(G(kr), {
                modelValue: g.value,
                "onUpdate:modelValue": R[0] || (R[0] = (H) => g.value = H),
                size: "small"
              }, {
                default: lt(() => [
                  ct(G(Le), { value: "element" }, {
                    default: lt(() => [...R[19] || (R[19] = [
                      ht("选择元素", -1)
                    ])]),
                    _: 1
                  }),
                  ct(G(Le), { value: "viewport" }, {
                    default: lt(() => [...R[20] || (R[20] = [
                      ht("框定视图", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            rt("div", ri, [
              ct(G(Sr), { value: Y.value }, {
                default: lt(() => [
                  ct(G(Tt), {
                    type: "primary",
                    size: "small",
                    disabled: Y.value === 0,
                    onClick: cr
                  }, {
                    default: lt(() => [...R[22] || (R[22] = [
                      ht(" 评审 ", -1)
                    ])]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["value"]),
              ct(G(Tt), {
                type: "danger",
                size: "small",
                onClick: Ie
              }, {
                default: lt(() => [...R[23] || (R[23] = [
                  ht("退出评审", -1)
                ])]),
                _: 1
              }),
              ct(G(Er), {
                trigger: "click",
                placement: "bottom-end",
                "popper-class": "vpr-popper",
                teleported: !1,
                onCommand: yr
              }, {
                dropdown: lt(() => [
                  ct(G(Cr), null, {
                    default: lt(() => [
                      t.enableComponentTree ? (pt(), Lt(G(Yt), {
                        key: 0,
                        command: "tree"
                      }, {
                        default: lt(() => [...R[25] || (R[25] = [
                          ht("组件树", -1)
                        ])]),
                        _: 1
                      })) : At("", !0),
                      ct(G(Yt), { command: "list" }, {
                        default: lt(() => [...R[26] || (R[26] = [
                          ht("评审列表", -1)
                        ])]),
                        _: 1
                      }),
                      ct(G(Yt), {
                        divided: "",
                        command: "export-md"
                      }, {
                        default: lt(() => [...R[27] || (R[27] = [
                          ht("导出 Markdown", -1)
                        ])]),
                        _: 1
                      }),
                      ct(G(Yt), { command: "export-json" }, {
                        default: lt(() => [...R[28] || (R[28] = [
                          ht("导出 JSON", -1)
                        ])]),
                        _: 1
                      }),
                      t.enableZipExport ? (pt(), Lt(G(Yt), {
                        key: 1,
                        command: "export-zip"
                      }, {
                        default: lt(() => [...R[29] || (R[29] = [
                          ht("导出 ZIP", -1)
                        ])]),
                        _: 1
                      })) : At("", !0),
                      ct(G(Yt), {
                        divided: "",
                        command: "clear",
                        disabled: Y.value === 0
                      }, {
                        default: lt(() => [...R[30] || (R[30] = [
                          ht("取消选择", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ]),
                default: lt(() => [
                  ct(G(Tt), { size: "small" }, {
                    default: lt(() => [
                      R[24] || (R[24] = ht(" 更多 ", -1)),
                      ct(G(zr), { class: "el-icon--right" }, {
                        default: lt(() => [
                          ct(G(Ir))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            rt("div", {
              class: "vpr-toolbar-resize-handle",
              onMousedown: R[1] || (R[1] = Ut((...H) => G(U) && G(U)(...H), ["stop"]))
            }, null, 32)
          ], 38),
          G(K) && g.value === "element" && !G(B) && !G(e) ? (pt(), xt("div", {
            key: 0,
            class: "vpr-highlight-box vpr-hover-box",
            style: Mt(G(j)(G(K)))
          }, [
            rt("span", ni, St(G(wt)), 1)
          ], 4)) : At("", !0),
          (pt(!0), xt(Ht, null, Gt(G(gt), (H, st) => (pt(), xt("div", {
            key: "el-" + st,
            class: "vpr-highlight-box vpr-selected-box",
            style: Mt(G(j)(H.rect)),
            onClick: Ut((kt) => fe(H, kt), ["stop"])
          }, [
            rt("span", ai, [
              ht(St(H.tag) + " ", 1),
              rt("i", {
                class: "vpr-remove-icon",
                onClick: Ut((kt) => G(ft)(H), ["stop"])
              }, "×", 8, si)
            ])
          ], 12, ii))), 128)),
          z.value ? (pt(), xt("div", {
            key: 1,
            class: "vpr-highlight-box vpr-tree-hover-box",
            style: Mt(G(j)(G(M)(z.value)))
          }, null, 4)) : At("", !0),
          (pt(!0), xt(Ht, null, Gt(G(zt), (H) => (pt(), xt("div", {
            key: H.id,
            class: me(["vpr-drag-rect vpr-selected-box", { "vpr-is-resizing": G(N) === H.id }]),
            style: Mt(G(I)(G(M)(H.rect))),
            onMousedown: Ut((st) => he(H, st), ["stop"])
          }, [
            rt("span", {
              class: "vpr-box-label",
              onMousedown: R[4] || (R[4] = Ut(() => {
              }, ["stop"]))
            }, [
              ht(" 框选 " + St(H.index + 1) + " ", 1),
              rt("i", {
                class: "vpr-remove-icon",
                onClick: Ut((st) => G(w)(H), ["stop"])
              }, "×", 8, li)
            ], 32),
            (pt(), xt(Ht, null, Gt(J, (st) => rt("div", {
              key: st,
              class: me(["vpr-resize-handle", "vpr-handle-" + st]),
              style: Mt(G(X)(st, G(M)(H.rect))),
              onMousedown: Ut((kt) => G(C)(H, st, kt), ["stop"])
            }, null, 46, ui)), 64))
          ], 46, oi))), 128)),
          G(e) ? (pt(), xt("div", {
            key: 2,
            class: "vpr-drag-rect vpr-preview-box",
            style: Mt(G(I)(G(e)))
          }, null, 4)) : At("", !0),
          rt("div", {
            class: "vpr-modal-layer",
            onMousedown: R[12] || (R[12] = (...H) => G(it) && G(it)(...H))
          }, [
            ct(G(Fe), {
              modelValue: c.value,
              "onUpdate:modelValue": R[11] || (R[11] = (H) => c.value = H),
              class: "vpr-review-dialog",
              "modal-class": "vpr-dialog-layer",
              title: "添加评审意见",
              width: G($).width,
              style: Mt(Pt.value),
              "z-index": 10002,
              "append-to-body": !1,
              "close-on-press-escape": !1,
              "align-center": ""
            }, {
              footer: lt(() => [
                ct(G(Tt), {
                  onClick: R[10] || (R[10] = (H) => c.value = !1)
                }, {
                  default: lt(() => [...R[41] || (R[41] = [
                    ht("取消", -1)
                  ])]),
                  _: 1
                }),
                ct(G(Tt), {
                  type: "primary",
                  disabled: !tt.value,
                  onClick: pr
                }, {
                  default: lt(() => [...R[42] || (R[42] = [
                    ht("保存评审", -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              default: lt(() => {
                var H, st, kt, $t;
                return [
                  rt("div", ci, [
                    R[31] || (R[31] = rt("label", null, "评审目标", -1)),
                    rt("div", di, [
                      (pt(!0), xt(Ht, null, Gt(T.value.targets, (Et, br) => {
                        var Oe, Pe;
                        return pt(), Lt(G(ne), {
                          key: br,
                          class: "vpr-target-tag",
                          title: Et.type === "element" ? Et.selector || "元素" : `框选 ${(Oe = Et.viewportRect) == null ? void 0 : Oe.x},${(Pe = Et.viewportRect) == null ? void 0 : Pe.y}`
                        }, {
                          default: lt(() => {
                            var Be, De;
                            return [
                              ht(St(Et.type === "element" ? Et.elementText || Et.selector || "元素" : `框选 ${(Be = Et.viewportRect) == null ? void 0 : Be.x},${(De = Et.viewportRect) == null ? void 0 : De.y}`), 1)
                            ];
                          }),
                          _: 2
                        }, 1032, ["title"]);
                      }), 128))
                    ])
                  ]),
                  rt("div", fi, [
                    R[32] || (R[32] = rt("label", null, "窗口尺寸", -1)),
                    rt("span", hi, St((H = T.value.viewport) == null ? void 0 : H.width) + " × " + St((st = T.value.viewport) == null ? void 0 : st.height), 1)
                  ]),
                  rt("div", pi, [
                    R[33] || (R[33] = rt("label", null, "滚动位置", -1)),
                    rt("span", mi, "x=" + St((kt = T.value.scroll) == null ? void 0 : kt.x) + ", y=" + St(($t = T.value.scroll) == null ? void 0 : $t.y), 1)
                  ]),
                  rt("div", gi, [
                    R[37] || (R[37] = rt("label", null, "截图", -1)),
                    ct(G(Rr), {
                      modelValue: D.value,
                      "onUpdate:modelValue": R[5] || (R[5] = (Et) => D.value = Et)
                    }, {
                      default: lt(() => [
                        ct(G(ge), {
                          value: G(Ft).TARGETS
                        }, {
                          default: lt(() => [...R[34] || (R[34] = [
                            ht("选中目标", -1)
                          ])]),
                          _: 1
                        }, 8, ["value"]),
                        ct(G(ge), {
                          value: G(Ft).VIEWPORT
                        }, {
                          default: lt(() => [...R[35] || (R[35] = [
                            ht("当前视口", -1)
                          ])]),
                          _: 1
                        }, 8, ["value"]),
                        ct(G(ge), {
                          value: G(Ft).FULL_PAGE
                        }, {
                          default: lt(() => [...R[36] || (R[36] = [
                            ht("完整页面", -1)
                          ])]),
                          _: 1
                        }, 8, ["value"])
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  rt("div", vi, [
                    R[38] || (R[38] = rt("label", null, [
                      ht("标题 "),
                      rt("span", { class: "vpr-required" }, "*")
                    ], -1)),
                    ct(G(Ne), {
                      modelValue: T.value.title,
                      "onUpdate:modelValue": R[6] || (R[6] = (Et) => T.value.title = Et),
                      placeholder: "例如：按钮样式不统一"
                    }, null, 8, ["modelValue"])
                  ]),
                  rt("div", wi, [
                    R[39] || (R[39] = rt("label", null, [
                      ht("严重等级 "),
                      rt("span", { class: "vpr-required" }, "*")
                    ], -1)),
                    ct(G(Ar), {
                      modelValue: T.value.severity,
                      "onUpdate:modelValue": R[7] || (R[7] = (Et) => T.value.severity = Et),
                      style: { width: "160px" },
                      "popper-class": "vpr-popper"
                    }, {
                      default: lt(() => [
                        ct(G(ie), {
                          value: "low",
                          label: "低"
                        }),
                        ct(G(ie), {
                          value: "medium",
                          label: "中"
                        }),
                        ct(G(ie), {
                          value: "high",
                          label: "高"
                        }),
                        ct(G(ie), {
                          value: "critical",
                          label: "严重"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  rt("div", yi, [
                    R[40] || (R[40] = rt("label", null, [
                      ht("评审建议 "),
                      rt("span", { class: "vpr-required" }, "*")
                    ], -1)),
                    ct(G(Ne), {
                      modelValue: T.value.suggestion,
                      "onUpdate:modelValue": R[8] || (R[8] = (Et) => T.value.suggestion = Et),
                      type: "textarea",
                      rows: 4,
                      placeholder: "描述问题现象、影响和改进建议"
                    }, null, 8, ["modelValue"])
                  ]),
                  rt("div", {
                    class: "vpr-modal-resize-handle",
                    onMousedown: R[9] || (R[9] = Ut((...Et) => G(P) && G(P)(...Et), ["stop"]))
                  }, null, 32)
                ];
              }),
              _: 1
            }, 8, ["modelValue", "width", "style"])
          ], 32),
          ct(G(Ue), {
            modelValue: x.value,
            "onUpdate:modelValue": R[15] || (R[15] = (H) => x.value = H),
            title: "组件树检查器",
            direction: "rtl",
            size: "480px",
            resizable: "",
            "modal-class": "vpr-drawer-layer",
            "z-index": 10003,
            "append-to-body": !1
          }, {
            default: lt(() => [
              F.value ? (pt(), xt("div", bi, [
                F.value.framework && F.value.framework.length ? (pt(), xt("div", _i, [
                  R[43] || (R[43] = rt("h4", null, "框架组件树", -1)),
                  rt("div", xi, [
                    (pt(!0), xt(Ht, null, Gt(F.value.framework, (H, st) => (pt(), xt("div", {
                      key: "fw-" + st,
                      class: "vpr-tree-node",
                      onMouseenter: (kt) => jt(H),
                      onMouseleave: R[13] || (R[13] = (kt) => z.value = null),
                      onClick: (kt) => Vt(H)
                    }, [
                      rt("span", Si, St(H.componentName), 1)
                    ], 40, ki))), 128))
                  ])
                ])) : At("", !0),
                rt("div", Ei, [
                  R[44] || (R[44] = rt("h4", null, "DOM 树", -1)),
                  rt("div", zi, [
                    (pt(!0), xt(Ht, null, Gt(F.value.dom, (H, st) => {
                      var kt;
                      return pt(), xt("div", {
                        key: "dom-" + st,
                        class: "vpr-tree-node",
                        style: Mt({ paddingLeft: st * 12 + "px" }),
                        onMouseenter: ($t) => jt(H),
                        onMouseleave: R[14] || (R[14] = ($t) => z.value = null),
                        onClick: ($t) => Vt(H)
                      }, [
                        rt("span", Ri, St(H.tag), 1),
                        H.id ? (pt(), xt("span", Ai, "#" + St(H.id), 1)) : At("", !0),
                        (kt = H.aria) != null && kt.role ? (pt(), xt("span", Ti, "role=" + St(H.aria.role), 1)) : At("", !0),
                        H.testId ? (pt(), xt("span", Ii, "testid=" + St(H.testId), 1)) : At("", !0)
                      ], 44, Ci);
                    }), 128))
                  ])
                ])
              ])) : (pt(), Lt(G(Me), {
                key: 0,
                description: "先选择一个元素以查看组件树"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          ct(G(Ue), {
            modelValue: p.value,
            "onUpdate:modelValue": R[16] || (R[16] = (H) => p.value = H),
            direction: "rtl",
            size: "560px",
            resizable: "",
            "modal-class": "vpr-drawer-layer",
            "z-index": 10003,
            "append-to-body": !1
          }, {
            header: lt(() => [
              rt("div", Oi, [
                R[49] || (R[49] = rt("span", { class: "vpr-drawer-title" }, "当前页面评审意见", -1)),
                rt("div", Pi, [
                  ct(G(Tt), {
                    type: "primary",
                    size: "small",
                    onClick: Re
                  }, {
                    default: lt(() => [...R[45] || (R[45] = [
                      ht("导出 Markdown", -1)
                    ])]),
                    _: 1
                  }),
                  ct(G(Tt), {
                    size: "small",
                    onClick: Ae
                  }, {
                    default: lt(() => [...R[46] || (R[46] = [
                      ht("导出 JSON", -1)
                    ])]),
                    _: 1
                  }),
                  t.enableZipExport ? (pt(), Lt(G(Tt), {
                    key: 0,
                    size: "small",
                    onClick: Te
                  }, {
                    default: lt(() => [...R[47] || (R[47] = [
                      ht("导出 ZIP", -1)
                    ])]),
                    _: 1
                  })) : At("", !0),
                  ct(G(Tt), {
                    type: "danger",
                    size: "small",
                    onClick: vr
                  }, {
                    default: lt(() => [...R[48] || (R[48] = [
                      ht("清空本页", -1)
                    ])]),
                    _: 1
                  })
                ])
              ])
            ]),
            default: lt(() => [
              u.value.length === 0 ? (pt(), Lt(G(Me), {
                key: 0,
                description: "暂无评审意见"
              })) : (pt(), xt("div", Bi, [
                (pt(!0), xt(Ht, null, Gt(u.value, (H) => (pt(), Lt(G(Tr), {
                  key: H.id,
                  shadow: "never"
                }, {
                  header: lt(() => [
                    rt("div", Di, [
                      rt("span", Li, St(H.title), 1),
                      rt("div", Fi, [
                        ct(G(ne), {
                          type: bt(H.severity),
                          size: "small"
                        }, {
                          default: lt(() => [
                            ht(St(Xt(H.severity)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        ct(G(ne), {
                          type: "info",
                          size: "small"
                        }, {
                          default: lt(() => {
                            var st;
                            return [
                              ht(St(((st = H.targets) == null ? void 0 : st.length) || 1) + " 个目标", 1)
                            ];
                          }),
                          _: 2
                        }, 1024),
                        Jt(H) ? (pt(), Lt(G(ne), {
                          key: 0,
                          type: "success",
                          size: "small"
                        }, {
                          default: lt(() => [...R[50] || (R[50] = [
                            ht("树", -1)
                          ])]),
                          _: 1
                        })) : At("", !0)
                      ])
                    ])
                  ]),
                  default: lt(() => [
                    rt("p", Ni, St(Dt(H.targets)), 1),
                    rt("p", Ui, St(H.suggestion), 1),
                    rt("div", Mi, [
                      rt("span", ji, St(new Date(H.createdAt).toLocaleString()), 1),
                      rt("div", $i, [
                        H.status !== "resolved" ? (pt(), Lt(G(Tt), {
                          key: 0,
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: (st) => mr(H.id)
                        }, {
                          default: lt(() => [...R[51] || (R[51] = [
                            ht("标记解决", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])) : At("", !0),
                        ct(G(Tt), {
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: (st) => gr(H.id)
                        }, {
                          default: lt(() => [...R[52] || (R[52] = [
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
          }, 8, ["modelValue"]),
          ct(G(Fe), {
            modelValue: mt.value,
            "onUpdate:modelValue": R[18] || (R[18] = (H) => mt.value = H),
            "modal-class": "vpr-confirm-layer",
            title: (nt = E.value) == null ? void 0 : nt.title,
            width: "360px",
            "z-index": 10004,
            "append-to-body": !1,
            "close-on-press-escape": !1,
            "align-center": ""
          }, {
            footer: lt(() => [
              ct(G(Tt), {
                onClick: R[17] || (R[17] = (H) => E.value = null)
              }, {
                default: lt(() => [...R[53] || (R[53] = [
                  ht("取消", -1)
                ])]),
                _: 1
              }),
              ct(G(Tt), {
                type: "primary",
                onClick: wr
              }, {
                default: lt(() => [...R[54] || (R[54] = [
                  ht("确定", -1)
                ])]),
                _: 1
              })
            ]),
            default: lt(() => {
              var H;
              return [
                rt("p", null, St((H = E.value) == null ? void 0 : H.message), 1)
              ];
            }),
            _: 1
          }, 8, ["modelValue", "title"])
        ])) : At("", !0)
      ]);
    };
  }
};
export {
  Hi as ReviewTool,
  Hi as default,
  We as useDragResize,
  Ur as useElementSelection,
  $r as useHighlightOverlay,
  Dr as usePageReview,
  jr as useViewportBoxing
};
