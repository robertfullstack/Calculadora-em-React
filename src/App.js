import React, { useState } from "react";
import "./Efeito.css"

export default function App() {

  const [sizeScreen, setSizeScreen] = useState('')
  const [result, setResult] = useState(0)
  const [accumulator, setAccumulator] = useState(0)
  const [operated, setOperated] = useState(false)

  // Componentes
  const screenA = (size, result) => {
    return (
      <div style={screenCSS}>
        <span style={screenOperation}>{size}</span>
        <span style={screenResult}>{result}</span>
      </div>
    )
  }
  const btn = (label, onClick) => {
    return (
      <button style={btnCSS} onClick={onClick}>{label}</button>
    )
  }

  //Funções
  const addDigitScreen = (d) => {
    if ((d == '+' || d == '-' || d == '*' || d == '/') && operated) {
      console.log("+-*/")
      setOperated(false)
      setSizeScreen(result + d)
      return
    }
    if (operated) {
      setSizeScreen(d)
      setOperated(false)
      return
    }
    const valueDigit = sizeScreen + d
    setSizeScreen(valueDigit)
  }
  const cleanDigit = () => {
    setOperated(false)
    setSizeScreen('')
    setResult(0)
    setAccumulator(0)
    return
  }
  const operation = (op) => {
    if (op == 'clenLast') {
      let vScreen = sizeScreen
      vScreen = vScreen.substring(0, (vScreen.length - 1))
      setSizeScreen(vScreen)
      setOperated(false)
      return
    }
    try {
      const r = eval(sizeScreen) // Cálculo automático - JavaScript função Eval
      setAccumulator(r)
      setResult(r)
      setOperated(true)
    } catch {
      setResult('Erro de Expressão')
    }
  }

  // Styles - CSS
  const containerCSS = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '0px',
    width: 400,
    border: '1px solid white',
    borderRadius: '1px'
  }
  const btnColumnCSS = {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
  const screenCSS = {
    display: 'flex',
    padding: '5px 20px',
    marginBottom: '1px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#444',
    flexDirection: 'column',
    width: 360
  }
  const screenOperation = {
    fontSize: 25,
    color: '#fff',
    height: 20,
  }
  const screenResult = {
    fontSize: 50,
    color: '#fff'
  }
  const btnCSS = {
    fontSize: 30,
    width: 100,
    height: 100,
    padding: 20,
    color: '#fff',
    borderColor: '#000',
    textAlign: 'center',
    outLine: 'none'
  }

  return (
    <>
      <div style={containerCSS}>
        <h3 style={{ color: 'white' }}>Calculadora Matemática Simples</h3>
        {screenA(sizeScreen, result)}
        <div style={btnColumnCSS} className='efeito'>
          {btn('AC', cleanDigit)}
          {btn('(', () => addDigitScreen('('))}
          {btn(')', () => addDigitScreen(')'))}
          {btn('/', () => addDigitScreen('/'))}
          {btn('7', () => addDigitScreen('7'))}
          {btn('8', () => addDigitScreen('8'))}
          {btn('9', () => addDigitScreen('9'))}
          {btn('*', () => addDigitScreen('*'))}
          {btn('4', () => addDigitScreen('4'))}
          {btn('5', () => addDigitScreen('5'))}
          {btn('6', () => addDigitScreen('6'))}
          {btn('-', () => addDigitScreen('-'))}
          {btn('1', () => addDigitScreen('1'))}
          {btn('2', () => addDigitScreen('2'))}
          {btn('3', () => addDigitScreen('3'))}
          {btn('+', () => addDigitScreen('+'))}
          {btn('0', () => addDigitScreen('0'))}
          {btn('.', () => addDigitScreen('.'))}
          {btn('<', () => operation('clenLast'))}
          {btn('=', () => operation('='))}
        </div>
      </div>
    </>
  )
}