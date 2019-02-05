<?php

namespace App\Core\Users\Repositories;

use App\Core\Users\User;

interface UserRepositoryInterface {
    public function createUser(array $params) : User;
}
