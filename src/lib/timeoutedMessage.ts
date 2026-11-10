import * as vscode from "vscode";

/**
 * 
 * @param timeout [ms]
 */
export const timeoutedMessage = (
    title: string, timeout: number
) => {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title,
        cancellable: false,
    }, async () => {
        await new Promise(resolve => setTimeout(resolve, timeout));
    });
};
