import { useEffect, useState } from "react";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../contexts/AuthenticateContext";
import { HeaderProducts } from "./styles";
import { Button, TextField } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RowsDataSide from "../../../../Global/RowsDataSide";


function FilterProducts() {
  const [shippingCartTotal, setShippingCartTotal] = useState<string>("");
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  let priceTotal = 0;
  const parseBRL = (valor: number): string => {
    const formatoDinheiro = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formatoDinheiro.format(valor);
  };
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [orderTracking, setOrderTracking] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem("c__token");
    const findAllOrders = async () => {
      try {
        const foundedAllOrders = await axiosInstance.get(
          `/order-management/get/all/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(foundedAllOrders);
        setOrderTracking(foundedAllOrders.data);
        setTotalOrders(foundedAllOrders.data.length);

        if (foundedAllOrders.data.admin === "true") {
          foundedAllOrders.data.map((orders: any) => {
            console.log(orders);
            if (orders.product.Valor_a_prazo) {
              console.log(orders.product.Valor_a_prazo);
              priceTotal += parseFloat(orders.product.Valor_a_prazo);
            }
          });

          const formattedTotal = parseBRL(priceTotal);
          setShippingCartTotal(formattedTotal);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      console.log(priceTotal);
    };

    findAllOrders();
  }, [axiosInstance, shippingCartTotal, id]);

  return (
    <HeaderProducts>
      <RowsDataSide orderTracking={orderTracking} />
    </HeaderProducts>
  );
}

export default FilterProducts;
