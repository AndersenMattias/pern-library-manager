import { employeeStore } from '../store/index';
import { IEmployee } from '../interfaces/employee';

import { useState } from 'react';
import '../styles/pages/_myPage.scss';
import { EditUser } from '../components';

const MyPage = () => {
  const { employee } = employeeStore();
  const x = employeeStore((state) => state.employee);
  console.log(x);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  console.log(employee);

  return (
    <div>
      {employee.map((employee: IEmployee) => {
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
                />
                <label>Lastname</label>
                <input
                  type='text'
                  name='lastName'
                  disabled={true}
                  value={employee.lastName}
                />
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  disabled={true}
                  value={employee.email}
                />
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  disabled={true}
                  value={employee.username}
                />
                <label>Password</label>
                <input
                  type='text'
                  name='password'
                  disabled={true}
                  value={employee.password}
                />

                <label>Salary</label>
                <input type='text' disabled={true} value={employee.salary} />
                <label>Manager</label>
                <input
                  type='number'
                  disabled={true}
                  value={employee.managerId}
                />
              </form>
            )}

            <button type='button' onClick={() => setToggleEdit(!toggleEdit)}>
              Edit
            </button>
            {toggleEdit && <EditUser user={employee} />}
          </>
        );
      })}
    </div>
  );
};

export default MyPage;
