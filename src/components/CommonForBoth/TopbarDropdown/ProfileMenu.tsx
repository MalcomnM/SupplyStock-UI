import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";


import { Link } from "react-router-dom";
import AuthHandler from "../../../api/AuthHandler"

// users
//@ts-ignore
import user1 from "../../../assets/images/users/avatar-1.jpg";
import useUser from "../../../hooks/useUser";

const ProfileMenu = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const {user} = useUser()

  const getBearerToken = async () => {
    try {
      const authHander = new AuthHandler();
      const token = authHander.getToken();
      await navigator.clipboard.writeText(`Bearer ${token}`);
      setMenu(!menu)
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setMenu(!menu)
    }
  };




  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="rounded-circle header-profile-user p-3 bg-info">
          {user?.name.charAt(0)}
          </span>
          <span className="d-none d-xl-inline-block ms-2 me-1">{user?.name}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
        <div
            className="dropdown-item notify-item pointer"
            onClick={getBearerToken}
          >
                        <i className="bx bx-copy-alt font-size-16 align-middle me-1" />
            <span>Copy Bearer Token</span>
          </div>

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};



export default ProfileMenu
