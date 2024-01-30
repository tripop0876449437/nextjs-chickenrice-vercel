"use client";
import { useState } from "react";

type Props = {};

function LoginPage({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [textResponse, setTextResponse] = useState<string>("");
  const [textStatus, setTextStatus] = useState<string>("");

  const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
  const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[150px] h-[150px] relative ml-20 mt-24 ">
          <div className="h-full w-full border-2 rounded-full border-gray-400 "></div>
        </div>
      </div>

      <div className="flex justify-center items-center ml-20 mt-5 font-bold text-[32px]">
        Login
      </div>

      <div className="flex justify-center items-center">
        <label
          htmlFor="username"
          className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal"
        >
          Username
        </label>

        <div className="mt-2.5">
          {!isValidateUsername && (
            <div className="text-red-500 text-[12px] py-2">
              <p>Username</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] flex justify-center items-center">
        <label
          htmlFor="Password"
          className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal"
        >
          Password
        </label>

        <div className="mt-2.5">
          {!isValidatePassword && (
            <div className=" text-red-500 text-[12px] py-2">
              <p>Password</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-5 ">
        <div className="">Remember me</div>
        <div className=""> Forgot Password</div>
      </div>
    </>
  );
}

export default LoginPage;
