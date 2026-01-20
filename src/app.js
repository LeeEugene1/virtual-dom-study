/* @jsx createElement */
import { render, createElement, Component } from './react';//제약사항: 런타임에러때문에 항상 리엑트를 임포트하듯이 createElement를 사용해야함

//클래스 컴포넌트
class Title extends Component{
    render(){
        return <h1>{this.props.children}</h1>
    }
}

let count = 0;

function handleClick() {
  count += 1;
  render(getVdom(), document.querySelector('#root'));
}

function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}

// 함수 컴포넌트
function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>;
}

function getVdom() {
  return (
    <p>
      <Title>React</Title>
      <ul>
        <Item color="red">첫번째</Item>
        <Item color="blue">두번째</Item>
        <Item color="green">세번째</Item>
      </ul>
      <Button onClick={handleClick}>Click me</Button>
      <p>Count: {count}</p>
    </p>
  );
}

render(getVdom(), document.querySelector('#root'));