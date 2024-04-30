import request from 'supertest';
import { app } from '../../src/index';
import { HTTP_STATUSES } from '../../src/constants/statusCodes';
import { ProductCreateModel,  ProductUpdateModel,  ProductViewModel } from '../../src/types/models';

const requestBody: ProductCreateModel = { title: 'orange', price: 2 };
const updatedBody: ProductUpdateModel = { title: 'apple', price: 5 };
const createNewProduct = async (): Promise<ProductViewModel> => {
  const createRequest = await request(app)
    .post('/products')
    .send(requestBody)
    .expect(HTTP_STATUSES.CREATED_201);

  return createRequest.body;
};

describe('/products', () => {
  beforeEach(async () => {
    await request(app).delete('/__test__/products');
  });

  // GET REQUESTS
  it('should return 200 and empty array', async () => {
    await request(app).get('/products').expect(HTTP_STATUSES.OK_200, []);
  });

  it('should return 404 for unexisting product', async () => {
    await request(app).get('/products/1').expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return 200 for existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .get(`/products/${createdProduct.id}`)
      .expect(HTTP_STATUSES.OK_200, createdProduct);
  });

  // POST REQUESTS
  it('should create new product', async () => {
    const createdProduct = await createNewProduct();
    const expectedProduct: ProductViewModel = {
      id: expect.any(Number),
      title: requestBody.title,
    };
    expect(createdProduct).toEqual(expectedProduct);
    await request(app)
      .get('/products')
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  it('should return 400 for incorrect request body', async () => {
    await request(app)
      .post('/products')
      .send({}) // empty body obj
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .post('/products')
      .send({ title: '' }) // empty title
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app).get('/products').expect(HTTP_STATUSES.OK_200, []);
  });

  // PUT REQUESTS
  it('should update existing product', async () => {
    const createdProduct = await createNewProduct();
    const updateRequest = await request(app)
      .put(`/products/${createdProduct.id}`)
      .send(updatedBody)
      .expect(HTTP_STATUSES.OK_200);
    const updatedProduct = updateRequest.body;
    const expectedProduct: ProductViewModel = {
      id: createdProduct.id,
      title: updatedProduct.title,
    };
    expect(updatedProduct).toEqual(expectedProduct);
    await request(app)
      .get('/products')
      .expect(HTTP_STATUSES.OK_200, [expectedProduct]);
  });

  it('should return 404 for updating unexisting product', async () => {
    await request(app)
      .put('/products/' + Number(new Date()))
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return 400 for updating product with incorrect body', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .put(`/products/${createdProduct.id}`)
      .send({}) // empty body obj
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .put(`/products/${createdProduct.id}`)
      .send({ title: '' }) // empty title
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .get('/products')
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  // DELETE REQUESTS
  it('should delete existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .delete(`/products/${createdProduct.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await request(app).get('/products').expect(HTTP_STATUSES.OK_200, []);
  });

  it('should return 404 for deleting unexisting product', async () => {
    await request(app)
      .delete('/products/' + Number(new Date()))
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
});
