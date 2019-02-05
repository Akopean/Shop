<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="name"
                            v-validate="'required|min:3|max:100'"
                            data-vv-name="name"
                            :error-messages="vErrors.collect('name')"
                            label="Name"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="email"
                            v-validate="'required|email|max:100'"
                            :error-messages="vErrors.collect('email')"
                            data-vv-name="email"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <v-btn
                            :disabled="!valid"
                            @click="submit"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    data() {
      return {
        name: '',
        email: '',
        valid: true,
        errors: null
      }
    },
    computed: {
      ...mapState({
        customer: state => state.customers.customer,
      }),
    },
    props: ['id'],
    created () {
      if (!this.id) return
      this.$store.dispatch('customers/fetchedCustomer', this.id).then(() => {
        this.name = this.customer.name
        this.email = this.customer.email
      }).catch(err => {
        this.errors = err.response.data.errors
        flash(err.response.data.errors, 'danger')
      });
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            this.valid = false;
          } else {
            if (this.id) {
              this.$store.dispatch('customers/updateCustomer', {
                id: this.id,
                body: {
                  name: this.name,
                  email: this.email,
                }
              }).then(() => {
                this.$router.push('/customers')
              }).catch(err => {
                this.errors = err.response.data.errors
                flash(err.response.data.errors, 'danger')
              });
            } else {
              this.$store.dispatch('customers/createCustomer', {
                name: this.name,
                email: this.email,
              }).then(() => {
                this.$router.push('/customers')
              }).catch(err => {
                this.errors = err.response.data.errors
                flash(err.response.data.errors, 'danger')
              });
            }
          }
        });
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
