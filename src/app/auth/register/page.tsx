"use client";

import { Input, Button } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  // State variables to store form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [roleName, setRoleName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform registration logic here (e.g., send data to server)
    const formData = {
      username,
      password,
      confirmPassword,
      name,
      surname,
      roleName,
      email,
      phoneNumber
    };
    console.log('Registration form submitted:', formData);
    // Optionally, you can redirect the user to another page after registration
  };

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
              value={username}
              style={{ width: 400 }}
              onChange={(e) => setUsername(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="password" className='text-[18px] font-bold text-[#A93F3F]'>Password:</label>
            <Input
              type="password"
              id="password"
              value={password}
              style={{ width: 400 }}
              onChange={(e) => setPassword(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="confirmPassword" className='text-[18px] font-bold text-[#A93F3F]'>Confirm Password:</label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              style={{ width: 400 }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="name" className='text-[18px] font-bold text-[#A93F3F]'>Name:</label>
            <Input
              type="text"
              id="name"
              value={name}
              style={{ width: 400 }}
              onChange={(e) => setName(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="surname" className='text-[18px] font-bold text-[#A93F3F]'>Surname:</label>
            <Input
              type="text"
              id="surname"
              value={surname}
              style={{ width: 400 }}
              onChange={(e) => setSurname(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="roleName" className='text-[18px] font-bold text-[#A93F3F]'>Role Name:</label>
            <Input
              type="text"
              id="roleName"
              value={roleName}
              style={{ width: 400 }}
              onChange={(e) => setRoleName(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="email" className='text-[18px] font-bold text-[#A93F3F]'>Email:</label>
            <Input
              type="email"
              id="email"
              value={email}
              style={{ width: 400 }}
              onChange={(e) => setEmail(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-end items-center w-[590px] gap-x-[16px] mb-[30px]'>
            <label htmlFor="phoneNumber" className='text-[18px] font-bold text-[#A93F3F]'>Telephone Number:</label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              style={{ width: 400 }}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='h-[36px] border-2 border-[#A93F3F]'
            />
          </div>
          <div className='flex justify-center'>
            <Link href='/auth/login'>
              <Button
                type="primary"
                htmlType="submit"
                style={buttonStyles} // Apply the styles dynamically
                onMouseEnter={() => setIsHovered(true)} // Set isHovered to true when mouse enters
                onMouseLeave={() => setIsHovered(false)} // Set isHovered to false when mouse leaves
              >
                สมัครสมาชิก
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;












































// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Input } from "antd";
// import { useRouter } from "next/navigation";
// import { registerSelector, registerSlice } from "@/business/store/auth/register.feature";

// interface IinputValue {
//   username: string;
//   password: string;
//   confirmpassword: string;
//   name: string;
//   surname: string;
//   role: string
//   email: string;
//   telephone: number | string;
// }

// const AccoutPage = () => {

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const storeRester = useSelector(registerSelector);

//   const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
//   const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
//   const [isValidateConfirmPassword, setIsValidateConfirmPassword] = useState<boolean>(true);
//   const [isValidateName, setIsValidateName] = useState<boolean>(true);
//   const [isValidateSurname, setIsValidateSurname] = useState<boolean>(true);
//   const [isValidateRole, setIsValidateRole] = useState<boolean>(true);
//   const [isValidateEmail, setIsValidateEmail] = useState<boolean>(true);
//   const [isValidateTelephone, setIsValidateTelephone] = useState<boolean>(true)

//   const [inputValue, setInputValue] = useState<IinputValue>({
//     username: storeRester.username,
//     password: storeRester.password,
//     confirmpassword: "",
//     name: storeRester.name,
//     surname: storeRester.surname,
//     role: storeRester.role,
//     email: storeRester.email,
//     telephone: storeRester.telephone,
//   });

//   const handleLabelStatus = (textValidate: string) => {
//     return (
//       <div>
//         {textValidate == "password" ? (
//           <div className="mt-2.5">
//             <div className="text-red-500 w-[400px] text-[12px]">
//               <p>
//                 Password must be 8 characters. It should contain Lowercase
//                 letters, uppercase letters, numbers, and a combination of
//                 symbols.
//               </p>
//               <ul>
//                 <li>• Alphabet (a-z, A-Z)</li>
//                 <li>• Numbers (0-9)</li>
//                 <li>
//                   • Marks or special characters (!@#$%^&*()_+|~-=\`{}
//                   []:&apos;;&quot;&lt;&gt;?,./){" "}
//                 </li>
//                 <li>• should be 8 or more characters long. </li>
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-2.5">
//             <div className="text-red-500 text-[12px]">
//               <p>{textValidate}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }
  
//   const handleValidatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const password = e.target.value;
    
//     setInputValue((prevResultValue) => ({
//       ...prevResultValue,
//       password,
//     }));
    
//     if (password) {
//       const lengtRequirement = password.length >= 8;
//       const lowercaseRegex = /[a-z]/;
//       const uppercaseRegex = /[A-Z]/;
      
//       const hasLowercase = lowercaseRegex.test(password);
//       const hasUppercase = uppercaseRegex.test(password);
      
//       const isPasswordValidate =
//       lengtRequirement &&
//       hasLowercase &&
//       hasUppercase;
      
//       setIsValidatePassword(isPasswordValidate);
//       setIsValidateConfirmPassword(isPasswordValidate);
//     }
//   };

//   const isAllFieldsFilled = () => {
//     return (
//       inputValue.username !== "" &&
//       inputValue.password !== "" &&
//       inputValue.confirmpassword !== "" &&
//       inputValue.name !== "" &&
//       inputValue.surname !== "" &&
//       inputValue.role !== "" &&
//       inputValue.email !== "" &&
//       inputValue.telephone !== ""
//     );
//   };

//   const areAllValid = () => {
//     return (
//       isValidateUsername &&
//       isValidatePassword &&
//       isValidateConfirmPassword &&
//       isValidateName &&
//       isValidateSurname &&
//       isValidateRole &&
//       isValidateEmail && 
//       isValidateTelephone
//     );
//   };

//   const arePasswordMAtching = () => {
//     return inputValue.password === inputValue.confirmpassword;
//   };

//   const handleEmptyField = () => {
//     if (inputValue.username === "") setIsValidateUsername(false);
//     if (inputValue.password === "") setIsValidatePassword(false);
//     if (inputValue.confirmpassword === "") setIsValidateConfirmPassword(false);
//     if (inputValue.name === "") setIsValidateName(false);
//     if (inputValue.surname === "") setIsValidateSurname(false);
//     if (inputValue.role === "") setIsValidateRole(false);
//     if (inputValue.email === "") setIsValidateEmail(false);
//     if (inputValue.telephone === "") setIsValidateTelephone(false);
//   }
  
//   const onSubmit = async () => {
//     if (isAllFieldsFilled()) {
//       if (areAllValid()) {
//         if (!arePasswordMAtching()) {
//           setIsValidateConfirmPassword(false);
//         } else {

//           const formatResultData = {
//             username: inputValue.username,
//             password: inputValue.password,
//             confirmpassword: inputValue.confirmpassword,
//             name: inputValue.name,
//             surname: inputValue.surname,
//             role: inputValue.role,
//             email: inputValue.email,
//             telephone: inputValue.telephone,
//           }

//           dispatch(registerSlice.actions.setStoreRegister(formatResultData));
//         }
//       }
//     } else {
//       handleEmptyField();
//     }
//   };

//   return (
//     <div className="h-full">
      
//       <div className="flex justify-center items-center h-full">
//         <div className="">
//           <div className="text-center">
//             <label className="text-slate-700 text-2xl font-bold">
//               Register
//             </label>
//           </div>

//           <div className=" flex justify-center items-center">
//             <div className="">
//               <label className="text-gray-900 text-base font-normal leading-normal">
//                 Username
//               </label>
//               <div className="mt-2">
//                 <Input
//                   status={isValidateUsername ? "" : "error"}
//                   size="large"
//                   value={inputValue.username}
//                   width={300}
//                   placeholder="Username"
//                   onChange={(e) => {
//                     let username = e.target.value;

//                     username.trim().length === 0
//                     ? setIsValidateUsername(false)
//                     : setIsValidateUsername(true);
                    
//                     setInputValue((prevResultValue) => ({
//                       ...prevResultValue,
//                       username
//                     }))
//                   }}
//                 >
//                   {!isValidateUsername &&
//                   handleLabelStatus("Please enter Username...")}
//                 </Input>
//               </div>
//             </div>

//             <div>
//               <label className="text-gray-900 text-base font-normal leading-normal">
//                 Password
//               </label>
//               <div className="mt-2">
//                   <Input.Password
//                     status={isValidatePassword ? "" : "error"}
//                     size="large"
//                     value={inputValue.password}
//                     width={300}
//                     placeholder="********"
//                     onChange={handleValidatePassword}
//                   />

//                   {!isValidatePassword && handleLabelStatus("password")}
//               </div>
//             </div>

//             <div>
//               <label className="text-gray-900 text-base font-normal leading-normal">
//                 Confirm Password
//               </label>
//               <div className="mt-2">
//                   <Input.Password
//                     status={isValidatePassword ? "" : "error"}
//                     size="large"
//                     placeholder="********"
//                     onChange={(e) => {
//                       let confirmpassword = e.target.value;

//                       confirmpassword === inputValue.password
//                       ? setIsValidateConfirmPassword(true)
//                       : setIsValidateConfirmPassword(false)

//                       setInputValue((prevResultValue) => ({
//                         ...prevResultValue,
//                         confirmpassword
//                       }))
//                     }}
//                   />
//               </div>
//             </div>
          
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };         

// export default AccoutPage;