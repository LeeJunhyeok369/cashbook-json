import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getJSON } from "../api/api.Json";
import useUserStore from "../zustand/store.User";
import History from "./History";
import MonthSummary from "./MonthSummary";

const HistoryWrap = styled.div`
  width: 94%;
  height: calc(88% - 100px);
  padding: 3%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dddddd;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #dddddd1c;
  }
`;

export default function MonthHistory() {
  const [nowData, setNowData] = useState([]);
  const nowMonth = useSelector((state) => state.nowMonth.nowMonth);
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const {
    data: history = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getJSON,
  });

  useEffect(() => {
    const filteredData = history
      .filter((item) => item.createdBy === user.id)
      .filter((item) => Number(item.date.split("-")[1]) === nowMonth)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setNowData(filteredData);
  }, [history, nowMonth]);

  return (
    <HistoryWrap>
      <MonthSummary nowData={nowData} nowMonth={nowMonth} />
      {nowData.map((e) => (
        <History
          key={e.id}
          id={e.id}
          date={e.date}
          item={e.item}
          amount={e.amount}
          description={e.description}
        />
      ))}
    </HistoryWrap>
  );
}
