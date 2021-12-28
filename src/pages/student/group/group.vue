<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="roadmap" v-else>
    <SmallHeader />
    <div class="bg"></div>
    <div
      class="circles"
      :style="`background: url(${require('../../../assets/img/roadmap/3-d-space-scene@3x.png')})
      , url(${require('../../../assets/img/roadmap/minimized-bg.jpg')});
      background-size : cover;
      background-position : center 
      `"
    >
      <div class="circle" v-for="(circle, i) in data" :key="circle.title">
        <div
          class="control-container animate__animated animate__fadeIn"
          v-show="i === currentIndex"
        >
          <div class="control">
            <h1>{{ data[i].title }}</h1>
            <h3>{{ data[i].session }}</h3>
            <p>{{ data[i].description }}</p>
            <button>شروع</button>

            <img
              src="../../../assets/img/roadmap/angle-left.svg"
              class="shape1"
              @click="moveImg(-1)"
            />
            <img
              src="../../../assets/img/roadmap/angle-right.svg"
              class="shape2"
              @click="moveImg(1)"
            />
          </div>
          <div class="img">
            <img src="../../../assets/img/roadmap/pencil@3x.png" />
            <img src="../../../assets/img/roadmap/pencil@3x.png" />
            <img src="../../../assets/img/roadmap/pencil@3x.png" />
          </div>
        </div>
        <img
          :src="
            require('../../../assets/img/roadmap/asset-' + (i + 5) + '@3x.png')
          "
          class="circle-main-img"
        />

        <div class="info">{{ data[i].session }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    const currentIndex = ref(0);
    const data = ref([
      {
        title: 'کتاب درسی',
        session: 'فصل 1',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 2',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 3',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 4',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 5',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 6',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 7',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 8',
        description: 'ماتریس و اعمال روی ماتریس ها'
      },
      {
        title: 'کتاب درسی',
        session: 'فصل 9',
        description: 'ماتریس و اعمال روی ماتریس ها'
      }
    ]);

    const moveImg = (amountToAdd: number) => {
      const calc = currentIndex.value + amountToAdd;
      if (calc >= 0 && calc <= data.value.length) {
        currentIndex.value += amountToAdd;
      }
    };

    return { data, currentIndex, moveImg };
  }
});
</script>
<style lang="scss" scoped>
.roadmap {
  padding-top: 8vh;
  font-family: IRANSans;
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;

  .circles {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;

    .circle {
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-inline: 1rem;

      .circle-main-img {
        max-width: 16rem;
        object-fit: contain;
        animation: bounce 1s infinite alternate;
        -webkit-animation: bounce 1s infinite alternate;
      }

      .control-container {
        display: flex;
        flex-direction: column;

        .img {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          transform: translateY(50%);
          img {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 0.7em;
            padding: 0.4rem;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
            background-color: #fff;
            margin: 0.25rem;

            &:nth-child(2) {
              transform: translateY(-50%);
              background-image: linear-gradient(
                to left,
                #fad961 108%,
                #f76b1c -9%
              );
            }
          }
        }

        .control {
          z-index: 9999;
          padding: 1.5rem;
          width: 100%;
          max-width: 13rem;
          height: 13.5rem;
          max-height: 14rem;
          padding: 1rem 0.7rem;
          border-radius: 3rem;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.72);
          background-color: #fff;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .shape1 {
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          top: 35%;
          left: -1.5rem;
        }
        .shape2 {
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          margin-inline: 1.7rem;
          top: 35%;
          right: -3.2rem;
        }

        h1 {
          font-size: 14px;
          font-weight: bold;

          text-align: center;
          color: #171717;
        }

        h3 {
          font-size: 11px;
          color: #d21921;
        }
        p {
          color: #000000;
          font-size: 12px;
        }

        button {
          background-color: #4ac367;
          border: none;
          padding: 7% 25%;
          color: #fff;
          border-radius: 10px;
        }
      }

      .info {
        padding: 0.3rem 3.5rem;
        white-space: nowrap;
        background: red;
        border-radius: 1em;
        font-size: 16px;
        color: #fff;
        margin-bottom: 1rem;
      }
    }
  }

  .btn {
    width: 25%;
    z-index: 9999;
    background: red;
    padding: 4rem;
    position: fixed;
    top: 37%;

    &:last-child {
      left: 0;
    }
  }
}

@keyframes bounce {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-20px);
  }
}
@-webkit-keyframes bounce {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-20px);
  }
}

.scale-enter-active,
.scale-leave-active {
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}

.scale-enter-to,
.scale-leave-from {
  transform: scaleY(1);
}

.scale-enter-from,
.scale-leave-to {
  transform: scaleY(0);
}
</style>
