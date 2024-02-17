"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Form, Checkbox, Input } from "antd";
import { useDispatch } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SignInButton from "../../../common/components/elements/buttons/signinButton";
import Link from "next/link";

type Props = {};

function LoginPage({ }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [textResponse, setTextResponse] = useState<string>("");
  const [textStatus, setTextStatus] = useState<string>("");

  const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
  const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Here you can handle form submission, such as sending a request to authenticate the user
  };

  const handleCheckRememberMe = (e: CheckboxChangeEvent) => {
    e.target.checked
      ? sessionStorage.setItem("login_in", "yes")
      : sessionStorage.setItem("login_in", "no");
  };


  // return (
  //   <>
  //     <div className="flex justify-center items-center h-full">
  //       <div className="w-[150px] h-[150px] relative ml-20 mt-24 ">
  //         <div className="h-full w-full border-2 rounded-full border-gray-400 "></div>
  //       </div>
  //     </div>

  //     <div className="flex justify-center items-center ml-20 mt-5 font-bold text-[32px]">
  //       Login
  //     </div>

  //     <div className="flex justify-center items-center">
  //       <label
  //         htmlFor="username"
  //         className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal mr-3"
  //       >
  //         Username
  //       </label>

  //       <div className="mt-2.5">
  //         {!isValidateUsername && (
  //           <div className="text-red-500 text-[12px] py-2">
  //             <p>Please Enter Username</p>
  //           </div>
  //         )}

  //         <Input
  //           size="large"
  //           status={isValidateUsername ? "" : "error"}
  //           width={300}
  //           style={{ width: 300 }}
  //           onChange={(e) => {
  //             const username = e.target.value;

  //             username.trim().length === 0
  //               ? setIsValidateUsername(false)
  //               : setIsValidateUsername(true);

  //             setUsername(username);
  //           }}
  //           placeholder="username"
  //         ></Input>
  //       </div>
  //     </div>

  //     <div className="mt-[20px] flex justify-center items-center">
  //       <label
  //         htmlFor="Password"
  //         className="text-gray-900 text-base font-normal font-['Tahoma'] leading-normal mr-3"
  //       >
  //         Password
  //       </label>

  //       <div className="mt-2.5">
  //         {!isValidatePassword && (
  //           <div className=" text-red-500 text-[12px] py-2">
  //             <p>Please Enter Password</p>
  //           </div>
  //         )}

  //         <Input.Password
  //           size="large"
  //           status={isValidatePassword ? "" : "error"}
  //           width={300}
  //           style={{ width: 300 }}
  //           onChange={(e) => {
  //             let password = e.target.value;

  //             password.trim().length === 0
  //               ? setIsValidatePassword(false)
  //               : setIsValidatePassword(true);

  //             setPassword(password);
  //           }}
  //           placeholder="*******"
  //         />
  //       </div>
  //     </div>

  //     <div className="flex justify-center items-center mt-5  ">
  //       <div className="">
  //         <Checkbox onChange={handleCheckRememberMe}>Remember me</Checkbox>
  //       </div>
  //       <div className="text-sm ml-11">Forgot Password</div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <div className="flex justify-center ">
            <Image
              src="/login.png"
              alt="login.png"
              width={150}
              height={150}
            />
          </div>

          <div className="text-red-700 text-[32px] font-bold  leading-[30px] mt-[40px] flex justify-center">
            <p>Login</p>
          </div>

          <Form form={form} onFinish={onFinish}>
            <div className="mt-[40px]">
              <div>
                <div>
                  {!isValidateUsername && (
                    <div className="text-red-500 text-[12px] py-2">
                      <p>Please enter your username</p>
                    </div>
                  )}
                </div>
                <Form.Item>
                  <div className="relative mt-1">
                    <Input
                      status={isValidateUsername ? "" : "error"}
                      width={300}
                      style={{ width: 300 }}
                      onChange={(e) => {
                        const username = e.target.value;

                        username.trim().length === 0
                          ? setIsValidateUsername(false)
                          : setIsValidateUsername(true);

                        setUsername(username);
                      }}
                      placeholder="Username"
                      className="h-[40px] pl-[48px] pr-[16px] py-2 rounded-[30px] border-2 border-[#A93F3F]"
                    />
                    <Image
                      src="/user_enter.png"
                      alt="user_enter"
                      width={24}
                      height={24}
                      className="absolute left-[16px] top-1/2 transform -translate-y-1/2"
                      onError={(e) => console.error("Error loading image:", e)}
                    />
                  </div>
                </Form.Item>
              </div>
              <div className="mt-[20px]">
                <div>
                  {!isValidatePassword && (
                    <div className="text-red-500 text-[12px] py-2">
                      <p>Please enter your password</p>
                    </div>
                  )}
                </div>
                <Form.Item>
                  <div className="relative">
                    <Input.Password
                      width={300}
                      style={{ width: 300 }}
                      status={isValidatePassword ? "" : "error"}
                      onChange={(e) => {
                        let password = e.target.value;

                        password.trim().length === 0
                          ? setIsValidatePassword(false)
                          : setIsValidatePassword(true);

                        setPassword(password);
                      }}
                      placeholder="Password"
                      className="h-[40px] pl-[48px] pr-[16px] py-2 rounded-[30px] border-2 border-[#A93F3F]"
                    />
                    <Image
                      src="/lock_password_enter.png"
                      alt="lock_password_enter"
                      width={24}
                      height={24}
                      className="absolute left-[16px] top-1/2 transform -translate-y-1/2 z-10"
                      onError={(e) => console.error("Error loading image:", e)}
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <div className="flex justify-between text-[#A93F3F]">
                <div className="cursor-pointer">
                  <Checkbox onChange={handleCheckRememberMe} className="flex ">
                    <p className="text-[#A93F3F] text-[15px]">Remember me</p>
                  </Checkbox>
                </div>
                <div className="cursor-pointer"><p className="text-[#A93F3F] text-[15px]">Forgot Password</p></div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-center h-[40px]">
                <Link href="/auth/register">
                  <SignInButton buttonType="button" textButton="Register" />
                </Link>
                <div className="px-[8px]"></div>
                <SignInButton buttonType="submit" textButton="Login" />
              </div>
            </Form.Item>
          </Form>
        </div >
      </div >
    </>
  )
}

export default LoginPage;
