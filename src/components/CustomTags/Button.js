import React from 'react';

const Button = ({ value, statusType = '', Action = '' }) => {
	return (
		<button
			value={value}
			className={statusType === value ? statusType : ''}
			onClick={e => Action(e.target.value)}>
			{value}
		</button>
	);
};

export default Button;
