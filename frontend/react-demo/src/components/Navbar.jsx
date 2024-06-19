import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { useLogout } from '../hooks/UseLogout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';
import { useContext, useEffect, useState } from 'react';
import { SubjectContext } from '../context/SubjectContext'
import {maths,chemistry,biology,all,physics} from '../subjects'


function NavBar() {

  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  var { user } = useAuthContext()
  var { subject } = useContext(SubjectContext);
  const navigate = useNavigate()
  const logout = useLogout()
  const handleClick = () => {
    logout()
    navigate("/")
  }
  useEffect(() => {
    let options;
    switch (subject) {
      case "All":
        options = all;
        break;
      case "Physics":
        options = physics;
        break;
      case "Chemistry":
        options = chemistry
        break;
      case "Biology":
        options = biology 
        break; 
      default:
        options = []; 
    }
    setOptions(options); 
  }, [subject]);


  return (
    <Navbar style={{ position: "fixed", zIndex: 2, top: "0", right: "0", left: "0" }} expand="lg" className="custom-navbar py-3">
      <Container fluid>
        <Navbar.Brand className='custom-navbar-text mx-5' href="#">Doubtify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='custom-navbar-text1' href="#action1">Sort By :</Nav.Link>
            <NavDropdown title="Date" id="navbarScrollingDropdown" className='custom-navbar-text1'>
              <NavDropdown.Item href="#action3" className='custom-navbar-text1'>Newest to Oldest</NavDropdown.Item>
              <NavDropdown.Item href="#action4" className='custom-navbar-text1'>
                Oldest to Newest
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex custom-navbar-text1">

            <form className=' px-2'>
              <select className='form-select' id="select-option" value={selectedOption} onChange={handleChange}>
                <option value="">Select a Topic</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </form>
            <Button className='btn-nav mr-3' variant="outline-light">Search</Button>
          </Form>
          {user ? <Button onClick={handleClick} className='btn-nav mx-1' variant="outline-light">Logout</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
