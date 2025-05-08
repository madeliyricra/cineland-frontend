import {
  BrowserRouter,
  Route,
  Routes as Switch,
  type RouteProps,
} from "react-router-dom";
import { Home, NotFound, Order } from "../pages";
import links from "../utils/links";
import Layout from "../layout";

const routes: RouteProps[] = [
  {
    path: links.root,
    element: <Home />,
  },
  {
    path: links.order,
    element: <Order />
  },
  {
    path: links.notFound,
    element: <NotFound />,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
