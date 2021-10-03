import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import CharacterForm from './CharacterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

export const CharacterContext = React.createContext();
const LOCAL_STORAGE_KEY = "Anime-Characters"
function App() {
  const [SelectedCharacterId, setSelectedCharacterId] = useState();
  const [character, setCharacter] = useState(animeCharacter);
  const [show, setShow] = useState(false);
  const selectedCharacter = character.find(item => item.id === SelectedCharacterId);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    data && setCharacter(JSON.parse(data));
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(character));
  }, [character])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setCharacter(character.filter(i => i.id !== id));
  }
  const handleAddCharacter = () => {
    const newCharacter = {
      id: uuidv4(),
      name: "",
      image: "data:image/jpeg;base64,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",
      description: "",
      skills: [{
        id:uuidv4(),
        name:""
      }]
    }
    setSelectedCharacterId(newCharacter.id);
    setShow(true)
    setCharacter([...character, newCharacter])
  }

  const handleCharacterChange = (id, chara) => {
    const newCharacters = [...character];
    const index = newCharacters.findIndex(i => i.id === id);
    newCharacters[index] = chara;
    setCharacter(newCharacters);
  }

  const handleEditCharacter = (id) => {
    setShow(true);
    setSelectedCharacterId(id);
  }

  const CharacterContextValue = {
    show,
    handleAddCharacter,
    handleDelete,
    handleClose,
    handleShow,
    handleEditCharacter,
    handleCharacterChange
  }
  return (
    <CharacterContext.Provider value={CharacterContextValue}>
      <CharacterList character={character} />
      {selectedCharacter && <CharacterForm character={selectedCharacter}/>}
    </CharacterContext.Provider>

  );
}

const animeCharacter = [
  {
    id: uuidv4(),
    name: "Hinata Hyuga",
    image: "https://styles.redditmedia.com/t5_4xhg5v/styles/profileIcon_wy0mcmvakli71.jpg?width=256&height=256&crop=256:256,smart&s=f0bc39cbd517f5abfbee86511de48e6d28f5e251",
    description: "Hinata Uzumaki (うずまきヒナタ, Uzumaki Hinata, née Hyūga (日向)) is a kunoichi of Konohagakure. Formerly the heiress of the Hyūga clan, she lost the position upon being deemed unsuited for the responsibilities of leading the clan. Nonetheless, Hinata persevered and from her observation of Naruto Uzumaki especially, Hinata found an example to follow. Through her membership with Team 8, she sought to become strong enough to change herself, if even a little at a time. A few years after the Fourth Shinobi World War, Hinata joined the Uzumaki clan after marrying Naruto.",
    skills: [
      {
        id:uuidv4(),
        name:"Chakra Transfer Technique"
      }, 
      {
        id: uuidv4(),
        name:"Eight Trigrams Sixty-Four Palms"
      }, 
      {
        id: uuidv4(),
        name:"Gentle Fist"
      }]
  },
  {
    id: uuidv4(),
    name: "Sakura Haruno",
    image: "https://i.pinimg.com/474x/e3/d5/da/e3d5daf54a9f417bbfa20c51f6cfaf68.jpg",
    description: "Sakura Uchiha (うちはサクラ, Uchiha Sakura, née Haruno (春野)) is a kunoichi of Konohagakure. When assigned to Team 7, Sakura quickly finds herself ill-prepared for the duties of a shinobi. However, after training under the Sannin Tsunade, she overcomes this, and becomes recognised as one of the greatest medical-nin in the world.",
    skills: [
      {
        id: uuidv4(),
        name:"Chakra Enhanced Strength"
      }, 
      {
        id: uuidv4(),
        name:"Healing Resuscitation Regeneration Technique"
      }, 
      {
        id: uuidv4(),
        name:"Strength of a Hundred Seal"
      }, 
      {
        id: uuidv4(),
        name:"Summoning Technique (Slug)"
      }
    ]
  }
]

export default App;
