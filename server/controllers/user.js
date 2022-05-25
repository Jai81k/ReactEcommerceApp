
exports.create = (req, res) => {
    console.log({...req.headers}.authtoken);
    res.json({
        status: 200,
        results: 'User is created successfully!'
    })
};