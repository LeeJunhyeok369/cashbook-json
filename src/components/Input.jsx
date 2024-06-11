import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;
const StyledInput = styled.input`
  width: calc(100% - 20px);
  border: 0;
  background-color: #fff !important;
  height: 45px;
  padding: 0 10px;
  border-radius: 0.4rem;
  outline: none;
`;
const Label = styled.label`
  line-height: 2rem;
  margin-left: 10px;
  font-size: 0.8rem;
  color: #333;
`;

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  forwardedRef,
}) {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        ref={forwardedRef || undefined}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </InputWrapper>
  );
}
