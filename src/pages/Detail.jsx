import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { deleteJSON, getJSON, updateJSON } from "../api/api.Json";
import Input from "../components/Input";

const DetailContainer = styled.div`
  width: 500px;
  padding: 10px;
  background-color: #f5f5f5;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  color: #fff;
`;

const ButtonLink = styled(Link)`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  text-decoration: none;
  background-color: #ccc;
  color: #fff;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  > p {
    margin-bottom: 20px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: history = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getJSON,
  });

  const idData = history.find((item) => item.id === id);

  const [formData, setFormData] = useState(
    idData || {
      id: "",
      date: "",
      item: "",
      amount: 0,
      description: "",
    }
  );
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dateRef = useRef();
  const itemRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (idData) setFormData(idData);
  }, [idData]);

  const validateFormData = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const isDateValid = datePattern.test(formData.date);
    const isItemValid = formData.item.length > 0 && formData.item.length <= 50;
    const isDescriptionValid =
      formData.description.length > 0 && formData.description.length <= 100;
    return isDateValid && isItemValid && isDescriptionValid;
  };

  const updateMutation = useMutation({
    mutationFn: updateJSON,
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
      Swal.fire({
        icon: "success",
        title: "저장 완료",
      });
      navigate("/");
    },
    onError: () => {
      setModalMessage("업데이트 중 오류가 발생했습니다.");
      setShowModal(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJSON,
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
      Swal.fire({
        icon: "success",
        title: "삭제 완료",
      });
      navigate("/");
    },
    onError: () => {
      setModalMessage("삭제 중 오류가 발생했습니다.");
      setShowModal(true);
    },
  });

  const handleSave = () => {
    if (validateFormData()) {
      updateMutation.mutate({ id: formData.id, updatedData: formData });
    } else {
      setModalMessage("입력된 정보가 올바르지 않습니다.");
      setShowModal(true);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(formData.id);
  };

  return (
    <DetailContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          forwardedRef={dateRef}
          label="날짜"
          type="text"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <Input
          forwardedRef={itemRef}
          label="항목"
          type="text"
          value={formData.item}
          onChange={(e) => setFormData({ ...formData, item: e.target.value })}
        />
        <Input
          forwardedRef={amountRef}
          label="금액"
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
          }
        />
        <Input
          forwardedRef={descriptionRef}
          label="내용"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <ButtonGroup>
          <Button onClick={handleSave} bgColor="#4CAF50">
            저장
          </Button>
          <Button onClick={() => setShowDeleteModal(true)} bgColor="#cc2323">
            삭제
          </Button>
          <ButtonLink to="/">취소</ButtonLink>
        </ButtonGroup>
      </form>
      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <ModalContainer>
            <p>{modalMessage}</p>
            <Button bgColor="#ccc" onClick={() => setShowModal(false)}>
              확인
            </Button>
          </ModalContainer>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClick={() => setShowDeleteModal(false)} />
          <ModalContainer>
            <p>정말로 삭제하시겠습니까?</p>
            <Button
              onClick={() => {
                handleDelete();
                setShowDeleteModal(false);
              }}
              bgColor="#cc2323"
            >
              삭제
            </Button>
            <Button bgColor="#ccc" onClick={() => setShowDeleteModal(false)}>
              취소
            </Button>
          </ModalContainer>
        </>
      )}
    </DetailContainer>
  );
}
