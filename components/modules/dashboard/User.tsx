import React from 'react';
import { Select, Input, Table, Popover, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { DeleteUser } from '@/service/API/users/users.mutation';
import type { TableColumnsType, TableProps } from 'antd';
import type { Users } from '@/types/users.types';
import type { Pagination, FilterState } from '@/types/meta.types';

interface Props {
  listUser: Users[];
  userPagination?: Pagination;
  filterState: FilterState;
  isUserFetching: boolean;
  updateEvent: React.ActionDispatch<[newState: Partial<FilterState>]>;
  refetch: () => void;
}

interface DataTableType {
  key: React.Key;
  id: string;
  name: string;
  gender: string;
  status: string;
}

const User = ({
  listUser,
  isUserFetching,
  userPagination,
  filterState,
  updateEvent,
  refetch,
}: Props) => {
  const { mutateAsync, isPending } = DeleteUser({
    options: {
      onSuccess() {
        toast.success('Delete User Success');
        refetch();
      },
      onError() {
        toast.error('Delete User Failed');
      },
    },
  });

  const dataSource =
    listUser?.map((value) => {
      return {
        key: value.id,
        id: `#${value.id}`,
        name: value.name,
        email: value.email,
        gender: value.gender,
        status: value.status,
      };
    }) ?? [];

  const columns: TableColumnsType<DataTableType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.gender.includes(value as string),
      sorter: (a, b) => a.gender.length - b.gender.length,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.status.includes(value as string),
      sorter: (a, b) => a.status.length - b.status.length,
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popover
          content={
            <div>
              <Button
                danger
                disabled={isPending}
                loading={isPending}
                onClick={() => {
                  mutateAsync({ id: record.key as string });
                }}
              >
                Delete User
              </Button>
            </div>
          }
        >
          <Button>...</Button>
        </Popover>
      ),
    },
  ];

  const onChange: TableProps<DataTableType>['onChange'] = (pagination) => {
    updateEvent({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    });
  };

  const handleChangeGender = (value: string) => {
    updateEvent({ gender: value });
  };

  const handleChangeStatus = (value: string) => {
    updateEvent({ status: value });
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <p className="font-semibold">Filter</p>

          <Select
            value={filterState.gender}
            defaultValue=""
            style={{ width: 120 }}
            onChange={handleChangeGender}
            options={[
              { value: '', label: 'All Gender' },
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />

          <Select
            value={filterState.status}
            defaultValue=""
            style={{ width: 120 }}
            onChange={handleChangeStatus}
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>

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
        loading={isUserFetching}
        pagination={{
          pageSize: filterState.pageSize,
          current: filterState.page,
          total: userPagination?.pagination.total,
        }}
      />
    </div>
  );
};

export default User;
