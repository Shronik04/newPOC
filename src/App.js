import './App.css';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch,Link, Route,Redirect} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import UserP from './components/UserP'
import First from './components/First'
import { useState,useEffect} from 'react'
import cookie from 'react-cookies'
import Reset from './components/Reset';
import ResetPage from './components/ResetPage';

function App() {
  const [check, setCheck] = useState(false)
  const [cook, setCook] = useState();
  const [move, setMove]=useState(false)
  
 

  useEffect(() => {
    setCook(document.cookie)
    if(document.cookie) setCheck(true)
   },[check,cook])
  
  useEffect(() => {
    console.log("check",check);
  })
  const out=()=> {
    
  
    cookie.remove("Auth")
         setCook('')
   setCheck(false)
 
    setMove(true)
  }
  
  return (
    <div className="App">
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
   <Link to="/">HOME</Link>
    <div className="navbar-nav ml-auto">
    {check?<button onClick={()=>out() }>Logout</button>:(<>
     
    <Link to="/login">
    <button>
      login
    </button>
    </Link> </>)}
    
    </div>
  </div>
</nav>
      <Switch>
  <Route exact path="/" component={First} />
        
  <Route exact path="/signup" component={SignUp} />
  <Route exact path="/login"  ><Login setCheck={setCheck} cook={cook} setCook={setCook} /></Route>
        <Route exact path="/dashboard"  >
          <Home check={check} />
  </Route>
  
  <Route exact path="/admin" component={Admin} />
  <Route exact path="/user" component={UserP} />
  <Route exact path="/forgot" component={Reset} />
  <Route exact path="/resetpass/:tok" component={ResetPage} />





      </Switch>
      
      {move?<Redirect to="/" />:null}
    </div>
  );
}

export default App;
