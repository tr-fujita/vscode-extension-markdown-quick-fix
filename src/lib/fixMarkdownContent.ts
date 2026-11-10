import markdownlint = require("markdownlint");
import markdownlintPromise = require("markdownlint/promise");

export async function fixMarkdownContent(
    content: string,
    config: any,
): Promise<string> {
    const results = await markdownlintPromise.lint({
        strings: { currentDocument: content },
        config,
    });

    const fixableErrors = (
        results.currentDocument ?? []
    ).filter(
        (error) => !!error.fixInfo
    );

    return markdownlint.applyFixes(content, fixableErrors);
}
