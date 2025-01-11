/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import "../css/Bar.css";
import logo from '../img/logo.png';
import notice from '../img/notice.png';
import menu from '../img/menu.png';
import x from '../img/mark.png';

const Bar = () => {

  const [scrollY, setScrollY] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(false);
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY && currentScrollY > 60) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[scrollY]);

  const isActive = (path: string) => 
    location.pathname === path ? "active" : "";

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [location.pathname]);
  useEffect(() => {
    if (hidden) {
      NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25});
      document.querySelector("#nprogress .bar")?.setAttribute("style", "position: absolute, top: 0 !important");
    } else {
      NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25});
    }
  })
  
  return (
    <div>
      <div className={`appbar ${hidden ? "hidden" : ""}`}>
        <div className="title">
          <div className="title_img"><img src={logo} alt="" /></div>
          <div className="title_name">CRaT</div>
        </div>
        <div className="page_link">
          <Link to="/" className={`page ${isActive("/")}`}>ホーム</Link>
          <Link to="/request_list" className={`page ${isActive("/request_list")}`}>依頼一覧</Link>
          <Link to="/transaction" className={`page ${isActive("/transaction")}`}>取引中</Link>
        </div>
        <div className="appbar_right">
          <div className="account">
            <Link to="/signup" className={`account_page ${isActive("/signup")}`}>サインアップ</Link>
            <Link to="/signin" className={`account_page ${isActive("/signin")}`}>サインイン</Link>
          </div>
          <div className="notice">
            <img src={notice} alt="通知" />
          </div>
          <div className="menu">
            <img src={menu} alt="サイドバー" onClick={toggleSidebar}/>
          </div>
        </div>
      </div>
      
      <div className="page_space" />
      
      <div className="outlet_page">
        <Outlet />
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <img src={x} alt="戻る" onClick={toggleSidebar}/>
        <hr />
        <div className="sidepages">
          <Link to="/" className={`side_page ${isActive("/")}`}>ホーム</Link>
          <Link to="/request_list" className={`side_page ${isActive("/request_list")}`}>依頼</Link>
          <Link to="/transaction" className={`side_page ${isActive("/transaction")}`}>取引中</Link>
          <Link to="/account" className={`side_page ${isActive("/account")}`}>アカウント</Link>
          <Link to="/setting" className={`side_page ${isActive("/setting")}`}>設定</Link>
        </div>
      </div>
    </div>
  )
}

export default Bar