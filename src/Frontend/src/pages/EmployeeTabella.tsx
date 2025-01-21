import React from "react"
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
interface EmployeeTabellaProps{
    employees: EmployeeListQueryResponse[];
}
export interface EmployeeListQueryResponse {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    department: {
        code: string;
        description: string;
    };
}
const EmployeeTabella:React.FC<EmployeeTabellaProps>=({employees})=>{
    return(
        <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {/*celle di intestazione personalizzate */}
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
            {employees.map((row)=>(
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
                        {/*verifica se il dipartimento esiste e formatta i dati */}
                        <TableCell>{row.department ? `${row.department.code}- ${row.department.description}`:"N/A"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}
//componente stile celle 
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  }));
  export default EmployeeTabella