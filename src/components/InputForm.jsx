import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { setLocalStorege } from "../Hooks/LocalStorage";
import { setData as setDataAction } from "../redux/slice/historySlice";
import Input from "./Input";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10%;

  > button#save {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: ${({ isFormValid }) =>
      isFormValid ? "#5383e8" : "#ccc"};
    color: #fff;
    border: 0;
    border-radius: 1rem;
    margin-top: 1rem;
    font-size: 1.05rem;
    cursor: ${({ isFormValid }) => (isFormValid ? "pointer" : "not-allowed")};
  }
`;

export default function InputForm() {
  const data = useSelector((state) => state.history.data);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: uuidv4(),
    date: "",
    item: "",
    amount: 0,
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setDataAction([...data, formData]));
    setLocalStorege("data", [...data, formData]);
    setFormData({
      id: uuidv4(),
      date: "",
      item: "",
      amount: 0,
      description: "",
    });
  };

  const validateForm = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const isDateValid = datePattern.test(formData.date);
    const isItemValid = formData.item.length > 0 && formData.item.length <= 50;
    const isDescriptionValid =
      formData.description.length > 0 && formData.description.length <= 100;
    return isDateValid && isItemValid && isDescriptionValid;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  return (
    <Form onSubmit={handleSubmit} isFormValid={isFormValid}>
      <Input
        label="날짜"
        value={formData.date}
        onChange={handleChange}
        placeholder="YYYY-MM-DD"
        name="date"
      />
      <Input
        label="항목"
        value={formData.item}
        onChange={handleChange}
        placeholder="지출 항목"
        name="item"
        maxLength={50}
      />
      <Input
        label="금액"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="지출 금액"
        name="amount"
      />
      <Input
        label="내용"
        value={formData.description}
        onChange={handleChange}
        placeholder="지출 내용"
        name="description"
        maxLength={100}
      />
      <button id="save" type="submit" disabled={!isFormValid}>
        저장
      </button>
    </Form>
  );
}
