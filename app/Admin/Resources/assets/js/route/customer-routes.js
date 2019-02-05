import Customer from "../views/Customers/Customer.vue";
import CustomerList from "../views/Customers/CustomerList.vue";

export default [
    {
        path: '/customers',
        component: CustomerList,
        name: 'Customers',
    },
    {
        path: '/customers/new',
        component: Customer,
    },
    {
        path: '/customers/:id',
        component: Customer,
        props: true,
    }
];
