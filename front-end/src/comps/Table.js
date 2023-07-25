import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config/URLConfig";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Table as UITable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
} from "@chakra-ui/react";

export default function Table({ setImg, receipts }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDocs();
  }, [receipts]);

  async function getDocs() {
    const extractedData = receipts.map((receipt) => ({
      amount: receipt.analyzedResults.AMOUNT,
      calories: receipt.analyzedResults.CALORIES,
      carbonhydrate: receipt.analyzedResults.CARBOHYDRATE,
      fat: receipt.analyzedResults.FAT,
      protein: receipt.analyzedResults.PROTEIN,
      sodium: receipt.analyzedResults.SODIUM,
      date: receipt.dateAdded,
      fileName: receipt.fileName,
      url: (
        <img
          src={receipt.imageURL}
          alt="receipt photo"
          onClick={() => setImg(receipt.imageURL)}
          width="200"
          height="200"
        />
      ),
      id: receipt._id,
      multiplier: 1, // Default multiplier is set to 1
    }));
    setData(extractedData);
  }

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

  function handleMultiplierChange(id, multiplier) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, multiplier } : item
      )
    );
  }

  function handleDelete(id) {
    deleteRequest(id);
  }

  const dataTable =
    data == null ? (
      <></>
    ) : (
      data.map((item) => (
        <Tr key={item.id}>
          <Td>{item.fileName.slice(0, -5)}</Td>
          <Td>{item.date.substring(0, 10)}</Td>
          <Td>{item.amount || "-"}</Td>
          <Td>{item.calories * item.multiplier || "-"}</Td>
          <Td>{item.carbonhydrate * item.multiplier || "-"}</Td>
          <Td>{item.fat * item.multiplier || "-"}</Td>
          <Td>{item.protein * item.multiplier || "-"}</Td>
          <Td>{item.sodium * item.multiplier || "-"}</Td>
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
              value={item.multiplier}
              onChange={(e) =>
                handleMultiplierChange(item.id, parseInt(e.target.value))
              }
            >
              <option value={1}>x1</option>
              <option value={2}>x2</option>
              <option value={3}>x3</option>
            </Select>
          </Td>
        </Tr>
      ))
    );

  return (
    data && (
      <TableContainer>
        <UITable variant="striped" size="lg">
          <Thead>
            <Tr>
              <Th>Food</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Calories</Th>
              <Th>Carbonhydrate</Th>
              <Th>Fat</Th>
              <Th>Protein</Th>
              <Th>Sodium</Th>
              <Th>Image</Th>
              <Th>Delete</Th>
              <Th>Multiplier</Th> 
            </Tr>
          </Thead>
          <Tbody>{dataTable}</Tbody>
        </UITable>
      </TableContainer>
    )
  );
}
