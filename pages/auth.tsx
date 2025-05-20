import React, { useState } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from '@/hooks';
import { AuthBody } from '@/types/auth/auth.types';

const AuthPage = () => {
  const [isRemembered, setIsRemembered] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as AuthBody;

    signIn(data, isRemembered);
  };

  return (
    <div className="flex flex-row justify-between w-screen h-screen">
      <div className="w-full h-full p-20">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-row gap-5 items-center">
            <Image
              src="/SVG/contactLogo.svg"
              alt="icon"
              width={56}
              height={56}
            />
            <h1 className="text-4xl font-bold">BloX App</h1>
          </div>

          <div>
            <h1 className="text-2xl font-semibold mb-5">Login</h1>

            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item label="Email" required className="font-semibold">
                <Input
                  placeholder="Input your email..."
                  size="large"
                  name="email"
                  type="email"
                  required
                />
              </Form.Item>

              <Form.Item
                label="Access Token"
                required
                className="font-semibold"
              >
                <Input.Password
                  placeholder="Input your Go REST access token...."
                  size="large"
                  name="token"
                  required
                />
              </Form.Item>

              <Checkbox
                onChange={(event) => {
                  setIsRemembered(event.target.checked);
                }}
              >
                Remember Me
              </Checkbox>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                className="mt-5"
              >
                Login
              </Button>
            </Form>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#787878]">
              Copyright © {new Date().getFullYear()}
              <span className="font-bold"> BloX App</span>
            </p>
            <p className="text-xs text-[#787878]">All Rights Reserved</p>
            <p className="text-xs text-[#787878]">App version 1.0.0</p>
          </div>
        </div>
      </div>

      <Image
        src="/PNG/authBackground.png"
        alt="background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '90%', height: 'auto' }}
      />
    </div>
  );
};

export default AuthPage;
