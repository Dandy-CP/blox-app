import React, { useReducer } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';
import {
  Statistic,
  BlogPostQuantity,
  UserStatus,
  PostDistribution,
  User,
  Post,
} from '@/components/modules/dashboard';
import { GetListUsers } from '@/service/API/users/users.query';
import { GetListPost } from '@/service/API/post/post.query';
import { useDebounce } from '@/hooks';
import type { FilterState } from '@/types/meta.types';

const HomeDashboard = () => {
  const [event, updateEvent] = useReducer(
    (state: FilterState, newState: Partial<FilterState>) => {
      return { ...state, ...newState };
    },
    {
      page: 1,
      pageSize: 10,
      search: '',
      gender: '',
      status: '',
    }
  );

  const queryValue = useDebounce(event.search, 1000);

  const {
    data: dataUsers,
    isFetching: isUserFetching,
    refetch,
  } = GetListUsers({
    options: {
      queryKey: [
        event.page,
        event.pageSize,
        event.gender,
        event.status,
        queryValue,
      ],
    },
    params: {
      page: event.page,
      per_page: event.pageSize,
      gender: event.gender,
      status: event.status,
      search: queryValue,
    },
  });

  const { data: dataPost, isFetching: isPostFetching } = GetListPost({
    options: {
      queryKey: [event.page, event.pageSize, queryValue],
    },
    params: {
      page: event.page,
      per_page: event.pageSize,
      title: queryValue,
    },
  });

  const metaUserPagination = dataUsers?.meta;
  const metaPostPagination = dataUsers?.meta;
  const listUsers = dataUsers?.data ?? [];
  const listPost = dataPost?.data ?? [];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'User',
      children: (
        <User
          listUser={listUsers}
          userPagination={metaUserPagination}
          isUserFetching={isUserFetching}
          filterState={event}
          updateEvent={updateEvent}
          refetch={() => {
            refetch();
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'Post',
      children: (
        <Post
          listPost={listPost}
          postPagination={metaPostPagination}
          isPostFetching={isPostFetching}
          filterState={event}
          updateEvent={updateEvent}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div className="flex flex-row gap-1 text-[#59A1A5] mt-1">
        <LayoutOutlined />
        <p className="text-sm">Dashboard</p>
      </div>

      <div className="mt-5">
        <Statistic
          listUser={listUsers}
          totalUser={metaUserPagination?.pagination.total}
          totalPost={metaPostPagination?.pagination.total}
        />

        <div className="flex flex-row justify-between gap-5 mt-8 h-[552px]">
          <BlogPostQuantity listPost={listPost} listUser={listUsers} />

          <div className="h-full flex flex-col gap-3">
            <UserStatus listUser={listUsers} />
            <PostDistribution listUser={listUsers} />
          </div>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        size="large"
        onChange={() => {
          updateEvent({
            page: 1,
            pageSize: 10,
            search: '',
            gender: '',
            status: '',
          });
        }}
      />
    </div>
  );
};

export default HomeDashboard;
