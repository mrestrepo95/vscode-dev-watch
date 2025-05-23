# Dev Watch

## 🚀 Funcionalidad principal

- Ejecuta `yarn start` y `yarn watch` en `packages/apps/browser-app`
- Detecta qué paquetes han sido modificados (según `git diff HEAD`)
- Ejecuta `yarn watch` en los paquetes modificados (si tienen script `watch` en su `package.json`)
- Usa terminales integradas para cada proceso

---

## 📦 Instalación

1. Asegúrate de tener **VS Code** instalado.
2. Descarga el archivo `vscode-dev-watch-1.0.0.vsix`.
3. Instálalo manualmente desde VS Code:

   - Abre la vista de extensiones (`Ctrl+Shift+X`)
   - Haz clic en los tres puntos arriba a la derecha (`⋮`)
   - Selecciona `Install from VSIX...`
   - Elige el archivo `.vsix`

O desde la terminal:

```bash
code --install-extension vscode-dev-watch-1.0.0.vsix
```

## Ejecucion

- Abre tu proyecto en VS Code
- Presiona Ctrl+Shift+P (o Cmd+Shift+P en macOS)
- Escribe: Dev Watch: Start all
- Presiona Enter
