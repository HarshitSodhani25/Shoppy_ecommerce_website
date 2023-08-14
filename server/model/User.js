import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:Buffer,
        required: true
    },
    role:{type:String, reuired: true, default: "user"},
    addresses: {type: [Schema.Types.Mixed]},
    name: {type: String, default: 'guest'},
    salt: Buffer
    // orders: {type:[Schema.Types.Mixed]}
})

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){delete ret._id}

})

const User = mongoose.model("User", userSchema);
export default User;