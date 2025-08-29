import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<div className='flex'>
			<div>
			<Sidebar />
			</div>
			<div className='w-full overflow-auto'>
			<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
