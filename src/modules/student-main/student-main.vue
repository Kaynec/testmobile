<template>
  <div class="st-wrapper">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Main extends Vue {}
</script>
<style lang="scss"></style>
