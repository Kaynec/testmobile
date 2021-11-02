<template>
  <div
    class="
      card
      w-100
      d-inline-flex
      p-2
      m-1
      position-relative
      flex-row flex-wrap
      border border-white
      rounded-10
      customDiv
    "
  >
    <img
      v-if="iconSrc != 'noImage'"
      :src="getImgUrl(iconSrc)"
      class="card-img"
      alt="exam Icon"
    />
    <i v-else class="fas fa-user-edit card-icon"></i>
    <div class="d-flex flex-column mt-1 p-0 m-0">
      <span class="label text-dark text-right mb-1"> {{ label }} </span>
      <span class="text-detail text-dark text-right">
        {{ TextDetail }}
      </span>
    </div>
    <img
      src="../../../assets/img/shape-copy-5.png"
      alt="arrow icon"
      class="w-4 h-4 position-absolute top-50 start-0 translate-middle ml-3"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    iconSrc: { type: String },
    label: { type: String },
    TextDetail: { type: String }
  },
  setup() {
    const getImgUrl = (src) => {
      return require('../../../assets/img/Studentsetting/' + src + '.png');
    };
    return { getImgUrl };
  }
});
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  .label {
    font-family: IRANSans;
    font-size: 14px;
    font-weight: 500;
  }
  .text-detail {
    font-family: IRANSans;
    font-size: 12px;
  }
  .card-img {
    width: 29px;
    height: 29px;
    margin: 8px 0 4px 11.4px;
    object-fit: contain;
  }
  .card-icon {
    color: #c73f44d3;
    margin: 8px 0 4px 11.4px;
    font-size: 1.4rem;
  }
}
.customDiv {
  &:last-child {
    margin-bottom: 3.7rem !important;
  }
}
</style>
