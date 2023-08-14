import Cart from "../model/Cart.js"

const addToCart = async(req, res) => {
    try {
        const {id} = req.user;
        const response1 = await Cart.findOne({user: id, product: req.body.product});
        if(!response1){
            const cartitem = new Cart({...req.body, user: id});
            const response = await cartitem.save()
            const response2 = await Cart.findById(response.id).populate('product');
            res.status(201).json({status: 201, response2});
        }else{
            const item = response1;
            item.quantity = response1.quantity+1;
            const id = response1.id;
            const response = await Cart.findByIdAndUpdate(id, item, {new:true}).populate('product');
            res.status(200).json({status: 200, response});
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const fetchCartByUser = async(req, res) => {
    try {
        const {id} = req.user;
        const items = await Cart.find({user:id}).populate('product');
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

//updating the quantity od the item
const updateCart = async (req, res) => {
    try {
        const {updateid} = req.params;
        const item = await Cart.findByIdAndUpdate(updateid, req.body, {new:true}).populate('product');
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json(error.message);        
    }
}

const deleteItemFromCart = async(req, res) => {
    try{
        const {itemid} = req.params;
        const response = await Cart.findByIdAndDelete(itemid);
        res.status(200).json({status: 'success', message: "item deletedsuccessfully"});
    }catch(err){
        res.status(400).json(err.message)
    }
}

const resetCart = async(req, res) => {
    console.log("reset_cart")
    try{
        const {id} = req.user;
        console.log(id)
        const items = await Cart.find({user: id});
        console.log(items)
        for(let item of items){
            console.log(item)
            await Cart.findByIdAndDelete(item.id);
        }
        res.status(200).json({status: 'success', message: "cart is now empty"})
    }catch(err){
            res.status(400).json(err.message);
    }
}


export {addToCart, fetchCartByUser, updateCart, deleteItemFromCart, resetCart}

// user: 64c78a30d9ebb8d0a7e3d65f,
// "title": "Iphone 10",
// "description": "unbox the new exiting features",
// "price": 100,
// "discountPercentage": 20,
// "rating": 4,
// "stock": 200,
// "brand": "Apple",
// "thumbnail": "https://picsum.photos/200",
// "category": "phones",
// "images": [
//     "https://picsum.photos/200",
//     "https://picsum.photos/200",
//     "https://picsum.photos/200",
//     "https://picsum.photos/200"
// ],
// "delete": true,
// quantity: 1