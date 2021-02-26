import * as vscode from "vscode";
import * as os from "os";
import * as file from "./file";
import * as directories from "./directories";
import { Config } from "./config";
import * as moment from "moment";

export async function capture(config?: Config): Promise<vscode.TextEditor> {
  console.log("dj capture");
  config = config || Config.load();
  let path = await directories.inbox(config);
  let filename = moment().format("YYYY-MM-DD_hhmmss");
  let uri = vscode.Uri.joinPath(path, `${filename}.md`);
  return file.editFile(uri);
}

export async function note(config?: Config): Promise<vscode.TextEditor> {
  console.log("dj note");
  config = config || Config.load();
  let path = await directories.today(config);
  let filename = moment().format("YYYY-MM-DD_hhmmss");
  let uri = vscode.Uri.joinPath(path, `${filename}.md`);
  return file.editFile(uri);
}
