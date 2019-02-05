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

                            <v-text-field :placeholder="$t('login.name')" :rules="nameRules" append-icon="person"
                                          id="name" name="name"
                                          type="text" v-model="name"></v-text-field>

                            <v-text-field :placeholder="$t('login.password')" :rules="passwordRules" append-icon="lock"
                                          id="password"
                                          name="password"
                                          type="password" v-model="password"></v-text-field>

                            <v-text-field :placeholder="$t('login.repassword')" :rules="repasswordRules"
                                          append-icon="lock"
                                          id="repassword"
                                          name="repassword"
                                          type="password" v-model="repassword"></v-text-field>
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
                name: null,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 3 && v.length <= 50) || 'Name must be less than 3 characters',
                    v => /^[A-Za-z]{3}[a-zA-Z0-9-_]*$/.test(v) || 'Name must be valid [A-Za-z0-9-_].At least three letters at the beginning'
                ],
                password: null,
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6 && v.length <= 32) || 'Password must be less than 6 characters'
                ],
                repassword: null,
                repasswordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v === this.password) || 'Password must be must by muteched password'
                ],
                valid: true,
            }
        },
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    this.$auth.register({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.repassword,
                        },
                        autoLogin: true,
                        success: function () {
                            console.log('success ' + this.context);
                        },
                        error: function (res) {
                            console.log('error ' + this.context);
                            this.error = res.data;
                        }
                    });
                    /*
                    this.$store.dispatch('auth/registerUser', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.repassword,
                    }).then(() => {
                        this.$router.push('/');
                    }).catch(err => {
                        this.errors = err.response.data.errors;
                    });*/
                }
            },
        }
    }
</script>
