export type CategoryId =
  | 'black-friday'
  | 'papelaria'
  | 'eletronicos'
  | 'acessorios'
  | 'utilidades'
  | 'natal';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
  accentNote: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isRealStorePhoto: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'pix' | 'loja';

export const STORE_CONFIG = {
  name: 'Nexus Papelaria e Armarinho',
  whatsappNumber: '5561993517997',
  whatsappDisplay: '(61) 99351-7997',
  pixKey: '61993517997',
  address: 'QR 407 CONJUNTO B1 LOTE 11',
  logoUrl: '/assets/aistudio/images_6b0d9f5f.jpg',
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'black-friday',
    label: 'Ofertas Black Friday',
    shortLabel: 'Black Friday',
    description: 'Descontos especiais de novembro para antecipar presentes, beleza e decoração.',
    accentNote: 'Preços promocionais por tempo limitado',
  },
  {
    id: 'natal',
    label: 'Especial de Natal',
    shortLabel: 'Natal',
    description: 'Árvores, pisca-piscas, guirlandas, bolas e enfeites reais disponíveis na loja.',
    accentNote: 'Pronta entrega para retirada no balcão',
  },
  {
    id: 'papelaria',
    label: 'Papelaria e Armarinho',
    shortLabel: 'Papelaria',
    description: 'Materiais escolares, suprimentos para empresas, embalagens e serviços de impressão.',
    accentNote: 'Atendimento rápido e impressão na hora',
  },
  {
    id: 'acessorios',
    label: 'Acessórios e Beleza',
    shortLabel: 'Beleza',
    description: 'Maquiagens, glosses hidratantes, unhas postiças, pó banana e bolsas esportivas.',
    accentNote: 'Seleção atualizada direto da vitrine',
  },
  {
    id: 'eletronicos',
    label: 'Eletrônicos',
    shortLabel: 'Eletrônicos',
    description: 'Fones Bluetooth, carregadores turbo, cabos reforçados e caixas de som portáteis.',
    accentNote: 'Testados na retirada',
  },
  {
    id: 'utilidades',
    label: 'Utilidades Domésticas',
    shortLabel: 'Utilidades',
    description: 'Itens práticos para casa, cozinha, organização e presentes úteis de fim de ano.',
    accentNote: 'Qualidade para o dia a dia',
  },
];

