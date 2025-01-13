import { useState, useEffect } from "react";
import { db } from "../../services/database"; // Banco de dados local
import ComponenteNavBar from "../../components/navBar";

interface Produto {
  nome: string;
  preco: number;
}

export function Balcao() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [total, setTotal] = useState(0);
  const [historico, setHistorico] = useState<
    { id: number; produtos: string[]; total: number; data: string }[]
  >([]);

  // Adicionar produto ao pedido
  function adicionarProduto(produto: Produto) {
    setProdutos([...produtos, produto]);
    setTotal(total + produto.preco);
  }

  // Finalizar venda e salvar no banco de dados
  async function finalizarVenda() {
    const novaVenda = {
      id: Date.now(), // Generate a unique id
      produtos: produtos.map((p) => p.nome),
      total,
      data: new Date().toISOString(),
    };
    await db.vendas.add(novaVenda); // Salva no banco
    setProdutos([]);
    setTotal(0);
    carregarHistorico(); // Atualiza o histórico
  }

  // Carregar histórico de vendas
  async function carregarHistorico() {
    const vendas = await db.vendas.toArray();
    const historicoFormatado = vendas.map((venda) => ({
      id: venda.id || 0, // Garante que o id seja sempre um número
      produtos: venda.produtos,
      total: venda.total,
      data: venda.data,
    }));
    setHistorico(historicoFormatado);
  }

  // Carrega o histórico ao carregar a página
  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <div>
      <ComponenteNavBar section="Balcão"/>
      <h1>Atendimento por Balcão</h1>

      <div>
        <button onClick={() => adicionarProduto({ nome: "Sorvete", preco: 5 })}>
          Adicionar Sorvete (R$5)
        </button>
        <button
          onClick={() => adicionarProduto({ nome: "Refrigerante", preco: 3 })}
        >
          Adicionar Refrigerante (R$3)
        </button>
      </div>

      <div>
        <h2>Pedido Atual</h2>
        <ul>
          {produtos.map((p, i) => (
            <li key={i}>
              {p.nome} - R${p.preco}
            </li>
          ))}
        </ul>
        <h3>Total: R${total}</h3>
        <button onClick={finalizarVenda}>Finalizar Venda</button>
      </div>

      <div>
        <h2>Histórico de Vendas</h2>
        <ul>
          {historico.map((venda) => (
            <li key={venda.id}>
              {venda.data} - Total: R${venda.total} - Produtos:{" "}
              {venda.produtos.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
