import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

function getconfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration("dj");
}

async function ensureDirectoryExists(path: vscode.Uri): Promise<vscode.Uri> {
  await vscode.workspace.fs.createDirectory(path);
  return path;
}

export async function root(): Promise<vscode.Uri> {
  let directory = getconfig().directory;
  if (!directory) {
    directory = path.join(os.homedir(), "journal");
  }
  directory = vscode.Uri.file(directory);
  return ensureDirectoryExists(directory);
}

export async function inbox(): Promise<vscode.Uri> {
  let inbox = vscode.Uri.joinPath(await root(), "inbox");
  return ensureDirectoryExists(inbox);
}
