<template>
    <div class="cart">
        <div class="VectorImgDiv">
            <img :src="VectorIcon" alt="Vector" class="VectorImg" />
        </div>
        <span class="quantity">Ваша корзина</span>
      <div class="quantity">
          <div class="total-cost-price">{{ total }} ₽</div>
      </div>
      <div class="quantity">
        <span>Товаров {{ totalQuantity }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useCartStore } from '~/stores/cart';

  import VectorIcon from '~/assets/VectorIcon.svg';
  
  const cartStore = useCartStore();
  
  const totalQuantity = computed(() => cartStore.totalQuantity);
  const total = computed(() => cartStore.total)
  </script>
  
  <style scoped>
  .cart {
    width: 100%;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .quantity {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 17.4px;
  }
  .VectorImg {
    height: 35px;
    width: 35px;
  }
  .VectorImgDiv {
    display: flex;
    justify-content: flex-end;
  }
  .total-cost-price {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 17.4px;
  text-align: left;
  }
  </style>
  