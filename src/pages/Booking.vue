<script lang="ts" setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import Field from "@/components/Field.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const modalSelectDayRef = ref<InstanceType<typeof BaseModal> | null>(null);
const selectedDate = ref<Date | null>(null);
const router = useRouter();

const openModal = () => {
  modalSelectDayRef.value?.open();
};
const closeModal = () => {
  modalSelectDayRef.value?.close();
};
const handleBack = () => {
  router.back();
};
</script>
<template>
  <div class="wrapper-booking">
    <div class="container">
      <div class="title">
        <div class="back" @click="handleBack">
          <img
            class="icon"
            src="@/assets/svgs/arrow-left.svg"
            alt="back icon"
          />
        </div>
        <div class="name-stadium">
          <p>Đặt lịch sân Thiên Trường</p>
          <span>Loại sân: Bóng đá</span>
        </div>
        <div class="container-emty"></div>
      </div>
      <div class="container-select-day">
        <div class="select-day" @click="openModal">
          <div class="container-emty"></div>
          <div class="day">28/04/2025</div>
          <div class="icon calendar">
            <img src="@/assets/svgs/calendar.svg" alt="calendar icon" />
          </div>
        </div>
      </div>
      <div class="container-note-price">
        <div class="note">
          <div class="item empty">
            <div class="color white"></div>
            <span>Trống</span>
          </div>
          <div class="item placed">
            <div class="color red"></div>
            <span>Đã đặt</span>
          </div>
          <div class="item locked">
            <div class="color gray"></div>
            <span>Đã khóa</span>
          </div>
        </div>
        <div class="price">
          <span>Xem sân & bảng giá</span>
        </div>
      </div>
      <div class="container-field">
        <Field></Field>
      </div>
      <div class="container-submit">
        <div class="infor-booking"></div>
        <div class="btn-submit-booking">
          <BaseButton color="var(--third-color)">Tiếp theo</BaseButton>
        </div>
      </div>
    </div>
  </div>
  <BaseModal ref="modalSelectDayRef">
    <div class="container-select-day">
      <v-date-picker
        input-class="my-input"
        day-class="my-day"
        calendar-class="my-calendar"
        v-model="selectedDate"
      ></v-date-picker>
      <div class="btn-model-select-day">
        <div class="btn">
          <BaseButton variant="second" @click="closeModal">Hủy</BaseButton>
        </div>
        <div class="btn"><BaseButton>Lưu</BaseButton></div>
      </div>
    </div>
  </BaseModal>
</template>
<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
}
.my-input {
  background: #fff;
  border: 2px solid #42b983;
  border-radius: 8px;
  padding: 6px;
}
::v-deep(.v-picker__header) {
  display: none !important;
}
::v-deep(.v-picker-title) {
  display: none !important;
}
.my-calendar {
  background: #f5f5f5;
}

.my-day:hover {
  background: #42b983;
  color: white;
}

.wrapper-booking {
  width: 100%;
  height: 100vh;
  background-color: var(--primary-backgroud-color);
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 12px;
      .back {
        width: 36px;
        height: 36px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .name-stadium {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 24px;
        p,
        span {
          color: #fff;
        }
        p {
          font-size: 24px;
        }
      }
    }
    .container-select-day {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 0px 12px;
      .select-day {
        width: 25%;
        background-color: #ffffff4d;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        cursor: pointer;
        .day {
          color: #fff;
        }
      }
    }
    .container-note-price {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      .note {
        display: flex;
        align-items: center;
        gap: 12px;
        .item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fff;
          font-size: 14px;
          .color {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            &.white {
              background-color: #fff;
            }
            &.red {
              background-color: red;
            }
            &.gray {
              background-color: gray;
            }
          }
        }
      }
      .price {
        font-weight: 600;
        color: #ffec88;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .container-field {
      flex: 1;
    }
    .container-submit {
      padding: 6px;
      background-color: #fff;
    }
  }
}
.btn-model-select-day {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}
</style>
