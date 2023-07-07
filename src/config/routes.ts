import Dashboard from '../pages/dashboard'

import LogIn from '../pages/login'
import SignUp from '../pages/signup'
import Profile from '../pages/profile'
import Leaderboard from '../pages/leaderboard'

/*DESCARTES PAGES*/
import QuizDescartes from '../pages/descartes/quiz'
import QuizDescartes2 from '../pages/descartes/quiz2'
import Descartes from '../pages/descartes/index'
import Descartes2 from '../pages/descartes/index2'
import Descartes3 from '../pages/descartes/index3'
/*END DESCARTES PAGES*/

/*DESCARTES THARP*/
import MarieTharp from '../pages/marie-tharp/index'
import MarieTharp2 from '../pages/marie-tharp/quiz'
import QuizTharp from '../pages/marie-tharp/quiz'
/*END THARP*/

/*EINSTEIN PAGES*/
import Einstein from '../pages/einstein'
import QuizEinstein from '../pages/einstein/quiz'
/* */

/*EINSTEIN PAGES*/
import Clodomiro from '../pages/clodomiro'
import Homepage from '../pages/homepage'
import SponsorSaga from '../pages/sponsor-saga'
/*END EINSTEIN PAGES*/


const routes= [{
        path: '/login',
        isPrivate: false,
        component: LogIn,
      },
      {
        path: '/signup',
        isPrivate: false,
        component: SignUp,
      },
      {
        path: '/dashboard',
        isPrivate: true,
        component: Dashboard,
      },
      {
        path: '/profile',
        isPrivate: true,
        component: Profile,
      },
      {
        path: '/descartes',
        isPrivate: true,
        component: Descartes,
      },
      {
        path: '/descartes2',
        isPrivate: true,
        component: Descartes2,
      },
      {
        path: '/descartes3',
        isPrivate: true,
        component: Descartes3,
      },
      {
        path: '/descartes-q',
        isPrivate: true,
        component: QuizDescartes,
      },
      {
        path: '/descartes-q2',
        isPrivate: true,
        component: QuizDescartes2,
      },
      {
        path: '/einstein',
        isPrivate: true,
        component: Einstein,
      },
      {
        path: '/einstein-q',
        isPrivate: true,
        component: QuizEinstein,
      },
      {
        path: '/tharp',
        isPrivate: true,
        component: MarieTharp,
      },
      {
        path: '/tharp2',
        isPrivate: true,
        component: MarieTharp2,
      },
      {
        path: '/tharp-q',
        isPrivate: true,
        component: QuizTharp,
      },
      {
        path: '/clodomiro',
        isPrivate: true,
        component: Clodomiro,
      },
      {
        path: '/sponsor-saga',
        isPrivate: false,
        component: SponsorSaga,
      },
      {
        path: '/leaderboard',
        isPrivate: false,
        component: Leaderboard
      },
      {
        path: '/leaderboard/:type',
        isPrivate: false,
        component: Leaderboard
      },
      {
        path: '/:id',
        isPrivate: false,
        component: Homepage
      },
      {
        path: '/*',
        isPrivate: false,
        component: Homepage
      },
]

export default routes;