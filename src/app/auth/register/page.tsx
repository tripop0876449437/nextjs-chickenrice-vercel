"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { registerSelector, registerSlice } from "@/business/store/auth/register.feature";

interface IinputValue {
  username: string;
  password: string;
  confirmpassword: string;
  name: string;
  surname: string;
  role: string
  email: string;
  telephone: number | string;
}

const AccoutPage = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const storeRester = useSelector(registerSelector);

  const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
  const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
  const [isValidateConfirmPassword, setIsValidateConfirmPassword] = useState<boolean>(true);
  const [isValidateName, setIsValidateName] = useState<boolean>(true);
  const [isValidateSurname, setIsValidateSurname] = useState<boolean>(true);
  const [isValidateRole, setIsValidateRole] = useState<boolean>(true);
  const [isValidateEmail, setIsValidateEmail] = useState<boolean>(true);
  const [isValidateTelephone, setIsValidateTelephone] = useState<boolean>(true)

  const [inputValue, setInputValue] = useState<IinputValue>({
    username: storeRester.username,
    password: storeRester.password,
    confirmpassword: "",
    name: storeRester.name,
    surname: storeRester.surname,
    role: storeRester.role,
    email: storeRester.email,
    telephone: storeRester.telephone,
  
  });

  const handleLabelStatus = (textValidate: string) => {
    return (
      <div>
        {textValidate == "password" ? (
          <div className="mt-2.5">
            <div className="text-red-500 w-[400px] text-[12px]">
              <p>
                Password must be 8 characters. It should contain Lowercase
                letters, uppercase letters, numbers, and a combination of
                symbols.
              </p>
              <ul>
                <li>• Alphabet (a-z, A-Z)</li>
                <li>• Numbers (0-9)</li>
                <li>
                  • Marks or special characters (!@#$%^&*()_+|~-=\`{}
                  []:&apos;;&quot;&lt;&gt;?,./){" "}
                </li>
                <li>• should be 8 or more characters long. </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-2.5">
            <div className="text-red-500 text-[12px]">
              <p>{textValidate}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  const handleValidatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    
    setInputValue((prevResultValue) => ({
      ...prevResultValue,
      password,
    }));
    
    if (password) {
      const lengtRequirement = password.length >= 8;
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      
      const hasLowercase = lowercaseRegex.test(password);
      const hasUppercase = uppercaseRegex.test(password);
      
      const isPasswordValidate =
      lengtRequirement &&
      hasLowercase &&
      hasUppercase;
      
      setIsValidatePassword(isPasswordValidate);
      setIsValidateConfirmPassword(isPasswordValidate);
    }
  };

  const isAllFieldsFilled = () => {
    return (
      inputValue.username !== "" &&
      inputValue.password !== "" &&
      inputValue.confirmpassword !== "" &&
      inputValue.name !== "" &&
      inputValue.surname !== "" &&
      inputValue.role !== "" &&
      inputValue.email !== "" &&
      inputValue.telephone !== ""
    );
  };

  const areAllValid = () => {
    return (
      isValidateUsername &&
      isValidatePassword &&
      isValidateConfirmPassword &&
      isValidateName &&
      isValidateSurname &&
      isValidateRole &&
      isValidateEmail && 
      isValidateTelephone
    );
  };

  const arePasswordMAtching = () => {
    return inputValue.password === inputValue.confirmpassword;
  };

  const handleEmptyField = () => {
    if (inputValue.username === "") setIsValidateUsername(false);
    if (inputValue.password === "") setIsValidatePassword(false);
    if (inputValue.confirmpassword === "") setIsValidateConfirmPassword(false);
    if (inputValue.name === "") setIsValidateName(false);
    if (inputValue.surname === "") setIsValidateSurname(false);
    if (inputValue.role === "") setIsValidateRole(false);
    if (inputValue.email === "") setIsValidateEmail(false);
    if (inputValue.telephone === "") setIsValidateTelephone(false);
  }
  
  const onSubmit = async () => {
    if (isAllFieldsFilled()) {
      if (areAllValid()) {
        if (!arePasswordMAtching()) {
          setIsValidateConfirmPassword(false);
        } else {

          const formatResultData = {
            username: inputValue.username,
            password: inputValue.password,
            confirmpassword: inputValue.confirmpassword,
            name: inputValue.name,
            surname: inputValue.surname,
            role: inputValue.role,
            email: inputValue.email,
            telephone: inputValue.telephone,
          }

          dispatch(registerSlice.actions.setStoreRegister(formatResultData));
        }
      }
    } else {
      handleEmptyField();
    }
  };

  return (
    <div className="h-full">
      
      <div className="flex justify-center items-center h-full">
        <div className="">
          <div className="text-center">
            <label className="text-slate-700 text-2xl font-bold">
              Register
            </label>
          </div>

          <div className=" flex justify-center items-center">
            <div className="">
              <label className="text-gray-900 text-base font-normal leading-normal">
                Username
              </label>
              <div className="mt-2">
                <Input
                  status={isValidateUsername ? "" : "error"}
                  size="large"
                  value={inputValue.username}
                  width={300}
                  placeholder="Username"
                  onChange={(e) => {
                    let username = e.target.value;

                    username.trim().length === 0
                    ? setIsValidateUsername(false)
                    : setIsValidateUsername(true);
                    
                    setInputValue((prevResultValue) => ({
                      ...prevResultValue,
                      username
                    }))
                  }}
                >
                  {!isValidateUsername &&
                  handleLabelStatus("Please enter Username...")}
                </Input>
              </div>
            </div>

            <div>
              <label className="text-gray-900 text-base font-normal leading-normal">
                Password
              </label>
              <div className="mt-2">
                  <Input.Password
                    status={isValidatePassword ? "" : "error"}
                    size="large"
                    value={inputValue.password}
                    width={300}
                    placeholder="********"
                    onChange={handleValidatePassword}
                  />

                  {!isValidatePassword && handleLabelStatus("password")}
              </div>
            </div>

            <div>
              <label className="text-gray-900 text-base font-normal leading-normal">
                Confirm Password
              </label>
              <div className="mt-2">
                  <Input.Password
                    status={isValidatePassword ? "" : "error"}
                    size="large"
                    placeholder="********"
                    onChange={(e) => {
                      let confirmpassword = e.target.value;

                      confirmpassword === inputValue.password
                      ? setIsValidateConfirmPassword(true)
                      : setIsValidateConfirmPassword(false)

                      setInputValue((prevResultValue) => ({
                        ...prevResultValue,
                        confirmpassword
                      }))
                    }}
                  />
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
};         

export default AccoutPage;