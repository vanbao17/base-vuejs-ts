<script lang="ts" setup>
import { TypeStadium } from "@/core/types/stadium";
import pickleballImg from "@/assets/images/type-stadium/pickleball.png";
import caulongImg from "@/assets/images/type-stadium/caulong.png";
import bongdaImg from "@/assets/images/type-stadium/bongda.png";
import tennisImg from "@/assets/images/type-stadium/tennis.png";
import bongchuyenImg from "@/assets/images/type-stadium/bongchuyen.png";
import bongroImg from "@/assets/images/type-stadium/bongro.png";
import phuchopImg from "@/assets/images/type-stadium/phuchop.png";
import golfImg from "@/assets/images/type-stadium/golf.png";
import padelImg from "@/assets/images/type-stadium/padel.png";
import { ref } from "vue";
import BaseSelect from "./base/BaseSelect.vue";
import BaseButton from "./base/BaseButton.vue";

const types = ref<TypeStadium[]>([
  { id: 1, name: "Pickleball", image: pickleballImg },
  { id: 2, name: "Cầu lông", image: caulongImg },
  { id: 3, name: "Bóng đá", image: bongdaImg },
  { id: 4, name: "Tennis", image: tennisImg },
  { id: 5, name: "B.chuyền", image: bongchuyenImg },
  { id: 6, name: "Bóng rổ", image: bongroImg },
  { id: 7, name: "Phức hợp", image: phuchopImg },
  { id: 8, name: "Golf", image: golfImg },
  { id: 9, name: "Padel", image: padelImg },
]);
const onSearchInput = () => {};
const options = [
  { label: "An Giang", value: "An Giang" },
  { label: "Bà Rịa - Vũng Tàu", value: "Bà Rịa - Vũng Tàu" },
  { label: "Bắc Giang", value: "Bắc Giang" },
  { label: "Bắc Kạn", value: "Bắc Kạn" },
  { label: "Bạc Liêu", value: "Bạc Liêu" },
  { label: "Bắc Ninh", value: "Bắc Ninh" },
  { label: "Bến Tre", value: "Bến Tre" },
  { label: "Bình Định", value: "Bình Định" },
  { label: "Bình Dương", value: "Bình Dương" },
  { label: "Bình Phước", value: "Bình Phước" },
  { label: "Bình Thuận", value: "Bình Thuận" },
  { label: "Cà Mau", value: "Cà Mau" },
  { label: "Cần Thơ", value: "Cần Thơ" },
  { label: "Cao Bằng", value: "Cao Bằng" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Đắk Lắk", value: "Đắk Lắk" },
  { label: "Đắk Nông", value: "Đắk Nông" },
  { label: "Điện Biên", value: "Điện Biên" },
  { label: "Đồng Nai", value: "Đồng Nai" },
  { label: "Đồng Tháp", value: "Đồng Tháp" },
  { label: "Gia Lai", value: "Gia Lai" },
  { label: "Hà Giang", value: "Hà Giang" },
  { label: "Hà Nam", value: "Hà Nam" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Hà Tĩnh", value: "Hà Tĩnh" },
  { label: "Hải Dương", value: "Hải Dương" },
  { label: "Hải Phòng", value: "Hải Phòng" },
  { label: "Hậu Giang", value: "Hậu Giang" },
  { label: "Hòa Bình", value: "Hòa Bình" },
  { label: "Hưng Yên", value: "Hưng Yên" },
  { label: "Khánh Hòa", value: "Khánh Hòa" },
  { label: "Kiên Giang", value: "Kiên Giang" },
  { label: "Kon Tum", value: "Kon Tum" },
  { label: "Lai Châu", value: "Lai Châu" },
  { label: "Lâm Đồng", value: "Lâm Đồng" },
  { label: "Lạng Sơn", value: "Lạng Sơn" },
  { label: "Lào Cai", value: "Lào Cai" },
  { label: "Long An", value: "Long An" },
  { label: "Nam Định", value: "Nam Định" },
  { label: "Nghệ An", value: "Nghệ An" },
  { label: "Ninh Bình", value: "Ninh Bình" },
  { label: "Ninh Thuận", value: "Ninh Thuận" },
  { label: "Phú Thọ", value: "Phú Thọ" },
  { label: "Phú Yên", value: "Phú Yên" },
  { label: "Quảng Bình", value: "Quảng Bình" },
  { label: "Quảng Nam", value: "Quảng Nam" },
  { label: "Quảng Ngãi", value: "Quảng Ngãi" },
  { label: "Quảng Ninh", value: "Quảng Ninh" },
  { label: "Quảng Trị", value: "Quảng Trị" },
  { label: "Sóc Trăng", value: "Sóc Trăng" },
  { label: "Sơn La", value: "Sơn La" },
  { label: "Tây Ninh", value: "Tây Ninh" },
  { label: "Thái Bình", value: "Thái Bình" },
  { label: "Thái Nguyên", value: "Thái Nguyên" },
  { label: "Thanh Hóa", value: "Thanh Hóa" },
  { label: "Thừa Thiên Huế", value: "Thừa Thiên Huế" },
  { label: "Tiền Giang", value: "Tiền Giang" },
  { label: "TP Hồ Chí Minh", value: "TP Hồ Chí Minh" },
  { label: "Trà Vinh", value: "Trà Vinh" },
  { label: "Tuyên Quang", value: "Tuyên Quang" },
  { label: "Vĩnh Long", value: "Vĩnh Long" },
  { label: "Vĩnh Phúc", value: "Vĩnh Phúc" },
  { label: "Yên Bái", value: "Yên Bái" },
];
const selectedOption = ref(options[0]);
const selectType = ref<TypeStadium | null>(null);
</script>
<template>
  <div class="wrapper-filter-stadium">
    <div class="container">
      <div class="title">
        <span>Bộ lọc nâng cao</span>
      </div>
      <div class="container-filter">
        <div class="list-type-stadium">
          <span class="title">Loại sân</span>
          <div class="types">
            <div
              :class="[
                'item-type',
                selectType ? (selectType.id === type.id ? 'active' : '') : '',
              ]"
              v-for="type in types"
              :key="type.id"
              @click="selectType = type"
            >
              <img :src="type.image" :alt="type.name" />
              <span>{{ type.name }}</span>
            </div>
          </div>
        </div>
        <div class="list-place-stadium">
          <span class="title">Khu vực</span>
          <div class="places-filter">
            <div class="tinh">
              <span>Tỉnh</span>
              <BaseSelect
                v-model="selectedOption"
                :options="options"
                :loading="false"
                enable-search
                placeholder="Chọn sản phẩm"
                search-placeholder="Tìm kiếm sản phẩm..."
                @search="onSearchInput"
              />
            </div>
            <div class="huyen">
              <span>Huyện</span>
              <BaseSelect
                v-model="selectedOption"
                :options="options"
                :loading="false"
                enable-search
                placeholder="Chọn sản phẩm"
                search-placeholder="Tìm kiếm sản phẩm..."
                @search="onSearchInput"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="btn-search">
        <BaseButton>Tìm kiếm</BaseButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper-filter-stadium {
  width: 100%;
  height: 100vh;
  .container {
    width: 100%;
    height: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    & > .title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 24px;
    }
    .container-filter {
      flex: 1;
      overflow-y: auto;
      .list-type-stadium {
        width: 100%;
        .title {
          font-weight: 600;
        }
        .types {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
          .item-type {
            width: 100px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            cursor: pointer;
            img {
              width: 40px;
              height: 40px;
            }
            span {
              font-size: 14px;
              margin-top: 6px;
            }
          }
          .item-type.active {
            background-color: var(--primary-backgroud-color) !important;
            color: #fff !important;
          }
        }
      }
      .list-place-stadium {
        width: 100%;
        margin-top: 24px;
        padding: 6px;
        .title {
          font-weight: 600;
        }
        .places-filter {
          width: 100%;
          display: flex;
          margin-top: 12px;
          gap: 12px;
          & > div {
            width: 48%;
          }
        }
      }
    }
    .btn-search {
      width: 100%;
      margin-top: 24px;
    }
  }
}
</style>
