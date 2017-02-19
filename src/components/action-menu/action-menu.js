import React, { Component } from 'react';

class ActionMenu extends Component {
  renderActions() {
    return this.props.actions.map(item => {
      return (
        <li role="menu-item">
          <button type="button" className="menu-button option"
                  onClick={item.action}>
            { item.text }
          </button>
        </li>
      );
    });
  }
  render() {
    const actions = this.renderActions();
    
    return (
      <button type="button" className="menu-button" aria-label="action menu">
        <ul className="menu-list" role="menu">
          { actions }
        </ul>
      </button>
    );
  }
}

export default ActionMenu;
