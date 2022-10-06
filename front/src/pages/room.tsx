import React from 'react';
import { Button, Input, Spacer, Card, Grid, Text, Row, Textarea } from '@nextui-org/react';
import '../App.css';

type MessageProps = {
	content: string,
	author: string,
}

const messageListElement = (messages: MessageProps[], author: string) => (
	<>
		{messages.map((message: MessageProps) => {
			if (message.author === author) {
				return (
					<Row justify="flex-end">
						<Grid>
							<Textarea
								status="primary"
								helperColor="primary"
								initialValue={message.content}
								helperText={message.author}
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
							helperText={message.author}
							minRows={1}
							readOnly
						/>
					</Grid>
				</Row>
			)
		})}
	</>

)

const Room = () => {

	const messages = [{ content: "coucou", author: "test1" },
	{ content: "salut", author: "test2" },
	{ content: "tchou tchoupi tchou nyo nyo nyo", author: "test2" },
	{ content: "tchou", author: "test1" },
	{ content: "snouf", author: "test2" },];

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
							(Salon Actuel)
						</Text>
					</Card.Header>
					<Card.Divider />
					<div className="scroll">
						<Card.Body >
							<Grid.Container gap={2} justify="center">
								{messageListElement(messages, "test1")}
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
							/>
							<Spacer x={1} />
							<Button flat auto>Post</Button>
						</Row>
					</Card.Footer>
				</Card>
			</Grid>
		</Grid.Container>
	)
};

export default Room;
