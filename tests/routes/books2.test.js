import { it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";

import buildApp from "../../src/app.js";
import BookRepo from "../../src/repository/books-repo.js";
import Context from "../context.js";

let context;

beforeAll(async () => {
  context = await Context.build();
});

afterAll(async () => {
  await context.close();
});

it("creates 2 books", async () => {
  const startCount = await BookRepo.count();

  await request(buildApp())
    .post("/books")
    .send({
      title: "Scikit Learn & Pytorch",
      author: "Sebastian Rashka",
      price: 1000,
    })
    .expect(200);

  await request(buildApp())
    .post("/books")
    .send({
      title: "Scikit Learn & Tensorflow",
      author: "Gaeron",
      price: 1400,
    })
    .expect(200);

  const finishCount = await BookRepo.count();

  expect(finishCount - startCount).toEqual(1);
});
