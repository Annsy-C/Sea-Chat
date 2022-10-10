import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Spacer, Card, Grid, Text, Row, Textarea } from '@nextui-org/react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

type MessageProps = {
	content: string,
	email: string,
	user_id: number
}

const messageListElement = (messages: MessageProps[], userId: number) => (
	<>
		{messages.map((message: MessageProps) => {
			if (message.user_id === userId) {
				return (
					<Row justify="flex-end">
						<Grid>
							<Textarea
								status="primary"
								helperColor="primary"
								initialValue={message.content}
								helperText={message.email}
								minRows={1}
								readOnly
							/>
						</Grid>
					</Row>
				)
			}
			return (
				<Row justify="flex-start">
					<Grid>
						<Textarea
							status="secondary"
							helperColor="secondary"
							initialValue={message.content}
							helperText={message.email}
							minRows={1}
							readOnly
						/>
					</Grid>
				</Row>
			)
		})}
	</>

)

const messageCreation = (bearerToken: String, content: String, roomId: String | undefined) => {
	let fetchInit: RequestInit = {
		headers: {
			'Authorization': `Bearer ${bearerToken}`,
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ content })
	};
	fetch(`http://localhost:3000/rooms/${roomId}/messages`, fetchInit)
		.then(res => {
			if (res.status === 200) {
				alert("message créé avec succès");
			} else {
				alert("erreur lors de l'envoi du message");
			}
		});
}

const Room = () => {
	const { bearerToken } = useContext(AuthContext);
	const { roomId } = useParams();
	const [messages, setMessages] = useState([]);
	const [reloadRequired, setReloadRequired] = useState(false);
	const [messageContent, setMessageContent] = useState("");
	const [roomName, setRoomName] = useState("");
	const [userId, setUserId] = useState(0);
	const bottomRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		let fetchInit: RequestInit = {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${bearerToken}` },
		};

		fetch(`http://localhost:3000/rooms/${roomId}`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(jsonRes => {
				setRoomName(jsonRes.name);
			})

		fetch(`http://localhost:3000/auth/me`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(jsonRes => {
				setUserId(jsonRes.id);
			})

		fetch(`http://localhost:3000/rooms/${roomId}/messages`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
				return null;
			})
			.then(jsonRes => {
				setMessages(jsonRes);
			});
	}, [bearerToken, setMessages, reloadRequired, roomId, roomName])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({behavior: 'smooth'});
	  }, [messages]);


	return (
		<Grid.Container gap={2} justify="center">
			<Grid xs={12} md={4}>
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
							{roomName}
						</Text>
					</Card.Header>
					<Card.Divider />
					<div className="scroll">
						<Card.Body >
							<Grid.Container gap={2} justify="center">
								{messageListElement(messages,userId)}
								<div ref={bottomRef} />
							</Grid.Container>
						</Card.Body>
					</div>
					<Card.Divider />
					<Card.Footer>
						<Row justify="flex-end">
							<Textarea
								placeholder="nouveau message"
								minRows={2}
								width="100%"
								value={messageContent}
								onChange={(event) => setMessageContent(event.target.value)}
							/>
							<Spacer x={1} />
							<Button flat auto onPress={() => messageCreation(bearerToken, messageContent, roomId)}>Envoi</Button>
						</Row>
					</Card.Footer>
				</Card>
			</Grid>
		</Grid.Container>
	)
};

export default Room;
