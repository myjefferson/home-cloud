import styled from  'styled-components'

export const NavWelcome = styled.nav`
    padding: 25px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--main-blue);

    ul{
        float: right;
    }

    ul li{
        display: inline;
    }

    ul li button{
        cursor: pointer;
        background: none;
        border: none;
        color: #FFF;
        font-size: 14px;
        margin: 0 0 0 30px;
        padding: 5px 12px 5px 12px;
    }

    ul li button:hover{
        background: #FFF;
        color: #1070FF;
        border-radius: 3px;
        padding: 5px 12px 5px 12px;
    }

    img{
        width: 135px;
    }
`

export const Content = styled.div`
    top: 0px;
    padding: 0;
    margin-top: -17px;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1{
        font-size: 3.5em;
        font-family: "gotham-bold";
        color: var(--main-blue);
    }

    h2{
        color: var(--gray);
    }

    div.controls{
        display: flex;
        justify-content: center;
    }

    div.controls a{
        color: var(--main-blue);
        cursor: pointer;
        border: none;
        background: none;
        font-size: 20px;
        text-decoration: none;
    }

    div.controls a{
        display: block;
        width: max-content;
        color: #FFF;
        background: #1070FF;
        border: none;
        padding: 13px;
        font-size: 20px;
        margin: 20px 0 0 15px;
        border-radius: 5px;
    }

    footer{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: 10px;
        font-size: 18px;
        text-align: center;
        background: #F1F5FF;
    }

    footer a{
        text-decoration: none;
        color: #333;
    }

    footer a:hover{
        border-bottom 1px solid #333;
    }
`
