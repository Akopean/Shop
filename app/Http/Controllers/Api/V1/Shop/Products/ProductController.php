<?php

namespace App\Http\Controllers\Api\V1\Shop\Products;

use App\Http\Controllers\Controller;
use App\Shop\Products\Requests\StoreProductRequest;
use App\Shop\Products\Resources\ProductCollection;
use App\Shop\Products\Resources\ProductResource;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Requests\UpdateProductRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;

class ProductController extends Controller
{
    /**
     * @var ProductRepository
     */
    protected $repository;

    public function __construct(ProductRepositoryInterface $repository)
    {
        $this->repository = $repository;
        //$this->middleware('auth:api', ['except' => ['index', 'show']]);
        //$this->middleware('okta.auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return ProductCollection
     */
    public function index()
    {
        //$this->repository->setPresenter("App\\Shop\\Products\\Presenters\\ProductsPresenter");
        //factory(Product::class, 5)->create();
        try {
            $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));

            return new ProductCollection($this->repository->paginate());
        } catch (RepositoryException $e) {
            return response(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreProductRequest $request
     * @return ProductResource
     */
    public function store(StoreProductRequest $request)
    {
        try {
            ProductResource::withoutWrapping();

            return new ProductResource($this->repository->create([
                    'model' => $request->input('model'),
                    //'date_available' => Carbon::now()->todatestring(),
                    'price' => $request->input('price'),
                    'status' => $request->input('status'),
                    'description' => $request->input('description'),
                    'slug' => str_slug($request->input('model'))
                ]
            ));
        } catch (ValidatorException $e) {
            return response(['message' => $e->toArray()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProductRequest $request
     * @param  int $id
     * @return ProductResource
     */
    public function update(UpdateProductRequest $request, $id)
    {
        try {
            ProductResource::withoutWrapping();

            return new ProductResource($this->repository->update([
                'model' => $request->input('model'),
                //'date_available' => Carbon::now()->todatestring(),
                'price' => $request->input('price'),
                'status' => $request->input('status'),
                'description' => $request->input('description'),
                'slug' => $request->input('slug')
            ], $id));
        } catch (ValidatorException $e) {
            return response(['message' => $e->toArray()], 500);
        }
    }

    /**
     * Display a listing of the resource
     *
     * @return ProductCollection
     */
    public function getSearch()
    {
        try {
            $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));

            return new ProductCollection($this->repository->paginate());
        } catch (RepositoryException $e) {
            return response(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $slug
     * @return \Illuminate\Http\Response|ProductResource
     */
    public function show($slug)
    {
        try {
            ProductResource::withoutWrapping();

            return new ProductResource($this->repository->findBySlug($slug));
        } catch (ModelNotFoundException $e) {
            return response(['message' => 'Product not found'], 500);
        } catch (RepositoryException $e) {
            return response(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $this->repository->delete($id);

            return response(null, 204);
        } catch (ModelNotFoundException $e) {
            return response(['message' => 'Product not found'], 500);
        }
    }
}
