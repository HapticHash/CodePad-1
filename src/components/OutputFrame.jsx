import React, {Component} from 'react';
import './OutputFrame.css';

export default class OutputFrame extends Component {
  render() {
    return (
      <iframe className="Output" title="Output-frame" srcDoc={this.props.outputSource}></iframe>
    );
  }
}