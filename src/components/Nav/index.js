import React, { useState } from "react";
import Logo from "./Logo";
import NavBarContainer from "./NavBarContainer";
import MenuToggle from "./MenuToggle";
import MenuLinks from "./MenuLinks";

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} centerContent/>
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default Nav;
