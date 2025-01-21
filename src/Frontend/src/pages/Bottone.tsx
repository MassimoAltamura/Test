import React from "react"
import { Button } from "@mui/material"
interface BottoneProps{
    onExport:()=>void
}
const Bottone:React.FC<BottoneProps>=({onExport})=>{
    return(
        <Button variant="contained" color="primary" onClick={onExport} sx={{mb:2}} >Export XML</Button>
    )
}
export default Bottone