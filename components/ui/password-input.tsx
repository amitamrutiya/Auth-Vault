import * as React from "react";

import { Input } from "./input";
import { EyeClosedIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        suffix={
          showPassword ? (
            <FiEye onClick={() => setShowPassword(false)} />
          ) : (
            <FiEyeOff onClick={() => setShowPassword(true)} />
          )
        }
        className={className}
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
      />
    );
  }
);
PasswordInput.displayName = "Input";

export { PasswordInput };
