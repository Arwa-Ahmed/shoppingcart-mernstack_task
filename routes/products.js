const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//save image in server
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./productImage/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
});

const upload = multer({storage:storage})
//end of image

router.get('/', (req, res, next) => {
    //get all product from db
    Product.find().select('_id name price image description countInStock').then(doc => {
        //to edit returned doc use map()
        const respone = {
            doc: doc.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    image:doc.image,
                    description:doc.description,
                    countInStock:doc.countInStock,
                    _id: doc._id,
                    url: {
                        type: "GET",
                        urls: 'https://shoppingcart-mernstackapp.herokuapp.com/products/' + doc._id
                    }
                }
            })
        }

        res.status(200).json({
            products: respone
        })
    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })

});

//add product
router.post('/addproduct',upload.single('image'),(req, res, next) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path,
        description: req.body.description,
        countInStock: req.body.countInStock,

    });
    product.save().then(doc => {
        res.status(200).json({
            message: 'product added',
            product:doc
        })
    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })

});

//get one product
router.get('/:productId', (req, res, next) => {
    Product.find({ _id: req.params.productId }).then(result => {
        res.status(200).json({
            product: result
        })
    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })

})

//admin 
//update product
router.patch('/:productId', upload.single('image'),(req, res, next) => {
    const newproduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.path,
        description: req.body.description,
        countInStock: req.body.countInStock,

    }

    Product.update({ _id: req.params.productId }, { $set: newproduct }).then(result => {
        res.status(200).json({
            message: 'product updated'
        })
    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })
})

//delete product
router.delete('/:productId', (req, res, next) => {
    Product.deleteOne({ _id: req.params.productId }).then(result => {
        res.status(200).json({
            message: 'product deleted'
        })

    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })
})

module.exports = router;