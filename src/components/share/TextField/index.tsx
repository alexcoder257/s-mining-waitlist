"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import classNames from "classnames";
import Icon from "../Icon";
type Addon = string | { type: "text" | "icon"; name: string } | React.ReactNode;

interface TextFieldProps {
  label?: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefix?: Addon;
  suffix?: Addon;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  readOnly?: boolean;
  required?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;
  onBlur?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  prefix,
  suffix,
  helperText,
  error = false,
  success = false,
  disabled = false,
  className,
  inputClassName,
  labelClassName,
  inputProps,
  required = false,
  readOnly,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const getIconColor = () => {
    if (error) return "#E10500";
    if (success) return undefined;
    return isFocused ? "#2977F4" : undefined;
  };

  const renderAddon = (addon: Addon | undefined) => {
    if (!addon) return null;

    if (typeof addon === "string") {
      return <span className={`${prefix ? "mr-1" : ""} text-1`}>{addon}</span>;
    }

    if (React.isValidElement(addon)) {
      return <div className={`${prefix ? "mr-1" : ""}`}>{addon}</div>;
    }

    if (typeof addon === "object" && "type" in addon && "name" in addon) {
      if (addon.type === "icon") {
        return (
          <div className={`${prefix ? "mr-[2px]" : ""}`}>
            <Icon
              name={addon.name}
              width="16px"
              height="16px"
              color={getIconColor()}
              stroke={getIconColor()}
            />
          </div>
        );
      }

      return (
        <span className={`${prefix ? "mr-1" : ""} text-1`}>{addon.name}</span>
      );
    }

    return null;
  };

  useEffect(() => {
    if (inputRef.current?.input) {
      inputRef.current.input.blur();
    }
  }, [isPasswordVisible]);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className={classNames(className)}>
      {label && (
        <label
          className={classNames("block text-2 text-xs mb-1", labelClassName)}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <Input
        ref={inputRef}
        readOnly={readOnly}
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        prefix={prefix && renderAddon(prefix)}
        suffix={
          type === "password" ? (
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="focus:outline-none"
              disabled={disabled}
            >
              <Icon
                name={isPasswordVisible ? "eye" : "eye-off"}
                width="16px"
                height="16px"
                color={disabled ? "#C2C2C2" : "#1E1E1E"}
              />
            </button>
          ) : (
            suffix && renderAddon(suffix)
          )
        }
        className={classNames(
          "h-[44px] bg-transparent focus-within:bg-transparent hover:bg-transparent rounded-lg",
          {
            "border-[#E10500] hover:border-[#E10500] focus-within:border-[#E10500]":
              error,
            "border-[#0BA83E] hover:border-[#0BA83E] focus-within:border-[#0BA83E]":
              success,
            "focus:border-[#2977F4]": isFocused && !error && !success,
            "text-3 !bg-[#F2F2F2] border-[#DBDBDB]": disabled,
          },
          inputClassName
        )}
        size="middle"
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        {...inputProps}
      />

      {helperText && (
        <p
          className={classNames("text-[11px] leading-4 mt-1", {
            "text-[#E10500]": error,
            "text-[#0BA83E]": success,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
