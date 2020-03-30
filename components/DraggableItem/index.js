import style from './style.module.css'

const DraggableItem = ({children, draggableIndex, parentIndex, ...props}) => {
    const dragStartHandler = e => {
        e.currentTarget.style.backgroundColor = 'rgb(245, 245, 245)';
        e.dataTransfer.setData('text/plain', JSON.stringify([draggableIndex, parentIndex]))
    }
    const dragEndHandler = e => {
        e.currentTarget.style.backgroundColor = '';
    }
    return <div
        onDragStart={dragStartHandler} 
        onDragEnd={dragEndHandler}  
        draggable='true'
        className={style['draggableItem']}>
        { children }
    </div>
}

export default DraggableItem