import Mongoose from "mongoose";
const {Schema} = Mongoose;

const orderSchema = new Schema({
    items: {type: [Schema.Types.Mixed], required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: Schema.Types.Mixed, required: true},
    totalSum: Number,
    totalQuantity: Number,
    payment: String,
    status: {type: String, default: "pending"}
}) 

const virtual = orderSchema.virtual('id');
virtual.get(function(){
    return this._id
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){delete ret._id}
})

const Orders = Mongoose.model("Orders", orderSchema);
export default Orders;