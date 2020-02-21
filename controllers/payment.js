const stripe = require('stripe')('sk_test_4nxmwOPWpi7wkFV4bQIoS51T00gZYI2ZK8');


exports.payWithStripe = (req, res, next) => {
    
    const fName = req.body.fName;
    const email = req.body.email;
    const amount = req.body.amount;
    const token = req.body.token;

    stripe.customers
      .create({
        name: fName,
        email: email,
        source: token
      })
      .then(customer =>
        stripe.charges.create({
          amount: amount * 100,
          currency: "usd",
          customer: customer.id
        }).then(() => {
            res.status(200).json({ message: 'Payment Successfull' })
        }),
      )
      .catch(err => console.log(err));

};