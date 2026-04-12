import { useState } from "react"
import { Search, Filter, Plus, Edit2, Trash2, AlertTriangle, MoreVertical } from "lucide-react"
import { Button } from "../ui/Button"

const MOCK_INVENTORY = [
  { id: "1", title: "The Design of Everyday Things", stock: 42, price: 24.99, status: "In Stock" },
  { id: "2", title: "Clean Code", stock: 8, price: 34.50, status: "Low Stock" },
  { id: "3", title: "Thinking, Fast and Slow", stock: 0, price: 19.99, status: "Out of Stock" },
  { id: "4", title: "Sapiens", stock: 115, price: 22.00, status: "In Stock" },
  { id: "5", title: "Atomic Habits", stock: 64, price: 16.99, status: "In Stock" },
]

export const InventoryManager = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory Manager</h2>
          <p className="text-muted-foreground text-sm">Manage stock levels, pricing, and product availability.</p>
        </div>
        <Button className="rounded-xl gap-2"><Plus className="h-4 w-4" /> Add New Book</Button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search titles, authors, or ISBN..." 
            className="w-full h-10 bg-background border border-input rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl gap-2 px-4"><Filter className="h-4 w-4" /> Filter</Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Book Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock Level</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 text-sm">
                    <div className="font-bold text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">ID: {item.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                       {item.stock}
                       {item.stock < 10 && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      item.status === 'In Stock' ? 'bg-green-500/10 text-green-600' : 
                      item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 hover:text-primary">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
