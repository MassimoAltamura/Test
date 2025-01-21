import React from "react";
import { Box,TextField } from "@mui/material";
interface  FiltroProps{
    filters:{Nome:string; Email:string}
    onFilterChange:(event: React.ChangeEvent<HTMLInputElement>)=>void
}

const Filtro: React.FC<FiltroProps> = ({filters,onFilterChange})=>{
    return(
        <Box sx={{display:"flex", justifyContent:"center", gap: 2, mb:2}}>
        <TextField label="Nome" name="Nome" value={filters.Nome} onChange={onFilterChange} variant="outlined"/>
        <TextField label="Email" name="Email" value={filters.Email} onChange={onFilterChange} variant="outlined"/>
    </Box>
    )
}
export default Filtro