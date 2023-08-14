import Category from "../model/Category.js";

const fetchCategories = async (req, res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json(categories)
    } catch (error) {
        res.json(400).json(error.message)
    }
}

const createCategory = async (req, res)=>{
    const category = new Category(req.body);
    try{
       const response = await category.save();
       res.status(200).json(response);
    }catch(err){
        res.status(400).json(err.message);
    }
}

export {fetchCategories, createCategory}