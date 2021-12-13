<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="my-profile" v-else :style="styles">
    <nav class="nav">
      <span> پروفایل من </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Red Div -->
    <div class="info">
      <div class="right">
        <img
          src="data:image/jpeg;base64,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"
          class="profile-image"
        />
        <router-link class="edit" to="edit-profile">
          ویرایش
          <i class="fas fa-angle-left"></i>
        </router-link>
      </div>
      <div class="left">
        <!-- Change This Info Later -->
        <h4>{{ currentUser.username }}</h4>
        <h6>{{ currentUser.point }} امتیاز</h6>
        <div class="left-info">
          <span>
            {{ gradeName }} :
            <br />
            شماره همراه :
          </span>
          <span>
            {{ orientationName }} <br />
            {{ toPersianNumbers(currentUser.phone) }}
          </span>
        </div>
      </div>
    </div>
    <!-- Dialogs -->

    <div class="container">
      <div
        ref="Dialog"
        class="dialog"
        v-for="item in data"
        :key="item"
        @touchstart="touchstart"
        @touchend="touchend(item.component, $event)"
      >
        <span> {{ item.label }} </span>
        <i class="fas fa-angle-left"></i>
      </div>
    </div>
    <!--  -->
    <Footer />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import Footer from '@/modules/student-modules/footer/footer.vue';
import router from '@/router';
import { store } from '@/store';
// import { StudentOrientationApi } from '@/api/services/student/student-orientation-service';
// import { StudentGradeApi } from '@/api/services/student/student-grade-service';
import { StudentActionTypes } from '@/store/modules/student/action-types';
export default defineComponent({
  components: { Footer },
  setup() {
    let currentUser = reactive(store.getters.getCurrentStudent);
    let orientationName = ref(currentUser.orientation.title);
    let gradeName = ref(currentUser.grade.title);

    const styles = computed(() => {
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

    const data = reactive([
      {
        label: 'دعوت از دوستان',
        component: 'InviteFriends'
      },
      {
        label: ' سوابق خرید ',
        component: 'PurchaseHistory'
      },
      {
        label: '  امتیازات',
        component: 'ProfilePoints'
      },
      {
        label: ' پیام های دریافتی ',
        component: 'Inbox'
      },
      {
        label: 'تازه های کنکور',
        component: 'News'
      },
      {
        label: 'خروج از پنل کاربری',
        component: 'logOut'
      }
    ]);

    const touchstart = (e: any) => {
      e.target.classList.add('active');
    };

    const touchend = (component: string, e: any) => {
      e.target.classList.remove('active');
      if (component != 'logOut')
        router.push({
          name: component
        });
      else logout();
    };

    const logout = () => {
      store.dispatch(StudentActionTypes.LOG_OUT_STUDENT).then((res) => {
        if (res) router.push({ name: 'StudentLogin' });
      });
    };

    return {
      styles,
      data,
      touchstart,
      touchend,
      goOnePageBack,
      currentUser,
      logout,
      toPersianNumbers,
      orientationName,
      gradeName
    };
  }
});
</script>

<style lang="scss" scoped>
.my-profile {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;

  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 7px 0 7px 2px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
      display: inline-block;
    }
  }

  .info {
    width: 95%;
    margin: 1rem auto;
    background: linear-gradient(
      to top left,
      rgb(189, 39, 43) 0%,
      rgb(189, 39, 43) 50%,
      rgba(189, 39, 43, 0.95) 50%,
      rgba(189, 39, 43, 0.95) 100%
    );
    display: flex;
    justify-content: flex-start;
    padding: 2.5rem;
    border-radius: 15px;

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      img {
        width: 100%;
        max-width: 75px;

        border-radius: 50px;
        padding: 2px;
        border: solid 4.4px rgba(255, 255, 255, 0.21);
      }

      .edit {
        border-radius: 50px;
        border: solid 0.8px #fff;
        text-decoration: none;
        position: relative;
        padding: 0.5rem 1.5rem;
        color: white;
        font-size: 9.2px;

        i {
          position: absolute;
          left: 0;
          top: 35%;
          margin-left: 10%;
        }
      }
    }

    .left {
      color: white;
      white-space: nowrap;
      margin-right: 1.2rem;
      h4 {
        font-size: 22px;
        font-weight: bold;
        text-align: right;
        color: #fff;
        margin-bottom: 1rem;
      }

      h6 {
        font-size: 18px;
        text-align: right;
        color: #fff;
        border-bottom: solid 1px rgba(225, 189, 186, 0.49);
        padding-bottom: 1rem;
      }

      .left-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;
        font-weight: 300;
        margin-top: 1rem;
        gap: 1rem;
      }
    }
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding-bottom: 4rem;

    .dialog {
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
      background-color: #fff;
      width: 100%;
      border-radius: 12px;
      color: #171717;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      margin: 0.5rem 0;

      span {
        font-size: 13px;
        font-weight: bold;
      }

      .fa-angle-left {
        color: black !important;
        font-size: 14px;
      }
      .label {
        font-family: IRANSans;
        font-size: 12px;
        font-weight: 500;
      }
    }
    .active {
      background-color: rgba(177, 16, 21, 0.96);
      color: #fff;

      .fa-angle-left {
        color: #fff !important;
      }
    }
  }
}
</style>
