<template>
  <div class="shop">
    <ShoppingCart class="shoppingCart"/>
    <div class="shop-container">
      <CartItemsList class="cartItem" />
      <Cart class="cart" />
    </div>
    <Swiper />
  </div>
</template>

<script setup>
</script>

<style scoped>
.shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.shop-title {
  font-family: 'Lato', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #1F2432;
  margin-bottom: 20px;
  text-align: center;
}

.shop-container {
  display: grid;
  grid-template-columns: 1fr 25%; 
  gap: 30px;
  width: 100%;
}
.shoppingCart {
  display: flex;
}
</style>
