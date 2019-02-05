<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <v-card>
                    <v-card-title>
                        <h3 class="headline mb-0">
                            Customers
                        </h3>
                        <router-link to="/customers/new" class="v-btn mb-2 ml-3 primary">New Customer</router-link>
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="customers"
                            :pagination.sync="pagination"
                            :rows-per-page-items="rowPerPageItems"
                            :loading="loading"
                            :total-items="total"
                            class="elevation-1"
                    >
                        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-right">{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.email }}</td>
                            <td class="text-xs-right">{{ props.item.role }}</td>
                            <td class="text-xs-right">{{ props.item.created_at }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="$router.push('/customers/' + props.item.id)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                        small
                                        @click="deleteCustomer(props.item)"
                                >
                                    delete
                                </v-icon>
                            </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                    </v-data-table>
                </v-card>
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import axios from 'axios';
  export default {
    data() {
      return {
        search: '',
        loading: true,
        pagination: {},
        rowPerPageItems: [15],
        categories: [],
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          {text: 'Name', value: 'name'},
          {text: 'Email', value: 'email'},
          {text: 'Role', value: 'role'},
          {text: 'Created_at', value: 'created_at'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
      }
    },
    created () {
      //this.$store.dispatch('customers/fetchedCustomers', {page: this.pagination.page}).finally(() => this.loading = false);
    },
    computed: {
      pages () {
        if (!this.pagination || this.pagination.rowsPerPage === null || this.pagination.totalItems === null)
          return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      ...mapState({
        customers: state => state.customers.all,
        total: state => state.customers.total
      }),
    },
    watch: {
      search() {
        this.getCategoriesByPagination();
      },
      pagination() {
        this.getCategoriesByPagination();
      },
      customers: function () {
        return this.customers;
      }
    },
    methods: {
      getCategoriesByPagination() {
        this.loading = true;
        if (this.search) {
          this.$store.dispatch(
            'customers/searchCustomers',
            {
              search: this.search,
              page: this.pagination.page,
              rowsPerPage: this.pagination.rowsPerPage
            }
          );
        }
        if (this.pagination.sortBy && !this.search) {
          this.$store.dispatch(
            'customers/orderCustomers',
            {
              sortBy: this.pagination.sortBy,
              page: this.pagination.page,
              direction: this.pagination.descending ? 'desc' : 'asc'
            }
          );
        }
        if (!this.search && !this.pagination.sortBy) {
          this.$store.dispatch(
            'customers/fetchedCustomers',
            {
              page: this.pagination.page,
            }
          );
        }
        this.loading = false
      },
      deleteCustomer (item) {
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch('customers/deleteCustomer', item.id);
      },
    },
  }
  /*
   <template slot="headers" slot-scope="props">
   <tr>
   <th
   v-for="header in props.headers"
   :key="header.text"
   :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
   @click="changeSort(header.value)"
   >
   <v-icon small>arrow_upward</v-icon>
   {{ header.text }}
   </th>
   </tr>
   </template>
   changeSort (column) {
   if (this.pagination.sortBy === column) {
   this.pagination.descending = !this.pagination.descending;
   } else {
   this.pagination.sortBy = column;
   this.pagination.descending = false;
   }
   },*/
</script>

<style>
</style>

