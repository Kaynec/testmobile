<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div class="loader-parent" v-else-if="!data">
    <div class="loading1"></div>
  </div>
  <!--  -->

  <div class="contact-backup" v-else>
    <SmallHeader />
    <!-- Change THis With Real Data Coming From Some Server-->
    <div class="flex">
      <div class="card" v-for="item in data" :key="item._id">
        <div v-if="!item.img" class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <img
          :src="item.img"
          alt="Picture of a supporot person"
          class="person-img"
          @click="MoveToBackUpInfo(item)"
          v-else
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
import { defineComponent, computed, ref, onUpdated } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import { StudentSupportApi } from '@/api/services/student/student-support-service';
import { returnProtectedImage } from '@/utilities/get-image-from-url';
import router from '@/router';

export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    let data = ref();
    StudentSupportApi.getAll().then((res) => {
      data.value = res.data.data || 'empty';
    });

    const MoveToBackUpInfo = (supportPerson) => {
      router.push({
        name: 'ContactBackupInfo',
        params: { data: JSON.stringify(supportPerson) }
      });
    };

    // Images For The Categories
    let imageRefs = [] as any;
    const setImageRef = (el) => {
      if (el) imageRefs.push(el);
    };

    onUpdated(() => {
      data.value.forEach((mentor) => {
        const imageUrl = `https://www.api.devnirone.ir/api/mentor/getProfileImage/${mentor.profileImage}`;
        returnProtectedImage(imageUrl).then((res) => {
          mentor.img = res;
        });
      });
    });

    const goToChatPage = () => router.push({ name: 'ContactBackupChat' });

    return {
      MoveToBackUpInfo,
      goToChatPage,
      data,
      setImageRef,
      imageRefs,
      returnProtectedImage
    };
  }
});
</script>

<style lang="scss" scoped>
.contact-backup {
  position: relative;
  background-color: #f4f4f4;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-top: 8vh;
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
        height: 30vh;
        object-fit: fill;
      }
    }
  }
}
</style>
