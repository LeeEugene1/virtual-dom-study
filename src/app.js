/* @jsx createElement */
import { render, createElement, Component } from './react';//제약사항: 런타임에러때문에 항상 리엑트를 임포트하듯이 createElement를 사용해야함

//클래스 컴포넌트
class Title extends Component{
    render(){
        return <h1>{this.props.children}</h1>
    }
}
//함수 컴포넌트
function Item(props){
    return <li style={`color:${props.color}`}>{props.children}</li>
}
const vdom = <p>
    <Title>React</Title>
    <ul>
        <Item color="red">첫번째</Item>
        <Item color="blue">두번째</Item>
        <Item color="green">세번째</Item>
    </ul>
</p>

render(vdom, document.querySelector('#root'));