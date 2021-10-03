import React from 'react'

function Skill(props) {
    const {id, name} = props.skill
    return (
        <li key={id}>{name}</li>
    )
}

export default Skill
