import React from 'react';

import styles from './App.module.scss'
import Todos from './components/Todos/Todos';

function App() {
  return (
    <div className={styles.app}>
      <Todos />
    </div>
  );
}

export default App;
