const productDisplay = {
    template:
    /*html*/
        `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost out of Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>
                
                <product-details :details="details"></product-details>
                
                <div class="color-selector">
                    <div v-for="(variant,index) in variants" 
                         :key="variant.id" 
                         @mouseover="updateVariant(index)" 
                         class="color-circle" 
                         :style="{backgroundColor: variant.color}">
                    </div>
                </div>
                
                <div class="button-group">
                    <button class="button" 
                            :disabled='!inStock' 
                            @click="addToCart" 
                            :class="{disabledButton: !inStock}">
                        Add To Cart
                    </button>
                    <button class="button remove-button" 
                            @click="removeFromCart" 
                            :disabled="!isProductInCart">
                        Remove From Cart
                    </button>
                </div>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    props: {
        premium: Boolean
    },
    setup(props, { emit }) {
        const shipping = computed(()=>{
            if (props.premium){
                return 'Free'
            } else {
                return '30 Baht'
            }
        })

        const product = ref('Boots')
        const brand = ref('SE 331')
        const inventory = ref(100)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        const reviews = ref([])

        function updateVariant(index) {
            selectedVariant.value = index;
        }

        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })

        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })

        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }

        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }

        function addReview(review) {
            reviews.value.push(review)
            console.log('Review added:', review)
            console.log('All reviews:', reviews.value)
        }

        const title = computed(() => {
            return brand.value + ' ' + product.value
        })

        const isProductInCart = computed(() => {
            return true
        })

        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,
            addToCart,
            removeFromCart,
            updateVariant,
            shipping,
            isProductInCart,
            addReview,
            reviews
        }
    }
}
