import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import EmployeeProfile from './EmpCard';

type DrawerProps = {
    open: boolean
}

function EmployeeDrawer({open}:DrawerProps ) {
    const employee = {
        firstName: 'Ali',
        lastName: 'Raza',
        fatherName: 'Ahmad Raza',
        dateOfBirthday: '2000-06-12',
        dateOfJoining: '2025-07-12',
        dateOfConfirmation: '2025-07-12',
        cnic: '12309-8042840-2',
        religion: 'Islam',
        martialStatus: 'Single',
        gender: 'Male',
        phoneNumber: '03123456789',
        emgPhoneNumber: '03123456789',
        permanentAddress: 'Faisalabad',
        tempAddress: 'Faisalabad',
        bloodGroup: 'A+',
        onDuty: false,
        salary: 100000,
        qualification: 'Masters',
        overTimeAllowed: false,
        status: 'On duty',
        salaryType: 'Monthly',
        empType: 'Permanent',
        designation: 'Senior Front-end developer',
        department: 'Web Development',
        shift: 'General',
        restDay: 0,
        restQuota: 4,
        restUsed: 1,
        restMonth: '2025-07',
        isRandom: false,
        image: 'http://localhost:8000/uploads/1754635108619-image.jpg',
        empCode: 1,
      };
	return (
		<div>
			<Drawer open={open}>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
                <EmployeeProfile employee={employee} />
				</DrawerContent>
			</Drawer>
		</div>
	);
}

export default EmployeeDrawer;
