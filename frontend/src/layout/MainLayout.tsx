import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<div className='flex'>
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default MainLayout;
