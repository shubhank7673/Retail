const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
// const cartProducts = [];

module.exports.getShopHomepage = (req,res,next) =>{
    // mongoose find method can also be used with cursor using find().cursor()
    Product.find()
        .then((products)=>{
            // console.log(products);
            res.render('shop/index',{docTitle:'Shop',prods:products,path:'/'})
        })
        .catch((err)=>{
            console.log(err);
        })

}
module.exports.getProducts = (req,res,next) => { 
    // console.log('shop.js',Product.fetchAll());
    // res.sendFile(path.join(__dirname,'..','views','shop.html'))

    Product.find()
        .then((products)=>{
            res.render('shop/product-list',{docTitle:'Shop',prods:products,path:'/products'})
        })
        .catch((err)=>{
            console.log(err);
        })
};

module.exports.getProductById = (req,res,next) => {
    const pId = req.params.productId;
    console.log(pId);
    Product.findById(pId)
        .then((product) => {
            res.render('shop/product-detail',{docTitle:product.title,product:product,path:''})
        })
        .catch(err => console.log(err));
}

module.exports.getCart = (req,res,next)=>{

    req.user
        .populate('cart.items.productId')
        .execPopulate()   // to ge the promise
        .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items;
            res.render('shop/cart',{docTitle:'Cart',path:'/cart',products:products});
        })
        .catch(err => console.log('err in shop.js getCart',err));

    // req.user.getCart()
    //         .then(products => {
    //             // console.log(products);
    //         })
    //         .catch(err => {
    //             console.log('err in shop.js getCart',err);
    //         })

}

module.exports.postCart = (req,res,next) => {
    const pId = req.body.productId;
    // console.log(pId);
    Product.findById(pId).then(product => {
        // console.log(product);
        return req.user.addToCart(product);
    }).then(result => {
        console.log(result)
        res.redirect('/cart');
    });
}

module.exports.getCheckout = (req,res,next)=>{  
    res.render('shop/checkout',{docTitle:'Checkout',path:'/checkout'});
}

// module.exports.getOrders = (req,res,next)=>{
//     res.render('shop/orders',{docTitle:'Orders',path:'/orders'});
// }

module.exports.postDeleteCartProduct = (req,res,next) =>{
        const pId = req.body.productId;
        // console.log(pId);
        req.user.deleteFromCart(pId)
                .then((result) => {
                    res.redirect('/cart');     
                })
                .catch(err => {
                    console.log('err in shop.js',err);
                })
}

module.exports.postOrder = (req,res,next) => {
    req.user
        .populate('cart.items.productId') // populating product from product id
        .execPopulate()
        .then(userP => {
            // console.log(userP.cart.items);
            const items = userP.cart.items.map(item => {
                return {product:{...item.productId._doc},qty:item.qty}
            })
            const user = {
                name:userP.name,
                userId:userP._id,
                email:userP.email
            }
            // console.log(items);
            const or = new Order({items:items,user:user});
            or.save()
              .then(result => {
                  req.user.cart = {items:[]};
                  req.user.save();
                  console.log('ordered !!');
                  res.redirect('/');
              })
              .catch(err => console.log(err));
        })
    //  req.user.addOrder()
    //          .then(result=>{
    //              res.redirect('/orders')
    //          })
}

module.exports.getOrders = (req,res,next) => {

    Order.find({'user.userId':req.user._id})
        .then(orders => {
            // console.log(orders);
            res.render('shop/orders',{
                        path:'/orders',
                        docTitle:'orders',
                        orders:orders
                    })
        })
        .catch(err => {
            console.log(err);
        })

    // req.user
    //    .getOrders()
    //    .then(orders => {
    //        res.render('shop/orders',{
    //            path:'/orders',
    //            docTitle:'orders',
    //            orders:orders
    //        })
    //    })
    //    .catch(err =>{
    //        console.log(err);
    //    }) 
}

// module.exports.getDeleteFromCart = (req,res,next) => {
//     Cart.deleteProduct(req.params.productId);
//     res.redirect('/cart');
// }