import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/Services";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authApi.authHandler.deleteCookie();
    navigate('/login');
  }, []);

  return <></>;
};



export default Logout;
