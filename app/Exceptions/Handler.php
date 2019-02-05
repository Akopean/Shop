<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
      /*  AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,*/
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception $exception
     * @return void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof HttpResponseException) {
            return $e->getResponse();
        }

        if ($e instanceof \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        }
        $class = get_class($e);
        switch($class) {
            case 'Illuminate\\Http\\Exception\\HttpResponseException':
                return parent::render($request, $e);
                break;
            case 'Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException':
                $code = 'NotFound';
                $msg = 'Not Found.';
                $statusCode = 404;
                break;
            case 'Illuminate\Database\Eloquent\ModelNotFoundException':
                $code = 'ModelNotFound';
                $model = str_replace('App\\Models\\', '', $e->getModel());
                $msg = $model . ' not found.';
                $statusCode = 404;
                break;
            case 'Illuminate\Auth\Access\AuthorizationException':
                $code = 'InvalidCredentials';
                $msg = 'Credentials are invalid.';
                $statusCode = 400;
                break;
            case 'Tymon\JWTAuth\Exceptions\JWTException';
                $code = 'JWTException';
                $msg = 'There was an issue generating jwt tokens.';
                $statusCode = 400;
                break;
            case 'App\Exceptions\JWTAbsentException';
                $code = 'TokenAbsent';
                $msg = 'The token is absent.';
                $statusCode = 400;
                break;
            case 'App\Exceptions\JWTExpiredException';
                $code = 'TokenExpired';
                $msg = 'The token has expired.';
                $statusCode = 401;
                break;
            case 'App\Exceptions\JWTInvalidException';
                $code = 'InvalidToken';
                $msg = 'The token is invalid.';
                $statusCode = 401;
                break;
            case 'App\Exceptions\JWTUserNotFoundException';
                $code = 'UserNotFound';
                $msg = 'The user token does not match.';
                $statusCode = 404;
                break;
            default:
                $code = 'SystemError';
                $msg = $e->getMessage();
                $file = $e->getFile();
                $line = $e->getLine();
                $statusCode = 500;
        }
        $data = [
            'status' => 'error',
            'exception' => $class,
            'code' => $code,
            'msg' =>  $msg
        ];
        if (isset($file)) {
            $data['file'] = $file;
        }
        if (isset($line)) {
            $data['line'] = $line;
        }

        return response($data, $statusCode)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    }
}
