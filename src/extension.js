const vscode = require('vscode');
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('RenzMC extension activated');

    // Register the run command
    let runCommand = vscode.commands.registerCommand('renzmc.run', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const document = editor.document;
        const filePath = document.fileName;
        const fileExtension = path.extname(filePath);

        // Check if it's a RenzMC file
        if (fileExtension !== '.rmc' && fileExtension !== '.renzmc') {
            vscode.window.showErrorMessage('This is not a RenzMC file!');
            return;
        }

        // Save the file first
        document.save().then(() => {
            runRenzMCFile(filePath);
        });
    });

    // Register save event listener to fix file naming issues
    vscode.workspace.onWillSaveTextDocument((event) => {
        const document = event.document;
        const filePath = document.fileName;
        const fileExtension = path.extname(filePath);
        
        // Check if it's a RenzMC file with wrong extension
        if ((fileExtension === '.txt' || fileExtension === '' || fileExtension === '.tmp') && 
            document.languageId === 'renzmc') {
            // Prevent saving with wrong extension and suggest correct one
            event.waitUntil(Promise.resolve([]));
            
            // Create the correct file name
            const fileName = path.basename(filePath, fileExtension);
            const correctFilePath = path.join(path.dirname(filePath), fileName + '.rmc');
            
            // Save with correct extension
            saveWithCorrectExtension(document, correctFilePath);
        }
    });

    context.subscriptions.push(runCommand);
}

/**
 * Saves document with correct extension
 * @param {vscode.TextDocument} document
 * @param {string} correctFilePath
 */
function saveWithCorrectExtension(document, correctFilePath) {
    // Show warning and ask user what to do
    vscode.window.showWarningMessage(
        `File should have .rmc extension. Saving as ${path.basename(correctFilePath)}`,
        'OK'
    ).then(() => {
        // Save with correct extension
        const content = document.getText();
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
        );
        
        // Create a new file with correct extension
        edit.createFile(vscode.Uri.file(correctFilePath), { overwrite: true });
        edit.replace(vscode.Uri.file(correctFilePath), fullRange, content);
        
        vscode.workspace.applyEdit(edit).then(success => {
            if (success) {
                // Open the new file
                vscode.workspace.openTextDocument(correctFilePath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
                
                // Delete the old file if it exists and is different
                if (document.fileName !== correctFilePath) {
                    try {
                        fs.unlinkSync(document.fileName);
                    } catch (err) {
                        console.log('Could not delete old file:', err);
                    }
                }
            }
        });
    });
}

/**
 * Runs a RenzMC file
 * @param {string} filePath
 */
function runRenzMCFile(filePath) {
    // Check if Python is installed
    exec('python --version', (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage('Python is not installed. Please install Python to run RenzMC files.');
            vscode.window.showInformationMessage('Download Python from https://www.python.org/downloads/');
            return;
        }

        // Check if renzmc package is installed
        exec('pip show renzmc', (error, stdout, stderr) => {
            if (error) {
                // Ask user if they want to install renzmc
                vscode.window.showInformationMessage(
                    'RenzMC package is not installed. Do you want to install it now?',
                    'Yes',
                    'No'
                ).then(selection => {
                    if (selection === 'Yes') {
                        installRenzMC(() => {
                            executeRenzMCFile(filePath);
                        });
                    } else {
                        vscode.window.showInformationMessage('You can install RenzMC later with: pip install renzmc');
                    }
                });
            } else {
                executeRenzMCFile(filePath);
            }
        });
    });
}

/**
 * Installs the RenzMC package
 * @param {function} callback
 */
function installRenzMC(callback) {
    vscode.window.showInformationMessage('Installing RenzMC package...');

    const installProcess = spawn('pip', ['install', 'renzmc'], { shell: true });

    // Create output channel for installation
    const outputChannel = vscode.window.createOutputChannel('RenzMC Installation');
    outputChannel.show();

    installProcess.stdout.on('data', (data) => {
        outputChannel.append(data.toString());
    });

    installProcess.stderr.on('data', (data) => {
        outputChannel.append(data.toString());
    });

    installProcess.on('close', (code) => {
        if (code === 0) {
            outputChannel.appendLine('\nRenzMC package installed successfully!');
            vscode.window.showInformationMessage('RenzMC package installed successfully!');
            if (callback) callback();
        } else {
            outputChannel.appendLine(`\nFailed to install RenzMC package with code ${code}.`);
            vscode.window.showErrorMessage('Failed to install RenzMC package. Check the output panel for details.');
        }
    });
}

/**
 * Executes a RenzMC file
 * @param {string} filePath
 */
function executeRenzMCFile(filePath) {
    vscode.window.showInformationMessage(`Running ${path.basename(filePath)}...`);

    // Create output channel
    const outputChannel = vscode.window.createOutputChannel('RenzMC');
    outputChannel.show();

    // Execute the file
    const runProcess = spawn('renzmc', [filePath], { shell: true });

    runProcess.stdout.on('data', (data) => {
        outputChannel.append(data.toString());
    });

    runProcess.stderr.on('data', (data) => {
        outputChannel.append(data.toString());
    });

    runProcess.on('close', (code) => {
        if (code === 0) {
            outputChannel.appendLine('\nExecution completed successfully.');
            vscode.window.showInformationMessage('RenzMC file executed successfully!');
        } else {
            outputChannel.appendLine(`\nExecution failed with code ${code}.`);
            vscode.window.showErrorMessage('RenzMC file execution failed. Check the output panel for details.');
        }
    });
}

/**
 * Deactivates the extension
 */
function deactivate() {
    console.log('RenzMC extension deactivated');
}

module.exports = {
    activate,
    deactivate
};