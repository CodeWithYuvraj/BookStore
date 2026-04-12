import { useState } from "react"
import { Search, Package, ExternalLink, Download, Clock, CheckCircle2, Truck } from "lucide-react"
import { Button } from "../ui/Button"

const MOCK_ORDERS = [
  { id: "#BKV-9842", customer: "Alice Johnson", date: "Oct 12, 2023", total: 101.51, status: "Delivered", method: "Credit Card" },
  { id: "#BKV-8211", customer: "Bob Smith", date: "Oct 15, 2023", total: 45.00, status: "Shipped", method: "PayPal" },
  { id: "#BKV-7529", customer: "Charlie Davis", date: "Oct 18, 2023", total: 29.99, status: "Processing", method: "Credit Card" },
  { id: "#BKV-6210", customer: "Diana Prince", date: "Oct 20, 2023", total: 156.20, status: "Processing", method: "Apple Pay" },
]

export const OrderManager = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order Management</h2>
          <p className="text-muted-foreground text-sm">Track and fulfill platform-wide transactions.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="rounded-xl flex-1 sm:flex-none gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer, or Status..." 
            className="w-full h-10 bg-background border border-input rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Package className="h-4 w-4" />
                       </div>
                       <span className="font-bold text-foreground text-sm">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                       {order.status === 'Delivered' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                       {order.status === 'Shipped' && <Truck className="h-4 w-4 text-blue-500" />}
                       {order.status === 'Processing' && <Clock className="h-4 w-4 text-amber-500" />}
                       <span className={`text-[10px] font-bold uppercase tracking-widest ${
                         order.status === 'Delivered' ? 'text-green-600' : 
                         order.status === 'Shipped' ? 'text-blue-500' : 'text-amber-500'
                       }`}>
                         {order.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Button variant="ghost" size="sm" className="h-8 rounded-lg gap-2 text-primary hover:bg-primary/5">
                        Details <ExternalLink className="h-3 w-3" />
                     </Button>
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
