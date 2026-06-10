import Order from "../model/ordermodel.js";
import Product from "../model/productmodel.js";

export const getOrders = async (req, res) => {
    try {
        // Query orders where at least one item belongs to this shop
        const orders = await Order.find({ "items.shopId": req.shopId }).sort({ ordereddate: -1 });
        return res.status(200).json({
            orders
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const simulateOrder = async (req, res) => {
    try {
        // Pool of random customer names
        const customers = [
            "John Wick", "Bruce Wayne", "Tony Stark", "Peter Parker",
            "Diana Prince", "Clark Kent", "Wanda Maximoff", "Natasha Romanoff",
            "Sherlock Holmes", "Hermione Granger", "Luke Skywalker", "Harry Potter"
        ];

        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];

        // Retrieve real products from the shared e-commerce product collection
        const dbProducts = await Product.find({});

        let orderedItems = [];
        let totalprice = 0;

        if (dbProducts && dbProducts.length > 0) {
            const productsToPickCount = Math.min(dbProducts.length, Math.floor(Math.random() * 3) + 1);
            const shuffledProducts = [...dbProducts].sort(() => 0.5 - Math.random());
            const pickedProducts = shuffledProducts.slice(0, productsToPickCount);

            pickedProducts.forEach(product => {
                const quantity = Math.floor(Math.random() * 3) + 1;
                const itemTotal = product.price * quantity;
                totalprice += itemTotal;
                
                orderedItems.push({
                    product: product.productname,
                    quantity: quantity,
                    price: product.price,
                    shopId: req.shopId
                });
            });
        } else {
            // Fallback default e-commerce catalog
            const defaultProducts = [
                { name: "iPhone 15 Pro Max", price: 139999 },
                { name: "Dell XPS 13 Laptop", price: 119999 },
                { name: "Sony WH-1000XM5 Headphones", price: 29999 },
                { name: "Logitech MX Master 3S Mouse", price: 9499 },
                { name: "Nike Air Jordan 1 Shoes", price: 12999 }
            ];

            const pickedCount = Math.floor(Math.random() * 2) + 1;
            const shuffledDefaults = [...defaultProducts].sort(() => 0.5 - Math.random());
            const pickedDefaults = shuffledDefaults.slice(0, pickedCount);

            pickedDefaults.forEach(item => {
                const quantity = Math.floor(Math.random() * 2) + 1;
                const itemTotal = item.price * quantity;
                totalprice += itemTotal;

                orderedItems.push({
                    product: item.name,
                    quantity: quantity,
                    price: item.price,
                    shopId: req.shopId
                });
            });
        }

        const statuses = ["Pending", "Preparing", "Delivered"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const newOrder = new Order({
            customerName: randomCustomer, // Simulation identifier
            items: orderedItems,
            totalprice: totalprice,
            orderstatus: randomStatus,
            deliveryaddress: "123 Sim Area, Landmark City"
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            message: "NEW ORDER SIMULATED SUCCESSFULLY",
            order: savedOrder
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "STATUS IS REQUIRED" });
        }

        const order = await Order.findOneAndUpdate(
            { _id: id, "items.shopId": req.shopId },
            { orderstatus: status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "ORDER NOT FOUND OR NOT AUTHORIZED" });
        }

        return res.status(200).json({
            message: "ORDER STATUS UPDATED SUCCESSFULLY",
            order
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
