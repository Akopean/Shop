<template>
    <div id="appRoot">
        <!--<flash></flash>-->
        <app-toolbar/>
        <v-sidebar/>
        <v-content>
            <v-container fluid>
                <fade-transition origin="center" mode="out-in" :duration="250">
                    <router-view></router-view>
                </fade-transition>
            </v-container>
        </v-content>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import AppToolbar from '../../components/layout/AppToolbar';
  //import Flash from '../../components/Flash';
  import Sidebar from './Sidebar.vue';
  import { FadeTransition } from 'vue2-transitions';
  //import Vue  from "vue";

  export default {
    data() {
      return {}
    },
    created () {
      // Register Flash  events
    /* window.events = new Vue();
      window.flash = (message, level = 'success') => {
        window.events.$emit('flash', {message, level})
      }*/
    },
    components: {
      'v-sidebar': Sidebar,
      //'v-footer': Footer,
      FadeTransition,
      AppToolbar,
     // Flash
    },
    computed: {
      ...mapGetters({}),
    },
    methods: {}
  }
</script>
