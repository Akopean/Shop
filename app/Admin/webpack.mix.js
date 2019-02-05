const {mix} = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public').mergeManifest();

mix.webpackConfig({node: {fs: 'empty'}});

mix.js(__dirname + '/Resources/assets/js/app.js', 'admin/js/admin.js')
    .sass(__dirname + '/Resources/assets/sass/app.scss', 'admin/css/admin.css');


