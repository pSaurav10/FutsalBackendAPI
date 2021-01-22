const playerAuth = function(req, res, next){
    console.log('this is auth')
    next();
}

module.exports = playerAuth;