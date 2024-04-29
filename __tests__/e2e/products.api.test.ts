import request from 'supertest';
import { app } from '../../src/index';
import { HTTP_STATUSES } from '../../src/constants/statusCodes';

const requestBody = { title: 'orange' };
const updatedBody = { title: 'apple' };
const createNewProduct = async () => {
  return request(app)
    .post('/products')
    .send(requestBody)
    .expect(HTTP_STATUSES.CREATED_201);
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

  it('should return 200 for existing produnct', async () => {
    const createdResponse = await createNewProduct();
    const createdProduct = createdResponse.body;
    await request(app)
      .get(`/products/${createdProduct.id}`)
      .expect(HTTP_STATUSES.OK_200, createdProduct);
  });

  // POST REQUESTS
  it('should create new product', async () => {
    const createResponse = await createNewProduct();
    const createdProduct = createResponse.body;
    expect(createdProduct).toEqual({ id: expect.any(Number), ...requestBody });
    await request(app)
      .get('/products')
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  it('sohuld return 400 for incorrect request body', async () => {
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
    const createResponse = await createNewProduct();
    const createdProduct = createResponse.body;
    const updateRequest = await request(app)
      .put(`/products/${createdProduct.id}`)
      .send(updatedBody)
      .expect(HTTP_STATUSES.OK_200);
    const updatedProduct = updateRequest.body;
    expect(updatedProduct).toEqual({ ...createdProduct, ...updatedBody });
    await request(app)
      .get('/products')
      .expect(HTTP_STATUSES.OK_200, [updatedProduct]);
  });

  it('should return 404 for updating unexisting product', async () => {
    await request(app)
      .put('/products/' + Number(new Date()))
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return 400 for updating product with incorrect body', async () => {
    const createResponse = await createNewProduct();
    const createdProduct = createResponse.body;
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
    const createResponse = await createNewProduct();
    const createdProduct = createResponse.body;
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
