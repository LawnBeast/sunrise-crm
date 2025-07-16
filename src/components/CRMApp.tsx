import { useState } from "react";
import { CRMSidebar } from "./CRMSidebar";
import { CRMDashboard } from "./CRMDashboard";
import { AIPhoneDashboard } from "./AIPhoneDashboard";
import { CompanyList } from "./CompanyList";
import { ContactList } from "./ContactList";
import { DealList } from "./DealList";
import { PricingPlans } from "./PricingPlans";
import { MeasurementsPage } from "./MeasurementsPage";
import { GettingStarted } from "./GettingStarted";

export const CRMApp = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return <GettingStarted onNavigate={setActiveSection} />;
      case "dashboard":
        return <CRMDashboard />;
      case "ai-phone":
        return <AIPhoneDashboard />;
      case "companies":
        return <CompanyList />;
      case "contacts":
        return <ContactList />;
      case "deals":
        return <DealList />;
      case "measurements":
        return <MeasurementsPage />;
      case "pricing":
        return <PricingPlans />;
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Sunrise Maintenance Settings</h1>
            <p>Configure your business settings here.</p>
          </div>
        );
      case "help":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
            <p>Contact Sunrise Maintenance support team for assistance.</p>
          </div>
        );
      default:
        return <GettingStarted onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CRMSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};