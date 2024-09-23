const Product = require('../models/product');
const productController = require('../controllers/productController');

jest.mock('../models/product');

describe('productController', () => {
  test('addProduct should create a new product', async () => {
    const productData = { name: 'Test Product', description: 'Test description', price: 100 };
    const res = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      })
    };

    // Ensure res is scoped within the test
    await productController.addProduct( { body: productData },res);

    expect(Product).toHaveBeenCalledWith(productData);
    expect(Product.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith({ message: 'Product added successfully' });
  });

  // ... other test cases for productController ...
});