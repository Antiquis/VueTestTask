import { defineStore } from 'pinia';

interface Product {
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    installationSelected: false,
  }),
  getters: {
    total(state): number {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalQuantity(state): number {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
  actions: {
    toggleInstallation() {
      this.installationSelected = !this.installationSelected;
    },
    addToCart(product: Product) {
      const existingItem = this.cartItems.find((item) => item.name === product.name);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const cartItem: CartItem = {
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        };
        this.cartItems.push(cartItem);
      }
    },
    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartItems = [];
    },
    increaseQuantity(index: number) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index: number) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
    },
  },
});
