import { Box, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import  React, { useEffect, useState } from "react";

interface EmployeeListQueryResponse {
    id: number;
    firstName:string;
    lastName:string;
    address: string;
    email: string;
    phone: string;
    department:{
        code:string;
        description:string;
    }

}

export default function EmployeeListPage() {
    const [lista, setLista]=useState<EmployeeListQueryResponse[]>([])
    const [filteredLista, setFilteredLista]=useState<EmployeeListQueryResponse[]>([])
    const [filters,SetFilters]=useState({Nome: "" , Email:""})
    useEffect(() => {
        fetch("api/employees/list")
            .then((response) => { return response.json()})
            .then((data) => {
                setLista(data as EmployeeListQueryResponse[]);
                setFilteredLista(data as EmployeeListQueryResponse[]);
            })
            .catch((error)=>console.error("Errore durante il fetch:", error))
    }, []);
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        SetFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    
        setFilteredLista(
            lista.filter((employee) =>
                (name === "Nome" ? employee.firstName?.toLowerCase().includes(value.toLowerCase()) : true) &&
                (name === "Email" ? employee.email?.toLowerCase().includes(value.toLowerCase()) : true)
            )
        );
    };
    const exportToXML = ()=>{
        const xmlData = lista
        .map(employee=>{
            return`
            <Employee>
                <Id>${employee.id}</Id>
                <Nome>${employee.firstName}</Nome>
                <LastName>${employee.lastName}</LastName>
                <Address>${employee.address}</Address>
                <Email>${employee.email}</Email>
                <Phone>${employee.phone}</Phone>
                <Department>
                        <Code>${employee.department?.code || "N/A"}</Code>
                        <Description>${employee.department?.description || "N/A"}</Description>
                </Department>
            </Employee>
            `}).join("")
            const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
            <Employees>${xmlData}</Employees>`
        const blob = new Blob([xmlContent],{type: "application/xml"})
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href=url
        link.download="employees.xml"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return<>
    <Typography variant="h4" sx={{textAlign:"center", mt:4, mb:4}}>
        Employee
    </Typography>
    <Box sx={{display:"flex", justifyContent:"center", gap: 2, mb:2}}>
        <TextField label="Nome" name="Nome" value={filters.Nome} onChange={handleFilterChange} variant="outlined"/>
        <TextField label="Email" name="Email" value={filters.Email} onChange={handleFilterChange} variant="outlined"/>
    </Box>
    <Button variant="contained" color="primary" onClick={exportToXML} sx={{mb:2}} >Export XML</Button>
    <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableHeadCell>Id</StyledTableHeadCell>
                    <StyledTableHeadCell>FirstName</StyledTableHeadCell>
                    <StyledTableHeadCell>LastName</StyledTableHeadCell>
                    <StyledTableHeadCell>Adress</StyledTableHeadCell>
                    <StyledTableHeadCell>Email</StyledTableHeadCell>
                    <StyledTableHeadCell>Phone</StyledTableHeadCell>
                    <StyledTableHeadCell>Department</StyledTableHeadCell>
                
                </TableRow>
            </TableHead>
            <TableBody>
            {filteredLista.map((row)=>(
                    <TableRow
                        key={row.id }
                    sx={{"&:last-child td, &:last-child th": { border: 0 }}}
                    >
                        <TableCell>{row.id }</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.email }</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.department ? `${row.department.code}- ${row.department.description}`:"N/A"}</TableCell>
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