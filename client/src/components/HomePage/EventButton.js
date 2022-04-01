import PropTypes from 'prop-types'

function EventButton(color, text, onClick) {
    return (
    <button 
        onClick={onClick}
        style={{backgroundColor: color}} 
        className='btn'>
        {text}
    </button>
    )
}

EventButton.defaultrops = {
    color: 'steelblue'
}

EventButton.propTypes = {
    text: PropTypes.string,
    color:PropTypes.string,
    onClick: PropTypes.func,
}

export default EventButton;