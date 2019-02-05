<?php

namespace App\Shop\Products\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $fieldSearchable = [
        'model' => 'like',
        'price',
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return "App\\Shop\\Products\\Product";
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     *
    public function validator()
    {
      //  return "App\\Shop\\Products\\Validators\\ProductValidator";
    }*/

    /**
     * Find data by slug
     *
     * @param $slug
     *
     * @return mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function findBySlug($slug)
    {
        $this->applyCriteria();
        $this->applyScope();
        $model = $this->model->where('slug', $slug)->firstorfail();
        $this->resetModel();

        return $this->parserResult($model);
    }
}
