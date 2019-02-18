<template>
    <v-snackbar
            v-model="snackbar"
            :multi-line="true"
            :color="color"
            :top="true"
    >
        {{ text }}
        <v-btn
                color="pink"
                flat
                @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        text: '',
        color: "success"
      }
    },
    methods: {
      onFlash(data){
        this.text = data.message;
        this.snackbar = true;
        this.color = data.level;
      }
    },
    created() {
      window.events.$on('flash', this.onFlash);
    },
    beforeDestroy(){
      window.events.$off('flash', this.onFlash);
    }
  };
</script>