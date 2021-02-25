import * as assert from "assert";

import * as vscode from "vscode";
import * as commands from "../../commands";
import * as directories from "../../directories";
import * as fs from "fs";
import * as path from "path";
import * as moment from "moment";
import { Config } from "../../config";
import * as os from "os";

function testconfig(): Config {
  let directory = fs.mkdtempSync(path.join(os.tmpdir(), "testdj"));
  return new Config((directory = directory));
}

suite("Commands Test Suite", function () {
  this.timeout(10000);

  vscode.window.showInformationMessage("Start commands tests.");

  test("capture creates a new file in the inbox directory", async () => {
    let config = testconfig();
    let editor = await commands.capture((config = config));
    await editor.document.save();
    let uri = editor.document.uri;
    assert(fs.existsSync(uri.fsPath));
    assert.strictEqual(
      path.dirname(uri.fsPath),
      await (await directories.inbox(config)).fsPath
    );
  });

  test("capture creates a new file with unique name", async () => {
    let config = testconfig();
    let name = moment().format("YYYY-MM-DD_hh"); // don't check min/secs as might fail
    let editor = await commands.capture((config = config));
    await editor.document.save();
    let uri = editor.document.uri;
    assert(fs.existsSync(uri.fsPath));
    assert(uri.fsPath.includes(name));
  });
});
