# Dev Watch

## 🚀 Main Features

- Runs `yarn start` and `yarn watch` in `packages/apps/browser-app`
- Detects which packages have been modified (using `git diff HEAD`)
- Runs `yarn watch` in the modified packages (if they have a `watch` script in their `package.json`)
- Uses integrated terminals for each process

---

## 📦 Installation

1. Make sure you have **VS Code** installed.
2. Download the `vscode-dev-watch-1.0.0.vsix` file.
3. Install it manually from VS Code:

   - Open the Extensions view (`Ctrl+Shift+X`)
   - Click the three dots in the upper right (`⋮`)
   - Select `Install from VSIX...`
   - Choose the `.vsix` file

Or from the terminal:

```bash
code --install-extension vscode-dev-watch-1.0.0.vsix
```

## Usage

- Open your project in VS Code
- Press Ctrl+Shift+P (or Cmd+Shift+P on macOS)
- Type: Dev Watch: Start all
- Press Enter
