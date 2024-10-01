import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, zodResolver} from '@mantine/form';

//redux

import AuthHandler from '../../api/AuthHandler';



import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
} from "reactstrap";


// import images
//@ts-ignore
import profile from "../../assets/images/profile-img.png";
//@ts-ignore
import logo from "../../assets/images/logo.svg";
//@ts-ignore
import lightlogo from "../../assets/images/logo-light.svg";
import { IconInfoCircle } from "@tabler/icons-react";
import { Alert, Button, Group, TextInput } from "@mantine/core";

const Login = (props: any) => {
  //meta title
  document.title = "Login | SureCheck";



  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back!</h5>
                        <h5 className="text-primary">SureCheck</h5>

                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
               <LoginForm/>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
  
                <p>
                  © {new Date().getFullYear()} SureCheck
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;

Login.propTypes = {
  history: PropTypes.object,
};


interface FormValues {
  email: string;
  password: string;
}


function LoginForm() {
  // Schema for home login
 const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'You must enter a password' }),
});


  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState(false); // State for loading status
  const form = useForm<FormValues>({
      mode: 'uncontrolled',
      initialValues: {
          email: '',
          password: '',
      },
      validate: zodResolver(loginSchema), // Use Zod resolver
  });

  const onSubmit = async (values: FormValues) => {
      setErrorMessage(null); // Reset error before login attempt
      setLoading(true); // Start loading
      try {
          const authHandler = new AuthHandler();
          await authHandler.login(values.email, values.password);
          navigate('/');
      } catch (error: any) {
          setErrorMessage(error?.message || 'An error occurred during login');
      } finally {
          setLoading(false); // Stop loading after login attempt
      }
  };

  const icon = <IconInfoCircle />;

  return (
      <>
          {errorMessage && (
              <Alert
                  variant="light"
                  color="red"
                  title="Login Error"
                  icon={icon}
                  className="mb-2">
                  {errorMessage}
              </Alert>
          )}

          <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  className="mb-2"
                  disabled={loading} // Disable input when loading
                  {...form.getInputProps('email')}
              />

              <TextInput
                  withAsterisk
                  label="Password"
                  placeholder="password"
                  type="password"
                  disabled={loading} // Disable input when loading
                  {...form.getInputProps('password')}
              />

              <Group mt="md" justify="flex-end">
                  <Button type="submit" loading={loading} disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                  </Button>
              </Group>
          </form>
      </>
  );
}