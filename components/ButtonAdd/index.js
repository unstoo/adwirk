import style from './style.module.css'

const ButtonAdd = ({ parentIndex, onClick }) => {
    return <button className={style['buttonAdd']} onClick={() => {
        onClick(parentIndex)
    }}>New task</button>
}

export default ButtonAdd