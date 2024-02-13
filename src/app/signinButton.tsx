interface ComponentProps {
  onClick?: () => void;
  textButton: string
  buttonType: "submit" | "reset" | "button" | undefined
}

const SignInButton = ({ onClick, textButton, buttonType }: ComponentProps) => {
  return (
    <main>
      <button type={buttonType} onClick={onClick} className="w-full  p-3 bg-gray-700  border border-gray-800 rounded-md justify-center items-center gap-2.5 inline-flex">
        <p className="text-red-400 text-base font-normal font-['Tahoma'] leading-normal">
          {textButton}
        </p>
      </button>
    </main>
  );
};

export default SignInButton; 