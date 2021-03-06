// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

// Instantiate the global state object
import * as State from './state/index';
global.stateObject = {};
Object.keys(State).forEach((key) => {
  // Add switch case here in case you want to load a dynamic initial value
  stateObject[key] = new State[key]();
});

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== 'production') {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();

  const leftUrl = url.format({
    pathname: path.join(__dirname, 'left.html'),
    protocol: 'file:',
    slashes: true,
  });
  const leftWindow = createWindow('main', { width: 800, height: 600 });
  leftWindow.loadURL(leftUrl);
  leftWindow.setPosition(0, 0);

  const rightUrl = url.format({
    pathname: path.join(__dirname, 'left.html'),
    protocol: 'file:',
    slashes: true,
  });
  const rightWindow = createWindow('main', { width: 800, height: 600 });
  rightWindow.loadURL(rightUrl);
  rightWindow.setPosition(801, 0);
});

app.on('window-all-closed', () => {
  app.quit();
});



// Some canned, fake data
setTimeout(() => {
  stateObject.gear.update('D');
}, 5000);

setInterval(() => {
  stateObject.time.update(new Date().getTime());
}, 1000/60);



// Showing how the state of the entire electron app is held in one place
function getCurrentState() {
  const currentState = {};
  Object.keys(stateObject).forEach((key) => {
    currentState[key] = stateObject[key].value
  });
  return currentState;
}

setInterval(() => {
  console.log(getCurrentState());
}, 1000);
