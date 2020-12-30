module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/configuration.ts":
/*!******************************!*\
  !*** ./src/configuration.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vs = __webpack_require__(/*! vscode */ "vscode");
/**
 * Read the workspace configuration for 'rails.touchbar' and return a TouchbarConfig.
 * @return {TouchbarConfig} config object
 */
exports.getConfig = () => {
    const conf = vs.workspace.getConfiguration('rails.touchbar');
    return {
        pullRebase: conf.get('pullRebase', false),
        rubocop: conf.get('rubocop', true),
        push: conf.get('push', false),
        correctRubocop: conf.get('correctRubocop', true),
        goToSpec: conf.get('goToSpec', true),
        zenMode: conf.get('zenMode', true)
    };
};


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(/*! vscode */ "vscode");
const configuration_1 = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("Terminals: " + vscode.window.terminals.length);
    vscode.window.onDidOpenTerminal((e) => {
        console.log("Terminal opened. Total count: " + vscode.window.terminals.length);
        e.onDidWriteData((data) => {
            console.log("Terminal data: ", data);
        });
    });
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, extension "rails-touchbar" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const config = configuration_1.getConfig();
    var rubocopExtension = vscode.extensions.getExtension('misogi.ruby-rubocop');
    var goToSpecExtansion = vscode.extensions.getExtension('sporto.rails-go-to-spec');
    const pullRebase = vscode.commands.registerCommand('extension.pullRebase', () => {
        if (ensureTerminalExists() && config.pullRebase) {
            selectTerminal('git pull rebase')
                .then((terminal) => terminal.sendText("git pull --rebase"));
        }
    });
    const rubocop = vscode.commands.registerCommand('extension.rubocop', () => {
        if (ensureTerminalExists() && config.rubocop) {
            selectTerminal('rubocop --rails')
                .then((terminal) => terminal.sendText("bundle exec rubocop -A"));
        }
    });
    const push = vscode.commands.registerCommand('extension.push', () => {
        if (ensureTerminalExists() && config.push) {
            selectTerminal('git push')
                .then((terminal) => terminal.sendText("git push"));
        }
    });
    const correctRubocop = vscode.commands.registerCommand('extension.correctRubocop', () => {
        if (rubocopExtension !== undefined) {
            if (rubocopExtension.isActive === false) {
                rubocopExtension.activate().then(function () {
                    console.log('Rubocop activated');
                }, function () {
                    console.log("Rubocop activation failed");
                });
            }
            if (config.correctRubocop) {
                vscode.commands.executeCommand('editor.action.formatDocument');
            }
        }
    });
    const goToSpec = vscode.commands.registerCommand('extension.goToSpec', () => {
        if (goToSpecExtansion !== undefined) {
            if (goToSpecExtansion.isActive === false) {
                goToSpecExtansion.activate().then(function () {
                    console.log('Go to spec activated');
                }, function () {
                    console.log("Go to spec activation failed");
                });
            }
            if (config.goToSpec) {
                vscode.commands.executeCommand('extension.railsGoToSpec');
            }
        }
    });
    const zenMode = vscode.commands.registerCommand('extension.zenMode', () => {
        if (config.zenMode) {
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
        }
    });
    context.subscriptions.push(pullRebase, rubocop, push, correctRubocop, goToSpec, zenMode);
}
exports.activate = activate;
function selectTerminal(label_name) {
    const terminals = vscode.window.terminals;
    const items = terminals.map(t => {
        const l_name = label_name === undefined ? `name: ${t.name}` : label_name;
        return {
            label: l_name,
            terminal: t
        };
    });
    return vscode.window.showQuickPick(items).then((item) => {
        return item.terminal;
    });
}
function ensureTerminalExists() {
    if (vscode.window.terminals.length === 0) {
        vscode.window.showErrorMessage('No active terminals');
        return false;
    }
    return true;
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("vscode");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/extension.ts");
/******/ })()
;
//# sourceMappingURL=extension.js.map