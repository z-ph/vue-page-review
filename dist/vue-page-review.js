import { Fragment as e, Teleport as t, computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, normalizeClass as l, normalizeStyle as u, onMounted as d, openBlock as f, ref as p, renderList as m, toDisplayString as h, unref as g, watch as _, watchEffect as v, withCtx as y, withModifiers as b } from "vue";
import { ElBadge as x, ElButton as S, ElCard as C, ElCheckbox as w, ElCheckboxGroup as T, ElDialog as E, ElDrawer as D, ElDropdown as O, ElDropdownItem as k, ElDropdownMenu as A, ElEmpty as j, ElIcon as M, ElInput as N, ElOption as P, ElRadioButton as F, ElRadioGroup as I, ElSelect as L, ElTag as R } from "element-plus";
import { ArrowDown as z } from "@element-plus/icons-vue";
//#region \0rolldown/runtime.js
var B = Object.create, V = Object.defineProperty, H = Object.getOwnPropertyDescriptor, U = Object.getOwnPropertyNames, W = Object.getPrototypeOf, G = Object.prototype.hasOwnProperty, ee = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), te = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = U(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !G.call(e, s) && s !== n && V(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = H(t, s)) || r.enumerable
	});
	return e;
}, ne = (e, t, n) => (n = e == null ? {} : B(W(e)), te(t || !e || !e.__esModule ? V(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), re = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), ie = /* @__PURE__ */ ne((/* @__PURE__ */ ee(((e, t) => {
	(function(n) {
		typeof e == "object" && t !== void 0 ? t.exports = n() : typeof define == "function" && define.amd ? define([], n) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).JSZip = n();
	})(function() {
		return function e(t, n, r) {
			function i(o, s) {
				if (!n[o]) {
					if (!t[o]) {
						var c = typeof re == "function" && re;
						if (!s && c) return c(o, !0);
						if (a) return a(o, !0);
						var l = /* @__PURE__ */ Error("Cannot find module '" + o + "'");
						throw l.code = "MODULE_NOT_FOUND", l;
					}
					var u = n[o] = { exports: {} };
					t[o][0].call(u.exports, function(e) {
						var n = t[o][1][e];
						return i(n || e);
					}, u, u.exports, e, t, n, r);
				}
				return n[o].exports;
			}
			for (var a = typeof re == "function" && re, o = 0; o < r.length; o++) i(r[o]);
			return i;
		}({
			1: [function(e, t, n) {
				var r = e("./utils"), i = e("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				n.encode = function(e) {
					for (var t, n, i, o, s, c, l, u = [], d = 0, f = e.length, p = f, m = r.getTypeOf(e) !== "string"; d < e.length;) p = f - d, i = m ? (t = e[d++], n = d < f ? e[d++] : 0, d < f ? e[d++] : 0) : (t = e.charCodeAt(d++), n = d < f ? e.charCodeAt(d++) : 0, d < f ? e.charCodeAt(d++) : 0), o = t >> 2, s = (3 & t) << 4 | n >> 4, c = 1 < p ? (15 & n) << 2 | i >> 6 : 64, l = 2 < p ? 63 & i : 64, u.push(a.charAt(o) + a.charAt(s) + a.charAt(c) + a.charAt(l));
					return u.join("");
				}, n.decode = function(e) {
					var t, n, r, o, s, c, l = 0, u = 0, d = "data:";
					if (e.substr(0, d.length) === d) throw Error("Invalid base64 input, it looks like a data url.");
					var f, p = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
					if (e.charAt(e.length - 1) === a.charAt(64) && p--, e.charAt(e.length - 2) === a.charAt(64) && p--, p % 1 != 0) throw Error("Invalid base64 input, bad content length.");
					for (f = i.uint8array ? new Uint8Array(0 | p) : Array(0 | p); l < e.length;) t = a.indexOf(e.charAt(l++)) << 2 | (o = a.indexOf(e.charAt(l++))) >> 4, n = (15 & o) << 4 | (s = a.indexOf(e.charAt(l++))) >> 2, r = (3 & s) << 6 | (c = a.indexOf(e.charAt(l++))), f[u++] = t, s !== 64 && (f[u++] = n), c !== 64 && (f[u++] = r);
					return f;
				};
			}, {
				"./support": 30,
				"./utils": 32
			}],
			2: [function(e, t, n) {
				var r = e("./external"), i = e("./stream/DataWorker"), a = e("./stream/Crc32Probe"), o = e("./stream/DataLengthProbe");
				function s(e, t, n, r, i) {
					this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
				}
				s.prototype = {
					getContentWorker: function() {
						var e = new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), t = this;
						return e.on("end", function() {
							if (this.streamInfo.data_length !== t.uncompressedSize) throw Error("Bug : uncompressed data size mismatch");
						}), e;
					},
					getCompressedWorker: function() {
						return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
					}
				}, s.createWorkerFrom = function(e, t, n) {
					return e.pipe(new a()).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t);
				}, t.exports = s;
			}, {
				"./external": 6,
				"./stream/Crc32Probe": 25,
				"./stream/DataLengthProbe": 26,
				"./stream/DataWorker": 27
			}],
			3: [function(e, t, n) {
				var r = e("./stream/GenericWorker");
				n.STORE = {
					magic: "\0\0",
					compressWorker: function() {
						return new r("STORE compression");
					},
					uncompressWorker: function() {
						return new r("STORE decompression");
					}
				}, n.DEFLATE = e("./flate");
			}, {
				"./flate": 7,
				"./stream/GenericWorker": 28
			}],
			4: [function(e, t, n) {
				var r = e("./utils"), i = function() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}();
				t.exports = function(e, t) {
					return e !== void 0 && e.length ? r.getTypeOf(e) === "string" ? function(e, t, n, r) {
						var a = i, o = r + n;
						e ^= -1;
						for (var s = r; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t.charCodeAt(s))];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : function(e, t, n, r) {
						var a = i, o = r + n;
						e ^= -1;
						for (var s = r; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : 0;
				};
			}, { "./utils": 32 }],
			5: [function(e, t, n) {
				n.base64 = !1, n.binary = !1, n.dir = !1, n.createFolders = !0, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null;
			}, {}],
			6: [function(e, t, n) {
				var r = null;
				r = typeof Promise < "u" ? Promise : e("lie"), t.exports = { Promise: r };
			}, { lie: 37 }],
			7: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", i = e("pako"), a = e("./utils"), o = e("./stream/GenericWorker"), s = r ? "uint8array" : "array";
				function c(e, t) {
					o.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
				}
				n.magic = "\b\0", a.inherits(c, o), c.prototype.processChunk = function(e) {
					this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(s, e.data), !1);
				}, c.prototype.flush = function() {
					o.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
				}, c.prototype.cleanUp = function() {
					o.prototype.cleanUp.call(this), this._pako = null;
				}, c.prototype._createPako = function() {
					this._pako = new i[this._pakoAction]({
						raw: !0,
						level: this._pakoOptions.level || -1
					});
					var e = this;
					this._pako.onData = function(t) {
						e.push({
							data: t,
							meta: e.meta
						});
					};
				}, n.compressWorker = function(e) {
					return new c("Deflate", e);
				}, n.uncompressWorker = function() {
					return new c("Inflate", {});
				};
			}, {
				"./stream/GenericWorker": 28,
				"./utils": 32,
				pako: 38
			}],
			8: [function(e, t, n) {
				function r(e, t) {
					var n, r = "";
					for (n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
					return r;
				}
				function i(e, t, n, i, o, u) {
					var d, f, p = e.file, m = e.compression, h = u !== s.utf8encode, g = a.transformTo("string", u(p.name)), _ = a.transformTo("string", s.utf8encode(p.name)), v = p.comment, y = a.transformTo("string", u(v)), b = a.transformTo("string", s.utf8encode(v)), x = _.length !== p.name.length, S = b.length !== v.length, C = "", w = "", T = "", E = p.dir, D = p.date, O = {
						crc32: 0,
						compressedSize: 0,
						uncompressedSize: 0
					};
					t && !n || (O.crc32 = e.crc32, O.compressedSize = e.compressedSize, O.uncompressedSize = e.uncompressedSize);
					var k = 0;
					t && (k |= 8), h || !x && !S || (k |= 2048);
					var A = 0, j = 0;
					E && (A |= 16), o === "UNIX" ? (j = 798, A |= function(e, t) {
						var n = e;
						return e || (n = t ? 16893 : 33204), (65535 & n) << 16;
					}(p.unixPermissions, E)) : (j = 20, A |= function(e) {
						return 63 & (e || 0);
					}(p.dosPermissions)), d = D.getUTCHours(), d <<= 6, d |= D.getUTCMinutes(), d <<= 5, d |= D.getUTCSeconds() / 2, f = D.getUTCFullYear() - 1980, f <<= 4, f |= D.getUTCMonth() + 1, f <<= 5, f |= D.getUTCDate(), x && (w = r(1, 1) + r(c(g), 4) + _, C += "up" + r(w.length, 2) + w), S && (T = r(1, 1) + r(c(y), 4) + b, C += "uc" + r(T.length, 2) + T);
					var M = "";
					return M += "\n\0", M += r(k, 2), M += m.magic, M += r(d, 2), M += r(f, 2), M += r(O.crc32, 4), M += r(O.compressedSize, 4), M += r(O.uncompressedSize, 4), M += r(g.length, 2), M += r(C.length, 2), {
						fileRecord: l.LOCAL_FILE_HEADER + M + g + C,
						dirRecord: l.CENTRAL_FILE_HEADER + r(j, 2) + M + r(y.length, 2) + "\0\0\0\0" + r(A, 4) + r(i, 4) + g + C + y
					};
				}
				var a = e("../utils"), o = e("../stream/GenericWorker"), s = e("../utf8"), c = e("../crc32"), l = e("../signature");
				function u(e, t, n, r) {
					o.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
				}
				a.inherits(u, o), u.prototype.push = function(e) {
					var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
					this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, o.prototype.push.call(this, {
						data: e.data,
						meta: {
							currentFile: this.currentFile,
							percent: n ? (t + 100 * (n - r - 1)) / n : 100
						}
					}));
				}, u.prototype.openedSource = function(e) {
					this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
					var t = this.streamFiles && !e.file.dir;
					if (t) {
						var n = i(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
						this.push({
							data: n.fileRecord,
							meta: { percent: 0 }
						});
					} else this.accumulate = !0;
				}, u.prototype.closedSource = function(e) {
					this.accumulate = !1;
					var t = this.streamFiles && !e.file.dir, n = i(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
					if (this.dirRecords.push(n.dirRecord), t) this.push({
						data: function(e) {
							return l.DATA_DESCRIPTOR + r(e.crc32, 4) + r(e.compressedSize, 4) + r(e.uncompressedSize, 4);
						}(e),
						meta: { percent: 100 }
					});
					else for (this.push({
						data: n.fileRecord,
						meta: { percent: 0 }
					}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
					this.currentFile = null;
				}, u.prototype.flush = function() {
					for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
						data: this.dirRecords[t],
						meta: { percent: 100 }
					});
					var n = this.bytesWritten - e, i = function(e, t, n, i, o) {
						var s = a.transformTo("string", o(i));
						return l.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(e, 2) + r(e, 2) + r(t, 4) + r(n, 4) + r(s.length, 2) + s;
					}(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
					this.push({
						data: i,
						meta: { percent: 100 }
					});
				}, u.prototype.prepareNextSource = function() {
					this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
				}, u.prototype.registerPrevious = function(e) {
					this._sources.push(e);
					var t = this;
					return e.on("data", function(e) {
						t.processChunk(e);
					}), e.on("end", function() {
						t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
					}), e.on("error", function(e) {
						t.error(e);
					}), this;
				}, u.prototype.resume = function() {
					return !!o.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
				}, u.prototype.error = function(e) {
					var t = this._sources;
					if (!o.prototype.error.call(this, e)) return !1;
					for (var n = 0; n < t.length; n++) try {
						t[n].error(e);
					} catch {}
					return !0;
				}, u.prototype.lock = function() {
					o.prototype.lock.call(this);
					for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
				}, t.exports = u;
			}, {
				"../crc32": 4,
				"../signature": 23,
				"../stream/GenericWorker": 28,
				"../utf8": 31,
				"../utils": 32
			}],
			9: [function(e, t, n) {
				var r = e("../compressions"), i = e("./ZipFileWorker");
				n.generateWorker = function(e, t, n) {
					var a = new i(t.streamFiles, n, t.platform, t.encodeFileName), o = 0;
					try {
						e.forEach(function(e, n) {
							o++;
							var i = function(e, t) {
								var n = e || t, i = r[n];
								if (!i) throw Error(n + " is not a valid compression method !");
								return i;
							}(n.options.compression, t.compression), s = n.options.compressionOptions || t.compressionOptions || {}, c = n.dir, l = n.date;
							n._compressWorker(i, s).withStreamInfo("file", {
								name: e,
								dir: c,
								date: l,
								comment: n.comment || "",
								unixPermissions: n.unixPermissions,
								dosPermissions: n.dosPermissions
							}).pipe(a);
						}), a.entriesCount = o;
					} catch (e) {
						a.error(e);
					}
					return a;
				};
			}, {
				"../compressions": 3,
				"./ZipFileWorker": 8
			}],
			10: [function(e, t, n) {
				function r() {
					if (!(this instanceof r)) return new r();
					if (arguments.length) throw Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
					this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
						var e = new r();
						for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
						return e;
					};
				}
				(r.prototype = e("./object")).loadAsync = e("./load"), r.support = e("./support"), r.defaults = e("./defaults"), r.version = "3.10.1", r.loadAsync = function(e, t) {
					return new r().loadAsync(e, t);
				}, r.external = e("./external"), t.exports = r;
			}, {
				"./defaults": 5,
				"./external": 6,
				"./load": 11,
				"./object": 15,
				"./support": 30
			}],
			11: [function(e, t, n) {
				var r = e("./utils"), i = e("./external"), a = e("./utf8"), o = e("./zipEntries"), s = e("./stream/Crc32Probe"), c = e("./nodejsUtils");
				function l(e) {
					return new i.Promise(function(t, n) {
						var r = e.decompressed.getContentWorker().pipe(new s());
						r.on("error", function(e) {
							n(e);
						}).on("end", function() {
							r.streamInfo.crc32 === e.decompressed.crc32 ? t() : n(/* @__PURE__ */ Error("Corrupted zip : CRC32 mismatch"));
						}).resume();
					});
				}
				t.exports = function(e, t) {
					var n = this;
					return t = r.extend(t || {}, {
						base64: !1,
						checkCRC32: !1,
						optimizedBinaryString: !1,
						createFolders: !1,
						decodeFileName: a.utf8decode
					}), c.isNode && c.isStream(e) ? i.Promise.reject(/* @__PURE__ */ Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
						var n = new o(t);
						return n.load(e), n;
					}).then(function(e) {
						var n = [i.Promise.resolve(e)], r = e.files;
						if (t.checkCRC32) for (var a = 0; a < r.length; a++) n.push(l(r[a]));
						return i.Promise.all(n);
					}).then(function(e) {
						for (var i = e.shift(), a = i.files, o = 0; o < a.length; o++) {
							var s = a[o], c = s.fileNameStr, l = r.resolve(s.fileNameStr);
							n.file(l, s.decompressed, {
								binary: !0,
								optimizedBinaryString: !0,
								date: s.date,
								dir: s.dir,
								comment: s.fileCommentStr.length ? s.fileCommentStr : null,
								unixPermissions: s.unixPermissions,
								dosPermissions: s.dosPermissions,
								createFolders: t.createFolders
							}), s.dir || (n.file(l).unsafeOriginalName = c);
						}
						return i.zipComment.length && (n.comment = i.zipComment), n;
					});
				};
			}, {
				"./external": 6,
				"./nodejsUtils": 14,
				"./stream/Crc32Probe": 25,
				"./utf8": 31,
				"./utils": 32,
				"./zipEntries": 33
			}],
			12: [function(e, t, n) {
				var r = e("../utils"), i = e("../stream/GenericWorker");
				function a(e, t) {
					i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
				}
				r.inherits(a, i), a.prototype._bindStream = function(e) {
					var t = this;
					(this._stream = e).pause(), e.on("data", function(e) {
						t.push({
							data: e,
							meta: { percent: 0 }
						});
					}).on("error", function(e) {
						t.isPaused ? this.generatedError = e : t.error(e);
					}).on("end", function() {
						t.isPaused ? t._upstreamEnded = !0 : t.end();
					});
				}, a.prototype.pause = function() {
					return !!i.prototype.pause.call(this) && (this._stream.pause(), !0);
				}, a.prototype.resume = function() {
					return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
				}, t.exports = a;
			}, {
				"../stream/GenericWorker": 28,
				"../utils": 32
			}],
			13: [function(e, t, n) {
				var r = e("readable-stream").Readable;
				function i(e, t, n) {
					r.call(this, t), this._helper = e;
					var i = this;
					e.on("data", function(e, t) {
						i.push(e) || i._helper.pause(), n && n(t);
					}).on("error", function(e) {
						i.emit("error", e);
					}).on("end", function() {
						i.push(null);
					});
				}
				e("../utils").inherits(i, r), i.prototype._read = function() {
					this._helper.resume();
				}, t.exports = i;
			}, {
				"../utils": 32,
				"readable-stream": 16
			}],
			14: [function(e, t, n) {
				t.exports = {
					isNode: typeof Buffer < "u",
					newBufferFrom: function(e, t) {
						if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
						if (typeof e == "number") throw Error("The \"data\" argument must not be a number");
						return new Buffer(e, t);
					},
					allocBuffer: function(e) {
						if (Buffer.alloc) return Buffer.alloc(e);
						var t = new Buffer(e);
						return t.fill(0), t;
					},
					isBuffer: function(e) {
						return Buffer.isBuffer(e);
					},
					isStream: function(e) {
						return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
					}
				};
			}, {}],
			15: [function(e, t, n) {
				function r(e, t, n) {
					var r, i = a.getTypeOf(t), s = a.extend(n || {}, c);
					s.date = s.date || /* @__PURE__ */ new Date(), s.compression !== null && (s.compression = s.compression.toUpperCase()), typeof s.unixPermissions == "string" && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (e = h(e)), s.createFolders && (r = m(e)) && g.call(this, r, !0);
					var d = i === "string" && !1 === s.binary && !1 === s.base64;
					n && n.binary !== void 0 || (s.binary = !d), (t instanceof l && t.uncompressedSize === 0 || s.dir || !t || t.length === 0) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string");
					var _ = null;
					_ = t instanceof l || t instanceof o ? t : f.isNode && f.isStream(t) ? new p(e, t) : a.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
					var v = new u(e, _, s);
					this.files[e] = v;
				}
				var i = e("./utf8"), a = e("./utils"), o = e("./stream/GenericWorker"), s = e("./stream/StreamHelper"), c = e("./defaults"), l = e("./compressedObject"), u = e("./zipObject"), d = e("./generate"), f = e("./nodejsUtils"), p = e("./nodejs/NodejsStreamInputAdapter"), m = function(e) {
					e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
					var t = e.lastIndexOf("/");
					return 0 < t ? e.substring(0, t) : "";
				}, h = function(e) {
					return e.slice(-1) !== "/" && (e += "/"), e;
				}, g = function(e, t) {
					return t = t === void 0 ? c.createFolders : t, e = h(e), this.files[e] || r.call(this, e, null, {
						dir: !0,
						createFolders: t
					}), this.files[e];
				};
				function _(e) {
					return Object.prototype.toString.call(e) === "[object RegExp]";
				}
				t.exports = {
					load: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					forEach: function(e) {
						var t, n, r;
						for (t in this.files) r = this.files[t], (n = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(n, r);
					},
					filter: function(e) {
						var t = [];
						return this.forEach(function(n, r) {
							e(n, r) && t.push(r);
						}), t;
					},
					file: function(e, t, n) {
						if (arguments.length !== 1) return e = this.root + e, r.call(this, e, t, n), this;
						if (_(e)) {
							var i = e;
							return this.filter(function(e, t) {
								return !t.dir && i.test(e);
							});
						}
						var a = this.files[this.root + e];
						return a && !a.dir ? a : null;
					},
					folder: function(e) {
						if (!e) return this;
						if (_(e)) return this.filter(function(t, n) {
							return n.dir && e.test(t);
						});
						var t = this.root + e, n = g.call(this, t), r = this.clone();
						return r.root = n.name, r;
					},
					remove: function(e) {
						e = this.root + e;
						var t = this.files[e];
						if (t ||= (e.slice(-1) !== "/" && (e += "/"), this.files[e]), t && !t.dir) delete this.files[e];
						else for (var n = this.filter(function(t, n) {
							return n.name.slice(0, e.length) === e;
						}), r = 0; r < n.length; r++) delete this.files[n[r].name];
						return this;
					},
					generate: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					generateInternalStream: function(e) {
						var t, n = {};
						try {
							if ((n = a.extend(e || {}, {
								streamFiles: !1,
								compression: "STORE",
								compressionOptions: null,
								type: "",
								platform: "DOS",
								comment: null,
								mimeType: "application/zip",
								encodeFileName: i.utf8encode
							})).type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type) throw Error("No output type specified.");
							a.checkSupport(n.type), n.platform !== "darwin" && n.platform !== "freebsd" && n.platform !== "linux" && n.platform !== "sunos" || (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
							var r = n.comment || this.comment || "";
							t = d.generateWorker(this, n, r);
						} catch (e) {
							(t = new o("error")).error(e);
						}
						return new s(t, n.type || "string", n.mimeType);
					},
					generateAsync: function(e, t) {
						return this.generateInternalStream(e).accumulate(t);
					},
					generateNodeStream: function(e, t) {
						return (e ||= {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
					}
				};
			}, {
				"./compressedObject": 2,
				"./defaults": 5,
				"./generate": 9,
				"./nodejs/NodejsStreamInputAdapter": 12,
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31,
				"./utils": 32,
				"./zipObject": 35
			}],
			16: [function(e, t, n) {
				t.exports = e("stream");
			}, { stream: void 0 }],
			17: [function(e, t, n) {
				var r = e("./DataReader");
				function i(e) {
					r.call(this, e);
					for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
				}
				e("../utils").inherits(i, r), i.prototype.byteAt = function(e) {
					return this.data[this.zero + e];
				}, i.prototype.lastIndexOfSignature = function(e) {
					for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; 0 <= a; --a) if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i) return a - this.zero;
					return -1;
				}, i.prototype.readAndCheckSignature = function(e) {
					var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
					return t === a[0] && n === a[1] && r === a[2] && i === a[3];
				}, i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return [];
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			18: [function(e, t, n) {
				var r = e("../utils");
				function i(e) {
					this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
				}
				i.prototype = {
					checkOffset: function(e) {
						this.checkIndex(this.index + e);
					},
					checkIndex: function(e) {
						if (this.length < this.zero + e || e < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
					},
					setIndex: function(e) {
						this.checkIndex(e), this.index = e;
					},
					skip: function(e) {
						this.setIndex(this.index + e);
					},
					byteAt: function() {},
					readInt: function(e) {
						var t, n = 0;
						for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) n = (n << 8) + this.byteAt(t);
						return this.index += e, n;
					},
					readString: function(e) {
						return r.transformTo("string", this.readData(e));
					},
					readData: function() {},
					lastIndexOfSignature: function() {},
					readAndCheckSignature: function() {},
					readDate: function() {
						var e = this.readInt(4);
						return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
					}
				}, t.exports = i;
			}, { "../utils": 32 }],
			19: [function(e, t, n) {
				var r = e("./Uint8ArrayReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./Uint8ArrayReader": 21
			}],
			20: [function(e, t, n) {
				var r = e("./DataReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.byteAt = function(e) {
					return this.data.charCodeAt(this.zero + e);
				}, i.prototype.lastIndexOfSignature = function(e) {
					return this.data.lastIndexOf(e) - this.zero;
				}, i.prototype.readAndCheckSignature = function(e) {
					return e === this.readData(4);
				}, i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			21: [function(e, t, n) {
				var r = e("./ArrayReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return /* @__PURE__ */ new Uint8Array();
					var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./ArrayReader": 17
			}],
			22: [function(e, t, n) {
				var r = e("../utils"), i = e("../support"), a = e("./ArrayReader"), o = e("./StringReader"), s = e("./NodeBufferReader"), c = e("./Uint8ArrayReader");
				t.exports = function(e) {
					var t = r.getTypeOf(e);
					return r.checkSupport(t), t !== "string" || i.uint8array ? t === "nodebuffer" ? new s(e) : i.uint8array ? new c(r.transformTo("uint8array", e)) : new a(r.transformTo("array", e)) : new o(e);
				};
			}, {
				"../support": 30,
				"../utils": 32,
				"./ArrayReader": 17,
				"./NodeBufferReader": 19,
				"./StringReader": 20,
				"./Uint8ArrayReader": 21
			}],
			23: [function(e, t, n) {
				n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK\x07\b";
			}, {}],
			24: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../utils");
				function a(e) {
					r.call(this, "ConvertWorker to " + e), this.destType = e;
				}
				i.inherits(a, r), a.prototype.processChunk = function(e) {
					this.push({
						data: i.transformTo(this.destType, e.data),
						meta: e.meta
					});
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			25: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../crc32");
				function a() {
					r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
				}
				e("../utils").inherits(a, r), a.prototype.processChunk = function(e) {
					this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
				}, t.exports = a;
			}, {
				"../crc32": 4,
				"../utils": 32,
				"./GenericWorker": 28
			}],
			26: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker");
				function a(e) {
					i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
				}
				r.inherits(a, i), a.prototype.processChunk = function(e) {
					if (e) {
						var t = this.streamInfo[this.propName] || 0;
						this.streamInfo[this.propName] = t + e.data.length;
					}
					i.prototype.processChunk.call(this, e);
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			27: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker");
				function a(e) {
					i.call(this, "DataWorker");
					var t = this;
					this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
						t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat();
					}, function(e) {
						t.error(e);
					});
				}
				r.inherits(a, i), a.prototype.cleanUp = function() {
					i.prototype.cleanUp.call(this), this.data = null;
				}, a.prototype.resume = function() {
					return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0);
				}, a.prototype._tickAndRepeat = function() {
					this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
				}, a.prototype._tick = function() {
					if (this.isPaused || this.isFinished) return !1;
					var e = null, t = Math.min(this.max, this.index + 16384);
					if (this.index >= this.max) return this.end();
					switch (this.type) {
						case "string":
							e = this.data.substring(this.index, t);
							break;
						case "uint8array":
							e = this.data.subarray(this.index, t);
							break;
						case "array":
						case "nodebuffer": e = this.data.slice(this.index, t);
					}
					return this.index = t, this.push({
						data: e,
						meta: { percent: this.max ? this.index / this.max * 100 : 0 }
					});
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			28: [function(e, t, n) {
				function r(e) {
					this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
						data: [],
						end: [],
						error: []
					}, this.previous = null;
				}
				r.prototype = {
					push: function(e) {
						this.emit("data", e);
					},
					end: function() {
						if (this.isFinished) return !1;
						this.flush();
						try {
							this.emit("end"), this.cleanUp(), this.isFinished = !0;
						} catch (e) {
							this.emit("error", e);
						}
						return !0;
					},
					error: function(e) {
						return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
					},
					on: function(e, t) {
						return this._listeners[e].push(t), this;
					},
					cleanUp: function() {
						this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
					},
					emit: function(e, t) {
						if (this._listeners[e]) for (var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t);
					},
					pipe: function(e) {
						return e.registerPrevious(this);
					},
					registerPrevious: function(e) {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
						var t = this;
						return e.on("data", function(e) {
							t.processChunk(e);
						}), e.on("end", function() {
							t.end();
						}), e.on("error", function(e) {
							t.error(e);
						}), this;
					},
					pause: function() {
						return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
					},
					resume: function() {
						if (!this.isPaused || this.isFinished) return !1;
						var e = this.isPaused = !1;
						return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
					},
					flush: function() {},
					processChunk: function(e) {
						this.push(e);
					},
					withStreamInfo: function(e, t) {
						return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
					},
					mergeStreamInfo: function() {
						for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
					},
					lock: function() {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.isLocked = !0, this.previous && this.previous.lock();
					},
					toString: function() {
						var e = "Worker " + this.name;
						return this.previous ? this.previous + " -> " + e : e;
					}
				}, t.exports = r;
			}, {}],
			29: [function(e, t, n) {
				var r = e("../utils"), i = e("./ConvertWorker"), a = e("./GenericWorker"), o = e("../base64"), s = e("../support"), c = e("../external"), l = null;
				if (s.nodestream) try {
					l = e("../nodejs/NodejsStreamOutputAdapter");
				} catch {}
				function u(e, t) {
					return new c.Promise(function(n, i) {
						var a = [], s = e._internalType, c = e._outputType, l = e._mimeType;
						e.on("data", function(e, n) {
							a.push(e), t && t(n);
						}).on("error", function(e) {
							a = [], i(e);
						}).on("end", function() {
							try {
								n(function(e, t, n) {
									switch (e) {
										case "blob": return r.newBlob(r.transformTo("arraybuffer", t), n);
										case "base64": return o.encode(t);
										default: return r.transformTo(e, t);
									}
								}(c, function(e, t) {
									var n, r = 0, i = null, a = 0;
									for (n = 0; n < t.length; n++) a += t[n].length;
									switch (e) {
										case "string": return t.join("");
										case "array": return Array.prototype.concat.apply([], t);
										case "uint8array":
											for (i = new Uint8Array(a), n = 0; n < t.length; n++) i.set(t[n], r), r += t[n].length;
											return i;
										case "nodebuffer": return Buffer.concat(t);
										default: throw Error("concat : unsupported type '" + e + "'");
									}
								}(s, a), l));
							} catch (e) {
								i(e);
							}
							a = [];
						}).resume();
					});
				}
				function d(e, t, n) {
					var o = t;
					switch (t) {
						case "blob":
						case "arraybuffer":
							o = "uint8array";
							break;
						case "base64": o = "string";
					}
					try {
						this._internalType = o, this._outputType = t, this._mimeType = n, r.checkSupport(o), this._worker = e.pipe(new i(o)), e.lock();
					} catch (e) {
						this._worker = new a("error"), this._worker.error(e);
					}
				}
				d.prototype = {
					accumulate: function(e) {
						return u(this, e);
					},
					on: function(e, t) {
						var n = this;
						return e === "data" ? this._worker.on(e, function(e) {
							t.call(n, e.data, e.meta);
						}) : this._worker.on(e, function() {
							r.delay(t, arguments, n);
						}), this;
					},
					resume: function() {
						return r.delay(this._worker.resume, [], this._worker), this;
					},
					pause: function() {
						return this._worker.pause(), this;
					},
					toNodejsStream: function(e) {
						if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw Error(this._outputType + " is not supported by this method");
						return new l(this, { objectMode: this._outputType !== "nodebuffer" }, e);
					}
				}, t.exports = d;
			}, {
				"../base64": 1,
				"../external": 6,
				"../nodejs/NodejsStreamOutputAdapter": 13,
				"../support": 30,
				"../utils": 32,
				"./ConvertWorker": 24,
				"./GenericWorker": 28
			}],
			30: [function(e, t, n) {
				if (n.base64 = !0, n.array = !0, n.string = !0, n.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", n.nodebuffer = typeof Buffer < "u", n.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") n.blob = !1;
				else {
					var r = /* @__PURE__ */ new ArrayBuffer(0);
					try {
						n.blob = new Blob([r], { type: "application/zip" }).size === 0;
					} catch {
						try {
							var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							i.append(r), n.blob = i.getBlob("application/zip").size === 0;
						} catch {
							n.blob = !1;
						}
					}
				}
				try {
					n.nodestream = !!e("readable-stream").Readable;
				} catch {
					n.nodestream = !1;
				}
			}, { "readable-stream": 16 }],
			31: [function(e, t, n) {
				for (var r = e("./utils"), i = e("./support"), a = e("./nodejsUtils"), o = e("./stream/GenericWorker"), s = Array(256), c = 0; c < 256; c++) s[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
				s[254] = s[254] = 1;
				function l() {
					o.call(this, "utf-8 decode"), this.leftOver = null;
				}
				function u() {
					o.call(this, "utf-8 encode");
				}
				n.utf8encode = function(e) {
					return i.nodebuffer ? a.newBufferFrom(e, "utf-8") : function(e) {
						var t, n, r, a, o, s = e.length, c = 0;
						for (a = 0; a < s; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (r = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
						for (t = i.uint8array ? new Uint8Array(c) : Array(c), a = o = 0; o < c; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (r = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++), n < 128 ? t[o++] = n : (n < 2048 ? t[o++] = 192 | n >>> 6 : (n < 65536 ? t[o++] = 224 | n >>> 12 : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63), t[o++] = 128 | n >>> 6 & 63), t[o++] = 128 | 63 & n);
						return t;
					}(e);
				}, n.utf8decode = function(e) {
					return i.nodebuffer ? r.transformTo("nodebuffer", e).toString("utf-8") : function(e) {
						var t, n, i, a, o = e.length, c = Array(2 * o);
						for (t = n = 0; t < o;) if ((i = e[t++]) < 128) c[n++] = i;
						else if (4 < (a = s[i])) c[n++] = 65533, t += a - 1;
						else {
							for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; 1 < a && t < o;) i = i << 6 | 63 & e[t++], a--;
							1 < a ? c[n++] = 65533 : i < 65536 ? c[n++] = i : (i -= 65536, c[n++] = 55296 | i >> 10 & 1023, c[n++] = 56320 | 1023 & i);
						}
						return c.length !== n && (c.subarray ? c = c.subarray(0, n) : c.length = n), r.applyFromCharCode(c);
					}(e = r.transformTo(i.uint8array ? "uint8array" : "array", e));
				}, r.inherits(l, o), l.prototype.processChunk = function(e) {
					var t = r.transformTo(i.uint8array ? "uint8array" : "array", e.data);
					if (this.leftOver && this.leftOver.length) {
						if (i.uint8array) {
							var a = t;
							(t = new Uint8Array(a.length + this.leftOver.length)).set(this.leftOver, 0), t.set(a, this.leftOver.length);
						} else t = this.leftOver.concat(t);
						this.leftOver = null;
					}
					var o = function(e, t) {
						var n;
						for ((t ||= e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && (192 & e[n]) == 128;) n--;
						return n < 0 || n === 0 ? t : n + s[e[n]] > t ? n : t;
					}(t), c = t;
					o !== t.length && (i.uint8array ? (c = t.subarray(0, o), this.leftOver = t.subarray(o, t.length)) : (c = t.slice(0, o), this.leftOver = t.slice(o, t.length))), this.push({
						data: n.utf8decode(c),
						meta: e.meta
					});
				}, l.prototype.flush = function() {
					this.leftOver && this.leftOver.length && (this.push({
						data: n.utf8decode(this.leftOver),
						meta: {}
					}), this.leftOver = null);
				}, n.Utf8DecodeWorker = l, r.inherits(u, o), u.prototype.processChunk = function(e) {
					this.push({
						data: n.utf8encode(e.data),
						meta: e.meta
					});
				}, n.Utf8EncodeWorker = u;
			}, {
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./support": 30,
				"./utils": 32
			}],
			32: [function(e, t, n) {
				var r = e("./support"), i = e("./base64"), a = e("./nodejsUtils"), o = e("./external");
				function s(e) {
					return e;
				}
				function c(e, t) {
					for (var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
					return t;
				}
				e("setimmediate"), n.newBlob = function(e, t) {
					n.checkSupport("blob");
					try {
						return new Blob([e], { type: t });
					} catch {
						try {
							var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							return r.append(e), r.getBlob(t);
						} catch {
							throw Error("Bug : can't construct the Blob.");
						}
					}
				};
				var l = {
					stringifyByChunk: function(e, t, n) {
						var r = [], i = 0, a = e.length;
						if (a <= n) return String.fromCharCode.apply(null, e);
						for (; i < a;) t === "array" || t === "nodebuffer" ? r.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + n, a)))) : r.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + n, a)))), i += n;
						return r.join("");
					},
					stringifyByChar: function(e) {
						for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
						return t;
					},
					applyCanBeUsed: {
						uint8array: function() {
							try {
								return r.uint8array && String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1)).length === 1;
							} catch {
								return !1;
							}
						}(),
						nodebuffer: function() {
							try {
								return r.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
							} catch {
								return !1;
							}
						}()
					}
				};
				function u(e) {
					var t = 65536, r = n.getTypeOf(e), i = !0;
					if (r === "uint8array" ? i = l.applyCanBeUsed.uint8array : r === "nodebuffer" && (i = l.applyCanBeUsed.nodebuffer), i) for (; 1 < t;) try {
						return l.stringifyByChunk(e, r, t);
					} catch {
						t = Math.floor(t / 2);
					}
					return l.stringifyByChar(e);
				}
				function d(e, t) {
					for (var n = 0; n < e.length; n++) t[n] = e[n];
					return t;
				}
				n.applyFromCharCode = u;
				var f = {};
				f.string = {
					string: s,
					array: function(e) {
						return c(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return f.string.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return c(e, new Uint8Array(e.length));
					},
					nodebuffer: function(e) {
						return c(e, a.allocBuffer(e.length));
					}
				}, f.array = {
					string: u,
					array: s,
					arraybuffer: function(e) {
						return new Uint8Array(e).buffer;
					},
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, f.arraybuffer = {
					string: function(e) {
						return u(new Uint8Array(e));
					},
					array: function(e) {
						return d(new Uint8Array(e), Array(e.byteLength));
					},
					arraybuffer: s,
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(new Uint8Array(e));
					}
				}, f.uint8array = {
					string: u,
					array: function(e) {
						return d(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return e.buffer;
					},
					uint8array: s,
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, f.nodebuffer = {
					string: u,
					array: function(e) {
						return d(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return f.nodebuffer.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return d(e, new Uint8Array(e.length));
					},
					nodebuffer: s
				}, n.transformTo = function(e, t) {
					return t ||= "", e ? (n.checkSupport(e), f[n.getTypeOf(t)][e](t)) : t;
				}, n.resolve = function(e) {
					for (var t = e.split("/"), n = [], r = 0; r < t.length; r++) {
						var i = t[r];
						i === "." || i === "" && r !== 0 && r !== t.length - 1 || (i === ".." ? n.pop() : n.push(i));
					}
					return n.join("/");
				}, n.getTypeOf = function(e) {
					return typeof e == "string" ? "string" : Object.prototype.toString.call(e) === "[object Array]" ? "array" : r.nodebuffer && a.isBuffer(e) ? "nodebuffer" : r.uint8array && e instanceof Uint8Array ? "uint8array" : r.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
				}, n.checkSupport = function(e) {
					if (!r[e.toLowerCase()]) throw Error(e + " is not supported by this platform");
				}, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(e) {
					var t, n, r = "";
					for (n = 0; n < (e || "").length; n++) r += "\\x" + ((t = e.charCodeAt(n)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
					return r;
				}, n.delay = function(e, t, n) {
					setImmediate(function() {
						e.apply(n || null, t || []);
					});
				}, n.inherits = function(e, t) {
					function n() {}
					n.prototype = t.prototype, e.prototype = new n();
				}, n.extend = function() {
					var e, t, n = {};
					for (e = 0; e < arguments.length; e++) for (t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && n[t] === void 0 && (n[t] = arguments[e][t]);
					return n;
				}, n.prepareContent = function(e, t, a, s, l) {
					return o.Promise.resolve(t).then(function(e) {
						return r.blob && (e instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)) !== -1) && typeof FileReader < "u" ? new o.Promise(function(t, n) {
							var r = new FileReader();
							r.onload = function(e) {
								t(e.target.result);
							}, r.onerror = function(e) {
								n(e.target.error);
							}, r.readAsArrayBuffer(e);
						}) : e;
					}).then(function(t) {
						var u = n.getTypeOf(t);
						return u ? (u === "arraybuffer" ? t = n.transformTo("uint8array", t) : u === "string" && (l ? t = i.decode(t) : a && !0 !== s && (t = function(e) {
							return c(e, r.uint8array ? new Uint8Array(e.length) : Array(e.length));
						}(t))), t) : o.Promise.reject(/* @__PURE__ */ Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
					});
				};
			}, {
				"./base64": 1,
				"./external": 6,
				"./nodejsUtils": 14,
				"./support": 30,
				setimmediate: 54
			}],
			33: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./signature"), o = e("./zipEntry"), s = e("./support");
				function c(e) {
					this.files = [], this.loadOptions = e;
				}
				c.prototype = {
					checkSignature: function(e) {
						if (!this.reader.readAndCheckSignature(e)) {
							this.reader.index -= 4;
							var t = this.reader.readString(4);
							throw Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
						}
					},
					isSignature: function(e, t) {
						var n = this.reader.index;
						this.reader.setIndex(e);
						var r = this.reader.readString(4) === t;
						return this.reader.setIndex(n), r;
					},
					readBlockEndOfCentral: function() {
						this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
						var e = this.reader.readData(this.zipCommentLength), t = s.uint8array ? "uint8array" : "array", n = i.transformTo(t, e);
						this.zipComment = this.loadOptions.decodeFileName(n);
					},
					readBlockZip64EndOfCentral: function() {
						this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
						for (var e, t, n, r = this.zip64EndOfCentralSize - 44; 0 < r;) e = this.reader.readInt(2), t = this.reader.readInt(4), n = this.reader.readData(t), this.zip64ExtensibleData[e] = {
							id: e,
							length: t,
							value: n
						};
					},
					readBlockZip64EndOfCentralLocator: function() {
						if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw Error("Multi-volumes zip are not supported");
					},
					readLocalFiles: function() {
						var e, t;
						for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
					},
					readCentralDir: function() {
						var e;
						for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);) (e = new o({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
						if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
					},
					readEndOfCentral: function() {
						var e = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
						if (e < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? /* @__PURE__ */ Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
						this.reader.setIndex(e);
						var t = e;
						if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
							if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
							if (this.reader.setIndex(e), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw Error("Corrupted zip: can't find the ZIP64 end of central directory");
							this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
						}
						var n = this.centralDirOffset + this.centralDirSize;
						this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
						var r = t - n;
						if (0 < r) this.isSignature(t, a.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
						else if (r < 0) throw Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
					},
					prepareReader: function(e) {
						this.reader = r(e);
					},
					load: function(e) {
						this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
					}
				}, t.exports = c;
			}, {
				"./reader/readerFor": 22,
				"./signature": 23,
				"./support": 30,
				"./utils": 32,
				"./zipEntry": 34
			}],
			34: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./compressedObject"), o = e("./crc32"), s = e("./utf8"), c = e("./compressions"), l = e("./support");
				function u(e, t) {
					this.options = e, this.loadOptions = t;
				}
				u.prototype = {
					isEncrypted: function() {
						return (1 & this.bitFlag) == 1;
					},
					useUTF8: function() {
						return (2048 & this.bitFlag) == 2048;
					},
					readLocalPart: function(e) {
						var t, n;
						if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
						if ((t = function(e) {
							for (var t in c) if (Object.prototype.hasOwnProperty.call(c, t) && c[t].magic === e) return c[t];
							return null;
						}(this.compressionMethod)) === null) throw Error("Corrupted zip : compression " + i.pretty(this.compressionMethod) + " unknown (inner file : " + i.transformTo("string", this.fileName) + ")");
						this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
					},
					readCentralPart: function(e) {
						this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
						var t = e.readInt(2);
						if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
						e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
					},
					processAttributes: function() {
						this.unixPermissions = null, this.dosPermissions = null;
						var e = this.versionMadeBy >> 8;
						this.dir = !!(16 & this.externalFileAttributes), e == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), e == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
					},
					parseZIP64ExtraField: function() {
						if (this.extraFields[1]) {
							var e = r(this.extraFields[1].value);
							this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
						}
					},
					readExtraFields: function(e) {
						var t, n, r, i = e.index + this.extraFieldsLength;
						for (this.extraFields ||= {}; e.index + 4 < i;) t = e.readInt(2), n = e.readInt(2), r = e.readData(n), this.extraFields[t] = {
							id: t,
							length: n,
							value: r
						};
						e.setIndex(i);
					},
					handleUTF8: function() {
						var e = l.uint8array ? "uint8array" : "array";
						if (this.useUTF8()) this.fileNameStr = s.utf8decode(this.fileName), this.fileCommentStr = s.utf8decode(this.fileComment);
						else {
							var t = this.findExtraFieldUnicodePath();
							if (t !== null) this.fileNameStr = t;
							else {
								var n = i.transformTo(e, this.fileName);
								this.fileNameStr = this.loadOptions.decodeFileName(n);
							}
							var r = this.findExtraFieldUnicodeComment();
							if (r !== null) this.fileCommentStr = r;
							else {
								var a = i.transformTo(e, this.fileComment);
								this.fileCommentStr = this.loadOptions.decodeFileName(a);
							}
						}
					},
					findExtraFieldUnicodePath: function() {
						var e = this.extraFields[28789];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) === 1 && o(this.fileName) === t.readInt(4) ? s.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					},
					findExtraFieldUnicodeComment: function() {
						var e = this.extraFields[25461];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) === 1 && o(this.fileComment) === t.readInt(4) ? s.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					}
				}, t.exports = u;
			}, {
				"./compressedObject": 2,
				"./compressions": 3,
				"./crc32": 4,
				"./reader/readerFor": 22,
				"./support": 30,
				"./utf8": 31,
				"./utils": 32
			}],
			35: [function(e, t, n) {
				function r(e, t, n) {
					this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
						compression: n.compression,
						compressionOptions: n.compressionOptions
					};
				}
				var i = e("./stream/StreamHelper"), a = e("./stream/DataWorker"), o = e("./utf8"), s = e("./compressedObject"), c = e("./stream/GenericWorker");
				r.prototype = {
					internalStream: function(e) {
						var t = null, n = "string";
						try {
							if (!e) throw Error("No output type specified.");
							var r = (n = e.toLowerCase()) === "string" || n === "text";
							n !== "binarystring" && n !== "text" || (n = "string"), t = this._decompressWorker();
							var a = !this._dataBinary;
							a && !r && (t = t.pipe(new o.Utf8EncodeWorker())), !a && r && (t = t.pipe(new o.Utf8DecodeWorker()));
						} catch (e) {
							(t = new c("error")).error(e);
						}
						return new i(t, n, "");
					},
					async: function(e, t) {
						return this.internalStream(e).accumulate(t);
					},
					nodeStream: function(e, t) {
						return this.internalStream(e || "nodebuffer").toNodejsStream(t);
					},
					_compressWorker: function(e, t) {
						if (this._data instanceof s && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
						var n = this._decompressWorker();
						return this._dataBinary || (n = n.pipe(new o.Utf8EncodeWorker())), s.createWorkerFrom(n, e, t);
					},
					_decompressWorker: function() {
						return this._data instanceof s ? this._data.getContentWorker() : this._data instanceof c ? this._data : new a(this._data);
					}
				};
				for (var l = [
					"asText",
					"asBinary",
					"asNodeBuffer",
					"asUint8Array",
					"asArrayBuffer"
				], u = function() {
					throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
				}, d = 0; d < l.length; d++) r.prototype[l[d]] = u;
				t.exports = r;
			}, {
				"./compressedObject": 2,
				"./stream/DataWorker": 27,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31
			}],
			36: [function(e, t, n) {
				(function(e) {
					var n, r, i = e.MutationObserver || e.WebKitMutationObserver;
					if (i) {
						var a = 0, o = new i(u), s = e.document.createTextNode("");
						o.observe(s, { characterData: !0 }), n = function() {
							s.data = a = ++a % 2;
						};
					} else if (e.setImmediate || e.MessageChannel === void 0) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
						var t = e.document.createElement("script");
						t.onreadystatechange = function() {
							u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
						}, e.document.documentElement.appendChild(t);
					} : function() {
						setTimeout(u, 0);
					};
					else {
						var c = new e.MessageChannel();
						c.port1.onmessage = u, n = function() {
							c.port2.postMessage(0);
						};
					}
					var l = [];
					function u() {
						var e, t;
						r = !0;
						for (var n = l.length; n;) {
							for (t = l, l = [], e = -1; ++e < n;) t[e]();
							n = l.length;
						}
						r = !1;
					}
					t.exports = function(e) {
						l.push(e) !== 1 || r || n();
					};
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}],
			37: [function(e, t, n) {
				var r = e("immediate");
				function i() {}
				var a = {}, o = ["REJECTED"], s = ["FULFILLED"], c = ["PENDING"];
				function l(e) {
					if (typeof e != "function") throw TypeError("resolver must be a function");
					this.state = c, this.queue = [], this.outcome = void 0, e !== i && p(this, e);
				}
				function u(e, t, n) {
					this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
				}
				function d(e, t, n) {
					r(function() {
						var r;
						try {
							r = t(n);
						} catch (t) {
							return a.reject(e, t);
						}
						r === e ? a.reject(e, /* @__PURE__ */ TypeError("Cannot resolve promise with itself")) : a.resolve(e, r);
					});
				}
				function f(e) {
					var t = e && e.then;
					if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function") return function() {
						t.apply(e, arguments);
					};
				}
				function p(e, t) {
					var n = !1;
					function r(t) {
						n || (n = !0, a.reject(e, t));
					}
					function i(t) {
						n || (n = !0, a.resolve(e, t));
					}
					var o = m(function() {
						t(i, r);
					});
					o.status === "error" && r(o.value);
				}
				function m(e, t) {
					var n = {};
					try {
						n.value = e(t), n.status = "success";
					} catch (e) {
						n.status = "error", n.value = e;
					}
					return n;
				}
				(t.exports = l).prototype.finally = function(e) {
					if (typeof e != "function") return this;
					var t = this.constructor;
					return this.then(function(n) {
						return t.resolve(e()).then(function() {
							return n;
						});
					}, function(n) {
						return t.resolve(e()).then(function() {
							throw n;
						});
					});
				}, l.prototype.catch = function(e) {
					return this.then(null, e);
				}, l.prototype.then = function(e, t) {
					if (typeof e != "function" && this.state === s || typeof t != "function" && this.state === o) return this;
					var n = new this.constructor(i);
					return this.state === c ? this.queue.push(new u(n, e, t)) : d(n, this.state === s ? e : t, this.outcome), n;
				}, u.prototype.callFulfilled = function(e) {
					a.resolve(this.promise, e);
				}, u.prototype.otherCallFulfilled = function(e) {
					d(this.promise, this.onFulfilled, e);
				}, u.prototype.callRejected = function(e) {
					a.reject(this.promise, e);
				}, u.prototype.otherCallRejected = function(e) {
					d(this.promise, this.onRejected, e);
				}, a.resolve = function(e, t) {
					var n = m(f, t);
					if (n.status === "error") return a.reject(e, n.value);
					var r = n.value;
					if (r) p(e, r);
					else {
						e.state = s, e.outcome = t;
						for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t);
					}
					return e;
				}, a.reject = function(e, t) {
					e.state = o, e.outcome = t;
					for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
					return e;
				}, l.resolve = function(e) {
					return e instanceof this ? e : a.resolve(new this(i), e);
				}, l.reject = function(e) {
					var t = new this(i);
					return a.reject(t, e);
				}, l.all = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = Array(n), s = 0, c = -1, l = new this(i); ++c < n;) u(e[c], c);
					return l;
					function u(e, i) {
						t.resolve(e).then(function(e) {
							o[i] = e, ++s !== n || r || (r = !0, a.resolve(l, o));
						}, function(e) {
							r || (r = !0, a.reject(l, e));
						});
					}
				}, l.race = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = -1, s = new this(i); ++o < n;) c = e[o], t.resolve(c).then(function(e) {
						r || (r = !0, a.resolve(s, e));
					}, function(e) {
						r || (r = !0, a.reject(s, e));
					});
					var c;
					return s;
				};
			}, { immediate: 36 }],
			38: [function(e, t, n) {
				var r = {};
				(0, e("./lib/utils/common").assign)(r, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = r;
			}, {
				"./lib/deflate": 39,
				"./lib/inflate": 40,
				"./lib/utils/common": 41,
				"./lib/zlib/constants": 44
			}],
			39: [function(e, t, n) {
				var r = e("./zlib/deflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/messages"), s = e("./zlib/zstream"), c = Object.prototype.toString, l = 0, u = -1, d = 0, f = 8;
				function p(e) {
					if (!(this instanceof p)) return new p(e);
					this.options = i.assign({
						level: u,
						method: f,
						chunkSize: 16384,
						windowBits: 15,
						memLevel: 8,
						strategy: d,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
					var n = r.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
					if (n !== l) throw Error(o[n]);
					if (t.header && r.deflateSetHeader(this.strm, t.header), t.dictionary) {
						var m;
						if (m = typeof t.dictionary == "string" ? a.string2buf(t.dictionary) : c.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, (n = r.deflateSetDictionary(this.strm, m)) !== l) throw Error(o[n]);
						this._dict_set = !0;
					}
				}
				function m(e, t) {
					var n = new p(t);
					if (n.push(e, !0), n.err) throw n.msg || o[n.err];
					return n.result;
				}
				p.prototype.push = function(e, t) {
					var n, o, s = this.strm, u = this.options.chunkSize;
					if (this.ended) return !1;
					o = t === ~~t ? t : !0 === t ? 4 : 0, typeof e == "string" ? s.input = a.string2buf(e) : c.call(e) === "[object ArrayBuffer]" ? s.input = new Uint8Array(e) : s.input = e, s.next_in = 0, s.avail_in = s.input.length;
					do {
						if (s.avail_out === 0 && (s.output = new i.Buf8(u), s.next_out = 0, s.avail_out = u), (n = r.deflate(s, o)) !== 1 && n !== l) return this.onEnd(n), !(this.ended = !0);
						s.avail_out !== 0 && (s.avail_in !== 0 || o !== 4 && o !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(i.shrinkBuf(s.output, s.next_out))) : this.onData(i.shrinkBuf(s.output, s.next_out)));
					} while ((0 < s.avail_in || s.avail_out === 0) && n !== 1);
					return o === 4 ? (n = r.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === l) : o !== 2 || (this.onEnd(l), !(s.avail_out = 0));
				}, p.prototype.onData = function(e) {
					this.chunks.push(e);
				}, p.prototype.onEnd = function(e) {
					e === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, n.Deflate = p, n.deflate = m, n.deflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, m(e, t);
				}, n.gzip = function(e, t) {
					return (t ||= {}).gzip = !0, m(e, t);
				};
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/deflate": 46,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			40: [function(e, t, n) {
				var r = e("./zlib/inflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/constants"), s = e("./zlib/messages"), c = e("./zlib/zstream"), l = e("./zlib/gzheader"), u = Object.prototype.toString;
				function d(e) {
					if (!(this instanceof d)) return new d(e);
					this.options = i.assign({
						chunkSize: 16384,
						windowBits: 0,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && !(15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c(), this.strm.avail_out = 0;
					var n = r.inflateInit2(this.strm, t.windowBits);
					if (n !== o.Z_OK) throw Error(s[n]);
					this.header = new l(), r.inflateGetHeader(this.strm, this.header);
				}
				function f(e, t) {
					var n = new d(t);
					if (n.push(e, !0), n.err) throw n.msg || s[n.err];
					return n.result;
				}
				d.prototype.push = function(e, t) {
					var n, s, c, l, d, f, p = this.strm, m = this.options.chunkSize, h = this.options.dictionary, g = !1;
					if (this.ended) return !1;
					s = t === ~~t ? t : !0 === t ? o.Z_FINISH : o.Z_NO_FLUSH, typeof e == "string" ? p.input = a.binstring2buf(e) : u.call(e) === "[object ArrayBuffer]" ? p.input = new Uint8Array(e) : p.input = e, p.next_in = 0, p.avail_in = p.input.length;
					do {
						if (p.avail_out === 0 && (p.output = new i.Buf8(m), p.next_out = 0, p.avail_out = m), (n = r.inflate(p, o.Z_NO_FLUSH)) === o.Z_NEED_DICT && h && (f = typeof h == "string" ? a.string2buf(h) : u.call(h) === "[object ArrayBuffer]" ? new Uint8Array(h) : h, n = r.inflateSetDictionary(this.strm, f)), n === o.Z_BUF_ERROR && !0 === g && (n = o.Z_OK, g = !1), n !== o.Z_STREAM_END && n !== o.Z_OK) return this.onEnd(n), !(this.ended = !0);
						p.next_out && (p.avail_out !== 0 && n !== o.Z_STREAM_END && (p.avail_in !== 0 || s !== o.Z_FINISH && s !== o.Z_SYNC_FLUSH) || (this.options.to === "string" ? (c = a.utf8border(p.output, p.next_out), l = p.next_out - c, d = a.buf2string(p.output, c), p.next_out = l, p.avail_out = m - l, l && i.arraySet(p.output, p.output, c, l, 0), this.onData(d)) : this.onData(i.shrinkBuf(p.output, p.next_out)))), p.avail_in === 0 && p.avail_out === 0 && (g = !0);
					} while ((0 < p.avail_in || p.avail_out === 0) && n !== o.Z_STREAM_END);
					return n === o.Z_STREAM_END && (s = o.Z_FINISH), s === o.Z_FINISH ? (n = r.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === o.Z_OK) : s !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), !(p.avail_out = 0));
				}, d.prototype.onData = function(e) {
					this.chunks.push(e);
				}, d.prototype.onEnd = function(e) {
					e === o.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, n.Inflate = d, n.inflate = f, n.inflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, f(e, t);
				}, n.ungzip = f;
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/constants": 44,
				"./zlib/gzheader": 47,
				"./zlib/inflate": 49,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			41: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
				n.assign = function(e) {
					for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
						var n = t.shift();
						if (n) {
							if (typeof n != "object") throw TypeError(n + "must be non-object");
							for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r]);
						}
					}
					return e;
				}, n.shrinkBuf = function(e, t) {
					return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
				};
				var i = {
					arraySet: function(e, t, n, r, i) {
						if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i);
						else for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						var t, n, r, i, a, o;
						for (t = r = 0, n = e.length; t < n; t++) r += e[t].length;
						for (o = new Uint8Array(r), t = i = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
						return o;
					}
				}, a = {
					arraySet: function(e, t, n, r, i) {
						for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						return [].concat.apply([], e);
					}
				};
				n.setTyped = function(e) {
					e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, i)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, a));
				}, n.setTyped(r);
			}, {}],
			42: [function(e, t, n) {
				var r = e("./common"), i = !0, a = !0;
				try {
					String.fromCharCode.apply(null, [0]);
				} catch {
					i = !1;
				}
				try {
					String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
				} catch {
					a = !1;
				}
				for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = 252 <= s ? 6 : 248 <= s ? 5 : 240 <= s ? 4 : 224 <= s ? 3 : 192 <= s ? 2 : 1;
				function c(e, t) {
					if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
					for (var n = "", o = 0; o < t; o++) n += String.fromCharCode(e[o]);
					return n;
				}
				o[254] = o[254] = 1, n.string2buf = function(e) {
					var t, n, i, a, o, s = e.length, c = 0;
					for (a = 0; a < s; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (i = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
					for (t = new r.Buf8(c), a = o = 0; o < c; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (i = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), n < 128 ? t[o++] = n : (n < 2048 ? t[o++] = 192 | n >>> 6 : (n < 65536 ? t[o++] = 224 | n >>> 12 : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63), t[o++] = 128 | n >>> 6 & 63), t[o++] = 128 | 63 & n);
					return t;
				}, n.buf2binstring = function(e) {
					return c(e, e.length);
				}, n.binstring2buf = function(e) {
					for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
					return t;
				}, n.buf2string = function(e, t) {
					var n, r, i, a, s = t || e.length, l = Array(2 * s);
					for (n = r = 0; n < s;) if ((i = e[n++]) < 128) l[r++] = i;
					else if (4 < (a = o[i])) l[r++] = 65533, n += a - 1;
					else {
						for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; 1 < a && n < s;) i = i << 6 | 63 & e[n++], a--;
						1 < a ? l[r++] = 65533 : i < 65536 ? l[r++] = i : (i -= 65536, l[r++] = 55296 | i >> 10 & 1023, l[r++] = 56320 | 1023 & i);
					}
					return c(l, r);
				}, n.utf8border = function(e, t) {
					var n;
					for ((t ||= e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && (192 & e[n]) == 128;) n--;
					return n < 0 || n === 0 ? t : n + o[e[n]] > t ? n : t;
				};
			}, { "./common": 41 }],
			43: [function(e, t, n) {
				t.exports = function(e, t, n, r) {
					for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0;) {
						for (n -= o = 2e3 < n ? 2e3 : n; a = a + (i = i + t[r++] | 0) | 0, --o;);
						i %= 65521, a %= 65521;
					}
					return i | a << 16 | 0;
				};
			}, {}],
			44: [function(e, t, n) {
				t.exports = {
					Z_NO_FLUSH: 0,
					Z_PARTIAL_FLUSH: 1,
					Z_SYNC_FLUSH: 2,
					Z_FULL_FLUSH: 3,
					Z_FINISH: 4,
					Z_BLOCK: 5,
					Z_TREES: 6,
					Z_OK: 0,
					Z_STREAM_END: 1,
					Z_NEED_DICT: 2,
					Z_ERRNO: -1,
					Z_STREAM_ERROR: -2,
					Z_DATA_ERROR: -3,
					Z_BUF_ERROR: -5,
					Z_NO_COMPRESSION: 0,
					Z_BEST_SPEED: 1,
					Z_BEST_COMPRESSION: 9,
					Z_DEFAULT_COMPRESSION: -1,
					Z_FILTERED: 1,
					Z_HUFFMAN_ONLY: 2,
					Z_RLE: 3,
					Z_FIXED: 4,
					Z_DEFAULT_STRATEGY: 0,
					Z_BINARY: 0,
					Z_TEXT: 1,
					Z_UNKNOWN: 2,
					Z_DEFLATED: 8
				};
			}, {}],
			45: [function(e, t, n) {
				var r = function() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}();
				t.exports = function(e, t, n, i) {
					var a = r, o = i + n;
					e ^= -1;
					for (var s = i; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
					return -1 ^ e;
				};
			}, {}],
			46: [function(e, t, n) {
				var r, i = e("../utils/common"), a = e("./trees"), o = e("./adler32"), s = e("./crc32"), c = e("./messages"), l = 0, u = 4, d = 0, f = -2, p = -1, m = 4, h = 2, g = 8, _ = 9, v = 286, y = 30, b = 19, x = 2 * v + 1, S = 15, C = 3, w = 258, T = w + C + 1, E = 42, D = 113, O = 1, k = 2, A = 3, j = 4;
				function M(e, t) {
					return e.msg = c[t], t;
				}
				function N(e) {
					return (e << 1) - (4 < e ? 9 : 0);
				}
				function P(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				function F(e) {
					var t = e.state, n = t.pending;
					n > e.avail_out && (n = e.avail_out), n !== 0 && (i.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
				}
				function I(e, t) {
					a._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, F(e.strm);
				}
				function L(e, t) {
					e.pending_buf[e.pending++] = t;
				}
				function R(e, t) {
					e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
				}
				function z(e, t) {
					var n, r, i = e.max_chain_length, a = e.strstart, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - T ? e.strstart - (e.w_size - T) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + w, p = l[a + o - 1], m = l[a + o];
					e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
					do
						if (l[(n = t) + o] === m && l[n + o - 1] === p && l[n] === l[a] && l[++n] === l[a + 1]) {
							a += 2, n++;
							do							;
while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < f);
							if (r = w - (f - a), a = f - w, o < r) {
								if (e.match_start = t, s <= (o = r)) break;
								p = l[a + o - 1], m = l[a + o];
							}
						}
					while ((t = d[t & u]) > c && --i != 0);
					return o <= e.lookahead ? o : e.lookahead;
				}
				function B(e) {
					var t, n, r, a, c, l, u, d, f, p, m = e.w_size;
					do {
						if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= m + (m - T)) {
							for (i.arraySet(e.window, e.window, m, m, 0), e.match_start -= m, e.strstart -= m, e.block_start -= m, t = n = e.hash_size; r = e.head[--t], e.head[t] = m <= r ? r - m : 0, --n;);
							for (t = n = m; r = e.prev[--t], e.prev[t] = m <= r ? r - m : 0, --n;);
							a += m;
						}
						if (e.strm.avail_in === 0) break;
						if (l = e.strm, u = e.window, d = e.strstart + e.lookahead, f = a, p = void 0, p = l.avail_in, f < p && (p = f), n = p === 0 ? 0 : (l.avail_in -= p, i.arraySet(u, l.input, l.next_in, p, d), l.state.wrap === 1 ? l.adler = o(l.adler, u, p, d) : l.state.wrap === 2 && (l.adler = s(l.adler, u, p, d)), l.next_in += p, l.total_in += p, p), e.lookahead += n, e.lookahead + e.insert >= C) for (c = e.strstart - e.insert, e.ins_h = e.window[c], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[c + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[c + C - 1]) & e.hash_mask, e.prev[c & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = c, c++, e.insert--, !(e.lookahead + e.insert < C)););
					} while (e.lookahead < T && e.strm.avail_in !== 0);
				}
				function V(e, t) {
					for (var n, r;;) {
						if (e.lookahead < T) {
							if (B(e), e.lookahead < T && t === l) return O;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= C && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - T && (e.match_length = z(e, n)), e.match_length >= C) if (r = a._tr_tally(e, e.strstart - e.match_start, e.match_length - C), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= C) {
							for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, --e.match_length != 0;);
							e.strstart++;
						} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
						else r = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
						if (r && (I(e, !1), e.strm.avail_out === 0)) return O;
					}
					return e.insert = e.strstart < C - 1 ? e.strstart : C - 1, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
				}
				function H(e, t) {
					for (var n, r, i;;) {
						if (e.lookahead < T) {
							if (B(e), e.lookahead < T && t === l) return O;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= C && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = C - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - T && (e.match_length = z(e, n), e.match_length <= 5 && (e.strategy === 1 || e.match_length === C && 4096 < e.strstart - e.match_start) && (e.match_length = C - 1)), e.prev_length >= C && e.match_length <= e.prev_length) {
							for (i = e.strstart + e.lookahead - C, r = a._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - C), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), --e.prev_length != 0;);
							if (e.match_available = 0, e.match_length = C - 1, e.strstart++, r && (I(e, !1), e.strm.avail_out === 0)) return O;
						} else if (e.match_available) {
							if ((r = a._tr_tally(e, 0, e.window[e.strstart - 1])) && I(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return O;
						} else e.match_available = 1, e.strstart++, e.lookahead--;
					}
					return e.match_available &&= (r = a._tr_tally(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < C - 1 ? e.strstart : C - 1, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
				}
				function U(e, t, n, r, i) {
					this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
				}
				function W() {
					this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i.Buf16(2 * x), this.dyn_dtree = new i.Buf16(2 * (2 * y + 1)), this.bl_tree = new i.Buf16(2 * (2 * b + 1)), P(this.dyn_ltree), P(this.dyn_dtree), P(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i.Buf16(S + 1), this.heap = new i.Buf16(2 * v + 1), P(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i.Buf16(2 * v + 1), P(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
				}
				function G(e) {
					var t;
					return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = h, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? E : D, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = l, a._tr_init(t), d) : M(e, f);
				}
				function ee(e) {
					var t = G(e);
					return t === d && function(e) {
						e.window_size = 2 * e.w_size, P(e.head), e.max_lazy_match = r[e.level].max_lazy, e.good_match = r[e.level].good_length, e.nice_match = r[e.level].nice_length, e.max_chain_length = r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = C - 1, e.match_available = 0, e.ins_h = 0;
					}(e.state), t;
				}
				function te(e, t, n, r, a, o) {
					if (!e) return f;
					var s = 1;
					if (t === p && (t = 6), r < 0 ? (s = 0, r = -r) : 15 < r && (s = 2, r -= 16), a < 1 || _ < a || n !== g || r < 8 || 15 < r || t < 0 || 9 < t || o < 0 || m < o) return M(e, f);
					r === 8 && (r = 9);
					var c = new W();
					return (e.state = c).strm = e, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = a + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + C - 1) / C), c.window = new i.Buf8(2 * c.w_size), c.head = new i.Buf16(c.hash_size), c.prev = new i.Buf16(c.w_size), c.lit_bufsize = 1 << a + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new i.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = o, c.method = n, ee(e);
				}
				r = [
					new U(0, 0, 0, 0, function(e, t) {
						var n = 65535;
						for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
							if (e.lookahead <= 1) {
								if (B(e), e.lookahead === 0 && t === l) return O;
								if (e.lookahead === 0) break;
							}
							e.strstart += e.lookahead, e.lookahead = 0;
							var r = e.block_start + n;
							if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, I(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - T && (I(e, !1), e.strm.avail_out === 0)) return O;
						}
						return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : (e.strstart > e.block_start && (I(e, !1), e.strm.avail_out), O);
					}),
					new U(4, 4, 8, 4, V),
					new U(4, 5, 16, 8, V),
					new U(4, 6, 32, 32, V),
					new U(4, 4, 16, 16, H),
					new U(8, 16, 32, 32, H),
					new U(8, 16, 128, 128, H),
					new U(8, 32, 128, 256, H),
					new U(32, 128, 258, 1024, H),
					new U(32, 258, 258, 4096, H)
				], n.deflateInit = function(e, t) {
					return te(e, t, g, 15, 8, 0);
				}, n.deflateInit2 = te, n.deflateReset = ee, n.deflateResetKeep = G, n.deflateSetHeader = function(e, t) {
					return e && e.state && e.state.wrap === 2 ? (e.state.gzhead = t, d) : f;
				}, n.deflate = function(e, t) {
					var n, i, o, c;
					if (!e || !e.state || 5 < t || t < 0) return e ? M(e, f) : f;
					if (i = e.state, !e.output || !e.input && e.avail_in !== 0 || i.status === 666 && t !== u) return M(e, e.avail_out === 0 ? -5 : f);
					if (i.strm = e, n = i.last_flush, i.last_flush = t, i.status === E) if (i.wrap === 2) e.adler = 0, L(i, 31), L(i, 139), L(i, 8), i.gzhead ? (L(i, +!!i.gzhead.text + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), L(i, 255 & i.gzhead.time), L(i, i.gzhead.time >> 8 & 255), L(i, i.gzhead.time >> 16 & 255), L(i, i.gzhead.time >> 24 & 255), L(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), L(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (L(i, 255 & i.gzhead.extra.length), L(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = s(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (L(i, 0), L(i, 0), L(i, 0), L(i, 0), L(i, 0), L(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), L(i, 3), i.status = D);
					else {
						var p = g + (i.w_bits - 8 << 4) << 8;
						p |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : i.level === 6 ? 2 : 3) << 6, i.strstart !== 0 && (p |= 32), p += 31 - p % 31, i.status = D, R(i, p), i.strstart !== 0 && (R(i, e.adler >>> 16), R(i, 65535 & e.adler)), e.adler = 1;
					}
					if (i.status === 69) if (i.gzhead.extra) {
						for (o = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending !== i.pending_buf_size));) L(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
						i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
					} else i.status = 73;
					if (i.status === 73) if (i.gzhead.name) {
						o = i.pending;
						do {
							if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending === i.pending_buf_size)) {
								c = 1;
								break;
							}
							c = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, L(i, c);
						} while (c !== 0);
						i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), c === 0 && (i.gzindex = 0, i.status = 91);
					} else i.status = 91;
					if (i.status === 91) if (i.gzhead.comment) {
						o = i.pending;
						do {
							if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending === i.pending_buf_size)) {
								c = 1;
								break;
							}
							c = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, L(i, c);
						} while (c !== 0);
						i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), c === 0 && (i.status = 103);
					} else i.status = 103;
					if (i.status === 103 && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && F(e), i.pending + 2 <= i.pending_buf_size && (L(i, 255 & e.adler), L(i, e.adler >> 8 & 255), e.adler = 0, i.status = D)) : i.status = D), i.pending !== 0) {
						if (F(e), e.avail_out === 0) return i.last_flush = -1, d;
					} else if (e.avail_in === 0 && N(t) <= N(n) && t !== u) return M(e, -5);
					if (i.status === 666 && e.avail_in !== 0) return M(e, -5);
					if (e.avail_in !== 0 || i.lookahead !== 0 || t !== l && i.status !== 666) {
						var m = i.strategy === 2 ? function(e, t) {
							for (var n;;) {
								if (e.lookahead === 0 && (B(e), e.lookahead === 0)) {
									if (t === l) return O;
									break;
								}
								if (e.match_length = 0, n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (I(e, !1), e.strm.avail_out === 0)) return O;
							}
							return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
						}(i, t) : i.strategy === 3 ? function(e, t) {
							for (var n, r, i, o, s = e.window;;) {
								if (e.lookahead <= w) {
									if (B(e), e.lookahead <= w && t === l) return O;
									if (e.lookahead === 0) break;
								}
								if (e.match_length = 0, e.lookahead >= C && 0 < e.strstart && (r = s[i = e.strstart - 1]) === s[++i] && r === s[++i] && r === s[++i]) {
									o = e.strstart + w;
									do									;
while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < o);
									e.match_length = w - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
								}
								if (e.match_length >= C ? (n = a._tr_tally(e, 1, e.match_length - C), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (I(e, !1), e.strm.avail_out === 0)) return O;
							}
							return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
						}(i, t) : r[i.level].func(i, t);
						if (m !== A && m !== j || (i.status = 666), m === O || m === A) return e.avail_out === 0 && (i.last_flush = -1), d;
						if (m === k && (t === 1 ? a._tr_align(i) : t !== 5 && (a._tr_stored_block(i, 0, 0, !1), t === 3 && (P(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), F(e), e.avail_out === 0)) return i.last_flush = -1, d;
					}
					return t === u ? i.wrap <= 0 ? 1 : (i.wrap === 2 ? (L(i, 255 & e.adler), L(i, e.adler >> 8 & 255), L(i, e.adler >> 16 & 255), L(i, e.adler >> 24 & 255), L(i, 255 & e.total_in), L(i, e.total_in >> 8 & 255), L(i, e.total_in >> 16 & 255), L(i, e.total_in >> 24 & 255)) : (R(i, e.adler >>> 16), R(i, 65535 & e.adler)), F(e), 0 < i.wrap && (i.wrap = -i.wrap), i.pending === 0 ? 1 : d) : d;
				}, n.deflateEnd = function(e) {
					var t;
					return e && e.state ? (t = e.state.status) !== E && t !== 69 && t !== 73 && t !== 91 && t !== 103 && t !== D && t !== 666 ? M(e, f) : (e.state = null, t === D ? M(e, -3) : d) : f;
				}, n.deflateSetDictionary = function(e, t) {
					var n, r, a, s, c, l, u, p, m = t.length;
					if (!e || !e.state || (s = (n = e.state).wrap) === 2 || s === 1 && n.status !== E || n.lookahead) return f;
					for (s === 1 && (e.adler = o(e.adler, t, m, 0)), n.wrap = 0, m >= n.w_size && (s === 0 && (P(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), p = new i.Buf8(n.w_size), i.arraySet(p, t, m - n.w_size, n.w_size, 0), t = p, m = n.w_size), c = e.avail_in, l = e.next_in, u = e.input, e.avail_in = m, e.next_in = 0, e.input = t, B(n); n.lookahead >= C;) {
						for (r = n.strstart, a = n.lookahead - (C - 1); n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + C - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++, --a;);
						n.strstart = r, n.lookahead = C - 1, B(n);
					}
					return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = C - 1, n.match_available = 0, e.next_in = l, e.input = u, e.avail_in = c, n.wrap = s, d;
				}, n.deflateInfo = "pako deflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./messages": 51,
				"./trees": 52
			}],
			47: [function(e, t, n) {
				t.exports = function() {
					this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
				};
			}, {}],
			48: [function(e, t, n) {
				t.exports = function(e, t) {
					var n = e.state, r = e.next_in, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T = e.input, E;
					i = r + (e.avail_in - 5), a = e.next_out, E = e.output, o = a - (t - e.avail_out), s = a + (e.avail_out - 257), c = n.dmax, l = n.wsize, u = n.whave, d = n.wnext, f = n.window, p = n.hold, m = n.bits, h = n.lencode, g = n.distcode, _ = (1 << n.lenbits) - 1, v = (1 << n.distbits) - 1;
					e: do {
						m < 15 && (p += T[r++] << m, m += 8, p += T[r++] << m, m += 8), y = h[p & _];
						t: for (;;) {
							if (p >>>= b = y >>> 24, m -= b, (b = y >>> 16 & 255) == 0) E[a++] = 65535 & y;
							else {
								if (!(16 & b)) {
									if (!(64 & b)) {
										y = h[(65535 & y) + (p & (1 << b) - 1)];
										continue t;
									}
									if (32 & b) {
										n.mode = 12;
										break e;
									}
									e.msg = "invalid literal/length code", n.mode = 30;
									break e;
								}
								x = 65535 & y, (b &= 15) && (m < b && (p += T[r++] << m, m += 8), x += p & (1 << b) - 1, p >>>= b, m -= b), m < 15 && (p += T[r++] << m, m += 8, p += T[r++] << m, m += 8), y = g[p & v];
								r: for (;;) {
									if (p >>>= b = y >>> 24, m -= b, !(16 & (b = y >>> 16 & 255))) {
										if (!(64 & b)) {
											y = g[(65535 & y) + (p & (1 << b) - 1)];
											continue r;
										}
										e.msg = "invalid distance code", n.mode = 30;
										break e;
									}
									if (S = 65535 & y, m < (b &= 15) && (p += T[r++] << m, (m += 8) < b && (p += T[r++] << m, m += 8)), c < (S += p & (1 << b) - 1)) {
										e.msg = "invalid distance too far back", n.mode = 30;
										break e;
									}
									if (p >>>= b, m -= b, (b = a - o) < S) {
										if (u < (b = S - b) && n.sane) {
											e.msg = "invalid distance too far back", n.mode = 30;
											break e;
										}
										if (w = f, (C = 0) === d) {
											if (C += l - b, b < x) {
												for (x -= b; E[a++] = f[C++], --b;);
												C = a - S, w = E;
											}
										} else if (d < b) {
											if (C += l + d - b, (b -= d) < x) {
												for (x -= b; E[a++] = f[C++], --b;);
												if (C = 0, d < x) {
													for (x -= b = d; E[a++] = f[C++], --b;);
													C = a - S, w = E;
												}
											}
										} else if (C += d - b, b < x) {
											for (x -= b; E[a++] = f[C++], --b;);
											C = a - S, w = E;
										}
										for (; 2 < x;) E[a++] = w[C++], E[a++] = w[C++], E[a++] = w[C++], x -= 3;
										x && (E[a++] = w[C++], 1 < x && (E[a++] = w[C++]));
									} else {
										for (C = a - S; E[a++] = E[C++], E[a++] = E[C++], E[a++] = E[C++], 2 < (x -= 3););
										x && (E[a++] = E[C++], 1 < x && (E[a++] = E[C++]));
									}
									break;
								}
							}
							break;
						}
					} while (r < i && a < s);
					r -= x = m >> 3, p &= (1 << (m -= x << 3)) - 1, e.next_in = r, e.next_out = a, e.avail_in = r < i ? i - r + 5 : 5 - (r - i), e.avail_out = a < s ? s - a + 257 : 257 - (a - s), n.hold = p, n.bits = m;
				};
			}, {}],
			49: [function(e, t, n) {
				var r = e("../utils/common"), i = e("./adler32"), a = e("./crc32"), o = e("./inffast"), s = e("./inftrees"), c = 1, l = 2, u = 0, d = -2, f = 1, p = 852, m = 592;
				function h(e) {
					return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
				}
				function g() {
					this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
				}
				function _(e) {
					var t;
					return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = f, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new r.Buf32(p), t.distcode = t.distdyn = new r.Buf32(m), t.sane = 1, t.back = -1, u) : d;
				}
				function v(e) {
					var t;
					return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, _(e)) : d;
				}
				function y(e, t) {
					var n, r;
					return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? d : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, v(e))) : d;
				}
				function b(e, t) {
					var n, r;
					return e ? (r = new g(), (e.state = r).window = null, (n = y(e, t)) !== u && (e.state = null), n) : d;
				}
				var x, S, C = !0;
				function w(e) {
					if (C) {
						var t;
						for (x = new r.Buf32(512), S = new r.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
						for (; t < 256;) e.lens[t++] = 9;
						for (; t < 280;) e.lens[t++] = 7;
						for (; t < 288;) e.lens[t++] = 8;
						for (s(c, e.lens, 0, 288, x, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
						s(l, e.lens, 0, 32, S, 0, e.work, { bits: 5 }), C = !1;
					}
					e.lencode = x, e.lenbits = 9, e.distcode = S, e.distbits = 5;
				}
				function T(e, t, n, i) {
					var a, o = e.state;
					return o.window === null && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new r.Buf8(o.wsize)), i >= o.wsize ? (r.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (i < (a = o.wsize - o.wnext) && (a = i), r.arraySet(o.window, t, n - i, a, o.wnext), (i -= a) ? (r.arraySet(o.window, t, n - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += a, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += a))), 0;
				}
				n.inflateReset = v, n.inflateReset2 = y, n.inflateResetKeep = _, n.inflateInit = function(e) {
					return b(e, 15);
				}, n.inflateInit2 = b, n.inflate = function(e, t) {
					var n, p, m, g, _, v, y, b, x, S, C, E, D, O, k, A, j, M, N, P, F, I, L, R, z = 0, B = new r.Buf8(4), V = [
						16,
						17,
						18,
						0,
						8,
						7,
						9,
						6,
						10,
						5,
						11,
						4,
						12,
						3,
						13,
						2,
						14,
						1,
						15
					];
					if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) return d;
					(n = e.state).mode === 12 && (n.mode = 13), _ = e.next_out, m = e.output, y = e.avail_out, g = e.next_in, p = e.input, v = e.avail_in, b = n.hold, x = n.bits, S = v, C = y, I = u;
					e: for (;;) switch (n.mode) {
						case f:
							if (n.wrap === 0) {
								n.mode = 13;
								break;
							}
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (2 & n.wrap && b === 35615) {
								B[n.check = 0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0), x = b = 0, n.mode = 2;
								break;
							}
							if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & b) << 8) + (b >> 8)) % 31) {
								e.msg = "incorrect header check", n.mode = 30;
								break;
							}
							if ((15 & b) != 8) {
								e.msg = "unknown compression method", n.mode = 30;
								break;
							}
							if (x -= 4, F = 8 + (15 & (b >>>= 4)), n.wbits === 0) n.wbits = F;
							else if (F > n.wbits) {
								e.msg = "invalid window size", n.mode = 30;
								break;
							}
							n.dmax = 1 << F, e.adler = n.check = 1, n.mode = 512 & b ? 10 : 12, x = b = 0;
							break;
						case 2:
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (n.flags = b, (255 & n.flags) != 8) {
								e.msg = "unknown compression method", n.mode = 30;
								break;
							}
							if (57344 & n.flags) {
								e.msg = "unknown header flags set", n.mode = 30;
								break;
							}
							n.head && (n.head.text = b >> 8 & 1), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0, n.mode = 3;
						case 3:
							for (; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							n.head && (n.head.time = b), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, B[2] = b >>> 16 & 255, B[3] = b >>> 24 & 255, n.check = a(n.check, B, 4, 0)), x = b = 0, n.mode = 4;
						case 4:
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							n.head && (n.head.xflags = 255 & b, n.head.os = b >> 8), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0, n.mode = 5;
						case 5:
							if (1024 & n.flags) {
								for (; x < 16;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.length = b, n.head && (n.head.extra_len = b), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0;
							} else n.head && (n.head.extra = null);
							n.mode = 6;
						case 6:
							if (1024 & n.flags && (v < (E = n.length) && (E = v), E && (n.head && (F = n.head.extra_len - n.length, n.head.extra || (n.head.extra = Array(n.head.extra_len)), r.arraySet(n.head.extra, p, g, E, F)), 512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, n.length -= E), n.length)) break e;
							n.length = 0, n.mode = 7;
						case 7:
							if (2048 & n.flags) {
								if (v === 0) break e;
								for (E = 0; F = p[g + E++], n.head && F && n.length < 65536 && (n.head.name += String.fromCharCode(F)), F && E < v;);
								if (512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, F) break e;
							} else n.head && (n.head.name = null);
							n.length = 0, n.mode = 8;
						case 8:
							if (4096 & n.flags) {
								if (v === 0) break e;
								for (E = 0; F = p[g + E++], n.head && F && n.length < 65536 && (n.head.comment += String.fromCharCode(F)), F && E < v;);
								if (512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, F) break e;
							} else n.head && (n.head.comment = null);
							n.mode = 9;
						case 9:
							if (512 & n.flags) {
								for (; x < 16;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (b !== (65535 & n.check)) {
									e.msg = "header crc mismatch", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = 12;
							break;
						case 10:
							for (; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							e.adler = n.check = h(b), x = b = 0, n.mode = 11;
						case 11:
							if (n.havedict === 0) return e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, 2;
							e.adler = n.check = 1, n.mode = 12;
						case 12: if (t === 5 || t === 6) break e;
						case 13:
							if (n.last) {
								b >>>= 7 & x, x -= 7 & x, n.mode = 27;
								break;
							}
							for (; x < 3;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							switch (n.last = 1 & b, --x, 3 & (b >>>= 1)) {
								case 0:
									n.mode = 14;
									break;
								case 1:
									if (w(n), n.mode = 20, t !== 6) break;
									b >>>= 2, x -= 2;
									break e;
								case 2:
									n.mode = 17;
									break;
								case 3: e.msg = "invalid block type", n.mode = 30;
							}
							b >>>= 2, x -= 2;
							break;
						case 14:
							for (b >>>= 7 & x, x -= 7 & x; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if ((65535 & b) != (b >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths", n.mode = 30;
								break;
							}
							if (n.length = 65535 & b, x = b = 0, n.mode = 15, t === 6) break e;
						case 15: n.mode = 16;
						case 16:
							if (E = n.length) {
								if (v < E && (E = v), y < E && (E = y), E === 0) break e;
								r.arraySet(m, p, g, E, _), v -= E, g += E, y -= E, _ += E, n.length -= E;
								break;
							}
							n.mode = 12;
							break;
						case 17:
							for (; x < 14;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (n.nlen = 257 + (31 & b), b >>>= 5, x -= 5, n.ndist = 1 + (31 & b), b >>>= 5, x -= 5, n.ncode = 4 + (15 & b), b >>>= 4, x -= 4, 286 < n.nlen || 30 < n.ndist) {
								e.msg = "too many length or distance symbols", n.mode = 30;
								break;
							}
							n.have = 0, n.mode = 18;
						case 18:
							for (; n.have < n.ncode;) {
								for (; x < 3;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.lens[V[n.have++]] = 7 & b, b >>>= 3, x -= 3;
							}
							for (; n.have < 19;) n.lens[V[n.have++]] = 0;
							if (n.lencode = n.lendyn, n.lenbits = 7, L = { bits: n.lenbits }, I = s(0, n.lens, 0, 19, n.lencode, 0, n.work, L), n.lenbits = L.bits, I) {
								e.msg = "invalid code lengths set", n.mode = 30;
								break;
							}
							n.have = 0, n.mode = 19;
						case 19:
							for (; n.have < n.nlen + n.ndist;) {
								for (; A = (z = n.lencode[b & (1 << n.lenbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (j < 16) b >>>= k, x -= k, n.lens[n.have++] = j;
								else {
									if (j === 16) {
										for (R = k + 2; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										if (b >>>= k, x -= k, n.have === 0) {
											e.msg = "invalid bit length repeat", n.mode = 30;
											break;
										}
										F = n.lens[n.have - 1], E = 3 + (3 & b), b >>>= 2, x -= 2;
									} else if (j === 17) {
										for (R = k + 3; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										x -= k, F = 0, E = 3 + (7 & (b >>>= k)), b >>>= 3, x -= 3;
									} else {
										for (R = k + 7; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										x -= k, F = 0, E = 11 + (127 & (b >>>= k)), b >>>= 7, x -= 7;
									}
									if (n.have + E > n.nlen + n.ndist) {
										e.msg = "invalid bit length repeat", n.mode = 30;
										break;
									}
									for (; E--;) n.lens[n.have++] = F;
								}
							}
							if (n.mode === 30) break;
							if (n.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block", n.mode = 30;
								break;
							}
							if (n.lenbits = 9, L = { bits: n.lenbits }, I = s(c, n.lens, 0, n.nlen, n.lencode, 0, n.work, L), n.lenbits = L.bits, I) {
								e.msg = "invalid literal/lengths set", n.mode = 30;
								break;
							}
							if (n.distbits = 6, n.distcode = n.distdyn, L = { bits: n.distbits }, I = s(l, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, L), n.distbits = L.bits, I) {
								e.msg = "invalid distances set", n.mode = 30;
								break;
							}
							if (n.mode = 20, t === 6) break e;
						case 20: n.mode = 21;
						case 21:
							if (6 <= v && 258 <= y) {
								e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, o(e, C), _ = e.next_out, m = e.output, y = e.avail_out, g = e.next_in, p = e.input, v = e.avail_in, b = n.hold, x = n.bits, n.mode === 12 && (n.back = -1);
								break;
							}
							for (n.back = 0; A = (z = n.lencode[b & (1 << n.lenbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (A && !(240 & A)) {
								for (M = k, N = A, P = j; A = (z = n.lencode[P + ((b & (1 << M + N) - 1) >> M)]) >>> 16 & 255, j = 65535 & z, !(M + (k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								b >>>= M, x -= M, n.back += M;
							}
							if (b >>>= k, x -= k, n.back += k, n.length = j, A === 0) {
								n.mode = 26;
								break;
							}
							if (32 & A) {
								n.back = -1, n.mode = 12;
								break;
							}
							if (64 & A) {
								e.msg = "invalid literal/length code", n.mode = 30;
								break;
							}
							n.extra = 15 & A, n.mode = 22;
						case 22:
							if (n.extra) {
								for (R = n.extra; x < R;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.length += b & (1 << n.extra) - 1, b >>>= n.extra, x -= n.extra, n.back += n.extra;
							}
							n.was = n.length, n.mode = 23;
						case 23:
							for (; A = (z = n.distcode[b & (1 << n.distbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (!(240 & A)) {
								for (M = k, N = A, P = j; A = (z = n.distcode[P + ((b & (1 << M + N) - 1) >> M)]) >>> 16 & 255, j = 65535 & z, !(M + (k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								b >>>= M, x -= M, n.back += M;
							}
							if (b >>>= k, x -= k, n.back += k, 64 & A) {
								e.msg = "invalid distance code", n.mode = 30;
								break;
							}
							n.offset = j, n.extra = 15 & A, n.mode = 24;
						case 24:
							if (n.extra) {
								for (R = n.extra; x < R;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.offset += b & (1 << n.extra) - 1, b >>>= n.extra, x -= n.extra, n.back += n.extra;
							}
							if (n.offset > n.dmax) {
								e.msg = "invalid distance too far back", n.mode = 30;
								break;
							}
							n.mode = 25;
						case 25:
							if (y === 0) break e;
							if (E = C - y, n.offset > E) {
								if ((E = n.offset - E) > n.whave && n.sane) {
									e.msg = "invalid distance too far back", n.mode = 30;
									break;
								}
								D = E > n.wnext ? (E -= n.wnext, n.wsize - E) : n.wnext - E, E > n.length && (E = n.length), O = n.window;
							} else O = m, D = _ - n.offset, E = n.length;
							for (y < E && (E = y), y -= E, n.length -= E; m[_++] = O[D++], --E;);
							n.length === 0 && (n.mode = 21);
							break;
						case 26:
							if (y === 0) break e;
							m[_++] = n.length, y--, n.mode = 21;
							break;
						case 27:
							if (n.wrap) {
								for (; x < 32;) {
									if (v === 0) break e;
									v--, b |= p[g++] << x, x += 8;
								}
								if (C -= y, e.total_out += C, n.total += C, C && (e.adler = n.check = n.flags ? a(n.check, m, C, _ - C) : i(n.check, m, C, _ - C)), C = y, (n.flags ? b : h(b)) !== n.check) {
									e.msg = "incorrect data check", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.mode = 28;
						case 28:
							if (n.wrap && n.flags) {
								for (; x < 32;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (b !== (4294967295 & n.total)) {
									e.msg = "incorrect length check", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.mode = 29;
						case 29:
							I = 1;
							break e;
						case 30:
							I = -3;
							break e;
						case 31: return -4;
						case 32:
						default: return d;
					}
					return e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, (n.wsize || C !== e.avail_out && n.mode < 30 && (n.mode < 27 || t !== 4)) && T(e, e.output, e.next_out, C - e.avail_out) ? (n.mode = 31, -4) : (S -= e.avail_in, C -= e.avail_out, e.total_in += S, e.total_out += C, n.total += C, n.wrap && C && (e.adler = n.check = n.flags ? a(n.check, m, C, e.next_out - C) : i(n.check, m, C, e.next_out - C)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === 12 ? 128 : 0) + (n.mode === 20 || n.mode === 15 ? 256 : 0), (S == 0 && C === 0 || t === 4) && I === u && (I = -5), I);
				}, n.inflateEnd = function(e) {
					if (!e || !e.state) return d;
					var t = e.state;
					return t.window &&= null, e.state = null, u;
				}, n.inflateGetHeader = function(e, t) {
					var n;
					return e && e.state && 2 & (n = e.state).wrap ? ((n.head = t).done = !1, u) : d;
				}, n.inflateSetDictionary = function(e, t) {
					var n, r = t.length;
					return e && e.state ? (n = e.state).wrap !== 0 && n.mode !== 11 ? d : n.mode === 11 && i(1, t, r, 0) !== n.check ? -3 : T(e, t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, u) : d;
				}, n.inflateInfo = "pako inflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./inffast": 48,
				"./inftrees": 50
			}],
			50: [function(e, t, n) {
				var r = e("../utils/common"), i = [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					13,
					15,
					17,
					19,
					23,
					27,
					31,
					35,
					43,
					51,
					59,
					67,
					83,
					99,
					115,
					131,
					163,
					195,
					227,
					258,
					0,
					0
				], a = [
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					17,
					17,
					17,
					17,
					18,
					18,
					18,
					18,
					19,
					19,
					19,
					19,
					20,
					20,
					20,
					20,
					21,
					21,
					21,
					21,
					16,
					72,
					78
				], o = [
					1,
					2,
					3,
					4,
					5,
					7,
					9,
					13,
					17,
					25,
					33,
					49,
					65,
					97,
					129,
					193,
					257,
					385,
					513,
					769,
					1025,
					1537,
					2049,
					3073,
					4097,
					6145,
					8193,
					12289,
					16385,
					24577,
					0,
					0
				], s = [
					16,
					16,
					16,
					16,
					17,
					17,
					18,
					18,
					19,
					19,
					20,
					20,
					21,
					21,
					22,
					22,
					23,
					23,
					24,
					24,
					25,
					25,
					26,
					26,
					27,
					27,
					28,
					28,
					29,
					29,
					64,
					64
				];
				t.exports = function(e, t, n, c, l, u, d, f) {
					var p, m, h, g, _, v, y, b, x, S = f.bits, C = 0, w = 0, T = 0, E = 0, D = 0, O = 0, k = 0, A = 0, j = 0, M = 0, N = null, P = 0, F = new r.Buf16(16), I = new r.Buf16(16), L = null, R = 0;
					for (C = 0; C <= 15; C++) F[C] = 0;
					for (w = 0; w < c; w++) F[t[n + w]]++;
					for (D = S, E = 15; 1 <= E && F[E] === 0; E--);
					if (E < D && (D = E), E === 0) return l[u++] = 20971520, l[u++] = 20971520, f.bits = 1, 0;
					for (T = 1; T < E && F[T] === 0; T++);
					for (D < T && (D = T), C = A = 1; C <= 15; C++) if (A <<= 1, (A -= F[C]) < 0) return -1;
					if (0 < A && (e === 0 || E !== 1)) return -1;
					for (I[1] = 0, C = 1; C < 15; C++) I[C + 1] = I[C] + F[C];
					for (w = 0; w < c; w++) t[n + w] !== 0 && (d[I[t[n + w]]++] = w);
					if (v = e === 0 ? (N = L = d, 19) : e === 1 ? (N = i, P -= 257, L = a, R -= 257, 256) : (N = o, L = s, -1), C = T, _ = u, k = w = M = 0, h = -1, g = (j = 1 << (O = D)) - 1, e === 1 && 852 < j || e === 2 && 592 < j) return 1;
					for (;;) {
						for (y = C - k, x = d[w] < v ? (b = 0, d[w]) : d[w] > v ? (b = L[R + d[w]], N[P + d[w]]) : (b = 96, 0), p = 1 << C - k, T = m = 1 << O; l[_ + (M >> k) + (m -= p)] = y << 24 | b << 16 | x | 0, m !== 0;);
						for (p = 1 << C - 1; M & p;) p >>= 1;
						if (p === 0 ? M = 0 : (M &= p - 1, M += p), w++, --F[C] == 0) {
							if (C === E) break;
							C = t[n + d[w]];
						}
						if (D < C && (M & g) !== h) {
							for (k === 0 && (k = D), _ += T, A = 1 << (O = C - k); O + k < E && !((A -= F[O + k]) <= 0);) O++, A <<= 1;
							if (j += 1 << O, e === 1 && 852 < j || e === 2 && 592 < j) return 1;
							l[h = M & g] = D << 24 | O << 16 | _ - u | 0;
						}
					}
					return M !== 0 && (l[_ + M] = C - k << 24 | 4194304), f.bits = D, 0;
				};
			}, { "../utils/common": 41 }],
			51: [function(e, t, n) {
				t.exports = {
					2: "need dictionary",
					1: "stream end",
					0: "",
					"-1": "file error",
					"-2": "stream error",
					"-3": "data error",
					"-4": "insufficient memory",
					"-5": "buffer error",
					"-6": "incompatible version"
				};
			}, {}],
			52: [function(e, t, n) {
				var r = e("../utils/common"), i = 0, a = 1;
				function o(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				var s = 0, c = 29, l = 256, u = l + 1 + c, d = 30, f = 19, p = 2 * u + 1, m = 15, h = 16, g = 7, _ = 256, v = 16, y = 17, b = 18, x = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					3,
					3,
					3,
					3,
					4,
					4,
					4,
					4,
					5,
					5,
					5,
					5,
					0
				], S = [
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					2,
					3,
					3,
					4,
					4,
					5,
					5,
					6,
					6,
					7,
					7,
					8,
					8,
					9,
					9,
					10,
					10,
					11,
					11,
					12,
					12,
					13,
					13
				], C = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					2,
					3,
					7
				], w = [
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				], T = Array(2 * (u + 2));
				o(T);
				var E = Array(2 * d);
				o(E);
				var D = Array(512);
				o(D);
				var O = Array(256);
				o(O);
				var k = Array(c);
				o(k);
				var A, j, M, N = Array(d);
				function P(e, t, n, r, i) {
					this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
				}
				function F(e, t) {
					this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
				}
				function I(e) {
					return e < 256 ? D[e] : D[256 + (e >>> 7)];
				}
				function L(e, t) {
					e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
				}
				function R(e, t, n) {
					e.bi_valid > h - n ? (e.bi_buf |= t << e.bi_valid & 65535, L(e, e.bi_buf), e.bi_buf = t >> h - e.bi_valid, e.bi_valid += n - h) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
				}
				function z(e, t, n) {
					R(e, n[2 * t], n[2 * t + 1]);
				}
				function B(e, t) {
					for (var n = 0; n |= 1 & e, e >>>= 1, n <<= 1, 0 < --t;);
					return n >>> 1;
				}
				function V(e, t, n) {
					var r, i, a = Array(m + 1), o = 0;
					for (r = 1; r <= m; r++) a[r] = o = o + n[r - 1] << 1;
					for (i = 0; i <= t; i++) {
						var s = e[2 * i + 1];
						s !== 0 && (e[2 * i] = B(a[s]++, s));
					}
				}
				function H(e) {
					var t;
					for (t = 0; t < u; t++) e.dyn_ltree[2 * t] = 0;
					for (t = 0; t < d; t++) e.dyn_dtree[2 * t] = 0;
					for (t = 0; t < f; t++) e.bl_tree[2 * t] = 0;
					e.dyn_ltree[2 * _] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
				}
				function U(e) {
					8 < e.bi_valid ? L(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
				}
				function W(e, t, n, r) {
					var i = 2 * t, a = 2 * n;
					return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
				}
				function G(e, t, n) {
					for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && W(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !W(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
					e.heap[n] = r;
				}
				function ee(e, t, n) {
					var r, i, a, o, s = 0;
					if (e.last_lit !== 0) for (; r = e.pending_buf[e.d_buf + 2 * s] << 8 | e.pending_buf[e.d_buf + 2 * s + 1], i = e.pending_buf[e.l_buf + s], s++, r === 0 ? z(e, i, t) : (z(e, (a = O[i]) + l + 1, t), (o = x[a]) !== 0 && R(e, i -= k[a], o), z(e, a = I(--r), n), (o = S[a]) !== 0 && R(e, r -= N[a], o)), s < e.last_lit;);
					z(e, _, t);
				}
				function te(e, t) {
					var n, r, i, a = t.dyn_tree, o = t.stat_desc.static_tree, s = t.stat_desc.has_stree, c = t.stat_desc.elems, l = -1;
					for (e.heap_len = 0, e.heap_max = p, n = 0; n < c; n++) a[2 * n] === 0 ? a[2 * n + 1] = 0 : (e.heap[++e.heap_len] = l = n, e.depth[n] = 0);
					for (; e.heap_len < 2;) a[2 * (i = e.heap[++e.heap_len] = l < 2 ? ++l : 0)] = 1, e.depth[i] = 0, e.opt_len--, s && (e.static_len -= o[2 * i + 1]);
					for (t.max_code = l, n = e.heap_len >> 1; 1 <= n; n--) G(e, a, n);
					for (i = c; n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], G(e, a, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, a[2 * i] = a[2 * n] + a[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, a[2 * n + 1] = a[2 * r + 1] = i, e.heap[1] = i++, G(e, a, 1), 2 <= e.heap_len;);
					e.heap[--e.heap_max] = e.heap[1], function(e, t) {
						var n, r, i, a, o, s, c = t.dyn_tree, l = t.max_code, u = t.stat_desc.static_tree, d = t.stat_desc.has_stree, f = t.stat_desc.extra_bits, h = t.stat_desc.extra_base, g = t.stat_desc.max_length, _ = 0;
						for (a = 0; a <= m; a++) e.bl_count[a] = 0;
						for (c[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < p; n++) g < (a = c[2 * c[2 * (r = e.heap[n]) + 1] + 1] + 1) && (a = g, _++), c[2 * r + 1] = a, l < r || (e.bl_count[a]++, o = 0, h <= r && (o = f[r - h]), s = c[2 * r], e.opt_len += s * (a + o), d && (e.static_len += s * (u[2 * r + 1] + o)));
						if (_ !== 0) {
							do {
								for (a = g - 1; e.bl_count[a] === 0;) a--;
								e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[g]--, _ -= 2;
							} while (0 < _);
							for (a = g; a !== 0; a--) for (r = e.bl_count[a]; r !== 0;) l < (i = e.heap[--n]) || (c[2 * i + 1] !== a && (e.opt_len += (a - c[2 * i + 1]) * c[2 * i], c[2 * i + 1] = a), r--);
						}
					}(e, t), V(a, l, e.bl_count);
				}
				function ne(e, t, n) {
					var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = o, o = t[2 * (r + 1) + 1], ++s < c && i === o || (s < l ? e.bl_tree[2 * i] += s : i === 0 ? s <= 10 ? e.bl_tree[2 * y]++ : e.bl_tree[2 * b]++ : (i !== a && e.bl_tree[2 * i]++, e.bl_tree[2 * v]++), a = i, l = (s = 0) === o ? (c = 138, 3) : i === o ? (c = 6, 3) : (c = 7, 4));
				}
				function re(e, t, n) {
					var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (i = o, o = t[2 * (r + 1) + 1], !(++s < c && i === o)) {
						if (s < l) for (; z(e, i, e.bl_tree), --s != 0;);
						else i === 0 ? s <= 10 ? (z(e, y, e.bl_tree), R(e, s - 3, 3)) : (z(e, b, e.bl_tree), R(e, s - 11, 7)) : (i !== a && (z(e, i, e.bl_tree), s--), z(e, v, e.bl_tree), R(e, s - 3, 2));
						a = i, l = (s = 0) === o ? (c = 138, 3) : i === o ? (c = 6, 3) : (c = 7, 4);
					}
				}
				o(N);
				var ie = !1;
				function ae(e, t, n, i) {
					R(e, (s << 1) + +!!i, 3), function(e, t, n, i) {
						U(e), i && (L(e, n), L(e, ~n)), r.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
					}(e, t, n, !0);
				}
				n._tr_init = function(e) {
					ie ||= (function() {
						var e, t, n, r, i, a = Array(m + 1);
						for (r = n = 0; r < c - 1; r++) for (k[r] = n, e = 0; e < 1 << x[r]; e++) O[n++] = r;
						for (O[n - 1] = r, r = i = 0; r < 16; r++) for (N[r] = i, e = 0; e < 1 << S[r]; e++) D[i++] = r;
						for (i >>= 7; r < d; r++) for (N[r] = i << 7, e = 0; e < 1 << S[r] - 7; e++) D[256 + i++] = r;
						for (t = 0; t <= m; t++) a[t] = 0;
						for (e = 0; e <= 143;) T[2 * e + 1] = 8, e++, a[8]++;
						for (; e <= 255;) T[2 * e + 1] = 9, e++, a[9]++;
						for (; e <= 279;) T[2 * e + 1] = 7, e++, a[7]++;
						for (; e <= 287;) T[2 * e + 1] = 8, e++, a[8]++;
						for (V(T, u + 1, a), e = 0; e < d; e++) E[2 * e + 1] = 5, E[2 * e] = B(e, 5);
						A = new P(T, x, l + 1, u, m), j = new P(E, S, 0, d, m), M = new P([], C, 0, f, g);
					}(), !0), e.l_desc = new F(e.dyn_ltree, A), e.d_desc = new F(e.dyn_dtree, j), e.bl_desc = new F(e.bl_tree, M), e.bi_buf = 0, e.bi_valid = 0, H(e);
				}, n._tr_stored_block = ae, n._tr_flush_block = function(e, t, n, r) {
					var o, s, c = 0;
					0 < e.level ? (e.strm.data_type === 2 && (e.strm.data_type = function(e) {
						var t, n = 4093624447;
						for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && e.dyn_ltree[2 * t] !== 0) return i;
						if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return a;
						for (t = 32; t < l; t++) if (e.dyn_ltree[2 * t] !== 0) return a;
						return i;
					}(e)), te(e, e.l_desc), te(e, e.d_desc), c = function(e) {
						var t;
						for (ne(e, e.dyn_ltree, e.l_desc.max_code), ne(e, e.dyn_dtree, e.d_desc.max_code), te(e, e.bl_desc), t = f - 1; 3 <= t && e.bl_tree[2 * w[t] + 1] === 0; t--);
						return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
					}(e), o = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= o && (o = s)) : o = s = n + 5, n + 4 <= o && t !== -1 ? ae(e, t, n, r) : e.strategy === 4 || s === o ? (R(e, 2 + +!!r, 3), ee(e, T, E)) : (R(e, 4 + +!!r, 3), function(e, t, n, r) {
						var i;
						for (R(e, t - 257, 5), R(e, n - 1, 5), R(e, r - 4, 4), i = 0; i < r; i++) R(e, e.bl_tree[2 * w[i] + 1], 3);
						re(e, e.dyn_ltree, t - 1), re(e, e.dyn_dtree, n - 1);
					}(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, c + 1), ee(e, e.dyn_ltree, e.dyn_dtree)), H(e), r && U(e);
				}, n._tr_tally = function(e, t, n) {
					return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, t === 0 ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (O[n] + l + 1)]++, e.dyn_dtree[2 * I(t)]++), e.last_lit === e.lit_bufsize - 1;
				}, n._tr_align = function(e) {
					R(e, 2, 3), z(e, _, T), function(e) {
						e.bi_valid === 16 ? (L(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
					}(e);
				};
			}, { "../utils/common": 41 }],
			53: [function(e, t, n) {
				t.exports = function() {
					this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
				};
			}, {}],
			54: [function(e, t, n) {
				(function(e) {
					(function(e, t) {
						if (!e.setImmediate) {
							var n, r, i, a, o = 1, s = {}, c = !1, l = e.document, u = Object.getPrototypeOf && Object.getPrototypeOf(e);
							u = u && u.setTimeout ? u : e, n = {}.toString.call(e.process) === "[object process]" ? function(e) {
								process.nextTick(function() {
									f(e);
								});
							} : function() {
								if (e.postMessage && !e.importScripts) {
									var t = !0, n = e.onmessage;
									return e.onmessage = function() {
										t = !1;
									}, e.postMessage("", "*"), e.onmessage = n, t;
								}
							}() ? (a = "setImmediate$" + Math.random() + "$", e.addEventListener ? e.addEventListener("message", p, !1) : e.attachEvent("onmessage", p), function(t) {
								e.postMessage(a + t, "*");
							}) : e.MessageChannel ? ((i = new MessageChannel()).port1.onmessage = function(e) {
								f(e.data);
							}, function(e) {
								i.port2.postMessage(e);
							}) : l && "onreadystatechange" in l.createElement("script") ? (r = l.documentElement, function(e) {
								var t = l.createElement("script");
								t.onreadystatechange = function() {
									f(e), t.onreadystatechange = null, r.removeChild(t), t = null;
								}, r.appendChild(t);
							}) : function(e) {
								setTimeout(f, 0, e);
							}, u.setImmediate = function(e) {
								typeof e != "function" && (e = Function("" + e));
								for (var t = Array(arguments.length - 1), r = 0; r < t.length; r++) t[r] = arguments[r + 1];
								return s[o] = {
									callback: e,
									args: t
								}, n(o), o++;
							}, u.clearImmediate = d;
						}
						function d(e) {
							delete s[e];
						}
						function f(e) {
							if (c) setTimeout(f, 0, e);
							else {
								var n = s[e];
								if (n) {
									c = !0;
									try {
										(function(e) {
											var n = e.callback, r = e.args;
											switch (r.length) {
												case 0:
													n();
													break;
												case 1:
													n(r[0]);
													break;
												case 2:
													n(r[0], r[1]);
													break;
												case 3:
													n(r[0], r[1], r[2]);
													break;
												default: n.apply(t, r);
											}
										})(n);
									} finally {
										d(e), c = !1;
									}
								}
							}
						}
						function p(t) {
							t.source === e && typeof t.data == "string" && t.data.indexOf(a) === 0 && f(+t.data.slice(a.length));
						}
					})(typeof self > "u" ? e === void 0 ? this : e : self);
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}]
		}, {}, [10])(10);
	});
})))(), 1);
function ae(e = {}) {
	let { storageKey: t = "page-reviews", defaultPagePath: n = () => typeof window < "u" ? window.location.pathname + window.location.search : "/" } = e;
	function r() {
		return "rv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
	}
	function i() {
		if (typeof window > "u") return [];
		try {
			let e = window.localStorage.getItem(t);
			return (e ? JSON.parse(e) : []).map(oe);
		} catch {
			return [];
		}
	}
	function a(e) {
		if (!(typeof window > "u")) try {
			window.localStorage.setItem(t, JSON.stringify(e));
		} catch {}
	}
	let o = p(i()), s = () => o.value;
	function c(e) {
		let t = e || n();
		return o.value.filter((e) => e.pagePath === t);
	}
	function l(e) {
		let t = {
			id: r(),
			...e,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		return o.value.unshift(t), a(o.value), t;
	}
	function u(e, t) {
		let n = o.value.findIndex((t) => t.id === e);
		n > -1 && (o.value[n] = {
			...o.value[n],
			...t
		}, a(o.value));
	}
	function d(e) {
		o.value = o.value.filter((t) => t.id !== e), a(o.value);
	}
	function f(e) {
		let t = e || n();
		o.value = o.value.filter((e) => e.pagePath !== t), a(o.value);
	}
	function m() {
		o.value = [], a([]);
	}
	function h() {
		return {
			exportTime: (/* @__PURE__ */ new Date()).toISOString(),
			total: o.value.length,
			reviews: o.value
		};
	}
	function g() {
		ce(new Blob([JSON.stringify(h(), null, 2)], { type: "application/json" }), `page-reviews-${le()}.json`);
	}
	function _() {
		let e = se(h());
		ce(new Blob([e], { type: "text/markdown" }), `page-reviews-${le()}.md`);
	}
	async function v() {
		let e = new ie.default(), t = h(), n = {
			...t,
			reviews: t.reviews.map((e) => ({
				...e,
				screenshots: e.screenshots?.map((e) => e.url ? {
					type: e.type,
					filename: e.filename,
					url: e.url
				} : {
					type: e.type,
					filename: e.filename,
					imagePath: `images/${e.filename}`
				})
			}))
		};
		e.file("review.json", JSON.stringify(n, null, 2)), e.file("review.md", se(n));
		let r = e.folder("images");
		for (let e of t.reviews) for (let t of e.screenshots || []) if (t.data && !t.url) {
			let e = t.data.replace(/^data:image\/png;base64,/, "");
			r.file(t.filename, e, { base64: !0 });
		}
		ce(await e.generateAsync({ type: "blob" }), `page-reviews-${le()}.zip`);
	}
	return {
		reviews: o,
		allReviews: s,
		getPageReviews: c,
		addReview: l,
		updateReview: u,
		deleteReview: d,
		clearPageReviews: f,
		clearAllReviews: m,
		exportToJSON: g,
		exportToMarkdown: _,
		exportToZIP: v
	};
}
function oe(e) {
	if (!e || e.targets) return e;
	let t = e.type === "element" ? {
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
		targets: [t]
	};
}
function se(e) {
	let t = [
		"# 页面评审报告",
		"",
		`导出时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`,
		`评审总数：${e.total}`,
		""
	], n = K(e.reviews, "pagePath");
	return Object.entries(n).forEach(([e, n]) => {
		t.push(`## 页面：${e}`), t.push(""), n.forEach((e, n) => {
			t.push(`### ${n + 1}. ${e.title || "未命名评审"}`), t.push(`- **严重等级**：${de(e.severity)}`), t.push(`- **状态**：${e.status === "resolved" ? "已解决" : "待处理"}`), t.push(`- **窗口尺寸**：${e.viewport?.width} × ${e.viewport?.height}`), e.scroll && t.push(`- **滚动位置**：x=${e.scroll.x}, y=${e.scroll.y}`);
			let r = e.targets || [];
			r.length > 0 && (t.push(`- **评审目标数**：${r.length}`), r.forEach((e, n) => {
				e.type === "element" && e.elementRect ? (t.push(`  - 目标 ${n + 1}（元素）：\`${e.selector}\` x=${e.elementRect.x}, y=${e.elementRect.y}, w=${e.elementRect.width}, h=${e.elementRect.height}`), e.elementText && t.push(`    文本：${e.elementText}`)) : e.viewportRect && t.push(`  - 目标 ${n + 1}（框选）：x=${e.viewportRect.x}, y=${e.viewportRect.y}, w=${e.viewportRect.width}, h=${e.viewportRect.height}`);
			})), t.push(`- **评审建议**：${e.suggestion}`), t.push(`- **创建时间**：${new Date(e.createdAt).toLocaleString()}`), e.locators && Object.keys(e.locators).length > 0 && (t.push(""), t.push("#### 定位信息"), e.locators.cssSelector && t.push(`- **CSS Selector**: \`${e.locators.cssSelector}\``), e.locators.xpath && t.push(`- **XPath**: \`${e.locators.xpath}\``), e.locators.aria?.role && t.push(`- **ARIA Role**: ${e.locators.aria.role}`), e.locators.aria?.accessibleName && t.push(`- **Accessible Name**: ${e.locators.aria.accessibleName}`), e.locators.testId && t.push(`- **data-testid**: ${e.locators.testId}`)), e.screenshots && e.screenshots.length > 0 && (t.push(""), t.push("#### 截图"), e.screenshots.forEach((e) => {
				let n = e.url || e.imagePath || `images/${e.filename}`;
				t.push(`![${e.type}](${n})`);
			})), t.push("");
		});
	}), t.join("\n");
}
function ce(e, t) {
	if (typeof window > "u") return;
	let n = URL.createObjectURL(e), r = document.createElement("a");
	r.href = n, r.download = t, r.style.display = "none", document.body.appendChild(r), r.click(), setTimeout(() => {
		r.parentNode && document.body.removeChild(r), URL.revokeObjectURL(n);
	}, 1e3);
}
function le() {
	let e = /* @__PURE__ */ new Date();
	return `${e.getFullYear()}${ue(e.getMonth() + 1)}${ue(e.getDate())}-${ue(e.getHours())}${ue(e.getMinutes())}`;
}
function ue(e) {
	return String(e).padStart(2, "0");
}
function de(e) {
	return {
		low: "低",
		medium: "中",
		high: "高",
		critical: "严重"
	}[e] || e;
}
function K(e, t) {
	return e.reduce((e, n) => {
		let r = n[t] || "unknown";
		return e[r] || (e[r] = []), e[r].push(n), e;
	}, {});
}
//#endregion
//#region src/composables/useElementSelection.js
function fe({ active: e, mode: t, onIgnoreTarget: n } = {}) {
	let r = p(null), i = p(""), a = p([]), o = p({
		x: 0,
		y: 0
	}), s = () => !!g(e) && g(t) === "element", c = (e) => {
		let t = e.target;
		return !t || !(t instanceof Element) || n && n(t) ? null : t;
	}, l = (e) => {
		if (!s() || e.buttons !== 0) return;
		let t = c(e);
		if (!t) {
			r.value = null;
			return;
		}
		let n = t.getBoundingClientRect();
		r.value = {
			x: n.left,
			y: n.top,
			width: n.width,
			height: n.height
		}, i.value = t.tagName.toLowerCase();
	}, u = () => {
		r.value = null;
	}, d = (e) => {
		if (!s()) return;
		let t = c(e);
		if (!t || t.closest("a[download]")) return;
		e.preventDefault(), e.stopPropagation();
		let n = t.getBoundingClientRect(), r = {
			el: t,
			selector: me(t),
			tag: t.tagName.toLowerCase(),
			text: t.innerText?.slice(0, 40) || "",
			rect: {
				x: n.left,
				y: n.top,
				width: n.width,
				height: n.height
			},
			docRect: {
				x: n.left + o.value.x,
				y: n.top + o.value.y,
				width: n.width,
				height: n.height
			}
		};
		if (pe(e)) {
			let e = a.value.findIndex((e) => e.el === t);
			e > -1 ? a.value.splice(e, 1) : a.value.push(r);
		} else a.value = [r];
	}, f = () => {
		a.value = a.value.map((e) => {
			let t = e.el || (e.selector ? document.querySelector(e.selector) : null);
			if (!t) return e;
			let n = t.getBoundingClientRect();
			return {
				...e,
				el: t,
				rect: {
					x: n.left,
					y: n.top,
					width: n.width,
					height: n.height
				}
			};
		});
	}, m = () => {
		o.value = {
			x: window.scrollX,
			y: window.scrollY
		}, f();
	};
	return v((t) => {
		g(e) && (o.value = {
			x: window.scrollX,
			y: window.scrollY
		}, window.addEventListener("scroll", m, !0), t(() => {
			window.removeEventListener("scroll", m, !0);
		}));
	}), v((e) => {
		s() && (document.addEventListener("mousemove", l), document.addEventListener("mouseout", u), document.addEventListener("click", d, !0), e(() => {
			document.removeEventListener("mousemove", l), document.removeEventListener("mouseout", u), document.removeEventListener("click", d, !0);
		}));
	}), {
		hoveredRect: r,
		hoveredTag: i,
		selectedElements: a,
		selectElement: (e) => {
			if (!e || !(e instanceof Element)) return;
			let t = e.getBoundingClientRect();
			a.value = [{
				el: e,
				selector: me(e),
				tag: e.tagName.toLowerCase(),
				text: e.innerText?.slice(0, 40) || "",
				rect: {
					x: t.left,
					y: t.top,
					width: t.width,
					height: t.height
				},
				docRect: {
					x: t.left + o.value.x,
					y: t.top + o.value.y,
					width: t.width,
					height: t.height
				}
			}];
		},
		removeSelectedElement: (e) => {
			a.value = a.value.filter((t) => t.el !== e.el);
		},
		clearSelectedElements: () => {
			a.value = [];
		},
		refreshRects: f
	};
}
function pe(e) {
	return e.ctrlKey || e.metaKey;
}
function me(e) {
	if (!e || !(e instanceof Element)) return "";
	if (e.id) return "#" + e.id;
	if (e.className) {
		let t = String(e.className).split(/\s+/).filter((e) => e && !e.startsWith("el-")).slice(0, 2);
		if (t.length) return e.tagName.toLowerCase() + "." + t.join(".");
	}
	let t = [], n = e;
	for (; n && n !== document.body;) {
		let e = n.tagName.toLowerCase();
		if (n.id) {
			e += "#" + n.id, t.unshift(e);
			break;
		}
		let r = Array.from(n.parentNode?.children || []).filter((e) => e.tagName === n.tagName);
		if (r.length > 1) {
			let t = r.indexOf(n) + 1;
			e += `:nth-of-type(${t})`;
		}
		t.unshift(e), n = n.parentNode;
	}
	return t.join(" > ");
}
//#endregion
//#region src/composables/useViewportBoxing.js
function he({ active: e, mode: t, onIgnoreTarget: r, onBoxCreate: i } = {}) {
	let a = p([]), o = p(null), s = p(null), c = p(!1), l = p({
		x: 0,
		y: 0
	}), u = p(0), d = {
		x: 0,
		y: 0
	}, f = "", m = {
		x: 0,
		y: 0,
		rect: null
	}, h = () => !!g(e) && g(t) === "viewport", _ = n(() => s.value !== null), y = (e) => {
		let t = e.target;
		return !t || !(t instanceof Element) || r && r(t) ? null : t;
	}, b = (e) => e ? {
		x: e.x - l.value.x,
		y: e.y - l.value.y,
		width: e.width,
		height: e.height
	} : null, x = (e) => {
		a.value = a.value.filter((t) => t.id !== e.id), a.value.forEach((e, t) => {
			e.index = t;
		});
	}, S = () => {
		a.value = [], o.value = null;
	}, C = (e, t, n) => {
		n.stopPropagation(), s.value = e.id, f = t, m = {
			x: n.clientX + window.scrollX,
			y: n.clientY + window.scrollY,
			rect: { ...e.rect }
		};
	}, w = (e) => {
		h() && (s.value || y(e) && (e.preventDefault(), c.value = !0, d = {
			x: e.clientX,
			y: e.clientY
		}, o.value = {
			x: e.clientX,
			y: e.clientY,
			width: 0,
			height: 0
		}));
	}, T = (e) => {
		if (!h() && !s.value) return;
		if (s.value && m.rect) {
			let t = e.clientX + window.scrollX - m.x, n = e.clientY + window.scrollY - m.y, r = m.rect, i = a.value.find((e) => e.id === s.value);
			if (!i) return;
			let { x: o, y: c, width: l, height: u } = r;
			f.includes("e") && (l = Math.max(10, r.width + t)), f.includes("s") && (u = Math.max(10, r.height + n)), f.includes("w") && (l = Math.max(10, r.width - t), o = r.x + (r.width - l)), f.includes("n") && (u = Math.max(10, r.height - n), c = r.y + (r.height - u)), i.rect = {
				x: o,
				y: c,
				width: l,
				height: u
			};
			return;
		}
		if (!c.value) return;
		let t = e.clientX, n = e.clientY;
		o.value = {
			x: Math.min(d.x, t),
			y: Math.min(d.y, n),
			width: Math.abs(t - d.x),
			height: Math.abs(n - d.y)
		};
	}, E = (e) => {
		if (!h() && !s.value) return;
		if (s.value) {
			s.value = null, f = "", m = {
				x: 0,
				y: 0,
				rect: null
			};
			return;
		}
		if (!c.value) return;
		c.value = !1;
		let t = o.value;
		if (t && t.width > 10 && t.height > 10) {
			let n = {
				id: "box-" + Date.now() + "-" + u.value++,
				index: a.value.length,
				rect: {
					x: t.x + window.scrollX,
					y: t.y + window.scrollY,
					width: t.width,
					height: t.height
				}
			};
			a.value.push(n), i?.(n, e);
		}
		o.value = null;
	}, D = () => {
		l.value = {
			x: window.scrollX,
			y: window.scrollY
		};
	};
	return v((t) => {
		g(e) && (l.value = {
			x: window.scrollX,
			y: window.scrollY
		}, window.addEventListener("scroll", D, !0), t(() => {
			window.removeEventListener("scroll", D, !0);
		}));
	}), v((e) => {
		!h() && !s.value || (document.addEventListener("mousedown", w), document.addEventListener("mousemove", T), document.addEventListener("mouseup", E), e(() => {
			document.removeEventListener("mousedown", w), document.removeEventListener("mousemove", T), document.removeEventListener("mouseup", E);
		}));
	}), {
		selectedBoxes: a,
		dragRect: o,
		resizingBoxId: s,
		isDraggingBox: c,
		isResizing: _,
		removeBox: x,
		clearBoxes: S,
		startResize: C,
		toViewportRect: b
	};
}
//#endregion
//#region src/composables/useDragResize.js
function ge({ initialPosition: e = {
	x: 0,
	y: 0
}, initialSize: t = {
	width: null,
	height: null
}, minWidth: n = 200, minHeight: r = 40, isDragHandle: i, measureRef: a = null } = {}) {
	let o = p({ ...e }), s = p({ ...t }), c = p(!1), l = p(!1), u = {
		x: 0,
		y: 0
	}, d = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	return _([c, l], ([e, t], i, a) => {
		if (!e && !t) return;
		let f = (e) => {
			if (c.value) o.value = {
				x: e.clientX - u.x,
				y: e.clientY - u.y
			};
			else if (l.value) {
				let t = e.clientX - d.x, i = e.clientY - d.y;
				s.value = {
					width: Math.max(n, d.width + t),
					height: Math.max(r, d.height + i)
				};
			}
		}, p = () => {
			c.value = !1, l.value = !1;
		};
		document.addEventListener("mousemove", f), document.addEventListener("mouseup", p), a(() => {
			document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", p);
		});
	}), {
		position: o,
		size: s,
		isDragging: c,
		isResizing: l,
		onDragStart: (e) => {
			i && !i(e.target) || (c.value = !0, u.x = e.clientX - o.value.x, u.y = e.clientY - o.value.y, e.stopPropagation());
		},
		onResizeStart: (e) => {
			let t = s.value.width ?? 0, n = s.value.height ?? 0;
			if ((t === 0 || n === 0) && a?.value) {
				let e = a.value.getBoundingClientRect();
				t = e.width, n = e.height;
			}
			s.value = {
				width: t,
				height: n
			}, l.value = !0, d.x = e.clientX, d.y = e.clientY, d.width = t, d.height = n, e.stopPropagation();
		}
	};
}
//#endregion
//#region src/composables/useHighlightOverlay.js
function _e({ active: e } = {}) {
	let t = p({
		x: 0,
		y: 0
	});
	return v((n) => {
		if (e !== void 0 && !g(e)) return;
		t.value = {
			x: window.scrollX,
			y: window.scrollY
		};
		let r = () => {
			t.value = {
				x: window.scrollX,
				y: window.scrollY
			};
		};
		window.addEventListener("scroll", r, !0), n(() => window.removeEventListener("scroll", r, !0));
	}), {
		scrollPos: t,
		toViewportRect: (e) => e ? {
			x: e.x - t.value.x,
			y: e.y - t.value.y,
			width: e.width,
			height: e.height
		} : null,
		highlightStyle: (e) => e ? {
			left: e.x + "px",
			top: e.y + "px",
			width: e.width + "px",
			height: e.height + "px"
		} : {},
		boxStyle: (e) => e ? {
			left: e.x + "px",
			top: e.y + "px",
			width: e.width + "px",
			height: e.height + "px"
		} : {},
		handleStyle: (e, t) => {
			let n = {};
			return e.includes("n") && (n.top = "-4px"), e.includes("s") && (n.bottom = "-4px"), e.includes("w") && (n.left = "-4px"), e.includes("e") && (n.right = "-4px"), (e === "n" || e === "s") && (n.left = t.width / 2 - 8 / 2 + "px"), (e === "w" || e === "e") && (n.top = t.height / 2 - 8 / 2 + "px"), n.width = "8px", n.height = "8px", n;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/util.js
function q(e, t) {
	if (e.match(/^[a-z]+:\/\//i)) return e;
	if (e.match(/^\/\//)) return window.location.protocol + e;
	if (e.match(/^[a-z]+:/i)) return e;
	let n = document.implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
	return n.head.appendChild(r), n.body.appendChild(i), t && (r.href = t), i.href = e, i.href;
}
var ve = (() => {
	let e = 0, t = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => (e += 1, `u${t()}${e}`);
})();
function J(e) {
	let t = [];
	for (let n = 0, r = e.length; n < r; n++) t.push(e[n]);
	return t;
}
var Y = null;
function X(e = {}) {
	return Y || (e.includeStyleProperties ? (Y = e.includeStyleProperties, Y) : (Y = J(window.getComputedStyle(document.documentElement)), Y));
}
function ye(e, t) {
	let n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
	return n ? parseFloat(n.replace("px", "")) : 0;
}
function be(e) {
	let t = ye(e, "border-left-width"), n = ye(e, "border-right-width");
	return e.clientWidth + t + n;
}
function xe(e) {
	let t = ye(e, "border-top-width"), n = ye(e, "border-bottom-width");
	return e.clientHeight + t + n;
}
function Se(e, t = {}) {
	return {
		width: t.width || be(e),
		height: t.height || xe(e)
	};
}
function Ce() {
	let e, t;
	try {
		t = process;
	} catch {}
	let n = t && t.env ? t.env.devicePixelRatio : null;
	return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
var Z = 16384;
function we(e) {
	(e.width > Z || e.height > Z) && (e.width > Z && e.height > Z ? e.width > e.height ? (e.height *= Z / e.width, e.width = Z) : (e.width *= Z / e.height, e.height = Z) : e.width > Z ? (e.height *= Z / e.width, e.width = Z) : (e.width *= Z / e.height, e.height = Z));
}
function Te(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => {
			r.decode().then(() => {
				requestAnimationFrame(() => t(r));
			});
		}, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
	});
}
async function Ee(e) {
	return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function De(e, t, n) {
	let r = "http://www.w3.org/2000/svg", i = document.createElementNS(r, "svg"), a = document.createElementNS(r, "foreignObject");
	return i.setAttribute("width", `${t}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${t} ${n}`), a.setAttribute("width", "100%"), a.setAttribute("height", "100%"), a.setAttribute("x", "0"), a.setAttribute("y", "0"), a.setAttribute("externalResourcesRequired", "true"), i.appendChild(a), a.appendChild(e), Ee(i);
}
var Q = (e, t) => {
	if (e instanceof t) return !0;
	let n = Object.getPrototypeOf(e);
	return n === null ? !1 : n.constructor.name === t.name || Q(n, t);
};
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/clone-pseudos.js
function Oe(e) {
	let t = e.getPropertyValue("content");
	return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function ke(e, t) {
	return X(t).map((t) => `${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t) ? " !important" : ""};`).join(" ");
}
function Ae(e, t, n, r) {
	let i = `.${e}:${t}`, a = n.cssText ? Oe(n) : ke(n, r);
	return document.createTextNode(`${i}{${a}}`);
}
function je(e, t, n, r) {
	let i = window.getComputedStyle(e, n), a = i.getPropertyValue("content");
	if (a === "" || a === "none") return;
	let o = ve();
	try {
		t.className = `${t.className} ${o}`;
	} catch {
		return;
	}
	let s = document.createElement("style");
	s.appendChild(Ae(o, n, i, r)), t.appendChild(s);
}
function Me(e, t, n) {
	je(e, t, ":before", n), je(e, t, ":after", n);
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/mimes.js
var Ne = "application/font-woff", Pe = "image/jpeg", $ = {
	woff: Ne,
	woff2: Ne,
	ttf: "application/font-truetype",
	eot: "application/vnd.ms-fontobject",
	png: "image/png",
	jpg: Pe,
	jpeg: Pe,
	gif: "image/gif",
	tiff: "image/tiff",
	svg: "image/svg+xml",
	webp: "image/webp"
};
function Fe(e) {
	let t = /\.([^./]*?)$/g.exec(e);
	return t ? t[1] : "";
}
function Ie(e) {
	return $[Fe(e).toLowerCase()] || "";
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/dataurl.js
function Le(e) {
	return e.split(/,/)[1];
}
function Re(e) {
	return e.search(/^(data:)/) !== -1;
}
function ze(e, t) {
	return `data:${t};base64,${e}`;
}
async function Be(e, t, n) {
	let r = await fetch(e, t);
	if (r.status === 404) throw Error(`Resource "${r.url}" not found`);
	let i = await r.blob();
	return new Promise((e, t) => {
		let a = new FileReader();
		a.onerror = t, a.onloadend = () => {
			try {
				e(n({
					res: r,
					result: a.result
				}));
			} catch (e) {
				t(e);
			}
		}, a.readAsDataURL(i);
	});
}
var Ve = {};
function He(e, t, n) {
	let r = e.replace(/\?.*/, "");
	return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Ue(e, t, n) {
	let r = He(e, t, n.includeQueryParams);
	if (Ve[r] != null) return Ve[r];
	n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
	let i;
	try {
		i = ze(await Be(e, n.fetchRequestInit, ({ res: e, result: n }) => (t ||= e.headers.get("Content-Type") || "", Le(n))), t);
	} catch (t) {
		i = n.imagePlaceholder || "";
		let r = `Failed to fetch resource: ${e}`;
		t && (r = typeof t == "string" ? t : t.message), r && console.warn(r);
	}
	return Ve[r] = i, i;
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/clone-node.js
async function We(e) {
	let t = e.toDataURL();
	return t === "data:," ? e.cloneNode(!1) : Te(t);
}
async function Ge(e, t) {
	if (e.currentSrc) {
		let t = document.createElement("canvas"), n = t.getContext("2d");
		return t.width = e.clientWidth, t.height = e.clientHeight, n?.drawImage(e, 0, 0, t.width, t.height), Te(t.toDataURL());
	}
	let n = e.poster;
	return Te(await Ue(n, Ie(n), t));
}
async function Ke(e, t) {
	try {
		if (e?.contentDocument?.body) return await nt(e.contentDocument.body, t, !0);
	} catch {}
	return e.cloneNode(!1);
}
async function qe(e, t) {
	return Q(e, HTMLCanvasElement) ? We(e) : Q(e, HTMLVideoElement) ? Ge(e, t) : Q(e, HTMLIFrameElement) ? Ke(e, t) : e.cloneNode(Ye(e));
}
var Je = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Ye = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Xe(e, t, n) {
	if (Ye(t)) return t;
	let r = [];
	return r = Je(e) && e.assignedNodes ? J(e.assignedNodes()) : Q(e, HTMLIFrameElement) && e.contentDocument?.body ? J(e.contentDocument.body.childNodes) : J((e.shadowRoot ?? e).childNodes), r.length === 0 || Q(e, HTMLVideoElement) || await r.reduce((e, r) => e.then(() => nt(r, n)).then((e) => {
		e && t.appendChild(e);
	}), Promise.resolve()), t;
}
function Ze(e, t, n) {
	let r = t.style;
	if (!r) return;
	let i = window.getComputedStyle(e);
	i.cssText ? (r.cssText = i.cssText, r.transformOrigin = i.transformOrigin) : X(n).forEach((n) => {
		let a = i.getPropertyValue(n);
		n === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - .1}px`), Q(e, HTMLIFrameElement) && n === "display" && a === "inline" && (a = "block"), n === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(n, a, i.getPropertyPriority(n));
	});
}
function Qe(e, t) {
	Q(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Q(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function $e(e, t) {
	if (Q(e, HTMLSelectElement)) {
		let n = t, r = Array.from(n.children).find((t) => e.value === t.getAttribute("value"));
		r && r.setAttribute("selected", "");
	}
}
function et(e, t, n) {
	return Q(t, Element) && (Ze(e, t, n), Me(e, t, n), Qe(e, t), $e(e, t)), t;
}
async function tt(e, t) {
	let n = e.querySelectorAll ? e.querySelectorAll("use") : [];
	if (n.length === 0) return e;
	let r = {};
	for (let i = 0; i < n.length; i++) {
		let a = n[i].getAttribute("xlink:href");
		if (a) {
			let n = e.querySelector(a), i = document.querySelector(a);
			!n && i && !r[a] && (r[a] = await nt(i, t, !0));
		}
	}
	let i = Object.values(r);
	if (i.length) {
		let t = "http://www.w3.org/1999/xhtml", n = document.createElementNS(t, "svg");
		n.setAttribute("xmlns", t), n.style.position = "absolute", n.style.width = "0", n.style.height = "0", n.style.overflow = "hidden", n.style.display = "none";
		let r = document.createElementNS(t, "defs");
		n.appendChild(r);
		for (let e = 0; e < i.length; e++) r.appendChild(i[e]);
		e.appendChild(n);
	}
	return e;
}
async function nt(e, t, n) {
	return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((e) => qe(e, t)).then((n) => Xe(e, n, t)).then((n) => et(e, n, t)).then((e) => tt(e, t));
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/embed-resources.js
var rt = /url\((['"]?)([^'"]+?)\1\)/g, it = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, at = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ot(e) {
	let t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function st(e) {
	let t = [];
	return e.replace(rt, (e, n, r) => (t.push(r), e)), t.filter((e) => !Re(e));
}
async function ct(e, t, n, r, i) {
	try {
		let a = n ? q(t, n) : t, o = Ie(t), s;
		return s = i ? ze(await i(a), o) : await Ue(a, o, r), e.replace(ot(t), `$1${s}$3`);
	} catch {}
	return e;
}
function lt(e, { preferredFontFormat: t }) {
	return t ? e.replace(at, (e) => {
		for (;;) {
			let [n, , r] = it.exec(e) || [];
			if (!r) return "";
			if (r === t) return `src: ${n};`;
		}
	}) : e;
}
function ut(e) {
	return e.search(rt) !== -1;
}
async function dt(e, t, n) {
	if (!ut(e)) return e;
	let r = lt(e, n);
	return st(r).reduce((e, r) => e.then((e) => ct(e, r, t, n)), Promise.resolve(r));
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/embed-images.js
async function ft(e, t, n) {
	let r = t.style?.getPropertyValue(e);
	if (r) {
		let i = await dt(r, null, n);
		return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
	}
	return !1;
}
async function pt(e, t) {
	await ft("background", e, t) || await ft("background-image", e, t), await ft("mask", e, t) || await ft("-webkit-mask", e, t) || await ft("mask-image", e, t) || await ft("-webkit-mask-image", e, t);
}
async function mt(e, t) {
	let n = Q(e, HTMLImageElement);
	if (!(n && !Re(e.src)) && !(Q(e, SVGImageElement) && !Re(e.href.baseVal))) return;
	let r = n ? e.src : e.href.baseVal, i = await Ue(r, Ie(r), t);
	await new Promise((r, a) => {
		e.onload = r, e.onerror = t.onImageErrorHandler ? (...e) => {
			try {
				r(t.onImageErrorHandler(...e));
			} catch (e) {
				a(e);
			}
		} : a;
		let o = e;
		o.decode &&= r, o.loading === "lazy" && (o.loading = "eager"), n ? (e.srcset = "", e.src = i) : e.href.baseVal = i;
	});
}
async function ht(e, t) {
	let n = J(e.childNodes).map((e) => gt(e, t));
	await Promise.all(n).then(() => e);
}
async function gt(e, t) {
	Q(e, Element) && (await pt(e, t), await mt(e, t), await ht(e, t));
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/apply-style.js
function _t(e, t) {
	let { style: n } = e;
	t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
	let r = t.style;
	return r != null && Object.keys(r).forEach((e) => {
		n[e] = r[e];
	}), e;
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/embed-webfonts.js
var vt = {};
async function yt(e) {
	let t = vt[e];
	return t ?? (t = {
		url: e,
		cssText: await (await fetch(e)).text()
	}, vt[e] = t, t);
}
async function bt(e, t) {
	let n = e.cssText, r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (i) => {
		let a = i.replace(r, "$1");
		return a.startsWith("https://") || (a = new URL(a, e.url).href), Be(a, t.fetchRequestInit, ({ result: e }) => (n = n.replace(i, `url(${e})`), [i, e]));
	});
	return Promise.all(i).then(() => n);
}
function xt(e) {
	if (e == null) return [];
	let t = [], n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, ""), r = /* @__PURE__ */ RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
	for (;;) {
		let e = r.exec(n);
		if (e === null) break;
		t.push(e[0]);
	}
	n = n.replace(r, "");
	let i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = /* @__PURE__ */ RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
	for (;;) {
		let e = i.exec(n);
		if (e === null) {
			if (e = a.exec(n), e === null) break;
			i.lastIndex = a.lastIndex;
		} else a.lastIndex = i.lastIndex;
		t.push(e[0]);
	}
	return t;
}
async function St(e, t) {
	let n = [], r = [];
	return e.forEach((n) => {
		if ("cssRules" in n) try {
			J(n.cssRules || []).forEach((e, i) => {
				if (e.type === CSSRule.IMPORT_RULE) {
					let a = i + 1, o = e.href, s = yt(o).then((e) => bt(e, t)).then((e) => xt(e).forEach((e) => {
						try {
							n.insertRule(e, e.startsWith("@import") ? a += 1 : n.cssRules.length);
						} catch (t) {
							console.error("Error inserting rule from remote css", {
								rule: e,
								error: t
							});
						}
					})).catch((e) => {
						console.error("Error loading remote css", e.toString());
					});
					r.push(s);
				}
			});
		} catch (i) {
			let a = e.find((e) => e.href == null) || document.styleSheets[0];
			n.href != null && r.push(yt(n.href).then((e) => bt(e, t)).then((e) => xt(e).forEach((e) => {
				a.insertRule(e, a.cssRules.length);
			})).catch((e) => {
				console.error("Error loading remote stylesheet", e);
			})), console.error("Error inlining remote css file", i);
		}
	}), Promise.all(r).then(() => (e.forEach((e) => {
		if ("cssRules" in e) try {
			J(e.cssRules || []).forEach((e) => {
				n.push(e);
			});
		} catch (t) {
			console.error(`Error while reading CSS rules from ${e.href}`, t);
		}
	}), n));
}
function Ct(e) {
	return e.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => ut(e.style.getPropertyValue("src")));
}
async function wt(e, t) {
	if (e.ownerDocument == null) throw Error("Provided element is not within a Document");
	return Ct(await St(J(e.ownerDocument.styleSheets), t));
}
function Tt(e) {
	return e.trim().replace(/["']/g, "");
}
function Et(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		(e.style.fontFamily || getComputedStyle(e).fontFamily).split(",").forEach((e) => {
			t.add(Tt(e));
		}), Array.from(e.children).forEach((e) => {
			e instanceof HTMLElement && n(e);
		});
	}
	return n(e), t;
}
async function Dt(e, t) {
	let n = await wt(e, t), r = Et(e);
	return (await Promise.all(n.filter((e) => r.has(Tt(e.style.fontFamily))).map((e) => {
		let n = e.parentStyleSheet ? e.parentStyleSheet.href : null;
		return dt(e.cssText, n, t);
	}))).join("\n");
}
async function Ot(e, t) {
	let n = t.fontEmbedCSS == null ? t.skipFonts ? null : await Dt(e, t) : t.fontEmbedCSS;
	if (n) {
		let t = document.createElement("style"), r = document.createTextNode(n);
		t.appendChild(r), e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
	}
}
//#endregion
//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/es/index.js
async function kt(e, t = {}) {
	let { width: n, height: r } = Se(e, t), i = await nt(e, t, !0);
	return await Ot(i, t), await gt(i, t), _t(i, t), await De(i, n, r);
}
async function At(e, t = {}) {
	let { width: n, height: r } = Se(e, t), i = await Te(await kt(e, t)), a = document.createElement("canvas"), o = a.getContext("2d"), s = t.pixelRatio || Ce(), c = t.canvasWidth || n, l = t.canvasHeight || r;
	return a.width = c * s, a.height = l * s, t.skipAutoScale || we(a), a.style.width = `${c}`, a.style.height = `${l}`, t.backgroundColor && (o.fillStyle = t.backgroundColor, o.fillRect(0, 0, a.width, a.height)), o.drawImage(i, 0, 0, a.width, a.height), a;
}
async function jt(e, t = {}) {
	return (await At(e, t)).toDataURL();
}
//#endregion
//#region src/screenshot.js
var Mt = {
	ELEMENT: "element",
	VIEWPORT: "viewport",
	FULL_PAGE: "fullpage",
	BOX: "box",
	TARGETS: "targets"
};
function Nt(e) {
	return `screenshot-${e}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.png`;
}
async function Pt(e, t = {}) {
	if (!e) return null;
	try {
		return await jt(e, {
			pixelRatio: t.pixelRatio || window.devicePixelRatio || 1,
			cacheBust: !0,
			...t
		});
	} catch (e) {
		return console.error("captureElement failed:", e), null;
	}
}
async function Ft(e = {}) {
	let t = document.documentElement;
	return Pt(t, {
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
async function It(e = {}) {
	let t = document.documentElement, n = t.style.overflow, r = t.style.width, i = t.style.height;
	try {
		return t.style.overflow = "visible", t.style.width = "auto", t.style.height = "auto", await jt(t, {
			pixelRatio: e.pixelRatio || window.devicePixelRatio || 1,
			cacheBust: !0,
			...e
		});
	} catch (e) {
		return console.error("captureFullPage failed:", e), null;
	} finally {
		t.style.overflow = n, t.style.width = r, t.style.height = i;
	}
}
async function Lt(e, t = {}) {
	if (!e || e.width < 1 || e.height < 1) return null;
	let n = document.documentElement, r = n.style.overflow, i = n.style.width, a = n.style.height;
	try {
		return n.style.overflow = "visible", n.style.width = "auto", n.style.height = "auto", Rt(await jt(n, {
			pixelRatio: t.pixelRatio || window.devicePixelRatio || 1,
			cacheBust: !0,
			...t
		}), e);
	} catch (e) {
		return console.error("captureBox failed:", e), null;
	} finally {
		n.style.overflow = r, n.style.width = i, n.style.height = a;
	}
}
function Rt(e, t) {
	return new Promise((n, r) => {
		let i = new Image();
		i.onload = () => {
			let e = document.createElement("canvas"), r = window.devicePixelRatio || 1;
			e.width = Math.round(t.width * r), e.height = Math.round(t.height * r), e.getContext("2d").drawImage(i, t.x * r, t.y * r, t.width * r, t.height * r, 0, 0, e.width, e.height), n(e.toDataURL("image/png"));
		}, i.onerror = r, i.src = e;
	});
}
async function zt(e) {
	return (await fetch(e)).blob();
}
async function Bt(e, t, n) {
	if (!n) return null;
	try {
		return await n(await zt(e), t);
	} catch (e) {
		return console.error("uploadScreenshot failed:", e), null;
	}
}
//#endregion
//#region src/inspector.js
function Vt(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
	if (e.id) return "#" + e.id;
	let t = e.tagName.toLowerCase();
	if (e.className) {
		let n = String(e.className).split(/\s+/).filter((e) => e && !e.startsWith("el-") && !/^__/.test(e)).slice(0, 2);
		if (n.length) return t + "." + n.join(".");
	}
	let n = [], r = e;
	for (; r && r !== document.body;) {
		let e = r.tagName.toLowerCase();
		if (r.id) {
			e += "#" + r.id, n.unshift(e);
			break;
		}
		let t = Array.from(r.parentNode?.children || []).filter((e) => e.tagName === r.tagName);
		if (t.length > 1) {
			let n = t.indexOf(r) + 1;
			e += `:nth-of-type(${n})`;
		}
		n.unshift(e), r = r.parentNode;
	}
	return n.join(" > ");
}
function Ht(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return "";
	if (e.id) return `//*[@id="${e.id}"]`;
	let t = [], n = e;
	for (; n && n !== document.body;) {
		let e = Array.from(n.parentNode?.children || []).filter((e) => e.tagName === n.tagName).indexOf(n) + 1;
		t.unshift(`${n.tagName.toLowerCase()}[${e}]`), n = n.parentNode;
	}
	return t.unshift(""), "/html/body/" + t.slice(1).join("/");
}
function Ut(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return {};
	let t = {}, n = e.getAttribute("role") || Wt(e);
	n && (t.role = n);
	let r = Gt(e);
	r && (t.accessibleName = r);
	let i = e.getAttribute("aria-labelledby");
	return i && (t.labeledBy = i), Object.keys(t).length ? t : void 0;
}
function Wt(e) {
	let t = e.tagName.toLowerCase(), n = e.getAttribute("type");
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
	}[t];
}
function Gt(e) {
	if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
	let t = e.getAttribute("aria-labelledby");
	if (t) {
		let e = t.split(/\s+/).map((e) => document.getElementById(e)?.textContent?.trim()).filter(Boolean);
		if (e.length) return e.join(" ");
	}
	let n = e.labels?.[0];
	if (n) return n.textContent.trim();
	if (e.tagName.toLowerCase() === "input" && e.placeholder) return e.placeholder.trim();
	let r = e.getAttribute("alt");
	if (r) return r.trim();
	let i = e.getAttribute("title");
	if (i) return i.trim();
	if (["button", "a"].includes(e.tagName.toLowerCase())) {
		let t = e.textContent?.trim();
		if (t) return t;
	}
	return "";
}
function Kt(e) {
	if (!(!e || e.nodeType !== Node.ELEMENT_NODE)) return e.getAttribute("data-testid") || void 0;
}
function qt(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return null;
	let t = e.getBoundingClientRect();
	return {
		tag: e.tagName.toLowerCase(),
		id: e.id || void 0,
		classes: e.className ? String(e.className).split(/\s+/).filter(Boolean) : void 0,
		selector: Vt(e),
		xpath: Ht(e),
		rect: {
			x: t.left + window.scrollX,
			y: t.top + window.scrollY,
			width: t.width,
			height: t.height
		},
		aria: Ut(e),
		testId: Kt(e)
	};
}
function Jt(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
	let t = [], n = e;
	for (; n && n !== document.body;) t.unshift(n), n = n.parentElement;
	return n === document.body && t.unshift(document.body), t.map(qt).filter(Boolean);
}
function Yt(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return [];
	let t = Xt(e);
	if (t.length) return t;
	let n = Qt(e);
	return n.length ? n : [];
}
function Xt(e) {
	let t = [], n = e;
	for (; n;) {
		let e = Zt(n);
		e && !t.find((t) => t.componentName === e.componentName && t.selector === e.selector) && t.unshift(e), n = n.parentElement;
	}
	return t;
}
function Zt(e) {
	let t = Object.keys(e || {}).find((e) => e.startsWith("__vue"));
	if (!t) return null;
	let n = e[t], r = n?.type?.name || n?.type?.__name || n?.parent?.type?.name;
	return r ? {
		componentName: r,
		selector: Vt(e),
		rect: qt(e)?.rect
	} : null;
}
function Qt(e) {
	let t = [], n = Object.keys(e || {}).find((e) => e.startsWith("__reactFiber$"));
	if (!n) return t;
	let r = e[n];
	for (; r;) {
		let e = $t(r);
		e && !t.find((t) => t.componentName === e) && t.unshift({
			componentName: e,
			selector: void 0,
			rect: void 0
		}), r = r.return;
	}
	return t;
}
function $t(e) {
	if (!e) return null;
	if (typeof e.type == "function") return e.type.displayName || e.type.name || null;
	if (typeof e.type == "string") return null;
	if (e.elementType) {
		if (typeof e.elementType == "function") return e.elementType.displayName || e.elementType.name || null;
		if (typeof e.elementType == "object" && e.elementType?.$$typeof) return e.elementType.name || null;
	}
	return null;
}
function en(e) {
	return {
		dom: Jt(e),
		framework: Yt(e)
	};
}
//#endregion
//#region src/style.css?inline
var tn = ".vpr-review-overlay,.vpr-review-overlay *{box-sizing:border-box}.vpr-review-overlay{z-index:9000;pointer-events:none;position:fixed;inset:0}.vpr-review-overlay .el-overlay{pointer-events:auto}.vpr-dialog-layer{z-index:10002!important}.vpr-drawer-layer{z-index:10003!important}.vpr-confirm-layer{z-index:10004!important}.vpr-popper{z-index:10005!important}.vpr-review-toolbar{z-index:10000;-webkit-user-select:none;user-select:none;pointer-events:auto;background:#fff;border-radius:8px;justify-content:space-between;align-items:center;gap:16px;min-width:auto;min-height:auto;padding:10px 16px;display:flex;position:fixed;top:16px;left:50%;transform:translate(-50%);box-shadow:0 4px 20px #00000026}.vpr-toolbar-resize-handle{cursor:se-resize;background:linear-gradient(135deg,#0000 50%,#c0c4cc 50%);border-bottom-right-radius:8px;width:12px;height:12px;position:absolute;bottom:0;right:0}.vpr-review-toolbar.vpr-is-dragging{cursor:grabbing}.vpr-toolbar-left{align-items:center;gap:16px;display:flex}.vpr-toolbar-title{color:#001529;cursor:grab;white-space:nowrap;font-weight:700}.vpr-toolbar-title:active{cursor:grabbing}.vpr-toolbar-right{align-items:center;gap:12px;display:flex}.vpr-highlight-box{z-index:9100;pointer-events:none;background:#409eff26;border:2px solid #409eff;position:absolute}.vpr-hover-box{background:#409eff1f;border-color:#409eff}.vpr-selected-box{background:#f56c6c1f;border-color:#f56c6c}.vpr-selected-box .vpr-highlight-label{background:#f56c6c}.vpr-tree-hover-box{background:#e6a23c26;border-color:#e6a23c}.vpr-highlight-label{color:#fff;white-space:nowrap;background:#409eff;border-radius:4px;align-items:center;gap:6px;padding:2px 8px;font-size:12px;display:flex;position:absolute;top:-22px;left:0}.vpr-remove-icon{cursor:pointer;font-style:normal;font-weight:700;line-height:1}.vpr-drag-rect{z-index:9100;pointer-events:auto;background:#67c23a26;border:2px dashed #67c23a;position:absolute}.vpr-drag-rect.vpr-preview-box{pointer-events:none;border-color:#67c23a}.vpr-drag-rect.vpr-selected-box{background:#f56c6c1f;border-color:#f56c6c}.vpr-drag-rect.vpr-is-resizing{pointer-events:none}.vpr-box-label{color:#fff;white-space:nowrap;background:#f56c6c;border-radius:4px;align-items:center;gap:6px;padding:2px 8px;font-size:12px;display:flex;position:absolute;top:-22px;left:0}.vpr-resize-handle{z-index:10001;cursor:pointer;background:#fff;border:1px solid #f56c6c;border-radius:50%;position:absolute}.vpr-resize-handle.vpr-handle-nw{cursor:nw-resize}.vpr-resize-handle.vpr-handle-n{cursor:n-resize}.vpr-resize-handle.vpr-handle-ne{cursor:ne-resize}.vpr-resize-handle.vpr-handle-w{cursor:w-resize}.vpr-resize-handle.vpr-handle-e{cursor:e-resize}.vpr-resize-handle.vpr-handle-sw{cursor:sw-resize}.vpr-resize-handle.vpr-handle-s{cursor:s-resize}.vpr-resize-handle.vpr-handle-se{cursor:se-resize}.vpr-review-dialog{flex-direction:column;max-height:90vh;display:flex;overflow:hidden}.vpr-review-dialog .el-dialog__header{cursor:grab;-webkit-user-select:none;user-select:none}.vpr-review-dialog .el-dialog__header:active{cursor:grabbing}.vpr-review-dialog .el-dialog__body{flex:1;overflow:auto}.vpr-modal-resize-handle{cursor:se-resize;background:linear-gradient(135deg,#0000 50%,#c0c4cc 50%);border-bottom-right-radius:8px;width:16px;height:16px;position:absolute;bottom:0;right:0}.vpr-form-row{margin-bottom:16px}.vpr-form-row>label{color:#606266;margin-bottom:6px;font-size:14px;display:block}.vpr-required{color:#f56c6c}.vpr-review-targets-summary{flex-wrap:wrap;gap:6px;display:flex}.vpr-target-tag{text-overflow:ellipsis;white-space:nowrap;max-width:200px;overflow:hidden}.vpr-text-muted{color:#909399;font-size:13px}.vpr-drawer-header{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;width:100%;display:flex}.vpr-drawer-title{color:#303133;font-weight:700}.vpr-drawer-actions{flex-wrap:wrap;gap:8px;display:flex}.vpr-tree-panel{flex-direction:column;gap:20px;display:flex}.vpr-tree-section h4{color:#303133;margin:0 0 10px;font-size:14px}.vpr-tree-list{flex-direction:column;gap:4px;display:flex}.vpr-tree-node{cursor:pointer;border-radius:4px;padding:6px 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;transition:background .15s}.vpr-tree-node:hover{background:#f5f7fa}.vpr-node-tag{color:#409eff;font-weight:700}.vpr-node-id{color:#67c23a;margin-left:6px}.vpr-node-aria{color:#e6a23c;margin-left:6px}.vpr-node-testid{color:#909399;margin-left:6px}.vpr-node-name{color:#606266;font-weight:700}.vpr-review-list{flex-direction:column;gap:12px;display:flex}.vpr-review-item-header{justify-content:space-between;align-items:center;gap:8px;display:flex}.vpr-review-item-title{color:#303133;word-break:break-all;font-weight:700}.vpr-review-item-tags{flex-shrink:0;gap:6px;display:flex}.vpr-review-item-target{color:#606266;word-break:break-all;margin:0 0 8px;font-size:12px}.vpr-review-item-suggestion{color:#303133;margin:0 0 12px;font-size:13px;line-height:1.6}.vpr-review-item-meta{justify-content:space-between;align-items:center;gap:8px;display:flex}.vpr-review-item-actions{flex-shrink:0;gap:8px;display:flex}";
//#endregion
//#region src/injectStyles.js
function nn() {
	if (typeof document > "u" || document.getElementById("vpr-styles")) return;
	let e = document.createElement("style");
	e.id = "vpr-styles", e.textContent = tn, document.head.appendChild(e);
}
//#endregion
//#region src/ReviewTool.vue
var rn = {
	key: 0,
	class: "vpr-review-overlay"
}, an = { class: "vpr-toolbar-left" }, on = { class: "vpr-toolbar-right" }, sn = { class: "vpr-highlight-label" }, cn = ["onClick"], ln = { class: "vpr-highlight-label" }, un = ["onClick"], dn = ["onMousedown"], fn = ["onClick"], pn = ["onMousedown"], mn = { class: "vpr-form-row" }, hn = { class: "vpr-review-targets-summary" }, gn = { class: "vpr-form-row" }, _n = { class: "vpr-text-muted" }, vn = { class: "vpr-form-row" }, yn = { class: "vpr-text-muted" }, bn = { class: "vpr-form-row" }, xn = { class: "vpr-form-row" }, Sn = { class: "vpr-form-row" }, Cn = { class: "vpr-form-row" }, wn = {
	key: 1,
	class: "vpr-tree-panel"
}, Tn = {
	key: 0,
	class: "vpr-tree-section"
}, En = { class: "vpr-tree-list" }, Dn = ["onMouseenter", "onClick"], On = { class: "vpr-node-name" }, kn = { class: "vpr-tree-section" }, An = { class: "vpr-tree-list" }, jn = ["onMouseenter", "onClick"], Mn = { class: "vpr-node-tag" }, Nn = {
	key: 0,
	class: "vpr-node-id"
}, Pn = {
	key: 1,
	class: "vpr-node-aria"
}, Fn = {
	key: 2,
	class: "vpr-node-testid"
}, In = { class: "vpr-drawer-header" }, Ln = { class: "vpr-drawer-actions" }, Rn = {
	key: 1,
	class: "vpr-review-list"
}, zn = { class: "vpr-review-item-header" }, Bn = { class: "vpr-review-item-title" }, Vn = { class: "vpr-review-item-tags" }, Hn = { class: "vpr-review-item-target" }, Un = { class: "vpr-review-item-suggestion" }, Wn = { class: "vpr-review-item-meta" }, Gn = { class: "vpr-text-muted" }, Kn = { class: "vpr-review-item-actions" }, qn = {
	__name: "ReviewTool",
	props: {
		active: {
			type: Boolean,
			default: !1
		},
		pagePath: {
			type: String,
			default: ""
		},
		pageName: {
			type: String,
			default: ""
		},
		storageKey: {
			type: String,
			default: "page-reviews"
		},
		imageUpload: {
			type: Function,
			default: null
		},
		imageUploadUrl: {
			type: String,
			default: ""
		},
		enableZipExport: {
			type: Boolean,
			default: !0
		},
		enableComponentTree: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"update:active",
		"add",
		"update",
		"delete",
		"clear",
		"export"
	],
	setup(B, { expose: V, emit: H }) {
		let U = B, W = H, G = n(() => U.pagePath || (typeof window < "u" ? window.location.pathname + window.location.search : "/")), { reviews: ee, getPageReviews: te, addReview: ne, updateReview: re, deleteReview: ie, clearPageReviews: oe, exportToJSON: se, exportToMarkdown: ce, exportToZIP: le } = ae({
			storageKey: U.storageKey,
			defaultPagePath: () => G.value
		}), ue = n(() => te(G.value)), de = p("element"), K = p(!1), pe = p(!1), me = p(!1), q = p(null), ve = p(null), J = p(null), Y = p([]), X = p({
			type: "element",
			title: "",
			severity: "medium",
			suggestion: "",
			targets: [],
			viewport: {
				width: 0,
				height: 0
			},
			scroll: {
				x: 0,
				y: 0
			},
			pagePath: "",
			pageUrl: "",
			pageName: "",
			aria: null,
			locators: null
		});
		d(() => {
			nn();
		});
		let ye = p(null), { position: be, size: xe, isDragging: Se, isResizing: Ce, onDragStart: Z, onResizeStart: we } = ge({
			initialPosition: {
				x: 0,
				y: 0
			},
			initialSize: {
				width: null,
				height: null
			},
			minWidth: 400,
			minHeight: 48,
			isDragHandle: (e) => e.classList?.contains("vpr-toolbar-title") || e.classList?.contains("vpr-review-toolbar"),
			measureRef: ye
		}), { position: Te, size: Ee, isDragging: De, isResizing: Q, onDragStart: Oe, onResizeStart: ke } = ge({
			initialPosition: {
				x: 0,
				y: 0
			},
			initialSize: {
				width: 560,
				height: null
			},
			minWidth: 360,
			minHeight: 300,
			isDragHandle: (e) => {
				let t = e.closest?.(".el-dialog__header"), n = e.closest?.(".el-dialog__headerbtn");
				return !!t && !n;
			}
		}), Ae = n(() => Se.value || Ce.value || De.value || Q.value), je = (e) => Ae.value ? !0 : !!e.closest(".vpr-review-overlay"), Me = n(() => U.active && !K.value), { hoveredRect: Ne, hoveredTag: Pe, selectedElements: $, selectElement: Fe, removeSelectedElement: Ie, clearSelectedElements: Le, refreshRects: Re } = fe({
			active: Me,
			mode: de,
			onIgnoreTarget: je
		}), { selectedBoxes: ze, dragRect: Be, resizingBoxId: Ve, isResizing: He, removeBox: Ue, clearBoxes: We, startResize: Ge } = he({
			active: Me,
			mode: de,
			onIgnoreTarget: je,
			onBoxCreate: (e, t) => {
				it(t) || Le();
			}
		}), { toViewportRect: Ke, highlightStyle: qe, boxStyle: Je, handleStyle: Ye } = _e({ active: n(() => U.active) }), Xe = [
			"nw",
			"n",
			"ne",
			"w",
			"e",
			"sw",
			"s",
			"se"
		], Ze = n(() => $.value.length + ze.value.length), Qe = n(() => X.value.title.trim() && X.value.suggestion.trim()), $e = n({
			get: () => !!q.value,
			set: (e) => {
				e || (q.value = null);
			}
		}), et = n(() => U.imageUpload ? U.imageUpload : U.imageUploadUrl ? tt : null);
		async function tt(e, t) {
			let n = new FormData();
			n.append("file", e, t);
			let r = await fetch(U.imageUploadUrl, {
				method: "POST",
				body: n
			});
			if (!r.ok) throw Error("Upload failed");
			let i = await r.text();
			try {
				let e = JSON.parse(i);
				return e.url || e.data?.url || i;
			} catch {
				return i;
			}
		}
		let nt = n(() => {
			let { x: e, y: t } = be.value, n = { transform: `translate(calc(-50% + ${e}px), ${t}px)` };
			return xe.value.width && (n.width = xe.value.width + "px"), xe.value.height && (n.height = xe.value.height + "px"), n;
		}), rt = n(() => {
			let { x: e, y: t } = Te.value, n = { transform: `translate(${e}px, ${t}px)` };
			return Ee.value.height && (n.height = Ee.value.height + "px"), n;
		});
		function it(e) {
			return e.ctrlKey || e.metaKey;
		}
		function at(e) {
			return {
				low: "info",
				medium: "warning",
				high: "danger",
				critical: "danger"
			}[e] || "info";
		}
		function ot(e) {
			return {
				low: "低",
				medium: "中",
				high: "高",
				critical: "严重"
			}[e] || e;
		}
		function st(e) {
			return e.targets?.some((e) => e.componentTree?.dom?.length);
		}
		function ct(e) {
			if (!e || e.length === 0) return "无目标";
			let t = e[0], n = t.type === "element" ? t.elementText || t.selector || "元素" : `框选 x=${t.viewportRect.x}, y=${t.viewportRect.y}`;
			return e.length === 1 ? n : `${n} 等 ${e.length} 个目标`;
		}
		function lt() {
			return {
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight
				},
				scroll: {
					x: window.scrollX,
					y: window.scrollY
				},
				pagePath: G.value,
				pageUrl: window.location.href,
				pageName: U.pageName || G.value
			};
		}
		function ut(e, t) {
			it(t) && (t.stopPropagation(), Ie(e));
		}
		function dt(e, t) {
			it(t) && (t.stopPropagation(), Ue(e));
		}
		function ft(e) {
			e.key === "Escape" && (K.value ? K.value = !1 : jt());
		}
		function pt() {
			$.value.length === 0 && (J.value = null), me.value = !0;
		}
		function mt(e) {
			if (!e.rect) {
				ve.value = null;
				return;
			}
			ve.value = e.rect;
		}
		function ht(e) {
			if (!e.selector) return;
			let t = document.querySelector(e.selector);
			t && (Fe(t), We(), me.value = !1);
		}
		function gt() {
			Le(), We(), J.value = null;
		}
		function _t() {
			let e = lt(), t = vt(), n = $.value[0], r = n?.el ? qt(n.el) : null;
			X.value = {
				type: $.value.length > 0 ? "element" : "viewport",
				title: "",
				severity: "medium",
				suggestion: "",
				targets: t,
				viewport: e.viewport,
				scroll: e.scroll,
				pagePath: e.pagePath,
				pageUrl: e.pageUrl,
				pageName: e.pageName,
				aria: r?.aria || null,
				locators: r ? yt(r) : null
			}, Y.value = [], K.value = !0;
		}
		function vt() {
			let e = [];
			return $.value.forEach((t) => {
				let n = t.el ? qt(t.el) : null;
				e.push({
					type: "element",
					selector: t.selector,
					elementText: t.text,
					elementRect: t.docRect || t.rect,
					componentTree: n ? en(t.el) : null,
					aria: n?.aria || null,
					locators: n ? yt(n) : null
				});
			}), ze.value.forEach((t) => {
				e.push({
					type: "viewport",
					viewportRect: t.rect
				});
			}), e;
		}
		function yt(e) {
			let t = {};
			return e.selector && (t.cssSelector = e.selector), e.xpath && (t.xpath = e.xpath), e.aria && Object.keys(e.aria).length && (t.aria = e.aria), e.testId && (t.testId = e.testId), Object.keys(t).length ? t : null;
		}
		async function bt() {
			let e = [], t = Y.value.length > 0 ? document.querySelector(".vpr-review-overlay") : null, n = t ? t.style.display : "";
			t && (t.style.display = "none", await new Promise((e) => {
				requestAnimationFrame(() => requestAnimationFrame(() => e()));
			}));
			try {
				for (let t of Y.value) if (t === Mt.TARGETS) for (let t of X.value.targets) {
					let n = null;
					if (t.type === "element" && t.elementRect) {
						let e = document.querySelector(t.selector);
						e && (n = await Pt(e));
					} else t.type === "viewport" && t.viewportRect && (n = await Lt(t.viewportRect));
					if (n) {
						let r = Nt(t.type), i = null;
						et.value && (i = await Bt(n, r, et.value)), e.push({
							type: t.type,
							filename: r,
							data: i ? void 0 : n,
							url: i || void 0
						});
					}
				}
				else if (t === Mt.VIEWPORT) {
					let t = await Ft();
					if (t) {
						let n = Nt(Mt.VIEWPORT), r = null;
						et.value && (r = await Bt(t, n, et.value)), e.push({
							type: Mt.VIEWPORT,
							filename: n,
							data: r ? void 0 : t,
							url: r || void 0
						});
					}
				} else if (t === Mt.FULL_PAGE) {
					let t = await It();
					if (t) {
						let n = Nt(Mt.FULL_PAGE), r = null;
						et.value && (r = await Bt(t, n, et.value)), e.push({
							type: Mt.FULL_PAGE,
							filename: n,
							data: r ? void 0 : t,
							url: r || void 0
						});
					}
				}
			} finally {
				t && (t.style.display = n);
			}
			return e;
		}
		function xt() {
			Y.value = [], X.value = {
				type: "element",
				title: "",
				severity: "medium",
				suggestion: "",
				targets: [],
				viewport: {
					width: 0,
					height: 0
				},
				scroll: {
					x: 0,
					y: 0
				},
				pagePath: "",
				pageUrl: "",
				pageName: "",
				aria: null,
				locators: null
			};
		}
		async function St() {
			if (!Qe.value) return;
			let e = await bt(), t = ne({
				type: X.value.type,
				title: X.value.title.trim(),
				severity: X.value.severity,
				suggestion: X.value.suggestion.trim(),
				targets: X.value.targets,
				viewport: X.value.viewport,
				scroll: X.value.scroll,
				pagePath: X.value.pagePath,
				pageUrl: X.value.pageUrl,
				pageName: X.value.pageName,
				status: "open",
				screenshots: e,
				aria: X.value.aria,
				locators: X.value.locators
			});
			K.value = !1, gt(), W("add", t);
		}
		function Ct(e) {
			re(e, { status: "resolved" }), W("update", {
				id: e,
				status: "resolved"
			});
		}
		function wt(e) {
			q.value = {
				title: "删除确认",
				message: "确定删除这条评审意见吗？",
				onConfirm: () => {
					ie(e), W("delete", { id: e });
				}
			};
		}
		function Tt() {
			ue.value.length !== 0 && (q.value = {
				title: "清空确认",
				message: "确定清空当前页面的所有评审意见吗？",
				onConfirm: () => {
					oe(G.value), W("clear", { pagePath: G.value });
				}
			});
		}
		function Et() {
			q.value?.onConfirm?.(), q.value = null;
		}
		function Dt() {
			ce(), W("export", { format: "markdown" });
		}
		function Ot() {
			se(), W("export", { format: "json" });
		}
		async function kt() {
			await le(), W("export", { format: "zip" });
		}
		function At(e) {
			switch (e) {
				case "tree":
					pt();
					break;
				case "list":
					pe.value = !0;
					break;
				case "export-md":
					Dt();
					break;
				case "export-json":
					Ot();
					break;
				case "export-zip":
					kt();
					break;
				case "clear":
					gt();
					break;
			}
		}
		function jt() {
			W("update:active", !1);
		}
		return v((e) => {
			U.active && (document.addEventListener("keydown", ft), e(() => document.removeEventListener("keydown", ft)));
		}), _(() => U.active, (e) => {
			e ? de.value = "element" : (gt(), xt(), K.value = !1, Ne.value = null, pe.value = !1, me.value = !1, q.value = null);
		}), _(() => $.value.map((e) => e.selector).join("|"), () => {
			J.value = $.value.length > 0 ? en($.value[0].el) : null;
		}), v((e) => {
			if (!U.active) return;
			let t = () => Re();
			window.addEventListener("scroll", t, !0), e(() => window.removeEventListener("scroll", t, !0));
		}), V({
			reviews: ee,
			pageReviews: ue,
			addReview: ne,
			updateReview: re,
			deleteReview: ie,
			clearPageReviews: oe,
			exportToJSON: se,
			exportToMarkdown: ce
		}), (n, d) => (f(), r(t, { to: "body" }, [B.active ? (f(), a("div", rn, [
			o("div", {
				ref_key: "toolbarRef",
				ref: ye,
				class: l(["vpr-review-toolbar", { "vpr-is-dragging": g(Se) }]),
				style: u(nt.value),
				onClick: d[2] ||= b(() => {}, ["stop"]),
				onMousedown: d[3] ||= (...e) => g(Z) && g(Z)(...e)
			}, [
				o("div", an, [d[21] ||= o("span", {
					class: "vpr-toolbar-title",
					title: "按住此处可拖动"
				}, "页面评审模式", -1), c(g(I), {
					modelValue: de.value,
					"onUpdate:modelValue": d[0] ||= (e) => de.value = e,
					size: "small"
				}, {
					default: y(() => [c(g(F), { value: "element" }, {
						default: y(() => [...d[19] ||= [s("选择元素", -1)]]),
						_: 1
					}), c(g(F), { value: "viewport" }, {
						default: y(() => [...d[20] ||= [s("框定视图", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["modelValue"])]),
				o("div", on, [
					c(g(x), { value: Ze.value }, {
						default: y(() => [c(g(S), {
							type: "primary",
							size: "small",
							disabled: Ze.value === 0,
							onClick: _t
						}, {
							default: y(() => [...d[22] ||= [s(" 评审 ", -1)]]),
							_: 1
						}, 8, ["disabled"])]),
						_: 1
					}, 8, ["value"]),
					c(g(S), {
						type: "danger",
						size: "small",
						onClick: jt
					}, {
						default: y(() => [...d[23] ||= [s("退出评审", -1)]]),
						_: 1
					}),
					c(g(O), {
						trigger: "click",
						placement: "bottom-end",
						"popper-class": "vpr-popper",
						teleported: !1,
						onCommand: At
					}, {
						dropdown: y(() => [c(g(A), null, {
							default: y(() => [
								B.enableComponentTree ? (f(), r(g(k), {
									key: 0,
									command: "tree"
								}, {
									default: y(() => [...d[25] ||= [s("组件树", -1)]]),
									_: 1
								})) : i("", !0),
								c(g(k), { command: "list" }, {
									default: y(() => [...d[26] ||= [s("评审列表", -1)]]),
									_: 1
								}),
								c(g(k), {
									divided: "",
									command: "export-md"
								}, {
									default: y(() => [...d[27] ||= [s("导出 Markdown", -1)]]),
									_: 1
								}),
								c(g(k), { command: "export-json" }, {
									default: y(() => [...d[28] ||= [s("导出 JSON", -1)]]),
									_: 1
								}),
								B.enableZipExport ? (f(), r(g(k), {
									key: 1,
									command: "export-zip"
								}, {
									default: y(() => [...d[29] ||= [s("导出 ZIP", -1)]]),
									_: 1
								})) : i("", !0),
								c(g(k), {
									divided: "",
									command: "clear",
									disabled: Ze.value === 0
								}, {
									default: y(() => [...d[30] ||= [s("取消选择", -1)]]),
									_: 1
								}, 8, ["disabled"])
							]),
							_: 1
						})]),
						default: y(() => [c(g(S), { size: "small" }, {
							default: y(() => [d[24] ||= s(" 更多 ", -1), c(g(M), { class: "el-icon--right" }, {
								default: y(() => [c(g(z))]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					})
				]),
				o("div", {
					class: "vpr-toolbar-resize-handle",
					onMousedown: d[1] ||= b((...e) => g(we) && g(we)(...e), ["stop"])
				}, null, 32)
			], 38),
			g(Ne) && de.value === "element" && !g(He) && !g(Be) ? (f(), a("div", {
				key: 0,
				class: "vpr-highlight-box vpr-hover-box",
				style: u(g(qe)(g(Ne)))
			}, [o("span", sn, h(g(Pe)), 1)], 4)) : i("", !0),
			(f(!0), a(e, null, m(g($), (e, t) => (f(), a("div", {
				key: "el-" + t,
				class: "vpr-highlight-box vpr-selected-box",
				style: u(g(qe)(e.rect)),
				onClick: b((t) => ut(e, t), ["stop"])
			}, [o("span", ln, [s(h(e.tag) + " ", 1), o("i", {
				class: "vpr-remove-icon",
				onClick: b((t) => g(Ie)(e), ["stop"])
			}, "×", 8, un)])], 12, cn))), 128)),
			ve.value ? (f(), a("div", {
				key: 1,
				class: "vpr-highlight-box vpr-tree-hover-box",
				style: u(g(qe)(g(Ke)(ve.value)))
			}, null, 4)) : i("", !0),
			(f(!0), a(e, null, m(g(ze), (t) => (f(), a("div", {
				key: t.id,
				class: l(["vpr-drag-rect vpr-selected-box", { "vpr-is-resizing": g(Ve) === t.id }]),
				style: u(g(Je)(g(Ke)(t.rect))),
				onMousedown: b((e) => dt(t, e), ["stop"])
			}, [o("span", {
				class: "vpr-box-label",
				onMousedown: d[4] ||= b(() => {}, ["stop"])
			}, [s(" 框选 " + h(t.index + 1) + " ", 1), o("i", {
				class: "vpr-remove-icon",
				onClick: b((e) => g(Ue)(t), ["stop"])
			}, "×", 8, fn)], 32), (f(), a(e, null, m(Xe, (e) => o("div", {
				key: e,
				class: l(["vpr-resize-handle", "vpr-handle-" + e]),
				style: u(g(Ye)(e, g(Ke)(t.rect))),
				onMousedown: b((n) => g(Ge)(t, e, n), ["stop"])
			}, null, 46, pn)), 64))], 46, dn))), 128)),
			g(Be) ? (f(), a("div", {
				key: 2,
				class: "vpr-drag-rect vpr-preview-box",
				style: u(g(Je)(g(Be)))
			}, null, 4)) : i("", !0),
			o("div", {
				class: "vpr-modal-layer",
				onMousedown: d[12] ||= (...e) => g(Oe) && g(Oe)(...e)
			}, [c(g(E), {
				modelValue: K.value,
				"onUpdate:modelValue": d[11] ||= (e) => K.value = e,
				class: "vpr-review-dialog",
				"modal-class": "vpr-dialog-layer",
				title: "添加评审意见",
				width: g(Ee).width,
				style: u(rt.value),
				"z-index": 10002,
				"append-to-body": !1,
				"close-on-press-escape": !1,
				"align-center": ""
			}, {
				footer: y(() => [c(g(S), { onClick: d[10] ||= (e) => K.value = !1 }, {
					default: y(() => [...d[41] ||= [s("取消", -1)]]),
					_: 1
				}), c(g(S), {
					type: "primary",
					disabled: !Qe.value,
					onClick: St
				}, {
					default: y(() => [...d[42] ||= [s("保存评审", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: y(() => [
					o("div", mn, [d[31] ||= o("label", null, "评审目标", -1), o("div", hn, [(f(!0), a(e, null, m(X.value.targets, (e, t) => (f(), r(g(R), {
						key: t,
						class: "vpr-target-tag",
						title: e.type === "element" ? e.selector || "元素" : `框选 ${e.viewportRect?.x},${e.viewportRect?.y}`
					}, {
						default: y(() => [s(h(e.type === "element" ? e.elementText || e.selector || "元素" : `框选 ${e.viewportRect?.x},${e.viewportRect?.y}`), 1)]),
						_: 2
					}, 1032, ["title"]))), 128))])]),
					o("div", gn, [d[32] ||= o("label", null, "窗口尺寸", -1), o("span", _n, h(X.value.viewport?.width) + " × " + h(X.value.viewport?.height), 1)]),
					o("div", vn, [d[33] ||= o("label", null, "滚动位置", -1), o("span", yn, "x=" + h(X.value.scroll?.x) + ", y=" + h(X.value.scroll?.y), 1)]),
					o("div", bn, [d[37] ||= o("label", null, "截图", -1), c(g(T), {
						modelValue: Y.value,
						"onUpdate:modelValue": d[5] ||= (e) => Y.value = e
					}, {
						default: y(() => [
							c(g(w), { value: g(Mt).TARGETS }, {
								default: y(() => [...d[34] ||= [s("选中目标", -1)]]),
								_: 1
							}, 8, ["value"]),
							c(g(w), { value: g(Mt).VIEWPORT }, {
								default: y(() => [...d[35] ||= [s("当前视口", -1)]]),
								_: 1
							}, 8, ["value"]),
							c(g(w), { value: g(Mt).FULL_PAGE }, {
								default: y(() => [...d[36] ||= [s("完整页面", -1)]]),
								_: 1
							}, 8, ["value"])
						]),
						_: 1
					}, 8, ["modelValue"])]),
					o("div", xn, [d[38] ||= o("label", null, [s("标题 "), o("span", { class: "vpr-required" }, "*")], -1), c(g(N), {
						modelValue: X.value.title,
						"onUpdate:modelValue": d[6] ||= (e) => X.value.title = e,
						placeholder: "例如：按钮样式不统一"
					}, null, 8, ["modelValue"])]),
					o("div", Sn, [d[39] ||= o("label", null, [s("严重等级 "), o("span", { class: "vpr-required" }, "*")], -1), c(g(L), {
						modelValue: X.value.severity,
						"onUpdate:modelValue": d[7] ||= (e) => X.value.severity = e,
						style: { width: "160px" },
						"popper-class": "vpr-popper"
					}, {
						default: y(() => [
							c(g(P), {
								value: "low",
								label: "低"
							}),
							c(g(P), {
								value: "medium",
								label: "中"
							}),
							c(g(P), {
								value: "high",
								label: "高"
							}),
							c(g(P), {
								value: "critical",
								label: "严重"
							})
						]),
						_: 1
					}, 8, ["modelValue"])]),
					o("div", Cn, [d[40] ||= o("label", null, [s("评审建议 "), o("span", { class: "vpr-required" }, "*")], -1), c(g(N), {
						modelValue: X.value.suggestion,
						"onUpdate:modelValue": d[8] ||= (e) => X.value.suggestion = e,
						type: "textarea",
						rows: 4,
						placeholder: "描述问题现象、影响和改进建议"
					}, null, 8, ["modelValue"])]),
					o("div", {
						class: "vpr-modal-resize-handle",
						onMousedown: d[9] ||= b((...e) => g(ke) && g(ke)(...e), ["stop"])
					}, null, 32)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"width",
				"style"
			])], 32),
			c(g(D), {
				modelValue: me.value,
				"onUpdate:modelValue": d[15] ||= (e) => me.value = e,
				title: "组件树检查器",
				direction: "rtl",
				size: "480px",
				resizable: "",
				"modal-class": "vpr-drawer-layer",
				"z-index": 10003,
				"append-to-body": !1
			}, {
				default: y(() => [J.value ? (f(), a("div", wn, [J.value.framework && J.value.framework.length ? (f(), a("div", Tn, [d[43] ||= o("h4", null, "框架组件树", -1), o("div", En, [(f(!0), a(e, null, m(J.value.framework, (e, t) => (f(), a("div", {
					key: "fw-" + t,
					class: "vpr-tree-node",
					onMouseenter: (t) => mt(e),
					onMouseleave: d[13] ||= (e) => ve.value = null,
					onClick: (t) => ht(e)
				}, [o("span", On, h(e.componentName), 1)], 40, Dn))), 128))])])) : i("", !0), o("div", kn, [d[44] ||= o("h4", null, "DOM 树", -1), o("div", An, [(f(!0), a(e, null, m(J.value.dom, (e, t) => (f(), a("div", {
					key: "dom-" + t,
					class: "vpr-tree-node",
					style: u({ paddingLeft: t * 12 + "px" }),
					onMouseenter: (t) => mt(e),
					onMouseleave: d[14] ||= (e) => ve.value = null,
					onClick: (t) => ht(e)
				}, [
					o("span", Mn, h(e.tag), 1),
					e.id ? (f(), a("span", Nn, "#" + h(e.id), 1)) : i("", !0),
					e.aria?.role ? (f(), a("span", Pn, "role=" + h(e.aria.role), 1)) : i("", !0),
					e.testId ? (f(), a("span", Fn, "testid=" + h(e.testId), 1)) : i("", !0)
				], 44, jn))), 128))])])])) : (f(), r(g(j), {
					key: 0,
					description: "先选择一个元素以查看组件树"
				}))]),
				_: 1
			}, 8, ["modelValue"]),
			c(g(D), {
				modelValue: pe.value,
				"onUpdate:modelValue": d[16] ||= (e) => pe.value = e,
				direction: "rtl",
				size: "560px",
				resizable: "",
				"modal-class": "vpr-drawer-layer",
				"z-index": 10003,
				"append-to-body": !1
			}, {
				header: y(() => [o("div", In, [d[50] ||= o("span", { class: "vpr-drawer-title" }, "当前页面评审意见", -1), o("div", Ln, [c(g(O), {
					trigger: "click",
					placement: "bottom-end",
					"popper-class": "vpr-popper",
					teleported: !1
				}, {
					dropdown: y(() => [c(g(A), null, {
						default: y(() => [
							c(g(k), { onClick: Dt }, {
								default: y(() => [...d[46] ||= [s("导出 Markdown", -1)]]),
								_: 1
							}),
							c(g(k), { onClick: Ot }, {
								default: y(() => [...d[47] ||= [s("导出 JSON", -1)]]),
								_: 1
							}),
							B.enableZipExport ? (f(), r(g(k), {
								key: 0,
								onClick: kt
							}, {
								default: y(() => [...d[48] ||= [s("导出 ZIP", -1)]]),
								_: 1
							})) : i("", !0),
							c(g(k), {
								divided: "",
								style: { color: "var(--el-color-danger)" },
								onClick: Tt
							}, {
								default: y(() => [...d[49] ||= [s("清空本页", -1)]]),
								_: 1
							})
						]),
						_: 1
					})]),
					default: y(() => [c(g(S), { size: "small" }, {
						default: y(() => [d[45] ||= s(" 操作 ", -1), c(g(M), { class: "el-icon--right" }, {
							default: y(() => [c(g(z))]),
							_: 1
						})]),
						_: 1
					})]),
					_: 1
				})])])]),
				default: y(() => [ue.value.length === 0 ? (f(), r(g(j), {
					key: 0,
					description: "暂无评审意见"
				})) : (f(), a("div", Rn, [(f(!0), a(e, null, m(ue.value, (e) => (f(), r(g(C), {
					key: e.id,
					shadow: "never"
				}, {
					header: y(() => [o("div", zn, [o("span", Bn, h(e.title), 1), o("div", Vn, [
						c(g(R), {
							type: at(e.severity),
							size: "small"
						}, {
							default: y(() => [s(h(ot(e.severity)), 1)]),
							_: 2
						}, 1032, ["type"]),
						c(g(R), {
							type: "info",
							size: "small"
						}, {
							default: y(() => [s(h(e.targets?.length || 1) + " 个目标", 1)]),
							_: 2
						}, 1024),
						st(e) ? (f(), r(g(R), {
							key: 0,
							type: "success",
							size: "small"
						}, {
							default: y(() => [...d[51] ||= [s("树", -1)]]),
							_: 1
						})) : i("", !0)
					])])]),
					default: y(() => [
						o("p", Hn, h(ct(e.targets)), 1),
						o("p", Un, h(e.suggestion), 1),
						o("div", Wn, [o("span", Gn, h(new Date(e.createdAt).toLocaleString()), 1), o("div", Kn, [e.status === "resolved" ? i("", !0) : (f(), r(g(S), {
							key: 0,
							link: "",
							type: "primary",
							size: "small",
							onClick: (t) => Ct(e.id)
						}, {
							default: y(() => [...d[52] ||= [s("标记解决", -1)]]),
							_: 1
						}, 8, ["onClick"])), c(g(S), {
							link: "",
							type: "danger",
							size: "small",
							onClick: (t) => wt(e.id)
						}, {
							default: y(() => [...d[53] ||= [s("删除", -1)]]),
							_: 1
						}, 8, ["onClick"])])])
					]),
					_: 2
				}, 1024))), 128))]))]),
				_: 1
			}, 8, ["modelValue"]),
			c(g(E), {
				modelValue: $e.value,
				"onUpdate:modelValue": d[18] ||= (e) => $e.value = e,
				"modal-class": "vpr-confirm-layer",
				title: q.value?.title,
				width: "360px",
				"z-index": 10004,
				"append-to-body": !1,
				"close-on-press-escape": !1,
				"align-center": ""
			}, {
				footer: y(() => [c(g(S), { onClick: d[17] ||= (e) => q.value = null }, {
					default: y(() => [...d[54] ||= [s("取消", -1)]]),
					_: 1
				}), c(g(S), {
					type: "primary",
					onClick: Et
				}, {
					default: y(() => [...d[55] ||= [s("确定", -1)]]),
					_: 1
				})]),
				default: y(() => [o("p", null, h(q.value?.message), 1)]),
				_: 1
			}, 8, ["modelValue", "title"])
		])) : i("", !0)]));
	}
}, Jn = qn;
//#endregion
export { qn as ReviewTool, Jn as default, ge as useDragResize, fe as useElementSelection, _e as useHighlightOverlay, ae as usePageReview, he as useViewportBoxing };
