<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin | Starter</title>
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>
<body class="hold-transition sidebar-mini">
<div id="app"></div>
<!-- app.js-->
<script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
