import React from 'react';

import style from './Header.scss';
import MainHeader from './MainHeader/MainHeader';
import SubHeader from './SubHeader/SubHeader';

const Header = props => {
  const {
    header
  } = style;
  return (
    <div className={header}>
      <MainHeader
        openContact={props.openContact}
      />
      <SubHeader />
    </div>
  );
};

export default Header;