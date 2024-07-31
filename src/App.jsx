import './App.css';
import {Routes,Route} from 'react-router-dom'
import Navigationpage from './vendorDashboard/pages/navigationpage';


const App=()=>{
  return(
    <>
     <Routes>
      <Route path='/' Component={Navigationpage} />
    </Routes>
    </>
  )

}

export default App;
