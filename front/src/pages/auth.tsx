import { Button, Container, Input, Spacer, Card, Grid } from '@nextui-org/react';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Auth = () => {

	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	const { bearerToken, setBearerToken } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (bearerToken) {
			navigate('/rooms');
		}
	}, [bearerToken, navigate])

	const accountCreation = () => {
		let fetchInit: RequestInit = {
			headers: {
				'Content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({email, password})
		};
		fetch(`${process.env.REACT_APP_BACK_URL}/users`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					alert("compte créé avec succès")
				}else {
					alert("erreur lors de la création du compte");
				}
			});
	}

	const accountLogin = () => {
		let fetchInit: RequestInit = {
			headers: {
				'Content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({email: email, password: password})
		};
		fetch(`${process.env.REACT_APP_BACK_URL}/auth`, fetchInit)
			.then(res => {
				if (res.status === 200) {
					return(res.json());
				}else {
					alert("erreur lors de l'authentification'");
				}
			})
			.then((data)=> {
				setBearerToken(data.res);
			})
			;
	}
	
	return (
		<Grid.Container gap={2} justify="center">
			<Grid xs={12} md={4}>
				<Container>
					<Card>
						<Card.Body>
							<form>
								<Input placeholder='email' clearable width="100%" value={email} onChange={(event)=> setEmail(event.target.value)} />
								<Spacer y={1} />
								<Input.Password placeholder="mot de passe" width="100%" value={password} onChange={(event)=> setPassword(event.target.value)} />
								<Spacer y={2} />
								<Grid.Container gap={2} justify="center">
									<Grid>
										<Button flat auto onPress={accountCreation}>Créer un compte</Button>
									</Grid>
									<Grid>
										<Button auto onPress={accountLogin}>S'authentifier</Button>
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
