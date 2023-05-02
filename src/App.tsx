import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export async function loader() {
	const contacts = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
	return { contacts };
}

function App() {
	// const { contacts } = useLoaderData();

	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: 'About' },
		{
			name: 'Contact',
			path: 'Contact',
		},
	];

	return (
		<Box display="flex" flexDirection="column" sx={{ height: '100%', width: '100%' }}>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton edge="start" color="inherit">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						Clinical Decision Support System
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (
							<Button key={item.name} sx={{ color: '#fff' }}>
								<Link to={item.path}>{item.name}</Link>
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box id="detail" sx={{ flex: '1 1 auto', overflow: 'auto' }}>
				<Outlet />
			</Box>
		</Box>
	);
}

export default App;
