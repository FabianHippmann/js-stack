import React, { Component } from 'react';
import { APP_NAME } from 'shared/config';
import styles from './style.scss';
import main from '../../styles/main.scss';

class Footer extends Component {
  render() {
    return (
      <div className={main.footer}>
        <div className={styles.footer}>
          <p>© {APP_NAME} 2017</p>
        </div>
      </div>
    );
  }
}

export default Footer;
