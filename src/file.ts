import * as vscode from "vscode";
import * as os from "os";

export async function editFile(uri: vscode.Uri): Promise<vscode.TextEditor> {
  let doc = await openOrCreateFile(uri);
  return await vscode.window.showTextDocument(doc);
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

export async function editFileWithTemplate(
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
