"use strict";

/******/(function () {
  // webpackBootstrap
  /******/
  var __webpack_modules__ = {
    /***/831: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "NIL", {
        enumerable: true,
        get: function get() {
          return _nil["default"];
        }
      });
      Object.defineProperty(exports, "parse", {
        enumerable: true,
        get: function get() {
          return _parse["default"];
        }
      });
      Object.defineProperty(exports, "stringify", {
        enumerable: true,
        get: function get() {
          return _stringify["default"];
        }
      });
      Object.defineProperty(exports, "v1", {
        enumerable: true,
        get: function get() {
          return _v["default"];
        }
      });
      Object.defineProperty(exports, "v3", {
        enumerable: true,
        get: function get() {
          return _v2["default"];
        }
      });
      Object.defineProperty(exports, "v4", {
        enumerable: true,
        get: function get() {
          return _v3["default"];
        }
      });
      Object.defineProperty(exports, "v5", {
        enumerable: true,
        get: function get() {
          return _v4["default"];
        }
      });
      Object.defineProperty(exports, "validate", {
        enumerable: true,
        get: function get() {
          return _validate["default"];
        }
      });
      Object.defineProperty(exports, "version", {
        enumerable: true,
        get: function get() {
          return _version["default"];
        }
      });
      var _v = _interopRequireDefault(__webpack_require__(518));
      var _v2 = _interopRequireDefault(__webpack_require__(948));
      var _v3 = _interopRequireDefault(__webpack_require__(73));
      var _v4 = _interopRequireDefault(__webpack_require__(186));
      var _nil = _interopRequireDefault(__webpack_require__(808));
      var _version = _interopRequireDefault(__webpack_require__(775));
      var _validate = _interopRequireDefault(__webpack_require__(37));
      var _stringify = _interopRequireDefault(__webpack_require__(910));
      var _parse = _interopRequireDefault(__webpack_require__(792));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }

      /***/
    }),
    /***/311: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;

      /*
       * Browser-compatible JavaScript MD5
       *
       * Modification of JavaScript MD5
       * https://github.com/blueimp/JavaScript-MD5
       *
       * Copyright 2011, Sebastian Tschan
       * https://blueimp.net
       *
       * Licensed under the MIT license:
       * https://opensource.org/licenses/MIT
       *
       * Based on
       * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
       * Digest Algorithm, as defined in RFC 1321.
       * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for more info.
       */
      function md5(bytes) {
        if (typeof bytes === 'string') {
          var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

          bytes = new Uint8Array(msg.length);
          for (var i = 0; i < msg.length; ++i) {
            bytes[i] = msg.charCodeAt(i);
          }
        }
        return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
      }
      /*
       * Convert an array of little-endian words to an array of bytes
       */

      function md5ToHexEncodedArray(input) {
        var output = [];
        var length32 = input.length * 32;
        var hexTab = '0123456789abcdef';
        for (var i = 0; i < length32; i += 8) {
          var x = input[i >> 5] >>> i % 32 & 0xff;
          var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
          output.push(hex);
        }
        return output;
      }
      /**
       * Calculate output length with padding and bit length
       */

      function getOutputLength(inputLength8) {
        return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
      }
      /*
       * Calculate the MD5 of an array of little-endian words, and a bit length.
       */

      function wordsToMd5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[getOutputLength(len) - 1] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
          var olda = a;
          var oldb = b;
          var oldc = c;
          var oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }
        return [a, b, c, d];
      }
      /*
       * Convert an array bytes to an array of little-endian words
       * Characters >255 have their high-byte silently ignored.
       */

      function bytesToWords(input) {
        if (input.length === 0) {
          return [];
        }
        var length8 = input.length * 8;
        var output = new Uint32Array(getOutputLength(length8));
        for (var i = 0; i < length8; i += 8) {
          output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
        }
        return output;
      }
      /*
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       * to work around bugs in some JS interpreters.
       */

      function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xffff;
      }
      /*
       * Bitwise rotate a 32-bit number to the left.
       */

      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      /*
       * These functions implement the four basic operations the algorithm uses.
       */

      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }
      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }
      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }
      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      var _default = md5;
      exports["default"] = _default;

      /***/
    }),
    /***/140: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      var _default = {
        randomUUID: randomUUID
      };
      exports["default"] = _default;

      /***/
    }),
    /***/808: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _default = '00000000-0000-0000-0000-000000000000';
      exports["default"] = _default;

      /***/
    }),
    /***/792: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _validate = _interopRequireDefault(__webpack_require__(37));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      function parse(uuid) {
        if (!(0, _validate["default"])(uuid)) {
          throw TypeError('Invalid UUID');
        }
        var v;
        var arr = new Uint8Array(16); // Parse ########-....-....-....-............

        arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
        arr[1] = v >>> 16 & 0xff;
        arr[2] = v >>> 8 & 0xff;
        arr[3] = v & 0xff; // Parse ........-####-....-....-............

        arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
        arr[5] = v & 0xff; // Parse ........-....-####-....-............

        arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
        arr[7] = v & 0xff; // Parse ........-....-....-####-............

        arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
        arr[9] = v & 0xff; // Parse ........-....-....-....-############
        // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

        arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
        arr[11] = v / 0x100000000 & 0xff;
        arr[12] = v >>> 24 & 0xff;
        arr[13] = v >>> 16 & 0xff;
        arr[14] = v >>> 8 & 0xff;
        arr[15] = v & 0xff;
        return arr;
      }
      var _default = parse;
      exports["default"] = _default;

      /***/
    }),
    /***/656: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      exports["default"] = _default;

      /***/
    }),
    /***/858: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = rng;
      // Unique ID creation requires a high quality random # generator. In the browser we therefore
      // require the crypto API and do not support built-in fallback to lower quality random number
      // generators (like Math.random()).
      var getRandomValues;
      var rnds8 = new Uint8Array(16);
      function rng() {
        // lazy load so that environments that need to polyfill have a chance to do so
        if (!getRandomValues) {
          // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
          getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
          if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
          }
        }
        return getRandomValues(rnds8);
      }

      /***/
    }),
    /***/42: ( /***/function _(__unused_webpack_module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;

      // Adapted from Chris Veness' SHA1 code at
      // http://www.movable-type.co.uk/scripts/sha1.html
      function f(s, x, y, z) {
        switch (s) {
          case 0:
            return x & y ^ ~x & z;
          case 1:
            return x ^ y ^ z;
          case 2:
            return x & y ^ x & z ^ y & z;
          case 3:
            return x ^ y ^ z;
        }
      }
      function ROTL(x, n) {
        return x << n | x >>> 32 - n;
      }
      function sha1(bytes) {
        var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
        var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
        if (typeof bytes === 'string') {
          var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

          bytes = [];
          for (var i = 0; i < msg.length; ++i) {
            bytes.push(msg.charCodeAt(i));
          }
        } else if (!Array.isArray(bytes)) {
          // Convert Array-like to Array
          bytes = Array.prototype.slice.call(bytes);
        }
        bytes.push(0x80);
        var l = bytes.length / 4 + 2;
        var N = Math.ceil(l / 16);
        var M = new Array(N);
        for (var _i = 0; _i < N; ++_i) {
          var arr = new Uint32Array(16);
          for (var j = 0; j < 16; ++j) {
            arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
          }
          M[_i] = arr;
        }
        M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
        M[N - 1][14] = Math.floor(M[N - 1][14]);
        M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
        for (var _i2 = 0; _i2 < N; ++_i2) {
          var W = new Uint32Array(80);
          for (var t = 0; t < 16; ++t) {
            W[t] = M[_i2][t];
          }
          for (var _t = 16; _t < 80; ++_t) {
            W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
          }
          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3];
          var e = H[4];
          for (var _t2 = 0; _t2 < 80; ++_t2) {
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
          }
          H[0] = H[0] + a >>> 0;
          H[1] = H[1] + b >>> 0;
          H[2] = H[2] + c >>> 0;
          H[3] = H[3] + d >>> 0;
          H[4] = H[4] + e >>> 0;
        }
        return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
      }
      var _default = sha1;
      exports["default"] = _default;

      /***/
    }),
    /***/910: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      exports.unsafeStringify = unsafeStringify;
      var _validate = _interopRequireDefault(__webpack_require__(37));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }

      /**
       * Convert array of 16 byte values to UUID string format of the form:
       * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
       */
      var byteToHex = [];
      for (var i = 0; i < 256; ++i) {
        byteToHex.push((i + 0x100).toString(16).slice(1));
      }
      function unsafeStringify(arr) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // Note: Be careful editing this code!  It's been tuned for performance
        // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
        return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
      }
      function stringify(arr) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
        // of the following:
        // - One or more input array values don't map to a hex octet (leading to
        // "undefined" in the uuid)
        // - Invalid input values for the RFC `version` or `variant` fields

        if (!(0, _validate["default"])(uuid)) {
          throw TypeError('Stringified UUID is invalid');
        }
        return uuid;
      }
      var _default = stringify;
      exports["default"] = _default;

      /***/
    }),
    /***/518: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _rng = _interopRequireDefault(__webpack_require__(858));
      var _stringify = __webpack_require__(910);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }

      // **`v1()` - Generate time-based UUID**
      //
      // Inspired by https://github.com/LiosK/UUID.js
      // and http://docs.python.org/library/uuid.html
      var _nodeId;
      var _clockseq; // Previous uuid creation time

      var _lastMSecs = 0;
      var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

      function v1(options, buf, offset) {
        var i = buf && offset || 0;
        var b = buf || new Array(16);
        options = options || {};
        var node = options.node || _nodeId;
        var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
        // specified.  We do this lazily to minimize issues related to insufficient
        // system entropy.  See #189

        if (node == null || clockseq == null) {
          var seedBytes = options.random || (options.rng || _rng["default"])();
          if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
          }
          if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
          }
        } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
        // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
        // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
        // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

        var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
        // cycle to simulate higher resolution clock

        var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

        var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

        if (dt < 0 && options.clockseq === undefined) {
          clockseq = clockseq + 1 & 0x3fff;
        } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
        // time interval

        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
          nsecs = 0;
        } // Per 4.2.1.2 Throw error if too many uuids are requested

        if (nsecs >= 10000) {
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        }
        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

        msecs += 12219292800000; // `time_low`

        var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
        b[i++] = tl >>> 24 & 0xff;
        b[i++] = tl >>> 16 & 0xff;
        b[i++] = tl >>> 8 & 0xff;
        b[i++] = tl & 0xff; // `time_mid`

        var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
        b[i++] = tmh >>> 8 & 0xff;
        b[i++] = tmh & 0xff; // `time_high_and_version`

        b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

        b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

        b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

        b[i++] = clockseq & 0xff; // `node`

        for (var n = 0; n < 6; ++n) {
          b[i + n] = node[n];
        }
        return buf || (0, _stringify.unsafeStringify)(b);
      }
      var _default = v1;
      exports["default"] = _default;

      /***/
    }),
    /***/948: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _v = _interopRequireDefault(__webpack_require__(25));
      var _md = _interopRequireDefault(__webpack_require__(311));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      var v3 = (0, _v["default"])('v3', 0x30, _md["default"]);
      var _default = v3;
      exports["default"] = _default;

      /***/
    }),
    /***/25: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.URL = exports.DNS = void 0;
      exports["default"] = v35;
      var _stringify = __webpack_require__(910);
      var _parse = _interopRequireDefault(__webpack_require__(792));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      function stringToBytes(str) {
        str = unescape(encodeURIComponent(str)); // UTF8 escape

        var bytes = [];
        for (var i = 0; i < str.length; ++i) {
          bytes.push(str.charCodeAt(i));
        }
        return bytes;
      }
      var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
      exports.DNS = DNS;
      var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
      exports.URL = URL;
      function v35(name, version, hashfunc) {
        function generateUUID(value, namespace, buf, offset) {
          var _namespace;
          if (typeof value === 'string') {
            value = stringToBytes(value);
          }
          if (typeof namespace === 'string') {
            namespace = (0, _parse["default"])(namespace);
          }
          if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
          } // Compute hash of namespace and value, Per 4.3
          // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
          // hashfunc([...namespace, ... value])`

          var bytes = new Uint8Array(16 + value.length);
          bytes.set(namespace);
          bytes.set(value, namespace.length);
          bytes = hashfunc(bytes);
          bytes[6] = bytes[6] & 0x0f | version;
          bytes[8] = bytes[8] & 0x3f | 0x80;
          if (buf) {
            offset = offset || 0;
            for (var i = 0; i < 16; ++i) {
              buf[offset + i] = bytes[i];
            }
            return buf;
          }
          return (0, _stringify.unsafeStringify)(bytes);
        } // Function#name is not settable on some platforms (#270)

        try {
          generateUUID.name = name; // eslint-disable-next-line no-empty
        } catch (err) {} // For CommonJS default export support

        generateUUID.DNS = DNS;
        generateUUID.URL = URL;
        return generateUUID;
      }

      /***/
    }),
    /***/73: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _native = _interopRequireDefault(__webpack_require__(140));
      var _rng = _interopRequireDefault(__webpack_require__(858));
      var _stringify = __webpack_require__(910);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      function v4(options, buf, offset) {
        if (_native["default"].randomUUID && !buf && !options) {
          return _native["default"].randomUUID();
        }
        options = options || {};
        var rnds = options.random || (options.rng || _rng["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

        rnds[6] = rnds[6] & 0x0f | 0x40;
        rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

        if (buf) {
          offset = offset || 0;
          for (var i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(rnds);
      }
      var _default = v4;
      exports["default"] = _default;

      /***/
    }),
    /***/186: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _v = _interopRequireDefault(__webpack_require__(25));
      var _sha = _interopRequireDefault(__webpack_require__(42));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      var v5 = (0, _v["default"])('v5', 0x50, _sha["default"]);
      var _default = v5;
      exports["default"] = _default;

      /***/
    }),
    /***/37: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _regex = _interopRequireDefault(__webpack_require__(656));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      function validate(uuid) {
        return typeof uuid === 'string' && _regex["default"].test(uuid);
      }
      var _default = validate;
      exports["default"] = _default;

      /***/
    }),
    /***/775: ( /***/function _(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _validate = _interopRequireDefault(__webpack_require__(37));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      function version(uuid) {
        if (!(0, _validate["default"])(uuid)) {
          throw TypeError('Invalid UUID');
        }
        return parseInt(uuid.slice(14, 15), 16);
      }
      var _default = version;
      exports["default"] = _default;

      /***/
    }),
    /***/79: ( /***/function _(module) {
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/987: ( /***/function _(module) {
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/994: ( /***/function _(module) {
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
          "default": e
        };
      }
      module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/156: ( /***/function _(module) {
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e,
            n,
            i,
            u,
            a = [],
            f = !0,
            o = !1;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = !1;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
          } catch (r) {
            o = !0, n = r;
          } finally {
            try {
              if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/752: ( /***/function _(module) {
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/715: ( /***/function _(module, __unused_webpack_exports, __webpack_require__) {
      var arrayWithHoles = __webpack_require__(987);
      var iterableToArrayLimit = __webpack_require__(156);
      var unsupportedIterableToArray = __webpack_require__(122);
      var nonIterableRest = __webpack_require__(752);
      function _slicedToArray(r, e) {
        return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
      }
      module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/738: ( /***/function _(module) {
      function _typeof(o) {
        "@babel/helpers - typeof";

        return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
      }
      module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    }),
    /***/122: ( /***/function _(module, __unused_webpack_exports, __webpack_require__) {
      var arrayLikeToArray = __webpack_require__(79);
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
        }
      }
      module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  !function () {
    "use strict";

    var _interopRequireDefault = __webpack_require__(994),
      _typeof2 = _interopRequireDefault(__webpack_require__(738)),
      _slicedToArray2 = _interopRequireDefault(__webpack_require__(715)),
      _uuid = __webpack_require__(831);
    !function () {
      var interval,
        QueryStringFormats = {
          Default: 0,
          Exalogic: 1
        },
        config = {
          debug: !1,
          code: "",
          environment: "production",
          retryTimeout: 2e3,
          fingerprintExpiry: 50,
          cookieNames: {
            "default": "vtrk",
            visitId: "vtrk_visitid",
            fingerprint: "vtrk_fingerprint"
          },
          api: {
            endpoints: {
              development: "https://acq-gateway-public-dev.orange.cpt/Analytics/V1/Websites",
              stage: "https://gateway-staging.src-play.com/Analytics/V1/Websites",
              production: "https://gateway.src-play.com/Analytics/V1/Websites"
            },
            access: {
              development: {
                name: "Access-Key",
                value: "YhlH93UyPPig1EFMWn7WZNT6CAFAoZQxTN2D"
              },
              stage: {
                name: "Access-Key",
                value: "YhlH93UyPPig1EFMWn7WZNT6CAFAoZQxTN2D"
              },
              production: {
                name: "Access-Key",
                value: "YhlH93UyPPig1EFMWn7WZNT6CAFAoZQxTN2D"
              }
            },
            subscription: {
              development: {
                name: "g-subscription-key",
                value: "ffe3ccf3-a153-469b-a376-fc0226645d53"
              },
              stage: {
                name: "g-subscription-key",
                value: "ffe3ccf3-a153-469b-a376-fc0226645d53"
              },
              production: {
                name: "g-subscription-key",
                value: "3a23ddbe-48e5-48f0-a8b8-6ef8318d22a2"
              }
            },
            contentType: {
              name: "Content-type",
              value: "application/json"
            }
          },
          queryString: {
            format: QueryStringFormats.Default,
            autoInjector: {
              enabled: !1,
              domains: []
            }
          },
          cookieFallbacks: {
            enabled: !1,
            values: []
          }
        },
        visit = {
          data: {
            code: null,
            visitId: null,
            url: null,
            properties: null,
            utcDate: null,
            cookies: null,
            parameters: null
          },
          status: -1
        };
      function buildQueryString(queryStringParameterDictionary) {
        (isNullOrWhiteSpace(config.queryString.format) || isNaN(parseInt(config.queryString.format))) && (config.queryString.format = QueryStringFormats.Default), isNullOrWhiteSpace(queryStringParameterDictionary) && (queryStringParameterDictionary = {}), writeToConsole("Building query string with existing set", queryStringParameterDictionary);
        var sVariable = isNullOrWhiteSpace(visit.data.parameters.s) ? "TYPEINTRAFFIC" : visit.data.parameters.s,
          aVariable = isNullOrWhiteSpace(visit.data.parameters.a) ? "TYPEINTRAFFIC" : visit.data.parameters.a;
        if (isNullOrWhiteSpace(queryStringParameterDictionary.s) && (queryStringParameterDictionary.s = sVariable), isNullOrWhiteSpace(queryStringParameterDictionary.a) && (queryStringParameterDictionary.a = aVariable), isNullOrWhiteSpace(queryStringParameterDictionary.sessionVisitId) && (queryStringParameterDictionary.sessionVisitId = visit.data.visitId), writeToConsole("Base variables added to set", queryStringParameterDictionary), !isNullOrWhiteSpace(visit.data.parameters)) for (var param in visit.data.parameters) "a" !== param && "s" !== param && "sessionVisitId" !== param && isNullOrWhiteSpace(queryStringParameterDictionary[param]) && (queryStringParameterDictionary[param] = visit.data.parameters[param]);
        switch (writeToConsole("Final query string dictionary", queryStringParameterDictionary), config.queryString.format) {
          case QueryStringFormats.Default:
            return buildDefaultQueryStringFormat(queryStringParameterDictionary);
          case QueryStringFormats.Exalogic:
            return function (queryStringParameterDictionary) {
              var queryString = "";
              return queryString += queryStringParameterDictionary.s + "_", queryString += queryStringParameterDictionary.a + "_", queryString += queryStringParameterDictionary.sessionVisitId;
            }(queryStringParameterDictionary);
          default:
            return buildDefaultQueryStringFormat(queryStringParameterDictionary);
        }
      }
      function buildDefaultQueryStringFormat(queryStringParameterDictionary) {
        var queryString = "";
        for (var param in queryStringParameterDictionary) "sessionVisitId" === param && "00000000-0000-0000-0000-000000000000" === queryStringParameterDictionary[param] || ("" !== queryString && (queryString += "&"), queryString += param + "=" + queryStringParameterDictionary[param]);
        return queryString;
      }
      function generateVisitCookie() {
        try {
          clearSetInterval();
          var storedStateValue = getCookie(config.cookieNames["default"]);
          if (isNullOrWhiteSpace(storedStateValue)) writeToConsole("Cookie does not exist."), visit.data.utcDate = new Date(new Date().toUTCString()).toISOString(), visit.data.code = config.code, visit.data.visitId = "00000000-0000-0000-0000-000000000000", visit.data.url = window.location.href, visit.data.properties = {
            referrer: document.referrer
          }, visit.data.cookies = function () {
            for (var cookies = document.cookie.split(";"), cookieDictionary = {}, index = 0; index < cookies.length; index++) {
              var cookieObjectValues = cookies[index].split("="),
                _cookieObjectValues = (0, _slicedToArray2["default"])(cookieObjectValues, 2),
                name = _cookieObjectValues[0],
                value = _cookieObjectValues[1];
              cookieDictionary[name] = value;
            }
            return cookieDictionary;
          }(), visit.data.parameters = function () {
            var parameterObject = {};
            if (isNullOrWhiteSpace(window.location.search) || (parameterObject = buildObjectFromQueryString(window.location.search.substring(1))), config.cookieFallbacks.enabled) {
              writeToConsole("Cookie fallbacks are enabled.");
              for (var index = 0; index < config.cookieFallbacks.values.length; index++) if (isNullOrWhiteSpace(parameterObject[config.cookieFallbacks.values[index].variableName])) {
                writeToConsole("No " + config.cookieFallbacks.values[index].variableName + " variable in query string, falling back to cookie " + config.cookieFallbacks.values[index].cookieName);
                var cookieValue = getCookie(config.cookieFallbacks.values[index].cookieName);
                isNullOrWhiteSpace(cookieValue) || (writeToConsole("Found " + config.cookieFallbacks.values[index].cookieName + " variable cookie fallback", cookieValue), parameterObject[config.cookieFallbacks.values[index].variableName] = cookieValue);
              }
            }
            return parameterObject;
          }(), writeToConsole("Cookie object created.", visit.data), setCookie(config.cookieNames["default"], JSON.stringify(visit)), sendVisit();else {
            var storedState = JSON.parse(storedStateValue);
            writeToConsole("Cookie already exists.", visit = storedState), 1 !== visit.status && "1" !== visit.status ? (writeToConsole("Current cookie status does not indicate success."), sendVisit()) : (writeToConsole("Current cookie indicated previous send success."), raiseTrackedEvent());
          }
        } catch (ex) {
          writeToConsole("Something went wrong while trying to get the current cookie.", ex);
        }
      }
      function sendVisit() {
        try {
          writeToConsole("Post request starting.", config.api.endpoints[config.environment]), function (url, body, onComplete, onError) {
            try {
              (function (method, url, onComplete, onError) {
                var request = new XMLHttpRequest();
                return request.onreadystatechange = function () {
                  try {
                    if (4 !== this.readyState) return;
                    200 === this.status || 204 === this.status ? onComplete(this.responseText) : (writeToConsole("An exception has occurred while trying to send the visit.", this), onError());
                  } catch (ex) {
                    writeToConsole("An exception has occurred while trying to send the visit.", ex), onError();
                  }
                }, request.open(method, url), request.setRequestHeader(config.api.contentType.name, config.api.contentType.value), request.setRequestHeader(config.api.access[config.environment].name, config.api.access[config.environment].value), request.setRequestHeader(config.api.subscription[config.environment].name, config.api.subscription[config.environment].value), request.setRequestHeader("x-correlation-id", (0, _uuid.v4)()), request;
              })("POST", url, onComplete, onError).send(body);
            } catch (ex) {
              writeToConsole("An exception has occurred while trying to send the visit.", ex), onError();
            }
          }(config.api.endpoints[config.environment], function () {
            var visitToPost = JSON.parse(JSON.stringify(visit.data));
            isNullOrWhiteSpace(visitToPost.properties) || (visitToPost.properties.userAgent = navigator.userAgent);
            return writeToConsole("Object has been generated for posting.", visitToPost), JSON.stringify(visitToPost);
          }(), function (response) {
            writeToConsole("Post request successful.");
            var responseJsonObject = JSON.parse(response);
            if (visit.status = 1, visit.data.visitId = responseJsonObject.visitId, setCookie(config.cookieNames["default"], JSON.stringify(visit)), setCookie(config.cookieNames.visitId, visit.data.visitId), !isNullOrWhiteSpace(response)) try {
              var responseJson = JSON.parse(response);
              if (!isNullOrWhiteSpace(responseJson) && responseJson.length > 0) {
                writeToConsole("Response object received from API.", responseJson);
                for (var i = 0; i < responseJson.length; i++) writeToConsole("Setting response cookie object.", responseJson[i]), setCookie(responseJson[i].cookieName, JSON.stringify(responseJson[i].cookieValues));
              }
            } catch (_unused) {
              writeToConsole("Response from server was not a JSON error.");
            }
            raiseTrackedEvent();
          }, function () {
            interval = setInterval(generateVisitCookie, config.retryTimeout);
          });
        } catch (ex) {
          writeToConsole("An exception has occurred while trying to send the visit.", ex), clearSetInterval();
        }
      }
      function clearSetInterval() {
        isNullOrWhiteSpace(interval) || clearInterval(interval);
      }
      function setCookie(name, value, expiryDate) {
        isNullOrWhiteSpace(expiryDate) ? document.cookie = name + "=" + (value || "") + "; Domain=" + getDomain() + "; path=/" : document.cookie = name + "=" + (value || "") + "; Domain=" + getDomain() + "; expires=" + expiryDate + "; path=/";
      }
      function getDomain() {
        try {
          return function (domainUrl) {
            var hostname = domainUrl;
            if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) || hostname.includes(":") || "localhost" === hostname) return hostname;
            var domainParts = hostname.split("."),
              highLevelDomain = domainParts.slice(-2).join(".");
            if (domainParts.length > 2) {
              var potentialSLD = domainParts[domainParts.length - 2];
              potentialSLD.length < 4 && (highLevelDomain = domainParts.slice(-3).join("."));
            } else 1 === domainParts.length && (highLevelDomain = hostname);
            return highLevelDomain;
          }(window.location.hostname);
        } catch (ex) {
          return writeToConsole("An exception has occurred while trying to get window.location.hostname.", ex), document.domain;
        }
      }
      function getCookie(name) {
        for (var nameEq = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
          for (var c = ca[i]; " " == c.charAt(0);) c = c.substring(1, c.length);
          if (0 == c.indexOf(nameEq)) return c.substring(nameEq.length, c.length);
        }
        return null;
      }
      function raiseTrackedEvent() {
        document.dispatchEvent(new CustomEvent("tracked", {
          detail: visit
        }));
      }
      function buildObjectFromQueryString(queryString) {
        if (isNullOrWhiteSpace(queryString)) return {};
        -1 !== queryString.indexOf("?") && (queryString = queryString.substring(1)), writeToConsole("Query string to process.", queryString);
        var finalObject = {},
          cleanedQueryStringParameters = queryString.split("&");
        writeToConsole("Cleaned query string.", cleanedQueryStringParameters);
        for (var i = 0; i < cleanedQueryStringParameters.length; i++) {
          var splitValueParam = cleanedQueryStringParameters[i].split("=");
          isNullOrWhiteSpace(splitValueParam) || 0 === splitValueParam.length || (1 === splitValueParam.length ? finalObject[splitValueParam[0]] = "" : finalObject[splitValueParam[0]] = splitValueParam[1]);
        }
        return finalObject;
      }
      function writeToConsole(message, data) {
        config.debug && (isNullOrWhiteSpace(data) ? console.log("Tracking: " + message) : console.log("Tracking: " + message, data));
      }
      function isNullOrWhiteSpace(input) {
        return !input || /^\s*$/.test(input);
      }
      function handleAutoQueryStringEvent(event) {
        var eventObject = (event = event || window.event).target || event.srcElement,
          anchor = eventObject.closest("a"),
          form = eventObject.closest("form"),
          endpoint = anchor ? anchor.getAttribute("href") || anchor.href : form ? form.action : "",
          domains = new RegExp((config.queryString.autoInjector.enabled ? config.queryString.autoInjector.domains : []).join("|"), "i");
        if (writeToConsole("Handling Click event", {
          eventObject: eventObject,
          anchor: anchor,
          form: form,
          endpoint: endpoint,
          domains: domains
        }), !isNullOrWhiteSpace(endpoint) && !/^(#|javascript:)/i.test(endpoint) && domains.test(endpoint)) {
          writeToConsole("Click matched to domain");
          var hashedEndpointSplit = endpoint.split("#"),
            queryStringEndpointSplit = hashedEndpointSplit[0].split("?");
          writeToConsole("Domain", queryStringEndpointSplit[0]);
          var existingQueryStringParameters = {};
          isNullOrWhiteSpace(queryStringEndpointSplit[1]) || (existingQueryStringParameters = buildObjectFromQueryString(queryStringEndpointSplit[1])), writeToConsole("Existing query string parameters on matched domain", existingQueryStringParameters);
          var processedQueryString = buildQueryString(existingQueryStringParameters),
            processedEndpoint = queryStringEndpointSplit[0] + (isNullOrWhiteSpace(processedQueryString) ? "" : "?") + processedQueryString + (hashedEndpointSplit[1] || "");
          isNullOrWhiteSpace(anchor) ? null != form && (form.action = processedEndpoint, writeToConsole("Form updated domain", processedEndpoint)) : (anchor.href = processedEndpoint, writeToConsole("Anchor updated domain", processedEndpoint));
        }
      }
      window.vtrk = {
        QueryStringFormats: QueryStringFormats,
        process: function process(configOverride) {
          try {
            if (config = function deepMerge(objectA, objectB) {
              return Object.entries || (Object.entries = function (obj) {
                for (var ownProps = Object.keys(obj), index = ownProps.length, resArray = new Array(index); index--;) resArray[index] = [ownProps[index], obj[ownProps[index]]];
                return resArray;
              }), Array.prototype.reduce || (Array.prototype.reduce = function (fn, initial) {
                return this.forEach(function (item) {
                  initial = isNullOrWhiteSpace(initial) ? item : fn(initial, item);
                }), initial;
              }), Object.entries(objectB).reduce(function (o, _ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                  k = _ref2[0],
                  v = _ref2[1];
                return o[k] = v && "object" === (0, _typeof2["default"])(v) ? deepMerge(o[k] = o[k] || (Array.isArray(v) ? [] : {}), v) : v, o;
              }, objectA);
            }(config, configOverride), isNullOrWhiteSpace(config.code)) throw "Tracking code needs to be specified";
            isNullOrWhiteSpace(config.environment) && (config.environment = "production"), writeToConsole("Current module config", config), function () {
              if (config.queryString.autoInjector.enabled) for (var events = ["mousedown", "keyup", "submit", "click"], i = 0; i < events.length; i++) document.addEventListener(events[i], handleAutoQueryStringEvent);
            }(), generateVisitCookie();
          } catch (ex) {
            writeToConsole("Exception occurred.", ex);
          }
        },
        buildQueryString: buildQueryString,
        getFingerprint: function getFingerprint() {
          var fingerprintCookie = getCookie(config.cookieNames.fingerprint);
          return isNullOrWhiteSpace(fingerprintCookie) ? "" : fingerprintCookie;
        }
      };
    }();
  }();
  /******/
})();