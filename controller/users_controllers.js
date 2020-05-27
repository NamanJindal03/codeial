module.exports.profile = (req,res)=>{
    return res.end('<h1> This is profile page </h1>');
}

module.exports.feed = (req,res) => res.render('feed.ejs');