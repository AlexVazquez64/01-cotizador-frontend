
import OeeMain from '../components/oee/OeeMain';
import LineMonitoring from '../components/dashboard/LineMonitoring';

import SetupScreen from '../components/setup/SetupScreen';

import SetupUsers from '../components/setup/users/SetupUsers';
import SetupOverallInformation from '../components/setup/overallInformation/SetupOverallInformation';
import SetupMachinebyprocess from '../components/setup/machineByProcess/SetupMachinebyprocess';
import SetupWorkingShifts from '../components/setup/workingShifts/SetupWorkingShifts';
import SetupTSNU from '../components/setup/tsnu/SetupTSNU';
import SetupAlertCriteria from '../components/setup/alertCriteria/SetupAlertCriteria';


import { paths } from './paths';

export const routes = [
  {
    path: paths.main,
    exact: true,
    component: () => <OeeMain />
  },
  {
    path: paths.linemonitoring,
    component: () => <LineMonitoring />
  },
  {
    path: paths.setup,
    component: () => <SetupScreen />
  },
  {
    path: paths.setupUsers,
    component: () => <SetupUsers />
  },
  {
    path: paths.setupOverallinformation,
    component: () => <SetupOverallInformation />
  },
  {
    path: paths.setupMachinebyprocess,
    component: () => <SetupMachinebyprocess />
  },
  {
    path: paths.setupWorkingshifts,
    component: () => <SetupWorkingShifts />
  },
  {
    path: paths.setupTSNU,
    component: () => <SetupTSNU />
  },
  {
    path: paths.setupAlertCriteria,
    component: () => <SetupAlertCriteria />
  }
];