import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system' // 88
import { IconButton, TextField } from '@mui/material'
import SterBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../../redux/features/memoSlice';
import EmojiPiker from '../common/EmojiPiker';

const Memo = () => {

  const { memoId } = useParams(); // 90
  const [title, setTitle] = useState(""); // 91
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(""); // 98
  const dispatch = useDispatch(); // 96
  const navigate = useNavigate(); // 96
  const memos = useSelector((state) => state.memo.value); // 96

  useEffect(() => { // 90
    const getMemo = async () =>{
      try {
        const res = await memoApi.getOne(memoId);
        // console.log(res);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer; // 94 APIの呼び出す回数を減らす
  const timeout = 500;

  const updateTitle = async (e) => { // 93 
    clearTimeout(timer); // 0.5秒を超えないときは更新されない 94
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {title: newTitle});
      } catch (err) {
        alert(err);
      }
    }, timeout); // 0.5秒ごとにしか発火しない
    
  };

  const updateDescription = async (e) => { // 93 
    clearTimeout(timer); // 0.5秒を超えないときは更新されない 94
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {description: newDescription});
      } catch (err) {
        alert(err);
      }
    }, timeout); // 0.5秒ごとにしか発火しない
    
  };

  const deleteMemo = async () => { // 95
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo)
      const newMemos = memos.filter((e) => e._id !== memoId); // 96
      if(newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`); // 一番上のメモに遷移
      }

      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err)
    }
  };

  const onIconChange = async (newIcon) => { // 103
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = {...temp[index], icon: newIcon};
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, {icon: newIcon});
    } catch (err) {
      alert(err)
    }
  };

  return (
    <>
      <Box sx={{ display:"flex", alignItems: "center", width: "100%" }}>
          <IconButton>
              <SterBorderOutlinedIcon />
          </IconButton>
          <IconButton variant="outlined" color='error' onClick={deleteMemo}>
              <DeleteOutlinedIcon />
          </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPiker icon={icon} onChange={onIconChange} />
          <TextField 
            onChange={updateTitle} // 93
            value={title} 
            placeholder='無題' 
            variant='outlined' 
            fullWidth sx={{ 
              ".MuiOutlinedInput-input": { padding: 0 }, // 開発者ツールでフォーカスし、CSSを変更　８９
              ".MuiOutlinedInput-notchedOutline": { border: "none" }, 
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" }
            }} 
          />
          <TextField 
            onChange={updateDescription}
            value={description} 
            placeholder='追加' 
            variant='outlined' 
            fullWidth sx={{ 
              ".MuiOutlinedInput-input": { padding: 0 }, // 開発者ツールでフォーカスし、CSSを変更　８９
              ".MuiOutlinedInput-notchedOutline": { border: "none" }, 
              ".MuiOutlinedInput-root": { fontSize: "1rem" }
            }} 
          />
        </Box>
      </Box>
    </>
  )
}

export default Memo