import vscode from "vscode";
import { parse } from "yaml";
import { fixMarkdownContent } from "./lib/fixMarkdownContent.js";
import { findNearestLintConfig } from "./lib/findNearestLintConfig.js";
import { documentOps } from "./lib/documentOps.js";
import markdownlint = require("markdownlint/promise");

const CONFIG_FILE_NAME = "fix.markdownlint.yaml";

export const fixMarkdown = async (
    targetFileUri: vscode.Uri
) => {
    const configUri = await findNearestLintConfig(
        targetFileUri,
        CONFIG_FILE_NAME
    );

    if (!configUri) {
        vscode.window.showErrorMessage(`${CONFIG_FILE_NAME} が見つかりませんでした。`);
        return;
    }


    const content = await documentOps.readAll(targetFileUri);
    const config = markdownlint.readConfig(configUri.fsPath, [parse]);

    const fixedContent = await fixMarkdownContent(
        content, config
    );

    await documentOps.overrideAll(
        targetFileUri, fixedContent
    );
};
