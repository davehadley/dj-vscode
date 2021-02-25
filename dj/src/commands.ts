import * as vscode from "vscode";
import * as os from "os";
import * as file from "./file";
import * as directories from "./directories";

export async function capture(): Promise<vscode.TextEditor> {
  console.log("dj capture");
  let path = await directories.inbox();
  let uri = vscode.Uri.joinPath(path, "test.md");
  return file.editFile(uri);
}
