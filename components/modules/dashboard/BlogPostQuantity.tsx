import React, { useState, useEffect, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import type { Users } from '@/types/users.types';
import type { Post } from '@/types/post.types';
import type { EChartsOption } from 'echarts';

interface Props {
  listUser: Users[];
  listPost: Post[];
}

interface TopUserType {
  name: string;
  count: number;
}

const BlogPostQuantity = ({ listUser, listPost }: Props) => {
  const [topPost, setTopPost] = useState<TopUserType[]>([]);

  const topName = topPost.map((item) => item.name.split(' ')[0]);
  const topCount = topPost.map((item) => item.count);

  const handleGetTopPost = useCallback(() => {
    const topUser = listUser.map((value, index) => {
      let count: number = 0;

      if (value.id === listPost[index]?.user_id) {
        count++;

        return {
          name: value.name,
          count: count,
        };
      }

      return {
        name: value.name,
        count: 0,
      };
    });

    setTopPost(topUser.slice(0, 10));
  }, [listPost, listUser]);

  const diagramOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: topName,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '40%',
        data: topCount,
        itemStyle: {
          color: '#5CC8BE',
        },
      },
    ],
  };

  useEffect(() => {
    handleGetTopPost();
  }, [handleGetTopPost]);

  return (
    <div className="border border-[#D3D3D3] p-5 rounded-lg shadow-md w-[70%]">
      <p className="text-[#AFAFAF] font-bold">Blog Post Quantity</p>

      <ReactECharts
        option={diagramOption}
        notMerge
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default BlogPostQuantity;
