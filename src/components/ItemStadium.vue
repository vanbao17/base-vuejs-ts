<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { Stadium } from "@/core/types/stadium";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import SlideSidebar from "@/components/base/SlideSidebar.vue";
import DetailStadium from "@/components/DetailStadium.vue";

const props = defineProps<{ stadium: Stadium }>();
const sidebarRef = ref<InstanceType<typeof SlideSidebar>>();

const openModal = () => {
  // modalRef.value?.open();
  router.push("/booking");
};
const router = useRouter();
</script>
<template>
  <div class="wrapper-item-stadium">
    <div class="container">
      <div class="container-up" @click="sidebarRef?.open()">
        <div class="thumb">
          <img
            src="https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-6/492724834_1263399385145079_1508002271422425528_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sDfIMHQK1HoQ7kNvwHzb490&_nc_oc=AdnfVtOFmDdJg4TIqWMWq8AUisKvamuKbs0OArrwhlIOMA0HDcjihFJo5uUYHT_Qjlscy3U8mTYGqn8gPbwwivIP&_nc_zt=23&_nc_ht=scontent.fdad3-3.fna&_nc_gid=G2DZHdC1WhEJ0KYaKqKESg&oh=00_AfHJc92PSsbugvER3v1hU9srpxMCImHR90LttUX_RWp9fw&oe=6812366E"
            alt="thumb stadium"
          />
        </div>
        <div class="rate-like">
          <div class="rate">
            <div class="item-rate">
              <img src="@/assets/svgs/star.svg" />
              <span>5</span>
            </div>
            <div class="item-booking-day">
              <span>Đơn ngày</span>
            </div>
            <div class="item-booking-month">
              <span>Đơn tháng</span>
            </div>
          </div>
          <div class="like">
            <div class="item heart">
              <img src="@/assets/svgs/heart.svg" />
            </div>
            <div class="item mappinned">
              <img src="@/assets/svgs/mapPinned.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="container-down">
        <div class="container-down-left">
          <div class="image-stadium">
            <img
              src="https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-1/492399463_1214542913523485_6052902235511812868_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Gwgf3PSViFMQ7kNvwG9NyrY&_nc_oc=AdnnpCnSeSozYLrzz5-4JxBxTR8_PcKDoTNf-Y7Ig3TPUL7rQz2bC_i857hIEswoq-J05vNy9iHgU6UI_TNHY3kd&_nc_zt=24&_nc_ht=scontent.fhan5-3.fna&_nc_gid=masGS8s8nNPT2cXy-J1wog&oh=00_AfHv-eb81Xky9MPP0E8L8oFlu-4VTooFF8sK0FsApxhZnQ&oe=6812358F"
              appear-to-class="image stadium"
            />
          </div>
          <div class="infor-stadium" @click="sidebarRef?.open()">
            <p class="name">
              Trường Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng
            </p>
            <p class="address">
              Phòng họp 1, Trường Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng
            </p>
            <div class="time-phone">
              <div class="time">
                <img
                  class="icon"
                  src="@/assets/svgs/clock.svg"
                  alt="Thời gian"
                />
                <span>06:00 | 20:00</span>
              </div>
              <div class="phone">
                <img
                  class="icon"
                  src="@/assets/svgs/phone.svg"
                  alt="Số điện thoại"
                />
                <span>0904973022</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-down-right">
          <BaseButton @click="openModal">Đặt lịch</BaseButton>
        </div>
      </div>
    </div>
  </div>

  <SlideSidebar ref="sidebarRef" position="left">
    <DetailStadium></DetailStadium>
  </SlideSidebar>
</template>
<style lang="scss" scoped>
.wrapper-item-stadium {
  width: 49%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  .container {
    width: 100%;
    .container-up {
      width: 100%;
      position: relative;
      height: 130px;
      .thumb {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .rate-like {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        top: 0;
        font-size: 14px;
        padding: 4px 6px;
        .rate {
          display: flex;
          align-items: center;
          .item-rate {
            display: flex;
            align-items: center;
            background-color: #fff;
            padding: 0px 12px;
            border-radius: 50px;
            gap: 6px;
            z-index: 10;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .item-booking-day,
          .item-booking-month {
            padding: 0px 12px;
            border-radius: 50px;
            color: #fff;
            margin-left: -12px;
            z-index: 1;
          }
          .item-booking-day {
            background-color: var(--primary-backgroud-color);
            z-index: 9;
          }
          .item-booking-month {
            background-color: #e58ae8;
          }
        }
        .like {
          display: flex;
          align-items: center;
          gap: 12px;
          .item {
            padding: 12px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
      }
    }
    .container-down {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background-color: #fff;
      border-radius: 8px;
      .container-down-left {
        display: flex;
        align-items: center;
        gap: 6px;
        .image-stadium {
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .infor-stadium {
          .name {
            font-weight: 600;
          }
          .time-phone {
            display: flex;
            align-items: center;
            gap: 12px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .address,
          .time,
          .phone {
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 6px;
            span {
              color: #aaa;
            }
          }
        }
      }
      .container-down-right {
        width: 100px;
      }
    }
  }
}
</style>
