<template>
    <v-form lazy-validation ref="form" v-model="valid">
        <v-layout row wrap>
            <v-flex class="px-4" lg8 md8 xl8>
                <v-text-field
                    :error-messages="vErrors.collect('model')"
                    data-vv-name="model"
                    required
                    v-bind:label="$t('products.model')"
                    v-model="model"
                    v-validate="'required|min:3|max:100'"
                ></v-text-field>
                <v-text-field
                    :error-messages="vErrors.collect('slug')"
                    data-vv-name="slug"
                    required
                    v-bind:label="$t('products.slug')"
                    v-if="slug"
                    v-model="newSlug"
                    v-validate="'required|min:3|max:100'"
                ></v-text-field>
                <v-text-field
                    :error-messages="vErrors.collect('price')"
                    data-vv-name="price"
                    required
                    v-bind:label="$t('products.price')"
                    v-model="price"
                    v-validate="'required|currency|max:100'"
                ></v-text-field>
                <label aria-hidden="true" class="v-label theme--light">Description</label>
                <vue-editor
                    :editorToolbar="customToolbar"
                    v-model="description"
                ></vue-editor>
            </v-flex>
            <!-- /.md8 -->
            <v-flex class="px-4 elevation-1" lg4 md4 xl4>
                <v-select
                    :error-messages="vErrors.collect('status')"
                    :items="statusItems"
                    data-vv-name="status"
                    required
                    v-bind:label="$t('products.status')"
                    v-model="status"
                    v-validate="'required'"
                ></v-select>
            </v-flex>
            <v-btn :disabled="!valid" @click="submit" class="mt-5 success">
                {{ $t('forms.submit') }}
            </v-btn>
            <v-btn @click="clear" class="mt-5 warning">{{ $t('forms.clear') }}</v-btn>
        </v-layout>
        <!-- /.row -->
    </v-form>
</template>

<script>
    import {Quill, VueEditor} from "vue2-editor";
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                id: null,
                model: '',
                newSlug: '',
                price: '',
                status: 'Draft',
                statusItems: ['Published', 'Pending', 'Draft'],
                description: '',
                customToolbar: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                    [{'direction': 'rtl'}],                         // text direction
                    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                    [{'font': []}],
                    [{'align': []}],
                    ['clean']

                ],
                valid: true,
                errors: null
            };
        },
        components: {
            VueEditor
        },
        computed: {
            ...mapState({
                product: state => state.products.product,
            }),
        },
        props: ['slug'],
        created() {
            if (!this.slug) return;
            this.$store.dispatch('products/fetchedProduct', this.slug).then(() => {
                this.model = this.product.attributes.model;
                this.price = this.product.attributes.price;
                this.newSlug = this.product.attributes.slug;
                this.id = this.product.id;
            }).catch(err => {
                this.errors = err.response.data.errors;
                flash(err.response.data.errors, 'danger');
            });
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(result => {
                    if (!result) {
                        this.valid = false;
                    } else {
                        if (this.slug) {
                            this.$store.dispatch('products/updateProduct', {
                                id: this.id,
                                body: {
                                    model: this.model,
                                    price: this.price,
                                    status: this.status,
                                    slug: this.newSlug,
                                    description: this.description,
                                }
                            }).then(() => {
                                this.$router.push('/products');
                            }).catch(err => {
                                this.errors = err.response.data.errors;
                                flash(err.response.data.errors, 'danger');
                            });
                        } else {
                            this.$store.dispatch('products/createProduct', {
                                model: this.model,
                                price: this.price,
                                status: this.status,
                                description: this.description,
                            }).then(() => {
                                this.$router.push('/products');
                            }).catch(err => {
                                this.errors = err.response.data.errors;
                                flash(err.response.data.errors, 'danger');
                            });
                        }
                    }
                });
            },
            clear() {
                this.$refs.form.reset();
            }
        }
    };
</script>
