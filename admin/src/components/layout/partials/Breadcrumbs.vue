<template id="breadcrumb">
    <ul class="v-breadcrumbs theme--light">
        <template v-for="(route, index) in routes" v-if="route.meta.breadcrumbs">
            <slot name="item">
                <li>
                    <router-link :to="{name: route.name ? route.name : 'Dashboard'}"
                                 class="v-breadcrumbs__item"
                                 v-if="!route.meta.breadcrumbs.bcDynamic">
                        {{route.meta.breadcrumbs.bcLinkText}}
                    </router-link>
                </li>
                <li class="v-breadcrumbs__divider" v-if="index < routes.length-1">{{ divider }}</li>
            </slot>
        </template>
    </ul>
</template>

<script>
    export default {
        props: ['routes', 'divider'],
    }
</script>
