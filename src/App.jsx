import React, { Component } from 'react';
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar'; // Ensure the correct path
import News from './components/News'; // Ensure the correct path

class App extends Component {
  page = 7 ;
  state = {
    progress : 0
  } ;
  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <div>
            <LoadingBar color="#f11946" height={3} progress={this.state.progress} />
          </div>    
        <Routes>
          <Route path='/' element={<News setProgress={this.setProgress} key="general" category="general" pageSize={this.page} country="us"/>}/>
          <Route path='/business' element={<News setProgress={this.setProgress}key="business" category="business" pageSize={this.page} country="us"/>}/>
          <Route path='/entertainment' setProgress={this.setProgress} element={<News key="entertainment" category="entertainment" pageSize={this.page} country="us" />}/>
          <Route path='/sports' element={<News setProgress={this.setProgress} key="sports" category="sports" pageSize={this.page} country="us"/>}/>
          <Route path='/science' element={<News setProgress={this.setProgress} key="science" category="science" pageSize={this.page} country="us"/>}/>
          <Route path='/health' element={<News setProgress={this.setProgress} key="health" category="health" pageSize={this.page} country="us"/>}/>
          <Route path='/technology' element={<News setProgress={this.setProgress} key="technology" category="technology" pageSize={this.page} country="us"/>}/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;

