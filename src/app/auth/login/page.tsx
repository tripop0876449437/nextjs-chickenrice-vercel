"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Checkbox, Input } from "antd";
import { useDispatch } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SignInButton from "../../signinButton";

type Props = {};

function LoginPage({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [textResponse, setTextResponse] = useState<string>("");
  const [textStatus, setTextStatus] = useState<string>("");

  const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
  const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCheckRememberMe = (e: CheckboxChangeEvent) => {
    e.target.checked
      ? sessionStorage.setItem("login_in", "yes")
      : sessionStorage.setItem("login_in", "no");
  };

  // return (
  // //   <>
  // //     <div className="flex justify-center items-center h-full">
  // //       <div className="w-[150px] h-[150px] relative ml-20 mt-24 ">
  // //         <div className="h-full w-full border-2 rounded-full border-gray-400 "></div>
  // //       </div>
  // //     </div>

  // //     <div className="flex justify-center items-center ml-20 mt-5 font-bold text-[32px]">
  // //       Login
  // //     </div>

  // //     <div className="flex justify-center items-center">
  // //       <label
  // //         htmlFor="username"
  // //         className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal mr-3"
  // //       >
  // //         Username
  // //       </label>

  // //       <div className="mt-2.5">
  // //         {!isValidateUsername && (
  // //           <div className="text-red-500 text-[12px] py-2">
  // //             <p>Please Enter Username</p>
  // //           </div>
  // //         )}

  // //         <Input
  // //           size="large"
  // //           status={isValidateUsername ? "" : "error"}
  // //           width={300}
  // //           style={{ width: 300 }}
  // //           onChange={(e) => {
  // //             const username = e.target.value;

  // //             username.trim().length === 0
  // //               ? setIsValidateUsername(false)
  // //               : setIsValidateUsername(true);

  // //             setUsername(username);
  // //           }}
  // //           placeholder="username"
  // //         ></Input>
  // //       </div>
  // //     </div>

  // //     <div className="mt-[20px] flex justify-center items-center">
  // //       <label
  // //         htmlFor="Password"
  // //         className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal mr-3"
  // //       >
  // //         Password
  // //       </label>

  // //       <div className="mt-2.5">
  // //         {!isValidatePassword && (
  // //           <div className=" text-red-500 text-[12px] py-2">
  // //             <p>Please Enter Password</p>
  // //           </div>
  // //         )}

  // //         <Input.Password
  // //           size="large"
  // //           status={isValidatePassword ? "" : "error"}
  // //           width={300}
  // //           style={{ width: 300 }}
  // //           onChange={(e) => {
  // //             let password = e.target.value;

  // //             password.trim().length === 0
  // //               ? setIsValidatePassword(false)
  // //               : setIsValidatePassword(true);

  // //             setPassword(password);
  // //           }}
  // //           placeholder="*******"
  // //         />
  // //       </div>
  // //     </div>

  // //     <div className="flex justify-center items-center mt-5  ">
  // //       <div className="">
  // //         <Checkbox onChange={handleCheckRememberMe}>Remember me</Checkbox>
  // //       </div>
  // //       <div className="text-sm ml-11">Forgot Password</div>
  // //     </div>
  // //   </>
  // );

  return(
    <div className="flex justify-center items-center h-full">
      <div className="">
        <div className="flex justify-center mt-[50px]">
          <Image
            src=""
            alt=""
            width={100}
            height={100}
          />
        </div>

        <div className="text-red-700 text-2xl font-bold  leading-[30px] mt-[40px] flex justify-center">
          <p>Login</p>
        </div>

        <div className="mt-[40px]">
          {/* <form action="" onSubmit={onSubmit}> */}
            <div>
              <label
                htmlFor="username"
                className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal"
              >
                Username
              </label>

              <div className="mt-2.5">
                {!isValidateUsername && (
                  <div className="text-red-500 text-[12px] py-2">
                    <p>Please enter your username</p>
                  </div>
                )}

                <Input
                  size="large"
                  status={isValidateUsername ? "" : "error"}
                  width={400}
                  style={{ width: 400 }}
                  onChange={(e) => {
                    const username = e.target.value;

                    username.trim().length === 0
                      ? setIsValidateUsername(false)
                      : setIsValidateUsername(true);

                    setUsername(username);
                  }}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="mt-[20px]">
              <label
                htmlFor="Password"
                className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal"
              >
                Password
              </label>

              <div className="mt-2.5">
                {!isValidatePassword && (
                  <div className="text-red-500 text-[12px] py-2">
                    <p>Please enter your password</p>
                  </div>
                )}

                <Input.Password
                  size="large"
                  status={isValidatePassword ? "" : "error"}
                  onChange={(e) => {
                    let password = e.target.value;

                    password.trim().length === 0
                      ? setIsValidatePassword(false)
                      : setIsValidatePassword(true);

                    setPassword(password);
                  }}
                  placeholder="*********"
                />
              </div>
            </div>

            <div className="flex justify-between mt-5 text-red-700">
              <div className="cursor-pointer">
                <Checkbox onChange={handleCheckRememberMe}>
                  Remember me
                </Checkbox>
              </div>
              <div className="cursor-pointer  text-sm mt-1">Forgot Password</div>
            </div>

            <div className="mt-[20px]">
              <SignInButton buttonType="submit" textButton="Login" />
            </div>
{/* 
            <div className="flex justify-center mt-5 ">
              <p className="pr-2">Don’t have an account?</p>
              <p
                className="text-green-700 hover:border-b hover:border-green-700 cursor-pointer"
                onClick={() => {
                  router.push("/auth/register/account");
                }}
              >
                Sign up
              </p>
              <p className="pl-2">here</p>
            </div> */}

            
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
