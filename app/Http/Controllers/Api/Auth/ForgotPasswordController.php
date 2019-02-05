<?php

namespace App\Http\Controllers\Api\Auth;

use App\Core\Users\Repositories\UserRepository;
use App\Core\Users\Repositories\UserRepositoryInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ForgotPasswordController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function sendResetEmail(Request $request)
    {
        $user = $this->repository->findWhere(['email' => $request->get('email')])->first();
        if(!$user) {
            throw new NotFoundHttpException();
        }
        $broker = $this->getPasswordBroker();
        $sendingResponse = $broker->sendResetLink($request->only('email'));
        if($sendingResponse !== Password::RESET_LINK_SENT) {
            throw new HttpException(500);
        }
        return response()->json([
            'status' => 'success'
        ], 200);
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    private function getPasswordBroker()
    {
        return Password::broker();
    }
}
