import React from 'react';
import { Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import type { Post as PostType } from '@/types/post.types';
import type { Pagination, FilterState } from '@/types/meta.types';

interface Props {
  listPost: PostType[];
  postPagination?: Pagination;
  filterState: FilterState;
  isPostFetching: boolean;
  updateEvent: React.ActionDispatch<[newState: Partial<FilterState>]>;
}

interface DataTableType {
  key: React.Key;
  id: string;
  title: string;
  body: string;
}

const Post = ({
  listPost,
  isPostFetching,
  postPagination,
  filterState,
  updateEvent,
}: Props) => {
  const dataSource =
    listPost?.map((value) => {
      return {
        key: value.id,
        id: String(value.user_id),
        title: value.title,
        body: value.body,
      };
    }) ?? [];

  const columns: TableColumnsType<DataTableType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.title.includes(value as string),
      sorter: (a, b) => a.title.length - b.title.length,
      ellipsis: true,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      defaultSortOrder: 'descend',
    },
  ];

  const onChange: TableProps<DataTableType>['onChange'] = (pagination) => {
    updateEvent({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-end">
        <div className="w-[20%]">
          <Input
            value={filterState.search}
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(event) => {
              updateEvent({ search: event.target.value });
            }}
          />
        </div>
      </div>

      <hr className="text-[#D6E8FF] my-5" />

      <Table<DataTableType>
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        loading={isPostFetching}
        pagination={{
          pageSize: filterState.pageSize,
          current: filterState.page,
          total: postPagination?.pagination.total,
        }}
      />
    </div>
  );
};

export default Post;
