import Product from "../model/Product.js";
import express from "express"
const app = express();

app.use(express.json())


const createProduct = async (req, res)=>{
    
    //this product, we get from req.body
    const product = new Product(req.body)
    try {
        const response = await product.save();
        res.status(201).json(response)

    } catch (error) {
        res.status(400).json(error)
    }
} 

const fetchAllProducts = async (req, res)=>{
    let products = Product.find({})
    let totalProductsQuery = Product.find({})

    
    try {
        if(req.query._sort && req.query._order){
            products = products.sort({[req.query._sort]: req.query._order})
            totalProductsQuery = totalProductsQuery.sort({[req.query._sort]: req.query._order})
        }
        if(req.query.category){
            products = products.find({category: req.query.category });
            totalProductsQuery = totalProductsQuery.find({category: req.query.category });
        }
    
        if(req.query.brand){
            products = products.find({brand: req.query.brand});
            totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});
        }
        const totalDocs = await totalProductsQuery.count().exec();
        
        if(req.query._page && req.query._limit){
            const pageSize = req.query._limit;
            const pageNumber = req.query._page;
            products = products.skip(pageSize*(pageNumber-1)).limit(pageSize)
        }
        const docs = await products.exec();
        //we can set the header in express using .set
        res.set("X-Total-Count", totalDocs)
        res.status(200).json(docs);  

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const fetchProductById = async (req, res)=>{
    try{
        const {productid} = req.params
        const product = await Product.findById(productid);
        res.status(203).json(product);
    }catch(err){
        res.status(404).json(err.message);
    }
}

const updateProduct = async(req, res)=>{
        try{
            const {productid} = req.params;
            const product = await Product.findByIdAndUpdate(productid, req.body, {new:true});
            res.status(202).json(product);
        }catch(err){
            res.status(400).json(err.message)
        }
}

export {createProduct, fetchAllProducts, fetchProductById, updateProduct}