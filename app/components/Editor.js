// @flow
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import styles from './Editor.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlCode: '<!-- HTML in <body></body> -->',
      cssCode: '/* CSS goes here */',
      jsCode: '// JavaScript goes here'
    };
  }
  updateCode(newCode) {
    // Run the paint() here
  }
  render() {
    return (
      <div>
        <CodeMirror value={this.state.htmlCode} onChange={this.updateCode} />
        <CodeMirror value={this.state.cssCode} onChange={this.updateCode} />
        <CodeMirror value={this.state.jsCode} onChange={this.updateCode} />
      </div>
    );
  }
}
