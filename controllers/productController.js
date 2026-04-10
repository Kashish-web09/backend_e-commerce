import products from "../models/product.js";
function productData(req,res){
res.render('product',{products});
}

export default productData;