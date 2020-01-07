const Product = require('../models/product');
const mongodb = require('mongodb');

module.exports.getAddProduct = (req,res,next) => { 
    // res.sendFile(path.join(__dirname,'..','views','add-product.html'));
    res.render('admin/edit-product',{docTitle:'add-product',path:'/admin/add-product',editOn:false})
};

module.exports.postAddProduct = (req,res,next) => { 
    console.log(req.body);
    reqBody = req.body;
    console.log(reqBody);
    const p = new Product({title:reqBody['title'],
                           imageUrl:reqBody['imageUrl'],
                           description:reqBody['description'],
                           price:reqBody['price'],
                           userId:req.user._id   //you can also asign only req.user and mongoose will pick id by itself 
                        });
    p.save()
        .then((result)=>{
            console.log('inserted successfully !!');
            res.redirect('/');
        })
        .catch(err => {
            console.log('err in postAddProduct',err);
        })
};

module.exports.getAdminProducts = (req,res,next) =>{
    Product.find()
        // .select('title price -_id')  // bring only title price exclude _id
        .populate('userId') //,'name -email')->select  // will populated user instead of just showing userId | nested path can also be given here like userId.user
        .then((products)=>{
            // console.log(products);
            res.render('admin/products',{docTitle:'Shop',prods:products,path:'/admin/products'})
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports.getEditProduct = (req,res,next) => {
    const editOn = req.query.edit;
    if(!editOn)
    {
        return res.redirect('/');
    }
    Product.findById(req.params.productId)
        .then(product => {
            res.render('admin/edit-product',{docTitle:'edit-product',path:'/admin/edit-product',editOn:true,product:product});
        })
        .catch(err => {
            console.log('err in admin.js getEditProduct',err);
        })
}
module.exports.postEditProduct = (req,res,next) => {
    reqBody = req.body;
    // console.log('reqBody',reqBody);
    const pId = req.params.productId;
    // console.log(pId);
    Product.findById(pId)
           .then((product)=>{
               product.title = reqBody['title'];
               product.description = reqBody['description'];
               product.price =  reqBody['price'];
               product.imageUrl = reqBody['imageUrl'];
               return product.save();
        })
        .then(() => {
            console.log('product updated successfully !!');
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err));
}

module.exports.postDeleteProduct = (req,res,next) => {
    Product.findByIdAndDelete(req.params.productId)
    .then(()=>{
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log('err in admin.js postDeleteProduct',err);
    })
}