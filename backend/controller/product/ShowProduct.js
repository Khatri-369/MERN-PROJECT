import Product from "../../model/ProductModel.js";

export const ShowProduct = async(req,res)=>{
try{
    const data = await Product.find();

    if(data.length==0){
        return res.status(404).json({
            message: ("PRODUCT DTATA NOT FOUND")
        });
    }
    res.status(200).json(data);
}
catch(error){
    res.status(500).json({
            error: error.message
    });
}
};