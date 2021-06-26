
import React, { useEffect } from 'react';
import styleData from './../css/dataContainer.module.css';
import InputText from './inputText.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhoneAlt, faMapMarkerAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export function DataContainer(){
    const user = <FontAwesomeIcon icon={faUser} />
    const envelope = <FontAwesomeIcon icon={faEnvelope} />
    const phone = <FontAwesomeIcon icon={faPhoneAlt} />
    const location = <FontAwesomeIcon icon={faMapMarkerAlt} />
    const locationStreet = <FontAwesomeIcon icon={faMapMarkedAlt} />

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneS, setPhoneS] = useState(0);
    const [zipcode, setZipcode] = useState(0);
    const [colonia, setColonia] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [delegation, setDelegation] = useState("");
    const [street, setStreet] = useState("");
    const [fetchedZipcode, setFetchedZipcode] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{
        if(fetchedZipcode!==""){
            setState(fetchedZipcode.state);
            setCity(fetchedZipcode.city);
            setDelegation(fetchedZipcode.town)
            if(fetchedZipcode.colonies.length===1) setColonia(fetchedZipcode.colonies[0]);
        }
    },[fetchedZipcode])

    function handleChange(ev){
        console.log(ev.target.id);
        switch(ev.target.id){
            case "name":
                setName(ev.target.value);
                break;
            case "lastName":
                setLastName(ev.target.value);
                break;
            case "mail":
                setEmail(ev.target.value);
                break;
            case "phone":
                setPhoneS(+ev.target.value);
                break;
            case "zipcode":
                if((+ev.target.value)===89000 || (+ev.target.value)===11000){
                    getZipcodes(+ev.target.value);
                    setIsDisabled(!isDisabled);
                }
                if(ev.target.value===""){
                    cleanDependencies();
                }
                setZipcode(+ev.target.value);
                break;
            case "colonia":
                setColonia(ev.target.value);
                break;
            case "state":
                setState(ev.target.value);
                break;
            case "city":
                setCity(ev.target.value);
                break;
            case "delegation":
                setDelegation(ev.target.value);
                break;
            case "street":
                setStreet(ev.target.value);
                break;
            case "selector":
                if(ev.target.value === "manual"){
                    cleanDependencies();
                    setIsDisabled(!isDisabled);
                }else{
                    setColonia(ev.target.value);
                }
                break;
        }
    }

    async function getZipcodes(zip){
        let data = await fetch(`https://blackisp.herokuapp.com/postalCodes/${zip}`);
        data = await data.json();
        setFetchedZipcode(data);
    }

    function cleanDependencies(){
        setColonia("");
        setState("");
        setCity("");
        setDelegation("");
    }

    async function submit(){
        let obj = {
            name,
            lastName,
            email,
            phoneS,
            zipcode,
            colonia,
            state,
            city,
            delegation,
            street,
        }
        let control = true;
        for(let keys in obj){
            if(obj[keys]===""){
                control = false;
            }
        }
        let response={};
        if(control){
            response = await fetch('https://blackisp.herokuapp.com/contact',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            });
        }else{
            response.status = 300;
        }
        if(response.status === 204){ 
            window.alert("Guardado Correctamente");
        }else{
            window.alert("Orden no porcesada");
        }
        
    }

    return <div id={styleData.container}>
        <header id={styleData.header}>
            <p>DIRECC&#205;ON DE ENV&#205;O</p>
        </header>
        <main id={styleData.main}>
            <InputText
                icon={user}
                name="name"
                placeholder="Nombre"
                onChange={handleChange}
            ></InputText>
            <InputText
                icon={user}
                name="lastName"
                placeholder="Apellido"
                onChange={handleChange}
            ></InputText>
            <InputText
                icon={envelope}
                name="mail"
                placeholder="Correo Electronico"
                type="email"
                onChange={handleChange}
            ></InputText>
            <InputText
                icon={phone}
                name="phone"
                placeholder="Número de Telefono"
                type="tel"
                pattern="[0-9]{10}"
                onChange={handleChange}
            ></InputText>
            <InputText
                icon={location}
                name="zipcode"
                placeholder="Codigo Postal"
                type="number"
                pattern="[0-9]{5}"
                onChange={handleChange}
            ></InputText>
            <InputText
                icon={location}
                name="colonia"
                placeholder="Colonia"
                class={(isDisabled)?styleData.disabled:""}
                isDisabled={isDisabled}
                onChange={handleChange}
                valueContent={colonia}
            ></InputText>
            {(fetchedZipcode.colonies && fetchedZipcode.colonies.length>1)?
                <select onChange={handleChange} id="selector">
                    <option value="manual">Escribir Datos</option>
                    {fetchedZipcode.colonies.map(el => {
                        return <option value={el}>{el}</option>
                    })}
                </select>
                :
                null
            }
            <InputText
                icon={location}
                name="state"
                placeholder="Estado/Region"
                class={(isDisabled)?styleData.disabled:""}
                isDisabled={isDisabled}
                onChange={handleChange}
                valueContent={state}
            ></InputText>
            <InputText
                icon={location}
                name="city"
                placeholder="Ciudad"
                class={(isDisabled)?styleData.disabled:""}
                isDisabled={isDisabled}
                onChange={handleChange}
                valueContent={city}
            ></InputText>
            <InputText
                icon={location}
                name="delegation"
                placeholder="Delegacion"
                class={(isDisabled)?styleData.disabled:""}
                isDisabled={isDisabled}
                onChange={handleChange}
                valueContent={delegation}
            ></InputText>
            <InputText
                icon={locationStreet}
                name="street"
                placeholder="Calle"
                onChange={handleChange}
            ></InputText>
            <div id={styleData.buttons}>
                <input type="button" value="Libreta de Direcciones" />
                <input type="button" value="Guardar" onClick={submit}/>
            </div>
        </main>
        <footer id={styleData.footer}>
            <label htmlFor={styleData.direccionFacturacion}>
                <input type="checkbox" value="guardarDireccion" id={styleData.direccionFacturacion}/>
                <span>Utilizar como dirección de facturación</span>
            </label>
        </footer>
    </div>
}

export default DataContainer;