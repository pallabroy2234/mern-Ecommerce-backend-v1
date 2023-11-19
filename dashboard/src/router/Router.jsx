import {useRoutes} from "react-router-dom";

const Router = ({allRoutes}) => {
    let element = useRoutes([...allRoutes]);
    return element;
};

export default Router;
