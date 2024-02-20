"use client";

import { useEffect } from "react";
import { login } from "@/business/service/auth.service";

export default function page() {
  const computeLogin = async () => {

    const response = await login({
      username: "ber1",
      password: "123456879",
    });
    console.log(response.data);
  };

  return (
    <div>
      <button onClick={computeLogin}>login</button>
    </div>
  );
}
