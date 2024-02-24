import Input from "antd/es/input/Input";
import LoginPage from "./auth/login/page";
import Header from "@/common/components/elements/templatess/Header";
import React, { useState } from "react";
import Image from "next/image";
import Menulist from "@/common/components/elements/templatess/Menulist";
import Menubutton from "@/common/components/elements/buttons/Menubutton";
import MenuselectbuttonProp from "@/common/components/elements/buttons/Menubutton";
import Orderlist from "@/common/components/elements/templatess/Order";

type Props = {};

export default async function IndexSSPage({}: Props) {
  
  return(
  <main>
  {
    //  <Menulist/> 
  }
    {/* <Orderlist/> */}
  {
  <Header/> 
  }
  {
    /* <LoginPage/> */
  }

   </main>
  )

  
  
}
