<?php

namespace App\Http\Controllers;

class SpaController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
       // $this->middleware(['auth', 'verified']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('app');
    }
}
