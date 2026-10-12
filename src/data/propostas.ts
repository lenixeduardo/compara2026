export type CandidateId = "lula" | "flavio";

export type Candidate = {
  id: CandidateId;
  nome: string;
  nomeCompleto: string;
  partido: string;
  cargo: string;
  iniciais: string;
  classes: {
    bg: string;
    bgSoft: string;
    text: string;
    border: string;
    chip: string;
    bullet: string;
  };
  bio: string;
  plano: { titulo: string; paginas: string; registro: string; url: string };
  fatos: { label: string; valor: string }[];
};

export const candidatos: Record<CandidateId, Candidate> = {
  lula: {
    id: "lula",
    nome: "Lula",
    nomeCompleto: "Luiz Inácio Lula da Silva",
    partido: "PT",
    cargo: "Presidente da República, candidato à reeleição",
    iniciais: "LS",
    classes: {
      bg: "bg-red-600",
      bgSoft: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      chip: "bg-red-100 text-red-700",
      bullet: "bg-red-500",
    },
    bio: "Disputa um quarto mandato. Seu programa é em grande medida de continuidade: boa parte do texto descreve programas em andamento (Bolsa Família, Pé-de-Meia, Agora Tem Especialistas, Novo PAC) com compromisso de ampliá-los, organizados em 13 diretrizes temáticas.",
    plano: {
      titulo: "Diretrizes para o Programa de Transformação do Brasil",
      paginas: "84 páginas",
      registro: "Registrado no TSE em 7 de agosto de 2026",
      url: "https://static.poder360.com.br/uploads/2026/08/Programa-Governo-LULA-2026.pdf",
    },
    fatos: [
      { label: "Eixo do programa", valor: "Estado indutor, combate às desigualdades, soberania" },
      { label: "1º turno (4/10/2026)", valor: "45,16% dos votos válidos" },
      { label: "Estrutura", valor: "13 diretrizes temáticas" },
    ],
  },
  flavio: {
    id: "flavio",
    nome: "Flávio Bolsonaro",
    nomeCompleto: "Flávio Nantes Bolsonaro",
    partido: "PL",
    cargo: "Senador pelo Rio de Janeiro, candidato à Presidência",
    iniciais: "FB",
    classes: {
      bg: "bg-blue-700",
      bgSoft: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-200",
      chip: "bg-blue-100 text-blue-800",
      bullet: "bg-blue-600",
    },
    bio: "Senador pelo RJ e filho de Jair Bolsonaro. Seu plano se apresenta como continuidade do governo 2019–2022, com linha liberal-conservadora: nove capítulos 'Brasil' (sem Medo, por Elas, sem Fila, Mais Barato…), corte de gastos ('Tesouraço') e um eixo transversal voltado às mulheres.",
    plano: {
      titulo: "Para o Brasil Vencer o Atraso: Diretrizes do Plano de Governo 2027-2030",
      paginas: "76 páginas",
      registro: "Divulgado em 13 de agosto de 2026 e registrado no TSE",
      url: "https://planodegoverno2026.com.br/candidatos/presidente/flavio-bolsonaro/",
    },
    fatos: [
      { label: "Eixo do programa", valor: "Estado enxuto, segurança, liberdade econômica" },
      { label: "1º turno (4/10/2026)", valor: "47,03% dos votos válidos" },
      { label: "Estrutura", valor: "9 capítulos 'Brasil'" },
    ],
  },
};

export type Origem =
  | "Plano de governo (TSE)"
  | "Declaração de campanha"
  | "Atuação no Senado"
  | "Ação de governo";

export type Proposta = {
  titulo: string;
  texto: string;
  origem: Origem;
  refs: string[];
  alerta?: string;
};

export type Categoria = {
  id: string;
  nome: string;
  iconAsset: string;
  resumo: string;
  gradiente: string;
  divergencia: number; // 1 a 5
  propostas: Record<CandidateId, Proposta[]>;
  divergencias: string[];
  lacunas: { candidato: CandidateId; texto: string; refs: string[] }[];
  perguntaChave: string;
};

