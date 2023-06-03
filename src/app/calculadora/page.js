'use client'
import { useState } from "react";

import Head from "next/head";

import styles from './page.module.css'

export default function Calculadora() {

  // Cadastro dos Clientes
  const [pessoa, setPessoa] = useState("")
  const [produto, setProduto] = useState("")
  const [valor, setValor] = useState("")

  // Salvando os dados recebedios em um array para colocarmos no front
  const [somarValor, setSomarValor] = useState([])
  const [clientes, setClientes] = useState([])

  // validações 
  const [numeroClientes, setNumeroClientes] = useState(null)
  const [dividirValor, setDividirValor] = useState("")
  const [contaPaga, setContaPaga] = useState(false)
  const [cadastroCompleto, setCadastroCompleto] = useState(false)
  const [msg, setMsg] = useState("")


  const handleAdicionarCliente = (e) => {
    e.preventDefault()

    setTimeout(() => {
      setMsg("")
    }, 2000)

    if(pessoa === "") {
      return setMsg("Forneça o nome do Cliente")
    }

    if(produto === "") {
      return setMsg("Forneça o Pedido")
    }

    if(valor === "") {
      return setMsg("Forneça o valor do item")
    }

   const novoCliente = {
    pessoa: pessoa,
    produto: produto,
    valor: valor
   }

   const novoValor = {
    valor: valor
   }

   setClientes([...clientes, novoCliente])

   setSomarValor([...somarValor, parseFloat(valor)])

    console.log(pessoa, produto, valor)

    setCadastroCompleto(true)

    setPessoa("")
    setProduto("")
    setValor("")

  }

  // calcular o valor dos items de cada cliente
  const calcularSubTotal = () => {
    const total = somarValor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total.toFixed(2);
  };

  // calcular valor da taxa de serviço de10%
  const calcularTaxa = () => {
    const subtotal = somarValor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const taxa = (subtotal * 0.1).toFixed(2);
    const total = (parseFloat(taxa)).toFixed(2);
    return total;
  }

  // Calcular o valor dor items com o valor da taxa
  const calcularTaxaeValor = () => {
    const subTotal = somarValor.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const taxa = (subTotal * 0.1).toFixed(2)
    const total = (subTotal + parseFloat(taxa)).toFixed(2)
    return total;
  }

  // calcular e dividir o valor por x clientes
  const handleDividirValor = () => {
    const total = parseFloat(calcularTaxaeValor());
    const valorPorCliente = (total / numeroClientes).toFixed(2);
    console.log("Valor por Cliente: R$", valorPorCliente);
    setDividirValor(valorPorCliente)
  };

  // botao de conta paga, so clicar nele quando a conta realmente foi paga
  const handleContaPaga = (e) => {
    

    setTimeout(() => {
      setCadastroCompleto(false)
      setDividirValor("")
      setClientes("")
      setSomarValor("")
      setContaPaga(false)
    }, 2000)

    setContaPaga(!contaPaga)

  }

    return (
    <div>
      <Head>
        <title>Projeto | Pedidos</title>
      </Head>
      <div className={styles.box_form}>
        <form>
        <p>Cadastre todos os dados pedidos para poder ver a conta.</p>
          <label>
            <input type="text" value={pessoa} onChange={(e) => setPessoa(e.target.value)} placeholder="Nome da pessoa" required />
          </label>
          <label>
            <input type="text" value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Comida" required/>
          </label>
          <label>
            <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" required/>
          </label>
          <p>{msg}</p>
          <button className={styles.btn} onClick={handleAdicionarCliente}>Cadastrar</button>
        </form>
      </div>
      {cadastroCompleto !== false && 
        <div className={styles.tabela_menu}>
          <table>
            <thead>
              <tr>
                <td>Cliente</td>
                <td>Produto</td>
                <td>Valor</td>
              </tr>
            </thead>
            {clientes.map((cl, index) => (
              <tbody key={index}>
                <tr>
                  <td>{cl.pessoa}</td>
                  <td>{cl.produto}</td>
                  <td>{cl.valor}</td>
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td>Sub-Total</td>
                <td></td>
                <td>{calcularSubTotal()}</td>
              </tr>
              <tr>
                <td>Taxa de 10%</td>
                <td></td>
                <td>{calcularTaxa()}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td>{calcularTaxaeValor()}</td>
              </tr>
            </tfoot>
          </table>
          {/* a Div conta paga so vai aparecer apos o click no botão de conta paga*/}
          <div className={`${contaPaga ? `${styles.conta_paga}` : `${styles.conta_naopaga}`}`}>
            <h2>Conta Paga</h2>
          </div>
          <div className={styles.box_dividir}>
            <input type="number" value={numeroClientes} onChange={(e) => setNumeroClientes(e.target.value)} placeholder="Quantidade de cliente" />
            <button onClick={handleDividirValor} className={styles.btn}>Dividir Valor</button>
            {dividirValor !== "" && <p>Valor Dividido: R${dividirValor}</p>}
          </div>
          <p>Clique no botão após o pagamento!</p>
          <button onClick={handleContaPaga} className={styles.btn}>Conta paga</button>
        </div>}
    </div>
)} 