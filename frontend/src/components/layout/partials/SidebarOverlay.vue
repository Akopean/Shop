<template>
    <span :class="[open ? 'sidebar-overlay-active' : '', 'sidebar-overlay']" @click="handleClick">
    </span>
</template>
<script>
export default {
  name: 'sidebar-overlay',
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

<style>
    .sidebar-overlay {
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        background: #000;
        z-index: 50;
        transition: all .3s cubic-bezier(.55, 0, .1, 1);
        -ms-transform: translateZ(0);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
    @media screen and (max-width: 1024px) {
        .sidebar-overlay.sidebar-overlay-active {
            opacity: .5;
            visibility: visible;
            transition-delay: 0s;
        }
    }
</style>
