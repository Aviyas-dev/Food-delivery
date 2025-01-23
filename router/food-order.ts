// import express from "express";

// const router = express.Router();

// // Dummy order data
// let orders = [
//   {
//     id: 1,
//     customer: "test@gmail.com",
//     food: "2 foods",
//     date: "2024/12/20",
//     total: "$26.97",
//     deliveryAddress: "123, Main Street, City",
//     deliveryState: "Pending",
//   },
//   {
//     id: 2,
//     customer: "test2@gmail.com",
//     food: "1 food",
//     date: "2024/12/21",
//     total: "$15.50",
//     deliveryAddress: "456, Elm Street, City",
//     deliveryState: "Delivered",
//   },
// ];

// // GET: Get all orders
// router.get("/orders", (req, res) => {
//   res.json(orders);
// });

// // POST: Add a new order
// router.post("/orders", (req, res) => {
//   const newOrder = { id: orders.length + 1, ...req.body };
//   orders.push(newOrder);
//   res.status(201).json(newOrder);
// });

// // PUT: Update order delivery state
// router.put("/orders/:id", (req, res) => {
//   const { id } = req.params;
//   const { deliveryState } = req.body;

//   const order = orders.find((o) => o.id === parseInt(id));
//   if (!order) {
//     res.status(404).json({ message: "Order not found" });
//   }

//   order.deliveryState = deliveryState;
//   res.json(order);
// });

// export default router;

