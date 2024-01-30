"use client";

import { useState } from "react";

interface inputValue {
  username: string;
  password: string;
  confirm_password: string;
  name: string;
  surname: string;
  role: string
  email: string;
  telephone: number;
}

const AccoutPage = () => {

  const [isValidateUsername, setIsValidateUsername] = useState<boolean>(true);
  const [isValidatePassword, setIsValidatePassword] = useState<boolean>(true);
  const [isValidateConfirmPassword, setIsValidateConfirmPassword] = useState<boolean>(true);
  const [isValidateName, setIsValidateName] = useState<boolean>(true);
  const [isValidateSurname, setIsValidateSurname] = useState<boolean>(true);
  const [isValidateRole, setIsValidateRole] = useState<boolean>(true);
  const [isValidateEmail, setIsValidateEmail] = useState<boolean>(true);
  const [isValidateTelephone, setIsValidateTelephone] = useState<boolean>(true)

};         

export default AccoutPage;