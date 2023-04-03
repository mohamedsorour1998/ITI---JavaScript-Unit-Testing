const {
  getLicenseValidity,
  transformArryToString,
} = require("../../src/helpers/utils");

const test = require("ava").default;
const sinon = require("sinon");

test("should join array elements with delimiter", (t) => {
  const input = ["apple", "banana", "cherry"];
  const delimiter = ",";
  const expectedOutput = "apple,banana,cherry";
  const actualOutput = transformArryToString(delimiter, input);
  t.is(actualOutput, expectedOutput);
});
test("should throw error if delimiter is not a string", (t) => {
  const input = ["apple", "banana", "cherry"];
  const delimiter = 1;
  const error = t.throws(() => {
    transformArryToString(delimiter, input);
  });
  t.is(error.message, "invalid delimeter");
});

test('getLicenseValidity should return "valid" if current year is before 2026', (t) => {
  const clock = sinon.useFakeTimers(new Date("2023-01-01")); // Set the current time to 2023
  const result = getLicenseValidity();
  t.is(result, "valid");
  clock.restore(); // Restore the original clock
});

test('getLicenseValidity should return "invalid" if current year is after 2026', (t) => {
  const clock = sinon.useFakeTimers(new Date("2028-01-01")); // Set the current time to 2028
  const result = getLicenseValidity();
  t.is(result, "invalid");
  clock.restore(); // Restore the original clock
});
