import React, {Component} from 'react';
import './EditorHeader.css';

export default class EditorHeader extends Component {
  render() {
    return (
      <div className="Editor-header">
        <div className="Editor-header-section Editor-header-HTML">
          <div className="Editor-header-label-section">
            <span className="Editor-header-label">HTML</span>
            <span className="Editor-header-label-active">Plain ol' HTML5</span>
          </div>
        </div>
        <div className="Editor-header-section Editor-header-CSS">
          <div className="Editor-header-label-section">
            <span className="Editor-header-label">CSS</span>
            <span className="Editor-header-label-active">
              Using FontAwesome
            </span>
          </div>
        </div>
        <div className="Editor-header-section Editor-header-JS">
          <div className="Editor-header-label-section">
            <span className="Editor-header-label">JS</span>
            <span className="Editor-header-label-active">Using anime.js</span>
          </div>
        </div>
      </div>
    );
  }
}