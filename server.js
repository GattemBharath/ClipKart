const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KwhLkSDXKb6ZzGp4QmHrdr2EjbxnYZ0JtrvDbiFiksCrakh59uCTnCgWrdONZYlgvLVH6BHxxQvwTeRoesPQ9WT00UY7u0xvF"
);
const app = express();

const { v4: uuidv4 } = require("uuid");
uuidv4();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to ClipKart");
});

app.post("/checkout", async (req, res) => {
  let error;
  let status;

  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const idempotencyKey = Math.random();
    const key = uuidv4();

    const charge = await stripe.paymentIntents.create(
      {
        amount: product.price * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencyKey: key }
    );
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ status });
});

app.listen(8080, () => {
  console.log("Server is listening to 8080...");
});

// // This is your test secret API key.
// const stripe = require("stripe")(
//   "sk_test_51KwhLkSDXKb6ZzGp4QmHrdr2EjbxnYZ0JtrvDbiFiksCrakh59uCTnCgWrdONZYlgvLVH6BHxxQvwTeRoesPQ9WT00UY7u0xvF"
// );
// const express = require("express");
// const app = express();
// app.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:4242";

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log("Running on port 4242"));
