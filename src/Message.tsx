import React from 'react';

interface UserMessage {
	title: string;
	message: string;
}

const Message = (props: UserMessage): any => {
	return (

		<p>{props.title} {props.message} </p>
	)
}

export default Message;