const OrderService = require("../../dal/services/OrderService");
const orderService = new OrderService();
const jwt = require('jsonwebtoken');

module.exports = function () {
    let operations = {
        GET,
        POST
    };

    async function GET(req, res, next) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json({
                orders: orders
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }

    async function POST(req, res, next) {
        try {
            const newOrder = await orderService.createOrder(req.body);
            res.status(201).json({
                order: newOrder
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }


    GET.apiDoc = {
        summary: "Retrieve all orders from the database",
        operationId: "get-orders",
        responses: {
            200: {
                description: "Returns a list of all orders",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Order",
                        },
                    },
                },
            },
            500: {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        },
                    },
                },
            },
        },
    };

    POST.apiDoc = {
        summary: "Add a new order to the database",
        operationId: "add-order",
        requestBody: {
            description: "The order to add",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Order"
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Successfully added order",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Order"
                        }
                    }
                }
            },
            500: {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        }
                    }
                }
            }
        }
    };


    return operations;
};