import {createGlobalStyle} from 'styled-components'
import gothamBold from '../fonts/gotham-bold.otf'
import gothamExtralight from '../fonts/gotham-extralight.ttf'

export const GlobaStyle = createGlobalStyle`
    @font-face{
        font-family: "gotham-bold";
        src: url("${gothamBold}");
    }

    @font-face{
        font-family: "gotham-extralight";
        src: url("${gothamExtralight}");
    }
    
    body{
        font-family: "gotham-extralight";
        margin: 0;
        padding: 0;
    }
    
    /*default colors*/
    :root{
        --white: #FFFFF;
        --main-blue: #1070FF;
        --gray: #787878;
    }
`