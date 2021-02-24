import * as vscode from "vscode";
import * as os from "os";

function newcommand(
  context: vscode.ExtensionContext,
  name: string,
  fn: (...args: any[]) => any
) {
  context.subscriptions.push(vscode.commands.registerCommand(name, fn));
}

async function openOrCreateFile(uri: vscode.Uri): Promise<vscode.TextDocument> {
  try {
    console.log(`trying to open ${uri}`);
    return await vscode.workspace.openTextDocument(uri);
  } catch {
    console.log(`failed to open ${uri}`);
    vscode.window.showInformationMessage(
      `failed to open ${uri}, try to create it`
    );
    let untitleduri = vscode.Uri.parse("untitled:" + uri.fsPath, true);
    console.log(`trying to open ${untitleduri}`);
    return await vscode.workspace.openTextDocument(untitleduri);
  }
}

async function editFile(uri: vscode.Uri): Promise<vscode.TextEditor> {
  let doc = await openOrCreateFile(uri);
  return await vscode.window.showTextDocument(doc);
}

async function editFileWithTemplate(
  uri: vscode.Uri,
  template: string
): Promise<vscode.TextEditor> {
  let edit = await editFile(uri);
  if (edit.document.isUntitled) {
    edit.edit((edit) => {
      edit.insert(new vscode.Position(0, 0), template);
    });
  }
  return edit;
}

function capture() {
	console.log("dj capture");
    let wsfolders = vscode.workspace.workspaceFolders;
    let path = (wsfolders && wsfolders[0].uri) || vscode.Uri.file(os.homedir());
    let uri = vscode.Uri.joinPath(path, "test.md");
    editFile(uri);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("dj activate");
  newcommand(context, "dj.capture", capture);
}

export function deactivate() {
  console.log("dj deactivate");
}
