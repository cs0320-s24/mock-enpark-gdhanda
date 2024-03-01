import { expect, test } from 'vitest';
import * as main from '../../src/main';
import { REPLFunctions } from "../../src/components/REPLFunctions"

test('commandMap maps command to REPLFunction', () => {
  const functionMap = REPLFunctions();
  const loadCommand = functionMap.get("load_csv");
  expect (loadCommand("numbers-basic.csv false")).toBe('Successfully loaded file from "numbers-basic.csv"!');
})
