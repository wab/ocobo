import React, { useEffect } from 'react';

// Type definition for AGO configuration
interface AGOConfig {
  basepath: string;
  widgetApiKey: string;
  title: string;
  icon: string;
  prompt: string;
  colors: {
    button: string;
    header: string;
    agentMessage: string;
    agentMessageFont: string;
    background?: string;
    font?: string;
    userMessage?: string;
    userMessageFont?: string;
  };
  hideFooter?: boolean;
}

// Extend Window interface to include AGO
declare global {
  interface Window {
    AGO?: AGOConfig;
  }
}

const AgoChatbot: React.FC = () => {
  useEffect(() => {
    // Set AGO configuration on window object
    window.AGO = {
      basepath: "https://ocobo.useago.com/",
      widgetApiKey: "widget-api-key-ocobo",
      title: "🤖 Ocobot",
      icon: "https://media.licdn.com/dms/image/v2/D4E0BAQELEQbhWlOLCA/company-logo_200_200/company-logo_200_200/0/1716484672248/ocobofr_logo?e=1763596800&v=beta&t=AGsBXIuLYBJJrtvc35jvRkKOyrfqnpTvNsNttVOAJrM",
      prompt: "👋 Posez vos questions à l'IA — Ocobot vous explique notre approche, sans pitch de vente. ",
      colors: {
        button: "#232323",
        header: "#232323",
        agentMessage: "#f7f5f2ff",//agentMessage: "#f7c052",
        agentMessageFont: '#232323',
      },
    };

    // Create and load the external script
    const script = document.createElement('script');
    script.src = "https://useago.github.io/widgetjs/frame.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
      delete window.AGO;
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default AgoChatbot;