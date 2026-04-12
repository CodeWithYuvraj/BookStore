import { useState } from "react"
import { Search, UserPlus, Shield, Ban, Mail, MoreHorizontal, UserCheck } from "lucide-react"
import { Button } from "../ui/Button"

const MOCK_USERS = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "Oct 20, 2023" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "Seller", status: "Active", joined: "Oct 22, 2023" },
  { id: "u3", name: "Charlie Davis", email: "charlie@example.com", role: "User", status: "Banned", joined: "Oct 25, 2023" },
  { id: "u4", name: "Diana Prince", email: "diana@example.com", role: "User", status: "Active", joined: "Nov 01, 2023" },
]

export const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground text-sm">Monitor user activity and manage account permissions.</p>
        </div>
        <Button className="rounded-xl gap-2"><UserPlus className="h-4 w-4" /> Invite Staff</Button>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            className="w-full h-10 bg-background border border-input rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                   <MoreHorizontal className="h-4 w-4" />
                </Button>
             </div>
             <div>
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  {user.name}
                  {user.role === 'Admin' && <Shield className="h-3.5 w-3.5 text-blue-500" />}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Role</span>
                      <span className="text-sm font-semibold">{user.role}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Joined</span>
                      <span className="text-sm font-semibold">{user.joined}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                     user.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'
                   }`}>
                     {user.status}
                   </span>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs gap-1.5"><Mail className="h-3 w-3" /> Mail</Button>
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs gap-1.5 text-destructive hover:bg-destructive/10">
                        {user.status === 'Banned' ? <UserCheck className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                        {user.status === 'Banned' ? "Unban" : "Ban"}
                      </Button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
