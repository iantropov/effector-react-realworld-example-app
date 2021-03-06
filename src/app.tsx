import React from 'react';
import { Router } from 'react-router-dom';
import { routerModel } from './core/router';
import { Root } from './pages/root';

import './core/router/init';

export const App: React.FC = () => (
  <Router history={routerModel.history}>
    <Root />
  </Router>
);
