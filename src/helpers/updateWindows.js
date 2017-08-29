import { BrowserWindow } from 'electron';
import path from 'path'

export default function updateWindows(context, newValue) {
  if (newValue !== context.value) {
    context.value = newValue;
    const allWindows = BrowserWindow.getAllWindows();
    allWindows.map((window) => {
      window.webContents.send('update', context.name);
    });
  }
};
