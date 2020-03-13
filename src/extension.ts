// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fragmentTemplate from './__templates__/fragment_template'
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
      
        const outputFilePath = `${e.fsPath}\\${filename}.js`;
        const content = Buffer.from(fragmentTemplate(filename!));
        vscode.workspace.fs
          .writeFile(vscode.Uri.file(outputFilePath), content)
          .then(() => {
            vscode.window.showInformationMessage("Test Template Generated");
          });
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
