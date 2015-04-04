exports.render = index;

function index(req, res) {
    res.render('index', {title: 'Hello from the index template model'});
};