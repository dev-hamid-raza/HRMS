import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<div className='flex'>
			<div>
			<Sidebar />
			</div>
			<div className='w-full'>
			<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
