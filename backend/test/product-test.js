const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Product = require('../models/Product');
const { createProduct, getProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/product-controller');

chai.use(chaiHttp);

describe('Create product function test', () => {
    let createStub;
    let findOneStub;

    // Reset stubs before each test
    beforeEach(() => {
        createStub = sinon.stub(Product, "create")
        findOneStub = sinon.stub(Product, "findOne");
    });

    // Restore stubs after each test
    afterEach(() => {
        sinon.restore();
    });

    it('should create a product', async function () {
        // Mock request object
        const req = {
            body: {
                name: 'Test Product',
                price: 100,
                description: 'Test Description',
                imageUrl: 'https://test.com/image.jpg'
            }
        };

        // Mock created product
        const createdProduct = {
            id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        findOneStub.resolves(null);
        createStub.resolves(createdProduct);

        // Mock response object
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Call the function
        await createProduct(req, res);

        // Assertions
        chai.expect(findOneStub.calledOnce).to.be.true;
        chai.expect(findOneStub.calledWith({ name: req.body.name })).to.be.true;

        chai.expect(createStub.calledOnce).to.be.true;
        chai.expect(createStub.calledWith({ ...req.body })).to.be.true;

        chai.expect(res.status.calledOnceWith(201)).to.be.true;
        chai.expect(res.json.calledWith(createdProduct)).to.be.true;
    });

    it('should return 400 if product already exists', async function () {
        const req = {
            body: {
                name: 'Existing Product',
                price: 100,
                description: 'Test Description',
                imageUrl: 'https://test.com/image.jpg'
            }
        };

        // Mock an existing product
        const existingProduct = {
            name: 'Existing Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        findOneStub.resolves(existingProduct);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await createProduct(req, res);

        chai.expect(findOneStub.calledOnce).to.be.true;
        chai.expect(findOneStub.calledWith({ name: req.body.name })).to.be.true;

        chai.expect(res.status.calledOnceWith(400)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Product already exists' })).to.be.true;
    });

    it('should return 500 if an error occurs', async function () {
        const req = {
            body: {
                name: 'Test Product',
                price: 100,
                description: 'Test Description',
                imageUrl: 'https://test.com/image.jpg'
            }
        };

        findOneStub.rejects(new Error('Test error'));

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await createProduct(req, res);

        chai.expect(findOneStub.calledOnce).to.be.true;
        chai.expect(findOneStub.calledWith({ name: req.body.name })).to.be.true;

        chai.expect(res.status.calledOnceWith(500)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Test error' })).to.be.true;
    });
});

describe('Get product function test', () => {
    let findStub;
    let findByIdStub;

    // Reset stubs before each test
    beforeEach(() => {
        findStub = sinon.stub(Product, "find");
        findByIdStub = sinon.stub(Product, "findById");
    });

    // Restore stubs after each test
    afterEach(() => {
        sinon.restore();
    });

    it('should get all products', async function () {
        // Mock request object
        const req = {
            query: {}
        };

        // Mock products
        const products = [
            {
                id: new mongoose.Types.ObjectId(),
                name: 'Test Product 1',
                price: 100,
                description: 'Test Description 1',
                imageUrl: 'https://test.com/image1.jpg'
            },
            {
                id: new mongoose.Types.ObjectId(),
                name: 'Test Product 2',
                price: 200,
                description: 'Test Description 2',
                imageUrl: 'https://test.com/image2.jpg'
            }
        ];

        findStub.resolves(products);

        // Mock response object
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Call the function
        await getProducts(req, res);

        // Assertions
        chai.expect(findStub.calledOnce).to.be.true;
        chai.expect(findStub.calledWith({})).to.be.true;

        chai.expect(res.status.calledOnceWith(200)).to.be.true;
        chai.expect(res.json.calledWith(products)).to.be.true;
    });

    it('should get products by name', async function () {
        // Mock request object
        const req = {
            query: {
                name: 'oduct 1'
            }
        };

        // Mock products
        const products = [
            {
                id: new mongoose.Types.ObjectId(),
                name: 'Test Product 1',
                price: 100,
                description: 'Test Description 1',
                imageUrl: 'https://test.com/image1.jpg'
            },
            {
                id: new mongoose.Types.ObjectId(),
                name: 'Test Product 2',
                price: 200,
                description: 'Test Description 2',
                imageUrl: 'https://test.com/image2.jpg'
            }
        ];

        findStub.resolves(products[0]);

        // Mock response object
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Call the function
        await getProducts(req, res);

        // Assertions
        chai.expect(findStub.calledOnce).to.be.true;
        chai.expect(findStub.calledWith({ name: { $regex: req.query.name, $options: 'i' } })).to.be.true;

        chai.expect(res.status.calledOnceWith(200)).to.be.true;
        chai.expect(res.json.calledWith(products[0])).to.be.true;
    });

    it('should get product by ID', async function () {
        // Mock request object
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            }
        };

        // Mock product
        const product = {
            _id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        findByIdStub.resolves(product);

        // Mock response object
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Call the function
        await getProductById(req, res);

        // Assertions
        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(res.status.calledOnceWith(200)).to.be.true;
        chai.expect(res.json.calledWith(product)).to.be.true;
    });

    it('should return 500 if an error occurs', async function () {
        const req = {
            query: {}
        };

        findStub.rejects(new Error('Test error'));

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await getProducts(req, res);

        chai.expect(findStub.calledOnce).to.be.true;
        chai.expect(findStub.calledWith({})).to.be.true;

        chai.expect(res.status.calledOnceWith(500)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Test error' })).to.be.true;
    });
});

describe('Delete product function test', () => {
    let deleteStub;
    let findByIdStub;

    // Reset stubs before each test
    beforeEach(() => {
        deleteStub = sinon.stub(Product, "findByIdAndDelete");
        findByIdStub = sinon.stub(Product, "findById");
    });

    // Restore stubs after each test
    afterEach(() => {
        sinon.restore();
    });

    it('should delete a product', async function () {
        // Mock request object
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            }
        }

        // Mock product
        const product = {
            _id: mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        findByIdStub.resolves(product);
        deleteStub.resolves();

        // Mock response object
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Call the function
        await deleteProductById(req, res);

        // Assertions
        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(deleteStub.calledOnce).to.be.true;
        chai.expect(deleteStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(res.status.calledOnceWith(200)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Product deleted successfully' })).to.be.true;
    });

    it('should return 404 if product does not exist', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            }
        };

        findByIdStub.resolves(null);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteProductById(req, res);

        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(res.status.calledOnceWith(404)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    })

    it('should return 500 if an error occurs', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            }
        };

        const product = {
            _id: mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image'
        }

        findByIdStub.resolves(product);
        deleteStub.rejects(new Error('Test error'));

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteProductById(req, res);

        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(deleteStub.calledOnce).to.be.true;
        chai.expect(deleteStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(res.status.calledOnceWith(500)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Test error' })).to.be.true;
    });
});

describe('Update product function test', () => {
    let findByIdStub;
    let findByIdAndUpdateStub;

    // Reset stubs before each test
    beforeEach(() => {
        findByIdStub = sinon.stub(Product, "findById");
        findByIdAndUpdateStub = sinon.stub(Product, "findByIdAndUpdate");
    });

    // Restore stubs after each test
    afterEach(() => {
        sinon.restore();
    });


    it('should update a product', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            },
            body: {
                name: 'Updated Product',
                price: 200,
                description: 'Updated Description',
                imageUrl: 'https://test.com/updated.jpg'
            }
        };

        const product = {
            _id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        const updatedProduct = {
            _id: new mongoose.Types.ObjectId(),
            name: 'Updated Product',
            price: 200,
            description: 'Updated Description',
            imageUrl: 'https://test.com/updated.jpg'
        };

        findByIdStub.resolves(product);
        findByIdAndUpdateStub.resolves(updatedProduct);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateProductById(req, res);

        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(findByIdAndUpdateStub.calledOnce).to.be.true;
        chai.expect(findByIdAndUpdateStub.calledWith(req.params.productId, req.body, { new: true })).to.be.true;

        chai.expect(res.status.calledOnceWith(200)).to.be.true;
        chai.expect(res.json.calledWith(updatedProduct)).to.be.true;
    });

    it('should return 404 if product does not exist', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            },
            body: {
                name: 'Updated Product',
                price: 200,
                description: 'Updated Description',
                imageUrl: 'https://test.com/updated.jpg'
            }
        };

        findByIdStub.resolves(null);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateProductById(req, res);

        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(res.status.calledOnceWith(404)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    });

    it('should return 400 if price is negativa', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            },
            body: {
                name: 'Updated Product',
                price: -200, // Intentionally negative price
                description: 'Updated Description',
                imageUrl: 'https://test.com/updated.jpg'
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateProductById(req, res);

        chai.expect(res.status.calledOnceWith(400)).to.be.true;
        chai.expect(res.json.firstCall.args[0].message).to.equal('Validation error');
        chai.expect(res.json.firstCall.args[0].error).to.have.property('price');

    });

    it('should return 500 if an error occurs', async function () {
        const req = {
            params: {
                productId: new mongoose.Types.ObjectId()
            },
            body: {
                name: 'Updated Product',
                price: 200,
                description: 'Updated Description',
                imageUrl: 'https://test.com/updated.jpg'
            }
        };

        const product = {
            _id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            imageUrl: 'https://test.com/image.jpg'
        };

        findByIdStub.resolves(product);
        findByIdAndUpdateStub.rejects(new Error('Test error'));

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateProductById(req, res);

        chai.expect(findByIdStub.calledOnce).to.be.true;
        chai.expect(findByIdStub.calledWith(req.params.productId)).to.be.true;

        chai.expect(findByIdAndUpdateStub.calledOnce).to.be.true;
        chai.expect(findByIdAndUpdateStub.calledWith(req.params.productId, req.body, { new: true })).to.be.true;

        chai.expect(res.status.calledOnceWith(500)).to.be.true;
        chai.expect(res.json.calledWith({ message: 'Test error' })).to.be.true;
    });
});
