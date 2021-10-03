import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

function Overview(props) {
    const { tasks, handleChange, handleRemove, handleEditClick, onChange } = props
    const completedStyle = {
        textDecoration: 'line-through',
        color: 'gray'
    }
    return (
        tasks.map(task => {

            const displayedText =
                task.editMode ?
                    <input type='text'
                        className='editTextField'
                        onChange={(e) => onChange(e)}
                        placeholder={task.description} /> :
                    <p style={task.completed ? completedStyle : {}}> {task.description} </p>

            const editButton =
                task.editMode ?
                    <FontAwesomeIcon
                        icon={faArrowCircleRight} /> :
                    <FontAwesomeIcon icon={faEdit} />
            return (<div className="taskContainer" key={tasks.indexOf(task)}>
                <h3>{tasks.indexOf(task) + 1} )</h3>
                <input
                    type='checkbox'
                    value={task.completed}
                    onChange={() => handleChange(task.id)}
                />

                {displayedText}
                <span onClick={() => handleRemove(task.id)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                <span
                    onClick={(e) => handleEditClick(e, task.id)}>{editButton}</span>
            </div>
            )
        })


    )
}

export default Overview