// @flow
import { app, Menu, shell, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }

    let template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }])
        .popup(this.mainWindow);
    });
  }

  buildDefaultTemplate() {
    const templateDefault = [{
      label: '&File',
      submenu: [
        { label: '&New Window', accelerator: 'Ctrl+N' },
        { type: 'separator' },        
        { label: '&Save', accelerator: 'Ctrl+S' },
        { label: 'Save &As', accelerator: 'Ctrl+Shift+S' },
        { type: 'separator' },        
        { label: '&Preferences', accelerator: 'Ctrl+P' },
        { type: 'separator' },        
        { label: '&Close', accelerator: 'Ctrl+W' }
      ]
    }, {
      label: '&Edit',
      submenu: [
        { label: 'C&ut', accelerator: 'Ctrl+X', role: 'cut' },
        { label: '&Copy', accelerator: 'Ctrl+C', role: 'copy' },
        { label: '&Paste', accelerator: 'Ctrl+V', role: 'paste' }
      ]
    }, {
      label: '&View',
      submenu: [
        { label: 'Toggle &Dark Theme', accelerator: 'Ctrl+D' },
        { label: 'Toggle &Full Screen', accelerator: 'F11', click: () => { this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen()); }},
        { label: 'Toggle &Developer Tools', accelerator: 'Alt+Ctrl+I', click: () => { this.mainWindow.toggleDevTools(); }}
      ]
    }, {
      label: '&Help',
      submenu: [
        { label: 'View &Updates', click() { shell.openExternal('https://github.com/Jay9596/CodePad/releases'); }},
        { label: '&Contribute', click() { shell.openExternal('https://www.github.com/thecodepad/codepad'); }},
        { label: 'Go to &Website', click() { shell.openExternal('https://thecodepad.github.io'); }},
      ]
    }, {
      label: '•'
    }, {
      label: 'Add &CSS',
      submenu: [
        { label: 'Animate' },
        { label: 'Bootstrap' },
        { label: 'FontAwesome' }
      ]
    }, {
      label: 'Add &JS',
      submenu: [
        { label: 'anime.js' },
        { label: 'Bootstrap.js' },
        { label: 'jQuery' },      
        { label: 'p5.js' },
        { label: 'three.js' }        
      ]
    }];

    return templateDefault;
  }
}
