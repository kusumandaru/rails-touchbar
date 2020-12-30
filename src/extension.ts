'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getConfig } from './configuration';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("Terminals: " + (<any>vscode.window).terminals.length);

  (<any>vscode.window).onDidOpenTerminal((e: any) => {
    console.log("Terminal opened. Total count: " + (<any>vscode.window).terminals.length);

    e.onDidWriteData((data: any) => {
      console.log("Terminal data: ", data);
    });
  });

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, extension "rails-touchbar" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  const config = getConfig();
  
  var rubocopExtension = vscode.extensions.getExtension( 'misogi.ruby-rubocop' );
  var goToSpecExtansion = vscode.extensions.getExtension( 'sporto.rails-go-to-spec' );

  const pullRebase = vscode.commands.registerCommand('extension.pullRebase', () => {
    if (ensureTerminalExists() && config.pullRebase) {
      selectTerminal('git pull rebase')
        .then((terminal: any) => terminal.sendText("git pull --rebase"));
    }
  });

  const rubocop = vscode.commands.registerCommand('extension.rubocop', () => {
    if (ensureTerminalExists() && config.rubocop) {
      selectTerminal('bundle exec rubocop -A')
        .then((terminal: any) => terminal.sendText("bundle exec rubocop -A"));
    }
  });

  const push = vscode.commands.registerCommand('extension.push', () => {
    if (ensureTerminalExists() && config.push) {
      selectTerminal('git push')
        .then((terminal: any) => terminal.sendText("git push"));
    }
  });

  const correctRubocop = vscode.commands.registerCommand('extension.correctRubocop', () => {
    if( rubocopExtension !== undefined ) {
      if( rubocopExtension.isActive === false ){
        rubocopExtension.activate().then(
          function(){
              console.log( 'Rubocop activated');
              
          },
          function(){
              console.log( "Rubocop activation failed");
          }
        );   
      }
      if(config.correctRubocop) {
        vscode.commands.executeCommand('editor.action.formatDocument');
      }
    }
  });

  const goToSpec = vscode.commands.registerCommand('extension.goToSpec', () => {
    if( goToSpecExtansion !== undefined ) {
      if( goToSpecExtansion.isActive === false ){
        goToSpecExtansion.activate().then(
          function(){
              console.log( 'Go to spec activated');
              
          },
          function(){
              console.log( "Go to spec activation failed");
          }
        );   
      }
      if(config.goToSpec) {
        vscode.commands.executeCommand('extension.railsGoToSpec');
      }
    }
  });

  const zenMode = vscode.commands.registerCommand('extension.zenMode', () => {
    if(config.zenMode) {
      vscode.commands.executeCommand('workbench.action.toggleZenMode');
    }
  });

  context.subscriptions.push(pullRebase, rubocop, push, correctRubocop, goToSpec, zenMode);
}

function selectTerminal(label_name: string): Thenable<vscode.Terminal> {
  interface TerminalQuickPickItem extends vscode.QuickPickItem {
    terminal: vscode.Terminal;
  }
  const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
  const items: TerminalQuickPickItem[] = terminals.map(t => {
    const l_name = label_name === undefined ? `name: ${t.name}` : label_name;

    return {
      label: l_name,
      terminal: t
    };
  });

  return vscode.window.showQuickPick(items).then((item: any) => {
    return item.terminal;
  });
}


function ensureTerminalExists(): boolean {
  if ((<any>vscode.window).terminals.length === 0) {
    vscode.window.showErrorMessage('No active terminals');
    return false;
  }
  return true;
}

// this method is called when your extension is deactivated
export function deactivate() {
}
