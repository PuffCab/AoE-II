import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import NavBar from '../../components/NavBar/NavBar'
import { AuthContext } from '../../context/AuthContext'
import './Register.css'

function Register() {

  const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noMatch, setNoMatch] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setNoMatch(true);
    } else {
      register(email, password);
  }};

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br /><br />
        <Form className="formDiv">
          <h1>Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formText">Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required/>
          { error === "auth/invalid-email" ? <p className="warningText">Invalid email format.</p> : null}
          { error === "auth/email-already-in-use" ? <p className="warningText">Email already in use.</p> : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="formText">Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} required/>
          <Form.Label className="formText">Confirm password</Form.Label>
          <Form.Control type="password" name="confirm_password" placeholder="Confirm password" id="confirm-password" onChange={handleConfirmPasswordChange} required/>
            { noMatch ? <p className="warningText">Passwords don't match.</p> : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="By checking this, you accept our privacy policy." required/>
        </Form.Group>
        <Button variant="primary" onClick={handleRegister}>Register</Button>
        </Form>
        <br /><br /><br /><br />
      </div>
    </>
  )
}

export default Register