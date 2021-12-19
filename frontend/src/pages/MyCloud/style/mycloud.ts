import styled from 'styled-components'

export const NavCloud = styled.nav`
    padding: 10px;
    width: 100vw;
    position: fixed;
    z-index: 100;
    border-bottom: 1px solid #DDD;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    top: 0;
    left: 0;
    background: #FFF;

    img{
        width: 135px;
    }
`

export const Content = styled.div`
    margin: 120px 0 0 0;
`

export const LiFile = styled.li`
    display: inline;
    padding 0;
    margin: 0;
    
    .isolation{
        position: relative;
    }

    button{
        transition: 0.6s;
        border-radius: 17px;
        padding: 7px;
        cursor: pointer;
        background: none;
        width: 100%;
        border: 1px solid rgba(0,0,0,0);
    }

    button:hover{
        transition:0.3s;
        border-radius: 17px;
        border: 1px solid #1070FF;
        box-shadow: 2px 2px 3px rgba(0,0,0,.28);
    }

    .img-ext{
        width: 100%;
    }

    p{
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        display:block;
        width: 100%;
        margin: 5px 0 7px 0;
    }

`