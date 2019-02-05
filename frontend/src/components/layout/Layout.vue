<template>
    <div id="app-wrapper">
        <div class="main-content">
            <router-view></router-view>
        </div>
        <footer></footer>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      showLoader: true,
    };
  },
  created() {
  },
  components: {},
  computed: {
    ...mapGetters({}),
  },
  watch: {},
};
</script>
