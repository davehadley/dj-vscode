import * as vscode from "vscode";
import * as commands from "./commands";

export function activate(context: vscode.ExtensionContext) {
  console.log("dj activate");
  newcommand(context, "dj.capture", commands.capture);
  newcommand(context, "dj.note", commands.note);
  newcommand(context, "dj.template", commands.template);
}

export function deactivate() {
  console.log("dj deactivate");
}

function newcommand(
  context: vscode.ExtensionContext,
  name: string,
  fn: (...args: any[]) => any
) {
  context.subscriptions.push(vscode.commands.registerCommand(name, fn));
}
