const { reactive, toRefs } = Vue;

const reviewForm = {
    template:
    /*html*/
        `<form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        
        <label for="name">Name:</label>
        <input id="name" v-model="name"> 
        
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea> 
        
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating"> 
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        
        <div class="recommendation">
            <label>Would you recommend this product?</label>
            <div>
                <input type="radio" id="recommend-yes" value="Yes" v-model="recommend">  
                <label for="recommend-yes">Yes</label>
                
                <input type="radio" id="recommend-no" value="No" v-model="recommend"> 
                <label for="recommend-no">No</label>
            </div>
        </div>
        
        <input class="button" type="submit" value="Submit">
    </form>`,
    setup(props, { emit }) {
        const form = reactive({
            name: '',
            review: '',
            rating: null,
            recommend: null
        })

        function onSubmit() {
            if (form.name === '' || form.review === '' || form.rating === null || form.recommend === null) {
                alert('Review is incomplete. Please fill out every field.')
                return
            }

            const productReview = {
                name: form.name,
                review: form.review,
                rating: form.rating,
                recommend: form.recommend
            }
            emit('review-submitted', productReview)
            form.name = ''
            form.review = ''
            form.rating = null
            form.recommend = null
        }

        return {
            ...toRefs(form),
            onSubmit
        }
    }
}
