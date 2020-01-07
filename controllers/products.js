const Product = require('../models/product');

module.exports.getShopHomepage = (req,res,next) =>{
    res.render('shop/index',{docTitle:'Shop',path:'/'});
}

module.exports.getAddProduct = (req,res,next) => { 
    // res.sendFile(path.join(__dirname,'..','views','add-product.html'));
    res.render('admin/add-product',{docTitle:'add-product',path:'/admin/add-product'})
};

module.exports.postAddProduct = (req,res,next) => { 
    // console.log(req.body);
    reqBody = req.body;
    const p = new Product(reqBody['title']);
    p.save();
    res.redirect('/products');
};

module.exports.getAdminProducts = (req,res,next) =>{
    res.render('admin/products',{docTitle:'admin-products',path:'/admin/products'});
}

module.exports.getProducts = (req,res,next) => { 
    // console.log('shop.js',Product.fetchAll());
    // res.sendFile(path.join(__dirname,'..','views','shop.html'))

    Product.fetchAll((products) => {
            res.render('shop/product-list',{docTitle:'Shop',prods:products,path:'/products'})
        })
};

module.exports.getCart = (req,res,next)=>{
    res.render('shop/cart',{docTitle:'Cart',path:'/cart'});
}

module.exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{docTitle:'Checkout',path:'/checkout'});
}

