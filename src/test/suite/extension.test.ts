import * as assert from "assert";

import * as vscode from "vscode";
import * as dj from "../../extension";
import * as fs from "fs";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start extensions tests.");

  test("dj exports only activate and deactivate", () => {
    assert.deepStrictEqual(Object.keys(dj), ["activate", "deactivate"]);
  });

  test("dj makes capture command available to VS Code", async () => {
    let commands = await vscode.commands.getCommands(true);
    assert(commands.includes("dj.capture"));
  });

  test("dj makes create note command available to VS Code", async () => {
    let commands = await vscode.commands.getCommands(true);
    assert(commands.includes("dj.note"));
  });

  test("dj makes create note from template command available to VS Code", async () => {
    let commands = await vscode.commands.getCommands(true);
    assert(commands.includes("dj.template"));
  });

  test("dj configuration has directory property", async () => {
    let config = vscode.workspace.getConfiguration("dj");
    assert("directory" in config);
  });
});
