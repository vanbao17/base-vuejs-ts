<script lang="ts" setup>
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import IconSvg from "@/components/base/IconSvg.vue";
import SlideSidebar from "@/components/base/SlideSidebar.vue";
import { ref } from "vue";
import FilterStadium from "../FilterStadium.vue";
const sports = ref([
  { label: "Bóng đá", value: "football" },
  { label: "Bóng rổ", value: "basketball" },
  { label: "Cầu lông", value: "badminton" },
]);
const sidebarRef = ref<InstanceType<typeof SlideSidebar>>();
const handleSelect = (item: any) => {
  console.log("Đã chọn:", item);
};
</script>
<template>
  <div class="wrapper-header">
    <div class="container">
      <div class="header-up">
        <div class="header-up-left">
          <p>PVB</p>
          <div class="today">
            <p>Thứ 7, 26/04/2025</p>
            <span>15:03:20</span>
          </div>
        </div>

        <div class="header-up-right">
          <div class="language">
            <BaseDropdown
              triggerText="Chọn môn thể thao"
              placement="bottom"
              :listData="sports"
              @select="handleSelect"
            >
              <template #trigger>
                <button class="btn flagVi">
                  <img src="@/assets/images/flag-vi.png" alt="falg-vi" />
                </button>
              </template>
            </BaseDropdown>
          </div>
          <div class="notifications">
            <BaseDropdown
              triggerText="Chọn môn thể thao"
              placement="bottom"
              :listData="sports"
              @select="handleSelect"
            >
              <template #trigger>
                <button class="btn">
                  <img
                    class="icon"
                    src="@/assets/svgs/notifications.svg"
                    alt="iconSetting"
                  />
                </button>
              </template>
            </BaseDropdown>
          </div>
          <div class="user-setting">
            <BaseDropdown
              triggerText="Chọn môn thể thao"
              placement="bottom"
              :listData="sports"
              @select="handleSelect"
            >
              <template #trigger>
                <button class="btn">
                  <img
                    class="icon"
                    src="@/assets/svgs/user.svg"
                    alt="iconSetting"
                  />
                </button>
              </template>
            </BaseDropdown>
          </div>
        </div>
      </div>
      <div class="header-down">
        <div class="container-header-down">
          <div class="logo">PVB</div>
          <div class="header-down-left">
            <span>Tìm kiếm</span>
            <img
              class="icon"
              src="@/assets/svgs/setting.svg"
              alt="iconSetting"
              @click="sidebarRef?.open()"
            />
          </div>
          <div class="header-down-right">
            <div class="item map">
              <img class="icon" src="@/assets/svgs/map.svg" alt="iconSetting" />
              <span>Bản đồ</span>
            </div>
            <div class="item map">
              <img
                class="icon"
                src="@/assets/svgs/calendarCheck.svg"
                alt="iconSetting"
              />
              <span>Sân đã đặt</span>
            </div>
            <div class="item map">
              <img
                class="icon"
                src="@/assets/svgs/heart.svg"
                alt="iconSetting"
              />
              <span>Yêu thích</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SlideSidebar ref="sidebarRef" position="right">
    <FilterStadium></FilterStadium>
  </SlideSidebar>
</template>
<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
}
.flagVi {
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
.wrapper-header {
  width: 100%;
  background-color: var(--primary-backgroud-color);
  .container {
    width: 95%;
    margin: 0px auto;
    padding: 12px 0px;
    .header-up {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0px;
      .header-up-left {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #fff;
        & > p {
          font-size: 24px;
          font-weight: 600;
        }
        .today {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 14px;
        }
      }

      .header-up-right {
        display: flex;
        align-items: center;
        gap: 12px;
        .btn {
          color: #fff;
        }
      }
    }
    .header-down {
      width: 100%;
      background-color: #fff;
      border-radius: 8px;
      padding: 6px 12px;
      .container-header-down {
        display: flex;
        align-items: center;
      }
      .logo {
        padding: 6px;
        border-right: 2px solid #ddd;
      }
      .header-down-left {
        width: 50%;
        padding: 6px;
        display: flex;
        align-items: center;
        border-right: 2px solid #ddd;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          color: #aaa;
        }
      }
      .header-down-right {
        width: 50%;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .item {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
