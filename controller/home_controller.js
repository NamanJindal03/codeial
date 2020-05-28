module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie(" hi", 12);
    res.cookie('userId',25);
    
    return res.render('home.ejs');
}

module.exports.contact = (req,res) => res.end('<h1> Contact us page </h1>');

