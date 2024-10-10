<template>
  <div class="swiper-container">
    <swiper 
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      navigation
      :pagination="{ clickable: true }"
    >
      <swiper-slide 
        v-for="(product, index) in products" 
        :key="index" 
        class="product-slide"
      >
        <img :src="product.image" alt="Product Image" class="product-image">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price}} ₽</p>
        <button @click="addToCart(product)" class="add-to-cart">Добавить в корзину</button>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { useCartStore } from '~/stores/cart';

import Icon1 from '~/assets/Icon1.svg';
import Icon2 from '~/assets/Icon2.svg';
import Icon3 from '~/assets/Icon3.svg';
import Icon4 from '~/assets/Icon4.svg';

interface Product {
  name: string;
  price: number;
  image: string;
}

const cartStore = useCartStore();

const products: Product[] = [
  { name: 'Вытяжное устройство BXC', price: 12644, image: Icon1 },
  { name: 'Вытяжное устройство G2H', price: 12644, image: Icon2 },
  { name: 'Вытяжное устройство GHN', price: 12644, image: Icon3 },
  { name: 'Вытяжное устройство TDA', price: 12644, image: Icon4 },
  { name: 'Вытяжное устройство BXC', price: 12644, image: Icon1 },
  { name: 'Вытяжное устройство G2H', price: 12644, image: Icon2 },
  { name: 'Вытяжное устройство GHN', price: 12644, image: Icon3 },
  { name: 'Вытяжное устройство TDA', price: 12644, image: Icon4 }
];

const slidesPerView = 4;
const spaceBetween = 30;

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
};

const getProductPrice = (product: Product) => {
  const cartItem = cartStore.cartItems.find(item => item.name === product.name);
  return cartItem ? cartItem.price * cartItem.quantity : product.price;
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  margin: auto;
  padding-top: 30px;
}

.product-slide {
  display: flex;
  background-color: #F6F8FA;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-slide:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  max-width: 200px;
}

.product-name {
  font-size: 1.2em;
  margin: 10px 0 5px;
}

.product-price {
  font-size: 1em;
  margin: 0 0 10px;
  color: #333;
}

.add-to-cart {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #0056b3;
}

.swiper-pagination {
  margin-top: 15px;
  text-align: center;
}
</style>
