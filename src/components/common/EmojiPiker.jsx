// import { Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useEffect, useState } from 'react'
// // import { Picker } from "emoji-mart";// 100 
// import Picker from '@emoji-mart/react';

// const EmojiPiker = (props) => { // 99
//   const [selectedEmoji, setSelectedEmoji] = useState();
//   const [isShowPicker, setIsShowPicker] = useState(false); // 101

//   useEffect(() => {
//     setSelectedEmoji(props.icon);
//   }, [props.icon]);

//   const showPicker = () => setIsShowPicker(!isShowPicker);

//   return (
//     <Box>
//       <Typography variant='h3' fontWeight="700" sx={{ cursor: 'pointer' }} onClick={showPicker}>
//         {selectedEmoji}
//       </Typography>
//       <Box sx={{ display: isShowPicker ? "block" : "none" }}>
//         <Picker />
//       </Box>
//     </Box>
//   )
// }

// export default EmojiPiker



import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => { //103
    const emojiCode = e.unified.split("-");
    console.log(emojiCode);
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    console.log(codesArray);
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "100",
        }}
      >
        <Picker onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;