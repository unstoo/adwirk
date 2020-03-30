// import Link from 'next/link'

export default () => (
    <div style={divStyle}>
        <h1 style={h1Style}>Error</h1>
        <img src="/bird1.jpg" alt="A bird" width="404px"/>
    </div>
)

const h1Style = {
    // transform: 'rotate(90deg)',
    color: 'white',
    position: 'absolute',
    right: '15px',
    top: '-20px'
}

const divStyle = {
    display: 'flex', 
    alignItems: 'flex-start',
    position: 'relative',
}
