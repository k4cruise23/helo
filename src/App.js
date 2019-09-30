// import React from 'react';
// import './App.css';
// import Nav from './Components/Nav/Nav'
// import routes from './routes'


// function App() {
//   return (
//     <div className="App">
//       <Nav />
//       {routes}
//     </div>
//   );
// }

// export default App;



import React, {Component} from 'react';

import './App.css';
// import Nav from "./Components/Nav/Nav"
import routes from "./routes"
import Nav from "./Components/Nav/Nav"
import {withRouter} from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname === "/" ? null : <Nav/>}
      {routes}
    </div>
  );
}
}

export default withRouter(App);