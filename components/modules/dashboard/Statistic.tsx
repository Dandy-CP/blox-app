import React from 'react';
import { Card } from 'antd';
import type { Users } from '@/types/users.types';

interface Props {
  listUser: Users[];
  totalUser?: number;
  totalPost?: number;
}

const Statistic = ({ listUser, totalUser, totalPost }: Props) => {
  const totalUserActive = listUser.filter(
    (user) => user.status === 'active'
  ).length;
  const totalUserInactive = listUser.filter(
    (user) => user.status === 'inactive'
  ).length;
  const totalUserMale = listUser.filter(
    (user) => user.gender === 'male'
  ).length;
  const totalUserFemale = listUser.filter(
    (user) => user.gender === 'female'
  ).length;

  const StatisticData = [
    {
      title: 'Total User',
      totalValue: totalUser,
    },
    {
      title: 'Total Post',
      totalValue: totalPost,
    },
    {
      title: 'User Status (active/non)',
      totalValue: `${totalUserActive} / ${totalUserInactive}`,
    },
    {
      title: 'User Gender (m/f)',
      totalValue: `${totalUserMale} / ${totalUserFemale}`,
    },
  ];

  return (
    <div>
      <p className="font-semibold">Statistic</p>

      <div className="flex flex-row justify-between mt-5">
        {StatisticData.map((value, index) => (
          <Card key={index} className="w-[23%] shadow-md">
            <p className="text-[#AFAFAF] font-bold">{value.title}</p>
            <p className="text-3xl font-bold">{value.totalValue}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Statistic;
