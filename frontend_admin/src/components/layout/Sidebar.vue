<template>
    <!-- Main Sidebar Container -->
    <v-navigation-drawer app class="sidebar_body" fixed v-model="open" width="260">
        <v-toolbar color="sidebar_header" dark>
            <v-toolbar-title class="ml-0 pl-3">
                <span class="hidden-sm-and-down">Vue Material</span>
            </v-toolbar-title>
        </v-toolbar>
        <vue-perfect-scrollbar :settings="scrollSettings">
            <v-list dark dense expand>
                <template v-for="(item, i) in menus">
                    <!--group with subitems-->
                    <v-list-group :group="item.group" :key="item.name" :prepend-icon="item.icon" no-action
                                  v-if="item.items">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <template v-for="(subItem, i) in item.items">
                            <!--sub group-->
                            <v-list-group :group="subItem.group" :key="subItem.name" sub-group="sub-group"
                                          v-if="subItem.items">
                                <v-list-tile ripple="ripple" slot="activator">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :href="grand.href" :key="i"
                                             :to="genChildTarget(item, grand)" ripple="ripple"
                                             v-for="(grand, i) in subItem.children">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                            <!--child item-->
                            <v-list-tile :disabled="subItem.disabled" :href="subItem.href" :key="i"
                                         :target="subItem.target"
                                         :to="genChildTarget(item, subItem)" ripple="ripple" v-else>
                                <v-list-tile-content>
                                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action v-if="subItem.action">
                                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}
                                    </v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                    <v-list-tile :disabled="item.disabled" :href="item.href" :key="item.name" :target="item.target"
                                 :to="!item.href ? { name: item.name } : null" rel="noopener" ripple="ripple" v-else>
                        <v-list-tile-action v-if="item.icon">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action v-if="item.subAction">
                            <v-icon class="success--text">{{ item.subAction }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title><span>Logout</span></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </vue-perfect-scrollbar>
    </v-navigation-drawer>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import menus from '../../api/menu';

    export default {
        name: 'sidebar',
        data: () => ({
            scrollSettings: {
                maxScrollbarLength: 160
            }
        }),
        components: {
            VuePerfectScrollbar,
        },
        computed: {
            menus() {
                return menus.items;
            },
            open: {
                get: function () {
                    return this.$store.state.sidebar.sidebarStatus;
                },
                set: function (newValue) {
                }
            }
        }
        ,
        methods: {
            genChildTarget(item, subItem) {
                if (subItem.href) return;
                if (subItem.component) {
                    return {
                        name: subItem.component,
                    };
                }
                return {name: `${item.group}/${(subItem.name)}`};
            },
            logout() {
                console.log(this.$auth.token());
                this.$auth.logout({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        token: this.$auth.token(),
                    },
                    redirect: 'login',
                    success() {
                        this.$store.commit('auth/LOGOUT_USER');
                    },
                });
            }
        }
    }
</script>
<style scoped>
    .sidebar_body {
        background-color: #2E363E !important;
    }
</style>
