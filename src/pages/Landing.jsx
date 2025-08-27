import React, { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import TabSwitcher from '../components/common/TabSwitcher';
import SpotlightCard from '../components/common/SpotlightCard';
import PlanCard from '../components/common/PlanCard';
import PlanDetailCard from '../components/common/PlanDetailCard';
import SpotlightDetailCard from '../components/common/SpotlightDetailCard';
import Pagination from '../components/common/Pagination';
import { toast } from 'react-toastify';
import Footer from '../components/layout/Footer';

const sampleUsers = [
  { name: 'Mia', time: '4:00 PM', location: 'Central Park', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', note: 'Open to anything!' },
  { name: 'Jia', time: '7:00 PM', location: 'PVR Cinepolis', avatarUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Sia', time: '11:00 PM', location: 'Lighthouse cafe', avatarUrl: 'https://images.unsplash.com/photo-1544005316-04ae31d94a29?q=80&w=400&auto=format&fit=crop' },
  { name: 'Aarav', time: '6:30 PM', location: 'Marine Drive', avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop' },
  { name: 'Isha', time: '5:00 PM', location: 'Kala Ghoda', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' },
  { name: 'Kabir', time: '8:30 PM', location: 'Bandra Fort', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Tara', time: '3:00 PM', location: 'Jio World Drive', avatarUrl: 'https://images.unsplash.com/photo-1544005316-04ae31d94a29?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rohit', time: '9:00 PM', location: 'Carter Road', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop' },
  { name: 'Neel', time: '1:00 PM', location: 'Powai Lake', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop' },
  { name: 'Pooja', time: '2:30 PM', location: 'Phoenix Marketcity', avatarUrl: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=400&auto=format&fit=crop' },
  { name: 'Arnav', time: '7:45 PM', location: 'Versova', avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop' },
  { name: 'Kriti', time: '10:30 AM', location: 'Prithvi Cafe', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  { name: 'Zara', time: '6:00 PM', location: 'Colaba Causeway', avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop' },
  { name: 'Dev', time: '4:15 PM', location: 'High Street Phoenix', avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop' },
  { name: 'Nisha', time: '8:00 PM', location: 'Juhu Beach', avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop' },
  { name: 'Vihaan', time: '12:30 PM', location: 'Haji Ali', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop' },
  { name: 'Anika', time: '3:45 PM', location: 'Phoenix Palladium', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' }
];

const samplePlans = [
  {
    name: 'Rahul Verma',
    subtitle: 'Weekend Trek',
    time: '6:00 AM Tomorrow',
    location: 'Lohagad Fort',
    bannerImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Priya Patel',
    subtitle: 'Brunch Meetup',
    time: '11:00 AM Tomorrow',
    location: 'The Bombay Canteen',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Aryan Khanna',
    subtitle: 'Cricket Match',
    time: '4:00 PM Tomorrow',
    location: 'Cross Maidan',
    bannerImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Neha Gupta',
    subtitle: 'Art Exhibition',
    time: '3:00 PM Today',
    location: 'Jehangir Art Gallery',
    bannerImage: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Vikram Joshi',
    subtitle: 'Tech Meetup',
    time: '6:30 PM Today',
    location: 'WeWork Galaxy',
    bannerImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'Ananya Reddy',
    subtitle: 'Yoga Session',
    time: '7:00 AM Tomorrow',
    location: 'Hanging Gardens',
    bannerImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Karan Malhotra',
    subtitle: 'Standup Comedy',
    time: '8:00 PM Today',
    location: 'The Habitat',
    bannerImage: 'https://images.unsplash.com/photo-1541194578297-9c8eaf0d832a?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Meera Iyer',
    subtitle: 'Book Reading',
    time: '5:00 PM Tomorrow',
    location: 'Kitab Khana',
    bannerImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Arjun Kapoor',
    subtitle: 'Gaming Tournament',
    time: '2:00 PM Tomorrow',
    location: 'Smaaash, Lower Parel',
    bannerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Zoya Khan',
    subtitle: 'Beach Cleanup',
    time: '8:00 AM Tomorrow',
    location: 'Juhu Beach',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop'
  },{
    name: 'Riya Mehta',
    subtitle: 'Karaoke Night',
    time: '9:00 PM Today',
    location: 'Hard Rock Cafe, Andheri',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Aditya Rao',
    subtitle: 'Pool Party',
    time: '12:00 PM Tomorrow',
    location: 'Club Aquaria, Bandra',
    bannerImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Nandini Desai',
    subtitle: 'Coffee & Conversations',
    time: '4:30 PM Today',
    location: 'Blue Tokai, Colaba',
    bannerImage: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Rohan Seth',
    subtitle: 'Basketball Match',
    time: '6:00 PM Tomorrow',
    location: 'St. Xavier\'s College Court',
    bannerImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Ishita Kapoor',
    subtitle: 'Flea Market Shopping',
    time: '10:00 AM Tomorrow',
    location: 'Colaba Causeway',
    bannerImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop'
  }
];

function Landing() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Plans');
  const [glowEnabled, setGlowEnabled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to show per page

  useEffect(() => {
    const saved = localStorage.getItem('glowMode');
    if (saved !== null) setGlowEnabled(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('glowMode', JSON.stringify(glowEnabled));
  }, [glowEnabled]);

  useEffect(() => {
    // Start transition when tab changes
    setIsTransitioning(true);
    
    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Filter spotlight users by name
  const filteredSpotlight = sampleUsers.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
  
  // Filter plans by name
  const filteredPlans = query.trim() === '' 
    ? samplePlans 
    : samplePlans.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  // Calculate pagination
  const totalItems = activeTab === 'Plans' ? filteredPlans.length : filteredSpotlight.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const currentSpotlight = filteredSpotlight.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset to first page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, query]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#ff5500] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar - Fixed width container */}
          <div className="w-full">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          {/* Tab Switcher - Centered */}
          <div className="flex justify-center">
            <TabSwitcher active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Content Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {activeTab === 'Plans' ? (
                currentPlans.map((p) => (
                  <div 
                    key={p.name} 
                    className={`rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                      isTransitioning 
                        ? 'opacity-0 translate-y-4 scale-95' 
                        : 'opacity-100 translate-y-0 scale-100'
                    }`}
                  >
                    <PlanCard
                      glow={glowEnabled}
                      bannerImage={p.bannerImage}
                      avatarUrl={p.avatarUrl}
                      name={p.name}
                      subtitle={p.subtitle}
                      time={p.time}
                      location={p.location}
                      onCardClick={() => setSelectedPlan(p)}
                      className="shadow-none"
                    />
                  </div>
                ))
              ) : (
                currentSpotlight.map((user) => (
                  <div 
                    key={user.name} 
                    className={`rounded-lg overflow-hidden transition-all duration-300 ease-out max-md:flex max-md:flex-col max-md:items-center ${
                      isTransitioning 
                        ? 'opacity-0 translate-y-4 scale-95' 
                        : 'opacity-100 translate-y-0 scale-100'
                    }`}
                  >
                    <SpotlightCard
                      glow={glowEnabled}
                      avatarUrl={user.avatarUrl}
                      name={user.name}
                      time={user.time}
                      location={user.location}
                      onCardClick={() => setSelectedUser(user)}
                      onApproach={() => {
                        // This will be handled by the SpotlightCard component
                      }}
                      className="shadow-none"
                    />
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#ff5500] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  «
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#ff5500] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-[#ff5500] text-white'
                          : 'bg-white text-[#ff5500] hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#ff5500] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#ff5500] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Positioned at bottom */}
      <footer className="mt-auto border-t border-[#ff5500]/10">
        <Footer />
      </footer>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <PlanDetailCard
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onApproach={() => {
            toast.success(`Approach request sent to ${selectedPlan?.name}!`);
            setSelectedPlan(null);
          }}
          onChat={() => {
            toast.info(`Chat with ${selectedPlan?.name} coming soon!`);
            setSelectedPlan(null);
          }}
        />
      )}
      
      {selectedUser && (
        <SpotlightDetailCard
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onApproach={() => {
            toast.success(`Approach message sent to ${selectedUser.name}!`, {
              position: 'top-center',
              autoClose: 3000,
            });
          }}
          onChat={() => {
            toast.info('Chat coming soon');
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default Landing;