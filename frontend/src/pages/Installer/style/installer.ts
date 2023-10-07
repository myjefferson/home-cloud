import styled from "styled-components";

export const Content = styled.div`
    margin: 0;
    padding: 0;
    background: #38007E;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .box-dialog{
        padding: 15px 25px 15px 25px;
        border-radius: 15px;
        border: 4px solid #7C1FF2;
        width: 350px;
        height: max-content;
        background: #FFF;
        overflow-x: hidden;
    }
    
    .start-dialog{
        position: relative;
        animation-name: slider;
        animation-duration: 0.7s;
        animation-iteration-count: 1;
    }

    @keyframes slider {
        from { left: 400px; opacity: 0%;}
        to { left: 0px; opacity: 100%;}
    }

    .box-dialog .header{
        text-align: center;
    }

    .box-dialog .header h2{
        font-family: "gotham-bold";
        color: #474747;
    }

    .box-dialog .input-disk-space{
        padding: 10px;
        border: 2px solid #F6004A;
        background: #F4F4F4;
        border-radius: 5px;
        outline: none;
        width: 35%;
        margin-right: 10px;
        font-size: 20px;
    }

    .box-dialog button{
        cursor: pointer;
        display: block;
        width: 100%;
        margin-top: 20px;
        padding: 12px;
        background: #1070FF;
        color: #FFF;
        border-radius: 6px;
        border: none;
        font-size: 18px;
    }

    .text-warning{
        text-align: center;
        color: red;
    }

    .area-radios{
        text-align: left;
    }

    .area-radios input, .area-radios label{
        margin: 0;
        padding: 0;
        text-align: left;
    }
`

export const Developer = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #5F00D7;
    text-align: center;
    color: #FFF;
    padding: 10px 0 10px 0;

    a{
        color: #FFF;
        text-decoration: none;
    }
`