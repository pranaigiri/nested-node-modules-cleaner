# Nested Node Modules Cleaner

**Nested Node Modules Cleaner** is a tool that removes all nested `node_modules` folders within a directory efficiently. Built using **Electron**, it provides a **GUI interface** to track progress and deletion information.

## Features

- Scans and detects all nested `node_modules` folders within a selected directory.
- Deletes detected folders using **PowerShell** and **Command Prompt (CMD)** as a fallback.
- Provides a **progress indicator** and logs deletion information.
- Simple and minimal **GUI interface**.

## How It Works

1. **Scans for node_modules folders** recursively inside the selected directory.
2. **Attempts to delete folders using PowerShell**:
   ```javascript
   const command = `Remove-Item -Path '${folder}' -Recurse -Force -ErrorAction SilentlyContinue`;
   ```
3. If PowerShell fails, it **uses CMD as a fallback**:
   ```javascript
   const cmdCommand = `rd /s /q "\\?\${folder}"`;
   ```
4. Updates the user with **progress and logs**.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pranaigiri/nested-node-modules-cleaner.git
   cd nested-node-modules-cleaner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm start
   ```

## Download

<p align="left">
  <a href="https://github.com/pranaigiri/nested-node-modules-cleaner/releases/download/nested-node-modules-cleaner/NestedNodeModulesCleanerPortable.exe">
    <img src="https://img.shields.io/badge/Download-EXE-blue?style=for-the-badge&logo=windows" alt="Download EXE">
  </a>
</p>

You can also find all versions in the [Releases](https://github.com/pranaigiri/nested-node-modules-cleaner/releases) section.

## Usage

1. Open the app.
2. Select the root directory.
3. Click **Delete** to remove all `node_modules` folders.
4. View progress and logs.

## Support Me

If you find this tool useful, consider supporting my work. ❤️

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/pranaigiri)

## Contributing

Pull requests are welcome! Feel free to **fork** the project and submit your improvements.

## License

MIT License.

---

Developed by **Pranai Giri** 🚀
