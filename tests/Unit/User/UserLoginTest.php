<?php

namespace Tests\Unit\User;

use App\Core\Users\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;
    protected $user;

    public function setUp()
    {
        parent::setUp();
        $this->repository = $this->app->make(UserRepository::class);
        $this->user = $this->repository->createUser([
            'name' => 'Test',
            'email' => 'test@email.test',
            'password' => 'password',
            'role' =>  'user',
            'status' => 'active'
        ]);
    }

    public function testRequiresEmailAndPassword()
    {
        $resp = $this->json('POST', 'api/auth/login');

        $resp->assertStatus(422)
            ->assertJsonFragment([
                "message" => "The given data was invalid.",
                "status_code" => 422,
            ])->assertJsonValidationErrors(['email', 'password']);

        $this->assertGuest();
    }

    public function testApiLogin()
    {

        $resp = $this->json('POST', 'api/auth/login',
            ['email' => $this->user->email, 'password' => 'password'],
            ['Accept' => 'application/json']);

        $resp->assertStatus(200)
            ->assertJsonStructure(['status', 'token_type', 'expires_in'])
            ->assertSessionHasNoErrors();

        $this->assertAuthenticatedAs($this->user);
    }

    public function testTryDoubleAuth(){

        $resp = $this->json('POST', 'api/auth/login',
            ['email' => $this->user->email, 'password' => 'password'],
            ['Accept' => 'application/json']);

        $resp->assertStatus(200);

        $resp = $this->json('POST', 'api/auth/login',
            ['email' => $this->user->email, 'password' => 'password'],
            ['Accept' => 'application/json']);

        $resp->assertStatus(302);
    }
}
