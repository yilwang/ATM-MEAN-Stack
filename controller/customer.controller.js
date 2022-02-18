const Customer = require("../models/user.model");
const getAllCustomers = (req, res) => {
    Customer.find({}).then(customer => {
        return res.status(200).json(customer);
    }).catch(error => {
        return res.status(200).json(error);
    });
};

const getCustomerByName = (req, res) => {
    if (req.params.firstname && req.params.lastname && typeof req.params.firstname === 'string' && typeof req.params.lastname === 'string') {
        Customer.find({
            "first_name": req.params.firstname,
            "last_name": req.params.lastname
        }).then(customer => {
            const final_object = {};
            final_object.status = 'success';
            final_object.customer = customer[0];

            return res.status(200).json(final_object);
        }).catch(error => {
            const final_object = {};
            final_object.status = 'failure';
            final_object.error = error;

            return res.status(404).json(final_object);
        });
    } else {
        const final_object = {};
        final_object.status = 'failure';
        final_object.error = 'Invalid Parameters';

        return res.status(400).json(final_object);
    }

};

const addCustomer = (customer) => {
    if (!customer || !customer.first_name || !customer.last_name || !customer.pin) {
        return "Invalid data!";
    }
    Customer.save({
        "first_name": first_name,
        "last_name": last_name
    }).then(customer => {
        return customer;
    }).catch(error => {
        return error;
    });

};

module.exports = {
    getAllCustomers,
    getCustomerByName,
    addCustomer
};