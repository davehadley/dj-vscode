import * as assert from "assert";

import * as vscode from "vscode";
import * as dj from "../../extension";

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	test("Sample test", () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test("dj exports only activate and deactivate", () => {
		assert.deepStrictEqual(Object.keys(dj), ["activate", "deactivate"]);
	});
});
