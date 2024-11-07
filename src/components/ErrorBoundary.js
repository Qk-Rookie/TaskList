import React, { Component } from 'react';

//创建一个错误边界组件
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    //定义一个状态，控制是否有错误发生
    this.state = { hasError: false };
  }

    //当子组件发生错误时，会调用这个方法
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

    //捕获到错误后立即被调用
  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

    //渲染错误提示组件
  render() {
    if (this.state.hasError) {
      return <h1 style={{textAlign:"center"}} >Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;