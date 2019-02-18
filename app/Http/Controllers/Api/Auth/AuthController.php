<?php

namespace App\Http\Controllers\Api\Auth;

use App\Core\Auth\Requests\FacebookLoginRequest;
use App\Core\Auth\Requests\LoginRequest;
use App\Core\Auth\Requests\SignUpRequest;
use App\Core\Users\Exceptions\CreateUserInvalidArgumentException;
use App\Core\Users\Repositories\UserRepository;
use App\Core\Users\Repositories\UserRepositoryInterface;
use App\Core\Users\User;
use App\Http\Controllers\ApiController;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthController extends ApiController
{

    /**
     * @var UserRepository
     */
    protected $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
        //$this->middleware('auth:api', ['except' => ['index', 'show']]);
        $this->middleware('guest', ['except' => ['user', 'logout']]);
    }

    /**
     * Create user
     *
     * @param SignUpRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws CreateUserInvalidArgumentException
     */
    public function signup(SignUpRequest $request)
    {
        event(new Registered($user = $this->create($request->only(['name', 'email', 'password']))));

        $this->autenticate($user );

        return response()->json([
            'status' => 'success',
            'message' => [Lang::get('user.auth.succesCreated')]//'Successfully created user!'
        ], 201)->header('Authorization', auth()->fromUser(auth()->user()));
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return \App\Core\Users\User
     * @throws CreateUserInvalidArgumentException
     */
    protected function create(array $data)
    {
        $user = $this->repository->createUser($data);

        return $user;
    }

    /**
     * Authenticate User
     * @param $user
     */
    protected function autenticate($user)
    {
        auth()->login($user);

        event(new Login('api', $user, false));
    }

    /**
     * Login user and create token
     * @param LoginRequest $request
     * @return void
     */
    public function login(LoginRequest $request)
    {
        $credentials = request(['email', 'password']);

        try {
            if ($request['rememberMe']) {
                config(['jwt.ttl', Carbon::now()->addWeeks(5)->diffInMinutes()]);
            }
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                    'message' => [Lang::get('user.auth.unauthorized')]
                ], 401);
            }

            if (!$request->user()->isActive()) {
                JWTAuth::invalidate();// Invalidate a token (add it to the blacklist)
                return response()->json([
                    'status' => 'error',
                    'message' => [Lang::get('user.status.banned')]
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['status' => 'error', 'message' => [Lang::get('user.auth.token.error')]], 500);
        }

        $res =  response([
            'status' => 'success',
            'token_type' => 'Bearer',
            //"scope":"login",
            //"refresh_token":"",
            'expires_in' => auth()->factory()->getTTL()
        ])->header('Authorization', $token);

        return $res;
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return \Illuminate\Http\JsonResponse [string] message
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'status' => 'success',
                'message' => [Lang::get('user.auth.succesLogout')]//'Successfully logged out'
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => [Lang::get('user.auth.errorLogout')]
            ], 500);
        }
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        return response([
            'status' => 'success',
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response [json] user object
     */
    public function user(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user(),
        ])->header('Access-Control-Expose-Headers', 'Authorization');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * @throws AuthorizationException
     * @throws CreateUserInvalidArgumentException
     */
    public function facebook(FacebookLoginRequest $request)
    {
        return $this->_social($request, 'facebook', function ($user) {
            return (object)[
                'id' => $user->id,
                'email' => $user->user['email'],
                'name' => @explode(" ", $user->user['name'])[0],
                'photo_url' => $user->avatar . '&width=1200'
            ];
        });
    }

    /**
     * @param Request $request
     * @param $type
     * @param $cb
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * @throws AuthorizationException
     * @throws CreateUserInvalidArgumentException
     */
    private function _social(Request $request, $type, $cb)
    {
        if ($request->has('token')) {

            $social_user = Socialite::with($type)->userFromToken($request->input('token'));

            $social_user = $cb($social_user);

            if (!@$social_user->id) {
                return response([
                    'status' => 'error',
                    'message' => [Lang::get('user.auth.errorGettingSocial')]
                ], 400);
            }

            $user = $this->repository->findByField($type . '_id', $social_user->id)->first();

            if (!($user instanceof User)) {
                $user = $this->repository->findByField('email', $social_user->email)->first();

                if (!($user instanceof User)) {

                    event(new Registered($user = $this->create([
                        'name' => $social_user->name,
                        'email' => $social_user->email,
                        'facebook_id' => $social_user->id,
                        'type' => $type,
                    ])));

                    $this->autenticate($user);
                }
            }
            // Update info and save.
            if (empty($user[$type.'_id'])) {
                $user[$type.'_id'] = $social_user->id;
                $user->save();
            }

            if (!$token = JWTAuth::fromUser($user)) {
                throw new AuthorizationException;
            }

            return response([
                'status' => 'success',
                'token_type' => 'Bearer',
                'expires_in' => auth()->factory()->getTTL()
            ])->header('Authorization', $token);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response([
            'status' => 'success',
            'token_type' => 'Bearer',
            //"scope":"login",
            //"refresh_token":"",
            'expires_in' => auth('api')->factory()->getTTL()
        ])->header('Authorization', $token);
    }
}
