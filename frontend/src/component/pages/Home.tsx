/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../../css/Home.css'
import backimg from '../../img/backimg2.jpg'
import image from '../../img/image.jpg'
import movie from '../../img/movie.jpg'
import document from '../../img/document.jpg'
import { Link } from 'react-router-dom'
import { backendHost, protocol } from '../../Global'

const Home = () => {
  const [request, setRequest] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [scrollY, setScrollY] = useState(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  } ;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[scrollY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = protocol + backendHost + "/requests";
        const res = await fetch(`${URL}`);
        if (!res.ok) {
          throw new Error("データの取得に失敗しました。")
        }
        const data = await res.json();
        setRequest(data);
        
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>
              エラー：{error}
              <button onClick={() => window.location.reload()}>リトライ</button>
           </div>
  }

  const Imagetype: {[key: string]: string} = {
    image: image,
    movie: movie,
    document: document
  }
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <div>
      <div className="top_page">
        <img src={backimg} alt="背景" />
        <div className="background_overlay" />
        <div className="home_title">
          <div className={`titlename ${scrollY ? "active" : ""}`}>CRaT</div>
          <div className={`subtitle ${scrollY ? "active" : ""}`}>Create Request and Transaction</div>
        </div>
        <div className="account_link">
          <div className="signin_form">
            アカウントをお持ちでない方
            <Link to="/signup"><button>サインアップ</button></Link>
          </div>
          <div className="login_form">
            アカウントをお持ちの方
            <Link to="/signin"><button>サインイン</button></Link>
          </div>
          <div className="forget">
            <Link to="/" className='forget_link'>アカウント情報をお忘れの場合</Link><br />
            <Link to="/" className='forget_link'>パスワードをお忘れの場合</Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="right_page">
        <div className="search">
          <div className="searchbox">
          <input type="search" placeholder="キーワードを入力"/>
          <button >検索</button>
          </div>
          <div className="restriction">
            <div>
              <select name="type" id="request-type">
                <option value="">タイプを選択</option>
                <option value="image">画像</option>
                <option value="movie">動画</option>
                <option value="document">書類</option>
              </select>
            </div>
            <div>
              <input type="date" />
            </div>
            <div>
              <button>絞り込む</button>
            </div>
          </div>
          <div className="list_type">
            <select name="list" id="list">
                <option value="date">日付</option>
                <option value="money">報酬金</option>
                <option value="deadline">締め切り</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="request_list">
          <ul>
            {request.map((item, index) => (
              <li key={index} className='request'>
                <img 
                  src={Imagetype[item.type]}
                  alt={item.type}
                />
                <div className="request_content">
                  <div className="request_title">{item.title}</div>
                  <br />
                  <div className="request_reword">￥{item.reword}</div>
                  <div className="request_date">
                    <div className="request_create_date">作成日:{formatDate(item.created_date)}</div>
                    <div className="deadline">期限:{formatDate(item.deadline)}</div>
                  </div>              
                </div>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
      <Link to="/create_request">
       <div className="create_request">
          依頼作成
        </div>
      </Link>
    </div>
  )
}

export default Home