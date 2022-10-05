import React from 'react';
import { Button, Input, Spacer, Card, Grid, Text, Row } from '@nextui-org/react';

const roomListElement = (rooms: string[]) => (
	<>
		{rooms.map(roomName => {
			return (
				<Grid>
					<Button shadow auto>{roomName}</Button>
				</Grid>
			)
		})}
	</>

)

const RoomsList = () => {

	const salons = ["baleine", "pieuvre"];

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
							{roomListElement(salons)}
						</Grid.Container>
					</Card.Body>
					<Card.Divider />
					<Card.Footer>
						<Row justify="flex-end">
						<Input placeholder='nouveau' clearable width="100%" />
							<Spacer x={1} />
							<Button flat auto>Créer un nouveau salon</Button>
						</Row>
					</Card.Footer>
				</Card>
			</Grid>
		</Grid.Container>
	)
};

export default RoomsList;
