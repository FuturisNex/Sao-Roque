import React from 'react';
import { FaChartBar, FaTags, FaFileContract } from 'react-icons/fa';
import { AiOutlineCalendar, AiFillPlayCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdPerson, IoMdContacts } from 'react-icons/io';

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
    title: 'Comprador',
    links: [
      {
        name: 'Comprador',
        url: 'comprador',
        icon: <IoMdPerson />,
      },
    ],
  },
  {
    title: 'Rebaixa',
    links: [
      {
        name: 'Rebaixa',
        url: 'rebaixa',
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: 'Encarte',
    links: [
      {
        name: 'Encarte',
        url: 'encarte',
        icon: <FaTags />,
      },
      {
        name: 'Itens por comprador',
        url: '/1drv.ms/x/s!Aunh5h-BPQ1LgSJA6pptURJMugvB?e=gSzrfP',
        target: '_blank',
        icon: <IoMdContacts />,
      },
    ],
  },

  {
    title: 'Análise',
    links: [
      {
        name: 'Análises',
        url: 'analise',
        icon: <FaChartBar />,
      },
    ],
  },

  {
    title: 'Calêndario',
    links: [
      {
        name: 'Agenda',
        url: 'agenda',
        icon: <AiOutlineCalendar />,
      },
    ],
  },
  {
    title: 'Contratos',
    links: [
      {
        name: 'Contratos',
        url: 'contratos',
        icon: <FaFileContract />,
      },
    ],
  },
  {
    title: 'Cursos',
    links: [
      {
        name: 'Curso Whintor',
        url: 'winthor',
        icon: <AiFillPlayCircle />,
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
