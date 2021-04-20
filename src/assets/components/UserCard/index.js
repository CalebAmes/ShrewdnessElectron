import React from 'react';

const UserCard = ({ user, closeCard, height }) => {
	const translate = height + 35;
	const styles = {
		transform: `translate( 10vw, -${translate}px)`,
	};

	const avatarStyle = {
		background:'url('+user.avatar+') center center',
		backgroundSize: 'cover',
		height: '175px',
		width: '200px',
	}

	return (
		<>
			<div className="cardBackground" onClick={closeCard}></div>
			<div className="userCard" style={styles}>
				<div className="leftCard" 
					style={avatarStyle}>
				</div>
				<div className="rightCard">
						<h2 className="cardText">{user.username}</h2>
					<div className="bioDiv">
						<h3 className="bio">{user.bio}</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserCard;
