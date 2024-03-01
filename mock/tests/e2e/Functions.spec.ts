import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
});

test("if i submit with no input, it tells me to enter a command", async ({
  page,
}) => {
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Please specify a command!")).toBeVisible();
});

test("if i enter an invalid command, it says invalid", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid Command!")).toBeVisible();

  await page.reload();
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("invalid arg arg arg");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid Command!")).toBeVisible();
});

test("if i load and reload a csv, it shows me success", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file people-header.csv true");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText('Successfully loaded file from "people-header.csv"!')
  ).toBeVisible();

  // load different file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file numbers-basic.csv false");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText('Successfully loaded file from "numbers-basic.csv"!')
  ).toBeVisible();

  // reload same file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file numbers-basic.csv false");
  await page.getByLabel("Submit").click();
  const count = await page
    .getByText('Successfully loaded file from "numbers-basic.csv"!')
    .count();
  expect(count).toBe(2);
});

test("if i load with invalid arguments, i get an error", async ({ page }) => {
  // no args
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByLabel("Submit").click();

  // too many args
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file 1 2 3");
  await page.getByLabel("Submit").click();

  const count = await page
    .getByText(
      "Invalid load_file arguments! Usage: load_file <filepath> <has-header>."
    )
    .count();
  expect(count).toBe(2);

  // wrong header arg
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file numbers-basic.csv no");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(
      "Invalid input for <has-header>! Valid inputs: 'true', 'false'."
    )
  ).toBeVisible();
});

test("if i load with an invalid csv, i get an error", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file notreal.csv true");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText('Could not load file from "notreal.csv"!')
  ).toBeVisible();
});

test("if i search or view without a file loaded, i get an error", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  // too many args
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 2");
  await page.getByLabel("Submit").click();

  const count = await page
    .getByText('No file loaded. Try "load_file <filepath> <has-header>"!')
    .count();
  expect(count).toBe(2);
});

// test('if i use capital letters, commands still work',

// test('i can switch modes and it starts in brief mode', async ({ page }) => {
//   // start with brief so command: hello is not visible
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("hello");
//   await expect(page.getByText("Invalid Command!")).toBeVisible()
//   await expect(page.getByText("hello!")).not.toBeVisible()

//   // switch to verbose so
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("mode verbose");
//   await page.getByLabel("Submit").click();
//   await expect(page.getByText('Usage: mode <verbose> OR mode <brief>.')).toBeVisible();
// });

// test('if i switch modes with no argument, it prompts me', async ({ page }) => {
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("mode");
//   await page.getByLabel("Submit").click();
//   await expect(page.getByText('Usage: mode <verbose> OR mode <brief>.')).toBeVisible();
// });
