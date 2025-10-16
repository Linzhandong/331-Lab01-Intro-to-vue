const { createApp, ref, computed } = Vue

const app = createApp({
    setup() {
        const cart = ref({})
        const premium = ref(true)

        function updateCart(id) {
            if (cart.value[id]) {
                cart.value[id] += 1
            } else {
                cart.value[id] = 1
            }
        }

        function removeFromCart(id) {
            if (cart.value[id] && cart.value[id] > 1) {
                cart.value[id] -= 1
            } else if (cart.value[id] === 1) {
                delete cart.value[id]
            }
        }

        const totalItems = computed(() => {
            return Object.values(cart.value).reduce((total, quantity) => total + quantity, 0)
        })

        return {
            cart,
            premium,
            updateCart,
            removeFromCart,
            totalItems
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', ProductDetails)
app.component('review-form', reviewForm)
app.component('review-list', reviewList)
app.mount('#app')
