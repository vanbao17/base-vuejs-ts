<script setup lang="ts">
import ItemStadium from "@/components/ItemStadium.vue";

import type { Stadium } from "@/core/types/stadium";
import { ref } from "vue";
const stadiums = ref<Stadium[]>([
  {
    id: "1",
    name: "Sân A",
    address: "123 Đường A, TP.HCM",
    time_start: 6,
    time_end: 22,
    image_portfolio: "/images/stadium1.jpg",
    thumb: "/images/thumb1.jpg",
    rate: 4.5,
    like: true,
    phone: "0123456789",
    booking_day: true,
    booking_month: false,
  },
  {
    id: "2",
    name: "Sân B",
    address: "456 Đường B, Hà Nội",
    time_start: 7,
    time_end: 21,
    image_portfolio: "/images/stadium2.jpg",
    thumb: "/images/thumb2.jpg",
    rate: 4,
    like: false,
    phone: "0987654321",
  },
  {
    id: "3",
    name: "Sân C",
    address: "789 Đường C, Đà Nẵng",
    time_start: 5,
    time_end: 23,
    image_portfolio: "/images/stadium3.jpg",
    thumb: "/images/thumb3.jpg",
    rate: 3.5,
    like: true,
    phone: "0912345678",
    booking_day: true,
  },
  {
    id: "4",
    name: "Sân D",
    address: "12 Đường D, Cần Thơ",
    time_start: 8,
    time_end: 20,
    image_portfolio: "/images/stadium4.jpg",
    thumb: "/images/thumb4.jpg",
    rate: 5,
    like: false,
    phone: "0938765432",
  },
  {
    id: "5",
    name: "Sân E",
    address: "34 Đường E, Hải Phòng",
    time_start: 6,
    time_end: 18,
    image_portfolio: "/images/stadium5.jpg",
    thumb: "/images/thumb5.jpg",
    rate: 4.2,
    like: true,
    phone: "0901234567",
    booking_month: true,
  },
  {
    id: "6",
    name: "Sân F",
    address: "56 Đường F, Vũng Tàu",
    time_start: 7,
    time_end: 22,
    image_portfolio: "/images/stadium6.jpg",
    thumb: "/images/thumb6.jpg",
    rate: 3.8,
    like: true,
    phone: "0967890123",
  },
  {
    id: "7",
    name: "Sân G",
    address: "78 Đường G, Nha Trang",
    time_start: 6,
    time_end: 20,
    image_portfolio: "/images/stadium7.jpg",
    thumb: "/images/thumb7.jpg",
    rate: 4.7,
    like: false,
    phone: "0945678901",
  },
  {
    id: "8",
    name: "Sân H",
    address: "90 Đường H, Huế",
    time_start: 5,
    time_end: 22,
    image_portfolio: "/images/stadium8.jpg",
    thumb: "/images/thumb8.jpg",
    rate: 4.9,
    like: true,
    phone: "0923456789",
    booking_day: true,
    booking_month: true,
  },
  {
    id: "9",
    name: "Sân I",
    address: "21 Đường I, Biên Hòa",
    time_start: 6,
    time_end: 21,
    image_portfolio: "/images/stadium9.jpg",
    thumb: "/images/thumb9.jpg",
    rate: 3.2,
    like: false,
    phone: "0976543210",
  },
  {
    id: "10",
    name: "Sân J",
    address: "43 Đường J, Bình Dương",
    time_start: 8,
    time_end: 19,
    image_portfolio: "/images/stadium10.jpg",
    thumb: "/images/thumb10.jpg",
    rate: 4.3,
    like: true,
    phone: "0954321098",
    booking_month: true,
  },
]);
</script>
<template>
  <div class="wrapper-dashboard">
    <div class="container">
      <div class="list-stadium">
        <ItemStadium
          v-for="stadium in stadiums"
          :key="stadium.id"
          :stadium="stadium"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-dashboard {
  width: 100%;
  .container {
    width: 95%;
    height: 100%;
    margin: 0px auto;
    .list-stadium {
      padding: 12px 0px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
}
</style>
