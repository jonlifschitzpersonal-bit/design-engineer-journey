import { Check, DollarSign, Minus, MoveDown, MoveRight, MoveUp, Package, Percent, Plus, Users } from "lucide-react";

// Figma: 02 - Components › Icon (16×16, trazo de 1,5px, basado en Lucide).
// Las claves son los valores de la variante `name` de Figma.
// Cuando el nombre difiere, la equivalencia sale de la descripción del componente.
const ICONS = {
  plus: Plus,
  "arrow-right": MoveRight,
  check: Check,
  "arrow-up": MoveUp,
  "arrow-down": MoveDown,
  minus: Minus,
  users: Users,
  currency: DollarSign,
  percent: Percent,
  package: Package,
};

export function Icon({ name = "plus", className = "" }) {
  const LucideIcon = ICONS[name];

  // El trazo de 1,5px y el color (currentColor) los pone la clase `icon` en el CSS.
  return <LucideIcon size={16} className={`icon ${className}`} aria-hidden="true" focusable="false" />;
}
