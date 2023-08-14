import Orders from "../model/Order.js"

//populate is used when we have to expand the product else not used

const createOrder = async (req, res) =>{
    try {
        const {id} = req.user;
        const order = new Orders({...req.body, user: id});
        const response = await order.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const fetchAllOrders = async (req, res) => {
    let orders = Orders.find({});
    let totalOrdersQuery = Orders.find({});   
    try {
        if(req.query._sort && req.query._order){
            orders = orders.sort({[req.query._sort]: req.query._order})
            totalOrdersQuery = totalOrdersQuery.sort({[req.query._sort]: req.query._order})
        }
        const totalDocs = await totalOrdersQuery.count().exec();

        if(req.query._page && req.query._limit){
            const pageSize = req.query._limit;
            const pageNumber = req.query._page;
            orders = orders.skip(pageSize*(pageNumber-1)).limit(pageSize)
        }
        const docs = await orders.exec();
        //we can set the header in express using .set
        res.set("X-Total-Count", totalDocs)
        res.status(200).json(docs);  

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const updateOrder = async (req, res) => {
    try {
        const {orderid} = req.params;
        const order = await Orders.findByIdAndUpdate(orderid, req.body, {new:true})
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export {createOrder, fetchAllOrders, updateOrder};

// {
//     "user": "64c875df2950e48e904e938e",
//     "products": "64bbaa76dd7bbcf4019709e2",
//     "address": {"name": "Harshit Sodhani",
//       "email": "harshit25sodhani@gmail.com",
//       "phoneNumber": "9827201234",
//       "streetAddress": "A-1/4, vinayxxxxxx ",
//       "city": "Gwaxxxxx",
//       "state": "mp",
//       "postalCode": "47xxxx"
//     },
//     "totalSum": 12236,
//     "totalQuantity": 12,
//     "payment": "cash",
// }