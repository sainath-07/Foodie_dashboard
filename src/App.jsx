import './App.css';
import {Routes,Route} from 'react-router-dom'
import Navigationpage from './vendorDashboard/pages/navigationpage';
import PageNotFound from './vendorDashboard/components/pageNotFound';


const App=()=>{
  return(
    <>
     <Routes>
      <Route path='/' Component={Navigationpage} />
      <Route path='/*' Component={PageNotFound} />
    </Routes>
    </>
  )

}

export default App;
