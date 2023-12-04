import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import ComplexForm from '@/pages/ComplexForm';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound/NotFound';
import SimpleForm from '@/pages/SimpleForm';

export const routes = (
  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="simple-form" element={<SimpleForm />} />
    <Route path="complex-form" element={<ComplexForm />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export default router;
