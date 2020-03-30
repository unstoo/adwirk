import style from './style.module.css'

const Modal = ({onClose, onAdd, ...props}) => {
    const titleInput = React.useRef(null)
    const textInput = React.useRef(null)

    const onCloseHandler = e => {
        titleInput.current.value = ''
        textInput.current.value = ''
        onClose()
    }

    const onAddHandler = e => {
        const title = titleInput.current.value
        titleInput.current.value = ''
        const body = textInput.current.value
        textInput.current.value = ''
        onAdd({
            title, body
        })
    }

    return <div className={style['modalOuterScreen']}>
        <div className={style['modal']}>
            <input ref={titleInput} placeholder='Title' type='text'/>
            <textarea ref={textInput} placeholder='Text' className={style['modal__textarea']}>
                
            </textarea>
            <button onClick={onAddHandler}>Save</button>
            <button onClick={onCloseHandler}>Close</button>
        </div>
    </div>
}

export default Modal