import * as yup from 'yup';

export const formProjectSchema = yup.object({
  name: yup.string().required('Please enter a project name'),
  status: yup.mixed().required('Please select status'),
  startDate: yup.date().required('Please enter a start date'),
  endDate: yup.date()
});

export type FormProjectType = yup.InferType<typeof formProjectSchema>;

export const formMemberSchema = yup.object({
  member: yup.mixed().required('Please select member'),
  position: yup.mixed().required('Please select position')
});

export type FormMemberType = yup.InferType<typeof formMemberSchema>;

export const formEmployeeSchema = yup.object({
  fullName: yup.string().required('Please enter a full name'),
  address: yup.string().required('Please enter address'),
  contactNumber: yup.string().required('Please enter contact number'),
  email: yup
    .string()
    .required('Please enter email')
    .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email!'),
  joinDate: yup.date().required('Please select join date'),
  dateOfBirth: yup.date().required('Please select date of birth').max(new Date(), 'Date of birth must be in the past'),
  department: yup.mixed().required('Please select department'),
  lineManager: yup.array().required('Please select line manager').min(1, 'Please select line manager')
  // isManager: yup.boolean().required('Please select is manager'),
  // skill: yup.mixed().required('Please enter skill')
});

export type FormEmployeeType = yup.InferType<typeof formEmployeeSchema>;
