<template>
    <b-dropdown variant="default" text="User">
        <b-dropdown-item>
            Profile
        </b-dropdown-item>
        <b-dropdown-item v-if="$auth.check()" href="javascript:void(0);" v-on:click="logout()">
            Logout
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      logout() {
        this.$auth.logout({
          makeRequest: false,
          redirect: 'login'
        });
      },
    }
  }
</script>

<style scss>

</style>