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
import TableItem from "./TableItem";

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
      multiplier: localStorage.getItem(receipt.fileName.toString()) || 1, // Default multiplier is set to 1
    }));
    setData(extractedData);
  }

  const dataTable =
    data == null ? (
      <></>
    ) : (
      data.map((item) => <TableItem item={item} key={item.id} />)
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
