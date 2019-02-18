<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Core\Auth\Requests\ResetPasswordRequest;
use App\Core\Users\Repositories\UserRepository;
use App\Core\Users\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;

class ResetPasswordController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function resetPassword(ResetPasswordRequest $request, JWTAuth $JWTAuth)
    {
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
            $this->reset($user, $password);
        }
        );

        if ($response !== Password::PASSWORD_RESET) {
            throw new HttpException(500);
        }

        $user =$this->repository->findWhere(['email' => $request->get('email')])->first();

        return response()->json([
            'status' => 'success',
            'token' => $JWTAuth->fromUser($user),
        ]);
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    public function broker()
    {
        return Password::broker();
    }

    /**
     * Get the password reset credentials from the request.
     *
     * @param  ResetPasswordRequest $request
     * @return array
     */
    protected function credentials(ResetPasswordRequest $request)
    {
        return $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword $customer
     * @param  string $password
     * @return void
     */
    protected function reset($customer, $password)
    {
        $customer->password = Hash::make($password);
        $customer->save();
    }
}
