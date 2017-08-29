import { remote, ipcRenderer } from 'electron';
import $ from 'jquery';
global.$ = $;

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';


import * as State from './state/index';
import env from './env';

const app = remote.app;

// Note, we have two references to the same files
// This is to allow each state variable's behavior to be defined from a single file
// Each state object can hold a value while the state also holds a "render" function
// along with any other helper functions.

// rendererState gives us local context when rendering
global.rendererState = State;
// One gives us access to the main process from background.js
global.remoteState = remote.getGlobal('stateObject');

// Initialize each state variable on the UI
Object.entries(rendererState).map(([key, stateObject]) => {
  stateObject.render(remoteState[key].value);
});

ipcRenderer.on('update', function(event, name) {
  remoteState = remote.getGlobal('stateObject');
  rendererState[name].render(remoteState[name].value);
});
