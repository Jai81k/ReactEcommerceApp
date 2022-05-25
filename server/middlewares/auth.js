
exports.verifyToken = (req, res, next) => {
    //const token = req.headers;
    console.log('Verifying the token');

    // call the Callback function
    next();
}