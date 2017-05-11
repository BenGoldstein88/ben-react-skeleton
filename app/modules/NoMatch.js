import React from 'react';

export default React.createClass({
  title: 'That ain\'t what it is, yo\'.,',
  subtitle: 'try again?',

  render: function() {
    return (
      <div className='new-page'>
        <div className='page-title'>{this.title}<br />{this.subtitle}</div>
      </div>
    );
  }
});
