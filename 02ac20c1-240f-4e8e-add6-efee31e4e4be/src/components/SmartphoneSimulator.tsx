import React, { useEffect, useState, Component } from 'react';
import {
  Settings,
  Folder,
  User,
  Mail,
  Camera,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Check,
  FileText,
  MessageCircle,
  Phone,
  Video,
  PhoneOff,
  Send,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Info,
  Sun,
  Volume2,
  BatteryMedium,
  MicOff,
  RefreshCcw,
  ArrowUp,
  HeartPulse } from
'lucide-react';
export type ScreenState =
'home' |
'settings' |
'wifi_off' |
'wifi_on' |
'files' |
'document' |
'contacts' |
'contact_card' |
'video_call' |
'inbox' |
'scam_email' |
'real_email' |
'health_chat';
interface SmartphoneSimulatorProps {
  screenState: ScreenState;
  onStateChange?: (newState: ScreenState) => void;
}
// iOS System Colors
const colors = {
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
  orange: '#FF9500',
  gray: '#8E8E93',
  grayLight: '#E5E5EA',
  bgGrouped: '#F2F2F7',
  separator: 'rgba(60,60,67,0.15)'
};
export function SmartphoneSimulator({
  screenState,
  onStateChange
}: SmartphoneSimulatorProps) {
  const [currentTime, setCurrentTime] = useState('9:41');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  const navigate = (state: ScreenState) => {
    if (onStateChange) onStateChange(state);
  };
  // --- iOS UI Components ---
  const IosStatusBar = ({ dark = false }: {dark?: boolean;}) =>
  <div
    className={`absolute top-0 w-full h-14 z-50 flex items-center justify-between px-8 pointer-events-none ${dark ? 'text-white' : 'text-black'}`}>
    
      <span className="text-[16px] font-semibold tracking-tight mt-1 ml-1">
        {currentTime}
      </span>
      <div className="flex items-center gap-1.5 mt-1 mr-1">
        {/* iOS Signal Bars */}
        <div className="flex items-end gap-[2px] h-[12px] pb-[1px]">
          <div
          className={`w-[3px] h-[4px] rounded-sm ${dark ? 'bg-white' : 'bg-black'}`} />
        
          <div
          className={`w-[3px] h-[6px] rounded-sm ${dark ? 'bg-white' : 'bg-black'}`} />
        
          <div
          className={`w-[3px] h-[8px] rounded-sm ${dark ? 'bg-white' : 'bg-black'}`} />
        
          <div
          className={`w-[3px] h-[10px] rounded-sm ${dark ? 'bg-white' : 'bg-black'}`} />
        
        </div>
        {/* iOS Wi-Fi */}
        <Wifi size={16} strokeWidth={2.5} className="mb-[1px]" />
        {/* iOS Battery */}
        <div className="relative flex items-center">
          <div
          className={`w-[23px] h-[12px] border border-current rounded-[4px] p-[1px] opacity-40 absolute`} />
        
          <div
          className={`w-[23px] h-[12px] border border-current rounded-[4px] p-[1px]`} />
        
          <div
          className={`w-[15px] h-[8px] rounded-[2px] ml-[2px] absolute ${dark ? 'bg-white' : 'bg-black'}`} />
        
          <div
          className={`w-[1.5px] h-[4px] rounded-r-sm absolute -right-[1.5px] ${dark ? 'bg-white' : 'bg-black'} opacity-40`} />
        
        </div>
      </div>
    </div>;

  const NavBar = ({
    title,
    backText,
    backTo,
    rightElement,
    border = true






  }: {title?: string;backText?: string;backTo?: ScreenState;rightElement?: React.ReactNode;border?: boolean;}) =>
  <div
    className={`flex items-center justify-between px-2 pt-12 pb-2 min-h-[88px] bg-white/85 backdrop-blur-xl z-10 sticky top-0 ${border ? 'border-b border-[rgba(60,60,67,0.15)]' : ''}`}>
    
      <div className="flex-1 flex justify-start">
        {backTo &&
      <button
        onClick={() => navigate(backTo)}
        className="flex items-center text-[#007AFF] active:opacity-50 px-2 py-1">
        
            <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1" />
            <span className="text-[17px] font-normal tracking-tight -ml-1">
              {backText || 'Back'}
            </span>
          </button>
      }
      </div>
      <h1 className="text-[17px] font-semibold tracking-tight text-center flex-1 truncate px-2">
        {title}
      </h1>
      <div className="flex-1 flex justify-end px-2">{rightElement}</div>
    </div>;

  const LargeTitle = ({ title }: {title: string;}) =>
  <h1 className="text-[34px] font-bold tracking-tight text-black px-4 pb-2 bg-white/85 backdrop-blur-xl">
      {title}
    </h1>;

  const IosToggle = ({
    isOn,
    onClick



  }: {isOn: boolean;onClick: () => void;}) =>
  <button
    onClick={onClick}
    className={`w-[51px] h-[31px] rounded-full relative transition-colors duration-300 ease-in-out ${isOn ? 'bg-[#34C759]' : 'bg-[#E9E9EA]'}`}>
    
      <div
      className={`w-[27px] h-[27px] bg-white rounded-full absolute top-[2px] shadow-[0_3px_8px_rgba(0,0,0,0.15),0_1px_1px_rgba(0,0,0,0.16),0_3px_1px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
    
    </button>;

  const GroupedList = ({
    children,
    className = ''



  }: {children: React.ReactNode;className?: string;}) =>
  <div className={`bg-white rounded-[10px] overflow-hidden ${className}`}>
      {children}
    </div>;

  const SettingsRow = ({
    icon,
    iconBg,
    label,
    value,
    onClick,
    isLast = false,
    showChevron = true








  }: {icon: React.ReactNode;iconBg: string;label: string;value?: string;onClick: () => void;isLast?: boolean;showChevron?: boolean;}) =>
  <button
    onClick={onClick}
    className={`w-full flex items-center bg-white active:bg-[#D1D1D6] transition-colors min-h-[44px] ${!isLast ? 'ios-inset-separator' : ''}`}>
    
      <div className="pl-4 pr-3 py-2">
        <div
        className={`w-[28px] h-[28px] ${iconBg} rounded-[6px] flex items-center justify-center text-white`}>
        
          {icon}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between pr-4 py-2 min-h-[44px]">
        <span className="text-[17px] text-black tracking-tight">{label}</span>
        <div className="flex items-center gap-2">
          {value &&
        <span className="text-[17px] text-[#8E8E93] tracking-tight">
              {value}
            </span>
        }
          {showChevron && <ChevronRight size={20} className="text-[#C7C7CC]" />}
        </div>
      </div>
    </button>;

  // --- Screens ---
  const Home = () =>
  <div className="h-full w-full bg-gradient-to-b from-[#2B4162] via-[#FA9C7A] to-[#E0C3FC] pt-16 px-6 relative">
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-8">
        <AppIcon
        icon={<Settings size={32} className="text-white" />}
        label="Settings"
        onClick={() => navigate('settings')}
        bg="bg-gradient-to-b from-[#8E8E93] to-[#636366]" />
      
        <AppIcon
        icon={<Folder size={32} className="text-white" />}
        label="Files"
        onClick={() => navigate('files')}
        bg="bg-gradient-to-b from-[#007AFF] to-[#0056B3]" />
      
        <AppIcon
        icon={<User size={32} className="text-white" />}
        label="Contacts"
        onClick={() => navigate('contacts')}
        bg="bg-gradient-to-b from-[#8E8E93] to-[#636366]" />
      
        <AppIcon
        icon={<Mail size={32} className="text-white" />}
        label="Mail"
        onClick={() => navigate('inbox')}
        bg="bg-gradient-to-b from-[#5AC8FA] to-[#007AFF]" />
      
        <AppIcon
        icon={
        <div className="relative">
              <HeartPulse size={32} className="text-[#FF2D55]" />
              <Sparkles
            size={14}
            className="absolute -top-1 -right-1 text-[#FF9500]" />
          
            </div>
        }
        label="Health AI"
        onClick={() => navigate('health_chat')}
        bg="bg-white" />
      
        <AppIcon
        icon={<Camera size={32} className="text-black" />}
        label="Camera"
        onClick={() => navigate('video_call')}
        bg="bg-gradient-to-b from-[#E5E5EA] to-[#D1D1D6]" />
      
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-4 right-4 h-[84px] bg-white/30 backdrop-blur-2xl rounded-[32px] flex items-center justify-around px-4">
        <AppIcon
        icon={<Phone size={32} className="text-white" fill="currentColor" />}
        label=""
        onClick={() => {}}
        bg="bg-gradient-to-b from-[#34C759] to-[#28A745]" />
      
        <AppIcon
        icon={
        <MessageCircle
          size={32}
          className="text-white"
          fill="currentColor" />

        }
        label=""
        onClick={() => {}}
        bg="bg-gradient-to-b from-[#34C759] to-[#28A745]" />
      
        <AppIcon
        icon={
        <div className="w-8 h-8 border-4 border-blue-400 rounded-full flex items-center justify-center">
              <div className="w-1 h-8 bg-red-400 rotate-45 absolute" />
              <div className="w-1 h-8 bg-white -rotate-45 absolute" />
            </div>
        }
        label=""
        onClick={() => {}}
        bg="bg-white" />
      
        <AppIcon
        icon={<Settings size={32} className="text-white" />}
        label=""
        onClick={() => navigate('settings')}
        bg="bg-gradient-to-b from-[#8E8E93] to-[#636366]" />
      
      </div>
    </div>;

  const AppIcon = ({
    icon,
    label,
    onClick,
    bg





  }: {icon: React.ReactNode;label: string;onClick: () => void;bg: string;}) =>
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform">
    
      <div
      className={`w-[60px] h-[60px] ${bg} ios-squircle flex items-center justify-center shadow-sm`}>
      
        {icon}
      </div>
      {label &&
    <span className="text-[11px] font-medium text-white ios-text-shadow tracking-wide">
          {label}
        </span>
    }
    </button>;

  const SettingsScreen = () =>
  <div className="h-full bg-[#F2F2F7]">
      <NavBar backTo="home" backText="Home" border={false} />
      <LargeTitle title="Settings" />
      <div className="px-4 mt-2 space-y-4">
        <GroupedList>
          <SettingsRow
          icon={<Wifi size={18} />}
          iconBg="bg-[#007AFF]"
          label="Wi-Fi"
          value="Off"
          onClick={() => navigate('wifi_off')} />
        
          <SettingsRow
          icon={<Sun size={18} />}
          iconBg="bg-[#007AFF]"
          label="Display & Brightness"
          onClick={() => {}} />
        
          <SettingsRow
          icon={<Volume2 size={18} />}
          iconBg="bg-[#FF2D55]"
          label="Sounds & Haptics"
          onClick={() => {}} />
        
          <SettingsRow
          icon={<BatteryMedium size={18} />}
          iconBg="bg-[#34C759]"
          label="Battery"
          onClick={() => {}}
          isLast />
        
        </GroupedList>
      </div>
    </div>;

  const WifiOffScreen = () =>
  <div className="h-full bg-[#F2F2F7]">
      <NavBar title="Wi-Fi" backTo="settings" backText="Settings" />
      <div className="px-4 mt-8">
        <GroupedList>
          <div className="flex items-center justify-between px-4 py-2 min-h-[44px] bg-white">
            <span className="text-[17px] text-black tracking-tight">Wi-Fi</span>
            <IosToggle isOn={false} onClick={() => navigate('wifi_on')} />
          </div>
        </GroupedList>
      </div>
    </div>;

  const WifiOnScreen = () =>
  <div className="h-full bg-[#F2F2F7]">
      <NavBar title="Wi-Fi" backTo="settings" backText="Settings" />
      <div className="px-4 mt-8 space-y-8">
        <GroupedList>
          <div className="flex items-center justify-between px-4 py-2 min-h-[44px] bg-white ios-inset-separator">
            <span className="text-[17px] text-black tracking-tight">Wi-Fi</span>
            <IosToggle isOn={true} onClick={() => navigate('wifi_off')} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 min-h-[44px] bg-white">
            <div className="flex items-center gap-3">
              <Check size={20} className="text-[#007AFF]" />
              <span className="text-[17px] text-black tracking-tight">
                HomeNetwork_5G
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi size={20} className="text-black" />
              <Info size={22} className="text-[#007AFF]" />
            </div>
          </div>
        </GroupedList>

        <div>
          <h3 className="text-[13px] text-[#6D6D72] uppercase tracking-wide px-4 mb-2">
            My Networks
          </h3>
          <GroupedList>
            <div className="flex items-center justify-between px-4 py-2 min-h-[44px] bg-white ios-inset-separator">
              <span className="text-[17px] text-black tracking-tight pl-8">
                Guest_Net
              </span>
              <div className="flex items-center gap-3">
                <Wifi size={20} className="text-black" />
                <Info size={22} className="text-[#007AFF]" />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 min-h-[44px] bg-white">
              <span className="text-[17px] text-black tracking-tight pl-8">
                CoffeeShop
              </span>
              <div className="flex items-center gap-3">
                <Wifi size={20} className="text-black" />
                <Info size={22} className="text-[#007AFF]" />
              </div>
            </div>
          </GroupedList>
        </div>
      </div>
    </div>;

  const FilesScreen = () =>
  <div className="h-full bg-white">
      <NavBar backTo="home" backText="Home" border={false} />
      <LargeTitle title="Files" />
      <div className="mt-2">
        <FileRow
        name="Rental_Agreement.pdf"
        date="Oct 24, 2023"
        size="1.2 MB"
        icon={<FileText className="text-white" size={24} />}
        iconBg="bg-[#FF3B30]"
        onClick={() => navigate('document')} />
      
        <FileRow
        name="Medical_Records.pdf"
        date="Sep 12, 2023"
        size="4.5 MB"
        icon={<FileText className="text-white" size={24} />}
        iconBg="bg-[#FF3B30]"
        onClick={() => {}} />
      
        <FileRow
        name="Family_Photos"
        date="Aug 5, 2023"
        size="Folder"
        icon={
        <Folder className="text-[#007AFF]" size={24} fill="currentColor" />
        }
        iconBg="bg-transparent"
        onClick={() => {}}
        isLast />
      
      </div>
    </div>;

  const FileRow = ({
    name,
    date,
    size,
    icon,
    iconBg,
    onClick,
    isLast = false








  }: {name: string;date: string;size: string;icon: React.ReactNode;iconBg: string;onClick: () => void;isLast?: boolean;}) =>
  <button
    onClick={onClick}
    className={`w-full flex items-center bg-white active:bg-[#E5E5EA] transition-colors min-h-[72px] ${!isLast ? 'ios-inset-separator' : ''}`}>
    
      <div className="pl-4 pr-3 py-2">
        <div
        className={`w-[44px] h-[44px] ${iconBg} rounded-[10px] flex items-center justify-center`}>
        
          {icon}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-center pr-4 py-2">
        <span className="text-[17px] text-black tracking-tight font-medium">
          {name}
        </span>
        <div className="flex items-center gap-2 text-[14px] text-[#8E8E93]">
          <span>{date}</span>
          <span>•</span>
          <span>{size}</span>
        </div>
      </div>
    </button>;

  const DocumentScreen = () =>
  <div className="h-full bg-white flex flex-col">
      <NavBar title="Rental Agreement" backTo="files" backText="Files" />
      <div className="flex-1 overflow-y-auto p-6 bg-[#F2F2F7]">
        <div className="bg-white p-8 shadow-sm min-h-full">
          <h2 className="text-center font-serif font-bold mb-6">
            RESIDENTIAL LEASE AGREEMENT
          </h2>
          <div className="text-[8px] leading-[1.2] text-black text-justify font-serif break-words opacity-80">
            {Array(30).
          fill(
            "THIS LEASE AGREEMENT (hereinafter referred to as the 'Agreement') made and entered into this day by and between the Landlord and the Tenant. WITNESSETH: That in consideration of the mutual covenants and agreements herein contained, the parties hereto do hereby agree as follows: 1. PREMISES: Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the premises described above. 2. TERM: The term of this lease shall be for a period of one year, commencing on the date set forth above. 3. RENT: Tenant agrees to pay Landlord as base rent the sum set forth above, payable in advance on the first day of each month. 4. DEPOSIT: Upon execution of this Agreement, Tenant shall deposit with Landlord the sum set forth above as security for the performance of Tenant's obligations hereunder. "
          ).
          join('')}
          </div>
        </div>
      </div>
    </div>;

  const ContactsScreen = () =>
  <div className="h-full bg-white relative">
      <NavBar backTo="home" backText="Home" border={false} />
      <LargeTitle title="Contacts" />
      <div className="mt-2">
        <div className="bg-[#F2F2F7] px-4 py-1 text-[13px] font-semibold text-[#8E8E93]">
          G
        </div>
        <ContactRow
        name="Grandson (Timmy)"
        color="bg-[#8E8E93]"
        onClick={() => navigate('contact_card')} />
      
        <div className="bg-[#F2F2F7] px-4 py-1 text-[13px] font-semibold text-[#8E8E93]">
          P
        </div>
        <ContactRow name="Pharmacy" color="bg-[#8E8E93]" onClick={() => {}} />
        <div className="bg-[#F2F2F7] px-4 py-1 text-[13px] font-semibold text-[#8E8E93]">
          S
        </div>
        <ContactRow name="Smith, Dr." color="bg-[#8E8E93]" onClick={() => {}} />
        <ContactRow
        name="Susan (Daughter)"
        color="bg-[#8E8E93]"
        onClick={() => {}}
        isLast />
      
      </div>
      {/* Alphabet Index */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col text-[10px] font-semibold text-[#007AFF] items-center leading-[1.1]">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((l) =>
      <span key={l}>{l}</span>
      )}
      </div>
    </div>;

  const ContactRow = ({
    name,
    color,
    onClick,
    isLast = false





  }: {name: string;color: string;onClick: () => void;isLast?: boolean;}) =>
  <button
    onClick={onClick}
    className={`w-full flex items-center bg-white active:bg-[#E5E5EA] transition-colors min-h-[44px] ${!isLast ? 'ios-inset-separator' : ''}`}>
    
      <div className="pl-4 pr-3 py-2">
        <div
        className={`w-[32px] h-[32px] ${color} rounded-full flex items-center justify-center text-white text-[15px] font-medium`}>
        
          {name.charAt(0)}
        </div>
      </div>
      <div className="flex-1 flex items-center pr-4 py-2">
        <span className="text-[17px] text-black tracking-tight font-medium">
          {name}
        </span>
      </div>
    </button>;

  const ContactCardScreen = () =>
  <div className="h-full bg-[#F2F2F7]">
      <NavBar backTo="contacts" backText="Contacts" border={false} />
      <div className="flex flex-col items-center px-4 pt-2">
        <div className="w-[100px] h-[100px] bg-[#8E8E93] rounded-full flex items-center justify-center text-white text-5xl font-medium mb-2">
          T
        </div>
        <h2 className="text-[28px] font-normal text-black tracking-tight mb-6">
          Timmy
        </h2>

        <div className="flex justify-between gap-2 w-full px-2">
          <ContactAction
          icon={
          <MessageCircle
            size={22}
            className="text-[#007AFF]"
            fill="currentColor" />

          }
          label="message" />
        
          <ContactAction
          icon={
          <Phone size={22} className="text-[#007AFF]" fill="currentColor" />
          }
          label="call" />
        
          <ContactAction
          icon={
          <Video size={24} className="text-[#007AFF]" fill="currentColor" />
          }
          label="video"
          onClick={() => navigate('video_call')} />
        
          <ContactAction
          icon={
          <Mail size={22} className="text-[#007AFF]" fill="currentColor" />
          }
          label="mail" />
        
        </div>

        <div className="w-full mt-6">
          <GroupedList>
            <div className="px-4 py-3 bg-white">
              <div className="text-[14px] text-black mb-0.5">mobile</div>
              <div className="text-[17px] text-[#007AFF]">(555) 123-4567</div>
            </div>
          </GroupedList>
        </div>
      </div>
    </div>;

  const ContactAction = ({
    icon,
    label,
    onClick




  }: {icon: React.ReactNode;label: string;onClick?: () => void;}) =>
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-center justify-center gap-1 bg-white rounded-[10px] py-2.5 active:bg-[#E5E5EA] transition-colors">
    
      {icon}
      <span className="text-[11px] text-[#007AFF] font-medium">{label}</span>
    </button>;

  const VideoCallScreen = () =>
  <div className="h-full bg-black flex flex-col relative overflow-hidden">
      {/* Simulated blurred camera view */}
      <div className="absolute inset-0 bg-[#1C1C1E] opacity-90 backdrop-blur-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="pt-24 pb-4 flex flex-col items-center">
          <div className="w-[80px] h-[80px] bg-[#8E8E93] rounded-full flex items-center justify-center text-white text-4xl font-medium mb-4">
            T
          </div>
          <h2 className="text-[32px] font-normal text-white tracking-tight mb-1">
            Timmy
          </h2>
          <p className="text-[17px] text-[#EBEBF5]/60">FaceTime</p>
        </div>

        <div className="flex-1" />

        <div className="pb-12 px-8 flex justify-between items-center">
          <button className="w-[60px] h-[60px] bg-[#3A3A3C] rounded-full flex items-center justify-center text-white active:opacity-70">
            <MicOff size={28} />
          </button>
          <button
          onClick={() => navigate('contact_card')}
          className="w-[72px] h-[72px] bg-[#FF3B30] rounded-full flex items-center justify-center text-white active:opacity-70">
          
            <PhoneOff size={32} fill="currentColor" />
          </button>
          <button className="w-[60px] h-[60px] bg-[#3A3A3C] rounded-full flex items-center justify-center text-white active:opacity-70">
            <RefreshCcw size={28} />
          </button>
        </div>
      </div>
    </div>;

  const InboxScreen = () =>
  <div className="h-full bg-white">
      <NavBar backTo="home" backText="Home" border={false} />
      <LargeTitle title="Inbox" />
      <div className="mt-2 border-t border-[rgba(60,60,67,0.15)]">
        <EmailRow
        sender="Security Alert"
        subject="URGENT: Account Suspended"
        preview="Dear Customer, your account will be locked in 24 hours. Click here to verify."
        time="9:41 AM"
        unread={true}
        onClick={() => navigate('scam_email')} />
      
        <EmailRow
        sender="Your Bank"
        subject="Your Monthly Statement"
        preview="Dear John Smith, your statement is ready to view securely in your app."
        time="Yesterday"
        unread={false}
        onClick={() => navigate('real_email')} />
      
      </div>
    </div>;

  const EmailRow = ({
    sender,
    subject,
    preview,
    time,
    unread,
    onClick







  }: {sender: string;subject: string;preview: string;time: string;unread: boolean;onClick: () => void;}) =>
  <button
    onClick={onClick}
    className="w-full flex items-start p-0 bg-white active:bg-[#E5E5EA] transition-colors text-left ios-inset-separator">
    
      <div className="pt-4 w-6 flex justify-center">
        {unread && <div className="w-3 h-3 bg-[#007AFF] rounded-full mt-1" />}
      </div>
      <div className="flex-1 py-3 pr-4">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3
          className={`text-[17px] tracking-tight ${unread ? 'font-bold text-black' : 'font-semibold text-black'}`}>
          
            {sender}
          </h3>
          <span className="text-[15px] text-[#8E8E93]">{time}</span>
        </div>
        <p
        className={`text-[15px] tracking-tight mb-0.5 ${unread ? 'font-semibold text-black' : 'text-black'}`}>
        
          {subject}
        </p>
        <p className="text-[15px] text-[#8E8E93] tracking-tight line-clamp-2 leading-tight">
          {preview}
        </p>
      </div>
      <div className="pt-4 pr-3">
        <ChevronRight size={20} className="text-[#C7C7CC] mt-1" />
      </div>
    </button>;

  const ScamEmailScreen = () =>
  <div className="h-full bg-white flex flex-col">
      <NavBar
      backTo="inbox"
      backText="Inbox"
      rightElement={
      <ChevronRight size={24} className="text-[#007AFF] opacity-50" />
      } />
    
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 border-b border-[rgba(60,60,67,0.15)]">
          <h2 className="text-[22px] font-bold text-black tracking-tight mb-2">
            URGENT: Account Suspended
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8E8E93] rounded-full flex items-center justify-center text-white text-sm font-medium">
              S
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-semibold text-black">
                  Security Alert
                </span>
                <span className="text-[13px] text-[#8E8E93]">9:41 AM</span>
              </div>
              <div className="text-[13px] text-black">To: you@icloud.com</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 text-[17px] text-black leading-relaxed">
          <div className="p-2 -mx-2 bg-[#FF3B30]/10 border-l-4 border-[#FF3B30] rounded-r-md">
            <p className="font-semibold text-[#FF3B30] text-[13px] uppercase tracking-wide mb-1">
              Suspicious Sender
            </p>
            <p className="text-[15px] text-black break-all">
              From: admin@secure-alert-update.com
            </p>
          </div>

          <p className="inline-block p-1 -mx-1 bg-[#FF3B30]/10 rounded">
            Dear Customer,
          </p>
          <p>
            Your account will be locked in 24 hours due to suspicious activity.
          </p>
          <p>
            Click the link below immediately to verify your identity and prevent
            account deletion.
          </p>

          <div className="text-center mt-8">
            <a href="#" className="text-[#007AFF] underline text-[17px]">
              Verify Account Now
            </a>
          </div>
        </div>
      </div>
    </div>;

  const RealEmailScreen = () =>
  <div className="h-full bg-white flex flex-col">
      <NavBar
      backTo="inbox"
      backText="Inbox"
      rightElement={
      <ChevronRight size={24} className="text-[#007AFF] opacity-50" />
      } />
    
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 border-b border-[rgba(60,60,67,0.15)]">
          <h2 className="text-[22px] font-bold text-black tracking-tight mb-2">
            Your Monthly Statement
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8E8E93] rounded-full flex items-center justify-center text-white text-sm font-medium">
              Y
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-semibold text-black">
                  Your Bank
                </span>
                <span className="text-[13px] text-[#8E8E93]">Yesterday</span>
              </div>
              <div className="text-[13px] text-black">To: you@icloud.com</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 text-[17px] text-black leading-relaxed">
          <div className="p-2 -mx-2 bg-[#34C759]/10 border-l-4 border-[#34C759] rounded-r-md">
            <p className="font-semibold text-[#34C759] text-[13px] uppercase tracking-wide mb-1">
              Verified Sender
            </p>
            <p className="text-[15px] text-black">From: support@yourbank.com</p>
          </div>

          <p className="inline-block p-1 -mx-1 bg-[#34C759]/10 rounded">
            Dear John Smith,
          </p>
          <p>
            Your monthly statement is ready to view securely in your banking
            app.
          </p>
          <p>
            For your security, we do not include links to statements in emails.
            Please open your Bank App directly on your phone to view your
            documents.
          </p>
        </div>
      </div>
    </div>;

  const HealthChatScreen = () =>
  <div className="h-full bg-white flex flex-col">
      <NavBar
      backTo="home"
      backText="Home"
      title="Health AI"
      rightElement={
      <div className="w-8 h-8 bg-[#E5E5EA] rounded-full flex items-center justify-center">
            <HeartPulse size={18} className="text-[#FF2D55]" />
          </div>
      } />
    

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-white">
        <div className="text-center text-[11px] font-semibold text-[#8E8E93] my-2">
          Today 9:41 AM
        </div>

        <div className="flex gap-2 max-w-[80%]">
          <div className="w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center flex-shrink-0 mt-auto mb-1">
            <HeartPulse size={16} className="text-[#FF2D55]" />
          </div>
          <div className="bg-[#E9E9EB] px-4 py-2.5 rounded-[18px] rounded-bl-[4px]">
            <p className="text-[17px] text-black leading-[1.3]">
              Hello. I am your Health AI assistant. How can I help you today?
            </p>
            <p className="text-[13px] text-[#8E8E93] mt-2 pt-2 border-t border-[rgba(60,60,67,0.1)]">
              (Remember: I am an AI, always consult your doctor for medical
              advice.)
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#F6F6F6] border-t border-[rgba(60,60,67,0.15)] pb-8">
        <div className="flex items-center gap-2 bg-white rounded-full border border-[rgba(60,60,67,0.15)] p-1 pl-4">
          <input
          type="text"
          placeholder="iMessage"
          className="flex-1 bg-transparent border-none focus:outline-none text-[17px] text-black placeholder:text-[#C7C7CC] h-8"
          readOnly />
        
          <button className="w-[28px] h-[28px] bg-[#007AFF] rounded-full flex items-center justify-center text-white">
            <ArrowUp size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>;

  const isDarkStatus = screenState === 'video_call';
  return (
    <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_0_0_4px_#333,0_0_0_5px_#111,0_25px_50px_-12px_rgba(0,0,0,0.5)] flex-shrink-0">
      {/* Titanium Bezel Gradient */}
      <div className="absolute inset-0 rounded-[55px] bg-gradient-to-br from-[#5a5a5c] via-[#2a2a2b] to-[#5a5a5c] p-[2px]">
        <div className="absolute inset-0 rounded-[53px] bg-black" />
      </div>

      {/* Hardware Buttons */}
      <div className="absolute top-[115px] -left-[3px] w-[3px] h-[26px] bg-[#2a2a2b] rounded-l-sm" />
      <div className="absolute top-[165px] -left-[3px] w-[3px] h-[60px] bg-[#2a2a2b] rounded-l-sm" />
      <div className="absolute top-[240px] -left-[3px] w-[3px] h-[60px] bg-[#2a2a2b] rounded-l-sm" />
      <div className="absolute top-[190px] -right-[3px] w-[3px] h-[95px] bg-[#2a2a2b] rounded-r-sm" />

      {/* Screen Container */}
      <div className="absolute inset-[6px] bg-black rounded-[49px] overflow-hidden ios-shadow">
        <IosStatusBar dark={isDarkStatus} />

        {/* Dynamic Island */}
        <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
          <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] ml-auto" />
        </div>

        {/* Screen Content */}
        {screenState === 'home' && <Home />}
        {screenState === 'settings' && <SettingsScreen />}
        {screenState === 'wifi_off' && <WifiOffScreen />}
        {screenState === 'wifi_on' && <WifiOnScreen />}
        {screenState === 'files' && <FilesScreen />}
        {screenState === 'document' && <DocumentScreen />}
        {screenState === 'contacts' && <ContactsScreen />}
        {screenState === 'contact_card' && <ContactCardScreen />}
        {screenState === 'video_call' && <VideoCallScreen />}
        {screenState === 'inbox' && <InboxScreen />}
        {screenState === 'scam_email' && <ScamEmailScreen />}
        {screenState === 'real_email' && <RealEmailScreen />}
        {screenState === 'health_chat' && <HealthChatScreen />}

        {/* Home Indicator */}
        {screenState !== 'home' &&
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-50 pointer-events-none" />
        }
      </div>
    </div>);

}