<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="history" v-else :style="styles">
    <MinimalHeader title="سوابق خرید " />
    <!--  -->
    <div class="container">
      <div class="container-header">
        <span>کد پیگیری</span>
        <span>مبلغ خرید</span>
        <span>تاریخ</span>
      </div>
      <TableChild
        v-for="item in data"
        :key="item"
        :data="JSON.stringify(item)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { StudentBasketApi } from '@/api/services/student/student-basket-service';
import TableChild from '@/modules/student-modules/table-child.vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import router from '@/router';

export default defineComponent({
  components: { TableChild, MinimalHeader },
  setup() {
    let historyData = ref();
    // StudentBasketApi.HistoryOfBoughtProducts().then(
    //   (res) => (historyData.value = res.data.data)
    // );
    const goOnePageBack = () => router.go(-1);
    let data = reactive({} as any);

    StudentBasketApi.HistoryOfBoughtProducts().then(
      (res) => (data = reactive(res.data.data))
    );

    return { data, goOnePageBack, historyData };
  }
});
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  height: 100%;
  position: relative;
  padding-top: 8vh;
  .container {
    width: 90%;
    margin: 1rem auto;

    .container-header {
      background-color: #ddd;
      width: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      padding-left: 2.5rem;
      span {
        font-size: 10px;
        font-weight: bold;
        color: #000;
      }
    }
    //
  }
}
</style>
