import React from 'react';
import ReactDOM from 'react-dom';

class CategoryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.targetNode = document.getElementById('home');
    this.el = document.createElement('div');
    this.el.className = 'backdrop';
    this.el.onclick = this.props.handleBackdropClick;
  }

  componentDidMount() {
    if (this.targetNode) this.targetNode.appendChild(this.el);
  }

  componentWillUnmount() {
    if (this.targetNode) this.targetNode.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default CategoryPortal;
