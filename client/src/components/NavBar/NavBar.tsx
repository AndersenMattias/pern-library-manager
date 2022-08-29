import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoReorderThree } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

import '../../styles/components/_navBar.scss';
import LoginModal from '../LoginModal/LoginModal';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const [expandNavbar, setExpandNavbar] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  const hamburgerIcon = (
    <div className='hamburger'>
      <IoReorderThree
        size={40}
        color='white'
        onClick={() => {
          setExpandNavbar((prev) => !prev);
        }}
      />
    </div>
  );

  const closeIcon = (
    <div className='closeMenu'>
      <AiOutlineClose
        size={20}
        color='black'
        onClick={() => {
          setExpandNavbar((prev) => !prev);
        }}
      />
    </div>
  );

  const onLogout = () => {
    setExpandNavbar((prev) => !prev);
    setToggleLogin(!toggleLogin);
  };

  // console.log('employee logged in: ', employees);

  return (
    <header>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div>
            <Link to='/'>
              <h1>The city library</h1>
            </Link>
          </div>
          {!toggleLogin && (
            <div className='loginBtn-container'>
              <button onClick={() => setModalOpen(true)}>
                <FaUser />

                <p>Login</p>
              </button>
            </div>
          )}
        </div>

        {expandNavbar ? closeIcon : hamburgerIcon}

        <div className={expandNavbar ? 'open' : 'close'}>
          <ul>
            <Link to='/my-page'>
              <li>My page</li>
            </Link>
            <Link to='/library'>
              <li>View library</li>
            </Link>
            <Link to='/events'>
              <li>Events</li>
            </Link>
            <Link to='/contact'>
              <li>Contact</li>
            </Link>
            {toggleLogin && (
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {modalOpen && (
        <LoginModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          toggleLogin={toggleLogin}
          setToggleLogin={setToggleLogin}
        />
      )}
    </header>
  );
};

export default NavBar;
