import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tile.css';


function Tile(props) {

  return (
    <Card style={{ width: '18rem',margin:"1.5rem" }}>
      <Card.Img variant="top" src={props.image} alt="pikachu"/>
      <Card.Body>
        <Card.Title>Title : {props.title}</Card.Title>
        <Card.Text>Subject : {props.subject}</Card.Text>
        <Card.Text>Topic : {props.topic}</Card.Text>
        <Card.Text>Date : {props.date}</Card.Text>
        {/* {isClicked ? <ViewSolutionDiv submit_function={props.submit_function} hide_function={handleClick} title={props.title} subject={props.subject} topic={props.topic} q_url={props.image} sol_url={props.sol_image} /> : null} */}
        <Button className='btn-tile' onClick={()=>{
          console.log(props.title)
          props.expand_function(props.title)}} variant="outline-dark ">Expand</Button>
      </Card.Body>
    </Card>
  );
}   

export default Tile;