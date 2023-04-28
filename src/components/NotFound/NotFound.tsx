import classes from './NotFound.module.scss';

function NotFound() {
	// const error = useRouteError();

	return (
		<div id="error-page" className={classes.container}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>{/* <i>{error?.statusText || error?.message}</i> */}</p>
		</div>
	);
}

export default NotFound;
