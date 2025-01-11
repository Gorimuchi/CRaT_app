import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
import CreateRequest from './component/pages/CreateRequest';
import Request from './component/pages/Request';
import Transaction from './component/pages/Transaction';
import NoFound from './component/pages/NoFound';
import Account from './component/pages/Account';
import Setting from './component/pages/Setting';
import Signin from './component/pages/Signin';
import Signup from './component/pages/Signup';
import Bar from './component/Bar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bar />}>
          <Route index element={<Home />} />
          <Route path="/create_request" element={<CreateRequest />}/>
          <Route path="/request_list" element={<Request />}/>
          <Route path="/transaction" element={<Transaction />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/setting" element={<Setting />}/>
          <Route path="*" element={<NoFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;