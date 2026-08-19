import { extend, override } from "flarum/extend";
import app from "flarum/forum/app";
import LogInModal from "flarum/forum/components/LogInModal";
import SignUpModal from "flarum/forum/components/SignUpModal";
import HeaderSecondary from "flarum/forum/components/HeaderSecondary";
import LogInButton from "flarum/forum/components/LogInButton";
import SettingsPage from "flarum/forum/components/SettingsPage";

app.initializers.add("v17development-flarum-third-party-login-only", () => {
  // -----------------------------------------------------------------
  // LogInModal: strip the password form and the footer entirely.
  //
  // User accounts are created by an external sync system and never have
  // a password set, so showing a "username + password" login form or
  // a "forgot password" / "sign up" footer would only confuse people.
  // The server-side /login route is also disabled in extend.php, so
  // even a hand-rolled POST will get a 403.
  // -----------------------------------------------------------------
  extend(LogInModal.prototype, "fields", function (items) {
    items.remove("identification");
    items.remove("password");
    items.remove("remember");
    items.remove("submit");
  });

  override(LogInModal.prototype, "footer", function () {
    return null;
  });

  // -----------------------------------------------------------------
  // SignUpModal: empty it out and block submit.
  //
  // Public sign-up is closed (server-side /register returns 403), so
  // the modal should never be the path a real user takes. We strip
  // every field defensively in case some other extension opens the
  // modal, and the onsubmit override ensures the form is never sent.
  // -----------------------------------------------------------------
  extend(SignUpModal.prototype, "fields", function (items) {
    items.remove("username");
    items.remove("email");
    items.remove("password");
    items.remove("submit");
  });

  override(SignUpModal.prototype, "onsubmit", function (original, e) {
    e?.preventDefault?.();
    this.loaded?.();
    app.alerts?.show?.(
      { type: "error" },
      "Sign-up is disabled on this forum. Accounts are created by an external system."
    );
    return;
  });

  // -----------------------------------------------------------------
  // Header: redirect both Sign In and Sign Up buttons to the oAuth
  // login page. The `allowSignUp` check is the only forum attribute
  // we still read — it comes from Flarum's built-in sign-up permission,
  // not from this extension's settings.
  // -----------------------------------------------------------------
  extend(HeaderSecondary.prototype, "items", function (items) {
    const replaceWith = (key, label) => {
      items.replace(
        key,
        LogInButton.component(
          {
            className: "Button Button--link",
            path: "/auth/passport",
          },
          label
        )
      );
    };

    if (app.forum.attribute("allowSignUp")) {
      replaceWith("signUp", app.translator.trans("core.forum.header.sign_up_link"));
    }

    replaceWith("logIn", app.translator.trans("core.forum.header.log_in_link"));
  });

  // -----------------------------------------------------------------
  // Settings: users have no password (the sync system never sets one)
  // and their email is managed in the external system too, so the
  // "Change password" and "Change email" buttons make no sense.
  // -----------------------------------------------------------------
  extend(SettingsPage.prototype, "accountItems", function (items) {
    items.remove("changePassword");
    items.remove("changeEmail");
  });
});
