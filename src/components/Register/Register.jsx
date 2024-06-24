import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/addUser', form);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '500px', margin: 'auto', backgroundColor:'white', padding:'30px' }}>
      <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <TextField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required sx={{marginBottom:'10px'}}/>
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>Register</Button>
      <Typography variant="body2" sx={{ marginTop: '16px', textAlign: 'center' }}>
        Already registered? <MuiLink component={Link} to="/login">Sign in</MuiLink>
      </Typography>
    </Box>
  );
};

export default Register;
