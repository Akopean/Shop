<?php

namespace Tests\Unit\User;

use App\Core\Users\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserFacebookLoginTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;
    protected $user;

    public function setUp()
    {
        parent::setUp();
        $this->repository = $this->app->make(UserRepository::class);
    }

    public function testRequiresToken()
    {
        $resp = $this->json('POST', 'api/auth/facebook');

        $resp->assertStatus(422)
            ->assertJsonFragment([
                "message" => "The given data was invalid.",
                "status_code" => 422,
            ])->assertJsonValidationErrors(['token']);

        $this->assertGuest();
    }

    public function testFacebookLoginAndRegistered()
    {
        Socialite::shouldReceive('with->userFromToken')->andReturn((object)[
            'id' => '111',
            'user' => [
                'name' => 'Test Test',
                'email' => 'facebook@test.email',
            ],
            'avatar' => 'avatar.jpg'
        ]);

        $resp = $this->json('POST', 'api/auth/facebook', [
            'token' => 'test_token'
        ], ['Accept' => 'application/json']);

        $resp->assertStatus(200)
            ->assertJsonStructure(['status', 'token_type', 'expires_in'])
            ->assertSessionHasNoErrors();

        $this->assertAuthenticated();
    }

    public function testFacebookLoginIfUserRegistered()
    {
        $user = $this->repository->createUser([
            'name' => 'Test',
            'email' => 'facebook@test.email',
            'password' => 'password',
        ]);

        Socialite::shouldReceive('with->userFromToken')->andReturn((object)[
            'id' => '111',
            'user' => [
                'name' => 'Test Test',
                'email' => 'facebook@test.email',
            ],
            'avatar' => 'avatar.jpg'
        ]);

        $resp = $this->json('POST', 'api/auth/facebook', [
            'token' => 'test_token'
        ], ['Accept' => 'application/json']);

        $resp->assertStatus(200)
            ->assertJsonStructure(['status', 'token_type', 'expires_in'])
            ->assertSessionHasNoErrors();

        $resp->assertHeader('Authorization');
    }
}
