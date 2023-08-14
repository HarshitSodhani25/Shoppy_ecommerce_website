import mongoose from "mongoose"
const {Schema} = mongoose

const productSchema = new Schema({
    title:{
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        validate:{
            validator: function(value){
                return value > 0;
            },
            message: "Price should be greater than 0",
        }
    },
    discountPercentage:{
        type:Number,
        min:[1, "discount can never be 0"],
        max: [90, "discount cannot exceeds 90"]
    },
    rating:{
        type: Number,
        min: [0,"wrong min rating"],
        max:[6, 'wrong max rating'],
    },
    stock:{
        type: Number,
        default: 0,
    },
    brand:{type: String, required: true},
    thumbnail:{type: String, required: true},
    category:{type: String, required: true},
    images:{type: [String], required: true},
    delete:{type: Boolean, default: false},
})

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){delete ret._id}

})

const Product = mongoose.model("Product", productSchema);
export default Product;