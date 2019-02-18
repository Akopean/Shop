<template>
    <div>
        <div>
            <el-color-picker
                    v-model="primary"
                    class="theme-picker"
                    color-format="rgb"
                    popper-class="theme-picker-dropdown"/> Primary Color
        </div>
        <div>
        <el-color-picker
                v-model="secondary"
                class="theme-picker"
                color-format="rgb"
                popper-class="theme-picker-dropdown"/> Secondary Color
        </div>
        <div>
        <el-color-picker
                v-model="dft"
                class="theme-picker"
                color-format="rgb"
                popper-class="theme-picker-dropdown"/> Default Color
        </div>
    </div>
</template>

<script>
  import settings from '../../settings';
  export default {
    data() {
      return {
        primary: settings.PRIMARY_COLOR,
        secondary: settings.SECONDARY_COLOR,
        dft: settings.DEFAULT_COLOR,
      }
    },
    watch: {
      primary(val) {
        this.$emit('color', {
          primary: this.primary,
          secondary: this.secondary,
          dft: this.dft,
        })
        return val;
      },
      secondary(val) {
        this.$emit('color', {
          primary: this.primary,
          secondary: this.secondary,
          dft: this.dft,
        })
        return val;
      },
      dft(val) {
        this.$emit('color', {
          primary: this.primary,
          secondary: this.secondary,
          dft: this.dft,
        })
        return val;
      }
    },
  }
</script>

<style>
</style>