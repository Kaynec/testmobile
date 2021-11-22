<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions" :style="styles">
    <nav class="sm-nav">
      <div>
        <span class="user-parts"> سوالات برگزیده </span>
      </div>

      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Progress Bar And Count -->

    <div class="progress-count">
      <div class="count">
        <span>
          {{ label }}
        </span>
        <!-- Change This And Width Of The Progress Bar Dynamically -->
        <span> ۵۶ </span>
      </div>
      <div class="progress" style="height: 5px">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          :style="`width: ${50}%`"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <!-- Container for numbers -->
    <div class="container">
      <div class="number" v-for="i in 20" :key="i">
        <span>{{ toPersianNumbers(i) }}</span>
      </div>
    </div>
    <!-- Buttons -->
    <div class="btns">
      <button class="red">صفحه بعدی</button>
      <button class="grey">صفحه قبلی</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    label: { type: String, default: '۱ الی ۲۰' }
  },
  setup() {
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const toPersianNumbers = (number: any) => {
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return number.toString().replace(/[0-9]/g, function (w: any) {
        return id[+w];
      });
    };

    const goOnePageBack = () => router.go(-1);

    return { styles, goOnePageBack, toPersianNumbers };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-questions {
  width: 100%;
  background: #f4f4f4;
  font-family: IRANSans;

  .sm-nav {
    width: 100%;
    background-color: #171717;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem;
    max-height: 8vh;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);

    div {
      img {
        width: 29px;
        height: 28px;
        margin: 0 10px 0 0;
        border-radius: 8px;
        border: solid 2px #ddd;
      }

      span {
        font-size: 11px;
        font-weight: bold;
      }
    }
  }

  .progress-count {
    width: 100%;
    padding: 1rem;
    .count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.5rem;
      color: #171717;

      span {
        &:first-child {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
  //
  .container {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    align-items: center;
    justify-content: center;
    margin: 1rem auto;

    .number {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
      padding: 1rem 1.3rem;
      border-radius: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('../../../assets/img/blur.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      span {
        font-weight: bold;
        font-size: 2.2rem;
      }
    }
  }
  //

  .btns {
    width: 90%;
    margin: 2.5rem auto 0.8rem auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 0.5rem;

    button {
      padding: 0.9rem 1.5rem;
      border-radius: 15px;
      border: none;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }

    .red {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $redish-background;
    }
    .grey {
      background: #d3d7e0;
      color: #646464;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    }
    .green {
      background-color: #3fca60;
      color: white;
    }
  }
}
</style>
