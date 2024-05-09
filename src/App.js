import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Classes from './Classes';
import Sessions from './Sessions';
import Assignments from './Assignments';
import Students from './Students';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Classes} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/assignments" component={Assignments} />
        <Route path="/students" component={Students} />
      </Routes>
    </Router>
  );
}

export default App;
