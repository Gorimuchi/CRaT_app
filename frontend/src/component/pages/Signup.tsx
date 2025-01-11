import React, { useState } from 'react'
import '../../css/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { backendHost, protocol, mailHost } from '../../Global';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  
  const user = {
    email: email,
    username: username,
    password: password
  };
  const URL = protocol + backendHost + "/account/signup"

  const handleClick = async () => {
    await fetch(`${URL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => setStatus(data));
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password || !passwordconfirmation) {
      alert("すべてのフィールドに入力してください。");
    }
    
    if (password !== passwordconfirmation) {
      alert('パスワードが一致しません。');
      return;
    }
  
    try {
      console.log(status);
      if (status) {
        alert('メールアドレスに確認メールを送信しました。');
        navigate('/login')
      }
      
    } catch (error) {
      setError('確認メールの送信に失敗しました。')
    }
  }
  

  return (
    <div className='signup'>
      <form onSubmit={handleSignin} >
        <div className="signup_title">サインアップ</div>
        <input 
          className='email' 
          type="email" 
          placeholder='メールアドレスを入力'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className='username' 
          type="text" 
          placeholder='ユーザーネームを入力'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className='password' 
          type="password" 
          placeholder='パスワードを入力' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          className='passwordconfirmation' 
          type="password" 
          placeholder='確認パスワードを入力' 
          value={passwordconfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <div>
          <button type='submit' onClick={handleClick}>新規登録</button>
        </div>
      </form>
      <Link to="/signin">サインインの方はこちら</Link>
    </div>
  )
}

export default Signup