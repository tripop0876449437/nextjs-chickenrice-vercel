'use client';

import { Input, Button } from 'antd';
import React, { useState } from 'react';

import { register } from '@/business/service/register'; // Import the register function
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/business/service/auth'; // Import your authentication function

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    backgroundColor: isHovered ? '#791E1E' : '#A93F3F',
    borderColor: isHovered ? '#791E1E' : '#A93F3F',
    fontSize: '20px',
    padding: '0px 8px',
    height: '40px',
    weigth: '123px',
    borderRadius: '30px',
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    rolename: '',
    email: '',
    phonenumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the register function with the form data
      // console.log(formData);
      
      const response = await register(formData);
      // console.log('Registration successful:', response);

      // Redirect to login page
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Registration failed:', error.message);
      // Handle registration failure (show error message, etc.)
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    if (isAuthenticated()) {
      // Redirect the user to the main page or dashboard
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center'>
        <h2 className='text-[#A93F3F] text-[32px] font-bold mb-[30px]'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="username" className='text-[18px] font-bold text-[#A93F3F]'>Username:</label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="password" className='text-[18px] font-bold text-[#A93F3F]'>Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          {/* <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="confirmPassword" className='text-[18px] font-bold text-[#A93F3F]'>Confirm Password:</label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              // value={formData.confirmPassword}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div> */}
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="name" className='text-[18px] font-bold text-[#A93F3F]'>Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="surname" className='text-[18px] font-bold text-[#A93F3F]'>Surname:</label>
            <Input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="rolename" className='text-[18px] font-bold text-[#A93F3F]'>Role Name:</label>
            <Input
              type="text"
              id="rolename"
              name="rolename"
              value={formData.rolename}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="email" className='text-[18px] font-bold text-[#A93F3F]'>Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="phonenumber" className='text-[18px] font-bold text-[#A93F3F]'>Telephone Number:</label>
            <Input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              style={{ width: 400 }}
              onChange={handleChange}
              className='h-[36px] border-2 border-[#A93F3F] rounded-none'
            />
          </div>
          <div className='flex justify-center'>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyles} // Apply the styles dynamically
              onMouseEnter={() => setIsHovered(true)} // Set isHovered to true when mouse enters
              onMouseLeave={() => setIsHovered(false)} // Set isHovered to false when mouse leaves
            >
              สมัครสมาชิก
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;



