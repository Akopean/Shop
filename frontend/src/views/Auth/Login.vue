<template>
    <v-container grid-list-md text-xs-center>
        <v-layout align-center fill-height justify-center row wrap>
            <v-flex lg3 md4 sm8 xs12>
                <v-card class="elevation-1 pa-3">
                    <v-card-text>
                        <div class="layout column align-center">
                            <h1 class="flex my-4 primary--text">{{ $t("login.login") }}</h1>
                        </div>
                        <v-form lazy-validation ref="form" v-model="valid">

                            <v-text-field :placeholder="$t('login.email')" :rules="emailRules" append-icon="person"
                                          id="email" name="email"
                                          type="email" v-model="email"></v-text-field>

                            <v-text-field :placeholder="$t('login.password')" :rules="passwordRules" append-icon="lock"
                                          id="password"
                                          name="password"
                                          type="password" v-model="password"></v-text-field>
                            <v-checkbox
                                label="Remember Me"
                                v-model="rememberMe"
                            ></v-checkbox>
                            <v-btn
                                :disabled="!valid"
                                @click="login"
                            >
                                Login
                            </v-btn>
                            <v-btn v-show="!token" v-on:click="social('facebook')">Facebook</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
                <v-snackbar
                    :top="true"
                    :vertical="true"
                    v-model="snackbar"
                >
                    {{ errorMessage }}
                    <v-btn
                        @click="snackbar = false"
                        color="pink"
                        flat
                    >
                        Close
                    </v-btn>
                </v-snackbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                token: null,
                snackbar: false,
                errorMessage: '',
                email: null,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: null,
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length <= 10) || 'Password must be less than 6 characters'
                ],
                rememberMe: false,
                valid: true,
            }
        },
        mounted() {
            let params = window.location.hash.substr(1).split('&');
            params.forEach(param => {
                let pair = param.split('=');
                if (pair[0] === 'access_token') {
                    this.token = pair[1];
                    return false
                }
            });
            if (this.token) {
                this.$auth.login({
                    url: 'auth/facebook',
                    params: {
                        token: this.token,
                    },
                    success: function(res) {
                        console.log('success ');
                    },
                    error: function (res) {
                        console.log('error ');
                    }
                });
            }
        },
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    this.$auth.login({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            email: this.email,
                            password: this.password,
                            rememberMe: this.rememberMe
                        },
                        rememberMe: this.rememberMe,
                        redirect: {
                            name: 'index'
                        },
                        success() {
                            this.$store.commit('auth/AUTH_USER');
                        },
                        error(err) {
                            console.log(err);
                            this.$store.commit('auth/AUTH_USER_ERROR', err);
                        }
                    });
                }
            },
            social(type) {
                this.$auth.oauth2({
                    provider: type
                });
            }
        }
    }
</script>
