<template>
  <nav class="nav">
    <span> {{ title }} </span>
    <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    title: { type: String }
  },
  setup() {
    const goOnePageBack = () => router.go(-1);

    return { goOnePageBack };
  }
});
</script>
