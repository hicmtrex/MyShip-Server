import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
const stripe = new Stripe(
  'sk_test_51KesRYH5cYomygyIffw08jlDMHy9ho25A2libjahdd0vIHGIrJJerzdJqztgKEPob11mgu4F4bUFVY4AaMmY0qBE006wASQ6SX'
);

export const createOrder = asyncHandler(async (req, res) => {
  const { token, amount } = req.body;
  const idempotencyKey = 'QGwP9G74kmdExhPj';
  return stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    });
});
