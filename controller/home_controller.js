module.exports.home = function(req, res){
    return res.render('home.ejs');
}

module.exports.contact = (req,res) => res.end('<h1> Contact us page </h1>');