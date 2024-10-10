<template>
  <div class="cart">
    <h3>Итого</h3>
    <div class="quantity">
      <p>Общая Стоимость:</p>
      <div class="total-cost-price">{{ total }} ₽</div>
    </div>
    <div class="quantity">
      <p>Количество товаров: {{ totalQuantity }} шт</p>
    </div>
    <div class="installation-option">
      <p>Установка: {{ installationSelected ? 'Да' : 'Нет' }}</p>
    </div>
    <div class="total-cost">
      <div class="total-cost-text">Стоимость товаров</div>
      <div class="total-cost-price">{{ total }} ₽</div>
    </div>
    <button class="buttonToBuy" @click="submitOrder">Оформить заказ</button>
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

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
}

.total-cost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #AEB0B6;
  ;
}

.total-cost-text {
  font-size: 20px;
  font-weight: 600;
}
.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center
}
.total-cost-price {
font-family: Roboto sans-serif;
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
}
</style>
