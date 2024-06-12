import { MemberContainer } from "./styles";
import { useState } from "react";
import axiosInstance from "../../../../../providers/AxiosInstance";
import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface IMembersAdministration {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  initDate: string;
  changeDate: string;
}

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

// const options = {
//   plugins: {
//     legend: {
//       labels: {
//         font: {
//           size: "1rem",
//         },
//       },
//     },
//   },
//   scales: {
//     x: {
//       ticks: {
//         font: {
//           size: "1rem",
//         },
//       },
//     },
//     y: {
//       ticks: {
//         font: {
//           size: "1rem",
//         },
//       },
//     },
//   },
// };

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 1,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}

function Members() {
  const [admin, setAdmin] = useState<IMembersAdministration[]>([]);

  async function getAllUserOnDataBase() {
    console.log(admin)
    const c_tokenData = localStorage.getItem("c__token");
    if (c_tokenData) {
      const req = await axiosInstance.get("/register-user/find-user", {
        headers: {
          Authorization: `Bearer ${c_tokenData}`,
        },
      });

      setAdmin(req.data);
    }
  }
  // const [containerWidth, setContainerWidth] = useState(window.innerWidth * 0.8); // Defina a largura inicial do contêiner

  const chartRef = useRef<ChartJS>(null);
  useEffect(() => {
    const chart = chartRef.current;
    triggerTooltip(chart);
    getAllUserOnDataBase();
  }, []);

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Lucro 2022',
        backgroundColor: 'rgb(63, 102, 128)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [12, 12, 12, 12, 12, 12, 87, 87, 87, 87, 12, 1, 1, 1, 75, 1, 1 ],
        barThickness: 15, 
      },
        {
          label: 'Lucro 2023',
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.4)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: [12, 12, 12, 12, 12, 12, 12, 12, 60, 60, 60, 60, 12, 12, 72, 12, 99 ],
          barThickness: 15, 
        },
    ],
  };

  // const options = {
  //   maintainAspectRatio: false, // Permitir ajuste da altura
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <MemberContainer>
      <Bar data={data} height={70} />
    </MemberContainer>
  );
}

export default Members;
