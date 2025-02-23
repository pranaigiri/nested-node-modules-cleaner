const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        resizable: false,
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
});


// Handle Minimize & Close from Renderer Process
ipcMain.on('minimize-window', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});


// Function to find all node_modules folders
function findNodeModules(dir) {
    let results = [];
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                if (item.name === 'node_modules') {
                    results.push(fullPath);
                } else {
                    results = results.concat(findNodeModules(fullPath));
                }
            }
        }
    } catch (error) {
        console.error(`Error accessing: ${dir} - ${error.message}`);
    }
    return results;
}

// Function to delete folders with progress
async function deleteFolders(folders) {
    let failed = [];
    let total = folders.length;

    for (let i = 0; i < total; i++) {
        const folder = folders[i];
        const command = `Remove-Item -Path '${folder}' -Recurse -Force -ErrorAction SilentlyContinue`;
        console.log(`Running Command : ${command}`);
        await new Promise(resolve => {
            exec(command, { shell: 'powershell.exe' }, (error) => {
                if (error) {
                    console.warn(`⚠️ PowerShell failed for: ${folder}`);
                    failed.push(folder);
                }
                resolve();
            });
        });

        // Send progress update with path
        let progress = Math.round(((i + 1) / total) * 100);
        mainWindow.webContents.send('delete-progress', progress, folder);
    }

    return failed;
}

// Handle directory selection and deletion
ipcMain.on('delete-node-modules', async (event) => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (!result.canceled) {
        const selectedDir = result.filePaths[0];
        console.log(`📂 Scanning for node_modules in: ${selectedDir}`);

        const folders = findNodeModules(selectedDir);
        if (folders.length === 0) {
            console.log("✅ No node_modules folders found!");
            event.reply('delete-result', 'No node_modules folders found.');
        } else {
            console.log(`🔍 Found ${folders.length} node_modules folders. Deleting...`);
            event.reply('delete-start', folders.length);

            const failed = await deleteFolders(folders);

            if (failed.length > 0) {
                console.log("⚠️ Some deletions failed. Using fallback CMD...");
                failed.forEach(folder => {
                    const cmdCommand = `rd /s /q "\\\\?\\${folder}"`;
                    console.log(`Running Command : ${cmdCommand}`);
                    exec(cmdCommand);
                });
            }

            event.reply('delete-result', `✅ Deleted ${folders.length} node_modules folders!`);
        }
    }
});
