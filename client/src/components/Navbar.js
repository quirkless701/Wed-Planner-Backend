import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faBell, faHouse, faTachometerAlt, faBars, faLightbulb, faCoins, faUsers, faBuilding, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Layout, Drawer, Menu, Modal, Tabs, Card } from 'antd';
const { Header } = Layout;

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const isMenuItemActive = (key) => {
    return location.pathname === key;
  };

  const menuItems = [
    {
      key: "1",
      className: "unclickable-item",
      icon: <FontAwesomeIcon icon={faBell} />,
      label:"Wedding Wishpers"
    },
    {
      key: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: <Link to="/" className="navigation-link">Home</Link>,
      className: isMenuItemActive("/") ? 'active' : 'inactive'
    },
      ...(Auth.loggedIn()
      ? [
        {
          key: "/budget",
          icon: <FontAwesomeIcon icon={faCoins} />,
          label: <Link to="/budget" className="navigation-link">Budget</Link>,
          className: isMenuItemActive("/budget") ? 'active' : 'inactive'
        },
        {
          key: "/countdown",
          icon: <FontAwesomeIcon icon={faStopwatch} />,
          label: <Link to="/countdown" className="navigation-link">Countdown</Link>,
          className: isMenuItemActive("/countdown") ? 'active' : 'inactive'
        },
        {
          key: "/inspiration",
          icon: <FontAwesomeIcon icon={faLightbulb} />,
          label: <Link to="/inspiration" className="navigation-link">Inspiration</Link>,
          className: isMenuItemActive("/inspiration") ? 'active' : 'inactive'
        },
        {
          key: "/vendors",
          icon: <FontAwesomeIcon icon={faUsers} />,
          label: <Link to="/vendors" className="navigation-link">Vendors</Link>,
          className: isMenuItemActive("/vendors") ? 'active' : 'inactive'
        },
        {
          key: "/venues",
          icon: <FontAwesomeIcon icon={faBuilding} />,
          label: <Link to="/venues" className="navigation-link">Venues</Link>,
          className: isMenuItemActive("/venues") ? 'active' : 'inactive'
        },
        {
          key: "/dashboard",
          icon: <FontAwesomeIcon icon={faTachometerAlt} />,
          label: <Link to="/dashboard" className="navigation-link">Dashboard</Link>,
          className: isMenuItemActive("/dashboard") ? 'active' : 'inactive'
        },
        {
          key: '/logout',
          icon: <FontAwesomeIcon icon={faRightFromBracket} />,
          label: 'Logout',
          onClick: Auth.logout,
        },
        ]
      : [
          {
            key: '/login',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            label: 'Login/Sign Up',
            onClick: handleOpen,
          },
        ]),
  ];
  
  return (
    <>
      <Header className="app-header">
        <div className="hg-menu">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} items={menuItems} className="hide-mobile" />
          <div className="drawer-icon hide-desktop" onClick={showDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        <Modal open={open} onCancel={handleClose} footer={null} centered>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <Tabs.TabPane tab="Login" key="login">
              <Card>
                <LoginForm />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="signup">
              <Card>
                <SignUpForm />
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Modal>
        <Drawer placement="right" open={isDrawerVisible} onClose={closeDrawer}>
          <Menu mode="vertical" defaultSelectedKeys={['/']} items={menuItems} />
        </Drawer>
      </Header>
    </>
  );
};

export default AppNavbar;
