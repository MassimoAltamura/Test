import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import  { useEffect, useState } from "react";

interface EmployeeListQueryResponse {
    Id: number;
    Code:number;
    FirstName:string;
    LastName:string;
    Address:string;
    Email:string;
    Phone:string;
}

export default function EmployeeListPage() {
    const [lista, setLista]=useState<EmployeeListQueryResponse[]>([])
    
    useEffect(()=>{
        fetch("api/employees/list")
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setLista(data as EmployeeListQueryResponse[])
        })
    })

    return<>
    <Typography variant="h4" sx={{textAlign:"center", mt:4, mb:4}}>
        Employee
    </Typography>
  
    <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableHeadCell>Code</StyledTableHeadCell>
                    <StyledTableHeadCell>FirstName</StyledTableHeadCell>
                    <StyledTableHeadCell>LastName</StyledTableHeadCell>
                    <StyledTableHeadCell>Adress</StyledTableHeadCell>
                    <StyledTableHeadCell>Email</StyledTableHeadCell>
                    <StyledTableHeadCell>Phone</StyledTableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {lista.map((row)=>(
                    <TableRow
                    key={row.Id } 
                    sx={{"&:last-child td, &:last-child th": { border: 0 }}}
                    >
                        <TableCell>{row.Code}</TableCell>
                        <TableCell>{row.FirstName}</TableCell>
                        <TableCell>{row.LastName}</TableCell>
                        <TableCell>{row.Address}</TableCell>
                        <TableCell>{row.Email}</TableCell>
                        <TableCell>{row.Phone}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
}
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  }));