import React, { Component } from 'react';

import Portal from '../portal';
import './action-menu.scss';

class ActionMenu extends Component {
  constructor() {
    super();
    this.state = {
      menuPosition: null
    };
  }
  performMenuAction(menuAction) {
    menuAction();
    this.setState({ menuPosition: null });
  }
  handleMenuToggle(e) {
    e.persist();
    this.setState((prev) => ({
      menuPosition: prev.menuPosition
        ? null
        : { top: e.clientY, left: e.clientX }
    }));
  }
  renderActions() {
    return this.props.actions.map((item, index) => {
      return (
        <li key={index} role="menuitem">
          <button
            type="button"
            className="button menu-option"
            onClick={() => this.performMenuAction(item.action)}
          >
            {item.text}
          </button>
        </li>
      );
    });
  }
  render() {
    const actions = this.renderActions();
    const menuClasses = `action-menu${` ${this.props.className}` || ''}`;
    const hasMenu = this.state.menuPosition;
    const { top, left } = this.state.menuPosition || {};

    return (
      <div className={menuClasses} aria-label="action menu">
        <button
          type="button"
          className="button primary menu-button"
          onClick={(e) => this.handleMenuToggle(e)}
        />
        {hasMenu && (
          <Portal querySelector="#menu-portal-target">
            <ul className="menu-list visible" role="menu" style={{ top, left }}>
              {actions}
            </ul>
          </Portal>
        )}
      </div>
    );
  }
}

export default ActionMenu;
