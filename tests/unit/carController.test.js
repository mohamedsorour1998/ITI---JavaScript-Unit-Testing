const { updateCar } = require("../../src/controllers/carController");
const startDB = require("../../src/helpers/startDB");

const test = require("ava").default;

test.before(async () => {
  console.log("before hook started");
  await startDB();
  console.log("the db is started");
});

test("should update an added car", async (t) => {
  console.log("test case started");
  try {
    const result = await updateCar({
      params: { id: "existing-car-id" },
      body: {
        title: "Updated Car Title",
        tags: ["updated", "car", "tags"],
        price: 999,
        age: 3,
      },
    });

    t.not(result, undefined);
    t.is(result.title, "Updated Car Title");
    t.deepEqual(result.tags, ["updated", "car", "tags"]);
    t.is(result.price, 999);
    t.is(result.age, 3);
  } catch (err) {
    console.error(err);
  }
});
