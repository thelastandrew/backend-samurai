import request from 'supertest';
import { app } from '../../src/app';
import { HTTP_STATUSES, ROUTES } from '../../src/constants';
import { ProductCreateModel,  ProductUpdateModel,  ProductViewModel } from '../../src/types';

const requestBody: ProductCreateModel = { title: 'orange', price: 2 };
const updatedBody: ProductUpdateModel = { title: 'apple', price: 5 };
const updateTitle: ProductUpdateModel = { title: 'apple '};
const updatePrice: ProductUpdateModel = { price: 5 };
const createNewProduct = async (): Promise<ProductViewModel> => {
  const createRequest = await request(app)
    .post(ROUTES.PRODUCTS)
    .send(requestBody)
    .expect(HTTP_STATUSES.CREATED_201);

  return createRequest.body;
};

describe(ROUTES.PRODUCTS, () => {
  beforeEach(async () => {
    await request(app).delete(`${ROUTES.TEST}${ROUTES.PRODUCTS}`);
  });

  // GET REQUESTS
  it('should return 200 and empty array', async () => {
    await request(app).get(ROUTES.PRODUCTS).expect(HTTP_STATUSES.OK_200, []);
  });

  it('should return 404 for unexisting product', async () => {
    await request(app).get(`${ROUTES.PRODUCTS}/1`).expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return 200 for existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .get(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
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
      .get(ROUTES.PRODUCTS)
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  it('should return 400 for incorrect request body', async () => {
    await request(app)
      .post(ROUTES.PRODUCTS)
      .send({}) // empty body obj
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .post(ROUTES.PRODUCTS)
      .send({ title: '' }) // empty title
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app).get(ROUTES.PRODUCTS).expect(HTTP_STATUSES.OK_200, []);
  });

  // PUT REQUESTS
  it('should update existing product with full body', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .send(updatedBody)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const updatedProduct: ProductViewModel = { ...createdProduct, title: updatedBody.title! };

    await request(app)
      .get(ROUTES.PRODUCTS)
      .expect(HTTP_STATUSES.OK_200, [updatedProduct]);
  });

  it('should update title of the existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .send(updateTitle)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const updatedProduct: ProductViewModel = { ...createdProduct, title: updateTitle.title! };

    await request(app)
      .get(ROUTES.PRODUCTS)
      .expect(HTTP_STATUSES.OK_200, [updatedProduct]);
  });

  it('should update price of the existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .send(updatePrice)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await request(app)
      .get(ROUTES.PRODUCTS)
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  it('should return 404 for updating unexisting product', async () => {
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${Number(new Date())}`)
      .send(updatedBody)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return 400 for updating product with incorrect body', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .send({}) // empty body obj
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .put(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .send({ title: '' }) // empty title
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app)
      .get(ROUTES.PRODUCTS)
      .expect(HTTP_STATUSES.OK_200, [createdProduct]);
  });

  // DELETE REQUESTS
  it('should delete existing product', async () => {
    const createdProduct = await createNewProduct();
    await request(app)
      .delete(`${ROUTES.PRODUCTS}/${createdProduct.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await request(app).get(ROUTES.PRODUCTS).expect(HTTP_STATUSES.OK_200, []);
  });

  it('should return 404 for deleting unexisting product', async () => {
    await request(app)
      .delete(`${ROUTES.PRODUCTS}/${Number(new Date())}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
});
