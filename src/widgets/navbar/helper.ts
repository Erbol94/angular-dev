export interface INavbarData {
  routeLink: string;
  icon?: string;
  label: string;
  isExpanded?:boolean;
  expanded?:boolean;
  items?:INavbarData[];
}
