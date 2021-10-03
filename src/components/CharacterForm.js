import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { CharacterContext } from './App';
import { v4 as uuidv4 } from 'uuid';

function CharacterForm(props) {
    const { name, image, description, skills, id } = props.character;
    const { handleClose, show, handleCharacterChange } = useContext(CharacterContext);

    const handleChange = (changes) => {
        handleCharacterChange(id, { ...props.character, ...changes })
    }

    const handleSkillsChange = (id, skil) => {
        const newskills = [...skills];
        const index = newskills.findIndex(i => i.id === id);
        newskills[index] = skil;
        handleChange({ skills: newskills });
    }

    const handleAddInput = () => {
        const newSkill = {
            id: uuidv4(),
            name: ""
        }
        handleChange({ skills: [...skills, newSkill] });
    }

    const handleDeleteInput = (id) => {
        handleChange({ skills: skills.filter(i => i.id !== id)});
    }


    return (
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form className="my-2" >
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={name} onChange={(e) => handleChange({ name: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Image URL" name="image" value={image} onChange={(e) => handleChange({ image: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={9} value={description} onChange={(e) => handleChange({ description: e.target.value })} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSkills">
                        <Form.Label>Image URL</Form.Label>
                        <Button variant="outline-info" size="sm" onClick={handleAddInput} >+</Button>
                        {
                            skills.map((item, index) => (
                                <SkillInput
                                    key={item.id}
                                    skill={item}
                                    handleSkillsChange={handleSkillsChange}
                                    handleDeleteInput={handleDeleteInput}
                                />

                            ))
                        }

                    </Form.Group>
                    <Button variant="primary" onClick={handleClose}>Submit</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

function SkillInput(props) {
    const {name, id} = props.skill
    const handleChange = (changes) => {
        props.handleSkillsChange(id, { ...props.skill, ...changes })
    }
    return (
        <>
            <Form.Control
                type="text"
                placeholder="Image URL"
                value={name}
                onChange={(e) => handleChange({ name: e.target.value })}
            />
            <Button variant="outline-danger" size="sm" onClick={() => props.handleDeleteInput(id)}>X</Button>
        </>
    )
}

export default CharacterForm
