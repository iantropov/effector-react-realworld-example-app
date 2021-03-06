import React from 'react';
import * as css from './index.css';

type Props = {
  children: React.ReactNode;
};

export const Nav: React.FC = ({ children }) => (
  <nav className={css.nav}>{children}</nav>
);
