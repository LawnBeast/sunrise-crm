import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  DollarSign, 
  Settings,
  CreditCard,
  HelpCircle,
  Ruler,
  Bot,
  Phone,
  Rocket
} from "lucide-react";

interface CRMSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const CRMSidebar = ({ activeSection, onSectionChange }: CRMSidebarProps) => {
  const menuItems = [
    {
      id: "getting-started",
      label: "Getting Started",
      icon: Rocket,
      color: "text-blue-600"
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600"
    },
    {
      id: "ai-phone",
      label: "AI Phone Service",
      icon: Bot,
      color: "text-purple-600"
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2,
      color: "text-green-600"
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users,
      color: "text-indigo-600"
    },
    {
      id: "deals",
      label: "Deals",
      icon: DollarSign,
      color: "text-yellow-600"
    },
    {
      id: "measurements",
      label: "Measurements",
      icon: Ruler,
      color: "text-emerald-600"
    },
    {
      id: "pricing",
      label: "Pricing & Plans",
      icon: CreditCard,
      color: "text-orange-600"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "text-gray-600"
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      color: "text-pink-600"
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Sunrise Maintenance</h2>
        <p className="text-sm text-gray-600">Business Management CRM</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10",
                  isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className={cn("w-4 h-4 mr-3", isActive ? "text-blue-600" : item.color)} />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-lg text-sm">
          <div className="flex items-center gap-2 mb-1">
            <Phone className="w-4 h-4" />
            <p className="font-medium">AI Phone Active</p>
          </div>
          <p className="text-xs opacity-90">24/7 call answering enabled</p>
        </div>
      </div>
    </div>
  );
};