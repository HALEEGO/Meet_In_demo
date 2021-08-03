import React, { useState } from 'react';
import { ProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import 'react-pro-sidebar/dist/css/styles.css';
import './side.css';
import history from '../../assets/icon/history.png';
import room from '../../assets/icon/room.png';
import idea from '../../assets/icon/idea.png';
import user from '../../assets/icon/user.png';

const Side = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    // eslint-disable-next-line no-unused-expressions
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? 'Logo' : 'Big Logo'}</p>
            </div>
            <button type="button" className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </button>
          </SidebarHeader>
          <ul>
            <div className="menuList">
              <img src={room} className="mlogo" alt="" />
              <img src={idea} className="mlogo" alt="" />
              <img src={history} className="mlogo" alt="" />
              <img src={user} className="mlogo" alt="" />
            </div>
          </ul>
        </ProSidebar>
      </div>
    </>
  );
};

export default Side;
