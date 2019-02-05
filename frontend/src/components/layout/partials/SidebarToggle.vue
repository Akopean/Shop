<template>
    <a @click="handleClick" data-target="docs-sidebar" data-placement="left" data-position="slidepush" is-open="true" is-open-width="1200" class="btn btn-sm btn-default">
        <i class="material-icons" >menu</i>
    </a>
</template>
<script>
export default {
  name: 'sidebar-toggle',
  computed: {
    open() {
      return this.$store.state.sidebar.sidebarOpen;
    },
  },
  methods: {
    handleClick() {
      this.$store.dispatch('toggleSidebar');
    },
  },
};
</script>
<style lang="scss">

</style>
