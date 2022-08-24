import { useState } from 'react';
import { IEditUser } from '../../interfaces/employee';

const EditUser = ({ employee }: IEditUser) => {
  const [input, setInput] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    username: employee.username,
    password: employee.password,
  });

  const onHandleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedEmployee = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      password: input.password,
    };

    console.log(updatedEmployee);
  };

  return (
    <form className='myPage-form' key={employee.id} onSubmit={onHandleUpdate}>
      <label>Firstname</label>
      <input
        type='text'
        name='firstName'
        value={input.firstName}
        onChange={onHandleInput}
      />
      <label>Lastname</label>
      <input
        type='text'
        name='lastName'
        value={input.lastName}
        onChange={onHandleInput}
      />
      <label>Email</label>
      <input
        type='email'
        name='email'
        value={input.email}
        onChange={onHandleInput}
      />
      <label>Username</label>
      <input
        type='text'
        name='username'
        value={input.username}
        onChange={onHandleInput}
      />
      <label>Password</label>
      <input
        type='text'
        name='password'
        value={input.password}
        onChange={onHandleInput}
      />
      {(parseInt(employee.isManager) === 1 ||
        parseInt(employee.isCEO) === 1) && (
        <>
          <label>Salary</label>
          <input type='text' value={employee.salary} />
          <label>Manager</label>
          <input type='number' value={employee.managerId} />
        </>
      )}
      <button type='submit'>Update</button>
    </form>
  );
};

export default EditUser;
