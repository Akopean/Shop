<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Core\Users\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRegisterTest extends TestCase
{
    use RefreshDatabase;
    //use DatabaseTransactions;

    protected $repository;

    public function setUp()
    {
        parent::setUp();
        $this->repository = $this->app->make(UserRepository::class);
    }

    /** @test */
    public function can_register_user()
    {
        $user = $this->repository->createUser([
            'name' => 'Test',
            'email' => 'test@email.test',
            'password' => 'password',
            'role' => 'user',
            'status' => 'active'
        ]);

        $this->assertNotEmpty($user);

        $this->assertEquals('Test', $user->name);
        $this->assertEquals('test@email.test', $user->email);

        $this->assertNotEquals('password',  $user->password);

        $this->assertTrue($user->isActive());
    }
}
