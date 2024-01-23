"use client";
import React, { useState } from "react";

type Props = {};

function AdminLoginPage({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    
    <>
    <div className="flex justify-center items-center">
      <div className="w-[150px] h-[150px] relative ml-20 mt-24 ">
        <div className="h-full w-full border-2 rounded-full border-gray-400 "></div>
      </div>
    </div>
    
    <div className="flex justify-center items-center ml-20 mt-5 font-bold text-[32px]">Login</div>
    
    <div className="flex justify-center items-center">
      <input placeholder="Username" className="ant-input ant-input-lg border ml-20 mt-5 border-gray-400 rounded-md " />
    </div>

    <div className="flex justify-center items-center">
      <input placeholder="username" className="ant-input ant-input-lg border ml-20 mt-5 border-gray-400 rounded-md " />
    </div>
    </>
  );
}

export default AdminLoginPage;
