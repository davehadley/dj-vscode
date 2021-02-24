import * as vscode from "vscode";
import * as os from "os";
import * as file from "./file";

export function capture() {
	console.log("dj capture");
    let wsfolders = vscode.workspace.workspaceFolders;
    let path = (wsfolders && wsfolders[0].uri) || vscode.Uri.file(os.homedir());
    let uri = vscode.Uri.joinPath(path, "test.md");
    file.editFile(uri);
}