import User from "../model/User.js";
import Orders from "../model/Order.js";

const fetchUserById = async (req, res) =>{
    try {
        const {id} = req.user;
        const user = await User.findById(id, 'name email addresses role');
        res.status(302).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateUser = async (req, res)=>{
    try{
        const {id} = req.user;
        const user = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(202).json({id:user.id, email: user.email, addresses: user.addresses, role: user.role, name: user.name});
    }catch(err){
        res.status(400).json(err.message);
    }
}

const fetchOrdersByUserId = async (req, res) => {
    try {
        const {id} = req.user;
        const orders = await Orders.find({user: id});
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export {fetchUserById, updateUser, fetchOrdersByUserId};