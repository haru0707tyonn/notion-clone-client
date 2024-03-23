// registerページとほとんど一緒　59

import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

const Login = () => {
  const navigate = useNavigate(); // 簡単にページ遷移ができる  57

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // リロードをしない 

    setUsernameErrText(""); 
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    console.log(username);
    console.log(password);

    let error = false; // 53 

    if(username === "") { // 空の場合のエラー表示
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if(password === "") { // 空の場合のエラー表示
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    if (error) return; // エラーがあった場合はこれ以降を実行しない

    setLoading(true); // アカウント作成ボタンがクルクル回る 56

    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username, // req.bodyに含まれるもの
        password,
      });
      setLoading(false); // アカウント作成ボタンのクルクル終了
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
      navigate("/"); // ルートページにリダイレクト 57
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => { // 55
        if(err.path === "username") {  // paramではなく確認したところ、pathになっていた
          setUsernameErrText(err.msg);
        }
        if(err.path === "password") { 
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false); // アカウント作成ボタンのクルクル終了
    }
  };

  return (
    <>
      {/* noValidateはデフォルトのバリデートエラー分を表示しない */}
      <Box component="form" onSubmit={handleSubmit} noValidate> 
        <TextField 
          fullWidth 
          id='username' 
          label="お名前" 
          margin='normal' 
          name='username' 
          required 
          helperText={usernameErrText} // helperTextはマテリアルUIにあり、バリデーションエラー分を設定したのに変更できる
          error={usernameErrText !== ""} // errorがtrueになると赤文字で表示される
          disabled={loading} // trueになると押せなくなる（入力できなくなる（薄くなって表示）） 56
        /> 
        <TextField 
          fullWidth 
          id='password' 
          label="パスワード" 
          margin='normal' 
          name='password' 
          type='password' 
          required 
          helperText={passwordErrText} 
          error={passwordErrText !== ""} // errorがtrueになると赤文字で表示される
          disabled={loading} // trueになると押せなくなる（入力できなくなる（薄くなって表示）） 56
        />
        <LoadingButton  // loading={true}の場合、くるくる回る
          sx={{ mt: 3, mb: 2 }} 
          fullWidth type='submit' 
          loading={loading} 
          color='primary' 
          variant='outlined'
        >
          ログイン
        </LoadingButton>
      </Box>
      {/* react-router-domのほうのLink */}
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  )
};

export default Login;