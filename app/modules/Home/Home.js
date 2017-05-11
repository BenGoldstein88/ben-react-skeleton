import React from 'react';
import {Link} from 'react-router';

// Custom modules

// Style
import styles from './homeStyle';

export default React.createClass({
  componentDidMount() {
    this.props.actions.resetPayment();
  },
  render: function() {
    return (
      <div className={styles.home}>
      </div>
    );
  }
});
