<template>
  <div
    class="message flex-column d-flex justify-content-center align-items-center"
  >
    <div class="card">
      <h5>پیام ارسالی از {{ sender }}</h5>
      <p>
        {{ textBody }}
      </p>
      <button @touchstart="touchstart">خواندم!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // Change The Body And Sender To Real Ones
  props: {
    sender: { type: String, default: 'ماهان' },
    textBody: {
      type: String,
      default: `افتخارات سازمان ما به این نیست که 21 سال پیاپی بیشترین تعداد رتبه های تک رقمی را در بین مرکز تحصیلات تکمیلی داشته اند. بلکه مفتخریم که با تکنولوژی آموزش آموزش مدرن را به هر شکلی و در هر مقطعی به فرخور نیاز مخاطبین مان تولید کرده ایم. در نظام آموزشی هدفمند گلوگاه های ارتباطی بین فعالیت های آموزشی ( آموزش، مشاوره و هدایت تحصیلی، سنجش) به بهترین شکل ممکن شناسایی شده و با راه کارهای عملی و موثر، آنها را به هم پیوند زده ایم.`
    }
  },
  setup(_, { emit }) {
    const touchstart = () => {
      setTimeout(() => {
        emit('convertBoolean');
      }, 150);
    };

    return { touchstart };
  }
});
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;

  .card {
    width: 80%;
    margin: 0 auto;
    padding: 2rem 2.25rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.97);
    font-family: IRANSans;

    h5 {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #171717;
    }
    p {
      font-size: 12px;
      line-height: 2.17;
      letter-spacing: normal;
      text-align: center;
      color: #171717;
      margin: 1.5rem 0;
    }

    button {
      border-radius: 15px;
      background-color: #d3d7e0;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #646464;
      border: none;
      padding: 15px 5px;
    }
  }
}
</style>
