




// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

// module.exports = class Cart{
//     static addProduct(id , productPrice)
//     {
//         fs.readFile(p,(err,fileContent)=>{
//             let cart = {products:[],totalPrice:0};
//             if(!err && fileContent!='')
//             {
//                 cart = JSON.parse(fileContent);
//             }
//             const productIndex = cart.products.findIndex(prod => prod.id===id);
//             let product = cart.products[productIndex];
//             if(product)
//             {
//                 product.qty = product.qty + 1;
//                 cart.products[productIndex] = product;
//             }
//             else
//             {
//                 product = {id:id,qty:1,price:productPrice};
//                 cart.products.push(product);
//             }
//             cart.totalPrice = (parseInt(cart.totalPrice,10) + parseInt(productPrice,10)).toString() ;
//             fs.writeFile(p,JSON.stringify(cart),(err)=>{
//                 console.log(err);
//             })
//         })
//     }
//     static deleteProduct(id)
//     {
//         fs.readFile(p,(err,fileContent) => {
//             if(err)
//             {
//                 return;
//             }
//             let cart = {products:[],totalPrice:0};
//             if(!err && fileContent!='')
//             {
//                 cart = JSON.parse(fileContent);
//             }

//             const updatedCart = {...cart};
//             const product = updatedCart.products.find(prod => prod.id===id);
//             if(product)
//             {
//                 const productQty = product.qty;
//                 updatedCart.products = updatedCart.products.filter(prod => prod.id != id);
//                 updatedCart.totalPrice = updatedCart.totalPrice - productQty*product.price;
//                 fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
//                     console.log(err);
//                 })
//             }
//         })
//     }
//     static getProducts(cb)
//     {
//         fs.readFile(p,(err,fileContent)=>{
//             const cart = JSON.parse(fileContent);
//             // console.log(cart);
//             if(err || cart==='')
//             {
//                 cb(null);
//             }
//             else
//             {
//                 cb(cart);
//             }
//         })
//     }
// }