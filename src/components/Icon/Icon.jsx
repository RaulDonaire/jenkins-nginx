import "./estilo.css";
import {ReactComponent as Mail} from "../../assets/icons/gray-mail.svg";
import {ReactComponent as Bell} from "../../assets/icons/gray-bell.svg";
import {ReactComponent as Shop} from "../../assets/icons/shopping-cart-solid.svg";
import {ReactComponent as Sync} from "../../assets/icons/gray-sync.svg";
import {ReactComponent as Adjust} from "../../assets/icons/gray-adjust.svg";
import {ReactComponent as Chart} from "../../assets/icons/gray-chart.svg";
import {ReactComponent as Cog} from "../../assets/icons/gray-cog.svg";
import {ReactComponent as Cake} from "../../assets/icons/blue-cake.svg";
import {ReactComponent as Document} from "../../assets/icons/blue-document.svg";
import {ReactComponent as Power} from "../../assets/icons/power.svg";
import React from "react";


const renderSwitch = (icon, color, size) =>{
    switch(icon) {
        case 'mail': return <Mail style={{height: size, width: size}} fill={color}/>;
        case 'bell': return <Bell style={{height: size, width: size}} fill={color}/>;
        case 'shop': return <Shop style={{height: size, width: size}} fill={color}/>;
        case 'sync': return <Sync style={{height: size, width: size}} fill={color}/>;
        case 'adjust': return <Adjust style={{height: size, width: size}} fill={color}/>;
        case 'chart': return <Chart style={{height: size, width: size}} fill={color}/>;
        case 'cog': return <Cog style={{height: size, width: size}} fill={color}/>;
        case 'cake': return <Cake style={{height: size, width: size}} fill={color}/>;
        case 'document': return <Document style={{height: size, width: size}} fill={color}/>;
        case 'power':return <Power style={{height: size, width: size}} fill={color}/>;
        default: return <Mail style={{height: size, width: size}} fill={color}/>;
    }
}



function Icon(props){
    return (
        <React.Fragment>
        {renderSwitch(props.icon, props.color, props.size)}
        </React.Fragment>
    );

}

export default Icon;