export const PRODUCTS: Product[] = [
  // OFERTAS BLACK FRIDAY
  {
    id: 'bf-pisca-led',
    name: 'Pisca-Pisca 100 LEDs Wincy Natal (8 Funções)',
    category: 'black-friday',
    categoryLabel: 'Ofertas Black Friday',
    description: 'Disponível em Multicor, Branco Quente ou Branco Frio · Fio transparente ou verde.',
    price: 15.0,
    originalPrice: 24.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.49__2__c02e55ce.jpeg',
    isRealStorePhoto: true,
    tag: 'Black Friday -40%',
  },
  {
    id: 'bf-arvore-decorada',
    name: 'Árvore de Natal Decorada Completa com Laços',
    category: 'black-friday',
    categoryLabel: 'Ofertas Black Friday',
    description: 'Pronta para montar na sala com estrela ponteira, bolas cobres e laços natalinos.',
    price: 129.9,
    originalPrice: 169.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47__4__bd6cf2b0.jpeg',
    isRealStorePhoto: true,
    tag: 'Oferta Especial',
  },
  {
    id: 'bf-bolsa-esportiva',
    name: 'Bolsa Esportiva Transversal (Marinho ou Bege)',
    category: 'black-friday',
    categoryLabel: 'Ofertas Black Friday',
    description: 'Espaçosa para academia, viagem curta ou escola, com alça ajustável.',
    price: 59.9,
    originalPrice: 79.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.49__3__3074a659.jpeg',
    isRealStorePhoto: true,
    tag: 'Black Friday -25%',
  },
  {
    id: 'bf-fone-tws',
    name: 'Fone de Ouvido Bluetooth TWS Pro',
    category: 'black-friday',
    categoryLabel: 'Ofertas Black Friday',
    description: 'Estojo carregador compacto, áudio estéreo limpo e microfone integrado.',
    price: 49.9,
    originalPrice: 69.9,
    image: '/assets/catalog/fone-tws.svg',
    isRealStorePhoto: false,
    tag: 'Black Friday -29%',
  },

  // ESPECIAL DE NATAL
  {
    id: 'nat-guirlanda-pinhas',
    name: 'Guirlanda de Natal com Pinhas e Frutas Vermelhas',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Acabamento tradicional com pinhas naturais e laço rústico para porta de entrada.',
    price: 45.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47__3__e8615dff.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-guirlanda-sisal',
    name: 'Guirlanda Sisal Master Christmas 19cm',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Guirlanda artesanal em sisal com pinhas douradas e folhagem festiva.',
    price: 35.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.12__2__c136e1d8.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-enfeite-top-sinos',
    name: 'Enfeite Duplo Sinos Dourados & Laço Xadrez',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Pendente grande "Feliz Natal" com sinos vazados dourados e detalhes vermelhos.',
    price: 25.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.48__1__9c28739f.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-sinos-feliz-natal',
    name: 'Sinos Dourados Pendentes "Feliz Natal"',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Enfeite clássico para maçaneta, árvore ou guirlanda com fita vermelha.',
    price: 6.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.49__1__467ffd20.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-arvore-nevada',
    name: 'Árvore de Natal Pinheiro Verde ou Nevada',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Galhos cheios com opção pontas nevadas e base firme para mesa ou chão.',
    price: 89.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.49__5__61e8ed35.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-bolas-fertin',
    name: 'Kit Bolas de Natal Fertin (Vermelho, Ouro ou Prata)',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Conjunto com bolas lisas e foscas brilhantes com cordão dourado para pendurar.',
    price: 19.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.11__2__418b6393.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-ponteira-estrela',
    name: 'Ponteira Estrela Aramada Dourada',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Topo de árvore elegante em metal aramado com brilho dourado.',
    price: 18.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.48__3__4e8f5fa3.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-lacos-natalinos',
    name: 'Kit Laços Natalinos Glitter (Vermelho ou Ouro)',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Cartela com laços estruturados para árvores, presentes e arranjos de mesa.',
    price: 12.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.12_eefe0bd4.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-pelucia-noel',
    name: 'Enfeite Pelúcia Papai Noel e Boneco de Neve',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Pendentes natalinos em tecido xadrez e paetê com sininhos na barra.',
    price: 14.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.45_516a5a3b.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-rena-dourada',
    name: 'Rena Decorativa Dourada com Laço',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Peça texturizada dourada para compor árvores grandes, aparadores e presépios.',
    price: 15.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.48_5dcececd.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-gorro-noel',
    name: 'Gorro de Papai Noel Tradicional Pelúcia',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Tecido macio vermelho com barra branca para festas e fotos em família.',
    price: 15.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.48__2__eb4cd541.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'nat-arvore-dourada-pronta',
    name: 'Árvore de Natal Decorada Laços Dourados',
    category: 'natal',
    categoryLabel: 'Especial de Natal',
    description: 'Modelo compacto decorado com laços dourados, bolas espelhadas e sinos.',
    price: 139.9,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.05_6df3946b.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },

  // PAPELARIA E ARMARINHO
  {
    id: 'pap-massa-eva',
    name: 'Massa de E.V.A Escolar c/ 12 Unidades',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Atóxica, suave, não mancha e seca ao ar · 12 cores vibrantes para trabalhos.',
    price: 22.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.49_3b33365c.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'pap-sacolas-natal',
    name: 'Sacolas de Presente Natalinas (Kraft & Xadrez)',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Modelos em papel reforçado com alça torcida para presentes e lembranças.',
    price: 8.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.11__1__417dc2ad.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'pap-sacola-noel',
    name: 'Sacola Presente Papai Noel Vermelha Grande',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Estampa festiva em alta definição com alça de fita de cetim vermelha.',
    price: 9.5,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.11_90401bd0.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'pap-kit-caderno',
    name: 'Kit Caderno Universitário 10 Matérias + Canetas',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Capa dura resistente 200 folhas com conjunto de canetas esferográficas.',
    price: 34.9,
    image: '/assets/catalog/kit-caderno.svg',
    isRealStorePhoto: false,
  },
  {
    id: 'pap-impressao',
    name: 'Pacote Impressão Colorida / Xerox & Encadernação',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Impressões escolares, apostilas, currículos e suprimentos para escritórios.',
    price: 15.0,
    image: '/assets/catalog/impressao-servicos.svg',
    isRealStorePhoto: false,
    tag: 'Serviço na Loja',
  },
  {
    id: 'pap-armarinho',
    name: 'Kit Armarinho Fitas de Cetim, Linhas e Botões',
    category: 'papelaria',
    categoryLabel: 'Papelaria e Armarinho',
    description: 'Essenciais de costura, artesanato, laços e reparos rápidos.',
    price: 18.5,
    image: '/assets/catalog/kit-armarinho.svg',
    isRealStorePhoto: false,
  },

  // ACESSÓRIOS E BELEZA
  {
    id: 'bel-gloss-cherry',
    name: 'Lip Gloss Cherry Lové Rain com Chaveiro',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Brilho hidratante aroma cereja com pingente chaveiro exclusivo.',
    price: 18.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.46__3__39cc162d.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'bel-lip-oil',
    name: 'Lip Oil Toque Special Borboleta',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Hidratação diária com efeito brilho alto e tampa decorada de borboleta.',
    price: 15.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47__1__06a85475.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'bel-gloss-sweet',
    name: 'Lip Gloss Sweet Stitch Triangular',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Fórmula com partículas de brilho e embalagem colecionável rosa.',
    price: 12.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47_febbfcd2.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'bel-po-banana',
    name: 'Pó Banana Translúcido Aveludado Guths',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Textura fina antibrilho que se adapta a qualquer tom de pele.',
    price: 15.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.46_82451530.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'bel-paleta-matte',
    name: 'Paleta de Sombras Matte Femme Paris (9 Tons)',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Cores neutras e esfumadas para maquiagem do dia a dia ou festas.',
    price: 22.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.46__1__9c8c5393.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },
  {
    id: 'bel-unhas-posticas',
    name: 'Unhas Postiças BelaLuckstar Color Nails (12 Unid.)',
    category: 'acessorios',
    categoryLabel: 'Acessórios e Beleza',
    description: 'Tons nude e marrom modernos em formato bailarina pronto para aplicar.',
    price: 14.0,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47__2__b0115fb0.jpeg',
    isRealStorePhoto: true,
    tag: 'Foto da Loja',
  },

  // ELETRÔNICOS
  {
    id: 'ele-carregador-turbo',
    name: 'Carregador Turbo USB-C 20W + Cabo',
    category: 'eletronicos',
    categoryLabel: 'Eletrônicos',
    description: 'Carregamento rápido e seguro compatível com Android e iPhone.',
    price: 39.9,
    image: '/assets/catalog/carregador-turbo.svg',
    isRealStorePhoto: false,
  },
  {
    id: 'ele-cabo-nylon',
    name: 'Cabo Reforçado em Nylon 1,5m (Tipo-C / Lightning)',
    category: 'eletronicos',
    categoryLabel: 'Eletrônicos',
    description: 'Trama resistente contra dobras e transferência rápida de energia.',
    price: 19.9,
    image: '/assets/catalog/cabo-nylon.svg',
    isRealStorePhoto: false,
  },
  {
    id: 'ele-caixa-som',
    name: 'Caixa de Som Portátil Bluetooth Recarregável',
    category: 'eletronicos',
    categoryLabel: 'Eletrônicos',
    description: 'Compacta com graves definidos e entrada USB/Cartão para confraternizações.',
    price: 64.9,
    image: '/assets/catalog/caixa-som.svg',
    isRealStorePhoto: false,
  },

  // UTILIDADES DOMÉSTICAS
  {
    id: 'uti-garrafa-inox',
    name: 'Garrafa Térmica Inox 500ml Parede Dupla',
    category: 'utilidades',
    categoryLabel: 'Utilidades Domésticas',
    description: 'Conserva bebidas geladas ou quentes por horas no trabalho ou escola.',
    price: 42.9,
    image: '/assets/catalog/garrafa-termica.svg',
    isRealStorePhoto: false,
  },
  {
    id: 'uti-potes-hermeticos',
    name: 'Kit 3 Potes Herméticos Organizadores',
    category: 'utilidades',
    categoryLabel: 'Utilidades Domésticas',
    description: 'Vedação segura para mantimentos, lanches e organização de geladeira.',
    price: 36.0,
    image: '/assets/catalog/potes-hermeticos.svg',
    isRealStorePhoto: false,
  },
  {
    id: 'uti-caneca-festiva',
    name: 'Caneca de Porcelana Temática Fim de Ano',
    category: 'utilidades',
    categoryLabel: 'Utilidades Domésticas',
    description: 'Ideal para amigo oculto, café da manhã ou presentes corporativos.',
    price: 24.9,
    image: '/assets/catalog/caneca-natal.svg',
    isRealStorePhoto: false,
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function buildWhatsAppOrderMessage(params: {
  items: CartItem[];
  total: number;
  customerName: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}): string {
  const { items, total, customerName, paymentMethod, notes } = params;
  const paymentLabel =
    paymentMethod === 'pix'
      ? `Pix (Chave Telefone: ${STORE_CONFIG.pixKey})`
      : 'Dinheiro / Cartão na retirada na loja';

  const lines = [
    `*NOVO PEDIDO — ${STORE_CONFIG.name.toUpperCase()}*`,
    '',
    `*Cliente:* ${customerName.trim()}`,
    `*Forma de Pagamento:* ${paymentLabel}`,
    `*Retirada na Loja:* ${STORE_CONFIG.address} (Sem entrega)`,
    '',
    '*Itens do Pedido:*',
    ...items.map(
      ({ product, quantity }) =>
        `• ${quantity}x ${product.name} — ${formatBRL(product.price * quantity)}`
    ),
    '',
    `*Total do Pedido:* ${formatBRL(total)}`,
  ];

  if (notes && notes.trim()) {
    lines.push('', `*Observações:* ${notes.trim()}`);
  }

  lines.push('', 'Olá! Acabei de montar meu pedido no catálogo digital e passarei na loja para retirar.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
