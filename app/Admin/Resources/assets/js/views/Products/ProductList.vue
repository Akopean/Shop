<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <v-card>
                    <v-card-title>
                        <h3 class="headline mb-0">
                            Users
                        </h3>
                        <router-link class="v-btn mb-2 ml-3 primary" to="/products/new">New Product</router-link>
                        <v-spacer></v-spacer>
                        <v-text-field
                            append-icon="search"
                            hide-details
                            label="Search"
                            single-line
                            v-model="search"
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="products"
                        :loading="loading"
                        :pagination.sync="pagination"
                        :rows-per-page-items="rowPerPageItems"
                        :total-items="total"
                        class="elevation-1"
                    >
                        <v-progress-linear color="blue" indeterminate slot="progress"></v-progress-linear>
                        <template slot="items" slot-scope="props">
                            <tr :active="props.selected" @click="props.selected = !props.selected" :class="'color--'+props.item.attributes.status | toLowerCase">
                                <td>{{ props.item.id }}</td>
                                <td class="text-xs-right">{{ props.item.attributes.model }}</td>
                                <td class="text-xs-right ">{{ props.item.attributes.price }}</td>
                                <td class="text-xs-right">{{ props.item.attributes.status }}</td>
                                <td class="text-xs-right">{{ props.item.attributes.created.date | moment("YYYY:MM:DD") }}
                                </td>
                                <td class="justify-center layout px-0">
                                    <v-icon
                                        @click="$router.push('/products/' + props.item.slug)"
                                        class="mr-2"
                                        small
                                    >
                                        edit
                                    </v-icon>
                                    <v-icon
                                        @click="deleteUser(props.item)"
                                        small
                                    >
                                        delete
                                    </v-icon>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                search: '',
                loading: true,
                pagination: {
                    sortBy: 'created_at',
                    descending: true,
                },
                rowPerPageItems: [15],
                categories: [],
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        sortable: false,
                        value: 'id'
                    },
                    {text: 'Model', value: 'model'},
                    {text: 'Price', value: 'price'},
                    {text: 'Status', value: 'status'},
                    {text: 'Created_at', value: 'created_at'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
            };
        },
        created() {
            //this.$store.dispatch('users/fetchedUsers', {page: this.pagination.page}).finally(() => this.loading = false);
        },
        computed: {
            pages() {
                if (!this.pagination || this.pagination.rowsPerPage === null || this.pagination.totalItems === null)
                    return 0;
                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
            },
            ...mapState({
                products: state => state.products.all,
                total: state => state.products.total
            }),
        },
        watch: {
            search() {
                this.getCategoriesByPagination();
            },
            pagination() {
                this.getCategoriesByPagination();
            },
            users: function () {
                return this.users;
            }
        },
        filters: {
            toLowerCase: (value) => {
                if (!value) return '';
                return value.toString().toLowerCase().trim();
            }
        },
        methods: {
            getCategoriesByPagination() {
                this.loading = true;
                if (this.search) {
                    this.$store.dispatch(
                        'products/searchProducts',
                        {
                            search: this.search,
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage
                        }
                    );
                } else {
                    this.$store.dispatch(
                        'products/fetchedProducts',
                        {
                            orderBy: this.pagination.sortBy ? this.pagination.sortBy : 'created_at',
                            page: this.pagination.page,
                            sortedBy: this.pagination.descending ? 'desc' : 'asc'
                        }
                    );
                }
                this.loading = false;
            },
            deleteUser(item) {
                confirm('Are you sure you want to delete this item?') && this.$store.dispatch('products/deleteProduct', item.id);
            },
        },
    };
</script>

<style>
    .color--pending{
        border-left: 5px solid #5bb4ff;
    }
    .color--published {
        border-left: 5px solid #1ba81c;
    }
   .color--draft{
       border-left: 5px solid #ff8409;
   }
</style>
