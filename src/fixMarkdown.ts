import vscode from "vscode";
import { parse } from "yaml";
import { fixMarkdownContent } from "./lib/fixMarkdownContent.js";
import { findNearestLintConfig } from "./lib/findNearestLintConfig.js";
import { documentOps } from "./lib/documentOps.js";
import markdownlint = require("markdownlint/promise");

const CONFIG_FILE_NAME = "fix.markdownlint.yaml";


type Result = 
    | { success: false, errorName: "ConfigFileNotFound" }
    | { success: false, errorName: "InternalError" }
    | { success: true }

export const fixMarkdown = async (
    targetFileUri: vscode.Uri
): Promise<Result> => {
    try {
        const configUri = await findNearestLintConfig(
            targetFileUri,
            CONFIG_FILE_NAME
        );

        if (!configUri) {
            vscode.window.showErrorMessage(`${CONFIG_FILE_NAME} が見つかりませんでした。`);
            return {
                success: false,
                errorName: "ConfigFileNotFound"
            };
        }


        const content = await documentOps.readAll(targetFileUri);
        const config = markdownlint.readConfig(configUri.fsPath, [parse]);

        const fixedContent = await fixMarkdownContent(
            content, config
        );

        await documentOps.overrideAll(
            targetFileUri, fixedContent
        );

        return { success: true };
    } catch (e) {
        console.error(e);
        vscode.window.showErrorMessage("不明なエラーが発生しました。");

        return {
            success: false,
            errorName: "InternalError"
        };
    }
};
