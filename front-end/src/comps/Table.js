import React from "react";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";

export default function Table({ setImg, receipts }) {
  const [data, setData] = useState(null);

  async function getDocs() {
    const extractedData = receipts.map((receipt) => ({
      amount: receipt.analyzedResults.AMOUNT,
      calories: receipt.analyzedResults.CALORIES,
      carbonhydrate: receipt.analyzedResults.CARBOHYDRATE,
      fat: receipt.analyzedResults.FAT,
      protein: receipt.analyzedResults.PROTEIN,
      sodium: receipt.analyzedResults.SODIUM,
      date: receipt.dateAdded,
      url: (
        <img
          src={receipt.imageURL}
          alt="receipt photo"
          onClick={() => setImg(receipt.imageURL)}
          width="200"
          height="200"
        />
      ),
      id: receipt._id
    }));
    setData(extractedData);
    // window.location.reload();
  }

  async function deletRequest(id) {
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

  //Calls function only once (when it is onMount)
  function handleClick(id) {
    deletRequest(id);
  }

  useEffect(() => {
    getDocs();
  }, [receipts]);

  const dataTable =
    data == null ? (
      <></>
    ) : (
      data.map((item) => (
        <Tr key={item.id}>
          <Td>{item.date}</Td>
          <Td>{item.amount}</Td>
          <Td>{item.calories}</Td>
          <Td>{item.carbonhydrate}</Td>
          <Td>{item.fat}</Td>
          <Td>{item.protein}</Td>
          <Td>{item.sodium}</Td>
          <Td>{item.url}</Td>
          <Td>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => handleClick(item.id)}
            >
              <DeleteIcon />
            </Button>
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
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Calories</Th>
              <Th>Carbonhydrate</Th>
              <Th>Fat</Th>
              <Th>Protein</Th>
              <Th>Sodium</Th>
              <Th>Image</Th>
              <Th/>
            </Tr>
          </Thead>
          <Tbody>{dataTable}</Tbody>
        </UITable>
      </TableContainer>
    )
  );
}
