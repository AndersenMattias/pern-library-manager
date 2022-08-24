import { useState } from 'react';

import { employeeStore } from '../../store';

import '../../styles/components/_loginModal.scss';
import { useNavigate } from 'react-router-dom';

interface ILoginModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setModalOpen, modalOpen }: ILoginModalProps) => {
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);

  // login state
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const { setEmployee, employees, reset } = employeeStore();

  const onFetchEmployee = async () => {
    const res = await fetch(
      `http://localhost:8000/api/employees/${input.username}`
    );
    const json = await res.json();
    setEmployee(json.data);
  };

  const onLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFetchEmployee();
    setToggleLogin(!toggleLogin);
    setModalOpen(!modalOpen);
    navigate('/my-page');

    // if (input.username)
  };

  const onLogout = () => {
    reset();
    setToggleLogin(!toggleLogin);
    console.log('employee logged out: ', employees);
  };

  const onHandleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className='title'>
          <h3>Login</h3>
        </div>
        <div className='body'>
          {modalOpen && (
            <div className='login-wrapper'>
              <form onSubmit={onLoginForm}>
                <input
                  value={input.username}
                  type='text'
                  name='username'
                  placeholder='username'
                  onChange={onHandleInput}
                />
                <input
                  value={input.password}
                  type='text'
                  name='password'
                  placeholder='password'
                  onChange={onHandleInput}
                />
                <button type='submit'>Login</button>
              </form>
            </div>
          )}
          <p>Forgot password?</p>
          <p>Register</p>
        </div>
        <div className='footer'>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id='cancelBtn'
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>

      {toggleLogin && (
        <div onClick={onLogout}>
          <button>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
