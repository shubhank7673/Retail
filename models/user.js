const mongoose = require('mongoose');
const Product = require('./product');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true
     },
     cart: {
         items: [
              {
                 productId:{type:Schema.Types.ObjectId,ref:'Product',required:true},
                 qty:{type:Number,required:true}
              }
            ]
     }
});

userSchema.methods.addToCart = function(product) {
        const cartProductIndex = this.cart.items.findIndex(prod => {
            // console.log(prod);
            return prod.productId.toString() === product._id.toString()
        });
        
        let updatedQty = 1; 
        const updatedCartItems = [...this.cart.items];
        
        if(cartProductIndex >= 0)
        {
            updatedQty = this.cart.items[cartProductIndex].qty + 1;
            updatedCartItems[cartProductIndex].qty = updatedQty;
        }
        else
        {
            updatedCartItems.push({productId:product._id,qty:updatedQty});
        }
        const updatedCart = {
            items : updatedCartItems   
        }
        this.cart = updatedCart;
        return this.save();
}

userSchema.methods.getCart = function()
{
    // console.log(this.cart.items);

    // let cartItems = this.cart.items.map(item => {
    //     return Product.findById(item.productId).then((product)=>{
    //         return {...product,qty:item.qty}
    //     });
    // })
}

userSchema.methods.deleteFromCart = function(pId)
{
    const updatedCartItems = this.cart.items.filter(item => {
                    return item.productId.toString() !== pId.toString()
                })
    this.cart.items = updatedCartItems;
    return this.save();
}

module.exports = mongoose.model('User',userSchema);

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class User {
//     constructor(name,email,cart,_id)
//     {
//         this._id = _id;
//         this.name = name;
//         this.email = email;
//         this.cart = cart; // {items:[],total[]}
//     }

//     save()
//     {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product)
//     {
//         const db = getDb();
//         console.log();
//         const cartProductIndex = this.cart.items.findIndex(prod => {
//             console.log(prod);
//             return prod.productId.toString() === product._id.toString()
//         });
        
//         let updatedQty = 1; 
//         const updatedCartItems = [...this.cart.items];
        
//         if(cartProductIndex >= 0)
//         {
//             updatedQty = this.cart.items[cartProductIndex].qty + 1;
//             updatedCartItems[cartProductIndex].qty = updatedQty;
//         }
//         else
//         {
//             updatedCartItems.push({productId:new mongodb.ObjectId(product._id),qty:updatedQty});
//         }
//         const updatedCart = {
//             items : updatedCartItems   
//         }
//         return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},
//         {$set:{
//                 cart:updatedCart
//               }});
//     }

//     deleteFromCart(pId)
//     {
//         console.log(pId);
//         let updatedCartItems = [...this.cart.items];
//         // console.log(updatedCartItems);
//         updatedCartItems = updatedCartItems.filter(item => {
//             return item.productId.toString() !== pId.toString()
//         })
//         // console.log(updatedCartItems);
//         const db = getDb();
//         return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
//            $set:{cart:{items:updatedCartItems}}
//         })
//     }

//     static findUserById(uId)
//     {
//         const db = getDb();
//         return db.collection('users').findOne({_id:new mongodb.ObjectId(uId)})
//     }

//     getCart()
//     {
//         const db = getDb();
//         const productIds = this.cart.items.map(item =>{
//             return item.productId;
//         });
//         return db.collection('products').find({_id: {$in : productIds}})
//                  .toArray()
//                  .then(products => {
//                      return products.map(p => {
//                          return {
//                              ...p,
//                              qty:this.cart.items.find(item => item.productId.toString() === p._id.toString()).qty
//                                 }
//                      })
//                  })
//     }
//     addOrder()
//     {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new mongodb.ObjectId(this._id),
//                         name: this.name,
//                         email: this.email
//                     }
//                 }
//                 return db.collection('orders').insertOne(order)
//                          .then(result => {
//                              this.cart = {items:[]};
//                              return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
//                                 $set:{cart:{items:[]}}
//                              })
//                          }).catch(err => {
//                              console.log(err);
//                          })
//             })
//     }
//     getOrders()
//     {
//         const db = getDb();
//         return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)}).toArray();
//     }
// }

// module.exports = User;