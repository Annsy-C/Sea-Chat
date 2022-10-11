import React, { useEffect, useState, useContext } from 'react';
import { Button, Input, Spacer, Card, Grid, Text, Row } from '@nextui-org/react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

type RoomType = {
	name: string,
	id: number
}

const RoomListElement = (rooms: RoomType[]) => {

	const navigate = useNavigate();

	return (
		<>
			{rooms.map(room => {
				return (
					<Grid key={room.id}>
						<Button shadow auto onPress={() => {navigate(`/rooms/${room.id}`)}} >{room.name}</Button>
					</Grid>
				)
			})}
		</>
	);
}

const roomCreation = (bearerToken: String, name: String, setReloadRequired: React.Dispatch<React.SetStateAction<boolean>>) => {
	let fetchInit: RequestInit = {
		headers: {
			'Authorization': `Bearer ${bearerToken}`,
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ name })
	};
	fetch(`${process.env.REACT_APP_BACK_URL}/rooms`, fetchInit)
		.then(res => {
			if (res.status === 200) {
				alert("Salon créé avec succès");
				setReloadRequired((value) => (!value));
			} else {
				alert("erreur lors de la création du salon");
			}
		});
}

const RoomsList = () => {

	const { bearerToken } = useContext(AuthContext);
	const [rooms, setRooms] = useState([]);
	const [reloadRequired, setReloadRequired] = useState(false);
	const [roomName, setRoomName] = useState("");

	useEffect(() => {
		let fetchInit: RequestInit = {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${bearerToken}` },
		};

		fetch(`${process.env.REACT_APP_BACK_URL}/rooms`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					return res.json()
				}
				return null;
			})
			.then(jsonRes => {
				setRooms(jsonRes);
			});
	}, [bearerToken, setRooms, reloadRequired])

	return (
		<Grid.Container gap={2} justify="center">
			<Grid xs={12} md={6}>
				<Card>
					<Card.Header>
						<Text
							h2
							size={30}
							css={{
								textGradient: "45deg, $cyan700 -20%, $blue300 50%",
							}}
							weight="bold"
						>
							Liste des salons disponibles
						</Text>
					</Card.Header>
					<Card.Divider />
					<Card.Body>
						<Grid.Container gap={2} justify="center">
							{RoomListElement(rooms)}
						</Grid.Container>
					</Card.Body>
					<Card.Divider />
					<Card.Footer>
						<Row justify="flex-end">
							<Input placeholder='nouveau' clearable width="100%" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
							<Spacer x={1} />
							<Button flat auto onPress={() => roomCreation(bearerToken, roomName, setReloadRequired)}>Créer un nouveau salon</Button>
						</Row>
					</Card.Footer>
				</Card>
			</Grid>
		</Grid.Container>
	)
};

export default RoomsList;
