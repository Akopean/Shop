<template id="breadcrumb">
    <ul class="v-breadcrumbs theme--light">
        <template v-for="(route, key) in routes">
            <slot name="item" v-if="route.meta.breadcrumbs && !route.meta.breadcrumbs.bcDynamic">
                <li :key=key>
                    <router-link :to="{name: route.name ? route.name : 'Dashboard'}"
                                 class="v-breadcrumbs__item"
                    >
                        {{route.meta.breadcrumbs.bcLinkText}}
                    </router-link>
                </li>
                <li :key=dividerKey(key) class="v-breadcrumbs__divider" v-if="key < routes.length-1">{{ divider
                    }}
                </li>
            </slot>
        </template>
    </ul>
</template>

<script>
    export default {
        props: ['routes', 'divider'],
        methods: {
            dividerKey: (key) => {
                return `${key}_divider`;
            }
        }
    }
</script>
