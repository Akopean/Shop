<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Faker\Factory;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected $faker;

    public function setUp() {
        parent::setUp();
        \Artisan::call('migrate',['-vvv' => true]);
        \Artisan::call('db:seed',['-vvv' => true]);
        $this->faker = Factory::create();
    }
}
