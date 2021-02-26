import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { Config } from "./config";
import moment = require("moment");

async function ensureDirectoryExists(path: vscode.Uri): Promise<vscode.Uri> {
  await vscode.workspace.fs.createDirectory(path);
  return path;
}

export async function root(config: Config): Promise<vscode.Uri> {
  let directory = config.directory;
  if (!directory) {
    directory = path.join(os.homedir(), "journal");
  }
  let uri = vscode.Uri.file(directory);
  return ensureDirectoryExists(uri);
}

export async function inbox(config: Config): Promise<vscode.Uri> {
  let inbox = vscode.Uri.joinPath(await root(config), "inbox");
  return ensureDirectoryExists(inbox);
}

export async function today(config: Config): Promise<vscode.Uri> {
  let today = vscode.Uri.joinPath(
    await root(config),
    moment().format("YYYY"),
    moment().format("MM"),
    moment().format("DD")
  );
  return ensureDirectoryExists(today);
}
