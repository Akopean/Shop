import Product from '../views/Products/Product.vue'
import ProductList from '../views/Products/ProductList.vue'

export default [
    {
        path: '/products',
        component: ProductList,
        name: 'Products',
        meta: {
            tagView: true,
            breadcrumbs: {
                bcDynamic: false,
                //bcGetter: 'activeUser', // <breadcrumb> will use this getter to get the user from vuex
                bcLinkText: 'Products', //user =>  user.name, // once we have the user, we use this function to format the LinkText dnynamically,
                //bcLoadingText: 'Loading Username...' // This will be shown while Data is loading
            }
        }
    },
    {
        path: '/products/new',
        component: Product,
        name: 'New Product',
        meta: {
            breadcrumbs: {
                bcDynamic: false,
                //bcGetter: 'activeUser', // <breadcrumb> will use this getter to get the user from vuex
                bcLinkText: 'New Product', //user =>  user.name, // once we have the user, we use this function to format the LinkText dnynamically,
                //bcLoadingText: 'Loading Username...' // This will be shown while Data is loading
            }
        }
    },
    {
        path: '/products/:slug',
        component: Product,
        props: true,
        name: 'editProduct',
        meta: {
            breadcrumbs: {
                bcDynamic: false,
                bcGetter: 'products/productModel',
                bcLinkText: 'Edit Product',//product => console.log(product), // once we have the user, we use this function to format the LinkText dnynamically,
                bcLoadingText: 'Loading Name...' // This will be shown while Data is loading
            }
        }
    }
];
