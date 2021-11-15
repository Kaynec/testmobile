<template>
  <div class="container">
    <div
      class="
        card
        w-100
        d-inline-flex
        align-items-center
        m-1
        position-relative
        flex-row flex-wrap
        border border-white
        rounded-10
        customDiv
        warning
      "
      v-for="item in data"
      v-bind:key="item"
    >
      <div class="d-flex flex-column mt-1 p-0 m-0">
        <span class="label text-dark text-right mb-2 text-bold">
          {{ !item.passed ? 'تعداد آزمون' : 'رتبه شما' }} : {{ item.count }}
        </span>
        <span class="text-detail text-right">
          <i class="far fa-clock"></i>
          {{ item.detail }}
          <strong> | </strong>
          {{
            item.passed
              ? `ساعت ${item.timeLeft}`
              : `${item.timeLeft} تا شروع آزمون`
          }}
        </span>
      </div>
      <div class="img position-absolute top-50 start-0 ml-5 translate-middle">
        <img
          src="../../../assets/img/finish.png"
          @click="changeShowDetail"
          v-if="item.passed"
          alt="active"
        />
      </div>
      <img
        src="../../../assets/img/shape.svg"
        class="position-absolute top-50 start-0 translate-middle ml-3"
        alt="angle left icon"
      />
    </div>
    <!--  -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const data = [
      {
        count: '33',
        detail: ' پنجشنبه بیست آبان ',
        timeLeft: '۱۵:۳۰',
        passed: true
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴'
      },
      {
        count: '33',
        detail: ' پنجشنبه بیست آبان ',
        timeLeft: '۱۵:۳۰',
        passed: true
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴',
        passed: false
      }
    ];
    // Emit A Response to parent on click To Show A Detail component
    const changeShowDetail = () => emit('convertBoolean');
    return { data, changeShowDetail };
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  font-family: IRANSans;

  .img {
    width: 27px;
    height: 27px;
    padding: 7px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      object-fit: contain;
    }
  }

  .fa-angle-left {
    color: black !important;
  }
  .label {
    font-size: 13px;
    font-weight: bold;
  }
  .text-detail {
    margin: 0 5px 0 0;
    font-size: 11px;
    color: #313131;

    strong {
      margin-inline: 0.4rem;
    }
  }
}
.customDiv {
  position: relative;
  z-index: 1;
  padding: 0.6rem;

  &:last-child {
    margin-bottom: 4rem !important;
  }
}
</style>
