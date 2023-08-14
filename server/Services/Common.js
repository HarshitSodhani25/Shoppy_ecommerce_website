import passport from "passport"

//it contains functions that any body can use

function isAuth(req, res, done){
    return passport.authenticate('jwt')
}
const sanitizeUser = (user) => {
    return {id: user.id, email: user.email, role: user.role};
} 

//custom cookies extracter funciton to extract cookies from headers
const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};


export {isAuth, sanitizeUser, cookieExtractor}