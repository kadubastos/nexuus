import { useState } from 'react';
import { MapPin, Phone, QrCode, Copy, Check, Send, Clock } from 'lucide-react';
import { STORE_CONFIG, buildWhatsAppUrl } from '../data/catalog';

export function QuoteSection() {
  const [quoteName, setQuoteName] = useState('');
  const [quoteType, setQuoteType] = useState('Lista Escolar');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(STORE_CONFIG.pixKey);
      setCopiedPix(true);
      window.setTimeout(() => setCopiedPix(false), 2000);
    } catch {
      setCopiedPix(false);
    }
  };

  const quoteMessage = [
    `*SOLICITAÇÃO DE ORÇAMENTO — ${STORE_CONFIG.name.toUpperCase()}*`,
    '',
    `*Tipo:* ${quoteType}`,
    quoteName.trim() ? `*Nome:* ${quoteName.trim()}` : '*Nome:* Cliente do Catálogo',
    quoteDetails.trim()
      ? `*Detalhes:* ${quoteDetails.trim()}`
      : '*Detalhes:* Gostaria de fazer um orçamento para retirada na loja.',
  ].join('\n');

  const quoteHref = buildWhatsAppUrl(quoteMessage);

  return (
    <section
      id="orcamento"
      className="border-t border-[#E8E3DC] bg-[#0F3D2E] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Institutional Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FDBA74]">
                Atendimento Personalizado & Encomendas
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance">
                Faça aqui seu orçamento
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-white/85">
                Precisa cotar lista de material escolar, suprimentos para sua empresa, impressões em quantidade ou kits de presentes de fim de ano? Envie sua lista diretamente para nossa equipe no WhatsApp.
              </p>
            </div>

            {/* Store Info Cards */}
            <div className="space-y-4 border-t border-white/15 pt-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#FDBA74]" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white">
                    Endereço para Retirada de Pedidos
                  </h3>
                  <p className="mt-0.5 text-sm text-white/85">
                    {STORE_CONFIG.address} — Atendimento presencial (não realizamos entregas)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-[#FDBA74]" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white">
                    WhatsApp Oficial
                  </h3>
                  <a
                    href={buildWhatsAppUrl('Olá, equipe Nexus! Gostaria de tirar uma dúvida.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-block text-sm font-semibold text-white underline decoration-[#FDBA74]/60 underline-offset-4 hover:text-[#FDBA74]"
                  >
                    {STORE_CONFIG.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <QrCode className="mt-1 h-5 w-5 shrink-0 text-[#FDBA74]" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      Chave Pix da Loja (Telefone)
                    </h3>
                    <p className="mt-0.5 text-sm text-white/85 tabular-nums">
                      {STORE_CONFIG.pixKey}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#86EFAC]" />
                        <span>Pix copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar Chave</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#FDBA74]" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white">
                    Retirada Rápida no Balcão
                  </h3>
                  <p className="mt-0.5 text-sm text-white/80">
                    Envie seu pedido pelo catálogo e passe na loja apenas para retirar e conferir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Quote Builder */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-2xl bg-white p-6 text-[#1A1614] shadow-xl sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#1A1614]">
                  Orçamento Direto no WhatsApp
                </h3>
                <p className="mt-1.5 text-sm text-[#57534E]">
                  Escolha o assunto e escreva o que precisa. A mensagem já vai pronta para o nosso atendimento.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <span className="block text-xs font-semibold text-[#57534E]">
                      Tipo de orçamento
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {[
                        'Lista Escolar',
                        'Suprimentos p/ Empresa',
                        'Impressões e Cópias',
                        'Kits de Natal',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setQuoteType(option)}
                          className={`min-h-[38px] rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                            quoteType === option
                              ? 'border-[#0F3D2E] bg-[#0F3D2E] text-white'
                              : 'border-[#E8E3DC] bg-[#FAF9F7] text-[#57534E] hover:border-[#D6D0C4]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-[#57534E]"
                    >
                      Seu nome
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="Como podemos te chamar?"
                      className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] px-3.5 py-2 text-sm text-[#1A1614] placeholder:text-[#A8A29E] focus:border-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-details"
                      className="block text-xs font-semibold text-[#57534E]"
                    >
                      Itens ou serviços desejados
                    </label>
                    <textarea
                      id="quote-details"
                      rows={3}
                      value={quoteDetails}
                      onChange={(e) => setQuoteDetails(e.target.value)}
                      placeholder="Ex.: 3 cadernos 10 matérias, 1 caixa de lápis de cor, 50 impressões coloridas..."
                      className="mt-1.5 w-full rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] px-3.5 py-2.5 text-sm text-[#1A1614] placeholder:text-[#A8A29E] focus:border-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#E11D74] via-[#B91C1C] to-[#F97316] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar Orçamento via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
