import React, { Component } from "react";
import "./App.css";

import AppControls from "./components/molecules/AppControls";
import TopBar from "./components/organisms/TopBar";
import AppDrawer from "./components/organisms/AppDrawer";
import SortVisualizer from "./components/organisms/SortVisualizer";

import MergeSort, { MergeSortKey } from "./algorithms/MergeSort";
import QuickSort, { QuickSortKey } from "./algorithms/QuickSort";

import HeapSort, { HeapSortKey } from "./algorithms/HeapSort";

class App extends Component {
  state = {
    darkMode: false,
    array: [],
    arraySize: 100,
    trace: [],
    algorithm: null,
    appDrawerOpen: false,
  };

  ALGORITHM = {
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Heap Sort": HeapSort,
  };

  ALGORITHM_KEY = {
    "Merge Sort": MergeSortKey,
    "Quick Sort": QuickSortKey,
    "Heap Sort": HeapSortKey,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    const array = Array(this.state.arraySize)
      .fill(0)
      .map(() => getRandomInt(this.state.arraySize * 5));

    this.setState(
      {
        array,
        trace: [],
      },
      this.createTrace
    );
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ algorithm }, this.generateRandomArray);
  };

  handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 500 ? 500 : size;
    size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray);
  };

  createTrace = () => {
    const numbers = [...this.state.array];
    const sort = this.ALGORITHM[this.state.algorithm];
    if (sort) {
      const trace = sort(numbers);
      this.setState({ trace });
    }
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  toggleAppDrawer = () => {
    this.setState((prevState) => ({
      appDrawerOpen: !prevState.appDrawerOpen,
    }));
  };

  render() {
    let theme = `App`;

    if (this.state.appDrawerOpen) theme += ` App_modal_open`;

    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];

    const controls = (
      <AppControls
        onGenerateRandomArray={this.generateRandomArray}
        algorithm={this.state.algorithm}
        onAlgorithmChange={this.handleAlgorithmChange}
        arraySize={this.state.arraySize}
        onArraySizeChange={this.handleArraySizeChange}
        onToggleDarkMode={this.toggleDarkMode}
        darkMode={this.state.darkMode}
      />
    );

    return (
      <div className={theme}>
        <TopBar
          drawerOpen={this.state.appDrawerOpen}
          toggleDrawer={this.toggleAppDrawer}
        >
          {controls}
        </TopBar>

        <AppDrawer
          open={this.state.appDrawerOpen}
          closeDrawer={this.toggleAppDrawer}
        >
          {controls}
        </AppDrawer>

        <main className="App__Body">
          <SortVisualizer
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
          />
        </main>
      </div>
    );
  }
}

export default App;
