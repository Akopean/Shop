<template>
    <b-dropdown variant="default" :text="language.toUpperCase()" right>
        <b-dropdown-item v-for="(value, key) in options"
                         :key="key"
                         :disabled="language === key"
                         :value="key"
                         @click="lang = key">
            {{key}}
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      options: {
        en: 'English',
        ru: 'Russia',
      },
    };
  },
  computed: {
    ...mapGetters([
      'language',
    ]),
    lang: {
      get() {
        return this.language;
      },
      set(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch('setLanguage', lang);
      },
    },
  },
};
</script>

<style scss>
    .dropdown-menu {
        min-width: 1rem;
    }
</style>
