import * as vscode from "vscode";
import * as os from "os";
import * as file from "./file";
import * as directories from "./directories";
import * as moment from "moment";

export async function capture(): Promise<vscode.TextEditor> {
  console.log("dj capture");
  let path = await directories.inbox();
  let filename = moment().format("YYYY-MM-DD_hh-mm-ss");
  let uri = vscode.Uri.joinPath(path, `${filename}.md`);
  return file.editFile(uri);
}
