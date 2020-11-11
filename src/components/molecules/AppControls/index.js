import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./style.css";

import Button from "../../atoms/Button";
import Menu from "../../molecules/Menu";

const AppControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange,
}) => {
  return (
    <Fragment>
      <Menu
        placeholder="Algoritmos de Ordenação"
        items={["Merge Sort", "Quick Sort", "Heap Sort"]}
        selected={algorithm}
        onSelect={onAlgorithmChange}
      />

      <div className="AppControls__Size">
        <span>Tamanho</span>
        <Menu
          placeholder="Array Size"
          items={["100", "250", "500"]}
          selected={String(arraySize)}
          onSelect={onArraySizeChange}
        />
      </div>

      <Button onClick={onGenerateRandomArray}>Randomizar</Button>
    </Fragment>
  );
};

AppControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default AppControls;
