const electron = require("electron");
const shell = electron.shell;
const remote = electron.remote;
const { dialog, Menu, MenuItem } = remote;

const VIEW = require("./viewMenu");
const HELP = require("./helpMenu");
const SHORTCUT = require("./shortcuts");
const WINDOW = require("./windowControl");
const JSMenu = require("./scripts");
const CSSMenu = require("./styles");
const FILE = require("./fileMenu");
const TASK = require("./taskMenu");
const CONN = require('./connection');

const editor = [];
const cssLib = [
  [
    "animate.css",
    "<link rel='stylesheet' type='text/css' href='lib/animate.css'>",
  ],
  [
    "bootstrap.min.css",
    "<link rel='stylesheet' type='text/css' href='lib/bootstrap.min.css'>",
  ],
  [
    "bulma.min.css",
    "<link rel='stylesheet' type='text/css' href='lib/bulma.min.css'>",
  ],
  [
    "tailwind.min.css",
    "<link rel='stylesheet' type='text/css' href='lib/tailwind.min.css'>",
  ],
  [
    "font-awesome.min.css",
    "<link rel='stylesheet' type='text/css' href='lib/font-awesome.min.css'>",
  ],
];
const jsLib = [
  ["jquery-3.1.1.min.js", "<script src='lib/jquery-3.1.1.min.js'></script>"],
  ["anime.min.js", "<script src='lib/anime.min.js'></script>"],
  ["bootstrap.min.js", "<script src='lib/bootstrap.min.js'></script>"],
  ["d3.min.js", "<script src='lib/d3.min.js'></script>"],
  ["moment.min.js", "<script src='lib/moment.min.js'></script>"],
  ["p5.min.js", "<script src='lib/p5.min.js'></script>"],
  ["three.min.js", "<script src='lib/three.min.js'></script>"],
];

let output, html, css, js, editorLabels, currentEditor, editors;
let styles = "",
  scripts = "",
  saveFlag = false,
  styFlags = [0, 0, 0, 0, 0],
  scrFlags = [0, 0, 0, 0, 0, 0, 0];
let autoRun = true;
let socket;

// 3. Main Functions for Electron
onload = function () {
  WINDOW.initContextMenu();
  WINDOW.windowClicks();

  socket = CONN.getSocket();

  editor[0] = CodeMirror(document.getElementById("html-editor"), {
    mode: {
      name: "htmlmixed",
    },
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    indentWithTabs: false,
    indentUnit: 2,
    smartIndent: true,
    scrollbarStyle: "overlay",
    theme: "base16-ocean-dark",
  });

  editor[1] = CodeMirror(document.getElementById("css-editor"), {
    mode: {
      name: "css",
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    indentUnit: 2,
    smartIndent: true,
    scrollbarStyle: "overlay",
    theme: "base16-ocean-dark",
  });

  editor[2] = CodeMirror(document.getElementById("js-editor"), {
    mode: {
      name: "javascript",
      json: true,
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    indentUnit: 2,
    smartIndent: true,
    scrollbarStyle: "overlay",
    theme: "base16-ocean-dark",
  });

  html = editor[0];
  css = editor[1];
  js = editor[2];

  // Output refresh, editor focus, and global elements
  editors = document.getElementById("editor");
  output = document.getElementById("output");
  editorLabels = document.getElementsByClassName("editor-label");

  for (let k = 0; k < 3; k++) {
    editor[k].on("change", change => {
      if (autoRun) {
        paint();
      }
    });
  }

  html.on("change", (_, op) => {
    // console.log("html change")
    socket.emit("html_change", op)
  });

  css.on("change", (_, op) => {
    // console.log("css change")
    socket.emit("css_change", op)
  });

  js.on("change", (_, op) => {
    // console.log("js change")
    socket.emit("js_change", op)
  });

  html.on("focus", changeEditor);
  css.on("focus", changeEditor);
  js.on("focus", changeEditor);

  FILE.fileMenu();
  VIEW.viewMenu();
  HELP.helpMenu();
  JSMenu.addScript();
  CSSMenu.addStyle();
  SHORTCUT.shortcuts();
  FILE.newFile();
  TASK.taskMenu();
  TASK.getUserConnect(userConnect);
  TASK.runFunc(paint);
  onresize();
};

// 5. Editor Functions
const getScr = () => scripts;
const getSty = () => styles;
const getCurrenEditor = () => {
  return currentEditor;
};

function toggleEditors(editorI) {
  if (editorI === html) {
    css.focus();
  }
  if (editorI === css) {
    js.focus();
  }
  if (editorI === js) {
    html.focus();
  }
}

function removeFocus(editor) {
  for (let i = 0; i < editor.length; i++) {
    editor[i].classList.remove("editor-focus");
  }
}
// 6. Save the snippet functions
function toggleStatus(i, span) {
  if (span[i].classList.contains("status-active")) {
    span[i].classList.remove("status-active");
  } else {
    span[i].classList.add("status-active");
  }
}

// Refresh on resize
onresize = function () {
  for (let i = 0; i < 3; i++) {
    editor[i].refresh();
  }
};

function paint() {
  output.srcdoc =
    "<html>" +
    "<head>" +
    getSty() +
    "<style>" +
    "body{border:0;padding:0}" +
    css.getValue() +
    "</style>" +
    "</head>" +
    "<body>" +
    html.getValue() +
    getScr() +
    "<script>" +
    js.getValue() +
    "</script>" +
    "</body>" +
    "</html>";
}

function changeEditor(editor) {
  removeFocus(editorLabels);
  if (editor === html) {
    editorLabels[0].classList.add("editor-focus");
    currentEditor = html;
  }
  if (editor === css) {
    editorLabels[1].classList.add("editor-focus");
    currentEditor = css;
  }
  if (editor === js) {
    editorLabels[2].classList.add("editor-focus");
    currentEditor = js;
  }
}

function userConnect(ip) {
  CONN.reconnect(ip);
  socket = CONN.getSocket();
}
