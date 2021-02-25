import * as vscode from "vscode";

export class Config {
  directory: string | null;

  constructor(directory: string) {
    this.directory = directory;
  }

  static load(): Config {
    let config = vscode.workspace.getConfiguration("dj");
    let directory = config.directory;
    return new Config((directory = directory));
  }
}
