import { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  CreditCard,
  QrCode,
} from 'lucide-react';
import {
  CartItem,
  PaymentMethod,
  STORE_CONFIG,
  formatBRL,
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
} from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [orderReadyMessage, setOrderReadyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(STORE_CONFIG.pixKey);
      setCopiedPix(true);
      window.setTimeout(() => setCopiedPix(false), 2000);
    } catch {
      setCopiedPix(false);
    }
  };

  const handleCopyMessage = async (msg: string) => {
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedMsg(true);
      window.setTimeout(() => setCopiedMsg(false), 2000);
    } catch {
      setCopiedMsg(false);
    }
  };

  const isNameValid = customerName.trim().length >= 2;
  const generatedMessage = isNameValid
    ? buildWhatsAppOrderMessage({
        items,
        total: totalAmount,
        customerName,
        paymentMethod,
        notes,
      })
    : '';
  const whatsappHref = isNameValid ? buildWhatsAppUrl(generatedMessage) : '#';

  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isNameValid) {
      e.preventDefault();
      setNameError('Por favor, informe seu nome completo para identificar a retirada.');
      return;
    }
    setNameError('');
    setOrderReadyMessage(generatedMessage);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1614]/55 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FAF9F7] shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E8E3DC] bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#0F3D2E]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-display text-lg font-semibold text-[#1A1614]"
            >
              Sua Sacola ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#57534E] transition-colors hover:bg-[#F3F1EC] hover:text-[#1A1614] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFECE6] text-[#78716C]">
                <ShoppingBag className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#1A1614]">
                Sua sacola está vazia
              </h3>
              <p className="mt-1.5 max-w-xs text-sm text-[#57534E]">
                Adicione ofertas de Black Friday, decorações de Natal ou materiais de papelaria para montar seu pedido.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 min-h-[44px] rounded-lg bg-[#0F3D2E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14523E] cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Produtos Selecionados
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClearCart();
                      setOrderReadyMessage(null);
                    }}
                    className="text-xs font-medium text-[#B91C1C] hover:underline cursor-pointer"
                  >
                    Limpar sacola
                  </button>
                </div>

                <ul className="divide-y divide-[#E8E3DC] rounded-xl border border-[#E8E3DC] bg-white">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 shrink-0 rounded-lg bg-[#F3F1EC] object-cover object-center"
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[#1A1614] leading-snug line-clamp-2">
                            {product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remover ${product.name}`}
                            className="shrink-0 p-1 text-[#78716C] hover:text-[#B91C1C] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-md border border-[#E8E3DC] bg-[#FAF9F7]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              aria-label="Diminuir"
                              className="flex h-8 w-8 items-center justify-center text-[#1A1614] hover:bg-[#EFECE6] cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              aria-label="Aumentar"
                              className="flex h-8 w-8 items-center justify-center text-[#1A1614] hover:bg-[#EFECE6] cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-bold text-[#1A1614] tabular-nums">
                            {formatBRL(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Pickup Notice */}
              <div className="rounded-xl border border-[#C59B27]/50 bg-[#FEF9E7] p-3.5 text-sm text-[#4A3803]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Atenção: Somente Retirada na Loja</p>
                    <p className="mt-0.5 text-xs leading-relaxed">
                      <strong>Não realizamos entregas.</strong> Seu pedido ficará separado para retirada presencial em: <strong>{STORE_CONFIG.address}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Checkout Form */}
              <div className="space-y-4 rounded-xl border border-[#E8E3DC] bg-white p-4">
                <h3 className="font-display text-base font-semibold text-[#1A1614]">
                  Dados para Retirada
                </h3>

                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-semibold text-[#57534E]"
                  >
                    Nome completo *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (e.target.value.trim().length >= 2) setNameError('');
                    }}
                    placeholder="Ex.: Maria Oliveira"
                    className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] px-3.5 py-2 text-sm text-[#1A1614] placeholder:text-[#A8A29E] focus:border-[#0F3D2E] focus:bg-white focus:outline-none"
                  />
                  {nameError && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#B91C1C]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <span className="block text-xs font-semibold text-[#57534E]">
                    Forma de Pagamento *
                  </span>
                  <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`flex min-h-[48px] items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'border-[#0F3D2E] bg-[#0F3D2E]/8 text-[#0F3D2E]'
                          : 'border-[#E8E3DC] bg-[#FAF9F7] text-[#57534E] hover:border-[#D6D0C4]'
                      }`}
                    >
                      <QrCode className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Pix (Antecipado ou na loja)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('loja')}
                      className={`flex min-h-[48px] items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMethod === 'loja'
                          ? 'border-[#0F3D2E] bg-[#0F3D2E]/8 text-[#0F3D2E]'
                          : 'border-[#E8E3DC] bg-[#FAF9F7] text-[#57534E] hover:border-[#D6D0C4]'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Dinheiro / Cartão na loja</span>
                    </button>
                  </div>

                  {paymentMethod === 'pix' && (
                    <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg border border-[#E8E3DC] bg-[#FAF9F7] px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-[#78716C]">
                          Chave Pix (Telefone da loja)
                        </p>
                        <p className="text-sm font-bold text-[#1A1614] tabular-nums">
                          {STORE_CONFIG.pixKey}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-md border border-[#D6D0C4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1A1614] hover:bg-[#F3F1EC] cursor-pointer"
                      >
                        {copiedPix ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#15803D]" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copiar Pix</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Optional Notes */}
                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="block text-xs font-semibold text-[#57534E]"
                  >
                    Observações (opcional)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: Cor do pisca-pisca branco quente, retiro às 16h"
                    className="mt-1.5 w-full min-h-[42px] rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] px-3.5 py-2 text-sm text-[#1A1614] placeholder:text-[#A8A29E] focus:border-[#0F3D2E] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Preview after clicking finalize */}
              {orderReadyMessage && (
                <div className="rounded-xl border border-[#15803D]/30 bg-[#F0FDF4] p-3.5 text-xs text-[#14532D]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold">Resumo pronto para WhatsApp</span>
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(orderReadyMessage)}
                      className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 font-semibold text-[#14532D] border border-[#BBF7D0] cursor-pointer"
                    >
                      {copiedMsg ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copiar texto</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed text-[11px] opacity-90">
                    {orderReadyMessage}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E3DC] bg-white px-5 py-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-[#57534E]">Total do pedido</span>
              <span className="text-xl font-bold text-[#1A1614] tabular-nums">
                {formatBRL(totalAmount)}
              </span>
            </div>

            <a
              href={whatsappHref}
              target={isNameValid ? '_blank' : undefined}
              rel={isNameValid ? 'noopener noreferrer' : undefined}
              onClick={handleCheckoutClick}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#14523E]"
            >
              <span>Finalizar Pedido no WhatsApp</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
