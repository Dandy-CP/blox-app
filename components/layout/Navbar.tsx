import React from 'react';
import Image from 'next/image';
import { Avatar, Button, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks';

const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-row justify-between items-center w-full h-[68px] p-3 border border-b border-[#D3D3D3]">
      <Image src="/SVG/logo.svg" alt="logo" width={140} height={200} />

      <Popover
        placement="bottom"
        content={
          <div className="w-[150px]">
            <Button
              danger
              block
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          </div>
        }
      >
        <div className="flex flex-row items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />

          <div>
            <p className="font-semibold text-sm">User</p>
            <p className="text-[#7C7C7C] font-bold text-sm">Admin</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;
