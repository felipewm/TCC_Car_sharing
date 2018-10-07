module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({error: "É preciso se logar"});
    }

    next(); 

};