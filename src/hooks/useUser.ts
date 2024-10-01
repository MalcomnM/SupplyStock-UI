import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterval } from '@mantine/hooks';
import { authApi } from '../api/Services';


const useUser = (): {
  user: IDecodedAccessToken | null;
  isUserAuthenticated: boolean | void;
  logout: () => void;
} => {
  const navigate = useNavigate();

  const user = authApi.authHandler.getUser();
  const isUserAuthenticated = !authApi.authHandler.isTokenExpired();

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login');
    }
  }, [isUserAuthenticated, navigate]);


  // Interval to check authentication every 10 minutes
  const checkAuthInterval = useInterval(() => {
    const authenticated = !authApi.authHandler.isTokenExpired();
    if (!authenticated) {
      authApi.authHandler.deleteCookie();
      navigate('/login');
    }
  }, 10 * 60 * 1000); // 10 minutes in milliseconds

  useEffect(() => {
    // Start the interval when component mounts
    checkAuthInterval.start();

    return () => {
      // Clean up on component unmount
      checkAuthInterval.stop();
    };
  }, [checkAuthInterval]);




  return {
    user,
    isUserAuthenticated,
    logout: () => {
      authApi.authHandler.deleteCookie();
      navigate('/auth/login');
    },
  };
};

export default useUser;

interface IDecodedAccessToken {
  nbf: number;
  exp: number;
  iss: string;
  aud: string[];
  client_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  userid: string;
  username: string;
  name: string;
  email: string;
  role: string[] | string;
  scope: string[];
  amr: string[];
}
