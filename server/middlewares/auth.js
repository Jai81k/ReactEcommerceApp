const admin = require('../_firebase');


exports.verifyToken = async (req, res, next) => {
    const token = {...req.headers}.authtoken;
    console.log('Verifying the token', token);
    try {
        // Authenticate with firebase
        const firebaseUser = await admin.auth().verifyIdToken(token);

        // Add to 'req' variable to access globally
        req.user = firebaseUser;

        // call the Callback function
        next();

    } catch (error) {
        console.log('AuthError', error.message);
        res.status(401).json({
            error: `Authentication is failed. ${error.message}`
        });
    }
}