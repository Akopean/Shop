<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center fill-height>
            <v-flex xs12 sm8 md4 lg3>
                <v-card class="elevation-1 pa-3">
                    <v-card-text>
                        <div class="layout column align-center">
                            <h1 class="flex my-4 primary--text">{{ $t("login.login") }}</h1>
                        </div>
                        <v-form ref="form" v-model="valid" lazy-validation>

                            <v-text-field :placeholder="$t('login.email')" :rules="emailRules" append-icon="person"
                                          id="email" name="email"
                                          type="email" v-model="email"></v-text-field>

                            <v-text-field append-icon="lock" :rules="passwordRules" :placeholder="$t('login.password')"
                                          name="password"
                                          id="password"
                                          type="password" v-model="password"></v-text-field>
                            <v-text-field append-icon="lock" :rules="passwordConfirmationRules" :placeholder="$t('login.password')"
                                          name="passwordConfirmation"
                                          id="passwordConfirmation"
                                          type="password" v-model="passwordConfirmation"></v-text-field>
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
                        v-model="snackbar"
                        :top="true"
                        :vertical="true"
                >
                    {{ errorMessage }}
                    <v-btn
                            color="pink"
                            flat
                            @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  props: ['token'],
  data() {
    return {
      snackbar: false,
      errorMessage: '',
      email: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: null,

      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 6 characters',
      ],
      passwordConfirmation: null,
      passwordConfirmationRules: [
        v => !!v || 'Password Confirmed is required',
        v => (v && v.length <= 10) || 'Password Confirmed must be match to Password',
      ],
      valid: true,
    };
  },
  methods: {
    login() {
      console.log(this.token);
      if (this.$refs.form.validate()) {
        axios.post('auth/reset', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          token: this.token,
        });
      }
    },
  },
};
</script>
