import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import CreateRecord from './components/CreateRecord'
import Home from './components/Home'
import Navigation from './components/Navigation'
import History from './components/History'
import Ingreso from './components/pages/Ingreso'
import Egreso from './components/pages/Egreso'
import UpdateRecord from './components/UpdateRecord';
import Todos from './components/pages/Todos'


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <div className="container p-4">
          <Route path='/' exact component={Home}></Route>
          <Route path='/create' component={CreateRecord}></Route>
          <Route path="/edit/:id" component={UpdateRecord}></Route>
          <Route path='/history' component={History}></Route>
          <Route path='/history/todos' component={Todos}></Route>
          <Route path='/history/ingreso' component={Ingreso}></Route>
          <Route path='/history/egreso' component={Egreso}></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
