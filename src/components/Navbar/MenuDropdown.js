import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import '../Navbar/styles/MenuDropdown.css';


const MenuDropdown = () => {
    const [dropdown, setDropdown] = useState(false);
    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown);
    }
    const accionPrueba = ()=>{
        alert("Soy la acción 1")
    }
    return (
        
        <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} direction="left" size="lg" >
            <DropdownToggle caret className="botonDropdown">
                Menu
            </DropdownToggle>

            <DropdownMenu className="botonMenu">
            <DropdownItem header>Encabezado</DropdownItem>
            <DropdownItem divider/>
                <DropdownItem onClick={()=>accionPrueba()} >Acción 1</DropdownItem>
                <DropdownItem>Acción 2</DropdownItem>
                <DropdownItem>Acción 3</DropdownItem>
                <DropdownItem disabled>Acción 4 (Desahabilitada)</DropdownItem>
            </DropdownMenu>

        </Dropdown>

    )
}

export default MenuDropdown
