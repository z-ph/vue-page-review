import { ref as pt, computed as Zt, watch as De, nextTick as Le, onMounted as xn, onUnmounted as Fe, openBlock as lt, createBlock as Sn, Teleport as En, createElementBlock as ct, createElementVNode as Z, withModifiers as Pt, normalizeStyle as Nt, normalizeClass as Ht, withDirectives as Bt, vModelRadio as Kt, createTextVNode as zt, createCommentVNode as kt, toDisplayString as xt, unref as Dt, Fragment as Vt, renderList as Gt, vModelCheckbox as fe, vModelText as Ne } from "vue";
var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ie(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ge = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(e, l) {
  (function(r) {
    e.exports = r();
  })(function() {
    return function r(h, u, n) {
      function s(_, E) {
        if (!u[_]) {
          if (!h[_]) {
            var b = typeof ie == "function" && ie;
            if (!E && b) return b(_, !0);
            if (i) return i(_, !0);
            var y = new Error("Cannot find module '" + _ + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var c = u[_] = { exports: {} };
          h[_][0].call(c.exports, function(w) {
            var o = h[_][1][w];
            return s(o || w);
          }, c, c.exports, r, h, u, n);
        }
        return u[_].exports;
      }
      for (var i = typeof ie == "function" && ie, d = 0; d < n.length; d++) s(n[d]);
      return s;
    }({ 1: [function(r, h, u) {
      var n = r("./utils"), s = r("./support"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      u.encode = function(d) {
        for (var _, E, b, y, c, w, o, m = [], f = 0, g = d.length, S = g, R = n.getTypeOf(d) !== "string"; f < d.length; ) S = g - f, b = R ? (_ = d[f++], E = f < g ? d[f++] : 0, f < g ? d[f++] : 0) : (_ = d.charCodeAt(f++), E = f < g ? d.charCodeAt(f++) : 0, f < g ? d.charCodeAt(f++) : 0), y = _ >> 2, c = (3 & _) << 4 | E >> 4, w = 1 < S ? (15 & E) << 2 | b >> 6 : 64, o = 2 < S ? 63 & b : 64, m.push(i.charAt(y) + i.charAt(c) + i.charAt(w) + i.charAt(o));
        return m.join("");
      }, u.decode = function(d) {
        var _, E, b, y, c, w, o = 0, m = 0, f = "data:";
        if (d.substr(0, f.length) === f) throw new Error("Invalid base64 input, it looks like a data url.");
        var g, S = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (d.charAt(d.length - 1) === i.charAt(64) && S--, d.charAt(d.length - 2) === i.charAt(64) && S--, S % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (g = s.uint8array ? new Uint8Array(0 | S) : new Array(0 | S); o < d.length; ) _ = i.indexOf(d.charAt(o++)) << 2 | (y = i.indexOf(d.charAt(o++))) >> 4, E = (15 & y) << 4 | (c = i.indexOf(d.charAt(o++))) >> 2, b = (3 & c) << 6 | (w = i.indexOf(d.charAt(o++))), g[m++] = _, c !== 64 && (g[m++] = E), w !== 64 && (g[m++] = b);
        return g;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(r, h, u) {
      var n = r("./external"), s = r("./stream/DataWorker"), i = r("./stream/Crc32Probe"), d = r("./stream/DataLengthProbe");
      function _(E, b, y, c, w) {
        this.compressedSize = E, this.uncompressedSize = b, this.crc32 = y, this.compression = c, this.compressedContent = w;
      }
      _.prototype = { getContentWorker: function() {
        var E = new s(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), b = this;
        return E.on("end", function() {
          if (this.streamInfo.data_length !== b.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), E;
      }, getCompressedWorker: function() {
        return new s(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(E, b, y) {
        return E.pipe(new i()).pipe(new d("uncompressedSize")).pipe(b.compressWorker(y)).pipe(new d("compressedSize")).withStreamInfo("compression", b);
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
          for (var E = 0; E < 8; E++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
          d[_] = i;
        }
        return d;
      }();
      h.exports = function(i, d) {
        return i !== void 0 && i.length ? n.getTypeOf(i) !== "string" ? function(_, E, b, y) {
          var c = s, w = y + b;
          _ ^= -1;
          for (var o = y; o < w; o++) _ = _ >>> 8 ^ c[255 & (_ ^ E[o])];
          return -1 ^ _;
        }(0 | d, i, i.length, 0) : function(_, E, b, y) {
          var c = s, w = y + b;
          _ ^= -1;
          for (var o = y; o < w; o++) _ = _ >>> 8 ^ c[255 & (_ ^ E.charCodeAt(o))];
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
      function E(b, y) {
        d.call(this, "FlateWorker/" + b), this._pako = null, this._pakoAction = b, this._pakoOptions = y, this.meta = {};
      }
      u.magic = "\b\0", i.inherits(E, d), E.prototype.processChunk = function(b) {
        this.meta = b.meta, this._pako === null && this._createPako(), this._pako.push(i.transformTo(_, b.data), !1);
      }, E.prototype.flush = function() {
        d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, E.prototype.cleanUp = function() {
        d.prototype.cleanUp.call(this), this._pako = null;
      }, E.prototype._createPako = function() {
        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var b = this;
        this._pako.onData = function(y) {
          b.push({ data: y, meta: b.meta });
        };
      }, u.compressWorker = function(b) {
        return new E("Deflate", b);
      }, u.uncompressWorker = function() {
        return new E("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, h, u) {
      function n(c, w) {
        var o, m = "";
        for (o = 0; o < w; o++) m += String.fromCharCode(255 & c), c >>>= 8;
        return m;
      }
      function s(c, w, o, m, f, g) {
        var S, R, z = c.file, j = c.compression, P = g !== _.utf8encode, M = i.transformTo("string", g(z.name)), B = i.transformTo("string", _.utf8encode(z.name)), X = z.comment, tt = i.transformTo("string", g(X)), x = i.transformTo("string", _.utf8encode(X)), L = B.length !== z.name.length, a = x.length !== X.length, N = "", nt = "", H = "", st = z.dir, G = z.date, at = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        w && !o || (at.crc32 = c.crc32, at.compressedSize = c.compressedSize, at.uncompressedSize = c.uncompressedSize);
        var O = 0;
        w && (O |= 8), P || !L && !a || (O |= 2048);
        var I = 0, rt = 0;
        st && (I |= 16), f === "UNIX" ? (rt = 798, I |= function(q, gt) {
          var bt = q;
          return q || (bt = gt ? 16893 : 33204), (65535 & bt) << 16;
        }(z.unixPermissions, st)) : (rt = 20, I |= function(q) {
          return 63 & (q || 0);
        }(z.dosPermissions)), S = G.getUTCHours(), S <<= 6, S |= G.getUTCMinutes(), S <<= 5, S |= G.getUTCSeconds() / 2, R = G.getUTCFullYear() - 1980, R <<= 4, R |= G.getUTCMonth() + 1, R <<= 5, R |= G.getUTCDate(), L && (nt = n(1, 1) + n(E(M), 4) + B, N += "up" + n(nt.length, 2) + nt), a && (H = n(1, 1) + n(E(tt), 4) + x, N += "uc" + n(H.length, 2) + H);
        var J = "";
        return J += `
\0`, J += n(O, 2), J += j.magic, J += n(S, 2), J += n(R, 2), J += n(at.crc32, 4), J += n(at.compressedSize, 4), J += n(at.uncompressedSize, 4), J += n(M.length, 2), J += n(N.length, 2), { fileRecord: b.LOCAL_FILE_HEADER + J + M + N, dirRecord: b.CENTRAL_FILE_HEADER + n(rt, 2) + J + n(tt.length, 2) + "\0\0\0\0" + n(I, 4) + n(m, 4) + M + N + tt };
      }
      var i = r("../utils"), d = r("../stream/GenericWorker"), _ = r("../utf8"), E = r("../crc32"), b = r("../signature");
      function y(c, w, o, m) {
        d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = o, this.encodeFileName = m, this.streamFiles = c, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      i.inherits(y, d), y.prototype.push = function(c) {
        var w = c.meta.percent || 0, o = this.entriesCount, m = this._sources.length;
        this.accumulate ? this.contentBuffer.push(c) : (this.bytesWritten += c.data.length, d.prototype.push.call(this, { data: c.data, meta: { currentFile: this.currentFile, percent: o ? (w + 100 * (o - m - 1)) / o : 100 } }));
      }, y.prototype.openedSource = function(c) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = c.file.name;
        var w = this.streamFiles && !c.file.dir;
        if (w) {
          var o = s(c, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: o.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, y.prototype.closedSource = function(c) {
        this.accumulate = !1;
        var w = this.streamFiles && !c.file.dir, o = s(c, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(o.dirRecord), w) this.push({ data: function(m) {
          return b.DATA_DESCRIPTOR + n(m.crc32, 4) + n(m.compressedSize, 4) + n(m.uncompressedSize, 4);
        }(c), meta: { percent: 100 } });
        else for (this.push({ data: o.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, y.prototype.flush = function() {
        for (var c = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({ data: this.dirRecords[w], meta: { percent: 100 } });
        var o = this.bytesWritten - c, m = function(f, g, S, R, z) {
          var j = i.transformTo("string", z(R));
          return b.CENTRAL_DIRECTORY_END + "\0\0\0\0" + n(f, 2) + n(f, 2) + n(g, 4) + n(S, 4) + n(j.length, 2) + j;
        }(this.dirRecords.length, o, c, this.zipComment, this.encodeFileName);
        this.push({ data: m, meta: { percent: 100 } });
      }, y.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, y.prototype.registerPrevious = function(c) {
        this._sources.push(c);
        var w = this;
        return c.on("data", function(o) {
          w.processChunk(o);
        }), c.on("end", function() {
          w.closedSource(w.previous.streamInfo), w._sources.length ? w.prepareNextSource() : w.end();
        }), c.on("error", function(o) {
          w.error(o);
        }), this;
      }, y.prototype.resume = function() {
        return !!d.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, y.prototype.error = function(c) {
        var w = this._sources;
        if (!d.prototype.error.call(this, c)) return !1;
        for (var o = 0; o < w.length; o++) try {
          w[o].error(c);
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
        var E = new s(d.streamFiles, _, d.platform, d.encodeFileName), b = 0;
        try {
          i.forEach(function(y, c) {
            b++;
            var w = function(g, S) {
              var R = g || S, z = n[R];
              if (!z) throw new Error(R + " is not a valid compression method !");
              return z;
            }(c.options.compression, d.compression), o = c.options.compressionOptions || d.compressionOptions || {}, m = c.dir, f = c.date;
            c._compressWorker(w, o).withStreamInfo("file", { name: y, dir: m, date: f, comment: c.comment || "", unixPermissions: c.unixPermissions, dosPermissions: c.dosPermissions }).pipe(E);
          }), E.entriesCount = b;
        } catch (y) {
          E.error(y);
        }
        return E;
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
      var n = r("./utils"), s = r("./external"), i = r("./utf8"), d = r("./zipEntries"), _ = r("./stream/Crc32Probe"), E = r("./nodejsUtils");
      function b(y) {
        return new s.Promise(function(c, w) {
          var o = y.decompressed.getContentWorker().pipe(new _());
          o.on("error", function(m) {
            w(m);
          }).on("end", function() {
            o.streamInfo.crc32 !== y.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : c();
          }).resume();
        });
      }
      h.exports = function(y, c) {
        var w = this;
        return c = n.extend(c || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: i.utf8decode }), E.isNode && E.isStream(y) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", y, !0, c.optimizedBinaryString, c.base64).then(function(o) {
          var m = new d(c);
          return m.load(o), m;
        }).then(function(o) {
          var m = [s.Promise.resolve(o)], f = o.files;
          if (c.checkCRC32) for (var g = 0; g < f.length; g++) m.push(b(f[g]));
          return s.Promise.all(m);
        }).then(function(o) {
          for (var m = o.shift(), f = m.files, g = 0; g < f.length; g++) {
            var S = f[g], R = S.fileNameStr, z = n.resolve(S.fileNameStr);
            w.file(z, S.decompressed, { binary: !0, optimizedBinaryString: !0, date: S.date, dir: S.dir, comment: S.fileCommentStr.length ? S.fileCommentStr : null, unixPermissions: S.unixPermissions, dosPermissions: S.dosPermissions, createFolders: c.createFolders }), S.dir || (w.file(z).unsafeOriginalName = R);
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
        (this._stream = d).pause(), d.on("data", function(E) {
          _.push({ data: E, meta: { percent: 0 } });
        }).on("error", function(E) {
          _.isPaused ? this.generatedError = E : _.error(E);
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
        var E = this;
        i.on("data", function(b, y) {
          E.push(b) || E._helper.pause(), _ && _(y);
        }).on("error", function(b) {
          E.emit("error", b);
        }).on("end", function() {
          E.push(null);
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
      function n(z, j, P) {
        var M, B = i.getTypeOf(j), X = i.extend(P || {}, E);
        X.date = X.date || /* @__PURE__ */ new Date(), X.compression !== null && (X.compression = X.compression.toUpperCase()), typeof X.unixPermissions == "string" && (X.unixPermissions = parseInt(X.unixPermissions, 8)), X.unixPermissions && 16384 & X.unixPermissions && (X.dir = !0), X.dosPermissions && 16 & X.dosPermissions && (X.dir = !0), X.dir && (z = f(z)), X.createFolders && (M = m(z)) && g.call(this, M, !0);
        var tt = B === "string" && X.binary === !1 && X.base64 === !1;
        P && P.binary !== void 0 || (X.binary = !tt), (j instanceof b && j.uncompressedSize === 0 || X.dir || !j || j.length === 0) && (X.base64 = !1, X.binary = !0, j = "", X.compression = "STORE", B = "string");
        var x = null;
        x = j instanceof b || j instanceof d ? j : w.isNode && w.isStream(j) ? new o(z, j) : i.prepareContent(z, j, X.binary, X.optimizedBinaryString, X.base64);
        var L = new y(z, x, X);
        this.files[z] = L;
      }
      var s = r("./utf8"), i = r("./utils"), d = r("./stream/GenericWorker"), _ = r("./stream/StreamHelper"), E = r("./defaults"), b = r("./compressedObject"), y = r("./zipObject"), c = r("./generate"), w = r("./nodejsUtils"), o = r("./nodejs/NodejsStreamInputAdapter"), m = function(z) {
        z.slice(-1) === "/" && (z = z.substring(0, z.length - 1));
        var j = z.lastIndexOf("/");
        return 0 < j ? z.substring(0, j) : "";
      }, f = function(z) {
        return z.slice(-1) !== "/" && (z += "/"), z;
      }, g = function(z, j) {
        return j = j !== void 0 ? j : E.createFolders, z = f(z), this.files[z] || n.call(this, z, null, { dir: !0, createFolders: j }), this.files[z];
      };
      function S(z) {
        return Object.prototype.toString.call(z) === "[object RegExp]";
      }
      var R = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(z) {
        var j, P, M;
        for (j in this.files) M = this.files[j], (P = j.slice(this.root.length, j.length)) && j.slice(0, this.root.length) === this.root && z(P, M);
      }, filter: function(z) {
        var j = [];
        return this.forEach(function(P, M) {
          z(P, M) && j.push(M);
        }), j;
      }, file: function(z, j, P) {
        if (arguments.length !== 1) return z = this.root + z, n.call(this, z, j, P), this;
        if (S(z)) {
          var M = z;
          return this.filter(function(X, tt) {
            return !tt.dir && M.test(X);
          });
        }
        var B = this.files[this.root + z];
        return B && !B.dir ? B : null;
      }, folder: function(z) {
        if (!z) return this;
        if (S(z)) return this.filter(function(B, X) {
          return X.dir && z.test(B);
        });
        var j = this.root + z, P = g.call(this, j), M = this.clone();
        return M.root = P.name, M;
      }, remove: function(z) {
        z = this.root + z;
        var j = this.files[z];
        if (j || (z.slice(-1) !== "/" && (z += "/"), j = this.files[z]), j && !j.dir) delete this.files[z];
        else for (var P = this.filter(function(B, X) {
          return X.name.slice(0, z.length) === z;
        }), M = 0; M < P.length; M++) delete this.files[P[M].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(z) {
        var j, P = {};
        try {
          if ((P = i.extend(z || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = P.type.toLowerCase(), P.compression = P.compression.toUpperCase(), P.type === "binarystring" && (P.type = "string"), !P.type) throw new Error("No output type specified.");
          i.checkSupport(P.type), P.platform !== "darwin" && P.platform !== "freebsd" && P.platform !== "linux" && P.platform !== "sunos" || (P.platform = "UNIX"), P.platform === "win32" && (P.platform = "DOS");
          var M = P.comment || this.comment || "";
          j = c.generateWorker(this, P, M);
        } catch (B) {
          (j = new d("error")).error(B);
        }
        return new _(j, P.type || "string", P.mimeType);
      }, generateAsync: function(z, j) {
        return this.generateInternalStream(z).accumulate(j);
      }, generateNodeStream: function(z, j) {
        return (z = z || {}).type || (z.type = "nodebuffer"), this.generateInternalStream(z).toNodejsStream(j);
      } };
      h.exports = R;
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
        for (var d = i.charCodeAt(0), _ = i.charCodeAt(1), E = i.charCodeAt(2), b = i.charCodeAt(3), y = this.length - 4; 0 <= y; --y) if (this.data[y] === d && this.data[y + 1] === _ && this.data[y + 2] === E && this.data[y + 3] === b) return y - this.zero;
        return -1;
      }, s.prototype.readAndCheckSignature = function(i) {
        var d = i.charCodeAt(0), _ = i.charCodeAt(1), E = i.charCodeAt(2), b = i.charCodeAt(3), y = this.readData(4);
        return d === y[0] && _ === y[1] && E === y[2] && b === y[3];
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
      var n = r("../utils"), s = r("../support"), i = r("./ArrayReader"), d = r("./StringReader"), _ = r("./NodeBufferReader"), E = r("./Uint8ArrayReader");
      h.exports = function(b) {
        var y = n.getTypeOf(b);
        return n.checkSupport(y), y !== "string" || s.uint8array ? y === "nodebuffer" ? new _(b) : s.uint8array ? new E(n.transformTo("uint8array", b)) : new i(n.transformTo("array", b)) : new d(b);
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
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, d.then(function(E) {
          _.dataIsReady = !0, _.data = E, _.max = E && E.length || 0, _.type = n.getTypeOf(E), _.isPaused || _._tickAndRepeat();
        }, function(E) {
          _.error(E);
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
      var n = r("../utils"), s = r("./ConvertWorker"), i = r("./GenericWorker"), d = r("../base64"), _ = r("../support"), E = r("../external"), b = null;
      if (_.nodestream) try {
        b = r("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function y(w, o) {
        return new E.Promise(function(m, f) {
          var g = [], S = w._internalType, R = w._outputType, z = w._mimeType;
          w.on("data", function(j, P) {
            g.push(j), o && o(P);
          }).on("error", function(j) {
            g = [], f(j);
          }).on("end", function() {
            try {
              var j = function(P, M, B) {
                switch (P) {
                  case "blob":
                    return n.newBlob(n.transformTo("arraybuffer", M), B);
                  case "base64":
                    return d.encode(M);
                  default:
                    return n.transformTo(P, M);
                }
              }(R, function(P, M) {
                var B, X = 0, tt = null, x = 0;
                for (B = 0; B < M.length; B++) x += M[B].length;
                switch (P) {
                  case "string":
                    return M.join("");
                  case "array":
                    return Array.prototype.concat.apply([], M);
                  case "uint8array":
                    for (tt = new Uint8Array(x), B = 0; B < M.length; B++) tt.set(M[B], X), X += M[B].length;
                    return tt;
                  case "nodebuffer":
                    return Buffer.concat(M);
                  default:
                    throw new Error("concat : unsupported type '" + P + "'");
                }
              }(S, g), z);
              m(j);
            } catch (P) {
              f(P);
            }
            g = [];
          }).resume();
        });
      }
      function c(w, o, m) {
        var f = o;
        switch (o) {
          case "blob":
          case "arraybuffer":
            f = "uint8array";
            break;
          case "base64":
            f = "string";
        }
        try {
          this._internalType = f, this._outputType = o, this._mimeType = m, n.checkSupport(f), this._worker = w.pipe(new s(f)), w.lock();
        } catch (g) {
          this._worker = new i("error"), this._worker.error(g);
        }
      }
      c.prototype = { accumulate: function(w) {
        return y(this, w);
      }, on: function(w, o) {
        var m = this;
        return w === "data" ? this._worker.on(w, function(f) {
          o.call(m, f.data, f.meta);
        }) : this._worker.on(w, function() {
          n.delay(o, arguments, m);
        }), this;
      }, resume: function() {
        return n.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(w) {
        if (n.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new b(this, { objectMode: this._outputType !== "nodebuffer" }, w);
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
      for (var n = r("./utils"), s = r("./support"), i = r("./nodejsUtils"), d = r("./stream/GenericWorker"), _ = new Array(256), E = 0; E < 256; E++) _[E] = 252 <= E ? 6 : 248 <= E ? 5 : 240 <= E ? 4 : 224 <= E ? 3 : 192 <= E ? 2 : 1;
      _[254] = _[254] = 1;
      function b() {
        d.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function y() {
        d.call(this, "utf-8 encode");
      }
      u.utf8encode = function(c) {
        return s.nodebuffer ? i.newBufferFrom(c, "utf-8") : function(w) {
          var o, m, f, g, S, R = w.length, z = 0;
          for (g = 0; g < R; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (f = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), g++), z += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (o = s.uint8array ? new Uint8Array(z) : new Array(z), g = S = 0; S < z; g++) (64512 & (m = w.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (f = w.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), g++), m < 128 ? o[S++] = m : (m < 2048 ? o[S++] = 192 | m >>> 6 : (m < 65536 ? o[S++] = 224 | m >>> 12 : (o[S++] = 240 | m >>> 18, o[S++] = 128 | m >>> 12 & 63), o[S++] = 128 | m >>> 6 & 63), o[S++] = 128 | 63 & m);
          return o;
        }(c);
      }, u.utf8decode = function(c) {
        return s.nodebuffer ? n.transformTo("nodebuffer", c).toString("utf-8") : function(w) {
          var o, m, f, g, S = w.length, R = new Array(2 * S);
          for (o = m = 0; o < S; ) if ((f = w[o++]) < 128) R[m++] = f;
          else if (4 < (g = _[f])) R[m++] = 65533, o += g - 1;
          else {
            for (f &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && o < S; ) f = f << 6 | 63 & w[o++], g--;
            1 < g ? R[m++] = 65533 : f < 65536 ? R[m++] = f : (f -= 65536, R[m++] = 55296 | f >> 10 & 1023, R[m++] = 56320 | 1023 & f);
          }
          return R.length !== m && (R.subarray ? R = R.subarray(0, m) : R.length = m), n.applyFromCharCode(R);
        }(c = n.transformTo(s.uint8array ? "uint8array" : "array", c));
      }, n.inherits(b, d), b.prototype.processChunk = function(c) {
        var w = n.transformTo(s.uint8array ? "uint8array" : "array", c.data);
        if (this.leftOver && this.leftOver.length) {
          if (s.uint8array) {
            var o = w;
            (w = new Uint8Array(o.length + this.leftOver.length)).set(this.leftOver, 0), w.set(o, this.leftOver.length);
          } else w = this.leftOver.concat(w);
          this.leftOver = null;
        }
        var m = function(g, S) {
          var R;
          for ((S = S || g.length) > g.length && (S = g.length), R = S - 1; 0 <= R && (192 & g[R]) == 128; ) R--;
          return R < 0 || R === 0 ? S : R + _[g[R]] > S ? R : S;
        }(w), f = w;
        m !== w.length && (s.uint8array ? (f = w.subarray(0, m), this.leftOver = w.subarray(m, w.length)) : (f = w.slice(0, m), this.leftOver = w.slice(m, w.length))), this.push({ data: u.utf8decode(f), meta: c.meta });
      }, b.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: u.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, u.Utf8DecodeWorker = b, n.inherits(y, d), y.prototype.processChunk = function(c) {
        this.push({ data: u.utf8encode(c.data), meta: c.meta });
      }, u.Utf8EncodeWorker = y;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, h, u) {
      var n = r("./support"), s = r("./base64"), i = r("./nodejsUtils"), d = r("./external");
      function _(o) {
        return o;
      }
      function E(o, m) {
        for (var f = 0; f < o.length; ++f) m[f] = 255 & o.charCodeAt(f);
        return m;
      }
      r("setimmediate"), u.newBlob = function(o, m) {
        u.checkSupport("blob");
        try {
          return new Blob([o], { type: m });
        } catch {
          try {
            var f = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return f.append(o), f.getBlob(m);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var b = { stringifyByChunk: function(o, m, f) {
        var g = [], S = 0, R = o.length;
        if (R <= f) return String.fromCharCode.apply(null, o);
        for (; S < R; ) m === "array" || m === "nodebuffer" ? g.push(String.fromCharCode.apply(null, o.slice(S, Math.min(S + f, R)))) : g.push(String.fromCharCode.apply(null, o.subarray(S, Math.min(S + f, R)))), S += f;
        return g.join("");
      }, stringifyByChar: function(o) {
        for (var m = "", f = 0; f < o.length; f++) m += String.fromCharCode(o[f]);
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
      function y(o) {
        var m = 65536, f = u.getTypeOf(o), g = !0;
        if (f === "uint8array" ? g = b.applyCanBeUsed.uint8array : f === "nodebuffer" && (g = b.applyCanBeUsed.nodebuffer), g) for (; 1 < m; ) try {
          return b.stringifyByChunk(o, f, m);
        } catch {
          m = Math.floor(m / 2);
        }
        return b.stringifyByChar(o);
      }
      function c(o, m) {
        for (var f = 0; f < o.length; f++) m[f] = o[f];
        return m;
      }
      u.applyFromCharCode = y;
      var w = {};
      w.string = { string: _, array: function(o) {
        return E(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return w.string.uint8array(o).buffer;
      }, uint8array: function(o) {
        return E(o, new Uint8Array(o.length));
      }, nodebuffer: function(o) {
        return E(o, i.allocBuffer(o.length));
      } }, w.array = { string: y, array: _, arraybuffer: function(o) {
        return new Uint8Array(o).buffer;
      }, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return i.newBufferFrom(o);
      } }, w.arraybuffer = { string: function(o) {
        return y(new Uint8Array(o));
      }, array: function(o) {
        return c(new Uint8Array(o), new Array(o.byteLength));
      }, arraybuffer: _, uint8array: function(o) {
        return new Uint8Array(o);
      }, nodebuffer: function(o) {
        return i.newBufferFrom(new Uint8Array(o));
      } }, w.uint8array = { string: y, array: function(o) {
        return c(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return o.buffer;
      }, uint8array: _, nodebuffer: function(o) {
        return i.newBufferFrom(o);
      } }, w.nodebuffer = { string: y, array: function(o) {
        return c(o, new Array(o.length));
      }, arraybuffer: function(o) {
        return w.nodebuffer.uint8array(o).buffer;
      }, uint8array: function(o) {
        return c(o, new Uint8Array(o.length));
      }, nodebuffer: _ }, u.transformTo = function(o, m) {
        if (m = m || "", !o) return m;
        u.checkSupport(o);
        var f = u.getTypeOf(m);
        return w[f][o](m);
      }, u.resolve = function(o) {
        for (var m = o.split("/"), f = [], g = 0; g < m.length; g++) {
          var S = m[g];
          S === "." || S === "" && g !== 0 && g !== m.length - 1 || (S === ".." ? f.pop() : f.push(S));
        }
        return f.join("/");
      }, u.getTypeOf = function(o) {
        return typeof o == "string" ? "string" : Object.prototype.toString.call(o) === "[object Array]" ? "array" : n.nodebuffer && i.isBuffer(o) ? "nodebuffer" : n.uint8array && o instanceof Uint8Array ? "uint8array" : n.arraybuffer && o instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, u.checkSupport = function(o) {
        if (!n[o.toLowerCase()]) throw new Error(o + " is not supported by this platform");
      }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(o) {
        var m, f, g = "";
        for (f = 0; f < (o || "").length; f++) g += "\\x" + ((m = o.charCodeAt(f)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
        return g;
      }, u.delay = function(o, m, f) {
        setImmediate(function() {
          o.apply(f || null, m || []);
        });
      }, u.inherits = function(o, m) {
        function f() {
        }
        f.prototype = m.prototype, o.prototype = new f();
      }, u.extend = function() {
        var o, m, f = {};
        for (o = 0; o < arguments.length; o++) for (m in arguments[o]) Object.prototype.hasOwnProperty.call(arguments[o], m) && f[m] === void 0 && (f[m] = arguments[o][m]);
        return f;
      }, u.prepareContent = function(o, m, f, g, S) {
        return d.Promise.resolve(m).then(function(R) {
          return n.blob && (R instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(R)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(z, j) {
            var P = new FileReader();
            P.onload = function(M) {
              z(M.target.result);
            }, P.onerror = function(M) {
              j(M.target.error);
            }, P.readAsArrayBuffer(R);
          }) : R;
        }).then(function(R) {
          var z = u.getTypeOf(R);
          return z ? (z === "arraybuffer" ? R = u.transformTo("uint8array", R) : z === "string" && (S ? R = s.decode(R) : f && g !== !0 && (R = function(j) {
            return E(j, n.uint8array ? new Uint8Array(j.length) : new Array(j.length));
          }(R))), R) : d.Promise.reject(new Error("Can't read the data of '" + o + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, h, u) {
      var n = r("./reader/readerFor"), s = r("./utils"), i = r("./signature"), d = r("./zipEntry"), _ = r("./support");
      function E(b) {
        this.files = [], this.loadOptions = b;
      }
      E.prototype = { checkSignature: function(b) {
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
        for (b = 0; b < this.files.length; b++) y = this.files[b], this.reader.setIndex(y.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), y.readLocalPart(this.reader), y.handleUTF8(), y.processAttributes();
      }, readCentralDir: function() {
        var b;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(i.CENTRAL_FILE_HEADER); ) (b = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(b);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var b = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
        if (b < 0) throw this.isSignature(0, i.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(b);
        var y = b;
        if (this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (b = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(b), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, i.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var c = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (c += 20, c += 12 + this.zip64EndOfCentralSize);
        var w = y - c;
        if (0 < w) this.isSignature(y, i.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
        else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
      }, prepareReader: function(b) {
        this.reader = n(b);
      }, load: function(b) {
        this.prepareReader(b), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, h.exports = E;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, h, u) {
      var n = r("./reader/readerFor"), s = r("./utils"), i = r("./compressedObject"), d = r("./crc32"), _ = r("./utf8"), E = r("./compressions"), b = r("./support");
      function y(c, w) {
        this.options = c, this.loadOptions = w;
      }
      y.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(c) {
        var w, o;
        if (c.skip(22), this.fileNameLength = c.readInt(2), o = c.readInt(2), this.fileName = c.readData(this.fileNameLength), c.skip(o), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((w = function(m) {
          for (var f in E) if (Object.prototype.hasOwnProperty.call(E, f) && E[f].magic === m) return E[f];
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
        var w, o, m, f = c.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); c.index + 4 < f; ) w = c.readInt(2), o = c.readInt(2), m = c.readData(o), this.extraFields[w] = { id: w, length: o, value: m };
        c.setIndex(f);
      }, handleUTF8: function() {
        var c = b.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = _.utf8decode(this.fileName), this.fileCommentStr = _.utf8decode(this.fileComment);
        else {
          var w = this.findExtraFieldUnicodePath();
          if (w !== null) this.fileNameStr = w;
          else {
            var o = s.transformTo(c, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(o);
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
      function n(w, o, m) {
        this.name = w, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = o, this._dataBinary = m.binary, this.options = { compression: m.compression, compressionOptions: m.compressionOptions };
      }
      var s = r("./stream/StreamHelper"), i = r("./stream/DataWorker"), d = r("./utf8"), _ = r("./compressedObject"), E = r("./stream/GenericWorker");
      n.prototype = { internalStream: function(w) {
        var o = null, m = "string";
        try {
          if (!w) throw new Error("No output type specified.");
          var f = (m = w.toLowerCase()) === "string" || m === "text";
          m !== "binarystring" && m !== "text" || (m = "string"), o = this._decompressWorker();
          var g = !this._dataBinary;
          g && !f && (o = o.pipe(new d.Utf8EncodeWorker())), !g && f && (o = o.pipe(new d.Utf8DecodeWorker()));
        } catch (S) {
          (o = new E("error")).error(S);
        }
        return new s(o, m, "");
      }, async: function(w, o) {
        return this.internalStream(w).accumulate(o);
      }, nodeStream: function(w, o) {
        return this.internalStream(w || "nodebuffer").toNodejsStream(o);
      }, _compressWorker: function(w, o) {
        if (this._data instanceof _ && this._data.compression.magic === w.magic) return this._data.getCompressedWorker();
        var m = this._decompressWorker();
        return this._dataBinary || (m = m.pipe(new d.Utf8EncodeWorker())), _.createWorkerFrom(m, w, o);
      }, _decompressWorker: function() {
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof E ? this._data : new i(this._data);
      } };
      for (var b = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], y = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, c = 0; c < b.length; c++) n.prototype[b[c]] = y;
      h.exports = n;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, h, u) {
      (function(n) {
        var s, i, d = n.MutationObserver || n.WebKitMutationObserver;
        if (d) {
          var _ = 0, E = new d(w), b = n.document.createTextNode("");
          E.observe(b, { characterData: !0 }), s = function() {
            b.data = _ = ++_ % 2;
          };
        } else if (n.setImmediate || n.MessageChannel === void 0) s = "document" in n && "onreadystatechange" in n.document.createElement("script") ? function() {
          var o = n.document.createElement("script");
          o.onreadystatechange = function() {
            w(), o.onreadystatechange = null, o.parentNode.removeChild(o), o = null;
          }, n.document.documentElement.appendChild(o);
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
          var o, m;
          i = !0;
          for (var f = c.length; f; ) {
            for (m = c, c = [], o = -1; ++o < f; ) m[o]();
            f = c.length;
          }
          i = !1;
        }
        h.exports = function(o) {
          c.push(o) !== 1 || i || s();
        };
      }).call(this, typeof re < "u" ? re : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(r, h, u) {
      var n = r("immediate");
      function s() {
      }
      var i = {}, d = ["REJECTED"], _ = ["FULFILLED"], E = ["PENDING"];
      function b(f) {
        if (typeof f != "function") throw new TypeError("resolver must be a function");
        this.state = E, this.queue = [], this.outcome = void 0, f !== s && o(this, f);
      }
      function y(f, g, S) {
        this.promise = f, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof S == "function" && (this.onRejected = S, this.callRejected = this.otherCallRejected);
      }
      function c(f, g, S) {
        n(function() {
          var R;
          try {
            R = g(S);
          } catch (z) {
            return i.reject(f, z);
          }
          R === f ? i.reject(f, new TypeError("Cannot resolve promise with itself")) : i.resolve(f, R);
        });
      }
      function w(f) {
        var g = f && f.then;
        if (f && (typeof f == "object" || typeof f == "function") && typeof g == "function") return function() {
          g.apply(f, arguments);
        };
      }
      function o(f, g) {
        var S = !1;
        function R(P) {
          S || (S = !0, i.reject(f, P));
        }
        function z(P) {
          S || (S = !0, i.resolve(f, P));
        }
        var j = m(function() {
          g(z, R);
        });
        j.status === "error" && R(j.value);
      }
      function m(f, g) {
        var S = {};
        try {
          S.value = f(g), S.status = "success";
        } catch (R) {
          S.status = "error", S.value = R;
        }
        return S;
      }
      (h.exports = b).prototype.finally = function(f) {
        if (typeof f != "function") return this;
        var g = this.constructor;
        return this.then(function(S) {
          return g.resolve(f()).then(function() {
            return S;
          });
        }, function(S) {
          return g.resolve(f()).then(function() {
            throw S;
          });
        });
      }, b.prototype.catch = function(f) {
        return this.then(null, f);
      }, b.prototype.then = function(f, g) {
        if (typeof f != "function" && this.state === _ || typeof g != "function" && this.state === d) return this;
        var S = new this.constructor(s);
        return this.state !== E ? c(S, this.state === _ ? f : g, this.outcome) : this.queue.push(new y(S, f, g)), S;
      }, y.prototype.callFulfilled = function(f) {
        i.resolve(this.promise, f);
      }, y.prototype.otherCallFulfilled = function(f) {
        c(this.promise, this.onFulfilled, f);
      }, y.prototype.callRejected = function(f) {
        i.reject(this.promise, f);
      }, y.prototype.otherCallRejected = function(f) {
        c(this.promise, this.onRejected, f);
      }, i.resolve = function(f, g) {
        var S = m(w, g);
        if (S.status === "error") return i.reject(f, S.value);
        var R = S.value;
        if (R) o(f, R);
        else {
          f.state = _, f.outcome = g;
          for (var z = -1, j = f.queue.length; ++z < j; ) f.queue[z].callFulfilled(g);
        }
        return f;
      }, i.reject = function(f, g) {
        f.state = d, f.outcome = g;
        for (var S = -1, R = f.queue.length; ++S < R; ) f.queue[S].callRejected(g);
        return f;
      }, b.resolve = function(f) {
        return f instanceof this ? f : i.resolve(new this(s), f);
      }, b.reject = function(f) {
        var g = new this(s);
        return i.reject(g, f);
      }, b.all = function(f) {
        var g = this;
        if (Object.prototype.toString.call(f) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var S = f.length, R = !1;
        if (!S) return this.resolve([]);
        for (var z = new Array(S), j = 0, P = -1, M = new this(s); ++P < S; ) B(f[P], P);
        return M;
        function B(X, tt) {
          g.resolve(X).then(function(x) {
            z[tt] = x, ++j !== S || R || (R = !0, i.resolve(M, z));
          }, function(x) {
            R || (R = !0, i.reject(M, x));
          });
        }
      }, b.race = function(f) {
        var g = this;
        if (Object.prototype.toString.call(f) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var S = f.length, R = !1;
        if (!S) return this.resolve([]);
        for (var z = -1, j = new this(s); ++z < S; ) P = f[z], g.resolve(P).then(function(M) {
          R || (R = !0, i.resolve(j, M));
        }, function(M) {
          R || (R = !0, i.reject(j, M));
        });
        var P;
        return j;
      };
    }, { immediate: 36 }], 38: [function(r, h, u) {
      var n = {};
      (0, r("./lib/utils/common").assign)(n, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), h.exports = n;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, h, u) {
      var n = r("./zlib/deflate"), s = r("./utils/common"), i = r("./utils/strings"), d = r("./zlib/messages"), _ = r("./zlib/zstream"), E = Object.prototype.toString, b = 0, y = -1, c = 0, w = 8;
      function o(f) {
        if (!(this instanceof o)) return new o(f);
        this.options = s.assign({ level: y, method: w, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, f || {});
        var g = this.options;
        g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var S = n.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
        if (S !== b) throw new Error(d[S]);
        if (g.header && n.deflateSetHeader(this.strm, g.header), g.dictionary) {
          var R;
          if (R = typeof g.dictionary == "string" ? i.string2buf(g.dictionary) : E.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (S = n.deflateSetDictionary(this.strm, R)) !== b) throw new Error(d[S]);
          this._dict_set = !0;
        }
      }
      function m(f, g) {
        var S = new o(g);
        if (S.push(f, !0), S.err) throw S.msg || d[S.err];
        return S.result;
      }
      o.prototype.push = function(f, g) {
        var S, R, z = this.strm, j = this.options.chunkSize;
        if (this.ended) return !1;
        R = g === ~~g ? g : g === !0 ? 4 : 0, typeof f == "string" ? z.input = i.string2buf(f) : E.call(f) === "[object ArrayBuffer]" ? z.input = new Uint8Array(f) : z.input = f, z.next_in = 0, z.avail_in = z.input.length;
        do {
          if (z.avail_out === 0 && (z.output = new s.Buf8(j), z.next_out = 0, z.avail_out = j), (S = n.deflate(z, R)) !== 1 && S !== b) return this.onEnd(S), !(this.ended = !0);
          z.avail_out !== 0 && (z.avail_in !== 0 || R !== 4 && R !== 2) || (this.options.to === "string" ? this.onData(i.buf2binstring(s.shrinkBuf(z.output, z.next_out))) : this.onData(s.shrinkBuf(z.output, z.next_out)));
        } while ((0 < z.avail_in || z.avail_out === 0) && S !== 1);
        return R === 4 ? (S = n.deflateEnd(this.strm), this.onEnd(S), this.ended = !0, S === b) : R !== 2 || (this.onEnd(b), !(z.avail_out = 0));
      }, o.prototype.onData = function(f) {
        this.chunks.push(f);
      }, o.prototype.onEnd = function(f) {
        f === b && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = f, this.msg = this.strm.msg;
      }, u.Deflate = o, u.deflate = m, u.deflateRaw = function(f, g) {
        return (g = g || {}).raw = !0, m(f, g);
      }, u.gzip = function(f, g) {
        return (g = g || {}).gzip = !0, m(f, g);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, h, u) {
      var n = r("./zlib/inflate"), s = r("./utils/common"), i = r("./utils/strings"), d = r("./zlib/constants"), _ = r("./zlib/messages"), E = r("./zlib/zstream"), b = r("./zlib/gzheader"), y = Object.prototype.toString;
      function c(o) {
        if (!(this instanceof c)) return new c(o);
        this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, o || {});
        var m = this.options;
        m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), !(0 <= m.windowBits && m.windowBits < 16) || o && o.windowBits || (m.windowBits += 32), 15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new E(), this.strm.avail_out = 0;
        var f = n.inflateInit2(this.strm, m.windowBits);
        if (f !== d.Z_OK) throw new Error(_[f]);
        this.header = new b(), n.inflateGetHeader(this.strm, this.header);
      }
      function w(o, m) {
        var f = new c(m);
        if (f.push(o, !0), f.err) throw f.msg || _[f.err];
        return f.result;
      }
      c.prototype.push = function(o, m) {
        var f, g, S, R, z, j, P = this.strm, M = this.options.chunkSize, B = this.options.dictionary, X = !1;
        if (this.ended) return !1;
        g = m === ~~m ? m : m === !0 ? d.Z_FINISH : d.Z_NO_FLUSH, typeof o == "string" ? P.input = i.binstring2buf(o) : y.call(o) === "[object ArrayBuffer]" ? P.input = new Uint8Array(o) : P.input = o, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new s.Buf8(M), P.next_out = 0, P.avail_out = M), (f = n.inflate(P, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && B && (j = typeof B == "string" ? i.string2buf(B) : y.call(B) === "[object ArrayBuffer]" ? new Uint8Array(B) : B, f = n.inflateSetDictionary(this.strm, j)), f === d.Z_BUF_ERROR && X === !0 && (f = d.Z_OK, X = !1), f !== d.Z_STREAM_END && f !== d.Z_OK) return this.onEnd(f), !(this.ended = !0);
          P.next_out && (P.avail_out !== 0 && f !== d.Z_STREAM_END && (P.avail_in !== 0 || g !== d.Z_FINISH && g !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (S = i.utf8border(P.output, P.next_out), R = P.next_out - S, z = i.buf2string(P.output, S), P.next_out = R, P.avail_out = M - R, R && s.arraySet(P.output, P.output, S, R, 0), this.onData(z)) : this.onData(s.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (X = !0);
        } while ((0 < P.avail_in || P.avail_out === 0) && f !== d.Z_STREAM_END);
        return f === d.Z_STREAM_END && (g = d.Z_FINISH), g === d.Z_FINISH ? (f = n.inflateEnd(this.strm), this.onEnd(f), this.ended = !0, f === d.Z_OK) : g !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(P.avail_out = 0));
      }, c.prototype.onData = function(o) {
        this.chunks.push(o);
      }, c.prototype.onEnd = function(o) {
        o === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, u.Inflate = c, u.inflate = w, u.inflateRaw = function(o, m) {
        return (m = m || {}).raw = !0, w(o, m);
      }, u.ungzip = w;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, h, u) {
      var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      u.assign = function(d) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var E = _.shift();
          if (E) {
            if (typeof E != "object") throw new TypeError(E + "must be non-object");
            for (var b in E) E.hasOwnProperty(b) && (d[b] = E[b]);
          }
        }
        return d;
      }, u.shrinkBuf = function(d, _) {
        return d.length === _ ? d : d.subarray ? d.subarray(0, _) : (d.length = _, d);
      };
      var s = { arraySet: function(d, _, E, b, y) {
        if (_.subarray && d.subarray) d.set(_.subarray(E, E + b), y);
        else for (var c = 0; c < b; c++) d[y + c] = _[E + c];
      }, flattenChunks: function(d) {
        var _, E, b, y, c, w;
        for (_ = b = 0, E = d.length; _ < E; _++) b += d[_].length;
        for (w = new Uint8Array(b), _ = y = 0, E = d.length; _ < E; _++) c = d[_], w.set(c, y), y += c.length;
        return w;
      } }, i = { arraySet: function(d, _, E, b, y) {
        for (var c = 0; c < b; c++) d[y + c] = _[E + c];
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
      function E(b, y) {
        if (y < 65537 && (b.subarray && i || !b.subarray && s)) return String.fromCharCode.apply(null, n.shrinkBuf(b, y));
        for (var c = "", w = 0; w < y; w++) c += String.fromCharCode(b[w]);
        return c;
      }
      d[254] = d[254] = 1, u.string2buf = function(b) {
        var y, c, w, o, m, f = b.length, g = 0;
        for (o = 0; o < f; o++) (64512 & (c = b.charCodeAt(o))) == 55296 && o + 1 < f && (64512 & (w = b.charCodeAt(o + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), o++), g += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        for (y = new n.Buf8(g), o = m = 0; m < g; o++) (64512 & (c = b.charCodeAt(o))) == 55296 && o + 1 < f && (64512 & (w = b.charCodeAt(o + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (w - 56320), o++), c < 128 ? y[m++] = c : (c < 2048 ? y[m++] = 192 | c >>> 6 : (c < 65536 ? y[m++] = 224 | c >>> 12 : (y[m++] = 240 | c >>> 18, y[m++] = 128 | c >>> 12 & 63), y[m++] = 128 | c >>> 6 & 63), y[m++] = 128 | 63 & c);
        return y;
      }, u.buf2binstring = function(b) {
        return E(b, b.length);
      }, u.binstring2buf = function(b) {
        for (var y = new n.Buf8(b.length), c = 0, w = y.length; c < w; c++) y[c] = b.charCodeAt(c);
        return y;
      }, u.buf2string = function(b, y) {
        var c, w, o, m, f = y || b.length, g = new Array(2 * f);
        for (c = w = 0; c < f; ) if ((o = b[c++]) < 128) g[w++] = o;
        else if (4 < (m = d[o])) g[w++] = 65533, c += m - 1;
        else {
          for (o &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && c < f; ) o = o << 6 | 63 & b[c++], m--;
          1 < m ? g[w++] = 65533 : o < 65536 ? g[w++] = o : (o -= 65536, g[w++] = 55296 | o >> 10 & 1023, g[w++] = 56320 | 1023 & o);
        }
        return E(g, w);
      }, u.utf8border = function(b, y) {
        var c;
        for ((y = y || b.length) > b.length && (y = b.length), c = y - 1; 0 <= c && (192 & b[c]) == 128; ) c--;
        return c < 0 || c === 0 ? y : c + d[b[c]] > y ? c : y;
      };
    }, { "./common": 41 }], 43: [function(r, h, u) {
      h.exports = function(n, s, i, d) {
        for (var _ = 65535 & n | 0, E = n >>> 16 & 65535 | 0, b = 0; i !== 0; ) {
          for (i -= b = 2e3 < i ? 2e3 : i; E = E + (_ = _ + s[d++] | 0) | 0, --b; ) ;
          _ %= 65521, E %= 65521;
        }
        return _ | E << 16 | 0;
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
        var E = n, b = _ + d;
        s ^= -1;
        for (var y = _; y < b; y++) s = s >>> 8 ^ E[255 & (s ^ i[y])];
        return -1 ^ s;
      };
    }, {}], 46: [function(r, h, u) {
      var n, s = r("../utils/common"), i = r("./trees"), d = r("./adler32"), _ = r("./crc32"), E = r("./messages"), b = 0, y = 4, c = 0, w = -2, o = -1, m = 4, f = 2, g = 8, S = 9, R = 286, z = 30, j = 19, P = 2 * R + 1, M = 15, B = 3, X = 258, tt = X + B + 1, x = 42, L = 113, a = 1, N = 2, nt = 3, H = 4;
      function st(t, F) {
        return t.msg = E[F], F;
      }
      function G(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function at(t) {
        for (var F = t.length; 0 <= --F; ) t[F] = 0;
      }
      function O(t) {
        var F = t.state, D = F.pending;
        D > t.avail_out && (D = t.avail_out), D !== 0 && (s.arraySet(t.output, F.pending_buf, F.pending_out, D, t.next_out), t.next_out += D, F.pending_out += D, t.total_out += D, t.avail_out -= D, F.pending -= D, F.pending === 0 && (F.pending_out = 0));
      }
      function I(t, F) {
        i._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, F), t.block_start = t.strstart, O(t.strm);
      }
      function rt(t, F) {
        t.pending_buf[t.pending++] = F;
      }
      function J(t, F) {
        t.pending_buf[t.pending++] = F >>> 8 & 255, t.pending_buf[t.pending++] = 255 & F;
      }
      function q(t, F) {
        var D, v, p = t.max_chain_length, C = t.strstart, $ = t.prev_length, W = t.nice_match, T = t.strstart > t.w_size - tt ? t.strstart - (t.w_size - tt) : 0, Y = t.window, Q = t.w_mask, K = t.prev, it = t.strstart + X, vt = Y[C + $ - 1], ht = Y[C + $];
        t.prev_length >= t.good_match && (p >>= 2), W > t.lookahead && (W = t.lookahead);
        do
          if (Y[(D = F) + $] === ht && Y[D + $ - 1] === vt && Y[D] === Y[C] && Y[++D] === Y[C + 1]) {
            C += 2, D++;
            do
              ;
            while (Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && Y[++C] === Y[++D] && C < it);
            if (v = X - (it - C), C = it - X, $ < v) {
              if (t.match_start = F, W <= ($ = v)) break;
              vt = Y[C + $ - 1], ht = Y[C + $];
            }
          }
        while ((F = K[F & Q]) > T && --p != 0);
        return $ <= t.lookahead ? $ : t.lookahead;
      }
      function gt(t) {
        var F, D, v, p, C, $, W, T, Y, Q, K = t.w_size;
        do {
          if (p = t.window_size - t.lookahead - t.strstart, t.strstart >= K + (K - tt)) {
            for (s.arraySet(t.window, t.window, K, K, 0), t.match_start -= K, t.strstart -= K, t.block_start -= K, F = D = t.hash_size; v = t.head[--F], t.head[F] = K <= v ? v - K : 0, --D; ) ;
            for (F = D = K; v = t.prev[--F], t.prev[F] = K <= v ? v - K : 0, --D; ) ;
            p += K;
          }
          if (t.strm.avail_in === 0) break;
          if ($ = t.strm, W = t.window, T = t.strstart + t.lookahead, Y = p, Q = void 0, Q = $.avail_in, Y < Q && (Q = Y), D = Q === 0 ? 0 : ($.avail_in -= Q, s.arraySet(W, $.input, $.next_in, Q, T), $.state.wrap === 1 ? $.adler = d($.adler, W, Q, T) : $.state.wrap === 2 && ($.adler = _($.adler, W, Q, T)), $.next_in += Q, $.total_in += Q, Q), t.lookahead += D, t.lookahead + t.insert >= B) for (C = t.strstart - t.insert, t.ins_h = t.window[C], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[C + B - 1]) & t.hash_mask, t.prev[C & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = C, C++, t.insert--, !(t.lookahead + t.insert < B)); ) ;
        } while (t.lookahead < tt && t.strm.avail_in !== 0);
      }
      function bt(t, F) {
        for (var D, v; ; ) {
          if (t.lookahead < tt) {
            if (gt(t), t.lookahead < tt && F === b) return a;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= B && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), D !== 0 && t.strstart - D <= t.w_size - tt && (t.match_length = q(t, D)), t.match_length >= B) if (v = i._tr_tally(t, t.strstart - t.match_start, t.match_length - B), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= B) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else v = i._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (v && (I(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = t.strstart < B - 1 ? t.strstart : B - 1, F === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : H) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ut(t, F) {
        for (var D, v, p; ; ) {
          if (t.lookahead < tt) {
            if (gt(t), t.lookahead < tt && F === b) return a;
            if (t.lookahead === 0) break;
          }
          if (D = 0, t.lookahead >= B && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = B - 1, D !== 0 && t.prev_length < t.max_lazy_match && t.strstart - D <= t.w_size - tt && (t.match_length = q(t, D), t.match_length <= 5 && (t.strategy === 1 || t.match_length === B && 4096 < t.strstart - t.match_start) && (t.match_length = B - 1)), t.prev_length >= B && t.match_length <= t.prev_length) {
            for (p = t.strstart + t.lookahead - B, v = i._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - B), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= p && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + B - 1]) & t.hash_mask, D = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = B - 1, t.strstart++, v && (I(t, !1), t.strm.avail_out === 0)) return a;
          } else if (t.match_available) {
            if ((v = i._tr_tally(t, 0, t.window[t.strstart - 1])) && I(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return a;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (v = i._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < B - 1 ? t.strstart : B - 1, F === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : H) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? a : N;
      }
      function ft(t, F, D, v, p) {
        this.good_length = t, this.max_lazy = F, this.nice_length = D, this.max_chain = v, this.func = p;
      }
      function _t() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * P), this.dyn_dtree = new s.Buf16(2 * (2 * z + 1)), this.bl_tree = new s.Buf16(2 * (2 * j + 1)), at(this.dyn_ltree), at(this.dyn_dtree), at(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(M + 1), this.heap = new s.Buf16(2 * R + 1), at(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * R + 1), at(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function mt(t) {
        var F;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = f, (F = t.state).pending = 0, F.pending_out = 0, F.wrap < 0 && (F.wrap = -F.wrap), F.status = F.wrap ? x : L, t.adler = F.wrap === 2 ? 0 : 1, F.last_flush = b, i._tr_init(F), c) : st(t, w);
      }
      function ot(t) {
        var F = mt(t);
        return F === c && function(D) {
          D.window_size = 2 * D.w_size, at(D.head), D.max_lazy_match = n[D.level].max_lazy, D.good_match = n[D.level].good_length, D.nice_match = n[D.level].nice_length, D.max_chain_length = n[D.level].max_chain, D.strstart = 0, D.block_start = 0, D.lookahead = 0, D.insert = 0, D.match_length = D.prev_length = B - 1, D.match_available = 0, D.ins_h = 0;
        }(t.state), F;
      }
      function Ct(t, F, D, v, p, C) {
        if (!t) return w;
        var $ = 1;
        if (F === o && (F = 6), v < 0 ? ($ = 0, v = -v) : 15 < v && ($ = 2, v -= 16), p < 1 || S < p || D !== g || v < 8 || 15 < v || F < 0 || 9 < F || C < 0 || m < C) return st(t, w);
        v === 8 && (v = 9);
        var W = new _t();
        return (t.state = W).strm = t, W.wrap = $, W.gzhead = null, W.w_bits = v, W.w_size = 1 << W.w_bits, W.w_mask = W.w_size - 1, W.hash_bits = p + 7, W.hash_size = 1 << W.hash_bits, W.hash_mask = W.hash_size - 1, W.hash_shift = ~~((W.hash_bits + B - 1) / B), W.window = new s.Buf8(2 * W.w_size), W.head = new s.Buf16(W.hash_size), W.prev = new s.Buf16(W.w_size), W.lit_bufsize = 1 << p + 6, W.pending_buf_size = 4 * W.lit_bufsize, W.pending_buf = new s.Buf8(W.pending_buf_size), W.d_buf = 1 * W.lit_bufsize, W.l_buf = 3 * W.lit_bufsize, W.level = F, W.strategy = C, W.method = D, ot(t);
      }
      n = [new ft(0, 0, 0, 0, function(t, F) {
        var D = 65535;
        for (D > t.pending_buf_size - 5 && (D = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (gt(t), t.lookahead === 0 && F === b) return a;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var v = t.block_start + D;
          if ((t.strstart === 0 || t.strstart >= v) && (t.lookahead = t.strstart - v, t.strstart = v, I(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - tt && (I(t, !1), t.strm.avail_out === 0)) return a;
        }
        return t.insert = 0, F === y ? (I(t, !0), t.strm.avail_out === 0 ? nt : H) : (t.strstart > t.block_start && (I(t, !1), t.strm.avail_out), a);
      }), new ft(4, 4, 8, 4, bt), new ft(4, 5, 16, 8, bt), new ft(4, 6, 32, 32, bt), new ft(4, 4, 16, 16, ut), new ft(8, 16, 32, 32, ut), new ft(8, 16, 128, 128, ut), new ft(8, 32, 128, 256, ut), new ft(32, 128, 258, 1024, ut), new ft(32, 258, 258, 4096, ut)], u.deflateInit = function(t, F) {
        return Ct(t, F, g, 15, 8, 0);
      }, u.deflateInit2 = Ct, u.deflateReset = ot, u.deflateResetKeep = mt, u.deflateSetHeader = function(t, F) {
        return t && t.state ? t.state.wrap !== 2 ? w : (t.state.gzhead = F, c) : w;
      }, u.deflate = function(t, F) {
        var D, v, p, C;
        if (!t || !t.state || 5 < F || F < 0) return t ? st(t, w) : w;
        if (v = t.state, !t.output || !t.input && t.avail_in !== 0 || v.status === 666 && F !== y) return st(t, t.avail_out === 0 ? -5 : w);
        if (v.strm = t, D = v.last_flush, v.last_flush = F, v.status === x) if (v.wrap === 2) t.adler = 0, rt(v, 31), rt(v, 139), rt(v, 8), v.gzhead ? (rt(v, (v.gzhead.text ? 1 : 0) + (v.gzhead.hcrc ? 2 : 0) + (v.gzhead.extra ? 4 : 0) + (v.gzhead.name ? 8 : 0) + (v.gzhead.comment ? 16 : 0)), rt(v, 255 & v.gzhead.time), rt(v, v.gzhead.time >> 8 & 255), rt(v, v.gzhead.time >> 16 & 255), rt(v, v.gzhead.time >> 24 & 255), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 255 & v.gzhead.os), v.gzhead.extra && v.gzhead.extra.length && (rt(v, 255 & v.gzhead.extra.length), rt(v, v.gzhead.extra.length >> 8 & 255)), v.gzhead.hcrc && (t.adler = _(t.adler, v.pending_buf, v.pending, 0)), v.gzindex = 0, v.status = 69) : (rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, 0), rt(v, v.level === 9 ? 2 : 2 <= v.strategy || v.level < 2 ? 4 : 0), rt(v, 3), v.status = L);
        else {
          var $ = g + (v.w_bits - 8 << 4) << 8;
          $ |= (2 <= v.strategy || v.level < 2 ? 0 : v.level < 6 ? 1 : v.level === 6 ? 2 : 3) << 6, v.strstart !== 0 && ($ |= 32), $ += 31 - $ % 31, v.status = L, J(v, $), v.strstart !== 0 && (J(v, t.adler >>> 16), J(v, 65535 & t.adler)), t.adler = 1;
        }
        if (v.status === 69) if (v.gzhead.extra) {
          for (p = v.pending; v.gzindex < (65535 & v.gzhead.extra.length) && (v.pending !== v.pending_buf_size || (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), O(t), p = v.pending, v.pending !== v.pending_buf_size)); ) rt(v, 255 & v.gzhead.extra[v.gzindex]), v.gzindex++;
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), v.gzindex === v.gzhead.extra.length && (v.gzindex = 0, v.status = 73);
        } else v.status = 73;
        if (v.status === 73) if (v.gzhead.name) {
          p = v.pending;
          do {
            if (v.pending === v.pending_buf_size && (v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), O(t), p = v.pending, v.pending === v.pending_buf_size)) {
              C = 1;
              break;
            }
            C = v.gzindex < v.gzhead.name.length ? 255 & v.gzhead.name.charCodeAt(v.gzindex++) : 0, rt(v, C);
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
            C = v.gzindex < v.gzhead.comment.length ? 255 & v.gzhead.comment.charCodeAt(v.gzindex++) : 0, rt(v, C);
          } while (C !== 0);
          v.gzhead.hcrc && v.pending > p && (t.adler = _(t.adler, v.pending_buf, v.pending - p, p)), C === 0 && (v.status = 103);
        } else v.status = 103;
        if (v.status === 103 && (v.gzhead.hcrc ? (v.pending + 2 > v.pending_buf_size && O(t), v.pending + 2 <= v.pending_buf_size && (rt(v, 255 & t.adler), rt(v, t.adler >> 8 & 255), t.adler = 0, v.status = L)) : v.status = L), v.pending !== 0) {
          if (O(t), t.avail_out === 0) return v.last_flush = -1, c;
        } else if (t.avail_in === 0 && G(F) <= G(D) && F !== y) return st(t, -5);
        if (v.status === 666 && t.avail_in !== 0) return st(t, -5);
        if (t.avail_in !== 0 || v.lookahead !== 0 || F !== b && v.status !== 666) {
          var W = v.strategy === 2 ? function(T, Y) {
            for (var Q; ; ) {
              if (T.lookahead === 0 && (gt(T), T.lookahead === 0)) {
                if (Y === b) return a;
                break;
              }
              if (T.match_length = 0, Q = i._tr_tally(T, 0, T.window[T.strstart]), T.lookahead--, T.strstart++, Q && (I(T, !1), T.strm.avail_out === 0)) return a;
            }
            return T.insert = 0, Y === y ? (I(T, !0), T.strm.avail_out === 0 ? nt : H) : T.last_lit && (I(T, !1), T.strm.avail_out === 0) ? a : N;
          }(v, F) : v.strategy === 3 ? function(T, Y) {
            for (var Q, K, it, vt, ht = T.window; ; ) {
              if (T.lookahead <= X) {
                if (gt(T), T.lookahead <= X && Y === b) return a;
                if (T.lookahead === 0) break;
              }
              if (T.match_length = 0, T.lookahead >= B && 0 < T.strstart && (K = ht[it = T.strstart - 1]) === ht[++it] && K === ht[++it] && K === ht[++it]) {
                vt = T.strstart + X;
                do
                  ;
                while (K === ht[++it] && K === ht[++it] && K === ht[++it] && K === ht[++it] && K === ht[++it] && K === ht[++it] && K === ht[++it] && K === ht[++it] && it < vt);
                T.match_length = X - (vt - it), T.match_length > T.lookahead && (T.match_length = T.lookahead);
              }
              if (T.match_length >= B ? (Q = i._tr_tally(T, 1, T.match_length - B), T.lookahead -= T.match_length, T.strstart += T.match_length, T.match_length = 0) : (Q = i._tr_tally(T, 0, T.window[T.strstart]), T.lookahead--, T.strstart++), Q && (I(T, !1), T.strm.avail_out === 0)) return a;
            }
            return T.insert = 0, Y === y ? (I(T, !0), T.strm.avail_out === 0 ? nt : H) : T.last_lit && (I(T, !1), T.strm.avail_out === 0) ? a : N;
          }(v, F) : n[v.level].func(v, F);
          if (W !== nt && W !== H || (v.status = 666), W === a || W === nt) return t.avail_out === 0 && (v.last_flush = -1), c;
          if (W === N && (F === 1 ? i._tr_align(v) : F !== 5 && (i._tr_stored_block(v, 0, 0, !1), F === 3 && (at(v.head), v.lookahead === 0 && (v.strstart = 0, v.block_start = 0, v.insert = 0))), O(t), t.avail_out === 0)) return v.last_flush = -1, c;
        }
        return F !== y ? c : v.wrap <= 0 ? 1 : (v.wrap === 2 ? (rt(v, 255 & t.adler), rt(v, t.adler >> 8 & 255), rt(v, t.adler >> 16 & 255), rt(v, t.adler >> 24 & 255), rt(v, 255 & t.total_in), rt(v, t.total_in >> 8 & 255), rt(v, t.total_in >> 16 & 255), rt(v, t.total_in >> 24 & 255)) : (J(v, t.adler >>> 16), J(v, 65535 & t.adler)), O(t), 0 < v.wrap && (v.wrap = -v.wrap), v.pending !== 0 ? c : 1);
      }, u.deflateEnd = function(t) {
        var F;
        return t && t.state ? (F = t.state.status) !== x && F !== 69 && F !== 73 && F !== 91 && F !== 103 && F !== L && F !== 666 ? st(t, w) : (t.state = null, F === L ? st(t, -3) : c) : w;
      }, u.deflateSetDictionary = function(t, F) {
        var D, v, p, C, $, W, T, Y, Q = F.length;
        if (!t || !t.state || (C = (D = t.state).wrap) === 2 || C === 1 && D.status !== x || D.lookahead) return w;
        for (C === 1 && (t.adler = d(t.adler, F, Q, 0)), D.wrap = 0, Q >= D.w_size && (C === 0 && (at(D.head), D.strstart = 0, D.block_start = 0, D.insert = 0), Y = new s.Buf8(D.w_size), s.arraySet(Y, F, Q - D.w_size, D.w_size, 0), F = Y, Q = D.w_size), $ = t.avail_in, W = t.next_in, T = t.input, t.avail_in = Q, t.next_in = 0, t.input = F, gt(D); D.lookahead >= B; ) {
          for (v = D.strstart, p = D.lookahead - (B - 1); D.ins_h = (D.ins_h << D.hash_shift ^ D.window[v + B - 1]) & D.hash_mask, D.prev[v & D.w_mask] = D.head[D.ins_h], D.head[D.ins_h] = v, v++, --p; ) ;
          D.strstart = v, D.lookahead = B - 1, gt(D);
        }
        return D.strstart += D.lookahead, D.block_start = D.strstart, D.insert = D.lookahead, D.lookahead = 0, D.match_length = D.prev_length = B - 1, D.match_available = 0, t.next_in = W, t.input = T, t.avail_in = $, D.wrap = C, c;
      }, u.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, h, u) {
      h.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(r, h, u) {
      h.exports = function(n, s) {
        var i, d, _, E, b, y, c, w, o, m, f, g, S, R, z, j, P, M, B, X, tt, x, L, a, N;
        i = n.state, d = n.next_in, a = n.input, _ = d + (n.avail_in - 5), E = n.next_out, N = n.output, b = E - (s - n.avail_out), y = E + (n.avail_out - 257), c = i.dmax, w = i.wsize, o = i.whave, m = i.wnext, f = i.window, g = i.hold, S = i.bits, R = i.lencode, z = i.distcode, j = (1 << i.lenbits) - 1, P = (1 << i.distbits) - 1;
        t: do {
          S < 15 && (g += a[d++] << S, S += 8, g += a[d++] << S, S += 8), M = R[g & j];
          e: for (; ; ) {
            if (g >>>= B = M >>> 24, S -= B, (B = M >>> 16 & 255) === 0) N[E++] = 65535 & M;
            else {
              if (!(16 & B)) {
                if (!(64 & B)) {
                  M = R[(65535 & M) + (g & (1 << B) - 1)];
                  continue e;
                }
                if (32 & B) {
                  i.mode = 12;
                  break t;
                }
                n.msg = "invalid literal/length code", i.mode = 30;
                break t;
              }
              X = 65535 & M, (B &= 15) && (S < B && (g += a[d++] << S, S += 8), X += g & (1 << B) - 1, g >>>= B, S -= B), S < 15 && (g += a[d++] << S, S += 8, g += a[d++] << S, S += 8), M = z[g & P];
              n: for (; ; ) {
                if (g >>>= B = M >>> 24, S -= B, !(16 & (B = M >>> 16 & 255))) {
                  if (!(64 & B)) {
                    M = z[(65535 & M) + (g & (1 << B) - 1)];
                    continue n;
                  }
                  n.msg = "invalid distance code", i.mode = 30;
                  break t;
                }
                if (tt = 65535 & M, S < (B &= 15) && (g += a[d++] << S, (S += 8) < B && (g += a[d++] << S, S += 8)), c < (tt += g & (1 << B) - 1)) {
                  n.msg = "invalid distance too far back", i.mode = 30;
                  break t;
                }
                if (g >>>= B, S -= B, (B = E - b) < tt) {
                  if (o < (B = tt - B) && i.sane) {
                    n.msg = "invalid distance too far back", i.mode = 30;
                    break t;
                  }
                  if (L = f, (x = 0) === m) {
                    if (x += w - B, B < X) {
                      for (X -= B; N[E++] = f[x++], --B; ) ;
                      x = E - tt, L = N;
                    }
                  } else if (m < B) {
                    if (x += w + m - B, (B -= m) < X) {
                      for (X -= B; N[E++] = f[x++], --B; ) ;
                      if (x = 0, m < X) {
                        for (X -= B = m; N[E++] = f[x++], --B; ) ;
                        x = E - tt, L = N;
                      }
                    }
                  } else if (x += m - B, B < X) {
                    for (X -= B; N[E++] = f[x++], --B; ) ;
                    x = E - tt, L = N;
                  }
                  for (; 2 < X; ) N[E++] = L[x++], N[E++] = L[x++], N[E++] = L[x++], X -= 3;
                  X && (N[E++] = L[x++], 1 < X && (N[E++] = L[x++]));
                } else {
                  for (x = E - tt; N[E++] = N[x++], N[E++] = N[x++], N[E++] = N[x++], 2 < (X -= 3); ) ;
                  X && (N[E++] = N[x++], 1 < X && (N[E++] = N[x++]));
                }
                break;
              }
            }
            break;
          }
        } while (d < _ && E < y);
        d -= X = S >> 3, g &= (1 << (S -= X << 3)) - 1, n.next_in = d, n.next_out = E, n.avail_in = d < _ ? _ - d + 5 : 5 - (d - _), n.avail_out = E < y ? y - E + 257 : 257 - (E - y), i.hold = g, i.bits = S;
      };
    }, {}], 49: [function(r, h, u) {
      var n = r("../utils/common"), s = r("./adler32"), i = r("./crc32"), d = r("./inffast"), _ = r("./inftrees"), E = 1, b = 2, y = 0, c = -2, w = 1, o = 852, m = 592;
      function f(x) {
        return (x >>> 24 & 255) + (x >>> 8 & 65280) + ((65280 & x) << 8) + ((255 & x) << 24);
      }
      function g() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function S(x) {
        var L;
        return x && x.state ? (L = x.state, x.total_in = x.total_out = L.total = 0, x.msg = "", L.wrap && (x.adler = 1 & L.wrap), L.mode = w, L.last = 0, L.havedict = 0, L.dmax = 32768, L.head = null, L.hold = 0, L.bits = 0, L.lencode = L.lendyn = new n.Buf32(o), L.distcode = L.distdyn = new n.Buf32(m), L.sane = 1, L.back = -1, y) : c;
      }
      function R(x) {
        var L;
        return x && x.state ? ((L = x.state).wsize = 0, L.whave = 0, L.wnext = 0, S(x)) : c;
      }
      function z(x, L) {
        var a, N;
        return x && x.state ? (N = x.state, L < 0 ? (a = 0, L = -L) : (a = 1 + (L >> 4), L < 48 && (L &= 15)), L && (L < 8 || 15 < L) ? c : (N.window !== null && N.wbits !== L && (N.window = null), N.wrap = a, N.wbits = L, R(x))) : c;
      }
      function j(x, L) {
        var a, N;
        return x ? (N = new g(), (x.state = N).window = null, (a = z(x, L)) !== y && (x.state = null), a) : c;
      }
      var P, M, B = !0;
      function X(x) {
        if (B) {
          var L;
          for (P = new n.Buf32(512), M = new n.Buf32(32), L = 0; L < 144; ) x.lens[L++] = 8;
          for (; L < 256; ) x.lens[L++] = 9;
          for (; L < 280; ) x.lens[L++] = 7;
          for (; L < 288; ) x.lens[L++] = 8;
          for (_(E, x.lens, 0, 288, P, 0, x.work, { bits: 9 }), L = 0; L < 32; ) x.lens[L++] = 5;
          _(b, x.lens, 0, 32, M, 0, x.work, { bits: 5 }), B = !1;
        }
        x.lencode = P, x.lenbits = 9, x.distcode = M, x.distbits = 5;
      }
      function tt(x, L, a, N) {
        var nt, H = x.state;
        return H.window === null && (H.wsize = 1 << H.wbits, H.wnext = 0, H.whave = 0, H.window = new n.Buf8(H.wsize)), N >= H.wsize ? (n.arraySet(H.window, L, a - H.wsize, H.wsize, 0), H.wnext = 0, H.whave = H.wsize) : (N < (nt = H.wsize - H.wnext) && (nt = N), n.arraySet(H.window, L, a - N, nt, H.wnext), (N -= nt) ? (n.arraySet(H.window, L, a - N, N, 0), H.wnext = N, H.whave = H.wsize) : (H.wnext += nt, H.wnext === H.wsize && (H.wnext = 0), H.whave < H.wsize && (H.whave += nt))), 0;
      }
      u.inflateReset = R, u.inflateReset2 = z, u.inflateResetKeep = S, u.inflateInit = function(x) {
        return j(x, 15);
      }, u.inflateInit2 = j, u.inflate = function(x, L) {
        var a, N, nt, H, st, G, at, O, I, rt, J, q, gt, bt, ut, ft, _t, mt, ot, Ct, t, F, D, v, p = 0, C = new n.Buf8(4), $ = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!x || !x.state || !x.output || !x.input && x.avail_in !== 0) return c;
        (a = x.state).mode === 12 && (a.mode = 13), st = x.next_out, nt = x.output, at = x.avail_out, H = x.next_in, N = x.input, G = x.avail_in, O = a.hold, I = a.bits, rt = G, J = at, F = y;
        t: for (; ; ) switch (a.mode) {
          case w:
            if (a.wrap === 0) {
              a.mode = 13;
              break;
            }
            for (; I < 16; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if (2 & a.wrap && O === 35615) {
              C[a.check = 0] = 255 & O, C[1] = O >>> 8 & 255, a.check = i(a.check, C, 2, 0), I = O = 0, a.mode = 2;
              break;
            }
            if (a.flags = 0, a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & O) << 8) + (O >> 8)) % 31) {
              x.msg = "incorrect header check", a.mode = 30;
              break;
            }
            if ((15 & O) != 8) {
              x.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (I -= 4, t = 8 + (15 & (O >>>= 4)), a.wbits === 0) a.wbits = t;
            else if (t > a.wbits) {
              x.msg = "invalid window size", a.mode = 30;
              break;
            }
            a.dmax = 1 << t, x.adler = a.check = 1, a.mode = 512 & O ? 10 : 12, I = O = 0;
            break;
          case 2:
            for (; I < 16; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if (a.flags = O, (255 & a.flags) != 8) {
              x.msg = "unknown compression method", a.mode = 30;
              break;
            }
            if (57344 & a.flags) {
              x.msg = "unknown header flags set", a.mode = 30;
              break;
            }
            a.head && (a.head.text = O >> 8 & 1), 512 & a.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = O = 0, a.mode = 3;
          case 3:
            for (; I < 32; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            a.head && (a.head.time = O), 512 & a.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, C[2] = O >>> 16 & 255, C[3] = O >>> 24 & 255, a.check = i(a.check, C, 4, 0)), I = O = 0, a.mode = 4;
          case 4:
            for (; I < 16; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            a.head && (a.head.xflags = 255 & O, a.head.os = O >> 8), 512 & a.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = O = 0, a.mode = 5;
          case 5:
            if (1024 & a.flags) {
              for (; I < 16; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              a.length = O, a.head && (a.head.extra_len = O), 512 & a.flags && (C[0] = 255 & O, C[1] = O >>> 8 & 255, a.check = i(a.check, C, 2, 0)), I = O = 0;
            } else a.head && (a.head.extra = null);
            a.mode = 6;
          case 6:
            if (1024 & a.flags && (G < (q = a.length) && (q = G), q && (a.head && (t = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), n.arraySet(a.head.extra, N, H, q, t)), 512 & a.flags && (a.check = i(a.check, N, q, H)), G -= q, H += q, a.length -= q), a.length)) break t;
            a.length = 0, a.mode = 7;
          case 7:
            if (2048 & a.flags) {
              if (G === 0) break t;
              for (q = 0; t = N[H + q++], a.head && t && a.length < 65536 && (a.head.name += String.fromCharCode(t)), t && q < G; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, q, H)), G -= q, H += q, t) break t;
            } else a.head && (a.head.name = null);
            a.length = 0, a.mode = 8;
          case 8:
            if (4096 & a.flags) {
              if (G === 0) break t;
              for (q = 0; t = N[H + q++], a.head && t && a.length < 65536 && (a.head.comment += String.fromCharCode(t)), t && q < G; ) ;
              if (512 & a.flags && (a.check = i(a.check, N, q, H)), G -= q, H += q, t) break t;
            } else a.head && (a.head.comment = null);
            a.mode = 9;
          case 9:
            if (512 & a.flags) {
              for (; I < 16; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              if (O !== (65535 & a.check)) {
                x.msg = "header crc mismatch", a.mode = 30;
                break;
              }
              I = O = 0;
            }
            a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0), x.adler = a.check = 0, a.mode = 12;
            break;
          case 10:
            for (; I < 32; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            x.adler = a.check = f(O), I = O = 0, a.mode = 11;
          case 11:
            if (a.havedict === 0) return x.next_out = st, x.avail_out = at, x.next_in = H, x.avail_in = G, a.hold = O, a.bits = I, 2;
            x.adler = a.check = 1, a.mode = 12;
          case 12:
            if (L === 5 || L === 6) break t;
          case 13:
            if (a.last) {
              O >>>= 7 & I, I -= 7 & I, a.mode = 27;
              break;
            }
            for (; I < 3; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            switch (a.last = 1 & O, I -= 1, 3 & (O >>>= 1)) {
              case 0:
                a.mode = 14;
                break;
              case 1:
                if (X(a), a.mode = 20, L !== 6) break;
                O >>>= 2, I -= 2;
                break t;
              case 2:
                a.mode = 17;
                break;
              case 3:
                x.msg = "invalid block type", a.mode = 30;
            }
            O >>>= 2, I -= 2;
            break;
          case 14:
            for (O >>>= 7 & I, I -= 7 & I; I < 32; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if ((65535 & O) != (O >>> 16 ^ 65535)) {
              x.msg = "invalid stored block lengths", a.mode = 30;
              break;
            }
            if (a.length = 65535 & O, I = O = 0, a.mode = 15, L === 6) break t;
          case 15:
            a.mode = 16;
          case 16:
            if (q = a.length) {
              if (G < q && (q = G), at < q && (q = at), q === 0) break t;
              n.arraySet(nt, N, H, q, st), G -= q, H += q, at -= q, st += q, a.length -= q;
              break;
            }
            a.mode = 12;
            break;
          case 17:
            for (; I < 14; ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if (a.nlen = 257 + (31 & O), O >>>= 5, I -= 5, a.ndist = 1 + (31 & O), O >>>= 5, I -= 5, a.ncode = 4 + (15 & O), O >>>= 4, I -= 4, 286 < a.nlen || 30 < a.ndist) {
              x.msg = "too many length or distance symbols", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 18;
          case 18:
            for (; a.have < a.ncode; ) {
              for (; I < 3; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              a.lens[$[a.have++]] = 7 & O, O >>>= 3, I -= 3;
            }
            for (; a.have < 19; ) a.lens[$[a.have++]] = 0;
            if (a.lencode = a.lendyn, a.lenbits = 7, D = { bits: a.lenbits }, F = _(0, a.lens, 0, 19, a.lencode, 0, a.work, D), a.lenbits = D.bits, F) {
              x.msg = "invalid code lengths set", a.mode = 30;
              break;
            }
            a.have = 0, a.mode = 19;
          case 19:
            for (; a.have < a.nlen + a.ndist; ) {
              for (; ft = (p = a.lencode[O & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ut = p >>> 24) <= I); ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              if (_t < 16) O >>>= ut, I -= ut, a.lens[a.have++] = _t;
              else {
                if (_t === 16) {
                  for (v = ut + 2; I < v; ) {
                    if (G === 0) break t;
                    G--, O += N[H++] << I, I += 8;
                  }
                  if (O >>>= ut, I -= ut, a.have === 0) {
                    x.msg = "invalid bit length repeat", a.mode = 30;
                    break;
                  }
                  t = a.lens[a.have - 1], q = 3 + (3 & O), O >>>= 2, I -= 2;
                } else if (_t === 17) {
                  for (v = ut + 3; I < v; ) {
                    if (G === 0) break t;
                    G--, O += N[H++] << I, I += 8;
                  }
                  I -= ut, t = 0, q = 3 + (7 & (O >>>= ut)), O >>>= 3, I -= 3;
                } else {
                  for (v = ut + 7; I < v; ) {
                    if (G === 0) break t;
                    G--, O += N[H++] << I, I += 8;
                  }
                  I -= ut, t = 0, q = 11 + (127 & (O >>>= ut)), O >>>= 7, I -= 7;
                }
                if (a.have + q > a.nlen + a.ndist) {
                  x.msg = "invalid bit length repeat", a.mode = 30;
                  break;
                }
                for (; q--; ) a.lens[a.have++] = t;
              }
            }
            if (a.mode === 30) break;
            if (a.lens[256] === 0) {
              x.msg = "invalid code -- missing end-of-block", a.mode = 30;
              break;
            }
            if (a.lenbits = 9, D = { bits: a.lenbits }, F = _(E, a.lens, 0, a.nlen, a.lencode, 0, a.work, D), a.lenbits = D.bits, F) {
              x.msg = "invalid literal/lengths set", a.mode = 30;
              break;
            }
            if (a.distbits = 6, a.distcode = a.distdyn, D = { bits: a.distbits }, F = _(b, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, D), a.distbits = D.bits, F) {
              x.msg = "invalid distances set", a.mode = 30;
              break;
            }
            if (a.mode = 20, L === 6) break t;
          case 20:
            a.mode = 21;
          case 21:
            if (6 <= G && 258 <= at) {
              x.next_out = st, x.avail_out = at, x.next_in = H, x.avail_in = G, a.hold = O, a.bits = I, d(x, J), st = x.next_out, nt = x.output, at = x.avail_out, H = x.next_in, N = x.input, G = x.avail_in, O = a.hold, I = a.bits, a.mode === 12 && (a.back = -1);
              break;
            }
            for (a.back = 0; ft = (p = a.lencode[O & (1 << a.lenbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ut = p >>> 24) <= I); ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if (ft && !(240 & ft)) {
              for (mt = ut, ot = ft, Ct = _t; ft = (p = a.lencode[Ct + ((O & (1 << mt + ot) - 1) >> mt)]) >>> 16 & 255, _t = 65535 & p, !(mt + (ut = p >>> 24) <= I); ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              O >>>= mt, I -= mt, a.back += mt;
            }
            if (O >>>= ut, I -= ut, a.back += ut, a.length = _t, ft === 0) {
              a.mode = 26;
              break;
            }
            if (32 & ft) {
              a.back = -1, a.mode = 12;
              break;
            }
            if (64 & ft) {
              x.msg = "invalid literal/length code", a.mode = 30;
              break;
            }
            a.extra = 15 & ft, a.mode = 22;
          case 22:
            if (a.extra) {
              for (v = a.extra; I < v; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              a.length += O & (1 << a.extra) - 1, O >>>= a.extra, I -= a.extra, a.back += a.extra;
            }
            a.was = a.length, a.mode = 23;
          case 23:
            for (; ft = (p = a.distcode[O & (1 << a.distbits) - 1]) >>> 16 & 255, _t = 65535 & p, !((ut = p >>> 24) <= I); ) {
              if (G === 0) break t;
              G--, O += N[H++] << I, I += 8;
            }
            if (!(240 & ft)) {
              for (mt = ut, ot = ft, Ct = _t; ft = (p = a.distcode[Ct + ((O & (1 << mt + ot) - 1) >> mt)]) >>> 16 & 255, _t = 65535 & p, !(mt + (ut = p >>> 24) <= I); ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              O >>>= mt, I -= mt, a.back += mt;
            }
            if (O >>>= ut, I -= ut, a.back += ut, 64 & ft) {
              x.msg = "invalid distance code", a.mode = 30;
              break;
            }
            a.offset = _t, a.extra = 15 & ft, a.mode = 24;
          case 24:
            if (a.extra) {
              for (v = a.extra; I < v; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              a.offset += O & (1 << a.extra) - 1, O >>>= a.extra, I -= a.extra, a.back += a.extra;
            }
            if (a.offset > a.dmax) {
              x.msg = "invalid distance too far back", a.mode = 30;
              break;
            }
            a.mode = 25;
          case 25:
            if (at === 0) break t;
            if (q = J - at, a.offset > q) {
              if ((q = a.offset - q) > a.whave && a.sane) {
                x.msg = "invalid distance too far back", a.mode = 30;
                break;
              }
              gt = q > a.wnext ? (q -= a.wnext, a.wsize - q) : a.wnext - q, q > a.length && (q = a.length), bt = a.window;
            } else bt = nt, gt = st - a.offset, q = a.length;
            for (at < q && (q = at), at -= q, a.length -= q; nt[st++] = bt[gt++], --q; ) ;
            a.length === 0 && (a.mode = 21);
            break;
          case 26:
            if (at === 0) break t;
            nt[st++] = a.length, at--, a.mode = 21;
            break;
          case 27:
            if (a.wrap) {
              for (; I < 32; ) {
                if (G === 0) break t;
                G--, O |= N[H++] << I, I += 8;
              }
              if (J -= at, x.total_out += J, a.total += J, J && (x.adler = a.check = a.flags ? i(a.check, nt, J, st - J) : s(a.check, nt, J, st - J)), J = at, (a.flags ? O : f(O)) !== a.check) {
                x.msg = "incorrect data check", a.mode = 30;
                break;
              }
              I = O = 0;
            }
            a.mode = 28;
          case 28:
            if (a.wrap && a.flags) {
              for (; I < 32; ) {
                if (G === 0) break t;
                G--, O += N[H++] << I, I += 8;
              }
              if (O !== (4294967295 & a.total)) {
                x.msg = "incorrect length check", a.mode = 30;
                break;
              }
              I = O = 0;
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
            return c;
        }
        return x.next_out = st, x.avail_out = at, x.next_in = H, x.avail_in = G, a.hold = O, a.bits = I, (a.wsize || J !== x.avail_out && a.mode < 30 && (a.mode < 27 || L !== 4)) && tt(x, x.output, x.next_out, J - x.avail_out) ? (a.mode = 31, -4) : (rt -= x.avail_in, J -= x.avail_out, x.total_in += rt, x.total_out += J, a.total += J, a.wrap && J && (x.adler = a.check = a.flags ? i(a.check, nt, J, x.next_out - J) : s(a.check, nt, J, x.next_out - J)), x.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === 12 ? 128 : 0) + (a.mode === 20 || a.mode === 15 ? 256 : 0), (rt == 0 && J === 0 || L === 4) && F === y && (F = -5), F);
      }, u.inflateEnd = function(x) {
        if (!x || !x.state) return c;
        var L = x.state;
        return L.window && (L.window = null), x.state = null, y;
      }, u.inflateGetHeader = function(x, L) {
        var a;
        return x && x.state && 2 & (a = x.state).wrap ? ((a.head = L).done = !1, y) : c;
      }, u.inflateSetDictionary = function(x, L) {
        var a, N = L.length;
        return x && x.state ? (a = x.state).wrap !== 0 && a.mode !== 11 ? c : a.mode === 11 && s(1, L, N, 0) !== a.check ? -3 : tt(x, L, N, N) ? (a.mode = 31, -4) : (a.havedict = 1, y) : c;
      }, u.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, h, u) {
      var n = r("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], d = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      h.exports = function(E, b, y, c, w, o, m, f) {
        var g, S, R, z, j, P, M, B, X, tt = f.bits, x = 0, L = 0, a = 0, N = 0, nt = 0, H = 0, st = 0, G = 0, at = 0, O = 0, I = null, rt = 0, J = new n.Buf16(16), q = new n.Buf16(16), gt = null, bt = 0;
        for (x = 0; x <= 15; x++) J[x] = 0;
        for (L = 0; L < c; L++) J[b[y + L]]++;
        for (nt = tt, N = 15; 1 <= N && J[N] === 0; N--) ;
        if (N < nt && (nt = N), N === 0) return w[o++] = 20971520, w[o++] = 20971520, f.bits = 1, 0;
        for (a = 1; a < N && J[a] === 0; a++) ;
        for (nt < a && (nt = a), x = G = 1; x <= 15; x++) if (G <<= 1, (G -= J[x]) < 0) return -1;
        if (0 < G && (E === 0 || N !== 1)) return -1;
        for (q[1] = 0, x = 1; x < 15; x++) q[x + 1] = q[x] + J[x];
        for (L = 0; L < c; L++) b[y + L] !== 0 && (m[q[b[y + L]]++] = L);
        if (P = E === 0 ? (I = gt = m, 19) : E === 1 ? (I = s, rt -= 257, gt = i, bt -= 257, 256) : (I = d, gt = _, -1), x = a, j = o, st = L = O = 0, R = -1, z = (at = 1 << (H = nt)) - 1, E === 1 && 852 < at || E === 2 && 592 < at) return 1;
        for (; ; ) {
          for (M = x - st, X = m[L] < P ? (B = 0, m[L]) : m[L] > P ? (B = gt[bt + m[L]], I[rt + m[L]]) : (B = 96, 0), g = 1 << x - st, a = S = 1 << H; w[j + (O >> st) + (S -= g)] = M << 24 | B << 16 | X | 0, S !== 0; ) ;
          for (g = 1 << x - 1; O & g; ) g >>= 1;
          if (g !== 0 ? (O &= g - 1, O += g) : O = 0, L++, --J[x] == 0) {
            if (x === N) break;
            x = b[y + m[L]];
          }
          if (nt < x && (O & z) !== R) {
            for (st === 0 && (st = nt), j += a, G = 1 << (H = x - st); H + st < N && !((G -= J[H + st]) <= 0); ) H++, G <<= 1;
            if (at += 1 << H, E === 1 && 852 < at || E === 2 && 592 < at) return 1;
            w[R = O & z] = nt << 24 | H << 16 | j - o | 0;
          }
        }
        return O !== 0 && (w[j + O] = x - st << 24 | 64 << 16 | 0), f.bits = nt, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(r, h, u) {
      h.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(r, h, u) {
      var n = r("../utils/common"), s = 0, i = 1;
      function d(p) {
        for (var C = p.length; 0 <= --C; ) p[C] = 0;
      }
      var _ = 0, E = 29, b = 256, y = b + 1 + E, c = 30, w = 19, o = 2 * y + 1, m = 15, f = 16, g = 7, S = 256, R = 16, z = 17, j = 18, P = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], M = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], X = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], tt = new Array(2 * (y + 2));
      d(tt);
      var x = new Array(2 * c);
      d(x);
      var L = new Array(512);
      d(L);
      var a = new Array(256);
      d(a);
      var N = new Array(E);
      d(N);
      var nt, H, st, G = new Array(c);
      function at(p, C, $, W, T) {
        this.static_tree = p, this.extra_bits = C, this.extra_base = $, this.elems = W, this.max_length = T, this.has_stree = p && p.length;
      }
      function O(p, C) {
        this.dyn_tree = p, this.max_code = 0, this.stat_desc = C;
      }
      function I(p) {
        return p < 256 ? L[p] : L[256 + (p >>> 7)];
      }
      function rt(p, C) {
        p.pending_buf[p.pending++] = 255 & C, p.pending_buf[p.pending++] = C >>> 8 & 255;
      }
      function J(p, C, $) {
        p.bi_valid > f - $ ? (p.bi_buf |= C << p.bi_valid & 65535, rt(p, p.bi_buf), p.bi_buf = C >> f - p.bi_valid, p.bi_valid += $ - f) : (p.bi_buf |= C << p.bi_valid & 65535, p.bi_valid += $);
      }
      function q(p, C, $) {
        J(p, $[2 * C], $[2 * C + 1]);
      }
      function gt(p, C) {
        for (var $ = 0; $ |= 1 & p, p >>>= 1, $ <<= 1, 0 < --C; ) ;
        return $ >>> 1;
      }
      function bt(p, C, $) {
        var W, T, Y = new Array(m + 1), Q = 0;
        for (W = 1; W <= m; W++) Y[W] = Q = Q + $[W - 1] << 1;
        for (T = 0; T <= C; T++) {
          var K = p[2 * T + 1];
          K !== 0 && (p[2 * T] = gt(Y[K]++, K));
        }
      }
      function ut(p) {
        var C;
        for (C = 0; C < y; C++) p.dyn_ltree[2 * C] = 0;
        for (C = 0; C < c; C++) p.dyn_dtree[2 * C] = 0;
        for (C = 0; C < w; C++) p.bl_tree[2 * C] = 0;
        p.dyn_ltree[2 * S] = 1, p.opt_len = p.static_len = 0, p.last_lit = p.matches = 0;
      }
      function ft(p) {
        8 < p.bi_valid ? rt(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf), p.bi_buf = 0, p.bi_valid = 0;
      }
      function _t(p, C, $, W) {
        var T = 2 * C, Y = 2 * $;
        return p[T] < p[Y] || p[T] === p[Y] && W[C] <= W[$];
      }
      function mt(p, C, $) {
        for (var W = p.heap[$], T = $ << 1; T <= p.heap_len && (T < p.heap_len && _t(C, p.heap[T + 1], p.heap[T], p.depth) && T++, !_t(C, W, p.heap[T], p.depth)); ) p.heap[$] = p.heap[T], $ = T, T <<= 1;
        p.heap[$] = W;
      }
      function ot(p, C, $) {
        var W, T, Y, Q, K = 0;
        if (p.last_lit !== 0) for (; W = p.pending_buf[p.d_buf + 2 * K] << 8 | p.pending_buf[p.d_buf + 2 * K + 1], T = p.pending_buf[p.l_buf + K], K++, W === 0 ? q(p, T, C) : (q(p, (Y = a[T]) + b + 1, C), (Q = P[Y]) !== 0 && J(p, T -= N[Y], Q), q(p, Y = I(--W), $), (Q = M[Y]) !== 0 && J(p, W -= G[Y], Q)), K < p.last_lit; ) ;
        q(p, S, C);
      }
      function Ct(p, C) {
        var $, W, T, Y = C.dyn_tree, Q = C.stat_desc.static_tree, K = C.stat_desc.has_stree, it = C.stat_desc.elems, vt = -1;
        for (p.heap_len = 0, p.heap_max = o, $ = 0; $ < it; $++) Y[2 * $] !== 0 ? (p.heap[++p.heap_len] = vt = $, p.depth[$] = 0) : Y[2 * $ + 1] = 0;
        for (; p.heap_len < 2; ) Y[2 * (T = p.heap[++p.heap_len] = vt < 2 ? ++vt : 0)] = 1, p.depth[T] = 0, p.opt_len--, K && (p.static_len -= Q[2 * T + 1]);
        for (C.max_code = vt, $ = p.heap_len >> 1; 1 <= $; $--) mt(p, Y, $);
        for (T = it; $ = p.heap[1], p.heap[1] = p.heap[p.heap_len--], mt(p, Y, 1), W = p.heap[1], p.heap[--p.heap_max] = $, p.heap[--p.heap_max] = W, Y[2 * T] = Y[2 * $] + Y[2 * W], p.depth[T] = (p.depth[$] >= p.depth[W] ? p.depth[$] : p.depth[W]) + 1, Y[2 * $ + 1] = Y[2 * W + 1] = T, p.heap[1] = T++, mt(p, Y, 1), 2 <= p.heap_len; ) ;
        p.heap[--p.heap_max] = p.heap[1], function(ht, Rt) {
          var jt, It, $t, yt, Ft, Xt, Ot = Rt.dyn_tree, Qt = Rt.max_code, ce = Rt.stat_desc.static_tree, ee = Rt.stat_desc.has_stree, ne = Rt.stat_desc.extra_bits, te = Rt.stat_desc.extra_base, Ut = Rt.stat_desc.max_length, Yt = 0;
          for (yt = 0; yt <= m; yt++) ht.bl_count[yt] = 0;
          for (Ot[2 * ht.heap[ht.heap_max] + 1] = 0, jt = ht.heap_max + 1; jt < o; jt++) Ut < (yt = Ot[2 * Ot[2 * (It = ht.heap[jt]) + 1] + 1] + 1) && (yt = Ut, Yt++), Ot[2 * It + 1] = yt, Qt < It || (ht.bl_count[yt]++, Ft = 0, te <= It && (Ft = ne[It - te]), Xt = Ot[2 * It], ht.opt_len += Xt * (yt + Ft), ee && (ht.static_len += Xt * (ce[2 * It + 1] + Ft)));
          if (Yt !== 0) {
            do {
              for (yt = Ut - 1; ht.bl_count[yt] === 0; ) yt--;
              ht.bl_count[yt]--, ht.bl_count[yt + 1] += 2, ht.bl_count[Ut]--, Yt -= 2;
            } while (0 < Yt);
            for (yt = Ut; yt !== 0; yt--) for (It = ht.bl_count[yt]; It !== 0; ) Qt < ($t = ht.heap[--jt]) || (Ot[2 * $t + 1] !== yt && (ht.opt_len += (yt - Ot[2 * $t + 1]) * Ot[2 * $t], Ot[2 * $t + 1] = yt), It--);
          }
        }(p, C), bt(Y, vt, p.bl_count);
      }
      function t(p, C, $) {
        var W, T, Y = -1, Q = C[1], K = 0, it = 7, vt = 4;
        for (Q === 0 && (it = 138, vt = 3), C[2 * ($ + 1) + 1] = 65535, W = 0; W <= $; W++) T = Q, Q = C[2 * (W + 1) + 1], ++K < it && T === Q || (K < vt ? p.bl_tree[2 * T] += K : T !== 0 ? (T !== Y && p.bl_tree[2 * T]++, p.bl_tree[2 * R]++) : K <= 10 ? p.bl_tree[2 * z]++ : p.bl_tree[2 * j]++, Y = T, vt = (K = 0) === Q ? (it = 138, 3) : T === Q ? (it = 6, 3) : (it = 7, 4));
      }
      function F(p, C, $) {
        var W, T, Y = -1, Q = C[1], K = 0, it = 7, vt = 4;
        for (Q === 0 && (it = 138, vt = 3), W = 0; W <= $; W++) if (T = Q, Q = C[2 * (W + 1) + 1], !(++K < it && T === Q)) {
          if (K < vt) for (; q(p, T, p.bl_tree), --K != 0; ) ;
          else T !== 0 ? (T !== Y && (q(p, T, p.bl_tree), K--), q(p, R, p.bl_tree), J(p, K - 3, 2)) : K <= 10 ? (q(p, z, p.bl_tree), J(p, K - 3, 3)) : (q(p, j, p.bl_tree), J(p, K - 11, 7));
          Y = T, vt = (K = 0) === Q ? (it = 138, 3) : T === Q ? (it = 6, 3) : (it = 7, 4);
        }
      }
      d(G);
      var D = !1;
      function v(p, C, $, W) {
        J(p, (_ << 1) + (W ? 1 : 0), 3), function(T, Y, Q, K) {
          ft(T), rt(T, Q), rt(T, ~Q), n.arraySet(T.pending_buf, T.window, Y, Q, T.pending), T.pending += Q;
        }(p, C, $);
      }
      u._tr_init = function(p) {
        D || (function() {
          var C, $, W, T, Y, Q = new Array(m + 1);
          for (T = W = 0; T < E - 1; T++) for (N[T] = W, C = 0; C < 1 << P[T]; C++) a[W++] = T;
          for (a[W - 1] = T, T = Y = 0; T < 16; T++) for (G[T] = Y, C = 0; C < 1 << M[T]; C++) L[Y++] = T;
          for (Y >>= 7; T < c; T++) for (G[T] = Y << 7, C = 0; C < 1 << M[T] - 7; C++) L[256 + Y++] = T;
          for ($ = 0; $ <= m; $++) Q[$] = 0;
          for (C = 0; C <= 143; ) tt[2 * C + 1] = 8, C++, Q[8]++;
          for (; C <= 255; ) tt[2 * C + 1] = 9, C++, Q[9]++;
          for (; C <= 279; ) tt[2 * C + 1] = 7, C++, Q[7]++;
          for (; C <= 287; ) tt[2 * C + 1] = 8, C++, Q[8]++;
          for (bt(tt, y + 1, Q), C = 0; C < c; C++) x[2 * C + 1] = 5, x[2 * C] = gt(C, 5);
          nt = new at(tt, P, b + 1, y, m), H = new at(x, M, 0, c, m), st = new at(new Array(0), B, 0, w, g);
        }(), D = !0), p.l_desc = new O(p.dyn_ltree, nt), p.d_desc = new O(p.dyn_dtree, H), p.bl_desc = new O(p.bl_tree, st), p.bi_buf = 0, p.bi_valid = 0, ut(p);
      }, u._tr_stored_block = v, u._tr_flush_block = function(p, C, $, W) {
        var T, Y, Q = 0;
        0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(K) {
          var it, vt = 4093624447;
          for (it = 0; it <= 31; it++, vt >>>= 1) if (1 & vt && K.dyn_ltree[2 * it] !== 0) return s;
          if (K.dyn_ltree[18] !== 0 || K.dyn_ltree[20] !== 0 || K.dyn_ltree[26] !== 0) return i;
          for (it = 32; it < b; it++) if (K.dyn_ltree[2 * it] !== 0) return i;
          return s;
        }(p)), Ct(p, p.l_desc), Ct(p, p.d_desc), Q = function(K) {
          var it;
          for (t(K, K.dyn_ltree, K.l_desc.max_code), t(K, K.dyn_dtree, K.d_desc.max_code), Ct(K, K.bl_desc), it = w - 1; 3 <= it && K.bl_tree[2 * X[it] + 1] === 0; it--) ;
          return K.opt_len += 3 * (it + 1) + 5 + 5 + 4, it;
        }(p), T = p.opt_len + 3 + 7 >>> 3, (Y = p.static_len + 3 + 7 >>> 3) <= T && (T = Y)) : T = Y = $ + 5, $ + 4 <= T && C !== -1 ? v(p, C, $, W) : p.strategy === 4 || Y === T ? (J(p, 2 + (W ? 1 : 0), 3), ot(p, tt, x)) : (J(p, 4 + (W ? 1 : 0), 3), function(K, it, vt, ht) {
          var Rt;
          for (J(K, it - 257, 5), J(K, vt - 1, 5), J(K, ht - 4, 4), Rt = 0; Rt < ht; Rt++) J(K, K.bl_tree[2 * X[Rt] + 1], 3);
          F(K, K.dyn_ltree, it - 1), F(K, K.dyn_dtree, vt - 1);
        }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, Q + 1), ot(p, p.dyn_ltree, p.dyn_dtree)), ut(p), W && ft(p);
      }, u._tr_tally = function(p, C, $) {
        return p.pending_buf[p.d_buf + 2 * p.last_lit] = C >>> 8 & 255, p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & C, p.pending_buf[p.l_buf + p.last_lit] = 255 & $, p.last_lit++, C === 0 ? p.dyn_ltree[2 * $]++ : (p.matches++, C--, p.dyn_ltree[2 * (a[$] + b + 1)]++, p.dyn_dtree[2 * I(C)]++), p.last_lit === p.lit_bufsize - 1;
      }, u._tr_align = function(p) {
        J(p, 2, 3), q(p, S, tt), function(C) {
          C.bi_valid === 16 ? (rt(C, C.bi_buf), C.bi_buf = 0, C.bi_valid = 0) : 8 <= C.bi_valid && (C.pending_buf[C.pending++] = 255 & C.bi_buf, C.bi_buf >>= 8, C.bi_valid -= 8);
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
            var d, _, E, b, y = 1, c = {}, w = !1, o = s.document, m = Object.getPrototypeOf && Object.getPrototypeOf(s);
            m = m && m.setTimeout ? m : s, d = {}.toString.call(s.process) === "[object process]" ? function(R) {
              process.nextTick(function() {
                g(R);
              });
            } : function() {
              if (s.postMessage && !s.importScripts) {
                var R = !0, z = s.onmessage;
                return s.onmessage = function() {
                  R = !1;
                }, s.postMessage("", "*"), s.onmessage = z, R;
              }
            }() ? (b = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", S, !1) : s.attachEvent("onmessage", S), function(R) {
              s.postMessage(b + R, "*");
            }) : s.MessageChannel ? ((E = new MessageChannel()).port1.onmessage = function(R) {
              g(R.data);
            }, function(R) {
              E.port2.postMessage(R);
            }) : o && "onreadystatechange" in o.createElement("script") ? (_ = o.documentElement, function(R) {
              var z = o.createElement("script");
              z.onreadystatechange = function() {
                g(R), z.onreadystatechange = null, _.removeChild(z), z = null;
              }, _.appendChild(z);
            }) : function(R) {
              setTimeout(g, 0, R);
            }, m.setImmediate = function(R) {
              typeof R != "function" && (R = new Function("" + R));
              for (var z = new Array(arguments.length - 1), j = 0; j < z.length; j++) z[j] = arguments[j + 1];
              var P = { callback: R, args: z };
              return c[y] = P, d(y), y++;
            }, m.clearImmediate = f;
          }
          function f(R) {
            delete c[R];
          }
          function g(R) {
            if (w) setTimeout(g, 0, R);
            else {
              var z = c[R];
              if (z) {
                w = !0;
                try {
                  (function(j) {
                    var P = j.callback, M = j.args;
                    switch (M.length) {
                      case 0:
                        P();
                        break;
                      case 1:
                        P(M[0]);
                        break;
                      case 2:
                        P(M[0], M[1]);
                        break;
                      case 3:
                        P(M[0], M[1], M[2]);
                        break;
                      default:
                        P.apply(i, M);
                    }
                  })(z);
                } finally {
                  f(R), w = !1;
                }
              }
            }
          }
          function S(R) {
            R.source === s && typeof R.data == "string" && R.data.indexOf(b) === 0 && g(+R.data.slice(b.length));
          }
        })(typeof self > "u" ? n === void 0 ? this : n : self);
      }).call(this, typeof re < "u" ? re : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ge);
var Rn = Ge.exports;
const zn = /* @__PURE__ */ Cn(Rn);
function An(e = {}) {
  const {
    storageKey: l = "page-reviews",
    defaultPagePath: r = () => typeof window < "u" ? window.location.pathname + window.location.search : "/"
  } = e;
  function h() {
    return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  function u() {
    if (typeof window > "u") return [];
    try {
      const g = window.localStorage.getItem(l);
      return (g ? JSON.parse(g) : []).map(Tn);
    } catch {
      return [];
    }
  }
  function n(g) {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(l, JSON.stringify(g));
      } catch {
      }
  }
  const s = pt(u()), i = () => s.value;
  function d(g) {
    const S = g || r();
    return s.value.filter((R) => R.pagePath === S);
  }
  function _(g) {
    const S = {
      id: h(),
      ...g,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return s.value.unshift(S), n(s.value), S;
  }
  function E(g, S) {
    const R = s.value.findIndex((z) => z.id === g);
    R > -1 && (s.value[R] = { ...s.value[R], ...S }, n(s.value));
  }
  function b(g) {
    s.value = s.value.filter((S) => S.id !== g), n(s.value);
  }
  function y(g) {
    const S = g || r();
    s.value = s.value.filter((R) => R.pagePath !== S), n(s.value);
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
  function o() {
    pe(
      new Blob([JSON.stringify(w(), null, 2)], { type: "application/json" }),
      `page-reviews-${me()}.json`
    );
  }
  function m() {
    const g = Ue(w());
    pe(
      new Blob([g], { type: "text/markdown" }),
      `page-reviews-${me()}.md`
    );
  }
  async function f() {
    const g = new zn(), S = w(), R = {
      ...S,
      reviews: S.reviews.map((P) => {
        var M;
        return {
          ...P,
          screenshots: (M = P.screenshots) == null ? void 0 : M.map((B) => B.url ? { type: B.type, filename: B.filename, url: B.url } : { type: B.type, filename: B.filename, imagePath: `images/${B.filename}` })
        };
      })
    };
    g.file("review.json", JSON.stringify(R, null, 2)), g.file("review.md", Ue(R));
    const z = g.folder("images");
    for (const P of S.reviews)
      for (const M of P.screenshots || [])
        if (M.data && !M.url) {
          const B = M.data.replace(/^data:image\/png;base64,/, "");
          z.file(M.filename, B, { base64: !0 });
        }
    const j = await g.generateAsync({ type: "blob" });
    pe(j, `page-reviews-${me()}.zip`);
  }
  return {
    reviews: s,
    allReviews: i,
    getPageReviews: d,
    addReview: _,
    updateReview: E,
    deleteReview: b,
    clearPageReviews: y,
    clearAllReviews: c,
    exportToJSON: o,
    exportToMarkdown: m,
    exportToZIP: f
  };
}
function Tn(e) {
  if (!e || e.targets) return e;
  const l = e.type === "element" ? {
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
    targets: [l]
  };
}
function Ue(e) {
  const l = [
    "# 页面评审报告",
    "",
    `导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    `评审总数：${e.total}`,
    ""
  ], r = On(e.reviews, "pagePath");
  return Object.entries(r).forEach(([h, u]) => {
    l.push(`## 页面：${h}`), l.push(""), u.forEach((n, s) => {
      var d, _, E, b;
      l.push(`### ${s + 1}. ${n.title || "未命名评审"}`), l.push(`- **严重等级**：${In(n.severity)}`), l.push(`- **状态**：${n.status === "resolved" ? "已解决" : "待处理"}`), l.push(`- **窗口尺寸**：${(d = n.viewport) == null ? void 0 : d.width} × ${(_ = n.viewport) == null ? void 0 : _.height}`), n.scroll && l.push(`- **滚动位置**：x=${n.scroll.x}, y=${n.scroll.y}`);
      const i = n.targets || [];
      i.length > 0 && (l.push(`- **评审目标数**：${i.length}`), i.forEach((y, c) => {
        y.type === "element" && y.elementRect ? (l.push(`  - 目标 ${c + 1}（元素）：\`${y.selector}\` x=${y.elementRect.x}, y=${y.elementRect.y}, w=${y.elementRect.width}, h=${y.elementRect.height}`), y.elementText && l.push(`    文本：${y.elementText}`)) : y.viewportRect && l.push(`  - 目标 ${c + 1}（框选）：x=${y.viewportRect.x}, y=${y.viewportRect.y}, w=${y.viewportRect.width}, h=${y.viewportRect.height}`);
      })), l.push(`- **评审建议**：${n.suggestion}`), l.push(`- **创建时间**：${new Date(n.createdAt).toLocaleString()}`), n.locators && Object.keys(n.locators).length > 0 && (l.push(""), l.push("#### 定位信息"), n.locators.cssSelector && l.push(`- **CSS Selector**: \`${n.locators.cssSelector}\``), n.locators.xpath && l.push(`- **XPath**: \`${n.locators.xpath}\``), (E = n.locators.aria) != null && E.role && l.push(`- **ARIA Role**: ${n.locators.aria.role}`), (b = n.locators.aria) != null && b.accessibleName && l.push(`- **Accessible Name**: ${n.locators.aria.accessibleName}`), n.locators.testId && l.push(`- **data-testid**: ${n.locators.testId}`)), n.screenshots && n.screenshots.length > 0 && (l.push(""), l.push("#### 截图"), n.screenshots.forEach((y) => {
        const c = y.url || y.imagePath || `images/${y.filename}`;
        l.push(`![${y.type}](${c})`);
      })), l.push("");
    });
  }), l.join(`
`);
}
function pe(e, l) {
  if (typeof window > "u") return;
  const r = URL.createObjectURL(e), h = document.createElement("a");
  h.href = r, h.download = l, h.style.display = "none", document.body.appendChild(h), h.click(), setTimeout(() => {
    h.parentNode && document.body.removeChild(h), URL.revokeObjectURL(r);
  }, 1e3);
}
function me() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}${ae(e.getMonth() + 1)}${ae(e.getDate())}-${ae(e.getHours())}${ae(e.getMinutes())}`;
}
function ae(e) {
  return String(e).padStart(2, "0");
}
function In(e) {
  return { low: "低", medium: "中", high: "高", critical: "严重" }[e] || e;
}
function On(e, l) {
  return e.reduce((r, h) => {
    const u = h[l] || "unknown";
    return r[u] || (r[u] = []), r[u].push(h), r;
  }, {});
}
function Pn(e, l) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const r = document.implementation.createHTMLDocument(), h = r.createElement("base"), u = r.createElement("a");
  return r.head.appendChild(h), r.body.appendChild(u), l && (h.href = l), u.href = e, u.href;
}
const Bn = /* @__PURE__ */ (() => {
  let e = 0;
  const l = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${l()}${e}`);
})();
function Mt(e) {
  const l = [];
  for (let r = 0, h = e.length; r < h; r++)
    l.push(e[r]);
  return l;
}
let qt = null;
function Xe(e = {}) {
  return qt || (e.includeStyleProperties ? (qt = e.includeStyleProperties, qt) : (qt = Mt(window.getComputedStyle(document.documentElement)), qt));
}
function se(e, l) {
  const h = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(l);
  return h ? parseFloat(h.replace("px", "")) : 0;
}
function Dn(e) {
  const l = se(e, "border-left-width"), r = se(e, "border-right-width");
  return e.clientWidth + l + r;
}
function Ln(e) {
  const l = se(e, "border-top-width"), r = se(e, "border-bottom-width");
  return e.clientHeight + l + r;
}
function Ye(e, l = {}) {
  const r = l.width || Dn(e), h = l.height || Ln(e);
  return { width: r, height: h };
}
function Fn() {
  let e, l;
  try {
    l = process;
  } catch {
  }
  const r = l && l.env ? l.env.devicePixelRatio : null;
  return r && (e = parseInt(r, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Tt = 16384;
function Nn(e) {
  (e.width > Tt || e.height > Tt) && (e.width > Tt && e.height > Tt ? e.width > e.height ? (e.height *= Tt / e.width, e.width = Tt) : (e.width *= Tt / e.height, e.height = Tt) : e.width > Tt ? (e.height *= Tt / e.width, e.width = Tt) : (e.width *= Tt / e.height, e.height = Tt));
}
function oe(e) {
  return new Promise((l, r) => {
    const h = new Image();
    h.onload = () => {
      h.decode().then(() => {
        requestAnimationFrame(() => l(h));
      });
    }, h.onerror = r, h.crossOrigin = "anonymous", h.decoding = "async", h.src = e;
  });
}
async function Un(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((l) => `data:image/svg+xml;charset=utf-8,${l}`);
}
async function Mn(e, l, r) {
  const h = "http://www.w3.org/2000/svg", u = document.createElementNS(h, "svg"), n = document.createElementNS(h, "foreignObject");
  return u.setAttribute("width", `${l}`), u.setAttribute("height", `${r}`), u.setAttribute("viewBox", `0 0 ${l} ${r}`), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("x", "0"), n.setAttribute("y", "0"), n.setAttribute("externalResourcesRequired", "true"), u.appendChild(n), n.appendChild(e), Un(u);
}
const At = (e, l) => {
  if (e instanceof l)
    return !0;
  const r = Object.getPrototypeOf(e);
  return r === null ? !1 : r.constructor.name === l.name || At(r, l);
};
function jn(e) {
  const l = e.getPropertyValue("content");
  return `${e.cssText} content: '${l.replace(/'|"/g, "")}';`;
}
function $n(e, l) {
  return Xe(l).map((r) => {
    const h = e.getPropertyValue(r), u = e.getPropertyPriority(r);
    return `${r}: ${h}${u ? " !important" : ""};`;
  }).join(" ");
}
function Wn(e, l, r, h) {
  const u = `.${e}:${l}`, n = r.cssText ? jn(r) : $n(r, h);
  return document.createTextNode(`${u}{${n}}`);
}
function Me(e, l, r, h) {
  const u = window.getComputedStyle(e, r), n = u.getPropertyValue("content");
  if (n === "" || n === "none")
    return;
  const s = Bn();
  try {
    l.className = `${l.className} ${s}`;
  } catch {
    return;
  }
  const i = document.createElement("style");
  i.appendChild(Wn(s, r, u, h)), l.appendChild(i);
}
function Zn(e, l, r) {
  Me(e, l, ":before", r), Me(e, l, ":after", r);
}
const je = "application/font-woff", $e = "image/jpeg", Hn = {
  woff: je,
  woff2: je,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: $e,
  jpeg: $e,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Vn(e) {
  const l = /\.([^./]*?)$/g.exec(e);
  return l ? l[1] : "";
}
function be(e) {
  const l = Vn(e).toLowerCase();
  return Hn[l] || "";
}
function Gn(e) {
  return e.split(/,/)[1];
}
function _e(e) {
  return e.search(/^(data:)/) !== -1;
}
function Xn(e, l) {
  return `data:${l};base64,${e}`;
}
async function Ke(e, l, r) {
  const h = await fetch(e, l);
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
const ge = {};
function Yn(e, l, r) {
  let h = e.replace(/\?.*/, "");
  return r && (h = e), /ttf|otf|eot|woff2?/i.test(h) && (h = h.replace(/.*\//, "")), l ? `[${l}]${h}` : h;
}
async function ke(e, l, r) {
  const h = Yn(e, l, r.includeQueryParams);
  if (ge[h] != null)
    return ge[h];
  r.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let u;
  try {
    const n = await Ke(e, r.fetchRequestInit, ({ res: s, result: i }) => (l || (l = s.headers.get("Content-Type") || ""), Gn(i)));
    u = Xn(n, l);
  } catch (n) {
    u = r.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    n && (s = typeof n == "string" ? n : n.message), s && console.warn(s);
  }
  return ge[h] = u, u;
}
async function Kn(e) {
  const l = e.toDataURL();
  return l === "data:," ? e.cloneNode(!1) : oe(l);
}
async function qn(e, l) {
  if (e.currentSrc) {
    const n = document.createElement("canvas"), s = n.getContext("2d");
    n.width = e.clientWidth, n.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, n.width, n.height);
    const i = n.toDataURL();
    return oe(i);
  }
  const r = e.poster, h = be(r), u = await ke(r, h, l);
  return oe(u);
}
async function Jn(e, l) {
  var r;
  try {
    if (!((r = e == null ? void 0 : e.contentDocument) === null || r === void 0) && r.body)
      return await ue(e.contentDocument.body, l, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Qn(e, l) {
  return At(e, HTMLCanvasElement) ? Kn(e) : At(e, HTMLVideoElement) ? qn(e, l) : At(e, HTMLIFrameElement) ? Jn(e, l) : e.cloneNode(qe(e));
}
const tr = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", qe = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function er(e, l, r) {
  var h, u;
  if (qe(l))
    return l;
  let n = [];
  return tr(e) && e.assignedNodes ? n = Mt(e.assignedNodes()) : At(e, HTMLIFrameElement) && (!((h = e.contentDocument) === null || h === void 0) && h.body) ? n = Mt(e.contentDocument.body.childNodes) : n = Mt(((u = e.shadowRoot) !== null && u !== void 0 ? u : e).childNodes), n.length === 0 || At(e, HTMLVideoElement) || await n.reduce((s, i) => s.then(() => ue(i, r)).then((d) => {
    d && l.appendChild(d);
  }), Promise.resolve()), l;
}
function nr(e, l, r) {
  const h = l.style;
  if (!h)
    return;
  const u = window.getComputedStyle(e);
  u.cssText ? (h.cssText = u.cssText, h.transformOrigin = u.transformOrigin) : Xe(r).forEach((n) => {
    let s = u.getPropertyValue(n);
    n === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), At(e, HTMLIFrameElement) && n === "display" && s === "inline" && (s = "block"), n === "d" && l.getAttribute("d") && (s = `path(${l.getAttribute("d")})`), h.setProperty(n, s, u.getPropertyPriority(n));
  });
}
function rr(e, l) {
  At(e, HTMLTextAreaElement) && (l.innerHTML = e.value), At(e, HTMLInputElement) && l.setAttribute("value", e.value);
}
function ir(e, l) {
  if (At(e, HTMLSelectElement)) {
    const r = l, h = Array.from(r.children).find((u) => e.value === u.getAttribute("value"));
    h && h.setAttribute("selected", "");
  }
}
function ar(e, l, r) {
  return At(l, Element) && (nr(e, l, r), Zn(e, l, r), rr(e, l), ir(e, l)), l;
}
async function sr(e, l) {
  const r = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (r.length === 0)
    return e;
  const h = {};
  for (let n = 0; n < r.length; n++) {
    const i = r[n].getAttribute("xlink:href");
    if (i) {
      const d = e.querySelector(i), _ = document.querySelector(i);
      !d && _ && !h[i] && (h[i] = await ue(_, l, !0));
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
async function ue(e, l, r) {
  return !r && l.filter && !l.filter(e) ? null : Promise.resolve(e).then((h) => Qn(h, l)).then((h) => er(e, h, l)).then((h) => ar(e, h, l)).then((h) => sr(h, l));
}
const Je = /url\((['"]?)([^'"]+?)\1\)/g, or = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, lr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ur(e) {
  const l = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${l})(['"]?\\))`, "g");
}
function cr(e) {
  const l = [];
  return e.replace(Je, (r, h, u) => (l.push(u), r)), l.filter((r) => !_e(r));
}
async function dr(e, l, r, h, u) {
  try {
    const n = r ? Pn(l, r) : l, s = be(l);
    let i;
    return u || (i = await ke(n, s, h)), e.replace(ur(l), `$1${i}$3`);
  } catch {
  }
  return e;
}
function hr(e, { preferredFontFormat: l }) {
  return l ? e.replace(lr, (r) => {
    for (; ; ) {
      const [h, , u] = or.exec(r) || [];
      if (!u)
        return "";
      if (u === l)
        return `src: ${h};`;
    }
  }) : e;
}
function Qe(e) {
  return e.search(Je) !== -1;
}
async function tn(e, l, r) {
  if (!Qe(e))
    return e;
  const h = hr(e, r);
  return cr(h).reduce((n, s) => n.then((i) => dr(i, s, l, r)), Promise.resolve(h));
}
async function Jt(e, l, r) {
  var h;
  const u = (h = l.style) === null || h === void 0 ? void 0 : h.getPropertyValue(e);
  if (u) {
    const n = await tn(u, null, r);
    return l.style.setProperty(e, n, l.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function fr(e, l) {
  await Jt("background", e, l) || await Jt("background-image", e, l), await Jt("mask", e, l) || await Jt("-webkit-mask", e, l) || await Jt("mask-image", e, l) || await Jt("-webkit-mask-image", e, l);
}
async function pr(e, l) {
  const r = At(e, HTMLImageElement);
  if (!(r && !_e(e.src)) && !(At(e, SVGImageElement) && !_e(e.href.baseVal)))
    return;
  const h = r ? e.src : e.href.baseVal, u = await ke(h, be(h), l);
  await new Promise((n, s) => {
    e.onload = n, e.onerror = l.onImageErrorHandler ? (...d) => {
      try {
        n(l.onImageErrorHandler(...d));
      } catch (_) {
        s(_);
      }
    } : s;
    const i = e;
    i.decode && (i.decode = n), i.loading === "lazy" && (i.loading = "eager"), r ? (e.srcset = "", e.src = u) : e.href.baseVal = u;
  });
}
async function mr(e, l) {
  const h = Mt(e.childNodes).map((u) => en(u, l));
  await Promise.all(h).then(() => e);
}
async function en(e, l) {
  At(e, Element) && (await fr(e, l), await pr(e, l), await mr(e, l));
}
function gr(e, l) {
  const { style: r } = e;
  l.backgroundColor && (r.backgroundColor = l.backgroundColor), l.width && (r.width = `${l.width}px`), l.height && (r.height = `${l.height}px`);
  const h = l.style;
  return h != null && Object.keys(h).forEach((u) => {
    r[u] = h[u];
  }), e;
}
const We = {};
async function Ze(e) {
  let l = We[e];
  if (l != null)
    return l;
  const h = await (await fetch(e)).text();
  return l = { url: e, cssText: h }, We[e] = l, l;
}
async function He(e, l) {
  let r = e.cssText;
  const h = /url\(["']?([^"')]+)["']?\)/g, n = (r.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let i = s.replace(h, "$1");
    return i.startsWith("https://") || (i = new URL(i, e.url).href), Ke(i, l.fetchRequestInit, ({ result: d }) => (r = r.replace(s, `url(${d})`), [s, d]));
  });
  return Promise.all(n).then(() => r);
}
function Ve(e) {
  if (e == null)
    return [];
  const l = [], r = /(\/\*[\s\S]*?\*\/)/gi;
  let h = e.replace(r, "");
  const u = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const d = u.exec(h);
    if (d === null)
      break;
    l.push(d[0]);
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
    l.push(d[0]);
  }
  return l;
}
async function vr(e, l) {
  const r = [], h = [];
  return e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Mt(u.cssRules || []).forEach((n, s) => {
          if (n.type === CSSRule.IMPORT_RULE) {
            let i = s + 1;
            const d = n.href, _ = Ze(d).then((E) => He(E, l)).then((E) => Ve(E).forEach((b) => {
              try {
                u.insertRule(b, b.startsWith("@import") ? i += 1 : u.cssRules.length);
              } catch (y) {
                console.error("Error inserting rule from remote css", {
                  rule: b,
                  error: y
                });
              }
            })).catch((E) => {
              console.error("Error loading remote css", E.toString());
            });
            h.push(_);
          }
        });
      } catch (n) {
        const s = e.find((i) => i.href == null) || document.styleSheets[0];
        u.href != null && h.push(Ze(u.href).then((i) => He(i, l)).then((i) => Ve(i).forEach((d) => {
          s.insertRule(d, s.cssRules.length);
        })).catch((i) => {
          console.error("Error loading remote stylesheet", i);
        })), console.error("Error inlining remote css file", n);
      }
  }), Promise.all(h).then(() => (e.forEach((u) => {
    if ("cssRules" in u)
      try {
        Mt(u.cssRules || []).forEach((n) => {
          r.push(n);
        });
      } catch (n) {
        console.error(`Error while reading CSS rules from ${u.href}`, n);
      }
  }), r));
}
function wr(e) {
  return e.filter((l) => l.type === CSSRule.FONT_FACE_RULE).filter((l) => Qe(l.style.getPropertyValue("src")));
}
async function yr(e, l) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const r = Mt(e.ownerDocument.styleSheets), h = await vr(r, l);
  return wr(h);
}
function nn(e) {
  return e.trim().replace(/["']/g, "");
}
function _r(e) {
  const l = /* @__PURE__ */ new Set();
  function r(h) {
    (h.style.fontFamily || getComputedStyle(h).fontFamily).split(",").forEach((n) => {
      l.add(nn(n));
    }), Array.from(h.children).forEach((n) => {
      n instanceof HTMLElement && r(n);
    });
  }
  return r(e), l;
}
async function br(e, l) {
  const r = await yr(e, l), h = _r(e);
  return (await Promise.all(r.filter((n) => h.has(nn(n.style.fontFamily))).map((n) => {
    const s = n.parentStyleSheet ? n.parentStyleSheet.href : null;
    return tn(n.cssText, s, l);
  }))).join(`
`);
}
async function kr(e, l) {
  const r = l.fontEmbedCSS != null ? l.fontEmbedCSS : l.skipFonts ? null : await br(e, l);
  if (r) {
    const h = document.createElement("style"), u = document.createTextNode(r);
    h.appendChild(u), e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h);
  }
}
async function xr(e, l = {}) {
  const { width: r, height: h } = Ye(e, l), u = await ue(e, l, !0);
  return await kr(u, l), await en(u, l), gr(u, l), await Mn(u, r, h);
}
async function Sr(e, l = {}) {
  const { width: r, height: h } = Ye(e, l), u = await xr(e, l), n = await oe(u), s = document.createElement("canvas"), i = s.getContext("2d"), d = l.pixelRatio || Fn(), _ = l.canvasWidth || r, E = l.canvasHeight || h;
  return s.width = _ * d, s.height = E * d, l.skipAutoScale || Nn(s), s.style.width = `${_}`, s.style.height = `${E}`, l.backgroundColor && (i.fillStyle = l.backgroundColor, i.fillRect(0, 0, s.width, s.height)), i.drawImage(n, 0, 0, s.width, s.height), s;
}
async function xe(e, l = {}) {
  return (await Sr(e, l)).toDataURL();
}
const Lt = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
  FULL_PAGE: "fullpage",
  BOX: "box",
  TARGETS: "targets"
};
function ve(e) {
  const l = Date.now(), r = Math.random().toString(36).slice(2, 6);
  return `screenshot-${e}-${l}-${r}.png`;
}
async function rn(e, l = {}) {
  if (!e) return null;
  try {
    return await xe(e, {
      pixelRatio: l.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...l
    });
  } catch (r) {
    return console.error("captureElement failed:", r), null;
  }
}
async function Er(e = {}) {
  const l = document.documentElement;
  return rn(l, {
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
async function Cr(e = {}) {
  const l = document.documentElement, r = l.style.overflow, h = l.style.width, u = l.style.height;
  try {
    return l.style.overflow = "visible", l.style.width = "auto", l.style.height = "auto", await xe(l, {
      pixelRatio: e.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...e
    });
  } catch (n) {
    return console.error("captureFullPage failed:", n), null;
  } finally {
    l.style.overflow = r, l.style.width = h, l.style.height = u;
  }
}
async function Rr(e, l = {}) {
  if (!e || e.width < 1 || e.height < 1) return null;
  const r = document.documentElement, h = r.style.overflow, u = r.style.width, n = r.style.height;
  try {
    r.style.overflow = "visible", r.style.width = "auto", r.style.height = "auto";
    const s = await xe(r, {
      pixelRatio: l.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: !0,
      ...l
    });
    return zr(s, e);
  } catch (s) {
    return console.error("captureBox failed:", s), null;
  } finally {
    r.style.overflow = h, r.style.width = u, r.style.height = n;
  }
}
function zr(e, l) {
  return new Promise((r, h) => {
    const u = new Image();
    u.onload = () => {
      const n = document.createElement("canvas"), s = window.devicePixelRatio || 1;
      n.width = Math.round(l.width * s), n.height = Math.round(l.height * s), n.getContext("2d").drawImage(
        u,
        l.x * s,
        l.y * s,
        l.width * s,
        l.height * s,
        0,
        0,
        n.width,
        n.height
      ), r(n.toDataURL("image/png"));
    }, u.onerror = h, u.src = e;
  });
}
async function Ar(e) {
  return (await fetch(e)).blob();
}
async function we(e, l, r) {
  if (!r) return null;
  try {
    const h = await Ar(e);
    return await r(h, l);
  } catch (h) {
    return console.error("uploadScreenshot failed:", h), null;
  }
}
function an(e) {
  var u;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return "#" + e.id;
  const l = e.tagName.toLowerCase();
  if (e.className) {
    const n = String(e.className).split(/\s+/).filter((s) => s && !s.startsWith("el-") && !/^__/.test(s)).slice(0, 2);
    if (n.length) return l + "." + n.join(".");
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
function Tr(e) {
  var h;
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
  if (e.id) return `//*[@id="${e.id}"]`;
  const l = [];
  let r = e;
  for (; r && r !== document.body; ) {
    const s = Array.from(((h = r.parentNode) == null ? void 0 : h.children) || []).filter((i) => i.tagName === r.tagName).indexOf(r) + 1;
    l.unshift(`${r.tagName.toLowerCase()}[${s}]`), r = r.parentNode;
  }
  return l.unshift(""), "/html/body/" + l.slice(1).join("/");
}
function Ir(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return {};
  const l = {}, r = e.getAttribute("role") || Or(e);
  r && (l.role = r);
  const h = Pr(e);
  h && (l.accessibleName = h);
  const u = e.getAttribute("aria-labelledby");
  return u && (l.labeledBy = u), Object.keys(l).length ? l : void 0;
}
function Or(e) {
  const l = e.tagName.toLowerCase(), r = e.getAttribute("type");
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
  }[l];
}
function Pr(e) {
  var n, s;
  if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
  const l = e.getAttribute("aria-labelledby");
  if (l) {
    const i = l.split(/\s+/).map((d) => {
      var _, E;
      return (E = (_ = document.getElementById(d)) == null ? void 0 : _.textContent) == null ? void 0 : E.trim();
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
function Br(e) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? void 0 : e.getAttribute("data-testid") || void 0;
}
function le(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return null;
  const l = e.getBoundingClientRect();
  return {
    tag: e.tagName.toLowerCase(),
    id: e.id || void 0,
    classes: e.className ? String(e.className).split(/\s+/).filter(Boolean) : void 0,
    selector: an(e),
    xpath: Tr(e),
    rect: {
      x: l.left + window.scrollX,
      y: l.top + window.scrollY,
      width: l.width,
      height: l.height
    },
    aria: Ir(e),
    testId: Br(e)
  };
}
function Dr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const l = [];
  let r = e;
  for (; r && r !== document.body; )
    l.unshift(r), r = r.parentElement;
  return r === document.body && l.unshift(document.body), l.map(le).filter(Boolean);
}
function Lr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
  const l = Fr(e);
  if (l.length) return l;
  const r = Ur(e);
  return r.length ? r : [];
}
function Fr(e) {
  const l = [];
  let r = e;
  for (; r; ) {
    const h = Nr(r);
    h && !l.find((u) => u.componentName === h.componentName && u.selector === h.selector) && l.unshift(h), r = r.parentElement;
  }
  return l;
}
function Nr(e) {
  var n, s, i, d, _;
  const r = Object.keys(e || {}).find((E) => E.startsWith("__vue"));
  if (!r) return null;
  const h = e[r], u = ((n = h == null ? void 0 : h.type) == null ? void 0 : n.name) || ((s = h == null ? void 0 : h.type) == null ? void 0 : s.__name) || ((d = (i = h == null ? void 0 : h.parent) == null ? void 0 : i.type) == null ? void 0 : d.name);
  return u ? {
    componentName: u,
    selector: an(e),
    rect: (_ = le(e)) == null ? void 0 : _.rect
  } : null;
}
function Ur(e) {
  const l = [], r = Object.keys(e || {}).find((u) => u.startsWith("__reactFiber$"));
  if (!r) return l;
  let h = e[r];
  for (; h; ) {
    const u = Mr(h);
    u && !l.find((n) => n.componentName === u) && l.unshift({ componentName: u, selector: void 0, rect: void 0 }), h = h.return;
  }
  return l;
}
function Mr(e) {
  var l;
  if (!e) return null;
  if (typeof e.type == "function") return e.type.displayName || e.type.name || null;
  if (typeof e.type == "string") return null;
  if (e.elementType) {
    if (typeof e.elementType == "function") return e.elementType.displayName || e.elementType.name || null;
    if (typeof e.elementType == "object" && ((l = e.elementType) != null && l.$$typeof)) return e.elementType.name || null;
  }
  return null;
}
function ye(e) {
  return {
    dom: Dr(e),
    framework: Lr(e)
  };
}
const jr = { class: "toolbar-left" }, $r = { class: "radio-group radio-group-small" }, Wr = { class: "toolbar-right" }, Zr = ["disabled"], Hr = ["disabled"], Vr = { class: "badge-wrapper" }, Gr = {
  key: 0,
  class: "badge"
}, Xr = { class: "dropdown" }, Yr = {
  key: 0,
  class: "dropdown-menu"
}, Kr = { class: "highlight-label" }, qr = ["onClick"], Jr = { class: "highlight-label" }, Qr = ["onClick"], ti = ["onMousedown"], ei = ["onClick"], ni = ["onMousedown"], ri = { class: "modal-body" }, ii = { class: "form" }, ai = { class: "form-group" }, si = { class: "form-control-static" }, oi = { class: "form-group" }, li = { class: "text-muted" }, ui = { class: "form-group" }, ci = { class: "text-muted" }, di = { class: "form-group" }, hi = { class: "checkbox-group" }, fi = { class: "checkbox" }, pi = ["value"], mi = { class: "checkbox" }, gi = ["value"], vi = { class: "checkbox" }, wi = ["value"], yi = { class: "form-group" }, _i = { class: "form-group" }, bi = { class: "radio-group" }, ki = { class: "radio" }, xi = { class: "radio" }, Si = { class: "radio" }, Ei = { class: "radio" }, Ci = { class: "form-group" }, Ri = { class: "modal-footer" }, zi = ["disabled"], Ai = {
  key: 6,
  class: "review-drawer"
}, Ti = { class: "drawer-header" }, Ii = { class: "drawer-body" }, Oi = {
  key: 0,
  class: "empty-state"
}, Pi = {
  key: 1,
  class: "tree-panel"
}, Bi = {
  key: 0,
  class: "tree-section"
}, Di = { class: "tree-list" }, Li = ["onMouseenter", "onClick"], Fi = { class: "node-name" }, Ni = { class: "tree-section" }, Ui = { class: "tree-list" }, Mi = ["onMouseenter", "onClick"], ji = { class: "node-tag" }, $i = {
  key: 0,
  class: "node-id"
}, Wi = {
  key: 1,
  class: "node-aria"
}, Zi = {
  key: 2,
  class: "node-testid"
}, Hi = {
  key: 8,
  class: "review-drawer"
}, Vi = { class: "drawer-header" }, Gi = { class: "drawer-body" }, Xi = { class: "review-list-actions" }, Yi = {
  key: 0,
  class: "empty-state"
}, Ki = {
  key: 1,
  class: "review-list"
}, qi = { class: "review-item-header" }, Ji = { class: "review-item-title" }, Qi = { class: "review-item-tags" }, ta = { class: "review-tag tag-info" }, ea = {
  key: 0,
  class: "review-tag tag-success"
}, na = { class: "review-item-target" }, ra = { class: "review-item-suggestion" }, ia = { class: "review-item-meta" }, aa = { class: "text-muted" }, sa = { class: "review-item-actions" }, oa = ["onClick"], la = ["onClick"], ca = {
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
  setup(e, { expose: l, emit: r }) {
    const h = e, u = r, n = Zt(() => h.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: s, getPageReviews: i, addReview: d, updateReview: _, deleteReview: E, clearPageReviews: b, exportToJSON: y, exportToMarkdown: c, exportToZIP: w } = An({
      storageKey: h.storageKey,
      defaultPagePath: () => n.value
    }), o = Zt(() => i(n.value)), m = pt("element"), f = pt(!1), g = pt(!1), S = pt(!1), R = pt(!1), z = pt(null), j = pt(""), P = pt([]), M = pt([]), B = pt(0), X = pt(null), tt = pt(null), x = pt({ x: window.scrollX, y: window.scrollY }), L = pt(null), a = pt(!1), N = pt({ x: 0, y: 0 }), nt = pt(null), H = pt(""), st = pt({ x: 0, y: 0, rect: null }), G = pt({ x: 0, y: 0 }), at = pt({ width: null, height: null }), O = pt(!1), I = pt({ x: 0, y: 0 }), rt = pt(!1), J = pt({ x: 0, y: 0, width: 0, height: 0 }), q = pt({ x: 0, y: 0 }), gt = pt({ width: 560, height: null }), bt = pt(!1), ut = pt({ x: 0, y: 0 }), ft = pt(!1), _t = pt({ x: 0, y: 0, width: 0, height: 0 }), mt = pt([]), ot = pt({
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
    }), Ct = Zt(() => P.value.length + M.value.length), t = Zt(() => ot.value.title.trim() && ot.value.suggestion.trim()), F = Zt(() => h.imageUpload ? h.imageUpload : h.imageUploadUrl ? D : null);
    async function D(A, k) {
      var Et;
      const U = new FormData();
      U.append("file", A, k);
      const et = await fetch(h.imageUploadUrl, { method: "POST", body: U });
      if (!et.ok) throw new Error("Upload failed");
      const dt = await et.text();
      try {
        const V = JSON.parse(dt);
        return V.url || ((Et = V.data) == null ? void 0 : Et.url) || dt;
      } catch {
        return dt;
      }
    }
    const v = Zt(() => {
      const { x: A, y: k } = G.value, U = {
        transform: `translate(calc(-50% + ${A}px), ${k}px)`
      };
      return at.value.width && (U.width = at.value.width + "px"), at.value.height && (U.height = at.value.height + "px"), U;
    }), p = Zt(() => {
      const { x: A, y: k } = q.value, U = {
        left: `calc(50% + ${A}px)`,
        top: `calc(50% + ${k}px)`,
        transform: "translate(-50%, -50%)",
        width: gt.value.width + "px"
      };
      return gt.value.height && (U.height = gt.value.height + "px"), U;
    }), C = [
      { position: "nw" },
      { position: "n" },
      { position: "ne" },
      { position: "w" },
      { position: "e" },
      { position: "sw" },
      { position: "s" },
      { position: "se" }
    ];
    De(R, (A) => {
      A && Le(() => {
        const k = () => {
          R.value = !1;
        };
        document.addEventListener("click", k, { once: !0 });
      });
    });
    function $(A) {
      return A ? {
        x: A.x - x.value.x,
        y: A.y - x.value.y,
        width: A.width,
        height: A.height
      } : null;
    }
    function W(A) {
      return A ? {
        left: A.x + "px",
        top: A.y + "px",
        width: A.width + "px",
        height: A.height + "px"
      } : {};
    }
    function T(A) {
      return A ? {
        left: A.x + "px",
        top: A.y + "px",
        width: A.width + "px",
        height: A.height + "px"
      } : {};
    }
    function Y(A, k) {
      const et = {};
      return A.includes("n") && (et.top = -8 / 2 + "px"), A.includes("s") && (et.bottom = -8 / 2 + "px"), A.includes("w") && (et.left = -8 / 2 + "px"), A.includes("e") && (et.right = -8 / 2 + "px"), (A === "n" || A === "s") && (et.left = k.width / 2 - 8 / 2 + "px"), (A === "w" || A === "e") && (et.top = k.height / 2 - 8 / 2 + "px"), et.width = "8px", et.height = "8px", et;
    }
    function Q(A) {
      return { low: "info", medium: "warning", high: "danger", critical: "danger" }[A] || "info";
    }
    function K(A) {
      return { low: "低", medium: "中", high: "高", critical: "严重" }[A] || A;
    }
    function it(A) {
      var k;
      return (k = A.targets) == null ? void 0 : k.some((U) => {
        var et, dt;
        return (dt = (et = U.componentTree) == null ? void 0 : et.dom) == null ? void 0 : dt.length;
      });
    }
    function vt(A) {
      if (!A || A.length === 0) return "无目标";
      const k = A[0], U = k.type === "element" ? k.elementText || k.selector || "元素" : `框选 x=${k.viewportRect.x}, y=${k.viewportRect.y}`;
      return A.length === 1 ? U : `${U} 等 ${A.length} 个目标`;
    }
    function ht() {
      R.value = !1, c();
    }
    function Rt() {
      R.value = !1, y();
    }
    function jt() {
      R.value = !1, w();
    }
    function It() {
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: { x: window.scrollX, y: window.scrollY },
        pagePath: n.value,
        pageUrl: window.location.href,
        pageName: h.pageName || n.value
      };
    }
    function $t(A) {
      var et;
      if (A.id) return "#" + A.id;
      if (A.className) {
        const dt = String(A.className).split(/\s+/).filter((Et) => Et && !Et.startsWith("el-")).slice(0, 2);
        if (dt.length) return A.tagName.toLowerCase() + "." + dt.join(".");
      }
      let k = [], U = A;
      for (; U && U !== document.body; ) {
        let dt = U.tagName.toLowerCase();
        if (U.id) {
          dt += "#" + U.id, k.unshift(dt);
          break;
        }
        const V = Array.from(((et = U.parentNode) == null ? void 0 : et.children) || []).filter((wt) => wt.tagName === U.tagName);
        if (V.length > 1) {
          const wt = V.indexOf(U) + 1;
          dt += `:nth-of-type(${wt})`;
        }
        k.unshift(dt), U = U.parentNode;
      }
      return k.join(" > ");
    }
    function yt(A) {
      const k = A.target;
      return !k || !(k instanceof Element) || k.closest(".review-overlay") ? null : k;
    }
    function Ft(A) {
      return A.ctrlKey || A.metaKey;
    }
    function Xt(A) {
      if (O.value || nt.value || m.value !== "element" || f.value || a.value) return;
      const k = yt(A);
      if (!k) {
        z.value = null;
        return;
      }
      const U = k.getBoundingClientRect();
      z.value = {
        x: U.left,
        y: U.top,
        width: U.width,
        height: U.height
      }, j.value = k.tagName.toLowerCase();
    }
    function Ot() {
      z.value = null;
    }
    function Qt(A) {
      var dt;
      if (m.value !== "element" || f.value || a.value || nt.value) return;
      const k = yt(A);
      if (!k) return;
      A.preventDefault(), A.stopPropagation();
      const U = k.getBoundingClientRect(), et = {
        el: k,
        selector: $t(k),
        tag: k.tagName.toLowerCase(),
        text: ((dt = k.innerText) == null ? void 0 : dt.slice(0, 40)) || "",
        rect: {
          x: U.left,
          y: U.top,
          width: U.width,
          height: U.height
        },
        docRect: {
          x: U.left + window.scrollX,
          y: U.top + window.scrollY,
          width: U.width,
          height: U.height
        }
      };
      if (Ft(A)) {
        const Et = P.value.findIndex((V) => V.el === k);
        Et > -1 ? P.value.splice(Et, 1) : P.value.push(et);
      } else
        P.value = [et], M.value = [];
      P.value.length === 1 && (tt.value = ye(k));
    }
    function ce(A, k) {
      Ft(k) && (k.stopPropagation(), ee(A));
    }
    function ee(A) {
      const k = P.value.findIndex((U) => U.el === A.el);
      k > -1 && P.value.splice(k, 1), P.value.length === 0 && (tt.value = null);
    }
    function ne(A) {
      O.value || m.value !== "viewport" || f.value || nt.value || yt(A) && (A.preventDefault(), a.value = !0, N.value = { x: A.clientX, y: A.clientY }, L.value = { x: N.value.x, y: N.value.y, width: 0, height: 0 });
    }
    function te(A) {
      if (O.value) return;
      if (nt.value) {
        on(A);
        return;
      }
      if (!a.value) return;
      const k = A.clientX, U = A.clientY;
      L.value = {
        x: Math.min(N.value.x, k),
        y: Math.min(N.value.y, U),
        width: Math.abs(k - N.value.x),
        height: Math.abs(U - N.value.y)
      };
    }
    function Ut(A) {
      if (O.value) {
        O.value = !1;
        return;
      }
      if (rt.value) {
        rt.value = !1;
        return;
      }
      if (bt.value) {
        bt.value = !1;
        return;
      }
      if (ft.value) {
        ft.value = !1;
        return;
      }
      if (nt.value) {
        nt.value = null, H.value = "", st.value = { x: 0, y: 0, rect: null };
        return;
      }
      a.value && (a.value = !1, L.value && L.value.width > 10 && L.value.height > 10 && (Ft(A) || (P.value = []), M.value.push({
        id: "box-" + Date.now() + "-" + B.value++,
        index: M.value.length,
        rect: {
          x: L.value.x + window.scrollX,
          y: L.value.y + window.scrollY,
          width: L.value.width,
          height: L.value.height
        }
      })), L.value = null);
    }
    function Yt(A, k) {
      Ft(k) && (k.stopPropagation(), Se(A));
    }
    function Se(A) {
      M.value = M.value.filter((k) => k.id !== A.id), M.value.forEach((k, U) => {
        k.index = U;
      });
    }
    function sn(A, k, U) {
      nt.value = A.id, H.value = k, st.value = {
        x: U.clientX + window.scrollX,
        y: U.clientY + window.scrollY,
        rect: { ...A.rect }
      };
    }
    function on(A) {
      if (!nt.value || !st.value.rect) return;
      const k = A.clientX + window.scrollX - st.value.x, U = A.clientY + window.scrollY - st.value.y, et = st.value.rect, dt = M.value.find((Wt) => Wt.id === nt.value);
      if (!dt) return;
      let { x: Et, y: V, width: wt, height: St } = et;
      H.value.includes("e") && (wt = Math.max(10, et.width + k)), H.value.includes("s") && (St = Math.max(10, et.height + U)), H.value.includes("w") && (wt = Math.max(10, et.width - k), Et = et.x + (et.width - wt)), H.value.includes("n") && (St = Math.max(10, et.height - U), V = et.y + (et.height - St)), dt.rect = { x: Et, y: V, width: wt, height: St };
    }
    function ln(A) {
      var U, et;
      ((U = A.target.classList) != null && U.contains("toolbar-title") || (et = A.target.classList) != null && et.contains("review-toolbar")) && (O.value = !0, I.value = {
        x: A.clientX - G.value.x,
        y: A.clientY - G.value.y
      });
    }
    function Ee(A) {
      if (O.value) {
        G.value = {
          x: A.clientX - I.value.x,
          y: A.clientY - I.value.y
        };
        return;
      }
      if (rt.value) {
        const k = A.clientX - J.value.x, U = A.clientY - J.value.y;
        at.value = {
          width: Math.max(400, J.value.width + k),
          height: Math.max(48, J.value.height + U)
        };
      }
    }
    function un(A) {
      rt.value = !0;
      const k = A.target.closest(".review-toolbar"), U = k == null ? void 0 : k.getBoundingClientRect();
      J.value = {
        x: A.clientX,
        y: A.clientY,
        width: (U == null ? void 0 : U.width) || 0,
        height: (U == null ? void 0 : U.height) || 0
      };
    }
    function cn(A) {
      var k;
      (k = A.target.classList) != null && k.contains("modal-header") && (bt.value = !0, ut.value = {
        x: A.clientX - q.value.x,
        y: A.clientY - q.value.y
      });
    }
    function Ce(A) {
      if (bt.value)
        q.value = {
          x: A.clientX - ut.value.x,
          y: A.clientY - ut.value.y
        };
      else if (ft.value) {
        const k = A.clientX - _t.value.x, U = A.clientY - _t.value.y;
        gt.value = {
          width: Math.max(360, _t.value.width + k),
          height: Math.max(300, _t.value.height + U)
        };
      }
    }
    function dn(A) {
      ft.value = !0, _t.value = {
        x: A.clientX,
        y: A.clientY,
        width: gt.value.width,
        height: gt.value.height
      };
    }
    function Re(A) {
      A.key === "Escape" && (f.value ? f.value = !1 : Oe());
    }
    function hn() {
      P.value = P.value.map((A) => {
        const k = A.el || document.querySelector(A.selector);
        if (!k) return A;
        const U = k.getBoundingClientRect();
        return {
          ...A,
          el: k,
          rect: {
            x: U.left,
            y: U.top,
            width: U.width,
            height: U.height
          }
        };
      });
    }
    function ze() {
      x.value = { x: window.scrollX, y: window.scrollY }, hn();
    }
    function fn() {
    }
    function pn() {
      P.value.length === 0 && (tt.value = null), S.value = !0;
    }
    function Ae(A) {
      if (!A.rect) {
        X.value = null;
        return;
      }
      X.value = A.rect;
    }
    function Te(A) {
      var et;
      if (!A.selector) return;
      const k = document.querySelector(A.selector);
      if (!k) return;
      const U = k.getBoundingClientRect();
      P.value = [{
        el: k,
        selector: A.selector,
        tag: k.tagName.toLowerCase(),
        text: ((et = k.innerText) == null ? void 0 : et.slice(0, 40)) || "",
        rect: {
          x: U.left,
          y: U.top,
          width: U.width,
          height: U.height
        },
        docRect: {
          x: U.left + window.scrollX,
          y: U.top + window.scrollY,
          width: U.width,
          height: U.height
        }
      }], M.value = [], tt.value = ye(k), S.value = !1;
    }
    function de() {
      P.value = [], M.value = [], tt.value = null, L.value = null;
    }
    function mn() {
      const A = It(), k = gn(), U = P.value[0], et = U != null && U.el ? le(U.el) : null;
      ot.value = {
        type: P.value.length > 0 ? "element" : "viewport",
        title: "",
        severity: "medium",
        suggestion: "",
        targets: k,
        viewport: A.viewport,
        scroll: A.scroll,
        pagePath: A.pagePath,
        pageUrl: A.pageUrl,
        pageName: A.pageName,
        aria: (et == null ? void 0 : et.aria) || null,
        locators: et ? Ie(et) : null
      }, mt.value = [], f.value = !0;
    }
    function gn() {
      const A = [];
      return P.value.forEach((k) => {
        const U = k.el ? le(k.el) : null;
        A.push({
          type: "element",
          selector: k.selector,
          elementText: k.text,
          elementRect: k.docRect || k.rect,
          componentTree: U ? ye(k.el) : null,
          aria: (U == null ? void 0 : U.aria) || null,
          locators: U ? Ie(U) : null
        });
      }), M.value.forEach((k) => {
        A.push({
          type: "viewport",
          viewportRect: k.rect
        });
      }), A;
    }
    function Ie(A) {
      const k = {};
      return A.selector && (k.cssSelector = A.selector), A.xpath && (k.xpath = A.xpath), A.aria && Object.keys(A.aria).length && (k.aria = A.aria), A.testId && (k.testId = A.testId), Object.keys(k).length ? k : null;
    }
    async function vn() {
      const A = [];
      for (const k of mt.value)
        if (k === Lt.TARGETS)
          for (const U of ot.value.targets) {
            let et = null;
            if (U.type === "element" && U.elementRect) {
              const dt = document.querySelector(U.selector);
              dt && (et = await rn(dt));
            } else U.type === "viewport" && U.viewportRect && (et = await Rr(U.viewportRect));
            if (et) {
              const dt = ve(U.type);
              let Et = null;
              F.value && (Et = await we(et, dt, F.value)), A.push({ type: U.type, filename: dt, data: Et ? void 0 : et, url: Et || void 0 });
            }
          }
        else if (k === Lt.VIEWPORT) {
          const U = await Er();
          if (U) {
            const et = ve(Lt.VIEWPORT);
            let dt = null;
            F.value && (dt = await we(U, et, F.value)), A.push({ type: Lt.VIEWPORT, filename: et, data: dt ? void 0 : U, url: dt || void 0 });
          }
        } else if (k === Lt.FULL_PAGE) {
          const U = await Cr();
          if (U) {
            const et = ve(Lt.FULL_PAGE);
            let dt = null;
            F.value && (dt = await we(U, et, F.value)), A.push({ type: Lt.FULL_PAGE, filename: et, data: dt ? void 0 : U, url: dt || void 0 });
          }
        }
      return A;
    }
    function wn() {
      mt.value = [], ot.value = {
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
    async function yn() {
      if (!t.value) return;
      const A = await vn(), k = d({
        type: ot.value.type,
        title: ot.value.title.trim(),
        severity: ot.value.severity,
        suggestion: ot.value.suggestion.trim(),
        targets: ot.value.targets,
        viewport: ot.value.viewport,
        scroll: ot.value.scroll,
        pagePath: ot.value.pagePath,
        pageUrl: ot.value.pageUrl,
        pageName: ot.value.pageName,
        status: "open",
        screenshots: A,
        aria: ot.value.aria,
        locators: ot.value.locators
      });
      f.value = !1, de(), u("add", k);
    }
    function _n(A) {
      _(A, { status: "resolved" }), u("update", { id: A, status: "resolved" });
    }
    function bn(A) {
      window.confirm("确定删除这条评审意见吗？") && (E(A), u("delete", { id: A }));
    }
    function kn() {
      o.value.length !== 0 && window.confirm("确定清空当前页面的所有评审意见吗？") && (b(n.value), u("clear", { pagePath: n.value }));
    }
    function Oe() {
      u("update:active", !1);
    }
    function Pe() {
      document.addEventListener("mousemove", Xt), document.addEventListener("mouseout", Ot), document.addEventListener("click", Qt, !0), document.addEventListener("mousedown", ne), document.addEventListener("mousemove", te), document.addEventListener("mousemove", Ee), document.addEventListener("mousemove", Ce), document.addEventListener("mouseup", Ut), document.addEventListener("keydown", Re), window.addEventListener("scroll", ze, !0);
    }
    function Be() {
      document.removeEventListener("mousemove", Xt), document.removeEventListener("mouseout", Ot), document.removeEventListener("click", Qt, !0), document.removeEventListener("mousedown", ne), document.removeEventListener("mousemove", te), document.removeEventListener("mousemove", Ee), document.removeEventListener("mousemove", Ce), document.removeEventListener("mouseup", Ut), document.removeEventListener("keydown", Re), window.removeEventListener("scroll", ze, !0);
    }
    xn(() => {
      h.active && Pe();
    }), Fe(() => {
      Be();
    });
    let he = null;
    return Le(() => {
      he = De(() => h.active, (A) => {
        A ? (Pe(), m.value = "element") : (Be(), de(), wn(), z.value = null, g.value = !1, S.value = !1);
      });
    }), Fe(() => {
      he && he();
    }), l({
      reviews: s,
      pageReviews: o,
      addReview: d,
      updateReview: _,
      deleteReview: E,
      clearPageReviews: b,
      exportToJSON: y,
      exportToMarkdown: c
    }), (A, k) => {
      var U, et, dt, Et;
      return lt(), Sn(En, { to: "body" }, [
        e.active ? (lt(), ct("div", {
          key: 0,
          class: "review-overlay",
          onClick: fn
        }, [
          Z("div", {
            class: Ht(["review-toolbar", { "is-dragging": O.value }]),
            style: Nt(v.value),
            onClick: k[5] || (k[5] = Pt(() => {
            }, ["stop"])),
            onMousedown: ln
          }, [
            Z("div", jr, [
              k[31] || (k[31] = Z("span", {
                class: "toolbar-title",
                title: "按住此处可拖动"
              }, "页面评审模式", -1)),
              Z("div", $r, [
                Z("label", {
                  class: Ht(["radio-button", { active: m.value === "element" }])
                }, [
                  Bt(Z("input", {
                    "onUpdate:modelValue": k[0] || (k[0] = (V) => m.value = V),
                    type: "radio",
                    name: "review-mode",
                    value: "element"
                  }, null, 512), [
                    [Kt, m.value]
                  ]),
                  k[29] || (k[29] = zt(" 选择元素 ", -1))
                ], 2),
                Z("label", {
                  class: Ht(["radio-button", { active: m.value === "viewport" }])
                }, [
                  Bt(Z("input", {
                    "onUpdate:modelValue": k[1] || (k[1] = (V) => m.value = V),
                    type: "radio",
                    name: "review-mode",
                    value: "viewport"
                  }, null, 512), [
                    [Kt, m.value]
                  ]),
                  k[30] || (k[30] = zt(" 框定视图 ", -1))
                ], 2)
              ])
            ]),
            Z("div", Wr, [
              e.enableComponentTree ? (lt(), ct("button", {
                key: 0,
                class: "btn btn-sm",
                onClick: pn
              }, " 组件树 ")) : kt("", !0),
              Z("button", {
                class: "btn btn-sm btn-primary",
                disabled: Ct.value === 0,
                onClick: mn
              }, " 评审 (" + xt(Ct.value) + ") ", 9, Zr),
              Z("button", {
                class: "btn btn-sm",
                disabled: Ct.value === 0,
                onClick: de
              }, " 取消选择 ", 8, Hr),
              Z("span", Vr, [
                Z("button", {
                  class: "btn btn-sm",
                  onClick: k[2] || (k[2] = (V) => g.value = !0)
                }, "评审列表"),
                o.value.length > 0 ? (lt(), ct("span", Gr, xt(o.value.length), 1)) : kt("", !0)
              ]),
              Z("div", Xr, [
                Z("button", {
                  class: "btn btn-sm btn-primary",
                  onClick: k[3] || (k[3] = (...V) => Dt(c) && Dt(c)(...V))
                }, "导出"),
                Z("button", {
                  class: "btn btn-sm btn-primary dropdown-toggle",
                  onClick: k[4] || (k[4] = Pt((V) => R.value = !R.value, ["stop"]))
                }, "▼"),
                R.value ? (lt(), ct("div", Yr, [
                  Z("button", {
                    class: "dropdown-item",
                    onClick: ht
                  }, "导出为 Markdown"),
                  Z("button", {
                    class: "dropdown-item",
                    onClick: Rt
                  }, "导出为 JSON"),
                  e.enableZipExport ? (lt(), ct("button", {
                    key: 0,
                    class: "dropdown-item",
                    onClick: jt
                  }, "导出为 ZIP")) : kt("", !0)
                ])) : kt("", !0)
              ]),
              Z("button", {
                class: "btn btn-sm btn-danger",
                onClick: Oe
              }, "退出评审")
            ]),
            Z("div", {
              class: "toolbar-resize-handle",
              onMousedown: Pt(un, ["stop"])
            }, null, 32)
          ], 38),
          z.value && m.value === "element" && !a.value && !nt.value ? (lt(), ct("div", {
            key: 0,
            class: "highlight-box hover-box",
            style: Nt(W(z.value))
          }, [
            Z("span", Kr, xt(j.value), 1)
          ], 4)) : kt("", !0),
          (lt(!0), ct(Vt, null, Gt(P.value, (V, wt) => (lt(), ct("div", {
            key: "el-" + wt,
            class: "highlight-box selected-box",
            style: Nt(W(V.rect)),
            onClick: Pt((St) => ce(V, St), ["stop"])
          }, [
            Z("span", Jr, [
              zt(xt(V.tag) + " ", 1),
              Z("i", {
                class: "remove-icon",
                onClick: Pt((St) => ee(V), ["stop"])
              }, "×", 8, Qr)
            ])
          ], 12, qr))), 128)),
          X.value ? (lt(), ct("div", {
            key: 1,
            class: "highlight-box tree-hover-box",
            style: Nt(W($(X.value)))
          }, null, 4)) : kt("", !0),
          (lt(!0), ct(Vt, null, Gt(M.value, (V) => (lt(), ct("div", {
            key: V.id,
            class: Ht(["drag-rect selected-box", { "is-resizing": nt.value === V.id }]),
            style: Nt(T($(V.rect))),
            onMousedown: Pt((wt) => Yt(V, wt), ["stop"])
          }, [
            Z("span", {
              class: "box-label",
              onMousedown: k[6] || (k[6] = Pt(() => {
              }, ["stop"]))
            }, [
              zt(" 框选 " + xt(V.index + 1) + " ", 1),
              Z("i", {
                class: "remove-icon",
                onClick: Pt((wt) => Se(V), ["stop"])
              }, "×", 8, ei)
            ], 32),
            (lt(), ct(Vt, null, Gt(C, (wt) => Z("div", {
              key: wt.position,
              class: Ht(["resize-handle", "handle-" + wt.position]),
              style: Nt(Y(wt.position, V.rect)),
              onMousedown: Pt((St) => sn(V, wt.position, St), ["stop"])
            }, null, 46, ni)), 64))
          ], 46, ti))), 128)),
          L.value ? (lt(), ct("div", {
            key: 2,
            class: "drag-rect preview-box",
            style: Nt(T(L.value))
          }, null, 4)) : kt("", !0),
          f.value ? (lt(), ct("div", {
            key: 3,
            class: "modal-backdrop",
            onClick: k[7] || (k[7] = (V) => f.value = !1)
          })) : kt("", !0),
          f.value ? (lt(), ct("div", {
            key: 4,
            class: Ht(["modal review-modal", { "is-dragging": bt.value }]),
            style: Nt(p.value),
            onClick: k[19] || (k[19] = Pt(() => {
            }, ["stop"]))
          }, [
            Z("div", {
              class: "modal-header",
              onMousedown: cn
            }, [
              k[32] || (k[32] = Z("span", null, "添加评审意见", -1)),
              Z("button", {
                class: "close",
                onClick: k[8] || (k[8] = (V) => f.value = !1)
              }, "×")
            ], 32),
            Z("div", ri, [
              Z("div", ii, [
                Z("div", ai, [
                  k[33] || (k[33] = Z("label", { class: "form-label" }, "评审目标", -1)),
                  Z("div", si, [
                    (lt(!0), ct(Vt, null, Gt(ot.value.targets, (V, wt) => {
                      var St, Wt;
                      return lt(), ct("span", {
                        key: wt,
                        class: "review-tag target-tag"
                      }, xt(V.type === "element" ? V.elementText || V.selector || "元素" : `框选 ${(St = V.viewportRect) == null ? void 0 : St.x},${(Wt = V.viewportRect) == null ? void 0 : Wt.y}`), 1);
                    }), 128))
                  ])
                ]),
                Z("div", oi, [
                  k[34] || (k[34] = Z("label", { class: "form-label" }, "窗口尺寸", -1)),
                  Z("span", li, xt((U = ot.value.viewport) == null ? void 0 : U.width) + " × " + xt((et = ot.value.viewport) == null ? void 0 : et.height), 1)
                ]),
                Z("div", ui, [
                  k[35] || (k[35] = Z("label", { class: "form-label" }, "滚动位置", -1)),
                  Z("span", ci, "x=" + xt((dt = ot.value.scroll) == null ? void 0 : dt.x) + ", y=" + xt((Et = ot.value.scroll) == null ? void 0 : Et.y), 1)
                ]),
                Z("div", di, [
                  k[39] || (k[39] = Z("label", { class: "form-label" }, "截图", -1)),
                  Z("div", hi, [
                    Z("label", fi, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[9] || (k[9] = (V) => mt.value = V),
                        type: "checkbox",
                        value: Dt(Lt).TARGETS
                      }, null, 8, pi), [
                        [fe, mt.value]
                      ]),
                      k[36] || (k[36] = zt(" 选中目标 ", -1))
                    ]),
                    Z("label", mi, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[10] || (k[10] = (V) => mt.value = V),
                        type: "checkbox",
                        value: Dt(Lt).VIEWPORT
                      }, null, 8, gi), [
                        [fe, mt.value]
                      ]),
                      k[37] || (k[37] = zt(" 当前视口 ", -1))
                    ]),
                    Z("label", vi, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[11] || (k[11] = (V) => mt.value = V),
                        type: "checkbox",
                        value: Dt(Lt).FULL_PAGE
                      }, null, 8, wi), [
                        [fe, mt.value]
                      ]),
                      k[38] || (k[38] = zt(" 完整页面 ", -1))
                    ])
                  ])
                ]),
                Z("div", yi, [
                  k[40] || (k[40] = Z("label", { class: "form-label" }, [
                    zt("标题 "),
                    Z("span", { class: "required" }, "*")
                  ], -1)),
                  Bt(Z("input", {
                    "onUpdate:modelValue": k[12] || (k[12] = (V) => ot.value.title = V),
                    class: "form-input",
                    placeholder: "例如：按钮样式不统一"
                  }, null, 512), [
                    [Ne, ot.value.title]
                  ])
                ]),
                Z("div", _i, [
                  k[45] || (k[45] = Z("label", { class: "form-label" }, [
                    zt("严重等级 "),
                    Z("span", { class: "required" }, "*")
                  ], -1)),
                  Z("div", bi, [
                    Z("label", ki, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[13] || (k[13] = (V) => ot.value.severity = V),
                        type: "radio",
                        value: "low"
                      }, null, 512), [
                        [Kt, ot.value.severity]
                      ]),
                      k[41] || (k[41] = zt(" 低 ", -1))
                    ]),
                    Z("label", xi, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[14] || (k[14] = (V) => ot.value.severity = V),
                        type: "radio",
                        value: "medium"
                      }, null, 512), [
                        [Kt, ot.value.severity]
                      ]),
                      k[42] || (k[42] = zt(" 中 ", -1))
                    ]),
                    Z("label", Si, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[15] || (k[15] = (V) => ot.value.severity = V),
                        type: "radio",
                        value: "high"
                      }, null, 512), [
                        [Kt, ot.value.severity]
                      ]),
                      k[43] || (k[43] = zt(" 高 ", -1))
                    ]),
                    Z("label", Ei, [
                      Bt(Z("input", {
                        "onUpdate:modelValue": k[16] || (k[16] = (V) => ot.value.severity = V),
                        type: "radio",
                        value: "critical"
                      }, null, 512), [
                        [Kt, ot.value.severity]
                      ]),
                      k[44] || (k[44] = zt(" 严重 ", -1))
                    ])
                  ])
                ]),
                Z("div", Ci, [
                  k[46] || (k[46] = Z("label", { class: "form-label" }, [
                    zt("评审建议 "),
                    Z("span", { class: "required" }, "*")
                  ], -1)),
                  Bt(Z("textarea", {
                    "onUpdate:modelValue": k[17] || (k[17] = (V) => ot.value.suggestion = V),
                    class: "form-textarea",
                    rows: "4",
                    placeholder: "描述问题现象、影响和改进建议"
                  }, null, 512), [
                    [Ne, ot.value.suggestion]
                  ])
                ])
              ])
            ]),
            Z("div", Ri, [
              Z("button", {
                class: "btn",
                onClick: k[18] || (k[18] = (V) => f.value = !1)
              }, "取消"),
              Z("button", {
                class: "btn btn-primary",
                disabled: !t.value,
                onClick: yn
              }, "保存评审", 8, zi)
            ]),
            Z("div", {
              class: "modal-resize-handle",
              onMousedown: Pt(dn, ["stop"])
            }, null, 32)
          ], 6)) : kt("", !0),
          S.value ? (lt(), ct("div", {
            key: 5,
            class: "drawer-backdrop",
            onClick: k[20] || (k[20] = (V) => S.value = !1)
          })) : kt("", !0),
          S.value ? (lt(), ct("div", Ai, [
            Z("div", Ti, [
              k[47] || (k[47] = Z("span", null, "组件树检查器", -1)),
              Z("button", {
                class: "close",
                onClick: k[21] || (k[21] = (V) => S.value = !1)
              }, "×")
            ]),
            Z("div", Ii, [
              tt.value ? (lt(), ct("div", Pi, [
                tt.value.framework && tt.value.framework.length ? (lt(), ct("div", Bi, [
                  k[48] || (k[48] = Z("h4", null, "框架组件树", -1)),
                  Z("div", Di, [
                    (lt(!0), ct(Vt, null, Gt(tt.value.framework, (V, wt) => (lt(), ct("div", {
                      key: "fw-" + wt,
                      class: "tree-node",
                      onMouseenter: (St) => Ae(V),
                      onMouseleave: k[22] || (k[22] = (St) => X.value = null),
                      onClick: (St) => Te(V)
                    }, [
                      Z("span", Fi, xt(V.componentName), 1)
                    ], 40, Li))), 128))
                  ])
                ])) : kt("", !0),
                Z("div", Ni, [
                  k[49] || (k[49] = Z("h4", null, "DOM 树", -1)),
                  Z("div", Ui, [
                    (lt(!0), ct(Vt, null, Gt(tt.value.dom, (V, wt) => {
                      var St;
                      return lt(), ct("div", {
                        key: "dom-" + wt,
                        class: "tree-node",
                        style: Nt({ paddingLeft: wt * 12 + "px" }),
                        onMouseenter: (Wt) => Ae(V),
                        onMouseleave: k[23] || (k[23] = (Wt) => X.value = null),
                        onClick: (Wt) => Te(V)
                      }, [
                        Z("span", ji, xt(V.tag), 1),
                        V.id ? (lt(), ct("span", $i, "#" + xt(V.id), 1)) : kt("", !0),
                        (St = V.aria) != null && St.role ? (lt(), ct("span", Wi, "role=" + xt(V.aria.role), 1)) : kt("", !0),
                        V.testId ? (lt(), ct("span", Zi, "testid=" + xt(V.testId), 1)) : kt("", !0)
                      ], 44, Mi);
                    }), 128))
                  ])
                ])
              ])) : (lt(), ct("div", Oi, "先选择一个元素以查看组件树"))
            ])
          ])) : kt("", !0),
          g.value ? (lt(), ct("div", {
            key: 7,
            class: "drawer-backdrop",
            onClick: k[24] || (k[24] = (V) => g.value = !1)
          })) : kt("", !0),
          g.value ? (lt(), ct("div", Hi, [
            Z("div", Vi, [
              k[50] || (k[50] = Z("span", null, "当前页面评审意见", -1)),
              Z("button", {
                class: "close",
                onClick: k[25] || (k[25] = (V) => g.value = !1)
              }, "×")
            ]),
            Z("div", Gi, [
              Z("div", Xi, [
                Z("button", {
                  class: "btn btn-sm btn-primary",
                  onClick: k[26] || (k[26] = (...V) => Dt(c) && Dt(c)(...V))
                }, "导出 Markdown"),
                Z("button", {
                  class: "btn btn-sm",
                  onClick: k[27] || (k[27] = (...V) => Dt(y) && Dt(y)(...V))
                }, "导出 JSON"),
                e.enableZipExport ? (lt(), ct("button", {
                  key: 0,
                  class: "btn btn-sm",
                  onClick: k[28] || (k[28] = (...V) => Dt(w) && Dt(w)(...V))
                }, "导出 ZIP")) : kt("", !0),
                Z("button", {
                  class: "btn btn-sm btn-danger btn-text",
                  onClick: kn
                }, "清空本页")
              ]),
              o.value.length === 0 ? (lt(), ct("div", Yi, "暂无评审意见")) : (lt(), ct("div", Ki, [
                (lt(!0), ct(Vt, null, Gt(o.value, (V) => {
                  var wt;
                  return lt(), ct("div", {
                    key: V.id,
                    class: "review-card review-item"
                  }, [
                    Z("div", qi, [
                      Z("span", Ji, xt(V.title), 1),
                      Z("div", Qi, [
                        Z("span", {
                          class: Ht(["review-tag", "tag-" + Q(V.severity)])
                        }, xt(K(V.severity)), 3),
                        Z("span", ta, xt(((wt = V.targets) == null ? void 0 : wt.length) || 1) + " 个目标", 1),
                        it(V) ? (lt(), ct("span", ea, "树")) : kt("", !0)
                      ])
                    ]),
                    Z("p", na, xt(vt(V.targets)), 1),
                    Z("p", ra, xt(V.suggestion), 1),
                    Z("div", ia, [
                      Z("span", aa, xt(new Date(V.createdAt).toLocaleString()), 1),
                      Z("div", sa, [
                        V.status !== "resolved" ? (lt(), ct("button", {
                          key: 0,
                          class: "btn btn-sm btn-text btn-primary",
                          onClick: (St) => _n(V.id)
                        }, "标记解决", 8, oa)) : kt("", !0),
                        Z("button", {
                          class: "btn btn-sm btn-text btn-danger",
                          onClick: (St) => bn(V.id)
                        }, "删除", 8, la)
                      ])
                    ])
                  ]);
                }), 128))
              ]))
            ])
          ])) : kt("", !0)
        ])) : kt("", !0)
      ]);
    };
  }
};
export {
  ca as ReviewTool,
  ca as default,
  An as usePageReview
};
