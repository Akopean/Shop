<?php

namespace App\Core\Users\Repositories;

use App\Core\Users\Exceptions\CreateUserInvalidArgumentException;
use App\Core\Users\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Config;
use Prettus\Repository\Eloquent\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $fieldSearchable = [
        'mail' => 'like',
        'name' => 'like',
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return "App\\Core\\Users\\User";
    }

    /**
     * Create the user
     *
     * @param array $params
     * @return User
     * @throws CreateUserInvalidArgumentException
     */
    public function createUser(array $params) : User
    {
        try {
            $data = collect($params)->except('password')->all();
            $user = User::new($data);
            if (isset($params['password'])) {
                $user->password = bcrypt($params['password']);
            }
            if (isset($params['type'])) {
                $user[$params['type'] .'_id'] = $params[$params['type'] .'_id'];
            }
            $user->save();
            return $user;
        } catch (QueryException $e) {
            throw new CreateUserInvalidArgumentException($e->getMessage(), 500, $e);
        }
    }

    public function isActive()
    {
        return $this->model->status === Config::get('shop.products.status.ACTIVE');
    }

    public function isBanned()
    {
        return $this->status === Config::get('shop.products.status.BANNED');
    }
}
