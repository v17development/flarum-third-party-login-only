var module = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // flarum-shim:flarum/extend
  var require_extend = __commonJS({
    "flarum-shim:flarum/extend"(exports, module) {
      module.exports = flarum.core.compat["extend"];
    }
  });

  // flarum-shim:flarum/forum/app
  var require_app = __commonJS({
    "flarum-shim:flarum/forum/app"(exports, module) {
      module.exports = flarum.core.compat["forum/app"];
    }
  });

  // flarum-shim:flarum/forum/components/LogInModal
  var require_LogInModal = __commonJS({
    "flarum-shim:flarum/forum/components/LogInModal"(exports, module) {
      module.exports = flarum.core.compat["forum/components/LogInModal"];
    }
  });

  // flarum-shim:flarum/forum/components/SignUpModal
  var require_SignUpModal = __commonJS({
    "flarum-shim:flarum/forum/components/SignUpModal"(exports, module) {
      module.exports = flarum.core.compat["forum/components/SignUpModal"];
    }
  });

  // flarum-shim:flarum/forum/components/HeaderSecondary
  var require_HeaderSecondary = __commonJS({
    "flarum-shim:flarum/forum/components/HeaderSecondary"(exports, module) {
      module.exports = flarum.core.compat["forum/components/HeaderSecondary"];
    }
  });

  // flarum-shim:flarum/forum/components/LogInButton
  var require_LogInButton = __commonJS({
    "flarum-shim:flarum/forum/components/LogInButton"(exports, module) {
      module.exports = flarum.core.compat["forum/components/LogInButton"];
    }
  });

  // flarum-shim:flarum/forum/components/SettingsPage
  var require_SettingsPage = __commonJS({
    "flarum-shim:flarum/forum/components/SettingsPage"(exports, module) {
      module.exports = flarum.core.compat["forum/components/SettingsPage"];
    }
  });

  // src/forum/index.js
  var import_extend = __toESM(require_extend());
  var import_app = __toESM(require_app());
  var import_LogInModal = __toESM(require_LogInModal());
  var import_SignUpModal = __toESM(require_SignUpModal());
  var import_HeaderSecondary = __toESM(require_HeaderSecondary());
  var import_LogInButton = __toESM(require_LogInButton());
  var import_SettingsPage = __toESM(require_SettingsPage());
  import_app.default.initializers.add("v17development-flarum-third-party-login-only", () => {
    (0, import_extend.extend)(import_LogInModal.default.prototype, "fields", function(items) {
      items.remove("identification");
      items.remove("password");
      items.remove("remember");
      items.remove("submit");
    });
    (0, import_extend.override)(import_LogInModal.default.prototype, "footer", function() {
      return null;
    });
    (0, import_extend.extend)(import_SignUpModal.default.prototype, "fields", function(items) {
      items.remove("username");
      items.remove("email");
      items.remove("password");
      items.remove("submit");
    });
    (0, import_extend.override)(import_SignUpModal.default.prototype, "onsubmit", function(original, e) {
      var _a, _b, _c, _d;
      (_a = e == null ? void 0 : e.preventDefault) == null ? void 0 : _a.call(e);
      (_b = this.loaded) == null ? void 0 : _b.call(this);
      (_d = (_c = import_app.default.alerts) == null ? void 0 : _c.show) == null ? void 0 : _d.call(
        _c,
        { type: "error" },
        "Sign-up is disabled on this forum. Accounts are created by an external system."
      );
      return;
    });
    (0, import_extend.extend)(import_HeaderSecondary.default.prototype, "items", function(items) {
      const replaceWith = (key, label) => {
        items.replace(
          key,
          import_LogInButton.default.component(
            {
              className: "Button Button--link",
              path: "/auth/passport"
            },
            label
          )
        );
      };
      if (import_app.default.forum.attribute("allowSignUp")) {
        replaceWith("signUp", import_app.default.translator.trans("core.forum.header.sign_up_link"));
      }
      replaceWith("logIn", import_app.default.translator.trans("core.forum.header.log_in_link"));
    });
    (0, import_extend.extend)(import_SettingsPage.default.prototype, "accountItems", function(items) {
      items.remove("changePassword");
      items.remove("changeEmail");
    });
  });
})();
module.exports = module.exports.default || module.exports;
