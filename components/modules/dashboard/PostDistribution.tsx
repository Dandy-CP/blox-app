import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { Users } from '@/types/users.types';
import type { EChartsOption } from 'echarts';

interface Props {
  listUser: Users[];
}

const PostDistribution = ({ listUser }: Props) => {
  const totalUserMale = listUser.filter(
    (user) => user.gender === 'male'
  ).length;
  const totalUserFemale = listUser.filter(
    (user) => user.gender === 'female'
  ).length;

  const pieOption: EChartsOption = {
    tooltip: {
      trigger: 'none',
    },
    legend: {
      top: '5%',
      left: '0',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: totalUserMale,
            name: 'Male',
            itemStyle: { color: '#7851A9' },
          },
          {
            value: totalUserFemale,
            name: 'Female',
            itemStyle: { color: '#4682B4' },
          },
        ],
      },
    ],
  };

  return (
    <div className="border border-[#D3D3D3] rounded-lg shadow-md w-[343px] h-[320px] p-5">
      <p className="text-[#AFAFAF] font-bold">Post Distribution by Gender</p>

      <ReactECharts option={pieOption} notMerge className="w-[80%] mx-auto" />
    </div>
  );
};

export default PostDistribution;
