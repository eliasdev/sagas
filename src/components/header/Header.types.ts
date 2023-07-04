/* eslint-disable @typescript-eslint/no-unused-vars */
export interface HeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export interface Link {
  id?: string,
  href: string,
  icon?: React.ReactNode,
  authenticationNeeded: boolean,
}