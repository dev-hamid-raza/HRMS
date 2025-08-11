import { Drawer, DrawerContent } from '@/components/ui/drawer';
import EmployeeProfile from './EmpCard';
import type { Employee } from '@/types/employees.types';

type DrawerProps = {
    open: boolean,
    setClose: () => void
    employee: Employee | null
}

function EmployeeDrawer({open, setClose, employee}:DrawerProps ) {
    if(!employee) return
	return (
			<Drawer open={open} onClose={setClose}>
				<DrawerContent>
                <EmployeeProfile employee={employee} />
				</DrawerContent>
			</Drawer>
	);
}

export default EmployeeDrawer;
