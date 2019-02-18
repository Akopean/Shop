<template>
    <v-toolbar fixed app class="elevation-1" prominent extended extensionHeight='30'>
        <template slot="extension" >
        <v-tags-view></v-tags-view>
        </template>
        <v-toolbar-title class="ml-0">
            <v-icon @click.stop="ToggleSidebar">sort</v-icon>
        </v-toolbar-title>
        <v-breadcrumb :routes=$route.matched divider='>'></v-breadcrumb>
        <v-spacer></v-spacer>
        <v-lang-select class="mr-5"></v-lang-select>
    </v-toolbar>
</template>
<script>
  //import NotificationList from '@/components/widgets/list/NotificationList';
  //import Util from '@/util';
  import LangSelect from '../../partials/LangSelect';
  import Breadcrumb from '../../partials/Breadcrumbs';
  import TagsView from '../../partials/TagsView';

  export default {
    name: 'app-toolbar',
    components: {
      'v-lang-select' : LangSelect,
        'v-breadcrumb' : Breadcrumb,
        'v-tags-view' : TagsView
    },
    data: () => ({
    }),
    methods: {
      ToggleSidebar () {
        this.$store.commit('sidebar/TOGGLE_SIDEBAR')
      },
    }
  };
</script>
