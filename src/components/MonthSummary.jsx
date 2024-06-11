import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PercentageBar from "./PercentageBar";
import PercentageName from "./PercentageName";

const Summary = styled.div`
  width: 90%;
  min-height: 100px;
  background-color: #ffffff;
  height: auto;
  border-radius: 25px;
  padding: 1rem 5%;

  > h3 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;

const Bar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(233, 236, 239);
  overflow: hidden;
  height: 3rem;
  border-radius: 10px;
`;

const HistortyList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  > div {
  }
`;

export default function MonthSummary({ nowData, nowMonth }) {
  const [percentageData, setPercentageData] = useState([]);

  const percentageColor = [
    "rgb(0, 123, 255)",
    "rgb(40, 167, 69)",
    "rgb(220, 53, 69)",
    "rgb(255, 193, 7)",
    "rgb(23, 162, 184)",
  ];

  const sumAmount = nowData.reduce((acc, cur) => acc + cur.amount, 0);

  useEffect(() => {
    const newPercentageData = [];
    const newPercentageColorData = [];

    nowData.map((history) => {
      const existingCategory = newPercentageData.find(
        (item) => item.category === history.item
      );
      if (existingCategory) {
        existingCategory.sum += history.amount;
        existingCategory.percentage = (existingCategory.sum / sumAmount) * 100;
      } else {
        newPercentageData.push({
          category: history.item,
          sum: history.amount,
          color: "",
          percentage: (history.amount / sumAmount) * 100,
        });
      }
    });
    newPercentageData.sort((a, b) => b.sum - a.sum);

    newPercentageData.forEach((item, i) => {
      if (i < 4) {
        item.color = percentageColor[i];
        newPercentageColorData.push(item);
      } else {
        if (i === 4) {
          item.color = percentageColor[4];
          item.category = "기타";
          newPercentageColorData.push(item);
        } else {
          newPercentageColorData[4].sum += item.sum;
          newPercentageColorData[4].percentage += item.percentage;
        }
      }
    });

    setPercentageData(newPercentageColorData);
  }, [nowData]);

  return (
    <Summary>
      <h3>
        {nowMonth}월 총 지출: {sumAmount}원
      </h3>
      <Bar>
        {percentageData.map((item, i) => (
          <PercentageBar key={i} width={item.percentage} color={item.color} />
        ))}
      </Bar>
      <HistortyList>
        {percentageData.map((item, i) => (
          <PercentageName
            key={i}
            category={item.category}
            percentage={item.percentage}
            sum={item.sum}
            color={item.color}
          />
        ))}
      </HistortyList>
    </Summary>
  );
}
