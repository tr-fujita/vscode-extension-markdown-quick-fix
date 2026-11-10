import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('"vscode-extension-markdown-quick-fix" actived.');

	const disposable = vscode.commands.registerCommand(
		'vscode-extension-markdown-quick-fix.helloWorld',
		() => {
			vscode.window.showInformationMessage('Hello World from vscode-extension-markdown-quick-fix!');
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
