import app from "flarum/admin/app";

// This extension has no admin settings — its behaviour is hardcoded in
// extend.php and js/src/forum/index.js based on the assumption that the
// forum is paired with an external user-sync system. The initializer is
// kept so the front-end admin page still loads this script cleanly and
// does not have to special-case the absence of a third-party extension.
app.initializers.add("v17development-third-party-login-only", () => {});
