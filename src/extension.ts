import * as vscode from 'vscode';
import { fixMarkdown } from './fixMarkdown.js';

export function activate(context: vscode.ExtensionContext) {
	console.log("vscode-extension-markdown-quick-fix activated.");

	const disposable = vscode.commands.registerCommand(
		"vscode-extension-markdown-quick-fix.markdown-quick-fix",
		async (uri?: vscode.Uri, selectedUris?: vscode.Uri[]) => {
			if (!uri) {
				vscode.window.showErrorMessage("ドキュメントが読み取れませんでした。");
				return;
			}

			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: "MarkDownの修正中...",
					cancellable: false
				},
				async () => {
					const result = await fixMarkdown(uri);

					// 異常系はビジネスロジック側で密にハンドリングしています。
					if (!result.success) {
						return;
					}

					vscode.window.showInformationMessage("修正可能なLintエラーを修正しました。");
				}
			);
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
