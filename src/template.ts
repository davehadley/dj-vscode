import { Config } from "./config";
import * as directories from "./directories";
import * as file from "./file";
import * as vscode from "vscode";
import * as moment from "moment";

export async function template(config: Config): Promise<vscode.TextEditor> {
  let availabletemplates = await getavailabletemplates(config);
  let input = await vscode.window.showInputBox({
    prompt: "Template name",
    validateInput: templatevalidator(availabletemplates),
  });
  input = input || "";
  let template = loadtemplatetext(input, availabletemplates);
  let path = await directories.today(config);
  let filename = moment().format("YYYY-MM-DD_hhmmss");
  let uri = vscode.Uri.joinPath(path, `${filename}.md`);
  return file.editFileWithTemplate(uri, template);
}

function templatevalidator(available: vscode.Uri[]): (arg0: string) => string {
  return () => {
    return "TODO";
  };
}

async function getavailabletemplates(config: Config): Promise<vscode.Uri[]> {
  let templates = await vscode.workspace.fs.readDirectory(
    await directories.templates(config)
  );
  return templates.map(([value, _]) => {
    return vscode.Uri.file(value);
  });
}

function loadtemplatetext(input: string, available: vscode.Uri[]): string {
  // TODO: needs actual implementation
  //vscode.workspace.fs.readFile(available[...]);
  return "";
}
