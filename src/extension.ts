// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  fragmentTemplate,
  componentTemplate,
  mutationTemplate
} from "./__templates__";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "relay-snapshot-tests-generator" is now active!');
  context.subscriptions.push(fragmentCommand());
  context.subscriptions.push(componentCommand());
  context.subscriptions.push(mutationCommand());
}
// this method is called when you run the context menu fragment command
const fragmentCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "extension.createFragmentSnapshotTest",
    e => {
      vscode.window.showInputBox().then(filename => {
        const outputFilePath = `${e.fsPath}\\${filename}.js`;
        const content = Buffer.from(fragmentTemplate(filename!));
        vscode.workspace.fs
          .writeFile(vscode.Uri.file(outputFilePath), content)
          .then(() => {
            vscode.window.showInformationMessage("Fragment Template Generated");
          });
      });
    }
  );
};

// this method is called when you run the context menu component command
const componentCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "extension.createComponentSnapshotTest",
    e => {
      vscode.window.showInputBox().then(filename => {
        const outputFilePath = `${e.fsPath}\\${filename}.js`;
        const content = Buffer.from(componentTemplate(filename!));
        vscode.workspace.fs
          .writeFile(vscode.Uri.file(outputFilePath), content)
          .then(() => {
            vscode.window.showInformationMessage(
              "Component Template Generated"
            );
          });
      });
    }
  );
};

// this method is called when you run the context menu mutation command
const mutationCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand("extension.createMutationTest", e => {
    vscode.window.showInputBox().then(filename => {
      const outputFilePath = `${e.fsPath}\\${filename}.js`;
      const content = Buffer.from(mutationTemplate(filename!));
      vscode.workspace.fs
        .writeFile(vscode.Uri.file(outputFilePath), content)
        .then(() => {
          vscode.window.showInformationMessage("Mutation Template Generated");
        });
    });
  });
};

// this method is called when your extension is deactivated
export function deactivate() {}
