import React from 'react';
import {AppRouter} from './files/AppRouter.js';
import {AuthcontextProvider} from './Contexts/AuthContext';

function App(props) {
  return (
      <AuthcontextProvider>
        <AppRouter />
      </AuthcontextProvider>
  );
}
export default App;
