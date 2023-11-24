import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import { Alert, Form, Input, Button } from 'antd';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }
    try {
      const { data } = await login({ variables: { ...userFormData } });
      Auth.login(data.login.token);
    } catch (err) {
      console.error("Try/Catch Error: " + JSON.stringify(err));
      console.error("Mutation error: " + error);
      setShowAlert(true);
    }
    setUserFormData({ email: "", password: "" });
  };
  return (
    <>
    <Form>
      {showAlert && (
        <Alert
          showIcon
          type="error"
          message="Something went wrong with your login credentials!"
          onClose={() => setShowAlert(false)}
          closable
        />
      )}
      <Form.Item label="Enter Email:">
        <Input
          type="email"
          name="email"
          value={userFormData.email}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Enter Password:">
        <Input.Password
          name="password"
          value={userFormData.password}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleFormSubmit}
        disabled={!(userFormData.email && userFormData.password)}
      >
        Submit
      </Button>
    </Form>
    </>
  );
};

export default LoginForm;
