<?php

namespace V17Development\FlarumThirdPartyLoginOnly;

use Flarum\Extend;

return [
    // Forum
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/less/Forum.less'),

    // Admin
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    // -----------------------------------------------------------------
    // Disable all interactive / self-service auth endpoints on the forum.
    // This extension is paired with an external user-sync system that
    // creates users via the API (POST /api/users with a service token),
    // so there is no need to keep the public /register, /login, /forgot
    // or /reset routes alive — they only exist to let a visitor type in
    // a username and password, which is exactly what we want to forbid.
    //
    // /api/users is intentionally left UNTOUCHED so the sync system (and
    // any admin "Create user" action) can still POST to it.
    // -----------------------------------------------------------------
    (new Extend\Routes('forum'))
        // Public password login → always disabled.
        ->remove('login')
        ->post('/login', 'login.disabled', Api\ApiRouteDisabledController::class)

        // Public registration → always disabled. Every visitor gets 403,
        // regardless of any token they may include. The sync system
        // bypasses this entirely by talking to /api/users directly.
        ->remove('register')
        ->post('/register', 'register.disabled', Api\ApiRouteDisabledController::class)

        // Password reset submission → disabled.
        ->remove('savePassword')
        ->post('/reset', 'savePassword.disabled', Controller\RouteDisabledController::class)

        // Password reset token validation → disabled.
        ->remove('resetPassword')
        ->get('/reset/{token}', 'resetPassword.disabled', Api\ApiRouteDisabledController::class),

    // Disable the "forgot password" API endpoint.
    (new Extend\Routes('api'))
        ->remove('forgot')
        ->post('/forgot', 'forgot.disabled', Api\ApiRouteDisabledController::class),
];
