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
        routeLink:'/vgk-axis',
        icon:'view_comfy_alt',
        label:'ВГК Оси',
      },
      {
        routeLink:'/vgk-dimension',
        icon:'view_comfy_alt',
        label:'Габаритные размеры'
      },
      {
        routeLink:'/vgk-photo',
        icon:'view_comfy_alt',
        label:'ВГК фотки'
      },
      {
        routeLink:'/vgk-dimension',
        icon:'view_comfy_alt',
        label:'Параметры АТС'
      },
      {
        routeLink:'/vgk-vehicle-tstk',
        icon:'view_comfy_alt',
        label:'АТС ТСТК'
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
