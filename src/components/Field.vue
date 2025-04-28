<script lang="ts" setup>
import { createDuration } from "@/utils/field";
import { onMounted, ref } from "vue";

const hours = createDuration(30);
const elemetTitleParent = ref<HTMLElement | null>(null);
const elemetTitleChildren = ref<HTMLElement | null>(null);
const elemetContainerEmpty = ref<HTMLElement | null>(null);

onMounted(() => {
  // tính cái width của cái container empty để đẩy list hours nó dài ra cho hợp với item booking
  if (elemetTitleParent.value && elemetTitleChildren.value) {
    elemetContainerEmpty.value.style.width = `${
      elemetTitleParent.value.offsetWidth +
      elemetTitleChildren.value.offsetWidth -
      20
    }px`;
  }
});
</script>
<template>
  <div class="wrapper-field">
    <div class="container">
      <div class="hours">
        <div class="container-emty" ref="elemetContainerEmpty"></div>
        <div class="item-hour" v-for="hour in hours" :key="hour">
          {{ hour }}
        </div>
      </div>
      <div class="container-content-booking">
        <div class="content-booking">
          <div class="container-service">
            <div class="service-parent" ref="elemetTitleParent">
              <span>Bóng đá sân 7</span>
            </div>
            <div class="service-children">
              <div class="children">
                <div class="title-service-children" ref="elemetTitleChildren">
                  <span>B.Đá 7.1</span>
                </div>
                <div class="attributes">
                  <div class="item-attribute" v-for="attribute in hours"></div>
                </div>
              </div>
              <div class="children">
                <div class="title-service-children" ref="elemetTitleChildren">
                  <span>B.Đá 7.1</span>
                </div>
                <div class="attributes">
                  <div class="item-attribute" v-for="attribute in hours"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-service">
            <div class="service-parent" ref="elemetTitleParent">
              <span>Bóng đá sân 7</span>
            </div>
            <div class="service-children">
              <div class="children">
                <div class="title-service-children" ref="elemetTitleChildren">
                  <span>B.Đá 7.1</span>
                </div>
                <div class="attributes">
                  <div class="item-attribute" v-for="attribute in hours"></div>
                </div>
              </div>
              <div class="children">
                <div class="title-service-children" ref="elemetTitleChildren">
                  <span>B.Đá 7.1</span>
                </div>
                <div class="attributes">
                  <div class="item-attribute" v-for="attribute in hours"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper-field {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .hours {
      width: fit-content;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      background-color: #b2eefb;
      .item-hour {
        flex: 0 0 auto;
        width: 40px;
        text-align: center;
        position: relative;
        font-size: 12px;
        padding: 6px;
      }
      .item-hour::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 2px;
        height: 5px;
        background: orange;
        transform: translateX(-50%);
      }
    }
    .container-content-booking {
      width: 100%;
      .content-booking {
        width: fit-content;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        gap: 12px;
        .container-service {
          display: flex;
          .service-parent {
            background-color: #d2f7e5;
            min-width: 120px;
            max-width: 120px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            padding: 6px;
            border-right: 1px solid #ccc;
          }
          .service-parent,
          .title-service-children {
            background-color: #d2f7e5;
            padding: 6px;
            font-size: 14px;
            width: 60px;
            text-align: center;
          }
          .service-children {
            width: 100%;
            display: flex;
            flex-direction: column;
            .children {
              display: flex;
              width: 100%;
              min-height: 40px;
              .title-service-children {
                min-width: 120px;
                max-width: 120px;
                text-align: center;
                background-color: #d2f7e5;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #ccc;
                font-size: 14px;
                border-bottom: 1px solid #ccc;
              }
              .attributes {
                flex: 1;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                .item-attribute {
                  flex: 0 0 auto;
                  width: 40px;
                  height: 40px;
                  background-color: #fff;
                  border: 1px solid #ccc;
                }
              }
              &:last-child .title-service-children {
                border-bottom: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
