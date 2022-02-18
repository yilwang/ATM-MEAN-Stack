const express = require('express');
const router = express.Router();
const { getCustomerByName, getAllCustomers } = require('../controller/customer.controller');

router.get('/getUser/:firstname/:lastname', getCustomerByName);
router.get('/getAllUsers', getAllCustomers);

module.exports = router;