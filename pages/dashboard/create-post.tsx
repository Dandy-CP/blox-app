import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDebounce } from '@/hooks';
import { GetListUsers } from '@/service/API/users/users.query';
import { CreateNewPost } from '@/service/API/post/post.mutation';
import type { CreatePostPayload } from '@/types/post.types';

const CreatePost = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userName, setUserName] = useState('');
  const [isErrorForm, setIsErrorForm] = useState(false);

  const queryValue = useDebounce(userName, 1000);

  const { data: dataUsers } = GetListUsers({
    options: {
      queryKey: [queryValue],
    },
    params: {
      per_page: 100,
      search: queryValue,
    },
  });

  const { mutateAsync, isPending } = CreateNewPost({
    options: {
      onSuccess() {
        toast.success('Create User Success');
        window.location.replace('/');
      },
      onError() {
        toast.error('Create User Failed');
      },
    },
  });

  const listUser = dataUsers?.data ?? [];
  const listOptionUser = listUser.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsErrorForm(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as CreatePostPayload;

    const payload: CreatePostPayload = {
      ...data,
      user_id: selectedUser,
    };

    if (selectedUser === '') {
      setIsErrorForm(true);
      return;
    }

    mutateAsync(payload);
  };

  const handleChangeUser = (value: string) => {
    setSelectedUser(value);
  };

  const onSearch = (value: string) => {
    setUserName(value);
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div className="flex flex-row gap-1 text-[#59A1A5] mt-1">
        <LayoutOutlined />
        <p className="text-sm">Dashboard /</p>
        <p className="text-black text-sm font-semibold">Create Post</p>
      </div>

      <div className="mt-5">
        <h1 className="text-xl">Create Post</h1>

        <hr className="my-4" />

        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item
            label="User"
            required
            className="font-semibold"
            validateStatus={isErrorForm ? 'error' : ''}
            help={isErrorForm ? 'Please Select User' : ''}
          >
            <Select
              showSearch
              defaultValue=""
              size="large"
              onChange={handleChangeUser}
              onSearch={onSearch}
              optionFilterProp="label"
              options={[
                { value: '', label: 'Select User', disabled: true },
                ...listOptionUser,
              ]}
            />
          </Form.Item>

          <Form.Item label="Title" required className="font-semibold">
            <Input
              placeholder="Please fill post title..."
              size="large"
              name="title"
              required
            />
          </Form.Item>

          <Form.Item label="Description" required className="font-semibold">
            <Input.TextArea
              placeholder="Please fill post description..."
              size="large"
              name="body"
              rows={4}
              required
            />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            disabled={isPending}
            loading={isPending}
            style={{
              backgroundColor: '#59A1A5',
            }}
            className="mt-5"
          >
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
