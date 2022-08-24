import { employeeStore } from '../store/index';
import { IEmployee } from '../interfaces/employee';

import { useState } from 'react';
import '../styles/pages/_myPage.scss';
import { EditUser } from '../components';

const MyPage = () => {
  const { employees } = employeeStore();
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const onHandleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {employees.map((employee: IEmployee) => {
        return (
          <>
            <h4>Welcome {employee.firstName}</h4>
            {!toggleEdit && (
              <form className='myPage-form' key={employee.id}>
                <label>Firstname</label>
                <input
                  type='text'
                  name='firstName'
                  disabled={true}
                  value={employee.firstName}
                  onChange={onHandleInput}
                />
                <label>Lastname</label>
                <input
                  type='text'
                  name='lastName'
                  disabled={true}
                  value={employee.lastName}
                  onChange={onHandleInput}
                />
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  disabled={true}
                  value={employee.email}
                  onChange={onHandleInput}
                />
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  disabled={true}
                  value={employee.username}
                  onChange={onHandleInput}
                />
                <label>Password</label>
                <input
                  type='text'
                  name='password'
                  disabled={true}
                  value={employee.password}
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
              </form>
            )}

            <button type='button' onClick={() => setToggleEdit(!toggleEdit)}>
              Edit
            </button>
            {toggleEdit && <EditUser employee={employee} />}
          </>
        );
      })}
    </div>
  );
};

export default MyPage;
