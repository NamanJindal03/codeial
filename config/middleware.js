module.exports.setFlash = (req, res, next)=>{
    //console.log('in middleware');
    //console.log("message :" + req.flash('error'));
    res.locals.flash = {
        'success': req.flash('success'),
        'error2': req.flash('error')
        
    }
    //console.dir(JSON.stringify(res.locals.flash));
    next();
}