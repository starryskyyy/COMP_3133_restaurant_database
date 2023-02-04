const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    address: {
        building: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            required: [true, "Please provide street name"],
            trim: true
        },
        zipcode: {
            type: String,
            default: null,
            trim: true
        }
    },
    city: {
        type: String,
        required: [true, "Please provide city"],
        trim: true
    },
    cuisine: {
        type: String,
        required: [true, "Please provide cousine"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "Please provide restaurant name"],
        trim: true
    },
    restaurant_id: {
        type: Number
    },

    created: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
})

RestaurantSchema.pre('save', (next) => {
    console.log("Before Save")
    let now = Date.now()

    this.updatedat = now

    if (!this.created) {
        this.created = now
    }
    next()
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;