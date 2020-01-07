// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Er404 = require('./routes/404');
// const db = require('./util/database');
// const mongoConnect = require('./util/database').mongoConnect;
// const getDb = require('./util/database').getDb;
const User = require('./models/user');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const app = express();

// configuration
// app.set('view engine','pug');  //templating engine
app.set('view engine','ejs');  //templating engine
app.set('views','views');  //telling where to find views

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
    const uId = '5dc79f6888abe11ccac9ff8a';
    User.findById(uId)
                    .then(result => {
                        // console.log(result)
                        req.user = result;
                        next();
                    })
                    .catch(err => {
                        console.log(err)
                        next();
                    });
})
app.use('/create-user',(req,res,next) => {
    const u = new User('Shubhank','Shubhank7673@gmail.com');
    u.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(Er404);

mongoose.connect('mongodb+srv://Shubhank:Shubhank12@cluster0-3j5mf.mongodb.net/Shop?retryWrites=true&w=majority')
        .then((result) => {
            User.findOne().then(user => {
                if(!user)
                {
                    const u = new User({
                        name:'Shubhank',
                        email:'Shubhank7673@gmail.com',
                        cart:{
                            items:[]
                        }
                    })
                    u.save();
                }
            })
            app.listen(5000,()=>console.log('server running on port 5000...'))
        })
