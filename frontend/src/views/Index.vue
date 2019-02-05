<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Home Component</div>
                    <div class="card-body">
                        Home
                        <router-link v-if="!$auth.check()" to="/login">
                            <a>Login</a>
                        </router-link>
                        &bull;
                        <router-link v-if="!$auth.check()" to="/forgot_password">
                            <a>Forgot Password</a>
                        </router-link>
                        &bull;
                        <router-link v-if="!$auth.check()" to="/register">
                            <a> Register </a>
                        </router-link>
                        &bull;
                        <a v-if="$auth.check()" @click="logout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$auth.logout({
                    redirect: 'login',
                    makeRequest: true,
                });
            },
        },
    };
</script>
