<template>
  <div
    @touchstart="changeShowContent"
    :class="`${showContent ? 'active details' : 'details'}`"
  >
    <div class="label">
      <span v-for="item in label" :key="item">
        {{ item.text }}
      </span>
      <!-- Arrow Up or Down -->
      <i
        :class="`${
          showContent ? 'fas fa-sort-up arrow' : 'fas fa-sort-down arrow'
        }`"
      ></i>
    </div>

    <div class="content" v-if="showContent">
      <p v-for="item in content" :key="item">
        <i class="fas fa-check img"></i>
        {{ item.text }}
      </p>
    </div>
  </div>
  <!-- IMG -->

  <!-- IMG -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    label: { type: Array },
    content: { type: Array }
  },
  setup() {
    const showContent = ref(false);
    const changeShowContent = () => (showContent.value = !showContent.value);

    return { showContent, changeShowContent };
  }
});
</script>

<style lang="scss" scoped>
.details {
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  color: #646464;

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    padding-left: 2.5rem;
    border-radius: 4px;
    position: relative;

    .arrow {
      position: absolute;
      left: 0;
      margin-left: 0.5rem;
      top: 30%;
    }

    span {
      font-size: 10px;
    }
  }

  .content {
    line-height: 2;
    text-align: right;
    padding: 12px 10px;
    p {
      margin: 0;
      font-size: 10px;
      line-height: 1.9;
      color: #000;
      .img {
        color: #fff;
        background-color: #4ac367;
        border-radius: 50px;
        padding: 3px;
      }
    }
  }
}
.active {
  color: #fff;

  .label {
    background-color: #d21921;
  }
}
</style>
