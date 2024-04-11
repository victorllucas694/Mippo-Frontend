import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FindProductData, TableAllProducts } from './styles';
import FilterProducts from './FilterProducts';
import { useAxios } from '../../../../providers/AxiosProvider';
import { useAuth } from '../../../../contexts/AuthenticateContext';
import { Chip } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TabsOrder() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event)
  };
  let rows 
  // /order-management/get/all/orders/:id
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  React.useEffect(() => {
    getAllOrder()
    rows = allOrders;
  }, [])
  const token = localStorage.getItem("c__token");

  const [allOrders, setAllOrders] = React.useState([]);


  const getAllOrder = async () => {
    const req = await axiosInstance.get(`/order-management/get/all/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    setAllOrders(req.data);


    const currentDateUsFormat: string = getCurrentDate();
    console.log("Data de hoje no modelo americano:", currentDateUsFormat);
  }

  function getCurrentDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    const month = months[monthIndex];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    // Formata a data no modelo "Dec 10, 2020"
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }

  const currentDateCustomFormat = getCurrentDate();

  const currentDateBrFormat = getCurrentDate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  ];
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Todos os pedidos" {...a11yProps(0)} />
          <Tab label="Pedidos aceitos" {...a11yProps(1)} />
          <Tab label="Pedidos recusados" {...a11yProps(2)} />
          <Tab label="Pedidos enviados" {...a11yProps(3)} />
          <Tab label="Pedidos entregues" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FindProductData>
          <TableAllProducts>
            <div className='header-page'>
              <h1>{allOrders.length}  Pedidos</h1>

              <div className='right-table'>
                <Chip label="Todos os pedidos" />
                {currentDateCustomFormat}
              </div>
            </div>

          </TableAllProducts>
        </FindProductData>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FindProductData>
          <FilterProducts />
        </FindProductData>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FindProductData>
          <FilterProducts />
        </FindProductData>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FindProductData>
          <FilterProducts />
        </FindProductData>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <FindProductData>
          <FilterProducts />
        </FindProductData>
      </CustomTabPanel>

    </Box>
  );

}

export default TabsOrder;