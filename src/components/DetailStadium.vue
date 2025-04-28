<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
const navItems = ["Thông tin", "Dịch vụ", "Hình ảnh", "Đánh giá"];

const activeIndex = ref(0);
const underlineLeft = ref(0);
const underlineWidth = ref(0);
const navContainer = ref<HTMLDivElement | null>(null);

const selectItem = (index: number, event: MouseEvent) => {
  activeIndex.value = index;
  const target = event.currentTarget as HTMLElement;
  underlineLeft.value = target.offsetLeft;
  underlineWidth.value = target.offsetWidth;
};
onMounted(async () => {
  await nextTick();
  if (navContainer.value) {
    const activeItem = navContainer.value.children[
      activeIndex.value
    ] as HTMLElement;
    underlineLeft.value = activeItem.offsetLeft;
    underlineWidth.value = activeItem.offsetWidth;
  }
});
const underlineStyle = computed(() => ({
  left: underlineLeft.value + "px",
  width: underlineWidth.value + "px",
}));
</script>
<template>
  <div class="wrapper-detail-stadium">
    <div class="container">
      <div class="action">
        <div class="action-left">
          <div class="item back">
            <img class="icon" src="@/assets/svgs/arrow-left.svg" alt="back" />
          </div>
        </div>
        <div class="action-right">
          <div class="item map">
            <img class="icon" src="@/assets/svgs/mapPinned.svg" alt="map" />
          </div>
          <div class="item heart">
            <img class="icon" src="@/assets/svgs/heart.svg" alt="heart" />
          </div>
          <div class="btn-booking">
            <BaseButton @click="">Đặt lịch</BaseButton>
          </div>
        </div>
      </div>
      <div class="infor-stadium">
        <div class="infor-up">
          <div class="container-infor-up">
            <img
              src="https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-1/492399463_1214542913523485_6052902235511812868_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Gwgf3PSViFMQ7kNvwG9NyrY&_nc_oc=AdnnpCnSeSozYLrzz5-4JxBxTR8_PcKDoTNf-Y7Ig3TPUL7rQz2bC_i857hIEswoq-J05vNy9iHgU6UI_TNHY3kd&_nc_zt=24&_nc_ht=scontent.fhan5-3.fna&_nc_gid=masGS8s8nNPT2cXy-J1wog&oh=00_AfHv-eb81Xky9MPP0E8L8oFlu-4VTooFF8sK0FsApxhZnQ&oe=6812358F"
              alt="image stadium"
            />
            <div class="name-tag">
              <div class="name">
                <span>Phạm Văn Bảo</span>
              </div>
              <div class="tag">
                <span>Loại sân: </span>
                <p>Pickeball</p>
              </div>
            </div>
          </div>
        </div>
        <div class="infor-down">
          <div class="container-infor-down">
            <div class="item-infor">
              <img
                class="icon"
                src="@/assets/svgs/mapPinned.svg"
                alt="mapPinned"
              />
              <span
                >Rủ đồng đội nhập hội, xách ba lô và đi thôi nào anh em
                ơi!!!</span
              >
            </div>
            <div class="item-infor">
              <img class="icon" src="@/assets/svgs/clock.svg" alt="clock" />
              <span>06:00 | 22:00</span>
            </div>
            <div class="item-infor phone">
              <img class="icon" src="@/assets/svgs/phone.svg" alt="phone" />
              <span>0904973022</span>
            </div>
          </div>
        </div>
        <div class="infor-rate">
          <img class="icon" src="@/assets/svgs/star.svg" alt="star" />
          <span> 5 </span>
          <span>( 8 đánh giá )</span>
        </div>
      </div>
      <div class="navigations">
        <div class="nav-container" ref="navContainer">
          <div
            v-for="(item, index) in navItems"
            :key="item"
            class="nav-item"
            @click="selectItem(index, $event)"
            :class="{ active: activeIndex === index }"
          >
            {{ item }}
          </div>
          <div class="underline" :style="underlineStyle"></div>
        </div>
      </div>
    </div>
    <div class="thumb-background">
      <img
        src="https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-6/492724834_1263399385145079_1508002271422425528_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sDfIMHQK1HoQ7kNvwHzb490&_nc_oc=AdnfVtOFmDdJg4TIqWMWq8AUisKvamuKbs0OArrwhlIOMA0HDcjihFJo5uUYHT_Qjlscy3U8mTYGqn8gPbwwivIP&_nc_zt=23&_nc_ht=scontent.fdad3-3.fna&_nc_gid=G2DZHdC1WhEJ0KYaKqKESg&oh=00_AfHJc92PSsbugvER3v1hU9srpxMCImHR90LttUX_RWp9fw&oe=6812366E"
        alt="thumb background"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
}
.wrapper-detail-stadium {
  width: 100%;
  height: 100vh;
  position: relative;
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 12px;
    .action {
      display: flex;
      align-items: center;
      z-index: 10;
      justify-content: space-between;
      margin-bottom: 24px;
      .action-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .item {
        padding: 12px;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    .infor-stadium {
      width: 100%;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 10;
      margin: 24px 0px;
      .infor-up {
        width: 100%;
        margin-top: 12px;
        .container-infor-up {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .name-tag {
          display: flex;
          flex-direction: column;
          gap: 6px;
          .name {
            font-weight: 600;
          }
          .tag {
            display: flex;
            align-items: center;
            gap: 6px;
          }
        }
      }
      .infor-down {
        width: 100%;
        border-top: 1px solid #ddd;
        .container-infor-down {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          .item-infor {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .phone {
            color: #aaa;
          }
        }
      }
      .infor-rate {
        display: flex;
        align-items: center;
        width: fit-content;
        color: #fff;
        padding: 12px;
        gap: 6px;
        border-radius: 50px;
        background-color: var(--second-color);
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(100%, -50%);
      }
    }
    .navigations {
      width: 100%;
      z-index: 10;
      .nav-container {
        position: relative;
        display: flex;
        border-bottom: 1px solid #ddd;
        background: white;
      }

      .nav-item {
        width: calc(100% / 4);
        text-align: center;
        padding: 12px 20px;
        cursor: pointer;
        position: relative;
        transition: color 0.3s;
        white-space: nowrap;
      }

      .nav-item.active {
        color: var(--second-color);
      }

      .underline {
        position: absolute;
        bottom: 0;
        height: 3px;
        background-color: var(--second-color);
        transition: left 0.3s ease, width 0.3s ease;
      }
    }
  }
  .thumb-background {
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 0;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
