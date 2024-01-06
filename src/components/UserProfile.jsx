import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Button from './Button';

import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/img/avatar.png';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg ${windowWidth < 640 ? 'w-full' : 'w-96'}`}>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Perfil de Usuário</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">Usuário</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">Usuário Padrão</p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className={`flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer ${
              windowWidth < 640 ? 'flex-col items-center' : ''
            }`}
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className={`text-xl rounded-lg p-3 hover:bg-light-gray ${
                windowWidth < 640 ? 'mb-4' : ''
              }`}
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Sair"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
