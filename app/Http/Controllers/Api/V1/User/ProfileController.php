<?php

namespace App\Http\Controllers;

use App\Core\Profile\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $profile = UserProfile::where(['user_id' => Auth::guard('web')->user()->id])->firstOrFail();

        return view('profile.index', compact('profile'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function edit()
    {
        return view('profile.edit');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     */
    public function store(Request $request)
    {
        $profile = UserProfile::where(['user_id' => Auth::guard('web')->user()->id])->firstOrFail();

        $profile['first_name'] = $request->input('firstName');
        $profile['last_name'] = $request->input('lastName');

        if ($request->file('avatar')) {
           // $profile->clearMediaCollection('user_avatars');
            $profile['avatar_id'] = $profile->addMediaFromRequest('avatar')->toMediaCollection('user_avatars')->id;
        }

        $profile->save();

        redirect()->route('profile');
    }
}
