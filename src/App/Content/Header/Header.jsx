import React from 'react';

import style from './Header.scss';
import MainHeader from './MainHeader/MainHeader';
import SubHeader from './SubHeader/SubHeader';

const Header = props => {
  const {
    header_wrapper,
    header
  } = style;
  return (
    <div className={header_wrapper}>
      <div className={header}>
        <MainHeader
          openContact={props.openContact}
        />
        <SubHeader />
      </div>
    </div>
  );
};

export default Header;