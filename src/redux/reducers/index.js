import {combineReducers} from "redux"
import home from "./home"
import login from "./login"
import utils from "./utils"
import menus from "./menus"
import payment from "./payment"
import shipments from "./shipments"
import users from "./users"
export default combineReducers({
    home,
    login,
    payment,
    users,
    shipments,
    utils,
    menus,
})