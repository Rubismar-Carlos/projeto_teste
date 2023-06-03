'use client'
import { useState } from "react"

import styles from './page.module.css'

export default function Conversor() {
    const [number, setNumber] = useState("")
    const [romanNumeral, setRomanNumeral] = useState("")
    const [msg, setMsg] = useState("")
    const [numberCheck, setNumberCheck] = useState(false)

    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }

    const convertToRomanNumeral = () => {

      setTimeout(() => {
        setMsg("")
      }, 2000)

      setNumberCheck(true)

      if(number === ""){ 
        return setMsg("Digite o número que queira converter")
      }

    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ]

    let num = parseInt(number)
    let result = ''

    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].symbol;
        num -= romanNumerals[i].value;
      }
    }

    setRomanNumeral(result)
    }

    return <div>
        <div className={styles.container}>
          <h2>Conversor de números <br /> romanos</h2>
          <div className={styles.box_input}>
            <input type="number" value={number} max={"3999"} pattern="[0-3]?[0-9]{1,3}" maxLength={4} onChange={handleNumberChange}  placeholder="Digite o número para conversão"/>
            <button onClick={convertToRomanNumeral} className={styles.btn}>Converter</button>
          </div>
          <p>{msg}</p>
          {numberCheck !== false && <p>Números Convertidos: {romanNumeral}</p>}
      </div>
    </div>
}