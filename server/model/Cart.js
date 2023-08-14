import Mongoose from "mongoose";

const cartSchema = new Mongoose.Schema({
    product: {type: Mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    user: {type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    quantity: {type: Number, default: 1}
})

const virtual = cartSchema.virtual('id');
virtual.get(function(){
    return this._id
})
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){delete ret._id}
})

const Cart = Mongoose.model("Cart", cartSchema);
export default Cart;