<template>
  <div class="st-wrapper" :style="getMainStyle()">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Main extends Vue {
  public data(): any {
    return {
      windowHeight: window.innerHeight
    };
  }

  onResize(): void {
    (this as any).windowHeight = window.innerHeight;
  }

  getMainStyle(): { height: string } {
    return { height: `${(this as any).windowHeight - 1}px` };
  }
}
</script>
<style lang="scss">
.st-wrapper {
  width: 100%;
  height: 100%;
}
</style>
