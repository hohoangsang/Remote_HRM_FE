import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormEmployeeType, formEmployeeSchema } from '../../../utils/rules';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
// import MemberModal from './MemberModal';
import SaveIcon from '@mui/icons-material/Save';
import { projectStatusOption } from '../../../enum';
import Swal from 'sweetalert2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import withReactContent from 'sweetalert2-react-content';
import DeleteIcon from '@mui/icons-material/Delete';
import { cloneDeep } from 'lodash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LineManagerModal from './LineManagerModal';

const MySwal = withReactContent(Swal);

interface Props {
  visible: boolean;
  onClose: () => void;
  initialValue?: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '90vh'
};

const classNameError = 'mt-1 min-h-[1.25rem] text-red-500';

function createData(member: string, position: string) {
  return { member, position };
}

const rows = [
  createData('Frozen yoghurt', 'Project Owner'),
  createData('Ice cream sandwich', 'Team lead'),
  createData('Eclair', 'Front end'),
  createData('Cupcake', 'Back end'),
  createData('Gingerbread', 'Tester')
];

function CreateEmployeeModal({ visible, onClose, initialValue }: Props) {
  const [visibleLineManager, setVisibleLineManager] = useState(false);
  const [visibleMember, setVisibleMember] = useState(false);
  const [memberList, setMemberList] = useState<any>(rows);
  const [initMember, setInitMember] = useState<any>({});
  const [lineManagerList, setLineManagerList] = useState<any>([]);
  const [viewOnlyLineManager, setViewOnlyLineManager] = useState(false);

  const handleOpenMember = () => {
    setVisibleMember(true);
  };

  const handleCloseMember = () => {
    setVisibleMember(false);
    setInitMember({});
  };

  const handleOpenLineManager = (view?: boolean) => {
    setVisibleLineManager(true);
    setViewOnlyLineManager(Boolean(view));
  };

  const handleCloseLineManager = () => {
    setVisibleLineManager(false);
  };

  const methods = useForm<FormEmployeeType>({
    resolver: yupResolver(formEmployeeSchema),
    defaultValues: {}
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    getValues,
    setValue
  } = methods;

  const onSubmit = handleSubmit((data?: any) => {
    console.log(data);
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  });

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') return;

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };

  const handleAddMember = (newMember: any) => {
    const newMemberList = cloneDeep(memberList);
    newMemberList.push(newMember);
    setMemberList(newMemberList);
  };

  const handleRemoveMember = (index: number) => {
    const newMemberList = cloneDeep(memberList).toSpliced(index, 1);
    setMemberList(newMemberList);
  };

  const handleOpenEditMember = (member: any) => {
    handleOpenMember();
    setInitMember(member);
  };

  const handleApplyLineManagerList = async (newLineManagerList: any) => {
    setLineManagerList(newLineManagerList);
    handleCloseLineManager();
    setValue('lineManager', newLineManagerList);
    await trigger(['lineManager']);
  };

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      disableEscapeKeyDown
      disableScrollLock
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ ...style }}>
        <Button
          style={{
            position: 'absolute',
            top: 7,
            right: 0,
            margin: 0
          }}
          color='error'
          onClick={handleClose}
          size='medium'
        >
          <HighlightOffIcon />
        </Button>
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h2'
          sx={{ textAlign: 'center', fontWeight: '700', margin: '1.5rem 0' }}
        >
          Create New Employee
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel id='employee-fullname'>Fullname</InputLabel>
                <Controller
                  control={control}
                  name='fullName'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter full name'
                      size='small'
                      translate='no'
                      id='employee-fullname'
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.fullName?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='employee-address'>Address</InputLabel>
                <Controller
                  control={control}
                  name='address'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter address'
                      size='small'
                      translate='no'
                      id='employee-address'
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.address?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='employee-contact'>Contact number</InputLabel>
                <Controller
                  control={control}
                  name='contactNumber'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter contact number'
                      size='small'
                      translate='no'
                      id='employee-contact'
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.contactNumber?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='employee-name'>Email</InputLabel>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter email'
                      size='small'
                      translate='no'
                      id='employee-name'
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.email?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='employee-joindate-label'>Join date</InputLabel>

                <Controller
                  control={control}
                  name='joinDate'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.joinDate?.message}
                </div>
              </Grid>

              <Grid item xs={6}>
                <InputLabel id='employee-dateofbirth-label'>Date of birth</InputLabel>

                <Controller
                  control={control}
                  name='dateOfBirth'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.dateOfBirth?.message}
                </div>
              </Grid>

              <Grid item xs={6}>
                <InputLabel id='employee-department-label'>Department</InputLabel>
                <Controller
                  control={control}
                  name='department'
                  render={({ field }) => (
                    <Select
                      size='small'
                      fullWidth
                      labelId='employee-department-label'
                      id='employee-department'
                      {...field}
                    >
                      {projectStatusOption.map((status) => (
                        <MenuItem value={status.value}>{status?.label}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.department?.message}
                </div>
              </Grid>

              <Grid item xs={6}>
                <InputLabel id='employee-linemanager-label'>LineManager</InputLabel>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <div>
                    <IconButton
                      sx={{ width: 'fit-content', background: 'none' }}
                      size='medium'
                      color='primary'
                      onClick={() => handleOpenLineManager()}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                  <div>
                    {lineManagerList.length ? (
                      <AvatarGroup
                        sx={{ width: '100%' }}
                        total={lineManagerList.length}
                        onClick={() => handleOpenLineManager(true)}
                      >
                        {lineManagerList.map((tech: any) => (
                          <Avatar alt={tech.label} src='/static/images/avatar/1.jpg' sizes='small' />
                        ))}
                      </AvatarGroup>
                    ) : null}
                  </div>
                  <div className={classNameError} style={{ color: 'red' }}>
                    {errors.lineManager?.message}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <fieldset>
                  <legend>Members</legend>
                  <Button
                    size='medium'
                    type='button'
                    style={{ margin: '1rem 0' }}
                    variant='contained'
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpenMember}
                  >
                    Assign member
                  </Button>

                  {memberList.length ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Member</TableCell>
                            <TableCell align='center'>Position</TableCell>
                            <TableCell align='center'>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {memberList.map((member: any, index: number) => (
                            <TableRow key={member.member} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component='th' scope='row'>
                                {index + 1}
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                {member.member}
                              </TableCell>
                              <TableCell align='center'>{member.position}</TableCell>
                              <TableCell align='center'>
                                <Box>
                                  <IconButton color='error' size='medium' onClick={() => handleRemoveMember(index)}>
                                    <DeleteIcon />
                                  </IconButton>
                                  {/* <IconButton
                                    color='primary'
                                    size='medium'
                                    onClick={() => handleOpenEditMember(member)}
                                  >
                                    <ModeEditIcon />
                                  </IconButton> */}
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : null}
                </fieldset>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='project-status-label'>Description</InputLabel>
                <TextareaAutosize
                  name='description'
                  placeholder='Description'
                  minRows={2}
                  style={{
                    width: '100%',
                    border: '1px solid rgb(100, 116, 139)',
                    borderRadius: '5px',
                    padding: '8px 14px'
                  }}
                />
              </Grid>
            </Grid>

            <Button
              size='medium'
              type='submit'
              style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center' }}
              variant='contained'
              startIcon={<SaveIcon />}
              color='primary'
              onClick={onSubmit}
            >
              Save
            </Button>
          </form>
        </FormProvider>
        {/* {visibleMember && (
          <MemberModal
            visible={visibleMember}
            onClose={handleCloseMember}
            onFinish={handleAddMember}
            initialValues={initMember}
          />
        )} */}

        {visibleLineManager && (
          <LineManagerModal
            visible={visibleLineManager}
            onClose={handleCloseLineManager}
            onFinish={handleApplyLineManagerList}
            defaultLineManagerList={lineManagerList}
            viewOnly={viewOnlyLineManager}
          />
        )}
      </Box>
    </Modal>
  );
}

export default CreateEmployeeModal;
