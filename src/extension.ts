'use strict';

import { parse } from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.updateSerial', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const zone = document.getText();
			console.log(zone);
			const matchedSerial = zone.match('(20\\d{2})(\\d{2})(\\d{2})(\\d+)');

			if (matchedSerial) {
				const isodate = matchedSerial.slice(1,-1).join("-");
				const parsedDate = new Date(isodate);
				const today = new Date();
				if (parsedDate.toDateString() === today.toDateString()) {
					console.log("Same Date");
					vscode.window.showInformationMessage('Same dates!',"foo","bar");
				} else {
					const newSerial = [today.getFullYear(),String(today.getMonth() + 1)!.padStart(2,'0'),String(today.getDate()).padStart(2,'0'),"001"].join("");
					console.log(newSerial);
					vscode.window.showInformationMessage('Different dates!',today.toDateString(),parsedDate.toDateString());					
				}
			}
			
			// const reversed = word.split('').reverse().join('');
			// editor.edit(editBuilder => {
			// 	editBuilder.replace(selection, reversed);
			// }); Invild Menes Sørensen
		}
        else {
            vscode.window.showInformationMessage('No Editor to update!');
        }
	});

	context.subscriptions.push(disposable);
}