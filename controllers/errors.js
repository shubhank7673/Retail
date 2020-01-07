module.exports.Error404 = (req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'..','views','404.html')) ;//('<h1>404 error url not found</h1>');
    res.render('404',{'docTitle':'not found','path':''})
};