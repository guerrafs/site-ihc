// cores que achei bonitas na internet
var cores = [
    'rgba(54, 162, 235, 0.6)',   
    'rgba(255, 99, 132, 0.6)',   
    'rgba(75, 192, 192, 0.6)',   
    'rgba(255, 205, 86, 0.6)',   
    'rgba(153, 102, 255, 0.6)',  
    'rgba(255, 159, 64, 0.6)',   
    'rgba(199, 199, 199, 0.6)',  
    'rgba(83, 102, 255, 0.6)',   
    'rgba(255, 99, 255, 0.6)',   
    'rgba(99, 255, 132, 0.6)'    
  ];

  // pega cor
  function pegaCor(numero) {
    return cores[numero % cores.length];
  }

  // faz a cor da borda
  function fazCorDaBorda(corDoFundo) {
    return corDoFundo.replace('0.6', '1');
  }

  // array com os dados dos graficos (copiei os gids do google)
  var planilhas = [
    // grafico 1
    { gid: '1454563529', titulo: 'Transplantes Brasil (2009–2021)',
      idDoElemento: 'chart1', tipoDoGrafico: 'line', somenteUmDataset: true },

    // grafico 2  
    { gid: '1083333708', titulo: 'Pacientes na Lista (2015–2021)',
      idDoElemento: 'chart2', tipoDoGrafico: 'line', somenteUmDataset: false },

    // grafico 3
    { gid: '1604091063', titulo: 'Mortalidade Transplante USA (2013–2020)',
      idDoElemento: 'chart3', tipoDoGrafico: 'line', somenteUmDataset: false },

    // grafico 4
    { gid: '1488328750', titulo: 'Patient List (2015–2021)',
      idDoElemento: 'chart4', tipoDoGrafico: 'line', somenteUmDataset: false },

    // grafico 5 
    { gid: '906573690', titulo: 'Patients Year - Gráfico 1 (2013–2020)',
      idDoElemento: 'chart5', tipoDoGrafico: 'line', somenteUmDataset: false },

    // grafico 6
    { gid: '906573690', titulo: 'Patients Year - Gráfico 2 (2013–2020)',
      idDoElemento: 'chart6', tipoDoGrafico: 'line', somenteUmDataset: false },

    // grafico 7
    { gid: '1083333708', titulo: 'Mortality (2020–2015)',
      idDoElemento: 'chart7', tipoDoGrafico: 'bar', somenteUmDataset: true, inverter: true }
  ];

  // url base que copiei do google sheets
  var urlBase = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqeFn_s4sGrF3pD2eddnPW2jpObRkjnDPjKkE_BRH2gRFG-g8tW89xw48KZrSpOg';

  // funcao que monta a url do csv
  function montaUrlDoCSV(gid) {
    return urlBase + '/pub?gid=' + gid + '&single=true&output=csv';
  }

  // mostra erro quando da problema
  function mostraErro(idDoElemento, mensagem) {
    var elementoDeCarregamento = document.getElementById('loading-' + idDoElemento);
    if (elementoDeCarregamento) {
      elementoDeCarregamento.innerHTML = '<div class="error">Erro: ' + mensagem + '</div>';
    }
    console.error('Erro no ' + idDoElemento + ':', mensagem);
  }

  // esconde o loading e mostra o canvas
  function mostraGrafico(idDoElemento) {
    var elementoDeCarregamento = document.getElementById('loading-' + idDoElemento);
    var canvas = document.getElementById(idDoElemento);
    
    if (elementoDeCarregamento) {
      elementoDeCarregamento.style.display = 'none';
    }
    if (canvas) {
      canvas.style.display = 'block';
    }
  }

  // cria o grafico (funcao principal)
  function criaGrafico(config, dados) {
    try {
      console.log(config.titulo, dados); // debug pra ver se ta funcionando
      
      // verifica se tem dados
      if (!dados || dados.length === 0) {
        throw new Error('Dados vazios ou inválidos');
      }

      // pega os headers (colunas)
      var headers = Object.keys(dados[0]);
      // pega os labels (primeira coluna que eh sempre ano)
      var labels = [];
      for (var i = 0; i < dados.length; i++) {
        labels.push(dados[i][headers[0]]);
      }
      
      // se tem que inverter faz isso
      if (config.inverter) {
        labels = labels.reverse();
      }

      // array dos datasets
      var datasets = [];
      var comeco = 1; // ignora a primeira coluna que eh ano
      var fim;
      if (config.somenteUmDataset) {
        fim = 2; // so pega uma coluna alem do ano
      } else {
        fim = headers.length; // pega todas as colunas
      }
      
      // loop pra criar os datasets
      for (var i = comeco; i < fim; i++) {
        var nomeColuna = headers[i];
        if (!nomeColuna) continue; // pula se nao tem nome
        
        // pega os valores da coluna
        var valores = [];
        for (var j = 0; j < dados.length; j++) {
          var valor = parseFloat(dados[j][nomeColuna]);
          if (isNaN(valor)) {
            valores.push(0);
          } else {
            valores.push(valor);
          }
        }
        
        // inverte se precisa
        if (config.inverter) {
          valores = valores.reverse();
        }
        
        // so adiciona se tem dados validos ou se eh single dataset
        var temDadosValidos = false;
        for (var k = 0; k < valores.length; k++) {
          if (valores[k] !== 0) {
            temDadosValidos = true;
            break;
          }
        }
        
        if (config.somenteUmDataset || temDadosValidos) {
          var corDeFundo = pegaCor(i - 1);
          var corDaBorda = fazCorDaBorda(corDeFundo);
          
          // cria o objeto do dataset
          var dataset = {
            label: nomeColuna,
            data: valores,
            borderColor: corDaBorda,
            borderWidth: 2,
            fill: false
          };
          
          // configura cor de fundo se for barra
          if (config.tipoDoGrafico === 'bar') {
            dataset.backgroundColor = corDeFundo;
          } else {
            dataset.backgroundColor = 'transparent';
          }
          
          // configura tensao se for linha
          if (config.tipoDoGrafico === 'line') {
            dataset.tension = 0.3;
          } else {
            dataset.tension = 0;
          }
          
          datasets.push(dataset);
        }
      }

      // verifica se tem pelo menos um dataset
      if (datasets.length === 0) {
        throw new Error('Nenhum dataset válido encontrado');
      }

      mostraGrafico(config.idDoElemento);

      // cria o grafico usando Chart.js
      var ctx = document.getElementById(config.idDoElemento);
      var chart = new Chart(ctx.getContext('2d'), {
        type: config.tipoDoGrafico,
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15
              }
            },
            title: {
              display: true,
              text: config.titulo,
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: 20
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Ano',
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                display: false
              }
            },
            y: {
              title: {
                display: true,
                text: 'Quantidade',
                font: {
                  weight: 'bold'
                }
              },
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          layout: {
            padding: 10
          }
        }
      });

    } catch (erro) {
      console.error('Erro ao processar dados para ' + config.titulo + ':', erro);
      mostraErro(config.idDoElemento, 'Falha ao processar dados: ' + erro.message);
    }
  }

  // quando a pagina carrega executa isso
  document.addEventListener('DOMContentLoaded', function() {
    // loop pra carregar todos os graficos
    for (var i = 0; i < planilhas.length; i++) {
      var planilha = planilhas[i];
      
      // usa o PapaParse pra ler o CSV
      Papa.parse(montaUrlDoCSV(planilha.gid), {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(resultado) {
          // closure pra capturar a planilha certa
          return function(planilhaAtual) {
            return function(res) {
              if (res.errors.length) {
                mostraErro(planilhaAtual.idDoElemento, 'Falha ao processar CSV');
                return;
              }
              criaGrafico(planilhaAtual, res.data);
            };
          }(planilha);
        }(),
        error: function(planilhaAtual) {
          return function(erro) {
            mostraErro(planilhaAtual.idDoElemento, erro.message);
          };
        }(planilha)
      });
    }
  });