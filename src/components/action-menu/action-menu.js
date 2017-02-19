import React, { Component } from 'react';
import './action-menu.css';

class ActionMenu extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false
    };
  }
  performMenuAction(menuAction) {
    menuAction();
    this.setState({ isExpanded: false });
  }
  handleMenuOpen() {
    this.setState({ isExpanded: true });
  }
  renderActions() {
    return this.props.actions.map((item, index) => {
      return (
        <li key={index} role="menuitem">
          <button type="button" className="button menu-option" onClick={() => this.performMenuAction(item.action)}>
            { item.text }
          </button>
        </li>
      );
    });
  }
  render() {
    const actions = this.renderActions();
    const menuClasses = `action-menu${` ${this.props.className}` || ''}`;
    const listClasses = `menu-list${this.state.isExpanded ? ' visible' : ''}`;

    return (
      <div className={ menuClasses } aria-label="action menu">
        <button type="button"
                className="button primary menu-button"
                onClick={() => this.handleMenuOpen() }></button>
        <ul className={ listClasses } role="menu">
          { actions }
        </ul>
      </div>
    );
  }
}

export default ActionMenu;
