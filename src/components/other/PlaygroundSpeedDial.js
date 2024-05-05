import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { color } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deletePost } from '@/http/postApi';

import { useState } from 'react';

import CreatePostModal from '../modal/mainModal/CreatePostModal';

const actions = [
   { icon: <DeleteIcon />, name: 'Delete'},
   { icon: <EditIcon />, name: 'Editor' },
];

const BasicSpeedDial = ({id, deletePost, title, image, type, video}) => {
   const [open, setOpen] = useState(false);
   return (
      <Box  sx={{ height: 30, position: "relative", transform: 'translateZ(0px)', zIndex: 2}}>
         <SpeedDial
         ariaLabel="SpeedDial basic example"
         icon={<MoreHorizIcon />}
         direction="down"
         FabProps={{color: "primary", size: "small" }}
         >
         {actions.map((action) => (
            <SpeedDialAction
               key={action.name}
               icon={action.icon}
               onClick={() => action.name === "Delete" ? deletePost(id) : setOpen(true)}
               sx={{color: action.name === "Delete" ? "#B51818 " : "#8318B5 "}}
               FabProps={{size: "small", color: "black" }}
               tooltipTitle={action.name}
            />
         ))}
         </SpeedDial>
         <CreatePostModal id={id} video={video} typePost={type} srcImage={image} titlePost={title} open={open} handleClose={() => setOpen(false)}/>
      </Box>
   );
}

export default BasicSpeedDial

