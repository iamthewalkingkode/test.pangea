import React from 'react';

const Select = (props) => {
    const { options, name, size, value } = props;

    return (
        <React.Fragment>
            <div id="Select">
                <select name={name} className={`${size}`} value={value} onChange={(e) => { props.onChange && props.onChange(e.target.value); }}>
                    {options.map(option => (
                        <option key={option.value} value={option.value} disabled={option.disabled || false}>{option.label || option.value}</option>
                    ))}
                </select>
                <div className="arrow">
                    <img src="arrow-down.svg" alt="Arrow down" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Select;