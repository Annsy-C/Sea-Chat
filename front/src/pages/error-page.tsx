import React from 'react';
import { useRouteError } from "react-router-dom";
import Layout from '../components/layout';

function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<Layout>
				<h2 className="subtitle"><em>Aucune page correspondante !</em></h2>
				<p>La page que vous tentez de rejoindre n'existe pas...</p>
				<p>Revenir à l'<a href="/">accueil</a>.</p>
			</Layout>
		</div>
	);
}

export default ErrorPage;

