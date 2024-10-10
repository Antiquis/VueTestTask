<template>
  <div>
    <div class="headerCartItem">
      <div class="headerTitle">
        <h2 class="MainTitle">Ваша Корзина</h2>
        <p class="headerPQuantity"> Товаров: {{ totalQuantity }}</p>
      </div>
      <button @click="removeAllFromCart()" class="clear-cart-button">Очистить корзину</button>
    </div>
    <ul v-if="cartItems.length">
      <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="item-details">
          <img :src="item.image" alt="Product Image" class="product-image" />
          <span class="item-name">{{ item.name }}</span>
        </div>
        <div class="quantity-container">
          <button @click="decreaseQuantity(index)" class="quantity-button">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="increaseQuantity(index)" class="quantity-button">+</button>
        </div>
        <div class="item-actions">
          <span class="item-price">{{ item.price * item.quantity }} ₽ </span>
          <div class="remove-container">
            <button @click="removeFromCart(index)" class="remove-button">✖</button>
          </div>
        </div>
      </li>
    </ul>
    <p v-if="!cartItems.length">Корзина пуста</p>
    <div class="instalation">
      <input type="checkbox" v-model="installationSelected" @change="toggleInstallation" />
      <img :src="installationImage" alt="Installation Service" class="instalationImg" />
      <label class="instalationText">
        Установка
        <span class="instalationP">Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров. </span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import installationImage from '~/assets/InstalationIcon.svg';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems);
const installationSelected = computed(() => cartStore.installationSelected);
const totalQuantity = computed(() => cartStore.totalQuantity);

const totalCost = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const removeFromCart = (index) => {
  cartStore.removeFromCart(index);
};

const removeAllFromCart = () => {
  cartStore.clearCart();
};

const increaseQuantity = (index) => {
  cartStore.increaseQuantity(index);
};

const decreaseQuantity = (index) => {
  cartStore.decreaseQuantity(index);
};

const toggleInstallation = () => {
  cartStore.toggleInstallation();
};
</script>

<style scoped>

.MainTitle {
  font-family: 'Lato', sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 53.03px;
  text-align: left;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  background-color: #ffffff;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-name {
  font-weight: bold;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 23.2px;
}

.quantity-container {
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
}

.quantity-button {
  background: #F6F8FA;
  color: #000000;
  height: 34px;
  width: 38px;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.item-actions {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; 
}

.remove-container {
  display: flex;
  align-self: flex-start;
}

.remove-button {
  background-color: transparent;
  border: none;
  color: #5c5c5c;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  transition: color 0.3s;
}

.remove-button:hover {
  color: #616161;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6F8FA;
  color: #000000;
  border-radius: 5px;
  height: 34px;
  width: 38px;
  margin: 0 3px;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.item-price {
  padding-right: 20px;
  color: #333;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  line-height: 26.1px;
}

.headerCartItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-cart-button {
  height: 25px;
  background: transparent;
  color: #797B86;
  border: none;
  border-bottom: 1px solid #797B86; 
  border-radius: 0;
  cursor: pointer;
  outline: none;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.clear-cart-button:focus {
  outline: none; 
}
.headerPQuantity {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 26.1px;
  text-align: left;
  color: #797B86;
}
.headerTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
}

.instalation {
  display: flex;
  background: #F6F8FA;
  gap: 10px;
  padding: 10px;
}
.instalationP {
  color: #797B86;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}
.instalationText {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 23.2px;
}
.instalationImg {
  height: 35px;
  width: 35px;
}
</style>
