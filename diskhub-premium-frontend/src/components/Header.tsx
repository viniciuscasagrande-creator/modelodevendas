import { Bell, Grid3X3, Search, ChevronDown } from 'lucide-react'
export function Header() {
  return <header className="header">
    <div className="searchbox"><Search size={17}/><span>Buscar no DiskHub...</span><kbd>Ctrl K</kbd></div>
    <div className="header-actions">
      <button className="icon-btn bell"><Bell size={18}/><i/></button>
      <button className="icon-btn"><Grid3X3 size={18}/></button>
      <div className="profile">
        <div className="avatar">AP</div>
        <div className="profile-copy"><strong>Ana Pereira</strong><span>Produtora de Eventos</span></div>
        <ChevronDown size={16}/>
      </div>
    </div>
  </header>
}
