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
        v-for="item in historyData.items"
        :key="item"
        :data="JSON.stringify(item)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { StudentBasketApi } from '@/api/services/student/student-basket-service';
import TableChild from '@/modules/student-modules/table-child.vue';
import router from '@/router';

const data = [
  {
    _id: '61aba7c062f55a11e09adf98',
    student: '61ab17536c151146e40b460b',
    items: [
      {
        _id: '61aba7c062f55a11e09adf99',
        product: {
          _id: '61a496f5413f911774857fb4',
          title: 'ریاضی',
          category: '61a526a4284afd2a9c18cfd5',
          price: 56000,
          demoFile: 'product-demo-1638176501020-bitmap-copy-19@3x.png',
          originalFile: 'product-original-1638176501022-bitmap-copy-19@3x.png',
          coverImageFile:
            'product-coverImage-1638176501025-bitmap-copy-19@3x.png',
          createdAt: '2021-11-29T09:01:41.688Z',
          updatedAt: '2021-11-29T09:01:41.688Z',
          __v: 0
        },
        quantity: 2,
        price: 56000
      }
    ],
    totalIncludingTax: 112000,
    totalTax: 0,
    createdAt: '2021-12-04T17:39:12.802Z',
    updatedAt: '2021-12-04T17:39:12.802Z',
    __v: 0
  },
  {
    _id: '61aba8d76373171a7cd59c5f',
    student: '61ab17536c151146e40b460b',
    items: [
      {
        _id: '61aba8d76373171a7cd59c60',
        product: {
          _id: '61a496f5413f911774857fb4',
          title: 'ریاضی',
          category: '61a526a4284afd2a9c18cfd5',
          price: 56000,
          demoFile: 'product-demo-1638176501020-bitmap-copy-19@3x.png',
          originalFile: 'product-original-1638176501022-bitmap-copy-19@3x.png',
          coverImageFile:
            'product-coverImage-1638176501025-bitmap-copy-19@3x.png',
          createdAt: '2021-11-29T09:01:41.688Z',
          updatedAt: '2021-11-29T09:01:41.688Z',
          __v: 0
        },
        quantity: 2,
        price: 56000
      },
      {
        _id: '61aba8d76373171a7cd59c61',
        product: {
          _id: '61a4971c413f911774857fbb',
          title: 'کامپایلر',
          category: '61a526a4284afd2a9c18cfd5',
          price: 68000,
          specialPrice: 60000,
          demoFile: 'product-demo-1638176539283-bitmap-copy-19@3x.png',
          originalFile: 'product-original-1638176539284-bitmap-copy-19@3x.png',
          coverImageFile:
            'product-coverImage-1638176539287-bitmap-copy-19@3x.png',
          createdAt: '2021-11-29T09:02:20.365Z',
          updatedAt: '2021-11-29T09:02:20.365Z',
          __v: 0
        },
        quantity: 1,
        price: 60000
      }
    ],
    totalIncludingTax: 172000,
    totalTax: 0,
    createdAt: '2021-12-04T17:43:51.901Z',
    updatedAt: '2021-12-04T17:43:51.901Z',
    __v: 0
  }
];

export default defineComponent({
  components: { TableChild },
  setup() {
    let historyData = ref();
    StudentBasketApi.HistoryOfBoughtProducts().then(
      (res) => (historyData.value = res.data.data)
    );

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

    return { styles, data, goOnePageBack, historyData };
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
