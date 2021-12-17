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
<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  background-color: #171717;
  color: white;
  padding: 0.8rem;
  position: fixed; /* Set the navbar to fixed position */
  top: 0;

  img {
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 11px;
    font-weight: bold;
    padding: 0.4rem;
  }
}
</style>
