import * as vscode from 'vscode';


export async function findNearestLintConfig (
    targetUri: vscode.Uri,
    configFileName: string
): Promise<vscode.Uri | undefined> {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(targetUri);
    if (!workspaceFolder) {
        return undefined;
    }

    const workspaceRoot = vscode.Uri.joinPath(workspaceFolder.uri, "..");

    let currentUri = targetUri;
    while (true) {
        const candidateUri = vscode.Uri.joinPath(currentUri, configFileName);

        try {
            // ファイルが存在しない場合はthrowされる
            await vscode.workspace.fs.stat(candidateUri);
            vscode.window.showInformationMessage(`設定ファイル: ${candidateUri.fsPath}`);
            return candidateUri;
        } catch {}


        if (currentUri.toString() === workspaceRoot.toString()) {
            return undefined;
        }


        const parentUri = vscode.Uri.joinPath(currentUri, '..');
        if (parentUri.toString() === currentUri.toString()) {
            return undefined;
        }

        currentUri = parentUri;
    }
}
