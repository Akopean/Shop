<template>
    <v-menu offset-y>
        <v-icon slot="activator" color="primary">language</v-icon>
        <v-list>
            <v-list-tile
                    v-for="(item, index) in items"
                    :key="index"
                    @click="lang = item.short"
            >
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>

</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        options: [
          {
            short: "en",
            text: "English",
          },
          {
            short: "ru",
            text: "Russia"
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        language: 'lang/language'
      }),
      items: function() {

          return this.options.filter(item => this.lang !== item.short)
      },
      lang: {
        get() {
          return this.language;
        },
        set(lang) {
          this.$i18n.locale = lang;
          this.$store.dispatch('lang/setLanguage', lang);
        }
      },
    },
  }
</script>

<style scss>
    .dropdown-menu {
        min-width: 1rem;
    }

    .dropdown-item.disabled {
        cursor: default;
        color: #bbb;
        pointer-events: none;
    }
</style>
