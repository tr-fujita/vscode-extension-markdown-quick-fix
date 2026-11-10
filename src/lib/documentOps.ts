import * as vscode from 'vscode';

export const documentOps = {
    /**
     * 全読み取り
     */
    readAll: async (uri: vscode.Uri): Promise<string> => {
        const document = await vscode.workspace.openTextDocument(uri);
        return document.getText();
    },

    /**
     * 末尾追記
     */
    write: async (uri: vscode.Uri, text: string): Promise<boolean> => {
        const document = await vscode.workspace.openTextDocument(uri);
        const edit = new vscode.WorkspaceEdit();
        
        // ドキュメントの末尾のポジションを取得
        const endPosition = document.positionAt(document.getText().length);
        
        edit.insert(uri, endPosition, text);
        return vscode.workspace.applyEdit(edit);
    },

    /**
     * 全削除（テキストを空にする）
     */
    deleteAll: async (uri: vscode.Uri): Promise<boolean> => {
        const document = await vscode.workspace.openTextDocument(uri);
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
        );
        
        edit.delete(uri, fullRange);
        return vscode.workspace.applyEdit(edit);
    },

    /**
     * 全上書き（全削除 → 末尾追記）
     */
    overrideAll: async (uri: vscode.Uri, text: string): Promise<boolean> => {
        const isDeleted = await documentOps.deleteAll(uri);
        if (!isDeleted) {
            return false;
        }
        return documentOps.write(uri, text);
    },

    /**
     * 保存
     */
    save: async (uri: vscode.Uri): Promise<boolean> => {
        const document = await vscode.workspace.openTextDocument(uri);
        return document.save();
    }
};
