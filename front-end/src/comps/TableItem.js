import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Select, Td, Tr } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableItem = ({ item }) => {
  const [multiplier, setMultiplier] = useState(
    localStorage.getItem(item.fileName) || 1
  );

  async function deleteRequest(id) {
    try {
      const JWT = sessionStorage.getItem("bookKeepingCredential");
      await axios.delete(URL + "receipts/" + id, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });
      alert("Receipt removed successfully!");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert(error.message);
    }
  }

  //   function handleMultiplierChange(id, multiplier) {
  //     setData((prevData) =>
  //       prevData.map((item) => (item.id === id ? { ...item, multiplier } : item))
  //     );
  //   }

  function handleDelete(id) {
    deleteRequest(id);
  }

  const calculatedCalories = item.calories * multiplier || "-";
  const calculatedCarbonhydrate = item.carbonhydrate * multiplier || "-";
  const calculatedFat = item.fat * multiplier || "-";
  const calculatedProtein = item.protein * multiplier || "-";
  const calculatedSodium = item.sodium * multiplier || "-";

  useEffect(() => {
    localStorage.setItem(item.fileName.toString(), multiplier);
  }, [item.fileName, multiplier]);


  return (
    <Tr key={item.id}>
      <Td>{item.fileName.slice(0, -5)}</Td>
      <Td>{item.date.substring(0, 10)}</Td>
      <Td>{item.amount || "-"}</Td>
      <Td>{calculatedCalories}</Td>
      <Td>{calculatedCarbonhydrate}</Td>
      <Td>{calculatedFat}</Td>
      <Td>{calculatedProtein}</Td>
      <Td>{calculatedSodium}</Td>
      <Td>{item.url}</Td>
      <Td>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => handleDelete(item.id)}
        >
          <DeleteIcon />
        </Button>
      </Td>
      <Td>
        <Select
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
        >
          <option value={1}>x1</option>
          <option value={2}>x2</option>
          <option value={3}>x3</option>
        </Select>
      </Td>
    </Tr>
  );
};

export default TableItem;
