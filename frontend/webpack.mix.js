const mix = require('laravel-mix');
// require('laravel-mix-merge-manifest');

// mix.setPublicPath('../public').mergeManifest();
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('../');

mix.js('./src/main.js', '../public/js')
  .sass('./src/sass/main.scss', '../public/css');
