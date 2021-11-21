<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="history" v-else :style="styles">
    <nav class="nav">
      <span> سوابق خرید </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
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
        :content="item.content"
        :label="item.label"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import TableChild from '@/modules/student-modules/table-child.vue';
import router from '@/router';

export default defineComponent({
  components: { TableChild },
  setup() {
    const styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    const data = reactive([
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۳۴۰،۰۰۰ تومان '
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      //
      {
        label: [
          {
            text: '۴۳۴۳۵۵۳۹۸'
          },
          {
            text: '۳۴۰،۰۰۰ تومان '
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      //
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      //
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۳۴۰،۰۰۰ تومان '
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۹۳۷۴۶۶۰۰۴'
          },
          {
            text: '۳۴۰،۰۰۰ تومان '
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۱۳۷۷۴۶۴۴۴'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      },
      {
        label: [
          {
            text: '۴۳۴۳۹۸'
          },
          {
            text: '۴،۵۰۰،۰۰۰ تومان'
          },
          {
            text: '۲۰ آبان ۱۳۹۰'
          }
        ],
        content: [
          {
            text: 'زبان تخصصی حسابداری'
          },
          {
            text: 'حقوق بین الملل خصوصی '
          }
        ]
      }
    ]);

    return { styles, data, goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
.history {
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
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
      display: inline-block;
    }
  }
  //
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
