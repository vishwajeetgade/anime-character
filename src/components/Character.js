import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Skill from './Skill';
import {CharacterContext} from './App';

function Character(props) {
    const {handleDelete, handleEditCharacter} = useContext(CharacterContext);
    const { name, description, image, skills, id } = props;
    return (
        <Col md="4" className="my-2">
            <Card>
                <Card.Body>
                    <Card.Img src={image} />
                    <Row>
                        <Col md="6">
                            <Card.Title>{name}</Card.Title></Col>
                        <Col md="6">
                            <Button variant="info" onClick={()=> handleEditCharacter(id)} >Edit</Button>
                            <Button variant="danger" onClick={()=>handleDelete(id)} >Delete</Button></Col>
                    </Row>
                    <Card.Text>{description}</Card.Text>
                    <Card.Title>Skills</Card.Title>
                    <ul>
                        {
                            skills.map(skill => (
                                <Skill key={skill.id} skill={skill} />
                            ))
                        }
                    </ul>

                </Card.Body>
            </Card>
        </Col>

    )
}

export default Character
