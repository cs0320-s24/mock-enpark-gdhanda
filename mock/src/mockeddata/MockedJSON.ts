export function MockCSVFiles() {
  const files = new Map();

  // Basic csv with numbers no header.
  files.set("numbers-basic.csv", [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]);

  // Basic csv with strings for names with header.
  files.set("people-header.csv", [
    ["First Name", "Middle Name", "Last Name"],
    ["Gavin", "Raj", "Dhanda"],
    ["Julian", "Madan", "Dhanda"],
    ["Adelle", "Kristyna", "Dhanda"],
    ["Asia", "Max", "Wynn"],
    ["Eleanor", "", "Park"],
    ["Eleanor", "Really Long Middle Name", "Park"],
    ["Last", "Row", "Here"],
  ]);

  // Test visual output with a really long csv.
  files.set("really-long.csv", [
    [
      "Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin",
      "Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj",
      "Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda",
    ],
    ["Julian", "Madan", "Dhanda"],
  ]);

  return files;
}
