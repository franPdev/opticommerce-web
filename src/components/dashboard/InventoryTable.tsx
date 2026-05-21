import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Product, ProductCategory, StockStatus } from '../../types/inventory.types';
import { formatCurrency, getStatusLabel, getCategoryLabel } from '../../utils/formatters';

interface InventoryTableProps {
  products: Product[];
  compact?: boolean;
}

const statusVariantMap: Record<StockStatus, 'success' | 'warning' | 'danger' | 'violet' | 'info' | 'neutral'> = {
  healthy: 'success',
  low: 'warning',
  critical: 'danger',
  overstock: 'violet',
  expiring: 'warning',
  out_of_stock: 'danger',
};

export const InventoryTable: React.FC<InventoryTableProps> = ({ products, compact = false }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StockStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
    });

    return result;
  }, [products, search, statusFilter, categoryFilter, sortField, sortDir]);

  const toggleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const displayProducts = compact ? filtered.slice(0, 8) : filtered;

  return (
    <Card variant="glass" padding="none" className="animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="border-b border-border-default" style={{ padding: '2rem' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Inventario</h3>
            <p className="text-xs text-text-muted mt-0.5">{filtered.length} de {products.length} productos</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-bg-elevated rounded-lg px-3 py-1.5 border border-border-default flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs text-text-primary placeholder-text-muted outline-none w-full sm:w-32"
              />
            </div>
            {!compact && (
              <>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StockStatus | 'all')}
                  className="bg-bg-elevated border border-border-default rounded-lg px-2 py-1.5 text-xs text-text-secondary outline-none cursor-pointer"
                >
                  <option value="all">Estado</option>
                  <option value="healthy">Saludable</option>
                  <option value="low">Stock Bajo</option>
                  <option value="critical">Crítico</option>
                  <option value="overstock">Sobrestock</option>
                  <option value="expiring">Por Vencer</option>
                  <option value="out_of_stock">Sin Stock</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | 'all')}
                  className="bg-bg-elevated border border-border-default rounded-lg px-2 py-1.5 text-xs text-text-secondary outline-none cursor-pointer"
                >
                  <option value="all">Categoría</option>
                  <option value="electronics">Electrónica</option>
                  <option value="clothing">Ropa</option>
                  <option value="food">Alimentos</option>
                  <option value="beverages">Bebidas</option>
                  <option value="home">Hogar</option>
                  <option value="beauty">Belleza</option>
                  <option value="sports">Deportes</option>
                  <option value="toys">Juguetes</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default">
              {[
                { key: 'name', label: 'Producto' },
                { key: 'category', label: 'Categoría' },
                { key: 'currentStock', label: 'Stock' },
                { key: 'price', label: 'Precio' },
                { key: 'salesVelocity', label: 'Vel. Venta' },
                { key: 'daysOfSupply', label: 'Días Stock' },
                { key: 'status', label: 'Estado' },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-8 py-5 text-left text-[11px] font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-secondary transition-colors"
                  onClick={() => toggleSort(col.key as keyof Product)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border-default/50 hover:bg-bg-elevated/50 transition-colors"
              >
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{product.name}</p>
                    <p className="text-[11px] text-text-muted">{product.sku}</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs text-text-secondary">{getCategoryLabel(product.category)}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-sm font-semibold ${
                    product.currentStock === 0 ? 'text-danger-400' :
                    product.currentStock <= product.minStock ? 'text-warning-400' :
                    'text-text-primary'
                  }`}>
                    {product.currentStock}
                  </span>
                  <span className="text-[11px] text-text-muted"> / {product.maxStock}</span>
                </td>
                <td className="px-8 py-5 text-sm text-text-primary">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-8 py-5 text-sm text-text-secondary">
                  {product.salesVelocity}/día
                </td>
                <td className="px-8 py-5">
                  <span className={`text-sm font-medium ${
                    product.daysOfSupply <= 5 ? 'text-danger-400' :
                    product.daysOfSupply <= 15 ? 'text-warning-400' :
                    'text-text-secondary'
                  }`}>
                    {product.daysOfSupply}d
                  </span>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={statusVariantMap[product.status]} dot>
                    {getStatusLabel(product.status)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compact && filtered.length > 8 && (
        <div className="p-3 text-center border-t border-border-default">
          <span className="text-xs text-text-muted">
            +{filtered.length - 8} productos más
          </span>
        </div>
      )}
    </Card>
  );
};
