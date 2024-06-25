// This is your test secret API key.
const stripe = require("stripe")("sk_test_51KnOM3B4DsFjtDStOnnNt50YvwD25AeUdLII3lljbJeP0ucXLJVNyMKucBkyYwNR58UKX83BlR96h4pliY0E8Joa00ni2DHiMl");

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

export default async function handler(req, res) {
  const { amount } = await req.body;

  console.log(amount)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (1000 * 100),
    currency: "npr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log(paymentIntent)

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};