import { render } from './react';

const vdom = {
    tag:'p',
    props:{},
    children:[
        {
            tag:'h1',
            props:{},
            children:["react 만들기"],
        },
        {
            tag:'ul',
            props:{},
            children:[
                {
                    tag:'li',
                    props:{
                        style: "color:red",
                    },
                    children:[
                        '첫번쨰'
                    ]
                },
                {
                    tag:'li',
                    props:{
                        style: "color:blue",
                    },
                    children:[
                        '두번쨰'
                    ]
                },
                {
                    tag:'li',
                    props:{
                        style: "color:green",
                    },
                    children:[
                        '세번쨰'
                    ]
                }
            ]
        }
    ]
}

render(vdom, document.querySelector('#root'));