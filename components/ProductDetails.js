const { defineComponent } = Vue;

const ProductDetails = defineComponent({
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="product-details">
        <h3>Product Details:</h3>
        <ul>
            <li v-for="detail in details" :key="detail">{{ detail }}</li>
        </ul>
    </div>
    `
});
