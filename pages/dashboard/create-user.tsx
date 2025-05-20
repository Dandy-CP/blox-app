import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { CreateNewUser } from '@/service/API/users/users.mutation';
import type { CreateUserBody, CreateUserPayload } from '@/types/users.types';

const CreateUser = () => {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [isErrorForm, setIsErrorForm] = useState(false);

  const { mutateAsync, isPending } = CreateNewUser({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsErrorForm(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as CreateUserPayload;

    const payload: CreateUserBody = {
      ...data,
      gender: gender,
      status: status,
    };

    if (gender === '' || status === '') {
      setIsErrorForm(true);
      return;
    }

    mutateAsync(payload);
  };

  const handleChangeGender = (value: string) => {
    setGender(value);
  };

  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div className="flex flex-row gap-1 text-[#59A1A5] mt-1">
        <LayoutOutlined />
        <p className="text-sm">Dashboard /</p>
        <p className="text-black text-sm font-semibold">Create User</p>
      </div>

      <div className="mt-5">
        <h1 className="text-xl">Create User</h1>

        <hr className="my-4" />

        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label="Full Name" required className="font-semibold">
            <Input
              placeholder="Please fill user full name...."
              size="large"
              name="name"
              required
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            required
            className="font-semibold"
            validateStatus={isErrorForm ? 'error' : ''}
            help={isErrorForm ? 'Please Select Gender' : ''}
          >
            <Select
              defaultValue=""
              size="large"
              onChange={handleChangeGender}
              options={[
                { value: '', label: 'Select Gender', disabled: true },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Email" required className="font-semibold">
            <Input
              placeholder="Please fill the email..."
              size="large"
              name="email"
              type="email"
              required
            />
          </Form.Item>

          <Form.Item
            label="Status"
            required
            className="font-semibold"
            validateStatus={isErrorForm ? 'error' : ''}
            help={isErrorForm ? 'Please Select Status' : ''}
          >
            <Select
              defaultValue=""
              size="large"
              onChange={handleChangeStatus}
              options={[
                { value: '', label: 'Select Status', disabled: true },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'inactive' },
              ]}
            />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={isPending}
            loading={isPending}
            block
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

export default CreateUser;
