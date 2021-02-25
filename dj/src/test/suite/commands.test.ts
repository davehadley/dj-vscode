import * as assert from "assert";

import * as vscode from "vscode";
import * as commands from "../../commands";
import * as directories from "../../directories";
import * as fs from "fs";
import * as path from "path";

suite("Commands Test Suite", () => {
  vscode.window.showInformationMessage("Start commands tests.");

  test("capture creates a new file in the inbox directory", async () => {
    let editor = await commands.capture();
    await editor.document.save();
    let uri = editor.document.uri;
    assert(fs.existsSync(uri.fsPath));
    assert.strictEqual(
      path.dirname(uri.fsPath),
      await (await directories.inbox()).fsPath
    );
  });
});
