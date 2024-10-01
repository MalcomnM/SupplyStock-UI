import React from "react";
import useUser from "../hooks/useUser";

const Authmiddleware = (props: any) => {
  useUser();

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
