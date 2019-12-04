var express = require ('express');
var router = express.Router();

router.get('/', function (req, res) {
    // res.send('hello word');
    res.render('index',{
        h1 : 'Dedy keren'
    });
});

router.get('/product', function (req, res) {
    // res.send('hello word');
    res.render('index',{
        h1 : 'produk kutang'
    });
});

module.exports = router;