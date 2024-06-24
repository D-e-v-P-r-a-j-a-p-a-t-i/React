import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Link as MuiLink } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', form);
      dispatch(login(response.data.token));
      navigate('/products'); // Redirect to a protected route after login
    } catch (error) {
      alert("No user found!");
      navigate('/register')
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '500px', margin: 'auto', backgroundColor:'white', padding:'30px' }}>
      <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>Login</Button>
      <Typography variant="body2" sx={{ marginTop: '16px', textAlign: 'center' }}>
        Not registered yet? <MuiLink component={Link} to="/register">Sign up</MuiLink>
      </Typography>
    </Box>
  );
};

export default Login;
