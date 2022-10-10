import { Button } from '@nextui-org/react';
import React from 'react';
import { useRouteError, useNavigate } from "react-router-dom";
import Layout from '../components/layout';

function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	const navigate = useNavigate();

	return (
		<div id="error-page">
			<Layout>
				<h2 className="subtitle"><em>Aucune page correspondante !</em></h2>
				<p>La page que vous tentez de rejoindre n'existe pas...</p>
				<Button onPress={() => navigate('/')}>Retour</Button>
			</Layout>
		</div>
	);
}

export default ErrorPage;

