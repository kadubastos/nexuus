import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check, Package } from 'lucide-react';
import { Product, formatBRL } from '../data/catalog';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onAdd,
  onUpdateQuantity,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  const hasDiscount =
    typeof product.originalPrice === 'number' && product.originalPrice > product.price;

  return (
    <article className="group flex flex-col justify-between bg-white rounded-xl border border-[#E8E3DC] overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Product Image Container — 1:1 uniform aspect ratio cleanly crops WhatsApp status bars */}
        <div className="relative aspect-square w-full bg-[#F3F1EC] overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                product.isRealStorePhoto
                  ? 'object-cover object-center scale-[1.04]'
                  : 'object-cover object-center'
              }`}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F6F3EE] to-[#EAE4DA] p-6 text-center">
              <Package className="h-8 w-8 text-[#8C857B]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#57534E]">{product.name}</span>
            </div>
          )}

          {product.tag && (
            <div className="pointer-events-none absolute top-2.5 left-2.5">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-tight shadow-sm ${
                  hasDiscount || product.category === 'black-friday'
                    ? 'bg-[#B91C1C] text-white'
                    : 'bg-white/95 text-[#1A1614] border border-[#E8E3DC]'
                }`}
              >
                {product.tag}
              </span>
            </div>
          )}
        </div>

        {/* Product Metadata */}
        <div className="p-4 pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] truncate">
            {product.categoryLabel}
          </p>
          <h3 className="mt-1 font-sans text-[15px] font-semibold leading-snug text-[#1A1614] line-clamp-2 min-h-[2.625rem]">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#57534E] line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Bag Action */}
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold tracking-tight text-[#1A1614] tabular-nums">
            {formatBRL(product.price)}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-[#78716C] line-through tabular-nums">
              {formatBRL(product.originalPrice)}
            </span>
          )}
        </div>

        {quantityInCart === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#14523E] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E] cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Adicionado</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Adicionar à Sacola</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#0F3D2E] bg-[#0F3D2E]/5 px-2">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, -1)}
              aria-label={`Diminuir quantidade de ${product.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#0F3D2E] transition-colors hover:bg-[#0F3D2E]/10 cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-[#0F3D2E] tabular-nums">
              {quantityInCart} na sacola
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, 1)}
              aria-label={`Aumentar quantidade de ${product.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#0F3D2E] transition-colors hover:bg-[#0F3D2E]/10 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
