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
          تعداد آزمون : {{ item.count }}
        </span>
        <span class="text-detail text-right">
          <i class="far fa-clock"></i>
          {{ item.detail }}
          <strong> | </strong>
          {{ item.timeLeft }} تا شروع آزمون
        </span>
      </div>
      <div
        v-if="item.passed"
        class="img position-absolute top-50 start-0 ml-5 translate-middle"
      >
        <img
          src="../../../assets/img/azmoon-icons/accept-path-light.png"
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
  setup() {
    const data = [
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴',
        passed: true
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴'
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴',
        passed: true
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴',
        passed: false
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴'
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴'
      },
      {
        count: '10',
        detail: ' لحظاتی دیگر ',
        timeLeft: '۰۰:۲۴'
      }
    ];
    return { data };
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
    background-color: #4ac367;
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
// .card.danger {
//   .text-detail {
//     color: #d26c34;
//     strong {
//       margin-inline: 0.4rem;
//     }
//     i {
//       background-color: transparent;
//       color: #d26c34;
//       font-size: 14px;
//     }
//   }
// }

// .card.warning {
//   .text-detail {
//     color: #d21921;
//     strong {
//       margin-inline: 0.4rem;
//     }
//     i {
//       color: #d21921;
//       font-size: 14px;
//     }
//   }
// }
</style>
