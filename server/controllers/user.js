
exports.create = (req, res) => {
    console.log({...req.headers}.authtoken);
    res.status(200).json({
        status: 200,
        results: 'User is created successfully!'
    })
};