import {combineReducers} from "redux"
import login from "./login"
import utils from "./utils"
import menus from "./menus"
import payment from "./payment"
import shipments from "./shipments"
import users from "./users"
export default combineReducers({
   
    login,
    payment,
    users,
    shipments,
    utils,
    menus,
})