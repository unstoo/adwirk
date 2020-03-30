import style from './style.module.css'

const Column = ({ label, columnIndex, children, ...props}) => {
    return (
        <>
            <div 
            {...props} 
            className={style['bordered']}
            id={'kanbanList-' + columnIndex}>
                <h3>{ label }</h3>
                    { children }
            </div >
        </>
    )
}
export default Column