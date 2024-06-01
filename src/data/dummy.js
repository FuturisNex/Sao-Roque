import React from 'react';
import { FaChartBar, FaTags, FaFileContract } from 'react-icons/fa';
import { AiOutlineCalendar, AiFillHome, AiOutlineShoppingCart, AiFillPlayCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdPerson } from 'react-icons/io';

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const links = [
  {
    links: [
      {
        name: 'Inicio',
        url: 'comercial/home',
        icon: <AiFillHome />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Comprador',
        url: 'comercial/comprador',
        icon: <IoMdPerson />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Encarte',
        url: 'comercial/encarte',
        icon: <FaTags />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Rebaixa',
        url: 'comercial/rebaixa',
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Avarias',
        url: 'comercial/avarias',
        icon: <AiOutlineShoppingCart />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Agenda',
        url: 'comercial/agenda',
        icon: <AiOutlineCalendar />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Análises',
        url: 'comercial/analise',
        icon: <FaChartBar />,
      },
    ],
  },
  {
    links: [
      {
        name: 'Documentos',
        url: 'comercial/documentos',
        icon: <FaFileContract />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];
