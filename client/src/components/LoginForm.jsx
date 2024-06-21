// see SignupForm.js for comments
import { useState } from 'react';//importing useState from react; hooks which allow us to add a variable
import { Form, Button, Alert } from 'react-bootstrap';//form, button, and alert imported from react-bootstrap library

import { LOGIN_USER } from '../utils/mutations';// importing loginUser function from API.js from utils folder located inside of src folder on the client folder(User)
import Auth from '../utils/auth'; //importing Auth function from auth.js from utils folder located inside of the src folder on the client folder(Authentication)
//function to create login form on the Modal
const LoginForm = () => {
  //useState for setting login input fields and data inserted will be tracked and udpated later if needed
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  //useState for updating
  const [validated] = useState(false);
  //useState used for updating an alert
  const [showAlert, setShowAlert] = useState(false);
  //function to handle any issues when
  const handleInputChange = (event) => {
    const { name, value } = event.target; //assigning
    setUserFormData({ ...userFormData, [name]: value }); //
  };
  //function to handle any issues when submitting a book in search engine
  const handleFormSubmit = async (event) => {
    event.preventDefault(); //

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget; //
    if (form.checkValidity() === false) {
      event.preventDefault(); //
      event.stopPropagation(); //
    }

    try {
      const response = await LOGIN_USER(userFormData); //

      if (!response.ok) { //if something unexpectedly happens, throw error
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json(); //
      console.log(user); //
      Auth.login(token); //
    } catch (err) { //
      console.error(err);
      setShowAlert(true);
    }
    //function to update user signing up
    setUserFormData({ 
      username: '',
      email: '',
      password: '',
    });
  };
//rendering Login form modal
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}> 
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