export const categorias: Categoria[] = [
  {
    id: "saude",
    nome: "Saúde",
    iconAsset: "saude",
    gradiente: "from-emerald-500 to-teal-600",
    divergencia: 2,
    resumo:
      "As propostas para a saúde diferem no grau de protagonismo do setor privado e no modelo de financiamento do atendimento.",
    perguntaChave:
      "Reduzir filas pela expansão da rede pública (com parcerias) ou pela compra de capacidade ociosa do setor privado?",
    propostas: {
      lula: [
        {
          titulo: "Reduzir filas pelo Agora Tem Especialistas",
          texto:
            "Ampliar mutirões, terceiros turnos, carretas de saúde e parcerias com hospitais privados. O programa nasceu da MP 1.301/2025 e virou a Lei 15.233/2025, que permite a hospitais e planos aderentes atender pacientes do SUS em troca de renúncia fiscal, além de criar fila única nacional na Central de Regulação.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "uolSaude", "agenciaBrasilEsp"],
        },
        {
          titulo: "Expandir o Mais Médicos e a atenção primária",
          texto:
            "Continuidade e expansão do programa, com valorização da formação de especialistas em medicina de família. O governo afirma que o Mais Médicos passou de 13,7 mil para cerca de 27,3 mil profissionais entre 2022 e 2025.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "planaltoSaude", "g1Promessas"],
        },
        {
          titulo: "Farmácia Popular com exames incluídos",
          texto:
            "Manter a gratuidade (desde fev/2025 todos os itens são 100% gratuitos) e incluir exames laboratoriais e de monitoramento de doenças crônicas no programa.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "uolSaude", "g1Promessas"],
        },
        {
          titulo: "Prontuário único digital e IA no SUS",
          texto:
            "Consolidar o prontuário único do cidadão via Rede Nacional de Dados em Saúde (RNDS), com marcação de consultas e exames pelo celular, uso de IA para triagem e fila única digital por risco clínico, além de telecirurgia e cirurgia robótica.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Vacinação e produção nacional de insumos",
          texto:
            "Ampliar a cobertura vacinal com novas vacinas no calendário do SUS (dengue, VSR, HPV) e vacinação nas escolas; avançar na nacionalização de insumos farmacêuticos (IFAs) a partir da biodiversidade.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Saúde da mulher, saúde mental e saúde bucal",
          texto:
            "Reduzir a mortalidade materna com atenção específica a mulheres negras e expandir a Rede Alyne; ampliar a Rede de Atenção Psicossocial e os CAPS com foco em TEA e neurodivergências; universalizar a saúde bucal pelo Brasil Sorridente.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Contratar a rede privada em horários ociosos",
          texto:
            "Comprar exames, consultas e procedimentos de hospitais e clínicas particulares quando houver equipamentos sem uso, para zerar filas do SUS sem custo para o paciente. A campanha afirma que não há proposta de privatizar o SUS.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "uolSaude", "uolFlavio", "oeste"],
        },
        {
          titulo: "Prontuário eletrônico único e digitalização do SUS",
          texto:
            "Prontuário vinculado ao CPF e integrado ao Gov.br, interoperável entre redes pública e privada, com histórico de consultas, exames, vacinas e prescrições; uso de IA para agendamento e para identificar quem tem maior risco de adoecer.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "uolSaude"],
        },
        {
          titulo: "Corrigir a tabela SUS",
          texto:
            "Rever a remuneração paga a hospitais, santas casas e clínicas para que cubra o custo real do atendimento — apresentado no plano como parte de um 'Plano Real da Saúde', que reformula o financiamento do sistema.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "folhaDivergem"],
        },
        {
          titulo: "Remédio em casa e Farmácia Popular ampliada",
          texto:
            "Sistema de entrega domiciliar de medicamentos para idosos, pessoas com deficiência e doentes crônicos, com avisos por celular sobre horários de uso. A campanha afirma que manterá e ampliará a Farmácia Popular.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "uolFlavio", "oeste"],
        },
        {
          titulo: "Telessaúde, idosos, TEA e saúde da mulher",
          texto:
            "Ampliar telessaúde e teleatendimento por aplicativo; criar Programa de Atendimento aos Idosos e Centros de Referência em TEA; Unidades Móveis de Saúde da Mulher (inclusive fluviais) com exames para câncer, menopausa, gestação e endometriose.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "diarioPcd"],
        },
        {
          titulo: "Imunização mantida e 'padrão Einstein'",
          texto:
            "O plano prevê manter a imunização e incentivar a produção nacional de vacinas, sob o argumento de que 'prevenir é mais barato do que tratar tarde'. Na campanha, Flávio anunciou o médico Claudio Lottenberg para o Ministério da Saúde, dizendo querer 'um SUS com padrão Einstein'.",
          origem: "Declaração de campanha",
          refs: ["planoFlavio", "folhaDivergem", "g1Sabatina"],
        },
      ],
    },
    divergencias: [
      "Protagonismo privado: contratação sistemática de capacidade ociosa privada (Flávio) × expansão da rede pública com parcerias pontuais (Lula).",
      "Mais Médicos: expansão explícita no plano de Lula; o programa não aparece no plano de Flávio.",
      "Financiamento: correção da tabela SUS como eixo central (Flávio) × ampliação de equipamentos, bolsas e rede própria (Lula).",
    ],
    lacunas: [
      {
        candidato: "flavio",
        texto: "O plano não detalha custos nem fontes de financiamento das medidas anunciadas na saúde.",
        refs: ["g1Sabatina"],
      },
    ],
  },
  {
    id: "educacao",
    nome: "Educação",
    iconAsset: "educacao",
    gradiente: "from-indigo-500 to-violet-600",
    divergencia: 4,
    resumo:
      "Os dois valorizam ensino técnico e tecnologia, mas divergem sobre prioridades pedagógicas e sobre o destino do dinheiro público: expansão da rede pública e permanência estudantil, de um lado; método fônico, escolas cívico-militares e vouchers, de outro.",
    perguntaChave: "Ampliar e financiar a rede pública ou dar ao aluno um voucher para escolher onde estudar?",
    propostas: {
      lula: [
        {
          titulo: "Alfabetização na idade certa com meta",
          texto: "Cumprir a meta de 80% das crianças alfabetizadas na idade adequada.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Pé-de-Meia e permanência no ensino médio",
          texto:
            "Fortalecer o Pé-de-Meia, que paga valores a estudantes que permanecem no ensino médio, e ampliar a atratividade da etapa com expansão do ensino técnico-profissionalizante.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Educação em tempo integral como prioridade",
          texto:
            "Expandir a educação básica pública em tempo integral — o programa afirma que esse fomento terá 'absoluta prioridade' — e assegurar acesso universal à educação infantil, com ampliação de creches.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "poder360"],
        },
        {
          titulo: "Novo ciclo de expansão da rede federal",
          texto:
            "Expandir a rede de Institutos Federais e promover novo ciclo de expansão da rede federal de ensino superior, além da universalização da conectividade escolar.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Qualificação continuada e MEC Idiomas",
          texto:
            "Promover qualificação profissional e formação continuada ao longo da vida no mercado de trabalho e incluir novas línguas no programa MEC Idiomas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Alfabetização pelo método fônico",
          texto:
            "Priorizar o método fônico como política nacional de alfabetização, apresentado no capítulo 'Brasil que Prepara'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "pleno"],
        },
        {
          titulo: "Vouchers educacionais",
          texto:
            "Criar voucher para matrícula em escolas particulares nos locais onde faltarem vagas na rede pública.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "pleno"],
        },
        {
          titulo: "Ampliar escolas cívico-militares",
          texto:
            "Expandir o modelo cívico-militar e adotar gestão escolar baseada em resultados, com uma educação declarada 'livre de doutrinação político-partidária'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "pleno"],
        },
        {
          titulo: "Programa Acolher: reforço entre alunos",
          texto:
            "Alunos de melhor desempenho passam a ser remunerados para dar aulas de reforço aos colegas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas"],
        },
        {
          titulo: "Empréstimo contingente à renda",
          texto:
            "Novo modelo de financiamento do ensino superior em que o estudante só começa a pagar a dívida depois de formado e empregado; o plano também prevê pagar instituições que formem 'profissionais que o país precisa'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas"],
        },
        {
          titulo: "Creches integrais, tecnologia e esporte",
          texto:
            "Ampliar a oferta de creches em período integral (com voucher-creche quando faltarem vagas), levar robótica, computadores, tablets e internet às escolas e criar o Escola de Campeões, com PPPs para esporte competitivo.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "pleno"],
        },
      ],
    },
    divergencias: [
      "Voucher para escolas privadas (Flávio) × expansão e financiamento da rede pública (Lula).",
      "Escolas cívico-militares e 'educação sem doutrinação' (Flávio) × tempo integral e expansão da rede federal (Lula).",
      "Ensino superior: empréstimo contingente à renda (Flávio) × novo ciclo de expansão da rede federal e ações afirmativas (Lula).",
    ],
    lacunas: [],
  },
  {
    id: "trabalho",
    nome: "Trabalho e renda",
    iconAsset: "trabalho",
    gradiente: "from-amber-500 to-orange-600",
    divergencia: 5,
    resumo:
      "Um dos pontos de maior contraste. Lula propõe ampliar direitos (fim da 6x1, 40 horas, regulação de apps); Flávio propõe reduzir o custo da contratação, ampliar a flexibilidade e reforçar o 'negociado sobre o legislado'.",
    perguntaChave: "Reduzir a jornada e regular novos vínculos, ou baratear a contratação para gerar empregos?",
    propostas: {
      lula: [
        {
          titulo: "Fim da escala 6x1 e jornada de 40 horas",
          texto:
            "Atuar pela redução da jornada semanal para 40 horas e pelo fim da escala 6x1, sem redução de salários. A mudança depende de aprovação do Congresso e o plano não apresenta simulação de impacto para os setores afetados.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "uolLula", "estadao"],
        },
        {
          titulo: "Valorização real do salário mínimo",
          texto:
            "Manter a política de reajustes acima da inflação. O programa não estabelece qual valor o mínimo deve alcançar no próximo mandato.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "uolLula"],
        },
        {
          titulo: "Regulamentar o trabalho por aplicativo",
          texto:
            "Aperfeiçoar a regulamentação do trabalho mediado por plataformas, incluindo financiamento da Previdência e cobertura para aposentadoria, incapacidade, acidentes e maternidade de motoristas e entregadores.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "estadao"],
        },
        {
          titulo: "Combate à pejotização e negociação coletiva",
          texto:
            "Enfrentar a contratação de empregados como pessoa jurídica e fortalecer a negociação coletiva e as políticas de acesso à previdência.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Tributação progressiva",
          texto:
            "Aprofundar a progressividade tributária, com quem ganha mais pagando proporcionalmente mais. A isenção do IR até R$ 5.000 aparece como realização do atual mandato, não como nova promessa.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "uolLula", "bbcPropostas"],
        },
        {
          titulo: "Plataforma pública de empregabilidade com IA",
          texto:
            "Criar uma Plataforma Pública Nacional de Empregabilidade usando inteligência artificial para conectar trabalhadores a vagas, e dar sequência ao Programa Conhecimento Brasil, de repatriação de cientistas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Reduzir o custo do trabalho e flexibilizar a CLT",
          texto:
            "Reduzir gradualmente o custo do trabalho 'sem retirar direitos' e flexibilizar a CLT para permitir o pagamento por hora, via PEC 12/2026, reforçando a prevalência do negociado sobre o legislado.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "uolFlavio"],
        },
        {
          titulo: "Contratos especiais para jovens e 50+",
          texto:
            "Criar contrato de menor custo para jovens de 18 a 24 anos em busca do primeiro emprego e um contrato mais atrativo para pessoas com 50 anos ou mais desempregadas há pelo menos 12 meses.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "g1Live"],
        },
        {
          titulo: "Jornada negociada caso a caso",
          texto:
            "Sobre o fim da escala 6x1, Flávio defende que trabalhador e empregador negociem a jornada, com pagamento correspondente às horas trabalhadas, e propõe jornadas flexíveis especialmente para mães e jovens.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "uolFlavio"],
        },
        {
          titulo: "Minha Primeira Empresa e banco nacional de vagas",
          texto:
            "Reduzir burocracia para abrir e formalizar negócios, criar um banco nacional de vagas conectado ao RH das empresas e transformar a Caixa no 'Banco da Prosperidade'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "g1Live"],
        },
        {
          titulo: "Programa Ganha-Ganha (cashback social)",
          texto:
            "Sistema voluntário de pontos em que concluir cursos, conseguir emprego, formalizar negócio, poupar ou manter contas em dia dá direito a juros menores, crédito facilitado, cashback e descontos.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "g1Live", "g1Sabatina"],
        },
        {
          titulo: "BPC e Previdência corrigidos só pela inflação",
          texto:
            "O plano prevê corrigir os pisos do BPC e da Previdência apenas pela inflação, sem aumento real — ponto em que diverge frontalmente da política de valorização do salário mínimo.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas"],
          alerta:
            "Em entrevista, Flávio disse que não fará economia 'em cima dos aposentados', mas não esclareceu se manterá a vinculação dos benefícios ao salário mínimo.",
        },
      ],
    },
    divergencias: [
      "Escala 6x1 e jornada de 40h: proposta explícita (Lula) × negociação direta entre as partes e pagamento por hora (Flávio).",
      "Aplicativos: regulação com cobertura previdenciária (Lula) × redução de custo e flexibilidade (Flávio).",
      "Benefícios: valorização real do mínimo (Lula) × correção do BPC e da Previdência só pela inflação (Flávio).",
    ],
    lacunas: [
      {
        candidato: "lula",
        texto:
          "O programa não detalha como seria financiada a ampliação da cobertura previdenciária dos trabalhadores de plataforma nem os impactos de longo prazo sobre o equilíbrio do sistema.",
        refs: ["pleno"],
      },
    ],
  },
  {
    id: "cultura",
    nome: "Cultura",
    iconAsset: "cultura",
    gradiente: "from-fuchsia-500 to-pink-600",
    divergencia: 4,
    resumo:
      "Os dois falam em desconcentrar recursos e aperfeiçoar as leis de incentivo, mas partem de visões opostas sobre o papel do Estado. Lula detalha políticas para audiovisual, streaming, IA, games e participação social; Flávio concentra o capítulo em tradições, patrimônio e crítica a 'agendas políticas'.",
    perguntaChave: "Cultura como política pública estruturada pelo Estado ou como setor que o Estado só deve destravar?",
    propostas: {
      lula: [
        {
          titulo: "Aperfeiçoar Lei Rouanet e Lei Aldir Blanc",
          texto:
            "O plano cita as duas leis nominalmente e promete implementá-las 'de forma transparente e democrática', avançando na desconcentração regional dos recursos e no apoio a todas as formas de manifestação cultural.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "metropolesRouanet", "bbcCultura", "folhaCultura"],
        },
        {
          titulo: "Ministério da Cultura, SNC e participação social",
          texto:
            "Fortalecer o Ministério da Cultura (recriado nesta gestão), o Sistema Nacional de Cultura e instâncias de participação como o Conselho Nacional de Política Cultural e os Comitês de Cultura Estaduais.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcCultura", "odc", "metropolesRouanet"],
        },
        {
          titulo: "Audiovisual e regulamentação do streaming",
          texto:
            "Manter a Cota de Tela e fortalecer o Fundo Setorial do Audiovisual; aprovar uma regulamentação do streaming que 'atenda ao interesse nacional', com alíquota de Condecine de até 4% do faturamento das plataformas e cotas progressivas de conteúdo nacional nos catálogos.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcCultura", "folhaCultura"],
        },
        {
          titulo: "Direito autoral no ambiente digital e IA",
          texto:
            "Aprovar lei de direito autoral no ambiente digital e regulamentar a inteligência artificial para que músicos, autores e artistas sejam pagos quando as plataformas usarem conteúdo brasileiro — 'quem cria não pode ser o único a não ganhar'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcCultura"],
        },
        {
          titulo: "Cultura Viva, periferias e equipamentos",
          texto:
            "Fortalecer Pontos e Pontões de Cultura, apoiar mestres e mestras das culturas populares e tradicionais e ampliar equipamentos culturais em periferias, como CEUs, MovCEUs e bibliotecas públicas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcCultura", "folhaCultura"],
        },
        {
          titulo: "Economia criativa, games e cultura nas escolas",
          texto:
            "Ampliar crédito para a economia criativa; consolidar o acesso da indústria de games aos mecanismos da Lei Rouanet após o Marco Legal dos Games; integrar cultura e educação pelo Mais Cultura nas Escolas e por programas de formação de plateia.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcCultura", "metropolesRouanet", "emRouanet"],
        },
      ],
      flavio: [
        {
          titulo: "'Aperfeiçoar' as leis de incentivo",
          texto:
            "O plano não cita a Lei Rouanet nominalmente, mas promete corrigir 'distorções' do modelo atual, que segundo o texto concentra recursos e isola artistas de grande qualidade técnica sem apelo comercial. Não detalha quais critérios seriam alterados.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "metropolesRouanet", "bbcCultura", "folhaCultura"],
        },
        {
          titulo: "Descentralização regional dos recursos",
          texto:
            "Favorecer o desenvolvimento de polos culturais fora dos grandes centros e alcançar 'artistas de grande mérito artístico, porém de pouca projeção, hoje esquecidos pelo modelo atual'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "metropolesRouanet", "bbcCultura"],
        },
        {
          titulo: "Patrimônio histórico e tradições brasileiras",
          texto:
            "Capítulo 'Cultura que valoriza nossas raízes': recuperar centros históricos, obras e acervos 'deteriorados por falta de cuidado' e celebrar a formação multicultural e a miscigenação do país, com regras claras de direito autoral sobre saberes tradicionais.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "folhaCultura", "odc"],
        },
        {
          titulo: "Arte 'sem subordinação a agendas políticas'",
          texto:
            "A política cultural deve ser orientada pela 'transparência', pela 'liberdade de expressão' e pela 'distinção entre cultura e entretenimento comercial'; o repasse de verbas federais deve ocorrer sem alinhamento partidário.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "metropolesRouanet", "folhaCultura", "odc"],
        },
        {
          titulo: "Retirar 'viés ideológico' do repasse ao cinema",
          texto:
            "O plano defende revisar os critérios de repasse ao cinema nacional, afirmando que o 'viés ideológico' serviria para proteger grupos que monopolizam influência e produzem 'censura informal' na cultura.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "odc"],
        },
        {
          titulo: "Redirecionar parte do fomento para presídios",
          texto:
            "Segundo levantamento do Estado de Minas sobre os planos registrados no TSE, o documento prevê redirecionar fomento hoje destinado à Lei Rouanet para construção e modernização de presídios.",
          origem: "Plano de governo (TSE)",
          refs: ["emRouanet"],
          alerta:
            "Item apurado por apenas um veículo e não confirmado pelos demais levantamentos consultados. Confira diretamente no plano registrado no TSE antes de usar como fato.",
        },
      ],
    },
    divergencias: [
      "Estrutura institucional: fortalecer MinC, Sistema Nacional de Cultura e conselhos (Lula) × princípios gerais sem desenho institucional (Flávio).",
      "Audiovisual e plataformas: regulamentação do streaming, Condecine e cotas (Lula) × tema ausente do plano (Flávio).",
      "Critérios: diversidade e participação social (Lula) × retirada de 'viés ideológico' dos órgãos de repasse (Flávio).",
    ],
    lacunas: [
      {
        candidato: "flavio",
        texto:
          "O capítulo cultural não apresenta propostas para audiovisual, streaming, direitos autorais na era da IA, economia criativa, crédito cultural, arte nas escolas ou formação de público.",
        refs: ["bbcCultura", "folhaCultura"],
      },
      {
        candidato: "flavio",
        texto: "O plano não detalha quais mudanças faria nos critérios de distribuição dos recursos de incentivo.",
        refs: ["folhaCultura", "metropolesRouanet"],
      },
    ],
  },
  {
    id: "meio-ambiente",
    nome: "Meio ambiente",
    iconAsset: "meio-ambiente",
    gradiente: "from-green-500 to-emerald-700",
    divergencia: 5,
    resumo:
      "Área de ruptura. Lula mantém o compromisso com o Acordo de Paris e metas de desmatamento zero; o plano de Flávio não usa as expressões 'mudança climática' ou 'aquecimento global' em nenhuma das 76 páginas e propõe licenciamento automático por decurso de prazo.",
    perguntaChave: "O licenciamento ambiental é um entrave ao desenvolvimento ou uma condição para ele?",
    propostas: {
      lula: [
        {
          titulo: "Zerar o desmatamento líquido até 2030",
          texto:
            "Meta de desmatamento líquido zero (diferença entre área desmatada e reflorestada) até 2030, com o enfrentamento da mudança climática apresentado como prioridade e manutenção do compromisso com o Acordo de Paris.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Terras públicas, territórios indígenas e quilombolas",
          texto:
            "Ampliar a destinação de terras públicas para unidades de conservação, territórios indígenas e quilombolas e assentamentos; dar continuidade à reforma agrária e à titulação quilombola; combater o garimpo ilegal.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas", "verdadeLgbt"],
        },
        {
          titulo: "Mercado de carbono e transição energética",
          texto:
            "Regulamentar o Sistema Brasileiro de Comércio de Emissões (SBCE), ampliar fontes limpas na matriz, acelerar a eletrificação dos transportes, abrir frente de investimento em baterias e promover agricultura de baixo carbono.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Petróleo e minerais 'com cuidados ambientais'",
          texto:
            "Explorar petróleo e gás natural 'com os devidos cuidados ambientais e visão estratégica', incluindo pré-sal e Margem Equatorial, e gerir estrategicamente os minerais críticos, evitando a simples exportação de matéria-prima.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Resíduos, bioinsumos e Caatinga",
          texto:
            "Acabar com os lixões, ampliar coleta seletiva e reciclagem, regulamentar a Lei de Bioinsumos e incluir a Caatinga como ativo estratégico climático.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Licença automática por decurso de prazo",
          texto:
            "O plano determina (p. 50) que, se o órgão ambiental não decidir dentro do prazo, a licença 'deve ser concedida'. Prevê ainda estabilidade das regras por até 20 anos em grandes projetos e indenização ao empreendedor caso o Estado cancele uma licença já concedida.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "folhaAmbiente", "norte"],
        },
        {
          titulo: "Eliminar 'superposições' entre Ibama, Funai e ICMBio",
          texto:
            "O texto promete eliminar sobreposições entre os três órgãos, sem detalhar quais atribuições seriam alteradas ou retiradas, e exigir transparência de ONGs que recebem recursos internacionais e acionam a União na Justiça.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "folhaAmbiente", "norte"],
        },
        {
          titulo: "Zerar o desmatamento ilegal até 2029",
          texto:
            "Meta de zerar o desmatamento ilegal até 2029, com satélite e IA na fiscalização e combate a garimpo e grilagem — mas 'sem criar novas obrigações ou custos desnecessários para o produtor'. Como grande parte da supressão vegetal hoje é legalmente autorizada, a meta admite aumento do desmatamento total.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "folhaAmbiente", "norte"],
        },
        {
          titulo: "Minerais críticos, terras raras e 'fracking'",
          texto:
            "Licenciamento ágil e direitos minerários mais rápidos para lítio, nióbio, níquel e terras raras, com capital estrangeiro; o plano também contempla a exploração de gás por fraturamento hidráulico (fracking) e destravar a Ferrogrão e a Hidrovia do Tapajós.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "folhaAmbiente", "norte"],
        },
        {
          titulo: "Não demarcar novas terras indígenas",
          texto:
            "Em abril de 2026, em feira do agronegócio em Sinop (MT), Flávio afirmou que, se dependesse de seu governo, 'nenhuma dessas reservas será demarcada'. O plano prevê dar 'autonomia' a indígenas e quilombolas para decidir sobre atividades produtivas em suas terras.",
          origem: "Declaração de campanha",
          refs: ["bbcPropostas", "folhaAmbiente", "norte", "brasil247Clima"],
        },
        {
          titulo: "Histórico de votos ambientais no Senado",
          texto:
            "Votou a favor da nova Lei Geral do Licenciamento (apelidada de 'PL da Devastação'), pela derrubada do veto que isentava financiadores de responsabilidade por danos ambientais, e nos dois turnos a favor da PEC do marco temporal das terras indígenas.",
          origem: "Atuação no Senado",
          refs: ["norte"],
        },
      ],
    },
    divergencias: [
      "Clima: compromisso com o Acordo de Paris e metas de descarbonização (Lula) × ausência total dos termos 'mudança climática' e 'aquecimento global' no plano (Flávio).",
      "Licenciamento: manutenção da análise de impacto (Lula) × licença automática por decurso de prazo e regras congeladas por 20 anos (Flávio).",
      "Terras indígenas: ampliar destinação e demarcação (Lula) × não demarcar novas terras (Flávio).",
      "Órgãos ambientais: fortalecimento (Lula) × eliminação de 'superposições' entre Ibama, Funai e ICMBio (Flávio).",
    ],
    lacunas: [
      {
        candidato: "flavio",
        texto:
          "O plano não detalha como pretende zerar o desmatamento ilegal até 2029, nem quais atribuições dos órgãos ambientais seriam fundidas ou extintas.",
        refs: ["folhaAmbiente"],
      },
      {
        candidato: "lula",
        texto:
          "Nem o plano de Lula nem o de Flávio mencionam o El Niño, fenômeno que pode ter impacto inédito no país em 2027.",
        refs: ["folhaAmbiente"],
      },
    ],
  },
  {
    id: "inclusao",
    nome: "Inclusão e acessibilidade",
    iconAsset: "inclusao",
    gradiente: "from-sky-500 to-cyan-600",
    divergencia: 3,
    resumo:
      "Os dois planos tratam de pessoas com deficiência, mas com arquiteturas distintas: Lula insere o tema no eixo de desigualdades, com continuidade do Viver sem Limite; Flávio cria uma categoria própria no índice e trata a inclusão como política 'transversal', com forte peso na rede de cuidado.",
    perguntaChave: "Inclusão via fiscalização de direitos e rede pública, ou via rede de cuidado em parceria com famílias e entidades?",
    propostas: {
      lula: [
        {
          titulo: "Manter e ampliar o Viver sem Limite",
          texto:
            "Compromisso expresso de continuidade do plano federal de direitos das pessoas com deficiência, promovendo ambientes inclusivos e aplicação da legislação de acessibilidade.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "diarioPcd"],
        },
        {
          titulo: "Educação inclusiva e educação bilíngue de surdos",
          texto:
            "Continuar apoiando a educação inclusiva na rede regular e a educação bilíngue de surdos, com Libras e tecnologia assistiva.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "diarioPcd"],
        },
        {
          titulo: "Fiscalizar a lei de cotas para PcD",
          texto:
            "Fortalecer expressamente a fiscalização do cumprimento das cotas de contratação de pessoas com deficiência nas empresas e ampliar a inclusão produtiva, associando a exclusão ao capacitismo.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "diarioPcd", "verdadeLgbt"],
        },
        {
          titulo: "Reabilitação e oficinas ortopédicas",
          texto:
            "Ampliar os Centros Especializados em Reabilitação e as Oficinas Ortopédicas e manter políticas de saúde voltadas às pessoas com deficiência no SUS.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "diarioPcd"],
        },
        {
          titulo: "Planos de ação obrigatórios nas empresas",
          texto:
            "Tornar obrigatória a execução de planos de ação em empresas com desigualdades identificadas, com metas progressivas para ampliar a presença de mulheres — especialmente negras — e de pessoas com deficiência, além de combater o capacitismo no acesso ao trabalho.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "verdadeLgbt", "diarioPcd"],
        },
        {
          titulo: "Esporte acessível",
          texto:
            "Melhorar o acesso da população de todas as idades ao esporte e à atividade física, incluindo pessoas com deficiência.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Política transversal para PcD e doenças raras",
          texto:
            "O plano cria no índice a categoria 'Pessoas com deficiência ou doenças raras' e afirma (p. 39) que essas políticas serão 'transversais', atravessando diferentes áreas do governo, com foco em autonomia e integração social.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "diarioPcd"],
        },
        {
          titulo: "Rede Nacional de Cuidado",
          texto:
            "Ampliar apoio a idosos e pessoas com deficiência por meio de centros-dia e atendimento domiciliar, em parceria com estados, municípios e organizações sociais. O texto afirma que o Estado deve dividir com as famílias parte da responsabilidade pelo cuidado.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "diarioPcd"],
        },
        {
          titulo: "Centros de Referência em TEA e salas sensoriais",
          texto:
            "Implantar Centros de Referência em Transtorno do Espectro Autista. Em evento de campanha no Rio, Flávio também prometeu incentivar salas sensoriais nas escolas para acolhimento de estudantes autistas e capacitar redes de ensino para a inclusão.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "diarioPcd", "valorMulheres"],
        },
        {
          titulo: "Casa Segura para Envelhecer e acessibilidade domiciliar",
          texto:
            "Subsídio para adaptação de moradias de famílias de baixa renda, com foco em idosos, além de aplicativo de companhia e alerta para idosos que moram sozinhos. A acessibilidade aparece sobretudo associada à adaptação domiciliar.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "diarioPcd"],
        },
        {
          titulo: "Entrega domiciliar de medicamentos",
          texto:
            "Pessoas com deficiência aparecem entre os beneficiários prioritários do sistema de entrega de remédios em casa, junto com idosos e doentes crônicos.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "diarioPcd"],
        },
        {
          titulo: "Paradesporto e detecção de talentos",
          texto:
            "Estimular a inclusão pelo esporte com detecção de talentos paralímpicos desde a base e mais autonomia para entidades paralímpicas; o paradesporto é apresentado como instrumento de reabilitação e inserção profissional.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "diarioPcd"],
        },
      ],
    },
    divergencias: [
      "Cotas de contratação: fiscalização reforçada (Lula) × ênfase em redução do custo do trabalho e qualificação, sem menção à fiscalização das cotas (Flávio).",
      "Cuidado: Política Nacional de Cuidados estatal (Lula) × Rede Nacional de Cuidado compartilhada com famílias e organizações sociais (Flávio).",
      "Valor dos benefícios: correção do BPC apenas pela inflação (Flávio) × manutenção da valorização real (Lula).",
    ],
    lacunas: [
      {
        candidato: "flavio",
        texto:
          "O plano não menciona a fiscalização das cotas de contratação de pessoas com deficiência nem políticas específicas de educação inclusiva e Libras na seção analisada.",
        refs: ["diarioPcd"],
      },
    ],
  },
  {
    id: "mulheres",
    nome: "Proteção às mulheres",
    iconAsset: "mulheres",
    gradiente: "from-purple-500 to-violet-700",
    divergencia: 4,
    resumo:
      "Tema prioritário para os dois — mulheres são 52,8% do eleitorado. Lula aposta em rede física de acolhimento e igualdade salarial obrigatória; Flávio estrutura o eixo transversal 'Brasil por Elas', com central integrada, IA e endurecimento penal.",
    perguntaChave: "Proteger mulheres é expandir rede pública e direitos, ou integrar canais digitais e endurecer penas?",
    propostas: {
      lula: [
        {
          titulo: "Pacto Nacional Brasil Contra o Feminicídio",
          texto:
            "Consolidar o pacto lançado em janeiro de 2026 como guia central do enfrentamento à violência, com redes de proteção social e combate às desigualdades de gênero.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "g1Mulher", "verdadeMulheres"],
        },
        {
          titulo: "30 Casas da Mulher Brasileira e Salas Lilás",
          texto:
            "Concluir 30 Casas da Mulher Brasileira (hoje são 13) e 15 Centros de Referência da Mulher Brasileira, além de ampliar as Salas Lilás, espaços reservados de acolhimento em delegacias e instituições de justiça.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "g1Mulher", "verdadeMulheres", "poder360"],
        },
        {
          titulo: "Kits de monitoramento de agressores",
          texto:
            "Comprar e distribuir aos estados kits para aprimorar o monitoramento eletrônico de agressores sob medida protetiva e capacitar as forças de segurança para o atendimento às vítimas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "g1Mulher", "verdadeMulheres"],
        },
        {
          titulo: "Igualdade salarial com planos de correção",
          texto:
            "Eliminar diferenças salariais entre homens e mulheres: empresas com desigualdades identificadas deverão apresentar e executar planos de correção com metas progressivas.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "uolLula", "verdadeMulheres"],
        },
        {
          titulo: "Autonomia econômica e cuidotecas",
          texto:
            "Linhas de crédito do Pronaf para agricultoras e extrativistas, programas como o Mulheres Mil, fomento ao empreendedorismo feminino e participação na ciência, além da ampliação de cuidotecas (acolhimento de crianças de 3 a 12 anos) e da Política Nacional de Cuidados.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "verdadeMulheres", "poder360"],
        },
        {
          titulo: "Saúde e direitos reprodutivos",
          texto:
            "Combater a pobreza menstrual (Programa Dignidade Menstrual), ampliar diagnóstico precoce de câncer de mama e colo do útero, fortalecer o planejamento reprodutivo com contracepção gratuita pelo SUS, reduzir a mortalidade materna com foco em mulheres negras e garantir parto humanizado.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "verdadeMulheres", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Eixo transversal 'Brasil por Elas'",
          texto:
            "Doze compromissos com as mulheres reunidos em uma diretriz que atravessa todo o plano, tratando-as como 'a base da família', com ações de segurança, autonomia econômica, saúde e inclusão digital.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "valorMulheres", "estadao", "g1Live"],
        },
        {
          titulo: "Central da Mulher",
          texto:
            "Plataforma em parceria com estados, municípios e entidades privadas reunindo acolhimento, orientação jurídica, apoio psicológico, saúde preventiva, qualificação, vagas de emprego, crédito e renegociação de dívidas, com unidades móveis. O plano não informa qual órgão seria responsável.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "uolFlavio", "verdadeMulheres", "poder360"],
        },
        {
          titulo: "ClarIA e canal único de denúncia",
          texto:
            "Aplicativo com inteligência artificial descrito como 'amiga virtual', pelo qual a mulher registraria ocorrência, pediria medida protetiva e receberia acolhimento; o plano prevê unificar Ligue 180, delegacias online, botão de emergência e centrais de monitoramento em uma só plataforma.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "verdadeMulheres", "bbcPropostas", "g1Live"],
        },
        {
          titulo: "Tornozeleira e monitoramento em tempo real",
          texto:
            "Monitorar por tornozeleira eletrônica agressores de mulheres com medida protetiva, com mecanismo para que a própria vítima acompanhe a distância em relação ao agressor.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "valorMulheres", "uolFlavio"],
        },
        {
          titulo: "Endurecimento penal",
          texto:
            "Castração química de condenados por abuso sexual contra mulheres e crianças e fim da progressão de regime em casos de feminicídio.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas", "g1Live"],
        },
        {
          titulo: "Voucher-creche, bônus de internet e Escola Brasil por Elas",
          texto:
            "Voucher-creche e rede de cuidado para mães; 'bônus de internet' com pacotes de dados para que mulheres estudem, busquem emprego e acessem canais de denúncia (sem critérios detalhados); e capacitação gratuita integrada ao Sistema S.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "g1Live", "verdadeMulheres", "estadao"],
        },
      ],
    },
    divergencias: [
      "Infraestrutura: rede física estatal (Casas da Mulher Brasileira, Salas Lilás) × plataforma digital integrada e Central da Mulher em parceria público-privada.",
      "Igualdade salarial: planos de correção obrigatórios para empresas (Lula) × tema não previsto no plano (Flávio).",
      "Abordagem: prevenção, saúde e direitos reprodutivos (Lula) × resposta penal, com castração química e fim da progressão de regime (Flávio).",
      "Creche: expansão da rede pública e cuidotecas (Lula) × voucher-creche para a rede privada (Flávio).",
    ],
    lacunas: [
      {
        candidato: "flavio",
        texto:
          "O plano não informa qual órgão federal seria responsável pela Central da Mulher, nem detalha critérios do 'bônus de internet' ou das ações de orientação financeira.",
        refs: ["verdadeMulheres"],
      },
    ],
  },
  {
    id: "lgbtqia",
    nome: "LGBTQIA+",
    iconAsset: "lgbtqia",
    gradiente: "from-rose-500 via-amber-400 to-sky-500",
    divergencia: 5,
    resumo:
      "A maior distância entre os dois documentos é também uma assimetria: o plano de Lula cita a população LGBTQIAP+ em vários eixos; no plano de Flávio, levantamentos não encontraram nenhuma menção à população LGBTQIAPN+ nas 76 páginas.",
    perguntaChave: "O Estado deve nomear e atender essa população em políticas públicas, ou não tratar o recorte?",
    propostas: {
      lula: [
        {
          titulo: "Ampliar acesso a direitos e combater homofobia",
          texto:
            "O programa inclui, entre as diretrizes de direitos humanos, 'ampliar o acesso a direitos das populações LGBTQIA+ e combater homofobia'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
        {
          titulo: "Gênero e orientação sexual no desenho das políticas",
          texto:
            "O plano estabelece que identidade de gênero e orientação sexual devem ser consideradas no planejamento das políticas públicas, com a temática atravessando diferentes áreas do documento.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "verdadeLgbt"],
        },
        {
          titulo: "Crimes de ódio como prioridade de segurança",
          texto:
            "No eixo de segurança, o texto prevê que as ações priorizem 'o combate à exploração sexual de crianças e adolescentes, à violência contra mulheres e pessoas LGBTQIAP+, ao racismo (…), aos crimes de ódio e aos delitos cibernéticos'.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "folhaDivergem", "verdadeLgbt"],
        },
        {
          titulo: "Discriminação no acesso ao trabalho",
          texto:
            "Combater xenofobia, capacitismo e discriminações racial, étnica, LGBTQIAPN+ e de classe no acesso ao trabalho decente.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "verdadeLgbt"],
        },
        {
          titulo: "Continuidade de políticas para grupos historicamente excluídos",
          texto:
            "O documento prevê continuidade de políticas voltadas a mulheres, população negra, povos indígenas e quilombolas, pessoas com deficiência e população LGBTQIAP+ dentro da diretriz de combate às desigualdades.",
          origem: "Plano de governo (TSE)",
          refs: ["planoLula", "bbcPropostas"],
        },
      ],
      flavio: [
        {
          titulo: "Nenhuma menção à população LGBTQIAPN+ no plano",
          texto:
            "Levantamento das 76 páginas não encontrou as palavras população LGBTQIAPN+, gays, lésbicas, transexuais, transgêneros, transfobia, homofobia ou LGBTfobia. O mesmo levantamento registra ausência de menções a racismo e população negra.",
          origem: "Plano de governo (TSE)",
          refs: ["verdadeLgbt"],
        },
        {
          titulo: "Esporte feminino por sexo biológico",
          texto:
            "No item 'Esporte que forma', o plano se compromete a assegurar que a categoria feminina, da base ao alto rendimento, 'seja disputada por atletas do sexo feminino, protegendo a mulher e a lisura da competição de agendas ideológicas', citando vantagens físicas que persistiriam após tratamento hormonal.",
          origem: "Plano de governo (TSE)",
          refs: ["verdadeLgbt"],
        },
        {
          titulo: "Proteção da família e liberdade religiosa",
          texto:
            "O documento defende a proteção da família, a liberdade religiosa, a propriedade privada e a liberdade de expressão como princípios estruturantes do governo, e trata as mulheres como 'a base da família'.",
          origem: "Plano de governo (TSE)",
          refs: ["pleno", "estadao"],
        },
        {
          titulo: "Educação 'livre de doutrinação'",
          texto:
            "No capítulo de educação, o plano defende uma escola 'livre de doutrinação político-partidária' — formulação historicamente associada, no campo político do candidato, à restrição de temas de gênero e diversidade em sala de aula.",
          origem: "Plano de governo (TSE)",
          refs: ["planoFlavio", "bbcPropostas"],
          alerta:
            "O plano não explicita que a expressão se refira a temas de gênero. A leitura de contexto é interpretativa e está sinalizada como tal.",
        },
      ],
    },
    divergencias: [
      "Reconhecimento: a população é nomeada e atendida em vários eixos (Lula) × ausente do documento (Flávio).",
      "Esporte: o plano de Flávio restringe a categoria feminina ao sexo biológico; o de Lula não trata do tema.",
      "Currículo: diversidade e direitos humanos (Lula) × educação 'livre de doutrinação' (Flávio).",
    ],
    lacunas: [
      {
        candidato: "lula",
        texto:
          "Há divergência entre levantamentos: a BBC registra o compromisso de 'combater homofobia' no programa, enquanto o Portal Verdade afirma que o candidato 'não menciona diretamente temas como transfobia, homofobia ou LGBTfobia'. As duas leituras estão reproduzidas aqui.",
        refs: ["bbcPropostas", "verdadeLgbt"],
      },
      {
        candidato: "flavio",
        texto:
          "Sem menção à população LGBTQIAPN+, não é possível identificar no documento qual política o candidato adotaria em saúde trans, nome social, combate à violência por orientação sexual ou direitos civis.",
        refs: ["verdadeLgbt"],
      },
    ],
  },
];

export const origemCores: Record<Origem, string> = {
  "Plano de governo (TSE)": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Atuação no Senado": "bg-sky-100 text-sky-800 border-sky-200",
  "Declaração de campanha": "bg-amber-100 text-amber-800 border-amber-200",
  "Ação de governo": "bg-violet-100 text-violet-800 border-violet-200",
};
