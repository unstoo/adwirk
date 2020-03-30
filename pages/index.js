import uuid from 'react-uuid'
import ButtonAdd from '../components/ButtonAdd'
import Modal from '../components/Modal'
import DraggableItem from '../components/DraggableItem'
import Column from '../components/Column'

const Draggable = ({ error, page }) => {
    const [columns, setColumns] = React.useState({
        open: [],
        inprogress: [],
        verify: [],
        done: []
    })

    const shouldStoreColumns = React.useRef(null)
    const [showModal, setShowModal] = React.useState(false)

    // Load app state
    React.useEffect(() => {
        const storedState = localStorage.getItem('appStorage')
        if (!storedState) return
        let parsedState
        try {
            parsedState = JSON.parse(storedState)
        } catch (e) {
            throw new Error('Couldn\'t parse localeStorage.')
        }
        setColumns(parsedState)    
    }, [])

    // Save app state
    React.useEffect(() => {
        if (shouldStoreColumns.current == false) {
            // Ignore ComponentDidMount
            shouldStoreColumns.current = true
        } else {
            localStorage.setItem('appStorage', JSON.stringify(columns));
        }
    }, [columns])

    const dragOverHandler = e => {
        e.preventDefault()
        e.currentTarget.style.outline = '2px solid silver'
    }

    const dragExitHandler = e => {
        e.currentTarget.style.outline = 'none'
    }

    const onDropHandler = e => {
        e.preventDefault()   
        e.currentTarget.style.outline = 'none'
        const data = e.dataTransfer.getData('text/plain')
        const [ uuid, parentColumnId ] = JSON.parse(data)
        const dropColumnId = e.currentTarget.id.split('-').pop()

        if ( parentColumnId === dropColumnId) {
            return
        }

        const columnToRemoveFrom = columns[parentColumnId]
        const columnToDropTo = columns[dropColumnId]
        let indexOfItem = ''
        columnToRemoveFrom.forEach((item, index) => {
            if (item.uuid === uuid) {
                indexOfItem = index
            }
        })

        const updatedColumns = {
            [dropColumnId]: [ ...columnToDropTo, columnToRemoveFrom[indexOfItem] ],
            [parentColumnId]:  [ ...columnToRemoveFrom.slice(0, indexOfItem), ...columnToRemoveFrom.slice(indexOfItem + 1) ],
        }
        const newState = Object.assign({}, columns, updatedColumns)
        setColumns(newState)
    }

    const addItem = ({title, body}) => {
        const columToAddNewTaskTo = 'open'

        const updatedColumn = [
            ...columns[columToAddNewTaskTo], 
            {
                uuid: uuid(),
                title,
                body
            }
        ]
        toggleModal
        const newState = Object.assign({}, columns, {[columToAddNewTaskTo]: updatedColumn})
        setColumns(newState)
        toggleModal()
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }
    
    return (
        <>
        { showModal && <Modal onAdd={addItem} onClose={toggleModal} /> }
        <div className='container'>
            <div className='header'>
                <h2>Draggable tasks</h2>
                <ButtonAdd onClick={toggleModal} parentIndex={'open'} />
            </div>
            <div className='kanbanDesk'>
                <Column 
                label={'Open'}
                columnIndex={'open'}
                onDrop={onDropHandler}
                onDragOver={dragOverHandler} 
                onDragLeave={dragExitHandler}>
                    {
                    columns['open'].map(item => {
                        const key = 'DragableItem-' + item.uuid
                        return (
                        <DraggableItem 
                        key={key} 
                        draggableIndex={item.uuid}
                        parentIndex={'open'}>
                            <div><b>{item.title}</b></div>
                            <div>{item.body}</div>
                        </DraggableItem>)
                    })
                    }
                </Column>
                <Column 
                label={'In Progress'}
                columnIndex={'inprogress'}
                onDrop={onDropHandler}
                onDragOver={dragOverHandler} 
                onDragLeave={dragExitHandler}>
                    {
                    columns['inprogress'].map(item => {
                        const key = 'DragableItem-' + item.uuid
                        return (
                        <DraggableItem 
                        key={key} 
                        draggableIndex={item.uuid}
                        parentIndex={'inprogress'}>
                            <div><b>{item.title}</b></div>
                            <div>{item.body}</div>
                        </DraggableItem>)
                    })
                    }
                </Column>
                <Column 
                label={'Verify'}
                columnIndex={'verify'}
                onDrop={onDropHandler}
                onDragOver={dragOverHandler} 
                onDragLeave={dragExitHandler}>
                    {
                    columns['verify'].map(item => {
                        const key = 'DragableItem-' + item.uuid
                        return (
                        <DraggableItem 
                        key={key} 
                        draggableIndex={item.uuid}
                        parentIndex={'verify'}>
                            <div><b>{item.title}</b></div>
                            <div>{item.body}</div>
                        </DraggableItem>)
                    })
                    }
                </Column>
                <Column 
                label={'Done'}
                columnIndex={'done'}
                onDrop={onDropHandler}
                onDragOver={dragOverHandler} 
                onDragLeave={dragExitHandler}>
                    {
                    columns['done'].map(item => {
                        const key = 'DragableItem-' + item.uuid
                        return (
                        <DraggableItem 
                        key={key} 
                        draggableIndex={item.uuid}
                        parentIndex={'done'}>
                            <div><b>{item.title}</b></div>
                            <div>{item.body}</div>
                        </DraggableItem>)
                    })
                    }
                </Column>
            </div>
        </div>
        <style jsx>{`
        .kanbanDesk {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        }

        .container {
            margin-left: 15px;
        }
        .header {
            margin-bottom: 20px;
        }
        `}
        </style>
        </>
    )
}

export default Draggable
