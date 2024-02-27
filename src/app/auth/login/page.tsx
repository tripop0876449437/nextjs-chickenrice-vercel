"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Form, Checkbox, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SignInButton from "../../../common/components/elements/buttons/signinButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/business/service/api";
import { login } from '@/business/service/login'; 
import { isAuthenticated } from '@/business/service/auth'; // Import your authentication function

type Props = {};

const LoginPage = () => {
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // Send a POST request to the login API endpoint
      console.log(formData);
      
      const response = await login(formData);
      // console.log('Registration successful:', response);

      // Check if the login was successful (status code 200)
      if (response.status === 200) {
        // Redirect the user to the dashboard or another page
        router.push("/");
      } else {
        // Display an error message if login failed
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Display an error message if an exception occurred during login
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckRememberMe = (e: CheckboxChangeEvent) => {
    e.target.checked
      ? sessionStorage.setItem("login_in", "yes")
      : sessionStorage.setItem("login_in", "no");
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
                <Form.Item>
                  <div className="relative mt-1">
                    <Input
                      width={300}
                      style={{ width: 300 }}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
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
                <Form.Item>
                  <div className="relative">
                    <Input.Password
                      width={300}
                      id="password"
                      name="password"
                      value={formData.password}
                      style={{ width: 300 }}
                      onChange={handleChange}
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
