import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { Users } from '@/types/users.types';

interface Props {
  listUser: Users[];
}

const UserStatus = ({ listUser }: Props) => {
  const totalUserActive = listUser.filter(
    (user) => user.status === 'active'
  ).length;
  const totalUserInactive = listUser.filter(
    (user) => user.status === 'inactive'
  ).length;

  const gaugeData = [
    {
      value: totalUserActive,
      detail: {
        show: false,
      },
    },
    {
      value: totalUserInactive,
      detail: {
        show: false,
      },
    },
  ];

  const gaugeOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          clip: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
      },
    ],
  };

  return (
    <div className="border border-[#D3D3D3] rounded-lg shadow-md w-[343px] h-[220px] p-5">
      <p className="text-[#AFAFAF] font-bold">User Status</p>

      <ReactECharts option={gaugeOption} notMerge style={{ height: '100%' }} />
    </div>
  );
};

export default UserStatus;
