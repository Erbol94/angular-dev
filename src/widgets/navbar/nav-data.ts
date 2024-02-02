import {INavbarData} from "./helper";

export const navbarData:INavbarData[] = [
  {
    routeLink:'/idk',
    icon:'home',
    label:'Домой',
    isExpanded: false
  },
  {
    routeLink:'/vgk',
    icon:'sunny',
    label:'Весы',
    isExpanded: false,
    items: [
      {
        routeLink:'/idk',
        icon:'shopping_cart_checkout',
        label:'Регистрация ТС ',

      },
      {
        routeLink:'/',
        icon:'place_item',
        label:'Фотофиксация'
      },

    ],

  },

  {
    routeLink:'/',
    icon:'notifications_active',
    label:'Регистрация ТС'
  },
  {
    routeLink:'/',
    icon:'error',
    label:'Таблицы'
  },
  {
    routeLink:'/',
    icon:'account_circle',
    label:'Настройка',

  },
];
