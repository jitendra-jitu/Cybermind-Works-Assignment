
import React from "react";

interface CompanyLogoProps {
  company: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company }) => {
  const logoMap: { [key: string]: { bg: string; text: string } } = {
    amazon: { bg: "bg-gray-800", text: "text-white" },
    tesla: { bg: "bg-gray-100", text: "text-black" },
    hubspot: { bg: "bg-orange-500", text: "text-white" },
    default: { bg: "bg-blue-500", text: "text-white" },
  };

  const logo = logoMap[company] || logoMap.default;

  const getInitial = () => {
    switch (company) {
      case 'amazon':
        return 'A';
      case 'tesla':
        return 'T';
      case 'hubspot':
        return 'H';
      default:
        return 'C';
    }
  };

  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${logo.bg} ${logo.text}`}>
      {getInitial()}
    </div>
  );
};

export default CompanyLogo;
