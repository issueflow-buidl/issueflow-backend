import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/bounties', () => {
    it('should create a bounty', () => {
      const createBountyDto = {
        title: 'Test Bounty',
        description: 'Test description',
        amount: 100,
        currency: 'USD',
        creatorId: 'user123',
      };

      return request(app.getHttpServer())
        .post('/bounties')
        .send(createBountyDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).toBe('Test Bounty');
          expect(res.body.status).toBe('open');
        });
    });

    it('should get all bounties', () => {
      return request(app.getHttpServer())
        .get('/bounties')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
