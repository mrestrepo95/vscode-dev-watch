// src/extension.ts
import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import * as fs from "fs";

// Runs a command in an integrated terminal with a unique name
function runInTerminal(cwd: string, command: string, name: string) {
  const existingTerminal = vscode.window.terminals.find((t) => t.name === name);
  const terminal = existingTerminal || vscode.window.createTerminal({ name });
  terminal.show(true);
  // Run commands separately to work in both PowerShell and bash
  terminal.sendText(`cd "${cwd}"`);
  terminal.sendText(command);
}

// Finds the closest folder containing a package.json for a file
function findPackageRoot(startPath: string): string | null {
  let currentDir = path.dirname(startPath);
  while (currentDir !== path.dirname(currentDir)) {
    const pkgPath = path.join(currentDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      // Make sure not to pick the workspace root
      const pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkgContent && pkgContent.scripts && pkgContent.scripts.watch) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}

export function activate(context: vscode.ExtensionContext) {
  const startCommand = vscode.commands.registerCommand("devWatch.start", async () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      vscode.window.showErrorMessage("Please open a project folder first.");
      return;
    }

    const workspaceRoot = folders[0].uri.fsPath;

    // 1. Run browser-app start and watch
    runInTerminal(workspaceRoot, "yarn --cwd packages/apps/browser-app start", "browser-app:start");
    runInTerminal(workspaceRoot, "yarn --cwd packages/apps/browser-app watch", "browser-app:watch");

    // 2. Detect modified files and look for affected folders with package.json
    exec("git diff --name-only HEAD", { cwd: workspaceRoot }, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(`Error running git: ${stderr}`);
        return;
      }

      const files = stdout.split(/\r?\n/).filter((line) => line.trim().length > 0);
      const packageRoots = new Set<string>();

      for (const file of files) {
        const absolutePath = path.join(workspaceRoot, file);
        const packageRoot = findPackageRoot(absolutePath);
        if (
          packageRoot &&
          packageRoot !== workspaceRoot && // Avoid running watch in the workspace root
          fs.existsSync(path.join(packageRoot, "package.json"))
        ) {
          packageRoots.add(packageRoot);
        }
      }

      if (packageRoots.size === 0) {
        vscode.window.showInformationMessage("No packages with changes detected.");
        return;
      }

      for (const pkgPath of packageRoots) {
        const command = `yarn --cwd "${pkgPath}" watch`;
        runInTerminal(workspaceRoot, command, `pkg:${path.basename(pkgPath)}:watch`);
      }
    });
  });

  context.subscriptions.push(startCommand);
}

export function deactivate() {}
