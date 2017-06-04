// TODO: MOVE EDITOR TO SEPARATE COMPONENT
import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/paraiso-dark.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/css/css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsCode: "// JS is life",
      htmlCode: "<!-- <body></body> -->",
      cssCode: "/* CSS styles here */"
    };

  }

  getOutputSource = () => {
    return '<html><head><style>body{border:0;padding:0}' + this.state.cssCode + '</style></head><body>' + this.state.htmlCode + '<script>' + this.state.jsCode + '</script></body></html>'
  }

  updateHtmlCode = (newCode) => {
    this.setState({htmlCode: newCode});
  }

  updateCssCode = (newCode) => {
    this.setState({cssCode: newCode});
  }

  updateJsCode = (newCode) => {
    this.setState({jsCode: newCode});
  }

  getOptions = (modeName) => {
    return {lineNumbers: true, lineWrapping: true, theme: 'paraiso-dark', mode: modeName}
  }

  render() {
    return (
      <div className="App">
        <CodeMirror
          value={this.state.htmlCode}
          onChange={this.updateHtmlCode}
          options={this.getOptions('htmlmixed')}
          className="Editor"/>
        <CodeMirror
          value={this.state.cssCode}
          onChange={this.updateCssCode}
          options={this.getOptions('css')}
          className="Editor"/>
        <CodeMirror
          value={this.state.jsCode}
          onChange={this.updateJsCode}
          options={this.getOptions('javascript')}
          className="Editor"/>
      </div>
    );
  }
}

export default App;
