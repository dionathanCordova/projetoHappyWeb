import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/index';
// import Orphanages from './pages/OrphanagesMap';
import Orphanages from './pages/OrphanagesMap/index';
import CreateOrphanage from './pages/CreateOrphanage/index';
import EditOrphanage from './pages/EditOrphanage/index';
import OrphanageDetails from './pages/OrophanageDetail';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp/index';
import ForgotPass from './pages/ForgotPass/index';
import DashboardIndex from './pages/Dashboard';
import DashboardNotRegistered from './pages/Dashboard/pendent';

import PageConfirm from './components/PageComfirm';
import PageRemove from './components/PageRemove';

import { AuthProvider} from './contexts';

function Routes() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <Switch>
               <Route path="/" exact component={Landing} />
               <Route path="/orphanages" exact component={Orphanages} />
               <Route path="/orphanages/create" component={CreateOrphanage} />
               <Route path="/orphanages/edit/:id" component={EditOrphanage} />
               <Route path="/orphanages/:id" component={OrphanageDetails} />
               
               <Route path="/signin" component={SignIn} />
               <Route path="/signup" component={SignUp} />
               <Route path="/forgot-pass" component={ForgotPass} />

               <Route path="/dashboard" exact component={DashboardIndex} />
               <Route path="/dashboard/notregistered" component={DashboardNotRegistered} />

               <Route path="/orphanage/createconfirm" component={PageConfirm} />
               <Route path="/orphanage/removeconfirm" component={PageRemove} />
            </Switch>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default Routes;