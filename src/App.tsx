import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export async function loader() {
	const contacts = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
	return { contacts };
}

function App() {
	// 路由跳轉
	const navigate = useNavigate();
	const navItems = [{ name: 'Home', path: '/', icon: <HomeIcon /> }];

	const navigateTo = (path: string) => {
		navigate(path);
	};

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
							<IconButton
								size="small"
								key={item.name}
								sx={{ color: '#fff', border: '2px solid #E0E3E7', borderRadius: '10px' }}
								onClick={() => navigateTo(item.path)}
							>
								{item.icon}
							</IconButton>
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
