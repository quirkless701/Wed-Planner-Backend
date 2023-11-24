import { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [createUser, { error }] = useMutation(CREATE_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await createUser({ variables: { ...formData } });
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error('Try/Catch Error: ' + err);
      console.error('Mutation error: ' + error);
      setShowAlert(true);
    }
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <>
      <Form>
        {showAlert && (
          <Alert
            showIcon
            type="error"
            message="Something went wrong with your sign up!"
            onClose={() => setShowAlert(false)}
            closable
          />
        )}
        <Form.Item label="Enter Username:">
          <Input
            type="text"
            placeholder="Your username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Enter Email:">
          <Input
            type="email"
            placeholder="Your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Enter Password:">
          <Input.Password
            type="password"
            placeholder="Your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleFormSubmit}
            disabled={!(formData.username && formData.email && formData.password)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;