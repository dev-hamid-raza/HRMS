import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter(routes);

function App() {
	return (
		<>
			<Toaster position='top-right' richColors/>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</>
	);
}

export default App;
