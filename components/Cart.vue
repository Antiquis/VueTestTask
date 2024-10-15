<template>
  <div class="cart">
    <h3 class="cartTitle">Итого</h3>
    <div class="quantity">
      <p>Общая Стоимость:</p>
      <div class="total-cost-price">{{ total }} ₽</div>
    </div>
    <div class="quantity">
      <p class="">Количество товаров: {{ totalQuantity }} шт</p>
    </div>
    <div class="installation-option">
      <p>Установка: {{ installationSelected ? 'Да' : 'Нет' }}</p>
    </div>
    <div class="total-cost">
      <div class="total-cost-text">Стоимость товаров</div>
      <div class="total-cost-price">{{ total }} ₽</div>
    </div>
    <button class="buttonToBuy" @click="submitOrder">Оформить заказ</button>
    <button class="buttonToFastBuy">Купить в 1 клик</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const installationSelected = computed(() => cartStore.installationSelected);
const totalQuantity = computed(() => cartStore.totalQuantity);
const total = computed(() => cartStore.total);

const submitOrder = async () => {
  const orderData = {
    items: cartStore.cartItems,
    total: total.value,
    installation: installationSelected.value,
  };

  try {
    const response = await $fetch('/api/order', {
      method: 'POST',
      body: orderData,
    });

    if (response.success) {
      alert(response.message);
      cartStore.clearCart();
      router.push('/');
    }
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error);
    alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
  }
};

</script>

<style scoped>

.cartTitle {
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 28.93px;
  text-align: left;
}

.cart {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  border-radius: 10px;
  background: #F6F8FA;
}

h2 {
  color: #1F2432;
  font-family: 'Lato', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 53.03px;
}

.clear-cart-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-cart-button:hover {
  background-color: #0056b3;
}

.installation-option {
  margin: 15px 0;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.2px;
  text-align: left;
}

.total-cost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #AEB0B6;
  ;
}

.total-cost-text {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26.1px;
  text-align: left;

}
.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.2px;
  text-align: left;
}
.total-cost-price {
font-family: 'Roboto', sans-serif;
font-size: 26px;
font-weight: 700;
line-height: 33.8px;
letter-spacing: 0.005em;
text-align: right;
}

.buttonToBuy {
  color: #ffffff;
  cursor: pointer;
  background: #0069B4;
  height: 54px;
  border: none;
  border-radius: 4px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26.1px;
}
.buttonToFastBuy {
  color: #0069B4;
  cursor: pointer;
  background: #ffffff;
  height: 54px;
  border: solid 2px #0069B4;
  border-radius: 4px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26.1px;
}
</style>
