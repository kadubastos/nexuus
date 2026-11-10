import { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  MapPin,
  ArrowRight,
  X,
  Phone,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  STORE_CONFIG,
  CategoryId,
  CartItem,
  Product,
  buildWhatsAppUrl,
} from './data/catalog';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { QuoteSection } from './components/QuoteSection';

const CART_STORAGE_KEY = 'nexus_catalogo_cart_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  const totalBagCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const getQuantityInCart = (productId: string): number => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    const categoriesToShow =
      activeCategory === 'all'
        ? CATEGORIES
        : CATEGORIES.filter((cat) => cat.id === activeCategory);

    return categoriesToShow
      .map((category) => {
        const items = PRODUCTS.filter((product) => {
          if (product.category !== category.id) return false;
          if (!normalizedQuery) return true;
          return (
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.description.toLowerCase().includes(normalizedQuery) ||
            product.categoryLabel.toLowerCase().includes(normalizedQuery)
          );
        });
        return { category, items };
      })
      .filter((section) => section.items.length > 0);
  }, [activeCategory, normalizedQuery]);

  const handleNavCategoryJump = (categoryId: CategoryId | 'all') => {
    setActiveCategory(categoryId);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1A1614]">
      {/* Harmonic Brand-to-Christmas Ribbon */}
      <div
        aria-hidden="true"
        className="h-1.5 w-full bg-gradient-to-r from-[#E11D74] via-[#F97316] via-45% to-[#0F3D2E]"
      />

      {/* Sticky Header — 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[#E8E3DC] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Logo & Single-line Wordmark */}
          <a
            href="#topo"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E]"
          >
            <img
              src={STORE_CONFIG.logoUrl}
              alt="Logo Nexus Papelaria e Armarinho"
              className="h-10 w-10 rounded-lg object-cover shadow-xs"
            />
            <span className="font-display text-lg font-bold tracking-tight text-[#1A1614]">
              Nexus
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]"
          >
            <button
              type="button"
              onClick={() => handleNavCategoryJump('black-friday')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#B91C1C] cursor-pointer"
            >
              Black Friday
            </button>
            <button
              type="button"
              onClick={() => handleNavCategoryJump('natal')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#0F3D2E] cursor-pointer"
            >
              Especial Natal
            </button>
            <button
              type="button"
              onClick={() => handleNavCategoryJump('all')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#1A1614] cursor-pointer"
            >
              Categorias
            </button>
            <a
              href="#orcamento"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#1A1614]"
            >
              Orçamento
            </a>
          </nav>

          {/* Zone 3: Primary Action — Shopping Bag */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Abrir sacola de compras com ${totalBagCount} itens`}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#0F3D2E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#14523E] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span>Sacola</span>
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-md bg-white px-1.5 text-xs font-bold text-[#0F3D2E] tabular-nums">
                {totalBagCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="topo" className="flex-1">
        {/* Hero Section — Harmonic Transition from Nexus Pink/Orange to Christmas Evergreen, Crimson & Gold */}
        <section className="relative overflow-hidden bg-[#0F3D2E] text-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left Copy Block */}
              <div className="flex flex-col justify-center lg:col-span-7">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold tracking-wider text-[#FDBA74] uppercase">
                  <span>Black Friday de Novembro</span>
                  <span aria-hidden="true">·</span>
                  <span>Especial de Natal Dezembro</span>
                </div>

                <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl text-balance max-w-xl">
                  Tudo para o seu fim de ano na Nexus Papelaria e Armarinho
                </h1>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                  Aproveite ofertas especiais em árvores, luzes de Natal, papelaria, beleza, eletrônicos e utilidades. Monte sua sacola aqui no catálogo e envie direto para o nosso WhatsApp.
                </p>

                {/* Store Pickup Metadata (Unboxed) */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5 font-medium text-white">
                    <MapPin className="h-3.5 w-3.5 text-[#FDBA74]" aria-hidden="true" />
                    Retirada na loja: {STORE_CONFIG.address}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Pagamento via Pix ou na loja</span>
                </div>

                {/* Hero Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavCategoryJump('black-friday')}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#E11D74] via-[#B91C1C] to-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95 cursor-pointer"
                  >
                    <span>Ver Ofertas Black Friday</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#orcamento"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    Fazer Orçamento
                  </a>
                </div>
              </div>

              {/* Right Showcase Media — Real Store Photos */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative flex-1 min-h-[260px] overflow-hidden rounded-2xl border border-white/15 bg-[#0A291F] shadow-xl">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-10_at_01.16.47__4__bd6cf2b0.jpeg"
                    alt="Árvores de Natal decoradas na vitrine da Nexus Papelaria e Armarinho"
                    className="h-full w-full object-cover object-center scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FDBA74]">
                        Vitrine Real da Loja
                      </p>
                      <p className="font-display text-lg font-semibold text-white">
                        Coleção de Natal & Decoração
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavCategoryJump('natal')}
                      className="shrink-0 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-[#0F3D2E] hover:bg-[#FAF9F7] cursor-pointer"
                    >
                      Explorar Natal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Filter & Search Toolbar */}
        <section
          id="catalogo"
          className="border-b border-[#E8E3DC] bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Segmented Tabs — Mobile Horizontal Scroll */}
              <div
                role="tablist"
                aria-label="Filtrar por categoria"
                className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'all'}
                  onClick={() => setActiveCategory('all')}
                  className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#0F3D2E] text-white'
                      : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#E8E3DC] hover:text-[#1A1614]'
                  }`}
                >
                  Todas as Categorias
                </button>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? cat.id === 'black-friday'
                            ? 'bg-[#B91C1C] text-white'
                            : 'bg-[#0F3D2E] text-white'
                          : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#E8E3DC] hover:text-[#1A1614]'
                      }`}
                    >
                      {cat.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produto no catálogo..."
                  aria-label="Buscar produto no catálogo"
                  className="w-full min-h-[42px] rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] pl-9 pr-9 py-2 text-sm text-[#1A1614] placeholder:text-[#78716C] focus:border-[#0F3D2E] focus:bg-white focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#78716C] hover:text-[#1A1614] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Sections */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-14">
          {visibleSections.length === 0 ? (
            <div className="rounded-2xl border border-[#E8E3DC] bg-white px-6 py-16 text-center">
              <h2 className="font-display text-xl font-semibold text-[#1A1614]">
                Nenhum produto encontrado
              </h2>
              <p className="mt-2 text-sm text-[#57534E]">
                Não encontramos itens para "{searchQuery}". Você pode limpar o filtro ou solicitar um orçamento direto no WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="min-h-[44px] rounded-lg bg-[#0F3D2E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#14523E] cursor-pointer"
                >
                  Mostrar todo o catálogo
                </button>
                <a
                  href="#orcamento"
                  className="min-h-[44px] rounded-lg border border-[#D6D0C4] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1614] hover:bg-[#F3F1EC]"
                >
                  Pedir orçamento
                </a>
              </div>
            </div>
          ) : (
            visibleSections.map(({ category, items }) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`heading-${category.id}`}
                className="scroll-mt-24"
              >
                {/* Section Header */}
                <div className="mb-6 flex flex-col gap-2 border-b border-[#E8E3DC] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      <span
                        className={
                          category.id === 'black-friday'
                            ? 'text-[#B91C1C]'
                            : category.id === 'natal'
                            ? 'text-[#0F3D2E]'
                            : 'text-[#C2410C]'
                        }
                      >
                        {category.accentNote}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{items.length} itens</span>
                    </div>
                    <h2
                      id={`heading-${category.id}`}
                      className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#1A1614] sm:text-3xl"
                    >
                      {category.label}
                    </h2>
                    <p className="mt-1 text-sm text-[#57534E]">
                      {category.description}
                    </p>
                  </div>

                  {activeCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('all')}
                      className="self-start text-xs font-semibold text-[#0F3D2E] underline underline-offset-4 hover:text-[#14523E] sm:self-auto cursor-pointer"
                    >
                      Ver todas as categorias
                    </button>
                  )}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantityInCart={getQuantityInCart(product.id)}
                      onAdd={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* Institutional & Contact Quote Section */}
        <QuoteSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#16523E] bg-[#0A291F] text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={STORE_CONFIG.logoUrl}
              alt="Nexus Papelaria e Armarinho"
              className="h-9 w-9 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold text-white">{STORE_CONFIG.name}</p>
              <p>{STORE_CONFIG.address} · Apenas retirada na loja</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl('Olá! Vim pelo catálogo digital da Nexus.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#FDBA74]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp {STORE_CONFIG.whatsappDisplay}</span>
            </a>
            <span aria-hidden="true">·</span>
            <span>Pix: {STORE_CONFIG.pixKey}</span>
          </div>
        </div>
      </footer>

      {/* Offcanvas Shopping Bag & WhatsApp Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
