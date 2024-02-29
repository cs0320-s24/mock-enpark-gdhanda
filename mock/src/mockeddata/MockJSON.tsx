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

  // return list with the files and result maps
  return files;
}

export function MockCSVSearch() {
  const results = new Map();

  // put mock search results in the results map
  results.set("numbers-basic.csv", [["1", "2", "3"]]);
  results.set("numbers-basic.csv/bycol", []);

  results.set("people-header.csv", [
    ["Gavin", "Raj", "Dhanda"],
    ["Eleanor", "Nah", "Park"],
  ]);
  results.set("people-header.csv/bycol", [
    ["Julian", "Madan", "Dhanda"],
    ["Adelle", "Kristyna", "Dhanda"],
    ["Asia", "Max", "Wynn"],
  ]);

  results.set("really-long.csv", []);
  results.set("really-long.csv/bycol", [
    [
      "Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin",
      "Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj",
      "Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda",
    ],
    ["Julian", "Madan", "Dhanda"],
  ]);

  // return list with the files and result maps
  return results;
}
