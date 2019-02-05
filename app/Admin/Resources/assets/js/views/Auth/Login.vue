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
                            name: 'Dashboard'
                        },
                        success() {
                            this.$store.commit('auth/AUTH_USER');
                        },
                        error(err) {
                            this.$store.commit('auth/AUTH_USER_ERROR', err);
                        }
                    });
                }
            },
        }
    }
</script>
