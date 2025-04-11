const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        tags: [
            {
                type: String
            }
        ],
        price: {
            amount: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                default: 'USD'
            }
        },
        originalPrice: {
            amount: Number,
            currency: {
                type: String,
                default: 'USD'
            }
        },
        discount: {
            type: Number,
            default: 0
        },
        images: [
            {
                type: String
            }
        ],
        stock: {
            inStock: {
                type: Boolean,
                default: true
            },
            quantity: {
                type: Number,
                default: 0
            }
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                rating: Number,
                comment: String,
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        popular: {
            type: Boolean,
            default: false
        },
        bestSeller: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
