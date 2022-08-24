import { AiFillFacebook } from 'react-icons/ai';
import { ImInstagram } from 'react-icons/im';

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>Contact</h2>
        <p>The city library</p>
        <p>citystreet 123</p>
        <p>012-385</p>
        <p>test@biblioteket.com</p>
      </div>

      <div>
        <h2>Good to know</h2>
        <p>Loan rules</p>
        <p>common questions</p>
      </div>

      <div>
        <h2>Social media</h2>
        <ul>
          <li>
            <AiFillFacebook />
            The city library on Facebook
          </li>
          <li>
            <ImInstagram /> The city library on Instagram
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
