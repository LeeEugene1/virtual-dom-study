import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h
  } from "snabbdom";
  
export class Component{
    constructor(props){
        this.props = props;
    }
}

export function createDom(node){
    if(typeof node === 'string'){
        return document.createTextNode(node);
    }

   const element = document.createElement(node.tag)
   
   Object.entries(node.props).forEach(([name, value]) => {
    element.setAttribute(name, value);
   });

   node.children.map(createDom).forEach(element.appendChild.bind(element));
   return element;
}


export const render = (function () {
    const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
    let prevVNode = null;
    return function (vdom, container) {
        if (prevVNode) {
            prevVNode = patch(prevVNode, vdom);
        } else {
            prevVNode = patch(container, vdom);
        }
    };
})();

function makeProps(props, children){
    return {
        ...props,
        children: children.length === 1 ? children[0] : children
    }
}

export function createElement(tag, props, ...children){
    props = props || {};//@jsx가 빈객체를 null로 변환해 에러 발생하므로 빈객체로 변환
	
    if(typeof tag === 'function'){
        //클래스 컴포넌트
        if(tag.prototype instanceof Component){
            const instance = new tag(makeProps(props, children));
            return instance.render();
        }else{
            //함수 컴포넌트
            if(children.length > 0){
                return tag(makeProps(props, children));
            }else{
                return tag(props);
            }
        }
        
    } else {
        // 스타일 문자열을 객체로 변환 (예: "color:red;background:blue")
        let newProps = { ...props };
        if (newProps && typeof newProps.style === 'string') {
            const styleObj = {};
            newProps.style.split(';').filter(Boolean).forEach(rule => {
                const [k, v] = rule.split(':');
                if (k && v) styleObj[k.trim()] = v.trim();
            });
            newProps.style = styleObj;
        }
        Object.keys(newProps).forEach(key => {
            if (/^on[A-Z]/.test(key)) {
                const event = key.slice(2).toLowerCase();
                const fn = newProps[key];
                delete newProps[key];
                newProps.on = { ...(newProps.on || {}), [event]: fn };
            }
        });
        const flatChildren = [].concat(...children);
        return h(tag, newProps, flatChildren);
    }
    
}