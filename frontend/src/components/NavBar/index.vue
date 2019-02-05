<template>
    <nav class="navbar pmd-z-depth guideline-header">
        <div class="container-fluid">
            <div class="navbar-header">
                <sidebar-toggle/>
            </div>
            <div class="container-fluid d-flex justify-content-end">
                <div class="row">
                    <div class="col">
                        <router-link to="dashboard">Dash</router-link>
                        <router-link to="log">Log</router-link>
                        <LangSelect></LangSelect>
                        <UserInfo></UserInfo>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import SidebarToggle from './partials/SidebarToggle.vue';
import LangSelect from './partials/LangSelect.vue';
import UserInfo from './partials/UserInfo.vue';

export default {
  components: {
    SidebarToggle,
    LangSelect,
    UserInfo,
  },
};
</script>
<style>
    .navbar {
        padding: 0;
        min-height: 60px;
    }
    .guideline-header .navbar-header {
        display: none;
    }
    @media (max-width: 1200px) {
        .guideline-header .navbar-header {
            display: block !important;
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 20;
        }
    }
    @media screen and (min-width: 1025px) {
        .navbar {
            margin-left: 280px;
        }
        .tgl-sidebar {
            display: none;
        }
    }
</style>
