const Order = require('../models/order');
const Product = require('../models/product'); // Assuming you update product quantities
const orderController = require('../controllers/orderController');

jest.mock('../models/order');
jest.mock('../models/product');

describe('orderController', () => {
  test('placeOrder should create a new order and update product quantities', async () => {
    const orderData = {
      products: [{ productId: '123', quantity: 2 }],
      // ... other required order data
    };
    const productMock = { quantity: 5, save: jest.fn().mockResolvedValue({}) }; // Mock product behavior if needed
    Product.mockImplementation(() => productMock);
    const orderMock = jest.fn().mockImplementation(() => ({ save: jest.fn().mockResolvedValue({}) })); // Mock order behavior
    Order.mockImplementation(orderMock);
    const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      };

    await orderController.placeOrder( { body: orderData },res);

    expect(orderMock).toHaveBeenCalledWith(orderData); // Expect mocked constructor call
    expect(orderMock().save).toHaveBeenCalled(); // Expect mocked save call
    expect(Product).toHaveBeenCalledWith('123'); // Expect product lookup (if applicable)
    expect(productMock.save).toHaveBeenCalled(); // Expect product update (if applicable)
  });

  // ... other test cases for orderController ...
});