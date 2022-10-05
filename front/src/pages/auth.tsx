import { Button, Container, Input, Spacer, Card, Grid } from '@nextui-org/react';
import React, { useEffect } from 'react';

const Auth = () => {

	useEffect(() => {

		let fetchInit: RequestInit = {
			method: 'GET',
		};

		fetch('http://localhost:3000/users', fetchInit)
			.then(res => {
				if (res.status === 200) {
					return res.json()
				}
				return null;
			})
			.then(jsonRes => {

			});
	})
	return (<Grid.Container gap={2} justify="center">
		<Grid xs={12} md={4}>
			<Container>
				<Card>
					<Card.Body>
						<form action="/send-data-here" method="post">
							<Input placeholder='email' clearable width="100%" />
							<Spacer y={1} />
							<Input.Password placeholder="mot de passe" width="100%" />
							<Spacer y={2} />
							<Grid.Container gap={2} justify="center">
								<Grid>
									<Button flat auto>Créer un compte</Button>
								</Grid>
								<Grid>
									<Button auto>S'authentifier</Button>
								</Grid>
							</Grid.Container>
						</form>
					</Card.Body>
				</Card>
			</Container>
		</Grid>
	</Grid.Container>);
}

export default Auth;
