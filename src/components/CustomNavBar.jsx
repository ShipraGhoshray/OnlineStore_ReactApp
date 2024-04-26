import { useEffect, useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { getCurrentUser, isLoggedin, doLogout } from '../auth/auth';

const CustomNavBar=()=>{

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [login, setLogin]  = useState(false);
  const [user, setUser]  = useState(null);

  const logout = () => {
    console.log("Logging out....")
    doLogout( () => {
      setLogin(false)
      navigate("/home")
    })
  }

  useEffect( () => {
    setLogin(isLoggedin())      
    setUser(getCurrentUser())
  }, [login])
    
  return(
    <div>
      <Navbar color='dark' light='false' dark='true' full='false' container='fluid' fixed='top' expand='sm'>
      <NavbarBrand tag={ReactLink} to="/home">Online Store  |  </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="px-9" navbar>
          {
            login && (
              <div>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Products</DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem tag={ReactLink} to="/home/products">View</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Add</DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
              </div> 
            )
          }
        </Nav>
        </Collapse>
        <Nav>
          {
            login && (
            <div>
              <NavItem>
                <NavLink onClick={logout}>Logout</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>{user?.emailId}</NavLink>
              </NavItem>
              </div>
            )
          }
          {
            !login && (
              <NavItem>
                <NavLink tag={ReactLink} to="/login">Login</NavLink>
              </NavItem>  
              )
            }
          <NavItem>
            <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
          </NavItem>
        </Nav>  
      </Navbar>
    </div>
  );
}
export default CustomNavBar;