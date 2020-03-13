// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "relay-snapshot-tests-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.createFragmentSnapshotTest",
    e => {
      vscode.window.showInputBox().then(filename => {
        const path = `${e.fsPath}\\${filename}.js`;
        const content = Buffer.from("some content\n");
        writeContent(path, content);
      });
    }
  );

  context.subscriptions.push(disposable);
}

const writeContent = (path: string, content: Buffer) => {
  fs.open(path, "w", function(err: any, fd: any) {
    if (err) {
      vscode.window.showErrorMessage("error opening file: " + err);
    }

    fs.write(fd, content, 0, content.length, null, (err: any) => {
      if (err) {
        vscode.window.showErrorMessage("error writing file: " + err);
      }
      fs.close(fd, () =>
        vscode.window.showInformationMessage("Test Template Generated")
      );
    });
  });
};

// this method is called when your extension is deactivated
export function deactivate() {}
