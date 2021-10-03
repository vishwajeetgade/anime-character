import React, {useContext} from 'react'
import Character from './Character';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {CharacterContext} from './App';

function CharacterList(props) {
    const {handleAddCharacter} = useContext(CharacterContext);
    return (
        <Container>
            <Button onClick={handleAddCharacter}>Add New Character</Button>
            <Row>
                {props.character.map(item => (
                    <Character key={item.id} {...item} />
                ))}
            </Row>
        </Container>

    )
}

export default CharacterList
