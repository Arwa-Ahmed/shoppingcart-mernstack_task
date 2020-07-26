const express = require('express');
const router = express.Router();
const Order = require('../models/order');


//////////////////////
router.get("/", async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
  });

  
  router.get("/:id", async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });

  router.delete("/:id", async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });
  //////////////////////////////

  

router.post('/addorder', (req, res, next) => {
    const neworder = new Order({
        user: req.body.user,
        product: req.body.product
    })
    neworder.save().then(result => {
        res.status(200).json({
            products: result
        })
    }).catch(err => {
        res.status(404).json({
            message: err
        })
    })
})

//get orders
router.get('/',(req,res,next)=>{
    //populate like join
    Order.find().populate('user','username').then(doc=>{
        res.status(200).json({
            products: doc
        })

    }).catch(err=>{
        res.status(404).json({
            message: err
        })
    })
})

module.exports = router;