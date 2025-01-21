import {  Typography } from "@mui/material";
import  React, { useEffect, useState } from "react";
import EmployeeTabella from "./EmployeeTabella";
import Bottone from "./Bottone";
import Filtro from "./Filtro";
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
    //funzione per filtrare per nome e email 
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
    //funzione per bottone xml 
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
    <Filtro filters={filters} onFilterChange={handleFilterChange}/>
    <Bottone onExport={()=>exportToXML()}/>
    <EmployeeTabella employees={filteredLista}/>
    </>
}
