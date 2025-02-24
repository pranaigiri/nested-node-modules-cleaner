<p align="center">
  <img src="https://github.com/user-attachments/assets/a42eaca6-c2da-442e-804c-a42b323ad7fe" alt="Logo" width="150"/>
</p>
<h1 align="center">Nested Node Modules Cleaner</h1>

<p align="center">
  <strong>Nested Node Modules Cleaner</strong> is a tool that removes all nested <code>node_modules</code> folders within a directory efficiently. Built using <strong>Electron</strong>, it provides a <strong>GUI interface</strong> to track progress and deletion information.
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/458c3e66-cacf-4321-97a1-429089a25522" alt="VS 480"/>
</p>


## Features

- Scans and detects all nested `node_modules` folders within a selected directory.
- Deletes detected folders using **PowerShell** and **Command Prompt (CMD)** as a fallback.
- Provides a **progress indicator** and logs deletion information.
- Simple and minimal **GUI interface**.

## Why Use This Tool?
### Deleting `node_modules` Manually is Slow
When deleting the `node_modules` folder using the **Windows File Explorer Delete button**, it takes much longer compared to using **PowerShell or CMD**. Here’s why:

1. **Windows Explorer Checks Every File:**
   - It scans and calculates file sizes and types before deletion.
   - Moves files to the **Recycle Bin**, adding extra processing time.

2. **Too Many Small Files:**
   - `node_modules` contains thousands (or even millions) of files.
   - Windows struggles with deleting many small files quickly.

3. **File System Overhead:**
   - Windows Explorer deletes files one at a time, refreshing the UI, causing extra delay.

### Why CMD or PowerShell is Faster
1. **Bypasses Recycle Bin** → Directly removes files, skipping extra steps.
2. **Efficient Bulk Deletion** → Deletes entire directories at once.
3. **No UI Overhead** → No progress bars or file scanning.


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

## **Download**  

<p align="left">
  <a href="https://github.com/pranaigiri/nested-node-modules-cleaner/releases/download/nested-node-modules-cleaner/NestedNodeModulesCleanerPortable.exe">
    <img src="https://img.shields.io/badge/Download-EXE-blue?style=for-the-badge&logo=windows" alt="Download EXE">
  </a>
</p>  

You can also find all versions in the [Releases](https://github.com/pranaigiri/nested-node-modules-cleaner/releases) section.  

---

## **Windows Installation Short Guide**  

1. **Download the EXE** from the link above.  
2. **Run the EXE** (double-click to open).  
3. **Windows SmartScreen Warning?**  
   - Click **More info** → **Run anyway** (since the app is unsigned, this warning may appear).  
4. **Select a directory** and **clean nested `node_modules`** effortlessly!  

> 🚀 **No installation required** – it's a portable app! Just download and run.




## Usage

1. Open the app.
2. Select the root directory.
3. Click **Delete** to remove all `node_modules` folders.
4. View progress and logs.

### Conclusion
Since deleting `node_modules` manually is slow, **Nested Node Modules Cleaner** automates the process using efficient command-line methods, providing a **GUI interface** for convenience!


## Support Me

If you find this tool useful, consider supporting my work. ❤️

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/pranaigiri)

## Contributing

Pull requests are welcome! Feel free to **fork** the project and submit your improvements.

## License

MIT License.

---

Developed by **Pranai Giri** 🚀
