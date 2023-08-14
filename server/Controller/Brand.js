import Brand from "../model/Brand.js";

const fetchBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        res.status(200).json(brands)
    } catch (error) {
        res.json(400).json(error.message)
    }
}

const createBrand = async (req, res)=>{
    const brand = new Brand(req.body);
    try{
       const response = await brand.save();
       res.status(200).json(response);
    }catch(err){
        res.status(400).json(err.message);
    }
}

export {fetchBrands, createBrand}