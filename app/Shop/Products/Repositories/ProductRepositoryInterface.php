<?php

namespace App\Shop\Products\Repositories;

interface ProductRepositoryInterface {
    public function findBySlug($slug);
}
