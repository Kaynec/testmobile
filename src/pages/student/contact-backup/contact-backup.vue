<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="contact-backup" :style="styles" v-else>
    <SmallHeader />
    <!-- Change THis With Real Data Coming From Some Server-->
    <div class="flex">
      <div class="card" v-for="item in data" :key="item._id">
        <img
          src="../../../assets/img/contact/PictureOfFirstGuy.png"
          alt="Picture of a supporot person"
          class="person-img"
          @click="
            MoveToBackUpInfo(
              `${item.firstname} ${item.lastname}`,
              'PictureOfFirstGuy'
            )
          "
        />

        <div class="child-flex">
          <div>
            <h5>پشتیبان {{ item.firstname }} {{ item.lastname }}</h5>
            <h6>مشاوره تحصیلی</h6>
          </div>
          <div>
            <img
              src="../../../assets/img/contact/Chaticon.png"
              alt="chat icon"
              @click="goToChatPage"
            />
            <img
              src="../../../assets/img/contact/info.png"
              alt="info icon"
              @click="goToChatPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import { StudentSupportApi } from '@/api/services/student/student-support-service';
import router from '@/router';

export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    let data = ref();
    StudentSupportApi.getAll().then((res) => (data.value = res.data.data));

    const MoveToBackUpInfo = (
      name: string,
      img: string,
      profession: string
    ) => {
      router.push({
        name: 'ContactBackupInfo',
        params: { name, img, profession }
      });
    };

    const goToChatPage = () => router.push({ name: 'ContactBackupChat' });
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });
    return { MoveToBackUpInfo, styles, goToChatPage, data };
  }
});
</script>

<style lang="scss" scoped>
.contact-backup {
  position: relative;
  background-color: #f4f4f4;
  overflow-x: hidden;
  .flex {
    margin: 0.5rem;

    .card {
      font-family: IRANSans;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 35px;
      border-bottom-right-radius: 35px;
      padding-bottom: 0.4rem;

      .child-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;

        img {
          border-radius: 15px;
        }

        h5 {
          font-size: 0.875rem;
          margin: 0.75rem 0.4rem;
          font-weight: bold;
        }
        h6 {
          font-size: 0.725rem;
          margin: 0.5rem;
        }
      }
      .person-img {
        width: 100%;
        object-fit: contain;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>
