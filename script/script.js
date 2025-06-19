const sheetId = '1Hqth_IwtnA-NG66xx58owjtBwUMuHEShrUWuI5h1wUw';

const gid1 = '847253010';

fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid1}`)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const anos = [];
        const transplantes = [];

        const headerRow = rows[0].c;
        const dataRow = rows[1].c;

        for (let i = 1; i < headerRow.length; i++) { 
            const ano = headerRow[i]?.v;
            const total = dataRow[i]?.v;

            if (ano && total) {
                anos.push(String(ano)); 
                transplantes.push(Number(total));
            }
        }

        const ctx1 = document.getElementById('chart1').getContext('2d');
        const loadingChart1 = document.getElementById('loading-chart1');
        const chart1Canvas = document.getElementById('chart1');

        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: anos,
                datasets: [{
                    label: 'Número de Transplantes de Coração',
                    data: transplantes,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(255, 99, 132)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'Transplantes de Coração por Ano no Brasil'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                        display: true,
                        text: 'Quantidade de Transplantes'
                        }
                    },
                    x: {
                        title: {
                        display: true,
                        text: 'Ano'
                        }
                    }
                }
            }
        });

        loadingChart1.style.display = 'none';
        chart1Canvas.style.display = 'block';
    })
    .catch(err => {
        console.error('Erro ao carregar os dados da planilha (Chart 1):', err);
        const loadingChart1 = document.getElementById('loading-chart1');
        if (loadingChart1) {
            loadingChart1.textContent = 'Erro ao carregar dados do gráfico 1.';
            loadingChart1.style.color = 'red';
        }
    });

const gid2 = '1808648066'; 

fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid2}`)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const anos = [];
    const pacientesTotal = [];
    const mortesTotal = [];
    const pacientesPediatricos = [];
    const mortesPediatrico = [];
    const percentualFalecimentoBrasil = [];
    const percentualMortalidadePediatrico = [];

    const rowIndexPacientesTotal = 3;
    const rowIndexMortesTotal = 4;
    const rowIndexPacientesPediatricos = 7;
    const rowIndexMortesPediatrico = 8;
    const rowIndexPercFalecimentoBrasil = 9;
    const rowIndexPercMortalidadePediatrico = 10;

    for (let i = 7; i >= 1; i--) { 
        const ano = 2015 + (7 - i); 
        anos.push(String(ano));
        pacientesTotal.push(rows[rowIndexPacientesTotal].c[i]?.v || 0);
        mortesTotal.push(rows[rowIndexMortesTotal].c[i]?.v || 0);
        pacientesPediatricos.push(rows[rowIndexPacientesPediatricos].c[i]?.v || 0);
        mortesPediatrico.push(rows[rowIndexMortesPediatrico].c[i]?.v || 0);
        percentualFalecimentoBrasil.push(rows[rowIndexPercFalecimentoBrasil].c[i]?.v || 0);
        percentualMortalidadePediatrico.push(rows[rowIndexPercMortalidadePediatrico].c[i]?.v || 0);
    }

    const ctx2 = document.getElementById('chart2').getContext('2d');
    const loadingChart2 = document.getElementById('loading-chart2');
    const chart2Canvas = document.getElementById('chart2');

    new Chart(ctx2, {
        type: 'scatter',
        data: {
            labels: anos,
            datasets: [
                {
                    label: 'Pacientes Total',
                    data: pacientesTotal.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                },
                {
                    label: 'Mortes Total',
                    data: mortesTotal.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5
                },
                {
                    label: 'Pacientes Pediátricos',
                    data: pacientesPediatricos.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'gray',
                    backgroundColor: 'gray',
                    pointRadius: 5
                },
                {
                    label: 'Mortes Pediátrico',
                    data: mortesPediatrico.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'yellow',
                    backgroundColor: 'yellow',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curva de Pacientes na Lista de Espera de 2015 a 2021'
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Ano de Referência'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Pacientes'
                    }
                }
            }
        }
    });

    loadingChart2.style.display = 'none';
    chart2Canvas.style.display = 'block';

    const ctx3 = document.getElementById('chart3').getContext('2d');
    const loadingChart3 = document.getElementById('loading-chart3');
    const chart3Canvas = document.getElementById('chart3');

    new Chart(ctx3, {
        type: 'scatter',
        data: {
            labels: anos,
            datasets: [
                {
                    label: 'Porcentagem de Falecimento na Lista de Espera Brasil',
                    data: percentualFalecimentoBrasil.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                },
                {
                    label: 'Porcentagem de Mortalidade Pediátrico',
                    data: percentualMortalidadePediatrico.map((data, index) => ({ x: anos[index], y: data })),
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curva de Mortalidade da Lista de Espera de 2015 a 2021'
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Ano de Referência'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentagem de Mortes (%)'
                    }
                }
            }
        }
    });

    loadingChart3.style.display = 'none';
    chart3Canvas.style.display = 'block';

  })
  .catch(err => {
    console.error('Erro ao carregar os dados da planilha (Novos Gráficos):', err);
    const loadingChart2 = document.getElementById('loading-chart2');
    if (loadingChart2) {
        loadingChart2.textContent = 'Erro ao carregar dados do gráfico 2.';
        loadingChart2.style.color = 'red';
    }
    const loadingChart3 = document.getElementById('loading-chart3');
    if (loadingChart3) {
        loadingChart3.textContent = 'Erro ao carregar dados do gráfico 3.';
        loadingChart3.style.color = 'red';
    }
  });


  const gid3 = '1872058242'; 

fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid3}`)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const anosEUA = [];
    const pacientesListaEsperaEUA = [];
    const falecimentoListaEsperaEUA = [];
    const comDavListaEsperaEUA = [];
    const porcentagemMortesEUA = [];

    const rowIndexAnoReferencia = 0; 
    const rowIndexPacientesListaEspera = 1;
    const rowIndexFalecimentoListaEspera = 2;
    const rowIndexComDavListaEspera = 5;
    const rowIndexPorcentagemMortes = 8;

    for (let i = 1; i <= 8; i++) {
        anosEUA.push(rows[rowIndexAnoReferencia].c[i]?.v);
        pacientesListaEsperaEUA.push(rows[rowIndexPacientesListaEspera].c[i]?.v || 0);
        falecimentoListaEsperaEUA.push(rows[rowIndexFalecimentoListaEspera].c[i]?.v || 0);
        comDavListaEsperaEUA.push(rows[rowIndexComDavListaEspera].c[i]?.v || 0);
        porcentagemMortesEUA.push(rows[rowIndexPorcentagemMortes].c[i]?.v || 0);
    }

    const ctx4 = document.getElementById('chart4').getContext('2d');
    const loadingChart4 = document.getElementById('loading-chart4');
    const chart4Canvas = document.getElementById('chart4');

    new Chart(ctx4, {
        type: 'scatter',
        data: {
            labels: anosEUA,
            datasets: [
                {
                    label: 'Pacientes na lista de espera',
                    data: pacientesListaEsperaEUA.map((data, index) => ({ x: anosEUA[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                },
                {
                    label: 'Falecimento na lista de espera',
                    data: falecimentoListaEsperaEUA.map((data, index) => ({ x: anosEUA[index], y: data })),
                    borderColor: 'gray',
                    backgroundColor: 'gray',
                    pointRadius: 5
                },
                {
                    label: 'Com DAV na lista de espera',
                    data: comDavListaEsperaEUA.map((data, index) => ({ x: anosEUA[index], y: data })),
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curva de Número de Pacientes por Ano (EUA)'
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Ano de Referência'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Pacientes'
                    }
                }
            }
        }
    });

    loadingChart4.style.display = 'none';
    chart4Canvas.style.display = 'block';

    const ctx5 = document.getElementById('chart5').getContext('2d');
    const loadingChart5 = document.getElementById('loading-chart5');
    const chart5Canvas = document.getElementById('chart5');

    new Chart(ctx5, {
        type: 'scatter',
        data: {
            labels: anosEUA,
            datasets: [
                {
                    label: 'Porcentagem de Mortes na Lista de Espera',
                    data: porcentagemMortesEUA.map((data, index) => ({ x: anosEUA[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curva de Mortalidade na lista de espera 2013 a 2020 (EUA)'
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Ano de Referência'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentagem de Mortes (%)'
                    }
                }
            }
        }
    });

    loadingChart5.style.display = 'none';
    chart5Canvas.style.display = 'block';

  })
  .catch(err => {
    console.error('Erro ao carregar os dados da planilha (Novos Gráficos EUA):', err);
    const loadingChart4 = document.getElementById('loading-chart4');
    if (loadingChart4) {
        loadingChart4.textContent = 'Erro ao carregar dados do gráfico 4.';
        loadingChart4.style.color = 'red';
    }
    const loadingChart5 = document.getElementById('loading-chart5');
    if (loadingChart5) {
        loadingChart5.textContent = 'Erro ao carregar dados do gráfico 5.';
        loadingChart5.style.color = 'red';
    }
  });

const gid4 = '372243698'; 

fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid4}`)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const anosChart6 = []; 
    const totalPatients = []; 
    const totalDeaths = []; 

    const rowIndexTotalPatients = 3; 
    const rowIndexTotalDeaths = 4;   

    
    for (let i = 7; i >= 1; i--) { 
        const ano = 2015 + (7 - i); 
        anosChart6.push(String(ano));
        totalPatients.push(rows[rowIndexTotalPatients].c[i]?.v || 0);
        totalDeaths.push(rows[rowIndexTotalDeaths].c[i]?.v || 0);
    }

    const ctx6 = document.getElementById('chart6').getContext('2d');
    const loadingChart6 = document.getElementById('loading-chart6');
    const chart6Canvas = document.getElementById('chart6');

    new Chart(ctx6, {
        type: 'scatter', 
        data: {
            labels: anosChart6, 
            datasets: [
                {
                    label: 'Total Patients',
                    data: totalPatients.map((data, index) => ({ x: anosChart6[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                },
                {
                    label: 'Total Deaths',
                    data: totalDeaths.map((data, index) => ({ x: anosChart6[index], y: data })),
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curve of Patients on the Waiting List from 2015 to 2021 in Brazil' 
                }
            },
            scales: {
                x: {
                    type: 'category', 
                    title: {
                        display: true,
                        text: 'Reference Year' 
                    }
                },
                y: {
                    type: 'linear', 
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients' 
                    }
                }
            }
        }
    });

    loadingChart6.style.display = 'none';
    chart6Canvas.style.display = 'block';

  })
  .catch(err => {
    console.error('Erro ao carregar os dados da planilha (Gráfico Brasil - Aba 4):', err);
    const loadingChart6 = document.getElementById('loading-chart6');
    if (loadingChart6) {
        loadingChart6.textContent = 'Erro ao carregar dados do gráfico 6.';
        loadingChart6.style.color = 'red';
    }
  });

const gid5 = '1328387618'; 

fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid5}`)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const anosG5 = []; 
    const patientsWaitingList = [];
    const deathWaitingList = [];
    const heartTransplantOnly = [];
    const percentageDeathsWaitingList = []; 

    const rowIndexReferenceYear = 0;
    const rowIndexPatientsWaitingList = 1;
    const rowIndexDeathWaitingList = 2;
    const rowIndexHeartTransplantOnly = 3;

    const startYearG5 = 2013;

    for (let i = 1; i <= 8; i++) { 
        const ano = startYearG5 + (i - 1); 
        anosG5.push(String(ano));

        const patients = Number(rows[rowIndexPatientsWaitingList].c[i]?.v) || 0;
        const deaths = Number(rows[rowIndexDeathWaitingList].c[i]?.v) || 0;
        
        patientsWaitingList.push(patients);
        deathWaitingList.push(deaths);
        heartTransplantOnly.push(Number(rows[rowIndexHeartTransplantOnly].c[i]?.v) || 0);
        
        if (patients > 0) {
            percentageDeathsWaitingList.push((deaths / patients) * 100);
        } else {
            percentageDeathsWaitingList.push(0);
        }
    }

    const ctx7 = document.getElementById('chart7').getContext('2d');
    const loadingChart7 = document.getElementById('loading-chart7');
    const chart7Canvas = document.getElementById('chart7');

    new Chart(ctx7, {
        type: 'scatter',
        data: {
            labels: anosG5,
            datasets: [
                {
                    label: 'Patients on the waiting list',
                    data: patientsWaitingList.map((data, index) => ({ x: anosG5[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                },
                {
                    label: 'Death on the waiting list',
                    data: deathWaitingList.map((data, index) => ({ x: anosG5[index], y: data })),
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Curve of Number of Patients per Year (2013-2020)' // Adicionado o range de anos para clareza
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Reference Year'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                }
            }
        }
    });

    loadingChart7.style.display = 'none';
    chart7Canvas.style.display = 'block';

    const ctx8 = document.getElementById('chart8').getContext('2d');
    const loadingChart8 = document.getElementById('loading-chart8');
    const chart8Canvas = document.getElementById('chart8');

    new Chart(ctx8, {
        type: 'scatter',
        data: {
            labels: anosG5,
            datasets: [
                {
                    label: 'Heart Transplant (heart only)',
                    data: heartTransplantOnly.map((data, index) => ({ x: anosG5[index], y: data })),
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Heart Transplants per Year (2013-2020)' 
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Reference Year'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                }
            }
        }
    });

    loadingChart8.style.display = 'none';
    chart8Canvas.style.display = 'block';
  });