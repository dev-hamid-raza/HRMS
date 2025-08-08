import { useEffect, useRef, useState, type FormEvent } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Combobox } from '../ui/comboBox';
import Loader from '@/components/common/Loader';
import ImageUploader from './ImageUploader';

import {
	BloodGroupOptions,
	genderOptions,
	martialStatusOptions,
	religionOptions,
	restDayOptions,
	salaryTypeOptions,
} from '@/lib/options/employee';

import { fetchDesignations } from '@/services/designation';
import { fetchEmpTypes } from '@/services/employeeType';
import { fetchDepartments } from '@/services/department';
import { fetchShifts } from '@/services/shift';

import useFetchFn from '@/hooks/useFetch';
import type { EmpError } from '@/types/employees.types';
import type { EmployeeFormDialogProps } from '@/types/primaryDialog.types';
import { formatDateToDDMMYYYY, parseDDMMYYYY } from '@/utils/timeDate';

export default function EmployeeFormDialog({
	open,
	onClose,
	isDisabled,
	onAction,
	title,
	data,
}: EmployeeFormDialogProps) {
	// Input ref
	const inputRef = useRef<HTMLInputElement>(null);

	// States - Form fields
	const [bloodGroup, setBloodGroup] = useState('');
	const [cnic, setCnic] = useState('');
	const [dateOfBirthday, setDateOfBirthday] = useState('');
	const [dateOfConfirmation, setDateOfConfirmation] = useState('');
	const [dateOfJoining, setDateOfJoining] = useState('');
	const [department, setDepartment] = useState<string>('');
	const [designation, setDesignation] = useState<string>('');
	const [emgPhoneNumber, setEmgPhoneNumber] = useState('');
	const [empType, setEmpType] = useState<string>('');
	const [fatherName, setFatherName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [gender, setGender] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [image, setImage] = useState<File | null>(null);
	const [isRandom, setIsRandom] = useState(false);
	const [lastName, setLastName] = useState('');
	const [martialStatus, setMartialStatus] = useState('');
	const [overTimeAllowed, setOverTimeAllowed] = useState(false);
	const [permanentAddress, setPermanentAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [qualification, setQualification] = useState('');
	const [religion, setReligion] = useState('');
	const [restDay, setRestDay] = useState('');
	const [salary, setSalary] = useState('');
	const [salaryType, setSalaryType] = useState('');
	const [shift, setShift] = useState<string>('');
	const [tempAddress, setTempAddress] = useState('');

	// State - Validation errors
	const [errors, setErrors] = useState<EmpError>({
		firstNameError: false,
		lastNameError: false,
		fatherNameError: false,
		dateOfBirthdayError: false,
		dateOfJoiningError: false,
		dateOfConfirmationError: false,
		cnicError: false,
		religionError: false,
		martialStatusError: false,
		genderError: false,
		phoneNumberError: false,
		emgPhoneNumberError: false,
		permanentAddressError: false,
		tempAddressError: false,
		BloodGroupError: false,
		salaryError: false,
		qualificationError: false,
		salaryTypeError: false,
		empTypeError: false,
		designationError: false,
		departmentError: false,
		shiftError: false,
		imageError: false,
		restDayError: false,
	});

	// ========== FETCH OPTIONS ==========

	const { data: designationData, loading: designationLoading } =
		useFetchFn(fetchDesignations, undefined, []);
	const { data: empTypeData, loading: empTypeLoading } =
		useFetchFn(fetchEmpTypes, undefined, []);
	const { data: departmentData, loading: departmentLoading } =
		useFetchFn(fetchDepartments);
	const { data: shiftData, loading: shiftLoading } = useFetchFn(fetchShifts, undefined, []);

	const designationOptions = (designationData?.data ?? []).map((item) => ({
		label: item.designationName,
		value: item._id.toString(),
	}));

	const empTypeOptions = (empTypeData?.data ?? []).map((item) => ({
		label: item.empType,
		value: item._id.toString(),
	}));

	const departmentOptions = (departmentData?.data ?? []).map((item) => ({
		label: item.departmentName,
		value: item._id.toString(),
	}));

	const shiftOptions = (shiftData?.data ?? []).map((item) => ({
		label: item.shiftName,
		value: item._id.toString(),
	}));

	// ========== FORM HANDLERS ==========

	const validateForm = () => {
		const newErrors: EmpError = {
			firstNameError: !firstName.trim(),
			lastNameError: !lastName.trim(),
			fatherNameError: !fatherName.trim(),
			dateOfBirthdayError: !dateOfBirthday,
			dateOfJoiningError: !dateOfJoining,
			dateOfConfirmationError: !dateOfConfirmation,
			cnicError: !cnic.trim(),
			religionError: !religion.trim(),
			martialStatusError: !martialStatus.trim(),
			genderError: !gender.trim(),
			phoneNumberError: !phoneNumber.trim(),
			emgPhoneNumberError: !emgPhoneNumber.trim(),
			permanentAddressError: !permanentAddress.trim(),
			tempAddressError: !tempAddress.trim(),
			BloodGroupError: !bloodGroup.trim(),
			salaryError: !salary.trim(),
			qualificationError: !qualification.trim(),
			salaryTypeError: !salaryType.trim(),
			empTypeError: !empType,
			designationError: !designation,
			departmentError: !department,
			shiftError: !shift,
			restDayError: !restDay,
			imageError: !(image || imageUrl),
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some(Boolean);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return toast.error('All fields are required');

		const phoneRegex = /^(\+92|0)3[0-9]{9}$/;
		const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

		if (!cnicRegex.test(cnic)) {
			setErrors((prev) => ({ ...prev, cnicError: true }));
			return toast.error('Invalid C.N.I.C  No.');
		}

		if (!phoneRegex.test(phoneNumber)) {
			setErrors((prev) => ({ ...prev, phoneNumberError: true }));
			return toast.error('Invalid phone number');
		}

		if (!phoneRegex.test(emgPhoneNumber)) {
			setErrors((prev) => ({ ...prev, emgPhoneNumberError: true }));
			return toast.error('Invalid phone number');
		}

		const formData = {
			bloodGroup,
			cnic,
			dateOfBirthday: parseDDMMYYYY(dateOfBirthday),
			dateOfConfirmation: parseDDMMYYYY(dateOfConfirmation),
			dateOfJoining: parseDDMMYYYY(dateOfJoining),
			department,
			designation,
			emgPhoneNumber,
			empType,
			fatherName,
			firstName,
			gender,
			image,
			isRandom,
			lastName,
			martialStatus,
			overTimeAllowed,
			permanentAddress,
			phoneNumber,
			qualification,
			religion,
			restDay,
			salary: Number(salary),
			salaryType,
			shift,
			tempAddress,
		};

		onAction(formData);
	};

	// ========== FORM RESET ON OPEN ==========
	useEffect(() => {
		if (!open) return;

		if (data) {
			setBloodGroup(data.bloodGroup);
			setCnic(data.cnic);
			setDateOfBirthday(formatDateToDDMMYYYY(data.dateOfBirthday));
			setDateOfConfirmation(formatDateToDDMMYYYY(data.dateOfConfirmation));
			setDateOfJoining(formatDateToDDMMYYYY(data.dateOfJoining));
			setDepartment(data.department._id.toString());
			setDesignation(data.designation._id.toString());
			setEmgPhoneNumber(data.emgPhoneNumber);
			setEmpType(data.empType._id.toString());
			setFatherName(data.fatherName);
			setFirstName(data.firstName);
			setGender(data.gender);
			setImageUrl(data.image);
			setIsRandom(data.isRandom);
			setLastName(data.lastName);
			setMartialStatus(data.martialStatus);
			setOverTimeAllowed(data.overTimeAllowed);
			setPermanentAddress(data.permanentAddress);
			setPhoneNumber(data.phoneNumber);
			setQualification(data.qualification);
			setReligion(data.religion);
			setRestDay(data.restDay.toString());
			setSalary(data.salary.toString());
			setSalaryType(data.salaryType);
			setShift(data.shift._id.toString());
			setTempAddress(data.tempAddress);

			setErrors({
				firstNameError: false,
				lastNameError: false,
				fatherNameError: false,
				dateOfBirthdayError: false,
				dateOfJoiningError: false,
				dateOfConfirmationError: false,
				cnicError: false,
				religionError: false,
				martialStatusError: false,
				genderError: false,
				phoneNumberError: false,
				emgPhoneNumberError: false,
				permanentAddressError: false,
				tempAddressError: false,
				BloodGroupError: false,
				salaryError: false,
				qualificationError: false,
				salaryTypeError: false,
				empTypeError: false,
				designationError: false,
				departmentError: false,
				shiftError: false,
				imageError: false,
				restDayError: false,
			});

			return;
		}

		setBloodGroup('');
		setCnic('');
		setDateOfBirthday('');
		setDateOfConfirmation('');
		setDateOfJoining('');
		setDepartment('');
		setDesignation('');
		setEmgPhoneNumber('');
		setEmpType('');
		setFatherName('');
		setFirstName('');
		setGender('');
		setImage(null);
		setIsRandom(false);
		setLastName('');
		setMartialStatus('');
		setOverTimeAllowed(false);
		setPermanentAddress('');
		setPhoneNumber('');
		setQualification('');
		setReligion('');
		setRestDay('');
		setSalary('');
		setSalaryType('');
		setShift('');
		setTempAddress('');

		setErrors({
			firstNameError: false,
			lastNameError: false,
			fatherNameError: false,
			dateOfBirthdayError: false,
			dateOfJoiningError: false,
			dateOfConfirmationError: false,
			cnicError: false,
			religionError: false,
			martialStatusError: false,
			genderError: false,
			phoneNumberError: false,
			emgPhoneNumberError: false,
			permanentAddressError: false,
			tempAddressError: false,
			BloodGroupError: false,
			salaryError: false,
			qualificationError: false,
			salaryTypeError: false,
			empTypeError: false,
			designationError: false,
			departmentError: false,
			shiftError: false,
			imageError: false,
			restDayError: false,
		});
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[800px]'>
				{designationLoading ||
				empTypeLoading ||
				departmentLoading ||
				shiftLoading ? (
					<Loader />
				) : (
					<>
						<form className='space-y-4' onSubmit={handleSubmit}>
							<DialogHeader>
								<DialogTitle>{title}</DialogTitle>
								<DialogDescription>
									The shift name must be unique
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4'>
								<div className='grid gap-3'>
									<div className='flex gap-2.5 items-en'>
										<div className='space-y-2'>
											<div className='flex gap-2.5'>
												<Input
													placeholder='Enter first name'
													label='First name'
													value={firstName}
													hasError={errors.firstNameError}
													onChange={(e) => setFirstName(e.target.value)}
												/>
												<Input
													placeholder='Enter last name'
													label='Last name'
													value={lastName}
													hasError={errors.lastNameError}
													onChange={(e) => setLastName(e.target.value)}
												/>
											</div>
											<div className='flex gap-2.5'>
												<Input
													placeholder='Enter father Name'
													label='Father name'
													value={fatherName}
													hasError={errors.fatherNameError}
													onChange={(e) => setFatherName(e.target.value)}
												/>
												<Input
													ref={inputRef}
													mask='99999-9999999-9'
													placeholder='Enter valid C.N.I.C No.'
													hasError={errors.cnicError}
													value={cnic}
													onChange={(e) => setCnic(e.target.value)}
													label='C.N.I.C. No.'
												/>
												<Input
													placeholder='Enter qualification'
													label='Qualification'
													value={qualification}
													hasError={errors.qualificationError}
													onChange={(e) => setQualification(e.target.value)}
												/>
											</div>
											<div className='flex gap-2.5'>
												<Input
													placeholder='e.g. 03123456789'
													label='Phone No.'
													value={phoneNumber}
													hasError={errors.phoneNumberError}
													onChange={(e) => {
														const input = e.target.value;
														const isValid =
															input === '' || /^\+?[0-9]*$/.test(input);
														console.log(isValid);

														if (isValid) {
															setPhoneNumber(input);
														}
													}}
												/>
												<Input
													placeholder='e.g. 03123456789'
													label='Emergency phone No.'
													hasError={errors.emgPhoneNumberError}
													value={emgPhoneNumber}
													onChange={(e) => {
														const input = e.target.value;
														const isValid =
															input === '' || /^\+?[0-9]*$/.test(input);
														console.log(isValid);

														if (isValid) {
															setEmgPhoneNumber(input);
														}
													}}
												/>
												<Input
													label='Date of birth'
													hasError={errors.dateOfBirthdayError}
													placeholder='DD-MM-YYYY'
													mask='99-99-9999'
													value={dateOfBirthday}
													onChange={(e) => setDateOfBirthday(e.target.value)}
												/>
											</div>
											<div className='flex gap-2.5'>
												<Input
													placeholder='Enter temporary address'
													label='Temporary address'
													value={tempAddress}
													hasError={errors.tempAddressError}
													onChange={(e) => setTempAddress(e.target.value)}
												/>
											</div>
											<div className='flex gap-2.5'>
												<Input
													placeholder='Enter permanent address'
													hasError={errors.permanentAddressError}
													label='Permanent address'
													value={permanentAddress}
													onChange={(e) => setPermanentAddress(e.target.value)}
												/>
											</div>
											<div className='flex gap-2.5'>
												<Combobox
													label='employee type'
													name='Employee type'
													options={empTypeOptions}
													value={empType}
													setValue={(e) => setEmpType(e)}
													hasError={errors.empTypeError}
												/>
												<Combobox
													label='Department'
													name='department'
													options={departmentOptions}
													value={department}
													setValue={(e) => setDepartment(e)}
													hasError={errors.departmentError}
												/>
												<Combobox
													label='Designation'
													name='designation'
													options={designationOptions}
													value={designation}
													setValue={(e) => setDesignation(e)}
													hasError={errors.designationError}
												/>
											</div>
											<div className='flex gap-2.5 items-end'>
												<Input
													placeholder='Enter Salary'
													label='Salary'
													value={salary}
													hasError={errors.salaryError}
													onChange={(e) => {
														const input = e.target.value;

														// Only allow digits
														if (/^[1-9][0-9]*$/.test(input) || input === '') {
															setSalary(input);
														}
													}}
												/>
												<Combobox
													label='Salary Type'
													name='salary type'
													options={salaryTypeOptions}
													value={salaryType}
													setValue={(e) => setSalaryType(e)}
													hasError={errors.salaryTypeError}
												/>
												<Combobox
													label='Shift'
													name='shift'
													options={shiftOptions}
													value={shift ?? ''}
													setValue={(e) => setShift(e)}
													hasError={errors.shiftError}
												/>
											</div>
											<div className='flex gap-2.5 items-end'>
												<Input
													hasError={errors.dateOfJoiningError}
													placeholder='DD-MM-YYYYY'
													label='Joining date'
													mask='99-99-9999'
													value={dateOfJoining}
													onChange={(e) => setDateOfJoining(e.target.value)}
												/>
												<Input
													hasError={errors.dateOfConfirmationError}
													placeholder='DD-MM-YYYYY'
													label='Confirmation date'
													mask='99-99-9999'
													value={dateOfConfirmation}
													onChange={(e) =>
														setDateOfConfirmation(e.target.value)
													}
												/>

												<Combobox
													label='Rest Day'
													name='rest day'
													options={restDayOptions}
													value={restDay}
													setValue={(e) => setRestDay(e)}
													hasError={errors.restDayError}
												/>
											</div>
										</div>
										<div className='space-y-2.5 flex flex-col items-center'>
											<div>
												<p className='text-text-700 body-primary-sm-medium pb-1'>
													Employee image
												</p>
												<ImageUploader
													hasError={errors.imageError}
													onImageSelect={setImage}
													defaultImageUrl={imageUrl}
												/>
											</div>

											<Combobox
												value={gender}
												setValue={(e) => setGender(e)}
												label='Gender'
												name='gender'
												options={genderOptions}
												hasError={errors.genderError}
											/>
											<Combobox
												value={martialStatus}
												setValue={(e) => setMartialStatus(e)}
												label='Martial status'
												name='martial status'
												options={martialStatusOptions}
												hasError={errors.martialStatusError}
											/>
											<Combobox
												value={bloodGroup}
												setValue={(e) => setBloodGroup(e)}
												label='Blood group'
												name='blood group'
												options={BloodGroupOptions}
												hasError={errors.BloodGroupError}
											/>
											<Combobox
												value={religion}
												setValue={(e) => setReligion(e)}
												label='Religion'
												name='religion'
												options={religionOptions}
												hasError={errors.religionError}
											/>
											<div className='mt-auto'>
												<div className='flex items-center gap-1'>
													<input
														id='over'
														type='checkbox'
														checked={overTimeAllowed}
														onChange={(e) =>
															setOverTimeAllowed(e.target.checked)
														}
														className='accent-primary hover:cursor-pointer'
													/>
													<label
														htmlFor='over'
														className='text-text-700 body-primary-sm-medium hover:cursor-pointer'
													>
														Over time allowed
													</label>
												</div>
												<div className='flex items-center gap-1'>
													<input
														id='random'
														type='checkbox'
														checked={isRandom}
														onChange={(e) => setIsRandom(e.target.checked)}
														className='accent-primary hover:cursor-pointer'
													/>
													<label
														htmlFor='random'
														className='text-text-700 body-primary-sm-medium hover:cursor-pointer'
													>
														Randomly rest
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant='secondary'>Cancel</Button>
								</DialogClose>
								<Button type='submit' disabled={isDisabled}>
									{isDisabled ? <Loader /> : 'Save Changes'}
								</Button>
							</DialogFooter>
						</form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
