<?php

namespace App\Admin\Providers;


class Admin
{

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    static function webRoutes()
    {
        require __DIR__.'/../Routes/web.php';
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    static function apiRoutes()
    {
        require __DIR__.'/../Routes/api.php';
    }
}
