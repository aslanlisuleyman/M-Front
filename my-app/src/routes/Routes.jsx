import React from 'react'

import Home from '../pages/Home'
import SiteRoot from '../pages/SiteRoot'
import Basket from '../pages/Basket'


const Routes = [{
    path:'/',
    element:<SiteRoot/>,
    children:[{
        path:'',
        element:<Home/>
    },{
        path:'Basket',
        element:<Basket/>
    }]

}]

export default Routes