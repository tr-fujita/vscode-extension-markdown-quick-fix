import * as vscode from 'vscode';
import { fixMarkdown } from './fixMarkdown.js';
import { timeoutedMessage } from './lib/timeoutedMessage.js';

export function activate(context: vscode.ExtensionContext) {
	console.log('"vscode-extension-markdown-quick-fix" actived.');

	const disposable = vscode.commands.registerCommand(
		"vscode-extension-markdown-quick-fix.markdownQuickFix",
		async (uri?: vscode.Uri, selectedUris?: vscode.Uri[]) => {
			if (!uri) {
				vscode.window.showErrorMessage("ドキュメントが読み取れませんでした。");
				return;
			}

			await fixMarkdown(uri);
			timeoutedMessage("修正可能なLintエラーを修正しました。", 3000);
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
