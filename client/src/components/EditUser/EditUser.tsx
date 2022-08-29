import { useState } from 'react';
import { IEditUser } from '../../interfaces/employee';
import { employeeStore } from '../../store';

const EditUser = ({ user }: IEditUser) => {
  const [input, setInput] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
  });

  const { setEmployee } = employeeStore();
  // const employeeX = employeeStore((state) => state.employee);

  const onHandleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedEmployee = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      password: input.password,
      salary: user.salary,
      managerId: user.managerId,
    };

    try {
      const res = await fetch(
        `http://localhost:8000/api/employees/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const json = await res.json();

      setEmployee(json.data);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('Couldnt update employee.');
      }
    }
  };

  return (
    <form className='myPage-form' key={user.id} onSubmit={onHandleUpdate}>
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
      <>
        <label>Salary</label>
        <input
          type='text'
          value={user.salary}
          disabled={
            parseInt(user.isManager) || parseInt(user.isCEO) === 1
              ? false
              : true
          }
        />
        <label>Manager</label>
        <input
          type='number'
          value={user.managerId}
          disabled={
            parseInt(user.isManager) || parseInt(user.isCEO) === 1
              ? false
              : true
          }
        />
      </>
      <button type='submit'>Update</button>
    </form>
  );
};

export default EditUser;
